// ==UserScript==
// @name         MyShows-ignor
// @namespace    myshows.me
// @version      0.2
// @description  ignore the ducks
// @author       kvark
// @match        https://myshows.me/*
// @run-at       document-start
// @grant        none
// ==/UserScript==
var ignored = ['DI-MAX','AiyoreNyarko-san',];

var igcss = '';

for (var i = 0; i < ignored.length; i++) {
    var u = ignored[i]
        igcss += 'div.commBlock>a.userBlockPic[title=\''+u+'\']>span,'+
        'div.commBlock>a.userBlockPic[title=\''+u+'\']+div.commBlockBody>div._text{display:none}';
}

addcss('scraddig', igcss);

function addcss(idstr, cstr) {
    var node = document.createElement('style');
    node.type = 'text/css';
    node.id = idstr;
    node.appendChild(document.createTextNode(cstr));
    var heads = document.getElementsByTagName('head');
    if (heads.length > 0) {
        heads[0].appendChild(node);
    } else {
        // no head yet, stick it whereever
        document.documentElement.appendChild(node);
    }
    return node;
}


function rplhe() {
    for (var i = 0; i < ignored.length; i++) {
        var duck = document.querySelectorAll('div.commBlock>a.userBlockPic[title=\''+ignored[i]+'\']');
        for (var j = 0; j < duck.length; j++)
            duck[j].parentElement.querySelector('div.commBlockBody>p._meta>a[href^=http').innerHTML = '.:[ignored]:.';
    }

    try {
        document.getElementsByTagName('footer')[0].addEventListener("DOMContentLoaded", clearInterval(rplintrID), false);
    }
    catch(e){}
}
var rplintrID = setInterval(rplhe, 0);
