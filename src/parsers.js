import yaml from 'js-yaml';

export default (file, extension) => {
  switch (extension) {
    case '.json':
      return JSON.parse(file);
    case '.yml':
    case '.yaml':
      return yaml.load(file);
    default:
      return 'Unknown format!';
  }
};
