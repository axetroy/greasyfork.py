// ==UserScript==
// @name         feederチャット - NGワードミュート
// @author       ゲームハック研究所の管理人
// @homepage     https://www1.x-feeder.info/javascript/
// @namespace    https://www.x-feeder.info/
// @version      3.1
// @description  14行目のNG_word_listの下に入力された言葉のうちいずれかを発見した場合、その投稿を非表示にする。
// @match        http*://*.x-feeder.info/*/
// @require https://greasyfork.org/scripts/373658-feeder-chat-library/code/feeder-chat-library.js?version=642244
// @grant        none
// ==/UserScript==
( () => {
  'use strict';
    const NG_word_list = `
あほ
ばか
まぬけ
`;

    let g_array;

    (() => {
    let array = NG_word_list.split(/[\t|\n|\r|\f]+/);
    let array2 = [];
      for(let i = 0; i < array.length; i++){
          if(array[i].length != 0){
              array2.push(array[i]);
          }
      }
    g_array = array2;
    })();

    const hide = (_elm) => {
        if(_elm == null)return 0;
        _elm.style.display ='none';
    }

    setInterval( () => {
        let top = feeder.id.top();
        let lower = feeder.id.lower();
        for(let i = lower; i <= top; i++ ){
            if(document.getElementById(i) == null)continue;
            for(let j = 0; j < g_array.length; j++){
                let regexp = new RegExp(g_array[j]);
                if(regexp.test(feeder.post.text(i))){
                    hide(document.getElementById(i));
                }
            }
        }
    }, 500);
})();