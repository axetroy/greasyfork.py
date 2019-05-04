// ==UserScript==
// @name         SporzaNoSoccer
// @namespace    http://wimgodden.be/
// @version      1.51
// @description  Remove football (soccer for Americans) from Sporza.be and Deredactie.be
// @author       Wim Godden <wim@cu.be>
// @match        https://sporza.be/*
// @grant        none
// ==/UserScript==

add_jQuery (removeSoccer, "1.7.2");

function add_jQuery (callbackFn, jqVersion) {
    jqVersion = jqVersion || "1.7.2";
    var D = document;
    var targ = D.getElementsByTagName ('head')[0] || D.body || D.documentElement;
    var scriptNode = D.createElement ('script');
    scriptNode.src = 'https://ajax.googleapis.com/ajax/libs/jquery/'
                    + jqVersion
                    + '/jquery.min.js'
                    ;
    scriptNode.addEventListener ("load", function () {
        var scriptNode = D.createElement ("script");
        scriptNode.textContent =
            'var gm_jQuery  = jQuery.noConflict (true);\n'
            + '(' + callbackFn.toString () + ')(gm_jQuery);'
        ;
        targ.appendChild (scriptNode);
    }, false);
    targ.appendChild (scriptNode);
}

function removeSoccer($) {
    'use strict';
    var soccerElements = [
        'alle-doelpunten',
        'football',
        'fifa-wk-voetbal-2018',
        'champioensleaguetheme',
        'ek-2016',
        'euro-2016',
        'ek-france-theme',
        'rodedijvelstheme',
        'jupiler-pro-league',
        'voetbal',
        'rode duivels',
        'Rode Duivels',
        'Voetbal',
        'Europa League',
        'Messi',
        'Meunier',
        'Witsel',
        'Coucke',
        'Champions League',
        'Buitenland',
        'Jupiler Pro League',
        'red flames',
        'Red Flames',
        'vrouwen',
        'Anderlecht',
        'Club Brugge',
        'Duivelsgekte',
        'wereldkampioenen',
        'Villa Sporza',
        'de kijkersvraag voor een rode duivel',
        'jupiler pro league',
        'Extra Time',
        'Real Madrid',
        'Liverpool',
        'Silva',
        'De Bruyne',
        'Juventus',
        'Ronaldo',
        'AC Milan',
        'Atletico',
        'Real Madrid',
        'Barça',
        "Preud'homme",
        'Ajax',
        'jplacties',
        'KV Mechelen',
        'Mourinho',
        'Beker van België',
        'Abdelhak',
        'KV Oostende',
        'KV Mechelen',
        'Kompany',
        'KV Kortrijk',
        'Standard',
        'Neymar',
        'tackle',
        'JPL',
        'jpl goals',
        'Antwerp',
        'Pereira',
        'Balotelli',
        'Casteels',
        'Franse ploeg',
        'Alderweireld',
        'Nederland',
        'Internationaal',
        'Courtois',
        'Lagere klassen',
        'Eerste Klasse b',
        'Les Bleus',
        'Nations League',
        'Beker van belgie',
        'Beckham',
        'Bundesliga',
        'Pochettino',
        'Premier League',
        'Ligue 1',
        'Eerste Klasse B',
        'Serie A',
        'Primera Division',
        'de Duivels',
        'de Rode Duivels'
    ];

    $(".matchdays").hide();

    soccerElements.forEach(function(element) {
        $("." + element).hide();
        $(".vrt-title--section:contains('" + element + "')").parent().parent().hide();
        $("h2:contains('" + element + "')").parent().parent().hide();
        $("section div h2:contains('" + element + "')").parent().parent().hide();
        $(".article-teaser div div div:contains('" + element + "')").parent().parent().parent().remove();
        $("section div span:contains('" + element + "')").parent().parent().hide();
        $("article div span:contains('" + element + "')").parent().parent().parent().parent().parent().hide();
        $(".article-teaser div div p:contains('" + element + "')").parent().parent().parent().remove();

        var links = document.evaluate('//a[contains(@href, "' + element + '")]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
        for (var j = 0; j < links.snapshotLength; j++) {
            var link = links.snapshotItem(j);
            link.parentNode.removeChild(link);
        }
    });

    $("img:contains('polopoly_fs/1.2672806!image/1568165166.jpg')").hide();
    
    var snapEKImages = document.evaluate("//img[contains(@src,'1568165166')]",
		document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    for (var i = snapEKImages.snapshotLength - 1; i >= 0; i--) {
		var elm = snapEKImages.snapshotItem(i);
        elm.parentNode.parentNode.parentNode.parentNode.style.display='none';
	}
}