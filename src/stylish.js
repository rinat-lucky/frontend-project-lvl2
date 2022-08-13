import isObject from 'lodash.isobject';

const stepIndent = 4;

const getReplacer = (count, value = '') => {
  const space = ' ';
  const currentIndent = space.repeat(count * stepIndent);
  const currentIndentArr = currentIndent.split('');

  const func = (symbol) => {
    currentIndentArr.splice(currentIndentArr.length - 2, 1, symbol);
    return currentIndentArr.join('');
  };

  switch (value) {
    case 'deleted':
      return func('-');
    case 'added':
      return func('+');
    default:
      return currentIndentArr.join('');
  }
};

export default (tree, spaceCount = 1) => {
  const iter = (depth, node) => {
    if (!isObject(node)) {
      return `${node}`;
    }
    const bracketEnd = getReplacer(spaceCount * (depth - 1));

    const lines = Object
      .entries(node)
      .map(([nestedKey, diff]) => {
        const {
          key, value, type, children,
        } = diff;
        const indent = getReplacer(spaceCount * depth, type);
        if (children) {
          return `${indent}${key}: ${iter(depth + 1, children)}`;
        }
        if (type) {
          return `${indent}${key}: ${iter(depth + 1, value)}`;
        }
        return `${indent}${nestedKey}: ${iter(depth + 1, (diff))}`;
      });

    return [
      '{',
      ...lines,
      `${bracketEnd}}`,
    ].join('\n');
  };

  return iter(1, tree);
};
