// ==UserScript==
// @id             1033369
// @name           YouTube Thumbnail Retriever
// @version        1
// @namespace      YTTR10fd
// @author         10fd3nd3rm3n
// @description    Created for anyone who wants the URL of a YouTube video and doesn't want to work for it.
// @include        https://www.youtube.com/*
// @run-at         document-end
// ==/UserScript==
try {
  var thumbnailurl = document.getElementsByTagName('META') [6];
  var win = window.open(thumbnailurl.content, '_blank');
} catch (e)
{
}