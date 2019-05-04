// ==UserScript==
// @name       TeamWork - Dashboard Links Mod
// @namespace  http://teamworkmods.lukebutler.com
// @version    1.3
// @description  Change the "Dashboard" link to direct to "Today's Tasks" by default
// @match      https://*.teamwork.com/*
// @copyright  2015+, Luke Butler
// ==/UserScript==

var i = 0;
var dashboardButton;
while(i==0){
  dashboardButton = document.getElementById("tl_dashboard");
  if (typeof(dashboardButton) != 'undefined' && dashboardButton != null){
    var i = 1;
    var dashboardLink = dashboardButton.getElementsByClassName("ql")[0];
    dashboardLink.setAttribute("href", "dashboard?display=todaystasks");
    dashboardLink.innerHTML = "Today's Tasks";
  }
}