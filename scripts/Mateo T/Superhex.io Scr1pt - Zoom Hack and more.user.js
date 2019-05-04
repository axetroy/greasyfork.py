// ==UserScript==
// @name         Superhex.io Scr1pt - Zoom Hack and more
// @namespace    Superhex.io Scr1pt
// @version      1.8.2
// @license      MIT
// @homepageURL  https://github.com/TBM13/Superhex.io-Scr1pt
// @contributionURL https://www.paypal.me/tbm13
// @icon         http://superhex.io/img/fav_icon_1.png
// @description  Mod for Superhex.io
// @description:es-ES Mod para Superhex.io
// @author       TBM13
// @match        http://superhex.io/*
// @match        www.superhex.io/*
// @grant        none

// ==/UserScript==

/*
MIT License

Copyright (c) 2018 TBM13 (TBM_13 or TBM 13)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

var Text1TBM = localStorage.getItem("Text1TBM"), AdsTBM = localStorage.getItem("AdsTBM"), Language = localStorage.getItem("LangTBM"), currSkin = localStorage.getItem("selectedSkin"), currQuality = localStorage.getItem("quality"), zoomHack = localStorage.getItem("zoomTBM"), zoomValue = localStorage.getItem("zoomValTBM");
var style = document.createElement("style");
style.type = "text/css";
style.innerHTML = 'button.scr1ptGreen, a.scr1ptGreen {line-height: 1; outline: none; color: white;  background-color: #5CB85C; border-radius: 4px; border-width: 0px; transition: 0.3s;} button.scr1ptGreen:hover, a.scr1ptGreen:hover {background-color: #4a934a; color: #cccccc; cursor: pointer;} button.scr1ptGreen:active, a.scr1ptGreen:active {background-color: #387038;} button.scr1ptGreen.unselected {opacity: 0.5;} button.scr1ptGreen .spinner {display: none; vertical-align: middle;} button.scr1ptGreen.button-loading {background-color: #7D7D7D; color: white;} button.scr1ptGreen.button-loading .spinner {display: inline-block;} button.scr1ptGrey {line-height: 1; color: #757575; background-color: white; transition: 0.3s;} button.scr1ptGrey:hover {background-color: #cccccc; color: #5e5e5e; cursor: pointer;}';
document.getElementsByTagName("head")[0].appendChild(style);
var adsDeleted = false,
    skinPag = 1,
    superhex = window.superhex,
    adsRestoredTxt = "Ads restored. To see the changes, reload the website.", adBlockedTxt = "Ad blocked by Superhex.io Scr1pt",
    qChangeTxt = "Insert value. Example:\n0.25: Very low\n0.5: Low\n0.75: Medium\n1: High\n1.5: Very high\n2: Ultra", q27Txt = "WARNING: Quality value higher than 2.7 can cause problems.", q01Txt = "WARNING: Quality value lower than 0.1 can cause problems.", qInvalidTxt = "Invalid value. Make sure to only use numbers.\nExample: 1.2", qChangedTxt = "Quality changed to: ",
    sChangeTxt = "Skin ID:\nNote: For 0 use 0.1", sInvalidTxt = "Invalid ID. Make sure to only use numbers.", s0Txt = "Skin changed to: 0", sNotChangedTxt = "Skin not changed.", sChangedTxt = "Skin changed to: ", sErrorTxt = "An error has occurred. Make sure to insert a valid ID.", sTheSTxt = "The skin ", sNoExist = " doesn't exist. Enter a number less than 10.",
    pTextTxt = "Play button text:", pTextNotChangedTxt = "Play button text not changed.", pTextChangedTxt = "Play button text changed to: ",
    sUnlockekdTxt = "You already have the skins unlocked.", sUnlockedsTxt = "The following skins were unlocked:", sChickenTxt = "Yellow chicken.", sBirdTxt = "Light blue bird.", sCowTxt = "Cow.", sBird2Txt = "Red bird.", sElephantTxt = "Elephant.",
    loadingScriptTxt = "Loading Superhex.io Scr1pt...", loadingInfoTxt = "If the script doesn't load, refresh the website (F5).",
    sAlreadyTxt = "You are already using the skin ",
    keyActionsTxt = "Keys:\n\n1 = Hide/show Leaderboard.\n0 = Hide/show UI.\n2 = Show/hide FPS and other info.",
    partyTxt = "Party ID:", party5Txt = "The ID of the Party can't be less than 5.", party6Txt = "The ID of the Party can't be greater than 6.",
    zoomValueTxt = "Insert zoom value.\nBy default it's 13. (Higher value = less zoom)", zoomValueH = "Value can't be higher than 100.", zoomValueL = "Value can't be less than 3.", zoomValueInvalid = "Invalid value. Make sure to only use numbers.",
    highQB, mediumQB, lowQB, playBtn, playAgBtn, mMenuBtn, zoomV, math_max_o = Math.max;;

window.changeLang = function (write, ing) {
    if (ing) {
        localStorage.setItem('LangTBM', 'EN');
        alert("Language changed to English. To see the changes, reload the website.");
        document.getElementById("btn7").innerText = "Español (Spanish)";
        document.getElementById("btn7").setAttribute("onclick", "changeLang(true, false);");
    } else {
        adsRestoredTxt = "Anuncios restaurados. Para ver los cambios, recarga la página.";
        adBlockedTxt = "Anuncio bloqueado por Superhex.io Scr1pt";
        qChangeTxt = "Insertar valor. Ejemplo:\n0.25: Muy baja\n0.5: Baja\n0.75: Media\n1: Alta\n1.5: Muy alta\n2: Ultra";
        q27Txt = "ADVERTENCIA: Establecer la calidad mayor a 2.7 puede causar problemas.";
        q01Txt = "ADVERTENCIA: Establecer la calidad menor a 0.1 puede causar problemas.";
        qInvalidTxt = "Valor inválido. Solo puedes insertar números.\nEjemplo: 1.2";
        qChangedTxt = "Calidad cambiada a: ";
        sChangeTxt = "ID de la Skin:\nNota: Para establecer la skin 0 use 0.1";
        sInvalidTxt = "ID inválido. Solo puedes insertar números.";
        s0Txt = "Skin cambiada a: 0";
        sNotChangedTxt = "Skin no cambiada.";
        sChangedTxt = "Skin cambiada a: ";
        sErrorTxt = "Se ha producido un error. Asegúrate de insertar un ID válido.";
        sTheSTxt = "La skin ";
        sNoExist = " no existe. Introduce un número menor a 10.";
        pTextTxt = "Texto del botón Play:";
        pTextNotChangedTxt = "Texto del botón Play no cambiado.";
        pTextChangedTxt = "Texto del botón Play cambiado a: ";
        sUnlockekdTxt = "Ya tienes las skins desbloqueadas.";
        sUnlockedsTxt = "Las siguientes skins fueron desbloqueadas:";
        sChickenTxt = "Pollo amarillo.";
        sBirdTxt = "Ave celeste.";
        sCowTxt = "Vaca.";
        sBird2Txt = "Ave roja.";
        sElephantTxt = "Elefante.";
        sAlreadyTxt = "Ya estás usando la skin ";
        partyTxt = "ID de la Party:";
        party5Txt = "El ID de la Party no puede ser menor a 5.";
        party6Txt = "El ID de la Party no puede ser mayor a 6.";
        keyActionsTxt = "Teclas:\n\n1 = Oculta/muestra la Tabla de clasificación.\n0 = Oculta/muestra la UI.\n2 = Muestra/oculta los FPS y otros datos.";
        document.getElementById("btn2").innerText = "Calidad personalizada";
        document.getElementById("btn3").innerText = "Establecer Skin (ID)";
        document.getElementById("btn5").innerText = "Texto del botón Play";
        document.getElementById("check1Text").innerText = "Remover anuncios";
        document.getElementById("check2Text").innerText = "Hack de Zoom";
        document.getElementById("btn6").innerText = "Desbloquear skins";
        document.getElementById("btn7").innerText = "English (Inglés)";
        document.getElementById("btn7").setAttribute("onclick", "changeLang(false, true);");
        document.getElementById("btn8").innerText = "Crear Party";
        document.getElementById("scrText2").innerText = keyActionsTxt;
        zoomValueTxt = "Inserta el valor del hack de zoom.\nPor defecto es 13. (valor mayor = menos zoom)";
        zoomValueH = "El valor no puede ser mayor a 100.";
        zoomValueL = "El valor no puede ser menor a 3.";
        zoomValueInvalid = "Valor inválido. Solo puedes usar números.";
        highQB.innerText = "Alta";
        mediumQB.innerText = "Media";
        lowQB.innerText = "Baja";
        Language = "ES";
        if (write) {
            localStorage.setItem('LangTBM', 'ES');
            if (btn2.getAttribute("class") == "green") document.getElementById("btn2").innerText = "Calidad personalizada (" + currQuality.toString() + ")";
            alert("Idioma cambiado a Español.");
        }
    }
};

if (Language == "ES") {
    loadingScriptTxt = "Cargando Superhex.io Scr1pt...";
    loadingInfoTxt = "Si el script no carga, refresca la página (F5).";
}

window.onload = function () {
    window.mkGui();
    var skinRightArrow = document.getElementById("skin-right-arrow"),
        skinLeftArrow = document.getElementById("skin-left-arrow");
    skinRightArrow.setAttribute("onclick", "skinChangePage(true, 1)");
    skinLeftArrow.setAttribute("onclick", "skinChangePage(false, 1)");
    playBtn = document.getElementById("button-play");
    playAgBtn = document.getElementById("button-play-again");
    mMenuBtn = document.getElementById("button-main-menu");
    highQB = document.getElementById("button-quality-high");
    mediumQB = document.getElementById("button-quality-medium");
    lowQB = document.getElementById("button-quality-low");
    if (Language == "ES") window.changeLang(false, false);
    if (AdsTBM) window.removeAds(false);
    if (Text1TBM) document.getElementById("button-play-text").innerText = Text1TBM;
    if (currQuality == null) window.changeQuality(0.75); else window.changeQuality(currQuality);
    if (zoomValue) zoomV = Number(zoomValue); else zoomV = 13;
    if (zoomHack == "True") window.zoomH(false);
    if (playBtn.className == "green") playBtn.setAttribute("class", "scr1ptGreen");
    if (playAgBtn.className == "playagain green") playAgBtn.setAttribute("class", "playagain scr1ptGreen");
    if (mMenuBtn.className == "mainmenu grey") mMenuBtn.setAttribute("class", "mainmenu scr1ptGrey");
    highQB.setAttribute("onclick", "changeQuality(1);");
    if (highQB.className == "green") highQB.setAttribute("class", "scr1ptGreen"); else highQB.setAttribute("class", "scr1ptGreen unselected");
    mediumQB.setAttribute("onclick", "changeQuality(0.75);");
    if (mediumQB.className == "green") mediumQB.setAttribute("class", "scr1ptGreen"); else mediumQB.setAttribute("class", "scr1ptGreen unselected");
    lowQB.setAttribute("onclick", "changeQuality(0.5);");
    if (lowQB.className == "green") lowQB.setAttribute("class", "scr1ptGreen"); else lowQB.setAttribute("class", "scr1ptGreen unselected");
};

window.skinChangePage = function (next, cantidad) {
    if (!next) {
        if (cantidad == 1) {
            superhex.previousSkins();
        } else if (cantidad == 2) {
            superhex.previousSkins();
            superhex.previousSkins();
        } else if (cantidad == 3) {
            superhex.previousSkins();
            superhex.previousSkins();
            superhex.previousSkins();
        }
        skinPag -= cantidad;
    } else {
        if (cantidad == 1) {
            superhex.nextSkins();
        } else if (cantidad == 2) {
            superhex.nextSkins();
            superhex.nextSkins();
        } else if (cantidad == 3) {
            superhex.nextSkins();
            superhex.nextSkins();
            superhex.nextSkins();
        }
        skinPag += cantidad;
    }
};

window.changeSkin = function (ID) {
    var canChangeS = true;
    currSkin = Number(localStorage.getItem("selectedSkin"));
    if (currSkin != ID) {
        if (ID <= 3) {
            if (skinPag == 2) window.skinChangePage(false, 1); else if (skinPag == 3) window.skinChangePage(false, 2);
        } else if (ID <= 7) {
            if (skinPag == 1) window.skinChangePage(true, 1); else if (skinPag == 3) window.skinChangePage(false, 1);
        } else if (ID <= 9) {
            if (skinPag == 2) window.skinChangePage(true, 1); else if (skinPag == 1) window.skinChangePage(true, 2);
        } else {
            alert(sTheSTxt + ID + sNoExist);
            canChangeS = false;
        }
        if (canChangeS) {
            superhex.selectSkin(ID);
            currSkin = ID;
            alert(sChangedTxt + ID);
        }
    } else alert(sAlreadyTxt + ID);
};

window.changeQuality = function (qualityValue) {
    superhex.setQuality(qualityValue);
    currQuality = localStorage.getItem("quality");
    if (Language == "ES") btn2.innerText = "Calidad personalizada"; else btn2.innerText = "Custom Quality";
    if (currQuality != 1 && currQuality != 0.75 && currQuality != 0.5) {
        btn2.setAttribute("class", "scr1ptGreen");
        btn2.innerText = btn2.innerText + " (" + currQuality.toString() + ")";
    } else btn2.setAttribute("class", "scr1ptGreen unselected");
};

window.removeAds = function (checkBox) {
    if (checkBox) {
        if (!document.getElementById("checkAdBlock").checked) { //Restore Ads
            localStorage.removeItem("AdsTBM");
            adsDeleted = true;
            alert(adsRestoredTxt);
        } else {
            localStorage.setItem("AdsTBM", true);
            if (!adsDeleted) window.rAds();
        }
    } else setTimeout(function () { window.rAds(); }, 400);
};

window.rAds = function () {
    superhex.clickPlay = superhex.aipComplete;
    superhex.clickPlayAgain = superhex.aipComplete;
    var Ad14 = document.getElementById("div-gpt-ad-1490263292583-0");
    Ad14.innerHTML = adBlockedTxt;
    Ad14.setAttribute("data-google-query-id", "null");
    Ad14.setAttribute("style", "vertical-align: bottom; margin: 0 auto; text-align: center; background-color: white;");
    document.getElementById("div-gpt-ad-1490263292583-0").setAttribute("id", "rAd");
    document.getElementById("cdm-zone-01").setAttribute("data-google-query-id", "null");
    document.getElementById("cdm-zone-01").setAttribute("id", "rAd2");
    document.getElementById("google_ads_iframe_/58309977/superhex_0").setAttribute("width", "0");
    document.getElementById("google_ads_iframe_/58309977/superhex_0").setAttribute("height", "0");
};

document.onkeyup = function (e) {
    try {
        e = e || window.event;
        var key = e.which || e.keyCode;
        if (key === 49 && document.getElementById("leaderboard").getAttribute("style") != null || key === 97 && document.getElementById("leaderboard").getAttribute("style") != null) if (document.getElementById("leaderboard").getAttribute("style") == "display: block;") document.getElementById("leaderboard").setAttribute("style", "display: none;"); else document.getElementById("leaderboard").setAttribute("style", "display: block;");
        if (key === 48 && document.getElementById("leaderboard").getAttribute("style") != null || key === 96 && document.getElementById("leaderboard").getAttribute("style") != null) {
            if (document.getElementById("leaderboard").getAttribute("style") == "display: block;") document.getElementById("leaderboard").setAttribute("style", "display: none;");
            if (document.getElementById("minimap").getAttribute("style") == "display: block;") document.getElementById("minimap").setAttribute("style", "display: none;");
            if (document.getElementById("friendsScores").getAttribute("style") == "display: block;") document.getElementById("friendsScores").setAttribute("style", "display: none;");
            if (document.getElementById("score").getAttribute("style") == "display: block;") document.getElementById("score").setAttribute("style", "display: none;"); else {
                document.getElementById("score").setAttribute("style", "display: block;");
                document.getElementById("minimap").setAttribute("style", "display: block;");
                document.getElementById("leaderboard").setAttribute("style", "display: block;");
                if (window.location.hash != "") document.getElementById("friendsScores").setAttribute("style", "display: block;");
            }
        }
        if (key === 50 || key === 98) if (document.getElementById("fps").getAttribute("style") == "display: block; color: white;") document.getElementById("fps").setAttribute("style", "display: none;"); else document.getElementById("fps").setAttribute("style", "display: block; color: white;");
    } catch (err) {
        console.error("Superhex.io Scr1pt onKeyUp Error: " + err);
    }
};

window.goGitHub = function () { window.open("https://github.com/TBM13/Superhex.io-Scr1pt"); };

window.goGreasyFork = function () { window.open("https://greasyfork.org/es/scripts/36071-superhex-io-scr1pt"); };

window.changeQ = function () {
    var QualityPrompt = Number(window.prompt(qChangeTxt));
    if (QualityPrompt > 2.7) alert(q27Txt);
    if (QualityPrompt < 0.1 && QualityPrompt > 0) alert(q01Txt);
    if (QualityPrompt.toString() == "NaN") alert(qInvalidTxt); else {
        if (QualityPrompt === 0) return;
        window.changeQuality(QualityPrompt);
        alert(qChangedTxt + QualityPrompt);
    }
};

window.changeS = function () {
    var SkinPrompt = Number(window.prompt(sChangeTxt));
    superhex.nextSkins();
    superhex.previousSkins();
    var ChickenS2, TweetS2, CowS2, RedBirdS2, ElephantS2;
    if (localStorage.getItem("followClicked")) ChickenS2 = true;
    if (localStorage.getItem("tweetClicked")) TweetS2 = true;
    if (localStorage.getItem("likeClicked")) CowS2 = true;
    if (localStorage.getItem("subscribeClicked")) RedBirdS2 = true;
    if (localStorage.getItem("shareClicked")) ElephantS2 = true;
    if (SkinPrompt.toString() == "NaN") alert(sInvalidTxt); else if (SkinPrompt == 0.1) {
        if (!ChickenS2) localStorage.setItem("followClicked", 1);
        window.changeSkin(0);
        if (!ChickenS2) localStorage.removeItem("followClicked");
    } else if (SkinPrompt === 0) alert(sNotChangedTxt); else {
        if (SkinPrompt == 1) {
            if (!TweetS2) localStorage.setItem("tweetClicked", 1);
            window.changeSkin(SkinPrompt);
            if (!TweetS2) localStorage.removeItem("tweetClicked");
        } else if (SkinPrompt == 2) {
            if (!CowS2) localStorage.setItem("likeClicked", 1);
            window.changeSkin(SkinPrompt);
            if (!CowS2) localStorage.removeItem("likeClicked");
        } else if (SkinPrompt == 3) {
            if (!RedBirdS2) localStorage.setItem("subscribeClicked", 1);
            window.changeSkin(SkinPrompt);
            if (!RedBirdS2) localStorage.removeItem("subscribeClicked");
        } else if (SkinPrompt == 4) {
            if (!ElephantS2) localStorage.setItem("shareClicked", 1);
            window.changeSkin(SkinPrompt);
            if (!ElephantS2) localStorage.removeItem("shareClicked");
        } else {
            try {
                window.changeSkin(SkinPrompt);
            } catch (err) {
                console.error("Superhex.io Scr1pt - Change skin by ID Error (changeS()): " + err);
                alert(sErrorTxt);
            }
        }
    }
};

window.changeT1 = function () {
    var Text1Prompt = window.prompt(pTextTxt);
    if (Text1Prompt === null) {
        alert(pTextNotChangedTxt);
    } else {
        if (Text1Prompt != "Play") localStorage.setItem("Text1TBM", Text1Prompt); else localStorage.removeItem("Text1TBM");
        document.getElementById("button-play-text").innerText = Text1Prompt;
        alert(pTextChangedTxt + Text1Prompt);
    }
};

window.unlockSK = function () {
    if (localStorage.getItem("shareClicked") && localStorage.getItem("subscribeClicked") && localStorage.getItem("likeClicked") && localStorage.getItem("tweetClicked") && localStorage.getItem("followClicked")) alert(sUnlockekdTxt); else {
        var ChickenS = true, TweetS = true, CowS = true, RedBirdS = true, ElephantS = true;
        if (localStorage.getItem("followClicked")) ChickenS = false;
        if (localStorage.getItem("tweetClicked")) TweetS = false;
        if (localStorage.getItem("likeClicked")) CowS = false;
        if (localStorage.getItem("subscribeClicked")) RedBirdS = false;
        if (localStorage.getItem("shareClicked")) ElephantS = false;
        localStorage.setItem("shareClicked", 1);
        localStorage.setItem("subscribeClicked", 1);
        localStorage.setItem("likeClicked", 1);
        localStorage.setItem("tweetClicked", 1);
        localStorage.setItem("followClicked", 1);
        superhex.nextSkins();
        superhex.previousSkins();
        alert(sUnlockedsTxt);
        if (ChickenS) alert(sChickenTxt);
        if (TweetS) alert(sBirdTxt);
        if (CowS) alert(sCowTxt);
        if (RedBirdS) alert(sBird2Txt);
        if (ElephantS) alert(sElephantTxt);
    }
};

window.mkParty = function () {
    var partyPrompt = window.prompt(partyTxt);
    if (partyPrompt !== null && partyPrompt.length != 0) {
        if (partyPrompt.length < 5) alert(party5Txt); else if (partyPrompt.length > 6) alert(party6Txt); else {
            document.getElementById("create-party").style.display = "none";
            document.getElementById("in-party").style.display = "block";
            window.location.hash = partyPrompt;
            document.getElementById("party-share-link").value = "http://" + window.location.hostname + (window.location.port ? ":" + window.location.port : "") + window.location.pathname + "#" + partyPrompt;
        }
    }
};

window.zoomH = function (message) {
    if (zoomHack == "True" && message) {
        localStorage.removeItem("zoomTBM");
        Math.max = math_max_o;
    } else {
        Math.max = function () { return zoomV; }
        if (message) localStorage.setItem("zoomTBM", "True");
    }
    zoomHack = localStorage.getItem("zoomTBM");
};

window.setZoomH = function () {
    var zoomHPrompt = window.prompt(zoomValueTxt);
    if (zoomHPrompt !== null && zoomHPrompt.length != 0) {
        zoomHPrompt = Number(zoomHPrompt);
        if (zoomHPrompt > 100) alert(zoomValueH); else if (zoomHPrompt < 3) alert(zoomValueL); else if (zoomHPrompt.toString() == "NaN") alert(zoomValueInvalid); else {
            zoomV = zoomHPrompt;
            localStorage.setItem("zoomValTBM", zoomHPrompt);
        }
    }
};

var scrText1 = document.createElement("h2");
scrText1.setAttribute("style", "color: white; position: fixed; top: 80px; left: 30px;");
scrText1.innerText = loadingScriptTxt;
document.getElementById("homepage").appendChild(scrText1);

var scrTextInfo = document.createElement("h4");
scrTextInfo.setAttribute("style", "color: white; position: fixed; top: 130px; left: 30px;");
scrTextInfo.innerText = loadingInfoTxt;
document.getElementById("homepage").appendChild(scrTextInfo);

window.mkGui = function () {

    scrTextInfo.remove();
    scrText1.innerText = "Superhex.io Scr1pt v1.8.2";

    var btn = document.createElement("Button");
    btn.setAttribute("style", "position: fixed; top: 140px; left: 30px; height:25px; width:140px;");
    btn.setAttribute("class", "scr1ptGreen");
    btn.setAttribute("type", "button");
    btn.setAttribute("id", "btn");
    btn.innerText = "GitHub";
    btn.setAttribute("onclick", "goGitHub();");
    document.getElementById("homepage").appendChild(btn);

    var btn2 = document.createElement("Button");
    btn2.setAttribute("class", "scr1ptGreen unselected");
    btn2.setAttribute("type", "button");
    btn2.setAttribute("id", "btn2");
    btn2.innerText = "Custom Quality";
    btn2.setAttribute("onclick", "changeQ();");
    document.getElementById("button-quality-high").parentElement.appendChild(btn2);

    var btnGF = document.createElement("Button");
    btnGF.setAttribute("style", "position: fixed; top: 175px; left: 30px; height:25px; width:140px;");
    btnGF.setAttribute("class", "scr1ptGreen");
    btnGF.setAttribute("type", "button");
    btnGF.setAttribute("id", "btnGF");
    btnGF.innerText = "Greasy Fork";
    btnGF.setAttribute("onclick", "goGreasyFork();");
    document.getElementById("homepage").appendChild(btnGF);

    var btn3 = document.createElement("Button");
    btn3.setAttribute("style", "position: fixed; top: 210px; left: 30px; height:25px; width:140px;");
    btn3.setAttribute("class", "scr1ptGreen");
    btn3.setAttribute("type", "button");
    btn3.setAttribute("id", "btn3");
    btn3.innerText = "Set Skin (ID)";
    btn3.setAttribute("onclick", "changeS();");
    document.getElementById("homepage").appendChild(btn3);

    var btn5 = document.createElement("Button");
    btn5.setAttribute("style", "position: fixed; top: 245px; left: 30px; height:25px; width:140px;");
    btn5.setAttribute("class", "scr1ptGreen");
    btn5.setAttribute("type", "button");
    btn5.setAttribute("id", "btn5");
    btn5.innerText = "Set Play button text";
    btn5.setAttribute("onclick", "changeT1();");
    document.getElementById("homepage").appendChild(btn5);

    var Check1 = document.createElement("INPUT");
    Check1.setAttribute("type", "checkbox");
    Check1.setAttribute("id", "checkAdBlock");
    Check1.setAttribute("style", "position: fixed; top: 383px; left: 30px;");
    Check1.setAttribute("onclick", "removeAds(true);");
    document.getElementById("homepage").appendChild(Check1);

    if (AdsTBM) Check1.checked = true;

    var check1Text = document.createElement("h5");
    check1Text.setAttribute("style", "color: white; position: fixed; top: 363px; left: 50px;");
    check1Text.setAttribute("id", "check1Text");
    check1Text.innerText = "Remove ads";
    document.getElementById("homepage").appendChild(check1Text);

    var btn6 = document.createElement("Button");
    btn6.setAttribute("style", "position: fixed; top: 280px; left: 30px; height:25px; width:140px;");
    btn6.setAttribute("class", "scr1ptGreen");
    btn6.setAttribute("type", "button");
    btn6.setAttribute("id", "btn6");
    btn6.innerText = "Unlock skins";
    btn6.setAttribute("onclick", "unlockSK();");
    document.getElementById("homepage").appendChild(btn6);

    var btn8 = document.createElement("Button");
    btn8.setAttribute("style", "position: fixed; top: 315px; left: 30px; height:25px; width:140px;");
    btn8.setAttribute("class", "scr1ptGreen");
    btn8.setAttribute("type", "button");
    btn8.setAttribute("id", "btn8");
    btn8.innerText = "Create Party";
    btn8.setAttribute("onclick", "mkParty();");
    document.getElementById("homepage").appendChild(btn8);

    var btn7 = document.createElement("Button");
    btn7.setAttribute("style", "position: fixed; top: 350px; left: 30px; height:25px; width:140px;");
    btn7.setAttribute("class", "scr1ptGreen");
    btn7.setAttribute("type", "button");
    btn7.setAttribute("id", "btn7");
    btn7.innerText = "Español (Spanish)";
    btn7.setAttribute("onclick", "changeLang(true, false);");
    document.getElementById("homepage").appendChild(btn7);

    var scrText2 = document.createElement("h4");
    scrText2.setAttribute("style", "color: white; position: fixed; top: 50px; right: 10px;");
    scrText2.setAttribute("id", "scrText2");
    scrText2.innerText = keyActionsTxt;
    document.getElementById("homepage").appendChild(scrText2);

    var Check2 = document.createElement("INPUT");
    Check2.setAttribute("type", "checkbox");
    Check2.setAttribute("id", "checkZoom");
    Check2.setAttribute("style", "position: fixed; top: 408px; left: 30px;");
    Check2.setAttribute("onclick", "zoomH(true);");
    document.getElementById("homepage").appendChild(Check2);

    if (zoomHack == "True") Check2.checked = true;

    var check2Text = document.createElement("h5");
    check2Text.setAttribute("style", "color: white; position: fixed; top: 388px; left: 50px;");
    check2Text.setAttribute("id", "check2Text");
    check2Text.innerText = "Zoom Hack";
    document.getElementById("homepage").appendChild(check2Text);

    var btnZHS = document.createElement("Button");
    btnZHS.setAttribute("style", "position: fixed; top: 408px; left: 145px; height:16px; width:16px;");
    btnZHS.setAttribute("class", "scr1ptGreen");
    btnZHS.innerHTML = "<img src='https://lh3.googleusercontent.com/Abm4DjvPOP55GK2MCe9gYh8M1ZJa7ws71oXcW2q6Rl1pQXIQ_bUcVxbN5vZ8_6pmP248O-uQEN2fUxq-xzFlzefdXyEBakvzEgGKzIwSkcdSBHdM2PwtgpgXbMvbP_N7FSI4BYIujg=s16-no' style='position: absolute; left: 0px; top: 0px;'/>";
    btnZHS.setAttribute("type", "button");
    btnZHS.setAttribute("id", "btnZHS");
    btnZHS.setAttribute("onclick", "setZoomH();");
    document.getElementById("homepage").appendChild(btnZHS);
};