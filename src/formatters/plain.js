import _ from 'lodash';

const getValue = (value) => (_.isObject(value) ? '[complex value]' : value);

const render = (AST) => {
  const iter = (tree, path) => {
    const res = tree
      .filter((key) => key.status !== 'not modified')
      .map((key) => {
        const newPath = [...path, key.name];
        const value = getValue(key.value);
        const modifiedValue = getValue(key.valueNew);
        switch (key.status) {
          case 'nested':
            return iter(key.children, newPath);
          case 'modified':
            return `Property '${newPath.join('.')}' was changed from ${value} to ${modifiedValue}`;
          case 'deleted':
            return `Property '${newPath.join('.')}' was deleted`;
          case 'added':
            return `Property '${newPath.join('.')}' was added with value: ${value}`;
          default:
            throw new Error(`Unknown status of key '${key.status}'!`);
        }
      });

    return res.join('\n');
  };

  return iter(AST, []);
};

export default render;
