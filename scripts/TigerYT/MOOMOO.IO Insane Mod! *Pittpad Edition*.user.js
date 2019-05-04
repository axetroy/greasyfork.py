// ==UserScript==
// @name         MOOMOO.IO Insane Mod! *Pittpad Edition*
// @namespace    MOOMOO.IO Insane Mod! *Pittpad Edition*
// @version      1
// @description  Right cick for Pittrap/Boosterpad
// @match        http://moomoo.io/*
// @match        http://45.77.0.81/*
// @require      http://code.jquery.com/jquery-1.12.4.min.js
// ==/UserScript==

(function () {
    var ITEM_TYPE = {
        WEAPON: 0,
        PITTRAP: 3,
    };

    var ITEMS = [{
        id: 0,
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
        id: 12,
        type: ITEM_TYPE.PITTRAP,
        sid: 23,
        name: "Pit trap"
    }, {
        id: 13,
        type: ITEM_TYPE.PITTRAP,
        sid: 24,
        name: "Boost pad "
    }];

    function getItemById(id, type) {
        if (type !== undefined && !Array.isArray(type)) {
            type = [type];
    }
    
        return ITEMS.find(function (item) {
            return type === undefined ? item.id == id && ![ITEM_TYPE.WEAPON, ITEM_TYPE.TWO_WEAPON].includes(item.type) : item.id == id && type.includes(item.type);
        });

    function getItemBySid(sid) {
        return ITEMS.find(function (item) {
            return item.sid !== undefined && sid !== undefined && item.sid == sid;
        });
    }

    function Player() {
        this.id = 0;

        this.resources = {
            food: 0,
            gold: 0,
            wood: 0,
            stone: 0
        };

        this.hp = 100;

        this.hat = 0;
        this.accessory = 0;

        this.items = {};
        this.items[ITEM_TYPE.WEAPON] = getItemById(0, ITEM_TYPE.WEAPON);
        this.items[ITEM_TYPE.PITTRAP] = getItemById(12);


        this.itemInHand = this.items[ITEM_TYPE.WEAPON];
    }

    document.addEventListener('mousedown', function (e) {
        if (ws && e.button == 2) {
            e.stopPropagation();
            if (player.items[ITEM_TYPE.PITTRAP]) ws.send("42[\"5\"," + player.items[ITEM_TYPE.PITTRAP].id + ",null]");
            ws.send("42[\"4\",1,null]");
            player.itemInHand = player.items[ITEM_TYPE.WEAPON];
        }
    }, true);