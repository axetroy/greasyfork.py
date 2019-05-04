// ==UserScript==
// @name        Поле имени
// @description ololo
// @namespace   sosach
// @include     http*://2ch.hk/*
// @version     1
// @grant       none
// ==/UserScript==
 
$(function(){
  var appendInfo = [
    {$form : $("#postform"), appendFunc: appendNameBlockToPostform},
    {$form : $("#qr-postform"), appendFunc: appendNameBlockToQrPostform}
  ];
 
  appendInfo.forEach(function(info){
    if(info.$form.length === 0){
      return;
    }    
    var $name = info.$form.find("[name=name]");
    var isNameInputExists = ($name.length > 0);
    if(!isNameInputExists){
      if($.isFunction(info.appendFunc)){
        info.appendFunc(info.$form);
        $name = info.$form.find("[name=name]");
      }            
    }
    configureNameInput($name);
  });  
 
  //******************************************************
 
  function appendNameBlockToPostform($form){
    var nameHtml = "<tr class='name'><td class='label desktop'><label for='name'>Имя</label></td><td><input value='' id='name' name='name' size='30' placeholder='Имя' type='text'></td></tr>";    
    $form.find("tr.mail").after(nameHtml);     
  }
 
  function appendNameBlockToQrPostform($form){
    var nameHtml = "<div class='qr-mail'><input name='name' id='qr-name' placeholder='Имя' class='qmail' type='text'></div>";    
    $form.find("div.qr-mail").before(nameHtml);  
  }
 
  //******************************************************
 
  function configureNameInput($name){
      var key = "2ch_name";
      $name.on("input", function(){
        var value = $name.val();
        localStorage.setItem(key, value);
      });
 
      var restoredValue = localStorage.getItem(key);  
      if(restoredValue){
        $name.val(restoredValue);      
      }
  }
 
});