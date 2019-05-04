// ==UserScript==
// @name         Clientside Trail Slithere.com
// @version      1.0
// @description  Clientside Trail for Slither.IO
// @author       Slithere.com
// @namespace    Slithere.com
// @match        http://slither.io/
// @grant        none
// ==/UserScript==

function start() {
  try {
    newFood(3,snake.xx,snake.yy,50,5,Math.floor(Math.random() * 7) + 1);
}
catch(err) {

}
  setTimeout(start, 100);
}

// boot up the first call
start();