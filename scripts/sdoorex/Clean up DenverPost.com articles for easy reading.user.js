// ==UserScript==
// @name		Clean up DenverPost.com articles for easy reading
// @namespace	http://ingvaldphotography.com/
// @version		0.1
// @description	Cleans up Denver Post Articles to removal all but article, image, and comments.  Also widens remaining contents to 90% of screen width.
// @match		http://*.denverpost.com/*/ci_*
// @include		http://*.denverpost.com/*/ci_*
// @copyright	2014+, Rexford Carl Haugen
// ==/UserScript==
var elem1 = document.getElementById("commentsGroundRules");
var elem2 = document.getElementById("footer");
var elem3 = document.getElementById("articleByline");
var elem4 = document.getElementById("article-top");
var elem5 = document.getElementById("outerRightRegion");
var elem6 = document.getElementById("shareBarWrapper");
var elem7 = document.getElementById("the-most-popular");
var p1 = document.getElementsByClassName('commentingNotice');
var p2 = document.getElementsByClassName('footerRegion');
var p3 = document.getElementsByClassName('articleOptions');
var p4 = document.getElementsByClassName('headerRegion');
var p5 = document.getElementsByClassName('articlePosition2');
var p6 = document.getElementsByClassName('packagesGrpBox');
window.addEventListener('load', function() {
if (elem1) {
    elem1.parentNode.removeChild(elem1); // Removes elem1
}
if (elem2) {
    elem2.parentNode.removeChild(elem2); // Removes elem2
}
if (elem3) {
    elem3.parentNode.removeChild(elem3); // Removes elem3
}
if (elem4) {
    elem4.parentNode.removeChild(elem4); // Removes elem4
}
if (elem5) {
    elem5.parentNode.removeChild(elem5); // Removes elem5
}
if (elem6) {
    elem6.parentNode.removeChild(elem6); // Removes elem6
}
if (elem7) {
    elem7.parentNode.removeChild(elem7); // Removes elem7
}
for (var i1=p1.length; --i1>=0;) {
    p1[i1].parentNode.removeChild(p1[i1]);
}
for (var i2=p2.length;--i2>=0;) {
    p2[i2].parentNode.removeChild(p2[i2]);
}
for (var i3=p3.length;--i3>=0;) {
    p3[i3].parentNode.removeChild(p3[i3]);
}
for (var i4=p4.length;--i4>=0;) {
    p4[i4].parentNode.removeChild(p4[i4]);
}
for (var i5=p5.length;--i5>=0;) {
    p5[i5].parentNode.removeChild(p5[i5]);
}
for (var i6=p6.length;--i6>=0;) {
    p6[i6].parentNode.removeChild(p6[i6]);
}
function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}
addGlobalStyle ('div#outerOuterRegion { width: 90% ! important; }');
addGlobalStyle ('div#outerLeftRegion { width: 100% ! important; }');
addGlobalStyle ('div#region2and3box { width: 100% ! important; }');
addGlobalStyle ('div#region3 { width: 100% ! important; }');
addGlobalStyle ('div.articleImageBox { width: 100% ! important;}');
}, false);