import * as assert from 'assert';
import configure, {
	space,
	newline,
} from '../../lib/options/spacing.js';

export default function () {
	it( 'defines variables', () => {
		configure({
			space: '',
			newline: '\r\n',
		});

		assert.equal( space, '' );
		assert.equal( newline, '\r\n' );

		configure({
			space: ' ',
			newline: '\n',
		});

		assert.equal( space, ' ' );
		assert.equal( newline, '\n' );
	});
}
