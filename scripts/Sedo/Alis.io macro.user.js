// ==UserScript==
2
// @name         Alis.io macro
3
// @namespace    http://tampermonkey.net/
4
// @version      0.5
5
// @description  Fastest Mass Ejector & Split Macro
6
// @author       Sedo
7
// @match        http://alis.io/
8
// @match        http://petridish.pw/*
9
// @match        http://agarly.com/*
10
// @match        http://agar.biz/*
11
// @match        http://en.agar.bio/*
12
// @match        http://agar.pro/*
13
// @match        http://agar.biz/*
14
// @grant        none
15
// @run-at       document-end
16
// ==/UserScript==
17
​
18
​
19
​
20
window.addEventListener('keydown', keydown);
21
window.addEventListener('keyup', keyup);
22
​
23
var EjectDown = false;
24
​
25
var speed = 25; //in ms
26
​
27
function keydown(event) {
28
    if (event.keyCode == 87 && EjectDown === false) { // key W
29
        EjectDown = true;
30
        setTimeout(eject, speed);
31
    }
32
    if (event.keyCode == 65) { //key w
33
        split();
34
        setTimeout(split, speed);
35
    }
36
    if (event.keyCode == 68) { //key D
37
        split();
38
        setTimeout(split, speed);
39
        setTimeout(split, speed2);
40
        setTimeout(split, speed3);
41
    }
42
    if (event.keyCode == 83) { //key S
43
        X = window.innerWidth/2;
44
        Y = window.innerHeight/2;
45
        $("canvas").trigger($.Event("mousemove", {clientX: X, clientY: Y}));
46
    }
47
}
48
​
49
function keyup(event) {
50
    if (event.keyCode == 87) { // key W
51
        EjectDown = false;
52
    }
53
}
54
​
55
function eject() {
56
    if (EjectDown) {
57
        window.onkeydown({keyCode: 87}); // key W
58
        window.onkeyup({keyCode: 87});
59
        setTimeout(eject, speed);
60
    }
61
}
62
​
63
function split() {
64
    $("body").trigger($.Event("keydown", { keyCode: 32})); //key space
65
    $("body").trigger($.Event("keyup", { keyCode: 32})); //jquery is required for split to work
66
}
