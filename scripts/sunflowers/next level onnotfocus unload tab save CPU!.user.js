// ==UserScript==
// @name        next level onnotfocus unload tab save CPU!
// @namespace   next level onnotfocus unload tab save CPU!
// @description An addition for this script: https://greasyfork.org/en/scripts/6359-onnotfocus-unload-tab-and-save-cpu// @include     *
// @version     1
// @grant       none
// ==/UserScript==
 
document.addEventListener("visibilitychange", function() {
if (document.visibilityState == "hidden") {
  console.log("unloaded")
  //embed
for (var i = 0; i < document.getElementsByTagName("embed").length; i++) {
document.getElementsByTagName("embed")[i].setAttribute("data-src", document.getElementsByTagName("embed")[i].src);
  document.getElementsByTagName("embed")[i].setAttribute("src", "");
}
  //iframe
  for (var i = 0; i < document.getElementsByTagName("iframe").length; i++) {
document.getElementsByTagName("iframe")[i].setAttribute("data-src", document.getElementsByTagName("iframe")[i].src);
  document.getElementsByTagName("iframe")[i].setAttribute("src", "");
}
//object
for (var i = 0; i < document.getElementsByTagName("object").length; i++) {
document.getElementsByTagName("object")[i].outerHTML.replace(/object/gi, "objerk");
}
}
else
{
  console.log("loaded")
  //embed
for (var i = 0; i < document.getElementsByTagName("embed").length; i++) {
  document.getElementsByTagName("embed")[i].setAttribute("src", document.getElementsByTagName("embed")[i].getAttribute("data-src"));
}
  //iframe
for (var i = 0; i < document.getElementsByTagName("iframe").length; i++) {
  document.getElementsByTagName("iframe")[i].setAttribute("src", document.getElementsByTagName("iframe")[i].getAttribute("data-src"));
}
//object
for (var i = 0; i < document.getElementsByTagName("objerk").length; i++) {
document.getElementsByTagName("objerk")[i].outerHTML.replace(/objerk/gi, "object");
}
}
});