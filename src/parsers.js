import yaml from 'js-yaml';

export default (data) => {
  const { content, extension } = data;

  switch (extension) {
    case 'json':
      return JSON.parse(content);
    case 'yml':
    case 'yaml':
      return yaml.load(content);
    default:
      throw new Error(`Unknown type of extension: ${extension}`);
  }
};
