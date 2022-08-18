import { readFileSync } from 'fs';
import { cwd } from 'process';
import path from 'path';
import buildDiff from './buildDiff.js';
import parse from './parsers.js';
import getDiff from './formatters/index.js';

const readFile = (filepath) => readFileSync(path.resolve(`${cwd}`, filepath), 'utf-8');
const getExt = (filepath) => path.extname(filepath);

export default (filepath1, filepath2, format = 'plain') => {
  const obj1 = parse(readFile(filepath1), getExt(filepath1));
  const obj2 = parse(readFile(filepath2), getExt(filepath2));
  return getDiff(buildDiff(obj1, obj2), format);
};
