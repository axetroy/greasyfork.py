// ==UserScript==
// @name     GDC - hide commercial content
// @author   monnef
// @description no description
// @version  1
// @grant    none
// @include  https://www.gdcvault.com/*
// @require  https://cdn.jsdelivr.net/npm/jquery@3.3.1/dist/jquery.min.js
// @namespace monnef
// ==/UserScript==

$(() => {
  const process = () =>
	  $('.media_items img.members').each((i, e) => {
  	  const el = $(e);
    	el.closest('li').css('display', 'none');
	  });
  setInterval(process, 1000);
});
