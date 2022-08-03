
import isObject from 'lodash.isobject';

export default (value, replacer = ' ', spaceCount = 1) => {
  const iter = (depth, currentValue) => {
    if (!isObject(currentValue)) {
      return `${currentValue}`;
    }

    const space = replacer.repeat(spaceCount * depth);
    const spaceEnd = replacer.repeat(spaceCount * (depth - 1));

    const lines = Object
      .entries(currentValue)
      .map(([key, val]) => `${space}${key}: ${iter(depth + 1, val)}`);

    return [
      '{',
      ...lines,
      `${spaceEnd}}`,
    ].join('\n');
  };

  return iter(1, value);
};
