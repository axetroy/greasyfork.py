// ==UserScript==
// @name        HWH Price per battle in transfers
// @namespace   Zeleax
// @description В протоколе передач добавляет цену за бой
// @include /https?:\/\/(www.heroeswm.ru|178.248.235.15|www.lordswm.com)\/(pl_transfers.php\?id=.*)/
// @version     1.3
// @grant       none
// ==/UserScript==

var body = document.body.innerHTML;
var regx = /\d{2}-\d{2}-\d{2} \d{2}:\d{2}:/g; // время
var pos=[]; // начало каждой строки
while(res = regx.exec(body)) pos.push(res.index);

var arrbody=[]; // строки
for(i=0; i<pos.length; i++){
   s=(i<pos.length-1) ? body.substring(pos[i], pos[i+1]) : body.substring(pos[i]);
   res = /на (\d+) боев .+ за (\d+) Золото/.exec(s);
   if(res && res[1]>1) {
      sfind='за '+res[2]+' Золото';

      arrbody.push(s.replace(sfind, sfind+' ('+Math.round(res[2] / res[1] *10)/10+'/бой)'));
   }
   else arrbody.push(s);
}

document.body.innerHTML=body.substring(0,pos[0]) + arrbody.join(''); 

