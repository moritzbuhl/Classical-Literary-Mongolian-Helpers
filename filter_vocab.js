#!/usr/bin/env node
const fs = require('fs');

const text = fs.readFileSync(process.argv[2], 'utf8');

const filteredVocab = text.split('\n').reduce((acc, cur) => {
	switch (cur) {
	case ',':
	case  '.':
	case  "'":
	case  '"':
	case  '(':
	case  ')':
	case '[':
	case ']':
	case '?':
	case '!':
	case '':
		break;
	default:
		acc.push(cur);
	}
	return acc;
}, []);

console.log(JSON.stringify(filteredVocab));
