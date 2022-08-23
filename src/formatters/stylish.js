import _ from 'lodash';

const stepIndent = 4;
const getIndent = (count) => ' '.repeat(count * stepIndent);

export default (tree) => {
  const iter = (depth, node) => {
    if (!_.isObject(node)) {
      return node;
    }
    const bracketEndIndent = getIndent(depth - 1);

    const lines = Object
      .entries(node)
      .map(([prop, diff]) => {
        const {
          key, value, secondValue, children,
        } = diff;
        const indent = getIndent(depth).slice(0, getIndent(depth) - 2);

        switch (diff.type) {
          case 'nested':
            return `${indent}  ${key}: ${iter(depth + 1, children)}`;
          case 'added':
            return `${indent}+ ${key}: ${iter(depth + 1, value)}`;
          case 'deleted':
            return `${indent}- ${key}: ${iter(depth + 1, value)}`;
          case 'unchanged':
            return `${indent}  ${key}: ${iter(depth + 1, value)}`;
          case 'changed':
            return `${indent}- ${key}: ${iter(depth + 1, value)}\n${indent}+ ${key}: ${iter(depth + 1, secondValue)}`;
          default:
            return `${indent}  ${prop}: ${iter(depth + 1, diff)}`;
        }
      });

    return [
      '{',
      ...lines,
      `${bracketEndIndent}}`,
    ].join('\n');
  };

  return iter(1, tree);
};
