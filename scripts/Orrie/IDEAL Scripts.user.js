// ==UserScript==
// @name        IDEAL Scripts
// @version     1.08
// @description All IDEAL Scripts for idealclan.eu merged into one
// @author      Orrie
// @namespace   http://idealclan.eu/viewtopic.php?f=7&t=1791#p57645
// @icon        https://i.imgur.com/9GeRjIp.png
// @include     http*://*idealclan.eu/*
// @grant       GM_xmlhttpRequest
// @grant       GM.xmlHttpRequest
// @connect     eu.wargaming.net
// @connect     api.worldoftanks.eu
// @connect     api.twitch.tv
// @require     https://greasyfork.org/scripts/18946-tablesort/code/Tablesort.js?version=120660
// @require     https://greasemonkey.github.io/gm4-polyfill/gm4-polyfill.js
// @license     Mr Sexii License
// ==/UserScript==
(function() {
	// global variables
	const date = new Date();

	let streamTable, battleTable, updateInterval, style, sortTable = false, time, styleDynBattles, styleDynFinales, inputSpan, timeJump = false, timeInterval, styleDynTimezone;

	// script variables
	const bs = {
		href: document.location.href,
		vers: ((GM.info) ? GM.info.script.version : ""),
		tw: {
			api: "https://api.twitch.tv/kraken/streams/?channel=",
			key: "fbs3puqef627klk0wf9jrgjach2h3y9"
		},
		cw: {
			status: JSON.parse(localStorage.getItem("battles_force")) || false,
			event: false,
			gold: true,
			fame: 400,
			tier: "Ɵ",
			bats: "Ɵ",
			elo: "Ɵ",
			current: 0,
			globalmap: false
		},
		dyn: {
			conc: {},
			prov: [],
			plan: 0,
			check: 0,
			gold: 0
		},
		clan: {
			ideal: 500010805,
			id: JSON.parse(localStorage.getItem("battles_clanid")) || 500010805,
			tag: "Ɵ",
			emblem: "Ɵ",
			color: "Ɵ"
		},
		table: {
			static: 10,
			eu: [17, 18, 19, 20, 21, 22, 23, 24],
			c: "",
			s: []
		},
		front_loc: {
			"arms_race_eu_league1": " (BF)",
			"arms_race_eu_league2": " (AF)",
			"arms_race_eu_league3": " (EF)",
			"soldiers_of_fortune_eu_league1": " (BF)",
			"soldiers_of_fortune_eu_league2": " (AF)",
			"soldiers_of_fortune_eu_league3": " (EF)"
		},
		app_id: "a7595640a90bf2d19065f3f2683b171c",
		web: {
			// browser detection
			gecko: typeof InstallTrigger !== 'undefined',
			chrome: !!window.chrome && !!window.chrome.webstore
		},
		time: {
			h: date.getHours(),
			m: date.getMinutes(),
			o: (date.getTimezoneOffset() > 0 ? -Math.abs(date.getTimezoneOffset()) : Math.abs(date.getTimezoneOffset())) / 60
		},
		debug: document.getElementsByClassName("headerbnl")[0].innerHTML.match(/Orrie/) ? true : false
	};
	bs.api = {
		event: `https://api.worldoftanks.eu/wot/globalmap/events/?application_id=${bs.app_id}&limit=1`,
		clan: `https://eu.wargaming.net/globalmap/game_api/clan/${bs.clan.id}/battles`,
		bats: "https://eu.wargaming.net/globalmap/game_api/map_fill_info?aliases=",
		tourney: "https://eu.wargaming.net/globalmap/game_api/tournament_info?alias=",
		prov: "https://eu.wargaming.net/globalmap/game_api/province_info?alias=",
		provs: `https://api.worldoftanks.eu/wot/globalmap/clanprovinces/?application_id=${bs.app_id}&clan_id=${bs.clan.id}`,
		divs: "https://eu.wargaming.net/globalmap/game_api/wot/clan_tactical_data", // need authentication from global map
		raids: "https://eu.wargaming.net/globalmap/game_api/wot/raids" // need authentication from global map
	};
	bs.time.r = ((bs.time.m >= 15 && bs.time.m <= 45) ? [bs.time.h, "30"] : ((bs.time.m <= 15) ? [bs.time.h, "00"] : [(bs.time.h + 1), "00"]));
	bs.time.t = `${bs.time.r[0]}_${bs.time.r[1]}`;

	// image codes and stream list
	const img = {
		main: "data:image/png;base64,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",
		flags: "data:image/png;base64,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",
		clans: "data:image/png;base64,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"
	},
	streams = [
		// IDEAD
		["BeneficialCucumber", "beneficial_cucumber_", "ideal", ["en", "de"], "0"],
		["Hamu", "drhamu", "ideal", ["en", "no"], "0"],
		["HowTheStoryEnds", "howthestoryends", "ideal", "en", "0"],
		["Kriegerseele", "kriegerseele_", "ideal", ["en", "de"], "0"],
		["Lilsaah", "lilsaah", "ideal", ["en", "no"], "0"],
		["Malgorn", "malgorn", "ideal", "en", "0"],
		["McMokka", "mcmokka", "ideal", ["en", "de"], "0"],
		["MrOmen", "mromenx", "ideal", ["en", "pl"], "0"],
		["Orrie", "orrie_", "ideal", ["en", "no"], "0"],
		["Otto_von_HEATmarck", "otto_von_heatmarck", "ideal", ["en", "de"], "0"],
		["R0XJi", "roxjiwot", "ideal", ["en", "fi"], "0"],
		["Remmke", "remmke", "ideal", ["en", "de"], "0"],
		["Sekundenkleber", "sekundenkleber", "ideal", ["en", "de"], "0"],
		["Schnueres", "schnueres", "ideal", ["en", "de"], "0"],
		["Stratikat", "stratikat", "ideal", "en", "0"],
		["Taylor_Swift", "gashting", "ideal", "en", "0"],
		["TheGamingLion", "thegaminglion7", "ideal", "en", "0"],
		["veitileiN", "veitilein", "ideal", ["en", "de"], "0"],
		// IDEAD friends
		["Evidence", "evidence__", ["fnd", "vole"], ["en", "cz"], "0"],
		["Fjellreven", "fjellreven_tv", "fnd", ["en", "no"], "0"],
		["Keezoo", "keezoo__", ["fnd", "fame"], "pl", "0"],
		["Rudko", "rudko44", ["fnd", "s3al"], "en", "0"],
		["Weenis", "weenis__", ["fnd", "fame"], "en", "0"],
		// S3AL
		["Andgus", "andgus_swe", "s3al", ["en", "se"], "1"],
		["Atrevir", "atrevir", "s3al", "en", "1"],
		["DMminion", "dmminion", "s3al", "en", "1"],
		["Dukkerz", "dukkerz", "s3al", "en", "1"],
		["Elecktr", "elecktr_pl", "s3al", "en", "1"],
		["Faptastic_Panda", "faptastic_panda", "s3al", "en", "1"],
		["Fosco", "fosc0", "s3al", "en", "1"],
		["Hallucinogen", "hailucinogen", "s3al", "en", "1"],
		["Hassh", "hashonline", "s3al", "en", "1"],
		["Jona", "jonasb7", "s3al", "en", "1"],
		["Kapz93", "kapz93", "s3al", "en", "1"],
		["OffCerium", "offcerium", "s3al", "en", "1"],
		["POtkanzoR", "potkanzor", "s3al", "en", "1"],
		["Richblaster", "richblaster", "ptsd", "ptsd", "1"],
		["RoyM18", "roym18", "s3al", "en", "1"],
		["Sukkamurmeli", "sukkamurmeli", "s3al", "en", "1"],
		["Tarantula", "kridtv", "s3al", ["en", "se"], "1"],
		["Trechy", "trechy", "s3al", ["en", "se"], "1"],
		// FAME
		["1stWarlord", "1stwarlord", "fame", "en", "1"],
		["CarryBarry", "swift_m0ti0n", "fame", "en", "1"],
		["Dakillzor", "dakillzor", "fame", "en", "1"],
		["Decha", "dechapl", "fame", "en", "1"],
		["Deekay", "dkns_eu", "fame", "en", "1"],
		["Dyaebl", "dyaebl", "fame", ["en", "pl"], "1"],
		["Failware", "failwarelp", "fame", "en", "1"],
		["FieserFettsakk", "fieserfettsakk_", "fame", ["en", "de"], "1"],
		["Floris", "florisgg", "fame", "en", "1"],
		["Kajzoo", "kajzoo", "fame", "en", "1"],
		["Mailand", "mailand121", "fame", "en", "1"],
		["Nicktast1c", "nicktast1c", "fame", "en", "1"],
		["RavenHR", "ravenhr", "fame", "en", "1"],
		["Schockisch", "schockisch", "fame", "en", "1"],
		["Shishx", "shishx", "fame", "en", "1"],
		["Skarium", "skarium1", "fame", "en", "1"],
		["TCAmir", "tcamir", "fame", "en", "1"],
		["Tyne", "k1ll_5t3al_tyne", "fame", ["en", "fi"], "1"],
		["X3N4", "x3n4", "fame", "en", "1"],
		["Xaneleon", "xaneleon", "fame", "en", "1"],
		["Yung", "yung_xd", "fame", ["en", "se"], "1"],
		// RSOP
		["CharCharro", "charcharro", "rsop", ["en", "fi"], "1"],
		["Choppy", "choppyyxd", "rsop", ["en", "fi"], "1"],
		["Count_TR", "count_tr", "rsop", ["en", "fi"], "1"],
		["Muppetti", "muppetti", "rsop", ["en", "fi"], "1"],
		// OMNI
		["Genghiswolves", "genghiswolves", "omni", "en", "1"],
		["Tomosa", "tomosasamosa", "omni", "en", "1"],
		["TotallyMeYou", "totallymeyou", "omni", "en", "1"],
		// Other Clans (Only 1 streamer)
		["Marty_vole", "marty_vole", "vole", ["en", "cz"], "1"],
		["Morgotz", "morgotz", "e50m", "en", "1"],
		["No6ody", "no6ody", "s4", ["en", "de"], "1"],
		["skill4ltu", "skill4ltu", "santi", "en", "1"],
		// WGL
		["Knäckebröd WGL", "knackebrod_wgl", "kb", "en", "1"],
		// Amerifats/AZNs/Austrians
		["Barks_Internally", "barks_internally", "bulba", "au", "2"],
		["Overlord_Prime", "overlord_prime", "bulba", "us", "2"],
		["Eural", "x3eural", "ptsd", "ca", "2"],
		["Sela", "selawot", "sela", "us", "2"],
		["Vetro", "vetro_", "us", "us", "2"],
		["Zeven", "zeven_na", "us", "us", "2"],
		// Eastern Overlords
		["LuciqueII", "pukanuragan", "mamb", "ru", "3"],
		["Near_You", "near_you", "mamb", "ru", "3"],
		["Skylex", "skylex_pro", "mamb", "ru", "3"],
		["LeBwa", "lebwa_wot", "navi", "ru", "3"],
		["Straik", "straikoid", "navi", "ru", "3"],
		["StoleYourBike", "viilageidiot", "syb", "ru", "3"],
		// Honourable Mentions & Wargaming Affiliates, Brought to you by PENTA™
		["WGL English", "wgl_en", "wg", "en", "4"],
		["WGL Europe", "wgleu", "wg", "en", "4"],
		["Ectar", "murphy1up", "wg", "en", "4"],
		["Circon", "circon", "circ", "en", "4"],
		["SirFoch", "sirfoch", "foch", "en", "4"],
		["Quickybaby", "quickybaby", "qb", "en", "4"]
	],
	clans = [
		"<option value='500010805'>IDEAL</option>",
		"<option value='500003585'>RSOP</option>",
		"<option value='500012667'>-PJ-</option>",
		"<option value='500025989'>FAME</option>",
		"<option value='500000013'>CSA</option>"
	];

	// script functions
	const sf = {
		elem(tag, attributes, children) {
			// element creation
			const element = document.createElement(tag);
			if (attributes) {
				for (let _e_k = Object.keys(attributes), _e = _e_k.length; _e > 0; _e--) {
					element[_e_k[_e - 1]] = attributes[_e_k[_e - 1]];
				}
			}
			if (children) {
				if (children.nodeType) {
					element.appendChild(children);
				}
				else {
					for (let _c = 0, _c_len = children.length; _c < _c_len; _c++) {
						element.appendChild(children[_c]);
					}
				}
			}
			return element;
		},
		tw: {
			// twich stream status
			handlerMain(data) {
				// data handler
				const onlineStreams = [];
				// empty online tables
				for (let _t = 0, _t_len = (streamTable.length - 2); _t < _t_len; _t++) {
					if (streamTable[_t].childElementCount > 0) {
						streamTable[_t].innerHTML = "";
					}
				}
				// roll through streams and append rows to specified table
				if (data.streams.length) {
					for (let _l = 0, _l_len = data.streams.length; _l < _l_len; _l++) {
						const stream = data.streams[_l],
						streamName = stream.channel.name,
						offlineRow = document.getElementById(streamName),
						onlineRow = offlineRow.cloneNode(true);
						onlineRow.classList.remove('streamHide');
						onlineRow.cells[0].innerHTML = `<div class='b-info'><span class='s-status'>${stream.channel.status}</span><span class='s-game'>Playing <a target='_blank' href='https://www.twitch.tv/directory/game/${stream.game}'>${stream.game}</a></span><span class='s-img'><img src='${stream.preview.medium}'></span></div>`;
						if (stream.game == "World of Tanks") {
							onlineRow.cells[1].appendChild(sf.elem("span", {
								className: "icon icon_main icon_wot"
							}));
						}
						onlineRow.cells[3].className = "td_status s-online";
						onlineRow.cells[3].innerHTML = stream.viewers;
						offlineRow.classList.add('streamHide');
						streamTable[onlineRow.className].appendChild(onlineRow);
						onlineStreams.push(streamName);
					}
					// check if any streams went offline
					const hiddenStreams = document.getElementsByClassName("streamHide");
					for (let _h = 0, _h_len = hiddenStreams.length; _h < _h_len; _h++) {
						const streamID = hiddenStreams[_h].id;
						if (!onlineStreams.includes(streamID)) {
							hiddenStreams[_h].classList.remove('streamHide');
						}
					}
				}
				else {
					streamTable[1].appendChild(sf.elem("tr", {
						innerHTML: "<td colspan='5'>No Streams Online</td>"
					}));
				}
				// update date and stream amount
				document.getElementById('js-streamsOnline').innerHTML = onlineStreams.length;
				document.getElementById('js-streamUpdate').innerHTML = new Date().toLocaleTimeString("en-GB");
			},
			handlerError() {
				for (let _t = 0, _t_len = (streamTable.length - 2); _t < _t_len; _t++) {
					if (streamTable[_t].childElementCount > 0) {
						streamTable[_t].innerHTML = "";
					}
				}
				streamTable[1].appendChild(sf.elem("tr", {
					innerHTML: "<td colspan='5'>Error Fetching Streams</td>"
				}));
				document.getElementById('js-streamUpdate').innerHTML = new Date().toLocaleTimeString("en-GB");
			},
			updater() {
				// updater handler
				sf.request("twitchDataInterval", bs.tw.api, sf.tw.handlerMain, "tw");
			}
		},
		cw: {
			// battle scheduler
			handlerEvent(data) {
				// event checker
				// check if active event exists
				const event = (data.data) ? data.data[0] : "error";
				if (event.status == "ACTIVE" || !bs.cw.status) {
					if (event.status == "ACTIVE") {
						bs.cw.event = true;
						bs.cw.tier = 10;
						document.getElementById('js-eventName').innerHTML = `${event.event_name.replace("_"," ")} &#8226; `;
					}
					sf.request("mainData", bs.api.clan, sf.cw.handlerMain, "cw");
					document.getElementById('js-tableStats').classList.remove("b-display-none");
				}
				else {
					// empty table
					battleTable.children[1].innerHTML = "";
					battleTable.children[1].appendChild(sf.elem("tr", {
						className: "t-cwText",
						innerHTML: "<td colspan='23'>See you next time.</td>"
					}));
					clearInterval(updateInterval);
				}
				// insert update timestamp
				document.getElementById('js-batttleUpdate').textContent = new Date().toLocaleTimeString("en-GB");
			},
			handlerMain({clan, battles, planned_battles}) {
				// main handler
				const battleProvinces = [],
				battleFragment = document.createDocumentFragment();
				let battle, battleTime;
				// store data
				bs.clan.tag = clan.tag;
				bs.clan.emblem = clan.emblem_url;
				bs.clan.color = clan.color;
				bs.cw.bats = clan.appointed_battles_count;
				bs.cw.current = battles.length;
				bs.cw.elo = {
					6: clan.elo_rating_6,
					8: clan.elo_rating_8,
					10: clan.elo_rating_10
				};
				style.textContent += `.t-clantag {color: ${bs.clan.color};}`;
				// go through battles and planned battles
				for (let _b = 0, _b_len = battles.length; _b < _b_len; _b++) {
					battle = battles[_b];
					if (!battleProvinces.includes(battle.province_id)) {
						battleProvinces.push(battle.province_id);
						battleTime = [sf.cw.time(parseFloat(battle.battle_time.match(/\d+/g)[3])), battle.battle_time.match(/\d+/g)[4], battle.battle_time.match(/\d+/g)[5]];
						battleFragment.appendChild(sf.elem("tr", {
							className: `battle ${battle.province_id} attack`,
							innerHTML: `<td><a target='_blank' href='https://eu.wargaming.net/globalmap/#province/${battle.province_id}'>${battle.province_name}</a> [<a class='t-tournament' target='_blank' href='https://eu.wargaming.net/globalmap/#tournament/${battle.province_id}'>&#9876;</a>]</td><td>${sf.cw.mapFix(battle.arena_name)}</td><td></td><td class='t-gold'><span></span><span class='icon icon_main icon_gold'></span></td><td class='t-fame'>Ɵ</td><td></td><td><span></span><span></span></td><td id='${battle.enemy.id}'><a target='_blank' href='https://eu.wargaming.net/clans/${battle.enemy.id}/'>[${battle.enemy.tag}] <img src='${battle.enemy.emblem_url}'></a><span class='t-elo'>(${battle.enemy[`elo_rating_${(bs.cw.event) ? bs.cw.tier : "10"}`]})</span></td><td class='t-nextBattle' data-sort='${battleTime[0] === 0 ? battleTime[0]+25 : battleTime[0]}${battleTime[1]}.${battleTime[2]}'>${battleTime[0]}:${battleTime[1]}:${battleTime[2]}</td><td class='t-battle'>Ɵ</td><td class='t-battle t-border'>Ɵ</td>${bs.table.c}`
						}));
						if (battle.round_number) {
							sf.request("freepassData", `${bs.api.tourney+battle.province_id}&round=${battle.round_number}`, sf.cw.handlerFreepass, "cw");
						}
					}
				}
				for (let _bp = 0, _bp_len = planned_battles.length; _bp < _bp_len; _bp++) {
					battle = planned_battles[_bp];
					if (!battleProvinces.includes(battle.province_id)) {
						battleProvinces.push(battle.province_id);
						battleTime = [sf.cw.time(parseFloat(battle.battle_time.match(/\d+/g)[3])), battle.battle_time.match(/\d+/g)[4], battle.battle_time.match(/\d+/g)[5]];
						battleFragment.appendChild(sf.elem("tr", {
							className: `battle ${battle.province_id} attack`,
							innerHTML: `<td><a target='_blank' href='https://eu.wargaming.net/globalmap/#province/${battle.province_id}'>${battle.province_name}</a> [<a class='t-tournament' target='_blank' href='https://eu.wargaming.net/globalmap/#tournament/${battle.province_id}'>&#9876;</a>]</td><td>${sf.cw.mapFix(battle.arena_name)}</td><td></td><td class='t-gold'><span>${battle.province_revenue}</span><span class='icon icon_main icon_gold'></span></td><td class='t-fame'>Ɵ</td><td></td><td><span></span><span></span></td><td>Not Started</td><td class='t-nextBattle' data-sort='${battleTime[0] === 0 ? battleTime[0]+25 : battleTime[0]}${battleTime[1]}.${battleTime[2]}'>${battleTime[0] === 0 ? "00" : battleTime[0]}:${battleTime[1]}:${battleTime[2]}</td><td class='t-battle'>Ɵ</td><td class='t-battle t-border'>Ɵ</td>${bs.table.c}`
						}));
						if (battle.is_attacker) {
							sf.request("freepassData", `${bs.api.tourney+battle.province_id}&round=1`, sf.cw.handlerFreepass, "cw");
						}
					}
				}
				// show foes and battle count if clan has any battles and remove loading indicator
				if (bs.cw.bats > 0) {
					// style.textContent += ".t-battle {display: table-cell !important;}";
					battleTable.children[1].innerHTML = ""; // empty table
				}
				battleTable.children[1].appendChild(battleFragment);
				// insert clan name
				document.getElementById('js-clan').innerHTML = `<span class='t-clantag'>[${bs.clan.tag}]</span> ${clan.name} <img src='${bs.clan.emblem}'> &#8226; `;
				// insert battle count
				document.getElementById('js-battles').textContent = bs.cw.current;
				// insert battle count
				document.getElementById('js-battlesPlan').textContent = bs.cw.bats;
				// send request for detailed battle information
				if (bs.cw.bats > 0) {
					sf.request("batsData", bs.api.bats + battleProvinces.join("&aliases="), sf.cw.handlerBats, "cw");
				}
				// send request for clan provinces
				sf.request("provsData", bs.api.provs, sf.cw.handlerProvs, "cw");
			},
			handlerBats(data, isPlanned) {
				// battles handler
				for (let _bd = 0, _bd_len = data.data.length; _bd < _bd_len; _bd++) {
					const battle = data.data[_bd],
					battleRow = document.getElementsByClassName(battle.alias)[0],
					enemyID = battleRow.children[7].id,
					battleType = ((battle.owner_clan_id == bs.clan.id) ? "Defense" : ((battle.owner_clan_id == enemyID) ? "Owner" : "Attack")),
					primeTime = [sf.cw.time(parseFloat(battle.primetime.match(/\d+/g)[0])), battle.primetime.match(/\d+/g)[1], parseFloat(battle.primetime.match(/\d+/g)[0])];
					battleRow.dataset.primeTime = JSON.stringify(primeTime);
					if (battleType == "Defense") {
						battleRow.classList.remove("attack");
						battleRow.classList.add("defense");
					}
					// modify cells
					battleRow.children[2].textContent = `${primeTime[0]}:${primeTime[1]}`;
					battleRow.children[2].dataset.sort = `${primeTime[0]}${primeTime[1]}`;
					battleRow.children[3].firstElementChild.textContent = battle.revenue;
					battleRow.children[6].firstElementChild.textContent = battleType;
					if (battleRow.children[8].textContent == "") {
						battleRow.children[8].textContent = `${primeTime[0]}:${primeTime[1]}:00`;
						battleRow.children[8].dataset.sort = `${primeTime[0]}${primeTime[1]}`;
					}
					// get correct battle count and schedule
					sf.request("tourneyData", `${bs.api.tourney+battle.alias}&round=1`, sf.cw.handlerTourney, "cw");
					// get province famepoints if event
					if (bs.cw.event) {
						sf.request("provData", bs.api.prov + battle.alias, sf.cw.handlerProv, "cw", (battle.is_wagon_train) ? "×20" : (battle.is_enclave_ring) ? "×5" : (battle.is_enclave_center) ? "×3" : "");
					}
				}
				// refresh table
				sortTable.refresh();
			},
			handlerTourney(data, isPlanned) {
				// tournament handler
				const battleRow = document.getElementsByClassName(data.province_id)[0],
				ownerClan = (data.owner) ? (data.owner.id == bs.clan.id) || false : false,
				isAuction = battleRow.classList.contains("auction");
				let primeTime,
				cellOwnerTime = false,
				attackers = [data.pretenders, 0];
				bs.dyn.check++;
				primeTime = [sf.cw.time(parseFloat(data.start_time.match(/\d+/g)[0])), data.start_time.match(/\d+/g)[1], parseFloat(data.start_time.match(/\d+/g)[0])];
				battleRow.dataset.primeTime = JSON.stringify(primeTime);
				// check attackers
				if (attackers[0].length) {
					const _pre_len = attackers[0].length,
					attacker_ids = [];
					for (let _pre = 0; _pre < _pre_len; _pre++) {
						attacker_ids.push(attackers[0][_pre].id);
					}
					if (!ownerClan && !attacker_ids.includes(bs.clan.id)) {
						//battleRow.remove();
					}
				}
				else if (data.battles) {
					const _bat_len = data.battles.length,
					attacker_ids = [];
					for (let _bat = 0; _bat < _bat_len; _bat++) {
						const battle = data.battles[_bat];
						attacker_ids.push(battle.first_competitor.id);
						if (battle.second_competitor) {
							attacker_ids.push(data.battles[_bat].second_competitor.id);
						}
					}
					if (!ownerClan && !attacker_ids.includes(bs.clan.id)) {
						//battleRow.remove();
					}
				}
				if (data.is_superfinal) {
					attackers = 1;
				}
				else if (attackers[0].length) {
					attackers = attackers[0].length;
				}
				else {
					attackers = attackers[1];
					for (let _bc = 0, _bc_len = data.battles.length; _bc < _bc_len; _bc++) {
						attackers += ((data.battles[_bc].is_fake) ? 1 : 2);
					}
				}
				if (isAuction && battleRow.children[7].innerHTML == "Not Started") {
					attackers = data.size;
				}
				if (isPlanned && !ownerClan) {
					attackers++;
				}
				// find how many battles
				const battles = (attackers !== 0) ? Math.ceil(Math.log2(attackers)) + 1 : 0;
				// modify cells
				battleRow.children[1].textContent = sf.cw.mapFix(data.arena_name);
				battleRow.children[2].textContent = `${primeTime[0]}:${primeTime[1]}`;
				battleRow.children[2].dataset.sort = `${primeTime[0]}${primeTime[1]}`;
				battleRow.children[3].firstElementChild.textContent = data.province_revenue;
				battleRow.children[5].innerHTML = (data.owner) ? `<a target='_blank' href='https://eu.wargaming.net/clans/${data.owner.id}/'><span class='t-clantag' style='color: ${data.owner.color};'>[${data.owner.tag}]</span> <img src='${data.owner.emblem_url}'></a>` : "No Owner";
				if (data.owner && bs.cw.tier !== "Ɵ") {
					battleRow.children[5].appendChild(sf.elem("span", {
						className: "t-elo",
						innerHTML: `(${data.owner[`elo_rating_${(bs.cw.event) ? bs.cw.tier : "10"}`]})`
					}));
				}
				if (isAuction) {
					battleRow.children[8].textContent = `${primeTime[0]}:${primeTime[1]}:00`;
					battleRow.children[8].dataset.sort = `${primeTime[0]}${primeTime[1]}.${battles}`;
				}
				// only continue if there are any attackers
				if (attackers) {
					const emptyCells = ((primeTime[2] - bs.table.eu[0]) * 2) + bs.table.static,
					lastBattle = battles + emptyCells;
					battleRow.children[9].textContent = attackers;
					battleRow.children[10].textContent = battles;
					for (let _conc = 0, _cell = bs.table.static + 1; _cell < battleRow.childElementCount; _cell++) {
						const cell = battleRow.children[_cell];
						if (_cell > emptyCells && _cell <= lastBattle) {
							const timeClass = `.${cell.classList.item(1)}`,
							timePrevClass = `.${cell.previousElementSibling.classList.item(1)}`,
							primeTimeConc = `${Number(primeTime[0]+primeTime[1])+([0,30,100,130,200,230,300,330][_conc])}`;
							if (!bs.table.s.includes(timeClass) || !bs.table.s.includes(timePrevClass)) {
								bs.table.s.push(timePrevClass, timeClass);
								if (_cell == lastBattle) {
									bs.table.s.push(`${timePrevClass} + th`, `${timePrevClass} + td`, `${timeClass} + th`, `${timeClass} + td`);
								}
							}
							if (ownerClan && _cell !== lastBattle) {
								cell.classList.add("t-noFight");
							}
							else {
								cell.classList.add("t-fight");
								if (isAuction) {
									cell.classList.add("t-auction");
								}
								if (!bs.dyn.prov.includes(data.province_id)) {
									if (bs.dyn.conc[primeTimeConc]) {
										bs.dyn.conc[primeTimeConc]++;
									}
									else {
										bs.dyn.conc[primeTimeConc] = 1;
									}
								}
							}
							if (_cell == lastBattle) {
								if (ownerClan) {
									cell.classList.add("js-last");
									let nextBattle = cell.dataset.time;
									if (primeTime[1] == 15) {
										time = nextBattle.match(/(\d+)/g);
										nextBattle = `${time[0]}:${parseFloat(time[1])+15}`;
									}
									//battleRow.children[8].textContent = `${nextBattle}:00`;
									//battleRow.children[8].dataset.sort = `${nextBattle.replace(":","")}`;
								}
								if (bs.cw.globalmap && (!data.owner || !data.owner.division_id) && (battleRow.children[7].innerHTML !== "Not Started" || battleRow.children[6].firstElementChild.innerHTML == "No Division")) {
									cell.classList.add("t-noOwner");
									bs.dyn.conc[primeTimeConc]--;
								}
								cell.innerHTML = "♖";
								cellOwnerTime = [parseFloat(cell.classList.item(1).match(/\d+/g)[0]), parseFloat(cell.classList.item(1).match(/\d+/g)[1])];
								if (cellOwnerTime[0] < 5) {
									cellOwnerTime[0] += 24;
								}
							}
							else {
								cell.innerHTML = "&#9876;";
							}
							if (primeTime[1] == "15") {
								battleRow.classList.add("timeShift");
								cell.innerHTML += "<span class='t-timeShift'>+</span>";
							}
							_conc++;
						}
					}
					if (!bs.dyn.prov.includes(data.province_id)) {
						bs.dyn.prov.push(data.province_id);
					}
					if (bs.dyn.check == bs.cw.bats || bs.dyn.plan > 0) {
						const conc = Object.entries(bs.dyn.conc).reduce(function(max, arr) {
							return max[1] >= arr[1] ? max : arr;
						}),
						conc_table = {};
						document.getElementById('js-battlesConc').textContent = `${conc[1]} [${conc[0].replace(/^(\d{2})/,"$1:")}]`;
						styleDynBattles.textContent = `${bs.table.s.join(", ")} {display: table-cell !important;}`;
						for (let _c_k = Object.keys(bs.dyn.conc), _c = _c_k.length; _c > 0; _c--) {
							const key = _c_k[_c - 1],
							hour = key.slice(0, 2),
							min = key.slice(2),
							newKey = `t-${hour >= 24 ? hour-24 : hour}_${min == 15 ? "00" : (min == 45 ? "30" : min)}`,
							time = bs.dyn.conc[key],
							timeShift = /15|45/.test(min) ? true : false;
							if (conc_table[newKey]) {
								conc_table[newKey][timeShift ? 1 : 0] += time;
							}
							else {
								conc_table[newKey] = timeShift ? [0, time] : [time, 0];
							}
						}
						const footer = document.getElementById('js-footer');
						for (let _ct_k = Object.keys(conc_table), _ct = _ct_k.length; _ct > 0; _ct--) {
							const key = _ct_k[_ct - 1],
							times = conc_table[key],
							foot = footer.getElementsByClassName(key)[0];
							if (foot) {
								foot.textContent = `${times[0] ? times[0] : ""}${times[1] ? ` +${times[1]}` : ""}`;
							}
							else {
								console.error("Foot doesn't exist", key, times);
							}
						}
					}
					// check if battle is planned or not started and change state to ongoing
					if (!/\[|Free Round/i.test(battleRow.children[7].textContent) && new Date().getHours() >= primeTime[0] - 1 && new Date().getHours() < cellOwnerTime[0]) {
						switch (battleRow.children[6].firstElementChild.innerHTML) {
							case ("Attack"):
								battleRow.children[7].textContent = "Ongoing";
								break;
							case ("Planned"):
								battleRow.children[6].firstElementChild.textContent = "Defense";
								battleRow.children[7].textContent = "Ongoing";
								break;
							case ("Defense"):
								battleRow.children[7].textContent = "Ongoing";
								sf.request("provData", bs.api.prov + data.province_id, sf.cw.handlerProv, "cw");
								break;
							default:
								break;
						}
					}
					else if (battleRow.children[7].innerHTML == "Planned" && bs.time.r[0] > cellOwnerTime[0]) {
						battleRow.children[7].textContent = "Completed";
					}
				}
				else {
					const lastBattle = battleRow.getElementsByClassName(`t-${primeTime[0]}_00`)[0];
					if (primeTime[1] == "15") {
						battleRow.classList.add("timeShift");
						lastBattle.innerHTML = "♖<span class='t-timeShift'>+</span>";
					}
					else {
						lastBattle.innerHTML = "♖";
					}
					lastBattle.classList.add("t-noFight");
				}
				if (ownerClan) {
					bs.dyn.gold += data.province_revenue;
					document.getElementById('js-gold').textContent = bs.dyn.gold; // insert gold count
				}
				if (bs.cw.gold && data.province_revenue === 0) {
					document.getElementById('js-goldInfo').textContent = "(No Gold Revenue in Event!)";
					bs.cw.gold = false;
					style.textContent += "th.t-gold, td.t-gold {display: none;}";
				}
				// refresh table
				sortTable.refresh();
			},
			handlerProvs(data) {
				// clan provinces handler
				const provs = data.data[bs.clan.id],
				ownedProvinces = [],
				provTimes = [],
				provFragment = document.createDocumentFragment();
				if (battleTable.rows[1] && battleTable.rows[1].classList.contains("t-cwText")) {
					battleTable.children[1].innerHTML = ""; // empty table
				}
				if (provs) {
					for (let _p = 0, _p_len = provs.length; _p < _p_len; _p++) {
						const prov = provs[_p],
						battleRow = document.getElementsByClassName(prov.province_id)[0];
						if (!battleRow) {
							const primeTime = [sf.cw.time(parseFloat(prov.prime_time.match(/\d+/g)[0])), prov.prime_time.match(/\d+/g)[1], parseFloat(prov.prime_time.match(/\d+/g)[0]) + bs.table.eu.length],
							provRow = sf.elem("tr", {
								className: `province ${prov.province_id} defense`,
								innerHTML: `<td><a target='_blank' href='https://eu.wargaming.net/globalmap/#province/${prov.province_id}'>${prov.province_name}</a> [<a class='t-tournament' target='_blank' href='https://eu.wargaming.net/globalmap/#tournament/${prov.province_id}'>&#9876;</a>]</td><td>${sf.cw.mapFix(prov.arena_name)}</td><td data-sort='${primeTime[2]}${primeTime[1]}'>${primeTime[0]}:${primeTime[1]}</td><td class='t-gold'><span>${prov.daily_revenue}</span><span class='icon icon_main icon_gold'></span></td><td class='t-fame'>Ɵ</td><td><a target='_blank' href='https://eu.wargaming.net/clans/${bs.clan.id}/'><span class='t-clantag'>[${bs.clan.tag}]</span> <img src='${bs.clan.emblem}'></a><span class='t-elo'>(${bs.cw.elo[prov.max_vehicle_level]})</span></td><td><span>Defense</span><span></span></td><td>No Attacks</td><td class='t-nextBattle' data-sort='9999'></td><td class='t-battle' data-sort='99'>Ɵ</td><td class='t-battle t-border' data-sort='99'>Ɵ</td>${bs.table.c}`
							}),
							provTime = `t-${primeTime[0]}_00`,
							provTimeClass = `.${provTime}, .${provTime} + td, .${provTime} + th`,
								lastBattle = provRow.getElementsByClassName(provTime)[0];
							provRow.dataset.primeTime = JSON.stringify(primeTime);
							ownedProvinces.push(prov.province_id);
							bs.dyn.gold += prov.daily_revenue;
							bs.cw.tier = prov.max_vehicle_level;
							if (primeTime[1] == "15") {
								provRow.classList.add("timeShift");
								lastBattle.innerHTML = "♖<span class='t-timeShift'>+</span>";
							}
							else {
								lastBattle.innerHTML = "♖";
							}
							lastBattle.classList.add("t-noFight");
							if (!provTimes.includes(provTimeClass)) {
								provTimes.push(provTimeClass);
							}
							if (bs.cw.gold && prov.daily_revenue === 0) {
								document.getElementById('js-goldInfo').textContent = "(No Gold Revenue in Event!)";
								bs.cw.gold = false;
								style.textContent += "th.t-gold, td.t-gold {display: none;}";
							}
							// get province famepoints if event
							if (bs.cw.event) {
								sf.request("provData", bs.api.prov + prov.province_id, sf.cw.handlerProv, "cw");
							}
							provFragment.appendChild(provRow);
						}
					}
					// display finals column
					styleDynFinales.textContent += `${provTimes.join(", ")} {display: table-cell !important;}`;
					// insert province count
					document.getElementById('js-provs').textContent = provs.length;
					// insert gold count
					document.getElementById('js-gold').textContent = bs.dyn.gold;
					// send request for divisions
					sf.request("divsData", bs.api.divs, sf.cw.handlerDivs, "cw");
					// send request for raids if event
					//if (bs.cw.event) {
					//  sf.request("raidsData", bs.api.raids, sf.cw.handlerRaids, "cw");
					//}
				}
				else if (bs.cw.bats === 0) {
					battleTable.children[1].innerHTML = ""; // empty table
					provFragment.appendChild(sf.elem("tr", {
						className: "t-cwText",
						innerHTML: "<td colspan='23'>No Battles</td>"
					}));
				}
				battleTable.children[1].appendChild(provFragment);
				// add expand button
				const tableExpand = document.getElementById('js-expand');
				tableExpand.textContent = "❐";
				battleTable.parentNode.classList.add("b-fullHeight");
				tableExpand.addEventListener('click', function() {
					battleTable.parentNode.classList.toggle("b-fullHeight");
				}, false);
				// refresh table
				sortTable.refresh();
			},
			handlerProv({province, owner}, coef) {
				// province info handler
				const battleRow = document.getElementsByClassName(province.alias)[0];
				let fame_style = "t-green",
				fame = "Ɵ",
				sort = 0;
				if (bs.cw.event) {
					if (province.fame_points) {
						fame = province.fame_points;
						sort = fame;
					}
					else if (province.money_box) {
						if (owner.id == bs.clan.id) {
							fame_style = "t-red";
							fame = -Math.abs(province.money_box.risky_fame_points);
						}
						else {
							fame = `+${province.money_box.capture_fame_points}`;
						}
						sort = fame;
					}
					else if (province.is_enclave) {
						fame = province.single_province_fp;
						coef = province.fame_points_coefficient;
						sort = fame;
					}
					else if (province.enclave_neighbours_number) {
						fame = `${province.enclave_neighbours_number}/${province.number_of_enclave_provinces}`;
						sort = province.enclave_neighbours_number / province.number_of_enclave_provinces;
						// change fame column title
						document.getElementById('js-fame').textContent = "Fame & Enclaves";
					}
					else if (province.raids) {
						if (province.raids.secondary_mission_reward) {
							fame = province.raids.secondary_mission_reward;
						}
						else {
							fame_style = "";
						}
					}
					if (province.type !== "landing" || owner.id == bs.clan.id) {
						coef = "x5";
					}
				}
				if (battleRow) {
					const fameHTML = `<span class='${fame_style}'>${fame}</span>${(coef) ? ` ${coef}` : ""}`;
					battleRow.children[4].innerHTML = fameHTML;
					battleRow.children[4].dataset.sort = sort;
					if (bs.front_loc[province.front_id]) {
						battleRow.children[6].lastElementChild.innerHTML = bs.front_loc[province.front_id];
					}
					if (province.type == "auction" && battleRow.children[7].innerHTML == "Not Started") {
						battleTable.children[1].appendChild(sf.elem("tr", {
							className: `battle ${province.alias} attack auction`,
							innerHTML: `<td><a target='_blank' href='https://eu.wargaming.net/globalmap/#province/${province.alias}'>${province.name}</a> [<a class='t-tournament' target='_blank' href='https://eu.wargaming.net/globalmap/#tournament/${province.alias}'>&#9876;</a>]</td><td></td><td></td><td class='t-gold'><span></span><span class='icon icon_main icon_gold'></span></td><td class='t-fame'>${fameHTML}</td><td></td><td class='t-auction'><span>Auction</span><span>${bs.front_loc[province.front_id] ? bs.front_loc[province.front_id] : ""}</span></td><td>Not Started</td><td class='t-nextBattle' data-sort='9999'></td><td class='t-battle'>Ɵ</td><td class='t-battle t-border'>Ɵ</td>${bs.table.c}`
						}));
						battleRow.remove();
						// request tourneyData to be sure of proper visuals
						sf.request("tourneyData -- auction", `${bs.api.tourney+province.alias}&round=1`, sf.cw.handlerTourney, "cw");
					}
				}
			},
			handlerDivs(data) {
				// divisions handler
				const divsId = JSON.stringify(data).match(/\d{9}/g);
				if (divsId.includes(bs.clan.id.toString())) {
					bs.cw.globalmap = true;
					for (let _p = 0, _p_len = data.data.length; _p < _p_len; _p++) {
						const div = data.data[_p],
						battleRow = document.getElementsByClassName(div.alias)[0];
						if (!div.division) {
							if (battleRow && battleRow.classList.contains('defense')) {
								const defBattle = battleRow.getElementsByClassName("js-last")[0],
								primeTime = JSON.parse(battleRow.dataset.primeTime),
								primeTimeConc = `${Number(primeTime[0]+primeTime[1])+([0,30,100,130,200,230,300,330][Number(battleRow.children[10].innerHTML) || 0])}`;
								battleRow.children[2].dataset.sort = 5000;
								battleRow.children[8].dataset.sort = 5000;
								battleRow.children[6].firstElementChild.textContent = "No Division";
								battleRow.children[6].classList.add("t-bold");
								if (defBattle) {
									defBattle.classList.remove("t-fight");
									defBattle.classList.add("t-noFight");
									if (bs.dyn.conc[primeTimeConc]) {
										bs.dyn.conc[primeTimeConc]--;
									}
								}
							}
							else if (!battleRow) {
								bs.dyn.plan++;
								battleTable.children[1].appendChild(sf.elem("tr", {
									className: `planned ${div.alias}`,
									innerHTML: `<td><a target='_blank' href='https://eu.wargaming.net/globalmap/#province/${div.alias}'>${div.name}</a> [<a class='t-tournament' target='_blank' href='https://eu.wargaming.net/globalmap/#tournament/${div.alias}'>&#9876;</a>]</td><td></td><td></td><td class='t-gold'><span></span><span class='icon icon_main icon_gold'></span></td><td class='t-fame'>Ɵ</td><td></td><td><span>Planned</span><span></span></td><td>Planned</td><td class='t-nextBattle' data-sort='9999'></td><td class='t-battle'>Ɵ</td><td class='t-battle t-border'>Ɵ</td>${bs.table.c}`
								}));
								sf.request("batsData", bs.api.bats + div.alias, sf.cw.handlerBats, "cw", true);
							}
						}
						else {
							// sometimes future defenses wont show up in planned battles
							if (div.attackers.length > 0 && battleRow && battleRow.classList.contains('province')) {
								bs.dyn.plan++;
								battleTable.children[1].appendChild(sf.elem("tr", {
									className: `planned ${div.alias}`,
									innerHTML: `<td><a target='_blank' href='https://eu.wargaming.net/globalmap/#province/${div.alias}'>${div.name}</a> [<a class='t-tournament' target='_blank' href='https://eu.wargaming.net/globalmap/#tournament/${div.alias}'>&#9876;</a>]</td><td></td><td></td><td class='t-gold'><span></span><span class='icon icon_main icon_gold'></span></td><td class='t-fame'>Ɵ</td><td></td><td><span>Defense</span><span></span></td><td>Planned</td><td class='t-nextBattle' data-sort='9999'></td><td class='t-battle'>Ɵ</td><td class='t-battle t-border'>Ɵ</td>${bs.table.c}`
								}));
								battleRow.remove();
								sf.request("tourneyData", `${bs.api.tourney+div.alias}&round=1`, sf.cw.handlerTourney, "cw", true);
							}
						}
					}
					if (bs.dyn.plan > 0) {
						// style.textContent += ".t-battle {display: table-cell !important;}";
					}
					// refresh table
					sortTable.refresh();
				}
				else {
					document.getElementById('js-error').textContent = "Division Data not Available!";
				}
			},
			handlerFreepass(data) {
				const battleRow = document.getElementsByClassName(data.province_id)[0],
				lastGroup = data.battles[data.battles.length - 1],
				freeRound = battleRow.children[7].innerHTML == "Not Started" && lastGroup && lastGroup.is_fake && lastGroup.first_competitor.id == bs.clan.id;

				// check if no opponent - free round
				if (freeRound) {
					battleRow.children[7].textContent = "Free Round";
					battleRow.children[7].classList.add("t-bold");
					battleRow.classList.add("freePass");
				}
			},
			handlerRaids(data) {
				// raids handler for campaign events
				for (let _r = 0, _r_len = data.length; _r < _r_len; _r++) {
					const raid = data[_r],
					battleRow = document.getElementsByClassName(raid.province.id)[0],
					fame = raid.fame_points,
					bonus = raid.bonus_fame_points,
					sort = fame + bonus,
					coef = raid.battle_coef;
					let denyFame = 0;
					if (battleRow) {
						denyFame = parseFloat(battleRow.children[4].innerHTML.match(/\d+/));
						battleRow.children[4].innerHTML = `<span>${fame} + ${bonus}${(denyFame) ? ` + ${denyFame}` : ""}</span> ${coef}`;
						battleRow.children[4].dataset.sort = sort + denyFame;
					}
				}
			},
			handlerError(name, data) {
				// error handler
				switch (name) {
					case ("mainData"):
						battleTable.children[1].appendChild(sf.elem("tr", {
							className: "t-cwText",
							innerHTML: "<td colspan='23'>Clan ID Error</td>"
						}));
						inputSpan.lastElementChild.textContent = "Clan ID invalid!";
						localStorage.removeItem("battles_clanid");
						break;
					case ("divsData"):
						document.getElementById('js-error').textContent = "Division Data not Available!";
						break;
					default:
						break;
				}
			},
			time(hour, min, type) {
				// time converter
				let time = hour + bs.time.o;
				if (time >= 24) {
					time -= 24;
				}
				else if (time <= 0) {
					time += 24;
				}
				if (type == "s") {
					time = `t-${time}_${min}${(time === 0 && min == "00") ? " t-24_00" : ""}`;
				}
				return time;
			},
			timer() {
				// timestamp handler
				const dateNow = new Date(),
					time = {
						h: sf.cw.time(16) - dateNow.getHours(),
						m: 60 - dateNow.getMinutes() - 1,
						s: 60 - dateNow.getSeconds() - 1
					},
					timeSpan = document.getElementById('js-timePrime');
				if (timeJump && !bs.cw.event && bs.cw.status) {
					timeSpan.textContent = "No Event Running";
					timeSpan.classList.add("t-bold");
					clearInterval(timeInterval);
				}
				else if (time.h >= 0 && (time.s > 0 || time.m < 15)) {
					timeSpan.textContent = `${((time.h > 0) ? `${time.h} Hours, ` : "")+((time.m > 0) ? `${time.m} Mins, ` : "")+time.s} Secs`;
				}
				else if (time.h < 0 && bs.cw.bats !== "Ɵ") {
					if (bs.cw.bats === 0) {
						timeSpan.textContent = "No Planned Battles";
						timeSpan.classList.add("t-bold");
						clearInterval(timeInterval);
					}
					else {
						timeSpan.classList.add("h-shadow");
						timeSpan.innerHTML = "<span style='color:#ff0000;'>X</span><span style='color:#ff2a00;'></span><span style='color:#ff5500;'>e</span><span style='color:#ff7f00;'></span><span style='color:#ffaa00;'>n</span> <span style='color:#ffff00;'>i</span><span style='color:#aaff00;'></span><span style='color:#55ff00;'>s</span> <span style='color:#00ff80;'>a</span> <span style='color:#00aaff;'>f</span><span style='color:#0055ff;'></span><span style='color:#0000ff;'>g</span><span style='color:#2e00ff;'></span><span style='color:#5d00ff;'>t</span><span style='color:#8b00ff;'>.</span>";
						if (bs.cw.current > 0) {
							document.getElementById('js-provStatus').textContent = "Next Opponent (ELO)";
						}
						clearInterval(timeInterval);
					}
				}
				else {
					timeSpan.textContent = "Hold on a sec...";
				}
				timeJump = true;
			},
			mapFix(name) {
				// map name fixer
				const fixedNames = {
					"114_czech/name": "Pilsen"
				};
				return (fixedNames[name]) ? fixedNames[name] : name;
			},
			updater(force) {
				// updater handler
				const dateNow = new Date(),
					newDate = {
						h: dateNow.getHours(),
						m: dateNow.getMinutes(),
						o: (dateNow.getTimezoneOffset() > 0 ? -Math.abs(dateNow.getTimezoneOffset()) : Math.abs(dateNow.getTimezoneOffset())) / 60
					},
					newTime = ((bs.time.m >= 15 && bs.time.m <= 45) ? [bs.time.h, "30"] : ((bs.time.m <= 15) ? [bs.time.h, "00"] : [(bs.time.h + 1), "00"]));
				if (force || (bs.time.r[0] !== newTime[0] || bs.time.r[1] !== newTime[1])) {
					bs.time = newDate;
					bs.time.r = newTime;
					bs.time.t = `${bs.time.r[0]}_${bs.time.r[1]}`;
					battleTable.lastElementChild.firstElementChild.innerHTML = `<td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>${bs.table.c}`;
					styleDynTimezone.textContent = `
					.b-battles .b-battles-holder .t-battles tr .t-${bs.time.t} {background-color: rgba(254,252,223, 0.5); border-left: 1px solid #808080; border-right: 1px solid #808080;}
					.b-battles .b-battles-holder .t-battles tr .t-${bs.time.t} + th, .b-battles .b-battles-holder .t-battles tr .t-${bs.time.t} + td {background-color: rgba(224,223,218, 0.5); border-right: 1px solid #808080;}
				`;
					bs.dyn = {
						conc: {},
						prov: [],
						plan: 0,
						check: 0,
						gold: 0
					};
					sf.request("mainData", bs.api.clan, sf.cw.handlerMain, "cw");
					// insert update timestamp
					document.getElementById('js-batttleUpdate').textContent = new Date().toLocaleTimeString("en-GB");
				}
			}
		},
		request(name, api, handler, mode, extra) {
			// request handler
			GM.xmlHttpRequest({
				method: "GET",
				url: api,
				headers: {
					"Accept": "application/json",
					"Client-ID": mode == "tw" ? bs.tw.key : undefined
				},
				onload(resp) {
					const data = JSON.parse(resp.responseText);
					if (resp.status == 200) {
						if (bs.debug) {
							console.info(name, data, api, new Date().toLocaleTimeString("en-GB"));
						}
						handler(data, extra);
					}
					else {
						console.error("Error with API", name, api, resp);
						sf[mode].handlerError(name);
					}
				},
				onerror(resp) {
					console.error("Error accessing API", name, api, resp);
				}
			});
		}
	};

	// inserting style into head
	style = sf.elem("style", {
		className: "idealScript",
		type: "text/css",
		textContent: `
.b-panel {display: table; margin: 15px auto 15px;}
.p-helper {display: table-cell; width: 100%;}
.b-scriptButton {height: 25.2px}
.b-scriptButton a {vertical-align: middle;}
/* icon rules */
.b-idealscript .icon {display: inline-block; height: 16px; width: 16px; vertical-align: text-top;}
.b-idealscript.b-scriptButton .icon {display: inline-block; height: 16px; width: 16px; margin-right: 3px; vertical-align: sub;}
.icon_main {background: url(${img.main}) no-repeat 0 0;}
.b-idealscript .icon_flag {background: url(${img.flags}) no-repeat 0 0; height: 11px; margin: 0 1px; vertical-align: baseline;}
.b-idealscript .icon_clan {background: url(${img.clans}) no-repeat 0 0; margin: 0 1px; vertical-align: text-bottom;}
/* icons */
/* main */
.b-idealscript .icon_chat {}
.b-idealscript .icon_twitch {background-position: -16px 0;}
.b-idealscript .icon_fork {background-position: -32px 0;}
.b-idealscript .icon_wg {background: url(${img.main}) no-repeat -48px 0;}
.b-idealscript .icon_cw {background-position: -64px 0;}
.b-idealscript .icon_gold {background-position: -82px 0; margin-left: 2px;}
.b-idealscript .icon_wot {background-position: -98px 0;}
/* eu */
.b-idealscript .icon_ideal {}
.b-idealscript .icon_s3al {background-position: -16px 0;}
.b-idealscript .icon_fame {background-position: -32px 0;}
.b-idealscript .icon_rsop {background-position: -48px 0;}
.b-idealscript .icon_ptsd {background-position: -64px 0;}
.b-idealscript .icon_fnd {background-position: 0 -16px;}
.b-idealscript .icon_s4 {background-position: -16px -16px;}
.b-idealscript .icon_omni {background-position: -32px -16px;}
.b-idealscript .icon_santi {background-position: -48px -16px;}
.b-idealscript .icon_vter {background-position: -64px -16px;}
.b-idealscript .icon_vole {background-position: 0 -32px;}
.b-idealscript .icon_e50m {background-position: -16px -32px;}
/* ru */
.b-idealscript .icon_mamb {background-position: -32px -32px;}
.b-idealscript .icon_syb {background-position: -48px -32px;}
/* na */
.b-idealscript .icon_bulba {background-position: -64px -32px;}
.b-idealscript .icon_sela {background-position: 0 -48px;}
/* esl teams */
.b-idealscript .icon_kb {background-position: -16px -48px;}
.b-idealscript .icon_penta {background-position: -32px -48px;}
.b-idealscript .icon_navi {background-position: -48px -48px;}
/* other */
.b-idealscript .icon_circ {background-position: 0 -64px;}
.b-idealscript .icon_foch {background-position: -16px -64px;}
.b-idealscript .icon_qb {background-position: -32px -64px;}
/* flags */
.b-idealscript .icon_en {}
.b-idealscript .icon_de {background-position: -16px 0;}
.b-idealscript .icon_no {background-position: -32px 0;}
.b-idealscript .icon_se {background-position: -48px 0;}
.b-idealscript .icon_fi {background-position: -64px 0;}
.b-idealscript .icon_cz {background-position: 0 -11px;}
.b-idealscript .icon_pl {background-position: -16px -11px;}
.b-idealscript .icon_ru {background-position: -32px -11px;}
.b-idealscript .icon_us {background: url(${img.flags}) no-repeat 0 -22px; height: 11px; margin: 0 1px; vertical-align: baseline;}
.b-idealscript .icon_au {background-position: -16px -22px;}
.b-idealscript .icon_ca {background-position: -32px -22px;}
/* twitch stream status */
.b-streams {display: table-cell; font-size: 11px; max-width: 400px; min-width: 340px; padding-left: 10px;}
.b-streams .s-helper {display: inline-block;}
.b-streams .h-streams {background-color: #D1E8FE; border: 1px solid;border-radius: 10px 10px 0 0; margin-top: -2px; text-align: center;}
.b-streams .h-streams .h-streams-info {border-bottom: 1px solid #F5F5F5; margin: 0 auto; padding: 4px 0px; width: 325px;}
.b-streams .h-streams .h-streams-info > * {display: inline-block;}
.b-streams .h-streams .h-streams-info .h-left {width: 10%;}
.b-streams .h-streams .h-streams-info .h-mid {width: 80%;}
.b-streams .h-streams .h-streams-info .h-right {width: 10%;}
.b-streams .h-streams .h-streams-info img {vertical-align: bottom;}
.b-streams .h-streams .h-streams-head {border-spacing: 0; text-align: center; width: 323px;}
.b-streams .h-streams .h-streams-head tr th {line-height: 20px;}
.b-streams .h-streams .h-streams-head tr th:nth-of-type(1) {width: 0px;}
.b-streams .h-streams .h-streams-head tr th:nth-of-type(2) {width: 145px;}
.b-streams .h-streams .h-streams-head tr th:nth-of-type(3) {width: 75px;}
.b-streams .h-streams .h-streams-head tr th:nth-of-type(4) {width: 60px;}
.b-streams .h-streams .h-streams-head tr th:nth-of-type(5) {width: 40px;}
.b-streams .b-streams-holder {border-left: 1px solid; border-right: 1px solid; max-height: ${(bs.web.chrome) ? "641" : "650"}px; overflow-y: auto;}
.b-streams .b-streams-holder .t-streams {border-spacing: 0; text-align: center; width: 100%;}
.b-streams .b-streams-holder .t-streams tr:nth-child(even) {background-color: #FBFBFB;}
.b-streams .b-streams-holder .t-streams tr:nth-child(odd) {background-color: #EFEFEF;}
.b-streams .b-streams-holder .t-streams tr:hover {background-color: #FEFAC0;}
.b-streams .b-streams-holder .t-streams tr td {line-height: 19px; border-bottom: 1px dotted #B1B1B1;}
.b-streams .b-streams-holder .t-streams tr td.td_info {width: 0px;}
.b-streams .b-streams-holder .t-streams tr td.td_name {width: 145px; position: relative;}
.b-streams .b-streams-holder .t-streams tr td.td_clan {width: 75px;}
.b-streams .b-streams-holder .t-streams tr td.td_status {width: 60px;}
.b-streams .b-streams-holder .t-streams tr td.td_flag {width: 40px;}
.b-streams .b-streams-holder .t-streams .streamIdeal tr:last-of-type td {border-bottom: 1px solid #CC5BFF;}
.b-streams .b-streams-holder .t-streams .streamSeperator td {border-top: 1px solid #CD2911;}
.b-streams .b-streams-holder .t-streams td.s-online {color: #4D7326;}
.b-streams .b-streams-holder .t-streams td.s-offline {color: #930D0D;}
.b-streams .b-streams-holder .t-streams .icon_wot {margin-top: 1px; opacity: 0.25; position: absolute; right: 0;}
.b-streams .b-streams-holder .t-streams .b-info {background-color: #FEFAC0; border: 1px dotted #B1B1B1; display: none; margin: -11px 0px 0px -282px; padding-bottom: 8px; position: absolute; width: 280px;}
.b-streams .b-streams-holder .t-streams .b-info > span {display: block;}
.b-streams .b-streams-holder .t-streams .b-info .s-status {font-weight: bold;}
.b-streams .b-streams-holder .t-streams .b-info .s-game {}
.b-streams .b-streams-holder .t-streams .b-info .s-img img {width: 200px;}
.b-streams .b-streams-holder .t-streams tr:hover .b-info {display: block;}
.b-streams .b-streams-holder .streamHide {display: none;}
.b-streams .b-streams-holder img {display: block; margin: 0 auto;}
.b-streams .f-streams {background-color: #D1E8FE; border: 1px solid; border-top: 0; border-radius: 0 0 10px 10px; padding: 3px 0px; text-align: center;}
.b-streams .f-streams .f-battles-info > * {display: inline-block;}
/* battle scheduler */
.b-battles {border: 1px solid; border-radius: 10px; display: table; font-size: 11px; width: 90vw; min-width: 1280px; margin: 15px auto 15px;}
.b-battles .h-battles {background-color: #D1E8FE; border-radius: 10px 10px 0 0;}
.b-battles .h-battles .h-battles-info {border-bottom: 1px solid #F5F5F5; margin: 0 auto; padding: 4px 0px; width: 98%;}
.b-battles .h-battles .h-battles-info > * {display: inline-block;}
.b-battles .h-battles .h-battles-info .h-left {width: 17%;}
.b-battles .h-battles .h-battles-info .h-left a {margin-right: 5px;}
.b-battles .h-battles .h-battles-info .h-mid {text-align: center; width: 66%;}
.b-battles .h-battles .h-battles-info .h-mid #js-eventName {text-transform: capitalize;}
.b-battles .h-battles .h-battles-info .h-right {text-align: right; width: 17%;}
.b-battles .h-battles .h-battles-info .h-right .h-expand {cursor: pointer; font-size: 2em; line-height: 10px; vertical-align: sub;}
.b-battles .h-battles .h-battles-info .h-right .h-force {cursor: pointer; margin-right: 15px;}
.b-battles .h-battles .h-battles-info .h-right .h-force input {height: 15px; vertical-align: bottom;}
.b-battles .h-battles .h-battles-info .h-right #js-update {cursor: pointer; margin-right: 17px;}
.b-battles .h-battles .h-battles-info img {max-height: 16px; vertical-align: bottom;}
.b-battles .h-battles .h-battles-info .h-shadow {font-weight: bold; text-shadow: 0px 0px 1px rgba(27,27,28, 1), 0px 0px 2px rgba(27,27,28, 1);}
.b-battles .b-battles-holder {background-color: #FBFBFB; max-height: 221px; overflow-y: auto;}
.b-battles .b-battles-holder.b-fullHeight {max-height: unset;}
.b-battles .b-battles-holder .t-battles {border-spacing: 0; text-align: center; width: 100%;}
.b-battles .b-battles-holder .t-battles .t-time {display: none; position: relative;}
.b-battles .b-battles-holder .t-battles thead tr, .b-battles .b-battles-holder .t-battles tfoot tr {background-color: #D1E8FE;}
.b-battles .b-battles-holder .t-battles .sort-up, .b-battles .b-battles-holder .t-battles .sort-down {color: #C600C6;}
.b-battles .b-battles-holder .t-battles tbody tr:nth-child(even) {background-color: #FBFBFB;}
.b-battles .b-battles-holder .t-battles tbody tr:nth-child(odd) {background-color: #EFEFEF;}
.b-battles .b-battles-holder .t-battles tbody tr:hover {background-color: #FEFAC0;}
.b-battles .b-battles-holder .t-battles tr .t-border {border-right: 2px solid rgba(194, 173, 173, 0.5);}
.b-battles .b-battles-holder .t-battles tr .t-tournament {font-size: 15px; font-weight: bold;}
.b-battles .b-battles-holder .t-battles tr th {border-bottom: 1px solid #808080; line-height: 20px;}
.b-battles .b-battles-holder .t-battles tr td {line-height: 19px; border-bottom: 1px dotted #B1B1B1;}
.b-battles .b-battles-holder .t-battles tr td:first-of-type {max-width: 100px; overflow: hidden; padding: 0 5px; text-overflow: ellipsis; white-space: nowrap;}
.b-battles .b-battles-holder .t-battles tr td.t-title {font-weight: bold;}
.b-battles .b-battles-holder .t-battles tr td.t-good {color: #4D7326;}
.b-battles .b-battles-holder .t-battles tr td.t-bad {color: #930D0D;}
.b-battles .b-battles-holder .t-battles tr td.t-plan {color: #FFE400;}
.b-battles .b-battles-holder .t-battles tr td.t-fight {color: #4D7326; font-size: 15px; font-weight: bold;}
.b-battles .b-battles-holder .t-battles tr td.t-auction {color: #2F396A; font-weight: bold;}
.b-battles .b-battles-holder .t-battles tr td.t-noFight {color: #808080; font-size: 14px;}
.b-battles .b-battles-holder .t-battles tr td.t-fight.t-noOwner {color: #808080;}
.b-battles .b-battles-holder .t-battles tr td.t-error {color: #CD2911;}
.b-battles .b-battles-holder .t-battles tr.t-cwText td {font-size: 26px; line-height: 54px;}
.b-battles .b-battles-holder .t-battles tr.timeShift td:nth-child(3), .b-battles .b-battles-holder .t-battles tr.timeShift td:nth-child(9) {color: #25931A;}
.b-battles .b-battles-holder .t-battles tr.timeShift td .t-timeShift {font-size: 8px; position: absolute;}
.b-battles .b-battles-holder .t-battles img {height: 16px; margin-bottom: 2px; vertical-align: bottom;}
.b-battles .b-battles-holder .t-battles tfoot tr td {border-bottom: 1px solid #F5F5F5; border-top: 1px solid #808080; font-weight: bold;}
.b-battles .f-battles {background-color: #D1E8FE; border-radius: 0 0 10px 10px; padding: 3px 0px;}
.b-battles .f-battles .f-battles-info {margin: 0 auto; width: 98%;}
.b-battles .f-battles .f-battles-info > * {display: inline-block; vertical-align: middle;}
.b-battles .f-battles .f-battles-info .f-left {width: 20%;}
.b-battles .f-battles .f-battles-info .f-left > span {margin-left: 5px;}
.b-battles .f-battles .f-battles-info .f-left .f-inputText {color: #CD2911;}
.b-battles .f-battles .f-battles-info .f-left .f-inputText.t-green {color: #4D7326;}
.b-battles .f-battles .f-battles-info .f-mid {text-align: center; width: 60%;}
.b-battles .f-battles .f-battles-info .f-mid table {margin: 0 auto;}
.b-battles .f-battles .f-battles-info .f-mid table td {padding: 0 10px;}
.b-battles .f-battles .f-battles-info .f-mid #js-goldInfo {margin-left: 3px;}
.b-battles .f-battles .f-battles-info .f-mid #js-error {display: block;}
.b-battles .f-battles .f-battles-info .f-right {text-align: right; width: 20%;}
.b-battles .f-battles .f-battles-info img {max-height: 16px; vertical-align: bottom;}
/* toggle overrides */
.t-elo {margin-left: 3px;}
.t-gold {color: #FFC364;}
.b-display-none {display: none;}
.b-display-block {display: block;}
/* .t-battle {display: none;} */
.t-bold {font-weight: bold;}
.t-green {color: #4D7326;}
.t-red {color: #930D0D;}
	`
	});
	document.head.appendChild(style);

	// link to battle scheduler
	const rightSide = document.getElementsByClassName("linklist rightside")[0];
	rightSide.prepend(sf.elem("li", {
		className: "b-idealscript b-scriptButton",
		innerHTML: `<a target='_blank' href='./games.php'><span class="icon icon_main icon_cw"></span>Battle Schedule</a>`
	}));
	rightSide.prepend(sf.elem("li", {
		className: "b-idealscript b-scriptButton",
		innerHTML: `<a target='_blank' href='https://eu.wargaming.net/clans/wot/500010805/'><span class="icon icon_main icon_wg"></span>Clan Page</a>`
	}));

	if (/games.php/.test(window.location.href)) {
		styleDynTimezone = sf.elem("style", {
			className: "styleDynTimezone",
			type: "text/css",
			textContent: `
				.b-battles .b-battles-holder .t-battles tr .t-${bs.time.t} {background-color: rgba(254,252,223, 0.5); border-left: 1px solid #808080; border-right: 1px solid #808080;}
				.b-battles .b-battles-holder .t-battles tr .t-${bs.time.t} + th, .b-battles .b-battles-holder .t-battles tr .t-${bs.time.t} + td {background-color: rgba(224,223,218, 0.5); border-right: 1px solid #808080;}
			`
		});
		styleDynBattles = sf.elem("style", {
			className: "styleDynBattles",
			type: "text/css"
		});
		styleDynFinales = sf.elem("style", {
			className: "styleDynFinales",
			type: "text/css"
		});
		document.head.appendChild(styleDynTimezone);
		document.head.appendChild(styleDynBattles);
		document.head.appendChild(styleDynFinales);

		// prepare static html
		const page_body = document.getElementById("page-body"),
		battlePanel = sf.elem("div", {
			className: "b-idealscript b-battles",
			innerHTML: `<div class='h-battles'><div class='h-battles-info'><div class='h-left'><a target='_blank' href='https://greasyfork.org/en/scripts/20094-ideal-scripts'><span class='icon icon_main icon_fork'></span></a><a target='_blank' href='https://eu.wargaming.net/clans/wot/${bs.clan.id}/globalmap'><span class='icon icon_main icon_wg'></span></a><a target='_blank' href='https://eu.wargaming.net/globalmap/'><span class='icon icon_main icon_cw'></span></a></div><div class='h-mid'><span id='js-eventName'></span><span id='js-clan'></span><span id='js-timePrime'>Ɵ</span></div><div class='h-right'><span id='js-update'>Update</span><span class='h-force'><label id='js-force'>Campaign Only: <input type='checkbox' name='force'></label></span><span class='h-expand' id='js-expand'></div></div></div><div class='b-battles-holder'><table class='t-battles sortable'><thead><tr><th>Province</th><th>Map</th><th data-sort-method='number' data-sort-order='desc'>Timezone</th><th class='t-gold'>Gold</th><th class='t-fame' id='js-fame'>Fame</th><th>Owner (ELO)</th><th>Type</th><th id='js-provStatus'>Status</th><th class='t-battle sort-default'  data-sort-method='number' data-sort-order='desc'>Next Battle</th><th class='t-battle'>Attackers</th><th class='t-battle t-border'>Turns</th></tr></thead><tbody></tbody><tfoot id ='js-footer'><tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr></tfoot></table></div><div class='f-battles'><div class='f-battles-info'><div class='f-left' id='js-input'><input type='text' name='id' placeholder='Clan ID' value='${bs.clan.id}' list='clanid' maxlength='9' size='9'><datalist id='clanid'>${clans.join("")}</datalist><span class='f-inputImage'><img src='https://wot-life.com/img/clanicon/${bs.clan.id}.png'></span><span class='f-inputText'>${(bs.clan.id !== bs.clan.ideal) ? "</span><span class='f-inputBack'>Back to <a target='_blank' href='#' onclick='localStorage.removeItem(\"battles_clanid\"); location.reload();'>[IDEAL]</a></span>" : ""}</div><div class='f-mid'><table id='js-tableStats' class='b-display-none'><tr class='t-bold'><td>Current Battles: <span id='js-battles'>0</span></td><td>Simultaneously: <span id='js-battlesConc'>0</span></td><td>Planned: <span id='js-battlesPlan'>0</span></td></tr><td>Owned Provinces: <span id='js-provs'>0</span></td><td colspan='2'>Gold Income: <span class='t-gold' id='js-gold'>0</span><span class='icon icon_main icon_gold'></span><span id='js-goldInfo'></span></td></tr></tr><td><span class='t-bold t-green'>&#9876;</span> Tournament Battle</td><td><span class='t-bold t-green'>♖</span> Battle with Owner</td><td><span class='t-bold t-green'>&#9876;+</span> Timeshift</td></tr></tr><tr><td colspan='3'>Last Updated: <span id='js-batttleUpdate'>Ɵ</span> [UTC${(bs.time.o >= 0) ? "+" : ""}${bs.time.o}]</td></tr><td colspan='3'><span id='js-error'></span></td></tr></table></div><div class='f-right'>v${bs.vers}</span></div></div></div>`
		});
		page_body.innerHTML = "";
		page_body.appendChild(battlePanel);

		// table references
		battleTable = battlePanel.children[1].firstElementChild;


		// time cells for header and body rows
		const timeFragment = document.createDocumentFragment();
		for (let _tc = 0, _tc_len = bs.table.eu.length; _tc < _tc_len; _tc++) {
			const t = bs.table.eu[_tc],
			times = [sf.cw.time(t, "00", "s"), `${sf.cw.time(t)}:00`, sf.cw.time(t, "30", "s"), `${sf.cw.time(t)}:30`];
			timeFragment.appendChild(sf.elem("th", {
				className: `t-time ${times[0]}`,
				innerHTML: times[1]
			}));
			bs.table.c += `<td class='t-time ${times[0]}' data-time='${times[1]}'></td>`;
			if (_tc !== _tc_len - 1) {
				timeFragment.appendChild(sf.elem("th", {
					className: `t-time ${times[2]}`,
					innerHTML: times[3]
				}));
				bs.table.c += `<td class='t-time ${times[2]}' data-time='${times[3]}'></td>`;
			}
		}
		battleTable.firstElementChild.firstElementChild.appendChild(timeFragment);
		battleTable.lastElementChild.firstElementChild.innerHTML += bs.table.c;

		// button to update
		const updateSpan = document.getElementById('js-update');
		updateSpan.addEventListener('click', function() {
			sf.cw.updater(true);
		}, false);

		// button to force load cw battles
		const forceSpan = document.getElementById('js-force');
		forceSpan.lastElementChild.checked = (bs.cw.status) ? true : false;
		forceSpan.addEventListener('click', function() {
			localStorage.setItem("battles_force", this.lastElementChild.checked);
			location.reload();
		}, false);

		// add custom input for checking other clans
		inputSpan = document.getElementById('js-input');
		inputSpan.firstElementChild.addEventListener('input', function() {
			const value = this.value;
			if (value.length == 9 && value[0] == "5") {
				inputSpan.children[2].firstElementChild.src = `https://wot-life.com/img/clanicon/${value}.png`;
				inputSpan.children[3].innerHTML = "Stored! <a target='_blank' href='#' onclick='location.reload();'>Refresh?</a>";
				inputSpan.children[3].classList.add("t-green");
				if (inputSpan.children.length == 5) {
					inputSpan.children[4].textContent = "";
				}
				localStorage.setItem("battles_clanid", value);
			}
			else if (value.length > 0 && value[0] !== "5") {
				inputSpan.children[3].textContent = "Not Valid!";
			}
			else {
				inputSpan.children[3].textContent = "Missing";
			}
		}, false);

		// add intervals for time and round updater
		timeInterval = setInterval(sf.cw.timer, 1000); // 1 second
		updateInterval = setInterval(sf.cw.updater, 120000); // 2 minutes

		// activate tablesort function for battle scheduler
		if (Tablesort) {
			// Numeric sort
			Tablesort.extend('number', function(item) {
				return item.match(/^-?(\d)*-?([,\.]){0,1}-?(\d)+([E,e][\-+][\d]+)?%?$/); // Number
			}, function(a, b) {
				a = parseFloat(a);
				b = parseFloat(b);

				a = isNaN(a) ? 0 : a;
				b = isNaN(b) ? 0 : b;
				return a - b;
			});
			sortTable = new Tablesort(battleTable);
		}
		else {
			window.alert("Error activating tablesort, please refresh - if this shit continues, poke Orrie");
		}

		// insert update status - will crash the tablesorter if inserted earlier
		battleTable.children[1].appendChild(sf.elem("tr", {
			className: "t-cwText",
			innerHTML: "<td colspan='23'>Updating...</td>"
		}));

		// activate handler functions through xmlhttp request
		// send request to wargaming api to see if an event is running
		sf.request("eventData", bs.api.event, sf.cw.handlerEvent, "cw");
	}
	else {
		// prepare static html
		const page_body = document.getElementById("page-body"),
		streamers = streams.length,
		parentPanel = sf.elem("div", {
			className: "b-panel"
		}, [
			document.getElementsByClassName("tablebg")[0],
			sf.elem("div", {
				className: "b-idealscript b-streams",
				innerHTML: `<span class='s-helper'></span><div class='h-streams'><div class='h-streams-info'><div class='h-left'><a target='_blank' href='https://www.twitch.tv/directory/game/World%20of%20Tanks'><span class='icon icon_main icon_twitch'></span></a></div><div class='h-mid'>Total Streams: ${streamers} &#8226; Streams Online: <span id='js-streamsOnline'>0</span></div><div class='h-right'><a target='_blank' href='https://greasyfork.org/en/scripts/20094-ideal-scripts'><span class='icon icon_main icon_fork'></span></a></div></div><table class='h-streams-head'><thead><tr><th></th><th>Name</th><th>Clan/Team</th><th>Viewers</th><th>Flag</th></thead></table></div><div class='b-streams-holder'><table class='t-streams'><tbody class='streamIdeal'></tbody><tbody class='streamOnline'></tbody><tbody class='streamAmerica'><tbody class='streamRussia'><tbody class='streamCommunity'></tbody><tbody class='streamSeperator'><tr><td colspan='5'></td></tr></tbody><tbody class='streamOffline'></tbody></table></div><div class='f-streams'><div class='f-mid'>Updates Every 2 Mins &#8226; Last Updated: <span id='js-streamUpdate'>Updating...</span></div></div>`
			})
		]);
		page_body.insertBefore(parentPanel, page_body.children[3]);
		// table references
		streamTable = parentPanel.lastElementChild.children[2].firstElementChild.childNodes;

		// fill stream table
		const streamString = [],
		streamFragment = document.createDocumentFragment();
		for (let _s = 0; _s < streamers; _s++) {
			const stream = streams[_s],
			streamRow = sf.elem("tr", {
				className: stream[4],
				id: stream[1],
				innerHTML: `<td class='td_info'></td><td class='td_name'><a target='_blank' href='https://www.twitch.tv/${stream[1]}'>${stream[0]}</a></td><td class='td_clan'>${(stream[2].constructor === Array) ? `<span class='icon icon_clan icon_${stream[2][0]}' alt='clan'></span><span class='icon icon_clan icon_${stream[2][1]}' alt='team'></span>` : `<span class='icon icon_clan icon_${stream[2]}' alt='clan'></span>`}</td><td class='td_status s-offline'>Offline</td><td class='td_flag'>${(stream[3].constructor === Array) ? `<span class='icon icon_flag icon_${stream[3][0]}' alt='flag'></span><span class='icon icon_flag icon_${stream[3][1]}' alt='flag'></span>` : `<span class='icon icon_flag icon_${stream[3]}' alt='flag'></span>`}</td>`
			});
			streamString.push(stream[1]);
			streamFragment.appendChild(streamRow);
		}
		streamTable[6].appendChild(streamFragment);
		// create twitch api url
		bs.tw.api += streamString.join(",");

		// activate handler functions through xmlhttp request
		// send request to twitch api with 2mins frequency
		sf.request("twitchData", bs.tw.api, sf.tw.handlerMain, "tw");
		window.setInterval(sf.tw.updater, 120000);
	}
}(window));