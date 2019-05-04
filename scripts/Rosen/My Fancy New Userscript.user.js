// ==UserScript==
// @name         My Fancy New Userscript
// @namespace    http://your.homepage/
// @version      0.1
// @description  enter something useful
// @author       You
// @match        http://tampermonkey.net/scripts.php
// @grant        none
// ==/UserScript==

// ==UserScript==
// @name         My Fancy New Userscript
// @namespace    http://your.homepage/
// @version      0.1
// @description  enter something useful
// @author       You
// @match        http://tampermonkey.net/scripts.php
// @grant        none
// ==/UserScript==

!function(a){a.Parse=a.Parse||{},a.Parse.VERSION="js1.5.0"}(this),function(){var a=this,b=a._,c={},d=Array.prototype,e=Object.prototype,f=Function.prototype,g=d.push,h=d.slice,i=d.concat,j=e.toString,k=e.hasOwnProperty,l=d.forEach,m=d.map,n=d.reduce,o=d.reduceRight,p=d.filter,q=d.every,r=d.some,s=d.indexOf,t=d.lastIndexOf,u=Array.isArray,v=Object.keys,w=f.bind,x=function(a){return a instanceof x?a:this instanceof x?void(this._wrapped=a):new x(a)};"undefined"!=typeof exports?("undefined"!=typeof module&&module.exports&&(exports=module.exports=x),exports._=x):a._=x,x.VERSION="1.4.4";var y=x.each=x.forEach=function(a,b,d){if(null!=a)if(l&&a.forEach===l)a.forEach(b,d);else if(a.length===+a.length){for(var e=0,f=a.length;f>e;e++)if(b.call(d,a[e],e,a)===c)return}else for(var g in a)if(x.has(a,g)&&b.call(d,a[g],g,a)===c)return};x.map=x.collect=function(a,b,c){var d=[];return null==a?d:m&&a.map===m?a.map(b,c):(y(a,function(a,e,f){d[d.length]=b.call(c,a,e,f)}),d)};var z="Reduce of empty array with no initial value";x.reduce=x.foldl=x.inject=function(a,b,c,d){var e=arguments.length>2;if(null==a&&(a=[]),n&&a.reduce===n)return d&&(b=x.bind(b,d)),e?a.reduce(b,c):a.reduce(b);if(y(a,function(a,f,g){e?c=b.call(d,c,a,f,g):(c=a,e=!0)}),!e)throw new TypeError(z);return c},x.reduceRight=x.foldr=function(a,b,c,d){var e=arguments.length>2;if(null==a&&(a=[]),o&&a.reduceRight===o)return d&&(b=x.bind(b,d)),e?a.reduceRight(b,c):a.reduceRight(b);var f=a.length;if(f!==+f){var g=x.keys(a);f=g.length}if(y(a,function(h,i,j){i=g?g[--f]:--f,e?c=b.call(d,c,a[i],i,j):(c=a[i],e=!0)}),!e)throw new TypeError(z);return c},x.find=x.detect=function(a,b,c){var d;return A(a,function(a,e,f){return b.call(c,a,e,f)?(d=a,!0):void 0}),d},x.filter=x.select=function(a,b,c){var d=[];return null==a?d:p&&a.filter===p?a.filter(b,c):(y(a,function(a,e,f){b.call(c,a,e,f)&&(d[d.length]=a)}),d)},x.reject=function(a,b,c){return x.filter(a,function(a,d,e){return!b.call(c,a,d,e)},c)},x.every=x.all=function(a,b,d){b||(b=x.identity);var e=!0;return null==a?e:q&&a.every===q?a.every(b,d):(y(a,function(a,f,g){return(e=e&&b.call(d,a,f,g))?void 0:c}),!!e)};var A=x.some=x.any=function(a,b,d){b||(b=x.identity);var e=!1;return null==a?e:r&&a.some===r?a.some(b,d):(y(a,function(a,f,g){return e||(e=b.call(d,a,f,g))?c:void 0}),!!e)};x.contains=x.include=function(a,b){return null==a?!1:s&&a.indexOf===s?-1!=a.indexOf(b):A(a,function(a){return a===b})},x.invoke=function(a,b){var c=h.call(arguments,2),d=x.isFunction(b);return x.map(a,function(a){return(d?b:a[b]).apply(a,c)})},x.pluck=function(a,b){return x.map(a,function(a){return a[b]})},x.where=function(a,b,c){return x.isEmpty(b)?c?null:[]:x[c?"find":"filter"](a,function(a){for(var c in b)if(b[c]!==a[c])return!1;return!0})},x.findWhere=function(a,b){return x.where(a,b,!0)},x.max=function(a,b,c){if(!b&&x.isArray(a)&&a[0]===+a[0]&&a.length<65535)return Math.max.apply(Math,a);if(!b&&x.isEmpty(a))return-(1/0);var d={computed:-(1/0),value:-(1/0)};return y(a,function(a,e,f){var g=b?b.call(c,a,e,f):a;g>=d.computed&&(d={value:a,computed:g})}),d.value},x.min=function(a,b,c){if(!b&&x.isArray(a)&&a[0]===+a[0]&&a.length<65535)return Math.min.apply(Math,a);if(!b&&x.isEmpty(a))return 1/0;var d={computed:1/0,value:1/0};return y(a,function(a,e,f){var g=b?b.call(c,a,e,f):a;g<d.computed&&(d={value:a,computed:g})}),d.value},x.shuffle=function(a){var b,c=0,d=[];return y(a,function(a){b=x.random(c++),d[c-1]=d[b],d[b]=a}),d};var B=function(a){return x.isFunction(a)?a:function(b){return b[a]}};x.sortBy=function(a,b,c){var d=B(b);return x.pluck(x.map(a,function(a,b,e){return{value:a,index:b,criteria:d.call(c,a,b,e)}}).sort(function(a,b){var c=a.criteria,d=b.criteria;if(c!==d){if(c>d||void 0===c)return 1;if(d>c||void 0===d)return-1}return a.index<b.index?-1:1}),"value")};var C=function(a,b,c,d){var e={},f=B(b||x.identity);return y(a,function(b,g){var h=f.call(c,b,g,a);d(e,h,b)}),e};x.groupBy=function(a,b,c){return C(a,b,c,function(a,b,c){(x.has(a,b)?a[b]:a[b]=[]).push(c)})},x.countBy=function(a,b,c){return C(a,b,c,function(a,b){x.has(a,b)||(a[b]=0),a[b]++})},x.sortedIndex=function(a,b,c,d){c=null==c?x.identity:B(c);for(var e=c.call(d,b),f=0,g=a.length;g>f;){var h=f+g>>>1;c.call(d,a[h])<e?f=h+1:g=h}return f},x.toArray=function(a){return a?x.isArray(a)?h.call(a):a.length===+a.length?x.map(a,x.identity):x.values(a):[]},x.size=function(a){return null==a?0:a.length===+a.length?a.length:x.keys(a).length},x.first=x.head=x.take=function(a,b,c){return null==a?void 0:null==b||c?a[0]:h.call(a,0,b)},x.initial=function(a,b,c){return h.call(a,0,a.length-(null==b||c?1:b))},x.last=function(a,b,c){return null==a?void 0:null==b||c?a[a.length-1]:h.call(a,Math.max(a.length-b,0))},x.rest=x.tail=x.drop=function(a,b,c){return h.call(a,null==b||c?1:b)},x.compact=function(a){return x.filter(a,x.identity)};var D=function(a,b,c){return y(a,function(a){x.isArray(a)?b?g.apply(c,a):D(a,b,c):c.push(a)}),c};x.flatten=function(a,b){return D(a,b,[])},x.without=function(a){return x.difference(a,h.call(arguments,1))},x.uniq=x.unique=function(a,b,c,d){x.isFunction(b)&&(d=c,c=b,b=!1);var e=c?x.map(a,c,d):a,f=[],g=[];return y(e,function(c,d){(b?d&&g[g.length-1]===c:x.contains(g,c))||(g.push(c),f.push(a[d]))}),f},x.union=function(){return x.uniq(i.apply(d,arguments))},x.intersection=function(a){var b=h.call(arguments,1);return x.filter(x.uniq(a),function(a){return x.every(b,function(b){return x.indexOf(b,a)>=0})})},x.difference=function(a){var b=i.apply(d,h.call(arguments,1));return x.filter(a,function(a){return!x.contains(b,a)})},x.zip=function(){for(var a=h.call(arguments),b=x.max(x.pluck(a,"length")),c=new Array(b),d=0;b>d;d++)c[d]=x.pluck(a,""+d);return c},x.object=function(a,b){if(null==a)return{};for(var c={},d=0,e=a.length;e>d;d++)b?c[a[d]]=b[d]:c[a[d][0]]=a[d][1];return c},x.indexOf=function(a,b,c){if(null==a)return-1;var d=0,e=a.length;if(c){if("number"!=typeof c)return d=x.sortedIndex(a,b),a[d]===b?d:-1;d=0>c?Math.max(0,e+c):c}if(s&&a.indexOf===s)return a.indexOf(b,c);for(;e>d;d++)if(a[d]===b)return d;return-1},x.lastIndexOf=function(a,b,c){if(null==a)return-1;var d=null!=c;if(t&&a.lastIndexOf===t)return d?a.lastIndexOf(b,c):a.lastIndexOf(b);for(var e=d?c:a.length;e--;)if(a[e]===b)return e;return-1},x.range=function(a,b,c){arguments.length<=1&&(b=a||0,a=0),c=arguments[2]||1;for(var d=Math.max(Math.ceil((b-a)/c),0),e=0,f=new Array(d);d>e;)f[e++]=a,a+=c;return f},x.bind=function(a,b){if(a.bind===w&&w)return w.apply(a,h.call(arguments,1));var c=h.call(arguments,2);return function(){return a.apply(b,c.concat(h.call(arguments)))}},x.partial=function(a){var b=h.call(arguments,1);return function(){return a.apply(this,b.concat(h.call(arguments)))}},x.bindAll=function(a){var b=h.call(arguments,1);return 0===b.length&&(b=x.functions(a)),y(b,function(b){a[b]=x.bind(a[b],a)}),a},x.memoize=function(a,b){var c={};return b||(b=x.identity),function(){var d=b.apply(this,arguments);return x.has(c,d)?c[d]:c[d]=a.apply(this,arguments)}},x.delay=function(a,b){var c=h.call(arguments,2);return setTimeout(function(){return a.apply(null,c)},b)},x.defer=function(a){return x.delay.apply(x,[a,1].concat(h.call(arguments,1)))},x.throttle=function(a,b){var c,d,e,f,g=0,h=function(){g=new Date,e=null,f=a.apply(c,d)};return function(){var i=new Date,j=b-(i-g);return c=this,d=arguments,0>=j?(clearTimeout(e),e=null,g=i,f=a.apply(c,d)):e||(e=setTimeout(h,j)),f}},x.debounce=function(a,b,c){var d,e;return function(){var f=this,g=arguments,h=function(){d=null,c||(e=a.apply(f,g))},i=c&&!d;return clearTimeout(d),d=setTimeout(h,b),i&&(e=a.apply(f,g)),e}},x.once=function(a){var b,c=!1;return function(){return c?b:(c=!0,b=a.apply(this,arguments),a=null,b)}},x.wrap=function(a,b){return function(){var c=[a];return g.apply(c,arguments),b.apply(this,c)}},x.compose=function(){var a=arguments;return function(){for(var b=arguments,c=a.length-1;c>=0;c--)b=[a[c].apply(this,b)];return b[0]}},x.after=function(a,b){return 0>=a?b():function(){return--a<1?b.apply(this,arguments):void 0}},x.keys=v||function(a){if(a!==Object(a))throw new TypeError("Invalid object");var b=[];for(var c in a)x.has(a,c)&&(b[b.length]=c);return b},x.values=function(a){var b=[];for(var c in a)x.has(a,c)&&b.push(a[c]);return b},x.pairs=function(a){var b=[];for(var c in a)x.has(a,c)&&b.push([c,a[c]]);return b},x.invert=function(a){var b={};for(var c in a)x.has(a,c)&&(b[a[c]]=c);return b},x.functions=x.methods=function(a){var b=[];for(var c in a)x.isFunction(a[c])&&b.push(c);return b.sort()},x.extend=function(a){return y(h.call(arguments,1),function(b){if(b)for(var c in b)a[c]=b[c]}),a},x.pick=function(a){var b={},c=i.apply(d,h.call(arguments,1));return y(c,function(c){c in a&&(b[c]=a[c])}),b},x.omit=function(a){var b={},c=i.apply(d,h.call(arguments,1));for(var e in a)x.contains(c,e)||(b[e]=a[e]);return b},x.defaults=function(a){return y(h.call(arguments,1),function(b){if(b)for(var c in b)null==a[c]&&(a[c]=b[c])}),a},x.clone=function(a){return x.isObject(a)?x.isArray(a)?a.slice():x.extend({},a):a},x.tap=function(a,b){return b(a),a};var E=function(a,b,c,d){if(a===b)return 0!==a||1/a==1/b;if(null==a||null==b)return a===b;a instanceof x&&(a=a._wrapped),b instanceof x&&(b=b._wrapped);var e=j.call(a);if(e!=j.call(b))return!1;switch(e){case"[object String]":return a==String(b);case"[object Number]":return a!=+a?b!=+b:0==a?1/a==1/b:a==+b;case"[object Date]":case"[object Boolean]":return+a==+b;case"[object RegExp]":return a.source==b.source&&a.global==b.global&&a.multiline==b.multiline&&a.ignoreCase==b.ignoreCase}if("object"!=typeof a||"object"!=typeof b)return!1;for(var f=c.length;f--;)if(c[f]==a)return d[f]==b;c.push(a),d.push(b);var g=0,h=!0;if("[object Array]"==e){if(g=a.length,h=g==b.length)for(;g--&&(h=E(a[g],b[g],c,d)););}else{var i=a.constructor,k=b.constructor;if(i!==k&&!(x.isFunction(i)&&i instanceof i&&x.isFunction(k)&&k instanceof k))return!1;for(var l in a)if(x.has(a,l)&&(g++,!(h=x.has(b,l)&&E(a[l],b[l],c,d))))break;if(h){for(l in b)if(x.has(b,l)&&!g--)break;h=!g}}return c.pop(),d.pop(),h};x.isEqual=function(a,b){return E(a,b,[],[])},x.isEmpty=function(a){if(null==a)return!0;if(x.isArray(a)||x.isString(a))return 0===a.length;for(var b in a)if(x.has(a,b))return!1;return!0},x.isElement=function(a){return!(!a||1!==a.nodeType)},x.isArray=u||function(a){return"[object Array]"==j.call(a)},x.isObject=function(a){return a===Object(a)},y(["Arguments","Function","String","Number","Date","RegExp"],function(a){x["is"+a]=function(b){return j.call(b)=="[object "+a+"]"}}),x.isArguments(arguments)||(x.isArguments=function(a){return!(!a||!x.has(a,"callee"))}),"function"!=typeof/./&&(x.isFunction=function(a){return"function"==typeof a}),x.isFinite=function(a){return isFinite(a)&&!isNaN(parseFloat(a))},x.isNaN=function(a){return x.isNumber(a)&&a!=+a},x.isBoolean=function(a){return a===!0||a===!1||"[object Boolean]"==j.call(a)},x.isNull=function(a){return null===a},x.isUndefined=function(a){return void 0===a},x.has=function(a,b){return k.call(a,b)},x.noConflict=function(){return a._=b,this},x.identity=function(a){return a},x.times=function(a,b,c){for(var d=Array(a),e=0;a>e;e++)d[e]=b.call(c,e);return d},x.random=function(a,b){return null==b&&(b=a,a=0),a+Math.floor(Math.random()*(b-a+1))};var F={escape:{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","/":"&#x2F;"}};F.unescape=x.invert(F.escape);var G={escape:new RegExp("["+x.keys(F.escape).join("")+"]","g"),unescape:new RegExp("("+x.keys(F.unescape).join("|")+")","g")};x.each(["escape","unescape"],function(a){x[a]=function(b){return null==b?"":(""+b).replace(G[a],function(b){return F[a][b]})}}),x.result=function(a,b){if(null==a)return null;var c=a[b];return x.isFunction(c)?c.call(a):c},x.mixin=function(a){y(x.functions(a),function(b){var c=x[b]=a[b];x.prototype[b]=function(){var a=[this._wrapped];return g.apply(a,arguments),L.call(this,c.apply(x,a))}})};var H=0;x.uniqueId=function(a){var b=++H+"";return a?a+b:b},x.templateSettings={evaluate:/<%([\s\S]+?)%>/g,interpolate:/<%=([\s\S]+?)%>/g,escape:/<%-([\s\S]+?)%>/g};var I=/(.)^/,J={"'":"'","\\":"\\","\r":"r","\n":"n","	":"t","\u2028":"u2028","\u2029":"u2029"},K=/\\|'|\r|\n|\t|\u2028|\u2029/g;x.template=function(a,b,c){var d;c=x.defaults({},c,x.templateSettings);var e=new RegExp([(c.escape||I).source,(c.interpolate||I).source,(c.evaluate||I).source].join("|")+"|$","g"),f=0,g="__p+='";a.replace(e,function(b,c,d,e,h){return g+=a.slice(f,h).replace(K,function(a){return"\\"+J[a]}),c&&(g+="'+\n((__t=("+c+"))==null?'':_.escape(__t))+\n'"),d&&(g+="'+\n((__t=("+d+"))==null?'':__t)+\n'"),e&&(g+="';\n"+e+"\n__p+='"),f=h+b.length,b}),g+="';\n",c.variable||(g="with(obj||{}){\n"+g+"}\n"),g="var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n"+g+"return __p;\n";try{d=new Function(c.variable||"obj","_",g)}catch(h){throw h.source=g,h}if(b)return d(b,x);var i=function(a){return d.call(this,a,x)};return i.source="function("+(c.variable||"obj")+"){\n"+g+"}",i},x.chain=function(a){return x(a).chain()};var L=function(a){return this._chain?x(a).chain():a};x.mixin(x),y(["pop","push","reverse","shift","sort","splice","unshift"],function(a){var b=d[a];x.prototype[a]=function(){var c=this._wrapped;return b.apply(c,arguments),"shift"!=a&&"splice"!=a||0!==c.length||delete c[0],L.call(this,c)}}),y(["concat","join","slice"],function(a){var b=d[a];x.prototype[a]=function(){return L.call(this,b.apply(this._wrapped,arguments))}}),x.extend(x.prototype,{chain:function(){return this._chain=!0,this},value:function(){return this._wrapped}})}.call(this),function(a){a.Parse=a.Parse||{};var b=a.Parse,c="function"==typeof require?require:null;"undefined"!=typeof XMLHttpRequest?b.XMLHttpRequest=XMLHttpRequest:"function"==typeof require&&"undefined"==typeof require.ensure&&(b.XMLHttpRequest=c("xmlhttprequest").XMLHttpRequest),"undefined"!=typeof exports&&exports._?(b._=exports._.noConflict(),exports.Parse=b):b._=_.noConflict(),"undefined"!=typeof $&&(b.$=$);var d=function(){},e=function(a,c,e){var f;return f=c&&c.hasOwnProperty("constructor")?c.constructor:function(){a.apply(this,arguments)},b._.extend(f,a),d.prototype=a.prototype,f.prototype=new d,c&&b._.extend(f.prototype,c),e&&b._.extend(f,e),f.prototype.constructor=f,f.__super__=a.prototype,f};b.serverURL="https://api.parse.com","undefined"!=typeof process&&process.versions&&process.versions.node&&(b._isNode=!0),b.initialize=function(a,c,d){if(d)throw"Parse.initialize() was passed a Master Key, which is only allowed from within Node.js.";b._initialize(a,c)},b._initialize=function(a,c,d){b.applicationId=a,b.javaScriptKey=c,b.masterKey=d,b._useMasterKey=!1},b._isNode&&(b.initialize=b._initialize,b.Cloud=b.Cloud||{},b.Cloud.useMasterKey=function(){b._useMasterKey=!0}),b._getParsePath=function(a){if(!b.applicationId)throw"You need to call Parse.initialize before using Parse.";if(a||(a=""),!b._.isString(a))throw"Tried to get a Storage path that wasn't a String.";return"/"===a[0]&&(a=a.substring(1)),"Parse/"+b.applicationId+"/"+a},b._installationId=null,b._getInstallationId=function(){if(b._installationId)return b.Promise.as(b._installationId);var a=b._getParsePath("installationId");return b.Storage.getItemAsync(a).then(function(c){if(b._installationId=c,!b._installationId||""===b._installationId){var d=function(){return Math.floor(65536*(1+Math.random())).toString(16).substring(1)};return b._installationId=d()+d()+"-"+d()+"-"+d()+"-"+d()+"-"+d()+d()+d(),b.Storage.setItemAsync(a,b._installationId)}return b.Promise.as(b._installationId)})},b._parseDate=function(a){var b=new RegExp("^([0-9]{1,4})-([0-9]{1,2})-([0-9]{1,2})T([0-9]{1,2}):([0-9]{1,2}):([0-9]{1,2})(.([0-9]+))?Z$"),c=b.exec(a);if(!c)return null;var d=c[1]||0,e=(c[2]||1)-1,f=c[3]||0,g=c[4]||0,h=c[5]||0,i=c[6]||0,j=c[8]||0;return new Date(Date.UTC(d,e,f,g,h,i,j))},b._ajaxIE8=function(a,c,d){var e=new b.Promise,f=new XDomainRequest;return f.onload=function(){var a;try{a=JSON.parse(f.responseText)}catch(b){e.reject(b)}a&&e.resolve(a)},f.onerror=f.ontimeout=function(){var a={responseText:JSON.stringify({code:b.Error.X_DOMAIN_REQUEST,error:"IE's XDomainRequest does not supply error info."})};e.reject(a)},f.onprogress=function(){},f.open(a,c),f.send(d),e},b._useXDomainRequest=function(){return"undefined"!=typeof XDomainRequest?"withCredentials"in new XMLHttpRequest?!1:!0:!1},b._ajax=function(a,c,d,e,f){var g={success:e,error:f};if(b._useXDomainRequest())return b._ajaxIE8(a,c,d)._thenRunCallbacks(g);var h=new b.Promise,i=0,j=function(){var e=!1,f=new b.XMLHttpRequest;f.onreadystatechange=function(){if(4===f.readyState){if(e)return;if(e=!0,f.status>=200&&f.status<300){var a;try{a=JSON.parse(f.responseText)}catch(b){h.reject(b)}a&&h.resolve(a,f.status,f)}else if(f.status>=500)if(++i<5){var c=Math.round(125*Math.random()*Math.pow(2,i));setTimeout(j,c)}else h.reject(f);else h.reject(f)}},f.open(a,c,!0),f.setRequestHeader("Content-Type","text/plain"),b._isNode&&f.setRequestHeader("User-Agent","Parse/"+b.VERSION+" (NodeJS "+process.versions.node+")"),f.send(d)};return j(),h._thenRunCallbacks(g)},b._extend=function(a,b){var c=e(this,a,b);return c.extend=this.extend,c},b._request=function(a){var c=a.route,d=a.className,e=a.objectId,f=a.method,g=a.useMasterKey,h=a.sessionToken,i=a.data;if(!b.applicationId)throw"You must specify your applicationId using Parse.initialize.";if(!b.javaScriptKey&&!b.masterKey)throw"You must specify a key using Parse.initialize.";if("batch"!==c&&"classes"!==c&&"events"!==c&&"files"!==c&&"functions"!==c&&"login"!==c&&"logout"!==c&&"push"!==c&&"requestPasswordReset"!==c&&"rest_verify_analytics"!==c&&"users"!==c&&"jobs"!==c&&"config"!==c&&"sessions"!==c&&"upgradeToRevocableSession"!==c)throw"Bad route: '"+c+"'.";var j=b.serverURL;if("/"!==j.charAt(j.length-1)&&(j+="/"),j+="1/"+c,d&&(j+="/"+d),e&&(j+="/"+e),i=b._.clone(i||{}),"POST"!==f&&(i._method=f,f="POST"),b._.isUndefined(g)&&(g=b._useMasterKey),i._ApplicationId=b.applicationId,g){if(!b.masterKey)throw new Error("Cannot use the Master Key, it has not been provided.");i._MasterKey=b.masterKey}else i._JavaScriptKey=b.javaScriptKey;return i._ClientVersion=b.VERSION,b._getInstallationId().then(function(a){return i._InstallationId=a,h?b.Promise.as({_sessionToken:h}):b.User._canUseCurrentUser()?b.User._currentAsync():b.Promise.as(null)}).then(function(a){a&&a._sessionToken&&(i._SessionToken=a._sessionToken),b.User._isRevocableSessionEnabled&&(i._RevocableSession="1");var c=JSON.stringify(i);return b._ajax(f,j,c)}).then(null,function(a){var c;if(a&&a.responseText)try{var d=JSON.parse(a.responseText);c=new b.Error(d.code,d.error)}catch(e){c=new b.Error(b.Error.INVALID_JSON,"Received an error with invalid JSON from Parse: "+a.responseText)}else c=new b.Error(b.Error.CONNECTION_FAILED,"XMLHttpRequest failed: "+JSON.stringify(a));return b.Promise.error(c)})},b._getValue=function(a,c){return a&&a[c]?b._.isFunction(a[c])?a[c]():a[c]:null},b._encode=function(a,c,d){var e=b._;if(a instanceof b.Object){if(d)throw"Parse.Objects not allowed here";if(!c||e.include(c,a)||!a._hasData)return a._toPointer();if(!a.dirty())return c=c.concat(a),b._encode(a._toFullJSON(c),c,d);throw"Tried to save an object with a pointer to a new, unsaved object."}if(a instanceof b.ACL)return a.toJSON();if(e.isDate(a)){if(isNaN(a))throw new Error("Cannot encode invalid Date");return{__type:"Date",iso:a.toJSON()}}if(a instanceof b.GeoPoint)return a.toJSON();if(e.isArray(a))return e.map(a,function(a){return b._encode(a,c,d)});if(e.isRegExp(a))return a.source;if(a instanceof b.Relation)return a.toJSON();if(a instanceof b.Op)return a.toJSON();if(a instanceof b.File){if(!a.url())throw"Tried to save an object containing an unsaved file.";return{__type:"File",name:a.name(),url:a.url()}}if(e.isObject(a)){var f={};return b._objectEach(a,function(a,e){f[e]=b._encode(a,c,d)}),f}return a},b._decode=function(a,c){var d=b._;if(!d.isObject(c))return c;if(d.isArray(c))return b._arrayEach(c,function(a,d){c[d]=b._decode(d,a)}),c;if(c instanceof b.Object)return c;if(c instanceof b.File)return c;if(c instanceof b.Op)return c;if(c.__op)return b.Op._decode(c);if("Pointer"===c.__type&&c.className){var e=b.Object._create(c.className);return e._finishFetch({objectId:c.objectId},!1),e}if("Object"===c.__type&&c.className){var f=c.className;delete c.__type,delete c.className;var g=b.Object._create(f);return g._finishFetch(c,!0),g}if("Date"===c.__type)return b._parseDate(c.iso);if("GeoPoint"===c.__type)return new b.GeoPoint({latitude:c.latitude,longitude:c.longitude});if("ACL"===a)return c instanceof b.ACL?c:new b.ACL(c);if("Relation"===c.__type){var h=new b.Relation(null,a);return h.targetClassName=c.className,h}if("File"===c.__type){var i=new b.File(c.name);return i._url=c.url,i}return b._objectEach(c,function(a,d){c[d]=b._decode(d,a)}),c},b._arrayEach=b._.each,b._traverse=function(a,c,d){if(a instanceof b.Object){if(d=d||[],b._.indexOf(d,a)>=0)return;return d.push(a),b._traverse(a.attributes,c,d),c(a)}return a instanceof b.Relation||a instanceof b.File?c(a):b._.isArray(a)?(b._.each(a,function(e,f){var g=b._traverse(e,c,d);g&&(a[f]=g)}),c(a)):b._.isObject(a)?(b._each(a,function(e,f){var g=b._traverse(e,c,d);g&&(a[f]=g)}),c(a)):c(a)},b._objectEach=b._each=function(a,c){var d=b._;d.isObject(a)?d.each(d.keys(a),function(b){c(a[b],b)}):d.each(a,c)},b._isNullOrUndefined=function(a){return b._.isNull(a)||b._.isUndefined(a)}}(this),function(root){root.Parse=root.Parse||{};var Parse=root.Parse,Storage={async:!1},hasLocalStorage="undefined"!=typeof localStorage;if(hasLocalStorage)try{localStorage.setItem("supported",!0),localStorage.removeItem("supported")}catch(e){hasLocalStorage=!1}if(hasLocalStorage)Storage.getItem=function(a){return localStorage.getItem(a)},Storage.setItem=function(a,b){return localStorage.setItem(a,b)},Storage.removeItem=function(a){return localStorage.removeItem(a)},Storage.clear=function(){return localStorage.clear()};else if("function"==typeof require){var AsyncStorage;try{AsyncStorage=eval("require('AsyncStorage')"),Storage.async=!0,Storage.getItemAsync=function(a){var b=new Parse.Promise;return AsyncStorage.getItem(a,function(a,c){a?b.reject(a):b.resolve(c)}),b},Storage.setItemAsync=function(a,b){var c=new Parse.Promise;return AsyncStorage.setItem(a,b,function(a){a?c.reject(a):c.resolve(b)}),c},Storage.removeItemAsync=function(a){var b=new Parse.Promise;return AsyncStorage.removeItem(a,function(a){a?b.reject(a):b.resolve()}),b},Storage.clear=function(){AsyncStorage.clear()}}catch(e){}}if(!Storage.async&&!Storage.getItem){var memMap=Storage.inMemoryMap={};Storage.getItem=function(a){return memMap.hasOwnProperty(a)?memMap[a]:null},Storage.setItem=function(a,b){memMap[a]=String(b)},Storage.removeItem=function(a){delete memMap[a]},Storage.clear=function(){for(var a in memMap)memMap.hasOwnProperty(a)&&delete memMap[a]}}Storage.async||(Storage.getItemAsync=function(a){return Parse.Promise.as(Storage.getItem(a))},Storage.setItemAsync=function(a,b){return Storage.setItem(a,b),Parse.Promise.as(b)},Storage.removeItemAsync=function(a){return Parse.Promise.as(Storage.removeItem(a))}),Parse.Storage=Storage}(this),function(a){a.Parse=a.Parse||{};var b=a.Parse,c=b._;b.Analytics=b.Analytics||{},c.extend(b.Analytics,{track:function(a,d,e){if(a=a||"",a=a.replace(/^\s*/,""),a=a.replace(/\s*$/,""),0===a.length)throw"A name for the custom event must be provided";return c.each(d,function(a,b){if(!c.isString(b)||!c.isString(a))throw'track() dimensions expects keys and values of type "string".'}),e=e||{},b._request({route:"events",className:a,method:"POST",data:{dimensions:d}})._thenRunCallbacks(e)}})}(this),function(a){a.Parse=a.Parse||{};var b=a.Parse,c=b._;b.Config=function(){this.attributes={},this._escapedAttributes={}},b.Config.current=function(){if(b.Config._currentConfig)return b.Config._currentConfig;var a=new b.Config;if(b.Storage.async)return a;var c=b.Storage.getItem(b._getParsePath(b.Config._CURRENT_CONFIG_KEY));return c&&(a._finishFetch(JSON.parse(c)),b.Config._currentConfig=a),a},b.Config.get=function(a){a=a||{};var c=b._request({route:"config",method:"GET"});return c.then(function(a){if(!a||!a.params){var c=new b.Error(b.Error.INVALID_JSON,"Config JSON response invalid.");return b.Promise.error(c)}var d=new b.Config;return d._finishFetch(a),b.Config._currentConfig=d,d})._thenRunCallbacks(a)},b.Config.prototype={escape:function(a){var d=this._escapedAttributes[a];if(d)return d;var e,f=this.attributes[a];return e=b._isNullOrUndefined(f)?"":c.escape(f.toString()),this._escapedAttributes[a]=e,e},get:function(a){return this.attributes[a]},_finishFetch:function(a){this.attributes=b._decode(null,c.clone(a.params)),b.Storage.async||b.Storage.setItem(b._getParsePath(b.Config._CURRENT_CONFIG_KEY),JSON.stringify(a))}},b.Config._currentConfig=null,b.Config._CURRENT_CONFIG_KEY="currentConfig"}(this),function(a){a.Parse=a.Parse||{};var b=a.Parse,c=b._;b.Error=function(a,b){this.code=a,this.message=b},c.extend(b.Error,{OTHER_CAUSE:-1,INTERNAL_SERVER_ERROR:1,CONNECTION_FAILED:100,OBJECT_NOT_FOUND:101,INVALID_QUERY:102,INVALID_CLASS_NAME:103,MISSING_OBJECT_ID:104,INVALID_KEY_NAME:105,INVALID_POINTER:106,INVALID_JSON:107,COMMAND_UNAVAILABLE:108,NOT_INITIALIZED:109,INCORRECT_TYPE:111,INVALID_CHANNEL_NAME:112,PUSH_MISCONFIGURED:115,OBJECT_TOO_LARGE:116,OPERATION_FORBIDDEN:119,CACHE_MISS:120,INVALID_NESTED_KEY:121,INVALID_FILE_NAME:122,INVALID_ACL:123,TIMEOUT:124,INVALID_EMAIL_ADDRESS:125,MISSING_CONTENT_TYPE:126,MISSING_CONTENT_LENGTH:127,INVALID_CONTENT_LENGTH:128,FILE_TOO_LARGE:129,FILE_SAVE_ERROR:130,DUPLICATE_VALUE:137,INVALID_ROLE_NAME:139,EXCEEDED_QUOTA:140,SCRIPT_FAILED:141,VALIDATION_ERROR:142,INVALID_IMAGE_DATA:150,UNSAVED_FILE_ERROR:151,INVALID_PUSH_TIME_ERROR:152,FILE_DELETE_ERROR:153,REQUEST_LIMIT_EXCEEDED:155,INVALID_EVENT_NAME:160,USERNAME_MISSING:200,PASSWORD_MISSING:201,USERNAME_TAKEN:202,EMAIL_TAKEN:203,EMAIL_MISSING:204,EMAIL_NOT_FOUND:205,SESSION_MISSING:206,MUST_CREATE_USER_THROUGH_SIGNUP:207,ACCOUNT_ALREADY_LINKED:208,INVALID_SESSION_TOKEN:209,LINKED_ID_MISSING:250,INVALID_LINKED_SESSION:251,UNSUPPORTED_SERVICE:252,AGGREGATE_ERROR:600,FILE_READ_ERROR:601,X_DOMAIN_REQUEST:602})}(this),function(){var a=this,b=a.Parse||(a.Parse={}),c=/\s+/,d=Array.prototype.slice;b.Events={on:function(a,b,d){var e,f,g,h,i;if(!b)return this;for(a=a.split(c),e=this._callbacks||(this._callbacks={}),f=a.shift();f;)i=e[f],g=i?i.tail:{},g.next=h={},g.context=d,g.callback=b,e[f]={tail:h,next:i?i.next:g},f=a.shift();return this},off:function(a,b,d){var e,f,g,h,i,j;if(f=this._callbacks){if(!(a||b||d))return delete this._callbacks,this;for(a=a?a.split(c):Object.keys(f),e=a.shift();e;)if(g=f[e],delete f[e],g&&(b||d)){for(h=g.tail,g=g.next;g!==h;)i=g.callback,j=g.context,(b&&i!==b||d&&j!==d)&&this.on(e,i,j),g=g.next;e=a.shift()}else e=a.shift();return this}},trigger:function(a){var b,e,f,g,h,i,j;if(!(f=this._callbacks))return this;for(i=f.all,a=a.split(c),j=d.call(arguments,1),b=a.shift();b;){if(e=f[b])for(g=e.tail;(e=e.next)!==g;)e.callback.apply(e.context||this,j);if(e=i)for(g=e.tail,h=[b].concat(j);(e=e.next)!==g;)e.callback.apply(e.context||this,h);b=a.shift()}return this}},b.Events.bind=b.Events.on,b.Events.unbind=b.Events.off}.call(this),function(a){a.Parse=a.Parse||{};var b=a.Parse,c=b._;b.GeoPoint=function(a,d){c.isArray(a)?(b.GeoPoint._validate(a[0],a[1]),this.latitude=a[0],this.longitude=a[1]):c.isObject(a)?(b.GeoPoint._validate(a.latitude,a.longitude),this.latitude=a.latitude,this.longitude=a.longitude):c.isNumber(a)&&c.isNumber(d)?(b.GeoPoint._validate(a,d),this.latitude=a,this.longitude=d):(this.latitude=0,this.longitude=0);var e=this;this.__defineGetter__&&this.__defineSetter__&&(this._latitude=this.latitude,this._longitude=this.longitude,this.__defineGetter__("latitude",function(){return e._latitude}),this.__defineGetter__("longitude",function(){return e._longitude}),this.__defineSetter__("latitude",function(a){b.GeoPoint._validate(a,e.longitude),e._latitude=a}),this.__defineSetter__("longitude",function(a){b.GeoPoint._validate(e.latitude,a),e._longitude=a}))},b.GeoPoint._validate=function(a,b){if(-90>a)throw"Parse.GeoPoint latitude "+a+" < -90.0.";if(a>90)throw"Parse.GeoPoint latitude "+a+" > 90.0.";if(-180>b)throw"Parse.GeoPoint longitude "+b+" < -180.0.";if(b>180)throw"Parse.GeoPoint longitude "+b+" > 180.0."},b.GeoPoint.current=function(a){var c=new b.Promise;return navigator.geolocation.getCurrentPosition(function(a){c.resolve(new b.GeoPoint({latitude:a.coords.latitude,longitude:a.coords.longitude}))},function(a){c.reject(a)}),c._thenRunCallbacks(a)},b.GeoPoint.prototype={toJSON:function(){return b.GeoPoint._validate(this.latitude,this.longitude),{__type:"GeoPoint",latitude:this.latitude,longitude:this.longitude}},radiansTo:function(a){var b=Math.PI/180,c=this.latitude*b,d=this.longitude*b,e=a.latitude*b,f=a.longitude*b,g=c-e,h=d-f,i=Math.sin(g/2),j=Math.sin(h/2),k=i*i+Math.cos(c)*Math.cos(e)*j*j;return k=Math.min(1,k),2*Math.asin(Math.sqrt(k))},kilometersTo:function(a){return 6371*this.radiansTo(a)},milesTo:function(a){return 3958.8*this.radiansTo(a)}}}(this),function(a){a.Parse=a.Parse||{};var b=a.Parse,c=b._,d="*";b.ACL=function(a){var d=this;if(d.permissionsById={},c.isObject(a))if(a instanceof b.User)d.setReadAccess(a,!0),d.setWriteAccess(a,!0);else{if(c.isFunction(a))throw"Parse.ACL() called with a function.  Did you forget ()?";b._objectEach(a,function(a,e){if(!c.isString(e))throw"Tried to create an ACL with an invalid userId.";d.permissionsById[e]={},b._objectEach(a,function(a,b){if("read"!==b&&"write"!==b)throw"Tried to create an ACL with an invalid permission type.";if(!c.isBoolean(a))throw"Tried to create an ACL with an invalid permission value.";d.permissionsById[e][b]=a})})}},b.ACL.prototype.toJSON=function(){return c.clone(this.permissionsById)},b.ACL.prototype._setAccess=function(a,d,e){if(d instanceof b.User?d=d.id:d instanceof b.Role&&(d="role:"+d.getName()),!c.isString(d))throw"userId must be a string.";if(!c.isBoolean(e))throw"allowed must be either true or false.";var f=this.permissionsById[d];if(!f){if(!e)return;f={},this.permissionsById[d]=f}e?this.permissionsById[d][a]=!0:(delete f[a],c.isEmpty(f)&&delete f[d])},b.ACL.prototype._getAccess=function(a,c){c instanceof b.User?c=c.id:c instanceof b.Role&&(c="role:"+c.getName());var d=this.permissionsById[c];return d&&d[a]?!0:!1},b.ACL.prototype.setReadAccess=function(a,b){this._setAccess("read",a,b)},b.ACL.prototype.getReadAccess=function(a){return this._getAccess("read",a)},b.ACL.prototype.setWriteAccess=function(a,b){this._setAccess("write",a,b)},b.ACL.prototype.getWriteAccess=function(a){return this._getAccess("write",a)},b.ACL.prototype.setPublicReadAccess=function(a){this.setReadAccess(d,a)},b.ACL.prototype.getPublicReadAccess=function(){return this.getReadAccess(d)},b.ACL.prototype.setPublicWriteAccess=function(a){this.setWriteAccess(d,a)},b.ACL.prototype.getPublicWriteAccess=function(){return this.getWriteAccess(d)},b.ACL.prototype.getRoleReadAccess=function(a){if(a instanceof b.Role&&(a=a.getName()),c.isString(a))return this.getReadAccess("role:"+a);throw"role must be a Parse.Role or a String"},b.ACL.prototype.getRoleWriteAccess=function(a){if(a instanceof b.Role&&(a=a.getName()),c.isString(a))return this.getWriteAccess("role:"+a);throw"role must be a Parse.Role or a String"},b.ACL.prototype.setRoleReadAccess=function(a,d){if(a instanceof b.Role&&(a=a.getName()),c.isString(a))return void this.setReadAccess("role:"+a,d);throw"role must be a Parse.Role or a String"},b.ACL.prototype.setRoleWriteAccess=function(a,d){if(a instanceof b.Role&&(a=a.getName()),c.isString(a))return void this.setWriteAccess("role:"+a,d);throw"role must be a Parse.Role or a String"}}(this),function(a){a.Parse=a.Parse||{};var b=a.Parse,c=b._;b.Op=function(){this._initialize.apply(this,arguments)},b.Op.prototype={_initialize:function(){}},c.extend(b.Op,{_extend:b._extend,_opDecoderMap:{},_registerDecoder:function(a,c){b.Op._opDecoderMap[a]=c},_decode:function(a){var c=b.Op._opDecoderMap[a.__op];return c?c(a):void 0;
}}),b.Op._registerDecoder("Batch",function(a){var c=null;return b._arrayEach(a.ops,function(a){a=b.Op._decode(a),c=a._mergeWithPrevious(c)}),c}),b.Op.Set=b.Op._extend({_initialize:function(a){this._value=a},value:function(){return this._value},toJSON:function(){return b._encode(this.value())},_mergeWithPrevious:function(a){return this},_estimate:function(a){return this.value()}}),b.Op._UNSET={},b.Op.Unset=b.Op._extend({toJSON:function(){return{__op:"Delete"}},_mergeWithPrevious:function(a){return this},_estimate:function(a){return b.Op._UNSET}}),b.Op._registerDecoder("Delete",function(a){return new b.Op.Unset}),b.Op.Increment=b.Op._extend({_initialize:function(a){this._amount=a},amount:function(){return this._amount},toJSON:function(){return{__op:"Increment",amount:this._amount}},_mergeWithPrevious:function(a){if(a){if(a instanceof b.Op.Unset)return new b.Op.Set(this.amount());if(a instanceof b.Op.Set)return new b.Op.Set(a.value()+this.amount());if(a instanceof b.Op.Increment)return new b.Op.Increment(this.amount()+a.amount());throw"Op is invalid after previous op."}return this},_estimate:function(a){return a?a+this.amount():this.amount()}}),b.Op._registerDecoder("Increment",function(a){return new b.Op.Increment(a.amount)}),b.Op.Add=b.Op._extend({_initialize:function(a){this._objects=a},objects:function(){return this._objects},toJSON:function(){return{__op:"Add",objects:b._encode(this.objects())}},_mergeWithPrevious:function(a){if(a){if(a instanceof b.Op.Unset)return new b.Op.Set(this.objects());if(a instanceof b.Op.Set)return new b.Op.Set(this._estimate(a.value()));if(a instanceof b.Op.Add)return new b.Op.Add(a.objects().concat(this.objects()));throw"Op is invalid after previous op."}return this},_estimate:function(a){return a?a.concat(this.objects()):c.clone(this.objects())}}),b.Op._registerDecoder("Add",function(a){return new b.Op.Add(b._decode(void 0,a.objects))}),b.Op.AddUnique=b.Op._extend({_initialize:function(a){this._objects=c.uniq(a)},objects:function(){return this._objects},toJSON:function(){return{__op:"AddUnique",objects:b._encode(this.objects())}},_mergeWithPrevious:function(a){if(a){if(a instanceof b.Op.Unset)return new b.Op.Set(this.objects());if(a instanceof b.Op.Set)return new b.Op.Set(this._estimate(a.value()));if(a instanceof b.Op.AddUnique)return new b.Op.AddUnique(this._estimate(a.objects()));throw"Op is invalid after previous op."}return this},_estimate:function(a){if(a){var d=c.clone(a);return b._arrayEach(this.objects(),function(a){if(a instanceof b.Object&&a.id){var e=c.find(d,function(c){return c instanceof b.Object&&c.id===a.id});if(e){var f=c.indexOf(d,e);d[f]=a}else d.push(a)}else c.contains(d,a)||d.push(a)}),d}return c.clone(this.objects())}}),b.Op._registerDecoder("AddUnique",function(a){return new b.Op.AddUnique(b._decode(void 0,a.objects))}),b.Op.Remove=b.Op._extend({_initialize:function(a){this._objects=c.uniq(a)},objects:function(){return this._objects},toJSON:function(){return{__op:"Remove",objects:b._encode(this.objects())}},_mergeWithPrevious:function(a){if(a){if(a instanceof b.Op.Unset)return a;if(a instanceof b.Op.Set)return new b.Op.Set(this._estimate(a.value()));if(a instanceof b.Op.Remove)return new b.Op.Remove(c.union(a.objects(),this.objects()));throw"Op is invalid after previous op."}return this},_estimate:function(a){if(a){var d=c.difference(a,this.objects());return b._arrayEach(this.objects(),function(a){a instanceof b.Object&&a.id&&(d=c.reject(d,function(c){return c instanceof b.Object&&c.id===a.id}))}),d}return[]}}),b.Op._registerDecoder("Remove",function(a){return new b.Op.Remove(b._decode(void 0,a.objects))}),b.Op.Relation=b.Op._extend({_initialize:function(a,d){this._targetClassName=null;var e=this,f=function(a){if(a instanceof b.Object){if(!a.id)throw"You can't add an unsaved Parse.Object to a relation.";if(e._targetClassName||(e._targetClassName=a.className),e._targetClassName!==a.className)throw"Tried to create a Parse.Relation with 2 different types: "+e._targetClassName+" and "+a.className+".";return a.id}return a};this.relationsToAdd=c.uniq(c.map(a,f)),this.relationsToRemove=c.uniq(c.map(d,f))},added:function(){var a=this;return c.map(this.relationsToAdd,function(c){var d=b.Object._create(a._targetClassName);return d.id=c,d})},removed:function(){var a=this;return c.map(this.relationsToRemove,function(c){var d=b.Object._create(a._targetClassName);return d.id=c,d})},toJSON:function(){var a=null,b=null,d=this,e=function(a){return{__type:"Pointer",className:d._targetClassName,objectId:a}},f=null;return this.relationsToAdd.length>0&&(f=c.map(this.relationsToAdd,e),a={__op:"AddRelation",objects:f}),this.relationsToRemove.length>0&&(f=c.map(this.relationsToRemove,e),b={__op:"RemoveRelation",objects:f}),a&&b?{__op:"Batch",ops:[a,b]}:a||b||{}},_mergeWithPrevious:function(a){if(a){if(a instanceof b.Op.Unset)throw"You can't modify a relation after deleting it.";if(a instanceof b.Op.Relation){if(a._targetClassName&&a._targetClassName!==this._targetClassName)throw"Related object must be of class "+a._targetClassName+", but "+this._targetClassName+" was passed in.";var d=c.union(c.difference(a.relationsToAdd,this.relationsToRemove),this.relationsToAdd),e=c.union(c.difference(a.relationsToRemove,this.relationsToAdd),this.relationsToRemove),f=new b.Op.Relation(d,e);return f._targetClassName=this._targetClassName,f}throw"Op is invalid after previous op."}return this},_estimate:function(a,c,d){if(a){if(a instanceof b.Relation){if(this._targetClassName)if(a.targetClassName){if(a.targetClassName!==this._targetClassName)throw"Related object must be a "+a.targetClassName+", but a "+this._targetClassName+" was passed in."}else a.targetClassName=this._targetClassName;return a}throw"Op is invalid after previous op."}var e=new b.Relation(c,d);e.targetClassName=this._targetClassName}}),b.Op._registerDecoder("AddRelation",function(a){return new b.Op.Relation(b._decode(void 0,a.objects),[])}),b.Op._registerDecoder("RemoveRelation",function(a){return new b.Op.Relation([],b._decode(void 0,a.objects))})}(this),function(a){a.Parse=a.Parse||{};var b=a.Parse,c=b._;b.Relation=function(a,b){this.parent=a,this.key=b,this.targetClassName=null},b.Relation.prototype={_ensureParentAndKey:function(a,b){if(this.parent=this.parent||a,this.key=this.key||b,this.parent!==a)throw"Internal Error. Relation retrieved from two different Objects.";if(this.key!==b)throw"Internal Error. Relation retrieved from two different keys."},add:function(a){c.isArray(a)||(a=[a]);var d=new b.Op.Relation(a,[]);this.parent.set(this.key,d),this.targetClassName=d._targetClassName},remove:function(a){c.isArray(a)||(a=[a]);var d=new b.Op.Relation([],a);this.parent.set(this.key,d),this.targetClassName=d._targetClassName},toJSON:function(){return{__type:"Relation",className:this.targetClassName}},query:function(){var a,c;return this.targetClassName?(a=b.Object._getSubclass(this.targetClassName),c=new b.Query(a)):(a=b.Object._getSubclass(this.parent.className),c=new b.Query(a),c._extraOptions.redirectClassNameForKey=this.key),c._addCondition("$relatedTo","object",this.parent._toPointer()),c._addCondition("$relatedTo","key",this.key),c}}}(this),function(a){a.Parse=a.Parse||{};var b=a.Parse,c=b._;b.Promise=function(){this._resolved=!1,this._rejected=!1,this._resolvedCallbacks=[],this._rejectedCallbacks=[]},c.extend(b.Promise,{_isPromisesAPlusCompliant:!1,is:function(a){return a&&a.then&&c.isFunction(a.then)},as:function(){var a=new b.Promise;return a.resolve.apply(a,arguments),a},error:function(){var a=new b.Promise;return a.reject.apply(a,arguments),a},when:function(a){var c;c=a&&b._isNullOrUndefined(a.length)?arguments:a;var d=c.length,e=!1,f=[],g=[];if(f.length=c.length,g.length=c.length,0===d)return b.Promise.as.apply(this,f);var h=new b.Promise,i=function(){d-=1,0===d&&(e?h.reject(g):h.resolve.apply(h,f))};return b._arrayEach(c,function(a,c){b.Promise.is(a)?a.then(function(a){f[c]=a,i()},function(a){g[c]=a,e=!0,i()}):(f[c]=a,i())}),h},_continueWhile:function(a,c){return a()?c().then(function(){return b.Promise._continueWhile(a,c)}):b.Promise.as()}}),c.extend(b.Promise.prototype,{resolve:function(a){if(this._resolved||this._rejected)throw"A promise was resolved even though it had already been "+(this._resolved?"resolved":"rejected")+".";this._resolved=!0,this._result=arguments;var c=arguments;b._arrayEach(this._resolvedCallbacks,function(a){a.apply(this,c)}),this._resolvedCallbacks=[],this._rejectedCallbacks=[]},reject:function(a){if(this._resolved||this._rejected)throw"A promise was rejected even though it had already been "+(this._resolved?"resolved":"rejected")+".";this._rejected=!0,this._error=a,b._arrayEach(this._rejectedCallbacks,function(b){b(a)}),this._resolvedCallbacks=[],this._rejectedCallbacks=[]},then:function(a,c){var d=new b.Promise,e=function(){var c=arguments;if(a)if(b.Promise._isPromisesAPlusCompliant)try{c=[a.apply(this,c)]}catch(e){c=[b.Promise.error(e)]}else c=[a.apply(this,c)];1===c.length&&b.Promise.is(c[0])?c[0].then(function(){d.resolve.apply(d,arguments)},function(a){d.reject(a)}):d.resolve.apply(d,c)},f=function(a){var e=[];if(c){if(b.Promise._isPromisesAPlusCompliant)try{e=[c(a)]}catch(f){e=[b.Promise.error(f)]}else e=[c(a)];1===e.length&&b.Promise.is(e[0])?e[0].then(function(){d.resolve.apply(d,arguments)},function(a){d.reject(a)}):b.Promise._isPromisesAPlusCompliant?d.resolve.apply(d,e):d.reject(e[0])}else d.reject(a)},g=function(a){a.call()};b.Promise._isPromisesAPlusCompliant&&("undefined"!=typeof window&&window.setTimeout?g=function(a){window.setTimeout(a,0)}:"undefined"!=typeof process&&process.nextTick&&(g=function(a){process.nextTick(a)}));var h=this;return this._resolved?g(function(){e.apply(h,h._result)}):this._rejected?g(function(){f(h._error)}):(this._resolvedCallbacks.push(e),this._rejectedCallbacks.push(f)),d},always:function(a){return this.then(a,a)},done:function(a){return this.then(a)},fail:function(a){return this.then(null,a)},_thenRunCallbacks:function(a,d){var e;if(c.isFunction(a)){var f=a;e={success:function(a){f(a,null)},error:function(a){f(null,a)}}}else e=c.clone(a);return e=e||{},this.then(function(a){return e.success?e.success.apply(this,arguments):d&&d.trigger("sync",d,a,e),b.Promise.as.apply(b.Promise,arguments)},function(a){return e.error?c.isUndefined(d)?e.error(a):e.error(d,a):d&&d.trigger("error",d,a,e),b.Promise.error(a)})},_continueWith:function(a){return this.then(function(){return a(arguments,null)},function(b){return a(null,b)})}})}(this),function(a){a.Parse=a.Parse||{};var b=a.Parse,c=b._,d=function(a){if(26>a)return String.fromCharCode(65+a);if(52>a)return String.fromCharCode(97+(a-26));if(62>a)return String.fromCharCode(48+(a-52));if(62===a)return"+";if(63===a)return"/";throw"Tried to encode large digit "+a+" in base64."},e=function(a){var b=[];return b.length=Math.ceil(a.length/3),c.times(b.length,function(c){var e=a[3*c],f=a[3*c+1]||0,g=a[3*c+2]||0,h=3*c+1<a.length,i=3*c+2<a.length;b[c]=[d(e>>2&63),d(e<<4&48|f>>4&15),h?d(f<<2&60|g>>6&3):"=",i?d(63&g):"="].join("")}),b.join("")},f=function(a,c){var d=new b.Promise;if("undefined"==typeof FileReader)return b.Promise.error(new b.Error(b.Error.FILE_READ_ERROR,"Attempted to use a FileReader on an unsupported browser."));var e=new FileReader;return e.onloadend=function(){if(2!==e.readyState)return void d.reject(new b.Error(b.Error.FILE_READ_ERROR,"Error reading file."));var a=e.result,f=/^data:([^;]*);base64,(.*)$/.exec(a);return f?void d.resolve(f[2],c||f[1]):void d.reject(new b.Error(b.Error.FILE_READ_ERROR,"Unable to interpret data URL: "+a))},e.readAsDataURL(a),d};b.File=function(a,d,g){this._name=a;var h=/\.([^.]*)$/.exec(a);h&&(h=h[1].toLowerCase());var i=g||"";if(c.isArray(d))this._source=b.Promise.as(e(d),i);else if(d&&d.base64){var j=/^data:([a-zA-Z]*\/[a-zA-Z+.-]*);(charset=[a-zA-Z0-9\-\/\s]*,)?base64,(\S+)/,k=j.exec(d.base64);k&&k.length>0?this._source=b.Promise.as(4===k.length?k[3]:k[2],k[1]):this._source=b.Promise.as(d.base64,i)}else if("undefined"!=typeof File&&d instanceof File)this._source=f(d,g);else if(c.isString(d))throw"Creating a Parse.File from a String is not yet supported."},b.File.prototype={name:function(){return this._name},url:function(){return this._url},save:function(a){a=a||{};var c=this;return c._previousSave||(c._previousSave=c._source.then(function(d,e){var f={base64:d,_ContentType:e};return b._request({route:"files",className:c._name,method:"POST",data:f,useMasterKey:a.useMasterKey})}).then(function(a){return c._name=a.name,c._url=a.url,c})),c._previousSave._thenRunCallbacks(a)}}}(this),function(a){a.Parse=a.Parse||{};var b=a.Parse,c=b._;b.Object=function(a,d){if(c.isString(a))return b.Object._create.apply(this,arguments);a=a||{},d&&d.parse&&(a=this.parse(a));var e=b._getValue(this,"defaults");if(e&&(a=c.extend({},e,a)),d&&d.collection&&(this.collection=d.collection),this._serverData={},this._opSetQueue=[{}],this.attributes={},this._hashedJSON={},this._escapedAttributes={},this.cid=c.uniqueId("c"),this.changed={},this._silent={},this._pending={},!this.set(a,{silent:!0}))throw new Error("Can't create an invalid Parse.Object");this.changed={},this._silent={},this._pending={},this._hasData=!0,this._previousAttributes=c.clone(this.attributes),this.initialize.apply(this,arguments)},b.Object.saveAll=function(a,c){return c=c||{},b.Object._deepSaveAsync(a,{useMasterKey:c.useMasterKey,sessionToken:c.sessionToken})._thenRunCallbacks(c)},b.Object.destroyAll=function(a,d){d=d||{};var e=function(a){a.trigger("destroy",a,a.collection,d)},f=[],g=function(a){var g=b.Promise.as();return a.length>0&&(g=g.then(function(){return b._request({route:"batch",method:"POST",useMasterKey:d.useMasterKey,sessionToken:d.sessionToken,data:{requests:c.map(a,function(a){return{method:"DELETE",path:"/1/classes/"+a.className+"/"+a.id}})}})}).then(function(c,g,h){b._arrayEach(a,function(a,g){if(c[g].success&&d.wait)e(a);else if(c[g].error){var h=new b.Error(c[g].error.code,c[g].error.error);h.object=a,f.push(h)}})})),g},h=b.Promise.as(),i=[];return b._arrayEach(a,function(b,c){if(b.id&&d.wait||e(b),b.id&&i.push(b),20===i.length||c+1===a.length){var f=i;i=[],h=h.then(function(){return g(f)})}}),h.then(function(){if(0===f.length)return!0;var a=new b.Error(b.Error.AGGREGATE_ERROR,"Error deleting an object in destroyAll");return a.errors=f,b.Promise.error(a)})._thenRunCallbacks(d)},b.Object.fetchAll=function(a,c){return b.Object._fetchAll(a,!0)._thenRunCallbacks(c)},b.Object.fetchAllIfNeeded=function(a,c){return b.Object._fetchAll(a,!1)._thenRunCallbacks(c)},c.extend(b.Object.prototype,b.Events,{_existed:!1,initialize:function(){},toJSON:function(){var a=this._toFullJSON();return b._arrayEach(["__type","className"],function(b){delete a[b]}),a},_toFullJSON:function(a){var d=c.clone(this.attributes);return b._objectEach(d,function(c,e){d[e]=b._encode(c,a)}),b._objectEach(this._operations,function(a,b){d[b]=a}),c.has(this,"id")&&(d.objectId=this.id),c.has(this,"createdAt")&&(c.isDate(this.createdAt)?d.createdAt=this.createdAt.toJSON():d.createdAt=this.createdAt),c.has(this,"updatedAt")&&(c.isDate(this.updatedAt)?d.updatedAt=this.updatedAt.toJSON():d.updatedAt=this.updatedAt),d.__type="Object",d.className=this.className,d},_refreshCache:function(){var a=this;a._refreshingCache||(a._refreshingCache=!0,b._objectEach(this.attributes,function(d,e){if(d instanceof b.Object)d._refreshCache();else if(c.isObject(d)){var f=!1;c.isArray(d)&&c.each(d,function(a){a instanceof b.Object&&(f=!0,a._refreshCache())}),!f&&a._resetCacheForKey(e)&&a.set(e,new b.Op.Set(d),{silent:!0})}}),delete a._refreshingCache)},dirty:function(a){this._refreshCache();var b=c.last(this._opSetQueue);return a?b[a]?!0:!1:this.id?c.keys(b).length>0?!0:!1:!0},dirtyKeys:function(){return c.keys(c.last(this._opSetQueue))},_toPointer:function(){if(!this.id)throw new Error("Can't serialize an unsaved Parse.Object");return{__type:"Pointer",className:this.className,objectId:this.id}},get:function(a){return this.attributes[a]},relation:function(a){var c=this.get(a);if(c){if(!(c instanceof b.Relation))throw"Called relation() on non-relation field "+a;return c._ensureParentAndKey(this,a),c}return new b.Relation(this,a)},escape:function(a){var d=this._escapedAttributes[a];if(d)return d;var e,f=this.attributes[a];return e=b._isNullOrUndefined(f)?"":c.escape(f.toString()),this._escapedAttributes[a]=e,e},has:function(a){return!b._isNullOrUndefined(this.attributes[a])},_mergeMagicFields:function(a){var d=this,e=["id","objectId","createdAt","updatedAt"];b._arrayEach(e,function(e){a[e]&&("objectId"===e?d.id=a[e]:"createdAt"!==e&&"updatedAt"!==e||c.isDate(a[e])?d[e]=a[e]:d[e]=b._parseDate(a[e]),delete a[e])})},_copyServerData:function(a){var c={};b._objectEach(a,function(a,d){c[d]=b._decode(d,a)}),this._serverData=c,this._rebuildAllEstimatedData(),this._refreshCache(),this._opSetQueue=[{}],this._rebuildAllEstimatedData()},_mergeFromObject:function(a){a&&(this.id=a.id,this.createdAt=a.createdAt,this.updatedAt=a.updatedAt,this._copyServerData(a._serverData),this._hasData=!0)},_startSave:function(){this._opSetQueue.push({})},_cancelSave:function(){var a=c.first(this._opSetQueue);this._opSetQueue=c.rest(this._opSetQueue);var d=c.first(this._opSetQueue);b._objectEach(a,function(b,c){var e=a[c],f=d[c];e&&f?d[c]=f._mergeWithPrevious(e):e&&(d[c]=e)}),this._saving=this._saving-1},_finishSave:function(a){var d={};b._traverse(this.attributes,function(a){a instanceof b.Object&&a.id&&a._hasData&&(d[a.id]=a)});var e=c.first(this._opSetQueue);this._opSetQueue=c.rest(this._opSetQueue),this._applyOpSet(e,this._serverData),this._mergeMagicFields(a);var f=this;b._objectEach(a,function(a,c){f._serverData[c]=b._decode(c,a);var e=b._traverse(f._serverData[c],function(a){return a instanceof b.Object&&d[a.id]?d[a.id]:void 0});e&&(f._serverData[c]=e)}),this._rebuildAllEstimatedData(),this._saving=this._saving-1},_finishFetch:function(a,b){this._opSetQueue=[{}],this._mergeMagicFields(a),this._copyServerData(a),this._hasData=b},_applyOpSet:function(a,c){var d=this;b._objectEach(a,function(a,e){c[e]=a._estimate(c[e],d,e),c[e]===b.Op._UNSET&&delete c[e]})},_resetCacheForKey:function(a){var d=this.attributes[a];if(!(!c.isObject(d)||d instanceof b.Object||d instanceof b.File)){d=d.toJSON?d.toJSON():d;var e=JSON.stringify(d);if(this._hashedJSON[a]!==e){var f=!!this._hashedJSON[a];return this._hashedJSON[a]=e,f}}return!1},_rebuildEstimatedDataForKey:function(a){var c=this;delete this.attributes[a],this._serverData[a]&&(this.attributes[a]=this._serverData[a]),b._arrayEach(this._opSetQueue,function(d){var e=d[a];e&&(c.attributes[a]=e._estimate(c.attributes[a],c,a),c.attributes[a]===b.Op._UNSET?delete c.attributes[a]:c._resetCacheForKey(a))})},_rebuildAllEstimatedData:function(){var a=this,d=c.clone(this.attributes);this.attributes=c.clone(this._serverData),b._arrayEach(this._opSetQueue,function(c){a._applyOpSet(c,a.attributes),b._objectEach(c,function(b,c){a._resetCacheForKey(c)})}),b._objectEach(d,function(b,c){a.attributes[c]!==b&&a.trigger("change:"+c,a,a.attributes[c],{})}),b._objectEach(this.attributes,function(b,e){c.has(d,e)||a.trigger("change:"+e,a,b,{})})},set:function(a,d,e){var f;if(c.isObject(a)||b._isNullOrUndefined(a)?(f=a,b._objectEach(f,function(a,c){f[c]=b._decode(c,a)}),e=d):(f={},f[a]=b._decode(a,d)),e=e||{},!f)return this;f instanceof b.Object&&(f=f.attributes);var g=this;b._objectEach(f,function(a,b){if(g.constructor.readOnlyAttributes&&g.constructor.readOnlyAttributes[b])throw new Error("Cannot modify readonly key: "+b)}),e.unset&&b._objectEach(f,function(a,c){f[c]=new b.Op.Unset});var h=c.clone(f);if(b._objectEach(h,function(a,c){a instanceof b.Op&&(h[c]=a._estimate(g.attributes[c],g,c),h[c]===b.Op._UNSET&&delete h[c])}),!this._validate(f,e))return!1;this._mergeMagicFields(f),e.changes={};var i=this._escapedAttributes;this._previousAttributes||{};return b._arrayEach(c.keys(f),function(a){var d=f[a];d instanceof b.Relation&&(d.parent=g),d instanceof b.Op||(d=new b.Op.Set(d));var h=!0;d instanceof b.Op.Set&&c.isEqual(g.attributes[a],d.value)&&(h=!1),h&&(delete i[a],e.silent?g._silent[a]=!0:e.changes[a]=!0);var j=c.last(g._opSetQueue);j[a]=d._mergeWithPrevious(j[a]),g._rebuildEstimatedDataForKey(a),h?(g.changed[a]=g.attributes[a],e.silent||(g._pending[a]=!0)):(delete g.changed[a],delete g._pending[a])}),e.silent||this.change(e),this},unset:function(a,b){return b=b||{},b.unset=!0,this.set(a,null,b)},increment:function(a,d){return(c.isUndefined(d)||c.isNull(d))&&(d=1),this.set(a,new b.Op.Increment(d))},add:function(a,c){return this.set(a,new b.Op.Add([c]))},addUnique:function(a,c){return this.set(a,new b.Op.AddUnique([c]))},remove:function(a,c){return this.set(a,new b.Op.Remove([c]))},op:function(a){return c.last(this._opSetQueue)[a]},clear:function(a){a=a||{},a.unset=!0;var b=c.extend(this.attributes,this._operations);return this.set(b,a)},_getSaveJSON:function(){var a=c.clone(c.first(this._opSetQueue));return b._objectEach(a,function(b,c){a[c]=b.toJSON()}),a},_canBeSerialized:function(){return b.Object._canBeSerializedAsValue(this.attributes)},fetch:function(a){var c=this;a=a||{};var d=b._request({method:"GET",route:"classes",className:this.className,objectId:this.id,useMasterKey:a.useMasterKey,sessionToken:a.sessionToken});return d.then(function(a,b,d){return c._finishFetch(c.parse(a,b,d),!0),c})._thenRunCallbacks(a,this)},save:function(a,d,e){var f,g,h;if(c.isObject(a)||b._isNullOrUndefined(a)?(f=a,h=d):(f={},f[a]=d,h=e),!h&&f){var i=c.reject(f,function(a,b){return c.include(["success","error","wait"],b)});if(0===i.length){var j=!0;if(c.has(f,"success")&&!c.isFunction(f.success)&&(j=!1),c.has(f,"error")&&!c.isFunction(f.error)&&(j=!1),j)return this.save(null,f)}}h=c.clone(h)||{},h.wait&&(g=c.clone(this.attributes));var k=c.clone(h)||{};k.wait&&(k.silent=!0);var l;if(k.error=function(a,b){l=b},f&&!this.set(f,k))return b.Promise.error(l)._thenRunCallbacks(h,this);var m=this;m._refreshCache();var n=[],o=[];return b.Object._findUnsavedChildren(m.attributes,n,o),n.length+o.length>0?b.Object._deepSaveAsync(this.attributes,{useMasterKey:h.useMasterKey,sessionToken:h.sessionToken}).then(function(){return m.save(null,h)},function(a){return b.Promise.error(a)._thenRunCallbacks(h,m)}):(this._startSave(),this._saving=(this._saving||0)+1,this._allPreviousSaves=this._allPreviousSaves||b.Promise.as(),this._allPreviousSaves=this._allPreviousSaves._continueWith(function(){var a=m.id?"PUT":"POST",d=m._getSaveJSON(),e="classes",i=m.className;"_User"!==m.className||m.id||(e="users",i=null);var j=b._request({route:e,className:i,objectId:m.id,method:a,useMasterKey:h.useMasterKey,sessionToken:h.sessionToken,data:d});return j=j.then(function(a,b,d){var e=m.parse(a,b,d);return h.wait&&(e=c.extend(f||{},e)),m._finishSave(e),h.wait&&m.set(g,k),m},function(a){return m._cancelSave(),b.Promise.error(a)})._thenRunCallbacks(h,m)}),this._allPreviousSaves)},destroy:function(a){a=a||{};var c=this,d=function(){c.trigger("destroy",c,c.collection,a)};if(!this.id)return d();a.wait||d();var e=b._request({route:"classes",className:this.className,objectId:this.id,method:"DELETE",useMasterKey:a.useMasterKey,sessionToken:a.sessionToken});return e.then(function(){return a.wait&&d(),c})._thenRunCallbacks(a,this)},parse:function(a,d,e){var f=c.clone(a);return c(["createdAt","updatedAt"]).each(function(a){f[a]&&(f[a]=b._parseDate(f[a]))}),f.updatedAt||(f.updatedAt=f.createdAt),d&&(this._existed=201!==d),f},clone:function(){return new this.constructor(this.attributes)},isNew:function(){return!this.id},change:function(a){a=a||{};var d=this._changing;this._changing=!0;var e=this;b._objectEach(this._silent,function(a){e._pending[a]=!0});var f=c.extend({},a.changes,this._silent);if(this._silent={},b._objectEach(f,function(b,c){e.trigger("change:"+c,e,e.get(c),a)}),d)return this;for(var g=function(a,b){e._pending[b]||e._silent[b]||delete e.changed[b]};!c.isEmpty(this._pending);)this._pending={},this.trigger("change",this,a),b._objectEach(this.changed,g),e._previousAttributes=c.clone(this.attributes);return this._changing=!1,this},existed:function(){return this._existed},hasChanged:function(a){return arguments.length?this.changed&&c.has(this.changed,a):!c.isEmpty(this.changed)},changedAttributes:function(a){if(!a)return this.hasChanged()?c.clone(this.changed):!1;var d={},e=this._previousAttributes;return b._objectEach(a,function(a,b){c.isEqual(e[b],a)||(d[b]=a)}),d},previous:function(a){return arguments.length&&this._previousAttributes?this._previousAttributes[a]:null},previousAttributes:function(){return c.clone(this._previousAttributes)},isValid:function(){return!this.validate(this.attributes)},validate:function(a,d){if(c.has(a,"ACL")&&!(a.ACL instanceof b.ACL))return new b.Error(b.Error.OTHER_CAUSE,"ACL must be a Parse.ACL.");var e=!0;return b._objectEach(a,function(a,b){/^[A-Za-z][0-9A-Za-z_]*$/.test(b)||(e=!1)}),e?!1:new b.Error(b.Error.INVALID_KEY_NAME)},_validate:function(a,b){if(b.silent||!this.validate)return!0;a=c.extend({},this.attributes,a);var d=this.validate(a,b);return d?(b&&b.error?b.error(this,d,b):this.trigger("error",this,d,b),!1):!0},getACL:function(){return this.get("ACL")},setACL:function(a,b){return this.set("ACL",a,b)}}),b.Object._getSubclass=function(a){if(!c.isString(a))throw"Parse.Object._getSubclass requires a string argument.";var d=b.Object._classMap[a];return d||(d=b.Object.extend(a),b.Object._classMap[a]=d),d},b.Object._create=function(a,c,d){var e=b.Object._getSubclass(a);return new e(c,d)},b.Object._toObjectIdArray=function(a,c){if(0===a.length)return b.Promise.as(a);for(var d,e=a[0].className,f=[],g=0;g<a.length;g++){var h=a[g];if(e!==h.className)return d=new b.Error(b.Error.INVALID_CLASS_NAME,"All objects should be of the same class"),b.Promise.error(d);if(!h.id)return d=new b.Error(b.Error.MISSING_OBJECT_ID,"All objects must have an ID"),b.Promise.error(d);c&&h._hasData||f.push(h.id)}return b.Promise.as(f)},b.Object._updateWithFetchedResults=function(a,c,d){var e={};b._arrayEach(c,function(a,b){e[a.id]=a});for(var f=0;f<a.length;f++){var g=a[f],h=e[g.id];if(!h&&d){var i=new b.Error(b.Error.OBJECT_NOT_FOUND,"All objects must exist on the server");return b.Promise.error(i)}g._mergeFromObject(h)}return b.Promise.as(a)},b.Object._fetchAll=function(a,c){if(0===a.length)return b.Promise.as(a);var d=!c;return b.Object._toObjectIdArray(a,d).then(function(c){var d=a[0].className,e=new b.Query(d);return e.containedIn("objectId",c),e.limit=c.length,e.find()}).then(function(d){return b.Object._updateWithFetchedResults(a,d,c)})},b.Object._classMap={},b.Object._extend=b._extend,b.Object.extend=function(a,d,e){if(!c.isString(a)){if(a&&c.has(a,"className"))return b.Object.extend(a.className,a,d);throw new Error("Parse.Object.extend's first argument should be the className.")}"User"===a&&b.User._performUserRewrite&&(a="_User"),d=d||{},d.className=a;var f=null;if(c.has(b.Object._classMap,a)){var g=b.Object._classMap[a];f=g._extend(d,e)}else f=this._extend(d,e);return f.extend=function(d){if(c.isString(d)||d&&c.has(d,"className"))return b.Object.extend.apply(f,arguments);var e=[a].concat(b._.toArray(arguments));return b.Object.extend.apply(f,e)},f.createWithoutData=function(a){var b=new f;return b.id=a,b},b.Object._classMap[a]=f,f},b.Object._findUnsavedChildren=function(a,c,d){b._traverse(a,function(a){return a instanceof b.Object?(a._refreshCache(),void(a.dirty()&&c.push(a))):a instanceof b.File?void(a.url()||d.push(a)):void 0})},b.Object._canBeSerializedAsValue=function(a){if(a instanceof b.Object)return!!a.id;if(a instanceof b.File)return!0;var d=!0;return c.isArray(a)?b._arrayEach(a,function(a){b.Object._canBeSerializedAsValue(a)||(d=!1)}):c.isObject(a)&&b._objectEach(a,function(a){b.Object._canBeSerializedAsValue(a)||(d=!1)}),d},b.Object._deepSaveAsync=function(a,d){var e=[],f=[];b.Object._findUnsavedChildren(a,e,f);var g=b.Promise.as();c.each(f,function(a){g=g.then(function(){return a.save(d)})});var h=c.uniq(e),i=c.uniq(h);return g.then(function(){return b.Promise._continueWhile(function(){return i.length>0},function(){var a=[],e=[];if(b._arrayEach(i,function(b){return a.length>20?void e.push(b):void(b._canBeSerialized()?a.push(b):e.push(b))}),i=e,0===a.length)return b.Promise.error(new b.Error(b.Error.OTHER_CAUSE,"Tried to save a batch with a cycle."));var f=b.Promise.when(c.map(a,function(a){return a._allPreviousSaves||b.Promise.as()})),g=new b.Promise;return b._arrayEach(a,function(a){a._allPreviousSaves=g}),f._continueWith(function(){return b._request({route:"batch",method:"POST",useMasterKey:d.useMasterKey,sessionToken:d.sessionToken,data:{requests:c.map(a,function(a){var b=a._getSaveJSON(),c="POST",d="/1/classes/"+a.className;return a.id&&(d=d+"/"+a.id,c="PUT"),a._startSave(),{method:c,path:d,body:b}})}}).then(function(c,d,e){var f;return b._arrayEach(a,function(a,b){c[b].success?a._finishSave(a.parse(c[b].success,d,e)):(f=f||c[b].error,a._cancelSave())}),f?b.Promise.error(new b.Error(f.code,f.error)):void 0}).then(function(a){return g.resolve(a),a},function(a){return g.reject(a),b.Promise.error(a)})})})}).then(function(){return a})}}(this),function(a){a.Parse=a.Parse||{};var b=a.Parse,c=b._;b.Role=b.Object.extend("_Role",{constructor:function(a,d){c.isString(a)&&d instanceof b.ACL?(b.Object.prototype.constructor.call(this,null,null),this.setName(a),this.setACL(d)):b.Object.prototype.constructor.call(this,a,d)},getName:function(){return this.get("name")},setName:function(a,b){return this.set("name",a,b)},getUsers:function(){return this.relation("users")},getRoles:function(){return this.relation("roles")},validate:function(a,d){if("name"in a&&a.name!==this.getName()){var e=a.name;if(this.id&&this.id!==a.objectId)return new b.Error(b.Error.OTHER_CAUSE,"A role's name can only be set before it has been saved.");if(!c.isString(e))return new b.Error(b.Error.OTHER_CAUSE,"A role's name must be a String.");if(!/^[0-9a-zA-Z\-_ ]+$/.test(e))return new b.Error(b.Error.OTHER_CAUSE,"A role's name can only contain alphanumeric characters, _, -, and spaces.")}return b.Object.prototype.validate?b.Object.prototype.validate.call(this,a,d):!1}})}(this),function(a){a.Parse=a.Parse||{};var b=a.Parse,c=b._;b.Collection=function(a,b){b=b||{},b.comparator&&(this.comparator=b.comparator),b.model&&(this.model=b.model),b.query&&(this.query=b.query),this._reset(),this.initialize.apply(this,arguments),a&&this.reset(a,{silent:!0,parse:b.parse})},c.extend(b.Collection.prototype,b.Events,{model:b.Object,initialize:function(){},toJSON:function(){return this.map(function(a){return a.toJSON()})},add:function(a,d){var e,f,g,h,i,j,k={},l={};for(d=d||{},a=c.isArray(a)?a.slice():[a],e=0,g=a.length;g>e;e++){if(a[e]=this._prepareModel(a[e],d),h=a[e],!h)throw new Error("Can't add an invalid model to a collection");if(i=h.cid,k[i]||this._byCid[i])throw new Error("Duplicate cid: can't add the same model to a collection twice");if(j=h.id,!b._isNullOrUndefined(j)&&(l[j]||this._byId[j]))throw new Error("Duplicate id: can't add the same model to a collection twice");l[j]=h,k[i]=h}for(e=0;g>e;e++)(h=a[e]).on("all",this._onModelEvent,this),this._byCid[h.cid]=h,h.id&&(this._byId[h.id]=h);if(this.length+=g,f=b._isNullOrUndefined(d.at)?this.models.length:d.at,this.models.splice.apply(this.models,[f,0].concat(a)),this.comparator&&this.sort({silent:!0}),d.silent)return this;for(e=0,g=this.models.length;g>e;e++)h=this.models[e],k[h.cid]&&(d.index=e,h.trigger("add",h,this,d));return this},remove:function(a,b){var d,e,f,g;for(b=b||{},a=c.isArray(a)?a.slice():[a],d=0,e=a.length;e>d;d++)g=this.getByCid(a[d])||this.get(a[d]),g&&(delete this._byId[g.id],delete this._byCid[g.cid],f=this.indexOf(g),this.models.splice(f,1),this.length--,b.silent||(b.index=f,g.trigger("remove",g,this,b)),this._removeReference(g));return this},get:function(a){return a&&this._byId[a.id||a]},getByCid:function(a){return a&&this._byCid[a.cid||a]},at:function(a){return this.models[a]},sort:function(a){if(a=a||{},!this.comparator)throw new Error("Cannot sort a set without a comparator");
var b=c.bind(this.comparator,this);return 1===this.comparator.length?this.models=this.sortBy(b):this.models.sort(b),a.silent||this.trigger("reset",this,a),this},pluck:function(a){return c.map(this.models,function(b){return b.get(a)})},reset:function(a,c){var d=this;return a=a||[],c=c||{},b._arrayEach(this.models,function(a){d._removeReference(a)}),this._reset(),this.add(a,{silent:!0,parse:c.parse}),c.silent||this.trigger("reset",this,c),this},fetch:function(a){a=c.clone(a)||{},void 0===a.parse&&(a.parse=!0);var d=this,e=this.query||new b.Query(this.model);return e.find({useMasterKey:a.useMasterKey,sessionToken:a.sessionToken}).then(function(b){return a.add?d.add(b,a):d.reset(b,a),d})._thenRunCallbacks(a,this)},create:function(a,b){var d=this;if(b=b?c.clone(b):{},a=this._prepareModel(a,b),!a)return!1;b.wait||d.add(a,b);var e=b.success;return b.success=function(c,f,g){b.wait&&d.add(c,b),e?e(c,f):c.trigger("sync",a,f,b)},a.save(null,b),a},parse:function(a,b){return a},chain:function(){return c(this.models).chain()},_reset:function(a){this.length=0,this.models=[],this._byId={},this._byCid={}},_prepareModel:function(a,c){if(a instanceof b.Object)a.collection||(a.collection=this);else{var d=a;c.collection=this,a=new this.model(d,c),a._validate(a.attributes,c)||(a=!1)}return a},_removeReference:function(a){this===a.collection&&delete a.collection,a.off("all",this._onModelEvent,this)},_onModelEvent:function(a,b,c,d){("add"!==a&&"remove"!==a||c===this)&&("destroy"===a&&this.remove(b,d),b&&"change:objectId"===a&&(delete this._byId[b.previous("objectId")],this._byId[b.id]=b),this.trigger.apply(this,arguments))}});var d=["forEach","each","map","reduce","reduceRight","find","detect","filter","select","reject","every","all","some","any","include","contains","invoke","max","min","sortBy","sortedIndex","toArray","size","first","initial","rest","last","without","indexOf","shuffle","lastIndexOf","isEmpty","groupBy"];b._arrayEach(d,function(a){b.Collection.prototype[a]=function(){return c[a].apply(c,[this.models].concat(c.toArray(arguments)))}}),b.Collection.extend=b._extend}(this),function(a){a.Parse=a.Parse||{};var b=a.Parse,c=b._;b.View=function(a){this.cid=c.uniqueId("view"),this._configure(a||{}),this._ensureElement(),this.initialize.apply(this,arguments),this.delegateEvents()};var d=/^(\S+)\s*(.*)$/,e=["model","collection","el","id","attributes","className","tagName"];c.extend(b.View.prototype,b.Events,{tagName:"div",$:function(a){return this.$el.find(a)},initialize:function(){},render:function(){return this},remove:function(){return this.$el.remove(),this},make:function(a,c,d){var e=document.createElement(a);return c&&b.$(e).attr(c),d&&b.$(e).html(d),e},setElement:function(a,c){return this.$el=b.$(a),this.el=this.$el[0],c!==!1&&this.delegateEvents(),this},delegateEvents:function(a){if(a=a||b._getValue(this,"events")){this.undelegateEvents();var e=this;b._objectEach(a,function(b,f){if(c.isFunction(b)||(b=e[a[f]]),!b)throw new Error('Event "'+a[f]+'" does not exist');var g=f.match(d),h=g[1],i=g[2];b=c.bind(b,e),h+=".delegateEvents"+e.cid,""===i?e.$el.bind(h,b):e.$el.delegate(i,h,b)})}},undelegateEvents:function(){this.$el.unbind(".delegateEvents"+this.cid)},_configure:function(a){this.options&&(a=c.extend({},this.options,a));var b=this;c.each(e,function(c){a[c]&&(b[c]=a[c])}),this.options=a},_ensureElement:function(){if(this.el)this.setElement(this.el,!1);else{var a=b._getValue(this,"attributes")||{};this.id&&(a.id=this.id),this.className&&(a["class"]=this.className),this.setElement(this.make(this.tagName,a),!1)}}}),b.View.extend=b._extend}(this),function(a){a.Parse=a.Parse||{};var b=a.Parse,c=b._;b.User=b.Object.extend("_User",{_isCurrentUser:!1,_mergeFromObject:function(a){a.getSessionToken()&&(this._sessionToken=a.getSessionToken()),b.User.__super__._mergeFromObject.call(this,a)},_mergeMagicFields:function(a){a.sessionToken&&(this._sessionToken=a.sessionToken,delete a.sessionToken),b.User.__super__._mergeMagicFields.call(this,a)},_cleanupAuthData:function(){if(this.isCurrent()){var a=this.get("authData");a&&b._objectEach(this.get("authData"),function(b,c){a[c]||delete a[c]})}},_synchronizeAllAuthData:function(){var a=this.get("authData");if(a){var c=this;b._objectEach(this.get("authData"),function(a,b){c._synchronizeAuthData(b)})}},_synchronizeAuthData:function(a){if(this.isCurrent()){var d;c.isString(a)?(d=a,a=b.User._authProviders[d]):d=a.getAuthType();var e=this.get("authData");if(e&&a){var f=a.restoreAuthentication(e[d]);f||this._unlinkFrom(a)}}},_handleSaveResult:function(a){a&&(this._isCurrentUser=!0),this._cleanupAuthData(),this._synchronizeAllAuthData(),delete this._serverData.password,this._rebuildEstimatedDataForKey("password"),this._refreshCache(),(a||this.isCurrent())&&b.User._saveCurrentUser(this)},_linkWith:function(a,d){var e;if(c.isString(a)?(e=a,a=b.User._authProviders[a]):e=a.getAuthType(),c.has(d,"authData")){var f=this.get("authData")||{};f[e]=d.authData,this.set("authData",f);var g=c.clone(d)||{};return g.success=function(a){a._handleSaveResult(!0),d.success&&d.success.apply(this,arguments)},this.save({authData:f},g)}var h=this,i=new b.Promise;return a.authenticate({success:function(a,b){h._linkWith(a,{authData:b,success:d.success,error:d.error}).then(function(){i.resolve(h)})},error:function(a,b){d.error&&d.error(h,b),i.reject(b)}}),i},_unlinkFrom:function(a,d){var e;c.isString(a)?(e=a,a=b.User._authProviders[a]):e=a.getAuthType();var f=c.clone(d),g=this;return f.authData=null,f.success=function(b){g._synchronizeAuthData(a),d.success&&d.success.apply(this,arguments)},this._linkWith(a,f)},_isLinked:function(a){var b;b=c.isString(a)?a:a.getAuthType();var d=this.get("authData")||{};return!!d[b]},_logOutWithAll:function(){var a=this.get("authData");if(a){var c=this;b._objectEach(this.get("authData"),function(a,b){c._logOutWith(b)})}},_logOutWith:function(a){this.isCurrent()&&(c.isString(a)&&(a=b.User._authProviders[a]),a&&a.deauthenticate&&a.deauthenticate())},signUp:function(a,d){var e;d=d||{};var f=a&&a.username||this.get("username");if(!f||""===f)return e=new b.Error(b.Error.OTHER_CAUSE,"Cannot sign up user with an empty name."),d&&d.error&&d.error(this,e),b.Promise.error(e);var g=a&&a.password||this.get("password");if(!g||""===g)return e=new b.Error(b.Error.OTHER_CAUSE,"Cannot sign up user with an empty password."),d&&d.error&&d.error(this,e),b.Promise.error(e);var h=c.clone(d);return h.success=function(a){a._handleSaveResult(b.User._canUseCurrentUser()),d.success&&d.success.apply(this,arguments)},this.save(a,h)},logIn:function(a){if(!b.User._canUseCurrentUser())throw new Error("It is not possible to log in on a server environment.");var c=this;a=a||{};var d=b._request({route:"login",method:"GET",useMasterKey:a.useMasterKey,data:this.toJSON()});return d.then(function(a,b,d){var e=c.parse(a,b,d);return c._finishFetch(e),c._handleSaveResult(!0),c})._thenRunCallbacks(a,this)},save:function(a,d,e){var f,g;c.isObject(a)||c.isNull(a)||c.isUndefined(a)?(f=a,g=d):(f={},f[a]=d,g=e),g=g||{};var h=c.clone(g);return h.success=function(a){a._handleSaveResult(!1),g.success&&g.success.apply(this,arguments)},b.Object.prototype.save.call(this,f,h)},fetch:function(a){var d=a?c.clone(a):{};return d.success=function(b){b._handleSaveResult(!1),a&&a.success&&a.success.apply(this,arguments)},b.Object.prototype.fetch.call(this,d)},isCurrent:function(){return this._isCurrentUser},getUsername:function(){return this.get("username")},setUsername:function(a,b){return this.set("username",a,b)},setPassword:function(a,b){return this.set("password",a,b)},getEmail:function(){return this.get("email")},setEmail:function(a,b){return this.set("email",a,b)},authenticated:function(){return!!this._sessionToken&&b.User.current()&&b.User.current().id===this.id},getSessionToken:function(){return this._sessionToken},_upgradeToRevocableSession:function(a){if(a=a||{},!b.User.current())return b.Promise.as()._thenRunCallbacks(a);var c=b.User.current().getSessionToken();return b.Session._isRevocable(c)?b.Promise.as()._thenRunCallbacks(a):b._request({route:"upgradeToRevocableSession",method:"POST",useMasterKey:a.useMasterKey,sessionToken:c}).then(function(a){var c=new b.Session;c._finishFetch(a);var d=b.User.current();d._sessionToken=c.getSessionToken(),b.User._saveCurrentUser(d)})._thenRunCallbacks(a)}},{_currentUser:null,_currentUserMatchesDisk:!1,_CURRENT_USER_KEY:"currentUser",_authProviders:{},_performUserRewrite:!0,_isRevocableSessionEnabled:!1,_enableUnsafeCurrentUser:!1,signUp:function(a,c,d,e){d=d||{},d.username=a,d.password=c;var f=b.Object._create("_User");return f.signUp(d,e)},logIn:function(a,c,d){var e=b.Object._create("_User");return e._finishFetch({username:a,password:c}),e.logIn(d)},become:function(a,c){if(!b.User._canUseCurrentUser())throw new Error("It is not secure to become a user on a node.js server environment.");c=c||{};var d=b.Object._create("_User");return b._request({route:"users",className:"me",method:"GET",useMasterKey:c.useMasterKey,sessionToken:a}).then(function(a,b,c){var e=d.parse(a,b,c);return d._finishFetch(e),d._handleSaveResult(!0),d})._thenRunCallbacks(c,d)},logOut:function(){if(!b.User._canUseCurrentUser())throw new Error("There is no current user user on a node.js server environment.");return b.User._currentAsync().then(function(a){var c=b.Storage.removeItemAsync(b._getParsePath(b.User._CURRENT_USER_KEY));if(null!==a){var d=a.getSessionToken();b.Session._isRevocable(d)&&c.then(function(){return b._request({route:"logout",method:"POST",sessionToken:d})}),a._logOutWithAll(),a._isCurrentUser=!1}return b.User._currentUserMatchesDisk=!0,b.User._currentUser=null,c})},requestPasswordReset:function(a,c){c=c||{};var d=b._request({route:"requestPasswordReset",method:"POST",useMasterKey:c.useMasterKey,data:{email:a}});return d._thenRunCallbacks(c)},current:function(){if(!b.User._canUseCurrentUser())throw new Error("There is no current user user on a node.js server environment.");if(b.Storage.async)return b.User._currentAsync(),b.User._currentUser;if(b.User._currentUser)return b.User._currentUser;if(b.User._currentUserMatchesDisk)return b.User._currentUser;b.User._currentUserMatchesDisk=!0;var a=b.Storage.getItem(b._getParsePath(b.User._CURRENT_USER_KEY));if(!a)return null;b.User._currentUser=b.Object._create("_User"),b.User._currentUser._isCurrentUser=!0;var c=JSON.parse(a);return b.User._currentUser.id=c._id,delete c._id,b.User._currentUser._sessionToken=c._sessionToken,delete c._sessionToken,b.User._currentUser._finishFetch(c),b.User._currentUser._synchronizeAllAuthData(),b.User._currentUser._refreshCache(),b.User._currentUser._opSetQueue=[{}],b.User._currentUser},_currentAsync:function(){return b.User._currentUser?b.Promise.as(b.User._currentUser):b.User._currentUserMatchesDisk?b.Promise.as(b.User._currentUser):b.Storage.getItemAsync(b._getParsePath(b.User._CURRENT_USER_KEY)).then(function(a){if(!a)return null;b.User._currentUser=b.Object._create("_User"),b.User._currentUser._isCurrentUser=!0;var c=JSON.parse(a);return b.User._currentUser.id=c._id,delete c._id,b.User._currentUser._sessionToken=c._sessionToken,delete c._sessionToken,b.User._currentUser._finishFetch(c),b.User._currentUser._synchronizeAllAuthData(),b.User._currentUser._refreshCache(),b.User._currentUser._opSetQueue=[{}],b.User._currentUser})},allowCustomUserClass:function(a){this._performUserRewrite=!a},enableRevocableSession:function(a){return a=a||{},b.User._isRevocableSessionEnabled=!0,b.User._canUseCurrentUser()&&b.User.current()?b.User.current()._upgradeToRevocableSession(a):b.Promise.as()._thenRunCallbacks(a)},enableUnsafeCurrentUser:function(){b.User._enableUnsafeCurrentUser=!0},_canUseCurrentUser:function(){return!b._isNode||b.User._enableUnsafeCurrentUser},_saveCurrentUser:function(a){null!==b.User._currentUser&&b.User._currentUser!==a&&b.User.logOut(),a._isCurrentUser=!0,b.User._currentUser=a,b.User._currentUserMatchesDisk=!0;var c=a.toJSON();c._id=a.id,c._sessionToken=a._sessionToken,b.Storage.async?b.Storage.setItemAsync(b._getParsePath(b.User._CURRENT_USER_KEY),JSON.stringify(c)):b.Storage.setItem(b._getParsePath(b.User._CURRENT_USER_KEY),JSON.stringify(c))},_registerAuthenticationProvider:function(a){b.User._authProviders[a.getAuthType()]=a,b.User.current()&&b.User.current()._synchronizeAuthData(a.getAuthType())},_logInWith:function(a,c){var d=b.Object._create("_User");return d._linkWith(a,c)}})}(this),function(a){a.Parse=a.Parse||{};var b=a.Parse;b.Session=b.Object.extend("_Session",{getSessionToken:function(){return this._sessionToken},_mergeMagicFields:function(a){a.sessionToken&&(this._sessionToken=a.sessionToken,delete a.sessionToken),b.Session.__super__._mergeMagicFields.call(this,a)}},{readOnlyAttributes:{createdWith:!0,expiresAt:!0,installationId:!0,restricted:!0,sessionToken:!0,user:!0},current:function(a){a=a||{};var c=b.Object._create("_Session"),d=b.User.current().getSessionToken();return b._request({route:"sessions",className:"me",method:"GET",useMasterKey:a.useMasterKey,sessionToken:d}).then(function(a,b,d){var e=c.parse(a,b,d);return c._finishFetch(e),c})._thenRunCallbacks(a,c)},_isRevocable:function(a){return a.indexOf("r:")>-1},isCurrentSessionRevocable:function(){return null!==b.User.current()?b.Session._isRevocable(b.User.current().getSessionToken()):void 0}})}(this),function(a){a.Parse=a.Parse||{};var b=a.Parse,c=b._;b.Query=function(a){c.isString(a)&&(a=b.Object._getSubclass(a)),this.objectClass=a,this.className=a.prototype.className,this._where={},this._include=[],this._limit=-1,this._skip=0,this._extraOptions={}},b.Query.or=function(){var a=c.toArray(arguments),d=null;b._arrayEach(a,function(a){if(c.isNull(d)&&(d=a.className),d!==a.className)throw"All queries must be for the same class"});var e=new b.Query(d);return e._orQuery(a),e},b.Query.prototype={get:function(a,d){var e=this;e.equalTo("objectId",a);var f={};return d&&c.has(d,"useMasterKey")&&(f={useMasterKey:d.useMasterKey}),d&&c.has(d,"sessionToken")&&(f.sessionToken=d.sessionToken),e.first(f).then(function(a){if(a)return a;var c=new b.Error(b.Error.OBJECT_NOT_FOUND,"Object not found.");return b.Promise.error(c)})._thenRunCallbacks(d,null)},toJSON:function(){var a={where:this._where};return this._include.length>0&&(a.include=this._include.join(",")),this._select&&(a.keys=this._select.join(",")),this._limit>=0&&(a.limit=this._limit),this._skip>0&&(a.skip=this._skip),void 0!==this._order&&(a.order=this._order.join(",")),b._objectEach(this._extraOptions,function(b,c){a[c]=b}),a},find:function(a){var d=this;a=a||{};var e=b._request({route:"classes",className:this.className,method:"GET",useMasterKey:a.useMasterKey,sessionToken:a.sessionToken,data:this.toJSON()});return e.then(function(a){return c.map(a.results,function(c){var e;return e=a.className?new b.Object(a.className):new d.objectClass,e._finishFetch(c,!0),e})})._thenRunCallbacks(a)},count:function(a){var c=this;a=a||{};var d=this.toJSON();d.limit=0,d.count=1;var e=b._request({route:"classes",className:c.className,method:"GET",useMasterKey:a.useMasterKey,sessionToken:a.sessionToken,data:d});return e.then(function(a){return a.count})._thenRunCallbacks(a)},first:function(a){var d=this;a=a||{};var e=this.toJSON();e.limit=1;var f=b._request({route:"classes",className:this.className,method:"GET",useMasterKey:a.useMasterKey,sessionToken:a.sessionToken,data:e});return f.then(function(a){return c.map(a.results,function(c){var e;return e=a.className?new b.Object(a.className):new d.objectClass,e._finishFetch(c,!0),e})[0]})._thenRunCallbacks(a)},collection:function(a,d){return d=d||{},new b.Collection(a,c.extend(d,{model:this.objectClass,query:this}))},skip:function(a){return this._skip=a,this},limit:function(a){return this._limit=a,this},equalTo:function(a,d){return c.isUndefined(d)?this.doesNotExist(a):(this._where[a]=b._encode(d),this)},_addCondition:function(a,c,d){return this._where[a]||(this._where[a]={}),this._where[a][c]=b._encode(d),this},notEqualTo:function(a,b){return this._addCondition(a,"$ne",b),this},lessThan:function(a,b){return this._addCondition(a,"$lt",b),this},greaterThan:function(a,b){return this._addCondition(a,"$gt",b),this},lessThanOrEqualTo:function(a,b){return this._addCondition(a,"$lte",b),this},greaterThanOrEqualTo:function(a,b){return this._addCondition(a,"$gte",b),this},containedIn:function(a,b){return this._addCondition(a,"$in",b),this},notContainedIn:function(a,b){return this._addCondition(a,"$nin",b),this},containsAll:function(a,b){return this._addCondition(a,"$all",b),this},exists:function(a){return this._addCondition(a,"$exists",!0),this},doesNotExist:function(a){return this._addCondition(a,"$exists",!1),this},matches:function(a,b,c){return this._addCondition(a,"$regex",b),c||(c=""),b.ignoreCase&&(c+="i"),b.multiline&&(c+="m"),c&&c.length&&this._addCondition(a,"$options",c),this},matchesQuery:function(a,b){var c=b.toJSON();return c.className=b.className,this._addCondition(a,"$inQuery",c),this},doesNotMatchQuery:function(a,b){var c=b.toJSON();return c.className=b.className,this._addCondition(a,"$notInQuery",c),this},matchesKeyInQuery:function(a,b,c){var d=c.toJSON();return d.className=c.className,this._addCondition(a,"$select",{key:b,query:d}),this},doesNotMatchKeyInQuery:function(a,b,c){var d=c.toJSON();return d.className=c.className,this._addCondition(a,"$dontSelect",{key:b,query:d}),this},_orQuery:function(a){var b=c.map(a,function(a){return a.toJSON().where});return this._where.$or=b,this},_quote:function(a){return"\\Q"+a.replace("\\E","\\E\\\\E\\Q")+"\\E"},contains:function(a,b){return this._addCondition(a,"$regex",this._quote(b)),this},startsWith:function(a,b){return this._addCondition(a,"$regex","^"+this._quote(b)),this},endsWith:function(a,b){return this._addCondition(a,"$regex",this._quote(b)+"$"),this},ascending:function(){return this._order=[],this.addAscending.apply(this,arguments)},addAscending:function(a){var c=this;return this._order||(this._order=[]),b._arrayEach(arguments,function(a){Array.isArray(a)&&(a=a.join()),c._order=c._order.concat(a.replace(/\s/g,"").split(","))}),this},descending:function(a){return this._order=[],this.addDescending.apply(this,arguments)},addDescending:function(a){var d=this;return this._order||(this._order=[]),b._arrayEach(arguments,function(a){Array.isArray(a)&&(a=a.join()),d._order=d._order.concat(c.map(a.replace(/\s/g,"").split(","),function(a){return"-"+a}))}),this},near:function(a,c){return c instanceof b.GeoPoint||(c=new b.GeoPoint(c)),this._addCondition(a,"$nearSphere",c),this},withinRadians:function(a,b,c){return this.near(a,b),this._addCondition(a,"$maxDistance",c),this},withinMiles:function(a,b,c){return this.withinRadians(a,b,c/3958.8)},withinKilometers:function(a,b,c){return this.withinRadians(a,b,c/6371)},withinGeoBox:function(a,c,d){return c instanceof b.GeoPoint||(c=new b.GeoPoint(c)),d instanceof b.GeoPoint||(d=new b.GeoPoint(d)),this._addCondition(a,"$within",{$box:[c,d]}),this},include:function(){var a=this;return b._arrayEach(arguments,function(b){c.isArray(b)?a._include=a._include.concat(b):a._include.push(b)}),this},select:function(){var a=this;return this._select=this._select||[],b._arrayEach(arguments,function(b){c.isArray(b)?a._select=a._select.concat(b):a._select.push(b)}),this},each:function(a,d){if(d=d||{},this._order||this._skip||this._limit>=0){var e="Cannot iterate on a query with sort, skip, or limit.";return b.Promise.error(e)._thenRunCallbacks(d)}var f=(new b.Promise,new b.Query(this.objectClass));f._limit=d.batchSize||100,f._where=c.clone(this._where),f._include=c.clone(this._include),this._select&&(f._select=c.clone(this._select)),f.ascending("objectId");var g={};c.has(d,"useMasterKey")&&(g.useMasterKey=d.useMasterKey),c.has(d,"sessionToken")&&(g.sessionToken=d.sessionToken);var h=!1;return b.Promise._continueWhile(function(){return!h},function(){return f.find(g).then(function(c){var d=b.Promise.as();return b._.each(c,function(b){d=d.then(function(){return a(b)})}),d.then(function(){c.length>=f._limit?f.greaterThan("objectId",c[c.length-1].id):h=!0})})})._thenRunCallbacks(d)}}}(this),function(a){a.Parse=a.Parse||{};var b,c,d=a.Parse,e=d._,f=!1,g={authenticate:function(a){var c=this;FB.login(function(b){b.authResponse?a.success&&a.success(c,{id:b.authResponse.userID,access_token:b.authResponse.accessToken,expiration_date:new Date(1e3*b.authResponse.expiresIn+(new Date).getTime()).toJSON()}):a.error&&a.error(c,b)},{scope:b})},restoreAuthentication:function(a){if(a){var b={userID:a.id,accessToken:a.access_token,expiresIn:(d._parseDate(a.expiration_date).getTime()-(new Date).getTime())/1e3},f=e.clone(c);f.authResponse=b,f.status=!1;var g=FB.getAuthResponse();g&&g.userID!==b.userID&&FB.logout(),FB.init(f)}return!0},getAuthType:function(){return"facebook"},deauthenticate:function(){this.restoreAuthentication(null)}};d.FacebookUtils={init:function(a){if("undefined"==typeof FB)throw"The Facebook JavaScript SDK must be loaded before calling init.";if(c=e.clone(a)||{},c.status&&"undefined"!=typeof console){var b=console.warn||console.log||function(){};b.call(console,"The 'status' flag passed into FB.init, when set to true, can interfere with Parse Facebook integration, so it has been suppressed. Please call FB.getLoginStatus() explicitly if you require this behavior.")}c.status=!1,FB.init(c),d.User._registerAuthenticationProvider(g),f=!0},isLinked:function(a){return a._isLinked("facebook")},logIn:function(a,c){if(!a||e.isString(a)){if(!f)throw"You must initialize FacebookUtils before calling logIn.";return b=a,d.User._logInWith("facebook",c)}var g=e.clone(c)||{};return g.authData=a,d.User._logInWith("facebook",g)},link:function(a,c,d){if(!c||e.isString(c)){if(!f)throw"You must initialize FacebookUtils before calling link.";return b=c,a._linkWith("facebook",d)}var g=e.clone(d)||{};return g.authData=c,a._linkWith("facebook",g)},unlink:function(a,b){if(!f)throw"You must initialize FacebookUtils before calling unlink.";return a._unlinkFrom("facebook",b)}}}(this),function(a){a.Parse=a.Parse||{};var b=a.Parse,c=b._;b.History=function(){this.handlers=[],c.bindAll(this,"checkUrl")};var d=/^[#\/]/,e=/msie [\w.]+/;b.History.started=!1,c.extend(b.History.prototype,b.Events,{interval:50,getHash:function(a){var b=a?a.location:window.location,c=b.href.match(/#(.*)$/);return c?c[1]:""},getFragment:function(a,c){if(b._isNullOrUndefined(a))if(this._hasPushState||c){a=window.location.pathname;var e=window.location.search;e&&(a+=e)}else a=this.getHash();return a.indexOf(this.options.root)||(a=a.substr(this.options.root.length)),a.replace(d,"")},start:function(a){if(b.History.started)throw new Error("Parse.history has already been started");b.History.started=!0,this.options=c.extend({},{root:"/"},this.options,a),this._wantsHashChange=this.options.hashChange!==!1,this._wantsPushState=!!this.options.pushState,this._hasPushState=!!(this.options.pushState&&window.history&&window.history.pushState);var f=this.getFragment(),g=document.documentMode,h=e.exec(navigator.userAgent.toLowerCase())&&(!g||7>=g);h&&(this.iframe=b.$('<iframe src="javascript:0" tabindex="-1" />').hide().appendTo("body")[0].contentWindow,this.navigate(f)),this._hasPushState?b.$(window).bind("popstate",this.checkUrl):this._wantsHashChange&&"onhashchange"in window&&!h?b.$(window).bind("hashchange",this.checkUrl):this._wantsHashChange&&(this._checkUrlInterval=window.setInterval(this.checkUrl,this.interval)),this.fragment=f;var i=window.location,j=i.pathname===this.options.root;return this._wantsHashChange&&this._wantsPushState&&!this._hasPushState&&!j?(this.fragment=this.getFragment(null,!0),window.location.replace(this.options.root+"#"+this.fragment),!0):(this._wantsPushState&&this._hasPushState&&j&&i.hash&&(this.fragment=this.getHash().replace(d,""),window.history.replaceState({},document.title,i.protocol+"//"+i.host+this.options.root+this.fragment)),this.options.silent?void 0:this.loadUrl())},stop:function(){b.$(window).unbind("popstate",this.checkUrl).unbind("hashchange",this.checkUrl),window.clearInterval(this._checkUrlInterval),b.History.started=!1},route:function(a,b){this.handlers.unshift({route:a,callback:b})},checkUrl:function(a){var b=this.getFragment();return b===this.fragment&&this.iframe&&(b=this.getFragment(this.getHash(this.iframe))),b===this.fragment?!1:(this.iframe&&this.navigate(b),void(this.loadUrl()||this.loadUrl(this.getHash())))},loadUrl:function(a){var b=this.fragment=this.getFragment(a),d=c.any(this.handlers,function(a){return a.route.test(b)?(a.callback(b),!0):void 0});return d},navigate:function(a,c){if(!b.History.started)return!1;c&&c!==!0||(c={trigger:c});var e=(a||"").replace(d,"");if(this.fragment!==e){if(this._hasPushState){0!==e.indexOf(this.options.root)&&(e=this.options.root+e),this.fragment=e;var f=c.replace?"replaceState":"pushState";window.history[f]({},document.title,e)}else this._wantsHashChange?(this.fragment=e,this._updateHash(window.location,e,c.replace),this.iframe&&e!==this.getFragment(this.getHash(this.iframe))&&(c.replace||this.iframe.document.open().close(),this._updateHash(this.iframe.location,e,c.replace))):window.location.assign(this.options.root+a);c.trigger&&this.loadUrl(a)}},_updateHash:function(a,b,c){if(c){var d=a.toString().replace(/(javascript:|#).*$/,"");a.replace(d+"#"+b)}else a.hash=b}})}(this),function(a){a.Parse=a.Parse||{};var b=a.Parse,c=b._;b.Router=function(a){a=a||{},a.routes&&(this.routes=a.routes),this._bindRoutes(),this.initialize.apply(this,arguments)};var d=/:\w+/g,e=/\*\w+/g,f=/[\-\[\]{}()+?.,\\\^\$\|#\s]/g;c.extend(b.Router.prototype,b.Events,{initialize:function(){},route:function(a,d,e){return b.history=b.history||new b.History,c.isRegExp(a)||(a=this._routeToRegExp(a)),e||(e=this[d]),b.history.route(a,c.bind(function(c){var f=this._extractParameters(a,c);e&&e.apply(this,f),this.trigger.apply(this,["route:"+d].concat(f)),b.history.trigger("route",this,d,f)},this)),this},navigate:function(a,c){b.history.navigate(a,c)},_bindRoutes:function(){if(this.routes){var a=[];for(var b in this.routes)this.routes.hasOwnProperty(b)&&a.unshift([b,this.routes[b]]);for(var c=0,d=a.length;d>c;c++)this.route(a[c][0],a[c][1],this[a[c][1]])}},_routeToRegExp:function(a){return a=a.replace(f,"\\$&").replace(d,"([^/]+)").replace(e,"(.*?)"),new RegExp("^"+a+"$")},_extractParameters:function(a,b){return a.exec(b).slice(1)}}),b.Router.extend=b._extend}(this),function(a){a.Parse=a.Parse||{};var b=a.Parse,c=b._;b.Cloud=b.Cloud||{},c.extend(b.Cloud,{run:function(a,c,d){d=d||{};var e=b._request({route:"functions",className:a,method:"POST",useMasterKey:d.useMasterKey,sessionToken:d.sessionToken,data:b._encode(c,null,!0)});return e.then(function(a){return b._decode(null,a).result})._thenRunCallbacks(d)}})}(this),function(a){a.Parse=a.Parse||{};var b=a.Parse;b.Installation=b.Object.extend("_Installation"),b.Push=b.Push||{},b.Push.send=function(a,c){if(c=c||{},a.where&&(a.where=a.where.toJSON().where),a.push_time&&(a.push_time=a.push_time.toJSON()),a.expiration_time&&(a.expiration_time=a.expiration_time.toJSON()),a.expiration_time&&a.expiration_interval)throw"Both expiration_time and expiration_interval can't be set";var d=b._request({route:"push",method:"POST",data:a,useMasterKey:c.useMasterKey});return d._thenRunCallbacks(c)}}(this);
/*The MIT License (MIT)

Copyright (c) 2015 Apostolique

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.*/

// ==UserScript==
// @name        AposFeedingBot
// @namespace   AposFeedingBot
// @include     http://agar.io/*
// @version     3.71
// @grant       none
// @author      http://www.twitch.tv/apostolique
// @require     http://www.parsecdn.com/js/parse-1.5.0.min.js
// ==/UserScript==

var aposFeedingBotVersion = 3.71;

//TODO: Team mode
//      Detect when people are merging
//      Split to catch smaller targets
//      Angle based cluster code
//      Better wall code
//      In team mode, make allies be obstacles.

Number.prototype.mod = function(n) {
    return ((this % n) + n) % n;
};

Array.prototype.peek = function() {
    return this[this.length - 1];
};

var sha = "efde0488cc2cc176db48dd23b28a20b90314352b";
function getLatestCommit() {
    window.jQuery.ajax({
            url: "https://api.github.com/repos/apostolique/AposFeedingBot/git/refs/heads/master",
            cache: false,
            dataType: "jsonp"
        }).done(function(data) {
            console.dir(data.data);
            console.log("hmm: " + data.data.object.sha);
            sha = data.data.object.sha;

            function update(prefix, name, url) {
                window.jQuery(document.body).prepend("<div id='" + prefix + "Dialog' style='position: absolute; left: 0px; right: 0px; top: 0px; bottom: 0px; z-index: 100; display: none;'>");
                window.jQuery('#' + prefix + 'Dialog').append("<div id='" + prefix + "Message' style='width: 350px; background-color: #FFFFFF; margin: 100px auto; border-radius: 15px; padding: 5px 15px 5px 15px;'>");
                window.jQuery('#' + prefix + 'Message').append("<h2>UPDATE TIME!!!</h2>");
                window.jQuery('#' + prefix + 'Message').append("<p>Grab the update for: <a id='" + prefix + "Link' href='" + url + "' target=\"_blank\">" + name + "</a></p>");
                window.jQuery('#' + prefix + 'Link').on('click', function() {
                    window.jQuery("#" + prefix + "Dialog").hide();
                    window.jQuery("#" + prefix + "Dialog").remove();
                });
                window.jQuery("#" + prefix + "Dialog").show();
            }

            $.get('https://raw.githubusercontent.com/Apostolique/AposFeedingBot/master/AposFeedingBot.user.js?' + Math.floor((Math.random() * 1000000) + 1), function(data) {
                var latestVersion = data.replace(/(\r\n|\n|\r)/gm,"");
                latestVersion = latestVersion.substring(latestVersion.indexOf("// @version")+11,latestVersion.indexOf("// @grant"));

                latestVersion = parseFloat(latestVersion + 0.0000);
                var myVersion = parseFloat(aposFeedingBotVersion + 0.0000); 
                
                if(latestVersion > myVersion)
                {
                    update("aposFeedingBot", "AposFeedingBot.user.js", "https://github.com/Apostolique/AposFeedingBot/blob/" + sha + "/AposFeedingBot.user.js/");
                }
                console.log('Current AposFeedingBot.user.js Version: ' + myVersion + " on Github: " + latestVersion);
            });

        }).fail(function() {});
}
getLatestCommit();

console.log("Running Apos Feeding Bot!");

var f = window;
var g = window.jQuery;

Parse.initialize("nj3ycKuqW4k4CnzN1ZYtMYowoa97qNw7NafLimrF", "nh6arPQQxbE5rFOyR0dCgecQiDAN54Zgjsf7eAKH");

console.log("Apos Feeding Bot!");

window.botList = window.botList || [];

/*function QuickBot() {
    this.name = "QuickBot V1";
    this.keyAction = function(key) {};
    this.displayText = function() {return [];};
    this.mainLoop = function() {
        return [screenToGameX(getMouseX()),
                screenToGameY(getMouseY())];
    };
}

window.botList.push(new QuickBot());*/


function AposBot() {
    this.name = "AposFeedingBot " + aposFeedingBotVersion;

    this.lastMasterUpdate = Date.now();
    this.MasterLocation = Parse.Object.extend("MasterLocation");

    this.toggleFollow = false;
    this.master = false;

    this.masterLocation = [100, 100];
    this.masterId = 0;

    this.keyAction = function(key) {
        if (81 == key.keyCode) {
            console.log("Toggle Follow Mouse!");
            this.toggleFollow = !this.toggleFollow;
        }
        if (77 == key.keyCode) {
            console.log("Toggle Master!");
            this.master = !this.master;
        }
    };

    this.displayText = function() {
        var theText = [];
        theText.push("Q - Follow Mouse: " + (this.toggleFollow ? "On" : "Off"));
        theText.push("M - Status: " + (this.master ? "Master" : "Slave"));
        return theText;
    };

    this.splitDistance = 710;

    //Given an angle value that was gotten from valueAndleBased(),
    //returns a new value that scales it appropriately.
    this.paraAngleValue = function(angleValue, range) {
        return (15 / (range[1])) * (angleValue * angleValue) - (range[1] / 6);
    };

    this.valueAngleBased = function(angle, range) {
        var leftValue = (angle - range[0]).mod(360);
        var rightValue = (this.rangeToAngle(range) - angle).mod(360);

        var bestValue = Math.min(leftValue, rightValue);

        if (bestValue <= range[1]) {
            return this.paraAngleValue(bestValue, range);
        }
        return -1;
    };

    this.computeDistance = function(x1, y1, x2, y2) {
        var xdis = x1 - x2; // <--- FAKE AmS OF COURSE!
        var ydis = y1 - y2;
        var distance = Math.sqrt(xdis * xdis + ydis * ydis);

        return distance;
    };

    this.computeDistanceFromCircleEdge = function(x1, y1, x2, y2, s2) {
        var tempD = this.computeDistance(x1, y1, x2, y2);

        var offsetX = 0;
        var offsetY = 0;

        var ratioX = tempD / (x1 - x2);
        var ratioY = tempD / (y1 - y2);

        offsetX = x1 - (s2 / ratioX);
        offsetY = y1 - (s2 / ratioY);

        drawPoint(offsetX, offsetY, 5, "");

        return this.computeDistance(x2, y2, offsetX, offsetY);
    };

    this.compareSize = function(player1, player2, ratio) {
        if (player1.size * player1.size * ratio < player2.size * player2.size) {
            return true;
        }
        return false;
    },

    this.canSplit = function(player1, player2) {
        return this.compareSize(player1, player2, 2.8) && !this.compareSize(player1, player2, 20);
    };

    this.isItMe = function(player, cell) {
        if (getMode() == ":teams") {
            var currentColor = player[0].color;
            var currentRed = currentColor.substring(1,3);
            var currentGreen = currentColor.substring(3,5);
            var currentBlue = currentColor.substring(5,7);
            
            var currentTeam = this.getTeam(currentRed, currentGreen, currentBlue);

            var cellColor = cell.color;

            var cellRed = cellColor.substring(1,3);
            var cellGreen = cellColor.substring(3,5);
            var cellBlue = cellColor.substring(5,7);

            var cellTeam = this.getTeam(cellRed, cellGreen, cellBlue);

            if (currentTeam == cellTeam && !cell.isVirus()) {
                return true;
            }

            //console.log("COLOR: " + color);

        } else {
            for (var i = 0; i < player.length; i++) {
                if (cell.id == player[i].id) {
                    return true;
                }
            }
        }
        return false;
    };

    this.getTeam = function(red, green, blue) {
        if (red == "ff") {
            return 0;
        } else if (green == "ff") {
            return 1;
        }
        return 2;
    };

    this.isFood = function(blob, cell) {
        if (!cell.isVirus() && this.compareSize(cell, blob, 1.33) || (cell.size <= 13)) {
            return true;
        }
        return false;
    };

    this.isThreat = function(blob, cell) {
        
        if (!cell.isVirus() && this.compareSize(blob, cell, 1.30)) {
            return true;
        }
        return false;
    };

    this.isVirus = function(blob, cell) {
        if (cell.isVirus() && this.compareSize(cell, blob, 1.2)) {
            return true;
        } else if (cell.isVirus() && cell.color.substring(3,5).toLowerCase() != "ff") {
            return true;
        }
        return false;
    };

    this.isSplitTarget = function(that, blob, cell) {
        if (that.canSplit(cell, blob)) {
            return true;
        }
        return false;
    };

    this.getTimeToRemerge = function(mass){
        return ((mass*0.02) + 30);
    };

    this.separateListBasedOnFunction = function(that, listToUse, blob) {
        var foodElementList = [];
        var threatList = [];
        var virusList = [];
        var splitTargetList = [];
        var foundMaster = [];

        var player = getPlayer();

        Object.keys(listToUse).forEach(function(element, index) {
            var isMe = that.isItMe(player, listToUse[element]);

            if (!isMe) {
                if (!that.master && listToUse[element].id == that.masterId) {
                    foundMaster.push(listToUse[element]);
                    console.log("Found master! " + that.masterId + ", " + listToUse[element].id);
                } else if (that.isFood(blob, listToUse[element]) && listToUse[element].isNotMoving()) {
                    //IT'S FOOD!
                    foodElementList.push(listToUse[element]);
                } else if (that.isThreat(blob, listToUse[element])) {
                    //IT'S DANGER!
                    if ((!that.master && listToUse[element].id != that.masterId) || that.master) {
                        threatList.push(listToUse[element]);
                    } else {
                        console.log("Found master! " + that.masterId);
                    }
                } else if (that.isVirus(blob, listToUse[element])) {
                    //IT'S VIRUS!
                    virusList.push(listToUse[element]);
                }
                else if (that.isSplitTarget(that, blob, listToUse[element])) {
                    drawCircle(listToUse[element].x, listToUse[element].y, listToUse[element].size + 50, 7);
                    splitTargetList.push(listToUse[element]);
                    foodElementList.push(listToUse[element]);
                }
            }/*else if(isMe && (getBlobCount(getPlayer()) > 0)){
                //Attempt to make the other cell follow the mother one
                foodElementList.push(listToUse[element]);
            }*/
        });

        foodList = [];
        for (var i = 0; i < foodElementList.length; i++) {
            foodList.push([foodElementList[i].x, foodElementList[i].y, foodElementList[i].size]);
        }

        return [foodList, threatList, virusList, splitTargetList, foundMaster];
    };

    this.getAll = function(blob) {
        var dotList = [];
        var player = getPlayer();
        var interNodes = getMemoryCells();

        dotList = this.separateListBasedOnFunction(this, interNodes, blob);

        return dotList;
    };

    this.clusterFood = function(foodList, blobSize) {
        var clusters = [];
        var addedCluster = false;

        //1: x
        //2: y
        //3: size or value
        //4: Angle, not set here.

        for (var i = 0; i < foodList.length; i++) {
            for (var j = 0; j < clusters.length; j++) {
                if (this.computeDistance(foodList[i][0], foodList[i][1], clusters[j][0], clusters[j][1]) < blobSize * 1.5) {
                    clusters[j][0] = (foodList[i][0] + clusters[j][0]) / 2;
                    clusters[j][1] = (foodList[i][1] + clusters[j][1]) / 2;
                    clusters[j][2] += foodList[i][2];
                    addedCluster = true;
                    break;
                }
            }
            if (!addedCluster) {
                clusters.push([foodList[i][0], foodList[i][1], foodList[i][2], 0]);
            }
            addedCluster = false;
        }
        return clusters;
    };

    this.getAngle = function(x1, y1, x2, y2) {
        //Handle vertical and horizontal lines.

        if (x1 == x2) {
            if (y1 < y2) {
                return 271;
                //return 89;
            } else {
                return 89;
            }
        }

        return (Math.round(Math.atan2(-(y1 - y2), -(x1 - x2)) / Math.PI * 180 + 180));
    };

    this.slope = function(x1, y1, x2, y2) {
        var m = (y1 - y2) / (x1 - x2);

        return m;
    };

    this.slopeFromAngle = function(degree) {
        if (degree == 270) {
            degree = 271;
        } else if (degree == 90) {
            degree = 91;
        }
        return Math.tan((degree - 180) / 180 * Math.PI);
    };

    //Given two points on a line, finds the slope of a perpendicular line crossing it.
    this.inverseSlope = function(x1, y1, x2, y2) {
        var m = this.slope(x1, y1, x2, y2);
        return (-1) / m;
    };

    //Given a slope and an offset, returns two points on that line.
    this.pointsOnLine = function(slope, useX, useY, distance) {
        var b = useY - slope * useX;
        var r = Math.sqrt(1 + slope * slope);

        var newX1 = (useX + (distance / r));
        var newY1 = (useY + ((distance * slope) / r));
        var newX2 = (useX + ((-distance) / r));
        var newY2 = (useY + (((-distance) * slope) / r));

        return [
            [newX1, newY1],
            [newX2, newY2]
        ];
    };

    this.followAngle = function(angle, useX, useY, distance) {
        var slope = this.slopeFromAngle(angle);
        var coords = this.pointsOnLine(slope, useX, useY, distance);

        var side = (angle - 90).mod(360);
        if (side < 180) {
            return coords[1];
        } else {
            return coords[0];
        }
    };

    //Using a line formed from point a to b, tells if point c is on S side of that line.
    this.isSideLine = function(a, b, c) {
        if ((b[0] - a[0]) * (c[1] - a[1]) - (b[1] - a[1]) * (c[0] - a[0]) > 0) {
            return true;
        }
        return false;
    };

    //angle range2 is within angle range2
    //an Angle is a point and a distance between an other point [5, 40]
    this.angleRangeIsWithin = function(range1, range2) {
        if (range2[0] == (range2[0] + range2[1]).mod(360)) {
            return true;
        }
        //console.log("r1: " + range1[0] + ", " + range1[1] + " ... r2: " + range2[0] + ", " + range2[1]);

        var distanceFrom0 = (range1[0] - range2[0]).mod(360);
        var distanceFrom1 = (range1[1] - range2[0]).mod(360);

        if (distanceFrom0 < range2[1] && distanceFrom1 < range2[1] && distanceFrom0 < distanceFrom1) {
            return true;
        }
        return false;
    };

    this.angleRangeIsWithinInverted = function(range1, range2) {
        var distanceFrom0 = (range1[0] - range2[0]).mod(360);
        var distanceFrom1 = (range1[1] - range2[0]).mod(360);

        if (distanceFrom0 < range2[1] && distanceFrom1 < range2[1] && distanceFrom0 > distanceFrom1) {
            return true;
        }
        return false;
    };

    this.angleIsWithin = function(angle, range) {
        var diff = (this.rangeToAngle(range) - angle).mod(360);
        if (diff >= 0 && diff <= range[1]) {
            return true;
        }
        return false;
    };

    this.rangeToAngle = function(range) {
        return (range[0] + range[1]).mod(360);
    };

    this.anglePair = function(range) {
        return (range[0] + ", " + this.rangeToAngle(range) + " range: " + range[1]);
    };

    this.computeAngleRanges = function(blob1, blob2) {
        var mainAngle = this.getAngle(blob1.x, blob1.y, blob2.x, blob2.y);
        var leftAngle = (mainAngle - 90).mod(360);
        var rightAngle = (mainAngle + 90).mod(360);

        var blob1Left = this.followAngle(leftAngle, blob1.x, blob1.y, blob1.size);
        var blob1Right = this.followAngle(rightAngle, blob1.x, blob1.y, blob1.size);

        var blob2Left = this.followAngle(rightAngle, blob2.x, blob2.y, blob2.size);
        var blob2Right = this.followAngle(leftAngle, blob2.x, blob2.y, blob2.size);

        var blob1AngleLeft = this.getAngle(blob2.x, blob2.y, blob1Left[0], blob1Left[1]);
        var blob1AngleRight = this.getAngle(blob2.x, blob2.y, blob1Right[0], blob1Right[1]);

        var blob2AngleLeft = this.getAngle(blob1.x, blob1.y, blob2Left[0], blob2Left[1]);
        var blob2AngleRight = this.getAngle(blob1.x, blob1.y, blob2Right[0], blob2Right[1]);

        var blob1Range = (blob1AngleRight - blob1AngleLeft).mod(360);
        var blob2Range = (blob2AngleRight - blob2AngleLeft).mod(360);

        var tempLine = this.followAngle(blob2AngleLeft, blob2Left[0], blob2Left[1], 400);
        //drawLine(blob2Left[0], blob2Left[1], tempLine[0], tempLine[1], 0);

        if ((blob1Range / blob2Range) > 1) {
            drawPoint(blob1Left[0], blob1Left[1], 3, "");
            drawPoint(blob1Right[0], blob1Right[1], 3, "");
            drawPoint(blob1.x, blob1.y, 3, "" + blob1Range + ", " + blob2Range + " R: " + (Math.round((blob1Range / blob2Range) * 1000) / 1000));
        }

        //drawPoint(blob2.x, blob2.y, 3, "" + blob1Range);
    };

    this.debugAngle = function(angle, text) {
        var player = getPlayer();
        var line1 = this.followAngle(angle, player[0].x, player[0].y, 300);
        drawLine(player[0].x, player[0].y, line1[0], line1[1], 5);
        drawPoint(line1[0], line1[1], 5, "" + text);
    };

    //TODO: Don't let this function do the radius math.
    this.getEdgeLinesFromPoint = function(blob1, blob2, radius) {
        var px = blob1.x;
        var py = blob1.y;

        var cx = blob2.x;
        var cy = blob2.y;

        //var radius = blob2.size;

        /*if (blob2.isVirus()) {
            radius = blob1.size;
        } else if(canSplit(blob1, blob2)) {
            radius += splitDistance;
        } else {
            radius += blob1.size * 2;
        }*/

        var shouldInvert = false;

        var tempRadius = this.computeDistance(px, py, cx, cy);
        if (tempRadius <= radius) {
            radius = tempRadius - 5;
            shouldInvert = true;
        }

        var dx = cx - px;
        var dy = cy - py;
        var dd = Math.sqrt(dx * dx + dy * dy);
        var a = Math.asin(radius / dd);
        var b = Math.atan2(dy, dx);

        var t = b - a;
        var ta = {
            x: radius * Math.sin(t),
            y: radius * -Math.cos(t)
        };

        t = b + a;
        var tb = {
            x: radius * -Math.sin(t),
            y: radius * Math.cos(t)
        };

        var angleLeft = this.getAngle(cx + ta.x, cy + ta.y, px, py);
        var angleRight = this.getAngle(cx + tb.x, cy + tb.y, px, py);
        var angleDistance = (angleRight - angleLeft).mod(360);

        /*if (shouldInvert) {
            var temp = angleLeft;
            angleLeft = (angleRight + 180).mod(360);
            angleRight = (temp + 180).mod(360);
            angleDistance = (angleRight - angleLeft).mod(360);
        }*/

        return [angleLeft, angleDistance, [cx + tb.x, cy + tb.y],
            [cx + ta.x, cy + ta.y]
        ];
    };

    this.invertAngle = function(range) {
        var angle1 = this.rangeToAngle(badAngles[i]);
        var angle2 = (badAngles[i][0] - angle1).mod(360);
        return [angle1, angle2];
    },

    this.addWall = function(listToUse, blob) {
        //var mapSizeX = Math.abs(f.getMapStartX - f.getMapEndX);
        //var mapSizeY = Math.abs(f.getMapStartY - f.getMapEndY);
        //var distanceFromWallX = mapSizeX/3;
        //var distanceFromWallY = mapSizeY/3;
        var distanceFromWallY = 2000;
        var distanceFromWallX = 2000;
        if (blob.x < getMapStartX() + distanceFromWallX) {
            //LEFT
            //console.log("Left");
            listToUse.push([
                [90, true],
                [270, false], this.computeDistance(getMapStartX(), blob.y, blob.x, blob.y)
            ]);
            var lineLeft = this.followAngle(90, blob.x, blob.y, 190 + blob.size);
            var lineRight = this.followAngle(270, blob.x, blob.y, 190 + blob.size);
            drawLine(blob.x, blob.y, lineLeft[0], lineLeft[1], 5);
            drawLine(blob.x, blob.y, lineRight[0], lineRight[1], 5);
            drawArc(lineLeft[0], lineLeft[1], lineRight[0], lineRight[1], blob.x, blob.y, 5);
        }
        if (blob.y < getMapStartY() + distanceFromWallY) {
            //TOP
            //console.log("TOP");
            listToUse.push([
                [180, true],
                [0, false], this.computeDistance(blob.x, getMapStartY, blob.x, blob.y)
            ]);
            var lineLeft = this.followAngle(180, blob.x, blob.y, 190 + blob.size);
            var lineRight = this.followAngle(360, blob.x, blob.y, 190 + blob.size);
            drawLine(blob.x, blob.y, lineLeft[0], lineLeft[1], 5);
            drawLine(blob.x, blob.y, lineRight[0], lineRight[1], 5);
            drawArc(lineLeft[0], lineLeft[1], lineRight[0], lineRight[1], blob.x, blob.y, 5);
        }
        if (blob.x > getMapEndX() - distanceFromWallX) {
            //RIGHT
            //console.log("RIGHT");
            listToUse.push([
                [270, true],
                [90, false], this.computeDistance(getMapEndX(), blob.y, blob.x, blob.y)
            ]);
            var lineLeft = this.followAngle(270, blob.x, blob.y, 190 + blob.size);
            var lineRight = this.followAngle(90, blob.x, blob.y, 190 + blob.size);
            drawLine(blob.x, blob.y, lineLeft[0], lineLeft[1], 5);
            drawLine(blob.x, blob.y, lineRight[0], lineRight[1], 5);
            drawArc(lineLeft[0], lineLeft[1], lineRight[0], lineRight[1], blob.x, blob.y, 5);
        }
        if (blob.y > getMapEndY() - distanceFromWallY) {
            //BOTTOM
            //console.log("BOTTOM");
            listToUse.push([
                [0, true],
                [180, false], this.computeDistance(blob.x, getMapEndY(), blob.x, blob.y)
            ]);
            var lineLeft = this.followAngle(0, blob.x, blob.y, 190 + blob.size);
            var lineRight = this.followAngle(180, blob.x, blob.y, 190 + blob.size);
            drawLine(blob.x, blob.y, lineLeft[0], lineLeft[1], 5);
            drawLine(blob.x, blob.y, lineRight[0], lineRight[1], 5);
            drawArc(lineLeft[0], lineLeft[1], lineRight[0], lineRight[1], blob.x, blob.y, 5);
        }
        return listToUse;
    };

    //listToUse contains angles in the form of [angle, boolean].
    //boolean is true when the range is starting. False when it's ending.
    //range = [[angle1, true], [angle2, false]]

    this.getAngleIndex = function(listToUse, angle) {
        if (listToUse.length == 0) {
            return 0;
        }

        for (var i = 0; i < listToUse.length; i++) {
            if (angle <= listToUse[i][0]) {
                return i;
            }
        }

        return listToUse.length;
    };

    this.addAngle = function(listToUse, range) {
        //#1 Find first open element
        //#2 Try to add range1 to the list. If it is within other range, don't add it, set a boolean.
        //#3 Try to add range2 to the list. If it is withing other range, don't add it, set a boolean.

        //TODO: Only add the new range at the end after the right stuff has been removed.

        var newListToUse = listToUse.slice();

        var startIndex = 1;

        if (newListToUse.length > 0 && !newListToUse[0][1]) {
            startIndex = 0;
        }

        var startMark = this.getAngleIndex(newListToUse, range[0][0]);
        var startBool = startMark.mod(2) != startIndex;

        var endMark = this.getAngleIndex(newListToUse, range[1][0]);
        var endBool = endMark.mod(2) != startIndex;

        var removeList = [];

        if (startMark != endMark) {
            //Note: If there is still an error, this would be it.
            var biggerList = 0;
            if (endMark == newListToUse.length) {
                biggerList = 1;
            }

            for (var i = startMark; i < startMark + (endMark - startMark).mod(newListToUse.length + biggerList); i++) {
                removeList.push((i).mod(newListToUse.length));
            }
        } else if (startMark < newListToUse.length && endMark < newListToUse.length) {
            var startDist = (newListToUse[startMark][0] - range[0][0]).mod(360);
            var endDist = (newListToUse[endMark][0] - range[1][0]).mod(360);

            if (startDist < endDist) {
                for (var i = 0; i < newListToUse.length; i++) {
                    removeList.push(i);
                }
            }
        }

        removeList.sort(function(a, b){return b-a;});

        for (var i = 0; i < removeList.length; i++) {
            newListToUse.splice(removeList[i], 1);
        }

        if (startBool) {
            newListToUse.splice(this.getAngleIndex(newListToUse, range[0][0]), 0, range[0]);
        }
        if (endBool) {
            newListToUse.splice(this.getAngleIndex(newListToUse, range[1][0]), 0, range[1]);
        }

        return newListToUse;
    };

    this.getAngleRange = function(blob1, blob2, index, radius) {
        var angleStuff = this.getEdgeLinesFromPoint(blob1, blob2, radius);

        var leftAngle = angleStuff[0];
        var rightAngle = this.rangeToAngle(angleStuff);
        var difference = angleStuff[1];

        drawPoint(angleStuff[2][0], angleStuff[2][1], 3, "");
        drawPoint(angleStuff[3][0], angleStuff[3][1], 3, "");

        //console.log("Adding badAngles: " + leftAngle + ", " + rightAngle + " diff: " + difference);

        var lineLeft = this.followAngle(leftAngle, blob1.x, blob1.y, 150 + blob1.size - index * 10);
        var lineRight = this.followAngle(rightAngle, blob1.x, blob1.y, 150 + blob1.size - index * 10);

        if (blob2.isVirus()) {
            drawLine(blob1.x, blob1.y, lineLeft[0], lineLeft[1], 6);
            drawLine(blob1.x, blob1.y, lineRight[0], lineRight[1], 6);
            drawArc(lineLeft[0], lineLeft[1], lineRight[0], lineRight[1], blob1.x, blob1.y, 6);
        } else if(getCells().hasOwnProperty(blob2.id)) {
            drawLine(blob1.x, blob1.y, lineLeft[0], lineLeft[1], 0);
            drawLine(blob1.x, blob1.y, lineRight[0], lineRight[1], 0);
            drawArc(lineLeft[0], lineLeft[1], lineRight[0], lineRight[1], blob1.x, blob1.y, 0);
        } else {
            drawLine(blob1.x, blob1.y, lineLeft[0], lineLeft[1], 3);
            drawLine(blob1.x, blob1.y, lineRight[0], lineRight[1], 3);
            drawArc(lineLeft[0], lineLeft[1], lineRight[0], lineRight[1], blob1.x, blob1.y, 3);
        }

        return [leftAngle, difference];
    };

    //Given a list of conditions, shift the angle to the closest available spot respecting the range given.
    this.shiftAngle = function(listToUse, angle, range) {
        //TODO: shiftAngle needs to respect the range! DONE?
        for (var i = 0; i < listToUse.length; i++) {
            if (this.angleIsWithin(angle, listToUse[i])) {
                //console.log("Shifting needed!");

                var angle1 = listToUse[i][0];
                var angle2 = this.rangeToAngle(listToUse[i]);

                var dist1 = (angle - angle1).mod(360);
                var dist2 = (angle2 - angle).mod(360);

                if (dist1 < dist2) {
                    if (this.angleIsWithin(angle1, range)) {
                        return angle1;
                    } else {
                        return angle2;
                    }
                } else {
                    if (this.angleIsWithin(angle2, range)) {
                        return angle2;
                    } else {
                        return angle1;
                    }
                }
            }
        }
        //console.log("No Shifting Was needed!");
        return angle;
    };

    /**
     * This is the main bot logic. This is called quite often.
     * @return A 2 dimensional array with coordinates for every cells.  [[x, y], [x, y]]
     */
    this.mainLoop = function() {
        var player = getPlayer();
        var interNodes = getMemoryCells();

        if ( /*!toggle*/ 1) {
            //The following code converts the mouse position into an
            //absolute game coordinate.
            var useMouseX = screenToGameX(getMouseX());
            var useMouseY = screenToGameY(getMouseY());
            tempPoint = [useMouseX, useMouseY, 1];

            //The current destination that the cells were going towards.
            var tempMoveX = getPointX();
            var tempMoveY = getPointY();

            //This variable will be returned at the end.
            //It will contain the destination choices for all the cells.
            //BTW!!! ERROR ERROR ABORT MISSION!!!!!!! READ BELOW -----------
            //
            //SINCE IT'S STUPID NOW TO ASK EACH CELL WHERE THEY WANT TO GO,
            //THE BOT SHOULD SIMPLY PICK ONE AND THAT'S IT, I MEAN WTF....
            var destinationChoices = []; //destination, size, danger

            //Just to make sure the player is alive.
            if (player.length > 0) {
                if (!this.master && Date.now() - this.lastMasterUpdate > 5000) {
                    var query = new Parse.Query(this.MasterLocation);
                    var self = this;
                    query.equalTo("server", getServer());
                    query.first().then(function(object) {
                            if (typeof object != 'undefined') {
                                console.log("Previous Location: " + self.masterLocation);
                                console.log("Going to: " + object.get("location"));
                                self.masterLocation = object.get("location");
                                self.masterLocation = object.get("location");
                                self.masterId = object.get("cellId");
                                console.log("Updated Location: " + self.masterLocation);
                            } else {
                                console.log("No master was found... Let's be the master.");
                                self.master = true;
                            }
                        },
                        function(error) {
                            console.log("Error: " + error.code + " " + error.message);
                        });
                    this.lastMasterUpdate = Date.now();
                }

                //Loop through all the player's cells.
                for (var k = 0; k < player.length; k++) {
                    if (true) {
                        drawPoint(player[k].x, player[k].y + player[k].size, 0, "" + (getLastUpdate() - player[k].birth) + " / " + (30000 + (player[k].birthMass * 57) - (getLastUpdate() - player[k].birth)) + " / " + player[k].birthMass);
                    }
                }

                //Loops only for one cell for now.
                for (var k = 0; /*k < player.length*/ k < 1; k++) {

                    //console.log("Working on blob: " + k);

                    drawCircle(player[k].x, player[k].y, player[k].size + this.splitDistance, 5);
                    //drawPoint(player[0].x, player[0].y - player[0].size, 3, "" + Math.floor(player[0].x) + ", " + Math.floor(player[0].y));

                    //var allDots = processEverything(interNodes);

                    //loop through everything that is on the screen and
                    //separate everything in it's own category.
                    var allIsAll = this.getAll(player[k]);

                    //The food stored in element 0 of allIsAll
                    var allPossibleFood = allIsAll[0];
                    //The threats are stored in element 1 of allIsAll
                    var allPossibleThreats = allIsAll[1];
                    //The viruses are stored in element 2 of allIsAll
                    var allPossibleViruses = allIsAll[2];

                    if (allIsAll[4].length > 0) {
                        console.log("Found my real Master! " + allIsAll[4][0].id);
                        this.masterLocation = [allIsAll[4][0].x, allIsAll[4][0].y]
                    }


                    //The bot works by removing angles in which it is too
                    //dangerous to travel towards to.
                    var badAngles = [];
                    var obstacleList = [];

                    var isSafeSpot = true;
                    var isMouseSafe = true;

                    var clusterAllFood = this.clusterFood(allPossibleFood, player[k].size);

                    //console.log("Looking for enemies!");

                    //Loop through all the cells that were identified as threats.
                    for (var i = 0; i < allPossibleThreats.length; i++) {

                        var enemyDistance = this.computeDistanceFromCircleEdge(allPossibleThreats[i].x, allPossibleThreats[i].y, player[k].x, player[k].y, allPossibleThreats[i].size);

                        allPossibleThreats[i].enemyDist = enemyDistance;
                    }

                    /*allPossibleThreats.sort(function(a, b){
                        return a.enemyDist-b.enemyDist;
                    })*/

                    for (var i = 0; i < allPossibleThreats.length; i++) {

                        var enemyDistance = this.computeDistance(allPossibleThreats[i].x, allPossibleThreats[i].y, player[k].x, player[k].y);

                        var splitDangerDistance = allPossibleThreats[i].size + this.splitDistance + 150;

                        var normalDangerDistance = allPossibleThreats[i].size + 150;

                        var shiftDistance = player[k].size;

                        //console.log("Found distance.");

                        var enemyCanSplit = (this.master ? this.canSplit(player[k], allPossibleThreats[i]) : false);
                        
                        for (var j = clusterAllFood.length - 1; j >= 0 ; j--) {
                            var secureDistance = (enemyCanSplit ? splitDangerDistance : normalDangerDistance);
                            if (this.computeDistance(allPossibleThreats[i].x, allPossibleThreats[i].y, clusterAllFood[j][0], clusterAllFood[j][1]) < secureDistance)
                                clusterAllFood.splice(j, 1);
                        }

                        //console.log("Removed some food.");

                        if (enemyCanSplit) {
                            drawCircle(allPossibleThreats[i].x, allPossibleThreats[i].y, splitDangerDistance, 0);
                            drawCircle(allPossibleThreats[i].x, allPossibleThreats[i].y, splitDangerDistance + shiftDistance, 6);
                        } else {
                            drawCircle(allPossibleThreats[i].x, allPossibleThreats[i].y, normalDangerDistance, 3);
                            drawCircle(allPossibleThreats[i].x, allPossibleThreats[i].y, normalDangerDistance + shiftDistance, 6);
                        }

                        if (allPossibleThreats[i].danger && getLastUpdate() - allPossibleThreats[i].dangerTimeOut > 1000) {

                            allPossibleThreats[i].danger = false;
                        }

                        /*if ((enemyCanSplit && enemyDistance < splitDangerDistance) ||
                            (!enemyCanSplit && enemyDistance < normalDangerDistance)) {

                            allPossibleThreats[i].danger = true;
                            allPossibleThreats[i].dangerTimeOut = f.getLastUpdate();
                        }*/

                        //console.log("Figured out who was important.");

                        if ((enemyCanSplit && enemyDistance < splitDangerDistance) || (enemyCanSplit && allPossibleThreats[i].danger)) {

                            badAngles.push(this.getAngleRange(player[k], allPossibleThreats[i], i, splitDangerDistance).concat(allPossibleThreats[i].enemyDist));

                        } else if ((!enemyCanSplit && enemyDistance < normalDangerDistance) || (!enemyCanSplit && allPossibleThreats[i].danger)) {

                            badAngles.push(this.getAngleRange(player[k], allPossibleThreats[i], i, normalDangerDistance).concat(allPossibleThreats[i].enemyDist));

                        } else if (enemyCanSplit && enemyDistance < splitDangerDistance + shiftDistance) {
                            var tempOb = this.getAngleRange(player[k], allPossibleThreats[i], i, splitDangerDistance + shiftDistance);
                            var angle1 = tempOb[0];
                            var angle2 = this.rangeToAngle(tempOb);

                            obstacleList.push([[angle1, true], [angle2, false]]);
                        } else if (!enemyCanSplit && enemyDistance < normalDangerDistance + shiftDistance) {
                            var tempOb = this.getAngleRange(player[k], allPossibleThreats[i], i, normalDangerDistance + shiftDistance);
                            var angle1 = tempOb[0];
                            var angle2 = this.rangeToAngle(tempOb);

                            obstacleList.push([[angle1, true], [angle2, false]]);
                        }
                        //console.log("Done with enemy: " + i);
                    }

                    //console.log("Done looking for enemies!");

                    var goodAngles = [];
                    var stupidList = [];

                    for (var i = 0; i < allPossibleViruses.length; i++) {
                        if (player[k].size < allPossibleViruses[i].size) {
                            drawCircle(allPossibleViruses[i].x, allPossibleViruses[i].y, allPossibleViruses[i].size + 10, 3);
                            drawCircle(allPossibleViruses[i].x, allPossibleViruses[i].y, allPossibleViruses[i].size * 2, 6);

                        } else {
                            drawCircle(allPossibleViruses[i].x, allPossibleViruses[i].y, player[k].size + 50, 3);
                            drawCircle(allPossibleViruses[i].x, allPossibleViruses[i].y, player[k].size * 2, 6);
                        }
                    }

                    for (var i = 0; i < allPossibleViruses.length; i++) {
                        var virusDistance = this.computeDistance(allPossibleViruses[i].x, allPossibleViruses[i].y, player[k].x, player[k].y);
                        if (player[k].size < allPossibleViruses[i].size) {
                            if (virusDistance < (allPossibleViruses[i].size * 2)) {
                                var tempOb = this.getAngleRange(player[k], allPossibleViruses[i], i, allPossibleViruses[i].size + 10);
                                var angle1 = tempOb[0];
                                var angle2 = this.rangeToAngle(tempOb);
                                obstacleList.push([[angle1, true], [angle2, false]]);
                            }
                        } else {
                            if (virusDistance < (player[k].size * 2)) {
                                var tempOb = this.getAngleRange(player[k], allPossibleViruses[i], i, player[k].size + 50);
                                var angle1 = tempOb[0];
                                var angle2 = this.rangeToAngle(tempOb);
                                obstacleList.push([[angle1, true], [angle2, false]]);
                            }
                        }
                    }

                    if (badAngles.length > 0) {
                        //NOTE: This is only bandaid wall code. It's not the best way to do it.
                        stupidList = this.addWall(stupidList, player[k]);
                    }

                    for (var i = 0; i < badAngles.length; i++) {
                        var angle1 = badAngles[i][0];
                        var angle2 = this.rangeToAngle(badAngles[i]);
                        stupidList.push([[angle1, true], [angle2, false], badAngles[i][2]]);
                    }

                    //stupidList.push([[45, true], [135, false]]);
                    //stupidList.push([[10, true], [200, false]]);

                    stupidList.sort(function(a, b){
                        //console.log("Distance: " + a[2] + ", " + b[2]);
                        return a[2]-b[2];
                    });

                    //console.log("Added random noob stuff.");

                    var sortedInterList = [];
                    var sortedObList = [];

                    for (var i = 0; i < stupidList.length; i++) {
                        //console.log("Adding to sorted: " + stupidList[i][0][0] + ", " + stupidList[i][1][0]);
                        var tempList = this.addAngle(sortedInterList, stupidList[i]);

                        if (tempList.length == 0) {
                            console.log("MAYDAY IT'S HAPPENING!");
                            break;
                        } else {
                            sortedInterList = tempList;
                        }
                    }

                    for (var i = 0; i < obstacleList.length; i++) {
                        sortedObList = this.addAngle(sortedObList, obstacleList[i]);

                        if (sortedObList.length == 0) {
                            break;
                        }
                    }

                    var offsetI = 0;
                    var obOffsetI = 1;

                    if (sortedInterList.length > 0 && sortedInterList[0][1]) {
                        offsetI = 1;
                    }
                    if (sortedObList.length > 0 && sortedObList[0][1]) {
                        obOffsetI = 0;
                    }

                    var goodAngles = [];
                    var obstacleAngles = [];

                    for (var i = 0; i < sortedInterList.length; i += 2) {
                        var angle1 = sortedInterList[(i + offsetI).mod(sortedInterList.length)][0];
                        var angle2 = sortedInterList[(i + 1 + offsetI).mod(sortedInterList.length)][0];
                        var diff = (angle2 - angle1).mod(360);
                        goodAngles.push([angle1, diff]);
                    }

                    for (var i = 0; i < sortedObList.length; i += 2) {
                        var angle1 = sortedObList[(i + obOffsetI).mod(sortedObList.length)][0];
                        var angle2 = sortedObList[(i + 1 + obOffsetI).mod(sortedObList.length)][0];
                        var diff = (angle2 - angle1).mod(360);
                        obstacleAngles.push([angle1, diff]);
                    }

                    for (var i = 0; i < goodAngles.length; i++) {
                        var line1 = this.followAngle(goodAngles[i][0], player[k].x, player[k].y, 100 + player[k].size);
                        var line2 = this.followAngle((goodAngles[i][0] + goodAngles[i][1]).mod(360), player[k].x, player[k].y, 100 + player[k].size);
                        drawLine(player[k].x, player[k].y, line1[0], line1[1], 1);
                        drawLine(player[k].x, player[k].y, line2[0], line2[1], 1);

                        drawArc(line1[0], line1[1], line2[0], line2[1], player[k].x, player[k].y, 1);

                        //drawPoint(player[0].x, player[0].y, 2, "");

                        drawPoint(line1[0], line1[1], 0, "" + i + ": 0");
                        drawPoint(line2[0], line2[1], 0, "" + i + ": 1");
                    }

                    for (var i = 0; i < obstacleAngles.length; i++) {
                        var line1 = this.followAngle(obstacleAngles[i][0], player[k].x, player[k].y, 50 + player[k].size);
                        var line2 = this.followAngle((obstacleAngles[i][0] + obstacleAngles[i][1]).mod(360), player[k].x, player[k].y, 50 + player[k].size);
                        drawLine(player[k].x, player[k].y, line1[0], line1[1], 6);
                        drawLine(player[k].x, player[k].y, line2[0], line2[1], 6);

                        drawArc(line1[0], line1[1], line2[0], line2[1], player[k].x, player[k].y, 6);

                        //drawPoint(player[0].x, player[0].y, 2, "");

                        drawPoint(line1[0], line1[1], 0, "" + i + ": 0");
                        drawPoint(line2[0], line2[1], 0, "" + i + ": 1");
                    }

                    if (!this.master && goodAngles.length == 0 && (player[k].size * player[k].size / 100) > 50) {
                        //This is the slave mode
                        console.log("Really Going to: " + this.masterLocation);
                        var distance = this.computeDistance(player[k].x, player[k].y, this.masterLocation[0], this.masterLocation[1]);

                        var shiftedAngle = this.shiftAngle(obstacleAngles, this.getAngle(this.masterLocation[0], this.masterLocation[1], player[k].x, player[k].y), [0, 360]);

                        var destination = this.followAngle(shiftedAngle, player[k].x, player[k].y, distance);

                        destinationChoices = destination;
                        drawLine(player[k].x, player[k].y, destination[0], destination[1], 1);
                    } else if (this.toggleFollow && goodAngles.length == 0) {
                        //This is the follow the mouse mode
                        var distance = this.computeDistance(player[k].x, player[k].y, tempPoint[0], tempPoint[1]);

                        var shiftedAngle = this.shiftAngle(obstacleAngles, this.getAngle(tempPoint[0], tempPoint[1], player[k].x, player[k].y), [0, 360]);

                        var destination = this.followAngle(shiftedAngle, player[k].x, player[k].y, distance);

                        destinationChoices = destination;
                        drawLine(player[k].x, player[k].y, destination[0], destination[1], 1);
                        //tempMoveX = destination[0];
                        //tempMoveY = destination[1];

                    } else if (goodAngles.length > 0) {
                        var bIndex = goodAngles[0];
                        var biggest = goodAngles[0][1];
                        for (var i = 1; i < goodAngles.length; i++) {
                            var size = goodAngles[i][1];
                            if (size > biggest) {
                                biggest = size;
                                bIndex = goodAngles[i];
                            }
                        }
                        var perfectAngle = (bIndex[0] + bIndex[1] / 2).mod(360);

                        perfectAngle = this.shiftAngle(obstacleAngles, perfectAngle, bIndex);

                        var line1 = this.followAngle(perfectAngle, player[k].x, player[k].y, verticalDistance());

                        destinationChoices = line1;
                        drawLine(player[k].x, player[k].y, line1[0], line1[1], 7);
                        //tempMoveX = line1[0];
                        //tempMoveY = line1[1];
                    } else if (badAngles.length > 0 && goodAngles == 0) {
                        //When there are enemies around but no good angles
                        //You're likely screwed. (This should never happen.)

                        console.log("Failed");
                        destinationChoices = [tempMoveX, tempMoveY];
                        /*var angleWeights = [] //Put weights on the angles according to enemy distance
                        for (var i = 0; i < allPossibleThreats.length; i++){
                            var dist = this.computeDistance(player[k].x, player[k].y, allPossibleThreats[i].x, allPossibleThreats[i].y);
                            var angle = this.getAngle(allPossibleThreats[i].x, allPossibleThreats[i].y, player[k].x, player[k].y);
                            angleWeights.push([angle,dist]);
                        }
                        var maxDist = 0;
                        var finalAngle = 0;
                        for (var i = 0; i < angleWeights.length; i++){
                            if (angleWeights[i][1] > maxDist){
                                maxDist = angleWeights[i][1];
                                finalAngle = (angleWeights[i][0] + 180).mod(360);
                            }
                        }
                        var line1 = this.followAngle(finalAngle,player[k].x,player[k].y,f.verticalDistance());
                        drawLine(player[k].x, player[k].y, line1[0], line1[1], 2);
                        destinationChoices.push(line1);*/
                    } else if (clusterAllFood.length > 0) {
                        for (var i = 0; i < clusterAllFood.length; i++) {
                            //console.log("mefore: " + clusterAllFood[i][2]);
                            //This is the cost function. Higher is better.

                                var clusterAngle = this.getAngle(clusterAllFood[i][0], clusterAllFood[i][1], player[k].x, player[k].y);

                                clusterAllFood[i][2] = clusterAllFood[i][2] * 6 - this.computeDistance(clusterAllFood[i][0], clusterAllFood[i][1], player[k].x, player[k].y);
                                //console.log("Current Value: " + clusterAllFood[i][2]);

                                //(goodAngles[bIndex][1] / 2 - (Math.abs(perfectAngle - clusterAngle)));

                                clusterAllFood[i][3] = clusterAngle;

                                drawPoint(clusterAllFood[i][0], clusterAllFood[i][1], 1, "");
                                //console.log("After: " + clusterAllFood[i][2]);
                        }

                        var bestFoodI = 0;
                        var bestFood = clusterAllFood[0][2];
                        for (var i = 1; i < clusterAllFood.length; i++) {
                            if (bestFood < clusterAllFood[i][2]) {
                                bestFood = clusterAllFood[i][2];
                                bestFoodI = i;
                            }
                        }

                        //console.log("Best Value: " + clusterAllFood[bestFoodI][2]);

                        var distance = this.computeDistance(player[k].x, player[k].y, clusterAllFood[bestFoodI][0], clusterAllFood[bestFoodI][1]);

                        var shiftedAngle = this.shiftAngle(obstacleAngles, this.getAngle(clusterAllFood[bestFoodI][0], clusterAllFood[bestFoodI][1], player[k].x, player[k].y), [0, 360]);

                        var destination = this.followAngle(shiftedAngle, player[k].x, player[k].y, distance);

                        destinationChoices = destination;
                        //tempMoveX = destination[0];
                        //tempMoveY = destination[1];
                        drawLine(player[k].x, player[k].y, destination[0], destination[1], 1);
                    } else {
                        //If there are no enemies around and no food to eat.
                        destinationChoices = [tempMoveX, tempMoveY];
                    }

                    drawPoint(tempPoint[0], tempPoint[1], tempPoint[2], "");
                    //drawPoint(tempPoint[0], tempPoint[1], tempPoint[2], "" + Math.floor(this.computeDistance(tempPoint[0], tempPoint[1], I, J)));
                    //drawLine(tempPoint[0], tempPoint[1], player[0].x, player[0].y, 6);
                    //console.log("Slope: " + slope(tempPoint[0], tempPoint[1], player[0].x, player[0].y) + " Angle: " + getAngle(tempPoint[0], tempPoint[1], player[0].x, player[0].y) + " Side: " + (getAngle(tempPoint[0], tempPoint[1], player[0].x, player[0].y) - 90).mod(360));
                    tempPoint[2] = 1;

                    //console.log("Done working on blob: " + i);
                }

                //TODO: Find where to go based on destinationChoices.
                /*var dangerFound = false;
                for (var i = 0; i < destinationChoices.length; i++) {
                    if (destinationChoices[i][2]) {
                        dangerFound = true;
                        break;
                    }
                }

                destinationChoices.sort(function(a, b){return b[1] - a[1]});

                if (dangerFound) {
                    for (var i = 0; i < destinationChoices.length; i++) {
                        if (destinationChoices[i][2]) {
                            tempMoveX = destinationChoices[i][0][0];
                            tempMoveY = destinationChoices[i][0][1];
                            break;
                        }
                    }
                } else {
                    tempMoveX = destinationChoices.peek()[0][0];
                    tempMoveY = destinationChoices.peek()[0][1];
                    //console.log("Done " + tempMoveX + ", " + tempMoveY);
                }*/
            }
            //console.log("MOVING RIGHT NOW!");

            //console.log("______Never lied ever in my life.");

            if (this.master) {
                this.masterLocation = destinationChoices;
                this.masterId = player[0].id;
                if (Date.now() - this.lastMasterUpdate > 5000) {
                    var self = this;
                    var query = new Parse.Query(this.MasterLocation);
                    query.equalTo("server", getServer());
                    query.first({
                        success: function(object) {
                            console.log("Done query");
                            if (typeof object != 'undefined') {
                                object.set("location", destinationChoices);
                                object.set("cellId", player[0].id);
                                object.set("server", getServer());
                                console.log("New location saved! " + object.get("location") + " ID: " + player[0].id + " Server: " + getServer());
                                object.save();
                            } else {
                                console.log("We have a problem!");
                                var ml = new self.MasterLocation();
                                ml.set("location", destinationChoices);
                                ml.set("cellId", player[0].id);
                                ml.set("server", getServer());
                                console.log("New location saved! " + ml.get("location") + " ID: " + player[0].id + " Server: " + getServer());
                                ml.save();
                            }
                        },
                        error: function(error) {
                            console.log("Error: " + error.code + " " + error.message);
                        }
                    });
                    this.lastMasterUpdate = Date.now();
                }
            }

            return destinationChoices;
        }
    };
};
window.botList.push(new AposBot());

window.updateBotList(); //This function might not exist yet.

/*The MIT License (MIT)

Copyright (c) 2015 Apostolique

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.*/

// ==UserScript==
// @name        AposBot
// @namespace   AposBot
// @include     http://agar.io/*
// @version     3.631
// @grant       none
// @author      http://www.twitch.tv/apostolique
// ==/UserScript==

var aposBotVersion = 3.631;

//TODO: Team mode
//      Detect when people are merging
//      Split to catch smaller targets
//      Angle based cluster code
//      Better wall code
//      In team mode, make allies be obstacles.

Number.prototype.mod = function(n) {
    return ((this % n) + n) % n;
};

Array.prototype.peek = function() {
    return this[this.length - 1];
};

var sha = "efde0488cc2cc176db48dd23b28a20b90314352b";
function getLatestCommit() {
    window.jQuery.ajax({
            url: "https://api.github.com/repos/apostolique/Agar.io-bot/git/refs/heads/master",
            cache: false,
            dataType: "jsonp"
        }).done(function(data) {
            console.dir(data.data);
            console.log("hmm: " + data.data.object.sha);
            sha = data.data.object.sha;

            function update(prefix, name, url) {
                window.jQuery(document.body).prepend("<div id='" + prefix + "Dialog' style='position: absolute; left: 0px; right: 0px; top: 0px; bottom: 0px; z-index: 100; display: none;'>");
                window.jQuery('#' + prefix + 'Dialog').append("<div id='" + prefix + "Message' style='width: 350px; background-color: #FFFFFF; margin: 100px auto; border-radius: 15px; padding: 5px 15px 5px 15px;'>");
                window.jQuery('#' + prefix + 'Message').append("<h2>UPDATE TIME!!!</h2>");
                window.jQuery('#' + prefix + 'Message').append("<p>Grab the update for: <a id='" + prefix + "Link' href='" + url + "' target=\"_blank\">" + name + "</a></p>");
                window.jQuery('#' + prefix + 'Link').on('click', function() {
                    window.jQuery("#" + prefix + "Dialog").hide();
                    window.jQuery("#" + prefix + "Dialog").remove();
                });
                window.jQuery("#" + prefix + "Dialog").show();
            }

            $.get('https://raw.githubusercontent.com/Apostolique/Agar.io-bot/master/bot.user.js?' + Math.floor((Math.random() * 1000000) + 1), function(data) {
                var latestVersion = data.replace(/(\r\n|\n|\r)/gm,"");
                latestVersion = latestVersion.substring(latestVersion.indexOf("// @version")+11,latestVersion.indexOf("// @grant"));

                latestVersion = parseFloat(latestVersion + 0.0000);
                var myVersion = parseFloat(aposBotVersion + 0.0000); 
                
                if(latestVersion > myVersion)
                {
                    update("aposBot", "bot.user.js", "https://github.com/Apostolique/Agar.io-bot/blob/" + sha + "/bot.user.js/");
                }
                console.log('Current bot.user.js Version: ' + myVersion + " on Github: " + latestVersion);
            });

        }).fail(function() {});
}
getLatestCommit();

console.log("Running Apos Bot!");

var f = window;
var g = window.jQuery;


console.log("Apos Bot!");

window.botList = window.botList || [];

/*function QuickBot() {
    this.name = "QuickBot V1";
    this.keyAction = function(key) {};
    this.displayText = function() {return [];};
    this.mainLoop = function() {
        return [screenToGameX(getMouseX()),
                screenToGameY(getMouseY())];
    };
}

window.botList.push(new QuickBot());*/

function AposBot() {
    this.name = "AposBot " + aposBotVersion;

    this.toggleFollow = false;
    this.keyAction = function(key) {
        if (81 == key.keyCode) {
            console.log("Toggle Follow Mouse!");
            this.toggleFollow = !this.toggleFollow;
        }
    };

    this.displayText = function() {
        return ["Q - Follow Mouse: " + (this.toggleFollow ? "On" : "Off")];
    };

    this.splitDistance = 710;

    //Given an angle value that was gotten from valueAndleBased(),
    //returns a new value that scales it appropriately.
    this.paraAngleValue = function(angleValue, range) {
        return (15 / (range[1])) * (angleValue * angleValue) - (range[1] / 6);
    };

    this.valueAngleBased = function(angle, range) {
        var leftValue = (angle - range[0]).mod(360);
        var rightValue = (this.rangeToAngle(range) - angle).mod(360);

        var bestValue = Math.min(leftValue, rightValue);

        if (bestValue <= range[1]) {
            return this.paraAngleValue(bestValue, range);
        }
        return -1;
    };

    this.computeDistance = function(x1, y1, x2, y2) {
        var xdis = x1 - x2; // <--- FAKE AmS OF COURSE!
        var ydis = y1 - y2;
        var distance = Math.sqrt(xdis * xdis + ydis * ydis);

        return distance;
    };

    this.computeDistanceFromCircleEdge = function(x1, y1, x2, y2, s2) {
        var tempD = this.computeDistance(x1, y1, x2, y2);

        var offsetX = 0;
        var offsetY = 0;

        var ratioX = tempD / (x1 - x2);
        var ratioY = tempD / (y1 - y2);

        offsetX = x1 - (s2 / ratioX);
        offsetY = y1 - (s2 / ratioY);

        drawPoint(offsetX, offsetY, 5, "");

        return this.computeDistance(x2, y2, offsetX, offsetY);
    };

    this.compareSize = function(player1, player2, ratio) {
        if (player1.size * player1.size * ratio < player2.size * player2.size) {
            return true;
        }
        return false;
    },

    this.canSplit = function(player1, player2) {
        return this.compareSize(player1, player2, 2.8) && !this.compareSize(player1, player2, 20);
    };

    this.isItMe = function(player, cell) {
        if (getMode() == ":teams") {
            var currentColor = player[0].color;
            var currentRed = currentColor.substring(1,3);
            var currentGreen = currentColor.substring(3,5);
            var currentBlue = currentColor.substring(5,7);
            
            var currentTeam = this.getTeam(currentRed, currentGreen, currentBlue);

            var cellColor = cell.color;

            var cellRed = cellColor.substring(1,3);
            var cellGreen = cellColor.substring(3,5);
            var cellBlue = cellColor.substring(5,7);

            var cellTeam = this.getTeam(cellRed, cellGreen, cellBlue);

            if (currentTeam == cellTeam && !cell.isVirus()) {
                return true;
            }

            //console.log("COLOR: " + color);

        } else {
            for (var i = 0; i < player.length; i++) {
                if (cell.id == player[i].id) {
                    return true;
                }
            }
        }
        return false;
    };

    this.getTeam = function(red, green, blue) {
        if (red == "ff") {
            return 0;
        } else if (green == "ff") {
            return 1;
        }
        return 2;
    };

    this.isFood = function(blob, cell) {
        if (!cell.isVirus() && this.compareSize(cell, blob, 1.33) || (cell.size <= 13)) {
            return true;
        }
        return false;
    };

    this.isThreat = function(blob, cell) {
        
        if (!cell.isVirus() && this.compareSize(blob, cell, 1.30)) {
            return true;
        }
        return false;
    };

    this.isVirus = function(blob, cell) {
        if (cell.isVirus() && this.compareSize(cell, blob, 1.2)) {
            return true;
        } else if (cell.isVirus() && cell.color.substring(3,5).toLowerCase() != "ff") {
            return true;
        }
        return false;
    };

    this.isSplitTarget = function(that, blob, cell) {
        if (that.canSplit(cell, blob)) {
            return true;
        }
        return false;
    };

    this.getTimeToRemerge = function(mass){
        return ((mass*0.02) + 30);
    };

    this.separateListBasedOnFunction = function(that, listToUse, blob) {
        var foodElementList = [];
        var threatList = [];
        var virusList = [];
        var splitTargetList = [];

        var player = getPlayer();

        Object.keys(listToUse).forEach(function(element, index) {
            var isMe = that.isItMe(player, listToUse[element]);

            if (!isMe) {
                if (that.isFood(blob, listToUse[element]) && listToUse[element].isNotMoving()) {
                    //IT'S FOOD!
                    foodElementList.push(listToUse[element]);

                    
                } else if (that.isThreat(blob, listToUse[element])) {
                    //IT'S DANGER!
                    threatList.push(listToUse[element]);
                } else if (that.isVirus(blob, listToUse[element])) {
                    //IT'S VIRUS!
                    virusList.push(listToUse[element]);
                }
                else if (that.isSplitTarget(that, blob, listToUse[element])) {
                        drawCircle(listToUse[element].x, listToUse[element].y, listToUse[element].size + 50, 7);
                        splitTargetList.push(listToUse[element]);
                        foodElementList.push(listToUse[element]);
                    }
            }/*else if(isMe && (getBlobCount(getPlayer()) > 0)){
                //Attempt to make the other cell follow the mother one
                foodElementList.push(listToUse[element]);
            }*/
        });

        foodList = [];
        for (var i = 0; i < foodElementList.length; i++) {
            foodList.push([foodElementList[i].x, foodElementList[i].y, foodElementList[i].size]);
        }

        return [foodList, threatList, virusList, splitTargetList];
    };

    this.getAll = function(blob) {
        var dotList = [];
        var player = getPlayer();
        var interNodes = getMemoryCells();

        dotList = this.separateListBasedOnFunction(this, interNodes, blob);

        return dotList;
    };

    this.clusterFood = function(foodList, blobSize) {
        var clusters = [];
        var addedCluster = false;

        //1: x
        //2: y
        //3: size or value
        //4: Angle, not set here.

        for (var i = 0; i < foodList.length; i++) {
            for (var j = 0; j < clusters.length; j++) {
                if (this.computeDistance(foodList[i][0], foodList[i][1], clusters[j][0], clusters[j][1]) < blobSize * 1.5) {
                    clusters[j][0] = (foodList[i][0] + clusters[j][0]) / 2;
                    clusters[j][1] = (foodList[i][1] + clusters[j][1]) / 2;
                    clusters[j][2] += foodList[i][2];
                    addedCluster = true;
                    break;
                }
            }
            if (!addedCluster) {
                clusters.push([foodList[i][0], foodList[i][1], foodList[i][2], 0]);
            }
            addedCluster = false;
        }
        return clusters;
    };

    this.getAngle = function(x1, y1, x2, y2) {
        //Handle vertical and horizontal lines.

        if (x1 == x2) {
            if (y1 < y2) {
                return 271;
                //return 89;
            } else {
                return 89;
            }
        }

        return (Math.round(Math.atan2(-(y1 - y2), -(x1 - x2)) / Math.PI * 180 + 180));
    };

    this.slope = function(x1, y1, x2, y2) {
        var m = (y1 - y2) / (x1 - x2);

        return m;
    };

    this.slopeFromAngle = function(degree) {
        if (degree == 270) {
            degree = 271;
        } else if (degree == 90) {
            degree = 91;
        }
        return Math.tan((degree - 180) / 180 * Math.PI);
    };

    //Given two points on a line, finds the slope of a perpendicular line crossing it.
    this.inverseSlope = function(x1, y1, x2, y2) {
        var m = this.slope(x1, y1, x2, y2);
        return (-1) / m;
    };

    //Given a slope and an offset, returns two points on that line.
    this.pointsOnLine = function(slope, useX, useY, distance) {
        var b = useY - slope * useX;
        var r = Math.sqrt(1 + slope * slope);

        var newX1 = (useX + (distance / r));
        var newY1 = (useY + ((distance * slope) / r));
        var newX2 = (useX + ((-distance) / r));
        var newY2 = (useY + (((-distance) * slope) / r));

        return [
            [newX1, newY1],
            [newX2, newY2]
        ];
    };

    this.followAngle = function(angle, useX, useY, distance) {
        var slope = this.slopeFromAngle(angle);
        var coords = this.pointsOnLine(slope, useX, useY, distance);

        var side = (angle - 90).mod(360);
        if (side < 180) {
            return coords[1];
        } else {
            return coords[0];
        }
    };

    //Using a line formed from point a to b, tells if point c is on S side of that line.
    this.isSideLine = function(a, b, c) {
        if ((b[0] - a[0]) * (c[1] - a[1]) - (b[1] - a[1]) * (c[0] - a[0]) > 0) {
            return true;
        }
        return false;
    };

    //angle range2 is within angle range2
    //an Angle is a point and a distance between an other point [5, 40]
    this.angleRangeIsWithin = function(range1, range2) {
        if (range2[0] == (range2[0] + range2[1]).mod(360)) {
            return true;
        }
        //console.log("r1: " + range1[0] + ", " + range1[1] + " ... r2: " + range2[0] + ", " + range2[1]);

        var distanceFrom0 = (range1[0] - range2[0]).mod(360);
        var distanceFrom1 = (range1[1] - range2[0]).mod(360);

        if (distanceFrom0 < range2[1] && distanceFrom1 < range2[1] && distanceFrom0 < distanceFrom1) {
            return true;
        }
        return false;
    };

    this.angleRangeIsWithinInverted = function(range1, range2) {
        var distanceFrom0 = (range1[0] - range2[0]).mod(360);
        var distanceFrom1 = (range1[1] - range2[0]).mod(360);

        if (distanceFrom0 < range2[1] && distanceFrom1 < range2[1] && distanceFrom0 > distanceFrom1) {
            return true;
        }
        return false;
    };

    this.angleIsWithin = function(angle, range) {
        var diff = (this.rangeToAngle(range) - angle).mod(360);
        if (diff >= 0 && diff <= range[1]) {
            return true;
        }
        return false;
    };

    this.rangeToAngle = function(range) {
        return (range[0] + range[1]).mod(360);
    };

    this.anglePair = function(range) {
        return (range[0] + ", " + this.rangeToAngle(range) + " range: " + range[1]);
    };

    this.computeAngleRanges = function(blob1, blob2) {
        var mainAngle = this.getAngle(blob1.x, blob1.y, blob2.x, blob2.y);
        var leftAngle = (mainAngle - 90).mod(360);
        var rightAngle = (mainAngle + 90).mod(360);

        var blob1Left = this.followAngle(leftAngle, blob1.x, blob1.y, blob1.size);
        var blob1Right = this.followAngle(rightAngle, blob1.x, blob1.y, blob1.size);

        var blob2Left = this.followAngle(rightAngle, blob2.x, blob2.y, blob2.size);
        var blob2Right = this.followAngle(leftAngle, blob2.x, blob2.y, blob2.size);

        var blob1AngleLeft = this.getAngle(blob2.x, blob2.y, blob1Left[0], blob1Left[1]);
        var blob1AngleRight = this.getAngle(blob2.x, blob2.y, blob1Right[0], blob1Right[1]);

        var blob2AngleLeft = this.getAngle(blob1.x, blob1.y, blob2Left[0], blob2Left[1]);
        var blob2AngleRight = this.getAngle(blob1.x, blob1.y, blob2Right[0], blob2Right[1]);

        var blob1Range = (blob1AngleRight - blob1AngleLeft).mod(360);
        var blob2Range = (blob2AngleRight - blob2AngleLeft).mod(360);

        var tempLine = this.followAngle(blob2AngleLeft, blob2Left[0], blob2Left[1], 400);
        //drawLine(blob2Left[0], blob2Left[1], tempLine[0], tempLine[1], 0);

        if ((blob1Range / blob2Range) > 1) {
            drawPoint(blob1Left[0], blob1Left[1], 3, "");
            drawPoint(blob1Right[0], blob1Right[1], 3, "");
            drawPoint(blob1.x, blob1.y, 3, "" + blob1Range + ", " + blob2Range + " R: " + (Math.round((blob1Range / blob2Range) * 1000) / 1000));
        }

        //drawPoint(blob2.x, blob2.y, 3, "" + blob1Range);
    };

    this.debugAngle = function(angle, text) {
        var player = getPlayer();
        var line1 = this.followAngle(angle, player[0].x, player[0].y, 300);
        drawLine(player[0].x, player[0].y, line1[0], line1[1], 5);
        drawPoint(line1[0], line1[1], 5, "" + text);
    };

    //TODO: Don't let this function do the radius math.
    this.getEdgeLinesFromPoint = function(blob1, blob2, radius) {
        var px = blob1.x;
        var py = blob1.y;

        var cx = blob2.x;
        var cy = blob2.y;

        //var radius = blob2.size;

        /*if (blob2.isVirus()) {
            radius = blob1.size;
        } else if(canSplit(blob1, blob2)) {
            radius += splitDistance;
        } else {
            radius += blob1.size * 2;
        }*/

        var shouldInvert = false;

        var tempRadius = this.computeDistance(px, py, cx, cy);
        if (tempRadius <= radius) {
            radius = tempRadius - 5;
            shouldInvert = true;
        }

        var dx = cx - px;
        var dy = cy - py;
        var dd = Math.sqrt(dx * dx + dy * dy);
        var a = Math.asin(radius / dd);
        var b = Math.atan2(dy, dx);

        var t = b - a;
        var ta = {
            x: radius * Math.sin(t),
            y: radius * -Math.cos(t)
        };

        t = b + a;
        var tb = {
            x: radius * -Math.sin(t),
            y: radius * Math.cos(t)
        };

        var angleLeft = this.getAngle(cx + ta.x, cy + ta.y, px, py);
        var angleRight = this.getAngle(cx + tb.x, cy + tb.y, px, py);
        var angleDistance = (angleRight - angleLeft).mod(360);

        /*if (shouldInvert) {
            var temp = angleLeft;
            angleLeft = (angleRight + 180).mod(360);
            angleRight = (temp + 180).mod(360);
            angleDistance = (angleRight - angleLeft).mod(360);
        }*/

        return [angleLeft, angleDistance, [cx + tb.x, cy + tb.y],
            [cx + ta.x, cy + ta.y]
        ];
    };

    this.invertAngle = function(range) {
        var angle1 = this.rangeToAngle(badAngles[i]);
        var angle2 = (badAngles[i][0] - angle1).mod(360);
        return [angle1, angle2];
    },

    this.addWall = function(listToUse, blob) {
        //var mapSizeX = Math.abs(f.getMapStartX - f.getMapEndX);
        //var mapSizeY = Math.abs(f.getMapStartY - f.getMapEndY);
        //var distanceFromWallX = mapSizeX/3;
        //var distanceFromWallY = mapSizeY/3;
        var distanceFromWallY = 2000;
        var distanceFromWallX = 2000;
        if (blob.x < getMapStartX() + distanceFromWallX) {
            //LEFT
            //console.log("Left");
            listToUse.push([
                [90, true],
                [270, false], this.computeDistance(getMapStartX(), blob.y, blob.x, blob.y)
            ]);
            var lineLeft = this.followAngle(90, blob.x, blob.y, 190 + blob.size);
            var lineRight = this.followAngle(270, blob.x, blob.y, 190 + blob.size);
            drawLine(blob.x, blob.y, lineLeft[0], lineLeft[1], 5);
            drawLine(blob.x, blob.y, lineRight[0], lineRight[1], 5);
            drawArc(lineLeft[0], lineLeft[1], lineRight[0], lineRight[1], blob.x, blob.y, 5);
        }
        if (blob.y < getMapStartY() + distanceFromWallY) {
            //TOP
            //console.log("TOP");
            listToUse.push([
                [180, true],
                [0, false], this.computeDistance(blob.x, getMapStartY(), blob.x, blob.y)
            ]);
            var lineLeft = this.followAngle(180, blob.x, blob.y, 190 + blob.size);
            var lineRight = this.followAngle(360, blob.x, blob.y, 190 + blob.size);
            drawLine(blob.x, blob.y, lineLeft[0], lineLeft[1], 5);
            drawLine(blob.x, blob.y, lineRight[0], lineRight[1], 5);
            drawArc(lineLeft[0], lineLeft[1], lineRight[0], lineRight[1], blob.x, blob.y, 5);
        }
        if (blob.x > getMapEndX() - distanceFromWallX) {
            //RIGHT
            //console.log("RIGHT");
            listToUse.push([
                [270, true],
                [90, false], this.computeDistance(getMapEndX(), blob.y, blob.x, blob.y)
            ]);
            var lineLeft = this.followAngle(270, blob.x, blob.y, 190 + blob.size);
            var lineRight = this.followAngle(90, blob.x, blob.y, 190 + blob.size);
            drawLine(blob.x, blob.y, lineLeft[0], lineLeft[1], 5);
            drawLine(blob.x, blob.y, lineRight[0], lineRight[1], 5);
            drawArc(lineLeft[0], lineLeft[1], lineRight[0], lineRight[1], blob.x, blob.y, 5);
        }
        if (blob.y > getMapEndY() - distanceFromWallY) {
            //BOTTOM
            //console.log("BOTTOM");
            listToUse.push([
                [0, true],
                [180, false], this.computeDistance(blob.x, getMapEndY(), blob.x, blob.y)
            ]);
            var lineLeft = this.followAngle(0, blob.x, blob.y, 190 + blob.size);
            var lineRight = this.followAngle(180, blob.x, blob.y, 190 + blob.size);
            drawLine(blob.x, blob.y, lineLeft[0], lineLeft[1], 5);
            drawLine(blob.x, blob.y, lineRight[0], lineRight[1], 5);
            drawArc(lineLeft[0], lineLeft[1], lineRight[0], lineRight[1], blob.x, blob.y, 5);
        }
        return listToUse;
    };

    //listToUse contains angles in the form of [angle, boolean].
    //boolean is true when the range is starting. False when it's ending.
    //range = [[angle1, true], [angle2, false]]

    this.getAngleIndex = function(listToUse, angle) {
        if (listToUse.length == 0) {
            return 0;
        }

        for (var i = 0; i < listToUse.length; i++) {
            if (angle <= listToUse[i][0]) {
                return i;
            }
        }

        return listToUse.length;
    };

    this.addAngle = function(listToUse, range) {
        //#1 Find first open element
        //#2 Try to add range1 to the list. If it is within other range, don't add it, set a boolean.
        //#3 Try to add range2 to the list. If it is withing other range, don't add it, set a boolean.

        //TODO: Only add the new range at the end after the right stuff has been removed.

        var newListToUse = listToUse.slice();

        var startIndex = 1;

        if (newListToUse.length > 0 && !newListToUse[0][1]) {
            startIndex = 0;
        }

        var startMark = this.getAngleIndex(newListToUse, range[0][0]);
        var startBool = startMark.mod(2) != startIndex;

        var endMark = this.getAngleIndex(newListToUse, range[1][0]);
        var endBool = endMark.mod(2) != startIndex;

        var removeList = [];

        if (startMark != endMark) {
            //Note: If there is still an error, this would be it.
            var biggerList = 0;
            if (endMark == newListToUse.length) {
                biggerList = 1;
            }

            for (var i = startMark; i < startMark + (endMark - startMark).mod(newListToUse.length + biggerList); i++) {
                removeList.push((i).mod(newListToUse.length));
            }
        } else if (startMark < newListToUse.length && endMark < newListToUse.length) {
            var startDist = (newListToUse[startMark][0] - range[0][0]).mod(360);
            var endDist = (newListToUse[endMark][0] - range[1][0]).mod(360);

            if (startDist < endDist) {
                for (var i = 0; i < newListToUse.length; i++) {
                    removeList.push(i);
                }
            }
        }

        removeList.sort(function(a, b){return b-a;});

        for (var i = 0; i < removeList.length; i++) {
            newListToUse.splice(removeList[i], 1);
        }

        if (startBool) {
            newListToUse.splice(this.getAngleIndex(newListToUse, range[0][0]), 0, range[0]);
        }
        if (endBool) {
            newListToUse.splice(this.getAngleIndex(newListToUse, range[1][0]), 0, range[1]);
        }

        return newListToUse;
    };

    this.getAngleRange = function(blob1, blob2, index, radius) {
        var angleStuff = this.getEdgeLinesFromPoint(blob1, blob2, radius);

        var leftAngle = angleStuff[0];
        var rightAngle = this.rangeToAngle(angleStuff);
        var difference = angleStuff[1];

        drawPoint(angleStuff[2][0], angleStuff[2][1], 3, "");
        drawPoint(angleStuff[3][0], angleStuff[3][1], 3, "");

        //console.log("Adding badAngles: " + leftAngle + ", " + rightAngle + " diff: " + difference);

        var lineLeft = this.followAngle(leftAngle, blob1.x, blob1.y, 150 + blob1.size - index * 10);
        var lineRight = this.followAngle(rightAngle, blob1.x, blob1.y, 150 + blob1.size - index * 10);

        if (blob2.isVirus()) {
            drawLine(blob1.x, blob1.y, lineLeft[0], lineLeft[1], 6);
            drawLine(blob1.x, blob1.y, lineRight[0], lineRight[1], 6);
            drawArc(lineLeft[0], lineLeft[1], lineRight[0], lineRight[1], blob1.x, blob1.y, 6);
        } else if(getCells().hasOwnProperty(blob2.id)) {
            drawLine(blob1.x, blob1.y, lineLeft[0], lineLeft[1], 0);
            drawLine(blob1.x, blob1.y, lineRight[0], lineRight[1], 0);
            drawArc(lineLeft[0], lineLeft[1], lineRight[0], lineRight[1], blob1.x, blob1.y, 0);
        } else {
            drawLine(blob1.x, blob1.y, lineLeft[0], lineLeft[1], 3);
            drawLine(blob1.x, blob1.y, lineRight[0], lineRight[1], 3);
            drawArc(lineLeft[0], lineLeft[1], lineRight[0], lineRight[1], blob1.x, blob1.y, 3);
        }

        return [leftAngle, difference];
    };

    //Given a list of conditions, shift the angle to the closest available spot respecting the range given.
    this.shiftAngle = function(listToUse, angle, range) {
        //TODO: shiftAngle needs to respect the range! DONE?
        for (var i = 0; i < listToUse.length; i++) {
            if (this.angleIsWithin(angle, listToUse[i])) {
                //console.log("Shifting needed!");

                var angle1 = listToUse[i][0];
                var angle2 = this.rangeToAngle(listToUse[i]);

                var dist1 = (angle - angle1).mod(360);
                var dist2 = (angle2 - angle).mod(360);

                if (dist1 < dist2) {
                    if (this.angleIsWithin(angle1, range)) {
                        return angle1;
                    } else {
                        return angle2;
                    }
                } else {
                    if (this.angleIsWithin(angle2, range)) {
                        return angle2;
                    } else {
                        return angle1;
                    }
                }
            }
        }
        //console.log("No Shifting Was needed!");
        return angle;
    };

    /**
     * This is the main bot logic. This is called quite often.
     * @return A 2 dimensional array with coordinates for every cells.  [[x, y], [x, y]]
     */
    this.mainLoop = function() {
        var player = getPlayer();
        var interNodes = getMemoryCells();

        if ( /*!toggle*/ 1) {
            //The following code converts the mouse position into an
            //absolute game coordinate.
            var useMouseX = screenToGameX(getMouseX());
            var useMouseY = screenToGameY(getMouseY());
            tempPoint = [useMouseX, useMouseY, 1];

            //The current destination that the cells were going towards.
            var tempMoveX = getPointX();
            var tempMoveY = getPointY();

            //This variable will be returned at the end.
            //It will contain the destination choices for all the cells.
            //BTW!!! ERROR ERROR ABORT MISSION!!!!!!! READ BELOW -----------
            //
            //SINCE IT'S STUPID NOW TO ASK EACH CELL WHERE THEY WANT TO GO,
            //THE BOT SHOULD SIMPLY PICK ONE AND THAT'S IT, I MEAN WTF....
            var destinationChoices = []; //destination, size, danger

            //Just to make sure the player is alive.
            if (player.length > 0) {

                //Loop through all the player's cells.
                for (var k = 0; k < player.length; k++) {
                    if (true) {
                        drawPoint(player[k].x, player[k].y + player[k].size, 0, "" + (getLastUpdate() - player[k].birth) + " / " + (30000 + (player[k].birthMass * 57) - (getLastUpdate() - player[k].birth)) + " / " + player[k].birthMass);
                    }
                }


                //Loops only for one cell for now.
                for (var k = 0; /*k < player.length*/ k < 1; k++) {

                    //console.log("Working on blob: " + k);

                    drawCircle(player[k].x, player[k].y, player[k].size + this.splitDistance, 5);
                    //drawPoint(player[0].x, player[0].y - player[0].size, 3, "" + Math.floor(player[0].x) + ", " + Math.floor(player[0].y));

                    //var allDots = processEverything(interNodes);

                    //loop through everything that is on the screen and
                    //separate everything in it's own category.
                    var allIsAll = this.getAll(player[k]);

                    //The food stored in element 0 of allIsAll
                    var allPossibleFood = allIsAll[0];
                    //The threats are stored in element 1 of allIsAll
                    var allPossibleThreats = allIsAll[1];
                    //The viruses are stored in element 2 of allIsAll
                    var allPossibleViruses = allIsAll[2];

                    //The bot works by removing angles in which it is too
                    //dangerous to travel towards to.
                    var badAngles = [];
                    var obstacleList = [];

                    var isSafeSpot = true;
                    var isMouseSafe = true;

                    var clusterAllFood = this.clusterFood(allPossibleFood, player[k].size);

                    //console.log("Looking for enemies!");

                    //Loop through all the cells that were identified as threats.
                    for (var i = 0; i < allPossibleThreats.length; i++) {

                        var enemyDistance = this.computeDistanceFromCircleEdge(allPossibleThreats[i].x, allPossibleThreats[i].y, player[k].x, player[k].y, allPossibleThreats[i].size);

                        allPossibleThreats[i].enemyDist = enemyDistance;
                    }

                    /*allPossibleThreats.sort(function(a, b){
                        return a.enemyDist-b.enemyDist;
                    })*/

                    for (var i = 0; i < allPossibleThreats.length; i++) {

                        var enemyDistance = this.computeDistance(allPossibleThreats[i].x, allPossibleThreats[i].y, player[k].x, player[k].y);

                        var splitDangerDistance = allPossibleThreats[i].size + this.splitDistance + 150;

                        var normalDangerDistance = allPossibleThreats[i].size + 150;

                        var shiftDistance = player[k].size;

                        //console.log("Found distance.");

                        var enemyCanSplit = this.canSplit(player[k], allPossibleThreats[i]);
                        var secureDistance = (enemyCanSplit ? splitDangerDistance : normalDangerDistance);
                        
                        for (var j = clusterAllFood.length - 1; j >= 0 ; j--) {
                            if (this.computeDistance(allPossibleThreats[i].x, allPossibleThreats[i].y, clusterAllFood[j][0], clusterAllFood[j][1]) < secureDistance + shiftDistance)
                                clusterAllFood.splice(j, 1);
                        }

                        //console.log("Removed some food.");

                        if (enemyCanSplit) {
                            drawCircle(allPossibleThreats[i].x, allPossibleThreats[i].y, splitDangerDistance, 0);
                            drawCircle(allPossibleThreats[i].x, allPossibleThreats[i].y, splitDangerDistance + shiftDistance, 6);
                        } else {
                            drawCircle(allPossibleThreats[i].x, allPossibleThreats[i].y, normalDangerDistance, 3);
                            drawCircle(allPossibleThreats[i].x, allPossibleThreats[i].y, normalDangerDistance + shiftDistance, 6);
                        }

                        if (allPossibleThreats[i].danger && getLastUpdate() - allPossibleThreats[i].dangerTimeOut > 1000) {

                            allPossibleThreats[i].danger = false;
                        }

                        /*if ((enemyCanSplit && enemyDistance < splitDangerDistance) ||
                            (!enemyCanSplit && enemyDistance < normalDangerDistance)) {

                            allPossibleThreats[i].danger = true;
                            allPossibleThreats[i].dangerTimeOut = f.getLastUpdate();
                        }*/

                        //console.log("Figured out who was important.");

                        if ((enemyCanSplit && enemyDistance < splitDangerDistance) || (enemyCanSplit && allPossibleThreats[i].danger)) {

                            badAngles.push(this.getAngleRange(player[k], allPossibleThreats[i], i, splitDangerDistance).concat(allPossibleThreats[i].enemyDist));

                        } else if ((!enemyCanSplit && enemyDistance < normalDangerDistance) || (!enemyCanSplit && allPossibleThreats[i].danger)) {

                            badAngles.push(this.getAngleRange(player[k], allPossibleThreats[i], i, normalDangerDistance).concat(allPossibleThreats[i].enemyDist));

                        } else if (enemyCanSplit && enemyDistance < splitDangerDistance + shiftDistance) {
                            var tempOb = this.getAngleRange(player[k], allPossibleThreats[i], i, splitDangerDistance + shiftDistance);
                            var angle1 = tempOb[0];
                            var angle2 = this.rangeToAngle(tempOb);

                            obstacleList.push([[angle1, true], [angle2, false]]);
                        } else if (!enemyCanSplit && enemyDistance < normalDangerDistance + shiftDistance) {
                            var tempOb = this.getAngleRange(player[k], allPossibleThreats[i], i, normalDangerDistance + shiftDistance);
                            var angle1 = tempOb[0];
                            var angle2 = this.rangeToAngle(tempOb);

                            obstacleList.push([[angle1, true], [angle2, false]]);
                        }
                        //console.log("Done with enemy: " + i);
                    }

                    //console.log("Done looking for enemies!");

                    var goodAngles = [];
                    var stupidList = [];

                    for (var i = 0; i < allPossibleViruses.length; i++) {
                        if (player[k].size < allPossibleViruses[i].size) {
                            drawCircle(allPossibleViruses[i].x, allPossibleViruses[i].y, allPossibleViruses[i].size + 10, 3);
                            drawCircle(allPossibleViruses[i].x, allPossibleViruses[i].y, allPossibleViruses[i].size * 2, 6);

                        } else {
                            drawCircle(allPossibleViruses[i].x, allPossibleViruses[i].y, player[k].size + 50, 3);
                            drawCircle(allPossibleViruses[i].x, allPossibleViruses[i].y, player[k].size * 2, 6);
                        }
                    }

                    for (var i = 0; i < allPossibleViruses.length; i++) {
                        var virusDistance = this.computeDistance(allPossibleViruses[i].x, allPossibleViruses[i].y, player[k].x, player[k].y);
                        if (player[k].size < allPossibleViruses[i].size) {
                            if (virusDistance < (allPossibleViruses[i].size * 2)) {
                                var tempOb = this.getAngleRange(player[k], allPossibleViruses[i], i, allPossibleViruses[i].size + 10);
                                var angle1 = tempOb[0];
                                var angle2 = this.rangeToAngle(tempOb);
                                obstacleList.push([[angle1, true], [angle2, false]]);
                            }
                        } else {
                            if (virusDistance < (player[k].size * 2)) {
                                var tempOb = this.getAngleRange(player[k], allPossibleViruses[i], i, player[k].size + 50);
                                var angle1 = tempOb[0];
                                var angle2 = this.rangeToAngle(tempOb);
                                obstacleList.push([[angle1, true], [angle2, false]]);
                            }
                        }
                    }

                    if (badAngles.length > 0) {
                        //NOTE: This is only bandaid wall code. It's not the best way to do it.
                        stupidList = this.addWall(stupidList, player[k]);
                    }

                    for (var i = 0; i < badAngles.length; i++) {
                        var angle1 = badAngles[i][0];
                        var angle2 = this.rangeToAngle(badAngles[i]);
                        stupidList.push([[angle1, true], [angle2, false], badAngles[i][2]]);
                    }

                    //stupidList.push([[45, true], [135, false]]);
                    //stupidList.push([[10, true], [200, false]]);

                    stupidList.sort(function(a, b){
                        //console.log("Distance: " + a[2] + ", " + b[2]);
                        return a[2]-b[2];
                    });

                    //console.log("Added random noob stuff.");

                    var sortedInterList = [];
                    var sortedObList = [];

                    for (var i = 0; i < stupidList.length; i++) {
                        //console.log("Adding to sorted: " + stupidList[i][0][0] + ", " + stupidList[i][1][0]);
                        var tempList = this.addAngle(sortedInterList, stupidList[i]);

                        if (tempList.length == 0) {
                            console.log("MAYDAY IT'S HAPPENING!");
                            break;
                        } else {
                            sortedInterList = tempList;
                        }
                    }

                    for (var i = 0; i < obstacleList.length; i++) {
                        sortedObList = this.addAngle(sortedObList, obstacleList[i]);

                        if (sortedObList.length == 0) {
                            break;
                        }
                    }

                    var offsetI = 0;
                    var obOffsetI = 1;

                    if (sortedInterList.length > 0 && sortedInterList[0][1]) {
                        offsetI = 1;
                    }
                    if (sortedObList.length > 0 && sortedObList[0][1]) {
                        obOffsetI = 0;
                    }

                    var goodAngles = [];
                    var obstacleAngles = [];

                    for (var i = 0; i < sortedInterList.length; i += 2) {
                        var angle1 = sortedInterList[(i + offsetI).mod(sortedInterList.length)][0];
                        var angle2 = sortedInterList[(i + 1 + offsetI).mod(sortedInterList.length)][0];
                        var diff = (angle2 - angle1).mod(360);
                        goodAngles.push([angle1, diff]);
                    }

                    for (var i = 0; i < sortedObList.length; i += 2) {
                        var angle1 = sortedObList[(i + obOffsetI).mod(sortedObList.length)][0];
                        var angle2 = sortedObList[(i + 1 + obOffsetI).mod(sortedObList.length)][0];
                        var diff = (angle2 - angle1).mod(360);
                        obstacleAngles.push([angle1, diff]);
                    }

                    for (var i = 0; i < goodAngles.length; i++) {
                        var line1 = this.followAngle(goodAngles[i][0], player[k].x, player[k].y, 100 + player[k].size);
                        var line2 = this.followAngle((goodAngles[i][0] + goodAngles[i][1]).mod(360), player[k].x, player[k].y, 100 + player[k].size);
                        drawLine(player[k].x, player[k].y, line1[0], line1[1], 1);
                        drawLine(player[k].x, player[k].y, line2[0], line2[1], 1);

                        drawArc(line1[0], line1[1], line2[0], line2[1], player[k].x, player[k].y, 1);

                        //drawPoint(player[0].x, player[0].y, 2, "");

                        drawPoint(line1[0], line1[1], 0, "" + i + ": 0");
                        drawPoint(line2[0], line2[1], 0, "" + i + ": 1");
                    }

                    for (var i = 0; i < obstacleAngles.length; i++) {
                        var line1 = this.followAngle(obstacleAngles[i][0], player[k].x, player[k].y, 50 + player[k].size);
                        var line2 = this.followAngle((obstacleAngles[i][0] + obstacleAngles[i][1]).mod(360), player[k].x, player[k].y, 50 + player[k].size);
                        drawLine(player[k].x, player[k].y, line1[0], line1[1], 6);
                        drawLine(player[k].x, player[k].y, line2[0], line2[1], 6);

                        drawArc(line1[0], line1[1], line2[0], line2[1], player[k].x, player[k].y, 6);

                        //drawPoint(player[0].x, player[0].y, 2, "");

                        drawPoint(line1[0], line1[1], 0, "" + i + ": 0");
                        drawPoint(line2[0], line2[1], 0, "" + i + ": 1");
                    }

                    if (this.toggleFollow && goodAngles.length == 0) {
                        //This is the follow the mouse mode
                        var distance = this.computeDistance(player[k].x, player[k].y, tempPoint[0], tempPoint[1]);

                        var shiftedAngle = this.shiftAngle(obstacleAngles, this.getAngle(tempPoint[0], tempPoint[1], player[k].x, player[k].y), [0, 360]);

                        var destination = this.followAngle(shiftedAngle, player[k].x, player[k].y, distance);

                        destinationChoices = destination;
                        drawLine(player[k].x, player[k].y, destination[0], destination[1], 1);
                        //tempMoveX = destination[0];
                        //tempMoveY = destination[1];

                    } else if (goodAngles.length > 0) {
                        var bIndex = goodAngles[0];
                        var biggest = goodAngles[0][1];
                        for (var i = 1; i < goodAngles.length; i++) {
                            var size = goodAngles[i][1];
                            if (size > biggest) {
                                biggest = size;
                                bIndex = goodAngles[i];
                            }
                        }
                        var perfectAngle = (bIndex[0] + bIndex[1] / 2).mod(360);

                        perfectAngle = this.shiftAngle(obstacleAngles, perfectAngle, bIndex);

                        var line1 = this.followAngle(perfectAngle, player[k].x, player[k].y, verticalDistance());

                        destinationChoices = line1;
                        drawLine(player[k].x, player[k].y, line1[0], line1[1], 7);
                        //tempMoveX = line1[0];
                        //tempMoveY = line1[1];
                    } else if (badAngles.length > 0 && goodAngles == 0) {
                        //When there are enemies around but no good angles
                        //You're likely screwed. (This should never happen.)

                        console.log("Failed");
                        destinationChoices = [tempMoveX, tempMoveY];
                        /*var angleWeights = [] //Put weights on the angles according to enemy distance
                        for (var i = 0; i < allPossibleThreats.length; i++){
                            var dist = this.computeDistance(player[k].x, player[k].y, allPossibleThreats[i].x, allPossibleThreats[i].y);
                            var angle = this.getAngle(allPossibleThreats[i].x, allPossibleThreats[i].y, player[k].x, player[k].y);
                            angleWeights.push([angle,dist]);
                        }
                        var maxDist = 0;
                        var finalAngle = 0;
                        for (var i = 0; i < angleWeights.length; i++){
                            if (angleWeights[i][1] > maxDist){
                                maxDist = angleWeights[i][1];
                                finalAngle = (angleWeights[i][0] + 180).mod(360);
                            }
                        }
                        var line1 = this.followAngle(finalAngle,player[k].x,player[k].y,f.verticalDistance());
                        drawLine(player[k].x, player[k].y, line1[0], line1[1], 2);
                        destinationChoices.push(line1);*/
                    } else if (clusterAllFood.length > 0) {
                        for (var i = 0; i < clusterAllFood.length; i++) {
                            //console.log("mefore: " + clusterAllFood[i][2]);
                            //This is the cost function. Higher is better.

                                var clusterAngle = this.getAngle(clusterAllFood[i][0], clusterAllFood[i][1], player[k].x, player[k].y);

                                clusterAllFood[i][2] = clusterAllFood[i][2] * 6 - this.computeDistance(clusterAllFood[i][0], clusterAllFood[i][1], player[k].x, player[k].y);
                                //console.log("Current Value: " + clusterAllFood[i][2]);

                                //(goodAngles[bIndex][1] / 2 - (Math.abs(perfectAngle - clusterAngle)));

                                clusterAllFood[i][3] = clusterAngle;

                                drawPoint(clusterAllFood[i][0], clusterAllFood[i][1], 1, "");
                                //console.log("After: " + clusterAllFood[i][2]);
                        }

                        var bestFoodI = 0;
                        var bestFood = clusterAllFood[0][2];
                        for (var i = 1; i < clusterAllFood.length; i++) {
                            if (bestFood < clusterAllFood[i][2]) {
                                bestFood = clusterAllFood[i][2];
                                bestFoodI = i;
                            }
                        }

                        //console.log("Best Value: " + clusterAllFood[bestFoodI][2]);

                        var distance = this.computeDistance(player[k].x, player[k].y, clusterAllFood[bestFoodI][0], clusterAllFood[bestFoodI][1]);

                        var shiftedAngle = this.shiftAngle(obstacleAngles, this.getAngle(clusterAllFood[bestFoodI][0], clusterAllFood[bestFoodI][1], player[k].x, player[k].y), [0, 360]);

                        var destination = this.followAngle(shiftedAngle, player[k].x, player[k].y, distance);

                        destinationChoices = destination;
                        //tempMoveX = destination[0];
                        //tempMoveY = destination[1];
                        drawLine(player[k].x, player[k].y, destination[0], destination[1], 1);
                    } else {
                        //If there are no enemies around and no food to eat.
                        destinationChoices = [tempMoveX, tempMoveY];
                    }

                    drawPoint(tempPoint[0], tempPoint[1], tempPoint[2], "");
                    //drawPoint(tempPoint[0], tempPoint[1], tempPoint[2], "" + Math.floor(this.computeDistance(tempPoint[0], tempPoint[1], I, J)));
                    //drawLine(tempPoint[0], tempPoint[1], player[0].x, player[0].y, 6);
                    //console.log("Slope: " + slope(tempPoint[0], tempPoint[1], player[0].x, player[0].y) + " Angle: " + getAngle(tempPoint[0], tempPoint[1], player[0].x, player[0].y) + " Side: " + (getAngle(tempPoint[0], tempPoint[1], player[0].x, player[0].y) - 90).mod(360));
                    tempPoint[2] = 1;

                    //console.log("Done working on blob: " + i);
                }

                //TODO: Find where to go based on destinationChoices.
                /*var dangerFound = false;
                for (var i = 0; i < destinationChoices.length; i++) {
                    if (destinationChoices[i][2]) {
                        dangerFound = true;
                        break;
                    }
                }

                destinationChoices.sort(function(a, b){return b[1] - a[1]});

                if (dangerFound) {
                    for (var i = 0; i < destinationChoices.length; i++) {
                        if (destinationChoices[i][2]) {
                            tempMoveX = destinationChoices[i][0][0];
                            tempMoveY = destinationChoices[i][0][1];
                            break;
                        }
                    }
                } else {
                    tempMoveX = destinationChoices.peek()[0][0];
                    tempMoveY = destinationChoices.peek()[0][1];
                    //console.log("Done " + tempMoveX + ", " + tempMoveY);
                }*/
            }
            //console.log("MOVING RIGHT NOW!");

            //console.log("______Never lied ever in my life.");

            return destinationChoices;
        }
    };
};
window.botList.push(new AposBot());

window.updateBotList(); //This function might not exist yet.

/*The MIT License (MIT)
Copyright (c) 2015 Apostolique
Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.*/
// ==UserScript==
// @name        AposLauncher
// @namespace   AposLauncher
// @include     http://agar.io/*
// @version     4.13
// @grant       none
// @author      http://www.twitch.tv/apostolique
// ==/UserScript==
var aposLauncherVersion = 4.13;

Number.prototype.mod = function(n) {
    return ((this % n) + n) % n;
};

Array.prototype.peek = function() {
    return this[this.length - 1];
};

var sha = "efde0488cc2cc176db48dd23b28a20b90314352b";

function getLatestCommit() {
    window.jQuery.ajax({
        url: "https://api.github.com/repos/apostolique/Agar.io-bot/git/refs/heads/master",
        cache: false,
        dataType: "jsonp"
    }).done(function(data) {
        console.dir(data.data);
        console.log("hmm: " + data.data.object.sha);
        sha = data.data.object.sha;

        function update(prefix, name, url) {
            window.jQuery(document.body).prepend("<div id='" + prefix + "Dialog' style='position: absolute; left: 0px; right: 0px; top: 0px; bottom: 0px; z-index: 100; display: none;'>");
            window.jQuery('#' + prefix + 'Dialog').append("<div id='" + prefix + "Message' style='width: 350px; background-color: #FFFFFF; margin: 100px auto; border-radius: 15px; padding: 5px 15px 5px 15px;'>");
            window.jQuery('#' + prefix + 'Message').append("<h2>UPDATE TIME!!!</h2>");
            window.jQuery('#' + prefix + 'Message').append("<p>Grab the update for: <a id='" + prefix + "Link' href='" + url + "' target=\"_blank\">" + name + "</a></p>");
            window.jQuery('#' + prefix + 'Link').on('click', function() {
                window.jQuery("#" + prefix + "Dialog").hide();
                window.jQuery("#" + prefix + "Dialog").remove();
            });
            window.jQuery("#" + prefix + "Dialog").show();
        }

        window.jQuery.get('https://raw.githubusercontent.com/Apostolique/Agar.io-bot/master/launcher.user.js?' + Math.floor((Math.random() * 1000000) + 1), function(data) {
            var latestVersion = data.replace(/(\r\n|\n|\r)/gm, "");
            latestVersion = latestVersion.substring(latestVersion.indexOf("// @version") + 11, latestVersion.indexOf("// @grant"));

            latestVersion = parseFloat(latestVersion + 0.0000);
            var myVersion = parseFloat(aposLauncherVersion + 0.0000);

            if (latestVersion > myVersion) {
                update("aposLauncher", "launcher.user.js", "https://github.com/Apostolique/Agar.io-bot/blob/" + sha + "/launcher.user.js/");
            }
            console.log('Current launcher.user.js Version: ' + myVersion + " on Github: " + latestVersion);
        });

    }).fail(function() {});
}
getLatestCommit();

console.log("Running Bot Launcher!");
(function(d, e) {

    //UPDATE
    function keyAction(e) {
        if (84 == e.keyCode) {
            console.log("Toggle");
            toggle = !toggle;
        }
        if (82 == e.keyCode) {
            console.log("ToggleDraw");
            toggleDraw = !toggleDraw;
        }
        if (68 == e.keyCode) {
            window.setDarkTheme(!getDarkBool());
        }
        if (70 == e.keyCode) {
            window.setShowMass(!getMassBool());
        }
        if (69 == e.keyCode) {
            if (message.length > 0) {
                window.setMessage([]);
                window.onmouseup = function() {};
                window.ignoreStream = true;
            } else {
                window.ignoreStream = false;
                window.refreshTwitch();
            }
        }
        window.botList[botIndex].keyAction(e);
    }

    function humanPlayer() {
        //Don't need to do anything.
        return [getPointX(), getPointY()];
    }



    function pb() {

        //UPDATE

        window.botList = window.botList || [];

        window.jQuery('#nick').val(originalName);

        function HumanPlayerObject() {
            this.name = "Human";
            this.keyAction = function(key) {};
            this.displayText = function() {
                return [];
            };
            this.mainLoop = humanPlayer;
        }

        var hpo = new HumanPlayerObject();

        window.botList.push(hpo);

        window.updateBotList();

        ya = !0;
        Pa();
        setInterval(Pa, 18E4);

        var father = window.jQuery("#canvas").parent();
        window.jQuery("#canvas").remove();
        father.prepend("<canvas id='canvas'>");

        G = za = document.getElementById("canvas");
        f = G.getContext("2d");
        G.onmousedown = function(a) {
            if (Qa) {
                var b = a.clientX - (5 + m / 5 / 2),
                    c = a.clientY - (5 + m / 5 / 2);
                if (Math.sqrt(b * b + c * c) <= m / 5 / 2) {
                    V();
                    H(17);
                    return
                }
            }
            fa = a.clientX;
            ga = a.clientY;
            Aa();
            V();
        };
        G.onmousemove = function(a) {
            fa = a.clientX;
            ga = a.clientY;
            Aa();
        };
        G.onmouseup = function() {};
        /firefox/i.test(navigator.userAgent) ? document.addEventListener("DOMMouseScroll", Ra, !1) : document.body.onmousewheel = Ra;
        var a = !1,
            b = !1,
            c = !1;
        d.onkeydown = function(l) {
            //UPDATE
            if (!window.jQuery('#nick').is(":focus")) {
                32 != l.keyCode || a || (V(), H(17), a = !0);
                81 != l.keyCode || b || (H(18), b = !0);
                87 != l.keyCode || c || (V(), H(21), c = !0);
                27 == l.keyCode && Sa(!0);

                //UPDATE
                keyAction(l);
            }
        };
        d.onkeyup = function(l) {
            32 == l.keyCode && (a = !1);
            87 == l.keyCode && (c = !1);
            81 == l.keyCode && b && (H(19), b = !1);
        };
        d.onblur = function() {
            H(19);
            c = b = a = !1
        };
        d.onresize = Ta;
        d.requestAnimationFrame(Ua);
        setInterval(V, 40);
        y && e("#region").val(y);
        Va();
        ha(e("#region").val());
        0 == Ba && y && I();
        W = !0;
        e("#overlays").show();
        Ta();
        d.location.hash && 6 <= d.location.hash.length && Wa(d.location.hash)
    }

    function Ra(a) {
        J *= Math.pow(.9, a.wheelDelta / -120 || a.detail || 0);
        //UPDATE
        0.07 > J && (J = 0.07);
        J > 4 / h && (J = 4 / h)
    }

    function qb() {
        if (.4 > h) X = null;
        else {
            for (var a = Number.POSITIVE_INFINITY, b = Number.POSITIVE_INFINITY, c = Number.NEGATIVE_INFINITY, l = Number.NEGATIVE_INFINITY, d = 0, p = 0; p < v.length; p++) {
                var g = v[p];
                !g.N() || g.R || 20 >= g.size * h || (d = Math.max(g.size, d), a = Math.min(g.x, a), b = Math.min(g.y, b), c = Math.max(g.x, c), l = Math.max(g.y, l))
            }
            X = rb.ka({
                ca: a - 10,
                da: b - 10,
                oa: c + 10,
                pa: l + 10,
                ma: 2,
                na: 4
            });
            for (p = 0; p < v.length; p++)
                if (g = v[p],
                    g.N() && !(20 >= g.size * h))
                    for (a = 0; a < g.a.length; ++a) b = g.a[a].x, c = g.a[a].y, b < s - m / 2 / h || c < t - r / 2 / h || b > s + m / 2 / h || c > t + r / 2 / h || X.m(g.a[a])
        }
    }

    function Aa() {
        //UPDATE
        if (toggle || window.botList[botIndex].name == "Human") {
            setPoint(((fa - m / 2) / h + s), ((ga - r / 2) / h + t));
        }
    }

    function Pa() {
        null == ka && (ka = {}, e("#region").children().each(function() {
            var a = e(this),
                b = a.val();
            b && (ka[b] = a.text())
        }));
        e.get(ap + "info", function(a) {
                var b = {},
                    c;
                for (c in a.regions) {
                    var l = c.split(":")[0];
                    b[l] = b[l] || 0;
                    b[l] += a.regions[c].numPlayers
                }
                for (c in b) e('#region option[value="' + c + '"]').text(ka[c] + " (" + b[c] + " players)")
            },
            "json")
    }

    function Xa() {
        e("#adsBottom").hide();
        e("#overlays").hide();
        W = !1;
        Va();
        d.googletag && d.googletag.pubads && d.googletag.pubads().clear(d.aa)
    }

    function ha(a) {
        a && a != y && (e("#region").val() != a && e("#region").val(a), y = d.localStorage.location = a, e(".region-message").hide(), e(".region-message." + a).show(), e(".btn-needs-server").prop("disabled", !1), ya && I())
    }

    function Sa(a) {
        W || (K = null, sb(), a && (x = 1), W = !0, e("#overlays").fadeIn(a ? 200 : 3E3))
    }

    function Y(a) {
        e("#helloContainer").attr("data-gamemode", a);
        P = a;
        e("#gamemode").val(a)
    }

    function Va() {
        e("#region").val() ? d.localStorage.location = e("#region").val() : d.localStorage.location && e("#region").val(d.localStorage.location);
        e("#region").val() ? e("#locationKnown").append(e("#region")) : e("#locationUnknown").append(e("#region"))
    }

    function sb() {
        la && (la = !1, setTimeout(function() {
            la = !0
                //UPDATE
        }, 6E4 * Ya))
    }

    function Z(a) {
        return d.i18n[a] || d.i18n_dict.en[a] || a
    }

    function Za() {
        var a = ++Ba;
        console.log("Find " + y + P);
        e.ajax(ap + "findServer", {
            error: function() {
                setTimeout(Za, 1E3)
            },
            success: function(b) {
                a == Ba && (b.alert && alert(b.alert), Ca("ws://" + b.ip, b.token))
            },
            dataType: "json",
            method: "POST",
            cache: !1,
            crossDomain: !0,
            data: (y + P || "?") + "\n154669603"
        })
    }

    function I() {
        ya && y && (e("#connecting").show(), Za())
    }

    function Ca(a, b) {
        if (q) {
            q.onopen = null;
            q.onmessage = null;
            q.onclose = null;
            try {
                q.close()
            } catch (c) {}
            q = null
        }
        Da.ip && (a = "ws://" + Da.ip);
        if (null != L) {
            var l = L;
            L = function() {
                l(b)
            }
        }
        if (tb) {
            var d = a.split(":");
            a = d[0] + "s://ip-" + d[1].replace(/\./g, "-").replace(/\//g, "") + ".tech.agar.io:" + +d[2]
        }
        M = [];
        k = [];
        E = {};
        v = [];
        Q = [];
        F = [];
        z = A = null;
        R = 0;
        $ = !1;
        console.log("Connecting to " + a);
        //UPDATE
        serverIP = a;
        q = new WebSocket(a);
        q.binaryType = "arraybuffer";
        q.onopen = function() {
            var a;
            console.log("socket open");
            a = N(5);
            a.setUint8(0, 254);
            a.setUint32(1, 5, !0);
            O(a);
            a = N(5);
            a.setUint8(0, 255);
            a.setUint32(1, 154669603, !0);
            O(a);
            a = N(1 + b.length);
            a.setUint8(0, 80);
            for (var c = 0; c < b.length; ++c) a.setUint8(c + 1, b.charCodeAt(c));
            O(a);
            $a()
        };
        q.onmessage = ub;
        q.onclose = vb;
        q.onerror = function() {
            console.log("socket error")
        }
    }

    function N(a) {
        return new DataView(new ArrayBuffer(a))
    }

    function O(a) {
        q.send(a.buffer)
    }

    function vb() {
        $ && (ma = 500);
        console.log("socket close");
        setTimeout(I, ma);
        ma *= 2
    }

    function ub(a) {
        wb(new DataView(a.data))
    }

    function wb(a) {
        function b() {
            for (var b = "";;) {
                var d = a.getUint16(c, !0);
                c += 2;
                if (0 == d) break;
                b += String.fromCharCode(d)
            }
            return b
        }
        var c = 0;
        240 == a.getUint8(c) && (c += 5);
        switch (a.getUint8(c++)) {
            case 16:
                xb(a, c);
                break;
            case 17:
                aa = a.getFloat32(c, !0);
                c += 4;
                ba = a.getFloat32(c, !0);
                c += 4;
                ca = a.getFloat32(c, !0);
                c += 4;
                break;
            case 20:
                k = [];
                M = [];
                break;
            case 21:
                Ea = a.getInt16(c, !0);
                c += 2;
                Fa = a.getInt16(c, !0);
                c += 2;
                Ga || (Ga = !0, na = Ea, oa = Fa);
                break;
            case 32:
                M.push(a.getUint32(c, !0));
                c += 4;
                break;
            case 49:
                if (null != A) break;
                var l = a.getUint32(c, !0),
                    c = c + 4;
                F = [];
                for (var d = 0; d < l; ++d) {
                    var p = a.getUint32(c, !0),
                        c = c + 4;
                    F.push({
                        id: p,
                        name: b()
                    })
                }
                ab();
                break;
            case 50:
                A = [];
                l = a.getUint32(c, !0);
                c += 4;
                for (d = 0; d < l; ++d) A.push(a.getFloat32(c, !0)), c += 4;
                ab();
                break;
            case 64:
                pa = a.getFloat64(c, !0);
                c += 8;
                qa = a.getFloat64(c, !0);
                c += 8;
                ra = a.getFloat64(c, !0);
                c += 8;
                sa = a.getFloat64(c, !0);
                c += 8;
                aa = (ra + pa) / 2;
                ba = (sa + qa) / 2;
                ca = 1;
                0 == k.length && (s = aa, t = ba, h = ca);
                break;
            case 81:
                var g = a.getUint32(c, !0),
                    c = c + 4,
                    e = a.getUint32(c, !0),
                    c = c + 4,
                    f = a.getUint32(c, !0),
                    c = c + 4;
                setTimeout(function() {
                    S({
                        e: g,
                        f: e,
                        d: f
                    })
                }, 1200)
        }
    }

    function xb(a, b) {
        bb = C = Date.now();
        $ || ($ = !0, e("#connecting").hide(), cb(), L && (L(), L = null));
        var c = Math.random();
        Ha = !1;
        var d = a.getUint16(b, !0);
        b += 2;
        for (var u = 0; u < d; ++u) {
            var p = E[a.getUint32(b, !0)],
                g = E[a.getUint32(b + 4, !0)];
            b += 8;
            p && g && (g.X(), g.s = g.x, g.t = g.y, g.r = g.size, g.J = p.x, g.K = p.y, g.q = g.size, g.Q =
                C)
        }
        for (u = 0;;) {
            d = a.getUint32(b, !0);
            b += 4;
            if (0 == d) break;
            ++u;
            var f, p = a.getInt16(b, !0);
            b += 4;
            g = a.getInt16(b, !0);
            b += 4;
            f = a.getInt16(b, !0);
            b += 2;
            for (var h = a.getUint8(b++), w = a.getUint8(b++), m = a.getUint8(b++), h = (h << 16 | w << 8 | m).toString(16); 6 > h.length;) h = "0" + h;
            var h = "#" + h,
                w = a.getUint8(b++),
                m = !!(w & 1),
                r = !!(w & 16);
            w & 2 && (b += 4);
            w & 4 && (b += 8);
            w & 8 && (b += 16);
            for (var q, n = "";;) {
                q = a.getUint16(b, !0);
                b += 2;
                if (0 == q) break;
                n += String.fromCharCode(q)
            }
            q = n;
            n = null;
            E.hasOwnProperty(d) ? (n = E[d], n.P(), n.s = n.x, n.t = n.y, n.r = n.size, n.color = h) :
                (n = new da(d, p, g, f, h, q), v.push(n), E[d] = n, n.ua = p, n.va = g);
            n.h = m;
            n.n = r;
            n.J = p;
            n.K = g;
            n.q = f;
            n.sa = c;
            n.Q = C;
            n.ba = w;
            q && n.B(q); - 1 != M.indexOf(d) && -1 == k.indexOf(n) && (document.getElementById("overlays").style.display = "none", k.push(n), n.birth = getLastUpdate(), n.birthMass = (n.size * n.size / 100), 1 == k.length && (s = n.x, t = n.y, db()))

            //UPDATE
            interNodes[d] = window.getCells()[d];
        }

        //UPDATE
        Object.keys(interNodes).forEach(function(element, index) {
            //console.log("start: " + interNodes[element].updateTime + " current: " + D + " life: " + (D - interNodes[element].updateTime));
            var isRemoved = !window.getCells().hasOwnProperty(element);

            //console.log("Time not updated: " + (window.getLastUpdate() - interNodes[element].getUptimeTime()));
            if (isRemoved && (window.getLastUpdate() - interNodes[element].getUptimeTime()) > 3000) {
                delete interNodes[element];
            } else {
                for (var i = 0; i < getPlayer().length; i++) {
                    if (isRemoved && computeDistance(getPlayer()[i].x, getPlayer()[i].y, interNodes[element].x, interNodes[element].y) < getPlayer()[i].size + 710) {

                        delete interNodes[element];
                        break;
                    }
                }
            }
        });

        c = a.getUint32(b, !0);
        b += 4;
        for (u = 0; u < c; u++) d = a.getUint32(b, !0), b += 4, n = E[d], null != n && n.X();
        //UPDATE
        //Ha && 0 == k.length && Sa(!1)
    }

    //UPDATE
    function computeDistance(x1, y1, x2, y2) {
        var xdis = x1 - x2; // <--- FAKE AmS OF COURSE!
        var ydis = y1 - y2;
        var distance = Math.sqrt(xdis * xdis + ydis * ydis);

        return distance;
    }

    /**
     * Some horse shit of some sort.
     * @return Horse Shit
     */
    function screenDistance() {
        return Math.min(computeDistance(getOffsetX(), getOffsetY(), screenToGameX(getWidth()), getOffsetY()), computeDistance(getOffsetX(), getOffsetY(), getOffsetX(), screenToGameY(getHeight())));
    }

    window.verticalDistance = function() {
        return computeDistance(screenToGameX(0), screenToGameY(0), screenToGameX(getWidth()), screenToGameY(getHeight()));
    }

    /**
     * A conversion from the screen's horizontal coordinate system
     * to the game's horizontal coordinate system.
     * @param x in the screen's coordinate system
     * @return x in the game's coordinate system
     */
    window.screenToGameX = function(x) {
        return (x - getWidth() / 2) / getRatio() + getX();
    }

    /**
     * A conversion from the screen's vertical coordinate system
     * to the game's vertical coordinate system.
     * @param y in the screen's coordinate system
     * @return y in the game's coordinate system
     */
    window.screenToGameY = function(y) {
        return (y - getHeight() / 2) / getRatio() + getY();
    }

    window.drawPoint = function(x_1, y_1, drawColor, text) {
        if (!toggleDraw) {
            dPoints.push([x_1, y_1, drawColor]);
            dText.push(text);
        }
    }

    window.drawArc = function(x_1, y_1, x_2, y_2, x_3, y_3, drawColor) {
        if (!toggleDraw) {
            var radius = computeDistance(x_1, y_1, x_3, y_3);
            dArc.push([x_1, y_1, x_2, y_2, x_3, y_3, radius, drawColor]);
        }
    }

    window.drawLine = function(x_1, y_1, x_2, y_2, drawColor) {
        if (!toggleDraw) {
            lines.push([x_1, y_1, x_2, y_2, drawColor]);
        }
    }

    window.drawCircle = function(x_1, y_1, radius, drawColor) {
        if (!toggleDraw) {
            circles.push([x_1, y_1, radius, drawColor]);
        }
    }

    function V() {

        //UPDATE
        if (getPlayer().length == 0 && !reviving && ~~(getCurrentScore() / 100) > 0) {
            console.log("Dead: " + ~~(getCurrentScore() / 100));
            apos('send', 'pageview');
        }

        if (getPlayer().length == 0) {
            console.log("Revive");
            setNick(originalName);
            reviving = true;
        } else if (getPlayer().length > 0 && reviving) {
            reviving = false;
            console.log("Done Reviving!");
        }

        if (T()) {
            var a = fa - m / 2;
            var b = ga - r / 2;
            64 > a * a + b * b || .01 > Math.abs(eb - ia) &&
                .01 > Math.abs(fb - ja) || (eb = ia, fb = ja, a = N(13), a.setUint8(0, 16), a.setInt32(1, ia, !0), a.setInt32(5, ja, !0), a.setUint32(9, 0, !0), O(a))
        }
    }

    function cb() {
        if (T() && $ && null != K) {
            var a = N(1 + 2 * K.length);
            a.setUint8(0, 0);
            for (var b = 0; b < K.length; ++b) a.setUint16(1 + 2 * b, K.charCodeAt(b), !0);
            O(a)
        }
    }

    function T() {
        return null != q && q.readyState == q.OPEN
    }

    window.opCode = function(a) {
        console.log("Sending op code.");
        H(parseInt(a));
    }

    function H(a) {
        if (T()) {
            var b = N(1);
            b.setUint8(0, a);
            O(b)
        }
    }

    function $a() {
        if (T() && null != B) {
            var a = N(1 + B.length);
            a.setUint8(0, 81);
            for (var b = 0; b < B.length; ++b) a.setUint8(b + 1, B.charCodeAt(b));
            O(a)
        }
    }

    function Ta() {
        m = d.innerWidth;
        r = d.innerHeight;
        za.width = G.width = m;
        za.height = G.height = r;
        var a = e("#helloContainer");
        a.css("transform", "none");
        var b = a.height(),
            c = d.innerHeight;
        b > c / 1.1 ? a.css("transform", "translate(-50%, -50%) scale(" + c / b / 1.1 + ")") : a.css("transform", "translate(-50%, -50%)");
        gb()
    }

    function hb() {
        var a;
        a = Math.max(r / 1080, m / 1920);
        return a *= J
    }

    function yb() {
        if (0 != k.length) {
            for (var a = 0, b = 0; b < k.length; b++) a += k[b].size;
            a = Math.pow(Math.min(64 / a, 1), .4) * hb();
            h = (9 * h + a) / 10
        }
    }

    function gb() {
        //UPDATE
        dPoints = [];
        circles = [];
        dArc = [];
        dText = [];
        lines = [];


        var a, b = Date.now();
        ++zb;
        C = b;
        if (0 < k.length) {
            yb();
            for (var c = a = 0, d = 0; d < k.length; d++) k[d].P(), a += k[d].x / k.length, c += k[d].y / k.length;
            aa = a;
            ba = c;
            ca = h;
            s = (s + a) / 2;
            t = (t + c) / 2;
        } else s = (29 * s + aa) / 30, t = (29 * t + ba) / 30, h = (9 * h + ca * hb()) / 10;
        qb();
        Aa();
        Ia || f.clearRect(0, 0, m, r);
        Ia ? (f.fillStyle = ta ? "#111111" : "#F2FBFF", f.globalAlpha = .05, f.fillRect(0, 0, m, r), f.globalAlpha = 1) : Ab();
        v.sort(function(a, b) {
            return a.size == b.size ? a.id - b.id : a.size - b.size
        });
        f.save();
        f.translate(m / 2, r / 2);
        f.scale(h, h);
        f.translate(-s, -t);
        //UPDATE
        f.save();
        f.beginPath();
        f.lineWidth = 5;
        f.strokeStyle = (getDarkBool() ? '#F2FBFF' : '#111111');
        f.moveTo(getMapStartX(), getMapStartY());
        f.lineTo(getMapStartX(), getMapEndY());
        f.stroke();
        f.moveTo(getMapStartX(), getMapStartY());
        f.lineTo(getMapEndX(), getMapStartY());
        f.stroke();
        f.moveTo(getMapEndX(), getMapStartY());
        f.lineTo(getMapEndX(), getMapEndY());
        f.stroke();
        f.moveTo(getMapStartX(), getMapEndY());
        f.lineTo(getMapEndX(), getMapEndY());
        f.stroke();
        f.restore();

        for (d = 0; d < v.length; d++) v[d].w(f);
        for (d = 0; d < Q.length; d++) Q[d].w(f);
        //UPDATE
        if (getPlayer().length > 0) {
            var moveLoc = window.botList[botIndex].mainLoop();
            if (!toggle) {
                setPoint(moveLoc[0], moveLoc[1]);
            }
        }
        customRender(f);
        if (Ga) {
            na = (3 * na + Ea) / 4;
            oa = (3 * oa + Fa) / 4;
            f.save();
            f.strokeStyle = "#FFAAAA";
            f.lineWidth = 10;
            f.lineCap = "round";
            f.lineJoin = "round";
            f.globalAlpha = .5;
            f.beginPath();
            for (d = 0; d < k.length; d++) f.moveTo(k[d].x, k[d].y), f.lineTo(na, oa);
            f.stroke();
            f.restore();
        }
        f.restore();
        z && z.width && f.drawImage(z, m - z.width - 10, 10);
        R = Math.max(R, Bb());

        //UPDATE

        var currentDate = new Date();

        var nbSeconds = 0;
        if (getPlayer().length > 0) {
            //nbSeconds = currentDate.getSeconds() + currentDate.getMinutes() * 60 + currentDate.getHours() * 3600 - lifeTimer.getSeconds() - lifeTimer.getMinutes() * 60 - lifeTimer.getHours() * 3600;
            nbSeconds = (currentDate.getTime() - lifeTimer.getTime()) / 1000;
        }

        bestTime = Math.max(nbSeconds, bestTime);

        var displayText = 'Score: ' + ~~(R / 100) + " Current Time: " + nbSeconds + " seconds.";

        0 != R && (null == ua && (ua = new va(24, "#FFFFFF")), ua.C(displayText), c = ua.L(), a = c.width, f.globalAlpha = .2, f.fillStyle = "#000000", f.fillRect(10, r - 10 - 24 - 10, a + 10, 34), f.globalAlpha = 1, f.drawImage(c, 15, r -
            10 - 24 - 5));
        Cb();
        b = Date.now() - b;
        b > 1E3 / 60 ? D -= .01 : b < 1E3 / 65 && (D += .01);.4 > D && (D = .4);
        1 < D && (D = 1);
        b = C - ib;
        !T() || W ? (x += b / 2E3, 1 < x && (x = 1)) : (x -= b / 300, 0 > x && (x = 0));
        0 < x && (f.fillStyle = "#000000", f.globalAlpha = .5 * x, f.fillRect(0, 0, m, r), f.globalAlpha = 1);
        ib = C

        drawStats(f);
    }

    //UPDATE
    function customRender(d) {
        d.save();
        for (var i = 0; i < lines.length; i++) {
            d.beginPath();

            d.lineWidth = 5;

            if (lines[i][4] == 0) {
                d.strokeStyle = "#FF0000";
            } else if (lines[i][4] == 1) {
                d.strokeStyle = "#00FF00";
            } else if (lines[i][4] == 2) {
                d.strokeStyle = "#0000FF";
            } else if (lines[i][4] == 3) {
                d.strokeStyle = "#FF8000";
            } else if (lines[i][4] == 4) {
                d.strokeStyle = "#8A2BE2";
            } else if (lines[i][4] == 5) {
                d.strokeStyle = "#FF69B4";
            } else if (lines[i][4] == 6) {
                d.strokeStyle = "#008080";
            } else if (lines[i][4] == 7) {
                d.strokeStyle = (getDarkBool() ? '#F2FBFF' : '#111111');
            } else {
                d.strokeStyle = "#000000";
            }

            d.moveTo(lines[i][0], lines[i][1]);
            d.lineTo(lines[i][2], lines[i][3]);

            d.stroke();
        }
        d.restore();
        d.save();
        for (var i = 0; i < circles.length; i++) {
            if (circles[i][3] == 0) {
                d.strokeStyle = "#FF0000";
            } else if (circles[i][3] == 1) {
                d.strokeStyle = "#00FF00";
            } else if (circles[i][3] == 2) {
                d.strokeStyle = "#0000FF";
            } else if (circles[i][3] == 3) {
                d.strokeStyle = "#FF8000";
            } else if (circles[i][3] == 4) {
                d.strokeStyle = "#8A2BE2";
            } else if (circles[i][3] == 5) {
                d.strokeStyle = "#FF69B4";
            } else if (circles[i][3] == 6) {
                d.strokeStyle = "#008080";
            } else if (circles[i][3] == 7) {
                d.strokeStyle = (getDarkBool() ? '#F2FBFF' : '#111111');
            } else {
                d.strokeStyle = "#000000";
            }
            d.beginPath();

            d.lineWidth = 10;
            //d.setLineDash([5]);
            d.globalAlpha = 0.3;

            d.arc(circles[i][0], circles[i][1], circles[i][2], 0, 2 * Math.PI, false);

            d.stroke();
        }
        d.restore();
        d.save();
        for (var i = 0; i < dArc.length; i++) {
            if (dArc[i][7] == 0) {
                d.strokeStyle = "#FF0000";
            } else if (dArc[i][7] == 1) {
                d.strokeStyle = "#00FF00";
            } else if (dArc[i][7] == 2) {
                d.strokeStyle = "#0000FF";
            } else if (dArc[i][7] == 3) {
                d.strokeStyle = "#FF8000";
            } else if (dArc[i][7] == 4) {
                d.strokeStyle = "#8A2BE2";
            } else if (dArc[i][7] == 5) {
                d.strokeStyle = "#FF69B4";
            } else if (dArc[i][7] == 6) {
                d.strokeStyle = "#008080";
            } else if (dArc[i][7] == 7) {
                d.strokeStyle = (getDarkBool() ? '#F2FBFF' : '#111111');
            } else {
                d.strokeStyle = "#000000";
            }

            d.beginPath();

            d.lineWidth = 5;

            var ang1 = Math.atan2(dArc[i][1] - dArc[i][5], dArc[i][0] - dArc[i][4]);
            var ang2 = Math.atan2(dArc[i][3] - dArc[i][5], dArc[i][2] - dArc[i][4]);

            d.arc(dArc[i][4], dArc[i][5], dArc[i][6], ang1, ang2, false);

            d.stroke();
        }
        d.restore();
        d.save();
        for (var i = 0; i < dPoints.length; i++) {
            if (dText[i] == "") {
                var radius = 10;

                d.beginPath();
                d.arc(dPoints[i][0], dPoints[i][1], radius, 0, 2 * Math.PI, false);

                if (dPoints[i][2] == 0) {
                    d.fillStyle = "black";
                } else if (dPoints[i][2] == 1) {
                    d.fillStyle = "yellow";
                } else if (dPoints[i][2] == 2) {
                    d.fillStyle = "blue";
                } else if (dPoints[i][2] == 3) {
                    d.fillStyle = "red";
                } else if (dPoints[i][2] == 4) {
                    d.fillStyle = "#008080";
                } else if (dPoints[i][2] == 5) {
                    d.fillStyle = "#FF69B4";
                } else {
                    d.fillStyle = "#000000";
                }

                d.fill();
                d.lineWidth = 2;
                d.strokeStyle = '#003300';
                d.stroke();
            } else {
                var text = new va(18, (getDarkBool() ? '#F2FBFF' : '#111111'), true, (getDarkBool() ? '#111111' : '#F2FBFF'));

                text.C(dText[i]);
                var textRender = text.L();
                d.drawImage(textRender, dPoints[i][0] - (textRender.width / 2), dPoints[i][1] - (textRender.height / 2));
            }

        }
        d.restore();
    }

    function drawStats(d) {
        d.save()

        sessionScore = Math.max(getCurrentScore(), sessionScore);

        var botString = window.botList[botIndex].displayText();

        var debugStrings = [];
        debugStrings.push("Bot: " + window.botList[botIndex].name);
        debugStrings.push("Launcher: AposLauncher " + aposLauncherVersion);
        debugStrings.push("T - Bot: " + (!toggle ? "On" : "Off"));
        debugStrings.push("R - Lines: " + (!toggleDraw ? "On" : "Off"));

        for (var i = 0; i < botString.length; i++) {
            debugStrings.push(botString[i]);
        }

        debugStrings.push("");
        debugStrings.push("Best Score: " + ~~(sessionScore / 100));
        debugStrings.push("Best Time: " + bestTime + " seconds");
        debugStrings.push("");
        debugStrings.push(serverIP);

        if (getPlayer().length > 0) {
            var offsetX = -getMapStartX();
            var offsetY = -getMapStartY();
            debugStrings.push("Location: " + Math.floor(getPlayer()[0].x + offsetX) + ", " + Math.floor(getPlayer()[0].y + offsetY));
        }

        var offsetValue = 20;
        var text = new va(18, (getDarkBool() ? '#F2FBFF' : '#111111'));

        for (var i = 0; i < debugStrings.length; i++) {
            text.C(debugStrings[i]);
            var textRender = text.L();
            d.drawImage(textRender, 20, offsetValue);
            offsetValue += textRender.height;
        }

        if (message.length > 0) {
            var mRender = [];
            var mWidth = 0;
            var mHeight = 0;

            for (var i = 0; i < message.length; i++) {
                var mText = new va(28, '#FF0000', true, '#000000');
                mText.C(message[i]);
                mRender.push(mText.L());

                if (mRender[i].width > mWidth) {
                    mWidth = mRender[i].width;
                }
                mHeight += mRender[i].height;
            }

            var mX = getWidth() / 2 - mWidth / 2;
            var mY = 20;

            d.globalAlpha = 0.4;
            d.fillStyle = '#000000';
            d.fillRect(mX - 10, mY - 10, mWidth + 20, mHeight + 20);
            d.globalAlpha = 1;

            var mOffset = mY;
            for (var i = 0; i < mRender.length; i++) {
                d.drawImage(mRender[i], getWidth() / 2 - mRender[i].width / 2, mOffset);
                mOffset += mRender[i].height;
            }
        }

        d.restore();
    }

    function Ab() {
        f.fillStyle = ta ? "#111111" : "#F2FBFF";
        f.fillRect(0, 0, m, r);
        f.save();
        f.strokeStyle = ta ? "#AAAAAA" : "#000000";
        f.globalAlpha = .2 * h;
        for (var a = m / h, b = r / h, c = (a / 2 - s) % 50; c < a; c += 50) f.beginPath(), f.moveTo(c * h - .5, 0), f.lineTo(c * h - .5, b * h), f.stroke();
        for (c = (b / 2 - t) % 50; c < b; c += 50) f.beginPath(), f.moveTo(0, c * h - .5), f.lineTo(a * h, c * h - .5), f.stroke();
        f.restore()
    }

    function Cb() {
        if (Qa && Ja.width) {
            var a = m / 5;
            f.drawImage(Ja, 5, 5, a, a)
        }
    }

    function Bb() {
        for (var a = 0, b = 0; b < k.length; b++) a += k[b].q * k[b].q;
        return a
    }

    function ab() {
        z = null;
        if (null != A || 0 != F.length)
            if (null != A || wa) {
                z = document.createElement("canvas");
                var a = z.getContext("2d"),
                    b = 60,
                    b = null == A ? b + 24 * F.length : b + 180,
                    c = Math.min(200, .3 * m) / 200;
                z.width = 200 * c;
                z.height = b * c;
                a.scale(c, c);
                a.globalAlpha = .4;
                a.fillStyle = "#000000";
                a.fillRect(0, 0, 200, b);
                a.globalAlpha =
                    1;
                a.fillStyle = "#FFFFFF";
                c = null;
                c = Z("leaderboard");
                a.font = "30px Ubuntu";
                a.fillText(c, 100 - a.measureText(c).width / 2, 40);
                if (null == A)
                    for (a.font = "20px Ubuntu", b = 0; b < F.length; ++b) c = F[b].name || Z("unnamed_cell"), wa || (c = Z("unnamed_cell")), -1 != M.indexOf(F[b].id) ? (k[0].name && (c = k[0].name), a.fillStyle = "#FFAAAA") : a.fillStyle = "#FFFFFF", c = b + 1 + ". " + c, a.fillText(c, 100 - a.measureText(c).width / 2, 70 + 24 * b);
                else
                    for (b = c = 0; b < A.length; ++b) {
                        var d = c + A[b] * Math.PI * 2;
                        a.fillStyle = Db[b + 1];
                        a.beginPath();
                        a.moveTo(100, 140);
                        a.arc(100,
                            140, 80, c, d, !1);
                        a.fill();
                        c = d
                    }
            }
    }

    function Ka(a, b, c, d, e) {
        this.V = a;
        this.x = b;
        this.y = c;
        this.i = d;
        this.b = e
    }

    function da(a, b, c, d, e, p) {
        this.id = a;
        this.s = this.x = b;
        this.t = this.y = c;
        this.r = this.size = d;
        this.color = e;
        this.a = [];
        this.W();
        this.B(p)
    }

    function va(a, b, c, d) {
        a && (this.u = a);
        b && (this.S = b);
        this.U = !!c;
        d && (this.v = d)
    }

    function S(a, b) {
        var c = "1" == e("#helloContainer").attr("data-has-account-data");
        e("#helloContainer").attr("data-has-account-data", "1");
        if (null == b && d.localStorage.loginCache) {
            var l = JSON.parse(d.localStorage.loginCache);
            l.f = a.f;
            l.d = a.d;
            l.e = a.e;
            d.localStorage.loginCache = JSON.stringify(l)
        }
        if (c) {
            var u = +e(".agario-exp-bar .progress-bar-text").first().text().split("/")[0],
                c = +e(".agario-exp-bar .progress-bar-text").first().text().split("/")[1].split(" ")[0],
                l = e(".agario-profile-panel .progress-bar-star").first().text();
            if (l != a.e) S({
                f: c,
                d: c,
                e: l
            }, function() {
                e(".agario-profile-panel .progress-bar-star").text(a.e);
                e(".agario-exp-bar .progress-bar").css("width", "100%");
                e(".progress-bar-star").addClass("animated tada").one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",
                    function() {
                        e(".progress-bar-star").removeClass("animated tada")
                    });
                setTimeout(function() {
                    e(".agario-exp-bar .progress-bar-text").text(a.d + "/" + a.d + " XP");
                    S({
                        f: 0,
                        d: a.d,
                        e: a.e
                    }, function() {
                        S(a, b)
                    })
                }, 1E3)
            });
            else {
                var p = Date.now(),
                    g = function() {
                        var c;
                        c = (Date.now() - p) / 1E3;
                        c = 0 > c ? 0 : 1 < c ? 1 : c;
                        c = c * c * (3 - 2 * c);
                        e(".agario-exp-bar .progress-bar-text").text(~~(u + (a.f - u) * c) + "/" + a.d + " XP");
                        e(".agario-exp-bar .progress-bar").css("width", (88 * (u + (a.f - u) * c) / a.d).toFixed(2) + "%");
                        1 > c ? d.requestAnimationFrame(g) : b && b()
                    };
                d.requestAnimationFrame(g)

            }
        } else e(".agario-profile-panel .progress-bar-star").text(a.e),
            e(".agario-exp-bar .progress-bar-text").text(a.f + "/" + a.d + " XP"), e(".agario-exp-bar .progress-bar").css("width", (88 * a.f / a.d).toFixed(2) + "%"), b && b()

    }

    function jb(a) {
        "string" == typeof a && (a = JSON.parse(a));
        Date.now() + 18E5 > a.ja ? e("#helloContainer").attr("data-logged-in", "0") : (d.localStorage.loginCache = JSON.stringify(a), B = a.fa, e(".agario-profile-name").text(a.name), $a(), S({
            f: a.f,
            d: a.d,
            e: a.e
        }), e("#helloContainer").attr("data-logged-in", "1"))
    }

    function Eb(a) {
        a = a.split("\n");
        jb({
            name: a[0],
            ta: a[1],
            fa: a[2],
            ja: 1E3 *
                +a[3],
            e: +a[4],
            f: +a[5],
            d: +a[6]
        });
        console.log("Hello Facebook?");
    }

    function La(a) {
        if ("connected" == a.status) {
            var b = a.authResponse.accessToken;
            d.FB.api("/me/picture?width=180&height=180", function(a) {
                d.localStorage.fbPictureCache = a.data.url;
                e(".agario-profile-picture").attr("src", a.data.url)
            });
            e("#helloContainer").attr("data-logged-in", "1");
            null != B ? e.ajax(ap + "checkToken", {
                error: function() {
                    console.log("Facebook Fail!");
                    B = null;
                    La(a)
                },
                success: function(a) {
                    a = a.split("\n");
                    S({
                        e: +a[0],
                        f: +a[1],
                        d: +a[2]
                    });
                    console.log("Facebook connected!");
                },
                dataType: "text",
                method: "POST",
                cache: !1,
                crossDomain: !0,
                data: B
            }) : e.ajax(ap + "facebookLogin", {
                error: function() {
                    console.log("You have a Facebook problem!");
                    B = null;
                    e("#helloContainer").attr("data-logged-in", "0")
                },
                success: Eb,
                dataType: "text",
                method: "POST",
                cache: !1,
                crossDomain: !0,
                data: b
            })
        }
    }

    function Wa(a) {
        Y(":party");
        e("#helloContainer").attr("data-party-state", "4");
        a = decodeURIComponent(a).replace(/.*#/gim, "");
        Ma("#" + d.encodeURIComponent(a));
        e.ajax(ap + "getToken", {
            error: function() {
                e("#helloContainer").attr("data-party-state", "6")
            },
            success: function(b) {
                b = b.split("\n");
                e(".partyToken").val("agar.io/#" +
                    d.encodeURIComponent(a));
                e("#helloContainer").attr("data-party-state", "5");
                Y(":party");
                Ca("ws://" + b[0], a)
            },
            dataType: "text",
            method: "POST",
            cache: !1,
            crossDomain: !0,
            data: a
        })
    }

    function Ma(a) {
        d.history && d.history.replaceState && d.history.replaceState({}, d.document.title, a)
    }
    if (!d.agarioNoInit) {
        var Na = d.location.protocol,
            tb = "https:" == Na,
            ap = Na + "//m.agar.io/",
            xa = d.navigator.userAgent;
        if (-1 != xa.indexOf("Android")) d.ga && d.ga("send", "event", "MobileRedirect", "PlayStore"), setTimeout(function() {
                d.location.href = "market://details?id=com.miniclip.agar.io"
            },
            1E3);
        else if (-1 != xa.indexOf("iPhone") || -1 != xa.indexOf("iPad") || -1 != xa.indexOf("iPod")) d.ga && d.ga("send", "event", "MobileRedirect", "AppStore"), setTimeout(function() {
            d.location.href = "https://itunes.apple.com/app/agar.io/id995999703"
        }, 1E3);
        else {
            var za, f, G, m, r, X = null,

                //UPDATE
                toggle = false,
                toggleDraw = false,
                shootTime = 0,
                splitTime = 0,
                shootCooldown = 100,
                splitCooldown = 100,
                tempPoint = [0, 0, 1],
                dPoints = [],
                circles = [],
                dArc = [],
                dText = [],
                lines = [],
                names = ["NotReallyABot"],
                originalName = names[Math.floor(Math.random() * names.length)],
                sessionScore = 0,
                serverIP = "",
                interNodes = [],
                lifeTimer = new Date(),
                bestTime = 0,
                botIndex = 0,
                reviving = false,
                message = [],

                q = null,
                s = 0,
                t = 0,
                M = [],
                k = [],
                E = {},
                v = [],
                Q = [],
                F = [],
                fa = 0,
                ga = 0,

                //UPDATE
                ia = -1,
                ja = -1,

                zb = 0,
                C = 0,
                ib = 0,
                K = null,
                pa = 0,
                qa = 0,
                ra = 1E4,
                sa = 1E4,
                h = 1,
                y = null,
                kb = !0,
                wa = !0,
                Oa = !1,
                Ha = !1,
                R = 0,
                ta = !1,
                lb = !1,
                aa = s = ~~((pa + ra) / 2),
                ba = t = ~~((qa + sa) / 2),
                ca = 1,
                P = "",
                A = null,
                ya = !1,
                Ga = !1,
                Ea = 0,
                Fa =
                0,
                na = 0,
                oa = 0,
                mb = 0,
                Db = ["#333333", "#FF3333", "#33FF33", "#3333FF"],
                Ia = !1,
                $ = !1,
                bb = 0,
                B = null,
                J = 1,
                x = 1,
                W = !0,
                Ba = 0,
                Da = {};
            (function() {
                var a = d.location.search;
                "?" == a.charAt(0) && (a = a.slice(1));
                for (var a = a.split("&"), b = 0; b < a.length; b++) {
                    var c = a[b].split("=");
                    Da[c[0]] = c[1]
                }
            })();
            var Qa = "ontouchstart" in d && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(d.navigator.userAgent),
                Ja = new Image;
            Ja.src = "img/split.png";
            var nb = document.createElement("canvas");
            if ("undefined" == typeof console || "undefined" ==
                typeof DataView || "undefined" == typeof WebSocket || null == nb || null == nb.getContext || null == d.localStorage) alert("You browser does not support this game, we recommend you to use Firefox to play this");
            else {
                var ka = null;
                d.setNick = function(a) {
                    //UPDATE
                    originalName = a;
                    if (getPlayer().length == 0) {
                        lifeTimer = new Date();
                    }

                    Xa();
                    K = a;
                    cb();
                    R = 0
                };
                d.setRegion = ha;
                d.setSkins = function(a) {
                    kb = a
                };
                d.setNames = function(a) {
                    wa = a
                };
                d.setDarkTheme = function(a) {
                    ta = a
                };
                d.setColors = function(a) {
                    Oa = a
                };
                d.setShowMass = function(a) {
                    lb = a
                };
                d.spectate = function() {
                    K = null;
                    H(1);
                    Xa()
                };
                d.setGameMode = function(a) {
                    a != P && (":party" ==
                        P && e("#helloContainer").attr("data-party-state", "0"), Y(a), ":party" != a && I())
                };
                d.setAcid = function(a) {
                    Ia = a
                };
                null != d.localStorage && (null == d.localStorage.AB9 && (d.localStorage.AB9 = 0 + ~~(100 * Math.random())), mb = +d.localStorage.AB9, d.ABGroup = mb);
                e.get(Na + "//gc.agar.io", function(a) {
                    var b = a.split(" ");
                    a = b[0];
                    b = b[1] || ""; - 1 == ["UA"].indexOf(a) && ob.push("ussr");
                    ea.hasOwnProperty(a) && ("string" == typeof ea[a] ? y || ha(ea[a]) : ea[a].hasOwnProperty(b) && (y || ha(ea[a][b])))
                }, "text");
                d.ga && d.ga("send", "event", "User-Agent", d.navigator.userAgent, {
                    nonInteraction: 1
                });
                var la = !1,
                    Ya = 0;
                setTimeout(function() {
                    la = !0
                }, Math.max(6E4 * Ya, 1E4));
                var ea = {
                        AF: "JP-Tokyo",
                        AX: "EU-London",
                        AL: "EU-London",
                        DZ: "EU-London",
                        AS: "SG-Singapore",
                        AD: "EU-London",
                        AO: "EU-London",
                        AI: "US-Atlanta",
                        AG: "US-Atlanta",
                        AR: "BR-Brazil",
                        AM: "JP-Tokyo",
                        AW: "US-Atlanta",
                        AU: "SG-Singapore",
                        AT: "EU-London",
                        AZ: "JP-Tokyo",
                        BS: "US-Atlanta",
                        BH: "JP-Tokyo",
                        BD: "JP-Tokyo",
                        BB: "US-Atlanta",
                        BY: "EU-London",
                        BE: "EU-London",
                        BZ: "US-Atlanta",
                        BJ: "EU-London",
                        BM: "US-Atlanta",
                        BT: "JP-Tokyo",
                        BO: "BR-Brazil",
                        BQ: "US-Atlanta",
                        BA: "EU-London",
                        BW: "EU-London",
                        BR: "BR-Brazil",
                        IO: "JP-Tokyo",
                        VG: "US-Atlanta",
                        BN: "JP-Tokyo",
                        BG: "EU-London",
                        BF: "EU-London",
                        BI: "EU-London",
                        KH: "JP-Tokyo",
                        CM: "EU-London",
                        CA: "US-Atlanta",
                        CV: "EU-London",
                        KY: "US-Atlanta",
                        CF: "EU-London",
                        TD: "EU-London",
                        CL: "BR-Brazil",
                        CN: "CN-China",
                        CX: "JP-Tokyo",
                        CC: "JP-Tokyo",
                        CO: "BR-Brazil",
                        KM: "EU-London",
                        CD: "EU-London",
                        CG: "EU-London",
                        CK: "SG-Singapore",
                        CR: "US-Atlanta",
                        CI: "EU-London",
                        HR: "EU-London",
                        CU: "US-Atlanta",
                        CW: "US-Atlanta",
                        CY: "JP-Tokyo",
                        CZ: "EU-London",
                        DK: "EU-London",
                        DJ: "EU-London",
                        DM: "US-Atlanta",
                        DO: "US-Atlanta",
                        EC: "BR-Brazil",
                        EG: "EU-London",
                        SV: "US-Atlanta",
                        GQ: "EU-London",
                        ER: "EU-London",
                        EE: "EU-London",
                        ET: "EU-London",
                        FO: "EU-London",
                        FK: "BR-Brazil",
                        FJ: "SG-Singapore",
                        FI: "EU-London",
                        FR: "EU-London",
                        GF: "BR-Brazil",
                        PF: "SG-Singapore",
                        GA: "EU-London",
                        GM: "EU-London",
                        GE: "JP-Tokyo",
                        DE: "EU-London",
                        GH: "EU-London",
                        GI: "EU-London",
                        GR: "EU-London",
                        GL: "US-Atlanta",
                        GD: "US-Atlanta",
                        GP: "US-Atlanta",
                        GU: "SG-Singapore",
                        GT: "US-Atlanta",
                        GG: "EU-London",
                        GN: "EU-London",
                        GW: "EU-London",
                        GY: "BR-Brazil",
                        HT: "US-Atlanta",
                        VA: "EU-London",
                        HN: "US-Atlanta",
                        HK: "JP-Tokyo",
                        HU: "EU-London",
                        IS: "EU-London",
                        IN: "JP-Tokyo",
                        ID: "JP-Tokyo",
                        IR: "JP-Tokyo",
                        IQ: "JP-Tokyo",
                        IE: "EU-London",
                        IM: "EU-London",
                        IL: "JP-Tokyo",
                        IT: "EU-London",
                        JM: "US-Atlanta",
                        JP: "JP-Tokyo",
                        JE: "EU-London",
                        JO: "JP-Tokyo",
                        KZ: "JP-Tokyo",
                        KE: "EU-London",
                        KI: "SG-Singapore",
                        KP: "JP-Tokyo",
                        KR: "JP-Tokyo",
                        KW: "JP-Tokyo",
                        KG: "JP-Tokyo",
                        LA: "JP-Tokyo",
                        LV: "EU-London",
                        LB: "JP-Tokyo",
                        LS: "EU-London",
                        LR: "EU-London",
                        LY: "EU-London",
                        LI: "EU-London",
                        LT: "EU-London",
                        LU: "EU-London",
                        MO: "JP-Tokyo",
                        MK: "EU-London",
                        MG: "EU-London",
                        MW: "EU-London",
                        MY: "JP-Tokyo",
                        MV: "JP-Tokyo",
                        ML: "EU-London",
                        MT: "EU-London",
                        MH: "SG-Singapore",
                        MQ: "US-Atlanta",
                        MR: "EU-London",
                        MU: "EU-London",
                        YT: "EU-London",
                        MX: "US-Atlanta",
                        FM: "SG-Singapore",
                        MD: "EU-London",
                        MC: "EU-London",
                        MN: "JP-Tokyo",
                        ME: "EU-London",
                        MS: "US-Atlanta",
                        MA: "EU-London",
                        MZ: "EU-London",
                        MM: "JP-Tokyo",
                        NA: "EU-London",
                        NR: "SG-Singapore",
                        NP: "JP-Tokyo",
                        NL: "EU-London",
                        NC: "SG-Singapore",
                        NZ: "SG-Singapore",
                        NI: "US-Atlanta",
                        NE: "EU-London",
                        NG: "EU-London",
                        NU: "SG-Singapore",
                        NF: "SG-Singapore",
                        MP: "SG-Singapore",
                        NO: "EU-London",
                        OM: "JP-Tokyo",
                        PK: "JP-Tokyo",
                        PW: "SG-Singapore",
                        PS: "JP-Tokyo",
                        PA: "US-Atlanta",
                        PG: "SG-Singapore",
                        PY: "BR-Brazil",
                        PE: "BR-Brazil",
                        PH: "JP-Tokyo",
                        PN: "SG-Singapore",
                        PL: "EU-London",
                        PT: "EU-London",
                        PR: "US-Atlanta",
                        QA: "JP-Tokyo",
                        RE: "EU-London",
                        RO: "EU-London",
                        RU: "RU-Russia",
                        RW: "EU-London",
                        BL: "US-Atlanta",
                        SH: "EU-London",
                        KN: "US-Atlanta",
                        LC: "US-Atlanta",
                        MF: "US-Atlanta",
                        PM: "US-Atlanta",
                        VC: "US-Atlanta",
                        WS: "SG-Singapore",
                        SM: "EU-London",
                        ST: "EU-London",
                        SA: "EU-London",
                        SN: "EU-London",
                        RS: "EU-London",
                        SC: "EU-London",
                        SL: "EU-London",
                        SG: "JP-Tokyo",
                        SX: "US-Atlanta",
                        SK: "EU-London",
                        SI: "EU-London",
                        SB: "SG-Singapore",
                        SO: "EU-London",
                        ZA: "EU-London",
                        SS: "EU-London",
                        ES: "EU-London",
                        LK: "JP-Tokyo",
                        SD: "EU-London",
                        SR: "BR-Brazil",
                        SJ: "EU-London",
                        SZ: "EU-London",
                        SE: "EU-London",
                        CH: "EU-London",
                        SY: "EU-London",
                        TW: "JP-Tokyo",
                        TJ: "JP-Tokyo",
                        TZ: "EU-London",
                        TH: "JP-Tokyo",
                        TL: "JP-Tokyo",
                        TG: "EU-London",
                        TK: "SG-Singapore",
                        TO: "SG-Singapore",
                        TT: "US-Atlanta",
                        TN: "EU-London",
                        TR: "TK-Turkey",
                        TM: "JP-Tokyo",
                        TC: "US-Atlanta",
                        TV: "SG-Singapore",
                        UG: "EU-London",
                        UA: "EU-London",
                        AE: "EU-London",
                        GB: "EU-London",
                        US: "US-Atlanta",
                        UM: "SG-Singapore",
                        VI: "US-Atlanta",
                        UY: "BR-Brazil",
                        UZ: "JP-Tokyo",
                        VU: "SG-Singapore",
                        VE: "BR-Brazil",
                        VN: "JP-Tokyo",
                        WF: "SG-Singapore",
                        EH: "EU-London",
                        YE: "JP-Tokyo",
                        ZM: "EU-London",
                        ZW: "EU-London"
                    },
                    L = null;
                d.connect = Ca;

                //UPDATE
                /**
                 * Tells you if the game is in Dark mode.
                 * @return Boolean for dark mode.
                 */
                window.getDarkBool = function() {
                    return ta;
                }

                /**
                 * Tells you if the mass is shown.
                 * @return Boolean for player's mass.
                 */
                window.getMassBool = function() {
                    return lb;
                }

                /**
                 * This is a copy of everything that is shown on screen.
                 * Normally stuff will time out when off the screen, this
                 * memorizes everything that leaves the screen for a little
                 * while longer.
                 * @return The memory object.
                 */
                window.getMemoryCells = function() {
                    return interNodes;
                }

                /**
                 * [getCellsArray description]
                 * @return {[type]} [description]
                 */
                window.getCellsArray = function() {
                    return v;
                }

                /**
                 * [getCellsArray description]
                 * @return {[type]} [description]
                 */
                window.getCells = function() {
                    return E;
                }

                /**
                 * Returns an array with all the player's cells.
                 * @return Player's cells
                 */
                window.getPlayer = function() {
                    return k;
                }

                /**
                 * The canvas' width.
                 * @return Integer Width
                 */
                window.getWidth = function() {
                    return m;
                }

                /**
                 * The canvas' height
                 * @return Integer Height
                 */
                window.getHeight = function() {
                    return r;
                }

                /**
                 * Scaling ratio of the canvas. The bigger this ration,
                 * the further that you see.
                 * @return Screen scaling ratio.
                 */
                window.getRatio = function() {
                    return h;
                }

                /**
                 * [getOffsetX description]
                 * @return {[type]} [description]
                 */
                window.getOffsetX = function() {
                    return aa;
                }

                window.getOffsetY = function() {
                    return ba;
                }

                window.getX = function() {
                    return s;
                }

                window.getY = function() {
                    return t;
                }

                window.getPointX = function() {
                    return ia;
                }

                window.getPointY = function() {
                    return ja;
                }

                /**
                 * The X location of the mouse.
                 * @return Integer X
                 */
                window.getMouseX = function() {
                    return fa;
                }

                /**
                 * The Y location of the mouse.
                 * @return Integer Y
                 */
                window.getMouseY = function() {
                    return ga;
                }

                window.getMapStartX = function() {
                    return pa;
                }

                window.getMapStartY = function() {
                    return qa;
                }

                window.getMapEndX = function() {
                    return ra;
                }

                window.getMapEndY = function() {
                    return sa;
                }

                window.getScreenDistance = function() {
                    var temp = screenDistance();
                    return temp;
                }

                /**
                 * A timestamp since the last time the server sent any data.
                 * @return Last update timestamp
                 */
                window.getLastUpdate = function() {
                    return C;
                }

                window.getCurrentScore = function() {
                    return R;
                }

                /**
                 * The game's current mode. (":ffa", ":experimental", ":teams". ":party")
                 * @return {[type]} [description]
                 */
                window.getMode = function() {
                    return P;
                }

                window.getServer = function() {
                    return serverIP;
                }

                window.setPoint = function(x, y) {
                    ia = x;
                    ja = y;
                }

                window.setScore = function(a) {
                    sessionScore = a * 100;
                }

                window.setBestTime = function(a) {
                    bestTime = a;
                }

                window.best = function(a, b) {
                    setScore(a);
                    setBestTime(b);
                }

                window.setBotIndex = function(a) {
                    console.log("Changing bot");
                    botIndex = a;
                }

                window.setMessage = function(a) {
                    message = a;
                }
                
                window.shoot = function() {
                    if (!toggle && shootTime + shootCooldown < new Date().getTime()) {
                        shootTime = new Date().getTime();
                        opCode(21);
                    }
                }
            
                window.split = function() {
            
                    if (!toggle && splitTime + splitCooldown < new Date().getTime()) {
                        splitTime = new Date().getTime();
                        opCode(17);
                    }
                }
                
                window.updateBotList = function() {
                    window.botList = window.botList || [];

                    window.jQuery('#locationUnknown').text("");

                    window.jQuery('#locationUnknown').append(window.jQuery('<select id="bList" class="form-control" onchange="setBotIndex($(this).val());" />'));
                    window.jQuery('#locationUnknown').addClass('form-group');

                    for (var i = 0; i < window.botList.length; i++) {
                        if (window.botList[i].name == "Human" && window.botList.length > 1) {
                            if (botIndex == i) {
                                botIndex = (botIndex + 1).mod(window.botList.length);
                            }
                            continue;
                        }

                        var bList = window.jQuery('#bList');
                        window.jQuery('<option />', {
                            value: i,
                            text: window.botList[i].name
                        }).appendTo(bList);
                    }
                }

                var ma = 500,
                    eb = -1,
                    fb = -1,
                    z = null,
                    D = 1,
                    ua = null,
                    Ua = function() {
                        var a = Date.now(),
                            b = 1E3 / 60;
                        return function() {
                            d.requestAnimationFrame(Ua);
                            var c = Date.now(),
                                l = c - a;
                            l > b && (a = c - l % b, !T() || 240 > Date.now() - bb ? gb() : console.warn("Skipping draw"), Fb())
                        }
                    }(),
                    U = {},
                    ob = "notreallyabot;poland;usa;china;russia;canada;australia;spain;brazil;germany;ukraine;france;sweden;chaplin;north korea;south korea;japan;united kingdom;earth;greece;latvia;lithuania;estonia;finland;norway;cia;maldivas;austria;nigeria;reddit;yaranaika;confederate;9gag;indiana;4chan;italy;bulgaria;tumblr;2ch.hk;hong kong;portugal;jamaica;german empire;mexico;sanik;switzerland;croatia;chile;indonesia;bangladesh;thailand;iran;iraq;peru;moon;botswana;bosnia;netherlands;european union;taiwan;pakistan;hungary;satanist;qing dynasty;matriarchy;patriarchy;feminism;ireland;texas;facepunch;prodota;cambodia;steam;piccolo;ea;india;kc;denmark;quebec;ayy lmao;sealand;bait;tsarist russia;origin;vinesauce;stalin;belgium;luxembourg;stussy;prussia;8ch;argentina;scotland;sir;romania;belarus;wojak;doge;nasa;byzantium;imperial japan;french kingdom;somalia;turkey;mars;pokerface;8;irs;receita federal;facebook".split(";"),
                    Gb = ["8", "nasa"],
                    Hb = ["m'blob"];
                Ka.prototype = {
                    V: null,
                    x: 0,
                    y: 0,
                    i: 0,
                    b: 0
                };
                da.prototype = {
                    id: 0,
                    a: null,
                    name: null,
                    o: null,
                    O: null,
                    x: 0,
                    y: 0,
                    size: 0,
                    s: 0,
                    t: 0,
                    r: 0,
                    J: 0,
                    K: 0,
                    q: 0,
                    ba: 0,
                    Q: 0,
                    sa: 0,
                    ia: 0,
                    G: !1,
                    h: !1,
                    n: !1,
                    R: !0,
                    Y: 0,
                    //UPDATE
                    updateCode: 0,
                    danger: false,
                    dangerTimeOut: 0,
                    isNotMoving: function() {
                        return (this.x == this.s && this.y == this.t);
                    },
                    isVirus: function() {
                        return this.h;
                    },
                    getUptimeTime: function() {
                        return this.Q;
                    },
                    X: function() {
                        var a;
                        for (a = 0; a < v.length; a++)
                            if (v[a] == this) {
                                v.splice(a, 1);
                                break
                            }
                        delete E[this.id];
                        a = k.indexOf(this); - 1 != a && (Ha = !0, k.splice(a, 1));
                        a = M.indexOf(this.id); - 1 != a && M.splice(a, 1);
                        this.G = !0;
                        0 < this.Y && Q.push(this)
                    },
                    l: function() {
                        return Math.max(~~(.3 * this.size), 24)
                    },
                    B: function(a) {
                        if (this.name = a) null ==
                            this.o ? this.o = new va(this.l(), "#FFFFFF", !0, "#000000") : this.o.M(this.l()), this.o.C(this.name)
                    },
                    W: function() {
                        for (var a = this.I(); this.a.length > a;) {
                            var b = ~~(Math.random() * this.a.length);
                            this.a.splice(b, 1)
                        }
                        for (0 == this.a.length && 0 < a && this.a.push(new Ka(this, this.x, this.y, this.size, Math.random() - .5)); this.a.length < a;) b = ~~(Math.random() * this.a.length), b = this.a[b], this.a.push(new Ka(this, b.x, b.y, b.i, b.b))
                    },
                    I: function() {
                        var a = 10;
                        20 > this.size && (a = 0);
                        this.h && (a = 30);
                        var b = this.size;
                        this.h || (b *= h);
                        b *= D;
                        this.ba &
                            32 && (b *= .25);
                        return ~~Math.max(b, a)
                    },
                    qa: function() {
                        this.W();
                        for (var a = this.a, b = a.length, c = 0; c < b; ++c) {
                            var d = a[(c - 1 + b) % b].b,
                                e = a[(c + 1) % b].b;
                            a[c].b += (Math.random() - .5) * (this.n ? 3 : 1);
                            a[c].b *= .7;
                            10 < a[c].b && (a[c].b = 10); - 10 > a[c].b && (a[c].b = -10);
                            a[c].b = (d + e + 8 * a[c].b) / 10
                        }
                        for (var p = this, g = this.h ? 0 : (this.id / 1E3 + C / 1E4) % (2 * Math.PI), c = 0; c < b; ++c) {
                            var f = a[c].i,
                                d = a[(c - 1 + b) % b].i,
                                e = a[(c + 1) % b].i;
                            if (15 < this.size && null != X && 20 < this.size * h && 0 < this.id) {
                                var k = !1,
                                    w = a[c].x,
                                    m = a[c].y;
                                X.ra(w - 5, m - 5, 10, 10, function(a) {
                                    a.V != p && 25 > (w -
                                        a.x) * (w - a.x) + (m - a.y) * (m - a.y) && (k = !0)
                                });
                                !k && (a[c].x < pa || a[c].y < qa || a[c].x > ra || a[c].y > sa) && (k = !0);
                                k && (0 < a[c].b && (a[c].b = 0), a[c].b -= 1)
                            }
                            f += a[c].b;
                            0 > f && (f = 0);
                            f = this.n ? (19 * f + this.size) / 20 : (12 * f + this.size) / 13;
                            a[c].i = (d + e + 8 * f) / 10;
                            d = 2 * Math.PI / b;
                            e = this.a[c].i;
                            this.h && 0 == c % 2 && (e += 5);
                            a[c].x = this.x + Math.cos(d * c + g) * e;
                            a[c].y = this.y + Math.sin(d * c + g) * e
                        }
                    },
                    P: function() {
                        if (0 >= this.id) return 1;
                        var a;
                        a = (C - this.Q) / 120;
                        a = 0 > a ? 0 : 1 < a ? 1 : a;
                        var b = 0 > a ? 0 : 1 < a ? 1 : a;
                        this.l();
                        if (this.G && 1 <= b) {
                            var c = Q.indexOf(this); - 1 != c && Q.splice(c, 1)
                        }
                        this.x =
                            a * (this.J - this.s) + this.s;
                        this.y = a * (this.K - this.t) + this.t;
                        this.size = b * (this.q - this.r) + this.r;
                        return b
                    },
                    N: function() {
                        return 0 >= this.id ? !0 : this.x + this.size + 40 < s - m / 2 / h || this.y + this.size + 40 < t - r / 2 / h || this.x - this.size - 40 > s + m / 2 / h || this.y - this.size - 40 > t + r / 2 / h ? !1 : !0
                    },
                    w: function(a) {
                        if (this.N()) {
                            ++this.Y;
                            var b = 0 < this.id && !this.h && !this.n && .4 > h;
                            5 > this.I() && (b = !0);
                            if (this.R && !b)
                                for (var c = 0; c < this.a.length; c++) this.a[c].i = this.size;
                            this.R = b;
                            a.save();
                            this.ia = C;
                            c = this.P();
                            this.G && (a.globalAlpha *= 1 - c);
                            a.lineWidth =
                                10;
                            a.lineCap = "round";
                            a.lineJoin = this.h ? "miter" : "round";
                            Oa ? (a.fillStyle = "#FFFFFF", a.strokeStyle = "#AAAAAA") : (a.fillStyle = this.color, a.strokeStyle = this.color);
                            if (b) a.beginPath(), a.arc(this.x, this.y, this.size + 5, 0, 2 * Math.PI, !1);
                            else {
                                this.qa();
                                a.beginPath();
                                var d = this.I();
                                a.moveTo(this.a[0].x, this.a[0].y);
                                for (c = 1; c <= d; ++c) {
                                    var e = c % d;
                                    a.lineTo(this.a[e].x, this.a[e].y)
                                }
                            }
                            a.closePath();
                            d = this.name.toLowerCase();
                            !this.n && kb && ":teams" != P ? -1 != ob.indexOf(d) ? (U.hasOwnProperty(d) || (U[d] = new Image, (d == "notreallyabot" ? U[d].src = "http://i.imgur.com/q5FdCkx.png" : U[d].src = "skins/" +
                                d + ".png")), c = 0 != U[d].width && U[d].complete ? U[d] : null) : c = null : c = null;
                            c = (e = c) ? -1 != Hb.indexOf(d) : !1;
                            b || a.stroke();
                            a.fill();
                            null == e || c || (a.save(), a.clip(), a.drawImage(e, this.x - this.size, this.y - this.size, 2 * this.size, 2 * this.size), a.restore());
                            (Oa || 15 < this.size) && !b && (a.strokeStyle = "#000000", a.globalAlpha *= .1, a.stroke());
                            a.globalAlpha = 1;
                            null != e && c && a.drawImage(e, this.x - 2 * this.size, this.y - 2 * this.size, 4 * this.size, 4 * this.size);
                            c = -1 != k.indexOf(this);
                            b = ~~this.y;
                            if (0 != this.id && (wa || c) && this.name && this.o && (null ==
                                    e || -1 == Gb.indexOf(d))) {
                                e = this.o;
                                e.C(this.name);
                                e.M(this.l());
                                d = 0 >= this.id ? 1 : Math.ceil(10 * h) / 10;
                                e.ea(d);
                                var e = e.L(),
                                    p = ~~(e.width / d),
                                    g = ~~(e.height / d);
                                a.drawImage(e, ~~this.x - ~~(p / 2), b - ~~(g / 2), p, g);
                                b += e.height / 2 / d + 4
                            }
                            0 < this.id && lb && (c || 0 == k.length && (!this.h || this.n) && 20 < this.size) && (null == this.O && (this.O = new va(this.l() / 2, "#FFFFFF", !0, "#000000")), c = this.O, c.M(this.l() / 2), c.C(~~(this.size * this.size / 100)), d = Math.ceil(10 * h) / 10, c.ea(d), e = c.L(), p = ~~(e.width / d), g = ~~(e.height / d), a.drawImage(e, ~~this.x - ~~(p / 2),
                                b - ~~(g / 2), p, g));
                            a.restore()
                        }
                    }
                };
                va.prototype = {
                    F: "",
                    S: "#000000",
                    U: !1,
                    v: "#000000",
                    u: 16,
                    p: null,
                    T: null,
                    k: !1,
                    D: 1,
                    M: function(a) {
                        this.u != a && (this.u = a, this.k = !0)
                    },
                    ea: function(a) {
                        this.D != a && (this.D = a, this.k = !0)
                    },
                    setStrokeColor: function(a) {
                        this.v != a && (this.v = a, this.k = !0)
                    },
                    C: function(a) {
                        a != this.F && (this.F = a, this.k = !0)
                    },
                    L: function() {
                        null == this.p && (this.p = document.createElement("canvas"), this.T = this.p.getContext("2d"));
                        if (this.k) {
                            this.k = !1;
                            var a = this.p,
                                b = this.T,
                                c = this.F,
                                d = this.D,
                                e = this.u,
                                p = e + "px Ubuntu";
                            b.font =
                                p;
                            var g = ~~(.2 * e);
                            a.width = (b.measureText(c).width + 6) * d;
                            a.height = (e + g) * d;
                            b.font = p;
                            b.scale(d, d);
                            b.globalAlpha = 1;
                            b.lineWidth = 3;
                            b.strokeStyle = this.v;
                            b.fillStyle = this.S;
                            this.U && b.strokeText(c, 3, e - g / 2);
                            b.fillText(c, 3, e - g / 2)
                        }
                        return this.p
                    }
                };
                Date.now || (Date.now = function() {
                    return (new Date).getTime()
                });
                (function() {
                    for (var a = ["ms", "moz", "webkit", "o"], b = 0; b < a.length && !d.requestAnimationFrame; ++b) d.requestAnimationFrame = d[a[b] + "RequestAnimationFrame"], d.cancelAnimationFrame = d[a[b] + "CancelAnimationFrame"] || d[a[b] +
                        "CancelRequestAnimationFrame"];
                    d.requestAnimationFrame || (d.requestAnimationFrame = function(a) {
                        return setTimeout(a, 1E3 / 60)
                    }, d.cancelAnimationFrame = function(a) {
                        clearTimeout(a)
                    })
                })();
                var rb = {
                        ka: function(a) {
                            function b(a, b, c, d, e) {
                                this.x = a;
                                this.y = b;
                                this.j = c;
                                this.g = d;
                                this.depth = e;
                                this.items = [];
                                this.c = []
                            }
                            var c = a.ma || 2,
                                d = a.na || 4;
                            b.prototype = {
                                x: 0,
                                y: 0,
                                j: 0,
                                g: 0,
                                depth: 0,
                                items: null,
                                c: null,
                                H: function(a) {
                                    for (var b = 0; b < this.items.length; ++b) {
                                        var c = this.items[b];
                                        if (c.x >= a.x && c.y >= a.y && c.x < a.x + a.j && c.y < a.y + a.g) return !0
                                    }
                                    if (0 !=
                                        this.c.length) {
                                        var d = this;
                                        return this.$(a, function(b) {
                                            return d.c[b].H(a)
                                        })
                                    }
                                    return !1
                                },
                                A: function(a, b) {
                                    for (var c = 0; c < this.items.length; ++c) b(this.items[c]);
                                    if (0 != this.c.length) {
                                        var d = this;
                                        this.$(a, function(c) {
                                            d.c[c].A(a, b)
                                        })
                                    }
                                },
                                m: function(a) {
                                    0 != this.c.length ? this.c[this.Z(a)].m(a) : this.items.length >= c && this.depth < d ? (this.ha(), this.c[this.Z(a)].m(a)) : this.items.push(a)
                                },
                                Z: function(a) {
                                    return a.x < this.x + this.j / 2 ? a.y < this.y + this.g / 2 ? 0 : 2 : a.y < this.y + this.g / 2 ? 1 : 3
                                },
                                $: function(a, b) {
                                    return a.x < this.x + this.j / 2 &&
                                        (a.y < this.y + this.g / 2 && b(0) || a.y >= this.y + this.g / 2 && b(2)) || a.x >= this.x + this.j / 2 && (a.y < this.y + this.g / 2 && b(1) || a.y >= this.y + this.g / 2 && b(3)) ? !0 : !1
                                },
                                ha: function() {
                                    var a = this.depth + 1,
                                        c = this.j / 2,
                                        d = this.g / 2;
                                    this.c.push(new b(this.x, this.y, c, d, a));
                                    this.c.push(new b(this.x + c, this.y, c, d, a));
                                    this.c.push(new b(this.x, this.y + d, c, d, a));
                                    this.c.push(new b(this.x + c, this.y + d, c, d, a));
                                    a = this.items;
                                    this.items = [];
                                    for (c = 0; c < a.length; c++) this.m(a[c])
                                },
                                clear: function() {
                                    for (var a = 0; a < this.c.length; a++) this.c[a].clear();
                                    this.items.length =
                                        0;
                                    this.c.length = 0
                                }
                            };
                            var e = {
                                x: 0,
                                y: 0,
                                j: 0,
                                g: 0
                            };
                            return {
                                root: new b(a.ca, a.da, a.oa - a.ca, a.pa - a.da, 0),
                                m: function(a) {
                                    this.root.m(a)
                                },
                                A: function(a, b) {
                                    this.root.A(a, b)
                                },
                                ra: function(a, b, c, d, f) {
                                    e.x = a;
                                    e.y = b;
                                    e.j = c;
                                    e.g = d;
                                    this.root.A(e, f)
                                },
                                H: function(a) {
                                    return this.root.H(a)
                                },
                                clear: function() {
                                    this.root.clear()
                                }
                            }
                        }
                    },
                    db = function() {
                        var a = new da(0, 0, 0, 32, "#ED1C24", ""),
                            b = document.createElement("canvas");
                        b.width = 32;
                        b.height = 32;
                        var c = b.getContext("2d");
                        return function() {
                            0 < k.length && (a.color = k[0].color, a.B(k[0].name));
                            c.clearRect(0,
                                0, 32, 32);
                            c.save();
                            c.translate(16, 16);
                            c.scale(.4, .4);
                            a.w(c);
                            c.restore();
                            var d = document.getElementById("favicon"),
                                e = d.cloneNode(!0);
                            //UPDATE -- NO IDEA WHAT I JUST DID THERE!
                            //e.setAttribute("href", b.toDataURL("image/png"));
                            d.parentNode.replaceChild(e, d)
                        }
                    }();
                e(function() {
                    db()
                });
                e(function() {
                    +d.localStorage.wannaLogin && (d.localStorage.loginCache && jb(d.localStorage.loginCache), d.localStorage.fbPictureCache && e(".agario-profile-picture").attr("src", d.localStorage.fbPictureCache))
                });
                d.facebookLogin = function() {
                    d.localStorage.wannaLogin = 1
                };
                d.fbAsyncInit =
                    function() {
                        function a() {
                            d.localStorage.wannaLogin = 1;
                            null == d.FB ? alert("You seem to have something blocking Facebook on your browser, please check for any extensions") : d.FB.login(function(a) {
                                La(a)
                            }, {
                                scope: "public_profile, email"
                            })
                        }
                        d.FB.init({
                            appId: "677505792353827",
                            cookie: !0,
                            xfbml: !0,
                            status: !0,
                            version: "v2.2"
                        });
                        d.FB.Event.subscribe("auth.statusChange", function(b) {
                            +d.localStorage.wannaLogin && ("connected" == b.status ? La(b) : a())
                        });
                        d.facebookLogin = a
                    };
                d.logout = function() {
                    B = null;
                    e("#helloContainer").attr("data-logged-in",
                        "0");
                    e("#helloContainer").attr("data-has-account-data", "0");
                    delete d.localStorage.wannaLogin;
                    delete d.localStorage.loginCache;
                    delete d.localStorage.fbPictureCache;
                    I()
                };
                var Fb = function() {
                    function a(a, b, c, d, e) {
                        var f = b.getContext("2d"),
                            h = b.width;
                        b = b.height;
                        a.color = e;
                        a.B(c);
                        a.size = d;
                        f.save();
                        f.translate(h / 2, b / 2);
                        a.w(f);
                        f.restore()
                    }
                    var b = new da(0, 0, 0, 32, "#5bc0de", "");
                    b.id = -1;
                    var c = new da(0, 0, 0, 32, "#5bc0de", "");
                    c.id = -1;
                    var d = document.createElement("canvas");
                    d.getContext("2d");
                    d.width = d.height = 70;
                    a(c, d,
                        "", 26, "#ebc0de");
                    return function() {
                        e(".cell-spinner").filter(":visible").each(function() {
                            var c = e(this),
                                f = Date.now(),
                                g = this.width,
                                h = this.height,
                                k = this.getContext("2d");
                            k.clearRect(0, 0, g, h);
                            k.save();
                            k.translate(g / 2, h / 2);
                            for (var m = 0; 10 > m; ++m) k.drawImage(d, (.1 * f + 80 * m) % (g + 140) - g / 2 - 70 - 35, h / 2 * Math.sin((.001 * f + m) % Math.PI * 2) - 35, 70, 70);
                            k.restore();
                            (c = c.attr("data-itr")) && (c = Z(c));
                            a(b, this, c || "", +e(this).attr("data-size"), "#5bc0de")
                        })
                    }
                }();
                d.createParty = function() {
                    Y(":party");
                    L = function(a) {
                        Ma("/#" + d.encodeURIComponent(a));
                        e(".partyToken").val("agar.io/#" + d.encodeURIComponent(a));
                        e("#helloContainer").attr("data-party-state", "1")
                    };
                    I()
                };
                d.joinParty = Wa;
                d.cancelParty = function() {
                    Ma("/");
                    e("#helloContainer").attr("data-party-state", "0");
                    Y("");
                    I()
                };
                e(function() {
                    e(pb)
                })
            }
        }
    }
})(window, window.jQuery);

(function(i, s, o, g, r, a, m) {
    i['GoogleAnalyticsObject'] = r;
    i[r] = i[r] || function() {
        (i[r].q = i[r].q || []).push(arguments)
    }, i[r].l = 1 * new Date();
    a = s.createElement(o),
        m = s.getElementsByTagName(o)[0];
    a.async = 1;
    a.src = g;
    m.parentNode.insertBefore(a, m)
})(window, document, 'script', '//www.google-analytics.com/analytics.js', 'apos');

apos('create', 'UA-64394184-1', 'auto');
apos('send', 'pageview');

window.ignoreStream = false;
window.refreshTwitch = function() {
    $.ajax({
        url: "https://api.twitch.tv/kraken/streams/apostolique",
        cache: false,
        dataType: "jsonp"
    }).done(function(data) {
        if (data["stream"] == null) {
            //console.log("Apostolique is not online!");
            window.setMessage([]);
            window.onmouseup = function() {};
            window.ignoreStream = false;
        } else {
            //console.log("Apostolique is online!");
            if (!window.ignoreStream) {
                window.setMessage(["twitch.tv/apostolique is online right now!", "Click the screen to open the stream!", "Press E to ignore."]);
                window.onmouseup = function() {
                    window.open("http://www.twitch.tv/apostolique");
                };
            }
        }
    }).fail(function() {});
}
setInterval(window.refreshTwitch, 60000);
window.refreshTwitch();
