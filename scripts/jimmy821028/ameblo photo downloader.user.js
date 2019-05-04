// ==UserScript==
// @author   JimmyJin
// @name     ameblo photo downloader
// @version  1.00
// @include       https://ameblo.jp*
// @description It will show a "Download Image" link that can be clicked to download the current photo on ameblo album.
// @namespace https://greasyfork.org/users/241557
// ==/UserScript==

javascript:(function() { 
   function create(){
      var d = document.getElementById("d");
      if (d != null) d.remove();
      var url = document.getElementsByTagName('img')[0].src;
      var link = document.getElementById('entryDate');
      var a =document.createElement('a');
      var text =document.createTextNode('Download Image');
      a.appendChild(text);
      a.setAttribute('href', url);
      a.setAttribute('target', '_blank');
      a.id = 'd';
      a.style.fontSize = '24px';
      link.after(a);
   }
  window.setInterval(create,500); 
})()
