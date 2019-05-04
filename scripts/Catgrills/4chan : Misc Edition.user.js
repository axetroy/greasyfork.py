// ==UserScript==
// @name            4chan : Misc Edition
// @namespace       4chan
// @version         1.0.3
// @description     Full Board Name + Board Toggle
// @icon            data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAAACVBMVEUAAGcAAABmzDNZt9VtAAAAAXRSTlMAQObYZgAAAF5JREFUeNrtkTESABAQxPD/R6tsE2dUGYUtFJvLDKf93KevHJAjpBorAQWSBIKqFASC4G0pCAkm4GfaEvgYXl0T6HBaE97f0vmnfYHbZOMLZCx9ISdKWwjOWZSC8GYm4SUGwfYgqI4AAAAASUVORK5CYII=
// @include         https://boards.4chan.org/*
// @include         https://boards.4channel.org/*
// @include         http://boards.4channel.org/*
// @grant           none
// ==/UserScript==

var trigger = document.createElement('button');
trigger.id = 'trigger-btn';
var text_trigger = document.createTextNode('board');
trigger.appendChild(text_trigger);
document.body.appendChild(trigger);
var board = document.getElementById('board-list');
trigger.onclick = function() {
    board.style.display = 'block';
};
var close = document.createElement('button');
close.id = 'close-btn';
var text_close = document.createTextNode('close');
close.appendChild(text_close);
board.appendChild(close);
close.onclick = function() {
    board.style.display = 'none';
};

function setLongBoardNames() {
  boards = document.querySelectorAll("#full-board-list > .boardList > a");
  boards.forEach(obj => {
        obj.textContent = "/" + obj.textContent + "/ - " + obj.title;
    });
}
setLongBoardNames();