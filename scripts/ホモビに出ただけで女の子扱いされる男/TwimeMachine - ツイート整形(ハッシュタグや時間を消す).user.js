// ==UserScript==
// @name         TwimeMachine - ツイート整形(ハッシュタグや時間を消す)
// @name:en      TwimeMachine - Shape the tweet
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  TwimeMachineにツイート整形ボタンを追加します。あとテキスト形式で保存するボタンも追加します。
// @description:en  (delete time infomation & # & @ & URL) & (save all tweet as text file)
// @author       You
// @match        http://www.twimemachine.com/user/*/
// @grant        none
// ==/UserScript==

;(() => {
    'use strict';
    //config
    const SEPARATE_STR = "\0"; // 分割するときに間に挟む文字列
    //config
    const SaveAsTextFile = (text, title) => {
        const blob = new Blob([text], {type: "text/plain"});
        const URL = window.URL || window.webkitURL;
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.target = '_blank';
        a.download = title;
        a.click();
    };
    const getUserName = () => {
        return "@" + location.href.match(/user.+/)[0].replace("user/","").replace("/","");
    };
    const ChackBoxHolder = $("<div>").append("追加で消すもの/option");
    const makeRegExp = (()=>{
        const FunctionArray = [];
        const makeChackBox = (text, regexp) => {
            let flag = true;
            const func = () => {
                return flag ? regexp : null;
            };
            const elm = $("<input>").attr("type","checkbox")
                .prop('checked', true)
                .click(function(){
                flag = $(this).prop("checked");
            });
            FunctionArray.push(func);
            ChackBoxHolder.append($("<div>").append(elm).append(text));
        };
        makeChackBox("ハッシュタグ/#", "#[一-龠_ぁ-ん_ァ-ヴーａ-ｚＡ-Ｚa-zA-Z0-9]+");
        makeChackBox("URL", "https?://[\\w\\./]+");
        makeChackBox("リプライ・メンション/@", "@[a-zA-Z0-9_]+");
        const main = () => {
            let str = "";
            for(const func of FunctionArray){
                const result = func();
                if(result) str += "(" + result + ")|";
            }
            return new RegExp(str.slice(0,-1),"g");
        };
        return main;
    })();
    const S_reg = /\s+/g;
    const main = () => {
        const p = $("#results");
        p.find("a").remove();
        const regexp = makeRegExp();
        let result = "";
        p.find('span').each((i,elm)=>{
            const text = $(elm).text();
            if(!text.replace(S_reg, "").length) return;
            result += text.replace(regexp,"") + SEPARATE_STR;
        });
        SaveAsTextFile(result, getUserName());
    };
    const B = $("<button>").text("整形して保存/Format&Save").attr("class","btn").click(main);
    const P = $("#loading").parent();
    P.prepend(B).prepend(ChackBoxHolder);
})();