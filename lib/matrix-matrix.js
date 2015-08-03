'use strict';

// FUNCTIONS //

var MEAN = require( './number-number.js' );


// MEAN FUNCTION //

/**
* FUNCTION: mean( out, n, p )
*	Computes the distribution mean for each matrix element pair.
*
* @param {Matrix} out - output matrix
* @param {Matrix} n - input matrix
* @param {Matrix} p - input matrix
* @returns {Matrix} output matrix
*/
function mean( out, n, p ) {
	var len = n.length,
		M, N,
		i, j;

	if ( out.length !== len ) {
		throw new Error( 'mean()::invalid input arguments. Input and output matrices must be the same length.' );
	}
	M = n.shape[ 0 ];
	N = n.shape[ 1 ];
	if ( M !== p.shape[ 0 ] || N !== p.shape[ 1 ] ) {
		throw new Error( 'mean()::invalid input arguments. Both matrices must have the same dimensions.' );
	}
	for ( i = 0; i < M; i++ ) {
		for ( j = 0; j < N; j++ ) {
			out.set( i, j, MEAN( n.get( i, j ), p.get( i, j ) ) );
		}
	}
	return out;
} // end FUNCTION mean()


// EXPORTS //

module.exports = mean;
