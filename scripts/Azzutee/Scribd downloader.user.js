// ==UserScript==
// @name    	Scribd downloader
// @description Adds a button to display all image URLs used by Scribd to display the documents
// @author  	Azzutee
// @version 	1.0.0
// @include 	http://*.scribd.com/doc/*
// @include 	https://*.scribd.com/doc/*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js
// @namespace https://greasyfork.org/users/126266
// ==/UserScript==

$(function () {
  function listAllDocumentImages() {
    var win = window.open();
    var imgUrls = {
    };
    function updateUrls() {
      var str = '';
      for (var i = 1; i <= docManager.pageCount(); ++i) {
        if (imgUrls[i]) {
          str += imgUrls[i] + '<br>';
        } else {
          str += 'Loading.....' + '<br>';
        }
      }
      $(win.document.body).html(str);
    }
    function addPage(pageNum) {
      return function (arr) {
        var url = $(arr[0]).find('.absimg[orig]').attr('orig');
        url = url.replace('http://', 'https://');
        url = url.replace('html.scribd.com', 'html1-f.scribdassets.com');
        imgUrls[pageNum] = url;
      };
    }
    $.each(docManager.pages, function (idx) {
      var page = this;
      if (page.innerPageElem) {
        imgUrls[page.pageNum] = $(page.innerPageElem).find('img').attr('src');
        updateUrls();
      } else {
        var jsonpCallback = 'page' + page.pageNum + '_callback';
        window[jsonpCallback] = addPage(page.pageNum);
        var conf = {
          url: page.contentUrl,
          dataType: 'jsonp',
          jsonp: false,
          jsonpCallback: jsonpCallback
        };
        var failCallback = function () {
          setTimeout(function () {
            console.log('Failed getting url for page ' + page.pageNum + ', trying again...');
            $.ajax(conf).done(updateUrls).fail(failCallback);
          }, 5000)
        };
        $.ajax(conf).done(updateUrls).fail(failCallback);
      }
    });
  }
  var $btn = $('<button>Show All Image URLs (Scribd Downloader Userscript)</button>');
  $btn.addClass('action_button');
  $btn.addClass('flat_btn');
  $btn.css('background', '#8400ff');
  $btn.css('white-space', 'normal');
  $btn.css('height', 'auto');
  $btn.css('line-height', 'inherit');
  $btn.css('padding', '10px 0');
  $btn.click(listAllDocumentImages);
  $('.document_actions').prepend($btn);
});
