import {CLIArgs, CLIFunctionType} from './index';
import {HelpFunction} from './HelpFunction';
import {NewFunction} from './NewFunction';
import {CLIFunction} from './CLIFunction';
import {StoragePathUndefinedError} from '../errors';
import * as path from 'path';
import {ConfigFunction} from './ConfigFunction';
import {OpenFunction} from './OpenFunction';

export class CLIFunctionHelper {
  
  static readonly ARG_KEY = '_';
  
  private static readonly DefaultStoragePath = path.join(__dirname, '..', 'data');
  
  private static readonly DefaultParserArgs: CLIArgs = {
    function: CLIFunctionType.Help,
    params: null,
  };
  
  private static initNewFunctionParser(args: CLIArgs, storagePath: string, namespace: string): NewFunction {
    return new NewFunction(args, storagePath, namespace);
  }
  
  private static initConfigFunctionParser(args: CLIArgs, storagePath: string, namespace: string): ConfigFunction {
    return new ConfigFunction(args, storagePath, namespace);
  }
  
  private static initHelpFunctionParser(args: CLIArgs = this.DefaultParserArgs,
                                        storagePath: string,
                                        namespace: string): HelpFunction {
    return new HelpFunction(args, storagePath, namespace);
  }
  
  private static initOpenFunctionParser(args: CLIArgs, storagePath: string, namespace: string): ConfigFunction {
    return new OpenFunction(args, storagePath, namespace);
  }
  
  static instantiateFromArgs(cli: { [key: string]: string },
                             namespace: string,
                             storagePath: string = this.DefaultStoragePath): CLIFunction {
    
    const func = cli[CLIFunctionHelper.ARG_KEY][0] as CLIFunctionType;
    
    if (!storagePath) {
      throw new StoragePathUndefinedError();
    }
  
    const args: CLIArgs = {function: func, params: cli};
  
    switch (args.function) {
      case CLIFunctionType.Help:
        return this.initHelpFunctionParser(args, storagePath, namespace);
      case CLIFunctionType.New:
        return this.initNewFunctionParser(args, storagePath, namespace);
      case CLIFunctionType.Config:
        return this.initConfigFunctionParser(args, storagePath, namespace);
      case CLIFunctionType.Open:
        return this.initOpenFunctionParser(args, storagePath, namespace);
      default:
        return this.initHelpFunctionParser(undefined, storagePath, namespace);
    }
  }
}