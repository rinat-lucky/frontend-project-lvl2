import { readFileSync } from 'fs';
import { cwd } from 'process';
import path from 'path';
import yaml from 'js-yaml';

const readFile = (filepath) => readFileSync(path.resolve(`${cwd}`, filepath), 'utf-8');

export default (filepath) => {
  const format = path.extname(filepath);
  switch (format) {
    case '.json':
      return JSON.parse(readFile(filepath));
    case '.yml':
    case '.yaml':
      return yaml.load(readFile(filepath));
    default:
      return 'Unknown format!';
  }
};
