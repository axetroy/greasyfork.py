// ==UserScript==
// @name         南台科大科技英文自動答題(測試)
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  南台科大科技英文自動答題
// @author       ThanatosDi
// @match        http://ilearning.csie.stust.edu.tw/EST/Member/Test/PSO.aspx
// @grant        none
// @require      https://code.jquery.com/jquery-2.1.4.min.js
// ==/UserScript==


(function() {
    'use strict';
    main();
})();

function main(){
    var list = document.getElementById('ContentPlaceHolder1_RadioButtonList1');
    var chose = list.getElementsByTagName('input');
    var random_answer = answer();
    console.log(random_answer);
    for(var a=0;a<chose.length;a++){
        if(random_answer==1){
            console.log('T');
            if(chose[a]["value"]=="True"){
                chose[a].checked='True';
            }
            //document.getElementById('ContentPlaceHolder1_Button3').click();
        }else{
            console.log('F');
            if(chose[a]["value"]=="False"){
                chose[a].checked='True';
            }
        }
    }
    sleep(Math.floor((Math.random() * 10000) + 15000));
    document.getElementById('ContentPlaceHolder1_Button3').click();
}

function answer(){
    /*for(var a=0;a<document.getElementById('ContentPlaceHolder1_TextBox1').value;a++){
        var value = Array();
        value[a] = Math.floor((Math.random() * 2) + 1);
        console.log(value);
    }*/
    return Math.floor((Math.random() * 2) + 1);
}

function sleep(ms) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > ms){
      break;
    }
  }
}