import {ICLIFunction} from '../lib/src/functions';

export class DummyCLIFunction implements ICLIFunction {
  run () {

  }

  functionWillRun() {

  }

  function(): Promise<any> {
    return Promise.resolve();
  }

  functionDidRun(data: any) {

  }
}