// ==UserScript==
// @name         Mturk Worker Queue Advancer
// @namespace    https://gist.github.com/Kadauchi
// @version      1.0.0
// @description  Advances to next HIT in queue for https://worker.mturk.com/
// @author       Kadauchi
// @icon         http://i.imgur.com/oGRQwPN.png
// @include      https://worker.mturk.com/tasks*
// ==/UserScript==

const ALERT = document.querySelector(`[data-react-class="require('reactComponents/alert/Alert')['PureAlert']"]`);

if (ALERT) document.querySelector(`a[href^="/projects/"]`).click();
