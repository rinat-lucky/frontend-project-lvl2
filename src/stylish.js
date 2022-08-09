import isObject from 'lodash.isobject';

const getReplacer = (value) => {
  switch (value) {
    case 'deleted':
      return '  - ';
    case 'added':
      return '  + ';
    default:
      return '    ';
  }
};

export default (tree, spaceCount = 1) => {
  const iter = (depth, node) => {
    if (!isObject(node)) {
      return `${node}`;
    }
    const spaceEnd = getReplacer().repeat(spaceCount * (depth - 1));

    const lines = Object
      .values(node)
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

  return iter(1, tree);
};
