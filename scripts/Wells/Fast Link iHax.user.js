// ==UserScript==
// @name         Fast Link iHax
// @namespace    http://www.ihax.fr/
// @version      1.3.2
// @description  ------------------------------
// @author       Marentdu93 & Wells
// @match        http://www.ihax.fr/*
// @grant        none
// ==/UserScript==
​
$('#taigachat_full').find('.nodeTitle').append('<div id="AddFastLink4" onclick="AddFastLink();" style="margin-top: 1px;font-style:none;float:right;cursor:pointer;right: 0.5%;position: relative;" class="fa fa-plus"></div><div id="RemoveFastLink" onclick="RemoveFastLink();" style="margin-top: 1px;font-style:none;float:right;cursor:pointer;right: 1%;position: relative;" class="fa fa-minus"></div>');
$('body').append('<script type="text/javascript"src="https://rawgit.com/maretdu93/Colora/master/NewFastLinkGooodeee.js"></script>');