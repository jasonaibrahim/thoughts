import {CLIArgs, CLIFunctionType} from './index';
import {HelpFunction} from './HelpFunction';
import {NewFunction} from './NewFunction';
import {CLIFunction} from './CLIFunction';
import {StoragePathUndefinedError} from '../errors';
import * as path from 'path';

export class CLIFunctionHelper {
  
  private static readonly DefaultStoragePath = path.join(__dirname, '..', 'data');
  
  private static readonly DefaultParserArgs: CLIArgs = {
    function: CLIFunctionType.Help,
    params: null,
  };
  
  private static initNewFunctionParser(args: CLIArgs, storagePath: string): NewFunction {
    return new NewFunction(args, storagePath);
  }
  
  private static initHelpFunctionParser(args: CLIArgs = this.DefaultParserArgs,
                                        storagePath: string): HelpFunction {
    return new HelpFunction(args, storagePath);
  }
  
  static instantiateFromArgs(cli: { [key: string]: string },
                             storagePath: string = this.DefaultStoragePath): CLIFunction {
    const func = cli._[0] as CLIFunctionType;
    
    if (!storagePath) {
      throw new StoragePathUndefinedError();
    }
    
    if (cli) {
      const args: CLIArgs = {
        function: func,
        params: cli
      };
      switch (args.function) {
        case CLIFunctionType.Help:
          return this.initHelpFunctionParser(args, storagePath);
        case CLIFunctionType.New:
          return this.initNewFunctionParser(args, storagePath);
        default:
          return this.initHelpFunctionParser(undefined, storagePath);
      }
    } else {
      return this.initHelpFunctionParser(undefined, storagePath);
    }
  }
}