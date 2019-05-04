// ==UserScript==
// @name        Sbx Dashboard
// @namespace   SBES
// @version     0.3
// @description Adds a Dashboard to the Swagbucks Account page
// @match       http://www.swagbucks.com/account/summary
// @run-at      document-start
// @require	http://cdn.jsdelivr.net/raphael/2.1.2/raphael-min.js
// @grant       none
// @copyright   2014 eskodhi
// ==/UserScript==


/*
 Sbx Dashboard - a userscript to make Swagbucks' ledger more user friendly
 Copyright (C) 2014 - eskodhi (eskodhi[at]gmail.com)

 This program is free software: you can redistribute it and/or modify
 it under the terms of the GNU General Public License as published by
 the Free Software Foundation, either version 3 of the License, or
 (at your option) any later version.

 This program is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU General Public License for more details.

 You should have received a copy of the GNU General Public License
 along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

//	(Had to include this minified for the speed benefit, this code needs it)
//     Underscore.js 1.7.0
//     http://underscorejs.org
//     (c) 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
//     Underscore may be freely distributed under the MIT license.
(function(){var n=this,t=n._,r=Array.prototype,e=Object.prototype,u=Function.prototype,i=r.push,a=r.slice,o=r.concat,l=e.toString,c=e.hasOwnProperty,f=Array.isArray,s=Object.keys,p=u.bind,h=function(n){return n instanceof h?n:this instanceof h?void(this._wrapped=n):new h(n)};"undefined"!=typeof exports?("undefined"!=typeof module&&module.exports&&(exports=module.exports=h),exports._=h):n._=h,h.VERSION="1.7.0";var g=function(n,t,r){if(t===void 0)return n;switch(null==r?3:r){case 1:return function(r){return n.call(t,r)};case 2:return function(r,e){return n.call(t,r,e)};case 3:return function(r,e,u){return n.call(t,r,e,u)};case 4:return function(r,e,u,i){return n.call(t,r,e,u,i)}}return function(){return n.apply(t,arguments)}};h.iteratee=function(n,t,r){return null==n?h.identity:h.isFunction(n)?g(n,t,r):h.isObject(n)?h.matches(n):h.property(n)},h.each=h.forEach=function(n,t,r){if(null==n)return n;t=g(t,r);var e,u=n.length;if(u===+u)for(e=0;u>e;e++)t(n[e],e,n);else{var i=h.keys(n);for(e=0,u=i.length;u>e;e++)t(n[i[e]],i[e],n)}return n},h.map=h.collect=function(n,t,r){if(null==n)return[];t=h.iteratee(t,r);for(var e,u=n.length!==+n.length&&h.keys(n),i=(u||n).length,a=Array(i),o=0;i>o;o++)e=u?u[o]:o,a[o]=t(n[e],e,n);return a};var v="Reduce of empty array with no initial value";h.reduce=h.foldl=h.inject=function(n,t,r,e){null==n&&(n=[]),t=g(t,e,4);var u,i=n.length!==+n.length&&h.keys(n),a=(i||n).length,o=0;if(arguments.length<3){if(!a)throw new TypeError(v);r=n[i?i[o++]:o++]}for(;a>o;o++)u=i?i[o]:o,r=t(r,n[u],u,n);return r},h.reduceRight=h.foldr=function(n,t,r,e){null==n&&(n=[]),t=g(t,e,4);var u,i=n.length!==+n.length&&h.keys(n),a=(i||n).length;if(arguments.length<3){if(!a)throw new TypeError(v);r=n[i?i[--a]:--a]}for(;a--;)u=i?i[a]:a,r=t(r,n[u],u,n);return r},h.find=h.detect=function(n,t,r){var e;return t=h.iteratee(t,r),h.some(n,function(n,r,u){return t(n,r,u)?(e=n,!0):void 0}),e},h.filter=h.select=function(n,t,r){var e=[];return null==n?e:(t=h.iteratee(t,r),h.each(n,function(n,r,u){t(n,r,u)&&e.push(n)}),e)},h.reject=function(n,t,r){return h.filter(n,h.negate(h.iteratee(t)),r)},h.every=h.all=function(n,t,r){if(null==n)return!0;t=h.iteratee(t,r);var e,u,i=n.length!==+n.length&&h.keys(n),a=(i||n).length;for(e=0;a>e;e++)if(u=i?i[e]:e,!t(n[u],u,n))return!1;return!0},h.some=h.any=function(n,t,r){if(null==n)return!1;t=h.iteratee(t,r);var e,u,i=n.length!==+n.length&&h.keys(n),a=(i||n).length;for(e=0;a>e;e++)if(u=i?i[e]:e,t(n[u],u,n))return!0;return!1},h.contains=h.include=function(n,t){return null==n?!1:(n.length!==+n.length&&(n=h.values(n)),h.indexOf(n,t)>=0)},h.invoke=function(n,t){var r=a.call(arguments,2),e=h.isFunction(t);return h.map(n,function(n){return(e?t:n[t]).apply(n,r)})},h.pluck=function(n,t){return h.map(n,h.property(t))},h.where=function(n,t){return h.filter(n,h.matches(t))},h.findWhere=function(n,t){return h.find(n,h.matches(t))},h.max=function(n,t,r){var e,u,i=-1/0,a=-1/0;if(null==t&&null!=n){n=n.length===+n.length?n:h.values(n);for(var o=0,l=n.length;l>o;o++)e=n[o],e>i&&(i=e)}else t=h.iteratee(t,r),h.each(n,function(n,r,e){u=t(n,r,e),(u>a||u===-1/0&&i===-1/0)&&(i=n,a=u)});return i},h.min=function(n,t,r){var e,u,i=1/0,a=1/0;if(null==t&&null!=n){n=n.length===+n.length?n:h.values(n);for(var o=0,l=n.length;l>o;o++)e=n[o],i>e&&(i=e)}else t=h.iteratee(t,r),h.each(n,function(n,r,e){u=t(n,r,e),(a>u||1/0===u&&1/0===i)&&(i=n,a=u)});return i},h.shuffle=function(n){for(var t,r=n&&n.length===+n.length?n:h.values(n),e=r.length,u=Array(e),i=0;e>i;i++)t=h.random(0,i),t!==i&&(u[i]=u[t]),u[t]=r[i];return u},h.sample=function(n,t,r){return null==t||r?(n.length!==+n.length&&(n=h.values(n)),n[h.random(n.length-1)]):h.shuffle(n).slice(0,Math.max(0,t))},h.sortBy=function(n,t,r){return t=h.iteratee(t,r),h.pluck(h.map(n,function(n,r,e){return{value:n,index:r,criteria:t(n,r,e)}}).sort(function(n,t){var r=n.criteria,e=t.criteria;if(r!==e){if(r>e||r===void 0)return 1;if(e>r||e===void 0)return-1}return n.index-t.index}),"value")};var m=function(n){return function(t,r,e){var u={};return r=h.iteratee(r,e),h.each(t,function(e,i){var a=r(e,i,t);n(u,e,a)}),u}};h.groupBy=m(function(n,t,r){h.has(n,r)?n[r].push(t):n[r]=[t]}),h.indexBy=m(function(n,t,r){n[r]=t}),h.countBy=m(function(n,t,r){h.has(n,r)?n[r]++:n[r]=1}),h.sortedIndex=function(n,t,r,e){r=h.iteratee(r,e,1);for(var u=r(t),i=0,a=n.length;a>i;){var o=i+a>>>1;r(n[o])<u?i=o+1:a=o}return i},h.toArray=function(n){return n?h.isArray(n)?a.call(n):n.length===+n.length?h.map(n,h.identity):h.values(n):[]},h.size=function(n){return null==n?0:n.length===+n.length?n.length:h.keys(n).length},h.partition=function(n,t,r){t=h.iteratee(t,r);var e=[],u=[];return h.each(n,function(n,r,i){(t(n,r,i)?e:u).push(n)}),[e,u]},h.first=h.head=h.take=function(n,t,r){return null==n?void 0:null==t||r?n[0]:0>t?[]:a.call(n,0,t)},h.initial=function(n,t,r){return a.call(n,0,Math.max(0,n.length-(null==t||r?1:t)))},h.last=function(n,t,r){return null==n?void 0:null==t||r?n[n.length-1]:a.call(n,Math.max(n.length-t,0))},h.rest=h.tail=h.drop=function(n,t,r){return a.call(n,null==t||r?1:t)},h.compact=function(n){return h.filter(n,h.identity)};var y=function(n,t,r,e){if(t&&h.every(n,h.isArray))return o.apply(e,n);for(var u=0,a=n.length;a>u;u++){var l=n[u];h.isArray(l)||h.isArguments(l)?t?i.apply(e,l):y(l,t,r,e):r||e.push(l)}return e};h.flatten=function(n,t){return y(n,t,!1,[])},h.without=function(n){return h.difference(n,a.call(arguments,1))},h.uniq=h.unique=function(n,t,r,e){if(null==n)return[];h.isBoolean(t)||(e=r,r=t,t=!1),null!=r&&(r=h.iteratee(r,e));for(var u=[],i=[],a=0,o=n.length;o>a;a++){var l=n[a];if(t)a&&i===l||u.push(l),i=l;else if(r){var c=r(l,a,n);h.indexOf(i,c)<0&&(i.push(c),u.push(l))}else h.indexOf(u,l)<0&&u.push(l)}return u},h.union=function(){return h.uniq(y(arguments,!0,!0,[]))},h.intersection=function(n){if(null==n)return[];for(var t=[],r=arguments.length,e=0,u=n.length;u>e;e++){var i=n[e];if(!h.contains(t,i)){for(var a=1;r>a&&h.contains(arguments[a],i);a++);a===r&&t.push(i)}}return t},h.difference=function(n){var t=y(a.call(arguments,1),!0,!0,[]);return h.filter(n,function(n){return!h.contains(t,n)})},h.zip=function(n){if(null==n)return[];for(var t=h.max(arguments,"length").length,r=Array(t),e=0;t>e;e++)r[e]=h.pluck(arguments,e);return r},h.object=function(n,t){if(null==n)return{};for(var r={},e=0,u=n.length;u>e;e++)t?r[n[e]]=t[e]:r[n[e][0]]=n[e][1];return r},h.indexOf=function(n,t,r){if(null==n)return-1;var e=0,u=n.length;if(r){if("number"!=typeof r)return e=h.sortedIndex(n,t),n[e]===t?e:-1;e=0>r?Math.max(0,u+r):r}for(;u>e;e++)if(n[e]===t)return e;return-1},h.lastIndexOf=function(n,t,r){if(null==n)return-1;var e=n.length;for("number"==typeof r&&(e=0>r?e+r+1:Math.min(e,r+1));--e>=0;)if(n[e]===t)return e;return-1},h.range=function(n,t,r){arguments.length<=1&&(t=n||0,n=0),r=r||1;for(var e=Math.max(Math.ceil((t-n)/r),0),u=Array(e),i=0;e>i;i++,n+=r)u[i]=n;return u};var d=function(){};h.bind=function(n,t){var r,e;if(p&&n.bind===p)return p.apply(n,a.call(arguments,1));if(!h.isFunction(n))throw new TypeError("Bind must be called on a function");return r=a.call(arguments,2),e=function(){if(!(this instanceof e))return n.apply(t,r.concat(a.call(arguments)));d.prototype=n.prototype;var u=new d;d.prototype=null;var i=n.apply(u,r.concat(a.call(arguments)));return h.isObject(i)?i:u}},h.partial=function(n){var t=a.call(arguments,1);return function(){for(var r=0,e=t.slice(),u=0,i=e.length;i>u;u++)e[u]===h&&(e[u]=arguments[r++]);for(;r<arguments.length;)e.push(arguments[r++]);return n.apply(this,e)}},h.bindAll=function(n){var t,r,e=arguments.length;if(1>=e)throw new Error("bindAll must be passed function names");for(t=1;e>t;t++)r=arguments[t],n[r]=h.bind(n[r],n);return n},h.memoize=function(n,t){var r=function(e){var u=r.cache,i=t?t.apply(this,arguments):e;return h.has(u,i)||(u[i]=n.apply(this,arguments)),u[i]};return r.cache={},r},h.delay=function(n,t){var r=a.call(arguments,2);return setTimeout(function(){return n.apply(null,r)},t)},h.defer=function(n){return h.delay.apply(h,[n,1].concat(a.call(arguments,1)))},h.throttle=function(n,t,r){var e,u,i,a=null,o=0;r||(r={});var l=function(){o=r.leading===!1?0:h.now(),a=null,i=n.apply(e,u),a||(e=u=null)};return function(){var c=h.now();o||r.leading!==!1||(o=c);var f=t-(c-o);return e=this,u=arguments,0>=f||f>t?(clearTimeout(a),a=null,o=c,i=n.apply(e,u),a||(e=u=null)):a||r.trailing===!1||(a=setTimeout(l,f)),i}},h.debounce=function(n,t,r){var e,u,i,a,o,l=function(){var c=h.now()-a;t>c&&c>0?e=setTimeout(l,t-c):(e=null,r||(o=n.apply(i,u),e||(i=u=null)))};return function(){i=this,u=arguments,a=h.now();var c=r&&!e;return e||(e=setTimeout(l,t)),c&&(o=n.apply(i,u),i=u=null),o}},h.wrap=function(n,t){return h.partial(t,n)},h.negate=function(n){return function(){return!n.apply(this,arguments)}},h.compose=function(){var n=arguments,t=n.length-1;return function(){for(var r=t,e=n[t].apply(this,arguments);r--;)e=n[r].call(this,e);return e}},h.after=function(n,t){return function(){return--n<1?t.apply(this,arguments):void 0}},h.before=function(n,t){var r;return function(){return--n>0?r=t.apply(this,arguments):t=null,r}},h.once=h.partial(h.before,2),h.keys=function(n){if(!h.isObject(n))return[];if(s)return s(n);var t=[];for(var r in n)h.has(n,r)&&t.push(r);return t},h.values=function(n){for(var t=h.keys(n),r=t.length,e=Array(r),u=0;r>u;u++)e[u]=n[t[u]];return e},h.pairs=function(n){for(var t=h.keys(n),r=t.length,e=Array(r),u=0;r>u;u++)e[u]=[t[u],n[t[u]]];return e},h.invert=function(n){for(var t={},r=h.keys(n),e=0,u=r.length;u>e;e++)t[n[r[e]]]=r[e];return t},h.functions=h.methods=function(n){var t=[];for(var r in n)h.isFunction(n[r])&&t.push(r);return t.sort()},h.extend=function(n){if(!h.isObject(n))return n;for(var t,r,e=1,u=arguments.length;u>e;e++){t=arguments[e];for(r in t)c.call(t,r)&&(n[r]=t[r])}return n},h.pick=function(n,t,r){var e,u={};if(null==n)return u;if(h.isFunction(t)){t=g(t,r);for(e in n){var i=n[e];t(i,e,n)&&(u[e]=i)}}else{var l=o.apply([],a.call(arguments,1));n=new Object(n);for(var c=0,f=l.length;f>c;c++)e=l[c],e in n&&(u[e]=n[e])}return u},h.omit=function(n,t,r){if(h.isFunction(t))t=h.negate(t);else{var e=h.map(o.apply([],a.call(arguments,1)),String);t=function(n,t){return!h.contains(e,t)}}return h.pick(n,t,r)},h.defaults=function(n){if(!h.isObject(n))return n;for(var t=1,r=arguments.length;r>t;t++){var e=arguments[t];for(var u in e)n[u]===void 0&&(n[u]=e[u])}return n},h.clone=function(n){return h.isObject(n)?h.isArray(n)?n.slice():h.extend({},n):n},h.tap=function(n,t){return t(n),n};var b=function(n,t,r,e){if(n===t)return 0!==n||1/n===1/t;if(null==n||null==t)return n===t;n instanceof h&&(n=n._wrapped),t instanceof h&&(t=t._wrapped);var u=l.call(n);if(u!==l.call(t))return!1;switch(u){case"[object RegExp]":case"[object String]":return""+n==""+t;case"[object Number]":return+n!==+n?+t!==+t:0===+n?1/+n===1/t:+n===+t;case"[object Date]":case"[object Boolean]":return+n===+t}if("object"!=typeof n||"object"!=typeof t)return!1;for(var i=r.length;i--;)if(r[i]===n)return e[i]===t;var a=n.constructor,o=t.constructor;if(a!==o&&"constructor"in n&&"constructor"in t&&!(h.isFunction(a)&&a instanceof a&&h.isFunction(o)&&o instanceof o))return!1;r.push(n),e.push(t);var c,f;if("[object Array]"===u){if(c=n.length,f=c===t.length)for(;c--&&(f=b(n[c],t[c],r,e)););}else{var s,p=h.keys(n);if(c=p.length,f=h.keys(t).length===c)for(;c--&&(s=p[c],f=h.has(t,s)&&b(n[s],t[s],r,e)););}return r.pop(),e.pop(),f};h.isEqual=function(n,t){return b(n,t,[],[])},h.isEmpty=function(n){if(null==n)return!0;if(h.isArray(n)||h.isString(n)||h.isArguments(n))return 0===n.length;for(var t in n)if(h.has(n,t))return!1;return!0},h.isElement=function(n){return!(!n||1!==n.nodeType)},h.isArray=f||function(n){return"[object Array]"===l.call(n)},h.isObject=function(n){var t=typeof n;return"function"===t||"object"===t&&!!n},h.each(["Arguments","Function","String","Number","Date","RegExp"],function(n){h["is"+n]=function(t){return l.call(t)==="[object "+n+"]"}}),h.isArguments(arguments)||(h.isArguments=function(n){return h.has(n,"callee")}),"function"!=typeof/./&&(h.isFunction=function(n){return"function"==typeof n||!1}),h.isFinite=function(n){return isFinite(n)&&!isNaN(parseFloat(n))},h.isNaN=function(n){return h.isNumber(n)&&n!==+n},h.isBoolean=function(n){return n===!0||n===!1||"[object Boolean]"===l.call(n)},h.isNull=function(n){return null===n},h.isUndefined=function(n){return n===void 0},h.has=function(n,t){return null!=n&&c.call(n,t)},h.noConflict=function(){return n._=t,this},h.identity=function(n){return n},h.constant=function(n){return function(){return n}},h.noop=function(){},h.property=function(n){return function(t){return t[n]}},h.matches=function(n){var t=h.pairs(n),r=t.length;return function(n){if(null==n)return!r;n=new Object(n);for(var e=0;r>e;e++){var u=t[e],i=u[0];if(u[1]!==n[i]||!(i in n))return!1}return!0}},h.times=function(n,t,r){var e=Array(Math.max(0,n));t=g(t,r,1);for(var u=0;n>u;u++)e[u]=t(u);return e},h.random=function(n,t){return null==t&&(t=n,n=0),n+Math.floor(Math.random()*(t-n+1))},h.now=Date.now||function(){return(new Date).getTime()};var _={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","`":"&#x60;"},w=h.invert(_),j=function(n){var t=function(t){return n[t]},r="(?:"+h.keys(n).join("|")+")",e=RegExp(r),u=RegExp(r,"g");return function(n){return n=null==n?"":""+n,e.test(n)?n.replace(u,t):n}};h.escape=j(_),h.unescape=j(w),h.result=function(n,t){if(null==n)return void 0;var r=n[t];return h.isFunction(r)?n[t]():r};var x=0;h.uniqueId=function(n){var t=++x+"";return n?n+t:t},h.templateSettings={evaluate:/<%([\s\S]+?)%>/g,interpolate:/<%=([\s\S]+?)%>/g,escape:/<%-([\s\S]+?)%>/g};var A=/(.)^/,k={"'":"'","\\":"\\","\r":"r","\n":"n","\u2028":"u2028","\u2029":"u2029"},O=/\\|'|\r|\n|\u2028|\u2029/g,F=function(n){return"\\"+k[n]};h.template=function(n,t,r){!t&&r&&(t=r),t=h.defaults({},t,h.templateSettings);var e=RegExp([(t.escape||A).source,(t.interpolate||A).source,(t.evaluate||A).source].join("|")+"|$","g"),u=0,i="__p+='";n.replace(e,function(t,r,e,a,o){return i+=n.slice(u,o).replace(O,F),u=o+t.length,r?i+="'+\n((__t=("+r+"))==null?'':_.escape(__t))+\n'":e?i+="'+\n((__t=("+e+"))==null?'':__t)+\n'":a&&(i+="';\n"+a+"\n__p+='"),t}),i+="';\n",t.variable||(i="with(obj||{}){\n"+i+"}\n"),i="var __t,__p='',__j=Array.prototype.join,"+"print=function(){__p+=__j.call(arguments,'');};\n"+i+"return __p;\n";try{var a=new Function(t.variable||"obj","_",i)}catch(o){throw o.source=i,o}var l=function(n){return a.call(this,n,h)},c=t.variable||"obj";return l.source="function("+c+"){\n"+i+"}",l},h.chain=function(n){var t=h(n);return t._chain=!0,t};var E=function(n){return this._chain?h(n).chain():n};h.mixin=function(n){h.each(h.functions(n),function(t){var r=h[t]=n[t];h.prototype[t]=function(){var n=[this._wrapped];return i.apply(n,arguments),E.call(this,r.apply(h,n))}})},h.mixin(h),h.each(["pop","push","reverse","shift","sort","splice","unshift"],function(n){var t=r[n];h.prototype[n]=function(){var r=this._wrapped;return t.apply(r,arguments),"shift"!==n&&"splice"!==n||0!==r.length||delete r[0],E.call(this,r)}}),h.each(["concat","join","slice"],function(n){var t=r[n];h.prototype[n]=function(){return E.call(this,t.apply(this._wrapped,arguments))}}),h.prototype.value=function(){return this._wrapped},"function"==typeof define&&define.amd&&define("underscore",[],function(){return h})}).call(this);
//# sourceMappingURL=underscore-min.map
/*jslint node: true */

function require(condition, callback) {
    if (condition() !== true) {
        setTimeout(function() {
            require(condition, callback);
        }, 50);
    } else {
        callback();
    }
}

var watchXMLHttpRequest = true;

function suppress(someFunc, howLong, callback) {
    var times_called = 0;
    return function() {
        if (times_called != howLong) {
            console.log('a call to a suppressed function was made');

            callback(times_called, howLong, someFunc);
            times_called++;
            return;
        }
        return someFunc.apply(this, arguments);
    };
}


var open = window.XMLHttpRequest.prototype.open,
    send = window.XMLHttpRequest.prototype.send,
    onReadyStateChange;

function openReplacement(method, url, async, user, password) {
    var syncMode = async !== false ? 'async' : 'sync';
    console.warn(
        'Preparing ' +
        syncMode +
        ' HTTP request : ' +
        method +
        ' ' +
        url
    );
    return open.apply(this, arguments);
}

function sendReplacement(data) {
    console.warn('Sending HTTP request data : ', data);

    if(this.onreadystatechange) {
        this._onreadystatechange = this.onreadystatechange;
    }
    this.onreadystatechange = onReadyStateChangeReplacement;

    return send.apply(this, arguments);
}

function onReadyStateChangeReplacement() {
    console.warn('HTTP request ready state changed : ' + this.readyState);

    var concerned = false, self = this, fullArgs = arguments;
    if (this.responseURL.indexOf('cmd=sb-acct-ledger') != -1 && this.readyState == 4 && watchXMLHttpRequest === true) {
        concerned = true;
    }

    if(this._onreadystatechange) {
        return (concerned === false || watchXMLHttpRequest !== true ) ? this._onreadystatechange.apply(this, arguments) : (function() {
            var result = self._onreadystatechange.apply(self, fullArgs);
            var data = parseLdgrCmd(self.responseText);

            require(function() {
                return SBES.account.dashboard !== undefined;
            }, function() {
                SBES.account.dashboard.initialize(data);
                watchXMLHttpRequest = false;
            });
            return result;
        })();
    }
}

window.XMLHttpRequest.prototype.open = openReplacement;
window.XMLHttpRequest.prototype.send = sendReplacement;


function parseLdgrCmd(response) {
    var emptyData = [];
    if (response.substr(0, 2) == "1|") {
        var idxL = response.indexOf("@");
        var lifeSB = response.substr(2, idxL);
        var data = eval("(" + response.substr(idxL + 3) + ")");
        return data;
    }
    return emptyData;
}

require(function() {
    return window.jQuery !== undefined;
}, function() {
});


// Global namespace
var SBES = window.SBES = {
    account: {}
};


// App configuration
var valid_options = {
    hide_empty: [true, false],
    format: ['money', 'swagbucks'],
    sort: ['alpha', 'num'],
    order: ['asc', 'desc'],
    show_progress: [true, false]
},
    defaults = {
        hide_empty: true,
        format: 'swagbucks',
        sort: 'alpha',
        order: 'desc', // Doesn't work yet, sry
        show_controls: true,
        show_progress: true,
        theme: 'Minimal'
    },
    app_label = 'sbes_account',
    icons = { opened: '-', closed: '+', empty: ' ' },
    sb_settings = SBES.account.settings = new SBESStoredOptions(app_label+'_settings', defaults);

// APP IDENTIFIERS
var MOBILE_APP_IDS = [18],
    REFERRAL_IDS = [2],
    DAILY_IDS = [100],
    ENCRAVE_IDS = [22],
    SURVEY_IDS = [12],
    PURCHASES_IDS = [6],
    WATCHED_IDS = [16],
    OTHER_IDS = [];

// App Maximums (in SB)
// *CHANGE*
var APP_MAXES = {
    "EntertaiNow":  10,
    "SBTV Mobile":  10,
    "Sportly":      10,
    "MovieCli.ps":  10,
    "Indymusic":    10,
    "Lifestylz":    10
};


SbxDashboard.getInstance = function(forContainer) {
    if (typeof SbxDashboard.instance == 'undefined') {
        SbxDashboard.instance = new SbxDashboard(forContainer);
    }
    return SbxDashboard.instance;
};


// Some times the data takes a while to load, so let's just add the dash to the DOM
require(function() {
    return document.getElementById('tableContainerL') !== null;
}, function() {
    var ldgr = document.getElementById('tableView');
    var dashboard = SbxDashboard.getInstance($(ldgr).parent().get(0));
    SBES.account.dashboard = dashboard;
});

// Let's get this show on the road...
function SbxDashboard($ldgrCont, options) {
    this.options = $.extend({}, {
        auto_run: true,
        dashboard_id: 'dashboard',
        dashboard_tab_id: 'dashboardTab'
    }, options);

    this.data = {
        ALL_RECORDS: {},
        ALL_CATEGORIES: []
    };
    this.sections = [];

    this.$ldgrCont = $($ldgrCont);
    this.$navigation = $('nav#pageHeaderButtons');
    this.flags = {
        init: false,
        hooked: false,
        built: false,
        rendered: false
    };

    // build our container
    this.$dashboard = $('<section></section>')
        .css('display', 'none')
        .attr('id', this.options.dashboard_id)
        .html('<div id="dashboard-overlay" style="display: none"><div class="sbes-options-container"><div class="sbes-options-header"><h3>Account Dashboard Configuration</h3><div class="sbes-toolbar"><a href="#" id="sbes-close-options">Close</a></div></div><div class="sbes-options"><div class="radio"><span class="setting">Display unit:</span><label><input id="option-format-swagbucks" name="sbes_score_units" type="radio" value="swagbucks">Swagbucks</label><label><input id="option-format-money" name="sbes_score_units" type="radio" value="money">Dollars</label></div><div class="radio"><span class="setting">Sorting:</span><label><input id="option-sort-alpha" name="sbes_sort" type="radio" value="alpha">Offer name</label><label><input id="option-sort-num" name="sbes_sort" type="radio" value="num">Reward amount</label></div><div class="radio"><span class="setting">Sort Order:</span><label><input id="option-order-asc" name="sbes_order" type="radio" value="asc">Asc</label><label><input id="option-order-desc" name="sbes_order" type="radio" value="desc">Desc</label></div><div class="checkbox"><label><span class="setting">Hide empty sections</span></label><input id="option-hide-empty" name="sbes_hide_empty" type="checkbox"></div><div class="checkbox"><label><span class="setting">Show Mobile App Progress</span></label><input id="option-show-progress" name="sbes_show_progress" type="checkbox"></div><div class="dropdown"><label><span class="setting">Dashboard Theme</span></label><select class="form-control" name="sbes_theme"><option>Default</option><option>Minimal</option></select></div></div></div><div id="dashboard-overlay-bg"></div></div><div class="sbes-dashboard-header"><div class="sbes-toolbar"><a href="#" id="sbes-ui-expand-all">Expand All</a> | <a href="#" id="sbes-ui-collapse-all">Collapse All</a> | <a href="#" id="sbes-options-link">Options</a></div></div>');

    this.$tab = $('<button></button>')
        .attr('class', 'sbCta sbColor1')
        .attr('id', this.options.dashboard_tab_id)
        .text('Dashboard')
        .css({
        "border-radius": ".4rem 0 0 .4rem",
        float: 'left',
        padding: ".6rem 0",
        width: "11rem",
        border: ".1rem solid #69b8d6",
        "border-right": "0"
    });

    var self = this;
    Object.defineProperty(this, 'selected', {
        get: function() {
            return this.$tab.hasClass('active');
        },
        set: function(value) {
            if (value !== true && value !== false) return;
            if (value === true) {
                this.$tab.addClass('active');
            }
            if (value === false) {
                this.$tab.removeClass('active');
                makePageHeaderButtonUsual(this.$tab[0]);
            }
        }
    });

    this.build();
}

SbxDashboard.prototype.buildLayout = function() {
    if (this.flags.built === true) {
        return;
    }
    this.build();
    this.flags.built = true;
};

SbxDashboard.prototype.initialize = function(data) {
    if (this.flags.initialized === true) {
        return;
    }

    if (this.flags.built !== true) {
        this.build();
    }


    // load the previous tab first
    this.loadPreviousTab();

    this.render(data);

    this.hookData();

    this.flags.initialized = true;
};

SbxDashboard.prototype.loadPreviousTab = function() {
    // reselect the previously selected tab only on first render
    var prev_tab_id = localStorage.getItem(app_label + '_dashboard_selected_tab') || this.$navigation.find('.selected').attr('id');
    debug('Previously selected tab found was: ', prev_tab_id);
    $(document.getElementById(prev_tab_id)).click();
    return prev_tab_id;
}

/**
* Re-render the dashboard when the user has updated the data
*/
SbxDashboard.prototype.hookData = function() {
    var hooked = false,
        self = this;

    function arr_same(curArr, newArr) {
        if (!$.isArray(curArr) || !$.isArray(newArr)) {
            return false;
        }

        if (newArr.length != curArr.length ) {
            return false;
        }

        var results = newArr.filter(function(el, idx) {
            return curArr[idx] == el;
        });

        return newArr.length == results.length;
    }

    function hook(object, property, initial, runOnFirst) {
        runOnFirst = (runOnFirst === undefined) ? 1 : runOnFirst;
        if (hooked) return;

        var newProp ='_' + property;

        // set the new prop to initial value
        object[newProp] = object[property];

        try {
            Object.defineProperty(object, property, {
                get: function () {
                    return object[newProp];
                },
                set: function (value) {
                    var changed = !arr_same(object[newProp], value);


                    if (object[newProp] === initial && !runOnFirst) {
                        debug('"' + newProp + '" was set to', value, ' but runOnFirst was false');
                    }
                    if (object[newProp] === undefined && runOnFirst || (object[newProp] !== undefined)) {
                        console.log('calling render because "', property,'" was set');
                        console.log('Was changed:', changed);
                        debug('object property "' + property + '" was changed from:', object[newProp], ' to:', value);


                        console.log('Is dashboard tab selected:',self.selected);
                        self.render(value);
                        //                        } else {
                        //                            console.log('did not render because the dashboard tab was not selected');
                        //                        }
                    }
                    //} else {
                    //                                console.log('property has not changed');
                    //                            }
                    object[newProp] = value;

                }
            });
            hooked = true;
        }
        catch (e) {}
    }
    debug('Attempting to hook into window.myData...');
    hook(window, 'myData', window.myData, false);

    if (hooked) {
        debug("SUCCESS! Hooked into window.myData");
        return;
    }
    debug('FAILED! Could not hook into myData');

    // Hook into the lstPage object's data property
    debug('Attempting to hook into lstPage.data...');
    hook(window.lstPage, 'data', myData, true);

    if (!hooked) {
        throw new TypeError();
    } else {
        debug('SUCCESS! Hooked into lstPage.data');
    }
};


SbxDashboard.prototype.requestData = function(allHistory) {
    /*
    // request the initial data
    $.get("/?cmd=sb-acct-ledger&allTime=false&sid=" + Math.random(), function(response) {
        if (response.substr(0, 2) == "1|") {
            var idxL = response.indexOf("@");
            var lifeSB = response.substr(2, idxL);
            var myData = JSON.parse(response.substr(idxL + 3).replace(new RegExp("'", 'g'), '"'));
            var test = eval("(" + response.substr(idxL + 3) + ")");
            console.log('rendering after manually sending ajax');

        }
    });
  */  
};

/**
* Loads the given data into ALL_RECORDS
* @param someData
*/
SbxDashboard.prototype.loadData = function(someData) {
    var self = this;

    // merge the initial mobile data into this data
    var merged_data = this.getEmptyData().concat(someData);

    // Loop through all the records and build a usable array with the label, the value and the category id for each record
    var label, category, date, reward, record, dailies = [], rename;
    $.each(merged_data, function (id, data) {

        // 12 - Surveys
        // 15 - Bonus Offers
        // 18 - Mobile Apps
        // 22 - Encrave
        // 100* - Dailies
        rename = true;
        category = data[0];
        date = data[1];
        reward = data[3];
        label = (data[5] || window.myNotes[data[0]]);


        // if this is a encrave, let's see if is a daily for the day
        if (label.indexOf("Daily Crave") != -1 || label.indexOf("NOSO") != -1 || label.indexOf("Daily Poll") != -1 || label.indexOf("Toolbar") != -1) {
            if (data[0] == 22 && dailies.indexOf(data[1]) == -1 && data[3] === 1) {
                dailies.push(date);
                category = 100;
                label = "Daily Crave";
                rename = false;
            }
            if (data[0] == 15) {
                category = 100;
                rename = false;
            }
        }

        if (rename) {
            // now format the label
            label = fn_format_label(label, category);
        }

        // Finally, build the record
        record = {category: category, date: date, points: data[3], note: data[5]};

        if (self.data.ALL_RECORDS === undefined) {
            self.data.ALL_RECORDS = {};
        }

        if (self.data.ALL_RECORDS[label] === undefined) {
            self.data.ALL_RECORDS[label] = record;
            self.data.ALL_RECORDS[label].date = [record.date];
        } else {
            self.data.ALL_RECORDS[label].points = self.data.ALL_RECORDS[label].points + data[3];
            self.data.ALL_RECORDS[label].date.push(date);
        }

        if (self.data.ALL_CATEGORIES.indexOf(category) == -1) {
            self.data.ALL_CATEGORIES.push(category);
        }
    });

    // Build the list of categories referred to as Others
    OTHER_IDS = $.grep(self.data.ALL_CATEGORIES, function(app) {
        return (MOBILE_APP_IDS.concat(REFERRAL_IDS, DAILY_IDS, ENCRAVE_IDS, SURVEY_IDS, PURCHASES_IDS, WATCHED_IDS).indexOf(app) == -1);
    });

    this.data.OTHER_IDS = OTHER_IDS;

};

SbxDashboard.prototype.clear = function(clearData) {
    debug('clear() -> Cleaning things up');
    if (clearData === true) {
        debug('Removing data as well');
        this.data = {
            ALL_RECORDS: {},
            ALL_CATEGORIES: []
        };
    }
    this.sections = [];
    this.getSections().html('');
};

/**
 * Inserts a "Dashboard" button into the PageHeader/page navigation
 **/
SbxDashboard.prototype.insertDashboardButton = function() {
    // insert the Dashboard button
    this.$navigation.prepend(this.$tab);
    // modify page elements
    $('#pageHeaderButtonLedger').css({
        'border-radius': '0 0 0 0',
        'border-right': '0',
    });
}
SbxDashboard.prototype.build = function() {
    if (this.flags.built === true) return;

    // We usually need a reference to this
    var self = this;

    // Add the Dashboard section to the page
    this.$dashboard.appendTo(this.$ldgrCont);

    // Add Dashboard Tab to the pageHeader
    this.insertDashboardButton();

    // Prepare the overlay
    this.overlay = new SbxDashboardOverlay(this);

    $(this.overlay).bind('settingsChanged', function() {
        self.render();
    });

    $('button', this.$navigation).live('click', function(event) {
        if (this.id == self.$tab[0].id) {
            return;
        }
        debug('a non-dashboard tab was clicked');

        // hide the dashboard
        self.$dashboard.hide();

        // mark our tab as unselected
        self.selected = false;

        if (sb_settings.show_controls) {
            var c = $('#tableParameters');
            $('#tableView').prepend(c);
        }

        // mark the target as selected
        if (event.target.id == 'pageHeaderButtonLedger') {
            makePageHeaderButtonActive(event.target);
            $('#tableView').addClass('active');
        }
    });


    // Unload the Dashboard tab when a different tab gets clicked
    $('button', this.$navigation).live('click', function() {
        // Remembered the selected tab
        fn_record_tab($(this));
    });

    var initialRenderDone=false;
    // register the handler with the window
    this.$tab.click(function(event) {
        var pageHeaderButtonLedger = document.getElementById("pageHeaderButtonLedger")
        var pageHeaderButtonCollectorBill = document.getElementById("pageHeaderButtonCollectorBill");
        debug('the Dashboard tab was clicked');
        event.preventDefault();
        makePageHeaderButtonActive(this);
        makePageHeaderButtonUsual(pageHeaderButtonCollectorBill);
        makePageHeaderButtonUsual(pageHeaderButtonLedger);


        self.$dashboard.siblings('section').removeClass('active');
        self.$dashboard.show();

        //if (initialRenderDone === false) {
        //self.render();
        //initialRenderDone = true;
        //}

        if (sb_settings.show_controls) {
            var c = $('#tableParameters'); $('#dashboard').prepend(c);
        }

        // Mark our tab as selected
        $('button', self.$navigation).removeClass('selected');
        self.selected = true;
        debug('Dashboard tab selected?', self.selected);
    });

    // Append CSS/Themes
    if (typeof this.themes == 'undefined') {
        this.themes = [];
    }

    this.themes.push({
        name: 'Default',
        css: 'section#dashboard{margin-top: 1rem; border:0 solid #ddd;clear:both;overflow:hidden}div#dashboard h3{padding:1em 0 .7em 1em}div.app-sections{border:1px solid #ddd;border-top:0}div.app-section{overflow:auto}div.app-section h4{margin:0;cursor:pointer;padding:0 0 0 8px;font-weight:700;font-size:12px;line-height:28px;text-align:left;color:#353535;border:1px solid #CBCBCB;border-left:0;border-right:0}div.app-section h4:hover{color:#316CB1}div.app-section.empty h4{color:#aaa;cursor:default}span.section-name{padding-left:1em}span.section-visual-state{padding-left:.5em}div.app-section.minimized div.scores-container{display:none}div.scores-container{overflow:hidden;cursor:default!important;text-align:center;margin:0 auto;}div.offer-reward{width:90px;float:left;border:1px solid #ddd;margin:1em;padding:0;text-align:center;background-color:#FFF;position:relative}div.offer-reward:hover span.app-name{background-color:#316CB1;color:#FFF}div.offer-reward:hover span.offer-points{font-weight:700}div.offer-reward span.app-name{color:#FAFAFA;background-color:#316CB1;padding:.2em;height:2.5em;display:block;font-size:12px}span.section-rewards{float:right;width:5em;background-color:#303030;color:#A4C554;text-align:center;font-size:1.25em}span.app-name.single-line{line-height:2.5em}span.offer-points{font-size:1.4em;display:block;padding:1em 0 .5em;overflow:hidden}div#dashboard-overlay{position:absolute;margin-top:-60px}div#dashboard-overlay-bg{background-color:#FFF;opacity:.7;z-index:200;position:absolute}div.sbes-options{padding:0 2em 2em}.sbes-options-container{position:relative;background-color:#FFF;float:right;z-index:205;margin-top:60px}div.sbes-dashboard-header{overflow:hidden}div.sbes-options-header{overflow:hidden;border-bottom:1px solid #DDD}div.sbes-options-header h3{float:left}div.sbes-toolbar{padding:1em;float:right}div.sbes-toolbar a{background-color:#fff;color:#275DA3;border-bottom:0 none;cursor:pointer;height:26px}span.setting{width:10em;display:inline-block;font-weight:700;padding-right:1em;text-align:right}.sbes-options-input{margin:0;padding:0}input#option-hide-empty{margin-left:2px}.checkbox,.radio{position:relative;display:block;min-height:20px;margin-top:10px;margin-bottom:10px}.btn{display:inline-block;padding:6px 12px;margin-bottom:0;font-size:14px;font-weight:400;line-height:1.42857143;text-align:center;white-space:nowrap;vertical-align:middle;cursor:pointer;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;background-image:none;border:1px solid transparent;border-radius:4px}.btn-default{color:#333;background-color:#fff;border-color:#ccc}.btn:focus,.btn:hover{color:#333;text-decoration:none}.btn-default.active,.btn-default:active,.btn-default:focus,.btn-default:hover,.open>.dropdown-toggle.btn-default{color:#333;background-color:#e6e6e6;border-color:#adadad}.sbes-options-container{-webkit-box-shadow:1px 1px 5px 0 rgba(50,50,50,.75);-moz-box-shadow:1px 1px 5px 0 rgba(50,50,50,.75);box-shadow:1px 1px 5px 0 rgba(50,50,50,.75);padding:.5em;font-size:.9em}span.offer-progress{font-size:12px;position:absolute;right:-15px;top:-8px;background-color:#A4C554;color:#40561F;padding:3px 5px;font-weight:700;-webkit-border-radius:10px;-moz-border-radius:10px;border-radius:10px}.app-progressbar{position:relative}span.app-name{z-index:5;position:relative;white-space:nowrap;text-overflow:ellipsis;overflow:hidden}.app-progressbar .ui-progress-bar{position:absolute;width:100%;top:0;z-index:0}span.offer-progress.maxed-out{background-color:#b31217;border-radius:10px;padding:3px 8px;font-weight:700;font-size:11px;color:#FFF}',
        onBuildOffer: function(section, data, idx) {

            var element = $('<div class="offer-reward" ><span class="offer-points">' + fn_format_score(data.points) +
                            '</span><span class="app-name" title="' + data.app +'">' + data.app + '</span> </div>');

            var end = $('#dateRangeInput1').val();
            var start = $('#dateRangeInput2').val();
            if (MOBILE_APP_IDS.indexOf(data.category) != -1) {
                if (start == end && sb_settings.show_progress) {
                    var max = APP_MAXES[data.app];
                    var percent =  Math.floor((data.points / max) * 1e2);
                    var progress = data.points + " / " + max;

                    var $span = $('<span class="offer-progress"></span>');


                    if (data.points == max) {
                        $span.addClass('maxed-out');
                        $span.text('MAX');
                    } else {
                        $span.text(progress);
                    }
                    element.prepend($span);
                }
            }
            return element;
        }
    });

    this.themes.push({
        name: 'Minimal',
        css: 'section#dashboard{margin-top: 1rem; border:0 solid #ddd;clear:both;overflow:hidden}div#dashboard h3{padding:1em 0 .7em 1em}div.app-sections{border:1px solid #ddd;border-top:0}div.app-section{overflow:auto}div.app-section h4{margin:0;cursor:pointer;padding:0 0 0 8px;font-weight:700;font-size:12px;line-height:28px;text-align:left;color:#353535;border:1px solid #CBCBCB;border-left:0;border-right:0}div.app-section h4:hover{color:#316CB1}div.app-section.empty h4{color:#aaa;cursor:default}span.section-name{padding-left:1em}span.section-visual-state{padding-left:.5em}div.app-section.minimized div.scores-container{display:none;}div.scores-container{overflow:hidden;cursor:default!important;text-align:center;margin:0 auto;}div.offer-reward{width:110px;float:left;margin:1em .5em;padding:0;position:relative}div.offer-reward span.app-name{color:#777;display:block;font-size:.8em;line-height:1em;text-align:left;text-transform:uppercase;text-overflow:ellipsis;overflow:hidden;white-space:nowrap}span.section-rewards{float:right;width:5em;background-color:#303030;color:#A4C554;text-align:center;font-size:1.25em}span.app-name.single-line{line-height:2.5em}span.offer-points{font-size:1.4em;display:block;overflow:hidden;text-align:left;color:#333}div#dashboard-overlay{position:absolute;margin-top:-60px}div#dashboard-overlay-bg{background-color:#FFF;opacity:.7;z-index:200;position:absolute}div.sbes-options{padding:0 2em 2em}.sbes-options-container{position:relative;background-color:#FFF;float:right;z-index:205;margin-top:60px}div.sbes-dashboard-header{overflow:hidden}div.sbes-options-header{overflow:hidden;border-bottom:1px solid #DDD}div.sbes-options-header h3{float:left}div.sbes-toolbar{padding:1em;float:right}div.sbes-toolbar a{background-color:#fff;color:#275DA3;border-bottom:0 none;cursor:pointer;height:26px}span.setting{width:10em;display:inline-block;font-weight:700;padding-right:1em;text-align:right}.sbes-options-input{margin:0;padding:0}input#option-hide-empty{margin-left:2px}.checkbox,.radio{position:relative;display:block;min-height:20px;margin-top:10px;margin-bottom:10px}.btn{display:inline-block;padding:6px 12px;margin-bottom:0;font-size:14px;font-weight:400;line-height:1.42857143;text-align:center;white-space:nowrap;vertical-align:middle;cursor:pointer;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;background-image:none;border:1px solid transparent;border-radius:4px}.btn-default{color:#333;background-color:#fff;border-color:#ccc}.btn:focus,.btn:hover{color:#333;text-decoration:none}.btn-default.active,.btn-default:active,.btn-default:focus,.btn-default:hover,.open>.dropdown-toggle.btn-default{color:#333;background-color:#e6e6e6;border-color:#adadad}.sbes-options-container{-webkit-box-shadow:1px 1px 5px 0 rgba(50,50,50,.75);-moz-box-shadow:1px 1px 5px 0 rgba(50,50,50,.75);box-shadow:1px 1px 5px 0 rgba(50,50,50,.75);padding:.5em;font-size:.9em}span.offer-progress{font-size:12px;position:absolute;right:-15px;top:-8px;background-color:#A4C554;color:#40561F;padding:3px 5px;font-weight:700;-webkit-border-radius:10px;-moz-border-radius:10px;border-radius:10px}.app-progressbar{position:relative}span.app-name{z-index:5;position:relative}.app-progressbar .ui-progress-bar{position:absolute;width:100%;top:0;z-index:0}span.offer-progress.maxed-out{background-color:#b31217;border-radius:10px;padding:3px 8px;font-weight:700;font-size:11px;color:#FFF}#mobile-apps .offer-reward{display:none}.gauge{display:inline-block}',
        onRender: function() {
            var mobile_apps = this.pickSortedApps(MOBILE_APP_IDS);
            $.each(mobile_apps, function(id, app) {
                var g = new JustGage({
                    id: 'mobile-app-'+id,
                    value: app.points,
                    min: 0,
                    max: APP_MAXES[app.app],
                    title: app.app,
                    textRenderer: function(displayValue) {
                        return fn_format_score(displayValue);
                    },
                    humanFriendly: function( value, decimals) {
                        console.log(decimals);
                        return value;
                    },
                    levelColors: ['ff0000', 'ffa500', 'ffff00', '00ff00'],
                    levelColorsGradient: true
                });
            });
        },
        onBuildOffer: function(section, data, idx) {
            var element;
            if (section.id == 'mobile-apps') {
                element = $('<div class="gauge" id="mobile-app-" style="width:117px; height:120px;"></div>');
                element.attr('id', 'mobile-app-' + idx );
            } else {
                element = $('<div class="offer-reward"><span class="app-name" title="' + data.app + '">' + data.app +
                            '</span><span class="offer-points">' + fn_format_score(data.points) + '</span></div>');
            }
            return element;
        }
    });

    // define the theme getter
    Object.defineProperty(this, 'currentTheme', {
        get: function () {
            return _.findWhere(self.themes, {name: sb_settings.theme });
        }
    });


    // Append the no data banner
    var $nodata = $(".alertLedgerNoData").clone();
    this.$dashboard.append($nodata);

    // Finally, flag the dashboard as having been built
    this.flags.built = true;
};

SbxDashboard.prototype.render = function(newData, saveData) {
    // Flag as rendering
    this.flags.rendering = true;

    if (this.flags.render_count === undefined) {
        this.flags.render_count = 0;
    }

    if (newData) {

        if (saveData === false || saveData === undefined) {
            this.clear(true);
        }
        // Load the new data
        this.loadData(newData);
    } else {
        this.clear(false);
    }


    fn_apply_css(this.currentTheme.css, true);
    this.buildSection('Mobile Apps', MOBILE_APP_IDS);
    this.buildSection('Referrals', REFERRAL_IDS);
    this.buildSection('Daily Points', DAILY_IDS);
    this.buildSection('Encraves', ENCRAVE_IDS);
    this.buildSection('Swagbucks Watch', WATCHED_IDS, { minimized: "true" });
    this.buildSection('Surveys', SURVEY_IDS);
    this.buildSection('Reward Store Purchases', PURCHASES_IDS);
    this.buildSection('Other Offers', OTHER_IDS);
    this.renderSections();



    if ($.isFunction(this.currentTheme.onRender)) {
        this.currentTheme.onRender.call(this);
    }


    $(this).trigger('rendered');
    debug('render complete');
    this.flags.render_count++;
    this.flags.rendering = false;


};

SbxDashboard.prototype.getEmptyData = function() {
    var data = [];
    var intToday = parseInt(this.yyyymmdd());
    var strToday = this.yyyymmdd();

    for (var app in APP_MAXES) {
        data.push([18, intToday, strToday, 0, "0", app]);
    }
    return data;
};


SbxDashboard.prototype.yyyymmdd = function() {
    var d = new Date();
    var yyyy = d.getFullYear().toString();
    var mm = (d.getMonth()+1).toString(); // getMonth() is zero-based
    var dd  = d.getDate().toString();
    return yyyy + (mm[1]?mm:"0"+mm[0]) + (dd[1]?dd:"0"+dd[0]); // string
};

SbxDashboard.prototype.getSections = function() {
    var $sections = $('div.app-sections', this.$dashboard);
    if ($sections.length === 0) {
        $sections = $('<div class="app-sections"></div>');
    }
    return $sections;
};

SbxDashboard.prototype.buildSection = function(sectionHeader, section_category_ids, opts) {

    var self = this;
    var section = {};
    var sectionSortedApps = this.pickSortedApps(section_category_ids);

    if (sectionSortedApps.length === 0 && sb_settings.hide_empty) {
        return;
    }

    section.apps = sectionSortedApps;
    section.header = sectionHeader;
    section.categories = section_category_ids;
    section.offers = [];

    // First thing we need is the slug
    section.id = slugify(sectionHeader);
    var _MINIMIZED = '_minimized',    
        // options
        options = $.extend({}, {
            showTotals: true,
            weight: 0,
            minimized: "false"
        }, opts),

        // now we can check if this section has previous settings
        isMinimized = JSON.parse(localStorage.getItem(section.id + _MINIMIZED) || (options.minimized !== undefined ? options.minimized : "false")),
        current_state = (section.apps.length === 0 ? 'empty' : (isMinimized ? 'closed' : 'opened')),
        // Dom element's we'll be using
        offer, section_total;


    var section_html = '<div class="app-section"><h4 class="section-header bg-gradient"><span class="section-visual-state"></span> <span class="section-name"></span><span class="section-rewards"></span></h4><div class="scores-container"></div></div>',
        $section = $(section_html),
        $header = $('h4', $section),
        $icon_span = $('.section-visual-state', $header),
        $header_span = $('.section-name', $header),
        $reward_span = $('.section-rewards', $header),
        $scores = $('.scores-container', $section);


    $section.attr('id', section.id);

    // Add classes
    if (isMinimized) {
        $section.addClass('minimized');
    }

    $header_span.text(section.header);

    // Append the total points if desired
    if (options.showTotals) {
        section_total = section.apps.length=== 0 ? 0 : section.apps.map(function (data) {
            return data.points;
        }).reduce(function (total, i) {
            return total + i;
        });

        $reward_span.text(fn_format_score(section_total));
    }

    // Prefix header with the proper icon
    if (section.apps.length=== 0) {
        current_state = 'empty';
        $section.addClass('empty');
    }
    $icon_span.text(icons[current_state]);

    var elements = section.apps.map(function(data, idx) {
        return self.buildOffer(section, data, idx);
    }).reduce(function(prev, curr) {
        return prev.add(curr);
    }, $());

    elements.appendTo($scores);

    if (section.apps.length) {        
        // Bind some animation handlers to make things pretty
        if (section_category_ids.indexOf(18) == -1) {
            $header.click(function () {
                fn_header_click.call(this, icons);
            });
        }
    }
    this.sections.push({
        html: $section,
        weight: options.weight
    });
    return $section;
};

SbxDashboard.prototype.buildOffer = function(section, data, idx) {
    var single_line_limit = 15,
        max_length = 14,
        is_single_line = (data.app <= single_line_limit),
        element;

    if (is_single_line === false) {
        is_single_line = data.app.slice(0,-3).length <= max_length;
    }


    // This changes with the theme

    if ($.isFunction(this.currentTheme.onBuildOffer)) {
        element = this.currentTheme.onBuildOffer(section, data, idx);
    }


    //            if (is_single_line) {
    $('.app-name', element).addClass('single-line');
    //            }

    element.mouseenter(function() {
        $(this).addClass('hover');
    }).mouseleave(function() { $(this).removeClass('hover'); });

    return element;
}

SbxDashboard.prototype.renderSections = function() {
    // First, let's get get our container
    var $sections = this.getSections();

    // Render the sections by weight
    this.sections.sort(function(a,b) { return ( a.weight > b.weight ? 1 : (a.weight < b.weight ? -1 : 0)); });

    var n_sections = this.sections.length, section, i;
    for (i=0; i < n_sections; i++) {
        section = this.sections[i];
        $sections.append(section.html);
    }

    $sections.appendTo(this.$dashboard);

};

function fn_record_tab() {
    // try to echo the selected tab
    var $nav = $('nav#pageHeaderButtons');
    var selected_id = $('.sbBgColor1', $nav).attr('id');
    localStorage.setItem(app_label+'_dashboard_selected_tab', selected_id);
    console.log(selected_id);
}

// Setups up events and such which are necessary for the overlay
function SbxDashboardOverlay(sbxDashboard) {
    this.$overlay = $('#dashboard-overlay', sbxDashboard.$dashboard);
    this.sbxDashboard = sbxDashboard;
    this.bindHandlers();
    this.realizeSettings();
}

SbxDashboardOverlay.prototype.bindHandlers = function() {
    var self = this;

    // Tie the settings form to the storage
    $('input[name=sbes_score_units]', this.$overlay).change(function() {
        sb_settings.format = $('input[name=sbes_score_units]:checked').val();
    });
    $('input[name=sbes_sort]', this.$overlay).change(function() {
        sb_settings.sort = $('input[name=sbes_sort]:checked').val();
    });
    $('input[name=sbes_order]', this.$overlay).change(function() {
        sb_settings.order = $('input[name=sbes_order]:checked').val();
    });
    $('input[name=sbes_hide_empty]', this.$overlay).change(function() {
        sb_settings.hide_empty = $(this).prop('checked');
    });
    $('input[name=sbes_show_progress]', this.$overlay).change(function() {
        sb_settings.show_progress = $(this).prop('checked');
    });
    $('select[name=sbes_theme]', this.$overlay).change(function() {
        sb_settings.theme = $('option:selected', this).text();
    });

    $(this.sbxDashboard).bind('rendered', function() {
        if (self.active === true) {
            // re-render the overlay
            self.renderOverlay();
        }
    });


    // bind the overlay close button
    $('a#sbes-close-options', this.$overlay).click(function (event) {
        event.preventDefault();

        self.$overlay.hide();
        self.active = false;
        $(self).trigger('settingsChanged');
    });

    // Watch the options link
    $('a#sbes-options-link').click(function( event ) {
        event.preventDefault();
        self.active = true;

        self.renderOverlay();
    });

    // Watch the Expand all and Collapse all links
    $('#sbes-ui-collapse-all').click(function(e) {
        e.preventDefault();
        $('.scores-container').parents('.app-section').each(function() {
            var $header = $('h4', this);
            if (this.id == "mobile-apps") return;
            fn_header_click.call($header, icons, 'closed');

        });
    });

    $('#sbes-ui-expand-all').click(function(e) {
        e.preventDefault();
        $('.scores-container').parents('.app-section').each(function() {
            var $header = $('h4', this);
            fn_header_click.call($header, icons, 'opened');
        });
    });
};

// Does whatever is necessary to get the overlay ready to be displayed
SbxDashboardOverlay.prototype.renderOverlay = function() {

    // prep the overlay dimensions
    var overlay = $('#dashboard-overlay');
    var bg = $('#dashboard-overlay-bg');

    overlay.height(overlay.parent().height());
    overlay.width(overlay.parent().width());

    bg.height(overlay.height());
    bg.width(overlay.width());

    overlay.show();
};

// Apply sb_settings to the overlay form
SbxDashboardOverlay.prototype.realizeSettings = function(settings) {
    settings = settings || sb_settings;
    $("#option-format-" + settings.format).prop('checked', true);
    $("#option-sort-" + settings.sort).prop('checked', true);
    $("#option-order-" + settings.order).prop('checked', true);
    $("#option-hide-empty").prop('checked', settings.hide_empty);
    $("#option-show-progress").prop('checked', settings.show_progress);
};

// Function to apply custom CSS
var myStyle;
function fn_apply_css(css, replace) {
    var head, style, newStyle = true;

    head = document.getElementsByTagName('head')[0];
    if (!head) {
        return;
    }

    if (replace === true) {
        // do we have a style to replace?
        if (myStyle !== undefined) {
            newStyle = false;
            style = myStyle;
        } else {
            newStyle = true;
        }
    }

    if (newStyle) {
        style = document.createElement('style');
    }
    style.type = 'text/css';
    style.innerHTML = css;

    // These are taken dynamically from swagbucks' CDN
    var images = {
        gradient: (function () { var c, t = $('<th class="table-sortable"></th>'); t.appendTo($('body')); c=t.css('background-image'); t.remove();return c;})()
    };

    style.innerHTML += 'div.app-section h4 { background-image: '+ images.gradient +'}';

    if (newStyle) {
        head.appendChild(style);

        // store it as myStyle
        myStyle = style;
    }


}

SbxDashboard.prototype.pickSortedApps = function(arrayOfCategories) {
    return this.getSortedApps(this.pickApps(arrayOfCategories));
};

/**
* Picks the records belonging to categories defined in arrayOfCategoryIds
* @param arrayOfCategories
* @returns {*}
*/
SbxDashboard.prototype.pickApps = function(categoryIds) {
    var a = _.pick(this.data.ALL_RECORDS, function(record, key) {
        return categoryIds.indexOf(record.category) != -1;
    });
    return a;
};

/**
* Sorts the given plucked app data
*
* @param somePickedApps
* @returns {Array}
*/
SbxDashboard.prototype.getSortedApps = function(somePickedApps) {
    var sortable = [];
    for (var someApp in somePickedApps) {
        // somePickedApps[someApp] already has "app", its just called "note"
        sortable.push($.extend({}, somePickedApps[someApp], { category_label: someApp, app: someApp }));
    }

    if (sortable.length === 0) {
        return [];
    }

    // Sort the apps
    var sorted = _.sortBy(sortable, function (obj) {
        var sortVal;
        switch (sb_settings.sort) {
            default:
            case "alpha":
                sortVal = obj.app.toLowerCase();
                break;
            case "num":
                sortVal = Math.abs(obj.points);
                break;
        }
        return sortVal;
    });

    if (sb_settings.order == "desc") {
        sorted.reverse();
    }

    return sorted;
};


/**
* Cleans up app labels a bit
*
* If it finds the needle (key) in the app label, it replaces it (w/ the value).
*
* This needs to get fixed so that it works on more apps. It doesn't make sense
* to have some of the logic here and some of it in loadData().
*
* @param someApp
* @returns
*/
function fn_format_label(label, category) {
    'use strict';
    var aliases = {
        "Fail/Over": "Fail/Over Quota",
        "Jun Group": "Jun Group",
        "Daily Finance": "Encrave",
        "SurveySpecial": "Survey Sp. Offers",
        "Email": "Email Offers",
        "SB Offers": "",
        "SVN: ": ""
    };

    $.each(aliases, function replaceAliases(needle, replacement) {
        if (label.indexOf(needle) !== -1) {
            label = replacement;
            return false;
        }
    });

    if (category === 16) {
        label = "Online Videos";
    }

    // Clean labels for surveys
    if (category === 12) {
        if (label.indexOf('Disqualification') >= 0) {
            label = 'Disqualified';
        }
        if (label.indexOf('Over Quota') >= 0) {
            label = 'Over Quota';
        }
        label = label.replace('Dashboard - ', '');
        label = label.replace('Dashboard -', '');
        label = label.replace('- Disqualification', '');
        label = label.replace('- Complete', '');
    }
    return label;
}

function fn_header_click(icons, forced) {
    var self = this,
        curr_icon = $(this).text()[0],
        $scores = $(self).parent().find('.scores-container'),
        section_id = $(this).parents('.app-section').attr('id'),
        MINIMIZED = section_id + '_minimized',
        ico = (curr_icon == icons.opened ? icons.closed : icons.opened);

    if (forced && icons.hasOwnProperty(forced)) {
        ico = icons[forced];

        if (curr_icon == ico || curr_icon == icons.empty) {
            return;
        }
    }

    if (ico != icons.empty) {
        // we are minimizing
        localStorage.setItem(MINIMIZED, ( ico == icons.closed ));
    }

    // change the icon
    var changeIcon = function () {
        $('.section-visual-state', self).text(ico);
    };

    if (ico == icons.closed) {
        // needs to be closed
        $scores.slideUp(changeIcon);
    } else {
        $scores.slideDown(changeIcon);
    }
}

function fn_format_score(value) {
    var format = sb_settings.format;
    if (valid_options.format.indexOf(format) == -1) {
        format = defaults.format;
    }

    if (format == "money") {
        return fn_format_money(value, 1/100, true);
    }

    return value;
}
function fn_format_money(value, units, withSign) {
    withSign = Boolean(withSign) || false;
    var ret = (value * units).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    return withSign ? "$" + ret : ret;
}

function debug() {
    var timestamp = new Date().toJSON();
    console.log.apply(console, ['[ ' + timestamp + ' ] Sbx Dashboard :: '].concat($.makeArray(arguments)));
}

function error() {
    var timestamp = new Date().toJSON();
    console.error.apply(console, ['[ ' + timestamp + ' ] Sbx Dashboard :: '].concat($.makeArray(arguments)));
}

function slugify(Text) {
    return Text
        .toLowerCase()
        .replace(/ /g,'-')
        .replace(/[^\w-]+/g,'');
}

function SBESStoredOptions(prefix, defaults) {
    this.options = [];
    this.prefix = prefix.slice(-1) == '_' ? prefix : prefix + '_';

    var self = this;
    for (var property in defaults) {
        if (!defaults.hasOwnProperty(property)) {
            continue;
        }

        this.options.push(property);

        (function(key) {
            Object.defineProperty(self, key, {
                get: function() {
                    return onPropertyGet(key);
                },
                set: function(value) {
                    return onPropertySet(key, value, this[key]);
                }
            });

        })(property);
    }

    function onPropertyGet(key) {
        // last place to look is the defaults array
        var value = defaults[key];
        var item = self.prefix + key;

        // we'd prefer it to be something the user has locally
        if (localStorage.getItem(item)) {
            value = JSON.parse(localStorage.getItem(item));
        }

        return value;
    }

    function onPropertySet(key, value, old_value) {
        localStorage.setItem(self.prefix + key, JSON.stringify(value));
        return value;
    }

    this.clear = function() {
        var n_options = this.options.length,
            option;

        for (var i=0; i < n_options; i++) {
            option = this.options[i];
            localStorage.removeItem(this.prefix+option);
        }
    };
}



// Once the data is loaded, the fun can begin
require(function(){
    // we don't really need the dash to have been loaded but it gives for a nice UX
    var condition = window.myData !== undefined && document.getElementById('dashboard') !== null;
    return condition;
}, function() {
    // Apply the custom CSS rules


});






/**
 * JustGage - this is work-in-progress, unreleased, unofficial code, so it might not work top-notch :)
 * Check http://www.justgage.com for official releases
 * Licensed under MIT.
 * @author Bojan Djuricic (@Toorshia)
 *
 * LATEST UPDATES
 *
 * -----------------------------
 * March 16, 2014.
 * -----------------------------
     * fix - https://github.com/toorshia/justgage/issues/112
 * 
 * -----------------------------
 * February 16, 2014.
 * -----------------------------
     * fix - https://github.com/toorshia/justgage/issues/102

 * -----------------------------
 * April 25, 2013.
 * -----------------------------
     * use HTML5 data-* attributes of the DOM Element to render the gauge (which overrides the constructor options).

 * -----------------------------
 * April 18, 2013.
 * -----------------------------
     * parentNode - use this instead of id, to attach gauge to node which is outside of DOM tree - https://github.com/toorshia/justgage/issues/48
     * width - force gauge width
     * height - force gauge height

 * -----------------------------
 * April 17, 2013.
 * -----------------------------
     * fix - https://github.com/toorshia/justgage/issues/49

 * -----------------------------
 * April 01, 2013.
 * -----------------------------
     * fix - https://github.com/toorshia/justgage/issues/46

 * -----------------------------
 * March 26, 2013.
 * -----------------------------
     * customSectors - define specific color for value range (0-10 : red, 10-30 : blue etc.)

 * -----------------------------
 * March 23, 2013.
 * -----------------------------
     * counter - option to animate value  in counting fashion
     * fix - https://github.com/toorshia/justgage/issues/45

 * -----------------------------
 * March 13, 2013.
 * -----------------------------
     * refresh method - added optional 'max' parameter to use when you need to update max value

 * -----------------------------
 * February 26, 2013.
 * -----------------------------
     * decimals - option to define/limit number of decimals when not using humanFriendly or customRenderer to display value
     * fixed a missing parameters bug when calling generateShadow()  for IE < 9

 * -----------------------------
 * December 31, 2012.
 * -----------------------------
     * fixed text y-position for hidden divs - workaround for Raphael <tspan> 'dy' bug - https://github.com/DmitryBaranovskiy/raphael/issues/491
     * 'show' parameters, like showMinMax are now 'hide' because I am lame developer - please update these in your setups
     * Min and Max labels are now auto-off when in donut mode
     * Start angle in donut mode is now 90
     * donutStartAngle - option to define start angle for donut

 * -----------------------------
 * November 25, 2012.
 * -----------------------------
     * Option to define custom rendering function for displayed value

 * -----------------------------
 * November 19, 2012.
 * -----------------------------
     * Config.value is now updated after gauge refresh

 * -----------------------------
 * November 13, 2012.
 * -----------------------------
     * Donut display mode added
     * Option to hide value label
     * Option to enable responsive gauge size
     * Removed default title attribute
     * Option to accept min and max defined as string values
     * Option to configure value symbol
     * Fixed bad aspect ratio calculations
     * Option to configure minimum font size for all texts
     * Option to show shorthand big numbers (human friendly)
     */

JustGage = function(config) {

    var obj = this;

    // Helps in case developer wants to debug it. unobtrusive
    if (config === null || config ===  undefined) {
        console.log('* justgage: Make sure to pass options to the constructor!');
        return false;
    }

    var node;

    if (config.id !== null && config.id !== undefined) {
        node= document.getElementById(config.id);
        if (!node) {
            console.log('* justgage: No element with id : %s found', config.id);
            return false;
        }
    } else if (config.parentNode !== null && config.parentNode !== undefined) {
        node = config.parentNode;
    } else {
        console.log('* justgage: Make sure to pass the existing element id or parentNode to the constructor.');
        return false;
    }

    var dataset = node.dataset ? node.dataset : {};

    // configurable parameters
    obj.config =
        {
        // id : string
        // this is container element id
        id : config.id,

        // parentNode : node object
        // this is container element
        parentNode : obj.kvLookup('parentNode', config, dataset, null),

        // width : int
        // gauge width
        width : obj.kvLookup('width', config, dataset, null),

        // height : int
        // gauge height
        height : obj.kvLookup('height', config, dataset, null),

        // title : string
        // gauge title
        title : obj.kvLookup('title', config, dataset, ""),

        // titleFontColor : string
        // color of gauge title
        titleFontColor : obj.kvLookup('titleFontColor', config, dataset,  "#999999"),

        // value : float
        // value gauge is showing
        value : obj.kvLookup('value', config, dataset, 0, 'float'),

        // valueFontColor : string
        // color of label showing current value
        valueFontColor : obj.kvLookup('valueFontColor', config, dataset, "#010101"),

        // symbol : string
        // special symbol to show next to value
        symbol : obj.kvLookup('symbol', config, dataset, ''),

        // min : float
        // min value
        min : obj.kvLookup('min', config, dataset, 0, 'float'),

        // max : float
        // max value
        max : obj.kvLookup('max', config, dataset, 100, 'float'),

        // humanFriendlyDecimal : int
        // number of decimal places for our human friendly number to contain
        humanFriendlyDecimal : obj.kvLookup('humanFriendlyDecimal', config, dataset, 0),

        // textRenderer: func
        // function applied before rendering text
        textRenderer  : obj.kvLookup('textRenderer', config, dataset, null),

        // gaugeWidthScale : float
        // width of the gauge element
        gaugeWidthScale : obj.kvLookup('gaugeWidthScale', config, dataset, 1.0),

        // gaugeColor : string
        // background color of gauge element
        gaugeColor : obj.kvLookup('gaugeColor', config, dataset, "#edebeb"),

        // label : string
        // text to show below value
        label : obj.kvLookup('label', config, dataset, ''),

        // labelFontColor : string
        // color of label showing label under value
        labelFontColor : obj.kvLookup('labelFontColor', config, dataset, "#b3b3b3"),

        // shadowOpacity : int
        // 0 ~ 1
        shadowOpacity : obj.kvLookup('shadowOpacity', config, dataset, 0.2),

        // shadowSize: int
        // inner shadow size
        shadowSize : obj.kvLookup('shadowSize', config, dataset, 5),

        // shadowVerticalOffset : int
        // how much shadow is offset from top
        shadowVerticalOffset : obj.kvLookup('shadowVerticalOffset', config, dataset, 3),

        // levelColors : string[]
        // colors of indicator, from lower to upper, in RGB format
        levelColors : obj.kvLookup('levelColors', config, dataset, [ "#a9d70b", "#f9c802", "#ff0000" ], 'array', ','),

        // startAnimationTime : int
        // length of initial animation
        startAnimationTime : obj.kvLookup('startAnimationTime', config, dataset, 700),

        // startAnimationType : string
        // type of initial animation (linear, >, <,  <>, bounce)
        startAnimationType : obj.kvLookup('startAnimationType', config, dataset, '>'),

        // refreshAnimationTime : int
        // length of refresh animation
        refreshAnimationTime : obj.kvLookup('refreshAnimationTime', config, dataset, 700),

        // refreshAnimationType : string
        // type of refresh animation (linear, >, <,  <>, bounce)
        refreshAnimationType : obj.kvLookup('refreshAnimationType', config, dataset, '>'),

        // donutStartAngle : int
        // angle to start from when in donut mode
        donutStartAngle : obj.kvLookup('donutStartAngle', config, dataset, 90),

        // valueMinFontSize : int
        // absolute minimum font size for the value
        valueMinFontSize : obj.kvLookup('valueMinFontSize', config, dataset, 16),

        // titleMinFontSize
        // absolute minimum font size for the title
        titleMinFontSize : obj.kvLookup('titleMinFontSize', config, dataset, 10),

        // labelMinFontSize
        // absolute minimum font size for the label
        labelMinFontSize : obj.kvLookup('labelMinFontSize', config, dataset, 10),

        // minLabelMinFontSize
        // absolute minimum font size for the minimum label
        minLabelMinFontSize : obj.kvLookup('minLabelMinFontSize', config, dataset, 10),

        // maxLabelMinFontSize
        // absolute minimum font size for the maximum label
        maxLabelMinFontSize : obj.kvLookup('maxLabelMinFontSize', config, dataset, 10),

        // hideValue : bool
        // hide value text
        hideValue : obj.kvLookup('hideValue', config, dataset, false),

        // hideMinMax : bool
        // hide min and max values
        hideMinMax : obj.kvLookup('hideMinMax', config, dataset, false),

        // hideInnerShadow : bool
        // hide inner shadow
        hideInnerShadow : obj.kvLookup('hideInnerShadow', config, dataset, false),

        // humanFriendly : bool
        // convert large numbers for min, max, value to human friendly (e.g. 1234567 -> 1.23M)
        humanFriendly : obj.kvLookup('humanFriendly', config, dataset, false),

        // noGradient : bool
        // whether to use gradual color change for value, or sector-based
        noGradient : obj.kvLookup('noGradient', config, dataset, false),

        // donut : bool
        // show full donut gauge
        donut : obj.kvLookup('donut', config, dataset, false),

        // relativeGaugeSize : bool
        // whether gauge size should follow changes in container element size
        relativeGaugeSize : obj.kvLookup('relativeGaugeSize', config, dataset, false),

        // counter : bool
        // animate level number change
        counter : obj.kvLookup('counter', config, dataset, false),

        // decimals : int
        // number of digits after floating point
        decimals : obj.kvLookup('decimals', config, dataset, 0),

        // customSectors : [] of objects
        // number of digits after floating point
        customSectors : obj.kvLookup('customSectors', config, dataset, []),

        // formatNumber: boolean
        // formats numbers with commas where appropriate
        formatNumber : obj.kvLookup('formatNumber', config, dataset, false)
    };

    // variables
    var
    canvasW,
        canvasH,
        widgetW,
        widgetH,
        aspect,
        dx,
        dy,
        titleFontSize,
        titleX,
        titleY,
        valueFontSize,
        valueX,
        valueY,
        labelFontSize,
        labelX,
        labelY,
        minFontSize,
        minX,
        minY,
        maxFontSize,
        maxX,
        maxY;

    // overflow values
    if (obj.config.value > obj.config.max) obj.config.value = obj.config.max;
    if (obj.config.value < obj.config.min) obj.config.value = obj.config.min;
    obj.originalValue = obj.kvLookup('value', config, dataset, -1, 'float');

    // create canvas
    if (obj.config.id !== null && (document.getElementById(obj.config.id)) !== null) {
        obj.canvas = Raphael(obj.config.id, "100%", "100%");
    } else if (obj.config.parentNode !== null) {
        obj.canvas = Raphael(obj.config.parentNode, "100%", "100%");
    }

    if (obj.config.relativeGaugeSize === true) {
        obj.canvas.setViewBox(0, 0, 200, 150, true);
    }

    // canvas dimensions
    if (obj.config.relativeGaugeSize === true) {
        canvasW = 200;
        canvasH = 150;
    } else if (obj.config.width !== null && obj.config.height !== null) {
        canvasW = obj.config.width;
        canvasH = obj.config.height;
    } else if (obj.config.parentNode !== null) {
        obj.canvas.setViewBox(0, 0, 200, 150, true);
        canvasW = 200;
        canvasH = 150;
    } else {
        canvasW = getStyle(document.getElementById(obj.config.id), "width").slice(0, -2) * 1;
        canvasH = getStyle(document.getElementById(obj.config.id), "height").slice(0, -2) * 1;
    }

    // widget dimensions
    if (obj.config.donut === true) {

        // DONUT *******************************

        // width more than height
        if(canvasW > canvasH) {
            widgetH = canvasH;
            widgetW = widgetH;
            // width less than height
        } else if (canvasW < canvasH) {
            widgetW = canvasW;
            widgetH = widgetW;
            // if height don't fit, rescale both
            if(widgetH > canvasH) {
                aspect = widgetH / canvasH;
                widgetH = widgetH / aspect;
                widgetW = widgetH / aspect;
            }
            // equal
        } else {
            widgetW = canvasW;
            widgetH = widgetW;
        }

        // delta
        dx = (canvasW - widgetW)/2;
        dy = (canvasH - widgetH)/2;

        // title
        titleFontSize = ((widgetH / 8) > 10) ? (widgetH / 10) : 10;
        titleX = dx + widgetW / 2;
        titleY = dy + widgetH / 11;

        // value
        valueFontSize = ((widgetH / 6.4) > 16) ? (widgetH / 5.4) : 18;
        valueX = dx + widgetW / 2;
        if(obj.config.label !== '') {
            valueY = dy + widgetH / 1.85;
        } else {
            valueY = dy + widgetH / 1.7;
        }

        // label
        labelFontSize = ((widgetH / 16) > 10) ? (widgetH / 16) : 10;
        labelX = dx + widgetW / 2;
        labelY = valueY + labelFontSize;

        // min
        minFontSize = ((widgetH / 16) > 10) ? (widgetH / 16) : 10;
        minX = dx + (widgetW / 10) + (widgetW / 6.666666666666667 * obj.config.gaugeWidthScale) / 2 ;
        minY = labelY;

        // max
        maxFontSize = ((widgetH / 16) > 10) ? (widgetH / 16) : 10;
        maxX = dx + widgetW - (widgetW / 10) - (widgetW / 6.666666666666667 * obj.config.gaugeWidthScale) / 2 ;
        maxY = labelY;

    } else {
        // HALF *******************************

        // width more than height
        if(canvasW > canvasH) {
            widgetH = canvasH;
            widgetW = widgetH * 1.25;
            //if width doesn't fit, rescale both
            if(widgetW > canvasW) {
                aspect = widgetW / canvasW;
                widgetW = widgetW / aspect;
                widgetH = widgetH / aspect;
            }
            // width less than height
        } else if (canvasW < canvasH) {
            widgetW = canvasW;
            widgetH = widgetW / 1.25;
            // if height don't fit, rescale both
            if(widgetH > canvasH) {
                aspect = widgetH / canvasH;
                widgetH = widgetH / aspect;
                widgetW = widgetH / aspect;
            }
            // equal
        } else {
            widgetW = canvasW;
            widgetH = widgetW * 0.75;
        }

        // delta
        dx = (canvasW - widgetW)/2;
        dy = (canvasH - widgetH)/2;

        // title
        titleFontSize = ((widgetH / 8) > obj.config.titleMinFontSize) ? (widgetH / 10) : obj.config.titleMinFontSize;
        titleX = dx + widgetW / 2;
        titleY = dy + widgetH / 6.4;

        // value
        valueFontSize = ((widgetH / 6.5) > obj.config.valueMinFontSize) ? (widgetH / 6.5) : obj.config.valueMinFontSize;
        valueX = dx + widgetW / 2;
        valueY = dy + widgetH / 1.275;

        // label
        labelFontSize = ((widgetH / 16) > obj.config.labelMinFontSize) ? (widgetH / 16) : obj.config.labelMinFontSize;
        labelX = dx + widgetW / 2;
        labelY = valueY + valueFontSize / 2 + 5;

        // min
        minFontSize = ((widgetH / 16) > obj.config.minLabelMinFontSize) ? (widgetH / 16) : obj.config.minLabelMinFontSize;
        minX = dx + (widgetW / 10) + (widgetW / 6.666666666666667 * obj.config.gaugeWidthScale) / 2 ;
        minY = labelY;

        // max
        maxFontSize = ((widgetH / 16) > obj.config.maxLabelMinFontSize) ? (widgetH / 16) : obj.config.maxLabelMinFontSize;
        maxX = dx + widgetW - (widgetW / 10) - (widgetW / 6.666666666666667 * obj.config.gaugeWidthScale) / 2 ;
        maxY = labelY;
    }

    // parameters
    obj.params  = {
        canvasW : canvasW,
        canvasH : canvasH,
        widgetW : widgetW,
        widgetH : widgetH,
        dx : dx,
        dy : dy,
        titleFontSize : titleFontSize,
        titleX : titleX,
        titleY : titleY,
        valueFontSize : valueFontSize,
        valueX : valueX,
        valueY : valueY,
        labelFontSize : labelFontSize,
        labelX : labelX,
        labelY : labelY,
        minFontSize : minFontSize,
        minX : minX,
        minY : minY,
        maxFontSize : maxFontSize,
        maxX : maxX,
        maxY : maxY
    };

    // var clear
    canvasW, canvasH, widgetW, widgetH, aspect, dx, dy, titleFontSize, titleX, titleY, valueFontSize, valueX, valueY, labelFontSize, labelX, labelY, minFontSize, minX, minY, maxFontSize, maxX, maxY = null;

    // pki - custom attribute for generating gauge paths
    obj.canvas.customAttributes.pki = function (value, min, max, w, h, dx, dy, gws, donut) {

        var alpha, Ro, Ri, Cx, Cy, Xo, Yo, Xi, Yi, path;

        if (donut) {
            alpha = (1 - 2 * (value - min) / (max - min)) * Math.PI;
            Ro = w / 2 - w / 7;
            Ri = Ro - w / 6.666666666666667 * gws;

            Cx = w / 2 + dx;
            Cy = h / 1.95 + dy;

            Xo = w / 2 + dx + Ro * Math.cos(alpha);
            Yo = h - (h - Cy) - Ro * Math.sin(alpha);
            Xi = w / 2 + dx + Ri * Math.cos(alpha);
            Yi = h - (h - Cy) - Ri * Math.sin(alpha);

            path = "M" + (Cx - Ri) + "," + Cy + " ";
            path += "L" + (Cx - Ro) + "," + Cy + " ";
            if (value > ((max - min) / 2)) {
                path += "A" + Ro + "," + Ro + " 0 0 1 " + (Cx + Ro) + "," + Cy + " ";
            }
            path += "A" + Ro + "," + Ro + " 0 0 1 " + Xo + "," + Yo + " ";
            path += "L" + Xi + "," + Yi + " ";
            if (value > ((max - min) / 2)) {
                path += "A" + Ri + "," + Ri + " 0 0 0 " + (Cx + Ri) + "," + Cy + " ";
            }
            path += "A" + Ri + "," + Ri + " 0 0 0 " + (Cx - Ri) + "," + Cy + " ";
            path += "Z ";

            return { path: path };

        } else {
            alpha = (1 - (value - min) / (max - min)) * Math.PI;
            Ro = w / 2 - w / 10;
            Ri = Ro - w / 6.666666666666667 * gws;

            Cx = w / 2 + dx;
            Cy = h / 1.25 + dy;

            Xo = w / 2 + dx + Ro * Math.cos(alpha);
            Yo = h - (h - Cy) - Ro * Math.sin(alpha);
            Xi = w / 2 + dx + Ri * Math.cos(alpha);
            Yi = h - (h - Cy) - Ri * Math.sin(alpha);

            path = "M" + (Cx - Ri) + "," + Cy + " ";
            path += "L" + (Cx - Ro) + "," + Cy + " ";
            path += "A" + Ro + "," + Ro + " 0 0 1 " + Xo + "," + Yo + " ";
            path += "L" + Xi + "," + Yi + " ";
            path += "A" + Ri + "," + Ri + " 0 0 0 " + (Cx - Ri) + "," + Cy + " ";
            path += "Z ";

            return { path: path };
        }

        // var clear
        alpha, Ro, Ri, Cx, Cy, Xo, Yo, Xi, Yi, path = null;
    };

    // gauge
    obj.gauge = obj.canvas.path().attr({
        "stroke": "none",
        "fill": obj.config.gaugeColor,
        pki: [
            obj.config.max,
            obj.config.min,
            obj.config.max,
            obj.params.widgetW,
            obj.params.widgetH,
            obj.params.dx,
            obj.params.dy,
            obj.config.gaugeWidthScale,
            obj.config.donut
        ]
    });

    // level
    obj.level = obj.canvas.path().attr({
        "stroke": "none",
        "fill": getColor(obj.config.value, (obj.config.value - obj.config.min) / (obj.config.max - obj.config.min), obj.config.levelColors, obj.config.noGradient, obj.config.customSectors),
        pki: [
            obj.config.min,
            obj.config.min,
            obj.config.max,
            obj.params.widgetW,
            obj.params.widgetH,
            obj.params.dx,
            obj.params.dy,
            obj.config.gaugeWidthScale,
            obj.config.donut
        ]
    });
    if(obj.config.donut) {
        obj.level.transform("r" + obj.config.donutStartAngle + ", " + (obj.params.widgetW/2 + obj.params.dx) + ", " + (obj.params.widgetH/1.95 + obj.params.dy));
    }

    // title
    obj.txtTitle = obj.canvas.text(obj.params.titleX, obj.params.titleY, obj.config.title);
    obj.txtTitle.attr({
        "font-size":obj.params.titleFontSize,
        "font-weight":"bold",
        "font-family":"Arial",
        "fill":obj.config.titleFontColor,
        "fill-opacity":"1"
    });
    setDy(obj.txtTitle, obj.params.titleFontSize, obj.params.titleY);

    // value
    obj.txtValue = obj.canvas.text(obj.params.valueX, obj.params.valueY, 0);
    obj.txtValue.attr({
        "font-size":obj.params.valueFontSize,
        "font-weight":"bold",
        "font-family":"Arial",
        "fill":obj.config.valueFontColor,
        "fill-opacity":"0"
    });
    setDy(obj.txtValue, obj.params.valueFontSize, obj.params.valueY);

    // label
    obj.txtLabel = obj.canvas.text(obj.params.labelX, obj.params.labelY, obj.config.label);
    obj.txtLabel.attr({
        "font-size":obj.params.labelFontSize,
        "font-weight":"normal",
        "font-family":"Arial",
        "fill":obj.config.labelFontColor,
        "fill-opacity":"0"
    });
    setDy(obj.txtLabel, obj.params.labelFontSize, obj.params.labelY);

    // min
    obj.txtMinimum = obj.config.min;
    if ( obj.config.textRenderer ) {
        obj.txtMinimum = obj.config.textRenderer( obj.config.min );
    } else if ( obj.config.humanFriendly ) {
        obj.txtMinimum = humanFriendlyNumber( obj.config.min, obj.config.humanFriendlyDecimal );
    } else if ( obj.config.formatNumber ) {
        obj.txtMinimum = formatNumber( obj.config.min );
    }
    obj.txtMin = obj.canvas.text(obj.params.minX, obj.params.minY, obj.txtMinimum);
    obj.txtMin.attr({
        "font-size":obj.params.minFontSize,
        "font-weight":"normal",
        "font-family":"Arial",
        "fill":obj.config.labelFontColor,
        "fill-opacity": (obj.config.hideMinMax || obj.config.donut)? "0" : "1"
    });
    setDy(obj.txtMin, obj.params.minFontSize, obj.params.minY);

    // max
    obj.txtMaximum = obj.config.max;
    if ( obj.config.textRenderer ) {
        obj.txtMaximum = obj.config.textRenderer( obj.config.max );
    } else if( obj.config.formatNumber ) {
        obj.txtMaximum = formatNumber( obj.txtMaximum );
    } else if( obj.config.humanFriendly ) {
        obj.txtMaximum = humanFriendlyNumber( obj.config.max, obj.config.humanFriendlyDecimal );
    }
    obj.txtMax = obj.canvas.text(obj.params.maxX, obj.params.maxY, obj.txtMaximum);
    obj.txtMax.attr({
        "font-size":obj.params.maxFontSize,
        "font-weight":"normal",
        "font-family":"Arial",
        "fill":obj.config.labelFontColor,
        "fill-opacity": (obj.config.hideMinMax || obj.config.donut)? "0" : "1"
    });
    setDy(obj.txtMax, obj.params.maxFontSize, obj.params.maxY);

    var defs = obj.canvas.canvas.childNodes[1];
    var svg = "http://www.w3.org/2000/svg";

    if (ie !== 'undefined' && ie < 9 ) {
        // VML mode - no SVG & SVG filter support
    }
    else if (ie !== 'undefined') {
        onCreateElementNsReady(function() {
            obj.generateShadow(svg, defs);
        });
    } else {
        obj.generateShadow(svg, defs);
    }

    // var clear
    defs, svg = null;

    // set value to display
    if(obj.config.textRenderer) {
        obj.originalValue = obj.config.textRenderer(obj.originalValue);
    } else if(obj.config.humanFriendly) {
        obj.originalValue = humanFriendlyNumber( obj.originalValue, obj.config.humanFriendlyDecimal ) + obj.config.symbol;
    } else if(obj.config.formatNumber) {
        obj.originalValue = formatNumber(obj.originalValue) + obj.config.symbol;
    } else {
        obj.originalValue = (obj.originalValue * 1).toFixed(obj.config.decimals) + obj.config.symbol;
    }

    if(obj.config.counter === true) {
        //on each animation frame
        eve.on("raphael.anim.frame." + (obj.level.id), function() {
            var currentValue = obj.level.attr("pki");
            if(obj.config.textRenderer) {
                obj.txtValue.attr("text", obj.config.textRenderer(Math.floor(currentValue[0])));
            } else if(obj.config.humanFriendly) {
                obj.txtValue.attr("text", humanFriendlyNumber( Math.floor(currentValue[0]), obj.config.humanFriendlyDecimal ) + obj.config.symbol);
            } else if(obj.config.formatNumber) {
                obj.txtValue.attr("text", formatNumber(Math.floor(currentValue[0])) + obj.config.symbol);
            } else {
                obj.txtValue.attr("text", (currentValue[0] * 1).toFixed(obj.config.decimals) + obj.config.symbol);
            }
            setDy(obj.txtValue, obj.params.valueFontSize, obj.params.valueY);
            currentValue = null;
        });
        //on animation end
        eve.on("raphael.anim.finish." + (obj.level.id), function() {
            obj.txtValue.attr({"text" : obj.originalValue});
            setDy(obj.txtValue, obj.params.valueFontSize, obj.params.valueY);
        });
    } else {
        //on animation start
        eve.on("raphael.anim.start." + (obj.level.id), function() {
            obj.txtValue.attr({"text" : obj.originalValue});
            setDy(obj.txtValue, obj.params.valueFontSize, obj.params.valueY);
        });
    }

    // animate gauge level, value & label
    obj.level.animate({
        pki: [
            obj.config.value,
            obj.config.min,
            obj.config.max,
            obj.params.widgetW,
            obj.params.widgetH,
            obj.params.dx,
            obj.params.dy,
            obj.config.gaugeWidthScale,
            obj.config.donut
        ]
    }, obj.config.startAnimationTime, obj.config.startAnimationType);
    obj.txtValue.animate({"fill-opacity":(obj.config.hideValue)?"0":"1"}, obj.config.startAnimationTime, obj.config.startAnimationType);
    obj.txtLabel.animate({"fill-opacity":"1"}, obj.config.startAnimationTime, obj.config.startAnimationType);
};

//
// tiny helper function to lookup value of a key from two hash tables
// if none found, return defaultvalue
//
// key: string
// tablea: object
// tableb: DOMStringMap|object
// defval: string|integer|float|null
// datatype: return datatype
// delimiter: delimiter to be used in conjunction with datatype formatting
//
JustGage.prototype.kvLookup = function(key, tablea, tableb, defval, datatype, delimiter) {
    var val = defval;
    var canConvert = false;
    if (!(key === null || key === undefined)) {
        if (tableb !== null && tableb !== undefined && typeof tableb === "object" && key in tableb) {
            val = tableb[key];
            canConvert = true;
        } else if (tablea !== null && tablea !== undefined && typeof tablea === "object" && key in tablea) {
            val = tablea[key];
            canConvert = true;
        } else {
            val = defval;
        }
        if (canConvert === true) {
            if (datatype !== null && datatype !== undefined) {
                switch(datatype) {
                    case 'int':
                        val = parseInt(val, 10);
                        break;
                    case 'float':
                        val = parseFloat(val);
                        break;
                    default:
                        break;
                }
            }
        }
    }
    return val;
};

/** Refresh gauge level */
JustGage.prototype.refresh = function(val, max) {

    var obj = this;
    var displayVal, color, max = max || null;

    // set new max
    if(max !== null) {
        obj.config.max = max;

        obj.txtMaximum = obj.config.max;
        if( obj.config.humanFriendly ) {
            obj.txtMaximum = humanFriendlyNumber( obj.config.max, obj.config.humanFriendlyDecimal );
        } else if( obj.config.formatNumber ) {
            obj.txtMaximum = formatNumber( obj.config.max );
        }
        obj.txtMax.attr({"text" : obj.txtMaximum});
        setDy(obj.txtMax, obj.params.maxFontSize, obj.params.maxY);
    }

    // overflow values
    displayVal = val;
    if ((val * 1) > (obj.config.max * 1)) {val = (obj.config.max * 1);}
    if ((val * 1) < (obj.config.min * 1)) {val = (obj.config.min * 1);}

    color = getColor(val, (val - obj.config.min) / (obj.config.max - obj.config.min), obj.config.levelColors, obj.config.noGradient, obj.config.customSectors);

    if(obj.config.textRenderer) {
        displayVal = obj.config.textRenderer(displayVal);
    } else if( obj.config.humanFriendly ) {
        displayVal = humanFriendlyNumber( displayVal, obj.config.humanFriendlyDecimal ) + obj.config.symbol;
    } else if( obj.config.formatNumber ) {
        displayVal = formatNumber((displayVal * 1).toFixed(obj.config.decimals)) + obj.config.symbol;
    } else {
        displayVal = (displayVal * 1).toFixed(obj.config.decimals) + obj.config.symbol;
    }
    obj.originalValue = displayVal;
    obj.config.value = val * 1;

    if(!obj.config.counter) {
        obj.txtValue.attr({"text":displayVal});
        setDy(obj.txtValue, obj.params.valueFontSize, obj.params.valueY);
    }

    obj.level.animate({
        pki: [
            obj.config.value,
            obj.config.min,
            obj.config.max,
            obj.params.widgetW,
            obj.params.widgetH,
            obj.params.dx,
            obj.params.dy,
            obj.config.gaugeWidthScale,
            obj.config.donut
        ],
        "fill":color
    },  obj.config.refreshAnimationTime, obj.config.refreshAnimationType);

    // var clear
    obj, displayVal, color, max = null;
};

/** Generate shadow */
JustGage.prototype.generateShadow = function(svg, defs) {

    var obj = this;
    var gaussFilter, feOffset, feGaussianBlur, feComposite1, feFlood, feComposite2, feComposite3;

    // FILTER
    gaussFilter = document.createElementNS(svg,"filter");
    gaussFilter.setAttribute("id","inner-shadow");
    defs.appendChild(gaussFilter);

    // offset
    feOffset = document.createElementNS(svg,"feOffset");
    feOffset.setAttribute("dx", 0);
    feOffset.setAttribute("dy", obj.config.shadowVerticalOffset);
    gaussFilter.appendChild(feOffset);

    // blur
    feGaussianBlur = document.createElementNS(svg,"feGaussianBlur");
    feGaussianBlur.setAttribute("result","offset-blur");
    feGaussianBlur.setAttribute("stdDeviation", obj.config.shadowSize);
    gaussFilter.appendChild(feGaussianBlur);

    // composite 1
    feComposite1 = document.createElementNS(svg,"feComposite");
    feComposite1.setAttribute("operator","out");
    feComposite1.setAttribute("in", "SourceGraphic");
    feComposite1.setAttribute("in2","offset-blur");
    feComposite1.setAttribute("result","inverse");
    gaussFilter.appendChild(feComposite1);

    // flood
    feFlood = document.createElementNS(svg,"feFlood");
    feFlood.setAttribute("flood-color","black");
    feFlood.setAttribute("flood-opacity", obj.config.shadowOpacity);
    feFlood.setAttribute("result","color");
    gaussFilter.appendChild(feFlood);

    // composite 2
    feComposite2 = document.createElementNS(svg,"feComposite");
    feComposite2.setAttribute("operator","in");
    feComposite2.setAttribute("in", "color");
    feComposite2.setAttribute("in2","inverse");
    feComposite2.setAttribute("result","shadow");
    gaussFilter.appendChild(feComposite2);

    // composite 3
    feComposite3 = document.createElementNS(svg,"feComposite");
    feComposite3.setAttribute("operator","over");
    feComposite3.setAttribute("in", "shadow");
    feComposite3.setAttribute("in2","SourceGraphic");
    gaussFilter.appendChild(feComposite3);

    // set shadow
    if (!obj.config.hideInnerShadow) {
        obj.canvas.canvas.childNodes[2].setAttribute("filter", "url(#inner-shadow)");
        obj.canvas.canvas.childNodes[3].setAttribute("filter", "url(#inner-shadow)");
    }

    // var clear
    gaussFilter, feOffset, feGaussianBlur, feComposite1, feFlood, feComposite2, feComposite3 = null;

};

/** Get color for value */
function getColor(val, pct, col, noGradient, custSec) {

    var no, inc, colors, percentage, rval, gval, bval, lower, upper, range, rangePct, pctLower, pctUpper, color;
    var noGradient = noGradient || custSec.length > 0;

    if(custSec.length > 0) {
        for(var i = 0; i < custSec.length; i++) {
            if(val > custSec[i].lo && val <= custSec[i].hi) {
                return custSec[i].color;
            }
        }
    }

    no = col.length;
    if (no === 1) return col[0];
    inc = (noGradient) ? (1 / no) : (1 / (no - 1));
    colors = [];
    for (i = 0; i < col.length; i++) {
        percentage = (noGradient) ? (inc * (i + 1)) : (inc * i);
        rval = parseInt((cutHex(col[i])).substring(0,2),16);
        gval = parseInt((cutHex(col[i])).substring(2,4),16);
        bval = parseInt((cutHex(col[i])).substring(4,6),16);
        colors[i] = { pct: percentage, color: { r: rval, g: gval, b: bval  } };
    }

    if(pct === 0) {
        return 'rgb(' + [colors[0].color.r, colors[0].color.g, colors[0].color.b].join(',') + ')';
    }

    for (var j = 0; j < colors.length; j++) {
        if (pct <= colors[j].pct) {
            if (noGradient) {
                return 'rgb(' + [colors[j].color.r, colors[j].color.g, colors[j].color.b].join(',') + ')';
            } else {
                lower = colors[j - 1];
                upper = colors[j];
                range = upper.pct - lower.pct;
                rangePct = (pct - lower.pct) / range;
                pctLower = 1 - rangePct;
                pctUpper = rangePct;
                color = {
                    r: Math.floor(lower.color.r * pctLower + upper.color.r * pctUpper),
                    g: Math.floor(lower.color.g * pctLower + upper.color.g * pctUpper),
                    b: Math.floor(lower.color.b * pctLower + upper.color.b * pctUpper)
                };
                return 'rgb(' + [color.r, color.g, color.b].join(',') + ')';
            }
        }
    }

}

/** Fix Raphael display:none tspan dy attribute bug */
function setDy(elem, fontSize, txtYpos) {
    if ((!ie || ie > 9) && elem.node.firstChild.attributes.dy) {
        elem.node.firstChild.attributes.dy.value = 0;
    }
}

/** Random integer  */
function getRandomInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**  Cut hex  */
function cutHex(str) {
    return (str.charAt(0)=="#") ? str.substring(1,7):str;
}

/**  Human friendly number suffix - From: http://stackoverflow.com/questions/2692323/code-golf-friendly-number-abbreviator */
function humanFriendlyNumber( n, d ) {
    var p, d2, i, s;

    p = Math.pow;
    d2 = p(10, d);
    i = 7;
    while( i ) {
        s = p(10,i--*3);
        if( s <= n ) {
            n = Math.round(n*d2/s)/d2+"KMGTPE"[i];
        }
    }
    return n;
}

/** Format numbers with commas - From: http://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript */
function formatNumber(x) {
    var parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
}

/**  Get style  */
function getStyle(oElm, strCssRule){
    var strValue = "";
    if(document.defaultView && document.defaultView.getComputedStyle){
        strValue = document.defaultView.getComputedStyle(oElm, "").getPropertyValue(strCssRule);
    }
    else if(oElm.currentStyle){
        strCssRule = strCssRule.replace(/\-(\w)/g, function (strMatch, p1){
            return p1.toUpperCase();
        });
        strValue = oElm.currentStyle[strCssRule];
    }
    return strValue;
}

/**  Create Element NS Ready  */
function onCreateElementNsReady(func) {
    if (document.createElementNS !== undefined) {
        func();
    } else {
        setTimeout(function() { onCreateElementNsReady(func); }, 100);
    }
}

/**  Get IE version  */
// ----------------------------------------------------------
// A short snippet for detecting versions of IE in JavaScript
// without resorting to user-agent sniffing
// ----------------------------------------------------------
// If you're not in IE (or IE version is less than 5) then:
// ie === undefined
// If you're in IE (>=5) then you can determine which version:
// ie === 7; // IE7
// Thus, to detect IE:
// if (ie) {}
// And to detect the version:
// ie === 6 // IE6
// ie > 7 // IE8, IE9 ...
// ie < 9 // Anything less than IE9
// ----------------------------------------------------------
// UPDATE: Now using Live NodeList idea from @jdalton
var ie = (function(){

    var undef,
        v = 3,
        div = document.createElement('div'),
        all = div.getElementsByTagName('i');

    while (
        div.innerHTML = '<!--[if gt IE ' + (++v) + ']><i></i><![endif]-->',
        all[0]
    );
    return v > 4 ? v : undef;
}());

function makePageHeaderButtonActive(btn) {
        btn.classList.remove("sbColor1");
        btn.classList.add("sbBgColor1")
}

function makePageHeaderButtonUsual(btn) {
    btn.classList.remove("sbBgColor1");
    btn.classList.add("sbColor1")
}