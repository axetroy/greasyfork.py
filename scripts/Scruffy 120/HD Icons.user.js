// ==UserScript==
// @name         HD Icons
// @version      4.2
// @author       Scruffy120/Breakmyballs
// @namespace    Diamondhunt
// @description  Makes icons HD
// @include      *.diamondhunt.*
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @grant        GM_addStyle
// ==/UserScript==
 
//orbs
var oldFunction = loadOffers;
 
loadOffers = function(data) {
 oldFunction(data);
 updateOrbs();
};
 
function updateOrbs() {
//Any orb blue
$('img[src*="anyOrb.png"]').attr("src", "http://i.imgur.com/bHesFNn.png");
//Any orb Green
$('img[src*="anyOrb2.png"]').attr("src", "http://i.imgur.com/8BdpkWh.png");
//Any orb Red
$('img[src*="anyOrb3.png"]').attr("src", "http://i.imgur.com/zBGamro.png");
//rake HD
$('img[src*="upgradeEnchantedRake.png"]').attr("src", "http://i.imgur.com/Ovc1ZW3.png");
//furnace HD
$('img[src*="upgradeFurnaceOrb.png"]').attr("src", "http://i.imgur.com/msV8Lbk.png");
//hammer HD
$('img[src*="upgradeEnchantedHammer.png"]').attr("src", "http://i.imgur.com/3SDVjOe.png");
//oil pipe HD
$('img[src*="upgradeOilPipe.png"]').attr("src", "http://i.imgur.com/8ghGK04.png");
//blue pumpjacks HD
$('img[src*="upgradePumpJackOrb.png"]').attr("src", "http://i.imgur.com/xjIE18B.png");
//wrench HD
$('img[src*="upgradeWrenchOrb.png"]').attr("src", "http://i.imgur.com/5Gy6A0O.png");
//exploring HD
$('img[src*="exploringOrb.png"]').attr("src", "http://i.imgur.com/02z5ef2.png");
//green pumpjack HD
$('img[src*="greenPumpJackOrb.png"]').attr("src", "http://i.imgur.com/PyCezms.png");
//wizard HD
$('img[src*="greenWizardOrb.png"]').attr("src", "http://i.imgur.com/yaqpViw.png");
//fuel barrel HD
$('img[src*="rocketFuelOrb.png"]').attr("src", "http://i.imgur.com/3Fzcf1o.png");
//brew kit HD
$('img[src*="redBrewingKitOrb.png"]').attr("src", "http://i.imgur.com/LwEuy0F.png");
//factory HD
$('img[src*="redFactoryOrb.png"]').attr("src", "http://i.imgur.com/6Ihj80l.png");
//planter
$('img[src*="images/crafting/planter.png"]').attr("src", "http://i.imgur.com/5Uvvn8P.png");
//trowel
$('img[src*="images/farming/trowel.png"]').attr("src", "http://i.imgur.com/9hAPHJb.png");
}
//Orbs
updateOrbs();

//Pumpkin HD
$("#item-pumpkinSigil-box > img").attr("src", "http://i.imgur.com/L2sKP9a.png");
//Blue pumpjack orb inventory HD
$("#item-upgradePumpJackOrb-box > img").attr("src", "http://i.imgur.com/xjIE18B.png");
//Dragon orb HD
$("#key-item-dragonOrb-box > img").attr("src", "http://i.imgur.com/lFHMFxl.png");
//Dragon orb size fix
$("#key-item-dragonOrb-box > img").height(120);
$("#key-item-dragonOrb-box > img").width(110);


//market fix
//rake HD
$('[src*="upgradeEnchantedRake.png"]').attr("src", "http://i.imgur.com/Ovc1ZW3.png");
//furnace HD
$('[src*="upgradeFurnaceOrb.png"]').attr("src", "http://i.imgur.com/msV8Lbk.png");
//hammer HD
$('[src*="upgradeEnchantedHammer.png"]').attr("src", "http://i.imgur.com/3SDVjOe.png");
//oil pipe HD
$('[src*="upgradeOilPipe.png"]').attr("src", "http://i.imgur.com/8ghGK04.png");
//blue pumpjacks HD
$('[src*="upgradePumpJackOrb.png"]').attr("src", "http://i.imgur.com/xjIE18B.png");
//wrench HD
$('[src*="upgradeWrenchOrb.png"]').attr("src", "http://i.imgur.com/5Gy6A0O.png");
//exploring HD
$('[src*="exploringOrb.png"]').attr("src", "http://i.imgur.com/02z5ef2.png");
//green pumpjack HD
$('[src*="greenPumpJackOrb.png"]').attr("src", "http://i.imgur.com/PyCezms.png");
//wizard HD
$('[src*="greenWizardOrb.png"]').attr("src", "http://i.imgur.com/yaqpViw.png");
//fuel barrel HD
$('[src*="rocketFuelOrb.png"]').attr("src", "http://i.imgur.com/3Fzcf1o.png");
//brew kit HD
$('[src*="redBrewingKitOrb.png"]').attr("src", "http://i.imgur.com/LwEuy0F.png");
//factory HD
$('[src*="redFactoryOrb.png"]').attr("src", "http://i.imgur.com/6Ihj80l.png");
//Any orb blue
$('img[src*="anyOrb.png"]').attr("src", "http://i.imgur.com/bHesFNn.png");
//Any orb Green
$('img[src*="anyOrb2.png"]').attr("src", "http://i.imgur.com/8BdpkWh.png");
//Any orb Red
$('img[src*="anyOrb3.png"]').attr("src", "http://i.imgur.com/zBGamro.png");

//planter
$('img[src*="images/crafting/planter.png"]').attr("src", "http://i.imgur.com/5Uvvn8P.png");
//trowel
$('img[src*="images/farming/trowel.png"]').attr("src", "http://i.imgur.com/9hAPHJb.png");

//orb of transformation size fix
$("#item-orbOfTransformation-box > img.item-box-img").height(70);
$("#item-superOrbOfTransformation-box > img.item-box-img").height(70);

//SD crystals WOOHOO!!!
$('[src*="smallStarDustCrystal.png"]').attr("src", "http://i.imgur.com/TrXUTSM.png");
$('[src*="mediumStarDustCrystal.png"]').attr("src", "http://i.imgur.com/gr9doC2.png");
$('[src*="largeStarDustCrystal.png"]').attr("src", "http://i.imgur.com/5UMiXKc.png");
$('[src*="hugeStarDustCrystal.png"]').attr("src", "http://i.imgur.com/l18D53b.png");
$('[src*="shootingStarCrystal.png"]').attr("src", "http://i.imgur.com/l18D53b.png");

//Oil
$('[src*="oil-status-bar.png"]').attr("src", "http://i.imgur.com/pUttkyh.png");

//minerals
//Sandstone
$('img[src*="sandstone.png"]').attr("src", "http://i.imgur.com/KnGrpuq.png");
//Stone
$('img[src*="images/stone.png"]').attr("src", "http://i.imgur.com/7RTnzIA.png");
//Copper
$('img[src*="copper.png"]').attr("src", "http://i.imgur.com/8F2i7Xn.png");
//Tin
$('img[src*="tin.png"]').attr("src", "http://i.imgur.com/X34BYgJ.png");
//Iron ***DOUBLE CHECK THIS ONE***
$('img[src*="iron.png"]').attr("src", "http://i.imgur.com/SgEOKgT.png");
//Silver
$('img[src*="silver.png"]').attr("src", "http://i.imgur.com/aqQxhNH.png");
//Gold
$('img[src*="gold.png"]').attr("src", "http://i.imgur.com/NBFezkU.png");
//Quartz
$('img[src*="quartz.png"]').attr("src", "http://i.imgur.com/JIXlvM6.png");
//Flint
$('img[src*="flint.png"]').attr("src", "http://i.imgur.com/Z3N5wkm.png");
//Marble **LOOKS PRETTY BAD AT FULL RES***
//$('img[src*="marble.png"]').attr("src", "http://i.imgur.com/tCXf4Qv.png");
//Titanium
$('img[src*="titanium.png"]').attr("src", "http://i.imgur.com/E2njpc3.png");
//Promethium
$('img[src*="promethium.png"]').attr("src", "http://i.imgur.com/LZWVcVH.png");
//Runite
$('img[src*="runite.png"]').attr("src", "http://i.imgur.com/Nij5e4X.png");
//Moonstone
$('img[src*="moonStone.png"]').attr("src", "http://i.imgur.com/xLgVGAX.png");
//Xmass sigil
$('img[src*="christmas2015.png"]').attr("src", "http://i.imgur.com/37tCozS.png");
//shooting star
$('img[src*="shootingStar.png"]').attr("src", "http://i.imgur.com/Ql4K0bf.png");
//Rocket fuel
$('img[src*="rocketFuel.png"]').attr("src", "http://i.imgur.com/6kn0Snz.png");
//dragonstone
$('img[src*="images/minerals/dragonstone.png"]').attr("src", "http://i.imgur.com/98n9MZJ.png");
//emerald
$('img[src*="emerald.png"]').attr("src", "http://i.imgur.com/fZf2OLg.png");

//***FARMING***
//planter
$('img[src*="images/crafting/planter.png"]').attr("src", "http://i.imgur.com/5Uvvn8P.png");
//trowel
$('img[src*="images/farming/trowel.png"]').attr("src", "http://i.imgur.com/9hAPHJb.png");
