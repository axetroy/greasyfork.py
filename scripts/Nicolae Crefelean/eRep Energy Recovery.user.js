// ==UserScript==
// @name            eRep Energy Recovery
// @name:ro         Recuperare energie eRep
// @description     Energy recovery for eRebuglik
// @description:ro  Recuperare energie pentru eRebuglik
// @namespace       http://www.linuxmint.ro/
// @version         1.9
// @license         CC BY 4.0
// @author          Nicolae Crefelean
// @include         http*://www.erepublik.com/*
// @grant           none
// ==/UserScript==

if (typeof jQuery !== "undefined") {
    jQuery(function() {
      var gameInactivity = 0,
          gameRefresh = 0;

      // returns true|false whether energy can be recovered (bar not filled)
      function energyAvailable() {
          var energyToLoad = getMaxEnergy() - getEnergy(),
              available = recoverableEnergy() > 1 && energyToLoad > 1;
          return available;
      }

      // returns the amount of recoverable energy
      function recoverableEnergy() {
          var energy = jQuery('big.tooltip_health_limit').last().text().trim();
          return energy;
      }

      // return the maximum recoverable energy
      function getMaxEnergy() {
          var data = jQuery('#current_health').text().split("/"),
              maxEnergy = typeof data[1] !== 'undefined' ? data[1].trim() : 0;
          return maxEnergy;
      }

      // return currently loaded energy
      function getEnergy() {
          var data = jQuery('#current_health').text().split("/"),
              loadedEnergy = typeof data[1] !== 'undefined' ? data[0].trim() : 0;
          return loadedEnergy ;
      }

      // return true|false whether the energy can be recovered with food
      function foodAvailable() {
          return jQuery("#foodText").length && jQuery("#eat_food_text").val().trim() == jQuery("#foodText").text().trim() || jQuery("#heal_btn").length && jQuery("#heal_btn").attr("class") == "food_btn" || jQuery("#DailyConsumtionTrigger").hasClass("recoverEnergyBtn");
      }

      // resets the inactivity counter if the user is active in the game
      jQuery(document).on("click mousemove keyup keydown keypress", function() {
          gameInactivity = 0;
      });

      // check the user's game activity and feed if not active for more than 5 seconds; also, refresh if inactive for more than 1 hour
      setInterval(function() {
          if (energyAvailable() && foodAvailable() && gameInactivity >= 5) {
              energy.eatFood();
              if (gameRefresh > 3600) {
                  location.reload();
                  gameRefresh = 0;
              }
              gameInactivity = 0;
          }
          gameInactivity++;
          gameRefresh++;
      }, 1000);

    });
}