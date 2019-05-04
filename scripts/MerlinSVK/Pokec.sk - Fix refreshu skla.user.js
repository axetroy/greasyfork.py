// ==UserScript==
// @name           Pokec.sk - Fix refreshu skla
// @description    Tento skript zamedzi neziadanemu refreshovaniu skla
// @namespace      Pokec.sk
// @include        http://pokec-sklo.azet.sk/miestnost/*
// @date           2017-09-15
// @author         MerlinSVK
// @icon           http://s.aimg.sk/pokec_base/css/favicon.ico
// @version        1.0
// @license        MIT
// ==/UserScript==


function antiRefresh()
{
    if (document.getElementById("antiRefreshMod") === null) {
        var antiRefreshMod = '$(window).off("popstate")';
        var script = document.createElement("script");
        script.id = "antiRefreshMod";
        script.appendChild(document.createTextNode(antiRefreshMod));
        (document.body || document.head || document.documentElement).appendChild(script);
    }
}

$(document).ready(antiRefresh);