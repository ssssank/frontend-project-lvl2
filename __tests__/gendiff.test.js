import fs from 'fs';
import yaml from 'js-yaml';
import ini from 'ini';
import path from 'path';
import gendiff from '../src/gendiff';

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test('json', () => {
  const right = readFile('right_json');
  const before = readFile('before.json');
  const after = readFile('after.json');
  expect(gendiff({}, {})).toEqual('{\n}');
  expect(gendiff(JSON.parse(before), JSON.parse(after))).toEqual(right);
});

test('yaml', () => {
  const right = readFile('right_yml');
  const before = readFile('before.yml');
  const after = readFile('after.yml');
  expect(gendiff({}, {})).toEqual('{\n}');
  expect(gendiff(yaml.safeLoad(before), yaml.safeLoad(after))).toEqual(right);
});

test('ini', () => {
  const right = readFile('right_ini');
  const before = readFile('before.ini');
  const after = readFile('after.ini');
  expect(gendiff({}, {})).toEqual('{\n}');
  expect(gendiff(ini.parse(before), ini.parse(after))).toEqual(right);
});

test('json2', () => {
  const right = readFile('right_json_2');
  const before = readFile('before_2.json');
  const after = readFile('after_2.json');
  expect(gendiff({}, {})).toEqual('{\n}');
  expect(gendiff(JSON.parse(before), JSON.parse(after))).toEqual(right);
});
