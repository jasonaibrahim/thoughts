import {Logger} from '../../lib/src/loggers/Logger';
import chalk from 'chalk';

describe('Logger', () => {
  it('should print success messages in green', () => {
    spyOn(console, 'log').and.stub();
    Logger.printSuccessMessage('foo');
    expect(console.log).toHaveBeenCalledWith(chalk.green('foo'));
  });
});