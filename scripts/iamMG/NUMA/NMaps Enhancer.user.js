// ==UserScript==
// @name        NUMA/NMaps Enhancer
// @namespace   iamMG
// @version     1.0
// @description Improves NUMA website
// @author      iamMG
// @match       http*://www.nmaps.net/*
// @match       http*://numa-notdot-net.appspot.com/*
// @match       http*://myversion-dot-nmapsdotnet.appspot.com/*
// @grant       GM_setClipboard
// @grant       GM.openInTab
// @run-at		document-end
// @copyright 	2018, iamMG (https://openuserjs.org//users/iamMG)
// @license 	MIT
// ==/UserScript==

(function() {
    'use strict';
    var datedetails = document.getElementsByClassName('attribs');
    for (var h=0; h<datedetails.length; h++){
        Object.assign(datedetails[h].style,{backgroundImage: "none", width: "auto", font:"12px Tahoma, sans-serif", color: "#000000"});
    }
    var title = document.getElementsByClassName('section');
    function addRandomMaps(button, author){
        button.addEventListener('click', function(e){
            window.open('http://www.nmaps.net/browse?q=author%3A' + author + '&start=0&count=5&random=true', "", "", false);
        }, false)
        return button;
    }
    function addCopyMapID(button, mapnum){
        button.addEventListener('click', function(e){
            var temp = document.createElement("textarea");
            document.body.appendChild(temp);
            temp.innerText = mapnum;
            temp.select();
            document.execCommand('copy');
            temp.parentElement.removeChild(temp);
        }, false)
        return button;
    }
    function addCopyMapData(button, data){
        button.addEventListener('click', function(e){
            data.select();
            document.execCommand('copy');
        }, false)
        return button;
    }
    function addInfunityLink(button, mapnum){
        button.addEventListener('click', function(e){
            window.open('http://n.infunity.com/numa_speedrun.php?mapID=' + mapnum, "", "", false);
        }, false)
        return button;
    }
    function addNumaLink(button, mapnum){
        button.addEventListener('click', function(e){
            window.open('http://www.nmaps.net/' + mapnum, "", "", false);
        }, false)
        return button;
    }
    function buttonMaker(text, type){
        var button = document.createElement("BUTTON");
        Object.assign(button.style,{backgroundColor: "#fcad3d", borderStyle: "solid", borderColor: "#363332", borderWidth: "2px", color: "#000000", font: "12px Verdana, Tahoma, sans-serif", margin: "4px 4px 4px 0px", padding: "1px 7px 2px 7px", cursor: "copy"});
        if (type==1){
            Object.assign(button.style,{cursor: "copy"});
        } else {
            Object.assign(button.style,{cursor: "pointer"});
        }
        button.appendChild(document.createTextNode(text));
        return button;
    }
    if (window.location.pathname == '/browse' || window.location.pathname == '/featured'){
        for (var i=0; i<title.length; i++){
            var mapnum = title[i].getElementsByClassName('body')[0].childNodes[1].getAttribute('href').replace('/', '');
            var author = title[i].getElementsByClassName('formtable')[0].getElementsByTagName('td')[0].innerText;
            title[i].appendChild(addCopyMapID(buttonMaker("☍ copy id",1), mapnum));
            title[i].appendChild(addInfunityLink(buttonMaker("view on n.infunity.com ⬈",2), mapnum));
            title[i].appendChild(addNumaLink(buttonMaker("open in new tab ⬈",2), mapnum));
            title[i].appendChild(addRandomMaps(buttonMaker("5 random maps of author ⬈",2), author));
        };
    } else if (!isNaN(parseInt(window.location.pathname.replace('/','')))){
        var mapnumQ = window.location.pathname.replace('/','');
        var authorQ = title[0].getElementsByClassName('formtable')[0].getElementsByTagName('td')[0].innerText;
        title[0].appendChild(addCopyMapID(buttonMaker("☍ copy id",1), mapnumQ));
        title[0].appendChild(addInfunityLink(buttonMaker("view on n.infunity.com ⬈",2), mapnumQ));
        title[0].appendChild(addRandomMaps(buttonMaker("5 random maps of author ⬈",2), authorQ));
        var data = document.getElementsByTagName('textarea');
        for (var j=0; j<data.length-2; j++){
            data[j].parentElement.appendChild(addCopyMapData(buttonMaker("☍ copy data",1), data[j]));
        }
    }
})();