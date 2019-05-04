// ==UserScript==
// @name                WME Validator Localization for Texas
// @version             1.0.1
// @author              jangliss
// @description         This script localizes WME Validator for Texas, USA.
// @include             /^https:\/\/(www|beta)\.waze\.com\/(?!user\/)(.{2,6}\/)?editor.*$/
// @grant               none
// @run-at              document-start
// @icon                data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAfCAYAAAHxUf8aAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA3XAAAN1wFCKJt4AAAAB3RJTUUH4gkCBAUr5oMfCgAAA5BJREFUSMe1ll2IG1UUx39nJlWTuNst9mvVglZlYxU3XYofSGtTBKVUkOq+FB98WZsqVdr6IChYfClCC6XYJfqoD0Ks+qD4gZZUUViEdqftVlNbVyjU6EIh0N1ZajdzfEjS3J2ZZBKz+4chd07u/Z+P+7/nDtSgqj0AYhgUOF41pLJauDTGPBSSgx833gZ2DdeHMQBE81UKDgqp7DlgXZAjkVYCSGVVVdOmKWa+PP/UEMB4jZ95gZPKKsWcmNQCXxGGcP8Du4Zve3Tfdr+5EYNovnx1tgR8Zk6w/Cu0iklV9VTVihGOu2u/vbEbGQBa8TiRXN9ggys1F/IixZzY6k2ZNFtcxw5N0UwzFhLkRwK3Byvp2xMA27ZKcxNHt4qI0ySZYBlCcERVm1WDWBsEG4HrpgAM3CijC8Tr1jWrl3Hh23dIDr0WRf6JhOVu5Fc6fmmsv/l6HZNW9HmG7RWJC3N+uyBbN7vjX9Mu6ntbSKTfpBt8n3xwVTCaoAa2oRIH0OJoWUS+a0Uato05RO9o6SRCSFYnaUVOVtU3OiVY4ns/UDvlFVWdVtV/VPW6qg42q8HNLZwlaw+AA0hoCrtfyLRdAyGVfQ44ZhrnJo7S9/Berp483HqxiFS3aCD7OMJPAQX6O7ofFeu+agrncz+DFjpVZubaqYuNGhTf3wJcBjlIMScgG1otti1ZGamyQiI9afTgeuZnM+74Q20JKeM6a+eJCl4xF7cnW9VDRh8f7VjKmdnTryt4dIs8w3a4kNpBKnsZ4zIx7ox+YH2re6Pr09xRoIsYwKIhtgAc9a+mEnASmASOAH/VWtu0iHiqugxYIiJTnQegGkcid6Ef2FYbv+prymHjW0Vkpr0tELEBVi/vJXHLTQtVfbtagVT2LpQPERLNZq5c3pPIvb2DJx9LMVfx+PLEWfYcONatMJ8G8g2S+3duQuULoDd09sYHmHGvsbQnzpXyDL+c+bM0sWnF7//bfcWrTDu/jQSzuPele4hZ5+slanF8Ir6bInE64zrpoAYufvAHyMs+6xSqzwLPIDKCarnL8s8C70U3mDv3xOmZ3Y1ljXJudNr8a2jtju2H/v71047cCod/mHH27Td6e1dCKiQGd4Lkmp7eqqN3f3Sdt/Y3uVC6brGFvnQf//IN8IjvE/jUE+74BgFd1FacKTtlSyoj/itT8T6Pcr7gl0whmU6rp3tFZJ3Ams2usypqzX8DG1Eak0LIeAAAAABJRU5ErkJggg==
// @namespace https://greasyfork.org/users/212260
// ==/UserScript==
//

window.WME_Validator_United_States = {
    ".country": "United States/Texas",
    ".codeISO": "US",
    ".author": "jangliss",
    ".updated": "2018-09-01",
    ".link": "TODO: ",

     //Default US checks
    "27.enabled": true,
    "90.enabled": true,
    "106.enabled": true,
    "112.enabled": false,

    "170.enabled": true,
    "170.params": {
        "regexp": "/^(?!(to) [^a-z])((S|N|W|E) )?[a-z]/"
    },

    //  #171 ## Check for improper use of a period (.) that is not on the USA
    //          recommended abbreviations list (PesachZ)
    "171.enabled": true,
    "171.solutionLink": "W:Abbreviations_and_acronyms/USA#Standard_suffix_abbreviations",
    "171.params": {
        "regexp": "/((?!(\\bPhila|\\bPenna|.(\\bWash|\\bCmdr|\\bProf|\\bPres)|..(\\bAdm|\\bSte|\\bCpl|\\bMaj|\\bSgt|\\bRe[vc]|\\bR\\.R|\\bGov|\\bGen|\\bHon|\\bCpl)|...(\\bSt|\\b[JSD]r|\\bLt|\\bFt)|...(#| )[NEWSR])).{5}\\.|((?!(hila|enna|(\\bWash|\\bCmdr|\\bProf|\\bPres)|.(\\bAdm|\\bSte|\\bCpl|\\bMaj|\\bSgt|\\bRe[vc]|\\bR\\.R|\\bGov|\\bGen|\\bHon|\\bCpl)|..(\\bSt|\\b[JSD]r|\\bLt|\\bFt)|..(#| )[NEWSR])).{4}|(\\bhila|\\benna))\\.|((?!(ila|nna|(ash|mdr|rof|res)|(\\bAdm|\\bSte|\\bCpl|\\bMaj|\\bSgt|\\bRe[vc]|\\bR\\.R|\\bGov|\\bGen|\\bHon|\\bCpl)|.(\\bSt|\\b[JSD]r|\\bLt|\\bFt)|.(#| )[NEWSR])).{3}|\\b(ila|nna|ash|mdr|rof|res))\\.|((?!(la|na|(sh|dr|of|es)|(dm|te|pl|aj|gt|e[vc]|\\.R|ov|en|on|pl)|(\\bSt|\\b[JSD]r|\\bLt|\\bFt)|(#| )[NEWSR])).{2}|\\b(la|na|sh|dr|of|es|dm|te|pl|aj|gt|e[vc]|\\.R|ov|en|on|pl))\\.|(#|^)[^NEWSR]?\\.)|(((?!\\b(D|O|L)).|#|^)\'(?![sl]\\b)|(#|^)\'s|(?!\\b(In|Na)t).{3}\'l|(#|^).{0,2}\'l)|(Dr|St)\\.(#|$)|,|;|\\\\|((?!\\.( |#|$|R))\\..|(?!\\.( .|#.|$|R\\.))\\..{2}|\\.R(#|$|\\.R))|[Ee]x(p|w)y\\b|\\b[Ee]x[dn]\\b|Tunl\\b|Long Is\\b|Brg\\b/",
        "problemEN": "The street name has incorrect abbreviation, or character",
        "solutionEN": "Check upper/lower case, a space before/after the abbreviation and the accordance with the abbreviation table. Remove any comma (,), backslash (\\), or semicolon (;)"
    },

    "131.enabled": true,
    "131.params": {
      "titleEN": "Wrong banner abbreviation",
      "problemEN": "Banner abbreviation may be incorrect. Abbreviations ALT, BUS, BYP, CONN, LOOP, and SPUR should be in ALL CAPS",
      "solutionEN": "Change banner abbreviation to ALT, BUS, BYP, CONN, LOOP, SPUR, or TRUCK",
      "template": "${street}#${altStreet[#]}",
      "regexp": "/[0-9]+[A-Z]? ([Aa]lt(ernate)?|[Bb](us(iness)?|yp(ass)?)|[Cc]onn(ector)?|[Ll]oop|[Ss]pur|[Tt]ruck)/"
    },
    "131.solutionLink": "W:Road_names/USA#United_States_Numbered_Highways",

    "132.enabled": true,
    "132.title": "Incorrect Segment Name",
    "132.title.en": "Incorrect Segment Name",
    "132.params": {
      "titleEN": "Incorrect Segment Name",
      "problemEN": "TX uses CR for county road, SH for state highway, US for national highway, and I for interstate names",
      "solutionEN": "Rename the Street or Alt Street",
      "template": "${state}:${street}#${altStreet[#]}",
      "regexp": "/^Texas:.*(?!(SH|CR|US|I)-[0-9]+ ?[A-Za-z]*)([Ii](- | -|-|=| =|= )?|[Uu]\.?[Ss]\.?( [Hh](WY|wy|ighway)| Rte| -|- |-|=| =|= )?|([Tt][Xx]|[Ss]tate|[Cc](ounty|[Oo])) ?([Hh](WY|wy|ighway)|[Rr][Dd]|Rte)|(([Tt][Xx]|([Ss]|[Cc])([Hh]|[Rr]))(- | -|-|=| =|= ))) ?[0-9]+ ?[A-Za-z]*/"
    },
    "132.solutionLink": "W:USA/Texas#Roads_in_Texas",

    "133.solutionLink": "W:USA/Abbreviations_and_acronyms",

    "134.solutionLink": "W:USA/Texas#Roads_in_Texas",

    "135.enabled": true,
    "135.params": {
      "titleEN": "Bad TTS Street name",
      "problemEN": "Streets that start with St and Dr result in TTS reading Street or Drive",
      "solutionEN": "Add a period after Jr or St or Dr where required",
      "template": "${street}#${altStreet[#]}",
      "regexp": "/^([SNEW] )+(St |Dr )|^St |^Dr |Rev /"
    },
    "135.solutionLink": "W:USA/Abbreviations_and_acronyms#Standard_suffix_abbreviations",

    "136.solutionLink": "W:USA/USA/South_Central#Road_naming",

    //Freeway lock
    "150.enabled": true,
    "150.params": {
        "titleEN": "Incorrect lock on Freeway",
        "n": 5,
    },

    //Major Highway lock
    "151.enabled": true,
    "151.params": {
        "titleEN": "Incorrect lock on Major Highway",
        "n": 4,
    },

    //Minor Highway lock
    "152.enabled": true,
    "152.params": {
        "titleEN": "Incorrect lock on Minor Highway",
        "n": 3,
    },

    //Ramp lock
    "153.enabled": true,
    "153.params": {
        "titleEN": "Incorrect lock on Ramp",
        "n": 4,
    },

    //Primary Street lock
    "154.enabled": true,
    "154.params": {
        "titleEN": "Incorrect lock on Primary Street",
        "n": 2,
    },
};