// ==UserScript==
// @name        Asus router GUI enhancer
// @namespace   V@no
// @author      V@no
// @description fixes several annoyances in AsusWRT UI
// @include     http://router.asus.com/*
// @include     https://router.asus.com:8443/*
// @include     http://192.168.1.1/*
// @license     MIT
// @version     1
// @run-at      document-start
// @grant       none
// ==/UserScript==


function $(id)
{
	return document.getElementById(id);
}

var log = console.log;

function multiline(func, ws)
{
	func = func.toString();
	func = func.slice(func.indexOf("/*") + 2, func.lastIndexOf("*/")).split("*//*").join("*/");
	return ws ? func : func.replace(/[\n\t]*/g, "");
}
var css = document.createElement("style")
css.innerHTML = multiline(function(){/*
.monitor_qos_bg
{
	height: unset !important;
}
.table1px td > div:first-child
{
	height: unset !important;
}
.NM_radius_bottom_container
{
	height: 100% !important;
}
#statusframe
{
	height: 860px !important;
}
*/});

(function loop(i)
{
	if (i)
		loop.i = 10000;

	if (!loop.i--)
		return;

	if (typeof(validator) == "undefined")
		return setTimeout(loop, 0);

	for(let i in _validator)
	{
		window.validator[i] = _validator[i];
	}
})(1);

(function loop(i)
{
	if (i)
		loop.i = 10000;

	if (!loop.i--)
		return;


	if (typeof(showDropdownClientList) == "undefined")
		return setTimeout(loop, 0);

	let _showDropdownClientList = showDropdownClientList;
	window.showDropdownClientList = function showDropdownClientList (_callBackFun, _callBackFunParam, _interfaceMode, _containerID, _pullArrowID, _clientState)
	{
		_showDropdownClientList.apply(null, arguments);
		function fixTitle(id)
		{
			let a = $(id);
			if (!a)
				return;

			a = a.getElementsByTagName("a");

			for (let i = 0; i < a.length; i++)
			{
				let ip = clientList[a[i].id].ip;
				if (ip == "offline")
					continue;

				a[i].title = ip + "\n" + a[i].title;
			}
		}
		fixTitle(_containerID + "_clientlist_online");
		fixTitle(_containerID + "_clientlist_offline");
	}

})(1);

(function loop(i)
{
	if (i)
		loop.i = 10000;

	if (!loop.i--)
		return;


	if (typeof(generateDetailTable) == "undefined")
		return setTimeout(loop, 0);

	let _generateDetailTable = generateDetailTable;
	window.generateDetailTable = function generateDetailTable (data)
	{
		_generateDetailTable.apply(null, arguments);

log(clientList);
	if ($("detail_info_table"))
	{
		let list = $("detail_info_table").children;
		for(let i = 1; i < list.length; i++)
		{
			let div = list[i].getElementsByTagName("div")[2],
					c = clientList[div.innerHTML];
			if (!c)
				continue;

			div.innerHTML = c.name;
			div.title = c.ip + "\n" + c.mac;
		}
	}
		function fixDiv(id)
		{
			let a = $(id);
			if (!a)
				return;

			a = a.getElementsByTagName("a");

			for (let i = 0; i < a.length; i++)
			{
				let ip = clientList[a[i].id].ip;
				if (ip == "offline")
					continue;

				a[i].title = ip + "\n" + a[i].title;
			}
		}
	}

})(1);
(function loop(i)
{
	if (i)
		loop.i = 10000;

	if (!loop.i--)
		return;

	let ad = $("p180-root");
	if (ad)
		return ad.parentNode.removeChild(ad);

	setTimeout(loop, 0);
})(1);

function func()
{
	let ad = $("p180-root");
	if (ad)
		ad.parentNode.removeChild(ad);

	document.getElementsByTagName("head")[0].appendChild(css);
	document.body.onselectstart = null;
}

if (document.readyState != "loading")
	func();
else
	document.addEventListener("DOMContentLoaded", func ,true);



var _validator = {
	checkKey: function(e)
	{
		//for Mac + Safari, let 'Command + A'(C, V, X) can work
		return (e.metaKey || e.ctrlKey) && [65, 67, 86, 88, 97, 99, 118, 120, 122].indexOf(e.keyCode ? e.keyCode : e.which) != -1;
	},
	isHWAddr: function(o, event)
	{
		var keyPressed = event.keyCode ? event.keyCode : event.which;
		var i, j;
		if (this.isFunctionButton(event))
		{
			return true;
		}

		if ((keyPressed > 47 && keyPressed < 58) || (keyPressed > 64 && keyPressed < 71) || (keyPressed > 96 && keyPressed < 103))
		{ //Hex
			j = 0;
			for (i = 0; i < o.value.length; i++)
			{
				if (o.value.charAt(i) == ':')
				{
					j++;
				}
			}
			if (j < 5 && i >= 2)
			{
				if (o.value.charAt(i - 2) != ':' && o.value.charAt(i - 1) != ':')
				{
					o.value = o.value + ':';
				}
			}
			return true;
		}
		else if (keyPressed == 58 || keyPressed == 13)
		{ //symbol ':' & 'ENTER'
			return true;
		}
		else if (this.checkKey(event))
		{ //for Mac + Safari, let 'Command + A'(C, V, X) can work
			return true
		}
		else
		{
			return false;
		}
	},
	isNumberFloat: function(o, event)
	{
		var keyPressed = event.keyCode ? event.keyCode : event.which;
		if (this.isFunctionButton(event))
		{
			return true;
		}
		if ((keyPressed == 46) || (keyPressed > 47 && keyPressed < 58))
			return true;
		else if (this.checkKey(event))
		{ //for Mac + Safari, let 'Command + A'(C, V, X) can work
			return true
		}
		else
			return false;
	},
	isNegativeNumber: function(o, event)
	{
		var keyPressed = event.keyCode ? event.keyCode : event.which;
		if (this.isFunctionButton(event))
		{
			return true;
		}
		if ((keyPressed == 45) || (keyPressed > 47 && keyPressed < 58))
			return true;
		else if (this.checkKey(event))
		{ //for Mac + Safari, let 'Command + A'(C, V, X) can work
			return true
		}
		else
			return false;
	},
	isNumber: function(o, event)
	{
		var keyPressed = event.keyCode ? event.keyCode : event.which;
		if (this.isFunctionButton(event))
		{
			return true;
		}
		if (keyPressed > 47 && keyPressed < 58)
		{
			/*if (keyPressed==48 && o.value.length==0){ //single 0
      return false;
      }*/
			return true;
		}
		else if (this.checkKey(event))
		{ //for Mac + Safari, let 'Command + A'(C, V, X) can work
			return true
		}
		else
		{
			return false;
		}
	},
	isIPAddr: function(o, event)
	{
		var keyPressed = event.keyCode ? event.keyCode : event.which;
		var i, j;
		if (this.isFunctionButton(event))
		{
			return true;
		}
		if ((keyPressed > 47 && keyPressed < 58))
		{
			j = 0;
			for (i = 0; i < o.value.length; i++)
			{
				if (o.value.charAt(i) == '.')
				{
					j++;
				}
			}
			if (j < 3 && i >= 3)
			{
				if (o.value.charAt(i - 3) != '.' && o.value.charAt(i - 2) != '.' && o.value.charAt(i - 1) != '.')
				{
					o.value = o.value + '.';
				}
			}
			return true;
		}
		else if (keyPressed == 46)
		{
			j = 0;
			for (i = 0; i < o.value.length; i++)
			{
				if (o.value.charAt(i) == '.')
				{
					j++;
				}
			}
			if (o.value.charAt(i - 1) == '.' || j == 3)
			{
				return false;
			}
			return true;
		}
		else if (keyPressed == 13)
		{ // 'ENTER'
			return true;
		}
		else if (this.checkKey(event))
		{ //for Mac + Safari, let 'Command + A'(C, V, X) can work
			return true
		}
		return false;
	},
	isIPAddrPlusNetmask: function(o, event)
	{
		var keyPressed = event.keyCode ? event.keyCode : event.which;
		var i, j;
		if (this.isFunctionButton(event))
		{
			return true;
		}
		if ((keyPressed > 47 && keyPressed < 58))
		{
			j = 0;
			for (i = 0; i < o.value.length; i++)
			{
				if (o.value.charAt(i) == '.')
				{
					j++;
				}
			}
			if (j < 3 && i >= 3)
			{
				if (o.value.charAt(i - 3) != '.' && o.value.charAt(i - 2) != '.' && o.value.charAt(i - 1) != '.')
				{
					o.value = o.value + '.';
				}
			}
			return true;
		}
		else if (keyPressed == 46)
		{
			j = 0;
			for (i = 0; i < o.value.length; i++)
			{
				if (o.value.charAt(i) == '.')
				{
					j++;
				}
			}
			if (o.value.charAt(i - 1) == '.' || j == 3)
			{
				return false;
			}
			return true;
		}
		else if (keyPressed == 47)
		{
			j = 0;
			for (i = 0; i < o.value.length; i++)
			{
				if (o.value.charAt(i) == '.')
				{
					j++;
				}
			}
			if (j < 3)
			{
				return false;
			}
			return true;
		}
		else if (this.checkKey(event))
		{ //for Mac + Safari, let 'Command + A'(C, V, X) can work
			return true
		}
		return false;
	},
	isIPRange: function(o, event)
	{
		var keyPressed = event.keyCode ? event.keyCode : event.which;
		var i, j;
		if (this.isFunctionButton(event))
		{
			return true;
		}
		if ((keyPressed > 47 && keyPressed < 58))
		{ // 0~9
			j = 0;
			for (i = 0; i < o.value.length; i++)
			{
				if (o.value.charAt(i) == '.')
				{
					j++;
				}
			}
			if (j < 3 && i >= 3)
			{
				if (o.value.charAt(i - 3) != '.' && o.value.charAt(i - 2) != '.' && o.value.charAt(i - 1) != '.')
					o.value = o.value + '.';
			}
			return true;
		}
		else if (keyPressed == 46)
		{ // .
			j = 0;
			for (i = 0; i < o.value.length; i++)
			{
				if (o.value.charAt(i) == '.')
				{
					j++;
				}
			}
			if (o.value.charAt(i - 1) == '.' || j == 3)
			{
				return false;
			}
			return true;
		}
		else if (keyPressed == 42)
		{ // *
			return true;
		}
		else if (this.checkKey(event))
		{ //for Mac + Safari, let 'Command + A'(C, V, X) can work
			return true
		}
		return false;
	},
	isPortRange: function(o, event)
	{
		var keyPressed = event.keyCode ? event.keyCode : event.which;
		if (this.isFunctionButton(event))
		{
			return true;
		}
		if ((keyPressed > 47 && keyPressed < 58))
		{ //0~9
			return true;
		}
		else if (keyPressed == 58 && o.value.length > 0)
		{
			for (var i = 0; i < o.value.length; i++)
			{
				var c = o.value.charAt(i);
				if (c == ':' || c == '>' || c == '<' || c == '=')
					return false;
			}
			return true;
		}
		else if (keyPressed == 44)
		{ //"�? can be type in first charAt ::: 0220 Lock add"
			if (o.value.length == 0)
				return false;
			else
				return true;
		}
		else if (keyPressed == 60 || keyPressed == 62)
		{ //">" and "<" only can be type in first charAt ::: 0220 Lock add
			if (o.value.length == 0)
				return true;
			else
				return false;
		}
		else if (this.checkKey(event))
		{ //for Mac + Safari, let 'Command + A'(C, V, X) can work
			return true
		}
		return false;
	},
	isPortlist: function(o, event)
	{
		var keyPressed = event.keyCode ? event.keyCode : event.which;
		if (this.isFunctionButton(event))
		{
			return true;
		}
		if ((keyPressed > 47 && keyPressed < 58) || keyPressed == 32)
		{
			return true;
		}
		else if (this.checkKey(event))
		{ //for Mac + Safari, let 'Command + A'(C, V, X) can work
			return true
		}
		else
		{
			return false;
		}
	},
};