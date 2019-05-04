// ==UserScript==
// @name         panathagrforum.net mobile
// @namespace    panathaGrForumMobileWebpack
// @description  Converts panathagrforum to a responsive mobile site
// @version      1.1.1
// @grant        none
// @run-at       document-start
// @include      http://panathagrforum.net/*
// @include      http://www.panathagrforum.net/*
// @require      https://cdn.jsdelivr.net/npm/preact/dist/preact.min.js
// ==/UserScript==

!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=12)}([function(e,t,n){const r=n(1);class o{constructor(){this.data={}}set(e,t){this.data[e]=t}get(e){return this.has(e)?this.data[e]:void 0}has(e){return e in this.data}}e.exports={store:new o,KeyValueStorage:o,clearBody:function(){for(;document.body.firstChild;)document.body.removeChild(document.body.firstChild)},makeURL:function(e,t,n=null){let o=Object.keys(t).reduce((e,n)=>e+`&${n}=${t[n]}`,""),i=`${r.BASE_URL}${e}?${o.substring(1)}`;return null!==n?`${i}#${n}`:i},appendExt:function(e,t=".php"){return e.split(".").length<2?e+t:e},timeSince:function(e){const t=Math.floor((Date.now()-e.getTime())/1e3),n=[{label:"year",seconds:31536e3},{label:"month",seconds:2592e3},{label:"day",seconds:86400},{label:"hour",seconds:3600},{label:"minute",seconds:60},{label:"second",seconds:0}].find(e=>e.seconds<t),r=Math.floor(t/n.seconds);return`${r} ${n.label}${1!==r?"s":""} ago`}}},function(e){e.exports={ENV:"DEV",ENV_VALUES:["DEV","DEV-NOINJ","PROD"],TITLE:"panathagrforum.net",BASE_URL:"http://www.panathagrforum.net/",POSTS_PER_PAGE:25}},function(e,t,n){e.exports=function(e={}){let t=document.querySelector("#pageheader h2 > a.titles"),n=null!==t?t.innerHTML:"";e.title&&(n=e.title);let r=[],o=document.querySelector("p.breadcrumbs");return{title:n,breadcrumbs:r=Array.from(o.children).map(e=>({url:e.href,text:e.innerHTML})),isLogged:null===document.querySelector('td.navrow a[href="./ucp.php?mode=login"]')}};n(4)},function(e,t,n){const{Component:r,h:o,render:i}=window.preact,{TITLE:a,BASE_URL:s}=n(1),{LOGO_BASE64:l}=n(23);e.exports=class extends r{render(e,t){return o("a",{id:"header",href:s},[o("img",{src:l}),o("div",{className:"name"},a)])}}},function(e,t){e.exports=class{$one(){return document.querySelector.apply(this,arguments)}$all(){return document.querySelectorAll.apply(this,arguments)}scrape(){return{}}}},function(e,t,n){const{Component:r,h:o,render:i}=window.preact,{BASE_URL:a}=n(1),{store:s}=n(0);e.exports=class extends r{constructor(){super(),this.state=Object.assign({},s.get("data"))}prepText(e){return"BOARD INDEX"==(e=e.toUpperCase().trim())&&(e="ΑΡΧΙΚΗ"),e}render(e,t){let n=this.prepText(t.title),r=(e.breadcrumbs||t.breadcrumbs).reduce((e,t,r)=>1==r||n==this.prepText(t.text)?e:(e.push(o("li",null,[o("a",{href:t.url},this.prepText(t.text))])),e),[]);return o("ul",{className:"breadcrumb"},r)}}},function(e,t,n){const{Component:r,h:o,render:i}=window.preact,a=n(5);e.exports=class extends r{resolveSubtitle(e){return e.title==e.subtitle?"ΑΡΧΙΚΗ":e.subtitle}render(e,t){let n=[o("h1",null,e.title)];if(e.subtitle){let t=this.resolveSubtitle(e);n.unshift(o("div",null,o("a",{className:"subtitle"},t)))}return o("div",{className:"page-title"},[o(a,{breadcrumbs:e.breadcrumbs}),o("h1",null,e.title)])}}},function(e,t,n){"use strict";e.exports=function(e){var t=[];return t.toString=function(){return this.map(function(t){var n=function(e,t){var n=e[1]||"",r=e[3];if(!r)return n;if(t&&"function"==typeof btoa){var o=(a=r,"/*# sourceMappingURL=data:application/json;charset=utf-8;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(a))))+" */"),i=r.sources.map(function(e){return"/*# sourceURL="+r.sourceRoot+e+" */"});return[n].concat(i).concat([o]).join("\n")}var a;return[n].join("\n")}(t,e);return t[2]?"@media "+t[2]+"{"+n+"}":n}).join("")},t.i=function(e,n){"string"==typeof e&&(e=[[null,e,""]]);for(var r={},o=0;o<this.length;o++){var i=this[o][0];null!=i&&(r[i]=!0)}for(o=0;o<e.length;o++){var a=e[o];null!=a[0]&&r[a[0]]||(n&&!a[2]?a[2]=n:n&&(a[2]="("+a[2]+") and ("+n+")"),t.push(a))}},t}},function(e,t,n){const{Component:r,h:o,render:i}=window.preact,{store:a}=n(0);e.exports=class extends r{constructor(){super();let e=a.get("data");this.state=Object.assign({},e)}render(e,t){return t.isLogged?"":o("div",{id:"login-notice"},[o("h2",{},"Σφάλμα"),o("p",{},"Χρειάζεται να συνδεθείς για να δεις το περιεχόμενο!"),o("p",{},"Προς το παρόν για να συνδεθείς απαιτείται πρώτα να απενεργοποιήσεις το mobile plugin. Στη συνέχεια συνδέσου κανονικά μέσω του panathagrforum και τέλος ξαναενεργοποίησε το mobile plugin."),o("p",{},'Tip: Τσέκαρε την επιλογή "Log me on automatically each visit" ώστε να μην χρειάζεται να συνδέεσαι κάθε φορά.')])}}},function(e,t,n){e.exports=function(e={}){let t=document.querySelector("#pagecontent table");if(null===t)return{pagination:{current:1,max:1}};let n=t.querySelectorAll("td"),r=n[n.length-1].querySelector("b");if(null===r)return{pagination:{current:1,max:1}};let o=1,i=1;return[].forEach.call(r.children,e=>{if("STRONG"===e.tagName&&(o=+e.innerHTML),"A"===e.tagName){let t=+e.innerHTML;!isNaN(t)&&t>i&&(i=t)}}),{pagination:{current:o,max:i=o>i?o:i}}};n(4)},function(e,t,n){const{Component:r,h:o,render:i}=window.preact,{store:a,makeURL:s,appendExt:l}=n(0),p=n(1);e.exports=class extends r{getPageURL(e){let t=a.get("params"),n=a.get("filename"),r={};return t.has("f")&&(r.f=t.get("f")),t.has("t")&&(r.t=t.get("t")),r.start=(e-1)*p.POSTS_PER_PAGE,s(l(n,".php"),r)}getPageNums(e,t,n=!1){let r=[1,e-1,e,e+1,t];return(r=r.filter((e,n)=>!(e<=0||e>t||r.lastIndexOf(e)!==n))).sort((e,t)=>e-t),n&&(r=r.reduce((e,t)=>t-(e.length>0?e[e.length-1]:0)==1?e.concat([t]):e.concat([null,t]),[])),r}render(e,t){let n=this.getPageNums(e.current,e.max,!0).map(t=>{if(null===t)return o("span",{className:"sep"},"...");let n="page "+(t===e.current?"current":"");return o("a",{className:n,href:this.getPageURL(t)},t)});return e.top&&n.push(o("a",{className:"top",href:"#"},"↑")),o("div",{className:"pagination"},n)}}},function(e,t,n){const{Component:r,h:o,render:i}=window.preact,{timeSince:a}=n(0),s=n(27);e.exports=class extends r{getAvatar(e){return null!==e.avatar?o("img",{src:e.avatar}):o("div",{className:"initial"},e.username.charAt(0).toUpperCase())}formattedDate(e){return a(e)}render(e,t){let n=this.getAvatar(e.post.user),r=e.post.date.toString(),i={className:"post"};return e.post.hasUnreadAnchor&&(i.id="unread"),o("li",i,[o("div",{className:"user"},[o("div",{className:"avatar"},n),o("div",{className:"username"},e.post.user.username),o("div",{className:"date",title:r},this.formattedDate(e.post.date)),o("a",{className:"reply-quote",href:e.post.quoteURL,dangerouslySetInnerHTML:{__html:s}})]),o("div",{className:"content",dangerouslySetInnerHTML:{__html:e.post.content}})])}}},function(e,t,n){n(13);const r=n(19);try{r.boot()}catch(e){console.error(e)}},function(e,t,n){var r=n(14);"string"==typeof r&&(r=[[e.i,r,""]]);var o={hmr:!0,transform:void 0,insertInto:void 0};n(17)(r,o);r.locals&&(e.exports=r.locals)},function(e,t,n){(t=e.exports=n(7)(!1)).i(n(15),""),t.i(n(16),""),t.push([e.i,'#pfm-ext #header {\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  /* border: 1px solid #fff; */\r\n  padding: 16px;\r\n  margin-bottom: 16px;\r\n  text-decoration: none;\r\n}\r\n\r\n#pfm-ext #header {\r\n  border: 0px solid #fff;\r\n  border-top-width: 2px;\r\n  border-bottom-width: 2px;\r\n  /* background-color: #07863f; */\r\n}\r\n\r\n#pfm-ext #header img {\r\n  display: block;\r\n  width: 32px;\r\n  height: 32px;\r\n  margin-right: 16px;\r\n}\r\n\r\n#pfm-ext #header div.name {\r\n  text-transform: uppercase;\r\n  color: #fff;\r\n  font-weight: bold;\r\n  font-size: 18px;\r\n}\r\n\r\n#pfm-ext div.pagination {\r\n  position: relative;\r\n  padding: 16px;\r\n  text-align: center;\r\n}\r\n\r\n#pfm-ext div.pagination a.page,\r\n#pfm-ext div.pagination a.top {\r\n  display: inline-block;\r\n  color: #000;\r\n  padding: 8px 8px;\r\n  margin-right: 8px;\r\n  min-width: 20px;\r\n  text-align: center;\r\n  text-decoration: none;\r\n  background-color: #fff;\r\n  border-radius: 2px;\r\n}\r\n\r\n#pfm-ext div.pagination a.page.current {\r\n  font-weight: bold;\r\n  background-color: rgba(255, 255, 255, 0.8);\r\n  color: #000;\r\n}\r\n\r\n#pfm-ext div.pagination span.sep {\r\n  margin-right: 8px;\r\n  color: #fff;\r\n  font-size: 12px;\r\n}\r\n\r\n#pfm-ext div.pagination a.top {\r\n  position: absolute;\r\n  right: 0;\r\n  margin-right: 0;\r\n  height: 20px;\r\n  line-height: 20px;\r\n}\r\n\r\n#pfm-ext #viewtopic,\r\n#pfm-ext #viewforum,\r\n#pfm-ext #home,\r\n#pfm-ext #login,\r\n#pfm-ext #posting {\r\n  padding: 32px 16px;\r\n  max-width: 600px;\r\n  margin: 0 auto;\r\n}\r\n\r\n#pfm-ext div.page-title {\r\n  background-color: #07863f;\r\n  padding: 12px 16px 8px;\r\n  margin-bottom: 8px;\r\n  border-radius: 2px;\r\n}\r\n\r\n#pfm-ext div.page-title a.subtitle {\r\n  display: inline-block;\r\n  background-color: #fff;\r\n  color: #07863f;\r\n  text-transform: uppercase;\r\n  font-size: 12px;\r\n  line-height: 12px;\r\n  padding: 3px 6px;\r\n  border-radius: 2px;\r\n}\r\n\r\n#pfm-ext div.page-title .breadcrumb {\r\n  padding: 0 0 8px;\r\n}\r\n\r\n#pfm-ext div.page-title .breadcrumb li a {\r\n  color: #07863f;\r\n}\r\n\r\n#pfm-ext div.page-title h1 {\r\n  color: #fff;\r\n  padding: 6px 0 8px;\r\n  margin: 0;\r\n  font-size: 24px;\r\n  line-height: 24px;\r\n}\r\n\r\n#pfm-ext #viewtopic ul.posts {\r\n  padding: 0;\r\n  margin: 0;\r\n}\r\n\r\n#pfm-ext #viewtopic ul.posts li.post {\r\n  display: block;\r\n  list-style: none;\r\n  padding: 16px;\r\n  margin-bottom: 8px;\r\n  background-color: #fff;\r\n  border-radius: 2px;\r\n}\r\n\r\n#pfm-ext #viewtopic ul.posts li.post div.user {\r\n  display: flex;\r\n  align-items: center;\r\n  padding-bottom: 16px;\r\n}\r\n\r\n#pfm-ext #viewtopic ul.posts li.post div.user div.avatar {\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  width: 32px;\r\n  height: 32px;\r\n  border-radius: 16px;\r\n  background-color: #01602f;\r\n  overflow: hidden;\r\n}\r\n\r\n#pfm-ext #viewtopic ul.posts li.post div.user div.avatar img {\r\n  display: block;\r\n  min-width: 100%;\r\n  max-width: 120%;\r\n  min-height: 100%;\r\n}\r\n\r\n#pfm-ext #viewtopic ul.posts li.post div.user div.avatar div.initial {\r\n  color: #fff;\r\n}\r\n\r\n#pfm-ext #viewtopic ul.posts li.post div.user div.username {\r\n  font-weight: bold;\r\n  padding: 0 8px;\r\n  flex: 1;\r\n}\r\n\r\n#pfm-ext #viewtopic ul.posts li.post div.user a.reply-quote {\r\n  display: block;\r\n  position: relative;\r\n  left: 8px;\r\n  text-decoration: none;\r\n  width: 32px;\r\n  height: 32px;\r\n  padding: 8px;\r\n  box-sizing: border-box;\r\n  color: #07863f;\r\n}\r\n\r\n#pfm-ext #viewtopic ul.posts li.post div.user div.date {\r\n  font-size: 14px;\r\n  color: #555;\r\n}\r\n\r\n#pfm-ext #viewtopic ul.posts li.post div.content {\r\n  line-height: 1.3;\r\n  font-size: 16px;\r\n  overflow-wrap: break-word;\r\n  overflow: hidden;\r\n}\r\n\r\n#pfm-ext #viewtopic ul.posts li.post div.content div.quotewrapper {\r\n  border: 1px solid rgb(26, 86, 42);\r\n  padding: 8px;\r\n  border-radius: 2px;\r\n  background-color: #eee;\r\n}\r\n\r\n#pfm-ext #viewtopic ul.posts li.post div.content div.quotewrapper div.quotecontent {\r\n  padding-top: 8px;\r\n}\r\n\r\n#pfm-ext #viewtopic ul.posts li.post div.content img {\r\n  display: block;\r\n  max-width: 100%;\r\n}\r\n\r\n#pfm-ext #viewtopic ul.posts li.post div.content iframe {\r\n  max-width: 100% !important;\r\n}\r\n\r\n#pfm-ext #viewtopic ul.posts li.post div.content a {\r\n  color: #07863f;\r\n}\r\n\r\n#pfm-ext #viewtopic a.reply {\r\n  display: block;\r\n  font-weight: 700;\r\n  text-decoration: none;\r\n  color: #fff;\r\n  width: 100%;\r\n  text-align: center;\r\n  box-sizing: border-box;\r\n  padding: 16px;\r\n  border: 2px solid #fff;\r\n  border-radius: 4px;\r\n  background-color: rgba(255, 255, 255, 0.05);\r\n}\r\n\r\n#pfm-ext #viewtopic a.reply:hover {\r\n  background-color: rgba(255, 255, 255, 0.15);\r\n}\r\n\r\n#pfm-ext #viewforum ul.topics {\r\n  padding: 0;\r\n  margin: 0;\r\n}\r\n\r\n#pfm-ext #viewforum ul.topics li.topic {\r\n  list-style: none;\r\n  background-color: #fff;\r\n  margin-bottom: 4px;\r\n  border-radius: 2px;\r\n  display: flex;\r\n}\r\n\r\n#pfm-ext #viewforum ul.topics li.topic div.unread-container {\r\n  display: flex;\r\n  padding: 8px 0 8px 16px;\r\n  align-items: center;\r\n  justify-content: center;\r\n}\r\n\r\n#pfm-ext #viewforum ul.topics li.topic a.unread {\r\n  display: block;\r\n  width: 32px;\r\n  height: 32px;\r\n  background-color: #bbb;\r\n  border-radius: 16px;\r\n}\r\n\r\n#pfm-ext #viewforum ul.topics li.topic a.unread.hl {\r\n  background-color: #07863f;\r\n}\r\n\r\n#pfm-ext #viewforum ul.topics li.topic div.details-container {\r\n  flex: 1;\r\n  padding: 8px 16px;\r\n}\r\n\r\n#pfm-ext #viewforum ul.topics li.topic a.title {\r\n  display: block;\r\n  text-decoration: none;\r\n  color: #000;\r\n}\r\n\r\n#pfm-ext #viewforum ul.topics li.topic div.meta {\r\n  display: flex;\r\n  font-size: 12px;\r\n  color: rgb(120, 120, 120);\r\n  color: rgb(26, 86, 42);\r\n}\r\n\r\n#pfm-ext #viewforum ul.topics li.topic div.meta div.author {\r\n  font-weight: bold;\r\n}\r\n\r\n#pfm-ext #viewforum ul.topics li.topic div.meta div {\r\n  padding: 4px;\r\n}\r\n\r\n#pfm-ext #viewforum ul.topics li.topic div.meta div:first-child {\r\n  padding-left: 0;\r\n}\r\n\r\n#pfm-ext #home ul {\r\n  padding: 0;\r\n  margin: 0;\r\n  list-style: none;\r\n}\r\n\r\n#pfm-ext #home li.group div.name {\r\n  text-transform: uppercase;\r\n  padding: 8px 16px;\r\n  background-color: #07863f;\r\n  font-weight: bold;\r\n  font-size: 12px;\r\n  border-radius: 2px;\r\n  margin: 16px 0 4px;\r\n  color: #fff;\r\n}\r\n\r\n#pfm-ext #home li.forum {\r\n  background-color: #fff;\r\n  margin-bottom: 4px;\r\n  border-radius: 2px;\r\n  padding: 8px 16px;\r\n}\r\n\r\n#pfm-ext #home li.forum a.title {\r\n  display: block;\r\n  text-decoration: none;\r\n  color: #000;\r\n  padding-bottom: 2px;\r\n}\r\n\r\n#pfm-ext #home li.forum div.description {\r\n  font-size: 12px;\r\n  color: rgb(26, 86, 42);\r\n}\r\n\r\n#pfm-ext #login > form {\r\n  background-color: #fff;\r\n  padding: 32px 16px;\r\n}\r\n\r\n#pfm-ext #login > form .input-block {\r\n  display: flex;\r\n  align-items: center;\r\n  padding: 0 0 8px;\r\n}\r\n\r\n#pfm-ext #login > form input[type="text"],\r\n#pfm-ext #login > form input[type="password"] {\r\n  box-sizing: border-box;\r\n  display: block;\r\n  width: 100%;\r\n  border: none;\r\n  border-bottom: 1px solid #07863f;\r\n  padding: 8px;\r\n  color: #07863f;\r\n  border-radius: 0px;\r\n  font-size: 16px;\r\n}\r\n\r\n#pfm-ext #login > form input[type="checkbox"] {\r\n  margin-right: 8px;\r\n}\r\n\r\n#pfm-ext #login > form label {\r\n  font-size: 14px;\r\n}\r\n\r\n#pfm-ext #login > form button.submit {\r\n  border: none;\r\n  background-color: #07863f;\r\n  color: #fff;\r\n  padding: 4px 16px;\r\n  cursor: pointer;\r\n  border-radius: 2px;\r\n  margin-top: 16px;\r\n  font-size: 16px;\r\n}\r\n\r\n#pfm-ext .breadcrumb {\r\n  display: flex;\r\n  list-style: none;\r\n  padding: 16px 0 8px;\r\n  margin: 0;\r\n}\r\n\r\n#pfm-ext .breadcrumb li {\r\n  position: relative;\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  background-color: #fff;\r\n  text-transform: uppercase;\r\n  padding: 3px 6px;\r\n  border-radius: 2px;\r\n  margin-right: 20px;\r\n  height: 20px;\r\n  line-height: 20px;\r\n}\r\n\r\n#pfm-ext .breadcrumb li:after {\r\n  content: \'▶\';\r\n  text-align: center;\r\n  font-size: 12px;\r\n  width: 20px;\r\n  height: 20px;\r\n  position: absolute;\r\n  right: -20px;\r\n  color: rgba(255, 255, 255, 0.5);\r\n}\r\n\r\n#pfm-ext .breadcrumb li:last-child {\r\n  margin-right: 0px;\r\n}\r\n\r\n#pfm-ext .breadcrumb li:last-child:after {\r\n  content: \'\';\r\n  width: 0px;\r\n}\r\n\r\n#pfm-ext .breadcrumb li a {\r\n  display: block;\r\n  color: #000;\r\n  text-decoration: none;\r\n  font-size: 12px;\r\n}\r\n\r\n#pfm-ext #login-notice {\r\n  border-left: 8px solid red;\r\n  background-color: #fff;\r\n  padding: 16px;\r\n}\r\n\r\n#pfm-ext #login-notice h2 {\r\n  color: red;\r\n}\r\n\r\n#pfm-ext #posting .editor {\r\n  background-color: #fff;\r\n  padding: 16px;\r\n}\r\n\r\n#pfm-ext #posting .editor .input-container {\r\n  padding-bottom: 16px;\r\n}\r\n\r\n#pfm-ext #posting .editor .input-container > div {\r\n  padding-bottom: 8px;\r\n  font-size: 14px;\r\n}\r\n\r\n#pfm-ext #posting .editor input,\r\n#pfm-ext #posting .editor textarea {\r\n  border: 2px solid #07863f;\r\n  width: 100%;\r\n  box-sizing: border-box;\r\n  padding: 4px 8px;\r\n  font-family: sans-serif;\r\n  font-size: 16px;\r\n}\r\n\r\n#pfm-ext #posting .editor input[type="submit"] {\r\n  background-color: #07863f;\r\n  color: #fff;\r\n  cursor: pointer;\r\n  padding: 16px;\r\n  border-radius: 4px;\r\n}\r\n\r\n#pfm-ext #posting .editor textarea {\r\n  resize: vertical;\r\n  min-height: 200px;\r\n}\r\n\r\n#pfm-ext #posting .editor .extra-input {\r\n  display: block;\r\n  height: 1px;\r\n  width: 1px;\r\n  overflow: hidden;\r\n  opacity: 0;\r\n}\r\n',""])},function(e,t,n){(e.exports=n(7)(!1)).push([e.i,"body#pfm-ext {\r\n  padding: 0;\r\n  margin: 0;\r\n  background-color: rgb(26, 86, 42);\r\n  font-family: sans-serif;\r\n  font-size: 16px;\r\n}",""])},function(e,t,n){(e.exports=n(7)(!1)).push([e.i,"",""])},function(e,t,n){var r,o,i={},a=(r=function(){return window&&document&&document.all&&!window.atob},function(){return void 0===o&&(o=r.apply(this,arguments)),o}),s=function(e){var t={};return function(e,n){if("function"==typeof e)return e();if(void 0===t[e]){var r=function(e,t){return t?t.querySelector(e):document.querySelector(e)}.call(this,e,n);if(window.HTMLIFrameElement&&r instanceof window.HTMLIFrameElement)try{r=r.contentDocument.head}catch(e){r=null}t[e]=r}return t[e]}}(),l=null,p=0,c=[],d=n(18);function u(e,t){for(var n=0;n<e.length;n++){var r=e[n],o=i[r.id];if(o){o.refs++;for(var a=0;a<o.parts.length;a++)o.parts[a](r.parts[a]);for(;a<r.parts.length;a++)o.parts.push(b(r.parts[a],t))}else{var s=[];for(a=0;a<r.parts.length;a++)s.push(b(r.parts[a],t));i[r.id]={id:r.id,refs:1,parts:s}}}}function f(e,t){for(var n=[],r={},o=0;o<e.length;o++){var i=e[o],a=t.base?i[0]+t.base:i[0],s={css:i[1],media:i[2],sourceMap:i[3]};r[a]?r[a].parts.push(s):n.push(r[a]={id:a,parts:[s]})}return n}function m(e,t){var n=s(e.insertInto);if(!n)throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");var r=c[c.length-1];if("top"===e.insertAt)r?r.nextSibling?n.insertBefore(t,r.nextSibling):n.appendChild(t):n.insertBefore(t,n.firstChild),c.push(t);else if("bottom"===e.insertAt)n.appendChild(t);else{if("object"!=typeof e.insertAt||!e.insertAt.before)throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");var o=s(e.insertAt.before,n);n.insertBefore(t,o)}}function h(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e);var t=c.indexOf(e);t>=0&&c.splice(t,1)}function g(e){var t=document.createElement("style");if(void 0===e.attrs.type&&(e.attrs.type="text/css"),void 0===e.attrs.nonce){var r=function(){0;return n.nc}();r&&(e.attrs.nonce=r)}return x(t,e.attrs),m(e,t),t}function x(e,t){Object.keys(t).forEach(function(n){e.setAttribute(n,t[n])})}function b(e,t){var n,r,o,i;if(t.transform&&e.css){if(!(i="function"==typeof t.transform?t.transform(e.css):t.transform.default(e.css)))return function(){};e.css=i}if(t.singleton){var a=p++;n=l||(l=g(t)),r=w.bind(null,n,a,!1),o=w.bind(null,n,a,!0)}else e.sourceMap&&"function"==typeof URL&&"function"==typeof URL.createObjectURL&&"function"==typeof URL.revokeObjectURL&&"function"==typeof Blob&&"function"==typeof btoa?(n=function(e){var t=document.createElement("link");return void 0===e.attrs.type&&(e.attrs.type="text/css"),e.attrs.rel="stylesheet",x(t,e.attrs),m(e,t),t}(t),r=function(e,t,n){var r=n.css,o=n.sourceMap,i=void 0===t.convertToAbsoluteUrls&&o;(t.convertToAbsoluteUrls||i)&&(r=d(r));o&&(r+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(o))))+" */");var a=new Blob([r],{type:"text/css"}),s=e.href;e.href=URL.createObjectURL(a),s&&URL.revokeObjectURL(s)}.bind(null,n,t),o=function(){h(n),n.href&&URL.revokeObjectURL(n.href)}):(n=g(t),r=function(e,t){var n=t.css,r=t.media;r&&e.setAttribute("media",r);if(e.styleSheet)e.styleSheet.cssText=n;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(n))}}.bind(null,n),o=function(){h(n)});return r(e),function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap)return;r(e=t)}else o()}}e.exports=function(e,t){if("undefined"!=typeof DEBUG&&DEBUG&&"object"!=typeof document)throw new Error("The style-loader cannot be used in a non-browser environment");(t=t||{}).attrs="object"==typeof t.attrs?t.attrs:{},t.singleton||"boolean"==typeof t.singleton||(t.singleton=a()),t.insertInto||(t.insertInto="head"),t.insertAt||(t.insertAt="bottom");var n=f(e,t);return u(n,t),function(e){for(var r=[],o=0;o<n.length;o++){var a=n[o];(s=i[a.id]).refs--,r.push(s)}e&&u(f(e,t),t);for(o=0;o<r.length;o++){var s;if(0===(s=r[o]).refs){for(var l=0;l<s.parts.length;l++)s.parts[l]();delete i[s.id]}}}};var v,y=(v=[],function(e,t){return v[e]=t,v.filter(Boolean).join("\n")});function w(e,t,n,r){var o=n?"":r.css;if(e.styleSheet)e.styleSheet.cssText=y(t,o);else{var i=document.createTextNode(o),a=e.childNodes;a[t]&&e.removeChild(a[t]),a.length?e.insertBefore(i,a[t]):e.appendChild(i)}}},function(e,t){e.exports=function(e){var t="undefined"!=typeof window&&window.location;if(!t)throw new Error("fixUrls requires window.location");if(!e||"string"!=typeof e)return e;var n=t.protocol+"//"+t.host,r=n+t.pathname.replace(/\/[^\/]*$/,"/");return e.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi,function(e,t){var o,i=t.trim().replace(/^"(.*)"$/,function(e,t){return t}).replace(/^'(.*)'$/,function(e,t){return t});return/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(i)?e:(o=0===i.indexOf("//")?i:0===i.indexOf("/")?n+i:r+i.replace(/^\.\//,""),"url("+JSON.stringify(o)+")")})}},function(e,t,n){const r=n(20),o=n(1),{store:i,clearBody:a}=n(0),{Component:s,h:l,render:p}=window.preact;e.exports=new class{constructor(){this.__onHeadReadyCalled=!1,this.__onBodyReadyCalled=!1}onHeadReady(){if(this.__onHeadReadyCalled)return;this.__onHeadReadyCalled=!0;for(let e in document.styleSheets){let t=document.styleSheets[e];"object"==typeof t&&"disabled"in t&&(t.disabled=!0,t.ownerNode&&"pfm-ext-styles"===t.ownerNode.id&&(t.disabled=!1),"STYLE"===t.ownerNode.tagName&&t.cssRules.length>0&&t.cssRules[0].selectorText.indexOf("#pfm-ext")>-1&&(t.disabled=!1))}const e=document.createElement("meta");e.name="viewport",e.content="width=device-width, initial-scale=1",document.head.appendChild(e)}onBodyReady(){if(this.__onBodyReadyCalled)return;this.__onBodyReadyCalled=!0;const e=document.createElement("div");e.innerHTML="Loading...",e.setAttribute("id","curtain"),e.style.position="fixed",e.style.padding="32px",e.style.textAlign="center",e.style.fontSize="24px",e.style.fontWeight="bold",e.style.top=0,e.style.right=0,e.style.bottom=0,e.style.left=0,e.style.zIndex=100,e.style.backgroundColor="#1a562a",e.style.color="#fff","DEV-NOINJ"!==o.ENV&&document.body.appendChild(e)}lazyAppRun(){if("complete"===document.readyState)return this.run();window.onload=this.run.bind(this)}initObserver(){if(document.head&&this.onHeadReady(),document.body&&this.onBodyReady(),this.__onHeadReadyCalled&&this.__onBodyReadyCalled)return this.lazyAppRun();let e=new MutationObserver(t=>{for(let n of t){let t=n.target.children;Array.from(t).forEach(e=>{"HEAD"===e.nodeName&&this.onHeadReady(),"BODY"===e.nodeName&&this.onBodyReady()}),this.__onHeadReadyCalled&&this.__onBodyReadyCalled&&(e.disconnect(),this.lazyAppRun())}});e.observe(document.documentElement,{childList:!0})}boot(){null!==r.resolve()&&this.initObserver()}run(){let{scraper:e,component:t,data:n}=r.resolve()||{};void 0!==t?(i.set("data",e(n)),"DEV-NOINJ"!==o.ENV&&(document.body.setAttribute("id","pfm-ext"),a(),p(l(t),document.body))):console.error("[pfm-error] Router resolved to undefined")}}},function(e,t,n){const{store:r}=n(0),o=[{path:"index",scraper:n(21),component:n(22),aliases:["","panatha-index"]},{path:"viewforum",scraper:n(24),component:n(25),aliases:["panatha-viewforum","panatha-viewforum-2","panatha-viewforum-guest"]},{path:"viewtopic",scraper:n(28),component:n(29),aliases:["panatha-viewtopic","panatha-viewtopic-2","panatha-viewtopic-guest"]},{path:"ucp?mode=login",scraper:n(30),component:n(31),aliases:["panatha-login"],data:{title:"Login"}},{path:"posting",scraper:n(33),component:n(34),aliases:["panatha-posting"]}];e.exports=new class{constructor(e){this.routes=e}getLocationFilename(e){let t=e.pathname.substring(e.pathname.lastIndexOf("/")+1);return-1!=t.lastIndexOf(".")&&(t=t.substring(0,t.lastIndexOf("."))),t}getPathParams(e){return-1==e.lastIndexOf("?")?null:e.substring(e.lastIndexOf("?")+1,e.length).split("&").reduce((e,t)=>{let[n,r]=t.split("=");return e[n]=r,e},{})}resolve(){let e=new URL(window.location.href),t=this.getLocationFilename(e),n=e.searchParams;r.set("filename",t),r.set("params",n);for(let e of this.routes){if(e.aliases&&e.aliases.includes(t))return e;let r=e.path,o={};if(e.path.lastIndexOf("?")>-1&&(r=e.path.substring(0,e.path.lastIndexOf("?")),o=this.getPathParams(e.path)),r!=t)continue;if(null===o)return e;let i=!0;for(let e in o)if(!n.has(e)||n.get(e)!=o[e]){i=!1;break}if(i)return e}return null}}(o)},function(e,t,n){const r=n(2),o=function(e){let t=e.querySelector(".forumlink"),n=new URL(t.href).searchParams;return{f:parseInt(n.get("f"))}};e.exports=function(e={}){let t=[];return $els=document.querySelector("#contentrow"),[].forEach.call($els.children,e=>{if("cap-div"!==e.className){if("tablebg"===e.className){if(null===e.querySelector(".forumlink"))return;let n=Array.from(e.children[0].children).slice(1);[].forEach.call(n,e=>{if(e.children.length<2)return;let n=o(e),r={title:e.querySelector(".forumlink").innerHTML,description:e.querySelector(".forumdesc").innerHTML,params:n};t[t.length-1].forums.push(r)})}}else{if(t.length>=5)return;t.push({name:e.querySelector("h4 a").innerHTML,forums:[]})}}),Object.assign({groups:t},r(e))};n(4)},function(e,t,n){const{Component:r,h:o}=window.preact,i=n(3),{store:a}=n(0),{makeURL:s}=n(0);e.exports=class extends r{constructor(){super();let e=a.get("data");this.state=Object.assign({},e)}removeTones(e){let t=e.toLowerCase().split(""),n=["ά","έ","ό","ώ","ί","ύ","ή"],r=["α","ε","ο","ω","ι","υ","η"];for(let e=0;e<t.length;e++){let o=t[e];n.includes(o)&&(t[e]=r[n.indexOf(o)])}return t.join("")}render(e,t){let n=t.groups.map(e=>{let t=e.forums.map(e=>o("li",{className:"forum"},[o("a",{className:"title",href:s("viewforum.php",e.params)},e.title),o("div",{className:"description"},e.description)]));return o("li",{className:"group"},[o("div",{className:"name"},this.removeTones(e.name)),o("ul",{},t)])});return o("div",{id:"home"},[o(i),o("ul",{},n)])}}},function(e,t){e.exports={LOGO_BASE64:" data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAvCAYAAAClgknJAAAEVElEQVRogdWZW4hWVRSAP/8Z0xw1tIvThFFEF8gSQiMq0ayHSimt9MHAzIjKwC4YEUaBLxVdpKCiKOghjIbKCgNrIseMAruQWRmmZpaOVjZTppmYXw/7T/85nvnn7HPOKH6wH87ea+21177vdeAIp5+aV/c64FbgbOAv4DPgLeAD4JeEbANwMTANuBBoAXYBXwAvAEvzNiKPA/2AJ4A7eyjvAFYAHwPbgLOAK4Dz69T5PHAXwak41Ng0176hVW2IbU/sCLQAq4Hh0T2VjduBZ2IUKpEGptJ3jYcwLZtiFGIdGBcpH8vpwKgYhVgHRkbK56ElRjjWgQGR8nnYEyMc60BHpHwse4ANMQqxDiyLlI/la2BdjEK9bXQIcDShV7qqeScAa+i7negO4ClgMHARcE61HRuAduDHgzQSB0N/dZa6RN2odqib1HZ1njpIvbuPDrK16gB1hvpNSvl29SF1aG2baxt/otrWi5Gv1LEZ5GLZp05W52eQXaGOMOFAU7UgC9+rkwwjUxYPG3dFaTOM1n4H7o00uFi9RN0RqZfGK+p49e9IvdlWHRiibshh+EZ1Yg7DtSwxjP5HOXSXq/0weJ+HLrVFvdJ8I/Ga4fY5M6f9zepw1Dk5K1BdZpiCl6mdEXqL1KMMu1qe0VfdpjZXiD/MapkALADeJ9xU/8ig8wYwk3C+zAdOzWl7O9CFOs6wjeVlrzrdMBJXq7vryP5g6HnUqeo/Bey+aHURD1bXF6hIdad6bbVh79aR+8mw8OdZbPGrTrHmRfYqMD3nUP7Pv4TjfjRwXMG6emM74ZrR0VjN2FhCpQ3ApSXUk4VNwFY4sICHHSLDZdFIiI5QqX6MPazNiWf/07MCnEsITh1JDATmQnDgcqD/YW1OPq4HRlUIIb8jkYHATRXg5ENo9ENgMQdeeEUZVwEGlVTZbuBZwtxsTyl/G5gIXANcQHCmKMeiril4Imo4YSd44HU3SF2VkJlt9+frcHVlQburKxQ/xDYDk+ne67uA1xNyQxLfvwMzKBaqWVohzMm8/EmI+a9KKVub+D4+RWYdcDOwN4ftLcDCCrCIEI+JxarxT3oo35347ilo+w5wf6TtncAsYEuF8HflBuC3iAp2VCtorSPTnPhuTJUKPFJNWdgIXAW0Ad3CKuepn2ZYOO+pYxILMi21JvQez6Bzm7q1B7td6tPqSbU6ycjcYMLCmgacQRj2XYSb30rgTcLrqzdOAb4EjqnJWwA8mEF3JDCFcD8bSvjf9nm1xw+Om9bpjWFqs2G7q2Tovdq0MKUH50TWkSnVm5edGXorjdHALSn5UVHnrBR50KfRH3iSEBSuZScHb6ulULYD9wHjU/K/JS2yXAJlOjAJeKCHssWEN3PpFPlTX8uZwHJgREpZJ+HR9HMZhpKUMQJNwMukNx7gMfqo8VD/dMzKPcCYRN4+wsneCjxago0eKTqFGoHvgNNq8p4DXgLWA78WqTwL/wHsHKHeE6tR8QAAAABJRU5ErkJggg=="}},function(e,t,n){const r=n(2),o=n(9);e.exports=function(e={}){let t=[],n=document.querySelector("#pagecontent table.tablebg").querySelectorAll("tr");return[].forEach.call(n,e=>{if("topic"!==function(e){return"TH"===e.children[0].tagName?"head":1===e.children.length?"cat"===e.children[0].className?"options":"group":"topic"}(e))return;let n=function(e){let t=e.children[1].children[0];return"A"===t.tagName&&t.href.indexOf("&view=unread")>-1}(e),r=function(e){let t=e.querySelector(".topictitle"),n=new URL(t.href).searchParams;return{f:parseInt(n.get("f")),t:parseInt(n.get("t"))}}(e),o=e.querySelector("p.topicauthor");o.children.length>0&&(o=o.firstChild);let i={author:o.innerHTML,title:e.querySelector(".topictitle").innerHTML,replies:parseInt(e.querySelector(".topicdetails").innerHTML),unread:n,params:r};t.push(i)}),Object.assign({topics:t},r(e),o(e))}},function(e,t,n){const{Component:r,h:o,render:i}=window.preact,a=n(10),s=n(5),l=n(8),p=n(6),c=n(26),d=n(3),{store:u}=n(0);n(11);e.exports=class extends r{constructor(){super(),this.state=Object.assign({},u.get("data"))}render(e,t){let n=t.breadcrumbs[t.breadcrumbs.length-1].text,r=t.topics.map(e=>o(c,e));return o("div",{id:"viewforum"},[o(d),o(a,t.pagination),o(p,{title:t.title,breadcrumbs:t.breadcrumbs,subtitle:n}),o("ul",{className:"topics"},r),o(l),o(a,Object.assign({top:!0},t.pagination)),o(s,{breadcrumbs:t.breadcrumbs})])}}},function(e,t,n){const{Component:r,h:o,render:i}=window.preact,{makeURL:a}=n(0);e.exports=class extends r{getURL(e,t=!1){let n=Object.assign({},e),r=null;return t&&(n.view="unread",r="unread"),a("viewtopic.php",n,r)}render(e,t){let n="unread"+(e.unread?" hl":"");return o("li",{className:"topic"},[o("div",{className:"unread-container"},[o("a",{className:n,href:this.getURL(e.params,!0)})]),o("div",{className:"details-container"},[o("a",{className:"title",href:this.getURL(e.params)},e.title),o("div",{className:"meta"},[o("div",{className:"author"},e.author),o("div",{className:"replies"},`${e.replies} replies`)])])])}}},function(e,t){e.exports='<svg aria-hidden="true" data-prefix="fas" data-icon="quote-left" class="svg-inline--fa fa-quote-left fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M464 256h-80v-64c0-35.3 28.7-64 64-64h8c13.3 0 24-10.7 24-24V56c0-13.3-10.7-24-24-24h-8c-88.4 0-160 71.6-160 160v240c0 26.5 21.5 48 48 48h128c26.5 0 48-21.5 48-48V304c0-26.5-21.5-48-48-48zm-288 0H96v-64c0-35.3 28.7-64 64-64h8c13.3 0 24-10.7 24-24V56c0-13.3-10.7-24-24-24h-8C71.6 32 0 103.6 0 192v240c0 26.5 21.5 48 48 48h128c26.5 0 48-21.5 48-48V304c0-26.5-21.5-48-48-48z"></path></svg>'},function(e,t,n){const r=n(9),o=n(2);e.exports=function(e={}){let t=[],n=document.querySelectorAll("#pagecontent .tablebg tr");return[].forEach.call(n,e=>{if(!e.classList.contains("row1")&&!e.classList.contains("row2"))return;if(null!==e.querySelector(".postbottom")){let n=e.children[0].innerHTML;return void(t[t.length-1].date=new Date(n))}let n={},r=e.querySelectorAll(".postbody");n.content=r[0].innerHTML,n.signature=r[1]?r[1].innerHTML:null,n.quoteURL=e.querySelector('a[href*="posting.php?mode=quote"]').href,n.hasUnreadAnchor=null!==e.querySelector('a[name="unread"]'),n.user={},$avatar=e.querySelector(".postavatar img"),n.user.username=e.querySelector(".postauthor").innerHTML,n.user.avatar=$avatar?$avatar.src:null,t.push(n)}),Object.assign({posts:t},o(),r())}},function(e,t,n){const{Component:r,h:o,render:i}=window.preact,a=n(10),s=n(5),l=n(8),p=n(6),c=n(3),{store:d}=n(0),u=n(11);e.exports=class extends r{constructor(){super(),this.state=Object.assign({},d.get("data"))}componentDidMount(){const e=document.querySelector("#unread");null!==e&&setTimeout(()=>{let t=e.getBoundingClientRect(),n=window.scrollY+t.top;window.scrollTo(0,n)},500)}render(e,t){let n=t.posts.map(e=>o(u,{post:e})),r=t.breadcrumbs[t.breadcrumbs.length-1].text;const i=`./posting.php${new URL(window.location.href).search}&mode=reply`;return o("div",{id:"viewtopic"},[o(c),o(a,t.pagination),o(p,{title:t.title,breadcrumbs:t.breadcrumbs,subtitle:r}),o("ul",{className:"posts"},n),o("a",{href:i,className:"reply"},"Reply"),o(l),o(a,Object.assign({top:!0},t.pagination)),o(s,{breadcrumbs:t.breadcrumbs})])}}},function(e,t,n){const r=n(2);e.exports=function(e={}){return Object.assign({},r(e))};n(4)},function(e,t,n){const{Component:r,h:o}=window.preact,i=n(32),a=n(3),s=n(6),{store:l}=n(0);e.exports=class extends r{constructor(){super();let e=l.get("data");this.state=Object.assign({},e)}render(e,t){return o("div",{id:"login"},[o(a),o(s,{title:"Σύνδεση"}),o("form",{method:"POST"},[o(i,{type:"text",name:"username",placeholder:"username"}),o(i,{type:"password",name:"password",placeholder:"password"}),o(i,{type:"checkbox",name:"autologin",label:"Autologin on each visit"}),o("div",null,o("button",{className:"submit"},"Submit"))])])}}},function(e,t){const{Component:n,h:r}=window.preact;let o=0;e.exports=class extends n{getId(e){return e.id?e.id:"input-gen-"+ ++o}render(e,t){let n=this.getId(e),o=Object.assign({},e,{id:n}),i=[r("input",o)];return e.label&&i.push(r("label",{for:n},e.label)),r("div",{className:"input-block"},i)}}},function(e,t,n){const r=n(2),o=e=>({name:e.name,value:e.value,type:e.type});e.exports=function(e={}){const t=document.querySelector('#maintable form[name="postform"]'),n=document.querySelectorAll('input[type="hidden"]'),i=document.querySelectorAll('input:not([type="hidden"])'),a=["subject","addbbcode20","message","attach_sig","post","fileupload","filecomment"],s=Array.from(n).map(o),l=Array.from(i).filter(e=>a.includes(e.name)).map(o),p=((e,t,n)=>{let r=e.concat(t),o=[];return r=r.filter(e=>!o.includes(e.name)&&!n.includes(e.name)&&(o.push(e.name),!0))})(l,s,["subject"]);p.push({name:"addbbcode20",value:"100",type:"hidden"}),p.push({name:"filecomment",value:"",type:"hidden"}),p.push({name:"post",value:"Submit",type:"hidden"});const c=t.querySelector('input[name="subject"]').value,d=t.querySelector("textarea.posting-textarea").value,u=t.action;return Object.assign({hiddenFields:s,visibleFields:l,filteredFields:p,subject:c,message:d,action:u},r(e))}},function(e,t,n){const{Component:r,h:o,render:i}=window.preact,a=n(5),s=n(8),l=n(6),p=n(3),{store:c}=n(0);n(35),n(36);e.exports=class extends r{constructor(){super(),this.state=Object.assign({},c.get("data"))}prepMessage(e){return e.match(/^\[quote\=/)&&(e+="\n"),e}render(e,t){const n=[];return t.filteredFields.forEach(e=>{let{type:t,name:r,value:i}=e;"checkbox"===e.type&&(e.type="hidden"),n.push(o("input",e))}),o("div",{id:"posting"},[o(p),o(l,{title:t.title,breadcrumbs:t.breadcrumbs}),o(s),o("form",{className:"editor",action:t.action,method:"post",enctype:"multipart/form-data"},[o("div",{className:"input-container"},[o("div",{},"Τίτλος"),o("input",{type:"text",name:"subject",value:t.subject})]),o("div",{className:"input-container"},[o("div",{},"Μήνυμα"),o("textarea",{name:"message",value:this.prepMessage(t.message)})]),o("div",{className:"extra-input"},n),o("div",{},[o("input",{type:"submit",value:"Submit"})])]),o(a,{breadcrumbs:t.breadcrumbs})])}}},function(e,t){e.exports='<svg aria-hidden="true" data-prefix="fas" data-icon="save" class="svg-inline--fa fa-save fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M433.941 129.941l-83.882-83.882A48 48 0 0 0 316.118 32H48C21.49 32 0 53.49 0 80v352c0 26.51 21.49 48 48 48h352c26.51 0 48-21.49 48-48V163.882a48 48 0 0 0-14.059-33.941zM224 416c-35.346 0-64-28.654-64-64 0-35.346 28.654-64 64-64s64 28.654 64 64c0 35.346-28.654 64-64 64zm96-304.52V212c0 6.627-5.373 12-12 12H76c-6.627 0-12-5.373-12-12V108c0-6.627 5.373-12 12-12h228.52c3.183 0 6.235 1.264 8.485 3.515l3.48 3.48A11.996 11.996 0 0 1 320 111.48z"></path></svg>'},function(e,t){e.exports='<svg aria-hidden="true" data-prefix="fas" data-icon="upload" class="svg-inline--fa fa-upload fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M296 384h-80c-13.3 0-24-10.7-24-24V192h-87.7c-17.8 0-26.7-21.5-14.1-34.1L242.3 5.7c7.5-7.5 19.8-7.5 27.3 0l152.2 152.2c12.6 12.6 3.7 34.1-14.1 34.1H320v168c0 13.3-10.7 24-24 24zm216-8v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h136v8c0 30.9 25.1 56 56 56h80c30.9 0 56-25.1 56-56v-8h136c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z"></path></svg>'}]);