// ==UserScript==
// @name         AnimesVision.com Parte 2
// @namespace    https://www.facebook.com/felipperenan.albano
// @version      1.0
// @description  Remove o tempo de espera do Download "Link Direto" do site AnimesVision.com
// @author       Felippe Renan Albano
// @include      http://visioncloud.info/mirror/2*
// @include      http://visioncloud.info/mirror/3*
// @include      http://visioncloud.info/mirror/4*
// @include      http://visioncloud.info/mirror/5*
// @include      http://visioncloud.info/mirror/6*
// @grant        unsafeWindow
// @run-at       document-end
// ==/UserScript==

window.location.replace(document.getElementsByClassName('buttonDownload')[0].href);
