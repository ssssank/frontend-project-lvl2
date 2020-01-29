import commander from 'commander';
import fs from 'fs';
import gendiff from './gendiff';

const pkg = require('../package.json');

const program = new commander.Command();
program
  .version(pkg.version)
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format <type>', 'Output format')
  .arguments('<firstConfig> <secondConfig>')
  .action((firstConfig, secondConfig) => {
    const file1 = JSON.parse(fs.readFileSync(firstConfig));
    const file2 = JSON.parse(fs.readFileSync(secondConfig));

    console.log(gendiff(file1, file2));
  });

export default program;
