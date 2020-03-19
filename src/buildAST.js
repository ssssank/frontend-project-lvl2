import _ from 'lodash';

const compareValues = (first, second) => {
  if (_.isObject(first) && _.isObject(second)) {
    return 'nested';
  }
  if (first === second) {
    return 'notModified';
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

const nodes = {
  nested: (obj1, obj2, key, fn) => ({ name: key, status: 'nested', children: fn(obj1[key], obj2[key]) }),
  modified: (obj1, obj2, key) => ({
    name: key, value: obj1[key], valueNew: obj2[key], status: 'modified',
  }),
  notModified: (obj1, obj2, key) => ({ name: key, value: obj1[key], status: 'not modified' }),
  deleted: (obj1, obj2, key) => ({ name: key, value: obj1[key], status: 'deleted' }),
  added: (obj1, obj2, key) => ({ name: key, value: obj2[key], status: 'added' }),
};

const getNode = (status) => nodes[status];

const buildAST = (obj1, obj2) => {
  const keys = _.union(Object.keys(obj1), Object.keys(obj2)).sort();
  return keys.map((key) => {
    const status = compareValues(obj1[key], obj2[key]);
    const node = getNode(status);
    return node(obj1, obj2, key, buildAST);
  });
};

export default buildAST;
