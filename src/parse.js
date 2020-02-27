import ini from 'ini';
import yaml from 'js-yaml';

const parserMap = {
  json: JSON.parse,
  yml: yaml.safeLoad,
  ini: ini.parse,
};

const parse = (content, type) => parserMap[type](content);

export default parse;
