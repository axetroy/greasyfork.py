// ==UserScript==
// @name         Futaba Dice Ex
// @namespace    https://www.2chan.net/
// @version      1.1
// @description  ふたばのダイスの出目に説明を追加するためのスクリプトです。（デフォルトでは東方キャラダイス）
// @author       ふたばとしあき
// @match        http://*.2chan.net/*
// @grant        none
//jQueryのロード
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js
// ==/UserScript==

(function() {
    'use strict';
　　//---------------------------------------------------------------ここから設定-------------------------------------------------------------------
    //表示形態　option=0で併記　1で上書き　2でマウスオーバー　で表す
    var option = 0;
    //適用範囲 firstが何個目から適用するか　countが何回適用するか　count=0の場合全部適用
    var first = 1;
    var count = 1;
    //対応リスト
    var assign = {
        0:"",
        1:"八雲藍",
        2:"八意永琳",
        3:"寅丸星",
        4:"レイセン",
        5:"本居小鈴",
        6:"姫海棠はたて",
        7:"十六夜咲夜",
        8:"洩矢諏訪子",
        9:"九十九弁々",
        10:"パチュリー・ノーレッジ",
        11:"今泉影狼",
        12:"水橋パルスィ",
        13:"宮古芳香",
        14:"純狐",
        15:"蓬莱山輝夜",
        16:"伊吹萃香",
        17:"小悪魔",
        18:"橙",
        19:"アリス・マーガトロイド",
        20:"レミリア・スカーレット",
        21:"ドレミー・スイート",
        22:"多々良小傘",
        23:"ルナチャイルド",
        24:"森近霖之助",
        25:"リリカ・プリズムリバー",
        26:"東風谷早苗",
        27:"秋静葉",
        28:"因幡てゐ",
        29:"封獣ぬえ",
        30:"豊聡耳神子",
        31:"四季映姫・ヤマザナドゥ",
        32:"永江衣玖",
        33:"八坂神奈子",
        34:"星熊勇儀",
        35:"フランドール・スカーレット",
        36:"綿月豊姫",
        37:"大妖精",
        38:"西行寺幽々子",
        39:"紅美鈴",
        40:"宇佐見菫子",
        41:"犬走椛",
        42:"ナズーリン",
        43:"射命丸文",
        44:"八雲紫",
        45:"稀神サグメ",
        46:"比那名居天子",
        47:"古明地さとり",
        48:"古明地こいし",
        49:"赤蛮奇",
        50:"黒谷ヤマメ",
        51:"ルナサ・プリズムリバー",
        52:"スターサファイア",
        53:"少名針妙丸",
        54:"上海人形",
        55:"メディスン・メランコリー",
        56:"物部布都",
        57:"ヘカーティア・ラピスラズリ",
        58:"メルラン・プリズムリバー",
        59:"蘇我屠自古",
        60:"九十九八橋",
        61:"二ッ岩マミゾウ",
        62:"ルーミア",
        63:"秋穣子",
        64:"霍青娥",
        65:"魂魄妖夢",
        66:"上白沢慧音",
        67:"レティ・ホワイトロック",
        68:"風見幽香",
        69:"清蘭",
        70:"わかさぎ姫",
        71:"小野塚小町",
        72:"鈴瑚",
        73:"朱鷺子",
        74:"綿月依姫",
        75:"火焔猫燐",
        76:"霊烏路空",
        77:"鈴仙・優曇華院・イナバ",
        78:"雲居一輪",
        79:"秦こころ",
        80:"リリーホワイト",
        81:"鬼人正邪",
        82:"ミスティア・ローレライ",
        83:"幽谷響子",
        84:"聖白蓮",
        85:"藤原妹紅",
        86:"チルノ",
        87:"リグル・ナイトバグ",
        88:"マエリベリー・ハーン",
        89:"宇佐見蓮子",
        90:"霧雨魔理沙",
        91:"稗田阿求",
        92:"キスメ",
        93:"クラウンピース",
        94:"鍵山雛",
        95:"サニーミルク",
        96:"村紗水蜜",
        97:"河城にとり",
        98:"堀川雷鼓",
        99:"茨木華扇",
        100:"博麗霊夢",
        101:"エタニティラルバ",
        102:"坂田ネムノ",
        103:"高麗野あうん",
        104:"矢田寺成美",
        105:"丁礼田舞",
        106:"爾子田里乃",
        107:"摩多羅隠岐奈"
    };
    //---------------------------------------------------------------設定ここまで-------------------------------------------------------------------
    //こっから処理
    $("font[color='#ff0000']").each(function(){
        var pattern = /(\d+ )+\(\d+\)/g;
        var content = $(this).text();
        if( content.match(pattern) ) {
            var rolls = content.split(' ');
            var j;
            if(count === 0) {
                j = rolls.length - 1;
            } else {
                j = first + count - 1;
            }
            switch(option) {
                case 0:
                    for(let i = first - 1; i < j; i++){
                        rolls[i] = rolls[i] + '<font size="2" color="midnightblue">' + assign[rolls[i]] +'</font>';
                    }
                    $(this).html(rolls.join(" "));
                break;
                case 1:
                    for(let i = first - 1; i < j; i++){
                        rolls[i] = assign[rolls[i]];
                    }
                    $(this).html(rolls.join(" "));
                break;
                case 2:
                    for(let i = first - 1; i < j; i++){
                        rolls[i] = assign[rolls[i]];
                    }
                    $(this).attr("title", rolls.join(",").slice(0,-(rolls[rolls.length-1].length + 1)));
                break;
            }
        }
    });
})();