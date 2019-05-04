// ==UserScript==
// @name         ピクトセンス - 自動入室許可
// @author       ゲームハック研究所の管理人
// @homepage     https://www1.x-feeder.info/javascript/
// @namespace    https://www.x-feeder.info/
// @version      0.1
// @description  ???
// @match        https://pictsense.com/*
// @require https://greasyfork.org/scripts/376056-pictsense-chat-library/code/pictsense-chat-library.js?version=657680
// @grant        none
// ==/UserScript==
( () => {
  'use strict';
    const use_auto_flag = false; // 自動応答機能を使用するかどうか。 true := 使用する  false := 使用しない

    const Allow_entry_all = () => {
        const elms = document.getElementById("requestUserList").getElementsByTagName('button');
        for(let i = 0; i < elms.length; i++) elms[i].click();
    }

    const SENTENCE = "エミュピクの幽霊部屋で描き残してみようよ？ ➜ https://emupictsense.herokuapp.com/" ;
    //const SENTENCE = "こん" ;

    let start_flag = false;
  let start_loop = setInterval (()=>{
      if(pictsense.sys.length() == 0) return ;
      clearInterval(start_loop)
      setTimeout(()=>{start_flag = true;},3000);
                   },3000);

    let sys_length_log = 0;
    setInterval(() => {
        if(start_flag == false) return ;
        (()=>{
            const elms = document.getElementById("requestUserList").getElementsByTagName('button');
            if(elms.length != 0) {
                const copy = window.confirm;
                window.confirm = isNaN;
                Allow_entry_all();
                window.confirm = copy;}
        })();

        if(use_auto_flag == false) return ;

        (()=>{
            const sys_length_now = pictsense.sys.length();
            if(sys_length_now == sys_length_log) return ;
            sys_length_log = sys_length_now;
            const sys_name_now = pictsense.sys.name(0);
            if(sys_name_now == null) return ;
            const sys_text_now = pictsense.sys.text(0);
            if(~sys_text_now.indexOf("が入室しました。")) pictsense.say( SENTENCE );
        })();


    },500);


})();