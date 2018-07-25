import {CLIArgs, CLIFunctionType, ICLIFunction} from './index';

export class CLIFunction implements ICLIFunction {
  
  protected readonly args: CLIArgs;
  protected readonly storagePath: string;
  
  constructor(args: CLIArgs, storagePath: string) {
    this.args = args;
    this.storagePath = storagePath;
  }
  
  getArgs(): CLIArgs {
    return {...this.args};
  }
  
  getFunction(): CLIFunctionType {
    return this.args.function;
  }
  
  run(): void {
  }
}
