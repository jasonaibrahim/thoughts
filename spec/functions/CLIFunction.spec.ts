import 'jasmine';
import {CLIFunction} from '../../lib/src/functions/CLIFunction';
import {CLIArgs, CLIFunctionType} from '../../lib/src/functions';
import {NewFunction} from '../../lib/src/functions/NewFunction';
import {HelpFunction} from '../../lib/src/functions/HelpFunction';
import minimist = require('minimist');
import {CLIFunctionHelper} from '../../lib/src/functions/CLIFunctionHelper';
import Configstore = require('configstore');
const path = require('path');

let namespace = 'thoughts-cli-test';
let args: CLIArgs;

describe('CLI Parsing', () => {
  
  beforeEach(() => {
    args = {
      function: CLIFunctionType.Help,
      params: null
    };
  });
  
  it('should provide a method for instantiating a CLIFunction from args', () => {
    const args = minimist(['new', '--foo', 'bar']);
    const functionUnderTest = CLIFunctionHelper.instantiateFromArgs(args, namespace);
    expect(functionUnderTest instanceof NewFunction).toEqual(true);
  });
  
  it('should return the help function if no arguments are given', () => {
    const args = minimist(['--foo', 'bar']);
    const functionUnderTest = CLIFunctionHelper.instantiateFromArgs(args, namespace);
    expect(functionUnderTest instanceof HelpFunction).toEqual(true);
  });
  
  it('should accept a CLIArgs object as a constructor argument', () => {
    args.function = CLIFunctionType.Help;
    const functionUnderTest = new CLIFunction(args, namespace, '');
    expect(functionUnderTest.getArgs()).toEqual(args);
  });
  
  it('should accept a Help Function type of CLIFunction', () => {
    args.function = CLIFunctionType.Help;
    const functionUnderTest = new CLIFunction(args, namespace, '');
    expect(functionUnderTest.getFunction()).toEqual(CLIFunctionType.Help);
  });
  
  it('should accept a New Function type of CLIFunction', () => {
    args.function = CLIFunctionType.New;
    const functionUnderTest = new CLIFunction(args, namespace, '');
    expect(functionUnderTest.getFunction()).toEqual(CLIFunctionType.New);
  });
});

describe('Configuration', () => {
  
  beforeEach(() => {
    args = {
      function: CLIFunctionType.Help,
      params: null
    };
  });
  
  beforeEach(() => {
    Configstore.prototype.path = path.join(__dirname, 'tmp', 'test-config.json');
  });
  
  it('should instantiate a configstore', () => {
    args.function = CLIFunctionType.Help;
    const functionUnderTest = new CLIFunction(args, namespace, '');
    functionUnderTest.setConfig('foo', 'bar');
    expect(functionUnderTest.getConfig('foo')).toEqual('bar');
  });
  
  it('should store config under the package name namespace', () => {
    args.function = CLIFunctionType.Help;
    const functionUnderTest = new CLIFunction(args, namespace, '');
    
    expect(functionUnderTest.getConfigPath()).toContain(namespace);
  });
  
});
