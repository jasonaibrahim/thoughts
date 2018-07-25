import chalk from 'chalk';

/**
 * Logger class to print messages to stdout in various colors depending on context.
 */
export class Logger {
  
  static printSuccessMessage(msg: string) {
    console.log(chalk.green(msg));
  }
  
  static printErrorMessage(msg: string) {
    console.log(chalk.red(msg));
  }
  
}