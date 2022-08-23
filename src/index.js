import { readFileSync } from 'fs';
import path from 'path';
import parse from './parsers.js';
import buildDiff from './buildDiff.js';
import getDiff from './formatters/index.js';

const getData = (filepath) => {
  const fixturePath = path.resolve(`${process.cwd}`, filepath);
  const content = readFileSync(fixturePath, 'utf-8');
  const extension = path.extname(filepath).slice(1);
  return { content, extension };
};

export default (filepath1, filepath2, format = 'stylish') => {
  const data1 = parse(getData(filepath1));
  const data2 = parse(getData(filepath2));
  return getDiff(buildDiff(data1, data2), format);
};
