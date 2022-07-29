import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import { readFileSync } from 'fs';
import path from 'path';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filepath) => readFileSync(getFixturePath(filepath), 'utf-8');
const actual1 = genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'));
const actual2 = genDiff(getFixturePath('file3.yml'), getFixturePath('file4.yml'));
const expected = readFile('result.txt').trim();

test('genDiff-json', () => {
  expect(actual1).toBe(expected);
});

test('genDiff-yaml', () => {
  expect(actual2).toBe(expected);
});
