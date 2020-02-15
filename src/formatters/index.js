import plain from './plain';
import text from './text';

const render = (format) => {
  if (format === 'plain') {
    return plain;
  }
  return text;
};

export default render;
