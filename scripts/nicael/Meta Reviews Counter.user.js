// ==UserScript==
// @name         Meta Reviews Counter
// @version      1.0
// @description  Adds an the number of meta reviews left from the name of this queue
// @author       nicael
// @include        *://*.stackexchange.com/review
// @include        *://*stackoverflow.com/review
// @include        *://*serverfault.com/review
// @include        *://*superuser.com/review
// @include        *://*askubuntu.com/review
// @include        *://*stackapps.com/review
// @include        *://*mathoverflow.net/review
// @exclude        *://meta.stackexchange.com/review
// @grant        none
// @namespace    https://greasyfork.org/users/9713
// ==/UserScript==
$(".dashboard-count:last").addClass("mrq")
$(".mrq").load("http://meta."+location.href.split("/")[2]+"/review .dashboard-num",function(){
    var mrc=0;
    $(".mrq > .dashboard-num").each(function(){
        mrc+=parseInt($(this).text());
    })
    $(".mrq").html('<div class="dashboard-num">'+mrc+'</div><div class="dashboard-unit">items</div>')
})