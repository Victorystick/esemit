import buffer from './buffer.js';
import options from './options/index.js';
import statements from './statements.js';
import expressions from './expressions.js';

describe( 'buffer', buffer );

describe( 'options', options );

describe( 'emit', () => {
	describe( 'Expressions', expressions );
	describe( 'Statement', statements );
});
