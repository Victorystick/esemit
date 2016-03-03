import * as expressions from './expressions.js';
import * as statements from './statements.js';
import { expression, statement } from './emit.js';

import configureIndentation from './indentation.js';

export function emit( node, options ) {
	const code = [];

	options = normalizeOptions( options );

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
		map: null,
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
	currentIndent: '',
	inBracketSpace: '',
	indent: '\t',
	newline: '\n',
	space: ' ',
	quote: '\'',
};
