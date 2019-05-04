// ==UserScript==
// @name         feederチャット - サイコロ
// @author       ゲームハック研究所の管理人
// @homepage     https://www1.x-feeder.info/javascript/
// @namespace    https://www.x-feeder.info/
// @version      0.1
// @description  非課金でもダイスロールもどきを振ることができるボタンを[投稿]の右に追加します。
// @match        http*://*.x-feeder.info/*
// @grant        none
// ==/UserScript==
(function () {
  'use strict';
    function Random_Num(_max){//乱数を返す
        var _rnd = Math.floor( Math.random() * _max ) + 1 ;
        return _rnd;
    };
    function Which_DOM(){
        if(document.getElementById( "post_form_multi" ).style.display == "none" ){
            return document.getElementById( "post_form_single" );
        }
        else if(document.getElementById( "post_form_single" ).style.display == "none" ){
            return document.getElementById( "post_form_multi");
        }
    }
    function Writing(_text){//書き込み
        document.getElementById( "post_form_multi" ).value = _text ;
        document.getElementById("post_btn").click();
    };
    function Judeg_able(str){//ダイスロールの書式以外はfalse
        return (/^([\+\-]?([0-9]+[d][0-9]+|[0-9]+))([\+\-]([0-9]+[d][0-9]+|[0-9]+))*$/).test(str);
    }
    function Rolldice(_Elm){
        var str = _Elm.value;
        str = str.replace( / /g , '' );//半角空白を消去
        if(!Judeg_able(str))return alert('サイコロを振れませんでした。');
        str = str + 'F';
        str = str.split('');
        var total = 0;
        var minusflag = false;
        var diceflag = false;
        var array = (new Array(250)).fill('');
        var Array_order = 0;
        var time = 0;
          for (var i = 0; i < str.length; i++) {
              if(i!=0 && (str[i]==='-' || str[i]==='+' || str[i]==='F')){
                  if(diceflag==true){
                      var mini_total = 0;
                      var dice_max = Number(array[Array_order]);
                      if(minusflag)array[Array_order] = '-(';
                      else if(Array_order==0)array[Array_order] = '(';
                      else array[Array_order] = '+(';
                      for(var j=0;j<time;j++){
                          var result = Random_Num(dice_max);
                          mini_total += result;
                          array[Array_order] += result;
                          if(j<time-1)array[Array_order]+=', ';
                      }
                      array[Array_order] += ')';
                      if(minusflag)mini_total = (-1) * mini_total;
                      total += mini_total;
                  }
                  else {
                      if(minusflag)total -= Number(array[Array_order]);
                      else total += Number(array[Array_order]);
                      if(minusflag)array[Array_order] = '-' + array[Array_order];
                      else if(Array_order!=0)array[Array_order] = '+' + array[Array_order];
                  }
                  minusflag = false;
                  diceflag = false;
                  Array_order++;
              }
              else if(str[i]==='d'){
                  diceflag = true;
                  time = Number(array[Array_order]);
                  array[Array_order] = '';
              }
              else if(!isNaN(str[i]))array[Array_order] += String(str[i]);
              if(str[i]==='-')minusflag = true;
          }
        str = str.join();
        str = str.replace(/,/g, '');
        str = str.slice( 0, str.length - 1 );
        var calculation_process ='';
        for(var k = 0; k < Array_order + 1; k++){
            calculation_process += array[k];
        }
        var answer = "''【ダイスロール結果】''\n";
        answer += str + '\n';
        answer += "''"+ calculation_process + " = " + total +"''";
        if(document.getElementById( "post_form_multi" ).style.display == "none"){
            var button1 = document.getElementsByClassName("icons_sprite i_post_form_single");
            button1[0].click();
            Writing(answer);
            var button2 = document.getElementsByClassName("icons_sprite i_post_form_multi");
            button2[0].click();
        }
        else Writing(answer);
    }
    var NewButton = document.createElement("button");
    NewButton.setAttribute("id", "to_rolldice_btn");
    NewButton.innerHTML = "サイコロ";
    document.getElementById("post_btn").parentNode.appendChild(NewButton);
    $('#to_rolldice_btn').click(function(){//idを押したときに発火するイベント
        Rolldice(Which_DOM());
    });
})();