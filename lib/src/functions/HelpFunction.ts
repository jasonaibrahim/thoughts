import chalk from 'chalk';
import {CLIFunction} from './CLIFunction';

export class HelpFunction extends CLIFunction {
  run() {
    this.printHelpText();
  }
  
  private printHelpText() {
    const text = `
    T H O U G H T S
    ===============
    
    Usage
    
    new - Create a new Thought. Start typing and hit enter and this will automatically be saved.
    options:
      --ext - The file extension to use. Default is txt.
      Example:
      $ thoughts new "Today was a good day" --ext md
      > Saved.
      
    open - Open a Thought.
      
    config - Set defaults such as where to store files and default file extensions.
    
    help - Show this help dialog.
    
    Examples
    
    $ thoughts new "Today was a good day"
    > Saved.
    
    ==
    `;
    console.log(chalk.green(text));
  }
}