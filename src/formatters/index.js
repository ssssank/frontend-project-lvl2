import plain from './plain';
import text from './text';
import json from './json';

const renders = {
  plain,
  text,
  json,
};

const render = (format) => renders[format];

export default render;
