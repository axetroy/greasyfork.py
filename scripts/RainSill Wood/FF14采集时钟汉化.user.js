// ==UserScript==
// @name		 FF14采集时钟汉化
// @namespace	undefined
// @version	  0.36
// @description  挖穿海德林必备
// @author	   铃音&Sagitta Luminis
// @match		*://ffxiv.gt.exdreams.net/*
// @grant		none
// ==/UserScript==

(function() {
	'use strict';
    //更新精选信息
reduceMap = [
	{"name": "微光の霊砂", "list" :[
		{"name": "ファイアグラベル", "shard": "ファイア", "isFishing": false },
		{"name": "ライトニンググラベル", "shard": "ライトニング", "isFishing": false },
		{"name": "オレガノ", "shard": "ウィンド", "isFishing": false },
		{"name": "赤玉土", "shard": "アース", "isFishing": false },
		{"name": "ドラヴァニアンバス", "shard": "ウォーター", "isFishing": true },
		{"name": "マナセイル", "shard": "アイス", "isFishing": true },
	]},
	{"name": "暁光の霊砂", "list" :[
		{"name": "強火性岩", "shard": "ファイア", "isFishing": false },
		{"name": "強雷性岩", "shard": "ライトニング", "isFishing": false },
		{"name": "スペアミント", "shard": "ウィンド", "isFishing": false },
		{"name": "ピートモス", "shard": "アース", "isFishing": false },
		{"name": "カイマン", "shard": "ウォーター", "isFishing": true },
		{"name": "プテラノドン", "shard": "アイス", "isFishing": true },
	]},
	{"name": "大地の霊砂", "list" :[
		{"name": "レイディアントファイアグラベル", "shard": "ファイア", "isFishing": false },
		{"name": "レイディアントライトニンググラベル", "shard": "ライトニング", "isFishing": false },
	]},
	{"name": "大樹の霊砂", "list" :[
		{"name": "クラリーセージ", "shard": "ウィンド", "isFishing": false },
		{"name": "黒土", "shard": "アース", "isFishing": false },
	]},
	{"name": "大海の霊砂", "list" :[
		{"name": "サリャクカイマン", "shard": "ウォーター", "isFishing": true },
		{"name": "トゥプクスアラ", "shard": "アイス", "isFishing": true },
	]},
	{"name": "白光の霊砂", "list" :[
		{"name": "レイディアントアストラルグラベル", "shard": "ウォーター,アイス", "isFishing": false },
		{"name": "メネフィナローレル", "shard": "ウォーター,アイス", "isFishing": false },
	]},
	{"name": "極光の霊砂", "list" :[
		{"name": "ショール", "shard": "ライトニング", "isFishing": false },
		{"name": "風茶葉", "shard": "ウィンド", "isFishing": false },
		{"name": "ズワイガニ", "shard": "ウォーター", "isFishing": true },
	]},
	{"name": "悠久の霊砂", "list" :[
		{"name": "パーライト", "shard": "ウォーター", "isFishing": false },
	]},
	{"name": "豊穣の霊砂", "list" :[
		{"name": "トレヤの枝", "shard": "アイス", "isFishing": false },
	]},
	{"name": "深淵の霊砂", "list" :[
		{"name": "スウェットフィッシュ", "shard": "ウォーター", "isFishing": true },
	]},
	{"name": "夜光の霊砂", "list" :[
		{"name": "アルマンディン", "shard": "ファイア", "isFishing": false },
		{"name": "黄土", "shard": "アース", "isFishing": false },
		{"name": "アジモドキ", "shard": "アイス", "isFishing": true },
	]},
	{"name": "黄昏の霊砂", "list" :[
		{"name": "ヤンサバーベナ", "shard": "ウィンド", "isFishing": false },
		{"name": "ヤンサ沃土", "shard": "ウォーター", "isFishing": false },
	]},
];

reduceLangMap = {
	"ファイア": {"itemId": "0", "icon": "c1554dc1e03eff5eaac0f467e1ee0364744d628f.png", "jp": "ファイア", "en": "Fire", "fr": "feu", "de": "Feuer"},
	"アイス": {"itemId": "0", "icon": "87f4ebd1c4df2909aba2c75b8e0e8bda5b8c890f.png", "jp": "アイス", "en": "Ice", "fr": "glace", "de": "Eis"},
	"ウィンド": {"itemId": "0", "icon": "d9c5efb996a4bab98f43db375b6329833affcd64.png", "jp": "ウィンド", "en": "Wind", "fr": "vent", "de": "Wind"},
	"アース": {"itemId": "0", "icon": "ea5f133b369126fd3046fab9542be90593da0b6c.png", "jp": "アース", "en": "Earth", "fr": "terre", "de": "Erd"},
	"ライトニング": {"itemId": "0", "icon": "1c3044929c10562eb7dc8c36dd133747790401f2.png", "jp": "ライトニング", "en": "Lightning", "fr": "foudre", "de": "Blitz"},
	"ウォーター": {"itemId": "0", "icon": "82d8e0b21935a0eff81db9f9d683db7242fedb73.png", "jp": "ウォーター", "en": "Water", "fr": "eau", "de": "Wasser"},
	"シャード": {"itemId": "0", "icon": "c1554dc1e03eff5eaac0f467e1ee0364744d628f.png", "jp": "シャード", "en": "Shard", "fr": "Éclat", "de": "scherbe"},
	"霊砂": {"itemId": "0", "icon": "7d1eb293bb6d31868c282312e7f4ae62c8368393.png", "jp": "霊砂", "en": "Aethersand", "fr": "Sable éthéréen", "de": "Seelensand"},
	"微光の霊砂": {"itemId": "2dfb34c4a45", "icon": "7d1eb293bb6d31868c282312e7f4ae62c8368393.png", "jp": "微光の霊砂", "en": "Duskborne Aethersand", "fr": "Sable éthéréen de l'aube", "de": "Abenddämmerungs-Seelensand"},
	"ファイアグラベル": {"itemId": "cfd0873f642", "icon": "700abce45f25428927dbd05443cf44bf6fffa277.png", "jp": "ファイアグラベル", "en": "Fire Moraine", "fr": "Granulat de feu", "de": "Feuerkies"},
	"ライトニンググラベル": {"itemId": "4c115a62e3c", "icon": "5fefb18109d8a3d6b8de2b1beaf8b907f0b3e1d2.png", "jp": "ライトニンググラベル", "en": "Lightning Moraine", "fr": "Granulat de foudre", "de": "Blitzkies"},
	"オレガノ": {"itemId": "026539a9c78", "icon": "e102ca8a0ce008bfaa5eaac791e4fee1ce5a7da3.png", "jp": "オレガノ", "en": "Highland Oregano", "fr": "Origan", "de": "Hochland-Oregano"},
	"赤玉土": {"itemId": "32c9183e261", "icon": "152594779bc07759ad7ff3b608398929f26321ed.png", "jp": "赤玉土", "en": "Granular Clay", "fr": "Argile granuleuse", "de": "Körniger Lehm"},
	"ドラヴァニアンバス": {"itemId": "52d1702bd8d", "icon": "707d62eb09d22643cbb106680df9f5c0dc29c435.png", "jp": "ドラヴァニアンバス", "en": "Dravanian Bass", "fr": "Bar dravanien", "de": "Dravanischer Barsch"},
	"マナセイル": {"itemId": "37a934c19c0", "icon": "4bd88ed1080a68537938b2a9a41ac2b4a8283452.png", "jp": "マナセイル", "en": "Manasail", "fr": "Voile-de-mana", "de": "Manasegler"},
	"暁光の霊砂": {"itemId": "65ad6bd3d1b", "icon": "5d083bfddc526ad6493721f3c45293e0d3ddfca5.png", "jp": "暁光の霊砂", "en": "Dawnborne Aethersand", "fr": "Sable éthéréen de l'aurore", "de": "Morgengrauen-Seelensand"},
	"強火性岩": {"itemId": "884fbb2e1a3", "icon": "c0894c8be9f616580b1517d0aa280edd0ac00c62.png", "jp": "強火性岩", "en": "Bright Fire Rock", "fr": "Pierre de feu intense", "de": "Leuchtender Feuergesteinsbrocken"},
	"強雷性岩": {"itemId": "a4335b495d2", "icon": "2d729da9a447c4e2759c59d248606095d90dcaa0.png", "jp": "強雷性岩", "en": "Bright Lightning Rock", "fr": "Pierre de foudre intense", "de": "Leuchtender Blitzgesteinsbrocken"},
	"スペアミント": {"itemId": "ef778de9100", "icon": "039c6eb70d38436de7f2709273a8ceb86a2cea68.png", "jp": "スペアミント", "en": "Furymint", "fr": "Menthe douce", "de": "Furienminze"},
	"ピートモス": {"itemId": "d6409d34015", "icon": "75e87c8819b1228f964b84bf59026617a96f1f5f.png", "jp": "ピートモス", "en": "Peat Moss", "fr": "Tourbe", "de": "Torfmoos"},
	"カイマン": {"itemId": "42c50a9cd0f", "icon": "9bb7602c9f0b92f12f0fa752b6ea5d21e16d1437.png", "jp": "カイマン", "en": "Caiman", "fr": "Caïman", "de": "Kaiman"},
	"プテラノドン": {"itemId": "50c81332813", "icon": "372c5ca2d7e6e3812b4f7858441b377b51272053.png", "jp": "プテラノドン", "en": "Pteranodon", "fr": "Ptéranodon", "de": "Pteranodon"},
	"大地の霊砂": {"itemId": "f71d706b30f", "icon": "8400364e9435a3440cd74d99db94a687c1f57c2a.png", "jp": "大地の霊砂", "en": "Landborne Aethersand", "fr": "Sable éthéréen tellurique", "de": "Mineral-Seelensand"},
	"レイディアントファイアグラベル": {"itemId": "b21fb0eeefa", "icon": "700abce45f25428927dbd05443cf44bf6fffa277.png", "jp": "レイディアントファイアグラベル", "en": "Radiant Fire Moraine", "fr": "Granulat de feu flamboyant", "de": "Strahlender Feuerkies"},
	"レイディアントライトニンググラベル": {"itemId": "981f7c4c83c", "icon": "5fefb18109d8a3d6b8de2b1beaf8b907f0b3e1d2.png", "jp": "レイディアントライトニンググラベル", "en": "Radiant Lightning Moraine", "fr": "Granulat de foudre flamboyant", "de": "Strahlender Blitzkies"},
	"大樹の霊砂": {"itemId": "7cb8f073ce8", "icon": "77dbbd2327b8ef247fa7bf3210fe084fa212eae5.png", "jp": "大樹の霊砂", "en": "Leafborne Aethersand", "fr": "Sable éthéréen végétal", "de": "Blumen-Seelensand"},
	"クラリーセージ": {"itemId": "8417fe25770", "icon": "0907672ea36a5d3e8d276bb5ffa7f6c3b3fd77d9.png", "jp": "クラリーセージ", "en": "Clary Sage", "fr": "Sauge sclarée", "de": "Muskatellersalbei"},
	"黒土": {"itemId": "787a1bb251e", "icon": "30da1d05bb1c6de3bfe754e9138d9ccbe443005c.png", "jp": "黒土", "en": "Black Soil", "fr": "Terreau noir", "de": "Schwarze Erde"},
	"大海の霊砂": {"itemId": "d871a171fd5", "icon": "f67cfe767e0e2e0a8aa3e15fb2180276797bbe34.png", "jp": "大海の霊砂", "en": "Seaborne Aethersand", "fr": "Sable éthéréen marin", "de": "Meeres-Seelensand"},
	"サリャクカイマン": {"itemId": "778f68801fb", "icon": "dda2524c0cdd53f801e9e1beed94d244289f5038.png", "jp": "サリャクカイマン", "en": "Thaliak Caiman", "fr": "Caïman de Thaliak", "de": "Thaliak-Kaiman"},
	"トゥプクスアラ": {"itemId": "023b43f89b6", "icon": "95224bfa010cd62e8402316fce0e0963b4eb9fa6.png", "jp": "トゥプクスアラ", "en": "Tupuxuara", "fr": "Tupuxuara", "de": "Tupuxuara"},
	"白光の霊砂": {"itemId": "15c3978078f", "icon": "55a93383d1acfe841430927d6ec2da8c0311223b.png", "jp": "白光の霊砂", "en": "Light-kissed Aethersand", "fr": "Sable éthéréen de lumière", "de": "Weißlicht-Seelensand"},
	"レイディアントアストラルグラベル": {"itemId": "4f55d0077e4", "icon": "919cc5d4e21a1efcf42868269dcedf57758e90e3.png", "jp": "レイディアントアストラルグラベル", "en": "Radiant Astral Moraine", "fr": "Granulat astral rayonnant", "de": "Strahlender Astralkies"},
	"メネフィナローレル": {"itemId": "380c74241b1", "icon": "0907672ea36a5d3e8d276bb5ffa7f6c3b3fd77d9.png", "jp": "メネフィナローレル", "en": "Lover's Laurel", "fr": "Feuille de laurier de Menphina", "de": "Menphina-Lorbeerblätter"},
	"極光の霊砂": {"itemId": "f53239e7623", "icon": "55a93383d1acfe841430927d6ec2da8c0311223b.png", "jp": "極光の霊砂", "en": "Dawnlight Aethersand", "fr": "Sable éthéréen irisé", "de": "Morgenlicht-Seelensand"},
	"ショール": {"itemId": "5f1b9b889f3", "icon": "ff23f825355bc52a34f4aa81c4526d917ba5d00c.png", "jp": "ショール", "en": "Flame Elite's Shawl", "fr": "Pelisse d'élite des Immortels", "de": "Legionselite-Schultertuch"},
	"風茶葉": {"itemId": "d72c098cdfb", "icon": "8a1e6cb006530d2887c5137ea80fbf56d2111e4d.png", "jp": "風茶葉", "en": "Windtea Leaves", "fr": "Mauve des vents", "de": "Windteeblätter"},
	"ズワイガニ": {"itemId": "8aef219ce63", "icon": "dbaad3b907e2f106cef233b3a61193b1b406d0a7.png", "jp": "ズワイガニ", "en": "Snow Crab", "fr": "Crabe des neiges", "de": "Schneekrabbe"},
	"悠久の霊砂": {"itemId": "6df9d323e85", "icon": "8400364e9435a3440cd74d99db94a687c1f57c2a.png", "jp": "悠久の霊砂", "en": "Everbright Aethersand", "fr": "Sable éthéréen éternel", "de": "Ewigkeits-Seelensand"},
	"パーライト": {"itemId": "c24b0e4a434", "icon": "919cc5d4e21a1efcf42868269dcedf57758e90e3.png", "jp": "パーライト", "en": "Perlite", "fr": "Perlite", "de": "Perlit"},
	"豊穣の霊砂": {"itemId": "19d424676f7", "icon": "77dbbd2327b8ef247fa7bf3210fe084fa212eae5.png", "jp": "豊穣の霊砂", "en": "Everborn Aethersand", "fr": "Sable éthéréen prospère", "de": "Fruchtbarkeits-Seelensand"},
	"トレヤの枝": {"itemId": "d9e2f0a6d5b", "icon": "d1e21290438df37600e86ff5b85b6aaa6e5a13dd.png", "jp": "トレヤの枝", "en": "Torreya Branch", "fr": "Branche de kaya", "de": "Nusseibenast"},
	"深淵の霊砂": {"itemId": "84fbf60cbbe", "icon": "f67cfe767e0e2e0a8aa3e15fb2180276797bbe34.png", "jp": "深淵の霊砂", "en": "Everdeep Aethersand", "fr": "Sable éthéréen abyssal", "de": "Abgrund-Seelensand"},
	"スウェットフィッシュ": {"itemId": "8d541def1b2", "icon": "c099b645967b8f44cd0717aa0afbefe3a403ae2a.png", "jp": "スウェットフィッシュ", "en": "Sweatfish", "fr": "Poisson-suée", "de": "Schweißfisch"},
	"夜光の霊砂": {"itemId": "7b187f615ae", "icon": "a40e4cbad9b130b4ddce6aab1a8ce64e2be79d1a.png", "jp": "夜光の霊砂", "en": "Dusklight Aethersand", "fr": "Sable éthéréen noctilumineux", "de": "Dämmerlicht-Seelensand"},
	"アルマンディン": {"itemId": "b3665af1198", "icon": "c0894c8be9f616580b1517d0aa280edd0ac00c62.png", "jp": "アルマンディン", "en": "Almandine Grinding Wheel", "fr": "Meule en almandin", "de": "Almandin-Schleifrad"},
	"黄土": {"itemId": "fb67aaa5aa9", "icon": "152594779bc07759ad7ff3b608398929f26321ed.png", "jp": "黄土", "en": "Doman Yellow", "fr": "Lœss", "de": "Domagelb"},
	"アジモドキ": {"itemId": "56f91e53210", "icon": "7fe7d632008397b0a2aee57d6c25bda4791ee302.png", "jp": "アジモドキ", "en": "False Scad", "fr": "Faux chinchard", "de": "Bastardmakrele"},
	"黄昏の霊砂": {"itemId": "7d5633e249f", "icon": "8400364e9435a3440cd74d99db94a687c1f57c2a.png", "jp": "アジモドキ", "en": "Duskglow Aethersand", "fr": "Sable éthéréen du crépuscule", "de": "Dämmer-Seelensand"},
	"ヤンサバーベナ": {"itemId": "bcd4e654bf4", "icon": "0907672ea36a5d3e8d276bb5ffa7f6c3b3fd77d9.png", "jp": "アジモドキ", "en": "Yanxian Verbena", "fr": "Verveine de Yanxia", "de": "Yanxia-Eisenkraut"},
	"ヤンサ沃土": {"itemId": "fc34ed6cfb5", "icon": "7caf25d14b5258b39a6547631d44fa8117398b2b.png", "jp": "アジモドキ", "en": "Yanxian Soil", "fr": "Terreau de Yanxia", "de": "Yanxia-Erde"},
};

	// 中国版名词
    var reduceLangMapCh = {
		"ファイア": {"ch": "火属性"},
		"アイス": {"ch": "冰属性"},
		"ウィンド": {"ch": "风属性"},
		"アース": {"ch": "土属性"},
		"ライトニング": {"ch": "雷属性"},
		"ウォーター": {"ch": "水属性"},
		"シャード": {"ch": "水晶"},
		"霊砂": {"ch": "灵砂"},
		"微光の霊砂": {"ch": "微光灵砂"},
		"ファイアグラベル": {"ch": "火砂砾"},
		"ライトニンググラベル": {"ch": "雷砂砾"},
		"オレガノ": {"ch": "牛至"},
		"赤玉土": {"ch": "赤玉土"},
		"ドラヴァニアンバス": {"ch": "龙堡鲈"},
		"マナセイル": {"ch": "魔帆"},
		"暁光の霊砂": {"ch": "晓光灵砂"},
		"強火性岩": {"ch": "强火性岩"},
		"強雷性岩": {"ch": "强雷性岩"},
		"スペアミント": {"ch": "留兰"},
		"ピートモス": {"ch": "灰玉土"},
		"カイマン": {"ch": "凯门鳄"},
		"プテラノドン": {"ch": "无齿翼龙"},
		"大地の霊砂": {"ch": "大地灵砂"},
		"レイディアントファイアグラベル": {"ch": "火光砾"},
		"レイディアントライトニンググラベル": {"ch": "雷光砾"},
		"大樹の霊砂": {"ch": "大树灵砂"},
		"クラリーセージ": {"ch": "鼠尾草"},
		"黒土": {"ch": "黑土"},
		"大海の霊砂": {"ch": "大海灵砂"},
		"サリャクカイマン": {"ch": "沙利亚克鳄"},
		"トゥプクスアラ": {"ch": "妖精翼龙"},
		"白光の霊砂": {"ch": "白光灵砂"},
		"レイディアントアストラルグラベル": {"ch": "星光砾"},
		"メネフィナローレル": {"ch": "梅茵菲娜月桂"},
		"極光の霊砂": {"ch": "极光灵砂"},
		"ショール": {"ch": "黑碧玺"},
		"風茶葉": {"ch": "风茶叶"},
		"ズワイガニ": {"ch": "楚蟹"},
		"悠久の霊砂": {"ch": "悠久灵砂"},
		"パーライト": {"ch": "珍珠岩"},
		"豊穣の霊砂": {"ch": "丰饶灵砂"},
		"トレヤの枝": {"ch": "榧树枝"},
		"深淵の霊砂": {"ch": "深渊灵砂"},
		"スウェットフィッシュ": {"ch": "汗鱼"},
		"夜光の霊砂": {"ch": "夜光灵砂"},
		"アルマンディン": {"ch": "贵榴石"},
		"黄土": {"ch": "黄土"},
		"アジモドキ": {"ch": "类鲹"},
        "黄昏の霊砂": {"ch": "黄昏灵砂"},
        "ヤンサバーベナ": {"ch": "延夏马鞭草"},
        "ヤンサ沃土": {"ch": "延夏沃土"},
	};
	var translateDataCh = {
		"item": {
			"アースクラスター": {ch: "土之晶簇"},
			"アースクリスタル": {ch: "土之水晶"},
			"アースシャード": {ch: "土之碎晶"},
			"アーティチョーク": {ch: "包心球蓟"},
			"アーモンド": {ch: "扁桃"},
			"アーモンドの種": {ch: "扁桃的种子"},
			"アイアンエーコン": {ch: "铁帽橡果"},
			"アイオライト原石": {ch: "堇青石原石"},
			"アイスクラスター": {ch: "冰之晶簇"},
			"アイスクリスタル": {ch: "冰之水晶"},
			"アイスシャード": {ch: "冰之碎晶"},
			"アクアマリン原石": {ch: "海蓝石原石"},
			"アゲート原石": {ch: "玛瑙原石"},
			"アストラルグラベル": {ch: "星砂砾"},
			"アストラルフラワー": {ch: "星极花"},
			"アダマン鉱": {ch: "精金矿"},
			"アッシュの枝": {ch: "梣树枝"},
			"アッシュ原木": {ch: "梣木原木"},
			"アバラシアミスルトゥ": {ch: "阿巴拉提亚槲寄生"},
			"アバラシア岩塩": {ch: "阿巴拉提亚岩盐"},
			"アバラシア天然水": {ch: "阿巴拉提亚天然水"},
			"アプリコット": {ch: "黄杏"},
			"アメジスト原石": {ch: "紫水晶原石"},
			"アラガンスネイル": {ch: "亚拉戈蜗牛"},
			"アラミゴマスタード": {ch: "阿拉米格芥末"},
			"アラミゴマスタードの種": {ch: "阿拉米格芥末的种子"},
			"アリゲーターペア": {ch: "鳄梨"},
			"アルメン": {ch: "明矾"},
			"アロエ": {ch: "芦荟"},
			"アンバー原石": {ch: "琥珀原石"},
			"イエローオーライト": {ch: "黄卵石"},
			"イエロークォーツ": {ch: "土黄石英"},
			"イエローピグメント": {ch: "黄色色素"},
			"イエローラウンドストーン": {ch: "黄圆石"},
			"イノンド": {ch: "茴香"},
			"ウィンドクラスター": {ch: "风之晶簇"},
			"ウィンドクリスタル": {ch: "风之水晶"},
			"ウィンドシャード": {ch: "风之碎晶"},
			"ウォータークラスター": {ch: "水之晶簇"},
			"ウォータークリスタル": {ch: "水之水晶"},
			"ウォーターシャード": {ch: "水之碎晶"},
			"ウォルナット": {ch: "胡桃"},
			"ウォルナット原木": {ch: "胡桃原木"},
			"エキナセア": {ch: "紫锥花"},
			"エッグプラント": {ch: "巫茄"},
			"エッグプラントの種": {ch: "巫茄的种子"},
			"エボニー原木": {ch: "黑檀原木"},
			"エメラルドビーン": {ch: "绿宝石豆"},
			"エメラルド原石": {ch: "祖母绿原石"},
			"エルム原木": {ch: "榆木原木"},
			"オーガの角": {ch: "食人魔角"},
			"オーガパンプキン": {ch: "食人魔南瓜"},
			"オークの枝": {ch: "橡树枝"},
			"オーク原木": {ch: "橡木原木"},
			"オールドワールドフィグ": {ch: "旧世界无花果"},
			"オパール原石": {ch: "蛋白石原石"},
			"オリーヴ": {ch: "橄榄"},
			"オリーヴの種": {ch: "橄榄的种子"},
			"オレガノ": {ch: "牛至"},
			"カーネーション": {ch: "康乃馨"},
			"カーネリアン原石": {ch: "红玉髓原石"},
			"カベイジの野菜": {ch: "卡贝基野菜"},
			"カモミール": {ch: "甘菊"},
			"カモミールの種": {ch: "甘菊的种子"},
			"ガーネット原石": {ch: "石榴石原石"},
			"ガーリック": {ch: "大蒜"},
			"ガーリックの種球根": {ch: "大蒜的种子球根"},
			"ガラゴミント": {ch: "美人草"},
			"キャットニップ": {ch: "猫薄荷"},
			"ギルバン": {ch: "金钱蘑"},
			"ククルビーン": {ch: "可可豆"},
			"クラウドバナナ": {ch: "云海香蕉"},
			"クラリーセージ": {ch: "鼠尾草"},
			"クリソライト原石": {ch: "贵橄榄石原石"},
			"クルザスカロット": {ch: "库尔札斯胡萝卜"},
			"クルザスカロットの種": {ch: "库尔札斯胡萝卜的种子"},
			"クルザス茶葉": {ch: "库尔札斯茶叶"},
			"クローヴ": {ch: "丁香花"},
			"クロウの羽根": {ch: "乌鸦之羽"},
			"グラスバイパー": {ch: "蝰蛇"},
			"グリーンオーライト": {ch: "绿卵石"},
			"グリーンクォーツ": {ch: "翠绿石英"},
			"グリーンピグメント": {ch: "绿色色素"},
			"グリーンラウンドストーン": {ch: "绿圆石"},
			"グレイピグメント": {ch: "灰色色素"},
			"グレガリアスワーム": {ch: "群居蠕虫"},
			"グレネードの灰": {ch: "榴弹怪的灰"},
			"コールマターG1": {ch: "1级碳化暗物质"},
			"コールマターG2": {ch: "2级碳化暗物质"},
			"コールマターG3": {ch: "3级碳化暗物质"},
			"コールマターG4": {ch: "4级碳化暗物质"},
			"コールマターG5": {ch: "5级碳化暗物质"},
			"コックの羽根": {ch: "白鸡之羽"},
			"コブランラーヴァ": {ch: "矿爬虫虫"},
			"コリアンダー": {ch: "香菜"},
			"ゴシェナイト原石": {ch: "透绿柱石原石"},
			"サイクロプスオニオン": {ch: "云海洋葱"},
			"サイプレス原木": {ch: "丝柏原木"},
			"サゴリーセージ": {ch: "撒沟厉鼠尾草"},
			"サファイア原石": {ch: "蓝宝石原石"},
			"サベネアミスルトゥ": {ch: "萨维奈槲寄生"},
			"サンストーン原石": {ch: "日长石原石"},
			"サンレモン": {ch: "太阳柠檬"},
			"サンレモンの種": {ch: "太阳柠檬的种子"},
			"ザナラーンの苗": {ch: "萨纳兰幼苗"},
			"ザナラーンソイルG1": {ch: "1级萨纳兰土壤"},
			"ザナラーンソイルG2": {ch: "2级萨纳兰土壤"},
			"ザナラーンソイルG3": {ch: "3级萨纳兰土壤"},
			"ザナラーン茶葉": {ch: "萨纳兰茶叶"},
			"シーダーの枝": {ch: "雪松枝"},
			"シーダー原木": {ch: "雪松原木"},
			"シトリン原石": {ch: "黄水晶原石"},
			"シナモン": {ch: "桂皮"},
			"シャインアップル": {ch: "晶亮苹果"},
			"シャインアップルの種": {ch: "晶亮苹果的种子"},
			"シャンテレール": {ch: "鸡油菌"},
			"シュラウドソイルG1": {ch: "1级黑衣森林土壤"},
			"シュラウドソイルG2": {ch: "2级黑衣森林土壤"},
			"シュラウドソイルG3": {ch: "3级黑衣森林土壤"},
			"シルト岩": {ch: "粉砂岩"},
			"ジェード": {ch: "翡翠原石"},
			"ジェードピー": {ch: "翡翠豆"},
			"ジルコン原石": {ch: "锆石原石"},
			"ジンセン": {ch: "人参"},
			"スイートアーモンド": {ch: "甜扁桃"},
			"スターサファイア原石": {ch: "星蓝石原石"},
			"スタールビー原石": {ch: "星红石原石"},
			"スティッキーライス": {ch: "糯米"},
			"スナーブルベリー": {ch: "鲜红罗兰莓派"},
			"スピナッチ": {ch: "谢尔达莱菠菜"},
			"スピネル原石": {ch: "尖晶石原石"},
			"スフェーン原石": {ch: "榍石原石"},
			"スプルース原木": {ch: "云杉原木"},
			"スペアミント": {ch: "留兰"},
			"ズッキーニ": {ch: "西葫芦"},
			"セサミ": {ch: "美拉西迪亚芝麻"},
			"ゼーメルトマト": {ch: "泽梅尔番茄"},
			"ゼーメルトマトの種": {ch: "泽梅尔番茄的种子"},
			"ソーダ水": {ch: "发泡水"},
			"ソードリーフ": {ch: "剑叶"},
			"ソフトスピナッチ": {ch: "谢尔达莱嫩菠菜"},
			"ターコイズ原石": {ch: "绿松石原石"},
			"タイガーズアイ原石": {ch: "虎眼石原石"},
			"タイム": {ch: "百里香"},
			"タランチュラ": {ch: "狼蛛"},
			"タンジー": {ch: "菊蒿"},
			"ダークチェスナットの枝": {ch: "暗栗树枝"},
			"ダークチェスナット原木": {ch: "暗栗木原木"},
			"ダークマタークラスター": {ch: "暗物质晶簇"},
			"ダークマロン": {ch: "毛栗子"},
			"ダートフロッグ": {ch: "毒镖蛙"},
			"ダイヤモンド原石": {ch: "钻石原石"},
			"ダンデライオン": {ch: "蒲公英"},
			"ダンビュライト原石": {ch: "赛黄晶原石"},
			"チェスナット": {ch: "栗子"},
			"チタン鉱": {ch: "白钛矿"},
			"チャイブ": {ch: "库尔札斯青葱"},
			"チョコボの羽根": {ch: "陆行鸟之羽"},
			"ツリートード": {ch: "绿树蟾蜍"},
			"ティノルカミスルトゥ": {ch: "提诺尔卡槲寄生"},
			"ティノルカ茶葉": {ch: "提诺尔卡茶叶"},
			"デザートサフラン": {ch: "沙漠番红花"},
			"トパーズ原石": {ch: "黄玉原石"},
			"トリリウム": {ch: "延龄花"},
			"トリリウムの球根": {ch: "延龄花の球根"},
			"トルマリン原石": {ch: "碧玺原石"},
			"ドラゴンシュルーム": {ch: "巨龙菇"},
			"ドラゴンペッパー": {ch: "龙息椒"},
			"ドラヴァニアパプリカ": {ch: "翻云雾海红辣椒"},
			"ドラヴァニアミスルトゥ": {ch: "龙堡槲寄生"},
			"ドラヴァニア天然水": {ch: "龙堡天然水"},
			"ナツメグ": {ch: "肉豆蔻"},
			"ノーブルグレープ": {ch: "贵族葡萄"},
			"ノパル": {ch: "仙人掌叶"},
			"ノフィカミスルトゥ": {ch: "诺菲卡槲寄生"},
			"ハイランドパセリ": {ch: "高原芹"},
			"ハイランド小麦": {ch: "高地小麦"},
			"ハニーレモン": {ch: "蜜柠檬"},
			"ハニーレモンの種": {ch: "蜜柠檬种子"},
			"バーチの枝": {ch: "桦树枝"},
			"バーチ原木": {ch: "桦木原木"},
			"バーチ樹液": {ch: "桦木树汁"},
			"バイオレットオーライト": {ch: "紫卵石"},
			"バイオレットクォーツ": {ch: "青紫石英"},
			"バイオレットラウンドストーン": {ch: "紫圆石"},
			"バジリスクの初卵": {ch: "石蜥蜴的初蛋"},
			"バジリスクの卵": {ch: "石蜥蜴的蛋"},
			"バッファロービーン": {ch: "水牛豆"},
			"バニラビーンズ": {ch: "香草豆"},
			"バンブー材": {ch: "竹材"},
			"パースニップ": {ch: "高山萝卜"},
			"パープルピグメント": {ch: "紫色色素"},
			"パールジンジャー": {ch: "生姜"},
			"パールジンジャーの種生姜": {ch: "生姜种子"},
			"パイナップル": {ch: "多刺菠萝"},
			"パイナップルの種": {ch: "多刺菠萝的种子"},
			"パプリカ": {ch: "红辣椒"},
			"パプリカの種": {ch: "红辣椒的种子"},
			"パミスストーン": {ch: "浮石"},
			"ピートモス": {ch: "灰玉土"},
			"ピクシープラム": {ch: "仙子梅"},
			"ピクシープラムの種": {ch: "仙子梅的种子"},
			"ファイアクラスター": {ch: "火之晶簇"},
			"ファイアクリスタル": {ch: "火之水晶"},
			"ファイアグラベル": {ch: "火砂砾"},
			"ファイアシャード": {ch: "火之碎晶"},
			"フェアリーアップル": {ch: "仙女苹果"},
			"フェアリーアップルの種": {ch: "仙女苹果的种子"},
			"フェザントの羽根": {ch: "野鸡之羽"},
			"フォックスグローブ": {ch: "毛地黄"},
			"フローライト原石": {ch: "萤石原石"},
			"ブラウンピグメント": {ch: "棕色色素"},
			"ブラックアルメン": {ch: "黑明矾"},
			"ブラックスコーピオン": {ch: "黑蝎"},
			"ブラックスワンの羽根": {ch: "黑天鹅之羽"},
			"ブラックトリュフ": {ch: "黑松露"},
			"ブラックペッパー": {ch: "黑胡椒"},
			"ブラックペッパーの種": {ch: "黑胡椒的种子"},
			"ブラッドオレンジ": {ch: "鲜血橙"},
			"ブラッドカーラント": {ch: "血红奇异果"},
			"ブラッドカーラントの種": {ch: "血红奇异果的种子"},
			"ブラッドグラス": {ch: "红血草"},
			"ブルーオーライト": {ch: "蓝卵石"},
			"ブルークォーツ": {ch: "绀碧石英"},
			"ブルーピグメント": {ch: "蓝色色素"},
			"ブルーラウンドストーン": {ch: "蓝圆石"},
			"ブレードリーフ": {ch: "刃叶"},
			"プチキャベツ": {ch: "小包心菜"},
			"ヘリオドール原石": {ch: "金绿柱石原石"},
			"ヘンルーダ": {ch: "芸香"},
			"ヘヴンスナッツ": {ch: "苍穹坚果"},
			"ヘヴンズドレモン": {ch: "伊修加德柠檬"},
			"ベラドンナ": {ch: "婴猴薄荷"},
			"ペリドット原石": {ch: "橄榄石原石"},
			"ホワイトスコーピオン": {ch: "白蝎"},
			"ホワイトトリュフ": {ch: "白松露"},
			"ボタンマッシュルーム": {ch: "草菇"},
			"ボムの灰": {ch: "爆弹怪的灰"},
			"ポポト": {ch: "新薯"},
			"ポポトの種芋": {ch: "新薯的种子芋"},
			"ポルチーニ": {ch: "牛肝菌"},
			"マージョラム": {ch: "马郁兰"},
			"マグマビート": {ch: "熔岩甜菜"},
			"マグワート": {ch: "艾蒿"},
			"マズラヤの野草": {ch: "马兹拉雅草"},
			"マホガニー原木": {ch: "红木原木"},
			"マラカイト原石": {ch: "孔雀石原石"},
			"マンドレイク": {ch: "风茄"},
			"マンドレイクの種": {ch: "风茄的种子"},
			"ミスルトゥ": {ch: "提诺尔卡槲寄生"},
			"ミッドランドキャベツ": {ch: "中原甘蓝"},
			"ミッドランドキャベツの種": {ch: "中原甘蓝的种子"},
			"ミッドランドバジル": {ch: "中原罗勒草"},
			"ミッドランドバジルの種": {ch: "中原罗勒草的种子"},
			"ミニマンドラゴラ": {ch: "小小蔓德拉"},
			"ミュートスワンの羽根": {ch: "白天鹅之羽"},
			"ミリオンコーン": {ch: "多实玉米"},
			"ミリオンコーンの種": {ch: "多实玉米的种子"},
			"ムアリーチ": {ch: "蚂蟥"},
			"メープルの枝": {ch: "枫树枝"},
			"メープル原木": {ch: "枫木原木"},
			"メープル樹液": {ch: "枫树树汁"},
			"メイデングラス": {ch: "少女草"},
			"モコ草": {ch: "莫柯草"},
			"モリーユ": {ch: "伞蘑"},
			"モルモリオン原石": {ch: "烟晶原石"},
			"ヤフェームの野草": {ch: "亚菲姆草"},
			"ユーの枝": {ch: "紫杉枝"},
			"ユー原木": {ch: "紫杉原木"},
			"ラーヴァトード": {ch: "熔岩蟾蜍"},
			"ライトニングクラスター": {ch: "雷之晶簇"},
			"ライトニングクリスタル": {ch: "雷之水晶"},
			"ライトニンググラベル": {ch: "雷砂砾"},
			"ライトニングシャード": {ch: "雷之碎晶"},
			"ライ麦": {ch: "黑麦"},
			"ラテックス": {ch: "乳胶"},
			"ラノシアの苗": {ch: "拉诺西亚幼苗"},
			"ラノシアオレンジ": {ch: "拉诺西亚香橙"},
			"ラノシアオレンジの種": {ch: "拉诺西亚香橙的种子"},
			"ラノシアリーキ": {ch: "拉诺西亚韭菜"},
			"ラノシアレタス": {ch: "拉诺西亚莴苣"},
			"ラノシアレタスの種": {ch: "拉诺西亚莴苣的种子"},
			"ラノシアンソイルG1": {ch: "1级拉诺西亚土壤"},
			"ラノシアンソイルG2": {ch: "2级拉诺西亚土壤"},
			"ラノシアンソイルG3": {ch: "3级拉诺西亚土壤"},
			"ラノシア岩塩": {ch: "拉诺西亚岩盐"},
			"ラピスラズリ原石": {ch: "天青石原石"},
			"ラベンダー": {ch: "薰衣草"},
			"ラベンダーの種": {ch: "薰衣草的种子"},
			"ラリマール原石": {ch: "水淙石原石"},
			"リーキ": {ch: "盐韭"},
			"リトルワーム": {ch: "小蠕虫"},
			"ルビートマト": {ch: "红宝石番茄"},
			"ルビー原石": {ch: "红宝石原石"},
			"ルベライト原石": {ch: "红电气石原石"},
			"レイディアントファイアグラベル": {ch: "火光砾"},
			"レイディアントライトニンググラベル": {ch: "雷光砾"},
			"レッドアルメン": {ch: "红明矾"},
			"レッドオーライト": {ch: "红卵石"},
			"レッドクォーツ": {ch: "深绯石英"},
			"レッドピグメント": {ch: "红色色素"},
			"レッドラウンドストーン": {ch: "红圆石"},
			"レンティル": {ch: "小扁豆"},
			"ローズウッドの枝": {ch: "紫檀枝"},
			"ローズウッド原木": {ch: "紫檀原木"},
			"ローズマリー": {ch: "迷迭香"},
			"ローランドグレープ": {ch: "低地葡萄"},
			"ローランドグレープの種": {ch: "低地葡萄的种子"},
			"ローレル": {ch: "月桂"},
			"ロランベリー": {ch: "罗兰莓"},
			"ロランベリーの種": {ch: "罗兰莓的种子"},
			"ワイバーンシュルーム": {ch: "飞龙菇"},
			"ワイルドオニオン": {ch: "野洋葱"},
			"ワイルドオニオンの種球根": {ch: "野洋葱的种子球根"},
			"ワイルドフォックスグローブ": {ch: "野生毛地黄"},
			"ワットル樹皮": {ch: "金合欢树皮"},
			"ヴァンパイアプラント": {ch: "吸血枝"},
			"ヴォイドナッツ": {ch: "虚无坚果"},
			"亜鉛鉱": {ch: "锌矿"},
			"亜麻": {ch: "亚麻"},
			"亜麻の種": {ch: "亚麻的种子"},
			"闇鉄鉱": {ch: "玄铁矿"},
			"黄鉄鉱": {ch: "黄铁矿"},
			"黄銅鉱": {ch: "黄铜矿"},
			"火性岩": {ch: "火性岩"},
			"褐鉄鉱": {ch: "褐铁矿"},
			"岩塩": {ch: "岩盐"},
			"輝銅鉱": {ch: "輝铜矿"},
			"強火性岩": {ch: "强火性岩"},
			"強雷性岩": {ch: "强雷性岩"},
			"強霊性岩": {ch: "强灵性岩"},
			"鏡鉄鉱": {ch: "钴铁矿"},
			"金雲母": {ch: "金云母"},
			"金鉱": {ch: "金矿"},
			"金砂": {ch: "金沙"},
			"銀鉱": {ch: "银矿"},
			"銀砂": {ch: "银沙"},
			"珪砂": {ch: "珪砂"},
			"枯骨": {ch: "枯骨"},
			"御影石": {ch: "花岗岩"},
			"皇金鉱": {ch: "皇金矿"},
			"皇金砂": {ch: "皇金沙"},
			"硬銀鉱": {ch: "硬银矿"},
			"硬銀砂": {ch: "硬银沙"},
			"高級黒衣香木": {ch: "高级黑衣香木"},
			"黒衣香木": {ch: "黑衣香木"},
			"黒衣森の苗": {ch: "黑衣森林幼苗"},
			"黒石灰岩": {ch: "黑石灰岩"},
			"黒土": {ch: "黑土"},
			"黒曜石": {ch: "黑曜石"},
			"骨片": {ch: "骨片"},
			"砂岩": {ch: "砂岩"},
			"砂鉄": {ch: "铁沙"},
			"細砂": {ch: "细沙"},
			"桜貝": {ch: "樱贝"},
			"自然金": {ch: "自然金"},
			"錫鉱": {ch: "锡矿"},
			"小麦": {ch: "小麦"},
			"硝石": {ch: "硝石"},
			"真龍黒曜石": {ch: "真龙黑曜石"},
			"水性岩": {ch: "水性岩"},
			"星性岩": {ch: "星性岩"},
			"生マユ": {ch: "蚕茧"},
			"精霊銀鉱": {ch: "精秘银矿"},
			"精霊銀砂": {ch: "精秘银沙"},
			"青金鉱": {ch: "绿金矿"},
			"青金砂": {ch: "绿金沙"},
			"青麻": {ch: "青麻"},
			"石灰岩": {ch: "石灰岩"},
			"赤玉土": {ch: "赤玉土"},
			"赤鉄鉱": {ch: "赤铁矿"},
			"赤銅鉱": {ch: "赤铜矿"},
			"草綿": {ch: "草棉"},
			"大理石": {ch: "大理石"},
			"大龍黒曜石": {ch: "巨龙黑曜石"},
			"濁水": {ch: "浑水"},
			"辰砂": {ch: "朱砂"},
			"泥岩": {ch: "泥岩"},
			"鉄鉱": {ch: "铁矿"},
			"鉄重石": {ch: "钨铁矿"},
			"土性岩": {ch: "土性岩"},
			"銅鉱": {ch: "铜矿"},
			"銅砂": {ch: "铜沙"},
			"虹綿": {ch: "虹绵"},
			"粘土": {ch: "粘土"},
			"白雲母": {ch: "白云母"},
			"白金鉱": {ch: "白金矿"},
			"麦わら": {ch: "麦秆"},
			"緋樹液": {ch: "绯红树汁"},
			"飛竜黒曜石": {ch: "飞龙黑曜石"},
			"氷性岩": {ch: "冰性岩"},
			"腐葉土": {ch: "腐葉土"},
			"風性岩": {ch: "风性岩"},
			"蜜蜂の巣": {ch: "蜂巢"},
			"無属性クリスタル": {ch: "无属性水晶"},
			"雷性岩": {ch: "雷性岩"},
			"陸亀の甲羅": {ch: "陆龟壳"},
			"硫黄": {ch: "硫黄"},
			"霊銀鉱": {ch: "秘银矿"},
			"霊銀砂": {ch: "秘银沙"},
			"霊性岩": {ch: "灵性岩"},
			"テクタイト": {ch: "似曜岩"},
			"古竜骨片": {ch: "古龙骨片"},
			"イブニングジェード": {ch: "日暮翡翠"},
			"閃亜鉛鉱": {ch: "闪锌矿"},
			"スカイウィドー": {ch: "风寡妇"},
			"クラウドマッシュルーム": {ch: "云菇"},
			"ペリウィンクル": {ch: "长春花"},
			"雲綿": {ch: "云棉"},
			"クラウンミスルトゥ": {ch: "云冠槲寄生"},
			"スカイパイレーツスポイル:鋼鉄": {ch: "空贼白钢通货"},
			"オールドワールドフィグの種": {ch: "旧世界无花果种子"},
			"プチキャベツの種": {ch: "小包心菜种子"},
			"クルザス茶樹の種": {ch: "库尔札斯茶树种子"},
			"光霊銀鉱": {ch: "光银矿"},
			"光霊銀砂": {ch: "光银砂"},
			"菱亜鉛鉱": {ch: "菱锌矿"},
			"枯角": {ch: "枯角"},
			"雪綿": {ch: "雪棉"},
			"淡雪綿": {ch: "淡雪棉"},
			"カンファー原木": {ch: "樟木原木"},
			"カンファーの枝": {ch: "樟木枝"},
			"カンファー古木": {ch: "樟木古树"},
			"樹液結晶": {ch: "树汁结晶"},
			"メテオライト": {ch: "陨石"},
			"レイディアントアストラルグラベル": {ch: "星光砾"},
			"メネフィナローレル": {ch: "梅茵菲娜月桂"},
			"水鳥の羽根": {ch: "水鸟之羽"},
			"重石華": {ch: "钨华"},
			"輝金鉱": {ch: "辉金矿"},
			"沸石": {ch: "沸石"},
			"チーク原木": {ch: "柚木原木"},
			"ノーブルセージ": {ch: "显贵鼠尾草"},
			"星綿": {ch: "星棉"},
			"ブラウンマッシュルーム": {ch: "棕菇"},
			"ラザハン古銭": {ch: "拉扎罕古钱"},
			"氷筍": {ch: "冰笋"},
			"ダスケンモス": {ch: "黄昏苔藓"},
			"ナチュラルマーブル": {ch: "天然玻璃弹珠"},
			"レインボーピグメント": {ch: "彩虹色素"},
			"雲銀鉱": {ch: "云银矿"},
			"群雲綿": {ch: "群云棉"},
			"クラウンハーブ": {ch: "云冠香草"},
			"スタースピネル原石": {ch: "星尖石原石"},
			"アラミゴ塩": {ch: "阿拉米格盐"},
			"トリフェーン原石": {ch: "锂辉石原石"},
			"オサードプラム": {ch: "奥萨德梅"},
			"アズライト原石": {ch: "石青原石"},
			"ジャムメルジンジャー": {ch: "长颈骆姜"},
			"インペリアルジェード原石": {ch: "琅玕原石"},
			"ハロードバジル": {ch: "祝圣罗勒草"},
			"ビーチの枝": {ch: "山毛榉树枝"},
			"ロードナイト原石": {ch: "蔷薇辉石原石"},
			"蓮根": {ch: "莲藕"},
			"タケノコ": {ch: "竹笋"},
			"アルマンディン": {ch: "贵榴石"},
			"トレヤの枝": {ch: "榧树枝"},
			"黄土": {ch: "黄土"},
			"ショール": {ch: "黑碧玺"},
			"パーライト": {ch: "珍珠岩"},
			"風茶葉": {ch: "风茶叶"},
			"ギラバニアアルメン": {ch: "基拉巴尼亚明矾"},
			"ギラバニア鉱泉水": {ch: "基拉巴尼亚矿泉水"},
			"カイヤナイト原石": {ch: "蓝晶石原石"},
			"魔銅砂": {ch: "魔铜沙"},
			"珪岩": {ch: "珪岩"},
			"粘板岩": {ch: "板岩"},
			"輝水鉛鉱": {ch: "辉钼矿"},
			"魔銅鉱": {ch: "魔铜矿"},
			"珪藻土": {ch: "珪藻土"},
			"岩清水": {ch: "石间清水"},
			"餅鉄": {ch: "饼铁"},
			"翠銀鉱": {ch: "翠银矿"},
			"翠銀砂": {ch: "翠银沙"},
			"真砂砂鉄": {ch: "真沙沙铁"},
			"清金砂": {ch: "钯金沙"},
			"赤麻": {ch: "赤麻"},
			"高原小麦": {ch: "高原小麦"},
			"ロークワット": {ch: "枇杷"},
			"ビーチ原木": {ch: "山毛榉原木"},
			"ホーリーバジル": {ch: "神圣罗勒草"},
			"葛のつる": {ch: "葛藤"},
			"葛根": {ch: "葛根"},
			"パーシモンリーフ": {ch: "柿子叶"},
			"パーシモン原木": {ch: "柿木原木"},
			"パーシモン": {ch: "柿子"},
			"蕎麦の実": {ch: "荞麦果实"},
			"マウンテンポポト": {ch: "山芋"},
			"シュガービート": {ch: "甜菜"},
			"グリーンリーキ": {ch: "绿韭"},
			"ギラバニアカロット": {ch: "基拉巴尼亚胡萝卜"},
			"アリッサム": {ch: "香荠"},
			"玉繭": {ch: "玉茧"},
			"ゼルコバ原木": {ch: "榉木原木"},
			"玉藻": {ch: "红玉藻"},
			"紅玉綿花": {ch: "红玉棉"},
			"ラーチ原木": {ch: "落叶松原木"},
			"大豆": {ch: "大豆"},
			"アマノリ": {ch: "紫菜"},
			"椎茸": {ch: "香菇"},
			"馬芹": {ch: "孜然"},
			"紅玉昆布": {ch: "红玉海带"},
			"大根": {ch: "白萝卜"},
			"ヤンサセリ": {ch: "延夏芹"},
			"御形": {ch: "鼠曲草"},
			"ドマ茄子": {ch: "多玛茄子"},
			"サンキャベツ": {ch: "日出甘蓝"},
			"フェンネル": {ch: "甜茴香"},
			"チックウィード": {ch: "繁缕"},
			"ニップルワート": {ch: "稻槎草"},
			"藍麻": {ch: "苎麻"},
			"クロマイト": {ch: "铬铁矿"},
			"トレヤ原木": {ch: "榧木原木"},
			"清金鉱": {ch: "钯金矿"},
			"松脂": {ch: "松脂"},
			"アジム綿花": {ch: "太阳棉"},
			"ギラバニア清水": {ch: "基拉巴尼亚清水"},
			"真麻": {ch: "真麻"},
			"清銀鉱": {ch: "清银矿"},
			"夜鉄鉱": {ch: "夜铁矿"},
			"ブラックウィロー原木": {ch: "黑柳原木"},
			"岩鉄": {ch: "岩鉄"},
			"常輝鉱": {ch: "常輝鉱"},
			"ウルンダイ原木": {ch: "ウルンダイ原木"},
			"延夏綿": {ch: "延夏綿"},
			"アジム湧水": {ch: "アジム湧水"},
			"銛素材": {ch: "渔叉材料"},
			"保温性素材": {ch: "保温材料"},
			"ヤンサ沃土": {ch: "延夏沃土"},
			"鷹目石": {ch: "鹰眼石"},
			"石薬素材": {ch: "石药材料"},
			"紫水結晶": {ch: "紫水结晶"},
			"雲海の羽根": {ch: "云海之羽"},
			"ヤンサバーベナ": {ch: "延夏马鞭草"},
			"老木樹液塊": {ch: "古木树液块"}
		},
		"area": {
			"エオルゼア": {ch: "艾欧泽亚"},
			"ラノシア": {ch: "拉诺西亚"},
			"リムサ・ロミンサ：上甲板層": {ch: "利姆萨·罗敏萨上层甲板"},
			"リムサ・ロミンサ：下甲板層": {ch: "利姆萨·罗敏萨下层甲板"},
			"中央ラノシア": {ch: "中拉诺西亚"},
			"低地ラノシア": {ch: "拉诺西亚低地"},
			"東ラノシア": {ch: "东拉诺西亚"},
			"西ラノシア": {ch: "西拉诺西亚"},
			"高地ラノシア": {ch: "拉诺西亚高地"},
			"サスタシャ浸食洞": {ch: "斯塔夏溶洞"},
			"ブレイフロクスの野営地": {ch: "布雷福洛克斯野营地"},
			"ワンダラーパレス": {ch: "放浪神古神殿"},
			"ウルヴズジェイル": {ch: "狼狱"},
			"シリウス大灯台": {ch: "天狼星灯塔"},
			"外地ラノシア": {ch: "外地拉诺西亚"},
			"アドミラルブリッジ：提督室": {ch: "アドミラルブリッジ：提督室"},
			"ウルヴズジェイル係船場": {ch: "狼狱停船场"},
			"オ・ゴモロ火口神殿": {ch: "奥·哥摩罗火口神殿"},
			"ミスト・ヴィレッジ": {ch: "海雾村"},
			"ロータノ海": {ch: "妖歌海"},
			"メテオ探査坑浅部": {ch: "メテオ探査坑浅部"},
			"メテオ探査坑深部": {ch: "メテオ探査坑深部"},
			"ラグナロク級拘束艦": {ch: "ラグナロク級拘束艦"},
			"稼働隔壁": {ch: "稼働隔壁"},
			"中枢区画": {ch: "中枢区画"},
			"サスタシャ浸食洞（逆襲要害）": {ch: "沙斯塔夏溶洞（逆襲要害）"},
			"ワンダラーパレス（武装聖域）": {ch: "放浪神古神殿（武装聖域）"},
			"宿屋「ミズンマスト」": {ch: "宿屋「ミズンマスト」"},
			"ミスト・ヴィレッジ：コテージ": {ch: "ミスト・ヴィレッジ：コテージ"},
			"ミスト・ヴィレッジ：ハウス": {ch: "ミスト・ヴィレッジ：ハウス"},
			"ミスト・ヴィレッジ：レジデンス": {ch: "ミスト・ヴィレッジ：レジデンス"},
			"ミスト・ヴィレッジ：プライベートルーム": {ch: "ミスト・ヴィレッジ：プライベートルーム"},
			"対リヴァイアサン双胴船": {ch: "対リヴァイアサン双胴船"},
			"ブレイフロクスの野営地（盟友支援）": {ch: "布雷福洛克斯野营地（盟友支援）"},
			"ハルブレーカー・アイル": {ch: "ハルブレーカー・アイル"},
			"黒衣森": {ch: "黑衣森林"},
			"グリダニア：新市街": {ch: "グリダニア：新市街"},
			"グリダニア：旧市街": {ch: "グリダニア：旧市街"},
			"黒衣森：中央森林": {ch: "黑衣森林中央林区"},
			"黒衣森：東部森林": {ch: "黑衣森林东部林区"},
			"黒衣森：南部森林": {ch: "黑衣森林南部林区"},
			"黒衣森：北部森林": {ch: "黑衣森林北部林区"},
			"タムタラの墓所": {ch: "タムタラの墓所"},
			"ハウケタ御用邸": {ch: "ハウケタ御用邸"},
			"トトラクの千獄": {ch: "トトラクの千獄"},
			"スプリガンの巣窟": {ch: "スプリガンの巣窟"},
			"古アムダプール市街": {ch: "古アムダプール市街"},
			"古城アムダプール": {ch: "古城アムダプール"},
			"神勇隊司令室": {ch: "神勇隊司令室"},
			"不語仙の座卓": {ch: "不語仙の座卓"},
			"茨の園": {ch: "茨の園"},
			"ラベンダーベッド": {ch: "薰衣草ベッド"},
			"ハウケタ御用邸（妖異屋敷）": {ch: "ハウケタ御用邸（妖異屋敷）"},
			"旅館「とまり木」": {ch: "旅館「とまり木」"},
			"ラベンダーベッド：コテージ": {ch: "薰衣草ベッド：コテージ"},
			"ラベンダーベッド：ハウス": {ch: "薰衣草ベッド：ハウス"},
			"ラベンダーベッド：レジデンス": {ch: "薰衣草ベッド：レジデンス"},
			"ラベンダーベッド：プライベートルーム": {ch: "薰衣草ベッド：プライベートルーム"},
			"メテオの陰地": {ch: "メテオの陰地"},
			"バインディングコイル": {ch: "バインディングコイル"},
			"ラグナロク級三番艦：艦体中央部": {ch: "ラグナロク級三番艦：艦体中央部"},
			"ラグナロク級三番艦：作戦室": {ch: "ラグナロク級三番艦：作戦室"},
			"古木の神判地": {ch: "古木の神判地"},
			"タムタラの墓所（惨劇霊殿）": {ch: "タムタラの墓所（惨劇霊殿）"},
			"古城アムダプール（邪念排撃）": {ch: "古城アムダプール（邪念排撃）"},
			"ザナラーン": {ch: "萨纳兰"},
			"ウルダハ：ナル回廊": {ch: "ウルダハ：ナル回廊"},
			"ウルダハ：ザル回廊": {ch: "ウルダハ：ザル回廊"},
			"西ザナラーン": {ch: "西萨纳兰"},
			"中央ザナラーン": {ch: "中萨纳兰"},
			"東ザナラーン": {ch: "东萨纳兰"},
			"南ザナラーン": {ch: "南萨纳兰"},
			"北ザナラーン": {ch: "北萨纳兰"},
			"カッターズクライ": {ch: "カッターズクライ"},
			"カッパーベル銅山": {ch: "カッパーベル銅山"},
			"ハラタリ修練所": {ch: "ハラタリ修練所"},
			"カルン埋没寺院": {ch: "カルン埋没寺院"},
			"カストルム・メリディアヌム": {ch: "カストルム・メリディアヌム"},
			"銀冑団総長室": {ch: "銀冑団総長室"},
			"香煙の間": {ch: "香煙の間"},
			"砂の家": {ch: "砂の家"},
			"炎帝祭跡": {ch: "炎帝祭跡"},
			"ゴブレットビュート": {ch: "ゴブレットビュート"},
			"魔導城プラエトリウム": {ch: "魔導城プラエトリウム"},
			"ポルタ・デクマーナ": {ch: "ポルタ・デクマーナ"},
			"カッパーベル銅山（騒乱坑道）": {ch: "カッパーベル銅山（騒乱坑道）"},
			"宿屋「砂時計亭」": {ch: "宿屋「砂時計亭」"},
			"ゴブレットビュート：コテージ": {ch: "ゴブレットビュート：コテージ"},
			"ゴブレットビュート：ハウス": {ch: "ゴブレットビュート：ハウス"},
			"ゴブレットビュート：レジデンス": {ch: "ゴブレットビュート：レジデンス"},
			"ゴブレットビュート：プライベートルーム": {ch: "ゴブレットビュート：プライベートルーム"},
			"ハラタリ修練所（剣闘領域）": {ch: "ハラタリ修練所（剣闘領域）"},
			"ラグナロク級六番艦：艦体中央部": {ch: "ラグナロク級六番艦：艦体中央部"},
			"ラグナロク級六番艦：再生制御区": {ch: "ラグナロク級六番艦：再生制御区"},
			"ラグナロク級六番艦：第一艦橋": {ch: "ラグナロク級六番艦：第一艦橋"},
			"バハムートコア": {ch: "バハムートコア"},
			"クルザス": {ch: "库尔札斯"},
			"クルザス中央高地": {ch: "库尔札斯中央高地"},
			"ゼーメル要塞": {ch: "ゼーメル要塞"},
			"オーラムヴェイル": {ch: "オーラムヴェイル"},
			"ハウリングアイ石塔群": {ch: "ハウリングアイ石塔群"},
			"グリフィン大橋": {ch: "グリフィン大橋"},
			"ストーンヴィジル": {ch: "ストーンヴィジル"},
			"スノークローク大氷壁": {ch: "スノークローク大氷壁"},
			"雲廊": {ch: "雲廊"},
			"ストーンヴィジル（城塞奪回）": {ch: "ストーンヴィジル（城塞奪回）"},
			"アク・アファー円形劇場": {ch: "アク・アファー円形劇場"},
			"モードゥナ": {ch: "摩杜纳"},
			"黙約の塔": {ch: "黙約の塔"},
			"古代の民の迷宮": {ch: "古代の民の迷宮"},
			"石の家": {ch: "石の家"},
			"シルクスの塔": {ch: "シルクスの塔"},
			"カルテノー平原：外縁遺跡群": {ch: "カルテノー平原：外縁遺跡群"},
			"戒律の殻": {ch: "戒律の殻"},
			"闇の世界": {ch: "闇の世界"},
			"高地ドラヴァニア": {ch: "龙堡参天高地"},
			"低地ドラヴァニア": {ch: "龙堡内陆低地"},
			"クルザス西部高地": {ch: "库尔札斯西部高地"},
			"ドラヴァニア雲海": {ch: "翻云雾海"},
			"アバラシア雲海": {ch: "阿巴拉提亚云海"},
			"アジス・ラー": {ch: "魔大陆阿济兹拉"},
			"ディアデム諸島": {ch: "云冠群岛"},
			"アジムステップ": {ch: "太阳神草原"},
			"オサード": {ch: "奥萨德"},
			"ギラバニア": {ch: "基拉巴尼亚"},
			"ギラバニア湖畔地帯": {ch: "基拉巴尼亚湖区"},
			"ギラバニア山岳地帯": {ch: "基拉巴尼亚山区"},
			"ギラバニア辺境地帯": {ch: "基拉巴尼亚边区"},
			"ヤンサ": {ch: "延夏"},
			"紅玉海": {ch: "红玉海"}
		},

		"job": {
			"全て": {ch: "全部"},
			"園芸師": {ch: "园艺工"},
			"採掘師": {ch: "采矿工"}
		},
		"areaList": {
			"全て": {ch: "全部"},
			"黒衣森": {ch: "黑衣森林"},
			"ラノシア": {ch: "拉诺西亚"},
			"ザナラーン": {ch: "萨纳兰"},
			"クルザス": {ch: "库尔札斯"},
			"モードゥナ": {ch: "摩杜纳"},
			"アバラシア": { ch: "阿巴拉提亚"},
			"ドラヴァニア": {ch: "龙堡"},
			"オサード": {ch: "奥萨德"},
			"ギラバニア": {ch: "基拉巴尼亚"}
		},
		"pointType": {
			"未知": {ch: "未知"},
			"刻限": {ch: "限时"},
			"伝説": {ch: "传说"},
			"護符": {ch: "护符"}
		},
		"pointTypeList": {
			"全て": {ch: "全部"},
			"通常": {ch: "通常"},
			"未知系全て": {ch: "未知系全部"},
			"未知＋刻限": {ch: "未知+限时"},
			"未知": {ch: "未知"},
			"刻限": {ch: "限时"},
			"伝説": {ch: "传说"},
			"護符": {ch: "护符"},
			"ベル": {ch: "已选"},
			"雲海": {ch: "云冠群岛"}
		},
		"viewModeList": {
			"ポイント別": {ch: "采集类型"},
			"ポイント別（近い時間順）": {ch: "采集类型＋最近时间"},
			"アイテム別": {ch: "物品种类"},
			"アイテム別（近い時間順）": {ch: "物品种类＋最近时间"}
		},
        "patchList": {
		"全て": {ch: "全部"},
		"2.x": {ch: "2.x"},
		"3.x": {ch: "3.x"},
		"4.x": {ch: "4.x"},
		"4.0": {ch: "4.0"},
		"4.1": {ch: "4.1"},
		"4.2": {ch: "4.2"},
		"4.3": {ch: "4.3"},
        },
		"aetheryte": {
			"リムサ・ロミンサ：下甲板層": {ch: "利姆萨·罗敏萨下层甲板"},
			"サマーフォード庄": {ch: "盛夏农庄"},
			"モラビー造船廠": {ch: "莫拉比造船厂"},
			"コスタ・デル・ソル": {ch: "太阳海岸"},
			"ワインポート": {ch: "葡萄酒港"},
			"スウィフトパーチ入植地": {ch: "雨燕塔殖民地"},
			"エールポート": {ch: "小麦酒港"},
			"キャンプ・ブロンズレイク": {ch: "石绿湖营地"},
			"キャンプ・オーバールック": {ch: "瞭望阵营地"},
			"ウルヴズジェイル係船場": {ch: "狼狱停船场"},
			"グリダニア：新市街": {ch: "格里达尼亚新街"},
			"ベントブランチ牧場": {ch: "弯枝牧场"},
			"ホウソーン家の山塞": {ch: "霍桑山寨"},
			"クォーリーミル": {ch: "石场水车"},
			"キャンプ・トランキル": {ch: "恬静露营地"},
			"フォールゴウド": {ch: "秋瓜浮村"},
			"ウルダハ：ナル回廊": {ch: "乌尔达哈现世回廊"},
			"ホライズン": {ch: "地平关"},
			"ブラックブラッシュ停留所": {ch: "黑尘驿站"},
			"キャンプ・ドライボーン": {ch: "枯骨营地"},
			"リトルアラミゴ": {ch: "小阿拉米格"},
			"忘れられたオアシス": {ch: "遗忘绿洲"},
			"キャンプ・ブルーフォグ": {ch: "蓝雾营地"},
			"青燐精製所": {ch: "青磷精炼所"},
			"ゴールドソーサー": {ch: "金碟游乐场"},
			"イシュガルド：下層": {ch: "伊修加德基础层"},
			"ドラゴンヘッド": {ch: "巨龙首营地"},
			"ファルコンネスト": {ch: "隼巢"},
			"キャンプ・クラウドトップ": {ch: "云顶营地"},
			"オク・ズンド": {ch: "尊杜集落"},
			"ポート・ヘリックス": {ch: "螺旋港"},
			"イディルシャイア": {ch: "田园郡"},
			"テイルフェザー": {ch: "尾羽集落"},
			"不浄の三塔": {ch: "不洁三塔"},
			"モグモグホーム": {ch: "莫古力之家"},
			"白亜の宮殿": {ch: "天极白垩宫"},
			"レヴナンツトール": {ch: "丧灵钟"},
			"ラールガーズリーチ": {ch: "神拳痕"},
			"カストルム・オリエンス": {ch: "帝国东方堡"},
			"ピーリングストーンズ": {ch: "对等石"},
			"アラガーナ": {ch: "阿拉加纳"},
			"アラギリ": {ch: "阿拉基利"},
			"ポルタ・プレトリア": {ch: "天营门"},
			"アラミガン・クォーター": {ch: "阿拉米格人居住区"},
			"クガネ": {ch: "黄金港"},
			"碧のタマミズ": {ch: "碧玉水"},
			"オノコロ島": {ch: "自凝岛"},
			"ナマイ村": {ch: "茨菰村"},
			"烈士庵": {ch: "烈士庵"},
			"再会の市": {ch: "重逢集市"},
			"明けの玉座": {ch: "晨曦王座"}
		}
	};

    window.mlt_title = "FF14我的工具：采集时刻表";
	window.mlt_site_es = "装备配装";
	window.mlt_site_es_meal = "食物查询";
	window.mlt_site_gt = "采集时刻表";
	window.mlt_site_rs = "配方查询";
	window.mlt_site_rs_craft = "生产模拟";
	window.mlt_site_ss = "技能循环模拟";
	window.mlt_site_phone = "Voice Chat";
	window.mlt_site_sc = "Score Master";
	window.mlt_site_todo = "TODO Checker";
	window.mlt_site_ap = "Desktop Apps";
	window.mlt_timetable = "时刻表";
	window.mlt_version = "版本信息";
	window.mlt_topc = "切换pc版";
	window.mlt_note_0 = "推荐Chrome打开";
	window.mlt_note_1 = "源语言为日语，多语言支持来自谷歌翻译与LODESTONE";
	window.mlt_note_2 = "如果有问题请联系<a href='https://twitter.com/dol_z_dreams' target='_blank'>on Twitter</a>.";
	window.mlt_lt = "地球时间";
	window.mlt_et = "艾欧泽亚时间";
	window.mlt_time = "时间";
	window.mlt_type = "种类";
	window.mlt_list = "列表";
	window.mlt_area = "地点";
	window.mlt_map = "地图";
	window.mlt_timing = "通知时间";
	window.mlt_timing_0 = "准时";
	window.mlt_timing_1 = "1分前";
	window.mlt_timing_2 = "2分前";
	window.mlt_timing_3 = "3分前";
	window.mlt_timing_4 = "4分前";
	window.mlt_timing_5 = "5分前";
	window.mlt_timing_6 = "6分前";
	window.mlt_timing_7 = "7分前";
	window.mlt_timing_8 = "8分前";
	window.mlt_timing_9 = "9分前";
	window.mlt_timing_10 = "10分前";
	window.mlt_onoff = "ON/OFF";
	window.mlt_popup_notify = "弹出通知";
	window.mlt_desktop_notify = "桌面通知";
	window.mlt_notify = "通知";
	window.mlt_warning_chrome_only = "※仅支持Chrome";
	window.mlt_sound = "声音";
	window.mlt_sound_none = "无";
	var mltc_testplay = "试听";
	window.mlt_volume = "音量";
	window.mlt_to_alarm_config = "闹钟到点设定";
	window.mlt_to_timetable = "到时刻表";
	window.mlt_item = "条款";
	var mltc_min = "采矿";
	var mltc_btn = "园艺";
	var mltc_clear = "通过";
	var mltc_alarm_on = "提醒打开";
	window.mltc_alarm_off = "提醒关闭";
	var mltc_how2use = "确认利用方法 ";
	var mltc_placeholder = "以地域区分输入关键字";
	window.mltc_gathering = "获得力";
	window.mltc_perception = "鉴别力";
	window.mltc_popup_now = "到了指定素材的时间。";
	window.mltc_popup_early = "离指定素材还有{0}分。";
	window.mltc_item_active = "★进行中 {0}";
	window.mltc_item_next = "即将开始 {0}";
	window.mltc_dn_notsupported = "此浏览器不支持桌面弹窗提示。";
	window.mltc_dn_enable = "桌面弹窗提示有效。";
	window.mltc_dn_already_denied = "桌面弹窗提示失效，请确认设定有效的浏览器。";
	window.mltc_sound_disabled = "使用的终端不支持声音。";
	window.mltc_sound_initializing = "声音初始化中，请稍后再试一次";
	var mltc_close = "关闭";
	window.mlt_filter_area = "地区";
	window.mlt_filter_patch = "版本";
	window.mlt_filter_search = "搜索";
	window.mlt_filter_point = "地点";
	window.mlt_filter_class = "职业";
	window.mlt_hidden = "隐藏";
	var mlt_favorite_show = "显示";
	var mlt_favorite_delete = "删除";
	var mlt_favorite_add = "增加";
	var mlt_alarm_enabled = "警报有效　（点击无效）";
	var mlt_alarm_disabled = "警报无效　（点击有效）";
	window.mlt_anytime = "平时";
	var mlt_reset = "设置初始化";
	var mlt_myschedule_delete = "删除";
	var mlt_myschedule_add = "添加";
	var mlt_myschedule_start = "起点时间";
	var mlt_myschedule_span = "有效时间";
	var mlt_myschedule_name = "名称";
	window.mlt_note_favorite = "";
	window.mlt_note_myschedule = "";
	window.mltc_bouyomi_pitch = "pitch";
	window.mltc_bouyomi_speed = "speed";
	window.mltc_soundmode_tovoice = "Text-to-speech mode";
	window.mltc_soundmode_tose = "SE mode";
	window.mlt_toggle_check = "Toggle All";
	window.mlt_nearest_aetheryte = "最近的以太之光";
	window.mlt_etc_reduce = "Reduction";
	var mlt_hdtimer_enable = "High resolution timer: enabled (click to disabled)";
	var mlt_hdtimer_disable = "High resolution timer: disabled (click to enable)";
	window.mlt_view_mode = "Mode";
	window.mlt_view_neartime_top = "临近采集点顶部显示";
	window.mlt_view_all_item = "显示所有项目";

	// 插入中文数据
	for (var dataType in translateDataCh){
		for (var i in translateDataCh[dataType]){
			translateData[dataType][i]['de'] = translateDataCh[dataType][i]['ch'];
		}
	}
	for (var j in reduceLangMapCh){
		reduceLangMap[j]['de'] = reduceLangMapCh[j]['ch'];
	}

	// 切换中文
	lang = 'de';

	// 更新数据
	updatePointData();
    //更新精选表
    initReductionTable();
    //更新选择列表
    initFilter();
    //更新界面语言
    updateLanguageText();
    //替换猫腹URL
    var myas = document.querySelectorAll('a');
    var k, mya;
    for (k = 0; k < myas.length; k += 1) {
        mya = myas[k];
        mya.href = mya.href.replace('de.', 'cn.');
    }
    updateList();
})();
    //增添精选数据

