// ==UserScript==
// @name         Amazing MooMoo.io Hat hack!
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Try to be the God or Goddess in MooMoo.io!
// @author       SaVaGe;_;#5185
// @match        http://moomoo.io/*
// @match        http://sandbox.moomoo.io/*
// @grant        none
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
    //Turret Gear. "Use if you want to"
    var ID_TurretGear = 53;


    document.addEventListener('keydown', function(e) {
        if(e.keyCode === 16 && document.activeElement.id.toLowerCase() !== 'chatbox')
        {
        storeEquip(0);
        }
        else if (e.keyCode === 90 && document.activeElement.id.toLowerCase() !== 'chatbox')
        {
        storeEquip(ID_TankGear);
        }
        else if (e.keyCode === 71 && document.activeElement.id.toLowerCase() !== 'chatbox')
        {
        storeEquip(ID_SoldierHelmet);
        }
        else if (e.keyCode === 66 && document.activeElement.id.toLowerCase() !== 'chatbox')
        {
        storeEquip(ID_BullHelmet);
        }
        else if (e.keyCode === 32 && document.activeElement.id.toLowerCase() !== 'chatbox')
        {
        storeEquip(ID_BoosterHat);
        }
        else if (e.keyCode === 72 && document.activeElement.id.toLowerCase() !== 'chatbox')
        {
        storeEquip(ID_EmpHelmet);
        }
        else if (e.keyCode === 78 && document.activeElement.id.toLowerCase() !== 'chatbox')
        {
        storeEquip(ID_TurretGear);
        }

    });

})();
