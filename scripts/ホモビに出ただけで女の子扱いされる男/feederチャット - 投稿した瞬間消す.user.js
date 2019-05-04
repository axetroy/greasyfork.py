// ==UserScript==
// @name         feederチャット - 投稿した瞬間消す
// @author       超早口おばさん
// @namespace    https://www.x-feeder.info/
// @version      0.1
// @description  ボタンを押すと投稿した瞬間消すモードになります。
// @match        *.x-feeder.info/*/
// @grant        none
// ==/UserScript==
(() => {
    let flag = !false;
    const copy = window.postFeed;
    window.postFeed = () => {
        copy();
        setTimeout(()=>{
            if(!flag) return;
            const copy2 = window.confirm;
            window.confirm = () => {
                return true;
            };
            $(".remove_icon").first().click();
            window.confirm = copy2;
        }, 500);
    };
    const btn = $('<button>').click(()=>{
        flag = !flag;
        if(flag) btn.text("投稿した瞬間消すON");
        else btn.text("投稿した瞬間消すOFF")
    }).appendTo($('#post_btn').parent());
    btn.click();
})();