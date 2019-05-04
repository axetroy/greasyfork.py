// ==UserScript==
// @name         天使动漫打工
// @namespace    https://uvwvu.xyz
// @version      1.6
// @description  自动打工，可以配合  <天使动漫打工签到集合版>  共同使用
// @author       AurevoirXavier
// @match        https://www.tsdm.love/plugin.php?id=np_cliworkdz:work
// @grant        none
// @run-at       document-end
// ==/UserScript==

jQuery(document).ready(function($){
    setTimeout(function(){$('#advids div:eq(0) a').click();}, 300);
    setTimeout(function(){$('#advids div:eq(1) a').click();}, 600);
    setTimeout(function(){$('#advids div:eq(2) a').click();}, 900);
    setTimeout(function(){$('#advids div:eq(3) a').click();}, 1200);
    setTimeout(function(){$('#advids div:eq(4) a').click();}, 1500);
    setTimeout(function(){$('#advids div:eq(5) a').click();}, 1800);

    setTimeout(function(){$('#stopad a').click();}, 2000);
});