#!/usr/bin/env node
import commander from 'commander';
import parse from '../parse';
import gendiff from '..';

const pkg = require('../../package.json');

const program = new commander.Command();
program
  .version(pkg.version)
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'Output format')
  .arguments('<firstConfig> <secondConfig>')
  .action((firstConfig, secondConfig) => {
    const file1 = parse(firstConfig);
    const file2 = parse(secondConfig);
    console.log(gendiff(file1, file2, program.format));
  });

program.parse(process.argv);
