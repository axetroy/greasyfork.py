// ==UserScript==
// @name        titulky.com - odstraneni upozorneni o AdBlocku
// @namespace   monnef.tk
// @description odstraneni upozorneni o AdBlocku
// @include     http://*.titulky.com/*
// @include     https://*.titulky.com/*
// @version     6
// @grant       unsafeWindow
// @run-at      document-start
// @author      moen
// @require     https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.0/jquery.min.js
// ==/UserScript==

if ('loading' != document.readyState) {
  alert("Alert suppressor for titulky.com isn't running at 'loading' state, but at '"+document.readyState+"'! It won't work... Possible reason might be a script engine not supporting \"@run-at\" metablock.");
}

this.$ = this.jQuery = jQuery.noConflict(true);

var oldAlert = unsafeWindow.alert; 
unsafeWindow.alert = function(a){
  if(a.toLowerCase().indexOf("adblock") != -1){
    console.log("anti-adblock alert spam detected, suppressing. text was: \""+a+"\".");
  }else{
    // pass other alerts
    oldAlert(a);
  }
};

function handleMonster(){
  $('#cboxContent :contains("Nejspíš je tu něco špatně...")').each(function(){
    console.log('handling monster');
    var elem = $(this);
    unsafeWindow.$().colorbox.close();
  });
}

$(function(){
  for(var i=1; i < 20; i++) setTimeout(handleMonster, i * 250);
});
