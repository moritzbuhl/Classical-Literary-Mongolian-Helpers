#!/usr/bin/env node
const fs = require('fs');

const glossary = fs.readFileSync('./glossary.txt', 'utf8');

const extendedGlossary = [];

function extend(line) {
	const extension = [];
	const matches = [];
	const match = /^\S+/.exec(line)[0];
	if (match.endsWith(',')) {
		line.split(' ').some(potVoc => {
			matches.push(potVoc.replace(/,/g, ''));
			if (!potVoc.endsWith(',')) return true;
		});
	} else matches.push(match);
	matches.forEach(rawVoc => {
		const voc = rawVoc.replace(/\-/g, '');
		let i = voc.indexOf("\\");
		if (i == -1) i = voc.indexOf('|');
		if (i >= 0) {
			extension.push(voc.slice(0, i));
		}
		if (voc.includes('(')) { // XXX doesn't work on a(a)b(b)
			extension.push(voc.replace(/\([^\)]+\)/g, ''));
		}
		extension.push(voc.replace(/\\/g, '').replace(/\|/g,
			'').replace(/\(/g, '').replace(/\)/g, ''));
	});
	return extension.reduce((acc, cur) => {
		acc.push(`${cur} ---> ${line}`);
		return acc;
	}, []);
}

glossary.split('\n').forEach(line => {
	if (!line) return;
	extend(line).forEach(l => { extendedGlossary.push(l) });
});

console.log(JSON.stringify(extendedGlossary));
