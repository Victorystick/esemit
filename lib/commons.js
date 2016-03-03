import {
	Pattern,
} from './expressions.js';

export function functionParams( node, code, options ) {
	const n = node.params.length;

	code.push( '(' );

	for ( let i = 0; i < n; ) {
		const param = node.params[ i ];

		Pattern( param, code, options );

		if ( ++i < n ) {
			code.push( ',', options.space );
		}
	}

	code.push( ')' );
}
