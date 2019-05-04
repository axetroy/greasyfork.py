// ==UserScript==
// @name        DinheiroVivo - ler notícias completas
// @namespace   http://domain.com/directory
// @version 1
// @description Por omissão, as notícias do site DinheiroVivo estão fracturadas em várias páginas. Este script serve para ler a notícia completa por omissão.
// @include     http://*.dinheirovivo.pt/*/interior*
// ==/UserScript==

if (window.location.href.indexOf("page=-1")==-1)
{
    window.location.href=window.location.href+"&page=-1";
}
  
