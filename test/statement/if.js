import {
	a,
	b,
	code,
	block,
} from '../util.js';

const empty = block( [] );

export default function () {
	it( 'if (a) {}', () => {
		const ast = {
			type: 'IfStatement',
			test: a,
			consequent: empty,
		};

		code({
			ast,
			code: 'if (a) {}',
		});

		code({
			ast,
			code: 'if(a){}',
			options: { compress: true },
		});

		code({
			ast,
			code: 'if ( a ) {}',
			options: { inBracketSpace: ' ' },
		});
	});

	it( 'if (a) {} else {}', () => {
		const ast = {
			type: 'IfStatement',
			test: a,
			consequent: empty,
			alternate: empty,
		};

		code({
			ast,
			code: 'if (a) {} else {}',
		});

		code({
			ast,
			code: 'if(a){}else{}',
			options: { compress: true },
		});

		code({
			ast,
			code: 'if ( a ) {} else {}',
			options: { inBracketSpace: ' ' },
		});
	});

	it( 'if (a) {} else if (b) {}', () => {
		const ast = {
			type: 'IfStatement',
			test: a,
			consequent: empty,
			alternate: {
				type: 'IfStatement',
				test: b,
				consequent: empty,
				alternate: null,
			},
		};

		code({
			ast,
			code: 'if (a) {} else if (b) {}',
		});

		code({
			ast,
			code: 'if(a){}else if(b){}',
			options: { compress: true },
		});

		code({
			ast,
			code: 'if ( a ) {} else if ( b ) {}',
			options: { inBracketSpace: ' ' },
		});
	});
}
