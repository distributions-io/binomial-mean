Mean
===
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][codecov-image]][codecov-url] [![Dependencies][dependencies-image]][dependencies-url]

> [Binomial](https://en.wikipedia.org/wiki/Binomial_distribution) distribution [expected value](https://en.wikipedia.org/wiki/Expected_value).

The [expected value](https://en.wikipedia.org/wiki/Expected_value) for a [Binomial](https://en.wikipedia.org/wiki/Binomial_distribution) random variable is

<div class="equation" align="center" data-raw-text="\mathbb{E}\left[ X \right] = n p" data-equation="eq:expectation">
	<img src="https://cdn.rawgit.com/distributions-io/binomial-mean/09ff27007a4631a833425d5ab6f0c6d6f89b2bf5/docs/img/eqn.svg" alt="Expected value for a Binomial distribution.">
	<br>
</div>

where `n` is the number of trials and `p` is the success probability.

## Installation

``` bash
$ npm install distributions-binomial-mean
```

For use in the browser, use [browserify](https://github.com/substack/node-browserify).


## Usage

``` javascript
var mean = require( 'distributions-binomial-mean' );
```

#### mean( n, p[, options] )

Computes the [expected value](https://en.wikipedia.org/wiki/Expected_value) for a [Binomial](https://en.wikipedia.org/wiki/Binomial_distribution) distribution with parameters `n` and `p`.
(element-wise). `n` may be either a [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number), an [`array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array), a [`typed array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays), or a [`matrix`](https://github.com/dstructs/matrix).  `p` has to be either an `array` or `matrix` of equal dimensions as `n` or a single number. Correspondingly, the function returns either an `array` with the same length as the input `array(s)`, a `matrix` with the same dimensions as the input `matrix/matrices` or a single number.

``` javascript
var matrix = require( 'dstructs-matrix' ),
	n,
	mat,
	out,
	i;

out = mean( 10, 0.2 );
// returns  2

n = [ 10, 20, 30, 40 ];
p = [ 0.2, 0.4, 0.5, 0.8 ]
out = mean( n, p );
// returns [ 2, 8, 15, 32 ]

n = new Int8Array( n );
out = mean( n, p );
// returns Float64Array( [2,8,15,32] )

n =  matrix( [ 10, 20, 30, 40 ], [2,2] );
p =  matrix( [ 0.2, 0.4, 0.5, 0.8 ], [2,2] );
/*
	[ 2, 8,
	  15, 32 ]
*/

n = new Float64Array( 6 );
for ( i = 0; i < 6; i++ ) {
	n[ i ] = i * 5 + 5;
}
mat = matrix( n, [3,2], 'float64' );
/*
	[ 5   10
	  15  20
	  25  30 ]
*/

out = mean( mat, 0.2 );
/*
	[ 1 2
      3 4
	  5 6 ]
*/
```

The function accepts the following `options`:

*	 __accessor__: accessor `function` for accessing `array` values.
*	 __dtype__: output [`typed array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays) or [`matrix`](https://github.com/dstructs/matrix) data type. Default: `float64`.

For non-numeric `arrays`, provide an accessor `function` for accessing `array` values.

``` javascript
var n = [
	['beep', 10],
	['boop', 20],
	['bip', 30],
	['bap', 40]
];

function getValue( d, i ) {
	return d[ 1 ];
}

var out = mean( n, 0.2, {
	'accessor': getValue
});
// returns [ 2, 4, 6, 8 ]
```

When computing the [expected value](https://en.wikipedia.org/wiki/Expected_value) for parameter values of two object `arrays`, provide an accessor `function` which accepts `3` arguments.

``` javascript
var n = [
	['beep', 10],
	['boop', 20],
	['bip',  30],
	['bap', 40],
];

var p = [
	{'y': 0.2},
	{'y': 0.4},
	{'y': 0.5},
	{'y': 0.8}
];

function getValue( d, i, j ) {
	if ( j === 0 ) {
		return d[ 1 ];
	}
	return d.y;
}

var out = mean( n, p, {
	'accessor': getValue
});
// returns [ 2, 8, 15, 32 ]
```

__Note__: `j` corresponds to the input `array` index, where `j=0` is the index for the first input `array` and `j=1` is the index for the second input `array`.

## Notes

*	If an element is __not__ a numeric value, the evaluated [expected value](https://en.wikipedia.org/wiki/Expected_value) is `NaN`.

	``` javascript
	var n, out;

	out = mean( null, 1 );
	// returns NaN

	out = mean( true, 1 );
	// returns NaN

	out = mean( {'a':'b'}, 1 );
	// returns NaN

	out = mean( [ true, null, [] ], 1 );
	// returns [ NaN, NaN, NaN ]

	function getValue( d, i ) {
		return d.x;
	}
	n = [
		{'x':true},
		{'x':[]},
		{'x':{}},
		{'x':null}
	];

	out = mean( n, 1, {
		'accessor': getValue
	});
	// returns [ NaN, NaN, NaN, NaN ]
	```

*	Be careful when providing a data structure which contains non-numeric elements and specifying an `integer` output data type, as `NaN` values are cast to `0`.

	``` javascript
	var out = mean( [ true, null, [] ], 1, {
		'dtype': 'int8'
	});
	// returns Int8Array( [0,0,0] );
	```

## Examples

``` javascript
var matrix = require( 'dstructs-matrix' ),
	 mean = require( 'compute-mean' );

var n,
	mat,
	out,
	tmp,
	i;

// ----
// Plain arrays...
n = new Array( 10 );
for ( i = 0; i < n.length; i++ ) {
	n[ i ] = Math.random();
}
out = mean( n, 0.5 );

// Object arrays (accessors)...
function getValue( d ) {
	return d.x;
}
for ( i = 0; i < n.length; i++ ) {
	n[ i ] = {
		'x': n[ i ]
	};
}
out = mean( n, 0.5, {
	'accessor': getValue
});

// Typed arrays...
n = new Float32Array( 10 );
for ( i = 0; i < n.length; i++ ) {
	n[ i ] = Math.random();
}
tmp = mean( n, 0.5 );
out = '';
for ( i = 0; i < n.length; i++ ) {
	out += tmp[ i ];
	if ( i < n.length-1 ) {
		out += ',';
	}
}

// Matrices...
mat = matrix( n, [5,2], 'float32' );
out = mean( mat, 0.5 );

// Matrices (custom output data type)...
out = mean( mat, 0.5, {
	'dtype': 'uint8'
});
```

To run the example code from the top-level application directory,

``` bash
$ node ./examples/index.js
```


## Tests

### Unit

Unit tests use the [Mocha](http://mochajs.org/) test framework with [Chai](http://chaijs.com) assertions. To run the tests, execute the following command in the top-level application directory:

``` bash
$ make test
```

All new feature development should have corresponding unit tests to validate correct functionality.


### Test Coverage

This repository uses [Istanbul](https://github.com/gotwarlost/istanbul) as its code coverage tool. To generate a test coverage report, execute the following command in the top-level application directory:

``` bash
$ make test-cov
```

Istanbul creates a `./reports/coverage` directory. To access an HTML version of the report,

``` bash
$ make view-cov
```


---
## License

[MIT license](http://opensource.org/licenses/MIT).


## Copyright

Copyright &copy; 2015. The [Compute.io](https://github.com/compute-io) Authors.


[npm-image]: http://img.shields.io/npm/v/distributions-binomial-mean.svg
[npm-url]: https://npmjs.org/package/distributions-binomial-mean

[travis-image]: http://img.shields.io/travis/distributions-io/binomial-mean/master.svg
[travis-url]: https://travis-ci.org/distributions-io/binomial-mean

[codecov-image]: https://img.shields.io/codecov/c/github/distributions-io/binomial-mean/master.svg
[codecov-url]: https://codecov.io/github/distributions-io/binomial-mean?branch=master

[dependencies-image]: http://img.shields.io/david/distributions-io/binomial-mean.svg
[dependencies-url]: https://david-dm.org/distributions-io/binomial-mean

[dev-dependencies-image]: http://img.shields.io/david/dev/distributions-io/binomial-mean.svg
[dev-dependencies-url]: https://david-dm.org/dev/distributions-io/binomial-mean

[github-issues-image]: http://img.shields.io/github/issues/distributions-io/binomial-mean.svg
[github-issues-url]: https://github.com/distributions-io/binomial-mean/issues
