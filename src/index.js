import buildAST from './buildAST';
import formatter from './formatters';

const gendiff = (obj1, obj2, format = 'text') => {
  const AST = buildAST(obj1, obj2);
  const render = formatter(format);
  return render(AST);
};

export default gendiff;
