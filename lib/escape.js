export function number( value ) {
	return String( value );
}

export function string( value, options ) {
	value = value.replace( '\\', '\\\\' ).replace( options.quote, '\\' + options.quote );

	return `${ options.quote }${ value }${ options.quote }`;
}
