// ==UserScript==
// @name        Post Message Button below Preview on GameFAQs
// @namespace   gamefaqs.com
// @description Post Message Button
// @include     http://www.gamefaqs.com/boards/post?*
// @version     1
// @grant       none
// ==/UserScript==

if(document.getElementsByClassName('author')[0])
{
    document.getElementsByClassName("span12")[0].innerHTML+='<br /><input class="btn btn_primary" type="button" name="post" value="Post New Message" onclick="document.getElementsByClassName(\'btn_primary\')[1].click();" />';
}
