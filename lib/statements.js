import {
	indent,
	indented,
} from './indentation.js';

import {
	Identifier,
	Literal,
	Pattern,
} from './expressions.js';

import requiresSpace from './space-required-before.js';

import {
	expression,
	statement,

	// We can't import ourselves directly, but it's possible to
	// do indirectly through emit, since we don't use `statements`
	// until after initialization.
	statements,
} from './emit.js';

export function BlockStatement( node, code, options ) {
	indented( () => {
		code.push( '{' );

		for ( let i = 0; i < node.body.length; i++ ) {
			code.push( options.newline, indent );
			statement( node.body[ i ], code, options );
		}
	});

	if ( node.body.length ) {
		code.push( options.newline, indent );
	}

	code.push( '}' );
}

export function ExportDefaultDeclaration( node, code, options ) {
	code.push( 'export default ' );

	if ( node.declaration in statements ) {
		statement( node.declaration, code, options );
	}
	else {
		expression( node.declaration, code, options );
		code.push( ';' );
	}
}

export function ExportNamedDeclaration( node, code, options ) {
	code.push( 'export' );

	if ( node.declaration ) {
		code.push( options.requiredSpace );
		statement( node.declaration, code, options );
	}

	if ( node.specifiers ) {
		code.push( options.space, '{' );

		code.push( '}', ';' );
	}
}

export function ExpressionStatement( node, code, options ) {
	expression( node.expression, code, options );
	code.push( ';' );
}

export function EmptyStatement( node, code ) {
	code.push( ';' );
}

export { FunctionExpression as FunctionDeclaration } from './expressions.js';

export function IfStatement( node, code, options ) {
	code.push( 'if', options.space, '(', options.inBracketSpace );

	expression( node.test, code, options );

	code.push( options.inBracketSpace, ')', options.space );

	statement( node.consequent, code, options );

	if ( node.alternate ) {
		code.push( options.space, 'else', options.space );
		statement( node.alternate, code, options );
	}
}

export function ImportDeclaration( node, code, options ) {
	const specs = node.specifiers;
	const n = specs.length;

	code.push( 'import' );

	if ( n ) {
		let i = 0, hasNamedImports = false;

		if ( specs[ i ].type === 'ImportDefaultSpecifier' ) {
			code.push( options.requiredSpace );
			Identifier( specs[ i ].local, code, options );
			++i;
		}

		if ( i < n && specs[ i ].type === 'ImportNamespaceSpecifier' ) {
			if ( i ) {
				code.push( ',' );
			}

			code.push( options.space, '*', options.space, 'as', options.requiredSpace );
			Identifier( specs[ i ].local, code, options );
			++i;
		}

		if ( i < n ) {
			code.push( options.space, '{', options.inBracketSpace );
		}

		while ( i < n ) {
			const spec = specs[ i ];

			hasNamedImports = true;

			if ( spec.imported.name !== spec.local.name ) {
				Identifier( spec.imported, code, options );
				code.push( options.requiredSpace, 'as', options.requiredSpace );
			}

			Identifier( spec.local, code, options );

			if ( ++i < n ) {
				code.push( ',', options.space );
			}
			else {
				code.push( options.inBracketSpace, '}', options.space );
			}
		}

		if ( !hasNamedImports ) {
			code.push( options.requiredSpace );
		}

		code.push( 'from' );
	}

	code.push( options.space );
	Literal( node.source, code, options );
	code.push( ';' );
}

export function ReturnStatement( node, code, options ) {
	code.push( 'return' );

	if ( node.argument ) {
		code.push( requiresSpace( node.argument ) ? options.requiredSpace : options.space );
		expression( node.argument, code, options );
	}

	code.push( ';' );
}

export function VariableDeclaration( node, code, options ) {
	const decls = node.declarations;
	const n = decls.length;

	code.push( node.kind, options.requiredSpace );

	for ( let i = 0; i < n; ) {
		VariableDeclarator( decls[ i ], code, options );

		if ( ++i < n ) {
			code.push( ',', options.space );
		}
	}

	code.push( ';' );
}

function VariableDeclarator( node, code, options ) {
	Pattern( node.id, code, options );

	if ( node.init ) {
		code.push( options.space, '=', options.space );
		expression( node.init, code, options );
	}
}
