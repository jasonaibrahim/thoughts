import * as fs from "fs";
import {CLIFunction} from './CLIFunction';
import moment = require('moment');
import * as path from 'path';
import chalk from 'chalk';

export class NewFunction extends CLIFunction {
  
  private fileExtension = 'txt';
  
  private static createDirIfNotExists(dir: string) {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
  }
  
  private static createFile(filename: string, directory: string, data: string) {
    const pathToFile = path.join(directory, filename);
    fs.writeFileSync(pathToFile, data);
  }
  
  private static printSuccessMessage() {
    console.log(chalk.green('Saved.'));
  }
  
  run() {
    NewFunction.createDirIfNotExists(this.storagePath);
    const timestamp = moment().format();
    const text = this.parseTextFromArgs();
    const data = `${moment().format('MMMM Do YYYY, h:mm:ss a')}\n\n${text}`;
    NewFunction.createFile(`${timestamp}.${this.parseFileExtensionFromArgs()}`, this.storagePath, data);
    NewFunction.printSuccessMessage();
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
      return this.args.params._[1];
    } else {
      return '';
    }
  }
}