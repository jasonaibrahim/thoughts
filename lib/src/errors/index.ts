export class NotEnoughArgumentsError extends Error {
  name = 'NotEnoughArgumentsException';
  message = 'Not enough arguments passed to CLI';
}

export class UnknownFunctionError extends Error {
  name = 'UnknownFunctionException';

  constructor(func: string) {
    super();
    this.message = `"${func}" is not a valid CLI function`;
  }
}

export class StoragePathUndefinedError extends Error {
  name = 'StoragePathUndefinedException';
}