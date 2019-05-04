// ==UserScript==
// @name         Mycroft Project - View XML
// @namespace    mycroft-project-view-xml
// @version      0.1.1
// @description  Add a link to view the associated OpenSearch XML document in a new tab
// @author       Valacar
// @match        http://mycroftproject.com/*
// @match        https://mycroftproject.com/*
// @exclude      http://mycroftproject.com/installos.php/*
// @exclude      https://mycroftproject.com/installos.php/*
// @grant        none
// @noframes
// @license     MIT
// @compatible  firefox Firefox
// @compatible  chrome Chrome
// ==/UserScript==

(function() {
  'use strict';

  function appendStyle(cssString)
  {
    const parent = document.head || document.documentElement;
    if (parent) {
      const style = document.createElement("style");
      style.setAttribute("type", "text/css");
      style.textContent = cssString;
      parent.appendChild(style);
      return style;
    }
    return null;
  }

  const iconXML = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAQCAMAAABA3o1rAAAAIVBMVEX6qwPzig7pbxn/xxv/89D//fj/6qf+xFv/0V7+ty76ojjYukhEAAAAwElEQVQoz22QgRLCMAhDoQGG/v8Hm9Dudqeyo1V4BKj1dYHe1xyPH3N72a/5fTt/wbbrxCRxYq5vFCoZq0BngCW6rMI2IQBRQJYhs1kbwSQBH5sZOqFgp+qQMQpYTC8BriaMOVVSqToKQ9jLR6JssbazEX0A5tetkMHuVNCoOjZAOwo1QWd9R5U9LYjY2yV9HLPIBmAwAVQQLZVOaKENZIrdCoZ5U3PwkusBQTsttO300/8fG8D3RmvP/QX8r3vsAwUVBXilFd0QAAAAAElFTkSuQmCC';

  appendStyle(`
.xml-link { padding: 0 0.5ex; }

.xml-link:hover{ border-bottom: 1px solid #ff9900; }

.xml-link > span {
  display: inline-block;
  width: 32px;
  height: 16px;
  text-indent: -9999px;
  background: url(${iconXML}) 0 0 no-repeat;
}
`);

  let links = document.querySelectorAll('a[onclick^="addOpenSearch"]');
  if (links) {
    for (let link of links) {
      let onClickText = link.attributes.onclick.textContent;
      let paramMatch = onClickText.match(/addOpenSearch\('([^']+).+'(\d+)'/);
      let name = paramMatch[1];
      let id = paramMatch[2];
      if (parseInt(id) && name) {
        link.insertAdjacentHTML("afterend", `<a href="http://mycroftproject.com/installos.php/${id}/${name}.xml" target="_blank" class="xml-link" title="View OpenSearch XML"><span>[XML]</span></a>`);
      }
    }
  }

})();