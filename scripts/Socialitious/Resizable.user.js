// ==UserScript==
// @version 0.1
// @name Resizable
// @description Resize elements by dragging its handle.
// @namespace https://greasyfork.org/users/28433
// ==/UserScript==

var sel = null;
var enabled = false;
var clicked = false;
var resizing = false;
var mousex = 0;
var mousey = 0;
var border = document.createElement("div");
border.style.position = "absolute";
border.style.backgroundColor = "transparent";
border.style.background = "none";
border.style.zIndex = "99999";
border.style.border = "2px solid black";
border.style.pointerEvents = "none";
border.id = "ResizingBorder"
var handle = document.createElement("div");
handle.style.position = "absolute";
handle.style.width = "10px";
handle.style.height = "10px";
handle.style.cursor = "pointer";
handle.style.zIndex = "99999999";
handle.style.backgroundColor = "black";
handle.id = "ResizingBorderHandle";
handle.style.pointerEvents = "auto";
border.appendChild(handle);

//var clicks =

document.body.addEventListener("keyup", function(e) {
    if(e.shiftKey && e.ctrlKey) {
        if(e.which == 86) { // 'v'
            if(enabled){
                enabled = false;
                border.style.display = "none";
                handle.style.display = "none";
            }
            else {
                enabled = true;
                border.style.display = "block";
            }
        }
    }
});

document.body.onmousemove = function(e) {
    mousex = e.clientX;
    mousey = e.clientY;
};

document.body.onmouseup = function(e) {
    resizing = false;
};

// Add targeting click event to all elements
var all = document.getElementsByTagName("*");
for(var i = 0;i < all.length;i++) {
    all[i].addEventListener("mousedown", function() {
        select(this);
    });
    all[i].addEventListener("mouseup", function() {
        clicked = false;
    });
}

function select(e) {
    if(!clicked && enabled) {
        sel = e;
        clicked = true;
    }
}

handle.onmousedown = function() { clicked = true;resizing = true; };
handle.onmouseup = function() { clicked = false;resizing = false; };


document.body.appendChild(border);

setInterval(function() {
    if (enabled) {
        if(sel != null) {
            border.style.display = "block";
            handle.style.display = "block";
            border.style.top = sel.offsetTop + "px";
            border.style.left = sel.offsetLeft + "px";
            border.style.width = sel.offsetWidth + "px";
            border.style.height = sel.offsetHeight + "px";

            handle.style.top = (border.offsetHeight - 13) + "px";
            handle.style.left = (border.offsetWidth - 13) + "px";

            if(resizing) {
                sel.style.width = (mousex - sel.offsetLeft) + "px";
                sel.style.height = (mousey - sel.offsetTop) + "px";
            }
        }
    }
}, 5);
