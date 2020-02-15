import _ from 'lodash';

const render = (AST) => {
  const iter = (tree, parents) => {
    const keys = Object.keys(tree);
    const res = [];
    keys.forEach((key) => {
      const parentsNew = parents.length === 0 ? `${key}` : `${parents}.${key}`;
      if (_.has(tree[key], 'children')) {
        res.push(`${iter(tree[key].children, parentsNew)}`);
      }
      let { value, valueNew } = tree[key];
      if (_.isObject(value)) {
        value = '[complex value]';
      } else if (_.isObject(valueNew)) {
        valueNew = '[complex value]';
      }
      if (tree[key].status === 'modified') {
        res.push(`Property '${parentsNew}' was changed from ${value} to ${valueNew}`);
      } else if (tree[key].status === 'deleted') {
        res.push(`Property '${parentsNew}' was deleted`);
      } else if (tree[key].status === 'added') {
        res.push(`Property '${parentsNew}' was added with value: ${value}`);
      }
    });

    return res.join('\n');
  };

  return iter(AST, '');
};

export default render;
