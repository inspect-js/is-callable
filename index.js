'use strict';

var reflectApply = typeof Reflect === 'object' && Reflect !== null && Reflect.apply;
var badArrayLike;
var isCallableMarker;
if (typeof reflectApply === 'function' && typeof Object.defineProperty === 'function') {
	try {
		badArrayLike = Object.defineProperty({}, 'length', {
			get: function () {
				throw isCallableMarker;
			}
		});
		isCallableMarker = {};
		// eslint-disable-next-line no-throw-literal
		reflectApply(function () { throw 42; }, null, badArrayLike);
	} catch (_) {
		if (_ !== isCallableMarker) {
			reflectApply = null;
		}
	}
} else {
	reflectApply = null;
}

var constructorRegex = /^\s*class\b/;
var fnToStr = Function.prototype.toString;
var objToStr = Object.prototype.toString;
var fnClassStr = '[object Function]';
var genClassStr = '[object GeneratorFunction]';
var hasToStringTag = typeof Symbol === 'function' && typeof Symbol.toStringTag === 'symbol';

var getFnStr = function tryFnStr(value) {
	try {
		return fnToStr.call(value);
	} catch (e) {
		return null;
	}
};

/* globals document: false */
var documentDotAll = typeof document === 'object' && typeof document.all === 'undefined' && document.all !== undefined ? document.all : {};

module.exports = function isCallable(value) {
	if (value === documentDotAll) { return true; }
	if (!value) { return false; }

	if (typeof value === 'function') {
		if (!value.prototype) { return true; }
	} else if (typeof value !== 'object') { return false; }

	var tmp = getFnStr(value);
	if (tmp === null) {
		if (hasToStringTag) { return false; }
	} else {
		if (constructorRegex.test(tmp)) { return false; }
		if (hasToStringTag) { return true; }
	}

	tmp = objToStr.call(value);
	return tmp === fnClassStr || tmp === genClassStr;
};
