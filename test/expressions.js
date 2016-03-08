import arrow from './expression/arrow-function-expression.js';
import literal from './expression/literal.js';
import templateLiteral from './expression/template-literal.js';

export default function () {
	describe( 'ArrowFunctionExpression', arrow );
	describe( 'Literal', literal );
	describe( 'TemplateLiteral', templateLiteral );
}
