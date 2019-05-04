// ==UserScript==
// @name                WME Validator Localization for Wyoming
// @version             0.1.5
// @author              herrchin
// @description         This script localizes WME Validator for Wyoming, USA. You also need main package (WME Validator) installed.
// @include             /^https:\/\/(www|beta)\.waze\.com\/(?!user\/)(.{2,6}\/)?editor.*$/
// @grant               none
// @run-at              document-start
// @namespace https://greasyfork.org/users/23100
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

window.WME_Validator_United_States = {
  ".country": "United States",
  ".codeISO": "US",
  ".author": "herrchin",
  ".updated": "2015-12-13",
  ".link": "https://greasyfork.org/en/scripts/14884-wme-validator-localization-for-wyoming/code",
  "27.enabled": true,
  "90.enabled": true,
  "106.enabled": true,
  "112.enabled": false,
  
  // Catch State Hwy, County Rd, Co Rd, etc.
  "130.enabled": true,
    "130.params": {
      //"titleEN": "Incorrect State Highway, County Road, or US Highway name",
      "titleEN": "Incorrect County Road or US Highway name",
      "problemEN": "Wyoming uses State Hwy ###, County Hwy ###, CR-## for properly abbreviated road names, and US-#",
      "solutionEN": "Rename the Street or Alt Street per Wyoming Wiki Standards",
      "template": "${state}:${street}#${altStreet[#]}",
      //"regexp": "/Wyoming:.*(WY-\\d{2,3}|Co(unty)? R(oa)?d|U\\.?[Ss]\\.? [Hh](WY|wy|ighway))/",
      "regexp": "/Wyoming:.*(Co(unty)? R(oa)?d|U\\.?[Ss]\\.? [Hh](WY|wy|ighway))/",
  },
  "130.solutionLink": "https://wiki.waze.com/wiki/Wyoming#State_highway_naming",
  
  // Roads that have State set to something other than Wyoming (basemap issue). This will be NOISY outside Wyoming, so be sure to disable this script when editing elsewhere
  "131.enabled": true,
  "131.params": {
      "titleEN": "State is not set to Wyoming",
      "problemEN": "Basemap roads may be incorrectly set as something other than Wyoming",
      "solutionEN": "Verify that you are editing in Wyoming, then update the State field",
      "template": "${state}",
      "regexp": "!/^Wyoming/",
  },
  
  // Missing elevations
  // "131.enabled": true,
  
  
  // Wyoming locking standards
  // freeway
  "150.enabled": true,
  "150.params": {
      "n": 4,
  },
  "150.solutionLink": "https://wiki.waze.com/wiki/Wyoming#Locking_standard",
  // MH
  "151.enabled": true,
  "151.params": {
      "n": 4,
  },
  "151.solutionLink": "https://wiki.waze.com/wiki/Wyoming#Locking_standard",
  // mH
  "152.enabled": true,
  "152.params": {
      "n": 3,
  },
  "152.solutionLink": "https://wiki.waze.com/wiki/Wyoming#Locking_standard",
  // PS
  "154.enabled": true,
  "154.params": {
      "n": 2,
  },
  "154.solutionLink": "https://wiki.waze.com/wiki/Wyoming#Locking_standard",
  // Ramp
  "153.enabled": true,
  "153.params": {
      "n": 4,
  },
  "153.solutionLink": "https://wiki.waze.com/wiki/Wyoming#Locking_standard",
  

  "170.enabled": true,
  "170.params": {
    "regexp": "/^(?!(to) [^a-z])((S|N|W|E) )?[a-z]/"
  },
  "171.enabled": true,
  "171.params": {
    "regexp": "/((?!(\\bPhila|\\bPenna|.(\\bWash|\\bCmdr|\\bProf|\\bPres)|..(\\bAdm|\\bSte|\\bCpl|\\bMaj|\\bSgt|\\bRe[vc]|\\bR\\.R|\\bGov|\\bGen|\\bHon|\\bCpl)|...(\\bSt|\\b[JSD]r|\\bLt|\\bFt)|...(#| )[NEWSR])).{5}\\.|((?!(hila|enna|(\\bWash|\\bCmdr|\\bProf|\\bPres)|.(\\bAdm|\\bSte|\\bCpl|\\bMaj|\\bSgt|\\bRe[vc]|\\bR\\.R|\\bGov|\\bGen|\\bHon|\\bCpl)|..(\\bSt|\\b[JSD]r|\\bLt|\\bFt)|..(#| )[NEWSR])).{4}|(\\bhila|\\benna))\\.|((?!(ila|nna|(ash|mdr|rof|res)|(\\bAdm|\\bSte|\\bCpl|\\bMaj|\\bSgt|\\bRe[vc]|\\bR\\.R|\\bGov|\\bGen|\\bHon|\\bCpl)|.(\\bSt|\\b[JSD]r|\\bLt|\\bFt)|.(#| )[NEWSR])).{3}|\\b(ila|nna|ash|mdr|rof|res))\\.|((?!(la|na|(sh|dr|of|es)|(dm|te|pl|aj|gt|e[vc]|\\.R|ov|en|on|pl)|(\\bSt|\\b[JSD]r|\\bLt|\\bFt)|(#| )[NEWSR])).{2}|\\b(la|na|sh|dr|of|es|dm|te|pl|aj|gt|e[vc]|\\.R|ov|en|on|pl))\\.|(#|^)[^NEWSR]?\\.)|(((?!\\b(D|O|L)).|#|^)'(?![sl]\\b)|(#|^)'s|(?!\\b(In|Na)t).{3}'l|(#|^).{0,2}'l)|(Dr|St)\\.(#|$)|,|;|\\\\|((?!\\.( |#|$|R))\\..|(?!\\.( .|#.|$|R\\.))\\..{2}|\\.R(#|$|\\.R))|[Ee]x(p|w)y\\b|\\b[Ee]x[dn]\\b|Tunl\\b|Long Is\\b|Brg\\b/",
    "problemEN": "The street name has incorrect abbreviation, or character",
    "solutionEN": "Check upper/lower case, a space before/after the abbreviation and the accordance with the abbreviation table. Remove any comma (,), backslash (\\), or semicolon (;)"
  },
  "171.solutionLink": "W:Abbreviations_and_acronyms/USA#Standard_suffix_abbreviations"
};
