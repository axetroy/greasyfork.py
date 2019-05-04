// ==UserScript==
// @name         Barter.vg, Selection
// @namespace    http://tampermonkey.net/
// @version      0.3.2
// @description  Toggle checkbox by list. There's need to access each page in advance.
// @author       You
// @match        https://barter.vg/u/*/t/e/*
// @match        https://barter.vg/u/*/w/e/*
// @match        https://barter.vg/u/*/c/e/*
// @match        https://barter.vg/u/*/b/e/*
// @match        https://barter.vg/u/*/t/
// @match        https://barter.vg/u/*/b/
// @match        https://barter.vg/u/*/l/
// @match        https://barter.vg/u/*/w/
// @match        https://barter.vg/u/*/c/
// @match        https://barter.vg/bundle/*
// @require      https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var $ = jQuery.noConflict();

    var isWishlist = location.pathname.indexOf("/w/") >= 0;
    var isTradable = location.pathname.indexOf("/t/") >= 0;
    var isBlacklist = location.pathname.indexOf("/b/") >= 0;
    var isScratchpad = location.pathname.indexOf("/c/") >= 0;
    var isLibrary = location.pathname.indexOf("/l/") >= 0;
    var isBundle = location.pathname.indexOf("/bundle/") >= 0;

    $(function () {
        //
        // save gamelist to cache
        //

        var list = {};
        // tradable
        if (location.pathname.indexOf("/t/") >= 0) {
            $(".collection tr td [href^='https://barter.vg/i/']").each(function () {
                list[$(this).attr("href").match(/\d+/)[0]] = 1;
            });
            localStorage["tradableCache"] = JSON.stringify(list);
        }
        // library
        else if (location.pathname.indexOf("/l/") >= 0) {
            $(".collection tr td [href^='https://barter.vg/i/']").each(function () {
                list[$(this).attr("href").match(/\d+/)[0]] = 1;
            });
            localStorage["libraryCache"] = JSON.stringify(list);
        }
        // blacklist
        else if (location.pathname.indexOf("/b/") >= 0) {
            $(".collection tr td [href^='https://barter.vg/i/']").each(function () {
                list[$(this).attr("href").match(/\d+/)[0]] = 1;
            });
            localStorage["blacklistCache"] = JSON.stringify(list);
        }
        // scrachpad
        else if (location.pathname.indexOf("/c/") >= 0) {
            $(".collection tr td [href^='https://barter.vg/i/']").each(function () {
                list[$(this).attr("href").match(/\d+/)[0]] = 1;
            });
            localStorage["scratchpadCache"] = JSON.stringify(list);
        }
        // wishlist
        else if (location.pathname.indexOf("/w/") >= 0) {
            $(".collection tr td [href^='https://barter.vg/i/']").each(function () {
                list[$(this).attr("href").match(/\d+/)[0]] = 1;
            });
            localStorage["wishlistCache"] = JSON.stringify(list);
        }

        // -----------

        // check whether edit page
        if (location.pathname.indexOf("/e/") < 0 && !isBundle) return;

        var sort, isBundleSort, isTradableSort;

        if (!isBundle) {
            sort = $(".bold.sortAsc, .bold.sortDesc").first().text().toLowerCase();

            isBundleSort = sort.indexOf("bundle") >= 0;
            isTradableSort = sort.indexOf("tradable") >= 0;
        }

        function onCheck () {
            var targets = {};
            var $target = $(this);
            if (!$target.is("input")) return;
            var isChecked = $target.is(":checked");

            //console.log($target, isChecked);

            var checkable = function (selector) {
                $(selector).each(function () {
                    if ($(this).text() == "0") {
                        var id = $(this).parents("tr").find("[href^='https://barter.vg/i/']").attr("href").match(/\d+/)[0];
                        targets[id] = 1;
                    }
                });
            }

            var key = $(this).val();
            //console.log(key);

            if (key == "unbundled") {
                if (isBundleSort) {
                    checkable(".collection td:last-child");
                }
            } else if (key == "nontradable") {
                if (isTradableSort) {
                    checkable(".collection td:nth-child(3)");
                }
            } else {
                var s = localStorage[key];
                if (s) {
                    $.extend(targets, JSON.parse(s));
                }
            }

            //console.log(targets);

            $(".collection tr").each(function () {
                var $link = $(this).find("[href^='https://barter.vg/i/']");
                if ($link.length == 0) return;

                var barterId = $link.attr("href").match(/\d+/)[0];
                //console.log(barterId);
                if (targets[barterId]) {
                    //console.log(barterId);
                    var checkbox = $(this).find("input[type='checkbox']")[0];
                    if (checkbox && checkbox.checked != isChecked) {
                        checkbox.checked = isChecked;
                        updateCheckedCount({ target: checkbox });
                    }

                    if (isBundle) {
                        $(this).removeClass("hidden-by-selection");
                    }
                } else {
                    if (isBundle) {
                        isChecked ? $(this).addClass("hidden-by-selection") : $(this).removeClass("hidden-by-selection");
                    }
                }
            });
        }

        //
        // custom selection
        //

        var inputList = [
            $("<input />").attr({ type: "radio", value: "tradableCache", id: "e-select-tradable" }),
            $("<label />").attr({ for: "e-select-tradable" }).text(" tradable "),
            $("<input />").attr({ type: "radio", value: "wishlistCache", id: "e-select-wishlist" }),
            $("<label />").attr({ for: "e-select-wishlist" }).text(" wishlist "),
            $("<input />").attr({ type: "radio", value: "blacklistCache", id: "e-select-blacklist" }),
            $("<label />").attr({ for: "e-select-blacklist" }).text(" blacklist "),
            $("<input />").attr({ type: "radio", value: "libraryCache", id: "e-select-library" }),
            $("<label />").attr({ for: "e-select-library" }).text(" library "),
            $("<input />").attr({ type: "radio", value: "scratchpadCache", id: "e-select-scratchpad" }),
            $("<label />").attr({ for: "e-select-scratchpad" }).text(" scratchpad "),
            $("<input />").attr({ type: "radio", value: "non-tradable", id: "e-select-nontradable" }),
            $("<label />").attr({ for: "e-select-nontradable" }).text(" non-tradable "),
            $("<input />").attr({ type: "radio", value: "unbundled", id: "e-select-unbundled" }),
            $("<label />").attr({ for: "e-select-unbundled" }).text(" unbundled "),
        ];

        $.each(inputList.reverse(), function () {
            if ($(this).is("input")) {
                $(this).attr("name", "selectTarget");
            }

            $(this)
                .addClass("e-select-items")
                .insertAfter(isBundle ? ".counts" : $("#selectToggle").next())
                .click(onCheck);
        });

        if (isTradable) {
            $("#e-select-tradable, #e-select-tradable+label").hide();
        }
        if (isWishlist) {
            $("#e-select-wishlist, #e-select-wishlist+label").hide();
        }
        if (isBlacklist) {
            $("#e-select-blacklist, #e-select-blacklist+label").hide();
        }
        if (isScratchpad) {
            $("#e-select-scratchpad, #e-select-scratchpad+label").hide();
        }
        if (!isBundleSort) {
            $("#e-select-unbundled, #e-select-unbundled+label").hide();
        }
        if (!isTradableSort) {
            $("#e-select-nontradable, #e-select-nontradable+label").hide();
        }

        $("<style />")
            .text(".hidden-by-selection, .hidden-by-selection + tr { display: none; }")
            .appendTo("head");
    });
    // Your code here...
})();