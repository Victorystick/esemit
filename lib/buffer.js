import { SourceMapGenerator } from 'source-map';

/**
 * Push `code` into a `Buffer`, and update
 * `lastChar` if `code` is non-empty.
 *
 * @this  PlainBuffer
 * @param {string} code the source
 */
function push( code ) {
	this.buffer.push( code );

	this.thelastChar = code[ code.length - 1 ] || this.thelastChar;
}

export function PlainBuffer() {
	this.buffer = [];
	this.thelastChar = '';
}

Object.assign( PlainBuffer.prototype, {
	lastChar() {
		return this.thelastChar;
	},

	join( sep ) {
		return this.buffer.join( sep || '' );
	},

	mark() {
		// noop
	},

	push,
});

export function SourceMappedBuffer() {
	PlainBuffer.call( this );
	this.line = 1;
	this.column = 0;
	this.map = new SourceMapGenerator();
}

Object.assign( SourceMappedBuffer.prototype = Object.create( PlainBuffer.prototype ), {
	constructor: SourceMappedBuffer,

	mark( node ) {
		this.map.addMapping({
			source: node.loc.source || './bin/esemit.js',
			name: node.name,
			original: node.loc.start,
			generated: {
				line: this.line,
				column: this.column,
			},
		});
	},

	push( code ) {
		push.call( this, code );

		for ( let i = 0; i < code.length; i += 1 ) {
			if ( code[ i ] === '\n' ) {
				this.line++;
				this.column = 0;
			}
			else {
				this.column++;
			}
		}
	},
});
