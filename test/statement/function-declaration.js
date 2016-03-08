import {
	block,
	code,
	exprStmt,
	identifier,
	indent,
	literal,
	returnStmt,
	yieldExpr,
} from '../util.js';

export default function () {
	it( 'identity', () => {
		code({
			ast: {
				type: 'FunctionDeclaration',
				id: identifier( 'identity' ),
				params: [
					identifier( 'x' ),
				],
				body: block([
					returnStmt( identifier( 'x' ) ),
				]),
			},
			code: indent`
			function identity(x) {
				return x;
			}`,
		});
	});

	it( 'constant', () => {
		const ast = {
			type: 'FunctionDeclaration',
			id: identifier( 'constant' ),
			params: [
				identifier( 'x' ),
			],
			body: block([
				returnStmt({
					type: 'FunctionExpression',
					id: null,
					params: [],
					body: block([
						returnStmt( identifier( 'x' ) ),
					]),
				}),
			]),
		};

		code({
			ast,
			code: indent`
			function constant(x) {
				return function () {
					return x;
				};
			}`,
		});

		code({
			ast,
			code: 'function constant(x){return function(){return x;};}',
			options: { compress: true },
		});
	});

	it( 'generator', () => {
		const ast = {
			type: 'FunctionDeclaration',
			id: identifier( 'foo' ),
			generator: true,
			params: [],
			body: block([
				exprStmt( yieldExpr( literal( 1 ) ) ),
				exprStmt( yieldExpr( literal( 2 ) ) ),
			]),
		};

		code({
			ast,
			code: indent`
			function* foo() {
				yield 1;
				yield 2;
			}`,
		});

		code({
			ast,
			code: 'function*foo(){yield 1;yield 2;}',
			options: { compress: true },
		});
	});
}
