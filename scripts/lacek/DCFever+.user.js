// ==UserScript==
// @name         DCFever+
// @namespace    http://www.dcfever.com/
// @version      1.4
// @description	 Enhancement for trading forum in DCFever.
// @author       lacek
// @match        http*://www.dcfever.com/trading/listing.php*
// @grant        none
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// ==/UserScript==
/* jshint -W097 */
'use strict';

(function ($) {
  var queryParams = function (url) {
    var qs = url.substring(url.indexOf('?') + 1).split('&');
    var result = {};
    for (var i = 0; i < qs.length; i++) {
      qs[i] = qs[i].split('=');
      result[qs[i][0]] = decodeURIComponent(qs[i][1]);
    }
    return result;
  };

  // prosecution shortcut
  var types = [
    {
      reason: 'miscategorized',
      content: 'wront type',
      label: '錯'
    },
    {
      reason: 'spam',
      content: 'advertisement',
      label: '廣'
    },
    {
      reason: 'offensive',
      content: 'repeated post',
      label: '重'
    }
  ];
  $('.trade_listing tr').each(function (index, tr) {
    var $tr = $(tr);
    var $link = $tr.find('td:nth-child(3) > a.tlist_title');
    if (!$link.length) {
      return;
    }
    var $container = $(tr).find('td:nth-child(2)');
    $.each(types, function(index, type) {
      var $button = $('<div><a href="#">' + type.label + '</a></div>');
      $button.click(function (e) {
        e.preventDefault();
        $.get($link.attr('href')).done(function (data) {
          var html = $.parseHTML(data);
          var $reportLink = $(html).filter('#main_wrapper').find('.trade_function > a:last');
          if (!$reportLink.length) {
            return;
          }
          var partial = $reportLink.attr('href');
          var params = queryParams(partial);
          params.form_action = 'prosecuteaction';
          params.submit = '確定檢舉';
          params.reason = type.reason;
          params.content = type.content;
          $.post('prosecute.php', params).done(function() {
            $button.remove();
          });
        });
      });
      $container.append($button);
    });
  });

  // keyboard navigation
  var $pagination = $('.pagination');
  var $currentPage = $pagination.find('.current_page');
  $(document).keyup(function(e) {
    if (e.keyCode === 37 && !$currentPage.is(':first-child')) { // left
      location.href = $currentPage.prev().attr('href');
    } else if (e.keyCode === 39 && !$currentPage.is(':last-child')) { // right
      location.href = $currentPage.next().attr('href');
    }
  });

  // retain order and type
  var params = queryParams(location.href);
  var queryString = '';
  if (params.order) {
    queryString += '&order=' + params.order;
  }
  if (params.type) {
    queryString += '&type=' + params.type;
  }
  if (queryString.length > 0) {
    $('.catnav a').each(function(i, e) {
      var $e = $(e);
      var url = $e.attr('href');
      $e.attr('href', url + queryString);
    });
  }
}) (window.jQuery);
