import {CLIArgs, CLIFunctionType, ICLIFunction} from './index';
import * as ConfigStore from 'configstore';

export class CLIFunction implements ICLIFunction {
  
  protected readonly args: CLIArgs;
  protected readonly storagePath: string;
  protected readonly config: ConfigStore;
  protected readonly namespace: string;
  
  constructor(args: CLIArgs, namespace: string, storagePath: string) {
    this.args = args;
    this.storagePath = storagePath;
    this.namespace = namespace;
    this.config = new ConfigStore(namespace);
  }
  
  getArgs(): CLIArgs {
    return {...this.args};
  }
  
  getFunction(): CLIFunctionType {
    return this.args.function;
  }
  
  getConfig(key: string): any {
    return this.config.get(key);
  }
  
  setConfig(key: string, value: any) {
    this.config.set(key, value);
  }
  
  getConfigPath(): string {
    return this.config.path;
  }
  
  /**
   * No-op, designed for subclasses to take over.
   */
  run() {
    this.functionWillRun();
    
    this.function().then(data => {
      this.functionDidRun(data);
    });
  }
  
  functionWillRun(): void {
  }
  
  function(): Promise<any> {
    return Promise.resolve();
  }
  
  functionDidRun(data: any) {
  }
}
