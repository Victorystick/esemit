let current = '';
let indent = '  ';

export default function configure( options ) {
	current = options.baseIndentation || '';
	indent = options.indent;
}

export function indented( fn ) {
	const prev = current;
	current += indent;

	fn();

	current = prev;
}

export { current as indent };
