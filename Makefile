install: 
	npm ci

gendiff:
	node bin/gendiff.js

publish:
	npm publish --dry-run

lint:
	npx --format json eslint .

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

plain:
	gendiff ../__fixtures__/file5.json ../__fixtures__/file6.json -f plain

stylish:
	gendiff ../__fixtures__/file5.json ../__fixtures__/file6.json -f stylish

json:
	gendiff ../__fixtures__/file5.json ../__fixtures__/file6.json -f json

json-str:
	gendiff ../__fixtures__/file5.json ../__fixtures__/file6.json -f json-str