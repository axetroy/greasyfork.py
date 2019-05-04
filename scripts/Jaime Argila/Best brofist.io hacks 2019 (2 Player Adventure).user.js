// ==UserScript==
// @name Best brofist.io hacks 2019 (2 Player Adventure)
// @namespace Best brofist.io hacks 2019 (2 Player Adventure)
// @include http://brofist.io/modes/twoPlayer/c/index.html
// @version 6.3
// @description Enjoy! (Not Working and I will fix as soon as possible.)
// @grant none
// ==/UserScript==
//Code below vvvvvvv
var avatar = "";
var name = "";
var hacked = function () {
if (typeof client.name !== "undefined" && name !== "") {
    name = client.name;
}
if (typeof client.avatar !== "undefined" && avatar !== "") {
    name = client.avatar;
}
document.onkeydown = function(event){
if (event.keyCode == 49) {
client.start();
}
if (event.keyCode == 50) {
client.runPhysics = false;
client.avatar = "seeker";
client.name = "ADMIN";
client.runPhysics = true;
}
if (event.keyCode == 51) {
client.runPhysics = false;
client.avatar = "tagged"
client.name = "ADMIN"
client.runPhysics = true;
}
if (event.keyCode == 52) {
client.runPhysics = false;
client.avatar = avatar;
client.name = name;
client.runPhysics = true;
}
if (event.keyCode == 53) {
client.runPhysics = false;
client.runPhysics = true;
}
if (event.keyCode == 54) {
client.runPhysics = false;
client.runPhysics = true;
}
if (event.keyCode == 55) {
client.runPhysics = false;
client.runPhysics = true;
}
if (event.keyCode == 56) {
client.runPhysics = false;
client.runPhysics = true;
}
};
requestAnimationFrame(hacked);
};
hacked();
conslole.warn("Script is running.\n Creator: Jaime Argila.\n Script Tester: Kaden Baker.");