/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Deep close to:
	deepCloseTo = require( './utils/deepcloseto.js' ),

	// Module to be tested:
	mean = require( './../lib/accessor.js' ),

	// Function to apply element-wise:
	MEAN = require( './../lib/number-number.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'accessor mean', function tests() {

	it( 'should export a function', function test() {
		expect( mean ).to.be.a( 'function' );
	});

	it( 'should throw an error if not provided arrays of equal length', function test() {
		expect( foo ).to.throw( Error );
		function foo() {
			mean( [1,2], [1,2], [1,2,3] );
		}
	});

	it( 'should compute the Binomial distribution expected value using an accessor when `p` is a scalar', function test() {
		var expected,
			actual,
			n, p;

		n = [
			{'n':10},
			{'n':20},
			{'n':30},
			{'n':40}
		];
		p = 0.2;
		actual = new Array( n.length );
		actual = mean( actual, n, p, getValue );

		expected = n.map( function(e){
			return MEAN( e.n, p );
		});

		assert.isTrue( deepCloseTo( actual, expected, 1e-7 ) );

		function getValue( d, i, j ) {
			if ( j === 1 ) {
				return d;
			}
			return d.n;
		}
	});

	it( 'should compute the Binomial distribution expected value using an accessor when `n` is a scalar', function test() {
		var expected,
			actual,
			n, p;

		n = 10;
		p = [
			{'p':0.2},
			{'p':0.4},
			{'p':0.5},
			{'p':0.8}
		];
		actual = new Array( p.length );
		actual = mean( actual, n, p, getValue );

		expected = p.map( function( e, i ) {
			return MEAN( n, e.p );
		});

		assert.isTrue( deepCloseTo( actual, expected, 1e-7 ) );

		function getValue( d, i, j ) {
			if ( j === 0 ) {
				return d;
			}
			return d.p;
		}
	});

	it( 'should compute the Binomial distribution expected value using an accessor for mixed arrays', function test() {
		var expected,
			actual,
			n, p;

		n = [
			{'n':10},
			{'n':20},
			{'n':30},
			{'n':40}
		];

		p = [ 0.2,0.4,0.5,0.8 ];

		actual = new Array( n.length );
		actual = mean( actual, n, p, getValue );

		expected = n.map( function( e, i ) {
			return MEAN( e.n, p[ i ] );
		});

		assert.isTrue( deepCloseTo( actual, expected, 1e-7 ) );

		function getValue( d, i, j ) {
			if ( j === 0 ) {
				return d.n;
			}
			return d;
		}
	});

	it( 'should compute the Binomial distribution expected value for two object arrays using an accessor', function test() {
		var expected,
			actual,
			n, p;

		n = [
			{'n':10},
			{'n':20},
			{'n':30},
			{'n':40}
		];

		p = [
			{'p':0.2},
			{'p':0.4},
			{'p':0.5},
			{'p':0.8}
		];

		actual = new Array( n.length );
		actual = mean( actual, n, p, getValue );

		expected = n.map( function( e, i ) {
			return MEAN( e.n, p[ i ].p );
		});

		assert.isTrue( deepCloseTo( actual, expected, 1e-7 ) );

		function getValue( d, i, j ) {
			if ( j === 0 ) {
				return d.n;
			} else {
				return d.p;
			}
		}

	});

	it( 'should return empty array if provided an empty array', function test() {
		assert.deepEqual( mean( [], [], 1, getValue ), [] );
		function getValue( d ) {
			return d.n;
		}
	});

	it( 'should handle non-numeric values by setting the element to NaN', function test() {
		var expected,
			actual,
			n, p;

		// Array-scalar:
		n = [
			{'n':10},
			{'n':null},
			{'n':30},
			{'n':40}
		];
		p = [ 0.2,0.4,0.5,0.8 ];
		actual = new Array( n.length );
		actual = mean( actual, n, p, getValue1 );

		expected = [
			2,
			NaN,
			15,
			32
		];
		assert.isTrue( deepCloseTo( actual, expected, 1e-7 ) );

		// Array-array:
		p = [ 0.2,0.4,0.5,0.8 ];

		actual = new Array( n.length );
		actual = mean( actual, n, p, getValue1 );

		expected = [
			MEAN( n[ 0 ].n, p[ 0 ] ),
			NaN,
			MEAN( n[ 2 ].n, p[ 2 ] ),
			MEAN( n[ 3 ].n, p[ 3 ] )
		];

		assert.isTrue( deepCloseTo( actual, expected, 1e-7 ) );

		// Array-typed array:
		p = new Float64Array( [ 0.2,0.4,0.5,0.8 ] );

		actual = new Array( n.length );
		actual = mean( actual, n, p, getValue1 );

		expected = [
			2,
			NaN,
			15,
			32
		];

		assert.isTrue( deepCloseTo( actual, expected, 1e-7 ) );

		// Object arrays:
		p = [
			{'p':0.2},
			{'p':0.4},
			{'p':0.5},
			{'p':0.8}
		];
		actual = new Array( n.length );
		actual = mean( actual, n, p, getValue2 );

		expected = [
			2,
			NaN,
			15,
			32
		];

		assert.isTrue( deepCloseTo( actual, expected, 1e-7 ) );

		function getValue1( d, i, j ) {
			if ( j === 1 ) {
				return d;
			}
			return d.n;
		}
		function getValue2( d, i, j ) {
			if ( j === 0 ) {
				return d.n;
			} else {
				return d.p;
			}
		}
	});

});
