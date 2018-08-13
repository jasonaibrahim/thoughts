export interface ICLIFunction {
  run(): void;

  functionWillRun(): void;

  function(): Promise<any>;

  functionDidRun(data: any): void;
}

export enum CLIFunctionType {
  New = 'new',
  Help = 'help',
  Config = 'config',
  Open = 'open',
  Search = 'search'
}

export interface CLIArgs {
  function: CLIFunctionType,
  params: { [key: string]: string } | null
}