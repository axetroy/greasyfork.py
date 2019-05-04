// ==UserScript== 
// @name Block TrackBot
// @namespace http://www.letsrun.com
// @description Hides all posts from LetsRun.com's TrackBot
// @include * 
// @version 1.1
// ==/UserScript==  

var authors = document.getElementsByClassName('author');

if (authors.length > 0) {
  for (i = 0; i < authors.length; i++) {
    reg = authors[i].getElementsByTagName('strong')
    if (reg.length > 0) {
      regname = reg[0].innerHTML;
      if (regname == 'TrackBot') {
        child = authors[i].parentElement.parentElement;
        child.parentElement.removeChild(child);
      }
    }
  }
}