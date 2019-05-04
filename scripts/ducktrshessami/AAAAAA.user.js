// ==UserScript==
// @name         AAAAAA
// @version      0.7
// @namespace    AAAAAAAA.com
// @description  The other script donked too hard
// @author       AAAAAAAAAAAAAA
// @match        *://www.facebook.com/*
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// ==/UserScript==

(function() {
    'use strict';

    var language = document.documentElement.lang; // Borrowing some stuff from Facebook unsponsored
    var SponsorText = {
        'af':      ['Geborg'],
        'am':      ['የተከፈለበት ማስታወቂያ'],
        'ar':      ['إعلان مُموَّل'],
        'as':      ['পৃষ্ঠপোষকতা কৰা'],
        'ay':      ['Yatiyanaka'],
        'az':      ['Sponsor dəstəkli'],
        'be':      ['Рэклама'],
        'bg':      ['Спонсорирано'],
        'br':      ['Paeroniet'],
        'bs':      ['Sponzorirano'],
        'bn':      ['সৌজন্যে'],
        'ca':      ['Patrocinat'],
        'cb':      ['پاڵپشتیکراو'],
        'co':      ['Spunsurizatu'],
        'cs':      ['Sponzorováno'],
        'cx':      ['Giisponsoran'],
        'cy':      ['Noddwyd'],
        'da':      ['Sponsoreret'],
        'de':      ['Gesponsert'],
        'el':      ['Χορηγούμενη'],
        'en':      ['Sponsored', 'Chartered'],
        'eo':      ['Reklamo'],
        'es':      ['Publicidad', 'Patrocinado'],
        'et':      ['Sponsitud'],
        'eu':      ['Babestua'],
        'fa':      ['دارای پشتیبانی مالی'],
        'fi':      ['Sponsoroitu'],
        'fo':      ['Stuðlað'],
        'fr':      ['Commandité', 'Sponsorisé'],
        'fy':      ['Sponsore'],
        'ga':      ['Urraithe'],
        'gl':      ['Patrocinado'],
        'gn':      ['Oñepatrosinapyre'],
        'gx':      ['Χορηγούμενον'],
        'hi':      ['प्रायोजित'],
        'hu':      ['Hirdetés'],
        'id':      ['Bersponsor'],
        'it':      ['Sponsorizzata'],
        'ja':      ['広告'],
        'jv':      ['Disponsori'],
        'kk':      ['Демеушілік көрсеткен'],
        'km':      ['បានឧបត្ថម្ភ'],
        'lo':      ['ໄດ້ຮັບການສະໜັບສະໜູນ'],
        'mk':      ['Спонзорирано'],
        'ml':      ['സ്പോൺസർ ചെയ്തത്'],
        'mn':      ['Ивээн тэтгэсэн'],
        'mr':      ['प्रायोजित'],
        'ms':      ['Ditaja'],
        'ne':      ['प्रायोजित'],
        'nl':      ['Gesponsord'],
        'or':      ['ପ୍ରଯୋଜିତ'],
        'pa':      ['ਸਰਪ੍ਰਸਤੀ ਪ੍ਰਾਪਤ'],
        'pl':      ['Sponsorowane'],
        'ps':      ['تمويل شوي'],
        'pt':      ['Patrocinado'],
        'ru':      ['Реклама'],
        'sa':      ['प्रायोजितः |'],
        'si':      ['අනුග්‍රහය දක්වන ලද'],
        'so':      ['La maalgeliyey'],
        'sv':      ['Sponsrad'],
        'te':      ['స్పాన్సర్ చేసినవి'],
        'th':      ['ได้รับการสนับสนุน'],
        'tl':      ['May Sponsor'],
        'tr':      ['Sponsorlu'],
        'tz':      ['ⵉⴷⵍ'],
        'uk':      ['Реклама'],
        'ur':      ['تعاون کردہ'],
        'vi':      ['Được tài trợ'],
        'zh-Hans': ['赞助内容'],
        'zh-Hant': ['贊助']
    };
    var SuggestedText = [
        "Suggested for You",
        "Similar to Posts You've Interacted With"
    ];

    var cooldown = true; // Trying out a cooldown
    setInterval(() => {cooldown = true;}, 250);

    function helpthething(node) { // Get feed element
        if (node) {
            if (node.getAttribute("role") != "feed") {
                return node.getAttribute("data-testid") == "fbfeed_story" ? node : helpthething(node.parentElement);
            }
        }
    }

    function first() {
        var elems = document.getElementsByTagName("*"), inner, IT, e;
        for (var i = 0; i < elems.length; ++i) {
            if (elems[i].children.length > 8) { // Decrease load time
                IT = elems[i].innerText;
                if (SponsorText[language].includes(IT) && elems[i].offsetWidth && elems[i].offsetHeight) { // Target acquired
                    e = helpthething(elems[i]);
                    if (e) {
                        e.remove();
                        console.info("[1] Target destroyed");
                    }
                }
            }
        }
    }

    function second() {
        var elems = $("[class*='uiPopover']"), e;
        for (var i = 0; i < elems.length; ++i) {
            if (SuggestedText.includes(elems[i].parentNode.childNodes[0].textContent)) { // Target acquired
                e = helpthething(elems[i]);
                if (e) {
                    e.remove();
                    console.info("[2] Target destroyed");
                }
            }
        }
    }

    function dothething() {
        if (cooldown) {
            cooldown = false;
            first();
            second();
        }
    }

    var observer = new MutationObserver(dothething); // Actually do the thing
    observer.observe(document.body, {attributes: true, childList: true, subtree: true});
})();