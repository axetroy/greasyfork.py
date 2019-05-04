// ==UserScript==
// @name        LoadLadyRoyale
// @author      Whisperer
// @copyright   Whisperer, 2017
// @license     BSD 4-clause license
// @description For Planets.nu -- LoadLadyRoyale plugin
// @namespace   LoadLadyRoyale/planets.nu
// @include     http://planets.nu/*
// @include     http://play.planets.nu/*
// @include     http://test.planets.nu/*
// @version     0.4
// @grant       none
// ==/UserScript==

var llr_show = true;
var llr_turn = 0;

llr_run function () {
  var llr_index;
  var llr_length = vgap.ships.length;

  for(llr_index = 0; llr_index < llr_length; llr_index++) {
    if(vgap.ships[llr_index].ownerid == vgap.player.id) {
      if(vgap.ships[llr_index].hullid == 42) {
	var pa = vgap.planetAt(vgap.ships[llr_index].x, vgap.ships[llr_index].y);
	if(pa != null) {
	  if(pa.isbase) {
	    var llr_min_clans = 1;
	    if(pa.nativeracename == "Amorphous") {
	      llr_min_clans = 6;
	      if((pa.colonisthappypoints + pa.colhappychange) < 90) {
		pa.llr_min_clans += (90 - (pa.colonisthappypoints + pa.colhappychange));
	      }
	    }
	    if(pa.clans > llr_min_clans) {
	      var clans_to_transfer = 160;
	      clans_to_transfer -= vgap.ships[llr_index].ammo;
	      clans_to_transfer -= vgap.ships[llr_index].clans;
	      clans_to_transfer -= vgap.ships[llr_index].duranium;
	      clans_to_transfer -= vgap.ships[llr_index].molybdenum;
	      clans_to_transfer -= vgap.ships[llr_index].supplies;
	      clans_to_transfer -= vgap.ships[llr_index].tritanium;
	      if(clans_to_transfer >= (pa.clans - llr_min_clans - 1)) {
		clans_to_transfer = pa.clans - llr_min_clans;
	      }
	      if(clans_to_transfer > 0) {
		vgap.ships[llr_index].changed = 1;
		vgap.ships[llr_index].clans += clans_to_transfer;
		pa.changed = 1;
		pa.clans -= clans_to_transfer;
	      }
	    }
	    // OPTIONAL - Set Primary Orders to "Unload all freighters"
	    //var starbase = vgap.getStarbase(pa.id);
	    //if(starbase != null) {
	      //if(starbase.mission != 4) {
		//starbase.changed = 1;
		//starbase.mission = 4;
	      //}
	    //} // END OPTIONAL code
	  } // END ISBASE
	} // END PA
      } // END HullID
    } // END Owner
  } // END While
  llr_show = false;
  // UNKNOWN; // Refresh the Dashboard's left-hand menu
} // END llr_run

var llr_plugin = {
  loaddashboard: function() {
    if(llr_show && llr_turn == vgap.settings.turn) {
      vgap.dash.addLeftMenuItem("Load Lady Royale", llr_run, $("#DashboardMenu"));
    }
  },
  processload: function() {
    llr_show = true;
    llr_turn = vgap.settings.turn;
  },
}

var name = GM_info.script.name;
var version = GM_info.script.version;
vgap.registerPlugin(plugin, name);
console.log(name + " v"+version+" planets.nu plugin registered");

var script = document.createElement("script");
script.type = "application/javascript";
script.textContent = name;
document.body.appendChild(script);