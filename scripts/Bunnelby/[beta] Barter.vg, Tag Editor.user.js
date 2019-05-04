// ==UserScript==
// @name         [beta] Barter.vg, Tag Editor
// @namespace    http://tampermonkey.net/
// @version      0.0.1
// @description  try to take over the world!
// @author       You
// @match        https://barter.vg/u/*/t/e/*
// @match        https://barter.vg/u/*/w/e/*
// @match        https://barter.vg/u/*/t/
// @match        https://barter.vg/u/*/b/
// @match        https://barter.vg/u/*/l/
// @require      https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js
// @require      https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js
// @resource     jQueryUICSS https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/themes/smoothness/jquery-ui.css
// @grant       GM_getResourceText
// @unwrap
// ==/UserScript==

(function() {
    'use strict';
    var $ = jQuery.noConflict();

    /*
    for developer:
    get icon urls in bundles page

var bundles = $$(".actives a[href^='https://barter.vg/bundles/']");
var bundlemaps = {};
for (var b = 0; b < bundles.length; b++) {
bundlemaps[bundles[b].href.match(/\d+/g)[0]] = bundles[b].querySelector("img").src.replace("https://bartervg.com", "");
}
bundlemaps

    */

    var storeIcons = {
        "3": "/imgs/ico/humblebundle.png",
        "4": "/imgs/ico/gog.png",
        "7": "/imgs/ico/indiegala.png",
        "8": "/imgs/ico/fanatical.png",
        "9": "/imgs/ico/groupees.png",
        "10": "/imgs/ico/indieroyale.png",
        "15": "/imgs/ico/lazyguys.png",
        "16": "/imgs/ico/greenlight.png",
        "17": "/imgs/ico/dailyindie.png",
        "18": "/imgs/ico/flyingbundle.png",
        "20": "/imgs/ico/gmg.png",
        "21": "/imgs/ico/nuuvem.png",
        "22": "/imgs/ico/macgamestore.png",
        "23": "/imgs/ico/playinjector.png",
        "24": "/imgs/ico/igamestand.png",
        "27": "/imgs/ico/coinplay.png",
        "28": "/imgs/ico/itchio.png",
        "29": "/imgs/ico/superduper.png",
        "30": "/imgs/ico/onemore.png",
        "31": "/imgs/ico/cubicbundle.png",
        "33": "/imgs/ico/hrk.png",
        "34": "/imgs/ico/wingamestore.png",
        "36": "/imgs/ico/orlygift.png",
        "37": "/imgs/ico/squareenix.png",
        "38": "/imgs/ico/otakumaker.png",
        "39": "/imgs/ico/bundlekings.png",
        "40": "/imgs/ico/gamebundle.png",
        "41": "/imgs/ico/chronogg.png",
        "45": "/imgs/ico/bunchofkeys.png",
        "46": "/imgs/ico/g2a.png",
        "47": "/imgs/ico/steamground.png",
        "48": "/imgs/ico/99cent.png",
        "49": "/imgs/ico/redacted.png",
        "50": "/imgs/ico/breadbox.png",
        "56": "/imgs/ico/marvelous.png",
        "58": "/imgs/ico/gogobundles.png",
        "62": "/imgs/ico/otakubundle.png",
        "63": "/imgs/ico/dogebundle.png",
        "68": "/imgs/ico/indiedeals2.png",
        "69": "/imgs/ico/tigb.png",
        "70": "/imgs/ico/tiltify.png",
        "79": "/imgs/ico/embloo.png",
        "82": "/imgs/ico/getgames.png",
        "85": "/imgs/ico/trove.png",
        "87": "/imgs/ico/blinkbundle.png",
        "88": "/imgs/ico/gamesrage.png",
        "89": "/imgs/ico/bbandits.png",
        "90": "/imgs/ico/bcentral.png",
        "91": "/imgs/ico/bdragon.png",
        "93": "/imgs/ico/cultofmac.png",
        "94": "/imgs/ico/eurobundle.png",
        "95": "/imgs/ico/gram.png",
        "96": "/imgs/ico/indieammo.png",
        "97": "/imgs/ico/iborg.png",
        "98": "/imgs/ico/kissmb.png",
        "99": "/imgs/ico/madorc.png",
        "100": "/imgs/ico/paddle.png",
        "101": "/imgs/ico/paywuw.png",
        "102": "/imgs/ico/peonb.png",
        "103": "/imgs/ico/gameolith.png",
        "104": "/imgs/ico/selectnp.png",
        "105": "/imgs/ico/shinyloot.png",
        "106": "/imgs/ico/stacksocial.png",
        "107": "/imgs/ico/universala.png",
        "108": "/imgs/ico/vodo.png",
        "109": "/imgs/ico/cybundle.png",
        "111": "/imgs/ico/lequestore.png",
        "114": "/imgs/ico/puppygames.png",
        "115": "/imgs/ico/igpack.png",
        "116": "/imgs/ico/supershock.png",
        "117": "/imgs/ico/charlies.png",
        "118": "/imgs/ico/socks.png",
        "119": "/imgs/ico/subsoap.png",
        "120": "/imgs/ico/bitcoin.png",
        "128": "/imgs/ico/h2o.png"
    };
    // custom icons
    $.extend(storeIcons, {
        0: "/imgs/ico/disc.png",
        1: "/imgs/ico/steam.png",
        11: "/imgs/ico/gamersgate.png",
        12: "/imgs/ico/amazon.png",
        13: "/imgs/ico/humblebundle.png",
        42: "/imgs/ico/dlgamer.png",
        43: "/imgs/ico/gamesplanet.png",
        44: "/imgs/ico/silagames.png",
        59: "/imgs/ico/cdkeys.png",
        60: "/imgs/ico/kinguin.png",
        64: "/imgs/ico/plati.png",
        71: "/imgs/ico/tremorgames.png",
        72: "/imgs/ico/grepublic.png",
        73: "/imgs/ico/2game.png",
        74: "/imgs/ico/d2d.png",
        75: "/imgs/ico/disc.png",
        76: "/imgs/ico/newegg.png",
        80: "/imgs/ico/tremorgames.png",
        81: "/imgs/ico/gamivo.png",
        83: "/imgs/ico/g2play.png",
        113: "/imgs/ico/disc.png",
        121: "/imgs/ico/gamersgate.png",
        122: "/imgs/ico/voidu.png",
        123: "/imgs/ico/gemly.png",
        127: "/imgs/ico/greenlighta.png",
        130: "/imgs/ico/razer.png",
    });
    var $giftlinkIcon = $('<img src="https://bartervg.com/imgs/nav/giftlink.png" alt="gift link" title="gift link" class="e-store-gift" width="14" height="11">');

    $(function () {
        if (location.href.indexOf($("#signin").attr("href")) != 0) return;

        var list = {};
        if (location.pathname.indexOf("/t/") >= 0) {
            $(".collection tr td [href^='https://barter.vg/i/']").each(function () {
                list[$(this).attr("href").match(/\d+/)[0]] = 1;
            });
            localStorage["tradableCache"] = JSON.stringify(list);
        }
        else if (location.pathname.indexOf("/l/") >= 0) {
            $(".collection tr td [href^='https://barter.vg/i/']").each(function () {
                list[$(this).attr("href").match(/\d+/)[0]] = 1;
            });
            localStorage["libraryCache"] = JSON.stringify(list);
        }
        else if (location.pathname.indexOf("/b/") >= 0) {
            $(".collection tr td [href^='https://barter.vg/i/']").each(function () {
                list[$(this).attr("href").match(/\d+/)[0]] = 1;
            });
            localStorage["blacklistCache"] = JSON.stringify(list);
        }

        if (location.pathname.indexOf("/e/") < 0) return;

        if (location.pathname.indexOf("/w/") >= 0) {
            $.each([
                $("<input />").attr({ type: "checkbox", value: "tradableCache", id: "e-select-tradable" }),
                $("<label />").attr({ for: "e-select-tradable" }).text(" tradable "),
                $("<input />").attr({ type: "checkbox", value: "blacklistCache", id: "e-select-blacklist" }),
                $("<label />").attr({ for: "e-select-blacklist" }).text(" blacklist "),
                $("<input />").attr({ type: "checkbox", value: "libraryCache", id: "e-select-library" }),
                $("<label />").attr({ for: "e-select-library" }).text(" library "),
                $("<input />").attr({ type: "checkbox", value: "unbundled", id: "e-select-unbundled" }),
                $("<label />").attr({ for: "e-select-unbundled" }).text(" unbundled or non-tradable "),
                $("<a />").text("Select Items").click(function () {
                    var targets = {};
                    var sort = $(".bold.sortAsc, .bold.sortDesc").first().text().toLowerCase();
                    var isBundleSort = sort.indexOf("bundle") >= 0;
                    var isTradableSort = sort.indexOf("tradable") >= 0;

                    $("input.e-select-items").each(function () {
                        if (!$(this).is(":checked")) return;
                        var key = $(this).attr("value");
                        if (key == "unbundled") {
                            var selector = ".collection td";
                            if (isBundleSort) {
                                selector += ":last-child";
                            } else if (isTradableSort) {
                                selector += ":nth-child(3)";
                            } else {
                                return;
                            }
                            $(selector).each(function () {
                                if ($(this).text() == "0") {
                                    var id = $(this).parents("tr").find("[href^='https://barter.vg/i/']").attr("href").match(/\d+/)[0];
                                    targets[id] = 1;
                                }
                            });
                        } else {
                            var s = localStorage[key];
                            if (s) {
                                $.extend(targets, JSON.parse(s));
                            }
                        }
                    });

                    $(".collection tr").each(function () {
                        var $link = $(this).find("[href^='https://barter.vg/i/']");
                        var barterLink = $link.attr("href");
                        if (barterLink && targets[barterLink.match(/\d+/)[0]]) {
                            var checkbox = $(this).find("input[name='edit[]']")[0];
                            checkbox.checked = true;
                            updateCheckedCount({ target: checkbox });
                        }
                    });
                }),
            ].reverse(), function () {
                $(this).addClass("e-select-items").insertAfter($("#selectToggle").next());
            });
        }

        $(".collection tr td input+label:not(.showMoreLabel)").each(function () {
            // exclude in label tag
            $(this).after($(this).find(".tag, ul"));

            $(this).parents("tr").attr("editfor", $(this).prev("input").attr("value"));

            // remove
            $('<span />').addClass("e-remove").text("[ - ]").appendTo($(this).parents("td"));

            // blacklist
            $('<span />').addClass("e-blacklist").text("☠").appendTo($(this).parents("td"));

            // store, qty
            var $right = $(this).parents("td").next("td");

            // store tag
            var $store = $right.find("img");
            if ($store.length == 0) {
                // no store tag
                $('<span />').addClass("e-store").text("?").appendTo($right);
            } else {
                $($store.parent("a")[0] || $store[0]).addClass("e-store");
            }
            $right.find("img[alt='gift link']").addClass("e-store-gift");

            // qty tag
            var $qty = $right.find("span:not(.e-store)");
            if ($qty.length == 0) {
                // no qty tag, means have one
                $('<span />').addClass("e-qty").text(" x1").appendTo($right);
            } else {
                $qty.addClass("e-qty").appendTo($right);
            }

            $(this).after('<span class="e-tag-new">➕?</span>');
        });

        function addToBlacklist(gameId, callback) {
            var data = {
                action: "Edit",
                change_attempted: 1,
                add_game_id: gameId,
                blacklist: "  Blacklist  ",
            };
            $.post("/i/" + gameId + "/", data, callback);
        }

        function removeItems(items, reason, callback) {
            var data = {
                action: "Edit",
                change_attempted: 1,
                "edit[]": items,
                reason: reason,
                remove:"- Remove Games",
            };

            if (!reason) {
                reason = 0;
            }

            data.reason = reason;

            $.post(location.href, data, callback);
        }

        function setStoreTag(items, store, callback) {
            var data = {
                action: "Set",
                change_attempted: 1,
                "edit[]": items,
                set: "Set",
                tagged: store,
            };

            $.post(location.href, data, callback);
        }

        function setQtyTag(items, qty, callback) {
            var data = {
                action: "Edit",
                change_attempted: 1,
                "edit[]": items,
                set: "Set",
                quantity: qty,
            };

            $.post(location.href, data, callback);
        }

        //
        // STORE
        //

        var $storeMenu = $("optgroup[label=Stores]").first().clone().appendTo("body");
        // fix long label
        $storeMenu.find("option[value='3,unrevealed,0']").text("HB, unreveraled key");
        $storeMenu.find("option").each(function () {
            var text = $(this).text();
            var value = $(this).attr("value");
            var $link = $('<a />')
            .attr("value", value)
            .append($('<span />').addClass('ui-icon').addClass('e-storeicon-' + value.split(",")[0]))
            .append($(this).text());
            $(this).replaceWith($('<li />').append($link));
        });
        $storeMenu.replaceWith($('<ul />').addClass("e-store-menu e-menu").html($storeMenu.html()));
        $storeMenu = $(".e-store-menu").menu();

        var $storeMenuCanceller = $("<div />").addClass("e-store-menu-canceller e-menu-canceller")
            .click(function (ev) {
            var $target = $(ev.target);
            if ($target.is(".e-store-menu-canceller")) {
                $storeMenu.attr("editfor", "").add($storeMenuCanceller).removeClass("shown");
            }
        }).appendTo("body");

        $(".e-store-menu").find("a").click(function () {
            var $target = $(this);
            var itemId = $target.parents("[editfor]").attr("editfor");
            var storeId = $target.attr("value").split(",")[0];
            var value = $(this).attr("value");
            setStoreTag(itemId, value, function () {
                var $item = $(".collection [editfor='" + itemId + "']");
                $item.find(".e-store").after(
                    $("<img />").attr({
                        title: $target.text(), alt: $target.text(),
                        src: storeIcons[storeId] || storeIcons[0],
                    })
                    .addClass("e-store")
                ).remove();

                $item.find(".e-store-gift").remove();
                if (value.split(",")[1].indexOf("link") >= 0) {
                    $item.find(".e-store").after($giftlinkIcon.clone());
                }
                $storeMenu.attr("editfor", "").add($storeMenuCanceller).removeClass("shown");
            });
        });

        // console.log($storeMenu);
        // -----------

        //
        // QTY
        //

        var $qtyMenu = $("<ul />").addClass("e-qty-menu e-menu").appendTo("body");
        for (var i = 0; i <= 50; i++) {
            $("<li />")
                .append($("<a />").attr("value", i).text(i))
                .appendTo($qtyMenu);
        }
        $qtyMenu.menu();

        var $qtyMenuCanceller = $("<div />").addClass("e-qty-menu-canceller e-menu-canceller").click(function (ev) {
            var $target = $(ev.target);
            if ($target.is(".e-qty-menu-canceller")) {
                $qtyMenu.attr("editfor", "").add($qtyMenuCanceller).removeClass("shown");
            }
        }).appendTo("body");

        $qtyMenu.find("a").click(function () {
            var $target = $(this);
            var editfor = $target.parents("[editfor]").attr("editfor");
            var value = $target.attr("value");
            setQtyTag(editfor, value, function () {
                $(".collection [editfor='" + editfor + "']").find(".e-qty").text(" x" + value);
                $qtyMenu.attr("editfor", "").add($qtyMenuCanceller).removeClass("shown");
            });
        });

        // ------------

        //
        // new tag
        //

        var $tagMenu = $("<ul />").addClass("e-tag-menu e-menu").appendTo("body");
        $tagMenu.menu();

        var $tagMenuCanceller = $("<div />").addClass("e-tag-menu-canceller e-menu-canceller").click(function (ev) {
            var $target = $(ev.target);
            if ($target.is(".e-tag-menu-canceller")) {
                $tagMenu.attr("editfor", "").add($tagMenuCanceller).removeClass("shown");
            }
        }).appendTo("body");

        $tagMenu.find("a").click(function () {
            var $target = $(this);
            var editfor = $target.parents("[editfor]").attr("editfor");
            var value = $target.attr("value");

            setTag(editfor, value, function () {
                $tagMenu.attr("editfor", "").add($tagMenuCanceller).removeClass("shown");
            });
        });

        // ------------

        var isRemoveBlock = false;
        $(".collection").click(function (ev) {
            var $target = $(ev.target);

            // remove single item
            if ($target.hasClass("e-remove")) {
                if (isRemoveBlock) {
                    alert("...");
                    return;
                }

                var editfor = $target.parents("tr").find("input[name^=edit]").attr("value");
                removeItems(editfor, function () {
                    $target.parents("tr").remove();
                });

                isRemoveBlock = true;
                setTimeout(function () {
                    isRemoveBlock = false;
                }, 2000);
                return;
            }

            if ($target.hasClass("e-blacklist")) {
                var gameId = $target.parents("td").find("[href^='https://barter.vg/i/']").attr("href").match(/\d+/)[0];
                addToBlacklist(gameId, function () {
                    $target.parents("tr").remove();
                });
            }

            // store tag
            if ($target.add($target.parent("a")).is(".e-store")) {
                // ignore store link
                ev.preventDefault();
                ev.isPropagationStopped();

                var editfor = $target.parents("[editfor]").attr("editfor");
                $storeMenu.attr("editfor", editfor).add($storeMenuCanceller).addClass("shown");
            }

            // qty tag
            if ($target.is(".e-qty")) {
                var offset = $target.offset();
                var editfor = $target.parents("[editfor]").attr("editfor");
                $qtyMenu.attr("editfor", editfor).css({
                    top: (offset.top + $target.height()) + "px",
                    left: offset.left + "px"
                }).add($qtyMenuCanceller).addClass("shown");
            }

            // tag
            if ($target.is(".e-tag-new")) {
                $tagMenu.add($tagMenuCanceller).addClass("shown");
            }
        });

        $(".collection .e-tag").on("mouseenter", function () {

        });
    });

    $("<style />").text(GM_getResourceText("jQueryUICSS")).appendTo("head");
    $("<style/>").text((function () {/*
span[class^='e-'], img[class^='e-'] { cursor: pointer; }
a.e-select-items { cursor: pointer; }
#e-select-tradable { margin-left: 12px; }
.e-remove { position: absolute; left: -3em; top: 50%; margin-top: -1em; color: red; }
.e-blacklist { position: absolute; right: -3em; top: 50%; margin-top: -1em; color: black; }
.e-tag-new { font-size: 12px; }
img.e-store { width: 16px; height: 16px; }
.ui-menu { z-index: 20; }
.ui-menu .ui-menu-item-wrapper { display: block; }
.ui-menu li { padding: 0; }
.e-menu-canceller {
    display: none;
    position: fixed;
    top: 0; left: 0; right: 0; bottom: 0;
    opacity: 0;
    transition: 0.2s opacity linear;
    z-index: 10;
}
.e-menu {
    display: none;
    opacity: 0;
    transition: 0.2s opacity linear;
    z-index: 20;
}
.e-store-menu-canceller { background: rgba(255,255,255,0.5); }
.e-store-menu {
    width: 800px; font-size: 12px; line-height: 1.5em;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
.e-store-menu.ui-menu .ui-menu-item { display: inline-block; width: 200px; }
.e-qty-menu {
    position: absolute;
    font-size: 12px;
    width: 100px;
    height: 180px;
    overflow-y: scroll;
    overflow-x: hidden;
}
.e-qty-menu.ui-menu .ui-menu-item-wrapper { padding: 0 0 0 1em; }
.e-menu-canceller.shown, .e-menu.shown { display: block; opacity: 1; }
*/}).toString().match(/[^]*\/\*([^]*)\*\/\}$/)[1]).appendTo("head");
    var iconsCss = "";
    for (var n in storeIcons) {
        iconsCss += ".e-storeicon-" + n + " { background-image: url('" + storeIcons[n] + "') !important; }\n";
    }
    $("<style />").text(iconsCss).appendTo("head");
    console.log("// Your code here...");
})();