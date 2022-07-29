import { readFileSync } from 'fs';
import { cwd } from 'process';
import path from 'path';
import sortBy from 'lodash.sortby';
import uniq from 'uniq';

// import { fileURLToPath } from 'url';
// import { dirname } from 'path';
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);
// const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const isJSON = (filepath) => {
  const filepathArr = filepath.split('.');
  return filepathArr[filepathArr.length - 1].toLowerCase() === 'json';
};

const readAndParse = (filepath) => JSON.parse(readFileSync(path.resolve(`${cwd}`, `${filepath}`), 'utf-8').trim());

const genDiff = (filepath1, filepath2) => {
  const obj1 = isJSON(filepath1) ? readAndParse(filepath1) : 'another type';
  const obj2 = isJSON(filepath2) ? readAndParse(filepath2) : 'another type';

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
