// ==UserScript==
// @name         adf.ly KILLER
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Skips adf.ly, shorte.st and many more link shorteners!
// @author       SzAmmi
// @run-at       document-idle
// @match        *://*/*
// @grant        none
// ==/UserScript==

var supportedLinks = [];
var excludedLinks = [];

function load(arr){
    var newArr = [];
    for(var i of arr){
        var match = i.match(new RegExp('^/(.*?)/([gimyus]*)$'));
        newArr.push(new RegExp(match[1], match[2]));
    }
    return newArr;
}

var killerList = localStorage.getItem("ADFLY_KILLER_LIST");
var killerEList = localStorage.getItem("ADFLY_KILLER_ELIST");
if(killerList !== null) supportedLinks = load(JSON.parse(killerList));
if(killerEList !== null) excludedLinks = load(JSON.parse(killerEList));

function update(){
    var req = new XMLHttpRequest();
    req.open('GET', 'https://killer.suchcrypto.co/jlist', true);
    req.onreadystatechange = function(e){
        if(req.readyState == 4){
            if(req.status == 200){
                var data = JSON.parse(req.responseText);
                localStorage.setItem('ADFLY_KILLER_LIST', JSON.stringify(data.list));
                localStorage.setItem('ADFLY_KILLER_ELIST', JSON.stringify(data.elist));
                supportedLinks = load(data.list);
                excludedLinks = load(data.elist);
            }
        }
    };
    req.send(null);
}

update();

var updateInterval = setInterval(update, 1000 * 60 * 60 * 3);
document.addEventListener("DOMContentLoaded", function(event) {
    var url = window.location.href;
    for(let regex of excludedLinks) if(regex.test(url)) return;
    for(let regex of supportedLinks){
        if(regex.test(url)){
            var req = new XMLHttpRequest();
            req.open('GET', 'https://killer.suchcrypto.co/kill?' + url, false);
            try{
                req.send(null);
                if(req.status == 200){
                    window.location.replace(req.responseText);
                    return;
                }
            }catch(e){
                console.log("adf.ly KILLER: ERROR:");
                console.error(e);
            }
            break;
        }
    }
}