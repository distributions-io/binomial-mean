'use strict';

// FUNCTIONS //

var MEAN = require( './number-number.js' );


// MEAN FUNCTION //

/**
* FUNCTION: mean( out, n, p, accessor )
*	Computes the distribution mean for each array element pair using an accessor function.
*
* @param {Array|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} out - output array
* @param {Number|Array|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} n - input array
* @param {Number|Array|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} p - input array
* @param {Function} accessor - accessor function for accessing array values
* @returns {Number[]|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} output array
*/
function mean( out, n, p, clbk ) {
	var len,
		v1,
		v2,
		i;

	if ( typeof n === 'number' ) {
		len = p.length;
		for ( i = 0; i < len; i++ ) {
			v1 = clbk( n, i, 0 );
			v2 = clbk( p[ i ], i, 1 );
			out[ i ] = MEAN( v1, v2 );
		}
		return out;
	}
	len = n.length;
	if ( typeof p === 'number' ) {
		for ( i = 0; i < len; i++ ) {
			v1 = clbk( n[ i ], i, 0 );
			v2 = clbk( p, i, 1 );
			out[ i ] = MEAN( v1, v2 );
		}
		return out;
	}
	if ( len !== p.length ) {
		throw new Error( 'mean()::invalid input argument. Inputs arrays must have the same length.' );
	}
	for ( i = 0; i < len; i++ ) {
		v1 = clbk( n[ i ], i, 0 );
		v2 = clbk( p[ i ], i, 1 );
		out[ i ] = MEAN( v1, v2 );
	}
	return out;
} // end FUNCTION mean()


// EXPORTS //

module.exports = mean;
