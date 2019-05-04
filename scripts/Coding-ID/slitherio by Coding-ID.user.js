// ==UserScript==
// @name         slitherio by Coding-ID
// @namespace    slitherio.Coding-ID
// @version      0.1.10
// @description  slither.io MOD
// @author       Coding-ID
// @match        http://slither.io/*
// @run-at       document-body
// @grant        none
// ==/UserScript==
// Source: https://b5070c4d82a265aab81f03518e5114824045d007.googledrive.com/host/0B_z-TSx7UU0nV2VsTVJVTkdrYzQ/slither.js
! function(e) {
	function t() {
		c(), n("position-hud", "nsi", v + "right: 30; bottom: 120px;"), n("ip-hud", "nsi", v + "right: 30; bottom: 150px;"), n("fps-hud", "nsi", v + "right: 30; bottom: 170px;"), m = document.getElementById("position-hud"), h = document.getElementById("ip-hud"), b = document.getElementById("fps-hud"), /firefox/i.test(navigator.userAgent) ? document.addEventListener("DOMMouseScroll", o, !1) : document.body.onmousewheel = o, e.console && (e.console.logOld = console.log, e.console.log = l), i(), a(), r(), u()
	}

	function n(e, t, n) {
		var o = document.createElement("div");
		e && (o.id = e), t && (o.className = t), n && (o.style = n), document.body.appendChild(o)
	}

	function o(t) {
		e.gsc && (e.gsc *= Math.pow(.9, t.wheelDelta / -120 || t.detail / 2 || 0))
	}

	function l(t) {
		e.console.logOld(t), -1 != t.indexOf("FPS") && (g = t)
	}

	function i() {
		var t = document.getElementById("login");
		if (t) {
			var n = document.createElement("div");
			n.style.width = "300px", n.style.color = "#FFF", n.style.fontFamily = "'Lucida Sans Unicode', 'Lucida Grande', sans-serif", n.style.fontSize = "14px", n.style.textAlign = "center", n.style.opacity = "0.5", n.style.margin = "0 auto", n.style.padding = "10px 0", n.textContent = "F**K YOU MISTIK! YOU STOLE MY CODE!", t.appendChild(n);
			var o = document.createElement("div");
			o.style.width = "260px", o.style.color = "#8058D0", o.style.backgroundColor = "#1e262e", o.style.borderRadius = "29px", o.style.fontFamily = "'Lucida Sans Unicode', 'Lucida Grande', sans-serif", o.style.fontSize = "14px", o.style.textAlign = "center", o.style.margin = "0 auto 100px auto", o.style.padding = "10px 14px", o.innerHTML = "MOD: <strong>SLITio by Coding-ID</strong> | <strong>" + p + "</strong>", t.appendChild(o);
			var n = document.createElement("div");
			n.style.color = "#8058D0", n.style.backgroundColor = "#4C447C", n.style.borderRadius = "29px", n.style.margin = "10 auto", n.style.padding = "8px", o.appendChild(n);
			var l = document.createElement("input");
			l.id = "server-ip", l.type = "text", l.placeholder = "Server IP", l.style.height = "24px", l.style.display = "inline-block", l.style.background = "none", l.style.color = "#e0e0ff", l.style.border = "none", l.style.outline = "none", n.appendChild(l);
			var a = document.createElement("input");
			a.id = "connect-btn", a.type = "button", a.value = "Play", a.style.height = "24px", a.style.display = "inline-block", a.style.borderRadius = "12px", a.style.color = "#FFF", a.style.backgroundColor = "#56ac81", a.style.border = "none", a.style.outline = "none", a.style.cursor = "pointer", a.style.padding = "0 20px", n.appendChild(a);
			var n = document.createElement("div");
			n.style.backgroundColor = "#A5A5A5", n.style.borderRadius = "29px", n.style.margin = "10 auto", n.style.padding = "8px", o.appendChild(n);
			var d = document.createElement("select");
			d.id = "select-graph", d.style.background = "none", d.style.border = "none", d.style.outline = "none", n.appendChild(d);
			var r = document.createElement("option");
			r.value = "2", r.text = "Graphics: optimized", d.appendChild(r);
			var r = document.createElement("option");
			r.value = "1", r.text = "Graphics: low", d.appendChild(r), o.innerHTML += '<a href="https://www.facebook.com/OfficialCodingTeam" target="_blank" style="color: #FFF; opacity: 0.35;">MY Facebook</a> | ', o.innerHTML += '<a href="http://mintascript.blogspot.com/" target="_blank" style="color: #FFF; opacity: 0.35;">MintaScript</a>', C = document.getElementById("server-ip");
			var c = document.getElementById("select-graph");
			c.selectedIndex = 1 == y ? 1 : 0, c.onchange = function() {
				var t = c.value;
				e.console.logOld(t), t && (y = t)
			};
			var u = document.getElementById("connect-btn");
			u.onclick = s
		} else setTimeout(i, 100)
	}

	function a() {
		e.lbh ? (e.lbh.textContent = "MOD: SLITio by Coding-ID", e.lbh.style.fontSize = "20px") : setTimeout(a, 100)
	}

	function d() {
		return e.connecting && 10 != F ? (F++, void setTimeout(d, 1e3)) : (e.forcing = !1, void(F = 0))
	}

	function s() {
		if (0 != C.value.length && e.connect) {
			e.forcing = !0, e.bso || (e.bso = {});
			var t = C.value.trim().split(":");
			e.bso.ip = t[0], e.bso.po = t[1], e.connect(), setTimeout(d, 1e3)
		}
	}

	function r() {
		e.render_mode && e.render_mode != y && (e.render_mode = y), e.high_quality && (e.high_quality = !1), e.gla && 0 != e.gla && (e.gla = 0)
	}

	function c() {
		x && f || (e.ii && !x && (e.ii.src = "", e.ii.onload = null, e.ii = null, e.bgi2 && (e.bgi2 = null), x = !0), e.ggbg && (e.ggbg = !1), e.gbgi && !f && (e.gbgi.src = "", e.gbgi.onload = null, e.gbgi = null, e.gbgmc && (e.gbgmc = null), f = !0), setTimeout(c, 40))
	}

	function u() {
		r(), e.playing && (m && (m.textContent = "X: " + (~~e.view_xx || 0) + " Y: " + (~~e.view_yy || 0)), b && g && (b.textContent = g), C && e.bso && E != e.bso.ip + ":" + e.bso.po && (E = e.bso.ip + ":" + e.bso.po, C.value = E, h && (h.textContent = "IP: " + E))), setTimeout(u, 1e3)
	}
	var p = "v0.1.10",
		y = 2,
		g = null,
		m = null,
		h = null,
		b = null,
		v = "color: #FFF; font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; font-size: 14px; position: fixed; opacity: 0.35; z-index: 7;",
		x = !1,
		f = !1,
		C = null,
		E = null,
		F = 0;
	t()
}(window);