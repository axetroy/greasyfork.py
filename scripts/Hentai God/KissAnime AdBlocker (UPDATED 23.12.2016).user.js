// ==UserScript==
// @name         KissAnime AdBlocker (UPDATED 23.12.2016)
// @namespace    http://cl.1ck.me
// @version      1.6
// @description  Blocks ALL ads on KissAnime.to!
// @author       TheTh0rus
// @match        *://kissanime.ru/*
// @grant        none
// ==/UserScript==

if (!String.prototype.startsWith) {
  String.prototype.startsWith = function(searchString, position) {
    position = position || 0;
    return this.indexOf(searchString, position) === position;
  };
}

var frames = document.getElementsByTagName("IFRAME");
for(var f = 0; f < frames.length; f++) {
    if(frames[f].getAttribute("allowfullscreen") !== "true") {
    frames[f].setAttribute("style", "visibility: hidden;");
    frames[f].setAttribute("src", "");
    frames[f].setAttribute("height", "1px");
    frames[f].setAttribute("width", "1px");
    }
} 

var ads = document.getElementsByTagName("A"); 
for(var i = 0; i < ads.length; i++) {
    if(ads[i].innerHTML == "Hide") {
        ads[i].setAttribute("style", "visibility: hidden;");
    } 
}

var count = 0;
var inter = setInterval(function() {
var divs = document.getElementsByTagName("A");

for(var i = 0; i < divs.length; i++) {
    if(divs[i].href.startsWith("http://redir.") || divs[i].href.startsWith("http://server.cpmstar")) {
      divs[i].setAttribute("style", "visibility:hidden;");  
      divs[i].setAttribute("href", "");
    }
}
if(count > 20) {
    clearInterval(inter);
    }
    count++;
}, 200);

var sc = document.getElementsByTagName("SCRIPT");

for(var i = 0; i < sc.length; i++) {
    if(sc[i].innerHTML.indexOf("BB_ind++;") > 0) {
      sc[i].innerHTML = ""; 
    }
}

var popupBlockerConfigs = {
    sites: 'google.com|google.com.vn|facebook.com|twitter.com|github.com|youtube.com|imgur.com|messenger.com|openuserjs.org|greasyfork.org|worldcosplay.net', // Domain
    mode: 'allow', // allow|block
    popup: false, // true|false
    link: false // true|false
};

(function (global) {
    'use strict';

    global.Element.prototype._addEventListener = global.Element.prototype.addEventListener;
    global.Element.prototype.addEventListener = function (a, b, c) {
        this._addEventListener(a, b, c);
        if (!this.eventListenerList) this.eventListenerList = {};
        if (!this.eventListenerList[a]) this.eventListenerList[a] = [];
        this.eventListenerList[a].push(b);
    };

    var popupBlocker = {};
    popupBlocker.userscript = {
        sites: popupBlockerConfigs.sites.split('|'),
        host: global.self.location.host,
        testHost: function (hostMatch, hostTest) {
            var matchHost = new RegExp('^([\\w\\.\\-]+\\.)?' + hostMatch.replace(/\./g, '\\.') + '$');
            return matchHost.test(hostTest);
        },
        checkSite: function () {
            var list = this.sites,
                listSize = list.length,
                siteInList = false,
                blocking = false;

            if (!listSize) {
                if (popupBlockerConfigs.mode === 'allow') {
                    return true;
                } else {
                    return false;
                }
            }

            for (var i = 0; i < listSize; i++) {
                if (this.testHost(list[i], this.host)) {
                    siteInList = true;
                    break;
                }
            }

            if (siteInList) {
                if (popupBlockerConfigs.mode === 'allow') {
                    blocking = false;
                } else {
                    blocking = true;
                }
            } else {
                if (popupBlockerConfigs.mode === 'allow') {
                    blocking = true;
                } else {
                    blocking = false;
                }
            }

            return blocking;
        },
        logs: function (str) {
            if (global.console) global.console.log(str, this.host);
        },
        counter: 0,
        warns: function (str) {
            if (global.console) global.console.warn(this.counter, 'popups blocked\n' + str);
        },
        init: function () {
            var blocker = this,
                allLinks = document.getElementsByTagName('a'),
                allLinksSize = allLinks.length,
                hanler = function (event) {
                    event.preventDefault();
                    var _this = (this === document) ? event.target : this;

                    blocker.counter++;
                    blocker.warns(_this.href + '\n' + _this.target + '\nClick');
                },
                dbhanler = function (event) {
                    event.preventDefault();
                    var _this = (this === document) ? event.target : this;

                    global._open(_this.href, '_blank');
                };

            if (!allLinksSize) return;

            if (typeof global.jQuery !== 'undefined') {
                $(function () {
                    var $ = global.jQuery,
                        $doc = $(document),
                        $event = $doc.data('events') || $._data(document, 'events');

                    if (!$doc.data('popupblocker') && $event && $event.click) $.each($event.click, function () {
                        var _this = this.selector;

                        if (_this) $(_this).each(function (i, ele) {
                            var $this = $(ele),
                                dataSelector;
                            if ($this[0].tagName !== 'A') return;
                            if (blocker.testHost(blocker.host, ele.host)) return;

                            $this.attr('data-selector', 'popupblocker' + i);
                            dataSelector = 'a[data-selector="popupblocker' + i + '"]';
                            if ($.fn.on) {
                                $doc.on('click', dataSelector, hanler).on('dblclick', dataSelector, dbhanler).data('popupblocker', true);
                            } else {
                                $(dataSelector).live('click', hanler).live('dblclick', dbhanler).attr('data-popupblocker', true);
                            }
                        });
                    });
                });
            }

            for (var i = 0; i < allLinksSize; i++) {
                var link = allLinks[i];
                /*jshint scripturl:true*/
                if (!link.dataset.popupblocker && (link.protocol === 'javascript:' || !this.testHost(this.host, link.host) && (link.onclick || (link.eventListenerList && link.eventListenerList.click)))) {
                    link.addEventListener('click', hanler, false);
                    link.addEventListener('dblclick', dbhanler, false);
                }

                link.dataset.popupblocker = true;
            }
        }
    };

    if (popupBlocker.userscript.checkSite()) {
        popupBlocker.userscript.logs('Popup blocker is running.');
    } else {
        popupBlocker.userscript.logs('Popup blocker is disabled.');
        return;
    }

    document.addEventListener('DOMContentLoaded', function () {
        if (('Discourse' in global)) {
            popupBlocker.userscript.logs('Popup blocker is disabled on Discourse.');
            return;
        }

        global._open = global.open;

        if (!popupBlockerConfigs.popup) global.open = function (url, target, params) {
            popupBlocker.userscript.counter++;
            popupBlocker.userscript.warns(url + '\n' + target + '\n' + params);
            return false;
        };

        if (popupBlockerConfigs.link) return;
        var oldXHR = global.XMLHttpRequest;

        function newXHR() {
            var realXHR = new oldXHR();
            realXHR.addEventListener('readystatechange', function () {
                popupBlocker.userscript.init();
            }, false);
            return realXHR;
        }
        global.XMLHttpRequest = newXHR;

        popupBlocker.userscript.init();

    });

})(window);
