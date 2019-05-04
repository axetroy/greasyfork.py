// ==UserScript==
// @name         聚划算辅助完善卖点信息
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  聚划算自动完善卖点信息
// @author       kinrt
// @match        *://sale.tmall.com/apply/item.htm?juId=*
// @grant        none
// ==/UserScript==

(function() {
    document.querySelector("#MIFeatures-1").value = "满额送手串"
    document.querySelector("#MIFeatures-2").value = "高密高油"
    document.querySelector("#MIFeatures-3").value = "购物0风险"
    document.querySelector("#MIFeatures-long1").value = "精美赠品"
    document.querySelector("#MIFeatures-long2").value = "颗颗沉水"
    document.querySelector("#MIFeatures-long3").value = "15天无理由包邮退换货"
    document.querySelector("#MIFeatures-hot").value = "领券满299元减30元"

})();