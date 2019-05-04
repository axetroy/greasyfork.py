
// ==UserScript==
// @name           MooMoo.io Modded Hud + AIO MOD EN
// @author         LoLxBoi
// @namespace      https://greasyfork.org/en/users/170259-lolxboi
// @version        0.1
// @description    Custom HUD + AutoHeal | Hat Cycle/Chooser
// @match          http://moomoo.io/*
// @match          https://moomoo.io/*
// @match          http://45.77.0.81/*
// @match          https://45.77.0.81/*
// @match          *://moomoo.io/*
// @require        http://code.jquery.com/jquery-3.3.1.min.js
// @icon           https://yt3.ggpht.com/-rw78MA3GBOY/AAAAAAAAAAI/AAAAAAAAAAA/8haxGLIyt_Y/s240-c-k-no-mo-rj-c0xffffff/photo.jpg
// ==/UserScript==

/////////////////////////////////////////////////////////////////////////////////// ?MooMoo? \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

// http://keycode.info/
// https://www.cambiaresearch.com/articles/15/javascript-char-codes-key-codes

//AutoHeal & Double Attack

(function () {
    var ITEM_TYPE = {
        WEAPON: 0,
        STONE: 1,
        FOOD: 2,
        PITTRAP: 3,
        WINDMILL: 4,
        TWO_WEAPON: 5,
        SPIKES: 6,
        TURRET: 7,
        MINE: 8,
        EXTRAS: 9
    };

    var ITEMS = [{
        id: 0,
        sid: 0,
        type: ITEM_TYPE.WEAPON,
        name: "Tool hammer"
    }, {
        id: 1,
        sid: 1,
        type: ITEM_TYPE.WEAPON,
        name: "Hand axe"
    }, {
        id: 2,
        sid: 2,
        type: ITEM_TYPE.WEAPON,
        name: "Great axe"
    }, {
        id: 3,
        type: ITEM_TYPE.WEAPON,
        sid: 3,
        name: "Short Sword"
    }, {
        id: 4,
        sid: 4,
        type: ITEM_TYPE.WEAPON,
        name: "Katana"
    }, {
        id: 5,
        sid: 5,
        type: ITEM_TYPE.WEAPON,
        name: "PoleArm"
    }, {
        id: 6,
        sid: 6,
        type: ITEM_TYPE.TWO_WEAPON,
        name: "Hunting bow"
    }, {
        id: 7,
        sid: 7,
        type: ITEM_TYPE.TWO_WEAPON,
        name: "Great hammer"
    }, {
        id: 8,
        sid: 8,
        type: ITEM_TYPE.TWO_WEAPON,
        name: "Wooden shield"
    }, {
        id: 9,
        sid: 9,
        type: ITEM_TYPE.TWO_WEAPON,
        name: "Crossbow"
    }, {
        id: 10,
        sid: 10,
        type: ITEM_TYPE.TWO_WEAPON,
        name: "Musket"
    }, {
        id: 0,
        sid: 11,
        type: ITEM_TYPE.FOOD,
        name: "Apple"
    }, {
        id: 1,
        sid: 12,
        type: ITEM_TYPE.FOOD,
        name: "Cookie"
    }, {
        id: 2,
        sid: 13,
        type: ITEM_TYPE.WALL,
        name: "Wood Wall"
    }, {
        id: 3,
        sid: 14,
        type: ITEM_TYPE.WALL,
        name: "Stone Wall"
    }, {
        id: 4,
        sid: 15,
        type: ITEM_TYPE.WALL,
        name: "Castle Wall"
    }, {
        id: 5,
        sid: 16,
        type: ITEM_TYPE.SPIKES,
        name: "Spikes"
    }, {
        id: 6,
        type: ITEM_TYPE.SPIKES,
        sid: 17,
        name: "Greater spikes"
    }, {
        id: 7,
        type: ITEM_TYPE.SPIKES,
        sid: 18,
        name: "Poison spikes"
    }, {
        id: 8,
        type: ITEM_TYPE.SPIKES,
        sid: 19,
        name: "Spinning spikes"
    }, {
        id: 9,
        sid: 20,
        type: ITEM_TYPE.WINDMILL,
        name: "Windmill"
    }, {
        id: 10,
        type: ITEM_TYPE.WINDMILL,
        sid: 21,
        name: "Faster windmill"
    }, {
        id: 11,
        type: ITEM_TYPE.MINE,
        sid: 22,
        name: "Mine"
    }, {
        id: 12,
        type: ITEM_TYPE.PITTRAP,
        sid: 23,
        name: "Pit trap"
    }, {
        id: 13,
        type: ITEM_TYPE.PITTRAP,
        sid: 24,
        name: "Boost pad "
    }, {
        id: 14,
        type: ITEM_TYPE.EXTRAS,
        sid: 25,
        name: "Turret"
    },  {
        id: 15,
        type: ITEM_TYPE.EXTRAS,
        sid: 26,
        name: "Platform"
    },  {
        id: 16,
        type: ITEM_TYPE.EXTRAS,
        sid: 27,
        name: "Healing Pad"
    },  {
        id: 17,
        type: ITEM_TYPE.EXTRAS,
        sid: 28,
        name: "Spawn Pad"
    }];

    function getItemById(id, type) {
        if (type !== undefined && !Array.isArray(type)) {
            type = [type];
        }
        return ITEMS.find(function (item) {
            return type === undefined ? item.id == id && ![ITEM_TYPE.WEAPON, ITEM_TYPE.TWO_WEAPON].includes(item.type) : item.id == id && type.includes(item.type);
        });
    }

    function getItemBySid(sid) {
        return ITEMS.find(function (item) {
            return item.sid !== undefined && sid !== undefined && item.sid == sid;
        });
    }

    var ws;
    var player;
    var BOT_SETTINGS_TEMPLATE = '<style>.bot-settings{padding: 10px; background-color: rgba(0, 0, 0, 0.4); border-radius: 0px; position: absolute; left: 20px; top: 20px; min-width: 200px; max-width: 300px;aw}.equip-btn{display:inline-block; width: 25px; height: 25px; border: 1px solid grey; background-size: contain; cursor: pointer; background-color: lightgray;}.equip-btn.selected{background-color: rgb(255, 0, 0);}</style><div class="bot-settings"> <div> <div> <input type="checkbox" id="botAutoHealOn"/> <label for="botAutoHealOn">AUTOMATICKÝ ŽIVOT / AUTO HEAL</label> </div></div><hr/> <div id="bot-equips-0"> </div><hr/><div id="bot-equips-1"> </div></div>';
    var autoHealStarted = true;
    var btnEnterGame = document.getElementById('enterGame');

    function Player() {
        this.id = 0;

        this.resources = {
            food: 100,
            gold: 100,
            wood: 100,
            stone: 100
        };

        this.hp = 100;

        this.hat = 0;
        this.accessory = 0;

        this.items = {};
        this.items[ITEM_TYPE.WEAPON] = getItemById(0, ITEM_TYPE.WEAPON);
        this.items[ITEM_TYPE.SPIKES] = getItemById(5);
        this.items[ITEM_TYPE.WALL] = getItemById(2);
        this.items[ITEM_TYPE.FOOD] = getItemById(0);
        this.items[ITEM_TYPE.WINDMILL] = getItemById(9);
        this.items[ITEM_TYPE.EXTRAS] = getItemById(14);

        this.itemInHand = this.items[ITEM_TYPE.WEAPON];
    }

    btnEnterGame.onmousedown = function () {
        StartBot();
        btnEnterGame.onmousedown = null;
    };

    document.addEventListener('keydown', function (e) {
        if (ws) {
            switch (e.keyCode) {

                case 186: // Ů [ semi-colon / ñ / 186 ]
                    e.stopPropagation();
                    if (player.items[ITEM_TYPE.WINDMILL]) ws.send("42[\"5\"," + player.items[ITEM_TYPE.WINDMILL].id + ",null]");
                    break;

                case 219: // Ú [ open bracket / 219 ]
                    e.stopPropagation();
                    if (player.items[ITEM_TYPE.SPIKES]) ws.send("42[\"5\"," + player.items[ITEM_TYPE.SPIKES].id + ",null]");
                    break;

                case 221: // ) [ close bracket / å / 221 ]
                    e.stopPropagation();
                    if (player.items[ITEM_TYPE.PITTRAP]) ws.send("42[\"5\"," + player.items[ITEM_TYPE.PITTRAP].id + ",null]");
                    break;

                case 115: // F4 [ 115 ]
                    e.stopPropagation();
                    $('.bot-settings').toggle();
                    break;

                case 113: // F2 [ 113 ]
                    e.stopPropagation();
                    $('.InfoOVylepšení').toggle();
                    break;

                case 118: // F7 [ 118 ]
                    e.stopPropagation();
                    $('.InfoOKlávesnice').toggle();
                    break;

                case 119: // F8 [ 119 ]
                    e.stopPropagation();
                    $('.InfoOKlávesnice2').toggle();
                    break;
            }
        }
    }, true);

    document.addEventListener('mousedown', function (e) {
        if (ws && e.button == 2) {
            e.stopPropagation();
                ws.send("42[\"4\",1,null]");
            setTimeout(function () {
                ws.send("42[\"5\"," + player.items[ITEM_TYPE.TWO_WEAPON].id + ",true]");
            }, 100);
            setTimeout(function () {
                ws.send("42[\"4\",0,null]");
            }, 150);
            setTimeout(function () {
                ws.send("42[\"5\"," + player.items[ITEM_TYPE.WEAPON].id + ",true]");
            }, 550);
        }
    }, true);

    function Log(text) {
        return;
    }

    function init() {
        $('body').append(BOT_SETTINGS_TEMPLATE);

        $('#botAutoHealOn').prop("checked", autoHealStarted);
        $('#botAutoHealOn').change(function (e) {
            autoHealStarted = e.currentTarget.checked;
        });

        addEquip(0, 28);
        addEquip(0, 29);
        addEquip(0, 30);
        addEquip(0, 36);
        addEquip(0, 37);
        addEquip(0, 38);
        addEquip(0, 44);
        addEquip(0, 35);
        addEquip(0, 42);
        addEquip(0, 43);
        addEquip(0, 49);
    }

    function dead() {
        player = new Player();
    }

    function botLaunched() {
        return $('#botAutoHealOn').prop('checked');
    }

    function equipId(type, id) {
        return "bot-eq-" + type + id;
    }

    function equipIsSelect(type, id) {
        return $("#" + equipId(type, id)).hasClass("selected");
    }

    function equipSelect(type, id) {
        $("#" + equipId(type, id)).addClass("selected");
    }

    function equipCancleSelect(type, id) {
        if (id == "all") {
            $("#bot-equips-" + type + ">.equip-btn").removeClass("selected");
        } else $("#" + equipId(type, id)).removeClass("selected");
    }

    function equipExist(type, id) {
        return $("#bot-equips-" + type + ">#" + equipId(type, id)).length > 0;
    }

    function addEquip(type, id) {
        if (equipExist(type, id)) {
            return;
        }
        var url = "http://moomoo.io/img";

        if (type == 1) {
            url += "/accessories/access_" + id + ".png";
        } else {
            url += "/hats/hat_" + id + ".png";
        }

        $("<div/>", {
            id: equipId(type, id),
            "class": "equip-btn",
            css: {
                "background-image": "url(" + url + ")"
            },
            click: function click() {
                if (!equipIsSelect(type, id)) ws.send("42[\"13\",0," + id + ", " + type + "]");else ws.send("42[\"13\",0,0," + type + "]");
            }
        }).appendTo("#bot-equips-" + type);
    }

    function StartBot() {
        player = new Player();
        init();
        Log("AutoHeal loaded");
        WebSocket.prototype.oldSend = WebSocket.prototype.send;
        WebSocket.prototype.send = function (m) {
            if (!ws) {
                ws = this;
                socketFound(this);
            }
            var parsed = parseWSMsg(m);

            if (parsed[0] == "5") {
                var id = parsed[1];
                var isWeapon = parsed[2] || false;
                if (!isWeapon) {
                    if (id === 0 || id === 1) {
                        player.itemInHand = player.items[ITEM_TYPE.FOOD];
                    }
                }
            }

            if (parsed[0] == "6") {
                var item = getItemBySid(parsed[1]);
                if (item) {
                    player.items[item.type] = item;
                    if (item.type == player.itemInHand.type) {
                        player.itemInHand = item;
                    }
                }
            }

            this.oldSend(m);
        };

        function socketFound(socket) {
            window.gameSocket = socket;
            socket.addEventListener("message", function (e) {
                var m = e.data;
                var parsed = parseWSMsg(m);

                switch (parsed[0]) {
                    case "1":
                        player.id = parsed[1];
                        break;

                    case "us":
                        var itemId = parsed[2];
                        var pacType = parsed[1];
                        var itemType = parsed[3];
                        switch (pacType) {
                            case 0:
                                addEquip(itemType, itemId);
                                break;

                            case 1:
                                if (itemType == 1) player.accessory = itemId;else if (itemType === 0) player.hat = itemId;
                                equipCancleSelect(itemType, "all");
                                equipSelect(itemType, itemId);
                                break;
                        }
                        break;

                    case "9":
                        player.resources[parsed[1]] = parsed[2];
                        break;

                    case "10":
                        if (parsed[1] == player.id) {
                            player.hp = parsed[2];
                            if (player.hp <= 0) {
                                dead();
                            }
                        }
                        break;
                }
            });
        }

        var healTimer = setInterval(function () {
            if (autoHealStarted) heal();
        }, 207.8125);

        function parseWSMsg(s) {
            if (s.indexOf("42") === -1) return -1;
            var o = s.substring(s.indexOf("["));
            return JSON.parse(o);
        }

        function heal() {
            if (player.hp >= 100) return;
            if (hasApple()) {
                if (player.itemInHand.type == ITEM_TYPE.FOOD) {
                    ws.send("42[\"4\",1,null]");
                    player.itemInHand = player.items[ITEM_TYPE.WEAPON];
                } else {
                    ws.send("42[\"5\"," + player.items[ITEM_TYPE.FOOD].id + ",null]");
                    heal();
                }
            }
        }

        function hasApple() {
            if (player.items[ITEM_TYPE.FOOD].id === 0) return player.resources.food >= 10;else return player.resources.food >= 15;
        }
    }
})();






//////////////////////////////////////////////////////////////////////////////////////   VISUAL \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
///////////////////////////////////////////////////////////////////////////////////// IMPROVEMENTS \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\


var moomooVer = $('#linksContainer2 .menuLink').html(),
    hideSelectors = ['#mobileDownloadButtonContainer',
                     '#followText',
                     '#smallLinks',
                     '#linksContainer1',
                     '#twitterFollow',
                     '#youtubeFollow',
                     '#cdm-zone-02',
                     '#youtuberOf',
                     '#downloadButtonContainer',
                     '#promoImg',
                     '.menuHeader',
                     '.menuLink',
                     '.menuHeader:nth-child(5)',
                     '.menuHeader:nth-child(6)',
                     '.menuText',
                     '#adCard',
                     '#promoImgHolder',
                     ],

    css = '#rightCardHolder {display: block!important}',
    head = document.head || document.getElementsByTagName('head')[0],
    style = document.createElement('style');

style.type = 'text/css';
if (style.styleSheet){
    style.styleSheet.cssText = css;
} else {
    style.appendChild(document.createTextNode(css));
}

for ( let i = 0; i < hideSelectors.length; i++ ) {
    $(hideSelectors[i]).hide();
}

head.appendChild(style);
$('#linksContainer2').html('<a href="./docs/versions.txt" target="_blank" class="menuLink">' + moomooVer + '</a>');

// document.getElementById('promoImgHolder').innerHTML = '</iframe><iframe width="420px" height="236.25px" src="https://www.youtube-nocookie.com/embed/GPATUFiWoTI" frameborder="0" allowfullscreen></iframe>';
// document.getElementById('adCard').innerHTML = '<iframe width="420px" height="236.25px" src="https://www.youtube-nocookie.com/embed/D3_2AIOEnZQ" frameborder="0" allowfullscreen></iframe>';
// document.getElementById('downloadButtonContainer').innerHTML = '</iframe><iframe width="420px" height="236.25px" src="http://icecast3.play.cz/evropa2-128.mp3"></iframe>';

// document.getElementById("gameUI").style.backgroundImage = "url('')";
// document.getElementById("mainMenu").style.backgroundImage = "url('')";
document.getElementById('enterGame').innerHTML = '? Play ?';
document.getElementById('loadingText').innerHTML = '?? Cracked By The Africans ??';
document.getElementById('nameInput').placeholder = "Username";
document.getElementById('chatBox').placeholder = "Message";
document.getElementById('diedText').innerHTML = '? Get Burnt ?';
document.getElementById('gameName').innerHTML = '?MooMoo?';

$('.menuCard').css({'white-space': 'normal',
                    'text-align': 'center',
                    'background-color': 'rgba(0, 0, 0, 0.74)',
                    '-moz-box-shadow': '0px 0px rgba(255, 255, 255, 0)',
                    '-webkit-box-shadow': '0px 0px rgba(255, 255, 255, 0)',
                    'box-shadow': '0px 0px rgba(255, 255, 255, 0)',
                    '-webkit-border-radius': '0px',
                    '-moz-border-radius': '0px',
                    'border-radius': '0px',
                    'margin': '15px',
                    'margin-top': '15px'});

$('#menuContainer').css({'white-space': 'normal'});

$('#nativeResolution').css({'cursor': 'pointer'});

$('#playMusic').css({'cursor': 'pointer'});

$('#guideCard').css({'overflow-y': 'hidden',
                     'margin-top': 'auto',
                     'margin-bottom': '30px'});

$('#serverSelect').css({'margin-bottom': '30.75px'});

$('#skinColorHolder').css({'margin-bottom': '30.75px'});

$('.settingRadio').css({'margin-bottom': '30.75px'});

$('#partyButton').css({'right': '70%',
                       'left': '10%',
                       'text-align': 'center',
                       'bottom': '48px',
                       'font-size': '24px',
                       'top': 'unset'});

$('#joinPartyButton').css({'right': '10%',
                           'left': '70%',
                           'text-align': 'center',
                           'bottom': '48px',
                           'font-size': '24px',
                           'top': 'unset'});

$('#linksContainer2').css({'-webkit-border-radius': '0px 0 0 0',
                           '-moz-border-radius': '0px 0 0 0',
                           'border-radius': '0px 0 0 0',
                           'right': '44%',
                           'left': '44%',
                           'background-color': 'rgba(0, 0, 0, 0.74)',
                           'text-align': 'center',
                           'bottom': '12px'});

$('#gameName').css({'color': '#21F0FF',
                    'text-shadow': '0 1px 0 rgba(255, 255, 255, 0), 0 2px 0 rgba(255, 255, 255, 0), 0 3px 0 rgba(255, 255, 255, 0), 0 4px 0 rgba(255, 255, 255, 0), 0 5px 0 rgba(255, 255, 255, 0), 0 6px 0 rgba(255, 255, 255, 0), 0 7px 0 rgba(255, 255, 255, 0), 0 8px 0 rgba(255, 255, 255, 0), 0 9px 0 rgba(255, 255, 255, 0)',
                    'text-align': 'center',
                    'font-size': '156px',
                    'margin-bottom': '-30px'});

$('#loadingText').css({'color': '#21F0FF',
                       'background-color': 'rgba(0, 0, 0, 0.74)',
                       'padding': '8px',
                       'right': '150%',
                       'left': '150%',
                       'margin-top': '40px'});

$('.ytLink').css({'color': '#144db4',
                  'padding': '8px',
                  'background-color': 'rgba(0, 0, 0, 0.74)'});

$('.menuLink').css({'color': '#144db4'});

$('#nameInput').css({'border-radius': '0px',
                     '-moz-border-radius': '0px',
                     '-webkit-border-radius': '0px',
                     'border': 'hidden'});

$('#serverSelect').css({'cursor': 'pointer',
                        'color': '#21F0FF',
                        'background-color': '#808080',
                        'border': 'hidden',
                        'font-size': '20px'});

$('.menuButton').css({'border-radius': '0px',
                      '-moz-border-radius': '0px',
                      '-webkit-border-radius': '0px'});

$('#promoImgHolder').css({'position': 'absolute',
                          'bottom': '-7%',
                          'left': '20px',
                          'width': '420px',
                          'height': '236.25px',
                          'padding-bottom': '18px',
                          'margin-top': '0px'});

$('#adCard').css({'position': 'absolute',
                  'bottom': '-7%',
                  'right': '20px',
                  'width': '420px',
                  'height': '236.25px',
                  'padding-bottom': '18px'});

$('#mapDisplay').css({'-webkit-border-radius': '0px',
                      '-moz-border-radius': '0px',
                      'border-radius': '0px'});

$('.menuHeader').css({'color': 'rgba(255, 255, 255, 1)'});

$('#killCounter').css({'color': '#ededed'});

$('#diedText').css({'background-color': 'rgba(0, 0, 0, 0.74)'});

$('#gameCanvas').css({'background-color': '#f4f4f4'});

$('#allianceButton').css({'color': 'rgba(0, 0, 0, 1)'});

$('#storeButton').css({'color': 'rgba(0, 0, 0, 1)'});

$('#chatButton').css({'color': 'rgba(0, 0, 0, 1)'});

$('.gameButton').css({'-webkit-border-radius': '0px 0 0 0',
                      '-moz-border-radius': '0px 0 0 0',
                      'border-radius': '0px 0 0 0',
                      'background-color': 'rgba(0, 0, 0, 0.4)'});

$('.uiElement, .resourceDisplay').css({'-webkit-border-radius': '0px',
                                       '-moz-border-radius': '0px',
                                       'border-radius': '0px',
                                       'background-color': 'rgba(0, 0, 0, 0.4)'});

$('#chatBox').css({'-webkit-border-radius': '0px',
                   '-moz-border-radius': '0px',
                   'border-radius': '0px',
                   'background-color': 'rgba(0, 0, 0, 0.4)',
                   'text-align': 'center'});

$('#foodDisplay').css({'color': '#ae4d54'});

$('#woodDisplay').css({'color': '#758f58'});

$('#stoneDisplay').css({'color': '#818198'});

$('#scoreDisplay').css({'color': '#c2b17a'});

$('#leaderboard').css({'-webkit-border-radius': '0px',
                       '-moz-border-radius': '0px',
                       'border-radius': '0px',
                       'background-color': 'rgba(33, 240, 255, 0.4)',
                       'text-align': 'center'});

$('#ageText').css({'color': '#000'});

$('#ageBar').css({'-webkit-border-radius': '0px',
                  '-moz-border-radius': '0px',
                  'border-radius': '0px',
                  'background-color': 'rgba(0, 0, 0, 0.4)'});

$('#ageBarBody').css({'-webkit-border-radius': '0px',
                      '-moz-border-radius': '0px',
                      'border-radius': '0px',
                      'background-color': '#21F0FF'});

$('.storeTab').css({'-webkit-border-radius': '0px',
                    '-moz-border-radius': '0px',
                    'border-radius': '0px',
                    'background-color': 'rgba(0, 0, 0, 0.4)'});

$('#storeHolder').css({'-webkit-border-radius': '0px',
                       '-moz-border-radius': '0px',
                       'border-radius': '0px',
                       'background-color': 'rgba(0, 0, 0, 0.4)'});

$('#allianceHolder').css({'-webkit-border-radius': '0px',
                          '-moz-border-radius': '0px',
                          'border-radius': '0px',
                          'background-color': 'rgba(0, 0, 0, 0.4)'});

$('.actionBarItem').css({'-webkit-border-radius': '0px',
                         'border-radius': '0px',
                         'background-color': 'rgba(0, 0, 0, 0.4)'});


var myElement = document.querySelector('#nameInput');
myElement.style.backgroundColor = "#808080";
myElement.style.color = "#21F0FF";

var myElement = document.querySelector('#enterGame');
myElement.style.backgroundColor = "#21F0FF";
myElement.style.color = "#808080";

$('#leaderboard').append('TrickyModz');

addEventListener("click", function() { var Rf = document.documentElement, SfR = Rf.requestFullScreen || Rf.webkitRequestFullScreen || Rf.mozRequestFullScreen; SfR.call(Rf);});