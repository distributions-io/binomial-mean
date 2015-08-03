'use strict';

// MODULES //

var isNonNegativeInteger = require( 'validate.io-nonnegative-integer' ),
	isNumber = require( 'validate.io-number-primitive' );

// MEAN //

/**
* FUNCTION mean( n, p )
*	Computes the mean for a Binomial distribution with number of trials `n` and success probability `p`.
*
* @param {Number} n - number of trials
* @param {Number} p - success probability
* @returns {Number} distribution mean
*/
function mean( n, p ){
	if ( !isNonNegativeInteger( n ) ) {
		return NaN;
	}
	if ( !( isNumber(p) && 0 <= p && p <= 1) ) {
		return NaN;
	}
	return n * p;
} // end FUNCTION mean()


// EXPORTS //

module.exports = mean;
