// ==UserScript==
// @name                WME Validator Localization for Ireland
// @version             1.1.14.28
// @author              lsin023
// @description         This script localizes WME Validator for Ireland. You also need main package (WME Validator) installed.
// @match               https://editor-beta.waze.com/*editor/*
// @match               https://www.waze.com/*editor/*
// @grant               none
// @run-at              document-start
// @namespace https://greasyfork.org/users/15899
// ==/UserScript==
//
/*
  See Settings->About->Available checks for complete list of checks and their params.

  Examples:

  Enable #170 "Lowercase street name" but allow lowercase "exit" and "to":
    "170.enabled": true,
    "170.params": {
        "regexp": "/^((exit|to) )?[a-z]/",
    "},

  Enable #130 "Custom check" to find a dot in street names, but allow dots at Ramps:
    "130.enabled": true,
    "130.params": {
        "titleEN": "Street name with a dot",
        "problemEN": "There is a dot in the street name (excluding Ramps)",
        "solutionEN": "Expand the abbreviation or remove the dot",
        "template": "${type}:${street}",
        "regexp": "D/^[^4][0-9]?:.*\\./",
    },
    *Note: use D at the beginning of RegExp to enable debugging on JS console.
    *Note: do not forget to escape backslashes in strings, i.e. use "\\" instead of "\".
*/

window.WME_Validator_Ireland = {
    ".country": "Ireland",
    ".codeISO": "IE",
    ".author": "lsin023",
    ".updated": "2015-12-03",
    ".link": "TODO: ",
    "27.enabled": true, // City name on Railroad
    "70.enabled": true,
    "70.problemLink": "W:How_to_label_and_name_roads_(Ireland)#Road_Types",
    "71.enabled": true,
    "71.problemLink": "W:How_to_label_and_name_roads_(Ireland)#Road_Types",
    "72.enabled": true,
    "72.problemLink": "W:How_to_label_and_name_roads_(Ireland)#Road_Types",
    "130.enabled": true,
    "130.params": {
        "titleEN": "Incorrectly named street",
        "problemEN": "The street name should be abbreviated.",
        "solutionEN": "Rename the street in accordance with the abbreviation table",
        "template": "${street}",
        "regexp": "/(?!The).{3}\\s(?:Avenue|Close|Court|Crescent|Drive|Lane|Park|Place|Road|Square|Street|Terrace)(?:\\s+(?:Lwr|Upr|[NSWE]|Great|Little|Middle|Extension))?$/"
    },
    "130.problemLink": "W:How_to_label_and_name_roads_(Ireland)#Abbreviations",
    "131.enabled": true,
    "131.params": {
        "titleEN": "Incorrect abbreviation using . (dot)",
        "problemEN": "Abbreviations should not end in dot, except for St. (Saint)",
        "solutionEN": "Remove the dot from the end of the abbreviation",
        "template": "${street}",
        "regexp": "/(?:(?!St).{2})\\./"
    },
    "131.problemLink": "W:How_to_label_and_name_roads_(Ireland)#Abbreviations",
    "132.enabled": true,
    "132.params": {
        "titleEN": "Incorrectly named street (Cardinals)",
        "problemEN": "Cardinals North/East/South/West should be abbreviated in suffixes. Prefixes should not.",
        "solutionEN": "Rename the street in accordance with the guidelines",
        "template": "${street}",
        "regexp": "/^[NESW]\\s|\\s(?:North|East|South|West)$/"
    },
    "132.problemLink": "W:How_to_label_and_name_roads_(Ireland)#Abbreviations",
    "133.enabled": true,
    "133.params": {
        "titleEN": "Incorrectly abbreviated street name",
        "problemEN": "Abbreviations are not used as suffix.",
        "solutionEN": "Rename the street and abbreviate only suffixes",
        "template": "${street}",
        "regexp": "/(?:^|\\s)(?:Ave|Cl|Ct|Cres|Dr|Ln|Pk|Pl|Rd|Sq|St|Tce)(?!(?:$|\\S|\\s(?:Lwr|Upr|[NSWE]|Great|Little|Middle|Extension)$))/"
    },
    "133.problemLink": "W:How_to_label_and_name_roads_(Ireland)#Abbreviations",
    "134.enabled": false,
    "134.params": {
        "titleEN": "Named Parking Lot Road",
        "problemEN": "Parking lot roads should not be named.",
        "solutionEN": "Unname and/or convert into Parking lot place in accordance with the guidelines",
        "template": "${typeRank}:${street}",
        "regexp": "/7:(?:[PF]|\\[[PF]\\])/"
    },
    "134.problemLink": "W:How_to_label_and_name_roads_(Ireland)#Abbreviations",
    "160.enabled": true,
    "160.params": {
        "solutionEN": "Rename the street to 'Mxx' or 'Mxx N/S/W/E' or change the road type",
        "regexp": "!/^M[0-9]+(?:\\s[NSWE](?:\\s.*Tunnel)?)?$/"
    },
    "160.problemLink": "W:How_to_label_and_name_roads_(Ireland)#Road_Types",
    "161.enabled": true,
    "161.params": {
        "solutionEN": "Rename the street to 'Nxx' or 'Nxx Local Name' or change the road type",
        "regexp": "!/^N[0-9]+( .*)?$/"
    },
    "161.problemLink": "W:How_to_label_and_name_roads_(Ireland)#Road_Types",
    "162.enabled": true,
    "162.params": {
        "solutionEN": "Rename the street to 'Rxxx' or 'Rxxx Local Name' or change the road type",
        "regexp": "!/^R[0-9]+( .*)?$/"
    },
    "162.problemLink": "W:How_to_label_and_name_roads_(Ireland)#Road_Types",
    "169.enabled": true,
    "169.params": {
        "solutionEN": "Rename the segment in accordance with the guidelines",
        "regexp": "!/^[a-záéíóúA-ZÁÉÍÓÚ0-9\\. '>(/)-]+$/"
    },
    "169.problemLink": "W:How_to_label_and_name_roads_(Ireland)#Abbreviations",
    "170.enabled": true,
    "170.params": {
        "regexp": "/(?:^|\\s)(?!(?:to|of|na|and?|(?:bP|dT|gC|h[AÁEÉIÍOÓUÚ]|mB|t[AÁS])\\S*)(?:$|\\s))(?:[a-záéíóú].*)(?:$|\\s)/"
    },
    "171.enabled": true,
    "171.params": {
        "regexp": "/(?:^|\\s)(?:Aly|Arc|Bch|Bdwy|Bnd|Btm|Blvd|Brg?|Bdge?|Brks?|Bgs?|Byp|Cswy|Ct[gr]s?|Cirs?|Clfs?|Cors?|Cr[kt]?|Cvs?|Crs[et]|Dl|Ests?|Ext|Flds?|Gdns?|Gtwy|Gl?ns?|Gt|Gr[nv]?s?|Hvn|Hbrs?|Hls?|Hts|Hghts|Hse|Ind|Jctn|Lc?ks?|Lil|Local|Ldg|Lower|Lr|Lwn?|Mls?|Mnrs?|Mdws?|Msn|Mt|N\/A|Orch|Ps?ge|Pde|Pnes?|Plns?|Pl[sz]|Please|Prts?|Private|Qy|Rdge?s?|Rename|Rs|Spgs?|Saint|St(?!(?:\\.|$|\\s(?:Lwr|Upr|[NSWE]|Great|Little|Middle|Extension)$))|St[an]|Str|Stret|Ter|Terace|Trce|Tunl|Unknown|Uppe?r?|Ur|Val|Vlys?|Vdct|Vw|Vlgs?|Wl?k|Wls?|Works?|Xing|Xrd|Nth|Est|Sth|Wst)(?:$|\\s)/i"
    },
    "171.problemLink": "W:How_to_label_and_name_roads_(Ireland)#Abbreviations"
};