import * as statements from './statements.js';
import * as expressions from './expressions.js';

export function statement( node, code, options ) {
	statements[ node.type ]( node, code, options );
}

export function expression( node, code, options ) {
	expressions[ node.type ]( node, code, options );
}

export { statements, expressions };
