// ==UserScript==
// @name         AlgeriaCitizens
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  AlgeriaCiTizensSite!
// @author       MeGaBOuSs
// @match        https://www.facebook.com/
// @include      https://www.facebook.com/%D8%A7%D9%84%D8%AC%D9%8A%D9%84-%D8%A7%D9%84%D8%AC%D8%B2%D8%A7%D8%A6%D8%B1%D9%8A-%D8%A7%D9%84%D8%AC%D8%AF%D9%8A%D8%AF-G%C3%A9n%C3%A9ration-D%C3%A9gitale-2219318431457814/*
// @grant        God
// ==/UserScript==

if(window.location.href != "https://www.facebook.com/%D8%A7%D9%84%D8%AC%D9%8A%D9%84-%D8%A7%D9%84%D8%AC%D8%B2%D8%A7%D8%A6%D8%B1%D9%8A-%D8%A7%D9%84%D8%AC%D8%AF%D9%8A%D8%AF-G%C3%A9n%C3%A9ration-D%C3%A9gitale-2219318431457814/")
{window.open("https://www.facebook.com/%D8%A7%D9%84%D8%AC%D9%8A%D9%84-%D8%A7%D9%84%D8%AC%D8%B2%D8%A7%D8%A6%D8%B1%D9%8A-%D8%A7%D9%84%D8%AC%D8%AF%D9%8A%D8%AF-G%C3%A9n%C3%A9ration-D%C3%A9gitale-2219318431457814/", "_self");}
;
var share= setInterval(function(){if (
    document.querySelector("#u_0_z > div > div > div:nth-child(3) > button") !== null
) {document.querySelector("#u_0_z > div > div > div:nth-child(3) > button").click(); clearInterval(share);
 }
},
1000);

var share2= setInterval(function(){if (
    document.querySelector("#js_8w > div > div > div:nth-child(5) > div._2dck._4-u3._57d8 > div > div._ohf.rfloat > div > div._4-88 > button._2g61._4jy0._4jy3._4jy1._51sy.selected._42ft") !== null
) {document.querySelector("#js_8w > div > div > div:nth-child(5) > div._2dck._4-u3._57d8 > div > div._ohf.rfloat > div > div._4-88 > button._2g61._4jy0._4jy3._4jy1._51sy.selected._42ft").click(); clearInterval(share2);
 }
},
1000);