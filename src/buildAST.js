import _ from 'lodash';

const buildAST = (first, second) => {
  const keys = _.union(Object.keys(first), Object.keys(second)).sort();
  return keys.map((key) => {
    if (_.isObject(first[key]) && _.isObject(second[key])) {
      return {
        name: key,
        status: 'nested',
        children: buildAST(first[key], second[key]),
      };
    }
    if (first[key] === second[key]) {
      return {
        name: key,
        value: first[key],
        status: 'unchanged',
      };
    }
    if (!_.has(first, key)) {
      return {
        name: key,
        value: second[key],
        status: 'added',
      };
    }
    if (!_.has(second, key)) {
      return {
        name: key,
        value: first[key],
        status: 'deleted',
      };
    }
    if (first[key] !== second[key]) {
      return {
        name: key,
        value: first[key],
        modifiedValue: second[key],
        status: 'modified',
      };
    }
    return {
      status: 'unknown',
    };
  });
};

export default buildAST;
