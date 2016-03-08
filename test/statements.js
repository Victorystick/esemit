import exportNamedDecl from './statement/export-named-declaration.js';
import functionDecl from './statement/function-declaration.js';
import ifStatement from './statement/if.js';
import importDecl from './statement/import-declaration.js';
import varDecl from './statement/variable-declaration.js';
import returnStmt from './statement/return-statement.js';

import { code } from './util.js';

export default function () {

	it( 'EmptyStatement', () => {
		code({
			ast: {
				type: 'EmptyStatement',
			},
			code: ';',
		});
	});

	describe( 'ExportNamedDeclaration', exportNamedDecl );
	describe( 'FunctionDeclaration', functionDecl );
	describe( 'IfStatement', ifStatement );
	describe( 'ImportDeclaration', importDecl );
	describe( 'VariableDeclaration', varDecl );
	describe( 'ReturnStatement', returnStmt );
}
