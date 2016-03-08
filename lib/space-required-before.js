function constant( x ) {
	return () => x;
}

const alwaysTrue = constant( true );
const alwaysFalse = constant( false );

const startsWithAlphanum = {
	ArrayExpression: alwaysFalse,
	BinaryExpression: alwaysTrue,
	BlockStatement: alwaysFalse,
	CallExpression: ( node ) => requiresSpace( node.callee ),
	FunctionExpression: alwaysTrue,
	Identifier: alwaysTrue,
	IfStatement: alwaysTrue,
	Literal: ( node ) => typeof node.value !== 'string' || node.value instanceof RegExp,
	MemberExpression: ( node ) => requiresSpace( node.object ),
	NewExpression: alwaysTrue,
	ObjectExpression: alwaysFalse,
	SequenceExpression: ( node ) => requiresSpace( node.expressions[ 0 ] ),
	ThisExpression: alwaysTrue,
	UnaryExpression: alwaysFalse,
};

export default function requiresSpace( node ) {
	if ( node.type in startsWithAlphanum ) {
		return startsWithAlphanum[ node.type ]( node );
	}

	throw new Error( `Unknown expression/statement "${ node.type }"` );
}
