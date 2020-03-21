import _ from 'lodash';

const tabSize = 4;

const getIndent = (level, mark = ' ') => {
  if (level === 0) {
    return '';
  }
  return `${' '.repeat(((level * tabSize) - 2))}${mark} `;
};

const stringify = (value, level) => {
  if (!(_.isObject(value))) {
    return value;
  }
  const innerIndent = getIndent(level + 1);
  const externalIndent = getIndent(level);
  const key = Object.keys(value);
  const property = Object.values(value);
  return `{\n${innerIndent}${key}: ${property}\n${externalIndent}}`;
};

const render = (AST) => {
  const iter = (tree, level) => {
    const result = tree.map((key) => {
      switch (key.status) {
        case 'nested':
          return `${getIndent(level)}${key.name}: ${iter(key.children, level + 1)}`;
        case 'modified': {
          const oldValue = stringify(key.oldValue, level);
          const newValue = `${stringify(key.newValue, level)}`;
          return `${getIndent(level, '-')}${key.name}: ${oldValue}\n${getIndent(level, '+')}${key.name}: ${newValue}`;
        }
        case 'deleted': {
          const value = stringify(key.value, level);
          return `${getIndent(level, '-')}${key.name}: ${value}`;
        }
        case 'added': {
          const value = stringify(key.value, level);
          return `${getIndent(level, '+')}${key.name}: ${value}`;
        }
        case 'unchanged': {
          const value = stringify(key.value, level);
          return `${getIndent(level)}${key.name}: ${value}`;
        }
        default:
          throw new Error(`Unknown status of key '${key.status}'!`);
      }
    });

    return result.length > 0 ? `{\n${result.join('\n')}\n${getIndent(level - 1)}}` : '{}';
  };

  return iter(AST, 1);
};

export default render;
