// ==UserScript==
// @name            Joe's EditorTools for Popmundo
// @namespace       http://popmundo-diaries.com/
// @Author          Joe Isaacs CharId #3248185 <joe.isaacs.pm@gmail.com>
// @description     Prevents loss of changes in It's Pop articles
// @version         1.0
// @include         http://*.popmundo.com/Special/ED/Popmundo.aspx/EditArticle/*
// @require         https://greasyfork.org/scripts/10938-etfunctions/code/etFunctions.js
// @require         https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// @grant           GM_info
// ==/UserScript==

//jQuery
var jisQuery = jQuery.noConflict();

var script = document.createElement( "script" );
script.type = "text/javascript";
script.src = "https://greasyfork.org/scripts/10938-etfunctions/code/etFunctions.js";
jisQuery( "head" ).append( script );

jisQuery( '#ctl00_cphLeftColumn_ctl00_txtTitle' ).attr("onchange","_etChanged = true;");
jisQuery( '#ctl00_cphLeftColumn_ctl00_txtPreamble' ).attr("onchange","_etChanged = true;");
jisQuery( '#ctl00_cphLeftColumn_ctl00_txtText' ).attr("onchange","_etChanged = true;");
jisQuery( '#ctl00_cphLeftColumn_ctl00_btnSave' ).attr("onclick","_etChanged = false;");
jisQuery( '#aspnetForm' ).attr("onsubmit","return etOnSubmit();");
jisQuery( '#ctl00_cphLeftColumn_ctl00_txtPublishDate' ).attr("onfocus","etChangeDate('ctl00_cphLeftColumn_ctl00_txtPublishDate');");