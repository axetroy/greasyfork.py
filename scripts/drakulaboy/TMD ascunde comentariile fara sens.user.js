// ==UserScript==
// @name        TMD ascunde comentariile fara sens
// @description ascunde comentariile fara sens de pe TMD
// @include     *torrentsmd.*/forum*
// @version     2.0
// @icon         http://i.imgur.com/uShqmkR.png
// @require     http://code.jquery.com/jquery-1.10.2.js
// @namespace https://greasyfork.org/users/213
// ==/UserScript==

$(document).ready(function () {
    var exclude = ['не читайте это пожалуйста'];
    exclude.forEach(function(i){
        $('#forumPosts tr:contains(' + i + ')').hide();
    });
});
$(document).ready(function () {
    var exclude = ['не читайте это пожалуйста'];
    exclude.forEach(function(i){
        $('td.text:contains(' + i + ')').hide();
    });
});