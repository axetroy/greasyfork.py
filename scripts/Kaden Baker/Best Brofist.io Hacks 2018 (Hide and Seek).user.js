
// ==UserScript==
// @name        Best Brofist.io Hacks 2018 (Hide and Seek)
// @namespace   Best Brofist.io Hacks 2018 (Hide and Seek)
// @include     http://brofist.io/modes/hideAndSeek/c/index.html
// @version     1.6
// @description NOT WORKING! Will update ASAP.
// @grant       none
// ==/UserScript==
var oldName = client.name;
var oldSkin = client.skin;
document.onkeydown = function(event){
    if (event.keyCode == 49)
client.start();
    if (event.keyCode == 50)
client.avatar="ghost;"
};
