// ==UserScript==
// @name         UserVM persistence
// @version      0.1
// @description  keeps the vm list working on uservm, even when collabvm is down
// @author       quant
// @match        http://computernewb.com/collab-vm/user/
// @grant        none
// @namespace https://greasyfork.org/users/156025
// ==/UserScript==

tunnel.onstatechange=()=>{};
document.querySelector('#loading').style.display='none';