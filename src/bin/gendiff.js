#!/usr/bin/env node
import commander from 'commander';
import gendiff from '..';

const pkg = require('../../package.json');

const program = new commander.Command();
program
  .version(pkg.version)
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'Output format')
  .arguments('<firstConfig> <secondConfig>')
  .action((firstConfig, secondConfig) => {
    console.log(gendiff(firstConfig, secondConfig, program.format));
  });

program.parse(process.argv);
