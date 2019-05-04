// ==UserScript==
// @name        Waipalka 
// @description Засирай конфочки!
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js
// @version     x0.1
// @namespace https://greasyfork.org/users/59500
// ==/UserScript==

// CONFIG!

var interval = 300;                  // Interval in ms ! Интервал в милисекундах


var inputid  = '.textfield';       // id/class of input element ! id/class текстового поля, смотреть в атрибутах. Чтобы использовать класс, поставьте точку перед названием (.), чтобы id - решетку (#)

var buttonid = 'write_submit';     // id of button element ! id кнопки, смотреть в атрибутах

var words    = ["эй, пидорнухи, возвращайтесь на двач (2ch.hk - двач)!", "ด้้้้้็็็็็้้้้้็็็็็้้้้้้้้็็็็็้้้้้็็็็็้้้้้้้้็็็็็้้้ด้้้้้็็็็็้้้้้็็็็็้้้้้้้้็็็็็้้้้้็็็็็้้้้้้้้็็็็็้้้ด้้้้้็็็็็้้้้้็็็็็้้้้้้้้็็็็็้้้้้็็็็็้้้้้้้้็็็็็้้้", "прет)))) открывай ротеш)))", "посссал вам в ротеш, ублюдки!!", "СТАРПЕРЫ БЛЯЦЦКИЕ!", "эта КОНФА ЗАХВАЧЕНА ФУТБОЛИСТАМИ!", "ПОССАЛ В ЗЕРЧОК НЕ СМЫЛ БОЧОК(((())))", "ПОssАЛ В Kalчок не smyl БАЧOK!"];  // Words for Waip !       



// COINFIG <



// ---



// SCRIPT

function wipeFunction() {
  var random = Math.floor(Math.random() * (words.length - 0)) + 0;
  $(inputid).text(words[random]);
  $('#' + buttonid).click();
}

wipeZ = setInterval(function() {
     wipeFunction();
}, interval);

var active = $('.stickers_hints').after('<font style="font-szie: 10px;" color="green">Вайпалка активирована! Чтобы начать вайпать, зайдие в лс и обновите страницу.</font><br>');

// SCRIPT <