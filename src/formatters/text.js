import _ from 'lodash';

const stringify = (value) => `${Object.keys(value)}: ${Object.values(value)}`;

const getIndent = (level, z = ' ') => {
  if (level === 0) {
    return '';
  }
  return `${' '.repeat(((level * 4) - 2))}${z} `;
};

const render = (AST) => {
  const iter = (tree, level) => {
    const keys = Object.keys(tree);
    const res = [];
    keys.forEach((key) => {
      if (_.has(tree[key], 'children')) {
        res.push(`${getIndent(level)}${key}: ${iter(tree[key].children, level + 1)}`);
      }
      let { value, valueNew } = tree[key];
      if (_.isObject(value)) {
        value = `{\n${getIndent(level + 1)}${stringify(value)}\n${getIndent(level)}}`;
      } else if (_.isObject(valueNew)) {
        valueNew = `{\n${getIndent(level + 1)}${stringify(valueNew)}\n${getIndent(level)}}`;
      }
      if (tree[key].status === 'modified') {
        res.push(`${getIndent(level, '-')}${key}: ${value}`);
        res.push(`${getIndent(level, '+')}${key}: ${valueNew}`);
      } else if (tree[key].status === 'not modified') {
        res.push(`${getIndent(level)}${key}: ${value}`);
      } else if (tree[key].status === 'deleted') {
        res.push(`${getIndent(level, '-')}${key}: ${value}`);
      } else if (tree[key].status === 'added') {
        res.push(`${getIndent(level, '+')}${key}: ${value}`);
      }
    });

    return res.length > 0 ? `{\n${res.join('\n')}\n${getIndent(level - 1)}}` : '{}';
  };

  return iter(AST, 1);
};

export default render;
