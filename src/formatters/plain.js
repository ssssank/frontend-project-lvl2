import _ from 'lodash';

const render = (AST) => {
  const iter = (tree, path) => {
    const keys = Object.keys(tree);
    const res = keys
      .filter((key) => tree[key].status !== 'not modified')
      .map((key) => {
        const newPath = path.length === 0 ? `${key}` : `${path}.${key}`;
        if (_.has(tree[key], 'children')) {
          return (`${iter(tree[key].children, newPath)}`);
        }
        const value = _.isObject(tree[key].value) ? '[complex value]' : tree[key].value;
        const valueNew = _.isObject(tree[key].valueNew) ? '[complex value]' : tree[key].valueNew;
        switch (tree[key].status) {
          case 'modified':
            return `Property '${newPath}' was changed from ${value} to ${valueNew}`;
          case 'deleted':
            return `Property '${newPath}' was deleted`;
          case 'added':
            return `Property '${newPath}' was added with value: ${value}`;
          default:
            break;
        }

        return '';
      });

    return res.join('\n');
  };

  return iter(AST, '');
};

export default render;
