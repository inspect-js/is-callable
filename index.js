'use strict';

var fnToStr = Function.prototype.toString;

module.exports = function isCallable(value) {
	try {
		fnToStr.call(value);
		return true;
	} catch (e) {
		return false;
	}
};
