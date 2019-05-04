// ==UserScript==
// @name           MH - H2P - Forums focus search
// @namespace      mountyhall
// @description    When you surf to MountyHall's Forums, focus the search field so that you can enter a search without having to use the mouse to focus the field
// @include        http://www.mountyhall.com/Forum/search_form.php*
// @icon           http://games.mountyhall.com/favicon.ico
// @version        1.0
// @author         43406 - H2P
// ==/UserScript==

document.getElementsByName('search').item(0).focus();
