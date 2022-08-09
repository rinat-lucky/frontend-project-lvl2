// import isObject from 'lodash.isobject';
import sortBy from 'lodash.sortby';

export default (data1, data2) => {
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);
  const keys = sortBy(_.union(keys1, keys2));

  const diff = {};
  for (const key of keys) {
    if (!Object.hasOwn(data1, key)) {
      diff[key] = 'added';
    } else if (!Object.hasOwn(data2, key)) {
      diff[key] = 'deleted';
    } else if (data1[key] !== data2[key]) {
      diff[key] = 'changed';
    } else {
      diff[key] = 'unchanged';
    }
  }

  const diffArr = [];

  // console.log('DIFF', diff);
  // return diff;

  return diffArr;
};

// Вы делаете массив отличий, в котором каждое отличие это обьект с определенным типом. 
// При вложенной структуре в вас получается еще один тип, у которого также свой набор полей, 
// который вы и можете рекурсивно обрабатывать.

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

// const getObjectEntries = (obj) => {
//   const result = Object.entries(obj).map(([ key, value ]) => {
//     if (isObject(value)) {
//       return [key, getObjectEntries(value)];
//     } 
//     return [key, value];
//   });
//   return sortBy(result);
// };
