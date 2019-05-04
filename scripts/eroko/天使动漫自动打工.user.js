// ==UserScript==
// @name        天使动漫自动打工
// @author      eroko
// @description 天使动漫自动打工脚本 参考了gfork的代码，主要是适配新的.love域名。
// @include     *://www.tsdm.net/plugin.php?id=np_cliworkdz:work*
// @include     *://www.tsdm.me/plugin.php?id=np_cliworkdz:work*
// @include     *://www.tsdm.tw/plugin.php?id=np_cliworkdz:work*
// @include     *://www.tsdm.me/forum.php?mod=viewthread&tid=321479
// @include     *://www.tsdm.tw/forum.php?mod=viewthread&tid=321479
// @include     *://www.tsdm.love/plugin.php?id=np_cliworkdz:work*
// @include     *://www.tsdm.love/forum.php?mod=viewthread&tid=321479
// @version     4.4
// @grant       none
// @run-at      document-end
// @license     GPL version 3
// @namespace https://greasyfork.org/users/170904
// ==/UserScript==

var url=window.location.href;
if(url.match("tid=321479"))
window.location.href='plugin.php?id=np_cliworkdz:work';

jQuery(document).ready(function($){
//   setTimeout(function(){$('#advids').children().children().trigger("click");}, 100);
     setTimeout(function(){$('#np_advid1').children().trigger("click");},300);
     setTimeout(function(){$('#np_advid2').children().trigger("click");},600);
     setTimeout(function(){$('#np_advid4').children().trigger("click");},900);
     setTimeout(function(){$('#np_advid6').children().trigger("click");},1200);
     setTimeout(function(){$('#np_advid7').children().trigger("click");},1500);
     setTimeout(function(){$('#np_advid9').children().trigger("click");},1800);
//    document.getcre.submit();
    setTimeout(function(){document.getcre.submit();},2500);
//    setTimeout(function(){$('#stopad').children().trigger("click");},2000);
});