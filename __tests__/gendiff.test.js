import fs from 'fs';
import yaml from 'js-yaml';
import ini from 'ini';
import path from 'path';
import gendiff from '../src';

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test('yml intput', () => {
  const right = readFile('right_text');
  const before = readFile('before.yml');
  const after = readFile('after.yml');
  expect(gendiff({}, {})).toEqual('{}');
  expect(gendiff(yaml.safeLoad(before), yaml.safeLoad(after))).toEqual(right);
});

test('ini intput', () => {
  const right = readFile('right_text');
  const before = readFile('before.ini');
  const after = readFile('after.ini');
  expect(gendiff({}, {})).toEqual('{}');
  expect(gendiff(ini.parse(before), ini.parse(after))).toEqual(right);
});

test('text output', () => {
  const right = readFile('right_text');
  const before = readFile('before.json');
  const after = readFile('after.json');
  expect(gendiff({}, {})).toEqual('{}');
  expect(gendiff(JSON.parse(before), JSON.parse(after))).toEqual(right);
});

test('plain output', () => {
  const right = readFile('right_plain');
  const before = readFile('before.json');
  const after = readFile('after.json');
  expect(gendiff({}, {}, 'plain')).toEqual('');
  expect(gendiff(JSON.parse(before), JSON.parse(after), 'plain')).toEqual(right);
});

test('json output', () => {
  const right = readFile('right_json');
  const before = readFile('before.json');
  const after = readFile('after.json');
  expect(gendiff({}, {}, 'plain')).toEqual('');
  expect(gendiff(JSON.parse(before), JSON.parse(after), 'json')).toEqual(right);
});
