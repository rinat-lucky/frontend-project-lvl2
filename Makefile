install: 
	npm ci

gendiff:
	node bin/gendiff.js

publish:
	npm publish --dry-run

lint:
	npx eslint .

test:
	npm test

test-coverage:
	npm test -- --coverage --coverageProvider=v8

rec:
	asciinema rec

yml:
	gendiff ../__fixtures__/file7.yml ../__fixtures__/file8.yml

t:
	gendiff ../__fixtures__/file1.json ../__fixtures__/file2.json -f stylish

pl:
	gendiff ../__fixtures__/file5.json ../__fixtures__/file6.json -f plain

st:
	gendiff ../__fixtures__/file5.json ../__fixtures__/file6.json -f stylish