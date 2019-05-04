// ==UserScript==
// @name         ACGN股票系統訊息傳送BOT
// @namespace    http://tampermonkey.net/
// @version      87.8787878787
// @description  message transmission
// @author       papago89
// @maintain     euphokumiko
// @match        http://acgn-stock.com/instantMessage
// @match        https://acgn-stock.com/instantMessage
// @grant        mumimumi!!
// ==/UserScript==
var logDatas, logDataCount, i, message, count, date, nowTime, styleBtn = new Array(), releaseStockMessages = new Array(), pushFlag = false, def;

var priceLowerLimit = 1000; // 高價釋股判定方式 暫定最高單價釋股那隻股價要高於1000才判定為高價釋股
var noDealGap = 100; // 低量釋股特徵->已確定非高價且同時段之釋股清單中高低價相差大於Gap
var priceRegex = /公司以\$([0-9]+)的價格/;
var discordHallHighPriceBotUrl = "https://discordapp.com/api/webhooks/365451344821092352/bHg0vXz6sTfMUFNpzPD1X4-sluwVJQ6BHiuyn1hkWo6ULYga51Dg1uDZ0SZ5B1eefBNv";
var discordHallLowPriceBotUrl = "https://discordapp.com/api/webhooks/367002439062388746/7mSmS4pJ9dJnPbWvZA4iY-UK0AJ6qqHzkdkoxicufCROYPdFDeqyMamUtdnSTdRC31td";
var discordHallNoDealBotUrl = "https://discordapp.com/api/webhooks/366951428536664075/IwPET_1vK8XTDwgwuZ3YaEVgSDPLADgwQFbOgXfspnpDJfcWe3Anrmcj0UQUjoQdizWv";
var discordCompanyFoundedBotUrl = "https://discordapp.com/api/webhooks/367002825353330689/H3EElw3OdNinanMCgvhIaheaM4eb_jyYU1KfPVNnJlzGamgx1_YWJm4AwRPxRcKsAoId";
var discordpriceupdateBotUrl = "https://discordapp.com/api/webhooks/367012103921467392/jSZC0aLgPBCxfGdbV_vqDpA-v0XyT6QAJeI4Pjy9k1gBB3vNxlA3LeAUwItS9pojns84";
var recieveInstantMessageBotUrl = "https://discordapp.com/api/webhooks/365452121262260225/Qc_MixQ4Vwrjp2TmLUjqvX18EKaJpfM3pJeWiaa-jQn7eWATSWyvxhmj0sCB9cQh7och";

//getMinutes() getHours()
function sleep(milliseconds) 
{
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) 
  {
    if ((new Date().getTime() - start) > milliseconds)
	{
      break;
    }
  }
}

function pushMessageToDiscord(jsonString, targetUrl)
{
	var request = new XMLHttpRequest(); // xhr() 會建立非同步物件
	request.open("POST", targetUrl, false); // 同步連線 POST到該連線位址
	request.setRequestHeader('Content-Type', 'application/json');
    console.log(jsonString);
	request.send(jsonString);
}

function getTimeString(date)
{
    // getMonth()	Returns the month (from 0-11) ....為了正常顯示1~12月 手動+1
    return (date.getMonth() + 1) + "/" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes();
}

function parseMessage()
{
    var i, highestPrice, lowestPrice, messagePrice, obj, timeA, timeB, message, botUrl;
    highestPrice = 0;
    lowestPrice = 99999;
    for(i = 0; i < releaseStockMessages.length; ++i)
	{
        messagePrice = Number(releaseStockMessages[i].innerText.match(priceRegex)[1]);
        if(messagePrice > highestPrice)
            highestPrice = messagePrice;
        if(messagePrice < lowestPrice)
            lowestPrice = messagePrice;
        console.log(releaseStockMessages[i].innertText);
    }
    message = ":secret:下次";
    timeB = new Date(date);
    timeA = new Date(date);
    if((highestPrice - lowestPrice > noDealGap)&&(lowestPrice < 500))
	{ // 符合低量釋股特徵
        message += "低量";
        timeA.setHours(timeA.getHours() + 24);
        timeB.setHours(timeB.getHours() + 48);
		botUrl = discordHallNoDealBotUrl;
    }
    else if(highestPrice > priceLowerLimit)
	{ // 符合高價釋股特徵
        message += "高價";
        timeA.setHours(timeA.getHours() + 1);
        timeB.setHours(timeB.getHours() + 3);
		botUrl = discordHallHighPriceBotUrl;
		def = 1;
    }
    else
	{ // 低價?
        message += "低價";
        timeA.setHours(timeA.getHours() + 12);
        timeB.setHours(timeB.getHours() + 12);
		botUrl = discordHallLowPriceBotUrl;
		def = 2;
    }
    message += "釋股" + getTimeString(timeA) + " ~ " + getTimeString(timeB) + "  (UTC+8)\n" + releaseStockMessages[0].innerText + ":secret:\n";
    if (def == 1)
	{
		message += "姆咪~剛才有釋股的公司中，最低的是$" + lowestPrice + "喔~ 哭米口好可愛~";
        def=0;
	}
	else if (def == 2)
	{
		message += "姆咪~剛才有釋股的公司中，最高的是$" + highestPrice + "喔~ 哭米口好可愛~";
        def=0;
	}
	obj = 
	{
        content : message
    };
    releaseStockMessages = [];
    pushFlag = false;
    //pushInformationToDiscord(JSON.stringify(obj));
	pushMessageToDiscord(JSON.stringify(obj), botUrl);
}
/*
// 將即時訊息送至#recieve_instant_message
function pushDataToDiscord(){
	console.log(message);

	var json = JSON.stringify(obj);
	var request = new XMLHttpRequest(); // xhr() 會建立非同步物件
	request.open("POST", recieveInstantMessageBotUrl, false); // 同步連線 POST到該連線位址
	request.setRequestHeader('Content-Type', 'application/json');
	request.send(json);
	return true;
}
*/
// 檢查訊息資料是否完整
function isComplete(object){
    var i;
    for(i = 0; i < object.getElementsByTagName("span").length; ++i)
        if(object.getElementsByTagName("span")[i].innerText.length ===0)
            return false;
    return true;
}

function appendMessage(object){
    // 只有訊息中帶著 說道 釋股 創立(創立得股例外)
	if(object !== null && (object.innerText.indexOf("說道") != -1 || object.innerText.indexOf("釋股") != -1 || (object.innerText.indexOf("創立") != -1 && object.innerText.indexOf("創立得股") == -1))){ // 過濾訊息 & 避免創立得股消息被發出
		if(object.getElementsByTagName("span") === null) // 確認是否有元素存在避免錯誤
			return false;
        if(!isComplete(object)) // 確定資訊完整渲染
            return false;
        if(message.length !== 0)
            message += "\n";
        if(object.innerText.indexOf("【公司釋股】") != -1)
		{
            message += "`";
            if(!pushFlag){
                setTimeout(parseMessage, 120000); // 留60秒的時間收集齊全釋股消息
                date = new Date(); // 看到釋股消息時的時間
                pushFlag = true; // 開關轉變狀態
            }
            releaseStockMessages.push(object);
		}
        if(object.innerText.indexOf("創立成功") != -1)
		{
			var obj = 
			{
				content : object.innerText.match(/.+(【創立成功】 ).+等人投資的(.+)/)[1] + object.innerText.match(/(.+【創立成功】 ).+等人投資的(.+)/)[2]
			};
			pushMessageToDiscord(JSON.stringify(obj), discordCompanyFoundedBotUrl);
		}
		message += object.innerText;
        if(object.innerText.indexOf("【公司釋股】") != -1)
            message += "`";
		++count;
		if(count >= 5)
		{ //避免一段時間未開即時訊息 產生過多未讀訊息串接長度過長
			var obj = 
			{
				content : message
			};
			count = 0;
			message = "";
			logDataCount = logDatas.length - (i + 1); // 記錄已正確push完成之數量
			// pushDataToDiscord(message);
			pushMessageToDiscord(JSON.stringify(obj), recieveInstantMessageBotUrl);
		}
	}
	return true;
}

// 檢查是否有新訊息
function checkData()
{
	message = "";
	logDatas = document.getElementsByClassName("logData");
    if((logDatas.length - parseInt(logDataCount) - 1) < -1)
        logDataCount = i = count = 0;
	//if(logDataCount + 0 < logDatas.length){ // 檢查是否有新的logData 必須有5條以上新的logData才開始Push 降低Ajax渲染尚未完成即開始PUSH而導致訊息缺漏的機率
	for(i = logDatas.length - parseInt(logDataCount) - 1; i >= 0; --i) // 減1指向正確地尚未push之訊息位址
		if(!appendMessage(logDatas[i])) // 若串接失敗(元素渲染不完整)則先不繼續串接 待下次檢查時再重新嘗試串接
			break;
	if(count !== 0)
	{ //訊息存在
		//pushDataToDiscord(message);//push訊息
		var obj = 
		{
			content : message
		};
		count = 0;
		message = "";
		logDataCount = logDatas.length - (i + 1); // 記錄已正確push完成之數量
		pushMessageToDiscord(JSON.stringify(obj), recieveInstantMessageBotUrl);
	}
}

function searchStyleButton()
{
    var i;
    for(i = 0; i < $('.nav-link').length; ++i)
        if($('.nav-link')[i].innerText.search("亮色") != -1)
		{
            styleBtn[0] = $('.nav-link')[i];
            styleBtn[1] = $('.nav-link')[i + 1];
            break;
        }
}

function refresh()
{
	styleBtn[0].click(); // 亮色按鈕
	sleep(200);
	styleBtn[1].click(); // 暗色按鈕
}

function cleanMessage()
{
    checkData();
	$('.btn.btn-sm.btn-danger.float-right')[0].click(); // 點擊 清除舊訊息的按鈕
}

(function(){
    'use strict';
	logDatas = document.getElementsByClassName("logData");
	logDataCount = logDatas.length;
	nowTime = Number(Date.now());
    console.log("start");
    setTimeout(searchStyleButton, 1000); // 尋找主題配置 亮色暗色的按鈕到底是哪 並註冊為變數記錄下來(因為我的最愛數量不定 導致按鈕位置也不一定)
	setInterval(checkData, 10000); // 每十秒檢查一下是否有新的訊息
	setInterval(refresh, 210000); // 快速案主題配置 亮色暗色各一下 避免系統自動關閉與你的連線(五分鐘IDLE)
	setInterval(cleanMessage, 1800000); // 半小時清空一次
})();