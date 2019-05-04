// ==UserScript==
// @name       WikiMoji
// @namespace  http://riki.awiki.org/
// @version    0.0.1
// @description  Enjoy wikimoji outside MediaWiki.
// @match      https://twitter.com/*
// ==/UserScript==

(function (){
    // Compile Regexs.
    var rgblock=new RegExp(/\{\{[Bb]lock\|(.*)(\}\})/,"g");
    var rgfact=new RegExp(/\{\{[Ff]act\|(.*)(\}\})/,"g");
    var rglink=new RegExp(/\[\[(.*)(\]\]/,"g");
    var rgping=new RegExp(/\{\{[Pp]ing\|(.*)(\}\})/,"g");
    var rga1=new RegExp(/\{\{同意\}\}/,"g");
    var rga2=new RegExp(/\{\{支持\}\}/,"g");
    var rga3=new RegExp(/\{\{(保留|Vfk)\}\}/,"g");
    var rga4=new RegExp(/\{\{(删除|Vfd)\}\}/,"g");
    // Compile END.
    
    a = document.getElementsByTagName('div');
    var b=a.length;
    //console.log("Get Divs with a length " + b);
    for( var c=0; c<b; c++){
        d=a[c].innerHTML;
    // Replace PART
        d = d.replace(rgblock,"<span style=\"background:#000000\">$1</span>"); // Block
        d = d.replace(rgfact,"<span style=\"background: #ffefd6\">$1<sup>[来源请求]</sup></span>"); // Fact
        d = d.replace(rglink,"[[<a href=\"\\zh.wikipedia.org/wiki/$1\">$1</a>]]"); // [[]]
        d = d.replace(rgping,"@<a href=\\\zh.wikipedia.org/wiki/User:$1\">$1</a>"); // Ping
        // 同意/支持
        d = d.replace(rga1,"<span style=\"font-weight:bold;background:lightgreen;color:green;\">'''(＋)'''</span><b>同意</b>"); 
        d = d.replace(rga2,"<span style=\"font-weight:bold;background:lightgreen;color:green;\">'''(＋)'''</span><b>支持</b>"); 
        // 保留/删除
        d = d.replace(rga3,"<span style=\"font-weight: bold;"><span style="color: green; background-color: lightgreen;\">(<span style=\"font-family:STFangsong, FangSong\">○</span>)</span>保留</span>"); 
        d = d.replace(rga4,"<span style=\"font-weight: bold; color: red; background: pink;\">(<span style=\"font-family:STFangsong, FangSong;\">×</span>)</span>删除</span>");
    // Replace END
        a[c].innerHTML=d;
        }
    //console.log("Replaced.");
}){};