import * as fs from 'fs';
import {CLIFunction} from './CLIFunction';
import * as path from 'path';
import {Logger} from '../loggers/Logger';
import moment = require('moment');
import {ConfigKeys} from './index';
import {exec} from 'child_process';

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
  
  run() {
    this.testWillRun();
    
    const timestamp = moment().format();
    const filename = `${timestamp}.${this.parseFileExtensionFromArgs()}`;
    const seed = this.parseTextFromArgs();
    const text = `${moment().format('MMMM Do YYYY, h:mm:ss a')}\n\n${seed}`;
    const pathToFile = path.join(this.storagePath, filename);
    NewFunction.createFile(pathToFile, text);
    
    this.didFinishRunning(pathToFile);
  }
  
  private testWillRun() {
    NewFunction.createDirIfNotExists(this.storagePath);
  }
  
  private didFinishRunning(pathToFile: string) {
    if (this.config.get(ConfigKeys.Editor)) {
      const cmd = `${this.config.get(ConfigKeys.Editor)} ${pathToFile}`;
      exec(cmd, err => {
        if (err) {
          Logger.printErrorMessage(err.message);
        }
      });
    } else {
      Logger.printSuccessMessage(pathToFile);
    }
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