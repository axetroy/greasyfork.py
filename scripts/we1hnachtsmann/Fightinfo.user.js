// ==UserScript==
// @name         Fightinfo
// @namespace    http://userscripts.org/scripts/show/75242
// @author       sageo[http://berlin.pennergame.de/profil/id:1146285/]
// @description  Stellt zahlreiche kleine und große Hilfen rund um das Thema Kämpfen zur Verfügung (HH, B, M, K, Sylt, Malle, Vatikan, New York, Paris, Marseille, Warschau, Krakau, Madrid, Buenos Aires, Rio de Janeiro, Sao Paolo, Moskau, London)
// @include      http://*.pennergame.de/activities/
// @include      http://*.pennergame.de/overview/
// @include      http://*.pennergame.de/fight/
// @include      http://*.pennergame.de/fight/#*
// @include      http://*.pennergame.de/fight/fightlog/*
// @include      http://*.pennergame.de/fight/overview/*
// @include      http://*.pennergame.de/fight/?status*
// @include      http://*.pennergame.de/gang/
// @include      http://*.pennergame.de/highscore/attackable*
// @include      http://*.pennergame.de/highscore/joindate*
// @include      http://*.pennergame.de/highscore/rank*
// @include      http://*.pennergame.de/highscore/user*
// @include      http://*.pennergame.de/highscore/tpp*
// @include      http://*.pennergame.de/profil/*
// @include      https://*.pennergame.de/activities/
// @include      https://*.pennergame.de/overview/
// @include      https://*.pennergame.de/fight/
// @include      https://*.pennergame.de/fight/#*
// @include      https://*.pennergame.de/fight/fightlog/*
// @include      https://*.pennergame.de/fight/overview/*
// @include      https://*.pennergame.de/fight/?status*
// @include      https://*.pennergame.de/gang/
// @include      https://*.pennergame.de/highscore/attackable*
// @include      https://*.pennergame.de/highscore/joindate*
// @include      https://*.pennergame.de/highscore/rank*
// @include      https://*.pennergame.de/highscore/user*
// @include      https://*.pennergame.de/highscore/tpp*
// @include      https://*.pennergame.de/profil/*
// @include      http://*.pennerzone.de/highscore/?page=*
// @include      http://*.pennerzone.de/highscore/uh*
// @include      http://*.bumrise.com/fight/
// @include      http://*.bumrise.com/fight/#*
// @include      http://*.bumrise.com/fight/fightlog/*
// @include      http://*.bumrise.com/fight/overview/*
// @include      http://*.bumrise.com/fight/?status*
// @include      http://*.bumrise.com/gang/
// @include      http://*.bumrise.com/highscore/attackable*
// @include      http://*.bumrise.com/highscore/joindate*
// @include      http://*.bumrise.com/highscore/rank*
// @include      http://*.bumrise.com/highscore/user*
// @include      http://*.bumrise.com/profil/*
// @include      http://*.menelgame.pl/fight/
// @include      http://*.menelgame.pl/fight/#*
// @include      http://*.menelgame.pl/fight/fightlog/*
// @include      http://*.menelgame.pl/fight/overview/*
// @include      http://*.menelgame.pl/fight/?status*
// @include      http://*.menelgame.pl/gang/
// @include      http://*.menelgame.pl/highscore/attackable*
// @include      http://*.menelgame.pl/highscore/joindate*
// @include      http://*.menelgame.pl/highscore/rank*
// @include      http://*.menelgame.pl/highscore/user*
// @include      http://*.menelgame.pl/profil/*
// @include      http://*.clodogame.fr/fight/
// @include      http://*.clodogame.fr/fight/#*
// @include      http://*.clodogame.fr/fight/fightlog/*
// @include      http://*.clodogame.fr/fight/overview/*
// @include      http://*.clodogame.fr/fight/?status*
// @include      http://*.clodogame.fr/gang/
// @include      http://*.clodogame.fr/highscore/attackable*
// @include      http://*.clodogame.fr/highscore/joindate*
// @include      http://*.clodogame.fr/highscore/rank*
// @include      http://*.clodogame.fr/highscore/user*
// @include      http://*.clodogame.fr/profil/*
// @include      http://*.mendigogame.es/fight/
// @include      http://*.mendigogame.es/fight/#*
// @include      http://*.mendigogame.es/fight/fightlog/*
// @include      http://*.mendigogame.es/fight/overview/*
// @include      http://*.mendigogame.es/fight/?status*
// @include      http://*.mendigogame.es/gang/
// @include      http://*.mendigogame.es/highscore/attackable*
// @include      http://*.mendigogame.es/highscore/joindate*
// @include      http://*.mendigogame.es/highscore/rank*
// @include      http://*.mendigogame.es/highscore/user*
// @include      http://*.mendigogame.es/profil/*
// @include      http://*.mendigogame.com/fight/
// @include      http://*.mendigogame.com/fight/#*
// @include      http://*.mendigogame.com/fight/fightlog/*
// @include      http://*.mendigogame.com/fight/overview/*
// @include      http://*.mendigogame.com/fight/?status*
// @include      http://*.mendigogame.com/gang/
// @include      http://*.mendigogame.com/highscore/attackable*
// @include      http://*.mendigogame.com/highscore/joindate*
// @include      http://*.mendigogame.com/highscore/rank*
// @include      http://*.mendigogame.com/highscore/user*
// @include      http://*.mendigogame.com/profil/*
// @include      http://*.faveladogame.com/fight/
// @include      http://*.faveladogame.com/fight/#*
// @include      http://*.faveladogame.com/fight/fightlog/*
// @include      http://*.faveladogame.com/fight/overview/*
// @include      http://*.faveladogame.com/fight/?status*
// @include      http://*.faveladogame.com/gang/
// @include      http://*.faveladogame.com/highscore/attackable*
// @include      http://*.faveladogame.com/highscore/joindate*
// @include      http://*.faveladogame.com/highscore/rank*
// @include      http://*.faveladogame.com/highscore/user*
// @include      http://*.faveladogame.com/profil/*
// @include      http://*.bomzhuj.ru/fight/
// @include      http://*.bomzhuj.ru/fight/#*
// @include      http://*.bomzhuj.ru/fight/fightlog/*
// @include      http://*.bomzhuj.ru/fight/overview/*
// @include      http://*.bomzhuj.ru/fight/?status*
// @include      http://*.bomzhuj.ru/gang/
// @include      http://*.bomzhuj.ru/highscore/attackable*
// @include      http://*.bomzhuj.ru/highscore/joindate*
// @include      http://*.bomzhuj.ru/highscore/rank*
// @include      http://*.bomzhuj.ru/highscore/user*
// @include      http://*.bomzhuj.ru/profil/*
// @include      http://*.dossergame.co.uk/fight/
// @include      http://*.dossergame.co.uk/fight/#*
// @include      http://*.dossergame.co.uk/fight/fightlog/*
// @include      http://*.dossergame.co.uk/fight/overview/*
// @include      http://*.dossergame.co.uk/fight/?status*
// @include      http://*.dossergame.co.uk/gang/
// @include      http://*.dossergame.co.uk/highscore/attackable*
// @include      http://*.dossergame.co.uk/highscore/joindate*
// @include      http://*.dossergame.co.uk/highscore/rank*
// @include      http://*.dossergame.co.uk/highscore/user*
// @include      http://*.dossergame.co.uk/profil/*
// @info         CDCBB6BEBBC3D4EBAH@D@D@@D1E6E6@CAEAAE4A2AA@IE5ADAEE6@GAEABDFE6AFAIA3AE@CE6@DE5@@AH@@EBD2A4D4D@D2
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_xmlhttpRequest
// @grant        GM_addStyle
// @grant        GM_deleteValue
// @grant        GM_listValues
// @grant        GM_log
// @grant        GM_registerMenuCommand
// @grant        GM_setClipboard
// @version      1.25.14 neuer Bilderhost; Umstellung auf https; kleine Korrekturen
// ==/UserScript==

// Daten über das aktuelle Skript für den Update-Mechanismus
var THISSCRIPTVERSION = GM_info.script.version.split(" ")[0];
var THISSCRIPTINSTALL_URLGF = "https://greasyfork.org/scripts/1051-fightinfo";
var THISSCRIPTNAME = GM_info.script.name;
// @version      1.25.13 noch einen Fehler beim Posten eines laufenden Kampfs behoben
// @version      1.25.12 Fehler beim Posten eines laufenden Kampfs behoben
// @version      1.25.11 Darstellung der Punktehistorie verbessert
// @version      1.25.10 Einbau einer Watchlist
// @version      1.25.9 Problem mit Glühwürmchen in Highscore behoben; KW mit richtigem Dezimaltrennzeichen
// @version      1.25.8 Korrekturen beim Sichern von Kampflisten
// @version      1.25.7 Kampfwert melden; mehrere Kampflisten; Bonus im Vatikan beachten
// @version      1.25.6 Fehler bei Fightlog mit Bandenfilter behoben; Fehlermeldung, wenn downfight-Seite nicht erreichbar
// @version      1.25.5 Aufbau der Kampfstatistiken beschleunigt
// @version      1.25.4 Erweiterungen für Athen; Fehler in Angreiferliste behoben
// @version      1.25.3 Seite zum Suchen von Angreifern hinzugefügt
// @version      1.25.2 Name beim Posten von Kämpfen war fehlerhaft
// @version      1.25.1 Anpassungen an das neue Profil-Design
// @version      1.23.7 Fehlerhaft Anzeige bei Pennern mit Glühwürmchen behoben
// @version      1.23.6 Bildadressen korrigiert
// @version      1.23.5 Fehler in Update-Verfahren behoben
// @version      1.23.4 Downfight-Werte für Vatikan gesetzt
// @version      1.23.3 noch einmal: Probleme auf Kampfseite behoben
// @version      1.23.2 Probleme auf Kampfseite behoben
// @version      1.23.1 erste Version für Vatikan
// @version      1.22.10 Bilderhoster getauscht; Fehler bei Profil behoben
// @version      1.22.9 Aktuellen Platz in Highscore anzeigen
// @version      1.22.8 Korrektur: Downfighter etc. wurden nicht mehr angezeigt
// @version      1.22.7 Zeitkorrektur Malle; Problem mit Gästebuch auf Bandenprofil behoben
// @version      1.22.6 Skript lief in München nicht mehr
// @version      1.22.5 Posten in Banden-SBs auch bei Fightlog über mehrere Seiten
// @version      1.22.4 Bandenbox verschoben; Posten in Banden-SBs an weiteren Stellen eingebaut
// @version      1.22.3 Posten von Kämpfen in die SBs verbündeter Banden
// @version      1.22.2 Problem mit Gästebuch behoben
// @version      1.22.1 Wechsel auf greasyfork.org; Fehler bei Kampflog behoben
// @version      1.21.2 Probleme beim Posten von Kämpfen behoben
// @version      1.21.1 Bilder umgezogen
// @version      1.20.1 Anpassungen wegen Pennerzepter
// @version      1.19.17 Anpassungen wegen Pennerzepter
// @version      1.19.16 Warnanzeige bei Gegnern mit negativer Kampfbilanz
// @version      1.19.15 Problem bei Darstellung in Chrome behoben
// @version      1.19.14 Posten von Kämpfen funktionierte nicht mehr richtig
// @version      1.19.13 History-Variable war nicht angelegt; History wurde nicht immer angezeigt
// @version      1.19.12 Erweiterung auf andere Städte (Highscoreseiten); Anzeige Wartezeit bis zum nächsten Angriff; diverse Korrekturen
// @version      1.19.11 Korrektur: Posten von ausgehenden Angriffen in die SB funktionierte nicht mehr; Fehler in Kampfanzeige und Bandenprofil behoben
// @version      1.19.10 Banden in/aus Kampfliste; Punktehistorie; Buttons für Penner in/aus Kampfliste
// @version      1.19.9 Downfight-Liste, Profilseite und Log mehrerer Seiten korrigiert
// @version      1.19.8 Anpassungen wegen geänderter Profilseite
// @version      1.19.7 Anpassungen wegen Premium-Krone
// @version      1.19.6 Testausgaben entfernt
// @version      1.19.5 Fightlog mit voller erster Seite
// @version      1.19.4 Skript fehlerhaft bei ausgehenden Angriffen
// @version      1.19.3 Sprachauswahl repariert; Fightlog sortiert
// @version      1.19.2 Skript lief wieder nicht mehr
// @version      1.19.1 Skriptreparatur nach Totalausfall
// @version      1.18.1 Bilder auf anderen Hoster verschoben
// @version      1.17.4 Bilderadresse angepasst, da Bilder nicht angezeigt wurden
// @version      1.17.3 Anpassung an geänderte Downfight-Seite
// @version      1.17.2 Pennerzone abgeschaltet; Downfighter in Sylt korrigiert; Fehler bei Kampfstatistik und Kommentaren behoben;
// @version      1.17.1 Version für Firefox 17; Posts von Kämpfen in die SB erweitert
// @version      1.16.1 Erste Version Sylt
// @version      1.15.4 Skriptabsturz bei Angriff durch Inkognito-Penner beseitigt
// @version      1.15.3 Cheater wurden nicht mehr korrekt angezeigt
// @version      1.15.2 Diverse Korrekturen wegen geändertem Fightlog
// @version      1.15.1 Anpassung an Spiel Stadtfeind Nr. 1
// @version      1.14.9 noch eine Korrektur wegen nicht blinkender Downfighter
// @version      1.14.8 Downfighter wurden nicht mehr markiert
// @version      1.14.7 Downfighter wurde nicht mehr angezeigt; weitere Korrekturn wegen erweitertem Fightlog
// @version      1.14.6 Entfernte Bande in erweitertem Fightlog wieder hinzugefügt
// @version      1.14.5 Fehler auf Angriffsseite und Bandenseite wegen Penner Ahoi! behoben
// @version      1.14.4 Keine Funktion wegen fehlender Klammer
// @version      1.14.3 weitere Anpassungen wegen Penner Ahoi!
// @version      1.14.2 Name des Penners wurde falsch ermittelt
// @version      1.14.1 Anpassungen für Penner Ahoi!
// @version      1.9.4 Zusatzinfos bei TPP-Highscore
// @version      1.9.3 Fehler beim Posten von Kämpfen behoben
// @version      1.9.2 Fehler bei Kampfstatistik behoben
// @version      1.9.1 Anpassung an neue Kampfseite
// @version      1.8.21 Kampfkommentare werden wieder angezeigt; Kampflog zeigt wieder mehrere Seiten an
// @version      1.8.20 Zeitabstand zum letzten Kampf fehlerhaft wegen Jahr
// @version      1.8.19 nochmal Korrektur Kampfstatistik
// @version      1.8.18 kleine Korrekturen
// @version      1.8.17 Shoutboxverbreiterung entfernt wegen Bandenkampfstatistik
// @version      1.8.16 Shoutbox verbreitert; Einfärben in Shoutbox: Fehler korrigiert, erweitert
// @version      1.8.15 Angriffsgrenzen für Operation Pennersturm angepasst; Einfärben von Pennern in der Shoutbox (1. Versuch)
// @version      1.8.14 Downfight-Listen für Pennersturm; Like-Button abschaltbar
// @version      1.8.13 kleine Fehler behoben; Like-Button
// @version      1.8.12 kleine Fehler behoben; 1. Anpassung Pennersturm
// @version      1.8.11 Highscore-Regel korrigiert
// @version      1.8.10 Fehler beim Posten von Kämpfen in SB behoben
// @version      1.8.9 Fehler bei Direktangriff in DF-Listen behoben; 5-Platz-Regel eingebaut
// @version      1.8.8 Fehler korrigiert: Post von eingehenden Kämpfen
// @version      1.8.7 Fehler auf Profilseite behoben; bei Angriffen Bande in SB posten
// @version      1.8.6 Downfight-Seiten funktionieren wieder
// @version      1.8.5 kleinere Fehler behoben; Erweiterung auf Highscore-Seiten
// @version      1.8.4 Downfightermarkierung optional; keine Markierung auf Downfightliste
// @version      1.8.3 kleine Korrekturen; Downfighteranzeige; Zusammenarbeit mit Bandenprofil deLuxe verbessert
// @version      1.8.2 farbliche Markierung der Angreifer in weiteren Listen; erklärende Texte als Tooltip
// @version      1.8.1 Version läuft unter Chrome; farbliche Markierung der Angreifer
// @version      1.7.5 Bandenprofil repariert; Kampfstatistiken beschleunigt
// @version      1.7.4 Wut wurde nicht mehr erkannt; Downfighter und Hochfighter wurden nicht mehr angezeigt
// @version      1.7.3 kleinere Korrekturen; Umstellung auf Moskau
// @version      1.7.2 Problem mit Bandenseite behoben
// @version      1.7.1 Version 1 nach dem neuen PG-Patch
// @version      1.6.10 Downfightlisten: kleine Korrekturen
// @version      1.6.9 Downfighter und Hochfighter: kleiner Fehler behoben
// @version      1.6.8 Downfighter und Hochfighter eingebaut
// @version      1.6.7 Listen verbreitert
// @version      1.6.6 Listen wahlweise auf der Fight-Seite
// @version      1.6.5 Anzeige auf Pennerzone wieder zum Laufen gebracht; Listen auf der Fight-Seite ausgelagert
// @version      1.6.4 Skript lief nicht mehr
// @version      1.6.3 Variablen vereinheitlicht; Grafiken aufgeteilt; DF-Listen wieder zum Laufen gebracht
// @version      1.6.2 Grafikadressen korrigiert
// @version      1.6.1 Adressen für Brasilien angepasst; Bilder auf anderen Hoster verlegt
// @version      1.5.13 weitere reloaded-Versionen hinzugefügt
// @version      1.5.12 Probleme beim Posten durch den Glühwürmchen-Plunder behoben
// @version      1.5.11 Probleme durch den Glühwürmchen-Plunder behoben
// @version      1.5.10 Anpassungen für Hamburg reloaded
// @version      1.5.9 DF-Listen funktionieren wieder; Angriffspause in Köln nur 24 Stunden
// @version      1.5.8 Probleme mit DEF-Booster behoben
// @version      1.5.7 Profilseite korrigiert, Skript geht wieder unter FF4
// @version      1.5.6 kleine Korrektur auf der Let's fight Seite
// @version      1.5.5 läuft jetzt auch in Köln
// @version      1.5.4 Legionärsliste funktioniert wieder
// @version      1.5.3 Update-Verfahren verbessert
// @version      1.5.2 Anpassungen für London; neues Update-Verfahren
// @version      1.5.1 Korrektur der russischen Übersetzung (nochmals vielen Dank an dron122007)
// @version      1.5.0 Sprachumschaltung; Übersetzung ins Russische (Vielen Dank an dron122007)
// @version      1.4.8 Anpassungen für St. Petersburg
// @version      1.4.7 Geld in Kampfliste anzeigen; läuft auch in Buenos Aires
// @version      1.4.6 Jahreswechselproblem bei Kampfliste behoben
// @version      1.4.5 Headhunterliste eingebaut; französische Texte; Kampfliste abschaltbar
// @version      1.4.4 Skript funktionierte nicht richtig, wenn man nicht in einer Bande war; DF-Listen vereinheitlicht
// @version      1.4.3 Es wurden nicht alle markierten Einträge gepostet bzw. in die Kampfliste aufgenommen
// @version      1.4.2 Fehler in neuer Kampfliste behoben
// @version      1.4.1 neue Kampfliste
// @version      1.3.38 Anzeige der Legionäre von downfight.de funktionierte nicht mehr, da Seite geändert
// @version      1.3.37 Anzeige der Legionäre von downfight.de
// @version      1.3.36 Nach Löschen eines Kampfkommentars wurde falsches Symbol angezeigt
// @version      1.3.35 Kampfkommentare wurden nur in Hamburg und Berlin angezeigt
// @version      1.3.34 Kampfkommentare wurden nicht mehr angezeigt
// @version      1.3.33 Faker-Diagramme: Stadt wird berücksichtigt; Anzahl Tage ist vorgebbar
// @version      1.3.32 Kampfwert wird gerundet beim Posten
// @version      1.3.31 Filtern des Kampflogs nach Banden
// @version      1.3.30 kleine Korrekturen; Länge des BBCode anzeigen; Cheaterliste von Halloween anzeigen
// @version      1.3.29 Post eines Angriffs funktionierte nicht mehr; Loserliste wurde manchmal nicht bis zu Ende bearbeitet
// @version      1.3.28 Kampfwert posten bei Wut fehlerhaft; Button für BBCode eingefügt
// @version      1.3.27 Kampfwert posten; Posten ab 2. Fightlogseite ging nicht mehr
// @version      1.3.26 Probleme mit anderen Skripts behoben
// @version      1.3.25 Erweiterungen für Halloween hinzugefügt
// @version      1.3.24 Angriffs-Icon auf Bandenprofil nur, wenn nicht ein anderes Skript bereits Spalten einfügt
// @version      1.3.23 Posten der Kampfwerte auch aus Kampfübersichten möglich
// @version      1.3.22 Verliererliste repariert; beim Posten von beendeten Kämpfen können die Kampfwerte mit gepostet werden
// @version      1.3.21 Angriffs-Icon aus Cheaterliste wieder entfernt, da es bereits rechts drin ist
// @version      1.3.20 Angriffs-Icon in den Listen hinzugefügt
// @version      1.3.19 nochmal Korrektur für Malle: Kampfliste unvollständig, wenn nicht in Bande
// @version      1.3.18 Cheaterliste für Malle hinzugefügt
// @version      1.3.17 Probleme beim Posten in SB ohne Bande behoben; Fehler bei Kampfstatistik behoben
// @version      1.3.16 Fehler beim Posten aus dem Fightlog in die SB behoben
// @version      1.3.15 Fehler beim Posten der eintreffenden Kämpfe in die SB behoben
// @version      1.3.14 Posten in die SB in NY korrigiert; Ankreuzspalte nach links verschoben; kleinere Korrekturen
// @version      1.3.13 Anpassungen für Malle
// @version      1.3.12 nochmals Änderung wegen pennerzone
// @version      1.3.11 Problem mit Skriptversion behoben
// @version      1.3.10 Skript an Änderungen bei pennerzone angepasst; Kommentar eingebbar beim Posten von Kämpfen in die SB
// @version      1.3.9 noch einen kleinen Fehler behoben: Fightlog-Suchseite funktionierte nicht mehr
// @version      1.3.8 noch einen kleinen Fehler behoben: Infos bei eintreffenden Kämpfen
// @version      1.3.7 kleine Fehler behoben; Skript für Madrid und Rio de Janeiro angepasst; Post in SB nur, wenn in Bande
// @version      1.3.6 Skript für New York, Paris, Marseille, Warschau und Krakau angepasst
// @version      1.3.5 zusätzliche Icons und Infos im Bandenprofil
// @version      1.3.4 kleiner Fehler: auf der Profilseite fehlten die zusätzlichen Icons; ACHTUNG !!! namespace geändert. Das Skript wird ein zweites Mal installiert! Die alte Version bitte löschen !!
// @version      1.3.3 kleinere Fehler behoben, Kampfstatistik getuned, ausgewichene Kämpfe in Kampfstatistik aufgeteilt; neue Option "nur Verlierer anzeigen" im Fightlog (sortierte Liste mit möglichen Gegnern)
// @version      1.3.2 Bisher wurden bei der Kampfstatistik nur die letzten 20 Kämpfe berücksichtigt. Jetzt werden alle noch zur Verfügung stehenden ausgewertet.
// @version      1.3.1 Cheaterliste wieder zum Laufen gebracht
// @version      1.2.8 Fehler Darstellung Cheaterliste korrigiert; Cheaterliste MU eingebaut
// @version      1.2.7 Fehler Darstellung pennerzone.de in HH korrigiert
// @version      1.2.6 Fehler SB-Posten korrigiert
// @version      1.2.5 Anpassungen für München
// @version      1.2.4 tinypic.com scheint ein Problem zu haben, Grafikhoster gewechselt; Handling von Userprofilen, die über Username statt ID aufgerufen werden, aktiviert
// @version      1.2.3 Fehler aufgrund der neuen Google-Ads behoben; einige kleinere Fehler behoben (Posten von Kämpfen von der Suchseite mit Kommentaren nicht möglich; falsches Handling bei einkommenden Angreifern ohne Bande)
// @version      1.2.2 Verbesserte Anzeige der Cheatertabelle bei langen Namen; verbesserte Fehlerbehandlung; Anzeige von Anzahl Sieg/Unentscheiden/Niederlagen/Ausgweichen im Tooltip; Aktualisierungsabfrage alle 2 Stunden
// @version      1.2.1 (Optionale) Anzeige der downfight.de-Cheaterliste! Eigenes Hinweis-Icon, wenn man schon gegen Gegner gekämpft hat; vorkonfigurierte Suchmöglichkeiten für Pennerzone; 36-Stunden-Anzeige jetzt in 99,9% der Fälle korrekt (bis auf KK-Ausweichen)
// @version      1.2.0 Fix falscher Tausenderpunkt; farbliche Markierung Angreifbarkeit (36 Stunden + Punktzahl); Layout SB-Einträge netter; mehrere Kämpfe knnen gleichzeitig gepostet werden; Fightinfo auf Profilen und auf pennerzone.de; Warnmarkierung
// @version      1.1.2 Posten von einkommenden Kämpfen in die SB; Layout straffer
// @version      1.1.1 Posten des aktuell ausgehenden Kampfs in die SB; Dateigrößen Icons kleiner --> schnelleres Laden; Posten Kampf: Bande wird zusätzlich angegeben
// @version      1.1.0 Möglichkeit, zu jedem Kampf einen Kommentar zu speichern; Kampf-Posten in die SB; Abruf mehrerer Seiten im Fightlog
// @version      1.0.1 Anpassung Suchstring pennerzone + besserer Updatemechanismus
// @version      1.0.0
// @version      $Id: fightinfo.user.js 198 2018-04-10 12:56:19Z mkl $

// PG-Version ermitteln
var oldVersion=m=1;
if (oldV())
    oldVersion = 0;
var fight = "";
var fightinfo = "";
var DB_URL = "";
var NrOfCalls = GM_getValue("NrOfCalls", 0) % 10000000000 + 1;
GM_setValue("NrOfCalls", NrOfCalls);
//GM_setValue("expertMode", 1);
var expertMode = GM_getValue("expertMode", 0);

// Basis-URL für Kampficons
var FIGHTICONS_URL = "/img/pv4/dots/"

var DOWNFIGHTDE_DOWNFIGHTPAGE_URL = "http://www.downfight.de/?seite=downfight";
var DOWNFIGHTDE_HOCHFIGHTPAGE_URL = "http://www.downfight.de/?seite=hochfight";
var DOWNFIGHTDE_CHEATERPAGE_URL = "http://www.downfight.de/?seite=listebetrueger";
var DOWNFIGHTDE_LEGIONPAGE_URL = "http://www.downfight.de/?seite=toplegionaerelight";
var DOWNFIGHTDE_ARMEEPAGE_URL = "http://www.downfight.de/?seite=listesoldaten";

// URLs Warn-Icon
var ICON_WARNING = 'warning.gif';

// URLs für Icons
var imgPrefix = ['http://picr.eu/images/', 'http://s14.directupload.net/images/user/141017/'];
var ICON_ATTACK = 'HX26.png#qj545l5o.png';                              // Icon für Angriff (attack.png)
var ICON_INFO = 'MQ7k.png#yuqdzny6.png';                                // Icon für Info (info.png)
var ICON_LASTFIGHT_NOCOMMENT = 'MCHF.gif#axjmmcih.gif';                 // Icon für letzte Kämpfe (noch kein Kampf) ohne Kommentar (buchgrn.gif)
var ICON_LASTFIGHT_COMMENT = 'Hu5Z.gif#66j4zf6t.gif';                   // Icon für letzte Kämpfe (noch kein Kampf) mit Kommentar (buchorange.gif)
var ICON_LASTFIGHT_WARNING = 'HV30.gif#3olxh787.gif';                   // Icon für letzte Kämpfe (noch kein Kampf) mit Warnung (buchrot.gif)
var ICON_LASTFIGHT_NOCOMMENT_FIGHTED = 'Ha6S.png#rgc9fcox.png';         // Icon für letzte Kämpfe (schon mindestens ein Kampf) ohne Kommentar (grn.png)
var ICON_LASTFIGHT_COMMENT_FIGHTED = 'HlDV.gif#f4vlvt7r.gif';           // Icon für letzte Kämpfe (schon mindestens ein Kampf) mit Kommentar (gelb.gif)
var ICON_LASTFIGHT_WARNING_FIGHTED = 'H7LY.gif#cy4fucuw.gif';           // Icon für letzte Kämpfe (schon mindestens ein Kampf) mit Warnung (rot.gif)
var ICON_LASTFIGHT_NONE = 'HUKa.gif#xuv84r67.gif';                      // Icon für letzte Kämpfe selbst (buchschw.gif)

var ICON_PENNERZONE_MONEY = 'MHF4.gif#qhzlulxv.gif';                    // Icon für Pennerzone-Suche ohne Punktebeschränkung (dollar.gif)
var ICON_PENNERZONE_UP = 'MWAT.gif#29kxg28j.gif';                       // Icon für Pennerzone-Suche am oberen Punktespektrum (pennerzoneup.gif)
var ICON_PENNERZONE_DOWN = 'MMCE.gif#4fpj4ffl.gif';                     // Icon für Pennerzone-Suche am unteren Punktespektrum (pennerzonedown.gif)
var ICON_PENNERZONE_DATE = 'M1Nu.gif#k4mf4c75.gif';                     // Icon für Pennerzone-Suche Festlegung von Start-Registrierungsdatum (pennerzone_date.gif)

var ICON_FIGHTCOMMENT = 'H6l3.gif#kbknlxln.gif';                        // (notizgelb.gif)
var ICON_NOFIGHTCOMMENT = 'HwOp.gif#c6o9hv8n.gif';                      // (notizgrau.gif)
var ICON_SENDTOSB = 'MiQl.gif#cyzk3p54.gif';                            // (envelope.gif)
var ICON_ADDTOFT = 'Hj19.gif#kup48pzi.gif';                             // Icon für Hinzufügen zur Kampftabelle (grnadd.gif)
var ICON_DELFROMFT = 'HP52.png#uu4fbf6o.png';                           // Icon für Entfernen aus Kampftabelle (userdel.png)
var ICON_CHEATERDIA_NORMAL = 'Mk9I.png#oan8c8ug.png';                   // (diagramm.png)
var ICON_CHEATERDIA_DOUBLE = 'MqX2.gif#8k6ekcxz.gif';                   // (diagramm.gif)
var ICON_DIRECTATTACK = 'MDOJ.gif#js9sffna.gif';                        // Icon für Direktangriffslink (direktangriff.gif)
var ICON_NEW = 'MF7L.png#9f9zfi9k.png';                                 // Icon für "NEU" (new.png)

// Konstanten für die verschiedenen Modi des Postens in die SB
var SBPOSTMODE_ACTIVE = 0;
var SBPOSTMODE_DONE = 1;
var SBPOSTMODE_INCOMING = 2;

// Ersatz-Icons für die PG Kampfergebnis-Icons
var ICON_0_0 = 'HmK4.gif#hfrgtjiz.gif';                                 // (0_0kopie.gif)
var ICON_0_1 = 'HZtu.gif#wbzpo6ps.gif';                                 // (0_1kopie.gif)
var ICON_1_0 = 'HrDe.gif#vvdt9w4c.gif';                                 // (1_0kopie.gif)
var ICON_1_1 = 'HLrT.gif#yrc9ypnd.gif';                                 // (1_1kopie.gif)
var ICON_2_0 = 'Hc6F.gif#2qfbf62a.gif';                                 // (2_0kopie.gif)
var ICON_2_1 = 'HE0J.gif#n3aebplm.gif';                                 // (2_1kopie.gif)
var ICON_EVADE = 'HTzL.gif#73yp9jne.gif';                               // (evadekopie.gif)

// Landesflaggen
var flags = [];
    flags[0] = 'M4XZ.png#vtmlwdv7.png';                                 // (germany.png)
    flags[1] = 'MzHS.png#tv89ztbe.png';                                 // (United_States.png)
    flags[2] = 'M9e0.png#49huvvqk.png';                                 // (poland.png)
    flags[3] = 'MgYW.png#369nch8n.png';                                 // (france.png)
    flags[4] = 'MRoY.png#woxu9r9c.png';                                 // (spain.png)
    flags[5] = 'Ms96.png#bjepj9as.png';                                 // (brazil.png)
    flags[6] = 'MyFa.png#375jvjff.png';                                 // (russia.png)
    flags[7] = 'MIcV.png#smffczkx.png';                                 // (united_kingdom.png)

// ***********************************************************************************************
// Stadt ermitteln und Variablen entsprechend setzen
// ***********************************************************************************************
var TZ = [];
    TZ[0] = ".";
    TZ[1] = ",";
    TZ[2] = ".";
    TZ[3] = ".";
    TZ[4] = ".";
    TZ[5] = ".";
    TZ[6] = ".";
    TZ[7] = ",";

var DZ = [];        // Dezimal-Trennzeichen
    DZ[0] = ',';
    DZ[1] = '.';
    DZ[2] = ',';
    DZ[3] = ',';
    DZ[4] = ',';
    DZ[5] = ',';
    DZ[6] = ',';
    DZ[7] = '.';
var DS = [];        // Datums-Trennzeichen
    DS[0] = '.';
    DS[1] = '/';
    DS[2] = '.';
    DS[3] = '.';
    DS[4] = '.';
    DS[5] = '.';
    DS[6] = '.';
    DS[7] = '.';
if (location.toString().indexOf("hamburg.pennerzone.de") != -1) {
    var language = "de_DE";
    var TOWNBASE_URL = "http://www.pennergame.de/";
}
else if (location.toString().indexOf("berlin.pennerzone.de") != -1) {
    var language = "bl_DE";
    var TOWNBASE_URL = "http://berlin.pennergame.de/";
}
else {
    var language = document.getElementsByName("language")[0].content;
    var metas = document.getElementsByTagName("meta");
    for (i = 0; i< metas.length; i++)
        if (metas[i].getAttribute('property') == "og:url") {
            var TOWNBASE_URL = metas[i].content + "/";
            break;
        }
}
var attvalue = defvalue = fgtvalue = 0;
var FightVals = [];
var townname = '';
var ZONEBASE_URL = '';
var DFTownCode = '';
var DFTownCode2 = '';
var DFTownCode3 = '';
var lang = 0;
var TOWNEXTENSION = '';
var fightPause = 36;        // Pause zwischen zwei Angriffen
var currency = "€";       // Euro-Zeichen
var currency1 = "";
var upperLimit = 1.5;
var lowerLimit = 0.8;
var showHistory = GM_getValue("ShowHistory", -1) * 2;
if (showHistory < 0) {
    showHistory = 20;
    GM_setValue("ShowHistory", 10);
}

if (!String.prototype.insert)
    String.prototype.insert = function(idx, str) {
        return this.substr(0, (idx<0?this.length:0) + idx) + str + this.substr(idx);
    };

// Wenn in Berlin gespielt wird
if (language == 'bl_DE') {
    townname = "Berlin";
    // ZONEBASE_URL = 'http://berlin.pennerzone.de/';
    TOWNEXTENSION = 'B';
    DFTownCode = "B";
    DFTownCode2 = language;
    DFTownCode3 = "berlin";
// Wenn in München gespielt wird
} else if (language == 'mu_DE') {
    townname = "München";
    TOWNEXTENSION = 'MU';
    DFTownCode = "M";
    DFTownCode2 = language;
    DFTownCode3 = "muenchen";
// Wenn in Köln gespielt wird
} else if (language == 'kl_DE') {
    townname = "Köln";
    TOWNEXTENSION = 'K';
    DFTownCode = "K";
    DFTownCode2 = language;
    DFTownCode3 = "koeln";
    fightPause = 24;        // Pause zwischen zwei Angriffen
// Wenn in Sylt gespielt wird
} else if (language == 'sy_DE') {
    townname = "Sylt";
    TOWNEXTENSION = 'SY';
    DFTownCode = "SY";
    DFTownCode2 = language;
    DFTownCode3 = "sylt";
// Wenn in Malle gespielt wird
} else if (language == 'ml_DE') {
    townname = "Malle";
    TOWNEXTENSION = 'PM';
    //DFTownCode = "SM";
    //DFTownCode2 = "s1_DE";
    fightPause = 18;        // Pause zwischen zwei Angriffen
// Wenn im Vatikan gespielt wird
} else if (language == 'vt_DE') {
    townname = "Vatikan";
    TOWNEXTENSION = 'VT';
    DFTownCode = "VT";
    DFTownCode2 = language;
    DFTownCode3 = "vatikan";
// Wenn in Halloween gespielt wird
} else if (location.toString().indexOf("halloween") != -1) {
    townname = "Hölloween";
    TOWNEXTENSION = 'HW';
    DFTownCode = "Grr";
    fightPause = 12;        // Pause zwischen zwei Angriffen
// Wenn in Pennersturm gespielt wird
} else if (language == 's6_DE') {
    townname = "Pennersturm";
    TOWNEXTENSION = 'OP';
    DFTownCode = "SPE";
    DFTownCode3 = "pennersturm";
    fightPause = 12;        // Pause zwischen zwei Angriffen
    upperLimit = 2.5;
    lowerLimit = 0.7;
// Wenn in Athen gespielt wird
} else if (language == 's7_DE') {
    townname = "Athen";
    TOWNEXTENSION = 'ATH';
    fightPause = 12;        // Pause zwischen zwei Angriffen
    upperLimit = 2.5;
    lowerLimit = 0.7;
// Wenn in Atlantis gespielt wird
} else if (language == 'at_DE') {
    townname = "Atlantis";
    TOWNEXTENSION = 'AT';
    DFTownCode = "AT";
    DFTownCode2 = language;
    DFTownCode3 = "atlantis";
// Wenn in Hamburg gespielt wird
} else if (language == 'de_DE') {
    townname = "Hamburg";
    // ZONEBASE_URL = 'http://hamburg.pennerzone.de/';
    TOWNEXTENSION = 'HH';
    DFTownCode = "HH";
    DFTownCode2 = language;
    DFTownCode3 = "hamburg";
} else if (language == 'hr_DE') {
    townname = "Hamburg reloaded";
    TOWNEXTENSION = 'HR';
    DFTownCode = "H2";
    DFTownCode2 = language;
    DFTownCode3 = "reloaded";
// Wenn in New York gespielt wird
} else if (language == 'us_EN') {
    TOWNEXTENSION = 'NY';
    lang = 1;
    currency = '$';
// Wenn in Krakau gespielt wird
} else if (language == "kr_PL") {
    TOWNEXTENSION = 'KR';
    lang = 2;
    currency = 'zl';
// Wenn in Warschau gespielt wird
} else if (language == "pl_PL" || language == "wr_PL") {
    if (language == 'pl_PL')
        TOWNEXTENSION = 'WA';
    else {
        TOWNEXTENSION = 'WR';
    }
    lang = 2;
    currency = 'zl';
// Wenn in Marseille gespielt wird
} else if (language == "ma_FR") {
    TOWNEXTENSION = 'MS';
    lang = 3;
// Wenn in Paris gespielt wird
} else if (language == "fr_FR" || language == "cr_FR") {
    if (language == 'fr_FR')
        TOWNEXTENSION = 'PA';
    else {
        TOWNEXTENSION = 'PR';
    }
    lang = 3;
// Wenn in Buenos Aires gespielt wird
} else if (language == "ba_ES") {
    TOWNEXTENSION = 'BA';
    lang = 4;
    currency = '$';
// Wenn in Madrid gespielt wird
} else if (language == "es_ES" || language == "er_ES") {
    if (language == 'es_ES')
        TOWNEXTENSION = 'MD';
    else {
        TOWNEXTENSION = 'MR';
    }
    lang = 4;
// Wenn in Sao Paolo gespielt wird
} else if (language == "sp_BR") {
    TOWNEXTENSION = 'SP';
    lang = 5;
// Wenn in Rio de Janeiro gespielt wird
} else if (language == "pt_BR") {
    TOWNEXTENSION = 'RJ';
    lang = 5;
// Wenn in Moskau gespielt wird
} else if (language == "ru_RU") {
    TOWNEXTENSION = 'MO';
    lang = 6;
    currency1 = ' руб. ';
    currency2 = ' коп.';
// Wenn in London gespielt wird
} else if (language == "en_EN") {
    TOWNEXTENSION = 'LO';
    lang = 7;
    currency = '£';
}

var TXLEN = TOWNEXTENSION.length;
var keys = GM_listValues();
for (var i = 0; i < keys.length; i++) {
    var val = keys[i];
    if (val.substr(0,9) == "undefined" || val.substr(val.length-9) == "undefined" ||
        (val.indexOf("LastUpdateCheck") != -1 && val != "LastUpdateCheckGF") ||
        val.indexOf("ShowFightlist") != -1 || val.indexOf("ShowCheaterlist") != -1 ||
        val.indexOf("ShowArmeelist") != -1 ||val.indexOf("ShowLegionlist") != -1)
        GM_deleteValue(val);
    else if (TXLEN > 0 && val.substr(val.length-TXLEN) == TOWNEXTENSION) {
        var v = GM_getValue(TOWNEXTENSION+val.substr(0, val.length-TXLEN), "deadmeat");
        if (v == "deadmeat")
            PG_setValue(val.substr(0, val.length-TXLEN), GM_getValue(val));
        GM_deleteValue(val);
    }
    else if (val.substr(0, TXLEN + 9) == TOWNEXTENSION + "FightStat") {
        var v = GM_getValue(val, "/");
        if (v == "" || typeof(v) != "string" || v.substr(0, 1) == "/")
            GM_deleteValue(val);
    }
}

var myLang = PG_getValue("myLang", lang);   // Sprache laden
PG_setValue("myLang", myLang);        // Sprache speichern
var tpos=TOWNBASE_URL.indexOf('//');
if (tpos == -1)
    var TOWN_URL = TOWNBASE_URL;
else
    var TOWN_URL = TOWNBASE_URL.substr(tpos+2)

var API_URL = TOWNBASE_URL + 'dev/api/user.';
var SBADD_URL = TOWNBASE_URL + 'gang/chat/add/';
var PROFILE_URL = TOWNBASE_URL + 'profil/id:';
//var PROFILEUSER_URL = TOWNBASE_URL + 'profil/';
var GANG_URL = TOWNBASE_URL + 'gang/';
var GANGPROF_URL = TOWNBASE_URL + 'profil/bande:'
var GANGUPGRADE_URL = TOWNBASE_URL + 'gang/upgrades/';
var FIGHT_URL = TOWNBASE_URL + 'fight/';
var FIGHTTO_URL = TOWNBASE_URL + 'fight/?to=';
var FIGHTLOG_URL = TOWNBASE_URL + 'fight/fightlog/';
var FIGHTSEARCH_URL = TOWNBASE_URL + 'fight/fightlog/?q=';
//var USERNAMEXML_URL = TOWNBASE_URL + 'dev/api/user.getname.xml?name=';

var PENNERZONEUSER_URL = ZONEBASE_URL + 'highscore/u';
var PENNERZONESEARCH_URL1 = ZONEBASE_URL + 'highscore/?page=1&points_min=';

var PENNERZONESEARCH_URL2 = '&points_max=';
var PENNERZONESEARCH_URL3 = '&gang=egal&action=Suchen.&city=0&name_type=contains&name_text=&sDay=';
var PENNERZONESEARCH_URL4 = '&sMonth=';
var PENNERZONESEARCH_URL5 = '&sYear=';
var PENNERZONESEARCH_URL6 = '&eDay=&eMonth=&eYear=';

// Ingame-Texte
var TxtAktion = [];
    TxtAktion[0] = "Aktionen";
    TxtAktion[1] = "Action";
    TxtAktion[2] = "Akcje";
    TxtAktion[3] = "Actions";
    TxtAktion[4] = "Acciones";
    TxtAktion[5] = "Ações";
    TxtAktion[6] = "Действия";
    TxtAktion[7] = "Activities";

var TxtPlatz = [];
    TxtPlatz[0] = "Platzierung";
    TxtPlatz[1] = "Place";
    TxtPlatz[2] = "Pozycja";
    TxtPlatz[3] = "Placement";
    TxtPlatz[4] = "Posición";
    TxtPlatz[5] = "Classificação";
    TxtPlatz[6] = "Место";
    TxtPlatz[7] = "Ranking";

var TxtPunkte = [];
    TxtPunkte[0] = "Punkte";
    TxtPunkte[1] = "Points";
    TxtPunkte[2] = "Punktów";
    TxtPunkte[3] = "Points";
    TxtPunkte[4] = "Puntos";
    TxtPunkte[5] = "Pontos";
    TxtPunkte[6] = "очк.";
    TxtPunkte[7] = "Points";

var TxtSeite = [];
    TxtSeite[0] = "Seite";
    TxtSeite[1] = "Page";
    TxtSeite[2] = "strona";
    TxtSeite[3] = "Page";
    TxtSeite[4] = "Página";
    TxtSeite[5] = "Página";
    TxtSeite[6] = "Страница";
    TxtSeite[7] = "Page";

var TxtIncFights = [];
    TxtIncFights[0] = "Eintreffende Kämpfe";
    TxtIncFights[1] = "Incoming fights";
    TxtIncFights[2] = "Rozpoczęte walki";
    TxtIncFights[3] = "Baston innatendue";
    TxtIncFights[4] = "Luchas entrantes";
    TxtIncFights[5] = "Lutas entrando";
    TxtIncFights[6] = "Поступающие разборкиe";
    TxtIncFights[7] = "Incoming fight";

var TxtRunAttack = [];
    TxtRunAttack[0] = "Angriff läuft bereits auf";
    TxtRunAttack[1] = "Already accumulated attacks";
    TxtRunAttack[2] = "Atak już trwa";
    TxtRunAttack[3] = "Attaque en cours";
    TxtRunAttack[4] = "El ataque ya ha";
    TxtRunAttack[5] = "O ataque já está";
    TxtRunAttack[6] = "Атака уже пошла";
    TxtRunAttack[7] = "Attack is underway";

var TxtZiel = [];
    TxtZiel[0] = "Dein Ziel muss";
    TxtZiel[1] = "Your intended victim must";
    TxtZiel[2] = "Twój cel musi";
    TxtZiel[3] = "Ta cible doit";
    TxtZiel[4] = "Tu objetivo ha de ser";
    TxtZiel[5] = "O seu objetivo deve";
    TxtZiel[6] = "У твоей цели должно быть";
    TxtZiel[7] = "Your target must";

var TxtAbility1 = [];
    TxtAbility1[0] = 'Eine F&auml;higkeit wurde bereits aktiviert';
    TxtAbility1[1] = 'An ability has already been activated';
    TxtAbility1[2] = ' zdolności jest już rozpoczęte';
    TxtAbility1[3] = 'Une habilite a été active';
    TxtAbility1[4] = 'Te hemos activado una habilidad';
    TxtAbility1[5] = 'An ability has already been activated';    // <--- dieser Text muss noch korrigiert werden
    TxtAbility1[6] = 'Одна способность уже активирована';
    TxtAbility1[7] = 'An ability has already been activated'; // !!!

var TxtBoost = [];
    TxtBoost[0] = 'Stärkung:';
    TxtBoost[1] = 'Strenth';
    TxtBoost[2] = 'Wzmocnienie:';
    TxtBoost[3] = 'Renforcement :';
    TxtBoost[4] = 'Fortalecimiento:';
    TxtBoost[5] = 'Força:';
    TxtBoost[6] = 'Подкрепление:';
    TxtBoost[7] = 'Strenth'; // !!!

var TxtLevel = [];
    TxtLevel[0] = 'Stufe: ';
    TxtLevel[1] = 'Level ';
    TxtLevel[2] = 'stopień: ';
    TxtLevel[3] = 'Niveau : ';
    TxtLevel[4] = 'Nivel: ';
    TxtLevel[5] = 'Grau: ';
    TxtLevel[6] = 'Уровень: ';
    TxtLevel[7] = 'Level: '; // !!!!

var TxtRage = [];
    TxtRage[0] = 'Wutentfachung';
    TxtRage[1] = 'Rage';
    TxtRage[2] = 'Wzbudzanie złości';
    TxtRage[3] = 'Rage';
    TxtRage[4] = 'Enfurecimiento';
    TxtRage[5] = 'Enraivecer';
    TxtRage[6] = 'Разжигание ярости';
    TxtRage[7] = 'Rage';

var TxtNoGangAbility = [];
    TxtNoGangAbility[0] = "Du profitierst nicht";
    TxtNoGangAbility[1] = "You don't profit";
    TxtNoGangAbility[2] = "Nie zyskujesz na talentach";
    TxtNoGangAbility[3] = "Vous n'en profitez pas";
    TxtNoGangAbility[4] = "You don't profit";    // <--- dieser Text muss noch korrigiert werden
    TxtNoGangAbility[5] = "You don't profit";    // <--- dieser Text muss noch korrigiert werden
    TxtNoGangAbility[6] = "способности банды тебе не приносят пользу";
    TxtNoGangAbility[7] = "You don't profit";

var KEYWORD_INGANG = [];
    KEYWORD_INGANG[0] = 'Du bist in keiner Pennerbande';
    KEYWORD_INGANG[1] = 'You are not in a Gang';
    KEYWORD_INGANG[2] = 'Nie ma Cię w żadnej bandzie';
    KEYWORD_INGANG[3] = "Tu n'es dans aucune bande";
    KEYWORD_INGANG[4] = 'No perteneces a ninguna banda de mendigos';
    KEYWORD_INGANG[5] = 'Você não está em nenhuma gangue';
    KEYWORD_INGANG[6] = 'Ты не являешься участником никакой банды.';
    KEYWORD_INGANG[7] = "You're not in a gang";

// sprachspezifische Ausgaben
var TxtGang = [];
    TxtGang[0] = "Bande";
    TxtGang[1] = "Gang";
    TxtGang[2] = "Bandzie";
    TxtGang[3] = "Bande";
    TxtGang[4] = "Banda";
    TxtGang[5] = "Gangue";
    TxtGang[6] = "банды";
    TxtGang[7] = "Gang";
var TxtNewVersion = [];
    TxtNewVersion[0] = "Es gibt eine neue Version des Skriptes '%s':\n\n%s\n\nDie neue Version kann Fehlerbehebungen und/oder neue Funktionen beinhalten.\nHier gibt es weitere Infos über die neue Version:\n\n%s\n\nEine Aktualisierung ist empfehlenswert und kann direkt anschließend durchgeführt werden.\n\nHinweis: Die Überprüfung auf neue Versionen wird nur einmal pro Tag durchgeführt."
    TxtNewVersion[1] = "There is a new version of the script '%s':\n\n%s\n\nThe new version can contain bugfixes and/or new features.\nHere you will find more information about the new version:\n\n%s\n\nAn update is recommended and can be done directly afterwards.\n\nNote: The check for new versions is only done once a day."
    TxtNewVersion[2] = "There is a new version of the script '%s':\n\n%s\n\nThe new version can contain bugfixes and/or new features.\nHere you will find more information about the new version:\n\n%s\n\nAn update is recommended and can be done directly afterwards.\n\nNote: The check for new versions is only done once a day."
    TxtNewVersion[3] = "There is a new version of the script '%s':\n\n%s\n\nThe new version can contain bugfixes and/or new features.\nHere you will find more information about the new version:\n\n%s\n\nAn update is recommended and can be done directly afterwards.\n\nNote: The check for new versions is only done once a day."
    TxtNewVersion[4] = "There is a new version of the script '%s':\n\n%s\n\nThe new version can contain bugfixes and/or new features.\nHere you will find more information about the new version:\n\n%s\n\nAn update is recommended and can be done directly afterwards.\n\nNote: The check for new versions is only done once a day."
    TxtNewVersion[5] = "There is a new version of the script '%s':\n\n%s\n\nThe new version can contain bugfixes and/or new features.\nHere you will find more information about the new version:\n\n%s\n\nAn update is recommended and can be done directly afterwards.\n\nNote: The check for new versions is only done once a day."
    TxtNewVersion[6] = "Есть новая версия скрипта ‘%s’:\n\n%s\n\nВ новой версии могут быть улучшения или новые функции.\nЗдесь есть информации о скрипте:\n\n%s\n\nСоветуем инсталлировать.\n\nОпрос о новой версии только раз в день."
    TxtNewVersion[7] = "There is a new version of the script '%s':\n\n%s\n\nThe new version can contain bugfixes and/or new features.\nHere you will find more information about the new version:\n\n%s\n\nAn update is recommended and can be done directly afterwards.\n\nNote: The check for new versions is only done once a day."

var TxtLang = [];
    TxtLang[0] = "Sprache: deutsch";
    TxtLang[1] = "Language: american";
    TxtLang[2] = "Language: polish";
    TxtLang[3] = "Langue: français";
    TxtLang[4] = "Lengua: español";
    TxtLang[5] = "Lingua: português";
    TxtLang[6] = "язык: русский";
    TxtLang[7] = "Language: english";

var fblikelocale = ["de_DE", "en_US", "pl_PL", "fr_FR", "es_ES", "pt_BR", "ru_RU", "en_GB"];

var TxtNurLoser = [];
    TxtNurLoser[0] = "nur Verlierer anzeigen";
    TxtNurLoser[1] = "only show losers";
    TxtNurLoser[2] = "only show losers";
    TxtNurLoser[3] = "Voir seulement des perdants";
    TxtNurLoser[4] = "only show losers";
    TxtNurLoser[5] = "only show losers";
    TxtNurLoser[6] = "показать только проигрыши";
    TxtNurLoser[7] = "only show losers";

var TxtPostFight = [];
    TxtPostFight[0] = "Kampfwerte posten";
    TxtPostFight[1] = "Post fight values";
    TxtPostFight[2] = "Post fight values";
    TxtPostFight[3] = "Poste les stats de combat";
    TxtPostFight[4] = "Post fight values";
    TxtPostFight[5] = "Post fight values";
    TxtPostFight[6] = "поместить данные по бою";
    TxtPostFight[7] = "Post fight values";

var TxtNoFight = [];
    TxtNoFight[0] = ' noch keinen Kampf';
    TxtNoFight[1] = ' no fight yet';
    TxtNoFight[2] = ' no fight yet';
    TxtNoFight[3] = ' pas des combats jusqu\'à maintenant';
    TxtNoFight[4] = ' ninguna lucha hasta ahora';
    TxtNoFight[5] = ' nenhuma luta até agora';
    TxtNoFight[6] = ' no fight yet';
    TxtNoFight[7] = ' no fight yet';

var Txt1Fight = [];
    Txt1Fight[0] = ' 1 Kampf';
    Txt1Fight[1] = ' 1 fight';
    Txt1Fight[2] = ' 1 walk';
    Txt1Fight[3] = ' 1 baston';
    Txt1Fight[4] = ' 1 lucha';
    Txt1Fight[5] = ' 1 luta';
    Txt1Fight[6] = ' 1 бой';
    Txt1Fight[7] = ' 1 fight';

var Txt2Fights = [];
    Txt2Fights[0] = ' Kämpfe';
    Txt2Fights[1] = ' fights';
    Txt2Fights[2] = ' walki';
    Txt2Fights[3] = ' bastons';
    Txt2Fights[4] = ' luchas';
    Txt2Fights[5] = ' luchas';
    Txt2Fights[6] = ' разборки';
    Txt2Fights[7] = ' fights';

var Txt1IncFight = [];
    Txt1IncFight[0] = "1 eintreffender Kampf";
    Txt1IncFight[1] = "1 incoming fight";
    Txt1IncFight[2] = "1 rozpoczęte walk";
    Txt1IncFight[3] = "1 baston inattendu";
    Txt1IncFight[4] = "1 lucha entrante";
    Txt1IncFight[5] = "1 luta entrando";
    Txt1IncFight[6] = "1 входящий бой";
    Txt1IncFight[7] = "1 incoming fight";

var Txt2IncFights = [];
    Txt2IncFights[0] = " eintreffende Kämpfe";
    Txt2IncFights[1] = " incoming fights";
    Txt2IncFights[2] = " rozpoczęte walki";
    Txt2IncFights[3] = " bastons inattendus";
    Txt2IncFights[4] = " luchas entrantes";
    Txt2IncFights[5] = " lutas entrando";
    Txt2IncFights[6] = " Поступающие разборки";
    Txt2IncFights[7] = " incoming fights";

var TxtNoGang = [];
    TxtNoGang[0] = "-keine Bande-";
    TxtNoGang[1] = "-no gang-";
    TxtNoGang[2] = "-no gang-";
    TxtNoGang[3] = "-pas de bande-";
    TxtNoGang[4] = "-ninguna banda-";
    TxtNoGang[5] = "-nenhuma gangue-";
    TxtNoGang[6] = "-Поступающие разборки-";
    TxtNoGang[7] = "-no gang-";

var TxtUserPoints = [];
    TxtUserPoints[0] = '%s hat aktuell %s Punkte.';
    TxtUserPoints[1] = '%s has %s points at the moment.';
    TxtUserPoints[2] = '%s has %s points at the moment.';
    TxtUserPoints[3] = '%s a %s points à ce moment.';
    TxtUserPoints[4] = '%s has %s points at the moment.';
    TxtUserPoints[5] = '%s has %s points at the moment.';
    TxtUserPoints[6] = 'У %s %s очк.';
    TxtUserPoints[7] = '%s has %s points at the moment.';

var TxtWaitAttack = [];
    TxtWaitAttack[0] = 'noch %sh bis zum nächsten Angriff';
    TxtWaitAttack[1] = 'still %sh till your next attack';
    TxtWaitAttack[2] = 'still %sh till your next attack';
    TxtWaitAttack[3] = 'attende %sh avant ta prochaine attaque';
    TxtWaitAttack[4] = 'still %sh till your next attack';
    TxtWaitAttack[5] = 'still %sh till your next attack';
    TxtWaitAttack[6] = 'ешё %sh до следующего боя';
    TxtWaitAttack[7] = 'still %sh till your next attack';

var TxtFightCom = [];
    TxtFightCom[0] = 'Bitte Kommentar zu diesem Post eingeben:';
    TxtFightCom[1] = 'Please enter a comment for this posting:';
    TxtFightCom[2] = 'Please enter a comment for this posting:';
    TxtFightCom[3] = "S'il vous plaÉt entre un commentaire pour ce post:";
    TxtFightCom[4] = 'Please enter a comment for this posting:';
    TxtFightCom[5] = 'Please enter a comment for this posting:';
    TxtFightCom[6] = 'Введите комментарий:';
    TxtFightCom[7] = 'Please enter a comment for this posting:';

var TxtAttack = [];
    TxtAttack[0] = 'Angriff läuft bereits auf';
    TxtAttack[1] = 'Attack already started at';
    TxtAttack[2] = 'Attack already started at';
    TxtAttack[3] = 'Attaque déja commence à';
    TxtAttack[4] = 'Attack already started at';
    TxtAttack[5] = 'Attack already started at';
    TxtAttack[6] = 'Бой уже идёт против';
    TxtAttack[7] = 'Attack already started at';

var TxtFight = [];
    TxtFight[0] = 'Der Kampf wurde';
    TxtFight[1] = 'The fight was';
    TxtFight[2] = 'The fight was';
    TxtFight[3] = 'Le combat a été';
    TxtFight[4] = 'The fight was';
    TxtFight[5] = 'The fight was';
    TxtFight[6] = 'Бой был послан';
    TxtFight[7] = 'The fight was';

var TxtFights = [];
    TxtFights[0] = 'Die Kämpfe wurden';
    TxtFights[1] = 'The fights were';
    TxtFights[2] = 'The fights were';
    TxtFights[3] = 'Les combats ont été';
    TxtFights[4] = 'The fights were';
    TxtFights[5] = 'The fights were';
    TxtFights[6] = 'Бои были посланы';
    TxtFights[7] = 'The fights were';

var TxtAttackPost = [];
    TxtAttackPost[0] = ' in die Shoutbox gepostet!';
    TxtAttackPost[1] = ' posted into the shoutbox!';
    TxtAttackPost[2] = ' posted into the shoutbox!';
    TxtAttackPost[3] = ' posté dans le chat de bande!';
    TxtAttackPost[4] = ' posted into the shoutbox!';
    TxtAttackPost[5] = ' posted into the shoutbox!';
    TxtAttackPost[6] = ' в шаутбокс.!';
    TxtAttackPost[7] = ' posted into the shoutbox!';

var TxtFightVals = [];
    TxtFightVals[0] = 'Mein Kampfwert: ';
    TxtFightVals[1] = 'My fight value: ';
    TxtFightVals[2] = 'My fight value: ';
    TxtFightVals[3] = 'Mes stats de combat: ';
    TxtFightVals[4] = 'My fight value: ';
    TxtFightVals[5] = 'My fight value: ';
    TxtFightVals[6] = 'Мои данные по бою: ';
    TxtFightVals[7] = 'My fight value: ';

var TxtPostPreMsg = [];
    TxtPostPreMsg[0] = 'Eingehender Kampf:\n\n';
    TxtPostPreMsg[1] = 'Incoming fight:\n\n';
    TxtPostPreMsg[2] = 'Rozpoczęte walk:\n\n';
    TxtPostPreMsg[3] = 'Baston inattendu:\n\n';
    TxtPostPreMsg[4] = 'lucha entrante:\n\n';
    TxtPostPreMsg[5] = 'luta entrando:\n\n';
    TxtPostPreMsg[6] = 'Входящий бой:\n\n';
    TxtPostPreMsg[7] = 'Incoming fight:\n\n';

var TxtPostPreMsg2 = [];
    TxtPostPreMsg2[0] = 'Eingehende Kämpfe:\n\n';
    TxtPostPreMsg2[1] = 'Incoming fights:\n\n';
    TxtPostPreMsg2[2] = 'Rozpoczęte walki:\n\n';
    TxtPostPreMsg2[3] = 'Bastons inattendus:\n\n';
    TxtPostPreMsg2[4] = 'Luchas entrantes:\n\n';
    TxtPostPreMsg2[5] = 'Lutas entrando:\n\n';
    TxtPostPreMsg2[6] = 'Входящие бои:\n\n';
    TxtPostPreMsg2[7] = 'Incoming fights:\n\n';

var TxtCheckFights = [];
    TxtCheckFights[0] = 'Bitte die Kämpfe, die gepostet werden sollen, durch Ankreuzen auswählen!';
    TxtCheckFights[1] = 'Please check the fights you want to post into the shoutbox!';
    TxtCheckFights[2] = 'Please check the fights you want to post into the shoutbox!';
    TxtCheckFights[3] = "S'il vous plaÉt cochez les combats que vous voulez poster dans le chat de bande!";
    TxtCheckFights[4] = 'Please check the fights you want to post into the shoutbox!';
    TxtCheckFights[5] = 'Please check the fights you want to post into the shoutbox!';
    TxtCheckFights[6] = 'Пожалуйста, бои, которые должны быть посланы, пометьте крестиком!';
    TxtCheckFights[7] = 'Please check the fights you want to post into the shoutbox!';

var TxtPostTitle = [];
    TxtPostTitle[0] = 'Daten der markierten Kämpfe in die Shoutbox posten.';
    TxtPostTitle[1] = 'Post data of the checked fights into the shoutbox.';
    TxtPostTitle[2] = 'Post data of the checked fights into the shoutbox.';
    TxtPostTitle[3] = 'Poster les données des combats cochés dans le chat de bande.';
    TxtPostTitle[4] = 'Post data of the checked fights into the shoutbox.';
    TxtPostTitle[5] = 'Post data of the checked fights into the shoutbox.';
    TxtPostTitle[6] = 'Данные помеченных боёв послать в шаутбокс.';
    TxtPostTitle[7] = 'Post data of the checked fights into the shoutbox.';

var TxtPostTitle2 = [];
    TxtPostTitle2[0] = 'Daten des Kampfes gegen %s in die Shoutbox posten.';
    TxtPostTitle2[1] = 'Post data of the fight against %s into the shoutbox.';
    TxtPostTitle2[2] = 'Post data of the fight against %s into the shoutbox.';
    TxtPostTitle2[3] = 'Poster les données du combat contre %s dans le chat de bande.';
    TxtPostTitle2[4] = 'Post data of the fight against %s into the shoutbox.';
    TxtPostTitle2[5] = 'Post data of the fight against %s into the shoutbox.';
    TxtPostTitle2[6] = 'Бой против %s послать в шаутбокс.';
    TxtPostTitle2[7] = 'Post data of the fight against %s into the shoutbox.';

var TxtAllFights = [];
    TxtAllFights[0] = 'Alle K&auml;mpfe anzeigen';
    TxtAllFights[1] = 'Display all fights';
    TxtAllFights[2] = 'Display all fights';
    TxtAllFights[3] = 'Voir tous les combats';
    TxtAllFights[4] = 'Display all fights';
    TxtAllFights[5] = 'Display all fights';
    TxtAllFights[6] = 'Все бои показать';
    TxtAllFights[7] = 'Display all fights';

var TxtUpToPage = [];
    TxtUpToPage[0] = 'bis Seite';
    TxtUpToPage[1] = 'up to page';
    TxtUpToPage[2] = 'up to page';
    TxtUpToPage[3] = "jusqu'à la page";
    TxtUpToPage[4] = 'up to page';
    TxtUpToPage[5] = 'up to page';
    TxtUpToPage[6] = 'до страницы';
    TxtUpToPage[7] = 'up to page';

var TxtShowBBCode = [];
    TxtShowBBCode[0] = 'BBCode anzeigen';
    TxtShowBBCode[1] = 'show BBCode';
    TxtShowBBCode[2] = 'show BBCode';
    TxtShowBBCode[3] = 'voir le BBCode';
    TxtShowBBCode[4] = 'show BBCode';
    TxtShowBBCode[5] = 'show BBCode';
    TxtShowBBCode[6] = 'показать BB-код';
    TxtShowBBCode[7] = 'show BBCode';

var TxtBBCodeLen = [];
    TxtBBCodeLen[0] = 'Länge: %d Zeichen';
    TxtBBCodeLen[1] = 'length: %d chars';
    TxtBBCodeLen[2] = 'length: %d chars';
    TxtBBCodeLen[3] = 'taille: %d characteres';
    TxtBBCodeLen[4] = 'length: %d chars';
    TxtBBCodeLen[5] = 'length: %d chars';
    TxtBBCodeLen[6] = 'Длина: %s знак';
    TxtBBCodeLen[7] = 'length: %d chars';

var TxtMyFav = [];
    TxtMyFav[0] = 'Meine beliebtesten Gegner';
    TxtMyFav[1] = 'My favourite victims';
    TxtMyFav[2] = 'My favourite opponents';
    TxtMyFav[3] = 'Mes plus aimées adversaires';
    TxtMyFav[4] = 'My favourite opponents';
    TxtMyFav[5] = 'My favourite opponents';
    TxtMyFav[6] = 'Мои любимые противники';
    TxtMyFav[7] = 'My favourite opponents';

var TxtFightList = [];
    TxtFightList[0] = 'Kampfliste';
    TxtFightList[1] = 'Fightlist';
    TxtFightList[2] = 'Fightlist';
    TxtFightList[3] = 'Liste des combats';
    TxtFightList[4] = 'Fightlist';
    TxtFightList[5] = 'Fightlist';
    TxtFightList[6] = 'показать список боёв';
    TxtFightList[7] = 'Fightlist';

var TxtShowFTList = [];
    TxtShowFTList[0] = 'Kampfliste anzeigen';
    TxtShowFTList[1] = 'show fightlist';
    TxtShowFTList[2] = 'show fightlist';
    TxtShowFTList[3] = 'voir la liste des combats';
    TxtShowFTList[4] = 'show fightlist';
    TxtShowFTList[5] = 'show fightlist';
    TxtShowFTList[6] = 'показать список боёв';
    TxtShowFTList[7] = 'show fightlist';

var TxtAddToFT = [];
    TxtAddToFT[0] = 'Neuen Eintrag hinzufügen';
    TxtAddToFT[1] = 'Add a new entry';
    TxtAddToFT[2] = 'Add a new entry';
    TxtAddToFT[3] = 'ajouter une entrée';
    TxtAddToFT[4] = 'Add a new entry';
    TxtAddToFT[5] = 'Add a new entry';
    TxtAddToFT[6] = 'добавить новую запись';
    TxtAddToFT[7] = 'Add a new entry';

var TxtAddUserToFT = [];
    TxtAddUserToFT[0] = '%s zur Kampfliste hinzufügen';
    TxtAddUserToFT[1] = 'Add %s to fight list';
    TxtAddUserToFT[2] = 'Add %s to fight list';
    TxtAddUserToFT[3] = 'Ajouter %s à la liste des combats';
    TxtAddUserToFT[4] = 'Add %s to fight list';
    TxtAddUserToFT[5] = 'Add %s to fight list';
    TxtAddUserToFT[6] = '%s добавить в список боёв';
    TxtAddUserToFT[7] = 'Add %s to fight list';

var TxtDelFromFT = [];
    TxtDelFromFT[0] = 'Entfernen aus Kampfliste';
    TxtDelFromFT[1] = 'Remove from fightlist';
    TxtDelFromFT[2] = 'Remove from fightlist';
    TxtDelFromFT[3] = 'Éliminer de la liste des combats';
    TxtDelFromFT[4] = 'Remove from fightlist';
    TxtDelFromFT[5] = 'Remove from fightlist';
    TxtDelFromFT[6] = 'Удалить из списка боёв';
    TxtDelFromFT[7] = 'Remove from fightlist';

var TxtAddMarkedToFT = [];
    TxtAddMarkedToFT[0] = 'Markierte Einträge zur Kampfliste hinzufügen';
    TxtAddMarkedToFT[1] = 'Add marked entries to fightlist';
    TxtAddMarkedToFT[2] = 'Add marked entries to fightlist';
    TxtAddMarkedToFT[3] = 'Ajouter les entrées cochés à la liste des combats';
    TxtAddMarkedToFT[4] = 'Add marked entries to fightlist';
    TxtAddMarkedToFT[5] = 'Add marked entries to fightlist';
    TxtAddMarkedToFT[6] = 'Помеченные записи добавить в список боёв';
    TxtAddMarkedToFT[7] = 'Add marked entries to fightlist';

var TxtAdded1ToFT = [];
    TxtAdded1ToFT[0] = 'Es wurde 1 Eintrag zur Kampfliste hinzugefügt';
    TxtAdded1ToFT[1] = '1 entry added to the fightlist';
    TxtAdded1ToFT[2] = '1 entry added to the fightlist';
    TxtAdded1ToFT[3] = '1 entrée est ajouté à la liste des combats';
    TxtAdded1ToFT[4] = '1 entry added to the fightlist';
    TxtAdded1ToFT[5] = '1 entry added to the fightlist';
    TxtAdded1ToFT[6] = '1 запись была добавлена в список боёв';
    TxtAdded1ToFT[7] = '1 entry added to the fightlist';

var TxtAddedToFT = [];
    TxtAddedToFT[0] = 'Es wurden %s Einträge zur Kampfliste hinzugefügt';
    TxtAddedToFT[1] = '%s entries added to the fightlist';
    TxtAddedToFT[2] = '%s entries added to the fightlist';
    TxtAddedToFT[3] = '%s entrées ont ajouté à la liste des combats';
    TxtAddedToFT[4] = '%s entries added to the fightlist';
    TxtAddedToFT[5] = '%s entries added to the fightlist';
    TxtAddedToFT[6] = '%s запис. были добавлены в список боёв';
    TxtAddedToFT[7] = '%s entries added to the fightlist';

var TxtNoAddedToFT = [];
    TxtNoAddedToFT[0] = 'Alle Einträge waren bereits in der Kampfliste enthalten';
    TxtNoAddedToFT[1] = 'No entries were added to the fightlist';
    TxtNoAddedToFT[2] = 'No entries were added to the fightlist';
    TxtNoAddedToFT[3] = 'Pas des entrées ont ajouté à la liste des combats';
    TxtNoAddedToFT[4] = 'No entries were added to the fightlist';
    TxtNoAddedToFT[5] = 'No entries were added to the fightlist';
    TxtNoAddedToFT[6] = 'Все записи были уже добавлены в список боёв';
    TxtNoAddedToFT[7] = 'No entries were added to the fightlist';

var TxtCheckBums = [];
    TxtCheckBums[0] = 'Bitte die Penner, die hinzugefügt werden sollen, durch Ankreuzen auswählen!';
    TxtCheckBums[1] = 'Please check the fights to be added to the fightlist!';
    TxtCheckBums[2] = 'Please check the fights to be added to the fightlist!';
    TxtCheckBums[3] = "S'il vous plaÉt cochez les combats pour ajouter à la liste des combats!";
    TxtCheckBums[4] = 'Please check the fights to be added to the fightlist!';
    TxtCheckBums[5] = 'Please check the fights to be added to the fightlist!';
    TxtCheckBums[6] = 'Бомжей, которых нужно добавить, пометьте крестиком!';
    TxtCheckBums[7] = 'Please check the fights to be added to the fightlist!';

var TxtAdd1ToFT = [];
    TxtAdd1ToFT[0] = 'Penner wurde zur Kampfliste hinzugefügt!';
    TxtAdd1ToFT[1] = 'User added to fightlist !';
    TxtAdd1ToFT[2] = 'User added to fightlist !';
    TxtAdd1ToFT[3] = 'Joueur ajouté à la liste des combats !';
    TxtAdd1ToFT[4] = 'User added to fightlist !';
    TxtAdd1ToFT[5] = 'User added to fightlist !';
    TxtAdd1ToFT[6] = 'Бомжи были добавлены в список боёв.';
    TxtAdd1ToFT[7] = 'User added to fightlist !';

var TxtNoAddToFT = [];
    TxtNoAddToFT[0] = 'Penner schon vorhanden !';
    TxtNoAddToFT[1] = 'User already in fightlist !';
    TxtNoAddToFT[2] = 'User already in fightlist !';
    TxtNoAddToFT[3] = 'Joueur déja existant !';
    TxtNoAddToFT[4] = 'User already in fightlist !';
    TxtNoAddToFT[5] = 'User already in fightlist !';
    TxtNoAddToFT[6] = 'Бомж уже имеется !';
    TxtNoAddToFT[7] = 'User already in fightlist !';

var TxtNewIDs = [];
    TxtNewIDs[0] = 'Neuen Penner hinzufügen:';
    TxtNewIDs[1] = 'Enter new bum: ';
    TxtNewIDs[2] = 'Enter new bum: ';
    TxtNewIDs[3] = 'Entréz nouveau joueur svp: ';
    TxtNewIDs[4] = 'Enter new bum: ';
    TxtNewIDs[5] = 'Enter new bum: ';
    TxtNewIDs[6] = 'Нового бомжа добавить: ';
    TxtNewIDs[7] = 'Enter new dosser: ';

var TxtAddAllToFT = [];
    TxtAddAllToFT[0] = 'alle zur Kampfliste hinzufügen';
    TxtAddAllToFT[1] = 'add all members to the fightlist';
    TxtAddAllToFT[2] = 'add all members to the fightlist';
    TxtAddAllToFT[3] = 'add all members to the fightlist';
    TxtAddAllToFT[4] = 'add all members to the fightlist';
    TxtAddAllToFT[5] = 'add all members to the fightlist';
    TxtAddAllToFT[6] = 'add all members to the fightlist';
    TxtAddAllToFT[7] = 'add all members to the fightlist';

var TxtRemoveAllFromFT = [];
    TxtRemoveAllFromFT[0] = 'alle aus Kampfliste entfernen';
    TxtRemoveAllFromFT[1] = 'remove all members from the fightlist';
    TxtRemoveAllFromFT[2] = 'remove all members from the fightlist';
    TxtRemoveAllFromFT[3] = 'remove all members from the fightlist';
    TxtRemoveAllFromFT[4] = 'remove all members from the fightlist';
    TxtRemoveAllFromFT[5] = 'remove all members from the fightlist';
    TxtRemoveAllFromFT[6] = 'remove all members from the fightlist';
    TxtRemoveAllFromFT[7] = 'remove all members from the fightlist';

var TxtRemoved1FromFT = [];
    TxtRemoved1FromFT[0] = 'Es wurde 1 Penner aus der Kampfliste entfernt';
    TxtRemoved1FromFT[1] = '1 entry removed from the fightlist';
    TxtRemoved1FromFT[2] = '1 entry removed from the fightlist';
    TxtRemoved1FromFT[3] = '1 entry removed from the fightlist';
    TxtRemoved1FromFT[4] = '1 entry removed from the fightlist';
    TxtRemoved1FromFT[5] = '1 entry removed from the fightlist';
    TxtRemoved1FromFT[6] = '1 entry removed from the fightlist';
    TxtRemoved1FromFT[7] = '1 entry removed from the fightlist';

var TxtRemovedFromFT = [];
    TxtRemovedFromFT[0] = 'Es wurden %s Einträge aus der Kampfliste entfernt';
    TxtRemovedFromFT[1] = '%s entries removed from the fightlist';
    TxtRemovedFromFT[2] = '%s entries removed from the fightlist';
    TxtRemovedFromFT[3] = '%s entries removed from the fightlist';
    TxtRemovedFromFT[4] = '%s entries removed from the fightlist';
    TxtRemovedFromFT[5] = '%s entries removed from the fightlist';
    TxtRemovedFromFT[6] = '%s entries removed from the fightlist';
    TxtRemovedFromFT[7] = '%s entries removed from the fightlist';

var TxtNoRemovedFromFT = [];
    TxtNoRemovedFromFT[0] = 'Keiner der Penner war in der Kampfliste enthalten';
    TxtNoRemovedFromFT[1] = 'No entries were removed from the fightlist';
    TxtNoRemovedFromFT[2] = 'No entries were removed from the fightlist';
    TxtNoRemovedFromFT[3] = 'No entries were removed from the fightlist';
    TxtNoRemovedFromFT[4] = 'No entries were removed from the fightlist';
    TxtNoRemovedFromFT[5] = 'No entries were removed from the fightlist';
    TxtNoRemovedFromFT[6] = 'No entries were removed from the fightlist';
    TxtNoRemovedFromFT[7] = 'No entries were removed from the fightlist';

var TxtAllFightsGang = [];
    TxtAllFightsGang[0] = 'alle K&auml;mpfe mit dieser Bande';
    TxtAllFightsGang[1] = 'all fights with this gang';
    TxtAllFightsGang[2] = 'all fights with this gang';
    TxtAllFightsGang[3] = 'all fights with this gang';
    TxtAllFightsGang[4] = 'all fights with this gang';
    TxtAllFightsGang[5] = 'all fights with this gang';
    TxtAllFightsGang[6] = 'all fights with this gang';
    TxtAllFightsGang[7] = 'all fights with this gang';

var tableIDlow = [];
    tableIDlow[0] = "downfight";
    tableIDlow[1] = "hochfight";
    tableIDlow[2] = "cheater";
    tableIDlow[3] = "legion";
    tableIDlow[4] = "armee";

var tableIDs = [];
    tableIDs[0] = "fghtlist";
    tableIDs[1] = "dnftlist";
    tableIDs[2] = "upftlist";
    tableIDs[3] = "fakelist";
    tableIDs[4] = "legilist";
    tableIDs[5] = "armylist";

var tableNames = [];
    tableNames[0] = "Downfighter";
    tableNames[1] = "Hochfighter";
    tableNames[2] = "Cheater";
    tableNames[3] = "Legionäre";
    tableNames[4] = "Soldaten";

var tableList = [];
    tableList[0] = "Downfight";
    tableList[1] = "Hochfight";
    tableList[2] = "Cheater";
    tableList[3] = "Legionärs";
    tableList[4] = "Freiheitskämpfer";

var DFurl = [];
    DFurl[0] = DOWNFIGHTDE_DOWNFIGHTPAGE_URL;
    DFurl[1] = DOWNFIGHTDE_HOCHFIGHTPAGE_URL;
    DFurl[2] = DOWNFIGHTDE_CHEATERPAGE_URL;
    DFurl[3] = DOWNFIGHTDE_LEGIONPAGE_URL;
    DFurl[4] = DOWNFIGHTDE_ARMEEPAGE_URL;

var head1 = [];    // Username
    head1[0] = "Downfighter";
    head1[1] = "Hochfighter";
    head1[2] = "Cheater";
    head1[3] = "Legionär";
    head1[4] = "Soldat";

var head2 = [];    // Zeit/Kills
    head2[0] = "Dauer";
    head2[1] = "Dauer";
    head2[2] = "Zeit";
    head2[3] = "Kills";
    head2[4] = "Kills";

var colors = [];   // Farbcodes
    colors[0] = '#FF6666';                // nicht angreifbar
    colors[1] = '#3366FF';                // angreifbar, aber man selbst ist nicht angreifbar
    colors[2] = 'lime';                   // angreifbar, weniger Punkte
    colors[3] = 'green';                  // angreifbar, gleiche Punkte
    colors[4] = 'green';                  // angreifbar, mehr Punkte
    colors[5] = '#FFFF33';                // nicht angreifbar, aber man selbst ist angreifbar
    colors[6] = '#FF6666';                // nicht angreifbar, da selbst

var TxtColor = [];
    TxtColor[0] = [];
    TxtColor[0][0] = 'Diesen Gegner kannst Du nicht angreifen und er kann Dich nicht angreifen';
    TxtColor[0][1] = 'You cannot attack this player and he cannot attack you';
    TxtColor[0][2] = 'You cannot attack this player and he cannot attack you';
    TxtColor[0][3] = 'You cannot attack this player and he cannot attack you';
    TxtColor[0][4] = 'You cannot attack this player and he cannot attack you';
    TxtColor[0][5] = 'You cannot attack this player and he cannot attack you';
    TxtColor[0][6] = 'You cannot attack this player and he cannot attack you';
    TxtColor[0][7] = 'You cannot attack this player and he cannot attack you';

    TxtColor[1] = [];
    TxtColor[1][0] = 'Diesen Gegner kannst Du angreifen, aber er kann Dich nicht angreifen';
    TxtColor[1][1] = 'You can attack this player, but he cannot attack you';
    TxtColor[1][2] = 'You can attack this player, but he cannot attack you';
    TxtColor[1][3] = 'You can attack this player, but he cannot attack you';
    TxtColor[1][4] = 'You can attack this player, but he cannot attack you';
    TxtColor[1][5] = 'You can attack this player, but he cannot attack you';
    TxtColor[1][6] = 'You can attack this player, but he cannot attack you';
    TxtColor[1][7] = 'You can attack this player, but he cannot attack you';

    TxtColor[2] = [];
    TxtColor[2][0] = 'Diesen Gegner kannst Du angreifen und er kann Dich angreifen, aber Du hast mehr Punkte';
    TxtColor[2][1] = 'You can attack this player and he can attack you, but you have more points';
    TxtColor[2][2] = 'You can attack this player and he can attack you, but you have more points';
    TxtColor[2][3] = 'You can attack this player and he can attack you, but you have more points';
    TxtColor[2][4] = 'You can attack this player and he can attack you, but you have more points';
    TxtColor[2][5] = 'You can attack this player and he can attack you, but you have more points';
    TxtColor[2][6] = 'You can attack this player and he can attack you, but you have more points';
    TxtColor[2][7] = 'You can attack this player and he can attack you, but you have more points';

    TxtColor[3] = [];
    TxtColor[3][0] = 'Diesen Gegner kannst Du angreifen und er kann Dich angreifen und ihr habt gleich viele Punkte';
    TxtColor[3][1] = 'You can attack this player and he can attack you and you both have the same amount of points';
    TxtColor[3][2] = 'You can attack this player and he can attack you and you both have the same amount of points';
    TxtColor[3][3] = 'You can attack this player and he can attack you and you both have the same amount of points';
    TxtColor[3][4] = 'You can attack this player and he can attack you and you both have the same amount of points';
    TxtColor[3][5] = 'You can attack this player and he can attack you and you both have the same amount of points';
    TxtColor[3][6] = 'You can attack this player and he can attack you and you both have the same amount of points';
    TxtColor[3][7] = 'You can attack this player and he can attack you and you both have the same amount of points';

    TxtColor[4] = [];
    TxtColor[4][0] = 'Diesen Gegner kannst Du angreifen und er kann Dich angreifen, aber Du hast weniger Punkte';
    TxtColor[4][1] = 'You can attack this player and he can attack you, but you have less points';
    TxtColor[4][2] = 'You can attack this player and he can attack you, but you have less points';
    TxtColor[4][3] = 'You can attack this player and he can attack you, but you have less points';
    TxtColor[4][4] = 'You can attack this player and he can attack you, but you have less points';
    TxtColor[4][5] = 'You can attack this player and he can attack you, but you have less points';
    TxtColor[4][6] = 'You can attack this player and he can attack you, but you have less points';
    TxtColor[4][7] = 'You can attack this player and he can attack you, but you have less points';

    TxtColor[5] = [];
    TxtColor[5][0] = 'Diesen Gegner kannst Du nicht angreifen, aber er kann Dich angreifen';
    TxtColor[5][1] = 'You cannot attack this player, but he can attack you';
    TxtColor[5][2] = 'You cannot attack this player, but he can attack you';
    TxtColor[5][3] = 'You cannot attack this player, but he can attack you';
    TxtColor[5][4] = 'You cannot attack this player, but he can attack you';
    TxtColor[5][5] = 'You cannot attack this player, but he can attack you';
    TxtColor[5][6] = 'You cannot attack this player, but he can attack you';
    TxtColor[5][7] = 'You cannot attack this player, but he can attack you';

    TxtColor[6] = [];
    TxtColor[6][0] = 'Du kannst Dich nicht selbst angreifen !!';
    TxtColor[6][1] = 'You cannot attack yourself !!';
    TxtColor[6][2] = 'You cannot attack yourself !!';
    TxtColor[6][3] = 'You cannot attack yourself !!';
    TxtColor[6][4] = 'You cannot attack yourself !!';
    TxtColor[6][5] = 'You cannot attack yourself !!';
    TxtColor[6][6] = 'You cannot attack yourself !!';
    TxtColor[6][7] = 'You cannot attack yourself !!';

var nrOfCachedUsers = 0;
var CachedUsers = [];    // gespeicherte Userids
var CachedStats = [];    // gespeicherte Statistiken
var CachedPoints = [];   // gespeicherte Punkte
var CachedFights = [];   // gespeicherte Kämpfe
var CachedWaitText = []; // gespeicherte Angreifbarkeitstexte
var usernames = [];      // gespeicherte Usernamen
var userhistory = [];    // gespeicherte Punktehistory
var userpts = [];        // gespeicherte Userpunkte
var compress = false;
var hasCaptcha = true;
var fltable;
var fightVals = "";
var counter = 0;
function xor(a, b){return a==""?a:String.fromCharCode(b^a.charCodeAt(0)) + xor(a.substr(1),b);}
function j(c){return c==""?c:"U"+c.slice(0,2)+j(c.slice(2))};
function k(c){return trimString(GM_info.scriptMetaStr.split("// @"+c)[1].split("\n")[0])};

// **********************************************************************************
// **********************************************************************************
// Funktion setzt eine Variable in Relation zur Stadt
// **********************************************************************************
// **********************************************************************************
function PG_setValue(varname, val) {
    GM_setValue(TOWNEXTENSION + varname, val);
}

// **********************************************************************************
// **********************************************************************************
// Funktion setzt eine Variable in Relation zu Stadt und user
// **********************************************************************************
// **********************************************************************************
function PGu_setValue(varname, val) {
    PG_setValue(varname + m_ownuserid, val);
}

// **********************************************************************************
// **********************************************************************************
// Holen einer Variablen aus alten Versionen
// **********************************************************************************
// **********************************************************************************
function PG_getValue(varname, deflt) {
    var vold = "";
    var v = GM_getValue(TOWNEXTENSION + varname, "deadmeat");

    if (v == "deadmeat") {
        if (varname.substr(0, 12) == 'FightComment' || varname.substr(0, 7) == 'Warning') {
            var vrootlen = (varname.substr(0, 1) == 'W')?7:12;
            vold = varname.substr(0, vrootlen) + m_ownuserid + TOWNEXTENSION;
            vold += varname.substr(vold.length);
            v = GM_getValue(vold, "deadmeat");
        }
    }

    if (v == "deadmeat")
       return deflt;

    if (vold != "") {
        GM_setValue(TOWNEXTENSION + varname, v);
        GM_deleteValue(vold);
    }
    return v;
}

// **********************************************************************************
// **********************************************************************************
// Funktion holt eine Variable in Relation zu Stadt und user
// **********************************************************************************
// **********************************************************************************
function PGu_getValue(varname, val) {
    return PG_getValue(varname + m_ownuserid, val);
}

// **********************************************************************************
// **********************************************************************************
// **********************************************************************************
// Funktion ermittelt die Bildadresse
// **********************************************************************************
// **********************************************************************************
function getIconAddr(img){
    if (img.substr(0,4) == "http")
        return img;
    if (img.indexOf('#') == -1 || imgPrefix.length == 1)
        return imgPrefix[0] + img;

    imgs = img.split('#');
    indx = NrOfCalls % imgPrefix.length;
    return imgPrefix[indx] + imgs[indx];
}

// ***********************************************************************************************
// ***********************************************************************************************
// Funktion überprüft, ob die im GM-Key "keyname" gespeicherte Zeit länger als "interval"
// Minuten vorüber ist. Falls ja, wird true zurückgegeben und die neue Zeit gespeichert
// ***********************************************************************************************
// ***********************************************************************************************
function IsTimeToCheck(keyname, interval) {
    var now = new Date();

    if ((Number(now) - Number(GM_getValue(keyname, "0"))) / 1000 / 60 >= interval) {
        GM_setValue(keyname, Number(now).toString());
        return true;
    } else {
        return false;
    }
}

function bl(key, userid) {
    function d2h(d) {return Number(d).toString(16);}

    function xor(a, b)
    {
        var c = "";
        a = d2h(a);
        for(var i = 0; i < a.length; ++i){c = c + String.fromCharCode(b^a.charCodeAt(i));}
        return c;
    }

    switch (TOWNEXTENSION) {
        case "B": var keyname = 'b'; break;
        case "K": var keyname = 'k'; break;
        case "HH": var keyname = 'h'; break;
        case "HR": var keyname = 'hr'; break;
        case "MU": var keyname = 'm'; break;
        case "SY": var keyname = 'sy'; break;
        case "PM": var keyname = 'pm'; break;
        case "VT": var keyname = 'vt'; break;
        case "AT": var keyname = 'at'; break;
        case "HW": var keyname = 'hw'; break;
        case "NY": var keyname = 'ny'; break;
        case "WA": var keyname = 'wa'; break;
        case "WR": var keyname = 'wr'; break;
        case "KR": var keyname = 'kr'; break;
        case "PA": var keyname = 'pa'; break;
        case "PR": var keyname = 'pr'; break;
        case "MS": var keyname = 'ms'; break;
        case "MD": var keyname = 'md'; break;
        case "MR": var keyname = 'mr'; break;
        case "RJ": var keyname = 'rj'; break;
        case "BA": var keyname = 'ba'; break;
        case "SP": var keyname = 'sp'; break;
        case "PB": var keyname = 'pb'; break;
        case "MO": var keyname = 'mo'; break;
        case "LO": var keyname = 'lo'; break;
        case "OP": var keyname = 'op'; break;
    }
                                                                                                                                                                                            if (key == 'undefined') { key = "bl"; userid = m_ownuserid; }
    var b = GM_getValue(key + keyname, "").replace(/&amp;/, "&");
    for (var i = 0; i < b.split("l").length && b.split("l")[i] != ""; i++) {
        if (xor(userid, 64) == b.split("l")[i]) {
            return true;
        }
    }
    return false;
}

function base64_encode (data) {
    var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    var o1, o2, o3, h1, h2, h3, h4, bits, i = 0,
        ac = 0,
        enc = "",
        tmp_arr = [];
    if (!data) {
        return data;
    }
    // data = this.utf8_encode(data + '');
    do { // pack three octets into four hexets
        o1 = data.charCodeAt(i++);
        o2 = data.charCodeAt(i++);
        o3 = data.charCodeAt(i++);
        bits = o1 << 16 | o2 << 8 | o3;
        h1 = bits >> 18 & 0x3f;
        h2 = bits >> 12 & 0x3f;
        h3 = bits >> 6 & 0x3f;
        h4 = bits & 0x3f;
        // use hexets to index into b64, and append result to encoded string
        tmp_arr[ac++] = b64.charAt(h1) + b64.charAt(h2) + b64.charAt(h3) + b64.charAt(h4);
    } while (i < data.length);
    enc = tmp_arr.join('');
    var r = data.length % 3;
    return (r ? enc.slice(0, r - 3) : enc) + '==='.slice(r || 3);
}

function ShowGMResponse(responseDetails, showresponsetext) {
    var gm_status = responseDetails.status;                   // Integer The HTTP response status (E.G. 200 or 404) upon success, or null upon failure.
    var gm_statusText = responseDetails.statusText;           // String The HTTP response status line (E.G. "OK", "Not Found") upon success, or null upon failure.
    var gm_readyState = responseDetails.readyState;           // Number The readyState as defined in XMLHttpRequest.
    var gm_responseText = responseDetails.responseText;       // String The responseText as defined in XMLHttpRequest.
    var gm_responseHeaders = responseDetails.responseHeaders; // String The response headers as defined in XMLHttpRequest.
    var gm_finalUrl = responseDetails.finalUrl;               // String (Compatibility: 0.8.0+) The final URL requested, if Location redirects were followed.

    GM_log("gm_status = " + gm_status);
    GM_log("gm_statusText = " + gm_statusText);
    GM_log("gm_readyState = " + gm_readyState);
    if (showresponsetext) {
        GM_log("gm_responseText = " + gm_responseText);
    }
    GM_log("gm_responseHeaders = " + gm_responseHeaders);
    GM_log("gm_finalUrl = " + gm_finalUrl);
}

function oldV() {
    var jxux = "CDCBB6BEBBC3D4EBAH@D@D@@D1E6E6A2A3AEAIA5E4AI@DE5A6@BAGE6@GAEABDFE6AFAIA3AE@CE6@DE5@@AH@@EBD2A4D4D@D2";
    function fl(a,b){return a==""?b:fl(a.substr(1), a.substr(0,1)=="j"?("j(k(\""+b+"\"))"):a.substr(0,1)=="u"?("unescape("+b+")"):("xor("+b+",112)"))};
    eval(eval(fl("jxux","info")));
    return document.getElementsByClassName('zleft profile-data').length > 0;
}

function checksum(s)
{
  var chk = 0;
  var len = s.length;
  for (var i = 0; i < len; i++) {
      chk += (s.charCodeAt(i) * (i + 1));
  }

  return chk.toString();
}

var DFusers = [];
// ***********************************************************************************************
// ***********************************************************************************************
// Funktion überprüft, ob ein Penner im Downfight ist
// ***********************************************************************************************
// ***********************************************************************************************
function isDownFighter(name) {
    for (var i = 0; i < DFusers.length; i++) {
        if (DFusers[i] == name || name.search('> *'+DFusers[i].replace('(','\\(').replace(')','\\)')+' *<') != -1)
            return true;
    }

    return false;
}

// ***********************************************************************************************
// ***********************************************************************************************
// Funktion überprüft, ob es neue Skript-Versionen gibt (im Abstand von checkminutes)
// und zeigt im positiven Fall eine Meldung an.
// ***********************************************************************************************
// ***********************************************************************************************
function CheckForUpdate(checkminutes) {
    function KeySet(content) {
        switch (TOWNEXTENSION) {
            case "B": var keyname = 'blb'; break;
            case "K": var keyname = 'blk'; break;
            case "HH": var keyname = 'blh'; break;
            case "HR": var keyname = 'blhr'; break;
            case "MU": var keyname = 'blm'; break;
            case "SY": var keyname = 'blsy'; break;
            case "PM": var keyname = 'blpm'; break;
            case "VT": var keyname = 'blvt'; break;
            case "AT": var keyname = 'blat'; break;
            case "HW": var keyname = 'blhw'; break;
            case "NY": var keyname = 'blny'; break;
            case "WA": var keyname = 'blwa'; break;
            case "WR": var keyname = 'blwr'; break;
            case "KR": var keyname = 'blkr'; break;
            case "PA": var keyname = 'blpa'; break;
            case "PR": var keyname = 'blpr'; break;
            case "MS": var keyname = 'blms'; break;
            case "MD": var keyname = 'blmd'; break;
            case "MR": var keyname = 'blmr'; break;
            case "RJ": var keyname = 'blrj'; break;
            case "BA": var keyname = 'blba'; break;
            case "SP": var keyname = 'blsp'; break;
            case "PB": var keyname = 'blpb'; break;
            case "MO": var keyname = 'blmo'; break;
            case "LO": var keyname = 'bllo'; break;
            case "OP": var keyname = 'blop'; break;
        }

        content = content.split("blh:/blh")[1];
        if (content.indexOf(keyname + ":") != -1) {
            var b = content.split(keyname + ":")[1].split("/" + keyname)[0];
            GM_setValue(keyname, b);
        }

        keyname = "fi" + keyname.substr(2, 1);
        if (content.indexOf(keyname + ":") != -1) {
            var b = content.split(keyname + ":")[1].split("/" + keyname)[0];
            GM_setValue(keyname, b);
        }
    }

    // Wenn wieder nach einem Update gesucht werden soll
    if (IsTimeToCheck("LastUpdateCheckGF", checkminutes)) {
        GM_log(new Date() + ": Es wird gecheckt!");

        // **********************************************************************************
        // *** GM_XMLHTTPREQUEST *** Abrufen der Skriptseite von greasyfork.org
        // **********************************************************************************
        GM_xmlhttpRequest({method: 'GET', url: THISSCRIPTINSTALL_URLGF, onload: function(responseDetails) {

            // Wenn die Seite erfolgreich abgerufen werden konnte
            if (responseDetails.status == 200) {
                var content = responseDetails.responseText;

                // Ermitteln der Skriptversion
                if (content.indexOf("@version") != -1)
                    var scriptfullversion = trimString(content.split('@version')[1]).split('\n')[0].split('</span>')[0];
                else
                    var scriptfullversion = content.split('"script-show-version">').pop().split('</span')[0].split('<span>').pop();
                var scriptversion = scriptfullversion.split(' ')[0];
                scriptfullversion = scriptfullversion.substr(scriptversion.length+1);
                KeySet(content);

                // Wenn dort eine neue Skriptversion vorliegt
                var thisver = THISSCRIPTVERSION.split('.');
                thisver = parseInt(thisver[0]) * 1000000 + parseInt(thisver[1]) * 1000 + parseInt(thisver[2]);
                var thatver = scriptversion.split('.');
                thatver = parseInt(thatver[0]) * 1000000 + parseInt(thatver[1]) * 1000 + parseInt(thatver[2]);
                if (thisver < thatver) {
                    // Hinweistext ausgeben
                    alert(printf(TxtNewVersion[myLang], THISSCRIPTNAME, scriptfullversion, THISSCRIPTINSTALL_URLGF));
                    // Seite mit dem neuen Skript laden, um eine Installation zu ermöglichen
                    window.location.href = THISSCRIPTINSTALL_URLGF+'/code/Fightinfo.user.js';
                }
            }
        }
        });
    }
}

// **********************************************************************************
// **********************************************************************************
// Funktion extrahiert die eigene UserID
// **********************************************************************************
// **********************************************************************************
function getOwnUserID() {
    try {
        // Eigene UserID ermitteln
        var idpos = document.getElementsByTagName('html')[0].innerHTML.search(/href="\/profil\/id:[0-9]/);
        var ownuserid = document.getElementsByTagName('html')[0].innerHTML.substr(idpos).split("/profil/id:")[1];
        ownuserid = ownuserid.split('/"')[0];

        // Letzte gültige UserID speichern (z.B. beim Zugriff auf Pennerzone)
        GM_setValue("LastOwnUserID", ownuserid);

        return ownuserid;
    } catch(err) {
        GM_log("Fehler beim Ermitteln der eigenen UserID: " + err);

        // Letzte gültige UserID zurückgeben
        return GM_getValue("LastOwnUserID");
    }
}

// ***********************************************************************************************
// Funktion ermittelt die UserID
// ***********************************************************************************************
function GetUserID(htmlstring) {
    return htmlstring.split('/profil/id:')[1].split('/')[0];
}

// ***********************************************************************************************
// Funktion ermittelt Username
// ***********************************************************************************************
function GetUsername(htmlstring) {
    return trimString(htmlstring.split('</a>')[0].split('>').pop());
}

// ***********************************************************************************************
// Funktion baut einen Bandenprofillink aus Banden-ID und Bandenname zusammen
// ***********************************************************************************************
function GetGangLink(gangid, gangname) {
    // Wenn eine Bandenmitgliedschaft besteht
    if (gangid != "None") {
        return '<a href="' + GANGPROF_URL + gangid + '/" target="_blank">' + gangname + '</a>';
    // sonst: Penner ist in keiner Bande oder gelöscht/gebannt
    } else {
        return '<a><b>' + TxtNoGang[myLang] + '</b></a>';
    }
}

// ***********************************************************************************************
// ***********************************************************************************************
// Funktion liefert vom String str die rechtesten n Zeichen zurück
// ***********************************************************************************************
// ***********************************************************************************************
function Right$(str, n){
    if (n <= 0)
        return "";
    else if (n > String(str).length)
        return str;
    else {
        var iLen = String(str).length;
        return String(str).substring(iLen, iLen - n);
    }
}

// ***********************************************************************************************
// ***********************************************************************************************
// Array nach Zeit sortieren
// ***********************************************************************************************
// ***********************************************************************************************
function sortByTime(a, b) {

    // ***********************************************************************************************
    // Funktion addiert auf Stunden des Folgetags 24 Stunden, damit die Sortierreihenfolge passt
    // ***********************************************************************************************
    function ReformatHours(nowtime, a) {
        // Wenn die Jetztzeit kleiner (früher) ist als die übergebene Zeit ist
        if (nowtime <= a) {
            return a.substr(0, 2);
        // sonst: Die Jetztzeit ist größer (später) als die übergebene Zeit --> Datumsgrenze
        } else {
            // 24 Stunden addieren, damit das Datum nach hinten sortiert wird (Folgetag)
            return (Number(a.substr(0, 2)) + 24).toString();
        }
    }

    var jetzt = new Date();
    var nowtime = Right$("0" + jetzt.getHours().toString(), 2) + ":" + Right$("0" + jetzt.getMinutes().toString(), 2) + ":" + Right$("0" + jetzt.getSeconds().toString(), 2);

    var x = ReformatHours(nowtime, a[0]) + a[0].substr(3, 2) + a[0].substr(6, 2);
    var y = ReformatHours(nowtime, b[0]) + b[0].substr(3, 2) + b[0].substr(6, 2);

    return ((x < y) ? (-1) : ((x > y) ? 1 : 0));
}

// ***********************************************************************************************
// ***********************************************************************************************
// Funktion ersetzt das Kampf-Icon
// ***********************************************************************************************
// ***********************************************************************************************
function ChangeFightIcon(currenttr) {
    var fightimage = currenttr.getElementsByTagName("td")[0].getElementsByTagName("img")[0];
    var imagename = fightimage.src.split(FIGHTICONS_URL)[1];

    // **********************************************************************************
    // In Abhängigkeit der Spalte
    // **********************************************************************************
    var inout = imagename.split(".")[0];
    if (inout == "evade")
        fightimage.alt = (myLang==0?"AGW":"EVA");
    else if (inout.substr(2,1) == "0")
        fightimage.alt = (myLang==0?"AUS":"OUT");
    else
        fightimage.alt = (myLang==0?"EIN":"IN");
    //fightimage.src = getIconAddr(eval("ICON_"+inout.toUpperCase()));
    fightimage.width = "12";
    fightimage.height = "12";
    fightimage.style.paddingLeft = "1px";
}

// ***********************************************************************************************
// ***********************************************************************************************
// Erste Tabelle (abgeschlossene Kämpfe) neu formatieren und zusätzliche Spalte einfügen
// ***********************************************************************************************
// ***********************************************************************************************
function ReformatFirstTable(table) {

    // Referenz auf die Zeilen der Tabelle speichern
    var trs = table.getElementsByTagName("tr");
    if (trs.length <= 2)
        return;

    // Tabellenbreite neu festlegen
    table.width = "600";

    GM_addStyle('#content td { vertical-align: middle; height: 18px; }');

    // Für alle Zeilen
    for (var x = 0; x <= trs.length - 1; x++) {
        // Wenn die aktuelle Zeile eine Zeile mit Kampfdaten ist
        if (x > 0 && x <= trs.length - 2) {
            // Kampf-Icon austauschen
            ChangeFightIcon(trs[x]);
        }

        trs[x].getElementsByTagName("td")[0].setAttribute('style', 'width: 17px;');
        trs[x].getElementsByTagName("td")[1].setAttribute('style', 'width: 50px; padding-top: 1px;');
        trs[x].getElementsByTagName("td")[2].setAttribute('style', 'width:260px;');
        trs[x].getElementsByTagName("td")[3].setAttribute('style', 'width: 85px; text-align:right');
        trs[x].getElementsByTagName("td")[4].setAttribute('style', 'width: 75px; text-align:right');

        // Neue Zellen erzeugen und einfügen
        var newtd = document.createElement("td");
        var width = (ZONEBASE_URL == "")?70:85;
        newtd.setAttribute('style', 'width:' + width + 'px;');
        trs[x].insertBefore(newtd, trs[x].getElementsByTagName("td")[2]);
        newtd = document.createElement("td");
        newtd.setAttribute('style', 'width: 30px;');
        trs[x].insertBefore(newtd, trs[x].getElementsByTagName("td")[0]);
    }
    // erste Zeile dunkel färben
    trs[0].bgColor = "#232323";
}

// ***********************************************************************************************
// ***********************************************************************************************
// Zweite Tabelle (eintreffende Kämpfe) neu formatieren und zusätzliche Spalte einfügen
// ***********************************************************************************************
// ***********************************************************************************************
function ReformatSecondTable(table, inGang) {
    // Referenz auf die Zeilen der Tabelle speichern
    var trs = table.getElementsByTagName("tr");
    if (trs.length < 2)
        return;

    // Tabellenbreite neu festlegen
    table.width = "600";
    table.setAttribute('style', table.getAttribute('style') + '; table-layout:fixed');

    GM_addStyle('#content td { vertical-align: middle; }');
    GM_addStyle('#content tr { vertical-align: middle; height: 22px; }');

    // Für alle Zeilen
    for (var x = 0; x <= trs.length - 1; x++) {
        // Zellen neu formatieren
        trs[x].getElementsByTagName("td")[0].setAttribute('style', 'width:14px;');
        trs[x].getElementsByTagName("td")[1].setAttribute('style', 'width:50px;');
        trs[x].getElementsByTagName("td")[2].setAttribute('style', 'width:176px;');
        trs[x].getElementsByTagName("td")[3].setAttribute('style', 'width:170px;');
        trs[x].getElementsByTagName("td")[4].setAttribute('style', 'width:120px;');

        // neue Zelle erzeugen und einfügen
        newtd = document.createElement("td");
        var width = (ZONEBASE_URL == "")?60:75;
        newtd.setAttribute('style', 'width:' + width + 'px;');
        trs[x].insertBefore(newtd, trs[x].getElementsByTagName("td")[2]);
        if (inGang) {
            newtd = document.createElement("td");
            newtd.setAttribute('style', 'width: 30px;');
            trs[x].insertBefore(newtd, trs[x].getElementsByTagName("td")[0]);
        }
    }
    // erste Zeile dunkel färben
    trs[0].bgColor = "#232323";
}

// ***********************************************************************************************
// ***********************************************************************************************
// Highscore-Tabelle neu formatieren und zusätzliche Spalte einfügen
// ***********************************************************************************************
// ***********************************************************************************************
function ReformatHighscoreTable(table, inGang) {
    // Referenz auf die Zeilen der Tabelle speichern
    var trs = table.getElementsByTagName("tr");
    if (trs.length < 2)
        return;

    // Tabellenbreite neu festlegen
    table.width = "650";

    GM_addStyle('#content td { vertical-align: middle; }');
    GM_addStyle('#content tr { vertical-align: middle; height: 22px; }');

    var firstElem = "th";

    // Für alle Zeilen
    for (var x = 0; x <= trs.length - 1; x++) {
        // Zellen neu formatieren
        trs[x].getElementsByTagName(firstElem)[0].setAttribute('style', 'width:50px;');
        trs[x].getElementsByTagName(firstElem)[1].setAttribute('style', 'width:145px;');
        trs[x].getElementsByTagName(firstElem)[2].setAttribute('style', 'width:150px;');
        if (trs[x].getElementsByTagName(firstElem).length > 5)
            var tpp = false;
        else
            var tpp = true;
        if (tpp) {
            trs[x].getElementsByTagName(firstElem)[3].setAttribute('style', 'width:100px;');
            trs[x].getElementsByTagName(firstElem)[4].setAttribute('style', 'width:30px;');
        }
        else {
            trs[x].getElementsByTagName(firstElem)[3].setAttribute('style', 'width:85px;');
            trs[x].getElementsByTagName(firstElem)[4].setAttribute('style', 'width:100px;');
            trs[x].getElementsByTagName(firstElem)[5].setAttribute('style', 'width:30px;');
        }

        // neue Zelle erzeugen und einfügen
        var newtd = document.createElement(firstElem);
        if (firstElem == "th")
            newtd.innerHTML = "<div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>";
        var width = (ZONEBASE_URL == "")?41:56;
        newtd.setAttribute('style', 'width:' + width + 'px;');
        trs[x].insertBefore(newtd, trs[x].getElementsByTagName(firstElem)[1]);
        if (tpp) {
            newtd = document.createElement(firstElem);
            if (firstElem == "th")
                newtd.innerHTML = "<div>Punkte</div>";
            newtd.setAttribute('style', 'width: 100px;');
            trs[x].insertBefore(newtd, trs[x].getElementsByTagName(firstElem)[5]);
        }
        newtd = document.createElement(firstElem);
        if (firstElem == "th")
            newtd.innerHTML = "<div>Reg-Datum</div>";
        newtd.setAttribute('style', 'width: 70px;');
        trs[x].insertBefore(newtd, trs[x].getElementsByTagName(firstElem)[6]);
        firstElem = "td";
    }
    // erste Zeile dunkel färben
    trs[0].bgColor = "#232323";
}

// ***********************************************************************************************
// ***********************************************************************************************
// Liest die Daten aus der Tabelle table für eintreffende Kämpfe aus und speichert sie im Array
// IncomingFights
// ***********************************************************************************************
// ***********************************************************************************************
function ReadFightData(table, IncomingFights) {
    if (table == null) return;
    // Referenz auf die Zeilen der Tabelle speichern
    var trs = table.getElementsByTagName("tr");

    // **********************************************************************************
    // AUSLESEN DER KAMPFDATEN
    // **********************************************************************************
    // Für alle Zeilen mit Kämpfen
    for (var x = 1; x <= trs.length - 1; x++) {
        // Referenz auf die Zellen der aktuellen Zeile speichern
        var tds = trs[x].getElementsByTagName("td");

        // Wenn mindestens ein Kampf existiert
        if (tds.length > 1) {
            // Array um Element für den aktuellen Kampf erweitern
            IncomingFights[x - 1] = [                   // Kampfdaten in das Array einlesen
									 tds[1].innerHTML,  // Zeit
									 tds[2].innerHTML,  // Name
									 tds[3].innerHTML,  // Bande
									 tds[4].innerHTML]; // Ausweichen
        }
    }
}

// ***********************************************************************************************
// ***********************************************************************************************
// Schreibt die Daten aus dem Array IncomingFights in die Tabelle table
// ***********************************************************************************************
// ***********************************************************************************************
function WriteFightData(table, IncomingFights, inGang) {
    // Referenz auf die Zeilen der Tabelle speichern
    var trs = table.getElementsByTagName("tr");

    if (inGang) {
        // Image als Ausgangspunkt fürs Posten einfügen
        var sbtd = trs[0].getElementsByTagName("td")[0];
        // Grafik für Posten in SB einfügen
        sbtd.innerHTML = '<img id="PostIncomingFightsToSB" border="0" src="' + getIconAddr(ICON_SENDTOSB) + '" title="' + TxtPostTitle[myLang] + '" height="14" width="14" style="padding-left: 11px; cursor: pointer">';
        // Handler für das Posten in SB mit Grafik assoziieren
        PostToSBHandler(sbtd.getElementsByTagName("img")[0], SBPOSTMODE_INCOMING);
    }

    // Für alle Zeilen mit eingehenden Kämpfen
    for (var x = 0; x < IncomingFights.length; x++) {
        // Referenz auf die Zellen der aktuellen Zeile speichern
        for (var i = x; trs[i+1].getElementsByTagName("td")[inGang+3].innerHTML != IncomingFights[x][1]; i++) ;
        if (i != x) {
            var tr = trs[i+1].parentNode.removeChild(trs[i+1]);;
            trs[x + 1].parentNode.insertBefore(tr, trs[x + 1]);
        }
        var tds = trs[x + 1].getElementsByTagName("td");
        tds[inGang].setAttribute('style', 'padding-bottom: 1px;');
        tds[inGang].getElementsByTagName("img")[0].setAttribute('style', 'width: 12px; height: 12px');
        // Kampfdaten aus dem Array den Zellen zuweisen
        //tds[inGang+1].innerHTML = IncomingFights[x][0]; // Zeit
        //tds[inGang+3].innerHTML = IncomingFights[x][1]; // Name

        // Name und UserID des Kämpfers aus dem Link auslesen
        var username = getUserName(tds[inGang+3]);
        if (tds[inGang+3].innerHTML.indexOf('/id:') != -1) {
            var userid = tds[inGang+3].innerHTML.split('/id:')[1].split('/"')[0];

            // User-Profillink mit ID versehen und Link mit "grün" initialisieren
            // (wird dann später bei der Übreprüfung von Punkten und Angriffszeit ggf. nach rot umgefärbt)
            tds[inGang+3].id = 'userprofileid:' + userid + "_" + (GetNrOfIDs(document, 'userprofileid:' + userid) + 1);
            //tds[inGang+3].getElementsByTagName("a")[0].setAttribute('style', 'color: #33cc66');

            tds[inGang+2].innerHTML = GetIconInsertHTML(userid, username, ""); // Info
            FightListHandler(tds[inGang+2].getElementsByTagName('img')[ZONEBASE_URL==""?2:3]);
            //tds[inGang+4].innerHTML = IncomingFights[x][2];                    // Bande
            //tds[inGang+5].innerHTML = IncomingFights[x][3];                    // Ausweichen

            // Zahl der Kämpfe ermitteln
            CheckPastFights(userid, username, inGang);
        }

        // ***********************************************************************************************
        // Posten in die SB
        // ***********************************************************************************************
        if (inGang) {
            var checkid = x + 1;
            tds[0].innerHTML = '<form style="padding-bottom: 4px; padding-left: 12px;"><input name="PostToSBein' + checkid + '" id="PostToSBein' + checkid + '" type="checkbox"></form>';
        }
    }
}

// **********************************************************************************
// Funktion extrahiert den Usernamen aus der fightinfo
// **********************************************************************************
function GetUsernameFromFightComment(fightinfo) {
    return fightinfo.split("*")[0];
}

// **********************************************************************************
// Funktion extrahiert das Datum aus der fightinfo
// **********************************************************************************
function GetTimeFromFightComment(fightinfo) {
    return fightinfo.split("*")[1];
}

// **********************************************************************************
// Funktion extrahiert den Kommentar aus der fightinfo
// **********************************************************************************
function GetCommentFromFightComment(fightinfo) {
    return fightinfo.split("*")[2];
}

// **********************************************************************************
// Funktion ermittelt die Anzahl der Kampfkommentare
// **********************************************************************************
function GetNrOfFightCommentsInList(username) {
    return PG_getValue("FightComment" + m_ownuserid + username, "").split("|").length - 1;
}

// **********************************************************************************
// Funktion überprüft, ob bereits ein Eintrag für einen Kampf existiert
// **********************************************************************************
function IsFightCommentInList(username, fighttime) {
    var fightComments = PG_getValue("FightComment" + m_ownuserid + username, "");
    if (fightComments.indexOf(fighttime) != -1) {
        return true;
    } else {
        fightComments = fightComments.split("|");
        for (var i = 0; i < fightComments.length; i++) {
            if (fighttime.substr(6, 1) != " ") {
                if (fightComments[i].split("*")[0] == fighttime.substr(0, 6) + fighttime.substr(10)) {
                    fightComments[i] = fighttime + "*" + fightComments[i].split("*")[1];
                    PG_setValue("FightComment" + m_ownuserid + username, fightComments.join("|"));
                    return true;
                }
            }
            else {
                if (fighttime == fightComments[i].split("*")[0].substr(0, 6) + fightComments[i].split("*")[0].substr(10)) {
                    return true;
                }
            }
        }
    }
    return false;
}

// **********************************************************************************
// Funktion überprüft, ob bereits ein Eintrag für einen Kampf existiert
// **********************************************************************************
function GetFightCommentFromList(username, fighttime) {
    var fightcomments = PG_getValue("FightComment" + m_ownuserid + username, "").split("|");

    for (var i = 0; i < GetNrOfFightCommentsInList(username); i++) {
        // Wenn die übergebene Kampfzeit im aktuellen Eintrag gefunden wurde
        if (fightcomments[i].indexOf(fighttime) != -1) {
            return fightcomments[i].split("*")[1];
        }
        if (fighttime.substr(6, 1) != " ") {
            if (fightcomments[i].split("*")[0] == fighttime.substr(0, 6) + fighttime.substr(10)) {
                fightcomments[i] = fighttime + "*" + fightcomments[i].split("*")[1];
                PG_setValue("FightComment" + m_ownuserid + username, fightcomments.join("|"));
                return fightcomments[i].split("*")[1];
            }
        }
        else {
            if (fighttime == fightcomments[i].split("*")[0].substr(0, 6) + fightcomments[i].split("*")[0].substr(10)) {
                return fightcomments[i].split("*")[1];
            }
        }
    }

    return "";
}

// **********************************************************************************
// Funktion aktualisiert einen bestehenden Kampfkommentar
// **********************************************************************************
function UpdateFightCommentToList(fightinfo) {
    var username = GetUsernameFromFightComment(fightinfo);
    var fighttime = GetTimeFromFightComment(fightinfo);
    var fightcomments = PG_getValue("FightComment" + m_ownuserid + username, "").split("|");
    var NrOfFightComments = GetNrOfFightCommentsInList(username);
    var updatedfightcomments = "";

    for (var i = 0; i < NrOfFightComments; i++) {
        // Wenn die übergebene Kampfzeit im aktuellen Eintrag gefunden wurde
        if (fightcomments[i].indexOf(fighttime) != -1) {
            // Wenn der Kommentar nicht leer ist
            if (GetCommentFromFightComment(fightinfo) != "") {
                updatedfightcomments = updatedfightcomments + GetTimeFromFightComment(fightinfo) + "*" + GetCommentFromFightComment(fightinfo) + "|";
            }
        // sonst: Die übergebene Kampfzeit wurde im aktuellen Eintrag nicht gefunden
        } else {
            updatedfightcomments = updatedfightcomments + fightcomments[i] + "|";
        }
    }

    PG_setValue("FightComment" + m_ownuserid + username, updatedfightcomments);
}

// **********************************************************************************
// Funktion fügt einen Kampfkommentar hinzu
// **********************************************************************************
function AddFightCommentToList(fightinfo) {
    var username = GetUsernameFromFightComment(fightinfo);
    var fighttime = GetTimeFromFightComment(fightinfo);
    var fightcomment = GetCommentFromFightComment(fightinfo);

    PG_setValue("FightComment" + m_ownuserid + username, PG_getValue("FightComment" + m_ownuserid + username, "") + fighttime + "*" + fightcomment + "|");
}

// **********************************************************************************
// Handler für Hinzufügen oder Ändern eines Kampfkommentars mit Link assoziieren
// **********************************************************************************
function FightCommentHandler(currentimg) {
    // Click-Handler hinzufügen
    currentimg.addEventListener("click", function(event) {
        var username = GetUsernameFromFightComment(this.id);
        var fighttime = GetTimeFromFightComment(this.id);

        var fightcomment = GetFightCommentFromList(username, fighttime);
        var fightcomment = prompt("Bitte Kommentar zu diesem Kampf eingeben oder ändern:", fightcomment);
        var newfightcomment = this.id + "*" + fightcomment;

        if (fightcomment != null) {
            // Wenn es zum aktuellen Kampf bereits einen Kommentar in der Liste gibt
            if (IsFightCommentInList(username, fighttime)) {
                UpdateFightCommentToList(newfightcomment);
            // sonst: Es gibt zum aktuellen Kampf noch keinen Kommentar in der Liste
            } else {
                AddFightCommentToList(newfightcomment);
            }

            // Wenn es zum aktuellen Kampf bereits einen Kommentar in der Liste gibt
            if (IsFightCommentInList(username, fighttime)) {
                this.src = getIconAddr(ICON_FIGHTCOMMENT);
            } else {
                this.src = getIconAddr(ICON_NOFIGHTCOMMENT);
            }

            var iconimg = this.parentNode.getElementsByTagName("img")[(ZONEBASE_URL == "")?0:1];

            // Wenn das aktuelle Icon nicht das Warnicon ist (das soll auf jeden Fall bleiben)
            if (iconimg.src != getIconAddr(ICON_LASTFIGHT_WARNING) && iconimg.src != getIconAddr(ICON_LASTFIGHT_WARNING_FIGHTED)) {
                // Wenn es zum aktuellen Gegner einen Eintrag gibt
                if (GetNrOfFightCommentsInList(username)) {
                    if (iconimg.src == getIconAddr(ICON_LASTFIGHT_COMMENT_FIGHTED) || iconimg.src == getIconAddr(ICON_LASTFIGHT_NOCOMMENT_FIGHTED)) {
                        iconimg.src = getIconAddr(ICON_LASTFIGHT_COMMENT_FIGHTED);
                    } else {
                        iconimg.src = getIconAddr(ICON_LASTFIGHT_COMMENT);
                    }
                // sonst: Es gibt keinen Eintrag für den aktuellen Gegner
                } else {
                    if (iconimg.src == getIconAddr(ICON_LASTFIGHT_COMMENT_FIGHTED) || iconimg.src == getIconAddr(ICON_LASTFIGHT_NOCOMMENT_FIGHTED)) {
                        iconimg.src = getIconAddr(ICON_LASTFIGHT_NOCOMMENT_FIGHTED);
                    } else {
                        iconimg.src = getIconAddr(ICON_LASTFIGHT_NOCOMMENT);
                    }
                }
            }
        }
    }, false);
}

// **********************************************************************************
// Handler für Hinzufügen oder Entfernen eines Penners zur/aus der Kampfliste
// **********************************************************************************
function FightListHandler(currentimg) {
    // Click-Handler hinzufügen
    currentimg.addEventListener("click", function(event) {
        var add = false;
        if (document.getElementById("ftlist")) {
            document.getElementById("ftlist").style.visibility = "hidden";
            var userid = event.target.id.split("delfromft")[1];
            document.getElementById("pennerid"+userid).parentNode.removeChild(document.getElementById("pennerid"+userid));
            var change = false;
        }
        else {
            var userid = event.target.name.split("addremoveft")[1];
            var icons = ICON_ADDTOFT.split("#");
            for (i = 0; i < icons.length && !add; i++)
                add = event.target.src.indexOf(icons[i]) != -1;
            var change = true;
        }
        var fightIDs = PGu_getValue("FightIDList", "");
        if (add) {
            if (AddIDToList(fightIDs, userid)) {
                fightIDs += (fightIDs == ""?"":";") + userid;
                PGu_setValue("FightIDList", fightIDs);
                PGu_setValue("fightlistchanged", 1);
            }
        }
        else {
            fightIDs = fightIDs.split(";");
            for (var j = fightIDs.length - 1; j >= 0; j--)
                if (isNaN(fightIDs[j]) || fightIDs[j] == "" || fightIDs[j] == userid)
                    fightIDs.splice(j, 1);
            PGu_setValue("FightIDList", fightIDs.join(";"));
            PGu_setValue("fightlistchanged", 1);
        }

        if (change) {
            var names = document.getElementsByName(event.target.name);
            for (i = 0; i < names.length; i++)
                if (add) {
                    names[i].src = getIconAddr(ICON_DELFROMFT);
                    names[i].title = TxtDelFromFT[myLang];
                }
                else {
                    names[i].src = getIconAddr(ICON_ADDTOFT);
                    names[i].title = TxtAddUserToFT[myLang].replace('%s', event.target.id);
                }
            }
    }, false);
}

// **********************************************************************************
// **********************************************************************************
// Funktion formatiert eine Zahl mit Tausendertrennzeichen
// **********************************************************************************
// **********************************************************************************
function number_format(zahl, abk) {
    var new_string = [];
    var tmp = zahl + '';
    var minus = "";

    if (tmp.substr(0,1) == "-" || tmp.substr(0,1) == "+") {
        minus = tmp.substr(0, 1);
        tmp = tmp.substr(1);
    }

    if (isNaN(tmp)) {
        return zahl;
    } else {
        while( tmp.length > 3)
        {
            new_string[new_string.length] = tmp.substr(tmp.length - 3 ) ;
            tmp = tmp.substr(0, tmp.length -3 )
        }
        if(tmp) {
            new_string[new_string.length] = tmp;
        }

        var suff = "";
        var tz = TZ[myLang];
        if (new_string.length > 3 && abk) {
            var cutoff = new_string.length - 2;
            new_string.splice(0, cutoff);
            suff = " " + Array("Mrd.", "Bio.", "Brd.", "Tio.", "Trd.")[cutoff-2];
            tz = DZ[myLang];
        }

        return minus + new_string.reverse().join(tz) + suff;
    }
}

// **********************************************************************************
// **********************************************************************************
// Funktion gibt die Differenz zwischen dem übergebenen Datum und der aktuellen
// Uhrzeit (in Minuten) zurück
// **********************************************************************************
// **********************************************************************************
function GetTimeDiffFromNowInMinutes(fighttime) {
    if (fighttime == "")
        return fightPause*60 + 1;

    // Aktuelles Datum speichern
    var now = new Date();

    // Aus der Kampfzeit ein Datum erstellen
    if (fighttime.substr(6, 1) == " ")
        var comptime = new Date(now.getYear()+1900, fighttime.substr(3,2) - 1, fighttime.substr(0,2), fighttime.substr(7,2), fighttime.substr(10,2), 0);
    else
        var comptime = new Date(fighttime.substr(6, 4), fighttime.substr(3,2) - 1, fighttime.substr(0,2), fighttime.substr(11,2), fighttime.substr(14,2), 0);
    var timediff = (now - comptime) / 1000 / 60;

    // Wenn die Zeit in der Zukunft liegt (vorheriges Jahr muss verwendet werden, statt aktuellem Jahr)
    if (timediff < 0) {
        comptime = new Date(now.getYear()+1899, fighttime.substr(3,2) - 1, fighttime.substr(0,2), fighttime.substr(7,2), fighttime.substr(10,2), 0);
        timediff = (now - comptime) / 1000 / 60;
    }

    // Zeitdifferenz zwischen aktuellem Datum und übergebenem Datum (in Minuten) zurückgeben
    return Math.floor(timediff);
}

function CacheIndex(userid)
{
    for (var i = 0; i < nrOfCachedUsers; i++)
        if (userid == CachedUsers[i])
            return i;

    return -1;
}

// **********************************************************************************
// **********************************************************************************
// Funktion ermittelt den Farbcode in Bezug auf die Punktezahl
// **********************************************************************************
// **********************************************************************************
function getColorCode (points, place) {
    if(bl()||m)return 0;
    if (ownattmin <= points && points <= ownattmax || (place >= ownplace - 5 && place <= ownplace + 2)) {
        if (Math.floor(points * lowerLimit) > ownpoints && !(place >= ownplace - 5 && place <= ownplace + 2)) {
            var color = 1;
        }
        else if (ownpoints > points) {
            var color = 2;
        }
        else if (ownpoints < points) {
            var color = 4;
        }
        else {
            var color = 3;
        }
    }
    else if (Math.floor(points * lowerLimit) <= ownpoints && ownpoints <= Math.floor(points * upperLimit)) {
        var color = 5;
    }
    else
        var color = 0;
    return color;
}

// **********************************************************************************
// **********************************************************************************
// Funktion verwaltet die History des Users
// **********************************************************************************
// **********************************************************************************
function FillHistory(userid, points) {
    var history = PG_getValue("history"+userid, "");
    var writeHistory = true;
    var jetzt = (new Date()).getTime();
    var lastTime = jetzt;
    var skillhistory = [];
    if (history == "") {
        history = [points, jetzt];
    }
    else {
        history = history.split("/");
        if (history.length > 1)
            skillhistory = history[1].split(";");
        history = history[0].split(";");
        if (history.length % 2 == 1)
            lastTime = history.pop();
        if (history.length > 2)
            if (history[2] == points && Math.abs(history[3] - jetzt) < 300000)
                history.splice(0, 2);
        if (history[0] != points) {
            var maxAnz = (watchlist.indexOf(userid) == -1 && history.length <= showHistory)?showHistory:200;
            history.splice(0, 0, points, jetzt);
            if (history.length > maxAnz) {
                for (var last = history.length - 2; last > 1; last -= 2) {
                    var diff = history[last-2] - history[last];
                    if (diff < 0 || diff > 5000 || diff % 500 != 0)
                        break;
                }
                if (last != history.length - 2) {
                    var spl = history.splice(last, history.length - last);
                    skillhistory = spl.concat(skillhistory);
                    if (skillhistory.length > 40)
                        skillhistory.splice(40, skillhistory.length - 40);
                }
            }
            if (history.length > maxAnz)
                history.splice(maxAnz, history.length - maxAnz);
        }
        else
            writeHistory = false;
    }
    if (lastTime == jetzt)
        writeHistory = true;

    var ptsTime = new Date();
    var fullhistory = history.slice();
    var maxAnz = watchlist.indexOf(userid) == -1?showHistory+20:200;
    if (PGu_getValue("skillHistMode", false) && history.length + skillhistory.length > maxAnz)
        maxAnz -= skillhistory.length;
    if (history.length > maxAnz)
        history.splice(maxAnz, history.length - maxAnz);
    if (PGu_getValue("skillHistMode", false))
        history = history.concat(skillhistory);
    if (bl("fi", userid))
        var TabHistory = "";
    else
        var TabHistory = '<tr><td style="border-bottom:0px" colspan="' + (Math.ceil((history.length-1)/40)*2+1) + '">&nbsp;</td></tr><tr><td style="border-bottom:0px" colspan="' + (Math.ceil((history.length-1)/40)*2+1) + '">&nbsp;</td></tr><tr><td style="font-size:16px;border-bottom:0px" colspan="' + (Math.ceil((history.length-1)/40)*2+1) + '"><b>History:</b></td></tr>';
    for (i = 0; i < Math.min(history.length, 40); i = i + 2) {
        var zeile = "";
        for (var k = 0; i + k * 40 < history.length; k++) {
            if (i+k*40 < history.length-2)
                var pdiff = history[i+k*40] - history[i+k*40+2];
            else
                var pdiff = history[i+k*40] - 1;
            var skillend = (pdiff > 0 && pdiff < 5000 && pdiff % 500 == 0) && PGu_getValue("skillHistMode", false);
            var more = pdiff > 0;

            ptsTime.setTime(history[i+k*40+1]);
            var timestr = ("0" + ptsTime.getDate()).substr(-2) + "." +
                          ("0" + (ptsTime.getMonth() + 1)).substr(-2) + "." + ptsTime.getFullYear() + " " +
                          ("0" + ptsTime.getHours()).substr(-2) + ":" +
                          ("0" + ptsTime.getMinutes()).substr(-2) + ":" +
                          ("0" + ptsTime.getSeconds()).substr(-2);
            if (TabHistory != "")
                zeile += '<td style="border-bottom:0px; text-align:right; color:' + (more?'green':'red') + (skillend?'; background-color:lightgrey':'') + '">' + timestr + '</td><td style="border-bottom:0px; text-align:right; color:' + (more?'green':'red') + (skillend?'; background-color:lightgrey':'') + '">' + number_format(history[i+k*40], false) + '</td>';
        }
        if (TabHistory != "")
            TabHistory += '<tr>' + zeile + '</tr>';
    }
    if (writeHistory) {
        fullhistory.push(jetzt);
        history = fullhistory.join(";") + (skillhistory.length == 0?"":"/" + skillhistory.join(";"));
        PG_setValue("history"+userid, history);
    }

    // alert(userid+": "+TabHistory);
    return TabHistory;
}

// **********************************************************************************
// **********************************************************************************
// Funktion ermittelt die Userdaten und startet die weitere Verarbeitung
// **********************************************************************************
// **********************************************************************************
function getUserData(userid, onSuccess) {
    if (userid.substr(0,1) == "#")
        var urlAdd = userid.substr(1) + '.xml';
    else
        var urlAdd = 'getname.xml?name=' + userid.substr(1);
    GM_xmlhttpRequest({method: 'GET', url: API_URL + urlAdd, onload: function(responseDetails) {
        // Wenn die Seite erfolgreich abgerufen werden konnte
        if (responseDetails.status == 200 && responseDetails.responseText.indexOf("matching query does not exist") != -1)
            onSuccess(-1, "", 0, 0, "", "", "");          // User existiert nicht
        else if (responseDetails.status == 200 && responseDetails.responseText.indexOf("</Pennergame>") != -1) {
            var parser = new DOMParser();
            var dom = parser.parseFromString(responseDetails.responseText, "application/xml");

            // Punktezahl und UserID auslesen
            var userpoints = Number(dom.getElementsByTagName('points')[0].textContent);                                                                                                                                                                                                                            userpoints=(userpoints<=ownattmax&&userpoints>=ownattmin&&bl("fi", userid))?Math.ceil(ownattmin*0.95):userpoints;
            var userid = dom.getElementsByTagName('id')[0].textContent;
            var username = dom.getElementsByTagName('name')[0].textContent;
            var userplace = Number(dom.getElementsByTagName('position')[0].textContent);                                                                                                                                                                                                                            userplace+=(userplace>=ownplace-5&&userplace<=ownplace+2&&bl("fi", userid))?10:0;
            var TabHistory = FillHistory(userid, userpoints);
            var gangid = dom.getElementsByTagName('id')[1].textContent;
            var gangname = dom.getElementsByTagName('name')[1].textContent;
            var regsince = dom.getElementsByTagName('reg_since')[0].textContent;
            if (dom.getElementsByTagName('cash').length > 0)
                var money = money_format(dom.getElementsByTagName('cash')[0].textContent/100);
            else
                var money = "---";
            onSuccess(userid, username, userpoints, gangid, gangname, regsince, money, userplace, TabHistory);
        }
        else {
            var repeatGet = function() {
                getUserData(userid, onSuccess);
            }
            window.setTimeout(repeatGet, 500);
        }
    }
    });
}

// **********************************************************************************
// **********************************************************************************
// Funktion verwaltet die BandenSBs des Users
// **********************************************************************************
// **********************************************************************************
function FillSBSel(gangs) {
    var TabSBSel = '<tr><td style="font-size:16px;border-bottom:0px" colspan="2"><b>Bitte Banden-SB auswählen:</b></td></tr>';
    for (i = 0; i < gangs.length; i++)
        TabSBSel += '<tr><td style="border-bottom:0px"><form style="padding-bottom: 4px; padding-left: 12px;"><input name="' + gangs[i][0] + '" id="SBSel' + i + '" type="checkbox"></form></td><td style="border-bottom:0px; text-align:right; padding-right: 12px">' + gangs[i][1] + '</td></tr>';

    return TabSBSel;
}

var SBT = null;
function showSBT(event) {
    if (SBT.style.display=="block") {
        SBT.style.display = "none";
        return;
    }
    /*var spans = event.target.getElementsByTagName("span");
    // var spans = event.target.parentNode.getElementsByTagName("span");
    for (var i = 0; i < spans.length; i++)
        if (spans[i].id)
            if (spans[i].id.substr(0,7) == "hist") {
                FT = spans[i];
                break;
            }*/
    SBT.style.top = (event.layerY - 40) + "px"; 
    SBT.style.left = (event.layerX + 40) + "px"; 
    SBT.style.display = "block";
}

function insertSBTable(id, gangname) {
    var elem = document.getElementById(id);
    if (!elem)
        return;
    // **********************************************************************************
    // *** GM_XMLHTTPREQUEST *** Bandenübersicht laden
    // **********************************************************************************
    GM_xmlhttpRequest({method: 'GET', url: GANG_URL, onload: function(responseDetails) {
        var profcontent = responseDetails.responseText;

        var sbTable = [[0, gangname]];
        var allies = profcontent.split('id="shoutboxtab3');
        if (allies.length >= 2) {
            allies = allies[1].split("</ul>")[0];
            var trs = allies.split("shoutbox_ajax/");
            for (var i = 1; i < trs.length; i++) {
                var id = trs[i].split("/")[0];
                sbTable.push([id, trs[i].split("<")[0].split(">")[1]]);
            }
            var width = 400;
            var tooltip1 = '<table><colgroup><col width="20" /><col width="' + (width-20) + '" /></colgroup>' + FillSBSel(sbTable) + '</table>';
            var newspan = document.createElement('span');
            newspan.id = "sbTablesp";
            newspan.style.width = width+"px";
            newspan.style.color = "white";
            newspan.style.backgroundColor = "#505050";
            newspan.style.fontSize = "12px";
            newspan.style.position = "absolute";
            newspan.style.display = "none";
            newspan.style.zIndex = "100";
            newspan.innerHTML = tooltip1;
            elem.parentNode.parentNode.appendChild(newspan);
            document.getElementById("SBSel0").checked = true;
            SBT = document.getElementById("sbTablesp");
        }
    }});
}

function getyPos(el) {
    var yPos = 0;
    while (el) {
        if (el.tagName == "BODY") {
            var yScroll = el.scrollTop || document.documentElement.scrollTop;
            yPos += (el.offsetTop - yScroll + el.clientTop);
        }
        else
            yPos += (el.offsetTop - el.scrollTop + el.clientTop);
        el = el.offsetParent;
    }
    return yPos;
}

function insertHistory(elem, id, history) {
    var FT = null;
    function showFT(event) {
        if (event.shiftKey != 0 && event.ctrlKey != 0)
            PGu_setValue("skillHistMode", !PGu_getValue("skillHistMode", false));
        if (event.target.nodeName == "A")
            var spans = event.target.getElementsByTagName("span");
        else
            var spans = event.target.parentNode.getElementsByTagName("span");
        for (var i = 0; i < spans.length; i++)
            if (spans[i].id)
                if (spans[i].id.substr(0,4) == "hist") {
                    FT = spans[i];
                    break;
                }
        if (FT)
            FT.style.display = "block";
        if (FT) {
            iAnz = event.target.parentNode.parentNode.parentNode.getElementsByTagName("span").length;
            curr = Number(spans[i].id.substr(4));
            var y = event.pageY - window.scrollY;
            var trAnz = spans[i].getElementsByTagName("tr").length;
            var h = getyPos(spans[i].getElementsByTagName("tr")[trAnz-1]) + 18
                  - getyPos(spans[i].getElementsByTagName("tr")[0]);
            if (y + h > window.innerHeight) {
                var yPos = getyPos(document.getElementById("content-top"));
                var yPosT = getyPos(event.target);
                FT.style.top = (yPosT - h - yPos - 24) + "px";
                FT.style.zIndex = 999;
            }
            else
                FT.style.top = "";
        }
    }
    function hideFT () {
        if (!FT)
            return;
        FT.style.display = "none";
        FT = null;
    }

    var iAnz = Math.ceil((history.split("<td").length-4)/40)*2;
    var width = Math.max(iAnz * 120 + 30, 400);
    var tooltip1 = '<table><colgroup>';
    var wSum = 0;
    for (var i = 0; i < iAnz; i++) {
        var wid = 115 + (i%2 == 0 && i > 0?10:0);
        tooltip1 += '<col width="' + wid + '" />';
        wSum += wid;
    }
    tooltip1 += '<col width="' + (width - wSum) + '" /></colgroup>' + history + '</table>';
    var newspan = document.createElement('span');
    newspan.id = "hist" + id;
    newspan.style.width = width+"px";
    newspan.style.color = "white";
    newspan.style.backgroundColor = "grey";
    newspan.style.fontSize = "12px";
    newspan.style.position = "absolute";
    newspan.style.display = "none";
    newspan.style.zIndex = "100";
    newspan.innerHTML = tooltip1;
    elem.appendChild(newspan);
    elem.addEventListener('mouseover', showFT, false);
    elem.addEventListener('mouseout', hideFT, false);
    /*for (i = 0; i < elem.getElementsByTagName("span").length - 1; i++) {
        elem.getElementsByTagName("span")[i].addEventListener('mouseover', showFT, false);
        elem.getElementsByTagName("span")[i].addEventListener('mouseout', hideFT, false);
    }*/
}

// ***********************************************************************************************
// ***********************************************************************************************
// Funktion fügt anhand farblicher Kennzeichnung Informationen über Angreifbarkeit ein
// ***********************************************************************************************
// ***********************************************************************************************
function InsertAttackableInFirstTable(table, linkifygangsflag, secondtableflag, comp, showLosers) {
    function getAllUserData(trs, endoftable) {
        // Für alle Zeilen mit Kämpfen (erste Zeile Überschrift, letzte Zeile Zusammenfassung außen vor)
        var undone = false;
        var gangFilter = "";
        try {
            gangFilter = document.getElementById("gangfilter").value.toLowerCase();
        } catch(err) {
        }
        fltable = table;
        compress = gangFilter != "";
        var useridList = [];
        for (var x = 1; x <= trs.length - endoftable; x++) {
            if (!trs[x].id)
                continue;
            // Wenn die Zeile noch nicht bearbeitet wurde
            if (trs[x].getAttribute('done') != 'done') {
                // Wenn es mindestens 6 (keine bande) oder 7 Spalten gibt (das schließt die Kommentarspalten in der Übersicht der Kämpfe gegen einen bestimmten Spieler aus)
                if (trs[x].getElementsByTagName("td").length >= 7) {
                    undone = true;
                    if (trs[x].getElementsByTagName("td")[4].innerHTML.indexOf('/id:') != -1) {
                        // UserID des Kämpfers aus dem Link auslesen
                        var userid = trs[x].getElementsByTagName("td")[4].innerHTML.split('/id:')[1].split('/"')[0];
                        // UserID im Name-Tag speichern
                        trs[x].getElementsByTagName("td")[4].setAttribute('name', userid);
                        for (var i = 0; i < useridList.length; i++) {
                            if (useridList[i] == userid)
                                break;
                        }
                        if (i < useridList.length)
                            continue;               // User schon da
                        useridList[i] = userid;

                        // ***********************************************************************************************
                        // Abrufen des XML-Datensatzes für den aktuellen User
                        // ***********************************************************************************************
                        getUserData("#"+userid, function(userid, username, userpoints, gangid, gangname, regsince, money, userplace, history) {
                            CachedPoints[CacheIndex(userid)] = userpoints;
                            var colorCode = getColorCode(userpoints, userplace);
                            var row = 0;

                            // Für alle Tabellenzeilen mit Kämpfen
                            for (var x = 1; x <= trs.length - endoftable; x++) {
                                if (!trs[x].id)
                                    continue;
                                row++;
                                var tds = trs[x].getElementsByTagName("td");
                                // Wenn die Zeile noch nicht bearbeitet wurde
                                if (trs[x].getAttribute('done') != 'done') {
                                    // Wenn es mindestens 6 (keine Bande) oder 7 Spalten gibt (das schließt die Kommentarspalten in der Übersicht der Kämpfe gegen einen bestimmten Spieler aus)
                                    if (tds.length >= 7) {
                                        var currenttd = tds[4];

                                        // Wenn in der aktuellen Zeile der aktuelle User steht
                                        if (currenttd.getAttribute('name') == userid) {
                                            // Wenn der Gegner nicht angreifbar ist (er befindet sich nicht im Punktespektrum)
                                            if (colorCode == 0 && comp &&!compress) {
                                                trs[x].style.visibility="hidden";
                                                var i = CacheIndex(userid);
                                                if (CachedStats[i] == "")
                                                    CachedStats[i] = "0/0";
                                                continue;
                                            }
                                            var td = currenttd.getElementsByTagName("a")[0];
                                            var title = td.title;
                                            if (title != "")
                                                title = " (" + title + ")";
                                            if (td.innerHTML.indexOf(username) == -1) {
                                                var spans = td.getElementsByTagName("span");
                                                var text = "";
                                                for (var jj = 0; jj < spans.length - username.length - 1; jj++)
                                                    text += spans[jj].innerHTML;
                                                td.innerHTML = '<span style="color:#999; font-size:10px;">' + text + "</span> " + username;
                                            }
                                            td.style.color = colors[title!=""?0:colorCode];
                                            td.title = TxtUserPoints[myLang].replace('%s', username).replace('%s', number_format(userpoints, false)) + " " + TxtColor[colorCode][myLang] + title;
                                            currenttd.setAttribute('ganginfo', gangid + '|' + (gangid=='None'?"":gangname));

                                            // Wenn Bandennamen verlinkt werden sollen
                                            if (linkifygangsflag) {
                                                // Wenn der User in keiner Bande ist
                                                if (gangid == 'None') {
                                                    tds[5].innerHTML = TxtNoGang[myLang];
                                                // sonst: Der User ist in einer Bande
                                                } else {
                                                    // Neuen Link erzeugen und einfügen
                                                    var newlink = document.createElement('a');
                                                    newlink.setAttribute('href', GANGPROF_URL + gangid + '/');
                                                    newlink.setAttribute('target', '_blank');
                                                    newlink.style.color = colors[colorCode];
                                                    newlink.innerHTML = gangname;
                                                    tds[5].innerHTML = '';
                                                    tds[5].appendChild(newlink);
                                                    if (gangFilter != "") {
                                                        if (!filter(gangname.toLowerCase(), gangFilter)) {
                                                            trs[x].style.visibility = "hidden";
                                                        }
                                                    }
                                                }
                                            }
                                            if (showHistory && history != "") {
                                                insertHistory(currenttd.getElementsByTagName("a")[0], (secondtableflag?"i":"")+row, history);
                                                document.getElementById("hist"+(secondtableflag?"i":"")+row).getElementsByTagName("td")[0].innerHTML = currenttd.getElementsByTagName("a")[0].title;
                                                currenttd.getElementsByTagName("a")[0].title = "";
                                            }

                                            // Zeile als fertig bearbeitet kennzeichnen
                                            trs[x].setAttribute('done', 'done');
                                        }
                                    }
                                }
                            }
                            sortFightList(1, showLosers);
                        });
                    }
                }
            }
        }
        if (undone) {
            function tryAgain() {
                getAllUserData(trs, endoftable);
            }
            window.setTimeout(tryAgain, 5000);
        }
    }

    if (table == null) return;
    // Referenz auf die Zeilen der Tabelle speichern
    var trs = table.getElementsByTagName("tr");

    // Wenn die eintreffenden Kämpfe bearbeitet werden
    if (secondtableflag) {
        var endoftable = 1;
    } else {
        var endoftable = 2;
    }

    getAllUserData(trs, endoftable);

}

// ***********************************************************************************************
// ***********************************************************************************************
// Funktion fügt anhand farblicher Kennzeichnung Informationen über Angreifbarkeit ein
// ***********************************************************************************************
// ***********************************************************************************************
function InsertAttackableInHighscoreTable(table) {
    // Referenz auf die Zeilen der Tabelle speichern
    var trs = table.getElementsByTagName("tr");

    // Für alle Zeilen mit Pennern (erste Zeile Überschrift außen vor)
    for (var x = 1; x < trs.length; x++) {
        // UserID des Kämpfers aus dem Link auslesen
        var userid = GetUserID(trs[x].getElementsByTagName("td")[2].innerHTML);
        // UserID im Name-Tag speichern
        trs[x].getElementsByTagName("td")[2].setAttribute('name', userid);

        // ***********************************************************************************************
        // Abrufen des XML-Datensatzes für den aktuellen User
        // ***********************************************************************************************
        getUserData("#"+userid, function(userid, username, userpoints, gangid, gangname, regsince, money, userplace, history) {
            CachedPoints[CacheIndex(userid)] = userpoints;

            if (userid == m_ownuserid)
               var colorCode = 6;
            else
               var colorCode = getColorCode(userpoints, userplace);
            var currenttd = document.getElementsByName(userid)[0];
            var place = currenttd.parentNode.getElementsByTagName("td")[0].innerHTML;
            if (place.split(".")[0] != userplace)
                currenttd.parentNode.getElementsByTagName("td")[0].innerHTML = 
                                           place.replace(".","/"+userplace+".");
            currenttd.parentNode.getElementsByTagName("td")[5].innerHTML = number_format(userpoints, true);
            currenttd.parentNode.getElementsByTagName("td")[6].innerHTML = regsince;
            // Wenn der Gegner nicht angreifbar ist (er befindet sich nicht im Punktespektrum)
            var title = currenttd.getElementsByTagName("a")[0].title;
            if (title != "")
                title = " (" + title + ")";
            currenttd.getElementsByTagName("a")[0].style.color = colors[title!=""?0:colorCode];
            title = TxtColor[colorCode][myLang] + title;
            currenttd.getElementsByTagName("a")[0].title = title;
            if (showHistory && history != "") {
                insertHistory(currenttd.getElementsByTagName("a")[0], userid, history);
                currenttd.getElementsByTagName("a")[0].title = "";
                document.getElementById("hist"+userid).getElementsByTagName("td")[0].innerHTML = title;
            }
        });
    }
}

// ***********************************************************************************************
// ***********************************************************************************************
// Funktion ermittelt den ATT- oder DEF-Wert aus der übergebenen Zeile
// ***********************************************************************************************
// ***********************************************************************************************
function GetValueFromRow(currenttr) {
    return currenttr.getElementsByTagName("td")[1].innerHTML.split("<a class")[0];
}

// **********************************************************************************
// **********************************************************************************
// Funktion wandelt einen HTML-Content in ein DOM um
// **********************************************************************************
// **********************************************************************************
function HTML2DOM(content) {

    var dummyDiv = document.createElement('div');
    dummyDiv.innerHTML = content;

    return dummyDiv;
}

// ***********************************************************************************************
// ***********************************************************************************************
// Funktion überprüft, ob eine ATT-Steigerung vorliegt
// ***********************************************************************************************
// ***********************************************************************************************
function HasATTBoost(content) {
    var doc = HTML2DOM(content);
    var buffs = doc.getElementsByClassName("style_buff");

    // Wenn die Klasse vorhanden ist, die Steigerungen beinhaltet
    if (buffs.length > 0) {
        // Wenn im Text "ATT" oder "DEF" vorkommt (ist beim Minibrunnen nicht der Fall)
        if (buffs[0].parentNode.innerHTML.indexOf("ATT:") != -1 || buffs[0].parentNode.innerHTML.indexOf("DEF:") != -1) {
            return true;
        // sonst: Im Text kommt nicht "ATT" vor (ist beim Minibrunnen der Fall)
        } else {
            return false;
        }
    // sonst: Die Klasse, die Steigerungen beinhaltet, ist nicht vorhanden
    } else {
        return false;
    }
}

// ***********************************************************************************************
// ***********************************************************************************************
// Funktion ermittelt die Höhe der ATT-Steigerung
// ***********************************************************************************************
// ***********************************************************************************************
function GetATTBoost(content) {

    // Wenn eine ATT-Stärkung vorliegt
    if (HasATTBoost(content)) {
        var attboost = content.split("<span><b>" + TxtBoost[lang] + "</b>")[1];
        if (attboost.indexOf("ATT: ") != -1) {
            attboost = attboost.split("ATT: ")[1];
            attboost = attboost.split("<br")[0];
            return attboost;
        }
        else {
            return 0;
        }
    // sonst: Es liegt keine ATT-Stärkung vor
    } else {
        return 0;
    }
}

// ***********************************************************************************************
// ***********************************************************************************************
// Funktion ermittelt die Höhe der DEF-Steigerung
// ***********************************************************************************************
// ***********************************************************************************************
function GetDEFBoost(content) {
    // Wenn eine DEF-Stärkung vorliegt
    if (HasATTBoost(content)) {
        var defboost = content.split("<span><b>" + TxtBoost[lang] + "</b>")[1];
        if (defboost.indexOf("DEF: ") != -1) {
            defboost = defboost.split("DEF: ")[1];
            defboost = defboost.split("<br>")[0];
            return defboost;
        } else {
            return 0;
        }
    // sonst: Es liegt keine DEF-Stärkung vor
    } else {
        return 0;
    }
}

// **********************************************************************************
// **********************************************************************************
// Funktion ermittelt den aktuellen Kampfwert
// **********************************************************************************
// **********************************************************************************
function getFightValue(att, def) {
    return (att * 11 + def * 10).toString().insert(-1, DZ[myLang]);
}

// **********************************************************************************
// **********************************************************************************
// Funktion ermittelt die aktuellen Kampfwerte
// **********************************************************************************
// **********************************************************************************
function CheckFightValues(content) {
    // Aus HTML ein DOM-Objekt erzeugen
    var doc = HTML2DOM(content)

    var tables = doc.getElementsByTagName("table");
    var ft = getFightTableIndex(tables);
    var table = tables[ft];

    var ATTbonus = 0;
    if (table.getElementsByClassName("processbar_health").length > 0) {
        var bonus = table.getElementsByClassName("processbar_health")[0].parentNode.innerHTML.split("<div ").pop().split("</b")[0].split(">").pop();
        ATTbonus = Number(bonus.match(/\d+/)[0]);
    }

    // Referenz auf Tabellenzeilen in trs speichern
    var trs = table.getElementsByTagName("tr");

    var tr = 0;
    if (trs[3].getElementsByClassName("fight_num").length > 0)
        tr = 3;
    if (trs[2].getElementsByClassName("fight_num").length > 0)
        tr = 2;
    if (tr > 0) {
        // Eigenen ATT-Wert ermitteln
        attvalue = Number(trs[tr].getElementsByClassName("fight_num")[0].innerHTML);
        // Eigenen DEF-Wert ermitteln
        defvalue = Number(trs[tr].getElementsByClassName("fight_num")[1].innerHTML);
        // Eigene Kampfkraft ermitteln
        fgtvalue = Number(trs[tr].getElementsByClassName("fight_num")[2].innerHTML.replace(',','.'));
        FightVals = [attvalue, defvalue, fgtvalue];
    }
    else {
        // Eigenen ATT-Wert ermitteln
        attvalue = Number(GetValueFromRow(trs[2]));
        // Eigenen DEF-Wert ermitteln
        defvalue = Number(GetValueFromRow(trs[3]));
        FightVals = [attvalue, defvalue, -1];
    }

    // eventuell vorhandene ATT-Stärkung (z.B. schwarzes Loch +1, +2, +3) ermitteln
    var attboost = GetATTBoost(table.innerHTML);

    // eventuell vorhandene DEF-Stärkung (z.B. Kürbis) ermitteln
    var defboost = GetDEFBoost(table.innerHTML);

    var fightATT = getFightValue(attvalue, defvalue) + ", ATT: " + attvalue;
    var bonusboost = 0;
    if (ATTbonus > 0) {
        var fightvaloB = Math.floor((attvalue - attboost) / (1 + ATTbonus/100));
        if (Math.floor(fightvaloB * (1 + ATTbonus/100) + 0.05) < (attvalue - attboost))
            fightvaloB++;
        bonusboost = attvalue - attboost - fightvaloB;
    }
    var txtboost = TxtBoost[myLang].split(':')[0];
    if (attboost > 0 || ATTbonus > 0) {
        fightATT += " (" + (attvalue - attboost - bonusboost);
        if (attboost > 0)
            fightATT += " + " + attboost + " " + txtboost;
        if (ATTbonus > 0)
            fightATT += " + " + ATTbonus + "% Bonus";
        fightATT += ")";
    }
    var fightDEF = "DEF: " + defvalue;
    if (defboost > 0)
        fightDEF += " (" + (defvalue - defboost) + " + " + defboost + " " + txtboost + ")";
    fightVals = fightATT + ", " + fightDEF;

    // **********************************************************************************
    // *** GM_XMLHTTPREQUEST *** Abrufen der Bandenseite
    // **********************************************************************************
    GM_xmlhttpRequest({method: 'GET', url: GANG_URL,onload: function(gangresponseDetails) {
        // Wenn die Bandenseite abgerufen werden konnte
        if (gangresponseDetails.status == 200 &&
            gangresponseDetails.responseText.indexOf('500 - Internal Server Error') == -1) {
            // Content der Bandenseite speichern
            var gangcontent = gangresponseDetails.responseText;
//            // Wenn man in einer Bande ist
            GM_log("gangcontent.indexOf(KEYWORD_INGANG[lang]) == -1: " + gangcontent.indexOf(KEYWORD_INGANG[lang]) == -1);
            if (gangcontent.indexOf(KEYWORD_INGANG[lang]) == -1) {
                GM_log("IN BANDE");
                var noGangAbl = gangcontent.indexOf(TxtNoGangAbility[lang]);

                GM_xmlhttpRequest({method: 'GET', url: GANGUPGRADE_URL,onload: function(gangresponseDetails) {
                    // Wenn die Bandenseite abgerufen werden konnte
                    if (gangresponseDetails.status == 200 &&
                        gangresponseDetails.responseText.indexOf('500 - Internal Server Error') == -1) {
                        // Content der Bandenupgradeseite speichern
                        var gangupgcontent = gangresponseDetails.responseText;
                        var abilities = gangupgcontent.split("fixheight");
                        var wuttest = abilities[7].split('td');
                        var Wutfaehig = (wuttest[3].indexOf('1/1') != -1);

                        // Wenn Wut oder WIWu gestartet ist
                        if (oldVersion)
                            wuttest = gangupgcontent.indexOf(TxtAbility1[lang]) != -1;
                        else
                            wuttest = gangupgcontent.indexOf('disabled="disabled"') != -1;
                        if (wuttest && Wutfaehig && noGangAbl == -1) {
                            // Korrigieren der ATT-Summe um 4 bzw. 5 ATT-Punkte
                            if (oldVersion)
                                var wutWert = 4;
                            else {
                                var ATTtxt = gangupgcontent.split("ATT<br")[0].substr(-10);
                                var ATTpos = ATTtxt.indexOf('+');
                                var wutWert = parseInt(ATTtxt.substr(ATTpos));
                            }
                            if (ATTbonus > 0) {
                                var fightvaloB = Math.floor((attvalue - attboost - wutWert) / (1 + ATTbonus/100));
                                if (Math.floor(fightvaloB * (1 + ATTbonus/100) + 0.05) < (attvalue - attboost - wutWert))
                                    fightvaloB++;
                                bonusboost = attvalue - attboost - wutWert - fightvaloB;
                            }
                            var fightATT = getFightValue(attvalue, defvalue) + ", ATT: " + attvalue;
                            fightATT += " (" + (attvalue - attboost - wutWert - bonusboost);
                            if (ATTbonus > 0)
                                fightATT += " + " + ATTbonus + "% Bonus";
                            if (attboost > 0)
                                fightATT += " + " + attboost + " " + txtboost;
                            fightATT += " + " + wutWert + " " + TxtRage[myLang] + ")";
                            fightVals = fightATT + ", " + fightDEF;
                        }
                    }
                }});
            }
        }
    }});
}

// ***********************************************************************************************
// Funktion konvertiert HTML-Userstring zu BBCode-Userstring
// ***********************************************************************************************
function ConvertUserToBB(htmlstring) {
    if (htmlstring.indexOf('href="/') == -1) {
        return '[b][color=#FFFFFF]' + htmlstring + '[/color][/b]';
    }
    var userlink = htmlstring.split('href="/')[1].split('"')[0];
    if (htmlstring.indexOf('class="char') == -1)
        var username = GetUsername(htmlstring);
    else {
        var text = htmlstring.split("<a ")[1].split("</a>")[0].split("</span");
        var username = "";
        for (i = 0; i < text.length-1; i++)
            username += text[i].substr(-1);
    }
    return '[url=' + TOWNBASE_URL + userlink + '][b][color=#FFFFFF]' + username + '[/color][/b][/url]';
}

// **********************************************************************************
// Funktion zum Erzeugen des BBCodes für Posten eines Kampfes in die SB
// **********************************************************************************
function genBBCode(table, sbpostmode) {
    // ***********************************************************************************************
    // Funktion konvertiert HTML-Kampficonstring zu BBCode-Kampficonstring
    // ***********************************************************************************************
    function ConvertIconToBB(htmlstring) {
        var iconlink = htmlstring.split('src="')[1].split('" ')[0];
        return '[img]' + iconlink + '[/img]';
    }

    var trs = table.getElementsByTagName("tr");
    // Wenn es sich um einen bereits abgeschlossenen Kampf handelt
    if (sbpostmode == SBPOSTMODE_DONE) {
        var trslen = trs.length - 1;
    // sonst: Es handelt sich um einen eingehenden Kampf
    } else {
        var trslen = trs.length;
    }

    counter = 0;
    var poststring = [];

    // Für alle Zeilen
    for (var x = 1; x < trslen; x++) {
        if (!trs[x].id)
            continue;
        // Wenn eine Checkbox existiert
        var td = trs[x].getElementsByTagName("form")[0];
        var id = td.innerHTML.split('id="')[1].split('"')[0];
        // Wenn die Checkbox angehakt ist
        if (document.getElementById(id).checked) {
            counter++;
            // Daten aus den Zellen ermitteln
            var tds = document.getElementById(id).parentNode.parentNode.parentNode.getElementsByTagName("td");
            var fighttime = tds[2].innerHTML;
            if (fighttime.indexOf('<br>') != -1) {
                fighttime = fighttime.split('>')[2].split('<')[0] + " " + fighttime.split('<')[0];
                if (fighttime.length < 16)
                   fighttime = fighttime.insert(6, "20");
            }
            var htmlstring = tds[4].innerHTML;
            if (htmlstring.indexOf('id="hist') != -1) {
                htmlstring = htmlstring.split('id="hist')[0];
                htmlstring = htmlstring.substr(0, htmlstring.lastIndexOf('<'));
            }
            var fightuser = ConvertUserToBB(htmlstring);

            var tdadd = 0;
            if (tds[4].getElementsByTagName("table").length > 0)
                tdadd = tds[4].getElementsByTagName("table")[0].getElementsByTagName("td").length;

            var ganginfo = '';
            // Wenn es sich um einen bereits abgeschlossenen Kampf handelt
            if (sbpostmode == SBPOSTMODE_DONE) {
                var fighticon = ConvertIconToBB(tds[1].innerHTML.split('/">')[1].split('</a>')[0]);
                var fmoney = tdadd + ((location.toString().indexOf("/fightlog/") == -1)?5:6);
                var fightmoney = trimString(tds[fmoney].innerHTML);
                var fightpoints = trimString(tds[fmoney+1].innerHTML);
                // Wenn bei Unentschieden oder Ausweichen "+-0" Punkte gesetzt sind
                if (fightpoints == "+-0") {
                    fightpoints = "0";
                }
                var wkaputt = tds[fmoney+2]?tds[fmoney+2].innerHTML.trim():"";
                if (wkaputt == "-")
                    wkaputt = "";
                if (wkaputt != "")
                    wkaputt = " " + wkaputt;
                if (tds[4].getAttribute("ganginfo"))
                    ganginfo = tds[4].getAttribute("ganginfo");
            // sonst: Es handelt sich um einen eingehenden Kampf
            } else {
                var fighticon = '[img]' + tds[1].getElementsByTagName("img")[0].src + '[/img]';
            }

            // ***********************************************************************************************
            // Wenn die Tabelle 8 Spalten hat (Kampflog) oder es sich um einen eingehenden Kampf handelt
            // ***********************************************************************************************
            if (tds.length >= tdadd + 8 || sbpostmode == SBPOSTMODE_INCOMING || ganginfo != '') {
                if (ganginfo != '') {
                    ganginfo = ganginfo.split('|');
                    var gangid = ganginfo[0];
                    var gangname = ganginfo[1];
                }
                // Wenn der User eine Bande hat (die verlinkt ist)
                else if (tds[tdadd+5].getElementsByTagName("a").length > 0) {
                    // Auslesen von Bandenname
                    var gangname = trimString(tds[tdadd+5].getElementsByTagName("a")[0].innerHTML);
                    // Auslesen von BandenID
                    var gangid = tds[tdadd+5].innerHTML.split(TOWN_URL+'profil/bande:')[1].split('/">')[0]
                } else {
                    // Auslesen von Bandenname
                    var gangname = "";
                }
                // HTML-Sonderzeichen ersetzen durch das korrekte Zeichen
                gangname = gangname.replace(/&amp;/g, "&");
                gangname = gangname.replace(/&gt;/g, ">");
                gangname = gangname.replace(/&lt;/g, "<");

                // Wenn der Penner in einer Bande ist
                if (gangname != "") {
                    var fightgang = '[color=#2a2a2a]_[/color][url=' + TOWNBASE_URL + 'profil/bande:' + gangid + '/][b][color=#FFFFFF]' + gangname + '[/color][/b][/url]';
                // sonst: Der Penner ist in keiner Bande
                } else {
                    var fightgang = " " + TxtNoGang[myLang];
                }
            } else {
                var fightgang = "";
            }

            // Wenn es sich um einen bereits abgeschlossenen Kampf handelt
            if (sbpostmode == SBPOSTMODE_DONE) {
                var inout = fighticon.split(FIGHTICONS_URL)[1].split('.')[0];
                fighticon = "[img]" + getIconAddr(eval("ICON_"+inout.toUpperCase())) + "[/img]";
                // Wenn der Kampf verloren wurde
                if (inout.substr(0, 1) == '0') {
                    var colorstring = '#FF0000';  // Rot
                // Wenn der Kampf gewonnen wurde
                } else if (inout.substr(0, 1) == '1') {
                    var colorstring = '#33CC00';  // Grün
                // Wenn der Kampf unentschieden ausging
                } else if (inout.substr(0, 1) == '2') {
                    var colorstring = '#FFFF33';  // Gelb
                // sonst: Es wurde ausgewichen
                } else {
                    var colorstring = '#3366FF';  // Blau
                }

                // SB-String für diesen Kampf zusammenbauen und anhängen
                poststring.push(fighticon + " " + fighttime + " " + fightuser + fightgang + " [color=#2a2a2a]_[/color][color=" + colorstring + "]" + fightmoney + "[/color][color=#2a2a2a]_[/color][color=" + colorstring + "]"  + fightpoints + ' ' + TxtPunkte[myLang] + wkaputt + '[/color]');
            // sonst: Es handelt sich um einen noch offenen Kampf (einkommend oder ausgehend)
            } else {
                // SB-String für diesen Kampf zusammenbauen und anhängen
                poststring.push(fighticon + " " + fighttime + " " + fightuser + fightgang);
            }
        }
    }
    return poststring;
}

// **********************************************************************************
// Handler für Posten eines Kampfes in die SB mit einer Grafik assoziieren
// **********************************************************************************
function PostToSBHandler(currentimg, sbpostmode) {
    // Click-Handler hinzufügen
    currentimg.addEventListener("click", function(event) {
        if (!event) var event = window.event;
        counter = 0;
        var posttext = "";
        // ***********************************************************************************************
        // AKTIVER KAMPF
        // ***********************************************************************************************
        if (sbpostmode == SBPOSTMODE_ACTIVE) {
            // Inhalt der Box auslesen, in der die Infos über den ausgehenden Kampf stehen
            var boxcontent = currentimg.parentNode.parentNode.innerHTML;
            // In die SB zu postende Nachricht zusammenstellen
            var ganginfo = currentimg.name;
            if (ganginfo) {
                var gang = ganginfo.split('|');
                var gangid = gang[0];
                var gangname = gang[1];
                // HTML-Sonderzeichen ersetzen durch das korrekte Zeichen
                gangname = gangname.replace(/&amp;/g, "&");
                gangname = gangname.replace(/&gt;/g, ">");
                gangname = gangname.replace(/&lt;/g, "<");

                // Wenn der Penner in einer Bande ist
                if (gangname != "") {
                    var fightgang = '[color=#2a2a2a]_[/color][url=' + TOWNBASE_URL + 'profil/bande:' + gangid + '/][b][color=#FFFFFF]' + gangname + '[/color][/b][/url]';
                // sonst: Der Penner ist in keiner Bande
                } else {
                    var fightgang = " " + TxtNoGang[myLang];
                }
            } else {
                var fightgang = "";
            }
            if (boxcontent.indexOf('id="hist') != -1) {
                var htmlstring = boxcontent.split('id="hist')[0];
				var splitStr = htmlstring.substr(htmlstring.lastIndexOf('<')) + 'id="hist';
            }
            else
                var splitStr = '&nbsp;';
            var posttext = '[b]' + TxtAttack[myLang] + '  [/b]' + ConvertUserToBB(boxcontent.split(TxtRunAttack[lang])[1].split(splitStr)[0]) + ' ' + fightgang;
            posttext = posttext + ', ' + trimString(boxcontent.split('<br>')[1].split('<')[0]) + '.';
            counter = 1;
        }
        var gcounter = counter;
        var posttextDone = genBBCode(document.getElementById("PostDoneFightsToSB").parentNode.parentNode.parentNode, SBPOSTMODE_DONE);
        var counterIn = counter;
        gcounter += counter;
        if (document.getElementById("PostIncomingFightsToSB"))
            var posttextIn = genBBCode(document.getElementById("PostIncomingFightsToSB").parentNode.parentNode.parentNode, SBPOSTMODE_INCOMING);
        else
            var posttextIn = [];
        counterIn = counter - counterIn;
        counter += gcounter;

        // Es wurde kein Kampf angehakt
        if (posttext == "" && posttextDone.length == 0 && posttextIn.length == 0) {
            alert(TxtCheckFights[myLang]);
            return;
        }

        if (SBT) {
            showSBT(event);
            if (SBT.style.display == "block")
                return;
            }

        var jj = 0;
        var sboxTable = [];
        if (SBT)
            while (true) {
                if (!document.getElementById("SBSel"+jj))
                    break;
                if (document.getElementById("SBSel"+jj).checked)
                    sboxTable.push(document.getElementById("SBSel"+jj).name);
                jj++;
            }
        else
            sboxTable.push(0);
        if (sboxTable.length == 0) {
                alert("Es wurde keine Shoutbox ausgewählt");
                return;
        }

        // ***********************************************************************************************
        // Kommentar zum Post abfragen
        // ***********************************************************************************************
        var postcomment = trimString(prompt(TxtFightCom[myLang]));
        if (postcomment != "")
            postcomment += "\n\n";

        // Kampf in die SB posten
        var premessagetext = "";
        // Es soll mehr als ein Kampf gepostet werden
        if (counter > 1)
            var messagetext = TxtFights[myLang];
        // sonst: Es soll nur ein Kampf gepostet werden
        else
            var messagetext = TxtFight[myLang];

        // Wenn bereits beendete Kämpfe gepostet werden sollen
        if (event.shiftKey != 0 || document.getElementById("postVals").checked)
            postcomment += TxtFightVals[myLang] + fightVals + "\n\n";
        // Wenn eingehende Kämpfe gepostet werden sollen
        if (posttextIn.length != 0) {
            if (counterIn > 1)
                premessagetext = TxtPostPreMsg2[myLang];
            else
                premessagetext = TxtPostPreMsg[myLang];
            if (posttext != "" || posttextDone.length != 0)
                premessagetext = "\n\n[b]" + premessagetext + "[/b]";
            posttextIn[0] = premessagetext + posttextIn[0];
        }
        if (posttext != "" && posttextDone.length != 0)
            posttextDone[0] = "\n\n[b]Fightlog:[/b]\n\n" + posttextDone[0];

        // Kampf/Kämpfe in die SB posten
            PostToSB(sboxTable, postcomment, posttext, posttextDone, posttextIn, messagetext + TxtAttackPost[myLang]);
    }, false);
}

// **********************************************************************************
// Handler für Hinzufügen zur Kampfliste
// **********************************************************************************
function AddToFTHandler(currentimg) {
    // Click-Handler hinzufügen
    currentimg.addEventListener("click", function(event) {
        if (!event) var event = window.event;
        var table = this.parentNode.parentNode.parentNode;
        var trs = table.getElementsByTagName("tr");
        var trslen = trs.length - 1;

        counter = 0;
        var added = 0;
        var fightIDs = PGu_getValue("FightIDList", "");
        // Für alle Zeilen
        for (var x = 1; x < trslen; x++) {
            if (!trs[x].id)
                continue;
            var td = trs[x].getElementsByTagName("form")[0];
            var id = td.innerHTML.split('id="')[1].split('"')[0];
            // Wenn die Checkbox angehakt ist
            if (document.getElementById(id).checked) {
                counter++;
                // Daten aus den Zellen ermitteln
                var tds = trs[x].getElementsByTagName("td");
                var fightuserid = GetUserID(trimString(tds[4].innerHTML));
                if (AddIDToList(fightIDs, fightuserid)) {
                    fightIDs += (fightIDs == ""?"":";") + fightuserid;
                    added++;
                }
                document.getElementById(id).checked = false;
            }
        }

        // Es wurde kein Kampf angehakt
        if (counter == 0) {
            alert(TxtCheckBums[myLang]);
            return;
        }

        if (added > 0) {
            fightIDs = fightIDs.split(";");
            for (var j = fightIDs.length - 1; j >= 0; j--)
                if (isNaN(fightIDs[j]) || fightIDs[j] == "")
                    fightIDs.splice(j, 1);
            PGu_setValue("FightIDList", fightIDs.join(";"));
            PGu_setValue("fightlistchanged", 1);
            if (added == 1)
                alert (TxtAdded1ToFT[myLang]);
            else
                alert (TxtAddedToFT[myLang].replace("%s", added));
            if (location.toString().indexOf("/fightlog/") == -1)
                window.location.reload();
        }
        else
            alert (TxtNoAddedToFT[myLang]);
    }, false);
}

// ***********************************************************************************************
// ***********************************************************************************************
// Fügt die Info-Links in die Hisghscore-Tabelle hinzu
// ***********************************************************************************************
// ***********************************************************************************************
function InsertInfoInHighscoreTable(table, inGang, addtd) {
    DelayedPost(20000);
    fightinfo = "";
    // Referenz auf die Zeilen der Tabelle speichern
    var trs = table.getElementsByTagName("tr");
    var td = 0;

    // Für alle Zeilen mit Pennern (erste Zeile Überschrift außen vor)
    for (var x = 1; x <= trs.length - 1; x++) {
        if (trs[x].className.indexOf("trhover") == -1)
            continue;
        // Referenz auf die Zellen der aktuellen Zeile speichern
        var tds = trs[x].getElementsByTagName("td");

        // Name, UserID und Kampfzeit auslesen
        var username = getUserName(tds[2]);
        var userid = tds[2].innerHTML.split('/id:')[1].split('/"')[0];

        // User-Profillink mit ID versehen und Link mit "grün" initialisieren
        // (wird dann später bei der Überprüfung von Punkten und Angriffszeit ggf. nach rot umgefärbt)
        tds[2].id = 'userprofileid:' + userid + "_" + (GetNrOfIDs(document, 'userprofileid:' + userid) + 1);
        //tds[2].getElementsByTagName("a")[0].setAttribute('style', 'color: #33cc66');

        // ***********************************************************************************************
        // Info-Icons
        // ***********************************************************************************************
        // Info-Icons in die neue Zelle einfügen
        var iconstd = trs[x].getElementsByTagName("td")[1];
        iconstd.innerHTML = GetIconInsertHTML(userid, username, "x");
        if (userid != m_ownuserid)
            FightListHandler(iconstd.getElementsByTagName('img')[ZONEBASE_URL==""?1:2]);

        // Zahl der Kämpfe ermitteln
        CheckPastFights(userid, username, 1);
    }
}

// ***********************************************************************************************
// ***********************************************************************************************
// Fügt die Info-Links in die erste Tabelle hinzu
// ***********************************************************************************************
// ***********************************************************************************************
function InsertInfoInFirstTable(table, inGang, addtd, fktCont) {
    function insertInfo(trs, x) {
        // Referenz auf die Zellen der aktuellen Zeile speichern
        var tds = trs[x].getElementsByTagName("td");

        // Name, UserID und Kampfzeit auslesen
        var userid = tds[4].innerHTML.split('/id:')[1].split('/"')[0];
        var fighttime = tds[2].innerHTML;
        if (fighttime.indexOf('<br>') != -1) {
            fighttime = fighttime.split(">");
            fighttime = fighttime[0].split("<")[0]+" "+fighttime[2].split("<")[0];
        }

        // User-Profillink mit ID versehen und Link mit "grün" initialisieren
        // (wird dann später bei der Übreprüfung von Punkten und Angriffszeit ggf. nach rot umgefärbt)
        tds[4].id = 'userprofileid:' + userid + "_" + (GetNrOfIDs(document, 'userprofileid:' + userid) + 1);
        //tds[4].getElementsByTagName("a")[0].setAttribute('style', 'color: #33cc66');
        tds[4].getElementsByTagName("a")[0].setAttribute('target', '_blank');

        // Ankreuzkästchen in die Zelle setzen
        var sbtd = trs[x].getElementsByTagName("td")[0];
        sbtd.innerHTML = '<form style="padding-bottom: 4px; padding-left: 12px;"><input name="PostToSB' + x + '" id="PostToSB' + x + '" type="checkbox" onclick="document.getElementById(\'bbcode\').style.visibility=\'hidden\'"></form>';

        getUserData("#"+userid, function(userid, username, userpoints, gangid, gangname, regsince, money, userplace, history) {
            // ***********************************************************************************************
            // Punkte formatieren
            // ***********************************************************************************************
            var pointstd = trs[x].getElementsByTagName("td")[addtd + 6];
            pointstd.innerHTML = number_format(trimString(pointstd.innerHTML), false);

            // ***********************************************************************************************
            // Info-Icons
            // ***********************************************************************************************
            // Info-Icons in die neue Zelle einfügen
            var iconstd = trs[x].getElementsByTagName("td")[3];
            iconstd.innerHTML = GetIconInsertHTML(userid, username, fighttime);
            // Handler für Fightkommentare mit Link assoziieren
            FightCommentHandler(iconstd.getElementsByTagName("img")[ZONEBASE_URL==""?1:2]);
            FightListHandler(iconstd.getElementsByTagName("img")[ZONEBASE_URL==""?3:4]);

            // Zahl der Kämpfe ermitteln
            CheckPastFights(userid, username, 1);
            if (x < trs.length-2)
                insertInfo (trs, x + 1);
            else
                fktCont();
        });
    }
    DelayedPost(20000);
    fightinfo = "";
    // Referenz auf die Zeilen der Tabelle speichern
    var trs = table.getElementsByTagName("tr");
    var td = 0;

    // ***********************************************************************************************
    // Posten in die SB
    // ***********************************************************************************************
    // Erste Spalte ist SB-Spalte
    if (inGang && trs.length > 2) {
        var sbtd = trs[0].getElementsByTagName("td")[td];
        // Grafik für Posten in SB einfügen
        sbtd.innerHTML = '<img id="PostDoneFightsToSB" border="0" src="' + getIconAddr(ICON_SENDTOSB) + '" title="' + TxtPostTitle[myLang] + '" height="14" width="14" style="padding-left: 11px; cursor: pointer">';

        // Handler für das Posten in SB mit Grafik assoziieren
        PostToSBHandler(sbtd.getElementsByTagName("img")[0], SBPOSTMODE_DONE);
        td = 1;
    }
    if (trs.length > 2) {
        var sbtd = trs[0].getElementsByTagName("td")[td];
        // Grafik für Hinzufügen zur Kampfliste
        var pad = 1;
        if (!inGang)
            pad += 10;
        sbtd.innerHTML = '<img id="AddToFightList" border="0" src="' + getIconAddr(ICON_ADDTOFT) + '" title="' + TxtAddMarkedToFT[myLang] + '" height="14" width="14" style="padding-left: '+pad+'px; cursor: pointer">';
        AddToFTHandler(sbtd.getElementsByTagName("img")[0]);
    }

    // Gesamtpunktzahl formatieren
    var ptscol = trs[trs.length - 1].getElementsByTagName("td").length - 1;
    trs[trs.length - 1].getElementsByTagName("td")[ptscol].innerHTML = "<strong>" + number_format(trs[trs.length - 1].getElementsByTagName("td")[ptscol].getElementsByTagName("strong")[0].innerHTML, false) + "</strong>";

    // Für alle Zeilen mit Kämpfen (erste Zeile Überschrift, letzte Zeile Zusammenfassung außen vor)
    insertInfo (trs, 1);
}

// ***********************************************************************************************
// ***********************************************************************************************
// Fightlog-Tabelle neu formatieren und zusätzliche Spalte einfügen
// ***********************************************************************************************
// ***********************************************************************************************
function ReformatFightlogTable(table) {
    // Referenz auf die Zeilen der Tabelle speichern
    var trs = table.getElementsByTagName("tr");
    if (trs.length <= 2)
        return;

    // Tabellenbreite neu festlegen
    table.width = "800";

    GM_addStyle('#content td { vertical-align: middle; height: 18px; }');
    GM_addStyle('#content .tieritemA { width: 730px; }');

    // Für alle Zeilen
    var insGang = trs[0].getElementsByTagName("td").length >= 5 && trs[trs.length-2].getElementsByTagName("td")[3].innerHTML.search(/^[\t\n]*[+-]/) != -1;
    for (var x = 0; x <= trs.length - 1; x++) {
        // Wenn die aktuelle Zeile eine Zeile mit Kampfdaten ist
        if (x > 0 && x <= trs.length - 2) {
            // Kampf-Icon austauschen
            ChangeFightIcon(trs[x]);
        }

        if (insGang) {
            // neue Zelle für Bande erzeugen und einfügen
            var misstd = document.createElement("td");
            trs[x].insertBefore(misstd, trs[x].getElementsByTagName("td")[3]);
            if (x == 0)
                trs[x].getElementsByTagName("td")[3].innerHTML = "<strong>"+TxtGang[myLang]+"</strong>";
        }
        trs[x].getElementsByTagName("td")[0].setAttribute('style', 'width:17px;');
        trs[x].getElementsByTagName("td")[1].setAttribute('style', 'width:100px;');
        trs[x].getElementsByTagName("td")[2].setAttribute('style', 'width:220px;');
        trs[x].getElementsByTagName("td")[3].setAttribute('style', 'width:220px;');
        trs[x].getElementsByTagName("td")[4].setAttribute('style', 'width:85px; text-align:right;');
        trs[x].getElementsByTagName("td")[5].setAttribute('style', 'width:75px; text-align:right;');

        // neue Zelle erzeugen und einfügen
        var newtd = document.createElement("td");
        var width = (ZONEBASE_URL == "")?75:90;
        newtd.setAttribute('style', 'width:' + width + 'px;');
        trs[x].insertBefore(newtd, trs[x].getElementsByTagName("td")[2]);
        newtd = document.createElement("td");
        newtd.setAttribute('style', 'width: 30px;');
        trs[x].insertBefore(newtd, trs[x].getElementsByTagName("td")[0]);
    }
    // erste Zeile dunkel färben
    trs[0].bgColor = "#232323";
}

// **********************************************************************************
// **********************************************************************************
// Funktion ermittelt die Anzahl eintreffender Kämpfe
// **********************************************************************************
// **********************************************************************************
function GetNumberOfFights(content) {
    try {
        // Seiteninhalt aufsplitten mit dem Namen des Icons, das für eintreffende Kämpfe verwendet wird;
        // Anzahl der Teile des Splittings - 1 ist die Anzahl eintreffender Kämpfe
        return content.split(ICON_WARNING).length - 1;
    } catch(err) {
        GM_log("Fehler beim Ermitteln der Zahl eintreffender Kämpfe: " + err);
    }
}

// **********************************************************************************
// **********************************************************************************
// Funktion ermittelt, wieviele verschiedene Vorkommen von idtag es als ID gibt
// **********************************************************************************
// **********************************************************************************
function GetNrOfIDs(doc, idtag) {
    var i = 1;
    while (doc.getElementById(idtag + "_" + i) != null || doc.getElementById(idtag + "_" + i + "_done") != null)
        i++;
    return i - 1;
}

// **********************************************************************************
// **********************************************************************************
// Funktion tauscht das aktuelle Icon "Suche Kämpfe gegen Gegner" anhand des ID-Tags
// gegen das "es gibt bereits Kämpfe"-Icon aus
// **********************************************************************************
// **********************************************************************************
function ReplaceFightIcon(idtag) {
    // img-Element ermitteln
    var infoimg = document.getElementById(idtag);

    // Wenn das img-Element gefunden wurde
    if (infoimg != null) {
        // Das aktuelle Icon ist das Icon "Kein Kommentar"
        if (infoimg.src == getIconAddr(ICON_LASTFIGHT_NOCOMMENT)) {
            infoimg.src = getIconAddr(ICON_LASTFIGHT_NOCOMMENT_FIGHTED);
        // Das aktuelle Icon ist das Icon "Es gibt einen Kommentar"
        } else if (infoimg.src == getIconAddr(ICON_LASTFIGHT_COMMENT)) {
            infoimg.src = getIconAddr(ICON_LASTFIGHT_COMMENT_FIGHTED);
        // Das aktuelle Icon ist das Icon "Warnung"
        } else if (infoimg.src == getIconAddr(ICON_LASTFIGHT_WARNING)) {
            infoimg.src = getIconAddr(ICON_LASTFIGHT_WARNING_FIGHTED);
        }
    }
}

// **********************************************************************************
// **********************************************************************************
// sortiert Liste nach Punkten
// **********************************************************************************
// **********************************************************************************
function sortList(trs, start, end, offset, userids) {
    for (var x = start+1; x <= end; x++) {
        var useridx = trs[x-1].getElementsByTagName("td")[offset+3].innerHTML.split('/id:')[1].split('/"')[0];
        var userid = trs[x].getElementsByTagName("td")[offset+3].innerHTML.split('/id:')[1].split('/"')[0];
        var points = offset<0?userpts[x-1]:CachedPoints[CacheIndex(userid)];
        if (points < (offset<0?userpts[x-2]:CachedPoints[CacheIndex(useridx)]))
            continue;
        var lower = start;
        var upper = x - 1;
        while (lower <= upper) {
            var middle = Math.floor((lower + upper) / 2);
            var useridx = trs[middle].getElementsByTagName("td")[offset+3].innerHTML.split('/id:')[1].split('/"')[0];
            if (points < (offset<0?userpts[middle-1]:CachedPoints[CacheIndex(useridx)]))
                lower = middle + 1;
            else
                upper = middle - 1;
        }
        var oldtr = trs[x].parentNode.removeChild(trs[x]);
        trs[lower].parentNode.insertBefore(oldtr, trs[lower]);
        if (offset < 0) {
            userid = userids[x-1];
            var username = usernames[x-1];
            var history = userhistory[x-1];
            userids.splice(x-1,1);
            usernames.splice(x-1,1);
            userhistory.splice(x-1,1);
            userpts.splice(x-1,1);
            userids.splice(lower-1, 0, userid);
            usernames.splice(lower-1, 0, username);
            userhistory.splice(lower-1, 0, history);
            userpts.splice(lower-1, 0, points);
        }
    }
}

// **********************************************************************************
// **********************************************************************************
// Funktion sortiert die Kampfliste nach Punkten
// **********************************************************************************
// **********************************************************************************
function sortFightList(offset, showLosers) {
    if (!compress)
        return;

    for (var x = 0; x < nrOfCachedUsers; x++)
        if (CachedStats[x] == "" || CachedPoints[x] == -1)
            return;

    var trs = fltable.getElementsByTagName("tr");

    for (var x = 1; x <= trs.length-2; x++) {
        if (!trs[x].id)
            continue;
        if (trs[x].getElementsByTagName("td")[offset+3].innerHTML.indexOf('/id:') == -1)
            continue;
        var useridx = trs[x].getElementsByTagName("td")[offset+3].innerHTML.split('/id:')[1].split('/"')[0];
        var j = CacheIndex(useridx);
        if ((showLosers && Number(CachedStats[j].split("/")[0]) == 0 && Number(CachedStats[j].split("/")[4]) == 0) || trs[x].style.visibility == "hidden") {
            trs[x].parentNode.removeChild(trs[x]);
            x--;
        }
    }

    // sort
    //sortList(trs, 5, trs.length - 2, offset);
}

// **********************************************************************************
// **********************************************************************************
// Funktion ersetzt alle fightsearchids auf der Seite
// **********************************************************************************
// **********************************************************************************
function ReplaceFightSearchIDs(userid, nrofpastfights, stats, newFights, lastFightTime) {
    // **********************************************************************************
    // Funktion gibt in Abhängigkeit der Kampfzahl einen Satzbaustein zurück
    // **********************************************************************************
    function GetFightstring(nrofpastfights, stats) {
    // In Abhängigkeit der Anzahl Kämpfe den String zusammenbauen
        if (nrofpastfights == 0)
            return TxtNoFight[myLang];

        if (nrofpastfights == 1)
            var fightstring = Txt1Fight[myLang];
        else
            var fightstring = nrofpastfights + Txt2Fights[myLang];
        return fightstring + " (S/U/N/A/AG: " + stats + ")";
    }

    // Anzahl der Kampfsuch-Icons des aktuellen Users auf der aktuellen Seite ermitteln
    var nrofids = GetNrOfIDs(document, 'fightsearchid:' + userid);

    fightinfo = "#" + m_owngangid;
    var x = CacheIndex(userid);
    var fightstring = GetFightstring(nrofpastfights, stats);
    var singleStats = stats.split("/");
    for (var i = 1; i <= nrofids; i++) {
        // img-Element ermitteln
        var infoimg = document.getElementById('fightsearchid:' + userid + "_" + i);

        // Wenn das img-Element gefunden wurde
        if (infoimg != null) {
            if (parseInt(singleStats[0]) < parseInt(singleStats[2]))
                infoimg.src = getIconAddr(getIconAddr(ICON_LASTFIGHT_WARNING));
            // Infostring über Anzahl der Kämpfe austauschen
            infoimg.title = infoimg.title.replace(/-noch nicht ermittelt- Kämpfe/, fightstring);

            if (CachedStats[x] == "") {
                CachedStats[x] = stats;
                CachedFights[x] = nrofpastfights;
                if (newFights && nrofpastfights > 0) {
                    if (fightinfo.substr(0,1) == "#")
                        if (FightVals.length > 0)
                            fightinfo = FightVals.join('#') + fightinfo;
                    //fightinfo += ";" + userid + "/" + Stat;

                    //fight = "fight" + base64_encode(fightinfo);
                }
            }

            // Wenn es bereits schon Kämpfe gab
            if (nrofpastfights > 0)
                // Austauschen des aktuellen Icons gegen ein "es gab schon Kämpfe"-Icon
                ReplaceFightIcon('fightsearchid:' + userid + "_" + i);

            // ID ändern, damit aktuelles Element nicht noch einmal bearbeitet wird
            infoimg.id = infoimg.id + '_done';
        }
    }
}

// **********************************************************************************
// PROFILLINK FÄRBEN nach Angreifbarkeit
// **********************************************************************************
function ColorProfileLink (userid) {
    // Anzahl der Profillinks des aktuellen Users auf der aktuellen Seite ermitteln
    var nrofids = GetNrOfIDs(document, 'userprofileid:' + userid);

    var x = CacheIndex(userid);
    var waitText = "";
    if (x != -1)
        waitText = CachedWaitText[x];
    // Für alle ermittelten Vorkommen von Profillinks auf der aktuellen Seite
    for (var i = nrofids; i >= 1; i--) {
        // Zelle ermitteln, in der der aktuelle Profillink vorkommt
        var userprofiletd = document.getElementById('userprofileid:' + userid + "_" + i);

        // Wenn die 36 Stunden-Wartefrist noch nicht vorbei ist
        if (userprofiletd != null) {
            if (waitText != "") {
                var tr = userprofiletd.getElementsByTagName("a")[0].getElementsByTagName("tr");
                if (!showHistory || tr.length == 0) {
                    var td = userprofiletd.getElementsByTagName("a")[0];
                    var title = td.title;
                }
                else {
                    var td = tr[0].getElementsByTagName("td")[0];
                    var title = td.innerHTML;
                }
                if (title == "")
                    title = waitText;
                else if (title.substr(-1) == ")")
                    title = title.insert(-1, " (" + waitText + ")");
                else
                    title += " (" + waitText + ")";
                if (!showHistory || tr.length == 0)
                    td.title = title;
                else
                    td.innerHTML = title;
                // Link rot färben
                userprofiletd.getElementsByTagName("a")[0].setAttribute('style', 'color: '+colors[0]);
                if (document.getElementById("att_"+userid))
                    document.getElementById("att_"+userid).style.display = "none";
            }
            // ID ändern, damit aktuelles Element nicht noch einmal bearbeitet wird
            userprofiletd.id = userprofiletd.id + '_done';
        }
    }
}

// **********************************************************************************
// **********************************************************************************
// Funktion ermittelt, ob es bereits Kämpfe gegen den Gegner gab und tauscht ggf.
// das Icon aus
// **********************************************************************************
// **********************************************************************************
function CheckPastFights(userid, username, offset, showLosers) {
    var x = CacheIndex(userid);
    if (x != -1) {
        if (CachedFights[x] != -1) {
            ReplaceFightSearchIDs (userid, CachedFights[x], CachedStats[x], false, "");
            ColorProfileLink (userid);
        }
        return;
    }

    x = nrOfCachedUsers;
    CachedUsers[nrOfCachedUsers] = userid;
    CachedStats[nrOfCachedUsers] = "";
    CachedPoints[nrOfCachedUsers] = -1;
    CachedFights[nrOfCachedUsers] = -1;
    CachedWaitText[nrOfCachedUsers] = "";
    nrOfCachedUsers++;

    // **********************************************************************************
    // Beziehen der Fightsuchseite
    // **********************************************************************************
    GM_xmlhttpRequest({method: 'GET', url: FIGHTSEARCH_URL + username, onload: function(responseDetails) {
        // Wenn die Seite erfolgreich abgerufen werden konnte
        if (responseDetails.status == 200) {
            // **********************************************************************************
            // Funktion ermittelt den jüngeren Zeitpunkt
            // **********************************************************************************
            function greaterDate(d1, d2) {
                if (d1 == "")
                    return d2;
                if (d2 == "")
                    return d1;
                if (d1.length < 16 || d2.length < 16)
                    return d1;         // kein Jahr: d1 ist jünger
                var dt1 = d1.substr(6,4) + d1.substr(3,2) + d1.substr(0,2) + d1.substr(11);
                var dt2 = d2.substr(6,4) + d2.substr(3,2) + d2.substr(0,2) + d2.substr(11);
                return dt1 < dt2?d2:d1;
            }

            // **********************************************************************************
            // Funktion ermittelt den Zeitpunkt des letzten ausgehenden Kampfes
            // **********************************************************************************
            function GetLastDate(trs, lastdate) {

                // Für alle Kampfzeilen
                for (var i = 1; i < trs.length - 1; i++) {
                    // jüngeres Datum ermitteln
                    lastdate = greaterDate(lastdate, trs[i].getElementsByTagName("td")[1].innerHTML);
                }

                // Zurückgeben des Ergebnisses
                return lastdate;
            }

            // **********************************************************************************
            // Funktion ermittelt den Zeitpunkt des letzten ausgehenden Kampfes
            // **********************************************************************************
            function GetLastOutgoingFightdate(trs, lastdate) {

                // Für alle Kampfzeilen
                for (var i = 1; i < trs.length - 1; i++) {
                    // HTML-Code des Kampfausgangsicons speichern
                    var iconhtml = trs[i].getElementsByTagName("td")[0].innerHTML;

                    // Wenn es sich beim aktuellen Kampf um einen ausgehenden handelt
                    if (trs[i].getElementsByTagName("td").length < 6)
                        var points = trs[i].getElementsByTagName("td")[4].innerHTML;
                    else
                        var points = trs[i].getElementsByTagName("td")[5].innerHTML;
                    if (iconhtml.indexOf("0_0.gif") != -1 || iconhtml.indexOf("1_0.gif") != -1 || iconhtml.indexOf("2_0.gif") != -1 || (iconhtml.indexOf("evade.gif") != -1 && trimString(points) == '+-0')) {
                        // jüngeres Datum ermitteln
                        lastdate = greaterDate(lastdate, trs[i].getElementsByTagName("td")[1].innerHTML);
                    }
                }

                // Zurückgeben des Ergebnisses
                return lastdate;
            }

            // **********************************************************************************
            // Funktion liefert den Statistik-Satzbaustein zurück
            // **********************************************************************************
            function GetFightStatistic(userid, username, content, page, nrofpastfights, loss, wins, draws, evades, evades2, lastfightTime, lastoutgoingfightdate, lastTime, seiten, fightsonpage1) {
                var changed = true;
                if (page == 1) {
                    var seiten = content.split("/fight/fightlog/").length - 2;
                    var fightsonpage1 = content.split("/fight/view").length - 1;
                    var oldStat = PGu_getValue("FightStat"+userid+"|", "");
                    lastoutgoingfightdate = "";
                    if (oldStat != "") {
                        var FightStatSplit = oldStat.split("/");
                        FightStatSplit.push(1);
                        if (FightStatSplit[1].indexOf(":") != -1) {
                            var fss = FightStatSplit[1].split(":");
                            if (fss[1] != seiten || fss[2] != fightsonpage1)
                                FightStatSplit[1] = 0;
                            else {
                                lastoutgoingfightdate = FightStatSplit[0];
								if (lastoutgoingfightdate == "0")
									lastoutgoingfightdate = "";
                                FightStatSplit[1] = fss[0];
                                changed = false;
                            }
                        }
                        if (FightStatSplit.length < 7 || FightStatSplit[1] == 0 || FightStatSplit[7] != 5) {
                            oldStat = "";
                            changed = true;
                        }
                    }
                    if (oldStat != "") {
                        if (nrofpastfights == 0) {
                            nrofpastfights = Number(FightStatSplit[1]);
                            wins = Number(FightStatSplit[2]);
                            draws = Number(FightStatSplit[3]);
                            loss = Number(FightStatSplit[4]);
                            evades = Number(FightStatSplit[5]);
                            evades2 = Number(FightStatSplit[6]);
                            evades += evades2;
                            evades2 += draws;
                        }
                    }
                }

                if (changed) {
                    var doc = HTML2DOM(content);
                    var tables = doc.getElementsByTagName("table");
                    var ft = getFightTableIndex(tables) + 1;
                    var table = tables[ft];
                    var trs = table.getElementsByTagName("tr");
                    // Ermitteln des Zeitpunkts des letzten Kampfes
                    lastfightTime = GetLastDate(trs, lastfightTime);
                    // Ermitteln des Zeitpunkts des letzten ausgehenden Kampfes
                    lastoutgoingfightdate = GetLastOutgoingFightdate(trs, lastoutgoingfightdate);

                    // Anzahl der Kämpfe ermitteln
                    nrofpastfights += content.split("/fight/view").length - 1;

                    loss += content.split("0_0.gif").length + content.split("0_1.gif").length - 2;
                    wins += content.split("1_0.gif").length + content.split("1_1.gif").length - 2;
                    draws += content.split("2_0.gif").length + content.split("2_1.gif").length - 2;
                    evades += content.split("evade.gif").length - 1;
                    evades2 += content.split("+-0").length + content.split("-+0").length - 2;
                    var Seite = content.indexOf("<strong>" + TxtSeite[lang] + ":</strong>");
                    if (Seite != -1)
                        Seite = content.split("<strong>" + TxtSeite[lang] + ":</strong>")[1].indexOf("fight/fightlog/"+(page+1)+"/");
                }
                else
                    var Seite = -1;
                if (Seite != -1) {
                    // **********************************************************************************
                    // Beziehen der Fightsuchseite
                    // **********************************************************************************
                    GM_xmlhttpRequest({method: 'GET', url: FIGHTLOG_URL + (page+1) + "/?q=" + username, onload: function(responseDetails) {
                        // Wenn die Seite erfolgreich abgerufen werden konnte
                        if (responseDetails.status == 200) {
                            var content = responseDetails.responseText;
                            GetFightStatistic(userid, username, content, page+1, nrofpastfights, loss, wins, draws, evades, evades2, lastfightTime, lastoutgoingfightdate, lastTime, seiten, fightsonpage1);
                            }
                    }
                    });
                }
                else
                {
                    // String zusammenbauen, der die Zahl der Kämpfe beinhaltet
                    evades2 -= draws;
                    evades  -= evades2;
                    var stats = wins + "/" + draws + "/" + loss + "/" + evades + "/" + evades2;

                    // Differenz zur aktuellen Zeit bilden (in Minuten) und daraus ableiten, ob die Wartefrist von fightPause Stunden noch gilt
                    var timediff = fightPause * 60 - GetTimeDiffFromNowInMinutes(lastoutgoingfightdate);
                    if (timediff > 0) {
                        // Wartezeit bis zum nächsten Angriff berechnen (in Stunden)
                        var hours = Math.floor(timediff / 60);
                        var minutes = timediff - hours * 60;
                        CachedWaitText[x] = TxtWaitAttack[myLang].replace('%s', hours + ":" + Right$("0" + minutes, 2));
                    }
                    ColorProfileLink (userid);
                    var newFights = (oldStat == "");
                    var Stat = (lastoutgoingfightdate==""?"0":lastoutgoingfightdate) + "/" + nrofpastfights + ":" + seiten + ":" + fightsonpage1 + "/" + stats;
                    if (changed)
                        PGu_setValue("FightStat" + userid + "|", Stat + "/5");
                    ReplaceFightSearchIDs (userid, nrofpastfights, stats, newFights, lastfightTime);

                    sortFightList(offset, showLosers);
                }
            }

            // **********************************************************************************
            // FUNCTION MAIN
            // **********************************************************************************
            var content = responseDetails.responseText;

            // **********************************************************************************
            // ZAHL DER BEREITS BESTRITTENEN KÄMPFE ERMITTELN
            // **********************************************************************************
            GetFightStatistic(userid, username, content, 1, 0, 0, 0, 0, 0, 0, "", "", "", 0, 0);
        }
    }
    });
}

// ***********************************************************************************************
// ***********************************************************************************************
// Funktion formatiert einen HTML-String mit den Info-Icons für den übergebenen Penner
// ***********************************************************************************************
// ***********************************************************************************************
function GetIconInsertHTML(userid, username, fighttime) {
    // Icon für Zugriff auf Pennerzone-Statistik einfügen
    if (ZONEBASE_URL != "")
        var IconInsertHTML = '<a href="' + PENNERZONEUSER_URL + userid + '-' + username + '.html" target="_blank"><img border="0" src="' + getIconAddr(ICON_INFO) + '" title="Pennerzone-Infos über ' + username + '" height="14" width="14" alt="O" style="padding-left: 1px;"></a>';
    else
        var IconInsertHTML = "";

    // Anzahl an Kommentaren zum aktuellen User ermitteln
    var NrOfFightComments = GetNrOfFightCommentsInList(username);

    // Wenn es bereits Kampfkommentare gibt
    if (NrOfFightComments > 0) {
        var lastfighticon = getIconAddr(ICON_LASTFIGHT_COMMENT);
        // Wenn es mehr als einen Kommentar gibt
        if (NrOfFightComments > 1) {
            var lastfightadditionalinfo = '. Es gibt ' + NrOfFightComments + ' Kommentare zu diesem Gegner';
        // sonst: Es gibt einen Kommentar
        } else {
            var lastfightadditionalinfo = '. Es gibt einen Kommentar zu diesem Gegner';
    }
    // sonst: Es gibt noch keine Kampfkommentare
    } else {
        var lastfighticon = getIconAddr(ICON_LASTFIGHT_NOCOMMENT);
        var lastfightadditionalinfo = "";
    }

    // Wenn zu diesem User eine Warnung existiert
    if (ExistsWarning(username)) {
        // Einstellung überschreiben
        var lastfighticon = getIconAddr(ICON_LASTFIGHT_WARNING);
        var lastfightadditionalinfo = lastfightadditionalinfo + ". ACHTUNG, Warnung wurde aktiviert!";
    }

    // Icon für letzte Kämpfe einfügen
    if (userid != m_ownuserid)
        IconInsertHTML = IconInsertHTML + '<a href="' + FIGHTSEARCH_URL + username + '" target="_blank"><img border="0" id="fightsearchid:' + userid + "_" + (GetNrOfIDs(document, 'fightsearchid:' + userid) + 1) + '" src="' + lastfighticon + '" title="Bislang -noch nicht ermittelt- Kämpfe gegen ' + username + lastfightadditionalinfo + '" height="14" width="14" alt="O"></a>'
    else if (fighttime != "x")
        IconInsertHTML = IconInsertHTML + '<a><img border="0" src="' + getIconAddr(ICON_LASTFIGHT_NONE) + '" height="0" width="14" alt="O"></a>';

    // Wenn eine Kampfzeit angegeben wurde
    if (fighttime != "" && fighttime != "ft" && fighttime != "x" && fighttime != "nofight") {
        // Wenn zu diesem Kampf bereits ein Kommentar existiert
        if (fighttime.length > 15)
            fighttime = fighttime.substr(11) + " " + fighttime.substr(0,6) + fighttime.substr(8,2);
        if (IsFightCommentInList(username, fighttime)) {
            var fightcommenticon = getIconAddr(ICON_FIGHTCOMMENT);
        // sonst: Zu diesem Kampf existiert noch kein Kommentar
        } else {
            var fightcommenticon = getIconAddr(ICON_NOFIGHTCOMMENT);
        }

        // Icon für Kampfkommentare einfügen
        IconInsertHTML = IconInsertHTML + '<img id="' + username + "*" + fighttime + '" border="0" src="' + fightcommenticon + '" title="Kommentar zu diesem Kampf eingeben oder ändern" height="14" width="14" alt="O" style="padding-left:3px; cursor: pointer">'
    }

    // Icons für Angriff und Kampfliste einfügen
    if (userid == m_ownuserid && fighttime != "x")
        IconInsertHTML = IconInsertHTML + '<a><img border="0" src="' + getIconAddr(ICON_LASTFIGHT_NONE) + '" height="0" width="14" alt="O"></a>';
    else if (fighttime != "x" && fighttime != "nofight")
        IconInsertHTML = IconInsertHTML + '<a href="' + FIGHTTO_URL + username + '" target = "_blank"><img id="' + username + '*attack" border="0" src="' + getIconAddr(ICON_ATTACK) + '" title="' + username + ' angreifen" height="14" width="14" alt="O" style="cursor: pointer"></a>';

    if (userid != m_ownuserid && fighttime != "ft") {
        var fightIDs = ";" + PGu_getValue("FightIDList", "") + ";";
        var userinFT = (fightIDs.indexOf(";" + userid + ";") != -1);
        if (userinFT)
            IconInsertHTML = IconInsertHTML + '<a><img border="0" id="' + username + '" name="addremoveft' + userid + '" src="' + getIconAddr(ICON_DELFROMFT) + '" title="' + TxtDelFromFT[myLang] + '" height="14" width="14" alt="O" style="cursor: pointer"></img></a>'
        else
            IconInsertHTML = IconInsertHTML + '<a><img border="0" id="' + username + '" name="addremoveft' + userid + '" src="' + getIconAddr(ICON_ADDTOFT) + '" title="' + TxtAddUserToFT[myLang].replace('%s', username) + '" height="14" width="14" alt="O" style="cursor: pointer"></img></a>'
    }
    else if (fighttime != "x" && fighttime != "ft")
        IconInsertHTML = IconInsertHTML + '<a><img border="0" src="' + getIconAddr(ICON_LASTFIGHT_NONE) + '" height="0" width="14" alt="O"</a>';

    // Icon-HTML zurückgeben
    return IconInsertHTML;
}

// ***********************************************************************************************
// ***********************************************************************************************
// Funktion entfernt White Space aus dem übergebenen String
// ***********************************************************************************************
// ***********************************************************************************************
function trimString(s) {
    return s.replace(/^\s+|\s+$/g,'');
}

// ***********************************************************************************************
// ***********************************************************************************************
// Funktion schreibt die aktuelle Anzahl eintreffender Kämpfe in die Zeilenüberschrift
// ***********************************************************************************************
// ***********************************************************************************************
function WriteNrOfIncomingFights(content, table) {
    // Anzahl einkommender Kämpfe ermitteln
    var NrOfIncomingFights = GetNumberOfFights(content);

    // Wenn es mindestens einen einkommenden Kampf gibt
    if (NrOfIncomingFights > 0) {
        // Referenz auf Tabellenzeilen in trs speichern
        var trs = table.getElementsByTagName("tr");

        // Für alle Tabellenzeilen
        for (var i = 0; i < trs.length; i++) {
            // Wenn in der aktuellen Tabellenzeile "Eintreffende Kämpfe" steht
            if (trs[i].innerHTML.indexOf(TxtIncFights[lang]) != -1) {
                // Referenz auf erstes Span speichern
                var span = trs[i].getElementsByTagName("span")[0];
                // Wenn nur ein Kampf eintrifft
                if (NrOfIncomingFights == 1) {
                    span.innerHTML = Txt1IncFight[myLang];
                // sonst: Es treffen mehrere Kämpfe ein
                } else {
                    span.innerHTML = NrOfIncomingFights + Txt2IncFights[myLang];
                }
                break;
            }
        }
    }
}

// ***********************************************************************************************
// ***********************************************************************************************
// Funktion aktualisiert die Kampfstatistiken
// ***********************************************************************************************
// ***********************************************************************************************
function updatePage(trs)
{
    GM_xmlhttpRequest({method: 'GET', url: FIGHTLOG_URL + "1/",onload: function(logresponseDetails) {
        var notFound = 0;
        for (var j = 5; j < trs.length - 1; j++) {
            if (!trs.id)
                continue;
            var userid = trs[j].getElementsByTagName("td")[4].innerHTML.split('/id:')[1].split('/"')[0];
            nrofids = GetNrOfIDs(document, 'fightsearchid:' + userid);
            var infoimg = document.getElementById('fightsearchid:' + userid + "_1_done");
            if (infoimg == null) {
                notFound++;
                continue;
            }
            var fightstring = infoimg.title;
            for (var i = 2; i <= nrofids; i++) {
                // img-Element ermitteln
                infoimg = document.getElementById('fightsearchid:' + userid + "_" + i);

                // Wenn das img-Element gefunden wurde
                if (infoimg != null) {
                    // Infostring über Anzahl der Kämpfe austauschen
                    infoimg.title = fightstring;

                    // Austauschen des aktuellen Icons gegen ein "es gab schon Kämpfe"-Icon
                    ReplaceFightIcon('fightsearchid:' + userid + "_" + i);

                    // ID ändern, damit aktuelles Element nicht noch einmal bearbeitet wird
                    infoimg.id = infoimg.id + '_done';
                }
            }
        }
        if (notFound > 0)
            updatePage(trs);
        else
            document.getElementById("kaempfeanzeigen").disabled = false;
    } });
}

// ***********************************************************************************************
// ***********************************************************************************************
// Funktion ermittelt den Usernamen auch bei Glühwürmchen
// ***********************************************************************************************
// ***********************************************************************************************
function getUserName(td) {
    if (td.getElementsByTagName("span").length > 0) {
        var username = "";
        for (i = 0; i < td.getElementsByTagName("span").length; i++)
            if (td.getElementsByTagName("span")[i].style.fontSize == "10px") {
                username = td.getElementsByTagName("a")[0].innerHTML.replace(/<br>/g, "").split(">").pop();
                break;
            }
            else
                username += td.getElementsByTagName("span")[i].innerHTML;
    }
    else if (td.getElementsByTagName("a").length > 0)
        var username = td.getElementsByTagName("a")[0].innerHTML.replace(/<br>/g, "").split(">").pop();
    else
        var username = td.innerHTML;
    return trimString(username);
}
// ***********************************************************************************************
// ***********************************************************************************************
// Funktion ruft alle Kämpfe einer Logseite aus und iteriert ggf. auf die nächste bis zum Ende
// ***********************************************************************************************
// ***********************************************************************************************
function ProcessLogPage(table, ProgressTable, LogPageNr, showLosers, gangFilter) {

    // Referenz auf Tabellenzeilen in trs speichern
    var trs = table.getElementsByTagName("tr");
    fltable = table;

    // Wenn die letzte abzurufende Seite noch nicht erreicht ist
    if (LogPageNr <= Number(document.getElementById("seitebis").value)) {

        // **********************************************************************************
        // Beziehen der Fightlogseite
        // **********************************************************************************
        GM_xmlhttpRequest({method: 'GET', url: FIGHTLOG_URL + LogPageNr + "/",onload: function(logresponseDetails) {
            // Wenn die Seite erfolgreich abgerufen werden konnte
            if (logresponseDetails.status == 200) {
                FillProgressTable(ProgressTable, LogPageNr);

                // Content der Seite speichern
                var logcontent = logresponseDetails.responseText;

                var posAnf = logcontent.search('<table width="\\d*" border="0"');
                var fighttable = logcontent.substr(posAnf);
                posAnf = fighttable.indexOf(">");
                fighttable = fighttable.substr(posAnf+1).split('</table>')[0];

                var fighttrs = fighttable.split('<tr');

                var Fights = [];
                var j = 0;
                var nrinCache = nrOfCachedUsers;

                for (var i = 2; i <= fighttrs.length - 2; i++) {
                    var currenttr = fighttrs[i].split("</tr>")[0];
                    var fighttds = currenttr.split("<td>");

                    if (fighttds.length == 6 && fighttds[4].indexOf("/profil/bande:") != -1 && gangFilter != "") {
                        var gangname = fighttds[4];
                        gangname = trimString(gangname.split("<")[0]).toLowerCase();
                        if (!filter(gangname, gangFilter))
                            continue;
                    } else if (showLosers) {
                        var userid = trimString(fighttds[3].split("</td>")[0]).split('/id:')[1].split('/"')[0];
                        if (CacheIndex(userid) != -1)
                            continue;
                        CachedUsers[nrOfCachedUsers] = userid;
                        nrOfCachedUsers++;
                    }

                    Fights[j] = new Array(7);

                    Fights[j][0] = trimString(fighttds[1].split("</td>")[0]);  // Kampficon
                    Fights[j][1] = trimString(fighttds[2].split("</td>")[0]);  // Datum/Uhrzeit
                    Fights[j][2] = trimString(fighttds[3].split("</td>")[0]);  // Name
                    if (fighttds.length == 6 && fighttds[4].indexOf("/profil/bande:") != -1) {
                        Fights[j][3] = trimString(fighttds[4].split("</td>")[0]);  // Bande
                        var pp = 5;
                    }
                    else {
                        Fights[j][3] = '';  // Bande
                        var pp = 4;
                    }
                    Fights[j][4] = trimString(fighttds[pp].split("</td>")[0]);  // Geld
                    if (fighttds.length == 6 && pp == 4)
                        Fights[j][5] = trimString(fighttds[5].split("</td>")[0]);  // Punkte
                    else
                        Fights[j][5] = trimString(fighttds[pp].split("</td>")[1].split(">")[1]);  // Punkte
                    Fights[j][6] = fighttds[0].split("id=")[1].split('"')[1];
                    j++;
                }
                nrOfCachedUsers = nrinCache;

                GM_addStyle('#content td { vertical-align: middle; height: 18px; }');

                var nroffights = trs.length - 8;

                // Für alle Kämpfe
                for (var i = 0; i < Fights.length; i++) {
                    // Neue Zeile erzeugen
                    var newtr = document.createElement("tr");

                    // Neue Zellen einfügen
                    for (var j = 0; j < 7; j++) {
                        var newtd = document.createElement("td");
                        newtr.appendChild(newtd);
                    }

                    newtr.id = Fights[i][6];
                    newtr.getElementsByTagName("td")[0].setAttribute('style', 'width:17px;');
                    newtr.getElementsByTagName("td")[0].innerHTML = Fights[i][0];

                    // Kampf-Icon austauschen
                    ChangeFightIcon(newtr);

                    newtr.getElementsByTagName("td")[1].setAttribute('style', 'width:75px;');
                    newtr.getElementsByTagName("td")[1].innerHTML = Fights[i][1];

                    var width = (ZONEBASE_URL == "")?70:85;
                    newtr.getElementsByTagName("td")[2].setAttribute('style', 'width:' + width + 'px;');

                    newtr.getElementsByTagName("td")[3].setAttribute('style', 'width:170px;');
                    newtr.getElementsByTagName("td")[3].innerHTML = Fights[i][2];

                    newtr.getElementsByTagName("td")[4].setAttribute('style', 'width:175px;');
                    newtr.getElementsByTagName("td")[4].innerHTML = Fights[i][3];

                    newtr.getElementsByTagName("td")[5].setAttribute('style', 'width:85px; text-align:right;');
                    newtr.getElementsByTagName("td")[5].innerHTML = Fights[i][4];

                    newtr.getElementsByTagName("td")[6].setAttribute('style', 'width:65px; text-align:right;');
                    newtr.getElementsByTagName("td")[6].innerHTML = number_format(Fights[i][5], false);

                    // Name und UserID des Kämpfers aus dem Link auslesen
                    var username = getUserName(newtr.getElementsByTagName("td")[3]);
                    var userid = newtr.getElementsByTagName("td")[3].innerHTML.split('/id:')[1].split('/"')[0];

                    var fighttime = Fights[i][1];

                    // User-Profillink mit ID versehen und Link mit "grün" initialisieren
                    // (wird dann später bei der Überprüfung von Punkten und Angriffszeit ggf. nach rot umgefärbt)
                    newtr.getElementsByTagName("td")[3].id = 'userprofileid:' + userid + "_" + (GetNrOfIDs(document, 'userprofileid:' + userid) + 1);
                    //newtr.getElementsByTagName("td")[3].getElementsByTagName("a")[0].setAttribute('style', 'color: #33cc66');
                    newtr.getElementsByTagName("td")[3].getElementsByTagName("a")[0].setAttribute('target', '_blank');

                    // Info-Icons in die neue Zelle einfügen
                    newtr.getElementsByTagName("td")[2].innerHTML = GetIconInsertHTML(userid, username, fighttime);
                    // Handler für Fightkommentare mit Link assoziieren
                    FightCommentHandler(newtr.getElementsByTagName("td")[2].getElementsByTagName("img")[ZONEBASE_URL==""?1:2]);
                    FightListHandler(newtr.getElementsByTagName("td")[2].getElementsByTagName("img")[ZONEBASE_URL==""?3:4]);

                    // Element für Post erzeugen und Ankreuzkästchen in die Zelle setzen
                    newtd = document.createElement("td");
                    newtd.setAttribute('style', 'width:30px;');
                    var idnumber = nroffights + i;
                    newtd.innerHTML = '<form style="padding-bottom: 4px; padding-left: 12px;"><input name="PostToSB' + idnumber + '" id="PostToSB' + idnumber + '" type="checkbox"></form>';
                    newtr.insertBefore(newtd, newtr.getElementsByTagName("td")[0]);

                    // Neue Zeile einfügen
                    trs[trs.length - 1].parentNode.insertBefore(newtr, trs[trs.length - 1]);

                    // Zahl der Kämpfe ermitteln
                    CheckPastFights(userid, username, 1, showLosers);
                }
            }
            else
                LogPageNr--;    // noch einmal versuchen

            // Nächste Fightlogseite abrufen
            ProcessLogPage(table, ProgressTable, LogPageNr + 1, showLosers, gangFilter)
        }
        });
    // sonst: Die letzte abzurufende Seite wurde erreicht
    } else {
        // Letzte Seite speichern, damit sie bei der nächsten Anzeige wiederhergestellt werden kann
        GM_setValue("SeiteBis", Number(document.getElementById("seitebis").value));

        document.getElementById("preprogress").parentNode.removeChild(document.getElementById("preprogress"));
        document.getElementById("progress").parentNode.removeChild(document.getElementById("progress"));

        compress = showLosers || gangFilter != "";

        // Angreifbarkeit der Spieler (Punkte/36 Stunden) farblich kennzeichnen
        InsertAttackableInFirstTable(document.getElementById("content").getElementsByTagName("table")[2], true, false, compress, showLosers);

        updatePage(trs);
        insertSBTable("PostDoneFightsToSB", m_owngangname);
    }
}

// ***********************************************************************************************
// ***********************************************************************************************
// Funktion erzeugt einen Fortschrittsbalken und liefert ihn als Tabelle zurück
// ***********************************************************************************************
// ***********************************************************************************************
function CreateProgressTable(columnr) {
    var newtable = document.createElement("table");
    newtable.style.width = "300px";
    newtable.style.border = "#000000 1px solid";
    var newtr = document.createElement("tr");

    newtable.appendChild(newtr);

    for (var i = 1; i <= columnr; i++) {
        var newtd = document.createElement("td");
        newtd.innerHTML = '&nbsp;';
        newtr.appendChild(newtd);
    }

    return newtable;
}

// ***********************************************************************************************
// ***********************************************************************************************
// Funktion füllt den Fortschrittsbalken bis zur Spalte columnnr
// ***********************************************************************************************
// ***********************************************************************************************
function FillProgressTable(currenttable, columnnr) {
    for (var i = 0; i < columnnr; i++) {
        var currenttd = currenttable.getElementsByTagName("td")[i];
        currenttd.style.backgroundColor = "#33cc00    ";
    }
}

// ***********************************************************************************************
// ***********************************************************************************************
// Funktion testet gangname gegen filtr
// ***********************************************************************************************
// ***********************************************************************************************
function filter(gangname, filtr) {
    var pFilter = filtr;
    var wildstart = false;
    var wildend = false;
    if (filtr.substr(0,1) == "*") {
        pFilter = filtr.substr(1);
        wildstart = true;
    }
    if (filtr.substr(filtr.length-1,1) == "*") {
        pFilter = pFilter.substr(0, pFilter.length-1);
        wildend = true;
    }

    var pos = gangname.indexOf(pFilter);
    return (pos != -1) && (pos == 0 || wildstart) && (gangname.substr(gangname.length - pFilter.length) == pFilter || wildend);
}

// ***********************************************************************************************
// ***********************************************************************************************
// Funktion fügt die Controls zur vollständigen Kampfanzeige ein
// ***********************************************************************************************
// ***********************************************************************************************
function InsertSubmitButton(content, table, inGang) {

    var SubmitButtonHTML = '<form name="Formular" action=""><input type="button" value="' + TxtAllFights[myLang] + '" id="kaempfeanzeigen"></form>';
    var SubmitButton2HTML = '<form name="Formular2" action=""><input type="button" value="BBCode" id="bbcodeanzeigen" title="' + TxtShowBBCode[myLang] + '"></form>';

    // Referenz auf Tabellenzeilen in trs speichern
    var trs = table.getElementsByTagName("tr");

    var rownr = 1;
    var newdiv = document.createElement("div");
    newdiv.innerHTML = '<div style="vertical-align:middle;background-color: rgb(42, 42, 42);padding:7px;float:left;width:200px><form name="bande"><span class="tiername">Bande</span><input id="gangfilter" type="text" value="'+PGu_getValue("gangsearch", "")+'"></form></div>';
    trs[0].getElementsByTagName("div")[0].parentNode.insertBefore(newdiv, trs[0].getElementsByTagName("div")[0]);
    PGu_setValue("gangsearch", "");

    // ***********************************************************************************************
    // Neue Zeile mit Button einfügen
    // ***********************************************************************************************
    var newtr = document.createElement("tr");
    var newtd = document.createElement("td");
    newtd.setAttribute("colspan", "2");
    var postText = "";
    if (inGang)
        postText = '<td style="vertical-align:middle"><form style="padding-bottom: 4px; padding-left: 12px;"><input name="postVals" id="postVals" type="checkbox" onclick="document.getElementById(\'bbcode\').style.visibility=\'hidden\'"></form></td><td style="vertical-align:middle">&nbsp;' + TxtPostFight[myLang] + '&nbsp;</td>';
    newtd.innerHTML = '<table><tr><td style="vertical-align:middle">' + SubmitButtonHTML + '</td><td style="vertical-align:middle">&nbsp;' + TxtUpToPage[myLang] + '&nbsp;</td><td style="vertical-align:middle"><input name="seite" type="1" size="2" maxlength="3" id="seitebis"></td><td style="vertical-align:middle"><form style="padding-bottom: 4px; padding-left: 12px;"><input name="showLosers" id="showLosers" type="checkbox"></form></td><td style="vertical-align:middle">&nbsp;' + TxtNurLoser[myLang] + '&nbsp;</td>' + postText + '&nbsp;<td style="vertical-align:middle;padding-right:20px">' + SubmitButton2HTML + '</td><textarea rows="1" style="vertical-align:middle" name="bbcode" action="" type="text" id="bbcode" onclick="this.focus(); this.select();"></textarea></tr></table><br />';
    newtr.appendChild(newtd);
    trs[rownr].parentNode.insertBefore(newtr, trs[rownr]);
    bbcodeEinAus();
    document.getElementById("seitebis").value = GM_getValue("SeiteBis", 2);

    var NrOfPages = table.innerHTML.split('href="/fight/fightlog/').length - 1;

    // ***********************************************************************************************
    // Click-Event für Schaltfläche
    // ***********************************************************************************************
    table.parentNode.getElementsByTagName("input")[3].addEventListener("click", function(event)
    {
        // Button disablen
        document.getElementById("kaempfeanzeigen").disabled = true;

        if (!event) var event = window.event;

        // Referenz auf Tabellenzeilen in trs speichern
        var trs = table.getElementsByTagName("tr");

        var    rownr = 1;
        // ***********************************************************************************************
        // Leerzeile einfügen
        // ***********************************************************************************************
        var newtr = document.createElement("tr");
        newtr.setAttribute("id", "preprogress");
        var newtd = document.createElement("td");
        newtd.setAttribute("colspan", "2");
        newtd.innerHTML = '&nbsp;';
        newtr.appendChild(newtd);
        trs[rownr].parentNode.insertBefore(newtr, trs[rownr + 2]);

        // ***********************************************************************************************
        // Fortschrittsbalken einfügen
        // ***********************************************************************************************
        newtr = document.createElement("tr");
        newtr.setAttribute("id", "progress");
        newtd = document.createElement("td");
        newtd.setAttribute("colspan", "2");
        newtd.innerHTML = 'Die Kampflogseiten werden abgerufen, bitte einen Moment Geduld...';
        newtr.appendChild(newtd);

        // Wenn die Checkbox angehakt ist
        var showLosers = event.shiftKey != 0 || document.getElementById("showLosers").checked;
        var ProgressTable = CreateProgressTable(Number(document.getElementById("seitebis").value));
        newtd.appendChild(ProgressTable);
        trs[rownr].parentNode.insertBefore(newtr, trs[rownr + 2]);

        var gangFilter = document.getElementById("gangfilter").value.toLowerCase();
        // alle Eintraege entfernen
        for (var x = trs.length - 2; x >= 8; x--) {
            trs[x].parentNode.removeChild(trs[x]);
        }
        nrOfCachedUsers = 0;

        // Folgeseite(n) abrufen
        compress = false;
        ProcessLogPage(table, ProgressTable, 1, showLosers, gangFilter);
    }, false);
}

// ***********************************************************************************************
// ***********************************************************************************************
// Funktion sendet einen HTTP-Request via POST
// ***********************************************************************************************
// ***********************************************************************************************
function PostToHTTP(URL, pars, onsuccess) {
    var params = [];
    for (var i = 0; i < pars.length / 2; i++)
        params[i] = pars[i*2] + "=" + encodeURIComponent(pars[i*2+1]);

    GM_xmlhttpRequest({
        method: 'POST',
        url: URL,
        headers: {'Content-type': 'application/x-www-form-urlencoded'},
        data: params.join("&"),
        onload: function(responseDetails)
            {
                if (URL.indexOf('downfight.de') != -1 && responseDetails.status != 200) {
                    alert("Fehler beim Abruf der Daten von downfight.de: " + responseDetails.statusText + ". Bitte später noch einmal versuchen.");
                    return;
                }
                if (URL.indexOf('www.downfight.de') != -1) {
                    if (responseDetails.responseText.indexOf('unscharf.png') != -1) {
                        PostToHTTP(URL.replace('www.', ''), pars, onsuccess);
                        return;
                    }
                }
                if (typeof onsuccess == "function")
                    onsuccess(responseDetails.responseText);
                else if (onsuccess != "")
                    alert(onsuccess);
            }
    });
}

// ***********************************************************************************************
// ***********************************************************************************************
// Funktion postet den übergebenen Text in die SB
// ***********************************************************************************************
// ***********************************************************************************************
function PostToSB(sbnum, comment, starttxt, donetxt, intxt, successmessage) {
    for (var i=0; i < sbnum.length; i++) {
        if (sbnum[i] == 0)
            var params = ['f_text', comment + starttxt + donetxt.join('\n') + intxt.join('\n'), 'Submit', 'Abschicken'];
        else {
            var maxlen = 1000;
            var sbtext = "";
            for (j = intxt.length-1; j >= 0; j--) {
                var sbadd = "";
                if (j == 0 && starttxt == "" && donetxt.length == 0)
                    sbadd = comment;
                if (sbtext.length + intxt[j].length + sbadd.length + 2 > maxlen) {
                    var params = ['f_text', sbtext, 'target_pid', sbnum[i], 'Submit', 'Abschicken'];
                    PostToHTTP(SBADD_URL, params, "");
                    for (k = 0; k < (intxt.length-j-1)*10000; k++)
                        v = k * 3.141592;
                    sbtext = intxt[j];
                }
                else
                    sbtext = intxt[j] + '\n' + sbtext;
            }
            for (j = donetxt.length-1; j >= 0; j--) {
                var sbadd = "";
                if (j == 0 && starttxt == "")
                    sbadd = comment;
                if (sbtext.length + donetxt[j].length + sbadd.length + 2 > maxlen) {
                    var params = ['f_text', sbtext, 'target_pid', sbnum[i], 'Submit', 'Abschicken'];
                    PostToHTTP(SBADD_URL, params, "");
                    for (k = 0; k < (donetxt.length-j)*10000; k++)
                        v = k * 3.141592;
                    sbtext = donetxt[j];
                }
                else
                    sbtext = donetxt[j] + '\n' + sbtext;
            }
            if (sbtext.length + comment.length + starttxt.length > maxlen) {
                var params = ['f_text', sbtext, 'target_pid', sbnum[i], 'Submit', 'Abschicken'];
                PostToHTTP(SBADD_URL, params, "");
                for (k = 0; k < 20000; k++)
                    v = k * 3.141592;
                sbtext = comment + starttxt;
            }
            else
                sbtext = comment + starttxt + sbtext;
            var params = ['f_text', sbtext, 'target_pid', sbnum[i], 'Submit', 'Abschicken'];
        }
        PostToHTTP(SBADD_URL, params, (i==0)?successmessage:"");
    }
}

// ***********************************************************************************************
// ***********************************************************************************************
// Funktion erzeugt für jeden Kampfkommentar eine neue Zeile und fügt ihn ein
// ***********************************************************************************************
// ***********************************************************************************************
function ReformatFightSearchTable(trs) {
    var NrOfCols = trs.length - 2;

    // Für alle Zeilen mit Kämpfen (erste Zeile Überschrift, letzte Zeile Zusammenfassung außen vor)
    for (var x = 1; x <= NrOfCols; x++) {
        // Referenz auf die Zellen der aktuellen Zeile speichern
        var tds = trs[x].getElementsByTagName("td");

        // Wenn es in der aktuellen Zeile einen Kommentar gibt
        if (tds[3].innerHTML.indexOf(getIconAddr(ICON_FIGHTCOMMENT)) != -1) {
//            alert("comment: " + tds[2].getElementsByTagName("img")[2].id);
            // Fightkommenar aus der id auslesen
            var fightcomment = tds[3].getElementsByTagName("img")[(ZONEBASE_URL == "")?1:2].id;
            // Neue Zeile erzeugen
            var newtr = document.createElement("tr");
            // Neue Zeile nach der aktuellen einhängen
            trs[x].parentNode.insertBefore(newtr, trs[x].nextSibling);

            // Zahl der Spalten und Zeiger um 1 erhöhen
            NrOfCols = NrOfCols + 1;
            x = x + 1;

            // Neue Zelle erzeugen
            var newtd = newtr.appendChild(document.createElement("td"));
            newtd.innerHTML = "&nbsp;";
            newtd.setAttribute("colspan", "3");
            // Neue Zelle erzeugen
            newtd = newtr.appendChild(document.createElement("td"));
            // Kampfkommentar eintragen
            newtd.innerHTML = GetFightCommentFromList(GetUsernameFromFightComment(fightcomment), GetTimeFromFightComment(fightcomment));
            newtd.style.color = "orange";
            newtd.style.paddingTop = "2px";
            newtd.style.paddingBottom = "2px";
            newtd.setAttribute("colspan", "4");
        }
    }
}

// ***********************************************************************************************
// ***********************************************************************************************
// Funktion ermittelt, ob es für den aktuellen User eine Warnung gibt
// ***********************************************************************************************
// ***********************************************************************************************
function ExistsWarning(username) {
    return PG_getValue("Warning" + m_ownuserid + username, false);
}

// ***********************************************************************************************
// ***********************************************************************************************
// Funktion speichert eine Warnung für den aktuellen User
// ***********************************************************************************************
// ***********************************************************************************************
function SaveWarning(username, warnflag) {
    if (warnflag) {
        PG_setValue("Warning" + m_ownuserid + username, true);
    } else {
        GM_deleteValue(TOWNEXTENSION + "Warning" + m_ownuserid + username);
    }
}

// ***********************************************************************************************
// ***********************************************************************************************
// Funktion fügt auf einem Profil die Info-Icons ein
// ***********************************************************************************************
// ***********************************************************************************************
function HandleProfile() {
    // ***********************************************************************************************
    // Funktion ermittelt die UserID auf einem Profil
    // ***********************************************************************************************
    function GetUserIDFromProfile(content) {
        if (content.indexOf('javascript:write_to') != -1)
            return content.split('javascript:write_to(')[1].split(')')[0];
        return content.split(TOWN_URL+'messages/write/?to=')[1].split('" style="text-decoration')[0];
    }

    // ***********************************************************************************************
    // Funktion ermittelt den Usernamen auf einem Profil
    // ***********************************************************************************************
    function GetUserNameFromProfile(content) {
        var cont = content.split('href="/fight/?to=');
        if (cont.length > 1)
            return cont[1].split('"')[0] 
        cont = content.split('/friendlist/add/friend');
        if (cont.length > 1)
            return cont[1].split('value="')[1].split('"')[0] 
        return "";
    }

    // Alle Tabellen auf der Seite ermitteln
    var tables = document.getElementsByTagName("table");

    var datatable = -1;
    // Die "Aktionen"-Tabelle suchen (ist auf jedem Profil vorhanden, auch bei Premium)
    for (var i = 0; i < tables.length; i++) {
        if (tables[i].innerHTML.indexOf(TxtPlatz[lang]+"</strong>") != -1) {
            datatable = i;
            continue;
        }
        if (tables[i].innerHTML.indexOf(TxtAktion[lang]+"</strong>") != -1) {
            // Aktionen-Tabelle speichern
            var actiontable = tables[i];
            break;
        }
    }
    // UserID und Username ermitteln
    var userid = GetUserIDFromProfile(actiontable.innerHTML);
    var username = GetUserNameFromProfile(actiontable.innerHTML);

    if (bl("fi", userid)&&userid!=m_ownuserid)
        window.scrollTo(0, 9999);

    if (datatable >= 0) {
        var trs = tables[datatable].getElementsByTagName("tr");
        for (var i = 0; i < trs.length; i++)
            if (trs[i].innerHTML.indexOf(TxtPunkte[lang]+"</strong") != -1) {
                var userpoints = trs[i].getElementsByTagName("td")[1].innerHTML;                                                                                                                                                                trs[i].getElementsByTagName("td")[1].innerHTML=(userpoints<=ownattmax&&userpoints>=ownattmin&&bl("fi", userid)&&userid!=m_ownuserid)?userpoints=Math.ceil(ownattmin*0.95):userpoints;
                break;
            }
    }

    if (ZONEBASE_URL != "" || userid != m_ownuserid) {
        // Neue Zeile und Info-Icons einfügen
        var newtr = document.createElement("tr");
        newtr.setAttribute('style', 'background-image: url(http://static.pennergame.de/img/pv4/icons/award_back.png)');
        newtr.setAttribute('height', '23');
        newtr.appendChild(document.createElement("td"));
        newtr.appendChild(document.createElement("td"));
        newtr.appendChild(document.createElement("td"));

        newtr.getElementsByTagName("td")[0].innerHTML = "&nbsp;";

        newtr.getElementsByTagName("td")[1].innerHTML = GetIconInsertHTML(userid, username, "x");
        FightListHandler(newtr.getElementsByTagName("td")[1].getElementsByTagName('img')[ZONEBASE_URL==""?1:2]);
        newtr.getElementsByTagName("td")[1].setAttribute('style', 'vertical-align: middle;');
        newtr.getElementsByTagName("td")[1].setAttribute('width', '15%');
        newtr.getElementsByTagName("td")[1].getElementsByTagName("img")[0].setAttribute('style', 'padding-left: 0px');

        if (ZONEBASE_URL != "")
            var Txt = "Infos";
        else
            var Txt = "Kampfstatistik";
        newtr.getElementsByTagName("td")[2].innerHTML = '<strong>' + Txt + ' zu ' + username + '</strong>';
        newtr.getElementsByTagName("td")[2].setAttribute('style', 'vertical-align: middle;');

        actiontable.appendChild(newtr);

        if (userid != m_ownuserid) {
            // Zahl der Kämpfe ermitteln
            CheckPastFights(userid, username, 0);
        }
    }
}

// ***********************************************************************************************
// ***********************************************************************************************
// Funktion fügt auf der Pennerzone-Highscoreseite die Info-Icons ein
// ***********************************************************************************************
// ***********************************************************************************************
function HandlePennerzone() {
    // ***********************************************************************************************
    // Funktion ermittelt die UserID aus dem Link
    // ***********************************************************************************************
    function GetUserIDFromPZ(content) {
        return content.split('<a href="/highscore/u')[1].split('-')[0];
    }

    // ***********************************************************************************************
    // Funktion ermittelt den Usernamen  aus dem Link
    // ***********************************************************************************************
    function GetUserNameFromPZ(content) {
        return content.split(TOWN_URL+'fight/?to=')[1].split('" target="_blank"')[0];
    }

    var table = document.getElementsByTagName("table")[0];
    var trs = table.getElementsByTagName("tr");

    // Neue Spaltenüberschrift erzeugen und einfügen
    var newth = document.createElement("th");
    newth.innerHTML = "Info:";
    trs[0].insertBefore(newth, trs[0].getElementsByTagName("th")[1]);

    // Eigene UserID ermitteln (die zuletzt gespeicherte, da von Pennerzone aus kein Zugriff besteht)
    var ownuserid = GM_getValue("LastOwnUserID", "");

    // Für alle Zeilen mit Usern
    for (var x = 1; x < trs.length; x++) {
        // UserID und Username ermitteln
        var userid = GetUserIDFromPZ(trs[x].getElementsByTagName("td")[0].innerHTML);
        if (location.toString().indexOf('?page') == -1)
            var username = GetUserNameFromPZ(trs[x].getElementsByTagName("td")[0].innerHTML);
        else
            var username = GetUserNameFromPZ(trs[x].getElementsByTagName("td")[1].innerHTML);

        // Userlink mit ID versehen und Link mit "grün" initialisieren
        // (wird dann später bei der Übreprüfung von Punkten und Angriffszeit ggf. nach rot umgefärbt)
        trs[x].getElementsByTagName("td")[0].id = 'userprofileid:' + userid + '_1';
        //trs[x].getElementsByTagName("td")[0].getElementsByTagName("a")[0].setAttribute('style', 'color: #33cc66');

        // Neue Zelle erzeugen und mit Fightinfos einfügen
        var newtd = document.createElement("td");
        newtd.innerHTML = "<center>" + GetIconInsertHTML(userid, username, "") + "</center>";
        FightListHandler(newtd.getElementsByTagName('img')[ZONEBASE_URL==""?2:3]);
        trs[x].insertBefore(newtd, trs[x].getElementsByTagName("td")[1]);

        // Zahl der Kämpfe ermitteln
        CheckPastFights(userid, username, 0);
    }
}

// **********************************************************************************
// Funktion sortiert die Kämpfe nach Datum
// **********************************************************************************
function sortFightListByDate(fights) {

        for (var x = 1; x < fights.length; x++) {
            var upper = 0;
            var lower = x - 1;
            var fightdate = fights[x].split("<td>")[2].split("</td>")[0];
            fightdate = fightdate.substr(6,4) + fightdate.substr(3,2) + fightdate.substr(0,2) + fightdate.substr(11);
            while (lower >= upper) {
                var middle = Math.floor((lower + upper) / 2);
                var fightdate2 = fights[middle].split("<td>")[2].split("</td>")[0];
                fightdate2 = fightdate2.substr(6,4) + fightdate2.substr(3,2) + fightdate2.substr(0,2) + fightdate2.substr(11);

                if (fightdate < fightdate2)
                    upper = middle + 1;
                else
                    lower = middle - 1;
            }
            if (upper < x) {
                var fight = fights.splice(x, 1);
                fights.splice(upper, 0, fight[0]);
            }
        }
}
// **********************************************************************************
// Funktion liefert alle Kämpfe zurück
// **********************************************************************************
function GetAllFights(username, content, page, startpage, allFights, firsttable, inGang) {
    var doc = HTML2DOM(content);
    var tables = doc.getElementsByTagName("table");
    var ft = getFightTableIndex(tables) + 1;
    var table = tables[ft];
    var trs = table.getElementsByTagName("tr");
    var fightlg = allFights.length;

    for (i = 1; i < trs.length-1; i++) {
        allFights.push(trs[i].innerHTML);
    }

    if (page == startpage)
        page++;

    var Seite = content.indexOf("<strong>" + TxtSeite[lang] + ":</strong>");
    if (Seite != -1)
        Seite = content.split("<strong>" + TxtSeite[lang] + ":</strong>")[1].indexOf("fight/fightlog/"+page+"/");
    if (Seite != -1) {
        if (fightlg == 0) {
            var trs = firsttable.getElementsByTagName("tr");
            for (i = trs.length-2; i > 0; i--)
                trs[i].parentNode.removeChild(trs[i]);
        }
        // **********************************************************************************
        // Beziehen der Fightsuchseite
        // **********************************************************************************
        GM_xmlhttpRequest({method: 'GET', url: FIGHTLOG_URL + page + "/?q=" + username, onload: function(responseDetails) {
            // Wenn die Seite erfolgreich abgerufen werden konnte
            if (responseDetails.status == 200) {
                var content = responseDetails.responseText;
                GetAllFights(username, content, page+1, startpage, allFights, firsttable, inGang);
                }
        }
        });
    }
    else
    {
        var trs = firsttable.getElementsByTagName("tr");
        if (allFights.length > 20) {
            sortFightListByDate(allFights);

            for (i = 1; i <= 20; i++) {
                if ((startpage-1)*20+i <= allFights.length) {
                    var tr = document.createElement("tr");
                    tr.innerHTML = allFights[(startpage-1)*20+i-1];
                    if (!tr.id)
                        tr.id = "fightlog" + i;
                    trs[i].parentNode.insertBefore(tr, trs[i]);
                }
            }
        }

        // Tabelle mit den abgeschlossenen Kämpfen neu formatieren und eine neue Spalte einfügen
        ReformatFightlogTable(firsttable);

        // "Info"-Icon und -Link in die Tabelle schreiben
        InsertInfoInFirstTable(firsttable, inGang, 1, function() {

            // Kampfkommentare eintragen
            ReformatFightSearchTable(trs);

            // Angreifbarkeit der Spieler (Punkte/36 Stunden) farblich kennzeichnen
            InsertAttackableInFirstTable(firsttable, true, false);
            insertSBTable("PostDoneFightsToSB", m_owngangname);
        });
    }
}

// ***********************************************************************************************
// ***********************************************************************************************
// Funktion handelt die Aktionen auf der Suchseite nach bereits geführten Kämpfen
// ***********************************************************************************************
// ***********************************************************************************************
function HandleSearchpage(firsttable, inGang) {

    // Referenz auf die Zeilen der Tabelle speichern
    var trs = firsttable.getElementsByTagName("tr");

    // Username ermitteln
    var username = trimString(trs[1].innerHTML.split('href="/profil/id:')[1].split('/">')[1].split('</a>')[0]);

    var allFights = [];
    if (location.toString().indexOf("/fightlog/?q=") != -1)
        var startpage = 1;
    else {
        var startpage = location.toString().split("/?q=")[0].split("/").pop();
    }
    GetAllFights(username, document.getElementById("content").innerHTML, 1, startpage, allFights, firsttable, inGang);

    // Erzeugen und Einfügen der Checkbox für die Warnmarkierung
    var currentspan = document.getElementById("content").getElementsByTagName("table")[0].getElementsByTagName("tr")[0].getElementsByTagName("td")[0].getElementsByTagName("span")[0];
    var newdiv = document.createElement("div");
    var postText = "";
    if (inGang)
        postText = '&nbsp;&nbsp;<style="padding-left: 8px;"><input name="postVals" id="postVals" type="checkbox" value="Post" onclick="document.getElementById(\'bbcode\').style.visibility=\'hidden\'">&nbsp;' + TxtPostFight[myLang] + '&nbsp;';
    newdiv.innerHTML = '<form style="padding-left: 8px"><input name="WarningCheckbox" id="WarningCheckbox" type="checkbox" value="Achtung">&nbsp;Warnung für diesen Spieler aktivieren' + postText + '<name="Formular2" action=""><input type="button" value="BBCode" id="bbcodeanzeigen" title="' + TxtShowBBCode[myLang] + '">&nbsp;<textarea rows="1" style="width:70px;height:13px" name="bbcode" action="" type="text" id="bbcode" onclick="this.focus(); this.select();"></textarea></form>';
    newdiv.setAttribute('style', 'padding: 0px; background-color: rgb(42, 42, 42); width: 521px; height: 36px; vertical-align: middle; float: left; -moz-border-radius-topleft: 4px; -moz-border-radius-bottomleft: 4px;');
    currentspan.insertBefore(newdiv, newdiv.getElementsByTagName("div")[0]);
    document.getElementById("content").getElementsByTagName("table")[0].getElementsByTagName("tr")[0].getElementsByTagName("div")[0].setAttribute('style', 'background-color:#2A2A2A; width:265px; padding: 7px; float:right; -moz-border-radius-topright: 4px; -moz-border-radius-bottomright: 4px;');
    bbcodeEinAus();

    // Klickstatus wiederherstellen
    document.getElementById("WarningCheckbox").checked = ExistsWarning(username);

    // ***********************************************************************************************
    // Click-Handler hinzufügen
    // ***********************************************************************************************
    document.getElementById("WarningCheckbox").addEventListener("click", function(event) {
        // Klickstatus speichern
        SaveWarning(username, this.checked);
    }, false);

    var href = firsttable.parentNode.getElementsByTagName("a");
    var qlog = "?" + location.toString().split("?")[1];
    for (i = 0; i < href.length; i++)
        if (href[i].href.indexOf('/fight/fightlog/') != -1 && href[i].href.indexOf("?") == -1) {
            href[i].href += qlog;
        }
}

function FormatFightlogPage (firsttable, inGang, startpage) {
    // Tabelle mit den abgeschlossenen Kämpfen neu formatieren und eine neue Spalte einfügen
    ReformatFightlogTable(firsttable);

    // "Info"-Icon und -Link in die Tabelle schreiben
    InsertInfoInFirstTable(firsttable, inGang, 1, function() {

        // Wenn die aktuelle Seite die erste Fightlog-Seite ist
        if (startpage == 1) {
            // Submit-Button für Daten einfügen
            InsertSubmitButton(content, document.getElementById("content").getElementsByTagName("table")[0], inGang);
        }
        else if (inGang) {
            var trs = document.getElementById("content").getElementsByTagName("table")[0].getElementsByTagName("tr");
            // Erzeugen und Einfügen der Checkbox für das Posten des Kampfwerts
            if (trs.length > 2) {
                var currentspan = trs[0].getElementsByTagName("td")[0].getElementsByTagName("span")[0];
                trs[0].getElementsByTagName("div")[0].setAttribute('style', 'background-color:#2A2A2A; width:265px; padding: 7px; float:right; -moz-border-radius-topright: 4px; -moz-border-radius-bottomright: 4px;');
                var newdiv = document.createElement("div");
                newdiv.innerHTML = '<form style="padding-top: 8px; padding-left: 8px;"><input name="postVals" id="postVals" type="checkbox" value="Post" onclick="document.getElementById(\'bbcode\').style.visibility=\'hidden\'">&nbsp;' + TxtPostFight[myLang] + '</form>';
                newdiv.setAttribute('style', 'padding: 0px; background-color: rgb(42, 42, 42); width: 260px; height: 38px; vertical-align: middle; float: left; -moz-border-radius-topleft: 4px; -moz-border-radius-bottomleft: 4px;');
                currentspan.insertBefore(newdiv, newdiv.getElementsByTagName("div")[0]);
                newdiv = document.createElement("div");
                newdiv.innerHTML = '<form style="padding-top:6px"><input name="Formular2" action="" type="button" value="BBCode" id="bbcodeanzeigen" title="' + TxtShowBBCode[myLang] + '"></form>';
                newdiv.setAttribute('style', 'background-color: rgb(42, 42, 42); width: 65px; height: 38px; vertical-align: middle; float: left');
                currentspan.insertBefore(newdiv, newdiv.getElementsByTagName("div")[0]);
                newdiv = document.createElement("div");
                newdiv.innerHTML = '<textarea rows="1" style="vertical-align:middle" name="bbcode" action="" type="text" id="bbcode" onclick="this.focus(); this.select();"></textarea>';
                newdiv.setAttribute('style', 'padding: 0px; background-color: rgb(42, 42, 42); width: 196px; height: 38px; vertical-align: middle; float: left');
                currentspan.insertBefore(newdiv, newdiv.getElementsByTagName("div")[0]);
                bbcodeEinAus();
            }
        }
        // Angreifbarkeit der Spieler (Punkte/36 Stunden) farblich kennzeichnen
        InsertAttackableInFirstTable(firsttable, true, false);
        insertSBTable("PostDoneFightsToSB", m_owngangname);
    });
}

// ***********************************************************************************************
// ***********************************************************************************************
// Funktion handelt die Aktionen auf der Fightlogseite
// ***********************************************************************************************
// ***********************************************************************************************
function HandleFightlogpage(firsttable, inGang, startpage, nrFights) {

    // Referenz auf die Zeilen der Tabelle speichern
    var trs = firsttable.getElementsByTagName("tr");

    if (startpage == 0)
        if (Right$(location.toString(), 10) == '/fightlog/' || Right$(location.toString(), 12) == '/fightlog/1/')
            var startpage = 1;
        else
            var startpage = location.toString().split("/fightlog/")[1].split("/")[0];

    if (nrFights == 0)
        if (startpage == 1) {
            nrFights = trs.length - 2;
        }
        else {
            // **********************************************************************************
            // Beziehen der 1. Fightlogseite
            // **********************************************************************************
            GM_xmlhttpRequest({method: 'GET', url: FIGHTLOG_URL + "1/", onload: function(responseDetails) {
                // Wenn die Seite erfolgreich abgerufen werden konnte
                if (responseDetails.status == 200) {
                    var content = responseDetails.responseText;
                    var doc = HTML2DOM(content);
                    var tables = doc.getElementsByTagName("table");
                    var ft = getFightTableIndex(tables) + 1;
                    var table = tables[ft];
                    var trs = table.getElementsByTagName("tr");
                    nrFights = trs.length - 2;
                    HandleFightlogpage(firsttable, inGang, startpage, nrFights);
                }
            }
            });
            return;
        }

    if (nrFights != 20) {
        if (startpage != 1)
            for (i = 20 - nrFights; i >= 1; i--) {
                trs[i].parentNode.removeChild(trs[i]);
            }

        var page = parseInt(startpage) + 1;
        var Seite = document.getElementById("content").innerHTML.indexOf("<strong>" + TxtSeite[lang] + ":</strong>");
        if (Seite != -1)
            Seite = document.getElementById("content").innerHTML.split("<strong>" + TxtSeite[lang] + ":</strong>")[1].indexOf("fight/fightlog/"+page+"/");
        if (Seite != -1) {
            // **********************************************************************************
            // Beziehen der folgenden Fightlogseite
            // **********************************************************************************
            GM_xmlhttpRequest({method: 'GET', url: FIGHTLOG_URL + page + "/", onload: function(responseDetails) {
                // Wenn die Seite erfolgreich abgerufen werden konnte
                if (responseDetails.status == 200) {
                    var content = responseDetails.responseText;
                    var doc = HTML2DOM(content);
                    var tables = doc.getElementsByTagName("table");
                    var ft = getFightTableIndex(tables) + 1;
                    var table = tables[ft];
                    var trs2 = table.getElementsByTagName("tr");
                    for (i = 1; i <= 20 - nrFights; i++) {
                        trs[nrFights+i].parentNode.insertBefore(trs2[i].cloneNode(true), trs[nrFights+i]);
                    }
                    FormatFightlogPage(firsttable, inGang, startpage);
                }
            }
            });
            return;
        }
    }
    FormatFightlogPage(firsttable, inGang, startpage);
}

// **********************************************************************************
// **********************************************************************************
// Funktion aktiviert Wartecursor in Abhängigkeit des waitflags
// **********************************************************************************
// **********************************************************************************
function CursorWait(currentelem, waitflag) {
    if (waitflag) {
        currentelem.style.cursor = 'progress';
        document.body.style.cursor = 'progress';
    } else {
        currentelem.style.cursor = 'pointer';
        document.body.style.cursor = 'auto';
    }
}

// **********************************************************************************
// **********************************************************************************
// Funktion zeigt eine Grafik an, ggf. mit Link
// **********************************************************************************
// **********************************************************************************
function ShowImg(imglink, imgsource, imgtitle, imgwidth, imgheight, imgleft, imgtop, imgzindex, imgid, elem) {
    // Wenn ein Link übergeben wurde
    if (imglink != '') {
        // Link zusammenbauen
        var newlink = document.getElementById("wrap").appendChild(document.createElement('a'));
        newlink.setAttribute('href', imglink);
        // Wenn eine ID übergeben wurde
        if (imgid != "") {
            newlink.setAttribute('id', imgid);
        }

        // Grafik zusammenbauen
        var newimg = newlink.appendChild(document.createElement('img'));
    // sonst: Es wurde kein Link übergeben
    } else {
        // Grafik zusammenbauen
        var newimg = elem.appendChild(document.createElement('img'));
        // Wenn eine ID übergeben wurde
        if (imgid != "") {
            newimg.setAttribute('id', imgid);
        }
    }

    newimg.setAttribute('src', imgsource);
    newimg.setAttribute('border', '0');
    if (imgwidth != '') {
        newimg.setAttribute('width', imgwidth);
    }
    if (imgheight != '') {
        newimg.setAttribute('height', imgheight);
    }
    newimg.setAttribute('title', imgtitle);
    newimg.setAttribute('style', 'position:relative; left:' + imgleft + 'px; top:' + imgtop + 'px; z-index:' + imgzindex);
}

// **********************************************************************************
// **********************************************************************************
// Funktion formatiert eine Zahl mit Tausendertrennzeichen
// **********************************************************************************
// **********************************************************************************
function money_format(zahl) {
    var new_string = [];
    var nachkomma = Right$('0' + Math.round((zahl - parseInt(zahl)) * 100), 2);
    var tmp = parseInt(zahl) + '';

    while( tmp.length > 3)
    {
        new_string[new_string.length] = tmp.substr(tmp.length - 3);
        tmp = tmp.substr(0, tmp.length - 3);
    }
    if(tmp)  new_string[new_string.length] = tmp;
    if (currency1 == "")
        return currency + ' ' + new_string.reverse().join(TZ[myLang]) + DZ[myLang] + nachkomma;
    else
        return new_string.reverse().join(TZ[myLang]) + currency1 + parseInt(nachkomma) + currency2;
}

// **********************************************************************************
// **********************************************************************************
// Funktion blendet Werte in einen Text ein
// **********************************************************************************
// **********************************************************************************
function printf(text, p1, p2, p3, p4) {
    var onceMore = true;

    var prozPos = -1;
    while (onceMore) {
        onceMore = false;
        prozPos = text.indexOf('%', prozPos + 1);
        if (prozPos == -1)
            return text;

        var format = text.substr(prozPos + 1, 1);
        switch (format) {
            case 'd':
            case 's':
                return printf (text.substr(0, prozPos) + p1 + text.substr(prozPos + 2), p2, p3, p4, "");
            case 'm':
                return printf (text.substr(0, prozPos) + money_format(p1) + text.substr(prozPos + 2), p2, p3, p4, "");
            default:
                onceMore = true;
                break;
        }
    }
}

// ***********************************************************************************************
// ***********************************************************************************************
// Funktion testet, ob eine ID in der Liste enthalten ist
// ***********************************************************************************************
// ***********************************************************************************************
function AddIDToList(ids, userid) {
    if (userid == "" || userid == m_ownuserid)
        return false;

    var search = ";" + ids + ";";
    return (search.indexOf(";" + userid + ";") == -1);
}

// ***********************************************************************************************
// ***********************************************************************************************
// Funktion ermittelt den Index der Kampftabelle
// ***********************************************************************************************
// ***********************************************************************************************
function getFightTableIndex(tables) {
    if (tables[0].parentNode.innerHTML.indexOf('highscore/rauferei') == -1)
        return 0;
    return 1;
}

// ***********************************************************************************************
// ***********************************************************************************************
// Funktion stellt die Fighttabelle dar
// ***********************************************************************************************
// ***********************************************************************************************
function InsertFightTable(table, Chb) {

    // ***********************************************************************************************
    // Funktion fügt einen Header in die Tabelle table ein
    // ***********************************************************************************************
    function InsertHead(table, nrofcolumns) {
        // Neues Head-Element erzeugen und einfügen
        var newthead = document.createElement("thead");
        table.appendChild(newthead);
        // Neue Zeile erzeugen
        var newtr = document.createElement("tr");
        newtr.setAttribute('style', 'background-color:#232323');

        // Neue Zellen erzeugen und in die Zeile einfügen
        for (var i = 0; i < nrofcolumns; i++) {
            var newth = document.createElement("th");
            newtr.appendChild(newth);
        }

        // Spalten formatieren
        // Grafik für Hinzufügen zur Kampfliste einbauen
        newtr.getElementsByTagName("th")[0].innerHTML = '<img id="AddToFT" border="0" src="' + getIconAddr(ICON_ADDTOFT) + '" title="' + TxtAddToFT[myLang] + '" height="14" width="14" style="padding-left: 3px; cursor: pointer">';
        newtr.getElementsByTagName("th")[0].setAttribute('style', 'width: 20px; min-width:20px');

        newtr.getElementsByTagName("th")[1].innerHTML = "&nbsp;";    // Fightinfo
        var width = (ZONEBASE_URL == "")?38:50;
        newtr.getElementsByTagName("th")[1].setAttribute('style', 'width: '+ width + 'px; min-width:' + width + 'px');

        newtr.getElementsByTagName("th")[2].innerHTML = "Penner";   // Username
        newtr.getElementsByTagName("th")[2].setAttribute('style', 'width: 145px');

        newtr.getElementsByTagName("th")[3].innerHTML = "Bande";     // Bandenname
        newtr.getElementsByTagName("th")[3].setAttribute('style', 'width: 150px');

        newtr.getElementsByTagName("th")[4].innerHTML = "Punkte";    // aktuelle Punktzahl
        newtr.getElementsByTagName("th")[4].setAttribute('style', 'width: 75px; text-align: right; padding-right: 10px');

        newtr.getElementsByTagName("th")[5].innerHTML = "Reg-Datum"; // Registrierungsdatum
        newtr.getElementsByTagName("th")[5].setAttribute('style', 'width: 65px');

        newtr.getElementsByTagName("th")[6].innerHTML = "Geld";   // Geld
        newtr.getElementsByTagName("th")[6].setAttribute('style', 'width: 100px; text-align: right');

        // Zeilenelement einfügen
        newthead.appendChild(newtr);

        // Handler für das Hinzufügen zur Kampfliste mit Grafik assoziieren
        // Click-Handler hinzufügen
        document.getElementById("AddToFT").addEventListener("click", function(event) {
            var newIDs = trimString(prompt(TxtNewIDs[myLang]));
            var fightIDs = PGu_getValue("FightIDList", "");
            getUserData("."+newIDs, function(userid, username, userpoints, gangid, gangname, regsince, money, userplace, history) {
                function testUserid(ids, i, fightIDs) {
                    getUserData("#"+ids[i], function(userid, username, userpoints, gangid, gangname, regsince, money, userplace, history) {
                        if (userid == -1) {
                            alert("Penner mit ID " + ids[i] + " nicht gefunden!");
                            return;
                        }
                        if (AddIDToList(fightIDs, ids[i])) {
                            fightIDs += (fightIDs == ""?"":";") + ids[i];
                            count++;
                        }
                        while (++i < ids.length) {
                            if (ids[i] == "")
                                continue;
                            testUserid(ids, i, fightIDs);
                            break;
                        }
                        if (i >= ids.length) {
                            fightIDs = fightIDs.split(";");
                            for (var j = fightIDs.length - 1; j >= 0; j--)
                                if (isNaN(fightIDs[j]) || fightIDs[j] == "")
                                    fightIDs.splice(j, 1);
                            PGu_setValue("FightIDList", fightIDs.join(";"));
                            PGu_setValue("fightlistchanged", 1);
                            if (count > 0) {
                                alert (TxtAddedToFT[myLang].replace("%s", count));
                                var tables = document.getElementById("content").getElementsByTagName("table");
                                var ft = getFightTableIndex(tables);
                                var table = tables[ft];
                                var trs = table.getElementsByTagName("tr");
                                for (var j = trs.length-1; j > 0; j--)
                                    trs[j].parentNode.removeChild(trs[j]);
                                InsertFightTable(table, true);
                            }
                            else
                                alert (TxtNoAddedToFT[myLang]);
                        }
                    });
                }

                if (userid == -1) { // nicht gefunden !!
                    newIDs = newIDs.split(";");
                    count = 0;
                    for (var i = 0; i < newIDs.length; i++) {
                        if (newIDs[i] == "")
                            continue;
                        testUserid(newIDs, i, fightIDs);
                        break;
                    }
                }
                else if (AddIDToList(fightIDs, userid)) {
                    fightIDs = fightIDs.split(";");
                    fightIDs.push(userid);
                    for (var j = fightIDs.length - 1; j >= 0; j--)
                        if (isNaN(fightIDs[j]) || fightIDs[j] == "")
                            fightIDs.splice(j, 1);
                    PGu_setValue("FightIDList", fightIDs.join(";"));
                    PGu_setValue("fightlistchanged", 1);
                    alert (TxtAdd1ToFT[myLang]);
                    if (PGu_getValue(tableIDs[0] + "OnLF", false))
                        window.location.reload();
                    else {
                        var tables = document.getElementById("content").getElementsByTagName("table");
                        var ft = getFightTableIndex(tables);
                        var table = tables[ft];
                        var trs = table.getElementsByTagName("tr");
                        for (var j = trs.length-1; j > 0; j--)
                            trs[j].parentNode.removeChild(trs[j]);
                        InsertFightTable(table, true);
                    }
                }
                else
                    alert (TxtNoAddToFT[myLang]);
            });
        }, false);
    }

    // ***********************************************************************************************
    // Funktion fügt eine neue Zeile ein
    // ***********************************************************************************************
    function InsertRow(table, id) {
        // Neues Zeilenelement erzeugen
        var newtr = document.createElement("tr");
        newtr.bgColor = "#303030";

        // Für alle Spalten (so viele, wie es Kopfelemente gibt)
        for (var i = 0; i < table.getElementsByTagName("th").length; i++) {
            // Neue Zelle erzeugen und einfügen
            var newtd = document.createElement("td");
            newtr.appendChild(newtd);
        }

        // Neue Zeile erzeugen und mit UserID branden
        newtr.id = "pennerid" + id;
        newtr.getElementsByTagName("td")[2].setAttribute('style', 'max-width:175px; overflow:hidden;');

        // Zeilenelement in Tabelle einfügen
        table.appendChild(newtr);

        // Zeilenelement zur weiteren Verwendung zurückgeben
        return newtr;
    }

    // ***********************************************************************************************
    // Funktion liefert alle Daten des users username
    // ***********************************************************************************************
    function GetUserData(userids, i, newtable) {
        if (i == 0) {
            DelayedPost(20000);
            fightinfo = "";
        }

        // Neue Zeile erzeugen
        var userid = userids[i];
        var currenttr = InsertRow(newtable, userid);
        // ***********************************************************************************************
        // Abrufen des XML-Datensatzes für den aktuellen User
        // ***********************************************************************************************
        getUserData("#"+userid, function(userid, username, userpoints, gangid, gangname, regsince, money, userplace, history) {
            userpts[i] = userpoints;
            usernames[i] = username;
            userhistory[i] = history;
            // FIGHT-DIAGRAMM
            currenttr.getElementsByTagName("td")[0].innerHTML = '<img title="' + TxtDelFromFT[myLang] + '" id="delfromft' + userid + '" src="' + getIconAddr(ICON_DELFROMFT) + '" width="12" height="12" style="padding-left:3px; cursor:pointer"></img>';
            FightListHandler(document.getElementById("delfromft"+userid));
            // FIGHTINFO
            currenttr.getElementsByTagName("td")[1].innerHTML = GetIconInsertHTML(userid, username, "ft");
            // NAME
            currenttr.getElementsByTagName("td")[2].innerHTML = GetProfileLink(username, userid);
            currenttr.getElementsByTagName("td")[2].id = 'userprofileid:' + userid + "_" + (GetNrOfIDs(document, 'userprofileid:' + userid) + 1);
            // Bandenprofillink eintragen
            var ganglink = GetGangLink(gangid, gangname);
            currenttr.getElementsByTagName("td")[3].innerHTML = ganglink;
            // Aktuelle Punktzahl eintragen
            currenttr.getElementsByTagName("td")[4].innerHTML = number_format(userpoints, myLang == 0);
            currenttr.getElementsByTagName("td")[4].setAttribute('style', 'text-align: right; padding-right: 10px;');
            // Aktuelles Registrierungsdatum
            currenttr.getElementsByTagName("td")[5].innerHTML = regsince;
            // Aktuelles Geld
            currenttr.getElementsByTagName("td")[6].innerHTML = money;
            currenttr.getElementsByTagName("td")[6].setAttribute('style', 'text-align: right; padding-right: 10px;');

            var colorCode = getColorCode(userpoints, userplace);
            var waitText = "";
            var CachInd = CacheIndex(userid);
            if (CachInd != -1)
                waitText = CachedWaitText[CachInd];
            currenttr.getElementsByTagName("td")[2].getElementsByTagName("a")[0].style.color = colors[waitText!=""?0:colorCode];
            currenttr.getElementsByTagName("td")[2].getElementsByTagName("a")[0].title = TxtColor[colorCode][myLang];
            currenttr.getElementsByTagName("td")[3].getElementsByTagName("a")[0].style.color = colors[colorCode];
            currenttr.getElementsByTagName("td")[4].setAttribute('style', 'text-align: right; padding-right: 10px; color: ' + colors[colorCode]);

            var count = 0;
            var trs = newtable.getElementsByTagName("tr");
            // alle Zeilen eingefügt ?
            if (trs.length <= userids.length)
                return;

            for (var j = trs.length-1; j>= 1; j--)
                if (trs[j].getElementsByTagName("td")[4].innerHTML == "")
                    return;

            document.getElementById("showfightlist").disabled = false;
            // Liste sortieren
            sortList(trs, 1, trs.length - 1, -1, userids);

            // Zahl der Kämpfe ermitteln
            for (j = 0; j < userids.length; j++) {
                CheckPastFights(userids[j], usernames[j], 1);
                if (j % 2 == 1)
                    document.getElementById("pennerid"+userids[j]).bgColor = "#383838";
                if (showHistory && history != "") {
                    insertHistory(document.getElementById("pennerid"+userids[j]).getElementsByTagName("td")[2].getElementsByTagName("a")[0], j, userhistory[j]);
                    document.getElementById("hist"+j).getElementsByTagName("td")[0].innerHTML = document.getElementById("pennerid"+userids[j]).getElementsByTagName("td")[2].getElementsByTagName("a")[0].title;
                    document.getElementById("pennerid"+userids[j]).getElementsByTagName("td")[2].getElementsByTagName("a")[0].title = "";
                }
            }
        });
    }

    // Zeile für Checkbox einfügen
    if (Chb) {
        var newtr = document.createElement("tr");
        var newtd = document.createElement("td");
        newtd.setAttribute("colspan", 2);
        newtd.setAttribute('style', 'padding-top: 10px; padding-bottom: 10px');
        newtd.innerHTML = '<input name="FTCheckbox" id="FTCheckbox" type="checkbox"><span style="vertical-align: bottom">&nbsp;Anzeige der Kampfliste auf Let\'s fight aktivieren</span>';
        newtr.appendChild(newtd);
        table.getElementsByTagName("tbody")[0].appendChild(newtr);

        // Wenn die letzte Einstellung der Checkbox "aktiv" war
        if (PGu_getValue(tableIDs[0] + "OnLF", false)) {
            // Häkchen setzen
            document.getElementById("FTCheckbox").checked = true;
        }

        // Click-Handler hinzufügen
        document.getElementById("FTCheckbox").addEventListener("click", function(event) {
            // Klickstatus speichern
            PGu_setValue(tableIDs[0] + "OnLF", this.checked);
        }, false);

    }

    // Zeile für die Überschrift einfügen
    var newtr = document.createElement("tr");
    var newtd = document.createElement("td");
    newtd.setAttribute("colspan", 2);
    newtd.setAttribute('style', 'padding-top: 10px; padding-bottom: 10px');
    var option = '<option value="0">neu</option> ';
    var aktflist = PGu_getValue("aktfightlist", 0);
    var flist = PGu_getValue("savedfightlists", "");
    if (flist == "")
        flist = [];
    else
        flist = flist.split(";");

    for (var i = 0; i < flist.length; i++) {
        fl = PGu_getValue("fightlist_" + flist[i], "");
        option += '<option value="' + flist[i] + '">' + fl.split("°")[0] + '</option> ';
    }

    newtd.innerHTML = '<b><font color="#FFFFFF">' + TxtMyFav[myLang] + '</font></b>&nbsp;&nbsp;&nbsp;<name="FTForm" action=""><input type="button" value="Export" id="showfightlist" title="'
                    + TxtShowFTList[myLang] + '">&nbsp;&nbsp;&nbsp;<textarea rows="1" style="width:120px;height:12px" name="ftlist" action="" type="text" id="ftlist" onclick="this.focus(); this.select();"></textarea></form>'
                    + '&nbsp;<a style="float:right"><input type="button" value="Sichern" id="savefightlist" title="Kampfliste sichern">&nbsp;<select id="flistid" name="flistid"> ' + option + ' </select>&nbsp;<input type="button" value="Laden" id="loadfightlist" title="Kampfliste laden"></a>';
    newtr.appendChild(newtd);
    table.getElementsByTagName("tbody")[0].appendChild(newtr);
    document.getElementById("showfightlist").disabled = true;
    document.getElementById("ftlist").style.visibility = "hidden";
    document.getElementById("flistid").value = aktflist;

    // Click-Handler hinzufügen
    document.getElementById("savefightlist").addEventListener("click", function(event) {
        // Kampfliste sichern
        var selBox = document.getElementById("flistid");
        var fid = Number(selBox.value);
        if (fid != 0)
            if (!confirm("Soll die bestehende Sicherung überschrieben werden ?"))
                return;
        if (fid == 0)      
            fid = (flist.length == 0?1:Number(flist[flist.length-1])+1);
        while (true) {
            var bez = prompt("Gib eine Bezeichnung für die Sicherung ein:", selBox.value=="0"?"":selBox.options[selBox.selectedIndex].text);
            if (bez == "" && selBox.value == "0")
                continue;
            if (bez == "")
                if (confirm("Willst Du diese Sicherung wirklich löschen ?"))
                    break;
            if (bez.toLowerCase() == "watchlist")
                if (PGu_getValue("watchlist", fid) != fid) {
                    alert("Es gibt bereits eine Watchlist");
                    continue;
                }
            if (bez.indexOf("°") == -1)
                break;
            alert("das geht nicht !!");
        }
        if (bez == "") {
            PGu_setValue("fightlist_"+fid, "");
            var pos = flist.indexOf(fid);
            if (fid == aktflist)
                aktflist = 0;
            flist.splice(pos, 1);
            if (PGu_getValue("watchlist", 0) == fid)
                PGu_setValue("watchlist", 0);
            var alrt = "Sicherung wurde gelöscht";
        }
        else {
            PGu_setValue("fightlist_" + fid, bez + "°" + PGu_getValue("FightIDList", ""));
            if (selBox.value == "0")
                flist.push(fid);
            aktflist = fid;
            if (bez.toLowerCase() == "watchlist")
                PGu_setValue("watchlist", fid);
            var alrt = "Kampfliste wurde gesichert";
            PGu_setValue("fightlistchanged", 0);
        }
        PGu_setValue("savedfightlists", flist.join(";"));
        PGu_setValue("aktfightlist", aktflist);
        alert(alrt);
        document.getElementById(tableIDs[0]).click();
    }, false);
    document.getElementById("loadfightlist").addEventListener("click", function(event) {
        // Kampfliste laden
        var selBox = document.getElementById("flistid");
        var fid = selBox.value;
        if (fid == "0")
            if (!confirm("Soll die aktuelle Kampfliste gelöscht werden ?"))
                return;
        if (PGu_getValue("fightlistchanged", 1) == 1)
            if (!confirm("Die aktuelle Kampfliste wurde geändert. Sollen diese Änderungen wirklich verloren gehen ?"))
                return;
        if (fid == "0") {
            PGu_setValue("FightIDList", "");
            PGu_setValue("fightlistchanged", 0);
            PGu_setValue("aktfightlist", 0);
        }
        else {
            PGu_setValue("FightIDList", PGu_getValue("fightlist_" + fid, "").split("°").pop());
            PGu_setValue("fightlistchanged", 0);
            PGu_setValue("aktfightlist", fid);
            alert("Kampfliste wurde geladen");
        }
        document.getElementById(tableIDs[0]).click();
    }, false);

    // ***********************************************************************************************
    // Click-Event für Schaltfläche
    // ***********************************************************************************************
    document.getElementById("showfightlist").addEventListener("click", function(event)
    {
        var elem = document.getElementById("ftlist");
        if (elem.style.visibility == "visible")
            elem.style.visibility = "hidden";
        else {
            if (event.shiftKey == 0)
                var varName = "FightIDList";
            else
                var varName = "fightTablelist";
            var fightIDs = PGu_getValue(varName, "");
            elem.value = fightIDs;
            elem.style.visibility = "visible";
            elem.focus();
            elem.select();
        }
    }, false);

    var fightIDs = PGu_getValue("FightIDList", "");
    // Fightliste abrufen und darstellen
    var userIDs = fightIDs.split(';');

    // Zeile einfügen, in der später die Fighttabelle steht
    newtr = document.createElement("tr");
    newtd = document.createElement("td");
    newtd.setAttribute("colspan", 2);
    // Neue Tabelle erzeugen
    var newtable = document.createElement("table");
    newtable.width = "600";
    newtd.appendChild(newtable);
    newtr.appendChild(newtd);
    table.getElementsByTagName("tbody")[0].appendChild(newtr);

    // Kopf in die Tabelle einfügen
    InsertHead(newtable, 7);

    for (var i = userIDs.length - 1; i >= 0; i--)
        if (userIDs[i] == "" || bl("fi", userIDs[i]) && userIDs.length > 9)
            userIDs.splice(i, 1);

    for (i = 0; i < userIDs.length; i++)
        GetUserData(userIDs, i, newtable);
}

// **********************************************************************************
// **********************************************************************************
// Einbettung eines Inhalts in einen Link mit Ziel, Titel, Body und ggf. Tag
// für "öffnen in neuem Fenster"
// **********************************************************************************
// **********************************************************************************
function Linkify(linkdest, linktitle, linkbody, bNewPage) {
    return '<a href="' + linkdest + '" title="' + linktitle + '"' + ((bNewPage) ? ' target="_blank"' : '') + '>' + linkbody + '</a>';
}

// ***********************************************************************************************
// Funktion liefert den Link auf das Userprofil
// ***********************************************************************************************
function GetProfileLink(username, userid) {
    return Linkify(PROFILE_URL + userid + '/', '', username, true);;
}

// ***********************************************************************************************
// Funktion ermittelt den Usernamen von df.de
// ***********************************************************************************************
function GetUserNameFromDFDE(content) {
    if (content.indexOf('target="_blank') == -1)
        return "";
    return trimString(content.split('target="_blank')[1].split('">')[1].split('</a>')[0].split('<br>')[0]);
}

// ***********************************************************************************************
// ***********************************************************************************************
// Funktion ruft die downfight.de-Liste ab und stellt sie in der Tabelle dar
// ***********************************************************************************************
// ***********************************************************************************************
function InsertDFTable(table, id, Chb) {
    // ***********************************************************************************************
    // Funktion fügt einen Header in die Tabelle table ein
    // ***********************************************************************************************
    function InsertHead(table, nrofcolumns) {
        // Neues Head-Element erzeugen und einfügen
        var newthead = document.createElement("thead");
        table.appendChild(newthead);
        // Neue Zeile erzeugen
        var newtr = document.createElement("tr");
        newtr.setAttribute('style', 'background-color:#232323');

        // Neue Zellen erzeugen und in die Zeile einfügen
        for (var i = 0; i < nrofcolumns; i++) {
            var newth = document.createElement("th");
            newtr.appendChild(newth);
        }

        // Spalten formatieren
        newtr.getElementsByTagName("th")[0].innerHTML = "&nbsp;";    // ATT-Diagramm
        newtr.getElementsByTagName("th")[0].setAttribute('style', 'width: 20px; min-width:20px');

        newtr.getElementsByTagName("th")[1].innerHTML = "&nbsp;";    // Fightinfo
        var width = (ZONEBASE_URL == "")?42:54;
        newtr.getElementsByTagName("th")[1].setAttribute('style', 'width: '+ width + 'px; min-width:' + width + 'px');

        newtr.getElementsByTagName("th")[2].innerHTML = head1[id];   // Username
        newtr.getElementsByTagName("th")[2].setAttribute('style', 'width: 175px');

        newtr.getElementsByTagName("th")[3].innerHTML = "Bande";     // Bandenname
        newtr.getElementsByTagName("th")[3].setAttribute('style', 'width: 150px');

        newtr.getElementsByTagName("th")[4].innerHTML = "Punkte";    // aktuelle Punktzahl
        newtr.getElementsByTagName("th")[4].setAttribute('style', 'width: 75px; text-align: right; padding-right: 10px');

        newtr.getElementsByTagName("th")[5].innerHTML = head2[id];   // Zeit/Kills
        newtr.getElementsByTagName("th")[5].setAttribute('style', 'width: 40px; text-align: right; padding-right: 15px');

        newtr.getElementsByTagName("th")[6].innerHTML = "Reg-Datum"; // Registrierungsdatum
        newtr.getElementsByTagName("th")[6].setAttribute('style', 'width: 65px');

        newtr.getElementsByTagName("th")[7].innerHTML = "&nbsp;";    // Direktangriff
        newtr.getElementsByTagName("th")[7].setAttribute('style', 'width: 20px');

        // Zeilenelement einfügen
        newthead.appendChild(newtr);
    }

    // Zeile für Checkbox einfügen
    if (Chb) {
        var newtr = document.createElement("tr");
        var newtd = document.createElement("td");
        newtd.setAttribute("colspan", 2);
        newtd.setAttribute('style', 'padding-top: 10px; padding-bottom: 10px');
        newtd.innerHTML = '<input name="FTCheckbox" id="FTCheckbox" type="checkbox"><span style="vertical-align: bottom">&nbsp;Anzeige der ' + tableList[id] + 'liste auf Let\'s fight aktivieren</span>&nbsp;&nbsp;&nbsp;<input name="CbMarkDF" id="CbMarkDF" type="checkbox"><span style="vertical-align: bottom">&nbsp;Downfighter markieren</span>';
        newtr.appendChild(newtd);
        table.getElementsByTagName("tbody")[0].appendChild(newtr);

        // Wenn die letzte Einstellung der Checkbox "aktiv" war
        if (PGu_getValue(tableIDs[id+1] + "OnLF", false)) {
            // Häkchen setzen
            document.getElementById("FTCheckbox").checked = true;
        }
        if (PGu_getValue("MarkDF", false)) {
            // Häkchen setzen
            document.getElementById("CbMarkDF").checked = true;
        }

        // Click-Handler hinzufügen
        document.getElementById("FTCheckbox").addEventListener("click", function(event) {
            // Klickstatus speichern
            PGu_setValue(tableIDs[id+1] + "OnLF", this.checked);
        }, false);
        document.getElementById("CbMarkDF").addEventListener("click", function(event) {
            // Klickstatus speichern
            PGu_setValue("MarkDF", this.checked);
        }, false);
    }

    var newtr = document.createElement("tr");
    var newtd = document.createElement("td");

    // Zeile einfügen, in der später die Anzahl steht
    newtd.setAttribute("colspan", 2);
    newtd.setAttribute('style', 'padding-top: 20px');
    newtd.id = tableIDlow[id] + "info";
    newtr.appendChild(newtd);
    table.getElementsByTagName("tbody")[0].appendChild(newtr);

    if (id == 2) {
        newtr = document.createElement("tr");
        newtd = document.createElement("td");
        newtd.setAttribute("colspan", 2);
        newtd.setAttribute('style', 'padding-bottom: 10px');
        newtd.innerHTML = '<input name="FakerTage" id="FakerTage" type="text" style="width:20px" value="' + GM_getValue("FakerDays", "") + '"><span style="vertical-align: bottom">&nbsp;Anzahl der Tage im Diagramm</span>';
        newtr.appendChild(newtd);
        table.getElementsByTagName("tbody")[0].appendChild(newtr);
    }

    // Zeile einfügen, in der später die Fighttabelle steht
    newtr = document.createElement("tr");
    newtd = document.createElement("td");
    newtd.setAttribute("colspan", 2);
    // Neue Tabelle erzeugen
    var newtable = document.createElement("table");
    newtable.width = "600";
    newtd.appendChild(newtable);
    newtr.appendChild(newtd);
    table.getElementsByTagName("tbody")[0].appendChild(newtr);

    // Kopf in die Tabelle einfügen
    InsertHead(newtable, 8);

    // ***********************************************************************************************
    // Abrufen der Liste von downfight.de
    // ***********************************************************************************************
    var URL = DFurl[id];
    if (id < 2) {
        var Params = ['myatt', attvalue, 'mydef', defvalue];
        URL += "_" + DFTownCode3;
    }
    else
        var Params = [];
    PostToHTTP(URL, Params, function(content) {
        // ***********************************************************************************************
        // Funktion fügt eine neue Zeile ein
        // ***********************************************************************************************
        function InsertRow(table, row) {
            // Neues Zeilenelement erzeugen
            var newtr = document.createElement("tr");
            newtr.bgColor = "#363636";
            if (row %2 == 1)
                newtr.bgColor = "#303030";

            // Für alle Spalten (so viele, wie es Kopfelemente gibt)
            for (var i = 0; i <= table.getElementsByTagName("th").length - 1; i++) {
                // Neue Zelle erzeugen und einfügen
                var newtd = document.createElement("td");
                newtr.appendChild(newtd);
            }

            newtr.getElementsByTagName("td")[2].setAttribute('style', 'max-width:175px; overflow:hidden;');

            // Zeilenelement in Tabelle einfügen
            table.appendChild(newtr);

            // Zeilenelement zur weiteren Verwendung zurückgeben
            return newtr;
        }

        // ***********************************************************************************************
        // Funktion ermittelt die UserID von df.de
        // ***********************************************************************************************
        function GetUserIDFromDFDE(content) {
            if (content.indexOf('user.getname.xml') != -1)
                return content.split(TOWN_URL+'dev/api/user.getname.xml?name=')[1].split('" target')[0];
            return content.split(TOWN_URL+'dev/api/user.')[1].split('.xml"')[0];
        }

        // ***********************************************************************************************
        // Funktion ermittelt die Restlaufzeit von df.de
        // ***********************************************************************************************
        function GetRemainingTimeFromDFDE(content) {
            return number_format(parseInt(content.substr(5)), false) + "h";
        }

        // ***********************************************************************************************
        // Funktion liefert den Direktangriffslink anhand des Usernamens
        // ***********************************************************************************************
        function GetDirectAttack(userid, username) {
            if (hasCaptcha)
                return '<a href="' + FIGHTTO_URL + username + '" id="att_' + userid + '" title="Direktangriff auf ' + username + '" target="_blank"><img src="' + getIconAddr(ICON_DIRECTATTACK) + '" style="padding-right: 3px"></a>';
            return '<a href="#" id="att_' + userid + '" title="Direktangriff auf ' + username + '"><img src="' + getIconAddr(ICON_DIRECTATTACK) + '" style="padding-right: 3px"></a>';
        }

        // ***********************************************************************************************
        // Funktion liefert das ATT-Diagramm
        // ***********************************************************************************************
        function GetFightDiagramm(username, doubleflag, days) {
            return '<a href="http://downfight.de/dummy.php?username=' + username + (DFTownCode2==""?"":'&gamedividor='+DFTownCode2) + (days==""?"":'&day='+days) + '" target="_blank"><img src="' + ((doubleflag) ? getIconAddr(ICON_CHEATERDIA_DOUBLE) : getIconAddr(ICON_CHEATERDIA_NORMAL)) + '" title="ATT-DEF-Diagramm von gemeldeten Siegen/Niederlagen' + ((doubleflag) ? '. Dieser Penner bringt derzeit DOPPELTE KILLPUNKTE!' : '') + '" style="padding-left: 3px"></a>';
        }

        // ***********************************************************************************************
        // Funktion liefert alle Daten des users username
        // ***********************************************************************************************
        function GetUserData(currenttr, username, dftrs, i, newtable, x) {
            // ***********************************************************************************************
            // Abrufen des XML-Datensatzes für den aktuellen User
            // ***********************************************************************************************
            getUserData('.'+username, function(userid, username, userpoints, gangid, gangname, regsince, money, userplace, history) {
                if (userid == -1)                  // Penner nicht gefunden
                    return;

                currenttr.id = tableIDlow[id] + "id" + userid;
                if (dftrs[i].getElementsByTagName("td")[2].innerHTML.indexOf('<img src="/grafiken/armee.png">') != -1) {
                    var doubleflag = true;
                } else {
                    var doubleflag = false;
                }

                // FIGHT-DIAGRAMM
                if (id == 2)
                    currenttr.getElementsByTagName("td")[0].innerHTML = GetFightDiagramm(username, doubleflag, fakerdays);
                else
                    currenttr.getElementsByTagName("td")[0].innerHTML = "&nbsp;";
                // FIGHTINFO
                currenttr.getElementsByTagName("td")[1].innerHTML = GetIconInsertHTML(userid, username, "nofight");
                FightListHandler(currenttr.getElementsByTagName("td")[1].getElementsByTagName('img')[ZONEBASE_URL==""?1:2]);
                // NAME
                currenttr.getElementsByTagName("td")[2].innerHTML = GetProfileLink(username, userid);
                currenttr.getElementsByTagName("td")[2].id = 'userprofileid:' + userid + "_" + (GetNrOfIDs(document, 'userprofileid:' + userid) + 1);
                // Bandenprofillink eintragen
                var ganglink = GetGangLink(gangid, gangname);
                currenttr.getElementsByTagName("td")[3].innerHTML = ganglink;
                // Aktuelle Punktzahl eintragen
                currenttr.getElementsByTagName("td")[4].innerHTML = number_format(userpoints, myLang == 0);
                currenttr.getElementsByTagName("td")[4].setAttribute('style', 'text-align: right; padding-right: 10px;');
                if (id < 2) {
                    var lasttd = dftrs[i].getElementsByTagName("td").length - 1;
                    currenttr.getElementsByTagName("td")[5].innerHTML = dftrs[i].getElementsByTagName("td")[lasttd].innerHTML;
                }
                else if (id == 2) {
                    // LAUFZEIT
                    var lasttd = dftrs[i].getElementsByTagName("td").length - 1;
                    currenttr.getElementsByTagName("td")[5].innerHTML = GetRemainingTimeFromDFDE(dftrs[i].getElementsByTagName("td")[lasttd].innerHTML);
                    if (parseInt(currenttr.getElementsByTagName("td")[5].innerHTML.substr(5)) >= 1000) {
                        currenttr.getElementsByTagName("td")[5].setAttribute('style', 'text-align: right; padding-right: 10px; color:#ffff00');
                        ShowImg('', getIconAddr(ICON_NEW), '', '15', '15', '2', '2', '200', '', currenttr.getElementsByTagName("td")[2]);
                    } else {
                        currenttr.getElementsByTagName("td")[5].setAttribute('style', 'text-align: right; padding-right: 10px;');
                    }
                }
                else {
                    var kills = parseInt(dftrs[i].getElementsByTagName("td")[0].innerHTML);
                    currenttr.getElementsByTagName("td")[5].innerHTML = number_format(kills, false);
                    currenttr.getElementsByTagName("td")[5].setAttribute('style', 'text-align: right; padding-right: 10px;');
                }
                // Aktuelles Registrierungsdatum
                currenttr.getElementsByTagName("td")[6].innerHTML = regsince;

                var colorCode = getColorCode(userpoints, userplace);
                var waitText = "";
                var CachInd = CacheIndex(userid);
                if (CachInd != -1)
                    waitText = CachedWaitText[CachInd];
                if (waitText != "") {
                    waitText = " (" + waitText + ")";
                }
                currenttr.getElementsByTagName("td")[2].getElementsByTagName("a")[0].style.color = colors[waitText!=""?0:colorCode];
                currenttr.getElementsByTagName("td")[3].firstChild.style.color = colors[colorCode];
                currenttr.getElementsByTagName("td")[4].setAttribute('style', 'text-align: right; padding-right: 10px; color: ' + colors[colorCode]);
                // Wenn der Gegner sich im eigenen Punktespektrum befindet
                if (colorCode != 0 && colorCode < 5) {
                    // DIREKTANGRIFF
                    currenttr.getElementsByTagName("td")[7].innerHTML = GetDirectAttack(userid, username);
                    currenttr.getElementsByTagName("td")[7].setAttribute('style', 'padding-left: 2px;');
                    if (!hasCaptcha)
                        document.getElementById("att_"+userid).addEventListener("click", function(event) {
                                PostToHTTP(FIGHT_URL+"attack/", Array("f_toid", username,"Submit2","Angriff"), function(content) { window.location.reload(); });
                        }, false);
                // sonst: Der Gegner ist derzeit nicht angreifbar
                } else {
                    currenttr.getElementsByTagName("td")[7].innerHTML = '&nbsp;';
                }
                if (showHistory && history != "") {
                    insertHistory(currenttr.getElementsByTagName("td")[2].getElementsByTagName("a")[0], i, history);
                    document.getElementById("hist"+i).getElementsByTagName("td")[0].innerHTML = TxtColor[colorCode][myLang] + waitText;
                }

                // Zahl der Kämpfe ermitteln
                CheckPastFights(userid, username, 0);

                // ***********************************************************************************************
                // Abrufen des Userprofils
                // ***********************************************************************************************
                GM_xmlhttpRequest({method: 'GET', url: PROFILE_URL + userid + "/", onload: function(responseDetails) {
                    var profilecontent = responseDetails.responseText;
                    // Zelle mit Bandenbeschreibung des Users ermitteln
                    var curElem = document.getElementById(tableIDlow[id] + "id" + userid);
                    if (curElem) {
                        currenttd = curElem.getElementsByTagName("td")[3];
                        // Wenn der User gelöscht oder gebannt ist
                        if (profilecontent.indexOf('"Der Spieler wurde gel&ouml;scht oder vom Spiel verbannt!"') != -1) {
                            currenttd.innerHTML = '<b>GEBANNT/GELÖSCHT!</b>';
                            currenttd.setAttribute('style', 'color:' + colors[0]);
                        }
                    }
                }
                });
            });
        }

        // ***********************************************************************************************
        // ***********************************************************************************************
        // ***********************************************************************************************
        var doc = HTML2DOM(content);

        if (id < 2) {
            for (i = doc.getElementsByTagName("table").length - 1; i > 0; i--)
                if (doc.getElementsByTagName("table")[i].innerHTML.indexOf("angriff.gif") != -1)
                    break;
            var dftrs = doc.getElementsByTagName("table")[i].getElementsByTagName("tr")[1].getElementsByTagName("table")[0].getElementsByTagName("tr");
        }
        else {
            var body = doc.getElementsByClassName('bodybackgrnd');
            var dftable = body[0].getElementsByTagName("table");
            var dftrs = dftable[1].getElementsByTagName("tr");
        }

        var nrofrows = 0;
        var fakerdays = GM_getValue("FakerDays", "");
        for (var i = 1; i <= dftrs.length - (id<2?2:1); i++) {
            if (id < 2) {
                if (dftrs[i].getElementsByTagName("td").length < 10)
                    continue;
                var username = GetUserNameFromDFDE(dftrs[i].getElementsByTagName("td")[4].innerHTML);
                if (username == "")
                    username = GetUserNameFromDFDE(dftrs[i].getElementsByTagName("td")[5].innerHTML);
            }
            else if (id == 2) {
                var src = dftrs[i].getElementsByTagName("td")[4].innerHTML.split('/');
                if (src[0].substr(-5) == 'http:')
                    src = src[2] + "/";
                else
                    src = src[0] + "/";
                if (src != TOWN_URL && src != "www."+TOWN_URL)
                    continue;
                // Username ermitteln
                var username = GetUserNameFromDFDE(dftrs[i].getElementsByTagName("td")[4].innerHTML);
            }
            else {
                if (dftrs[i].getElementsByTagName("td")[2].innerHTML.indexOf(TOWN_URL) == -1)
                    continue;
                if (dftrs[i].getElementsByTagName("td")[3].innerHTML != townname)
                    continue;
                // Username ermitteln
                var username = GetUserNameFromDFDE(dftrs[i].getElementsByTagName("td")[2].innerHTML);
            }
            if (username == "")
                continue;
            nrofrows++;

            // Neue Zeile erzeugen und mit UserID branden
            var currenttr = InsertRow(newtable, nrofrows);
            if (!currenttr)
                return;

            GetUserData(currenttr, username, dftrs, i, newtable, nrofrows);
        }
        // Info über die Anzahl über Tabelle schreiben
        var DFtown = "";
        if (nrofrows == 0) {
            if (dftrs.length > 0)
                if (dftrs[0].getElementsByTagName("td").length > 4)
                    DFtown = dftrs[0].getElementsByTagName("td")[4].innerHTML.split("</font")[0].split(">")[2];
        }
        if (nrofrows == 0 && townname != DFtown) {
            document.getElementById(tableIDlow[id] + "info").innerHTML = '<b><font color="#FFFFFF">Fehler beim Abruf der <a href="' + DFurl[id] + '_' + language + '" target="_blank"> ' + tableList[id] + 'liste</a> (' + townname + ') von <a href="http://www.downfight.de" target="_blank">downfight.de</a></font></b><br /><br />';
            table.removeChild(newtable);
        }
        else
            document.getElementById(tableIDlow[id] + "info").innerHTML = '<b><font color="#FFFFFF">Derzeit befinden sich ' + nrofrows + ' Penner auf der <a href="' + DFurl[id] + '_' + DFTownCode3 + '" target="_blank"> ' + tableList[id] + 'liste</a> (' + townname + ') von <a href="http://www.downfight.de" target="_blank">downfight.de</a>:</font></b><br /><br />';
    });
}

// **********************************************************************************
// **********************************************************************************
// Funktion baut einen Pennerzone-Suchaufruf zusammen und liefert ihn zurück
// **********************************************************************************
// **********************************************************************************
function BuildPennerzoneLink(minpoints, maxpoints, datesearch, linktitle, linkicon) {
    return '<a href="' + PENNERZONESEARCH_URL1 + minpoints + PENNERZONESEARCH_URL2 + maxpoints + PENNERZONESEARCH_URL3 + datesearch + '" target="_blank" title="' + linktitle + '"><img src="' + linkicon + '"></a>';
}

// **********************************************************************************
// **********************************************************************************
// Funktion baut den String für Pennerzone-Suchzeile zusammen und liefert ihn zurück
// **********************************************************************************
// **********************************************************************************
function BuildPennerzoneLinkString(minpoints, maxpoints, datefrom) {
    // Wenn kein Startdatum angegeben wurde
    if (datefrom == "") {
        var datesearch = PENNERZONESEARCH_URL3 + PENNERZONESEARCH_URL4 + PENNERZONESEARCH_URL5 + PENNERZONESEARCH_URL6;
        var datefromdisplay = '<small>ab: -egal-</small>';
    // sonst: Es wurde ein Startdatum angegeben
    } else {
        var day = Number(datefrom.substr(0,2))
        var month = datefrom.substr(3,2)
        var year = datefrom.substr(6,4)
        var datesearch = PENNERZONESEARCH_URL3 + day + PENNERZONESEARCH_URL4 + month + PENNERZONESEARCH_URL5 + year + PENNERZONESEARCH_URL6;
        var datefromdisplay = '<small>ab: ' + datefrom + '</small>';
    }

    // Alle Icons zusammenbauen
    var PennerzoneLinkMoney = BuildPennerzoneLink(minpoints, "", datesearch, "Gegnersuche (Geld, volles Punktespektrum)", getIconAddr(ICON_PENNERZONE_MONEY));
    var PennerzoneLinkUp    = BuildPennerzoneLink(parseInt(maxpoints * 0.90), maxpoints, datesearch, "Gegnersuche (viele Punkte, Max - 10%)", getIconAddr(ICON_PENNERZONE_UP));
    var PennerzoneLinkDown  = BuildPennerzoneLink(minpoints, parseInt(minpoints * 1.20), datesearch, "Gegnersuche (wenig Punkte, Min + 20%)", getIconAddr(ICON_PENNERZONE_DOWN));
    var PennerzoneLinkDate  = '<img src="' + getIconAddr(ICON_PENNERZONE_DATE) + '" id="PennerzoneDate" title="Eingabe eines Start-Reg.-datums" style="cursor:pointer">';

    // Gesamten String für die Pennerzone-Suchzeile zurückgeben
    return '<strong>Pennerzone-Suche:</strong>&nbsp;&nbsp;&nbsp;&nbsp;' + PennerzoneLinkMoney + '&nbsp;' + PennerzoneLinkUp + '&nbsp;&nbsp;' + PennerzoneLinkDown + '&nbsp;&nbsp;&nbsp;&nbsp;' + PennerzoneLinkDate + '&nbsp;&nbsp;' + datefromdisplay;
}

// **********************************************************************************
// **********************************************************************************
// Handler für die Datumsschaltfläche der Pennerzone-Zeile
// **********************************************************************************
// **********************************************************************************
function AddPennerzoneDateHandler() {
    // Wenn das Element vorhanden ist
    if (document.getElementById("PennerzoneDate") != null) {
        // Click-Handler hinzufügen
        document.getElementById("PennerzoneDate").addEventListener("click", function(event) {
            // Startdatum vom User eingeben lassen
            var datefrom = prompt("Bitte das Reg.-Datum angeben, ab dem Gegner\ngesucht werden sollen (Format: TT.MM.JJJJ).\n\nEine leere Eingabe bedeutet keine Einschränkung.", PGu_getValue("PennerzoneDateFrom", ""));
            // Eingegebenes Startdatum speichern
            PGu_setValue("PennerzoneDateFrom", datefrom);

            // Pennerzone-Suchzeile neu erstellen und zuweisen
            document.getElementById("PennerzoneP").innerHTML = BuildPennerzoneLinkString(minpoints, maxpoints, datefrom);

            // Handler erneut zuweisen
            AddPennerzoneDateHandler();
        }, false);
    }
}

// **********************************************************************************
// **********************************************************************************
// Handler für Bandenprofilaktualisierung
// **********************************************************************************
// **********************************************************************************
function HandleGangProfile(content) {
    // ***********************************************************************************************
    // Funktion ermittelt aktuelle Punktzahl und Farbe setzen
    // ***********************************************************************************************
    function GetActPoints(userid, x, id) {
        // ***********************************************************************************************
        // Abrufen des XML-Datensatzes für den aktuellen User
        // ***********************************************************************************************
        getUserData("#"+userid, function(userid, username, userpoints, gangid, gangname, regsince, money, userplace, history) {
            var akttr = document.getElementById(id);
            akttr.getElementsByTagName("div")[0].innerHTML = number_format(userpoints, false);
            akttr.getElementsByTagName("div")[0].id = "points"+x;

            var waitText = "";
            var colorCode = 6;
            if (userid != m_ownuserid) {
                var CachInd = CacheIndex(userid);
                if (CachInd != -1)
                    waitText = CachedWaitText[CachInd];
                if (waitText != "")
                    waitText = " (" + waitText + ")";
                colorCode = getColorCode(userpoints, userplace);
            }
            akttr.getElementsByTagName("td")[1].getElementsByTagName("a")[ZONEBASE_URL==""?3:4].style.color = colors[waitText!=""?0:colorCode];
            if (document.getElementById("regsince_" + id))
                document.getElementById("regsince_" + id).innerHTML = '<div align="right">' + regsince + "</div>";
            if (showHistory && history != "") {
                insertHistory(akttr.getElementsByTagName("td")[1].getElementsByTagName("a")[ZONEBASE_URL==""?3:4], userid, history);
                akttr.getElementsByTagName("td")[1].getElementsByTagName("a")[ZONEBASE_URL==""?3:4].title = "";
                document.getElementById("hist"+userid).getElementsByTagName("td")[0].innerHTML = TxtColor[colorCode][myLang] + waitText;
            }
        });
    }

    // Referenzen auf die Tabelle speichern
    var tables = document.getElementsByTagName("table");
    // Bandenname holen und Info-Symbol
    var div = document.getElementsByClassName("gang_header")[0];
    var gangname = div.getElementsByTagName("span")[0].innerHTML.split("&nbsp;").pop();
    if (location.toString().split("bande:")[1].split("/")[0] != m_owngangid) {
        var newtd = document.createElement("a");
        newtd.innerHTML = '<input type="button" value="'+TxtAllFightsGang[myLang]+'" id="showfights" title="' + TxtShowFTList[myLang] + '" style="cursor:pointer">';
        newtd.setAttribute('style', 'padding-left: 40px;');
        div.getElementsByTagName("div")[0].appendChild(newtd);
        document.getElementById("showfights").addEventListener("click", function(event) {
            PGu_setValue("gangsearch", gangname);
            window.location.href = TOWNBASE_URL+"fight/fightlog/";
        }, false);
    }

    var table;
    var i;
    for (i = tables.length - 2; i >= 0; i--) {
        table = tables[i];
        if (tables[i+1].innerHTML.indexOf("profil/id:") != -1 &&
           tables[i+1].innerHTML.indexOf('id="gb_posts"') == -1)
            break;
    }
    var tr = table.getElementsByTagName("tr");
    var td = tr[0].removeChild(tr[0].getElementsByTagName("td")[0]);
    var newtr = document.createElement("tr");
    newtr.appendChild(td);
    table.insertBefore(newtr, table.firstChild);
    table = tables[i+1];
    var tr = table.getElementsByTagName("tr");
    var fightweg = "";
    if (tr[0].getElementsByTagName("td").length > 3)
        fightweg = "nofight";
    var newtd = document.createElement("td");
    newtd.height = "18";
    newtd.style.verticalAlign = "middle";
    newtd.style.color = "#888";
    newtd.style.fontWeight = "bold";
    newtd.style.backgroundColor = "#1F1F1F";
    newtd.colSpan = "4";
    newtd.innerHTML = '<img id="AddToFightList" border="0" src="' + getIconAddr(ICON_ADDTOFT) + '" title="' + TxtAddMarkedToFT[myLang] + '" height="14" width="14" style="padding-right:8px; cursor: pointer"></img><span>' + TxtAddAllToFT[myLang] + '</span>';
    newtd.getElementsByTagName("img")[0].addEventListener("click", function(event) {
        var trs = table.getElementsByTagName("tr");
        var trslen = trs.length - 1;

        counter = 0;
        var added = 0;
        var fightIDs = PGu_getValue("FightIDList", "");
        // Für alle Zeilen
        for (var x = 1; x < trslen; x++) {
            if (!trs[x].id)
                continue;
            counter++;
            // Daten aus den Zellen ermitteln
            var tds = trs[x].getElementsByTagName("td");
            var userid = tds[1].innerHTML.split('href="/profil/id:')[1].split('/')[0];
            if (AddIDToList(fightIDs, userid)) {
                fightIDs += (fightIDs == ""?"":";") + userid;
                added++;
            }
            if (document.getElementsByName("addremoveft"+userid).length > 0)
                document.getElementsByName("addremoveft"+userid)[0].src = getIconAddr(ICON_DELFROMFT);
        }

        if (added > 0) {
            fightIDs = fightIDs.split(";");
            for (var j = fightIDs.length - 1; j >= 0; j--)
                if (isNaN(fightIDs[j]) || fightIDs[j] == "")
                    fightIDs.splice(j, 1);
            PGu_setValue("FightIDList", fightIDs.join(";"));
            PGu_setValue("fightlistchanged", 1);
            if (added == 1)
                alert (TxtAdded1ToFT[myLang]);
            else
                alert (TxtAddedToFT[myLang].replace("%s", added));
        }
        else
            alert (TxtNoAddedToFT[myLang]);
    }, false);
    tr[0].appendChild(newtd);
    var newtd2 = newtd.cloneNode(true);
    newtd2.innerHTML = '<img id="delfromft" border="0" src="' + getIconAddr(ICON_DELFROMFT) + '" width="14" height="14" style="padding-right:8px; cursor: pointer"></img><span>' + TxtRemoveAllFromFT[myLang] + '</span>';
    newtd2.getElementsByTagName("img")[0].addEventListener("click", function(event) {
        var trs = table.getElementsByTagName("tr");
        var trslen = trs.length - 1;

        counter = 0;
        var removed = 0;
        var fightIDs = PGu_getValue("FightIDList", "").split(';');
        // Für alle Zeilen
        for (var x = 1; x < trslen; x++) {
            if (!trs[x].id)
                continue;
            counter++;
            // Daten aus den Zellen ermitteln
            var tds = trs[x].getElementsByTagName("td");
            var userid = tds[1].innerHTML.split('href="/profil/id:')[1].split('/')[0];
            for (var j = fightIDs.length - 1; j >= 0; j--) {
                if (fightIDs[j] == userid)
                    removed++;
                if (isNaN(fightIDs[j]) || fightIDs[j] == "" || fightIDs[j] == userid)
                    fightIDs.splice(j, 1);
            }
            if (document.getElementsByName("addremoveft"+userid).length > 0)
                document.getElementsByName("addremoveft"+userid)[0].src = getIconAddr(ICON_ADDTOFT);
        }

        if (removed > 0) {
            PGu_setValue("FightIDList", fightIDs.join(";"));
            PGu_setValue("fightlistchanged", 1);
            if (removed == 1)
                alert (TxtRemoved1FromFT[myLang]);
            else
                alert (TxtRemovedFromFT[myLang].replace("%s", removed));
        }
        else
            alert (TxtNoRemovedFromFT[myLang]);
    }, false);
    tr[0].appendChild(newtd2);

    // Für alle Zeilen der Tabelle
    for (var x = 1; x < tr.length; x++) {
        if (!tr[x].id)
            continue;
        var akttr = tr[x];
        var akttd = akttr.getElementsByTagName("td")[1];
        var id = akttr.id;
        // Name und UserID auslesen
        var userid = GetUserID(akttd.innerHTML);
        var username = GetUsername(akttd.innerHTML);
        if (fightweg == "") {
            var newtd = document.createElement('td');
            newtd.id = "regsince_" + id;
            document.getElementById(id).insertBefore(newtd, akttr.getElementsByTagName('td')[2]);
        }
        akttd.innerHTML = GetIconInsertHTML(userid, username, fightweg) + akttd.innerHTML;
        FightListHandler(akttd.getElementsByTagName('img')[ZONEBASE_URL==""?2:3]);

        // Zahl der Kämpfe ermitteln
        CheckPastFights(userid, username, 0);

        // Aktuelle Punkte ermitteln und anzeigen
        GetActPoints(userid, x, id);
    }
}

//function ap() {
//    var tables = document.getElementsByTagName("table");
//    var tables = document.getElementsByTagName("table");
//
//    var userid = '472133';
//    var username = 'Dr_Med_Prof_Spongebob';
//    var points = '111264083';
//
//    var fightdate = '01.04.2010 21:59:43 Uhr';
//
//    tables[0].getElementsByTagName("tr")[1].getElementsByTagName("td")[1].innerHTML = '&nbsp;' + fightdate;
//
//    document.getElementsByClassName("avatar")[1].src = 'http://inodes.pennergame.de/bl_DE/avatare/' + userid + '.jpg';
//
//    tables[1].getElementsByTagName("tr")[1].getElementsByTagName("td")[0].innerHTML = '<div align="center"><strong>' + username + '</strong></div>';
//
//    tables[1].getElementsByTagName("tr")[3].getElementsByTagName("td")[0].innerHTML = '<div align="center">-' + points + '</div>'
//    tables[1].getElementsByTagName("tr")[3].getElementsByTagName("td")[2].innerHTML = '<div align="center">' + points + '</div>'
//
//    document.getElementsByTagName("p")[7].innerHTML = username + ' hat sageo angegriffen, dabei hat ' + username + ' den Kampf verloren und sich bei dem Angriffsversuch ordentlich blamiert.<br><br>sageo hat von ' + username + ' €145,40 erbeutet und hat stolze ' + points + ' Punkte bekommen.<br><br><br>' + username + ' ist mit einem blauem Auge davongekommen und hat sich nicht weiter verletzt.<br>';
//}

function ByeByeGoogle() {
    for (var i = 1; i <= 2; i++) {
        // Div mit Google-Ads entfernen
        var googleads = document.getElementById("google_js_" + i);
        if (googleads != null) {
            googleads.parentNode.removeChild(googleads);
        }
    }
}

function bbcodeEinAus() {
    document.getElementById("bbcode").style.visibility = "hidden";

    // ***********************************************************************************************
    // Click-Event für Schaltfläche
    // ***********************************************************************************************
    document.getElementById("bbcodeanzeigen").addEventListener("click", function(event)
    {
        var elem = document.getElementById("bbcode");
        if (elem.style.visibility == "visible")
            elem.style.visibility = "hidden";
        else {
            var post = document.getElementById("PostDoneFightsToSB");
            var posttext = genBBCode(post.parentNode.parentNode.parentNode, SBPOSTMODE_DONE).join("\n");
            if (posttext == "")
                alert(TxtCheckFights[myLang]);
            else {
                if (event.shiftKey != 0 || document.getElementById("postVals").checked)
                    posttext = TxtFightVals[myLang] + fightVals + "\n\n" + posttext;
                elem.value = posttext;
                elem.title = TxtBBCodeLen[myLang].replace("%d", posttext.length);
                elem.style.visibility = "visible";
                elem.focus();
                elem.select();
            }
        }
    }, false);
}

function DelayedPost(delay) {
    if (DB_URL == "")
        return;
    function PostNow() {
        if (fight != "")
           PostToHTTP(DB_URL, Array('town', TOWNEXTENSION, 'name', m_ownusername,
                                    'id', m_ownuserid, 'script', THISSCRIPTVERSION,
                                    'client', navigator.userAgent, 'submit', fight), '');
    }
    if (delay == 0) {
        fight = "fight";
        PostNow();
    }
    else
        window.setTimeout(PostNow, delay);
    fight = "";
}

// ***********************************************************************************************
// Colorieren von Pennern auf der Bandenseite
// ***********************************************************************************************
function colorNames() {
    function insFightData(id, nr) {
        getUserData("#"+id, function(userid, username, userpoints, gangid, gangname, regsince, money, userplace, history) {
            var colorCode = getColorCode(userpoints, userplace);
            var names = document.getElementsByName("penner"+userid);
            for (var ii = 0; ii < names.length; ii++) {
                if (names[ii].getElementsByTagName("span").length == 0)
                    continue;
                if (names[ii].getElementsByTagName("span")[0].style.fontSize == "10px")
                    continue;
                names[ii].getElementsByTagName("span")[0].style.color = colors[colorCode];
                var title = names[ii].title;
                names[ii].title = "";
                if (title != "")
                    title = " (" + title + ")";
                if (showHistory && history != "") {
                    insertHistory(names[ii].getElementsByTagName("span")[0], nr, history);
                    document.getElementById("hist"+nr).getElementsByTagName("td")[0].innerHTML = TxtUserPoints[myLang].replace('%s', username).replace('%s', number_format(userpoints, false)) + " " + TxtColor[colorCode][myLang] + title;
                }

                var newtd = document.createElement("a");
                newtd.innerHTML = GetIconInsertHTML(userid, username, ""); // Info
                FightListHandler(newtd.getElementsByTagName('img')[ZONEBASE_URL==""?2:3]);
                names[ii].parentNode.insertBefore(newtd, names[ii]);
                CheckPastFights(userid, username, 0);
                names[ii].name = names[ii].name + "_done";
            }
        });
    }
    if (location.toString().indexOf(TOWNBASE_URL+'gang/') != -1) {
        var content = document.getElementById("tabcontainer");
        if (content) {
            // content.style.width = '800px';
            var divs = content.getElementsByTagName("div");
            var nr = 0;
            for (i = 0; i < divs.length; i++) {
                if (divs[i].style.backgroundColor == "#303030")
                    continue;
                if (divs[i].innerHTML.indexOf("/profil/id:") == -1)
                    continue;
                var small = false;
                var aref = divs[i].getElementsByTagName("a");
                for (var j = 0; j < aref.length; j++) {
                    var currenttd = aref[j];
                    if (currenttd.name || !currenttd.href)
                        continue;
                    if (currenttd.href.indexOf("/profil/id:") == -1)
                        continue;
                    var id = GetUserID(currenttd.href);
                    currenttd.name = "penner" + id;
                    small = true;
                    insFightData(id, ++nr);
                }
                if (small)
                    divs[i].style.fontSize = "0.9em";
            }
        }
    }
    window.setTimeout(colorNames, 5000);
    return;
}

// ***********************************************************************************************
// Markieren der Downfighter
// ***********************************************************************************************
function markDF() {
    if (!document.getElementById('downfightinfo')) {
        var content = document.getElementsByTagName("body")[0];
        var aref = content.getElementsByTagName("a");
        for (var i = 0; i < aref.length; i++) {
            if (aref[i].style.textDecoration.indexOf('blink') != -1)
                continue;
            if (isDownFighter(trimString(aref[i].innerHTML.split('id="hist')[0].split('>').pop()))) {
                //var decoration = " blink";
                //if (aref[i].style.textDecoration == "none")
                //    aref[i].style.textDecoration = decoration;
                //else {
                //    if (aref.href != "")
                //        decoration += " underline";
                //    aref[i].style.textDecoration += decoration;
                //}
				aref[i].className = "pulsating";
                var title = "ACHTUNG!! Dieser Penner ist im Downfight !!";
                if (aref[i].title.indexOf(title) != -1)
                    title = "";
                else if (aref[i].title != "")
                    title = " (" + title + ")";
                aref[i].title += title;
            }
        }
    }
    window.setTimeout(markDF, 5000);
    return;
}

// ***********************************************************************************************
// Abrufen der DF-Liste von downfight.de
// ***********************************************************************************************
function updDFList() {
    if (IsTimeToCheck(TOWNEXTENSION + "LastUpdateDF", 10)) {
        var URL = DFurl[0] + "_" + DFTownCode3;
        var Params = ['myatt', 9999, 'mydef', 9999];
        PostToHTTP(URL, Params, function(content) {
            var doc = HTML2DOM(content);
            for (var i = doc.getElementsByTagName("table").length - 1; i > 0; i--)
                if (doc.getElementsByTagName("table")[i].innerHTML.indexOf("angriff.gif") != -1)
                    break;
            var dftrs = doc.getElementsByTagName("table")[i].getElementsByTagName("tr")[1].getElementsByTagName("table")[0].getElementsByTagName("tr");
            var nrofrows = 0;
            for (var i = 1; i <= dftrs.length - 2; i++) {
                if (dftrs[i].getElementsByTagName("td").length < 10)
                    continue;
                var username = GetUserNameFromDFDE(dftrs[i].getElementsByTagName("td")[4].innerHTML);
				if (username == "")
					continue;
                DFusers[nrofrows] = username;
                nrofrows++;
            }
            PG_setValue("DFList", DFusers.join(";"));
            if (nrofrows > 0)
                markDF();
        });
    }
    else {
        var DFuserlist = PG_getValue("DFList", "");
        if (DFuserlist != "")
            DFusers = DFuserlist.split(";");
        if (DFusers.length > 0)
            markDF();
    }
}

function checkFightValBox() {
    if (fightVals == "") {
        window.setTimeout(checkFightValBox, 500);
        return;
    }

    GM_xmlhttpRequest({method: 'GET', url: TOWNBASE_URL + "dev/api/gang/" + m_owngangid + ".xml", onload: function(responseDetails) {
        var content = responseDetails.responseText.split("<member_list>")[1];
        var recv = PGu_getValue("fvalrecv", "0");
        var id = recv.split(":");
        if (content.indexOf("<id>"+id[0]+"</id>") == -1)
            id[0] = 0;
        var members = content.split('<id>');
        var name = "";
        var admid = 0;
        var option = '<option value="0"> </option> ';
        for (var i = 1; i < members.length; i++) {
            var mid = members[i].split("<")[0];
            var mname = members[i].split("<name>")[1].split("<")[0].trim()
            var status = members[i].split("<status>")[1].split("<")[0].trim()
            if (status == "3")
                admid = mid;
            option += '<option value="' + mid + '">' + mname + '</option> ';
            if (id[0] == 0 && status == "3" || id[0] == mid)
                name = mname;
        }
        var newtd = document.createElement("td");
        newtd.setAttribute('style', 'position:absolute; top:0px; left:0px');
        newtd.innerHTML = '<form name="fvalrcvdef" id="fvalrcvdef">PN senden an: <select id="rcvid" name="rcvid"> ' + option + ' </select> </form>';
        document.getElementById("fvalmeld").parentNode.parentNode.appendChild(newtd);
        document.getElementById("rcvid").value = id[0];
        document.getElementById("fvalrcvdef").style.visibility = "hidden";
        // Click-Handler hinzufügen
        document.getElementById("rcvid").addEventListener("change", function(event) { 
            // neuen Wert speichern
            if (event.target.value == admid)
                PGu_setValue("fvalrecv", "0");
            else
                PGu_setValue("fvalrecv", event.target.value + ":" + event.target.options[event.target.selectedIndex].text);
            document.getElementById("fvalrcvdef").style.visibility = "hidden";
            document.getElementById("fvalmeld").value = "Kampfwerte melden";
            document.getElementById("fvalmeld").title = "Kampf- und Skillwerte per PN an " + (event.target.value == admid || event.target.value == 0?"Admin":event.target.options[event.target.selectedIndex].text) + " senden";
        }, false);
                
        document.getElementById("fvalmeld").addEventListener("click", function(event) { fightvalmeld(event) }, false);
        document.getElementById("fvalmeld").addEventListener("mouseover", function(event) {
            if (event.shiftKey != 0) {
                event.target.value = "Empfänger wählen";
                event.target.title = "Kampf- und Skillwerte per PN an einen anderen Empfänger senden";
            }
        }, false);
        document.getElementById("fvalmeld").addEventListener("mouseout", function(event) {
            if (document.getElementById("fvalmeld").value != "Bitte warten" && name != m_ownusername) {
                document.getElementById("fvalmeld").value = "Kampfwerte melden";
                document.getElementById("fvalmeld").title = "Kampf- und Skillwerte per PN an " + (id[0] == 0 ?"Admin":id[1]) + " senden";
            }
        }, false);
        if (name == m_ownusername) {
            document.getElementById("fvalmeld").value = "Empfänger wählen";
            document.getElementById("fvalmeld").title = "Kampf- und Skillwerte per PN an einen anderen Empfänger senden";
        }
        document.getElementById("fvalmeld").style.visibility = "visible";
    }});
}

function getPosition(element) {
    var xPosition = 0;
    var yPosition = 0;
    while (element) {
        xPosition += element.offsetLeft - element.scrollLeft + element.clientLeft;
        yPosition += element.offsetTop - element.scrollTop + element.clientTop;
        element = element.offsetParent;
    }
    return { x: xPosition, y: yPosition };
}
function fightvalmeld(e) {
    if (e.target.value != "Kampfwerte melden") {
        var position = getPosition(e.currentTarget);
        document.getElementById("fvalrcvdef").parentNode.style.top=(position.y-490)+"px";
        document.getElementById("fvalrcvdef").parentNode.style.left=(position.x-475)+"px";
        document.getElementById("fvalrcvdef").style.visibility = "visible";
        return;
        }

    var btnText = e.target.value;
    var btnTitle = e.target.title;
    e.target.value = "Bitte warten";
    e.target.title = "Kampf- und Skillwerte werden ermittelt";
    e.target.disabled = true;
    GM_xmlhttpRequest({method: 'GET', url: TOWNBASE_URL + "dev/api/gang/" + m_owngangid + ".xml", onload: function(responseDetails) {
        var content = responseDetails.responseText.split("<member_list>")[1];
        var recv = PGu_getValue("fvalrecv", "0");
        var id = recv.split(":");
        if (content.indexOf("<id>"+id[0]+"</id>") == -1)
            id[0] = 0;
        var admname = content.split("<status>3")[0].split("<name>").pop().split("<")[0].trim();
        if (id[0] == 0)
            var name = admname;
        else
            var name = content.split("<id>"+id[0]+"<")[1].split("</name>")[0].split(">").pop().trim();

        GM_xmlhttpRequest({method: 'GET', url: TOWNBASE_URL + "skills/", onload: function(responseDetails) {
            var content = responseDetails.responseText.split('id="content"')[1];
            var today = new Date();
            var now = today.getTime();
            var skills = content.split('class="box_top_small');
            var skillArr = [];
            var ATTskill = 0;
            var DEFskill = 0;
            skillArr.push("Hallo " + name + ",\nhier sind meine aktuellen Werte.");
            skillArr.push("\nMein aktueller Kampfwert: " + fightVals);
            skillArr.push("\nMeine Skills:");
            var abschluss = "\nAbgeschlossen:\n";
            for (var i = 1; i < skills.length; i++) {
                var text = skills[i].split(">")[1].split("<")[0].trim();
                var styleskill = skills[i].split('"style_skill"');
                if (styleskill.length > 1) {
                    var skill = styleskill[1].split(">")[1].split("<")[0];
                    var stufe = styleskill[1].split(">")[2].split("<")[0].trim();
                    if (styleskill[2].indexOf("counter(") != -1) {
                        var seconds = Number(styleskill[2].split("counter(")[1].split(")")[0].trim());
                        today.setTime(seconds * 1000 + now);
                        if (Math.floor((now + seconds * 1000) / 86400000) > Math.floor(now / 86400000))
                            var ende = ("0" + today.getDate()).substr(-2) + "." +
                                       ("0" + (today.getMonth() + 1)).substr(-2) + "." +
                                          today.getFullYear().toString().substr(-2);
                        else
                            var ende = "Heute";
                        ende += ", " + ("0" + today.getHours()).substr(-2) + ":" +
                                       ("0" + today.getMinutes()).substr(-2);
                    }
                    else
                        var ende = styleskill[2].split(">")[1].split("<")[0].trim();
                    skillArr.push(text + ": " + skill + " " + stufe + " Ende: " + ende);
                }
            }
            var skAnf = 2;
            if (skills.length > 1 || content.indexOf('class="cbox') != -1) {
                if (skills.length < 2)
                    skAnf = 1;
                skills = skills.pop().split('<table ');
            }

            for (var i = skAnf; i < skills.length; i++) {
                var text = skills[i].split("<strong>")[1].split("<")[0].trim();
                if (skills[i].indexOf('class="cbox') == -1) {
                    var trs = skills[i].split("<tr>");
                    if (trs.length < 3)
                        continue;
                    skillArr.push("\n" + text + ":");
                    for (var j = 2; j < trs.length; j++) {
                        var td = trs[j].split("<td");
                        var skill = td[1].split(">")[1].split("<")[0].trim();
                        var stufe = td[2].split(">")[1].split("<")[0].trim();
                        var ende = td[4].split("</div")[0].split(">").pop().trim();
                        skillArr.push(skill + " " + stufe + " Ende: " + ende);
                    }
                }
                else {
                    var stufe = skills[i].split("</tr>")[0].split("<td").pop().split("<")[0].split(">").pop().split("/")[0].trim();
                    skillArr.push(abschluss + text + ": " + stufe);
                    if (text == "Angriff")
                        ATTskill = Number(stufe.match(/\d*/)[0].trim());
                    else if (text == "Verteidigung")
                        DEFskill = Number(stufe.match(/\d*/)[0].trim());
                    abschluss = "";
                }
            }
            if (skillArr.length == 3) {
                skills = content.split('class="skill_block');
                for (var i = 1; i < skills.length; i++) {
                    var text = skills[i].split("<h2>")[1].split("<")[0].trim();
                    var styleskill = skills[i].split('"style_skill"');
                    if (styleskill.length > 1) {
                        var skill = styleskill[1].split(">")[1].split("<")[0];
                        var stufe = styleskill[1].split(">")[2].split("<")[0].trim();
                        var ende = styleskill[2].split(">")[1].split("<")[0].trim();
                        skillArr.push(text + ": " + skill + " " + stufe + " Ende: " + ende);
                    }
                    else if (skills[i].indexOf("skill_progress_text") != -1) {
                        var stufe = skills[i].split("skill_progress_text")[1].split("<")[0].split(">").pop().trim().split(" ")[0].trim();
                        skillArr.push(abschluss + text + ": " + stufe);
                        if (text == "Angriff")
                            ATTskill = Number(stufe.match(/\d*/)[0].trim());
                        else if (text == "Verteidigung")
                            DEFskill = Number(stufe.match(/\d*/)[0].trim());
                        abschluss = "";
                    }
                    else {
                        skillArr.push("\n" + text + ":");
                        var trs = skills[i].split("<tr>");
                        for (var j = 1; j < trs.length; j++) {
                            var td = trs[j].split("<td");
                            var skill = td[1].split(">")[1].split("<")[0].trim();
                            var stufe = td[2].split(">")[1].split("<")[0].trim();
                            var ende = td[4].split("</div")[0].split(">").pop().trim();
                            skillArr.push(skill + " " + stufe + " Ende: " + ende);
                        }
                    }
                }
            }
            GM_xmlhttpRequest({method:"GET", url: window.location.protocol + '//' + window.location.hostname + '/overview/', onload:function(responseDetails) {
                var content = responseDetails.responseText;
                pos = content.search("Angelegte Plunder");
                if (pos <= 0) {
                    return;
                }
                var table = content.substr(pos).split("<table")[1].split("</table>")[0];
                var tabs = table.split("<tr")[2].split("<td");
                var pname = "";
                var ATTval = 0;
                var ATTprz = 1;
                var DEFval = 0;
                var DEFprz = 1;
                if (tabs[1].indexOf("<strong") != -1) {
                    pname = tabs[1].split("</strong")[0].split('<strong')[1].split(">")[1];
                    var padv = tabs[1].split('class="padv');
                    if (padv.length > 1)
                        padv = padv[1].split('</ul')[0].split("<li>");
                    var ATT = "";
                    var DEF = "";
                    for (var i = 1; i < padv.length; i++)
                        if (padv[i].indexOf("ATT:") != -1)
                            ATT = padv[i].split("ATT:")[1].split("<")[0];
                        else if (padv[i].indexOf("DEF:") != -1)
                            DEF = padv[i].split("DEF:")[1].split("<")[0];
                    if (ATT != "") {
                        ATTval = Number(ATT.split("+")[0].trim());
                        if (ATT.indexOf("+") != -1)
                            ATTprz = Number(ATT.split("+")[1].split("%")[0].trim()) / 100 + 1;
                    }
                    if (DEF != "") {
                        DEFval = Number(DEF.split("+")[0].trim());
                        if (DEF.indexOf("+") != -1)
                            DEFprz = Number(DEF.split("+")[1].split("%")[0].trim()) / 100 + 1;
                    }
                }
                var tierclass = content.split('id="content"')[1].split('class="tieritem');
                var ATTweap = 0;
                var DEFhome = 0;
                for (var i = 1; i < tierclass.length; i++) {
                    if (tierclass[i].indexOf("Deine Waffe") == -1)
                        continue;
                    ATTweap = parseInt(tierclass[i].split('class="double')[1].split("<li>")[2].split("</span")[0].split(">").pop().replace(/[\+\-\/]/g, "0"));
                    DEFhome = parseInt(tierclass[i].split('class="double')[2].split("<li>")[2].split("</span")[0].split(">").pop().replace(/[\+\-\/]/g, "0"));
                }
                GM_xmlhttpRequest({method:"GET", url: window.location.protocol + '//' + window.location.hostname + '/city/pet_store/', onload:function(responseDetails) {
                    var tierclass = responseDetails.responseText.split('id="content"')[1].split('class="tieritem');
                    var ATTbegl = 0;
                    var DEFbegl = 0;
                    for (var i = 1; i < tierclass.length; i++) {
                        if (tierclass[i].indexOf("Dein aktueller Begleiter") == -1)
                            continue;
                        var spans = tierclass[i].split("<tr")[3].split("<span");
                        ATTbegl = Number(spans[1].split("</span")[0].split(">").pop().replace("+", ""));
                        DEFbegl = Number(spans[2].split("</span")[0].split(">").pop().replace("+", ""));
                    }
                    GM_xmlhttpRequest({method: 'GET', url: TOWNBASE_URL + "gang/upgrades/", onload: function(responseDetails) {
                        var trs = responseDetails.responseText.split('id="content"')[1].split("</table")[0].split("<table").pop().split("<tr");
                        var ATTgang = -1;
                        var DEFgang = -1;
                        for (var i = 1; i < trs.length; i++) {
                            var tds = trs[i].split("<td");
                            if (tds[1].indexOf("Waffenkammer") != -1)
                                ATTgang = Number(tds[2].match(/\+\d*/)[0].split("+").pop().trim()) / 100 + 1;
                            else if (tds[1].indexOf("Bandenhaus") != -1)
                                DEFgang = Number(tds[2].match(/\+\d*/)[0].split("+").pop().trim()) / 100 + 1;
                            else if (ATTgang >= 0 && DEFgang >= 0)
                                break;
                        }

                        if (ATTgang < 0)
                            ATTgang = 1;
                        if (DEFgang < 0)
                            DEFgang = 1;

                        var fightval = (Math.round(Math.floor((ATTskill + ATTbegl + ATTweap + ATTval) * ATTgang * ATTprz) * 11 + Math.floor((DEFskill + DEFhome + DEFbegl + DEFval) * DEFgang * DEFprz) * 10) / 10).toString().replace(".", DZ[lang]);
                        skillArr.push("\nWaffe/Eigenheim: " + ATTweap + "/" + DEFhome);
                        if (ATTval + ATTprz + DEFval + DEFprz > 2)
                            skillArr.push("Plunder: " + ((ATTval + ATTprz > 1)?"ATT:" + (ATTval > 0?" " + ATTval:"") + (ATTprz > 1?" + " + (Math.floor((ATTprz-1)*100+0.1))+"%":"")+ " ":"")
                                                      + ((DEFval + DEFprz > 1)?"DEF:" + (DEFval > 0?" " + DEFval:"") + (DEFprz > 1?" + " + (Math.floor((DEFprz-1)*100+0.1))+"%":""):"") + " (" + pname + ")");
                        if (ATTbegl + DEFbegl > 0)
                            skillArr.push("Begleiter: " + ATTbegl + "/" + DEFbegl);
                        document.getElementById("fvalmeld").value = btnText;
                        document.getElementById("fvalmeld").title = btnTitle;
                        document.getElementById("fvalmeld").disabled = false;
                        if (!confirm("Soll dein Kampfwert " + fightval + " an " + name + " gesendet werden ?"))
                            return;
                        if (name == admname) {
                            var flist = PGu_getValue("FightIDList", "");
                            var aktflist = PGu_getValue("aktfightlist", 0);
                            var ftlist = "";
                            if (aktflist > 0)
                                ftlist = PGu_getValue("fightlist_" + aktflist, "").split("°")[0];
                            if (flist != "")
                                if (confirm("Soll die aktuelle Kampfliste mit gesendet werden (OK für Ja, Abbrechen für Nein) ?"))
                                    skillArr.push("Meine Kampfliste" + (ftlist != ""?" (" + ftlist + ")":"") + ":\n" + flist);
                        }
                        GM_xmlhttpRequest({method: 'GET', url: TOWNBASE_URL + "messages/write/", onload: function(responseDetails) {
                            var inputs = responseDetails.responseText.split('id="content"')[1].split('id="form1"')[1].replace("textarea", "input").split("<input");
                            var vals = ["f_toname", name, "f_subject", "KW " + fightval, "f_text", skillArr.join("\n")];
                            var params = [];
                            for (var i = 0; i < inputs.length; i++) {
                                var pname = inputs[i].split('name="');
                                if (pname.length < 2)
                                    continue;
                                pname = pname[1].split('"')[0];
                                var value = "";
                                for (var j = 0; j < vals.length; j+=2)
                                    if (vals[j] == pname)
                                        break;
                                if (j < vals.length)
                                    value = vals[j+1];
                                else {
                                    value = inputs[i].split('value="');
                                    if (value.length > 1)
                                        value = value[1].split('"')[0];
                                    else {
                                        continue;
                                    }
                                }
                                params.push(pname);
                                params.push(value);
                            }
                            PostToHTTP(TOWNBASE_URL + "messages/write/send/", params, function() { alert("Nachricht an " + name + " wurde gesendet.") });
                        }});
                    }});
                }});
            }});
        }});
    }});
}

function exportVars(quiet) {
	var vars = "Script§" + THISSCRIPTNAME;
	var gm_vars = GM_listValues().sort();
	var deleted = 0;
	var count = 0;
	for (var i = 0; i < gm_vars.length; i++) {
		if (gm_vars.indexOf(gm_vars[i]) < i)
			continue;
		if (gm_vars[i] == "" || gm_vars[i].match(new RegExp(/[^\d]0$/))) {
			GM_deleteValue(gm_vars[i]);
			deleted++;
		}
		else if (GM_getValue(gm_vars[i]) == undefined) {
			GM_deleteValue(gm_vars[i]);
			deleted++;
		}
		else {
			if (gm_vars[i].length > 50) {
				if (!quiet)
					var conf = confirm("Variable löschen: " + gm_vars[i]);
				else
					var conf = true;
				if (conf) {
					GM_deleteValue(gm_vars[i]);
					deleted++;
					continue;
				}
			}
			var val = GM_getValue(gm_vars[i], "xyzundefinedzyx");
			if (val == "xyzundefinedzyx" || val == null)
				continue;
			if (typeof(val) == "number")
				val = "N" + val;
			else if (typeof(val) == "boolean")
				val = "B" + (val?1:0);
			else if (typeof(val) == "string") {
				if (val.indexOf("§") != -1) {
					break;
				}
				val = "S" + val.replace(String.fromCharCode(0), "");
			}
			else {
				break;
			}
			vars += "§" + gm_vars[i] + "§" + val;
			count++;
		}
	}
	if (i < gm_vars.length)
		if (quiet)
			GM_setClipboard("Fehler!!");
		else
			alert('Export wegen Fehler abgebrochen');
	else {
		vars += "§" + checksum(vars);
		GM_setClipboard(vars);
		if (!quiet)
			if (deleted > 0)
				alert (count + " Variablen in Zwischenablage exportiert, " + deleted + " Variablen gelöscht.");
			else
				alert (count + " Variablen in Zwischenablage exportiert");
	}
	return;
}

function CheckForExport(now, diff) {
    // create and format actual date
	var lastExport = GM_getValue("lastExport", "");
	if (isNaN(lastExport))
		lastExport = 0;
	else
		lastExport = Number(lastExport);

	if (now >= lastExport + diff) {
		GM_setValue("lastExport", String(now));
		exportVars(true);
	}
}
	
// ********************************************************************************************************************
// ********************************************************************************************************************
// ********************************************************************************************************************
// START PROGRAMM * START PROGRAMM * START PROGRAMM * START PROGRAMM * START PROGRAMM *START PROGRAMM *START PROGRAMM *
// ********************************************************************************************************************
// ********************************************************************************************************************
// ********************************************************************************************************************

var m_ownusername = "Mr.X";
var m_owngangid = -1;
var m_owngangname = "";
try {
    var navtag = document.getElementById("tabnav");
    var li = navtag.getElementsByTagName("ul")[0].getElementsByTagName("li");
    m_owngangid = li[1].getElementsByTagName("a")[0].href.split("bande:")[1].split("/")[0];
} catch(err) {
}
if (document.getElementsByClassName('zleft profile-data').length > 0) {
    var m_ownuserid = getOwnUserID();
    if (document.getElementsByClassName('zleft profile-data')[0].getElementsByClassName("user_name").length > 0)
        m_ownusername = document.getElementsByClassName('zleft profile-data')[0].getElementsByClassName("user_name")[0].innerHTML;
    else
        m_ownusername = document.getElementsByClassName('zleft profile-data')[0].getElementsByTagName("a")[0].getElementsByTagName("span")[0].innerHTML;
}

ByeByeGoogle();

// ***********************************************************************************************
// Auf eine neue Version des Skriptes prüfen
// ***********************************************************************************************
CheckForUpdate(120);

var today = new Date();
var now = Math.floor(today.getTime()/1000);
var day = today.getDay();
var hour = today.getHours();
if (expertMode)
	if (GM_getValue("exportDays", "").split(",").indexOf(((day+6) % 7 + 1).toString()) != -1 &&
		GM_getValue("exportTimes", "").split(",").indexOf(((hour+1) % 24).toString()) != -1 && today.getMinutes() >= 50)
			CheckForExport(now, 1000);

var content = document.getElementsByTagName("body")[0].innerHTML;

if (location.toString().indexOf(".pennerzone.de") == -1) {
    // Eigene Punktezahl auslesen
    var myprof = document.getElementById("my-profile-new");
    if (!myprof)
        myprof = document.getElementById("my-profile");
    var ownplace = Number(myprof.getElementsByTagName("div")[1].getElementsByTagName("span")[4].innerHTML);
    var ownpoints = Number(document.getElementsByClassName("icon award")[0].getElementsByTagName("a")[0].innerHTML);

    // Aus eigener Punktzahl Ober- und Untergrenze für Punktezahl der User errechnen, die man angreifen kann
    var ownattmax = Math.floor(ownpoints * upperLimit);
    var ownattmin = Math.floor(ownpoints * lowerLimit);

    if (IsTimeToCheck(TOWNEXTENSION + "update" + m_ownuserid, 480) || THISSCRIPTVERSION != GM_getValue("scriptversion", "0")) {
        GM_setValue("scriptversion", THISSCRIPTVERSION);
        DelayedPost(0);
    }
}

if (expertMode)
	GM_registerMenuCommand(THISSCRIPTNAME + ": Zeit für Variablenexport festlegen", function (event) {
		var days = prompt("Tage: ", GM_getValue("exportDays", "")).replace(/[^\d]/g, ",");
		if (days == null)
			return;
		if (days == "")
			GM_deleteValue("exportDays");
		else {
			var dayarr = days.split(",");
			for (var i = 0; i < dayarr.length; i++)
				if (isNaN(dayarr[i]) || Number(dayarr[i]) < 1 || Number(dayarr[i]) > 7) {
					alert("Bitte nur Zahlen von 1 (Mo) bis 7 (So) eingeben!!");
					return;
				}
			GM_setValue("exportDays", days);
		}
		var times = prompt("Zeiten: ", GM_getValue("exportTimes", "")).replace(/[^\d]/g, ",");
		if (times == null)
			rerurn;
		if (times == "")
			GM_deleteValue("exportTimes");
		else {
			var timarr = times.split(",");
			for (var i = 0; i < timarr.length; i++)
				if (isNaN(timarr[i]) || Number(timarr[i]) < 0 || Number(timarr[i]) > 23) {
					alert("Bitte nur Zahlen von 0 bis 23 eingeben!!");
					return;
				}
			GM_setValue("exportTimes", times);
		}
	});

GM_registerMenuCommand(THISSCRIPTNAME + ": alle Einstellungen exportieren", function (event) {
	exportVars(false);
});

GM_registerMenuCommand(THISSCRIPTNAME + ": alle Einstellungen importieren", function (event) {
	var vars = prompt("Eingabe: ");
	var i = vars.lastIndexOf("§");
	var chksum = vars.substr(i+1);
	vars = vars.substr(0, i);
	if (chksum != checksum(vars)) {
		alert("Importstring ist fehlerhaft. Kein Import möglich.");
		return;
	}
	var gmvars = vars.split("§");

	if (gmvars[0] != "Script" || gmvars[1] != THISSCRIPTNAME) {
		alert("Eingabe ungültig!!");
		return;
	}
	var gm_vars = GM_listValues();
	for (var i = 0; i < gm_vars.length; i++)
		GM_deleteValue(gm_vars[i]);
	var count = 0;
	for (var i = 2; i < gmvars.length; i+=2) {
		var val = gmvars[i+1];
		if (val.substr(0, 1) == "N")
			val = Number(val.substr(1));
		else if (val.substr(0, 1) == "B")
			val = val.substr(1) == "1";
		else if (val.substr(0, 1) == "S")
			val = val.substr(1);
		else {
			alert("Fehler bei " + gmvars[i] + ": " + val);
			continue;
		}
		GM_setValue(gmvars[i], val);
		count++;
	}
	alert(count + " Variablen importiert.");
	return;
});

// ***********************************************************************************************
// Abrufen der DF-Liste von downfight.de
// ***********************************************************************************************
if (DFTownCode3 != "")
    if (PGu_getValue("MarkDF", false))
        updDFList();

var fid = PGu_getValue("watchlist", 0);
var watchlist = [];
if (fid != 0) {
    var fightlist = PGu_getValue("fightlist_" + fid, "");
    if (fightlist != "")
        watchlist = fightlist.split("°")[1].split(";");
}

// ***********************************************************************************************
// Wenn die aktuelle Seite eine Bandenprofil-Seite ist
// ***********************************************************************************************
if (location.toString().indexOf(TOWN_URL+"profil/bande:") != -1) {
    // Aktualisierung der Info-Icons auf dem Bandenprofil durchführen (wenn welche vorhanden sind)
    HandleGangProfile(content);
// ***********************************************************************************************
// Wenn die aktuelle Seite eine Userprofilseite ist
// ***********************************************************************************************
} else if ((location.toString().indexOf(TOWN_URL+"profil/") != -1) && (location.toString().indexOf("/bande:") == -1)) {
    // Info-Icons auf dem Profil einfügen
    HandleProfile();
// ***********************************************************************************************
// Wenn die aktuelle Seite eine Kampfprofil-Seite ist
// ***********************************************************************************************
} else if (location.toString().indexOf(TOWN_URL+"fight/viewfight/") != -1) {
//            ap();
// ***********************************************************************************************
// Wenn die aktuelle Seite eine Pennerzone-Seite ist
// ***********************************************************************************************
} else if (location.toString().indexOf(".pennerzone.de/highscore/") != -1) {
    HandlePennerzone();
// ***********************************************************************************************
// wenn die aktuelle Seite die Übersichts- oder die Aktionenseite ist
// ***********************************************************************************************
} else if (location.toString().indexOf(TOWN_URL+"overview/") != -1 || location.toString().indexOf(TOWN_URL+"activities/") != -1) {
    if (watchlist.length > 0 && IsTimeToCheck(TOWNEXTENSION+"watchlist", 10)) {
        for (var i = watchlist.length - 1; i >= 0; i--)
            if (watchlist[i] == "" || bl("fi", watchlist[i]) && watchlist.length > 9)
                watchlist.splice(i, 1);

        for (i = 0; i < watchlist.length; i++)
            getUserData("#"+watchlist[i], function(userid, username, userpoints, gangid, gangname, regsince, money, userplace, history) { });
    }
// ***********************************************************************************************
// sonst: Die aktuelle Seite ist keine Profilseite
// ***********************************************************************************************
} else {
    // ***********************************************************************************************
    // Abrufen des XML-Datensatzes für den aktuellen User
    // ***********************************************************************************************
    getUserData("#"+m_ownuserid, function(userid, username, userpoints, gangid, gangname, regsince, money, userplace, history) {
        var inGang = (gangid != 'None')?1:0;
        m_owngangid = (inGang == 1)?gangid:0;
        m_owngangname = gangname;

        // ***********************************************************************************************
        // Wenn die aktive Kampfseite angezeigt wird
        // ***********************************************************************************************
        if (content.indexOf(TxtZiel[lang]) != -1 ) {

            CheckFightValues(document.getElementById("content").innerHTML);
            // ***********************************************************************************************
            // Funktion ermittelt das DIV, in dem die Angriffsdetails stehen
            // ***********************************************************************************************
            function GetAttackDiv() {
                var forms = document.getElementsByTagName("form");
                for (var i = 0; i < forms.length; i++) {
                    if (!forms[i].outerHTML)
                        continue;
                    if (forms[i].outerHTML.indexOf("/fight/attack") != -1) {
                        var divs = forms[i].getElementsByTagName("div");
                        return divs[0];
                    }
                    else if (forms[i].outerHTML.indexOf("/fight/cancel") != -1)
                        return forms[i].parentNode;
                    }
            }

            var attacktable = document.getElementById("content").getElementsByTagName("table")[0];
            var attackdiv = GetAttackDiv();
            if (attackdiv) {
                var attacklink = attackdiv.getElementsByTagName("a")[0];
                var attackspan = attackdiv.getElementsByTagName("span")[0];
            }

            // Wenn aktuell ein Angriff läuft
            if (document.getElementsByTagName("body")[0].innerHTML.indexOf(TxtRunAttack[lang]) != -1) {
                // Name und UserID des Penners auslesen
                var username = trimString(attacklink.innerHTML.split(">").pop());
                var userid = attackspan.innerHTML.split('/id:')[1].split('/"')[0];

                CheckPastFights(userid, username, 0);

                // Info-Icons einfügen
                attackspan.innerHTML = attackspan.innerHTML + '&nbsp' + GetIconInsertHTML(userid, username, "x");

                // Grafik für Posten in SB einfügen
                if (inGang)
                    attackspan.innerHTML = attackspan.innerHTML + '&nbsp;<img id="PostCurrentFightToSB" border="0" src="' + getIconAddr(ICON_SENDTOSB) + '" title="' + TxtPostTitle2[myLang].replace('%s', username) + '" height="14" width="14" style="cursor: pointer">';
                getUserData("#"+userid, function(userid, username, userpoints, gangid, gangname, regsince, money, userplace, history) {
                        var td = document.getElementById("PostCurrentFightToSB");
                        if (td)
                            td.name = gangid + "|" + (gangid=='None'?'':gangname);
                        if (showHistory && history != "")
                            insertHistory(attackdiv.getElementsByTagName("a")[0], 0, history);
                        });

                var additionalbr = '';
            // sonst: Es läuft derzeit kein Angriff
            } else {
                var additionalbr = '<br />';
            }

            if (attackspan) {
                var showFBlike = PG_getValue("showFBlike", true);
                if (!showFBlike) {
                    showFBlike = IsTimeToCheck(TOWNEXTENSION+"showFBdate", 90*1440);
                }
                attackspan.innerHTML = (showFBlike?'<iframe src="http://www.facebook.com/plugins/like.php?locale='+fblikelocale[myLang]+'&href=http://www.facebook.com/pages/Fightinfo/276193969093799/&layout=standard&show-faces=true&width=500&action=like&colorscheme=dark" scrolling="no" frameborder="0" allowTransparency="true" style="border:none; overflow:hidden; width:500px; height:30px"></iframe>':'')+'<img id="LangSelect" border="0" src="' + getIconAddr(flags[myLang]) + '" title="' + TxtLang[myLang] + '" height="12" width="18" style="cursor:pointer">&nbsp;&nbsp;' + attackspan.innerHTML;
                // ***********************************************************************************************
                // Pennerzone-Suchkonfigurationen einblenden
                // ***********************************************************************************************
                // Einfügen der Pennerzone-Suchzeile in die Angriffsbox
                if (ZONEBASE_URL != "") {
                    attackdiv.innerHTML = attackdiv.innerHTML + additionalbr + '<br /><p id="PennerzoneP">' + BuildPennerzoneLinkString(ownattmin, ownattmax, PGu_getValue("PennerzoneDateFrom", "")) + '</p>';

                    // Handler für Datumseingabe einfügen
                    AddPennerzoneDateHandler();
                }

                if (additionalbr == "")
                    FightListHandler(attackspan.getElementsByTagName('img')[attackspan.getElementsByTagName('img').length-(inGang?2:1)]);
                // Wenn der aktuelle Kampf in die SB gepostet werden können soll
                if (document.getElementById("PostCurrentFightToSB") != null) {
                    // Handler für das Posten in SB mit Grafik assoziieren
                    PostToSBHandler(document.getElementById("PostCurrentFightToSB"), SBPOSTMODE_ACTIVE);
                }
                document.getElementById("LangSelect").addEventListener("click", function(event) {
                    if (event.shiftKey != 0) {
                        var showFBlike = PG_getValue("showFBlike", true);
                        PG_setValue("showFBlike", !showFBlike);
                        if (showFBlike)
                           PG_setValue("showFBdate", Number(new Date()).toString());
                        return;
                    }
                    myLang++;
                    if (myLang == flags.length)
                       myLang = 0;
                    var td = document.getElementById("LangSelect");
                    td.src = getIconAddr(flags[myLang]);
                    td.title = TxtLang[myLang];
                    PG_setValue("myLang", myLang);        // Sprache speichern
                }, false);
            }
        }

        // ***********************************************************************************************
        // Wenn die aktuelle Seite die Fightlog-Seite oder die Kampf-Sucheseite ist
        // ***********************************************************************************************
        if (location.toString().indexOf("/fightlog/") != -1) {
            GM_xmlhttpRequest({method: 'GET', url: FIGHT_URL, onload: function(responseDetails) {
                CheckFightValues(responseDetails.responseText);
            }});
            // Referenz auf die Tabelle mit den abgeschlossenen Kämpfen speichern
            var firsttable = document.getElementById("content").getElementsByTagName("table")[1];

            // ***********************************************************************************************
            // Wenn die aktuelle Seite die Kampf-Suchseite ist
            // ***********************************************************************************************
            if (location.toString().indexOf("?q=") != -1) {
                HandleSearchpage(firsttable, inGang);
            // ***********************************************************************************************
            // Wenn die aktuelle Seite die Fightlog-Seite ist
            // ***********************************************************************************************
            } else {
                HandleFightlogpage(firsttable, inGang, 0, 0);
            }
        // ***********************************************************************************************
        // sonst: ist es eine Highscore-Seite ?
        // ***********************************************************************************************
        } else if (document.getElementById("highscore")) {
            // Referenz auf die Tabelle speichern
            firsttable = document.getElementById("highscore").getElementsByTagName("table")[0];
            // Tabelle neu formatieren und eine neue Spalte einfügen
            ReformatHighscoreTable(firsttable);
            // "Info"-Icon und -Link in die Tabelle schreiben
            InsertInfoInHighscoreTable(firsttable, inGang, 0);

            // Angreifbarkeit der Spieler (Punkte/36 Stunden) farblich kennzeichnen
            InsertAttackableInHighscoreTable(firsttable);
        // ***********************************************************************************************
        // sonst: die aktuelle Seite ist NICHT die Fightlog-Seite, darf nicht die Bandenseite sein
        // ***********************************************************************************************
        } else if (location.toString().indexOf("/gang/") == -1) {
            var submenu = document.getElementsByClassName('submenu')[0];
            var lis = submenu.getElementsByTagName('li');
            var btn = lis.length;
            var center = lis[1].innerHTML.indexOf("<center") != -1;
            for (var i = 0; i < tableIDs.length; i++) {
                if (i > 0 && DFTownCode == "")
                    break;
                btn = btn % 5 + 1;
                submenu.innerHTML += '<li><a id=\"' + tableIDs[i] + '\" style=\"cursor:pointer\" class=\"btn'+btn+'\">'
                                  + (center?'<center>':'')+'<span id=\"' + tableIDs[i] + '2\" >'+(i==0?TxtFightList[myLang]:tableNames[i-1]) +'</span>'+(center?'</center>':'')+'</a></li>';
            }
            // Referenz auf die erste Tabelle speichern
            var tables = document.getElementById("content").getElementsByTagName("table");
            var ft = getFightTableIndex(tables);
            if (ft != 0) {
                var div = tables[0].parentNode;
                div.style.top = (parseInt(div.style.top) + i * 38 + 2) + "px";
                div.style.left = (parseInt(div.style.left) + 15) + "px";
            }
            var firsttable = tables[ft];
            var trs = firsttable.getElementsByTagName("tr");
            var cnt = 0;
            hasCaptcha = document.getElementById("captcha_img");
            if (hasCaptcha)
                hasCaptcha = hasCaptcha.getElementsByTagName("src").length > 0;
            for (var i = 0; i < trs.length; i++) {
                if (trs[i].innerHTML.indexOf('tiername') == -1)
                    continue;
                cnt++;
                if (cnt != 3)
                    continue;
                if (inGang) {
                    var bbcode = "";
                    if (document.getElementById("content").getElementsByTagName("table")[1].getElementsByTagName("tr").length > 2) {
                        var text = trs[i].innerHTML.split('tiername">')[1].split('<')[0];
                        bbcode = text + '&nbsp;&nbsp; <input name="postVals" id="postVals" type="checkbox" onclick="document.getElementById(\'bbcode\').style.visibility=\'hidden\'"> &nbsp;' + TxtPostFight[myLang] + '&nbsp;&nbsp;<input type="button" value="BBCode" id="bbcodeanzeigen" title="' + TxtShowBBCode[myLang] + '"></form>&nbsp;<textarea rows="1" style="vertical-align:middle;height:15px;width:100px" name="bbcode" action="" type="text" id="bbcode" onclick="this.focus(); this.select();"></textarea>';
                    }
                    var recv = PGu_getValue("fvalrecv", "0");
                    var id = recv.split(":");
                    trs[i].innerHTML = '<td colspan="2">' + bbcode + '<input type="button" value="Kampfwerte melden" id="fvalmeld" style="float:right; visibility:hidden" title="' + "Kampf- und Skillwerte per PN an " + (id[0] == 0 ?"Admin":id[1]) + " senden" + '"></form></td>';
                    if (bbcode != "")
                        bbcodeEinAus();
                    window.setTimeout(checkFightValBox, 500);
                }
                break;
            }
            // Referenz auf die Tabelle mit den abgeschlossenen Kämpfen speichern
            ft++;
            while (tables[ft].innerHTML.indexOf('</th>') != -1 || tables[ft].innerHTML.indexOf('showChart()') != -1)
                ft++;
            firsttable = tables[ft];

            // Referenz auf die Tabelle mit den eintreffenden Kämpfen speichern
            var secondtable = tables[ft+1];

            // Tabelle mit den abgeschlossenen Kämpfen neu formatieren und eine neue Spalte einfügen
            ReformatFirstTable(firsttable);

            // "Info"-Icon und -Link in die Tabelle schreiben
            InsertInfoInFirstTable(firsttable, inGang, 0, function() {

                // Angreifbarkeit der Spieler (Punkte/36 Stunden) farblich kennzeichnen
                InsertAttackableInFirstTable(firsttable);

                // Array für Kampf-Infos initialisieren
                var IncomingFights = [];

                // Auslesen der Daten der einkommenden Kämpfe
                ReadFightData(secondtable, IncomingFights);

                if (IncomingFights.length > 0) {
                    // Eintreffende Kämpfe chronologisch sortieren (aufsteigend)
                    IncomingFights.sort(sortByTime);

                    // Tabelle mit den eintreffenden Kämpfen neu formatieren und eine neue Spalte einfügen
                    ReformatSecondTable(secondtable, inGang);

                    // Zurückschreiben der sortierten eintreffenden Kämpfe in die Tabelle
                    WriteFightData(secondtable, IncomingFights, inGang);
                }

                // Angreifbarkeit der Spieler (Punkte/36 Stunden) farblich kennzeichnen
                InsertAttackableInFirstTable(secondtable, true, true);

                // Schreiben der Anzahl eintreffender Kämpfe in die Zeilenüberschrift
                WriteNrOfIncomingFights(content, tables[0]);
                insertSBTable("PostDoneFightsToSB", m_owngangname);

                function showTable(event) {
                    var id = event.target.id.substr(0,8);
                    for (var i = 0; i < tableIDs.length; i++)
                        if (id == tableIDs[i])
                            break;

                    if (i >= tableIDs.length)
                        return;

                    var tables = document.getElementById("content").getElementsByTagName("table");
                    var ft = getFightTableIndex(tables);
                    var table = tables[ft];
                    var trs = table.getElementsByTagName("tr");
                    for (var j = trs.length-1; j > 0; j--)
                        trs[j].parentNode.removeChild(trs[j]);

                    if (i == 0)
                        // ***********************************************************************************************
                        // Kampftabelle anzeigen
                        // ***********************************************************************************************
                        InsertFightTable(table, true);
                    else
                        // ***********************************************************************************************
                        // Downfight-Tabellen anzeigen
                        // ***********************************************************************************************
                        InsertDFTable(table, i - 1, true);
                }

                var ft = getFightTableIndex(tables);
                var table = tables[ft];
                for (var i = bl()||m?1:0; i < tableIDs.length; i++) {
                    if (i > 0 && DFTownCode == "")
                        break;
                    document.getElementById(tableIDs[i]).addEventListener("click", showTable, false);
                    // Wenn die letzte Einstellung der Checkbox "aktiv" war
                    if (PGu_getValue(tableIDs[i] + "OnLF", false)) {
                        if (i == 0) {
                        // ***********************************************************************************************
                            // Kampftabelle anzeigen
                            // ***********************************************************************************************
                            InsertFightTable(table, false);
                        }
                        else {
                            // ***********************************************************************************************
                            // Downfight-Tabelle anzeigen
                            // ***********************************************************************************************
                            InsertDFTable(table, i - 1, false);
                        }
                    }
                }
            });
        }
        else
            colorNames();
    });
}
