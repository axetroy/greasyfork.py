// ==UserScript==
// @name         Ad Blocker for Youtube
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Enjoy no interuptions for youtube.
// @author       You
// @match        http://*/*
// @grant        none
// ==/UserScript==

 <script type="text/javascript">
 var adblockEnabled = true;
if(document.getElementById('cAEiTwGhmYpL')){
  adblockEnabled = true;
}
