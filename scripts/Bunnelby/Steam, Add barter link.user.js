// ==UserScript==
// @name         Steam, Add barter link
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://store.steampowered.com/app/*
// @grant        none
// @runat        document-end
// @nowrap
// ==/UserScript==

(function() {
    'use strict';
    jQuery(function ($) {
        var makeButton = function (label, href) {
            $("<div />")
                .addClass(".queue_control_button")
                .css({ display: "inline-block", marginLeft: "3px" })
                .append($("<a />")
                        .attr({ target: "_blank", href: href })
                        .addClass("btnv6_blue_hoverfade btn_medium queue_btn_inactive")
                        .append("<span>" + label + "</span>"))
                .insertAfter(".queue_control_button:last");
        };
        makeButton("Barter.vg", "https://barter.vg/search?q=" + $(".apphub_AppName").text());
    });
    // Your code here...
    // .toString().match(/[^]*\/\*([^]*)\*\/\}$/)[1];
})();