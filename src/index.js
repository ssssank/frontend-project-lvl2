import commander from 'commander';

const pkg = require("../package.json");
const program = new commander.Command();
program
  .version(pkg.version)
  .description('Compares two configuration files and shows a difference.');

export { program };
