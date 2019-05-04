// ==UserScript==
// @name         passwd2BrowserConsole
// @namespace    http://xstable.com/
// @version      0.2
// @description  Show Password Fields as plain-text in Console, if you double click into an Inputfield of type=password
// @author       Samuel Suther (info@suther.de)
// @require      https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/6.18.2/babel.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/babel-polyfill/6.16.0/polyfill.js
// @match        http://*/*
// @match        https://*/*
// ==/UserScript==

/* jshint ignore:start */
var inline_src = (<><![CDATA[
    /* jshint ignore:end */
    /* jshint esnext: false */
    /* jshint esversion: 6 */
    function passwd2Console(data){
        let tag = data.srcElement;
        console.log("Tampermonkey-Script: passwd2BrowserConsole\n","Password-Fields:","\n\tName:",tag.name,"\n\tID:",tag.id,"\n\tValue:",tag.value);
    }
    //let tags = document.getElementsByTagName("input");
    let tags = $('input[type=password');
      for(let i=0;i<tags.length;i++){
        tags[i].addEventListener("dblclick",passwd2Console,false);
      }


/* jshint ignore:start */
]]></>).toString();
var c = Babel.transform(inline_src, { presets: [ "es2015", "es2016" ] });
eval(c.code);
/* jshint ignore:end */