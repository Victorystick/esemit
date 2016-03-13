import {
	code,
	literal,
} from '../util.js';

export default function () {
	it( 'empty', () => {
		code({
			ast: {
				type: 'TemplateLiteral',
				quasis: [],
			},
			code: '``',
		});
	});

	it( 'just string', () => {
		code({
			ast: {
				type: 'TemplateLiteral',
				quasis: [ {
					value: { raw: 'foo' },
				} ],
			},
			code: '`foo`',
		});
	});

	it( 'with expression', () => {
		code({
			ast: {
				type: 'TemplateLiteral',
				quasis: [
					{
						value: { raw: 'foo' },
					},
					{
						value: { raw: 'bar' },
					},
				],
				expressions: [
					literal( false ),
				],
			},
			code: '`foo${false}bar`',
		});
	});
}
