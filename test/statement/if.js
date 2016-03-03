import {
	code,
	identifier,
	block,
} from '../util.js';

export default function () {
	it( 'if (a) {}', () => {
		const ast = {
			type: 'IfStatement',
			test: identifier( 'a' ),
			consequent: block( [] ),
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
			test: identifier( 'a' ),
			consequent: block( [] ),
			alternate: block( [] ),
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
}
