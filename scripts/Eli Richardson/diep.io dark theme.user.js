// ==UserScript==
// @name        diep.io dark theme
// @version      007
// @description  dark them by 162893476, script by BlazingFire007
// @author       BlazingFire007 && 162893476
// @require  http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @match        http://diep.io/*
// @run-at         document-end
// @namespace https://greasyfork.org/users/49806
// ==/UserScript==
$(window).load(function () {
    input.set_convar("ren_stroke_soft_color_intensity", -10);
    input.set_convar("ren_background_color", 0);
    input.set_convar("ren_border_color_alpha", 1);
    input.set_convar("ren_solid_background", true);
    input.execute("ren_minimap_background_color 3289650");
    input.execute("ren_border_color 1315840");
    input.execute("net_replace_colors 986895 986895 4375 4375 1310720 590867 4634 857344 1315840 1508870 3350 1443095 1315840 28496 1315860 1310720 1445891 855309 0");
    input.execute("ui_replace_colors 339255 2045192 4000009 4011273 726590 2165566 4066343 4077343");
});