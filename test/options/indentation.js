import * as assert from 'assert';
import configure, { indent, indented } from '../../lib/options/indentation.js';

export default function () {
	it( 'has an indent string', () => {
		assert.equal( indent, '' );
	});

	it( 'can have the indent configured', () => {
		configure({
			indent: '  ',
		});

		assert.equal( indent, '' );

		indented( () => {
			assert.equal( indent, '  ' );

			indented( () => {
				assert.equal( indent, '    ' );
			});

			assert.equal( indent, '  ' );
		});

		assert.equal( indent, '' );

		configure({
			indent: '\t',
		});

		indented( () => {
			assert.equal( indent, '\t' );

			indented( () => {
				assert.equal( indent, '\t\t' );
			});

			assert.equal( indent, '\t' );
		});

		assert.equal( indent, '' );
	});

	it( 'can have the base indentation configured', () => {
		configure({
			baseIndentation: '  ',
			indent: '  ',
		});


		assert.equal( indent, '  ' );

		indented( () => {
			assert.equal( indent, '    ' );

			indented( () => {
				assert.equal( indent, '      ' );
			});

			assert.equal( indent, '    ' );
		});

		assert.equal( indent, '  ' );
	});
}
