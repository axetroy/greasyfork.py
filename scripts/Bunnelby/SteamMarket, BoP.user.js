// ==UserScript==
// @name        SteamMarket, BoP
// @description Caluclate balance of payments on steam market
// @namespace   org.userscript.bunnelby
// @include     https://store.steampowered.com/account/history/*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/2.1.0/jquery.min.js
// @version     2.0
// @grant       none
// @run-at      document-end
// @unwrap
// ==/UserScript==
$(function ($){
    var Countries = ["EN", "JP"];
    var Currencies = ["$", "¥"];
    var Country = "EN";
    var Currency = "$";

    var CurrencyLocalization = {
        "$": {
            regex_totalPrice: /\$ ([\d\.\,]+)/,
            regex_walletDiffPrice: /([\+|\-])\$ ([\d\.\,]+)/,
            regex_walletTotalPrice: /\$ ([\d\.\,]+)/,
        },
        "¥": {
            regex_totalPrice: /\¥ ([\d\.\,]+)/,
            regex_walletDiffPrice: /([\+|\-])¥ ([\d\.\,]+)/,
            regex_walletTotalPrice: /¥ ([\d\.\,]+)/,
        }
    };
    var Localization = {
        EN: {
            word_repayment: "Refund",
            word_wallet: "Wallet",
            word_credit: "Credit",
            word_steamCommunityMarket: "Steam Community Market",
            word_purchase: "Purchase",
            word_purchaseCredit: "Wallet Credit",
            text_calcButton: "Calc BoP",
            text_nonHistory: "Non History",
            text_resultMessage: "{dateStart}-{dateEnd}\n{marketCount} Market Transaction\nMarket BoP: \\ {market}\nBuy in Market: \\ {marketMinus}\nSell in Market: \\ {marketPlus}\nPurchase by Wallet: \\ {walletPurchase}\nOther Purchase: \\ {purchase}\nRepayment to Wallet: \\ {repayment}\nWallet Charge: \\ {charge}",
            regex_tradeCount: /(\d+) Market Transaction/,
            regex_date: /^.+$/,
            num_datePosition: 2,
            num_monthPosition: 1,
            num_yearPosition: 0,
        },
        JP: {
            word_repayment: "返金",
            word_wallet: "ウォレット",
            word_credit: "クレジット",
            word_steamCommunityMarket: "Steam コミュニティマーケット",
            word_purchase: "購入",
            word_purchaseCredit: "ウォレットクレジットを購入",
            text_calcButton: "収支を計算",
            text_nonHistory: "取引履歴はありません",
            text_resultMessage: "{dateStart}-{dateEnd}\n{marketCount} 件のマーケット取引\nマーケット収支: \\ {market}\nマーケット購入: \\ {marketMinus}\nマーケット売却: \\ {marketPlus}\nウォレットで購入: \\ {walletPurchase}\nその他の購入: \\ {purchase}\nウォレット返金: \\ {repayment}\nウォレットチャージ: \\ {charge}",
            regex_tradeCount: /(\d+) マーケットでの取引/,
            regex_date: /(\d+)年(\d+)月(\d+)日/,
            num_datePosition: 2,
            num_monthPosition: 1,
            num_yearPosition: 0,
        }
    };
    var LO = Localization[Country];
    var CU = CurrencyLocalization[Currency];
    var history = [];

    $("<span />")
    .addClass("pulldown btnv6_blue_hoverfade btn_small")
    .css({ marginLeft: "15px" })
    .append("<span>" + LO.text_calcButton + "</span>")
    .click(function () {
        history = [];
        $("#main_content tr.wallet_table_row:visible").each(function () {
            var data = {
                date: null,
                isCommunityMarket: false,
                isRepayment: false,
                isPurchase: false,
                isWallet: false,
                isChargeWallet: false,
                marketCount: 0,
                totalPrice: 0,
                diffPrice: 0,
                walletPrice: 0,
            };
            // date
            var mDate = $(this).find(".wht_date").text().match(LO.regex_date);
            data.date = mDate[0];

            // item
            if ($(this).find(".wht_items").text().indexOf(LO.word_steamCommunityMarket) >= 0) {
                data.isCommunityMarket = true;
                var mCount = $(this).find(".wht_type").text().match(LO.regex_tradeCount);
                if (mCount) {
                    data.marketCount = parseInt(mCount[1]);
                } else {
                    data.marketCount++;
                }
            } else if ($(this).find(".wht_items").text().indexOf(LO.word_purchaseCredit) >= 0) {
                data.isChargeWallet = true;
            }

            if ($(this).find(".wht_type").text().indexOf(LO.word_purchase) >= 0) {
                data.isPurchase = true;
            }
            if ($(this).find(".wht_type").text().indexOf(LO.word_wallet) >= 0) {
                data.isWallet = true;
            }
            if ($(this).find(".wht_type").text().indexOf(LO.word_repayment) >= 0) {
                data.isRepayment = true;
                data.isWallet = false;
            }

            var mTotal = $(this).find(".wht_total").text().match(CU.regex_totalPrice);
            data.totalPrice = parseFloat(mTotal[1].replace(",", ""));

            var mDiff = $(this).find(".wht_wallet_change").text().match(CU.regex_walletDiffPrice);
            if (mDiff) {
                data.diffPrice = parseFloat(mDiff[2].replace(",", "")) * (mDiff[1] == "-" ? -1 : 1);
            }

            var mWallet = $(this).find(".wht_wallet_balance").text().match(CU.regex_walletTotalPrice);
            if (mWallet) {
                data.walletPrice = parseFloat(mWallet[1].replace(",", ""));
            }

            history.push(data);
        });

        console.log(history);

        var marketCount = 0;
        var bopMarket = 0;
        var bopMarketPlus = 0;
        var bopMarketMinus = 0;
        var bopWalletPurchase = 0;
        var bopPurchase = 0;
        var bopRepayment = 0;
        var bopCharge = 0;

        for (var i = 0; i < history.length; i++) {
            var d = history[i];

            if (d.isCommunityMarket){
                marketCount += d.marketCount;
                if (d.diffPrice > 0) {
                    bopMarketPlus += d.diffPrice;
                } else {
                    bopMarketMinus += d.diffPrice;
                }
                bopMarket += d.diffPrice;
            } else if (d.isRepayment) {
                bopRepayment += d.diffPrice;
            } else if (d.isChargeWallet) {
                bopCharge += d.totalPrice;
            } else if (d.isPurchase) {
                if (d.isWallet) {
                    bopWalletPurchase += d.totalPrice;
                } else {
                    bopPurchase += d.totalPrice;
                }
            }
        }

        if (history.length == 0) {
            alert(LO.text_nonHistory);
        }

        var message = LO.text_resultMessage;
        message = message.replace("{dateStart}", history[history.length - 1].date);
        message = message.replace("{dateEnd}", history[0].date);
        message = message.replace("{market}", Math.round(bopMarket));
        message = message.replace("{marketPlus}", Math.round(bopMarketPlus));
        message = message.replace("{marketMinus}", Math.round(bopMarketMinus));
        message = message.replace("{marketCount}", marketCount);
        message = message.replace("{walletPurchase}", bopWalletPurchase);
        message = message.replace("{purchase}", bopPurchase);
        message = message.replace("{repayment}", bopRepayment);
        message = message.replace("{charge}", bopCharge);

        alert(message);
    }).appendTo(".page_content h2");

    var $select = $("<select />").change(function() {
        LO = Localization[$(this).val()];
    }).appendTo(".page_content h2");
    for (var i = 0; i < Countries.length; i++) {
        $select.append("<option value=" + Countries[i] + ">" + Countries[i] + "</option>");
    }

    var $select2 = $("<select />").change(function() {
        CU = CurrencyLocalization[$(this).val()];
    }).appendTo(".page_content h2");
    for (var i = 0; i < Currencies.length; i++) {
        $select2.append("<option value=" + Currencies[i] + ">" + Currencies[i] + "</option>");
    }

    console.log("loaded BOP");
});
