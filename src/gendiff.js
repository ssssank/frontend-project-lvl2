import _ from 'lodash';

const buildAST = (obj1, obj2) => {
  const keys = _.union(Object.keys(obj1), Object.keys(obj2)).sort();
  const AST = {};

  keys.forEach((key) => {
    if (_.has(obj1, key)) {
      if (_.has(obj2, key)) {
        if (obj1[key] === obj2[key]) {
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

const renderDiff = (AST) => {
  const keys = Object.keys(AST);
  const res = [];
  keys.forEach((key) => {
    if (AST[key].status === 'not modified') {
      res.push(`   ${key}: ${AST[key].value}`);
    } else if (AST[key].status === 'modified') {
      res.push(` - ${key}: ${AST[key].value}`);
      res.push(` + ${key}: ${AST[key].valueNew}`);
    } else if (AST[key].status === 'deleted') {
      res.push(` - ${key}: ${AST[key].value}`);
    } else if (AST[key].status === 'added') {
      res.push(` + ${key}: ${AST[key].value}`);
    }
  });

  return res.length > 0 ? `{\n${res.join('\n')}\n}` : '{}';
};

const gendiff = (obj1, obj2) => {
  const AST = buildAST(obj1, obj2);
  return renderDiff(AST);
};

export default gendiff;
