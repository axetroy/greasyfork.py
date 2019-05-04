// ==UserScript==
// @name         Kisssub Diy
// @namespace    沉冰浮水.tk
// @version      0.1
// @description  自用脚本备份
// @author       沉冰浮水
// @match        http://www.kisssub.org/*
// @match        https://www.kisssub.org/*
// @grant        none
// ==/UserScript==

(function() {
  'use strict';

  function text(e) {
    var t = '';
    e = e.childNodes || e;
    for (var j = 0; j < e.length; j++) {
      if (e[j].nodeType === 8) {
        continue;
      }
      t += e[j].nodeType != 1 ?
        e[j].nodeValue : text(e[j].childNodes);
    }
    return t;
  }
  function $n(e) {
    return document.querySelector(e);
  }
  function $na(e) {
    return document.querySelectorAll(e);
  }
  window.addEventListener('load', function () {
    var newname = document.title.replace(/\[风车字幕组\]\[(名侦探柯南)\]\[(\d+)\]\[([^\[]+)\].+/, '$1.第$2话_$3.mp4');
    newname = newname.replace(/ - 爱恋动漫BT下载/, "");
    console.log(document.title);
    console.log(newname); //document.getElementsByClassName("main")[4].innerHTML = newname;
    document.getElementById('download').href= document.getElementById('download').href.replace(/\[.+$/, newname);
    //document.getElementById('download').setAttribute("download",newname + ".torrent");
    document.getElementById('topsearch').value = newname;
    // $n(".box .intro.basic_info").innerHTML = "";
    $n("#topsearch").parentNode.insertBefore($n(".box .intro.basic_info"), $n(".topsearch #topsearch"));
  });
})();