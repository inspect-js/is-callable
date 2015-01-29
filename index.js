'use strict';

var fnToStr = Function.prototype.toString;

module.exports = function isCallable(value) {
	if (typeof value !== 'function') { return false; }
	try {
		fnToStr.call(value);
		return true;
	} catch (e) {
		return false;
	}
};
