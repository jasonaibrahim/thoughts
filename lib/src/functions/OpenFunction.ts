import {CLIFunction} from './CLIFunction';
import * as child_process from 'child_process';

export class OpenFunction extends CLIFunction {
  
  function(): Promise<any> {
    return new Promise((resolve, reject) => {
      child_process.exec(`open ${this.storagePath}`, err => {
        if (err) {
          reject(err);
        }
        resolve();
      });
    });
  }
}