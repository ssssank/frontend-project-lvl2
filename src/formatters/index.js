import plain from './plain';
import text from './text';

const renders = {
  plain,
  text,
};

const render = (format) => renders[format];

export default render;
