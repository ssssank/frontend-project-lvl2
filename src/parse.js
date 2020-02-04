import path from 'path';
import fs from 'fs';
import ini from 'ini';
import yaml from 'js-yaml';

const parserMap = {
  '.json': JSON.parse,
  '.yml': yaml.safeLoad,
  '.ini': ini.parse,
};

const parse = (file) => {
  const format = path.extname(file);
  const data = fs.readFileSync(file, 'utf-8');
  return parserMap[format](data);
};

export default parse;
