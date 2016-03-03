import {
	code,
	literal,
} from '../util.js';

export default function () {
	it( 'null', () => {
		code({
			ast: literal( null ),
			code: 'null',
		});
	});

	it( 'boolean', () => {
		code({
			ast: literal( true ),
			code: 'true',
		});

		code({
			ast: literal( false ),
			code: 'false',
		});
	});

	describe( 'string', () => {
		it( 'default', () => {
			code({
				ast: 	literal( 'foo' ),
				code: "'foo'",
			});
		});

		it( 'double', () => {
			code({
				ast: 	literal( 'foo' ),
				code: '"foo"',
				options: { quote: '"' },
			});
		});
	});

	describe( 'number', () => {
		it( '13', () => {
			code({
				ast: 	literal( 13 ),
				code: '13',
			});
		});
	});
}
