'use strict';

// FUNCTIONS //

var MEAN = require( './number-number.js' );


// MEAN FUNCTION //

/**
* FUNCTION: mean( out, n, p )
*	Computes the distribution mean for each matrix element.
*
* @param {Matrix} out - output matrix
* @param {Number} n - scalar
* @param {Matrix} p - input matrix
* @returns {Matrix} output matrix
*/
function mean( out, n, p ) {
	var len = p.length,
		i;

	if ( out.length !== len ) {
		throw new Error( 'mean()::invalid input arguments. Input and output matrices must be the same length.' );
	}
	for ( i = 0; i < len; i++ ) {
		out.data[ i ] = MEAN( n, p.data[ i ] );
	}
	return out;
} // end FUNCTION mean()


// EXPORTS //

module.exports = mean;
