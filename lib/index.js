'use strict';

// MODULES //

var ctors = require( 'compute-array-constructors' ),
	matrix = require( 'dstructs-matrix' ),
	validate = require( './validate.js' ),
	getType = require( './getType.js' ),
	nans = require( './nans.js' );


// FUNCTIONS //

var fcns = require( './fcns.js' );


// MEAN //

/**
* FUNCTION: mean( n, p[, opts] )
*	Computes the distribution mean.
*
* @param {Number|Number[]|Array|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array|Matrix} n - input value
* @param {Number|Number[]|Array|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array|Matrix} p - input value
* @param {Object} [opts] - function options
* @param {Function} [opts.accessor] - accessor function for accessing array values
* @param {String} [opts.dtype="float64"] - output data type
* @returns {Number|Number[]|Array|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array|Matrix} mean function value(s)
*/
function mean( n, p, options ) {
	/* jshint newcap:false */
	var opts = {},
		nType,
		pType,
		nFlg,
		pFlg,
		ctor,
		err,
		fcn,
		len,
		out,
		dt,
		sh,
		d;

	if ( arguments.length < 2 ) {
		throw new Error( 'mean():: Insufficient number of arguments. Both `n` and `p` arguments have to be supplied' );
	}

	if ( arguments.length > 2 ) {
		err = validate( opts, options );
		if ( err ) {
			throw err;
		}
	}
	// Determine argument types...
	nType = getType( n );
	pType = getType( p );

	// Handle numeric inputs...
	if ( nType === 'number' && pType === 'number' ) {
		return fcns[ 'number-number' ]( n, p );
	}

	// Handle some cases where one or more arguments is not a supported type. Note that these cases are not exhaustive. Additional cases are handled by returning an appropriate data structure containing NaNs (see below).
	nFlg = !nType;
	pFlg = !pType;
	if (
		(nFlg && pFlg) ||
		(nFlg && pType === 'number') ||
		(pFlg && nType === 'number')
	) {
		return NaN;
	}

	// Determine the output data structure length...
	if (
		nType === 'matrix' ||
		nType === 'typedarray' ||
		nType === 'array'
	) {
		len = n.length;
	}
	// `n` is either a number or an unsupported type; in which case, `p` must not be a number and must be a supported type...
	else {
		len = p.length;
	}

	// Handle case where one or more inputs is a matrix...
	if ( nType === 'matrix' || pType === 'matrix' ) {
		dt = opts.dtype || 'float64';
		ctor = ctors( dt );
		if ( ctor === null ) {
			throw new Error( 'mean()::invalid option. Data type option does not have a corresponding array constructor. Option: `' + dt + '`.' );
		}
		// Create an output matrix:
		d = new ctor( len );
		sh = ( nType === 'matrix' ) ? n.shape : p.shape;
		out = matrix( d, sh, dt );
	}
	// Handle typed-array output...
	else if ( opts.dtype || (nType === 'typedarray' && pType === 'typedarray') ||
		(nType === 'typedarray' && pType === 'number') || (nType === 'number' && pType === 'typedarray')
	) {
		dt = opts.dtype || 'float64';
		ctor = ctors( dt );
		if ( ctor === null ) {
			throw new Error( 'mean()::invalid option. Data type option does not have a corresponding array constructor. Option: `' + dt + '`.' );
		}
		out = new ctor( len );
	}
	// If no dtype is specified and at least one argument is an array, output an array...
	else {
		out = new Array( len );
	}
	// Handle invalid types...
	if ( nType === null || pType === null ) {
		return ( out.data ) ? nans( out.data ) : nans( out );
	}
	// Get the implementation (note that only matrices cannot have accessors):
	if ( opts.accessor && nType !== 'matrix' && pType !== 'matrix' ) {
		fcn = fcns[ 'accessor' ];
		return fcn( out, n, p, opts.accessor );
	}
	fcn = fcns[ nType + '-' + pType ];

	// Handle invalid pairings...
	if ( !fcn ) {
		throw new Error( 'mean()::invalid input arguments. Unsupported argument pair: [' + nType + ', ' + pType + '].' );
	}
	return fcn( out, n, p );
} // end FUNCTION mean()


// EXPORTS //

module.exports = mean;
