/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Deep close to:
	deepCloseTo = require( './utils/deepcloseto.js' ),

	// Module to be tested:
	mean = require( './../lib/array-typedarray.js' ),

	// Function to apply element-wise:
	MEAN = require( './../lib/number-number.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'array-typedarray mean', function tests() {

	it( 'should export a function', function test() {
		expect( mean ).to.be.a( 'function' );
	});

	it( 'should throw an error if provided arrays of unequal length', function test() {
		expect( foo ).to.throw( Error );
		function foo() {
			mean( [1,2], [1,2], new Int32Array( 3 ) );
		}
	});

	it( 'should compute the  Binomial mean', function test() {
		var expected,
			actual,
			n, p;

		n = [ 10, 20, 30, 40 ];
		p = new Float64Array( [ 0.2, 0.4, 0.5, 0.8 ] );

		actual = new Array( n.length );
		actual = mean( actual, n, p );

		expected = [ 2, 8, 15, 32 ];

		assert.isTrue( deepCloseTo( actual, expected, 1e-7 ) );
	});

	it( 'should return an empty array if provided an empty array', function test() {
		assert.deepEqual( mean( [], [], new Int8Array() ), [] );
	});

	it( 'should handle non-numeric values by setting the element to NaN', function test() {
		var expected,
			actual,
			n, p;

		n = [ true, null, [], {} ];
		p = new Float64Array( [ 0.2, 0.4, 0.5, 0.8 ] );

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
