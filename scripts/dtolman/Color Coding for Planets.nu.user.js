// ==UserScript==
// @name          Color Coding for Planets.nu
// @description   Color codes planets and ships by race on Planets.nu map
// @include       http://play.planets.nu/*
// @include 	  http://test.planets.nu/*
// @include 	  http://planets.nu/*
// @version 2.3.6
// @namespace https://greasyfork.org/users/2860
// ==/UserScript==

// 1. Color codes planets and ships by race on Planets.nu map
// 2. v0.5 - now activates or deactivates from Settings screen!
// 3. v0.7 - now activates or deactivates default color for user from Settings screen
// 4. v0.81 - now saves settings for the user to a cookie, when changed from the Settings Screen
// 5. v0.90 - First 11 race colors, unknown planets, and unoccupied planets now configurable from Settings Screen!
// 6. v1.0 - Fully functional! Uses color gradient for all planets. Displays color gradiant on Settings Screen (FF only, will tackle Chrome later)
// 7. v1.1 - Chrome and FF color preview. Gradient colors for standard game races, info, and unknown
// 8. v1.2 - Redraws colors on maps after any setting changes. Different sized circles around planets for Own Ships, Ally, and Enemy. Own ships will always have correct color
// 9. v1.3 - rewrote Settings changes to play nicely with other mods. 
// 10.v1.4 - added in support for users changing colors beyond race 11 (settings page does not refresh, so hit the settings button again to see the changes).
// 11.v1.5,1.51 - added support for new play.planets.nu client
// 12.v1.6 - New note colors that match the mod.
// 13.v1.61 - added support for new planets urls
// 14.v1.7 - Adds planets v3 API support
// 15.v1.81 - Now shows ship names with explosions (formerly a separate script). Fixed colors in the diplomacy screen color picker (if you ever want to use this with the mod).
// 16.v1.9 - Graphics change for cloaked ships on map
// 17.v2.0 - Split from codebase for original planets.nu implementation
// 18.v2.1 - Fixes multiple bugs. Minefields laid in other races name are displayed with the Unknown Owner color (previously would not work with color mod).
// 19.v2.11 - Fixes bug which results in allied ships not appearing properly around planets
// 20.v2.12 - Imports performance improving changes from planets.nu UI - should fix misc bugs and improve performance
// 21.v2.2 - Option to use Color Picker colors. New button to reset note colors to blank.
// 22.v2.21 - changed include so doesn't run on old client
// 23.v2.22,v.2.24 - updated to work with Sphere
// 24.v2.3 - Modifies mouse-over text for minefields so you can tell if web or regular minefield
// 25.v2.3.1 - Minor fixes
// 26.v2.3.2 - fixes compatibility issues with new planets.nu features
// 27.v2.3.3 - adds compability with new planets.nu features from December 2016
// 28.v2.3.4 - adds compability with new planets.nu features from April 2017
// 29.v2.3.5 - fixes problem where wrong colors are rendered for enemy/allied ships around planets when zoomed out.
// 30.v2.3.6 - added support for wormholes

function wrapper () { // wrapper for injection
       //var colors = ["white", "Green", "Crimson", "HotPink", "Lime", "Magenta", "Yellow", "Purple", "Gray", "Cyan", "Blue", "mediumslateblue", "sienna", "skyblue", "tomato","wheat", "lightcoral", "darkslategray", "teal", "firebrick", "olive", "mediumpurple", "lime", "indigo", "tan", "yellowgreen", "goldenrod", "aliceblue", "olivedrab", "orangered"];

       var colorsA =["#F0F8FF","#32CD32","#CD5C5C","#FFC0CB","#98FB98","#C0C0C0","#FFFF00","#EE82EE","#D3D3D3","#B0E0E6","#87CEFA","#7B68EE","#F4A460","#D2B48C","#FF6347","#F5DEB3","#F08080","#2F4F4F","#008080","#B22222","#808000","#9370DB","#00FF00","#4B0082","#D2B48C","#9ACD32", "#DAA520","#F0F8FF","#6B8E23","#FF4500"];
       var colorsA2 =["#FFFFFF","#006400","#FF0000","#FF69B4","#00FA9A","#6A5ACD","#FFD700","#9400D3","#808080","#00CED1","#4169E1","#7B68EE","#A0522D","#87CEEB","#FF6347","#F5DEB3","#F08080","#2F4F4F","#008080","#B22222","#808000","#9370DB","#00FF00","#4B0082","#D2B48C","#9ACD32", "#DAA520","#F0F8FF","#6B8E23","#FF4500"];

	
    var modInfo="#F4A460";//chocolate
    var modInfo2="#D2691E";//chocolate

    var modUnknown="#FFF8DC"; //Tan
    var modUnknown2="#D2B48C"; //Tan
    var	modRace=12;	
	var useColorPicker=0;
		       

// Fed - White
// Lizard - Green
// Birds - Crimson
// Fascists - Pink
// Privateers - Lime
// Cyborg - Magenta
// Crystals - Yellow
// Empire - Purple
// Robots - Gray
// Rebels - Aqua	
// Colonies - Blue 

var activeColorMod=null;//default true
var defaultMyColor=null;//default true
var useCustomColor=false;//have we checked Cookie
var firstLoad=true;


var oldShow = geoSimpleColorPicker.prototype.show;


geoSimpleColorPicker.prototype.show = function (targetId, callback) {
       	if (activeColorMod==false)
		{
		oldShow.apply(this,arguments);
		}
	else 
		{
        this.picker = $("<div style='position:absolute;background-color:#000;padding:4px;z-index:999;'></div>").hide().appendTo("body");
        this.target = $("#" + targetId);
       
        this.callback = callback;
        
        //colors table
        var objX = new Array('00', '33', '66', '99', 'CC', 'FF');
        html = '<table bgcolor="#000" border="0" cellpadding="0" cellspacing="0" style="padding:2px;"><tr>';
        var br = 1;
        for (o = 0; o < 6; o++) {
            html += '</tr><tr>';
            for (y = 0; y < 6; y++) {
                if (y == 3) { html += '</tr><tr>'; }
                for (x = 0; x < 6; x++) {
                    var grid = objX[o] + objX[y] + objX[x];
                    html += '<td><div title="#' + grid + '" onclick="colorPicker.selectColor(\'' + grid + '\');" style="cursor:pointer;margin: 1px;width:20px;height:20px;background-color:#' + grid + '"></div></td>';
                }
            }
        }
        html += '</tr></table>';

        //greys table
        var objX = new Array('0', '3', '6', '9', 'C', 'F');
        html += '<table bgcolor="#000" border="0" cellpadding="0" cellspacing="0" style="padding:2px;"><tr>';
        var br = 0;
        for (y = 0; y < 6; y++) {
            for (x = 0; x < 6; x++) {
                if (br == 18) {
                    br = 0;
                    html += '</tr><tr>';
                }
                br++;
                var grid = objX[y] + objX[x] + objX[y] + objX[x] + objX[y] + objX[x];
                html += '<td><div title="#' + grid + '" onclick="colorPicker.selectColor(\'' + grid + '\');" style="cursor:pointer;margin: 1px;width:20px;height:20px;background-color:#' + grid + '"></div></td>';
            }
        }
        html += "</tr></table>";
        
        html += '<table bgcolor="#000" border="0" cellpadding="0" cellspacing="0" style="padding:2px;"><tr>';
        var br = 0;
        for (y = 0; y < 2; y++) {
            for (x = 0; x < 10; x++) {
                if (br == 10) {
                    br = 0;
                    html += '</tr><tr>';
                }
                br++;
                var grid;
                if (y==0)
                {
                    if (colorsA[x].charAt(0)=='#')
                        grid = colorsA[x].substring(1,colorsA.length);
                    else
                        grid = colorsA[x];
                }
                else
                { 
                    if (colorsA2[x].charAt(0)=='#')
                        grid = colorsA2[x].substring(1,colorsA2.length);
                    else
                        grid = colorsA2[x];
                }
                html += '<td><div title="#' + grid + '" onclick="colorPicker.selectColor(\'' + grid + '\');" style="cursor:pointer;margin: 1px;width:20px;height:20px;background-color:#' + grid + '"></div></td>';
            }
        }
        html += '<table bgcolor="#000" border="0" cellpadding="0" cellspacing="0" style="padding:2px;"><tr>';
        html += '<td><div title="clear" onclick="colorPicker.selectColor(\'clear\');" style="cursor:pointer;margin: 1px;width:80px;height:20px;text-align:center;border: solid 1px #fff;color: #fff;">CLEAR</div></td>';        
        html += "</tr></table>";
        this.picker.css("left", this.target.offset().left);
        this.picker.css("top", this.target.offset().top + this.target.height() + 10);
        this.picker.html(html);
	if (vgaPlanets.prototype.version>=3)
	$(".cpselect").tclick(function () { colorPicker.selectColor($(this).data("color")); });
        this.picker.show();
    }
    
};

// vgap3.js functions


var oldDraw = vgapMap.prototype.draw;

vgapMap.prototype.draw = function (fast, ctx, skipUserContent, secondCanvas) {

//check Color Mod Settings
checkColorModSettings();
if (activeColorMod==false)
	{
	oldDraw.apply(this,arguments);
	}
else 
	{
        if (drawing)
            return;
        
        //remove planet names (and re-add at the end)
        $(".PlanetName").remove();
        $(".Pin").remove();
		
        this.startdrawtime = new Date;

        if (!ctx && fast) {
            this.drawFromSecond();

            if (vgap.accountsettings.livemeasuretool && this.measure && this.measures.length > 0) {
                var measure = this.measures[this.measures.length - 1];
                this.ctx.beginPath();
                this.drawLine(this.ctx, this.screenX(measure.x1), this.screenY(measure.y1), this.screenX(this.x), this.screenY(this.y), "cyan", 2);

                var dist = Math.dist(measure.x1, measure.y1, this.x, this.y);
                this.drawCircle(this.ctx, this.screenX(measure.x1), this.screenY(measure.y1), dist * this.zoom, colorToRGBA("#00FFFF", 0.4), 1);



                var txtX = this.x + Math.ceil(15 / this.zoom);
                if (this.x < measure.x1)
                    txtX = this.x - Math.ceil(15 / this.zoom);

                var txtY = this.y + Math.ceil(15 / this.zoom);
                if (this.y < measure.y1)
                    txtY = this.y - Math.ceil(15 / this.zoom);

                var txt = dist.toFixed(1);
                //if (totalDist > dist)
                //    txt += " - " + totalDist.toFixed(1);

                this.ctx.textBaseline = "middle";
                this.ctx.textAlign = "center";
                this.ctx.fillStyle = "#ffffff";
                this.ctx.fillText(txt, this.screenX(txtX), this.screenY(txtY));
            }
            this.showDrawTime(fast);
            return;
        }

        //if (!ctx && fast && this.spritecache().tiles) {
        //    this.drawFromTiles();
        //    this.showDrawTime(fast);
        //    return;
        //}

        var drawing = true;

        var fullrender = true;
        if (fast)
            fullrender = false;

        var sets = vgap.accountsettings;
        
        var drawUserContent = true;
        if (skipUserContent)
            drawUserContent = false;

        if (!ctx)
            ctx = this.ctx;

        ctx.fillStyle = "#000000";
        ctx.clearRect(0, 0, vgap.map.canvas.width, vgap.map.canvas.height);
		
		if (vgap.settings.isacademy) {
            var x = this.screenX(2000);
            var y = this.screenY(2000);
            var r = Math.ceil(vgap.settings.mapwidth) * this.zoom;
            var grad = ctx.createRadialGradient(x, y, 0, x, y, r);
            var a = (5 - Math.sqrt(Math.sqrt(this.zoom))) / 5;
            grad.addColorStop(0, "rgba(50, 25, 25, " + a + ")");
            grad.addColorStop(1, "rgba(50, 50, 25, 0)");
            ctx.fillStyle = grad;

            ctx.beginPath();
            ctx.arc(x, y, r, 0, Math.PI * 2, false);
            ctx.closePath();
            ctx.fill();
            //console.log(a);
        }
		
        if (this.activeShip) {
            vgap.shipScreen.predraw();
        }
		
        //Debris Disk stroke
        if (vgap.map.zoom >= 5 && fullrender) {
            for (var i = 0; i < vgap.debrisdisks.length; i++) {

                var planet = vgap.debrisdisks[i];
                var rad = planet.debrisdisk * vgap.map.zoom;

                var visible = this.isVisible(planet.x, planet.y, planet.debrisdisk);

                //if on this canvas
                if (visible) {

                    //draw rings
                    var screenX = this.screenX(planet.x);
                    var screenY = this.screenY(planet.y);

                    var color = "#ffffff";
                    ctx.strokeStyle = colorToRGBA(color, 0.1);
                    ctx.lineWidth = 2;

                    ctx.beginPath();
                    ctx.arc(screenX, screenY, rad, 0, Math.PI * 2, false);
                    ctx.closePath();
                    ctx.stroke();
                }
            }
            for (var i = 0; i < vgap.debrisdisks.length; i++) {
                var planet = vgap.debrisdisks[i];
                var rad = planet.debrisdisk * vgap.map.zoom - 2;

                var visible = this.isVisible(planet.x, planet.y, planet.debrisdisk);

                //if on this canvas
                if (visible) {

                    //draw centers
                    var screenX = this.screenX(planet.x);
                    var screenY = this.screenY(planet.y);

                    //blank centers (for overlapping circles)
                    ctx.fillStyle = "#111111";
                    ctx.beginPath();
                    ctx.arc(screenX, screenY, rad, 0, Math.PI * 2, false);
                    ctx.closePath();
                    ctx.fill();
                }
            }
        }

        //draw full detail grid
        var drawgrid = vgap.map.zoom >= 40;
        if (vgap.settings.isacademy)
            drawgrid = vgap.map.zoom >= 30;
        if (drawgrid && fullrender) {

            ctx.strokeStyle = "#222";
            ctx.lineWidth = 1;

            var gridsize = vgap.map.canvas.width / vgap.map.canvas.mapwidth;
            var srad = gridsize / 2;
            var x = Math.floor(vgap.map.canvas.x);
            
            for (var i = 0; i <= (vgap.map.canvas.mapwidth + 1) ; i++) {
                var y = Math.floor(vgap.map.canvas.y);
                for (var j = 0; j <= (vgap.map.canvas.mapheight + 1) ; j++) {
                    var screenX = this.screenX(x);
                    var screenY = this.screenY(y);
                    ctx.strokeRect(screenX - srad, screenY - srad, srad * 2, srad * 2);
                    ctx.strokeRect(screenX - 1, screenY - 1, 2, 2);
                    y++;
                }
                x++;
            }
        }

		if (vgap.settings.sphere && vgap.accountsettings.sphereborder)
        {
            ctx.strokeStyle = "#222";
            ctx.lineWidth = 1;
            ctx.strokeRect(this.screenX(2000 - vgap.settings.mapwidth/2 - 10), this.screenY(2000 + vgap.settings.mapheight/2 + 10), (vgap.settings.mapwidth + 20) * this.zoom, (vgap.settings.mapheight + 20) * this.zoom);
        }
		
        //nebulas
        if (vgap.nebulas && fullrender) {

            for (var i = 0; i < vgap.nebulas.length; i++) {
                var neb = vgap.nebulas[i];

                //var rad = neb.radius * vgap.map.zoom;
                var visible = this.isVisible(neb.x, neb.y, neb.radius);

                //if on this canvas
                if (visible) {
                    var screenX = this.screenX(neb.x);
                    var screenY = this.screenY(neb.y);
                    this.drawNebula(screenX, screenY, neb, ctx);
                }
            }
        }

        //stars
        if (vgap.stars && fullrender) {
            for (var i = 0; i < vgap.stars.length; i++) {
                var star = vgap.stars[i];

                //var rad = Math.sqrt(star.mass) * vgap.map.zoom;
                var visible = this.isVisible(star.x, star.y, Math.sqrt(star.mass));

                if (visible) {
                    var screenX = this.screenX(star.x);
                    var screenY = this.screenY(star.y);
					this.drawStar(screenX, screenY, star, ctx);
                }
            }
        }

        //minefields
        if (fullrender) {
            for (var i = 0; i < vgap.minefields.length; i++) {
                var minefield = vgap.minefields[i];
                var rad = minefield.radius * vgap.map.zoom;
                var visible = this.isVisible(minefield.x, minefield.y, minefield.radius);

                //if on this canvas
                if (visible) {

                    var screenX = this.screenX(minefield.x);
                    var screenY = this.screenY(minefield.y);
					this.drawMinefield(screenX, screenY, minefield.color, rad, ctx, minefield.isweb,minefield.ownercolor);
                }
            }
        }

        //ions
        if (fullrender) {
            for (var i = 0; i < vgap.ionstorms.length; i++) {
                var storm = vgap.ionstorms[i];

                var rad = storm.radius * vgap.map.zoom;
                var visible = this.isVisible(storm.x, storm.y, storm.radius);

                //if on this canvas
                if (visible) {
                    var screenX = this.screenX(storm.x);
                    var screenY = this.screenY(storm.y);
                    this.drawIon(screenX, screenY, storm.voltage, rad, ctx, storm);
                }
            }
        }

		//wormholes
        if (fullrender && vgap.wormholes) {
            for (var i = 0; i < vgap.wormholes.length; i++) {
                var wormhole = vgap.wormholes[i];

                var rad = this.planetRad(wormhole);

                var hasEntrance = (wormhole.x != 0 && wormhole.y != 0);
                var hasExit = (wormhole.targetx != 0 && wormhole.targety != 0);

                if (hasEntrance) {

                    var x = wormhole.x;
                    var y = wormhole.y;

                    var visible = this.isVisible(x, y, 3);

                    //if on this canvas
                    if (visible) {
                        var screenX = this.screenX(x);
                        var screenY = this.screenY(y);
                        this.drawWormHole(screenX, screenY, rad, false, wormhole, ctx);
                    }
                }

                if (hasExit) {

                    var x = wormhole.targetx;
                    var y = wormhole.targety;

                    var visible = this.isVisible(x, y, 3);

                    //if on this canvas
                    if (visible) {
                        var screenX = this.screenX(x);
                        var screenY = this.screenY(y);
                        this.drawWormHole(screenX, screenY, rad, true, wormhole, ctx);
                    }
                }

                if (hasEntrance && hasExit) {
                    ctx.beginPath();
                    this.drawLine(ctx, this.screenX(wormhole.x), this.screenY(wormhole.y), this.screenX(wormhole.targetx), this.screenY(wormhole.targety), colorToRGBA("#f69704", 0.2), 1);
                }
            }
        }
        //planets
        for (var i = 0; i < vgap.planets.length; i++) {

            var planet = vgap.planets[i];

            var skip = false;

            if (!skip) {
					var rad = this.planetRad(planet);
					var visible = this.isVisible(planet.x, planet.y, rad + 8);

					//if on this canvas
					if (visible) {

					var screenX = this.screenX(planet.x);
					var screenY = this.screenY(planet.y);

					//draw warp well
					if (vgap.map.zoom >= 10 && planet.debrisdisk == 0 && fullrender && !vgap.settings.isacademy) {

						ctx.fillStyle = "#000000";
						ctx.strokeStyle = "#555555";
						ctx.lineWidth = 1;
						for (var x = (planet.x - 3) ; x <= planet.x + 3; x++) {
							for (var y = (planet.y - 3) ; y <= planet.y + 3; y++) {
								if (Math.dist(x, y, planet.x, planet.y) <= 3) {
									var mX = this.screenX(x);
									var mY = this.screenY(y);
									var srad = vgap.map.zoom / 2;
									ctx.fillRect(mX - srad, mY - srad, srad * 2, srad * 2);
									ctx.strokeRect(mX - srad, mY - srad, srad * 2, srad * 2);
								}
							}
						}
					}
					this.drawPlanet(planet, ctx, fullrender);                
				}
			}
		}
		
        //Debris Disk Fill  
        if (fullrender) {
            for (var i = 0; i < vgap.debrisdisks.length; i++) {
                var planet = vgap.debrisdisks[i];
                var rad = planet.debrisdisk * vgap.map.zoom;

                var visible = this.isVisible(planet.x, planet.y, rad);

                //if on this canvas
                if (visible) {

                    //draw centers                
                    var screenX = this.screenX(planet.x);
                    var screenY = this.screenY(planet.y);
                    this.drawDebris(screenX, screenY, rad, ctx);
                }
            }
        }
		
		if (fullrender) {
			if (this.zoom > 40) {

				//ships in space only
				for (var i = 0; i < vgap.ships.length; i++) {
					var ship = vgap.ships[i];
					var rad = this.shipRad(ship);
					var visible = this.isVisible(ship.x, ship.y, rad);

					if (visible)
						this.drawShip(ship, ctx);

				}
			}
			else {
				//ships in space only
				for (var i = 0; i < vgap.inspace.length; i++) {
					var ship = vgap.inspace[i];
					var rad = this.shipRad(ship);
					var visible = this.isVisible(ship.x, ship.y, rad);

					if (visible) 
						this.drawShip(ship, ctx);
					
				}
			}
		}
        //Explosions
        if (fullrender) {
            for (var i = 0; i < vgap.explosions.length; i++) {
                var message = vgap.explosions[i];
				
                var screenX = this.screenX(message.x);
                var screenY = this.screenY(message.y);
                var rad = 4;
                if (message.fatal)
                    rad = 6;

                // Stroked X
                ctx.beginPath();
                ctx.moveTo(screenX - rad, screenY - rad);
                ctx.lineTo(screenX + rad, screenY + rad);
                ctx.moveTo(screenX + rad, screenY - rad);
                ctx.lineTo(screenX - rad, screenY + rad);
                ctx.closePath();

                ctx.strokeStyle = message.color;
                ctx.lineWidth = 2;
                ctx.stroke();
			
                if (message.messagetype == 10)
					ctx.fillText( message.body.substr(message.body.indexOf("the name of the ship was:")+"the name of the ship was:".length),screenX+20,screenY+14);
            }
        }
		
		//event callout for user scripts
        if (fullrender)
				vgap.callPlugins("draw");

        //user content
        if (drawUserContent && fullrender)
            this.drawUserChangeable(ctx);


        //if (fast) {
        //    if (vgap.map.drawtimer)
        //        clearTimeout(vgap.map.drawtimer);
        //    vgap.map.drawtimer = setTimeout(function () { vgap.map.draw(); }, 200);
        //}

        //copy to second canvas for slow panning
		vgap.map.ctx2.clearRect(0, 0, vgap.map.canvas.width, vgap.map.canvas.height);
        vgap.map.ctx2.drawImage(vgap.map.canvas, 0, 0);
        vgap.map.canvas2.x = vgap.map.canvas.x;
        vgap.map.canvas2.y = vgap.map.canvas.y;
        vgap.map.canvas2.zoom = vgap.map.zoom;
        vgap.map.canvas2.centerX = vgap.map.centerX;
        vgap.map.canvas2.centerY = vgap.map.centerY;


        drawing = false;
        this.showDrawTime(fast);
    }
};
    
    
var oldSetMineColors = vgaPlanets.prototype.setMineColors;

vgaPlanets.prototype.setMineColors =  function (minefield) {
checkColorModSettings();
var sets = vgap.accountsettings;
if (activeColorMod==false)
	{
	oldSetMineColors.apply(this,arguments);
	}

	else if (vgaPlanets.prototype.version>=3)
	{
	if ((defaultMyColor==true)&&(minefield.ownerid == vgap.player.id))
        	minefield.color = sets.mymines;
 	else //use new colors
		{
		if (minefield.ownerid>0)
			minefield.color=colorsA2[minefield.ownerid-1];  
		else minefield.color=modUnknown2;
		if (useColorPicker>0)
			{
			var relation = vgap.getRelation(minefield.ownerid);
			if (relation != null && relation.color && relation.color != "")
				minefield.color = "#" + relation.color;
			}
		}
	}

};

var oldDrawPlanet = vgapMap.prototype.drawPlanet;

vgapMap.prototype.drawPlanet = function(planet, ctx,fullrender) 
{
if (activeColorMod==false)
	{
	oldDrawPlanet.apply(this,arguments);
	}
else 
	{
	    var x = this.screenX(planet.x);
        var y = this.screenY(planet.y);
        var rad = this.planetRad(planet);

        var from = planet.colorfrom;
        var to = planet.colorto;

		var bg = colorToRGBA(to, 0.2);
		
        if (vgap.godmode) {
            if (planet.flag == 1) {
                from = "#ffffff";
                to = "#0000ff";
                if (this.putHypCircle) {
                    //this.hypcircles = [];
                    this.hypcircles.push({ x: planet.x, y: planet.y });
                }
            } else if (planet.flag == 2) {
                from = "#ffffff";
                to = "#00ff00";
            }
        }
		
		if (planet.id < 0) {
            from = colorToRGBA(from, 0.5);
            to = colorToRGBA(to, 0.5);
        }

        if (vgap.settings.isacademy) {
            ctx.fillStyle = bg;
            ctx.fillRect(this.screenX(planet.x - 0.5), this.screenY(planet.y + 0.5), this.zoom, this.zoom);
        }
		
        //on first draw create a sprite
        var spritekey = "planet" + from.substring(1) + to.substring(1) + planet.isbase + (planet.debrisdisk > 0) + (planet.id < 0);
        this.drawPlanetSprite(spritekey, rad, from, to, planet.isbase);

        var grad = ctx.createLinearGradient(x - rad, y - rad, x + rad, y + rad);
        grad.addColorStop(0, from);
        grad.addColorStop(1, to);
        ctx.fillStyle = grad;

        if (((this.zoom > 20 && planet.debrisdisk == 0) || (this.zoom > 100 && planet.debrisdisk > 0)) && vgap.animations && fullrender && vgap.map.fastrendering) {

            if (planet.scale)
                rad *= planet.scale;

            //draw the image of the planet
            if (!planet.imgObj) {
                planet.imgObj = new Image();
                planet.imgObj.onload = function () { vgap.map.draw(); };
                planet.imgObj.src = planet.img;
                if (planet.debrisdisk > 0) {
                    planet.rotation = Math.random() * Math.PI;
                    planet.scale = Math.random() * 0.5 + 0.5;
                }
            }
            else {
                if (planet.rotation > 0) {
                    //draw rotated version
                    ctx.save();
                    ctx.translate(x, y);
                    ctx.rotate(planet.rotation);
                    ctx.drawImage(planet.imgObj, -rad, -rad, rad * 2, rad * 2);
                    ctx.restore();
                }
                else
                    ctx.drawImage(planet.imgObj, x - rad, y - rad, rad * 2, rad * 2);

            }

            if (planet.isbase) {
                var sb = vgap.getStarbase(planet.id);
                ctx.drawImage(vgap.sbimg[sb.starbasetype], x+(rad/3), y-rad, rad/1.5, rad/1.5);
            }
        }
        else if (vgap.map.zoom <= 2) {
            this.drawSprite(ctx, spritekey, x, y, rad + 1);
        }
        else {
            if (planet.isbase) {
                ctx.fillRect(x - rad, y - rad, rad * 2, rad * 2);
            }
            else {
                ctx.beginPath();
                ctx.arc(x, y, rad, 0, Math.PI * 2, false);
                ctx.closePath();
                ctx.fill();
            }
        }
    
        //stroke the planet appropriately
        if (this.zoom < 40 && fullrender) 
		{
            //this should result with multiple rings of different colors for your ships, an allied ship, and an enemy ship.
			var sets = vgap.accountsettings;

			var color;
			var shipsAt = vgap.shipsAt(planet.x, planet.y);
			for (var j = 0; j < shipsAt.length; j++)
			{
				var number=shipsAt[j].ownerid;
				color=colorsA2[number-1];
				if (shipsAt[j].ownerid == vgap.player.id)
					planet.myShip = true;
				else 
				{
					var relation = vgap.getRelation(shipsAt[j].ownerid)
					if (relation != null && relation.color && relation.color != "")
						planet.colorShip = relation.color;
					else if (vgap.allied(shipsAt[j].ownerid))
						planet.allyShip = true;
					else
						planet.enemyShip = true;
				}
			}

			if (planet.myShip) {
				if (defaultMyColor==true)
					ctx.strokeStyle = sets.myshipfrom;
				else
					ctx.strokeStyle =colorsA2[vgap.player.id-1];
					
				 this.drawPlanetStrokeSprite("myplanetship", 12, colorsA2[vgap.player.id-1]);
				
				ctx.lineWidth = 1;
				ctx.beginPath();
				ctx.arc(x, y, rad + 2, 0, Math.PI * 2, false);
				ctx.closePath();
				ctx.stroke();
			}
			if (planet.allyShip||planet.colorShip) {

					this.drawPlanetStrokeSprite("enemyplanetship", 10, color);

					//if (vgap.map.zoom <= 2) 
					//	this.drawSprite(ctx, "enemyplanetship", x, y, rad + 5);				
					//else {

						ctx.strokeStyle = color;
						ctx.lineWidth = 1;
						ctx.beginPath();
						ctx.arc(x, y, rad + 4, 0, Math.PI * 2, false);
						ctx.closePath();
						ctx.stroke();
					//}
				}
			if (planet.enemyShip) {
				this.drawPlanetStrokeSprite("enemyplanetship", 14, color);
			//	if (vgap.map.zoom <= 2) {
				//	  this.drawSprite(ctx, "enemyplanetship", x, y, rad + 5);
			//	 }
			//	else {
				ctx.strokeStyle = color;
				ctx.lineWidth = 1;
				ctx.beginPath();
				ctx.arc(x, y, rad + 6, 0, Math.PI * 2, false);
				ctx.closePath();
				ctx.stroke();
			//	}
			}
        }
        if (planet.note && planet.note.body.length > 0 && fullrender) {
            ctx.strokeStyle = "#FFFF00";
            ctx.lineWidth = 1;
            ctx.strokeRect(x - rad - 1, y - rad - 1, (rad + 1) * 2, (rad + 1) * 2);
        }        
	}
};
    

var oldDrawMinefield = vgapMap.prototype.drawMinefield;

vgapMap.prototype.drawMinefield = function (x, y, color, rad, ctx,isweb,bordercolor) 
{
if (activeColorMod==false)
	{
	oldDrawMinefield.apply(this,arguments);
	}
else 
	{	        
	var grad = ctx.createRadialGradient(x, y, 0, x, y, rad);
	var spritekey = "mine" + color.substring(1);
	 if (!vgap.map.sprites[spritekey]) {
	        sctx = vgap.map.spritectx;
            var soffset = vgap.map.spriteindex * vgap.map.spritewidth;
            var srad = 24;
            var sx = soffset + srad+1;
            var sy = srad+1;

            var grad = sctx.createRadialGradient(sx, sy, 0, sx, sy, srad);
			if (isweb==false)
			{
			grad.addColorStop(0, colorToRGBA(color, 0.4));
			grad.addColorStop(1, colorToRGBA(color, 0.2));
			}
			else
			{
				grad.addColorStop(0.9, colorToRGBA(color, 0.15));
				grad.addColorStop(1, colorToRGBA(color, 0.3));
        	}
            sctx.fillStyle = grad;

            sctx.beginPath();
            sctx.arc(sx, sy, srad, 0, Math.PI * 2, false);
            sctx.closePath();
            sctx.fill();

            vgap.map.sprites[spritekey] = { key: spritekey, offset: soffset, width: (srad * 2 + 2) };
            vgap.map.spriteindex++;
        }
		if (vgap.map.zoom <= 1 && !vgap.map.fastrendering) {
            this.drawSprite(ctx, spritekey, x, y, rad + 1);
        }
		else{
			if (isweb==false)
			{
				grad.addColorStop(0, colorToRGBA(color, 0.4));
				grad.addColorStop(1, colorToRGBA(color, 0.2));
				}
			else
			{
				grad.addColorStop(0.9, colorToRGBA(color, 0.15));
				grad.addColorStop(1, colorToRGBA(color, 0.3));
        	}
			ctx.fillStyle = grad;

            if (bordercolor)
                ctx.strokeStyle = colorToRGBA(bordercolor, 0.2);
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(x, y, rad, 0, Math.PI * 2, false);
            ctx.closePath();
            ctx.fill();
            if (bordercolor)
                ctx.stroke();

            //centerpoint
            ctx.beginPath();
            ctx.arc(x, y, 1, 0, Math.PI * 2, false);
            ctx.closePath();
            ctx.fill();
			}
		
	}
};

var oldSetShipColors = vgaPlanets.prototype.setShipColors;

vgaPlanets.prototype.setShipColors =  function (ship) 
{
var sets = vgap.accountsettings;
if (activeColorMod==false)
	{
	oldSetShipColors.apply(this,arguments);
	}
else 
	{
		if ((defaultMyColor==true)&&(ship.ownerid == vgap.player.id)) 
		{
            		ship.colorfrom = sets.myshipfrom;
            		ship.colorto = sets.myshipto;
            
            
            if (ship.hullid >= 200 && ship.hullid <= 300) {
                ship.colorfrom = "#7a7a3e";
                ship.colorto = "#717131";
            }

            if (ship.hullid == 205) {
                ship.colorfrom = sets.myplanetfrom;
                ship.colorto = sets.myplanetto;
            }
            
	    		return;
        	}
		if(useColorPicker>0)
		{	
			var relation = vgap.getRelation(ship.ownerid);
			if (relation != null && relation.color != "") {
				ship.colorfrom = "#" + shadeColor(relation.color, 100);
				ship.colorto = "#" + shadeColor(relation.color, -100);
				return;
			}
		}
		if ((ship.ownerid>0)&&(ship.ownerid<30))
		{	
        		ship.colorfrom = colorsA[ship.ownerid-1];
        		ship.colorto = colorsA2[ship.ownerid-1];
			return;
		}
		//weird, but seems it can happen
		ship.colorfrom = modUnknown;
        	ship.colorto = modUnknown2;
		}
};

var oldSetPlanetColors = vgaPlanets.prototype.setPlanetColors;

vgaPlanets.prototype.setPlanetColors = function (planet) {
        
var sets = vgap.accountsettings;
if (activeColorMod==false)
	{
	oldSetPlanetColors.apply(this,arguments);
	}

else 
	{
        
        //determine rings required
        var shipsAt = vgap.shipsAt(planet.x, planet.y);
        for (var j = 0; j < shipsAt.length; j++) {
            
            if (shipsAt[j].ownerid == vgap.player.id)
                planet.myShip = true;
            else {
                var relation = vgap.getRelation(shipsAt[j].ownerid)
                var number=shipsAt[j].ownerid;
				color=colorsA2[number-1];
                if (relation != null && relation.color && relation.color != "")
                    planet.colorShip = color;
                else if (vgap.allied(shipsAt[j].ownerid))
                    planet.allyShip = true;
                else
                    planet.enemyShip = true;
            }
        }

        var sets = vgap.accountsettings;
		
		if (planet.note && planet.note.color != "") {
            planet.colorfrom = "#" + shadeColor(planet.note.color, 100);
            planet.colorto = "#" + shadeColor(planet.note.color, -100);
            return;
        }
		
		
        if ((defaultMyColor==true)&&(planet.ownerid == vgap.player.id)) 
		{
            planet.colorfrom = sets.myplanetfrom;
            planet.colorto = sets.myplanetto;
            return;
        }

        
	if(planet.ownerid==0&&planet.infoturn>0)
	{
		planet.colorfrom=modInfo;
		planet.colorto=modInfo2;
		return
	}
	if(planet.ownerid==0)
	{
		planet.colorfrom=modUnknown;
		planet.colorto=modUnknown2;
		return
	}
	
	if(useColorPicker>0)
	{
        var relation = vgap.getRelation(planet.ownerid);
        if (relation != null && relation.color != "") {
            planet.colorfrom = "#" + shadeColor(relation.color, 100);
            planet.colorto = "#" + shadeColor(relation.color, -100);
            return;
        }
		
	}
	
	planet.colorfrom=colorsA[planet.ownerid-1];
	planet.colorto=colorsA2[planet.ownerid-1]
    }
};



var oldLoadWaypoints = vgaPlanets.prototype.loadWaypoints;

vgaPlanets.prototype.loadWaypoints = function () {
    	if (activeColorMod==false)
		{
		oldLoadWaypoints.apply(this,arguments);
		}
	else 
		{

        var sets = vgap.accountsettings;

        this.waypoints = new Array();
        for (var i = 0; i < vgap.ships.length; i++) {
            //waypoint
            var ship = vgap.ships[i];
            if (ship.ownerid != vgap.player.id) {
                if (ship.heading != -1 && ship.warp != 0) {

                    var relation = vgap.getRelation(ship.ownerid);

                    var color = colorsA2[ship.ownerid-1];

                    var speed = vgap.getSpeed(ship.warp, ship.hullid);

                    var x2 = ship.x + Math.round(Math.sin(Math.toRad(ship.heading)) * speed);
                    var y2 = ship.y + Math.round(Math.cos(Math.toRad(ship.heading)) * speed);
                    ship.targetx = x2;
                    ship.targety = y2;
					if (useColorPicker>0)
						if (relation.color && relation.color != "")
							color = "#" + relation.color;
                    this.waypoints.push({ id: ship.id, x1: ship.x, y1: ship.y, x2: x2, y2: y2, color: color });

                    //this.waypoints.push(this.paper.path("M" + this.screenX(ship.x) + " " + this.screenY(ship.y) + "L" + this.screenX(x2) + " " + this.screenY(y2)).attr({ stroke: color, "stroke-width": "2", "stroke-opacity": 0.5 }));
                }
            }
            else {

                if (vgap.isChunnelling(ship)) {

                    var x = ship.x;
                    var y = ship.y;

                    //we are initiating a chunnel at warp speed inside a matrix
                    if (ship.warp > 0 && (ship.targetx != ship.x || ship.targety != ship.y)) {


                        var dasharray = null;
                        var color = sets.myshipto;

                        var next = vgap.getNextLoc(ship);

                        var waypoint = { id: ship.id, x1: x, y1: y, x2: next.x, y2: next.y, color: color, dasharray: dasharray };
                        this.waypoints.push(waypoint);
                        ship.lastwaypoint = waypoint;

                        x = next.x;
                        y = next.y;
                    }

                    var targetId = parseInt(ship.friendlycode, 10);
                    var target = vgap.getShipClosestCopy(targetId, ship.x, ship.y);
                    var dasharray = [9, 4];
                    var color = "#00FFFF";
                    if (ship.id < 0)
                        color = "rgba(0, 255, 255, 0.15)";
                    var linewidth = 2;
                    if (ship.hullid != 56 && ship.hullid != 114) {
                        dasharray = [5, 2];
                        color = "#009999";
                    }
                    if (vgap.multiChunnel(ship.x, ship.y, target.x, target.y)) {
                        linewidth = 6;
                        dasharray = [6,6];
                    }

                    this.waypoints.push({ id: ship.id, x1: x, y1: y, x2: target.x, y2: target.y, color: color, dasharray: dasharray, linewidth: linewidth });
                }
                else if (vgap.isTemporalLancing(ship)) {

                    var x = ship.x;
                    var y = ship.y;

                    var target = vgap.getTemporalLanceEndPoint(ship);
                    var dasharray = [9, 4];
                    var color = "#FF00FF";
                    var linewidth = 2;

                    this.waypoints.push({ id: ship.id, x1: x, y1: y, x2: target.x, y2: target.y, color: color, dasharray: dasharray, linewidth: linewidth });
                }
                else {

                    var dasharray = null;
			        var color;
					if (defaultMyColor==true)
						color = sets.myshipto;
					else 
					{
						color = colorsA2[ship.ownerid-1]; 
					}
                    var path = vgap.getPath(ship);
					
                    if (vgap.isHyping(ship)) {
                        color = "#F5F5DC";
                        dasharray = [2, 2];

						if (path.length > 0) {
                            var first = path[0];
                            var dist = Math.dist(first.x1, first.y1, first.x2, first.y2);
                            var mindist = 339.95;
                            var maxdist = 360.05;
                            var middist = 350;
                            if (vgap.settings.isacademy) {
                                mindist = 8;
                                maxdist = 9;
                                middist = 8.5;
                            }
                            if (dist < mindist || dist > maxdist) {
                                //now we just fly exactly 350
                                color = "#FF0000";
                                ship.heading = vgap.getHeading(first.x1, first.y1, first.x2, first.y2);
                                first.x2 = ship.x + Math.round(Math.sin(Math.toRad(ship.heading)) * middist);
                                first.y2 = ship.y + Math.round(Math.cos(Math.toRad(ship.heading)) * middist);
                            }
                        }
                    }
					
					//use tower path
                    var tower = vgap.isTowTarget(ship.id);
                    if (tower != null) 
                        path = vgap.getPath(tower);                    

                    
                    var startfuel = ship.neutronium;
                    for (var j = 0; j < path.length; j++) {
                        if (vgap.isHyping(ship) && j > 0)
                            break;
                        //change color for fuel shortage
                        var fuel = vgap.getFuelUsage(path[j].x1, path[j].y1, path[j].x2, path[j].y2, ship);
                        if (fuel > startfuel && tower == null)
                            color = "#ff6600";
                        
                        //pod color
                        if (ship.hullid >= 200 && ship.hullid < 300)
                            color = colorToRGBA("#7a7a3e", 0.1);
                        
                        startfuel -= fuel;

                        var waypoint = { id: ship.id, x1: path[j].x1, y1: path[j].y1, x2: path[j].x2, y2: path[j].y2, color: color, dasharray: dasharray };
                        this.waypoints.push(waypoint);
                        //                        this.waypoints.push(this.paper.path("M" + this.screenX(path[j].x1) + " " + this.screenY(path[j].y1) + "L" + this.screenX(path[j].x2) + " " + this.screenY(path[j].y2)).attr(params));
                        ship.lastwaypoint = waypoint;
                    }
                }
            }
        }
        for (var i = 0; i < vgap.ionstorms.length; i++) {
            var storm = vgap.ionstorms[i];
            if (storm.parentid == 0) {

                var x = storm.x;
                var y = storm.y;
                if (storm.centroid) {
                    x = storm.centroid.x;
                    y = storm.centroid.y;
                }

                var x2 = x + Math.round(Math.sin(Math.toRad(storm.heading)) * storm.warp * storm.warp);
                var y2 = y + Math.round(Math.cos(Math.toRad(storm.heading)) * storm.warp * storm.warp);

                //add 1000 to id to make sure it doesnt' match up with ship ids
                this.waypoints.push({ id: 1000 + storm.id, x1: x, y1: y, x2: x2, y2: y2, color: colorToRGBA("#FFFF00", 0.1) });
            }
		}
         if (vgap.player.raceid == 12) {
            for (var i = 0; i < vgap.myplanets.length; i++) {
                var planet = vgap.myplanets[i];
                if (planet.podhullid > 0) {

                    if (planet.builtdefense > 0 && vgap.player.raceid == 12) {

                        var podTarget = vgap.getShip(planet.builtdefense);

                        if (podTarget != null) {
                            //bounce off accellerator
                            this.waypoints.push({ id: planet.id, x1: planet.x, y1: planet.y, x2: podTarget.x, y2: podTarget.y, color: colorToRGBA("#7a7a3e", 0.5) });
                            this.waypoints.push({ id: planet.id, x1: podTarget.x, y1: podTarget.y, x2: planet.targetx, y2: planet.targety, color: colorToRGBA("#7a7a3e", 0.5) });
                        }

                    }
                    else 
                        this.waypoints.push({ id: planet.id, x1: planet.x, y1: planet.y, x2: planet.targetx, y2: planet.targety, color: colorToRGBA("#7a7a3e", 0.5) });
                }
            }
        }
	}//mod is true
};

var oldMineText = vgapMap.prototype.mineText;

vgapMap.prototype.mineText = function (x, y) {
   	if ((activeColorMod==false))
		oldMineText.apply(this,arguments);
	else 
	{
		var txt = "";
        for (var i = 0; i < vgap.minefields.length; i++) {
            var minefield = vgap.minefields[i];
            if (Math.dist(minefield.x, minefield.y, x, y) <= minefield.radius) {
                txt += "<div class='ItemSelectionBox minCorrection'><span>";
                if (minefield.ownerid == vgap.player.id)
                    if (minefield.isweb)
							txt += "Your Web Minefield ";
						else
							txt += "Your Minefield ";
                else {
                    var player = vgap.getPlayer(minefield.ownerid);
                    var race = vgap.getRace(player.raceid);
					if (minefield.isweb)
						txt += race.adjective + " (" + player.username + ") Web Minefield ";
					else
						txt += race.adjective + " (" + player.username + ") Minefield ";
                    }
                txt += "Id:" + minefield.id + "</span>";
                txt += "<table class='CleanTable' style='width:100%;'>";
                txt += "<tr><td>Mines: </td><td> " + gsv(minefield.units) + " </td><td>&nbsp;Radius: </td><td> " + gsv(minefield.radius) + " </td></tr>";
                var lastscanned = vgap.game.turn - minefield.infoturn + " turns ago";
                if (minefield.infoturn == vgap.game.turn)
                    lastscanned = "this turn";

                if (vgap.settings.isacademy)
                    txt += "<tr><td colspan = 4> Scanned: " + lastscanned + "</td></tr>";
                else
                    txt += "<tr><td>Scanned: </td><td> " + lastscanned + "</td><td>&nbsp;Friendly: </td><td> " + gsv(minefield.friendlycode) + " </td></tr>";
                txt += "</table></div>";
            }
        }
        return txt;
	}
	};

var oldShowSettings = vgapDashboard.prototype.showSettings;

vgapDashboard.prototype.showSettings = function () {


var new_html="";
	new_html += "<div id='ResetTurnButton' class='BasicFlatButton' onclick='vgapDashboard.prototype.resetNotes();'>Reset all note colors to blank</div><hr>";
	new_html += "<br><h3>Custom Settings for Color Mod</h3>";
	new_html += "<div style='width:250px;'></div>";
	new_html += "<div id='Test'><table>";
	new_html += "<tr><td><div id='LaunchSim' onclick='vgapDashboard.prototype.resetColorModColors();' title='Default is: Active.'>Reset all custom color settings </div></td>";
        new_html += "<td><div id='LaunchSim' onclick='vgapDashboard.prototype.changeDefaultMyColor();' title='Default is: Active.'>Use default colors for My Race Only</div></td>";
        new_html += "<td><div id='LaunchSim' onclick='vgapDashboard.prototype.changeColorMod();' title='Default is: Active.'>Activate or Deactivate Color Mod</div></td>";
		new_html += "<td><div id='LaunchSim' onclick='vgapDashboard.prototype.changeColorPicker();' title='Default is: InActive.'>Set Diplomatic Color Picker</div></td></tr></table>";

	new_html += "<div id='AccountSettings2'><table>";
  	new_html += "<tr><th>Color Settings</th></tr>";

        //html += this.renderSetColorMod("Race 1", "test");
	new_html += "<tr><td>" + "Race 1" + "</td><td><input type='text' id='Race1' onchange='SaveRace();' value='" + colorsA[0] + "'/></td><td><input type='text' id='Race1A' onchange='SaveRace();' value='" + colorsA2[0] + "'/></td><td><input style='background: -webkit-gradient(linear,left top, right bottom, color-stop(0, " + colorsA[0] + "), color-stop(1, " + colorsA2[0] + ")); background: -moz-linear-gradient(top left," + colorsA[0] + " 0%, " + colorsA2[0] + " 100%)' type='text' id='IgnoreRace1' value='     '/></td></tr>";
	new_html  += "<tr><td>" + "Race 2" + "</td><td><input type='text' id='Race2' onchange='SaveRace();' value='" + colorsA[1] + "'/></td><td><input type='text' id='Race2A' onchange='SaveRace();' value='" + colorsA2[1] + "'/></td><td><input style='background: -webkit-gradient(linear,left top, right bottom, color-stop(0, " + colorsA[1] + "), color-stop(1, " + colorsA2[1] + ")); background: -moz-linear-gradient(top left," + colorsA[1] + " 0%, " + colorsA2[1] + " 100%)' type='text' id='IgnoreRace1' value='     '/></td></tr>";
	new_html += "<tr><td>" + "Race 3" + "</td><td><input type='text' id='Race3' onchange='SaveRace();' value='" + colorsA[2] + "'/></td><td><input type='text' id='Race3A' onchange='SaveRace();' value='" + colorsA2[2] + "'/></td><td><input style='background: -webkit-gradient(linear,left top, right bottom, color-stop(0, " + colorsA[2] + "), color-stop(1, " + colorsA2[2] + ")); background: -moz-linear-gradient(top left," + colorsA[2] + " 0%, " + colorsA2[2] + " 100%)' type='text' id='IgnoreRace3' value='     '/></td></tr>";
	new_html += "<tr><td>" + "Race 4" + "</td><td><input type='text' id='Race4' onchange='SaveRace();' value='" + colorsA[3] + "'/></td><td><input type='text' id='Race4A' onchange='SaveRace();' value='" + colorsA2[3] + "'/></td><td><input style='background: -webkit-gradient(linear,left top, right bottom, color-stop(0, " + colorsA[3] + "), color-stop(1, " + colorsA2[3] + ")); background: -moz-linear-gradient(top left," + colorsA[3] + " 0%, " + colorsA2[3] + " 100%)' type='text' id='IgnoreRace4 value='     '/></td></tr>";
	new_html += "<tr><td>" + "Race 5" + "</td><td><input type='text' id='Race5' onchange='SaveRace();' value='" + colorsA[4] + "'/></td><td><input type='text' id='Race5A' onchange='SaveRace();' value='" + colorsA2[4] + "'/></td><td><input style='background: -webkit-gradient(linear,left top, right bottom, color-stop(0, " + colorsA[4] + "), color-stop(1, " + colorsA2[4] + ")); background: -moz-linear-gradient(top left," + colorsA[4] + " 0%, " + colorsA2[4] + " 100%)' type='text' id='IgnoreRace5' value='     '/></td></tr>";
	new_html += "<tr><td>" + "Race 6" + "</td><td><input type='text' id='Race6' onchange='SaveRace();' value='" + colorsA[5] + "'/></td><td><input type='text' id='Race6A' onchange='SaveRace();' value='" + colorsA2[5] + "'/></td><td><input style='background: -webkit-gradient(linear,left top, right bottom, color-stop(0, " + colorsA[5] + "), color-stop(1, " + colorsA2[5] + ")); background: -moz-linear-gradient(top left," + colorsA[5] + " 0%, " + colorsA2[5] + " 100%)' type='text' id='IgnoreRace6 value='     '/></td></tr>";
	new_html += "<tr><td>" + "Race 7" + "</td><td><input type='text' id='Race7' onchange='SaveRace();' value='" + colorsA[6] + "'/></td><td><input type='text' id='Race7A' onchange='SaveRace();' value='" + colorsA2[6] + "'/></td><td><input style='background: -webkit-gradient(linear,left top, right bottom, color-stop(0, " + colorsA[6] + "), color-stop(1, " + colorsA2[6] + ")); background: -moz-linear-gradient(top left," + colorsA[6] + " 0%, " + colorsA2[6] + " 100%)' type='text' id='IgnoreRace7' value='     '/></td></tr>";
	new_html += "<tr><td>" + "Race 8" + "</td><td><input type='text' id='Race8' onchange='SaveRace();' value='" + colorsA[7] + "'/></td><td><input type='text' id='Race8A' onchange='SaveRace();' value='" + colorsA2[7] + "'/></td><td><input style='background: -webkit-gradient(linear,left top, right bottom, color-stop(0, " + colorsA[7] + "), color-stop(1, " + colorsA2[7] + ")); background: -moz-linear-gradient(top left," + colorsA[7] + " 0%, " + colorsA2[7] + " 100%)' type='text' id='IgnoreRace8 value='     '/></td></tr>";
	new_html += "<tr><td>" + "Race 9" + "</td><td><input type='text' id='Race9' onchange='SaveRace();' value='" + colorsA[8] + "'/></td><td><input type='text' id='Race9A' onchange='SaveRace();' value='" + colorsA2[8] + "'/></td><td><input style='background: -webkit-gradient(linear,left top, right bottom, color-stop(0, " + colorsA[8] + "), color-stop(1, " + colorsA2[8] + ")); background: -moz-linear-gradient(top left," + colorsA[8] + " 0%, " + colorsA2[8] + " 100%)' type='text' id='IgnoreRace9' value='     '/></td></tr>";
	new_html += "<tr><td>" + "Race 10" + "</td><td><input type='text' id='Race10' onchange='SaveRace();' value='" + colorsA[9] + "'/></td><td><input type='text' id='Race10A' onchange='SaveRace();' value='" + colorsA2[9] + "'/></td><td><input style='background: -webkit-gradient(linear,left top, right bottom, color-stop(0, " + colorsA[9] + "), color-stop(1, " + colorsA2[9] + ")); background: -moz-linear-gradient(top left, " + colorsA[9] + " 0%, " + colorsA2[9] + " 100%)' type='text' id='IgnoreRace10 value='     '/></td></tr>";
	new_html += "<tr><td>" + "Race 11" + "</td><td><input type='text' id='Race11' onchange='SaveRace();' value='" + colorsA[10] + "'/></td><td><input type='text' id='Race11A' onchange='SaveRace();' value='" + colorsA2[10] + "'/></td><td><input style='background: -webkit-gradient(linear,left top, right bottom, color-stop(0, " + colorsA[10] + "), color-stop(1, " + colorsA2[10] + ")); background: -moz-linear-gradient(top left, " + colorsA[10] + " 0%, " + colorsA2[10] + " 100%)' type='text' id='IgnoreRace11' value='     '/></td></tr>";
	new_html += "<tr><td>" + "Unoccupied" + "</td><td><input type='text' id='ModInfo' onchange='SaveRace();' value='" + modInfo + "'/></td><td><input type='text' id='ModInfo2' onchange='SaveRace();' value='" + modInfo2 + "'/></td><td><input style='background: -webkit-gradient(linear,left top, right bottom, color-stop(0, " + modInfo + "), color-stop(1, " + modInfo2 + ")); background: -moz-linear-gradient(top left, " + modInfo + " 0%, " + modInfo2 + " 100%)' type='text' id='IgnoreInfo value='     '/></td></tr>";
	new_html += "<tr><td>" + "Unknown" + "</td><td><input type='text' id='ModUnknown' onchange='SaveRace();' value='" + modUnknown + "'/></td><td><input type='text' id='ModUnknown2' onchange='SaveRace();' value='" + modUnknown2 + "'/></td><td><input style='background: -webkit-gradient(linear,left top, right bottom, color-stop(0, " + modUnknown + "), color-stop(1, " + modUnknown2 + ")); background: -moz-linear-gradient(top left, " + modUnknown + " 0%, " + modUnknown2 + " 100%)' type='text' id='IgnoreUnknown value='     '/></td></tr>";
	new_html += "<tr><td><input type='text' id='ModRace' onchange='SaveRaceNum();' value='" + modRace + "'/></td><td><input type='text' id='ModRace2' onchange='SaveRace();' value='" + colorsA[modRace-1] + "'/></td><td><input type='text' id='ModRace3' onchange='SaveRace();' value='" + colorsA2[modRace-1] + "'/></td><td><input style='background: -webkit-gradient(linear,left top, right bottom, color-stop(0, " + colorsA[modRace-1] + "), color-stop(1, " + colorsA2[modRace-1] + ")); background: -moz-linear-gradient(top left, " + colorsA[modRace-1] + " 0%, " + colorsA2[modRace-1] + " 100%)' type='text' id='IgnoreRaceMod value='     '/></td></tr>";
	
	//html += "<tr><td>Test</td>" + "<td>Test2</td>" + "<td><input style='background: -moz-linear-gradient(top left, #ccffff 0%, #00ffff 100%); background: -webkit-gradient(linear, left top, right bottom, color-stop(0, #000000), color-stop(1, #ffffff))' type='text' id='IgnoreMe2' value='     '/></tr></td>";	
	//html += "<tr><td>Test2</td>" + "<td>Test3</td>" + "<td><input style='background: -webkit-gradient(linear, left top, right bottom, color-stop(0, #000000), color-stop(1, #ffffff)) background: -moz-linear-gradient(top left, #ccffff 0%, #00ffff 100%)' type='text' id='IgnoreMe' value='     '/></tr></td>";	
	//html += "<tr><td>Test</td>" + "<td>Test2</td>" + "<td><input style='background: -webkit-gradient(linear, left top, right bottom, color-stop(0, #000000), color-stop(1, #ffffff))' type='text' id='IgnoreMe2' value='     '/></tr></td>";	
    
	 //html += "<tr><td><input style='background: -webkit-gradient(linear, left top, right bottom, from(#ccc), to(#000)); background: -moz-linear-gradient(top,  #ccc,  #000);' type='text' id='IgnoreMe' value='     '</td></tr>";
	 //html += "<tr><td><input style='background: -moz-linear-gradient(top,  #ccc,  #000); background: -webkit-gradient(linear, left top, right bottom, from(#ccc), to(#000)); ' type='text' id='IgnoreMe' value='     '</td></tr>";  

	new_html += "</table></div>";
	
		this.customSettingsContent.push(new_html);
		oldShowSettings.apply(this,arguments);
		this.customSettingsContent.pop();
	
		
};

vgapDashboard.prototype.resetNotes=function()
{
if (!confirm("This function will reset all planet note colors to blank. Confirm to continue."))
            return;
for (var i = 0; i < vgap.planets.length; i++) 
	{

	var planet = vgap.planets[i];
	if (planet.note && planet.note.color != "")
		planet.note.color="";
	}
};

SaveRaceNum=function(){
modRace=$("#ModRace").val();//melee race specified
};

SaveRace=function(){

	var i;
	
	if (modRace>11)
		{
		colorsA[modRace-1]=$("#ModRace2").val();
		colorsA2[modRace-1]=$("#ModRace3").val();	
		var String3="Race"+(modRace);
		set_cookie(String3,colorsA[modRace-1],2029,1,1);
		set_cookie(String3+"A",colorsA2[modRace-1],2029,1,1);
		}
	for (i=0;i<11;i++)
	{
		var String="#Race"+(i+1);
		var String2="Race"+(i+1);
		colorsA[i]= $(String).val();
		set_cookie(String2,colorsA[i],2029,1,1);
		colorsA2[i]=$(String+"A").val();
		set_cookie(String2+"A",colorsA2[i],2029,1,1);
	}
	
	modInfo= $("#ModInfo").val();
	modUnknown= $("#ModUnknown").val();
	
	modInfo2= $("#ModInfo2").val();
	modUnknown2= $("#ModUnknown2").val();


	set_cookie("ModInfo",modInfo,2099,1,1);
	set_cookie("ModUnknown",modUnknown,2029,1,1);

	set_cookie("ModInfo2",modInfo2,2014,1,1);
	set_cookie("ModUnknown2",modUnknown2,2029,1,1);
	
	vgap.loadWaypoints();
	vgap.map.draw();
};

set_cookie=function( name, value, exp_y, exp_m, exp_d, path, domain, secure )
//name=cookie name (required)
//value=cookie value (required)
//exp_y,M,d is expiration year, month, day (if blank cookie will delete when browser closes)
//path=path within site this applies to (can be blank)
//domain=apply only to websites in this domain (can be blank)
//secure=use SSL (leave blank)	

{
  var cookie_string = name + "=" + escape ( value );

  if ( exp_y )
  {
    var expires = new Date ( exp_y, exp_m, exp_d );
    cookie_string += "; expires=" + expires.toGMTString();
  }

  if ( path )
        cookie_string += "; path=" + escape ( path );

  if ( domain )
        cookie_string += "; domain=" + escape ( domain );
  
  if ( secure )
        cookie_string += "; secure";
  
  document.cookie = cookie_string;
};

get_cookie =function( cookie_name )
{
  var results = document.cookie.match ( '(^|;) ?' + cookie_name + '=([^;]*)(;|$)' );

  if ( results )
    return ( unescape ( results[2] ) );
  else
    return null;
};

vgapDashboard.prototype.saveToCookie = function(){
//alert("In Function save");
  // set a new cookie
if (defaultMyColor==true)
{
set_cookie("defaultMyColor",1,2029,1,1);
//alert("set to true!!");
}
else{
set_cookie("defaultMyColor",0,2029,1,1);
//alert("set to false!!");
}
    
if (activeColorMod==true)
    set_cookie("activeColorMod",1,2029,1,1);
else 
    set_cookie("activeColorMod",0,2029,1,1);

if (useColorPicker==1)
	set_cookie("ColorPicker",1,2029,1,1);
else
	set_cookie("ColorPicker",0,2029,1,1);
	
};


vgapDashboard.prototype.changeColorMod = function(){
 	if (activeColorMod==true) 
	{
	activeColorMod=false;
	alert("The Race Specific Color Mod is now Deactived.");
	}
	else 
	{
	activeColorMod=true;
	alert("The Race Specific Color Mod is now Active.");
  	}
    	vgapDashboard.prototype.saveToCookie()
	vgap.loadWaypoints();
	vgap.map.draw();
};

vgapDashboard.prototype.changeColorPicker = function(){
 	if (useColorPicker==1) 
	{
	useColorPicker=0;
	alert("Ignore Diplomatic Color Picker colors.");
	}
	else 
	{
	useColorPicker=1;
	alert("Using Diplomatic Color Picker Colors");
  	}
    vgapDashboard.prototype.saveToCookie()
	vgap.loadWaypoints();
	vgap.map.draw();
};

vgapDashboard.prototype.resetColorModColors = function(){
    alert("Resetting all colors to Mod defaults");

   colorsA =["#F0F8FF","#32CD32","#CD5C5C","#FFC0CB","#98FB98","#C0C0C0","#FFFF00","#EE82EE","#D3D3D3","#B0E0E6","#87CEFA","#7B68EE","#F4A460","#D2B48C","#FF6347","#F5DEB3","#F08080","#2F4F4F","#008080","#B22222","#808000","#9370DB","#00FF00","#4B0082","#D2B48C","#9ACD32", "#DAA520","#F0F8FF","#6B8E23","#FF4500"];
   colorsA2 =["#FFFFFF","#006400","#FF0000","#FF69B4","#00FA9A","#6A5ACD","#FFD700","#9400D3","#808080","#00CED1","#4169E1","#7B68EE","#A0522D","#87CEEB","#FF6347","#F5DEB3","#F08080","#2F4F4F","#008080","#B22222","#808000","#9370DB","#00FF00","#4B0082","#D2B48C","#9ACD32", "#DAA520","#F0F8FF","#6B8E23","#FF4500"];
   
    modInfo="#F4A460";//chocolate
    modInfo2="#D2691E";//chocolate

    modUnknown="#FFF8DC"; //Tan
    modUnknown2="#D2B48C"; //Tan	
    vgapDashboard.prototype.saveToCookie();
	vgap.loadWaypoints();
	vgap.map.draw();
};

vgapDashboard.prototype.changeDefaultMyColor = function(){
 	if (defaultMyColor==true) 
	{
 	alert("Mod is no longer using Default colors for your race.");
	defaultMyColor=false;
	}
	else 
	{
	alert("Mod will now use Default color (aqua/green) for your race.");
	defaultMyColor=true;
	}
	vgapDashboard.prototype.saveToCookie();
	vgap.loadWaypoints();
	vgap.map.draw();
};

checkColorModSettings = function(){
//Color Mod settings
//if null, then its unset - check the cookie
//if cookie doesn't exist, set to default.
	if (activeColorMod==null)
	{
		var checkActive=null;
		checkActive=get_cookie("activeColorMod");
		if (checkActive==null)
			{
			activeColorMod=true;//no cookie,  set to default
			}
		else if (checkActive==1)
			{
			activeColorMod=true;
			}
		else 
			{
			activeColorMod=false;
			}
	}

	var checkPicker=null;
	checkPicker=get_cookie("ColorPicker");
	if (checkPicker) useColorPicker=checkPicker;
    
    if (defaultMyColor==null)
	{
		var checkColor=null;
		checkColor=get_cookie("defaultMyColor");
		if (checkColor==null)
			{
			defaultMyColor=true;//no cookie,  set to default
			}
		else if (checkColor==1)
			{
			defaultMyColor=true;
			}
		else 
			{
			defaultMyColor=false;
			}
	}

    if (useCustomColor==false)
	//have not checked cookies yet
	{
	var i;
	var checkColor=null;

	for (i=0;i<30;i++)
	{
		var String="Race"+(i+1);
		checkColor=get_cookie(String);
		if (checkColor) 
			colorsA[i]=checkColor;
		checkColor=null;
		checkColor=get_cookie(String+"A");
		if (checkColor) colorsA2[i]=checkColor;
		checkColor=null;
	}
	
	checkColor=get_cookie("ModInfo");
	if (checkColor) modInfo=checkColor;
	checkColor=null;
	checkColor=get_cookie("ModUnknown");
	if (checkColor) modUnknown=checkColor;
	checkColor=null;

	checkColor=get_cookie("ModInfo2");
	if (checkColor) modInfo2=checkColor;
	checkColor=null;
	checkColor=get_cookie("ModUnknown2");
	if (checkColor) modUnknown2=checkColor;	
	//set var so we know cookies have been checked
	useCustomColor=true;
	} 
};


} //wrapper for injection




var script = document.createElement("script");
script.type = "application/javascript";
script.textContent = "(" + wrapper + ")();";

document.body.appendChild(script);