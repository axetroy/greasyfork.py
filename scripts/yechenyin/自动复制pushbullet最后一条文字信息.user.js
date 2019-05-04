// ==UserScript==
// @name            自动复制pushbullet最后一条文字信息
// @description     auto copy last message when pushbullet push a new message
// @include         https://www.pushbullet.com
// @version         0.2
// @author          yechenyin
// @namespace	    https://greasyfork.org/users/3586-yechenyin
// @match           https://www.pushbullet.com*
// @require	        https://code.jquery.com/jquery-1.11.2.min.js
// @grant           GM_setClipboard
// @run-at          document-end
// ==/UserScript==


jQuery.fn.inserted = function(action) {
  var selector = this.selector;
  var reaction = function(records) {
    records.map(function(record) {
      if (record.target !== document.body && $(record.target).find(selector).length) {
        action.call($(record.target).find(selector).last());
      }
    });
  };

  var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
  if (MutationObserver) {
    var observer = new MutationObserver(reaction);
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  } else {
    //setInterval(reaction, 100);
  }
};

console.log($('.text-part').last().text());
$('.text-part').inserted(function () {
    GM_setClipboard($('.text-part').last().text().replace(/\s+$/, ''));
});



