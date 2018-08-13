import Configstore = require('configstore');
import {exec} from 'child_process';
import {Logger} from '../loggers/Logger';
import {ConfigKey} from '../functions/ConfigFunction';

export class BashHelper {

  static readonly DefaultEditor = 'open';

  static openFileInDefaultEditor(config: Configstore, pathToFile: string) {
    let editor = config.get(ConfigKey.Editor);
    if (!editor) {
      editor = BashHelper.DefaultEditor;
    }
    const cmd = `${editor} ${pathToFile}`;
    Logger.printSuccessMessage(`Sending command "${cmd}"`);
    exec(cmd, err => {
      if (err) {
        Logger.printErrorMessage(err.message);
      }
    });
  }
}