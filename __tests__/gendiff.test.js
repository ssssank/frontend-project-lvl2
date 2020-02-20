import fs from 'fs';
import path from 'path';
import gendiff from '../src';

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(filename, 'utf-8');

test('yml intput', () => {
  const right = readFile(getFixturePath('right_text'));
  const before = getFixturePath('before.yml');
  const after = getFixturePath('after.yml');
  expect(gendiff(before, after)).toEqual(right);
});

test('ini intput', () => {
  const right = readFile(getFixturePath('right_text'));
  const before = getFixturePath('before.ini');
  const after = getFixturePath('after.ini');
  expect(gendiff(before, after)).toEqual(right);
});

test('text output', () => {
  const right = readFile(getFixturePath('right_text'));
  const before = getFixturePath('before.json');
  const after = getFixturePath('after.json');
  expect(gendiff(before, after)).toEqual(right);
});

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
