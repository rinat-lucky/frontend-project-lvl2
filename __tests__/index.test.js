import { test, expect } from '@jest/globals';
import genDiff from '../src/index.js';

test('genDiff-1', () => {
  expect(genDiff('../__fixtures__/file1.json', '../__fixtures__/file2.json'))
    .toBe(
      `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`,
    );
});

test('genDiff-2', () => {
  expect(genDiff('../__fixtures__/file1.json', '../__fixtures__/file2.json'))
    .toBe(
      `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`,
    );
});
