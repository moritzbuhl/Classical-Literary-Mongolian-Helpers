vocabulary.forEach(voc => {
	if (voc == '') return;
	const va = voc.replace(/\-.*$/, '').split('');
	const transls = [];
	glossary.forEach(glo => {
		const ga = glo.substr(0,va.length + 1).split('');
		for (let i = 0; i < ga.length; i++) {
			if (va[i] != ga[i] || i == va.length) {
				if (i + va.length / 2 >= va.length)
					transls.push([i, glo])
				break;
			}
		}
	});
	transls.sort((a,b) => {
		if (a[0] > b[0])
			return -1;
		else if (a[0] < b[0])
			return 1;
		return 0;
	});
	console.log('###');
	console.log(voc);
	let j = 4;
	if (transls[j]) {
		const u = transls[j][0];
		while (transls[j] && transls[j][0] == u) j++;
	}
	transls.splice(0, j).forEach(e => {
		console.log(e[1]);
	});
});
