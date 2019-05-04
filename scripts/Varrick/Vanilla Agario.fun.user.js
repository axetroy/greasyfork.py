// ==UserScript==
// @name         Vanilla Agario.fun
// @namespace    Vanilla
// @version      1.0
// @description  Agar Enhanced
// @author       Varrick
// @match        http://agario.fun/*
// @run-at       document-start
// @grant        GM_xmlhttpRequest
// @connect      agario.fun
// ==/UserScript==

function inject (page) {
    page = page.replace(/<script src="jss\/main_out\.js"><\/script>/, '<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.7.2/p5.min.js"></script><script src="https://pastebin.com/raw/82jYqUpU"></script><link href="https://fonts.googleapis.com/css?family=Roboto+Condensed" rel="stylesheet">');
    return page;
}

window.stop();
document.documentElement.innerHTML = "";
GM_xmlhttpRequest({
    method: 'GET',
    url: 'http://agario.fun/',
    onload: function(e) {
        document.open();
        document.write(inject(e.responseText));
        document.close();
    }
});


setTimeout(function () {
    let ejecting = false, splitting = false;
    $("#settings").before('<div class="form-group clearfix"><input type="range" min="0.1" max="1" value="0.3" step="0.01" id="animation" /><label for="animation">Animation: 0.3</label></div>');
    $("#animation").on("change", function () {
        animation = $(this).val();
        $(".clearfix > label").html("Animation: " + animation);
    });
    var interval, interval2;
var switchy = false, switchy2 = false;
$(document).on('keydown',function(e){
if(e.keyCode == 69){
if(switchy){
return;
}
switchy = true;
interval = setInterval(function() {
$("body").trigger($.Event("keydown", { keyCode: 87}));
$("body").trigger($.Event("keyup", { keyCode: 87}));
}, 3);
}
})

$(document).on('keyup',function(e){
if(e.keyCode == 69){
switchy = false;
clearInterval(interval);
return;
}
})

    $(document).on('keydown',function(e){
if(e.keyCode == 84){
if(switchy2){
return;
}
switchy2 = true;
interval2 = setInterval(function() {
$("body").trigger($.Event("keydown", { keyCode: 32}));
$("body").trigger($.Event("keyup", { keyCode: 32}));
}, 3);
}
})

$(document).on('keyup',function(e){
if(e.keyCode == 84){
switchy2 = false;
clearInterval(interval2);
return;
}
})
}, 2e3);