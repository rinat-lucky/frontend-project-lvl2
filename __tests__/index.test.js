import { fileURLToPath } from 'url';
import { readFileSync } from 'fs';
import path from 'path';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filepath) => readFileSync(getFixturePath(filepath), 'utf-8');

const actualNestedJSON = genDiff(getFixturePath('file5.json'), getFixturePath('file6.json'), 'stylish');
const expectedNestedJSON = readFile('result_nested_json.txt').trim();

const actualNestedYML = genDiff(getFixturePath('file7.yml'), getFixturePath('file8.yml'));
const expectedNestedYML = readFile('result_nested_yml.txt').trim();

const actualNestedJSONText = genDiff(getFixturePath('file5.json'), getFixturePath('file6.json'), 'plain');
const expectedNestedJSONText = readFile('result_text_JSON.txt').trim();

const actualNestedYMLText = genDiff(getFixturePath('file7.yml'), getFixturePath('file8.yml'), 'plain');
const expectedNestedYMLText = readFile('result_text_YML.txt').trim();

test.each([
  [actualNestedJSON, expectedNestedJSON],
  [actualNestedYML, expectedNestedYML],
  [actualNestedJSONText, expectedNestedJSONText],
  [actualNestedYMLText, expectedNestedYMLText],
])('genDiff-tests(%#)', (actual, expected) => {
  expect(actual).toBe(expected);
});
