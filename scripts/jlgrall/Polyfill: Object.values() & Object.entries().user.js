// ==UserScript==
// @name            Polyfill: Object.values() & Object.entries()
// @namespace       jlgrall_UserScripts
// @description     Polyfill for older browsers that don't support Object.values() and Object.entries()
// @homepage        https://greasyfork.org/en/scripts/374442-polyfill-object-values-object-entries
// @supportURL      https://greasyfork.org/en/scripts/374442-polyfill-object-values-object-entries/feedback
// @license         MIT License
// @version         1.0
// @run-at          document-start
// @grant           none
// ==/UserScript==


// Source: https://github.com/tc39/proposal-object-values-entries/blob/master/polyfill.js
// Date: Oct 6, 2015

const reduce = Function.bind.call(Function.call, Array.prototype.reduce);
const isEnumerable = Function.bind.call(Function.call, Object.prototype.propertyIsEnumerable);
const concat = Function.bind.call(Function.call, Array.prototype.concat);
const keys = Reflect.ownKeys;

if (!Object.values) {
	Object.values = function values(O) {
		return reduce(keys(O), (v, k) => concat(v, typeof k === 'string' && isEnumerable(O, k) ? [O[k]] : []), []);
	};
}

if (!Object.entries) {
	Object.entries = function entries(O) {
		return reduce(keys(O), (e, k) => concat(e, typeof k === 'string' && isEnumerable(O, k) ? [[k, O[k]]] : []), []);
	};
}