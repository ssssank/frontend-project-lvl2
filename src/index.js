import fs from 'fs';
import path from 'path';
import parse from './parse';
import buildAST from './buildAST';
import formatter from './formatters';

const gendiff = (filepathBefore, filepathAfter, format = 'text') => {
  const contentBefore = fs.readFileSync(filepathBefore, 'utf-8');
  const contentAfter = fs.readFileSync(filepathAfter, 'utf-8');

  const typeBefore = path.extname(filepathBefore).slice(1);
  const typeAfter = path.extname(filepathAfter).slice(1);

  const dataBefore = parse(contentBefore, typeBefore);
  const dataAfter = parse(contentAfter, typeAfter);

  const AST = buildAST(dataBefore, dataAfter);

  const render = formatter(format);

  return render(AST);
};

export default gendiff;
