// ==UserScript==
// @name          Greasyfork in your language
// @description   Whenever a link to localized greasyfork page is clicked, redirect it to the specified language
// @namespace     wOxxOm.scripts
// @author        wOxxOm
// @version       3.0.6
// @match         https://greasyfork.org/*
// @exclude       https://greasyfork.org/system/*
// @run-at        document-start
// @grant         GM_getValue
// @grant         GM_setValue
// ==/UserScript==
/* jshint lastsemic:true, multistr:true, laxbreak:true, -W030, -W041, -W084 */

var language = GM_getValue('language', 'en');

maybeRedirect(location);

window.addEventListener('load', function _() {
  window.removeEventListener('load', _);
  var _timer, _title;
  document.getElementById('language-selector-locale').addEventListener('change', function() {
    GM_setValue('language', this.value);
    _title = _title || this.title;
    this.title = this.value + ' saved in ' + GM_info.script.name;
    clearTimeout(_timer);
    _timer = setTimeout(function() {
      this.title = _title;
      _title = null;
    }, 5000);
  });
});

window.addEventListener('mousedown', function(e) {
  var a = e.target.closest('a');
  if (a &&
      a.origin == 'https://greasyfork.org' &&
      a.pathname.lastIndexOf('/system/', 0) < 0 &&
      !a.pathname.match(/\/code\/.*?\.user\.js/))
    maybeRedirect(a);
});

function maybeRedirect(url) {
  var m = url.href.slice(url.origin.length).match(/^(?:\/(\w\w(?:-\w\w)?)(?:[/?]|$))?(.*)$/i);
  if (m[1] !== language) {
    var path = '/' + language + '/' + m[2].replace(/[?&]locale_override[^&]*/, '').replace(/^\//, '');
    url.href = url.origin + path +
      (path.indexOf('/forum/') > 0 ? '' : (path.indexOf('?') > 0 ? '&' : '?') + 'locale_override=1');
    console.log('Redirected greasyfork url language from %s to %s', m[1], language);
  }
}