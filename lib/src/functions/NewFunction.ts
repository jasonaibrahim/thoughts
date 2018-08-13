import * as fs from 'fs';
import {CLIFunction} from './CLIFunction';
import * as path from 'path';
import {Logger} from '../loggers/Logger';
import moment = require('moment');
import {ConfigKeys} from './index';
import {exec} from 'child_process';
import {BashHelper} from '../bash/BashHelper';

export class NewFunction extends CLIFunction {
  
  private fileExtension = 'txt';
  
  private static createDirIfNotExists(dir: string) {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
  }
  
  private static createFile(fullPathToFile: string, data: string) {
    fs.writeFileSync(fullPathToFile, data);
  }
  
  functionWillRun() {
    NewFunction.createDirIfNotExists(this.storagePath);
  }
  
  function(): Promise<any> {
    const timestamp = moment().format();
    const filename = `${timestamp}.${this.parseFileExtensionFromArgs()}`;
    const seed = this.parseTextFromArgs();
    const text = `${moment().format('MMMM Do YYYY, h:mm:ss a')}\n\n${seed}`;
    const pathToFile = path.join(this.storagePath, filename);
    NewFunction.createFile(pathToFile, text);
    return Promise.resolve(pathToFile);
  }
  
  functionDidRun(pathToFile: string) {
    BashHelper.openFileInDefaultEditor(this.config, pathToFile);
  }
  
  private parseFileExtensionFromArgs(): string {
    if (this.args && this.args.params && this.args.params.ext) {
      return this.args.params.ext;
    } else {
      return this.fileExtension;
    }
  }
  
  private parseTextFromArgs(): string {
    if (this.args && this.args.params && this.args.params._) {
      return this.args.params._[1] || '';
    } else {
      return '';
    }
  }
}