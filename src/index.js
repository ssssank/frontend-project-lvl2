import parse from './parse';
import buildAST from './buildAST';
import formatter from './formatters';

const gendiff = (fileBefore, fileAfter, format = 'text') => {
  const objBefore = parse(fileBefore);
  const objAfter = parse(fileAfter);
  const AST = buildAST(objBefore, objAfter);
  const render = formatter(format);
  return render(AST);
};

export default gendiff;
