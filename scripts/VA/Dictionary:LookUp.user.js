// ==UserScript==
// @namespace   VA_i
// @version     1.0.0.20160928
// @grant       none
// @include     /^/
// @run-at      document-start
// @name        Dictionary:LookUp
// @description (a) Hold Option/Alt Key -> Selection (b) Selection -> Option/Alt x2
// ==/UserScript==

var debug = false;
var counter = 0;
var log = function () {
  var args = Array.prototype.slice.call(arguments);
  debug && console.log.apply(console, ['[DICT]'].concat(args));
};

var ready = true;
var tid_ready = null;
var tid_lookup = null;
var last_time = 0;

var revoke = function () {
  clearTimeout(tid_lookup);
  clearTimeout(tid_ready);
  ready = false;
  log('ready:', ready);
};
var invoke = function (time) {
  if (!ready) {
    clearTimeout(tid_ready);
    tid_ready = setTimeout(function () {
      ready = true;
      log('ready:', ready);
    }, time);
  }
};

var getText = function (node) {
  var selection = getSelection();
  if (!selection.isCollapsed) {
    var text = [];
    for (var i = 0, l = selection.rangeCount; i < l; i++) {
      var word = selection.getRangeAt(i).toString().trim();
      word && text.push(word);
    }
    return text.length ? text.join(' ') : null;
  } else if ('selectionStart' in node) {  // <input> or <textarea>
    var text = node.value.substring(node.selectionStart, node.selectionEnd).trim();
    return text.length ? text : null;
  }
};

var lookup = function (text) {
  if (!text) { return; }
  var link = document.createElement('a');
  link.target = '_self';
  link.href = 'dict:///' + encodeURIComponent(text);
  var event = document.createEvent('MouseEvents');
  event.initMouseEvent('click', !1, !1, window, 0, 0, 0, 0, 0, !1, !1, !1, !1, 0, null);
  link.dispatchEvent(event);
};

var eventHandler = function (event) {
  if (!ready) { return; }
  var c = event.keyCode;
  if ((c === 18 /*alt*/ && (event.ctrlKey || event.shiftKey || event.metaKey)) ||
      (event.altKey && c != null)) {
    revoke();
    invoke(300);
    return;
  }
  if (c === 18 || event.altKey) {
    if (event.type !== 'click') {
      var this_time = new Date().getTime();
      if (this_time - last_time > 300) {
        last_time = this_time;
        return;
      }
    }
    clearTimeout(tid_lookup);
    tid_lookup = setTimeout(function () {
      last_time = 0;
      var text = getText(event.target);
      lookup(text);
      log('selection:', ++counter, text);
    }, 200);
  }
};

window.addEventListener('keyup', eventHandler, false);
window.addEventListener('click', eventHandler, false);

window.addEventListener('blur', function () { revoke(); }, false);
window.addEventListener('focus', function () { invoke(600); }, false);
