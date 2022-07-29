import { readFileSync } from 'fs';
import { cwd } from 'process';
import path from 'path';
import sortBy from 'lodash.sortby';
import uniq from 'uniq';

const isJSON = (filepath) => {
  const filepathArr = filepath.split('.');
  return filepathArr[filepathArr.length - 1].toLowerCase() === 'json';
};
const getFixturePath = (filepath) => path.resolve(`${cwd}`, filepath);
const readFile = (filepath) => readFileSync(getFixturePath(filepath), 'utf-8');
const parseJSON = (filepath) => JSON.parse(readFile(filepath));

const genDiff = (filepath1, filepath2) => {
  const obj1 = isJSON(filepath1) ? parseJSON(filepath1) : 'another type';
  const obj2 = isJSON(filepath2) ? parseJSON(filepath2) : 'another type';

  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  const keysCommon = uniq(sortBy([...keys1, ...keys2]));

  const resultArr = [];
  keysCommon.forEach((key) => {
    if (keys1.includes(key) && keys2.includes(key)) {
      if (obj1[key] === obj2[key]) {
        resultArr.push(`    ${key}: ${obj1[key]}`);
      } else {
        resultArr.push(`  - ${key}: ${obj1[key]}`);
        resultArr.push(`  + ${key}: ${obj2[key]}`);
      }
    }
    if (keys1.includes(key) && !keys2.includes(key)) {
      resultArr.push(`  - ${key}: ${obj1[key]}`);
    }
    if (!keys1.includes(key) && keys2.includes(key)) {
      resultArr.push(`  + ${key}: ${obj2[key]}`);
    }
  });

  return `{\n${resultArr.join('\n')}\n}`;
};

export default genDiff;
