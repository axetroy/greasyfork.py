// ==UserScript==
// @name        Rounds Info
// @include     https://www.erepublik.com/*/military/campaigns*
// @version     1
// @grant       none
// @description Shows battles round number
// @namespace https://greasyfork.org/users/2402
// ==/UserScript==
var $ = jQuery;

$(document).ready(function() {
    $.ajax({
        url: "/en/military/campaigns-new/",
    })
        .done(function(b) {
        var r = $.parseJSON(b);
        $.each(r.battles, function(i, c) {
            $("span:contains('" + c.region.name + "')").text("(" + c.zone_id + ") " + c.region.name);
        })
    })
});
