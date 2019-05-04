// ==UserScript==
// @name         智慧树小工具
// @namespace    https://github.com/CodFrm/cxmooc-tools
// @version 1.01
// @description  一个知到智慧树的小工具,火狐,谷歌,油猴支持.支持视频倍速秒过,屏蔽题目(੧ᐛ੭挂科模式,启动)
// @author       CodFrm
// @run-at       document-start
// @match        *://study.zhihuishu.com/learning/videoList*
// @grant        none
// @license      MIT
// ==/UserScript==

let config = {
    auto: true,              //全自动挂机,无需手动操作,即可自动观看视频等
    interval: 5,             //时间间隔,当任务点完成后,会等待5分钟然后跳转到下一个任务点
    rand_answer: false,      //随机答案,没有答案的题目将自动的生成一个答案
    video_multiple: 1,       //视频播放倍速,视频播放的倍数,建议不要改动,为1即可,这是危险的功能
    video_mute: true,        //视频静音,视频自动静音播放
    vtoken: "user",          //鉴权token
};

localStorage['config'] = JSON.stringify(config);
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/tampermonkey/zhihuishu-pack.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/css-loader/dist/cjs.js!./src/cxmooc-tools/html/common.css":
/*!********************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/cxmooc-tools/html/common.css ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\")(false);\n// Module\nexports.push([module.i, \"#cxtools{\\r\\n    position: absolute;\\r\\n    left: 250px;\\r\\n    top: 2px;\\r\\n    width: 100px;   \\r\\n}\\r\\n\\r\\n#zhs-video-boom{\\r\\n    color:#fff;\\r\\n    background: #ff9d34;\\r\\n}\\r\\n\\r\\n#zhs-video-boom:hover{\\r\\n    background: #ff3838;\\r\\n}\", \"\"]);\n\n\n\n//# sourceURL=webpack:///./src/cxmooc-tools/html/common.css?./node_modules/css-loader/dist/cjs.js");

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n/*\n  MIT License http://www.opensource.org/licenses/mit-license.php\n  Author Tobias Koppers @sokra\n*/\n// css base code, injected by the css-loader\nmodule.exports = function (useSourceMap) {\n  var list = []; // return the list of modules as css string\n\n  list.toString = function toString() {\n    return this.map(function (item) {\n      var content = cssWithMappingToString(item, useSourceMap);\n\n      if (item[2]) {\n        return '@media ' + item[2] + '{' + content + '}';\n      } else {\n        return content;\n      }\n    }).join('');\n  }; // import a list of modules into the list\n\n\n  list.i = function (modules, mediaQuery) {\n    if (typeof modules === 'string') {\n      modules = [[null, modules, '']];\n    }\n\n    var alreadyImportedModules = {};\n\n    for (var i = 0; i < this.length; i++) {\n      var id = this[i][0];\n\n      if (id != null) {\n        alreadyImportedModules[id] = true;\n      }\n    }\n\n    for (i = 0; i < modules.length; i++) {\n      var item = modules[i]; // skip already imported module\n      // this implementation is not 100% perfect for weird media query combinations\n      // when a module is imported multiple times with different media queries.\n      // I hope this will never occur (Hey this way we have smaller bundles)\n\n      if (item[0] == null || !alreadyImportedModules[item[0]]) {\n        if (mediaQuery && !item[2]) {\n          item[2] = mediaQuery;\n        } else if (mediaQuery) {\n          item[2] = '(' + item[2] + ') and (' + mediaQuery + ')';\n        }\n\n        list.push(item);\n      }\n    }\n  };\n\n  return list;\n};\n\nfunction cssWithMappingToString(item, useSourceMap) {\n  var content = item[1] || '';\n  var cssMapping = item[3];\n\n  if (!cssMapping) {\n    return content;\n  }\n\n  if (useSourceMap && typeof btoa === 'function') {\n    var sourceMapping = toComment(cssMapping);\n    var sourceURLs = cssMapping.sources.map(function (source) {\n      return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */';\n    });\n    return [content].concat(sourceURLs).concat([sourceMapping]).join('\\n');\n  }\n\n  return [content].join('\\n');\n} // Adapted from convert-source-map (MIT)\n\n\nfunction toComment(sourceMap) {\n  // eslint-disable-next-line no-undef\n  var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));\n  var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;\n  return '/*# ' + data + ' */';\n}\n\n//# sourceURL=webpack:///./node_modules/css-loader/dist/runtime/api.js?");

/***/ }),

/***/ "./node_modules/style-loader/lib/addStyles.js":
/*!****************************************************!*\
  !*** ./node_modules/style-loader/lib/addStyles.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/*\n\tMIT License http://www.opensource.org/licenses/mit-license.php\n\tAuthor Tobias Koppers @sokra\n*/\n\nvar stylesInDom = {};\n\nvar\tmemoize = function (fn) {\n\tvar memo;\n\n\treturn function () {\n\t\tif (typeof memo === \"undefined\") memo = fn.apply(this, arguments);\n\t\treturn memo;\n\t};\n};\n\nvar isOldIE = memoize(function () {\n\t// Test for IE <= 9 as proposed by Browserhacks\n\t// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805\n\t// Tests for existence of standard globals is to allow style-loader\n\t// to operate correctly into non-standard environments\n\t// @see https://github.com/webpack-contrib/style-loader/issues/177\n\treturn window && document && document.all && !window.atob;\n});\n\nvar getTarget = function (target, parent) {\n  if (parent){\n    return parent.querySelector(target);\n  }\n  return document.querySelector(target);\n};\n\nvar getElement = (function (fn) {\n\tvar memo = {};\n\n\treturn function(target, parent) {\n                // If passing function in options, then use it for resolve \"head\" element.\n                // Useful for Shadow Root style i.e\n                // {\n                //   insertInto: function () { return document.querySelector(\"#foo\").shadowRoot }\n                // }\n                if (typeof target === 'function') {\n                        return target();\n                }\n                if (typeof memo[target] === \"undefined\") {\n\t\t\tvar styleTarget = getTarget.call(this, target, parent);\n\t\t\t// Special case to return head of iframe instead of iframe itself\n\t\t\tif (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {\n\t\t\t\ttry {\n\t\t\t\t\t// This will throw an exception if access to iframe is blocked\n\t\t\t\t\t// due to cross-origin restrictions\n\t\t\t\t\tstyleTarget = styleTarget.contentDocument.head;\n\t\t\t\t} catch(e) {\n\t\t\t\t\tstyleTarget = null;\n\t\t\t\t}\n\t\t\t}\n\t\t\tmemo[target] = styleTarget;\n\t\t}\n\t\treturn memo[target]\n\t};\n})();\n\nvar singleton = null;\nvar\tsingletonCounter = 0;\nvar\tstylesInsertedAtTop = [];\n\nvar\tfixUrls = __webpack_require__(/*! ./urls */ \"./node_modules/style-loader/lib/urls.js\");\n\nmodule.exports = function(list, options) {\n\tif (typeof DEBUG !== \"undefined\" && DEBUG) {\n\t\tif (typeof document !== \"object\") throw new Error(\"The style-loader cannot be used in a non-browser environment\");\n\t}\n\n\toptions = options || {};\n\n\toptions.attrs = typeof options.attrs === \"object\" ? options.attrs : {};\n\n\t// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>\n\t// tags it will allow on a page\n\tif (!options.singleton && typeof options.singleton !== \"boolean\") options.singleton = isOldIE();\n\n\t// By default, add <style> tags to the <head> element\n        if (!options.insertInto) options.insertInto = \"head\";\n\n\t// By default, add <style> tags to the bottom of the target\n\tif (!options.insertAt) options.insertAt = \"bottom\";\n\n\tvar styles = listToStyles(list, options);\n\n\taddStylesToDom(styles, options);\n\n\treturn function update (newList) {\n\t\tvar mayRemove = [];\n\n\t\tfor (var i = 0; i < styles.length; i++) {\n\t\t\tvar item = styles[i];\n\t\t\tvar domStyle = stylesInDom[item.id];\n\n\t\t\tdomStyle.refs--;\n\t\t\tmayRemove.push(domStyle);\n\t\t}\n\n\t\tif(newList) {\n\t\t\tvar newStyles = listToStyles(newList, options);\n\t\t\taddStylesToDom(newStyles, options);\n\t\t}\n\n\t\tfor (var i = 0; i < mayRemove.length; i++) {\n\t\t\tvar domStyle = mayRemove[i];\n\n\t\t\tif(domStyle.refs === 0) {\n\t\t\t\tfor (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();\n\n\t\t\t\tdelete stylesInDom[domStyle.id];\n\t\t\t}\n\t\t}\n\t};\n};\n\nfunction addStylesToDom (styles, options) {\n\tfor (var i = 0; i < styles.length; i++) {\n\t\tvar item = styles[i];\n\t\tvar domStyle = stylesInDom[item.id];\n\n\t\tif(domStyle) {\n\t\t\tdomStyle.refs++;\n\n\t\t\tfor(var j = 0; j < domStyle.parts.length; j++) {\n\t\t\t\tdomStyle.parts[j](item.parts[j]);\n\t\t\t}\n\n\t\t\tfor(; j < item.parts.length; j++) {\n\t\t\t\tdomStyle.parts.push(addStyle(item.parts[j], options));\n\t\t\t}\n\t\t} else {\n\t\t\tvar parts = [];\n\n\t\t\tfor(var j = 0; j < item.parts.length; j++) {\n\t\t\t\tparts.push(addStyle(item.parts[j], options));\n\t\t\t}\n\n\t\t\tstylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};\n\t\t}\n\t}\n}\n\nfunction listToStyles (list, options) {\n\tvar styles = [];\n\tvar newStyles = {};\n\n\tfor (var i = 0; i < list.length; i++) {\n\t\tvar item = list[i];\n\t\tvar id = options.base ? item[0] + options.base : item[0];\n\t\tvar css = item[1];\n\t\tvar media = item[2];\n\t\tvar sourceMap = item[3];\n\t\tvar part = {css: css, media: media, sourceMap: sourceMap};\n\n\t\tif(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});\n\t\telse newStyles[id].parts.push(part);\n\t}\n\n\treturn styles;\n}\n\nfunction insertStyleElement (options, style) {\n\tvar target = getElement(options.insertInto)\n\n\tif (!target) {\n\t\tthrow new Error(\"Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.\");\n\t}\n\n\tvar lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];\n\n\tif (options.insertAt === \"top\") {\n\t\tif (!lastStyleElementInsertedAtTop) {\n\t\t\ttarget.insertBefore(style, target.firstChild);\n\t\t} else if (lastStyleElementInsertedAtTop.nextSibling) {\n\t\t\ttarget.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);\n\t\t} else {\n\t\t\ttarget.appendChild(style);\n\t\t}\n\t\tstylesInsertedAtTop.push(style);\n\t} else if (options.insertAt === \"bottom\") {\n\t\ttarget.appendChild(style);\n\t} else if (typeof options.insertAt === \"object\" && options.insertAt.before) {\n\t\tvar nextSibling = getElement(options.insertAt.before, target);\n\t\ttarget.insertBefore(style, nextSibling);\n\t} else {\n\t\tthrow new Error(\"[Style Loader]\\n\\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\\n Must be 'top', 'bottom', or Object.\\n (https://github.com/webpack-contrib/style-loader#insertat)\\n\");\n\t}\n}\n\nfunction removeStyleElement (style) {\n\tif (style.parentNode === null) return false;\n\tstyle.parentNode.removeChild(style);\n\n\tvar idx = stylesInsertedAtTop.indexOf(style);\n\tif(idx >= 0) {\n\t\tstylesInsertedAtTop.splice(idx, 1);\n\t}\n}\n\nfunction createStyleElement (options) {\n\tvar style = document.createElement(\"style\");\n\n\tif(options.attrs.type === undefined) {\n\t\toptions.attrs.type = \"text/css\";\n\t}\n\n\tif(options.attrs.nonce === undefined) {\n\t\tvar nonce = getNonce();\n\t\tif (nonce) {\n\t\t\toptions.attrs.nonce = nonce;\n\t\t}\n\t}\n\n\taddAttrs(style, options.attrs);\n\tinsertStyleElement(options, style);\n\n\treturn style;\n}\n\nfunction createLinkElement (options) {\n\tvar link = document.createElement(\"link\");\n\n\tif(options.attrs.type === undefined) {\n\t\toptions.attrs.type = \"text/css\";\n\t}\n\toptions.attrs.rel = \"stylesheet\";\n\n\taddAttrs(link, options.attrs);\n\tinsertStyleElement(options, link);\n\n\treturn link;\n}\n\nfunction addAttrs (el, attrs) {\n\tObject.keys(attrs).forEach(function (key) {\n\t\tel.setAttribute(key, attrs[key]);\n\t});\n}\n\nfunction getNonce() {\n\tif (false) {}\n\n\treturn __webpack_require__.nc;\n}\n\nfunction addStyle (obj, options) {\n\tvar style, update, remove, result;\n\n\t// If a transform function was defined, run it on the css\n\tif (options.transform && obj.css) {\n\t    result = typeof options.transform === 'function'\n\t\t ? options.transform(obj.css) \n\t\t : options.transform.default(obj.css);\n\n\t    if (result) {\n\t    \t// If transform returns a value, use that instead of the original css.\n\t    \t// This allows running runtime transformations on the css.\n\t    \tobj.css = result;\n\t    } else {\n\t    \t// If the transform function returns a falsy value, don't add this css.\n\t    \t// This allows conditional loading of css\n\t    \treturn function() {\n\t    \t\t// noop\n\t    \t};\n\t    }\n\t}\n\n\tif (options.singleton) {\n\t\tvar styleIndex = singletonCounter++;\n\n\t\tstyle = singleton || (singleton = createStyleElement(options));\n\n\t\tupdate = applyToSingletonTag.bind(null, style, styleIndex, false);\n\t\tremove = applyToSingletonTag.bind(null, style, styleIndex, true);\n\n\t} else if (\n\t\tobj.sourceMap &&\n\t\ttypeof URL === \"function\" &&\n\t\ttypeof URL.createObjectURL === \"function\" &&\n\t\ttypeof URL.revokeObjectURL === \"function\" &&\n\t\ttypeof Blob === \"function\" &&\n\t\ttypeof btoa === \"function\"\n\t) {\n\t\tstyle = createLinkElement(options);\n\t\tupdate = updateLink.bind(null, style, options);\n\t\tremove = function () {\n\t\t\tremoveStyleElement(style);\n\n\t\t\tif(style.href) URL.revokeObjectURL(style.href);\n\t\t};\n\t} else {\n\t\tstyle = createStyleElement(options);\n\t\tupdate = applyToTag.bind(null, style);\n\t\tremove = function () {\n\t\t\tremoveStyleElement(style);\n\t\t};\n\t}\n\n\tupdate(obj);\n\n\treturn function updateStyle (newObj) {\n\t\tif (newObj) {\n\t\t\tif (\n\t\t\t\tnewObj.css === obj.css &&\n\t\t\t\tnewObj.media === obj.media &&\n\t\t\t\tnewObj.sourceMap === obj.sourceMap\n\t\t\t) {\n\t\t\t\treturn;\n\t\t\t}\n\n\t\t\tupdate(obj = newObj);\n\t\t} else {\n\t\t\tremove();\n\t\t}\n\t};\n}\n\nvar replaceText = (function () {\n\tvar textStore = [];\n\n\treturn function (index, replacement) {\n\t\ttextStore[index] = replacement;\n\n\t\treturn textStore.filter(Boolean).join('\\n');\n\t};\n})();\n\nfunction applyToSingletonTag (style, index, remove, obj) {\n\tvar css = remove ? \"\" : obj.css;\n\n\tif (style.styleSheet) {\n\t\tstyle.styleSheet.cssText = replaceText(index, css);\n\t} else {\n\t\tvar cssNode = document.createTextNode(css);\n\t\tvar childNodes = style.childNodes;\n\n\t\tif (childNodes[index]) style.removeChild(childNodes[index]);\n\n\t\tif (childNodes.length) {\n\t\t\tstyle.insertBefore(cssNode, childNodes[index]);\n\t\t} else {\n\t\t\tstyle.appendChild(cssNode);\n\t\t}\n\t}\n}\n\nfunction applyToTag (style, obj) {\n\tvar css = obj.css;\n\tvar media = obj.media;\n\n\tif(media) {\n\t\tstyle.setAttribute(\"media\", media)\n\t}\n\n\tif(style.styleSheet) {\n\t\tstyle.styleSheet.cssText = css;\n\t} else {\n\t\twhile(style.firstChild) {\n\t\t\tstyle.removeChild(style.firstChild);\n\t\t}\n\n\t\tstyle.appendChild(document.createTextNode(css));\n\t}\n}\n\nfunction updateLink (link, options, obj) {\n\tvar css = obj.css;\n\tvar sourceMap = obj.sourceMap;\n\n\t/*\n\t\tIf convertToAbsoluteUrls isn't defined, but sourcemaps are enabled\n\t\tand there is no publicPath defined then lets turn convertToAbsoluteUrls\n\t\ton by default.  Otherwise default to the convertToAbsoluteUrls option\n\t\tdirectly\n\t*/\n\tvar autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;\n\n\tif (options.convertToAbsoluteUrls || autoFixUrls) {\n\t\tcss = fixUrls(css);\n\t}\n\n\tif (sourceMap) {\n\t\t// http://stackoverflow.com/a/26603875\n\t\tcss += \"\\n/*# sourceMappingURL=data:application/json;base64,\" + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + \" */\";\n\t}\n\n\tvar blob = new Blob([css], { type: \"text/css\" });\n\n\tvar oldSrc = link.href;\n\n\tlink.href = URL.createObjectURL(blob);\n\n\tif(oldSrc) URL.revokeObjectURL(oldSrc);\n}\n\n\n//# sourceURL=webpack:///./node_modules/style-loader/lib/addStyles.js?");

/***/ }),

/***/ "./node_modules/style-loader/lib/urls.js":
/*!***********************************************!*\
  !*** ./node_modules/style-loader/lib/urls.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("\n/**\n * When source maps are enabled, `style-loader` uses a link element with a data-uri to\n * embed the css on the page. This breaks all relative urls because now they are relative to a\n * bundle instead of the current page.\n *\n * One solution is to only use full urls, but that may be impossible.\n *\n * Instead, this function \"fixes\" the relative urls to be absolute according to the current page location.\n *\n * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.\n *\n */\n\nmodule.exports = function (css) {\n  // get current location\n  var location = typeof window !== \"undefined\" && window.location;\n\n  if (!location) {\n    throw new Error(\"fixUrls requires window.location\");\n  }\n\n\t// blank or null?\n\tif (!css || typeof css !== \"string\") {\n\t  return css;\n  }\n\n  var baseUrl = location.protocol + \"//\" + location.host;\n  var currentDir = baseUrl + location.pathname.replace(/\\/[^\\/]*$/, \"/\");\n\n\t// convert each url(...)\n\t/*\n\tThis regular expression is just a way to recursively match brackets within\n\ta string.\n\n\t /url\\s*\\(  = Match on the word \"url\" with any whitespace after it and then a parens\n\t   (  = Start a capturing group\n\t     (?:  = Start a non-capturing group\n\t         [^)(]  = Match anything that isn't a parentheses\n\t         |  = OR\n\t         \\(  = Match a start parentheses\n\t             (?:  = Start another non-capturing groups\n\t                 [^)(]+  = Match anything that isn't a parentheses\n\t                 |  = OR\n\t                 \\(  = Match a start parentheses\n\t                     [^)(]*  = Match anything that isn't a parentheses\n\t                 \\)  = Match a end parentheses\n\t             )  = End Group\n              *\\) = Match anything and then a close parens\n          )  = Close non-capturing group\n          *  = Match anything\n       )  = Close capturing group\n\t \\)  = Match a close parens\n\n\t /gi  = Get all matches, not the first.  Be case insensitive.\n\t */\n\tvar fixedCss = css.replace(/url\\s*\\(((?:[^)(]|\\((?:[^)(]+|\\([^)(]*\\))*\\))*)\\)/gi, function(fullMatch, origUrl) {\n\t\t// strip quotes (if they exist)\n\t\tvar unquotedOrigUrl = origUrl\n\t\t\t.trim()\n\t\t\t.replace(/^\"(.*)\"$/, function(o, $1){ return $1; })\n\t\t\t.replace(/^'(.*)'$/, function(o, $1){ return $1; });\n\n\t\t// already a full url? no change\n\t\tif (/^(#|data:|http:\\/\\/|https:\\/\\/|file:\\/\\/\\/|\\s*$)/i.test(unquotedOrigUrl)) {\n\t\t  return fullMatch;\n\t\t}\n\n\t\t// convert the url to a full url\n\t\tvar newUrl;\n\n\t\tif (unquotedOrigUrl.indexOf(\"//\") === 0) {\n\t\t  \t//TODO: should we add protocol?\n\t\t\tnewUrl = unquotedOrigUrl;\n\t\t} else if (unquotedOrigUrl.indexOf(\"/\") === 0) {\n\t\t\t// path should be relative to the base url\n\t\t\tnewUrl = baseUrl + unquotedOrigUrl; // already starts with '/'\n\t\t} else {\n\t\t\t// path should be relative to current directory\n\t\t\tnewUrl = currentDir + unquotedOrigUrl.replace(/^\\.\\//, \"\"); // Strip leading './'\n\t\t}\n\n\t\t// send back the fixed url(...)\n\t\treturn \"url(\" + JSON.stringify(newUrl) + \")\";\n\t});\n\n\t// send back the fixed css\n\treturn fixedCss;\n};\n\n\n//# sourceURL=webpack:///./node_modules/style-loader/lib/urls.js?");

/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var g;\n\n// This works in non-strict mode\ng = (function() {\n\treturn this;\n})();\n\ntry {\n\t// This works if eval is allowed (see CSP)\n\tg = g || new Function(\"return this\")();\n} catch (e) {\n\t// This works if the window reference is available\n\tif (typeof window === \"object\") g = window;\n}\n\n// g can still be undefined, but nothing to do about it...\n// We return undefined, instead of nothing here, so it's\n// easier to handle this case. if(!global) { ...}\n\nmodule.exports = g;\n\n\n//# sourceURL=webpack:///(webpack)/buildin/global.js?");

/***/ }),

/***/ "./src/cxmooc-tools/common.js":
/*!************************************!*\
  !*** ./src/cxmooc-tools/common.js ***!
  \************************************/
/*! exports provided: injected, removeinjected, get, post, removeHTML, substrEx, randNumber, log, getImageBase64, boom_btn, clientMessage, serverMessage, gm_post, gm_get */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"injected\", function() { return injected; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"removeinjected\", function() { return removeinjected; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"get\", function() { return get; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"post\", function() { return post; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"removeHTML\", function() { return removeHTML; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"substrEx\", function() { return substrEx; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"randNumber\", function() { return randNumber; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"log\", function() { return log; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getImageBase64\", function() { return getImageBase64; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"boom_btn\", function() { return boom_btn; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"clientMessage\", function() { return clientMessage; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"serverMessage\", function() { return serverMessage; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"gm_post\", function() { return gm_post; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"gm_get\", function() { return gm_get; });\n/**\r\n * 注入js资源\r\n * @param doc \r\n * @param file \r\n */\r\nfunction injected(doc, url) {\r\n    let temp = doc.createElement('script');\r\n    temp.setAttribute('type', 'text/javascript');\r\n    temp.src = url;\r\n    temp.className = \"injected-js\";\r\n    doc.documentElement.appendChild(temp);\r\n    return temp;\r\n}\r\n\r\n/**\r\n * 移除注入js\r\n */\r\nfunction removeinjected(doc) {\r\n    let resource = doc.getElementsByClassName(\"injected-js\");\r\n    for (let i = 0; i < resource.length; i++) {\r\n        resource[i].remove();\r\n    }\r\n}\r\n\r\n/**\r\n * get请求\r\n * @param {*} url \r\n */\r\nfunction get(url, success) {\r\n    let xmlhttp = createRequest();\r\n    xmlhttp.open(\"GET\", url, true);\r\n    xmlhttp.send();\r\n\r\n    xmlhttp.onreadystatechange = function () {\r\n        if (this.readyState == 4) {\r\n            if (this.status == 200) {\r\n                success && success(this.responseText, this.resource);\r\n            } else {\r\n                xmlhttp.errorCallback && xmlhttp.errorCallback(this);\r\n            }\r\n        }\r\n    }\r\n    return xmlhttp;\r\n}\r\n\r\n/**\r\n * post请求\r\n * @param {*} url \r\n * @param {*} data \r\n * @param {*} json \r\n */\r\nfunction post(url, data, json = true, success) {\r\n    let xmlhttp = createRequest();\r\n    xmlhttp.open(\"POST\", url, true);\r\n    xmlhttp.setRequestHeader('Authorization', config.vtoken || '');\r\n    if (json) {\r\n        xmlhttp.setRequestHeader(\"Content-Type\", \"application/json\");\r\n    } else {\r\n        xmlhttp.setRequestHeader(\"Content-Type\", \"application/x-www-form-urlencoded\");\r\n    }\r\n    xmlhttp.send(data);\r\n\r\n    xmlhttp.onreadystatechange = function () {\r\n        if (this.readyState == 4) {\r\n            if (this.status == 200) {\r\n                success && success(this.responseText);\r\n            } else {\r\n                xmlhttp.errorCallback && xmlhttp.errorCallback(this);\r\n            }\r\n        }\r\n    }\r\n    return xmlhttp;\r\n}\r\n\r\n/**\r\n * 去除html标签和处理中文\r\n * @param {string} html \r\n */\r\nfunction removeHTML(html) {\r\n    //先处理img标签\r\n    var imgReplace = /<img .*?src=\"(.*?)\".*?>/g;\r\n    html = html.replace(imgReplace, '$1');\r\n    var revHtml = /<.*?>/g;\r\n    html = html.replace(revHtml, '');\r\n    html = html.replace(/(^\\s+)|(\\s+$)/g, '');\r\n    html = dealSymbol(html);\r\n    return html.replace(/&nbsp;/g, ' ');\r\n}\r\n\r\n/**\r\n * 处理符号\r\n * @param {*} topic \r\n */\r\nfunction dealSymbol(topic) {\r\n    topic = topic.replace('，', ',');\r\n    topic = topic.replace('（', '(');\r\n    topic = topic.replace('）', ')');\r\n    topic = topic.replace('？', '?');\r\n    topic = topic.replace('：', ':');\r\n    topic = topic.replace(/[“”]/g, '\"');\r\n    return topic;\r\n}\r\n\r\n/**\r\n * 取中间文本\r\n * @param {*} str \r\n * @param {*} left \r\n * @param {*} right \r\n */\r\nfunction substrEx(str, left, right) {\r\n    var leftPos = str.indexOf(left) + left.length;\r\n    var rightPos = str.indexOf(right, leftPos);\r\n    return str.substring(leftPos, rightPos);\r\n}\r\n\r\n/**\r\n * 创建http请求\r\n */\r\nfunction createRequest() {\r\n    var xmlhttp;\r\n    if (window.XMLHttpRequest) {\r\n        xmlhttp = new XMLHttpRequest();\r\n    } else {\r\n        xmlhttp = new ActiveXObject(\"Microsoft.XMLHTTP\");\r\n    }\r\n    xmlhttp.error = function (callback) {\r\n        xmlhttp.errorCallback = callback;\r\n        return xmlhttp;\r\n    }\r\n    return xmlhttp;\r\n}\r\n\r\nfunction randNumber(minNum, maxNum) {\r\n    switch (arguments.length) {\r\n        case 1:\r\n            return parseInt(Math.random() * minNum + 1, 10);\r\n        case 2:\r\n            return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);\r\n        default:\r\n            return 0;\r\n    }\r\n}\r\n\r\nDate.prototype.format = function (fmt) {\r\n    var o = {\r\n        \"M+\": this.getMonth() + 1, //月份 \r\n        \"d+\": this.getDate(), //日 \r\n        \"h+\": this.getHours(), //小时 \r\n        \"m+\": this.getMinutes(), //分 \r\n        \"s+\": this.getSeconds(), //秒 \r\n        \"q+\": Math.floor((this.getMonth() + 3) / 3), //季度 \r\n        \"S\": this.getMilliseconds() //毫秒 \r\n    };\r\n    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + \"\").substr(4 - RegExp.$1.length));\r\n    for (var k in o)\r\n        if (new RegExp(\"(\" + k + \")\").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : ((\"00\" + o[k]).substr((\"\" + o[k]).length)));\r\n    return fmt;\r\n}\r\n\r\nfunction log(msg) {\r\n    console.log(\"cxmooc-tools [\" + (new Date()).format(\"yyyy-MM-dd hh:mm:ss\") + \"] \" + msg)\r\n}\r\n\r\nfunction getImageBase64(img, ext) {\r\n    var canvas = document.createElement(\"canvas\");\r\n    canvas.width = img.width;\r\n    canvas.height = img.height;\r\n    var ctx = canvas.getContext(\"2d\");\r\n    ctx.drawImage(img, 0, 0, img.width, img.height);\r\n    var dataURL = canvas.toDataURL(\"image/\" + ext, 0.75);//节省可怜的流量>_<,虽然好像没有啥\r\n    canvas = null;\r\n    return dataURL;\r\n}\r\n\r\nfunction boom_btn() {\r\n    if (localStorage['boom_no_prompt'] == undefined || localStorage['boom_no_prompt'] != 1) {\r\n        let msg = prompt('秒过视频会产生不良记录,是否继续?如果以后不想再弹出本对话框请在下方填写yes')\r\n        if (msg === null) return false;\r\n        if (msg === 'yes') localStorage['boom_no_prompt'] = 1;\r\n    }\r\n    return true;\r\n}\r\n\r\n//消息发送\r\nfunction clientMessage(type, eventCallback) {\r\n    let self = {};\r\n    self.tag = Math.random();\r\n    window.addEventListener('message', function (event) {\r\n        if (event.data.recv_tag && event.data.recv_tag == self.tag) {\r\n            eventCallback && eventCallback(event.data.param, event);\r\n        }\r\n    });\r\n    self.send = function (param) {\r\n        window.postMessage({ type: type, send_tag: self.tag, param: param }, '*');\r\n        return self;\r\n    };\r\n    return self;\r\n}\r\n\r\nfunction serverMessage(type, eventCallback) {\r\n    let self = {};\r\n    window.addEventListener('message', function (event) {\r\n        if (event.data.type && event.data.type == type && event.data.send_tag) {\r\n            eventCallback && eventCallback(event.data.param, function (param) {\r\n                self.send(param, event.data.send_tag);\r\n            });\r\n        }\r\n    });\r\n    self.send = function (param, tag) {\r\n        window.postMessage({ type: type, recv_tag: tag, param: param }, '*');\r\n        return self;\r\n    }\r\n    return self;\r\n}\r\n\r\n/**\r\n * 跨域的post请求\r\n * @param {*} url \r\n * @param {*} data \r\n * @param {*} json \r\n * @param {*} success \r\n */\r\nfunction gm_post(url, data, json = true, success) {\r\n    let self = {};\r\n    GM_xmlhttpRequest({\r\n        url: url,\r\n        method: 'POST',\r\n        headers: {\r\n            'Authorization': config.vtoken || '',\r\n            'Content-Type': json ? 'application/json' : 'application/x-www-form-urlencoded',\r\n        },\r\n        data: data,\r\n        onreadystatechange: function (response) {\r\n            if (response.readyState == 4) {\r\n                if (response.status == 200) {\r\n                    success && success(response.responseText);\r\n                } else {\r\n                    self.errorCallback && self.errorCallback(response);\r\n                }\r\n            }\r\n        }\r\n    });\r\n    self.error = function (errorCallback) {\r\n        self.errorCallback = errorCallback;\r\n    }\r\n    return self;\r\n}\r\n\r\n/**\r\n * 跨域的get请求\r\n * @param {*} url \r\n * @param {*} data \r\n * @param {*} json \r\n * @param {*} success \r\n */\r\nfunction gm_get(url, success) {\r\n    let self = {};\r\n    GM_xmlhttpRequest({\r\n        url: url,\r\n        method: 'GET',\r\n        onreadystatechange: function (response) {\r\n            if (response.readyState == 4) {\r\n                if (response.status == 200) {\r\n                    success && success(response.responseText);\r\n                } else {\r\n                    self.errorCallback && self.errorCallback(response);\r\n                }\r\n            }\r\n        }\r\n    });\r\n    self.error = function (errorCallback) {\r\n        self.errorCallback = errorCallback;\r\n    }\r\n    return self;\r\n}\r\n\r\n//实现GM_xmlhttpRequest\r\nif (window.GM_xmlhttpRequest == undefined) {\r\n    window.GM_xmlhttpRequest = function (param) {\r\n        let send = {};\r\n        send.url = param.url;\r\n        send.method = param.method;\r\n        send.data = param.data;\r\n        send.headers = param.headers;\r\n        clientMessage('GM_xmlhttpRequest', function (response, event) {\r\n            if (response.event || response.event == 'onreadystatechange') {\r\n                param.onreadystatechange && param.onreadystatechange(response);\r\n            }\r\n        }).send(send);\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack:///./src/cxmooc-tools/common.js?");

/***/ }),

/***/ "./src/cxmooc-tools/html/common.css":
/*!******************************************!*\
  !*** ./src/cxmooc-tools/html/common.css ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("\nvar content = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js!./common.css */ \"./node_modules/css-loader/dist/cjs.js!./src/cxmooc-tools/html/common.css\");\n\nif(typeof content === 'string') content = [[module.i, content, '']];\n\nvar transform;\nvar insertInto;\n\n\n\nvar options = {\"hmr\":true}\n\noptions.transform = transform\noptions.insertInto = undefined;\n\nvar update = __webpack_require__(/*! ../../../node_modules/style-loader/lib/addStyles.js */ \"./node_modules/style-loader/lib/addStyles.js\")(content, options);\n\nif(content.locals) module.exports = content.locals;\n\nif(false) {}\n\n//# sourceURL=webpack:///./src/cxmooc-tools/html/common.css?");

/***/ }),

/***/ "./src/cxmooc-tools/zhihuishu/video.js":
/*!*********************************************!*\
  !*** ./src/cxmooc-tools/zhihuishu/video.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const css = __webpack_require__(/*! ../html/common.css */ \"./src/cxmooc-tools/html/common.css\");\r\nconst common = __webpack_require__(/*! ../common */ \"./src/cxmooc-tools/common.js\");\r\n\r\nmodule.exports = {\r\n    id: undefined,\r\n    innerTimer: undefined,\r\n    videoInfo: undefined,\r\n    compile: function () {\r\n        if ($('.progressbar_box_tip').text().indexOf('100%') < 0) {\r\n            return;\r\n        }\r\n        //完成切换\r\n        common.log('zhs video switch');\r\n        let self = this;\r\n        this.innerTimer && clearTimeout(this.innerTimer);\r\n        this.innerTimer = setTimeout(function () {\r\n            config.auto && $(self.id + ' #nextBtn').click();\r\n        }, config.duration);\r\n    },\r\n    start: function () {\r\n        let self = this;\r\n        self.createToolsBar();\r\n        //hook智慧树视频\r\n        let hookPlayerStarter = PlayerStarter;\r\n        PlayerStarter.hookCreatePlayer = PlayerStarter.createPlayer;\r\n        PlayerStarter.createPlayer = function ($container, options, callback) {\r\n            self.innerTimer && clearTimeout(self.innerTimer);\r\n            self.id = $container.selector;\r\n            let hookPause = callback.onPause;\r\n            let hookComplete = callback.onComplete;\r\n            let hookReady = callback.onReady;\r\n            let video = undefined;\r\n            callback.onReady = function () {\r\n                console.log('准备');\r\n                hookReady();\r\n                //倍速,启动!\r\n                video = $(self.id + ' video')[0]\r\n                video.playbackRate = config.video_multiple;\r\n                //又是以防万一的暂停,顺带检测进度\r\n                self.innerTimer = setInterval(function () {\r\n                    try {\r\n                        config.auto && video.play();\r\n                    } catch (e) { }\r\n                    if ($('.progressbar_box_tip').text().indexOf('100%') >= 0) {\r\n                        self.compile();\r\n                    }\r\n                }, 10000);\r\n            }\r\n            callback.onPause = function () {\r\n                console.log('暂停');\r\n                hookPause();\r\n                config.auto && video.play();\r\n            }\r\n            callback.onComplete = function () {\r\n                console.log('完成');\r\n                hookComplete();\r\n            }\r\n            if (config.video_mute) {\r\n                options.volume = 0;\r\n            }\r\n            console.log(options);\r\n            options.autostart = true;\r\n            // options.control.nextBtn = true;\r\n            this.hookCreatePlayer($container, options, callback);\r\n        }\r\n    },\r\n    createToolsBar: function () {\r\n        let tools = $('<div class=\"entrance_div\" id=\"cxtools\"><ul></ul></div>');\r\n        let boomBtn = $('<li><a href=\"#\" id=\"zhs-video-boom\">秒过视频</a></li>');\r\n        let self = this;\r\n        $(tools).find('ul').append(boomBtn);\r\n        $(boomBtn).click(function () {\r\n            if (common.boom_btn()) {\r\n                self.sendBoomPack();\r\n            }\r\n        });\r\n        $('.videotop_box.clearfix').append(tools);\r\n    },\r\n    sendBoomPack: function () {\r\n        //发送秒过包\r\n        //ev算法\r\n        let evFun = D26666.Z;\r\n        let timeStr = $('#video-' + this.videoInfo.videoId + ' .time.fl').text();\r\n        let time = 0;\r\n        let temp = timeStr.match(/[\\d]+/ig);\r\n        for (let i = 0; i < 3; i++) {\r\n            time += temp[i] * Math.pow(60, 2 - i);\r\n        }\r\n        time += common.randNumber(60, 666);\r\n        let ev = [\r\n            this.videoInfo.rid, this.videoInfo.chapterId, this.videoInfo.courseId, this.videoInfo.lessonId,\r\n            timeStr, time, this.videoInfo.videoId, (this.videoInfo.lessonVideoId && this.videoInfo.lessonVideoId != null ? this.videoInfo.lessonVideoId : 0)\r\n        ];\r\n        let postData = '__learning_token__=' + encodeURIComponent(btoa('' + this.videoInfo.studiedLessonDto.id)) + '&watchPoint=' +\r\n            '&ev=' + evFun(ev) + (this.videoInfo.lessonVideoId && this.videoInfo.lessonVideoId != null ? '&lessonVideoId=' + this.videoInfo.lessonVideoId : '');\r\n        common.post('/json/learning/saveCacheIntervalTime?time=' + (new Date().valueOf()), postData, false, function (res) {\r\n            let json = JSON.parse(res);\r\n            if (json.studyTotalTime >= time) {\r\n                alert('秒过成功,刷新后查看效果');\r\n            } else {\r\n                alert('秒过失败');\r\n            }\r\n        });\r\n    },\r\n    hookAjax: function () {\r\n        let self = this;\r\n        window.hookXMLHttpRequest = window.hookXMLHttpRequest || XMLHttpRequest;\r\n        XMLHttpRequest = function () {\r\n            let retAjax = new window.hookXMLHttpRequest();\r\n            retAjax.hookOpen = retAjax.open;\r\n            retAjax.open = function (p1, p2, p3, p4, p5) {\r\n                if (p2.indexOf('learning/loadVideoPointerInfo') >= 0) {\r\n                    console.log('题目来了');\r\n                    //TODO:先实现屏蔽题目,后面实现自动填充(虽然这好像没有意义)\r\n                    Object.defineProperty(retAjax, 'responseText', {\r\n                        get: function () {\r\n                            let retText = retAjax.response.replace(/\"lessonDtoMap\":{.*?},\"lessonId\"/gm, '\"lessonDtoMap\":{},\"lessonId\"');;\r\n                            return retText;\r\n                        }\r\n                    });\r\n                } else if (p2.indexOf('learning/prelearningNote') >= 0) {\r\n                    //拦截数据\r\n                    Object.defineProperty(retAjax, 'responseText', {\r\n                        get: function () {\r\n                            self.videoInfo = JSON.parse(retAjax.response);\r\n                            return retAjax.response;\r\n                        }\r\n                    });\r\n                }\r\n                return retAjax.hookOpen(p1, p2, p3, p4, p5);\r\n            }\r\n            return retAjax;\r\n        }\r\n    }\r\n}\n\n//# sourceURL=webpack:///./src/cxmooc-tools/zhihuishu/video.js?");

/***/ }),

/***/ "./src/cxmooc-tools/zhihuishu/zhihuishu.js":
/*!*************************************************!*\
  !*** ./src/cxmooc-tools/zhihuishu/zhihuishu.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const video = __webpack_require__(/*! ./video */ \"./src/cxmooc-tools/zhihuishu/video.js\");\r\n\r\nmodule.exports = {\r\n    video: function () {\r\n        video.hookAjax();\r\n        let timer = setInterval(function () {\r\n            try {\r\n                video.start();\r\n                clearInterval(timer);\r\n            } catch (e) { }\r\n        }, 499);\r\n    }\r\n};\r\n\r\n\n\n//# sourceURL=webpack:///./src/cxmooc-tools/zhihuishu/zhihuishu.js?");

/***/ }),

/***/ "./src/tampermonkey/common.js":
/*!************************************!*\
  !*** ./src/tampermonkey/common.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/* WEBPACK VAR INJECTION */(function(global) {global.config = JSON.parse(localStorage['config']);\r\nconfig.duration = (config.interval || 0.1) * 60000;\r\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/global.js */ \"./node_modules/webpack/buildin/global.js\")))\n\n//# sourceURL=webpack:///./src/tampermonkey/common.js?");

/***/ }),

/***/ "./src/tampermonkey/zhihuishu-pack.js":
/*!********************************************!*\
  !*** ./src/tampermonkey/zhihuishu-pack.js ***!
  \********************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./common */ \"./src/tampermonkey/common.js\");\n/* harmony import */ var _common__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_common__WEBPACK_IMPORTED_MODULE_0__);\n\r\nconst zhihuishu = __webpack_require__(/*! ../cxmooc-tools/zhihuishu/zhihuishu */ \"./src/cxmooc-tools/zhihuishu/zhihuishu.js\");\r\n\r\nif (window.location.href.indexOf('zhihuishu.com/learning/videoList') > 0) {\r\n    zhihuishu.video();\r\n}\n\n//# sourceURL=webpack:///./src/tampermonkey/zhihuishu-pack.js?");

/***/ })

/******/ });