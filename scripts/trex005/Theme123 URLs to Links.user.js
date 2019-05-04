// ==UserScript==
// @name         Theme123 URLs to Links
// @namespace    http://tapy.com
// @version      0.1
// @description  Turns all the non linked URLs to links on Theme123.net
// @author       Travis
// @match        http://theme123.net/*
// @grant        none
// ==/UserScript==
$("code:contains('http')").filter(function(){
    return this.innerHTML.indexOf('http') == 0;
}).each(function(index){
    this.innerHTML = '<a href="' + this.innerHTML + '">' + this.innerHTML + '</a>';
});