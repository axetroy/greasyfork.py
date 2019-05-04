// ==UserScript==
// @name        bdwmv2Blacklist
// @namespace   bdwmv2Blacklist
// @description blacklist the links from certain boards in the main page.
// @include     *bbs.pku.edu.cn/v2/home.php
// @version     0.2b
// @grant       none
// ==/UserScript==

var badTopics = [52, 414];

function removeTopicLink(a){var p=a.parentElement; if (p.tagName=="LI") p.parentElement.removeChild(p); else p.removeChild(a)};
function filterTopicLink(a){return badTopics.map(function(a){return "https://bbs.pku.edu.cn/v2/thread.php?bid="+a;}).indexOf(a.href)>=0;}
[].slice.call(document.getElementsByClassName("topic-link")).filter(filterTopicLink).map(removeTopicLink)
