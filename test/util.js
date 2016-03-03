import assert from 'assert';

// export * from '../lib/ast.js';
import { emit } from '../lib/index.js';

export function code( config ) {
	const code = emit( config.ast, config.options ).code;

	return assert.equal( code, config.code );
}

export function indent( str ) {
	str = str.join( '' );

	const match = /\n(\t+)/.exec( str );

	return str.split( match[ 1 ] ).slice( 1 ).join( '' );
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
