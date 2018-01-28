#!/usr/bin/env node
const fs = require('fs');

const text = fs.readFileSync(process.argv[2], 'utf8');

text.replace(new RegExp(/\|/, 'g'), '').replace(new RegExp(/\\/, 'g'),
	'').replace( new RegExp(/\d+/, 'g'), '').split(/\s+/).forEach(tok => {
		[',', '.', '\'', '(', ')','[',']','?'].forEach(command => {
			if (tok.startsWith(command))
				tok = tok.replace(command, command + '\n');
			else
				tok = tok.replace(command, '\n' + command);
		});
		console.log(tok);
});
