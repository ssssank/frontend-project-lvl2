import _ from 'lodash';

const buildAST = (obj1, obj2) => {
  const keys = _.union(Object.keys(obj1), Object.keys(obj2)).sort();
  const AST = keys.reduce((acc, key) => {
    if (_.has(obj1, key)) {
      if (_.has(obj2, key)) {
        if (_.isObject(obj1[key]) && _.isObject(obj2[key])) {
          acc[key] = {
            children: buildAST(obj1[key], obj2[key]),
          };
        } else if (obj1[key] === obj2[key]) {
          acc[key] = {
            value: obj1[key],
            status: 'not modified',
          };
        } else {
          acc[key] = {
            value: obj1[key],
            valueNew: obj2[key],
            status: 'modified',
          };
        }
      } else {
        acc[key] = {
          value: obj1[key],
          status: 'deleted',
        };
      }
    } else {
      acc[key] = {
        value: obj2[key],
        status: 'added',
      };
    }
    return acc;
  }, {});

  return AST;
};

export default buildAST;
