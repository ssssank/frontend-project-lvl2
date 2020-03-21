import _ from 'lodash';

const tabSize = 4;

const getIndent = (level, mark = ' ') => {
  if (level === 0) {
    return '';
  }
  return `${' '.repeat(((level * tabSize) - 2))}${mark} `;
};

const stringify = (value, level) => {
  if (!(_.isObject(value))) {
    return value;
  }
  const innerIndent = getIndent(level + 1);
  const externalIndent = getIndent(level);
  const key = Object.keys(value);
  const property = Object.values(value);
  return `{\n${innerIndent}${key}: ${property}\n${externalIndent}}`;
};

const render = (AST) => {
  const iter = (tree, level) => {
    const res = tree.map((key) => {
      const value = `${stringify(key.value, level)}`;
      switch (key.status) {
        case 'nested':
          return `${getIndent(level)}${key.name}: ${iter(key.children, level + 1)}`;
        case 'modified': {
          const modifiedValue = `${stringify(key.modifiedValue, level)}`;
          return `${getIndent(level, '-')}${key.name}: ${value}\n${getIndent(level, '+')}${key.name}: ${modifiedValue}`;
        }
        case 'deleted':
          return `${getIndent(level, '-')}${key.name}: ${value}`;
        case 'added':
          return `${getIndent(level, '+')}${key.name}: ${value}`;
        case 'unchanged':
          return `${getIndent(level)}${key.name}: ${value}`;
        default:
          throw new Error(`Unknown status of key '${key.status}'!`);
      }
    });

    return res.length > 0 ? `{\n${res.join('\n')}\n${getIndent(level - 1)}}` : '{}';
  };

  return iter(AST, 1);
};

export default render;
