// ==UserScript==
// @name         Copy Soundcloud ID with shortcut key
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://soundcloud.com/*
// @grant        none
// ==/UserScript==


function copyTextToClipboard(text){var textArea=document.createElement("textarea");textArea.style.position='fixed';textArea.style.top=0;textArea.style.left=0;textArea.style.width='2em';textArea.style.height='2em';textArea.style.padding=0;textArea.style.border='none';textArea.style.outline='none';textArea.style.boxShadow='none';textArea.style.background='transparent';textArea.value=text;document.body.appendChild(textArea);textArea.focus();textArea.select();try{var successful=document.execCommand('copy');var msg=successful?'successful':'unsuccessful';console.log('Copying text command was '+msg)}catch(err){console.log('Oops, unable to copy')}document.body.removeChild(textArea)}

document.addEventListener('keyup', function(e){

	  if (e.ctrlKey && e.keyCode == 188) { // ctrl-,(comma)

			copyTextToClipboard( document.querySelector("meta[property='twitter:app:url:googleplay']").content.match(/sounds:([0-9]{1,12})/)[1] ) ;

	  }

} , false);


// ~~~~~~~~~~~
// ## About me
// * HP
// https://114514.click/homepage
// * Twitter
// https://114514.click/twitter
// * Facebook
// https://114514.click/fb
// * Blog
// https://114514.click/programmingblog
// * Email
// yuis.twitter+tomainbyall@gmail.com
// ~~~~~~~~~~~