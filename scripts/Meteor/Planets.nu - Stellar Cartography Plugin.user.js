// ==UserScript==
// @name          Planets.nu - Stellar Cartography Plugin
// @description   Plugin for Planets.nu which redraws the edges of Stellar Cartography objects
// @namespace     Planets.nu
// @version       1.3
// @grant         none
// @date          2016-09-21
// @author        meteor
// @include       http://planets.nu/home
// @include       http://planets.nu/games/*
// @include       http://planets.nu/*
// @include       http://play.planets.nu/*
// @include       http://test.planets.nu/*
// @include       http://*.planets.nu/*
// ==/UserScript==

function wrapper(plugin_version)
{
    if (vgap.version < 3.0)
    {
        console.log("Stellar Cartography plugin requires at least NU version 3.0. Plugin disabled.");
        return;
    }

    console.log("Stellar Cartography version: v" + plugin_version);

    var stellarCartographyPlugin =
        {
            version : plugin_version,
            enabled : false,
            mustCallEarlyDrawNebulas : false,
            mustCallEarlyDrawIonStorms : false,
            notetype : -20160921,

            processload : function()
            {
                var plugin = vgap.plugins["stellarCartographyPlugin"];

                plugin.enabled = plugin.getObjectFromNote(1, plugin.notetype);
                if (plugin.enabled == null)
                {
                    plugin.enabled = false;
                }
            },

            loadmap : function()
            {
                var plugin = vgap.plugins["stellarCartographyPlugin"];

                $("<li class='ShowMinerals' id='stellarCartography'>Stellar Cart.</li>").toggleClass("selectedmaptool", plugin.enabled).tclick(function()
                {
                    plugin.enabled = !plugin.enabled;
                    plugin.saveObjectAsNote(1, plugin.notetype, plugin.enabled);

                    $("#stellarCartography").toggleClass("selectedmaptool", plugin.enabled);

                    vgap.map.draw();
                }).appendTo("#MapTools");
            },

            earlyDrawNebulas : function()
            {
                var plugin = vgap.plugins["stellarCartographyPlugin"];
                var map = vgap.map;
                var ctx = map.ctx;

                if (plugin.enabled)
                {
                    for (var i = 0; i < vgap.nebulas.length; i++)
                    {
                        var nebula = vgap.nebulas[i];

                        if (map.isVisible(nebula.x, nebula.y, nebula.radius))
                        {
                            ctx.strokeStyle = "#669999";
                            ctx.lineWidth = 1;

                            ctx.beginPath();
                            ctx.arc(map.screenX(nebula.x), map.screenY(nebula.y), nebula.radius * vgap.map.zoom, 0, Math.PI * 2, false);
                            ctx.closePath();
                            ctx.stroke();
                        }
                    }

                    ctx.globalCompositeOperation = "destination-out";
                    for (var i = 0; i < vgap.nebulas.length; i++)
                    {
                        var nebula = vgap.nebulas[i];

                        if (map.isVisible(nebula.x, nebula.y, nebula.radius))
                        {
                            ctx.fillStyle = "#000000";
                            ctx.beginPath();
                            ctx.arc(map.screenX(nebula.x), map.screenY(nebula.y), nebula.radius * vgap.map.zoom, 0, Math.PI * 2, false);
                            ctx.closePath();
                            ctx.fill();
                        }
                    }
                    ctx.globalCompositeOperation = "source-over";
                }
            },

            earlyDrawIonStorms : function()
            {
                var plugin = vgap.plugins["stellarCartographyPlugin"];
                var map = vgap.map;
                var ctx = map.ctx;

                if (plugin.enabled)
                {
                    for (var i = 0; i < vgap.ionstorms.length; i++)
                    {
                        var storm = vgap.ionstorms[i];

                        if (map.isVisible(storm.x, storm.y, storm.radius))
                        {
                            ctx.strokeStyle = vgap.accountsettings.ionstorms;
                            ctx.lineWidth = 1;

                            ctx.beginPath();
                            ctx.arc(map.screenX(storm.x), map.screenY(storm.y), storm.radius * vgap.map.zoom, 0, Math.PI * 2, false);
                            ctx.closePath();
                            ctx.stroke();
                        }
                    }

                    ctx.globalCompositeOperation = "destination-out";
                    for (var i = 0; i < vgap.ionstorms.length; i++)
                    {
                        var storm = vgap.ionstorms[i];

                        if (map.isVisible(storm.x, storm.y, storm.radius))
                        {
                            ctx.fillStyle = "#000000";
                            ctx.beginPath();
                            ctx.arc(map.screenX(storm.x), map.screenY(storm.y), storm.radius * vgap.map.zoom, 0, Math.PI * 2, false);
                            ctx.closePath();
                            ctx.fill();
                        }
                    }
                    ctx.globalCompositeOperation = "source-over";
                }
            },

            draw : function()
            {
                var plugin = vgap.plugins["stellarCartographyPlugin"];
                var map = vgap.map;
                var ctx = map.ctx;

                if (plugin.enabled)
                {
                    // debris disks
                    for (var i = 0; i < vgap.debrisdisks.length; i++)
                    {
                        var planet = vgap.debrisdisks[i];

                        if (map.isVisible(planet.x, planet.y, planet.debrisdisk))
                        {
                            ctx.strokeStyle = "white";
                            ctx.lineWidth = 1;
                            ctx.beginPath();
                            ctx.arc(map.screenX(planet.x), map.screenY(planet.y), planet.debrisdisk * vgap.map.zoom, 0, Math.PI * 2, false);
                            ctx.closePath();
                            ctx.stroke();
                        }
                    }

                    // star clusters
                    for (var i = 0; i < vgap.stars.length; i++)
                    {
                        var star = vgap.stars[i];

                        if (map.isVisible(star.x, star.y, Math.sqrt(star.mass)))
                        {
                            ctx.strokeStyle = "white";
                            ctx.lineWidth = 1;

                            ctx.beginPath();
                            ctx.arc(map.screenX(star.x), map.screenY(star.y), star.radius * vgap.map.zoom, 0, Math.PI * 2, false);
                            ctx.closePath();
                            ctx.stroke();

                            ctx.beginPath();
                            ctx.arc(map.screenX(star.x), map.screenY(star.y), (star.radius + 10) * vgap.map.zoom, 0, Math.PI * 2, false);
                            ctx.closePath();
                            ctx.stroke();

                            ctx.beginPath();
                            ctx.arc(map.screenX(star.x), map.screenY(star.y), Math.sqrt(star.mass) * vgap.map.zoom, 0, Math.PI * 2, false);
                            ctx.closePath();
                            ctx.stroke();
                        }
                    }
                }
            },

            loaddashboard : function()
            {
            },

            showdashboard : function()
            {
            },

            showsummary : function()
            {
            },

            showmap : function()
            {
            },

            loadplanet : function()
            {
            },

            loadstarbase : function()
            {
            },

            loadship : function()
            {
            },

            saveObjectAsNote : function(id, type, obj)
            {
                var note = vgap.getNote(id, type);
                if (note == null)
                {
                    note = vgap.addNote(id, type);
                }

                note.changed = 1;
                note.body = JSON.stringify(obj);
                vgap.save();
            },

            getObjectFromNote : function(id, type)
            {
                var note = vgap.getNote(id, type);
                if (note != null && note.body != "")
                {
                    return JSON.parse(note.body);
                }
                else
                {
                    return null;
                }
            }
        };

    vgap.registerPlugin(stellarCartographyPlugin, "stellarCartographyPlugin");

    var oldVgapMapDraw = vgapMap.prototype.draw;
    vgapMap.prototype.draw = function(fast, ctx, skipUserContent, secondCanvas)
    {
        if (vgap.map.drawing)
            return;

        var plugin = vgap.plugins["stellarCartographyPlugin"];

        plugin.mustCallEarlyDrawNebulas = true;
        plugin.mustCallEarlyDrawIonStorms = true;

        oldVgapMapDraw.apply(this, arguments);

        plugin.mustCallEarlyDrawNebulas = false;
        plugin.mustCallEarlyDrawIonStorms = false;
    }

    var oldVgapMapDrawNebula = vgapMap.prototype.drawNebula;
    vgapMap.prototype.drawNebula = function(x, y, neb, ctx)
    {
        var plugin = vgap.plugins["stellarCartographyPlugin"];

        if (plugin.mustCallEarlyDrawNebulas)
        {
            plugin.earlyDrawNebulas();
            plugin.mustCallEarlyDrawNebulas = false;
        }

        oldVgapMapDrawNebula.apply(this, arguments);
    }

    var oldVgapMapDrawMinefield = vgapMap.prototype.drawMinefield;
    vgapMap.prototype.drawMinefield = function(x, y, color, rad, ctx, isweb)
    {
        var plugin = vgap.plugins["stellarCartographyPlugin"];

        if (plugin.mustCallEarlyDrawIonStorms)
        {
            plugin.earlyDrawIonStorms();
            plugin.mustCallEarlyDrawIonStorms = false;
        }

        oldVgapMapDrawMinefield.apply(this, arguments);
    }

    var oldVgapMapDrawIon = vgapMap.prototype.drawIon;
    vgapMap.prototype.drawIon = function(x, y, voltage, rad, ctx, storm)
    {
        var plugin = vgap.plugins["stellarCartographyPlugin"];

        if (plugin.mustCallEarlyDrawIonStorms)
        {
            plugin.earlyDrawIonStorms();
            plugin.mustCallEarlyDrawIonStorms = false;
        }

        oldVgapMapDrawIon.apply(this, arguments);
    }
}

var script = document.createElement("script");
script.type = "application/javascript";
script.textContent = "(" + wrapper + ")(\"" + GM_info.script.version + "\");";
document.body.appendChild(script);
document.body.removeChild(script);
