// ==UserScript==
// @name         ChordWikiLikeUfret
// @namespace    http://surrogatepair.github.io/
// @version      0.4.2
// @description  ChordWikiのフレットボード表示をUfretのような表示形式にします。
// @author       さろげーと
// @match        https://ja.chordwiki.org/*
// @supportURL   https://twitter.com/surrogatepair
// @license      Public Domain
// ==/UserScript==

(function(){
    var version = "0.4.2";

    function addstyle(style){
        var tag = document.createElement("style");
        tag.type = "text/css";
        document.getElementsByTagName("head").item(0).appendChild(document.createElement("style"));
        var stylesheet = document.styleSheets.item(0);
        stylesheet.insertRule(style,stylesheet.cssRules.length);
    }

    addstyle(".likeUfretON span.chord{cursor:initial;pointer-events:none;display:inline-block;line-height:2em;position:relative;left:-10px;text-align:center;}");
    addstyle(".likeUfretON span.chord img{display:block;margin:5px -2px -2px;}");
    addstyle(".likeUfretON span.word{position:relative;left:-2em;}");
    addstyle(".likeUfretON p.line{line-height:3em;text-indent:-40px;margin-left:40px;}");
    addstyle(".likeUfretON p.line.comment{line-height:1em;}");
    addstyle("div.main{margin:0 180px 0 10px;}");
    addstyle(".likeUfretOFF span.chord img, .likeUfretOFF #likeUfretOFF, .likeUfretON #likeUfretON{display:none;}");

    for(let e of document.getElementsByClassName("chord")){
        var imgsrc = e.getAttribute("onclick").replace("javascript:popupImage('","").replace("', event);","");
        e.insertAdjacentHTML("afterbegin",'<img src="'+imgsrc+'" width="64" height="64">');
    }

    var msg = 'フレットボードの常時表示を'+
        '<button id="likeUfretON" onclick="document.cookie=\'srg_Ufret=0;expires=\'+new Date(new Date().getTime()+(60*60*24*1000*365)).toGMTString();document.getElementsByTagName(\'body\').item(0).className=\'likeUfretON\';">有効にする</button>'+
        '<button id="likeUfretOFF" onclick="document.cookie=\'srg_Ufret=1;expires=\'+new Date(new Date().getTime()+(60*60*24*1000*365)).toGMTString();document.getElementsByTagName(\'body\').item(0).className=\'likeUfretOFF\';">無効にする</button>'+
        ' <small>(<a href="https://greasyfork.org/ja/scripts/28474-chordwikilikeufret">ChordWikiLikeUfret</a> ver. '+version+')</small>';
    document.getElementById("key").insertAdjacentHTML("afterend",msg);

    var value=1;
    if(document.cookie){
        var cookies = document.cookie.split("; ");
        for(var i = 0; i < cookies.length; i++){
            var str = cookies[i].split("=");
            if(str[0] == "srg_Ufret"){
                var cookie_value = unescape(str[1]);
                if(!isNaN(value)) value = ++cookie_value;
                break;
            }
        }
    }
    if(value==1){
        document.getElementsByTagName("body").item(0).className='likeUfretON';
    }else{
        document.getElementsByTagName('body').item(0).className='likeUfretOFF';
    }

})();