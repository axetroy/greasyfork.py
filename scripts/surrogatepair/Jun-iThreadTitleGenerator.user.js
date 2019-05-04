// ==UserScript==
// @name         Jun-iThreadTitleGenerator
// @namespace    http://surrogatepair.github.io/
// @version      1.0
// @description  freefielder.jp/magic にアクセスした場合に順位スレのタイトルを自動生成します。
// @author       さろげーと
// @match        https://freefielder.jp/magic/*
// @grant        none
// ==/UserScript==

(function() {
    var tr = document.getElementById('scr_i').getElementsByTagName('tbody')[0].getElementsByTagName('tr');
    var ch = document.getElementById("change_league");
    var disp = document.getElementById("search_disp");
    var year = disp.textContent.match(/(\d+)年/);
    var month = disp.textContent.match(/(\d+)月/);
    var day = disp.textContent.match(/(\d+)日/);
    var league = ch.textContent.slice(0,1);
    var now = new Date();
    var tn = [];
    var wl = [];
    var clsname = {
        "F_row": "公", "E_row": "鷲", "L_row": "猫", "M_row": "鴎", "B_row": "檻", "H_row": "鷹",
        "G_row": "巨", "S_row": "ヤ", "Y_row": "De", "D_row": "中", "T_row": "神", "C_row": "広"
    };
    if ( year[1] < 2012 ){
        clsname.Y_row = "横";
    }
    for ( var i=0; i<6; i++ ){
        td = tr[i].getElementsByTagName('td');
        tn[i] = clsname[tr[i].getAttribute("class")];
        wl[i] = td[1].textContent - td[2].textContent;
    }

    function rep(i){
        return "=".repeat(Math.floor( i / 2 )) + "-".repeat( i % 2 );
    }
    var text = "";
    if ( 0 > wl[0] ){
        text += "//" + rep( -wl[0] );
    } else if ( wl[0] === 0 ){
        text += "/";
    }
    for ( i=0; i<5; i++ ){
        text += tn[i];
        if ( wl[i] < wl[i+1] ){
            text += "+".repeat( -wl[i] + wl[i+1] );
        } else if ( wl[i] * wl[i+1] > 0 ){
            text += rep( wl[i] - wl[i+1] );
        } else {
            if ( wl[i] > 0 ){
                text += rep( wl[i] ) + "/";
            }
            if ( 0 > wl[i+1] ){
                text += "/" + rep( -wl[i+1] );
            }
        }
    }
    text += tn[5];
    if ( wl[5] > 0 ){
        text += rep( wl[5] ) + "//";
    } else if ( wl[5] === 0 ){
        text += "/";
    }
    if ( day !== null && ( now.getFullYear() == year[1] && now.getMonth() + 1 == month[1] && now.getDate() == day[1] ) ){
        ch.innerText = "";
        disp.textContent = "【" + league + "順位スレ】" + text + "【" + month[1] + "/" + day[1] + "】";
    } else {
        disp.insertAdjacentHTML("beforeend", ": " + text);
    }
})();