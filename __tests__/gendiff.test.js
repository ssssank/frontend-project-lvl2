import fs from 'fs';
import path from 'path';
import gendiff from '../src';

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(filename, 'utf-8');

test('plain output', () => {
  const right = readFile(getFixturePath('right_plain'));
  const before = getFixturePath('before.json');
  const after = getFixturePath('after.json');
  expect(gendiff(before, after, 'plain')).toEqual(right);
});

test('json output', () => {
  const right = readFile(getFixturePath('right_json'));
  const before = getFixturePath('before.json');
  const after = getFixturePath('after.json');
  expect(gendiff(before, after, 'json')).toEqual(right);
});

test.each([
  ['before.json', 'after.json', 'right_text'],
  ['before.yml', 'after.yml', 'right_text'],
  ['before.ini', 'after.ini', 'right_text'],
])('test %s file', (before, after, right) => {
  const rightFile = readFile(getFixturePath(right));
  const beforeFile = getFixturePath(before);
  const afterFile = getFixturePath(after);
  expect(gendiff(beforeFile, afterFile)).toEqual(rightFile);
});
