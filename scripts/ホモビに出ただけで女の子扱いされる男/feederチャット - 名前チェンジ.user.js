// ==UserScript==
// @name         feederチャット - 名前チェンジ
// @author       You
// @namespace    https://www.x-feeder.info/
// @version      0.5
// @description  入力フォームの上に名前変換が一発でできるボタンを追加します。感情によってアバターの画像変える人とかにオススメ。
// @match        http*://*.x-feeder.info/*/
// @grant        none
// ==/UserScript==
(() => {
  'use strict';
    const buttonHolder = $("<div>").prependTo($("#main_left"));
    const makeButton = (title, name) => { // title - ボタンのタイトル、　name - 変更する名前
        $("<button>",{text:title}).click(()=>{
            let Name = name;
            //Name = "{99:" + Name + "}"; // 一括チェンジ
            const elm = $("#post_form_name");
            const trip = elm.val().match(/\$.+/);
            if(trip) Name += trip;
            elm.val(Name);
            $('#post_btn').focus();
        }).appendTo(buttonHolder);
    };
    //config----(別の場所で編集して、それをここにコピペするといいかも。絵文字によってはその方法が有効な場合がある。)
    // makeButton("ボタンのタイトル","変更する名前");
makeButton("怒","😠");
makeButton("哀","😢");
makeButton("楽","😄");
makeButton("苦い","😖");
makeButton("ニコニコ","😊");
makeButton("鼻息","😤");
makeButton("しょんぼり","😔");
makeButton("病気","😷");
makeButton("赤ん坊","👶");
makeButton("号泣","😂");
makeButton("得意気","😏");
makeButton("無表情","😶");
makeButton("お道化る","😜");
makeButton("ガチギレ","😡");
makeButton("サングラス","😎");
makeButton("石油王","👳");
makeButton("昇天","😇");
makeButton("悪魔","😈");
    //config----
})();