// ==UserScript==
// @name         Add Site Search Links To Google Search Result
// @namespace    https://greasyfork.org/en/users/85671-jcunews
// @version      1.0.5
// @license      AGPL v3
// @description  Add a "Site Results" link onto each Google search result entries to search from that site. The link will be added either in the search result entry's popup menu, or after the green URL below the entry's title.
// @author       jcunews
// @include      *://www.google.*/search*
// @include      *://www.google.*.*/search*
// @grant        none
// ==/UserScript==

(function(a) {
  location.search.substring(1).split("&").some(function(v) {
    if (v.indexOf("q=") === 0) {
      if (a = decodeURIComponent(v.substr(2).trim().replace(/\+/g, " ")).match(/(?:^|\s)site:([^\s]+)/)) {
        a = a[1];
      } else a = "";
      return true;
    }
  });
  if (!a) document.querySelectorAll("#ires .g").forEach(function(entry, menu, point, e) {
    if (!(point = entry.querySelector(".r>a"))) return;
    if (menu = entry.querySelector(".action-menu-item")) {
      if ((/:\/\/webcache/).test(menu.firstElementChild.href)) {
        e = menu.nextElementSibling;
      } else if ((/=related:http/).test(menu.firstElementChild.href)) {
        e = menu;
      } else e = null;
      menu = menu.parentNode.insertBefore(menu.cloneNode(true), e).firstElementChild;
    } else if (menu = entry.querySelector(".f")) {
      menu.insertAdjacentHTML("beforeend", ' - <a class="fl"></a>');
      menu = menu.lastElementChild;
    } else return;
    menu.textContent = "Site Results";
    if (point.pathname === "/url") {
      point = unescape(point.search.match(/&url=([^&]+)/)[1]).match(/:\/\/([^:/]+)/)[1];
    } else point = point.hostname;
    menu.href = location.href.replace(/([&?]q=[^&]+)/, "$1+site:" + escape(point));
    menu.onmousedown = null;
  });
})();
