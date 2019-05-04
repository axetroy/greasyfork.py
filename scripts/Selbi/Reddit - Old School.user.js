// ==UserScript==
// @name     Reddit - Old School
// @version  1.0
// @grant    none
// @include  https://*.reddit.com/*
// @namespace  selbi
// @description Automatically redirects you to old.reddit.com when you're on the atrocious new site and also enables smooth scrolling for image expansion with increased click areas.
// ==/UserScript==

////////////////////////

// Main
var url = window.location.href;
if (url.includes("old.reddit.com")) {
  if (url.includes("/comments/")) {
    redditScrollToComments();    
  } else {
    redditScrollToMain();
  }
} else {
  redditRedirectToOld();
}

////////////////////////

// Redirect
function redditRedirectToOld() {
  url = url.replace("//www.", "//old.");
  window.location.href = url;
}

////////////////////////

// Scrolling
function redditScrollToComments() {
  document.querySelector(".commentarea .sitetable").addEventListener('click', function(event) {
    var targetElem = event.target;
    if (targetElem.tagName.toLowerCase() == "a") {
      return;
    }
    var entry = findParentElemByClass(targetElem, "entry", 5);
    if (entry !== null) {
      entry.querySelector(".expand").click();
      scrollToY(entry);
    }
  });
}

function redditScrollToMain() {
  document.getElementById("siteTable").addEventListener('click', function(event) {
    var targetElem = event.target;
    if (targetElem.classList.contains("expando-button")) {
      scrollToY(targetElem.parentElement);
    } else {
      var entry = findParentElemByClass(targetElem, "entry", 4);
      if (entry !== null) {
        entry.querySelector(".expando-button").click();
      }
    }
  });
}

function findParentElemByClass(elem, className, maxSearchDepth) {
  if (maxSearchDepth <= 0) {
    return null; 
  } else if (elem.classList.contains(className)) {
    return elem; 
  }
  return findParentElemByClass(elem.parentElement, className, maxSearchDepth - 1);
}

function scrollToY(elem) {
  var scroll = elem.getBoundingClientRect().top + window.scrollY;
  window.scroll({
    top: scroll,
    left: 0,
    behavior: 'smooth'
  });
}

// CSS for the scrolling
addGlobalStyle(`
  .entry:hover, .res-nightmode .entry.res-selected:hover {
    background-color: rgba(255,255,255, 0.1) !important;
    cursor: pointer;
  }
`);

function addGlobalStyle(css) {
  var head, style;
  head = document.getElementsByTagName('head')[0];
  if (!head) { return; }
  style = document.createElement('style');
  style.type = 'text/css';
  style.innerHTML = css;
  head.appendChild(style);
}

////////////////////////
