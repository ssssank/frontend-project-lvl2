import _ from 'lodash';
import formatter from './formatters';

const buildAST = (obj1, obj2) => {
  const keys = _.union(Object.keys(obj1), Object.keys(obj2)).sort();
  const AST = {};

  keys.forEach((key) => {
    if (_.has(obj1, key)) {
      if (_.has(obj2, key)) {
        if (_.isObject(obj1[key]) && _.isObject(obj2[key])) {
          AST[key] = {
            children: buildAST(obj1[key], obj2[key]),
          };
        } else if (obj1[key] === obj2[key]) {
          AST[key] = {
            value: obj1[key],
            status: 'not modified',
          };
        } else {
          AST[key] = {
            value: obj1[key],
            valueNew: obj2[key],
            status: 'modified',
          };
        }
      } else {
        AST[key] = {
          value: obj1[key],
          status: 'deleted',
        };
      }
    } else {
      AST[key] = {
        value: obj2[key],
        status: 'added',
      };
    }
  });

  return AST;
};

const gendiff = (obj1, obj2, format) => {
  const AST = buildAST(obj1, obj2);
  const render = formatter(format);
  return render(AST);
};

export default gendiff;
