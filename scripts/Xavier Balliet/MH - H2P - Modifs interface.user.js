// ==UserScript==
// @name           MH - H2P - Modifs interface
// @namespace      mountyhall
// @description    Envoi automatique des modifs en Tanière et repli automatique des Equipements Equipés
// @include        */MH_Taniere/TanierePJ_o_Stock.php*
// @include        */MH_Play/Play_equipement.php*
// @icon           https://games.mountyhall.com/favicon.ico
// @version        1.4
// @author         43406 - H2P
// ==/UserScript==

if (location.href.indexOf('TanierePJ_o_Stock.php') != -1) {
  document.getElementById('auto').checked = true;
}

if (location.href.indexOf('Play_equipement.php') != -1) {
  afficheDetailDivPlus('mh_objet_troll','mh_plus_troll');
  afficheDetailTrPlus('mh_objet_hidden_inUse','mh_plus_inUse');
}