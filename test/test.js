import buffer from './buffer.js';
import statements from './statements.js';
import expressions from './expressions.js';

describe.only( 'buffer', buffer );

describe( 'emit', () => {
	describe( 'Expressions', expressions );
	describe( 'Statement', statements );
});
