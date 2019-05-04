// ==UserScript==
// @name         在线练习交啥试卷
// @namespace    http://tampermonkey.net/
// @version      0.220
// @description  shows how to use babel compiler
// @author       You
// @require      https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/6.18.2/babel.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/babel-polyfill/6.16.0/polyfill.js
// @require      https://code.jquery.com/jquery-3.2.1.min.js
// @match       http://202.118.26.80/*
// ==/UserScript==

/* jshint ignore:start */
var inline_src = (<><![CDATA[
/* jshint ignore:end */
    /* jshint esnext: false */
    /* jshint esversion: 6 */
        
    (function(){
    var d2 = $('[name=mainFrame]').contents();
    var butt = $('[value=显示答案]', d2);
    butt.attr('disabled', false);
})()
    
       var d2 = $('[name=mainFrame]').contents();

       var questions=$('[colspan="3"]', d2);
       var img;
       var text;
       for (i=0; i<questions.length; i++) {
             img = questions[i].firstElementChild;
             text = img.src;
             var newsrc = text.slice(0, -5)+"5.png";
             var newimg = document.createElement('img');
             newimg.src=newsrc;
             var grandparent=questions[i].parentElement.parentElement;
                  grandparent.insertBefore(newimg,questions[i].parentElement);

         }


/* jshint ignore:start */
]]></>).toString();
var c = Babel.transform(inline_src, { presets: [ "es2015", "es2016" ] });
eval(c.code);
/* jshint ignore:end */