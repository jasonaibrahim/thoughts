import {CLIFunction} from './CLIFunction';
import {exec} from 'child_process';

export class OpenFunction extends CLIFunction {

  function(): Promise<any> {
    return this.openDirectoryContainingStoredFiles();
  }

  openDirectoryContainingStoredFiles(): Promise<any> {
    return new Promise((resolve, reject) => {
      exec(`open ${this.storagePath}`, err => {
        if (err) {
          reject(err);
        }
        resolve();
      });
    });
  }
}