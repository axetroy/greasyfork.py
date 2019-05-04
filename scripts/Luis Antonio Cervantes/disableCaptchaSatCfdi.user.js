// ==UserScript==
// @name         disableCaptchaSatCfdi
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  Desabilitar el codigo captcha del portal del SAT!
// @author       Luis Antonio Cervantes Sanchez
// @include      https://verificacfdi.facturaelectronica.sat.gob.mx/
// @grant        none
// ==/UserScript==

(function() {
  var captha = document.getElementById("ctl00_MainContent_ImgCaptcha");
  var key = document.getElementById("__VIEWSTATE");
  var numbers = document.getElementById("ctl00_MainContent_TxtCaptchaNumbers");
  captha.srcset = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrbPlOApZHXkYy6tOaQurTYwxIqZw-9vBi4n10wfKqPsGPrHWceg";
  captha.width = 140;
  key.value = "BiWt56Ebs/rR0wInCCgtM+Mjxqm60lx4zkc9lWLkFq2eqhn+Tvg4G2CaY5PxSLdHU/gL43DPYqNZwGUN16vg9wWhltYGuALn7BS7vAzeimOuzEvH1qNGfXnwMh+Gva8AteCyjAx3H7utxcJKsMU50gAJOvu0H27qQcO/YTfLU8XUCi0okxNIpJcHqDYyWUCfXr7IfYIVms0Piym/acdw3H7iPcpVsceHBWInMUsd7MjiBcCdrxPgwFzvwzmuiW4ZspZMSkNaNrwDfN1jeR+Ot8YyTRrMN+Y+jaWuQQQj2bUuLAcKpzyw5NLURSlLTWzFFIkL+u/3ImHrlEKYpiPBCA72GkvD39N3j9ZQgysUok3AUb3k";
  numbers.value = "74859";
  numbers.disabled = true;
})();