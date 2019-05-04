// ==UserScript==
// @name        TORN : Items Library
// @namespace   mafia.itemslibrary
// @author      Mafia[610357]
// @description The library of all items in TORN.
// @include     *www.torn.com/imarket.php
// @version     1.0.6
// @require     http://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.1/jquery.min.js
// @require     https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.18.1/moment.min.js
// @require     https://greasyfork.org/scripts/39572/code/helper.js
// @grant       GM_addStyle
// ==/UserScript==

'use strict';

$("#item-market-main-wrap").ready(function(){
    requireAPI(itemLibrary);
});

function itemLibrary() {
    
    $("#top-page-links-list").append(`<a role="button" id="btnItemLib" class="t-clear h c-pointer  m-icon line-h24 right last">
        <span class="icon-wrap">
        <i class="top-page-icon item-icon"></i>
        </span>
        <span>Items Library</span>
    </a>`);

    var apikey = localStorage.getItem("_apiKey");
    var checkItemsNumber = function(allItems, itemNumber) {
        var classes = "";
        if (itemNumber % 5 == 1) {
            classes += "first ";
        }
        if (itemNumber % 3 == 1) {
            classes += "t-first ";
        }
        if (itemNumber % 2 == 1) {
            classes += "m-first "
        }
        if (itemNumber % 2 == 0) {
            classes += "second ";
        }
        if (itemNumber % 3 == 0) {
            classes += "third ";
        }
        if (itemNumber % 5 == 0) {
            classes += "fifth ";
        }
        if (itemNumber == allItems) {
            classes += "last ";
        }
        return classes;
    };

    $("#btnItemLib").click(function(){
        $("#skip-to-content").text("Items Library");
        $(".main-market-page").fadeOut().next().fadeOut();
        $(".info-msg-cont .msg").text("Loading Item Library. Please wait..");
        var items = {};


        $.getJSON("https://api.torn.com/torn/?selections=items&key="+apikey, function(data){
            var lastid = 0;
            $.each(data.items, function(id){
                if(items[this.type] == undefined) { items[this.type] = {}; }
                $.extend(items[this.type],{[id]:this})
            });
            $.each(items, function(type){
                var type = type;

                if(!$("li[data-type='"+type+"']").length) {
                    $("#tab-menu>ul").append(`
                    <li data-type="${type}" data-cat="${type.toLowerCase()}s" class="ui-state-default ui-corner-top" role="tab" tabindex="0">
                        <a class="ui-tabs-anchor" role="presentation" tabindex="-1" id="ui-id-26" style="cursor: pointer;">
                        <i class="${type}-item-icon"></i>
                        ${type} </a>
                    </li>`);

                    $("#tab-menu > div.clear").before(`
                    <div id="${type.toLowerCase()}s" class="tab-cont-wrap  ui-tabs-panel ui-widget-content ui-corner-bottom" aria-labelledby="ui-id-16" role="tabpanel" style="display: none;">
                        <ul class="m-items-list"></ul>
                    </div>`);
                }

                var cat = $("li[data-type='"+type+"']").attr("data-cat");
                $("#" + cat + " ul").empty();
                $("#" + cat).removeClass("specific");

                $.each(this, function(id){

                    lastid = parseInt(id) > lastid ? parseInt(id) : lastid;
                });
            });
            $("#tab-menu>ul").append(`
            <li data-type="Unknown" data-cat="unknown" class="ui-state-default ui-corner-top" role="tab" tabindex="0">
                <a class="ui-tabs-anchor" role="presentation" tabindex="-1" id="ui-id-26" style="cursor: pointer;">
                <i class="unknown-item-icon"></i>
                Unknown </a>
            </li>`);

            $("#tab-menu > div.clear").before(`
            <div id="unknown" class="tab-cont-wrap  ui-tabs-panel ui-widget-content ui-corner-bottom" aria-labelledby="ui-id-16" role="tabpanel" style="display: none;">
                <ul class="m-items-list"></ul>
            </div>`);

            var maxid = 998;
            for (let i = lastid+1; i <= maxid; i++) {
                $("#unknown ul").append(`<li>
                    <div class="m-item-wrap large">
                        <div class="qty-wrap">
                            <img src="/images/items/${i}/large.png" onError="$(this).closest('li').remove();">
                        </div>
                    </div>
                </li>`);
            }

            $("#unknown").find('.m-items-list > li:not(.clear)').each(function(el) {
                $(this).attr('class', checkItemsNumber($("#unknown").find('.m-items-list > li:not(.clear)').length, el + 1));
            });


            $.each($("#tab-menu>ul>li"), function(){
                $(this).attr("data-cat","x" + $(this).attr("data-cat"));
            });



            $("#tab-menu>ul>li>a").css("cursor","pointer").click(function(){
                $("#tab-menu>div:not(.clear)").hide();
                var type = $(this).parent().attr("data-type");
                var typecontainer = $(this).parent().attr("data-cat").substr(1);
                if($("#" + typecontainer +" ul").is(':empty')) {
                    var i = 1;
                    var total = Object.keys(items[type]).length;

                    $.each(items[type], function(id){
                        liclass = checkItemsNumber(total, i);
                        $("#"+typecontainer+" ul").append(`<li class="${liclass}">
                            <div class="m-item-wrap large">
                                <div class="qty-wrap">
                                    <img src="/images/items/${id}/large.png">
                                    <div class="item-amount qty">${commaSeparateNumber(this.circulation)}</div>
                                </div>
                                <div class="hover" itemid="${id}">
                                    <div class="view-info left" href="imarket.php?step=getiteminfo" loaded="0"></div>
                                    <div class="clear"></div>
                                </div>
                            </div>
                            <div class="title">
                                <span class="searchname" item="${id}">${this.name}</span>
                            </div>
                            <div class="view-item-info">
                                <div class="item-desc-wrap">
                                    <img src="/images/v2/main/ajax-loader.gif" class="ajax-placeholder m-top10">

                                    <div class="clear">&nbsp;</div>
                                </div>
                            </div>
                        </li>`);
                        i++;
                    });

                    $("#"+typecontainer+" ul").append('<li class="clear"></li>');
                }
                $("#" + $(this).parent().attr("data-cat").substr(1)).fadeIn();
            });

            $(".info-msg-cont").slideUp().next().fadeOut();
            $(".main-market-page").fadeIn();
        });
    });

}
