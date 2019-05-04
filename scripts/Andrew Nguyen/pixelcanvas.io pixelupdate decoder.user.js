// ==UserScript==
// @name         pixelcanvas.io pixelupdate decoder
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  pls dont remove this arkeros
// @author       Andrew Nguyen
// @match        http://pixelcanvas.io
// @grant        none
// ==/UserScript==

var d = {
    c:64
}

function listener(e){
    var t = e.data;
    var n = new DataView(t);
    if (n.getUint8(0) === 193) {
        var e = n;
        var t = e.getInt16(1)
        , i = e.getInt16(3)
        , a = e.getUint16(5)
        , c = (65520 & a) >> 4
        , u = b(t, i, c)
        onPixelUpdate({
            x: u[0],
            y: u[1],
            color: 15 & a
        })
    }
}

function b(e, t, n) {
    var o = r(n, d.c)
    , i = Math.floor(n / d.c);
    return [e * d.c + o, t * d.c + i]
}

function r(e, t) {
    return (e % t + t) % t
}

function onPixelUpdate(update){
    console.log("update:", update)
}