import _ from 'lodash';

const stepIndent = 4;

const getReplacer = (count, value) => {
  const space = ' ';
  const currentIndent = space.repeat(count * stepIndent);
  const currentIndentArr = currentIndent.split('');

  const insertSymbol = (symbol) => (currentIndentArr
    .slice(0, currentIndentArr.length - 2)
    .concat([symbol, ' '])
    .join(''));

  switch (value) {
    case 'deleted':
    case 'changed':
      return insertSymbol('-');
    case 'added':
      return insertSymbol('+');
    default:
      return currentIndentArr.join('');
  }
};

export default (tree, spaceCount = 1) => {
  const iter = (depth, node) => {
    if (!_.isObject(node)) {
      return `${node}`;
    }
    const bracketEnd = getReplacer(spaceCount * (depth - 1));

    const lines = Object
      .entries(node)
      .map(([prop, diff]) => {
        const {
          key, value, newValue, type, children,
        } = diff;
        const indent = getReplacer(spaceCount * depth, type);

        switch (type) {
          case 'nested':
            return `${indent}${key}: ${iter(depth + 1, children)}`;
          case 'added':
          case 'deleted':
          case 'unchanged':
            return `${indent}${key}: ${iter(depth + 1, value)}`;
          case 'changed':
            return `${indent}${key}: ${iter(depth + 1, value)}\n${getReplacer(spaceCount * depth, 'added')}${key}: ${iter(depth + 1, newValue)}`;
          default:
            return `${indent}${prop}: ${iter(depth + 1, diff)}`;
        }
      });

    return [
      '{',
      ...lines,
      `${bracketEnd}}`,
    ].join('\n');
  };

  return iter(1, tree);
};
