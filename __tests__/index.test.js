import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import { readFileSync } from 'fs';
import path from 'path';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filepath) => readFileSync(getFixturePath(filepath), 'utf-8');
const actualPlainJson = genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'stylish');
const actualPlainYaml = genDiff(getFixturePath('file3.yml'), getFixturePath('file4.yml'), 'stylish');
const expectedPlain = readFile('result_plain.txt').trim();

const actualNestedJSON = genDiff(getFixturePath('file5.json'), getFixturePath('file6.json'), 'stylish');
const expectedNestedJSON = readFile('result_nested_json.txt').trim();

const actualNestedYML = genDiff(getFixturePath('file7.yml'), getFixturePath('file8.yml'), 'stylish');
const expectedNestedYML = readFile('result_nested_yml.txt').trim();

const actualNestedJSONTExt = genDiff(getFixturePath('file5.json'), getFixturePath('file6.json'), 'plain');
const actualNestedYMLText = genDiff(getFixturePath('file7.yml'), getFixturePath('file8.yml'), 'plain');
const expectedNestedText = readFile('result_text.txt').trim();

test('genDiff-plain-json-stylish', () => {
  expect(actualPlainJson).toBe(expectedPlain);
});

test('genDiff-plain-yaml-stylish', () => {
  expect(actualPlainYaml).toBe(expectedPlain);
});

test('genDiff-nested-json-stylish', () => {
  expect(actualNestedJSON).toBe(expectedNestedJSON);
});

test('genDiff-nested-yaml-stylish', () => {
  expect(actualNestedYML).toBe(expectedNestedYML);
});

test('genDiff-nested-json-plain', () => {
  expect(actualNestedJSONTExt).toBe(expectedNestedText);
});

test('genDiff-nested-yaml-plain', () => {
  expect(actualNestedYMLText).toBe(expectedNestedText);
});
