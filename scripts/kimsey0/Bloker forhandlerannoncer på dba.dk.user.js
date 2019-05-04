// ==UserScript==
// @name Bloker forhandlerannoncer på dba.dk
// @description DBA.dk er begyndt at inkludere annoncer fra forhandlere side om side med annoncer fra andre brugere. Forhandlerannoncerne er visuelt helt ens med brugerannoncerne, hvilket gør det svært at skelne mellem dem. Dette script skjuler forhandlerannoncerne, så man kun ser brugerannoncer.
// @namespace https://jacobbundgaard.dk
// @version 1.1
// @match https://www.dba.dk/*
// @grant none
// ==/UserScript==

(function() {
  var listings = document.querySelectorAll(".dbaListing");
  listings.forEach(function (listing) {
    var description = listing.querySelector(".details > li:last-child > span");
    if (description && description.title === "Sælger er forhandler") {
      listing.style.display = "None";
    }
  });
})();