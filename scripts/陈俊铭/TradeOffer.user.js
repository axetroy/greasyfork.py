// ==UserScript==
// @name		TradeOffer
// @description 乱几把写
// @namespace	out
// @version		1.0
// @icon      	https://store.steampowered.com/favicon.ico
// @grant        GM_xmlhttpRequest
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_deleteValue
// @grant        GM_addStyle
// @connect     steamcommunity.com
// @copyright	out
// @match        *://steamcommunity.com/id/*/inventory*
// @match        *://steamcommunity.com/profiles/*/inventory*
// @match        *://steamcommunity.com/id/*/tradeoffers/*
// @match        *://steamcommunity.com/profiles/*/tradeoffers/*
// @require      https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js
// @run-at       document-ready
// ==/UserScript==
function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const eol = "\n";
const tab = "\t";
const has = Object.prototype.hasOwnProperty;
const forEachAsync = (array, callback, lastIterationCallback) => {
    if (!Array.isArray(array)) throw Error('Not an array');
    if (typeof callback !== 'function') throw Error('Not an function');

    const iterators = [...array.keys()];
    const processor = taskStartTime => {
        let taskFinishTime;

        do {
            const iterator = iterators.shift();

            if (iterator in array) callback(array[iterator], iterator, array);

            taskFinishTime = window.performance.now();
        } while (taskFinishTime - taskStartTime < 1000 / 60);

        if (iterators.length > 0) requestAnimationFrame(processor);
        // finished iterating array
        else if (typeof lastIterationCallback === 'function') lastIterationCallback();
    };

    requestAnimationFrame(processor);
};
const unique = a => [...new Set(a)];
const isArray = value => Array.isArray(value);
const isObject = value => Object(value) === value;
const request = options => new Promise((resolve, reject) => {
    options.onerror = reject;
    options.ontimeout = reject;
    options.onload = resolve;

    GM_xmlhttpRequest(options);
});

if (typeof String.prototype.endsWith != 'function') {
    String.prototype.endsWith = function(suffix) {
        return this.indexOf(suffix, this.length - suffix.length) !== -1;
    };
}

// setup jQuery
const $ = jQuery.noConflict(true);

$.fn.pop = [].pop;
$.fn.shift = [].shift;
$.fn.eachAsync = function eachAsync(callback, lastIterationCallback) {
    forEachAsync(this.get(), callback, lastIterationCallback);
};

function Trade(action,tradeID){
    if(!tradeID) {
        tradeID =prompt("tradeID?");
    }

    if(!tradeID){
        return;
    }

    GM_xmlhttpRequest({
        method: "GET",
        url: "https://steamcommunity.com/tradeoffer/"+ tradeID + "/?l=english",
        onload: function(res){
            if(res.responseText.indexOf("longer valid") != -1){
                console.log("trade " + tradeID + " no longer valid");
                remove(tradeID);
                return;
            }
            console.log('start ' + action + " trade " + tradeID);
            var partner = res.responseText.match(/7656[\d]{12,14}/)[0];
            GM_xmlhttpRequest({
                responseType: "json",
                method: "POST",
                headers:{
                    referer: "https://steamcommunity.com/tradeoffer/"+ tradeID,
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                data: "sessionid=" + g_sessionID + "&serverid=1&tradeofferid=" + tradeID + "&partner=" + partner + "&captcha=",
                url: "https://steamcommunity.com/tradeoffer/"+ tradeID +"/"+action,
                onload: function(res){
                    if(res.response.tradeid) {
                        remove(tradeID);
                    }
                    console.log(res.response);
                }
            });
        }
    });
}

function remove(tradeID) {
    $('#tradeofferid_' + tradeID).next().remove();
    $('#tradeofferid_' + tradeID).remove();
}
function InitInventory(){
    $('.inventory_rightnav').prepend($('<a class="btn_darkblue_white_innerfade btn_medium new_trade_offer_btn" href="javascript:void(0)"><span>快速交易</span></>').click(() => ShowFriendSelect("交易",log)));

    CInventory.prototype.LoadMoreAssets = function( count )
    {
        if ( this.m_ActivePromise )
            return this.m_ActivePromise;

        if ( this.m_bFullyLoaded )
            return $J.Deferred().resolve().promise();

        // we won't re-request for 5 seconds after a failure
        if ( this.m_tsLastError && $J.now() - this.m_tsLastError < 5000 )
            return $J.Deferred().reject().promise();

        this.m_$Inventory.addClass('loading');
        var _this = this;

        var params = {
            'l': g_strLanguage,
            'count': 5000
        };

        if ( typeof(g_bIsInMarketplace) != 'undefined' && g_bIsInMarketplace )
            params.market = 1;

        if ( this.m_ulLastAssetID )
            params.start_assetid = this.m_ulLastAssetID;

        this.m_owner.ShowLoadingIndicator();

        return this.SetActivePromise( $J.get( this.GetInventoryLoadURL(), params
                                            ).done( function( data ) {
            _this.m_bPerformedInitialLoad = true;
            _this.m_$Inventory.removeClass('loading');
            _this.AddInventoryData( data );
            _this.m_tsLastError = 0;
            _this.HideInventoryLoadError();
        }).fail( function() {
            _this.m_tsLastError = $J.now();
            _this.ShowInventoryLoadError();
        }).always( function() {
            _this.m_owner.HideLoadingIndicator();
        }) ).promise();
    };
}
function InitTradeOffers() {
    $('div.tradeoffer_footer_actions').each(function(){
        var tradeID = $(this).find('a:last').attr('href').match(/\d+/)[0];
        var $acceptBt = $('<a href="javascript:void(0)" class="whiteLink">接受交易</a>').click(() => Trade("accept",tradeID));
        $(this).append('| ').append($acceptBt);
    });
    var $menuBt = $('<a class="popup_menu_item" href="javascript:void(0)">接受交易</a>').click(() => Trade("accept"));
    $('#account_dropdown div.popup_body.popup_menu').append($menuBt);
}

function Init(){
    if(window.location.href.indexOf('inventory') != -1) {
        InitInventory();
    }

    if(window.location.href.indexOf('tradeoffers') != -1) {
        InitTradeOffers();
    }
}
function log(str) {
    console.log(str)
}
Init();