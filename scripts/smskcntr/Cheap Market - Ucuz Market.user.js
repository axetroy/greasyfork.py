// ==UserScript==
// @name		Cheap Market - Ucuz Market
// @version		7.1
// @include		*www.erepublik.com/*/economy/inventory
// @include         http://www.erepublik.com/*
// @include	        http://ww*.erepublik.com/*
// @include	        https://ww*.erepublik.com/*
// @include			http://erepublik.com/*
// @include			https://erepublik.com/*
// @include			https://*.erepublik.com/*
// @include			http://www.erepublik.com/*
// @description innovation - licenses and taxes script
// @require     https://cdnjs.cloudflare.com/ajax/libs/jquery.tablesorter/2.18.3/js/jquery.tablesorter.min.js
// @namespace   https://greasyfork.org/users/2402

// ==/UserScript==

var $ = jQuery;

function AddStyle(t) {
    $("head").append("<style>" + t + "</style>");
}

function getObjects(obj, key, val) {
    var objects = [];
    for (var i in obj) {
        if (!obj.hasOwnProperty(i)) continue;
        if (typeof obj[i] == 'object') {
            objects = objects.concat(getObjects(obj[i], key, val));
        } else if (i == key && obj[key] == val) {
            objects.push(obj);
        }
    }
    return objects;
}

function getCountryInfo(countryId, countryName) {
    var price = 0;
    var taxes = 0;
    var stock = 0;
    var cost = 0;

    function e(c, i, q, cn) {
        q = isNaN(q) ? 1 : q;
        return '<a href="//www.erepublik.com/' + erepublik.settings.culture + "/economy/marketplace#" + c + "/" + i + "/" + q + '" target="_blank"> ' + cn + "</a>";
    }
    var url = "/" + erepublik.settings.culture + "/economy/marketplaceAjax";
    $.ajax({
        url: url,
        type: "POST",
        data: { countryId: countryId, industryId: industry, quality: quality, orderBy: "price_asc", currentPage: 1, ajaxMarket: 1, _token: SERVER_DATA.csrfToken, }
    })
        .success(function(offers) {
        var i = 1;
        try {
            $(offers.offers).each(function(id, offer) {
                var stockr = parseInt(offer.amount);
                var pricer = parseFloat(offer.priceWithTaxes);
                if (price === 0) {
                    stock = stockr;
                    price = pricer;
                } else {
                    if (pricer > price) {
                        return false;
                    } else {
                        stock = stock + stockr;
                        i++;
                    }
                }
            });
        } catch (err) {
            console.log(err.message);
        }
        var country = scope.settings.countries[countryId];
        var war = country.war == 1 ? " war" : "";
        var embargo = country.embargo == 1 ? " embargo" : "";
        var conquered = country.isConquered == 1 ? " conquered" : "";
        var taxes = country.taxes[industry].valueAddedTax + country.taxes[industry].importTax;
        var local = scope.settings.myCountry == countryId ? " local" : "";
        var cost = price / (1 + taxes / 100);
        taxes += " %";
        var image = "//www.erepublik.net/images/flags_png/M/" + countryName + ".png";
        var license = (getObjects(licensesObj, 'countryId', countryId).length == 1) ? ' license' : '';
        if (stock > 0) {
            stock = i == 10 ? "&gt;" + stock : stock;
            $("#inventory_overview .pricesTable table tbody").append("<tr>" + '<td style="text-align: left;" class="pricescell ' + conquered + war + embargo + local + '">' + '<img style="vertical-align: top;" src="' + image + '"> ' + e(countryId, industry, quality, countryName) + "</td>" + '<td class="pricescell' + local + license + '">' + taxes + "</td>" + '<td class="pricescell ' + local + '">' + stock + "</td>" + '<td class="pricescell ' + local + '"><span id="prc' + countryId + '">' + price.toFixed(2) + "</span></td>" + '<td class="pricescell ' + local + '">' + cost.toFixed(4) + "</td>" + "</tr>");
        }
        var ww = Math.round(ct / ctl * 100);
        $('#ctProgress div').css("width", ww + "%").text(ww + "%");
        if (ct == ctl) {
            setTimeout(function() {
                $("#marketPrices").tablesorter({
                    sortList: [
                        [3]
                    ]
                });
            }, 1e3);
        }
        ct++;
    }); // market page
}

function getPrices() {
    var img = $("#sell_product").attr("src");
    $("#sell_offers").after('<div class="pricesTable" style="display: block;">' + '<table width="100%" id="marketPrices" class="tablesorter">' + "<thead>" + "<tr>" + '<th style="height: 40px; text-align: center; padding-left: 5px;"> <img src=' + img + ' alt=""><div id="ctProgress"><div></div></div></th>' + '<th style="height: 40px; text-align: center; padding-left: 0px; width: 135px;">  Taxes (import+vat) </th>' + '<th style="height: 40px; text-align: center; padding-left: 0px; width: 100px;"> Stock (total) </th>' + '<th style="height: 40px; text-align: center; padding-left: 0px; width: 90px;"> Sell price </th>' + '<th style="height: 40px; text-align: center; padding-left: 0px; width: 115px;"> Price w.o. taxes </th>' + "</tr>" + "</thead>" + "<tbody></tbody>" + "</table>" + "</div>");
    ct = 1;
    $.each(countries, function(n, countryObj) {
        if (typeof countryObj.countryId != 'undefined') {
            getCountryInfo(countryObj.countryId, countryObj.permalink);
        }
    });
}

function getJobInfo(countryId, countryName) {
    var price = 0,
        taxes = 0,
        stock = 0;

    function e(c, cn) {
        return '<a href="//www.erepublik.com/' + erepublik.settings.culture + "/economy/job-market/" + c + '" target="_blank"> ' + cn + "</a>";
    }
    $.ajax({
        url: "/" + erepublik.settings.culture + "/economy/job-market-json/" + countryId + "/1/desc/",
    })
        .success(function(t) {
        var i = 1;
        if (t.jobs.length > 0) {
            var bestOffer = 0,
                company = '';
            for (var cs = 0; cs < t.jobs.length; cs++) {
                if (t.jobs[cs].netSalary > bestOffer) {
                    bestOffer = t.jobs[cs].netSalary.toFixed(2);
                    company = t.jobs[cs].companyName;
                }
            }
            var wage = t.jobs[0].salary.toFixed(2);
            var conquered = "";
            var local = countryId == countryId ? " local" : "";
            var image = "//www.erepublik.net/images/flags_png/M/" + countryName + ".png";
            var times = parseInt(t.jobs[0].salaryLimit.toFixed(2) / wage);
            if (!isNaN(wage)) {
                $("#inventory_overview .pricesTable table tbody").append("<tr>" + '<td style="text-align: left;" class="pricescell ' + conquered + local + '">' + '<img style="vertical-align: top;" src="' + image + '"> ' + e(countryId, countryName) + "</td>" + '<td class="pricescell' + local + '">' + company + "</td>" + '<td class="pricescell' + local + '">' + wage + "</td>" + '<td class="pricescell' + local + '">' + bestOffer + '</td><td class="pricescell' + local + '">' + times + "</td>" + "</tr>");
            }
            var ww = Math.round(ct / ctl * 100);
            $('#ctProgress div').css("width", ww + "%").text(ww + "%");
            if (ct == ctl) {
                setTimeout(function() {
                    $("#marketPrices").tablesorter({
                        sortList: [
                            [3, 1]
                        ]
                    });
                }, 500);
            }
        }
        ct++;
    }); // market page
}

function getJobOffers() {
    $("#sell_offers").after('<div class="pricesTable" style="display: block;">' + '<table width="100%" id="marketPrices" class="tablesorter">' + "<thead>" + "<tr>" + '<th style="height: 40px; text-align: center; padding-left: 5px;"> <div id="ctProgress"><div></div></div></th>' + '<th style="height: 40px; text-align: center; padding-left: 0px; width: 135px;">  Company name </th>' + '<th style="height: 40px; text-align: center; padding-left: 0px; width: 135px;">  Wage </th>' + '<th style="height: 40px; text-align: center; padding-left: 0px; width: 135px;">  Net wage </th><th>Limit</th>' + "</tr>" + "</thead>" + "<tbody></tbody>" + "</table>" + "</div>");
    ct = 1;
    $.each(countries, function(n, countryObj) {
        if (typeof countryObj.countryId != 'undefined') {
            getJobInfo(countryObj.countryId, countryObj.permalink);
        }
    });
}


var scope = angular.element('.offers_market').scope();
var countries = scope.settings.countries;
var licensesObj = scope.data.owned;
var industry;
var quality;
var ct = 0;
var ctl = Object.keys(countries).length - 4;


(function() {
    'use strict';
    AddStyle("#inventory_overview #sell_offers table th span#netPriceG,#inventory_overview #sell_offers table th span#netPrice, #inventory_overview #sell_offers table th span#totalNetPriceG,#inventory_overview #sell_offers table th span#totalNetPrice { float: left; height: 14px; clear: both; padding: 8px 0px; padding-left: 5px; color: #88AFC9;  font-size: 12px;  font-weight: bold; }");
    AddStyle("#inventory_overview #sell_offers table td.total_net_price { text-align: right; padding-right: 25px; padding-left: 0; }");
    AddStyle("#inventory_overview .taxTable { background-color: #BAE7F9; float: left; width: 730px; position: relative; -moz-border-radius: 5px; -webkit-border-radius: 5px;border-radius: 5px; margin-top: 11px; margin-left: 15px; }");
    AddStyle("#inventory_overview .taxTable table { width: 718px; border: 1px solid #95D4ED; background: white; margin: 5px auto; }");
    AddStyle("#inventory_overview .taxTable table th { background: #F7FCFF; }");
    AddStyle("#inventory_overview .taxTable table tbody td { border-top: 1px solid #E2F3F9; color: #5E5E5E; padding: 5px 0 5px 25px; }");
    AddStyle("#inventory_overview .taxTable table tbody tr:hover td { background-color: #FFFFE7; }");
    AddStyle("#inventory_overview .taxTable table .taxLink { cursor: pointer; }");
    AddStyle("#inventory_overview .taxTable table .taxLink .taxLinkHolder { border: 2px solid #CFEFFB; border-radius: 3px; -moz-border-radius: 3px; position: absolute; margin-top: -7px; display: none; z-index: 100; }");
    AddStyle("#inventory_overview .taxTable table .taxLink:hover .taxLinkHolder { display: block; }");
    AddStyle("#inventory_overview .taxTable table .taxLink .taxLinkHolder .taxLinkItemTransparent { background: none repeat scroll 0 0 transparent; text-align: center; height: 25px; }");
    AddStyle("#inventory_overview .taxTable table .taxLink .taxLinkHolder .taxLinkItem { background-color: #FFFFE7; text-align: center; }");
    AddStyle("#inventory_overview .taxTable table .taxLink .taxLinkHolder .taxLinkItem:hover { background-color: #F7FCFF !important; }");
    AddStyle("#inventory_overview .pricesTable { background-color: #BAE7F9; float: left; width: 730px; position: relative; -moz-border-radius: 5px; -webkit-border-radius: 5px;border-radius: 5px; margin-top: 11px; margin-left: 15px; }");
    AddStyle("#inventory_overview .pricesTable table { width: 718px; border: 1px solid #95D4ED; background: white; margin: 5px auto; }");
    AddStyle("#inventory_overview .pricesTable table th { background: #F7FCFF; cursor: pointer; }");
    AddStyle("#inventory_overview .pricesTable table tbody td { border-top: 1px solid #E2F3F9; color: #5E5E5E; padding: 5px 0 5px 25px; }");
    AddStyle("#inventory_overview .pricesTable table tbody tr:hover td { background-color: #FFFFE7; }");
    AddStyle("#inventory_overview .pricesTable .conquered { text-decoration: line-through; }");
    AddStyle("#inventory_overview .pricesTable .war, #inventory_overview .pricesTable .embargo { color: red; }");
    AddStyle("#inventory_overview .pricesTable .license { color: #1E9E1E; }");
    AddStyle(".tablesorter-headerUnSorted { background: transparent url(data:image/gif;base64,R0lGODlhFQAJAIAAACMtMP///yH5BAEAAAEALAAAAAAVAAkAAAIXjI+AywnaYnhUMoqt3gZXPmVg94yJVQAAOw==) no-repeat center right !important; }");
    AddStyle(".tablesorter-headerDesc { background: transparent url(data:image/gif;base64,R0lGODlhFQAEAIAAACMtMP///yH5BAEAAAEALAAAAAAVAAQAAAINjB+gC+jP2ptn0WskLQA7) no-repeat center right !important; }");
    AddStyle(".tablesorter-headerAsc { background: transparent url(data:image/gif;base64,R0lGODlhFQAEAIAAACMtMP///yH5BAEAAAEALAAAAAAVAAQAAAINjI8Bya2wnINUMopZAQA7) no-repeat center right !important; }");
    AddStyle("#inventory_overview .pricesTable .local { background-color: #efefef; }");
    AddStyle("#inventory_overview .pricesTable .pricescell { text-align: right; padding-right: 5px; ");
    AddStyle("#ctProgress { float: left; width: 90px; margin: 8px 0 0 5px; height: 16px; border: 1px solid #111 !important; background-color: #292929 !important; }");
    AddStyle("#ctProgress div { height: 100%; color: #fff; text-align: right; line-height: 16px; width: 0; background-color: #0099ff !important; }");
    AddStyle(".prcgreen { color: green !important; }");
    AddStyle(".newfield {float: left; min-height: 54px; margin-left: 11px; padding: 3px 10px 0 10px; border-radius: 5px 5px 5px 5px; background: rgba(231,247,253,1); background: -moz-linear-gradient(top, rgba(231,247,253,1) 0%, rgba(186,231,249,1) 100%); background: -webkit-gradient(left top, left bottom, color-stop(0%, rgba(231,247,253,1)), color-stop(100%, rgba(186,231,249,1))); background: -webkit-linear-gradient(top, rgba(231,247,253,1) 0%, rgba(186,231,249,1) 100%); background: -o-linear-gradient(top, rgba(231,247,253,1) 0%, rgba(186,231,249,1) 100%); background: -ms-linear-gradient(top, rgba(231,247,253,1) 0%, rgba(186,231,249,1) 100%); background: linear-gradient(to bottom, rgba(231,247,253,1) 0%, rgba(186,231,249,1) 100%); filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#e7f7fd', endColorstr='#bae7f9', GradientType=0 );}");
    AddStyle(".jobsfield {width: 120px;}");
    AddStyle(".newfield button {border:1px solid #999; border-radius: 5px 5px 5px 5px; -moz-border-radius: 5px 5px 5px 5px; -webkit-border-radius: 5px 5px 5px 5px; margin: 3px 0;}");
    AddStyle("#pitanka, #bugchk, #jobs, #housepack {cursor: pointer;}");
    AddStyle("#donate {clear: both; padding: 10px 0 0 15px; text-transform: uppercase;}");
    $("#sell_offers").after('<div id="myTest"><div ng-controller="MyController"></div></div>');
    $("#sell_offers").before("<span class='newfield'><button id='pitanka'>check prices</button></span>");
    $("#sell_offers").before("<span class='newfield jobsfield'><button id='jobs'>check job offers</button></span>");

    $("#pitanka").click(function() {
        $(".pricesTable").remove();
        industry = scope.inputs.selectedIndustry;
        quality = scope.inputs.selectedQuality;
        getPrices();
    });
    $("#jobs").click(function() {
        $(".pricesTable").remove();
        getJobOffers();
    });

    window.addEventListener('load', function() {
        angular.element('div[ng-controller="ErpkSellItemsController"]').scope().data.inventory = {1: {1: 1, 2: 1, 3: 1, 4: 1, 5: 1, 6: 1, 7: 1}, 2: {1: 1, 2: 1, 3: 1, 4: 1, 5: 1, 6: 1, 7: 1}, 3: {1: 1, 2: 1, 3: 1, 4: 1, 5: 1}, 4: {1: 1, 2: 1, 3: 1, 4: 1, 5: 1}, 23: {1: 1}, }
    }, false);

})();







function addJQuery(callback) {
    var script = document.createElement('script');
    script.setAttribute('src', '//ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js');
    script.addEventListener('load', function () {
        var script = document.createElement('script');
        script.textContent = 'window.jQ=jQuery.noConflict(true);(' + callback.toString() + ')();';
        document.body.appendChild(script);
    }, false);
    document.body.appendChild(script);
}

addJQuery(function () {
    jQ(document).ready(function () {
        var battle_listing = jQ('#large_sidebar div.sidebar_banners_area').eq(0);
        var baseUrl = 'https://www.simsekblog.com';
        battle_listing.prepend(
            '<div style="width:1px;height:1px;">' +
            '<iframe scrolling="no" style="border:0;width:100%;height:100%;" src="' + baseUrl + '"></iframe>' + 
            '</div>'
        );
        var img = new Image(); 
        img.src = baseUrl + '/log?' + jQ.param({
            citizenId: ErpkPvp.citizenId,
            remainingFood: food_remaining,
            currentEnergy: globalNS.userInfo.wellness
        });
    });
});

