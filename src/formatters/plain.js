import _ from 'lodash';

const getValue = (value) => (_.isObject(value) ? '[complex value]' : value);

const render = (AST) => {
  const iter = (tree, path) => {
    const result = tree
      .filter((key) => key.status !== 'unchanged')
      .map((key) => {
        const newPath = [...path, key.name];
        switch (key.status) {
          case 'nested':
            return iter(key.children, newPath);
          case 'modified': {
            const oldValue = getValue(key.oldValue);
            const newValue = getValue(key.newValue);
            return `Property '${newPath.join('.')}' was changed from ${oldValue} to ${newValue}`;
          }
          case 'deleted':
            return `Property '${newPath.join('.')}' was deleted`;
          case 'added': {
            const value = getValue(key.value);
            return `Property '${newPath.join('.')}' was added with value: ${value}`;
          }
          default:
            throw new Error(`Unknown status of key '${key.status}'!`);
        }
      });

    return result.join('\n');
  };

  return iter(AST, []);
};

export default render;
