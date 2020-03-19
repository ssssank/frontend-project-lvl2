import _ from 'lodash';

const compareValues = (first, second, key) => {
  if (_.isObject(first[key]) && _.isObject(second[key])) {
    return (obj1, obj2, key1, fn) => ({ name: key1, status: 'nested', children: fn(obj1[key1], obj2[key1]) });
  }
  if (first[key] === second[key]) {
    return (obj1, obj2, key1) => ({ name: key1, value: obj1[key1], status: 'unchanged' });
  }
  if (!_.has(first, key)) {
    return (obj1, obj2, key1) => ({ name: key1, value: obj2[key1], status: 'added' });
  }
  if (!_.has(second, key)) {
    return (obj1, obj2, key1) => ({ name: key1, value: obj1[key1], status: 'deleted' });
  }
  if (first[key] !== second[key]) {
    return (obj1, obj2, key1) => ({
      name: key1, value: obj1[key1], modifiedValue: obj2[key1], status: 'modified',
    });
  }
  return 'uknown status';
};

const buildAST = (obj1, obj2) => {
  const keys = _.union(Object.keys(obj1), Object.keys(obj2)).sort();
  return keys.map((key) => {
    const node = compareValues(obj1, obj2, key);
    return node(obj1, obj2, key, buildAST);
  });
};

export default buildAST;
