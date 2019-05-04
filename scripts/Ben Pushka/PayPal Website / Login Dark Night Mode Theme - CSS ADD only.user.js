// ==UserScript==
// @name        PayPal Website / Login Dark Night Mode Theme - CSS ADD only
// @namespace   english
// @description PayPal Website / Login Dark Night Mode Theme - CSS ADD only - currently undergoing build
// @include     http*://*paypal.com*
// @version     1.2
// @run-at document-end
// @grant       GM_addStyle
// ==/UserScript==



var style = document.createElement('style');
style.type = 'text/css';

style.innerHTML = '                                               body {/*\n*//*https://www.paypal.com/agreements/approve?locale.x=en_US&fundingSource=paypal&sessionID=5f8 *//*\n*/   /*\n*/    color: #3f3f3f;/*\n*/ /*\n*/    background: #454545;/*\n*/}html {/*\n*/    background-color: #3f3f3f;/*\n*/   /*\n*/}.contentContainer {/*\n*/ /*\n*/ /*\n*/    background-color: #3f3f3f;/*\n*/}.footer .legalFooter {/*\n*/  /*\n*/    background-color: #3F3F3F;/*\n*/}.headerText {/*\n*/    margin-top: 20px;/*\n*/    padding: 0 0 20px;/*\n*/        padding-bottom: 20px;/*\n*/    text-align: center;/*\n*/    font-size: 24px;/*\n*/    font-family: HelveticaNeue-Light,"Helvetica Neue Light",HelveticaNeue,"Helvetica Neue",Helvetica,Arial,sans-serif;/*\n*/}p {/*\n*/  /*\n*/    color: #fff;/*\n*/}.textInput input, .textInput textarea {/*\n*/  /*\n*/    border: 1px solid #8d8d8d;/*\n*/    background: #686868;/*\n*/ /*\n*/    color: #dadada;/*\n*/  /*\n*/}.textInput input:focus, .textInput textarea:focus {/*\n*/  /*\n*/    border: 1px solid #1f99ea;/*\n*/   /*\n*/    background-color: #2c2c2c;/*\n*/}.checkboxLabel::before {/*\n*//*\n*/     /*\n*/filter: invert(100%)sepia(20%);/*\n*//*\n*/}a, a:link, a:visited {/*\n*//*\n*/    color: #5fb6ef;/*\n*/ /*\n*//*\n*/}a.button.secondary:hover, a.button:link.secondary:hover, a.button:visited.secondary:hover, .button.secondary:hover, a.button.secondary:focus, a.button:link.secondary:focus, a.button:visited.secondary:focus, .button.secondary:focus {/*\n*//*\n*/    background-color: #272727;/*\n*//*\n*/}a.button.secondary, a.button:link.secondary, a.button:visited.secondary, .button.secondary {/*\n*//*\n*/    background-color: #E1E7EB;/*\n*/    color: #D4D4D4;/*\n*//*\n*/}a.button.secondary, a.button:link.secondary, a.button:visited.secondary, .button.secondary {/*\n*//*\n*/    background-color: #2C2C2C;/*\n*/    color: #D4D4D4;/*\n*//*\n*/}.loginSignUpSeparator {/*\n*//*\n*/    border-top: 1px solid #656565;/*\n*/ /*\n*//*\n*/}.loginSignUpSeparator .textInSeparator {/*\n*//*\n*/    background-color: #656565;/*\n*/   /*\n*/    color: #d7d7d7;/*\n*/  /*\n*//*\n*/}
                                  ';
document.getElementsByTagName('head')[0].appendChild(style);



