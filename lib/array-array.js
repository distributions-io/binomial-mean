'use strict';

// FUNCTIONS //

var MEAN = require( './number-number.js' );


// MEAN FUNCTION //

/**
* FUNCTION: mean( out, n, p )
*	Computes the distribution mean for each array parameter pair.
*
* @param {Array|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} out - output array
* @param {Array} n - input array
* @param {Array} p - input array
* @returns {Number[]|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} output array
*/
function mean( out, n, p ) {
	var len = n.length,
		i;

	if ( p.length !== len ) {
		throw new Error( 'mean()::invalid input arguments. Input arrays must have the same length.' );
	}
	for ( i = 0; i < len; i++ ) {
		out[ i ] = MEAN( n[ i ], p[ i ] );
	}
	return out;
} // end FUNCTION mean()


// EXPORTS //

module.exports = mean;
