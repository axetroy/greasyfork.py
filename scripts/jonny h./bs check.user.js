// ==UserScript==
// @name         bs check
// @namespace    http://tampermonkey.net/
// @version      1.5
// @description  try to take over the world!
// @author       You
// @match        https://bs.to/home
// @match        https://bs.to/
// @grant        none
// donationsURL paypal.me/JonathanHeindl :3
// ==/UserScript==
//only does notifiactions will not update window
var list=[];
//localstorage functions
var l = {
    s: function setLS(identifier, element, log = 1) {
        localStorage.setItem("tampermonkey_" + identifier, JSON.stringify(element));
    },
    g: function getLS(identifier, standard = new Array(0), log = 1) {
        var element = JSON.parse(localStorage.getItem("tampermonkey_" + identifier));
        if (element === null) {
            this.s(identifier, standard);
            return standard;
        }
        return element;
    }
};
//get series list
(function main(){
    'use strict';
    get("https://bs.to/settings/series", [["Content-type", "text/html; charset=utf-8"], ["Cache-Control", "no-chache"]], start);
    // Your code here...
})();

function start(doc){
    //prepares list from document
    new Notification("testnotification",{icon:"https://bs.to/favicon.ico"});
    check(prepstrlist(doc));
}
function check(serieslist){
    console.log("check");
    get("https://bs.to/home",null,function checknew(e){
        e=e.split("Neueste Episoden")[1].split("id=\"news\">")[0].split("<ul>")[1].split("</ul>")[0].split("\n");
        for(var i=1;i<e.length-1;i++){
            var link={};
            link.url=e[i].split("href=\"")[1].split("\" title=")[0];
            link.series=e[i].split("\"><div>")[1].split("</div><")[0];
            link.title=e[i].split("title=\"")[1].split("\"><div>")[0].replace(link.series+": ","");
            link.index=e[i].split("</div><div>")[1].split("<i class")[0];
            link.language=e[i].split("<i class=\"")[1].split("\"></i><")[0];
            link.timestamp=new Date().valueOf();
            list=l.g("recentnewseries");
            if(find(list,link.url,true,".url")===-1){
                list.push(link);
                for(var k=list.length-1;k>-1;k--){
                    if(list[k].timestamp+1000*60*60*24<new Date().valueOf()){
                        list=rI(list,k);
                    }
                }
                l.s("recentnewseries",list);
                var index=find(serieslist,link.series,true,".name");
                if(index>-1){
                    var n= new Notification(link.series,{body:link.title+"\n"+link.index,icon:"/public/img/cover/"+serieslist[index].id+".jpg"});
                    n.href=link;
                    n.onclick=function onclick(e){
                        open(e.target.href.url);
                        e.target.close();
                    };
                }
            }
        }
    });
    setTimeout(check,1000*60,serieslist);//1 minute
}
function get(url, requestHeader = [], c) {
    //function check(btn,c){
    var http = new XMLHttpRequest();
    //var url = "https://bs.to/settings/series";
    http.open("GET", url, true);
    //Send the proper header information along with the request
    //http.setRequestHeader("Content-type", "text/html; charset=utf-8");
    if (requestHeader === undefined || requestHeader === null) {
        http.setRequestHeader("Content-type", "text/html; charset=utf-8");
        // http.setRequestHeader("referrer-policy", "no-referrer");
    } else if (requestHeader.constructor.name !== "Array") {
        http.setRequestHeader(requestHeader.split(',')[0], requestHeader.split(',')[1]);
    } else {
        for (var i = 0; i < requestHeader.length; i++) {
            http.setRequestHeader(requestHeader[i][0], requestHeader[i][1]);
        }
    }
    http.onreadystatechange = function () {//Call a function when the state changes.
        if (http.readyState === 4 && http.status === 200) {
            var list = http.responseText;
            c.call(this, list);
        }
    };
    http.send();
}
function find(e, f, equal = false, path = "", first = true) {
    var index = -1;
    for (var i = 0; i < e.length; i++) {
        if (equal) {
            if (f === eval("e[i]" + path)) {
                index = i;
                if (first) {
                    return index;
                }
            }
        } else {
            if (f.toString().indexOf(eval("e[i]" + path)) > -1) {
                index = i;
                if (first) {
                    return index;
                }
            }
        }
    }
    return index;
}
function prepstrlist(doc) {
    var list = doc.split("<a href=\"andere-serien\">Alle Serien</a>")[1].split("id=\"waste1\"")[0].split("id=\"series-menu\">");
    var indexList = list[1].split("</ul>")[0].split("\n"); //start at 1; end -1;
    Stringlist = new Array(0);
    var anime = false;
    for (var i = 1; i < indexList.length - 2; i++) {
        if (indexList[i].split("<li data-id=\"")[1].split("</li>\"")[0].split("\">")[0] !== "AnimeBorder") {
            Stringlist.push({id:indexList[i].split("data-id=\"")[1].split("\">")[0],name:indexList[i].split("\">")[1].split("</li")[0].replace("&#039;","'")});
        }
    }
    return Stringlist;
}
function rI(e, f) {     //array e element of e index f
    var g = new Array(e.length - 1);
    for (var i = 0; i < e.length; i++) {
        if (i < f) {
            g[i] = e[i];
        } else {
            if (i === f) {
            } else {
                g[i - 1] = e[i];
            }
        }
    }
    return g;
}