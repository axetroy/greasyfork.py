// ==UserScript==
// @name         %%狗報數!!
// @namespace    http://tampermonkey.net/
// @version      87.87878787.1
// @description  message transmission
// @author       Euphokumiko
// @match        http://acgn-stock.com/instantMessage
// @match        https://acgn-stock.com/instantMessage
// @grant        mumimumi!!
// ==/UserScript==

var message, date0 = new Date ('10/10/2017'), date1 = new Date(),count,json,obj,currenthour,currentmin,time;

var papago = "https://discordapp.com/api/webhooks/369279879717584896/ovAlb7Wv5swYgB89KtAGf3nd9-FqgKp61a-V0A3HBdVER6sj-rCeFUABeWhrUew1P7KB";
var papago89 = "https://discordapp.com/api/webhooks/368778604919783434/qRAoK2x5TF-A7gfgMrjV9K7bDSX7gsB2UKbQQ_UJeeloS19JqWC7Gnr6gZzXOjjQEfuq";

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
    request.open("POST", papago, false); // 同步連線 POST到該連線位址
    request.setRequestHeader('Content-Type', 'application/json');
    console.log(jsonString);
    request.send(jsonString);
}

function repeat()
{
    pushMessageToDiscord(json, papago);
}


function datecount ()
{
    count = ((date1 - date0)/(1000 * 60 * 60 * 24));
    count = Math.floor(count);
    message = "<@241938736756031498>今天是%%狗入伍的第" + count + "天";
    obj =
    {
        content : message
    };
    json = JSON.stringify(obj);
    pushMessageToDiscord(json, papago);
}

function timecall()
{
	time = new Date();
    currenthour = time.getHours();
	currentmin = time.getMinutes();
	if (currenthour==6)
	{
		if (currentmin===0)
		{
			message = "<@241938736756031498>0600部隊起床!!";
            var obj =
            {
                content : message
            };
            json = JSON.stringify(obj);
            pushMessageToDiscord(json, papago89);
		}
        else if (currentmin==20)
        {
            message = "<@241938736756031498>0610部隊早點名!!";
            var obj =
            {
                content : message
            };
            json = JSON.stringify(obj);
            pushMessageToDiscord(json, papago89);
        }
	}
    else if(currenthour==7)
    {
        if (currentmin==50)
        {
            message = "<@241938736756031498>0750連集合場集合完畢!!";
            var obj =
            {
                content : message
            };
            json = JSON.stringify(obj);
            pushMessageToDiscord(json, papago89);
        }
    }
    else if (currenthour==8)
    {
        if (currentmin===0)
        {
            message = "<@241938736756031498>0800第一堂課開始!!";
            var obj =
            {
                content : message
            };
            json = JSON.stringify(obj);
            pushMessageToDiscord(json, papago89);
        }
    }
    else if (currenthour==12)
    {
        if (currentmin==10)
        {
            message = "<@241938736756031498>1210下餐廳!!";
            var obj =
            {
                content : message
            };
            json = JSON.stringify(obj);
            pushMessageToDiscord(json, papago89);
        }
        else if (currentmin==40)
        {
            message = "<@241938736756031498>1240床上躺平!!";
            var obj =
            {
                content : message
            };
            json = JSON.stringify(obj);
            pushMessageToDiscord(json, papago89);
        }
    }
    else if (currenthour==13)
    {
        if (currentmin==40)
        {
            message = "<@241938736756031498>1340部隊起床!!";
            var obj =
            {
                content : message
            };
            json = JSON.stringify(obj);
            pushMessageToDiscord(json, papago89);
        }
    }

}
function three()
{
    var time;
    time = new Date();
    currenthour = time.getHours();
	currentmin = time.getMinutes();
    if ((currenthour==6)||(currenthour==12)||(currenthour==18)||(currenthour===0))
	{
		if (currentmin===0)
		{
			datecount();
		}
	}
}
function once(fn, context)
{
    var result;

    return function()
	{
        if(fn)
		{
            result = fn.apply(context || this, arguments);
            fn = null;
        }

        return result;
    };
}

(function()
{
    'use strict';
    setInterval(timecall, 60000);
    once(datecount());
    setInterval(three, 60000);

})();