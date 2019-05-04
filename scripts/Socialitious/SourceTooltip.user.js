// ==UserScript==
// @version 0.3
// @name SourceTooltip
// @description You can see any element's tag name by moving mouse over element
// @namespace https://greasyfork.org/users/28433
// ==/UserScript==

var all = document.getElementsByTagName("*");

for(var i = 0;i < all.length;i++){
    var title = "";
    title += all[i].title + "\n";
    title += all[i].tagName;
    title += ", " + all[i].id;
    title += ", " + all[i].className;
    if(all[i].title == ""
    && all[i].tagName.toLowerCase() != "style"
    && all[i].tagName.toLowerCase() != "script")
         all[i].title = title;
}
