import _ from 'lodash';

const compareValues = (first, second) => {
  if (_.isObject(first) && _.isObject(second)) {
    return 'nested';
  }
  if (first === second) {
    return 'not modified';
  }
  if (!first) {
    return 'added';
  }
  if (!second) {
    return 'deleted';
  }
  if (first !== second) {
    return 'modified';
  }
  return 'uknown status';
};

const buildAST = (obj1, obj2) => {
  const keys = _.union(Object.keys(obj1), Object.keys(obj2)).sort();
  return keys.map((key) => {
    const status = compareValues(obj1[key], obj2[key]);
    switch (status) {
      case 'nested':
        return {
          name: key,
          status,
          children: buildAST(obj1[key], obj2[key]),
        };
      case 'modified':
        return {
          name: key,
          value: obj1[key],
          valueNew: obj2[key],
          status: 'modified',
        };
      case 'not modified':
        return {
          name: key,
          value: obj1[key],
          status,
        };
      case 'deleted':
        return {
          name: key,
          value: obj1[key],
          status: 'deleted',
        };
      case 'added':
        return {
          name: key,
          value: obj2[key],
          status: 'added',
        };
      default:
        throw new Error(`Unknown status of key '${key}'!`);
    }
  });
};

export default buildAST;
