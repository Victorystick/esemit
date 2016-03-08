function constant( x ) {
	return () => x;
}

const alwaysTrue = constant( true );
const alwaysFalse = constant( false );

const expressions = {
	ArrayExpression: alwaysFalse,
	BinaryExpression: alwaysTrue,
	CallExpression: ( node ) => requiresSpace( node.callee ),
	FunctionExpression: alwaysTrue,
	Identifier: alwaysTrue,
	Literal: ( node ) => typeof node.value !== 'string' || node.value instanceof RegExp,
	MemberExpression: ( node ) => requiresSpace( node.object ),
	NewExpression: alwaysTrue,
	ObjectExpression: alwaysFalse,
	SequenceExpression: ( node ) => requiresSpace( node.expressions[ 0 ] ),
	ThisExpression: alwaysTrue,
	UnaryExpression: alwaysFalse,
};

export default function requiresSpace( node ) {
	if ( node.type in expressions ) {
		return expressions[ node.type ]( node );
	}

	throw new Error( `Unknown expression "${ node.type }"` );
}
