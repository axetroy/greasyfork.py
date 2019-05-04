// ==UserScript==
// @name         FGO Wiki从者NP获取率TOP5显示
// @namespace    https://greasyfork.org/zh-CN/scripts/34655-wiki%E4%BB%8E%E8%80%85np%E8%8E%B7%E5%8F%96%E7%8E%87%E6%98%BE%E7%A4%BA
// @version      1.8
// @description  FGO Wiki从者NP获取率TOP5显示(敌补正默认为1，支持宝具NP回收率计算，此外被动Buff也会自动加载)
// @author       xianlechuanshuo
// @require      https://cdn.bootcss.com/jquery/1.12.4/jquery.js
// @match        *://fgowiki.com/guide/petdetail*
// @grant        none
// ==/UserScript==


var jQ1=jQuery.noConflict();
jQ1(function(){
    'use strict';
	let url=location.href,
	artsHit=parseInt(jQ1(".ArtHit").text()),
	busterHit=parseInt(jQ1(".BusterHit").text()),
	quickHit=parseInt(jQ1(".QuickHit").text()),
	exHit=parseInt(jQ1(".ExtraHit").text()),
	begin=url.lastIndexOf("/")+1,
	no=url.substr(begin);
    if(isNaN(no)) no=1;
	if(no=="157"||no=="90"){//157:黑a，90:花嫁
		//黑a和花嫁正确的ex hit数是5，wiki上的是4，是不对的。
		exHit=5;
		jQ1(".ExtraHit").text("5 Hits");
	}


	let optionsHtml=`<tr class='trCalcBox' data-show='0'><td colspan='5'>
						<div class='calcBox'>
							<ul>
								<li>BUFF</li>
								<li>
									NP获得提升(%)：<input type='number' id='txtNpBuff' value='0'>
									蓝魔放(%)：<input type='number' id='txtArtsBuff' value='0'>
									绿魔放(%)：<input type='number' id='txtQuickBuff' value='0'>
									<label for='ckSpecialSkill1'><input id='ckSpecialSkill1' type='checkbox'>第五势</label>
								</li>
							</ul>
							<ul>
								<li>首卡</li>
								<li>
									<label for='ckIsOverkill_first'><input id='ckIsOverkill_first' type='checkbox'>鞭尸</label>
								</li>
								<li>
									<label for='ckIsCritical_first'><input id='ckIsCritical_first' type='checkbox'>暴击</label>
								</li>
							</ul>
							<ul>
								<li>次卡</li>
								<li>
									<label for='ckIsOverkill_second'><input id='ckIsOverkill_second' type='checkbox'>鞭尸</label>
								</li>
								<li>
									<label for='ckIsCritical_second'><input id='ckIsCritical_second' type='checkbox'>暴击</label>
								</li>
							</ul>
							<ul>
								<li>尾卡</li>
								<li>
									<label for='ckIsOverkill_third'><input id='ckIsOverkill_third' type='checkbox'>鞭尸</label>
								</li>
								<li>
									<label for='ckIsCritical_third'><input id='ckIsCritical_third' type='checkbox'>暴击</label>
								</li>
							</ul>
							<ul>
								<li>EX</li>
								<li>
									<label for='ckIsOverkill_ex'><input id='ckIsOverkill_ex' type='checkbox'>鞭尸</label>
								</li>
							</ul>
			    			<ul class='treasureHit'>
								<li>
								宝具Hit数：<input type='number' id='txtTreasureHit' value='0'>
								<label for='ckIsOverkill_treasure'><input id='ckIsOverkill_treasure' type='checkbox'>鞭尸</label>
								宝具NP回收率(%)：<span id='spanTreasureNP'>0</span>
								<label for='ckIsIgnoreTreasure'><input id='ckIsIgnoreTreasure' type='checkbox'>忽略宝具组合</label>
								</li>
							</ul>
						</div>
					</td></tr>`;


	let npObj={
		arts:{
			hit:artsHit,
			num:jQ1(".CCards>img[src*=Arts]").length,
			np:parseFloat(jQ1(".TdPointA").text())
		},
		buster:{
			hit:busterHit,
			num:jQ1(".CCards>img[src*=Buster]").length,
			np:parseFloat(jQ1(".TdPointB").text())
		},
		quick:{
			hit:quickHit,
			num:jQ1(".CCards>img[src*=Quick]").length,
			np:parseFloat(jQ1(".TdPointQ").text())
		},
		ex:{
			hit:exHit,
			np:parseFloat(jQ1(".TdPointEx").text())
		}
	};
	//解决js全局变量污染问题，只定义一个全局变量，其他变量挂在这个全局变量下面，有点类似java的包
	window.Global_wiki={};
	window.Global_wiki.npObj=npObj;
	window.Global_wiki.no=no;

	//同步请求宝具相关数据
	loadTreasureData(no);
	let t=window.Global_wiki.npObj.treasure,
	c=window.Global_wiki.careerSkill;

	let tempArr=["宝"],
	a=Global_wiki.npObj.arts,
	b=Global_wiki.npObj.buster,
	q=Global_wiki.npObj.quick;


	for(let i=0;i<a.num;i++){
		tempArr.push("A");
	}
	for(let i=0;i<b.num;i++){
		tempArr.push("B");
	}
	for(let i=0;i<q.num;i++){
		tempArr.push("Q");
	}

	let tempArr1=tempArr,
	tempArr2=tempArr.slice(0),
	tempArr3=tempArr.slice(0),
	cardArr=[];

	tempArr1.forEach(function(a1,i){
		//i≠j≠k
		tempArr2.forEach(function(b1,j){
			tempArr3.forEach(function(q1,k){
				if(i!=j&&i!=k&&j!=k) cardArr.push(a1+b1+q1);
			});
		});
	});
	//总共42或34种组合(去重后)
	cardArr=Array.from(new Set(cardArr));
	window.Global_wiki.cardArr=cardArr;


	let npArr=[];
	cardArr.forEach(function(res){
		// abq
		let npObj=calcCardNp(res);
		npArr.push(npObj);
	});

    npArr=npArr.sort(compare("totalNp"));
    let parent=jQ1(".InitiativeNp").parent().parent(),
        head=jQ1("<tr><td colspan='5' class='Databox-head Databox-head-G' style='color:white'>NP获取率TOP5(敌补正为<span class='spanEnemyCorrections'>1</span>)</td></tr>"),
        contenHtml="<tr><td colspan='5' style='text-align:left;padding-left:50px' class='calcResult'>",
        img=jQ1("<img class='btnCalc' src='https:\/\/xianlechuanshuo.github.io\/photo\/icon\/calc.png'></img>");
    parent.after(head);
    img.css(
    {
    	"vertical-align":"middle",
    	"width":"27px",
    	"height":"27px"
    });
    head.children("td").append(img);
	for(let i=0;i<npArr.length;i++){
		let npObj=npArr[i],
		cardStr=npObj.cardStr;
		if(!cardStr.includes("宝"))cardStr="&nbsp;"+cardStr;
		if(i==5)break;
        contenHtml+=`${cardStr}+EX： 首卡：${changeWidth(npObj.first)} 次卡：${changeWidth(npObj.second)} 尾卡：${changeWidth(npObj.third)} EX：${changeWidth(npObj.ex)} 总计:${changeWidth(npObj.totalNp)}<br>`;
	}
    contenHtml+="</td></tr>";
    head.after(contenHtml);
    head.after(optionsHtml);

    //设置默认值
    jQ1("#txtTreasureHit").val(t.hit);
    jQ1("#txtArtsBuff").val(c.artsBuff);
    jQ1("#txtQuickBuff").val(c.quickBuff);
    jQ1("#spanTreasureNP").text(calcTreasureNP(t.card));

    //追加样式
    jQ1(".trCalcBox").css(
    {
    	"display":"none"
    });
    jQ1(".calcBox").css(
    {
		"height":"150px",
		"margin":"0 auto",
		"text-align":"left",
		"padding":"10px 0 0 30px"
    });
    jQ1(".calcBox>ul,.calcBox input[type=checkbox]").css(
    {
    	"list-style":"none",
    	"margin":"0",
    	"padding":"0"
    });
    jQ1(".calcBox input[type=number]").css(
    {
    	"text-align":"center"
    });
    jQ1(".calcBox>ul:not(:nth-child(1))").css(
    {
		"float":"left",
		"width":"125px"
    });
    jQ1(".calcBox>ul:last-child").css(
    {
		"clear":"both",
		"width":"100%"
    });
    jQ1(".calcBox>ul>li:not(:nth-child(1))").css(
    {
		"padding-left":"30px"
    });
    jQ1(".calcBox input").css(
    {
		"vertical-align": "middle"
    });
    jQ1(".calcBox input[type=number]").css(
    {
		"width":"50px"
    });


    if(no!="153"){//武藏
		jQ1(".calcBox label[for=ckSpecialSkill1]").hide();
	}
    //设置点击计算器图标事件
    jQ1(".btnCalc").click(function(){
    	let show=jQ1(".trCalcBox").data("show");
    	if(show=="0"){//原本隐藏状态，现在要显示
    		jQ1(".trCalcBox").show();
    		jQ1(".spanEnemyCorrections").html(`<input type='number' id='txtEnemyCorrections' value='1'>`);
		    jQ1("#txtEnemyCorrections").bind("input propertychange",function(){
		    	reCalc();
		    });
    		jQ1("#txtEnemyCorrections").css(
    		{
    			"color":"#000",
    			"width":"50px",
    			"text-align":"center"
    		});
    		let treasureHit=window.Global_wiki.npObj.treasure.hit;
    		jQ1("#txtTreasureHit").val(treasureHit);


    	}
    	else{//原本显示状态，现在要隐藏
    		jQ1(".trCalcBox").hide();
    		jQ1("#txtNpBuff").val("0");
    		jQ1("#txtTreasureHit").val(window.Global_wiki.npObj.treasure.hit);//恢复宝具Hit数默认值
    		jQ1("#txtArtsBuff").val(window.Global_wiki.careerSkill.artsBuff);//恢复被动蓝卡BUFF
    		jQ1("#txtQuickBuff").val(window.Global_wiki.careerSkill.quickBuff);//恢复被动绿卡BUFF
    		jQ1(".calcBox input[type=checkbox]").prop("checked",false);
    		jQ1(".spanEnemyCorrections").html("1");
    		jQ1("#ckSpecialSkill1").change();


    	}
    	jQ1(".trCalcBox").data("show",show=="0"?"1":"0");
    });

    //绑定【NP获得提升】、【蓝魔放】、【绿魔放】输入内容改变事件
    jQ1(".calcBox input[type=number]").bind("input propertychange",function(){
    	reCalc();
    });

    //绑定【第五势】勾选状态切换事件
    jQ1("#ckSpecialSkill1").change(function(){
    	let checked=jQ1("#ckSpecialSkill1").prop("checked");
    	if(checked){
    		window.Global_wiki.npObj.arts.hit*=2;
    		window.Global_wiki.npObj.buster.hit*=2;
    		window.Global_wiki.npObj.quick.hit*=2;
    		window.Global_wiki.npObj.ex.hit*=2;
    	}
    	else{
     		window.Global_wiki.npObj.arts.hit=parseInt(jQ1(".ArtHit").text());
    		window.Global_wiki.npObj.buster.hit=parseInt(jQ1(".BusterHit").text());
    		window.Global_wiki.npObj.quick.hit=parseInt(jQ1(".QuickHit").text());
    		window.Global_wiki.npObj.ex.hit=parseInt(jQ1(".ExtraHit").text());
    	}
    	reCalc();
    });

    //绑定【鞭尸】、【暴击】、【忽略宝具组合】勾选状态切换事件
    jQ1(".calcBox input[type=checkbox]:not(#ckSpecialSkill1)").change(function(){
    	reCalc();
    });


});


function reCalc(){
	'use strict';
	let cardArr=window.Global_wiki.cardArr;
	let npArr=[];
	cardArr.forEach(function(res){
		// abq
		if(!(jQ1("#ckIsIgnoreTreasure").prop("checked")&&res.includes("宝"))){
			let npObj=calcCardNp(res);
			npArr.push(npObj);
		}
	});
    npArr=npArr.sort(compare("totalNp"));
    jQ1(".calcResult").empty();

    let contenHtml="";
	for(let i=0;i<npArr.length;i++){
		let npObj=npArr[i],
		cardStr=npObj.cardStr;
		if(!cardStr.includes("宝"))cardStr="&nbsp;"+cardStr;
		if(i==5)break;
        contenHtml+=`${cardStr}+EX： 首卡：${changeWidth(npObj.first)} 次卡：${changeWidth(npObj.second)} 尾卡：${changeWidth(npObj.third)} EX：${changeWidth(npObj.ex)} 总计:${changeWidth(npObj.totalNp)}<br>`;
	}
	let t=window.Global_wiki.npObj.treasure,
	treasureNP=calcTreasureNP(t.card);
    jQ1("#spanTreasureNP").text(treasureNP);
    jQ1(".calcResult").html(contenHtml);
}

//同步加载宝具相关数据
function loadTreasureData(no){
	'use strict';
	jQ1.ajaxSettings.async = false; //同步执行
	jQ1.getJSON('https://xianlechuanshuo.github.io/fgo/js/nps.json', {rd:Math.random()}, function(data, textStatus) {
			if (textStatus=="success") {
				let ok=false;
				for(let i=0;i<data.length;i++){
					if(data[i].n==no){
						window.Global_wiki.npObj.treasure={
					    		hit:data[i].h,
								np:parseFloat(jQ1(".InitiativeNp").text()),
								card:jQ1(".Skill-ico>img[src*=Arts]").length>0?"A":(jQ1(".Skill-ico>img[src*=Buster]").length>0?"B":"Q")
						};
					    window.Global_wiki.careerSkill={
					    	artsBuff:data[i].a,
					    	quickBuff:data[i].q
					    };
					    ok=true;
						break;
					}
				}
				if(!ok){
						window.Global_wiki.npObj.treasure={
					    		hit:0,
								np:parseFloat(jQ1(".InitiativeNp").text()),
								card:jQ1(".Skill-ico>img[src*=Arts]").length>0?"A":(jQ1(".Skill-ico>img[src*=Buster]").length>0?"B":"Q")
						};
					    window.Global_wiki.careerSkill={
					    	artsBuff:0,
					    	quickBuff:0
					    };
				}
				// console.log(window.Global_wiki.npObj.treasure);
				// console.log(window.Global_wiki.careerSkill);
			}
	});
	jQ1.ajaxSettings.async = true; //异步执行
}

function getIsOverkillAndisCritical(position){
	'use strict';
	let ckIsOverkill_first=jQ1("#ckIsOverkill_first").prop("checked"),
	ckIsCritical_first=jQ1("#ckIsCritical_first").prop("checked"),
	ckIsOverkill_second=jQ1("#ckIsOverkill_second").prop("checked"),
	ckIsCritical_second=jQ1("#ckIsCritical_second").prop("checked"),
	ckIsOverkill_third=jQ1("#ckIsOverkill_third").prop("checked"),
	ckIsCritical_third=jQ1("#ckIsCritical_third").prop("checked"),
	ckIsOverkill_ex=jQ1("#ckIsOverkill_ex").prop("checked"),
	isOverkill=1,
	isCritical=1;
		switch(position){
			case 1://1位
				isOverkill=ckIsOverkill_first===true?1.5:1;
				isCritical=ckIsCritical_first===true?2:1;
				break;
			case 2://2位
				isOverkill=ckIsOverkill_second===true?1.5:1;
				isCritical=ckIsCritical_second===true?2:1;
				break;
			case 3://3位
				isOverkill=ckIsOverkill_third===true?1.5:1;
				isCritical=ckIsCritical_third===true?2:1;
				break;
			case 4://四位EX
				isOverkill=ckIsOverkill_ex===true?1.5:1;
				break;
		}
		return {
			isOverkill:isOverkill,
			isCritical:isCritical
		};
}

function calcTreasureNP(card){
	'use strict';
	// NP獲得量 = 基本NP獲得率(baseNp) × [(卡片倍率 x (1 ± 卡片性能Buff)] × (1 + NP獲得量Buff)
	// × Overkill補正 × 攻擊Hit數 × 敌补正(假设为1)
	// console.log("calcTreasureNP card:"+card);
	let cardObj=getTreasureDetials(card);
	// console.log(cardObj);

	let np=cardObj.baseNp*[cardObj.cardRate*(1+cardObj.cardBuff)]*(1+cardObj.npBuff)*cardObj.isOverkill*cardObj.hit*cardObj.enemyCorrections;

	return Math.floor(np*100)/100;
}


function getTreasureDetials(card){
	let t=window.Global_wiki.npObj.treasure,
		c=window.Global_wiki.careerSkill;

	if(card=="宝")card=t.card;

	let treasureHit=jQ1("#txtTreasureHit").length===0?t.hit:parseInt(jQ1("#txtTreasureHit").val()),
	artsBuff=jQ1("#txtArtsBuff").length===0?c.artsBuff/100:parseFloat(jQ1("#txtArtsBuff").val())/100,
	quickBuff=jQ1("#txtQuickBuff").length===0?c.quickBuff/100:parseFloat(jQ1("#txtQuickBuff").val())/100,
	cardBuff=0,
	npBuff=jQ1("#txtNpBuff").length===0?0:parseFloat(jQ1("#txtNpBuff").val())/100,
	isOverkill=jQ1("#ckIsOverkill_treasure").prop("checked")===true?1.5:1,
	enemyCorrections=jQ1("#txtEnemyCorrections").length===0?1:parseFloat(jQ1("#txtEnemyCorrections").val()),
	cardRate=0;
	switch(card){
		case "A":
			cardRate=3;
			cardBuff=artsBuff;
			break;
		case "B":
			cardRate=0;
			break;
		case "Q":
			cardRate=1;
			cardBuff=quickBuff;
			break;
	}

	return {
		cardRate:cardRate,
		baseNp:t.np,
		hit:treasureHit,
		cardBuff:cardBuff,
		npBuff:npBuff,
		isOverkill:isOverkill,
		enemyCorrections:enemyCorrections
	};

}


// 计算单卡NP
function calcSingleCardNp(firstCardReward,card,position){
	'use strict';
	// NP獲得量 = 基本NP獲得率(baseNp) × [(首卡加成 + 卡片倍率 x (1 ± 卡片性能Buff)] × (1 + NP獲得量Buff)
	// × Critical補正 × Overkill補正 × 攻擊Hit數 × 敌补正(假设为1)
	let cardObj=getCardDetails(card,position);
	let np=cardObj.baseNp*[firstCardReward+cardObj.cardRate*(1+cardObj.cardBuff)]*(1+cardObj.npBuff)*cardObj.isCritical*cardObj.isOverkill*cardObj.hit*cardObj.enemyCorrections;

	return Math.floor(np*100)/100;
}




function getCardDetails(card,position){
	'use strict';
	let cardRate=0,
	a=Global_wiki.npObj.arts,
	b=Global_wiki.npObj.buster,
	q=Global_wiki.npObj.quick,
	e=Global_wiki.npObj.ex,
	c=Global_wiki.careerSkill,
	artsBuff=jQ1("#txtArtsBuff").length===0?c.artsBuff/100:parseFloat(jQ1("#txtArtsBuff").val())/100,
	quickBuff=jQ1("#txtQuickBuff").length===0?c.quickBuff/100:parseFloat(jQ1("#txtQuickBuff").val())/100,
	npBuff=jQ1("#txtNpBuff").length===0?0:parseFloat(jQ1("#txtNpBuff").val())/100,
	enemyCorrections=jQ1("#txtEnemyCorrections").length===0?1:parseFloat(jQ1("#txtEnemyCorrections").val());
	let{isOverkill,isCritical}=getIsOverkillAndisCritical(position);
	switch(card){
		case "A":
			switch(position){
				case 1://1位A卡
					cardRate=3;
					break;
				case 2://2位A卡
					cardRate=4.5;
					break;
				case 3://3位A卡
					cardRate=6;
					break;
			}
			return {
				cardRate:cardRate,
				baseNp:a.np,
				hit:a.hit,
				cardBuff:artsBuff,
				npBuff:npBuff,
				isOverkill:isOverkill,
				isCritical:isCritical,
				enemyCorrections:enemyCorrections
			};
		case "B":
			return {
				cardRate:0,
				baseNp:b.np,
				hit:b.hit,
				cardBuff:0,
				npBuff:npBuff,
				isOverkill:isOverkill,
				isCritical:isCritical,
				enemyCorrections:enemyCorrections
			};
		case "Q":
			switch(position){
				case 1://1位Q卡
					cardRate=1;
					break;
				case 2://2位Q卡
					cardRate=1.5;
					break;
				case 3://3位Q卡
					cardRate=2;
					break;
			}
			return {
				cardRate:cardRate,
				baseNp:q.np,
				hit:q.hit,
				cardBuff:quickBuff,
				npBuff:npBuff,
				isOverkill:isOverkill,
				isCritical:isCritical,
				enemyCorrections:enemyCorrections
			};
		case "EX":
			return {
				cardRate:1,
				baseNp:e.np,
				hit:e.hit,
				cardBuff:0,
				npBuff:npBuff,
				isOverkill:isOverkill,
				isCritical:isCritical,
				enemyCorrections:enemyCorrections
			};
	}
}


function changeWidth(num){
	'use strict';
   let len=num.toString().length;
   if(len==1){//0
     num+="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
   }
   else if(len==2){//10
      num+="&nbsp;&nbsp;&nbsp;&nbsp;";
   }
   else if(len==3){//0.5
     num+="&nbsp;&nbsp;&nbsp;";
   }
   else if(len==4){//10.5
     num+="&nbsp;&nbsp;";
   }
   else if(len==5){//10.55
     num+="&nbsp;";
   }
   else if(len==6){//100.55
   	 num+="";
   }
   return num;
}

//从大到小排序
function compare(property) {
	'use strict';
    return function (a, b) {
        let value1 = a[property];
        let value2 = b[property];
        return value2 - value1;
    };
}


function calcCardNp(cardStr){
	'use strict';
	let first=cardStr[0],
	second=cardStr[1],
	third=cardStr[2],
	firstCardReward=0,
	isCritical=1,
	isOverkill=1,
	enemyCorrections=1,
	ex=0,
	totalNp=0,
	t=window.Global_wiki.npObj.treasure,
	artChainBuff=0;
	// console.log(t);
	// console.log(`cardStr:${cardStr},first:${first},second:${second},third:${third}`);
	if(first=="A"||(first=="宝"&&t.card=="A")){//首卡加成：1
		firstCardReward=1;
	}

	if(cardStr=="AAA")artChainBuff=20;

	let tmpSecond=second,
		tempThird=third;

	let treasureNP=calcTreasureNP("宝");

	first=first=="宝"?treasureNP:calcSingleCardNp(firstCardReward,first,1);
	second=second=="宝"?treasureNP:calcSingleCardNp(firstCardReward,second,2);
	third=third=="宝"?treasureNP:calcSingleCardNp(firstCardReward,third,3);

	//宝具放完NP就清光了_(:з」∠)_
	if (tmpSecond=="宝") {//A宝A，第一位A的NP清零
		first=0;
	}
	else if(tempThird=="宝"){//AA宝，第一位和第二位A的NP清零
		first=0;
		second=0;
	}
	ex=calcSingleCardNp(firstCardReward,"EX",4);

	// console.log(`cardStr:${cardStr},first:${first},second:${second},third:${third},artChainBuff:${artChainBuff}`);
	totalNp=Math.floor((first+second+third+ex+artChainBuff)*100)/100;
	return {
		cardStr:cardStr,
		first:first,
		second:second,
		third:third,
		ex:ex,
		totalNp:totalNp
	};
}