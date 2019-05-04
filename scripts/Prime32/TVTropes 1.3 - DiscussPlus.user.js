// ==UserScript==
// @name        TVTropes 1.3 - DiscussPlus
// @namespace   TVTropes 1.3 Plus
// @description Modifies the "Discussion" link to include the number of topics on the Discussion page
// @include     http://tvtropes.org/pmwiki/pmwiki.php/*
// @include     https://tvtropes.org/pmwiki/pmwiki.php/*
// @version     1
// @grant       none
// ==/UserScript==

$discussionLink = $('.link-discussion > a');
if ($discussionLink.length > 0) {
  $.get(
    $discussionLink.first().attr('href'),
    '',
    function(data, textStatus, jqXHR) {
      var numDiscussions = $($.parseHTML(data)).find('#content_holder > .titlebar').length;
      $discussionLink.append(' (' + numDiscussions + ')');
    },
    'html'
  );
}