import {ConfigFunction, ConfigKey} from '../../lib/src/functions/ConfigFunction';
import {CLIFunctionHelper} from '../../lib/src/functions/CLIFunctionHelper';
import * as path from 'path';
import minimist = require('minimist');

describe('ConfigFunction', () => {

  let args = {};
  let namespace = '.thoughts-cli-test';
  let functionUnderTest: ConfigFunction;
  let storagePath = path.join(__dirname, '..', '..', 'test', 'data');

  beforeEach(() => {
    args = minimist(['config', 'set', '--editor', 'foo']);
  });

  beforeEach(() => {
    functionUnderTest = CLIFunctionHelper.instantiateFromArgs(args, namespace, storagePath) as ConfigFunction;
  });

  describe('Run', () => {
    it('should set a configuration value', async (done) => {
      spyOn(functionUnderTest, 'setConfig').and.stub();
      await functionUnderTest.function();
      expect(functionUnderTest.setConfig).toHaveBeenCalled();
      done();
    });

    it('should set a fallback configuration value for editor if one isnt provided', async (done) => {
      args = minimist(['config', 'set', '--editor', '']);
      functionUnderTest = CLIFunctionHelper.instantiateFromArgs(args, namespace, storagePath) as ConfigFunction;
      spyOn(functionUnderTest, 'setConfig').and.stub();
      await functionUnderTest.function();
      expect(functionUnderTest.setConfig).toHaveBeenCalledWith(ConfigKey.Editor, 'open');
      done();
    });

    it('should trim spaces when setting fallback values', async (done) => {
      args = minimist(['config', 'set', '--editor', '    ']);
      functionUnderTest = CLIFunctionHelper.instantiateFromArgs(args, namespace, storagePath) as ConfigFunction;
      spyOn(functionUnderTest, 'setConfig').and.stub();
      await functionUnderTest.function();
      expect(functionUnderTest.setConfig).toHaveBeenCalledWith(ConfigKey.Editor, 'open');
      done();
    });

    it('should ignore nil values when setting fallback values', async (done) => {
      args = minimist(['config', 'set', '--editor']);
      functionUnderTest = CLIFunctionHelper.instantiateFromArgs(args, namespace, storagePath) as ConfigFunction;
      spyOn(functionUnderTest, 'setConfig').and.stub();
      await functionUnderTest.function();
      expect(functionUnderTest.setConfig).toHaveBeenCalledWith(ConfigKey.Editor, 'open');
      done();
    });

    it('should ignore setting a configuration value that isnt supported', async (done) => {
      args = minimist(['config', 'set', '--foo', 'bar']);
      functionUnderTest = CLIFunctionHelper.instantiateFromArgs(args, namespace, storagePath) as ConfigFunction;
      spyOn(functionUnderTest, 'setConfig').and.stub();
      await functionUnderTest.function();
      expect(functionUnderTest.setConfig).not.toHaveBeenCalled();
      done();
    });

    it('should remove a configuration value', async (done) => {
      args = minimist(['config', 'remove', '--editor']);
      functionUnderTest = CLIFunctionHelper.instantiateFromArgs(args, namespace, storagePath) as ConfigFunction;
      spyOn(functionUnderTest, 'deleteConfig').and.stub();
      await functionUnderTest.function();
      expect(functionUnderTest.deleteConfig).toHaveBeenCalled();
      done();
    });

    it('should ignore removal of a configuration value that isnt supoprted', async (done) => {
      args = minimist(['config', 'remove', '--foo']);
      functionUnderTest = CLIFunctionHelper.instantiateFromArgs(args, namespace, storagePath) as ConfigFunction;
      spyOn(functionUnderTest, 'deleteConfig').and.stub();
      await functionUnderTest.function();
      expect(functionUnderTest.deleteConfig).not.toHaveBeenCalled();
      done();
    });
  });
});
