// ==UserScript==
// @name         HSLO LITE PRIVATE SERVER
// @namespace    JoseFredoHD
// @version      2.2
// @description  Extension Private Server
// @author       szymy, 2coolife, sniikz (themes)
// @match        http://agar.io/*
// @run-at       document-start
// @grant        GM_xmlhttpRequest
// @connect      agar.io
// ==/UserScript==

function loadScript(e) {var script = e.replace("</head>", '<script src="http://2coolife.com/hslolite2/perfect-scrollbar.jquery.min.js"></script><script src="http://2coolife.com/hslolite2/sniff.js"></script><link href="http://2coolife.com/hslolite2/style.css" rel="stylesheet"></link><script src="http://cdnjs.cloudflare.com/ajax/libs/bootstrap-colorpicker/2.3.6/js/bootstrap-colorpicker.min.js"></script><link href="http://cdnjs.cloudflare.com/ajax/libs/bootstrap-colorpicker/2.3.6/css/bootstrap-colorpicker.css" rel="stylesheet"></link><script src="http://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.js" charset="utf-8"></script><link href="http://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.css" rel="stylesheet"></link></head>').replace(/<script.*?>[\s]*?.*?window\.NREUM[\s\S]*?<\/script>/, "").replace(/<script.*?src=".*?agario\.core\.js.*?><\/script>/, "").replace("</body>", '<script src="http://2coolife.com/hslolite2/litev2.js" charset="utf-8"></script><link href="https://fonts.googleapis.com/css?family=Oswald:400,300" rel="stylesheet" type="text/css"><link href="https://fonts.googleapis.com/css?family=Arimo:400,700" rel="stylesheet"><link href="https://fonts.googleapis.com/css?family=Ubuntu:300,400,500" rel="stylesheet"></body>');return script;}window.stop();document.documentElement.innerHTML = "";GM_xmlhttpRequest({method : "GET",url : "http://agar.io/",onload : function(e) {var doc = loadScript(e.responseText);document.open();document.write(doc);document.close();}});if (location.host == "agar.io" && location.pathname == "/") {location.href = "josefredo" + location.hash;return;}
