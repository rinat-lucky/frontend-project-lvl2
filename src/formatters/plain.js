import isObject from 'lodash.isobject';

const getChainKeys = (node) => {
  if (!isObject(node)) {
    return node;
  }
  if (Object.hasOwn(node, 'value')) {
    return node.key;
  }
  const chain = node.children.map((child) => `${node.key}.${getChainKeys(child)}`);
  return chain;
};

const plain = (node) => {
  if (!isObject(node)) {
    return node;
  }

  const lines = Object
    .entries(node)
    .map(([, diff]) => {
      const {
        value, newValue, type, children,
      } = diff;

      // console.log('NODE', node);
      console.log('DIFF', diff);
      // console.log('KEY', key);

      const currentValue = isObject(value) ? '[complex value]' : value;

      if (type === 'changed') {
        return `Property '${getChainKeys(diff)}' was updated. From ${currentValue} to ${newValue}`;
      }
      if (type === 'deleted') {
        return `Property '${getChainKeys(diff)}' was removed`;
      }
      if (type === 'added') {
        return `Property '${getChainKeys(diff)}' was added with value: ${currentValue}`;
      }
      if (type === 'nested') {
        return plain(children);
      }
      return '';
    });

  return [
    ...lines,
  ].join('\n');
};

export default plain;
