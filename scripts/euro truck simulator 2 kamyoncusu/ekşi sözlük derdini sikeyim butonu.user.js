// ==UserScript==
// @name         ekşi sözlük derdini sikeyim butonu
// @namespace    https://eksisozluk.com
// @version      0.1
// @description  manevi derdini sikeyim göndericisi. ekşi sözlük ile kurumsal bir bağlantısı bulunmamaktadır.
// @author       euro truck simulator 2 kamyoncusu
// @match        https://eksisozluk.com
// @include      https://eksisozluk.com/*
// @include      https://eksisozluk.com/
// @grant        none
// ==/UserScript==

(function() {
   $(document).ready(function () {
       // HTML'i hazırlayıp entry altlarına gömelim.
       var ds_html = '<span class="dertsikici"><a style="color:#929292 !important" href="#">derdini sikeyim</a></span>';
       $('.feedback').append(ds_html);

       // Tıkladığımızda uyarı versin.
       $('.dertsikici').click(function(e){
           alert("dert başarıyla sikildi...");
           e.preventDefault();
       });
   });
})();