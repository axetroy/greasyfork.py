// ==UserScript==
// @name         Gaver Macro For Fans
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Try winning games in gaver,gota, and more ;) A is Tripplesplit D is 16 S is to stand in center. Adding more soon ;) 
// @author       SWOH
// @match        http://gaver.io/beta/
// @match        http://gota.io/web///
// @run-at       document-end
// ==/UserScript==



window.addEventListener('keydown', keydown);
window.addEventListener('keyup', keyup);

var EjectDown = false;

var speed = 25; //in ms

function keydown(event) {
    if (event.keyCode == 87 && EjectDown === false) { // key W
        EjectDown = true;
        setTimeout(eject, speed);
    }
    if (event.keyCode == 68) { //key D
        split();
        setTimeout(split, speed);
        setTimeout(split, speed*2);
        setTimeout(split, speed*3);
        setTimeout(speed*4);
        setTimeout(speed*5);
          }
    if (event.keyCode == 83) { //key S
        X = window.innerWidth/2;
        Y = window.innerHeight/2;
        $("canvas").trigger($.Event("mousemove", {clientX: X, clientY: Y}));
    }
}

function keyup(event) {
    if (event.keyCode == 87) { // key W
        EjectDown = false;
    }
}
function eject() {
    if (EjectDown) {
        window.onkeydown({keyCode: 87}); // key W
        window.onkeyup({keyCode: 87});
        setTimeout(eject, speed);
    }

    } // Triplesplit
    if (event.keyCode == 65 || event.keyCode == 65) {
        split();
        setTimeout(split, speed);
        setTimeout(split,speed*2)
        setTimeout(speed*3);
       

