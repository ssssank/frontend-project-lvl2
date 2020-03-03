import _ from 'lodash';

const render = (AST) => {
  const iter = (tree, path) => {
    const res = tree
      .filter((key) => key.status !== 'not modified')
      .map((key) => {
        const newPath = path.length === 0 ? `${key.name}` : `${path}.${key.name}`;
        const value = _.isObject(key.value) ? '[complex value]' : key.value;
        const valueNew = _.isObject(key.valueNew) ? '[complex value]' : key.valueNew;
        switch (key.status) {
          case 'nested':
            return (`${iter(key.children, newPath)}`);
          case 'modified':
            return `Property '${newPath}' was changed from ${value} to ${valueNew}`;
          case 'deleted':
            return `Property '${newPath}' was deleted`;
          case 'added':
            return `Property '${newPath}' was added with value: ${value}`;
          default:
            throw new Error(`Unknown status of key '${key.status}'!`);
        }
      });

    return res.join('\n');
  };

  return iter(AST, '');
};

export default render;
