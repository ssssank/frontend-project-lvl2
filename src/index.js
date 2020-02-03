import commander from 'commander';
import gendiff from './gendiff';
import parse from './parse';

const pkg = require('../package.json');

const program = new commander.Command();
program
  .version(pkg.version)
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'Output format')
  .arguments('<firstConfig> <secondConfig>')
  .action((firstConfig, secondConfig) => {
    const file1 = parse(firstConfig);
    const file2 = parse(secondConfig);

    console.log(gendiff(file1, file2));
  });

export default program;
