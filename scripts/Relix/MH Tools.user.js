/*****************************************************************************/
// ==UserScript==
// @name			MH Tools
// @description		Enhance the HUD while playing Mousehunt
// @author			Dobi Doberman
// @eMail			doberman.dobi@gmail.com
//////////////////////////////////////////////////////////////////////////
// This program is free software: you can redistribute it and/or modify	//
// it under the terms of the GNU General Public License as published by	//
// the Free Software Foundation, either version 3 of the License, or	//
// (at your option) any later version.									//
//																		//
// This program is distributed in the hope that it will be useful,		//
// but WITHOUT ANY WARRANTY; without even the implied warranty of		//
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSEכ.  See the		//
// GNU General Public License for more details.							//
//																		//
// You should have received a copy of the GNU General Public License	//
// along with this program. If not, see <http://www.gnu.org/licenses/>.	//
//////////////////////////////////////////////////////////////////////////
// @include			http://www.mousehuntgame.com/*
// @include			https://www.mousehuntgame.com/*
// @grant			GM_setValue
// @grant			GM_getValue
// @grant			GM_notification
// @require			//ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js
// @require         //ajax.googleapis.com/ajax/libs/jqueryui/1.11.4/jquery-ui.min.js
// @version			1.513 - Sunken City charms Control fix
// @history			1.512 - Sunken City charms Control update and 2015 halloween
// @history			1.50 - New Sunken City charms update
// @history			1.49 - Firefox bugfix
// @history			1.48 - Festive Ice Fortress tweaks
// @history			1.47 - Festive Ice Fortress support for bonus zone
// @history			1.46 - Festive Ice Fortress support
// @history			1.45 - Hotfix
// @history			1.43 - Miscellaneous and some minor fixes
// @history			1.42 - Enhancments and some fixes for the new GUI of Mousehunt
// @history			1.41 - Miscellaneous
// @history			1.40 - Miscellaneous
// @history			1.39 - Miscellaneous
// @history			1.38 - Bugfixes
// @history			1.37 - Notifications
// @history			1.36 - Miscellaneous and Google Analytics
// @history			1.35 - Fix for tournaments time and some miscellaneous 
// @history			1.34 - Fix for New GUI
// @history			1.33 - Fix for Firefox
// @history			1.32 - Bugfixes
// @history			1.31 - Added support for local time for pending tourney and tournaments list
// @history			1.30 - Added support for the Haunted Terrortories
// @history			1.29 - Added support for the Burroughs Rift
// @history			1.28 - Fix for Firefox
// @history			1.27 - Sand Dollars & Predatory Proceddors loot popups
// @history			1.26 - The blinking version
// @history			1.25 - Fix for FB on linux
// @history			1.24 - Refresh Sand Dollar item count fix for FB
// @history			1.23 - Auto Refresh optimization
// @history			1.22 - PGL
// @history			1.21 - Refresh Sand Dollar item count optimization
// @history			1.20 - Minor fixes
// @history			1.19 - Fixed icons loading
// @history			1.18 - Fixed mixed content loading
// @history			1.17 - Added Sand Dollar item count to the left sidebar
// @history			1.16 - Added auto refresh when starting a dive. Fixed 'FutureZones' tooltip clipping if to big
// @history			1.15 - Added distance marks for 2k,10k,15k,25k
// @history			1.14 - Ruler design change when Jet/Anchor is active
// @history			1.13 - Added icons and formatting for 'Lair of the Ancients' & 'Magma Flow'
// @history			1.12 - Linux compatability
// @history			1.11 - Fixed Firefox compatability
// @history			1.10 - Added Firefox compatability
// @history			1.09 - Hot fix for auto updates of the script
// @history			1.08 - Hot fix
// @history			1.07 - Ruler re-design
// @history			1.06 - Some fixes
// @history			1.05 - Fine tuning and fixes
// @history			1.04 - Performance enhancements
// @history			1.03 - Added colors to future zones list, Ruler graphic changes
// @history			1.02 - Auto refresh when changing charms / going on a hunt
// @history			1.01 - Now shown only when hovering, Added icons to future zones list
// @history			1.00 - Initial release
// @namespace https://greasyfork.org/users/3385
// ==/UserScript==

/**************************    Globals & Defines   ***************************/
var DEBUG = true;

// Tournaments
var separateLocalTimeColumn = true;

// Tooltip
var TOOLTIP_TEXT_SIZE = 11;
var TOOLTIP_ICON_SIZE = 12;
var TOOLTIP_WIDTH = 165;
var MAX_ZONE_NAME_LENGTH = 20;
var IMPORTANT_MARKS = {2000	:'2,000m',
                       10000:'10,000m',
                       15000:'15,000m',
                       25000:'25,000m'};

// Ruler parameters
var MAX_RULER_SIZE = 420;
var INIT_RULER_HEIGHT = 10;
var RULER_MIN_HEIGHT = 3;
var RULER_LINE_WIDTH = 2;
var RULER_COLOR = '#EEEFFF';
var ROUNDED_RULER = true;
var USE_RULER_BACKGROUND = false;
var FIXED_RULER_HEIGHT = true;

// Icons parameters
var prefix = window.location.protocol;
var ICON_SOURCE_CORAL = prefix+ '//www.mousehuntgame.com/images/items/crafting_items/thumbnails/1a7897042ba8f3fa31fa6805404456d6.gif?cv=213';
var ICON_SOURCE_BARNACLE = prefix+ '//www.mousehuntgame.com/images/items/crafting_items/thumbnails/e12ed1306d81665278952d4b4349b495.gif?cv=213';
var ICON_SOURCE_SCALES = prefix+ '//www.mousehuntgame.com/images/items/crafting_items/thumbnails/4aaa6478c10308ac865507e4d7915b3c.gif?cv=213';
var ICON_SOURCE_SAND_DOLLAR = prefix+ '//www.mousehuntgame.com/images/items/stats/cdaa127de6d30681da50b4599366e202.gif?cv=213';
var ICON_SOURCE_PREDATORY_PROCESSOR = prefix+ '//www.mousehuntgame.com/images/items/crafting_items/thumbnails/f64b5f1f33e4d3d467f75b126e9252ea.gif?cv=213';
var ICON_SOURCE_ULTIMATE_CHARM = prefix+ '//www.mousehuntgame.com/images/items/trinkets/545876fd68dd7976dba669e2665278fd.gif?cv=216';
var ICON_SOURCE_BRINED_CURD = prefix+ '//www.mousehuntgame.com/images/items/crafting_items/thumbnails/8a1272307b56816daa77eaeb77169cd1.gif?cv=213';
var ICON_SOURCE_OXYGEN = prefix+ '//www.mousehuntgame.com/images/items/stats/1d6ad3b329b1eb44596ec3c48cf2fcc7.gif?cv=213';
var ICON_SOURCE_GOLDEN_ANCHOR = prefix+ '//www.mousehuntgame.com/images/items/trinkets/0ff60fbdcb829e5a6771f648fa4c9719.gif?cv=216';
var ICON_SOURCE_SPIKED_ANCHOR = prefix+ '//www.mousehuntgame.com/images/items/trinkets/eafcbaef0f9630c9f943a11d46102580.gif?cv=216';
var ICON_SOURCE_ULTIMATE_ANCHOR = prefix + '//www.mousehuntgame.com/images/items/trinkets/30cbfe008d3659bf3eb427b3aadea792.gif?cv=216';
var ICON_SOURCE_SMART_JET = prefix + '//www.mousehuntgame.com/images/items/trinkets/6b897c436ac61161d2234db23d480a75.gif?cv=216';
var ICON_SOURCE_TREASURE_TRAWLING = prefix + '//www.mousehuntgame.com/images/items/trinkets/c58137ad7445814514a644195b191ebc.gif?cv=216';
var ICON_SOURCE_OXYGEN_BURST = prefix + '//www.mousehuntgame.com/images/items/trinkets/e4bf3b52052b986d9a7707371b4ff541.gif?cv=216';

var SAND_DOLLARS_ITEM_TYPE = 'sand_dollar_stat_item';
var PREDATORY_PROCESSOR_ITEM_TYPE = 'predatory_processor_crafting_item';
var ULTIMATE_CHARM_ITEM_TYPE = 'ultimate_trinket';
var DAMAGED_CORAL_ITEM_TYPE = 'damaged_coral_crafting_item';
var MOUSE_SCALE_ITEM_TYPE = 'mouse_scale_crafting_item';
var BARNACLE_ITEM_TYPE = 'barnacle_crafting_item';
var ANCHOR_ITEM_TYPE = 'anchor_trinket';
var GOLDEN_ANCHOR_ITEM_TYPE = 'golden_anchor_trinket';
var SPIKED_ANCHOR_ITEM_TYPE = 'spiked_anchor_trinket'; 
var ULTIMATE_ANCHOR_ITEM_TYPE = 'ultimate_anchoring_trinket'; 
var SMART_JET_ITEM_TYPE = 'smart_water_jet_trinket';
var WATER_JET_ITEM_TYPE = 'water_jet_trinket';
var TREASURE_TRAWLING_ITEM_TYPE = 'treasure_trawling_trinket';
var OXYGEN_BURST_ITEM_TYPE = 'oxygen_burst_trinket';

// Defines
var REFRESH = 0;
var OK = 1;
var NOTOK = -1;
var notificationIcon = prefix+'//www.mousehuntgame.com/images/ui/elements/larryface.png';  // Larry
// http://mhwiki.hitgrab.com/wiki/images/mhwiki.gif // game icon

// Google Analytics
var gaTrackingId = 'UA-53565125-1';
var mousehuntTrackingId = 'UA-3123044-2';
var keepAliveInterval = 1 * 60 *1000;

var colors = {  
    "Shallow Shoals": "white",
    "Sea Floor": "white",
    "Murky Depths": "white",
    
    "Magma Flow": "gold"
};
 

/*************************        Privates        ****************************/
var NEW_GUI = false;
var isFirefox = navigator.userAgent.indexOf('Firefox') > -1;
var isLinux = navigator.platform.indexOf('Linux') > -1;
TOOLTIP_WIDTH += (10*isLinux);
MAX_ZONE_NAME_LENGTH -= isLinux;

var lastDitanceRefreshed = 0;
var lastJournalIdRefreshed = getLocalValue('lastJournalIdRefreshed');
if (typeof lastJournalIdRefreshed === 'undefined') lastJournalIdRefreshed = 0;
var lastRemainingRefreshed = Number.MAX_VALUE;
var refreshCount = 0;
var celebrationPopupCounter = 0;
var lock = 0;
var lastSunkenCityCharmsQuantity = [];
var lastSunkenCitySideTitle;
var sunkenCharmsAutoHide = true;

var lastRemainingHuntsInActiveWave = Number.MAX_VALUE;

var caraftingItemsBlinkingColor = 'lightgreen';
var caraftingItemsQuantityColor = 'black';

var journalObserver = null;
var journalObserverConfig = { subtree:true, childList: true};
var activeObserver = null;
var activeObserverConfig = { attributes: true};
var distanceObserver = null;
var distanceObserverConfig = { childList: true};
var charmsObserver = null;
var ObserverConfigAll = { subtree:true, attributes: true, childList: true, characterData: true};
var craftingItemsObserver = null;
var craftingItemsObserverConfig = { subtree:true, childList: true};
var locationObserver = null;
var locationObserverConfig = { childList: true}; 
var mistQuantityObserver = null;
var mistQuantityObserverConfig = { childList: true};

var hauntedProgressObserver = null;
var hauntedProgressObserverConfig = { subtree:true, childList: true};
var festiveIceFortressProgressObserver = null;
var festiveIceFortressProgressObserverConfig = { subtree:true, childList: true};


/******************            Misc section	           ***********************/

function initGUIMode(){
    var hudstatlist = document.getElementsByClassName('hudstatlist')[0];
    
    if (!hudstatlist){
        hudstatlist = document.getElementsByClassName('mousehuntHud-userStatBar')[0];
        NEW_GUI = true;
    }
    
    if (DEBUG) printToConsole('NEW_GUI = ' + NEW_GUI);
}
function initAnalytics(){
    _gaq = window._gaq || [];
    
    (function(){
        var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
        ga.src = 'https://ssl.google-analytics.com/ga.js';
        var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
    })();
    
    sendExtensionLoadedEvent();
    gaPush('_trackPageview');
    
    if (DEBUG) printToConsole('init GA');
}
function setLastGAEventTime(){
    var now = new Date().getTime();
    setLocalValue('lastGAEventTime', now);
}
function sendExtensionLoadedEvent(){
    var lastGAEventTime = parseInt(getLocalValue('lastGAEventTime'), 10);
    var now = new Date().getTime();
    if (now - keepAliveInterval > lastGAEventTime){
        if (typeof GM_info != 'undefined'){
            var version = GM_info.script.version.match(/[0-9,.]+/);
            gaPush('_trackEvent', 'Extension', 'Extension loaded', 'v.'+version);
        }
    }
}
function gaPush(command, category, action, value){
    
    // Save the current GA account inorder to restore it back later
    if (_gaq && _gaq._getAsyncTracker){
        var a = _gaq._getAsyncTracker();
        if (a !== 'undefined'){
            mousehuntTrackingId = a._getAccount();
        }
    }
    
    _gaq.push(
        ['_setAccount', gaTrackingId],			// set my GA account
        [command, category, action, value],
        ['_setAccount', mousehuntTrackingId]	// restore original GA account
    );
    
    if (command == '_trackEvent')
        setLastGAEventTime();
}
function injectStyleRuleToHeadElement(rule) {
	$("<style>", {
	type:"text/css",
	html: rule ,
	}).appendTo("head");
}
function removeElementIfExist(parentElement, elementName){
    var toClean = parentElement.getElementsByClassName(elementName);
    for (var i=0; i < toClean.length; i++) {
        toClean[i].remove();
    }
}
function printToConsole(text){
    var t = new Date();
    var h = t.getHours();
    var m = t.getMinutes();
    if (m<10)
        m = '0'+m;
    var s = t.getSeconds();
    if (s<10)
        s = '0'+s;
    
    console.log(h +':'+ m + ':' + s +'|MH Tools: ' + text);
}

function getVersionDescription(){
    var res = '';
    if (typeof GM_info != 'undefined'){
        var version = GM_info.script.version.match(/[0-9,.]+/);
        var meta = GM_info.script.header;
        var lineStartIndex = meta.indexOf(version);
        var startIndex = lineStartIndex + version.length + 6;
        var endIndex = meta.indexOf('\n',lineStartIndex);
        res = meta.substring(startIndex, endIndex);
    }
    return res;
}
function versionCheck(){
	if (isFirefox)
        return;
        
	if (typeof GM_info == 'undefined')
	    return;
	
    var version = GM_info.script.version.match(/[0-9,.]+/);
    var versionDescription = getVersionDescription();
    var meta = GM_info.script.header;
    var curVersion = getLocalValue('MHToolsVersion');
    if (!curVersion){
        // first install
        printToConsole('/*****    First run v.' + version + '    ******/');
        gaPush('_trackEvent', 'Installations', 'Install', 'v.'+version);
        if (!isFirefox)
            GM_notification("You've just installed version " + version, "Welcome to MH Tools!", 
                            notificationIcon, function() {/*do something here*/});
    } else if(parseFloat(version) > parseFloat(curVersion)){
        // updated
        printToConsole('/*****    Updated to v.' + version + '    ******/');
        gaPush('_trackEvent', 'Updates', 'Script updated', 'v.'+curVersion + ' -> v.'+version);
        if (!isFirefox){
            GM_notification("You've just updated to version " + version, "Welcome back to MH Tools! \n" + versionDescription, 
                            notificationIcon, function() {/*do something here*/});
        }
    } else {
        printToConsole('/*****    Started v.' + version + ' - ' + versionDescription + '    ******/');
        // gaPush('_trackEvent', 'Extension', 'Extension loaded', 'v.'+version);
    }
    
    // set the version
    setLocalValue('MHToolsVersion', version);
}
function getLocalValue(key){
    if (typeof GM_getValue != 'undefined')
        return GM_getValue(key);
    else if(localStorage)
        return localStorage[key];
}
function setLocalValue(key, value){
    if (typeof GM_setValue != 'undefined')
        GM_setValue(key, value);
    else if(localStorage)
        localStorage[key] = value;
}
function isFacebook(){
    if (typeof SocialFramework != 'undefined'){
        return SocialFramework.isFacebook();
    }
    
    if (typeof window.SocialFramework != 'undefined'){
        return window.SocialFramework.isFacebook();
    }
    
    return (window.location.href.indexOf('canvas') > -1);
}
function getLocation(){
    var res, tmp;
    
    if (typeof user != 'undefined' && user){
		res = user.location;
    } else if (isFirefox && typeof unsafeWindow.user != 'undefined' && unsafeWindow.user){
        res = unsafeWindow.user.location;
	}
	
	if (typeof res == 'undefined' || res ===''){
		if (NEW_GUI){
			tmp = document.getElementsByClassName('mousehuntHud-environmentName')[0];
			if (tmp)
				res = tmp.innerHTML;
		} else {
			tmp = document.getElementById('hud_location');
			if (tmp){
				tmp = tmp.innerHTML.match(/>[a-zA-Z .]+</)[0];
				// TODO
				// Remove leading '>' and trailing '<'
				res = tmp.substring(1,tmp.length-1);
			}
		}
	}
    return res;// .substring(0,14) ;
}
function isInLocation(location){
    return getLocation().indexOf(location.substring(0,14)) > -1;
}
function getActiveCharm(){
    var tmp;
    var res = 'No Charm';
    if (typeof user != 'undefined' && user !== null){
        res = user.trinket_name;
        if (res === null) res = 'No Charm';
    } else if (isFirefox && typeof unsafeWindow.user != 'undefined' && unsafeWindow.user != null){
        res = unsafeWindow.user.trinket_name;
        if (res === null) res = 'No Charm';
    } 
    
    if (typeof res == 'undefined' || res === null || res === ''){
        if (NEW_GUI){
            res = $('.mousehuntHud-userStat.trinket .label').text();
        } else {
            tmp = document.getElementById('hud_trapPower');
            if (tmp)
                res = tmp.innerHTML;
        }
    }
	
    if (typeof res =='undefined' || res === null || res === '') 
        res = 'No Charm';
    
    return res;
}
function parseManualGetItemCountResponse(response){
    var res = '';
    var tmp = ',"quantity":';
    var index = response.indexOf(tmp)+tmp.length;

    var ch = response.charAt(index);

    while (ch != ','){
        res += ch;
        index++;
        ch = response.charAt(index);
    }
    
    res = parseInt(res,10);
    
    return res;
}
function handleHGUserError(itemType, cb){
    var sn = isFacebook() ? 'Facebook' : 'Hitgrab';
    var url = window.location.protocol + '//www.mousehuntgame.com/managers/ajax/users/userInventory.php?sn=' + sn +
        '&hg_is_ajax=1&item_types%5B%5D='+ itemType +'&action=get_items&uh=yr5tlb0D';

    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = 
        function(){
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            var q = parseManualGetItemCountResponse(xmlHttp.responseText);
            if (DEBUG) printToConsole(itemType + ' quantity = ' + q + ' (manual)');
            cb(q);
        }
    };
    xmlHttp.open( "GET", url, true );
    xmlHttp.send( null );
}
function getLocalHg(){
    var localHG;
    if (isFirefox && typeof unsafeWindow.hg != 'undefined') {
        localHG = unsafeWindow.hg;
	} else if (typeof hg != 'undefined') {
        localHG = hg;
	}
        
    return localHG;
}
function getItemTypeCount(itemType, cb){
    var localHG = getLocalHg();
    
    if (typeof localHG != 'undefined' && localHG){
        try{
            localHG.utils.UserInventory.getItem(
                itemType,
                // success
                function(item){
                    if (DEBUG) printToConsole('(HG) '+itemType + ' quantity = ' + item.quantity);
                    cb(item.quantity);
                },
                // onerror
                function(){
                    return -1;
                }
            );
            return;
        } catch (err){
            if (DEBUG) printToConsole('Can\'t get item count from hgUtil('+err+'). Retriving...');            
            handleHGUserError(itemType, cb);
        }
    } else {
		if (DEBUG) printToConsole('No hgUtil. Retriving...');            
		handleHGUserError(itemType, cb);
	}
}

function checkAndUpdateIfTraveledLocation(location){
	var curLocation = getLocalValue('mousehuntLocation');
    if(curLocation && location !== curLocation){
        if (DEBUG) printToConsole('Traveled from \'' + getLocalValue('mousehuntLocation') + '\' to \'' + location + '\'');
        
        gaPush('_trackEvent', 'Gameplay', 'Traveled', location);
        
        setLocalValue('mousehuntLocation', location);
        refreshLocation(location);
    }
}
function handleLocationMutation(mutations){
    if (getLocalValue('mousehuntLocation')){
        var newLocation = getLocation();
        checkAndUpdateIfTraveledLocation(newLocation);
    }
}
function enableLocationObserver(){
    
    var locationNode;    
    if (NEW_GUI)
        locationNode = document.getElementsByClassName('mousehuntHud-environmentName')[0];
    else
        locationNode = document.getElementById('hud_location');
    
    if (locationNode){
        locationObserver = new MutationObserver(handleLocationMutation);
        locationObserver.observe(locationNode, locationObserverConfig);
    }
    
    var newLocation = getLocation();
	if (location)
		checkAndUpdateIfTraveledLocation(newLocation);
}
function refreshLocation(location){
    
    if (location === null || typeof location == 'undefined'){
        printToConsole('No location given. location=' + location);
        location = getLocation();
    }
    
	if (location === null || typeof location == 'undefined'){
		printToConsole('No location... :(');
		return;
		//window.setTimeout(refreshLocation, 100);
	}
	
    printToConsole('In ' + location);
    if(location == 'Sunken City') {
        // In Sunken City
        
        // Add Sand Dollars count to the left sidebar
        addSandDollarItemCount();
        caraftingItemsBlinkingColor = 'yellow';
        caraftingItemsQuantityColor = 'white';
        
        var sideTitleElement = document.getElementsByClassName('sidebarTitle')[0];
        var sideTitle = sideTitleElement.innerHTML;
        sideTitleElement.addEventListener("DOMNodeRemoved", onSideTitleEvent, false);
        
        lastSunkenCitySideTitle = sideTitle;
        if (sideTitle != 'docked') {
            activateSunkenCityDiving();
        } else {
        	deactivateSunkenCityDiving();
        }        
    } else if (location == 'Labyrinth'){
        var hallwayPadding = document.getElementsByClassName('labyrinthHUD-hallway-padding')[0];
        if (hallwayPadding){
            var hallwayPaddingObserver = new MutationObserver(handleHallwayProgress);
            hallwayPaddingObserver.observe(hallwayPadding, ObserverConfigAll );
        }
        
        updateLabyrinthHUD();
    } else if (location == 'Burroughs Rift'){
        // In Burroughs Rift
        var mistQuantity = document.getElementsByClassName('mistQuantity')[0];
        if (mistQuantity){
            var mistQuantityObserver = new MutationObserver(handleMistQuantityMutations);
            mistQuantityObserver.observe(mistQuantity, mistQuantityObserverConfig);
        }
        enlargeAndModifyMistCount();
    } else if (location == 'Fungal Cavern'){
        // Attach blink text to crafting items count changes (craftingItemsObserver)
        var craftingItems = document.getElementsByClassName('fungalCavernHUD-craftingItemContainer')[0];
        
        if (craftingItems) {
            craftingItemsObserver = new MutationObserver(handleCraftingItemsMutations);
            craftingItemsObserver.observe(craftingItems, craftingItemsObserverConfig);
        }
    } else if (location == 'Haunted Terrortories'){
        // In Haunted Terrortories
        var stage = document.getElementsByClassName('halloweenHud-progress-container')[0];
        
        if (stage){
            var hauntedProgressObserver = new MutationObserver(handleHauntedProgressMutations);
            hauntedProgressObserver.observe(stage, hauntedProgressObserverConfig);
        }
        
        showLeftHuntsInStage();    
    } else if (location == 'Festive Ice'){
        // In Festive Ice Fortress
        var festiveIceFortressProgressObserver = new MutationObserver(handleFestiveIceFortressProgressMutations);
        
        var waveProgress = document.getElementsByClassName('waveProgress');
        
        for (var i=0 ; i < waveProgress.length ; i++){
        	festiveIceFortressProgressObserver.observe(waveProgress[i], festiveIceFortressProgressObserverConfig);
        }
        
        updateRemainingHuntsInActiveWave();
    }
}

function celebrationPopup(iconSource, header, text){
    var campRight, top;
    if (NEW_GUI){
        campRight = document.getElementsByClassName('campPage-tabs')[0];
        top = '33px';
    } else {
        campRight = document.getElementsByClassName('campRight')[0];
        top = '370px';
    }
    
    var popup = document.createElement('div');
    campRight.appendChild(popup);
    celebrationPopupCounter++;
    popup.outerHTML =	
        '<div id="OnboardArrow" class="celebrationPopup firstCatch left celebrationPopup'+ celebrationPopupCounter+
            '" style="top: '+ top +'; left: 90px;background: url(\'https://www.mousehuntgame.com/images/ui/backgrounds/infoArrow_left.png\') 0 0 no-repeat;">'+
            '<div class="onboardArrow prefix onboardPopup firstCatch" style="">'+
                '<div class="onboardArrow suffix">'+
                    '<div class="onboardArrow content" style=" padding-top: 30px; padding-left: 90px; width: 175px;">'+
                        '<div class="introPopupContent">'+
                            '<h2 style="text-align:center ;font-weight: bold;text-shadow: -1px -1px 4px grey;font-size: large;">'+header+'</h2>'+
                            '<div style="text-align: center">'+text+
                                '<div class="clear-block">'+
                                    '<img src="'+iconSource+'" style="width: 55px;float: none;">'+
                                '</div>'+
                            '</div>'+
                        '</div>'+
                    '</div>'+
                '</div>'+
                '<a onclick="{var OnboardArrow = document.getElementsByClassName(\'celebrationPopup'+celebrationPopupCounter+'\')[0];OnboardArrow.remove();}" class="closeButton">'+
                    '<span class="closeArrow"></span>'+
                '</a>'+
            '</div>'+
        '</div>';
    
    $('.celebrationPopup'+celebrationPopupCounter).hide();
    $('.celebrationPopup'+celebrationPopupCounter).slideDown(250);
}
function getHornButton(){
	var hornbutton, res;
	
	if (NEW_GUI)
		hornbutton = document.getElementsByClassName('mousehuntHud-huntersHorn-container')[0];
	else 
		hornbutton = document.getElementsByClassName('hornbutton')[0];
    
	if (typeof hornbutton != 'undefined')
		res = hornbutton.firstChild;
	
	return res;
}
function handleHornSound(event){
    // Handle Tournament points entries
    if (DEBUG) printToConsole('Sounded the horn');            
    gaPush('_trackEvent', 'Gameplay', 'Sounded the horn');
    setLocalValue('lastKeepAlive', new Date().getTime());
}
function enableHornSoundObserver(){
    // Attach handleHornSound to DOM changes
    var b = getHornButton();
	if (typeof b != 'undefined')
		b.addEventListener('click', handleHornSound);
}

//***************         End Misc section	        *******************/


/******************         Sunken City section        ***********************/
// Modifiers
function addSandDollarItemCount(){
    
    var craftingItems = document.getElementsByClassName("craftingItems")[0];
	if (craftingItems.getElementsByClassName('quantity sandDollar')[0]){
		return ;
	}
    craftingItems.style.paddingTop = '1px';
    craftingItems.style.paddingBottom = '3px';	
    
    craftingItems.innerHTML += '<a href="#" onclick="window.hg.views.ItemView.show(\'sand_dollar_stat_item\'); return false;" >'+
        '<img src="'+ICON_SOURCE_SAND_DOLLAR+'"><span class="item quantity sandDollar" '+
        'data-item-type="sand_dollar_stat_item"></span><div class="toolTip">'+
        '<b>Sand Dollars</b><br>The Sunken City currency!<div class="arrow"><span></span></div></div>';
    
    var paddingSize = parseInt(craftingItems.style.paddingTop,10)+parseInt(craftingItems.style.paddingBottom,10);
    var newHeight =  (craftingItems.clientHeight-paddingSize)/craftingItems.children.length+'px';
    
    for (var i = 0; i < craftingItems.children.length; i++) {
        craftingItems.children[i].style.lineHeight = newHeight;
    }
    
    getItemTypeCount(SAND_DOLLARS_ITEM_TYPE, updateSandDollarsItemCount);
}
function updateSandDollarsItemCount(sandDollarCount){
    var countElement = document.getElementsByClassName('item quantity sandDollar')[0];
    
    if (typeof sandDollarCount == 'undefined'  || sandDollarCount === null){
        getItemTypeCount(SAND_DOLLARS_ITEM_TYPE, updateSandDollarsItemCount);
        return;
    }
    
    if (sandDollarCount == -1){
        console.log('ERROR updateSandDollarsItemCount');
        return;
    }
    
    var newSandDollarCount = parseInt(sandDollarCount.toString().replace(/[,]/g, ""),10);
    var oldSandDollarCount = parseInt(countElement.innerHTML.replace(/[,]/g, ""),10);
    
    if (newSandDollarCount != oldSandDollarCount){
        var color;
        if (newSandDollarCount < oldSandDollarCount){
            color = 'red';
        } else { // newSandDollarCount > oldSandDollarCount)
            color = caraftingItemsBlinkingColor;
        }
        
        countElement.innerHTML = newSandDollarCount.toLocaleString();
        blinkText(countElement, color, caraftingItemsQuantityColor ,7);
        updateSunkenCharmsTooltipLeft();    
    }
}
function addSunkenCityCharmControl(title, desc, charmType, icnSrc, before){
	var charmElement = $('.charm[data-item-type=\''+charmType+'\']')[0];
	if (charmElement){
		console.log(charmType + ' already exists');
		return;
	}
		
    var newControl = document.createElement('a');
    newControl.href = '#';
    newControl.className = 'charm';
    newControl.setAttribute('data-item-type', charmType);
    newControl.setAttribute('data-item-classification','trinket');
    newControl.title = title;
    //newControl.setAttribute('onclick',
      //  "app.views.HeadsUpDisplayView.hud.sunkenCityArmItem(this); return false;");
    
    newControl.innerHTML = 
            '<div class="clear-block">'+
                '<div class="itemImage">'+
                    '<img src="'+icnSrc+'"></div>'+
                    '<div class="item quantity" data-item-type="'+charmType+'">' +
                        // getItemTypeCount(charmItemType) will update this later
                    '</div>'+
                '</div>'+
                '<div class="toolTip">'+
                    '<b>'+ title +'</b>'+
                    '<br>' + desc +
                '<div class="arrow"><span></span></div>'+
            '</div>';
    
    $(newControl).insertAfter(before);
}
function updateSunkenCityCharm(charmItemType, q){
    if (q === null || typeof q == 'undefined'){
        getItemTypeCount(charmItemType, 
            function(quantity){
                updateSunkenCityCharm(charmItemType, quantity);
            });
        return;
    }
    
    if (DEBUG) printToConsole('Updating Sunken City Charm: ' + charmItemType);
    
    var charmElement = $('.charm[data-item-type=\''+charmItemType+'\']')[0];
    $(charmElement).find('.quantity').text(q);

    if (q === 0){
        $(charmElement).addClass('disabled');
         if (sunkenCharmsAutoHide && !$(".sunkenCharms").is(':hover')) {
             $(charmElement).hide('fold',{'size':'0px','horizFirst':true});
         }
    } else {
        $(charmElement).removeClass('disabled');
        if (!sunkenCharmsAutoHide || $(".sunkenCharms").is(':hover')) {
             $(charmElement).show('fold',{'size':'0px','horizFirst':true});
        }
    }
    
    updateSunkenCharmsTooltipRight();
    blinkSunkenCityCharmIfNeeded(charmItemType);
}
function initLastSunkenCityCharmsQuantity(){
    var charmElement;
    charmElement = $('.charm[data-item-type=\''+ANCHOR_ITEM_TYPE+'\'] .quantity')[0];
    lastSunkenCityCharmsQuantity[ANCHOR_ITEM_TYPE] = parseInt(charmElement.textContent, 10);
    
    charmElement = $('.charm[data-item-type=\''+WATER_JET_ITEM_TYPE+'\'] .quantity')[0];
    lastSunkenCityCharmsQuantity[WATER_JET_ITEM_TYPE] = parseInt(charmElement.textContent, 10);
}
function setActiveSunkenCharm(){
    var activeCharm = getActiveCharm();
    if (activeCharm === ''){
        console.log('activeCharm = ' + activeCharm);
    }
    
    if (typeof activeCharm != 'undefined' && activeCharm !== null){
        
        if (activeCharm.toLowerCase().indexOf('ultimate anch') > -1 ){
            $('.charm[data-item-type=\''+ULTIMATE_ANCHOR_ITEM_TYPE+'\']').addClass('active');
        } else {
            $('.charm[data-item-type=\''+ULTIMATE_ANCHOR_ITEM_TYPE+'\']').removeClass('active');
        }
        
        if (activeCharm.toLowerCase().indexOf('spiked') > -1 ){
            $('.charm[data-item-type=\''+SPIKED_ANCHOR_ITEM_TYPE+'\']').addClass('active');
        } else {
            $('.charm[data-item-type=\''+SPIKED_ANCHOR_ITEM_TYPE+'\']').removeClass('active');
        }
        
        if (activeCharm.toLowerCase().indexOf('golden') > -1 ){
            $('.charm[data-item-type=\''+GOLDEN_ANCHOR_ITEM_TYPE+'\']').addClass('active');
        } else {
            $('.charm[data-item-type=\''+GOLDEN_ANCHOR_ITEM_TYPE+'\']').removeClass('active');
        }
        
        if (activeCharm.toLowerCase().indexOf('smart') > -1 ){
            $('.charm[data-item-type=\''+SMART_JET_ITEM_TYPE+'\']').addClass('active');
        } else {
            $('.charm[data-item-type=\''+SMART_JET_ITEM_TYPE+'\']').removeClass('active');
        }
        
        if (activeCharm.toLowerCase().indexOf('treasure') > -1 ){
            $('.charm[data-item-type=\''+TREASURE_TRAWLING_ITEM_TYPE+'\']').addClass('active');
        } else {
            $('.charm[data-item-type=\''+TREASURE_TRAWLING_ITEM_TYPE+'\']').removeClass('active');
        }
        
        if (activeCharm.toLowerCase().indexOf('oxygen') > -1 ){
            $('.charm[data-item-type=\''+OXYGEN_BURST_ITEM_TYPE+'\']').addClass('active');
        } else {
            $('.charm[data-item-type=\''+OXYGEN_BURST_ITEM_TYPE+'\']').removeClass('active');
        }
    }
}
function hideDisabledCharms(){
    $('.sunkenCharms .charm.disabled').hide('fold',{'size':'0px','horizFirst':true}); 
}
function showSunkenCityCharms(){
    $('.sunkenCharms .charm:not(.disabled)').show('fold',{'size':'0px','horizFirst':true});
    $('.sunkenCharms .charm .quantity').show('fold',{'size':'0px','horizFirst':true});
}
function hideNotActiveSunkenCityCharms(){
    $('.sunkenCharms .charm:not(.active)').hide('fold',{'size':'0px','horizFirst':true});
    
    // In case of no active charm
    if ($('.sunkenCharms .charm.active').length === 0){
        $($('.sunkenCharms .charm')[0]).show('fold',{'size':'0px','horizFirst':true});
    } else {
        $('.sunkenCharms .charm.active').show('fold',{'size':'0px','horizFirst':true});    
    }
    
    //$('.sunkenCharms .charm .quantity').hide('fold',{'size':'0px','horizFirst':true});
}
function updateSunkenCharmsTooltipRight(){
    var toolTipRight = parseInt($('.sunkenCityHud .sunkenCharms .charm').css('width'),10) - 45;
    $('.sunkenCityHud .sunkenCharms a .toolTip').css('right', toolTipRight + 'px');
}
function updateSunkenCharmsTooltipLeft(){
    var toolTipLeft = parseInt($('.sunkenCityHud .leftSidebar').css('width'),10) + 5;
    $('.sunkenCityHud .leftSidebar .toolTip').css('left', toolTipLeft + 'px');
}

function enableSunkenCharmsAutoHide(){
    $(".sunkenCharms").hover(showSunkenCityCharms,hideNotActiveSunkenCityCharms);
    sunkenCharmsAutoHide = true;
    //hideNotActiveSunkenCityCharms();
}
function disableSunkenCharmsAutoHide(){
    $(".sunkenCharms").unbind('mouseenter mouseleave');
    sunkenCharmsAutoHide = false;
    showSunkenCityCharms();
}
function updateSunkenCityCharmsDisplay(){
    if (DEBUG) printToConsole('updateSunkenCityCharmsDisplay');
    
    // update active charm
    setActiveSunkenCharm();
    hideDisabledCharms();
    
    // update quantities
    updateSunkenCityCharm(ULTIMATE_ANCHOR_ITEM_TYPE);
    updateSunkenCityCharm(SPIKED_ANCHOR_ITEM_TYPE);
    updateSunkenCityCharm(GOLDEN_ANCHOR_ITEM_TYPE);
    updateSunkenCityCharm(SMART_JET_ITEM_TYPE);
    updateSunkenCityCharm(TREASURE_TRAWLING_ITEM_TYPE);
    updateSunkenCityCharm(OXYGEN_BURST_ITEM_TYPE);
    
    if (sunkenCharmsAutoHide && !$(".sunkenCharms").is(':hover')) {
        hideNotActiveSunkenCityCharms();
    } else {
        showSunkenCityCharms();
    }
    
    // Check if any change to Anchor and Jet charms
    blinkSunkenCityCharmsIfNeeded();
}
function modifySunkenCityCss(){
    injectStyleRuleToHeadElement(
        '.sunkenCityHud .sunkenCharms {' + 
            'top: auto;'+
            'bottom: 0;'+
            'height: auto;'+
            'z-index: 50;'+
            'margin-right: 2px;'+
        '}');
        
    injectStyleRuleToHeadElement(
        '.sunkenCityHud .sunkenCharms a {'+
            '-webkit-border-radius: 5px 5px 1px 1px;'+
            '-moz-border-radius: 5px 5px 1px 1px;'+
            'border-radius: 5px 5px 1px 1px;'+
            'padding: 0;'+
            'margin-bottom: 0px;'+
            'margin-left: 1px;'+
            'box-shadow: 0px 0px 2px rgba(255, 255, 255, 0.5) inset;'+
            'float: left;'+
            'min-width: 26px;'+
        '}');
        
    injectStyleRuleToHeadElement(
        '.sunkenCityHud .sunkenCharms a.active {'+
            'background-color: black;'+
            'margin-left: 1px;'+
            //'box-shadow: 20px 1px 5px rgba(255, 222, 0, 0.5) inset;'+
        '}');
    
    injectStyleRuleToHeadElement(
        '.sunkenCityHud .sunkenCharms a .clear-block {'+
            'padding-top: 3px;'+
            //'box-shadow: 0px 0px 2px rgba(255, 255, 255, 0.3) inset;'+
            '-webkit-border-radius: 5px 5px 1px 1px;'+
            '-moz-border-radius: 5px 5px 1px 1px;'+
            'border-radius: 5px 5px 1px 1px;'+
        '}');
        
    injectStyleRuleToHeadElement(
        '.sunkenCityHud .sunkenCharms a.active .clear-block {'+
            //'box-shadow: 0px 0px 5px rgba(128, 111, 0, 1) inset;'+
            'box-shadow: 0px 0px 5px rgba(255, 238, 124, 1) inset;'+
//            '-webkit-border-radius: 5px 5px 1px 1px;'+
  //          '-moz-border-radius: 5px 5px 1px 1px;'+
    //        'border-radius: 5px 5px 1px 1px;'+
            //'-webkit-transition: 0.3s cubic-bezier(0, 0, 0.2, 1);'+
        '}');
    
    injectStyleRuleToHeadElement(
        '.sunkenCityHud .sunkenCharms a .quantity {'+
            'text-align: center;'+
            //'margin-left: 20px;'+
            'padding-right: 2px;'+
            'padding-left: 2px;'+
            'margin-left: 0px;'+
        '}');
        
    injectStyleRuleToHeadElement(
        '.sunkenCityHud .sunkenCharms a.active .quantity {'+
            //'box-shadow: 0px -2px 1px rgba(255, 255, 255, 0.3) inset;'+
        '}');
        
        
    injectStyleRuleToHeadElement(
        '.sunkenCityHud .sunkenCharms a.active .itemImage{'+
            '-webkit-transform: scale(1.1);'+
            //'height: 18px;'+
            //'width: 18px;'+
            //'margin-left: -5px;'+
            'box-shadow: 0px 0 3px white;'+
        '}');
        
    injectStyleRuleToHeadElement(
        '.sunkenCityHud .sunkenCharms a .itemImage img {'+
            //'margin: 2px;'+
            //'height: 16px;'+
            //'width: 16px;'+
            'border-radius: 3px;' +
        '}');
        
    injectStyleRuleToHeadElement(
        '.sunkenCityHud .sunkenCharms a .itemImage {'+
            '-webkit-border-radius: 3px;'+
            '-moz-border-radius: 3px;'+
            'border-radius: 3px;' +
            'float: none;'+
            'margin: auto;'+
        '}');
        
    
    injectStyleRuleToHeadElement(
        '.sunkenCityHud .sunkenCharms .armNow {'+
            //'top: 2px;'+
            //'margin-bottom: 2px;'+
            //'left: 20px;'+
            //'position: relative;'+
            'float: right;'+
        '}');
        
    injectStyleRuleToHeadElement(
        '.sunkenCityHud .sunkenCharms a .toolTip {'+
            'bottom: 50px;'+
            'top: auto;'+
            'display: none!important;'+
            'padding-left: 60px;'+
            'width: 135px;'+
        '}');
        
    injectStyleRuleToHeadElement(
        '.sunkenCityHud .leftSidebar a .toolTip {'+
            'padding-left: 60px;'+
            'height: 45px;'+
        '}');
    
    injectStyleRuleToHeadElement(
        '.sunkenCityHud .leftSidebar .craftingItems a .toolTip {' + 
            'top: -15px;' +
        '}');
    
    injectStyleRuleToHeadElement(
        '.sunkenCityHud .leftSidebar .craftingItems a .toolTip .arrow {' + 
            'top: 15px;' +
        '}');
        
    injectStyleRuleToHeadElement(
        '.sunkenCityHud .leftSidebar .craftingItems a .toolTip img {'+
            'position: absolute;'+
            'width: 50px;'+
            'height: 50px;'+
            'left: 5px;'+
            'top: 0;'+
            'bottom: 0;'+
            'margin: auto;'+
        '}');
    
    injectStyleRuleToHeadElement(
        '.sunkenCityHud .sunkenCharms a .toolTip img {'+
            'position: absolute;'+
            'width: 50px;'+
            'height: 50px;'+
            'left: 5px;'+
            'top: 0;'+
            'bottom: 0;'+
            'margin: auto;'+
        '}');
    
    injectStyleRuleToHeadElement(
        '.sunkenCityHud .sunkenCharms a:hover .toolTip {'+
            'display: block!important;'+
        '}');
        
    injectStyleRuleToHeadElement(        
        '.sunkenCityHud .sunkenCharms a .toolTip .arrow {'+
            'right: 20px;'+
            'top: auto;'+
            'bottom: -24px;'+
            'border-color: #000 transparent transparent transparent;'+
        '}');
        
    injectStyleRuleToHeadElement(        
        '.sunkenCityHud .sunkenCharms a .toolTip .arrow span {'+
            'right: -11px;'+
            'top: -14px;'+
            'border-color: #FFF transparent transparent transparent;'+
        '}');
    
}
function addCharmIconsToTooltips(tooltipParents){	
    $(tooltipParents).each(
        function(){ 
			var tooltipImgElement = $(this).find('.toolTip img')[0];
			if (tooltipImgElement)
				return;
            var icon = $(this).find('img').attr('src').substr(); 
            $('<img>',{src:icon}).appendTo($(this).find('.toolTip'));
        });
}
function modifyArmNowElements(){
    // Remove all 'arm' elements 
    $('.sunkenCharms .armNow').remove();
    $("<br>").appendTo($('.sunkenCityHud .sunkenCharms a .toolTip'));
    
    // Place them in new place with onclick arming/disarming function
    $("<div>", {
        'class': 'armNow' ,
        'onclick':
            // catch click events from bubbling
            'if (event.stopPropagation) {'+
                'event.stopPropagation();'+
            '}'+
            // get the charm element
            'var charmElement = $(this).closest(\'.charm\');'+
            'if ($(charmElement).hasClass(\'disabled\')){'+
                'return false;'+
            '}'+
            // check if need to arm it or disable
            'var itemType = $(charmElement).attr(\'data-item-type\');'+
            'if ($(charmElement).hasClass(\'active\')){'+
                'window.hg.utils.TrapControl.disarmTrinket();'+
            '} else {'+
                'window.hg.utils.TrapControl.setTrinket(itemType);'+
            '}'+
            'window.hg.utils.TrapControl.go();'+
            'return false;' ,
    }).appendTo($('.sunkenCityHud .sunkenCharms a .toolTip'));
}
function modifySunkenCharmsControlsOnclick(){
    // remove from father element 'a'
    $('.sunkenCharms a.charm').attr('onclick','');
    
    // add to the child element
    $('.sunkenCharms a.charm').attr('onclick',
            'hg.views.ItemView.show($(this).attr(\'data-item-type\')); return false;');
}
function modifySunkenCityCharmsDisplay(){
    
	modifySunkenCityCss();
    // Add new controls for new charms
    var beforeElement = $('.charm[data-item-type=\''+ANCHOR_ITEM_TYPE+'\']');
    addSunkenCityCharmControl("Ultimate Anchor Charms", 'Catch the very next mouse you encounter - guaranteed!', ULTIMATE_ANCHOR_ITEM_TYPE, ICON_SOURCE_ULTIMATE_ANCHOR, beforeElement);
    addSunkenCityCharmControl("Golden Anchor Charms", 'Slow down your sub and find an EXTRA Sand Dollar!', GOLDEN_ANCHOR_ITEM_TYPE, ICON_SOURCE_GOLDEN_ANCHOR, beforeElement);
    addSunkenCityCharmControl("Spiked Anchor Charms", 'Slow down your sub and add extra power to your trap!', SPIKED_ANCHOR_ITEM_TYPE, ICON_SOURCE_SPIKED_ANCHOR, beforeElement);
    
    beforeElement = $('.charm[data-item-type=\''+WATER_JET_ITEM_TYPE+'\']');
    addSunkenCityCharmControl("Treasure Trawling Charm", 'Scrape some extra loot from the ocean floor!', TREASURE_TRAWLING_ITEM_TYPE, ICON_SOURCE_TREASURE_TRAWLING, beforeElement);
    addSunkenCityCharmControl("Oxygen Burst Charm", 'Receive an EXTRA Oxygen Canister when looting one!', OXYGEN_BURST_ITEM_TYPE , ICON_SOURCE_OXYGEN_BURST, beforeElement);
    addSunkenCityCharmControl("Smart Water Jet Charms", 'Overcharge your engine for a 500m boost!', SMART_JET_ITEM_TYPE, ICON_SOURCE_SMART_JET, beforeElement);
    
    initLastSunkenCityCharmsQuantity();
    
    modifyArmNowElements();
    addCharmIconsToTooltips($('.sunkenCharms a.charm'));
    addCharmIconsToTooltips($('.craftingItems a'));
    modifySunkenCharmsControlsOnclick();
    
    if (sunkenCharmsAutoHide) enableSunkenCharmsAutoHide();
}
function blinkSunkenCityCharmIfNeeded(charmItemType){
    var charmElement = $('.charm[data-item-type=\''+charmItemType+'\'] .quantity')[0];
    var q = parseInt(charmElement.textContent, 10);
    
    if (q !== null && !isNaN(q)){
        if (lastSunkenCityCharmsQuantity[charmItemType]){
            // check if need to blink
            var color;
            if (lastSunkenCityCharmsQuantity[charmItemType] < q){
                color = 'lightgreen';
            } else if (lastSunkenCityCharmsQuantity[charmItemType] > q){
                color = 'red';
            }
            
            if (typeof color != 'undefined' && blinkText){
                blinkText(charmElement,color,'white',1);
            }
        }
    
        lastSunkenCityCharmsQuantity[charmItemType] = q;
    }
}
function blinkSunkenCityCharmsIfNeeded(){
    blinkSunkenCityCharmIfNeeded(WATER_JET_ITEM_TYPE);
    blinkSunkenCityCharmIfNeeded(ANCHOR_ITEM_TYPE);
}

// Getters
function getItemTypeLootCount(addedNode, itemType){
    var journalText = addedNode.getElementsByClassName('journaltext')[0];
    var text = journalText.innerHTML;
    var lookFor = ' <a href="https://www.mousehuntgame.com/';
    if (isFacebook()) lookFor += 'canvas/';
    lookFor += 'item.php?item_type=' + itemType;
    var index = text.indexOf(lookFor)-1;
    
    if (index < 0)
        return 0;
    
    while (text.charAt(index) != ' ' && text.charAt(index) != '>'){
        index--;
    }
    index++;
    
    var res = '';
    while (text.charAt(index) != ' '){
        res += text.charAt(index++);
    }
    
    return parseInt(res,10);
}
function getCurrentDistance(){
    var distanceContainer = document.getElementsByClassName('distanceContainer')[0];
    var distance = distanceContainer.getElementsByClassName('distance')[0];
    var curDistance = parseInt(distance.innerHTML.replace(/[,m]/g, ""),10);
    
    return curDistance;
}
function getRemainingPixelsInZone(zone){
    var res = (parseInt(zone.offsetWidth,10) - (80 - parseInt(zone.style.left,10)));
    
    return res;
}
function getZoneIcon(zoneName, zoneClass, curDistance){
    var lootIconSource='';
    var icon;
    
    if (zoneClass.indexOf( "coral" ) != -1){
        // Damged Coral
        lootIconSource = ICON_SOURCE_CORAL;
    } else if(zoneClass.indexOf( "barnacle" ) != -1){
        // Barnacle
        lootIconSource = ICON_SOURCE_BARNACLE;
    } else if (zoneClass.indexOf( "mouse_scale" ) != -1){
        // Scale
        lootIconSource = ICON_SOURCE_SCALES;
    } else if ((zoneClass.indexOf( "treasure" ) != -1)){
        // Sand Dollar
        lootIconSource = ICON_SOURCE_SAND_DOLLAR;
    } else if (zoneClass.indexOf( "oxygen" ) != -1){
        // Oxygen
        lootIconSource =ICON_SOURCE_OXYGEN;
    } else if ((zoneClass.indexOf( "danger" ) != -1)|| (zoneClass.indexOf("lair_of_the_ancients") != -1)){
        if (curDistance < 10000){
            // Brined Curd
            lootIconSource = ICON_SOURCE_BRINED_CURD;
        } else{
            // Predatory Processor
            lootIconSource = ICON_SOURCE_PREDATORY_PROCESSOR;
        }
    }
        
        if (lootIconSource !== ''){
            icon = '<img src="'+lootIconSource+'" style="position: absolute ; width: '+TOOLTIP_ICON_SIZE+'px; height: '+TOOLTIP_ICON_SIZE+'px ; left: 5px; top: 1px;">';    
        } else {
            var size = +TOOLTIP_ICON_SIZE-2;
            icon = '<div style="position: absolute; top: 2px; left: 5px; width: '+size+'px; height: '+size+'px; border-radius: '+size+'px; '+
                'background-color: ' + colors[zoneName] + '"></div>';
        }
    
    return icon;
}
function getZoneLine(w, zoneName, curDistance, before , zoneClass){
    
    var extraStyle = "";
    var shadow = '0px 0px 1px';
    if (zoneClass.indexOf( "oxygen" ) != -1){
        extraStyle = ' text-shadow: '+shadow +' teal; ';
    } else if (zoneClass.indexOf( "magma_flow" ) != -1){
        extraStyle = ' text-shadow: '+shadow +' darkorange; ';
    } else if ((zoneClass.indexOf( "danger" ) != -1)&&(curDistance>=10000)){
        extraStyle = ' text-shadow: '+shadow +' rgb(190, 0, 0); ';
    } else if (zoneClass.indexOf("lair_of_the_ancients") != -1){
        extraStyle = ' text-shadow: '+shadow +' rgb(16, 135, 182); ';
    } else if (zoneClass.indexOf( "treasure" ) != -1){
        extraStyle = ' text-shadow: '+shadow +' gold; ';
    } else if (zoneClass.indexOf( "default" ) != -1){
        extraStyle = " color: darkgray; ";
    }
        
        var icon = getZoneIcon(zoneName, zoneClass, curDistance);
    var title='';
    if (zoneName.length > MAX_ZONE_NAME_LENGTH){
        title = 'title="'+zoneName+'"';
        zoneName = zoneName.substring(0,MAX_ZONE_NAME_LENGTH-2)+'..';
    }
    
    // Check if need to add zone mark to the water area
    var markText = IMPORTANT_MARKS[before];
    var curZone = document.getElementsByClassName(zoneClass)[0];
    if (markText){                
        var end = curZone.getElementsByClassName('start')[0];
        if (end.getElementsByClassName('myZoneMark').length === 0){
            end.innerHTML += '<div class="myZoneMark name" style="'+
                'font-weight: ; position: absolute; top: 80px; left: 5px">' + markText + '</div>';
        }
    }
    
    var line = '<div '+title+'style="font-size:'+TOOLTIP_TEXT_SIZE+'px; text-align:left; position: relative; padding: 0px 5px 2px 20px;' + 
        extraStyle +'">' + icon + zoneName + '<span style="float:right">' + w + 'm</span></div>'; 
    
    // Check if need to add zone mark line to the tooltip
    var after = parseInt(before,10)+parseInt(curZone.style.width,10)*(5/3);
    markText = IMPORTANT_MARKS[after];
    if (markText){ 
        line+= '<div style="font-size:'+TOOLTIP_TEXT_SIZE+'px; font-weight: bold; text-align: center; position: relative; '+
            'border-color: black;border-width: 1px; border-top-style: solid; border-bottom-style: solid;'+
            'padding: 0px 5px 2px 20px;text-shadow: 1px 0px lightgrey; margin-left: 5px; margin-right: 5px;">' + markText + '</div>';
    }
    return line;
}
function isAnchorActive(){
	var activeCharm = getActiveCharm();
	if (typeof activeCharm != 'undefined' && activeCharm !== null && activeCharm !== ''){
		return (activeCharm.toLowerCase().indexOf('anchor') > -1);
	} else {
		return false;
	}
}
function isJetActive(){
	var activeCharm = getActiveCharm();
	if (typeof activeCharm != 'undefined' && activeCharm !== null && activeCharm !== ''){
		return (activeCharm.toLowerCase().indexOf('jet') > -1);
	} else {
		return false;
	}
}
function parseMutationforDistance(mutation){
    return parseInt(mutation.addedNodes[0].data.replace(/[,m]/g, ""),10);
}

// Ruler
function checkParametersAndLock(curDistance, remaining){
	if (curDistance == 'forceUpdate')
		return OK;
		
    if (isNaN(remaining)){
        if (DEBUG) printToConsole('Remaining is NaN: ' + remaining);
        return REFRESH;
    }
    
    if (remaining <= 0){
        if (DEBUG) printToConsole(remaining + ' <= 0');
        return REFRESH;
    }
    
    if (curDistance){
        if (curDistance <= lastDitanceRefreshed){
            if (DEBUG) printToConsole(curDistance +' <= ' + lastDitanceRefreshed);
            return NOTOK;
        }
    }
    
    if (lock){
        if (DEBUG) printToConsole('Waiting for lock..');
        return REFRESH;
    }
    
    lock = true;
    
    return OK;
}
function createTooltipFutureElement(futureHtml){
    var tooltip = document.createElement('div');
    tooltip.innerHTML = '<div class="toolTip" style="width: '+TOOLTIP_WIDTH+'px;left: '+(+135-TOOLTIP_WIDTH)+'px;">' +
    futureHtml +'<div class="arrow" style="right: 20px;left: initial;"><span></span></div></div>';
    var futureContainer = document.createElement('div');
    futureContainer.className = "myDistanceContainer distanceContainer";
    futureContainer.innerHTML = '<div style="text-align: center;height: 14px; background: none repeat scroll 0 0 #333; color: #fff; font-size: 10px; font-variant: small-caps; letter-spacing: 0.3em;">future zones...</div>';
    futureContainer.appendChild(tooltip);
    
    return futureContainer;
}
function createRuler(active, remainingSteps,step ,anchorActive, jetActive){
    var ruler = document.createElement('div');
    var lines = '';
    var count = 0;
    var height = (jetActive ) ? 4*INIT_RULER_HEIGHT : INIT_RULER_HEIGHT;
    var opacity = 1;
    var background = '';
    var borderStyle = '';
    var lineWidth = RULER_LINE_WIDTH;
    borderStyle = ( ROUNDED_RULER) ? 'border-radius: '+height/(2+(2*anchorActive))+'px; ' : '';
    
    for(var i=0; i<remainingSteps; i++) {
        count += +step;
        if (count > MAX_RULER_SIZE)
            break;
        background = USE_RULER_BACKGROUND ? ('background: rgba(238, 238, 238, '+(opacity/2)+');') : '';
        lines += '<div style="float: left; '+
            'opacity: '+ opacity+'; '+
            'width: '+(step-lineWidth)+'px;'+
            'border-right: '+lineWidth+'px solid '+RULER_COLOR+'; '+
            'height: '+height+'px; '+
            borderStyle + background +
            'margin-top:'+(INIT_RULER_HEIGHT-height)/(1+jetActive)+'px;'+
            '"></div>';
        if ((!FIXED_RULER_HEIGHT || anchorActive)&& height>2) height -= 1;//Math.pow(0.9,Math.sqrt(step/6));
        if (height<RULER_MIN_HEIGHT) height = RULER_MIN_HEIGHT;
        if (opacity>0.3) opacity *= Math.pow(0.9,Math.sqrt(step/6));
    }
    
    ruler.className = "ruler";
    ruler.style.position="absolute";
    ruler.style.width=((active.offsetWidth+30) < MAX_RULER_SIZE ? (active.offsetWidth+30) : MAX_RULER_SIZE) +'px';
    ruler.style.top='40px';
    ruler.style.left= '81px';
    ruler.style.zIndex='20';
    ruler.innerHTML = lines;
    if (remainingSteps > 1){
        ruler.innerHTML += '<br><div style="position: absolute; font-size: 9px; top:13px; left:-2px;' +
            'color:#EEEEEF ; text-shadow: -1px -1px 1px black ,1px 1px 0px black;'+
            '">' + remainingSteps + ' more hunts</div>';
    } else {
        ruler.innerHTML += '<br><div style="position: absolute; font-size: 9px; font-weight:bold; ' +
            'color:#EEEEEF ; text-shadow: -1px -1px 1px black ,1px 1px 0px black;'+
            'top:13px; left:-2px;">One more hunt!</div>';
    }
    return ruler;
}
function createAndAddRuler(water, active, remaining){
    // Check the step size (10m/30m)
	
	var anchorActive = isAnchorActive();
    var jetActive = isJetActive();
    var step = (anchorActive) ? 6 : 18;
    step = (jetActive) ? 300 : step;
    var remainingStepsInZone = Math.ceil(remaining / (step));
    
	// Create a ruler for the next hunts
    
    var ruler = createRuler(active, remainingStepsInZone,step ,anchorActive, jetActive);
	removeElementIfExist(water,'ruler');
    water.appendChild(ruler);
}
function addTooltipToRightSidebar(futureHtml){
    var sideBar = document.getElementsByClassName('sidebar')[0];
    
    // Move the current location to the top of the side bar to make room for the future zones
    var currentZoneName = sideBar.getElementsByClassName('zoneName')[0];
    currentZoneName.style.padding = '0px';
    if (isFirefox){
        sideBar.getElementsByClassName('diveControls')[0].style.height = '37px';
        sideBar.getElementsByClassName('diveButton')[0].style.height = '37px';
    }
    
    removeElementIfExist(sideBar,"myDistanceContainer distanceContainer");
    
    // Create a future zones element with tooltip
    var futureContainer = createTooltipFutureElement(futureHtml);
    
    // Add the new element to the side-bar
    var headsup = document.getElementsByClassName('headsup')[0];
    if (headsup && headsup.style)
        headsup.style.overflow = 'visible';
    var distanceContainer = document.getElementsByClassName('distanceContainer')[0];
    distanceContainer.parentNode.insertBefore(futureContainer, distanceContainer.nextSibling);
}
function getFutureZonesTooltipHtml(active, curDistance, remaining){
    var futures = document.getElementsByClassName('future');
    var res = '';
    
    removeElementIfExist(active ,'myZoneMark');
    var name = active.getElementsByClassName('name')[0];
    if (name === null){
        console.log("name == null");
        console.log(active);
        return;
    }
    
    var w = parseInt(active.style.width,10)*(5/3);
    var before = +curDistance+((+remaining)*(5/3))-+w;
    if (w>250) name.innerHTML = name.innerHTML.replace(/ +\(\w+\)/g, "");
    var zoneName = name.innerHTML.replace(/<[^>]*>/g, "");
    if (w>250) name.innerHTML = name.innerHTML +' ('+ w +'m)';
    res += getZoneLine((+remaining)*(5/3), zoneName, curDistance, before, active.className);
    
    
    for(var i=0; i<futures.length; i++) {
        before += w;
        removeElementIfExist(futures[i] ,'myZoneMark');
        name = futures[i].getElementsByClassName('name')[0];
        w = parseInt(futures[i].style.width,10)*(5/3);
        if (w>250) name.innerHTML = name.innerHTML.replace(/ +\(\w+\)/g, "");
        zoneName = name.innerHTML.replace(/<[^>]*>/g, "");
        if (w>250) name.innerHTML = name.innerHTML +' ('+ w +'m)';
        res += getZoneLine(w, zoneName, curDistance, before, futures[i].className);
    }
    
    return res;
}

// Mutations
function handleActiveMutations(mutations) {
    mutations.some(function (mutation) {
        if (mutation.attributeName == 'class' &&
            mutation.target.className.indexOf('busy') == -1)
        {
            var remaining = getRemainingPixelsInZone(mutation.target);
            
            if (DEBUG) printToConsole('activeObserver called me');
            
            if (remaining < lastRemainingRefreshed || typeof lastDitanceRefreshed == 'undefined'){
                refreshSunkenCity();
            }
            
            // Check if target is still active
            if (mutation.target.className.indexOf('active') < 0){
                activeObserver.disconnect();
                var water = document.getElementsByClassName('water')[0];
                if (water){
                    var active = water.getElementsByClassName('active')[0];
                    if (active)
                        activeObserver.observe(active, activeObserverConfig);
                }
                
                lastRemainingRefreshed = Number.MAX_VALUE;
                
                if (DEBUG) printToConsole('activeObserver - new observation');
                
                return true;
            }
            return false;
        }
    });
}
function handleCharmsMutations(mutations) {
    mutations.some(function (mutation) {
        /*(mutation.type ==  'attributes' 
             && mutation.attributeName == 'class'
             && mutation.target.className.indexOf('busy') == -1)*/
//        if (mutation.type ==  'attributes')
		if (DEBUG) printToConsole('charmsObserver called me');
		refreshSunkenCity(null, true);
		return true;
    });
}
function handleDistanceMutations(mutations) {
    mutations.forEach(function(mutation) {
        if (mutation.addedNodes.length > 0){
            var curDistance = parseMutationforDistance(mutation);
            if ((curDistance > lastDitanceRefreshed) && (curDistance % 10) === 0){
                if (DEBUG) printToConsole('distanceObserver called me');
                refreshSunkenCity(curDistance);
            }
        }
    });    
}
function handleJournalMutations(mutations) {
    var ProcessorLootCount = 0;
    var sandDollarsLootCount = 0;
    var ultimateCharmLootCount = 0;
    mutations.forEach(function(mutation) {
        if (mutation.addedNodes.length > 0 && mutation.addedNodes[0].className) {
            
            if (DEBUG) printToConsole('journalObserver called me'); 
            
            // Check if the added node was a parrent of a journal node
            var toParse = mutation.addedNodes[0].getElementsByClassName('entry'); //catchsuccessloot
            
            if (toParse.length === 0){
                // Check if the added node itself is the journal node
                if (mutation.addedNodes[0].className.indexOf('entry') > -1 ){
                    // && mutation.addedNodes[0].className.indexOf('catchsuccessloot') > -1){
                    toParse = [mutation.addedNodes[0]];
                } else {
                    // Nothing to parse in this mutation
                    if (DEBUG) printToConsole('Nothing to parse');
                    return;
                }
            }
            
            for (var i=toParse.length-1 ; i>=0 ; i--){               
                
                var currentId = toParse[i].dataset.entryId;
                
                if (currentId > lastJournalIdRefreshed){
                    lastJournalIdRefreshed = currentId;
                    setLocalValue('lastJournalIdRefreshed', lastJournalIdRefreshed);
                    // if (DEBUG) console.log(toParse[i]);
                    if (DEBUG) printToConsole('Last Journal ID Refreshed = ' + currentId);
                    
                    var curLoot = getItemTypeLootCount(toParse[i], PREDATORY_PROCESSOR_ITEM_TYPE);
                    if (curLoot > 0){
                        ProcessorLootCount +=  curLoot;
                        blinkText(toParse[i],'red');
                    }
                    
                    curLoot = getItemTypeLootCount(toParse[i], ULTIMATE_CHARM_ITEM_TYPE);
                    if (curLoot > 0){
                        ultimateCharmLootCount +=  curLoot;
                        blinkText(toParse[i],'teal');
                    }
                }
            }
        }
    });
    //TODO ultimate charm
    var header,text ;
    header = 'Bazinga !!';
    
    if (ProcessorLootCount > 0 ){
        text = 'You\'ve got '+ ProcessorLootCount + ' Predatory Processor' + (ProcessorLootCount > 1 ? 's': '' )+' !';
        celebrationPopup(ICON_SOURCE_PREDATORY_PROCESSOR, header, text);
    }
    
    if (ultimateCharmLootCount > 0 ){
        text = 'You\'ve got '+ ultimateCharmLootCount + ' Ultimate Charm' + (ultimateCharmLootCount > 1 ? 's': '' )+' !';
        celebrationPopup(ICON_SOURCE_ULTIMATE_CHARM, header, text);
    }    
}
function handleCraftingItemsMutations(mutations) {
    var lastRemoved = -1;    
    
    if (DEBUG) printToConsole('craftingItemsObserver called me');
    
    // SandDollars aren't update by HG so update the count manually
    if (isInLocation('Sunken City')){
            updateSandDollarsItemCount();
    }
    
    mutations.forEach(function(mutation) { 
        var shouldBlink = false;
        var blinkTarget = null;
        var color = '';
        
        if (mutation.type == "characterData"){
			// Handle characterData changes
            shouldBlink = true;
            blinkTarget = mutation.target.parentNode;
        } else if (mutation.target && mutation.target.classList.contains('quantity')){ 
			// Handle child changes
            if (mutation.removedNodes.length > 0){
                lastRemoved = parseInt(mutation.removedNodes[0].data.replace(/[^-0-9]/g,''),10);
            } 
            if (mutation.addedNodes.length > 0){
                
                var curCount = parseInt(mutation.addedNodes[0].data.replace(/[^-0-9]/g,''),10);
                
                // TODO 
                // if (DEBUG) printToConsole('curCount ?= lastRemoved :' + curCount +'?='+ lastRemoved);
                
                if (curCount != lastRemoved){   
                    shouldBlink = true;
                    blinkTarget = mutation.target;
                    if (curCount > lastRemoved){
                        color = 'lightgreen'
                    } else {
                        color = 'red';
                    }
                }
            } 
        }
                
        // Blink if needed
        if (shouldBlink){
            if (isInLocation('Fungal Cavern')){
                // animate blinking
                var fadeTime = 100;
                for (var i=2; i<=5; i++){
                    $(blinkTarget).effect("fade",{},i*fadeTime).effect("fade",{},i*fadeTime);
                    //$(blinkTarget).effect("fade",{},i*fadeTime).text(curCount).effect("fade",{},i*fadeTime);
                }
            } else {
                blinkText(blinkTarget, caraftingItemsBlinkingColor, caraftingItemsQuantityColor ,7);    
            }
        }
    });
}
function onSideTitleEvent(event){
    var sideTitle = event.srcElement.data;
    printToConsole(sideTitle);
    if (sideTitle != lastSunkenCitySideTitle){
        lastSunkenCitySideTitle = sideTitle;
        console.log(sideTitle + '. Refreshing...');
        if (sideTitle != 'docked') {
            activateSunkenCityDiving();
        } else {
            deactivateSunkenCityDiving();
        }
    }
}

// General
function refreshSunkenCity(curDistance, forceUpdate) {
    
    if(isInLocation('Sunken City')) {   
        var sideTitle = document.getElementsByClassName('sidebarTitle')[0].innerHTML; 
        if(sideTitle == 'docked') {
            deactivateSunkenCityDiving();
            return;
        }
    } else {
        deactivateSunkenCityDiving();
        return;
    }
    
    var water = document.getElementsByClassName('water')[0];
    var active = water.getElementsByClassName('active')[0];
    var remaining = getRemainingPixelsInZone(active);

	if (typeof curDistance == 'undefined' || curDistance === null){
		curDistance = getCurrentDistance();
	}
	
	var check ;
	if (forceUpdate && !lock ){
		check = OK;
	} else {
		check = checkParametersAndLock(curDistance, remaining);
	}
	
	switch(check){
		case  OK:
			if (DEBUG) 
				printToConsole('Refresh #'+ refreshCount++ + ': Current distance: ' + curDistance + 'm. Remaining: ' + remaining*10/6 + 'm');
            if (!forceUpdate){
                lastDitanceRefreshed = curDistance;
                lastRemainingRefreshed = remaining;
            }
			break;
			
		case  NOTOK:
            if (forceUpdate && !lock ) {
                break;
            }
            if (DEBUG) printToConsole('NOT OK');
            return;
            
		case  REFRESH:
			if (DEBUG) printToConsole('wait for refresh');
			window.setTimeout(refreshSunkenCity, 500,[curDistance,forceUpdate]);
			return;
			
		default:
			return;
			
	}
	
	// Ruler section
	createAndAddRuler(water, active, remaining);
    
    // Refresh the tooltip
    var futureHtml = getFutureZonesTooltipHtml(active, curDistance, remaining);
    addTooltipToRightSidebar(futureHtml);
    
    // set the team icon z index so it will be behind the tooltip
	updateSunkenCityCharmsDisplay();
    $('.teamEmblemView').css('z-index', 5);
    
    lock = false;
}
function deactivateSunkenCityDiving(){
    if (activeObserver) 	activeObserver.disconnect();
    if (journalObserver) 	journalObserver.disconnect();
    if (distanceObserver)   distanceObserver.disconnect();
    if (charmsObserver)		charmsObserver.disconnect();
    
    var sideTitleElement = document.getElementsByClassName('sidebarTitle')[0];
    var sideTitle = sideTitleElement.innerHTML;
    if(sideTitle == 'docked') {
        // Add refresh trigger for diving
        sideTitleElement.addEventListener("DOMCharacterDataModified", activateSunkenCityDiving, false);
    }
    
    printToConsole('Deactivated Sunken City Diver Tools');
}
function activateSunkenCityDiving(){
    
    printToConsole('Activating Sunken City Diver Tools');
    
    // Add 6 new charms and modify the display
    modifySunkenCityCharmsDisplay();
    
    // Attach refresh to active element changes (activeObserver)
    var active = document.getElementsByClassName('zone active')[0];
    
    if (active) {
        activeObserver = new MutationObserver(handleActiveMutations);
        activeObserver.observe(active, activeObserverConfig);
    }
    
	
    // Attach refresh to Charms element changes (charmsObserver)
    var label;
    if (NEW_GUI){
        label = $('.mousehuntHud-userStat.trinket .label')[0];
        if (label){
            if (label) {
                charmsObserver = new MutationObserver(handleCharmsMutations);
                charmsObserver.observe(label, { subtree:true, childList: true});
            }
        }
    } else {
        label = document.getElementById('hud_trapLabel');
        if (label){
            if (label) {
                charmsObserver = new MutationObserver(handleCharmsMutations);
                charmsObserver.observe(label,  { subtree:true, childList: true});
            }
        }
    }
    
    
    // Attach handleJournalMutations to journal changes (journalObserver)
    var content;
    if (NEW_GUI)
        content = document.getElementsByClassName('mousehuntPage-content')[0];
    else
        content = document.getElementsByClassName('journalContainer')[0];
    //TODO
    
    if (content) {
        journalObserver = new MutationObserver(handleJournalMutations);
        journalObserver.observe(content, journalObserverConfig);
    }
    
    /******************************************************************/
    // Attach blink text to crafting items count changes (craftingItemsObserver)
    var craftingItems = document.getElementsByClassName('craftingItems')[0];
    
    if (craftingItems) {
        craftingItemsObserver = new MutationObserver(handleCraftingItemsMutations);
        craftingItemsObserver.observe(craftingItems, craftingItemsObserverConfig);
    }
    
    $('.water').click(function(){
        if (sunkenCharmsAutoHide)
            disableSunkenCharmsAutoHide();
        else
            enableSunkenCharmsAutoHide();
        
        console.log('sunkenCharmsAutoHide:'+sunkenCharmsAutoHide);
    });

    /******************************************************************/ 
    // refresh for the first time
    
    refreshSunkenCity();
}

//***************            END Sunken City         *******************/

/******************         Labyrinth Section     ***********************/
function updateHallwayHuntsLeft(){
    $('.hallway_hunts_left').remove();
    
    var hallway = document.getElementsByClassName('labyrinthHUD-hallway-padding')[0];
    var totalLength = hallway.children.length;
    var complete = hallway.getElementsByClassName('complete').length;
    var huntsLeft = totalLength - complete;
    //var text = '(' + complete + '/' + totalLength + ')';
    var text = ' (' + huntsLeft + ' hunts left)';    
    var d = document.createElement('span');
    d.innerText = text;
    d.style.fontSize = '9px';
    d.className = 'hallway_hunts_left';
    
    var description = document.getElementsByClassName('labyrinthHUD-hallwayDescription hallway')[0];
    description.appendChild(d);
}
function getNumberOfCluesFoundOfType(type){
    type = type.replace(/ /g,'');
    var text = $('.'+type+' .labyrinthHUD-clueDrawer-quantity').text();
    return parseInt(text,10);
}

function updateNumberOfClues(){
    $('.hallway_clues_found').remove();
    $('.hallway_clues_found_suffix').remove();
    
    $('.clueFound').each(function(index, clueFoundElem){
        var type = clueFoundElem.className.match(/ . /)[0];
        var count = getNumberOfCluesFoundOfType(type);
        
        var d = document.createElement('span');
        d.innerText = count + ' ';
        d.className = 'hallway_clues_found';
                
        $(clueFoundElem).children('.labyrinthHUD-clue-name').prepend(d);
        
        var c = document.createElement('span');
        c.innerText = ' clues';
        c.className = 'hallway_clues_found_suffix';
                
        $(clueFoundElem).children('.labyrinthHUD-clue-name').append(c);
    });
}

function updateLabyrinthHUD(){
    updateHallwayHuntsLeft();
    updateNumberOfClues();
    
    injectStyleRuleToHeadElement(
        '.labyrinthHUD-clueBar-totalContainer {'+
        'font-size: 11px;'+
        '}');
}

function handleHallwayProgress(mutations) {
    mutations.forEach(function(mutation) {
        if (DEBUG) console.log(mutation);
        updateLabyrinthHUD();
    });
}
//***************            END arinth         *******************/

/******************         Burroughs Rift Section     ***********************/
function enlargeAndModifyMistCount(){
    var mistQuantity = document.getElementsByClassName('mistQuantity')[0];
    mistQuantity.style.left = '-10px';
    mistQuantity.style.fontSize = 'large';
    var count = mistQuantity.innerText.split('/')[0];
    mistQuantity.innerText = count;
    if (count > 18){
        mistQuantity.style.color = 'orangered';
    } else if (count > 5){
        mistQuantity.style.color = 'lightgreen';
    } else if (count > 0){
        mistQuantity.style.color = 'yellow';
    }
        }
function handleMistQuantityMutations(mutations) {
    mutations.forEach(function(mutation) {
        if (mutation.addedNodes.length > 0){
            enlargeAndModifyMistCount();
        }
    });
}
//*****************          END Burroughs Rift        ***********************/


/******************         Fungal Cavern section     ************************/


//*****************          END Fungal Cavern        ************************/


/******************         Festice Ice Fortress Section   *******************/
function getActiveStage(){
    var stageNode = $('.winterHunt2014HUD-progress-tabContentContainer')
                            .children().not('.complete').not('.locked')[0];
    if (stageNode)
    	return stageNode.dataset.tab;
    else 
        return null;
}
function getRemainingHuntsInStage(stage){
    return $('.winterHunt2014HUD-progress-tabContentContainer .'+ stage +' .winterHunt2014HUD-progress-section-waveProgress i').length - 1;
}
function getTotalHuntsInStage(stage){
    return $('.winterHunt2014HUD-progress-tabContentContainer .'+ stage +' .winterHunt2014HUD-progress-section-waveProgress').children().length -1;
}
function updateRemainingHuntsInActiveWave(){     
    var stage = getActiveStage();
    if (!stage)
        return;
    
    var remaining = getRemainingHuntsInStage(stage);
    var general, tmp, label;
    
    if (remaining != lastRemainingHuntsInActiveWave && remaining >= 0){
        if (stage != 'bonus'){
        	// remove old added text
            label = $('.winterHunt2014HUD-progress-tabContentContainer .active .waveProgress .winterHunt2014HUD-progress-section-label');
            if (label){
                var oldText = label.text();
                
                
                var fromIndex = oldText.toLowerCase().indexOf('defeat')+1;
                var toIndex = oldText.indexOf(' and their minions');
                if (toIndex == -1) toIndex = oldText.indexOf('!');
                if (toIndex == -1) toIndex = oldText.length;
                
                if (DEBUG) printToConsole('oldText = ' + oldText);
                if (DEBUG) printToConsole('fromIndex = ' + fromIndex);
                if (DEBUG) printToConsole('toIndex = ' + toIndex);
                
                label.text(oldText.substring(fromIndex, toIndex) +'!');
                if (DEBUG) printToConsole('before = ' + label.text());
                var text = remaining + ' more hunt' + (remaining > 1 ? 's': '') +' until I can try to d';
                label.prepend(text);
            }
        }
        
        var totalProgressNode = document.createElement('div');
        totalProgressNode.id = 'myTotalProgressNode';
        totalProgressNode.style.display = 'block';
        totalProgressNode.style.position = 'absolute';
        totalProgressNode.style.left = '15px';
        totalProgressNode.style.top = '40px';
        totalProgressNode.style.background = 'transparent';
        totalProgressNode.style.textShadow = '-1px -1px 2px ' + ((stage != 'bonus') ? 'rgb(44, 81, 89)' : 'black');
        totalProgressNode.style.fontSize = '10px';
        totalProgressNode.style.color = (stage != 'bonus') ? 'rgb(219, 230, 249)' : 'white';
        
        var totalInWave = getTotalHuntsInStage(stage);
        if (remaining >0)
        	totalProgressNode.innerHTML = '<span>'+ (parseInt(totalInWave, 10)-parseInt(remaining,10)) +'</span>/' + totalInWave;
        else // remaining ==0
            totalProgressNode.innerHTML = '<span>Boss!</span>';
        
        general = $('.winterHunt2014HUD-progress-tabContentContainer .' + stage + ' .waveProgress .winterHunt2014HUD-progress-section-waveGeneral');
        if(general.length > 0){
            tmp = general.find('#myTotalProgressNode');
            tmp.remove();
            
            general.append(totalProgressNode);
            var span = totalProgressNode.getElementsByTagName('span')[0];
            $(span).animate({fontSize:'20px'});
            $(span).animate({fontSize:'10px'});
        }
        
        lastRemainingHuntsInActiveWave = remaining;
        
    } else if (remaining < 0){
        if (stage != 'bonus'){
        	label = $('.winterHunt2014HUD-progress-tabContentContainer .active .waveProgress .winterHunt2014HUD-progress-section-label');
        	label.text('D' + label.text().substring(label.text().toLowerCase().indexOf('defeat')+1,label.text().length));
        }
        general = $('.winterHunt2014HUD-progress-tabContentContainer .active .waveProgress .winterHunt2014HUD-progress-section-waveGeneral');
    	tmp = general.find('#myTotalProgressNode');
        tmp.remove();
    }
}
function handleFestiveIceFortressProgressMutations(mutations) {
    mutations.some(function(mutation) {
        if (mutation.addedNodes.length > 0){
            updateRemainingHuntsInActiveWave();
            return true; // break loop
        }
        return false;
    });
}
//***************	End Festice Ice Fortress Section   ****************/


/******************         Haunted Terrortories Section   *******************/
function showLeftHuntsInStage(){
    var rows = document.getElementsByClassName('halloweenHud-progress-stage-row');
    
    for(var index=0 ; index < rows.length ; index++){
        var row = rows[index];
        var t = row.getElementsByTagName('i');
        var leftInStage = t.length;
        var box = row.lastChild;
        
        if (row.parentNode.parentNode.className.indexOf('active') > -1){
            // Active
            
            if (row.parentNode.parentNode.className.indexOf('patch') < 0){
                // Not Pumpkin Patch
                box.style.width = '10px';
                box.style.height = '15px';
                box.style.top = '-5px';
                box.style.position = 'relative';
                box.style.left = '1px';
            } else {
                // Is Pumpkin Patch
                box.parentNode.style.paddingRight = '14px';
            }
            
            if (leftInStage > 0){
                box.innerText = leftInStage;
                box.style.fontStyle = 'normal';
                
                if (leftInStage > 9){
                    box.style.lineHeight = '16px';
                    box.style.fontSize = '9px';
                } else {
                    //box.style.fontWeight = 'bold';
                    box.style.fontSize = '11px';
                    box.style.textAlign = 'center';
                }            
            }
        } else if (row.parentNode.parentNode.className.indexOf('patch') > -1){
            // Not active Pumpkin Patch
            box.style.width = '5px';
            box.style.height = '5px';
            box.style.top = '0px';
            box.parentNode.style.paddingRight = '7px';
        }
    }
}

function handleHauntedProgressMutations(mutations) {
    mutations.forEach(function(mutation) {
        if (mutation.addedNodes.length > 0){
            console.log(mutation);
            showLeftHuntsInStage();
        }
    });
}
//**************     END Haunted Terrortories       *******************/


/******************           Tournaments Section      ***********************/

function getFutureTime(h,m){
    var t = new Date();
    var minutes = (t.getMinutes() + parseInt(m,10) + (t.getSeconds()>0 ? 1 : 0));
    var hours = Math.floor(minutes / 60);
    minutes = minutes % 60;
    hours = (parseInt(t.getHours(),10) + hours + parseInt(h,10)) % 24;
    
    return (hours + ':' + (minutes<10 ? '0':'') + minutes);
}
function isWaitingForTourney(){
    var t = document.getElementById('tournamentStatusHud');
    if (t && t.className.indexOf('pending') > -1){
        return true;
    }
    return false;
}
function getRemainingMinutesInHour(){
    var d = new Date();
    var res = 60 - (d.getSeconds()>0 ? 1 : 0)- d.getMinutes();
    return res;
}
function parseTourneyBeginsIn(text){
    var res = []; //  res[0] = hours, res[1] = minutes
    res = text.match(/[0-9][0-9]?/g);
    for (var i=0 ; i<res.length ; i++)
        res[i] = parseInt(res[i],10);
    
    if (text.indexOf('day') > -1) {
        if (text.indexOf('hour') > -1){
            // xx days and yy hours	
            res[0] = res[1];
            res[1] = getRemainingMinutesInHour();
        } else if (text.indexOf('min') > -1){
            // xx days and yy minutes
            res[0] = 24 * res[0];
        } else {
            if (res.length > 1){
                // xx days and yy seconds
                res[0] = 24*res[0];
                res[1] = getRemainingMinutesInHour();
            } else {
                // xx days
                res[0] = 24*res[0];
                res[1] = 0;
            }
        }
    } else if (text.indexOf('hour') > -1){
        // xx hours and yy minutes
        // xx hours and yy seconds
        res[1] = getRemainingMinutesInHour();
    } else if (text.indexOf('min') > -1){
        if (text.indexOf('second') > -1){
            // xx minuts and yy seconds
            res[1] = res[0];
            res[0] = 0;
        } else {
            // xx minutes
            res[1] = res[0] ;
            res[0] = 0;
        }
    } else {
        // xx seconds
        res[0] = 0;
        res[1] = 0;
    }
    
    return res;
}
function parseDurationForHours(text){
    var res ;
    if (text.indexOf('hours') == -1 ){
        // only days
        var days = text.match(/[0-9][0-9]?/);
        res = 24 * days;
    } else {
        var parsed = text.match(/[0-9][0-9]?/g);
        if (parsed.length > 1){
            // xx days and yy hours
            res = parsed[1];
        } else {
            // yy hours
            res = parsed[0];
        }
    }
    
    return res;
}
function addTourneyStartTime(){
    var t = document.getElementById('tournamentStatusHud');
    if (t){
        var timer = t.getElementsByClassName('timer')[0];
        if (timer){
            if (timer.innerHTML[timer.innerHTML.length-1] == ')'){
                // already added, used to avoid endless modifications
                return;
            }
            timer.innerHTML = timer.innerHTML.replace(/Starts in:/,'In ');
            var tmp = parseTourneyBeginsIn(timer.innerHTML);
            timer.style.width = '155px';
            timer.innerHTML += ' (' + getFutureTime(tmp[0],tmp[1]) + ')';
        }
    }
}
function handleTourneyTimerMutations(mutations){
    addTourneyStartTime();
}
function addLocalTimeToTournamentsList(){
    var list = document.getElementsByClassName('tournamentListingRow');
    
    for (var i=0 ; i < list.length ; i++){
        var remainingTime = parseTourneyBeginsIn(list[i].getElementsByClassName('beginsIn')[0].innerHTML);
        var startTimeString = getFutureTime(remainingTime[0],remainingTime[1]);
        var durationElement = list[i].getElementsByClassName('duration')[0];
        var durationValueElement = durationElement.getElementsByClassName('value')[0];
        var duration = parseDurationForHours(durationValueElement.innerHTML);
        var startHour = startTimeString.match(/[0-9][0-9]?/)[0];
        var endTimeString = (parseInt(startHour,10) + parseInt(duration,10))%24 + ':00';
        
        if (separateLocalTimeColumn){
            var newColumn = document.createElement('div');
            newColumn.className = 'column Time';
            newColumn.innerHTML = 
                '<div class="heading">Time</div>' +
                '<div class="value">' + startTimeString + '- ' + endTimeString+'</div>';
            
            list[i].insertBefore(newColumn,list[i].getElementsByClassName('duration')[0]);
        } else {
            durationElement.style.width = '90px';
            durationValueElement.innerHTML += '<br>('+startTimeString + '-' + endTimeString+')';
        }
    }
}
function enableTourneyStartTimeEnhancment(){
    var t = document.getElementById('tournamentStatusHud');
    if (t){
        var timer = t.getElementsByClassName('timer')[0];
        
        // mutation observer
        var tourneyTimerObserverConfig = { subtree:true, characterData: true };
        if (timer) {
            var tourneyTimerObserver = new MutationObserver(handleTourneyTimerMutations);
            tourneyTimerObserver.observe(timer, tourneyTimerObserverConfig);
        }
        
        addTourneyStartTime();
    }
}
function initTournaments(){
    // Check for pending tournament
    if (isWaitingForTourney()){
        if (DEBUG) printToConsole('Tournament pending. Adding local time');
        enableTourneyStartTimeEnhancment();
    }
    
    // Check if in tournaments list 
    if (document.URL.indexOf('tournamentlist.php') > -1 ){
        printToConsole('In Tournaments list page. Adding local times');
        addLocalTimeToTournamentsList();
    }
}

//*******************    End Tournaments Section    *******************/


/******************             Main section            **********************/
window.setTimeout(start, 0);

function start(){
    printToConsole('/******    MH Tools    ******/ ');
    initAnalytics();
    versionCheck();
    initGUIMode();
    enableHornSoundObserver();
    initTournaments();
    refreshLocation();
    enableLocationObserver();
}
//**************       End  Main section            *******************/
