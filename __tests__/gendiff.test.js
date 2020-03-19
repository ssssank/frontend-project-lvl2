import fs from 'fs';
import path from 'path';
import gendiff from '../src';

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(filename, 'utf-8');

const fileExtentions = ['json', 'yml', 'ini'];
const outputFormats = ['pretty', 'plain', 'json'];

const testInput = outputFormats.flatMap((format) => (
  fileExtentions.map((filetype) => [filetype, format])
));

const right = {};

beforeAll(() => {
  right.json = readFile(getFixturePath('right_json'));
  right.plain = readFile(getFixturePath('right_plain'));
  right.pretty = readFile(getFixturePath('right_pretty'));
});

test.each(testInput)('test %s files with %s output format', (ext, format) => {
  const beforeFilepath = getFixturePath(`before.${ext}`);
  const afterFilepath = getFixturePath(`after.${ext}`);
  expect(gendiff(beforeFilepath, afterFilepath, format)).toEqual(right[format]);
});
