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
    const keys = Object.keys(tree);
    const res = keys.map((key) => {
      if (_.has(tree[key], 'children')) {
        return `${getIndent(level)}${key}: ${iter(tree[key].children, level + 1)}`;
      }
      const value = _.isObject(tree[key].value) ? `${stringify(tree[key].value, level)}` : tree[key].value;
      const valueNew = _.isObject(tree[key].valueNew) ? `${stringify(tree[key].valueNew, level)}` : tree[key].valueNew;
      switch (tree[key].status) {
        case 'modified':
          return `${getIndent(level, '-')}${key}: ${value}\n${getIndent(level, '+')}${key}: ${valueNew}`;
        case 'deleted':
          return `${getIndent(level, '-')}${key}: ${value}`;
        case 'added':
          return `${getIndent(level, '+')}${key}: ${value}`;
        case 'not modified':
          return `${getIndent(level)}${key}: ${value}`;
        default:
          break;
      }
      return '';
    });

    return res.length > 0 ? `{\n${res.join('\n')}\n${getIndent(level - 1)}}` : '{}';
  };

  return iter(AST, 1);
};

export default render;
