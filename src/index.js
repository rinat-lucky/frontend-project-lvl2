import sortBy from 'lodash.sortby';
import uniq from 'uniq';
import parser from './parsers.js';

// import stylish from './stylish.js';

// export default (filepath1, filepath2) => {
//   const obj1 = parser(filepath1);
//   const obj2 = parser(filepath2);

//   const keysCommon = uniq(sortBy([...Object.keys(obj1), ...Object.keys(obj2)]));

//   const resultArr = [];

//   keysCommon.map((key) => {
//     const { diffValueBalance, diffValueMinus, diffValuePlus } = key;
//     if (Object.hasOwn(obj1, key) && Object.hasOwn(obj2, key)) {
//       if (obj1[key] === obj2[key]) {
//         resultArr[diffValueBalance] = obj1[key];
//       } else {
//         resultArr[diffValueMinus] = obj1[key];
//         resultArr[diffValuePlus] = obj2[key];
//       }
//     }
//     if (Object.hasOwn(obj1, key) && !Object.hasOwn(obj2, key)) {
//       resultArr[diffValueMinus] = obj1[key];
//     }
//     if (!Object.hasOwn(obj1, key) && Object.hasOwn(obj2, key)) {
//       resultArr[diffValuePlus] = obj2[key];
//     }
//   });
//   console.log(resultArr);
// };

export default (filepath1, filepath2) => {
  const obj1 = parser(filepath1);
  const obj2 = parser(filepath2);

  const keysCommon = uniq(sortBy([...Object.keys(obj1), ...Object.keys(obj2)]));

  const resultArr = [];
  keysCommon.forEach((key) => {
    if (Object.hasOwn(obj1, key) && Object.hasOwn(obj2, key)) {
      if (obj1[key] === obj2[key]) {
        resultArr.push(`    ${key}: ${obj1[key]}`);
      } else {
        resultArr.push(`  - ${key}: ${obj1[key]}`);
        resultArr.push(`  + ${key}: ${obj2[key]}`);
      }
    }
    if (Object.hasOwn(obj1, key) && !Object.hasOwn(obj2, key)) {
      resultArr.push(`  - ${key}: ${obj1[key]}`);
    }
    if (!Object.hasOwn(obj1, key) && Object.hasOwn(obj2, key)) {
      resultArr.push(`  + ${key}: ${obj2[key]}`);
    }
  });

  return `{\n${resultArr.join('\n')}\n}`;
};
