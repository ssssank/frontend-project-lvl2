import fs from 'fs';
import path from 'path';
import gendiff from '../src';

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(filename, 'utf-8');

const fileExtentions = ['json', 'yml', 'ini'];
const outputFormats = ['text', 'plain', 'json'];

const testInput = outputFormats.flatMap((format) => (
  fileExtentions.map((filetype) => [filetype, format])
));

test.each(testInput)('test %s files with %s output format', (ext, format) => {
  const rightFile = readFile(getFixturePath(`right_${format}`));
  const beforeFile = getFixturePath(`before.${ext}`);
  const afterFile = getFixturePath(`after.${ext}`);
  expect(gendiff(beforeFile, afterFile, format)).toEqual(rightFile);
});
