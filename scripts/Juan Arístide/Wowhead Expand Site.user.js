// ==UserScript==
// @name         Wowhead Expand Site
// @namespace    http://tampermonkey.net/
// @version      0.4
// @description  Expands wowhead Site to take full width
// @author       @AcademicoMDP
// @match        *://*.wowhead.com/*
// @grant        none
// ==/UserScript==

var expandSite = function(){
    document.getElementById("header-expandsite").click();
    document.getElementById("sidebar").style.display = "none";
    document.getElementById("sidebar-wrapper").style.display = "none";
    document.getElementById("page-content").style.paddingRight = "0px";
};

if (document.readyState === "complete" || (document.readyState !== "loading" && !document.documentElement.doScroll)) {
  expandSite();
}