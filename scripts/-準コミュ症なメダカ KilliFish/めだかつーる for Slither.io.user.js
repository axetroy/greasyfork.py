// ==UserScript==
// @name            めだかつーる for Slither.io
// @name:en         めだかつーる[medakatool] for Slither.io
// @namespace       http://medakatitti.webcrow.jp/
// @version         0.1
// @description     slither.ioの名前を保存してくれます！
// @description:en  save slither.io name
// @author          めだかちっち Twitter: @agar_medaka
// @match           http://slither.io/*
// @run-at          document-start
// @require         https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js
// @grant           none
// ==/UserScript==

window.onload = function() {
  saveName();
  setName();
};

  var ls = localStorage;

  function saveName() {
    $('.nsi').click(function() {
      ls.setItem("name", $("#nick").val());
    });
  }

  var a = window.localStorage.getItem("name");

  function setName() {
    console.log(a);
    $("#nick").val(a);
  }
