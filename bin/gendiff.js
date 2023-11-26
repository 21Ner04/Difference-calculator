#!/usr/bin/env node
import { program } from 'commander';

import  gendiff  from '../src/index.js';

program
  .version('0.0.1', '-V, --version', 'output the version number')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format <type>', 'output format', 'stylish')
  .arguments('<filePath1> <filePath2> ')
  .action((filePath1, filePath2) => {
    console.log(gendiff(filePath1, filePath2, program.opts().format));
  });

program.parse();