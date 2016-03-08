import {
	code,
	identifier,
	literal,
	returnStmt,
} from '../util.js';

export default function () {
	it( 'separates its argument with space', () => {
		const ast = returnStmt( identifier( 'a' ) );

		code({
			ast,
			code: 'return a;',
		});

		code({
			ast,
			code: 'return a;',
			options: { compress: true },
		});
	});

	describe( 'does not require space before', () => {
		it( 'arrays', () => {
			const ast = returnStmt({
				type: 'ArrayExpression',
				elements: [],
			});

			code({
				ast,
				code: `return [];`,
			});

			code({
				ast,
				code: `return[];`,
				options: { compress: true },
			});
		});

		it( 'objects', () => {
			const ast = returnStmt({
				type: 'ObjectExpression',
				properties: [],
			});

			code({
				ast,
				code: `return {};`,
			});

			code({
				ast,
				code: `return{};`,
				options: { compress: true },
			});
		});

		it( 'strings', () => {
			const ast = returnStmt( literal( 'foo' ) );

			code({
				ast,
				code: `return 'foo';`,
			});

			code({
				ast,
				code: `return'foo';`,
				options: { compress: true },
			});
		});
	});
}
