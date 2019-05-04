// ==UserScript==
// @name           Show or Hide Your Password on Mouse Events
// @description    Show password on double click, hides it when mouse leaves the password field (based on userscripts.org/scripts/show/34184 )
// @include        *
// @version 0.0.1.20140525024114
// @namespace https://greasyfork.org/users/2178
// ==/UserScript==
var is=document.evaluate('//input[@type="password"]',document,null,6,null),l=is.snapshotLength;
  for(i=0;i<l;i++) {
   with(is.snapshotItem(i))
      {
        addEventListener('dblclick',function(){this.type='text'}, false);
        addEventListener('mouseout',function(){this.type='password'}, false);
      }
  }