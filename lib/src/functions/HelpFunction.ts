import {CLIFunction} from './CLIFunction';
import {Logger} from '../loggers/Logger';

export class HelpFunction extends CLIFunction {

  /**
   * Prints the help text
   */
  function() {
    return Promise.resolve(this.printHelpText());
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
      
    open - Open the directory where all of your Thoughts are stored.
    options:
      none
      Example:
      $ thoughts open
      > (finder / windows explorer opens a new window)
    
    config - Set defaults such as where to store files and default file extensions.
    
    set - set a config value
    remove - remove a config value
    options:
      --editor - the editor to use when opening Thoughts from the CLI
      Example - use visual studio code
      $ thoughts config set --editor code
      
      Example - Remove a config value
      $ thoughts config remove --editor
    
    search - Search through all Thoughts by keywords. All files that contain the supplied text will be opened in your
    configured editor.
    options:
      none
      Example:
      $ thoughts search today
      > 1 results found for query "today"
      > The following files will be opened in your configured editor:
      > /Users/foo/bar/thoughts-cli/lib/data/2018-07-28T22:16:17-07:00.txt

    
    help - Show this help dialog.
    
    Examples
    
    $ thoughts new "Today was a good day"
    > Saved.
    
    ==
    `;
    Logger.printSuccessMessage(text);
  }
}