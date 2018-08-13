import {SearchFunction, SearchResult} from '../../lib/src/functions/SearchFunction';
import {CLIFunctionHelper} from '../../lib/src/functions/CLIFunctionHelper';
import * as fs from 'fs';
import * as path from 'path';
import * as rimraf from 'rimraf';
import minimist = require('minimist');

describe('SearchFunction', () => {

  let args = {};
  let namespace = '.thoughts-cli-test';
  let functionUnderTest: SearchFunction;
  let storagePath = path.join(__dirname, '..', '..', 'test', 'data');
  let topLevelStorageDir = path.join(__dirname, '..', '..', 'test');

  beforeEach(() => {
    args = minimist(['search', 'foo']);
  });

  function initTestDirectory(): Promise<any> {
    return new Promise((resolve, reject) => {
      rimraf(storagePath, () => {
        try {
          fs.mkdirSync(topLevelStorageDir);
        } catch (err) {
          console.log('test data already exists. skipping creation');
        }
        fs.mkdirSync(storagePath);
        resolve();
      });
    });
  }

  describe('Run', () => {
    it('should load content into an internal index', async (done) => {

      await initTestDirectory();

      functionUnderTest = CLIFunctionHelper.instantiateFromArgs(args, namespace, storagePath) as SearchFunction;
      // no documents exist yet
      functionUnderTest.find('oracle database profit').subscribe((docs: SearchResult[]) => {
        expect(docs.length).toEqual(0);

        // add 3 documents to test storage path. one of them contains the string `foo`
        fs.writeFileSync(`${storagePath}/1.txt`, 'yesterday Oracle has released its new database Oracle 12g, this would make more money for this company and lead to a nice profit report of annual year.');
        fs.writeFileSync(`${storagePath}/2.txt`, 'As expected, Oracle released its profit report of 2015, during the good sales of database and hardware, Oracle profit of 2015 reached 12.5 Billion.');
        fs.writeFileSync(`${storagePath}/3.txt`, 'If music be the food of love, play on: Give me excess of it');

        // one document should be returned containing the text `foo`
        functionUnderTest.find('oracle database profit').subscribe((results: SearchResult[]) => {
          expect(results.length).toEqual(2);
          done();
        });
      });
    });
  });
});
