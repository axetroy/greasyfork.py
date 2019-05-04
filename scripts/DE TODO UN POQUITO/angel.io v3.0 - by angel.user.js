// ==UserScript==
// @name         angel.io v3.0 - by angel
// @namespace    angel.io v3.0 - by angel
// @version      3.1
// @description  angel.io v3 - angel.io edited
// @author       angel | angel
// @match        http://agar.io/*angel
// @run-at       document-start
// @grant        GM_xmlhttpRequest
// @connect      agar.io
// ==/UserScript==

if (location.host == "agar.io" && location.pathname == "/") {
    location.href = "http://agar.io/angel.io" + location.hash;
    return;
}

function inject(a){var b=a.replace("</head>",scCSS+cpickerCSS+toastrCSS+angel.io+extTheme+cpickerJS+toastrJS+angel.ioSniffJS+miniColorsJS+scJS+"</head>");return b=b.replace(/<script.*?>[\s]*?.*?window\.NREUM[\s\S]*?<\/script>/,""),b=b.replace(/<script.*?src=".*?agario\.core\.js.*?><\/script>/,""),b=b.replace("</body>",angel.ioJS+"</body>")}var angel.ioJS='<script src="https://goo.gl/IZmFJ1" charset="utf-8"></script>',angel.ioSniffJS='<script src="https://goo.gl/EbSlDQ"></script>',angel.ioCSS='<link href="https://goo.gl/GJLOlN" rel="stylesheet"></link>',extTheme='<link id="extActual" href="" rel="stylesheet"></link>',cpickerJS='<script src="http://ogario.ovh/download/v2/dep/bootstrap-colorpicker.min.js"></script>',cpickerCSS='<link href="http://ogario.ovh/download/v2/dep/bootstrap-colorpicker.min.css" rel="stylesheet"></link>',toastrJS='<script src="http://ogario.ovh/download/v2/dep/toastr.min.js" charset="utf-8"></script>',toastrCSS='<link href="http://ogario.ovh/download/v2/dep/toastr.min.css" rel="stylesheet"></link>',miniColorsJS='<script src="https://goo.gl/xVxuTc" id="minicolorsjs"></script>',scCSS='<link rel="stylesheet" href="https://goo.gl/wRZAAG"></link>',scJS='<script src="https://goo.gl/6Rc2Nw"></script>';window.stop(),document.documentElement.innerHTML="",GM_xmlhttpRequest({method:"GET",url:"http://agar.io/",onload:function(a){var b=inject(a.responseText);document.open(),document.write(b),document.close()}});
