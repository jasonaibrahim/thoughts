import {CLIFunction} from '../../lib/src/functions/CLIFunction';
import {CLIArgs, CLIFunctionType} from '../../lib/src/functions';

let namespace = '.thoughts-cli-test';
let args: CLIArgs;

describe('NewFunction', () => {
  
  beforeEach(() => {
    args = {
      function: CLIFunctionType.Help,
      params: null
    };
  });
  
  describe('Run', () => {
    xit('should create a data directory if one doesnt exist', () => {
      args.function = CLIFunctionType.New;
      const functionUnderTest = new CLIFunction(args, namespace, '');
    });
  });
});
