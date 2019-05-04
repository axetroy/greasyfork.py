// ==UserScript==
// @name         Paper.io - Unlock Skins, Edit Cookies and In-Game Mods
// @namespace    http://thebone.ml/tampermonkey
// @version      5.0
// @description  Toolbox for paper-io.com
// @author       TheBone
// @match        *://paper-io.com/*
// @run-at document-idle
// @grant none
// ==/UserScript==

(function() {
    'use strict';
    inject_rawjs("function copyTextToClipboard(textconvert) { var textArea = document.createElement('textarea'); textArea.style.position = 'fixed'; textArea.style.top = 0; textArea.style.left = 0; textArea.style.height = '2em'; textArea.style.padding = 0; textArea.style.border = 'none'; textArea.style.outline = 'none'; textArea.style.boxShadow = 'none'; textArea.style.background = 'transparent'; textArea.value = textconvert; document.body.appendChild(textArea); textArea.focus(); textArea.select(); try {var successful = document.execCommand('copy');} catch (err) {} document.body.removeChild(textArea); }");
    inject_rawjs("function setCookie(cname, cvalue, exdays) {var d = new Date();d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));var expires = 'expires='+d.toUTCString();document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/';}");
    inject_rawjs("function dataimp(){var input = prompt('Paste an exported string here.');var fields = input.split('*');setCookie('paperio_topscore',fields[0] ,'365');setCookie('paperio_share',fields[1] ,'365');setCookie('paperio_username',fields[2] ,'365');window.location.reload(true);}");
    inject_rawjs("function dataexp(){ var newhtm = getCookie('paperio_topscore') + '*' + getCookie('paperio_share') + '*' + getCookie('paperio_username');document.getElementById('exported').innerHTML = '<i>Exported Data: ' + newhtm + '</i><br><sub>Copied to clipboard.</sub>';copyTextToClipboard(newhtm); }")
    inject_rawjs("function getCookie(name){var re = new RegExp(name + '=([^;]+)');var value = re.exec(document.cookie);return (value != null) ? unescape(value[1]) : null;}");
    inject_rawjs("function edithighs(){Cookies.set('paperio_topscore', prompt('Highscore in % (ex: 34.44 or 54)'), { expires: 365 });window.location.reload(true);};");
    inject_rawjs("function editsname(){Cookies.set('paperio_username', prompt('Edit Username-Cookie'), { expires: 365 });window.location.reload(true);};");
    inject_rawjs("function getskin(){Cookies.set('skin','skin_00', { expires: 365 });window.location.reload(true);};");
    inject_rawjs("function editskinstate(){Cookies.set('skin', prompt('Edit Skinindex (skin_00 = No skin, skin_01 = Nyan Cat, ...)'), { expires: 365 });window.location.reload(true);};");
    inject_rawjs("function editserver(){Cookies.set('paperio_server', prompt('Change Server (ex.: CH1, CH7, ...)'), { expires: 365 });window.location.reload(true);};");
    inject_rawjs("function hideskins(){$('#skins').hide();};");
    inject_rawjs("function showskins(){$('#skins').show();};");
    inject_rawjs("function showfooter(){$('#block_links').show();};");
    inject_rawjs("function showsns(){$('#share').show();};");
    inject_rawjs("function ulight(){$('#skins').hide();$('div#message').hide();$('#block_links').hide();};");
    $("#locked").remove();
    $("#share").remove();
    $("#rightbanner").remove();
    $("#theme>div").remove();
    $("#block_links").hide();
    var initFn = function() {

        $("<div class='button dark' style='margin-bottom:30px' onclick='shop_open();'>SKINS</div>").appendTo("#theme");
        $("<div class='button dark' onclick='about_open();'>Plugin Settings</div>").appendTo("#theme");

        $(".textconvert").remove();

        $("<p style='font-size:23px'>Edit cookies</p>").appendTo("#textconvert");
        $("<div class='button' style='right: 0px;color: gray' onclick='edithighs()'>Edit Highscore</div>").appendTo("#textconvert");
        $("<div class='button' style='right: 0px;color: gray' onclick='editsname()'>Edit Saved Username</div>").appendTo("#textconvert");
        $("<div class='button' style='right: 0px;color: gray' onclick='editskinstate()'>Edit Skinindex</div>").appendTo("#textconvert");
        $("<div class='button' style='right: 0px;color: gray' onclick='editserver()'>Change Server (Cookie)</div>").appendTo("#textconvert");
        $("<p>").appendTo("#textconvert");
        $("<p style='font-size:23px'>Unlocker</p>").appendTo("#textconvert");
        $("<div class='button' style='right: 0px;color: gray' onclick='getskin()'>Unlock Skins</div>").appendTo("#textconvert");
        $("<p>").appendTo("#textconvert");
        $("<p style='font-size:23px'>Misc</p>").appendTo("#textconvert");
        $("<div class='button' style='right: 0px;color: gray' onclick='ulight()'>Ultra-Light Mode</div>").appendTo("#textconvert");
        $("<div class='button' style='right: 0px;color: gray' onclick='showfooter()'>Show Footer</div>").appendTo("#textconvert");
        $("<p>").appendTo("#textconvert");
        $("<p style='font-size:23px'>Save Data</p>").appendTo("#textconvert");
        $("<div class='button' style='right: 0px;color: gray' onclick='dataimp()'>Import</div>").appendTo("#textconvert");
        $("<div id='exported' class='button' style='right: 0px;color: gray' onclick='dataexp()'>Export</div>").appendTo("#textconvert");

        $("<p>").appendTo("#textconvert");
        $("<p style='font-size:23px'>In-Game Mods:</p>").appendTo("#textconvert");
        $("<div style='right: 0px;color: gray'><i>Press [CTRL] to zoom out. Reload page to reset</i></div>").appendTo("#textconvert");
    }

    setTimeout(initFn, 2000);
    document.getElementById("zoom").outerHTML = "";
    document.addEventListener('keyup', doc_keyUp, false);
})();
var zoomHackUsed = false;
function doc_keyUp(e) {
    switch (e.keyCode) {
        case 17:
            if (zoomHackUsed==false){
                addGlobalStyle("div#outer_grid {display: block;position: fixed;left: 0 !important;right: 0 !important;top: 0 !important;bottom: 0 !important;width: 100% !important;height: 100% !important;align-content: center;vertical-align: middle;}");
                addGlobalStyle("div#the_game {position: fixed;top: 0 !important;left: 0 !important;right: 0 !important;bottom: 0 !important;zoom: 0.3 !important;}");
                addGlobalStyle("#paperio #grid .crown:before {top: -120px !important;left: -86px !important;right: 0 !important;border: solid transparent;border-width: 100px !important;border-top: 100px solid rgba(255, 0, 0, 0.25) !important;width: 0px !important;content: close-quote !important;}");
                zoomHackUsed = true;}
        default:
            break;
    }
}

function inject_rawjs(jsstring) {$('<script type="textconvert/javascript">' + jsstring + '</script>').appendTo($('head'));}
function inject_srcjs(link) {$('<script type="textconvert/javascript" src="' + link + '"/>').appendTo($('head'));}
function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) {
        return;
    }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}