import assert from 'assert';

// export * from '../lib/ast.js';
import { emit } from '../lib/index.js';

export function code( config ) {
	const code = emit( config.ast, config.options ).code;

	return assert.equal( code, config.code );
}

export function indent( str ) {
	str = str.join( '' );

	const match = /^\n(\t+)/.exec( str );

	return str.split( match[ 1 ] ).slice( 1 ).join( '' );
}

export const a = identifier( 'a' ),
	b = identifier( 'b' ),
	c = identifier( 'c' );

export function arrow( params, body ) {
	return {
		type: 'ArrowFunctionExpression',
		params,
		body,
		expression: body.type !== 'BlockStatement',
	};
}

export function assign( left, operator, right ) {
	return {
		type: 'AssignmentExpression',
		left,
		operator,
		right,
	};
}

export function identifier( name ) {
	return { type: 'Identifier', name };
}

export function literal( value ) {
	return { type: 'Literal', value };
}

export function block( body ) {
	return { type: 'BlockStatement', body };
}

export function exprStmt( expression ) {
	return { type: 'ExpressionStatement', expression };
}

export function object( properties ) {
	return { type: 'ObjectExpression', properties };
}

export function returnStmt( argument ) {
	return { type: 'ReturnStatement', argument };
}

export function newExpr( callee, args ) {
	return { type: 'NewExpression', callee, arguments: args };
}

export function member( object, property, computed ) {
	return {
		type: 'MemberExpression',
		object,
		property,
		computed: computed || false,
	};
}

export function yieldExpr( expression, delegate, argument ) {
	return {
		type: 'YieldExpression',
		expression,
		delegate,
		argument,
	};
}
