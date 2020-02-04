import fs from 'fs';
import yaml from 'js-yaml';
import ini from 'ini';
import gendiff from '../src/gendiff';

test('json', () => {
  const right = fs.readFileSync(`${__dirname}/../fixtures/right_json`, 'utf-8');
  const before = fs.readFileSync(`${__dirname}/../fixtures/before.json`, 'utf-8');
  const after = fs.readFileSync(`${__dirname}/../fixtures/after.json`, 'utf-8');
  expect(gendiff({}, {})).toEqual('{\n}');
  expect(gendiff(JSON.parse(before), JSON.parse(after))).toEqual(right);
});

test('yaml', () => {
  const right = fs.readFileSync(`${__dirname}/../fixtures/right_yml`, 'utf-8');
  const before = fs.readFileSync(`${__dirname}/../fixtures/before.yml`, 'utf-8');
  const after = fs.readFileSync(`${__dirname}/../fixtures/after.yml`, 'utf-8');
  expect(gendiff({}, {})).toEqual('{\n}');
  expect(gendiff(yaml.safeLoad(before), yaml.safeLoad(after))).toEqual(right);
});

test('ini', () => {
  const right = fs.readFileSync(`${__dirname}/../fixtures/right_ini`, 'utf-8');
  const before = fs.readFileSync(`${__dirname}/../fixtures/before.ini`, 'utf-8');
  const after = fs.readFileSync(`${__dirname}/../fixtures/after.ini`, 'utf-8');
  expect(gendiff({}, {})).toEqual('{\n}');
  expect(gendiff(ini.parse(before), ini.parse(after))).toEqual(right);
});
