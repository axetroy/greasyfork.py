// ==UserScript==
// @name         feeder-chat-libraryを使用したサンプル
// @author       You
// @namespace    https://www.x-feeder.info/
// @version      0.2
// @description  投稿欄に調べたい投稿番号を入力して、[feeder-chat-libraryを使用したサンプル]を押すと色々調べられる。現在表示されている投稿しか効果がないので注意！
// @match        http*://*.x-feeder.info/*/
// @require      https://greasyfork.org/scripts/373658-feeder-chat-library/code/feeder-chat-library.js?version=680408
// @grant        none
// ==/UserScript==
(function () {
  'use strict';
    const feeder = new Feeder_Chat_Library()
    const say = ( _text ) => {
        const elm = $('#' + activeForm)
        elm.val(_text)
        $("#post_btn").click()
    }
    const main = () => {
          const elm =  $('#' + activeForm)
          const n = elm.val()
          let str = "";
          const p = feeder.getPostInfo(n)
          str += "投稿番号：" + n +"\n"
          str += "投稿者名：" + p.name +"\n"
          str += "発言内容：" + p.text +"\n"
          str += "投稿時間：" + p.time +"\n"
          str += "トリップ：" + p.trip +"\n"
          const id = feeder.getPostId()
          str += "一番上の投稿番号：" + id.top +"\n"
          str += "一番下の投稿番号：" + id.btm +"\n"
          const ol = feeder.getRoomInfo()
          str += "部屋のURLのFeeder ID：" + ol.url + "\n"
          str += "現在のオンライン数：" + ol.online + "\n"
          str += "オンライン上での自分の名前：" + ol.my_name + "\n"
          str += "これは私ですか？：" + (ol.my_name === p.name) +"\n"
          say(str)
    }
     $('<button>',{text:"feeder-chat-libraryを使用したサンプル"}).click(main).prependTo($('#post_btn').parent())
})();