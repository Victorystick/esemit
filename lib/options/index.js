import indentation from './indentation.js';
import spacing from './spacing.js';

export default function configure( options ) {
	options = Object.assign( {}, defaults, options );

	options.requiredSpace = options.space || ' ';
	options.requiredNewline = options.newline || '\n';

	if ( options.compress ) {
		options.space = '';
		options.indent = '';
		options.newline = '';
	}

	indentation( options );
	spacing( options );

	return options;
}

const defaults = {
	baseIndentation: '',
	inBracketSpace: '',
	indent: '\t',
	newline: '\n',
	space: ' ',
	quote: '\'',
};
