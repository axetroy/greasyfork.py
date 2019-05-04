// ==UserScript==
// @name         批量百度直链
// @namespace    baidulinkbatch
// @version      0.3
// @description  try to take over the world!
// @author       You
// @include      http://v2.huangguofeng.com/baidu_pcs/file_manage.php*
// @grant        none
// ==/UserScript==

var href = window.location.host;

href = 1;

if (href==1) {
    setTimeout(function() { 
        var snapResults = document.evaluate("/html/body/div[1]/div[2]/table/tbody/tr[*]/td[1]/a",document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
        console.log(snapResults.snapshotLength);
        for (var i = snapResults.snapshotLength - 1; i >= 0; i--) {
            var elm = snapResults.snapshotItem(i);
            elm.href = decodeURIComponent(elm.title);
        }
    }, 60);
}