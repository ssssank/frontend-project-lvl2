import _ from 'lodash';

const buildAST = (obj1, obj2) => {
  const keys = _.union(Object.keys(obj1), Object.keys(obj2)).sort();
  const AST = keys.map((key) => {
    if (_.has(obj1, key)) {
      if (_.has(obj2, key)) {
        if (_.isObject(obj1[key]) && _.isObject(obj2[key])) {
          return {
            name: key,
            status: 'nested',
            children: buildAST(obj1[key], obj2[key]),
          };
        }
        if (obj1[key] === obj2[key]) {
          return {
            name: key,
            value: obj1[key],
            status: 'not modified',
          };
        }
        return {
          name: key,
          value: obj1[key],
          valueNew: obj2[key],
          status: 'modified',
        };
      }
      return {
        name: key,
        value: obj1[key],
        status: 'deleted',
      };
    }
    return {
      name: key,
      value: obj2[key],
      status: 'added',
    };
  });

  return AST;
};

export default buildAST;
