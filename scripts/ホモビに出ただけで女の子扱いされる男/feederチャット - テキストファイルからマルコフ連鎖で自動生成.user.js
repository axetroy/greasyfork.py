// ==UserScript==
// @name         feederチャット - テキストファイルからマルコフ連鎖で自動生成
// @author       You
// @namespace    https://www.x-feeder.info/
// @version      0.51
// @description  クッキー☆語録自動生成スクリプトの改変です。
// @match        http*://*.x-feeder.info/*/
// @require      https://greasyfork.org/scripts/381988-wa-ka-chi-ga-ki/code/WA_KA_CHI_GA_KI.js?version=693512
// @grant        none
// ==/UserScript==
;( () => {
  'use strict';
    //config
    const SEPARATE_STR = "\0"; // 分割するために間に挟まれた文字列
    //config
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
            let str = '';
            let word = this.sample(null);
            while(word) {
                str += word;
                word = this.sample(word);
            }
            return str;
        }
    }
    const markov = new Markov();
    const Resource = [];
    const getRandom = (array) => {
        return Resource[Math.floor(Math.random() * Resource.length)];
    };
    const S_reg = /\s+/g;
    let notLoadedFileNum = 0;
    const readFile = (file) => {
        if(file.type !== "text/plain") return;
        const fr = new FileReader()
        fr.readAsText(file);
        fr.onload = () => {
            const array = fr.result.split(SEPARATE_STR);
            for(const str of array){
                if(!str.replace(S_reg, "").length) continue;
                Resource.push(str);
                markov.add(WA_KA_CHI_GA_KI(str));
            }
            if(!--notLoadedFileNum) alert("ファイルの読み込みが完了しました。");
        }
    };
    const read_file_elm = $("<input>",{
        type: 'file',
        multiple: true
    }).change((evt)=>{
        const files = evt.target.files;
        notLoadedFileNum = files.length;
        if(!notLoadedFileNum) return;
        while(Resource.length) Resource.pop();
        markov.reset();
        for(const file of files) readFile(file);
    });
    const input = (str) => {
        $('#' + activeForm).val(str);
        $('#post_btn').focus();
    }
    const toHANKAKU = (str) => {
        return str.replace(/[Ａ-Ｚａ-ｚ０-９！-～]/g, (s) => {
            return String.fromCharCode(s.charCodeAt(0)-0xFEE0);
        });
    };
    const input_elm = $('<input>').attr('placeholder','マルコフ連鎖の調整').css("width","10em").change(function(){
        $(this).val(toHANKAKU($(this).val()).replace(/[^0-9]/g,""));
        markov.reset();
        Resource.forEach((str)=>{
            markov.add(WA_KA_CHI_GA_KI(str, $(this).val()));
        });
    });
    $('<div>',{text:'自動生成'}).prependTo($('#post_btn').parent())
    .append($('<button>',{text:"ファイル読み込み"}).click(()=>{read_file_elm.click()}))
    .append($('<button>',{text:"ランダムに取得する"}).click(()=>{input(getRandom())}))
    .append($('<button>',{text:"マルコフ連鎖で生成"}).click(()=>{input(markov.make())}))
    .append(input_elm);
})();