import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

export default (file, format) => {
  switch (format) {
    case 'stylish':
      return stylish(file);
    case 'plain':
      return plain(file);
    case 'json':
      return json(file);
    case 'json-str':
      return JSON.stringify(file);
    default:
      return json(file);
  }
};
