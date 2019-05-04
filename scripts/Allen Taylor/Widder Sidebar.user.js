// ==UserScript==
// @name         Widder Sidebar
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  try to make a better world!
// @author       Allen Zhou
// @require      http://code.jquery.com/jquery-1.12.4.js
// @match        http://10.110.92.241:*/docs/*
// @grant        none
// ==/UserScript==
this.jQuery = jQuery.noConflict(true);
jQuery(function() {
    'use strict';
    var sidebar_width = Number.parseInt(jQuery('.sidebar').css('width').slice(0,-2));
    var container_width = Number.parseInt(jQuery('.container').css('width').slice(0,-2));
    sidebar_width += 100;
    container_width -= 100;
    jQuery('.sidebar').css('width',sidebar_width);
    jQuery('.container').css('width',container_width);
    jQuery('#api-dropdown li:contains("v1 >")').each(function(i, o){ var html = jQuery(o).find('a').html();  jQuery(o).find('a').html(html.slice(8));});
    //初始化查询
    jQuery('div[id$=_modal]').each(function(i,o){jQuery(o).find(".modal-footer").clone().insertBefore(jQuery(o).find(".modal-body"))});
    jQuery('input[name="limit"]').val(5);
    jQuery('input[name="offset"]').val(0);
});