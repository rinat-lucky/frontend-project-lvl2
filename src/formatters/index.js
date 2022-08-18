import stylish from './stylish.js';
import plain from './plain.js';

export default (file, format) => {
  switch (format) {
    case 'stylish':
      return stylish(file);
    case 'plain':
      return plain(file);
    default:
      return plain(file);
  }
};
