// ==UserScript==
// @name        WhatsApp Web Messages Website Dark Theme Night Mode
// @namespace   english
// @description WhatsApp Web Messages Website Dark Theme Night Mode Simple 
// @include     http*://*web.whatsapp.com*
// @version     1.3
// @run-at document-end
// @grant       GM_addStyle
// ==/UserScript==

// Main - Collapse the Greasy Fork Header

var style = document.createElement('style');
style.type = 'text/css';

style.innerHTML = '           body, html, html body {/*\n*/    background: #232323 !important;/*\n*/    background-color: #1f1f1f !important;/*\n*/    background-image: none important;/*\n*/}/*\n*//*\n*/html[dir] ._3qlW9 {/*\n*/    background-color: #393837;/*\n*/   /*\n*/}._2Uo0Z {/*\n*/    /*\n*/    filter: invert(100%)brightness(150%)contrast(60%);/*\n*/}html[dir] ._3auIg {/*\n*/    background-color: #444444;/*\n*/ /*\n*/}._3Kxus {/*\n*/  /*\n*/    filter: invert(100%);/*\n*/}html[dir] ._3AwwN {/*\n*/    background-color: #444444;/*\n*/   /*\n*/}._2zCDG {/*\n*/    /*\n*/    color: #dadada;/*\n*/   /*\n*/}html[dir] ._3CPl4 {/*\n*/    background-color: #777777;/*\n*/}html[dir] ._1NrpZ {/*\n*/    background-color: #333;/*\n*/}html[dir] ._2EXPL._1f1zm {/*\n*/    background-color: #292929;/*\n*/    /*\n*/}html[dir] ._3j7s9 {/*\n*/    border-top: 1px solid #484848;/*\n*/}html[dir] ._2EXPL._1f1zm ._3j7s9 {/*\n*/    border-top-color: #484848;/*\n*/}html[dir] ._2EXPL:hover:after, html[dir] ._2EXPL._3df_h:after, html[dir] ._2EXPL._1f1zm:after {/*\n*/    border-top: 1px solid #484848;/*\n*/}._25Ooe {/*\n*/    color: #efefef;/*\n*/    /*\n*/}._2EXPL._1f1zm ._1AwDx {/*\n*/    color: #d0d0d0;/*\n*/}html[dir] ._2EXPL {/*\n*/    background-color: #484848;/*\n*/ }html[dir] ._2EXPL:hover, html[dir] ._2EXPL._3df_h {/*\n*/    background-color: #383838;/*\n*/}._1AwDx {/*\n*/   /*\n*/    color: rgba(239, 239, 239, 0.6);/*\n*/     /*\n*/}html[dir] ._2EXPL:hover ._3j7s9, html[dir] ._2EXPL._3df_h ._3j7s9 {/*\n*/    border-top-color: #484848;/*\n*/}._2EXPL.CxUIE ._1AwDx {/*\n*/    font-weight: normal;/*\n*/    color: rgba(222, 222, 222, 0.8);/*\n*/}.CxUIE ._3Bxar {/*\n*/    color: #f1f1f1;/*\n*/}.CxUIE ._25Ooe {/*\n*/    font-weight: 500;/*\n*/    /*\n*/}._3Bxar {/*\n*/    color: rgba(255, 255, 255, 0.41);/*\n*/    /*\n*/}html[dir] ._3pkkz {/*\n*/    background-color: #676767;/*\n*/    /*\n*/}html[dir] ._2nmDZ {/*\n*/    background-color: #00000082;/*\n*/}html[dir] .message-in {/*\n*/    background-color: #c3c3c3;/*\n*/}html[dir=ltr] .tail.message-in .tail-container, html[dir=ltr] .tail-override-left .tail-container {/*\n*/ /*\n*/    opacity: 0.5;/*\n*/}html[dir] .message-out {/*\n*/    background-color: #b1c9d4;/*\n*/}html[dir=ltr] .message-out .tail-container {/*\n*/   /*\n*/    opacity: 0.2;/*\n*/   /*\n*/}html[dir] .Zq3Mc {/*\n*/    background-color: rgba(39, 39, 39, 0.92);/*\n*/    /*\n*/}html[dir] ._298R6 {/*\n*/    /*\n*/    background-color: #232323;/*\n*/    /*\n*/}  #startup{    background: #232323 !important;    background-color: #1f1f1f !important;}          ';

document.getElementsByTagName('head')[0].appendChild(style);
