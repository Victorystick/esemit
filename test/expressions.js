import templateLiteral from './expression/template-literal.js';
import literal from './expression/literal.js';

export default function () {
	describe( 'Literal', literal );
	describe( 'TemplateLiteral', templateLiteral );
}
