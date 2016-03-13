import * as assert from 'assert';
import { SourceMapConsumer } from 'source-map';

import {
	PlainBuffer,
	SourceMappedBuffer,
} from '../lib/buffer.js';

export default function () {
	describe( 'plain', () => {
		it( 'does not keep track of generated positions', () => {
			const buffer = new PlainBuffer();

			assert.equal( typeof buffer.line, 'undefined' );
			assert.equal( typeof buffer.column, 'undefined' );
		});

		it( 'concatenates code pushes', () => {
			const buffer = new PlainBuffer();

			buffer.push( 'foo' );
			buffer.push( 'bar' );

			assert.equal( buffer.join(), 'foobar' );
		});

		it( 'keeps track of the last character', () => {
			const buffer = new PlainBuffer();
			assert.equal( buffer.lastChar(), '' );

			buffer.push( 'a' );
			assert.equal( buffer.lastChar(), 'a' );

			buffer.push( '' );
			assert.equal( buffer.lastChar(), 'a' );
		});
	});

	describe( 'source-mapped', () => {
		it( 'keeps track of generated positions', () => {
			const buffer = new SourceMappedBuffer();

			assert.equal( typeof buffer.line, 'number' );
			assert.equal( typeof buffer.column, 'number' );
		});

		it( 'concatenates code pushes', () => {
			const buffer = new SourceMappedBuffer();

			buffer.push( 'foo' );
			assert.equal( buffer.line, 1 );
			assert.equal( buffer.column, 3 );

			buffer.push( '\n' );
			assert.equal( buffer.line, 2 );
			assert.equal( buffer.column, 0 );

			buffer.push( 'bar' );
			assert.equal( buffer.line, 2 );
			assert.equal( buffer.column, 3 );

			assert.equal( buffer.join(), 'foo\nbar' );

			buffer.push( '`baz\nquux`' );
			assert.equal( buffer.line, 3 );
			assert.equal( buffer.column, 5 );
		});

		it( 'tracks positions of nodes', () => {
			const buffer = new SourceMappedBuffer();

			buffer.mark({
				name: 'foo',
				loc: {
					source: 'file.js',
					start: {
						line: 3,
						column: 10,
					},
				},
			});
			buffer.push( 'foo' );

			const cons = new SourceMapConsumer( buffer.map.toString() );

			assert.deepEqual( cons.originalPositionFor( { line: 1, column: 0 } ), {
				source: 'file.js',
				name: 'foo',
				line: 3,
				column: 10,
			});
		});
	});
}
