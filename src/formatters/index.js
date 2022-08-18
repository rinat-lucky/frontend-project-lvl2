import stylish from './stylish.js';
import plain from './plain.js';

export default (file, format) => {
  switch (format) {
    case 'stylish':
      return stylish(file);
    case 'plain':
      return plain(file);
    case 'json':
      return JSON.stringify(file);
    default:
      throw new Error(`Unknown format: ${format}`);
  }
};
