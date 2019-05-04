// ==UserScript==
// @name     Sweep stickies
// @locale  en
// @namespace http://eldar.cz/myf/
// @description Removes everything fixed or sticky
// @version  1
// @grant    none
// @match    https://medium.com/*
// @run-at   document-end
// ==/UserScript==

((u,n,s,t,i,c,k)=>n.querySelectorAll('*').forEach(e=>{/fixed|sticky/.test((s=getComputedStyle(e)).position)&&e!==n.documentElement&&e!==(t=n.body)&&t.contains(e)&&e.parentNode.removeChild(e)||/hidden/.test(s[u])&&e.style.setProperty(u,'auto','important')}))('overflow',document)