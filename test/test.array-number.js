/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Deep close to:
	deepCloseTo = require( './utils/deepcloseto.js' ),

	// Module to be tested:
	mean = require( './../lib/array-number.js' ),

	// Function to apply element-wise:
	MEAN = require( './../lib/number-number.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'array-number mean', function tests() {

	it( 'should export a function', function test() {
		expect( mean ).to.be.a( 'function' );
	});

	it( 'should compute the Binomial distribution expected value', function test() {
		var expected,
			actual,
			n, p;

		n = [ 10, 20, 30, 40 ];
		p = 0.2;

		actual = new Array( n.length );
		actual = mean( actual, n, p );

		expected = [
			2,
			MEAN( n[ 1 ], p ),
			MEAN( n[ 2 ], p ),
			MEAN( n[ 3 ], p )
		];

		assert.isTrue( deepCloseTo( actual, expected, 1e-7 ) );
	});

	it( 'should return an empty array if provided an empty array', function test() {
		assert.deepEqual( mean( [], [], 1 ), [] );
	});

	it( 'should handle non-numeric values by setting the element to NaN', function test() {
		var expected,
			actual,
			n, p;

		n = [ true, null, [], {} ];
		p = 0.2;

		actual = new Array( n.length );
		actual = mean( actual, n, p );

		expected = [ NaN, NaN, NaN, NaN ];
		assert.deepEqual( actual, expected );

		actual = new Int32Array( n.length );
		actual = mean( actual, n, p );

		// Integer arrays cannot represent NaN:
		expected = new Int32Array( [ 0, 0, 0, 0 ] );
		assert.deepEqual( actual, expected );
	});

});
