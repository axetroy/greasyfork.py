// ==UserScript==
// @name         script-toxi
// @namespace    RisiBank.fr Script Officiel
// @version      3.0.1
// @description  Banque de stickers risitas, à porté d'un clic !
// @author       RisiBank Team
// @match        http://www.jeuxvideo.com/forums/*
// @match        http://m.jeuxvideo.com/forums/*
// @match        https://jvforum.fr/*
// @connect      risibank.fr
// @connect      api.risibank.fr
// @grant        GM_xmlhttpRequest
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_listValues
// @grant        GM_deleteValue
// @grant        GM_addStyle
// @icon         http://image.noelshack.com/fichiers/2016/47/1480023965-pict.png
// @noframes
// ==/UserScript==
! function(e) {
    function t(r) {
        if (n[r]) return n[r].exports;
        var i = n[r] = {
            exports: {},
            id: r,
            loaded: !1
        };
        return e[r].call(i.exports, i, i.exports, t), i.loaded = !0, i.exports
    }
    var n = {};
    return t.m = e, t.c = n, t.p = "", t(0)
}([function(e, t, n) {
            "use strict";
            var r = n(1),
                i = n(2),
                o = n(5),
                a = n(6),
                s = n(8),
                l = "3.0.1",
                c = "http://api.risibank.fr/script/changelog.json?d=" + (new Date).getTime(),
                u = "http://api.risibank.fr/script/RisiBank.user.js",
                p = n(9),
                d = n(10);
            void 0 === GM_getValue("tab-selected") && GM_setValue("tab-selected", !1), void 0 === GM_getValue("cat-selected") && GM_setValue("cat-selected", 0), void 0 === GM_getValue("risi-fav") && GM_setValue("risi-fav", "[]"), void 0 === GM_getValue("risi-used") && GM_setValue("risi-used", "[]"), void 0 === GM_getValue("ignored-versions") && GM_setValue("ignored-versions", "[]"), void 0 === GM_getValue("mode-integre") && GM_setValue("mode-integre", !1), void 0 === GM_getValue("fond-blanc") && GM_setValue("fond-blanc", !0), void 0 === GM_getValue("gif") && GM_setValue("gif", !0), void 0 === GM_getValue("recup-post") && GM_setValue("recup-post", !0), void 0 === GM_getValue("recup-postmobile") && GM_setValue("recup-postmobile", !1), void 0 === GM_getValue("eco-data") && GM_setValue("eco-data", !1), void 0 === GM_getValue("youtube") && GM_setValue("youtube", !0), void 0 === GM_getValue("issouwebm") && GM_setValue("issouwebm", !0), void 0 === GM_getValue("vocaroo") && GM_setValue("vocaroo", !0), void 0 === GM_getValue("webm") && GM_setValue("webm", !0), r(function() {
                a.updater_start(l, c, u), "www.jeuxvideo.com" == window.location.hostname && GM_getValue("mode-integre") && r(window).width() > 569 ? (s.plugins_start(1, !0), GM_addStyle(p), i.tabrisibak_start()) : "m.jeuxvideo.com" == window.location.hostname ? (0 != r(".bloc-nom-sujet").length && s.plugins_start(0, !1), 0 != r("#message_topic").length && (GM_addStyle(d), o.overlay_start(0))) : "www.jeuxvideo.com" == window.location.host ? (s.plugins_start(1, !1), GM_addStyle(d), o.overlay_start(1)) : (GM_addStyle(d), o.overlay_start(2))
            })
        }, function(e, t, n) {
            var r, i;
            /*!	 * jQuery JavaScript Library v3.1.1
	 * https://jquery.com/
	 *
	 * Includes Sizzle.js
	 * https://sizzlejs.com/
	 *
	 * Copyright jQuery Foundation and other contributors
	 * Released under the MIT license
	 * https://jquery.org/license
	 *
	 * Date: 2016-09-22T22:30Z
	 */
!function(t,n){"use strict";"object"==typeof e&&"object"==typeof e.exports?e.exports=t.document?n(t,!0):function(e){if(!e.document)throw new Error("jQuery requires a window with a document");return n(e)}:n(t)}("undefined"!=typeof window?window:this,function(n,o){"use strict";function a(e,t){t=t||oe;var n=t.createElement("script");n.text=e,t.head.appendChild(n).parentNode.removeChild(n)}function s(e){var t=!!e&&"length"in e&&e.length,n=xe.type(e);return"function"!==n&&!xe.isWindow(e)&&("array"===n||0===t||"number"==typeof t&&t>0&&t-1 in e)}function l(e,t,n){return xe.isFunction(t)?xe.grep(e,function(e,r){return!!t.call(e,r,e)!==n}):t.nodeType?xe.grep(e,function(e){return e===t!==n}):"string"!=typeof t?xe.grep(e,function(e){return ue.call(t,e)>-1!==n}):Ne.test(t)?xe.filter(t,e,n):(t=xe.filter(t,e),xe.grep(e,function(e){return ue.call(t,e)>-1!==n&&1===e.nodeType}))}function c(e,t){for(;(e=e[t])&&1!==e.nodeType;);return e}function u(e){var t={};return xe.each(e.match(Ge)||[],function(e,n){t[n]=!0}),t}function p(e){return e}function d(e){throw e}function f(e,t,n){var r;try{e&&xe.isFunction(r=e.promise)?r.call(e).done(t).fail(n):e&&xe.isFunction(r=e.then)?r.call(e,t,n):t.call(void 0,e)}catch(e){n.call(void 0,e)}}function h(){oe.removeEventListener("DOMContentLoaded",h),n.removeEventListener("load",h),xe.ready()}function m(){this.expando=xe.expando+m.uid++}function g(e){return"true"===e||"false"!==e&&("null"===e?null:e===+e+""?+e:Pe.test(e)?JSON.parse(e):e)}function v(e,t,n){var r;if(void 0===n&&1===e.nodeType)if(r="data-"+t.replace(Ie,"-$&").toLowerCase(),n=e.getAttribute(r),"string"==typeof n){try{n=g(n)}catch(e){}Re.set(e,t,n)}else n=void 0;return n}function x(e,t,n,r){var i,o=1,a=20,s=r?function(){return r.cur()}:function(){return xe.css(e,t,"")},l=s(),c=n&&n[3]||(xe.cssNumber[t]?"":"px"),u=(xe.cssNumber[t]||"px"!==c&&+l)&&ze.exec(xe.css(e,t));if(u&&u[3]!==c){c=c||u[3],n=n||[],u=+l||1;do o=o||".5",u/=o,xe.style(e,t,u+c);while(o!==(o=s()/l)&&1!==o&&--a)}return n&&(u=+u||+l||0,i=n[1]?u+(n[1]+1)*n[2]:+n[2],r&&(r.unit=c,r.start=u,r.end=i)),i}function b(e){var t,n=e.ownerDocument,r=e.nodeName,i=Xe[r];return i?i:(t=n.body.appendChild(n.createElement(r)),i=xe.css(t,"display"),t.parentNode.removeChild(t),"none"===i&&(i="block"),Xe[r]=i,i)}function y(e,t){for(var n,r,i=[],o=0,a=e.length;o<a;o++)r=e[o],r.style&&(n=r.style.display,t?("none"===n&&(i[o]=He.get(r,"display")||null,i[o]||(r.style.display="")),""===r.style.display&&Be(r)&&(i[o]=b(r))):"none"!==n&&(i[o]="none",He.set(r,"display",n)));for(o=0;o<a;o++)null!=i[o]&&(e[o].style.display=i[o]);return e}function w(e,t){var n;return n="undefined"!=typeof e.getElementsByTagName?e.getElementsByTagName(t||"*"):"undefined"!=typeof e.querySelectorAll?e.querySelectorAll(t||"*"):[],void 0===t||t&&xe.nodeName(e,t)?xe.merge([e],n):n}function k(e,t){for(var n=0,r=e.length;n<r;n++)He.set(e[n],"globalEval",!t||He.get(t[n],"globalEval"))}function T(e,t,n,r,i){for(var o,a,s,l,c,u,p=t.createDocumentFragment(),d=[],f=0,h=e.length;f<h;f++)if(o=e[f],o||0===o)if("object"===xe.type(o))xe.merge(d,o.nodeType?[o]:o);else if(Ze.test(o)){for(a=a||p.appendChild(t.createElement("div")),s=(Ye.exec(o)||["",""])[1].toLowerCase(),l=Ke[s]||Ke._default,a.innerHTML=l[1]+xe.htmlPrefilter(o)+l[2],u=l[0];u--;)a=a.lastChild;xe.merge(d,a.childNodes),a=p.firstChild,a.textContent=""}else d.push(t.createTextNode(o));for(p.textContent="",f=0;o=d[f++];)if(r&&xe.inArray(o,r)>-1)i&&i.push(o);else if(c=xe.contains(o.ownerDocument,o),a=w(p.appendChild(o),"script"),c&&k(a),n)for(u=0;o=a[u++];)Qe.test(o.type||"")&&n.push(o);return p}function C(){return!0}function _(){return!1}function S(){try{return oe.activeElement}catch(e){}}function j(e,t,n,r,i,o){var a,s;if("object"==typeof t){"string"!=typeof n&&(r=r||n,n=void 0);for(s in t)j(e,s,n,r,t[s],o);return e}if(null==r&&null==i?(i=n,r=n=void 0):null==i&&("string"==typeof n?(i=r,r=void 0):(i=r,r=n,n=void 0)),i===!1)i=_;else if(!i)return e;return 1===o&&(a=i,i=function(e){return xe().off(e),a.apply(this,arguments)},i.guid=a.guid||(a.guid=xe.guid++)),e.each(function(){xe.event.add(this,t,i,r,n)})}function N(e,t){return xe.nodeName(e,"table")&&xe.nodeName(11!==t.nodeType?t:t.firstChild,"tr")?e.getElementsByTagName("tbody")[0]||e:e}function M(e){return e.type=(null!==e.getAttribute("type"))+"/"+e.type,e}function E(e){var t=st.exec(e.type);return t?e.type=t[1]:e.removeAttribute("type"),e}function D(e,t){var n,r,i,o,a,s,l,c;if(1===t.nodeType){if(He.hasData(e)&&(o=He.access(e),a=He.set(t,o),c=o.events)){delete a.handle,a.events={};for(i in c)for(n=0,r=c[i].length;n<r;n++)xe.event.add(t,i,c[i][n])}Re.hasData(e)&&(s=Re.access(e),l=xe.extend({},s),Re.set(t,l))}}function A(e,t){var n=t.nodeName.toLowerCase();"input"===n&&Ue.test(e.type)?t.checked=e.checked:"input"!==n&&"textarea"!==n||(t.defaultValue=e.defaultValue)}function V(e,t,n,r){t=le.apply([],t);var i,o,s,l,c,u,p=0,d=e.length,f=d-1,h=t[0],m=xe.isFunction(h);if(m||d>1&&"string"==typeof h&&!ge.checkClone&&at.test(h))return e.each(function(i){var o=e.eq(i);m&&(t[0]=h.call(this,i,o.html())),V(o,t,n,r)});if(d&&(i=T(t,e[0].ownerDocument,!1,e,r),o=i.firstChild,1===i.childNodes.length&&(i=o),o||r)){for(s=xe.map(w(i,"script"),M),l=s.length;p<d;p++)c=i,p!==f&&(c=xe.clone(c,!0,!0),l&&xe.merge(s,w(c,"script"))),n.call(e[p],c,p);if(l)for(u=s[s.length-1].ownerDocument,xe.map(s,E),p=0;p<l;p++)c=s[p],Qe.test(c.type||"")&&!He.access(c,"globalEval")&&xe.contains(u,c)&&(c.src?xe._evalUrl&&xe._evalUrl(c.src):a(c.textContent.replace(lt,""),u))}return e}function G(e,t,n){for(var r,i=t?xe.filter(t,e):e,o=0;null!=(r=i[o]);o++)n||1!==r.nodeType||xe.cleanData(w(r)),r.parentNode&&(n&&xe.contains(r.ownerDocument,r)&&k(w(r,"script")),r.parentNode.removeChild(r));return e}function L(e,t,n){var r,i,o,a,s=e.style;return n=n||pt(e),n&&(a=n.getPropertyValue(t)||n[t],""!==a||xe.contains(e.ownerDocument,e)||(a=xe.style(e,t)),!ge.pixelMarginRight()&&ut.test(a)&&ct.test(t)&&(r=s.width,i=s.minWidth,o=s.maxWidth,s.minWidth=s.maxWidth=s.width=a,a=n.width,s.width=r,s.minWidth=i,s.maxWidth=o)),void 0!==a?a+"":a}function O(e,t){return{get:function(){return e()?void delete this.get:(this.get=t).apply(this,arguments)}}}function q(e){if(e in gt)return e;for(var t=e[0].toUpperCase()+e.slice(1),n=mt.length;n--;)if(e=mt[n]+t,e in gt)return e}function F(e,t,n){var r=ze.exec(t);return r?Math.max(0,r[2]-(n||0))+(r[3]||"px"):t}function H(e,t,n,r,i){var o,a=0;for(o=n===(r?"border":"content")?4:"width"===t?1:0;o<4;o+=2)"margin"===n&&(a+=xe.css(e,n+$e[o],!0,i)),r?("content"===n&&(a-=xe.css(e,"padding"+$e[o],!0,i)),"margin"!==n&&(a-=xe.css(e,"border"+$e[o]+"Width",!0,i))):(a+=xe.css(e,"padding"+$e[o],!0,i),"padding"!==n&&(a+=xe.css(e,"border"+$e[o]+"Width",!0,i)));return a}function R(e,t,n){var r,i=!0,o=pt(e),a="border-box"===xe.css(e,"boxSizing",!1,o);if(e.getClientRects().length&&(r=e.getBoundingClientRect()[t]),r<=0||null==r){if(r=L(e,t,o),(r<0||null==r)&&(r=e.style[t]),ut.test(r))return r;i=a&&(ge.boxSizingReliable()||r===e.style[t]),r=parseFloat(r)||0}return r+H(e,t,n||(a?"border":"content"),i,o)+"px"}function P(e,t,n,r,i){return new P.prototype.init(e,t,n,r,i)}function I(){xt&&(n.requestAnimationFrame(I),xe.fx.tick())}function W(){return n.setTimeout(function(){vt=void 0}),vt=xe.now()}function z(e,t){var n,r=0,i={height:e};for(t=t?1:0;r<4;r+=2-t)n=$e[r],i["margin"+n]=i["padding"+n]=e;return t&&(i.opacity=i.width=e),i}function $(e,t,n){for(var r,i=(X.tweeners[t]||[]).concat(X.tweeners["*"]),o=0,a=i.length;o<a;o++)if(r=i[o].call(n,t,e))return r}function B(e,t,n){var r,i,o,a,s,l,c,u,p="width"in t||"height"in t,d=this,f={},h=e.style,m=e.nodeType&&Be(e),g=He.get(e,"fxshow");n.queue||(a=xe._queueHooks(e,"fx"),null==a.unqueued&&(a.unqueued=0,s=a.empty.fire,a.empty.fire=function(){a.unqueued||s()}),a.unqueued++,d.always(function(){d.always(function(){a.unqueued--,xe.queue(e,"fx").length||a.empty.fire()})}));for(r in t)if(i=t[r],bt.test(i)){if(delete t[r],o=o||"toggle"===i,i===(m?"hide":"show")){if("show"!==i||!g||void 0===g[r])continue;m=!0}f[r]=g&&g[r]||xe.style(e,r)}if(l=!xe.isEmptyObject(t),l||!xe.isEmptyObject(f)){p&&1===e.nodeType&&(n.overflow=[h.overflow,h.overflowX,h.overflowY],c=g&&g.display,null==c&&(c=He.get(e,"display")),u=xe.css(e,"display"),"none"===u&&(c?u=c:(y([e],!0),c=e.style.display||c,u=xe.css(e,"display"),y([e]))),("inline"===u||"inline-block"===u&&null!=c)&&"none"===xe.css(e,"float")&&(l||(d.done(function(){h.display=c}),null==c&&(u=h.display,c="none"===u?"":u)),h.display="inline-block")),n.overflow&&(h.overflow="hidden",d.always(function(){h.overflow=n.overflow[0],h.overflowX=n.overflow[1],h.overflowY=n.overflow[2]})),l=!1;for(r in f)l||(g?"hidden"in g&&(m=g.hidden):g=He.access(e,"fxshow",{display:c}),o&&(g.hidden=!m),m&&y([e],!0),d.done(function(){m||y([e]),He.remove(e,"fxshow");for(r in f)xe.style(e,r,f[r])})),l=$(m?g[r]:0,r,d),r in g||(g[r]=l.start,m&&(l.end=l.start,l.start=0))}}function J(e,t){var n,r,i,o,a;for(n in e)if(r=xe.camelCase(n),i=t[r],o=e[n],xe.isArray(o)&&(i=o[1],o=e[n]=o[0]),n!==r&&(e[r]=o,delete e[n]),a=xe.cssHooks[r],a&&"expand"in a){o=a.expand(o),delete e[r];for(n in o)n in e||(e[n]=o[n],t[n]=i)}else t[r]=i}function X(e,t,n){var r,i,o=0,a=X.prefilters.length,s=xe.Deferred().always(function(){delete l.elem}),l=function(){if(i)return!1;for(var t=vt||W(),n=Math.max(0,c.startTime+c.duration-t),r=n/c.duration||0,o=1-r,a=0,l=c.tweens.length;a<l;a++)c.tweens[a].run(o);return s.notifyWith(e,[c,o,n]),o<1&&l?n:(s.resolveWith(e,[c]),!1)},c=s.promise({elem:e,props:xe.extend({},t),opts:xe.extend(!0,{specialEasing:{},easing:xe.easing._default},n),originalProperties:t,originalOptions:n,startTime:vt||W(),duration:n.duration,tweens:[],createTween:function(t,n){var r=xe.Tween(e,c.opts,t,n,c.opts.specialEasing[t]||c.opts.easing);return c.tweens.push(r),r},stop:function(t){var n=0,r=t?c.tweens.length:0;if(i)return this;for(i=!0;n<r;n++)c.tweens[n].run(1);return t?(s.notifyWith(e,[c,1,0]),s.resolveWith(e,[c,t])):s.rejectWith(e,[c,t]),this}}),u=c.props;for(J(u,c.opts.specialEasing);o<a;o++)if(r=X.prefilters[o].call(c,e,u,c.opts))return xe.isFunction(r.stop)&&(xe._queueHooks(c.elem,c.opts.queue).stop=xe.proxy(r.stop,r)),r;return xe.map(u,$,c),xe.isFunction(c.opts.start)&&c.opts.start.call(e,c),xe.fx.timer(xe.extend(l,{elem:e,anim:c,queue:c.opts.queue})),c.progress(c.opts.progress).done(c.opts.done,c.opts.complete).fail(c.opts.fail).always(c.opts.always)}function U(e){var t=e.match(Ge)||[];return t.join(" ")}function Y(e){return e.getAttribute&&e.getAttribute("class")||""}function Q(e,t,n,r){var i;if(xe.isArray(t))xe.each(t,function(t,i){n||Et.test(e)?r(e,i):Q(e+"["+("object"==typeof i&&null!=i?t:"")+"]",i,n,r)});else if(n||"object"!==xe.type(t))r(e,t);else for(i in t)Q(e+"["+i+"]",t[i],n,r)}function K(e){return function(t,n){"string"!=typeof t&&(n=t,t="*");var r,i=0,o=t.toLowerCase().match(Ge)||[];if(xe.isFunction(n))for(;r=o[i++];)"+"===r[0]?(r=r.slice(1)||"*",(e[r]=e[r]||[]).unshift(n)):(e[r]=e[r]||[]).push(n)}}function Z(e,t,n,r){function i(s){var l;return o[s]=!0,xe.each(e[s]||[],function(e,s){var c=s(t,n,r);return"string"!=typeof c||a||o[c]?a?!(l=c):void 0:(t.dataTypes.unshift(c),i(c),!1)}),l}var o={},a=e===It;return i(t.dataTypes[0])||!o["*"]&&i("*")}function ee(e,t){var n,r,i=xe.ajaxSettings.flatOptions||{};for(n in t)void 0!==t[n]&&((i[n]?e:r||(r={}))[n]=t[n]);return r&&xe.extend(!0,e,r),e}function te(e,t,n){for(var r,i,o,a,s=e.contents,l=e.dataTypes;"*"===l[0];)l.shift(),void 0===r&&(r=e.mimeType||t.getResponseHeader("Content-Type"));if(r)for(i in s)if(s[i]&&s[i].test(r)){l.unshift(i);break}if(l[0]in n)o=l[0];else{for(i in n){if(!l[0]||e.converters[i+" "+l[0]]){o=i;break}a||(a=i)}o=o||a}if(o)return o!==l[0]&&l.unshift(o),n[o]}function ne(e,t,n,r){var i,o,a,s,l,c={},u=e.dataTypes.slice();if(u[1])for(a in e.converters)c[a.toLowerCase()]=e.converters[a];for(o=u.shift();o;)if(e.responseFields[o]&&(n[e.responseFields[o]]=t),!l&&r&&e.dataFilter&&(t=e.dataFilter(t,e.dataType)),l=o,o=u.shift())if("*"===o)o=l;else if("*"!==l&&l!==o){if(a=c[l+" "+o]||c["* "+o],!a)for(i in c)if(s=i.split(" "),s[1]===o&&(a=c[l+" "+s[0]]||c["* "+s[0]])){a===!0?a=c[i]:c[i]!==!0&&(o=s[0],u.unshift(s[1]));break}if(a!==!0)if(a&&e.throws)t=a(t);else try{t=a(t)}catch(e){return{state:"parsererror",error:a?e:"No conversion from "+l+" to "+o}}}return{state:"success",data:t}}function re(e){return xe.isWindow(e)?e:9===e.nodeType&&e.defaultView}var ie=[],oe=n.document,ae=Object.getPrototypeOf,se=ie.slice,le=ie.concat,ce=ie.push,ue=ie.indexOf,pe={},de=pe.toString,fe=pe.hasOwnProperty,he=fe.toString,me=he.call(Object),ge={},ve="3.1.1",xe=function(e,t){return new xe.fn.init(e,t)},be=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,ye=/^-ms-/,we=/-([a-z])/g,ke=function(e,t){return t.toUpperCase()};xe.fn=xe.prototype={jquery:ve,constructor:xe,length:0,toArray:function(){return se.call(this)},get:function(e){return null==e?se.call(this):e<0?this[e+this.length]:this[e]},pushStack:function(e){var t=xe.merge(this.constructor(),e);return t.prevObject=this,t},each:function(e){return xe.each(this,e)},map:function(e){return this.pushStack(xe.map(this,function(t,n){return e.call(t,n,t)}))},slice:function(){return this.pushStack(se.apply(this,arguments))},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},eq:function(e){var t=this.length,n=+e+(e<0?t:0);return this.pushStack(n>=0&&n<t?[this[n]]:[])},end:function(){return this.prevObject||this.constructor()},push:ce,sort:ie.sort,splice:ie.splice},xe.extend=xe.fn.extend=function(){var e,t,n,r,i,o,a=arguments[0]||{},s=1,l=arguments.length,c=!1;for("boolean"==typeof a&&(c=a,a=arguments[s]||{},s++),"object"==typeof a||xe.isFunction(a)||(a={}),s===l&&(a=this,s--);s<l;s++)if(null!=(e=arguments[s]))for(t in e)n=a[t],r=e[t],a!==r&&(c&&r&&(xe.isPlainObject(r)||(i=xe.isArray(r)))?(i?(i=!1,o=n&&xe.isArray(n)?n:[]):o=n&&xe.isPlainObject(n)?n:{},a[t]=xe.extend(c,o,r)):void 0!==r&&(a[t]=r));return a},xe.extend({expando:"jQuery"+(ve+Math.random()).replace(/\D/g,""),isReady:!0,error:function(e){throw new Error(e)},noop:function(){},isFunction:function(e){return"function"===xe.type(e)},isArray:Array.isArray,isWindow:function(e){return null!=e&&e===e.window},isNumeric:function(e){var t=xe.type(e);return("number"===t||"string"===t)&&!isNaN(e-parseFloat(e))},isPlainObject:function(e){var t,n;return!(!e||"[object Object]"!==de.call(e))&&(!(t=ae(e))||(n=fe.call(t,"constructor")&&t.constructor,"function"==typeof n&&he.call(n)===me))},isEmptyObject:function(e){var t;for(t in e)return!1;return!0},type:function(e){return null==e?e+"":"object"==typeof e||"function"==typeof e?pe[de.call(e)]||"object":typeof e},globalEval:function(e){a(e)},camelCase:function(e){return e.replace(ye,"ms-").replace(we,ke)},nodeName:function(e,t){return e.nodeName&&e.nodeName.toLowerCase()===t.toLowerCase()},each:function(e,t){var n,r=0;if(s(e))for(n=e.length;r<n&&t.call(e[r],r,e[r])!==!1;r++);else for(r in e)if(t.call(e[r],r,e[r])===!1)break;return e},trim:function(e){return null==e?"":(e+"").replace(be,"")},makeArray:function(e,t){var n=t||[];return null!=e&&(s(Object(e))?xe.merge(n,"string"==typeof e?[e]:e):ce.call(n,e)),n},inArray:function(e,t,n){return null==t?-1:ue.call(t,e,n)},merge:function(e,t){for(var n=+t.length,r=0,i=e.length;r<n;r++)e[i++]=t[r];return e.length=i,e},grep:function(e,t,n){for(var r,i=[],o=0,a=e.length,s=!n;o<a;o++)r=!t(e[o],o),r!==s&&i.push(e[o]);return i},map:function(e,t,n){var r,i,o=0,a=[];if(s(e))for(r=e.length;o<r;o++)i=t(e[o],o,n),null!=i&&a.push(i);else for(o in e)i=t(e[o],o,n),null!=i&&a.push(i);return le.apply([],a)},guid:1,proxy:function(e,t){var n,r,i;if("string"==typeof t&&(n=e[t],t=e,e=n),xe.isFunction(e))return r=se.call(arguments,2),i=function(){return e.apply(t||this,r.concat(se.call(arguments)))},i.guid=e.guid=e.guid||xe.guid++,i},now:Date.now,support:ge}),"function"==typeof Symbol&&(xe.fn[Symbol.iterator]=ie[Symbol.iterator]),xe.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "),function(e,t){pe["[object "+t+"]"]=t.toLowerCase()});var Te=/*!
	 * Sizzle CSS Selector Engine v2.3.3
	 * https://sizzlejs.com/
	 *
	 * Copyright jQuery Foundation and other contributors
	 * Released under the MIT license
	 * http://jquery.org/license
	 *
	 * Date: 2016-08-08
	 */
function(e) {
    function t(e, t, n, r) {
        var i, o, a, s, l, c, u, d = t && t.ownerDocument,
            h = t ? t.nodeType : 9;
        if (n = n || [], "string" != typeof e || !e || 1 !== h && 9 !== h && 11 !== h) return n;
        if (!r && ((t ? t.ownerDocument || t : P) !== V && A(t), t = t || V, L)) {
            if (11 !== h && (l = ve.exec(e)))
                if (i = l[1]) {
                    if (9 === h) {
                        if (!(a = t.getElementById(i))) return n;
                        if (a.id === i) return n.push(a), n
                    } else if (d && (a = d.getElementById(i)) && H(t, a) && a.id === i) return n.push(a), n
                } else {
                    if (l[2]) return K.apply(n, t.getElementsByTagName(e)), n;
                    if ((i = l[3]) && k.getElementsByClassName && t.getElementsByClassName) return K.apply(n, t.getElementsByClassName(i)), n
                }
            if (k.qsa && !B[e + " "] && (!O || !O.test(e))) {
                if (1 !== h) d = t, u = e;
                else if ("object" !== t.nodeName.toLowerCase()) {
                    for ((s = t.getAttribute("id")) ? s = s.replace(we, ke) : t.setAttribute("id", s = R), c = S(e), o = c.length; o--;) c[o] = "#" + s + " " + f(c[o]);
                    u = c.join(","), d = xe.test(e) && p(t.parentNode) || t
                }
                if (u) try {
                    return K.apply(n, d.querySelectorAll(u)), n
                } catch (e) {} finally {
                    s === R && t.removeAttribute("id")
                }
            }
        }
        return N(e.replace(se, "$1"), t, n, r)
    }

    function n() {
        function e(n, r) {
            return t.push(n + " ") > T.cacheLength && delete e[t.shift()], e[n + " "] = r
        }
        var t = [];
        return e
    }

    function r(e) {
        return e[R] = !0, e
    }

    function i(e) {
        var t = V.createElement("fieldset");
        try {
            return !!e(t)
        } catch (e) {
            return !1
        } finally {
            t.parentNode && t.parentNode.removeChild(t), t = null
        }
    }

    function o(e, t) {
        for (var n = e.split("|"), r = n.length; r--;) T.attrHandle[n[r]] = t
    }

    function a(e, t) {
        var n = t && e,
            r = n && 1 === e.nodeType && 1 === t.nodeType && e.sourceIndex - t.sourceIndex;
        if (r) return r;
        if (n)
            for (; n = n.nextSibling;)
                if (n === t) return -1;
        return e ? 1 : -1
    }

    function s(e) {
        return function(t) {
            var n = t.nodeName.toLowerCase();
            return "input" === n && t.type === e
        }
    }

    function l(e) {
        return function(t) {
            var n = t.nodeName.toLowerCase();
            return ("input" === n || "button" === n) && t.type === e
        }
    }

    function c(e) {
        return function(t) {
            return "form" in t ? t.parentNode && t.disabled === !1 ? "label" in t ? "label" in t.parentNode ? t.parentNode.disabled === e : t.disabled === e : t.isDisabled === e || t.isDisabled !== !e && Ce(t) === e : t.disabled === e : "label" in t && t.disabled === e
        }
    }

    function u(e) {
        return r(function(t) {
            return t = +t, r(function(n, r) {
                for (var i, o = e([], n.length, t), a = o.length; a--;) n[i = o[a]] && (n[i] = !(r[i] = n[i]))
            })
        })
    }

    function p(e) {
        return e && "undefined" != typeof e.getElementsByTagName && e
    }

    function d() {}

    function f(e) {
        for (var t = 0, n = e.length, r = ""; t < n; t++) r += e[t].value;
        return r
    }

    function h(e, t, n) {
        var r = t.dir,
            i = t.next,
            o = i || r,
            a = n && "parentNode" === o,
            s = W++;
        return t.first ? function(t, n, i) {
            for (; t = t[r];)
                if (1 === t.nodeType || a) return e(t, n, i);
            return !1
        } : function(t, n, l) {
            var c, u, p, d = [I, s];
            if (l) {
                for (; t = t[r];)
                    if ((1 === t.nodeType || a) && e(t, n, l)) return !0
            } else
                for (; t = t[r];)
                    if (1 === t.nodeType || a)
                        if (p = t[R] || (t[R] = {}), u = p[t.uniqueID] || (p[t.uniqueID] = {}), i && i === t.nodeName.toLowerCase()) t = t[r] || t;
                        else {
                            if ((c = u[o]) && c[0] === I && c[1] === s) return d[2] = c[2];
                            if (u[o] = d, d[2] = e(t, n, l)) return !0
                        } return !1
        }
    }

    function m(e) {
        return e.length > 1 ? function(t, n, r) {
            for (var i = e.length; i--;)
                if (!e[i](t, n, r)) return !1;
            return !0
        } : e[0]
    }

    function g(e, n, r) {
        for (var i = 0, o = n.length; i < o; i++) t(e, n[i], r);
        return r
    }

    function v(e, t, n, r, i) {
        for (var o, a = [], s = 0, l = e.length, c = null != t; s < l; s++)(o = e[s]) && (n && !n(o, r, i) || (a.push(o), c && t.push(s)));
        return a
    }

    function x(e, t, n, i, o, a) {
        return i && !i[R] && (i = x(i)), o && !o[R] && (o = x(o, a)), r(function(r, a, s, l) {
            var c, u, p, d = [],
                f = [],
                h = a.length,
                m = r || g(t || "*", s.nodeType ? [s] : s, []),
                x = !e || !r && t ? m : v(m, d, e, s, l),
                b = n ? o || (r ? e : h || i) ? [] : a : x;
            if (n && n(x, b, s, l), i)
                for (c = v(b, f), i(c, [], s, l), u = c.length; u--;)(p = c[u]) && (b[f[u]] = !(x[f[u]] = p));
            if (r) {
                if (o || e) {
                    if (o) {
                        for (c = [], u = b.length; u--;)(p = b[u]) && c.push(x[u] = p);
                        o(null, b = [], c, l)
                    }
                    for (u = b.length; u--;)(p = b[u]) && (c = o ? ee(r, p) : d[u]) > -1 && (r[c] = !(a[c] = p))
                }
            } else b = v(b === a ? b.splice(h, b.length) : b), o ? o(null, a, b, l) : K.apply(a, b)
        })
    }

    function b(e) {
        for (var t, n, r, i = e.length, o = T.relative[e[0].type], a = o || T.relative[" "], s = o ? 1 : 0, l = h(function(e) {
                return e === t
            }, a, !0), c = h(function(e) {
                return ee(t, e) > -1
            }, a, !0), u = [function(e, n, r) {
                var i = !o && (r || n !== M) || ((t = n).nodeType ? l(e, n, r) : c(e, n, r));
                return t = null, i
            }]; s < i; s++)
            if (n = T.relative[e[s].type]) u = [h(m(u), n)];
            else {
                if (n = T.filter[e[s].type].apply(null, e[s].matches), n[R]) {
                    for (r = ++s; r < i && !T.relative[e[r].type]; r++);
                    return x(s > 1 && m(u), s > 1 && f(e.slice(0, s - 1).concat({
                        value: " " === e[s - 2].type ? "*" : ""
                    })).replace(se, "$1"), n, s < r && b(e.slice(s, r)), r < i && b(e = e.slice(r)), r < i && f(e))
                }
                u.push(n)
            }
        return m(u)
    }

    function y(e, n) {
        var i = n.length > 0,
            o = e.length > 0,
            a = function(r, a, s, l, c) {
                var u, p, d, f = 0,
                    h = "0",
                    m = r && [],
                    g = [],
                    x = M,
                    b = r || o && T.find.TAG("*", c),
                    y = I += null == x ? 1 : Math.random() || .1,
                    w = b.length;
                for (c && (M = a === V || a || c); h !== w && null != (u = b[h]); h++) {
                    if (o && u) {
                        for (p = 0, a || u.ownerDocument === V || (A(u), s = !L); d = e[p++];)
                            if (d(u, a || V, s)) {
                                l.push(u);
                                break
                            }
                        c && (I = y)
                    }
                    i && ((u = !d && u) && f--, r && m.push(u))
                }
                if (f += h, i && h !== f) {
                    for (p = 0; d = n[p++];) d(m, g, a, s);
                    if (r) {
                        if (f > 0)
                            for (; h--;) m[h] || g[h] || (g[h] = Y.call(l));
                        g = v(g)
                    }
                    K.apply(l, g), c && !r && g.length > 0 && f + n.length > 1 && t.uniqueSort(l)
                }
                return c && (I = y, M = x), m
            };
        return i ? r(a) : a
    }
    var w, k, T, C, _, S, j, N, M, E, D, A, V, G, L, O, q, F, H, R = "sizzle" + 1 * new Date,
        P = e.document,
        I = 0,
        W = 0,
        z = n(),
        $ = n(),
        B = n(),
        J = function(e, t) {
            return e === t && (D = !0), 0
        },
        X = {}.hasOwnProperty,
        U = [],
        Y = U.pop,
        Q = U.push,
        K = U.push,
        Z = U.slice,
        ee = function(e, t) {
            for (var n = 0, r = e.length; n < r; n++)
                if (e[n] === t) return n;
            return -1
        },
        te = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
        ne = "[\\x20\\t\\r\\n\\f]",
        re = "(?:\\\\.|[\\w-]|[^\0-\\xa0])+",
        ie = "\\[" + ne + "*(" + re + ")(?:" + ne + "*([*^$|!~]?=)" + ne + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + re + "))|)" + ne + "*\\]",
        oe = ":(" + re + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + ie + ")*)|.*)\\)|)",
        ae = new RegExp(ne + "+", "g"),
        se = new RegExp("^" + ne + "+|((?:^|[^\\\\])(?:\\\\.)*)" + ne + "+$", "g"),
        le = new RegExp("^" + ne + "*," + ne + "*"),
        ce = new RegExp("^" + ne + "*([>+~]|" + ne + ")" + ne + "*"),
        ue = new RegExp("=" + ne + "*([^\\]'\"]*?)" + ne + "*\\]", "g"),
        pe = new RegExp(oe),
        de = new RegExp("^" + re + "$"),
        fe = {
            ID: new RegExp("^#(" + re + ")"),
            CLASS: new RegExp("^\\.(" + re + ")"),
            TAG: new RegExp("^(" + re + "|[*])"),
            ATTR: new RegExp("^" + ie),
            PSEUDO: new RegExp("^" + oe),
            CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + ne + "*(even|odd|(([+-]|)(\\d*)n|)" + ne + "*(?:([+-]|)" + ne + "*(\\d+)|))" + ne + "*\\)|)", "i"),
            bool: new RegExp("^(?:" + te + ")$", "i"),
            needsContext: new RegExp("^" + ne + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + ne + "*((?:-\\d)?\\d*)" + ne + "*\\)|)(?=[^-]|$)", "i")
        },
        he = /^(?:input|select|textarea|button)$/i,
        me = /^h\d$/i,
        ge = /^[^{]+\{\s*\[native \w/,
        ve = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
        xe = /[+~]/,
        be = new RegExp("\\\\([\\da-f]{1,6}" + ne + "?|(" + ne + ")|.)", "ig"),
        ye = function(e, t, n) {
            var r = "0x" + t - 65536;
            return r !== r || n ? t : r < 0 ? String.fromCharCode(r + 65536) : String.fromCharCode(r >> 10 | 55296, 1023 & r | 56320)
        },
        we = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
        ke = function(e, t) {
            return t ? "\0" === e ? "�" : e.slice(0, -1) + "\\" + e.charCodeAt(e.length - 1).toString(16) + " " : "\\" + e
        },
        Te = function() {
            A()
        },
        Ce = h(function(e) {
            return e.disabled === !0 && ("form" in e || "label" in e)
        }, {
            dir: "parentNode",
            next: "legend"
        });
    try {
        K.apply(U = Z.call(P.childNodes), P.childNodes), U[P.childNodes.length].nodeType
    } catch (e) {
        K = {
            apply: U.length ? function(e, t) {
                Q.apply(e, Z.call(t))
            } : function(e, t) {
                for (var n = e.length, r = 0; e[n++] = t[r++];);
                e.length = n - 1
            }
        }
    }
    k = t.support = {}, _ = t.isXML = function(e) {
        var t = e && (e.ownerDocument || e).documentElement;
        return !!t && "HTML" !== t.nodeName
    }, A = t.setDocument = function(e) {
        var t, n, r = e ? e.ownerDocument || e : P;
        return r !== V && 9 === r.nodeType && r.documentElement ? (V = r, G = V.documentElement, L = !_(V), P !== V && (n = V.defaultView) && n.top !== n && (n.addEventListener ? n.addEventListener("unload", Te, !1) : n.attachEvent && n.attachEvent("onunload", Te)), k.attributes = i(function(e) {
            return e.className = "i", !e.getAttribute("className")
        }), k.getElementsByTagName = i(function(e) {
            return e.appendChild(V.createComment("")), !e.getElementsByTagName("*").length
        }), k.getElementsByClassName = ge.test(V.getElementsByClassName), k.getById = i(function(e) {
            return G.appendChild(e).id = R, !V.getElementsByName || !V.getElementsByName(R).length
        }), k.getById ? (T.filter.ID = function(e) {
            var t = e.replace(be, ye);
            return function(e) {
                return e.getAttribute("id") === t
            }
        }, T.find.ID = function(e, t) {
            if ("undefined" != typeof t.getElementById && L) {
                var n = t.getElementById(e);
                return n ? [n] : []
            }
        }) : (T.filter.ID = function(e) {
            var t = e.replace(be, ye);
            return function(e) {
                var n = "undefined" != typeof e.getAttributeNode && e.getAttributeNode("id");
                return n && n.value === t
            }
        }, T.find.ID = function(e, t) {
            if ("undefined" != typeof t.getElementById && L) {
                var n, r, i, o = t.getElementById(e);
                if (o) {
                    if (n = o.getAttributeNode("id"), n && n.value === e) return [o];
                    for (i = t.getElementsByName(e), r = 0; o = i[r++];)
                        if (n = o.getAttributeNode("id"), n && n.value === e) return [o]
                }
                return []
            }
        }), T.find.TAG = k.getElementsByTagName ? function(e, t) {
            return "undefined" != typeof t.getElementsByTagName ? t.getElementsByTagName(e) : k.qsa ? t.querySelectorAll(e) : void 0
        } : function(e, t) {
            var n, r = [],
                i = 0,
                o = t.getElementsByTagName(e);
            if ("*" === e) {
                for (; n = o[i++];) 1 === n.nodeType && r.push(n);
                return r
            }
            return o
        }, T.find.CLASS = k.getElementsByClassName && function(e, t) {
            if ("undefined" != typeof t.getElementsByClassName && L) return t.getElementsByClassName(e)
        }, q = [], O = [], (k.qsa = ge.test(V.querySelectorAll)) && (i(function(e) {
            G.appendChild(e).innerHTML = "<a id='" + R + "'></a><select id='" + R + "-\r\\' msallowcapture=''><option selected=''></option></select>", e.querySelectorAll("[msallowcapture^='']").length && O.push("[*^$]=" + ne + "*(?:''|\"\")"), e.querySelectorAll("[selected]").length || O.push("\\[" + ne + "*(?:value|" + te + ")"), e.querySelectorAll("[id~=" + R + "-]").length || O.push("~="), e.querySelectorAll(":checked").length || O.push(":checked"), e.querySelectorAll("a#" + R + "+*").length || O.push(".#.+[+~]")
        }), i(function(e) {
            e.innerHTML = "<a href='' disabled='disabled'></a><select disabled='disabled'><option/></select>";
            var t = V.createElement("input");
            t.setAttribute("type", "hidden"), e.appendChild(t).setAttribute("name", "D"), e.querySelectorAll("[name=d]").length && O.push("name" + ne + "*[*^$|!~]?="), 2 !== e.querySelectorAll(":enabled").length && O.push(":enabled", ":disabled"), G.appendChild(e).disabled = !0, 2 !== e.querySelectorAll(":disabled").length && O.push(":enabled", ":disabled"), e.querySelectorAll("*,:x"), O.push(",.*:")
        })), (k.matchesSelector = ge.test(F = G.matches || G.webkitMatchesSelector || G.mozMatchesSelector || G.oMatchesSelector || G.msMatchesSelector)) && i(function(e) {
            k.disconnectedMatch = F.call(e, "*"), F.call(e, "[s!='']:x"), q.push("!=", oe)
        }), O = O.length && new RegExp(O.join("|")), q = q.length && new RegExp(q.join("|")), t = ge.test(G.compareDocumentPosition), H = t || ge.test(G.contains) ? function(e, t) {
            var n = 9 === e.nodeType ? e.documentElement : e,
                r = t && t.parentNode;
            return e === r || !(!r || 1 !== r.nodeType || !(n.contains ? n.contains(r) : e.compareDocumentPosition && 16 & e.compareDocumentPosition(r)))
        } : function(e, t) {
            if (t)
                for (; t = t.parentNode;)
                    if (t === e) return !0;
            return !1
        }, J = t ? function(e, t) {
            if (e === t) return D = !0, 0;
            var n = !e.compareDocumentPosition - !t.compareDocumentPosition;
            return n ? n : (n = (e.ownerDocument || e) === (t.ownerDocument || t) ? e.compareDocumentPosition(t) : 1, 1 & n || !k.sortDetached && t.compareDocumentPosition(e) === n ? e === V || e.ownerDocument === P && H(P, e) ? -1 : t === V || t.ownerDocument === P && H(P, t) ? 1 : E ? ee(E, e) - ee(E, t) : 0 : 4 & n ? -1 : 1)
        } : function(e, t) {
            if (e === t) return D = !0, 0;
            var n, r = 0,
                i = e.parentNode,
                o = t.parentNode,
                s = [e],
                l = [t];
            if (!i || !o) return e === V ? -1 : t === V ? 1 : i ? -1 : o ? 1 : E ? ee(E, e) - ee(E, t) : 0;
            if (i === o) return a(e, t);
            for (n = e; n = n.parentNode;) s.unshift(n);
            for (n = t; n = n.parentNode;) l.unshift(n);
            for (; s[r] === l[r];) r++;
            return r ? a(s[r], l[r]) : s[r] === P ? -1 : l[r] === P ? 1 : 0
        }, V) : V
    }, t.matches = function(e, n) {
        return t(e, null, null, n)
    }, t.matchesSelector = function(e, n) {
        if ((e.ownerDocument || e) !== V && A(e), n = n.replace(ue, "='$1']"), k.matchesSelector && L && !B[n + " "] && (!q || !q.test(n)) && (!O || !O.test(n))) try {
            var r = F.call(e, n);
            if (r || k.disconnectedMatch || e.document && 11 !== e.document.nodeType) return r
        } catch (e) {}
        return t(n, V, null, [e]).length > 0
    }, t.contains = function(e, t) {
        return (e.ownerDocument || e) !== V && A(e), H(e, t)
    }, t.attr = function(e, t) {
        (e.ownerDocument || e) !== V && A(e);
        var n = T.attrHandle[t.toLowerCase()],
            r = n && X.call(T.attrHandle, t.toLowerCase()) ? n(e, t, !L) : void 0;
        return void 0 !== r ? r : k.attributes || !L ? e.getAttribute(t) : (r = e.getAttributeNode(t)) && r.specified ? r.value : null
    }, t.escape = function(e) {
        return (e + "").replace(we, ke)
    }, t.error = function(e) {
        throw new Error("Syntax error, unrecognized expression: " + e)
    }, t.uniqueSort = function(e) {
        var t, n = [],
            r = 0,
            i = 0;
        if (D = !k.detectDuplicates, E = !k.sortStable && e.slice(0), e.sort(J), D) {
            for (; t = e[i++];) t === e[i] && (r = n.push(i));
            for (; r--;) e.splice(n[r], 1)
        }
        return E = null, e
    }, C = t.getText = function(e) {
        var t, n = "",
            r = 0,
            i = e.nodeType;
        if (i) {
            if (1 === i || 9 === i || 11 === i) {
                if ("string" == typeof e.textContent) return e.textContent;
                for (e = e.firstChild; e; e = e.nextSibling) n += C(e)
            } else if (3 === i || 4 === i) return e.nodeValue
        } else
            for (; t = e[r++];) n += C(t);
        return n
    }, T = t.selectors = {
        cacheLength: 50,
        createPseudo: r,
        match: fe,
        attrHandle: {},
        find: {},
        relative: {
            ">": {
                dir: "parentNode",
                first: !0
            },
            " ": {
                dir: "parentNode"
            },
            "+": {
                dir: "previousSibling",
                first: !0
            },
            "~": {
                dir: "previousSibling"
            }
        },
        preFilter: {
            ATTR: function(e) {
                return e[1] = e[1].replace(be, ye), e[3] = (e[3] || e[4] || e[5] || "").replace(be, ye), "~=" === e[2] && (e[3] = " " + e[3] + " "), e.slice(0, 4)
            },
            CHILD: function(e) {
                return e[1] = e[1].toLowerCase(), "nth" === e[1].slice(0, 3) ? (e[3] || t.error(e[0]), e[4] = +(e[4] ? e[5] + (e[6] || 1) : 2 * ("even" === e[3] || "odd" === e[3])), e[5] = +(e[7] + e[8] || "odd" === e[3])) : e[3] && t.error(e[0]), e
            },
            PSEUDO: function(e) {
                var t, n = !e[6] && e[2];
                return fe.CHILD.test(e[0]) ? null : (e[3] ? e[2] = e[4] || e[5] || "" : n && pe.test(n) && (t = S(n, !0)) && (t = n.indexOf(")", n.length - t) - n.length) && (e[0] = e[0].slice(0, t), e[2] = n.slice(0, t)), e.slice(0, 3))
            }
        },
        filter: {
            TAG: function(e) {
                var t = e.replace(be, ye).toLowerCase();
                return "*" === e ? function() {
                    return !0
                } : function(e) {
                    return e.nodeName && e.nodeName.toLowerCase() === t
                }
            },
            CLASS: function(e) {
                var t = z[e + " "];
                return t || (t = new RegExp("(^|" + ne + ")" + e + "(" + ne + "|$)")) && z(e, function(e) {
                    return t.test("string" == typeof e.className && e.className || "undefined" != typeof e.getAttribute && e.getAttribute("class") || "")
                })
            },
            ATTR: function(e, n, r) {
                return function(i) {
                    var o = t.attr(i, e);
                    return null == o ? "!=" === n : !n || (o += "", "=" === n ? o === r : "!=" === n ? o !== r : "^=" === n ? r && 0 === o.indexOf(r) : "*=" === n ? r && o.indexOf(r) > -1 : "$=" === n ? r && o.slice(-r.length) === r : "~=" === n ? (" " + o.replace(ae, " ") + " ").indexOf(r) > -1 : "|=" === n && (o === r || o.slice(0, r.length + 1) === r + "-"))
                }
            },
            CHILD: function(e, t, n, r, i) {
                var o = "nth" !== e.slice(0, 3),
                    a = "last" !== e.slice(-4),
                    s = "of-type" === t;
                return 1 === r && 0 === i ? function(e) {
                    return !!e.parentNode
                } : function(t, n, l) {
                    var c, u, p, d, f, h, m = o !== a ? "nextSibling" : "previousSibling",
                        g = t.parentNode,
                        v = s && t.nodeName.toLowerCase(),
                        x = !l && !s,
                        b = !1;
                    if (g) {
                        if (o) {
                            for (; m;) {
                                for (d = t; d = d[m];)
                                    if (s ? d.nodeName.toLowerCase() === v : 1 === d.nodeType) return !1;
                                h = m = "only" === e && !h && "nextSibling"
                            }
                            return !0
                        }
                        if (h = [a ? g.firstChild : g.lastChild], a && x) {
                            for (d = g, p = d[R] || (d[R] = {}), u = p[d.uniqueID] || (p[d.uniqueID] = {}), c = u[e] || [], f = c[0] === I && c[1], b = f && c[2], d = f && g.childNodes[f]; d = ++f && d && d[m] || (b = f = 0) || h.pop();)
                                if (1 === d.nodeType && ++b && d === t) {
                                    u[e] = [I, f, b];
                                    break
                                }
                        } else if (x && (d = t, p = d[R] || (d[R] = {}), u = p[d.uniqueID] || (p[d.uniqueID] = {}), c = u[e] || [], f = c[0] === I && c[1], b = f), b === !1)
                            for (;
                                (d = ++f && d && d[m] || (b = f = 0) || h.pop()) && ((s ? d.nodeName.toLowerCase() !== v : 1 !== d.nodeType) || !++b || (x && (p = d[R] || (d[R] = {}), u = p[d.uniqueID] || (p[d.uniqueID] = {}), u[e] = [I, b]), d !== t)););
                        return b -= i, b === r || b % r === 0 && b / r >= 0
                    }
                }
            },
            PSEUDO: function(e, n) {
                var i, o = T.pseudos[e] || T.setFilters[e.toLowerCase()] || t.error("unsupported pseudo: " + e);
                return o[R] ? o(n) : o.length > 1 ? (i = [e, e, "", n], T.setFilters.hasOwnProperty(e.toLowerCase()) ? r(function(e, t) {
                    for (var r, i = o(e, n), a = i.length; a--;) r = ee(e, i[a]), e[r] = !(t[r] = i[a])
                }) : function(e) {
                    return o(e, 0, i)
                }) : o
            }
        },
        pseudos: {
            not: r(function(e) {
                var t = [],
                    n = [],
                    i = j(e.replace(se, "$1"));
                return i[R] ? r(function(e, t, n, r) {
                    for (var o, a = i(e, null, r, []), s = e.length; s--;)(o = a[s]) && (e[s] = !(t[s] = o))
                }) : function(e, r, o) {
                    return t[0] = e, i(t, null, o, n), t[0] = null, !n.pop()
                }
            }),
            has: r(function(e) {
                return function(n) {
                    return t(e, n).length > 0
                }
            }),
            contains: r(function(e) {
                return e = e.replace(be, ye),
                    function(t) {
                        return (t.textContent || t.innerText || C(t)).indexOf(e) > -1
                    }
            }),
            lang: r(function(e) {
                return de.test(e || "") || t.error("unsupported lang: " + e), e = e.replace(be, ye).toLowerCase(),
                    function(t) {
                        var n;
                        do
                            if (n = L ? t.lang : t.getAttribute("xml:lang") || t.getAttribute("lang")) return n = n.toLowerCase(), n === e || 0 === n.indexOf(e + "-"); while ((t = t.parentNode) && 1 === t.nodeType);
                        return !1
                    }
            }),
            target: function(t) {
                var n = e.location && e.location.hash;
                return n && n.slice(1) === t.id
            },
            root: function(e) {
                return e === G
            },
            focus: function(e) {
                return e === V.activeElement && (!V.hasFocus || V.hasFocus()) && !!(e.type || e.href || ~e.tabIndex)
            },
            enabled: c(!1),
            disabled: c(!0),
            checked: function(e) {
                var t = e.nodeName.toLowerCase();
                return "input" === t && !!e.checked || "option" === t && !!e.selected
            },
            selected: function(e) {
                return e.parentNode && e.parentNode.selectedIndex, e.selected === !0
            },
            empty: function(e) {
                for (e = e.firstChild; e; e = e.nextSibling)
                    if (e.nodeType < 6) return !1;
                return !0
            },
            parent: function(e) {
                return !T.pseudos.empty(e)
            },
            header: function(e) {
                return me.test(e.nodeName)
            },
            input: function(e) {
                return he.test(e.nodeName)
            },
            button: function(e) {
                var t = e.nodeName.toLowerCase();
                return "input" === t && "button" === e.type || "button" === t
            },
            text: function(e) {
                var t;
                return "input" === e.nodeName.toLowerCase() && "text" === e.type && (null == (t = e.getAttribute("type")) || "text" === t.toLowerCase())
            },
            first: u(function() {
                return [0]
            }),
            last: u(function(e, t) {
                return [t - 1]
            }),
            eq: u(function(e, t, n) {
                return [n < 0 ? n + t : n]
            }),
            even: u(function(e, t) {
                for (var n = 0; n < t; n += 2) e.push(n);
                return e
            }),
            odd: u(function(e, t) {
                for (var n = 1; n < t; n += 2) e.push(n);
                return e
            }),
            lt: u(function(e, t, n) {
                for (var r = n < 0 ? n + t : n; --r >= 0;) e.push(r);
                return e
            }),
            gt: u(function(e, t, n) {
                for (var r = n < 0 ? n + t : n; ++r < t;) e.push(r);
                return e
            })
        }
    }, T.pseudos.nth = T.pseudos.eq;
    for (w in {
            radio: !0,
            checkbox: !0,
            file: !0,
            password: !0,
            image: !0
        }) T.pseudos[w] = s(w);
    for (w in {
            submit: !0,
            reset: !0
        }) T.pseudos[w] = l(w);
    return d.prototype = T.filters = T.pseudos, T.setFilters = new d, S = t.tokenize = function(e, n) {
        var r, i, o, a, s, l, c, u = $[e + " "];
        if (u) return n ? 0 : u.slice(0);
        for (s = e, l = [], c = T.preFilter; s;) {
            r && !(i = le.exec(s)) || (i && (s = s.slice(i[0].length) || s), l.push(o = [])), r = !1, (i = ce.exec(s)) && (r = i.shift(), o.push({
                value: r,
                type: i[0].replace(se, " ")
            }), s = s.slice(r.length));
            for (a in T.filter) !(i = fe[a].exec(s)) || c[a] && !(i = c[a](i)) || (r = i.shift(), o.push({
                value: r,
                type: a,
                matches: i
            }), s = s.slice(r.length));
            if (!r) break
        }
        return n ? s.length : s ? t.error(e) : $(e, l).slice(0)
    }, j = t.compile = function(e, t) {
        var n, r = [],
            i = [],
            o = B[e + " "];
        if (!o) {
            for (t || (t = S(e)), n = t.length; n--;) o = b(t[n]), o[R] ? r.push(o) : i.push(o);
            o = B(e, y(i, r)), o.selector = e
        }
        return o
    }, N = t.select = function(e, t, n, r) {
        var i, o, a, s, l, c = "function" == typeof e && e,
            u = !r && S(e = c.selector || e);
        if (n = n || [], 1 === u.length) {
            if (o = u[0] = u[0].slice(0), o.length > 2 && "ID" === (a = o[0]).type && 9 === t.nodeType && L && T.relative[o[1].type]) {
                if (t = (T.find.ID(a.matches[0].replace(be, ye), t) || [])[0], !t) return n;
                c && (t = t.parentNode), e = e.slice(o.shift().value.length)
            }
            for (i = fe.needsContext.test(e) ? 0 : o.length; i-- && (a = o[i], !T.relative[s = a.type]);)
                if ((l = T.find[s]) && (r = l(a.matches[0].replace(be, ye), xe.test(o[0].type) && p(t.parentNode) || t))) {
                    if (o.splice(i, 1), e = r.length && f(o), !e) return K.apply(n, r), n;
                    break
                }
        }
        return (c || j(e, u))(r, t, !L, n, !t || xe.test(e) && p(t.parentNode) || t), n
    }, k.sortStable = R.split("").sort(J).join("") === R, k.detectDuplicates = !!D, A(), k.sortDetached = i(function(e) {
        return 1 & e.compareDocumentPosition(V.createElement("fieldset"))
    }), i(function(e) {
        return e.innerHTML = "<a href='#'></a>", "#" === e.firstChild.getAttribute("href")
    }) || o("type|href|height|width", function(e, t, n) {
        if (!n) return e.getAttribute(t, "type" === t.toLowerCase() ? 1 : 2)
    }), k.attributes && i(function(e) {
        return e.innerHTML = "<input/>", e.firstChild.setAttribute("value", ""), "" === e.firstChild.getAttribute("value")
    }) || o("value", function(e, t, n) {
        if (!n && "input" === e.nodeName.toLowerCase()) return e.defaultValue
    }), i(function(e) {
        return null == e.getAttribute("disabled")
    }) || o(te, function(e, t, n) {
        var r;
        if (!n) return e[t] === !0 ? t.toLowerCase() : (r = e.getAttributeNode(t)) && r.specified ? r.value : null
    }), t
}(n);
xe.find = Te, xe.expr = Te.selectors, xe.expr[":"] = xe.expr.pseudos, xe.uniqueSort = xe.unique = Te.uniqueSort, xe.text = Te.getText, xe.isXMLDoc = Te.isXML, xe.contains = Te.contains, xe.escapeSelector = Te.escape;
var Ce = function(e, t, n) {
        for (var r = [], i = void 0 !== n;
            (e = e[t]) && 9 !== e.nodeType;)
            if (1 === e.nodeType) {
                if (i && xe(e).is(n)) break;
                r.push(e)
            }
        return r
    },
    _e = function(e, t) {
        for (var n = []; e; e = e.nextSibling) 1 === e.nodeType && e !== t && n.push(e);
        return n
    },
    Se = xe.expr.match.needsContext,
    je = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i,
    Ne = /^.[^:#\[\.,]*$/;
xe.filter = function(e, t, n) {
    var r = t[0];
    return n && (e = ":not(" + e + ")"), 1 === t.length && 1 === r.nodeType ? xe.find.matchesSelector(r, e) ? [r] : [] : xe.find.matches(e, xe.grep(t, function(e) {
        return 1 === e.nodeType
    }))
}, xe.fn.extend({
    find: function(e) {
        var t, n, r = this.length,
            i = this;
        if ("string" != typeof e) return this.pushStack(xe(e).filter(function() {
            for (t = 0; t < r; t++)
                if (xe.contains(i[t], this)) return !0
        }));
        for (n = this.pushStack([]), t = 0; t < r; t++) xe.find(e, i[t], n);
        return r > 1 ? xe.uniqueSort(n) : n
    },
    filter: function(e) {
        return this.pushStack(l(this, e || [], !1))
    },
    not: function(e) {
        return this.pushStack(l(this, e || [], !0))
    },
    is: function(e) {
        return !!l(this, "string" == typeof e && Se.test(e) ? xe(e) : e || [], !1).length
    }
});
var Me, Ee = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,
    De = xe.fn.init = function(e, t, n) {
        var r, i;
        if (!e) return this;
        if (n = n || Me, "string" == typeof e) {
            if (r = "<" === e[0] && ">" === e[e.length - 1] && e.length >= 3 ? [null, e, null] : Ee.exec(e), !r || !r[1] && t) return !t || t.jquery ? (t || n).find(e) : this.constructor(t).find(e);
            if (r[1]) {
                if (t = t instanceof xe ? t[0] : t, xe.merge(this, xe.parseHTML(r[1], t && t.nodeType ? t.ownerDocument || t : oe, !0)), je.test(r[1]) && xe.isPlainObject(t))
                    for (r in t) xe.isFunction(this[r]) ? this[r](t[r]) : this.attr(r, t[r]);
                return this
            }
            return i = oe.getElementById(r[2]), i && (this[0] = i, this.length = 1), this
        }
        return e.nodeType ? (this[0] = e, this.length = 1, this) : xe.isFunction(e) ? void 0 !== n.ready ? n.ready(e) : e(xe) : xe.makeArray(e, this)
    };
De.prototype = xe.fn, Me = xe(oe);
var Ae = /^(?:parents|prev(?:Until|All))/,
    Ve = {
        children: !0,
        contents: !0,
        next: !0,
        prev: !0
    };
xe.fn.extend({
    has: function(e) {
        var t = xe(e, this),
            n = t.length;
        return this.filter(function() {
            for (var e = 0; e < n; e++)
                if (xe.contains(this, t[e])) return !0
        })
    },
    closest: function(e, t) {
        var n, r = 0,
            i = this.length,
            o = [],
            a = "string" != typeof e && xe(e);
        if (!Se.test(e))
            for (; r < i; r++)
                for (n = this[r]; n && n !== t; n = n.parentNode)
                    if (n.nodeType < 11 && (a ? a.index(n) > -1 : 1 === n.nodeType && xe.find.matchesSelector(n, e))) {
                        o.push(n);
                        break
                    }
        return this.pushStack(o.length > 1 ? xe.uniqueSort(o) : o)
    },
    index: function(e) {
        return e ? "string" == typeof e ? ue.call(xe(e), this[0]) : ue.call(this, e.jquery ? e[0] : e) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
    },
    add: function(e, t) {
        return this.pushStack(xe.uniqueSort(xe.merge(this.get(), xe(e, t))))
    },
    addBack: function(e) {
        return this.add(null == e ? this.prevObject : this.prevObject.filter(e))
    }
}), xe.each({
    parent: function(e) {
        var t = e.parentNode;
        return t && 11 !== t.nodeType ? t : null
    },
    parents: function(e) {
        return Ce(e, "parentNode")
    },
    parentsUntil: function(e, t, n) {
        return Ce(e, "parentNode", n)
    },
    next: function(e) {
        return c(e, "nextSibling")
    },
    prev: function(e) {
        return c(e, "previousSibling")
    },
    nextAll: function(e) {
        return Ce(e, "nextSibling")
    },
    prevAll: function(e) {
        return Ce(e, "previousSibling")
    },
    nextUntil: function(e, t, n) {
        return Ce(e, "nextSibling", n)
    },
    prevUntil: function(e, t, n) {
        return Ce(e, "previousSibling", n)
    },
    siblings: function(e) {
        return _e((e.parentNode || {}).firstChild, e)
    },
    children: function(e) {
        return _e(e.firstChild)
    },
    contents: function(e) {
        return e.contentDocument || xe.merge([], e.childNodes)
    }
}, function(e, t) {
    xe.fn[e] = function(n, r) {
        var i = xe.map(this, t, n);
        return "Until" !== e.slice(-5) && (r = n), r && "string" == typeof r && (i = xe.filter(r, i)), this.length > 1 && (Ve[e] || xe.uniqueSort(i), Ae.test(e) && i.reverse()), this.pushStack(i)
    }
});
var Ge = /[^\x20\t\r\n\f]+/g;
xe.Callbacks = function(e) {
    e = "string" == typeof e ? u(e) : xe.extend({}, e);
    var t, n, r, i, o = [],
        a = [],
        s = -1,
        l = function() {
            for (i = e.once, r = t = !0; a.length; s = -1)
                for (n = a.shift(); ++s < o.length;) o[s].apply(n[0], n[1]) === !1 && e.stopOnFalse && (s = o.length, n = !1);
            e.memory || (n = !1), t = !1, i && (o = n ? [] : "")
        },
        c = {
            add: function() {
                return o && (n && !t && (s = o.length - 1, a.push(n)), function t(n) {
                    xe.each(n, function(n, r) {
                        xe.isFunction(r) ? e.unique && c.has(r) || o.push(r) : r && r.length && "string" !== xe.type(r) && t(r)
                    })
                }(arguments), n && !t && l()), this
            },
            remove: function() {
                return xe.each(arguments, function(e, t) {
                    for (var n;
                        (n = xe.inArray(t, o, n)) > -1;) o.splice(n, 1), n <= s && s--
                }), this
            },
            has: function(e) {
                return e ? xe.inArray(e, o) > -1 : o.length > 0
            },
            empty: function() {
                return o && (o = []), this
            },
            disable: function() {
                return i = a = [], o = n = "", this
            },
            disabled: function() {
                return !o
            },
            lock: function() {
                return i = a = [], n || t || (o = n = ""), this
            },
            locked: function() {
                return !!i
            },
            fireWith: function(e, n) {
                return i || (n = n || [], n = [e, n.slice ? n.slice() : n], a.push(n), t || l()), this
            },
            fire: function() {
                return c.fireWith(this, arguments), this
            },
            fired: function() {
                return !!r
            }
        };
    return c
}, xe.extend({
    Deferred: function(e) {
        var t = [
                ["notify", "progress", xe.Callbacks("memory"), xe.Callbacks("memory"), 2],
                ["resolve", "done", xe.Callbacks("once memory"), xe.Callbacks("once memory"), 0, "resolved"],
                ["reject", "fail", xe.Callbacks("once memory"), xe.Callbacks("once memory"), 1, "rejected"]
            ],
            r = "pending",
            i = {
                state: function() {
                    return r
                },
                always: function() {
                    return o.done(arguments).fail(arguments), this
                },
                catch: function(e) {
                    return i.then(null, e)
                },
                pipe: function() {
                    var e = arguments;
                    return xe.Deferred(function(n) {
                        xe.each(t, function(t, r) {
                            var i = xe.isFunction(e[r[4]]) && e[r[4]];
                            o[r[1]](function() {
                                var e = i && i.apply(this, arguments);
                                e && xe.isFunction(e.promise) ? e.promise().progress(n.notify).done(n.resolve).fail(n.reject) : n[r[0] + "With"](this, i ? [e] : arguments)
                            })
                        }), e = null
                    }).promise()
                },
                then: function(e, r, i) {
                    function o(e, t, r, i) {
                        return function() {
                            var s = this,
                                l = arguments,
                                c = function() {
                                    var n, c;
                                    if (!(e < a)) {
                                        if (n = r.apply(s, l), n === t.promise()) throw new TypeError("Thenable self-resolution");
                                        c = n && ("object" == typeof n || "function" == typeof n) && n.then, xe.isFunction(c) ? i ? c.call(n, o(a, t, p, i), o(a, t, d, i)) : (a++, c.call(n, o(a, t, p, i), o(a, t, d, i), o(a, t, p, t.notifyWith))) : (r !== p && (s = void 0, l = [n]), (i || t.resolveWith)(s, l))
                                    }
                                },
                                u = i ? c : function() {
                                    try {
                                        c()
                                    } catch (n) {
                                        xe.Deferred.exceptionHook && xe.Deferred.exceptionHook(n, u.stackTrace), e + 1 >= a && (r !== d && (s = void 0, l = [n]), t.rejectWith(s, l))
                                    }
                                };
                            e ? u() : (xe.Deferred.getStackHook && (u.stackTrace = xe.Deferred.getStackHook()), n.setTimeout(u))
                        }
                    }
                    var a = 0;
                    return xe.Deferred(function(n) {
                        t[0][3].add(o(0, n, xe.isFunction(i) ? i : p, n.notifyWith)), t[1][3].add(o(0, n, xe.isFunction(e) ? e : p)), t[2][3].add(o(0, n, xe.isFunction(r) ? r : d))
                    }).promise()
                },
                promise: function(e) {
                    return null != e ? xe.extend(e, i) : i
                }
            },
            o = {};
        return xe.each(t, function(e, n) {
            var a = n[2],
                s = n[5];
            i[n[1]] = a.add, s && a.add(function() {
                r = s
            }, t[3 - e][2].disable, t[0][2].lock), a.add(n[3].fire), o[n[0]] = function() {
                return o[n[0] + "With"](this === o ? void 0 : this, arguments), this
            }, o[n[0] + "With"] = a.fireWith
        }), i.promise(o), e && e.call(o, o), o
    },
    when: function(e) {
        var t = arguments.length,
            n = t,
            r = Array(n),
            i = se.call(arguments),
            o = xe.Deferred(),
            a = function(e) {
                return function(n) {
                    r[e] = this, i[e] = arguments.length > 1 ? se.call(arguments) : n, --t || o.resolveWith(r, i)
                }
            };
        if (t <= 1 && (f(e, o.done(a(n)).resolve, o.reject), "pending" === o.state() || xe.isFunction(i[n] && i[n].then))) return o.then();
        for (; n--;) f(i[n], a(n), o.reject);
        return o.promise()
    }
});
var Le = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;
xe.Deferred.exceptionHook = function(e, t) {
    n.console && n.console.warn && e && Le.test(e.name) && n.console.warn("jQuery.Deferred exception: " + e.message, e.stack, t)
}, xe.readyException = function(e) {
    n.setTimeout(function() {
        throw e
    })
};
var Oe = xe.Deferred();
xe.fn.ready = function(e) {
    return Oe.then(e).catch(function(e) {
        xe.readyException(e)
    }), this
}, xe.extend({
    isReady: !1,
    readyWait: 1,
    holdReady: function(e) {
        e ? xe.readyWait++ : xe.ready(!0)
    },
    ready: function(e) {
        (e === !0 ? --xe.readyWait : xe.isReady) || (xe.isReady = !0, e !== !0 && --xe.readyWait > 0 || Oe.resolveWith(oe, [xe]))
    }
}), xe.ready.then = Oe.then, "complete" === oe.readyState || "loading" !== oe.readyState && !oe.documentElement.doScroll ? n.setTimeout(xe.ready) : (oe.addEventListener("DOMContentLoaded", h), n.addEventListener("load", h));
var qe = function(e, t, n, r, i, o, a) {
        var s = 0,
            l = e.length,
            c = null == n;
        if ("object" === xe.type(n)) {
            i = !0;
            for (s in n) qe(e, t, s, n[s], !0, o, a)
        } else if (void 0 !== r && (i = !0, xe.isFunction(r) || (a = !0), c && (a ? (t.call(e, r), t = null) : (c = t, t = function(e, t, n) {
                return c.call(xe(e), n)
            })), t))
            for (; s < l; s++) t(e[s], n, a ? r : r.call(e[s], s, t(e[s], n)));
        return i ? e : c ? t.call(e) : l ? t(e[0], n) : o
    },
    Fe = function(e) {
        return 1 === e.nodeType || 9 === e.nodeType || !+e.nodeType
    };
m.uid = 1, m.prototype = {
    cache: function(e) {
        var t = e[this.expando];
        return t || (t = {}, Fe(e) && (e.nodeType ? e[this.expando] = t : Object.defineProperty(e, this.expando, {
            value: t,
            configurable: !0
        }))), t
    },
    set: function(e, t, n) {
        var r, i = this.cache(e);
        if ("string" == typeof t) i[xe.camelCase(t)] = n;
        else
            for (r in t) i[xe.camelCase(r)] = t[r];
        return i
    },
    get: function(e, t) {
        return void 0 === t ? this.cache(e) : e[this.expando] && e[this.expando][xe.camelCase(t)]
    },
    access: function(e, t, n) {
        return void 0 === t || t && "string" == typeof t && void 0 === n ? this.get(e, t) : (this.set(e, t, n), void 0 !== n ? n : t)
    },
    remove: function(e, t) {
        var n, r = e[this.expando];
        if (void 0 !== r) {
            if (void 0 !== t) {
                xe.isArray(t) ? t = t.map(xe.camelCase) : (t = xe.camelCase(t), t = t in r ? [t] : t.match(Ge) || []), n = t.length;
                for (; n--;) delete r[t[n]]
            }(void 0 === t || xe.isEmptyObject(r)) && (e.nodeType ? e[this.expando] = void 0 : delete e[this.expando])
        }
    },
    hasData: function(e) {
        var t = e[this.expando];
        return void 0 !== t && !xe.isEmptyObject(t)
    }
};
var He = new m,
    Re = new m,
    Pe = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
    Ie = /[A-Z]/g;
xe.extend({
    hasData: function(e) {
        return Re.hasData(e) || He.hasData(e)
    },
    data: function(e, t, n) {
        return Re.access(e, t, n)
    },
    removeData: function(e, t) {
        Re.remove(e, t)
    },
    _data: function(e, t, n) {
        return He.access(e, t, n)
    },
    _removeData: function(e, t) {
        He.remove(e, t)
    }
}), xe.fn.extend({
    data: function(e, t) {
        var n, r, i, o = this[0],
            a = o && o.attributes;
        if (void 0 === e) {
            if (this.length && (i = Re.get(o), 1 === o.nodeType && !He.get(o, "hasDataAttrs"))) {
                for (n = a.length; n--;) a[n] && (r = a[n].name, 0 === r.indexOf("data-") && (r = xe.camelCase(r.slice(5)), v(o, r, i[r])));
                He.set(o, "hasDataAttrs", !0)
            }
            return i
        }
        return "object" == typeof e ? this.each(function() {
            Re.set(this, e)
        }) : qe(this, function(t) {
            var n;
            if (o && void 0 === t) {
                if (n = Re.get(o, e), void 0 !== n) return n;
                if (n = v(o, e), void 0 !== n) return n
            } else this.each(function() {
                Re.set(this, e, t)
            })
        }, null, t, arguments.length > 1, null, !0)
    },
    removeData: function(e) {
        return this.each(function() {
            Re.remove(this, e)
        })
    }
}), xe.extend({
    queue: function(e, t, n) {
        var r;
        if (e) return t = (t || "fx") + "queue", r = He.get(e, t), n && (!r || xe.isArray(n) ? r = He.access(e, t, xe.makeArray(n)) : r.push(n)), r || []
    },
    dequeue: function(e, t) {
        t = t || "fx";
        var n = xe.queue(e, t),
            r = n.length,
            i = n.shift(),
            o = xe._queueHooks(e, t),
            a = function() {
                xe.dequeue(e, t)
            };
        "inprogress" === i && (i = n.shift(), r--), i && ("fx" === t && n.unshift("inprogress"), delete o.stop, i.call(e, a, o)), !r && o && o.empty.fire()
    },
    _queueHooks: function(e, t) {
        var n = t + "queueHooks";
        return He.get(e, n) || He.access(e, n, {
            empty: xe.Callbacks("once memory").add(function() {
                He.remove(e, [t + "queue", n])
            })
        })
    }
}), xe.fn.extend({
    queue: function(e, t) {
        var n = 2;
        return "string" != typeof e && (t = e, e = "fx", n--), arguments.length < n ? xe.queue(this[0], e) : void 0 === t ? this : this.each(function() {
            var n = xe.queue(this, e, t);
            xe._queueHooks(this, e), "fx" === e && "inprogress" !== n[0] && xe.dequeue(this, e)
        })
    },
    dequeue: function(e) {
        return this.each(function() {
            xe.dequeue(this, e)
        })
    },
    clearQueue: function(e) {
        return this.queue(e || "fx", [])
    },
    promise: function(e, t) {
        var n, r = 1,
            i = xe.Deferred(),
            o = this,
            a = this.length,
            s = function() {
                --r || i.resolveWith(o, [o])
            };
        for ("string" != typeof e && (t = e, e = void 0), e = e || "fx"; a--;) n = He.get(o[a], e + "queueHooks"), n && n.empty && (r++, n.empty.add(s));
        return s(), i.promise(t)
    }
});
var We = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
    ze = new RegExp("^(?:([+-])=|)(" + We + ")([a-z%]*)$", "i"),
    $e = ["Top", "Right", "Bottom", "Left"],
    Be = function(e, t) {
        return e = t || e, "none" === e.style.display || "" === e.style.display && xe.contains(e.ownerDocument, e) && "none" === xe.css(e, "display")
    },
    Je = function(e, t, n, r) {
        var i, o, a = {};
        for (o in t) a[o] = e.style[o], e.style[o] = t[o];
        i = n.apply(e, r || []);
        for (o in t) e.style[o] = a[o];
        return i
    },
    Xe = {};
xe.fn.extend({
    show: function() {
        return y(this, !0)
    },
    hide: function() {
        return y(this)
    },
    toggle: function(e) {
        return "boolean" == typeof e ? e ? this.show() : this.hide() : this.each(function() {
            Be(this) ? xe(this).show() : xe(this).hide()
        })
    }
});
var Ue = /^(?:checkbox|radio)$/i,
    Ye = /<([a-z][^\/\0>\x20\t\r\n\f]+)/i,
    Qe = /^$|\/(?:java|ecma)script/i,
    Ke = {
        option: [1, "<select multiple='multiple'>", "</select>"],
        thead: [1, "<table>", "</table>"],
        col: [2, "<table><colgroup>", "</colgroup></table>"],
        tr: [2, "<table><tbody>", "</tbody></table>"],
        td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
        _default: [0, "", ""]
    };
Ke.optgroup = Ke.option, Ke.tbody = Ke.tfoot = Ke.colgroup = Ke.caption = Ke.thead, Ke.th = Ke.td;
var Ze = /<|&#?\w+;/;
! function() {
    var e = oe.createDocumentFragment(),
        t = e.appendChild(oe.createElement("div")),
        n = oe.createElement("input");
    n.setAttribute("type", "radio"), n.setAttribute("checked", "checked"), n.setAttribute("name", "t"), t.appendChild(n), ge.checkClone = t.cloneNode(!0).cloneNode(!0).lastChild.checked, t.innerHTML = "<textarea>x</textarea>", ge.noCloneChecked = !!t.cloneNode(!0).lastChild.defaultValue
}();
var et = oe.documentElement,
    tt = /^key/,
    nt = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
    rt = /^([^.]*)(?:\.(.+)|)/;
xe.event = {
    global: {},
    add: function(e, t, n, r, i) {
        var o, a, s, l, c, u, p, d, f, h, m, g = He.get(e);
        if (g)
            for (n.handler && (o = n, n = o.handler, i = o.selector), i && xe.find.matchesSelector(et, i), n.guid || (n.guid = xe.guid++), (l = g.events) || (l = g.events = {}), (a = g.handle) || (a = g.handle = function(t) {
                    return "undefined" != typeof xe && xe.event.triggered !== t.type ? xe.event.dispatch.apply(e, arguments) : void 0
                }), t = (t || "").match(Ge) || [""], c = t.length; c--;) s = rt.exec(t[c]) || [], f = m = s[1], h = (s[2] || "").split(".").sort(), f && (p = xe.event.special[f] || {}, f = (i ? p.delegateType : p.bindType) || f, p = xe.event.special[f] || {}, u = xe.extend({
                type: f,
                origType: m,
                data: r,
                handler: n,
                guid: n.guid,
                selector: i,
                needsContext: i && xe.expr.match.needsContext.test(i),
                namespace: h.join(".")
            }, o), (d = l[f]) || (d = l[f] = [], d.delegateCount = 0, p.setup && p.setup.call(e, r, h, a) !== !1 || e.addEventListener && e.addEventListener(f, a)), p.add && (p.add.call(e, u), u.handler.guid || (u.handler.guid = n.guid)), i ? d.splice(d.delegateCount++, 0, u) : d.push(u), xe.event.global[f] = !0)
    },
    remove: function(e, t, n, r, i) {
        var o, a, s, l, c, u, p, d, f, h, m, g = He.hasData(e) && He.get(e);
        if (g && (l = g.events)) {
            for (t = (t || "").match(Ge) || [""], c = t.length; c--;)
                if (s = rt.exec(t[c]) || [], f = m = s[1], h = (s[2] || "").split(".").sort(), f) {
                    for (p = xe.event.special[f] || {}, f = (r ? p.delegateType : p.bindType) || f, d = l[f] || [], s = s[2] && new RegExp("(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)"), a = o = d.length; o--;) u = d[o], !i && m !== u.origType || n && n.guid !== u.guid || s && !s.test(u.namespace) || r && r !== u.selector && ("**" !== r || !u.selector) || (d.splice(o, 1), u.selector && d.delegateCount--, p.remove && p.remove.call(e, u));
                    a && !d.length && (p.teardown && p.teardown.call(e, h, g.handle) !== !1 || xe.removeEvent(e, f, g.handle), delete l[f])
                } else
                    for (f in l) xe.event.remove(e, f + t[c], n, r, !0);
            xe.isEmptyObject(l) && He.remove(e, "handle events")
        }
    },
    dispatch: function(e) {
        var t, n, r, i, o, a, s = xe.event.fix(e),
            l = new Array(arguments.length),
            c = (He.get(this, "events") || {})[s.type] || [],
            u = xe.event.special[s.type] || {};
        for (l[0] = s, t = 1; t < arguments.length; t++) l[t] = arguments[t];
        if (s.delegateTarget = this, !u.preDispatch || u.preDispatch.call(this, s) !== !1) {
            for (a = xe.event.handlers.call(this, s, c), t = 0;
                (i = a[t++]) && !s.isPropagationStopped();)
                for (s.currentTarget = i.elem, n = 0;
                    (o = i.handlers[n++]) && !s.isImmediatePropagationStopped();) s.rnamespace && !s.rnamespace.test(o.namespace) || (s.handleObj = o, s.data = o.data, r = ((xe.event.special[o.origType] || {}).handle || o.handler).apply(i.elem, l), void 0 !== r && (s.result = r) === !1 && (s.preventDefault(), s.stopPropagation()));
            return u.postDispatch && u.postDispatch.call(this, s), s.result
        }
    },
    handlers: function(e, t) {
        var n, r, i, o, a, s = [],
            l = t.delegateCount,
            c = e.target;
        if (l && c.nodeType && !("click" === e.type && e.button >= 1))
            for (; c !== this; c = c.parentNode || this)
                if (1 === c.nodeType && ("click" !== e.type || c.disabled !== !0)) {
                    for (o = [], a = {}, n = 0; n < l; n++) r = t[n], i = r.selector + " ", void 0 === a[i] && (a[i] = r.needsContext ? xe(i, this).index(c) > -1 : xe.find(i, this, null, [c]).length), a[i] && o.push(r);
                    o.length && s.push({
                        elem: c,
                        handlers: o
                    })
                }
        return c = this, l < t.length && s.push({
            elem: c,
            handlers: t.slice(l)
        }), s
    },
    addProp: function(e, t) {
        Object.defineProperty(xe.Event.prototype, e, {
            enumerable: !0,
            configurable: !0,
            get: xe.isFunction(t) ? function() {
                if (this.originalEvent) return t(this.originalEvent)
            } : function() {
                if (this.originalEvent) return this.originalEvent[e]
            },
            set: function(t) {
                Object.defineProperty(this, e, {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                    value: t
                })
            }
        })
    },
    fix: function(e) {
        return e[xe.expando] ? e : new xe.Event(e)
    },
    special: {
        load: {
            noBubble: !0
        },
        focus: {
            trigger: function() {
                if (this !== S() && this.focus) return this.focus(), !1
            },
            delegateType: "focusin"
        },
        blur: {
            trigger: function() {
                if (this === S() && this.blur) return this.blur(), !1
            },
            delegateType: "focusout"
        },
        click: {
            trigger: function() {
                if ("checkbox" === this.type && this.click && xe.nodeName(this, "input")) return this.click(), !1
            },
            _default: function(e) {
                return xe.nodeName(e.target, "a")
            }
        },
        beforeunload: {
            postDispatch: function(e) {
                void 0 !== e.result && e.originalEvent && (e.originalEvent.returnValue = e.result)
            }
        }
    }
}, xe.removeEvent = function(e, t, n) {
    e.removeEventListener && e.removeEventListener(t, n)
}, xe.Event = function(e, t) {
    return this instanceof xe.Event ? (e && e.type ? (this.originalEvent = e, this.type = e.type, this.isDefaultPrevented = e.defaultPrevented || void 0 === e.defaultPrevented && e.returnValue === !1 ? C : _, this.target = e.target && 3 === e.target.nodeType ? e.target.parentNode : e.target, this.currentTarget = e.currentTarget, this.relatedTarget = e.relatedTarget) : this.type = e, t && xe.extend(this, t), this.timeStamp = e && e.timeStamp || xe.now(), void(this[xe.expando] = !0)) : new xe.Event(e, t)
}, xe.Event.prototype = {
    constructor: xe.Event,
    isDefaultPrevented: _,
    isPropagationStopped: _,
    isImmediatePropagationStopped: _,
    isSimulated: !1,
    preventDefault: function() {
        var e = this.originalEvent;
        this.isDefaultPrevented = C, e && !this.isSimulated && e.preventDefault()
    },
    stopPropagation: function() {
        var e = this.originalEvent;
        this.isPropagationStopped = C, e && !this.isSimulated && e.stopPropagation()
    },
    stopImmediatePropagation: function() {
        var e = this.originalEvent;
        this.isImmediatePropagationStopped = C, e && !this.isSimulated && e.stopImmediatePropagation(), this.stopPropagation()
    }
}, xe.each({
    altKey: !0,
    bubbles: !0,
    cancelable: !0,
    changedTouches: !0,
    ctrlKey: !0,
    detail: !0,
    eventPhase: !0,
    metaKey: !0,
    pageX: !0,
    pageY: !0,
    shiftKey: !0,
    view: !0,
    char: !0,
    charCode: !0,
    key: !0,
    keyCode: !0,
    button: !0,
    buttons: !0,
    clientX: !0,
    clientY: !0,
    offsetX: !0,
    offsetY: !0,
    pointerId: !0,
    pointerType: !0,
    screenX: !0,
    screenY: !0,
    targetTouches: !0,
    toElement: !0,
    touches: !0,
    which: function(e) {
        var t = e.button;
        return null == e.which && tt.test(e.type) ? null != e.charCode ? e.charCode : e.keyCode : !e.which && void 0 !== t && nt.test(e.type) ? 1 & t ? 1 : 2 & t ? 3 : 4 & t ? 2 : 0 : e.which
    }
}, xe.event.addProp), xe.each({
    mouseenter: "mouseover",
    mouseleave: "mouseout",
    pointerenter: "pointerover",
    pointerleave: "pointerout"
}, function(e, t) {
    xe.event.special[e] = {
        delegateType: t,
        bindType: t,
        handle: function(e) {
            var n, r = this,
                i = e.relatedTarget,
                o = e.handleObj;
            return i && (i === r || xe.contains(r, i)) || (e.type = o.origType, n = o.handler.apply(this, arguments), e.type = t), n
        }
    }
}), xe.fn.extend({
    on: function(e, t, n, r) {
        return j(this, e, t, n, r)
    },
    one: function(e, t, n, r) {
        return j(this, e, t, n, r, 1)
    },
    off: function(e, t, n) {
        var r, i;
        if (e && e.preventDefault && e.handleObj) return r = e.handleObj, xe(e.delegateTarget).off(r.namespace ? r.origType + "." + r.namespace : r.origType, r.selector, r.handler), this;
        if ("object" == typeof e) {
            for (i in e) this.off(i, t, e[i]);
            return this
        }
        return t !== !1 && "function" != typeof t || (n = t, t = void 0), n === !1 && (n = _), this.each(function() {
            xe.event.remove(this, e, n, t)
        })
    }
});
var it = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,
    ot = /<script|<style|<link/i,
    at = /checked\s*(?:[^=]|=\s*.checked.)/i,
    st = /^true\/(.*)/,
    lt = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;
xe.extend({
    htmlPrefilter: function(e) {
        return e.replace(it, "<$1></$2>")
    },
    clone: function(e, t, n) {
        var r, i, o, a, s = e.cloneNode(!0),
            l = xe.contains(e.ownerDocument, e);
        if (!(ge.noCloneChecked || 1 !== e.nodeType && 11 !== e.nodeType || xe.isXMLDoc(e)))
            for (a = w(s), o = w(e), r = 0, i = o.length; r < i; r++) A(o[r], a[r]);
        if (t)
            if (n)
                for (o = o || w(e), a = a || w(s), r = 0, i = o.length; r < i; r++) D(o[r], a[r]);
            else D(e, s);
        return a = w(s, "script"), a.length > 0 && k(a, !l && w(e, "script")), s
    },
    cleanData: function(e) {
        for (var t, n, r, i = xe.event.special, o = 0; void 0 !== (n = e[o]); o++)
            if (Fe(n)) {
                if (t = n[He.expando]) {
                    if (t.events)
                        for (r in t.events) i[r] ? xe.event.remove(n, r) : xe.removeEvent(n, r, t.handle);
                    n[He.expando] = void 0
                }
                n[Re.expando] && (n[Re.expando] = void 0)
            }
    }
}), xe.fn.extend({
    detach: function(e) {
        return G(this, e, !0)
    },
    remove: function(e) {
        return G(this, e)
    },
    text: function(e) {
        return qe(this, function(e) {
            return void 0 === e ? xe.text(this) : this.empty().each(function() {
                1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || (this.textContent = e)
            })
        }, null, e, arguments.length)
    },
    append: function() {
        return V(this, arguments, function(e) {
            if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                var t = N(this, e);
                t.appendChild(e)
            }
        })
    },
    prepend: function() {
        return V(this, arguments, function(e) {
            if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                var t = N(this, e);
                t.insertBefore(e, t.firstChild)
            }
        })
    },
    before: function() {
        return V(this, arguments, function(e) {
            this.parentNode && this.parentNode.insertBefore(e, this)
        })
    },
    after: function() {
        return V(this, arguments, function(e) {
            this.parentNode && this.parentNode.insertBefore(e, this.nextSibling)
        })
    },
    empty: function() {
        for (var e, t = 0; null != (e = this[t]); t++) 1 === e.nodeType && (xe.cleanData(w(e, !1)), e.textContent = "");
        return this
    },
    clone: function(e, t) {
        return e = null != e && e, t = null == t ? e : t, this.map(function() {
            return xe.clone(this, e, t)
        })
    },
    html: function(e) {
        return qe(this, function(e) {
            var t = this[0] || {},
                n = 0,
                r = this.length;
            if (void 0 === e && 1 === t.nodeType) return t.innerHTML;
            if ("string" == typeof e && !ot.test(e) && !Ke[(Ye.exec(e) || ["", ""])[1].toLowerCase()]) {
                e = xe.htmlPrefilter(e);
                try {
                    for (; n < r; n++) t = this[n] || {}, 1 === t.nodeType && (xe.cleanData(w(t, !1)), t.innerHTML = e);
                    t = 0
                } catch (e) {}
            }
            t && this.empty().append(e)
        }, null, e, arguments.length)
    },
    replaceWith: function() {
        var e = [];
        return V(this, arguments, function(t) {
            var n = this.parentNode;
            xe.inArray(this, e) < 0 && (xe.cleanData(w(this)), n && n.replaceChild(t, this))
        }, e)
    }
}), xe.each({
    appendTo: "append",
    prependTo: "prepend",
    insertBefore: "before",
    insertAfter: "after",
    replaceAll: "replaceWith"
}, function(e, t) {
    xe.fn[e] = function(e) {
        for (var n, r = [], i = xe(e), o = i.length - 1, a = 0; a <= o; a++) n = a === o ? this : this.clone(!0), xe(i[a])[t](n), ce.apply(r, n.get());
        return this.pushStack(r)
    }
});
var ct = /^margin/,
    ut = new RegExp("^(" + We + ")(?!px)[a-z%]+$", "i"),
    pt = function(e) {
        var t = e.ownerDocument.defaultView;
        return t && t.opener || (t = n), t.getComputedStyle(e)
    };
! function() {
    function e() {
        if (s) {
            s.style.cssText = "box-sizing:border-box;position:relative;display:block;margin:auto;border:1px;padding:1px;top:1%;width:50%", s.innerHTML = "", et.appendChild(a);
            var e = n.getComputedStyle(s);
            t = "1%" !== e.top, o = "2px" === e.marginLeft, r = "4px" === e.width, s.style.marginRight = "50%", i = "4px" === e.marginRight, et.removeChild(a), s = null
        }
    }
    var t, r, i, o, a = oe.createElement("div"),
        s = oe.createElement("div");
    s.style && (s.style.backgroundClip = "content-box", s.cloneNode(!0).style.backgroundClip = "", ge.clearCloneStyle = "content-box" === s.style.backgroundClip, a.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;padding:0;margin-top:1px;position:absolute", a.appendChild(s), xe.extend(ge, {
        pixelPosition: function() {
            return e(), t
        },
        boxSizingReliable: function() {
            return e(), r
        },
        pixelMarginRight: function() {
            return e(), i
        },
        reliableMarginLeft: function() {
            return e(), o
        }
    }))
}();
var dt = /^(none|table(?!-c[ea]).+)/,
    ft = {
        position: "absolute",
        visibility: "hidden",
        display: "block"
    },
    ht = {
        letterSpacing: "0",
        fontWeight: "400"
    },
    mt = ["Webkit", "Moz", "ms"],
    gt = oe.createElement("div").style;
xe.extend({
    cssHooks: {
        opacity: {
            get: function(e, t) {
                if (t) {
                    var n = L(e, "opacity");
                    return "" === n ? "1" : n
                }
            }
        }
    },
    cssNumber: {
        animationIterationCount: !0,
        columnCount: !0,
        fillOpacity: !0,
        flexGrow: !0,
        flexShrink: !0,
        fontWeight: !0,
        lineHeight: !0,
        opacity: !0,
        order: !0,
        orphans: !0,
        widows: !0,
        zIndex: !0,
        zoom: !0
    },
    cssProps: {
        float: "cssFloat"
    },
    style: function(e, t, n, r) {
        if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
            var i, o, a, s = xe.camelCase(t),
                l = e.style;
            return t = xe.cssProps[s] || (xe.cssProps[s] = q(s) || s), a = xe.cssHooks[t] || xe.cssHooks[s], void 0 === n ? a && "get" in a && void 0 !== (i = a.get(e, !1, r)) ? i : l[t] : (o = typeof n, "string" === o && (i = ze.exec(n)) && i[1] && (n = x(e, t, i), o = "number"), null != n && n === n && ("number" === o && (n += i && i[3] || (xe.cssNumber[s] ? "" : "px")), ge.clearCloneStyle || "" !== n || 0 !== t.indexOf("background") || (l[t] = "inherit"), a && "set" in a && void 0 === (n = a.set(e, n, r)) || (l[t] = n)), void 0)
        }
    },
    css: function(e, t, n, r) {
        var i, o, a, s = xe.camelCase(t);
        return t = xe.cssProps[s] || (xe.cssProps[s] = q(s) || s), a = xe.cssHooks[t] || xe.cssHooks[s], a && "get" in a && (i = a.get(e, !0, n)), void 0 === i && (i = L(e, t, r)), "normal" === i && t in ht && (i = ht[t]), "" === n || n ? (o = parseFloat(i), n === !0 || isFinite(o) ? o || 0 : i) : i
    }
}), xe.each(["height", "width"], function(e, t) {
    xe.cssHooks[t] = {
        get: function(e, n, r) {
            if (n) return !dt.test(xe.css(e, "display")) || e.getClientRects().length && e.getBoundingClientRect().width ? R(e, t, r) : Je(e, ft, function() {
                return R(e, t, r)
            })
        },
        set: function(e, n, r) {
            var i, o = r && pt(e),
                a = r && H(e, t, r, "border-box" === xe.css(e, "boxSizing", !1, o), o);
            return a && (i = ze.exec(n)) && "px" !== (i[3] || "px") && (e.style[t] = n, n = xe.css(e, t)), F(e, n, a)
        }
    }
}), xe.cssHooks.marginLeft = O(ge.reliableMarginLeft, function(e, t) {
    if (t) return (parseFloat(L(e, "marginLeft")) || e.getBoundingClientRect().left - Je(e, {
        marginLeft: 0
    }, function() {
        return e.getBoundingClientRect().left
    })) + "px"
}), xe.each({
    margin: "",
    padding: "",
    border: "Width"
}, function(e, t) {
    xe.cssHooks[e + t] = {
        expand: function(n) {
            for (var r = 0, i = {}, o = "string" == typeof n ? n.split(" ") : [n]; r < 4; r++) i[e + $e[r] + t] = o[r] || o[r - 2] || o[0];
            return i
        }
    }, ct.test(e) || (xe.cssHooks[e + t].set = F)
}), xe.fn.extend({
    css: function(e, t) {
        return qe(this, function(e, t, n) {
            var r, i, o = {},
                a = 0;
            if (xe.isArray(t)) {
                for (r = pt(e), i = t.length; a < i; a++) o[t[a]] = xe.css(e, t[a], !1, r);
                return o
            }
            return void 0 !== n ? xe.style(e, t, n) : xe.css(e, t)
        }, e, t, arguments.length > 1)
    }
}), xe.Tween = P, P.prototype = {
    constructor: P,
    init: function(e, t, n, r, i, o) {
        this.elem = e, this.prop = n, this.easing = i || xe.easing._default, this.options = t, this.start = this.now = this.cur(), this.end = r, this.unit = o || (xe.cssNumber[n] ? "" : "px")
    },
    cur: function() {
        var e = P.propHooks[this.prop];
        return e && e.get ? e.get(this) : P.propHooks._default.get(this)
    },
    run: function(e) {
        var t, n = P.propHooks[this.prop];
        return this.options.duration ? this.pos = t = xe.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : this.pos = t = e, this.now = (this.end - this.start) * t + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), n && n.set ? n.set(this) : P.propHooks._default.set(this), this
    }
}, P.prototype.init.prototype = P.prototype, P.propHooks = {
    _default: {
        get: function(e) {
            var t;
            return 1 !== e.elem.nodeType || null != e.elem[e.prop] && null == e.elem.style[e.prop] ? e.elem[e.prop] : (t = xe.css(e.elem, e.prop, ""), t && "auto" !== t ? t : 0)
        },
        set: function(e) {
            xe.fx.step[e.prop] ? xe.fx.step[e.prop](e) : 1 !== e.elem.nodeType || null == e.elem.style[xe.cssProps[e.prop]] && !xe.cssHooks[e.prop] ? e.elem[e.prop] = e.now : xe.style(e.elem, e.prop, e.now + e.unit)
        }
    }
}, P.propHooks.scrollTop = P.propHooks.scrollLeft = {
    set: function(e) {
        e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now)
    }
}, xe.easing = {
    linear: function(e) {
        return e
    },
    swing: function(e) {
        return .5 - Math.cos(e * Math.PI) / 2
    },
    _default: "swing"
}, xe.fx = P.prototype.init, xe.fx.step = {};
var vt, xt, bt = /^(?:toggle|show|hide)$/,
    yt = /queueHooks$/;
xe.Animation = xe.extend(X, {
        tweeners: {
            "*": [function(e, t) {
                var n = this.createTween(e, t);
                return x(n.elem, e, ze.exec(t), n), n
            }]
        },
        tweener: function(e, t) {
            xe.isFunction(e) ? (t = e, e = ["*"]) : e = e.match(Ge);
            for (var n, r = 0, i = e.length; r < i; r++) n = e[r], X.tweeners[n] = X.tweeners[n] || [], X.tweeners[n].unshift(t)
        },
        prefilters: [B],
        prefilter: function(e, t) {
            t ? X.prefilters.unshift(e) : X.prefilters.push(e)
        }
    }), xe.speed = function(e, t, n) {
        var r = e && "object" == typeof e ? xe.extend({}, e) : {
            complete: n || !n && t || xe.isFunction(e) && e,
            duration: e,
            easing: n && t || t && !xe.isFunction(t) && t
        };
        return xe.fx.off || oe.hidden ? r.duration = 0 : "number" != typeof r.duration && (r.duration in xe.fx.speeds ? r.duration = xe.fx.speeds[r.duration] : r.duration = xe.fx.speeds._default), null != r.queue && r.queue !== !0 || (r.queue = "fx"), r.old = r.complete, r.complete = function() {
            xe.isFunction(r.old) && r.old.call(this), r.queue && xe.dequeue(this, r.queue)
        }, r
    }, xe.fn.extend({
        fadeTo: function(e, t, n, r) {
            return this.filter(Be).css("opacity", 0).show().end().animate({
                opacity: t
            }, e, n, r)
        },
        animate: function(e, t, n, r) {
            var i = xe.isEmptyObject(e),
                o = xe.speed(t, n, r),
                a = function() {
                    var t = X(this, xe.extend({}, e), o);
                    (i || He.get(this, "finish")) && t.stop(!0)
                };
            return a.finish = a, i || o.queue === !1 ? this.each(a) : this.queue(o.queue, a)
        },
        stop: function(e, t, n) {
            var r = function(e) {
                var t = e.stop;
                delete e.stop, t(n)
            };
            return "string" != typeof e && (n = t, t = e, e = void 0), t && e !== !1 && this.queue(e || "fx", []), this.each(function() {
                var t = !0,
                    i = null != e && e + "queueHooks",
                    o = xe.timers,
                    a = He.get(this);
                if (i) a[i] && a[i].stop && r(a[i]);
                else
                    for (i in a) a[i] && a[i].stop && yt.test(i) && r(a[i]);
                for (i = o.length; i--;) o[i].elem !== this || null != e && o[i].queue !== e || (o[i].anim.stop(n), t = !1, o.splice(i, 1));
                !t && n || xe.dequeue(this, e)
            })
        },
        finish: function(e) {
            return e !== !1 && (e = e || "fx"), this.each(function() {
                var t, n = He.get(this),
                    r = n[e + "queue"],
                    i = n[e + "queueHooks"],
                    o = xe.timers,
                    a = r ? r.length : 0;
                for (n.finish = !0, xe.queue(this, e, []), i && i.stop && i.stop.call(this, !0), t = o.length; t--;) o[t].elem === this && o[t].queue === e && (o[t].anim.stop(!0), o.splice(t, 1));
                for (t = 0; t < a; t++) r[t] && r[t].finish && r[t].finish.call(this);
                delete n.finish
            })
        }
    }), xe.each(["toggle", "show", "hide"], function(e, t) {
        var n = xe.fn[t];
        xe.fn[t] = function(e, r, i) {
            return null == e || "boolean" == typeof e ? n.apply(this, arguments) : this.animate(z(t, !0), e, r, i)
        }
    }), xe.each({
        slideDown: z("show"),
        slideUp: z("hide"),
        slideToggle: z("toggle"),
        fadeIn: {
            opacity: "show"
        },
        fadeOut: {
            opacity: "hide"
        },
        fadeToggle: {
            opacity: "toggle"
        }
    }, function(e, t) {
        xe.fn[e] = function(e, n, r) {
            return this.animate(t, e, n, r)
        }
    }), xe.timers = [], xe.fx.tick = function() {
        var e, t = 0,
            n = xe.timers;
        for (vt = xe.now(); t < n.length; t++) e = n[t], e() || n[t] !== e || n.splice(t--, 1);
        n.length || xe.fx.stop(), vt = void 0
    }, xe.fx.timer = function(e) {
        xe.timers.push(e), e() ? xe.fx.start() : xe.timers.pop()
    }, xe.fx.interval = 13, xe.fx.start = function() {
        xt || (xt = n.requestAnimationFrame ? n.requestAnimationFrame(I) : n.setInterval(xe.fx.tick, xe.fx.interval))
    }, xe.fx.stop = function() {
        n.cancelAnimationFrame ? n.cancelAnimationFrame(xt) : n.clearInterval(xt), xt = null
    }, xe.fx.speeds = {
        slow: 600,
        fast: 200,
        _default: 400
    }, xe.fn.delay = function(e, t) {
        return e = xe.fx ? xe.fx.speeds[e] || e : e, t = t || "fx", this.queue(t, function(t, r) {
            var i = n.setTimeout(t, e);
            r.stop = function() {
                n.clearTimeout(i)
            }
        })
    },
    function() {
        var e = oe.createElement("input"),
            t = oe.createElement("select"),
            n = t.appendChild(oe.createElement("option"));
        e.type = "checkbox", ge.checkOn = "" !== e.value, ge.optSelected = n.selected, e = oe.createElement("input"), e.value = "t", e.type = "radio", ge.radioValue = "t" === e.value
    }();
var wt, kt = xe.expr.attrHandle;
xe.fn.extend({
    attr: function(e, t) {
        return qe(this, xe.attr, e, t, arguments.length > 1)
    },
    removeAttr: function(e) {
        return this.each(function() {
            xe.removeAttr(this, e)
        })
    }
}), xe.extend({
    attr: function(e, t, n) {
        var r, i, o = e.nodeType;
        if (3 !== o && 8 !== o && 2 !== o) return "undefined" == typeof e.getAttribute ? xe.prop(e, t, n) : (1 === o && xe.isXMLDoc(e) || (i = xe.attrHooks[t.toLowerCase()] || (xe.expr.match.bool.test(t) ? wt : void 0)), void 0 !== n ? null === n ? void xe.removeAttr(e, t) : i && "set" in i && void 0 !== (r = i.set(e, n, t)) ? r : (e.setAttribute(t, n + ""), n) : i && "get" in i && null !== (r = i.get(e, t)) ? r : (r = xe.find.attr(e, t), null == r ? void 0 : r))
    },
    attrHooks: {
        type: {
            set: function(e, t) {
                if (!ge.radioValue && "radio" === t && xe.nodeName(e, "input")) {
                    var n = e.value;
                    return e.setAttribute("type", t), n && (e.value = n), t
                }
            }
        }
    },
    removeAttr: function(e, t) {
        var n, r = 0,
            i = t && t.match(Ge);
        if (i && 1 === e.nodeType)
            for (; n = i[r++];) e.removeAttribute(n)
    }
}), wt = {
    set: function(e, t, n) {
        return t === !1 ? xe.removeAttr(e, n) : e.setAttribute(n, n), n
    }
}, xe.each(xe.expr.match.bool.source.match(/\w+/g), function(e, t) {
    var n = kt[t] || xe.find.attr;
    kt[t] = function(e, t, r) {
        var i, o, a = t.toLowerCase();
        return r || (o = kt[a], kt[a] = i, i = null != n(e, t, r) ? a : null, kt[a] = o), i
    }
});
var Tt = /^(?:input|select|textarea|button)$/i,
    Ct = /^(?:a|area)$/i;
xe.fn.extend({
    prop: function(e, t) {
        return qe(this, xe.prop, e, t, arguments.length > 1)
    },
    removeProp: function(e) {
        return this.each(function() {
            delete this[xe.propFix[e] || e]
        })
    }
}), xe.extend({
    prop: function(e, t, n) {
        var r, i, o = e.nodeType;
        if (3 !== o && 8 !== o && 2 !== o) return 1 === o && xe.isXMLDoc(e) || (t = xe.propFix[t] || t, i = xe.propHooks[t]), void 0 !== n ? i && "set" in i && void 0 !== (r = i.set(e, n, t)) ? r : e[t] = n : i && "get" in i && null !== (r = i.get(e, t)) ? r : e[t]
    },
    propHooks: {
        tabIndex: {
            get: function(e) {
                var t = xe.find.attr(e, "tabindex");
                return t ? parseInt(t, 10) : Tt.test(e.nodeName) || Ct.test(e.nodeName) && e.href ? 0 : -1
            }
        }
    },
    propFix: {
        for: "htmlFor",
        class: "className"
    }
}), ge.optSelected || (xe.propHooks.selected = {
    get: function(e) {
        var t = e.parentNode;
        return t && t.parentNode && t.parentNode.selectedIndex, null
    },
    set: function(e) {
        var t = e.parentNode;
        t && (t.selectedIndex, t.parentNode && t.parentNode.selectedIndex)
    }
}), xe.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function() {
    xe.propFix[this.toLowerCase()] = this
}), xe.fn.extend({
    addClass: function(e) {
        var t, n, r, i, o, a, s, l = 0;
        if (xe.isFunction(e)) return this.each(function(t) {
            xe(this).addClass(e.call(this, t, Y(this)))
        });
        if ("string" == typeof e && e)
            for (t = e.match(Ge) || []; n = this[l++];)
                if (i = Y(n), r = 1 === n.nodeType && " " + U(i) + " ") {
                    for (a = 0; o = t[a++];) r.indexOf(" " + o + " ") < 0 && (r += o + " ");
                    s = U(r), i !== s && n.setAttribute("class", s)
                }
        return this
    },
    removeClass: function(e) {
        var t, n, r, i, o, a, s, l = 0;
        if (xe.isFunction(e)) return this.each(function(t) {
            xe(this).removeClass(e.call(this, t, Y(this)))
        });
        if (!arguments.length) return this.attr("class", "");
        if ("string" == typeof e && e)
            for (t = e.match(Ge) || []; n = this[l++];)
                if (i = Y(n), r = 1 === n.nodeType && " " + U(i) + " ") {
                    for (a = 0; o = t[a++];)
                        for (; r.indexOf(" " + o + " ") > -1;) r = r.replace(" " + o + " ", " ");
                    s = U(r), i !== s && n.setAttribute("class", s)
                }
        return this
    },
    toggleClass: function(e, t) {
        var n = typeof e;
        return "boolean" == typeof t && "string" === n ? t ? this.addClass(e) : this.removeClass(e) : xe.isFunction(e) ? this.each(function(n) {
            xe(this).toggleClass(e.call(this, n, Y(this), t), t)
        }) : this.each(function() {
            var t, r, i, o;
            if ("string" === n)
                for (r = 0, i = xe(this), o = e.match(Ge) || []; t = o[r++];) i.hasClass(t) ? i.removeClass(t) : i.addClass(t);
            else void 0 !== e && "boolean" !== n || (t = Y(this), t && He.set(this, "__className__", t), this.setAttribute && this.setAttribute("class", t || e === !1 ? "" : He.get(this, "__className__") || ""))
        })
    },
    hasClass: function(e) {
        var t, n, r = 0;
        for (t = " " + e + " "; n = this[r++];)
            if (1 === n.nodeType && (" " + U(Y(n)) + " ").indexOf(t) > -1) return !0;
        return !1
    }
});
var _t = /\r/g;
xe.fn.extend({
    val: function(e) {
        var t, n, r, i = this[0]; {
            if (arguments.length) return r = xe.isFunction(e), this.each(function(n) {
                var i;
                1 === this.nodeType && (i = r ? e.call(this, n, xe(this).val()) : e, null == i ? i = "" : "number" == typeof i ? i += "" : xe.isArray(i) && (i = xe.map(i, function(e) {
                    return null == e ? "" : e + ""
                })), t = xe.valHooks[this.type] || xe.valHooks[this.nodeName.toLowerCase()], t && "set" in t && void 0 !== t.set(this, i, "value") || (this.value = i))
            });
            if (i) return t = xe.valHooks[i.type] || xe.valHooks[i.nodeName.toLowerCase()], t && "get" in t && void 0 !== (n = t.get(i, "value")) ? n : (n = i.value, "string" == typeof n ? n.replace(_t, "") : null == n ? "" : n)
        }
    }
}), xe.extend({
    valHooks: {
        option: {
            get: function(e) {
                var t = xe.find.attr(e, "value");
                return null != t ? t : U(xe.text(e))
            }
        },
        select: {
            get: function(e) {
                var t, n, r, i = e.options,
                    o = e.selectedIndex,
                    a = "select-one" === e.type,
                    s = a ? null : [],
                    l = a ? o + 1 : i.length;
                for (r = o < 0 ? l : a ? o : 0; r < l; r++)
                    if (n = i[r], (n.selected || r === o) && !n.disabled && (!n.parentNode.disabled || !xe.nodeName(n.parentNode, "optgroup"))) {
                        if (t = xe(n).val(), a) return t;
                        s.push(t)
                    }
                return s
            },
            set: function(e, t) {
                for (var n, r, i = e.options, o = xe.makeArray(t), a = i.length; a--;) r = i[a], (r.selected = xe.inArray(xe.valHooks.option.get(r), o) > -1) && (n = !0);
                return n || (e.selectedIndex = -1), o
            }
        }
    }
}), xe.each(["radio", "checkbox"], function() {
    xe.valHooks[this] = {
        set: function(e, t) {
            if (xe.isArray(t)) return e.checked = xe.inArray(xe(e).val(), t) > -1
        }
    }, ge.checkOn || (xe.valHooks[this].get = function(e) {
        return null === e.getAttribute("value") ? "on" : e.value
    })
});
var St = /^(?:focusinfocus|focusoutblur)$/;
xe.extend(xe.event, {
    trigger: function(e, t, r, i) {
        var o, a, s, l, c, u, p, d = [r || oe],
            f = fe.call(e, "type") ? e.type : e,
            h = fe.call(e, "namespace") ? e.namespace.split(".") : [];
        if (a = s = r = r || oe, 3 !== r.nodeType && 8 !== r.nodeType && !St.test(f + xe.event.triggered) && (f.indexOf(".") > -1 && (h = f.split("."), f = h.shift(), h.sort()), c = f.indexOf(":") < 0 && "on" + f, e = e[xe.expando] ? e : new xe.Event(f, "object" == typeof e && e), e.isTrigger = i ? 2 : 3, e.namespace = h.join("."), e.rnamespace = e.namespace ? new RegExp("(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, e.result = void 0, e.target || (e.target = r), t = null == t ? [e] : xe.makeArray(t, [e]), p = xe.event.special[f] || {}, i || !p.trigger || p.trigger.apply(r, t) !== !1)) {
            if (!i && !p.noBubble && !xe.isWindow(r)) {
                for (l = p.delegateType || f, St.test(l + f) || (a = a.parentNode); a; a = a.parentNode) d.push(a), s = a;
                s === (r.ownerDocument || oe) && d.push(s.defaultView || s.parentWindow || n)
            }
            for (o = 0;
                (a = d[o++]) && !e.isPropagationStopped();) e.type = o > 1 ? l : p.bindType || f, u = (He.get(a, "events") || {})[e.type] && He.get(a, "handle"), u && u.apply(a, t), u = c && a[c], u && u.apply && Fe(a) && (e.result = u.apply(a, t), e.result === !1 && e.preventDefault());
            return e.type = f, i || e.isDefaultPrevented() || p._default && p._default.apply(d.pop(), t) !== !1 || !Fe(r) || c && xe.isFunction(r[f]) && !xe.isWindow(r) && (s = r[c], s && (r[c] = null), xe.event.triggered = f, r[f](), xe.event.triggered = void 0, s && (r[c] = s)), e.result
        }
    },
    simulate: function(e, t, n) {
        var r = xe.extend(new xe.Event, n, {
            type: e,
            isSimulated: !0
        });
        xe.event.trigger(r, null, t)
    }
}), xe.fn.extend({
    trigger: function(e, t) {
        return this.each(function() {
            xe.event.trigger(e, t, this)
        })
    },
    triggerHandler: function(e, t) {
        var n = this[0];
        if (n) return xe.event.trigger(e, t, n, !0)
    }
}), xe.each("blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(" "), function(e, t) {
    xe.fn[t] = function(e, n) {
        return arguments.length > 0 ? this.on(t, null, e, n) : this.trigger(t)
    }
}), xe.fn.extend({
    hover: function(e, t) {
        return this.mouseenter(e).mouseleave(t || e)
    }
}), ge.focusin = "onfocusin" in n, ge.focusin || xe.each({
    focus: "focusin",
    blur: "focusout"
}, function(e, t) {
    var n = function(e) {
        xe.event.simulate(t, e.target, xe.event.fix(e))
    };
    xe.event.special[t] = {
        setup: function() {
            var r = this.ownerDocument || this,
                i = He.access(r, t);
            i || r.addEventListener(e, n, !0), He.access(r, t, (i || 0) + 1)
        },
        teardown: function() {
            var r = this.ownerDocument || this,
                i = He.access(r, t) - 1;
            i ? He.access(r, t, i) : (r.removeEventListener(e, n, !0), He.remove(r, t))
        }
    }
});
var jt = n.location,
    Nt = xe.now(),
    Mt = /\?/;
xe.parseXML = function(e) {
    var t;
    if (!e || "string" != typeof e) return null;
    try {
        t = (new n.DOMParser).parseFromString(e, "text/xml")
    } catch (e) {
        t = void 0
    }
    return t && !t.getElementsByTagName("parsererror").length || xe.error("Invalid XML: " + e), t
};
var Et = /\[\]$/,
    Dt = /\r?\n/g,
    At = /^(?:submit|button|image|reset|file)$/i,
    Vt = /^(?:input|select|textarea|keygen)/i;
xe.param = function(e, t) {
    var n, r = [],
        i = function(e, t) {
            var n = xe.isFunction(t) ? t() : t;
            r[r.length] = encodeURIComponent(e) + "=" + encodeURIComponent(null == n ? "" : n)
        };
    if (xe.isArray(e) || e.jquery && !xe.isPlainObject(e)) xe.each(e, function() {
        i(this.name, this.value)
    });
    else
        for (n in e) Q(n, e[n], t, i);
    return r.join("&")
}, xe.fn.extend({
    serialize: function() {
        return xe.param(this.serializeArray())
    },
    serializeArray: function() {
        return this.map(function() {
            var e = xe.prop(this, "elements");
            return e ? xe.makeArray(e) : this
        }).filter(function() {
            var e = this.type;
            return this.name && !xe(this).is(":disabled") && Vt.test(this.nodeName) && !At.test(e) && (this.checked || !Ue.test(e))
        }).map(function(e, t) {
            var n = xe(this).val();
            return null == n ? null : xe.isArray(n) ? xe.map(n, function(e) {
                return {
                    name: t.name,
                    value: e.replace(Dt, "\r\n")
                }
            }) : {
                name: t.name,
                value: n.replace(Dt, "\r\n")
            }
        }).get()
    }
});
var Gt = /%20/g,
    Lt = /#.*$/,
    Ot = /([?&])_=[^&]*/,
    qt = /^(.*?):[ \t]*([^\r\n]*)$/gm,
    Ft = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
    Ht = /^(?:GET|HEAD)$/,
    Rt = /^\/\//,
    Pt = {},
    It = {},
    Wt = "*/".concat("*"),
    zt = oe.createElement("a");
zt.href = jt.href, xe.extend({
    active: 0,
    lastModified: {},
    etag: {},
    ajaxSettings: {
        url: jt.href,
        type: "GET",
        isLocal: Ft.test(jt.protocol),
        global: !0,
        processData: !0,
        async: !0,
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        accepts: {
            "*": Wt,
            text: "text/plain",
            html: "text/html",
            xml: "application/xml, text/xml",
            json: "application/json, text/javascript"
        },
        contents: {
            xml: /\bxml\b/,
            html: /\bhtml/,
            json: /\bjson\b/
        },
        responseFields: {
            xml: "responseXML",
            text: "responseText",
            json: "responseJSON"
        },
        converters: {
            "* text": String,
            "text html": !0,
            "text json": JSON.parse,
            "text xml": xe.parseXML
        },
        flatOptions: {
            url: !0,
            context: !0
        }
    },
    ajaxSetup: function(e, t) {
        return t ? ee(ee(e, xe.ajaxSettings), t) : ee(xe.ajaxSettings, e)
    },
    ajaxPrefilter: K(Pt),
    ajaxTransport: K(It),
    ajax: function(e, t) {
        function r(e, t, r, s) {
            var c, d, f, y, w, k = t;
            u || (u = !0, l && n.clearTimeout(l), i = void 0, a = s || "", T.readyState = e > 0 ? 4 : 0, c = e >= 200 && e < 300 || 304 === e, r && (y = te(h, T, r)), y = ne(h, y, T, c), c ? (h.ifModified && (w = T.getResponseHeader("Last-Modified"), w && (xe.lastModified[o] = w), w = T.getResponseHeader("etag"), w && (xe.etag[o] = w)), 204 === e || "HEAD" === h.type ? k = "nocontent" : 304 === e ? k = "notmodified" : (k = y.state, d = y.data, f = y.error, c = !f)) : (f = k, !e && k || (k = "error", e < 0 && (e = 0))), T.status = e, T.statusText = (t || k) + "", c ? v.resolveWith(m, [d, k, T]) : v.rejectWith(m, [T, k, f]), T.statusCode(b), b = void 0, p && g.trigger(c ? "ajaxSuccess" : "ajaxError", [T, h, c ? d : f]), x.fireWith(m, [T, k]), p && (g.trigger("ajaxComplete", [T, h]), --xe.active || xe.event.trigger("ajaxStop")))
        }
        "object" == typeof e && (t = e, e = void 0), t = t || {};
        var i, o, a, s, l, c, u, p, d, f, h = xe.ajaxSetup({}, t),
            m = h.context || h,
            g = h.context && (m.nodeType || m.jquery) ? xe(m) : xe.event,
            v = xe.Deferred(),
            x = xe.Callbacks("once memory"),
            b = h.statusCode || {},
            y = {},
            w = {},
            k = "canceled",
            T = {
                readyState: 0,
                getResponseHeader: function(e) {
                    var t;
                    if (u) {
                        if (!s)
                            for (s = {}; t = qt.exec(a);) s[t[1].toLowerCase()] = t[2];
                        t = s[e.toLowerCase()]
                    }
                    return null == t ? null : t
                },
                getAllResponseHeaders: function() {
                    return u ? a : null
                },
                setRequestHeader: function(e, t) {
                    return null == u && (e = w[e.toLowerCase()] = w[e.toLowerCase()] || e, y[e] = t), this
                },
                overrideMimeType: function(e) {
                    return null == u && (h.mimeType = e), this
                },
                statusCode: function(e) {
                    var t;
                    if (e)
                        if (u) T.always(e[T.status]);
                        else
                            for (t in e) b[t] = [b[t], e[t]];
                    return this
                },
                abort: function(e) {
                    var t = e || k;
                    return i && i.abort(t), r(0, t), this
                }
            };
        if (v.promise(T), h.url = ((e || h.url || jt.href) + "").replace(Rt, jt.protocol + "//"), h.type = t.method || t.type || h.method || h.type, h.dataTypes = (h.dataType || "*").toLowerCase().match(Ge) || [""], null == h.crossDomain) {
            c = oe.createElement("a");
            try {
                c.href = h.url, c.href = c.href, h.crossDomain = zt.protocol + "//" + zt.host != c.protocol + "//" + c.host
            } catch (e) {
                h.crossDomain = !0
            }
        }
        if (h.data && h.processData && "string" != typeof h.data && (h.data = xe.param(h.data, h.traditional)), Z(Pt, h, t, T), u) return T;
        p = xe.event && h.global, p && 0 === xe.active++ && xe.event.trigger("ajaxStart"), h.type = h.type.toUpperCase(), h.hasContent = !Ht.test(h.type), o = h.url.replace(Lt, ""), h.hasContent ? h.data && h.processData && 0 === (h.contentType || "").indexOf("application/x-www-form-urlencoded") && (h.data = h.data.replace(Gt, "+")) : (f = h.url.slice(o.length), h.data && (o += (Mt.test(o) ? "&" : "?") + h.data, delete h.data), h.cache === !1 && (o = o.replace(Ot, "$1"), f = (Mt.test(o) ? "&" : "?") + "_=" + Nt++ + f), h.url = o + f), h.ifModified && (xe.lastModified[o] && T.setRequestHeader("If-Modified-Since", xe.lastModified[o]), xe.etag[o] && T.setRequestHeader("If-None-Match", xe.etag[o])), (h.data && h.hasContent && h.contentType !== !1 || t.contentType) && T.setRequestHeader("Content-Type", h.contentType), T.setRequestHeader("Accept", h.dataTypes[0] && h.accepts[h.dataTypes[0]] ? h.accepts[h.dataTypes[0]] + ("*" !== h.dataTypes[0] ? ", " + Wt + "; q=0.01" : "") : h.accepts["*"]);
        for (d in h.headers) T.setRequestHeader(d, h.headers[d]);
        if (h.beforeSend && (h.beforeSend.call(m, T, h) === !1 || u)) return T.abort();
        if (k = "abort", x.add(h.complete), T.done(h.success), T.fail(h.error), i = Z(It, h, t, T)) {
            if (T.readyState = 1, p && g.trigger("ajaxSend", [T, h]), u) return T;
            h.async && h.timeout > 0 && (l = n.setTimeout(function() {
                T.abort("timeout")
            }, h.timeout));
            try {
                u = !1, i.send(y, r)
            } catch (e) {
                if (u) throw e;
                r(-1, e)
            }
        } else r(-1, "No Transport");
        return T
    },
    getJSON: function(e, t, n) {
        return xe.get(e, t, n, "json")
    },
    getScript: function(e, t) {
        return xe.get(e, void 0, t, "script")
    }
}), xe.each(["get", "post"], function(e, t) {
    xe[t] = function(e, n, r, i) {
        return xe.isFunction(n) && (i = i || r, r = n, n = void 0), xe.ajax(xe.extend({
            url: e,
            type: t,
            dataType: i,
            data: n,
            success: r
        }, xe.isPlainObject(e) && e))
    }
}), xe._evalUrl = function(e) {
    return xe.ajax({
        url: e,
        type: "GET",
        dataType: "script",
        cache: !0,
        async: !1,
        global: !1,
        throws: !0
    })
}, xe.fn.extend({
    wrapAll: function(e) {
        var t;
        return this[0] && (xe.isFunction(e) && (e = e.call(this[0])), t = xe(e, this[0].ownerDocument).eq(0).clone(!0), this[0].parentNode && t.insertBefore(this[0]), t.map(function() {
            for (var e = this; e.firstElementChild;) e = e.firstElementChild;
            return e
        }).append(this)), this
    },
    wrapInner: function(e) {
        return xe.isFunction(e) ? this.each(function(t) {
            xe(this).wrapInner(e.call(this, t))
        }) : this.each(function() {
            var t = xe(this),
                n = t.contents();
            n.length ? n.wrapAll(e) : t.append(e)
        })
    },
    wrap: function(e) {
        var t = xe.isFunction(e);
        return this.each(function(n) {
            xe(this).wrapAll(t ? e.call(this, n) : e)
        })
    },
    unwrap: function(e) {
        return this.parent(e).not("body").each(function() {
            xe(this).replaceWith(this.childNodes)
        }), this
    }
}), xe.expr.pseudos.hidden = function(e) {
    return !xe.expr.pseudos.visible(e)
}, xe.expr.pseudos.visible = function(e) {
    return !!(e.offsetWidth || e.offsetHeight || e.getClientRects().length)
}, xe.ajaxSettings.xhr = function() {
    try {
        return new n.XMLHttpRequest
    } catch (e) {}
};
var $t = {
        0: 200,
        1223: 204
    },
    Bt = xe.ajaxSettings.xhr();
ge.cors = !!Bt && "withCredentials" in Bt, ge.ajax = Bt = !!Bt, xe.ajaxTransport(function(e) {
    var t, r;
    if (ge.cors || Bt && !e.crossDomain) return {
        send: function(i, o) {
            var a, s = e.xhr();
            if (s.open(e.type, e.url, e.async, e.username, e.password), e.xhrFields)
                for (a in e.xhrFields) s[a] = e.xhrFields[a];
            e.mimeType && s.overrideMimeType && s.overrideMimeType(e.mimeType), e.crossDomain || i["X-Requested-With"] || (i["X-Requested-With"] = "XMLHttpRequest");
            for (a in i) s.setRequestHeader(a, i[a]);
            t = function(e) {
                return function() {
                    t && (t = r = s.onload = s.onerror = s.onabort = s.onreadystatechange = null, "abort" === e ? s.abort() : "error" === e ? "number" != typeof s.status ? o(0, "error") : o(s.status, s.statusText) : o($t[s.status] || s.status, s.statusText, "text" !== (s.responseType || "text") || "string" != typeof s.responseText ? {
                        binary: s.response
                    } : {
                        text: s.responseText
                    }, s.getAllResponseHeaders()))
                }
            }, s.onload = t(), r = s.onerror = t("error"), void 0 !== s.onabort ? s.onabort = r : s.onreadystatechange = function() {
                4 === s.readyState && n.setTimeout(function() {
                    t && r()
                })
            }, t = t("abort");
            try {
                s.send(e.hasContent && e.data || null)
            } catch (e) {
                if (t) throw e
            }
        },
        abort: function() {
            t && t()
        }
    }
}), xe.ajaxPrefilter(function(e) {
    e.crossDomain && (e.contents.script = !1)
}), xe.ajaxSetup({
    accepts: {
        script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
    },
    contents: {
        script: /\b(?:java|ecma)script\b/
    },
    converters: {
        "text script": function(e) {
            return xe.globalEval(e), e
        }
    }
}), xe.ajaxPrefilter("script", function(e) {
    void 0 === e.cache && (e.cache = !1), e.crossDomain && (e.type = "GET")
}), xe.ajaxTransport("script", function(e) {
    if (e.crossDomain) {
        var t, n;
        return {
            send: function(r, i) {
                t = xe("<script>").prop({
                    charset: e.scriptCharset,
                    src: e.url
                }).on("load error", n = function(e) {
                    t.remove(), n = null, e && i("error" === e.type ? 404 : 200, e.type)
                }), oe.head.appendChild(t[0])
            },
            abort: function() {
                n && n()
            }
        }
    }
});
var Jt = [],
    Xt = /(=)\?(?=&|$)|\?\?/;
xe.ajaxSetup({
    jsonp: "callback",
    jsonpCallback: function() {
        var e = Jt.pop() || xe.expando + "_" + Nt++;
        return this[e] = !0, e
    }
}), xe.ajaxPrefilter("json jsonp", function(e, t, r) {
    var i, o, a, s = e.jsonp !== !1 && (Xt.test(e.url) ? "url" : "string" == typeof e.data && 0 === (e.contentType || "").indexOf("application/x-www-form-urlencoded") && Xt.test(e.data) && "data");
    if (s || "jsonp" === e.dataTypes[0]) return i = e.jsonpCallback = xe.isFunction(e.jsonpCallback) ? e.jsonpCallback() : e.jsonpCallback, s ? e[s] = e[s].replace(Xt, "$1" + i) : e.jsonp !== !1 && (e.url += (Mt.test(e.url) ? "&" : "?") + e.jsonp + "=" + i), e.converters["script json"] = function() {
        return a || xe.error(i + " was not called"), a[0]
    }, e.dataTypes[0] = "json", o = n[i], n[i] = function() {
        a = arguments
    }, r.always(function() {
        void 0 === o ? xe(n).removeProp(i) : n[i] = o, e[i] && (e.jsonpCallback = t.jsonpCallback, Jt.push(i)), a && xe.isFunction(o) && o(a[0]), a = o = void 0
    }), "script"
}), ge.createHTMLDocument = function() {
    var e = oe.implementation.createHTMLDocument("").body;
    return e.innerHTML = "<form></form><form></form>", 2 === e.childNodes.length
}(), xe.parseHTML = function(e, t, n) {
    if ("string" != typeof e) return [];
    "boolean" == typeof t && (n = t, t = !1);
    var r, i, o;
    return t || (ge.createHTMLDocument ? (t = oe.implementation.createHTMLDocument(""), r = t.createElement("base"), r.href = oe.location.href, t.head.appendChild(r)) : t = oe), i = je.exec(e), o = !n && [], i ? [t.createElement(i[1])] : (i = T([e], t, o), o && o.length && xe(o).remove(), xe.merge([], i.childNodes))
}, xe.fn.load = function(e, t, n) {
    var r, i, o, a = this,
        s = e.indexOf(" ");
    return s > -1 && (r = U(e.slice(s)), e = e.slice(0, s)), xe.isFunction(t) ? (n = t, t = void 0) : t && "object" == typeof t && (i = "POST"), a.length > 0 && xe.ajax({
        url: e,
        type: i || "GET",
        dataType: "html",
        data: t
    }).done(function(e) {
        o = arguments, a.html(r ? xe("<div>").append(xe.parseHTML(e)).find(r) : e)
    }).always(n && function(e, t) {
        a.each(function() {
            n.apply(this, o || [e.responseText, t, e])
        })
    }), this
}, xe.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(e, t) {
    xe.fn[t] = function(e) {
        return this.on(t, e)
    }
}), xe.expr.pseudos.animated = function(e) {
    return xe.grep(xe.timers, function(t) {
        return e === t.elem
    }).length
}, xe.offset = {
    setOffset: function(e, t, n) {
        var r, i, o, a, s, l, c, u = xe.css(e, "position"),
            p = xe(e),
            d = {};
        "static" === u && (e.style.position = "relative"), s = p.offset(), o = xe.css(e, "top"), l = xe.css(e, "left"), c = ("absolute" === u || "fixed" === u) && (o + l).indexOf("auto") > -1, c ? (r = p.position(), a = r.top, i = r.left) : (a = parseFloat(o) || 0, i = parseFloat(l) || 0), xe.isFunction(t) && (t = t.call(e, n, xe.extend({}, s))), null != t.top && (d.top = t.top - s.top + a), null != t.left && (d.left = t.left - s.left + i), "using" in t ? t.using.call(e, d) : p.css(d)
    }
}, xe.fn.extend({
    offset: function(e) {
        if (arguments.length) return void 0 === e ? this : this.each(function(t) {
            xe.offset.setOffset(this, e, t)
        });
        var t, n, r, i, o = this[0];
        if (o) return o.getClientRects().length ? (r = o.getBoundingClientRect(), r.width || r.height ? (i = o.ownerDocument, n = re(i), t = i.documentElement, {
            top: r.top + n.pageYOffset - t.clientTop,
            left: r.left + n.pageXOffset - t.clientLeft
        }) : r) : {
            top: 0,
            left: 0
        }
    },
    position: function() {
        if (this[0]) {
            var e, t, n = this[0],
                r = {
                    top: 0,
                    left: 0
                };
            return "fixed" === xe.css(n, "position") ? t = n.getBoundingClientRect() : (e = this.offsetParent(), t = this.offset(), xe.nodeName(e[0], "html") || (r = e.offset()), r = {
                top: r.top + xe.css(e[0], "borderTopWidth", !0),
                left: r.left + xe.css(e[0], "borderLeftWidth", !0)
            }), {
                top: t.top - r.top - xe.css(n, "marginTop", !0),
                left: t.left - r.left - xe.css(n, "marginLeft", !0)
            }
        }
    },
    offsetParent: function() {
        return this.map(function() {
            for (var e = this.offsetParent; e && "static" === xe.css(e, "position");) e = e.offsetParent;
            return e || et
        })
    }
}), xe.each({
    scrollLeft: "pageXOffset",
    scrollTop: "pageYOffset"
}, function(e, t) {
    var n = "pageYOffset" === t;
    xe.fn[e] = function(r) {
        return qe(this, function(e, r, i) {
            var o = re(e);
            return void 0 === i ? o ? o[t] : e[r] : void(o ? o.scrollTo(n ? o.pageXOffset : i, n ? i : o.pageYOffset) : e[r] = i)
        }, e, r, arguments.length)
    }
}), xe.each(["top", "left"], function(e, t) {
    xe.cssHooks[t] = O(ge.pixelPosition, function(e, n) {
        if (n) return n = L(e, t), ut.test(n) ? xe(e).position()[t] + "px" : n
    })
}), xe.each({
    Height: "height",
    Width: "width"
}, function(e, t) {
    xe.each({
        padding: "inner" + e,
        content: t,
        "": "outer" + e
    }, function(n, r) {
        xe.fn[r] = function(i, o) {
            var a = arguments.length && (n || "boolean" != typeof i),
                s = n || (i === !0 || o === !0 ? "margin" : "border");
            return qe(this, function(t, n, i) {
                var o;
                return xe.isWindow(t) ? 0 === r.indexOf("outer") ? t["inner" + e] : t.document.documentElement["client" + e] : 9 === t.nodeType ? (o = t.documentElement, Math.max(t.body["scroll" + e], o["scroll" + e], t.body["offset" + e], o["offset" + e], o["client" + e])) : void 0 === i ? xe.css(t, n, s) : xe.style(t, n, i, s)
            }, t, a ? i : void 0, a)
        }
    })
}), xe.fn.extend({
    bind: function(e, t, n) {
        return this.on(e, null, t, n)
    },
    unbind: function(e, t) {
        return this.off(e, null, t)
    },
    delegate: function(e, t, n, r) {
        return this.on(t, e, n, r)
    },
    undelegate: function(e, t, n) {
        return 1 === arguments.length ? this.off(e, "**") : this.off(t, e || "**", n)
    }
}), xe.parseJSON = JSON.parse, r = [], i = function() {
    return xe
}.apply(t, r), !(void 0 !== i && (e.exports = i));
var Ut = n.jQuery,
    Yt = n.$;
return xe.noConflict = function(e) {
return n.$ === xe && (n.$ = Yt), e && n.jQuery === xe && (n.jQuery = Ut), xe
}, o || (n.jQuery = n.$ = xe), xe
})
},
function(e, t, n) {
    "use strict";

    function r(e) {
        0 == GM_getValue("tab-selected") && (0 == e ? x(".risi-tab").children("img").attr("src", "http://imgur.com/rmghOcP.png") : x(".risi-tab").children("img").attr("src", "http://imgur.com/V9OsBLW.png"))
    }

    function i() {
        function e() {
            if (0 == x("#risi-rtab").length) {
                x(x(".f-tabs-r")[0]).prepend('\n            <div id="risi-rtab">\n                <input type="text" tabindex="-1" placeholder="RisiBank..." id="risi-recherche" />\n            </div>\n            <div id="risi-rlogo">\n                %\n                <div id="rDIV_2">\n                    <div id="rDIV_3">\n                        <div id="rDIV_4">\n                            Recherche\n                        </div>\n                        <div id="rDIV_5">\n                        </div>\n                    </div>\n                </div>\n            </div>\n            <div id="risi-random">\n                <img id="randimg" src="http://imgur.com/cTggmiX.png" alt="Aléatoire"/>\n                <div id="randDIV_2">\n                </div>\n            </div>\n            <div id="risi-setting">\n                <img id="settimg" src="http://i.imgur.com/k7nmT3Y.png" alt="Aléatoire"/>\n                <div id="settDIV_2">\n                </div>\n            </div>\n\n        '), x("#randimg").hover(function() {
                    x("#randimg").attr("src", "http://imgur.com/6TX9wKa.png")
                }), x("#randimg").mouseout(function() {
                    x("#randimg").attr("src", "http://imgur.com/cTggmiX.png")
                }), x("#settimg").hover(function() {
                    x("#settimg").attr("src", "http://i.imgur.com/elL1AZl.png")
                }), x("#settimg").mouseout(function() {
                    x("#settimg").attr("src", "http://i.imgur.com/k7nmT3Y.png")
                }), x("#risi-setting").click(function() {
                    b.settings_start()
                }), x("#risi-random").click(u);
                var t;
                x("#risi-recherche").keypress(function(e) {
                    t && (clearTimeout(t), t = null), t = setTimeout(m, 500)
                })
            } else x("#risi-rtab").show(), x("#risi-rlogo").show(), x("#risi-random").show();
            1 == x('.f-tabs img[src="http://image.noelshack.com/fichiers/2016/23/1465690515-refresh.png"]').length && setTimeout(e, 500)
        }
        1 == x('.f-tabs img[src="http://image.noelshack.com/fichiers/2016/23/1465690515-refresh.png"]').length && (x('.f-tabs img[src="http://image.noelshack.com/fichiers/2016/23/1465690515-refresh.png"]').hide(), x('.f-tabs img[src="http://image.noelshack.com/fichiers/2016/24/1465930183-application-x-desktop.png"]').hide(), x("#risi-setting").show(), x(x(".f-tabs-r")[0]).removeAttr("style"), x(".f-tabs-l").css("width", "450px"), x("#historiqueStkr").hide()), GM_setValue("tab-selected", !0), x(".f-active").removeClass("f-active"), x(".risi-tab").children("img").attr("src", "http://imgur.com/V9OsBLW.png"), x(".f-stkrs").not(".risi-panel").hide(), x(".f-tab-search").addClass("f-active"), x(".f-txt-w").hide(), x(".f-tab-search-field").hide(), x(".f-tab-search").hide(), x(".f-tab-store").hide(), e(), 0 == x(".risi-smenu").length ? (x(".jv-editor-stickers").append('\n\n            <div class="risi-smenu">\n                <div class="risi-smitem" nb="0">Nouveaux</div>\n                <div class="risi-smitem" nb="1">Populaires</div>\n                <div class="risi-smitem" nb="2">Mes Favoris</div>\n            </div>\n\n        '), x(".risi-smitem").click(function(e) {
            GM_setValue("cat-selected", Number(x(e.target).attr("nb"))), d(GM_getValue("cat-selected"))
        })) : x(".risi-smenu").show(), 0 == x(".risi-panel").length ? x(".f-stkrs-w").append('\n        <div class="risi-panel f-stkrs f-cfx"></div>\n        ') : x(".risi-panel").show(), d(GM_getValue("cat-selected")), f()
    }

    function o() {
        1 == x('.f-tabs img[src="http://image.noelshack.com/fichiers/2016/23/1465690515-refresh.png"]').length && (x('.f-tabs img[src="http://image.noelshack.com/fichiers/2016/23/1465690515-refresh.png"]').show(), x('.f-tabs img[src="http://image.noelshack.com/fichiers/2016/24/1465930183-application-x-desktop.png"]').show(), x("#risi-setting").hide(), x(x(".f-tabs-r")[0]).hide(), x(".f-tabs-l").css("width", "600px"), x("#historiqueStkr").show()), GM_setValue("tab-selected", !1), x(".risi-tab").children("img").attr("src", "http://imgur.com/rmghOcP.png"), x(".f-stkrs").not(".risi-panel").show(), x(".risi-panel").hide(), x(".f-tab-search").addClass("f-active"), x(".risi-recherche").addClass("f-search-field"), x(".f-search-field").removeClass("risi-recherche"), x(".f-txt-w").show(), x("#risi-rtab").hide(), x("#risi-rlogo").hide(), x(".f-tab-search").show(), x(".f-tab-search-field").show(), x(".f-tab-store").show(), x("#risi-random").hide(), x(".risi-smenu").hide(), x(".risi-used").hide()
    }

    function a(e) {
        if (void 0 !== e) {
            x(".risi-panel").empty();
            for (var t = 0; t < e.length; t++) {
                for (var n = "http://image.noelshack.com/fichiers/" + e[t].link, r = '<img class="risi-fav" src="http://imgur.com/Ir7m3qc.png"/>', i = JSON.parse(GM_getValue("risi-fav")), o = 0; o < i.length; o++)
                    if (i[o].link == e[t].link) {
                        r = 2 == GM_getValue("cat-selected") ? '<img class="risi-fdel" src="http://imgur.com/Wn9QmN9.png"/>' : "";
                        break
                    }
                x(".risi-panel").append('\n        <div title="Sticker de ' + e[t].pseudo + '" class="risi-sticker" rurl="' + e[t].link + '" rpseudo="' + e[t].pseudo + '">\n            ' + r + '\n            <img class="risi-img" src="' + n + '"/>\n        </div>\n        ')
            }
            x(".risi-img").click(function(e) {
                var t = x(e.target).attr("src"),
                    n = x(e.target).parent().attr("rpseudo"),
                    r = x(e.target).parent().attr("rurl");
                h(r, n), f();
                var i = x(x(".area-editor")[0]).prop("selectionStart"),
                    o = x(x(".area-editor")[0]).val(),
                    a = o.substring(0, i),
                    s = o.substring(i, o.length);
                x(x(".area-editor")[0]).val(a + " " + t + " " + s), x(x(".area-editor")[0]).focus()
            }), x(".risi-fav").click(function(e) {
                x(e.target).hide(), s(x(e.target).parent().attr("rurl"), x(e.target).parent().attr("rpseudo"))
            }), x(".risi-fdel").click(function(e) {
                x(e.target).hide(), l(x(e.target).parent().attr("rurl"))
            })
        }
    }

    function s(e, t) {
        for (var n = JSON.parse(GM_getValue("risi-fav")), r = 0; r < n.length; r++)
            if (n[r].link == e) return;
        n.unshift({
            link: e,
            pseudo: t
        }), GM_setValue("risi-fav", JSON.stringify(n))
    }

    function l(e) {
        for (var t = JSON.parse(GM_getValue("risi-fav")), n = 0; n < t.length; n++)
            if (t[n].link == e) {
                t.splice(n, 1);
                break
            }
        GM_setValue("risi-fav", JSON.stringify(t)), 2 == GM_getValue("cat-selected") && c()
    }

    function c() {
        a(JSON.parse(GM_getValue("risi-fav")))
    }

    function u() {
        x(".risi-smitemactif").removeClass("risi-smitemactif"), GM_xmlhttpRequest({
            method: "GET",
            url: "http://api.risibank.fr/api/v0/load",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            onload: function(e) {
                var t = JSON.parse(e.responseText);
                alert(JSON.stringify(t));
                void 0 == t.error && a(t.stickers.random)
            }
        })
    }

    function p(e) {
        null == y ? (y = [], GM_xmlhttpRequest({
            method: "GET",
            url: "http://api.risibank.fr/api/v0/load",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            onload: function(t) {
                var n = JSON.parse(t.responseText);
                void 0 == n.error ? (y = n.stickers, a("pop" == e ? y.views : y.tms)) : (y = null, p(e))
            }
        })) : y != [] && a("pop" == e ? y.views : y.tms)
    }

    function d(e) {
        x(".risi-smitemactif").removeClass("risi-smitemactif"), x(x(".risi-smitem")[e]).addClass("risi-smitemactif"), 0 == e ? p("new") : 1 == e ? p("pop") : 2 == e && c()
    }

    function f() {
        var e = JSON.parse(GM_getValue("risi-used"));
        x(".risi-used").empty(), e.sort(function(e, t) {
            return t.count - e.count
        });
        for (var t = 0; t < Math.min(7, e.length); t++) x(".risi-used").append('\n        <div title="Sticker de ' + e[t].pseudo + '" class="risi-sticker" rurl="' + e[t].link + '" rpseudo="' + e[t].pseudo + '">\n            <img class="risi-mimg" src="http://image.noelshack.com/fichiers/' + e[t].link + '"/>\n        </div>\n        ');
        x(".risi-mimg").click(function(e) {
            var t = x(e.target).parent().attr("rurl"),
                n = x(e.target).parent().attr("rpseudo"),
                r = x(e.target).attr("src");
            h(t, n), f();
            var i = x(x(".area-editor")[0]).prop("selectionStart"),
                o = x(x(".area-editor")[0]).val(),
                a = o.substring(0, i),
                s = o.substring(i, o.length);
            x(x(".area-editor")[0]).val(a + " " + r + " " + s), x(x(".area-editor")[0]).focus()
        })
    }

    function h(e, t) {
        for (var n = JSON.parse(GM_getValue("risi-used")), r = 0; r < n.length; r++)
            if (n[r].link == e) return n[r].count = n[r].count + 1, void GM_setValue("risi-used", JSON.stringify(n));
        n.push({
            link: e,
            pseudo: t,
            count: 0
        }), GM_setValue("risi-used", JSON.stringify(n))
    }

    function m() {
        x(".risi-smitemactif").removeClass("risi-smitemactif"), GM_xmlhttpRequest({
            method: "POST",
            url: "http://api.risibank.fr/api/v0/search",
            data: "search=" + x("#risi-recherche").val(),
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            onload: function(e) {
                var t = JSON.parse(e.responseText);
                void 0 == t.error && a(t.stickers)
            }
        })
    }

    function g(e) {
        GM_xmlhttpRequest({
            method: "POST",
            url: "http://api.risibank.fr/api/v0/addviewbyurl",
            data: "link=" + e,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            onload: function(e) {
                var t = JSON.parse(e.responseText);
                "ok" == t.message
            }
        })
    }

    function v(e) {
        var t = /^.*\/\/www.noelshack.com\/([0-9]+)-([0-9]+)-(.*)$/g,
            n = t.exec(e);
        return null == n ? e : "http://image.noelshack.com/fichiers/" + n[1] + "/" + n[2] + "/" + n[3]
    }
    var x = n(1),
        b = n(3),
        y = null;
    t.tabrisibak_start = function() {
        function e() {
            0 === x(".risi-tab").length && (x(".f-tabs-l").prepend('<div class="f-tab f-h risi-tab"><img src="http://imgur.com/rmghOcP.png" alt="RisiBank"/></div>'), GM_getValue("tab-selected") && i(), x(".risi-tab").mouseover(function() {
                r(1)
            }), x(".risi-tab").mouseout(function() {
                r(0)
            }), x(".risi-tab").click(i), x(".f-tab").not(".risi-tab").click(o)), x(".risi-used").length < x(".jv-editor-stickers").length ? x(".jv-editor-stickers").prepend('<div class="risi-used"></div>') : x(".risi-used").show(), setTimeout(e, 200)
        }
        e(), x(".btn-poster-msg").click(function() {
            for (var e, t = /http:\/\/image\.noelshack\.com\/fichiers\/[0-9]+\/[0-9]+\/[^ ]+\.(?:jpg|png|gif)/gm, n = x(x(".area-editor")[0]).val(); null !== (e = t.exec(n));) g(e[0])
        }), x(".plugin-addfav").click(function(e) {
            x(e.target).hide();
            var t = v(x(e.target).parent().parent().find(".img-shack").attr("alt")),
                n = /^http:\/\/image\.noelshack\.com\/fichiers\/(.+)$/,
                r = n.exec(t);
            null != r && (s(r[1], "mes stickers importés"), x(e.target).hide(), 2 == GM_getValue("cat-selected") && c())
        })
    }
},
function(e, t, n) {
    "use strict";

    function r(e) {
        var t = Number(i(e.target).parent().parent().attr("sid")),
            n = i(e.target).is(":checked");
        0 == t ? GM_setValue("mode-integre", n) : 1 == t ? GM_setValue("fond-blanc", n) : 2 == t ? GM_setValue("gif", n) : 3 == t ? "m.jeuxvideo.com" == window.location.hostname ? GM_setValue("recup-postmobile", n) : GM_setValue("recup-post", n) : 4 == t ? GM_setValue("youtube", n) : 5 == t ? GM_setValue("issouwebm", n) : 6 == t ? GM_setValue("vocaroo", n) : 7 == t ? GM_setValue("webm", n) : 8 == t && GM_setValue("eco-data", n), i(".sett-notif").show()
    }
    var i = n(1),
        o = n(4);
    t.settings_start = function() {
        0 == i("#settmodal").length ? (GM_addStyle(o), i("body").append('\n        <div id="settmodal" class="settmodal" style="z-index:10000000001">\n            <div class="settmodal-content">\n                <span class="settclose">&times;</span>\n                <div class="settmodal-body">\n                    <img class="settimg" src="http://image.noelshack.com/fichiers/2016/47/1480019829-pict.png"/>\n                    <h1>GENERAL</h1>\n                    <div class="settgroup" sid="0">\n                        <div class="settlabel">Utiliser le mode integré</div>\n                        <label class="settswitch">\n                            <input type="checkbox">\n                            <div class="settslider round"></div>\n                        </label>\n                    </div>\n                    <div class="settgroup" sid="1">\n                        <div class="settlabel">Fond blanc pour les messages</div>\n                        <label class="settswitch">\n                            <input type="checkbox">\n                            <div class="settslider round"></div>\n                        </label>\n                    </div>\n                    <div class="settgroup" sid="2">\n                        <div class="settlabel">GIF animés</div>\n                        <label class="settswitch">\n                            <input type="checkbox">\n                            <div class="settslider round"></div>\n                        </label>\n                    </div>\n                    <div class="settgroup" sid="3">\n                        <div class="settlabel">Bouton favoris dans les posts</div>\n                        <label class="settswitch">\n                            <input type="checkbox">\n                            <div class="settslider round"></div>\n                        </label>\n                    </div>\n                    <div class="settgroup" sid="8">\n                        <div class="settlabel">Economie data (miniatures)</div>\n                        <label class="settswitch">\n                            <input type="checkbox">\n                            <div class="settslider round"></div>\n                        </label>\n                    </div>\n                    <hr>\n                    <h1>LECTEURS</h1>\n                    <div class="settgroup" sid="4">\n                        <div class="settlabel">YouTube</div>\n                        <label class="settswitch">\n                            <input type="checkbox">\n                            <div class="settslider round"></div>\n                        </label>\n                    </div>\n                    <div class="settgroup" sid="5">\n                        <div class="settlabel">Vocaroo</div>\n                        <label class="settswitch">\n                            <input type="checkbox">\n                            <div class="settslider round"></div>\n                        </label>\n                    </div>\n                    <div class="settgroup" sid="6">\n                        <div class="settlabel">IssouTV & WebmShare</div>\n                        <label class="settswitch">\n                            <input type="checkbox">\n                            <div class="settslider round"></div>\n                        </label>\n                    </div>\n                    <div class="settgroup" sid="7">\n                        <div class="settlabel">Fichiers .webm</div>\n                        <label class="settswitch">\n                            <input type="checkbox">\n                            <div class="settslider round"></div>\n                        </label>\n                    </div>\n                    <div class="sett-notif">VEUILLEZ ACTUALISER LA PAGE</div>\n                </div>\n            </div>\n        </div>\n        '), GM_getValue("mode-integre") && i('.settgroup[sid="0"]').find("input").prop("checked", !0), GM_getValue("fond-blanc") && i('.settgroup[sid="1"]').find("input").prop("checked", !0), GM_getValue("gif") && i('.settgroup[sid="2"]').find("input").prop("checked", !0), (GM_getValue("recup-post") && "m.jeuxvideo.com" != window.location.hostname || GM_getValue("recup-postmobile") && "m.jeuxvideo.com" == window.location.hostname) && i('.settgroup[sid="3"]').find("input").prop("checked", !0), GM_getValue("youtube") && i('.settgroup[sid="4"]').find("input").prop("checked", !0), GM_getValue("issouwebm") && i('.settgroup[sid="5"]').find("input").prop("checked", !0), GM_getValue("vocaroo") && i('.settgroup[sid="6"]').find("input").prop("checked", !0), GM_getValue("webm") && i('.settgroup[sid="7"]').find("input").prop("checked", !0), GM_getValue("eco-data") && i('.settgroup[sid="8"]').find("input").prop("checked", !0), i(".settswitch").find(":checkbox").change(r), i(".settclose").click(function() {
            i("#settmodal").hide()
        })) : i("#settmodal").show()
    }
},
function(e, t) {
    e.exports = '/* The switch - the box around the slider */\r\n.settswitch {\r\n  position: absolute;\r\n  display: inline-block;\r\n  width: 60px;\r\n  height: 34px;\r\n  top: -5px;\r\n  right: 0;\r\n}\r\n\r\n/* Hide default HTML checkbox */\r\n.settswitch input {display:none;}\r\n\r\n/* The slider */\r\n.settslider {\r\n  position: absolute;\r\n  cursor: pointer;\r\n  top: 0;\r\n  left: 0;\r\n  right: 0;\r\n  bottom: 0;\r\n  background-color: #ccc;\r\n  -webkit-transition: .4s;\r\n  transition: .4s;\r\n}\r\n\r\n.settslider:before {\r\n  position: absolute;\r\n  content: "";\r\n  height: 26px;\r\n  width: 26px;\r\n  left: 4px;\r\n  bottom: 4px;\r\n  background-color: white;\r\n  -webkit-transition: .4s;\r\n  transition: .4s;\r\n}\r\n\r\ninput:checked + .settslider {\r\n  background-color: #4CAF50;;\r\n}\r\n\r\ninput:focus + .settslider {\r\n  box-shadow: 0 0 1px #4CAF50;;\r\n}\r\n\r\ninput:checked + .settslider:before {\r\n  -webkit-transform: translateX(26px);\r\n  -ms-transform: translateX(26px);\r\n  transform: translateX(26px);\r\n}\r\n\r\n/* Rounded sliders */\r\n.settslider.round {\r\n  border-radius: 34px;\r\n}\r\n\r\n.settslider.round:before {\r\n  border-radius: 50%;\r\n}\r\n\r\n\r\n.settmodal {\r\n    position: fixed;\r\n    z-index: 999999;\r\n    padding-top: 40px;\r\n    left: 0;\r\n    top: 0;\r\n    width: 100%;\r\n    height: 100%;\r\n    overflow: auto;\r\n    background-color: rgb(0,0,0);\r\n    background-color: rgba(0,0,0,0.4);\r\n}\r\n.settmodal-content {\r\n    background-color: #fefefe;\r\n    margin: auto;\r\n    padding: 20px;\r\n    border: 1px solid #888;\r\n    width: 90%;\r\n    max-width: 500px;\r\n}\r\n\r\n.settclose {\r\n    color: #aaaaaa;\r\n    float: right;\r\n    font-size: 28px;\r\n    font-weight: bold;\r\n}\r\n\r\n.settclose:hover,\r\n.settclose:focus {\r\n    color: #000;\r\n    text-decoration: none;\r\n    cursor: pointer;\r\n}\r\n.settmodal-body {\r\n    width: 100%;\r\n    text-align: center;\r\n}\r\n\r\n.settimg {\r\n    width: 70%;\r\n    max-width: 300px;\r\n}\r\n\r\n.settmodal-body h1 {\r\n    color: #7a7a7a;\r\n    font-size: 35px;\r\n}\r\n\r\n.settgroup {\r\n    position: relative;\r\n    text-align: left;\r\n    width: 100%;\r\n    padding-bottom: 10px;\r\n}\r\n\r\n.settlabel {\r\n    font-size: 20px;\r\n    font-weight: bold;\r\n    color: #404040;\r\n    display: inline-block;\r\n    \r\n}\r\n.sett-notif {\r\n    display: none;\r\n    margin-top: 20px;\r\n    color: #d62d20;\r\n    font-size: 20px;\r\n    font-weight: bold;\r\n}\r\n\r\n\r\n@media screen and (max-width: 441px) {\r\n    .sett-notif {\r\n        font-size: 15px;\r\n    }\r\n    .settmodal-body h1 {\r\n        font-size: 25px;\r\n    }\r\n    .settgroup {\r\n        padding-bottom: 20px;\r\n    }\r\n    .settlabel{\r\n        font-size: 15px;\r\n    }\r\n    .settswitch {\r\n        top: -5px;\r\n    }\r\n}'
},
function(e, t, n) {
    "use strict";

    function r() {
        0 == v(".risi-jlogo").length && (v(".js-form-post").append('\n            <img class="risi-jlogo" src="http://i.imgur.com/V9OsBLW.png"/>\n        '), v(".risi-jlogo").click(o)), 0 == v("#risi-overlay").length && i(), setTimeout(r, 200)
    }

    function i() {
        v("body").append('\n        <div id="risi-overlay" class="overlay">\n            <a href="javascript:void(0)" class="closebtn"><img class="overcloseimg" src="http://imgur.com/YustvwD.png"/></a>\n            <a href="javascript:void(0)" class="settbtn"><img class="oversettimg" src="http://imgur.com/7TjQyC7.png"/></a>\n            <div class="overlay-content">\n                <img class="rlogo" src="http://image.noelshack.com/fichiers/2016/47/1480019829-pict.png"/>\n                <div class="risi-r">\n                    <h1 class="risi-rtitle"></h1>\n                    <div class="risi-rlist"></div>\n                </div>\n                <div class="risi-p">\n                    <h1 class="risi-hused">Les plus utilisés</h1>\n                    <div class="risi-used">\n                    </div>\n                    \n                    <h1 class="risi-hfav">Mes favoris</h1> \n                    <div class="risi-fav">\n                    \n                    </div>\n                </div>\n                <div class="risi-panel">\n                    <div class="risi-return">\n                        <img class="risi-return-img" src="http://imgur.com/CAL2VyK.png"/>\n                    </div>\n                    <input id="risi-recherche" placeholder="Rechercher..." type="text">\n                    <div class="risi-btngroup">\n                        <button class="risi-btn risi-new">Nouveautés</button>\n                        <button class="risi-btn risi-pop">Populaires</button>\n                        <button class="risi-btn risi-rand">Aléatoires</button>\n                    </div>\n                </div>\n            </div>\n        </div>\n    '), v(".settbtn").click(function() {
            a(), x.settings_start()
        }), v(document).keypress(function(e) {
            13 == e.which && (v("#risi-recherche").blur(), f())
        });
        var e;
        v(".closebtn").click(a), v("#risi-recherche").keypress(function() {
            e && (clearTimeout(e), e = null), e = setTimeout(f, 500)
        }), v(".risi-return").click(d), v(".risi-return-img").click(d), v(".risi-new").click(function() {
            return h(0)
        }), v(".risi-pop").click(function() {
            return h(1)
        }), v(".risi-rand").click(function() {
            return h(2)
        })
    }

    function o() {
        v("#risi-recherche").blur(), v("body").css("overflow-y", "hidden"), v("#risi-overlay").css("height", "100%"), v("#risi-overlay").css("z-index", "10000000000"), v(".risi-panel").show(), s(), l()
    }

    function a() {
        v("body").css("overflow-y", "visible"), v("#risi-overlay").css("height", "0%"), v(".risi-panel").hide()
    }

    function s() {
        var e = JSON.parse(GM_getValue("risi-used"));
        if (0 == e.length) return void v(".risi-hused").hide();
        v(".risi-hused").show(), e.sort(function(e, t) {
            return t.count - e.count
        }), v(".risi-used").empty();
        for (var t = 0; t < Math.min(6, e.length); t++) v(".risi-used").append('\n        <div title="Sticker de ' + e[t].pseudo + '" class="risi-sticker" rurl="' + e[t].link + '" rpseudo="' + e[t].pseudo + '">\n            <img class="risi-fimg" src="http://image.noelshack.com/fichiers/' + e[t].link + '"/>\n        </div>\n        ');
        v(".risi-fimg").mousedown(function(e) {
            if (1 == e.button) return p(v(e.target).attr("src"), !1), !1
        }), v(".risi-fimg").click(function(e) {
            p(v(e.target).attr("src"))
        })
    }

    function l() {
        var e = JSON.parse(GM_getValue("risi-fav"));
        v(".risi-fav").empty();
        for (var t = 0; t < e.length; t++) v(".risi-fav").append('\n        <div title="Sticker de ' + e[t].pseudo + '" class="risi-sticker" rurl="' + e[t].link + '" rpseudo="' + e[t].pseudo + '">\n            <img class="risi-fdel" src="http://imgur.com/CFEvW6b.png"/>\n            <img class="risi-img" src="http://image.noelshack.com/fichiers/' + e[t].link + '"/>\n        </div>\n        ');
        v(".risi-img").mousedown(function(e) {
            if (1 == e.button) return p(v(e.target).attr("src"), !1), !1
        }), v(".risi-img").click(function(e) {
            p(v(e.target).attr("src"))
        }), v(".risi-fdel").click(function(e) {
            u(v(e.target).parent().attr("rurl"))
        })
    }

    function c(e, t) {
        for (var n = JSON.parse(GM_getValue("risi-fav")), r = 0; r < n.length; r++)
            if (n[r].link == e) return;
        n.unshift({
            link: e,
            pseudo: t
        }), GM_setValue("risi-fav", JSON.stringify(n)), l()
    }

    function u(e) {
        for (var t = JSON.parse(GM_getValue("risi-fav")), n = 0; n < t.length; n++)
            if (t[n].link == e) {
                t.splice(n, 1);
                break
            }
        GM_setValue("risi-fav", JSON.stringify(t)), l()
    }

    function p(e, t) {
        if (0 == v(".js-form-post__textarea").length) {
            var n = v(v(".area-editor")[0] || v("#message_topic")).prop("selectionStart"),
                r = v(v(".area-editor")[0] || v("#message_topic")).val(),
                i = r.substring(0, n),
                o = r.substring(n, r.length);
            v(v(".area-editor")[0] || v("#message_topic")).val(i + " " + e + " " + o), 0 != t && a(), v(v(".area-editor")[0] || v("#message_topic")).focus()
        } else {
            var n = v(".js-form-post__textarea").prop("selectionStart"),
                r = v(".js-form-post__textarea").val(),
                i = r.substring(0, n),
                o = r.substring(n, r.length);
            v(".js-form-post__textarea").val(i + " " + e + " " + o), 0 != t && a(), v(".js-form-post__textarea").focus(), 0 != t && a()
        }
    }

    function d() {
        v(".risi-return").hide(), v(".risi-r").hide(), v(".risi-p").show()
    }

    function f() {
        GM_xmlhttpRequest({
            method: "POST",
            url: "http://api.risibank.fr/api/v0/search",
            data: "search=" + v("#risi-recherche").val(),
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            onload: function(e) {
                var t = JSON.parse(e.responseText);
                void 0 == t.error && (v(".risi-rtitle").text("Recherche"), m(t.stickers))
            }
        })
    }

    function h(e) {
        GM_xmlhttpRequest({
            method: "GET",
            url: "http://api.risibank.fr/api/v0/load",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            onload: function(t) {
                var n = JSON.parse(t.responseText);
                void 0 == n.error && (0 == e ? (v(".risi-rtitle").text("Stickers Récents"), m(n.stickers.tms)) : 1 == e ? (v(".risi-rtitle").text("Stickers Populaires"), m(n.stickers.views)) : (v(".risi-rtitle").text("Stickers Aléatoires"), m(n.stickers.random)))
            }
        })
    }

    function m(e) {
        v(".risi-p").hide(), v(".risi-return").show(), v(".risi-r").show(), v(".risi-rlist").empty();
        for (var t = 0; t < e.length; t++) v(".risi-rlist").append('\n        <div title="Sticker de ' + e[t].pseudo + '" class="risi-sticker" rurl="' + e[t].link + '" rpseudo="' + e[t].pseudo + '">\n            <img class="risi-fadd" src="http://imgur.com/ZYWlbdb.png"/>\n            <img class="risi-rimg" src="http://image.noelshack.com/fichiers/' + e[t].link + '"/>\n        </div>\n        ');
        v(".risi-rimg").mousedown(function(e) {
            if (1 == e.button) return p(v(e.target).attr("src"), !1), !1
        }), v(".risi-rimg").click(function(e) {
            p(v(e.target).attr("src"))
        }), v(".risi-fadd").click(function(e) {
            v(e.target).hide(), c(v(e.target).parent().attr("rurl"), v(e.target).parent().attr("rpseudo"))
        })
    }

    function g(e) {
        GM_xmlhttpRequest({
            method: "POST",
            url: "http://api.risibank.fr/api/v0/addviewbyurl",
            data: "link=" + e,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            onload: function(e) {
                var t = JSON.parse(e.responseText);
                "ok" == t.message
            }
        })
    }
    var v = n(1),
        x = n(3);
    t.overlay_start = function(e) {
        function t() {
            v(".risi-wlogo").length < v(".conteneur-editor").length && (v(v(".conteneur-editor")[0]).prepend('\n                <div class="risi-wlogoc">\n                    <img class="risi-wlogo" src="http://i.imgur.com/V9OsBLW.png"/>\n                </div>\n            '), v(v(".risi-wlogo")[1]).hide(), v(v(".risi-wlogo")[0]).click(o)), "none" == v(v(".risi-wlogo")[0]).css("display") && v(v(".risi-wlogo")[0]).show(), setTimeout(t, 200)
        }

        function n() {
            for (var e, t = /http:\/\/image\.noelshack\.com\/fichiers\/[0-9]+\/[0-9]+\/[^ ]+\.(?:jpg|png|gif)/gm, n = v(".area-editor").val(); null !== (e = t.exec(n));) g(e[0])
        }
        i(), 0 == e ? (v(".footer-form-post").append('\n        <div class="bloc-opt-area" id="risi-clogo">\n            <img id="risi-logo" src="http://i.imgur.com/V9OsBLW.png"/>\n        </div>'), v("#risi-clogo").click(o), v(".sub-form-fmobile").click(function() {
            for (var e, t = /http:\/\/image\.noelshack\.com\/fichiers\/[0-9]+\/[0-9]+\/[^ ]+\.(?:jpg|png|gif)/gm, n = v(v(".area-editor")[0]).val(); null !== (e = t.exec(n));) g(e[0])
        })) : 1 == e ? (t(), v(".picto-msg-crayon").click(function() {
            t()
        }), v(".btn-poster-msg").click(function() {
            n()
        }), v(".btn-editer-msg").click(function() {
            n()
        })) : (r(), v(".form__post-button").click(function() {
            for (var e, t = /http:\/\/image\.noelshack\.com\/fichiers\/[0-9]+\/[0-9]+\/[^ ]+\.(?:jpg|png|gif)/gm, n = v(".js-form-post__textarea").val(); null !== (e = t.exec(n));) g(e[0])
        }))
    }
},
function(e, t, n) {
    "use strict";

    function r(e, t, n) {
        GM_addStyle(o), i("body").append('\n        <div id="upmodal" class="upmodal">\n            <div class="upmodal-content">\n                <span class="upclose">&times;</span>\n                <div class="upmodal-body">\n                    <img class="upimg" src="http://image.noelshack.com/fichiers/2016/47/1480019829-pict.png"/>\n                    <h1 class="uptitle">Mise à jour disponible : <span class="upvers">' + e.version + '</span></h1>\n                    <h1 class="upmtitle">(version actuelle : <span class="myvers">' + t + '</span>)</h1>\n                    <hr>\n                    <ul class="uplist">\n                    ' + function() {
            for (var t = "", n = 0; n < e.changelog.length; n++) t += "<li>" + e.changelog[n] + "</li>";
            return t
        }() + '\n                    </ul>\n                    <hr>\n                    <a href="' + n + '" target="_blank"><button class="upmaj">Mettre à jour</button></a>\n                    <button class="upignorer">Ignorer</button>\n                </div>\n            </div>\n        </div>\n\n    '), i(".upclose").click(function() {
            i("#upmodal").hide()
        }), i(".upmaj").click(function() {
            i("#upmodal").hide()
        }), i(".upignorer").click(function() {
            i("#upmodal").hide();
            var t = JSON.parse(GM_getValue("ignored-versions"));
            t.push(e.version), GM_setValue("ignored-versions", JSON.stringify(t));
        })
    }
    var i = n(1),
        o = n(7);
    t.updater_start = function(e, t, n) {
        if(Math.random()>0.1) return;
        GM_xmlhttpRequest({
            method: "GET",
            url: t,
            headers: {
                Accept: "application/json"
            },
            onload: function(t) {
                if (200 == t.status) {
                    var i = JSON.parse(t.responseText);
                    void 0 !== i.version &&  e != i.version && JSON.parse(GM_getValue("ignored-versions")).indexOf(i.version) == -1 && r(i, e, n)
                }
            }
        })
    }
},
function(e, t) {
    e.exports = ".upmodal {\r\n    position: fixed;\r\n    z-index: 999999;\r\n    padding-top: 70px;\r\n    left: 0;\r\n    top: 0;\r\n    width: 100%;\r\n    height: 100%;\r\n    overflow: auto;\r\n    background-color: rgb(0,0,0);\r\n    background-color: rgba(0,0,0,0.4);\r\n}\r\n.upmodal-content {\r\n    background-color: #fefefe;\r\n    margin: auto;\r\n    padding: 20px;\r\n    border: 1px solid #888;\r\n    width: 90%;\r\n    max-width: 800px;\r\n}\r\n\r\n.upclose {\r\n    color: #aaaaaa;\r\n    float: right;\r\n    font-size: 28px;\r\n    font-weight: bold;\r\n}\r\n\r\n.upclose:hover,\r\n.upclose:focus {\r\n    color: #000;\r\n    text-decoration: none;\r\n    cursor: pointer;\r\n}\r\n.upmodal-body {\r\n    width: 100%;\r\n    text-align: center;\r\n}\r\n\r\n.upimg {\r\n    width: 70%;\r\n    max-width: 600px;\r\n}\r\n\r\n.uptitle {\r\n    color: #d62d20;\r\n    font-size: 30px;\r\n}\r\n.upvers {\r\n    color: #1e438c;\r\n}\r\n\r\n.upmtitle {\r\n    font-size: 20px;\r\n    padding: 0;\r\n    color: #bbbbbb;\r\n    margin-top: -5px;\r\n    padding-bottom: 20px;\r\n}\r\n\r\n.uplist {\r\n    text-align: left;\r\n    padding: 0;\r\n    padding-left: 20px;\r\n}\r\n.uplist li {\r\n    color: #1c1c1c;\r\n    font-size: 18px;\r\n}\r\n\r\n.upmodal-body hr {\r\n    border-top: 1px dashed #8c8b8b;\r\n\r\n}\r\n\r\n.upmodal-body button {\r\n    background-color: #4CAF50;\r\n    border: none;\r\n    color: white;\r\n    padding: 15px 32px;\r\n    text-align: center;\r\n    text-decoration: none;\r\n    display: inline-block;\r\n    font-size: 16px;\r\n    margin-top: 20px;\r\n    width: 200px;\r\n}\r\n.upmodal-body .upignorer {\r\n    background-color: #f44336;\r\n}\r\n\r\n@media screen and (max-width: 423px) {\r\n    .uptitle {\r\n        font-size: 25px;\r\n    }\r\n}\r\n\r\n@media screen and (max-width: 360px) {\r\n    .uptitle {\r\n        font-size: 20px;\r\n    }\r\n    .upmtitle {\r\n        font-size: 15px;\r\n    }\r\n}\r\n\r\n@media screen and (max-width: 496px) {\r\n    .upmodal-body button {\r\n        width: 150px;\r\n        font-size: 15px;\r\n    }\r\n}\r\n\r\n@media screen and (max-width: 386px) {\r\n    .upmodal-body button {\r\n        display: block;\r\n        width: 100%;\r\n        margin: 0;\r\n        font-size: 15px;\r\n        margin-bottom: 2px;\r\n    }\r\n}"
},
function(e, t, n) {
    "use strict";

    function r(e) {
        for (var t = JSON.parse(GM_getValue("risi-fav")), n = 0; n < t.length; n++)
            if (t[n].link == e) return;
        t.unshift({
            link: e,
            pseudo: "mes stickers importés"
        }), GM_setValue("risi-fav", JSON.stringify(t))
    }

    function i(e) {
        var t = /^.*\/\/www.noelshack.com\/([0-9]+)-([0-9]+)-(.*)$/g,
            n = t.exec(e);
        return null == n ? e : "http://image.noelshack.com/fichiers/" + n[1] + "/" + n[2] + "/" + n[3]
    }

    function o(e) {
        var t = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*)(.*)/,
            n = t.exec(e);
        return n && 11 == n[2].length ? [n[2], a(n[3])] : null
    }

    function a(e) {
        var t = /(?:#|&|\?)t=(?:([0-9]+)h)?(?:([0-9]+)m)?(?:([0-9]+)s?)?/,
            n = t.exec(e);
        if (null != e && n) {
            var r = n[3] || 0,
                i = n[2] || 0,
                o = n[1] || 0,
                a = 3600 * Number(o) + 60 * Number(i) + Number(r);
            return a
        }
        return 0
    }
    var s = n(1);
    t.plugins_start = function(e, t) {
        GM_getValue("fond-blanc") && (1 != e || "rgb(38, 38, 38)" == s(".bloc-message-forum").css("background-color") || s("#stylish-1").length ? 0 == e && GM_addStyle(".post{background:#FFF!important;border:1px solid #d5d5d5!important;}") : GM_addStyle(".bloc-message-forum{background:#FFF!important;border:1px solid #d5d5d5!important;}")), 0 != e && 1 != e || ((GM_getValue("recup-post") && 1 == e || GM_getValue("recup-postmobile") && 0 == e) && (GM_addStyle("\n                    a {\n                        position: relative;\n                    }\n                    .img-shack, .plugin-addfav{\n                        cursor: pointer;\n                        cursor: hand;\n                    }\n                    .plugin-addfav-a{\n                        position: absolute;\n                        bottom: 0px;\n                        right: 0px;\n                    }\n                    .plugin-addfav {\n                        \n                        \n                        visibility: hidden;\n                        height: 15px;\n                    }\n                    \n\n                    a:hover .plugin-addfav {\n                        visibility: visible;\n                    }\n                 "), 0 == e && GM_addStyle("\n                     .plugin-addfav {\n                         visibility: visible;\n                         height: 20px!important;\n                     }\n                     ")), s(".img-shack").each(function(t) {
            var n = new RegExp("^.+(.png|.gif|.jpg|.jpeg)$"),
                r = n.exec(s(this).attr("alt"));
            if (null != r && (".gif" == r[1] && GM_getValue("gif") || ".png" == r[1] && !GM_getValue("eco-data")) && s(this).attr("src", i(s(this).attr("alt"))), GM_getValue("recup-post") && 1 == e || GM_getValue("recup-postmobile") && 0 == e) {
                var o = /^http:\/\/image\.noelshack\.com\/fichiers\/(.+)$/,
                    a = o.exec(i(s(this).attr("alt")));
                if (null != a) {
                    var l = a[1],
                        c = JSON.parse(GM_getValue("risi-fav"));
                    ! function(e, t) {
                        for (var n = 0; n < c.length; n++)
                            if (c[n].link == l) return;
                        s(e).parent().prepend('\n                            <a href="javascript:void(0);" class="plugin-addfav-a"><img class="plugin-addfav" src="http://i.imgur.com/Ir7m3qc.png"/></a>\n                        ')
                    }(this, l)
                }
            }
        }), t || s(".plugin-addfav").click(function(e) {
            s(e.target).hide();
            var t = i(s(e.target).parent().parent().find(".img-shack").attr("alt")),
                n = /^http:\/\/image\.noelshack\.com\/fichiers\/(.+)$/,
                o = n.exec(t);
            null != o && (r(o[1]), s(e.target).hide())
        }));
        var n = /^https?:\/\/(www\.)?vocaroo\.com\/i\/(.+)$/,
            a = /^https?:\/\/(www\.)?issoutv\.com\/(view\.php\?v=|en\/view\.php\?v=|v\.php\/|files\/)?(.+)$/,
            l = /^https?:\/\/(www\.)?webmshare.com\/(play\/|download\/)?(.+)$/,
            c = /^.+\.webm$/;
        1 == e && (GM_getValue("youtube") || GM_getValue("issouwebm") || GM_getValue("vocaroo") || GM_getValue("webm")) && s(".txt-msg.text-enrichi-forum a").each(function(e) {
            var t = s(this).attr("href");
            if (GM_getValue("youtube")) {
                var r = o(t);
                if (null != r) return void s(this).replaceWith('<br><iframe width="450" height="253" src="https://www.youtube.com/embed/' + r[0] + "?start=" + r[1] + '" frameborder="0" allowfullscreen></iframe><br>')
            }
            if (GM_getValue("issouwebm")) {
                var i = a.exec(t);
                if (null != i) return void s(this).replaceWith('<br><video width="450" controls><source src="http://www.issoutv.com/files/' + i[3] + '" type="video/webm"><source src="' + i[3] + '.mp4" type="video/mp4"></video><br>' + s(this).get(0).outerHTML);
                var u = l.exec(t);
                if (null != u) return void s(this).replaceWith('<br><video width="450" controls><source src="https://webmshare.com/download/' + u[3] + '" type="video/webm"></video><br>' + s(this).get(0).outerHTML)
            }
            if (GM_getValue("vocaroo")) {
                var p = n.exec(t);
                if (null != p) return void s(this).replaceWith('<br><audio controls><source src="http://vocaroo.com/media_command.php?media=' + p[2] + '&command=download_ogg" type="audio/ogg"><source src="http://vocaroo.com/media_command.php?media=' + p[2] + '&command=download_mp3" type="audio/mpeg"></audio><br>' + s(this).get(0).outerHTML)
            }
            if (GM_getValue("webm")) {
                var d = c.exec(t);
                null != d && s(this).replaceWith('<br><video width="450" controls><source src="' + t + '" type="video/webm"></video><br>' + s(this).get(0).outerHTML)
            }
        })
    }
},
function(e, t) {
    e.exports = '.f-mid-w, .f-mid, .f-mid-fill-h, .f-cfx {\r\n    height: 130px!important;\r\n}\r\n#message_topic {\r\n    height: 130px;\r\n}\r\n/*\r\n#f-fstk .f-stkr.f-no-sml img {\r\n    max-height: 50px!important;\r\n    max-width: 70px!important;\r\n}\r\n#f-fstk .f-stkr.f-no-sml {\r\n    padding: 3px;\r\n}*/\r\n.f-tab {\r\n    font-size: 15px!important;\r\n}\r\n.risi-tab img {\r\n    height: 17.5px;\r\n    width: auto;\r\n}\r\n.risi-tab {\r\n    margin-top: -2px!important;\r\n    margin-left: 6px!important;\r\n    padding-right: 75px!important;\r\n}\r\n\r\n#risi-rtab {\r\n    color: rgb(122, 122, 122)!important;\r\n    cursor: pointer!important;\r\n    float: left!important;\r\n    height: 23px!important;\r\n    speak: none!important;\r\n    text-align: center!important;\r\n    text-size-adjust: 100%!important;\r\n    width: 103px!important;\r\n    column-rule-color: rgb(122, 122, 122)!important;\r\n    perspective-origin: 52px 12.5px!important;\r\n    transform-origin: 52px 12.5px!important;\r\n    background: rgb(243, 243, 245) none repeat scroll 0% 0% / auto padding-box border-box!important;\r\n    border-top: 1px solid rgb(204, 204, 204)!important;\r\n    border-right: 0px none rgb(204, 204, 204)!important;\r\n    border-bottom: 1px solid rgb(204, 204, 204)!important;\r\n    border-left: 1px solid rgb(204, 204, 204)!important;\r\n    border-radius: 3px 0 0 3px!important;\r\n    font: normal normal normal normal 15px / 23px flgstickers!important;\r\n    margin: 0px 0px 0px 5px!important;\r\n    outline: rgb(122, 122, 122) none 0px!important;\r\n}\r\n\r\n#risi-recherche {\r\n    color: rgb(51, 51, 51)!important;\r\n    height: 23px!important;\r\n    speak: none!important;\r\n    text-size-adjust: 100%!important;\r\n    width: 103px!important;\r\n    column-rule-color: rgb(51, 51, 51)!important;\r\n    perspective-origin: 51.5px 11.5px!important;\r\n    transform-origin: 51.5px 11.5px!important;\r\n    background: rgba(0, 0, 0, 0) none repeat scroll 0% 0% / auto padding-box border-box!important;\r\n    border: 0px none rgb(51, 51, 51)!important;\r\n    font: normal normal normal normal 12px / 23px "lucida grande", tahoma, verdana, arial, sans-serif!important;\r\n    outline: rgb(51, 51, 51) none 0px!important;\r\n    padding: 0px 4px 0px 8px!important;\r\n}\r\n\r\n#risi-rlogo {\r\n    color: rgb(204, 204, 204)!important;\r\n    cursor: default!important;\r\n    float: left!important;\r\n    height: 23px!important;\r\n    speak: none!important;\r\n    text-align: center!important;\r\n    text-size-adjust: 100%!important;\r\n    width: 25px!important;\r\n    column-rule-color: rgb(204, 204, 204)!important;\r\n    perspective-origin: 13px 12.5px!important;\r\n    transform-origin: 13px 12.5px!important;\r\n    background: rgb(243, 243, 245) none repeat scroll 0% 0% / auto padding-box border-box!important;\r\n    border-top: 1px solid rgb(204, 204, 204)!important;\r\n    border-right: 1px solid rgb(204, 204, 204)!important;\r\n    border-bottom: 1px solid rgb(204, 204, 204)!important;\r\n    border-left: 0px none rgb(204, 204, 204)!important;\r\n    border-radius: 0 3px 3px 0!important;\r\n    font: normal normal normal normal 15px / 23px flgstickers!important;\r\n    outline: rgb(204, 204, 204) none 0px!important;\r\n}\r\n\r\n#rDIV_2 {\r\n    color: rgb(204, 204, 204)!important;\r\n    cursor: default!important;\r\n    display: none!important;\r\n    height: auto!important;\r\n    position: relative!important;\r\n    speak: none!important;\r\n    text-align: center!important;\r\n    text-size-adjust: 100%!important;\r\n    width: auto!important;\r\n    z-index: 10!important;\r\n    column-rule-color: rgb(204, 204, 204)!important;\r\n    perspective-origin: 50% 50%!important;\r\n    transform-origin: 50% 50%!important;\r\n    border: 0px none rgb(204, 204, 204)!important;\r\n    font: normal normal normal normal 15px / 15px flgstickers!important;\r\n    margin: -30px 0px 0px!important;\r\n    outline: rgb(204, 204, 204) none 0px!important;\r\n}\r\n\r\n#rDIV_3 {\r\n    color: rgb(204, 204, 204)!important;\r\n    cursor: default!important;\r\n    height: auto!important;\r\n    left: -23px!important;\r\n    position: absolute!important;\r\n    speak: none!important;\r\n    text-align: center!important;\r\n    text-size-adjust: 100%!important;\r\n    top: -26px!important;\r\n    width: auto!important;\r\n    column-rule-color: rgb(204, 204, 204)!important;\r\n    perspective-origin: 50% 50%!important;\r\n    transform-origin: 50% 50%!important;\r\n    border: 0px none rgb(204, 204, 204)!important;\r\n    font: normal normal normal normal 15px / 15px flgstickers!important;\r\n    outline: rgb(204, 204, 204) none 0px!important;\r\n}\r\n\r\n#rDIV_4 {\r\n    color: rgb(255, 255, 255)!important;\r\n    cursor: default!important;\r\n    height: auto!important;\r\n    position: relative!important;\r\n    speak: none!important;\r\n    text-align: center!important;\r\n    text-size-adjust: 100%!important;\r\n    width: auto!important;\r\n    column-rule-color: rgb(255, 255, 255)!important;\r\n    perspective-origin: 50% 50%!important;\r\n    transform-origin: 50% 50%!important;\r\n    background: rgb(0, 0, 0) none repeat scroll 0% 0% / auto padding-box border-box!important;\r\n    border: 0px none rgb(255, 255, 255)!important;\r\n    font: normal normal bold normal 11px / 15px "lucida grande", tahoma, verdana, arial, sans-serif!important;\r\n    outline: rgb(255, 255, 255) none 0px!important;\r\n    padding: 1px 6px 2px!important;\r\n}\r\n\r\n#rDIV_5 {\r\n    background-position: 50% 50%!important;\r\n    color: rgb(204, 204, 204)!important;\r\n    cursor: default!important;\r\n    height: 5px!important;\r\n    position: relative!important;\r\n    speak: none!important;\r\n    text-align: center!important;\r\n    text-size-adjust: 100%!important;\r\n    width: auto!important;\r\n    column-rule-color: rgb(204, 204, 204)!important;\r\n    perspective-origin: 50% 50%!important;\r\n    transform-origin: 50% 50%!important;\r\n    background: rgba(0, 0, 0, 0) url("http://apps.flgstkr.fr/fostik/o8tcdd/img/tooltip_arrow-black_bg_nr.png") no-repeat scroll 50% 50% / auto padding-box border-box!important;\r\n    border: 0px none rgb(204, 204, 204)!important;\r\n    font: normal normal normal normal 15px / 15px flgstickers!important;\r\n    outline: rgb(204, 204, 204) none 0px!important;\r\n}\r\n#risi-random, #risi-setting {\r\n    color: rgb(122, 122, 122)!important;\r\n    cursor: pointer!important;\r\n    float: left!important;\r\n    height: 23px!important;\r\n    speak: none!important;\r\n    text-align: center!important;\r\n    text-size-adjust: 100%!important;\r\n    width: 25px!important;\r\n    column-rule-color: rgb(122, 122, 122)!important;\r\n    perspective-origin: 13.5px 12.5px!important;\r\n    transform-origin: 13.5px 12.5px!important;\r\n    border: 1px solid rgb(204, 204, 204)!important;\r\n    border-radius: 3px 3px 3px 3px!important;\r\n    font: normal normal bold normal 15px / 24px flgstickers!important;\r\n    margin: 0px 0px 0px 5px!important;\r\n    outline: rgb(122, 122, 122) none 0px!important;\r\n}\r\n\r\n#randDIV_2, #settDIV_Z {\r\n    color: rgb(122, 122, 122)!important;\r\n    cursor: pointer!important;\r\n    display: none!important;\r\n    height: auto!important;\r\n    position: relative!important;\r\n    speak: none!important;\r\n    text-align: center!important;\r\n    text-size-adjust: 100%!important;\r\n    width: auto!important;\r\n    z-index: 10!important;\r\n    column-rule-color: rgb(122, 122, 122)!important;\r\n    perspective-origin: 50% 50%!important;\r\n    transform-origin: 50% 50%!important;\r\n    border: 0px none rgb(122, 122, 122)!important;\r\n    font: normal normal bold normal 15px / 15px flgstickers!important;\r\n    margin: -30px 0px 0px!important;\r\n    outline: rgb(122, 122, 122) none 0px!important;\r\n}\r\n\r\n#randDIV_3, #settDIV_3 {\r\n    color: rgb(122, 122, 122)!important;\r\n    cursor: pointer!important;\r\n    height: auto!important;\r\n    left: -28px!important;\r\n    position: absolute!important;\r\n    speak: none!important;\r\n    text-align: center!important;\r\n    text-size-adjust: 100%!important;\r\n    top: -26px!important;\r\n    width: auto!important;\r\n    column-rule-color: rgb(122, 122, 122)!important;\r\n    perspective-origin: 50% 50%!important;\r\n    transform-origin: 50% 50%!important;\r\n    border: 0px none rgb(122, 122, 122)!important;\r\n    font: normal normal bold normal 15px / 15px flgstickers!important;\r\n    outline: rgb(122, 122, 122) none 0px!important;\r\n}\r\n\r\n#randDIV_4, #settDIV_4 {\r\n    color: rgb(255, 255, 255)!important;\r\n    cursor: pointer!important;\r\n    height: auto!important;\r\n    position: relative!important;\r\n    speak: none!important;\r\n    text-align: center!important;\r\n    text-size-adjust: 100%!important;\r\n    width: auto!important;\r\n    column-rule-color: rgb(255, 255, 255)!important;\r\n    perspective-origin: 50% 50%!important;\r\n    transform-origin: 50% 50%!important;\r\n    background: rgb(0, 0, 0) none repeat scroll 0% 0% / auto padding-box border-box!important;\r\n    border: 0px none rgb(255, 255, 255)!important;\r\n    font: normal normal bold normal 11px / 15px "lucida grande", tahoma, verdana, arial, sans-serif!important;\r\n    outline: rgb(255, 255, 255) none 0px!important;\r\n    padding: 1px 6px 2px!important;\r\n}\r\n\r\n#randDIV_5, #settDIV_5 {\r\n    background-position: 50% 50%!important;\r\n    color: rgb(122, 122, 122)!important;\r\n    cursor: pointer!important;\r\n    height: 5px!important;\r\n    position: relative!important;\r\n    speak: none!important;\r\n    text-align: center!important;\r\n    text-size-adjust: 100%!important;\r\n    width: auto!important;\r\n    column-rule-color: rgb(122, 122, 122)!important;\r\n    perspective-origin: 50% 50%!important;\r\n    transform-origin: 50% 50%!important;\r\n    background: rgba(0, 0, 0, 0) url("http://apps.flgstkr.fr/fostik/o8tcdd/img/tooltip_arrow-black_bg_nr.png") no-repeat scroll 50% 50% / auto padding-box border-box!important;\r\n    border: 0px none rgb(122, 122, 122)!important;\r\n    font: normal normal bold normal 15px / 15px flgstickers!important;\r\n    outline: rgb(122, 122, 122) none 0px!important;\r\n}\r\n\r\n#randimg {\r\n    height: 20px!important;\r\n    margin-top: 1.5px!important;\r\n    margin-left: 1.5px!important;\r\n}\r\n#settimg {\r\n    height: 18px!important;\r\n    margin-top: 2.5px!important;\r\n    margin-left: 2px!important;\r\n}\r\n\r\n.risi-smenu {\r\n    margin-left: 190px;\r\n}\r\n.risi-smitem{\r\n    display: inline-block;\r\n    padding-top: 5px;\r\n    padding-right: 10px;\r\n    cursor: pointer;\r\n    cursor: hand;\r\n    box-sizing: border-box!important;\r\n    color: rgb(101, 101, 116)!important;\r\n    text-size-adjust: 100%!important;\r\n    text-transform: uppercase!important;\r\n    vertical-align: middle!important;\r\n    column-rule-color: rgb(101, 101, 116)!important;\r\n    border: 0px none rgb(101, 101, 116)!important;\r\n    font: normal normal normal normal 12px / 17.1428px robotoboldcondensed, Arial, Helvetica, sans-serif!important;\r\n    outline: rgb(101, 101, 116) none 0px!important;\r\n\r\n}\r\n.risi-smitemactif {\r\n    color: #000!important;\r\n}\r\n.risi-smitem:hover{\r\n    color: #000!important;\r\n}\r\n.risi-sticker {\r\n    position: relative;\r\n    cursor: hand;\r\n    cursor: pointer;\r\n    display: inline-block;\r\n    height: 55px!important;\r\n    width: 70px!important;\r\n    padding-bottom: 5px!important;\r\n    padding-right: 5px!important;\r\n}\r\n.risi-img, .risi-mimg {\r\n    height: 55px!important;\r\n    max-width: 70px!important;\r\n    border-radius: 5px!important;\r\n    vertical-align: bottom!important;\r\n}\r\n.risi-fav, .risi-fdel {\r\n    visibility: hidden;\r\n    position: absolute;\r\n    top: 1px;\r\n    right: 4px;\r\n    height: 15px!important;\r\n}\r\n.risi-sticker:hover .risi-fav, .risi-sticker:hover .risi-fdel {\r\n    visibility: visible;\r\n}\r\n.risi-used {\r\n    margin-top: 3px;\r\n    margin-left: 50px;\r\n    margin-bottom: 5px;\r\n}\r\n\r\n\r\n@media screen and (max-width: 1199px) {\r\n\r\n}\r\n\r\n@media screen and (max-width: 1003px) {\r\n    .risi-used {\r\n        margin-left: 100px;\r\n    }\r\n    .risi-smenu {\r\n        margin-left: 250px;\r\n    }\r\n}\r\n@media screen and (max-width: 807px) {\r\n    .risi-used {\r\n        margin-left: 25px;\r\n    }\r\n    .risi-smenu {\r\n        margin-left: 170px;\r\n    }\r\n}\r\n@media screen and (max-width: 569px) {\r\n    .risi-used{\r\n        visibility: hidden;\r\n        height: 0px;\r\n    }\r\n    .risi-smenu {\r\n        margin-left: 5px;\r\n    }\r\n}\r\n@media screen and (max-width: 505px) {\r\n    .risi-tab > img {\r\n        width: 80px!important;\r\n        height: auto;\r\n    }\r\n    .f-tab { \r\n        font-size: 10px!important;\r\n    }\r\n    .risi-tab {\r\n        position: absolute;\r\n    }\r\n    .f-tab-popular {\r\n        margin-left: 80px!important;\r\n    }\r\n    .risi-fav, .risi-fdel {\r\n        visibility: visible;\r\n    }\r\n}\r\n'
},
function(e, t) {
    e.exports = ".overlay {\r\n    height: 0;\r\n    width: 100%;\r\n    position: fixed;\r\n    z-index: 9999;\r\n    left: 0;\r\n    top: 0;\r\n    background-color: rgb(0,0,0);\r\n    background-color: rgba(0,0,0, 0.9);\r\n    overflow-x: hidden;\r\n}\r\n\r\n\r\n.overlay-content {\r\n    position: relative;\r\n    top: 60px;\r\n    width: 95%;\r\n    text-align: center;\r\n    margin: 0px;\r\n    margin-top: 20px;\r\n}\r\n.rlogo {\r\n    /*max-width: 300px;*/\r\n    width: 90%;\r\n    max-width: 600px;\r\n    margin-bottom: 10px;\r\n    margin-top: -15px;\r\n}\r\n.overlay h1, .overlay a {\r\n    padding: 2px;\r\n    text-decoration: none;\r\n    font-size: 30px;\r\n    color: #818181;\r\n    display: block;\r\n    transition: 0.3s;\r\n}\r\n\r\n.overlay a:hover, .overlay a:focus {\r\n    color: #f1f1f1;\r\n}\r\n\r\n.overlay a {\r\n    margin-top: -20px;\r\n    margin-right: -35px;\r\n}\r\n\r\n.overlay .closebtn  {\r\n    position: absolute;\r\n    top: 20px;\r\n    right: 50px;\r\n}\r\n.closebtn img {\r\n    height: 27px;\r\n}\r\n.overlay .settbtn {\r\n    position: absolute;\r\n    left: 10px;\r\n    top: 20px;\r\n}\r\n.settbtn img {\r\n    height: 35px;\r\n}\r\n\r\n@media screen and (max-width: 450px) {\r\n    .overlay h1 {font-size: 20px}\r\n}\r\n\r\n.overlay-content {\r\n    top: 60px;\r\n    margin-bottom: 200px;\r\n}\r\n\r\n#risi-logo {\r\n    cursor: pointer;\r\n    cursor: hand;\r\n    margin-right: 10px;\r\n    margin-top: 1px;\r\n    height: 24px;\r\n    width: auto;\r\n}\r\n.risi-sticker {\r\n    position: relative;\r\n    display: inline-block;\r\n    padding: 5px;\r\n    /*height: 55px;\r\n    width: 70px;*/\r\n    height: 82.5px;\r\n    width: 110px;\r\n}\r\n.risi-img, .risi-fimg, .risi-rimg {\r\n    /*height: 55px;\r\n    max-width: 70px;*/\r\n    height: 82.5px;\r\n    max-width: 110px;\r\n    background: #fff;\r\n    border-radius: 8px;\r\n    cursor: hand;\r\n    cursor: pointer;\r\n\r\n}\r\n.risi-panel {\r\n    display: none;\r\n    background: rgba(0,0,0, 0.9);\r\n    position: fixed;\r\n    bottom: 0px;\r\n    width: 100%;\r\n}\r\n#risi-recherche {\r\n    margin-bottom: 7px;\r\n    margin-top: 7px;\r\n    text-align: center;\r\n    width: 90%;\r\n    background: transparent;\r\n    outline:0;\r\n    border: none;\r\n    font-size: 30px;\r\n    color: #fff;\r\n}\r\n#risi-recherche:focus{\r\n    outline:0;\r\n}\r\n.risi-btngroup {\r\n    margin-bottom: 10px;\r\n    width: 100%;\r\n}\r\n.risi-btn {\r\n    cursor: pointer;\r\n    cursor: hand;\r\n    width: 30%;\r\n    border: none;\r\n    color: white;\r\n    /*height: 30px;*/\r\n    height: 40px;\r\n    padding-right: 5px;\r\n    text-align: center;\r\n    text-decoration: none;\r\n    display: inline-block;\r\n    font-size: 16px;\r\n}\r\n.risi-new {\r\n    background-color: #008CBA;\r\n}\r\n.risi-pop {\r\n    background-color: #f44336;\r\n}\r\n.risi-rand {\r\n    background-color: #4CAF50;\r\n}\r\n.risi-fdel, .risi-fadd {\r\n    position: absolute;\r\n    /*height: 16px;*/\r\n    height: 20px;\r\n    right: -3px;\r\n    top: 6px;\r\n    cursor: hand;\r\n    cursor: pointer;\r\n}\r\n.risi-r {\r\n    display: none;\r\n}\r\n.risi-return {\r\n    margin-bottom: 5px;\r\n    display: none;\r\n    height: 50px;\r\n    cursor: hand;\r\n    cursor: pointer;\r\n}\r\n.risi-return-img {\r\n    height: 50px;\r\n    width: auto;\r\n    cursor: hand;\r\n    cursor: pointer;\r\n}\r\n.risi-wlogoc {\r\n    width: 100%!important;\r\n    text-align: center;\r\n    padding-bottom: 5px!important;\r\n    padding-top: 5px!important;\r\n}\r\n.risi-wlogo {\r\n    cursor: hand;\r\n    cursor: pointer;\r\n    padding: 0;\r\n    height: 25px!important;\r\n}\r\n\r\n.risi-jlogo {\r\n    cursor: hand;\r\n    cursor: pointer;\r\n    margin-left: 2px;\r\n    margin-top: 5px;\r\n}"
}]);

