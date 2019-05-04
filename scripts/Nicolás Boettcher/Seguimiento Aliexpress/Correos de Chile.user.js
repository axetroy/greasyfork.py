// ==UserScript==
// @name         Seguimiento Aliexpress/Correos de Chile
// @namespace    https://installfights.blogspot.cl/
// @version      0.1
// @description  Permite hacer seguimiento de tus compras de Aliexpress directamente desde el sitio de correos de chile
// @author       Nicolás Boettcher
// @match        http://track.aliexpress.com/logisticsdetail.htm?tradeId*
// @license      GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @grant        GM_addStyle
// ==/UserScript==

// Obtiene el track number de Aliexpress
var track= document.getElementsByClassName('box-serial')["0"].innerText;

// Lo reemplaza al formato válido para Correos de Chile
var track_cl= track.substring(11,23);

// Lo reemplaza en la página de Aliexpress
document.getElementsByClassName('box-serial')["0"].innerText=track_cl;

// Modifica la url para acceder directamente al seguimiento por el sitio de correos de Chile
var a = document.querySelector('a[href^="http://www.correos.cl"]');
if (a) {
  a.setAttribute('href', 'http://www.correos.cl/SitePages/seguimiento/seguimiento.aspx?envio='+ track_cl);
}