// ==UserScript==
// @name        Anti-Adblock-Harassment-for-spiegel.de
// @namespace   anti-adblock-harassment-for-spiegel-de
// @description This script makes the pages of spiegel.de usable again for people with adblockers installed.
// @include     http://www.spiegel.de/*
// @include     https://www.spiegel.de/*
// @version     3.10
// @grant       none
// ==/UserScript==
var obfuscatedRootClassName = 'obfuscated-content';
var obfuscatedClassName = 'obfuscated';
var blacklistedClassNames = ['js-spiegelplus-obfuscated-intro', 'laterpay-under-overlay'];
var blacklistedIDs = ['laterpay-replacement'];
var blacklistedTagNames = ['noscript'];
var blacklistedDynamicSelectors = ['div[class^="sp_veil"]', 'div[class^="sp_message"]', 'div[class^="TeaserImageTopTextInside-image"]', 'div[class~="ContentBlock--paywall"]', 'div[class="Navigation-mainbar"]', 'div[data-advertisement]', 'div[class~="gutscheine-widget"]'];
var removeAttributesDict = {'html': 'style', 'body': 'style'};
var scanningInterval = 500;
var rotation = -1;

var theIntervalHandle = main();

function main() {
  var rootWrappers = document.getElementsByClassName(obfuscatedRootClassName);

  if (rootWrappers.length > 0) {
    removeStaticSpoilers(document);

    for each(var elm in rootWrappers) {
      removeBlur(elm);

      //decrypt
      var paragraphs = elm.getElementsByClassName(obfuscatedClassName);
      for each(var par in paragraphs) {
        iterateChildNodes(par);
      }
    }
  }

  return startScanning();
}

function startScanning() {
  return window.setInterval(removeDynamicSpoilers, scanningInterval);
}

function removeDynamicSpoilers() {
  var spoilers = [];

  for each (var strCSSSelector in blacklistedDynamicSelectors) {
    spoilers = Array.prototype.concat.apply(spoilers, document.querySelectorAll(strCSSSelector));
  }

  if (spoilers.length > 0) {
    removeNodes(spoilers);
    removeAttributes(removeAttributesDict);
    clearInterval(theIntervalHandle);
  }
}

function removeStaticSpoilers(aRootNode) {
  var spoilers = [];

  for each (var blacklistedClassName in blacklistedClassNames) {
    spoilers = Array.prototype.concat.apply(spoilers, aRootNode.getElementsByClassName(blacklistedClassName));
  }

  for each (var blacklistedID in blacklistedIDs) {
    spoilers.push(aRootNode.getElementById(blacklistedID));
  }

  for each (var blacklistedTag in blacklistedTagNames) {
    spoilers = Array.prototype.concat.apply(spoilers, aRootNode.getElementsByTagName(blacklistedTag));
  }

  removeNodes(spoilers);
}

function removeNodes(theNodeList) {
  for (var theItem in theNodeList) {
    removeNode(theNodeList[theItem]);
  }
}

function removeNode(theNode) {
  try {
    theNode.parentNode.removeChild(theNode);
  } catch (e) {
  }
}
    
function removeAttributes(theDict) {
  var theResultList = [];

  for (var key in theDict) {
    if (theDict.hasOwnProperty(key)) {
      var nodeList = document.querySelectorAll(key);

      for (var elm in nodeList) {
        removeAttribute(nodeList[elm], theDict[key]);
      }
    } 
  }              
}

function removeAttribute(theNode, theAttributeName) {
  try {
    theNode.removeAttribute(theAttributeName);
  } catch (e) {
  }
}

function removeBlur(element) {
  element.className = 'article-section clearfix';
  element.style = "background: url('data:image/png;base64,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')";
}

function iterateChildNodes(aRootNode) {
  var children = aRootNode.childNodes
  for each(var child in children) {
    try {
      if (child.nodeName.toLowerCase() === '#text') {
        child.nodeValue = decrypt(child.nodeValue);
      } else {
        if (child.tagName != 'A') {
          iterateChildNodes(child);
        }
      }
    } catch (e) {
    }
  }
}

function decrypt(encrypted) {
  var i = encrypted.length;
  var c;
  var dummy = [];

  while (i--) {
    c = encrypted.charCodeAt(i) + rotation;

    if (c >= 33 && c <= 126) {
      dummy[i] = String.fromCharCode(c);
    } else if (c >= 127) {
      switch (c) {
        case 133:
          dummy[i] = '';
          break;
        case 150:
          dummy[i] = '-';
          break;
        case 176:
          dummy[i] = '°';
          break;
        case 177:
          dummy[i] = '!';
          break;
        case 179:
          dummy[i] = ':';
          break;
        case 191:
          dummy[i] = '.';
          break;
        case 196:
          dummy[i] = 'Ä';
          break;
        case 214:
          dummy[i] = 'Ö';
          break;
        case 220:
          dummy[i] = 'Ü';
          break;
        case 223:
          dummy[i] = 'ß';
          break;
        case 225:
          dummy[i] = 'á';
          break;
        case 227:
          dummy[i] = 'ã';
          break;
        case 228:
          dummy[i] = 'ä';
          break;
        case 231:
          dummy[i] = 'ç';
          break;
        case 232:
          dummy[i] = 'è';
          break;
        case 233:
          dummy[i] = 'é';
          break;
        case 237:
          dummy[i] = 'í';
          break;
        case 242:
          dummy[i] = 'ò';
          break;
        case 243:
          dummy[i] = 'ó';
          break;
        case 246:
          dummy[i] = 'ö';
          break;
        case 252:
          dummy[i] = 'ü';
          break;
        default:
          dummy[i] = encrypted[i] + '(' + c + ')';
      }
    } else {
      dummy[i] = encrypted[i];
    }
  }
  return dummy.join('');
}