// ==UserScript==
// @name         randomColor
// @namespace    https://github.com/yegorgunko/shikme-tools
// @version      0.2
// @description  Changes text color after each message send
// @author       Yegor Gunko
// @match        https://shikme.ru/
// @icon         https://shikme.ru/default_images/icon.png?v=1528136794
// @grant        none
// ==/UserScript==
const random=(o,t)=>{const e=Math.ceil(o),n=Math.floor(t);return Math.floor(Math.random()*(n-e+1))+e},post=o=>new Promise((t,e)=>{$.post("system/action.php",Object.assign(o,{token:utk}),(o,n)=>{"success"===n?t():e(new Error(`code ${o}: ${n}`))})}),randomColor=()=>{const o=[],t=["bolded",""];for(let t=1;t<36;t+=1)-1===[23,25].indexOf(t)&&o.push(t);for(let t=100;t<105;t+=1)o.push(t);document.getElementById("submit_button").addEventListener("click",()=>post({save_color:`bcolor${o[random(0,o.length-1)]}`,save_bold:t[random(0,t.length-1)]}))};document.addEventListener("DOMContentLoaded",randomColor());