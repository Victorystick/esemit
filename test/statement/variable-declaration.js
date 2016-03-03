import {
	code,
	identifier,
	literal,
} from '../util.js';

export default function () {
	it( 'var a;', () => {
		code({
			ast: {
				type: 'VariableDeclaration',
				kind: 'var',
				declarations: [
					{
						type: 'VariableDeclarator',
						id: identifier( 'a' ),
						init: null,
					},
				],
			},
			code: 'var a;',
		});
	});

	it( 'let a = "1", b;', () => {
		code({
			ast: {
				type: 'VariableDeclaration',
				kind: 'let',
				declarations: [
					{
						type: 'VariableDeclarator',
						id: identifier( 'a' ),
						init: literal( 'foo' ),
					},
					{
						type: 'VariableDeclarator',
						id: identifier( 'b' ),
						init: null,
					},
				],
			},
			code: `let a = 'foo', b;`,
		});
	});
}
