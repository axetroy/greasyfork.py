// ==UserScript==
// @name          Always allow text to speach
// @description   Adds the option to use your mic to all text input box in Chrome
// @version 0.0.1.20140525024108
// @namespace https://greasyfork.org/users/2178
// ==/UserScript==
//document.evaluate("//input[@x-webkit-speech='null'][@type='text']",document,null,6,null).snapshotLength
var eles=document.evaluate("//input[@type='text']",document,null,6,null),ele;
for(var i=eles.snapshotLength-1;i>-1;i--){
	ele=eles.snapshotItem(i);
	if(ele.getAttribute('x-webkit-speech')==null)
		ele.setAttribute('x-webkit-speech','');
}
