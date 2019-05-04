// ==UserScript==
// @name         bypassbalabala
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  跳过知识产权局废话
// @author       peasshoter
// @match        http://cpservice.sipo.gov.cn/home/toDisclaimer.action
// @match        http://cpquery.sipo.gov.cn/txnDisclaimerDetail.do?*
// @require      https://cdn.bootcss.com/jquery/3.1.1/jquery.min.js
// @grant        none
// ==/UserScript==

if (location.hostname === 'cpservice.sipo.gov.cn') {
    window.location.href="http://cpservice.sipo.gov.cn/dzsq/business.jsp?witchPage=2";
}
if (location.hostname === 'cpquery.sipo.gov.cn') {
    $('#agreeid').attr("checked","checked");
    $('#disagreeid').removeAttr("checked");
    $('#goBtn').removeAttr("disabled");
    $('#goBtn').click();
}