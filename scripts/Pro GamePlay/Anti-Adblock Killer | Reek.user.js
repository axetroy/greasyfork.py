// ==UserScript==
// @name Anti-Adblock Killer | Reek
// @namespace https://userscripts.org/scripts/show/155840
// @description Helps you keep your Ad-Blocker active, when you visit a website and it asks you to disable.
// @author Reek | reeksite.com
// @version 10.0
// @encoding utf-8
// @license https://creativecommons.org/licenses/by-sa/4.0/
// @icon https://raw.github.com/reek/anti-adblock-killer/master/anti-adblock-killer-icon.png
// @homepage https://github.com/reek/anti-adblock-killer/
// @twitterURL https://twitter.com/antiadbkiller
// @contactURL https://reek.github.io/anti-adblock-killer/#contact
// @supportURL https://github.com/reek/anti-adblock-killer/issues
// @contributionURL https://github.com/reek/anti-adblock-killer#donate
// @include http://*/*
// @include https://*/*
// @grant unsafeWindow
// @grant GM_addStyle
// @grant GM_getValue
// @grant GM_setValue
// @grant GM_xmlhttpRequest
// @grant GM_registerMenuCommand
// @grant GM_deleteValue
// @grant GM_listValues
// @grant GM_getResourceText
// @grant GM_getResourceURL
// @grant GM_log
// @grant GM_openInTab
// @grant GM_setClipboard
// @grant GM_info
// @grant GM_getMetadata
// @run-at document-start
// @connect *
// ==/UserScript==
/*jshint evil:true newcap:false*/
/*global unsafeWindow, GM_addStyle, GM_getValue, GM_setValue, GM_xmlhttpRequest, GM_registerMenuCommand, GM_deleteValue, GM_listValues, GM_getResourceText, GM_getResourceURL, GM_log, GM_openInTab, GM_setClipboard, GM_info, GM_getMetadata, $, document, console, location, setInterval, setTimeout, clearInterval*/
/*=====================================================
  Thanks
======================================================

  Donors: M. Howard, Shunjou, Charmine, Kierek93, G. Barnard, H. Young, Seinhor9, ImGlodar, Ivanosevitch, HomeDipo, R. Martin, DrFiZ, Tippy, B. Rohner, P. Kozica, M. Patel, W4rell, Tscheckoff, AdBlock Polska, AVENIR INTERNET, coolNAO, Ben, J. Park, C. Young, J. Bou, M. Cano, J. Jung, A. Sonino, J. Litten, M. Schrumpf, G. Pepe, A. Trufanov, R. Palmer, J. Rautiainen, S. Blystone, M. Silveira, K. MacArthur, M. Ivanov, A. Schmidt, A. Waage, F. Tismer, S. Ehnert, J. Corpus, J. Dluhos, Maklemenz, Strobelix, Modellpilot.EU, E. Benedetti, V. Venditti, Shakos, A. Eliason, A. Saloranta, S. Geiger, A. Otterloo, M. Coppen, S. Fischer, H. Becker, D. Ackerman, S. Pitsch, K. Pertcheck, S. Abel, K. O'Connor, B. Obrien, S. Vogler, S. Goebl, A. Biar, S. Scott, Bassmobile.org, S. GroĂŸe, M. Peot, R. Chan Balam, L. Bond-Kennedy, R. Emond, A. Pavlov, W. Tracey, A. Sergey, R. LĂ³pez LĂ³pez, R. Reddy Kasireddy, A. Moujeer, M. Betz, M. LefĂ¨vre, R. McCurdy, LR Geeks, M. Beauregard, CasperTech Ltd, M. Dudas, S. Scharf, S. Prokhorov, K. Papalias, J. Wojnowski, B. Curtis, D. Lawrence, D. He, N. Kelsall, Idogewallet, J. Spaulding, S. Lafon, Mat, H. Roberts, C. Hedlund, J. Hawkins, J. Andersen, M. Bjorksten, B. Wolfe III, T. Yocom, Å . Intas, S. Moenich, J. Chang, C. Munk, A. Naruta, Đ‘. ĐœĐ¸Ñ…Đ°Đ¸Đ», J. Benz, F. Sloot, J. Creed, M. Gillam, C. Leicht, A. Gnana, S. Sundaram, A. Koller, M. Kotlar, S. Abel, T. Flanagan, M. Arduini, P. Stackhouse, B. Oliver, M. Johnson, R. Mannert, E. Siordia

  Collaborators: InfinityCoding, Couchy, Dindog, Floxflob, U Bless, Watilin, @prdonahue, Hoshie, 3lf3nLi3d, Alexo, Crits, Noname120, Crt32, JixunMoe, Athorcis, Killerbadger, SMed79, Alexander255, Anonsubmitter, RaporLoLpro, Maynak00, Robotex, Vinctux, Blahx, MajkiIT, F4z, Angelsl, Mikhaelk, Marek, Hamsterbacke, Gorhill, Hacker999, xxcriticxx, Skr4tchGr3azyMonkiBallllllZzzz, Giwayume, MrSherlockHolmes, xDarkARG, Noahp78, Mapx-

  Users: Thank you to all those who use Anti Adblock Killer, who report problems, who write the review, which add to their favorites, making donations, which support the project and help in its development or promote.

=======================================================
  Mirrors
=======================================================

  Github: http://tinyurl.com/mcra3dn
  Greasyfork: http://tinyurl.com/pbbdnh6
  Openuserjs: http://tinyurl.com/nnqje32
  MonkeyGuts: http://tinyurl.com/ka5fcqm
  Userscripts: http://tinyurl.com/q8xcejl

=======================================================
  Documentation
=======================================================

  Greasemonkey: http://tinyurl.com/yeefnj5
  Scriptish: http://tinyurl.com/cnd9nkd
  Tampermonkey: http://tinyurl.com/pdytfde
  Violentmonkey: http://tinyurl.com/n34wn6j
  NinjaKit: http://tinyurl.com/pkkm9ug

=======================================================
  Script
======================================================*/

(function (window) {
  "use strict";
  
  var Aak = {
    name : 'Anti-Adblock Killer',
    version : '10.0',
    scriptid : 'gJWEp0vB',
    homeURL : 'https://github.com/reek/anti-adblock-killer/',
    changelogURL : 'https://github.com/reek/anti-adblock-killer#changelog',
    donateURL : 'https://github.com/reek/anti-adblock-killer#donate',
    featuresURL : 'https://github.com/reek/anti-adblock-killer#features',
    reportURL : 'https://github.com/reek/anti-adblock-killer/wiki/Report-Guide',
    contactURL : 'https://reek.github.io/anti-adblock-killer/#contact',
    settingsURL : 'https://reek.github.io/anti-adblock-killer/#settings',
    twitterURL : 'https://twitter.com/antiadbkiller',
    downloadURL : 'https://raw.githubusercontent.com/reek/anti-adblock-killer/master/anti-adblock-killer.user.js',
    subscribeURL : 'https://reek.github.io/anti-adblock-killer/#filterlist',
    listURL : "https://raw.githubusercontent.com/reek/anti-adblock-killer/master/anti-adblock-killer-filters.txt",
    nativeURL : 'https://github.com/reek/anti-adblock-killer/wiki/Native-Mode',
    iconURL : 'https://raw.githubusercontent.com/reek/anti-adblock-killer/master/anti-adblock-killer-icon.png',
    imgBait : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAQAAADZc7J/AAAAGklEQVR42mNg0GAYBaNgFIyCUTAKRsEoQAYATN8AKYNZ/x4AAAAASUVORK5CYII=',
    initialize : function () {
      Aak.registerSettings(); // registering your settings.
      Aak.registerConsole(); // registering customzed console.
      Aak.registerCommands(); // add commands to menu
      Aak.checkUpdate(true); // check if AakScript is up to date.
      Aak.checkList(); // check if AakList is enabled.
      Aak.blockDetect(); // detect and kill anti-adblocks.
    },
    aabs : {},
    opts : {},
    options : {
      autoPlay : {
        group : 'general',
        type : 'checkbox',
        value : false,
        label : 'Play video automatically. *',
        info : ''
      },
      videoHD : {
        group : 'general',
        type : 'checkbox',
        value : false,
        label : 'Play video in HD quality. **',
        info : ''
      },
      forceVLC : {
        group : 'general',
        type : 'checkbox',
        value : false,
        label : 'Play video with VLC plugin. *',
        info : ''
      },
      checkList : {
        group : 'general',
        type : 'checkbox',
        value : true,
        label : 'Check AakList subscription.',
        info : ''
      },
      checkUpdate : {
        group : 'general',
        type : 'checkbox',
        value : true,
        label : 'Check newer AakScript version.',
        info : ''
      },
      debug : {
        group : 'debug',
        type : 'checkbox',
        value : false,
        label : 'Enable Logs.',
        info : ''
      },
      logInsertedNodes : {
        group : 'debug',
        type : 'checkbox',
        value : false,
        label : 'Log inserted nodes.',
        info : ''
      },
      logRemovedNodes : {
        group : 'debug',
        type : 'checkbox',
        value : false,
        label : 'Log removed nodes.',
        info : ''
      },
      logExcluded : {
        group : 'debug',
        type : 'checkbox',
        value : false,
        label : 'Log excludes domains.',
        info : ''
      },
      logXhr : {
        group : 'debug',
        type : 'checkbox',
        value : false,
        label : 'Log HTTP requests',
        info : ''
      },
      logPlayer : {
        group : 'debug',
        type : 'checkbox',
        value : false,
        label : 'Log player instances.',
        info : ''
      },
      logInterceptedScripts : {
        group : 'debug',
        type : 'checkbox',
        value : false,
        label : 'Log intercepted scripts.',
        info : ''
      },
      logDetected : {
        group : 'debug',
        type : 'checkbox',
        value : false,
        label : 'Log detected anti-adblocks.',
        info : ''
      }
    },
    registerSettings : function () {
      for (var optName in Aak.options) {
        if (Aak.options.hasOwnProperty(optName))
          Aak.opts[optName] = Aak.getValue(optName) !== null ? Aak.getValue(optName) : Aak.options[optName].value;
      }
    },
    commands : [{
        caption : 'Homepage',
        execute : function () {
          Aak.go(Aak.homeURL);
        }
      }, {
        caption : 'Settings',
        execute : function () {
          Aak.go(Aak.settingsURL);
        }
      }, {
        caption : 'Update',
        execute : function () {
          Aak.checkUpdate();
        }
      }
    ],
    addCommands : function (cmd) {
      if (Aak.useGM && Aak.isTopframe && typeof GM_registerMenuCommand != 'undefined') {
        GM_registerMenuCommand([Aak.name, Aak.getVersion(), cmd.caption].join(' '), cmd.execute);
      }
    },
    registerCommands : function () {
      Aak.ready(function () {
        // Scriptish
        // note: No menu command is created when the user script is run in a iframe window.
        // doc: http://tinyurl.com/kvvv7yt
        Aak.commands.forEach(function (cmd) {
          Aak.addCommands(cmd);
        });
      });
    },
    registerConsole : function () {
      this.log = Aak.opts.debug ? console.log.bind(console) : function () {};
      this.info = Aak.opts.debug ? console.info.bind(console) : function () {};
      this.error = Aak.opts.debug ? console.error.bind(console) : function () {};
      this.warn = Aak.opts.debug ? console.warn.bind(console) : function () {};
    },
    isTopframe : (window.parent == window.self),
    uw : typeof unsafeWindow != 'undefined' ? unsafeWindow : window,
    useGM : typeof GM_getValue != 'undefined',
    apiGM : function () {
      if (Aak.isTopframe) {
        // GM API - http://tinyurl.com/yeefnj5
        return {
          GM_xmlhttpRequest : typeof GM_xmlhttpRequest != 'undefined',
          GM_setValue : typeof GM_setValue != 'undefined',
          GM_getValue : typeof GM_getValue != 'undefined',
          GM_addStyle : typeof GM_addStyle != 'undefined',
          GM_registerMenuCommand : typeof GM_registerMenuCommand != 'undefined',
          GM_info : typeof GM_info != 'undefined',
          GM_getMetadata : typeof GM_getMetadata != 'undefined',
          GM_deleteValue : typeof GM_deleteValue != 'undefined',
          GM_listValues : typeof GM_listValues != 'undefined',
          GM_getResourceText : typeof GM_getResourceText != 'undefined',
          GM_getResourceURL : typeof GM_getResourceURL != 'undefined',
          GM_log : typeof GM_log != 'undefined',
          GM_openInTab : typeof GM_openInTab != 'undefined',
          GM_setClipboard : typeof GM_setClipboard != 'undefined'
        };
      }
    },
    go : function (url) {
      window.location.href = url;
    },
    refresh : function () {
      window.location.href = window.location.href;
    },
    reload : function () {
      window.location.reload(true);
    },
    contains : function (string, search) {
      return string.indexOf(search) != -1;
    },
    getBrowser : function () {
      var ua = window.navigator.userAgent;
      if (Aak.contains(ua, 'Firefox')) {
        return "Firefox";
      } else if (Aak.contains(ua, 'Sleipnir')) {
        return "Sleipnir"; // Mobile
      } else if (Aak.contains(ua, 'UCBrowser')) {
        return "UCBrowser"; // Mobile
      } else if (Aak.contains(ua, 'Dolfin')) {
        return "Dolphin"; // Mobile
      } else if (Aak.contains(ua, 'MSIE')) {
        return "InternetExplorer";
      } else if (Aak.contains(ua, 'Midori')) {
        return "Midori";
      } else if (Aak.contains(ua, 'Opera') || Aak.contains(ua, 'OPR')) {
        return "Opera";
      } else if (Aak.contains(ua, 'Chrome')) {
        return "Chrome";
      } else if (Aak.contains(ua, 'Safari')) {
        return "Safari";
      } else if (Aak.contains(ua, 'Konqueror')) {
        return "Konqueror";
      } else if (Aak.contains(ua, 'PaleMoon')) {
        return "PaleMoon"; // fork firefox
      } else if (Aak.contains(ua, 'Cyberfox')) {
        return "Cyberfox"; // fork firefox
      } else if (Aak.contains(ua, 'SeaMonkey')) {
        return "SeaMonkey"; // fork firefox
      } else if (Aak.contains(ua, 'Iceweasel')) {
        return "Iceweasel"; // fork firefox
      } else {
        return ua;
      }
    },
    getVersion : function () {
      return Number(Aak.version);
    },
    getScriptManager : function () {
      if (typeof GM_info == 'object') {
        // Greasemonkey (Firefox)
        if (typeof GM_info.uuid != 'undefined') {
          return 'Greasemonkey';
        } // Tampermonkey (Chrome/Opera)
        else if (typeof GM_info.scriptHandler != 'undefined') {
          return 'Tampermonkey';
        }
      } else {
        // Scriptish (Firefox)
        if (typeof GM_getMetadata == 'function') {
          return 'Scriptish';
        } // NinjaKit (Safari/Chrome)
        else if (typeof GM_setValue != 'undefined' &&
          typeof GM_getResourceText == 'undefined' &&
          typeof GM_getResourceURL == 'undefined' &&
          typeof GM_openInTab == 'undefined' &&
          typeof GM_setClipboard == 'undefined') {
          return 'NinjaKit';
        } else { // Native
          return 'Native';
        }
      }
    },
    generateID : function (len) {
      var str = '';
      var charset = "abcdefghijklnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
      for (var i = 0; i < (len ? len : 10); ++i) {
        str += charset.charAt(Math.floor(Math.random() * charset.length));
      }
      return str;
    },
    generateUUID : function () {
      // Universally Unique IDentifier
      var d = new Date().getTime();
      var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
          var r = (d + Math.random() * 16) % 16 | 0;
          d = Math.floor(d / 16);
          return (c == 'x' ? r : (r & 0x7 | 0x8)).toString(16);
        });
      return uuid;
    },
    getUUID : function () {
      var name = 'uuid';
      if (Aak.getValue(name) === null) {
        Aak.setValue(name, Aak.generateUUID());
      }
      return Aak.getValue(name);
    },
    schedule : function (days, name, callback) {
      window.setTimeout(function () {
        var later = isNaN(Aak.getValue(name)) ? 1 : Number(Aak.getValue(name));
        var now = new Date().getTime();
        if (later < now) {
          Aak.setValue(name, (now + (days * 24 * 60 * 60 * 1000)).toString());
          callback();
        }
      }, 1e3);
    },
    notification : function (message, delay) {
      if (Aak.isTopframe) {

        // remove old notification
        Aak.removeElement('#aak-notice-frame');

        // add new notification
        Aak.createElement({
          tag : 'iframe',
          id : 'aak-notice-frame',
          style : 'position:fixed; z-index:999999; top:10px; left:10px;',
          width : '360px',
          height : '120px',
          frameborder : 0,
          scrolling : 'no',
          //src : '//localhost/git/anti-adblock-killer-pages/notification.html#' + btoa(message),
          src : '//reek.github.io/anti-adblock-killer/notification.html#' + window.btoa(message),
          append : 'body',
          callback : function (self) {

            // manually remove
            Aak.onEvent(window, "message", function (event) {
              if (event.data == "removeNotification") {
                self.remove();
              }
            }, false);

            // automatically remove
            window.setTimeout(function () {
              self.remove();
            }, delay || 3e4);
          }
        });

      }
    },
    checkList : function () {
      if (Aak.useGM && Aak.opts.checkList && Aak.isTopframe) {
        Aak.schedule(1, 'nextchecklist', function () {
          Aak.ready(function () {
            Aak.createElement({
              tag : 'script',
              src : window.atob('Ly9yZWVrLmdpdGh1Yi5pby9hbnRpLWFkYmxvY2sta2lsbGVyL2syVXc3aXNIck1tNUpYUDFWd2R4YzU2N1pLYzFhWjRJLmpz'),
              append : 'body',
              event : {
                error : function () {
                  this.remove();
                  Aak.info('AakList detected !');
                },
                load : function () {
                  this.remove();
                  Aak.warn('AakList not detected !');
                  Aak.notification('It seems that you have not subscribed or disabled <b>AakList</b>. <a href="' + Aak.subscribeURL + '" target="_blank">Subscribe</a> or <a href="' + Aak.settingsURL + '" target="_blank">Disable this alert</a>');
                }
              }
            });
          });
        });
      }
    },
    checkUpdate : function (auto) {

      var check = function (notifyFalse) {
        Aak.request({
          url : Aak.downloadURL,
          onload : function (response) {
            var res = response.responseText;
            var status = response.status;
            if (status == 200) {
              var local = Aak.getVersion();
              var remote = Number(res.match(/@version\s+(\d+\.\d+)/)[1]);
              if (local < remote) {
                Aak.notification('Anti-Adblock Killer v' + remote + ' is available <a target="_blank" href="' + Aak.downloadURL + '">Install</a>.');
              } else if (notifyFalse) {
                Aak.notification('No update found.');
              }
            }
          }
        });
      };

      if (auto) { // auto mode
        if (Aak.useGM && Aak.opts.checkUpdate && Aak.isTopframe) {
          Aak.ready(function () {
            Aak.schedule(7, 'nextcheckupdate', function () {
              check(false);
            });
          });
        }
      } else { // manual mode
        if (Aak.isTopframe) {
          check(true);
        }
      }

    },
    openInTab : function (url) {
      if (typeof GM_openInTab != 'undefined') {
        GM_openInTab(url);
      } else {
        var newWindow = window.open(url, "_blank");
        newWindow.focus();
      }
    },
    request : function (settings) {
      settings.url = settings.url || '';
      settings.method = settings.method || 'GET';
      settings.headers = settings.headers || {};
      settings.timeout = settings.timeout || 2e4; // 20s
      if (settings.data || settings.method == 'POST') {
        settings.method = 'POST';
        settings.data = Aak.serialize(settings.data || {});
        settings.headers = Aak.setProperties(settings.headers, {
            'X-Requested-With' : 'XMLHttpRequest',
            'Content-Type' : 'application/x-www-form-urlencoded'
          });
      }

      // override to integrate log
      settings._onload = settings.onload;
      settings.onload = function (xhr) {
        if (Aak.opts.logXhr) {
          Aak.log(Aak.getScriptManager() + ' xhr', xhr);
        }
        settings._onload(xhr);
      };

      if (typeof GM_xmlhttpRequest != 'undefined') {
        // Request with GM API
        // doc: http://tinyurl.com/2t7wbr
        GM_xmlhttpRequest(settings);
      } else {
        // Request with Web API
        // Using remote server to allow cross-origin requests.
        // doc: http://tinyurl.com/odz664a
        // doc: http://tinyurl.com/p9zruzn
        var xhr = new window.XMLHttpRequest();
        xhr.open('POST', 'http://reeksite.com/public/xhr.php', true);
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.onload = function () {
          var res = xhr.responseText;
          var json = JSON && JSON.parse(res);
          Object.defineProperty(xhr, "responseText", {
            enumerable : true,
            configurable : true,
            writable : true,
            value : json.response
          });
          settings.onload(xhr);
        };
        xhr.send(Aak.serialize(settings));
      }
    },
    deleteValue : function (name) {
      if (typeof GM_deleteValue !== "undefined" && !name) {
        var vals = GM_listValues();
        for (var i in vals) {
          if (vals.hasOwnProperty(i))
            GM_deleteValue(vals[i]);
        }
      } else if (typeof GM_deleteValue !== "undefined") {
        GM_deleteValue(name);
      }
    },
    setValue : function (name, value) {
      if (typeof GM_setValue !== "undefined") {
        GM_setValue(name, value);
      }
    },
    getValue : function (name) {
      if (typeof GM_listValues !== "undefined" && !name) {
        var list = {};
        var vals = GM_listValues();
        for (var i in vals) {
          if (vals.hasOwnProperty(i))
            list[vals[i]] = GM_getValue(vals[i]);
        }
        return list;
      } else if (typeof GM_getValue !== "undefined" && typeof GM_getValue(name) !== "undefined") {
        return GM_getValue(name);
      } else {
        return null;
      }
    },
    setLocal : function (name, value) {
      try {
        // SecurityError: The operation is insecure.
        // doc: http://tinyurl.com/8peqwvd
        if (typeof window.localStorage !== "undefined") {
          window.localStorage.setItem(name, value.toString());
        } else {
          Aak.warn("Sorry! No Web Storage support.");
        }
      } catch (e) {}
    },
    getLocal : function (name) {
      try {
        if (typeof window.localStorage !== "undefined") {
          return window.localStorage.getItem(name);
        } else {
          Aak.warn("Sorry! No Web Storage support.");
          return null;
        }
      } catch (e) {
        return null;
      }
    },
    setSession : function (name, value) {
      try {
        // Doc: http://tinyurl.com/8peqwvd
        if (typeof window.sessionStorage !== "undefined") {
          window.sessionStorage.setItem(name, value.toString());
        } else {
          Aak.warn("Sorry! No Web Storage support.");
        }
      } catch (e) {}
    },
    getSession : function (name) {
      try {
        if (typeof window.sessionStorage !== "undefined") {
          return window.sessionStorage.getItem(name);
        } else {
          Aak.warn("Sorry! No Web Storage support.");
          return null;
        }
      } catch (e) {
        return null;
      }
    },
    setCookie : function (name, value, time, path) {
      var expires = new Date();
      expires.setTime(new Date().getTime() + (time || 365 * 24 * 60 * 60 * 1000));
      document.cookie = name + "=" + encodeURIComponent(value) + ";expires=" + expires.toGMTString() + ";path=" + (path || '/');
    },
    getCookie : function (name) {
      var value = "; " + document.cookie;
      var parts = value.split("; " + name + "=");
      if (parts.length == 2)
        return parts.pop().split(";").shift();
    },
    setReadOnly : function (name, value) {
      Object.defineProperty(Aak.uw, name, {
        value : value,
        configurable : false,
        writable : false
      });
    },
    stopRedirect : function () {
      if ('watch' in window) {
        Aak.uw.watch("location", function () {});
        Aak.uw.location.watch("href", function () {});
      } else {
        Aak.uw.location = "#";
        throw 'Stop Redirect';
      }
    },
    confirmLeave : function () {
      window.onbeforeunload = function () {
        return '';
      };
    },
    confirmReport : function (elem) {
      elem.innerHTML = 'Report';
      elem.title = 'Report issue or anti-adblock';
      elem.onclick = function (e) {
        e.preventDefault();
        if (window.confirm("Do you want to report issue or anti-adblock ?")) { // Clic on OK
          Aak.go(Aak.reportURL);
        } else {
          Aak.go(elem.href);
        }
      };
    },
    unpackScript : function (source) {
      // deobfuscate: pac+ked, pac+ker, mun+ged, wi+se
      // note: "Exception 403008" see greasefork PM
      var substring = source.substring(source.indexOf('eval(')+4, source.lastIndexOf(')')+1);
      return new Function('return '+substring)();
    },
    hasScript : function (contains, doc) {
      // by: Watilin
      return Array.prototype.filter.call(
        doc && doc.scripts || document.scripts,
        function ($script) {
        var source = $script.innerHTML;
        return source && source.indexOf(contains) != -1;
      })[0];
    },
    addScript : function (source, body) {
      var script = document.createElement('script');
      script.type = "text/javascript";
      script.innerHTML = (typeof source === 'function') ? Aak.intoString(source) : source.toString();
      if (body) {
        document.body.appendChild(script);
      } else {
        document.head.appendChild(script);
      }
      script.remove();
    },
    loadScript : function (src, body, onload) {
      var script = document.createElement('script');
      script.type = "text/javascript";
      script.src = src;
      if (onload) {
        script.onload = onload;
      }
      if (body) {
        document.body.appendChild(script);
      } else {
        document.head.appendChild(script);
      }
    },
    importScript : function (url, callback) {
      Aak.request({
        url : url,
        onload : function (result) {
          var rawScript = result.responseText;
          (new Function('Aak', rawScript + '\n\r' + Aak.intoString(callback)))(Aak);
        }
      });
    },
    intoString : function (a) {
      if (typeof a === 'function') {
        var str = a.toString();
        var first = str.indexOf("{") + 1;
        var last = str.lastIndexOf("}");
        return str.substr(first, last - first).trim();
      } else if (typeof entry === 'object') {
        return JSON.stringify(a);
      } else { // array or string
        return a.toString();
      }
    },
    intoArray : function (a) {
      if (typeof a === 'object') {
        return Object.keys(a).map(function (key) {
          return a[key];
        });
      } else if (typeof a === 'string') {
        return JSON.parse(a);
      } else if (Array.isArray(a)) {
        return a;
      }
    },
    intoObject : function (a) {
      if (typeof a === 'string') {
        return JSON.parse(a);
      } else if (Array.isArray(a)) {
        for (var i = 0, o = {}; i < a.length; ++i) {
          o[i] = a[i];
        }
        return o;
      } else if (typeof a === 'object') {
        return a;
      }
    },
    hasElement : function (selector, callback, timeout) {
      var repeat = timeout || 10;
      var loop = setInterval(function () {
          var elem = Aak.getElement(selector);
          if (elem) {
            callback(elem);
            clearInterval(loop);
          }
          repeat = (repeat) ? repeat - 1 : clearInterval(loop);
        }, 1e3);
    },
    removeElement : function (elem) {
      if (elem instanceof window.HTMLElement) {
        elem.remove();
      } else if (typeof elem === "string") {
        elem = document.querySelectorAll(elem);
        for (var i = 0; i < elem.length; i++) {
          elem[i].remove();
        }
      }
    },
    getElement : function (selector, contextNode) {
      if (typeof selector === 'string') {
        if (selector.indexOf('/') === 0) { // ex: //img[@class="photo"]
          return document.evaluate(selector, contextNode || document, null, window.XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        }
        return (contextNode || document).querySelector(selector);
      } else if (selector instanceof window.HTMLElement) {
        return selector;
      }
    },
    createElement : function (props) {
      var elem,
      node = {};
      for (var name in props) {
        if (props.hasOwnProperty(name)) {
          switch (name) {
          case "tag":
            node = document.createElement(props[name]);
            break;
          case "text":
            var text = ('innerText' in document) ? 'innerText' : 'textContent';
            node[text] = props[name];
            break;
          case "html":
            node.innerHTML = props[name];
            break;
          case "classid":
            node.className = props[name];
            break;
          case "append":
            elem = Aak.getElement(props[name]);
            elem.appendChild(node);
            break;
          case "prepend":
            elem = Aak.getElement(props[name]);
            if (elem.childNodes.length) {
              elem.insertBefore(node, elem.childNodes[0]);
            } else {
              elem.appendChild(node);
            }
            break;
          case "before":
            elem = Aak.getElement(props[name]);
            elem.parentNode.insertBefore(node, elem);
            break;
          case "after":
            elem = Aak.getElement(props[name]);
            elem.parentNode.insertBefore(node, elem.nextSibling);
            break;
          case "replace":
            elem = Aak.getElement(props[name]);
            elem.parentNode.replaceChild(node, elem);
            break;
          case "event":
            for (var evName in props.event) {
              if (props.event.hasOwnProperty(evName))
                node.addEventListener(evName, props.event[evName]);
            }
            break;
          case "callback":
            props[name](node);
            break;
          default:
            node.setAttribute(name, props[name]);
          }
        }
      }
      return node;
    },
    addBaitElement : function (strOpts) { // ex: div.ads or span#ads@
      var opts = strOpts.replace('.', ':className:').replace('#', ':id:').split(':');
      var bait = document.createElement(opts[0]);
      bait.setAttribute(opts[1], opts[2]);
      bait.innerHTML = "<br>";
      document.documentElement.appendChild(bait);
      return bait;
    },
    replaceElement : function (oldNode, newNode) {
      oldNode.parentNode.replaceChild(newNode, oldNode);
    },
    setElement : function (selector, props) {
      var node = Aak.getElement(selector);
      if (node) {
        for (var name in props) {
          if (props.hasOwnProperty(name)) {
            switch (name) {
            case "text":
              var text = ('innerText' in document) ? 'innerText' : 'textContent';
              node[text] = props[name];
              break;
            case "html":
              node.innerHTML = props[name];
              break;
            case "class":
              node.className = props[name];
              break;
            default:
              node.setAttribute(name, props[name]);
            }
          }
        }
      }
    },
    addStyle : function (css) {
      css = css.replace(/;/g, ' !important;');
      if (typeof GM_addStyle != 'undefined') {
        GM_addStyle(css);
      } else {
        document.head.appendChild(document.createElement('style')).innerHTML = css;
      }
    },
    loadStyle : function (src) {
      var style = document.createElement('link');
      style.rel = "stylesheet";
      style.href = src;
      document.head.appendChild(style);
    },
    getStyle : function (selector, prop) {
      var elem = Aak.getElement(selector);
      if (elem.currentStyle) {
        return elem.currentStyle[prop];
      } else if (window.getComputedStyle) {
        return document.defaultView.getComputedStyle(elem, null).getPropertyValue(prop);
      }
    },
    decodeURI : function (str) {
      return decodeURIComponent(str);
    },
    encodeURI : function (str) {
      return encodeURIComponent(str);
    },
    encodeHTML : function (str) {
      return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    },
    decodeHTML : function (str) {
      return String(str).replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"');
    },
    serialize : function (obj) {
      if (typeof obj == 'object') {
        var arr = [];
        for (var prop in obj) {
          if (obj.hasOwnProperty(prop))
            arr.push(prop + '=' + Aak.encodeURI(obj[prop]));
        }
        return arr.join('&');
      }
      return obj;
    },
    unserialize : function (str) {
      str = Aak.decodeHTML(str);
      var arr = str.split('&');
      var obj = {};
      arr.forEach(function (entry) {
        if (entry !== '' && entry.split('=')) {
          var splits = entry.split('=');
          obj[splits[0]] = Aak.decodeURI(splits[1]);
        }
      });
      return obj;
    },
    unsetProperties : function (obj, props) {
      props = (typeof props == 'string') ? props.split(',') : props;
      for (var i = 0; i < props.length; i++) {
        var prop = props[i];
        if (obj.hasOwnProperty(prop)) {
          delete obj[prop];
        }
      }
      return obj;
    },
    setProperties : function (obj1, obj2) {
      for (var prop in obj2) {
        if (obj2.hasOwnProperty(prop))
          obj1[prop] = obj2[prop];
      }
      return obj1;
    },
    fixProtocolURL : function (url) {
      if (/^http/.test(url)) { // absolute
        return url;
      } else if (/^\/\//.test(url)) { // relative
        return 'http:' + url;
      } else { // none
        return 'http://' + url;
      }
    },
    fakeFuckAdBlock : function (instanceName, className) {

      // inject fake fuckadbluck
      Aak.addScript(Aak.intoString(function () {

          var CLASSNAME = function () {
            var self = this;
            var callNotDetected = false;
            this.debug = {
              set : function () {
                return self;
              },
              get : function () {
                return false;
              }
            };
            this.onDetected = function (callback) {
              this.on(true, callback);
              return this;
            };
            this.onNotDetected = function (callback) {
              this.on(false, callback);
              return this;
            };
            this.on = function (detected, callback) {
              if (!detected) {
                callNotDetected = callback;
                setTimeout(callback, 1);
              }
              console.info(['AntiAdbKiller', location.host, 'FuckAdBlock']);
              return this;
            };
            this.setOption = function () {
              return this;
            };
            this.options = {
              set : function () {
                return this;
              },
              get : function () {
                return this;
              }
            };
            this.check = function () {
              if (callNotDetected)
                callNotDetected();
            };
            this.emitEvent = function () {
              return this;
            };
            this.clearEvent = function () {};
          };

          Object.defineProperties(window, {
            CLASSNAME : {
              value : CLASSNAME,
              writable : false
            }
          });

          Object.defineProperties(window, {
            INSTANCENAME : {
              value : new CLASSNAME(),
              writable : false
            }
          });

        }).replace(/INSTANCENAME/g, instanceName || 'fuckAdBlock')
        .replace(/CLASSNAME/g, className || 'FuckAdBlock'));

    }, // Events
    onEvent : function (element, type, listener, bubbles) {
      if (window.addEventListener) { // For all major browsers, except IE 8 and earlier
        (element || window).addEventListener(type, listener, bubbles || false);
      } else { // For IE 8 and earlier versions
        (element || window).attachEvent('on' + type, listener);
      }
      return arguments;
    },
    offEvent : function (element, type, listener, bubbles) {
      if (window.removeEventListener) { // For all major browsers, except IE 8 and earlier
        (element || window).removeEventListener(type, listener, bubbles || false);
      } else { // For IE 8 and earlier versions
        (element || window).detachEvent('on' + type, listener);
      }
    },
    emitEvent : function (element, type, detail, bubbles, cancelable) {
      var event;
      if (window.CustomEvent) {
        event = new window.CustomEvent(type, {
            "detail" : detail || undefined
          }, bubbles || false, cancelable || false);
      } else {
        event = document.createEvent('CustomEvent');
        event.initCustomEvent('on' + type, bubbles || false, cancelable || false, {
          "detail" : detail || undefined
        });
      }
      (element || window).dispatchEvent(event);
    },
    detected : function (name) {
      if (Aak.opts.debug && Aak.opts.logDetected) {
        Aak.emitEvent(window, 'detected', name);
      }
    },
    ready : function (callback) {
      Aak.onEvent(window, 'load', callback);
    },
    player : function () {

      var Player = function () {
        this.target = {};
        this.player = {};
        this.name = null;
        this.version = null;
        this.library = null;
        this.fallback = 'vlc';
        this.autoplay = Aak.opts.autoPlay;
        this.args = null;
        this.setup = {};
        this.options = {
          build : 'embed',
          insert : 'replace',
          crossSetup : true
        };
        this.attributes = { // flash
          wmode : 'opaque',
          quality : 'high',
          bgcolor : '#000000',
          type : 'application/x-shockwave-flash',
          pluginspage : 'http://www.adobe.com/go/getflash',
          allowscriptaccess : 'always', // never / always
          allowfullscreen : true
        };
      };

      Player.prototype = { // http://tinyurl.com/pb6fthj
        getTargetNode : function (element) {

          this.target.node = Aak.getElement(element);
          this.target.html = this.target.node.outerHTML;
          this.target.parent = this.target.node.parentNode;
          this.target.tag = this.target.node.tagName;

          this.attributes.id = this.attributes.name = Aak.generateID();
          this.attributes.height = this.target.node.height || this.target.node.clientHeight || '480px';
          this.attributes.width = this.target.node.width || this.target.node.clientWidth || '640px';
        },
        getMimeType : function (type) {
          // doc: http://tinyurl.com/jrs8fgz
          switch (type.toLowerCase()) {
          case 'mp4':
            return 'video/mp4';
          case 'webm':
            return 'video/webm';
          case 'ogg':
          case 'ogv':
            return 'video/ogg';
          case 'flv':
            return 'video/x-flv';
          case 'hls':
            return 'application/x-mpegURL';
          case 'hds':
            return 'application/f4m+xml';
          default:
            return type;
          }
        },
        building : function (tagName) {
          var self = this;

          if (Aak.opts.forceVLC && this.name !== 'vlc') {
            Aak.info('force playing with VLC');
            return this.vlc.apply(this, this.args);
          }

          switch (tagName) {
          case 'iframe':
            this.player.node = document.createElement('iframe');
            this.player.node.setAttribute('src', this.attributes.src || location.protocol + '//' + location.host + '/');
            if (this.attributes.srcdoc) {
              if (this.player.node.hasAttribute("srcdoc") || 'srcdoc' in this.player.node) {
                this.player.node.setAttribute('srcdoc', this.attributes.srcdoc);
              } else {
                // does not work correctly with flowplayer
                this.player.node.setAttribute('src', "data:text/html;charset=utf-8," + encodeURIComponent(this.attributes.srcdoc));
              }
            }
            this.player.node.setAttribute('width', this.setup.width);
            this.player.node.setAttribute('height', this.setup.height);
            this.player.node.setAttribute('style', 'height:' + this.setup.height + 'px; width:' + this.setup.width + 'px;');
            this.player.node.setAttribute('frameborder', 0);
            this.player.node.setAttribute('scrolling', 'no');
            this.player.node.setAttribute('allowfullscreen', true); // http://tinyurl.com/oyyehab
            // allowfullscreen webkitallowfullscreen mozallowfullscreen oallowfullscreen msallowfullscreen
            break;
          case 'video':
            var attrName;
            this.player.node = document.createElement('video');
            for (attrName in this.attributes) {
              if (this.attributes.hasOwnProperty(attrName))
                this.player.node.setAttribute(attrName, this.attributes[attrName]);
            }

            if (this.attributes.autoplay) { // fix bug duplicate playing on firefox/chrome
              this.player.node.onloadstart = function () {
                //this.play();
              };
            }

            this.player.node.onerror = function () { // switch to plugin player
              setTimeout(function () {
                self.args[0] = self.player.node;
                self.vlcplayer.apply(self, self.args);
              }, 5000);
            };
            break;
          default: // embed
            this.player.node = document.createElement('embed');
            for (attrName in this.attributes) {
              if (this.attributes.hasOwnProperty(attrName))
                this.player.node.setAttribute(attrName, this.attributes[attrName]);
            }
          }
          this.player.html = this.player.node.outerHTML;
          this.player.tag = this.player.node.tagName;
          this.inserting();
        },
        inserting : function () {
          switch (this.options.insert) {
          case 'inner':
            this.target.node.innerHTML = this.player.html;
            break;
          case 'append':
            this.target.parent.replaceChild(this.player.node);
            break;
          default: // replace
            this.target.parent.replaceChild(this.player.node, this.target.node);
          }
          if (Aak.opts.logPlayer) {
            Aak.log('player', this);
          }
          return this;
        },
        editing : function (elem, opts) { // review
          Aak.hasElement(elem, function (thisElement) {
            var obj,
            swf,
            value,
            parts,
            param,
            attributes,
            attrName;
            var so = thisElement;
            var clone = so.cloneNode(true);

            // set attriibutes
            if (opts.setAttribute) {
              attributes = opts.setAttribute;
              for (attrName in attributes) {
                if (clone.querySelector('param[name="' + attrName + '"]')) {
                  clone.querySelector('param[name="' + attrName + '"]').value = attributes[attrName];
                } else if (clone.getAttribute(attrName)) {
                  clone.setAttribute(attrName, attributes[attrName]);
                }
              }
            }

            // unset attributes
            if (opts.unsetAttributes) {
              attributes = opts.delAttributes;
              for (attrName in attributes) {
                if (clone.querySelector('param[name="' + attrName + '"]')) {
                  Aak.removeElement(clone.querySelector('param[name="' + attrName + '"]'));
                } else if (clone.getAttribute(attrName)) {
                  delete attributes[attrName];
                }
              }
            }

            if (opts.setFlashvars || opts.unsetFlashvars) {
              if (clone.querySelector('param[name="flashvars"]')) {
                param = clone.querySelector('param[name="flashvars"]');
                value = param.value;
              } else if (clone.getAttribute('flashvars')) {
                value = clone.getAttribute('flashvars');
              } else if (clone.getAttribute('data') && clone.getAttribute('data').indexOf('?') >= 0) {
                parts = clone.getAttribute('data').split('?', 2);
                swf = parts.shift();
                value = parts.shift();
              }

              obj = Aak.unserialize(value);
              if (opts.setFlashvars) {
                obj = Aak.setProperties(obj, opts.setFlashvars);
              }
              if (opts.unsetFlashvars) {
                obj = Aak.unsetProperties(obj, opts.unsetFlashvars);
              }
              value = Aak.serialize(obj);

              if (param) {
                param.value = value;
              } else if (swf) {
                clone.setAttribute('data', swf + '?' + value);
              } else {
                clone.setAttribute('flashvars', value);
              }
            }
            // replace
            Aak.log(so, clone, obj);
            Aak.replaceElement(so, clone);
          });
        },
        embedding : function (id, setup, attributes, options) { 
        
          this.getTargetNode(id);
          this.args = arguments;
          this.attributes = Aak.setProperties(this.attributes, attributes || {});
          this.options = Aak.setProperties(this.options, options || {});

          this.attributes.src = setup.swf;
          this.attributes.id = this.attributes.name = Aak.generateID();
          this.attributes.height = setup.height || this.attributes.height;
          this.attributes.width = setup.width || this.attributes.width;
          this.attributes.flashvars = Aak.serialize(setup);
          this.attributes = Aak.unsetProperties(this.attributes, 'swf');

          this.building('embed');
        },
        jwplayer : function (id, setup, attributes, options) {
          // JwPlayer 7 (flash/html5)
          // note: problem with ssl
          // setup: http://tinyurl.com/hhrgjap, http://tinyurl.com/gqs46tm
          // api: https://developer.jwplayer.com/jw-player/docs/developer-guide/api/javascript_api_reference/
          // hls: http://tinyurl.com/pxl9scq
          // hls-tester: http://demo.jwplayer.com/stream-tester/
          // rtmp-demo: https://www.scaleengine.com/jw6
          // iframe: http://tinyurl.com/86agg68

          this.getTargetNode(id);
          this.args = arguments;
          this.attributes = Aak.setProperties(this.attributes, attributes || {});
          this.options = Aak.setProperties(this.options, options || {});

          this.setup = setup;
          if (this.options.crossSetup === true) {
            this.setup = {
              controls : true,
              file : setup.source,
              abouttext : Aak.name,
              aboutlink : Aak.homeURL,
              width : setup.width || this.attributes.width,
              height : setup.height || this.attributes.height,
              autostart : setup.autoplay || this.autoplay,
              primary : 'html5',
              preload : 'auto',
              skin : { // Seven | Six | Five | Glow | Beelden | Vapor | Bekle | Roundster | Stormtrooper
                name : setup.skin || "six" // default skin JWP6
              }
            };
            if (['mp4', 'webm', 'ogg', 'ogv'].indexOf(setup.type) === -1) {
              this.setup.primary = 'flash';
            }
            if (setup.type === 'hls') {
              this.setup.hlshtml = true;
            }
          }

          this.attributes.srcdoc = '<html><head><style type="text/css">@font-face{font-family:jw-icons;src:url(' + location.protocol + 'ssl.p.jwpcdn.com/player/v/7.4.3/jw-icons.woff) format("woff"),url(' + location.protocol + '//ssl.p.jwpcdn.com/player/v/7.4.3/jw-icons.ttf) format("truetype");font-weight:400;font-style:normal}</style><script src="' + location.protocol + '//content.jwplatform.com/libraries/V6NfEzT7.js"></script><style type="text/css">html, body{padding:0; margin:0;}</style></head><body><div id="jw-movie"></div><script>jwplayer("jw-movie").setup(' + JSON.stringify(this.setup) + ');</script></body></html>';

          this.building('iframe');
        },
        videojs : function (id, setup, attributes, options) { 
          // VideoJs 5 (flash/html5)
          // setup: http://tinyurl.com/pcgx2ob
          // playback: http://tinyurl.com/nscztmm
          // demo: http://jsfiddle.net/N8Zs5/18/
          // plugins: https://github.com/videojs/video.js/wiki/Plugins

          this.getTargetNode(id);
          this.args = arguments;
          this.attributes = Aak.setProperties(this.attributes, attributes || {});
          this.options = Aak.setProperties(this.options, options || {});

          this.setup = setup;
          if (this.options.crossSetup === true) {
            this.setup = {
              controls : true,
              preload : 'auto',
              width : setup.width || this.attributes.width,
              height : setup.height || this.attributes.height,
              techOrder : ["html5", "flash"],
              autoplay : setup.autoplay || this.autoplay,
              sources : [{
                  type : this.getMimeType(setup.type),
                  src : setup.source
                }
              ]
            };
            /* don't work 
            if (setup.type === 'hls') {
              techOrder : ["flash", "html5"],
              this.setup.flash = {
                //swf : "//reeksite.com/public/swf/videojs-flashls.swf"
                swf : 'http://www.flashls.org/videojs/video-js.swf'
              };
            }
            */
          }

          // 
          this.attributes.srcdoc = '<html><head><link href="' + location.protocol + '//cdnjs.cloudflare.com/ajax/libs/video.js/5.10.5/alt/video-js-cdn.min.css" rel="stylesheet"><script src="' + location.protocol + '//cdnjs.cloudflare.com/ajax/libs/video.js/5.10.5/video.min.js"></script><script src="' + location.protocol + '//cdnjs.cloudflare.com/ajax/libs/videojs-contrib-hls/3.1.0/videojs-contrib-hls.min.js"></script><style type="text/css">html, body{padding:0; margin:0;}.vjs-default-skin{color:#eee}.vjs-default-skin .vjs-play-progress,.vjs-default-skin .vjs-volume-level{background-color:#eee}.vjs-default-skin .vjs-big-play-button,.vjs-default-skin .vjs-control-bar{background:rgba(0,0,0,.2)}.vjs-default-skin .vjs-slider{background:rgba(0,0,0,.3)}</style></head><body><video id="vjs-movie" class="video-js vjs-default-skin vjs-big-play-centered"></video><script>videojs("vjs-movie", ' + JSON.stringify(this.setup) + ')</script></body></html>';

          this.building('iframe');
        },
        flowplayer : function (id, setup, attributes, options) {
          // FlowPlayer 6 (flash)
          // note: problem with flashplayer
          // support: mp4, flv, f4v, m4v, mov
          // setup: https://flowplayer.org/docs/setup.html
          // api: https://flowplayer.org/docs/api.html
          // demo: http://demos.flowplayer.org/basics/js-setup-autoplay.html
          // hds: https://flowplayer.electroteque.org/httpstreaming-hds/fp6
          // hls: http://demos.flowplayer.org/api/hlsjs.html
          // flv: http://demos.flowplayer.org/basics/flv.html

          this.getTargetNode(id);
          this.args = arguments;
          this.attributes = Aak.setProperties(this.attributes, attributes || {});
          this.options = Aak.setProperties(this.options, options || {});

          this.setup = setup;
          if (this.options.crossSetup === true) {
            this.setup = {
              width : setup.width || this.attributes.width,
              height : setup.height || this.attributes.height,
              autoplay : setup.autoplay || this.autoplay,
              preload : 'auto'
            };
            if (setup.type === 'hls') {
              this.setup.swf = location.protocol + '//releases.flowplayer.org/6.0.5/flowplayerhls.swf';
              this.setup.engine = 'hlsjs';
            } else if (['mp4', 'webm', 'ogg', 'ogv'].indexOf(setup.type) === -1) {
              this.setup.swf = location.protocol + '//releases.flowplayer.org/6.0.5/flowplayer.swf';
              this.setup.engine = 'flash';
              this.setup.type = 'video/flash';
            }
            this.setup.clip = {
              sources : [{
                  type : this.getMimeType(this.setup.type || setup.type),
                  src : setup.source
                }
              ]
            };
          }

          this.attributes.srcdoc = '<html><head><link rel="stylesheet" href="' + location.protocol + '//releases.flowplayer.org/6.0.5/skin/functional.css"></script><script src="' + location.protocol + '//code.jquery.com/jquery-1.11.2.min.js"></script><script src="' + location.protocol + '//releases.flowplayer.org/6.0.5/flowplayer.min.js"></script><style type="text/css">html, body{padding:0; margin:0;}</style></head><body><div id="fp-movie"></div><script>flowplayer("#fp-movie", ' + JSON.stringify(this.setup) + ');</script></body></html>';

          this.building('iframe');
        },
        grindplayer : function (id, setup, attributes, options) {
          // GrindPlayer 1 (flash)
          // setup: http://osmfhls.kutu.ru/docs/grind/
          // support: hls, rtmp

          this.getTargetNode(id);
          this.args = arguments;
          this.attributes = Aak.setProperties(this.attributes, attributes || {});
          this.options = Aak.setProperties(this.options, options || {});

          this.setup = setup;
          if (this.options.crossSetup === true) {
            this.setup = {
              src : setup.source,
              streamType : "live",
              scaleMode : "letterbox",
              autoPlay : setup.autoplay || this.autoplay
            };
            if (setup.type === 'hls') {
              this.setup.plugin_hls = "//reeksite.com/public/swf/flashlsOSMF.swf";
            }
            if (setup.proxy === true) {
              this.setup.src = '//www.dianshibo.com/fetch.php/' + setup.source.substring(setup.source.indexOf('//') + 2);
            }
          }

          this.attributes.src = setup.swf || this.attributes.src || "//reeksite.com/public/swf/GrindPlayer.swf";
          this.attributes.height = setup.height || this.attributes.height;
          this.attributes.width = setup.width || this.attributes.width;
          this.attributes.flashvars = Aak.serialize(this.setup);

          this.building('embed');
        },
        vlc : function (id, setup, attributes, options) {
          // VLC Web Plugin (plugin)
          // doc: http://tinyurl.com/omlzp39
          // plugins: about:plugins
          // chrome://flags/#enable-npapi
          // https://www.chromium.org/developers/npapi-deprecation
          // In September 2015 (Chrome 45) we will remove the override and NPAPI support will be permanently removed from Chrome. Installed extensions that require NPAPI plugins will no longer be able to load those plugins.

          this.name = 'vlc';
          this.getTargetNode(id);
          this.args = arguments;
          this.attributes = Aak.setProperties(this.attributes, attributes || {});
          this.options = Aak.setProperties(this.options, options || {});

          this.setup = setup;
          if (this.options.crossSetup === true) {
            this.attributes.src = setup.source;
            this.attributes.height = setup.height || this.attributes.height;
            this.attributes.width = setup.width || this.attributes.width;
            this.attributes.controls = true;
            if (setup.autoplay || this.autoplay) {
              this.attributes.autoplay = true;
            }
          }

          this.attributes.type = "application/x-vlc-plugin";
          this.attributes.pluginspage = "http://www.videolan.org";
          this.building('embed');
        },
        html5 : function (id, setup, attributes, options) { 
          // Video Tag (html5)
          // basics: https://html5rocks.com/en/tutorials/video/basics/
          // tag: http://www.w3schools.com/tags/tag_video.asp
          // support: mp4, webm, ogg
          // test: http://www.quirksmode.org/html5/tests/video.html

          this.options = Aak.setProperties(this.options, options || {});

          this.getTargetNode(id);
          this.args = arguments;
          this.attributes = Aak.setProperties({}, setup || {});
          this.attributes.src = setup.source;
          this.attributes.id = this.attributes.name = Aak.generateID();
          this.attributes.height = this.attributes.height || this.target.node.clientHeight || "100%";
          this.attributes.width = this.attributes.width || this.target.node.clientWidth || "100%";
          this.attributes.type = this.getMimeType(this.attributes.type);
          this.attributes.controls = 'controls';
          this.attributes.preload = 'none';
          if (this.attributes.autoplay || this.autoplay) {
            this.attributes.autoplay = 'autoplay';
          }
          this.attributes.style = 'display: block; margin:0 auto;';
          this.attributes = Aak.unsetProperties(this.attributes, 'source');

          this.building('video');
        }
      };
      
      return new Player();
    },
    rules : {
      // --------------------------------------------------------------------------------------------
      // Anti-Adblock Killer
      // --------------------------------------------------------------------------------------------
      settings : {
        host : ['localhost', 'reek.github.io', 'reeksite.com'],
        onEnd : function () {

          if (/\/anti-adblock-killer(-pages)?\/$/.test(location.pathname)) {
            var settingsBox = Aak.getElement('#aak-settings-box');
            var settingsNotice = Aak.getElement('#aak-settings-notice');

            if (!Aak.useGM) {
              settingsNotice.querySelector('div').innerHTML = 'In native mode, you must edit the options manually: <a href="' + Aak.nativeURL + '">See</a>';
            } else if (settingsBox && settingsNotice) {
              settingsNotice.style.display = 'none';
              settingsBox.style.display = 'block';
              Aak.info('GM storage:', Aak.getValue());
              Aak.info('GM options:', Aak.opts);
              Aak.info('GM api:', Aak.useGM && Aak.apiGM());

              // user config
              Aak.createElement({
                tag : 'div',
                html : 'Version: ' + Aak.getVersion() + ' <br>AakScript: true <br>AakList: ' + (!Aak.getElement('#k2Uw7isHrMm5JXP1Vwdxc567ZKc1aZ4I')) + ' <br>Browser: ' + Aak.getBrowser() + ' <br>ScriptManager: ' + Aak.getScriptManager(),
                append : '#aak-settings-config'
              });

              // create options 
              for (var optName in Aak.options) {
                if (Aak.options.hasOwnProperty(optName)) {
                  var opt = Aak.options[optName];
                  var checked = Aak.opts[optName] === true ? "checked" : '';
                  Aak.createElement({
                    tag : 'div',
                    html : '<input id="' + optName + '" class="css-checkbox" ' + checked + ' type="' + opt.type + '"/><label for="' + optName + '" title="' + opt.info + '" class="css-label">' + opt.label + '</label>',
                    append : '#aak-settings-' + opt.group
                  });
                }
              }

              // save options 
              Aak.onEvent(Aak.getElement("#aak-settings-save"), "click", function () {
                var elems = document.querySelectorAll('.css-checkbox');
                for (var i = 0; i < elems.length; i++) {
                  var elem = elems[i];
                  if (elem.checked) {
                    Aak.setValue(elem.id, true);
                  } else {
                    Aak.setValue(elem.id, false);
                  }
                }
                window.alert('Saved !');
              });

              // Clear GM storage
              Aak.addCommands({
                caption : 'Clear GM storage',
                execute : function () {
                  Aak.deleteValue();
                  window.alert('Cleared !');
                }
              });
            }
          }
        }
      },
      userscripts_domains : { // Redirect to Github
        host : ['userscripts.org', 'userscripts.org:8080', 'userscripts-mirror.org'],
        onStart : function () {
          if (/155840$/.test(location.pathname)) {
            Aak.go(Aak.homeURL);
          }
        }
      },
      openuserjs_org : {
        host : ['openuserjs.org'],
        onIdle : function () {
          var element = Aak.getElement('a[href$="/issues"]');
          if (/Anti-Adblock_Killer_Reek/.test(location.pathname) && element) {
            Aak.confirmReport(element);
          }
        }
      },
      greasyfork_org : {
        host : ['greasyfork.org'],
        onIdle : function () {
          var element = Aak.getElement('a[href$="/feedback"]');
          if (/-anti-adblock-killer-reek/.test(location.pathname) && element) {
            Aak.confirmReport(element);
          }
        }
      },
      monkeyguts_com : {
        host : ['monkeyguts.com'],
        onIdle : function () {
          var element = Aak.getElement('a[href*="code.php?nav=forum"]');
          if (/monkeyguts.com\/code.php\?id=351/.test(location.href) && element) {
            Aak.confirmReport(element);
          }
        }
      },
      // --------------------------------------------------------------------------------------------
      // Specific
      // --------------------------------------------------------------------------------------------
      blogspot : {
        // No Country Redirect (NCR)
        // Prevent Blogger from Redirecting to Country-Specific Domains
        // doc: http://tinyurl.com/7rm34jo
        // issue: https://greasyfork.org/fr/forum/discussion/5953
        // issue: https://github.com/reek/anti-adblock-killer/issues/490
        // test: http://tinyurl.com/nomcxkc
        host : ['.blogspot.'],
        onStart : function () {
          if (Aak.isTopframe) { // fix rediretion loop
            var blog = location.host.replace('www.', '').split(".");
            if (blog[blog.length - 1] != "com") {
              var path = location.href.split("/").slice(3).join('/');
              Aak.go("http://" + blog[0] + ".blogspot.com/ncr/" + path);
            }
          }
        }
      },
      blogspot_knowlet3389 : {
        // note: also added abp rule
        // issue: https://github.com/reek/anti-adblock-killer/issues/83
        // source: http://pastebin.com/A3mCXQ5i
        host : ['knowlet3389.blogspot.'],
        onStart : function () {
          Aak.setLocal('noad', false);
          Aak.addStyle("#gAds { height: 17px; } #gAd2 { height: 17px; }");
        }
      },
      uptobox_uptostream : {
        // issue: https://github.com/reek/anti-adblock-killer/issues/351
        host : ['uptobox.com', 'uptostream.com'],
        onStart : function () {
          // Old solution [deprecated]
          var id = location.pathname.match(/[0-9a-z]{12}/);
          if (id !== null) {
            Aak.addStyle("#" + id[0] + " { height: 12px; }");
          }
          // New 12.05.2014
          // + abp rule (alternative solution)
          Aak.addStyle("#adblocktrap { height: 12px; }");
        },
        onIdle : function () {
          // remove ads
          Aak.removeElement('*[src^="http://ads.uptobox.com/"],*[href^="http://ads.uptobox.com/"]');
        }
      },
      anisubsia_com : {
        host : ['anisubsia.com'],
        onStart : function () {
          // + abp rule #@#.adsantilok
          Aak.addStyle(".adsantilok { height: 5px; }");
        },
        onIdle : function () {
          Aak.uw.jAntiBlock = function () {};
          Aak.uw.CekBlok = function () {};
        }
      },
      freegameserverhost_com : {
        // issue: https://github.com/reek/anti-adblock-killer/issues/1512
        host : ['freegameserverhost.com'],
        onStart : function () {
          Aak.addStyle("#fab13 { height: 11px; }");
        }
      },
      elahmad_com : {
        host : ['elahmad.com'],
        onStart : function () {
          Aak.addStyle("#adblock { height: 1px; }");
        }
      },
      mrtzcmp3_net : {
        host : ['mrtzcmp3.net'],
        onStart : fu