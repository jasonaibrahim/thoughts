export interface ICLIFunction {
  run(): void;
}

export enum CLIFunctionType {
  New = 'new',
  Help = 'help'
}

export interface CLIArgs {
  function: CLIFunctionType,
  params: { [key: string]: string } | null
}