import fs from 'fs';
import path from 'path';
import parse from './parse';
import buildAST from './buildAST';
import getFormatter from './formatters';

const gendiff = (filepathBefore, filepathAfter, format = 'pretty') => {
  const contentBefore = fs.readFileSync(filepathBefore, 'utf-8');
  const contentAfter = fs.readFileSync(filepathAfter, 'utf-8');

  const typeBefore = path.extname(filepathBefore).slice(1);
  const typeAfter = path.extname(filepathAfter).slice(1);

  const dataBefore = parse(contentBefore, typeBefore);
  const dataAfter = parse(contentAfter, typeAfter);

  const ast = buildAST(dataBefore, dataAfter);

  const render = getFormatter(format);

  return render(ast);
};

export default gendiff;
