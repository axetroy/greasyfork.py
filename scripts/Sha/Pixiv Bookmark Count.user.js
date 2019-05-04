// ==UserScript==
// @name            Pixiv Bookmark Count
// @version         4.0.1
// @include         https://www.pixiv.net/member_illust.php?id=*
// @include         https://www.pixiv.net/member_illust.php?*mode=medium*
// @include         https://www.pixiv.net/bookmark*
// @exclude         https://www.pixiv.net/bookmark.php?id=*
// @exclude         https://www.pixiv.net/bookmark.php?type=*
// @exclude         https://www.pixiv.net/bookmark_add.php?type=illust&illust_id=*
// @grant           GM_xmlhttpRequest
// @namespace       https://greasyfork.org/users/7945
// @description     イラストページ、作者作品一覧ページ、フォロー新着作品ページにて、各イラストのブックマーク数を表示します。『Endless Pixiv Pages』や『AutoPagerize』で継ぎ足されたページにも対応します。
// ==/UserScript==

function bm_xhr(illust_ID, tarobj) {
    GM_xmlhttpRequest({
        url: "https://www.pixiv.net/bookmark_detail.php?" + illust_ID,
        method: "GET",
        onload: function(xhr) {
            if (xhr.responseText.match('bookmark-count')) {
                if (location.href.match('member_illust.php?.*?mode=medium')) document.getElementsByClassName('bookmark-container')[0].insertAdjacentHTML('afterbegin', xhr.responseText.match(/<a href="\/bookmark_detail.php.*?bookmark-count.*?<\/a>/));
                else tarobj.insertAdjacentHTML('beforeend', '<div>' + xhr.responseText.match(/<a href="\/bookmark_detail.php.*?bookmark-count.*?<\/a>/) + '</div>');
            }
        }
    });
}
if (location.href.match('member_illust.php?.*?mode=medium')) {
    if (!document.getElementsByClassName('bookmark-count')[0]) bm_xhr(location.href.match(/illust_id=\d+/));
} else document.body.addEventListener('DOMNodeInserted', function() {
    if (location.href.match('bookmark_new_illust.php')) var tarobj = document.getElementsByClassName('_25taFA4');
    else var tarobj = document.getElementsByClassName('image-item');
    for (var i = 0, l = tarobj.length; i < l; i++) {
        if (!tarobj[i].classList.contains('dummy') && !tarobj[i].getElementsByClassName('bookmark-count')[0]) {
            tarobj[i].classList.add('dummy');
            if (location.href.match('pixiv.net/bookmark') && !location.href.match('bookmark_new_illust.php')) tarobj[i].style.paddingBottom = '20px';
            bm_xhr(tarobj[i].getElementsByTagName('a')[0].href.match(/illust_id=\d+/), tarobj[i]);
        }
    }
}, false);