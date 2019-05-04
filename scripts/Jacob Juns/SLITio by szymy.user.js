
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
29
30
31
32
33
34
35
36
37
38
39
40
41
42
43
44
45
46
47
48
49
50
51
52
53
54
55
56
57
58
59
60
61
62
63
64
65
66
67
68
69
70
71
72
73
74
75
76
77
78
79
80
81
82
83
84
85
86
87
88
89
90
91
92
93
94
95
96
97
98
99
100
101
102
103
104
105
106
107
108
109
110
111
112
113
114
115
116
117
118
119
120
121
122
123
124
125
126
127
128
129
130
131
132
133
134
135
136
137
138
139
140
141
142
143
144
145
146
147
148
149
150
151
152
153
154
155
156
157
158
159
160
161
162
163
164
165
166
167
168
169
170
171
172
173
174
175
176
177
178
179
180
181
182
183
184
185
186
187
188
189
190
191
192
193
194
195
196
197
198
199
200
201
202
203
204
205
206
207
208
209
210
211
212
213
214
215
216
217
218
219
220
221
222
223
224
225
226
227
228
229
230
231
232
233
234
235
236
237
238
239
240
241
242
243
244
245
246
247
248
249
250
251
252
253
254
255
256
257
258
259
260
261
262
263
264
265
266
267
268
269
270
271
272
273
274
275
276
277
278
279
280
281
282
283
284
285
286
287
288
289
290
291
292
293
294
295
296
297
298
299
300
301
302
303
304
305
306
307
308
309
310
311
312
313
314
315
316
317
318
319
320
321
322
323
324
325
326
327
328
329
330
331
332
333
334
335
336
337
338
339
340
341
342
343
344
345
346
347
348
349
350
351
352
353
354
355
356
357
358
359
// ==UserScript==
// @name         SLITio by szymy
// @namespace    slitio.szymy
// @version      0.1.14
// @description  slither.io MOD
// @author       szymy
// @match        http://slither.io/*
// @run-at       document-body
// @grant        none
// ==/UserScript==

// Source: http://ogario.ovh/download/SLITio.user.js

(function(w) {
    var modVersion = "v0.1.14",
        renderMode = 2, // 3 - normal, 2 - optimized, 1 - simple (mobile)
        normalMode = false,
        gameFPS = null,
        positionHUD = null,
        ipHUD = null,
        fpsHUD = null,
        styleHUD = "color: #FFF; font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; font-size: 14px; position: fixed; opacity: 0.35; z-index: 7;",
        inpNick = null,
        currentIP = null,
        retry = 0,
        bgImage = null;
    function init() {
        // Append DIVs
        appendDiv("position-hud", "nsi", styleHUD + "right: 30; bottom: 120px;");
        appendDiv("ip-hud", "nsi", styleHUD + "right: 30; bottom: 150px;");
        appendDiv("fps-hud", "nsi", styleHUD + "right: 30; bottom: 170px;");
        positionHUD = document.getElementById("position-hud");
        ipHUD = document.getElementById("ip-hud");
        fpsHUD = document.getElementById("fps-hud");
        // Add zoom
        if (/firefox/i.test(navigator.userAgent)) {
            document.addEventListener("DOMMouseScroll", zoom, false);
        } else {
            document.body.onmousewheel = zoom;
        }
        // Quick resp (ESC)
        w.onkeydown = function(e) {
            if (e.keyCode == 27) {
                forceConnect();
            }
        }
        // Hijack console log
        /*
        if (w.console) {
            w.console.logOld = console.log;
            w.console.log = getConsoleLog;
        }
        */
        // Set menu
        setMenu();
        // Set leaderboard
        setLeaderboard();
        // Set graphics
        setGraphics();
        // Update loop
        updateLoop();
        // Show FPS
        showFPS();
    }
    // Append DIV
    function appendDiv(id, className, style) {
        var div = document.createElement("div");
        if (id) {
            div.id = id;
        }
        if (className) {
            div.className = className;
        }
        if (style) {
            div.style = style;
        }
        document.body.appendChild(div);
    }
    // Zoom
    function zoom(e) {
        if (!w.gsc) {
            return;
        }
        w.gsc *= Math.pow(0.9, e.wheelDelta / -120 || e.detail / 2 || 0);
    }
    // Get console log
    function getConsoleLog(log) {
        //w.console.logOld(log);
        if (log.indexOf("FPS") != -1) {
            gameFPS = log;
        }
    }
    // Set menu
    function setMenu() {
        var login = document.getElementById("login");
        if (login) {
            // Load settings
            loadSettings();
            // Message
            var div = document.createElement("div");
            div.style.width = "300px";
            div.style.color = "#FFF";
            div.style.fontFamily = "'Lucida Sans Unicode', 'Lucida Grande', sans-serif";
            div.style.fontSize = "14px";
            div.style.textAlign = "center";
            div.style.opacity = "0.5";
            div.style.margin = "0 auto";
            div.style.padding = "10px 0";
            div.textContent = "F**K YOU MISTIK! YOU STOLE MY CODE!";
            login.appendChild(div);
            // Menu container
            var sltMenu = document.createElement("div");
            sltMenu.style.width = "260px";
            sltMenu.style.color = "#8058D0";
            sltMenu.style.backgroundColor = "#1e262e";
            sltMenu.style.borderRadius = "29px";
            sltMenu.style.fontFamily = "'Lucida Sans Unicode', 'Lucida Grande', sans-serif";
            sltMenu.style.fontSize = "14px";
            sltMenu.style.textAlign = "center";
            sltMenu.style.margin = "0 auto 100px auto";
            sltMenu.style.padding = "10px 14px";
            sltMenu.innerHTML = "MOD: <strong>SLITio by szymy</strong> | <strong>" + modVersion + "</strong>";
            login.appendChild(sltMenu);
            // IP input container
            var div = document.createElement("div");
            div.style.color = "#8058D0";
            div.style.backgroundColor = "#4C447C";
            div.style.borderRadius = "29px";
            div.style.margin = "10 auto";
            div.style.padding = "8px";
            sltMenu.appendChild(div);
            // IP input
            var input = document.createElement("input");
            input.id = "server-ip";
            input.type = "text";
            input.placeholder = "Server IP";
            input.style.height = "24px";
            input.style.display = "inline-block";
            input.style.background = "none";
            input.style.color = "#e0e0ff";
            input.style.border = "none";
            input.style.outline = "none";
            div.appendChild(input);
            // Connect (play) button
            var button = document.createElement("input");
            button.id = "connect-btn";
            button.type = "button";
            button.value = "Play";
            button.style.height = "24px";
            button.style.display = "inline-block";
            button.style.borderRadius = "12px";
            button.style.color = "#FFF";
            button.style.backgroundColor = "#56ac81";
            button.style.border = "none";
            button.style.outline = "none";
            button.style.cursor = "pointer";
            button.style.padding = "0 20px";
            div.appendChild(button);
            // Select graph container
            var div = document.createElement("div");
            div.style.backgroundColor = "#A5A5A5";
            div.style.borderRadius = "29px";
            div.style.margin = "10 auto";
            div.style.padding = "8px";
            sltMenu.appendChild(div);
            // Select graph
            var select = document.createElement("select");
            select.id = "select-graph";
            select.style.background = "none";
            select.style.border = "none";
            select.style.outline = "none";
            div.appendChild(select);
            var option = document.createElement("option");
            option.value = "3";
            option.text = "Graphics: normal";
            select.appendChild(option);
            var option = document.createElement("option");
            option.value = "2";
            option.text = "Graphics: optimized";
            select.appendChild(option);
            var option = document.createElement("option");
            option.value = "1";
            option.text = "Graphics: low";
            select.appendChild(option);
            // Menu footer
            sltMenu.innerHTML += '<a href="https://www.youtube.com/channel/UCaWiPNJWnhzYDrBQoXokn6w" target="_blank" style="color: #FFF; opacity: 0.35;">YT Channel</a> | ';
            sltMenu.innerHTML += '<a href="http://ogario.ovh" target="_blank" style="color: #FFF; opacity: 0.35;">ogario.ovh</a>';
            // Get IP input
            inpIP = document.getElementById("server-ip");
            // Get nick
            var nick = document.getElementById("nick");
            nick.addEventListener("input", getNick, false);
            // Force connect
            var connectBtn = document.getElementById("connect-btn");
            connectBtn.onclick = forceConnect;
            // Set graphic mode
            var selectGraph = document.getElementById("select-graph");
            if (renderMode == 1) {
                selectGraph.selectedIndex = 2;
            } else if (renderMode == 2) {
                selectGraph.selectedIndex = 1;
            } else {
                selectGraph.selectedIndex = 0;
                normalMode = true;
            }
            selectGraph.onchange = function() {
                var mode = selectGraph.value;
                if (mode) {
                    renderMode = mode;
                    localStorage.setItem("rendermode", renderMode);
                }
            };
            resizeView();
        } else {
            setTimeout(setMenu, 100);
        }
    }
    // Load settings
    function loadSettings() {
        if (w.localStorage.getItem("nick") != null) {
            var nick = w.localStorage.getItem("nick");
            document.getElementById("nick").value = nick;
        }
        if (w.localStorage.getItem("rendermode") != null) {
            var mode = parseInt(w.localStorage.getItem("rendermode"));
            if (mode >= 1 && mode <= 3) {
                renderMode = mode;
            }
        }
    }
    // Get nick
    function getNick() {
        var nick = document.getElementById("nick").value;
        w.localStorage.setItem("nick", nick);
    }
    // Connection status
    function connectionStatus() {
        if (!w.connecting || retry == 10) {
            w.forcing = false;
            retry = 0;
            return;
        }
        retry++;
        setTimeout(connectionStatus, 1000);
    }
    // Force connect
    function forceConnect() {
        if (inpIP.value.length == 0 || !w.connect) {
            return;
        }
        w.forcing = true;
        if (!w.bso) {
            w.bso = {};
        }
        var srv = inpIP.value.trim().split(":");
        w.bso.ip = srv[0];
        w.bso.po = srv[1];
        w.connect();
        setTimeout(connectionStatus, 1000);
    }
    // Resize view
    function resizeView() {
        if (w.resize) {
            w.lww = 0; // Reset width (force resize)
            w.wsu = 0; // Clear ad space
            w.resize();
            var wh = Math.ceil(w.innerHeight);
            if (wh < 800) {
                var login = document.getElementById("login");
                w.lgbsc = wh / 800;
                login.style.top = - (Math.round(wh * (1 - w.lgbsc) * 1E5) / 1E5) + "px";
                if (w.trf) {
                    w.trf(login, "scale(" + w.lgbsc + "," + w.lgbsc + ")");
                }
            }
        } else {
            setTimeout(resizeView, 100);
        }
    }
    // Set leaderboard
    function setLeaderboard() {
        if (w.lbh) {
            w.lbh.textContent = "MOD: SLITio by szymy";
            w.lbh.style.fontSize = "20px";
        } else {
            setTimeout(setLeaderboard, 100);
        }
    }
    // Set normal mode
    function setNormalMode() {
        normalMode = true;
        w.ggbg = true;
        if (!w.bgp2 && bgImage) {
            w.bgp2 = bgImage;
        }
        w.render_mode = 2;
    }
    // Set graphics
    function setGraphics() {
        if (renderMode == 3) {
            if (!normalMode) {
                setNormalMode();
            }
            return;
        }
        if (normalMode) {
            normalMode = false;
        }
        if (w.want_quality && w.want_quality != 0) {
            w.want_quality = 0;
            w.localStorage.setItem("qual", "0");
            w.grqi.src = "/s/lowquality.png";
        }
        if (w.ggbg && w.gbgmc) {
            w.ggbg = false;
        }
        if (w.bgp2) {
            bgImage = w.bgp2;
            w.bgp2 = null;
        }
        if (w.high_quality) {
            w.high_quality = false;
        }
        if (w.gla && w.gla != 0) {
            w.gla = 0;
        }
        if (w.render_mode && w.render_mode != renderMode) {
            w.render_mode = renderMode;
        }
    }
    // Show FPS
    function showFPS() {
        if (w.playing && fpsHUD && w.fps && w.lrd_mtm) {
            if (Date.now() - w.lrd_mtm > 970) {
                fpsHUD.textContent = "FPS: " + w.fps;
            }
        }
        setTimeout(showFPS, 30);
    }
    // Update loop
    function updateLoop() {
        setGraphics();
        if (w.playing) {
            if (positionHUD) {
                positionHUD.textContent = "X: " + (~~w.view_xx || 0) + " Y: " + (~~w.view_yy || 0);
            }
            if (inpIP && w.bso && currentIP != w.bso.ip + ":" + w.bso.po) {
                currentIP = w.bso.ip + ":" + w.bso.po;
                inpIP.value = currentIP;
                if (ipHUD) {
                    ipHUD.textContent = "IP: " + currentIP;
                }
            }
        }
        setTimeout(updateLoop, 1000);
    }
    // Init
    init();
})(window);