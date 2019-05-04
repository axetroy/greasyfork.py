// ==UserScript==
// @name         知乎专栏 Markdown 扩展支持
// @namespace    https://github.com/discountry/zhihumarkdown
// @require      https://cdn.bootcss.com/marked/0.3.6/marked.min.js
// @require      https://cdn.bootcss.com/to-markdown/3.0.4/to-markdown.min.js
// @version      0.7
// @description  Add Markdown Support for Zhihu Zhuanlan Editor
// @author       Discountry
// @match        https://zhuanlan.zhihu.com/write
// @match        https://zhuanlan.zhihu.com/p/*/edit
// @grant        unsafeWindow
// @copyright    2017+, @余博伦
// ==/UserScript==

(function() {
  'use strict';
  var initWatcher = setInterval(function() {
    console.log('watch');
    if (unsafeWindow.angular) {
      clearInterval(initWatcher);
      init();
    }
  }, 100);

  function init() {
    console.log('angular', unsafeWindow.angular);
    console.log("Makrdown Included!");

    var toHTML = function() {
      var plainContent = unsafeWindow.document.querySelector("#js-entry-content");
      console.log(plainContent.innerHTML);
      plainContent.innerText = toMarkdown(plainContent.innerHTML, { gfm: true });

    };
    unsafeWindow.toHTML = toHTML;
    var toMD = function() {
      var plainContent = unsafeWindow.document.querySelector("#js-entry-content");
      console.log(plainContent.innerText);
      plainContent.innerHTML = marked(plainContent.innerText);
      plainContent.addEventListener('click', function autoMD() {
          plainContent.removeEventListener('click', autoMD);
          unsafeWindow.toHTML();
      });
    };
    unsafeWindow.toMD = toMD;
  }

  function createButton() {
    var toolBar = unsafeWindow.document.querySelector(".goog-toolbar");
    var toMarkdownButton = '<div class="goog-inline-block goog-toolbar-button" title="转为markdown" role="button" id="markdown" style="user-select: none;" onclick="window.toMD()"><div class="goog-inline-block goog-toolbar-button-outer-box" style="user-select: none;"><div class="goog-inline-block goog-toolbar-button-inner-box" style="user-select: none;"><div class="tr-icon tr-code" style="user-select: none;"></div></div></div></div>';
    toolBar.insertAdjacentHTML('beforeend', toMarkdownButton);
    console.log("Button Added!");
    var plainContent = unsafeWindow.document.querySelector("#js-entry-content");
    plainContent.addEventListener('click', function autoMD() {
        plainContent.removeEventListener('click', autoMD);
        unsafeWindow.toHTML();
    });
  }

  setTimeout(createButton, 1000);

})();