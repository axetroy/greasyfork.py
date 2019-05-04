// ==UserScript==
// @name          Kıpraşmayan t24
// @namespace     t24.com.tr-static-t24
// @description   t24.com.tr sitesindeki hareket edip dikkati dağıtan öğeleri yok eder (manşet haberlerinin kendiliğinden ilerlemesi, doviz, hava durumu, sayfanın yeniden yüklenmesi)
// @include       http://t24.com.tr/*
// @grant         unsafeWindow
// @version       1.5
// ==/UserScript==


// Manşet haberlerinin kendiliğinden ilerlemesini engelle
dummyfunc = function () {};
unsafeWindow.PromoSlider.prototype.timer = exportFunction(dummyfunc, unsafeWindow);
if (typeof GM_info !== "undefined" && GM_info.scriptHandler === "Tampermonkey") {
  $('.timer-bar').stop();  
}

// Sayfa kendi kendini yenilemesin, bunu bir cookie yerleştirerek yapıyoruz
var date = new Date();
date.setFullYear(date.getFullYear() + 5)
document.cookie = "norefresh=true;domain=.t24.com.tr;expires=" + date.toUTCString();

// Tepedeki doviz, hava durumu gibi 3 saniyede bir kayarak degişen zımbırtıları gizle
document.getElementsByClassName('news-snippet-wrapper')[0].style.visibility = 'hidden';