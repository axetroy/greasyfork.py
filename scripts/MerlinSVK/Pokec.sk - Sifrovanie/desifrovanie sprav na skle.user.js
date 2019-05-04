// ==UserScript==
// @name           Pokec.sk - Sifrovanie/desifrovanie sprav na skle
// @description    Pridava moznost pisat na sklo sifrovane. Spravy desifruje len ten, kto ma skript a spravne heslo.
// @namespace      Pokec.sk, nove, sklo, azet
// @include        http://pokec-sklo.azet.sk/miestnost/*
// @date           2017-05-08
// @author         MerlinSVK, Pulo15
// @icon           http://s.aimg.sk/pokec_base/css/favicon.ico
// @require        https://cdn.jsdelivr.net/jquery.spectrum/1.3.3/spectrum.js
// @resource       specCSS https://cdn.jsdelivr.net/jquery.spectrum/1.3.3/spectrum.css
// @version        2.4
// @license        MIT
// @grant          GM_addStyle
// @grant          GM_getResourceText
// ==/UserScript==

/*
 ### v1.1 - opraveny problem s desifrovanim pod Firefoxom
 ### v1.2 - ukladanie/nacitavanie hesla
          - opravene desifrovanie sprav s linkom a smajlikom
 ### v1.3 - zvysena bezpecnost sifrovania dalsim sifrovanim
 ### v1.4 - pridana moznost menit si farby pozadia sifrovaneho textu
 ### v1.5 - zmeneny sposob vyberu farby pozadia
          - aplikacia novej farby bez potreby refreshu stranky
 ### v1.6 - pridana moznost zmenit farbu textu
          - upraveny system sifrovania
 ### v1.7 - oprava zleho nacitavania default farby v pickery
          - pridany okraj pickerov
 ### v1.8 - navratenie k povodnemu systemu sifrovania, kvoli zvlastnemu bugu
 ### v1.9 - pridana moznost potvrdzovania odoslania spravy
            (prevencia voci nechcenemu odoslaniu sifrovanej spravy nespravnej osobe)
 ### v2.0 - potvrdzovanie som zatial odstranil, kym nenajdem spolahlive riesenie
          - pridane upozornenie na nenastavene (prazdne) heslo
          - pridane automaticke ukladanie hesla (nie je potrebne odoslat spravu na jeho ulozenie)
 ### v2.1 - tak problem s potvrdzovanim odosielania sprav vyrieseny :))
 ### v2.2 - mensia uprava systemu sifrovania
 ### v2.3 - fix chybajucej medzeri na zaciatku desifrovanej spravy
 ### v2.4 - upravene spustanie desifrovacej funkcie
*/

var encTag = "^^^";  // znacka oznacujuca sifrovane spravy
var confirmMsg = false;
var form = $("#odosielac");
var doc = document;
var LS = localStorage;
var AZevent = form.data("events").submit[0].handler;  // ulozi originalny event

// prida css color pickera do hlavicky stranky
var specCSS = GM_getResourceText("specCSS");
var specCSS_custom =
    ".sp-dd {display: none}"+
    ".sp-preview, .sp-replacer {border: none}"+
    ".sp-preview {height: 10px}"+
    ".sp-preview-inner {border: 1px solid #000}"+
    ".sp-replacer {background: none; padding: 0; margin: 0 0 0 10px; height: 12px}";

/* ------------------------------------------- */
function switchEvent(status){
    if (status == "on") {
        form.off("submit").on("submit", doEncrypt);  // nahradi originalny event za doEncrypt
    }
    else {
        form.off("submit").on("submit", function (e) { // vrati originalny event
            $.proxy(AZevent, form)(e);
            return false;
        });
    }
}

function insertModFunc(){
    if (document.getElementById("msgBoxMod") === null) { // ak funkcia este nebola vlozena...
        var msgBoxMod = 'function azetMsgBox_escKey(a){"27"==a.keyCode&&$(".azmsgbox p.css_xkruh > a").click(),a.stopPropagation()}';
        var script = document.createElement("script");
        script.id = "msgBoxMod";
        script.appendChild(document.createTextNode(msgBoxMod));
        (document.body || document.head || document.documentElement).appendChild(script);
    }
}

function removeModFunc(){
    $("#msgBoxMod").remove();
}

function validateKey(key){
    var numbers = key.match(/\d+/g);
    var letters = key.match(/[a-zA-Z]+/g);

    if (key === "" || key == "undefined"){ // ak je heslo prazdne alebo nastavene na "undefined"
        sendMessage.showError("Nemáš nastavené heslo!");
        return false;
    }
    else {
        if (numbers !== null && letters === null){  // ak heslo obsahuje cisla a neobsahuje pismena
            sendMessage.showError("Heslo musí obsahovať aj písmená!");
            return false;
        }
        else return true;
    }
}

function saveKey(){
    var key = $("#heslo").val();
    LS.setItem("key", key);
    sendMessage.showError("Aktuálne heslo: " + JSON.stringify(key));
}

function reverse(s){
    for (var i = s.length - 1, o = ''; i >= 0; o += s[i--]) { }
    return o;
}

function doEncrypt(){
    var input = $("#messageText").val();
    if (input === ""){
        sendMessage.showError("Správa musí obsahovať text!");
        return false;
    }
    var output = "";
    var key = $("#heslo").val();
    var validkey = validateKey(key);
    if (!validkey) return false; // ak nie je platne heslo, nerob nic
    var encMsg = vigenereEncryptText(input, rot135(key));
    encMsg = rot135(encMsg);
    output = encTag + " " + reverse(encMsg);

    if (confirmMsg) {  // ak je potvrdzovanie zapnute
        insertModFunc();
        azetMsgBox('confirm',{title:'Upozornenie',text:'<p><b>Naozaj chceš odoslať túto šifrovanú správu?</b></p><br>',yesButton:'Áno',noButton:'Nie'},function(callback){
            if (callback) { // po kliknuti na "ano"
                $("#messageText").val(output);  // vlozi zasifrovanu podobu textu
                switchEvent("off");
                $("#odosielac").submit();  // odosle spravu
                switchEvent("on");
            }
            else {  /* po kliknuti na "nie" alebo "x" neurobi nic */   }
        });
        removeModFunc();
    }
    else {
        $("#messageText").val(output);  // vlozi zasifrovanu podobu textu
        switchEvent("off");
        $("#odosielac").submit();  // odosle spravu
        switchEvent("on");
    }
    return false;
}

function doDecrypt(){
    var key = $("#heslo").val();
    var validkey = validateKey(key);
    var msgs = $(".prispevok > span:contains('"+encTag+"')");
    var encMsgs = msgs.contents().filter(function(){
        return this.nodeType == Node.TEXT_NODE;
    });

    if (validkey) { // ak je platne heslo, aplikuje farby a desifruje spravy
        encMsgs.closest(".dd").css({
            "color": LS.getItem("fgcolor"),
            "background": LS.getItem("bgcolor")
        }).attr("data-enctag", encTag);

        for (i = 0; i < msgs.length; i++){
            var input = $(encMsgs[i]).text().replace(encTag,"");
            var output = "";
            input = reverse(input);
            input = rot135(input);
            output = " " + vigenereDecryptText(input, rot135(key));
            encMsgs[i].nodeValue = output; // vlozi desifrovany text
        }
    }
    else return false;
}

function addGUI(){
    var cryptButton = '<a id="sifrovanie" href="#" title="Zapína a vypína šifrovanie správ" class="piskotka">Šifrovanie</a>';
    var phraseInput = '<input type="password" placeholder="Heslo…" id="heslo" value="" autocomplete="off" maxlength="25" style="margin-left:10px; width:100px; height: 16px; padding: 0 2px 0 2px; border-radius:3px">';
    var decryptButton = '<a id="desifrovanie" href="#" title="Spustí dešifrovanie manuálne" style="margin-left:5px">Dešifrovať</a>';
    var fgSwitch = '<input id="fgColor" type="color" />';
    var bgSwitch = '<input id="bgColor" type="color" />';
    var checkbox = '<a id="confirmBox" href="#" title="Zapína a vypína potvrdzovanie odosielania správ" class="piskotka">Potvrdzovanie</a>';

    if (LS.getItem("fgcolor") === null) { LS.setItem("fgcolor", "#FFFFFF"); } // nastavi default bielu farbu textu, ak este farba nebola zvolena
    if (LS.getItem("bgcolor") === null) { LS.setItem("bgcolor", "#DD0000"); } // nastavi default cervenu farbu pozadia, ak este farba nebola zvolena

    GM_addStyle(specCSS);
    GM_addStyle(specCSS_custom);

    var htmlString = cryptButton + '<span id="encControls" style="display: none">' + phraseInput + fgSwitch + bgSwitch + checkbox + decryptButton +'</span>';
    doc.getElementById("skloNapoveda").insertAdjacentHTML("afterend", htmlString);

    $("#fgColor").spectrum({
        showInput: true,
        showAlpha: true,
        cancelText: "zrušiť",
        chooseText: "uložiť",
        change: function(color){
            LS.setItem("fgcolor", color);  // ulozi farbu do localstorage
            $('div[data-enctag="'+encTag+'"]').css("color", color);  // aplikuje novu farbu textu
            sendMessage.showError("Farba textu bola uložená");
            return false;
        }
    })
        .spectrum("set", LS.getItem("fgcolor"));
    $(".sp-replacer")[0].setAttribute("title", "Farba textu");

    $("#bgColor").spectrum({
        showInput: true,
        showAlpha: true,
        cancelText: "zrušiť",
        chooseText: "uložiť",
        change: function(color){
            LS.setItem("bgcolor", color);  // ulozi farbu do localstorage
            $('div[data-enctag="'+encTag+'"]').css("background", color);  // aplikuje novu farbu pozadia
            sendMessage.showError("Farba pozadia bola uložená");
            return false;
        }
    })
        .spectrum("set", LS.getItem("bgcolor"));
    $(".sp-replacer")[1].setAttribute("title", "Farba pozadia");


    $("#sifrovanie").on("click", function(){
        $(this).toggleClass("aktivna");
        if ($(this).hasClass("aktivna")){
            switchEvent("on");
            $("#encControls").fadeIn(250,"swing");
        }
        else {
            switchEvent("off");
            $("#encControls").fadeOut(250,"swing");
        }
    });

    $("#confirmBox").on("click", function(){
        $(this).toggleClass("aktivna");
        if ($(this).hasClass("aktivna")){
            confirmMsg = true;
        }
        else {
            confirmMsg = false;
        }
    });

    if (LS.getItem("key") !== null) { // ak je heslo ulozene v localStorage
        $("#heslo").val(LS.getItem("key"));
    }
    $("#desifrovanie").on("click", doDecrypt);
    $("#heslo").on("input", saveKey);
}

/* --------------------------- */
function rot(t,u,v){return String.fromCharCode(((t-u+v)%(v*2))+u);}
function rot13(s){var b=[],c,i=s.length,a='a'.charCodeAt(),z=a+26,A='A'.charCodeAt(),Z=A+26;while(i--){c=s.charCodeAt(i);if(c>=a&&c<z){b[i]=rot(c,a,13);}
                                                                                                       else if(c>=A&&c<Z){b[i]=rot(c,A,13);}
                                                                                                       else{b[i]=s.charAt(i);}}
                  return b.join('');}
function rot5(s){var b=[],c,i=s.length,a='0'.charCodeAt(),z=a+10;while(i--){c=s.charCodeAt(i);if(c>=a&&c<z){b[i]=rot(c,a,5);}
                                                                            else{b[i]=s.charAt(i);}}
                 return b.join('');}
function rot135(s){return rot13(rot5(s));}

/* ------------ START OF VIGENERE CIPHER FUNC ------------
   Script:  Vigenere Cipher
   Author:  Andrew Lim Chong Liang
   Wesite:  http://windrealm.org/vigenere/
*/

function isLetter(c){return c.match(/[a-zA-Z]+/);}
function isUpperCase(c){return c.match(/[A-Z]+/);}
function isLowerCase(c){return!isUpperCase(c);}
function keepLetters(s){return s.replace(/[^a-zA-Z]+/g,"");}
function vigenereEncryptChar(t,k){if(!isLetter(t)||!isLetter(k)){return t;}
                                  var uppercase=isUpperCase(t);t=t.toLowerCase().charCodeAt(0);k=k.toLowerCase().charCodeAt(0);a="a".charCodeAt(0);A="A".charCodeAt(0);return String.fromCharCode((uppercase?A:a)+(((t-a)+(k-a))%26));}
function vigenereDecryptChar(c,k){if(!isLetter(c)||!isLetter(k)){return c;}
                                  var uppercase=isUpperCase(c);c=c.toLowerCase().charCodeAt(0);k=k.toLowerCase().charCodeAt(0);a="a".charCodeAt(0);A="A".charCodeAt(0);var t=a+((c-a)-(k-a));if(t<a){t+=26;}
                                  t=String.fromCharCode(t);return uppercase?t.toUpperCase():t;}
function vigenereEncryptText(text,key){key=keepLetters(key);var cipher="";var i=0;var keyIndex=0;for(;i<text.length;++i){var t=text.charAt(i);if(isLetter(t)){k=key.charAt(keyIndex++%key.length);c=vigenereEncryptChar(t,k);cipher+=c;}else{cipher+=t;}}
                                       return cipher;}
function vigenereDecryptText(cipher,key){key=keepLetters(key);var text="";var i=0;var keyIndex=0;for(;i<cipher.length;++i){var c=cipher.charAt(i);if(isLetter(c)){k=key.charAt(keyIndex++%key.length);t=vigenereDecryptChar(c,k);text+=t;}else{text+=c;}}
                                         return text;}

/* ------------ END OF VIGENERE CIPHER FUNC ------------ */

$(document).ready(addGUI);
$('#sklo').on('DOMNodeInserted',function(e){if($(e.target).hasClass('sprava')){doDecrypt();}});
$('#sklo').on('DOMNodeRemoved',function(e){if($(e.target).hasClass('sprava')){doDecrypt();}});