// ==UserScript==
// @name        Zeit.de Komplettansicht
// @namespace   graphen
// @version     8.1
// @description Falls ein Artikel ueber mehrere Seiten geht, wird auf die Komplettansicht weitergeleitet.
// @author      Graphen
// @include     /^https?:\/\/www\.zeit\.de\/.*$/
// @icon        https://img.zeit.de/static/img/zo-icon-win8-144x144.png
// @grant       none
// ==/UserScript==

/*jshint esversion: 6 */
(function () {
  'use strict';

  // Suche nach Klassen die auf vorhandene Komplettansicht hindeuten
  var wrap = document.querySelector(".article-pager__all");
  var wrapCampus = document.querySelector(".article-toc__onesie");
  var wrapMagazin = document.querySelector("#pagination-title");

  if (wrap || wrapCampus || wrapMagazin) {

    // SessionID u. Parameter aus aktueller URL entfernen
    var currUrl = document.URL.replace(/\?.*/, "");
    // Referrer gesetzt? (Nicht weiterleiten bei "Zurück" in History)
    var refUrl = sessionStorage.getItem("gmCookieRef");

    if (currUrl !== refUrl) {
      // Referrer setzen bei neuer weiterzuleitenden Seite
      sessionStorage.setItem ("gmCookieRef", currUrl);

      // Link extrahieren oder generieren
      var linkFull;
      if (wrap) {
        linkFull = wrap.querySelector("a").href;
      } else if (wrapCampus) {
        linkFull = wrapCampus.href;
      } else if (wrapMagazin) {
        linkFull = document.URL.concat("/komplettansicht");
      }

      location.href = linkFull;
      console.log("--> URL zwischenspeichern & zu Komplettansicht weiterleiten\n======================");

    } else {
      console.log("Du warst schon hier / Kommentarunterseite\n--> Nicht weiterleiten.");
    }

  } else {
    console.log("Klassen für mehrseitigen Artikel nicht gefunden");
    console.log("--> Hauptseite, einseitiger Artikel oder bereits in Komplettansicht.");
  }
}());
