// ==UserScript==
// @name        Lagkadeo
// @namespace   Minienzoo
// @description Reduce el lag en Arkadeo
// @include     *arkadeo.com/game/play/*
// @include     *arkadeo.com/league/play/*
// @include     *arkadeo.com/mission/play/*
// @include     *arkadeo.com/g/*/attack/*
// @include     *arkadeo.com/g/*/defend/*
// @version     1.1
// @grant       none
// ==/UserScript==
$("#game1,#game2,#game3,#game4,#game5,#game6,#game7,#game8,#game9,#game10,#game11,#game12,#game13,#game14,#game15,#game16,#game17,#game18,#game19,#game20").attr({
   'src': '//data-arkadeo.twinoid.com/swf/loader.swf?v=161',
   'quality': 'low',
})
$(".playNfo,#footer,#tid_bar_down,.mini").hide()
$("#gameLoader").attr({
   "style": "margin: 0 auto !important; box-shadow: none;"
})
$("#gameLoader").css({
   width: "602px",
   padding: "0",
   border: "1px solid #000",
   boxShadow: "0",
   borderRadius: "0",
})
//antispam
$("#gameSection").append('<div id=antispam></div>')
$("#antispam").append('<p class="titu">Clickea en el sobre para desactivar las notificaciones<br>Cliquez sur la lettre pour désactiver les notifications</p>')
$("#antispam").append('<a class="nonoti" href="?=%"></a>')
$(".nonoti").append('<img class="nonotibotton" src="http://imgup.motion-twin.com/twinoid/b/3/9b1e7180_1373479.jpg"></img>')
$("#antispam").css({
   width: "602px",
   height: "35px",
   margin: "0px auto",
   backgroundColor: "#5e5e5e",
   border: "1px solid #000",
   borderTop: "0px",
})
$(".nonotibotton").css({
  borderRight: "1px solid #000",
  height: "35px",
  width: "35px",
  backgroundColor: "#333",
})
$(".titu").css({
  fontSize: "15px",
  lineHeight: "15px",
  color: "#a9a9a9",
  margin: "0px 42px",
  position: "absolute",
})
//antispam
$(".habillage_bot").css({
  backgroundImage: "none",
})
$("body").css({
  backgroundColor: "#ddd",
})
$("#header").css({
  height: "auto",
})
$("#main").css({
  margin: "5px 0px 0px",
})