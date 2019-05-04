// ==UserScript==
// @name         GOTA.IO EXTENSION CLAN 『Σκ』
// @namespace    http://tampermonkey.net/
// @version      3.1
// @description  No hay ningun puto lag we si se pone lento es tu pinche wifi robado -:v
// @author       Mendoza_XD
// @match        https://gota.io/web/*
// @grant        GM_addStyle
// @contributor  Mendoza_XD
// @icon         https://i.imgur.com/9RhhIRo.png
// ==/UserScript==

alert('bienvenido a la extension  del clan 『Σκ』  xD');

function addStyleSheet(style){
  var getHead = document.getElementsByTagName("HEAD")[0];
  var cssNode = window.document.createElement( 'style' );
  var elementStyle= getHead.appendChild(cssNode);
  elementStyle.innerHTML = style;
  return elementStyle;
}

//Custom Font, Logo and Minimap
addStyleSheet('@import url(https://fonts.googleapis.com/css?family=Ubuntu);');
GM_addStyle('#logo {background-image: url("https://i.imgur.com/mihB4I0.png");}');
GM_addStyle('#minimap-canvas {background-image: url("http://i.imgur.com/2e89LnJ.png");}');
GM_addStyle('*{font-family: Ubuntu;}');
GM_addStyle('.coordinates {font-family: Ubuntu;}');
GM_addStyle('#leaderboard-panel {font-size: 24px;}');

var fillTextz = CanvasRenderingContext2D.prototype.fillText;
CanvasRenderingContext2D.prototype.fillText = function(){
    var argumentz = arguments;
    if(this.canvas.id == 'leaderboard-canvas'){
    this.font = 'bold 15px Ubuntu';
    }
    if(this.canvas.id == 'minimap-canvas'){
    this.font = 'bold 15px Ubuntu';
    }
    if(this.canvas.id == 'party-canvas'){
    this.font = 'bold 15px Ubuntu';
    }
    fillTextz.apply(this, arguments);
};

//Custom Borders
GM_addStyle('.main-panel {border: solid 3px rgba(99, 97, 95, 0.5)}');
GM_addStyle('.main-panel {border-radius: 5px}');
GM_addStyle('.main-panel {box-shadow: 0px 0px 0px 0px rgba(0,0,0,0.52)}');

GM_addStyle('.gota-btn {border-radius: 15px}');

GM_addStyle('.main-bottom-stats {border-radius: 5px}');
GM_addStyle('.main-bottom-stats {box-shadow: 0px 0px 0px 0px rgba(0,0,0,0.52)}');

GM_addStyle('#popup-party {border-radius: 5px; border-width: 2px;}');
GM_addStyle('#popup-party {box-shadow: 0px 0px 0px 0px rgba(0,0,0,0.25)}');

GM_addStyle('#popup-login {border-radius: 5px; border-width: 2px;}');
GM_addStyle('#popup-login {box-shadow: 0px 0px 0px 0px rgba(0,0,0,0.25)}');

GM_addStyle('.login-input {border-radius: 0px}');
GM_addStyle('#chat-input {border-radius: 0 0 0px 0px}');

GM_addStyle('.ui-pane {box-shadow: 0px 0px 0px 0px rgba(0,0,0,0.52)}');
GM_addStyle('#chat-container {border-radius: 5px 5px 0px 0px}');

GM_addStyle('#leaderboard-panel, #score-panel, #minimap-panel, #party-panel {border-radius: 5px; border-width: 2px; box-shadow: none;}')

//Script Version Indicator
var maincontent = document.getElementById("main-content");
  var ffscversion = document.createElement("div");
  ffscversion.innerHTML = 'Script Version: V3.0<br>Made By Mendoza_XD';
  ffscversion.id = 'ffecscript';
  maincontent.appendChild(ffscversion);
document.getElementById("ffecscript").style.cssText = "text-align:center;font-size:12px;color:white;";

//Custom Crosshair
GM_addStyle ('body {cursor: url(https://i.imgur.com/bX1fOny.gif)16 16, auto;}');

(function(){
    if (window.top != window.self) return;

    if (!('code' in KeyboardEvent.prototype)) {
        return alert("Sorry, your browser is incompatible with Gota.io Features by Mendoza_XD. You're recommended to install the newest version of Google Chrome or Mozilla Firefox browsers.");
    }

    function getVersionParts(v, validate = false) {
        var parts = v.split('.');
        if (validate) for (var i = 0; i < parts.length; i++) if (!/^\d+$/.test(parts[i])) return false;
        return parts;
    }

    function compareVersions(v1, v2) {
        var v1parts = getVersionParts(v1), v2parts = getVersionParts(v2);

        v1parts = v1parts.map(Number);
        v2parts = v2parts.map(Number);

        while (v1parts.length < v2parts.length) v1parts.push(0);
        while (v2parts.length < v1parts.length) v2parts.push(0);

        for (var i = 0; i < v1parts.length; ++i) {
            if (v1parts[i] > v2parts[i]) return 1;
            else if (v1parts[i] < v2parts[i]) return -1;
        }
        return 0;
    }

    var importantUpdates = ['1.5.3', '1.6', '1.6.3'];
    importantUpdates.sort(compareVersions);

    var version = '1.6.10', storageVersion = localStorage['donut-version'], notify = false;
    if (!storageVersion || !getVersionParts(storageVersion, true) || compareVersions(version, storageVersion) == 1 && (importantUpdates.lastIndexOf(version) >= 0 || compareVersions(importantUpdates[importantUpdates.length - 1], storageVersion) == 1)) notify = true;
    else localStorage['donut-version'] = version;

    var styles = {
        '.donut-features-table': {
            'margin': 'auto',
            'width': 'max-content',
            'border-collapse': 'collapse'
        },
        '.donut-features-table td:nth-child(1)': {
            'text-align': 'left'
        },
        '.donut-features-table th, .donut-features-table td': {
            'padding': '2px 8px'
        },
        '.donut-features-table input[type="text"]': {
            'width': '100px',
            'text-align': 'center'
        },
        '.donut-features-div': {
            'margin': 'auto',
            'padding-top': '4px',
            'width': 'max-content'
        },
        '.donut-checkbox': {
            'position': 'relative',
            'top': '1px',
            'margin': '0 5px'
        },
        '#donut-scrimmageMode': {
            'box-sizing': 'content-box',
            'padding': '1px 0',
            'width': '104px'
        },
        '.donut-channel-link': {
            'box-sizing': 'border-box',
            'display': 'block',
            'margin': '3px auto 0',
            'padding': '4px 8px 4px 5.5px',
            'width': '85px',
            'height': '24px',
            'color': '#fefefe',
            'font-family': 'Arial, Helvetica, sans-serif',
            'font-size': '12px',
            'line-height': 'normal',
            'text-align': 'center',
            'text-decoration': 'none',
            'background-color': '#e62117',
            'border': 'solid 1px transparent',
            'border-radius': '2px',
            'white-space': 'nowrap',
            'vertical-align': 'middle',
            'box-shadow': '0 1px 0 rgba(0,0,0,0.05)'
        },
        '.donut-channel-link::before': {
            'content': '""',
            'position': 'relative',
            'top': '-1px',
            'display': 'inline-block',
            'margin-right': '6px',
            'width': '16px',
            'height': '12px',
            'background': 'no-repeat url(//s.ytimg.com/yts/imgbin/www-hitchhiker-vfl-Nn88d.png) -721px -88px',
            'background-size': 'auto',
            'vertical-align': 'middle'
        },
        '.donut-channel-link>span': {
            'display': 'inline-block',
            '-moz-box-sizing': 'border-box',
            'box-sizing': 'border-box'
        },
        '.donut-channel-link:hover': {
            'background-color': '#cc181e'
        },
        '.donut-channel-link:active': {
            'background-color': '#b31217'
        }
    };

    if (notify) {
        styles['.donut-features-btn::before'] = {
            'content': '"!"',
            'position': 'absolute',
            'top': '-6px',
            'right': '-6px'
        };
        styles['.donut-features-btn::before, .donut-updated'] = {
            'width': '12px',
            'height': '12px',
            'color': 'white',
            'font-size': '11px',
            'font-weight': 'bold',
            'text-align': 'center',
            'line-height': '12px',
            'background-color': 'red',
            'border-radius': '50%',
            'overflow': 'hidden',
            '-webkit-user-select': 'none',
            '-moz-user-select': 'none',
            '-ms-user-select': 'none',
            'user-select': 'none',
            'display': 'inline-flex',
            'align-items': 'center',
            'justify-content': 'center'
        };
        styles['.donut-updated'] = {
            'position': 'relative',
            'top': '-1px',
            'vertical-align': 'middle'
        };
    }

    function insertRule(selector) {
        var rule = selector + '{';
        for (var property in styles[selector]) rule += property + ':' + styles[selector][property] + ';';
        rule += '}';
        stylesheet.insertRule(rule, stylesheet.cssRules.length);
    }

    var style = document.createElement('style');
    document.head.appendChild(style);
    var stylesheet = style.sheet;
    for (var selector in styles) insertRule(selector);

    var left = document.getElementsByClassName('main-bottom-left')[0], right = document.getElementsByClassName('main-bottom-right')[0], stats = document.getElementsByClassName('main-bottom-stats')[0];
    left.style.position = 'relative';
    left.style.left = '-3px';
    left.style.marginRight = '6px';
    right.style.display = 'flex';
    right.style.flexFlow = 'column wrap';
    right.style.justifyContent = 'space-between';
    right.firstElementChild.style.margin = '0 auto';
    stats.style.width = '155px';
    stats.style.height = '148px';

    var btnTemplate = document.createElement('button');
    btnTemplate.className = 'gota-btn bottom-btn';
    btnTemplate.style.color = 'white';
    btnTemplate.style.backgroundColor = 'rgba(23,22,23,.9)';

    var btn = btnTemplate.cloneNode();
    btn.className += ' donut-features-btn';
    btn.style.position = 'relative';
    btn.style.boxSizing = 'border-box';
    btn.style.padding = '0px 3px';
    btn.style.width = '100%';
    btn.style.height = '32px';
    btn.style.fontSize = '16px';
    btn.style.lineHeight = '16px';
    btn.style.whiteSpace = 'nowrap';
    btn.style.overflow = 'visible';
    btn.innerText = 'Features by Donut';
    btn.addEventListener('click', function() {
        blackout.style.opacity = '0';
        blackout.style.display = 'block';
        resize();
        blackout.style.opacity = '1';
        if (notify) {
            localStorage['donut-version'] = version;
            stylesheet.insertRule('.donut-features-btn::before{content:none;}', stylesheet.cssRules.length);
        }
    });
    document.getElementsByClassName('main-bottom-right')[0].appendChild(btn);

    var blackout = document.createElement('div');
    blackout.style.position = 'fixed';
    blackout.style.top = '0';
    blackout.style.right = '0';
    blackout.style.bottom = '0';
    blackout.style.left = '0';
    blackout.style.display = 'none';
    blackout.style.background = 'rgba(0,0,0,.5)';
    blackout.style.overflow = 'auto';
    blackout.style.zIndex = '100';
    document.body.appendChild(blackout);

    var win = document.createElement('div');
    win.style.position = 'absolute';
    win.style.top = '50%';
    win.style.left = '50%';
    win.style.margin = '0';
    win.style.padding = '15px';
    win.style.color = 'white';
    win.style.fontFamily = 'Arial, Helvetica, sans-serif';
    win.style.fontSize = '16px';
    win.style.lineHeight = '22px';
    win.style.textAlign = 'center';
    win.style.backgroundColor = 'rgb(14,14,14)';
    win.style.border = 'solid 2px rgba(255,255,255,.2)';
    win.style.borderRadius = '5px';
    win.style.transform = 'translate(-50%, -50%)';
    win.innerHTML = `<table class='donut-features-table'><tbody><tr><th>Feature</th><th>Default</th><th>Custom key</th></tr>
<tr><td>Freeze</td><td>S</td><td><input type="text" spellcheck="false" data-donut-feature="freeze"></td></tr>
<tr><td>Show/hide skins</td><td>K</td><td><input type="text" spellcheck="false" data-donut-feature="skins"></td></tr>
<tr><td>Show/hide names</td><td>N</td><td><input type="text" spellcheck="false" data-donut-feature="names"></td></tr>
<tr><td>Show/hide mass</td><td>M</td><td><input type="text" spellcheck="false" data-donut-feature="mass"></td></tr>
<tr><td>Show/hide food</td><td>F</td><td><input type="text" spellcheck="false" data-donut-feature="food"></td></tr>
<tr><td>Show/hide chat</td><td>H</td><td><input type="text" spellcheck="false" data-donut-feature="chat"></td></tr>
<tr><td colspan="2">Triple split</td><td><input type="text" spellcheck="false" data-donut-feature="tripleSplit"></td></tr>
<tr><td colspan="2">Show/hide minimap</td><td><input type="text" spellcheck="false" data-donut-feature="minimap"></td></tr>
<tr><td colspan="2">Show/hide score panel</td><td><input type="text" spellcheck="false" data-donut-feature="scorePanel"></td></tr>
<tr><td colspan="2">Show/hide party panel</td><td><input type="text" spellcheck="false" data-donut-feature="partyPanel"></td></tr>
<tr><td colspan="2">Show/hide leaderboard</td><td><input type="text" spellcheck="false" data-donut-feature="leaderboard"></td></tr>
<tr><td colspan="2" style="padding-right:32px;">Toggle <em>Decline party invites</em></td><td><input type="text" spellcheck="false" data-donut-feature="autoDecline"></td></tr>
<tr><td colspan="2">Toggle <em>Auto respawn</em></td><td><input type="text" spellcheck="false" data-donut-feature="autoRespawn"></td></tr>
<tr><th colspan="3">Team Scrimmage</th>
<tr><td>Queue</td><td>Enter</td><td><input type="text" spellcheck="false" data-donut-feature="queue"></td></tr>
<tr><td>Leave a match</td><td>L</td><td><input type="text" spellcheck="false" data-donut-feature="leave"></td></tr></tbody></table>
<div class="donut-features-div">You should only use the <em>Leave a match</em> hotkey<br>when playing with random teammates.<br>If you want to disable a hotkey, type Delete.</div>
<div class="donut-features-div"><label><input type="checkbox" class="donut-checkbox" id="donut-hideScorePanel" data-donut-feature="hideScorePanel">Hide Score Panel</label><br>
<label><input type="checkbox" class="donut-checkbox" id="donut-hidePartyPanel" data-donut-feature="hidePartyPanel">Hide Party Panel</label><br>
<label><input type="checkbox" class="donut-checkbox" id="donut-hideLeaderboard" data-donut-feature="hideLeaderboard">Hide Leaderboard</label><br>
<label><input type="checkbox" class="donut-checkbox" id="donut-scrimmageAutoRespawn" data-donut-feature="scrimmageAutoRespawn">Scrimmage Auto Respawn</label><br>
<label><input type="checkbox" class="donut-checkbox" id="donut-startWithScrimmage" data-donut-feature="startWithScrimmage">Join Team Scrimmage as I open the game</label><br>
<label><input type="checkbox" class="donut-checkbox" id="donut-leaveExperimental" data-donut-feature="leaveExperimental">Use my <em>Leave a match</em> hotkey to leave<br>my team in the other gamemodes</label></div>
<div class="donut-features-div">Team Scrimmage Default: <select id="donut-scrimmageMode" data-donut-feature="scrimmageMode"><option value="0">Team 6v6</option><option value="1">Team 2v2</option><option value="2">Team 2v2 [MegaSplit]</option><option value="3">Duel 1v1</option></select></div>
<div class="donut-features-div">You can support the developer by checking out<br>his YouTube channel:</div>
<a href="https://www.youtube.com/channel/UC3JyDBBrEngpIPZAJIdp2mQ" target="_blank" class="donut-channel-link"><span>YouTube</span></a>`;
    if (notify && storageVersion) {
        if (compareVersions(storageVersion, '1.6') < 0) win.innerHTML = `<div class="donut-features-div" style="padding:0 0 4px 0;">Now you can use any key of your keyboard as<br>a hotkey, and select your <em>Leave a match</em> hotkey<br>to be used to leave a party in Experimental<br>(disabled by default, scroll down to enable).</div>` + win.innerHTML;
        if (compareVersions(storageVersion, '1.6.3') < 0) win.innerHTML = `<div class="donut-features-div" style="padding:0 0 4px 0;">Now you can select the default Scrimmage mode.</div>` + win.innerHTML;
    }
    blackout.appendChild(win);

    function resize() {
        if (blackout.style.display == 'block') {
            if (window.innerHeight < win.offsetHeight + 20) {
                win.style.top = '0';
                win.style.margin = '10px';
                win.style.transform = 'translate(-50%, 0%)';
            } else {
                win.style.top = '50%';
                win.style.margin = '0';
                win.style.transform = 'translate(-50%, -50%)';
            }
        }
    }
    window.addEventListener('resize', resize);

    document.addEventListener('click', function(e) {
        if (blackout.style.display == 'block' && e.target != win && !win.contains(e.target)) blackout.style.display = 'none';
    }, true);

    var done = btnTemplate.cloneNode();
    done.style.display = 'block';
    done.style.margin = '12px auto 0';
    done.innerText = 'Done';
    done.addEventListener('click', function() {
        blackout.style.display = 'none';
    });
    win.appendChild(done);

    var processedKeyCodes = {
        Escape: 'Esc',
        Minus: '-',
        Equal: '=',
        BracketLeft: '[',
        BracketRight: ']',
        Control: 'Ctrl',
        Semicolon: ';',
        Quote: "'",
        Backquote: '`',
        Backslash: '\\',
        Comma: ',',
        Period: '.',
        Slash: '/',
        NumpadMultiply: 'Numpad *',
        CapsLock: 'Caps Lock',
        ScrollLock: 'Scroll Lock',
        Numpad7: 'Numpad 7',
        Numpad8: 'Numpad 8',
        Numpad9: 'Numpad 9',
        NumpadSubtract: 'Numpad -',
        Numpad4: 'Numpad 4',
        Numpad5: 'Numpad 5',
        Numpad6: 'Numpad 6',
        NumpadAdd: 'Numpad +',
        Numpad1: 'Numpad 1',
        Numpad2: 'Numpad 2',
        Numpad3: 'Numpad 3',
        Numpad0: 'Numpad 0',
        NumpadDecimal: 'Numpad .',
        NumpadEqual: 'Numpad =',
        NumpadEnter: 'Enter',
        NumpadDivide: 'Numpad /',
        NumLock: 'Num Lock',
        ArrowUp: 'Arrow Up',
        PageUp: 'Page Up',
        ArrowLeft: 'Arrow Left',
        ArrowRight: 'Arrow Right',
        ArrowDown: 'Arrow Down',
        PageDown: 'Page Down',
        Meta: 'Win / \u2318',
        OS: 'Win / \u2318'
    };

    function processKeyCode(code) {
        if (code.indexOf('Arrow') && code.indexOf('Bracket')) code = code.replace(/Key|Digit|Left|Right/, '');
        if (code in processedKeyCodes) return processedKeyCodes[code];
        return code;
    }

    var keyCodes = {
        8: 'Backspace',
        9: 'Tab',
        13: 'Enter',
        33: 'Page Up',
        34: 'Page Down',
        35: 'End',
        36: 'Home',
        37: 'Arrow Left',
        38: 'Arrow Up',
        39: 'Arrow Right',
        40: 'Arrow Down',
        48: '0',
        49: '1',
        50: '2',
        51: '3',
        52: '4',
        53: '5',
        54: '6',
        55: '7',
        56: '8',
        57: '9',
        65: 'A',
        66: 'B',
        67: 'C',
        68: 'D',
        69: 'E',
        70: 'F',
        71: 'G',
        72: 'H',
        73: 'I',
        74: 'J',
        75: 'K',
        76: 'L',
        77: 'M',
        78: 'N',
        79: 'O',
        80: 'P',
        81: 'Q',
        82: 'R',
        83: 'S',
        84: 'T',
        85: 'U',
        86: 'V',
        87: 'W',
        88: 'X',
        89: 'Y',
        90: 'Z',
        96: 'Numpad 0',
        97: 'Numpad 1',
        98: 'Numpad 2',
        99: 'Numpad 3',
        100: 'Numpad 4',
        101: 'Numpad 5',
        102: 'Numpad 6',
        103: 'Numpad 7',
        104: 'Numpad 8',
        105: 'Numpad 9'
    };

    var defaultKeys = {
        freeze: 'S',
        skins: 'K',
        names: 'N',
        mass: 'M',
        food: 'F',
        chat: 'H',
        tripleSplit: null,
        minimap: null,
        scorePanel: null,
        partyPanel: null,
        leaderboard: null,
        autoDecline: null,
        autoRespawn: null,
        queue: 'Enter',
        leave: 'L'
    };

    var inputs = document.querySelectorAll('.donut-features-table input[type="text"][data-donut-feature]'), errorKeys = 'Gota.io Features by Mendoza_XD: An error occurred. We had to reset your custom keys.';
    function fillInputs(keys) {
        for (var i = 0; i < inputs.length; i++) {
            var feature = inputs[i].dataset.donutFeature, key = keys[feature];
            if (typeof key == 'undefined' && feature in defaultKeys) {
                key = keys[feature] = defaultKeys[feature];
                localStorage['donut-keys'] = JSON.stringify(keys);
            } else if (typeof(key) == 'number') {
                key = keys[feature] = key in keyCodes ? keyCodes[key] : defaultKeys[feature];
                localStorage['donut-keys'] = JSON.stringify(keys);
            }
            if (key === null) continue;
            inputs[i].value = key;
        }
    }

    function tryLocalStorage(index, defaultObj, func, error) {
        var obj; index = 'donut-' + index;
        try {
            if (!localStorage[index]) throw null;
            obj = JSON.parse(localStorage[index]);
            if (func) func(obj);
        } catch (e) {
            obj = JSON.parse(JSON.stringify(defaultObj));
            if (e && error) console.error(error);
            localStorage[index] = JSON.stringify(obj);
            if (func) func(obj);
        }
        return obj;
    }

    var keys = tryLocalStorage('keys', defaultKeys, fillInputs, errorKeys);

    function handleInputKeydown(e) {
        e.preventDefault();
        var feature = this.dataset.donutFeature, code = processKeyCode(e.code);
        if (code) {
            if (code == 'Delete') {
                this.value = '';
                keys[feature] = null;
                localStorage['donut-keys'] = JSON.stringify(keys);
            } else if (code != keys[feature] && code != 'Unidentified') {
                for (var k in keys) {
                    if (keys[k] == code) {
                        keys[k] = null;
                        for (var l = 0; l < inputs.length; l++) {
                            if (inputs[l].dataset.donutFeature == k) {
                                inputs[l].value = '';
                                break;
                            }
                        }
                    }
                }
                this.value = keys[feature] = code;
                localStorage['donut-keys'] = JSON.stringify(keys);
            }
        }
    }

    for (var j = 0; j < inputs.length; j++) {
        inputs[j].addEventListener('keydown', handleInputKeydown);
    }

    var cache = tryLocalStorage('cache', {});

    function selectOption(id) {
        var select = document.getElementById(id), index = select.selectedIndex;
        select.selectedIndex = (index + (index == 1) + 1) % select.options.length;
        $(select).trigger('change');
    }

    function triggerCheckbox(id) {
        $('#' + id).prop('checked', !$('#' + id).prop('checked')).trigger('change');
    }

    function triggerDonutCheckbox(id) {
        var checkbox = document.getElementById(id);
        checkbox.checked = !checkbox.checked;
        checkbox.dispatchEvent(new Event('change'));
    }

    function fadeOutMain() {
        if (document.getElementById('main').style.display == 'block') window.onkeydown({keyCode: 27, which: 27});
    }

    var alertWin = win.cloneNode();
    alertWin.style.top = '10px';
    alertWin.style.display = 'none';
    alertWin.style.lineHeight = '19px';
    alertWin.style.backgroundColor = 'rgba(23,23,23,.9)';
    alertWin.style.boxShadow = '0 2px 3px rgba(0,0,0,.25)';
    alertWin.style.transform = 'translate(-50%, 0%)';
    alertWin.style.zIndex = '3';
    document.body.appendChild(alertWin);

    var alertFadeOutTimer = 0;
    function Alert(html, timeout) {
        alertWin.innerHTML = html;
        $(alertWin).fadeIn(500);
        if (alertFadeOutTimer) clearTimeout(alertFadeOutTimer);
        alertFadeOutTimer = setTimeout(function() {
            $(alertWin).fadeOut(500);
            alertFadeOutTimer = 0;
        }, timeout);
    }

    var frozen = false, x = 0, y = 0, originalMousemove;
    setTimeout(function delay() {
        if (window.onmousemove) {
            originalMousemove = window.onmousemove;
            window.onmousemove = function(e) {
                x = e.clientX; y = e.clientY;
                if (!frozen) originalMousemove(e);
            };
        } else {
            setTimeout(delay, 200);
        }
    }, 200);

    window.addEventListener('keydown', function(e) {
        if (e.code == undefined) return;
        var code = processKeyCode(e.code), modifier = false;
        if ((code == 'Alt' && !e.ctrlKey && !e.metaKey && !e.shiftKey) || (code == 'Ctrl' && !e.altKey && !e.metaKey && !e.shiftKey) || (code == 'Win / \u2318' && !e.altKey && !e.ctrlKey && !e.shiftKey) || (code == 'Shift' && !e.altKey && !e.ctrlKey && !e.metaKey)) modifier = true;
        if (modifier || !e.altKey && !e.ctrlKey && !e.metaKey) {
            if (!modifier) {
                var key = e.which || e.keyCode || 0;
                if (key == 13 && document.activeElement === document.getElementById('name-box')) team2v2();
                else if (key == 27) {
                    if (!firstEscape) firstEscape = true;
                    if (alertWin.offsetHeight) $(alertWin).fadeOut(500);
                }
            }
            if ((modifier || !e.shiftKey) && document.activeElement.tagName != 'INPUT' && document.activeElement.tagName != 'TEXTAREA') {
                switch (code) {
                    case keys.freeze:
                        if (originalMousemove) {
                            var X = window.innerWidth/2;
                            var Y = window.innerHeight/2;
                            originalMousemove({clientX: X, clientY: Y});
                            frozen = true;
                        }
                        break;
                    case keys.skins:
                        selectOption('sShowSkins');
                        break;
                    case keys.names:
                        selectOption('sShowNames');
                        break;
                    case keys.mass:
                        triggerCheckbox('cShowMass');
                        break;
                    case keys.food:
                        triggerCheckbox('cHideFood');
                        break;
                    case keys.chat:
                        triggerCheckbox('cHideChat');
                        break;
                    case keys.tripleSplit:
                        for (var i = 0; i < 3; i++) $(window).trigger($.Event('keydown', {keyCode: 32, which: 32}));
                        break;
                    case keys.minimap:
                        triggerCheckbox('cHideMinimap');
                        break;
                    case keys.scorePanel:
                        triggerDonutCheckbox('donut-hideScorePanel');
                        break;
                    case keys.partyPanel:
                        triggerDonutCheckbox('donut-hidePartyPanel');
                        break;
                    case keys.leaderboard:
                        triggerDonutCheckbox('donut-hideLeaderboard');
                        break;
                    case keys.autoDecline:
                        triggerCheckbox('cAutoDecline');
                        Alert('Auto Decline Party Invites: <strong>' + (document.getElementById('cAutoDecline').checked ? 'On' : 'Off') + '</strong>', 2500);
                        break;
                    case keys.autoRespawn:
                        var id = done2v2 ? 'donut-scrimmageAutoRespawn' : 'cAutoRespawn';
                        if (done2v2) triggerDonutCheckbox(id);
                        else triggerCheckbox(id);
                        Alert('Auto Respawn' + (done2v2 ? ' in Team Scrimmage' : '') + ': <strong>' + (document.getElementById(id).checked ? 'On' : 'Off') + '</strong>', 2500);
                        break;
                    case keys.queue:
                        if (document.getElementById('scrimmage-btn-leave').style.display == 'block') $('#btn-leave-match').trigger('click');
                        else if (document.getElementById('main-scrimmage').style.display == 'block') $('#btn-queue').trigger('click');
                        fadeOutMain();
                        break;
                    case keys.leave:
                        if (switches.leaveExperimental || scrimmage) {
                            var cp = document.getElementById('chat-panel'), hidden = cp.style.display == 'none';
                            if (hidden) {
                                cp.style.opacity = '0';
                                cp.style.display = 'block';
                            }
                            $('#chat-input').val('/leave').focus().trigger($.Event('keyup', {keyCode: 13, which: 13})).blur();
                            scrimmage = false;
                            if (hidden) {
                                cp.style.display = 'none';
                                cp.style.opacity = '1';
                            }
                            fadeOutMain();
                        }
                }
            }
        }
    });

    window.addEventListener('keyup', function(e) {
        if (originalMousemove && e.code && processKeyCode(e.code) == keys.freeze && !e.altKey && !e.ctrlKey && !e.metaKey && !e.shiftKey && document.activeElement.tagName != 'INPUT' && document.activeElement.tagName != 'TEXTAREA') {
            frozen = false;
            originalMousemove({clientX: x, clientY: y});
        }
    });

    var defaultSwitches = {
        hideScorePanel: false,
        hidePartyPanel: false,
        hideLeaderboard: false,
        scrimmageAutoRespawn: true,
        startWithScrimmage: false,
        leaveExperimental: false
    };

    var checkboxes = document.getElementsByClassName('donut-checkbox'), errorSwitches = 'Gota.io Features by Mendoza_XD: An error occurred. We had to reset your settings.';
    function fillCheckboxes(switches) {
        for (var i = 0; i < checkboxes.length; i++) {
            var feature = checkboxes[i].dataset.donutFeature, Switch = switches[feature];
            if (typeof Switch == 'undefined' && feature in defaultSwitches) {
                Switch = switches[feature] = defaultSwitches[feature];
                localStorage['donut-switches'] = JSON.stringify(switches);
            }
            if (typeof Switch == 'boolean') checkboxes[i].checked = Switch;
            else throw errorSwitches;
        }
    }

    var switches = tryLocalStorage('switches', defaultSwitches, fillCheckboxes, errorSwitches);

    var anchorObd = document.querySelector('.options-table>thead:nth-of-type(2)'), obd = anchorObd.cloneNode(true);
    obd.firstElementChild.firstElementChild.textContent = 'Options by Mendoza_XD';
    anchorObd.parentNode.insertBefore(obd, anchorObd);

    var tbody = document.createElement('tbody');
    anchorObd.parentNode.insertBefore(tbody, anchorObd);

    function duplicatedCheckbox(feature, text) {
        var td = document.createElement('td');
        td.colSpan = '2';
        td.style.position = 'relative';
        td.style.paddingRight = '22px';
        td.textContent = text;

        var checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'checkbox-options';
        checkbox.dataset.donutFeature = feature;
        checkbox.style.position = 'absolute';
        checkbox.style.top = '1px';
        checkbox.style.right = '1px';
        td.appendChild(checkbox);

        var tr = document.createElement('tr');
        tr.appendChild(td);
        tbody.appendChild(tr);

        return checkbox;
    }

    for (var feature in defaultSwitches) {
        var bro = document.querySelector('.donut-checkbox[data-donut-feature="' + feature + '"]'), text = (feature == 'startWithScrimmage' ? 'Join Scrimmage as I open the game' : bro.parentNode.innerText).replace('\n', ' ');
        duplicatedCheckbox(feature, text).checked = switches[feature];
    }

    function handleCheckboxChange(e) {
        var feature = this.dataset.donutFeature;
        switches[feature] = this.checked;
        localStorage['donut-switches'] = JSON.stringify(switches);
        document.querySelector('input[type="checkbox"][data-donut-feature="' + feature + '"]' + (this.classList.contains('donut-checkbox') ? ':not(.donut-checkbox)' : '.donut-checkbox')).checked = this.checked;
        switch (feature) {
            case 'hideScorePanel':
                if (this.checked) hideScorePanel();
                else {
                    document.getElementById('party-panel').style.top = document.getElementById('score-panel').offsetHeight + 20 + 'px';
                    document.getElementById('score-panel').style.opacity = '1';
                }
                break;
            case 'hidePartyPanel':
                visibility('party-panel', !this.checked);
                break;
            case 'hideLeaderboard':
                visibility('leaderboard-panel', !this.checked);
                break;
            case 'scrimmageAutoRespawn':
                if (this.checked && scrimmage) scrimRespawn();
        }
    }

    checkboxes = document.querySelectorAll('input[type="checkbox"][data-donut-feature]');
    for (var k = 0; k < checkboxes.length; k++) {
        checkboxes[k].addEventListener('change', handleCheckboxChange);
    }

    function hideScorePanel() {
        document.getElementById('score-panel').style.opacity = '0';
        document.getElementById('party-panel').style.top = '10px';
    }
    if (switches.hideScorePanel) hideScorePanel();

    document.getElementById('cHideId').addEventListener('change', function() {
        if (document.getElementById('score-panel').style.opacity == '1') document.getElementById('party-panel').style.top = document.getElementById('score-panel').offsetHeight + 20 + 'px';
    });

    function visibility(id, visible) {
        document.getElementById(id).style.visibility = visible ? 'visible' : 'hidden';
    }
    if (switches.hideLeaderboard) visibility('leaderboard-panel', false);
    if (switches.hidePartyPanel) visibility('party-panel', false);

    var defaultOptions = {
        scrimmageMode: '2'
    };

    var selects = [document.getElementById('donut-scrimmageMode')];
    function fillSelects(options) {
        for (var i = 0; i < selects.length; i++) {
            var feature = selects[i].dataset.donutFeature, option = options[feature];
            if (typeof option == 'undefined' && feature in defaultOptions) {
                option = options[feature] = defaultOptions[feature];
                localStorage['donut-options'] = JSON.stringify(options);
            }
            var el = document.querySelector('[data-donut-feature="' + feature + '"] option[value="' + option + '"]');
            if (el) selects[i].selectedIndex = el.index;
            else throw null;
        }
    }

    var options = tryLocalStorage('options', defaultOptions, fillSelects);

    for (var l = 0; l < selects.length; l++) {
        selects[l].addEventListener('change', function(e) {
            var feature = this.dataset.donutFeature;
            options[feature] = this.options[this.selectedIndex].value;
            localStorage['donut-options'] = JSON.stringify(options);
        });
    }

    var scrimmage = false, respawnCheckInterval = 0, respawnTimer = 0;
    document.getElementById('btn-queue').addEventListener('click', function() {
        scrimmage = true;
        if (switches.scrimmageAutoRespawn) scrimRespawn();
    });

    function scrimmageFalse() {
        scrimmage = false;
        if (respawnTimer) {
            clearTimeout(respawnTimer);
            respawnTimer = respawnCheckInterval = 0;
        }
    }
    document.getElementById('btn-leave-match').addEventListener('click', scrimmageFalse);

    function scrimRespawn() {
        var cells = document.getElementById('playerCells'), cellsNum = parseInt(cells.innerText, 10);
        if (respawnCheckInterval) clearInterval(respawnCheckInterval);
        respawnCheckInterval = setInterval(function() {
            if (switches.scrimmageAutoRespawn && scrimmage) {
                var temp = parseInt(cells.innerText, 10);
                if (temp != cellsNum) {
                    cellsNum = temp;
                    if (cellsNum === 0) {
                        if (document.getElementById('main-scrimmage').style.display == 'none') {
                            respawnTimer = setTimeout(function() {
                                if (switches.scrimmageAutoRespawn && scrimmage) {
                                    $('#btn-play').trigger('click');
                                    respawnTimer = 0;
                                    scrimRespawn();
                                }
                            }, 10000);
                        }
                        clearInterval(respawnCheckInterval);
                        respawnCheckInterval = 0;
                    }
                }
            } else {
                clearInterval(respawnCheckInterval);
                respawnCheckInterval = 0;
            }
        }, 500);
    }

    var firstEscape = false;
    function startScrimmage() {
        var region = document.getElementsByClassName('server-active')[0].getAttribute('region');
        var id = region == 'eu' ? 's_Beta' : region == 'na' ? 's_Jet' : 's_Citrus';
        var interval = setInterval(function() {
            if (document.getElementById(id) && document.getElementsByClassName('server-selected').length) {
                $('#' + id).trigger('click');
                $('#btn-play').trigger('click');
                setTimeout(function() {
                    if (!firstEscape && !done2v2) Alert('It looks like the server is not responding.<br>You may want to press <strong>Esc</strong> to go back to the game menu.', 20000);
                }, 5000);
                clearInterval(interval);
            }
        }, 100);
    }
    if (switches.startWithScrimmage) startScrimmage();

    var lastScrimmageServer = null;
    function isTeamScrimmage() {
        var servers = ['Beta', 'Jet', 'Citrus'];
        for (var i = 0; i < servers.length; i++) if (document.getElementById('s_' + servers[i]).classList.contains('server-selected')) return servers[i];
        return false;
    }

    var done2v2 = false, checkigTean2v2 = false;
    function team2v2() {
        if (!checkigTean2v2) {
            var scrimmageServer = isTeamScrimmage();
            if (scrimmageServer) {
                if (!done2v2 || scrimmageServer != lastScrimmageServer) {
                    lastScrimmageServer = scrimmageServer;
                    checkigTean2v2 = true;
                    var interval = setInterval(function() {
                        if (document.getElementById('main-scrimmage').style.display == 'block' && document.getElementById('scrimmage-mode-select').selectedIndex === 0) {
                            document.getElementById('scrimmage-mode-select').selectedIndex = options.scrimmageMode;
                            $('#scrimmage-mode-select').trigger('change');
                            clearTimeout(timeout);
                            clearInterval(interval);
                            done2v2 = true;
                            checkigTean2v2 = false;
                            if (switches.startWithScrimmage && alertWin.offsetHeight) alertWin.style.display = 'none';
                        }
                    }, 100), timeout = setTimeout(function() {
                        clearInterval(interval);
                        checkigTean2v2 = false;
                    }, 25000);
                }
            } else {
                scrimmageFalse();
                done2v2 = false;
            }
        }
    }

    document.getElementById('btn-play').addEventListener('click', team2v2);
    document.getElementById('btn-spec').addEventListener('click', team2v2);

    var recaptcha = document.getElementById('recaptcha');
    if (recaptcha) recaptcha.style.display = 'none';
})();