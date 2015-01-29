'use strict';

var fnToStr = Function.prototype.toString;
var tryFunctionObject = function tryFunctionObject(value) {
	try {
		fnToStr.call(value);
		return true;
	} catch (e) {
		return false;
	}
};

module.exports = function isCallable(value) {
	if (typeof value !== 'function') { return false; }
	return tryFunctionObject(value);
};
