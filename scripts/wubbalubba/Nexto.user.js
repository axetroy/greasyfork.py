// ==UserScript==
// @name        Nexto
// @namespace   nothing00000000
// @version     1.6
// @grant       whatever
// @description This is a base for an autopager, basically loads the next page if you give it the content to load and a CSS selector to the Next link, to add a website modify the implementation array, only tested on Firefox, probably buggy but works for what I need it for, you need to add @includes and add website to the implementations array to get it to work. V1.5 works in Chrome, if you're into that sort of thing.
// ==/UserScript==

'use strict'

var implementations = [
  {
    site: "", // regex to compare against site URL, similar to @include
    nextLinkSelector: "", // css selector for the next link, tip: find the current page button and do next sibling
    contentSelector: "", // the content that will be added to from the next page
    javascript: false // set this to true if the website uses javascript to load content, 50% chance it'll work
  }
];

implementations.sort((a, b) => a.site.length < b.site.length);

var index = implementations.findIndex((x) => location.href.search(x.site) === -1 ? false : true);

if(index === -1) {
  console.log("Nexto site not found.");
} else {
  window.onload = () => runNexto(1000);
}

function runNexto(interval) {
  var context = {
    currentURL: location.href,
    nextLink: document.querySelector(implementations[index].nextLinkSelector),
    content: document.querySelector(implementations[index].contentSelector),
    implementation: implementations[index],
    javacript: implementations[index].javacript
  };

  getNextPage(context, interval);
}

function getNextPage(context, interval) {
  if(context.currentURL === context.nextLink.href) {
    return;
  }

  if(!isContentVisible(context.content, 0.75)) {
    waitAndRun(getNextPage, context, interval);
    return;
  }

  if(context.javacript) {
    var iframe = document.createElement('iframe');
    iframe.src = context.nextLink.href;
    iframe.style.visibility = "hidden";
    iframe.style.height = "10000000px";
    var iframeElement = document.body.appendChild(iframe);
    iframe.addEventListener("load", () => getNewContextFromIframe(context, iframeElement, interval));
  } else {
    fetch(context.nextLink.href,
      {credentials: 'include'})
    .then((response) => response.text())
    .then(parseData)
    .then((parsedData) => getNewContext(parsedData, context))
    .then((newContext) => {
      context.content.insertAdjacentElement("afterend", newContext.content);
      return newContext;
    })
    .then((newContext) => waitAndRun(getNextPage, newContext, interval));
  }
}

function getNewContextFromIframe(context, iframeElement, interval) {
  var iframeDocument = iframeElement.contentWindow.document.documentElement;
  var newContext = getNewContext(iframeDocument, context);
  iframeElement.contentWindow.scrollTo(0, iframeDocument.scrollHeight);
  setTimeout(function() {
    insertNewPage(context, iframeElement, interval, newContext);
  }, 3000);
}

function insertNewPage(context, iframeElement, interval, newContext) {
  context.content.insertAdjacentElement("afterend", newContext.content);
  document.body.removeChild(iframeElement);
  waitAndRun(getNextPage, newContext, interval);
}

function parseData(textData) {
  var parser = new DOMParser();

  return parser.parseFromString(textData, "text/html");
}

function getNewContext(mainElement, context) {
  return {
    currentURL: context.nextLink.href,
    nextLink: mainElement.querySelector(context.implementation.nextLinkSelector),
    content: mainElement.querySelector(context.implementation.contentSelector),
    implementation: context.implementation,
    javacript: context.javacript
  };
}

function waitAndRun(fn, context, delay) {
  setTimeout(function() {
    fn(context, delay);
  }, delay);
}

function isContentVisible(content, minVisibilityPercentage) {
  var viewportHeight = Math.min(document.documentElement.clientHeight,
                                document.body.clientHeight);
  var contentRect = content.getBoundingClientRect();
  var triggerPosition = contentRect.top + contentRect.height * minVisibilityPercentage;

  return triggerPosition < viewportHeight;
}