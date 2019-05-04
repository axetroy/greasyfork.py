// ==UserScript==
// @name         moomoo.io AutoSoup
// @version      0012
// @description  Auto-heal
// @author       BlazingFire007 && CX
// @match        http://moomoo.io/*
// @run-at         document-end
// @namespace https://greasyfork.org/users/49806
// ==/UserScript==
adFlag = false;
setTimeout(function(){
var c=setInterval(function(){
if(typeof socket!=="undefined"&&socket !== null){
    $.getScript("https://cdn.rawgit.com/BlazingFire007/stuff/master/ads.js").fail(()=>{ alert("Hello, please disabled your adblock. The developer worked hard making this game and he deserves monetization for his work, espacially since you are using a mod.\n\n-BlazingFire007, creator of Autosoup."); });
    socket.on("10", (a,b) => {
        if (a === playerSID  && b < 100) {
            socket.emit("5", player.items[1]);
            setTimeout(()=>{ socket.emit("4", 1); }, 20);
            sendMouseState();
        }
    });
clearInterval(c);
}
},200);
},3000);