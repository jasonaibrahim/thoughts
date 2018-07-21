#!/usr/bin/env node

import {CLIParser} from './lib/parsing/CLIParser';

const parser = new CLIParser(process.argv.slice(2));
console.log(parser.parse());