import _ from 'lodash';

const gendiff = (obj1, obj2) => {
  const keys = _.union(Object.keys(obj1), Object.keys(obj2)).sort();
  const res = [];

  keys.forEach((key) => {
    if (_.has(obj1, key)) {
      if (_.has(obj2, key)) {
        if (obj1[key] === obj2[key]) {
          res.push(`  ${key}: ${obj1[key]}`);
        } else {
          res.push(`- ${key}: ${obj1[key]}`);
          res.push(`+ ${key}: ${obj2[key]}`);
        }
      } else {
        res.push(`- ${key}: ${obj1[key]}`);
      }
    } else {
      res.push(`+ ${key}: ${obj2[key]}`);
    }
  });

  return `{ ${res.join(' ')} }`;
};

export default gendiff;