﻿// ==UserScript==
// @name           RatingR2 All Point
// @version        1.1 + VC'Modify
// @author         VF Tomato + VC 
// @description    REREC, TrExMa, RatingR2  JP/EN/CHS + Season TI
// @include	http://trophymanager.com/players/*
// @exclude	http://trophymanager.com/players/compare/*
// @exclude	http://trophymanager.com/players
// @namespace https://greasyfork.org/users/8015
// ==/UserScript==
var rou_factor = 0.00405;
var wage_rate = 27.55;
var wage_rate_new = 23.75;
//NOTE: if you want to do some translate , find the key word "translate" in this script  -- by vc
var lang = "ENG"; // default
lang = "CHS"; 

// Array to setup the weights of particular skills for each player's actual ability
// This is the direct weight to be given to each skill.
// Array maps to these skills:
//				   [Str,Sta,Pac,Mar,Tac,Wor,Pos,Pas,Cro,Tec,Hea,Fin,Lon,Set]
var positions = [[  1,  3,  1,  1,  1,  3,  3,  2,  2,  2,  1,  3,  3,  3], // D C
				 [  2,  3,  1,  1,  1,  3,  3,  2,  2,  2,  2,  3,  3,  3], // D L
				 [  2,  3,  1,  1,  1,  3,  3,  2,  2,  2,  2,  3,  3,  3], // D R
				 [  1,  2,  2,  1,  1,  1,  1,  1,  2,  2,  1,  3,  3,  3], // DM C
				 [  2,  3,  1,  1,  1,  3,  3,  2,  2,  2,  2,  3,  3,  3], // DM L
				 [  2,  3,  1,  1,  1,  3,  3,  2,  2,  2,  2,  3,  3,  3], // DM R
				 [  2,  2,  3,  1,  1,  1,  1,  1,  3,  1,  2,  3,  3,  3], // M C 
				 [  2,  2,  1,  1,  1,  1,  1,  1,  1,  1,  2,  3,  3,  3], // M L
				 [  2,  2,  1,  1,  1,  1,  1,  1,  1,  1,  2,  3,  3,  3], // M R
				 [  2,  3,  3,  2,  2,  1,  1,  1,  3,  1,  2,  1,  1,  3], // OM C
				 [  2,  2,  1,  3,  3,  2,  2,  3,  1,  1,  2,  2,  2,  3], // OM L
				 [  2,  2,  1,  3,  3,  2,  2,  3,  1,  1,  2,  2,  2,  3], // OM R
				 [  1,  2,  2,  3,  3,  2,  2,  3,  3,  2,  1,  1,  1,  3], // F
				 [  2,  3,  2,  1,  2,  1,  2,  2,  3,  3,  3]]; // GK

// Weights need to total 100
var weights = [ [85,12, 3],  // D C
				[70,25, 5],  // D L
				[70,25, 5],  // D R
				[90,10, 0],  // DM C
				[50,40,10],  // DM L
				[50,40,10],  // DM R
				[85,12, 3],  // M C			   
				[90, 7, 3],  // M L
				[90, 7, 3],  // M R
				[90,10, 0],  // OM C
				[60,35, 5],  // OM  L
				[60,35, 5],  // OMR
				[80,18, 2],  // F
				[50,42, 8]]; // GK

var weightR2 = [[	0.51872935	,	0.29081119	,	0.57222393	,	0.89735816	,	0.84487852	,	0.50887940	,	0.50887940	,	0.13637928	,	0.05248024	,	0.09388931	,	0.57549122	,	0.00000000	,	0.00000000	,	0.00000000	],	// DC
                [	0.46087883	,	0.31034824	,	0.65619359	,	0.73200504	,	0.70343948	,	0.49831122	,	0.46654859	,	0.16635132	,	0.22496087	,	0.19697949	,	0.48253326	,	0.07310254	,	0.02834753	,	0.00000000	],	// DL/R
                [	0.43732502	,	0.31888984	,	0.53618097	,	0.63897616	,	0.59319466	,	0.51330795	,	0.53166961	,	0.32536200	,	0.06340582	,	0.27886822	,	0.49996910	,	0.18940400	,	0.07344664	,	0.00000000	],	// DMC
                [	0.42233965	,	0.32373447	,	0.62437404	,	0.54169665	,	0.51669428	,	0.49853202	,	0.47851686	,	0.26551219	,	0.22685609	,	0.32146118	,	0.45396969	,	0.23513340	,	0.09117948	,	0.00000000	],	// DML/R
                [	0.34304950	,	0.35058989	,	0.49918296	,	0.34631352	,	0.30595388	,	0.52078076	,	0.56068322	,	0.52568923	,	0.08771222	,	0.47650463	,	0.41232903	,	0.41160135	,	0.15960981	,	0.00000000	],	// MC
                [	0.37404045	,	0.33153172	,	0.62642777	,	0.33260815	,	0.30559265	,	0.50117998	,	0.47502314	,	0.28759565	,	0.33838614	,	0.44322386	,	0.40347341	,	0.41859521	,	0.16232188	,	0.00000000	],	// ML/R
                [	0.31998474	,	0.35180968	,	0.49002842	,	0.23116817	,	0.19239312	,	0.52687030	,	0.57839880	,	0.53861416	,	0.07598706	,	0.56096162	,	0.39614367	,	0.53152625	,	0.20611401	,	0.00000000	],	// OMC
                [	0.36069138	,	0.33248748	,	0.62214126	,	0.20034326	,	0.17595073	,	0.50091992	,	0.47631079	,	0.29235505	,	0.35086625	,	0.52960856	,	0.39553712	,	0.54964726	,	0.21314094	,	0.00000000	],	// OML/R
                [	0.40324698	,	0.29906901	,	0.39676419	,	0.10106757	,	0.07620466	,	0.50471883	,	0.58512049	,	0.37506253	,	0.05291339	,	0.53882195	,	0.51604535	,	0.82935839	,	0.32160667	,	0.00000000	],	// F
                [	0.45462811	,	0.30278232	,	0.45462811	,	0.90925623	,	0.45462811	,	0.90925623	,	0.45462811	,	0.45462811	,	0.30278232	,	0.15139116	,	0.15139116	]];	// GK						

// REC weights Str				   Sta				  Pac				 Mar				 Tac				 Wor				Pos				   Pas				  Cro				 Tec				Hea				   Fin				  Lon				 Set
var weightR = [[0.653962303361921,  0.330014238020285, 0.562994547223387, 0.891800163983125,  0.871069095865164,  0.454514672470839, 0.555697278549252, 0.42777598627972,  0.338218821750765, 0.134348455965202, 0.796916786677566, 0.048831870932616, 0.116363443378865, 0.282347752982916],	//DC
			   [0.565605120229193,  0.430973382039533, 0.917125432457378, 0.815702528287723,  0.99022325015212,   0.547995876625372, 0.522203232914265, 0.309928898819518, 0.837365352274204, 0.483822472259513, 0.656901420858592, 0.137582588344562, 0.163658117596413, 0.303915447383549],	//DL/R
			   [0.55838825558912,   0.603683502357502, 0.563792314670998, 0.770425088563048,  0.641965853834719,  0.675495235675077, 0.683863478201805, 0.757342915150728, 0.473070797767482, 0.494107823556837, 0.397547163237438, 0.429660916538242, 0.56364174077388,  0.224791093448809],	//DMC
			   [0.582074038075056,  0.420032202680124, 0.7887541874616,   0.726221389774063,  0.722972329840151,  0.737617252827595, 0.62234458453736,  0.466946909655194, 0.814382915598981, 0.561877829393632, 0.367446981999576, 0.360623408340649, 0.390057769678583, 0.249517737311268],	//DML/R
			   [0.578431939417021,  0.778134685048085, 0.574726322388294, 0.71400292078636,   0.635403391007978,  0.822308254446722, 0.877857040588335, 0.864265671245476, 0.433450219618618, 0.697164252367046, 0.412568516841575, 0.586627586272733, 0.617905053049757, 0.308426814834866],	//MC
			   [0.497429376361348,  0.545347364699553, 0.788280917110089, 0.578724574327427,  0.663235306043286,  0.772537143243647, 0.638706135095199, 0.538453108494387, 0.887935381275257, 0.572515970409641, 0.290549550901104, 0.476180499897665, 0.526149424898544, 0.287001645266184],	//ML/R
			   [0.656437768926678,  0.617260722143117, 0.656569986958435, 0.63741054520629,   0.55148452726771,   0.922379789905246, 0.790553566121791, 0.999688557334153, 0.426203575603164, 0.778770912265944, 0.652374065121788, 0.662264393455567, 0.73120100926333,  0.274563618133769],	//OMC
			   [0.483341947292063,  0.494773052635464, 0.799434804259974, 0.628789194186491,  0.633847969631333,  0.681354437033551, 0.671233869875345, 0.536121458625519, 0.849389745477645, 0.684067723274814, 0.389732973354501, 0.499972692291964, 0.577231818355874, 0.272773352088982],	//OML/R
			   [0.493917051093473,  0.370423904816088, 0.532148929996192, 0.0629206658586336, 0.0904950078155216, 0.415494774080483, 0.54106107545574,  0.468181146095801, 0.158106484131194, 0.461125738338018, 0.83399612271067,  0.999828328674183, 0.827171977606305, 0.253225855459207],	//F
//			   For  Rez    Vit  Ind  One  Ref Aer  Sar  Com    Deg    Aru
			   [0.5, 0.333, 0.5, 1,   0.5, 1,  0.5, 0.5, 0.333, 0.333, 0.333]]; //GK

//				DC		   DL/R		  DMC		  DML/R		  MC		  ML/R		  OMC		  OML/R		  F			  GK
var recLast = [[14.866375, 15.980742, 15.8932675, 15.5835325, 17.6955092, 16.6189141, 18.1255351, 15.6304867, 13.2762119, 15],
			   [18.95664,  22.895539, 23.1801296, 23.2813871, 26.8420884, 23.9940623, 27.8974544, 24.54323,   19.5088591, 22.3]];


var positionNames = ["D C", "D L", "D R", "DM C", "DM L", "DM R", "M C", "M L", "M R", "OM C", "OM L", "OM R", "F", "GK"];

//to translate
var positionFullNames = ["Defender Center", "Defender Left", "Defender Right", "Defensive Midfielder Center", "Defensive Midfielder Left", "Defensive Midfielder Right", "Midfielder Center", "Midfielder Left", "Midfielder Right", "Offensive Midfielder Center", "Offensive Midfielder Left", "Offensive Midfielder Right", "Forward", "Goalkeeper"];
var positionFullNamesJ = ["ディフェンダー 中央", "ディフェンダー 左", "ディフェンダー 右", "守備的ミッドフィルダー 中央", "守備的ミッドフィルダー 左", "守備的ミッドフィルダー 右", "ミッドフィルダー 中央", "ミッドフィルダー 左", "ミッドフィルダー 右", "攻撃的ミッドフィルダー 中央", "攻撃的ミッドフィルダー 左", "攻撃的ミッドフィルダー 右", "フォワード", "ゴールキーパー"];





//STAR SCRIPT
if (location.href.indexOf("/players/") != -1){

	// positionIndex is the array of skill priority for this player.
	// skills is an array of skills for each user
    
    var isGK = false; //check if gk
    if(document.getElementsByClassName("favposition long")[0].innerHTML.indexOf("gk")>0)isGK=true;
       
	
	document.calculateSkill = function(positionIndex, skills) {
		
		var totSkill = 0;
		for (var i=0; i< positions[positionIndex].length; i++) {
			if (skills[i]>0) {
				totSkill += skills[i]*document.calculateSkillWeight(positions[positionIndex], weights[positionIndex], i);
			}
		}
		
		totSkill = totSkill / 200; 
		totSkill = Math.round(totSkill*1000)/1000;
		
		return totSkill;
	};
	
	document.calculateSkillWeight = function(positionWeightLevels, weights, index) {
		var weight = 0;
		weight = weights[positionWeightLevels[index]-1] / document.numberAtWeight(positionWeightLevels, positionWeightLevels[index]) * 10;
		return weight;
	};
	
	document.numberAtWeight = function(positionWeightLevels, value) {
		var count = 0;
		for (var i=0; i< positionWeightLevels.length; i++) {
			if (positionWeightLevels[i] == value) {
				count++;
			}
		}
		return count;
	};

	document.findPositionIndex = function(position) {
		var index = -1;
		for (var k=0; k< positionFullNames.length; k++) {
			if (position.indexOf(positionFullNames[k]) == 0) {
			return k;
			}
		}
		for (var k=0; k< positionFullNamesJ.length; k++) {
			if (position.indexOf(positionFullNamesJ[k]) == 0) {
			return k;
			}
		}
		return index;
	};
	
	document.getSkills = function(table) {
		var skillArray = [];
		var tableData = table.getElementsByTagName("td");
		if (tableData.length > 1) {
			for (var i = 0; i < 2; i++) {
				for (var j = i; j < tableData.length; j += 2) {
					if (tableData[j].innerHTML.indexOf("star.png") > 0) {
						skillArray.push(20);
					}
					else if (tableData[j].innerHTML.indexOf("star_silver.png") > 0) {
						skillArray.push(19);
					}
					else if (tableData[j].textContent.length != 0) {
						skillArray.push(tableData[j].textContent);
					}
				}
			}
		}
		return skillArray;
	}; // end of getSkills

	function funFix (i) {
		i = (Math.round(i*100)/100).toFixed(2);
		return i;
	}
	
	function funFix2 (i) {
		i = (Math.round(i*10)/10).toFixed(1);
		return i;
	}

/* 屏蔽此函数，减少翻译量

    //var trnum = siSearch(gettr);	
	function siSearch (gettr) {
		for (var i = 0; i < gettr.length; i++){
			if (gettr[i].innerHTML.indexOf("スキル指数") > 0) return i;
			if (gettr[i].innerHTML.indexOf("Skill Index") > 0) return i;
			if (gettr[i].innerHTML.indexOf("技能评值") > 0) return i;
		}
	}
	
*/
	document.createTR = function(table, SKarray) {
		var tr = document.createElement("tr");
		var th = document.createElement("th");
		th.innerHTML = "SK1";
		tr.appendChild(th);
		var td = document.createElement("td");
		td.setAttribute("class", "align_center");
		td.innerHTML = SKarray[0];
		tr.appendChild(td);
		var th = document.createElement("th");
		th.innerHTML = "SK2";
		tr.appendChild(th);
		var td = document.createElement("td");
		td.setAttribute("class", "align_center");
		if (SKarray[1] == 0){
			td.innerHTML = "N/A";
		} else {
			td.innerHTML = SKarray[1];
		}
		tr.appendChild(td);
		table.appendChild(tr);
	};// end of document.createTR
	
	function computeSK(table, skills){
	var SKs = [0, 0];
	var REREC = [[],[],[]];
	var FP = [];
	var positionCell = document.getElementsByClassName("favposition long")[0].childNodes;
	var positionArray = [];
	if (positionCell.length == 1){
			positionArray[0] = positionCell[0].textContent;
	} else if (positionCell.length == 2){
			positionArray[0] = positionCell[0].textContent + positionCell[1].textContent;
	} else if (positionCell[1].className == "split"){
			positionArray[0] = positionCell[0].textContent + positionCell[3].textContent;
			positionArray[1] = positionCell[2].textContent + positionCell[3].textContent;
	} else if (positionCell[3].className == "f"){
			positionArray[0] = positionCell[0].textContent + positionCell[1].textContent;
			positionArray[1] = positionCell[3].textContent;
	} else {
			positionArray[0] = positionCell[0].textContent + positionCell[1].textContent;
			positionArray[1] = positionCell[0].textContent + positionCell[3].textContent;
	}
	var gettr = document.getElementsByTagName("tr");
	var trnum = 6;
	var rou = gettr[trnum+2].getElementsByTagName("td")[0].innerHTML;
	rou = Math.pow(5/3, Math.LOG2E * Math.log(rou * 10)) * 0.4;
	for (var i = 0; i < positionArray.length; i++){
			var positionIndex = document.findPositionIndex(positionArray[i]);
			FP[i] = positionIndex;
			FP[i+1] = FP[i];
			if (positionIndex > -1) {
				SKs[i] = document.calculateSkill(positionIndex, skills);
			}
			if (i == 0) REREC = document.calculateREREC(positionIndex, skills, gettr, trnum, rou, rou_factor);
	}
	
	var SI = new String(gettr[trnum].getElementsByTagName("td")[0].innerHTML).replace(/,/g, "");
	
	if (positionIndex == 13){
		var phySum = skills[0]*1 + skills[1]*1 + skills[2]*1 + skills[7]*1;
		var tacSum = skills[4]*1 + skills[6]*1 + skills[8]*1;
		var tecSum = skills[3]*1 + skills[5]*1 + skills[9]*1 + skills[10]*1;
		var weight = 48717927500;
	}
	else {
		var phySum = skills[0]*1 + skills[1]*1 + skills[2]*1 + skills[10]*1;
		var tacSum = skills[3]*1 + skills[4]*1 + skills[5]*1 + skills[6]*1;
		var tecSum = skills[7]*1 + skills[8]*1 + skills[9]*1 + skills[11]*1 + skills[12]*1 + skills[13]*1;
		var weight = 263533760000;
	}
	var allSum = phySum + tacSum + tecSum;
	var remainder = funFix2(Math.pow(2,Math.log(weight*SI)/Math.log(Math.pow(2,7))) - allSum);
	
	var recth = document.createElement("div");
	var rectd = document.createElement("div");
	var ratth = document.createElement("div");
	var rattd = document.createElement("div");
	rectd.setAttribute("style", "color: gold;");
	rattd.setAttribute("style", "color: gold;");
	for (i = 0; i < FP.length; i++) {
		for (j = 0; 2+j <= FP[i]; j += 2) FP[i]--;
	}
	if (FP[0] != FP[1]) {
		rectd.innerHTML = REREC[0][FP[0]] + "/" + REREC[0][FP[1]];
		rattd.innerHTML = REREC[2][FP[0]] + "/" + REREC[2][FP[1]];
		var ratingR2 = rattd.innerHTML;
		var rouEffect = funFix(REREC[2][FP[0]]*1 - REREC[1][FP[0]]*1) + "/" + funFix(REREC[2][FP[1]]*1 - REREC[1][FP[1]]*1);
		var R2Pure = REREC[1][FP[0]] + "/" + REREC[1][FP[1]];
	}
	else {
		rectd.innerHTML = REREC[0][FP[0]];
		rattd.innerHTML = REREC[2][FP[0]];
		var ratingR2 = rattd.innerHTML;
		var rouEffect = funFix(REREC[2][FP[0]]*1 - REREC[1][FP[0]]*1);
		var R2Pure = REREC[1][FP[0]];
	}
	recth.innerHTML = "<b style=\"color: gold;\">REREC</b>";
	ratth.innerHTML = "<b style=\"color: gold;\">RatingR2</b>";
	gettr[trnum-1].getElementsByTagName("th")[0].appendChild(recth);
	gettr[trnum-1].getElementsByTagName("td")[0].appendChild(rectd);
	gettr[trnum+2].getElementsByTagName("th")[0].appendChild(ratth);
	gettr[trnum+2].getElementsByTagName("td")[0].appendChild(rattd);
	
	var div_area = document.createElement('div');
	
    if(lang=="ENG")   
	div_area.innerHTML="<div id=\"area\" style=\"position: absolute; z-index: 1000; width: 175px; margin-top: 25px; background: #5F8D2D; color: #ff9900; padding-left: 5px; -moz-opacity: .8; text-align: middle; color: gold; border: 2px #333333 outset; display:inline;\"><p style=\"text-decoration: underline;\"><b>PlayerData+:<\p><table style=\"margin-top: -1em; margin-bottom: 1em;\"><tr><td>PhySum: </td><td>" + phySum + " / " + Math.round(100 * phySum / 80) +"%  </td></tr><tr><td>TacSum: </td><td>" + tacSum +  " / " + Math.round(100 * tacSum / 80) +"%  </td></tr><tr><td>TecSum: </td><td>" + tecSum + " / " + Math.round(100 * tecSum / 120) +"%  </td></tr><tr><td>AllSum: </td><td>" + allSum + " + " + remainder + " </td></tr><tr><td>&nbsp;</td></tr><tr><td>RatingR2: </td><td>" + ratingR2 + " </td></tr><tr><td>RouEffect: </td><td>" + rouEffect + " </td></tr><tr><td>Rating-Pure: </td><td>" + R2Pure + "</td></tr></table></b></div>";
	// to translate
	if(lang=="CHS")
	div_area.innerHTML="<div id=\"area\" style=\"position: absolute; z-index: 1000; width: 175px; margin-top: 25px; background: #5F8D2D; color: #ff9900; padding-left: 5px; -moz-opacity: .8; text-align: middle; color: gold; border: 2px #333333 outset; display:inline;\"><p style=\"text-decoration: underline;\"><b>PlayerData+:<\p><table style=\"margin-top: -1em; margin-bottom: 1em;\"><tr><td>体能总数: </td><td>" + phySum + " / " + Math.round(100 * phySum / 80) +"% </td></tr><tr><td>战术总数: </td><td>" + tacSum + " / " + Math.round(100 * tacSum / 80) +"% </td></tr><tr><td>技术总数: </td><td>" + tecSum +  " / " + Math.round(100 * tecSum / 120) +"% </td></tr><tr><td>总技能数: </td><td>" + allSum + " + " + remainder + " </td></tr><tr><td>&nbsp;</td></tr><tr><td>评价R2: </td><td>" + ratingR2 + " </td></tr><tr><td>经验加成: </td><td>" + rouEffect + " </td></tr><tr><td>纯技能评价: </td><td>" + R2Pure + "</td></tr></table></b></div>";
     // 需要重新定位小窗口，适应大部分浏览器
    var getbox=document.getElementsByTagName("div")
    for (k = 0; k < getbox.length; k++){
			if (getbox[k].className=="box_body") break;
			
		}


    
	document.getElementsByTagName("div")[k].appendChild(div_area);
	
	document.createTR(table, SKs);
	
	if (positionIndex != 13) {
		var table2 = document.createElement("table");
		var div = document.createElement("div");
		var tbody = document.createElement("tbody");
		table2.setAttribute("border", "1");  
		table2.setAttribute("bordercolor", "#6C9922");  
		table2.innerHTML = "<thead><tr><th></th><th>DC</th><th>DLR</th><th>DMC</th><th>DMLR</th><th>MC</th><th>MLR</th><th>OMC</th><th>OMLR</th><th>F</th></tr></thead>";
		tbody.setAttribute("align", "center");  
		var tr = document.createElement("tr");
		
		for (var i = 0; i < 3; i+=2) {
			var th = document.createElement("th");
			if (i == 0) th.innerHTML = "REREC";
			else th.innerHTML = "RatingR2";
			tr.appendChild(th);
			
			for (var j = 0; j < 9; j++) {
				var td = document.createElement("td");
				if (REREC[i][j]*1 >= 100) {
					REREC[i][j] = funFix2(REREC[i][j]*1);
				}
				td.innerHTML = REREC[i][j];
				tr.appendChild(td);
			}
			tbody.appendChild(tr);
			table2.appendChild(tbody);
			
			var tr = document.createElement("tr");
			var th = document.createElement("th");
			th.setAttribute("colspan", "4");  
			th.setAttribute("align", "center");  
			th.appendChild(table2);
		}
		tr.appendChild(th);
		table.appendChild(tr);
	}
	
	return SKs;
	} // end fo computeSK
	
	document.calculateREREC = function (positionIndex, skills, gettr, num, rou, rou_factor){
		var rec = [];			// REREC
		var ratingR = [];		// RatingR2
		var ratingR2 = [];		// RatingR2 + routine
		var skillSum = 0;
		var SI = new String(gettr[num].getElementsByTagName("td")[0].innerHTML).replace(/,/g, "");
		if (positionIndex == 13) {
			var skillWeightSum = Math.pow(SI, 0.143) / 0.02979;			// GK Skillsum
			var weight = 48717927500;
		}
		else {
			var skillWeightSum = Math.pow(SI, 1/6.99194)/0.02336483;	// Other Skillsum
			var weight = 263533760000;
		}
		for (var i = 0; i < skills.length; i++) {
			skillSum += parseInt(skills[i]);
		}
		for (i = 0; 2+i <= positionIndex; i += 2) {		// TrExMaとRECのweight表のずれ修正
			positionIndex--;
		}
		skillWeightSum -= skillSum;			// REREC remainder
		var remainder = Math.round((Math.pow(2,Math.log(weight*SI)/Math.log(Math.pow(2,7))) - skillSum)*10)/10;		// RatingR2 remainder
		for (var i = 0; i < 10; i++) {
			rec[i] = 0;
			ratingR[i] = 0;
		}
		for (var j = 0; j < 9; j++) {		// All position
			var remainderWeight = 0;		// REREC remainder weight sum
			var remainderWeight2 = 0;		// RatingR2 remainder weight sum
			var not20 = 0;					// 20以外のスキル数
			if (positionIndex == 9) j = 9;	// GK
			
			for (var i = 0; i < weightR[positionIndex].length; i++) {
				rec[j] += skills[i] * weightR[j][i];
				ratingR[j] += skills[i] * weightR2[j][i];
				if (skills[i] != 20) {
					remainderWeight += weightR[j][i];
					remainderWeight2 += weightR2[j][i];
					not20 += 1;
				}
			}
			rec[j] += skillWeightSum * remainderWeight / not20;		//REREC Score
			if (positionIndex == 9) rec[j] *= 1.27					//GK
			rec[j] = funFix((rec[j] - recLast[0][j]) / recLast[1][j]);
			ratingR[j] += remainder * remainderWeight2 / not20;
			ratingR2[j] = funFix(ratingR[j] * (1 + rou * rou_factor));
			ratingR[j] = funFix(ratingR[j]);
			if (positionIndex == 9) j = 9;		// Loop end
		}
		
		var recAndRating = [rec, ratingR, ratingR2];
		return recAndRating;
	}; // end of document.calculateREREC
	
	function seasonSI () {
	var today = new Date();
	var s36t = new Date("01 28 2014 00:10:00 GMT");
	var daysbetween = (today.getTime()-s36t.getTime())/1000/3600/24;
	var weeks = Math.floor(daysbetween/7);
	weeks=weeks%12;
	weeks++;
    if(weeks==0)return;
     
		var sith = document.createElement("div");
		var sitd = document.createElement("div");
		var gettr = document.getElementsByTagName("tr");
		var trnum = 14;
		var SI = new String(gettr[trnum].getElementsByTagName("td")[0].innerHTML).replace(/,/g, "");
		var wage = new String(gettr[trnum-2].getElementsByTagName("span")[0].innerHTML).replace(/,/g, "");
		//alert(SI+"XX"+wage);
		var age = new String(gettr[trnum-4].getElementsByTagName("td")[0].innerHTML);
		var yearidx = age.search(/\d\d/);
		var year = age.substr(yearidx,2);
		age = age.slice(yearidx+2);
		age = age.replace(/\D+/g,"");
		var month = age;
		year = parseInt(year);
		month = parseInt(month);
                SI= parseInt(SI);
                wage=parseInt(wage);
    if(wage==30000||wage==31500)return;
		//alert(trnum+"XX"+age);
		//to do 
       
	var vcSeasonASI =  wage / wage_rate ;

	var vcSeasonSkill =-5.8448563*Math.pow(vcSeasonASI, -0.0425431)+ 41.33876*Math.pow(vcSeasonASI,0.1445571);
	var vcSkill =-5.8448563*Math.pow(SI, -0.0425431)+ 41.33876*Math.pow(SI,0.1445571);	
	var vcTI = (vcSkill - vcSeasonSkill)*10;

	if(isGK)
	vcTI=vcTI*11/14;
	var vcTI2= vcTI.toFixed(1);


	var vcTIevg = vcTI/weeks ; 
	vcTIevg = vcTIevg.toFixed(1);

	var isShowNew =  false;
	if(year<22&&weeks>month&&month>1)
    {   isShowNew = true;
	var NEWvcSeasonASI =  wage / wage_rate_new ;
	var NEWvcSeasonSkill =-5.8448563*Math.pow(NEWvcSeasonASI, -0.0425431)+ 41.33876*Math.pow(NEWvcSeasonASI,0.1445571);
	var NEWvcTI = (vcSkill - NEWvcSeasonSkill)*10;
	if(isGK)
	NEWvcTI=NEWvcTI*11/14;
	var NEWvcTI2= NEWvcTI.toFixed(1);
	var NEWvcTIevg = NEWvcTI/(month-1) ; 
	NEWvcTIevg = NEWvcTIevg.toFixed(1);

	if(NEWvcTIevg<0)isShowNew=false;
	

    }
        // to translate
        if(lang=="ENG")
	sith.innerHTML = "Season TI";
        if(lang=="CHS")
        sith.innerHTML = "赛季TI";
        sitd.innerHTML = vcTIevg+" X "+weeks+" = "+vcTI2;
		gettr[trnum].getElementsByTagName("th")[0].appendChild(sith);
		gettr[trnum].getElementsByTagName("td")[0].appendChild(sitd);
	

  if(isShowNew)
  {
        var sith2 = document.createElement("div");
	var sitd2 = document.createElement("div");
        if(lang=="ENG")
	sith2.innerHTML = "Season TI New";
        if(lang=="CHS")
        sith2.innerHTML = "新球员赛季TI";
        sitd2.innerHTML = NEWvcTIevg+" X "+(month-1)+" = "+NEWvcTI2;
                gettr[trnum].getElementsByTagName("th")[0].appendChild(sith2);
		gettr[trnum].getElementsByTagName("td")[0].appendChild(sitd2);
  }

	}//end of Season SI
	
    function addBt()
    {
        var title = document.getElementsByTagName("head")[0];
        var myscript = document.createElement("script");
        myscript.type="text/javascript";
        myscript.innerHTML = "function getDetail(){ \n";
       myscript.innerHTML+= "var isGK= false; \n";
        myscript.innerHTML+= "if(document.getElementsByClassName(\"favposition long\")[0].innerHTML.indexOf(\"gk\")>0)isGK=true; \n";
       myscript.innerHTML+="var gettr2 = $(\".float_left&.zebra\");\n";
       myscript.innerHTML+="var clubid = new String(gettr2[0].getElementsByTagName(\"a\")[0].getAttribute(\"club_link\")).replace(/,/g, \"\"); \n";  
		myscript.innerHTML+="var player_id_str = new String(player_id);\n";

        // start ajax
        myscript.innerHTML+="$.post(\"http://trophymanager.com/ajax/players_get_select.ajax.php\",{type:\"change\",club_id:clubid},function(data){\n";                        
   
		myscript.innerHTML+="if(data != null){	\n"; 
        myscript.innerHTML+="$.each(data.post,function(idx,item){ \n"; 
		myscript.innerHTML+="if(player_id_str==idx){ 	\n"; 
        myscript.innerHTML+="var skilltable = $(\".skill_table&.zebra\");\n"; 
        myscript.innerHTML+="var skilltbaletr =  skilltable[0].getElementsByTagName(\"tr\");\n"; 
       
  		myscript.innerHTML+="if(isGK)  {\n"; 
     
     				
                    myscript.innerHTML+="skilltbaletr[0].getElementsByTagName(\"td\")[0].innerHTML=item.strength;\n"; 
                    myscript.innerHTML+="skilltbaletr[0].getElementsByTagName(\"td\")[1].innerHTML=item.handling;\n"; 
                    myscript.innerHTML+="skilltbaletr[1].getElementsByTagName(\"td\")[0].innerHTML=item.stamina;\n"; 
                    myscript.innerHTML+="skilltbaletr[1].getElementsByTagName(\"td\")[1].innerHTML=item.oneonones; \n";  
                    myscript.innerHTML+="skilltbaletr[2].getElementsByTagName(\"td\")[0].innerHTML=item.pace;\n"; 
                    myscript.innerHTML+="skilltbaletr[2].getElementsByTagName(\"td\")[1].innerHTML=item.reflexes;\n"; 
                    myscript.innerHTML+="skilltbaletr[3].getElementsByTagName(\"td\")[1].innerHTML=item.arialability;\n"; 
                    myscript.innerHTML+="skilltbaletr[4].getElementsByTagName(\"td\")[1].innerHTML=item.jumping;\n"; 
                    myscript.innerHTML+="skilltbaletr[5].getElementsByTagName(\"td\")[1].innerHTML=item.communication;\n"; 
                    myscript.innerHTML+="skilltbaletr[6].getElementsByTagName(\"td\")[1].innerHTML=item.kicking;\n"; 
                    myscript.innerHTML+="skilltbaletr[7].getElementsByTagName(\"td\")[1].innerHTML=item.throwing;\n"; 
                    myscript.innerHTML+=" } else  {\n"; 
                
                   
                    myscript.innerHTML+="skilltbaletr[0].getElementsByTagName(\"td\")[0].innerHTML=item.strength;\n"; 
                    myscript.innerHTML+="skilltbaletr[0].getElementsByTagName(\"td\")[1].innerHTML=item.passing;\n"; 
                    myscript.innerHTML+="skilltbaletr[1].getElementsByTagName(\"td\")[0].innerHTML=item.stamina;\n"; 
                    myscript.innerHTML+="skilltbaletr[1].getElementsByTagName(\"td\")[1].innerHTML=item.crossing;\n"; 
                    myscript.innerHTML+="skilltbaletr[2].getElementsByTagName(\"td\")[0].innerHTML=item.pace;\n"; 
                    myscript.innerHTML+="skilltbaletr[2].getElementsByTagName(\"td\")[1].innerHTML=item.technique;\n"; 
                    myscript.innerHTML+="skilltbaletr[3].getElementsByTagName(\"td\")[0].innerHTML=item.marking;\n"; 
                    myscript.innerHTML+="skilltbaletr[3].getElementsByTagName(\"td\")[1].innerHTML=item.heading;\n"; 
                    myscript.innerHTML+="skilltbaletr[4].getElementsByTagName(\"td\")[0].innerHTML=item.tackling;\n"; 
                    myscript.innerHTML+="skilltbaletr[4].getElementsByTagName(\"td\")[1].innerHTML=item.finishing;\n"; 
                    myscript.innerHTML+="skilltbaletr[5].getElementsByTagName(\"td\")[0].innerHTML=item.workrate;\n"; 
                    myscript.innerHTML+="skilltbaletr[5].getElementsByTagName(\"td\")[1].innerHTML=item.longshots;\n"; 
                    myscript.innerHTML+="skilltbaletr[6].getElementsByTagName(\"td\")[0].innerHTML=item.positioning;\n"; 
                    myscript.innerHTML+="skilltbaletr[6].getElementsByTagName(\"td\")[1].innerHTML=item.setpieces;\n"; 
	  				 myscript.innerHTML+=" }}} )}},\"json\");\n"; 
        		//end ajax
               
        			myscript.innerHTML+="}\n"; 
        
        
        title.appendChild(myscript);                                                 
        
        var h =  document.getElementsByTagName("h3")[0];
        //"/pics/magnifying_glass_normal.png"
        h.innerHTML=h.innerHTML+"  &nbsp; &nbsp;<a href=\"javascript:getDetail()\" class=\"magnify\"><img src=\"/pics/magnifying_glass_normal.png\">显示小数</a>(请勿泄漏，泄漏就彻底废了)";
   
        
    }
    

    
	(function() {
        addBt();
		var playerTable = document.getElementsByClassName("skill_table zebra")[0];
		var skillArray = document.getSkills(playerTable);
		var SKs = computeSK(playerTable, skillArray);
		seasonSI();

	})();
}//end see "if" at Line 92
