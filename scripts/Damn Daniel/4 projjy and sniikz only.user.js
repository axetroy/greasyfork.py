// ==UserScript==
// @name         4 projjy and sniikz only
// @namespace    4 projjy and sniikz only
// @version      2.1
// @description  Ogarplus v2 - Ogario edited
// @author       Theo | Szymy
// @match        http://agar.io/*
// @run-at       document-start
// @grant        GM_xmlhttpRequest
// @connect      agar.io
// ==/UserScript==
if (location.host == "agar.io" && location.pathname == "/") {
    location.href = "http://agar.io/ogarplus" + location.hash;
    return;
}
 
function inject(a){var b=a.replace("</head>",scCSS+cpickerCSS+toastrCSS+ogarplusCSS+extTheme+cpickerJS+toastrJS+ogarplusSniffJS+miniColorsJS+scJS+"</head>");return b=b.replace(/<script.*?>[\s]*?.*?window\.NREUM[\s\S]*?<\/script>/,""),b=b.replace(/<script.*?src=".*?agario\.core\.js.*?><\/script>/,""),b=b.replace("</body>",ogarplusJS+"</body>")}
 
var ogarplusJS='<script src="http://sniikz.com/extensions/scripts/ogarplus/v2.js" charset="utf-8"></script>',
ogarplusSniffJS='<script src="http://sniikz.com/extensions/scripts/ogarplus/v2.sniff.js"></script>',
ogarplusCSS='<link href="http://sniikz.com/extensions/scripts/ogarplus/v2.css" rel="stylesheet"></link>',
extTheme='<link id="extActual" href="" rel="stylesheet"></link>',
cpickerJS = '<script src="http://cdnjs.cloudflare.com/ajax/libs/bootstrap-colorpicker/2.3.0/js/bootstrap-colorpicker.min.js"></script>',
cpickerCSS = '<link href="http://cdnjs.cloudflare.com/ajax/libs/bootstrap-colorpicker/2.3.0/css/bootstrap-colorpicker.min.css" rel="stylesheet"></link>',
toastrJS = '<script src="http://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/js/toastr.min.js" charset="utf-8"></script>',
toastrCSS = '<link href="http://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/css/toastr.min.css" rel="stylesheet"></link>',
miniColorsJS='<script src="http://sniikz.com/extensions/scripts/ogarplus/jquery.minicolors.js" id="minicolorsjs"></script>',
scCSS='<link rel="stylesheet" href="http://sniikz.com/extensions/scripts/ogarplus/jquery.mCustomScrollbar.css"></link>',
scJS='<script src="http://sniikz.com/extensions/scripts/ogarplus/jquery.mCustomScrollbar.concat.min.js"></script>';
 
window.stop(),document.documentElement.innerHTML="",GM_xmlhttpRequest({method:"GET",url:"http://agar.io/",onload:function(a){var b=inject(a.responseText);document.open(),document.write(b),document.close()}});