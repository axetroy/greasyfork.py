// ==UserScript==
// @name         巴哈姆特之收藏前確認
// @description  為了我每次都手殘點到收藏的朋友而做，可以防止誤觸收藏按鈕。
// @namespace    nathan60107
// @version      1.3
// @author       nathan60107(貝果)
// @homepage     https://home.gamer.com.tw/homeindex.php?owner=nathan60107
// @include      https://forum.gamer.com.tw/C*
// @include      https://home.gamer.com.tw/bahawall.php?*
// @include      *.gamer.com.tw/singleACMsg.php*
// @include      https://guild.gamer.com.tw/guild.php*
// ==/UserScript==

if(location.href.match("https://forum.gamer.com.tw/C")!=null){
    var newFunc = FORUM_homeBookmark.toString();
    newFunc = newFunc.replace(`function FORUM_homeBookmark(e,t,o,a,n,i,r,s,l){`, `function FORUM_homeBookmark(e,t,o,A,n,i,r,s,l){Dialogify.confirm('確定要收藏?',{ok: function(){`);
    newFunc = newFunc.replace(`encodeURIComponent(a);`, `encodeURIComponent(A);`);
    newFunc = newFunc.replace(`!1}`, `!1}})}`);
    FORUM_homeBookmark = new Function("return "+newFunc)();
}else if(location.href.match("https://home.gamer.com.tw/bahawall.php")!=null || location.href.match(".gamer.com.tw/singleACMsg.php")!=null || location.href.match("https://guild.gamer.com.tw/guild.php")!=null){
    var newFunc = giveGPBP.toString();
    newFunc = newFunc.replace(`function giveGPBP(e,t){$`, `function giveGPBP(e,t){function postGBP(){$`);
    newFunc = newFunc.replace(`})}`, `})}
if (e == "GP") postGBP();
else if (e == "BP") Dialogify.confirm('確定要噓?', {
    ok: function(){postGBP();}
})}`);
    giveGPBP = new Function("return "+newFunc)();
}
