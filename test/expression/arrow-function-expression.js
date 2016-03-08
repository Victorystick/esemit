import {
	arrow,
	block,
	code,
	literal,
	object,
} from '../util.js';

export default function () {
	it( '() => {}', () => {
		const ast = arrow( [],
			block( [] )
		);

		code({
			ast,
			code: '() => {}',
		});
	});

	it( '() => 1', () => {
		const ast = arrow( [],
			literal( 1 )
		);

		code({
			ast,
			code: '() => 1',
		});
	});

	it( '() => ({})', () => {
		const ast = arrow( [],
			object( [] )
		);

		code({
			ast,
			code: '() => ({})',
		});
	});
}
