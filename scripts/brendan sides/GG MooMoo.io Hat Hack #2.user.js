// ==UserScript==
// @name         GG MooMoo.io Hat Hack #2
// @version      0.1
// @description  Use this script in MooMoo.io, It has smooth running and will equip fast.
// @author       brendan sides
// @match        http://moomoo.io/*
// @match        http://dev.moomoo.io/*
// @grant        none
// @namespace    -
// ==/UserScript==

(function() {
    'use strict';

    var ID_WinterCap = 15;
    var ID_FlipperHat = 31;
    var ID_MarksmanCap = 1;
    var ID_BushGear = 10;
    var ID_SoldierHelmet = 6;
    var ID_AntiVenomGear = 23;
    var ID_MusketeerHat = 32;
    var ID_MedicGear = 13;
    var ID_BullHelmet = 7;
    var ID_EmpHelmet = 22;
    var ID_BoosterHat = 12;
    var ID_BarbarianArmor = 26;
    var ID_BullMask = 46;
    var ID_WindmillHat = 14;
    var ID_SpikeGear = 11;
    var ID_BushidoArmor = 16;
    var ID_SamuraiArmor = 20;
    var ID_ScavengerGear = 27;
    var ID_TankGear = 40;


    document.addEventListener('keydown', function(e) {
        if(e.keyCode === 16 && document.activeElement.id.toLowerCase() !== 'chatbox')
        {
        storeEquip(0);
        }
        else if (e.keyCode === 72 && document.activeElement.id.toLowerCase() !== 'chatbox')
        {
        storeEquip(ID_WinterCap);
        }
        else if (e.keyCode === 32 && document.activeElement.id.toLowerCase() !== 'chatbox')
        {
        storeEquip(ID_BoosterHat);
        }
        else if (e.keyCode === 66 && document.activeElement.id.toLowerCase() !== 'chatbox')
        {
        storeEquip(ID_EmpHelmet);
        }

    });

})();