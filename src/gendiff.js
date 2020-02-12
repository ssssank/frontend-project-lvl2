import _ from 'lodash';

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

const stringify = (X) => {
  if (_.isObject(X)) {
    const a = Object.keys(X);
    const b = Object.values(X);
    return `${a}: ${b}`;
  }
  return X;
};

const renderDiff = (AST) => {
  const iter = (AST, level) => {
    const keys = Object.keys(AST);
    const res = [];
    keys.forEach((key) => {
      if (_.has(AST[key], 'children')) {
        res.push(`${' '.repeat(level * 4)}${key}: ${iter(AST[key].children, level + 1)}`);
      }
      let test = AST[key].value;
      let test2 = AST[key].valueNew;
      if (_.isObject(AST[key].value)) {
        test = `{\n${' '.repeat((level + 1) * 4)}${stringify(AST[key].value)}\n${' '.repeat(level * 4)}}`;
      } else if (_.isObject(AST[key].valueNew)) {
        test2 = `{\n${' '.repeat((level + 1) * 4)}${stringify(AST[key].valueNew)}\n${' '.repeat(level * 4)}}`;
      }
      if (AST[key].status === 'modified') {
        res.push(`${' '.repeat(level * 4 - 2)}- ${key}: ${test}`);
        res.push(`${' '.repeat(level * 4 - 2)}+ ${key}: ${test2}`);
      } else if (AST[key].status === 'not modified') {
        res.push(`${' '.repeat(level * 4)}${key}: ${test}`);
      } else if (AST[key].status === 'deleted') {
        res.push(`${' '.repeat(level * 4 - 2)}- ${key}: ${test}`);
      } else if (AST[key].status === 'added') {
        res.push(`${' '.repeat(level * 4 - 2)}+ ${key}: ${test}`);
      }
    });

    return res.length > 0 ? `{\n${res.join('\n')}\n${' '.repeat((level - 1) * 4)}}` : '{}';
  };

  return iter(AST, 1);
};

const gendiff = (obj1, obj2) => {
  const AST = buildAST(obj1, obj2);
  return renderDiff(AST);
};

export default gendiff;
