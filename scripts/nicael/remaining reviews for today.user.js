// ==UserScript==
// @name         remaining reviews for today
// @version      1.0
// @description  Shows the number of reviews remaining for today
// @author       nicael
// @include        *://*.stackexchange.com/review/*
// @include        *://*stackoverflow.com/review/*
// @include        *://*serverfault.com/review/*
// @include        *://*superuser.com/review/*
// @include        *://*askubuntu.com/review/*
// @include        *://*stackapps.com/review/*
// @grant        none
// @namespace https://greasyfork.org/users/9713
// ==/UserScript==



setInterval(function(){if ($("stu").length === 0) {
    $("#badge-progress-count").prepend("<tmp style='display:none'></tmp><stu>...</stu> left today | ");
}
var sz = 0;$("tmp").load(location.href.replace(location.href.split("/")[5], "") + "/stats .review-stats-count:first", function () {
    sz = parseInt($("tmp > a").text().replace(/,/, ""));
    sz = sz > 1000 ? 40 : 20;
    $("tmp").remove();
    $("stu").load(location.href.replace(location.href.split("/")[5], "") + "/stats .review-stats-count-current-user:first", function() {
        $("stu > td").removeClass("review-stats-count-current-user");
        $("stu > td").css({
            "display": "inline"
        });
        $("stu").text((sz - parseInt($("stu").text())).toString());
    });
});},1000);