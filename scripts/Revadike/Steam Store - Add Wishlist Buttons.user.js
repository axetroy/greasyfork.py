// ==UserScript==
// @name         Steam Store - Add Wishlist Buttons
// @namespace    Royalgamer06
// @version      0.1
// @description  Adds Wishlist Buttons to Steam Store
// @author       Royalgamer06
// @match        *://store.steampowered.com/sale/*
// @grant        none
// ==/UserScript==

jQuery(".sale_page_purchase_item").each(function() {
    let appid = jQuery(this).attr("data-ds-appid");
    jQuery(this).find(".game_purchase_action").prepend("<div id=\"add_to_wishlist_area_" + appid + "\" class=\"game_purchase_action_bg\" style=\"\"><a class=\"btnv6_blue_hoverfade btn_medium\" href=\"javascript:AddToWishlist( " + appid + ", 'add_to_wishlist_area_" + appid + "', 'add_to_wishlist_area_success_" + appid + "', 'add_to_wishlist_area_fail_" + appid + "', '' );\" data-store-tooltip=\"Add this product to your wishlist.\" data-external=\"true\"><span>Add to your wishlist</span></a></div>").prepend("<div id=\"add_to_wishlist_area_success_" + appid + "\" style=\"display: none;\" class=\"game_purchase_action_bg\"><a href=\"http://steamcommunity.com/my/wishlist\" class=\"btnv6_blue_hoverfade btn_medium queue_btn_active\" data-store-tooltip=\"This product is already on your wishlist. Click to view your wishlist.\" data-external=\"true\"><span><img src=\"http://store.akamai.steamstatic.com/public/images/v6/ico/ico_selected.png\" border=\"0\" class=\"es-in-wl\"> On Wishlist</span></a></div>").prepend("<div id=\"add_to_wishlist_area_fail_" + appid + "\" style=\"display: none;\"><b>Oops, sorry!</b></div>");
});