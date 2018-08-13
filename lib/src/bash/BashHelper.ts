import Configstore = require('configstore');
import {ConfigKeys} from '../functions';
import {exec} from "child_process";
import {Logger} from '../loggers/Logger';

export class BashHelper {
  static openFileInDefaultEditor(config: Configstore, pathToFile: string) {
    if (config.get(ConfigKeys.Editor)) {
      const cmd = `${config.get(ConfigKeys.Editor)} ${pathToFile}`;
      exec(cmd, err => {
        if (err) {
          Logger.printErrorMessage(err.message);
        }
      });
    } else {
      Logger.printSuccessMessage(pathToFile);
    }
  }
}