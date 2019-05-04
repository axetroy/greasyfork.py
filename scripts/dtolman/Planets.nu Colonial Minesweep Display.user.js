// ==UserScript==
// @name           Planets.nu Colonial Minesweep Display
// @description    Adds fighter sweeping totals for Colony players
// @include        http://planets.nu/home
// @include        http://planets.nu/games/*
// @include        http://play.planets.nu/*
// @include 	   http://*.planets.nu/*
// @include		   http://planets.nu/*
// @version        0.2
// @namespace https://greasyfork.org/users/2860
// ==/UserScript==
// 0.1 First version
// 0.2 Modernized

function wrapper () { // wrapper for injection
  



oldLoadOrders = vgapShipScreen.prototype.loadOrders;


vgapShipScreen.prototype.loadOrders = function () {
if (vgaPlanets.prototype.version>=3) 
{
       var ship = this.ship;

        var html = "<table width='100%'>";
        var enemy = "None";
        if (ship.enemy > 0) {
            var player = vgap.getPlayer(ship.enemy);
            var race = vgap.getRace(player.raceid);
            enemy = race.name + " (" + player.username + ")";
        }
        html += "<tr><td class='widehead' data-topic='PrimaryEnemy'>Primary Enemy:</td><td class='textval'>" + enemy + "</td></tr></table>";
        html += "<table width='100%'><tr><td class='widehead' data-topic='ShipMissions'>Mission:</td><td class='textval'>";
        var missionTarget = null;
        if (ship.mission1target != 0)
            missionTarget = vgap.getShip(ship.mission1target);

        if (ship.mission == 6 && missionTarget != null)
            html += "Tow ship " + missionTarget.id + ": " + missionTarget.name.substr(0, 30);
        else if (ship.mission == 6)
            html += "Tow";
        else if (ship.mission == 7 && missionTarget != null)
            html += "Intercept ship " + missionTarget.id + ": " + missionTarget.name.substr(0, 30);
        else if (ship.mission == 15 && missionTarget != null)
            html += "Repair ship " + missionTarget.id + ": " + missionTarget.name.substr(0, 30);
        else if (ship.mission == 2 || (ship.mission == 8 && vgap.player.raceid == 7)) {
            var units = this.getMineUnits(ship);
            html += this.getMission(ship.mission).name + " <span class='valsup'>(convert " + ship.minelaytorps + " torps into " + units + " " + (ship.mission == 2 ? "" : "web ") + "mines)</span>";
        }
        else
            html += this.getMission(ship.mission).name;

 		if ((ship.mission == 1)&&(vgap.player.raceid == 11)&&(ship.bays > 0))
			html += " <span class='valsup'>(" + ship.ammo * 20 + " mines by fighters / " + ship.beams * ship.beamid * ship.beamid * 4 + " mines / " + ship.beams * ship.beamid * ship.beamid * 3 + " web mines)</span>";
		else if (ship.mission == 1)
            html += " <span class='valsup'>(" + ship.beams * ship.beamid * ship.beamid * 4 + " Mines / " + ship.beams * ship.beamid * ship.beamid * 3 + " web mines)</span>";


        //cloak fuel burning
        if (ship.mission == 9 || (vgap.player.raceid == 3 && ship.mission == 8))
            html += " <span class='valsup'>(" + vgap.cloakFuel(ship) + " fuel / turn)</span>";

        html += "</td></tr>";
        


        html += "</table>";

        //chameleon device
        var chameleon = null;
        if (ship.hullid == 1023 || ship.hullid == 109 || ship.hullid == 1049) {
            var cid = parseInt(ship.friendlycode);
            var chull = vgap.getHull(cid);
            if (chull != null && chull.id != 0) {
                chameleon = chull;
                //html += "<tr><td class='widehead' data-topic='ShipMissions'>Chameleon:</td><td class='textval' style='color:magenta;'>" + chull.name + " <span class='valsup'>(10 fuel / turn)</span></td></tr>";
            }
        }

        //highlight friendly codes
        var fcbox_color = "transparent";
        fcu = ship.friendlycode.toUpperCase();
        if (fcu == "HYP" && (ship.hullid == 51 || ship.hullid == 87 || ship.hullid == 77)) fcbox_color = "yellow";
        else if (fcu == "BDM" || fcu == "BTM") fcbox_color = "limegreen";
        else if (fcu == "NTP" || fcu == "NBR") fcbox_color = "orchid";
        else if (fcu == "MKT" || fcu == "LFM") fcbox_color = "orange";
        else if ((fcu == "POP" || fcu == "TRG") && (ship.hullid == 39 || ship.hullid == 41 || ship.hullid == 1034 || ship.hullid == 1039)) fcbox_color = "red";
        else if (fcu == "MSC") fcbox_color = "aqua";
        else if (fcu == "BTT" || fcu == "BTF") fcbox_color = "lightcoral";
        else if (fcu.substr(0, 2) == "GS") fcbox_color = "magenta";
        else if (fcu.substr(0, 2) == "MD") fcbox_color = "#099";
        else if (fcu.substr(0, 2) == "MI") fcbox_color = "orange";
        else if (chameleon) fcbox_color = "magenta";

        if (chameleon)
            html += "<table width='100%'><tr><td class='widehead' data-topic='FriendlyCodes'>Chameleon:</td><td class='textval' style='color:magenta;'>" + chameleon.name + " <span class='valsup'>(10 fuel / turn)</span></td><td class='fc'><span style='background-color: " + fcbox_color + "'  id='ShipFC'>" + ship.friendlycode + "</span></td></tr></table>";
        else
            html += "<table width='100%'><tr><td class='widehead' data-topic='FriendlyCodes'>Friendly Code:</td><td class='fc'><span style='background-color: " + fcbox_color + "'  id='ShipFC'>" + ship.friendlycode + "</span></td></tr></table>";


        if (vgap.advActive(61)) {
            var darkersense = 0;

            //look for ship detections with dark sense
            for (var i = 0; i < vgap.messages.length; i++) {
                var message = vgap.messages[i];
                if (message.target == ship.id && message.messagetype == 20 && message.body.indexOf("ship nearby") >= 0)
                    darkersense++;
            }

            if (darkersense > 0) {
                html += "<table width='100%'><tr><td class='widehead' data-topic='FriendlyCodes'>Dark Sense:</td><td class='textval' style='color:magenta;'>" + darkersense + " hidden ships nearby</td></tr></table>";
            }
        }


        return html;

    }
else
{
 	this.orders.empty();
        var ship = this.ship;

        var html = "<table width='100%'>";
        var enemy = "None";
        if (ship.enemy > 0) {
            var player = vgap.getPlayer(ship.enemy);
            var race = vgap.getRace(player.raceid);
            enemy = race.name + " (" + player.username + ")";
        }
        html += "<tr><td class='widehead'>Primary Enemy:</td><td class='textval'>" + enemy + "</td></tr></table>";
        html += "<table width='100%'><tr><td class='widehead'>Mission:</td><td class='textval'>";
        var missionTarget = null;
        if (ship.mission1target != 0)
            missionTarget = vgap.getShip(ship.mission1target);

        if (ship.mission == 6 && missionTarget != null)
            html += "Tow ship " + missionTarget.id + ": " + missionTarget.name.substr(0, 30);
        else if (ship.mission == 6)
            html += "Tow";
        else if (ship.mission == 7 && missionTarget != null)
            html += "Intercept ship " + missionTarget.id + ": " + missionTarget.name.substr(0, 30);
        else if (ship.mission == 15 && missionTarget != null)
            html += "Repair ship " + missionTarget.id + ": " + missionTarget.name.substr(0, 30);
        else if (ship.mission == 2 || (ship.mission == 8 && vgap.player.raceid == 7)) {
            var units = this.getMineUnits(ship);
            html += this.getMission(ship.mission).name + " <span class='valsup'>(convert " + ship.minelaytorps + " torps into " + units + " " + (ship.mission == 2 ? "" : "web ") + "mines)</span>";
        }
        else
            html += this.getMission(ship.mission).name;

        if ((ship.mission == 1)&&(vgap.player.raceid == 11)&&(ship.bays > 0))
		html += " <span class='valsup'>(" + ship.ammo * 20 + " mines by fighters / " + ship.beams * ship.beamid * ship.beamid * 4 + " mines / " + ship.beams * ship.beamid * ship.beamid * 3 + " web mines)</span>";
	else
            html += " <span class='valsup'>(" + ship.beams * ship.beamid * ship.beamid * 4 + " Mines / " + ship.beams * ship.beamid * ship.beamid * 3 + " web mines)</span>";


        //cloak fuel burning
        if (ship.mission == 9 || (vgap.player.raceid == 3 && ship.mission == 8))
            html += " <span class='valsup'>(" + this.cloakFuel() + " fuel / turn)</span>";

        html += "</td></tr></table>";
 
        //highlight friendly codes
        var fcbox_color = "transparent";
        fcu = ship.friendlycode.toUpperCase();
        if (fcu == "HYP" && (ship.hullid == 51 || ship.hullid == 87 || ship.hullid == 77)) fcbox_color = "yellow";
        else if (fcu == "BDM" || fcu == "BTM") fcbox_color = "limegreen";
        else if (fcu == "NTP" || fcu == "NBR") fcbox_color = "orchid";
        else if (fcu == "MKT" || fcu == "LFM") fcbox_color = "orange";
        else if ((fcu == "POP" || fcu == "TRG") && (ship.hullid == 39 || ship.hullid == 41 || ship.hullid == 1034 || ship.hullid == 1039)) fcbox_color = "red";
        else if (fcu == "MSC") fcbox_color = "aqua";
        else if (fcu == "BTT" || fcu == "BTF") fcbox_color = "lightcoral";
        else if (fcu.substr(0, 2) == "GS") fcbox_color = "magenta";
        else if (fcu.substr(0, 2) == "MD") fcbox_color = "#099";
        else if (fcu.substr(0, 2) == "MI") fcbox_color = "orange";
		else if (chameleon) fcbox_color = "magenta";

		if (vgap.advActive(61)) {
            var darkersense = 0;

            //look for ship detections with dark sense
            for (var i = 0; i < vgap.messages.length; i++) {
                var message = vgap.messages[i];
                if (message.target == ship.id && message.messagetype == 20 && message.body.indexOf("ship nearby") >= 0)
                    darkersense++;
            }

            if (darkersense > 0) {
                html += "<table width='100%'><tr><td class='widehead' data-topic='FriendlyCodes'>Dark Sense:</td><td class='textval' style='color:magenta;'>" + darkersense + " hidden ships nearby</td></tr></table>";
            }
        }
		
     if (chameleon)
            html += "<table width='100%'><tr><td class='widehead' data-topic='FriendlyCodes'>Chameleon:</td><td class='textval' style='color:magenta;'>" + chameleon.name + " <span class='valsup'>(10 fuel / turn)</span></td><td class='fc'><span style='background-color: " + fcbox_color + "'  id='ShipFC'>" + ship.friendlycode + "</span></td></tr></table>";
        else
            html += "<table width='100%'><tr><td class='widehead' data-topic='FriendlyCodes'>Friendly Code:</td><td class='fc'><span style='background-color: " + fcbox_color + "'  id='ShipFC'>" + ship.friendlycode + "</span></td></tr></table>";

        //html += "<table width='100%'><tr><td class='widehead'>Friendly Code:</td><td class='fc'><span>" + ship.friendlycode + "</span></td></tr>";
        //html += "</table>";
        $(html).appendTo("#ShipOrders");
}

};


} //wrapper for injection

var script = document.createElement("script");
script.type = "application/javascript";
script.textContent = "(" + wrapper + ")();";

document.body.appendChild(script);