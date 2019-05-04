// ==UserScript==
// @name 10ms
// @namespace Violentmonkey Scripts
// @grant none
// @version 1.1.2
// @description by Ferss
// ==/UserScript==
javascript: ( function (){ function count() { var t = $('#serverTime').html().match(/\d+/g); var d = $('#godzina_wyjscia')[0].value.match(/\d+/g); if (t[0] == d[0] && t[1] == d[1] && t[2] == d[2]) { var ms = $('#ms_wyjscia')[0].value.match(/\d+/g)[0]; if (ms >= 1000) { ms = 0; } setTimeout(function(){ $("#troop_confirm_go")[0].click(); }, ms); } } span = document.getElementById("serverTime"); $("#serverTime").on('DOMSubtreeModified', function () { count(); }); var elem = "<div class='vis vis_item' style='overflow: auto; height: 30px;'><table width='100%'>"; elem+= "<tr>"; elem += "<td width='10%'>Wys%C5%82a%C4%87 o:</td>"; elem += "<td><input size=8 type='text' value='' id='godzina_wyjscia'/></td>"; elem += "</tr>"; elem+= "<tr>"; elem += "<td width='10%'>MS</td>"; elem += "<td><input size=8 type='text' value='0' id='ms_wyjscia'/></td>"; elem += "</tr>"; elem+= "</table></div>"; $("#contentContainer").prepend(elem); $("#godzina_wyjscia").on('change', function(){ x = this.value.match(/\d+/g); this.value = x[0] + ':' + x[1] + ':' + x[2]; }); } )();