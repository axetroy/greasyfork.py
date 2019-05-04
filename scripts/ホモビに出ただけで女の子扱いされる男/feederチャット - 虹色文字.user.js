// ==UserScript==
// @name         feederチャット - 虹色文字
// @author       。.。:+* ゜ ゜゜ *+:王道を征くホモビ男優。.。:+* ゜ ゜゜ *+:
// @homepage     https://www1.x-feeder.info/javascript/
// @namespace    https://www.x-feeder.info/
// @version      7
// @description  虹色文字に変換するボタンを[投稿]の右に追加します。
// @match        http*://*.x-feeder.info/*/
// @grant        none
// @require      https://greasyfork.org/scripts/381988-wa-ka-chi-ga-ki/code/WA_KA_CHI_GA_KI.js?version=693512
// ==/UserScript==
(() => {
  'use strict';
    const LIMIT_STR_LENGTH = 1000; // 字数制限
    const array = [
         "{#FF0000:" ,
         "{#FF8000:" ,
         "{#FFFF00:" ,
         "{#00FF00:" ,
         "{#0080FF:" ,
         "{#0000FF:" ,
         "{#FF00FF:" ,
    ];
    const toHANKAKU = (str) => {
        return str.replace(/[Ａ-Ｚａ-ｚ０-９！-～]/g, (s) => {
            return String.fromCharCode(s.charCodeAt(0)-0xFEE0);
        });
    };
    let flag = !false;
    const toRainbow = (_str) => {
        const str_array = WA_KA_CHI_GA_KI(_str, input_elm.val());
        let result = '';
        for(let i = 0; i < str_array.length; i++){
            result += array[i % array.length] + str_array[i] + '}';
        }
        return result;
    };
    const converseAll = (()=>{
        const REG_STR_Array = [];
        REG_STR_Array.push(">>[0-9]+"); // 引用
        REG_STR_Array.push("\\[[PQEF]:[0-9]+\\]"); // 画像アンケート絵文字ファイル
        REG_STR_Array.push("[\s\n]+"); // 改行
        REG_STR_Array.push("(https?|ftp)(:\\/\\/[-_.!~*\\'()a-zA-Z0-9;\\/?:\\@&=+\\$,%#]+)"); // URL
        const ignore_reg = new RegExp(REG_STR_Array.join('|'));
        REG_STR_Array.push('.');
        const all_reg = new RegExp(REG_STR_Array.join('|'),"g");
        return (str) => {
            const str2 = str += "\0";
            let result = "", Target = "";
            str2.match(all_reg).forEach((e)=>{
                if(ignore_reg.test(e)) {
                    if(Target.length) {
                        result += toRainbow(Target);
                        Target = "";
                    }
                    result += e;
                }
                else {
                    if(e === "\0" && Target.length) result += toRainbow(Target);
                    else Target += e;
                }
            });
            return result;
        };
    })();
    const main = () => {
        if(!flag) return;
        const elm =  $('#' + activeForm);
        const result = converseAll(elm.val())
        if(LIMIT_STR_LENGTH < result.length) {
            alert("字数制限の" + LIMIT_STR_LENGTH + "文字を超えています！");
            return true;
        }
        elm.val(result);
        $('#post_btn').focus();
        return;
    }
    const setCookie = (() => {
        const log = {};
        return (cookie_name, bool) => {
            if(bool){
                log[cookie_name] = $.cookie(cookie_name);
                $.cookie(cookie_name, null);
            }
            else $.cookie(cookie_name, log[cookie_name], {expires: 3650});
        };
    })();
    const btn_elm = $('<button>').click(function(){
        flag = !flag;
        setCookie('default_text_color',flag);
        setCookie('default_text_size',flag);
        if(flag) {
            $(this).text("虹色文字ON").css({
                color: 'white',
                transition: '1.0s'
            })
        }
        else {
            $(this).text("虹色文字OFF").css({
                color: 'black',
                'background-color': 'gray'
            })
        }
    })
    btn_elm.click();
    const input_elm = $('<input>').attr('placeholder','分割文字数の調整').css("width","9em").change(function(){
        $(this).val(toHANKAKU($(this).val()).replace(/[^0-9]/g,""))
    });
    input_elm.val(1);
    $('<div>').append("★虹色文字スクリプト★：").append(btn_elm).append(input_elm).prependTo($('#post_btn').parent());
    const copy = postFeed;
    postFeed = () => {
        const result = main();
        if(!result) copy();
    };
    const color_array = ['orange', 'yellow', 'green', 'cyan', 'blue', 'violet']
    const gradation = () => {
        if(!flag) return;
        const color = color_array[new Date().getSeconds() % color_array.length]
        btn_elm.css('background-color', color)
    }
    setInterval(gradation , 1000)
})();