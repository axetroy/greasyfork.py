// ==UserScript==
// @name         vozFilter
// @version      2018.06.29.01
// @description  Chặn spam trên forums.voz.vn
// @namespace    idmresettrial
// @author       idmresettrial
// @run-at       document-start
// @grant        none

// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js

// Website list

// @match        https://forums.voz.vn/*

// End list


// ==/UserScript==

this.$ = this.jQuery = jQuery.noConflict(true);

// Do not run on frames or iframes
if (window.top !== window.self) {
    return;
}

hideIMG = document.createElement("style");
hideIMG.innerHTML ='div[id^="post_message"] img {display:none}';
hideIMG.innerHTML += 'div[id^="post_message"] .blockedIMG {display:block; font-size:smaller}';
hideIMG.innerHTML += 'div[id^="post_message"] {max-width:1040px;max-height:2000px;overflow-x:hidden;overflow-y:auto}';
document.head.appendChild(hideIMG);

$(document).ready(function() {

    filter = [];
    filter[0] = /(?=panorama|top1k|MERB_Santorini_L257atc|universe|32okUF|wave_earth_mosaic_3|c0075_o0007_p0001).+\.(jpg|png|gif)/i;
    filter[1] = /\b(âm đạo|lồn|vú|dương vật|buồi|cặc|địt|Bomb52|LADQAXJNFWXP|cứt ỉa|big {0,1}show|((tumblr\.com|goo\.gl).+?){3,})\b/i;
    filter[2] = /u\=(1643929|1643617|1643901|1643937)/i;

    $('table[id^="post"]').each(function() {

        // Chặn ảnh dung lượng cao làm crash trình duyệt.

        $(this).find('div[id^="post_message"] img').each(function() {
            $(this).attr("src0",$(this).attr("src"));
            $(this).attr("src","");
            if (filter[0].test($(this).attr("src0"))){

                $( '<div><div><a href="#" class="blockedIMG">Click vào đây để xem ảnh bị chặn</a></div></div>' ).insertAfter( $(this) );
                console.log('vozFilter: chặn ảnh');

            } else {
                $(this).attr("src",$(this).attr("src0")).removeAttr("src0");
                $(this).show();
            }
        });

        // chặn post nhảm
        if (filter[1].test($(this).html()) || filter[2].test($(this).find('a.bigusername').attr('href')) ) {
            div = $(this).find('td[id^="td_post"]');
            div.hide();
            $( '<td class="alt1"><div class="smallfont"><a href="#" class="blockedTXT">Click vào đây để xem nội dung nhạy cảm</a></div></td>' ).insertAfter( div );
            console.log('vozFilter: chặn post nhạy cảm');
        }
    });

    // chặn thread nhảm

    $('td[id^="td_threadtitle_"]').each(function() {
        if (filter[1].test($(this).text()) || filter[2].test($(this).html())) {
            $(this).parent().css({"display": "none"});
        }
    });

    $('a[class^="blocked"]').click(function(e) {
        e.preventDefault();
        $(this).parent().parent().prev().attr("src",$(this).parent().parent().prev().attr("src0")).removeAttr("src0");
        $(this).parent().parent().prev().show();
        $(this).parent().parent().remove();
    });
});

timeout = 1000*30; // stop loading after this amount of time (just firefox)

isFirefox = typeof InstallTrigger !== 'undefined';
if (isFirefox) {
    setTimeout(function() {
        //window.stop();
    },timeout);
}