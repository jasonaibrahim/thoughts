import {CLIArgs, CLIFunctionType} from './index';
import {HelpFunction} from './HelpFunction';
import {NewFunction} from './NewFunction';
import {CLIFunction} from './CLIFunction';
import {StoragePathUndefinedError} from '../errors';
import * as path from 'path';
import {ConfigFunction} from './ConfigFunction';
import {OpenFunction} from './OpenFunction';
import {SearchFunction} from './SearchFunction';

export class CLIFunctionHelper {
  
  static readonly ARG_KEY = '_';
  
  private static readonly DefaultStoragePath = path.join(__dirname, '..', 'data');
  
  private static readonly DefaultParserArgs: CLIArgs = {
    function: CLIFunctionType.Help,
    params: null,
  };
  
  static initNewFunctionParser(args: CLIArgs, namespace: string, storagePath: string): NewFunction {
    return new NewFunction(args, namespace, storagePath);
  }
  
  static initConfigFunctionParser(args: CLIArgs, namespace: string, storagePath: string): ConfigFunction {
    return new ConfigFunction(args, namespace, storagePath);
  }
  
  static initHelpFunctionParser(args: CLIArgs = this.DefaultParserArgs,
                                        namespace: string,
                                        storagePath: string): HelpFunction {
    return new HelpFunction(args, namespace, storagePath);
  }
  
  static initOpenFunctionParser(args: CLIArgs, namespace: string, storagePath: string): OpenFunction {
    return new OpenFunction(args, namespace, storagePath);
  }
  
  static initSearchFunctionParser(args: CLIArgs, namespace: string, storagePath: string): SearchFunction {
    return new SearchFunction(args, namespace, storagePath);
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
        return this.initHelpFunctionParser(args, namespace, storagePath);
      case CLIFunctionType.New:
        return this.initNewFunctionParser(args, namespace, storagePath);
      case CLIFunctionType.Config:
        return this.initConfigFunctionParser(args, namespace, storagePath);
      case CLIFunctionType.Open:
        return this.initOpenFunctionParser(args, namespace, storagePath);
      case CLIFunctionType.Search:
        return this.initSearchFunctionParser(args, namespace, storagePath);
      default:
        return this.initHelpFunctionParser(undefined, namespace, storagePath);
    }
  }
}