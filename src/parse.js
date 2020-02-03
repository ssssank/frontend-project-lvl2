import path from 'path';
import fs from 'fs';
import yaml from 'js-yaml';

const parserMap = {
  '.json': JSON.parse,
  '.yml': yaml.safeLoad,
};

const parse = (file) => {
  const format = path.extname(file);
  const data = fs.readFileSync(file);
  return parserMap[format](data);
};

export default parse;
