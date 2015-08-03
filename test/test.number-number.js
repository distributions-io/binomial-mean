/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Validate that a value is NaN:
	isnan = require( 'validate.io-nan' ),

	// Module to be tested:
	mean = require( './../lib/number-number.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'number-number mean', function tests() {

	it( 'should export a function', function test() {
		expect( mean ).to.be.a( 'function' );
	});

	it( 'should compute the Binomial distribution expected value', function test() {
		assert.closeTo( mean(  10,  0.2 ),  2, 1e-7 );
		assert.closeTo( mean(  20,  0.4 ),  8, 1e-7 );
		assert.closeTo( mean(  30,  0.5 ),  15, 1e-7 );
		assert.closeTo( mean(  40,  0.8 ),  32, 1e-7 );
	});

	it( 'should return NaN if provided a NaN', function test() {
		assert.isTrue( isnan( mean( 10, NaN ) ) );
		assert.isTrue( isnan( mean( NaN,  0.2 ) ) );
		assert.isTrue( isnan( mean( NaN, NaN ) ) );
	});

});
