import { Parser } from "./Parser";
import * as minimist from 'minimist';

export class CLIParser implements Parser {

  private args: string[] = [];

  constructor(args: string[]) {
    this.args = args;
  }

  parse() {
    return minimist(this.args);
  }
}
