// ==UserScript==
// @name         QQmusic playlist Input
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  try to take over the world!
// @author       ShirleyM
// @match        https://y.qq.com/n/yqq/playlist/*
// @grant        none
// ==/UserScript==

(function() {
   var sing = document.getElementsByClassName("js_song");
var singer = document.getElementsByClassName("singer_name");
var deletedata = document.getElementsByClassName("songlist__song_txt");
var data = new Array;
var inputbox = document.getElementById("album_desc");
var rxg = /\(.*\)/;
var parent = document.getElementsByClassName("data__actions");
parent[0].insertAdjacentHTML("beforeend", "<div id='Shirleym_input' class='mod_btn'>导出歌单</div>");
document.getElementById("Shirleym_input").addEventListener("click", function() {
    input();
});

function input() {
    inputbox.style.display = "";
    for (var i = 0; i < deletedata.length; i++) {
        deletedata[i].innerHTML = "";
    }
     inputbox.insertAdjacentText("beforeend", "<so>");
    for (var i = 0; i < sing.length; i++) {
        sing[i].innerText.replace(rxg, "");
        singer[i].innerText.replace(rxg, "");
        data[i] = `<so name = "${sing[i].innerText}" artist="${singer[i].innerText}"></so>`;
        console.log(data[i]);
        inputbox.insertAdjacentText("beforeend", data[i]);
    }
     inputbox.insertAdjacentText("beforeend", "</so>");
}
})();