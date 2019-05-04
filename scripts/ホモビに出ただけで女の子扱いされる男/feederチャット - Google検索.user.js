// ==UserScript==
// @name         feederチャット - Google検索
// @namespace    http://tampermonkey.net/
// @version      0.8
// @description  Google検索機能を追加する。
// @author       You
// @match        http*://*.x-feeder.info/*/
// @require      https://greasyfork.org/scripts/382269-encyclopedia/code/Encyclopedia.js?version=692987
// @grant        GM.xmlHttpRequest
// ==/UserScript==
(() => {
  'use strict';
    const WAIT_TIME = 5500; // 連続アクセス防止待機時間（連続アクセスをやりすぎるとgoogleからロボット認定されます。）
    Encyclopedia.set(1500); // set wait_time -> to avoid google restriction
    const say = (str) => {
        result_elm.empty().css("color","black").append("★検索結果");
        const array = str.split("\n");
        for(const text of array){
            result_elm.append("<br>");
            result_elm.append(text);
        }
    };
    const shapeStr = (str) => {
        return str.replace(/\n+/g,'\n').replace(/^(\n| )+|(\n| )+$/g,'').match(/^(.|\n)+?。(\n| |$)/)[0];
    };
    Encyclopedia.regist({ // ウィキペディア
            URL: "https://ja.wikipedia.org/wiki",
            randomURL: "https://ja.wikipedia.org/wiki/特別:おまかせ表示",
            callback: (response)=> {
                const html = $(response).find('.mw-parser-output');
                html.find('div').remove();
                html.find('.toc').remove();
                html.find('table').remove();
                html.find('sup').remove();
                html.find('img').remove();
                html.find('.noprint').remove();
                html.find('.mw-editsection').remove();
                html.find('.mw-ui-icon').remove();
                say(shapeStr(html.text()));
            }
        });
    Encyclopedia.regist({ // ニコニコ大百科
            URL: "https://dic.nicovideo.jp/a",
            randomURL: "https://dic.nicovideo.jp/random/a",
            callback: (response)=> {
                const html = $(response).find("#article");
                html.find('div').remove();
                html.find('ul').remove();
                html.find('table').remove();
                html.find(".dic").remove()
                say(shapeStr(html.text()));
            }
        });
    Encyclopedia.regist({ // ピクシブ百科事典
            URL: "https://dic.pixiv.net/a",
            callback: (response)=> {
                say(shapeStr($(response).find(".summary").text()));
            }
        });
    const input_elm = $("<input>")
    .attr('placeholder','Enterで検索')
    .keypress(e=>{if(e.key==="Enter")main();});
    let wait_flag = false;
    const countdown = () => {
        const result_log = result_elm.text();
        const start_time = new Date().getTime();
        const repeat = () => {
            const time = WAIT_TIME - (new Date().getTime() - start_time);
            if(0 <= time) time_elm.text(time);
            if(wait_flag) setTimeout(repeat,1);
            else {
                time_elm.text(0);
                const result_log2 = result_elm.text();
                if(result_log === result_log2) result_elm.text("一致する情報は見つかりませんでした。").css("color","red");
            }
        };
        repeat();
    };
    const main = (flag_str) => {
        if(wait_flag) return;
        wait_flag = true;
        countdown();
        setTimeout(()=>{wait_flag = false;}, WAIT_TIME);
        if(flag_str === "random") return Encyclopedia.search();
        const str = input_elm.val();
        if(!str.length) return;
        Encyclopedia.search(str);
    };
    const result_elm = $("<div>");
    const time_elm = $("<span>",{text:0});
    $("<div>").prependTo($("#main_right")).css("background-color","white")
    .append($("<img>").css("width",$("#main_right").width())
            .attr("src",Math.random()<0.5?"https://lohas.nicoseiga.jp/thumb/5423138i":"https://lohas.nicoseiga.jp/thumb/5423112i"))
    .append(input_elm)
    .append($("<button>").text("検索").click(main))
    .append($("<button>").text("ランダム").click(()=>{main("random")}))
    .append($("<div>").append($("<div>",{text:"●硬直時間(連続アクセスを防ぐ)："}).append(time_elm).append("ミリ秒")).append(result_elm));
})();