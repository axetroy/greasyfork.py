// ==UserScript==
// @name           Pixiv : Bigger Scroll Thumbnails
// @description    Resize the scroll thumbnails (ie the thumbnails in the home/profile/bookmarks/search/member:illustration,profile,bookmarks,medium/etc)
// @version        1.0.5
// @icon           https://i.imgur.com/PkVWBeZ.png
// @include        https://www.pixiv.net/
// @include        https://www.pixiv.net/bookmark.php*
// @include        https://www.pixiv.net/bookmark.php?id=*
// @include        https://www.pixiv.net/bookmark_add.php*
// @include        https://www.pixiv.net/bookmark_new_illust.php?*
// @include        https://www.pixiv.net/bookmark_detail.php*
// @include        https://www.pixiv.net/discovery*
// @include        https://www.pixiv.net/member.php?id=* 
// @include        https://www.pixiv.net/member_illust.php?id=*
// @include        https://www.pixiv.net/member_illust.php?mode=medium*
// @include        https://www.pixiv.net/member_illust.php?type=*
// @include        https://www.pixiv.net/new_illust.php*
// @include        https://www.pixiv.net/ranking.php*
// @include        https://www.pixiv.net/ranking_area.php?type=*
// @include        https://www.pixiv.net/search.php?*
// @grant          none
// @namespace https://greasyfork.org/scripts/5480-pixiv-expand-thumbnails/
// ==/UserScript==

var avatar = document.getElementsByClassName('_user-icon');
var bookmark = document.getElementsByClassName('ui-scroll-view');
var border = document.getElementsByClassName('work');
var container = document.getElementsByClassName('image-item'); 
var multiple = document.getElementsByClassName('_work multiple');
var original = document.getElementsByClassName('_layout-thumbnail');
var thumb = document.getElementsByClassName('_thumbnail ui-scroll-view');
for (var i=0; i < avatar.length; i++) {
    avatar[0].style.backgroundImage = avatar[0].style.backgroundImage.replace('_50.','_170.');
}
for(var i=0; i < thumb.length; i++) {  
    thumb[i].src = thumb[i].src.replace('150x150','600x600');
    thumb[i].dataset.src = thumb[i].dataset.src.replace('150x150','600x600');  
    container[i].style.height = border[i].style.height = thumb[i].style.height = '300px';
    container[i].style.width = border[i].style.width = thumb[i].style.width = 'auto';   
}
for(var i=0; i < original.length; i++) {
   if(original[i].className == '_layout-thumbnail') {
        original[0].getElementsByTagName('img')[0].src = original[0].getElementsByTagName('img')[0].src.replace('c/600x600/','');
        original[0].getElementsByTagName('img')[0].src = original[0].getElementsByTagName('img')[0].src.replace('150x150','600x600');
        multiple[0].style.width = original[0].style.width = original[0].getElementsByTagName('img')[0].style.width = 'inherit';
   }
   if(original[i].className == '_layout-thumbnail ui-modal-trigger') {
        original[0].getElementsByTagName('img')[0].src = original[0].getElementsByTagName('img')[0].src.replace('c/600x600/img-master','img-original');
        original[0].getElementsByTagName('img')[0].src = original[0].getElementsByTagName('img')[0].src.replace('_master1200','');
        original[0].style.width = original[0].getElementsByTagName('img')[0].style.width = 'inherit';
        function checkIfExists(src) {
             var img = new Image();
             img.onerror = function() {
                  original[0].getElementsByTagName('img')[0].src = original[0].getElementsByTagName('img')[0].src.replace('jpg','png');
             };
             img.src = src; 
        }
        checkIfExists(original[0].getElementsByTagName('img')[0].src);
   }
}
for(var i=0; i < bookmark.length; i++) {
    bookmark[i].src = bookmark[i].src.replace('150x150','600x600');
    bookmark[i].dataset.src = bookmark[i].dataset.src.replace('150x150','600x600');
    container[i].style.height = border[i].style.height = bookmark[i].style.height = '300px';
    container[i].style.width = border[i].style.width = bookmark[i].style.width = 'auto';   
    original[i].style.height = 'inherit';
}    