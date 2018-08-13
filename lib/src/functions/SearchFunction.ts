import {CLIFunction} from './CLIFunction';
import * as fs from 'fs';
import {forkJoin, Observable, of, Subscriber} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';
import * as path from 'path';
import {Logger} from '../loggers/Logger';
import {BashHelper} from '../bash/BashHelper';

const elasticlunr = require('elasticlunr');

export interface IndexableDoc {
  id: string;
  body: string;
  title: string;
}

export interface SearchResult {
  ref: string;
  score: number;
}

export class SearchFunction extends CLIFunction {

  private _index: any;

  get index(): any {
    return this._index;
  }

  private static getIndexableDocFromFileContents(fileName: string, fileContents: string): Observable<IndexableDoc> {
    return of({
      id: fileName,
      title: fileName,
      body: fileContents
    });
  }

  function(): Promise<any> {
    const query = this.parseQueryFromArgs();
    if (query) {
      return this.find(query).toPromise();
    } else {
      return Promise.reject(new Error('No query was provided'));
    }
  }

  functionDidRun(data: SearchResult[]) {
    Logger.printSuccessMessage(`${data.length} results found for query "${this.parseQueryFromArgs()}"`);
    Logger.printSuccessMessage(`The following files will be opened in your configured editor:`);
    data.forEach(result => {
      Logger.printSuccessMessage(result.ref);
      this.openSearchResultInEditor(result.ref);
    });
  }

  find(query: string): Observable<SearchResult[]> {
    return this.initializeIndex().pipe(map(() => {
      return this.index.search(query);
    }));
  }

  private parseQueryFromArgs(): string {
    if (this.args.params) {
      const params = this.args.params['_'] as any;
      return params.slice(1).join(' ');
    } else {
      return '';
    }
  }

  private openSearchResultInEditor(pathToFile: string) {
    BashHelper.openFileInDefaultEditor(this.config, pathToFile);
  }

  private addFileContentToIndex(elasticLunrRef: any): Observable<void> {
    return this.getFilesInStorageDir().pipe(switchMap(files => {
      if (files.length) {
        return forkJoin(...files.map(file => {
          return this.getFileContents(file).pipe(switchMap(fileContents => {
            return SearchFunction.getIndexableDocFromFileContents(file, fileContents).pipe(map(indexableDoc => {
              elasticLunrRef.addDoc(indexableDoc);
            }));
          }));
        }));
      } else {
        // could throw here but better ux to (eventually) return no result
        return of(null);
      }
    }));
  }

  private initializeIndex(): Observable<void> {
    return this.initializeSearchEngine().pipe(switchMap(ref => {
      return this.addFileContentToIndex(ref);
    }));
  }

  private initializeSearchEngine(): Observable<any> {
    return Observable.create((observer: Subscriber<any>) => {
      this._index = elasticlunr(function (this: any) {
        // TODO: can extract SearchEngine into its own class and provide fields/ref as instance variables
        this.addField('title');
        this.addField('body');
        this.setRef('id');
        observer.next(this);
        observer.complete();
      });
    });
  }

  private getFilesInStorageDir(): Observable<string[]> {
    return Observable.create((observer: Subscriber<string[]>) => {
      fs.readdir(this.storagePath, (err, files) => {
        if (err) {
          observer.error(err);
        } else {
          observer.next(files.map(file => path.join(this.storagePath, file)));
          observer.complete();
        }
      });
    });
  }

  private getFileContents(pathToFile: string): Observable<string> {
    return Observable.create((observer: Subscriber<string>) => {
      fs.readFile(pathToFile, (err, data: Buffer) => {
        if (err) {
          observer.error(err);
        } else {
          observer.next(data.toString('utf8'));
          observer.complete();
        }
      });
    });
  }
}
