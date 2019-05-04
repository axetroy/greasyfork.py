// ==UserScript==
// @name         ピクトセンス - キャンバスの画像を保存
// @namespace    http://tampermonkey.net/
// @version      0.21
// @description  現在のキャンバスの画像を保存します。
// @author       You
// @match        https://pictsense.com/*
// @grant        none
// ==/UserScript==

(() => {
    'use strict';

    const add_button = (_name, _func) => {
        const elm = document.createElement("button");
        elm.innerHTML = _name;
        elm.addEventListener('click', _func);
        const p = document.createElement("p");
        p.append(elm);
        document.getElementById("leaveButton").parentNode.append(p);
    }

    const get_room_name = () => {
        const url = location.href;
        const host = location.hostname;
        const dr_id = url.slice( url.indexOf(host) + host.length + "/#!/".length );
        const elms = document.getElementById("publicRoomList").getElementsByTagName("li");
        for(let i = 0; i < elms.length; i++) if( elms[i].dataset.roomid === dr_id ) return elms[i].getElementsByTagName("li")[1].innerText;
        return document.getElementById("roomName").value;
    }

    add_button("キャンバスの画像を保存", () => {
        const a = document.createElement("a");
        a.href = document.getElementById("canvas").toDataURL();
        a.download = `pictsense ${get_room_name()}.png`;
        a.click();
    });
})();