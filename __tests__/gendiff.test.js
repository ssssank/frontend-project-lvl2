import fs from 'fs';
import path from 'path';
import gendiff from '../src';

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(filename, 'utf-8');

test.each([
  ['json', 'text'],
  ['yml', 'text'],
  ['ini', 'text'],
  ['json', 'plain'],
  ['yml', 'plain'],
  ['ini', 'plain'],
  ['json', 'json'],
  ['yml', 'json'],
  ['ini', 'json'],
])('test %s file with %s format', (ext, format) => {
  const rightFile = readFile(getFixturePath(`right_${format}`));
  const beforeFile = getFixturePath(`before.${ext}`);
  const afterFile = getFixturePath(`after.${ext}`);
  expect(gendiff(beforeFile, afterFile, format)).toEqual(rightFile);
});
