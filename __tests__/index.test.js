import { fileURLToPath } from 'url';
import { readFileSync } from 'fs';
import path from 'path';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filepath) => readFileSync(getFixturePath(filepath), 'utf-8');

test.each([
  [genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'stylish'), readFile('result_nested_json.txt').trim()],
  [genDiff(getFixturePath('file1.yml'), getFixturePath('file2.yml')), readFile('result_nested_yml.txt').trim()],
  [genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'plain'), readFile('result_text_JSON.txt').trim()],
  [genDiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'), 'plain'), readFile('result_text_YML.txt').trim()],
])('genDiff-tests(%#)', (actual, expected) => {
  expect(actual).toBe(expected);
});
