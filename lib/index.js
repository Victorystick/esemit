import {
	PlainBuffer,
	SourceMappedBuffer,
} from './buffer.js';

import * as expressions from './expressions.js';
import * as statements from './statements.js';
import { expression, statement } from './emit.js';

import configure from './options/index.js';

export function emit( node, options ) {
	options = configure( options || {} );

	const code = options.sourceMap
		? new SourceMappedBuffer()
		: new PlainBuffer();

	if ( node.type in statements ) {
		statement( node, code, options );
	}

	else if ( node.type in expressions ) {
		expression( node, code, options );
	}

	else {
		throw new Error( `Unknown node type "${ node.type }"` );
	}

	return {
		code: code.join( '' ),
		map: code.map,
	};
}
