// ==UserScript==
// @name               Google Cleaner
// @description        Hide (toggle) top bar (All, Videos, News...) and adds quick filtering to the left sidebar. Also reduces font size and removes an annoying popup box.
// @version            3.2
// @include            http://www.google.*/search*
// @include            http://www.google.*/webhp*
// @include            http://www.google.*/images*
// @include            http://www.google.*/imghp*
// @include            https://www.google.*/search*
// @include            https://www.google.*/webhp*
// @include            https://encrypted.google.com/search*
// @grant              GM_addStyle
// @namespace https://greasyfork.org/users/153157
// ==/UserScript==

var head = document.getElementsByTagName('head')[0];

function init() {
  toggleNavBar();
  toggleFiltersBar();
  addLinks();
  cleanGoogle();
  removeAnnoyingPopUpBox();
}

function removeAnnoyingPopUpBox() {
  var intervalId = setInterval(function() {
    var box = document.getElementsByClassName('gb_fa gb_g')[0];
    if (box) {
      clearInterval(intervalId);
      box.style.display = 'none';
    }
  }, 100);
}

var isBarVisible = false;
var hideNavBarStyle = dom("<style type='text/css'>#top_nav {display:none;}</style>");
function toggleNavBar() {
  if (isBarVisible) {
    head.removeChild(hideNavBarStyle);
  } else {
    head.appendChild(hideNavBarStyle);
  }

  isBarVisible = !isBarVisible;
}

var isFiltersBarVisible = false;
var hideFiltersBarStyle = dom("<style type='text/css'>#filtersBar {display:none;}</style>");
function toggleFiltersBar() {
  if (isFiltersBarVisible) {
    head.removeChild(hideFiltersBarStyle);
  } else {
    head.appendChild(hideFiltersBarStyle);
  }

  isFiltersBarVisible = !isFiltersBarVisible;
}

function addLinks() {
  var parent = document.getElementById('rcnt');

  createLink("<div id='bartoggle' style='font-size: 11px; top: 25px; left: 23px; position: absolute'>Toggle topbar</div>", toggleNavBar, parent);

  createLink("<div style='font-size: 11px; top: 49px; left: 33px; position: absolute'>Past year</div>", showPastYearPosts, parent);
  createLink("<div style='font-size: 11px; top: 70px; left: 53px; position: absolute'>+</div>", toggleFiltersBar, parent);

  var filtersBar = createLink("<div id='filtersBar' style='font-size: 11px; top: 89px; left: 34px; position: absolute; line-height: 18px'></div>", null, parent);

  createLink("<div style=''>Past year</div>", showPastYearPosts, filtersBar);
  createLink("<div style=''>Any time</div>", showAnyTimePosts, filtersBar);
  createLink("<div style=''>Past hour</div>", showPastHourPosts, filtersBar);
  createLink("<div style=''>Past 24 hours</div>", showPast24HoursPosts, filtersBar);
  createLink("<div style=''>Past week</div>", showPastWeekPosts, filtersBar);
  createLink("<div style=''>Past month</div>", showPastMonthPosts, filtersBar);
  createLink("<div style=''>Custom range</div>", showCustomRangePosts, filtersBar);
}

function showPastYearPosts() { doLink("qdr_y"); }
function showAnyTimePosts() { doLink("qdr_"); }
function showPastHourPosts() { doLink("qdr_h"); }
function showPast24HoursPosts() { doLink("qdr_d"); }
function showPastWeekPosts() { doLink("qdr_w"); }
function showPastMonthPosts() { doLink("qdr_m"); }
function showCustomRangePosts() { toggleNavBar(); document.getElementById("cdr_opt").children[1].click(); }

function doLink(linkId) {
  document.getElementById(linkId).firstChild.click();
}

function createLink(nodeString, onclick, parent) {
  if (!parent) return null;
  var link = dom(nodeString);
  link.addEventListener("click", onclick, false);
  parent.appendChild(link);
  return link;
}

function dom(nodeString) {
  var div = document.createElement('div');
  div.innerHTML = nodeString;
  return div.firstChild;
}

function cleanGoogle() {  
  //document.styleSheets[0].insertRule(“body {background:red;}”, 0);  
  GM_addStyle_from_string(
      '#appbar, .sfbgx {display: none}' +      
      '#tads a, #tadsb a, #res a, #rhs a, #taw a {font-size: small}' +
      '.srp #searchform {top: 5px}' +
      '#sfdiv {height: 30px}' + 
      '#_fZl {height: 30px; line-height: 30px}' +
      '#lst-ib {top: -7px}' +       
      '.sfbgg {background-color: #fff} ' + 
      '#logocont > a > img {width: 35%; height: auto; margin-top: 2px; margin-left: 5px;}' +
      '#sfcnt {height: 24px}'    
  );
}

function GM_addStyle_from_string(str) {
    var node = document.createElement('style');
    node.innerHTML = str;
    document.body.appendChild(node);
}


init();