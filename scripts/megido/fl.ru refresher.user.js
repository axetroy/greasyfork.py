// ==UserScript==
// @name       fl.ru refresher
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  nothing
// @match      https://www.fl.ru
// @match      https://www.fl.ru/projects/
// @copyright  2012+, You
// ==/UserScript==
function delayedRedirect(){
    window.location.reload();
}
window.setTimeout(delayedRedirect, 10000);







