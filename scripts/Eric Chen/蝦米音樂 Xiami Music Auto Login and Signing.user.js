// ==UserScript==
// @name         蝦米音樂 Xiami Music Auto Login and Signing
// @description  蝦米音樂-自動登入及自動簽到
// @version      1.1
// @author       Eric Chen
// @grant        none
// @include      *://www.xiami.com/
// @include      *://www.xiami.com/?*
// @include      *://passport.xiami.com/?*
// @namespace https://greasyfork.org/users/134818
// ==/UserScript==
(function () {
  //login	
  var itr = setInterval(function () {
    if (window.location.href.includes('passport.xiami.com')) {     
      var loginPad = document.querySelector('.login-xm');
      loginPad.style.display = '';
      document.querySelector('input#account.input').value = 'your account';
      document.querySelector('input#password.input').value = 'your password';
      document.querySelector('input#submit').click();
    } 
    else if (window.location.href.includes('www.xiami.com')) {
      if (document.querySelector('#login_xiami')) {        
        window.location.href='https://passport.xiami.com/?redirectURL=http://www.xiami.com';
      } 
      else if (document.querySelector('b.icon.tosign.done'))
      {
        clearInterval(itr);
        console.log('signed');
        console.log(document.querySelector('b.icon.tosign.done').innerText);
      } 
      else
      {
        document.querySelector('b.icon.tosign').click();
        console.log('signing');
      }
    }
  }, 2000);
}) ();
