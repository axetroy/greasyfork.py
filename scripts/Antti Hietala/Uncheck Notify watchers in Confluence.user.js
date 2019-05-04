// ==UserScript==
// @name Uncheck Notify watchers in Confluence
// @version 0.2
// @description Unchecks the Notify watchers checkbox in Confluence editor by default
// @author Antti Hietala
// @license Attribution 4.0 International (CC BY 4.0)
// @match */pages/editpage.action?*
// @grant none
// @namespace https://greasyfork.org/users/10793
// ==/UserScript==
AJS.$('#notifyWatchers').attr('checked', false);