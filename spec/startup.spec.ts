import * as fs from 'fs';
import {run} from '../lib/src/main';
import {CLIFunctionHelper} from '../lib/src/functions/CLIFunctionHelper';
import {DummyCLIFunction} from './DummyCLIFunction';

describe('Startup', () => {
  describe('Parsing command line args', () => {
    
    it('should parse command line args into CLIArgs', () => {
      spyOn(process.argv, 'slice').and.callFake(() => {
        return ['new', 'Today was a good day'];
      });
      spyOn(fs, 'existsSync').and.stub();
      spyOn(fs, 'mkdirSync').and.stub();
      spyOn(CLIFunctionHelper, 'instantiateFromArgs').and.returnValue(new DummyCLIFunction());
      
      run();
      
      expect(process.argv.slice).toHaveBeenCalled();
    });
    
    it('should not throw for an unknown function', () => {
      spyOn(process.argv, 'slice').and.callFake(() => {
        return ['foo', '--version', 'bar'];
      });
      spyOn(fs, 'existsSync').and.stub();
      spyOn(fs, 'mkdirSync').and.stub();
      spyOn(CLIFunctionHelper, 'instantiateFromArgs').and.returnValue(new DummyCLIFunction());
      expect(run).not.toThrow();
    });
  });
});