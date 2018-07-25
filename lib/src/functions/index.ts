export interface ICLIFunction {
  run(): void;
}

export enum CLIFunctionType {
  New = 'new',
  Help = 'help',
  Config = 'config'
}

export interface CLIArgs {
  function: CLIFunctionType,
  params: { [key: string]: string } | null
}

export enum ConfigKeys {
  Editor = 'editor'
}