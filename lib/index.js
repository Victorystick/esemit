import {
	PlainBuffer,
	SourceMappedBuffer,
} from './buffer.js';

import * as expressions from './expressions.js';
import * as statements from './statements.js';
import { expression, statement } from './emit.js';

import configureIndentation from './options/indentation.js';

export function emit( node, options ) {
	options = normalizeOptions( options );

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

function normalizeOptions( options ) {
	options = options || {};

	if ( options.compress ) {
		options.space = '';
		options.indent = '';
		options.newline = '';
	}

	options = Object.assign( {}, defaultOptions, options );

	options.requiredSpace = options.space || ' ';
	options.requiredNewline = options.newline || '\n';

	configureIndentation( options );

	return options;
}

const defaultOptions = {
	baseIndentation: '',
	inBracketSpace: '',
	indent: '\t',
	newline: '\n',
	space: ' ',
	quote: '\'',
};
