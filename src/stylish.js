import isObject from 'lodash.isobject';

const getReplacer = (value) => {
  switch (value) {
    case 'minus':
      return '  - ';
    case 'plus':
      return '  + ';
    default:
      return '    ';
  }
};

export default (value, spaceCount = 1) => {
  const iter = (depth, currentValue) => {
    if (!isObject(currentValue)) {
      return `${currentValue}`;
    }
    const spaceEnd = getReplacer().repeat(spaceCount * (depth - 1));

    const lines = Object
      .values(currentValue)
      .map((val) => {
        if (val === null) {
          return val;
        }
        const space = getReplacer(val.type).repeat(spaceCount * depth);
        return `${space}${val.key}: ${iter(depth + 1, val.value)}`;
      });

    return [
      '{',
      ...lines,
      `${spaceEnd}}`,
    ].join('\n');
  };

  return iter(1, value);
};
