// ==UserScript==
// @name           Pixiv : Misc Edition
// @namespace      pixiv
// @version        1.0.8
// @description    Add an works counter in the profile page + Add the member ID in the profile/works/boookmarks page + Add an IQDB button in the medium illustration page + Add an download button in the medium illustration page + Add preview thumbnails for illustrations in manga mode
// @icon           https://i.imgur.com/PkVWBeZ.png
// @include        https://www.pixiv.net/bookmark.php*
// @include        https://www.pixiv.net/bookmark.php?id=*
// @include        https://www.pixiv.net/member.php?id=*
// @include        https://www.pixiv.net/member_illust.php?id=*
// @include        https://www.pixiv.net/member_illust.php?mode=medium*
// @include        https://www.pixiv.net/member_illust.php?mode=manga*
// @include        https://www.pixiv.net/stacc/*
// @grant          none
// ==/UserScript==

// Pixiv Bookmark Tag Button
var bookmark_box = document.getElementsByClassName('bookmark-tags');
var tag_box = document.getElementsByClassName('user-tags');
var menu = document.getElementsByClassName('column-menu');
var tag = document.createElement('button');
var text_tag_btn = document.createTextNode('TAG');
tag.id = "tag-btn";
if(bookmark_box[0]) {
    tag.appendChild(text_tag_btn);
    menu[0].appendChild(tag);
    var value = false;
    tag.onclick = function() {
        if(value == false) {
            value = true;
            bookmark_box[0].style.display = 'block';
        }
        else if(value == true) {
            value = false;
            bookmark_box[0].style.display = 'none';
        }
    };
}
if(tag_box[0]) {
    tag.appendChild(text_tag_btn);
    menu[0].appendChild(tag);
    var value2 = false;
    tag.onclick = function() {
        if(value2 == false) {
            value2 = true;
            tag_box[0].style.display = 'block';
        }
        else if(value2 == true) {
            value2 = false;
            tag_box[0].style.display = 'none';
        }
    };
}

// Pixiv Member Profile Works Counter
// Pixiv Member Profile Works Counter
window.onload = function() {
    var bookmarks_container = document.getElementsByClassName('bookmarks-illust');
    var response_container = document.getElementsByClassName('works-reponse');
    var works_container = document.getElementsByClassName('works-illust');
    var main = document.getElementsByClassName('worksListOthers');
    function retnum(str) { 
        var num = str.replace(/[^0-9]/g, ''); 
        return num; 
    }
    for(var i=0; i < works_container.length; i++) {
        var more = document.createElement('a');
        more.id = "more_works";
        more.style.color = "#FFF";
        var text_more = works_container[i].getElementsByClassName('_more')[0].getElementsByTagName('a')[0].innerHTML;
        var texte = document.createTextNode('' + retnum(text_more) + ' Works');
        more.appendChild(texte);
        var title = works_container[i].getElementsByClassName('worksListOthersTitle');
        title[0].appendChild(more);
    }
};

// Pixiv IQDB Search + Pixiv Download Illustration + Pixiv Show/Hide Thumbnails
var reaction = document.getElementsByClassName('reaction-container');
var download = document.createElement('div');
download.id = "download-container";
var search = document.createElement('div');
search.id = "search-container";
var picture = document.getElementsByClassName('works_display');
var link_original = picture[0].getElementsByTagName('img')[0].src;
var iqdb = document.createElement('a');
var text_iqdb_btn = document.createTextNode('Iqdb');
iqdb.id = "iqdb-btn";
iqdb.appendChild(text_iqdb_btn);
iqdb.href = "http://iqdb.org/?url=" + link_original;
search.appendChild(iqdb);
var dl = document.createElement('a');
var text_dl_btn = document.createTextNode('Download Illustration');
dl.id = "dl-btn";
dl.href = link_original;
dl.appendChild(text_dl_btn);
download.appendChild(dl);
for(var i=0; i < reaction.length; i++) {
    reaction[i].appendChild(search);
    reaction[i].appendChild(download);
}
if(picture[0].getElementsByTagName('a')[0].className == ' _work multiple ' || picture[0].getElementsByTagName('a')[0].className == ' _work manga multiple ') { 
    var toggle = document.createElement('div');
    toggle.id = "toggle-container";
    var page = document.getElementsByClassName('page-count')[0].getElementsByTagName('span')[0].innerHTML;
    var other = parseInt(page)-1;
    var tog = document.createElement('button');
    tog.id = "tog-btn";
    var text_tog_btn = document.createTextNode('Show ' + other + ' Thumbnail(s)');   
    toggle.appendChild(tog);
    tog.appendChild(text_tog_btn);
    tog.onclick = function() {
        if (preview.style.display !== 'none') {
            preview.style.display = 'none';
            tog.innerHTML = 'Show ' + other + ' Thumbnail(s)';   
        }
        else {
            preview.style.display = 'block';
            tog.innerHTML = 'Hide ' + other + ' Thumbnail(s)';   
        }
    };
    for(var i=0; i < reaction.length; i++) {
       reaction[i].appendChild(toggle);
    }
}

// Pixiv Manga Mode Thumbnails Preview
var display = document.getElementsByClassName('works_display');
var preview = document.createElement('div');
preview.id = "preview_manga";
preview.style.display = "none";
var count = parseInt(page);
for(var i=1; i < count; i++) {
    var link_illustration = document.createElement('a');
    var illustration = document.createElement('img');
    illustration.id = 'preview_manga_illustration_' + i;
    var thumbnail = document.createElement('div');
    thumbnail.id = 'preview_manga_thumbnail_' + i;
    var data = 'p' + i;
    link_illustration.href = link_original.replace('p0',data);
    link_illustration.target = '_blank';
    illustration.src = link_original.replace('p0',data);
    illustration.style.width = '100%';
    illustration.style.marginBottom = '15px';
    link_illustration.appendChild(illustration);
    thumbnail.appendChild(link_illustration);
    preview.appendChild(thumbnail);

}
if(display[0].getElementsByTagName('a')[0].className == ' _work multiple ' || display[0].getElementsByTagName('a')[0].className == ' _work manga multiple ') {
    for(var j=0; j < display.length; j++) {
        display[j].appendChild(preview);
    }
}

