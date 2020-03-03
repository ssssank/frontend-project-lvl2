import plain from './plain';
import text from './text';
import json from './json';

const renders = {
  plain,
  text,
  json,
};

const getFormatter = (format) => renders[format];

export default getFormatter;
