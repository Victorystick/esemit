import {
	code,
	identifier,
	indent,
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
				body: {
					type: 'BlockStatement',
					body: [
						{
							type: 'ReturnStatement',
							argument: identifier( 'x' ),
						},
					],
				},
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
			body: {
				type: 'BlockStatement',
				body: [
					{
						type: 'ReturnStatement',
						argument: {
							type: 'FunctionExpression',
							id: null,
							params: [],
							body: {
								type: 'BlockStatement',
								body: [
									{
										type: 'ReturnStatement',
										argument: identifier( 'x' ),
									},
								],
							},
						},
					},
				],
			},
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
}
