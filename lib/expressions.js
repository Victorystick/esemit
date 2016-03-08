import { functionParams } from './commons.js';
import {
	BlockStatement,
} from './statements.js';
import { expression } from './emit.js';
import * as escape from './escape.js';

export function ArrowFunctionExpression( node, code, options ) {
	if ( node.params.length === 1 ) {
		Identifier( node.params[ 0 ], code, options );
	}
	else {
		if ( node.async ) {
			code.push( 'async', options.space );
		}

		functionParams( node, code, options );
	}

	code.push( '=>' );

	if ( node.body.type === 'BlockStatement' ) {
		BlockStatement( node.body, code, options );
	}
	else {
		expression( node.body, code, options );
	}
}

export function FunctionExpression( node, code, options ) {
	if ( node.async ) {
		code.push( 'async', options.requiredSpace );
	}

	code.push( 'function' );

	if ( node.generator ) {
		code.push( '*' );
	}

	if ( node.id ) {
		code.push( node.generator ? options.space : options.requiredSpace );
		Identifier( node.id, code, options );
	}
	else {
		code.push( options.space );
	}

	functionParams( node, code, options );

	code.push( options.space );

	BlockStatement( node.body, code, options );
}

export function Identifier( node, code ) {
	code.push( node.name );
}


export function Literal( node, code, options ) {
	if ( node.value === null ) {
		return code.push( 'null' );
	}

	switch ( typeof node.value ) {
		case 'boolean':
			return code.push( node.value ? 'true' : 'false' );

		case 'string':
			return code.push( escape.string( node.value, options ) );

		case 'number':
			return code.push( escape.number( node.value, options ) );
	}

	// return escape.regex( node.value );
}

export function Pattern( node, code, options ) {
	// TODO: ES6 patterns
	Identifier( node, code, options );
}

export function Super( node, code ) {
	code.push( 'super' );
}

export function TaggedTemplateExpression( node, code, options ) {
	expression( node.tag, code, options );
	TemplateLiteral( node.quasi, code, options );
}

export function TemplateElement( node, code ) {
	code.push( node.value.raw );
}

export function TemplateLiteral( node, code, options ) {
	code.push( '`' );

	for ( let i = 0, quasis = node.quasis.length; i < quasis; i++ ) {
		TemplateElement( node.quasis[ i ], code, options );

		if ( i + 1 < quasis ) {
			code.push( '${', options.inBracketSpace );
			expression( node.expressions[ i ], code, options );
			code.push( options.inBracketSpace, '}' );
		}
	}

	code.push( '`' );
}

export function ThisExpression( _, code ) {
	code.push( 'this' );
}

export function YieldExpression( node, code, options ) {
	code.push( 'yield ' );
	expression( node.expression, code, options );
}
