/* global require, describe, it */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Matrix data structure:
	matrix = require( 'dstructs-matrix' ),

	// Validate a value is NaN:
	isnan = require( 'validate.io-nan' ),

	// Deep close to:
	deepCloseTo = require( './utils/deepcloseto.js' ),

	// Module to be tested:
	mean = require( './../lib' ),

	// Function to apply element-wise:
	MEAN = require( './../lib/number-number.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'compute-mean', function tests() {

	it( 'should export a function', function test() {
		expect( mean ).to.be.a( 'function' );
	});

	it( 'should throw an error if provided only one argument', function test() {

		expect( badValue ).to.throw( Error );

		function badValue() {
				mean( [1,2,3] );
		}
	});

	it( 'should throw an error if provided an invalid option', function test() {
		var values = [
			'5',
			5,
			true,
			undefined,
			null,
			NaN,
			[],
			{}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				mean( [1,2,3], 2, {
					'accessor': value
				});
			};
		}
	});

	it( 'should throw an error if provided an array and an unrecognized/unsupported data type option', function test() {
		var values = [
			'beep',
			'boop'
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( Error );
		}
		function badValue( value ) {
			return function() {
				mean( [1,2,3], 1,  {
					'dtype': value
				});
			};
		}
	});

	it( 'should throw an error if provided a typed-array and an unrecognized/unsupported data type option', function test() {
		var values = [
			'beep',
			'boop'
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( Error );
		}
		function badValue( value ) {
			return function() {
				mean( new Int8Array([1,2,3]), 1,  {
					'dtype': value
				});
			};
		}
	});

	it( 'should throw an error if provided a matrix and an unrecognized/unsupported data type option', function test() {
		var values = [
			'beep',
			'boop'
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( Error );
		}
		function badValue( value ) {
			return function() {
				mean( matrix( [2,2] ), 1,  {
					'dtype': value
				});
			};
		}
	});

	it( 'should return NaN if the first argument is neither a number, array-like, or matrix-like', function test() {
		var values = [
			// '5', // valid as is array-like (length)
			true,
			undefined,
			null,
			// NaN, // allowed
			function(){},
			{}
		];

		for ( var i = 0; i < values.length; i++ ) {
			assert.isTrue( isnan( mean( values[ i ], 1 ) ) );
		}
	});

	it( 'should return NaN if the first argument is a number and the second argument is neither numberic, array-like, or matrix-like', function test() {
		var values = [
			// '5', // valid as is array-like (length)
			true,
			undefined,
			null,
			NaN,
			function(){},
			{}
		];

		for ( var i = 0; i < values.length; i++ ) {
			assert.isTrue( isnan( mean( 10, values[ i ] ) ) );
		}
	});

	it( 'should throw an error for an invalid pairing of input arguments', function test() {
		var values = [
			new Int32Array( [10, 20, 30, 40] ),
			[ 10, 20, 30, 40 ]
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( Error );
		}
		function badValue( value ) {
			return function() {
				mean( value, matrix( [ 0.2, 0.4, 0.5, 0.8 ], [2,2] ) );
			};
		}
	});

	it( 'should return an array of `NaN`s for an input array and a non-valid input', function test() {
		var values = [
			// '5', // valid as is array-like (length)
			true,
			undefined,
			null,
			NaN,
			function(){},
			{}
		];

		for ( var i = 0; i < values.length; i++ ) {
			var nans = mean( [ 10, 20, 30, 40 ], values[ i ] );
			for ( var j = 0; j < nans.length; j++ ) {
				assert.isTrue( isnan( nans[ j ] ) );
			}
		}
	});

	it( 'should return a matrix of `NaN`s for an input matrix and a non-valid input', function test() {
		var values = [
			// '5', // valid as is array-like (length)
			true,
			undefined,
			null,
			NaN,
			function(){},
			{}
		];

		for ( var i = 0; i < values.length; i++ ) {
			var nans = mean( matrix([ 10,20,30,40 ], [2,2] ), null );
			for ( var j = 0; j < nans.length; j++ ) {
				assert.isTrue( isnan( nans[ j ] ) );
			}
		}
	});

	it( 'should evaluate the  mean function for two numbers', function test() {
		assert.closeTo( mean(  10,  0.2 ),  2, 1e-7 );
		assert.closeTo( mean(  20,  0.4 ),  8, 1e-7 );
		assert.closeTo( mean(  30,  0.5 ),  15, 1e-7 );
		assert.closeTo( mean(  40,  0.8 ),  32, 1e-7 );
	});

	it( 'should evaluate the  mean function for a scalar and an array', function test() {
		var n, p, actual, expected;
		n = 10;
		p = [ 0.2, 0.4, 0.5, 0.8 ];
		actual = mean( n, p  );
		expected = [
			MEAN( n, p[ 0 ]),
			MEAN( n, p[ 1 ]),
			MEAN( n, p[ 2 ]),
			MEAN( n, p[ 3 ])
		];
		assert.isTrue( deepCloseTo( actual, expected, 1e-7 ) );
	});

	it( 'should evaluate the  mean function for a scalar and a matrix', function test() {
		var n, p, actual, expected, i;

		n = 10;
		p = matrix( new Float64Array( [ 0.2, 0.4, 0.5, 0.8 ] ), [2,2] );
		actual = mean( n, p );
		expected = matrix( new Float64Array([
			MEAN( n, p.data[ 0 ]),
			MEAN( n, p.data[ 1 ]),
			MEAN( n, p.data[ 2 ]),
			MEAN( n, p.data[ 3 ])
		]), [2,2] );

		for ( i = 0; i < actual.length; i++ ) {
			assert.closeTo( actual.data[ i ], expected.data[ i ], 1e-7 );
		}

	});

	it( 'should evaluate the mean function for a scalar and an array and cast result to a different dtype', function test() {
		var n, p, actual, expected;
		n = 10;
		p = [ 0.2, 0.4, 0.5, 0.8 ];
		actual = mean( n, p, {
			'dtype':'int32'
		});
		expected = new Int32Array( [
			MEAN( n, p[ 0 ]),
			MEAN( n, p[ 1 ]),
			MEAN( n, p[ 2 ]),
			MEAN( n, p[ 3 ])
		]);
		assert.isTrue( deepCloseTo( actual, expected, 1e-7 ) );
	});


	it( 'should evaluate the mean function for a scalar and a matrix and cast to a different dtype', function test() {
		var n, p, actual, expected;
		n = 10;
		p = matrix( new Float64Array( [ 0.2, 0.4, 0.5, 0.8 ] ), [2,2] );
		actual = mean( n, p, {
			'dtype': 'int32'
		});
		expected = matrix( new Int32Array([
			MEAN( n, p.data[ 0 ]),
			MEAN( n, p.data[ 1 ]),
			MEAN( n, p.data[ 2 ]),
			MEAN( n, p.data[ 3 ]) ]), [2,2] );

		assert.strictEqual( actual.dtype, 'int32' );

		assert.isTrue( deepCloseTo( actual.data, expected.data, 1e-7 ) );
	});

	it( 'should evaluate the mean function for two object arrays using an accessor', function test() {
		var actual, expected, n, p;

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

		actual = mean( n, p, {
			'accessor': getValue
		});

		expected = [
			2, 8, 15, 32
		];

		assert.isTrue( deepCloseTo( actual, expected, 1e-7 ) );

		function getValue( d, i, j ) {
			if ( j === 0 ) {
				return d.n;
			} else {
				return d.p;
			}
		}

	});

	it( 'should return an empty data structure if provided an empty data structure', function test() {
		assert.deepEqual( mean( [], 1 ), [] );
		assert.deepEqual( mean( matrix( [0,0] ), 1 ).data, matrix( [0,0] ).data );
		assert.deepEqual( mean( new Int8Array(), 1 ), new Float64Array() );
	});


});
