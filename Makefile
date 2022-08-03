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

gen-yml:
	gendiff ../__fixtures__/file3.yml ../__fixtures__/file4.yml

gen-json:
	gendiff ../__fixtures__/file1.json ../__fixtures__/file2.json

gen-tree-json:
	gendiff ../__fixtures__/file5.json ../__fixtures__/file6.json