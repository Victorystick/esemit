import {
	code,
	identifier,
	literal,
} from '../util.js';

export default function () {
	it( 'import "foo"', () => {
		const ast = {
			type: 'ImportDeclaration',
			source: literal( 'foo' ),
			specifiers: [],
		};

		code({
			ast,
			code: `import 'foo';`,
		});

		code({
			ast,
			code: 'import"foo";',
			options: {
				compress: true,
				quote: '"',
			},
		});
	});

	it( 'import foo from "foo"', () => {
		const ast = {
			type: 'ImportDeclaration',
			source: literal( 'foo' ),
			specifiers: [
				{
					type: 'ImportDefaultSpecifier',
					local: identifier( 'foo' ),
				},
			],
		};

		code({
			ast,
			code: `import foo from 'foo';`,
		});

		code({
			ast,
			code: `import foo from'foo';`,
			options: { compress: true },
		});
	});

	it( 'import * as foo from "foo"', () => {
		const ast = {
			type: 'ImportDeclaration',
			source: literal( 'foo' ),
			specifiers: [
				{
					type: 'ImportNamespaceSpecifier',
					local: identifier( 'foo' ),
				},
			],
		};

		code({
			ast,
			code: `import * as foo from 'foo';`,
		});

		code({
			ast,
			code: `import*as foo from'foo';`,
			options: { compress: true },
		});
	});

	it( 'import foo, * as bar from "quux"', () => {
		const ast = {
			type: 'ImportDeclaration',
			source: literal( 'quux' ),
			specifiers: [
				{
					type: 'ImportDefaultSpecifier',
					local: identifier( 'foo' ),
				},
				{
					type: 'ImportNamespaceSpecifier',
					local: identifier( 'bar' ),
				},
			],
		};

		code({
			ast,
			code: `import foo, * as bar from 'quux';`,
		});

		code({
			ast,
			code: `import foo,*as bar from'quux';`,
			options: { compress: true },
		});
	});

	it( 'import { foo } from "foo"', () => {
		const ast = {
			type: 'ImportDeclaration',
			source: literal( 'foo' ),
			specifiers: [
				{
					type: 'ImportSpecifier',
					local: identifier( 'foo' ),
					imported: identifier( 'foo' ),
				},
				{
					type: 'ImportSpecifier',
					local: identifier( 'baz' ),
					imported: identifier( 'bar' ),
				},
			],
		};

		code({
			ast,
			code: `import {foo, bar as baz} from 'foo';`,
		});

		code({
			ast,
			code: `import { foo, bar as baz } from 'foo';`,
			options: { inBracketSpace: ' ' },
		});

		code({
			ast,
			code: `import{foo,bar as baz}from'foo';`,
			options: { compress: true },
		});
	});
}
