// ==UserScript==
// @name         Woody autologin
// @namespace    https://greasyfork.org/es/scripts/27801-woody-autologin
// @version      0.5
// @description  Just past '123456' in the input password and submit the form
// @author       Santiago
// @require      https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/6.18.2/babel.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/babel-polyfill/6.16.0/polyfill.js
// @match        http://*/*
// @include      http(s)?:\/\/(127.0.0.1|localhost|buzz-html-dev\.s3\.amazonaws\.com\/ei|s3\.movil\.bbva\.es\/ei).*
// ==/UserScript==

/* jshint ignore:start */
var inline_src = (<><![CDATA[
/* jshint ignore:end */
    /* jshint esnext: false */
    /* jshint esversion: 6 */

  // This is VERY coupled with jQuery loaded by localhost
  console.log("Autologin listening");

  document.addEventListener ("keydown", loggin);
  
  function loggin (zEvent) {
    if (zEvent.ctrlKey && zEvent.code === "KeyL") {
      const inputPass = $('input[type=password]');
      const buttonLogin = $('span[data-id=btnLogin]');
      if (inputPass && buttonLogin){
        console.log("Loging in...");
        inputPass.val(123456).trigger('change');
        buttonLogin.click();
      } else {
        console.log("Nein!")
      }
    }
  }
/* jshint ignore:start */
]]></>).toString();
var c = Babel.transform(inline_src, { presets: [ "es2015", "es2016" ] });
eval(c.code);
/* jshint ignore:end */