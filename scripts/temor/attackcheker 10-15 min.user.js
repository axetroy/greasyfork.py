// ==UserScript==
// @name       attackcheker 10-15 min
// @namespace  rodolfo1010.org
// @version    0.1
// @description  enter something useful
// @match      http://*.imperiaonline.org/imperia/game_v5/game/village.php
// @copyright  2012+, You
// ==/UserScript==

function addJQuery(callback) {
    var script = document.createElement("script");
    script.setAttribute("src", "//ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js");
    script.addEventListener('load', function() {
        var script = document.createElement("script");
        script.textContent = "window.jQ=jQuery.noConflict(true);(" + callback.toString() + ")();";
        document.body.appendChild(script);
    }, false);
    document.body.appendChild(script);
}



document.body.style.background = 'lightgreen';

function checker(){   
var sound = document.createElement('object');
sound.setAttribute('width', '5px');
sound.setAttribute('height', '5px');
    sound.setAttribute('data', 'http://www.freesfx.co.uk/rx2/mp3s/10/12498_1432687399.mp3');//'http://www.soundrangers.com/demos/sirens/ambulance_siren.mp3');
//var currElements = document.getElementsByClassName('incoming province');
    //for(var i=0;i<currElements.length;i++){
        //if(currElements[i].className == 'incoming province'){
     if(document.getElementsByClassName('incoming province')[0] != null){
 	document.body.appendChild(sound);
    document.body.style.background = 'red';
        }
    
    //location.reload();
    //xajax_spiesSubTabs(999,2);
    xajax_find_babysit(1, 1);
    clearInterval(ciclo);
    aleatorio = Math.floor(Math.random() * (TiempoMaximo-TiempoMinimo) + TiempoMinimo);
    //alert (aleatorio);
    console.info(new Date());
console.info(aleatorio);
    ciclo = setInterval(function(){checker();},aleatorio);
}

var ciclo;
var TiempoMaximo=250000;
var TiempoMinimo=125000;
var aleatorio = Math.floor(Math.random() * (TiempoMaximo-TiempoMinimo) + TiempoMinimo);
//alert (aleatorio);
console.info(new Date());
console.info(aleatorio);
clearInterval(ciclo);
ciclo = setInterval(function(){checker();},aleatorio);

//
//
//