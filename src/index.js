import _ from 'lodash';
import isObject from 'lodash.isobject';
import sortBy from 'lodash.sortby';
import parser from './parsers.js';
import stylish from './stylish.js';

const getObjectKeys = (obj) => {
  const result = Object.keys(obj).map((key) => {
    if (isObject(obj[key])) {
      return [key, getObjectKeys(obj[key])];
    } 
    return key;
  });
  return sortBy(result);
};

const getObjectEntries = (obj) => {
  const result = Object.entries(obj).map(([ key, value ]) => {
    if (isObject(value)) {
      return [key, getObjectEntries(value)];
    } 
    return [key, value];
  });
  return sortBy(result);
};

export default (filepath1, filepath2) => {
  const obj1 = parser(filepath1);
  const obj2 = parser(filepath2);

  const diffArr = [];

  const obj1Entries = JSON.stringify(getObjectEntries(obj1));
  const obj2Entries = JSON.stringify(getObjectEntries(obj2));
  const allEntries = [...obj1Entries, ...obj2Entries];

  console.log('ALL', allEntries);

  allEntries.map(([key, value]) => {
    if (obj1Entries.includes(key) && obj2Entries.includes(key)) {
      if (obj1Entries[key] === obj2Entries[key]) {
        diffArr.push({ key, value, type: 'balance' });
      } else {
        diffArr.push({ key, value: obj1[key], type: 'minus' });
        diffArr.push({ key, value: obj2[key], type: 'plus' });
      }
    }
    if (obj1Entries.includes(key) && !obj2Entries.includes(key)) {
      diffArr.push({ key, value: obj1[key], type: 'minus' });
    }
    if (!obj1Entries.includes(key) && obj2Entries.includes(key)) {
      diffArr.push({ key, value: obj2[key], type: 'plus' });
    }
    return diffArr;
  });

  console.log(diffArr);
  // return stylish(diffArr);
};

// export default (filepath1, filepath2) => {
//   const obj1 = parser(filepath1);
//   const obj2 = parser(filepath2);

//   const diffArr = [];

//   const keysCommon = _.sortedUniq(sortBy([...Object.keys(obj1), ...Object.keys(obj2)]));

//   keysCommon.map((key) => {
//     if (Object.hasOwn(obj1, key) && Object.hasOwn(obj2, key)) {
//       if (obj1[key] === obj2[key]) {
//         diffArr.push({ key, value: obj1[key], type: 'balance' });
//       } else {
//         diffArr.push({ key, value: obj1[key], type: 'minus' });
//         diffArr.push({ key, value: obj2[key], type: 'plus' });
//       }
//     }
//     if (Object.hasOwn(obj1, key) && !Object.hasOwn(obj2, key)) {
//       diffArr.push({ key, value: obj1[key], type: 'minus' });
//     }
//     if (!Object.hasOwn(obj1, key) && Object.hasOwn(obj2, key)) {
//       diffArr.push({ key, value: obj2[key], type: 'plus' });
//     }
//     return diffArr;
//   });

//   return stylish(diffArr);
// };