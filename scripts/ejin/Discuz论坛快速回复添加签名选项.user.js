// ==UserScript==
// @name        Discuz论坛快速回复添加签名选项
// @description 支持任意网站的Discuz论坛，没有签名实在是太难受了
// @namespace   5d53275bd82117e0173b77ee509df360
// @include     */thread*.html
// @include     */forum.php*mod=viewthread*
// @include     */viewthread.php*
// @version     2013.09.08
// ==/UserScript==

if (document.getElementById("fastpostsubmit") && !document.getElementById("usesig")) {
    document.getElementById("fastpostsubmit").parentNode.innerHTML+="<input type='checkbox' id='usesig' name='usesig' checked='checked' value='1'><label for='usesig'>签名档</label>"
}