import isObject from 'lodash.isobject';

const getFormattedValue = (value) => {
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  if (isObject(value)) {
    return '[complex value]';
  }
  return value;
};

const plain = (tree) => {
  const iter = (node, path) => {
    if (!isObject(node)) {
      return node;
    }

    const lines = Object
      .values(node)
      .map((diff) => {
        const {
          key, value, newValue, type, children,
        } = diff;

        const newPath = (path !== '' ? `${path}.${key}` : `${key}`);

        switch (type) {
          case 'nested':
            return iter(children, newPath);
          case 'added':
            return `Property '${newPath}' was added with value: ${getFormattedValue(value)}`;
          case 'deleted':
            return `Property '${newPath}' was removed`;
          case 'changed':
            return `Property '${newPath}' was updated. From ${getFormattedValue(value)} to ${getFormattedValue(newValue)}`;
          case 'unchanged':
            return '';
          default:
            throw new Error(`Unknown type of diff: ${type}`);
        }
      });

    return [...lines]
      .filter(Boolean)
      .join('\n');
  };

  return iter(tree, '');
};

export default plain;
