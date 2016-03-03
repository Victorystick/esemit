import {
	code,
	identifier,
	literal,
} from '../util.js';

export default function () {
	it( 'export function declaration', () => {
		const ast = {
			type: 'ExportNamedDeclaration',
			declaration: {
				type: 'FunctionDeclaration',
				id: identifier( 'a' ),
				params: [],
				body: {
					type: 'BlockStatement',
					body: [],
				},
			},
		};

		code({
			ast,
			code: 'export function a() {}',
		});
	});

	it( 'export variable declaration', () => {
		const ast = {
			type: 'ExportNamedDeclaration',
			declaration: {
				type: 'VariableDeclaration',
				kind: 'const',
				declarations: [
					{
						type: 'VariableDeclarator',
						id: identifier( 'a' ),
						init: literal( 1 ),
					},
					{
						type: 'VariableDeclarator',
						id: identifier( 'b' ),
						init: literal( 2 ),
					},
				],
			},
		};

		code({
			ast,
			code: 'export const a = 1, b = 2;'
		});

		code({
			ast,
			code: 'export const a=1,b=2;',
			options: { compress: true },
		})
	});
}
