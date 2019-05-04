// ==UserScript==
// @name          Agma.io Extension
// @version       1.2
// @description   Improve your Agma.io gameplay with this extension.
// @author        Nuke
// @namespace     http://tampermonkey.net
// @match         http://agma.io/
// @icon          http://agma.io/agm3.ico
// @run-at        document-end
// ==/UserScript==

var aeKeys = [];

// ==EventListeners==
window.addEventListener("keydown", keydown);
window.addEventListener("keyup", keyup);
// ==/EventListeners==

// ==UI-HTML==
var ui = document.createElement('div');
document.body.appendChild(ui);
ui.id = 'ui';
setInterval(function(){ $('#curser').hide(); }, 1);
$('.agma-logo').css('margin-top', '70px');
$('#minionUi').css('bottom', '0');

$(document).ready(function() {
    if (!localStorage.getItem('keyCheck')) {
        aeKeys[0] = 'w';
        aeKeys[1] = 'd'
        aeKeys[2] = 'z'
        aeKeys[3] = 'm'
        aeKeys[4] = 'y'
        aeKeys[5] = 'q'
        localStorage.setItem("aeKeys", JSON.stringify(aeKeys));
        localStorage.setItem('keyCheck', 'true');
    } else {
        return;
    }
});

document.getElementById('ui').innerHTML = `
<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.2/css/all.css">
<style type="text/css">
input:focus {
outline: 0;
}
.ae-h1 {
margin: 0;
font-family: arial;
font-weight: bold;
text-align: center;
line-height: 60px;
}
.ae-main {
display: inline;
font-family: arial;
border-bottom-left-radius: 4px;
border-bottom-right-radius: 4px;
background-color: rgba(0,0,0,.45);
position: absolute;
z-index: 1049;
left: 50%;
padding: 5px;
overflow: hidden;
height: 60px;
max-width: 610px;
min-width: 610px;
text-align: center;
transform: translate(-50%);
transition: height .75s ease;
}
.ae-close {
color: white;
font-size: 20px;
text-align: center;
position: absolute;
z-index: 1049;
left: 50%;
display: inline;
transform: translate(-50%);
background-color: rgba(0,0,0,.45);
margin-top: 60px;
overflow: visible;
width: 50px;
height: 12px;
border-bottom-left-radius: 50px;
border-bottom-right-radius: 50px;
transition: margin-top .75s ease;
}
.ae-close i {
transition: transform .75s ease;
cursor: pointer;
}
.ae-main-inner {
max-width: 600px;
min-width: 600px;
display: flex;
}
.ae-box {
position: relative;
float: left;
color: white;
text-align: center;
background-color: rgba(0,0,0,0.3);
height: 50px;
margin-top: 0px;
margin-bottom: 0px;
margin-left: 2.5px;
margin-right: 2.5px;
border-radius: 4px;
}
.ae-box-title {
text-align: center;
color: white;
text-transform: uppercase;
font-size: 23px;
font-family: aller;
border: 0;
width: 100%;
height: 73%;
background-color: transparent;
border-top-left-radius: 4px;
border-top-right-radius: 4px;
}
.ae-box-subtitle {
text-transform: uppercase;
width: 100%;
float: left;
font-weight: bold;
text-align: center;
line-height: 16px;
height: 15px;
border-bottom-left-radius: 4px;
border-bottom-right-radius: 4px;
position: absolute;
color: lightgray;
bottom: 0;
background-color: rgba(0, 0, 0, 0.5);
font-size: 11px;
}
.ae-dashboard {
display: block;
}
.ae-dashboard-inner {
display: block;
margin-top: -10px;
}
.rotate {
transform: rotate(-180deg);
}
.ae-dashboard ul {
list-style-type: none;
margin-top: 5px;
padding: 0;
width:100%;
height: 40px;
overflow: hidden;
}
.ae-dashboard ul li {
transition: background 0.3s ease;
padding: 10px;
float: left;
display: block;
color: white;
text-align: center;
text-decoration: none;
}
.ae-active-nav {
cursor: default;
background-color: rgba(0, 0, 0, 0.3);
}
.ae-dashboard ul li:hover {
cursor: pointer;
background-color: rgba(0, 0, 0, 0.3);
}
.ae-modal {
border-top-left-radius: 0px;
border-top-right-radius: 0px;
border-bottom-right-radius: 4px;
border-bottom-left-radius: 4px;
color: white;
text-align: left;
font-size: 15px;
padding: 10px;
margin: 0;
height: 395px;
width: 100%;
overflow-y:auto;
background-color: rgba(0, 0, 0, 0.3);
}

#ae-settings, #ae-changelog {
display: none;
}
.ae-changelog-time {
margin: 0;
float: right;
text-align: right;
width: 20%;
}
.ae-changelog-title {
margin: 0;
float: left;
width: 80%;
font-weight: bold;
}
.ae-changelog-hr {
margin-top: 5px;
margin-bottom: 5px;
float: left;
width: 100%;
}
.ae-changelog-text {
margin: 0;
}
.ae-changelog-section {
padding: 10px;
background-color: rgba(0, 0, 0, 0.5);
}
</style>
<div class="ae-main">
<div class="ae-main-inner">
<div class="ae-box" style="margin-left: 0px;">
<input id="ae-feed-key" autocomplete="off" maxlength="1" spellcheck="false" class="ae-box-title" value="${JSON.parse(localStorage.getItem('aeKeys'))[0]}"/>
<div class="ae-box-subtitle">macro feed</div>
</div>
<div class="ae-box">
<input id="ae-doublesplit-key" autocomplete="off" maxlength="1" spellcheck="false" class="ae-box-title" value="${JSON.parse(localStorage.getItem('aeKeys'))[1]}"/>
<div class="ae-box-subtitle">doublesplit</div>
</div>
<div class="ae-box">
<input id="ae-macrosplit-key" autocomplete="off" maxlength="1" spellcheck="false" class="ae-box-title" value="${JSON.parse(localStorage.getItem('aeKeys'))[2]}"/>
<div class="ae-box-subtitle">macro split</div>
</div>
<div class="ae-box">
<input id="ae-respawn-key" autocomplete="off" maxlength="1" spellcheck="false" class="ae-box-title" value="${JSON.parse(localStorage.getItem('aeKeys'))[3]}"/>
<div class="ae-box-subtitle">respawn</div>
</div>
<div class="ae-box" style="margin-right: 0px;">
<input id="ae-hide-ui-key" autocomplete="off" maxlength="1" spellcheck="false" class="ae-box-title" value="${JSON.parse(localStorage.getItem('aeKeys'))[4]}"/>
<div class="ae-box-subtitle">hide interface</div>
</div>
<div class="ae-box">
<input id="ae-freeze-key" autocomplete="off" maxlength="1" spellcheck="false" class="ae-box-title" value="${JSON.parse(localStorage.getItem('aeKeys'))[5]}"/>
<div class="ae-box-subtitle">freeze</div>
</div>
</div>
<div class="ae-dashboard">
<ul>
<li id="ae-profiles-btn">Profiles</li>
<li id="ae-settings-btn">Settings</li>
<li id="ae-changelog-btn">Changelog</li>
</ul>
<div class="ae-dashboard-inner">
<div class="ae-modal" id="ae-profiles">
Soon, you will be able to save different macro profiles. So, if you use other settings for different servers, you can use more profiles!
You can link profiles to servers.
</div>
<div class="ae-modal" id="ae-settings">
</div>
<div class="ae-modal" id="ae-changelog">
<div class="ae-changelog-modal">
<div class="ae-changelog-section">
<p class="ae-changelog-title">Update 1</p>
<p class="ae-changelog-time">25-2-2019</p>
<hr noshade="noshade" class="ae-changelog-hr">
<p class="ae-changelog-text">In this update, I've added the changelog. Future updates might include the settings and the home modal. I will stop updating the script when I'm finished. But, I might still do some bug fixes if necessary.</p>
</div>
<br>
<div class="ae-changelog-section">
<p class="ae-changelog-title">Update 1.2</p>
<p class="ae-changelog-time">27-3-2019</p>
<hr noshade="noshade" class="ae-changelog-hr">
<p class="ae-changelog-text">Changed a couple of things such as the macro split mechanics and faster respawn. Macro split is much much better now.</p>
</div>
</div>
</div>
</div>
</div>
</div>
<div class="ae-close"><i class="fas fa-sort-down"></i></div>
`
$('#ae-profiles-btn').click(function() {
    $('#ae-settings').hide();
    $('#ae-changelog').hide();
    $('#ae-profiles').show();
    $('.ae-dashboard ul li').removeClass('ae-active-nav');
    $(this).addClass('ae-active-nav');
});

$('#ae-settings-btn').click(function() {
    $('#ae-settings').show();
    $('#ae-changelog').hide();
    $('#ae-profiles').hide();
    $('.ae-dashboard ul li').removeClass('ae-active-nav');
    $(this).addClass('ae-active-nav');
});

$('#ae-changelog-btn').click(function() {
    $('#ae-settings').hide();
    $('#ae-changelog').show();
    $('#ae-profiles').hide();
    $('.ae-dashboard ul li').removeClass('ae-active-nav');
    $(this).addClass('ae-active-nav');
});

$(document).ready(function() {
    $('#ae-home-btn').addClass('ae-active-nav');
});


$('.ae-close i').css('margin-top', '-10px');
$('.ae-close').click(function() {
    if ($('.ae-close i').hasClass('rotate') === false) {
        $('.ae-close i').toggleClass('rotate');
        $('.ae-close').css('margin-top', '500px');
        $('.ae-close i').css('margin-top', '-3px');
        $('.ae-main').css('height', '500px');
    } else
        if ($('.ae-close i').hasClass('rotate') === true) {
            $('.ae-close i').toggleClass('rotate');
            $('.ae-close').css('margin-top', '60px');
            $('.ae-close i').css('margin-top', '-8px');
            $('.ae-main').css('height', '60px');
        }
})

var feedKey = document.getElementById('ae-feed-key');
var doubleKey = document.getElementById('ae-doublesplit-key');
var macroKey = document.getElementById('ae-macrosplit-key');
var respawnKey = document.getElementById('ae-respawn-key');
var hideUi = document.getElementById('ae-hide-ui-key');
var freezeKey = document.getElementById('ae-freeze-key');

aeKeys[0] = feedKey.value
aeKeys[1] = doubleKey.value
aeKeys[2] = macroKey.value
aeKeys[3] = respawnKey.value
aeKeys[4] = hideUi.value
aeKeys[5] = freezeKey.value
localStorage.setItem("aeKeys", JSON.stringify(aeKeys));



feedKey.addEventListener('change', () => {
    if (feedKey.value != '') {
        if (feedKey.value === doubleKey.value || feedKey.value === macroKey.value || feedKey.value === respawnKey.value || feedKey.value === hideUi.value || feedKey.value === freezeKey.value) {
            alert("You already have an input with the value of "+feedKey.value.toUpperCase());
            feedKey.value = 'w';
        } else {
            aeKeys[0] = feedKey.value
            localStorage.setItem("aeKeys", JSON.stringify(aeKeys));
        }
    } else {
        aeKeys[0] = feedKey.value
        localStorage.setItem("aeKeys", JSON.stringify(aeKeys));
    }
});

doubleKey.addEventListener('change', () => {
    if (doubleKey.value != '') {
        if (doubleKey.value === feedKey.value || doubleKey.value === macroKey.value || doubleKey.value === respawnKey.value || doubleKey.value === hideUi.value || doubleKey.value === freezeKey.value) {
            alert("You already have an input with the value of "+doubleKey.value.toUpperCase());
            doubleKey.value = 'd';
        } else {
            aeKeys[1] = doubleKey.value
            localStorage.setItem("aeKeys", JSON.stringify(aeKeys));
        }
    } else {
        aeKeys[1] = doubleKey.value
        localStorage.setItem("aeKeys", JSON.stringify(aeKeys));
    }
});

macroKey.addEventListener('change', () => {
    if (macroKey.value != '') {
        if (macroKey.value === feedKey.value || macroKey.value === doubleKey.value || macroKey.value === respawnKey.value || macroKey.value === hideUi.value || macroKey.value === freezeKey.value) {
            alert("You already have an input with the value of "+macroKey.value.toUpperCase());
            macroKey.value = 'z';
        } else {
            aeKeys[2] = macroKey.value
            localStorage.setItem("aeKeys", JSON.stringify(aeKeys));
        }
    } else {
        aeKeys[2] = macroKey.value
        localStorage.setItem("aeKeys", JSON.stringify(aeKeys));
    }
});

respawnKey.addEventListener('change', () => {
    if (respawnKey.value != '') {
        if (respawnKey.value === feedKey.value || respawnKey.value === doubleKey.value || respawnKey.value === macroKey.value || respawnKey.value === hideUi.value || respawnKey.value === freezeKey.value) {
            alert("You already have an input with the value of "+respawnKey.value.toUpperCase());
            respawnKey.value = 'm';
        } else {
            aeKeys[3] = respawnKey.value
            localStorage.setItem("aeKeys", JSON.stringify(aeKeys));
        }
    } else {
        aeKeys[3] = respawnKey.value
        localStorage.setItem("aeKeys", JSON.stringify(aeKeys));
    }
});

hideUi.addEventListener('change', () => {
    if (hideUi.value != '') {
        if (hideUi.value === feedKey.value || hideUi.value === doubleKey.value || hideUi.value === macroKey.value || hideUi.value === respawnKey.value || hideUi.value === freezeKey.value) {
            alert("You already have an input with the value of "+hideUi.value.toUpperCase());
            hideUi.value = 'y';
        } else {
            aeKeys[4] = hideUi.value
            localStorage.setItem("aeKeys", JSON.stringify(aeKeys));
        }
    } else {
        aeKeys[4] = hideUi.value
        localStorage.setItem("aeKeys", JSON.stringify(aeKeys));
    }
});

freezeKey.addEventListener('change', () => {
    if (hideUi.value != '') {
        if (freezeKey.value === feedKey.value || freezeKey.value === doubleKey.value || freezeKey.value === macroKey.value || freezeKey.value === respawnKey.value || freezeKey.value === hideUi.value) {
            alert("You already have an input with the value of "+freezeKey.value.toUpperCase());
            freezeKey.value = 'q';
        } else {
            aeKeys[5] = freezeKey.value
            localStorage.setItem("aeKeys", JSON.stringify(aeKeys));
        }
    } else {
        aeKeys[5] = freezeKey.value
        localStorage.setItem("aeKeys", JSON.stringify(aeKeys));
    }
});

var feed = false;
var speed = 50;

function split() {
    $("#canvas").trigger($.Event("keydown", { keyCode: 32}));
    $("#canvas").trigger($.Event("keyup", { keyCode: 32}));
}

function eject() {
    if (feed) {
        $("#canvas").trigger($.Event("keydown", { keyCode: 87}));
        $("#canvas").trigger($.Event("keyup", { keyCode: 87}));
        setTimeout(eject, speed);
    }
}
function keyup(e) {
    if (e.keyCode === 20) {
        feed = false;
    }
    if (e.key === feedKey.value.toLowerCase() || e.key === feedKey.value.toUpperCase()) {
        feed = false;
    }
}

function keydown(e) {
    if (event.keyCode === 20) {
        feed = false;
    }
    if (e.keyCode === 13) {
        return;
    }
    if (event.keyCode === 20) {
        feed = false;
    }
    if (e.keyCode === 20) {
        feed = false;
    }
    if ($('input').is(":focus")) {
        return;
    }
    if (e.key === feedKey.value.toLowerCase() || e.key === feedKey.value.toUpperCase()) {
        feed = true;
        setTimeout(eject, speed);
    }
    if (e.key === macroKey.value.toLowerCase() || e.key === macroKey.value.toUpperCase()) {
        $("#canvas").trigger($.Event("keydown", { keyCode: 90}));
        setTimeout(function() {
            $("#canvas").trigger($.Event("keyup", { keyCode: 90}));
        }, 500);
    }
    if (e.key === doubleKey.value.toLowerCase() || e.key === doubleKey.value.toUpperCase()) {
        split();
        setTimeout(split, speed);
    }
    if (e.key === respawnKey.value.toLowerCase() || e.key === respawnKey.value.toUpperCase()) {
        $('#playBtn').removeAttr("disabled");
        rspwn(document.getElementById("nick").value);
    }
    if (e.key === hideUi.value.toLowerCase() || e.key === hideUi.value.toUpperCase()) {
        $("#ui").fadeToggle(300);
    }
    if (e.key === freezeKey.value.toLowerCase() || e.key === freezeKey.value.toUpperCase()) {
        $("#canvas").trigger($.Event("keydown", { keyCode: 70}));
        $("#canvas").trigger($.Event("keyup", { keyCode: 70}));
    }
}





























// ==/HTML|/CSS|/JS==