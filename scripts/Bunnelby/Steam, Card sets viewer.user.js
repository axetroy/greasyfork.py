// ==UserScript==
// @name         Steam, Card sets viewer
// @name:ja         Steam, Card sets viewer
// @namespace    http://tampermonkey.net/
// @version      1.1.4
// @description  Happy trading 1:1 card sets
// @description:ja  Happy trading 1:1 card sets
// @author       You
// @require      http://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js
// @match        https://steamcommunity.com/tradeoffer/*
// @grant        GM.xmlHttpRequest
// @runat        document-end
// @nowrap
// ==/UserScript==

(function() {
    'use strict';

    var $ = jQuery.noConflict();
    var GetBadgeInformationUrl = "https://www.steamcardexchange.net/api/request.php?GetBadgePrices_Member";
    var CacheKey = "BadgeInformatinCache";
    var MaxBadgeLevel = 5;

    function escapeHtml (string) {
        if(typeof string !== 'string') {
            return string;
        }
        return string.replace(/[&'`"<>]/g, function(match) {
            return {
                '&': '&amp;',
                "'": '&#x27;',
                '`': '&#x60;',
                '"': '&quot;',
                '<': '&lt;',
                '>': '&gt;',
            }[match]
        });
    }

    function functionToMultilineText(func) {
        return func.toString().match(/[^]*\/\*([^]*)\*\/\}$/)[1];
    }

    function createSetsObjectFromInventory (user) {
        var sets = {};
        var rgInventory = user.rgContexts[753][6].inventory.rgInventory;
        for (var instanceid in rgInventory) {
            var item = rgInventory[instanceid];

            // Check whether item type is card
            var isCard = false;
            var isNormal = false;
            for (var i = 0; i < item.tags.length; i++) {
                // item_class_2 is type of trading card
                if (item.tags[i].category == "item_class" &&
                    item.tags[i].internal_name == "item_class_2") {
                    isCard = true;
                }
                // cardborder_0 is type of normal card
                if (item.tags[i].category == "cardborder" &&
                    item.tags[i].internal_name == "cardborder_0") {
                    isNormal = true;
                }
            }

            if (!isCard) continue;
            if (!isNormal) continue;

            if (!sets[item.market_fee_app]) {
                sets[item.market_fee_app] = {
                    appId: item.market_fee_app,
                    cardsInSet: -1,
                    items: {}
                };
            }
            if (!sets[item.market_fee_app].items[item.market_hash_name]) {
                sets[item.market_fee_app].items[item.market_hash_name] = {
                    hash: item.market_hash_name,
                    quantity: 1,
                    instances: [instanceid],
                };
            } else {
                sets[item.market_fee_app].items[item.market_hash_name].quantity++;
                sets[item.market_fee_app].items[item.market_hash_name].instances.push(instanceid);
            }
        }

        return sets;
    }

    function isValidSteamInventory() {
        var errorUser;
        function checkIsLoaded(user) {
            if (!user) throw "Error: Not found {0} user object".replace("{0}", errorUser);
            var inv = user.rgContexts[753][6].inventory;
            if (!inv) throw "Error: {0} Inventory is not found".replace("{0}", errorUser);
            if (!inv.initialized) throw "Error: {0} Inventory is unloaded".replace("{0}", errorUser);
            if (inv.appid != "753") throw "Error: {0} Inventory isn't Steam Inventory".replace("{0}", errorUser);
            if (!inv.rgInventory) throw "Error: {0} rgInventory is unloaded".replace("{0}", errorUser);
        }

        errorUser = "Your";
        checkIsLoaded(UserYou);
        errorUser = "Partners";
        checkIsLoaded(UserThem);

        console.log("Both Inventory are loaded");
        return true;
    }

    function loadBadgeInformation() {
        return new Promise(function (resolve, reject) {
            GM.xmlHttpRequest({
                url: GetBadgeInformationUrl,
                method: "GET",
                onerror: function () {
                    reject("Couldn't get badge information. You need to log in to steamcardexchange.net.");
                },
                onload: function (xhr) {
                    var badges = JSON.parse(xhr.responseText);
                    localStorage[CacheKey] = xhr.responseText;
                    resolve(badges);
                }
            });
        });
    }

    function applyBadgeInformationToSetsObject(badges, sets, isSelfInventory, isExtraOnly) {
        var fee, set;
        var data = badges.data;

        // Add badge information to sets variable
        for (var i = 0; i < data.length; i++) {
            set = sets[data[i][0][0]];
            if (!set) continue;

            // Appid (market_fee_app) have been already added
            // data[i][0][0]
            set.title = data[i][0][1];
            set.cardsInSet = data[i][1];
            set.badgeValue = data[i][2];
            set.yourLevel = parseInt(data[i][3]);
            // Updated timestamp isn't necessary
            // data[i][4]
            set.fullSetQuantity = 0;
            set.hasFullSet = false;
        }
        // Count complete card sets
        for (fee in sets) {
            set = sets[fee];

            var totalCards = 0;
            var cardsCount = 0;
            var minQty = Number.MAX_VALUE;

            for (var hash in set.items) {
                var item = set.items[hash];
                minQty = Math.min(minQty, item.quantity);
                cardsCount++;
                totalCards += item.quantity;
            }
            set.totalCards = totalCards;
            if (set.cardsInSet > 0 && set.cardsInSet == cardsCount) {
                set.hasFullSet = true;
                set.fullSetQuantity = minQty;
                if (isSelfInventory) {
                    var extraQuantity = set.fullSetQuantity - (MaxBadgeLevel - set.yourLevel);
                    set.extraQuantity = extraQuantity > 0 ? extraQuantity : 0;
                    set.necessaryQuantity = 0;
                } else {
                    set.extraQuantity = 0;
                    set.necessaryQuantity = Math.min(MaxBadgeLevel - set.yourLevel, set.fullSetQuantity);
                }
            } else {
                set.hasFullSet = false;
                set.fullSetQuantity = 0;
                set.extraQuantity = 0;
                set.necessaryQuantity = 0;
            }
        }

        var displayList = [];
        for (fee in sets) {
            set = sets[fee];
            if (!set.hasFullSet) continue;
            if (isExtraOnly) {
                if (isSelfInventory && set.extraQuantity <= 0) continue;
                if (!isSelfInventory && set.necessaryQuantity <= 0) continue;
            }

            displayList.push(set);
        }

        // sort by title
        displayList.sort(function (a, b) {
            return a.title > b.title ? 1 : -1;
        });

        return displayList;
    }

    function buildList(displayList, isYourInventory, isExtraOnly) {
        var set, fee;

        var textBuilder = "";
        var markdownBuilder = "";
        var htmlBuilder = "";
        var steamBuilder = "";

        for (var k = 0; k < displayList.length; k++) {
            set = displayList[k];
            var quantity = set.fullSetQuantity;
            if (isExtraOnly) {
                quantity = isYourInventory ? set.extraQuantity : set.necessaryQuantity;
            }

            var yourBadgeUrl = UserYou.strProfileURL + "/gamecards/" + set.appId + "/";
            var theirBadgeUrl = UserThem.strProfileURL + "/gamecards/" + set.appId + "/";
            var perValue = Math.round(parseFloat(set.badgeValue.replace("$", "")) / set.cardsInSet * 1000) / 1000;

            // Add content as text to pre tag so don't need to html-escape
            textBuilder += "{qty}x {title}\n"
                .replace("{qty}", quantity)
                .replace("{title}", set.title);
            // Add content as text to pre tag so don't need to html-escape
            // but need to escape charactors that is used by markdown
            markdownBuilder += "{qty}x [{title}]({url}) ({cards})\n"
                .replace("{qty}", quantity)
                .replace("{title}", set.title.replace("[", "&#91;").replace("]", "&#93;"))
                .replace("{url}", yourBadgeUrl)
                .replace("{cards}", set.cardsInSet);
            // Add content as text to pre tag so don't need to html-escape
            // but need to escape charactors that is used by steam code
            steamBuilder += "{qty}x [url={url}]{title}[/url]\n"
                .replace("{qty}", quantity)
                .replace("{title}", set.title.replace("[", "&#91;").replace("]", "&#93;"))
                .replace("{url}", yourBadgeUrl);
            // Append content as html to body so need to html-escape variables
            var htmlPart = functionToMultilineText(function () {/*
                <div>
                <button data-fee='{fee}' data-count=1 class='AddSetToTradeButton'>
                Add</button><button data-fee='{fee}' data-count=2 class='AddSetToTradeButton' {disabled2}>
                2</button><button data-fee='{fee}' data-count=3 class='AddSetToTradeButton' {disabled3}>
                3</button><button data-fee='{fee}' data-count=4 class='AddSetToTradeButton' {disabled4}>
                4</button><button data-fee='{fee}' data-count=5 class='AddSetToTradeButton' {disabled5}>
                5</button>
                {qty}x <a href='{yurl}' target='_blank'>{title}</a> (<a href='{turl}' target='_blank'>partners</a>)
                <span>{cards} as {value} / ${pervalue} each</span>
                </div>
                */})
                .replace("{qty}", quantity)
                .replace("{title}", escapeHtml(set.title))
                .replace("{yurl}", yourBadgeUrl)
                .replace("{turl}", theirBadgeUrl)
                .replace(/{fee}/g, set.appId)
                .replace("{cards}", set.cardsInSet)
                .replace("{value}", set.badgeValue)
                .replace("{pervalue}", perValue);
            for (var d = 2; d <= 5; d++) {
                htmlPart = htmlPart.replace("{disabled" + d + "}", d > quantity ? "disabled" : "");
            }
            htmlBuilder += htmlPart;
        }

        return $("<div />")
            .append($("<pre />").addClass("SetListText").text(textBuilder))
            .append($("<pre />").addClass("SetListMarkdown").text(markdownBuilder))
            .append($("<pre />").addClass("SetListSteamCode").text(steamBuilder))
            .append($("<div />").addClass("SetListHtml").append(htmlBuilder));
    }

    var lastDisplayedType;

    async function main() {
        console.log("main()");
        var isExtraOnly = $("#DisplayExtraOnlyCheckbox")[0].checked;

        var yours = createSetsObjectFromInventory(UserYou);
        var theirs = createSetsObjectFromInventory(UserThem);

        console.log("Users:", yours, theirs);

        var badges;
        try {
            badges = JSON.parse(localStorage[CacheKey]);
        } catch (error) {
            badges = null;
        }
        if (!badges) {
            badges = await loadBadgeInformation();
        }

        console.log("Badges:", badges);

        var yourList = applyBadgeInformationToSetsObject(badges, yours, true, isExtraOnly);
        var theirList = applyBadgeInformationToSetsObject(badges, theirs, false, isExtraOnly);

        console.log("Your list:", yourList, yours);
        console.log("Their list:", theirList, theirs);

        var $yourList = buildList(yourList, true, isExtraOnly);
        var $theirList = buildList(theirList, false, isExtraOnly);

        console.log("$DisplayList:", $yourList, $theirList);

        $("#SetListContainer, .CardsInSet").remove();
        $("<div />")
            .append("<div><a class='SwitchSetList'>Html</a><a class='SwitchSetList'>Text</a><a class='SwitchSetList'>Markdown</a><a class='SwitchSetList'>SteamCode</a><a class='CloseSetList'>Close</a></div>")
            .append($yourList.attr({ id: "YoursDisplayList" }))
            .append($theirList.attr({ id: "TheirsDisplayList" }))
            .attr("id", "SetListContainer")
            .addClass(lastDisplayedType || "VisibleHtml")
            .appendTo("body");

        $(".CloseSetList").click(function (ev){
            ev.preventDefault();
            ev.stopPropagation();

            $("#SetListContainer").remove();

            $("#trade_area .item").each(function () {
                var fee = this.rgItem.market_fee_app;
                for (var i = 0; i < badges.data.length; i++) {
                    if (badges.data[i][0][0] == fee) {
                        var cardsInSet = badges.data[i][1];
                        $("<div />")
                            .addClass("CardsInSet")
                            .text(cardsInSet)
                            .appendTo(this.rgItem.element);
                        break;
                    }
                }
            });
        });

        $(".SwitchSetList").click(function (ev) {
            ev.preventDefault();
            ev.stopPropagation();

            $("#SetListContainer")
                .removeClass("VisibleText")
                .removeClass("VisibleMarkdown")
                .removeClass("VisibleHtml")
                .removeClass("VisibleSteamCode")
                .addClass("Visible" + $(this).text());

            lastDisplayedType = "Visible" + $(this).text();
        });

        $(".AddSetToTradeButton").click(function (ev) {
            ev.preventDefault();
            ev.stopPropagation();

            var isSelfInventory = $(this).parents("#YoursDisplayList").length == 1;
            var fee = $(this).attr("data-fee");
            var count = $(this).attr("data-count");
            var targetSet = isSelfInventory ? yours[fee] : theirs[fee];
            var targets = [];
            for (var hash in targetSet.items) {
                var instances = targetSet.items[hash].instances;
                var addables = [];
                for (var i = 0; i < instances.length; i++) {
                    var $c = $((isSelfInventory ? "#your_slots" : "#their_slots") + " #item753_6_" + instances[i]);
                    if ($c.length == 0) {
                        addables.push(instances[i]);
                        if (addables.length == count) {
                            break;
                        }
                    }
                }
                if (addables.length != count) {
                    alert("Cards aren't enough to add complete set");
                    return;
                }
                for (var j = 0; j < addables.length; j++) {
                    targets.push(addables[j]);
                }
            }
            for (var n = 0; n < targets.length; n++) {
                MoveItemToTrade($("#item753_6_" + targets[n])[0]);
            }
        });
    }

    var $controllerContainer = $("<div />")
    .css({ borderBottom: "solid 1px #fff3" })
    .append("<div>Steam, Card sets viewer</div>")
    .appendTo("#inventory_box");

    $("<button />")
        .append("<span>List card sets</span>")
        .addClass("btn_darkblue_white_innerfade btn_small new_trade_offer_btn")
        .css({ margin: "10px 12px" })
        .click(function () {
        try {
            if (isValidSteamInventory()){
                main();
            }
        } catch (error) {
            alert(error);
        }
    })
        .appendTo($controllerContainer);

    $("<button />")
        .append("<span>Clear badge cache</span>")
        .addClass("btn_darkblue_white_innerfade btn_small new_trade_offer_btn")
        .css({ margin: "10px 12px" })
        .click(function () {
        delete localStorage[CacheKey];
    })
        .appendTo($controllerContainer);

    $("<input />").attr({ type: "checkbox", id: "DisplayExtraOnlyCheckbox" }).appendTo($controllerContainer);
    $("<label />").attr({ for: "DisplayExtraOnlyCheckbox" }).text("Extra/Necessary only").appendTo($controllerContainer);

    $("<style />").text(functionToMultilineText(function () {/*
    #SetListContainer .SetListText,
    #SetListContainer .SetListMarkdown,
    #SetListContainer .SetListSteamCode,
    #SetListContainer .SetListHtml {
        display: none;
    }

    #SetListContainer.VisibleText .SetListText,
    #SetListContainer.VisibleMarkdown .SetListMarkdown,
    #SetListContainer.VisibleSteamCode .SetListSteamCode,
    #SetListContainer.VisibleHtml .SetListHtml {
        display: block;
    }
    #SetListContainer {
        position: fixed;
        z-index: 10000;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background: #000000dd;
        overflow-y: scroll;
        padding: 24px 40px;
    }
    #SetListContainer pre {
        white-space: pre-wrap;
        word-break: break-all;
    }
    #SetListContainer > div {
        margin-bottom: 24px;
    }
    #YoursDisplayList, #TheirsDisplayList {
       position: relative;
       width: 48%;
       float: left;
    }
    #YoursDisplayList::before, #TheirsDisplayList::before {
       display:block;
       position: absolute;
       top: -20px;
       font-size: 51px;
       color: #ff74;
       z-index: -1;
    }
    #YoursDisplayList::before {
       content: "Your's";
    }
    #TheirsDisplayList::before {
       content: "Partner's";
    }
    #TheirsDisplayList::before {
       display: block;
       break: all;
       content: "",
    }
    .AddSetToTradeButton {
        padding: 0 3px;
    }
    .AddSetToTradeButton:disabled {
        opacity: 0.1;
    }
    .SwitchSetList {
        margin-right: 8px;
    }
    .CardsInSet {
        position: absolute;
        font-size: 24px;
        color: #ff7a;
        z-index: 100;
        pointer-events: none;
        top: 0;
        left: 0;
        text-shadow: 1px 1px #000;
    }
    */})).appendTo("head");

    // Your code here...
    // .toString().match(/[^]*\/\*([^]*)\*\/\}$/)[1];
})();