import * as path from 'path';
import {CLIFunctionHelper} from './functions/CLIFunctionHelper';
import minimist = require('minimist');

export const StorageDirectory = path.join(__dirname, '..', 'data');

export function run() {
  const args = minimist(process.argv.slice(2));
  const parser = CLIFunctionHelper.instantiateFromArgs(args, StorageDirectory);
  parser.run();
}