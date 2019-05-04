// ==UserScript==
// @name         aex24小时成交统计
// @namespace    http://p2phelper.cn/
// @version      0.1220
// @description  aex24小时成交统计,自动显示
// @author       小天
// @match        www.aex.com
// @grant          GM_addStyle
// @require    http://code.jquery.com/jquery-1.11.0.min.js 
// ==/UserScript==

(function() {
    'use strict';
    GM_addStyle('.rptime { float:left; display:block;width:150px; }');
    
    setTimeout(computesum,2000);
function computesum()
{　
    var allsum = 0;
    $(".coin-list .col-6").each(function(){
allsum += parseFloat($(this).text());
});
$(".sub-nav.container .col-5").text(allsum.toFixed(2));
}
})();