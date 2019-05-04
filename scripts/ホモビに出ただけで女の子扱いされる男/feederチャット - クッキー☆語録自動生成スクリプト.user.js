// ==UserScript==
// @name         feederチャット - クッキー☆語録自動生成スクリプト
// @author       You
// @namespace    https://www.x-feeder.info/
// @version      9.313777777
// @description  クッキー☆語録を発言欄にコピペしてくれるボタンを追加します。マルコフ連鎖で自動生成もできます。
// @match        http*://*.x-feeder.info/*/
// @require      https://greasyfork.org/scripts/381988-wa-ka-chi-ga-ki/code/WA_KA_CHI_GA_KI.js?version=693512
// @grant        GM.xmlHttpRequest
// ==/UserScript==
;( () => {
  'use strict';
    const say = (str) => {
        $('#' + activeForm).val(str);
        $('#post_btn').focus();
    }
    const toHANKAKU = (str) => {
        return str.replace(/[Ａ-Ｚａ-ｚ０-９！-～]/g, (s) => {
            return String.fromCharCode(s.charCodeAt(0)-0xFEE0);
        });
    };
    const input_elm = $('<input>').attr('placeholder','マルコフ連鎖の調整').css("width","9em").change(function(){
        $(this).val(toHANKAKU($(this).val()).replace(/[^0-9]/g,""));
        markov.reset();
        Resource.forEach((str)=>{
            markov.add(WA_KA_CHI_GA_KI(str, $(this).val()));
        });
    });
    let first_str = '';
    const input_elm_first = $('<input>').attr('placeholder','最初の文字列').css("width","6em").change(function(){
        first_str = $(this).val();
    });
    $('<div>',{text:'クッキー☆自動生成'}).prependTo($('#post_btn').parent())
    .append($('<button>',{text:"ランダムに取得する"}).click(()=>{say(getRandom())}))
    .append($('<button>',{text:"マルコフ連鎖で生成"}).click(()=>{say(markov.make())}))
    .append(input_elm)
    .append(input_elm_first);
    class Markov {// マルコフ連鎖
        constructor() {// コンストラクタ
            this.data = {};
        }
        reset() {
            this.data = {};
        }
        add(array) {// データ登録
            if(!(array instanceof Array)) return console.error('配列が入ってないやん！');
            array.unshift(null);
            array.push(null);
            array.forEach((str,i)=>{
                const next = array[i+1];
                if(next !== null && !next) return;
                if(!this.data[str]) this.data[str] = [];
                this.data[str].push(next);
            })
        }
        sample(word) {// 指定された文字に続く文字をランダムに返す
            const array = this.data[word];
            return array[Math.floor(Math.random() * array.length)];
        }
        make(){// マルコフ連鎖でつなげた文を返す
            let str = first_str;
            let word = first_str ? this.sample(first_str) : this.sample(null);
            while(word) {
                str += word;
                word = this.sample(word);
            }
            return str;
        }
    }
    const markov = new Markov();
    const Resource = [];
    const getRandom = () => {
        const reg = new RegExp('^'+first_str);
        const array = first_str ? Resource.filter(v=>{return reg.test(v)}) : Resource;
        return array[Math.floor(Math.random() * array.length)];
    };
    const Analysis = [];
    const Regist_Analysis = (directory, func) => {
        Analysis.push((URL, jq) => {
            if(URL.indexOf(directory) !== -1) {
                func(jq);
                return true;
            }
            else return false;
        });
    };
    Regist_Analysis("https://wikiwiki.jp/9720246/", (jq) => {
        jq.find('#body').find('p').each((i,elm)=>{
            const array = $(elm).text().split("\n").filter(v=>v.length);
            for(const e of array){
                const str = Judge(e);
                if(str) {
                    Resource.push(str);
                    markov.add(WA_KA_CHI_GA_KI(str));
                }
            }
        });
    });
    Regist_Analysis("https://www59.atwiki.jp/cokkie_zikkyou/pages/", (jq) => {
        jq.find('#wikibody').find('div').each((i,elm)=>{
            const array = $(elm).text().split('\n').filter(v=>v.length);
            if(/^.*：$/.test(array[0])) {
                const name = array[0].slice(0,-1);
                array.shift();
                array.forEach((value, index, array)=>{
                    array[index] = name + '「' + value + '」';
                })
            }
            for(const e of array){
                const str = Judge(e);
                if(str) {
                    Resource.push(str);
                    markov.add(WA_KA_CHI_GA_KI(str));
                }
            }
        });
    });
    const getResource = (URL) => {
        GM.xmlHttpRequest({
            method: "GET",
            url: URL,
            onload: (response) => {
                for(const func of Analysis){
                    if(func(URL, $(response.responseText))) break;
                }
            }
        });
    };
    const Judge = (() => { // 正規表現の書式を満たせば全文を返す
        const array = [];
        array.push(new RegExp(/^.*「.+」/));
        array.push(new RegExp(/^.+：.+$/));
        return (str) => {
            for(const reg of array){
                if(reg.test(str)) {
                    const result = str.match(reg)[0];
                    return result;
                }
            }
        };
    })();
    const getPage1 = (title) => {
        const URL = encodeURI('https://wikiwiki.jp/9720246/書き起こし/' + title);
        getResource(URL);
    };
    // 取得できるページのリスト
    // https://wikiwiki.jp/9720246/%E6%9B%B8%E3%81%8D%E8%B5%B7%E3%81%93%E3%81%97
    getPage1('ほんへ');
    getPage1('旧クリ');
    getPage1('お正月');
    getPage1('新クリ');
    const getPage2 = (title) => {
        const URL = encodeURI('https://www59.atwiki.jp/cokkie_zikkyou/pages/' + title + '.html');
        getResource(URL);
    };
    // 取得できるページのリスト
    // https://www59.atwiki.jp/cokkie_zikkyou/pages/10.html
    getPage2('165'); // チョコレート★　書き起こし
    getPage2('54'); // イワナ書き起こし
    getPage2('50'); // UDKとRUの確執書き起こし
    getPage2('51'); // シアトル・マリナーズは関係ないだろ書き起こし
})();