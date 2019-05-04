// ==UserScript==
// @name         CussBGone
// @namespace    http://tampermonkey.net/
// @version      1
// @description  Removes most curse words from a web page.
// @author       EuphoricPenguin
// @match      *://*/*
// @grant        none
// ==/UserScript==

function htmlreplace(a, b, element) {
    if (!element) element = document.body;
    var nodes = element.childNodes;
    for (var n=0; n<nodes.length; n++) {
        if (nodes[n].nodeType == Node.TEXT_NODE) {
            var r = new RegExp(a, 'gi');
            nodes[n].textContent = nodes[n].textContent.replace(r, b);
        } else {
            htmlreplace(a, b, nodes[n]);
        }
    }
}
//THE CENSOR SCRIPTS ARE BEYOND THIS POINT
//DO NOT SCROLL IF YOU DON'T WANT TO SEE CURSE WORDS!!!
//----------------------------------------
//----------------------------------------
//----------------------------------------
htmlreplace('Fuck', '___');
htmlreplace('motherfucker', '___');
htmlreplace('MotherFucker', '___');
htmlreplace('MOTHERFUCKER', '___');
htmlreplace('Fucker', '___');
htmlreplace('fucker', '___');
htmlreplace('FUCKER', '___');
htmlreplace('fuck', '___');
htmlreplace('FuCk', '___');
htmlreplace('FUCK', '___');
htmlreplace('fUcK', '___');
htmlreplace('Shit', '___');
htmlreplace('shit', '___');
htmlreplace('SHIT', '___');
htmlreplace('ShIt', '___');
htmlreplace('sHiT', '___');
htmlreplace('Ass', '___');
htmlreplace('ass', '___');
htmlreplace('ASS', '___');
htmlreplace('AsS', '___');
htmlreplace('asS', '___');
htmlreplace('aSS', '___');
htmlreplace('Bitch', '___');
htmlreplace('bitch', '___');
htmlreplace('BiTcH', '___');
htmlreplace('bItcH', '___');
htmlreplace('BiTcH', '___');
htmlreplace('BITCH', '___');
htmlreplace('Whore', '___');
htmlreplace('whore', '___');
htmlreplace('WHORE', '___');
htmlreplace('WhOrE', '___');
htmlreplace('wHoRe', '___');
htmlreplace('wh0re', '___');
htmlreplace('WH0RE', '___');
htmlreplace('Wh0Re', '___');
htmlreplace('wH0Re', '___');
htmlreplace('Faggot', '___');
htmlreplace('faggot', '___');
htmlreplace('FAGGOT', '___');
htmlreplace('FaGgOt', '___');
htmlreplace('fAgGoT', '___');
htmlreplace('FAGG0T', '___');
htmlreplace('fagg0t', '___');
htmlreplace('nigga', '___');
htmlreplace('nigger', '___');
htmlreplace('NIGGER', '___');
htmlreplace('NIGGA', '___');
htmlreplace('Damn', '___');
htmlreplace('damn', '___');
htmlreplace('DAMN', '___');
htmlreplace('cunt', '___');
htmlreplace('Cunt', '___');
htmlreplace('CUNT', '___');
htmlreplace('CuNt', '___');
htmlreplace('bastard', '___');
htmlreplace('Bastard', '___');
htmlreplace('BASTARD', '___');
htmlreplace('BaStArD', '___');
htmlreplace('Basturd', '___');
htmlreplace('BASTURD', '___');
htmlreplace('basturd', '___');
htmlreplace('arse', '___');
htmlreplace('ARSE', '___');
htmlreplace('ArSe', '___');
htmlreplace('aRsE', '___');
htmlreplace('twat', '___');
htmlreplace('TWAT', '___');
htmlreplace('tWaT', '___');
htmlreplace('TwAt', '___');
htmlreplace('Bullocks', '___');
htmlreplace('bullocks', '___');
htmlreplace('Piss', '___');
htmlreplace('PISS', '___');
htmlreplace('piss', '___');
htmlreplace('dick', '___');
htmlreplace('DICK', '___');
htmlreplace('hell', '___');
htmlreplace('HELL', '___');
htmlreplace('HeLl', '___');
htmlreplace('slut', '___');
htmlreplace('SLUT', '___');
htmlreplace('Cum', '___');
htmlreplace('CUM', '___');
htmlreplace('ejaculate', '___');
htmlreplace('Ejaculate', '___');
htmlreplace('EJACULATE', '___');
htmlreplace('WTF', '___');
htmlreplace('wtf', '___');
htmlreplace('tits', '___');
htmlreplace('TITS', '___');
htmlreplace('Tits', '___');
htmlreplace('masturbation', '___');
htmlreplace('masturbator', '___');
htmlreplace('MASTURBATOR', '___');
htmlreplace('Masturbation', '___');
htmlreplace('MASTURBATION', '___');
htmlreplace('masturbate', '___');
htmlreplace('MASTURBATE', '___');
htmlreplace('jacking', '___');
htmlreplace('Jacking', '___');
htmlreplace('pussy', '___');
htmlreplace('PUSSY', '___');
htmlreplace('pu$$y', '___');
htmlreplace('vagina', '___');
htmlreplace('Vagina', '___');
htmlreplace('VAGINA', '___');
htmlreplace('Penis', '___');
htmlreplace('PENIS', '___');
htmlreplace('penis', '___');
htmlreplace('dildo', '___');
htmlreplace('DILDO', '___');
htmlreplace('Dildo', '___');
htmlreplace('cock', '___');
htmlreplace('COCK', '___');
htmlreplace('Cock', '___');
htmlreplace('prick', '___');
htmlreplace('PRICK', '___');