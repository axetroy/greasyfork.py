
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
738
739
740
741
742
743
744
745
746
747
748
749
750
751
752
753
754
755
756
757
758
759
760
761
762
763
764
765
766
767
768
769
770
771
772
773
774
775
776
777
778
779
780
781
782
783
784
785
786
787
788
789
790
791
792
793
794
795
796
797
798
799
800
801
802
803
804
805
806
807
808
809
810
811
812
813
814
815
816
817
818
819
820
821
822
823
824
825
826
827
828
829
830
831
832
833
834
835
836
837
838
839
840
841
842
843
844
845
846
847
848
849
850
851
852
853
854
855
856
857
858
859
860
861
862
863
864
865
866
867
868
869
870
871
872
873
874
875
876
877
878
879
880
881
882
883
884
885
886
887
888
889
890
891
892
893
894
895
896
897
898
899
900
901
902
903
904
905
906
907
908
909
910
911
912
913
914
915
916
917
918
919
920
921
922
923
924
925
926
927
928
929
930
931
932
933
934
935
936
937
938
939
940
941
942
943
944
945
946
947
948
949
950
951
952
953
954
955
956
957
958
959
960
961
962
963
964
965
966
967
968
969
970
971
972
973
974
975
976
977
978
979
980
981
982
983
984
985
986
987
988
989
990
991
992
993
994
995
996
997
998
999
1000
1001
1002
1003
1004
1005
1006
1007
1008
1009
1010
1011
1012
1013
1014
1015
1016
1017
1018
1019
1020
1021
1022
1023
1024
1025
1026
1027
1028
1029
1030
1031
1032
1033
1034
1035
1036
1037
1038
1039
1040
1041
1042
1043
1044
1045
1046
1047
1048
1049
1050
1051
1052
1053
1054
1055
1056
1057
1058
1059
1060
1061
1062
1063
1064
1065
1066
1067
1068
1069
1070
1071
1072
1073
1074
1075
1076
1077
1078
1079
1080
1081
1082
1083
1084
1085
1086
1087
1088
1089
1090
1091
1092
1093
1094
1095
1096
1097
1098
1099
1100
1101
1102
1103
1104
1105
1106
1107
1108
1109
1110
1111
1112
1113
1114
1115
1116
1117
1118
1119
1120
1121
1122
1123
1124
1125
1126
1127
1128
1129
1130
1131
1132
1133
1134
1135
1136
1137
1138
1139
1140
1141
1142
1143
1144
1145
1146
1147
1148
1149
1150
1151
1152
1153
1154
1155
1156
1157
1158
1159
1160
1161
1162
1163
1164
1165
1166
1167
1168
1169
1170
1171
1172
1173
1174
1175
1176
1177
1178
1179
1180
1181
1182
1183
1184
1185
1186
1187
1188
1189
1190
1191
1192
1193
1194
1195
1196
1197
1198
1199
1200
1201
1202
1203
1204
1205
1206
1207
1208
1209
1210
1211
1212
1213
1214
1215
1216
1217
1218
1219
1220
1221
1222
1223
1224
1225
1226
1227
1228
1229
1230
1231
1232
1233
1234
1235
1236
1237
1238
1239
1240
1241
1242
1243
1244
1245
1246
1247
1248
1249
1250
1251
1252
1253
1254
1255
1256
1257
1258
1259
1260
1261
1262
1263
1264
1265
1266
1267
1268
1269
1270
1271
1272
1273
1274
1275
1276
1277
1278
1279
1280
1281
1282
1283
1284
1285
1286
1287
1288
1289
1290
1291
1292
1293
1294
1295
1296
1297
1298
1299
1300
1301
1302
1303
1304
1305
1306
1307
1308
1309
1310
1311
1312
1313
// ==UserScript==
// @name         Mapara para HKG by Golomon 2.0.
// @namespace    http://github.com/dimotsai/
// @version      2.0
// @description  Mapa para HKG
// @author       Golomon
// @license      MIT
// @match        http://agar.io/*
// @require      http://cdn.jsdelivr.net/msgpack/1.05/msgpack.js
// @require      https://cdn.bootcss.com/jquery/1.11.3/jquery.min.js
// @require      https://cdn.bootcss.com/bootstrap/3.3.5/js/bootstrap.min.js
// @grant        none
// @run-at       document-body
// ==/UserScript==

window.msgpack = this.msgpack;

(function() {
    var _WebSocket = window._WebSocket = window.WebSocket;
    var $ = window.jQuery;
    var msgpack = window.msgpack;
    var options = {
        enableMultiCells: true,
        enablePosition: true,
        enableCross: false,
        showMemberOnly: true,
        showPlayerNameInsteadOfId: true,
    };

    /* Configuration for porting */
    var Config_poker = {
        fieldName : {
            region : "#o-region",
            gamemode : "#o-gamemode",
            room : '#roomIdOrIp'
        },
        injectOnMessage : false,
    };

    var Config_DaChong = {
        fieldName : {
            region : "#region",
            gamemode : "#gamemode",
            room : '#srv-ip'
        },
        injectOnMessage : true,
    };

    var currentConfig = Config_DaChong;

    var fieldName = currentConfig.fieldName;
    var injectOnMessage = currentConfig.injectOnMessage;
    var defaultServer = "ws://eddy.zone.be:8000";

    // game states
    var agarServerAddress = null;
    var map_server = null;
    var player_name = [];
    var players = [];
    var id_players = [];
    var cells = [];
    var current_cell_ids = [];
    var start_x = -7000,
        start_y = -7000,
        end_x = 7000,
        end_y = 7000,
        length_x = 14000,
        length_y = 14000;
    var minimapHeight = 230;
    var minimapWidth = 230;
    var render_timer = null;
    var update_server_list_timer = null;
    var mini_map_tokens = [];
    var mapEvent = [];

    /* Map Event Object */
    function Event(data){
        this.x = data.x;
        this.y = data.y;
        this.type = data.type;
        this.origin = data.origin;
        this.time = Date.now();
    }

    Event.TYPE_NORMAL    = 0;
    Event.TYPE_FEED      = 1;
    Event.TYPE_FAKESPACE = 2;
    Event.TYPE_RUN       = 3;

    Event.prototype = {
        toSendObject: function(){
            return {
                x: this.x,
                y: this.y,
                type: this.type,
                message: this.message
            };
        },
        isTimeout : function(){
            return Date.now() - this.time > 500;
        },
        render: function(ctx, xyTransform, maxsize){
            var elapsedTime = Date.now() - this.time;
            if(elapsedTime > 500){
                /* TODO: delete */
                return;
            }

            var position = xyTransform(this.x, this.y);
            var size = maxsize * elapsedTime / 500;
            var color;

            switch(this.type){
                case Event.TYPE_NORMAL:    color = "#55FF55"; break;
                case Event.TYPE_FEED:      color = "#CCCCFF"; break;
                case Event.TYPE_FAKESPACE: color = "#FFFFFF"; break;
                case Event.TYPE_RUN:       color = "#FF0000"; break;
            }

            ctx.save();
            ctx.strokeStyle = color;
            ctx.globalAlpha = Math.min(2 * (500 - elapsedTime) / 500, 1);
            ctx.lineCap = "round";
            ctx.lineJoin = "round";
            ctx.lineWidth = size * 0.05;
            ctx.beginPath();
            ctx.arc(position.x,
                    position.y,
                    size,
                    0,
                    2 * Math.PI,
                    false);
            ctx.closePath();
            ctx.stroke();
        },
    };

    function miniMapSendRawData(data) {
        if (map_server !== null && map_server.readyState === window._WebSocket.OPEN) {
            var array = new Uint8Array(data);
            map_server.send(array.buffer);
        }
    }

    function getAgarServerInfo(){
        return {
            address : agarServerAddress,
            region: $(fieldName.region).val(),
            gamemode: $(fieldName.gamemode).val() === '' ? ':ffa' : $(fieldName.gamemode).val(),
            party: $(fieldName.room).val(),
        };
    }

    function miniMapConnectToServer(address, onOpen, onClose) {
        if(map_server !== null)return;
        var ws = null;
        try {
            ws = new window._WebSocket(address);
        } catch (ex) {
            onClose();
            console.error(ex);
            return false;
        }
        ws.binaryType = "arraybuffer";

        ws.onopen = onOpen;

        ws.onmessage = function(event) {
            var buffer = new Uint8Array(event.data);
            var packet = msgpack.unpack(buffer);
            switch(packet.type) {
                case 128: /* Update map */
                    for (var i=0; i < packet.data.addition.length; ++i) {
                        var cell = packet.data.addition[i];
                        if (! miniMapIsRegisteredToken(cell.id))
                        {
                            miniMapRegisterToken(
                                cell.id,
                                miniMapCreateToken(cell.id, cell.color)
                            );
                        }

                        var size_n = cell.size/length_x;
                        miniMapUpdateToken(cell.id, (cell.x - start_x)/length_x, (cell.y - start_y)/length_y, size_n);
                    }

                    for (i = 0; i < packet.data.deletion.length; ++i) {
                        var id = packet.data.deletion[i];
                        miniMapUnregisterToken(id);
                    }
                    break;
                case 129: /* Update player */
                    players = packet.data;
                    for (var p in players) {
                        var player = players[p];
                        var ids = player.ids;
                        for (i in ids) {
                            id_players[ids[i]] = player.no;
                        }
                    }
                    console.log('update-list');
                    window.mini_map_party.trigger('update-list');
                    break;
                case 131: /* Update server list */
                    $('#server-list').empty();
                    packet.data.forEach(function(server){
                        var uid = server.uid;
                        var info = server.info;
                        var playerCount = server.playerCount;
                        var item = $('<a>')
                            .text(info.address + ' ' + info.gamemode + ' : ' + playerCount)
                            .click({ token: info.party, uid: uid },function(e){
                                e.preventDefault();
                                var target = $(e.currentTarget);
                                if(e.data.token !== ''){
                                    window.connectJ(e.data.token);
                                    $(fieldName.room).val(e.data.token);
                                    setTimeout(function(){
                                        miniMapSendRawData(msgpack.pack({
                                            type: 51,
                                            data: e.data.uid
                                        }));
                                    }, 1000);

                                }
                            });

                        var item2 = $('<li>');
                        item.appendTo(item2);
                        item2.appendTo($('#server-list'));
                    });
                    break;
                case 33: /* Add event */
                    mapEvent.push(new Event(packet.data));
            }
        };

        ws.onerror = function() {
            onClose();
            console.error('failed to connect to map server');
        };

        ws.onclose = onClose;

        map_server = ws;
    }

    function miniMapRender() {
        var canvas = window.mini_map;
        var ctx = canvas.getContext('2d');

        // Background
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.globalAlpha = 0.3;
        ctx.fillStyle =  '#000000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        // Draw coordinate
        var yAxis = ['A', 'B', 'C', 'D', 'E'];
        var xSize = canvas.width;
        var ySize = canvas.height;
        ctx.beginPath();
        ctx.lineWidth = 2;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.font = (0.6 * xSize / 5) + 'px Arial';
        ctx.fillStyle = ctx.strokeStyle = '#AAAAAA';
        for (var j = 0; j < 5; ++j) {
            for (var i = 0; i < 5; ++i) {
                ctx.strokeRect((xSize / 5 * i), (ySize / 5 * j), (xSize / 5), (ySize / 5));
                ctx.fillText(yAxis[j] + (i + 1), (xSize / 5 * i) + (xSize / 5 / 2), (ySize / 5 * j) + (ySize / 5 / 2));
            }
        }
        ctx.stroke();
        ctx.globalAlpha = 1.0; // restore alpha

        var rendered_player = [];

        for (var id in mini_map_tokens) {
            var token = mini_map_tokens[id];
            var x = token.x * canvas.width;
            var y = token.y * canvas.height;
            var size = token.size * canvas.width;

            if (!options.showMemberOnly || id_players[id] !== undefined  || current_cell_ids.indexOf(token.id) !== -1) {
                if(options.showMemberOnly && size < 7){ /* add an translucent, bigger cell to make it clear*/
                    ctx.globalAlpha = 0.5;
                    ctx.beginPath();
                    ctx.arc(
                        x,
                        y,
                        7,
                        0,
                        2 * Math.PI,
                        false
                    );
                    ctx.closePath();
                    ctx.fillStyle = token.color;
                    ctx.fill();
                    ctx.globalAlpha = 1.0;
                }
                ctx.beginPath();
                ctx.arc(
                    x,
                    y,
                    size,
                    0,
                    2 * Math.PI,
                    false
                );
                ctx.closePath();
                ctx.fillStyle = token.color;
                ctx.fill();
            }

            if (options.enableCross && -1 != current_cell_ids.indexOf(token.id)){
                miniMapDrawCross(token.x, token.y, token.color);
            }

            if (id_players[id] !== undefined) {
                // Draw you party member's crosshair
                if (options.enableCross) {
                    miniMapDrawCross(token.x, token.y, token.color);
                }

                if(rendered_player.indexOf(id_players[id]) == -1){
                    if(options.showPlayerNameInsteadOfId){
if(players[id_players[id]].name){
                        /* draw name only once */
                        ctx.font = '14px Arial';
                        ctx.textAlign = 'center';
                        ctx.textBaseline = 'middle';
                        ctx.fillStyle = 'white';
                        ctx.fillText(String.fromCharCode.apply(null, players[id_players[id]].name), x, y + ((size < 10) ? 10 : size * 1.3));
                        rendered_player.push(id_players[id]);
}
                    }else{
                        ctx.font = size * 2 + 'px Arial';
                        ctx.textAlign = 'center';
                        ctx.textBaseline = 'middle';
                        ctx.fillStyle = 'white';
                        ctx.fillText(id_players[id] + 1, x, y);
                    }
                }
            }
        }

        for(var e = 0;e < mapEvent.length; ++e){
            if(mapEvent[e]){
                mapEvent[e].render(ctx,
                                function(x,y){
                                    var nx = (x - start_x) / length_x * minimapWidth;
                                    var ny = (y - start_y) / length_y * minimapHeight;
                                    return {x:nx, y:ny};
                                } ,
                                60/* size */);
                if(mapEvent[e].isTimeout()){
                    mapEvent.splice(e, 1);
                }
            }
        }
    }

    function miniMapDrawCross(x, y, color) {
        var canvas = window.mini_map;
        var ctx = canvas.getContext('2d');
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(0, y * canvas.height);
        ctx.lineTo(canvas.width, y * canvas.height);
        ctx.moveTo(x * canvas.width, 0);
        ctx.lineTo(x * canvas.width, canvas.height);
        ctx.closePath();
        ctx.strokeStyle = color || '#FFFFFF';
        ctx.stroke();
    }

    function miniMapCreateToken(id, color) {
        var mini_map_token = {
            id: id,
            color: color,
            x: 0,
            y: 0,
            size: 0
        };
        return mini_map_token;
    }

    function miniMapRegisterToken(id, token) {
        if (mini_map_tokens[id] === undefined) {
            // window.mini_map.append(token);
            mini_map_tokens[id] = token;
        }
    }

    function miniMapUnregisterToken(id) {
        if (mini_map_tokens[id] !== undefined) {
            // mini_map_tokens[id].detach();
            delete mini_map_tokens[id];
        }
    }

    function miniMapIsRegisteredToken(id) {
        return mini_map_tokens[id] !== undefined;
    }

    function miniMapUpdateToken(id, x, y, size) {
        if (mini_map_tokens[id] !== undefined) {

            mini_map_tokens[id].x = x;
            mini_map_tokens[id].y = y;
            mini_map_tokens[id].size = size;

            return true;
        } else {
            return false;
        }
    }

    function miniMapUpdatePos(x, y) {
        window.mini_map_pos.text('x: ' + x.toFixed(0) + ', y: ' + y.toFixed(0));
    }

    function miniMapReset() {
        cells = [];
        mini_map_tokens = [];
    }

    function miniMapInit() {
        mini_map_tokens = [];

        cells = [];
        current_cell_ids = [];
        start_x = -7000;
        start_y = -7000;
        end_x = 7000;
        end_y = 7000;
        length_x = 14000;
        length_y = 14000;

        /* Right Panel */
        if ($('#sidebar-wrapper').length === 0) {
            jQuery('body').append(
                '<style>' +
                '.nav .open > a,  ' +
                '.nav .open > a:hover,  ' +
                '.nav .open > a:focus {background-color: transparent;} ' +
                ' ' +
                '/*-------------------------------*/ ' +
                '/*           Wrappers            */ ' +
                '/*-------------------------------*/ ' +
                ' ' +
                '#sidebar-wrapper { ' +
                '    position: absolute; ' +
                '    z-index: 1000; ' +
                '    margin-right: -310px; ' +
                '    left: auto; ' +
                '    height: 100%; ' +
                '    overflow-y: auto; ' +
                '    overflow-x: hidden; ' +
                '    background: rgba(26,26,26,0.8); ' +
                '    width: 310px; ' +
                '} ' +
                '#sidebar-wrapper.toggled {' +
                '    margin-right: 0px; ' +
                '}' +
                '/*-------------------------------*/ ' +
                '/*     Sidebar nav styles        */ ' +
                '/*-------------------------------*/ ' +
                ' ' +
                '.sidebar-nav { ' +
                '    position: absolute; ' +
                '    top: 0; ' +
                '    width: 310px; ' +
                '    margin: 0; ' +
                '    padding: 0; ' +
                '    list-style: none; ' +
                '} ' +
                ' ' +
                '.sidebar-nav li { ' +
                '    position: relative;  ' +
                '    line-height: 20px; ' +
                '    display: inline-block; ' +
                '    width: 100%; ' +
                '    background: rgba(40, 40, 40, 0.8);' +
                '} ' +
                ' ' +
                '.sidebar-nav li:before { ' +
                '    content: \'\'; ' +
                '    position: absolute; ' +
                '    top: 0; ' +
                '    left: 0; ' +
                '    z-index: -1; ' +
                '    height: 100%; ' +
                '    width: 5px; ' +
                '    background-color: #1c1c1c; ' +
                ' ' +
                '} ' +
                '.sidebar-nav li:nth-child(1):before { ' +
                '    background-color: #ec122a;    ' +
                '} ' +
                '.sidebar-nav li:nth-child(2):before { ' +
                '    background-color: #ec1b5a;    ' +
                '} ' +
                '.sidebar-nav li:nth-child(3):before { ' +
                '    background-color: #79aefe;    ' +
                '} ' +
                '.sidebar-nav li:nth-child(4):before { ' +
                '    background-color: #314190;    ' +
                '} ' +
                '.sidebar-nav li:nth-child(5):before { ' +
                '    background-color: #314120;    ' +
                '} ' +
                '.sidebar-nav li:hover:before, ' +
                '.sidebar-nav li.open:hover:before { ' +
                '    width: 100%; ' +
                ' ' +
                '} ' +
                ' ' +
                '.sidebar-nav li a { ' +
                '    display: block; ' +
                '    color: #ddd; ' +
                '    text-decoration: none; ' +
                '    padding: 10px 15px 10px 30px;     ' +
                '} ' +
                ' ' +
                '.sidebar-nav li a:hover, ' +
                '.sidebar-nav li a:active, ' +
                '.sidebar-nav li a:focus, ' +
                '.sidebar-nav li.open a:hover, ' +
                '.sidebar-nav li.open a:active, ' +
                '.sidebar-nav li.open a:focus{ ' +
                '    color: #fff; ' +
                '    text-decoration: none; ' +
                '    background-color: transparent; ' +
                '} ' +
                ' ' +
                '.sidebar-nav > .sidebar-brand { ' +
                '    height: 65px; ' +
                '    font-size: 20px; ' +
                '    line-height: 44px; ' +
                '    background-color: #3c3c3c; ' +
                '} ' +
                '.dropdown-label{ ' +
                '    display: block;' +
                '    color: #ffffff; ' +
                '    padding: 10px 15px 10px 30px;' +
                '} ' +
                '.dropdown-label:visited, ' +
                '.dropdown-label:hover, ' +
                '.dropdown-label:active{ ' +
                '    color: #cecece; ' +
                '    text-decoration: none;' +
                '} ' +
                '.dropdown-label:after{ ' +
                '    content: \' ▶\';' +
                '    text-align: right; ' +
                '    float:right;' +
                '} ' +
                '.dropdown-label:hover:after{' +
                '     content:\'▼\';' +
                '    text-align: right; ' +
                '    float:right;' +
                '}' +
                '.dropdown ul{' +
                '    float: left;' +
                '    opacity: 0;'+
                '    width: 100%; ' +
                '    padding: 0px;' +
                '    top : 0px;'+
                '    visibility: hidden;'+
                '    z-index: 1;' +
                '    position: absolute;' +
                '    border: #555555 1px;' +
                '    border-style: solid;' +
                '}' +
                '.dropdown ul li{' +
                '    float: none;' +
                '    width: 100%;' +
                '}' +
                '.dropdown li:before{' +
                '     width: 0px;'+
                '}' +
                '.dropdown:hover ul{' +
                '     opacity: 1;'+
                '     background: #3c3c3c;'+
                '     top : 65px;'+
                '     visibility: visible;'+
                '}' +
                '</style>' +
                '<nav class="navbar navbar-inverse navbar-fixed-top" id="sidebar-wrapper" role="navigation">' +
                '    <ul class="nav sidebar-nav">' +
                '        <div class="sidebar-brand dropdown">' +
                '            <a id="tabtitle" class="dropdown-label" href="#">' +
                '               Menu' +
                '            </a>' +
                '            <ul>' +
                '                <li><a data-toggle="tab" href="#tab-chat">Chat</a></li>' +
                '                <li><a data-toggle="tab" href="#tab-serverselect">Server Select</a></li>' +
                '                <li><a data-toggle="tab" href="#tab-settings">settings</a></li>' +
                '            </ul>' +
                '        </div>' +
                '        <div class="tab-content">' +
                '            <div id="tab-chat" class="tab-pane fade in active">' +
                '                <li>' +
                '                    <a href="#">' +
                '                       Player' +
                '                    </a>' +
                '                </li>' +
                '                <div id="playerlist"><!-- place holder --></div>' +
                '                <li>' +
                '                    <a href="#">' +
                '                       Chat' +
                '                    </a>' +
                '                </li>' +
                '                <div id="chat"><p>Not yet implemented :P</p></div>' +
                '            </div>' +
                '            <div id="tab-serverselect" class="tab-pane fade">' +
                '                <li>' +
                '                    <a href="#">' +
                '                       Server Select' +
                '                    </a>' +
                '                </li>' +
                '                <div id="server-list"><!-- place holder --></div>' +
                '            </div>' +
                '            <div id="tab-settings" class="tab-pane fade">' +
                '                <li>' +
                '                    <a href="#">' +
                '                       Minimap Server connection' +
                '                    </a>' +
                '                </li>' +
                '                <div id="minimap-server-connection"><!-- place holder --></div>' +
                '                <li>' +
                '                    <a href="#">' +
                '                       Minimap Settings' +
                '                    </a>' +
                '                </li>' +
                '                <div id="minimap-setting"><!-- place holder --></div>' +
                '            </div>' +
                '        </div>' +
                '    </ul>' +
                '</nav>'
            );
        }
//      '<li>' +
//      '    <iframe src="https://discordapp.com/widget?id=103557585675763712&theme=dark" width="350" height="500" allowtransparency="true" frameborder="0"></iframe>' +
//      '</li>' +

        // Minimap
        if ($('#mini-map-wrapper').length === 0) {
            var wrapper = $('<div>').attr('id', 'mini-map-wrapper').css({
                position: 'fixed',
                bottom: 5,
                right: 5,
                width: minimapWidth,
                height: minimapHeight,
                background: 'rgba(128, 128, 128, 0.58)',
                "z-index": '1001'
            });

            var mini_map = $('<canvas>').attr({
                id: 'mini-map',
                width: minimapWidth,
                height: minimapHeight,
            }).css({
                width: '100%',
                height: '100%',
                position: 'relative',
                cursor: 'cell',
            }).on("mousedown",function(e){
                if(e.button === 0){
                    var posX = e.pageX - $(this).offset().left,
                        posY = e.pageY - $(this).offset().top;
                    var mapPosX = posX / minimapWidth * length_x + start_x;
                    var mapPosY = posY / minimapHeight * length_y + start_y;
                    var event = new Event({
                        x : mapPosX,
                        y : mapPosY,
                        type : Event.TYPE_NORMAL,
                        origin : -1,
                    });
                    miniMapSendRawData(msgpack.pack({
                        type : 33,
                        data: event.toSendObject()
                    }));
                }else if(e.button === 2){
                    window.Minimap.ToggleSidebar();
                }
            }).on('contextmenu',function(e){
                return false;
            });

            wrapper.append(mini_map).appendTo(document.body);

            window.mini_map = mini_map[0];
        }

        // minimap renderer
        if (render_timer === null)
            render_timer = setInterval(miniMapRender, 1000 / 30);

        // update server list every 10 seconds
        if (update_server_list_timer === null)
            update_server_list_timer = setInterval(function(){
                miniMapSendRawData(msgpack.pack({type: 50}));
            }, 1000 * 10);

        // minimap location
        if ($('#mini-map-pos').length === 0) {
            window.mini_map_pos = $('<div>').attr('id', 'mini-map-pos').css({
                bottom: 10,
                right: 10,
                color: 'white',
                fontSize: 15,
                fontWeight: 800,
                position: 'fixed'
            }).appendTo(document.body);
        }

        // minimap options
        if ($('#mini-map-options').length === 0) {
            window.mini_map_options = $('<div>').attr('id', 'mini-map-options').css({
                color: '#EEEEEE',
                fontWeight: 400,
                padding: '10px 15px 10px 30px'
            }).appendTo($('#minimap-setting'));

            for (var name in options) {

                var label = $('<label>').css({
                    display: 'block'
                });

                var checkbox = $('<input>').attr({
                    type: 'checkbox'
                }).prop({
                    checked: options[name]
                });

                label.append(checkbox);
                label.append(' ' + camel2cap(name));

                checkbox.click( function(options, name) { 
                    return function(evt) {
                        options[name] = evt.target.checked;
                        console.log(name, evt.target.checked);
                    };
                }(options, name));

                label.appendTo(window.mini_map_options);
            }

            var form = $('<div>')
            .addClass('form-inline')
            .css({
                opacity: 0.7,
                marginTop: 2
            })
            .appendTo(window.mini_map_options);

            var form_group = $('<div>')
            .addClass('form-group')
            .css({
                padding: '10px 15px 10px 30px',
                'margin-bottom': '0px'
            })
            .appendTo($('#minimap-server-connection'));

            var addressInput = $('<input>')
            .attr('placeholder', defaultServer)
            .attr('type', 'text')
            .css({
                'background-color':'#3c3c3c',
                color: '#FFF',
                border: 'none',
                'margin-bottom': '3px'
            })
            .addClass('form-control')
            .val(defaultServer)
            .appendTo(form_group);

            var connect = function (evt) {
                var address = addressInput.val();

                connectBtn.popover('destroy');
                connectBtn.text('Disconnect');
                miniMapConnectToServer(address, function onOpen() {
                    miniMapSendRawData(msgpack.pack({
                        type: 100,
                        data: getAgarServerInfo(),
                    }));
                    miniMapSendRawData(msgpack.pack({
                        type: 0,
                        data: player_name
                    }));
                    for (var i in current_cell_ids) {
                        miniMapSendRawData(msgpack.pack({
                            type: 32,
                            data: current_cell_ids[i]
                        }));
                    }
                    miniMapSendRawData(msgpack.pack({type: 50}));
                    console.log(address + ' connected');
                }, function onClose() {
                    map_server = null;
                    players = [];
                    id_players = [];
                    disconnect();
                    console.log('map server disconnected');
                });

                connectBtn.off('click');
                connectBtn.on('click', disconnect);

                miniMapReset();

                connectBtn.blur();
            };

            var disconnect = function() {
                connectBtn.text('Connect');
                connectBtn.off('click');
                connectBtn.on('click', connect);
                connectBtn.blur();
                if (map_server)
                    map_server.close();

                miniMapReset();
            };

            var connectBtn = $('<button>')
            .attr('id', 'mini-map-connect-btn')
            .text('Connect')
            .click(connect)
            .addClass('btn btn-block btn-primary')
            .appendTo(form_group);

            connectBtn.trigger('click');
        }

        // minimap party
        if ($('#mini-map-party').length === 0) {
            var mini_map_party = window.mini_map_party = $('<div>')
            .css({
                color: '#FFF',
                fontSize: 20,
                fontWeight: 600,
                textAlign: 'center',
                padding: 10
            })
            .attr('id', 'mini-map-party')
            .appendTo($('#playerlist'));

            var mini_map_party_list = $('<ol>')
            .attr('id', 'mini-map-party-list')
            .css({
                listStyle: 'none',
                padding: 0,
                margin: 0
            })
            .appendTo(mini_map_party);

            mini_map_party.on('update-list', function(e) {
                mini_map_party_list.empty();

                for (var p in players) {
                    var player = players[p];
                    var name = String.fromCharCode.apply(null, player.name);
                    name = (name === '' ? 'anonymous' : name);
                    $('<p>')
                    .text(player.no + 1 + '. ' + name)
                    .css({
                        margin: 0
                    })
                    .appendTo(mini_map_party_list);
                }
            });
        }
    }

    // cell constructor
    function Cell(id, x, y, size, color, name) {
        cells[id] = this;
        this.id = id;
        this.ox = this.x = x;
        this.oy = this.y = y;
        this.oSize = this.size = size;
        this.color = color;
        this.points = [];
        this.pointsAcc = [];
        this.setName(name);
    }

    Cell.prototype = {
        id: 0,
        points: null,
        pointsAcc: null,
        name: null,
        nameCache: null,
        sizeCache: null,
        x: 0,
        y: 0,
        size: 0,
        ox: 0,
        oy: 0,
        oSize: 0,
        nx: 0,
        ny: 0,
        nSize: 0,
        updateTime: 0,
        updateCode: 0,
        drawTime: 0,
        destroyed: false,
        isVirus: false,
        isAgitated: false,
        wasSimpleDrawing: true,

        destroy: function() {
            delete cells[this.id];
            id = current_cell_ids.indexOf(this.id);
            if(-1 != id){
                current_cell_ids.splice(id, 1);
            }
            this.destroyed = true;
            if (map_server === null || map_server.readyState !== window._WebSocket.OPEN) {
                miniMapUnregisterToken(this.id);
            }
        },
        setName: function(name) {
            this.name = name;
        },
        updatePos: function() {
            if (map_server === null || map_server.readyState !== window._WebSocket.OPEN) {
                if (options.enableMultiCells || -1 != current_cell_ids.indexOf(this.id)) {
                    if (! miniMapIsRegisteredToken(this.id))
                    {
                        miniMapRegisterToken(
                            this.id,
                            miniMapCreateToken(this.id, this.color)
                        );
                    }

                    var size_n = this.nSize/length_x;
                    miniMapUpdateToken(this.id, (this.nx - start_x)/length_x, (this.ny - start_y)/length_y, size_n);
                }
            }

            if (options.enablePosition && -1 != current_cell_ids.indexOf(this.id)) {
                window.mini_map_pos.show();
                miniMapUpdatePos(this.nx, this.ny);
            } else {
                window.mini_map_pos.hide();
            }

        }
    };

    String.prototype.capitalize = function() {
        return this.charAt(0).toUpperCase() + this.slice(1);
    };

    function camel2cap(str) {
        return str.replace(/([A-Z])/g, function(s){return ' ' + s.toLowerCase();}).capitalize();
    }

    // create a linked property from slave object
    // whenever master[prop] update, slave[prop] update
    function refer(master, slave, prop) {
        Object.defineProperty(master, prop, {
            get: function(){
                return slave[prop];
            },
            set: function(val) {
                slave[prop] = val;
            },
            enumerable: true,
            configurable: true
        });
    }

    // extract a websocket packet which contains the information of cells
    function extractCellPacket(data, offset) {
        ////
        var dataToSend = {
            destroyQueue : [],
            nodes : [],
            nonVisibleNodes : []
        };
        ////

        var I = +new Date();
        var qa = false;
        var b = Math.random(), c = offset;
        var size = data.getUint16(c, true);
        c = c + 2;

        // Nodes to be destroyed (killed)
        for (var e = 0; e < size; ++e) {
            var p = cells[data.getUint32(c, true)],
                f = cells[data.getUint32(c + 4, true)];
            c = c + 8;
            if(p && f){
                f.destroy();
                f.ox = f.x;
                f.oy = f.y;
                f.oSize = f.size;
                f.nx = p.x;
                f.ny = p.y;
                f.nSize = f.size;
                f.updateTime = I;
                dataToSend.destroyQueue.push(f.id);
            }
        }

        // Nodes to be updated
        for (e = 0; ; ) {
            var id = data.getUint32(c, true); /* playerID */
            c += 4;
            if (0 === id) {
                break;
            }
            ++e;
            var p = data.getInt32(c, true); /* x */
            c = c + 4;

            var f = data.getInt32(c, true); /* y */
            c = c + 4;

            g = data.getInt16(c, true); /* radius */
            c = c + 2;
            for (var h = data.getUint8(c++), m = data.getUint8(c++), q = data.getUint8(c++), h = (h << 16 | m << 8 | q).toString(16); 6 > h.length; )
                h = "0" + h; /* color */

            var h = "#" + h, /* color */
                k = data.getUint8(c++), /* some flags */
                m = !!(k & 1), /* isVirus */
                q = !!(k & 16);/* isAgitated */

            if(k & 2){
                c += 4 + data.getUint32(c, true);
            }
            if(k & 4){
                var ch, mcskin = "";
                for(;;){
                    ch = data.getUint8(c++);
                    if(0 == ch)
                        break;
                    mcskin += String.fromCharCode(ch);
                }
            }

            for (var n, k = ""; ; ) {
                n = data.getUint16(c, true);
                c += 2;
                if (0 == n)
                    break;
                k += String.fromCharCode(n); /* name */
            }

            n = k;
            k = null;

            var updated = false;
            // if id in cells then modify it, otherwise create a new cell
            if(cells.hasOwnProperty(id)){
                k = cells[id];
                k.updatePos();
                k.ox = k.x;
                k.oy = k.y;
                k.oSize = k.size;
                k.color = h;
                updated = true;
            }else{
                k = new Cell(id, p, f, g, h, n);
                k.pX = p;
                k.pY = f;
            }

            k.isVirus = m;
            k.isAgitated = q;
            k.nx = p;
            k.ny = f;
            k.updateCode = b;
            k.updateTime = I;
            k.nSize = g;
            if(n) k.setName(n);

            // ignore food creation
            if (updated) {
                dataToSend.nodes.push({
                    id: k.id,
                    x: k.nx,
                    y: k.ny,
                    size: k.nSize,
                    color: k.color
                });
            }
        }

        // Destroy queue + nonvisible nodes
        b = data.getUint32(c, true);
        c += 4;
        for (e = 0; e < b; e++) {
            var d = data.getUint32(c, true);
            c += 4;
            var k = cells[d];
            if(null != k) k.destroy();
            dataToSend.nonVisibleNodes.push(d);
        }

        var packet = {
            type: 16,
            data: dataToSend
        };

        miniMapSendRawData(msgpack.pack(packet));
    }

    // extract the type of packet and dispatch it to a corresponding extractor
    function extractPacket(event) {
        var c = 0;
        var data = new DataView(event.data);
        if(240 == data.getUint8(c)) c += 5;
        var opcode = data.getUint8(c);
        c++;
        switch (opcode) {
            case 16: // cells data
                extractCellPacket(data, c);
                break;
            case 20: // cleanup ids
                current_cell_ids = [];
                break;
            case 32: // cell id belongs me
                var id = data.getUint32(c, true);

                if (current_cell_ids.indexOf(id) === -1)
                    current_cell_ids.push(id);

                miniMapSendRawData(msgpack.pack({
                    type: 32,
                    data: id
                }));
                break;
            case 64: // get borders
                start_x = data.getFloat64(c, !0);
                c += 8;
                start_y = data.getFloat64(c, !0);
                c += 8;
                end_x = data.getFloat64(c, !0);
                c += 8;
                end_y = data.getFloat64(c, !0);
                c += 8;
                center_x = (start_x + end_x) / 2;
                center_y = (start_y + end_y) / 2;
                length_x = Math.abs(start_x - end_x);
                length_y = Math.abs(start_y - end_y);
        }
    }

    function extractSendPacket(data) {
        var view = new DataView(data);
        switch (view.getUint8(0, true)) {
            case 0:
                player_name = [];
                for (var i=1; i < data.byteLength; i+=2) {
                    player_name.push(view.getUint16(i, true));
                }

                miniMapSendRawData(msgpack.pack({
                    type: 0,
                    data: player_name
                }));
                break;
        }
    }

    // the injected point, overwriting the WebSocket constructor
    window.WebSocket = function(url, protocols) {
        console.log('Listen');

        if (protocols === undefined) {
            protocols = [];
        }

        var ws = new _WebSocket(url, protocols);

        refer(this, ws, 'binaryType');
        refer(this, ws, 'bufferedAmount');
        refer(this, ws, 'extensions');
        refer(this, ws, 'protocol');
        refer(this, ws, 'readyState');
        refer(this, ws, 'url');

        this.send = function(data){
            extractSendPacket(data);
            return ws.send.call(ws, data);
        };

        this.close = function(){
            return ws.close.call(ws);
        };

        this.onopen = function(event){};
        this.onclose = function(event){};
        this.onerror = function(event){};
        this.onmessage = function(event){};

        ws.onopen = function(event) {
            var ret;
            if (this.onopen)
                ret = this.onopen.call(ws, event);
            miniMapInit();
            agarServerAddress = this.url;
            miniMapSendRawData(msgpack.pack({
                type: 100,
                data: getAgarServerInfo(),
            }));
            miniMapSendRawData(msgpack.pack({type: 50}));
            return ret;
        }.bind(this);

        ws.onmessage = function(event) {
            var ret;
            if (this.onmessage)
                ret = this.onmessage.call(ws, event);
            if(injectOnMessage){
                extractPacket(event);
            }
            return ret;
        }.bind(this);

        ws.onclose = function(event) {
            if (this.onclose)
                return this.onclose.call(ws, event);
        }.bind(this);

        ws.onerror = function(event) {
            if (this.onerror)
                return this.onerror.call(ws, event);
        }.bind(this);
    };

    window.WebSocket.prototype = _WebSocket;

    $(window.document).ready(function() {
        miniMapInit();
    });

    window.Minimap = {
        /* official server message */
        Clear : function(){
            current_cell_ids = [];
        },
        UpdateData : function(data){
            var packet = {
                type: 16,
                data: data
            };
            miniMapSendRawData(msgpack.pack(packet));
        },
        OwnCell : function(id){
            if (current_cell_ids.indexOf(id) === -1)
                current_cell_ids.push(id);

            miniMapSendRawData(msgpack.pack({
                type: 32,
                data: id
            }));
        },
        SetGameAreaSize : function(mapLeft, mapTop, mapRight, mapBottom){
            start_x = mapLeft;
            start_y = mapTop;
            end_x = mapRight;
            end_y = mapBottom;
            center_x = (start_x + end_x) / 2;
            center_y = (start_y + end_y) / 2;
            length_x = Math.abs(start_x - end_x);
            length_y = Math.abs(start_y - end_y);
        },

        /* Map operation */
        MiniMapUnregisterTokenLocal : function(id){
            if (map_server === null || map_server.readyState !== window._WebSocket.OPEN) {
                miniMapUnregisterToken(id);
            }
        },
        MiniMapUpdateToken : function (id, color, x, y, size) {
            if (map_server === null || map_server.readyState !== window._WebSocket.OPEN) {
                if (!miniMapIsRegisteredToken(id)) {
                    miniMapRegisterToken(
                        id,
                        miniMapCreateToken(id, color)
                    );
                }
                miniMapUpdateToken(id,
                                   (x - start_x)/length_x,
                                   (y - start_y)/length_y,
                                   size / length_x);
            }
        },
        MiniMapUpdatePos : function(x, y) {
            miniMapUpdatePos(x, y);
        },

        /* API */
        ToggleSidebar : function(){
            $('#sidebar-wrapper').toggleClass('toggled');
        },

        /* Data Object */
        MapEvent : mapEvent,
    };

})();