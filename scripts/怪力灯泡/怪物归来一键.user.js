// ==UserScript==
// @name         怪物归来一键
// @namespace    http://tampermonkey.net/
// @version      0.3
// @description  一键挂机
// @author       怪力灯泡
// @match        http://*.gwgl.nmb666.com/index.aspx
// @require      https://greasyfork.org/scripts/3465-jquery-timers/code/jQuerytimers.js?version=10415
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    $('#div_boss_fight_aciton_container').remove()
    $('#div_role_fight_aciton_container').remove();

    var html =  '</select> <a href="#" id="yijian">一键挂机</a>&nbsp; <a href="#" id="huanjing">幻境扫荡</a>';

    $('.div_img_chongzhi').parent().append(html)
    $('.div_img_chongzhi').parent().parent().parent().css('width','250px');

    var mdata = {};
    var m1 = [1,1,2,15,1,1];
    var m2 = [2,2,3,30,2,2];
    var m3 = [3,3,4,60,3,4];
    var m4 = [4,6,8,150,4,8];
    var m5 = [5,10,13,200,5,14];
    var m6 = [6,15,20,250,6,22];
    var m8 = [8,30,40,300,7,30];
    var m9 = [9,50,65,400,8,40];
    var m10 = [10,80,100,500,9,50];
    var m12 = [12,90,120,450,8,45];
    var m13 = [13,130,170,550,9,60];
    var m14 = [14,180,240,600,10,80];
    var m16 = [16,170,240,580,9,70];
    var m17 = [17,250,340,700,10,90];
    var m18 = [18,360,480,800,11,120];
    var m20 = [20,340,440,750,11,110];
    var m21 = [21,420,560,900,12,130];
    var m22 = [22,560,740,1000,13,150];
    var m24 = [24,500,660,950,13,140];
    var m25 = [25,650,850,1100,14,160];
    var m26 = [26,850,1050,1200,15,190];
    var m28 = [28,750,990,1150,14,180];
    var m29 = [29,900,1200,1300,15,210];
    var m30 = [30,1050,1400,1400,16,240];
    var m32 = [32,1200,1600,1400,16,230];
    var m33 = [33,1350,1800,1500,17,280];
    var m34 = [34,1500,2000,1600,18,360];
    var m36 = [36,1600,2150,1700,19,450];
    var m37 = [37,1700,2300,1850,20,550];
    var m38 = [38,1800,2450,2000,21,660];
    var m40 = [40,1950,2650,2150,22,770];
    var m41 = [41,2100,2900,2300,23,880];
    var m42 = [42,2250,3150,2450,24,1000];
    var m44 = [44,2400,3400,2600,26,1150];
    var m45 = [45,2700,3800,2900,27,1300];
    var m46 = [46,3000,4200,3200,28,1450];
    var m48 = [48,3300,4600,3500,31,1600];
    var m49 = [49,3600,5000,3800,32,1750];
    var m50 = [50,3900,5400,4200,33,1900];
    var m52 = [52,4400,6000,4600,36,2050];
    var m53 = [53,5000,6800,5000,37,2200];
    var m54 = [54,5700,7700,5500,38,2400];
    var m56 = [56,6500,8700,6000,41,2600];
    var m57 = [57,7300,9700,6500,42,2800];
    var m58 = [58,8100,10900,7000,43,3000];
    var m60 = [60,9000,12000,7400,46,3400];
    var m61 = [61,9500,12700,7700,47,3700];
    var m62 = [62,10000,13400,8000,48,4000];
    var m64 = [64,10800,14400,8400,51,4400];
    var m65 = [65,11500,15300,8700,52,4700];
    var m66 = [66,12000,16000,9000,53,5000];
    var m68 = [68,12500,16700,9400,56,5400];
    var m69 = [69,13000,17400,9700,57,5700];
    var m70 = [70,14000,18600,10000,58,6000];
    var m72 = [72,15000,20000,10400,61,6400];
    var m73 = [73,16000,21500,10700,62,6700];
    var m74 = [74,17000,23000,11000,63,7000];
    var m76 = [76,18000,24000,11400,66,7400];
    var m77 = [77,20000,27000,11700,67,7700];
    var m78 = [78,22000,29500,12000,68,8000];
    var m80 = [80,30000,41000,13000,73,8400];
    var m81 = [81,38000,51000,13500,76,8700];
    var m82 = [82,45000,60000,14000,79,9000];
    var m84 = [84,100000,150000,14000,85,9500];
    var m85 = [85,160000,240000,15000,90,10000];
    var m86 = [86,240000,360000,16000,95,10500];
    var m88 = [88,300000,450000,16500,105,11000];
    var m89 = [89,360000,520000,17000,110,11500];
    var m90 = [90,400000,600000,17500,115,12000];
    var m92 = [92,500000,750000,18000,125,13000];
    var m93 = [93,600000,880000,18500,130,13500];
    var m94 = [94,700000,1000000,19000,135,14000];
    var m96 = [96,800000,1200000,19500,145,15000];
    var m97 = [97,900000,1350000,20000,150,15500];
    var m98 = [98,1000000,1500000,20500,155,16000];
    var m100 = [100,1200000,1800000,21000,165,16500];
    var m101 = [101,1400000,2100000,21500,170,17000];
    var m102 = [102,1600000,2400000,22000,175,17500];
    var m104 = [104,1800000,2700000,22500,185,18000];
    var m105 = [105,2000000,3000000,23000,190,18500];
    var m106 = [106,2200000,3300000,23500,195,19000];
    var m108 = [108,2400000,3600000,24000,205,19500];
    var m109 = [109,2600000,3900000,24500,210,20000];
    var m110 = [110,2800000,4200000,25000,215,20500];
    var m112 = [112,3000000,4500000,25500,225,21000];
    var m113 = [113,3200000,4800000,26000,230,21500];
    var m114 = [114,3400000,5100000,26500,235,22000];
    var m116 = [116,3500000,5250000,27000,245,22500];
    var m117 = [117,3600000,5400000,27500,250,23000];
    var m118 = [118,3700000,5550000,28000,255,23500];
    var m120 = [120,3800000,5700000,28500,265,24000];
    var m121 = [121,3900000,5850000,29000,270,24500];
    var m122 = [122,4000000,6000000,29500,275,25000];
    var m124 = [124,4200000,6300000,30000,285,25500];
    var m125 = [125,4400000,6600000,30500,290,26000];
    var m126 = [126,4600000,6900000,31000,295,26500];
    var m128 = [128,4800000,7200000,31500,305,27000];
    var m129 = [129,5000000,7500000,32000,310,27500];
    var m130 = [130,5200000,7800000,32500,315,28000];
    var m132 = [132,5400000,8100000,33000,325,28500];
    var m133 = [133,5600000,8400000,33500,330,29000];
    var m134 = [134,5800000,8700000,34000,335,29500];
    var m136 = [136,6100000,9150000,34500,345,30000];
    var m137 = [137,6400000,9600000,35000,350,30500];
    var m138 = [138,6700000,10050000,35500,355,31000];
    var m140 = [140,7000000,10500000,36000,365,31500];
    var m141 = [141,7300000,10950000,36500,370,32000];
    var m142 = [142,7600000,11400000,37000,375,32500];
    var m144 = [144,8000000,12000000,37500,385,33000];
    var m145 = [145,8500000,12750000,38000,390,33500];
    var m146 = [146,9000000,13500000,38500,395,34000];
    var m148 = [148,9600000,14400000,39000,405,35000];
    var m149 = [149,10200000,15300000,39500,410,35500];
    var m150 = [150,11000000,16500000,40000,415,36000];
    var m152 = [152,12000000,18000000,40500,425,37000];
    var m154 = [154,13000000,19500000,41000,430,37500];
    var m155 = [155,14000000,21000000,41500,435,38000];
    var m157 = [157,15000000,22500000,42000,445,39000];
    var m159 = [159,16000000,24000000,42500,450,39500];
    var m160 = [160,17000000,25500000,43000,455,40000];
    var m162 = [162,18000000,27000000,43600,465,41000];
    var m163 = [163,20000000,30000000,44200,470,41500];
    var m164 = [164,22000000,33000000,44800,475,42000];
    var m166 = [166,24000000,36000000,45400,485,43000];
    var m167 = [167,26000000,39000000,46000,490,43500];
    var m168 = [168,28000000,42000000,46600,495,44000];
    var m170 = [170,30000000,45000000,47200,505,45000];
    var m171 = [171,32000000,48000000,47800,510,45500];
    var m172 = [172,34000000,51000000,48400,515,46000];
    var m174 = [174,36000000,54000000,49000,525,47000];
    var m175 = [175,38000000,57000000,49600,530,47500];
    var m176 = [176,40000000,60000000,50200,535,48000];
    var m178 = [178,43000000,64500000,50800,545,49000];
    var m179 = [179,46000000,69000000,51400,550,49500];
    var m180 = [180,49000000,73500000,52000,555,50000];
    var m182 = [182,52000000,78000000,52700,565,51000];
    var m183 = [183,56000000,84000000,53400,570,51500];
    var m184 = [184,60000000,90000000,54100,575,52000];
    var m186 = [186,65000000,97500000,54800,585,53000];
    var m187 = [187,70000000,105000000,55500,590,53500];
    var m188 = [188,75000000,112500000,56200,595,54000];
    var m190 = [190,80000000,120000000,57000,605,55000];
    var m191 = [191,85000000,127500000,57800,610,55500];
    var m192 = [192,90000000,135000000,58600,615,56000];
    var m194 = [194,95000000,142500000,59400,625,57000];
    var m195 = [195,100000000,150000000,60200,630,57500];
    var m196 = [196,105000000,157500000,61000,635,58000];
    var m198 = [198,110000000,165000000,61900,645,59000];
    var m199 = [199,115000000,172500000,62800,650,59500];
    var m200 = [200,120000000,180000000,63700,655,60000];
    var m202 = [202,125000000,187500000,64600,665,61000];
    var m203 = [203,130000000,195000000,65500,670,61500];
    var m204 = [204,135000000,202500000,66400,675,62000];
    var m206 = [206,140000000,210000000,67300,685,62500];
    var m207 = [207,145000000,217500000,68200,690,63000];
    var m208 = [208,150000000,225000000,69100,695,63500];
    var m209 = [209,155000000,232500000,70000,700,64000];
    var m210 = [210,160000000,240000000,71000,705,64500];
    var m211 = [211,165000000,247500000,72000,710,65000];
    var m212 = [212,170000000,255000000,73000,715,65500];
    var m213 = [213,175000000,262500000,74000,720,66000];
    var m214 = [214,180000000,270000000,75000,725,66500];
    var m215 = [215,185000000,277500000,76000,730,67000];
    var m216 = [216,190000000,285000000,77000,735,67500];
    var m217 = [217,195000000,292500000,78000,740,68000];
    var m218 = [218,200000000,300000000,79000,745,68500];
    var m219 = [219,205000000,307500000,80000,750,69000];
    var m220 = [220,210000000,315000000,81000,755,69500];
    var m221 = [221,215000000,322500000,82000,760,70000];
    var m222 = [222,220000000,330000000,83000,765,70500];
    var m223 = [223,225000000,337500000,84000,770,71000];
    var m224 = [224,230000000,345000000,85000,775,71500];
    var m225 = [225,235000000,352500000,86000,780,72000];
    var m227 = [227,240000000,360000000,87000,800,72500];
    var m228 = [228,245000000,367500000,88000,810,73000];
    var m229 = [229,250000000,375000000,89000,820,73500];
    var m230 = [230,255000000,382500000,90000,830,74000];
    var m231 = [231,260000000,390000000,91000,840,74500];
    var m232 = [232,265000000,397500000,92000,850,75000];
    var m233 = [233,270000000,405000000,93000,860,75500];
    var m234 = [234,275000000,412500000,94000,870,76000];
    var m235 = [235,280000000,420000000,95000,880,76500];
    var m236 = [236,285000000,427500000,96000,890,77000];
    var m237 = [237,290000000,435000000,97000,900,77500];
    var m238 = [238,295000000,442500000,98000,910,78000];
    var m239 = [239,300000000,450000000,99000,920,78500];
    var m240 = [240,305000000,457500000,100000,930,79000];
    var m241 = [241,310000000,465000000,101000,940,79500];
    var m242 = [242,315000000,472500000,102000,950,80000];
    var m243 = [243,320000000,480000000,103000,960,80500];
    var m244 = [244,325000000,487500000,104000,970,81000];
    var m247 = [247,330000000,495000000,105000,990,81500];
    var m248 = [248,335000000,502500000,106000,1000,82000];
    var m249 = [249,340000000,510000000,107000,1010,82500];
    var m250 = [250,345000000,517500000,108000,1020,83000];
    var m251 = [251,350000000,525000000,109000,1030,83500];
    var m252 = [252,355000000,532500000,110000,1040,84000];
    var m253 = [253,360000000,540000000,111000,1050,84500];
    var m254 = [254,365000000,547500000,112000,1060,85000];
    var m255 = [255,370000000,555000000,113000,1070,85500];
    var m257 = [257,375000000,562500000,114000,1090,86000];
    var m258 = [258,380000000,570000000,115000,1100,86500];
    var m259 = [259,385000000,577500000,116000,1110,87000];
    var m261 = [261,390000000,585000000,117000,1130,87500];
    var m262 = [262,400000000,600000000,118000,1140,88000];
    var m263 = [263,410000000,615000000,119000,1150,88500];
    var m264 = [264,420000000,630000000,120000,1160,89000];
    var m266 = [266,430000000,645000000,121000,1180,89500];
    var m267 = [267,440000000,660000000,122000,1190,90000];
    var m268 = [268,450000000,675000000,123000,1200,90500];
    var m269 = [269,460000000,690000000,124000,1210,91000];
    var m271 = [271,470000000,705000000,125000,1230,91500];
    var m272 = [272,480000000,720000000,126000,1240,92000];
    var m273 = [273,490000000,735000000,127000,1250,92500];
    var m274 = [274,500000000,750000000,128000,1260,93000];
    var m276 = [276,510000000,765000000,129000,1280,93500];
    var m277 = [277,520000000,780000000,130000,1290,94000];
    var m278 = [278,530000000,795000000,131000,1300,94500];
    var m279 = [279,540000000,810000000,132000,1310,95000];
    var m281 = [281,550000000,825000000,133000,1330,95500];
    var m282 = [282,560000000,840000000,134000,1340,96000];
    var m283 = [283,570000000,855000000,135000,1350,96500];
    var m284 = [284,580000000,870000000,136000,1360,97000];
    var m288 = [288,590000000,885000000,137000,1380,97500];
    var m289 = [289,600000000,900000000,138000,1390,98000];
    var m291 = [291,620000000,930000000,139000,1400,98500];
    var m293 = [293,640000000,960000000,140000,1410,99000];
    var m295 = [295,660000000,990000000,141000,1430,99500];
    var m296 = [296,680000000,1020000000,142000,1440,100000];
    var m297 = [297,700000000,1050000000,143000,1450,101000];
    var m298 = [298,720000000,1080000000,144000,1460,102000];
    var m300 = [300,740000000,1110000000,145000,1480,103000];
    var m301 = [301,760000000,1140000000,146000,1490,104000];
    var m302 = [302,780000000,1170000000,147000,1500,105000];
    var m303 = [303,800000000,1200000000,148000,1510,106000];
    var m305 = [305,820000000,1230000000,149000,1530,107000];
    var m306 = [306,840000000,1260000000,150000,1540,108000];
    var m307 = [307,860000000,1290000000,151000,1550,109000];
    var m308 = [308,880000000,1320000000,152000,1560,110000];
    var m311 = [311,925000000,1375000000,154000,1590,111000];
    var m312 = [312,950000000,1410000000,155000,1600,112000];
    var m313 = [313,975000000,1455000000,156000,1610,113000];
    var m314 = [314,1000000000,1500000000,157000,1620,114000];
    var m316 = [316,1050000000,1570000000,158000,1650,115000];
    var m317 = [317,1100000000,1650000000,159000,1660,116000];
    var m318 = [318,1150000000,1725000000,160000,1670,117000];
    var m319 = [319,1200000000,1800000000,162000,1680,118000];
    var m322 = [322,1250000000,1875000000,164000,1710,119000];
    var m323 = [323,1300000000,1950000000,166000,1720,120000];
    var m324 = [324,1350000000,2025000000,168000,1730,121000];
    var m325 = [325,1400000000,2100000000,170000,1740,122000];
    var m328 = [328,1450000000,2175000000,172000,1780,123000];
    var m329 = [329,1500000000,2230000000,174000,1800,124000];
    var m330 = [330,1550000000,2285000000,176000,1820,125000];
    var m332 = [332,1600000000,2340000000,178000,1840,126000];
    var m334 = [334,1650000000,2395000000,180000,1880,127000];
    var m335 = [335,1700000000,2450000000,182000,1900,128000];
    var m336 = [336,1750000000,2505000000,184000,1920,129000];
    var m337 = [337,1800000000,2560000000,186000,1940,130000];
    var m339 = [339,1850000000,2615000000,188000,1980,131000];
    var m340 = [340,1900000000,2670000000,190000,2000,132000];
    var m341 = [341,1950000000,2725000000,192000,2020,133000];
    var m342 = [342,2000000000,2780000000,194000,2040,134000];
    var m344 = [344,2060000000,2845000000,196000,2080,135000];
    var m345 = [345,2120000000,2910000000,198000,2100,136000];
    var m346 = [346,2180000000,2975000000,200000,2120,137000];
    var m347 = [347,2240000000,3040000000,202000,2140,138000];
    var m349 = [349,2300000000,3105000000,204000,2180,139000];
    var m350 = [350,2360000000,3170000000,206000,2200,140000];
    var m351 = [351,2420000000,3235000000,208000,2220,141000];
    var m352 = [352,2480000000,3300000000,210000,2240,142000];
    var m354 = [354,2520000000,3345000000,212000,2280,143000];
    var m355 = [355,2580000000,3410000000,214000,2300,144000];
    var m356 = [356,2640000000,3475000000,216000,2320,145000];
    var m357 = [357,2700000000,3540000000,218000,2340,146000];
    var m359 = [359,2800000000,4200000000,220000,2390,147000];
    var m360 = [360,2900000000,4350000000,226000,2420,148000];
    var m361 = [361,3000000000,4500000000,230000,2450,149000];
    var m362 = [362,3100000000,4650000000,234000,2480,150000];
    var m365 = [365,3500000000,5250000000,240000,2520,151000];
    var m366 = [366,4000000000,6000000000,250000,2560,152000];
    var m367 = [367,4500000000,6750000000,260000,2580,153000];
    var m368 = [368,5000000000,7500000000,280000,2600,154000];
    var m370 = [370,6000000000,9000000000,300000,2650,155000];
    var m371 = [371,7000000000,10500000000,330000,2700,156000];
    var m372 = [372,8000000000,12000000000,400000,2800,157000];
    var m373 = [373,9000000000,13500000000,450000,2900,158000];
    var m374 = [374,10000000000,15000000000,500000,3000,159000];
    var m375 = [375,12000000000,18000000000,550000,3100,160000];
    var m376 = [376,14000000000,21000000000,600000,3200,161000];
    var m377 = [377,16000000000,24000000000,650000,3300,162000];
    var m378 = [378,18000000000,27000000000,700000,3400,163000];
    var m379 = [379,20000000000,30000000000,750000,3500,164000];
    var m380 = [380,22000000000,33000000000,800000,3600,165000];
    var m381 = [381,25000000000,37500000000,850000,3700,166000];
    var m382 = [382,28000000000,42000000000,900000,3800,167000];
    var m383 = [383,32000000000,48000000000,950000,3900,168000];
    var m384 = [384,36000000000,54000000000,1000000,4000,169000];
    var m385 = [385,40000000000,60000000000,1050000,4100,170000];
    var m386 = [386,45000000000,67500000000,1100000,4200,171000];
    var m387 = [387,50000000000,75000000000,1150000,4300,172000];
    var m388 = [388,55000000000,82500000000,1200000,4400,174000];
    var m389 = [389,60000000000,90000000000,1250000,4550,176000];
    var m390 = [390,65000000000,97500000000,1300000,4700,178000];
    var m392 = [392,70000000000,105000000000,1350000,4850,180000];
    var m396 = [396,75000000000,112500000000,1400000,5000,182000];
    var m405 = [405,110000000000,166000000000,2100000,7500,186000];
    var m409 = [409,150000000000,225000000000,2800000,10000,190000];
    var m410 = [410,200000000000,300000000000,3600000,12500,194000];
    var m413 = [413,250000000000,375000000000,4500000,15000,198000];
    var m420 = [420,300000000000,450000000000,5400000,17500,202000];
    var m427 = [427,350000000000,525000000000,6400000,20000,206000];
    var m430 = [430,455000000000,682500000000,8320000,26000,210000];
    var m434 = [434,590000000000,885000000000,10800000,34000,214000];
    var m435 = [435,767000000000,1150500000000,14040000,44200,218000];
    var m437 = [437,997100000000,1495650000000,18250000,57460,222000];
    var m438 = [438,1296230000000,1944340000000,23725000,74700,226000];
    var m439 = [439,1685099000000,2527639000000,30842500,97110,230000];
    mdata[0] = m1;
    mdata[1] = m2;
    mdata[2] = m3;
    mdata[3] = m4;
    mdata[4] = m5;
    mdata[5] = m6;
    mdata[6] = m8;
    mdata[7] = m9;
    mdata[8] = m10;
    mdata[9] = m12;
    mdata[10] = m13;
    mdata[11] = m14;
    mdata[12] = m16;
    mdata[13] = m17;
    mdata[14] = m18;
    mdata[15] = m20;
    mdata[16] = m21;
    mdata[17] = m22;
    mdata[18] = m24;
    mdata[19] = m25;
    mdata[20] = m26;
    mdata[21] = m28;
    mdata[22] = m29;
    mdata[23] = m30;
    mdata[24] = m32;
    mdata[25] = m33;
    mdata[26] = m34;
    mdata[27] = m36;
    mdata[28] = m37;
    mdata[29] = m38;
    mdata[30] = m40;
    mdata[31] = m41;
    mdata[32] = m42;
    mdata[33] = m44;
    mdata[34] = m45;
    mdata[35] = m46;
    mdata[36] = m48;
    mdata[37] = m49;
    mdata[38] = m50;
    mdata[39] = m52;
    mdata[40] = m53;
    mdata[41] = m54;
    mdata[42] = m56;
    mdata[43] = m57;
    mdata[44] = m58;
    mdata[45] = m60;
    mdata[46] = m61;
    mdata[47] = m62;
    mdata[48] = m64;
    mdata[49] = m65;
    mdata[50] = m66;
    mdata[51] = m68;
    mdata[52] = m69;
    mdata[53] = m70;
    mdata[54] = m72;
    mdata[55] = m73;
    mdata[56] = m74;
    mdata[57] = m76;
    mdata[58] = m77;
    mdata[59] = m78;
    mdata[60] = m80;
    mdata[61] = m81;
    mdata[62] = m82;
    mdata[63] = m84;
    mdata[64] = m85;
    mdata[65] = m86;
    mdata[66] = m88;
    mdata[67] = m89;
    mdata[68] = m90;
    mdata[69] = m92;
    mdata[70] = m93;
    mdata[71] = m94;
    mdata[72] = m96;
    mdata[73] = m97;
    mdata[74] = m98;
    mdata[75] = m100;
    mdata[76] = m101;
    mdata[77] = m102;
    mdata[78] = m104;
    mdata[79] = m105;
    mdata[80] = m106;
    mdata[81] = m108;
    mdata[82] = m109;
    mdata[83] = m110;
    mdata[84] = m112;
    mdata[85] = m113;
    mdata[86] = m114;
    mdata[87] = m116;
    mdata[88] = m117;
    mdata[89] = m118;
    mdata[90] = m120;
    mdata[91] = m121;
    mdata[92] = m122;
    mdata[93] = m124;
    mdata[94] = m125;
    mdata[95] = m126;
    mdata[96] = m128;
    mdata[97] = m129;
    mdata[98] = m130;
    mdata[99] = m132;
    mdata[100] = m133;
    mdata[101] = m134;
    mdata[102] = m136;
    mdata[103] = m137;
    mdata[104] = m138;
    mdata[105] = m140;
    mdata[106] = m141;
    mdata[107] = m142;
    mdata[108] = m144;
    mdata[109] = m145;
    mdata[110] = m146;
    mdata[111] = m148;
    mdata[112] = m149;
    mdata[113] = m150;
    mdata[114] = m152;
    mdata[115] = m154;
    mdata[116] = m155;
    mdata[117] = m157;
    mdata[118] = m159;
    mdata[119] = m160;
    mdata[120] = m162;
    mdata[121] = m163;
    mdata[122] = m164;
    mdata[123] = m166;
    mdata[124] = m167;
    mdata[125] = m168;
    mdata[126] = m170;
    mdata[127] = m171;
    mdata[128] = m172;
    mdata[129] = m174;
    mdata[130] = m175;
    mdata[131] = m176;
    mdata[132] = m178;
    mdata[133] = m179;
    mdata[134] = m180;
    mdata[135] = m182;
    mdata[136] = m183;
    mdata[137] = m184;
    mdata[138] = m186;
    mdata[139] = m187;
    mdata[140] = m188;
    mdata[141] = m190;
    mdata[142] = m191;
    mdata[143] = m192;
    mdata[144] = m194;
    mdata[145] = m195;
    mdata[146] = m196;
    mdata[147] = m198;
    mdata[148] = m199;
    mdata[149] = m200;
    mdata[150] = m202;
    mdata[151] = m203;
    mdata[152] = m204;
    mdata[153] = m206;
    mdata[154] = m207;
    mdata[155] = m208;
    mdata[156] = m209;
    mdata[157] = m210;
    mdata[158] = m211;
    mdata[159] = m212;
    mdata[160] = m213;
    mdata[161] = m214;
    mdata[162] = m215;
    mdata[163] = m216;
    mdata[164] = m217;
    mdata[165] = m218;
    mdata[166] = m219;
    mdata[167] = m220;
    mdata[168] = m221;
    mdata[169] = m222;
    mdata[170] = m223;
    mdata[171] = m224;
    mdata[172] = m225;
    mdata[173] = m227;
    mdata[174] = m228;
    mdata[175] = m229;
    mdata[176] = m230;
    mdata[177] = m231;
    mdata[178] = m232;
    mdata[179] = m233;
    mdata[180] = m234;
    mdata[181] = m235;
    mdata[182] = m236;
    mdata[183] = m237;
    mdata[184] = m238;
    mdata[185] = m239;
    mdata[186] = m240;
    mdata[187] = m241;
    mdata[188] = m242;
    mdata[189] = m243;
    mdata[190] = m244;
    mdata[191] = m247;
    mdata[192] = m248;
    mdata[193] = m249;
    mdata[194] = m250;
    mdata[195] = m251;
    mdata[196] = m252;
    mdata[197] = m253;
    mdata[198] = m254;
    mdata[199] = m255;
    mdata[200] = m257;
    mdata[201] = m258;
    mdata[202] = m259;
    mdata[203] = m261;
    mdata[204] = m262;
    mdata[205] = m263;
    mdata[206] = m264;
    mdata[207] = m266;
    mdata[208] = m267;
    mdata[209] = m268;
    mdata[210] = m269;
    mdata[211] = m271;
    mdata[212] = m272;
    mdata[213] = m273;
    mdata[214] = m274;
    mdata[215] = m276;
    mdata[216] = m277;
    mdata[217] = m278;
    mdata[218] = m279;
    mdata[219] = m281;
    mdata[220] = m282;
    mdata[221] = m283;
    mdata[222] = m284;
    mdata[223] = m288;
    mdata[224] = m289;
    mdata[225] = m291;
    mdata[226] = m293;
    mdata[227] = m295;
    mdata[228] = m296;
    mdata[229] = m297;
    mdata[230] = m298;
    mdata[231] = m300;
    mdata[232] = m301;
    mdata[233] = m302;
    mdata[234] = m303;
    mdata[235] = m305;
    mdata[236] = m306;
    mdata[237] = m307;
    mdata[238] = m308;
    mdata[239] = m311;
    mdata[240] = m312;
    mdata[241] = m313;
    mdata[242] = m314;
    mdata[243] = m316;
    mdata[244] = m317;
    mdata[245] = m318;
    mdata[246] = m319;
    mdata[247] = m322;
    mdata[248] = m323;
    mdata[249] = m324;
    mdata[250] = m325;
    mdata[251] = m328;
    mdata[252] = m329;
    mdata[253] = m330;
    mdata[254] = m332;
    mdata[255] = m334;
    mdata[256] = m335;
    mdata[257] = m336;
    mdata[258] = m337;
    mdata[259] = m339;
    mdata[260] = m340;
    mdata[261] = m341;
    mdata[262] = m342;
    mdata[263] = m344;
    mdata[264] = m345;
    mdata[265] = m346;
    mdata[266] = m347;
    mdata[267] = m349;
    mdata[268] = m350;
    mdata[269] = m351;
    mdata[270] = m352;
    mdata[271] = m354;
    mdata[272] = m355;
    mdata[273] = m356;
    mdata[274] = m357;
    mdata[275] = m359;
    mdata[276] = m360;
    mdata[277] = m361;
    mdata[278] = m362;
    mdata[279] = m365;
    mdata[280] = m366;
    mdata[281] = m367;
    mdata[282] = m368;
    mdata[283] = m370;
    mdata[284] = m371;
    mdata[285] = m372;
    mdata[286] = m373;
    mdata[287] = m374;
    mdata[288] = m375;
    mdata[289] = m376;
    mdata[290] = m377;
    mdata[291] = m378;
    mdata[292] = m379;
    mdata[293] = m380;
    mdata[294] = m381;
    mdata[295] = m382;
    mdata[296] = m383;
    mdata[297] = m384;
    mdata[298] = m385;
    mdata[299] = m386;
    mdata[300] = m387;
    mdata[301] = m388;
    mdata[302] = m389;
    mdata[303] = m390;
    mdata[304] = m392;
    mdata[305] = m396;
    mdata[306] = m405;
    mdata[307] = m409;
    mdata[308] = m410;
    mdata[309] = m413;
    mdata[310] = m420;
    mdata[311] = m427;
    mdata[312] = m430;
    mdata[313] = m434;
    mdata[314] = m435;
    mdata[315] = m437;
    mdata[316] = m438;
    mdata[317] = m439;

    window.auto_guaji = function(){
        var kunpeng = $("#div_kunpeng_zhaohuan_action")[0].style.display=='none'? 2 : 1;
        var gongjiText = $('#span_gongji_flow_renwu_shuxing')[0].innerText;

        var gongji = parseInt(gongjiText.substring(0,gongjiText.indexOf('-'))) * kunpeng;
        var fangyu = parseInt($('#span_fangyu_flow_renwu_shuxing')[0].innerText);
        var huixue = parseInt($('#span_shengming_huifu_flow_renwu_shuxing')[0].innerText);
        var shengming = parseInt($('#span_shengming_flow_renwu_shuxing')[0].innerText);

        var maxNanDu = 30;
        if($('#div_jingyinghao_next_renzheng')[0].style.display!="none"){
           maxNanDu = 450;
        }else if($('#div_guhuihao_renzheng')[0].style.display!="none"){
           maxNanDu = 300;
        }else if($('#div_diaozhatian_renzheng')[0].style.display!="none"){
           maxNanDu = 150;
        }else if($('#div_diaobaohao_renzheng')[0].style.display!="none"){
           maxNanDu = 100;
        }else if($('#div_chaodiaohao_renzheng')[0].style.display!="none"){
           maxNanDu = 75;
        }else if($('#div_chaoshenhao_renzheng')[0].style.display!="none"){
           maxNanDu = 50;
        }else if($('#div_jingyinghao_renzheng')[0].style.display!="none"){
           maxNanDu = 30;
        }
        if($('#span_yueka_time')[0].innerText!="已到期"){
           maxNanDu += 50;
        }

        var bianhao,gong,xueliang,fang,money,busi,zuigao,nandu,max_money = 0,max_nandu = 0,max_bianhao;
        for(var i = 0; i < 317; i++){
            bianhao = mdata[i][0];
            gong = (mdata[i][1]+mdata[i][2]) / 2;
            xueliang = mdata[i][3];
            fang = mdata[i][4];
            money = mdata[i][5];
            if(fangyu*huixue/gong<10){
                busi = 0;
            }else{
                busi = Math.floor((xueliang+huixue*17280)*fangyu/gong/17280)-9 > maxNanDu ? maxNanDu : Math.floor((xueliang+huixue*17280)*fangyu/gong/17280)-9;
            }
            if(gongji/xueliang/fang<1){
                zuigao = 0;
            }else{
                zuigao = Math.floor(Math.sqrt(gongji/xueliang/fang)*10)-9 > maxNanDu ? maxNanDu : Math.floor(Math.sqrt(gongji/xueliang/fang)*10)-9;
            }
            nandu = busi > zuigao ? zuigao : busi;

            if (nandu!=0 && money * (nandu/10 + 0.9) >= max_money){
                max_money = money * (nandu/10 + 0.9);
                max_nandu = nandu;
                max_bianhao = bianhao;
            }
        }
        set_difficulty_other_set(max_nandu);
        create_monster_fight_check(max_bianhao);
    }

    $('#yijian').click(function(){
        show_div_map_npc_check('精英号');
        $('#div_jingyinghao').hide();
        show_div_map_npc_check('月卡');
        $('#div_yueka').hide();
        show_div_map_npc_check('鲲鹏召唤');
        $('#div_kunpeng_zhaohuan').hide();
        show_flow_renwu_shuxing_check();
        $('#div_renwu_shuxing').hide();
        setTimeout('auto_guaji()',500);
    })

    var saodang_div = document.createElement('div');
    var saodang_html = '<div>';
	    saodang_html+= '<div style="text-align:left; line-height:40px;">';
	    saodang_html+= '<div style="float:left; width:100px; text-align:right;">扫荡等级：</div>';
        saodang_html+= '<div style="float:left;padding-top:10px;">';
        saodang_html+= '<input type="text" value="" style="width: 120px;" id="saodang_dengji" />';
        saodang_html+= '</div>';
        saodang_html+= '<div style="clear:both;"></div>';
	    saodang_html+= '</div>';
	    saodang_html+= '<div style="text-align:left; line-height:40px;">';
	    saodang_html+= '<div style="float:left; width:100px; text-align:right;">购买次数：</div>';
        saodang_html+= '<div style="float:left;padding-top:10px;">';
        saodang_html+= '<input type="text" value="" style="width: 120px;" id="saodang_cishu" />';
        saodang_html+= '</div>';
        saodang_html+= '<div style="clear:both;"></div>';
	    saodang_html+= '</div>';
	    saodang_html+= '<div style="text-align:center;padding-top:18px;">';
	    saodang_html+= '<button class="button6"  onclick="saodang()">扫荡</button>&nbsp;&nbsp;&nbsp;&nbsp;';
	    saodang_html+= '<button class="button6"  onclick="guanbi()">关闭</button>';
	    saodang_html+= '</div>';
	    saodang_html+= '</div>';
    saodang_div.innerHTML = saodang_html;
    var cssStr = "z-index:10000;width:250px; height:165px;background-color:#012525;border:1px solid black;position:absolute;left:475px;top:250px;";
    saodang_div.style.cssText = cssStr;
    saodang_div.id = "saodang_div";
    document.body.insertBefore(saodang_div,document.body.firstChild);
    document.getElementById("saodang_div").style.display = "none";

    $('#huanjing').click(function(){
       document.getElementById("saodang_div").style.display = "block";
    })

    window.guanbi = function(){
        document.getElementById("saodang_div").style.display = "none";
    }

    window.saodang = function(){
        var dengji = parseInt(document.getElementById('saodang_dengji').value);
        var cishu = parseInt(document.getElementById('saodang_cishu').value);
        var ids;
        switch(dengji){
            case 15:ids = 7;break;
            case 20:ids = 11;break;
            case 25:ids = 15;break;
            case 30:ids = 19;break;
            case 35:ids = 23;break;
            case 40:ids = 27;break;
            case 45:ids = 31;break;
            case 50:ids = 35;break;
            case 55:ids = 39;break;
            case 60:ids = 43;break;
            case 65:ids = 47;break;
            case 70:ids = 51;break;
            case 75:ids = 55;break;
            case 80:ids = 59;break;
            case 85:ids = 63;break;
            case 90:ids = 67;break;
            case 95:ids = 71;break;
            case 100:ids = 75;break;
            case 101:ids = 83;break;
            case 102:ids = 87;break;
            case 103:ids = 91;break;
            case 104:ids = 95;break;
            case 105:ids = 99;break;
            case 106:ids = 103;break;
            case 107:ids = 107;break;
            case 108:ids = 111;break;
            case 109:ids = 115;break;
            case 110:ids = 119;break;
            case 111:ids = 123;break;
            case 112:ids = 127;break;
            case 113:ids = 131;break;
            case 114:ids = 135;break;
            case 115:ids = 139;break;
            case 116:ids = 143;break;
            case 117:ids = 147;break;
            case 118:ids = 151;break;
            case 119:ids = 156;break;
            case 120:ids = 161;break;
            case 121:ids = 165;break;
            case 122:ids = 169;break;
            case 123:ids = 173;break;
            case 124:ids = 177;break;
            case 125:ids = 181;break;
            case 126:ids = 185;break;
            case 127:ids = 189;break;
            case 128:ids = 193;break;
            case 129:ids = 197;break;
            case 130:ids = 201;break;
            case 131:ids = 205;break;
            case 152:ids = 226;break;
            case 171:ids = 246;break;
            case 181:ids = 256;break;
            case 185:ids = 260;break;
            case 190:ids = 265;break;
            case 195:ids = 270;break;
            case 200:ids = 275;break;
            case 205:ids = 280;break;
            case 210:ids = 287;break;
            case 215:ids = 294;break;
            case 220:ids = 299;break;
            case 225:ids = 304;break;
            case 230:ids = 309;break;
            case 235:ids = 315;break;
            case 240:ids = 321;break;
            case 245:ids = 327;break;
            case 250:ids = 333;break;
            case 255:ids = 338;break;
            case 260:ids = 343;break;
            case 265:ids = 348;break;
            case 270:ids = 353;break;
            case 275:ids = 358;break;
            case 280:ids = 363;break;
            case 300:ids = 364;break;
            case 305:ids = 365;break;
            case 310:ids = 367;break;
            case 315:ids = 369;break;
            case 320:ids = 370;break;
            case 330:ids = 371;break;
            case 340:ids = 372;break;
            case 350:ids = 373;break;
            case 360:ids = 374;break;
            case 380:ids = 375;break;
            case 390:ids = 376;break;
            case 400:ids = 377;break;
            case 410:ids = 378;break;
            default:ids = 0;break;
        }

        if (ids == 0){
            alert("等级输入错误！");
            return;
        }

        for(var i = 0; i < cishu; i++){
            setTimeout('huanjing_maoxian_goumai_cishu()',100);
            setTimeout('huanjing_saodang('+ids+',450)',100);
        }
    }

})();