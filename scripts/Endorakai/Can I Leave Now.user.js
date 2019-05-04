// ==UserScript==
// @name Can I Leave Now
// @description	Stop That Annoying Pop-Up Message To Leave Pages!!!
// @include *
// @version 1.0
// @namespace https://greasyfork.org/users/13772
// ==/UserScript==

location.href = "javascript:(" + function() {
  window.onbeforeunload = null;
  window.onunload = null;
  window.beforeunload = null;
} + ")()";