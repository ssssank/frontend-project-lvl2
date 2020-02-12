import _ from 'lodash';

const buildAST = (obj1, obj2) => {
  const keys = _.union(Object.keys(obj1), Object.keys(obj2)).sort();
  const AST = {};

  keys.forEach((key) => {
    if (_.has(obj1, key)) {
      if (_.has(obj2, key)) {
        if (_.isObject(obj1[key]) && _.isObject(obj2[key])) {
          AST[key] = {
            children: buildAST(obj1[key], obj2[key]),
          };
        } else if (obj1[key] === obj2[key]) {
          AST[key] = {
            value: obj1[key],
            status: 'not modified',
          };
        } else {
          AST[key] = {
            value: obj1[key],
            valueNew: obj2[key],
            status: 'modified',
          };
        }
      } else {
        AST[key] = {
          value: obj1[key],
          status: 'deleted',
        };
      }
    } else {
      AST[key] = {
        value: obj2[key],
        status: 'added',
      };
    }
  });

  return AST;
};

const stringify = (value) => `${Object.keys(value)}: ${Object.values(value)}`;

const getIndent = (level, z = ' ') => {
  if (level === 0) {
    return '';
  }
  return `${' '.repeat(((level * 4) - 2))}${z} `;
};

const renderDiff = (AST) => {
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

const gendiff = (obj1, obj2) => {
  const AST = buildAST(obj1, obj2);
  return renderDiff(AST);
};

export default gendiff;
