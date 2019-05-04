// ==UserScript==
// @name         feederチャット - 引用と文字装飾のみ回避させる
// @author       SNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNN姉貴
// @version      0.1
// @description  ボタンを押すと引用「>>」と文字装飾「''太字''%%取消%%」を回避させる。
// @match        *.x-feeder.info/*/
// @exclude      *.x-feeder.info/*/*/*
// @grant        none
// @namespace https://greasyfork.org/users/203557
// ==/UserScript==
( () => {
  'use strict'
    const main = () => {
        const elm =  $('#' + activeForm);
        [">","'","%"].forEach((c)=>{elm.val(elm.val().replace(new RegExp(c,"g"), c + '\0'))});
        $('#post_btn').focus();
    };
    $('<button>',{text:"引用と文字装飾を回避"}).click(main).appendTo($('#post_btn').parent());
})();