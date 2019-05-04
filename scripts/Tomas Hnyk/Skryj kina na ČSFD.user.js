// ==UserScript==
// @name         Skryj kina na ČSFD
// @version      1.2.1
// @namespace    CSFD-Tomashnyk@gmail.com			
// @author       Tomáš Hnyk mailto:tomashnyk@gmail.com
// @description  Skryje pražské multiplexy na ČSFD (jednoduše editovatelné pro vlastní výběr kin, stačí jen přepisat názvy kin v kódu podle toho, jak se objevují na ČSFD)
// @include      https://www.csfd.cz/kino/
// @license      GPL 3
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// ==/UserScript==

var badCinemas = ["Praha - CineStar Praha - Anděl",
"Praha - CineStar Praha - Černý Most",
"Praha - Cinema City Flora",
"Praha - Cinema City Galaxie",
"Praha - Cinema City Chodov",
"Praha - Cinema City Letňany",
"Praha - Cinema City Nový Smíchov",
"Praha - Cinema City Slovanský dům",
"Praha - Cinema City Zličín",
"Praha - Premiere Cinemas Praha Hostivař"]
for (i = 0; i < badCinemas.length; i++) {
  try {var badDiv = $("div.cinema h2:contains(" + badCinemas[i] + ")");
    badDiv.parent().parent().remove();
    }
  catch(e) {}
};
