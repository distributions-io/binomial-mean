/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	mean = require( './../lib/typedarray-typedarray.js' ),

	// Function to apply element-wise:
	MEAN = require( './../lib/number-number.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'typedarray-typedarray mean', function tests() {

	it( 'should export a function', function test() {
		expect( mean ).to.be.a( 'function' );
	});

	it( 'should compute the Binomial distribution expected value', function test() {
		var expected,
			actual,
			n, p,
			i;

		n = new Float64Array( [ 10,20,30,40 ] );
		p = new Float64Array( [ 0.2, 0.4, 0.5, 0.8 ] );
		actual = new Float64Array( n.length );

		actual = mean( actual, n, p );

		expected = new Float64Array([
			2, 8, 15, 32
		]);

		for ( i = 0; i < actual.length; i++ ) {
			assert.closeTo( actual[ i ], expected[ i ], 1e-7 );
		}
	});

	it( 'should throw an error if provided input arrays of unequal length', function test() {
		expect( foo ).to.throw( Error );
		function foo() {
			mean( new Array(2), new Int8Array( [1,2] ), new Int8Array( [1,2,3] ) );
		}
	});

	it( 'should return an empty array if provided an empty array', function test() {
		assert.deepEqual( mean( new Int8Array(), new Int8Array(), new Int8Array() ), new Int8Array() );
	});

});
