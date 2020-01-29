import commander from 'commander';
import fs from 'fs';
import _ from 'lodash';

const pkg = require('../package.json');

const diff = (obj1, obj2) => {
  const keys = _.union(Object.keys(obj1), Object.keys(obj2)).sort();
  const res = [];

  keys.forEach((key) => {
    if (_.has(obj1, key)) {
      if (_.has(obj2, key)) {
        if (obj1[key] === obj2[key]) {
          res.push(`  ${key}: ${obj1[key]}`);
        } else {
          res.push(`- ${key}: ${obj1[key]}`);
          res.push(`+ ${key}: ${obj2[key]}`);
        }
      } else {
        res.push(`- ${key}: ${obj1[key]}`);
      }
    } else {
      res.push(`+ ${key}: ${obj2[key]}`);
    }
  });

  return `{ ${res.join(' ')} }`;
};

const program = new commander.Command();
program
  .version(pkg.version)
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format <type>', 'Output format')
  .arguments('<firstConfig> <secondConfig>')
  .action((firstConfig, secondConfig) => {
    const file1 = JSON.parse(fs.readFileSync(firstConfig));
    const file2 = JSON.parse(fs.readFileSync(secondConfig));

    console.log(diff(file1, file2));
  });

export default program;
