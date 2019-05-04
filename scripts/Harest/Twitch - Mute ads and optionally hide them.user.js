// ==UserScript==
// @name        Twitch - Mute ads and optionally hide them
// @namespace   TWITCHADS
// @description Automatically mutes the Twitch player when an advertisement started and unmute it once finished. You can also hide ads by setting disableDisplay to true.
// @include     https://www.twitch.tv/*
// @include     https://twitch.tv/*
// @version     1.083
// @license     MIT
// @author      Harest
// @grant       none
// ==/UserScript==
(function() {
  var _tmuteVars = { "timerCheck": 1000, // Checking rate of ad in progress (in ms ; EDITABLE)
                    "playerMuted": false, // Player muted or not
                    "adsDisplayed": 0, // Number of ads displayed
                    "disableDisplay": false, // Disable the player display during an ad (true = yes, false = no (default) ; EDITABLE)
                    "alreadyMuted": false, // Used to check if the player is muted at the start of an ad
                    "adElapsedTime": undefined, // Used to check if Twitch forgot to remove the ad notice
                    "adUnlockAt": 150, // Unlock the player if this amount of seconds elapsed during an ad (EDITABLE)
                    "adMinTime": 15, // Minimum amount of seconds the player will be muted/hidden since an ad started (EDITABLE ; Recommended to really avoid any ad: 30 to 45)
                    "squadPage": false, // Either the current page is a squad page or not
                    "playerIdAds": 0, // Player ID where ads may be displayed (on squads page it's the last id instead of 0)
                    "displayingOptions": false // Either ads options are currently displayed or not
                   };
	
  // Check if there's an ad
  function checkAd()
  { 
    var isViewing = Boolean(document.getElementsByClassName("player-video").length);
    if (isViewing === false) return;
    
    // Initialize the ads options if necessary.
    var optionsInitialized = (document.getElementById("_tmads_options") === null) ? false : true;
    if (optionsInitialized === false) adsOptions("init");
    
    var advert = document.getElementsByClassName("player-ad-notice");
    
    if (_tmuteVars.adElapsedTime !== undefined)
    {
      _tmuteVars.adElapsedTime++;
      if (_tmuteVars.adElapsedTime >= _tmuteVars.adUnlockAt && advert[0] !== undefined) 
      {
        advert[0].parentNode.removeChild(advert[0]);
        console.log("Unlocking Twitch player as Twitch forgot to remove the ad notice after the ad(s).");
      }
    }
    
    if ((advert.length >= 1 && _tmuteVars.playerMuted === false) || (_tmuteVars.playerMuted === true && advert.length === 0)) 
    {
      // Update at the start of an ad if the player is already muted or not
      if (advert.length >= 1) _tmuteVars.alreadyMuted = Boolean(document.getElementsByClassName("player-button--volume")[_tmuteVars.playerIdAds].childNodes[0].className === "unmute-button"); 
      
      // Keep the player muted/hidden for the minimum ad time set (Twitch started to remove the ad notice before the end of some ads)
      if (advert.length === 0 && _tmuteVars.adElapsedTime !== undefined && _tmuteVars.adElapsedTime < _tmuteVars.adMinTime) return;

      mutePlayer();
    }
  }

  // (un)Mute Player
  function mutePlayer()
  {
    if (document.getElementsByClassName("player-button--volume").length >= 1)
    {
      if (_tmuteVars.alreadyMuted === false) document.getElementsByClassName("player-button--volume")[_tmuteVars.playerIdAds].click(); // If the player is already muted before an ad, we avoid to unmute it.
      _tmuteVars.playerMuted = !(_tmuteVars.playerMuted);

      if (_tmuteVars.playerMuted === true)
      {
        _tmuteVars.adsDisplayed++;
        _tmuteVars.adElapsedTime = 1;
        console.log("Ad #" + _tmuteVars.adsDisplayed + " detected. Player " + (_tmuteVars.alreadyMuted === true ? "already " : "") + "muted.");
        if (_tmuteVars.disableDisplay === true) document.getElementsByClassName("player-video")[_tmuteVars.playerIdAds].style.visibility = "hidden";
      } else {
        _tmuteVars.adElapsedTime = undefined;
        console.log("Ad #" + _tmuteVars.adsDisplayed + " finished." + (_tmuteVars.alreadyMuted === true ? "" : " Player unmuted."));
        if (_tmuteVars.disableDisplay === true) document.getElementsByClassName("player-video")[_tmuteVars.playerIdAds].style.visibility = "visible";
      }
    } else {
      console.log("No volume button found (class changed ?).");
    }
  }
  
  // Manage ads options
  function adsOptions(changeType = "show")
  {
    switch(changeType) {
      // Manage player display during an ad (either hiding the ads or still showing them)
    	case "display":
        _tmuteVars.disableDisplay = !(_tmuteVars.disableDisplay);
        // Update the player display if an ad is supposedly in progress
        if (_tmuteVars.playerMuted === true) document.getElementsByClassName("player-video")[_tmuteVars.playerIdAds].style.visibility = (_tmuteVars.disableDisplay === true) ? "hidden" : "visible";
        document.getElementById("_tmads_display").innerText = (_tmuteVars.disableDisplay === true ? "Show" : "Hide") + " player during ads";
        break;
      // Force a player unlock if Twitch didn't remove the ad notice properly instead of waiting the auto unlock
    	case "unlock":
        var advert = document.getElementsByClassName('player-ad-notice');
        if (_tmuteVars.adElapsedTime === undefined && advert[0] === undefined)
        {
          alert("There's no ad notice displayed. No unlock to do.");
        } else {
          // We set the elapsed time to the unlock timer to trigger it during the next check.
          _tmuteVars.adElapsedTime = _tmuteVars.adUnlockAt;
          console.log("Unlock requested.");
        }
        break;
      // Display the ads options button
      case "init":
        if (document.getElementsByClassName("channel-info-bar__viewers-wrapper")[0] === undefined && document.getElementsByClassName("squad-stream-top-bar__container")[0] === undefined) break;
        
        // Append ads options and events related
        var optionsTemplate = document.createElement("div");
        optionsTemplate.id = "_tmads_options-wrapper";
        optionsTemplate.className = "tw-mg-r-1";
        optionsTemplate.innerHTML = `
        <span id="_tmads_options" style="display: none;">
          <button type="button" id="_tmads_unlock" style="padding: 0 2px 0 2px; margin-left: 2px; height: 30px;" class="tw-interactive tw-button-icon tw-button-icon--hollow">Unlock player</button>
          <button type="button" id="_tmads_display" style="padding: 0 2px 0 2px; margin-left: 2px; height: 30px;" class="tw-interactive tw-button-icon tw-button-icon--hollow">` + (_tmuteVars.disableDisplay === true ? "Show" : "Hide") + ` player during ads</button>
        </span>
        <button type="button" id="_tmads_showoptions" style="padding: 0 2px 0 2px; margin-left: 2px; height: 30px;" class="tw-interactive tw-button-icon tw-button-icon--hollow">Ads Options</button>`;
        
        // Normal player page
        if (document.getElementsByClassName("channel-info-bar__viewers-wrapper")[0] !== undefined)
        {
          _tmuteVars.squadPage = false;
          _tmuteVars.playerIdAds = 0;
          document.getElementsByClassName("channel-info-bar__viewers-wrapper")[0].parentNode.parentNode.appendChild(optionsTemplate);
        // Squad page
        } else if (document.getElementsByClassName("squad-stream-top-bar__container")[0] !== undefined)
        {
          _tmuteVars.squadPage = true;
          _tmuteVars.playerIdAds = 0;
          // Since the primary player is never at the same place, we've to find it.
          for (var i = 0; i < parseInt(document.getElementsByClassName("player-video").length); i++)
          {
            if (document.getElementsByClassName("multi-stream-player-layout__player-container")[0].childNodes[i].classList.contains("multi-stream-player-layout__player-primary"))
            {
              _tmuteVars.playerIdAds = i;
              break;
            }
          }
          document.getElementsByClassName("squad-stream-top-bar__container")[0].appendChild(optionsTemplate);
        }
        
        document.getElementById("_tmads_showoptions").addEventListener("click", adsOptions, false);
        document.getElementById("_tmads_display").addEventListener("click", function() { adsOptions("display"); }, false);
        document.getElementById("_tmads_unlock").addEventListener("click", function() { adsOptions("unlock"); }, false);
        console.log("Ads options initialized.");
        
        break;
      // Display/Hide the ads options
    	case "show":
    	default:
        _tmuteVars.displayingOptions = !(_tmuteVars.displayingOptions);
        document.getElementById("_tmads_options").style.display = (_tmuteVars.displayingOptions === false) ? "none" : "inline-block";
		} 
  }
  
  // Start the background check
  _tmuteVars.autoCheck = setInterval(checkAd, _tmuteVars.timerCheck);
  
})();