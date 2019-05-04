// ==UserScript==
// @name          Google Calendar Collapsible Nav
// @version       1.0.0
// @description   Makes the left-hand side navigation pane in Google Calendar collapsible.
// @namespace     https://greasyfork.org/en/users/15562
// @author        Jonathan Brochu (https://greasyfork.org/en/users/15562)
// @license       GPLv3 or later (http://www.gnu.org/licenses/gpl-3.0.en.html)
// @require       https://cdnjs.cloudflare.com/ajax/libs/sizzle/2.3.3/sizzle.min.js
// @include       https://www.google.com/calendar/*
// @include       https://calendar.google.com/calendar/*
// @grant         GM_addStyle
// @grant         GM_getValue
// @grant         GM_setValue
// @grant         GM_deleteValue
// ==/UserScript==

/***
 * History:
 *
 * 1.0.0  Change made:
 *        - Rewrote the user script to get rid of the MooTools dependency.
 *        (2017-10-27)
 * 0.2.3  Change made:
 *        - Fixed a few things to make the code compatible with Chrome's
 *          extension environment, including:
 *          * Emulating GM_getValue(), GM_setValue() & GM_deleteValue()
 *            when being run against Chrome API.
 *          * Replacing window.$() by document.id().
 *          * Proper fallback path for the implementation of window.console().
 *        (2015-12-07)
 * 0.2.2  Changes made:
 *        - Updated @include statement to use the new Google Calendar URLs.
 *        - Removed support for matching non-secure (http://) pages.
 *        - Updated script for use with the repository [greasyfork.org],
 *          including the @require statement.
 *        - No change made to the code.
 *        (2015-09-14)
 * 0.2.1  Change made:
 *        - Updated @require statement following demise of scripts repository
 *          http://userscripts.org/.
 *        (2015-03-30)
 * 0.2.0  Changes made:
 *        - Now script stores and remembers last state of the nav pane between
 *          sessions (i.e. either collapsed or expanded).
 *        - Moved code using MooTools features within the payload() function
 *          (technically, the @require scripts are retrieved only once, when
 *          the user script is installed, so it should always be loaded and
 *          available within the sandbox, but just in case it isn't).
 *        - Added script update capability.
 *        (2014-01-27)
 * 0.1.3  Change made:
 *        - Reduced left margin of restore handle for when layout density is in
 *          "Compact" mode.
 * 0.1.2  Changes made:
 *        - Reverted to the original (pre-release) location of the handle used
 *          to restore the navigation pane, i.e. at left of the Calendar logo,
 *          as when at the current location (above the timezones column) the
 *          handle gets detroyed when changing views (i.e. agenda, month, etc.)
 *        - Changed and standardized variable names and element ids for the
 *          collapse (hide) and restore (show) handles and their containers,
 *          so the script makes a bit more sense when reading it.
 *        - Removed some debug calls.
 *        (2012-11-07)
 * 0.1.1  Changes made:
 *        - Removed some test strings left behind after testing localization
 *          support.
 *        - Corrected the fact that "localization" is 12-letter long, not 13.
 *        (2012-11-07)
 * 0.1    First implementation.
 *        Currently using a modified version of MooTools v1.2.1 compatible
 *        with Greasemonkey (by kchmck, http://userscripts.org/users/kchmck).
 *        (2012-11-07)
 *
 */

(function(){

    // constants
    var USERSCRIPT_NAME = 'Google Calendar Collapsible Nav',
        CHROME_EXTENSION_ID = 'moelggbhbfbfnjpogicnihajiagflebl',
        CEID = CHROME_EXTENSION_ID,
        CEID_ABBR = CEID.substr(0,5)+'..'+CEID.substr(CEID.length - 5, 5),
        ELEM_ID_COLLAPSE_HANDLE = CEID+'-el_collapse-handle',
        ELEM_ID_RESTORE_HANDLE = CEID+'-el_restore-handle',
        STATE_KEY_COLLAPSED = CEID+'-param_collapsed',
        CLASS_NAME_COLLAPSED = CEID_ABBR+'-collapsed',
        CLASS_NAME_FULLLEFT = CEID_ABBR+'-full-left',
        CLASS_NAME_HIDDEN = CEID_ABBR+'-hidden',
        BUILD_RESTORE_HANDLE_LEFT_OF_LOGO = true;

    // extend Javascript objects with some helpers
    var extendJS = function() {
        // polyfills & custom JS extensions
        var __und = 'undefined',
            __arr = 'array',
            __obj = 'object',
            __fnc = 'function',
            __str = 'string',
            __cls = 'class',
            __stl = 'style';
        var instanceOf = this.instanceOf = function(item, object){
            if (item === null) return false;
            var constructor = item.constructor;
            while (constructor){
                if (constructor === object) return true;
                constructor = constructor.parent;
            }
            /*<ltIE8>*/
            if (!item.hasOwnProperty) return false;
            /*</ltIE8>*/
            return item instanceof object;
        };
        if (typeof window.typeOf === __und) {
            window.typeOf = (function __typeOf(global) {
                return function(obj) {
                    if (obj === global) return "window";
                    if (typeof obj === 'undefined') return "undefined";
                    if (obj !== null) {
                        if (obj.nodeName) if (obj.nodeType == 3) return (/\S/).test(obj.nodeValue) ? 'textnode' : 'whitespace';
                        if (typeof obj.length == 'number') if (typeof obj.callee == __fnc) return 'arguments';
                    }
                    return [({}).toString.call(obj).match(/\s([a-z|A-Z]+)/)[1].toLowerCase()].map(function(name) {
                        switch(true) {
                            case (/^[a-z]*event$/.test(name)): return 'domevent';
                            case (/^html[a-z]+element$/.test(name)): return 'element';
                            case (!!(matches = /^html([a-z]+)$/.exec(name))): return matches[1];
                        }
                        return name;
                    });
                };
            })(window);
        }
        // String object & instances
        if (typeof String.prototype.camelCase === __und) {
            String.prototype.camelCase = function() {
                return String(this).replace(/-\D/g, function(match) {
                    return match.charAt(1).toUpperCase();
                });
            };
        }
        if (typeof String.prototype.capitalize === __und) {
            String.prototype.capitalize = function() {
                return String(this).replace(/\b[a-z]/g, function(match) {
                    return match.toUpperCase();
                });
            };
        }
        if (typeof String.prototype.hyphenate === __und) {
            String.prototype.hyphenate = function() {
                return String(this).replace(/[A-Z]/g, function(match) {
                    return ('-' + match.charAt(0).toLowerCase());
                });
            };
        }
        if (typeof String.prototype.toInt === __und) {
            String.prototype.toInt = function(base) {
                return parseInt(this, base || 10);
            };
        }
        if (typeof String.prototype.toFloat === __und) {
            String.prototype.toFloat = function() {
                return parseFloat(this);
            };
        }
        if (typeof String.prototype.rgbToHex === __und) {
            String.prototype.rgbToHex = function(array) {
                var rgb = String(this).match(/\d{1,3}/g);
                return (rgb) ? rgb.rgbToHex(array) : null;
            };
        }
        if (typeof String.prototype.trim === __und) {
            String.prototype.trim = function() {
                return this.replace(/^\s+|\s+$/g, '');
            };
        }
        // Array object & instances
        if (typeof Array.clone === __und) {
            var dummyObjClone = (function(){
                if (typeof Object.clone === __und) {
                    Object.clone = function() {};
                    return true;
                }
                return false;
            })();
            Array.clone = function(original) {
                var i = original.length,
                    clone = new Array(i);
                while (i--) {
                    switch (typeOf(original[i])) {
                        case __arr: clone[i] = Array.clone(original[i]); break;
                        case __obj: clone[i] = Object.clone(original[i]); break;
                        default: clone[i] = original[i];
                    }
                }
                return clone;
            };
            if (dummyObjClone) delete Object.clone;
        }
        if (typeof Array.each === __und) {
            Array.each = function(iterable, fn, bind) {
                if (typeof iterable === __obj) {
                    return Object.each(iterable, fn, bind);
                } else {
                    for (var i = 0, l = iterable.length; i < l; i++) {
                        fn.call(bind, iterable[i], i, iterable);
                    }
                }
            };
        }
        if (typeof Array.flatten === __und) {
            Array.flatten = function(that) {
                var array = [];
                for (var i = 0, l = that.length; i < l; i++){
                    var type = typeOf(that[i]);
                    if (type == 'null') continue;
                    array = array.concat((type == 'array' || type == 'collection' || type == 'arguments' || instanceOf(that[i], Array)) ? Array.flatten(that[i]) : that[i]);
                }
                return array;
            };
        }
        if (typeof Array.prototype.clone === __und) {
            Array.prototype.clone = function() {
                return this.slice(0);
            };
        }
        if (typeof Array.prototype.contains === __und) {
            Array.prototype.contains = function(item, from) {
                return this.indexOf(item, from) != -1;
            };
        }
        if (typeof Array.prototype.include === __und) {
            Array.prototype.include = function(item) {
                if (!this.contains(item)) this.push(item);
                return this;
            };
        }
        if (typeof Array.prototype.each === __und) {
            Array.prototype.each = Array.prototype.forEach || function(fn, bind) {
                for (var i = 0, l = this.length; i < l; i++) {
                    if (i in this) fn.call(bind, this[i], i, this);
                }
            };
        }
        if (typeof Array.prototype.rgbToHex === __und) {
            Array.prototype.rgbToHex = function(array) {
                if (this.length < 3) return null;
                if (this.length === 4 && this[3] === 0 && !array) return 'transparent';
                var hex = [];
                for (var i = 0; i < 3; i++) {
                    var bit = (this[i] - 0).toString(16);
                    hex.push((bit.length == 1) ? '0' + bit : bit);
                }
                return (array) ? hex : '#' + hex.join('');
            };
        }
        // Object object
        if (typeof Object.append  === __und) {
            Object.append = function(original /*, extension, extension, [...] */) {
                for (var i = 1, l = arguments.length; i < l; i++) {
                    var extension = arguments[i] || {};
                    for (var key in extension) original[key] = extension[key];
                }
                return original;
            };
        }
        if (typeof Object.clone === __und) {
            Object.clone = function(original) {
                var clone = {};
                for (var key in original) {
                    switch (typeOf(original[key])) {
                        case __arr: clone[key] = Array.clone(original[i]); break;
                        case __obj: clone[key] = Object.clone(original[i]); break;
                        default: clone[i] = original[i];
                    }
                    clone[key] = cloneOf(object[key]);
                }
                return clone;
            };
        }
        if (typeof Object.each === __und) {
            Object.each = function(object, fn, bind) {
                if (typeOf(object) === __arr) {
                    return Array.each(object, fn, bind);
                } else {
                    var hasOwnProperty = Object.prototype.hasOwnProperty;
                    for (var key in object){
                        if (hasOwnProperty.call(object, key)) fn.call(bind, object[key], key, object);
                    }
                }
            };
        }
        // Function object & instances
        if (typeof Function.prototype.delay === __und) {
            Function.prototype.delay = function(millisecs) {
                // Remove the seconds from the parameters to pass the this function.
                var args = [].slice.call(arguments, 1);
                // Call this function with the specified parameters in the specified amount
                // of seconds.
                var fnThis = this;
                return setTimeout(function(){
                    fnThis.apply(undefined, args);
                    }, millisecs);
            };
        }
        if (typeof Function.heredoc === __und) {
            Function.heredoc = function(fn /*, vars */) {
                var str = fn.toString().match(/\/\*\s*([\s\S]*?)\s*\*\//m)[1],
                    vars =  arguments[1];
                if (typeof vars === __obj) {
                    Object.each(vars, function(value, varName) {
                        str = str.replace(/\{\{\{([^\}]+)\}\}\}/g, function(match, p1) {
                            if (p1 === varName) {
                                return value;
                            } else {
                                return match;
                            }
                        });
                    });
                }
                return str;
            };
        }
        var Browser = (function(){
            var ua = navigator.userAgent.toLowerCase(),
                platform = navigator.platform.toLowerCase(),
                UA = ua.match(/(opera|ie|firefox|chrome|version)[\s\/:]([\w\d\.]+)?.*?(safari|version[\s\/:]([\w\d\.]+)|$)/) || [null, 'unknown', 0],
                mode = UA[1] == 'ie' && document.documentMode,
                _browser = {
                    extend: function() {},
                    name: (UA[1] == 'version') ? UA[3] : UA[1],
                    version: mode || parseFloat((UA[1] == 'opera' && UA[4]) ? UA[4] : UA[2]),
                    Platform: {
                        name: ua.match(/ip(?:ad|od|hone)/) ? 'ios' : (ua.match(/(?:webos|android)/) || platform.match(/mac|win|linux/) || ['other'])[0]
                    },
                    Features: {
                        xpath: !!(document.evaluate),
                        air: !!(window.runtime),
                        query: !!(document.querySelector),
                        json: !!(window.JSON)
                    },
                    Plugins: {}
                };
            _browser[_browser.name] = true;
            _browser[_browser.name + parseInt(_browser.version, 10)] = true;
            _browser.Platform[_browser.Platform.name] = true;
            return _browser;
        })();

        // scavenged from MooTools
        Element.Prototype = {
            hasClass: function(className) {
                if (typeof className !== __str) return this;
                if (typeof this.getAttribute === __und) return false;
                var currClasses = this.getAttribute(__cls);
                if (typeof currClasses !== __und && currClasses) {
                    var idx = String(" " + currClasses.trim() + " ").indexOf(" " + className.trim() + " ");
                    return (idx !== -1);
                } else {
                    this.removeAttribute(__cls);
                    return false;
                }
            },
            removeClass: function(className) {
                if (typeof className !== __str) return this;
                if (typeof this.setAttribute === __und) return this;
                if (this.hasClass(className)) {
                    this.setAttribute(__cls, String(" " + String(this.getAttribute(__cls) || '').trim() + " ").replace(" " + className.trim() + " ", " ").trim());
                }
                return this;
            },
            addClass: function(className) {
                if (typeof className !== __str) return this;
                if (typeof this.setAttribute === __und) return this;
                if (!this.hasClass(className)) {
                    this.setAttribute(__cls, String(String(this.getAttribute(__cls) || '').trim() + " "+ className.trim()).trim());
                }
                return this;
            },
            remove: function() {
                if (this.parentNode !== null) {
                    this.parentNode.removeChild(this);
                }
            },
            inject: function(refEl, where) {
                var inserters = {
                    before: function(context, element){
                        var parent = element.parentNode;
                        if (parent) parent.insertBefore(context, element);
                    },
                    after: function(context, element){
                        var parent = element.parentNode;
                        if (parent) parent.insertBefore(context, element.nextSibling);
                    },
                    bottom: function(context, element){
                        element.appendChild(context);
                    },
                    top: function(context, element){
                        element.insertBefore(context, element.firstChild);
                    }
                };
                inserters.inside = inserters.bottom;
                inserters[where || 'bottom'](this, refEl);
                return this;
            }
        };
        Object.append(Element.Prototype, (function(){
            var html = document.html = document.documentElement,
                floatName = (html.style.cssFloat === null) ? 'styleFloat' : 'cssFloat',
                hasOpacity = (html.style.opacity !== null),
                hasFilter = (html.style.filter !== null),
                reAlpha = /alpha\(opacity=([\d.]+)\)/i;
            return {
                getComputedStyle: function(property) {
                    if (this.currentStyle) return this.currentStyle[property.camelCase()];
                    var defaultView = this.ownerDocument.defaultView,
                        computed = defaultView ? defaultView.getComputedStyle(this, null) : null;
                    return (computed) ? computed.getPropertyValue((property == floatName) ? 'float' : property.hyphenate()) : null;
                },
                getOpacity: (hasOpacity ? function() {
                    var opacity = this.style.opacity || this.getComputedStyle('opacity');
                    return (opacity === '') ? 1 : opacity.toFloat();
                } : (hasFilter ? function() {
                    var filter = (this.style.filter || this.getComputedStyle('filter')),
                        opacity;
                    if (filter) opacity = filter.match(reAlpha);
                    return (opacity === null || filter === null) ? 1 : (opacity[1] / 100);
                } : function() {
                    return (this.style.visibility == 'hidden' ? 0 : 1);
                })),
                getStyle: function(property) {
                    if (property == 'opacity') return this.getOpacity();
                    property = (property == 'float' ? floatName : property).camelCase();
                    var result = this.style[property];
                    if (!result || property == 'zIndex') {
                        result = this.getComputedStyle(property);
                    }
                    if (result) {
                        result = String(result);
                        var color = result.match(/rgba?\([\d\s,]+\)/);
                        if (color) result = result.replace(color[0], color[0].rgbToHex());
                    }
                    if (Browser.ie && isNaN(parseFloat(result))) {
                        if ((/^(height|width)$/).test(property)) {
                            var values = (property == 'width') ? ['left', 'right'] : ['top', 'bottom'], size = 0;
                            values.each(function(value) {
                                size += this.getStyle('border-' + value + '-width').toInt() + this.getStyle('padding-' + value).toInt();
                            }, this);
                            return this['offset' + property.capitalize()] - size + 'px';
                        }
                        if (Browser.opera && String(result).indexOf('px') != -1) return result;
                        if ((/^border(.+)Width|margin|padding/).test(property)) return '0px';
                    }
                    return result;
                },
                getStyles: function(){
                    var result = {};
                    Array.flatten(arguments).each(function(key){
                        result[key] = this.getStyle(key);
                    }, this);
                    return result;
                }
            };
        })());
        Object.append(document, {
            addStyle: function(css, media) {
                if (!media) { media = 'all'; }
                var heads = this.getElementsByTagName('head');
                if (heads.length > 0) {
                    var node = this.createElement(__stl);
                    node.type = 'text/css';
                    node.media = media;
                    node.appendChild(this.createTextNode(css));
                    heads[0].appendChild(node);
                }
            },
            uidOf: (function(){
                var local = {};
                local.uidx = 1;
                local.uidk = 'slick-uniqueid';
                local.getUIDXML = function(node){
                    var uid = node.getAttribute(this.uidk);
                    if (!uid){
                        uid = this.uidx++;
                        node.setAttribute(this.uidk, uid);
                    }
                    return uid;
                };
                local.getUIDHTML = function(node){
                    return node.uniqueNumber || (node.uniqueNumber = this.uidx++);
                };
                return function(node){
                    return local.getUIDHTML(node);
                };
            })(),
            id: (function(){
                var types = {
                    string: function(id, doc){
                        id = Sizzle('#' + id.replace(/(\W)/g, '\\$1'), doc);
                        return (id) ? types.element(id) : null;
                    },
                    element: function(el){
                        document.uidOf(el);
                        if (!(/^(?:object|embed)$/i).test(el.tagName)){
                            var fireEvent = el.fireEvent;
                            // wrapping needed in IE7, or else crash
                            el._fireEvent = function(type, event){
                                return fireEvent(type, event);
                            };
                            Object.append(el, Element.Prototype);
                        }
                        return el;
                    },
                    object: function(obj, doc){
                        if (obj.toElement) return types.element(obj.toElement(doc));
                        return null;
                    }
                };
                types.textnode = types.whitespace = types.window = types.document = function(zero){
                    return zero;
                };
                return function(el, doc){
                    if (el && el.uniqueNumber) return el;
                    var type = typeOf(el);
                    return (types[type]) ? types[type](el, doc || document) : null;
                };
            })(),
            newElement: function(tag, props) {
                if (!tag) throw new SyntaxError("'tag' not defined"); // In case you forget
                var el = document.createElement(tag);
                /*</ltIE9>*/
                if (props) {
                    // Detection for workarounds, courtesy of MooTools
                    /*<ltIE8>*/
                    var createElementAcceptsHTML;
                    try {
                        createElementAcceptsHTML = (document.createElement('<input name=x>').name == 'x');
                    } catch (e){}
                    var escapeQuotes = function(html){
                        return ('' + html).replace(/&/g, '&amp;').replace(/"/g, '&quot;');
                    };
                    /*</ltIE8>*/
                    /*<ltIE9>*/
                    var canChangeStyleHTML = (function(){
                        var div = document.createElement(__stl),
                            flag = false;
                        try {
                            div.innerHTML = '#justTesing{margin: 0px;}';
                            flag = !!div.innerHTML;
                        } catch (e){}
                        return flag;
                    })();
                    if (props.checked !== null) props.defaultChecked = props.checked;
                    if ((props.type === 'checkbox' || props.type === 'radio') && props.value === null) props.value = 'on';
                    /*<ltIE9>*/ // IE needs the type to be set before changing content of style element
                    if (!canChangeStyleHTML && tag == __stl) {
                        if (!props.media) props.media = 'all';
                        var styleEl = document.createElement(__stl);
                        styleEl.setAttribute('type', 'text/css');
                        if (props.type) delete props.type;
                        if (props.text) styleEl.appendChild(document.createTextNode(props.text));
                        return document.id(styleEl);
                    }
                    /*</ltIE9>*/
                    /*<ltIE8>*/// Fix for readonly name and type properties in IE < 8
                    if (createElementAcceptsHTML){
                        tag = '<' + tag;
                        if (props.name) tag += ' name="' + escapeQuotes(props.name) + '"';
                        if (props.type) tag += ' type="' + escapeQuotes(props.type) + '"';
                        tag += '>';
                        delete props.name;
                        delete props.type;
                    }
                    /*</ltIE8>*/
                    Object.each(props, function(value, prop) {
                        switch(prop) {
                            case __stl:
                                Object.each(value, function(stlValue, stlName) {
                                    el.style[stlName] = stlValue;
                                });
                                break;
                            case 'events':
                                Object.each(value, function(evtHandler, evtType) {
                                    el.addEventListener(evtType, evtHandler);
                                });
                                break;
                            case 'class':
                                el.className = value;
                                break;
                            default:
                                el[prop] = value;
                        }
                    });
                }
                return document.id(el);
            }
        });
        var Elements = this.Elements = function(nodes){
            var that = [];
            if (nodes && nodes.length) {
                var uniques = {}, node;
                for (var i = 0; !!(node = nodes[i++]); ) {
                    var uid = document.uidOf(node);
                    if (!uniques[uid]){
                        uniques[uid] = true;
                        that.push(Object.append(node, Element.Prototype));
                    }
                }
            }
            return that;
        };

        // let's make this script compatible with both Greasemonkey & Chrome API
        if (typeof window.GM_getValue === __und) {
            window.GM_getValue = function(name, defaultValue) {
                var value = localStorage.getItem(name);
                if (!value)
                    return defaultValue;
                var type = value[0];
                value = value.substring(1);
                switch (type) {
                    case 'b':
                        return value == 'true';
                    case 'n':
                        return Number(value);
                    default:
                        return value;
                }
            };
            window.GM_setValue = function(name, value) {
                value = (typeof value)[0] + value;
                localStorage.setItem(name, value);
            };
            window.GM_deleteValue = function(name) {
                localStorage.removeItem(name);
            };
        }
    }; // function extendJS()

    // payload to be executed once MooTools and the document are available
    var payload = function() {
        // localized strings
        var docLangs = [];
        var l10n = {
            '_default_': 'en',
            'en': {
                '$1': 'Show navigation pane',
                '$2': 'Hide navigation pane'
            },
            'fr': {
                '$1': 'Restaurer le panneau de navigation',
                '$2': 'Cacher le panneau de navigation'
            },
            'getString': function(strId /*, langId */){
                // build array of possible languages in order of priority
                var langs = Array.clone(docLangs).include(arguments[1] || this._default_);
                // try for each language
                for (var i=0; i < langs.length; i++) {
                    var langId = langs[i];
                    if (this[langId] && this[langId][strId]) return this[langId][strId];
                }
            }
        };

        // get locale(s) of Google Calendar
        document.body.className.split(' ').forEach(function(item){
            if (parts = item.split('-'), parts[0] == 'loc') docLangs.push(parts[1]);
        });
        if (docLangs.length === 0) docLangs.push('en');

        // elements variables
        var elCalContent = null,
            elRestoreHandleContainer = null,
            elCollapseHandleContainer = null,
            elMainLogo = null,
            elMainBody = null,
            elNav = null,
            elRestoreHandle = null,
            elCollapseHandle = null,
            navCollapsed = false;

        // step 1: retrieve calendar elements
        if (!(elCalContent = $$('#calcontent')[0])) { console.warn('[' + USERSCRIPT_NAME + ']: Element "#calcontent" not found'); return; }
    if (BUILD_RESTORE_HANDLE_LEFT_OF_LOGO) {
        if (!(elRestoreHandleContainer = $$('#vr-nav div.applogo')[0])) { console.warn('[' + USERSCRIPT_NAME + ']: Element "#vr-nav div.applogo" not found'); return; }
    } else { // (!BUILD_RESTORE_HANDLE_LEFT_OF_LOGO)
        if (!(elRestoreHandleContainer = $$('#mothertable #gridcontainer')[0])) { console.warn('[' + USERSCRIPT_NAME + ']: Element "#mothertable #gridcontainer" not found'); return; }
    } // if (BUILD_RESTORE_HANDLE_LEFT_OF_LOGO)
        if (!(elMainLogo = $$('#mainlogo')[0])) { console.warn('[' + USERSCRIPT_NAME + ']: Element "#mainlogo" not found'); return; }
        if (!(elMainBody = $$('#mainbody')[0])) { console.warn('[' + USERSCRIPT_NAME + ']: Element "#mainbody" not found'); return; }
        if (!(elNav = $$('#nav')[0])) { console.warn('[' + USERSCRIPT_NAME + ']: Element "#nav" not found'); return; }
        if (!(elCollapseHandleContainer = $$('div.qnb-container', elNav)[0])) { console.warn('[' + USERSCRIPT_NAME + ']: Element "div.qnb-container" not found'); return; }

        // step 2: destruct custom elements, if present
        if (!!(elRestoreHandle = $(ELEM_ID_RESTORE_HANDLE))) elRestoreHandle.remove();
        if (!!(elCollapseHandle = $(ELEM_ID_RESTORE_HANDLE))) elCollapseHandle.remove();
        // re-enable previous nav pane state
        navCollapsed = GM_getValue(STATE_KEY_COLLAPSED, false);
        if (navCollapsed) {
            elNav.addClass(CLASS_NAME_COLLAPSED);
            elMainBody.addClass('full-left');
        }

        // step 3: build CSS stylesheet to apply
        var css = Function.heredoc(function(){/*
@namespace url(http://www.w3.org/1999/xhtml);
#{{{ELEM_ID_COLLAPSE_HANDLE}}}, #{{{ELEM_ID_RESTORE_HANDLE}}} {
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAzBAMAAAB7xwUDAAAAA3NCSVQICAjb4U/gAAAAG1BMVEX////bSjjbSjjbSjjbSjjbSjjbSjjbSjjbSjjK9HheAAAACXRSTlMAZneImaq7zP/DSpCzAAAACXBIWXMAAAsSAAALEgHS3X78AAAAHHRFWHRTb2Z0d2FyZQBBZG9iZSBGaXJld29ya3MgQ1M26LyyjAAAAIJJREFUKJFjYGBgdoBgCLBogWAI8OhwAGMIYOloAWNKJVk6msAYprIAjLEoRDEEjxSaq1F9RBvQwMCBxOtg4GhA8IDsDiIlUeTwSKHZRzZgVgAGpACMZwGMA49GmFRHK1L4WnQEIMKXPCkGDSBPA85jA6pkRyQQVKWoxhCQRHY13EcAHmhDI6OsOQoAAAAASUVORK5CYII=);
    display: inline-block;
    font-weight: bold;
    height: 17px;
    opacity: 0.45;
    width: 26px;
{{{mainlogoCss}}}
}
#{{{ELEM_ID_COLLAPSE_HANDLE}}} {
    background-position: 0px -34px;
    margin-left: 24px;
    position: relative;
}
#{{{ELEM_ID_RESTORE_HANDLE}}}:RHLoL_BUILD {
    background-position: 0px 0px;
    margin-left: 16px;
    position: relative;
}
#{{{ELEM_ID_RESTORE_HANDLE}}}:not_RHLoL_BUILD {
    background-position: 0px 0px;
    position: absolute;
    left: 4px;
    top: 0px;
}
#{{{ELEM_ID_COLLAPSE_HANDLE}}}:hover, #{{{ELEM_ID_RESTORE_HANDLE}}}:hover {
    opacity: 1;
}
#{{{ELEM_ID_COLLAPSE_HANDLE}}}.hidden, #{{{ELEM_ID_RESTORE_HANDLE}}}.hidden {
    display: none;
}
#calcontent.eui-t #{{{ELEM_ID_RESTORE_HANDLE}}} {
    background-position: 0px -17px;
    font-weight: normal;
    margin-left: 10px;
}
#nav.collapsed {
    display: none !important;
}
#calcontent #mainbody.full-left {
    margin-left: 44px !important;
}
#calcontent.eui-s #mainbody.full-left {
    margin-left: 28px !important;
}
#calcontent.eui-t #mainbody.full-left {
    margin-left: 16px !important;
}
    */},
        {
            'ELEM_ID_COLLAPSE_HANDLE': ELEM_ID_COLLAPSE_HANDLE,
            'ELEM_ID_RESTORE_HANDLE': ELEM_ID_RESTORE_HANDLE,
            'mainlogoCss': (function(){
                // dump css of #mainlogo
                var _return = '';
                Object.each(
                    elMainLogo.getStyles('color', 'cursor', 'font-size', 'vertical-align'),
                    function (item, key, object) {
                        _return += '    ' + key + ': ' + item + ';\n';
                    }
                );
                return _return;
            })()
        });
if (BUILD_RESTORE_HANDLE_LEFT_OF_LOGO) {
        css = css.replace(/#[^:]+:not_RHLoL_BUILD \{([\r\n]|[^\}]+)*\}/, '').replace(/:RHLoL_BUILD/, '');
} else { // (!BUILD_RESTORE_HANDLE_LEFT_OF_LOGO)
        css = css.replace(/#[^:]+:RHLoL_BUILD \{([\r\n]|[^\}]+)*\}/, '').replace(/:not_RHLoL_BUILD/, '');
} // if (BUILD_RESTORE_HANDLE_LEFT_OF_LOGO)

        // step 4: inject CSS
        document.addStyle(css);

        // step 5: create UI elements to hide and restore nav pane
        elCollapseHandle = document.newElement('span', {
            'id': ELEM_ID_COLLAPSE_HANDLE,
            'title': l10n.getString('$2'),
            'events': {
                'click': function() {
                    if (!elNav.hasClass(CLASS_NAME_COLLAPSED)) {
                        GM_setValue(STATE_KEY_COLLAPSED, true);
                        elMainBody.addClass('full-left');
                        (function(){
                            elNav.addClass(CLASS_NAME_COLLAPSED);
                            elRestoreHandle.removeClass('hidden');
                        }).delay(250); // just a bit more than the #nav[transition] and #elMainBody[transition]
                    }
                }
            }
        }).inject(elCollapseHandleContainer);
        elRestoreHandle = document.newElement('span', {
            'id': ELEM_ID_RESTORE_HANDLE,
            'title': l10n.getString('$1'),
            'class': (navCollapsed ? '' : 'hidden'),
            'events': {
                'click': function() {
                    if (elNav.hasClass(CLASS_NAME_COLLAPSED)) {
                        GM_setValue(STATE_KEY_COLLAPSED, false);
                        elNav.removeClass(CLASS_NAME_COLLAPSED);
                        elMainBody.removeClass('full-left');
                        this.addClass('hidden');
                    }
                }
            }
        }).inject(elRestoreHandleContainer);

        // TODO: add possibility to add ourselves to the Google Calendar menu
        /*
            console.log($$('div.goog-menu-vertical:first-child[class~="goog-menuheader"]'));
        */

        console.log('[' + USERSCRIPT_NAME + ']: Extension/userscript loaded.');
    }; // function payload()

    // *** execution starts here ***

    // reference some outside objects
    window.console = window.console || (function(){
        if (typeof(unsafeWindow) == __und) return { 'log': function() {} };
        return unsafeWindow.console;
    })();

    // make sure Sizzle was loaded and is available
    if (typeof Sizzle === 'undefined') { console.warn('[' + USERSCRIPT_NAME + ']: Sizzle selector engine not available!'); return; }
    var $ = function(id, context) {
        return document.id(Sizzle('#'+id, context || this.document)[0]);
    },  $$ = function(selectors, context, results) {
        return new Elements(Sizzle(selectors, context || this.document, results || []));
    };

    // apply our JS extensions
    extendJS();

    // execute payload once Google Calendar has finished loading delayed content
    var tryPayload = function() {
        var nav = null, ctn = null;
        // check if element #sidebar > div.qnb-container is available
        nav = $('nav');
        if (nav) {
            ctn = $$('div.qnb-container', nav)[0];
        }
        if (ctn) {
            // execute payload
            payload();
        } else {
            // try again later
            tryPayload.delay(50);
        }
    };
    tryPayload.delay(10);
})();