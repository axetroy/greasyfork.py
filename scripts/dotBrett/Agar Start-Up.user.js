// ==UserScript==
// @name         Agar Start-Up
// @namespace    http://j.mp/jsbrett
// @version      1.0
// @description  Setup all your default values so you don't need to ever again!
// @author       dotBrett
// @match        http://agar.io/*
// @grant        none
// ==/UserScript==

// Set Your Username: 'dotBrett'
$("#nick").val("dotBrett");

// Set Your Gamemode (Leave blank for FFA):
// ':teams' | ':experimental' | ':party'
setGameMode("");

// Set Your Location:
// 'US-Atlanta' (North America) | 'BR-Brazil' (South America) | 'EU-London' (Europe) | 'RU-Russia' (Russia) | 'TK-Turkey' (Turkey) | 'JP-Tokyo' (East Asia) | 'CN-China' (China) | 'SG-Singapore' (Oceania)
setRegion("US-Atlanta");

setSkins(true); // If 'true' Skins Will Be Visible
setNames(true); // If 'true' Name Will Be Visible
setColors(false); // If 'true' Colors Will Be Removed
setShowMass(true); // If 'true' Your Mass Will Be Visible
setDarkTheme(false); // If 'true' Your Theme Will Be Dark
setSkipStats(true); // If 'true' Stats Will Be Skipped on Death