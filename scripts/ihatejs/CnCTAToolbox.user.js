// ==UserScript==
// @version       1.2.0.0
// @name          CnCTAToolbox
// @namespace     ihatejs
// @description   Creates a "Scan city" button when selecting a city in Command & Conquer: Tiberium Alliances. To be used with the CnCTA Toolbox software.
// @include       http*://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @include       http*://cncapp*.alliances.commandandconquer.com/*/index.aspx*
// @grant         GM_log
// @grant         GM_setValue
// @grant         GM_getValue
// @grant         GM_registerMenuCommand
// @grant         GM_xmlhttpRequest
// @grant         GM_updatingEnabled
// @grant         unsafeWindow
// @contributor   PythEch (http://http://userscripts.org/users/220246)
// @contributor   jerbri (http://userscripts.org/users/507954)
// @contributor   Der_Flake
// @contributor   ihatejs
// ==/UserScript==
//2017-12-14: Returns object name instead of an object char
//2017-02-05: Copies the cncopt link to clipboard instead of opening in cncopt.com
//2017-02-05: Removed access to 3rd party sites
//2015-02-01: Modified for use with forgotten attack worlds (crystal production not necessary to support defense)!
//2015-01-15: Modified to connect to base growth simulator
//2013-03-03: Special thanks to jerbri for fixing this up so it worked again!
//2012-11-25: Special thanks to PythEch for fixing this up so it worked again!
// https://greasyfork.org/en/scripts/29356-cnctatoolbox-copy-data-to-clipboard              //Official link to this script

var scity = null;
var tcity = null;
var tbase = null;

//var citytypeButtonText = null;

try {
    unsafeWindow.__cnctatoolbox_version = "1.2.0.0";
    (function () {
        var cnctatoolbox_main = function () {

            var defense_unit_map = {
                /* GDI Defense Units */
                "GDI_Wall": "w",
                "GDI_Cannon": "c",
                "GDI_Antitank Barrier": "t",
                "GDI_Barbwire": "b",
                "GDI_Turret": "m",
                "GDI_Flak": "f",
                "GDI_Art Inf": "r",
                "GDI_Art Air": "e",
                "GDI_Art Tank": "a",
                "GDI_Def_APC Guardian": "g",
                "GDI_Def_Missile Squad": "q",
                "GDI_Def_Pitbull": "p",
                "GDI_Def_Predator": "d",
                "GDI_Def_Sniper": "s",
                "GDI_Def_Zone Trooper": "z",
                /* Nod Defense Units */
                "NOD_Def_Antitank Barrier": "t",
                "NOD_Def_Art Air": "e",
                "NOD_Def_Art Inf": "r",
                "NOD_Def_Art Tank": "a",
                "NOD_Def_Attack Bike": "p",
                "NOD_Def_Barbwire": "b",
                "NOD_Def_Black Hand": "z",
                "NOD_Def_Cannon": "c",
                "NOD_Def_Confessor": "s",
                "NOD_Def_Flak": "f",
                "NOD_Def_MG Nest": "m",
                "NOD_Def_Militant Rocket Soldiers": "q",
                "NOD_Def_Reckoner": "g",
                "NOD_Def_Scorpion Tank": "d",
                "NOD_Def_Wall": "w",

                /* Forgotten Defense Units */
                "FOR_Wall": "W",
                "FOR_Barbwire_VS_Inf": "b",
                "FOR_Barrier_VS_Veh": "t",
                "FOR_Inf_VS_Inf": "g",
                "FOR_Inf_VS_Veh": "r",
                "FOR_Inf_VS_Air": "q",
                "FOR_Sniper": "n",
                "FOR_Mammoth": "y",
                "FOR_Veh_VS_Inf": "o",
                "FOR_Veh_VS_Veh": "s",
                "FOR_Veh_VS_Air": "u",
                "FOR_Turret_VS_Inf": "m",
                "FOR_Turret_VS_Inf_ranged": "a",
                "FOR_Turret_VS_Veh": "v",
                "FOR_Turret_VS_Veh_ranged": "d",
                "FOR_Turret_VS_Air": "f",
                "FOR_Turret_VS_Air_ranged": "e",
                "FOR_Fortress_DEF_Barbwire_VS_Inf": "B",
                "": ""
            };

            var offense_unit_map = {
                /* GDI Offense Units */
                "GDI_APC Guardian": "g",
                "GDI_Commando": "c",
                "GDI_Firehawk": "f",
                "GDI_Juggernaut": "j",
                "GDI_Kodiak": "k",
                "GDI_Mammoth": "m",
                "GDI_Missile Squad": "q",
                "GDI_Orca": "o",
                "GDI_Paladin": "a",
                "GDI_Pitbull": "p",
                "GDI_Predator": "d",
                "GDI_Riflemen": "r",
                "GDI_Sniper Team": "s",
                "GDI_Zone Trooper": "z",

                /* Nod Offense Units */
                "NOD_Attack Bike": "b",
                "NOD_Avatar": "a",
                "NOD_Black Hand": "z",
                "NOD_Cobra": "r",
                "NOD_Commando": "c",
                "NOD_Confessor": "s",
                "NOD_Militant Rocket Soldiers": "q",
                "NOD_Militants": "m",
                "NOD_Reckoner": "k",
                "NOD_Salamander": "l",
                "NOD_Scorpion Tank": "o",
                "NOD_Specter Artilery": "p",
                "NOD_Venom": "v",
                "NOD_Vertigo": "t",
                "": ""
            };

            function findTechLayout(city) {
                for (var k in city) {
                    //console.log(typeof(city[k]), "1.city[", k, "]", city[k])
                    if ((typeof (city[k]) == "object") && city[k] && 0 in city[k] && 8 in city[k]) {
                        if ((typeof (city[k][0]) == "object") && city[k][0] && city[k][0] && 0 in city[k][0] && 15 in city[k][0]) {
                            if ((typeof (city[k][0][0]) == "object") && city[k][0][0] && "BuildingIndex" in city[k][0][0]) {
                                return city[k];
                            }
                        }
                    }
                }
                return null;
            }

            function findBuildings(city) {
                var cityBuildings = city.get_CityBuildingsData();
                for (var k in cityBuildings) {
                    if (PerforceChangelist >= 376877) {
                        if ((typeof (cityBuildings[k]) === "object") && cityBuildings[k] && "d" in cityBuildings[k] && "c" in cityBuildings[k] && cityBuildings[k].c > 0) {
                            return cityBuildings[k].d;
                        }
                    } else {
                        if ((typeof (cityBuildings[k]) === "object") && cityBuildings[k] && "l" in cityBuildings[k]) {
                            return cityBuildings[k].l;
                        }
                    }
                }
            }

            function isOffenseUnit(unit) {
                return (unit.get_UnitGameData_Obj().n in offense_unit_map);
            }

            function isDefenseUnit(unit) {
                return (unit.get_UnitGameData_Obj().n in defense_unit_map);
            }

            function getUnitArrays(city) {
                var ret = [];
                for (var k in city) {
                    if ((typeof (city[k]) == "object") && city[k]) {
                        for (var k2 in city[k]) {
                            if (PerforceChangelist >= 376877) {
                                if ((typeof (city[k][k2]) == "object") && city[k][k2] && "d" in city[k][k2]) {
                                    var lst = city[k][k2].d;
                                    if ((typeof (lst) == "object") && lst) {
                                        for (var i in lst) {
                                            if (typeof (lst[i]) == "object" && lst[i] && "get_CurrentLevel" in lst[i]) {
                                                ret.push(lst);
                                            }
                                        }
                                    }
                                }
                            } else {
                                if ((typeof (city[k][k2]) == "object") && city[k][k2] && "l" in city[k][k2]) {
                                    var lst = city[k][k2].l;
                                    if ((typeof (lst) == "object") && lst) {
                                        for (var i in lst) {
                                            if (typeof (lst[i]) == "object" && lst[i] && "get_CurrentLevel" in lst[i]) {
                                                ret.push(lst);
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                return ret;
            }

            function getDefenseUnits(city) {
                var arr = getUnitArrays(city);
                for (var i = 0; i < arr.length; ++i) {
                    for (var j in arr[i]) {
                        if (isDefenseUnit(arr[i][j])) {
                            return arr[i];
                        }
                    }
                }
                return [];
            }

            function getOffenseUnits(city) {
                var arr = getUnitArrays(city);
                for (var i = 0; i < arr.length; ++i) {
                    for (var j in arr[i]) {
                        if (isOffenseUnit(arr[i][j])) {
                            return arr[i];
                        }
                    }
                }
                return [];
            }

            function cnctatoolbox_create() {
                console.log("CnCTAToolbox v" + window.__cnctatoolbox_version + " loaded");

                var cnctatoolbox = {
                    selected_base: null,
                    keymap: {
                        /* GDI Buildings */
                        "GDI_Accumulator": "a",
                        "GDI_Refinery": "r",
                        "GDI_Trade Center": "u",
                        "GDI_Silo": "s",
                        "GDI_Power Plant": "p",
                        "GDI_Construction Yard": "y",
                        "GDI_Airport": "d",
                        "GDI_Barracks": "b",
                        "GDI_Factory": "f",
                        "GDI_Defense HQ": "q",
                        "GDI_Defense Facility": "w",
                        "GDI_Command Center": "e",
                        "GDI_Support_Art": "z",
                        "GDI_Support_Air": "x",
                        "GDI_Support_Ion": "i",

                        /* Forgotten Buildings */
                        "FOR_Silo": "s",
                        "FOR_Refinery": "r",
                        "FOR_Tiberium Booster": "b",
                        "FOR_Crystal Booster": "v",
                        "FOR_Trade Center": "u",
                        "FOR_Defense Facility": "w",
                        "FOR_Construction Yard": "y",

                        "FOR_EVENT_Construction_Yard": "y",
                        "FOR_NOD_Command Center": "e",
                        "FOR_GDI_Airport": "c",
                        "FOR_NOD_Airport": "j",
                        "FOR_GDI_Barracks": "k",
                        "FOR_NOD_Barracks": "l",
                        "FOR_GDI_Factory": "m",
                        "FOR_NOD_Factory": "o",

                        "FOR_Harvester_Tiberium": "h",
                        "FOR_Defense HQ": "q",
                        "FOR_Harvester_Crystal": "n",

                        /* Nod Buildings */
                        "NOD_Refinery": "r",
                        "NOD_Power Plant": "p",
                        "NOD_Harvester": "h",
                        "NOD_Construction Yard": "y",
                        "NOD_Airport": "d",
                        "NOD_Trade Center": "u",
                        "NOD_Defense HQ": "q",
                        "NOD_Barracks": "b",
                        "NOD_Silo": "s",
                        "NOD_Factory": "f",
                        "NOD_Harvester_Crystal": "n",
                        "NOD_Command Post": "e",
                        "NOD_Support_Art": "z",
                        "NOD_Support_Ion": "i",
                        "NOD_Accumulator": "a",
                        "NOD_Support_Air": "x",
                        "NOD_Defense Facility": "w",
                        //"NOD_Tech Lab": "",
                        //"NOD_Recruitment Hub": "X",
                        //"NOD_Temple of Nod": "X",



                        /* Nod Fortress Buildings */
                        "FOR_Fortress_BASE_Construction Yard": "Y",
                        "FOR_Fortress_BASE_MgNestHeavy": "N",

                        //''''''''''''''''''''
                        "FOR_Fortress_BASE_Tower": "H",
                        "FOR_Fortress_DEF_Tower": "H",
                        "FOR_Fortress_BASE_Turret_VS_Inf": "M",
                        "FOR_Fortress_DEF_Turret_VS_Inf": "M",
                        "FOR_Fortress_BASE_Turret_VS_Air": "F",
                        "FOR_Fortress_DEF_Turret_VS_Air": "F",
                        "FOR_Fortress_BASE_Turret_VS_Veh": "V",
                        "FOR_Fortress_DEF_Turret_VS_Veh": "V",
                        "FOR_Fortress_BASE_Turret_VS_Inf_ranged": "A",
                        "FOR_Fortress_DEF_Turret_VS_Inf_ranged": "A",
                        "FOR_Fortress_BASE_Turret_VS_Air_ranged": "E",
                        "FOR_Fortress_DEF_Turret_VS_Air_ranged": "E",
                        "FOR_Fortress_BASE_Turret_VS_Veh_ranged": "D",
                        "FOR_Fortress_DEF_Turret_VS_Veh_ranged": "D",

                        //''''''''''''''''''''
                        "FOR_Fortress_BASE_Wall": "W",
                        "FOR_Fortress_BASE_Barrier_VS_Veh": "T",
                        "FOR_Fortress_BASE_Barbwire_VS_Inf": "B",
                        "FOR_Fortress_DEF_Inf_VS_Inf": "G",
                        "FOR_Fortress_DEF_Unit_ranged": "J",
                        "FOR_Fortress_DEF_Sniper": "K",
                        "FOR_Fortress_DEF_Unit": "L",
                        "FOR_Fortress_DEF_Mammoth": "O",
                        "FOR_Barrier_VS_Veh": "t",
                        "FOR_Fortress_DEF_Veh_VS_Air": "U",

                        //FIX (or not??)
                        "FOR_Fortress_DEF_Barbwire_VS_Inf": "B",
                        "FOR_Barbwire_VS_Inf": "b",


                        /* GDI Defense Units */
                        "GDI_Wall": "w",
                        "GDI_Cannon": "c",
                        "GDI_Antitank Barrier": "t",
                        "GDI_Barbwire": "b",
                        "GDI_Turret": "m",
                        "GDI_Flak": "f",
                        "GDI_Art Inf": "r",
                        "GDI_Art Air": "e",
                        "GDI_Art Tank": "a",
                        "GDI_Def_APC Guardian": "g",
                        "GDI_Def_Missile Squad": "q",
                        "GDI_Def_Pitbull": "p",
                        "GDI_Def_Predator": "d",
                        "GDI_Def_Sniper": "s",
                        "GDI_Def_Zone Trooper": "z",

                        /* Nod Defense Units */
                        "NOD_Def_Antitank Barrier": "t",
                        "NOD_Def_Art Air": "e",
                        "NOD_Def_Art Inf": "r",
                        "NOD_Def_Art Tank": "a",
                        "NOD_Def_Attack Bike": "p",
                        "NOD_Def_Barbwire": "b",
                        "NOD_Def_Black Hand": "z",
                        "NOD_Def_Cannon": "c",
                        "NOD_Def_Confessor": "s",
                        "NOD_Def_Flak": "f",
                        "NOD_Def_MG Nest": "m",
                        "NOD_Def_Militant Rocket Soldiers": "q",
                        "NOD_Def_Reckoner": "g",
                        "NOD_Def_Scorpion Tank": "d",
                        "NOD_Def_Wall": "w",

                        /* Forgotten Defense Units */
                        "FOR_Wall": "W",
                        "FOR_Barbwire_VS_Inf": "b",
                        "FOR_Barrier_VS_Veh": "t",
                        "FOR_Inf_VS_Inf": "g",
                        "FOR_Inf_VS_Veh": "r",
                        "FOR_Inf_VS_Air": "q",
                        "FOR_Sniper": "n",
                        "FOR_Mammoth": "y",
                        "FOR_Veh_VS_Inf": "o",
                        "FOR_Veh_VS_Veh": "s",
                        "FOR_Veh_VS_Air": "u",
                        "FOR_Turret_VS_Inf": "m",
                        "FOR_Turret_VS_Inf_ranged": "a",
                        "FOR_Turret_VS_Veh": "v",
                        "FOR_Turret_VS_Veh_ranged": "d",
                        "FOR_Turret_VS_Air": "f",
                        "FOR_Turret_VS_Air_ranged": "e",

                        /* GDI Offense Units */
                        "GDI_APC Guardian": "g",
                        "GDI_Commando": "c",
                        "GDI_Firehawk": "f",
                        "GDI_Juggernaut": "j",
                        "GDI_Kodiak": "k",
                        "GDI_Mammoth": "m",
                        "GDI_Missile Squad": "q",
                        "GDI_Orca": "o",
                        "GDI_Paladin": "a",
                        "GDI_Pitbull": "p",
                        "GDI_Predator": "d",
                        "GDI_Riflemen": "r",
                        "GDI_Sniper Team": "s",
                        "GDI_Zone Trooper": "z",

                        /* Nod Offense Units */
                        "NOD_Attack Bike": "b",
                        "NOD_Avatar": "a",
                        "NOD_Black Hand": "z",
                        "NOD_Cobra": "r",
                        "NOD_Commando": "c",
                        "NOD_Confessor": "s",
                        "NOD_Militant Rocket Soldiers": "q",
                        "NOD_Militants": "m",
                        "NOD_Reckoner": "k",
                        "NOD_Salamander": "l",
                        "NOD_Scorpion Tank": "o",
                        "NOD_Specter Artilery": "p",
                        "NOD_Venom": "v",
                        "NOD_Vertigo": "t",

                        "<last>": "."
                    },

                    hms: function (s) {
                        var h = Math.floor(s / 3600); s %= 3600;
                        var m = Math.floor(s / 60); s %= 60;
                        var r = (h < 10 ? "0" + h.toString() : h.toString()) + ":";
                        r += (m < 10 ? "0" + m.toString() : m.toString()) + ":";
                        s = s.toFixed(0);
                        r += (s < 10 ? "0" + s.toString() : s.toString());
                        return r;
                    },

                    make_sharelink: function () {
                        try {
                            var selected_base = cnctatoolbox.selected_base;
                            var city_id = selected_base.get_Id();
                            var city = ClientLib.Data.MainData.GetInstance().get_Cities().GetCity(city_id);

                            var own_city = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();
                            var alliance = ClientLib.Data.MainData.GetInstance().get_Alliance();
                            var server = ClientLib.Data.MainData.GetInstance().get_Server();
                            var doLinkCity = (city.get_CityFaction() > 2 ? own_city.get_CityFaction() : city.get_CityFaction());
                            var doCity = (city.get_CityFaction() > 2 ? own_city : city);

                            tbase = selected_base;
                            tcity = city;
                            scity = own_city;

                            //var link = "CnCTAToolboxCityString";
                            var link = "CnCTAToolboxCityString";
                            link += "|";
                            link += window.__cnctatoolbox_version; /* link version */
                            link += "|";
                            link += city.get_CityFaction();
                            link += "|";
                            link += doLinkCity; /* Add offense faction */
                            link += "|";

                            var serverName = ClientLib.Data.MainData.GetInstance().get_Server().get_Name();
                            var serverID = ClientLib.Data.MainData.GetInstance().get_Server().get_WorldId();
                            var playerNameOwn = city.get_PlayerName();
                            var allianceNameOwn = city.get_AllianceName();
                            var selectedCityName = city.get_Name();
                            var selectedCityPlayerName = city.get_OwnerName();
                            var selectedCityAlliance = city.get_OwnerAllianceName();
                            var coordsCity = city.get_PosX() + ":" + city.get_PosY();
                            var levelBase = city.get_LvlBase();
                            var levelDefense = city.get_LvlDefense();
                            var levelOffense = city.get_LvlOffense();
                            var repairTime_Aircraft = city.get_CityUnitsData().GetRepairTimeFromEUnitGroup(ClientLib.Data.EUnitGroup.Aircraft, false);
                            var repairTime_Vehicle = city.get_CityUnitsData().GetRepairTimeFromEUnitGroup(ClientLib.Data.EUnitGroup.Vehicle, false);
                            var repairTime_Infantry = city.get_CityUnitsData().GetRepairTimeFromEUnitGroup(ClientLib.Data.EUnitGroup.Infantry, false);

                            //var selectedCityPlayerId = city.get_PlayerId();
                            //var selectedCityAllianceId = city.get_OwnerAllianceId();

                            //window.alert("City Id: " + selectedCityId + "\n" +
                            //             "Player name:   " + selectedCityPlayerName + "\n" +
                            //             "Player Id:   " + selectedCityPlayerId + "\n" +
                            //             "Alliance Id: " + selectedCityAllianceId)

                            //try {
                            //    var myAllianceMembers = ClientLib.Data.MainData.GetInstance().get_Alliance().get_MemberData().d;
                            //    var playerId = selectedCityPlayerId;
                            //    if (myAllianceMembers[playerId] !== undefined) {
                            //        var onlineState = myAllianceMembers[playerId].Points;
                            //        window.alert(onlineState);
                            //        return onlineStateColor[onlineState];
                            //    }
                            //} catch (ex) {
                            //    console.log("MaelstromTools_CityOnlineStateColorer CityTextcolor error: ", ex);
                            //}

                            //var MemberInfo = ClientLib.Data.MemberInfo(city.get_OwnerName().Rank);
                            //window.alert(city.get_OwnerID());

                            //var serverID = ClientLib.Data.MainData.GetInstance().get_Server().get_CreationTime();
                            //var now = new Date();
                            //window.alert(city.get_OwnerNameScore());

                            link += serverName;
                            link += "|" + serverID;
                            link += "|" + playerNameOwn;
                            link += "|" + allianceNameOwn;
                            link += "|" + selectedCityName;
                            link += "|" + selectedCityPlayerName;
                            link += "|" + selectedCityAlliance;
                            link += "|" + coordsCity;
                            link += "|" + levelBase;
                            link += "|" + levelDefense;
                            link += "|" + levelOffense;
                            link += "|" + repairTime_Aircraft;
                            link += "|" + repairTime_Vehicle;
                            link += "|" + repairTime_Infantry;

                            var lootTiberium, lootCrystal, lootCredits, lootRP, lootRepairTime, lootCommandPoints;

                            try {
                                var b = { 1: 0, 2: 0, 3: 0, 6: 0, 7: 0, 11: 0 }, a = ClientLib.API.Battleground.GetInstance().GetLootFromCurrentCity(), c;
                                for (c in a) b[a[c].Type] += a[c].Count;

                                lootTiberium = b[1];
                                lootCrystal = b[2];
                                lootCredits = b[3];
                                lootRP = b[6];
                                lootRepairTime = b[11];
                                lootCommandPoints = 0;

                            } catch (e) {
                                window.alert("error: " + e);
                            }

                            link += "|" + lootTiberium;
                            link += "|" + lootCrystal;
                            link += "|" + lootCredits;
                            link += "|" + lootRP;
                            link += "|" + lootRepairTime;
                            link += "|" + lootCommandPoints;
                            link += "|";

                            defense_units = [];
                            for (var i = 0; i < 20; ++i) {
                                var col = [];
                                for (var j = 0; j < 9; ++j) {
                                    col.push(null);
                                }
                                defense_units.push(col);
                            }
                            var defense_unit_list = getDefenseUnits(city);
                            if (PerforceChangelist >= 376877) {
                                for (var i in defense_unit_list) {
                                    var unit = defense_unit_list[i];

                                    defense_units[unit.get_CoordX()][unit.get_CoordY() + 8] = unit;
                                }
                            } else {
                                for (var i = 0; i < defense_unit_list.length; ++i) {
                                    var unit = defense_unit_list[i];
                                    defense_units[unit.get_CoordX()][unit.get_CoordY() + 8] = unit;
                                }
                            }

                            offense_units = [];
                            for (var i = 0; i < 20; ++i) {
                                var col = [];
                                for (var j = 0; j < 9; ++j) {
                                    col.push(null);
                                }
                                offense_units.push(col);
                            }

                            //var offense_unit_list = getOffenseUnits(own_city);
                            var offense_unit_list = getOffenseUnits(doCity);
                            if (PerforceChangelist >= 376877) {
                                for (var i in offense_unit_list) {
                                    var unit = offense_unit_list[i];
                                    offense_units[unit.get_CoordX()][unit.get_CoordY() + 16] = unit;
                                }
                            } else {
                                for (var i = 0; i < offense_unit_list.length; ++i) {
                                    var unit = offense_unit_list[i];
                                    offense_units[unit.get_CoordX()][unit.get_CoordY() + 16] = unit;
                                }
                            }

                            var techLayout = findTechLayout(city);
                            var buildings = findBuildings(city);
                            for (var i = 0; i < 20; ++i) {
                                row = [];
                                for (var j = 0; j < 9; ++j) {
                                    var spot = i > 16 ? null : techLayout[j][i];
                                    var level = 0;

                                    link += "<"

                                    var building = null;
                                    if (spot && spot.BuildingIndex >= 0) {
                                        building = buildings[spot.BuildingIndex];
                                        level = building.get_CurrentLevel();
                                    }
                                    var defense_unit = defense_units[j][i];
                                    if (defense_unit) {
                                        level = defense_unit.get_CurrentLevel();
                                    }
                                    var offense_unit = offense_units[j][i];
                                    if (offense_unit) {
                                        level = offense_unit.get_CurrentLevel();
                                        //window.alert(offense_unit.get_HitpointsPercent());
                                    }
                                    if (level >= 1) {
                                        link += level;
                                    }

                                    switch (i > 16 ? 0 : city.GetResourceType(j, i)) {
                                        case 0:
                                            if (building) {
                                                var techId = building.get_MdbBuildingId();
                                                var Id = building.get_Id();

                                                //window.alert("BASE: " + GAMEDATA.Tech[techId].n + "@" + building.get_HitpointsPercent());
                                                var health = building.get_HitpointsPercent() * 100;
                                                var t = Math.trunc(health)
                                                var h = t.toFixed(0);

                                                link += "^" + GAMEDATA.Tech[techId].n + "@" + h;

                                                //if (GAMEDATA.Tech[techId].n in cnctatoolbox.keymap) {
                                                ////link += cnctatoolbox.keymap[GAMEDATA.Tech[techId].n];
                                                //link += "^" + GAMEDATA.Tech[techId].n;

                                                //} else {
                                                //console.log("cnctatoolbox [5]: Unhandled building: " + techId, building);
                                                //link += ".";
                                                //}
                                            } else if (defense_unit) {
                                                //window.alert("DEF: " + defense_unit.get_UnitGameData_Obj().n);

                                                var health = defense_unit.get_HitpointsPercent() * 100;
                                                var t = Math.trunc(health)
                                                var h = t.toFixed(0);

                                                link += "^" + defense_unit.get_UnitGameData_Obj().n + "@" + h;

                                                //if (defense_unit.get_UnitGameData_Obj().n in cnctatoolbox.keymap) {
                                                ////link += cnctatoolbox.keymap[defense_unit.get_UnitGameData_Obj().n];
                                                //link += "^" + defense_unit.get_UnitGameData_Obj().n;

                                                //} else {
                                                //console.log("cnctatoolbox [5]: Unhandled unit: " + defense_unit.get_UnitGameData_Obj().n);
                                                //link += ".";
                                                //}
                                            } else if (offense_unit) {
                                                //window.alert(offense_unit.get_UnitGameData_Obj().n);
                                                var health = offense_unit.get_HitpointsPercent() * 100;
                                                var t = Math.trunc(health)
                                                var h = t.toFixed(0);

                                                link += "^" + offense_unit.get_UnitGameData_Obj().n + "@" + h;

                                                //window.alert(offense_unit.get_UnitGameData_Obj().n + "@" + offense_unit.get_HitpointsPercent());

                                                //if (offense_unit.get_UnitGameData_Obj().n in cnctatoolbox.keymap) {
                                                ////link += cnctatoolbox.keymap[offense_unit.get_UnitGameData_Obj().n];
                                                //link += "^" + offense_unit.get_UnitGameData_Obj().n;
                                                //} else {
                                                //console.log("cnctatoolbox [5]: Unhandled unit: " + offense_unit.get_UnitGameData_Obj().n);
                                                //link += ".";
                                                //}
                                            } else {
                                                //window.alert("else: " + defense_unit.get_UnitGameData_Obj().n);

                                                link += ".";
                                            }
                                            break;
                                        case 1:
                                            /* Crystal */
                                            if (spot.BuildingIndex < 0) {
                                                link += "0^Crystal_Field_Empty@0";
                                            }
                                            else {
                                                building = buildings[spot.BuildingIndex];

                                                //window.alert("harvester: " + GAMEDATA.Tech[techId].n + "@" + building.get_HitpointsPercent());

                                                var health = building.get_HitpointsPercent() * 100;
                                                var t = Math.trunc(health)
                                                var h = t.toFixed(0);

                                                link += "^Crystal_Field_Harvester" + "@" + h;
                                            }
                                            break;
                                            //if (spot.BuildingIndex < 0) link += "c";
                                            //else link += "n";
                                            //break;
                                        case 2:
                                            /* Tiberium */
                                            if (spot.BuildingIndex < 0) {
                                                link += "0^Tiberium_Field_Empty@0";
                                            }
                                            else {
                                                building = buildings[spot.BuildingIndex];

                                                var health = building.get_HitpointsPercent() * 100;
                                                var t = Math.trunc(health)
                                                var h = t.toFixed(0);

                                                link += "^Tiberium_Field_Harvester" + "@" + h;
                                            }
                                            break;
                                            //if (spot.BuildingIndex < 0) link += "t";
                                            //else link += "h";
                                            //break;
                                        case 4:
                                            /* Woods */
                                            link += "0^Def_Obstacle_Woods@0";
                                            break;
                                            //link += "j";
                                            //break;
                                        case 5:
                                            /* Scrub */
                                            link += "0^Def_Obstacle_Scrub@0";
                                            break;
                                            //link += "h";
                                            //break;
                                        case 6:
                                            /* Oil */
                                            link += "0^Def_Obstacle_Oil@0";
                                            break;
                                            //link += "l";
                                            //break;
                                        case 7:
                                            /* Swamp */
                                            link += "0^Def_Obstacle_Swamp@0";
                                            break;
                                            //link += "k";
                                            //break;
                                        default:
                                            console.log("cnctatoolbox [4]: Unhandled resource type: " + city.GetResourceType(j, i));
                                            link += ".";
                                            break;
                                    }

                                    link += ">"
                                }
                            }
                            /* Tack on our alliance bonuses */
                            if (alliance && scity.get_AllianceId() == tcity.get_AllianceId()) {
                                link += "|" + alliance.get_POITiberiumBonus();
                                link += "|" + alliance.get_POICrystalBonus();
                                link += "|" + alliance.get_POIPowerBonus();
                                link += "|" + alliance.get_POIInfantryBonus();
                                link += "|" + alliance.get_POIVehicleBonus();
                                link += "|" + alliance.get_POIAirBonus();
                                link += "|" + alliance.get_POIDefenseBonus();
                            }

                            if (server.get_TechLevelUpgradeFactorBonusAmount() != 1.20) {
                                link += "|NewEconomy";
                            } else {
                                link += "|OldEconomy";
                            }

                            /* Additional game data #1 */
                            link += "|" + city.get_Id();
                            link += "|" + ClientLib.Data.MainData.GetInstance().get_Player().get_Id();
                            link += "|" + ClientLib.Data.MainData.GetInstance().get_Alliance().get_Id();
                            link += "|" + ClientLib.Data.MainData.GetInstance().get_Alliance().get_Announcement();

                            //Include changelist
                            // Include a question mark if you are unsure about the latest known patch number, for instane "18.6?"
                            link += "|" + PerforceChangelist;

                            // Obsolete
                            var LatestKnownPatch = "18.1";
                            var LatestKnownChangelist = 469579;

                            switch (PerforceChangelist) {
                                case LatestKnownChangelist:
                                    link += "|" + LatestKnownPatch;
                                    break;
                                case 469485:
                                    link += "|" + "18.1";
                                    break;
                                case 469131:
                                    link += "|" + "18.1";
                                    break;
                                case 469076:
                                    link += "|" + "17.6.1?";
                                    break;
                                case 468879:
                                    link += "|" + "17.6.0";
                                    break;
                                case 468864:
                                    link += "|" + "17.6";
                                    break;
                                case 468549:
                                    link += "|" + "17.5";
                                    break;
                                default:
                                    // if (PerforceChangelist == LatestKnownChangelist) { link += "|" + LatestKnownPatch; }
                                    if (PerforceChangelist > LatestKnownChangelist) { link += "|> " + LatestKnownPatch; }
                                    if (PerforceChangelist < LatestKnownChangelist) { link += "|< " + LatestKnownPatch; }
                            }
                            // End of obsolete

                            //More data
                            link += "|" + tcity.get_TerritoryRadius();
                            link += "|" + tcity.get_TerritoryWeight();
                            link += "|" + tcity.get_Version();
                            link += "|" + tcity.get_isProtected();

                            //Include some serverinfo...
                            link += "|" + server.get_TechLevelUpgradeFactorBonusAmount();
                            link += "|" + server.get_TechLevelUpgradeFactorBonusTime();
                            link += "|" + server.get_TechLevelUpgradeFactorResource();
                            link += "|" + server.get_TechLevelUpgradeFactorResourceProduction();
                            link += "|" + server.get_TechLevelUpgradeFactorStorage();
                            link += "|" + server.get_TechLevelUpgradeFactorValues();
                            link += "|" + server.get_UnitRefundPercent();
                            link += "|" + server.get_BuildingRefundPercent();
                            link += "|" + server.get_CombatMoralVersion();
                            link += "|" + server.get_GlobalNerfModifier();
                            link += "|" + server.get_UnitLevelUpgradeFactorCombatValues();
                            link += "|" + server.get_PlayerUpgradeCap();
                            link += "|" + server.get_MaxCenterLevel();
                            link += "|" + server.get_IsPublicTestEnvironment();
                            link += "|" + server.get_ForgottenAttacksEnabled();
                            link += "|" + server.get_UsesRebalancingI();
                            link += "|" + server.get_PlunderExploitFixesEnabled();

                            //Include datetime added
                            //link += "|" + Date.now();

                            /* Additional game data #2*/
                            var playerResearchPoints = ClientLib.Data.MainData.GetInstance().get_Player().get_ResearchPoints();
                            var playerTotalPoints = ClientLib.Data.MainData.GetInstance().get_Player().get_ScorePoints();
                            var playerSupplyPoints = ClientLib.Data.MainData.GetInstance().get_Player().GetSupplyPointCount();
                            var playerCreditsCount = ClientLib.Data.MainData.GetInstance().get_Player().GetCreditsCount();
                            var playerLevel = ClientLib.Data.MainData.GetInstance().get_Player().get_Level();
                            var playerBases = 0
                            var playerFunds = ClientLib.Data.MainData.GetInstance().get_Inventory().get_PlayerFunds();

                            link += "|" + playerResearchPoints;
                            link += "|" + playerTotalPoints;
                            link += "|" + playerSupplyPoints;
                            link += "|" + playerCreditsCount;
                            link += "|" + playerLevel;

                            //window.alert(playerLevel);

                            //var selectedCityId = city.get_Id();
                            //var selectedCityPlayerId = city.get_PlayerId();
                            //var selectedCityAllianceId = city.get_OwnerAllianceId();
                            //window.alert("City Id: " + selectedCityId + "\n" +
                            //    "Player name:   " + selectedCityPlayerName + "\n" +
                            //    "Player Id:   " + selectedCityPlayerId + "\n" +
                            //    "Alliance Id: " + selectedCityAllianceId)

                            try {
                                var myAllianceMembers = ClientLib.Data.MainData.GetInstance().get_Alliance().get_MemberData().d;
                                //var playerId = selectedCityPlayerId;
                                var playerId = ClientLib.Data.MainData.GetInstance().get_Player().get_Id();
                                if (myAllianceMembers[playerId] !== undefined) {
                                    playerBases = myAllianceMembers[playerId].Bases;
                                    //window.alert(playerBases);
                                    //return onlineStateColor[onlineState];
                                }
                            } catch (ex) {
                                console.log("myAllianceMembers Bases error: ", ex);
                            }

                            link += "|" + playerBases;
                            link += "|" + playerFunds;
                            link += "|" + GameVersion;

                            //try {
                                //link += "|" + ClientLib.Data.MainData.GetInstance().get_Server().get_GameVersion();
                              //  link += "|" + GameVersion;
                            //} catch (ex) {
                              //  console.log("Could not get game version: ", ex);
                                //link += "|" + "unknown";
                            //}

                            ////////////////////////////////////////////////////////////////////////////////////////
                            //////// END OF LINK STRING \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
                            ////////////////////////////////////////////////////////////////////////////////////////

                            // Copies a string to the clipboard. Must be called from within an
                            // event handler such as click. May return false if it failed, but
                            // this is not always possible. Browser support for Chrome 43+,
                            // Firefox 42+, Safari 10+, Edge and IE 10+.
                            // IE: The clipboard feature may be disabled by an administrator. By
                            // default a prompt is shown the first time the clipboard is
                            // used (per session).
                            function copyToClipboard(text) {
                                if (window.clipboardData && window.clipboardData.setData) {
                                    // IE specific code path to prevent textarea being shown while dialog is visible.
                                    return clipboardData.setData("Text", text);

                                } else if (document.queryCommandSupported && document.queryCommandSupported("copy")) {
                                    var textarea = document.createElement("textarea");
                                    textarea.textContent = text;
                                    textarea.style.position = "fixed";  // Prevent scrolling to bottom of page in MS Edge.
                                    document.body.appendChild(textarea);
                                    textarea.select();
                                    try {
                                        return document.execCommand("copy");  // Security exception may be thrown by some browsers.
                                    } catch (ex) {
                                        //window.alert("Copy to clipboard failed.");

                                        console.warn("Copy to clipboard failed.", ex);
                                        return false;
                                    } finally {
                                        document.body.removeChild(textarea);
                                    }
                                }
                            }

                            copyToClipboard(link);  // Need to call this function prior to the "main" function, or else
                            // we must click the button twice

                            document.body.addEventListener('mousedown', function () {
                                copyToClipboard(link);
                            }, false);

                            link = "";
                            ////////////////////////////////////////////////////////////////////////////////////

                        } catch (e) {
                            console.log("cnctatoolbox [1]: ", e);
                        }
                    }
                };
                if (!webfrontend.gui.region.RegionCityMenu.prototype.__cnctatoolbox_real_showMenu) {
                    webfrontend.gui.region.RegionCityMenu.prototype.__cnctatoolbox_real_showMenu = webfrontend.gui.region.RegionCityMenu.prototype.showMenu;
                }

                var check_ct = 0;
                var check_timer = null;
                var button_enabled = 123456;
                /* Wrap showMenu so we can inject our Sharelink at the end of menus and
                 * sync Base object to our cnctatoolbox.selected_base variable  */
                webfrontend.gui.region.RegionCityMenu.prototype.showMenu = function (selected_base) {
                    try {
                        var self = this;
                        //console.log(selected_base);
                        cnctatoolbox.selected_base = selected_base;
                        if (this.__cnctatoolbox_initialized != 1) {
                            this.__cnctatoolbox_initialized = 1;
                            this.__cnctatoolbox_links = [];
                            for (var i in this) {
                                try {
                                    if (this[i] && this[i].basename == "Composite") {
                                        var link = new qx.ui.form.Button("Scan city");
                                        link.addListener("execute", function () {
                                            var bt = qx.core.Init.getApplication();
                                            bt.getBackgroundArea().closeCityInfo();
                                            cnctatoolbox.make_sharelink();


                                        });
                                        this[i].add(link);
                                        this.__cnctatoolbox_links.push(link);
                                    }
                                } catch (e) {
                                    console.log("cnctatoolbox [2]: ", e);
                                }
                            }
                        }
                        var tf = false;

                        //window.alert(selected_base.get_VisObjectType().getName);

                        switch (selected_base.get_VisObjectType()) {
                            case ClientLib.Vis.VisObject.EObjectType.RegionCityType:
                                switch (selected_base.get_Type()) {
                                    case ClientLib.Vis.Region.RegionCity.ERegionCityType.Own:
                                        tf = true;
                                        break;
                                    case ClientLib.Vis.Region.RegionCity.ERegionCityType.Alliance:
                                    case ClientLib.Vis.Region.RegionCity.ERegionCityType.Enemy:
                                        tf = true;
                                        break;
                                }
                                break;
                            case ClientLib.Vis.VisObject.EObjectType.RegionGhostCity:
                                tf = false;
                                console.log("cnctatoolbox: Ghost City selected.. ignoring because we don't know what to do here");
                                break;
                            case ClientLib.Vis.VisObject.EObjectType.RegionNPCBase:
                                tf = true;
                                break;
                            case ClientLib.Vis.VisObject.EObjectType.RegionNPCCamp:
                                tf = true;
                                break;
                            case ClientLib.Vis.VisObject.EObjectType.RegionNPCFF:
                                tf = true;
                                break;
                        }

                        tf = true;

                        var orig_tf = tf;

                        function check_if_button_should_be_enabled() {
                            try {
                                tf = orig_tf;
                                var selected_base = cnctatoolbox.selected_base;
                                var still_loading = false;
                                if (check_timer !== null) {
                                    clearTimeout(check_timer);
                                }

                                /* When a city is selected, the data for the city is loaded in the background.. once the
                                 * data arrives, this method is called again with these fields set, but until it does
                                 * we can't actually generate the link.. so this section of the code grays out the button
                                 * until the data is ready, then it'll light up. */
                                if (selected_base && selected_base.get_Id) {
                                    var city_id = selected_base.get_Id();
                                    var city = ClientLib.Data.MainData.GetInstance().get_Cities().GetCity(city_id);
                                    //if (!city || !city.m_CityUnits || !city.m_CityUnits.m_DefenseUnits) {
                                    //console.log("City", city);
                                    //console.log("get_OwnerId", city.get_OwnerId());
                                    if (!city || city.get_OwnerId() === 0) {
                                        still_loading = true;
                                        tf = false;
                                    }
                                } else {
                                    tf = false;
                                }
                                if (tf != button_enabled) {
                                    button_enabled = tf;
                                    for (var i = 0; i < self.__cnctatoolbox_links.length; ++i) {
                                        self.__cnctatoolbox_links[i].setEnabled(tf);

                                    }
                                }
                                if (!still_loading) {
                                    check_ct = 0;
                                } else {
                                    if (check_ct > 0) {
                                        check_ct--;
                                        check_timer = setTimeout(check_if_button_should_be_enabled, 100);
                                    } else {
                                        check_timer = null;
                                    }
                                }

                            } catch (e) {
                                console.log("cnctatoolbox [3]: ", e);
                                tf = false;
                            }
                        }

                        check_ct = 50;
                        check_if_button_should_be_enabled();
                    } catch (e) {
                        console.log("cnctatoolbox [3]: ", e);
                    }

                    this.__cnctatoolbox_real_showMenu(selected_base);
                }
            }

            /* Nice load check (ripped from AmpliDude's LoU Tweak script) */
            function cnc_check_if_loaded() {
                try {
                    if (typeof qx != 'undefined') {
                        a = qx.core.Init.getApplication(); // application
                        if (a) {
                            cnctatoolbox_create();
                        } else {
                            window.setTimeout(cnc_check_if_loaded, 1000);
                        }
                    } else {
                        window.setTimeout(cnc_check_if_loaded, 1000);
                    }
                } catch (e) {
                    if (typeof console != 'undefined') console.log(e);
                    else if (window.opera) opera.postError(e);
                    else GM_log(e);
                }
            }
            if (/commandandconquer\.com/i.test(document.domain)) window.setTimeout(cnc_check_if_loaded, 1000);
        };

        // injecting because we can't seem to hook into the game interface via unsafeWindow
        //   (Ripped from AmpliDude's LoU Tweak script)
        var script_block = document.createElement("script");
        txt = cnctatoolbox_main.toString();
        script_block.innerHTML = "(" + txt + ")();";
        script_block.type = "text/javascript";
        if (/commandandconquer\.com/i.test(document.domain)) document.getElementsByTagName("head")[0].appendChild(script_block);
    })();
} catch (e) {
    GM_log(e);
    window.alert(e.message);

}
