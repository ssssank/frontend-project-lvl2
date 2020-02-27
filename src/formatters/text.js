import _ from 'lodash';

const tabSize = 4;

const getIndent = (level, mark = ' ') => {
  if (level === 0) {
    return '';
  }
  return `${' '.repeat(((level * tabSize) - 2))}${mark} `;
};

const stringify = (value, level) => `{\n${getIndent(level + 1)}${Object.keys(value)}: ${Object.values(value)}\n${getIndent(level)}}`;

const render = (AST) => {
  const iter = (tree, level) => {
    const res = tree.map((key) => {
      if (_.has(key, 'children')) {
        return `${getIndent(level)}${key.name}: ${iter(key.children, level + 1)}`;
      }
      const value = _.isObject(key.value) ? `${stringify(key.value, level)}` : key.value;
      const valueNew = _.isObject(key.valueNew) ? `${stringify(key.valueNew, level)}` : key.valueNew;
      switch (key.status) {
        case 'modified':
          return `${getIndent(level, '-')}${key.name}: ${value}\n${getIndent(level, '+')}${key.name}: ${valueNew}`;
        case 'deleted':
          return `${getIndent(level, '-')}${key.name}: ${value}`;
        case 'added':
          return `${getIndent(level, '+')}${key.name}: ${value}`;
        case 'not modified':
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
