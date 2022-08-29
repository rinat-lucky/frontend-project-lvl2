import _ from 'lodash';

const stepIndent = 4;
const getIndent = (count) => ' '.repeat(count * stepIndent);

export default (tree) => {
  const iter = (depth, node) => {
    const indent = getIndent(depth).slice(0, getIndent(depth) - 2);
    const bracketEndIndent = getIndent(depth - 1);

    const lines = Object
      .entries(node)
      .map(([property, diff]) => {
        const {
          key, value1, value2, children,
        } = diff;

        const getValue = (data) => {
          if (!_.isObject(data)) {
            return data;
          }
          return iter(depth + 1, data);
        };

        switch (diff.type) {
          case 'nested':
            return `${indent}  ${key}: ${getValue(children)}`;
          case 'added':
            return `${indent}+ ${key}: ${getValue(value2)}`;
          case 'deleted':
            return `${indent}- ${key}: ${getValue(value1)}`;
          case 'unchanged':
            return `${indent}  ${key}: ${getValue(value1)}`;
          case 'changed':
            return `${indent}- ${key}: ${getValue(value1)}\n${indent}+ ${key}: ${getValue(value2)}`;
          default:
            return `${indent}  ${property}: ${getValue(diff)}`;
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
