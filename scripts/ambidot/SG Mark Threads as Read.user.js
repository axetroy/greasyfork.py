// ==UserScript==
// @name SG Mark Threads as Read
// @namespace https://www.steamgifts.com/user/ambidot
// @version 22
// @author ambidot
// @description Adds mark-read toggle and some other features.
// @supportURL https://www.steamgifts.com/discussion/HtbQK/
// @require https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.2/components/core-min.js
// @require https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.2/components/md5-min.js
// @match https://www.steamgifts.com/
// @match https://www.steamgifts.com/giveaway*
// @match https://www.steamgifts.com/giveaways*
// @exclude https://www.steamgifts.com/giveaways/entered*
// @match https://www.steamgifts.com/user/*
// @match https://www.steamgifts.com/group/*
// @exclude https://www.steamgifts.com/group/*/*/users
// @match https://www.steamgifts.com/trade/*
// @match https://www.steamgifts.com/trades*
// @match https://www.steamgifts.com/discussion/*
// @match https://www.steamgifts.com/discussions*
// @grant GM_setValue
// @grant GM_getValue
// ==/UserScript==

var trackedits = true;
var pagedate = Date.now();
var parser = new DOMParser();
var sortmode = GM_getValue("sortmode", 0);
var giveaways = document.getElementsByClassName("giveaway__heading");
var entered = [];
var headings = document.getElementsByClassName("table__column__heading");
var crumbs = document.getElementsByClassName("page__heading__breadcrumbs");
var funlist = GM_getValue("funlist", "").split(",");
var usernames = document.getElementsByClassName("comment__username");
function markGiveaway(event) {
  var giveaway = event.target.parentNode.getElementsByTagName("a")[0].getAttribute("href").split("/")[2];
  GM_setValue(giveaway, ~GM_getValue(giveaway, 0));
}
function refreshGiveaways(event) {
  for (n=0; n<giveaways.length; n++) {
    var giveaway = giveaways[n].children[0].getAttribute("href").split("/")[2];
    if (entered[n] != 0 || GM_getValue(giveaway, 0) != 0) {
      giveaways[n].parentNode.parentNode.className = "giveaway__row-inner-wrap is-faded";
    }
    else {
      giveaways[n].parentNode.parentNode.className = "giveaway__row-inner-wrap";
      if (GM_getValue(giveaway, 0) != 0) {
        giveaways[n].children[giveaways[n].children.length-1].className = "table__last-comment-icon is-clickable fa fa-magic icon-red";
      }
      else {
        giveaways[n].children[giveaways[n].children.length-1].className = "giveaway__icon fa fa-magic";
      }
    }
  }
}
function pinHeading(event) {
  var thread = event.target.parentNode.getElementsByTagName("a")[0].getAttribute("href").split("/")[2];
  GM_setValue(thread+"_pin", ~GM_getValue(thread+"_pin", 0));
}
function markHeading(event) {
  var thread = event.target.parentNode.getElementsByTagName("a")[0].getAttribute("href").split("/")[2];
  GM_setValue(thread, ~GM_getValue(thread, 0));
}
function clearPencil(event) {
  var thread = event.target.parentNode.parentNode.children[1].getElementsByTagName("a")[0].getAttribute("href").split("/")[2];
  GM_setValue(thread+"_hash", "");
  event.target.className = "giveaway__icon icon-heading fa fa-pencil";
}
function clearFire(event) {
  var thread = event.target.parentNode.parentNode.children[1].getElementsByTagName("a")[0].getAttribute("href").split("/")[2];
  GM_setValue(thread+"_count", -1);
  event.target.className = "giveaway__icon fa fa-fire";
}
function refreshHeadings() {
  for (n=0; n<headings.length; n++) {
    var thread = headings[n].getAttribute("href").split("/")[2];
    if (GM_getValue(thread+"_pin", 0) != 0) {
      headings[n].parentNode.getElementsByClassName("fa-thumb-tack")[0].className = "table__last-comment-icon is-clickable fa fa-thumb-tack";
    }
    else {
      headings[n].parentNode.getElementsByClassName("fa-thumb-tack")[0].className = "giveaway__icon fa fa-thumb-tack";
    }
    if (headings[n].parentNode.children[0].className.includes("fa-lock") || GM_getValue(thread, 0) != 0) {
      headings[n].parentNode.parentNode.parentNode.className = "table__row-inner-wrap is-faded";
      if (GM_getValue(thread, 0) != 0) {
        headings[n].parentNode.getElementsByClassName("fa-magic")[0].className = "table__last-comment-icon is-clickable fa fa-magic icon-red";
      }
    }
    else {
      headings[n].parentNode.parentNode.parentNode.className = "table__row-inner-wrap";
      headings[n].parentNode.getElementsByClassName("fa-magic")[0].className = "giveaway__icon fa fa-magic";
    }
  }
}
function parseHeading(n, thread, ajax) {
  if (ajax.readyState == 4 && ajax.status == 200) {
    var page = parser.parseFromString(ajax.responseText, "text/html");
    var hash = CryptoJS.MD5(page.getElementsByClassName("comment__display-state")[0].children[0].innerHTML).toString(CryptoJS.enc.Hex);
    if (hash != GM_getValue(thread+"_hash", "")) {
      headings[n].parentNode.parentNode.parentNode.getElementsByClassName("fa-pencil")[0].className = "icon-heading is-clickable fa fa-pencil icon-red";
    }
  }
}
function parseUser(n, user, ajax) {
  if (ajax.readyState == 4 && ajax.status == 200) {
    var page = parser.parseFromString(ajax.responseText, "text/html");
    var other = page.getElementsByClassName("featured__table__row")[1].children[1].children[0];
    var span = document.createElement("i");
    span.innerHTML = " last online "+other.innerHTML;
    headings[n].parentNode.parentNode.children[1].appendChild(span);
  }
}
function parseDate(threaddate) {
  threaddate = threaddate.substr(0, threaddate.length-2)+" "+threaddate.substr(threaddate.length-2, 2);
  threaddate = threaddate.replace("Today", new Date(pagedate).toDateString());
  threaddate = threaddate.replace("Yesterday", new Date(pagedate-24*60*60*1000).toDateString());
  return Date.parse(threaddate);
}
function sortTableRows() {
  var tablerows = Array.prototype.slice.call(document.getElementsByClassName("table__row-outer-wrap"));
  var timestamps = [];
  for (n=0; n<tablerows.length; n++) {
    if (sortmode != 0) {
      if (crumbs[crumbs.length-1].innerHTML == "Active Discussions" || crumbs[crumbs.length-1].children[0].innerHTML == "Discussions") {
        var threaddate = tablerows[n].children[0].children[1].children[1].children[1].getAttribute("title");
      }
      else if (crumbs[crumbs.length-1].children[0].children[0].innerHTML == "Trades") {
        var threaddate = tablerows[n].children[0].children[1].children[1].children[0].getAttribute("title");
      }
    }
    else {
      if (tablerows[n].children[0].children[3].children.length > 1) {
        var threaddate = tablerows[n].children[0].children[3].children[0].children[0].children[0].getAttribute("title");
      }
      else {
        var threaddate = tablerows[n].children[0].children[1].children[1].getElementsByTagName("span")[0].getAttribute("title");
      }
    }
    threaddate = parseDate(threaddate);
    if (tablerows[n].children[0].children[1].children[0].children[0].className.includes("fa-lock")) {
      threaddate -= 10*365.25*24*60*60*1000;
    }
    timestamps.push([threaddate, n]);
  }
  timestamps.sort();
  for (n=0; n<timestamps.length; n++) {
    tablerows[0].parentNode.appendChild(tablerows[timestamps[timestamps.length-1-n][1]]);
  }
}
function flipTableRows() {
  GM_setValue("sortmode", (sortmode = ~sortmode));
  sortTableRows();
}
function markCrumbs(event) {
  var thread = window.location.pathname.split("/")[2];
  GM_setValue(thread, ~GM_getValue(thread, 0));
}
function refreshCrumbs() {
  var thread = window.location.pathname.split("/")[2];
  if (GM_getValue(thread, 0) != 0) {
    crumbs[0].className = "page__heading__breadcrumbs is-faded";
  }
  else {
    crumbs[0].className = "page__heading__breadcrumbs";
  }
}
function markUser(event) {
  var user = event.target.parentNode.children[2].children[0].innerHTML;
  if (funlist.indexOf(user) != -1) {
    funlist.splice(funlist.indexOf(user), 1);
  }
  else {
    funlist.push(user);
  }
  GM_setValue("funlist", funlist.join(","));
}
function refreshComments() {
  for (n=0; n<usernames.length; n++) {
    if (usernames[n].innerHTML == "Deleted") continue;
    if (usernames[n].parentNode.parentNode.parentNode.parentNode.className == "comment comment--collapsed") {
      // avoid breaking reply function
      usernames[n].parentNode.children[0].click();
    }
    usernames[n].parentNode.lastChild.className = "giveaway__icon fa fa-magic";
    for (o=0; o<funlist.length; o++) {
      if (usernames[n].children[0].innerHTML == funlist[o]) {
        usernames[n].parentNode.parentNode.parentNode.parentNode.className = "comment comment--collapsed";
        usernames[n].parentNode.lastChild.className = "table__last-comment-icon is-clickable fa fa-magic icon-red";
        break;
      }
    }
  }
}
// /giveaway, /trade, /discussion
if (window.location.pathname.substr(1, 9) == "giveaway/" || window.location.pathname.substr(1, 6) == "trade/" || window.location.pathname.substr(1, 11) == "discussion/") {
  var thread = window.location.pathname.split("/")[2];
  var button = document.createElement("i");
  if (GM_getValue(thread, 0) != 0) {
    button.className = "table__last-comment-icon is-clickable fa fa-magic icon-red";
  }
  else {
    button.className = "giveaway__icon fa fa-magic";
  }
  button.setAttribute("title", "mark");
  button.addEventListener("click", markCrumbs);
  button.addEventListener("click", refreshCrumbs);
  crumbs[0].appendChild(button);
  refreshCrumbs();
  var hash = CryptoJS.MD5(document.getElementsByClassName("comment__display-state")[0].children[0].innerHTML).toString(CryptoJS.enc.Hex);
  GM_setValue(thread+"_hash", hash);
  var count = parseInt(crumbs[1].children[0].innerHTML.replace(",", ""));
  GM_setValue(thread+"_count", count);
  for (n=0; n<usernames.length; n++) {
    if (usernames[n].innerHTML == "Deleted") continue;
    var button = document.createElement("i");
    button.className = "giveaway__icon fa fa-magic";
    button.setAttribute("title", "mark");
    button.addEventListener("click", markUser);
    button.addEventListener("click", refreshComments);
    usernames[n].parentNode.appendChild(button);
  }
  refreshComments();
}
// /, /giveaways, /user, /group, /trades, /discussions
else {
  for (n=0; n<giveaways.length; n++) {
    entered.push(1+giveaways[n].parentNode.parentNode.className.indexOf("is-faded"));
    var button = document.createElement("i");
    button.className = "giveaway__icon fa fa-magic";
    button.setAttribute("title", "mark");
    button.addEventListener("click", markGiveaway);
    button.addEventListener("click", refreshGiveaways);
    giveaways[n].insertBefore(button, giveaways[n].getElementsByClassName("giveaway__hide")[0].nextSibling);
  }
  for (n=0; n<headings.length; n++) {
    var button = document.createElement("i");
    button.className = "giveaway__icon fa fa-thumb-tack";
    button.setAttribute("title", "pin");
    button.addEventListener("click", pinHeading);
    button.addEventListener("click", refreshHeadings);
    headings[n].parentNode.appendChild(button);
    var button = document.createElement("i");
    button.className = "giveaway__icon fa fa-magic";
    button.setAttribute("title", "mark");
    button.addEventListener("click", markHeading);
    button.addEventListener("click", refreshHeadings);
    headings[n].parentNode.appendChild(button);
  }
  refreshGiveaways();
  refreshHeadings();
  sortTableRows();
  // this potentially modifies the breadcrumb, so do it last-ish
  var button = document.createElement("i");
  button.className = "giveaway__icon fa fa-sort-numeric-asc";
  button.setAttribute("title", "switch");
  button.addEventListener("click", flipTableRows);
  if (crumbs[crumbs.length-1].innerHTML == "Active Discussions" || crumbs[crumbs.length-1].children[0].innerHTML == "Discussions" || crumbs[crumbs.length-1].children[0].children[0].innerHTML == "Trades") {
    crumbs[crumbs.length-1].appendChild(button);
  }
  for (n=0; n<headings.length; n++) {
    var thread = headings[n].getAttribute("href").split("/")[2];
    var count = parseInt(headings[n].parentNode.parentNode.parentNode.children[2].children[0].innerHTML.replace(",", ""));
    var indicator = document.createElement("i");
    indicator.className = "giveaway__icon icon-heading fa fa-pencil";
    indicator.setAttribute("title", "clear");
    indicator.addEventListener("click", clearPencil);
    headings[n].parentNode.parentNode.parentNode.children[2].insertBefore(indicator, headings[n].parentNode.parentNode.parentNode.children[2].firstChild);
    var indicator = document.createElement("i");
    if (GM_getValue(thread+"_count", -1) != -1 && count > GM_getValue(thread+"_count", -1)) {
      indicator.className = "table__last-comment-icon is-clickable fa fa-fire icon-red";
    }
    else {
      indicator.className = "giveaway__icon fa fa-fire";
    }
    indicator.setAttribute("title", "clear");
    indicator.addEventListener("click", clearFire);
    headings[n].parentNode.parentNode.parentNode.children[2].appendChild(indicator);
  }
  if (trackedits) {
    for (n=0; n<headings.length; n++) {
      var thread = headings[n].getAttribute("href").split("/")[2];
      if (GM_getValue(thread+"_hash", "") != "") {
        var ajax = new XMLHttpRequest();
        // this is so fucking stupidly convoluted, it blows my mind
        ajax.onreadystatechange = function(n, thread, ajax) {
          return function() { parseHeading(n, thread, ajax); };
        }(n, thread, ajax);
        ajax.open("GET", "/"+headings[n].getAttribute("href").split("/")[1]+"/"+thread+"/");
        ajax.send();
      }
    }
    if (window.location.pathname.substr(1, 6) == "trades") {
      for (n=0; n<headings.length; n++) {
        var user = headings[n].parentNode.parentNode.children[1].children[1].innerHTML;
        var ajax = new XMLHttpRequest();
        ajax.onreadystatechange = function(n, user, ajax) {
          return function() { parseUser(n, user, ajax); };
        }(n, user, ajax);
        ajax.open("GET", "/user/"+user);
        ajax.send();
      }
    }
  }
}
