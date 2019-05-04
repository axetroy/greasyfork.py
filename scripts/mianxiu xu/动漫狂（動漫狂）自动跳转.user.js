// ==UserScript==
// @name         动漫狂（動漫狂）自动跳转
// @namespace    http://tampermonkey.net/
// @version      0.3
// @description  用于跳转下一话
// @author       mxxiu
// @match        http://www.comicnad.com/comic/*
// @include       http://www.cartoonmad.com/comic/*
// @grant        none
// ==/UserScript==

// http://www.comicnad.com/comic/4426-0001[话数]-2[固定数值？]-036[总页数]001[页数].html
//[固定数值] 话 -2
//          　卷 -1
// http://www.cartoonmad.com/comic/265800011095001.html

(function(){
      var　_url = window.location.href;
      
      _o = _url.slice(32,40);

      _prev = _o-1;
      _next = _o-(-1);

      _css = '.html" style="width:60px; height:40px; line-height:40px; display:block; text-align:center; color:#fff; position:fixed; ';
      document.querySelector("body").innerHTML += '<a id = "_prev" href = "http://www.cartoonmad.com/comic/'+_prev+_css+'top:100px;right:0px; background-color:#65bdde; ">上一话</a>'+
                                                  '<a id = "_next" href = "http://www.cartoonmad.com/comic/'+_next+_css+'top:140px;right:0px; background-color:#de6576; ">下一话</a>';
 
      console.log(_o);
      console.log(_next);


      _th = document.querySelector("body > table > tbody > tr:nth-child(5) > td > table > tbody > tr:nth-child(1) > td:nth-child(1) > a");
      _title = document.querySelector("body > table > tbody > tr:nth-child(2) > td > table > tbody > tr > td:nth-child(2) > center > li > a:nth-child(1)");
      
      if(_th.href === 'http://www.cartoonmad.com/comic/thend.asp'){
            _th.href = document.getElementById("_next").href;
            document.getElementById("_next").style.width = '80px';
      }

//判断资源是否存在,执行跳转
      $("body > table > tbody > tr:nth-child(5) > td > table > tbody > tr:nth-child(1) > td:nth-child(1) > a > img").attr('onerror','document.querySelector("body > table > tbody > tr:nth-child(2) > td > table > tbody > tr > td:nth-child(2) > center > li > a:nth-child(1)").click();');
   
      
})();

