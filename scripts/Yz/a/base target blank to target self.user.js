// ==UserScript==
// @name          a/base target blank to target self
// @author        Richard Pratt
// @version       1.02
// @include       *
// @namespace     *
// @description   changes a and base target="_blank" to target="_self"
// @grant         none
// Based on earlier script by sameagain
// ==/UserScript==
var a=document.getElementsByTagName('a'),
base=document.getElementsByTagName('base');
for (i=0;i<base.length;i++)
 if (base[i].getAttribute('target')=='_blank')
  base[i].setAttribute('target','_self');
for (i=0;i<a.length;i++)
 if (a[i].getAttribute('target')=='_blank')
  a[i].setAttribute('target','_self');