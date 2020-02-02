import fs from 'fs';
import gendiff from '../src/gendiff';

test('gendiff', () => {
  const right = fs.readFileSync(`${__dirname}/../fixtures/right`, 'utf-8');
  const before = fs.readFileSync(`${__dirname}/../fixtures/before.json`, 'utf-8');
  const after = fs.readFileSync(`${__dirname}/../fixtures/after.json`, 'utf-8');
  expect(gendiff({}, {})).toEqual('{\n}');
  expect(gendiff(JSON.parse(before), JSON.parse(after))).toEqual(right);
});
