// ==UserScript==
// @name         ANTHONY'S FOES.IO PATCH
// @version      2.0.3
// @description  Aimbot for foes.io
// @author       ÁNTHØNY
// @match        *://foes.io/*
// @grant        none
// @namespace https://greasyfork.org/en/scripts/36352-anthony-s-vertix-io-patch
// ==/UserScript==

function gA(a, d){
	return {
		x: Math.cos(a) * d,
		y: Math.sin(a) * d
	};
}
function pyt(e, f){
	return Math.atan2(Math.sin(e-f), Math.cos(e-f));
}
function tryJSONP(e){
	var a;
	try {
		a = JSON.parse(e);
	} catch(e) {}
	return a;
}
function disAng(x,y){
	var t = Math.PI * 2,
		a = (x - y) % t,
		b = (y - x) % t;
	return Math.abs(a < b ? -a : b);
}

var dt = {
	parseSend: function(e){
		var w = JSON.parse(e),
			t = w[0],
			a = w[1];
		if(t == "a") return e;
		console.log("send", w);
		switch(t){
			case "2":
				console.log("\"2\"", a);
				if(a[0] == 1){
					return "no-send--";
				}
				break;
			case "1":
				if(a[0] === null) break;
				a[0] = (function(){
					var b = a[0];
					dt.plr.rot = b;
					b = (dt.d.rot !== null && dt.enabled) ? dt.d.rot : b;
					return b;
				}());
				break;
			default:
				console.log("%cunknown: " + e, "color: green;");
		}
		return JSON.stringify([t, a]);
	},
	parseMessage: function(e){
		var w = JSON.parse(e),
			t = w[0],
			a = w[1];
		dt.ping ++;
		console.log("get", t, a);
		switch(t){
			case "3":
				// this is time left for decrease in border
				break;
			case "0":
				var b = a;
				let c = b[0], d = [], obs = Object.assign({}, dt.obs);
				while(c.length > 0){
					d.push(c.splice(0, 8));
				}
				let f = d.find(function(e){return e[0] == dt.id;}), tx = 0, ty = 0, id = dt.id;
				if(!e) e = f;
				if(d.length == 1){
					dt.id = d[0][0];
					dt.d.rot = null;
				}
				try{
					f[1] += ((dt.obs[f[0]][1] - obs[f[0]][1])/(dt.obs.timestamp - obs.timestamp))*(dt.pingR / 1e3);
					f[2] += ((dt.obs[f[0]][2] - obs[f[0]][2])/(dt.obs.timestamp - obs.timestamp))*(dt.pingR / 1e3);
				} catch(e){}
				if(dt.cursorE){
					for(let i of d){
						if(f == i || !f) continue;
						let a = Math.atan2(i[2] - f[2], i[1] - f[1]), b = Math.atan2(ty, tx), c = Math.atan2(dt.cursor.y, dt.cursor.x) || 0;
						if(disAng(a, c) < disAng(b, c) || !b){
							tx = i[1] - f[1];
							ty = i[2] - f[2];
							id = i[0];
						}
						dt.obs[i[0]] = i;
					}
					dt.obs.timestamp = dt.lT;
				} else {
					for(let i of d){
						if(f == i || !f) continue;
						let a = pyt(i[1] - f[1], i[2] - f[2]), b = pyt(tx, ty);
						if(Math.abs(a) < Math.abs(b) || !b){
							tx = i[1] - f[1];
							ty = i[2] - f[2];
							id = i[0];
						}
						dt.obs[i[0]] = i;
					}
					dt.obs.timestamp = dt.lT;
				}
				if(dt.obs[id] && obs[id] && d.length > 1 && dt.started){
					dt.d.rot = Math.atan2(ty + ((dt.obs[id][2] - obs[id][2])/(dt.obs.timestamp - obs.timestamp))*((dt.pingR / 1e3)*pyt(tx,tx)/100),
										  tx + ((dt.obs[id][1] - obs[id][1])/(dt.obs.timestamp - obs.timestamp))*((dt.pingR / 1e3)*pyt(tx,tx)/100)); // string in bullet speed here
					console.log("aim", dt.d.rot);
				} else {
					dt.d.rot = null;
				}
				let {x, y} = gA(dt.d.rot, (innerHeight < innerWidth ? innerHeight : innerWidth)/3);
				if(dt.d.rot){
					dt.vHit.style.left = x + innerWidth/2 + "px";
					dt.vHit.style.top = y + innerHeight/2 +"px";
					dt.vHit.style.opacity = dt.enabled ? 1 : .5;
				} else {
					dt.vHit.style.left = - 16 + "px";
					dt.vHit.style.top = - 16 +"px";
				}
				dt.lT = Date.now();
				break;
			case "8":
				if(a[0] == 0){
					dt.started = true;
				} else {
					dt.started = false;
				}
				break;
			case "17":
				console.log("BULLET");
				// work on to improve accracy
				break;
			default:
				console.log("%cunknown: " + e, "color: green;");
		}
		return e;
	},
	plr: {
		rot: null
	},
	d: {
		rot: null
	},
	key: [],
	obs: {
		timestamp: Date.now()
	},
	tg: 1,
	id: 1,
	enabled: true,
	cursorE: false,
	started: true,
	lT: Date.now(),
	pingR: 0,
	ping: 0,
	cursor: {
		x: null,
		y: null
	},
	vHit: (function(){
		var a = document.createElement("div");
		a.style = "position: fixed; width: 8px; height: 8px; background-color: red; top: -16px; left: -16px; box-shadow: #F00 0px 0px 8px 4px; border-radius: 4px;";
		document.body.appendChild(a);
		return a;
	}()),
	clT: 0
};
window.dt = dt;

(function() {
	WebSocket.prototype.rSend = WebSocket.prototype.send;
	WebSocket.prototype.send = function(e){
		var b = e;
		if(!window.socket || window.socket!=this){
			window.socket = this;
			this.addEventListener("message", function(e){
				dt.parseMessage(e.data);
			});
		}
		b = dt.parseSend(e);
		if(b == "no-send--") return;
		this.rSend(b);
	};
	addEventListener("keydown", function(e){
		if(e.keyCode == 69){
			dt.enabled = !dt.enabled;
			document.title = "Foes.io - Hax " + (dt.enabled ? "on" : "off");
			clearTimeout(dt.clT);
			dt.clT = setTimeout(function(){
				document.title = "Foes.io";
			}, 3e3);
		}
		if(e.keyCode == 82){
			dt.cursorE = !dt.cursorE;
			document.title = "Foes.io - Cursor " + (dt.cursorE ? "on" : "off");
			clearTimeout(dt.clT);
			dt.clT = setTimeout(function(){
				document.title = "Foes.io";
			}, 3e3);
		}
	});
	addEventListener("mousemove", function(e){
		dt.cursor.x = e.clientX;
		dt.cursor.y = e.clientY;
	});
	setInterval(function(){
		dt.pingR = dt.ping;
		dt.ping = 0;
	}, 1e3);
})();
console.log("FinishLoad - Aimbot");

$('#adCard').html('<div onclick="javascript:location.href=\'https://slithere.com/slither-io-mods-country-flags-team-logos-create-skin/\'"><img src="https://slithere.com/wp-content/uploads/slither-io-mod-chrome-store.jpg"></div></br><div onclick="javascript:location.href=\'https://slithere.com/io-games-mods/\'"><img src="https://slithere.com/wp-content/uploads/moomoo-io-mod-download.jpg"></div>');
$('#buttonCard').append('<div class="menuButton" style="margin-top:10px" onclick="javascript:location.href=\'http://slithere.com\'">SLITHERE.COM</div>');
document.addEventListener("keydown", function(a) { // Press 'z' to start auto jump
    if (a.keyCode == 67) {
setInterval(enterGame(0), 10000);
    }
}, false);


//Quick Account//

document.addEventListener("keydown", function(a) { // Press 'z' to create account
    if (a.keyCode == 90) {
document.getElementById("accName").value= Math.random().toString(36).substring(7);
document.getElementById("accEmail").value= Math.random().toString(36).substring(7) + "@mail.com";
document.getElementById("accPass").value= Math.random().toString(36).substring(7);
setTimeout(registerAcc(0), 1000);
    }
}, false);


document.addEventListener("keydown", function(a) { // Press 'x' to log out
    if (a.keyCode == 88) {
setTimeout(logoutAcc(0), 1000);
    }
}, false);

//Aimbot

function gA(a, d){
	return {
		x: Math.cos(a) * d,
		y: Math.sin(a) * d
	};
}
function pyt(e, f){
	return Math.atan2(Math.sin(e-f), Math.cos(e-f));
}
function tryJSONP(e){
	var a;
	try {
		a = JSON.parse(e);
	} catch(e) {}
	return a;
}
function disAng(x,y){
	var t = Math.PI * 2,
		a = (x - y) % t,
		b = (y - x) % t;
	return Math.abs(a < b ? -a : b);
}

var dt = {
	parseSend: function(e){
		var w = JSON.parse(e),
			t = w[0],
			a = w[1];
		if(t == "a") return e;
		console.log("send", w);
		switch(t){
			case "2":
				console.log("\"2\"", a);
				if(a[0] == 1){
					return "no-send--";
				}
				break;
			case "1":
				if(a[0] === null) break;
				a[0] = (function(){
					var b = a[0];
					dt.plr.rot = b;
					b = (dt.d.rot !== null && dt.enabled) ? dt.d.rot : b;
					return b;
				}());
				break;
			default:
				console.log("%cunknown: " + e, "color: green;");
		}
		return JSON.stringify([t, a]);
	},
	parseMessage: function(e){
		var w = JSON.parse(e),
			t = w[0],
			a = w[1];
		dt.ping ++;
		console.log("get", t, a);
		switch(t){
			case "3":
				// this is time left for decrease in border
				break;
			case "0":
				var b = a;
				let c = b[0], d = [], obs = Object.assign({}, dt.obs);
				while(c.length > 0){
					d.push(c.splice(0, 7));
				}
				let f = d.find(function(e){return e[0] == dt.id;}), tx = 0, ty = 0, id = dt.id;
				if(!e) e = f;
				if(d.length == 1){
					dt.id = d[0][0];
					dt.d.rot = null;
				}
				try{
					f[1] += ((dt.obs[f[0]][1] - obs[f[0]][1])/(dt.obs.timestamp - obs.timestamp))*(dt.pingR / 1e3);
					f[2] += ((dt.obs[f[0]][2] - obs[f[0]][2])/(dt.obs.timestamp - obs.timestamp))*(dt.pingR / 1e3);
				} catch(e){}
				if(dt.cursorE){
					for(let i of d){
						if(f == i || !f) continue;
						let a = Math.atan2(i[2] - f[2], i[1] - f[1]), b = Math.atan2(ty, tx), c = Math.atan2(dt.cursor.y, dt.cursor.x) || 0;
						if(disAng(a, c) < disAng(b, c) || !b){
							tx = i[1] - f[1];
							ty = i[2] - f[2];
							id = i[0];
						}
						dt.obs[i[0]] = i;
					}
					dt.obs.timestamp = dt.lT;
				} else {
					for(let i of d){
						if(f == i || !f) continue;
						let a = pyt(i[1] - f[1], i[2] - f[2]), b = pyt(tx, ty);
						if(Math.abs(a) < Math.abs(b) || !b){
							tx = i[1] - f[1];
							ty = i[2] - f[2];
							id = i[0];
						}
						dt.obs[i[0]] = i;
					}
					dt.obs.timestamp = dt.lT;
				}
				if(dt.obs[id] && obs[id] && d.length > 1 && dt.started){
					dt.d.rot = Math.atan2(ty + ((dt.obs[id][2] - obs[id][2])/(dt.obs.timestamp - obs.timestamp))*((dt.pingR / 1e3)*pyt(tx,tx)/100),
										  tx + ((dt.obs[id][1] - obs[id][1])/(dt.obs.timestamp - obs.timestamp))*((dt.pingR / 1e3)*pyt(tx,tx)/100)); // string in bullet speed here
					console.log("aim", dt.d.rot);
				} else {
					dt.d.rot = null;
				}
				let {x, y} = gA(dt.d.rot, (innerHeight < innerWidth ? innerHeight : innerWidth)/3);
				if(dt.d.rot){
					dt.vHit.style.left = x + innerWidth/2 + "px";
					dt.vHit.style.top = y + innerHeight/2 +"px";
					dt.vHit.style.opacity = dt.enabled ? 1 : .5;
				} else {
					dt.vHit.style.left = - 16 + "px";
					dt.vHit.style.top = - 16 +"px";
				}
				dt.lT = Date.now();
				break;
			case "8":
				if(a[0] == 0){
					dt.started = true;
				} else {
					dt.started = false;
				}
				break;
			case "17":
				console.log("BULLET");
				// work on to improve accracy
				break;
			default:
				console.log("%cunknown: " + e, "color: green;");
		}
		return e;
	},
	plr: {
		rot: null
	},
	d: {
		rot: null
	},
	key: [],
	obs: {
		timestamp: Date.now()
	},
	tg: 1,
	id: 1,
	enabled: true,
	cursorE: false,
	started: true,
	lT: Date.now(),
	pingR: 0,
	ping: 0,
	cursor: {
		x: null,
		y: null
	},
	vHit: (function(){
		var a = document.createElement("div");
		a.style = "position: fixed; width: 8px; height: 8px; background-color: red; top: -16px; left: -16px; box-shadow: #F00 0px 0px 8px 4px; border-radius: 4px;";
		document.body.appendChild(a);
		return a;
	}()),
	clT: 0
};
window.dt = dt;

(function() {
	WebSocket.prototype.rSend = WebSocket.prototype.send;
	WebSocket.prototype.send = function(e){
		var b = e;
		if(!window.socket || window.socket!=this){
			window.socket = this;
			this.addEventListener("message", function(e){
				dt.parseMessage(e.data);
			});
		}
		b = dt.parseSend(e);
		if(b == "no-send--") return;
		this.rSend(b);
	};



	addEventListener("keydown", function(e){
		if(e.keyCode == 69){
			dt.enabled = !dt.enabled;
			document.title = "Foes.io - Hax " + (dt.enabled ? "on" : "off");
			clearTimeout(dt.clT);
			dt.clT = setTimeout(function(){
				document.title = "Foes.io";
			}, 3e3);
		}
		if(e.keyCode == 82){
			dt.cursorE = !dt.cursorE;
			document.title = "Foes.io - Cursor " + (dt.cursorE ? "on" : "off");
			clearTimeout(dt.clT);
			dt.clT = setTimeout(function(){
				document.title = "Foes.io";
			}, 3e3);
		}
	});
	addEventListener("mousemove", function(e){
		dt.cursor.x = e.clientX;
		dt.cursor.y = e.clientY;
	});
	setInterval(function(){
		dt.pingR = dt.ping;
		dt.ping = 0;
	}, 1e3);
})();
console.log("FinishLoad - Aimbot");

//Modded UI

$("#shareContainer").remove()
$("#linksContainer").remove()
$("#loadingContainer").remove()
$("#createContainer").remove()
$("#cdm-zone-end").remove()

let foesVer = $('#linksContainer a').html(),
    removeSelectors = ['#adCard'],
    css = '#createContainer { display: none!important; }',
    head = document.head || document.getElementsByTagName('head')[0],
    style = document.createElement('style');

style.type = 'text/css';
if (style.styleSheet){
    style.styleSheet.cssText = css;
} else {
    style.appendChild(document.createTextNode(css));
}

for ( let i = 0; i < removeSelectors.length; i++ ) {
    $(removeSelectors[i]).remove();
}

head.appendChild(style);
$('#linksContainer').html('<a href="./docs/versions.txt" target="_blank">' + foesVer + '</a>');

//Autospawn

document.addEventListener("keydown", function(a) { // Press 'z' to start auto jump
    if (a.keyCode == 67) {
setInterval(enterGame(0), 10000);
    }
}, false);


//Quick Account//

document.addEventListener("keydown", function(a) { // Press 'z' to create account
    if (a.keyCode == 90) {
document.getElementById("accName").value= Math.random().toString(36).substring(7);
document.getElementById("accEmail").value= Math.random().toString(36).substring(7) + "@mail.com";
document.getElementById("accPass").value= Math.random().toString(36).substring(7);
setTimeout(registerAcc(0), 1000);
    }
}, false);


document.addEventListener("keydown", function(a) { // Press 'x' to log out
    if (a.keyCode == 88) {
setTimeout(logoutAcc(0), 1000);
    }
}, false);

//Aimbot

function gA(a, d){
	return {
		x: Math.cos(a) * d,
		y: Math.sin(a) * d
	};
}
function pyt(e, f){
	return Math.atan2(Math.sin(e-f), Math.cos(e-f));
}
function tryJSONP(e){
	var a;
	try {
		a = JSON.parse(e);
	} catch(e) {}
	return a;
}
function disAng(x,y){
	var t = Math.PI * 2,
		a = (x - y) % t,
		b = (y - x) % t;
	return Math.abs(a < b ? -a : b);
}

var dt = {
	parseSend: function(e){
		var w = JSON.parse(e),
			t = w[0],
			a = w[1];
		if(t == "a") return e;
		console.log("send", w);
		switch(t){
			case "2":
				console.log("\"2\"", a);
				if(a[0] == 1){
					return "no-send--";
				}
				break;
			case "1":
				if(a[0] === null) break;
				a[0] = (function(){
					var b = a[0];
					dt.plr.rot = b;
					b = (dt.d.rot !== null && dt.enabled) ? dt.d.rot : b;
					return b;
				}());
				break;
			default:
				console.log("%cunknown: " + e, "color: green;");
		}
		return JSON.stringify([t, a]);
	},
	parseMessage: function(e){
		var w = JSON.parse(e),
			t = w[0],
			a = w[1];
		dt.ping ++;
		console.log("get", t, a);
		switch(t){
			case "3":
				//
				break;
			case "0":
				var b = a;
				let c = b[0], d = [], obs = Object.assign({}, dt.obs);
				while(c.length > 0){
					d.push(c.splice(0, 8));
				}
				let f = d.find(function(e){return e[0] == dt.id;}), tx = 0, ty = 0, id = dt.id;
				if(!e) e = f;
				if(d.length == 1){
					dt.id = d[0][0];
					dt.d.rot = null;
				}
				try{
					f[1] += ((dt.obs[f[0]][1] - obs[f[0]][1])/(dt.obs.timestamp - obs.timestamp))*(dt.pingR / 1e3);
					f[2] += ((dt.obs[f[0]][2] - obs[f[0]][2])/(dt.obs.timestamp - obs.timestamp))*(dt.pingR / 1e3);
				} catch(e){}
				if(dt.cursorE){
					for(let i of d){
						if(f == i || !f) continue;
						let a = Math.atan2(i[2] - f[2], i[1] - f[1]), b = Math.atan2(ty, tx), c = Math.atan2(dt.cursor.y, dt.cursor.x) || 0;
						if(disAng(a, c) < disAng(b, c) || !b){
							tx = i[1] - f[1];
							ty = i[2] - f[2];
							id = i[0];
						}
						dt.obs[i[0]] = i;
					}
					dt.obs.timestamp = dt.lT;
				} else {
					for(let i of d){
						if(f == i || !f) continue;
						let a = pyt(i[1] - f[1], i[2] - f[2]), b = pyt(tx, ty);
						if(Math.abs(a) < Math.abs(b) || !b){
							tx = i[1] - f[1];
							ty = i[2] - f[2];
							id = i[0];
						}
						dt.obs[i[0]] = i;
					}
					dt.obs.timestamp = dt.lT;
				}
				if(dt.obs[id] && obs[id] && d.length > 1 && dt.started){
					dt.d.rot = Math.atan2(ty + ((dt.obs[id][2] - obs[id][2])/(dt.obs.timestamp - obs.timestamp))*((dt.pingR / 1e3)*pyt(tx,tx)/100),
										  tx + ((dt.obs[id][1] - obs[id][1])/(dt.obs.timestamp - obs.timestamp))*((dt.pingR / 1e3)*pyt(tx,tx)/100)); //
					console.log("aim", dt.d.rot);
				} else {
					dt.d.rot = null;
				}
				let {x, y} = gA(dt.d.rot, (innerHeight < innerWidth ? innerHeight : innerWidth)/3);
				if(dt.d.rot){
					dt.vHit.style.left = x + innerWidth/2 + "px";
					dt.vHit.style.top = y + innerHeight/2 +"px";
					dt.vHit.style.opacity = dt.enabled ? 1 : .5;
				} else {
					dt.vHit.style.left = - 16 + "px";
					dt.vHit.style.top = - 16 +"px";
				}
				dt.lT = Date.now();
				break;
			case "8":
				if(a[0] == 0){
					dt.started = true;
				} else {
					dt.started = false;
				}
				break;
			case "17":
				console.log("BULLET");
				//
				break;
			default:
				console.log("%cunknown: " + e, "color: green;");
		}
		return e;
	},
	plr: {
		rot: null
	},
	d: {
		rot: null
	},
	key: [],
	obs: {
		timestamp: Date.now()
	},
	tg: 1,
	id: 1,
	enabled: true,
	cursorE: false,
	started: true,
	lT: Date.now(),
	pingR: 0,
	ping: 0,
	cursor: {
		x: null,
		y: null
	},
	vHit: (function(){
		var a = document.createElement("div");
		a.style = "position: fixed; width: 8px; height: 8px; background-color: blue; top: -16px; left: -16px; box-shadow: #F00 0px 0px 8px 4px; border-radius: 4px;";
		document.body.appendChild(a);
		return a;
	}()),
	clT: 0
};
window.dt = dt;
