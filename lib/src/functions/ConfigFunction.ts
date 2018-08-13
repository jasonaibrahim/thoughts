import {CLIFunction} from './CLIFunction';
import {CLIFunctionHelper} from './CLIFunctionHelper';
import {intersection} from 'lodash';
import {Logger} from '../loggers/Logger';

export enum ConfigKey {
  Editor = 'editor'
}

export enum ConfigDirective {
  Set = 'set',
  Remove = 'remove'
}

export class ConfigFunction extends CLIFunction {

  private static getFallbackConfigValueForKey(key: string): string {
    const fallbackValues: { [key: string]: string } = {
      [ConfigKey.Editor]: 'open'
    };
    return fallbackValues[key];
  }

  /**
   * Set configuration via arguments passed
   */
  function(): Promise<any> {
    const directive = this.parseDirectiveFromArgs();
    if (directive) {
      const configKeys = this.parseConfigurableKeysFromArgs();
      configKeys.forEach(key => {
        if (directive === ConfigDirective.Set) {
          const newValue = this.parseConfigValueFromArgs(key);
          if (newValue) {
            this.setConfig(key, newValue);
            Logger.printSuccessMessage(`Saved ${key} with new value "${newValue}".`);
          }
        } else if (directive === ConfigDirective.Remove) {
          this.deleteConfig(key);
          Logger.printSuccessMessage(`Removed "${key}".`);
        }
      });
      return Promise.resolve();
    } else {
      return Promise.reject(new Error(`Unknown directive "${directive}" passed to CLI`));
    }
  }

  private parseDirectiveFromArgs(): string | undefined {
    if (this.args.params) {
      const arg = this.args.params[CLIFunctionHelper.ARG_KEY][1];
      return intersection(
        [arg],
        Object.keys(ConfigDirective).map(key => ConfigDirective[key as any])
      ).pop();
    }
  }

  private parseConfigurableKeysFromArgs(): string[] {
    if (this.args.params) {
      return intersection(
        Object.keys(this.args.params),
        Object.keys(ConfigKey).map(key => ConfigKey[key as any])
      );
    } else {
      return [];
    }
  }

  private parseConfigValueFromArgs(key: string): string {
    try {
      const value = this.args.params[key].trim();
      return value ? value : ConfigFunction.getFallbackConfigValueForKey(key);
    } catch (err) {
      return ConfigFunction.getFallbackConfigValueForKey(key);
    }
  }
}