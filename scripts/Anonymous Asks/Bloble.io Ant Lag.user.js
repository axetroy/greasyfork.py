// ==UserScript==
// @name         Bloble.io Ant Lag
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  press - to icrease game quality, press + to decrease game quality and the lag.
// @author       Snow Ask
// @match        Bloble.io
// @my org       https://goo.gl/wUcTJ6
// @grant        none
// ==/UserScript==

addEventListener("keydown", function(a) {
    if(a.keyCode==107){
        var canvas=document.getElementsByTagName('canvas')[0];
        var gl = canvas.getContext('webgl');
        newW = gl.canvas.width/1.25;
        newH = gl.canvas.height/1.25;
        gl.canvas.height = newH;
        gl.canvas.width = newW;
        gl.viewport(0,0,newW,newH);
    }
});
addEventListener("keydown", function(a) {
    if(a.keyCode==109){
        var canvas=document.getElementsByTagName('canvas')[0];
        var gl = canvas.getContext('webgl');
        newW = gl.canvas.width*1.25;
        newH = gl.canvas.height*1.25;
        gl.canvas.height = newH;
        gl.canvas.width = newW;
        gl.viewport(0,0,newW,newH);
    }
});