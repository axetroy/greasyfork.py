// ==UserScript==
// @name         My contributions
// @version      0.21
// @description  List all your contributions
// @author       You
// @include      /^https:\/\/www\.erepublik\.com\/[a-z]{2}$/
// @grant        none
// @namespace https://greasyfork.org/users/2402
// ==/UserScript==

var $ = jQuery;

function style(t) {
	$("head").append("<style>" + t + "</style>");
}

function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
}

var img_country = {
    Romania: 1,
    Brazil: 9,
    Italy: 10,
    France: 11,
    Germany: 12,
    Hungary: 13,
    China: 14,
    Spain: 15,
    Canada: 23,
    USA: 24,
    Mexico: 26,
    Argentina: 27,
    Venezuela: 28,
    "United-Kingdom": 29,
    Switzerland: 30,
    Netherlands: 31,
    Belgium: 32,
    Austria: 33,
    "Czech-Republic": 34,
    Poland: 35,
    Slovakia: 36,
    Norway: 37,
    Sweden: 38,
    Finland: 39,
    Ukraine: 40,
    Russia: 41,
    Bulgaria: 42,
    Turkey: 43,
    Greece: 44,
    Japan: 45,
    "South-Korea": 47,
    India: 48,
    Indonesia: 49,
    Australia: 50,
    "South-Africa": 51,
    "Republic-of-Moldova": 52,
    Portugal: 53,
    Ireland: 54,
    Denmark: 55,
    Iran: 56,
    Pakistan: 57,
    Israel: 58,
    Thailand: 59,
    Slovenia: 61,
    Croatia: 63,
    Chile: 64,
    Serbia: 65,
    Malaysia: 66,
    Philippines: 67,
    Singapore: 68,
    "Bosnia-Herzegovina": 69,
    Estonia: 70,
    Latvia: 71,
    Lithuania: 72,
    "North-Korea": 73,
    Uruguay: 74,
    Paraguay: 75,
    Bolivia: 76,
    Peru: 77,
    Colombia: 78,
    "Republic-of-Macedonia-FYROM": 79,
    Montenegro: 80,
    "Republic-of-China-Taiwan": 81,
    Cyprus: 82,
    Belarus: 83,
    "New-Zealand": 84,
    "Saudi-Arabia": 164,
    Egypt: 165,
    "United-Arab-Emirates": 166,
    Albania: 167,
    Georgia: 168,
    Armenia: 169,
    Nigeria: 170,
    Cuba: 171
};


(function() {
    'use strict';
    style("#mybattles{z-index: 99999; position: absolute; top: 0; left: 0;margin: 7px;padding: 5px;border-radius: 3px;font-size: 11px;background-color:rgba(255,255,255,0.8);border:1px solid #999;box-shadow: 1px 1px 8px #aaaaaa;};");
    style("#mybattles img{vertical-align: text-bottom;}");
    $.ajax({
		url : "/en/military/campaigns-new",
	})
	.done(function (b) {
		var r = $.parseJSON(b);
        $("body").after("<div id='mybattles'></div>");
		$.each(r.citizen_contribution, function (i, e) {
            var country = getKeyByValue(img_country, e.side_country_id);
            var flag = "<img src='https://www.erepublik.net/images/flags_png/S/" + country + ".png' alt=''>";
            $('#mybattles').append("<div><a href='https://erepublik.com/en/military/battlefield/" + e.battle_id + "'>" + flag + " D"+ e.division + ", " + r.battles[e.battle_id].region.name + "</a></div>");
        });
    });
})();