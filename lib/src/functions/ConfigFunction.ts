import {CLIFunction} from './CLIFunction';
import {CLIFunctionHelper} from './CLIFunctionHelper';
import {ConfigKeys} from './index';
import {intersection} from 'lodash';
import {Logger} from '../loggers/Logger';

export class ConfigFunction extends CLIFunction {
  
  /**
   * Set configuration via arguments passed
   */
  run() {
    if (this.args.params) {
      const config = intersection(
        Object.keys(this.args.params),
        Object.keys(ConfigKeys).map(key => ConfigKeys[key as any])
      );
      config.forEach(key => {
        if (key !== CLIFunctionHelper.ARG_KEY) {
          if (this.args.params) {
            this.config.set(key, this.args.params[key]);
          }
        }
      });
      Logger.printSuccessMessage('Saved.')
    }
  }
}