// ==UserScript==
// @name        osu! ranking page changer
// @name:ja     osu! ranking page changer
// @namespace   https://osu.ppy.sh/u/1089803
// @version     2.44
// @description Automatically switches the game mode of a scoreboard.
// @description:ja 譜面のスコアボードを設定したゲームモードのものに自動で切り替え
// @include     http*://osu.ppy.sh/b/*
// @include     http*://osu.ppy.sh/s/*
// @include     http*://osu.ppy.sh/p/beatmap?b=*
// @include     http*://osu.ppy.sh/p/beatmap?s=*
// @include     http*://osu.ppy.sh/p/beatmaplist*
// @include     http*://new.ppy.sh/beatmapsets/*
// @include     http*://store.ppy.sh/beatmapsets/*
// @grant       GM_setValue
// @grant       GM_getValue
// @author      Nucoin
// ==/UserScript==

if (GM_getValue('gmMode') == null || GM_getValue('gmMode') == undefined || GM_getValue('gmMode') > 4 || GM_getValue('gmMode') < 0) {      //初期化
    GM_setValue('gmMode',0);                                                //Standard=0 taiko=1 CTB=2 mania=3 default=4
}

var data2 = 'data:image/png;base64,'+
    'iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAB5klEQVRIie2VPYgUQRCFvzeIGIlc'+
    'JHKIwbEoGBkZKIqhP3i44cCls4mBGBiJucaCA2I2m80GgpkYXGx0JgZGYnAYyXEcBss9g+6dnd3p'+
    '2dXE6Dp6U1Nd9V5VdbdYs/JhuQHsGB4Cl2Uy4BviA/a7ajLaX7VfKwID3AZKw0AYW2i2w4D4Djw2'+
    'vB/XRTJO1pfA9nVwDQzkwEVtOgFftKmE7/6TgnxYnrb5IjGIyZC0Z/ujpClwx/a1hqDYF1yp6tGv'+
    'v1Jge3sWHEDSW5ub48noaVUXz4Bbkl4GVULoPLCTipUukfSg9fUTeDKeFAczQ1UXR8BzxNfICNC9'+
    'fFh24nUM+bDMMJdwo2e3qovDZb+qLqbAJzAOOS4AZ5b9TqVUSWQhvhH6nVQJCI4cm2/I7C7hjsGR'+
    'kWyEYC6ls8KkxmQ9bikFx8SxbHiuXA4tQElXAeSP3mwhXsXPzHAD2Agl4gfoc5o3Vw1bAmwfSNoF'+
    'ptHnRVUXe0GBdA7Ynmd19BHAJvbm/JQt0mys0lngfsv6GpZ7sFDH7rHtc+3D3QSNl8LoxR1tDGHs'+
    'myupB8/WQpPd9MkolsSt3jmCOJarcUqB2n/dcmzhvsL14ZMSrcUnJVqL/0+JjI+FDhvm7YtxCcf3'+
    'GYcrtBcT3m7+AEYE8RKiUWXyAAAAAElFTkSuQmCC';
var data = 'data:image/png;base64,'+
    'iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAB50lEQVRIie2UL2wUQRjFf29zIShC'+
    'qghpCKK5QIJCISAQJH9C1Z6r41xFU1FF8KARbAkOcwmGBEcQ1ahiECiCaFCkaRrE5R5iZrZ7u7Nb'+
    'DK6TFW9nvu9933s7+4lTlqezFWAD/MToGqaQ+A58BN6qKg+G8jVADHAPeA2MwbnwH8Am8EFVmeUp'+
    'egvYt8DvgbH7e7kCfgc86OPJZi2ms3Pgr0JjO9JL+8afhObAfds3gUKA0YHEdVXl739TYNaFxhgk'+
    'IemN7TtFNdlWVe4AdyW9EAIJiUvARo6qxyI/rvWZX+CtYndyWMuuymPgmeEbQBT50NNZh6+zsQhB'+
    'Vx2UYHlP1eSoHaeqnEv+HCw0NpeB8+24UScRCqQCGwRCf/IqAXQsxU5wYXS6AgiSLTFwi0m0ASh/'+
    'iXsKLOpUZ04bSxjbGPfGBoFPZ2uIlydFfRuzEk71E/jSaT20ewNYi+yHoD1gHmOea7fcH8UyF4H1'+
    'OjNaFCWvGlaTfBsUbleIFsmiCxKPGvuvoPGRk0LV/ge2DlaIdMPwPA5gtPyq9MRN5TEJux/Hjpc+'+
    'choL6c9ZkpbyXAcP49jNskXJ22iLGhY1MbhhRR9uFTizqItbBc4s6uJWgf9l0Sio8kLSkYmTYGBK'+
    'n8wiN2ZRBseh9xewqifZ2oiACQAAAABJRU5ErkJggg==';
var img = document.createElement("img");

//---ここからnew.ppy.sh
function mainNew() {
    var i = 0;
    var timer = setInterval(function(){
        i++;
        if (i > 4) {
            clearInterval(timer);
        } else {
            if(document.getElementsByClassName("newSelectbox")[0] == undefined) {
                addNewSelectbox();
            }
        }
    },2000);
    var a = GM_getValue('gmMode');
    if(location.hash.indexOf("#osu") != 1 ||  a !== 0 || a !== 4) {
        window.setTimeout(clickE,800);
        timer;
    }
}

function clickE () {
    var mode = GM_getValue('gmMode');
    if (mode != 4) {
        if (pagetabs[0].childElementCount >= 4) {
            var t = pagetabs[0].children[mode].children[0];
            if (!t.className.match(/active/i)) {
                t.click();
            }
        }
    }
}

function addNewSelectbox () {
    var div = document.createElement("div");
    div.appendChild(img);
    div.insertAdjacentHTML("beforeend", selectboxHTML);
    div.style = "position:relative;";
    div.className = "newSelectbox";
    pagetabs[0].appendChild(div);
    var selector = document.getElementById('modeSelectBox');
    var a = GM_getValue('gmMode');
    if (a == 4) {
        a = 0;
    }
    selector.selectedIndex = a;
    selector.addEventListener('change', function() {
        var index = this.selectedIndex;
        var value = this.options[index].value;
        GM_setValue('gmMode',value);
        clickE();
    }, false);
}
//---ここまでnew.ppy.sh

//---ここからosu.ppy.sh
function main() {
    var url = document.URL;
    var urlState = url.match(/\/[bs]\//i);
    var urlMode = (url.match(/m=(\d)/i)||[])[1];

    if (url.match(/beatmaplist/i)) {                                        //URL判定
        changeBeatmapList();                                                //searchリスト処理へ
    } else {                                                                //譜面ページ処理へ
        var tabs = document.getElementsByClassName('beatmapTab');
        var tabsTaiko = []; var tabsCtb = []; var tabsMania = []; var tabsStd = [];
        var acTab = document.getElementsByClassName('beatmapTab active');   //アクティブdiff
        var acTabDiff = acTab[0].children[0].className;                     //アクティブdiffIcon
        var acTabDiffMode = (acTabDiff.match(/-(\w)$/)||[])[1];             //モード識別文字
        var acTabDiffModeNum = 0;
        var flagStdDiff = 0;
        var flagSpecDiff = 0;
        var urlSpecDiff, urlStdDiff;

        switch (String(acTabDiffMode)) {                                    //アクティブタブのモード判定
            case 't':
                acTabDiffModeNum = 1;
                break;
            case 'f':
                acTabDiffModeNum = 2;
                break;
            case 'm':
                acTabDiffModeNum = 3;
                break;
            default:
                acTabDiffModeNum = 0;
                break;
        }
        changeBeatmapPage();
    }

    function arrayTabs() {
        for (var i = 0; i < tabs.length ; i++) {                            //各diffを配列へ
            var w = (tabs[i].children[0].className.match(/-(\w)$/)||[])[1];
            switch (String(w)) {
                case 't':
                    tabsTaiko.unshift(tabs[i].href);
                    break;
                case 'f':
                    tabsCtb.unshift(tabs[i].href);
                    break;
                case 'm':
                    tabsMania.unshift(tabs[i].href);
                    break;
                default:
                    tabsStd.unshift(tabs[i].href);
            }
        }
        //        console.log("t = " + tabsTaiko);console.log("f = " + tabsCtb);console.log("m = " + tabsMania);console.log("o = " + tabsStd);
    }

    function changeBeatmapPage() {                                          //譜面ページ処理
        if (document.getElementsByName('scores')[0]) {                      //ランキング有無チェック
            addSelect();
            if (GM_getValue('gmMode') != 4) {
                changeLink();
                arrayTabs();
                reload();
            }
        }
    }

    function reload() {
        if(urlState == "/s/") {                                                       //URLが/s/で
            if(GM_getValue('gmMode') != acTabDiffModeNum) {                  //アクティブタブとモードが違う時
                checkDiffs();
                if (flagSpecDiff) {
                    location.replace(urlSpecDiff);                           //設定したモードの専譜が見つかれば移動、無ければstdへ
                } else {
                    if (flagStdDiff) {                                       //std譜面あって
                        if(acTabDiffModeNum === 0) {                         //stdDiffにいるなら
                            if(urlMode != GM_getValue('gmMode')) {           //ランキングモード変更へ
                                changeMode();
                            }
                        } else {                                             //stdDiffにいない場合
                            if (urlStdDiff) {
                                location.replace(urlStdDiff);                //あればstdへ
                            }
                        }
                    }
                }
            }
        } else {
            if(urlState == "/b/" && !urlMode) {
                changeMode();
            }
        }
    }

    function checkDiffs() {                                                  //stdと専用譜面のURLを代入
        if (tabsStd.length) { urlStdDiff = tabsStd[0]; flagStdDiff = 1;}
        switch (String(GM_getValue('gmMode'))) {
            case '1':
                if (tabsTaiko.length) { urlSpecDiff = tabsTaiko[0]; flagSpecDiff = 1;}
                break;
            case '2':
                if (tabsCtb.length) { urlSpecDiff = tabsCtb[0]; flagSpecDiff = 1;}
                break;
            case '3':
                if (tabsMania.length) { urlSpecDiff = tabsMania[0]; flagSpecDiff = 1;}
                break;
        }
    }

    function changeMode() {                                                 //ランキングモードを変える
        if (GM_getValue('gmMode') != 4  && acTabDiffModeNum === 0) {        //専用譜面ではなかったら
            var t = acTab[0].href.replace(/m=\d/i, 'm=' + GM_getValue('gmMode'));
            location.replace(t);
        }
    }

    function addSelect() {                                                 //セレクトボックス
        img.style = "float:left; padding-top: 1px;";
        var tabPos = document.getElementsByClassName('paddingboth')[0].nextElementSibling.children[0];
        var li = document.createElement('li');
        var a = document.createElement('a');
        var select = document.createElement('select');
        select.style = "height:25px;";
        var option_Standard = document.createElement('option');
        var option_taiko = document.createElement('option');
        var option_CTB = document.createElement('option');
        var option_mania = document.createElement('option');
        var option_default = document.createElement('option');
        option_Standard.appendChild(document.createTextNode('osu!'));
        option_taiko.appendChild(document.createTextNode('taiko'));
        option_CTB.appendChild(document.createTextNode('CTB'));
        option_mania.appendChild(document.createTextNode('mania'));
        option_default.appendChild(document.createTextNode('default'));
        select.name = 'modeSelectBox';
        select.appendChild(option_Standard); select.appendChild(option_taiko); select.appendChild(option_CTB); select.appendChild(option_mania); select.appendChild(option_default);
        select.onchange = function () {                                   //変更した時の処理
            GM_setValue('gmMode', this.selectedIndex);
            if (GM_getValue('gmMode') != 4) {
                changeLink();
                changeMode();
            }
        };
        a.appendChild(img); a.appendChild(select);  li.appendChild(a); tabPos.appendChild(li);
        document.getElementsByName('modeSelectBox')[0].selectedIndex = GM_getValue('gmMode');
    }

    function changeLink() {                                              //diffリンク書き換え
        var bhref = document.getElementsByClassName('beatmapTab');       //href
        for (var i = 0; i < bhref.length; i++) {
            var diff = bhref[i].children[0].className;
            if (!diff.match(/-/)) {
                var t = bhref[i].toString();
                t = t.replace(/m=\d/, 'm=' + GM_getValue('gmMode'));
                bhref[i].href = t;
            }
        }
    }

    function changeBeatmapList() {                                       //searchリスト処理
        if (GM_getValue('gmMode') != 4 && GM_getValue('gmMode') !== 0) {
            var gm = GM_getValue('gmMode');
            var bmTitle = document.getElementsByClassName('title');
            var bmList = document.getElementsByClassName('beatmap');
            var bmThumb = document.getElementsByClassName('bmlistt');
            for (var i = 0; i < bmTitle.length; i++) {
                bmList[i].id = bmList[i].id + '&m=' + gm;
                bmTitle[i].href += '&m=' + gm;
                bmThumb[i].onmouseout = function () {this.parentNode.id = this.parentNode.id + '&m=' + gm;};
                bmThumb[i].onmouseover = function () {this.parentNode.id = this.parentNode.id.replace(/&m=\d/,'');};
            }
        }
    }
}
//---ここまでosu.ppy.sh

if (document.URL.match(/(new|store).ppy.sh\/beatmapsets\//i)) {
    var pagetabs = document.getElementsByClassName("page-mode");
    var selectboxHTML = "<select Id=\"modeSelectBox\" style=\"vertical-align:bottom\"><option value=\"0\">osu!<\/option><option value=\"1\">taiko<\/option><option value=\"2\">CTB<\/option><option value=\"3\">mania<\/option><\/select>";
    img.src = data;
    mainNew();
} else {
    img.src = data2;
    main();
}

//GM_deleteValue('gmMode'); // @grant       GM_deleteValue