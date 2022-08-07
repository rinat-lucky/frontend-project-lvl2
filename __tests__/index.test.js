import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import { readFileSync } from 'fs';
import path from 'path';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filepath) => readFileSync(getFixturePath(filepath), 'utf-8');
const actualPlainJson = genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'));
const actualPlainYaml = genDiff(getFixturePath('file3.yml'), getFixturePath('file4.yml'));
const expectedPlain = readFile('result_plain.txt').trim();

const actualNestedJson = genDiff(getFixturePath('file5.json'), getFixturePath('file6.json'));
const actualNestedYaml = genDiff(getFixturePath('file7.yml'), getFixturePath('file8.yml'));
const expectedNested = readFile('result_nested.txt').trim();

test('genDiff-plain-json', () => {
  expect(actualPlainJson).toBe(expectedPlain);
});

test('genDiff-plain-yaml', () => {
  expect(actualPlainYaml).toBe(expectedPlain);
});

test('genDiff-nested-json', () => {
  expect(actualNestedJson).toBe(expectedNested);
});

test('genDiff-nested-yaml', () => {
  expect(actualNestedYaml).toBe(expectedNested);
});
