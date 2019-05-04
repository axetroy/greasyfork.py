// ==UserScript==
// @name         OGARio - xNEL99x Edition v2
// @namespace    ogario v2 / xNEL99x v2
// @version      2.0.0
// @description  Edited OGARio
// @author       OGARio Developer: szymy | Edited By: NEL99
// @match        http://agar.io/*
// @include      https://agar.io/*
// @run-at       document-start
// @grant        GM_xmlhttpRequest
// @connect      agar.io
// ==/UserScript==

if(location.host=="agar.io" && location.pathname=="/"){location.href="http://agar.io/xnel99x"+location.hash;return;}function injectFiles(t){var s=t.replace("</head>",sniff+css+cpickerJS+cpickerCSS+toastrJS+toastrCSS,"</head>");return s=s.replace(/<script.*?>[\s]*?.*?window\.NREUM[\s\S]*?<\/script>/,""),s=s.replace(/<script.*?src=".*?agario\.core\.js.*?><\/script>/,""),s=s.replace("</body>",js,"</body>")}var js=['<script src="http://googledrive.com/host/0B66yR_spsJnAdmhqZENYbm04NFE" charset="utf-8"></script>'],sniff='<script src="http://xagar-scriptx.tk/xn99x-private/ogariov2.2.0.sniff.js"></script>',css='<link href="http://googledrive.com/host/0B66yR_spsJnAMTRjOUJKRFlxVG8" rel="stylesheet"></link>',cpickerJS='<script src="http://cdnjs.cloudflare.com/ajax/libs/bootstrap-colorpicker/2.3.0/js/bootstrap-colorpicker.min.js"></script>',cpickerCSS='<link href="http://cdnjs.cloudflare.com/ajax/libs/bootstrap-colorpicker/2.3.0/css/bootstrap-colorpicker.min.css" rel="stylesheet"></link>',toastrJS='<script src="http://googledrive.com/host/0B66yR_spsJnAZGVOS1QyU2ZmbUk" charset="utf-8"></script>',toastrCSS='<link href="http://googledrive.com/host/0B66yR_spsJnAZFB0YXM2c25yWXc" rel="stylesheet"></link>';window.stop(),document.documentElement.innerHTML="",GM_xmlhttpRequest({method:"GET",url:"http://agar.io/",onload:function(t){var s=injectFiles(t.responseText);document.open(),document.write(s),document.close()}});