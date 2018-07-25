import 'jasmine';
import {CLIFunction} from '../lib/src/functions/CLIFunction';
import {CLIArgs, CLIFunctionType} from '../lib/src/functions';
import {NewFunction} from '../lib/src/functions/NewFunction';
import {HelpFunction} from '../lib/src/functions/HelpFunction';
import minimist = require('minimist');
import {CLIFunctionHelper} from '../lib/src/functions/CLIFunctionHelper';

describe('CLI Parsing', () => {
  
  it('should provide a method for instantiating a CLIFunction from args', () => {
    const args = minimist(['new', '--foo', 'bar']);
    const parser = CLIFunctionHelper.instantiateFromArgs(args);
    expect(parser instanceof NewFunction).toEqual(true);
  });
  
  it('should return the help parser if no arguments are given', () => {
    const args = minimist(['--foo', 'bar']);
    const parser = CLIFunctionHelper.instantiateFromArgs(args);
    expect(parser instanceof HelpFunction).toEqual(true);
  });
  
  it('should accept a CLIArgs object as a constructor argument', () => {
    const args: CLIArgs = {
      function: CLIFunctionType.Help,
      params: null
    };
    const parser = new CLIFunction(args, '');
    expect(parser.getArgs()).toEqual(args);
  });
  
  it('should accept a Help Function type of CLIFunction', () => {
    const args: CLIArgs = {
      function: CLIFunctionType.Help,
      params: null
    };
    const parser = new CLIFunction(args, '');
    expect(parser.getFunction()).toEqual(CLIFunctionType.Help);
  });
  
  it('should accept a Help Function type of CLIFunction', () => {
    const args: CLIArgs = {
      function: CLIFunctionType.New,
      params: null
    };
    const parser = new CLIFunction(args, '');
    expect(parser.getFunction()).toEqual(CLIFunctionType.New);
  });
});

describe('Creating Data Directory', () => {
  it('should create a data directory if one doesnt exist', () => {
  
  });
});