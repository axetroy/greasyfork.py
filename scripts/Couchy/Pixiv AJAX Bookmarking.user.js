// ==UserScript==
// @name           Pixiv AJAX Bookmarking
// @namespace      Couchy
// @description    Allows bookmarking images on Pixiv without leaving the image page.
// @match          http://www.pixiv.net/member_illust.php?mode=medium&illust_id=*
// @match          http://www.pixiv.net/member_illust.php?mode=manga&illust_id=*
// @version        20150418
// @grant          none
// ==/UserScript==

var alwaysPrivate = false;

var listener = function(e){
	e.preventDefault();
    e.target.textContent = "Adding...";
    var get = new XMLHttpRequest();
    get.open("GET", e.target.getAttribute("href"), true);
    get.onload = function(){
        var id = get.responseText.match(/<input type="hidden" name="id" value="(.*?)">/)[1];
        var tt = get.responseText.match(/<input type="hidden" name="tt" value="(.*?)">/)[1];
        var tagData = get.responseText.match(/<span class="tag c6.*?" data-tag=".*?">/g);
        var tags = (tagData !== null) ? tagData.map(function(x){return x.match(/data-tag="(.*?)">/)[1];}) : [];
        var restrict = (alwaysPrivate || (tags.indexOf("R-18") !== -1)) ? "1" : "0";
        var post = new XMLHttpRequest();
        post.open("POST", "http://www.pixiv.net/bookmark_add.php", true);
        post.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        post.onload = function(){
            e.target.textContent = "Edit Bookmark";
            e.target.removeEventListener("click", listener, false);
        };
        post.send("type=illust&id=" + id + "&tt=" + tt + "&restrict=" + restrict + "&comment=&mode=add&from_sid=&submit=&tag=" + tags.join(" "));
    };
    get.send();
};

document.getElementsByClassName("bookmark-container")[0].firstElementChild.addEventListener("click", listener, false);