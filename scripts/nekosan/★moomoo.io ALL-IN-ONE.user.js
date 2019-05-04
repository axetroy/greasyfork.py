// ==UserScript==
// @name			★moomoo.io ALL-IN-ONE
// @version			1.0
// @description		AutoHeal, ActionMacro, DetailMiniMap, EnemyRadar, ItemCounter, ChangeHat, Hyahhaaaaa!!
// @author			nekosan
// @match			*://moomoo.io/*
// @grant			none
// @namespace		https://greasyfork.org/ja/scripts/29249-moomoo-io-all-in-one
// ==/UserScript==

// AutoHeal
// https://greasyfork.org/ja/scripts/29156-moomoo-io-autoheal
(function() {
	'use strict';

	var socket;
	var SID;
	var heal = true;

	setTimeout(function () {
		var c = setInterval(function () {
			if (typeof io !== 'undefined' && io !== null &&
				typeof storeBuy === 'function' && typeof Object.keys(io.managers) [0] !== 'undefined'
			) {
				socket = io.managers[Object.keys(io.managers) [0]].nsps['/'];
				socket.on('1', function (a) {
					SID = a;
				});
				var c2 = setInterval(function () {
					if (typeof SID !== 'undefined' && SID !== null) {
						socket.on('10', function (a, b) {
							if (a === SID && b < 80) {
								if (heal) p(1);
							}
						});
						clearInterval(c2);
					}
				}, 200);
				clearInterval(c);
			}
		}, 200);
	}, 1000);

	function send(n, v) {
		io.managers[Object.keys(io.managers) [0]].nsps['/'].emit(n, v);
	}

	function p(a) {
		send('5', a);
		send('4', 1);
	}

	document.addEventListener('keydown', function (e) {
		if (document.activeElement.id == 'chatBox') return;
		// [P] key : AutoHeal ON/OFF
		if (e.keyCode == 80) {
			heal = !heal;
		}
	});
})();


// ActionMacro
// https://greasyfork.org/ja/scripts/29157-moomoo-io-actionmacro
(function() {
	'use strict';

	// Hat
	var hat = 0;
	var ID_BummleHat = 8;
	var ID_StrawHat = 2;
	var ID_WinterCap = 15;
	var ID_CowboyHat = 5;
	var ID_RangerHat = 4;
	var ID_ExplorerHat = 18;
	var ID_MarksmanCap = 1;
	var ID_SoldierHelmet = 6;
	var ID_HoneycrispHat = 13;
	var ID_MinersHelmet = 9;
	var ID_BoosterHat = 12;
	var ID_BushGear = 10;
	var ID_SpikeGear = 11;
	var ID_BushidoArmor = 16;
	var ID_SamuraiArmor = 20;

	// Wepon
	var subitemmode = 0;		// （0:BoostPad 1:PitTrap）
	var flag_subweapon = false;

	// Item
	var food = 1;			// 0:apple		1:cokkie
	var wall = 2;			// 2:woodwall	3:stonewall
	var spike = 5;			// 4:spikes		5:greater spikes
	var mill = 6;			// 6:windmill	7:faster windmill
	var mine = 8;			// 9:mine
	var trap = 9;			// 9:pit trap
	var boost = 10;			// 10:boost pad

	var dir;
	document.getElementById('gameCanvas').addEventListener('mousemove', function (e) {
		dir = Math.atan2(e.pageY - window.innerHeight / 2, e.pageX - window.innerWidth / 2);
	});

	function send(n, v) {
		io.managers[Object.keys(io.managers) [0]].nsps['/'].emit(n, v);
	}

	function p(a, itemid) {
		if (a !== 0) {
			send('2', dir + a);
		}
		send('5', itemid);
		send('4', 1);
	}

	document.addEventListener('keydown', function (e) {
		if (document.activeElement.id == 'chatBox') return;
		switch (e.keyCode) {
			// [CapsLock]
			case 240:
				if (hat == ID_BoosterHat) {
					hat = ID_SamuraiArmor;
				} else {
					hat = ID_BoosterHat;
				}
				storeEquip(hat);
				break;
			// [Space]
			case 32:
				e.preventDefault();
				p(0, boost);
				setTimeout(function () {
					p(0, boost);
					setTimeout(function () {
						p(1.5, spike);
						p(-1.5, spike);
						setTimeout(function () {
							p(1.5, spike);
							p(-1.5, spike);
							setTimeout(function () {
								p(0, spike);
							}, 80);
						}, 80);
					}, 50);
				}, 200);
				break;
			// [0]
			case 48:
				subitemmode = (subitemmode === 0) ? 1 : 0;
				break;
			// [B]
			case 66:
				p(0, subitemmode === 0 ? boost : trap);
				break;
			// [C]
			case 67:
				if (subitemmode === 0) {
					p(0, boost);
					setTimeout(function () {
						p(2, spike);
						p(-2, spike);
					}, 300);
				} else {
					p(0, trap);
				}
				break;
			// [F]
			case 70:
				p(0, spike);
				break;
			// [G]
			case 71:
				p(0.7, spike);
				p(-0.7, spike);
				break;
			// [H]
			case 72:
				p(0, spike);
				p(1.4, spike);
				p(-1.4, spike);
				break;
			// [I]
			case 73:
				p(2.5, mill);
				p(-2.5, mill);
				p(1, mill);
				p(-1, mill);
				break;
			// [J]
			case 74:
				p( Math.PI / 3, spike);
				p(-Math.PI / 3, spike);
				p(Math.PI, spike);
				break;
			// [N]
			case 78:
				p(2.5, mill);
				p(-2.5, mill);
				break;
			// [Q]
			case 81:
				p(0, food);
				break;
			// [R]
			case 82:
				p(Math.PI, spike);
				break;
			// [T]
			case 84:
				p(Math.PI,trap);
				break;
			// [V]
			case 86:
				p(2.3, spike);
				p(-2.3, spike);
				break;
			// [X]
			case 88:
				p( Math.PI / 3, wall);
				p(-Math.PI / 3, wall);
				p(Math.PI, wall);
				break;
			// [Z]
			case 90:
				p(0.7, wall);
				p(-0.7, wall);
				break;
		}
		if (e.shiftKey) {
			flag_subweapon = !flag_subweapon;

			// Sub Weapon
			if (flag_subweapon) {
				// hunting bow
				if ($('#actionBarItem3').css('display') != 'none') {
					$('#actionBarItem3').click();
					if (hat != ID_MarksmanCap) {
						hat = ID_MarksmanCap;
					}
					storeEquip(hat);
				// wooden shield
				} else if ($('#actionBarItem5').css('display') != 'none') {
					$('#actionBarItem5').click();
				}
			// Main Weapon
			} else {
				// great axe
				if ($('#actionBarItem1').css('display') != 'none') {
					$('#actionBarItem1').click();
				// short sword
				} else if ($('#actionBarItem2').css('display') != 'none') {
					$('#actionBarItem2').click();
				}
				if (hat == ID_MarksmanCap) {
					hat = ID_BoosterHat;
					storeEquip(hat);
				}
			}
		}
	});

	document.addEventListener('contextmenu', function (e) {
		if (document.activeElement.id == 'chatBox') return false;
		p(0, subitemmode === 0 ? boost : trap);
	}, false);
})();


// DetailMiniMap
// https://greasyfork.org/en/scripts/29014-moomoo-io-detailminimap
(function() {
	'use strict';

	var conf = {
		'map': {
			'w': '200',
			'h': '200',
			'top': '15',
			'left': '15'
		},
		'resource':{
			'wood': {
				'color': '#8ecc51',
				'border': 'none',
				'w': '4',
				'h': '4'
			},
			'food': {
				'color': '#ff5500',
				'border': 'none',
				'w': '4',
				'h': '4'
			},
			'stone': {
				'color': '#bbbbbb',
				'border': '1px solid #333333',
				'w': '5',
				'h': '5'
			},
			'points': {
				'color': '#ffff00',
				'border': '1px solid #ffdd99',
				'w': '5',
				'h': '5'
			}
		},
		'scale': 13400.0
	};

	var SID;
	var socket;

	// Change Layout
	$('#mapDisplay').css({
		'top': conf.map.top + 'px',			// default button 20px
		'left': conf.map.left + 'px',		// default 20px
		'width': conf.map.w + 'px',			// default 130px
		'height': conf.map.h + 'px'			// default 130px
	});
	$('#scoreDisplay').css({
		'bottom': '20px',					// default 20px
		'left': '20px'						// default 170px
	});

	setTimeout(function () {
		var c = setInterval(function () {
			if (typeof io !== 'undefined' && io !== null) {
				if (typeof storeBuy === 'function' && typeof Object.keys(io.managers) [0] !== 'undefined') {

					socket = io.managers[Object.keys(io.managers) [0]].nsps['/'];
					socket.on('1', function (e) {
						SID = e;
					});

					$('#gameUI').append('<div id="minimap" class=" " ' +
						'style="' +
						'position: absolute;' +
						'top: ' + conf.map.top + 'px;' +
						'left: ' + conf.map.left + 'px;' +
						'display: inline-block;' +
						'width: ' + conf.map.w + 'px;' +
						'height: ' + conf.map.h + 'px;' +
						'"></div>');

					socket.on('6', function (e) {
						for (var t = 0; t < e.length; t += 8) {
							addItem(e[t], e[t + 1], e[t + 2], e[t + 3], e[t + 4], e[t + 5]);
						}
					});

					clearInterval(c);
				}
			}
		}, 200);
	}, 1000);

	function addItem(sid, x, y, dir, scale, type, item, owner) {
		if (!$('#minimap').length || type === null || $('#resource' + sid).length) return true;

		var name = '';
		var color = '';
		var border = '';
		var tx = x * 100 / conf.scale;
		var ty = y * 100 / conf.scale;
		var w;
		var h;

		switch (type) {
			default:
				return;
			case 0:
				name = 'wood';
				color = conf.resource.wood.color;
				border = conf.resource.wood.border;
				w = conf.resource.wood.w;
				h = conf.resource.wood.h;
				break;
			case 1:
				name = 'food';
				color = conf.resource.food.color;
				border = conf.resource.food.border;
				w = conf.resource.food.w;
				h = conf.resource.food.h;
				break;
			case 2:
				name = 'stone';
				color = conf.resource.stone.color;
				border = conf.resource.stone.border;
				w = conf.resource.stone.w;
				h = conf.resource.stone.h;
				break;
			case 3:
				name = 'points';
				color = conf.resource.points.color;
				border = conf.resource.points.border;
				w = conf.resource.points.w;
				h = conf.resource.points.h;
				break;
		}
		$('#minimap').append('<div id="resource' + sid + '" style="' +
			'display: block;' +
			'width: ' + w + 'px;' +
			'height: ' + h + 'px;' +
			'background:' + color + ';' +
			'left:' + tx + '%;' +
			'top:' + ty + '%;' +
			'position: absolute;' +
			'border: ' + border + ';' +
			'border-radius: 50%;' +
			'"></div>');
	}

	document.addEventListener('keydown', function (e) {
		// [Insert] key : DetailMiniMap ON/OFF
		if (e.keyCode == 45) {
			$('#minimap').toggle();
		}
	});
})();


// EnemyRadar
// https://greasyfork.org/ja/scripts/29215-moomoo-io-enemyradar
(function() {
	'use strict';

	var conf = {
		'radar': {
			'color': '#ffffff',
			'w': '20',
			'h': '20'
		},
		'maxScreenWidth': 1920,
		'maxScreenHeight': 1080
	};

	var SID;
	var socket;
	var player_x = 0;
	var player_y = 0;
	var player_team = null;
	var user = [];

	setTimeout(function () {
		var c = setInterval(function () {
			if (typeof io !== 'undefined' && io !== null) {
				if (typeof storeBuy === 'function' && typeof Object.keys(io.managers) [0] !== 'undefined') {
					socket = io.managers[Object.keys(io.managers) [0]].nsps['/'];
					socket.on('1', function (e) {
						SID = e;
					});
					socket.on('2', function (e, t) {
						if (!t) user.push([e[0], e[1], e[2], 0, 0, null]);
					});
					socket.on('4', function (e) {
						removeUserID(e);
					});
					socket.on('13', function (e) {
						removeUserSID(e);
					});
					socket.on('3', function (e) {
						for (var i = 0; i < user.length; i++) {
							$('#enemyradar' + user[i][1]).css({ 'display': 'none' });
						}
						for (var t = 0; t < e.length; t += 8) {
							if (e[t] == SID) {
								player_x = e[t + 1];
								player_y = e[t + 2];
								player_team = e[t + 6];
							} else {
								addUser(e[t], e[t + 1], e[t + 2], e[t + 6]);
							}
						}
					});
					clearInterval(c);
				}
			}
		}, 200);
	}, 1000);

	function addUser(sid, x, y, team) {
		for (var i = 0; i < user.length; i++) {
			if (user[i][1] === sid) {
				user[i][3] = x;
				user[i][4] = y;
				user[i][5] = team;
				break;
			}
		}
		if (!$('#enemyradar' + sid).length) {
			$(document.body).append('<div id="enemyradar' + sid + '" style="' +
					'display: none;' +
					'position: absolute;' +
					'left: 0;' +
					'top: 0;' +
					'color: #ffffff;' +
					'width: 0;' +
					'height: 0;' +
					'border-style: solid;' +
					'border-width: 10px 0 10px 20px;' +
					'border-color: transparent transparent transparent ' + conf.radar.color + ';' +
				'"></div>');
		}
		var center_x = window.innerWidth / 2;
		var center_y = window.innerHeight / 2;
		var rad = getRadian(player_x, player_y, x, y);
		var per = getDistance(0, 0, (player_x - x), (player_y - y) * (16 / 9)) * 100 / (conf.maxScreenHeight / 2);
		var alpha = per / center_y;
		if (alpha > 1.0) alpha = 1.0;
		var dis = center_y * alpha;
		var tx = center_x + dis * Math.cos(rad) - conf.radar.w / 2;
		var ty = center_y + dis * Math.sin(rad) - conf.radar.h / 2;
		$('#enemyradar' + sid).css({
			'left': tx + 'px',
			'top': ty + 'px',
			'display': ((player_team === null || player_team !== team) ? 'block' : 'none'),
			'opacity': alpha,
			'transform': 'rotate(' + RtoD(rad) + 'deg)'
		});
	}

	function removeUserID(id) {
		for (var i = 0; i < user.length; i++) {
			if (user[i][0] == id) {
				$('#enemyradar' + user[i][1]).remove();
				user.splice(i, 1);
				break;
			}
		}
	}

	function removeUserSID(sid) {
		for (var i = 0; i < user.length; i++) {
			if (user[i][1] == sid) {
				$('#enemyradar' + user[i][1]).remove();
				user.splice(i, 1);
				break;
			}
		}
	}

	function getRadian(x1, y1, x2, y2) {
		return Math.atan2(y2 - y1, x2 - x1);
	}
	function getDistance(x1, y1, x2, y2) {
		return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
	}
	function RtoD(r) {
		return r * 180 / Math.PI;
	}
	function DtoR(d) {
		return d * Math.PI / 180;
	}
})();


// ItemCounter
// https://greasyfork.org/ja/scripts/28930-moomoo-io-itemcounter
(function() {
	'use strict';

	// groupID:0 food	 limit: -
	// groupID:1 walls	 limit: 25
	// groupID:2 spikes	 limit: 15
	// groupID:3 mill	 limit: 6
	// groupID:4 mine	 limit: 1
	// groupID:5 trap	 limit: 6
	// groupID:6 booster limit: 12

	var socket;
	var SID;
	var maxnum_wall = 25;
	var maxnum_spike = 15;
	var maxnum_mill = 6;
	var maxnum_mine = 1;
	var maxnum_trap = 6;
	var maxnum_boost = 12;
	var item = [];

	var c1 = setInterval(function () {
		if (typeof io !== 'undefined' &&
			io !== null &&
			typeof storeBuy === 'function' &&
			typeof Object.keys(io.managers) [0] !== 'undefined'
		) {

			socket = io.managers[Object.keys(io.managers) [0]].nsps['/'];
			socket.on('1', function (e) {
				SID = e;
			});

			var c2 = setInterval(function () {
				if (typeof SID !== 'undefined' && SID !== null) {

					for (var i = 0; i < 9; i++) {
						item[i] = document.createElement('div');
						item[i].setAttribute('id', 'itemnum' + (i + 8));
						item[i].style.cssText =
							'position: absolute;' +
							'top: 0;' +
							'padding-left: 5px;' +
							'font-size: 2em;' +
							'color: #fff;';
						document.getElementById('actionBarItem' + (i + 8)).appendChild(item[i]);
					}
					item[0].innerHTML = maxnum_wall;
					item[1].innerHTML = maxnum_wall;
					item[2].innerHTML = maxnum_spike;
					item[3].innerHTML = maxnum_spike;
					item[4].innerHTML = maxnum_mill;
					item[5].innerHTML = maxnum_mill;
					item[6].innerHTML = maxnum_mine;
					item[7].innerHTML = maxnum_trap;
					item[8].innerHTML = maxnum_boost;

					socket.on('14', function (e, t) {
						switch (e) {
							// wall
							case 1:
								document.getElementById('itemnum8').innerHTML =
								document.getElementById('itemnum9').innerHTML = maxnum_wall - t;
								break;
							// spikes
							case 2:
								document.getElementById('itemnum10').innerHTML =
								document.getElementById('itemnum11').innerHTML = maxnum_spike - t;
								break;
							// mill
							case 3:
								document.getElementById('itemnum12').innerHTML =
								document.getElementById('itemnum13').innerHTML = maxnum_mill - t;
								break;
							// mine
							case 4:
								document.getElementById('itemnum14').innerHTML = maxnum_mine - t;
								break;
							// pit trap
							case 5:
								document.getElementById('itemnum15').innerHTML = maxnum_trap - t;
								break;
							// boost pad
							case 6:
								document.getElementById('itemnum16').innerHTML = maxnum_boost - t;
								break;
						}
					});

					clearInterval(c2);
				}
			}, 200);
			clearInterval(c1);
		}
	}, 200);

})();


// ChangeHat
// https://greasyfork.org/ja/scripts/28898-moomoo-io-changehat
(function() {
	'use strict';

	var ID_BummleHat = 8;
	var ID_StrawHat = 2;
	var ID_WinterCap = 15;
	var ID_CowboyHat = 5;
	var ID_RangerHat = 4;
	var ID_ExplorerHat = 18;
	var ID_MarksmanCap = 1;
	var ID_SoldierHelmet = 6;
	var ID_HoneycrispHat = 13;
	var ID_MinersHelmet = 9;
	var ID_BoosterHat = 12;
	var ID_BushGear = 10;
	var ID_SpikeGear = 11;
	var ID_BushidoArmor = 16;
	var ID_SamuraiArmor = 20;

	document.addEventListener('keydown', function(e) {
		switch (e.keyCode - 96) {
			case 0: storeEquip(0); break; // UnEquip
			case 1: storeEquip(ID_BummleHat); break;
			case 2: storeEquip(ID_WinterCap); break;
			case 3: storeEquip(ID_SoldierHelmet); break;
			case 4: storeEquip(ID_HoneycrispHat); break;
			case 5: storeEquip(ID_BoosterHat); break;
			case 6: storeEquip(ID_BushGear); break;
			case 7: storeEquip(ID_SpikeGear); break;
			case 8: storeEquip(ID_BushidoArmor); break;
			case 9: storeEquip(ID_SamuraiArmor); break;
		}
	});

})();


// Hyahhaaaaa!!
// https://greasyfork.org/ja/scripts/28983-moomoo-io-hyahhaaaaa
(function() {
	'use strict';

	var msgs = [
		'Aaaaaaaa!!',
		'Awooaaa!!!!',
		'Buruaaaaaaaaaa!!',
		'Fooooooooooooooooo!!',
		'Ha Ha Ha Haaa!!!',
		'Haaaaaaaa!!!',
		'Haaaaaaaaaaaaaaaaaaaaaaaaa!!',
		'Hoooaaaaaaaoo!!',
		'Hooooooooooooooooooooooooo!!',
		'HyaHyaHyaaa!!',
		'HyaHyaaaa!!',
		'Hyahhaaa!!',
		'Hyahhaaaa!!',
		'Hyahhaaaaa!!',
		'Hyahhaaaaaa!!',
		'Hyahhaaaaaaa!!',
		'Hyahhaaaaaaaa!!',
		'Hyahhaaaaaaaaa!!',
		'Hyahhaaaaaaaaaa!!',
		'Hyahhaaaaaaaaaaa!!',
		'Hyahoaaa!!!',
		'Uryaaaa!!',
		'UryuaaaaAaa!!',
		'Uryyyyyy!!',
		'Waahaha!!',
		'Wryyyyy!!',
		'Yeahaaaaa!!',
		'gooooooooooaaaaaaaaa!!!!!!!',
		'ha ha ha ha!!',
		'ha ha ha!!',
		'ha ha!!'
	];

	var cnt = 0;
	var flag = false;
	var oid = -1;

	function chat(m) {
		io.managers[Object.keys(io.managers)[0]].nsps['/'].emit('ch', m);
	}

	function rand(a, b) {
		return a + Math.floor(Math.random() * (b - a + 1));
	}

	document.addEventListener('keydown', function(e) {
		// [Insert] Key : RandomChat ON/OFF
		if (e.keyCode == 45) {
			flag = !flag;
		}
		cnt++;
	});
	document.addEventListener('keyup', function(e) { cnt++; });
	document.addEventListener('mousedown', function(e) { cnt++; });
	document.addEventListener('mouseup', function(e) { cnt++; });
	document.addEventListener('contextmenu', function(e) { cnt++; });

	var timer = setInterval(function() {
		if (flag && cnt > 0) {
			if (cnt > 10 || rand(0, 10 - cnt) === 0) {
				var t = rand(0, msgs.length - 1);
				if (t != oid) {
					chat(msgs[t]);
					cnt = 0;
				}
				oid = t;
			}
		}
	}, 800);

})();