// ==UserScript==
// @name         feederチャット - お知らせや広告を非表示
// @author       ゲームハック研究所の管理人
// @homepage     https://www1.x-feeder.info/javascript/
// @namespace    https://www.x-feeder.info/
// @version      3.0
// @description  このスクリプトをONにするだけで、お知らせや広告を非表示にします。
// @match        *.x-feeder.info/*/
// @exclude      *.x-feeder.info/*/*/*
// @grant        none
// ==/UserScript==
(function () {
  'use strict';
    const hide = ( _elm ) => {
        if(_elm == null) return ;
        _elm.style.display ='none';
    }

    const hide_all = ( _elms ) => {
        if(_elms == null) return ;
        for(let i=0;i<_elms.length;i++)hide(_elms[i]);
    }

    hide(document.getElementById('flip_time_info'));
    hide_all(document.getElementsByClassName('notification warn'));
    hide_all(document.getElementsByClassName('notification info'));


    const elm = document.getElementsByTagName('div');//広告を消す
      for(let k = 0;k<elm.length;k++){
          if(elm[k].style.textAlign=='center')hide(elm[k]);
          if(elm[k].style.width=='300px')hide(elm[k]);
          if(elm[k].style.width=='728px')hide(elm[k]);
      }

})();