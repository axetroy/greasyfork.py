// ==UserScript==
// @name         ROULETKO ROZPIERDALACZ v.1
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  try to take over the world!
// @author       You
// @match        https://*.margoloteria.pl/
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function notifyx(type, message) {
  var color = '#545454';
  if (type === 'error') {
    color = '#de2a2a';
  } else if (type === 'success') {
    color = '#35ae35';
  } else if (type === 'blue') {
    color = '#287bbb';
  }
  $.amaran({
    content: {
      bgcolor: color,
      color: '#fff',
      message: message
    },
    theme: 'colorful',
    position: 'bottom left',
    inEffect: 'slideBottom',
    outEffect: 'slideLeft',
    delay: 7500
  });
}





   socket.on('roulette ends', function(data){
   console.log("!!!!!!WYGRAŁ NUMER!!!!!: "+data.winningNumber);
      if(data.winningNumber == 0){
          notifyx('success','Wylosowano: '+data.winningNumber);
      }else if(data.winningNumber <= 7 && data.winningNumber > 0){
          notifyx('error','Wylosowano: '+data.winningNumber);
      }else if(data.winningNumber >=8){
         notifyx('blue','Wylosowano: '+data.winningNumber);
      }

   });

})();