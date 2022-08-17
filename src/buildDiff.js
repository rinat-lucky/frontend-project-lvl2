import union from 'lodash.union';
import isObject from 'lodash.isobject';
import sortBy from 'lodash.sortby';

const buildDiff = (data1, data2) => {
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);
  const keys = sortBy(union(keys1, keys2));

  const diff = keys.flatMap((key) => {
    if (isObject(data1[key]) && isObject(data2[key])) {
      return { key, children: buildDiff(data1[key], data2[key]), type: 'nested' };
    }
    if (!Object.hasOwn(data1, key)) {
      return { key, value: data2[key], type: 'added' };
    }
    if (!Object.hasOwn(data2, key)) {
      return { key, value: data1[key], type: 'deleted' };
    }
    if (data1[key] !== data2[key]) {
      return {
        key, value: data1[key], newValue: data2[key], type: 'changed',
      };
    }
    return { key, value: data1[key], type: 'unchanged' };
  });

  return diff;
};

export default buildDiff;
