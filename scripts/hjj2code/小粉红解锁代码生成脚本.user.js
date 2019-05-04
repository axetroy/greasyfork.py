// ==UserScript==
// @name        小粉红解锁代码生成脚本
// @namespace   bbs.jjwxc.net
// @description 仅适用于noframes锁帖法。进入被锁帖后自动生成解锁代码，复制后用&page=99大法回帖。生成结果依浏览器可能有不同，不保证对所有浏览器都有效，可尝试用不同浏览器生成后再次回帖。对已解锁贴有误伤，不解锁时最好禁用
// @include     http://bbs.jjwxc.net/showmsg.php*
// @version     1.2
// @grant       none
// ==/UserScript==
var body = document.getElementsByTagName("body")[0];
var noframesArr = document.getElementsByTagName("noframes");
var tagStr = "";
if(noframesArr.length>0)
{
    var last = noframesArr[noframesArr.length-1];
    while (last != null && last != body) {
            tagStr = tagStr + "</" + last.tagName + ">";
            last = last.parentElement;
        }
}
if (tagStr.length > 0)
    prompt("please copy：", tagStr);