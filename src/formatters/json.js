import isObject from 'lodash.isobject';

const getFormattedString = (data) => (typeof data === 'string' ? `"${data}"` : data);

// const getGet = (node) => {
//   if (!isObject(node)) {
//     return `${node}`;
//   }

//   const lines = Object
//     .entries(node)
//     .map(([prop, diff]) => {
//       const {
//         key, value, newValue, type, children,
//       } = diff;

//       switch (type) {
//         case 'nested':
//           return `${getFormattedString(key)}: ${getJSON(children)}`;
//         case 'added':
//         case 'deleted':
//         case 'unchanged':
//           return `${getFormattedString(key)}: ${getJSON(getFormattedString(value))}`;
//         case 'changed':
//           return `${getFormattedString(key)}: ${getJSON(getFormattedString(value))}\n${getFormattedString(key)}: ${getJSON(getFormattedString(newValue))}`;
//         default:
//           return `${getFormattedString(prop)}: ${getJSON(getFormattedString(diff))}`;
//       }
//     });

//   return [...lines].join('\n');
// };


const getJSON = (node) => {
  if (!isObject(node)) {
    return `${node}`;
  }

  const diffs = Object
    .entries(node)
    .map(([prop, diff]) => {
      const { children } = diff;

      if (isObject(diff)) {
        return getJSON(children);
      }

      const key = getFormattedString(diff.key);
      const value = getFormattedString(diff.value);
      const newValue = getFormattedString(diff.newValue);
      const type = getFormattedString(diff.type);

      return diff;
    });

  return [...diffs].join('\n');
};

export default getJSON;
