// ==UserScript==
// @name         0Skins Price Ratio IGXE
// @namespace    out
// @version      0.23
// @description  IGXE饰品比例计算脚本
// @supportURL   https://steamcn.com/t384392-1-1
// @icon         https://static.igxe.cn/csgo/img/retinahd_icon.png
// @author       MarinesPanda
// @match        http*://www.igxe.cn/product/*
// @match        http*://www.igxe.cn/product-*
// @match        http*://www.igxe.cn/*
// @require      https://cdn.bootcss.com/jquery/2.2.4/jquery.min.js
// @grant        GM_xmlhttpRequest
// @connect      steamcommunity.com
// ==/UserScript==
(function() {
    $(document).ready(function() {
        $("div.mod-theKeyList a").attr("target", "_blank");
        $("div.mod-theKeyList-bd a").attr("target", "_blank");
        var headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.186 Safari/537.36",
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8"
        };
        //获取游戏ID
        var itemName, gameId = '730',
            itemEnName, itemImage;
        var url = window.location.href;
        var reg = /product\/\d+\//;
        var regRes = url.match(reg);
        if (regRes != null && regRes.length > 0) {
            gameId = regRes[0].replace(/[^0-9]/g, '');
            itemName = encodeURI($($("div.name")[0]).text());
        }

        function getItemEnName(name) {
            GM_xmlhttpRequest({
                method: 'GET',
                headers: headers,
                url: 'https://steamcommunity.com/market/search?q=' + name + '&appid=' + gameId + '#p1_default_desc',
                onload: setItemEnName
            });
        }

        function setItemEnName(e) {
            if (e.responseText != null) {
                var start = e.responseText.indexOf('<div id="searchResultsRows"');
                var end = e.responseText.indexOf('<div id="searchResults_ctn"');
                var contents = e.responseText.substr(start, end);
                $('div.hide>div.noticeDialogCn').after('<div id="tempcontent">' + contents + '</div>');
                var resHashName = document.querySelector('#result_0').getAttribute('data-hash-name');
                var resGameId = document.querySelector('#result_0').getAttribute('data-appid');
                var resImageUrls = document.querySelector('#result_0_image').getAttribute('srcset');
                var resImages = resImageUrls.split(',')[1];
                var resImage = resImages.substr(0, resImages.length - 3);
                if (resGameId == gameId) {
                    itemEnName = encodeURI(resHashName);
                    itemImage = resImage;
                    document.querySelector("#tempcontent").remove();
                    getSteamPriceInfo();
                }
            }
        }

        //获取steam市场最低售价
        function getSteamPriceInfo() {
            GM_xmlhttpRequest({
                method: 'GET',
                headers: headers,
                url: "https://steamcommunity.com/market/priceoverview/?currency=23&appid=" + gameId + "&market_hash_name=" + itemEnName,
                onload: resSteamPriceInfo
            });
        }

        //steam市场价格信息
        function resSteamPriceInfo(e) {
            if (e.responseText != null) {
                var resJsonInfo = JSON.parse(e.responseText);
                if (resJsonInfo.success) {
                    var igxeLowestPrice, igxeTopPrice;
                    igxeLowestPrice = igxeTopPrice = $($("span.dib")[0]).text().replace(/[^0-9.]/ig, '');
                    if (gameId != '730') {
                        //获取IGXE饰品页第一页最低售价
                        igxeLowestPrice = parseFloat($($("span.dib")[0]).text().replace(/[^0-9.]/, ''));
                        //获取IGXE饰品页第一页最高售价
                        igxeTopPrice = parseFloat($($("span.dib")[$("span.dib").length - 1]).text().replace(/[^0-9.]/, ''));
                    }
                    //获取最低价格
                    var steamPrice = parseFloat(resJsonInfo.lowest_price.replace(/[^0-9.]/ig, ''));
                    //税后价格
                    var exTax = parseFloat(steamPrice / 1.15).toFixed(2);
                    //计算最优比例
                    var itemProportion = parseFloat(igxeLowestPrice * 1.15 / steamPrice).toFixed(2);
                    //计算饰品参考比例
                    var refPrice = parseFloat(igxeTopPrice * 1.15 / steamPrice).toFixed(2);
                    //隐藏其他无关内容
                    $("div.proposedPrice").hide();
                    $("div.averagePrice").hide();
                    $("div.stock").hide();
                    $("div.productInfo")[0].setAttribute("style","height:400px");
                    //向页面输出比例
                    if (gameId == '730') {
                        $("div.rarity:first").hide();
                        $("div.name").after('<h1 class="name"><span>当前售价:<strong>' + igxeLowestPrice + '</strong></span></h1>');
                    }
                    $("div.rarity:last").after('<h1 class="name" style="color:#ffff00;line-height:25px;">饰品最优比例：' + itemProportion +
                                       '&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:#ff0000">接口即时价格：' + steamPrice +
                                       '</span><br/>饰品参考比例：' + refPrice +
                                       '&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:#80ff00">税后价格：' + exTax +
                                       '</span><br /><div style="width:124px;height:124px;border-style:dotted;border-color:#ffff00"><img style="width:124px;height:124px" src="' +
                                       itemImage + '"></div><div class="bnts mt-35" style="margin-top:-10px;margin-bottom:10px;"><a class="com-btn com-green" href="https://steamcommunity.com/market/listings/' + gameId + '/' + itemEnName +
                                       '" target="_blank">市场链接</a></div></h1>');
                }
            }
        }

        //执行
        getItemEnName(itemName);
    });
})();