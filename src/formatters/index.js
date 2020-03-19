import plain from './plain';
import pretty from './pretty';
import json from './json';

const renders = {
  plain,
  pretty,
  json,
};

const getFormatter = (format) => renders[format];

export default getFormatter;
