import _ from 'lodash';

const getValue = (value) => (_.isObject(value) ? '[complex value]' : value);

const render = (AST) => {
  const iter = (tree, path) => {
    const res = tree
      .filter((key) => key.status !== 'not modified')
      .map((key) => {
        const newPath = path.length === 0 ? `${key.name}` : `${path}.${key.name}`;
        const value = getValue(key.value);
        const modifiedValue = getValue(key.valueNew);
        switch (key.status) {
          case 'nested':
            return iter(key.children, newPath);
          case 'modified':
            return `Property '${newPath}' was changed from ${value} to ${modifiedValue}`;
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
