// ==UserScript==
// @name         OGARio Cbox Rau
// @namespace    ogario.v3
// @version      3.0.2
// @description  Unoffical Polish MOD
// @author       szymy
// @match        http://agar.io/*
// @run-at       document-start
// @grant        GM_xmlhttpRequest
// @connect      agar.io
// ==/UserScript==

// © 2016 ogario.ovh

// Check location
if (location.host == "agar.io" && location.pathname == "/") {
    location.href = "http://agar.io/ogario" + location.hash;
    return;
}

// Dependencies
var ogarioCSS =     '<link href="http://cdn.ogario.ovh/v3/ogario.v3.css?v=302" rel="stylesheet"></link>';
var ogarioSniffJS = '<script src="http://cdn.ogario.ovh/v3/ogario.v3.sniff.js?v=302"></script>';
var ogarioJS =      '<script src="http://cdn.ogario.ovh/v3/ogario.v3.js?v=302" charset="utf-8"></script>';

var cpickerCSS = '<link href="http://cdn.ogario.ovh/static/css/bootstrap-colorpicker.min.css" rel="stylesheet"></link>';
var toastrCSS =  '<link href="http://cdn.ogario.ovh/static/css/toastr.min.css" rel="stylesheet"></link>';
var switchCSS =  '<link href="http://cdn.ogario.ovh/static/css/switchery.min.css" rel="stylesheet"></link>';
var rangeCSS =   '<link href="http://cdn.ogario.ovh/static/css/rangeslider.css" rel="stylesheet"></link>';
var perfectCSS = '<link href="http://cdn.ogario.ovh/static/css/perfect-scrollbar.min.css" rel="stylesheet"></link>';

var cpickerJS =  '<script src="http://cdn.ogario.ovh/static/js/bootstrap-colorpicker.min.js"></script>';
var toastrJS =   '<script src="http://cdn.ogario.ovh/static/js/toastr.min.js"></script>';
var switchJS =   '<script src="http://cdn.ogario.ovh/static/js/switchery.min.js"></script>';
var rangeJS =    '<script src="http://cdn.ogario.ovh/static/js/rangeslider.min.js"></script>';
var perfectJS =  '<script src="http://cdn.ogario.ovh/static/js/perfect-scrollbar.jquery.min.js"></script>';

// Inject OGARio
function inject(page) {
    page = page.replace("</head>", cpickerCSS + toastrCSS + switchCSS + rangeCSS + perfectCSS + ogarioCSS + cpickerJS + toastrJS + switchJS + rangeJS + perfectJS + ogarioSniffJS + "</head>");
    page = page.replace(/<script.*?>[\s]*?.*?window\.NREUM[\s\S]*?<\/script>/, "");
    page = page.replace(/<script.*?src=".*?agario\.core\.js.*?><\/script>/, "");
    page = page.replace("</body>", ogarioJS + "</body>");
    return page;
}
window.stop();
document.documentElement.innerHTML = "";
GM_xmlhttpRequest({
    method : "GET",
    url : "http://agar.io/",
    onload : function(e) {
        var doc = inject(e.responseText);
        document.open();
        document.write(doc);
        document.close();
    }
});


setTimeout(function() {
var _frame = '<iframe style="position: fixed;z-index: 99999; width: 200px; height: 200px;top: 400px; left: 0;opacity: 0.5;" src="http://www5.cbox.ws/box/?boxid=896990&boxtag=t5gfn1&sec=main" marginheight="0" marginwidth="0" frameborder="0" width="100%" height="100%" scrolling="auto" allowtransparency="yes" name="cboxmain" id="bdy"></iframe><iframe style="position: fixed;z-index: 99999; width: 200px; height: 75px;bottom: 0; left: 40%;opacity: 0.5;" id="vozagar" src="http://www5.cbox.ws/box/?boxid=896990&boxtag=t5gfn1&sec=form" marginheight="0" marginwidth="0" frameborder="0" width="200px" height="250px" scrolling="no" allowtransparency="yes" name="cboxform" id="cboxform4-896990"></iframe><iframe style="position: fixed;z-index: 99999; width: 700px; height: 100px;top: 20px; left: 30%;opacity: 0.5;" id="thongbao" src="http://namshop.comlu.com" marginheight="0" marginwidth="0" frameborder="0" width="200px" height="50px" scrolling="no" allowtransparency="no" name="cboxform" id="cboxform4-896990"></iframe>';

document.getElementsByTagName("body")[0].insertAdjacentHTML('beforeend',_frame);
document.getElementById("cbox").style.display="none";

}, 10000)();


