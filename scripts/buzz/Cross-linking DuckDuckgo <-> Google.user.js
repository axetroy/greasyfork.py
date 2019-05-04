// ==UserScript==
// @name           Cross-linking DuckDuckgo <-> Google
// @namespace      https://greasyfork.org/en/users/8981-buzz
// @description    Adds Google link to DuckDuckGo results page and vice-versa.
// @author         buzz
// @version        0.4
// @include        /^https?://duckduckgo\.com/.*$/
// @include        /^https?://www\.google\.(am|az|by|co\.uz|com|com\.tr|com\.ua|de|ee|fi|ge|kg|kz|lt|lv|md|ru|tm)/.*$/
// @include        https://encrypted.google.com/*
// @noframes
// @grant          none
// @license        GPL version 3 or any later version; http://www.gnu.org/licenses/gpl.html
// ==/UserScript==

// Shamelessly ripped from https://greasyfork.org/en/scripts/8928-alternative-search-engines-2

var SEARCH_ON = ' ';
var SEARCH_ON_END = ' ';
var LINK_BOX_ID = 'oeid-box';
var ENGINES_SEPARATOR = ' • ';

var ENGINES = {
  Google: 'https://www.google.com/search?q=',
  DuckDuckGo: 'https://duckduckgo.com/?q='
};

var PLACEHOLDER_SELECTORS = [
  '#resultStats', // google
  '#links_wrapper' // duckduckgo
].join(',');

var INPUT_FIELD_SELECTORS = [
  '#lst-ib', // google
  '#search_form_input' // duckduckgo
].join(',');

function onClick(event) {
  var link = event.target;
  if(link.nodeName.toLowerCase() !== 'a')
    return;
  var engineSource = ENGINES[link.engineName];
  var engineURL;
  var engineParam = '';
  if(Array.isArray(engineSource)) {
    engineParam = engineSource[1];
    engineURL = engineSource[0];
  }
  else if(typeof engineSource === 'string') {
    engineURL = engineSource;
  }
  else {
    return;
  }
  var searchText = document.querySelector(INPUT_FIELD_SELECTORS);
  if(engineURL && searchText && searchText.value.length > 0) {
    var url = engineURL + encodeURIComponent(searchText.value) + engineParam;
    window.open(url, "_self");
  }
}

function addCSSStyle() {
  var cssStyle = document.createElement('style');
  cssStyle.type = 'text/css';
  cssStyle.textContent = [
    '#' + LINK_BOX_ID + ' {',
    '	float: left;',
    '	display: inline-block;',
    '	padding-right: 10px;',
    '	padding-bottom: 3px;',
    '	color: rgb(115, 115, 115);' ,
    '	font-family: Verdana,sans-serif;',
    '	z-index: 10000;',
    '}',
    '#resultStats > #' + LINK_BOX_ID + ' {',
    '	font-size: 13px;',
    '}',
    '#links_wrapper > #' + LINK_BOX_ID + ' {',
    '	padding-left: 10px;',
    '	font-size: 14px;',
    '	line-height: 35px;',
    '}'
  ].join('\n');
  document.head.appendChild(cssStyle);
}

var createFragment = (function() {
  var setCommon = function(node, sAttr, reason) {
    var aAttr = sAttr.split(',');
    aAttr.forEach(function(attr) {
      var attrSource = /:=/.test(attr) ? attr.split(':=') : [attr, ''];
      var attrName = attrSource[0].trim();
      var attrValue = attrSource[1].trim().replace(/^(['"])([^\1]*)\1$/, '$2');
      if(reason === 'a') {
        node.setAttribute(attrName, attrValue);
      }
      else {
        node[attrName] = attrValue;
      }
    });
    return node;
  };
  var setAttr = function(node, sAttr) {
    return setCommon(node, sAttr, 'a');
  };
  var setProp = function(node, sAttr) {
    return setCommon(node, sAttr, 'p');
  };
  var createFragmentInner = function(data, fragment) {
    var node;
    if(data.n) {
      node = document.createElement(data.n);
      if(data.a)
        node = setAttr(node, data.a);
      if(data.p)
        node = setProp(node, data.p);
      if(data.s)
        node.style.cssText = data.s;
      fragment.appendChild(node);
    }
    if(data.c) {
      data.c.forEach(function(cn) {
        createFragmentInner(cn, node || fragment);
      });
    }
    if(data.t && node) {
      node.appendChild(document.createTextNode(data.t));
    }
    if(data.tc) {
      fragment.appendChild(document.createTextNode(data.tc));
    }
    if(data.dn) {
      fragment.appendChild(data.dn);
    }
    return fragment;
  };
  return function(data) {
    var fragment = document.createDocumentFragment();
    return createFragmentInner({c:data}, fragment);
  };
})();

function createLinkBox() {
  return createFragment([
    {n:'div',a:'id:="'+LINK_BOX_ID+'"',c:(function() {
      var domain = document.domain;
      var aLinks = [{tc:SEARCH_ON}];
      for(var engine in ENGINES) {
        if(domain.indexOf(engine.toLowerCase()) !== -1)
          continue;
        aLinks.push(
          {n:'a',a:'href:="javascript:void(0)"',p:'engineName:="'+engine+'"',t:engine},
          {tc:ENGINES_SEPARATOR}
        );
      }
      aLinks[aLinks.length-1] = {tc:SEARCH_ON_END};
      return aLinks;
    })()}
  ]);
}

function onDOMLoad() {
  var results = document.querySelector(PLACEHOLDER_SELECTORS);
  if(!results)
    return;
  if(document.getElementById(LINK_BOX_ID))
    return;
  addCSSStyle();
  var fragment = createLinkBox();
  var linkBox = fragment.querySelector('#'+LINK_BOX_ID);
  linkBox.onclick = onClick;
  results.insertBefore(fragment, results.firstChild);
}

function addObserver(target, config, callback) {
  var observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      callback.call(this, mutation);
    });
  });
  observer.observe(target, config);
  return observer;
}

function removeObserver(observer) {
  observer.disconnect();
}

function getNodes() {
  var _slice = Array.slice || Function.prototype.call.bind(Array.prototype.slice);
  var trg = document.body;
  var params = { childList: true, subtree: true };
  var getNode = function(mut) {
    var addedNodes = mut.addedNodes;
    var nodes = _slice(addedNodes);
    nodes.forEach(function(node) {
      if(node.querySelector &&
         node.querySelector(PLACEHOLDER_SELECTORS)) {
        onDOMLoad();
      }
    });
  };
  var observer = addObserver(trg, params, getNode);
  window.addEventListener('unload', function(event) {
    removeObserver(observer);
  }, false);
}

onDOMLoad();
getNodes();
