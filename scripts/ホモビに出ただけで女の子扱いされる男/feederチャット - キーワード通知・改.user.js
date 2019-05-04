// ==UserScript==
// @name         feederチャット - キーワード通知・改
// @author       who?
// @homepage     https://www1.x-feeder.info/javascript/
// @namespace    https://www.x-feeder.info/
// @version      0.1
// @description  ???
// @match        http*://*.x-feeder.info/*/
// @require      https://greasyfork.org/scripts/373658-feeder-chat-library/code/feeder-chat-library.js?version=653110
// @grant        none
// ==/UserScript==
(() => {
  'use strict';
  const g_array = [// [ 効果音の番号:=0~24までの整数値, "キーワード１", "キーワード２", "キーワード３", ... ]
      [ 14, "こんにちは", "こんばんは", "おはよう" ],
      [ 13, "管理人", "ましろさん", "ましちゃん", "ましろ様" ],
      [ 22, "[P:"],
      [ 17, "http://diep.io/#" ],
      [ 24, "http://surviv.io/#" ],
  ];

  let g_latest_top_id = 0;
  setTimeout(()=>{g_latest_top_id = feeder.id.top()}, 1000);

   const playSE = (order_num) => {
       const myAudio = new Audio();
       myAudio.src = `${location.href}sounds/s${order_num}.mp3`;
       myAudio.play();
   }

  const main = () => {
      const now_top = feeder.id.top();
      if(g_latest_top_id == now_top)return 0;
      for(let i = Number(g_latest_top_id) + 1; i <= now_top; i++){
          if(document.getElementById(i) == null)continue;
          const text = feeder.post.text(i);
          for(let j = 0; j < g_array.length; j++){
              for(let k = 1; k < g_array[j].length; k++){
                  if(~text.indexOf(g_array[j][k])){
                      playSE(g_array[j][0]);
                      break;
                  }
              }
          }
      }
      g_latest_top_id = now_top;
  }

  setInterval(main, 2000);
})();