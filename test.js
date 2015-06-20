'use strict';

var test = require('tape');
var isCallable = require('./');
var hasSymbols = typeof Symbol === 'function' && typeof Symbol() === 'symbol';
var genFn = require('make-generator-function');
var arrowFn = require('make-arrow-function')();

test('not callables', function (t) {
	t.test('non-number/string primitives', function (st) {
		st.notOk(isCallable(), 'undefined is not callable');
		st.notOk(isCallable(null), 'null is not callable');
		st.notOk(isCallable(false), 'false is not callable');
		st.notOk(isCallable(true), 'true is not callable');
		st.end();
	});

	t.notOk(isCallable([]), 'array is not callable');
	t.notOk(isCallable({}), 'object is not callable');
	t.notOk(isCallable(/a/g), 'regex literal is not callable');
	t.notOk(isCallable(new RegExp('a', 'g')), 'regex object is not callable');
	t.notOk(isCallable(new Date()), 'new Date() is not callable');

	t.test('numbers', function (st) {
		st.notOk(isCallable(42), 'number is not callable');
		st.notOk(isCallable(Object(42)), 'number object is not callable');
		st.notOk(isCallable(NaN), 'NaN is not callable');
		st.notOk(isCallable(Infinity), 'Infinity is not callable');
		st.end();
	});

	t.test('strings', function (st) {
		st.notOk(isCallable('foo'), 'string primitive is not callable');
		st.notOk(isCallable(Object('foo')), 'string object is not callable');
		st.end();
	});

	t.end();
});

test('@@toStringTag', { skip: !hasSymbols || !Symbol.toStringTag }, function (t) {
	var fn = function () { return 3; };
	var fakeFunction = { valueOf: function () { return fn; }, toString: function () { return String(fn); } };
	fakeFunction[Symbol.toStringTag] = 'Function';
	t.notOk(isCallable(fakeFunction), 'fake Function with @@toStringTag "Function" is not callable');
	t.end();
});

test('Functions', function (t) {
	t.ok(isCallable(function () {}), 'function is callable');
	t.ok(isCallable(isCallable), 'isCallable is callable');
	t.end();
});

test('Generators', { skip: !genFn }, function (t) {
	t.ok(isCallable(genFn), 'generator function is callable');
	t.end();
});

test('Arrow functions', { skip: !arrowFn }, function (t) {
	t.ok(isCallable(arrowFn), 'arrow function is callable');
	t.end();
});
