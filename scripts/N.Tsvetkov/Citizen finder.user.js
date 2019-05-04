// ==UserScript==
// @name         Citizen finder
// @namespace    http://tampermonkey.net/
// @version      0.4
// @description  Find BH by ID
// @author       N.Tsvetkov
// @include      /^https:\/\/www\.erepublik\.com\/[a-z]{2}$/
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_addStyle
// ==/UserScript==
var $ = jQuery;

function style(t) {
    $("head").append("<style>" + t + "</style>");
}

function closeModal() {
    $('#myModal').css('display', 'none');
}

function beep() {
    var snd = new Audio("data:audio/wav;base64,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qJrx4KOQjahZxWbcZgztj2c49nKmkId44S71j0c8eV9yDK6uPRzx5X18eDvjvQ6yKo9ZSS6l//8elePK/Lf//IInrOF/FvDoADYAGBMGb7FtErm5MXMlmPAJQVgWta7Zx2go+8xJ0UiCb8LHHdftWyLJE0QIAIsI+UbXu67dZMjmgDGCGl1H+vpF4NSDckSIkk7Vd+sxEhBQMRU8j/12UIRhzSaUdQ+rQU5kGeFxm+hb1oh6pWWmv3uvmReDl0UnvtapVaIzo1jZbf/pD6ElLqSX+rUmOQNpJFa/r+sa4e/pBlAABoAAAAA3CUgShLdGIxsY7AUABPRrgCABdDuQ5GC7DqPQCgbbJUAoRSUj+NIEig0YfyWUho1VBBBA//uQZB4ABZx5zfMakeAAAAmwAAAAF5F3P0w9GtAAACfAAAAAwLhMDmAYWMgVEG1U0FIGCBgXBXAtfMH10000EEEEEECUBYln03TTTdNBDZopopYvrTTdNa325mImNg3TTPV9q3pmY0xoO6bv3r00y+IDGid/9aaaZTGMuj9mpu9Mpio1dXrr5HERTZSmqU36A3CumzN/9Robv/Xx4v9ijkSRSNLQhAWumap82WRSBUqXStV/YcS+XVLnSS+WLDroqArFkMEsAS+eWmrUzrO0oEmE40RlMZ5+ODIkAyKAGUwZ3mVKmcamcJnMW26MRPgUw6j+LkhyHGVGYjSUUKNpuJUQoOIAyDvEyG8S5yfK6dhZc0Tx1KI/gviKL6qvvFs1+bWtaz58uUNnryq6kt5RzOCkPWlVqVX2a/EEBUdU1KrXLf40GoiiFXK///qpoiDXrOgqDR38JB0bw7SoL+ZB9o1RCkQjQ2CBYZKd/+VJxZRRZlqSkKiws0WFxUyCwsKiMy7hUVFhIaCrNQsKkTIsLivwKKigsj8XYlwt/WKi2N4d//uQRCSAAjURNIHpMZBGYiaQPSYyAAABLAAAAAAAACWAAAAApUF/Mg+0aohSIRobBAsMlO//Kk4soosy1JSFRYWaLC4qZBYWFRGZdwqKiwkNBVmoWFSJkWFxX4FFRQWR+LsS4W/rFRb/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////VEFHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAU291bmRib3kuZGUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMjAwNGh0dHA6Ly93d3cuc291bmRib3kuZGUAAAAAAAAAACU=");
    snd.play();
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function getData(id) {
    $.ajax({
            url: "/en/main/citizen-profile-json/" + id,
        })
        .done(function(h) {
            var name = h.citizen.name;
            var status = (h.citizen.onlineStatus) ? 'on' : 'off';
            var location = h.location.residenceRegion.name;
            if (typeof locations[id] != 'undefined' && locations[id] != location) {
                beep();
                status = 'moved';
            }
            $('#pdr').append('<div class="' + status + '">' + name + ' - ' + location + '</div>');
            locations[id] = location;
        });
}

function checkPlayers(players) {
    $('#pdr').html('');
    $(players).each(function(id, player) {
        getData(parseInt(player));
    });
}

function listBattles(players, terrain) {
    $('#bhs').html('');
    $.ajax({
            url: "/en/military/campaigns-new",
        })
        .done(function(b) {
            var r = $.parseJSON(b);
            var a = 0;
            $('#pdr').after("<div id='bhs'></div>");
            $.each(r.battles, async function(i, b) {
                if (terrain != 'both' && b.type != terrain) {
                    return;
                }
                await sleep(20e3);
                $.ajax({
                        url: "/en/military/nbp-stats/" + i
                    })
                    .done(function(bs) {
                        var rb = $.parseJSON(bs);
                        //                console.log("Битка " + i);
                        //                console.log("Регион " + b.region.name);
                        $.each(rb.stats.current, function(a, z) {
                            $.each(z, function(d, dd) {
//                        console.log("Дивизия " + d + "--" + dd);
                                $.each(dd, function(nn, ct) {
//                            console.log("Страна " + nn + "--" + ct);
                                    $.each(ct.top_damage, function(nd, tops) {
                                        var citizen_id = tops.citizen_id;
                                        if (players.indexOf(citizen_id) >= 0) {
//                                    console.log(players.indexOf(citizen_id));
                                            $.ajax({
                                                    url: "/en/main/citizen-profile-json/" + citizen_id,
                                                })
                                                .done(function(h) {
                                                    var reqTime = r.request_time;
                                                    var roundTime = reqTime - r.battles[i].start;
                                                    var date = new Date(null);
                                                    date.setSeconds(roundTime);
                                                    var bTime = date.toISOString().substr(12, 4);
                                                    var hh = nd == 0 ? "bh" : "top";
                                                    var name = h.citizen.name;
                                                    $('#bhs').append("<div class='" + hh + "'><b>" + bTime + "</b> - <a class='eprev' title='" + tops.damage + "' href='/en/military/battlefield/" + i + "'>" + name + "</a> - " + b.region.name + "</div>");
                                                })
                                        }
//                                      console.log(nd + '--' + tops.citizen_id);
                                    })
                                })
                            })
                        })
                    })
            })
        })
}

var locations = [];

(function() {
    'use strict';
    style("#pederi{z-index: 99999; position: absolute; top: 0; right: 0;margin: 7px;padding: 5px;border-radius: 3px;font-size: 11px;background-color:rgba(255,255,255,0.8);border:1px solid #999;box-shadow: 10px 10px 5px #888888;};");
    style(".on{color: green;}");
    style(".moved{color: red;}");
    style('.modal {z-index: 99999;display: none; position: fixed; left: 0; top: 0; width: 100%; height: 100%; overflow: auto; background-color: rgb(0,0,0); background-color: rgba(0,0,0,0.4);');
    style('.modal-content {background-color: #fefefe; margin: 15% auto; padding: 20px; border: 1px solid #888; width: 600px;');
    style('.modal-content #title {display: block; font-family:Verdana;font-size: 12px; font-weight:700;}');
    style('#myModal p {margin: 5px 0;}');
    style('.cls {color: #aaa; float: right; font-size: 28px; font-weight: bold;line-height: 16px;');
    style('.cls:hover, .cls:focus {color: black; text-decoration: none; cursor: pointer;}');
    style('#ids{width: 400px;}');
    style('#bhs {margin-top: 5px;}; #bhs div a {color: #000;};');
    style('.bh {background: #ffc9c9};');
    style('.top {background: #fff4b7};');
    style('#setpederi {cursor: pointer;}');
    $('body').after("<div id='pederi'><div id='pdr'></div></div>");
    $('body').after('<div id="myModal" class="modal"><div class="modal-content"><span class="cls">&times;</span><p><label id="title">Enter comma separated ids:</label><input type="text" id="ids"><button id="idb">Save</button></p><p><label><input id="both" type="radio" name="terrain" value="both"> Both </label> <label> <input id="tanks" type="radio" name="terrain" value="tanks"> Tanks </label> <label><input id="aircraft" type="radio" name="terrain" value="aircraft"> Aircraft</label></p></div></div>');

    var dPlayers = new Array(5463210, 9123573, 2064778);
    var sPlayers = GM_getValue('players', dPlayers.join(','));
    var terrain = GM_getValue('terrain', 'both');
    $("#" + terrain).prop("checked", true);
    var players = sPlayers.split(',');

    $("#pederi").append("<button id='setpederi'>setup</button>");
    $("#setpederi").click(function() {
        $('#ids').val(sPlayers);
        $('#myModal').css('display', 'block');
    });
    $(".cls").click(function() {
        closeModal();
    });
    $(window).click(function(event) {
        if (event.target.id == 'myModal') {
            closeModal();
        }
    });
    $('#idb').click(function() {
        sPlayers = $('#ids').val();
        players = sPlayers.split(',');
        checkPlayers(players);
        terrain = $('input[type="radio"]:checked').val();
        terrain = terrain.length == 0 ? 'both' : terrain;
        GM_setValue('players', sPlayers);
        GM_setValue('terrain', terrain);
        closeModal();
    });

    checkPlayers(players);
    listBattles(players, terrain);

    setInterval(function() {
        checkPlayers(players);
    }, 40e3);

    setInterval(function() {
        listBattles(players, terrain);
    }, 250e3);

})();

var mylist = new Array(1639171, 174801, 5288369, 1768192, 3276677, 1870340, 2752407, 6904831, 2091498, 1436974, 3445497, 1317599);