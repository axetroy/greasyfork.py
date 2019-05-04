// ==UserScript==
// @name           open all links in the new tab except for the turn page link MIO
// @description    except for the turn page link whose inner text is 'next', 'previous' and other page number

//@include https://www.amazon.it/gp/aw/*

//@include https://serietvonline.com/*



//@include https://www.bulkpowders.it/*


//@include https://m.youtube.com/*



//@include https://www.inoreader.com/*



//@include https://userstyles.org/styles/*



//@include http://m.asos.com/it/search/*


11
//@include https://hooktube.com/*



//@include http://www.inoreader.com/*

//@include https://m.ebay.it/*



//@include https://github.com/*



//@include https://www.youtube.com/*



//@include https://www.topresellerstore.com/it/index.php?controller=new-products



//@include https://m.subito.it/annunci-italia/*



//@include http://m.ebay.it/sch/*
// @author         yechenyin
// @version        1.0
// @namespace 	   https://greasyfork.org/users/3586-yechenyin
// @grant       	 GM_openInTab
// ==/UserScript==
(function() {
  "use strict";

  var exception = [/^https:\/\/www\.google\.\w+\/search/, 'https://m.leiphone.com/page/'];
  function getAncestorLink(element) {
    while (element && element.nodeName != "A") {
      element = element.parentNode;
    }
    if (element && element.nodeName && element.nodeName === "A" && element.href && element.href.indexOf('http') === 0)
      return element;
  }

  String.prototype.matched = function(strings) {
    for (var i = 0; i < strings.length; i++) {
      if (typeof strings[i] == 'string' && this.indexOf(strings[i]) === 0)
        return true;
      else if (strings[i] instanceof RegExp && strings[i].test(this))
        return true;
    }
    return false;
  };

  if (location.href.indexOf('https://tech.sina.cn') === 0) {

    var setLinkAction = function(node) {
      if (node && !node.hasAttribute('setted') && node.nodeName && node.nodeName === "A" && node.href && node.href.indexOf('http') === 0) {
        node.setAttribute('setted', '');
        node.addEventListener('click', function(e) {
          e.preventDefault();
          e.stopPropagation();
          if (this && this.href && !this.href.matched(exception) && !/^(\d+|Next|Prev|>|<|下一页|上一页|下一頁|上一頁|回首頁|次へ|前へ)$/.test(this.innerText)) {
            console.log(this, e.target);
            window.open(this.href);
          } else {
            location.href = this.href;
          }
        });
      }
    };

    for (var i = 0; i < document.getElementsByTagName("A").length; i++) {
      setLinkAction(document.getElementsByTagName("A")[i]);
    }
    var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
    if (MutationObserver) {
      var observer = new MutationObserver(function(records) {
        records.map(function(record) {
          setLinkAction(record.target);
          for (var i = 0; i < record.target.getElementsByTagName("A").length; i++) {
            setLinkAction(record.target.getElementsByTagName("A")[i]);
          }
        });
      });
      observer.observe(document.body, {
        childList: true,
        subtree: true
      });
    }
  } else {
    document.addEventListener('click', function(e) {
      var link = getAncestorLink(e.target);
      console.log(link.innerText);
      if (link && link.href && !link.href.matched(exception) && link.innerText && !/^(\d+|Next|Prev|>|<|下一页|上一页|下一頁|上一頁|回首頁|次へ|前へ)$/.test(link.innerText))
        link.target = '_blank';
    });