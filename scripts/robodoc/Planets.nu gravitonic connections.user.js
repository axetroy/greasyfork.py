// ==UserScript==
// @name          Planets.nu gravitonic connections
// @description   Shows paths between planets that can be reached by gravitonic  and hyperjump connections
// @author        robodoc
// @license       Creative Commons Attribution 4.0 (CC BY 4.0)
// @include       http://planets.nu/home
// @include       http://planets.nu/games/*
// @include       http://*.planets.nu/*
// @include       https://*.planets.nu/*
// @include       http://planets.nu/*
// @include       https://planets.nu/*

// @version 2.1 (2018)
// @date          2018-10-07
// @namespace https://greasyfork.org/users/5275
// ==/UserScript==

// The movement information is based on the article 
// "Movement Limits Tim's Host: How far can you go?" by Stefan Reuther:
// http://www.phost.de/~stefan/movement.html

// Thanks to McNimble for suggesting improvements to version 2!
// 1. Fixed a line weight problem that caused this plugin to not play well with 
//    others such as Ion Storm Predictor.
// 2. Made some cosmetic improvements to make the Grav and HYP lines
//    easier on the eyes.

// Features:
// 1. The GravConnect tool shows paths between planets that can be reached by  gravitonic connections. Paths that can be reached by non-gravitonic engines are not shown.

// 2. The HYPConnect tool shows paths between planets that can be reached by hyperjump connections. 

// 3. The W9Connect tool is an improved version of the built-in connections tool. 

// Instructions: Click the "GravConnect" or "HYPConnect" items on the Map Tools menu to turn these features on and off.

function wrapper () { // wrapper for injection

if (vgap.version < 3) {

}
// NEW VERSION
else {
	// Change values from true to false if you do not want to show the features in your menu:
	var show_GravConnect = true;
	var show_HYPConnect = true;
	var show_W9Connect = true;
  
	var plugin = {
			
			/*
			 * processload: executed whenever a turn is loaded: either the current turn or
			 * an older turn through time machine 
			 */
			processload: function() {
			},	
			
			/*
			 * loaddashboard: executed to rebuild the dashboard content after a turn is loaded
			 */
			loaddashboard: function() {
			},

			/*
			 * showdashboard: executed when switching from starmap to dashboard
			 */
			showdashboard: function() {

			},
			
			/*
			 * showsummary: executed when returning to the main screen of the dashboard
			 */
			showsummary: function() {
			},
			
			/*
			 * loadmap: executed after the first turn has been loaded to create the map
			 * as far as I can tell not executed again when using time machine
			 */
			loadmap: function() {
				vgap.map.gravconnect = false;
				 if (show_GravConnect) vgap.map.addMapTool("GravConnect", "ShowMinerals", function () {
					if (vgap.map.gravconnect) {
						vgap.map.gravconnect = false;
						vgap.map.draw();
					} else {
						vgap.map.gravconnect = true;
						vgap.plugins["GravConnect"].renderGravConnections();
						vgap.map.draw();
					}
                		} );
				vgap.map.hypconnect = false;
				if (show_HYPConnect) vgap.map.addMapTool("HYPConnect", "ShowMinerals", function () {
					if (vgap.map.hypconnect) {
						vgap.map.hypconnect = false;
						vgap.map.draw();
					} else {
						vgap.map.hypconnect = true;
						vgap.plugins["GravConnect"].renderHypConnections();
						vgap.map.draw();
					}
                		} );
				vgap.map.w9connect = false;
				if (show_W9Connect) vgap.map.addMapTool("W9Connect", "ShowMinerals", function () {
				    //vgap.map.w9connect.toggleClass("selectedmaptool")
					if (vgap.map.w9connect) {
						vgap.map.w9connect = false;
						vgap.map.draw();
					} else {
						vgap.map.w9connect = true;
						vgap.plugins["GravConnect"].renderW9Connections();
						vgap.map.draw();
					}
                		} );
			},
			
			/*
			 * showmap: executed when switching from dashboard to starmap
			 */
			showmap: function() {
			},
			
			/*
			 * draw: executed on any click or drag on the starmap
			 */			
			draw: function() {
			    if (vgap.map.gravconnect) 
				vgap.plugins["GravConnect"].renderGravConnections();
			    if (vgap.map.hypconnect) 
				vgap.plugins["GravConnect"].renderHypConnections();
			    if (vgap.map.w9connect) 
				vgap.plugins["GravConnect"].renderW9Connections();
			},		
			
			/*
			 * loadplanet: executed a planet is selected on dashboard or starmap
		 	 * loadstarbase: executed a planet is selected on dashboard or starmap
			 * Inside the function "load" of vgapPlanetScreen (vgapPlanetScreen.prototype.load) the normal planet screen 
			 * is set up. You can find the function in "nu.js" if you search for 'vgap.callPlugins("loadplanet");'.
			 * 
			 * Things accessed inside this function several variables can be accessed. Elements accessed as "this.X" 
			 * can be accessed here as "vgap.planetScreen.X".
			 */
			loadplanet: function() {
			},
			
			/*
			 * loadstarbase: executed a planet is selected on dashboard or starmap
			 * Inside the function "load" of vgapStarbaseScreen (vgapStarbaseScreen.prototype.load) the normal starbase screen 
			 * is set up. You can find the function in "nu.js" if you search for 'vgap.callPlugins("loadstarbase");'.
			 * 
			 * Things accessed inside this function several variables can be accessed. Elements accessed as "this.X" 
			 * can be accessed here as "vgap.starbaseScreen.X".
			 */
			loadstarbase: function() {
			},
			
			/*
			 * loadship: executed a planet is selected on dashboard or starmap
			 * Inside the function "load" of vgapShipScreen (vgapShipScreen.prototype.load) the normal ship screen 
			 * is set up. You can find the function in "nu.js" if you search for 'vgap.callPlugins("loadship");'.
			 * 
			 * Things accessed inside this function several variables can be accessed. Elements accessed as "this.X" 
			 * can be accessed here as "vgap.shipScreen.X".
			 */
			loadship: function() {},
			
			// END PLUGIN FUNCS
			

		    renderGravConnections: function() {
			//console.log("Rendering connections" );
			var ctx = vgap.map.ctx
			ctx.beginPath();
			for (var i = 0; i < vgap.planets.length; i++) {
			    var planetA = vgap.planets[i];
			    for (var j = i + 1; j < vgap.planets.length; j++) {
				var planetB = vgap.planets[j];
				var dist = Math.dist(planetA.x, planetA.y, planetB.x, planetB.y);
				var connection = false;
				if (dist > 83.5 && dist <= 165.505) {
					if (dist <= 165.0) {
						// This should always be a valid connection
						connection = true;
					} else {
						// This will be close, so check individual points in warp well
						connection = vgap.plugins["GravConnect"].checkGravConnection(planetA.x, planetA.y, planetB.x, planetB.y);
					}
				}
				if (connection) {
				    ctx.moveTo(vgap.map.screenX(planetA.x), vgap.map.screenY(planetA.y));
				    ctx.lineTo(vgap.map.screenX(planetB.x), vgap.map.screenY(planetB.y));
				}
			    }
			}
			ctx.closePath();
			//ctx.strokeStyle = "#8B0000";
			ctx.strokeStyle = "#ff4545"; // lightened color suggested by McNimble
			ctx.lineWidth = 0.5; // finer line weight suggested by McNimble
			ctx.stroke();
			ctx.lineWidth = 1; // suggested by McNimble
			//console.log("Rendered connections" );
		    },

		    checkGravConnection: function(Ax,Ay,Bx,By) {
			//console.log("Rendering connections" );
			// Determine if a point in the warp well is within the "maximum safe distance"
			var delx = [3.0,2.0,0,-2.0,-3.0,-2.0,0,2.0];
			var dely = [0,2.0,3.0,2.0,0,-2.0,-3.0,-2.0];
			var Bx2, By2;
			for (var i = 0; i < delx.length; i++) {
				Bx2 = Bx + delx[i];
				By2 = By + dely[i];
				var dist = Math.dist(Ax, Ay, Bx2, By2);
				if (dist < 162.505) {
					//console.log("Safe distance at ",dist," to point in warp well");
					return true;
				}
			}
			// Determine if a point in the warp well beyond the "maximum safe distance" can be reached exactly 
			var exactx = [89,92,99,104,113,114,115,116,117,125,129,134,136];
			var exacty = [136,134,129,125,117,116,115,114,113,104,99,92,89];
			for (var i = 0; i < delx.length; i++) {
				Bx2 = Bx + delx[i];
				By2 = By + dely[i];
				for (var j = 0; j < exactx.length; j++) {	
					if (Math.abs(Bx2-Ax) == exactx[j] && Math.abs(By2-Ay) == exacty[j]) {
						//console.log("Beyond max safe distance at ",Math.dist(Ax, Ay, Bx2, By2)," to point in warp well");
						return true;
					}
				}
			}
			//console.log("Connection not made for a distance of ",Math.dist(Ax, Ay, Bx, By));
			return false;
			//console.log("Rendered connections" );
		    },

		    renderHypConnections: function() {
			//console.log("Rendering connections" );
			var ctx = vgap.map.ctx
			ctx.beginPath();
			for (var i = 0; i < vgap.planets.length; i++) {
			    var planetA = vgap.planets[i];
			    for (var j = i + 1; j < vgap.planets.length; j++) {
				var planetB = vgap.planets[j];
				var dist = Math.dist(planetA.x, planetA.y, planetB.x, planetB.y);
				var connection = false;
				if (dist >= 337 && dist <= 363) {
					if (dist >= 340 && dist <= 360) {
						// This should always be a valid connection
						connection = true;
					} else {
						// This will be close, so check individual points in warp well
						connection = vgap.plugins["GravConnect"].checkHypConnection(planetA.x, planetA.y, planetB.x, planetB.y);
					}
				}
				if (connection) {
				    ctx.moveTo(vgap.map.screenX(planetA.x), vgap.map.screenY(planetA.y));
				    ctx.lineTo(vgap.map.screenX(planetB.x), vgap.map.screenY(planetB.y));
				}
			    }
			}
			ctx.closePath();
			ctx.strokeStyle = "#8FBC8F";
			ctx.lineWidth = 0.5; // finer line weight suggested by McNimble
			ctx.stroke();
			ctx.lineWidth = 1; // suggested by McNimble
			//console.log("Rendered connections" );
		    },
 
		    checkHypConnection: function(Ax,Ay,Bx,By) {
			//console.log("Rendering Hyp connections" );
			// Determine if a point in the warp well can be jumped to to reach the planet
			var Bx2, By2;
			for (var i = -2; i < 2; i++) {
				for (var j = -2; j < 2; j++) {
					if (Math.abs(i) !=2) 
						if (Math.abs(j) !=2) continue; // skip inner pixels
					Bx2 = Bx + i;
					By2 = By + j;
					var dist = Math.dist(Ax, Ay, Bx2, By2);
					if (dist >= 340 && dist <= 360) {
						//console.log("Hyp Connection made for a distance of ",Math.dist(Ax, Ay, Bx, By));
						return true;
					}
				}
			}
			//console.log("Hyp Connection not made for a distance of ",Math.dist(Ax, Ay, Bx, By));
			return false;
			//console.log("Rendered Hyp connections" );
		    },      
	
		    renderW9Connections: function() {
			//console.log("Rendering connections" );
			var ctx = vgap.map.ctx
			ctx.beginPath();
			for (var i = 0; i < vgap.planets.length; i++) {
			    var planetA = vgap.planets[i];
			    for (var j = i + 1; j < vgap.planets.length; j++) {
				var planetB = vgap.planets[j];
				var dist = Math.dist(planetA.x, planetA.y, planetB.x, planetB.y);
				var connection = false;
				if (dist <= 84.57) {
					if (dist <= 83.5) {
						// This should always be a valid connection
						connection = true;
					} else {
						// This will be close, so check individual points in warp well
						connection = vgap.plugins["GravConnect"].checkW9Connection(planetA.x, planetA.y, planetB.x, planetB.y);
					}
				}
				if (connection) {
				    ctx.moveTo(vgap.map.screenX(planetA.x), vgap.map.screenY(planetA.y));
				    ctx.lineTo(vgap.map.screenX(planetB.x), vgap.map.screenY(planetB.y));
				}
			    }
			}
			ctx.closePath();
			ctx.strokeStyle = "#FA8072";
			ctx.lineWidth = 1; // suggested by McNimble
			ctx.stroke();
			//console.log("Rendered connections" );
		    },		
			
		    checkW9Connection: function(Ax,Ay,Bx,By) {
			//console.log("Rendering connections" );
			// Determine if a point in the warp well is within the "maximum safe distance"
			var delx = [3.0,2.0,0,-2.0,-3.0,-2.0,0,2.0];
			var dely = [0,2.0,3.0,2.0,0,-2.0,-3.0,-2.0];
			var Bx2, By2;
			for (var i = 0; i < delx.length; i++) {
				Bx2 = Bx + delx[i];
				By2 = By + dely[i];
				var dist = Math.dist(Ax, Ay, Bx2, By2);
				if (dist < 81.57) {
					//console.log("Safe distance at ",dist," to point in warp well");
					return true;
				}
			}
			// Determine if a point in the warp well beyond the "maximum safe distance" can be reached exactly 
			var exactx = [48,66];
			var exacty = [66,48];
			for (var i = 0; i < delx.length; i++) {
				Bx2 = Bx + delx[i];
				By2 = By + dely[i];
				for (var j = 0; j < exactx.length; j++) {	
					if (Math.abs(Bx2-Ax) == exactx[j] && Math.abs(By2-Ay) == exacty[j]) {
						//console.log("Beyond max safe distance at ",Math.dist(Ax, Ay, Bx2, By2)," to point in warp well");
						return true;
					}
				}
			}
			//console.log("Connection not made for a distance of ",Math.dist(Ax, Ay, Bx, By));
			return false;
			//console.log("Rendered connections" );
		    },

	};
		
	// register your plugin with NU
	vgap.registerPlugin(plugin, "GravConnect");
    
}
    
} //wrapper for injection

var script = document.createElement("script");
script.type = "application/javascript";
script.textContent = "(" + wrapper + ")();";

document.body.appendChild(script);    
