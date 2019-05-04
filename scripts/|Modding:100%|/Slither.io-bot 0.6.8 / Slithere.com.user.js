
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
360
361
362
363
364
365
366
367
368
369
370
371
372
373
374
375
376
377
378
379
380
381
382
383
384
385
386
387
388
389
390
391
392
393
394
395
396
397
398
399
400
401
402
403
404
405
406
407
408
409
410
411
412
413
414
415
416
417
418
419
420
421
422
423
424
425
426
427
428
429
430
431
432
433
434
435
436
437
438
439
440
441
442
443
444
445
446
447
448
449
450
451
452
453
454
455
456
457
458
459
460
461
462
463
464
465
466
467
468
469
470
471
472
473
474
475
476
477
478
479
480
481
482
483
484
485
486
487
488
489
490
491
492
493
494
495
496
497
498
499
500
501
502
503
504
505
506
507
508
509
510
511
512
513
514
515
516
517
518
519
520
521
522
523
524
525
526
527
528
529
530
531
532
533
534
535
536
537
538
539
540
541
542
543
544
545
546
547
548
549
550
551
552
553
554
555
556
557
558
559
560
561
562
563
564
565
566
567
568
569
570
571
572
573
574
575
576
577
578
579
580
581
582
583
584
585
586
587
588
589
590
591
592
593
594
595
596
597
598
599
600
601
602
603
604
605
606
607
608
609
610
611
612
613
614
615
616
617
618
619
620
621
622
623
624
625
626
627
628
629
630
631
632
633
634
635
636
637
638
639
640
641
642
643
644
645
646
647
648
649
650
651
652
653
654
655
656
657
658
659
660
661
662
663
664
665
666
667
668
669
670
671
672
673
674
675
676
677
678
679
680
681
682
683
684
685
686
687
688
689
690
691
692
693
694
695
696
697
698
699
700
701
702
703
704
705
706
707
708
709
710
711
712
713
714
715
716
717
718
719
720
721
722
723
724
725
726
727
728
729
730
731
732
733
734
735
736
737
// ==UserScript==
// @name         Slither.io-bot 0.6.8 / Slithere.com
// @namespace    http://slither.io/
// @version      0.6.80
// @description  Slither.io bot 0.6.8 / Slithere.com
// @author       Slithere.com and Thanks to Ermiya Eskandary & Théophile Cailliau
// @match        http://slither.io/
// @grant        none
// ==/UserScript==
// Functions needed for the bot
// Custom logging function - disabled by default
window.log = function () {
    if (window.logDebugging) {
        console.log.apply(console, arguments);
    }
};
// Appends divs to the page - used to display things on the screen
window.appendDiv = function (id, className, style) {
    // Create a div
    var div = document.createElement('div');
    // Check for id
    if (id) {
        // Set the id
        div.id = id;
    }
    // Check for class name
    if (className) {
        // Set the class name
        div.className = className;
    }
    // Check for css styles
    if (style) {
        // Set the css styles
        div.style = style;
    }
    // Append the div to the page
    document.body.appendChild(div);
};

// Saves username when you click on "Play" button
window.play_btn.btnf.addEventListener('click', function () {
    window.saveNick();
    window.loadPreference('autoRespawn', false);
});
// Save nickname when you press "Enter"
window.nick_holder.addEventListener('keypress', function (e) {
    if (e.keyCode == 13) {
        window.saveNick();
    }
});
// Save nickname
window.saveNick = function () {
    var nick = document.getElementById('nick').value;
    window.savePreference('savedNick', nick);
};

// Set fake mouse coordinates
window.setMouseCoordinates = function (x, y) {
    window.xm = x;
    window.ym = y;
};
// Coordinates relative to the center (snake position).
window.mouseRelativeToCenter = function (x, y) {
    var mapX = x - window.getWidth() / 2;
    var mapY = y - window.getHeight() / 2;
    return [mapX, mapY];
};
// Mouse coordinates to screen coordinates
window.mouseToScreen = function (x, y) {
    var screenX = x + (window.getWidth() / 2);
    var screenY = y + (window.getHeight() / 2);
    return [screenX, screenY];
};
// Screen to canvas coordinates
window.screenToCanvas = function (x, y) {
    var canvasX = window.csc * (x * window.canvasRatio[0]) - parseInt(window.mc.style.left);
    var canvasY = window.csc * (y * window.canvasRatio[1]) - parseInt(window.mc.style.top);
    return [canvasX, canvasY];
};
// Map to mouse coordinates
window.mapToMouse = function (x, y) {
    var mouseX = (x - window.getX()) * window.gsc;
    var mouseY = (y - window.getY()) * window.gsc;
    return [mouseX, mouseY];
};
// Canvas width
window.getWidth = function () {
    return window.ww;
};
// Canvas height
window.getHeight = function () {
    return window.hh;
};
// X coordinates on the screen
window.getX = function () {
    return window.snake.xx;
};
// Y coordinates on the screen
window.getY = function () {
    return window.snake.yy;
};
// Updates the relation between the screen and the canvas
window.onresize = function () {
    window.resize();
    // Canvas different size from the screen (often bigger). Gives a ratio so we can convert
    window.canvasRatio = [window.mc.width / window.getWidth(), window.mc.height / window.getHeight()];
};
// Lets you zoom in and out using the mouse wheel
window.setZoom = function (e) {
    // Scaling ratio
    if (window.gsc) {
        window.gsc *= Math.pow(0.9, e.wheelDelta / -120 || e.detail / 2 || 0);
    }
};
// FPS counter
window.framesPerSecond = {
    startTime: 0,
    frameNumber: 0,
    filterStrength: 40,
    lastLoop: 0,
    frameTime: 0,
    getFPS: function () {
        var thisLoop = performance.now();
        var thisFrameTime = thisLoop - this.lastLoop;
        this.frameTime += (thisFrameTime - this.frameTime) / this.filterStrength;
        this.lastLoop = thisLoop;
        return (1000 / this.frameTime).toFixed(0);
    }
};

// Set background - default is slither.io's own background
function setBackground(url) {
    url = typeof url !== 'undefined' ? url : '/s/bg45.jpg';
    window.ii.src = url;
}
// Reset zoom
window.resetZoom = function () {
    window.gsc = 0.9;
};
// Get scaling ratio
window.getScale = function () {
    return window.gsc;
};
// Snake length
window.getSnakeLength = function () {
    return (Math.floor(150 * (window.fpsls[window.snake.sct] + window.snake.fam / window.fmlts[window.snake.sct] - 1) - 50) / 10);
};
// Save the original slither.io onmousemove function so we can re enable it back later
window.mousemovelistener = window.onmousemove;

// Starts the bot
window.launchBot = function () {
    window.log('Starting Bot.');
    window.isBotRunning = true;
    // Removed the onmousemove listener so we can move the snake manually by setting coordinates
    window.onmousemove = function () {};
};
// Stops the bot
window.stopBot = function () {
    window.log('Stopping Bot.');
    // Re enable the original onmousemove function
    window.onmousemove = window.mousemovelistener;
    window.isBotRunning = false;
    // Clear the interval which starts the bot
};

// Connects the bot
window.connectBot = function () {
    if (!window.autoRespawn) return;
    // Stop the bot
    window.stopBot();
    window.log('Connecting...');
    // Connect the bot
    window.connect();
    // Check if bot can start
    window.botCanStart = setInterval(function () {
        if (window.playing) {
            window.launchBot();
            clearInterval(window.botCanStart);
        }
    }, 100);
};

// Save variable to local storage
window.savePreference = function (item, value) {
    window.localStorage.setItem(item, value);
};

// Load a variable from local storage
window.loadPreference = function (preference, defaultVar) {
    var savedItem = window.localStorage.getItem(preference);
    if (savedItem !== null) {
        if (savedItem == 'true') {
            window[preference] = true;
        } else if (savedItem == 'false') {
            window[preference] = false;
        } else {
            window[preference] = savedItem;
        }
        window.log('Setting found for ' + preference + ': ' + window[preference]);
    } else {
        window[preference] = defaultVar;
        window.log('No setting found for ' + preference + '. Used default: ' + window[preference]);
    }
    return window[preference];
};

// Save the original slither.io onkeydown function so we can add stuff to it
document.oldKeyDown = document.onkeydown;
// Re write the function with our function
document.onkeydown = function (e) {
    // Original slither.io onkeydown function + whatever is under it
    document.oldKeyDown(e);
    if (document.activeElement.parentElement !== window.nick_holder) {
        // Letter `T` to toggle bot
        if (e.keyCode === 84) {
            if (window.isBotRunning) {
                window.stopBot();
                window.isBotEnabled = false;
            } else {
                window.launchBot(5);
                window.isBotEnabled = true;
            }
        }
        // Letter 'U' to toggle debugging (console)
        if (e.keyCode === 85) {
            window.logDebugging = !window.logDebugging;
            console.log('Log debugging set to: ' + window.logDebugging);
            window.savePreference('logDebugging', window.logDebugging);
        }
        // Letter 'Y' to toggle debugging (visual)
        if (e.keyCode === 89) {
            window.visualDebugging = !window.visualDebugging;
            console.log('Visual debugging set to: ' + window.visualDebugging);
            window.savePreference('visualDebugging', window.visualDebugging);
        }
        // Letter 'I' to toggle autorespawn
        if (e.keyCode === 73) {
            window.autoRespawn = !window.autoRespawn;
            console.log('Automatic Respawning set to: ' + window.autoRespawn);
            window.savePreference('autoRespawn', window.autoRespawn);
        }
        // Letter 'O' to change rendermode (visual)
        if (e.keyCode === 79) {
            window.mobileRender = !window.mobileRender;
            console.log('Mobile rendering set to: ' + window.mobileRender);
            window.savePreference('mobileRender', window.mobileRender);
            // Set render mode
            if (window.mobileRender) {
                setBackground('data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs');
                window.render_mode = 1;
            } else {
                setBackground();
                window.render_mode = 2;
            }
        }
        // Letter 'P' to toggle hunting Prey
        if (e.keyCode === 80) {
            window.huntPrey = !window.huntPrey;
            console.log('Prey hunting set to: ' + window.huntPrey);
            window.savePreference('huntPrey', window.huntPrey);
        }

        // Letter 'C' to toggle Collision detection / enemy avoidance
        if (e.keyCode === 67) {
            window.collisionDetection = !window.collisionDetection;
            console.log('collisionDetection set to: ' + window.collisionDetection);
            window.savePreference('collisionDetection', window.collisionDetection);
        }

        // Letter 'A' to increase collision detection radius
        if (e.keyCode === 65) {
            window.collisionRadiusMultiplier++;
            console.log('collisionRadiusMultiplier set to: ' + window.collisionRadiusMultiplier);
            window.savePreference('collisionRadiusMultiplier', window.collisionRadiusMultiplier);
        }

        // Letter 'S' to decrease collision detection radius
        if (e.keyCode === 83) {
            if (window.collisionRadiusMultiplier > 1) {
                window.collisionRadiusMultiplier--;
                console.log('collisionRadiusMultiplier set to: ' + window.collisionRadiusMultiplier);
                window.savePreference('collisionRadiusMultiplier', window.collisionRadiusMultiplier);
            }
        }

        // Letter 'D' to toggle defence mode
        if (e.keyCode === 68) {
            window.defence = !window.defence;
            console.log('Defence set to: ' + window.defence);
            window.savePreference('defence', window.defence);
        }
        // Letter 'Z' to reset zoom
        if (e.keyCode === 90) {
            window.resetZoom();
        }
        // Letter 'Q' to quit to main menu
        if (e.keyCode == 81) {
            window.autoRespawn = false;
            window.quit();
        }
    }
};
// Snake width
window.getSnakeWidth = function () {
    return window.snake.sc * 15 * window.getScale();
};
// Sorting function for food, from property 'distance'
window.sortFood = function (a, b) {
    // a.sz & b.sz - size
    // Divide distance by size so bigger food is prioritised over smaller food
    return a.distance / a.sz - b.distance / b.sz;
};
// Sorting function for prey, from property 'distance'
window.sortPrey = function (a, b) {
    return a.distance - b.distance;
};

// Quit to menu
window.quit = function () {
    if (window.playing && window.resetGame) {
        window.want_close_socket = true;
        window.dead_mtm = 0;
        if (window.play_btn) {
            window.play_btn.setEnabled(true);
        }
        window.resetGame();
    }
};

//Check if a point is between two vectors. The vectors have to we anticlockwise (sectorEnd on the left of sectorStart)
function isBetweenVectors(point, sectorStart, sectorEnd) {
    var center = [window.mc.height / 2, window.mc.width / 2];
    // Point coordinates relative to center
    var relPoint = {
        x: point.xx - center[0],
        y: point.yy - center[1]
    };

    return !areClockwise(sectorStart, relPoint) && areClockwise(sectorEnd, relPoint);
}

//Angles are given in radians. The overall angle (endAngle-startAngle) cannot be above Math.PI radians (180°).
function isInsideAngle(point, startAngle, endAngle) {
    // calculate normalized vectors from angle
    var startAngleVector = {
        x: Math.cos(startAngle),
        y: Math.sin(startAngle)
    };
    var endAngleVector = {
        x: Math.cos(endAngle),
        y: Math.sin(endAngle)
    };
    // Use isBetweenVectors to check if the point belongs to the angle
    return isBetweenVectors(point, startAngleVector, endAngleVector);
}

//Given two vectors, return a truthy/falsy value depending on their position relative to each other.
function areClockwise(vector1, vector2) {
    //Calculate the dot product.
    return -vector1.x * vector2.y + vector1.y * vector2.x > 0;
}

// Given an object (of which properties xx and yy are not null), return the object with an additional property 'distance'
window.getDistanceFromMe = function (point) {
    if (point === null) return null;
    point.distance = window.getDistance(window.getX(), window.getY(), point.xx, point.yy);
    return point;
};
// Get a distance from point (x1; y1) to point (x2; y2).
window.getDistance = function (x1, y1, x2, y2) {
    // Calculate the vector coordinates.
    var xDistance = (x1 - x2);
    var yDistance = (y1 - y2);
    // Get the absolute value of each coordinate
    xDistance = xDistance < 0 ? xDistance * -1 : xDistance;
    yDistance = yDistance < 0 ? yDistance * -1 : yDistance;
    //Add the coordinates of the vector to get a distance. Not the real distance, but reliable for distance comparison.
    var distance = xDistance + yDistance;
    // Real distance but not needed. Here for reference -
    // var distance = Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
    return distance;
};
// Checks to see if you are going to collide with anything in the collision detection radius
window.checkCollision = function (x, y, r) {
    if (!window.collisionDetection) return false;
    var circle1 = window.collisionScreenToCanvas({
        x: x,
        y: y,
        radius: r
    });
    if (window.visualDebugging) {
        window.drawDot(circle1.x, circle1.y, circle1.radius, 'blue', false);
    }
    var shortest_distance = Number.MAX_VALUE;
    var avoid = false;
    var circle2;

    for (var snake in window.snakes) {
        if (window.snakes[snake].nk != window.snake.nk) {
            for (y = window.snakes[snake].pts.length - 1; 0 <= y; y--) {
                if (!window.snakes[snake].pts[y].dying) {
                    var xx = window.snakes[snake].pts[y].xx + window.snakes[snake].fx;
                    var yy = window.snakes[snake].pts[y].yy + window.snakes[snake].fy;
                    circle2 = {
                        x: xx,
                        y: yy,
                        radius: 15 * window.snakes[snake].sc * window.getScale()
                    };
                    if (window.circleIntersect(circle1, window.collisionScreenToCanvas(circle2))) {
                        var distance = window.getDistance(window.getX(), window.getY(), xx, yy);
                        if (distance < shortest_distance) {
                            window.changeGoalCoords(circle2);
                            avoid = true;
                            shortest_distance = distance;
                        }
                    }
                }
            }
        }
    }
    return avoid;
};
// Screen to Canvas coordinate conversion - used for collision detection
window.collisionScreenToCanvas = function (circle) {
    var newCircle = window.mapToMouse(circle.x, circle.y);
    newCircle = window.mouseToScreen(newCircle[0], newCircle[1]);
    newCircle = window.screenToCanvas(newCircle[0], newCircle[1]);

    return {
        x: newCircle[0],
        y: newCircle[1],
        radius: circle.radius
    };
};
// Change direction
window.changeGoalCoords = function (circle1) {
    if ((circle1.x != window.collisionPoint.x && circle1.y != window.collisionPoint.y)) {
        window.collisionPoint = circle1;
        window.goalCoordinates = window.mapToMouse(window.snake.xx + (window.snake.xx - window.collisionPoint.x), window.snake.yy + (window.snake.yy - window.collisionPoint.y));
        window.setAcceleration(0);
        window.setMouseCoordinates(window.goalCoordinates[0], window.goalCoordinates[1]);
    }
};
// Check if circles intersect
window.circleIntersect = function (circle1, circle2) {
    if (window.quickCollisionCheck(circle1, circle2)) {
        if (window.collisionCheck(circle1, circle2)) {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
};
// Quickly check if we are going to collide with anything
window.quickCollisionCheck = function (circle1, circle2) {
    return (circle1.x + circle1.radius + circle2.radius > circle2.x &&
        circle1.x < circle2.x + circle1.radius + circle2.radius &&
        circle1.y + circle1.radius + circle2.radius > circle2.y &&
        circle1.y < circle2.y + circle1.radius + circle2.radius);
};
// Collision check
window.collisionCheck = function (circle1, circle2) {
    var distance = Math.sqrt(((circle1.x - circle2.x) * (circle1.x - circle2.x)) + ((circle1.y - circle2.y) * (circle1.y - circle2.y)));

    if (distance < circle1.radius + circle2.radius) {
        var collisionPointX = ((circle1.x * circle2.radius) + (circle2.x * circle1.radius)) / (circle1.radius + circle2.radius);
        var collisionPointY = ((circle1.y * circle2.radius) + (circle2.y * circle1.radius)) / (circle1.radius + circle2.radius);

        if (window.visualDebugging) {
            window.drawDot(collisionPointX, collisionPointY, circle2.radius, 'cyan', true);
            window.drawDot(circle2.x, circle2.y, circle2.radius, 'red', true);
        }
        return true;
    } else {
        return false;
    }
};

// Sort food based on distance
window.getSortedFood = function () {
    // Filters the nearest food by getting the distance
    return window.foods.filter(function (val) {
        return val !== null;
    }).map(window.getDistanceFromMe).sort(window.sortFood);
};
// Sort prey based on distance
window.getSortedPrey = function () {
    // Filters the nearest food by getting the distance
    return window.preys.filter(function (val) {
        return val !== null;
    }).map(window.getDistanceFromMe).sort(window.sortPrey);
};
// Draw dots on the canvas
window.drawDot = function (x, y, radius, colour, fill) {
    var context = window.mc.getContext('2d');
    context.beginPath();
    context.strokeStyle = '#00FF00';
    context.arc(x, y, radius * window.getScale(), 0, Math.PI * 2);
    context.closePath();
    if (fill) {
        context.fillStyle = ('green red white yellow black cyan blue'.indexOf(colour) < 0) ? 'white' : colour;
        context.fill();
    }
    context.fillStyle = 'black';
    context.strokeStyle = '#000000';
};

// Draw lines on the canvas
window.drawLine = function (x2, y2, colour) {
    var context = window.mc.getContext('2d');
    var center = [window.mc.height / 2, window.mc.width / 2];
    context.lineWidth = 5 * window.getScale();
    context.strokeStyle = (colour === 'green') ? '#00FF00' : '#FF0000';
    context.moveTo(center[1], center[0]);
    context.lineTo(x2, y2);
    context.stroke();
    context.strokeStyle = '#000000';
};
// Save the original slither.io oef function so we can add things to it later
window.oldOef = window.oef;
window.oef = function () {
    // Original slither.io oef function + whatever is under it
    // requestAnimationFrame(window.loop);
    window.oldOef();
    if (window.isBotRunning) window.loop();
    window.onFrameUpdate();
};
window.handleTextColor = function (enabled) {
    return '<span style=\"opacity: 0.8; color:' + (enabled ? 'green;\">enabled' : 'red;\">disabled') + '</span>';
};
window.onFrameUpdate = function () {
    // Botstatus overlay
    var generalStyle = '<span style = "opacity: 0.35";>';
    window.botstatus_overlay.innerHTML = generalStyle + '(T) Bot: </span>' + window.handleTextColor(window.isBotRunning);
    window.visualdebugging_overlay.innerHTML = generalStyle + '(Y) Visual debugging: </span>' + window.handleTextColor(window.visualDebugging);
    window.logdebugging_overlay.innerHTML = generalStyle + '(U) Log debugging: </span>' + window.handleTextColor(window.logDebugging);
    window.autorespawn_overlay.innerHTML = generalStyle + '(I) Auto respawning: </span>' + window.handleTextColor(window.autoRespawn);
    window.rendermode_overlay.innerHTML = generalStyle + '(O) Mobile rendering: </span>' + window.handleTextColor(window.mobileRender);
    window.huntprey_overlay.innerHTML = generalStyle + '(P) Prey hunting: </span>' + window.handleTextColor(window.huntPrey);
    window.collision_detection_overlay.innerHTML = generalStyle + '(C) Collision detection: </span>' + window.handleTextColor(window.collisionDetection);
    window.collision_radius_multiplier_overlay.innerHTML = generalStyle + '(A/S) Collision radius multiplier: ' + window.collisionRadiusMultiplier + ' </span>';
    window.defence_overlay.innerHTML = generalStyle + '(D) Defence: </span>' + window.handleTextColor(window.defence);
    window.resetzoom_overlay.innerHTML = generalStyle + '(Z) Reset zoom </span>';
    window.quittomenu_overlay.innerHTML = generalStyle + '(Q) Quit to menu </span>';
    window.fps_overlay.innerHTML = generalStyle + 'FPS: ' + window.framesPerSecond.getFPS() + '</span>';

    // If playing
    if (window.playing && window.visualDebugging) {
        if (window.isBotRunning) {
            // Check to see if there is a position overlay
            if (window.position_overlay) {
                // Display the X and Y of the snake
                window.position_overlay.innerHTML = generalStyle + 'X: ' + (Math.round(window.snake.xx) || 0) + ' Y: ' + (Math.round(window.snake.yy) || 0) + '</span>';
            }
            var drawGoalCoordinates = window.mouseToScreen(window.goalCoordinates[0], window.goalCoordinates[1]);
            drawGoalCoordinates = window.screenToCanvas(drawGoalCoordinates[0], drawGoalCoordinates[1]);
            window.drawLine(drawGoalCoordinates[0], drawGoalCoordinates[1], 'green');
            window.drawDot(drawGoalCoordinates[0], drawGoalCoordinates[1], 5, 'red', true);
        }
    }
};
// Defense mode - bot turns around in a circle
window.playDefence = function (dir) {
    window.kd_l = (dir === 'l');
    window.kd_r = (dir === 'r');
    window.setMouseCoordinates(window.getWidth() / 2, window.getHeight() / 2);
};
// Actual bot code

// Loop for running the bot
window.loop = function () {
    // If the game and the bot are running
    if (window.playing && window.isBotEnabled) {
        window.ranOnce = true;
        // TODO: Check some condition to see if we should play defence
        // Right now this just uses the manual toggle
        if (window.defence) {
            window.playDefence('l');
            return;
        }

        // If no enemies or obstacles, go after what you are going after
        if (!window.checkCollision(window.getX(), window.getY(), window.getSnakeWidth() * window.collisionRadiusMultiplier)) {
            // Sort the food based on their distance relative to player's snake
            window.sortedFood = window.getSortedFood();
            // Current food
            window.currentFood = window.sortedFood[0];
            // Convert coordinates of the closest food using mapToMouse
            var coordinatesOfClosestFood = window.mapToMouse(window.currentFood.xx, window.currentFood.yy);
            window.goalCoordinates = coordinatesOfClosestFood;
            // Disable Sprint
            window.setAcceleration(0);
            // Check for preys, enough "length"
            if (window.preys.length > 0 && window.huntPrey) {
                // Sort preys based on their distance relative to player's snake
                window.sortedPrey = window.getSortedPrey();
                // Current prey
                window.currentPrey = window.sortedPrey[0];
                // Convert coordinates of the closest prey using mapToMouse
                var coordinatesOfClosestPrey = window.mapToMouse(window.currentPrey.xx, window.currentPrey.yy);
                // Check for the distance
                if (window.currentPrey.distance <= Math.pow(window.getSnakeLength(), 2) / 2) {
                    // Set the mouse coordinates to the coordinates of the closest prey
                    window.goalCoordinates = coordinatesOfClosestPrey;
                    // "Sprint" enabled
                    window.setAcceleration(1);
                }
            }
            window.kd_l = false;
            window.kd_r = false;
            window.setMouseCoordinates(window.goalCoordinates[0], window.goalCoordinates[1]);
        }
    } else {
        if (window.ranOnce) {
            //window.startInterval = setInterval(window.startBot, 1000);
            window.stopBot();
        }
    }
};

// Target the user's browser.
(function () {
    var requestAnimationFrame = window.requestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.msRequestAnimationFrame;

    window.requestAnimationFrame = requestAnimationFrame;
})();

// Starts bot
window.startBot = function () {
    if (window.autoRespawn && !window.playing && window.isBotEnabled && window.ranOnce && !window.isBotRunning) {
        window.connectBot();
        //clearInterval(window.startInterval);
    }
};
// Initialises the bot
window.initBot = function () {
    window.ranOnce = false;
    window.isBotRunning = false;
    window.isBotEnabled = true;
    window.collisionPoint = {
        x: 0,
        y: 0,
        radius: 0
    };
    // Load preferences
    window.loadPreference('logDebugging', false);
    window.loadPreference('visualDebugging', false);
    window.loadPreference('autoRespawn', false);
    window.loadPreference('mobileRender', false);
    window.loadPreference('huntPrey', true);
    window.loadPreference('collisionDetection', true);
    window.loadPreference('collisionRadiusMultiplier', 8);
    window.loadPreference('defence', false);
    window.nick.value = window.loadPreference('savedNick', 'Slithere.com Bot');
    // Overlays
    // Top left
    window.generalstyle = 'color: #FFF; font-family: Arial, \'Helvetica Neue\', Helvetica, sans-serif; font-size: 14px; position: fixed; z-index: 7;';
    window.appendDiv('botstatus_overlay', 'nsi', window.generalstyle + 'left: 30; top: 30px;');
    window.appendDiv('visualdebugging_overlay', 'nsi', window.generalstyle + 'left: 30; top: 45px;');
    window.appendDiv('logdebugging_overlay', 'nsi', window.generalstyle + 'left: 30; top: 60px;');
    window.appendDiv('autorespawn_overlay', 'nsi', window.generalstyle + 'left: 30; top: 75px;');
    window.appendDiv('rendermode_overlay', 'nsi', window.generalstyle + 'left: 30; top: 90px;');
    window.appendDiv('huntprey_overlay', 'nsi', window.generalstyle + 'left: 30; top: 105px;');
    window.appendDiv('collision_detection_overlay', 'nsi', window.generalstyle + 'left: 30; top: 120px;');
    window.appendDiv('collision_radius_multiplier_overlay', 'nsi', window.generalstyle + 'left: 30; top: 135px;');
    window.appendDiv('defence_overlay', 'nsi', window.generalstyle + 'left: 30; top: 150px;');
    window.appendDiv('resetzoom_overlay', 'nsi', window.generalstyle + 'left: 30; top: 165px;');
    window.appendDiv('quittomenu_overlay', 'nsi', window.generalstyle + 'left: 30; top: 180px;');
    // Bottom right
    window.appendDiv('position_overlay', 'nsi', window.generalstyle + 'right: 30; bottom: 120px;');
    window.appendDiv('fps_overlay', 'nsi', window.generalstyle + 'right: 30; bottom: 170px;');
    // Listener for mouse wheel scroll - used for setZoom function
    document.body.addEventListener('mousewheel', window.setZoom);
    document.body.addEventListener('DOMMouseScroll', window.setZoom);
    // Set render mode
    if (window.mobileRender) {
        setBackground('data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs');
        window.render_mode = 1;
    } else {
        setBackground();
        window.render_mode = 2;
    }
    // Canvas Ratio
    window.canvasRatio = [window.mc.width / window.getWidth(), window.mc.height / window.getHeight()];
    // Unblocks all skins without the need for FB sharing.
    window.localStorage.setItem('edttsg', '1');
    // Remove social
    window.social.remove();
    // Start!
    window.launchBot(50);
    window.startInterval = setInterval(window.startBot, 1000);
};
window.initBot();

// Enemy code - not used for now
/*
        // Sort enemies based on distance
        window.getSortedEnemies = function() {
            Filters the nearest food by getting the distance
            return window.snakes.filter(function(val) {
                return val !== null && val.id !== window.snake.id;
            }).map(window.getDistanceFromMe).sort(window.sortEnemy);
        };
        // Sorting function for enemies, from property 'distance'
        window.sortEnemy = function(a, b) {
            return a.distance - b.distance;
        };
                window.sortedEnemies = window.getSortedEnemies();
                // Take the closest of each
                window.closestEnemy = window.sortedEnemies[0];
                if (window.closestEnemy.distance < 300) {
                window.log('close enemy! (distance = ' + window.closestEnemy.distance);
                // !handle close enemies!
                 }
        */
// Better food hunting algorithm but not implemented yet
/*
        window.isInFoods = function (foodObject) {
            return (foodObject === null) ? false : (window.foods.indexOf(foodObject) >= 0);
        };
        window.currentFood = null;
        window.sortedFood = getSortedFood();
        window.loop = function () {
            if (!isInFoods(currentFood)) {
                window.sortedFood = getSortedFood();
                window.currentFood = sortedFood[0];
                var coordinatesOfClosestFood = window.mapToMouse(window.sortedFood[0].xx, window.sortedFood[0].yy);
                window.setMouseCoordinates(coordinatesOfClosestFood[0], coordinatesOfClosestFood[1]);
            }
        };
        */
