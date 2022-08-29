import _ from 'lodash';

const getFormattedValue = (value) => {
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  if (_.isObject(value)) {
    return '[complex value]';
  }
  return value;
};

const plain = (tree) => {
  const iter = (node, path) => {
    const lines = node
      .map((diff) => {
        const {
          key, value1, value2, children,
        } = diff;
        const newPath = (path !== '' ? `${path}.${key}` : `${key}`);

        switch (diff.type) {
          case 'nested':
            return iter(children, newPath);
          case 'added':
            return `Property '${newPath}' was added with value: ${getFormattedValue(value2)}`;
          case 'deleted':
            return `Property '${newPath}' was removed`;
          case 'changed':
            return `Property '${newPath}' was updated. From ${getFormattedValue(value1)} to ${getFormattedValue(value2)}`;
          case 'unchanged':
            return null;
          default:
            throw new Error(`Unknown type of diff: ${diff.type}`);
        }
      });

    return [...lines]
      .filter(Boolean)
      .join('\n');
  };

  return iter(tree, '');
};

export default plain;
