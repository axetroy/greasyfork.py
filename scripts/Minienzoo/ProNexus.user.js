// ==UserScript==
// @name        ProNexus
// @namespace   Minienzoo
// @description Quitá la sección de noticias y usá toda la página para el nexus, tanto en Twinoid como en Muxxu 
// @include     https://twinoid.com/*
// @include     http://twinoid.com/*
// @include     https://muxxu.com/*
// @include     http://muxxu.com/*
// @exclude     https://twinoid.com/user/*
// @exclude     http://twinoid.com/user/*
// @version     1.5
// @grant       none
// ==/UserScript==
$(".newsColumn").hide() 
$(".leftColumn").css({
  width: "980px",
  border: "0px",
  boxShadow: "0px 0px 2px -1px #000",
})
$(".title").css({
  margin: "15px 0px 15px ",
})
$(".sub").hide()
$(".tid_embedContent").css({
  borderTop: "0px",
  margin: "0px 0px 0px",
  paddingTop: "0px",
})
$(".tid_embedLink").hide()
$(".tid_newGame").hide()

// Para Muxxu
$(".right").hide()