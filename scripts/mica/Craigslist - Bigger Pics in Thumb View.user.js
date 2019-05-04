// ==UserScript==
// @name         Craigslist - Bigger Pics in Thumb View 
// @description  Higher resolution thumbnails and hover preview when browsing Craigslist in "thumb" mode 
// @version      0.4
// @author       mica
// @namespace    greasyfork.org/users/12559
// @match        *://*.craigslist.org/d/*
// @match        *://*.craigslist.org/search/*
// ==/UserScript==

if ($('body').hasClass('pic')) {
$('head').append(`
<style>
img.thumb {
    height: auto !important;
    width: auto !important;
    max-height: 200px;
    max-width: 300px;
}
p.result-info {
    margin: 60px 0 60px 310px !important;
}
li.result-row {
    max-height: 200px !important;
    border-top: 1px solid #ddd;
    border-left: 1px solid #ddd;
    padding: 0;
}
li.result-row:nth-child(odd) {
    background-color: #eee;
}
a.result-image {
    height: auto !important;
    width: auto !important;
    margin: 0;
}
#floater {
    overflow: visible;
    border: none;
    box-shadow: none;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
}
#floater > img.payload {
    margin: -150px 0;
    box-shadow: 3px 3px 6px 0 #999;
    border-radius: 3px;
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
}
#floater > img.loading {
    margin: -100px;
}
</style>
`); 
$('img.thumb').attr('src', function(i, val) {
    return val.replace('50x50c', '300x300')
});
$('a.result-image').hover(function() {
    $('#floater > img.payload').attr('src', $('> img.thumb', this).attr('src').replace('300x300', '600x450'))
    }, function() { $("#floater").hide();
});
}
