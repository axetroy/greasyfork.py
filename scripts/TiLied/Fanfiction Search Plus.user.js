// ==UserScript==
// @name        Fanfiction Search Plus
// @namespace   https://greasyfork.org/users/102866
// @description Give more options to search
// @include     https://www.fanfiction.net/*
// @require     https://code.jquery.com/jquery-3.2.1.min.js
// @require     https://cdnjs.cloudflare.com/ajax/libs/list.js/1.5.0/list.min.js
// @author      TiLied
// @version     0.1.00
// @grant       GM_listValues
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_deleteValue
// @require     https://greasemonkey.github.io/gm4-polyfill/gm4-polyfill.js
// @grant       GM.listValues
// @grant       GM.getValue
// @grant       GM.setValue
// @grant       GM.deleteValue
// ==/UserScript==

var whatPage = 0,
	fanName,
	section,
	listTrue = false;

const oneSecond = 1000,
	oneDay = oneSecond * 60 * 60 * 24,
	oneWeek = oneDay * 7,
	oneMonth = oneWeek * 4,
	mRatingAndUpTime = "?&srt=1&r=10";

//prefs
var ff = {},
	debug = false;

/**
* ENUM, BECAUSE WHY NOT ¯\_(ツ)_/¯
* SEE FUNCTION GetPage()
*/
var Page;
(function (Page)
{
	
	Page[Page["ErrorNothing"] = 0] = "ErrorNothing";
	Page[Page["front"] = 1] = "front";
	Page[Page["anime"] = 2] = "anime";
	Page[Page["book"] = 3] = "book";
	Page[Page["cartoon"] = 4] = "cartoon";
	Page[Page["comic"] = 5] = "comic";
	Page[Page["game"] = 6] = "game";
	Page[Page["misc"] = 7] = "misc";
	Page[Page["play"] = 8] = "play";
	Page[Page["movie"] = 9] = "movie";
	Page[Page["tv"] = 10] = "tv";
	Page[Page["crossover"] = 10] = "crossover";
	Page[Page["crossoverR"] = 11] = "crossoverR";
	Page[Page["ErrorNothing1"] = 100] = "ErrorNothing1";
})(Page || (Page = {}));

//Start
//Function main
void function Main()
{
	console.log("Fanfiction Search Plus v" + GM.info.script.version + " initialization");
	//Place CSS in head
	SetCSS();
	//Set settings or create
	SetSettings(function ()
	{
		//Check on what page we are and switch. Currently only on pin page
		SwitchPage();
		//Place UI Options
		//SetOption();
		console.log("Page number: " + whatPage + "/" + Page[whatPage] + " page");
	});
}();
//Function main
//End

//Start
//Functions GM_VALUE
async function SetSettings(callBack)
{
	//DeleteValues("all");
	//THIS IS ABOUT fanfiction
	if (HasValue("fsp_ff", JSON.stringify(ff)))
	{
		ff = JSON.parse(await GM.getValue("fsp_ff"));
		console.log(ff);
		SetFFObj();
	}

	//Console log prefs with value
	console.log("*prefs:");
	console.log("*-----*");
	var vals = await GM.listValues();

	//Find out that var in for block is not local... Seriously js?
	for (let i = 0; i < vals.length; i++)
	{
		console.log("*" + vals[i] + ":" + await GM.getValue(vals[i]));
	}
	console.log("*-----*");

	callBack();
}

//Check if value exists or not.  optValue = Optional
async function HasValue(nameVal, optValue)
{
	var vals = await GM.listValues();

	if (vals.length === 0)
	{
		if (optValue !== undefined)
		{
			GM.setValue(nameVal, optValue);
			return true;
		} else
		{
			return false;
		}
	}

	if (typeof nameVal !== "string")
	{
		return alert("name of value: '" + nameVal + "' are not string");
	}

	for (let i = 0; i < vals.length; i++)
	{
		if (vals[i] === nameVal)
		{
			return true;
		}
	}

	if (optValue !== undefined)
	{
		GM.setValue(nameVal, optValue);
		return true;
	} else
	{
		return false;
	}
}

//Delete Values
async function DeleteValues(nameVal)
{
	var vals = await GM.listValues();

	if (vals.length === 0 || typeof nameVal !== "string")
	{
		return;
	}

	switch (nameVal)
	{
		case "all":
			for (let i = 0; i < vals.length; i++)
			{
				GM.deleteValue(vals[i]);
			}
			break;
		case "old":
			for (let i = 0; i < vals.length; i++)
			{
				if (vals[i] === "debug" || vals[i] === "debugA")
				{
					GM.deleteValue(vals[i]);
				}
			}
			break;
		default:
			for (let i = 0; i < vals.length; i++)
			{
				if (vals[i] === nameVal)
				{
					GM.deleteValue(nameVal);
				}
			}
			break;
	}
}

///Update gm value what:"cache","options"
function UpdateGM(what)
{
	var gmff;

	switch (what)
	{
		case "ff":
			gmff = JSON.stringify(ff);
			GM.setValue("fsp_ff", gmff);
			break;
		case "options":
			gmVal = JSON.stringify(options);
			GM_setValue("imdbe_options", gmVal);
			break;
		default:
			alert("fun:UpdateGM(" + what + "). default switch");
			break;
	}
}
//Functions GM_VALUE
//End

//Start
//Functions create object fanfiction and cache
function SetFFObj()
{
	//Version
	if (typeof ff.version === "undefined")
	{
		ff.version = GM.info.script.version;
		version = ff.version;
	} else
	{
		version = ff.version;
		if (version !== GM.info.script.version)
		{
			ff.version = GM.info.script.version;
			version = ff.version;
		}
	}

	//Fetch
	if (typeof ff.fetch === "undefined")
	{
		ff.fetch = false;
		//version = ff.version;
	} else
	{
		//version = ff.version;
		//if (version !== GM.info.script.version)
		//{
		//	ff.version = GM.info.script.version;
		//	version = ff.version;
		//}
	}

	//Fanfiction
	if (typeof ff.fanfiction === "undefined")
	{
		ff.fanfiction = {};
		//fanfiction = options.additionalRatings;
	} else
	{
		//if (options.additionalRatings["kinopoisk"] === undefined) { options.additionalRatings[kinopoisk] = false; }
		//if (options.additionalRatings["rottenTomatoes"] === undefined) { options.additionalRatings[rottenTomatoes] = false; }
		//additionalRatings = options.additionalRatings;
	}

	if (debug) console.log(ff);
}
//Functions create object option and cache
//End

//Start
//Functions Get on what page are we and switch
function SwitchPage()
{
	switch (GetPage(document.URL))
	{
		case 1:
			console.log("front");
			break;
		case 2:
			section = Page[whatPage];
			SetUpForAnime(document.URL);
			break;
		case 3:
			section = Page[whatPage];
			SetUpForBook(document.URL);
			break;
		case 4:
			section = Page[whatPage];
			SetUpForCartoon(document.URL);
			break;
		case 5:
			section = Page[whatPage];
			SetUpForComic(document.URL);
			break;
		case 6:
			section = Page[whatPage];
			SetUpForGame(document.URL);
			break;
		case 7:
			section = Page[whatPage];
			SetUpForMisc(document.URL);
			break;
		case 8:
			section = Page[whatPage];
			SetUpForPlay(document.URL);
			break;
		case 9:
			section = Page[whatPage];
			SetUpForMovie(document.URL);
			break;
		case 10:
			section = Page[whatPage];
			SetUpForTv(document.URL);
			break;
		default:
			break;
	}
}

//On what page are we?
function GetPage(url)
{
	/*
	1-front page
	2-anime page
	3-book page
	4-cartoon page
	5-comic page
	6-game page
	7-misc page
	8-play page
	9-movie page
	10-tv page
	11-Crossover/ page
	12-Crossover/ page
	13-Crossover/ page
	14-Crossover/ page
	15-Crossover/ page
	100-anything else
	*/
	try
	{
		if (document.location.pathname === "/")
		{
			whatPage = 1;
		} else if (url.match(/https:\/\/www\.fanfiction\.net\/anime/i))
		{
			whatPage = 2;
		} else if (url.match(/https:\/\/www\.fanfiction\.net\/book/i))
		{
			whatPage = 3;
		} else if (url.match(/https:\/\/www\.fanfiction\.net\/cartoon/i))
		{
			whatPage = 4;
		} else if (url.match(/https:\/\/www\.fanfiction\.net\/comic/i))
		{
			whatPage = 5;
		} else if (url.match(/https:\/\/www\.fanfiction\.net\/game/i))
		{
			whatPage = 6;
		} else if (url.match(/https:\/\/www\.fanfiction\.net\/misc/i))
		{
			whatPage = 7;
		} else if (url.match(/https:\/\/www\.fanfiction\.net\/play/i))
		{
			whatPage = 8;
		} else if (url.match(/https:\/\/www\.fanfiction\.net\/movie/i))
		{
			whatPage = 9;
		} else if (url.match(/https:\/\/www\.fanfiction\.net\/tv/i))
		{
			whatPage = 10;
		} else if (url.match(/https:\/\/www\.fanfiction\.net\/crossover/i))
		{
			whatPage = 11;
		} else if (url.match(/https:\/\/www\.fanfiction\.net\/crossover/i))
		{
			whatPage = 12;
		} else if (url.match(/https:\/\/www\.fanfiction\.net\/crossover/i))
		{
			whatPage = 13;
		} else if (url.match(/https:\/\/www\.fanfiction\.net\/crossover/i))
		{
			whatPage = 14;
		} else if (url.match(/https:\/\/www\.fanfiction\.net\/crossover/i))
		{
			whatPage = 15;
		} else 
		{
			whatPage = 100;
		}
	} catch (e) { console.og(e); }
	return whatPage;
}
//Functions Get on what page are we and switch
//End

//-------------------------
//SET UP STUFF BELOW
//-------------------------
function SetUpForAnime(url)
{
	try
	{
		if (typeof ff.fanfiction[section] === "undefined")
		{
			ff.fanfiction[section] = {};
			//Update GM TODO
		}

		fanName = url.match(/anime\/(\S+)\//)[1]; //TODO!!!!!!!!!!!!!!!!!!!!

		if (debug) console.log(fanName);

		if (typeof ff.fanfiction[section][fanName] === "undefined" || ff.fanfiction[section][fanName].length === 0)
		{
			if (ff.fetch)
			{
				setTimeout(FetchFics, 1000);
			}
			ff.fanfiction[section][fanName] = [];
			UI("first");
		} else
		{
			if (ff.fetch)
			{
				setTimeout(FetchFics, 1000);
			}
			UI("normal");
			//TODO check updates and etc 
		}

		//console.log($("center:first > a:last-child").trigger());
		//ParseFic($(".z-list")[4]);
	} catch (e) { console.error(e); }
}
function SetUpForBook(url)
{
	try
	{
		if (typeof ff.fanfiction[section] === "undefined")
		{
			ff.fanfiction[section] = {};
			//Update GM TODO
		}

		fanName = url.match(/book\/(\S+)\//)[1]; //TODO!!!!!!!!!!!!!!!!!!!!

		if (debug) console.log(fanName);

		if (typeof ff.fanfiction[section][fanName] === "undefined" || ff.fanfiction[section][fanName].length === 0)
		{
			if (ff.fetch)
			{
				setTimeout(FetchFics, 1000);
			}
			ff.fanfiction[section][fanName] = [];
			UI("first");
		} else
		{
			if (ff.fetch)
			{
				setTimeout(FetchFics, 1000);
			}
			UI("normal");
			//TODO check updates and etc 
		}

		//console.log($("center:first > a:last-child").trigger());
		//ParseFic($(".z-list")[4]);
	} catch (e) { console.error(e); }
}
function SetUpForCartoon(url)
{
	try
	{
		if (typeof ff.fanfiction[section] === "undefined")
		{
			ff.fanfiction[section] = {};
			//Update GM TODO
		}

		fanName = url.match(/cartoon\/(\S+)\//)[1]; //TODO!!!!!!!!!!!!!!!!!!!!

		if (debug) console.log(fanName);

		if (typeof ff.fanfiction[section][fanName] === "undefined" || ff.fanfiction[section][fanName].length === 0)
		{
			if (ff.fetch)
			{
				setTimeout(FetchFics, 1000);
			}
			ff.fanfiction[section][fanName] = [];
			UI("first");
		} else
		{
			if (ff.fetch)
			{
				setTimeout(FetchFics, 1000);
			}
			UI("normal");
			//TODO check updates and etc 
		}

		//console.log($("center:first > a:last-child").trigger());
		//ParseFic($(".z-list")[4]);
	} catch (e) { console.error(e); }
}
function SetUpForComic(url)
{
	try
	{
		if (typeof ff.fanfiction[section] === "undefined")
		{
			ff.fanfiction[section] = {};
			//Update GM TODO
		}

		fanName = url.match(/comic\/(\S+)\//)[1]; //TODO!!!!!!!!!!!!!!!!!!!!

		if (debug) console.log(fanName);

		if (typeof ff.fanfiction[section][fanName] === "undefined" || ff.fanfiction[section][fanName].length === 0)
		{
			if (ff.fetch)
			{
				setTimeout(FetchFics, 1000);
			}
			ff.fanfiction[section][fanName] = [];
			UI("first");
		} else
		{
			if (ff.fetch)
			{
				setTimeout(FetchFics, 1000);
			}
			UI("normal");
			//TODO check updates and etc 
		}

		//console.log($("center:first > a:last-child").trigger());
		//ParseFic($(".z-list")[4]);
	} catch (e) { console.error(e); }
}
function SetUpForGame(url)
{
	try
	{
		if (typeof ff.fanfiction[section] === "undefined")
		{
			ff.fanfiction[section] = {};
			//Update GM TODO
		}

		fanName = url.match(/game\/(\S+)\//)[1]; //TODO!!!!!!!!!!!!!!!!!!!!

		if (debug) console.log(fanName);

		if (typeof ff.fanfiction[section][fanName] === "undefined" || ff.fanfiction[section][fanName].length === 0)
		{
			if (ff.fetch)
			{
				setTimeout(FetchFics, 1000);
			}
			ff.fanfiction[section][fanName] = [];
			UI("first");
		} else
		{
			if (ff.fetch)
			{
				setTimeout(FetchFics, 1000);
			}
			UI("normal");
			//TODO check updates and etc 
		}

		//console.log($("center:first > a:last-child").trigger());
		//ParseFic($(".z-list")[4]);
	} catch (e) { console.error(e); }
}
function SetUpForMisc(url)
{
	try
	{
		if (typeof ff.fanfiction[section] === "undefined")
		{
			ff.fanfiction[section] = {};
			//Update GM TODO
		}

		fanName = url.match(/misc\/(\S+)\//)[1]; //TODO!!!!!!!!!!!!!!!!!!!!

		if (debug) console.log(fanName);

		if (typeof ff.fanfiction[section][fanName] === "undefined" || ff.fanfiction[section][fanName].length === 0)
		{
			if (ff.fetch)
			{
				setTimeout(FetchFics, 1000);
			}
			ff.fanfiction[section][fanName] = [];
			UI("first");
		} else
		{
			if (ff.fetch)
			{
				setTimeout(FetchFics, 1000);
			}
			UI("normal");
			//TODO check updates and etc 
		}

		//console.log($("center:first > a:last-child").trigger());
		//ParseFic($(".z-list")[4]);
	} catch (e) { console.error(e); }
}
function SetUpForPlay(url)
{
	try
	{
		if (typeof ff.fanfiction[section] === "undefined")
		{
			ff.fanfiction[section] = {};
			//Update GM TODO
		}

		fanName = url.match(/play\/(\S+)\//)[1]; //TODO!!!!!!!!!!!!!!!!!!!!

		if (debug) console.log(fanName);

		if (typeof ff.fanfiction[section][fanName] === "undefined" || ff.fanfiction[section][fanName].length === 0)
		{
			if (ff.fetch)
			{
				setTimeout(FetchFics, 1000);
			}
			ff.fanfiction[section][fanName] = [];
			UI("first");
		} else
		{
			if (ff.fetch)
			{
				setTimeout(FetchFics, 1000);
			}
			UI("normal");
			//TODO check updates and etc 
		}

		//console.log($("center:first > a:last-child").trigger());
		//ParseFic($(".z-list")[4]);
	} catch (e) { console.error(e); }
}
function SetUpForMovie(url)
{
	try
	{
		if (typeof ff.fanfiction[section] === "undefined")
		{
			ff.fanfiction[section] = {};
			//Update GM TODO
		}

		fanName = url.match(/movie\/(\S+)\//)[1]; //TODO!!!!!!!!!!!!!!!!!!!!

		if (debug) console.log(fanName);

		if (typeof ff.fanfiction[section][fanName] === "undefined" || ff.fanfiction[section][fanName].length === 0)
		{
			if (ff.fetch)
			{
				setTimeout(FetchFics, 1000);
			}
			ff.fanfiction[section][fanName] = [];
			UI("first");
		} else
		{
			if (ff.fetch)
			{
				setTimeout(FetchFics, 1000);
			}
			UI("normal");
			//TODO check updates and etc 
		}

		//console.log($("center:first > a:last-child").trigger());
		//ParseFic($(".z-list")[4]);
	} catch (e) { console.error(e); }
}
function SetUpForTv(url)
{
	try
	{
		if (typeof ff.fanfiction[section] === "undefined")
		{
			ff.fanfiction[section] = {};
			//Update GM TODO
		}

		fanName = url.match(/tv\/(\S+)\//)[1]; //TODO!!!!!!!!!!!!!!!!!!!!

		if (debug) console.log(fanName);

		if (typeof ff.fanfiction[section][fanName] === "undefined" || ff.fanfiction[section][fanName].length === 0)
		{
			if (ff.fetch)
			{
				setTimeout(FetchFics, 1000);
			}
			ff.fanfiction[section][fanName] = [];
			UI("first");
		} else
		{
			if (ff.fetch)
			{
				setTimeout(FetchFics, 1000);
			}
			UI("normal");
			//TODO check updates and etc 
		}

		//console.log($("center:first > a:last-child").trigger());
		//ParseFic($(".z-list")[4]);
	} catch (e) { console.error(e); }
}

//-------------------------
//CORE STUFF BELOW
//-------------------------

//Start
//Function parse fic
function ParseFic(div)
{
	try
	{
		var tempFic = {},
			tempSplit,
			indexes = [];

		tempFic.href = "https://www.fanfiction.net" + $(div.firstChild).attr("href");
		tempFic.id = $(div.firstChild).attr("href").split("/")[2];
		tempFic.image = $(div.firstChild.firstChild).attr("src");
		tempFic.author = $(div).find("a").filter(function ()
		{
			var str = $(this).attr("href");
			if (str.includes("/u/"))
			{
				return this;
			}
		}).text();
		tempFic.authorUrl = "https://www.fanfiction.net" + $(div).find("a").filter(function ()
		{
			var str = $(this).attr("href");
			if (str.includes("/u/"))
			{
				return this;
			}
		}).attr("href");
		tempFic.title = $(div.firstChild.childNodes[1]).text();
		
		tempFic.summary = $(div).find(".z-indent").contents().filter(function ()
		{
			return this.nodeType === 3;
		})[0].nodeValue;

		tempSplit = $(div).find(".z-indent > .z-padtop2").html().split(" - ");
		if(debug) console.log(tempSplit);

		tempFic.rated = $.trim(tempSplit[0].substr(tempSplit[0].indexOf(":")).substring(2));
		tempFic.language = $.trim(tempSplit[1]);
		if (tempSplit[3].match("Chapters"))
		{
			if (tempSplit[2].match("/"))
				tempFic.gernes = $.trim(tempSplit[2]).split("/");
			else
				tempFic.gernes = $.trim(tempSplit[2]);
			tempFic.chapters = Number($.trim(tempSplit[3].substr(tempSplit[3].indexOf(":")).substring(2).split(",").join("")));
			tempFic.words = Number($.trim(tempSplit[4].substr(tempSplit[4].indexOf(":")).substring(2).split(",").join("")));
		} else
		{
			tempFic.gernes = "none";
			tempFic.chapters = Number($.trim(tempSplit[2].substr(tempSplit[2].indexOf(":")).substring(2).split(",").join("")));
			tempFic.words = Number($.trim(tempSplit[3].substr(tempSplit[3].indexOf(":")).substring(2).split(",").join("")));
		}

		for (let i = 0; i < tempSplit.length; i++)
		{
			if (tempSplit[i].match("Reviews"))
				tempFic.reviews = Number($.trim(tempSplit[i].substr(tempSplit[i].indexOf(":")).substring(2).split(",").join("")));
			if (tempSplit[i].match("Favs"))
				tempFic.favs = Number($.trim(tempSplit[i].substr(tempSplit[i].indexOf(":")).substring(2).split(",").join("")));
			if (tempSplit[i].match("Follows"))
				tempFic.follows = Number($.trim(tempSplit[i].substr(tempSplit[i].indexOf(":")).substring(2).split(",").join("")));
			if (tempSplit[i].match("Published"))
				tempFic.published = Number($.trim(tempSplit[i].split('"')[1]));
			if (tempSplit[i].match("Updated"))
				tempFic.updated = Number($.trim(tempSplit[i].split('"')[1]));
			if (tempSplit[i].match("Complete"))
				tempFic.complete = true;
		}
		if (typeof tempFic.reviews === "undefined")
			tempFic.reviews = 0;
		if (typeof tempFic.favs === "undefined")
			tempFic.favs = 0;
		if (typeof tempFic.follows === "undefined")
			tempFic.follows = 0;
		if (typeof tempFic.updated === "undefined")
			tempFic.updated = 0;
			//tempFic.updated = "" | "none";
		if (typeof tempFic.complete === "undefined")
			tempFic.complete = false;

		if (tempFic.complete)
		{
			if (!tempSplit[tempSplit.length - 2].match("Published"))
				if (!tempSplit[tempSplit.length - 2].match("Updated"))
					tempFic.characters = tempSplit[tempSplit.length - 2].split(", ");

			if (tempSplit[tempSplit.length - 2].match(/]/))
			{
				tempFic.characters = tempSplit[tempSplit.length - 2].replace(/]/, ",").split(", ");
				let temp = tempSplit[tempSplit.length - 2],
					arr = [];
				if(debug) console.log(temp);
				for (let x = 0; x < temp.length; x++)
					if (temp[x] === "[" || temp[x] === "]")
						indexes.push(x);
				if (debug) console.log(indexes);
				if (indexes.length > 2)
				{
					//TODO!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
					arr.push(temp.slice(indexes[0] + 1, indexes[1]).split(", "));

					arr.push(temp.slice(indexes[2] + 1, indexes[3]).split(", "));
					if (debug) console.log(arr);
					tempFic.relationships = arr;
				} else
				{
					temp = temp.substring(temp.indexOf("[") + 1, temp.indexOf("]"));
					if (debug) console.log(temp);
					tempFic.relationships = [temp.split(", ")];
				}
			}
		} else
		{
			if (!tempSplit[tempSplit.length - 1].match("Published"))
				if (!tempSplit[tempSplit.length - 1].match("Updated"))
					tempFic.characters = tempSplit[tempSplit.length - 1].split(", ");

			if (tempSplit[tempSplit.length - 1].match(/]/))
			{
				tempFic.characters = tempSplit[tempSplit.length - 1].replace(/]/, ",").split(", ");
				let temp = tempSplit[tempSplit.length - 1],
					arr = [];
				if (debug) console.log(temp);
				for (let x = 0; x < temp.length; x++)
					if (temp[x] === "[" || temp[x] === "]")
						indexes.push(x);
				if (indexes.length > 2)
				{
					//TODO!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
					arr.push(temp.slice(indexes[0] + 1, indexes[1]).split(", "));

					arr.push(temp.slice(indexes[2] + 1, indexes[3]).split(", "));

					tempFic.relationships = arr;
				} else
				{
					temp = temp.substring(temp.indexOf("[") + 1, temp.indexOf("]"));
					if (debug) console.log(temp);
					tempFic.relationships = [temp.split(", ")];
				}
			}
		}

		if (typeof tempFic.characters === "undefined")
			tempFic.characters = "none";
			//tempFic.characters = [] | "none";	//none or all??? TODO

		if (typeof tempFic.relationships === "undefined")
			tempFic.relationships = "none";
			//tempFic.relationships = [] | "none";

		if (debug) console.log(tempFic);

		return tempFic;
	} catch (e) { console.error(e); }
}
//Function parse fic
//End


//Start
//Function fetch fics
async function FetchFics()
{
	try
	{
		var zlist = $(".z-list"),
			last,
			parser = new DOMParser();

		for (let i = 0; i < zlist.length; i++)
		{
			ff.fanfiction[section][fanName].push(ParseFic(zlist[i]));
		}

		UI("upFetchCount");
		
		setTimeout(async function ()
		{
			last = $("center:first > a:last-child").prev().attr("href");
			last = Number(last.substr(last.indexOf("p=") + 2));
			if (debug) console.log(last);
			for (let i = 2; i <= last; i++)
			{
				if (debug) console.log("https://www.fanfiction.net/" + section + "/" + fanName + "/" + mRatingAndUpTime + "&p=" + i);
				await $.get("https://www.fanfiction.net/" + section + "/" + fanName + "/" + mRatingAndUpTime + "&p=" + i, function (data)
				{
					var doc = parser.parseFromString(data, "text/html"),
						z = $(doc).find(".z-list");
					if (debug) console.log(doc);
					if (debug) console.log(z);
					for (let x = 0; x < z.length; x++)
					{
						ff.fanfiction[section][fanName].push(ParseFic(z[x]));
					}
					UI("upFetchCount");
				})
					.fail(function ()
					{
						alert("error: ajax/" + i + "-page number/" + fanName + " fandom");
					});
			}
			ff.fetch = false;
			UpdateGM("ff");
			alert("ITS DONE!!!");
			window.location.href = "https://www.fanfiction.net/" + section + "/" + fanName + "/";
		}, 250);
		//Get to the next page and thats go on
	} catch (e) { console.error(e); }
}
//Function fetch fics
//End


//Start
//Function Search Filter Sort fics
function SearchFilterSort()
{
	try
	{
		var options = {
			valueNames:
			[
				'fsp_title',
				{ name: 'fsp_titleh', attr: 'href' },
				{ name: 'fsp_image', attr: 'src' },
				'fsp_author',
				{ name: 'fsp_authorh', attr: 'href' },
				'fsp_summary',
				'fsp_rated',
				'fsp_lag',
				'fsp_chapters',
				'fsp_words',
				'fsp_reviews',
				'fsp_favs',
				'fsp_follows',
				'fsp_published',
				{ name: 'fsp_publishedRaw', attr: 'data-xutime' },
				'fsp_updated',
				{ name: 'fsp_updatedRaw', attr: 'data-xutime' },
				'fsp_complete',
				'fsp_characters',
				'fsp_relationships',
				'fsp_Id'
			],

			page: 20,
			pagination: true,
			item: '<div class="fsp_list z-list zhover zpointer" style="min-height:77px;border-bottom:1px #cdcdcd solid;">\
			<a class="fsp_title fsp_titleh stitle" href=""></a>\
			<img class="fsp_image lazy cimage" style="clear: left; float: left; margin-right: 3px; padding: 2px; border: 1px solid rgb(204, 204, 204); border-radius: 2px; display: block;" src="" data-original="" height= "66" width="50" ></img>\
			by <a class="fsp_author fsp_authorh" href=""></a>\
			<div class="fsp_summary z-indent z-padtop"></div>\
			<span class="z-padtop2 xgray">Rated:</span><span class="fsp_rated z-padtop2 xgray"></span>\
			- <span class="z-padtop2 xgray">Language:</span><span class="fsp_lag z-padtop2 xgray"></span>\
			- <span class="z-padtop2 xgray">Chapters:</span><span class="fsp_chapters z-padtop2 xgray"></span>\
			- <span class="z-padtop2 xgray">Words:</span><span class="fsp_words z-padtop2 xgray"></span>\
			- <span class="z-padtop2 xgray">Reviews:</span><span class="fsp_reviews z-padtop2 xgray"></span>\
			- <span class="z-padtop2 xgray">Favs:</span><span class="fsp_favs z-padtop2 xgray"></span>\
			- <span class="z-padtop2 xgray">Follows:</span><span class="fsp_follows z-padtop2 xgray"></span>\
			- <span class="z-padtop2 xgray">Published:</span><span class="fsp_published fsp_publishedRaw z-padtop2 xgray"></span>\
			- <span class="z-padtop2 xgray">Updated:</span><span class="fsp_updated fsp_updatedRaw z-padtop2 xgray"></span>\
			- <span class="z-padtop2 xgray">Complete:</span><span class="fsp_complete z-padtop2 xgray"></span>\
			- <span class="z-padtop2 xgray">Characters:</span><span class="fsp_characters z-padtop2 xgray"></span>\
			- <span class="z-padtop2 xgray">Relationships:</span><span class="fsp_relationships z-padtop2 xgray"></span>\</span>\
			- <span class="z-padtop2 xgray">Id:</span><span class="fsp_Id z-padtop2 xgray"></span>'
		};
		
		var fics = new List('fsp_main', options);
		//console.log(ff.fanfiction[section][fanName]);
		for (let i = 0; i < ff.fanfiction[section][fanName].length; i++)
		{
			if (ff.fanfiction[section][fanName][i]["updated"] === 0)
			{
				fics.add({
					fsp_title: ff.fanfiction[section][fanName][i]["title"],
					fsp_titleh: ff.fanfiction[section][fanName][i]["href"],
					fsp_image: ff.fanfiction[section][fanName][i]["image"],
					fsp_author: ff.fanfiction[section][fanName][i]["author"],
					fsp_authorh: ff.fanfiction[section][fanName][i]["authorUrl"],
					fsp_summary: ff.fanfiction[section][fanName][i]["summary"],
					fsp_rated: ff.fanfiction[section][fanName][i]["rated"],
					fsp_lag: ff.fanfiction[section][fanName][i]["language"],
					fsp_chapters: ff.fanfiction[section][fanName][i]["chapters"],
					fsp_words: ff.fanfiction[section][fanName][i]["words"],
					fsp_reviews: ff.fanfiction[section][fanName][i]["reviews"],
					fsp_favs: ff.fanfiction[section][fanName][i]["favs"],
					fsp_follows: ff.fanfiction[section][fanName][i]["follows"],
					fsp_published: Intl.DateTimeFormat(undefined, { year: 'numeric', month: 'short', day: 'numeric' }).format(new Date(ff.fanfiction[section][fanName][i]["published"] * 1000)),
					fsp_publishedRaw: ff.fanfiction[section][fanName][i]["published"],
					fsp_updated: 0,
					fsp_updatedRaw: ff.fanfiction[section][fanName][i]["updated"],
					fsp_complete: ff.fanfiction[section][fanName][i]["complete"],
					fsp_characters: ff.fanfiction[section][fanName][i]["characters"],
					fsp_relationships: ff.fanfiction[section][fanName][i]["relationships"],
					fsp_Id: ff.fanfiction[section][fanName][i]["id"]
				});
			} else
			{
				fics.add({
					fsp_title: ff.fanfiction[section][fanName][i]["title"],
					fsp_titleh: ff.fanfiction[section][fanName][i]["href"],
					fsp_image: ff.fanfiction[section][fanName][i]["image"],
					fsp_author: ff.fanfiction[section][fanName][i]["author"],
					fsp_authorh: ff.fanfiction[section][fanName][i]["authorUrl"],
					fsp_summary: ff.fanfiction[section][fanName][i]["summary"],
					fsp_rated: ff.fanfiction[section][fanName][i]["rated"],
					fsp_lag: ff.fanfiction[section][fanName][i]["language"],
					fsp_chapters: ff.fanfiction[section][fanName][i]["chapters"],
					fsp_words: ff.fanfiction[section][fanName][i]["words"],
					fsp_reviews: ff.fanfiction[section][fanName][i]["reviews"],
					fsp_favs: ff.fanfiction[section][fanName][i]["favs"],
					fsp_follows: ff.fanfiction[section][fanName][i]["follows"],
					fsp_published: Intl.DateTimeFormat(undefined, { year: 'numeric', month: 'short', day: 'numeric' }).format(new Date(ff.fanfiction[section][fanName][i]["published"] * 1000)),
					fsp_publishedRaw: ff.fanfiction[section][fanName][i]["published"],
					fsp_updated: Intl.DateTimeFormat(undefined, { year: 'numeric', month: 'short', day: 'numeric' }).format(new Date(ff.fanfiction[section][fanName][i]["updated"] * 1000)),
					fsp_updatedRaw: ff.fanfiction[section][fanName][i]["updated"],
					fsp_complete: ff.fanfiction[section][fanName][i]["complete"],
					fsp_characters: ff.fanfiction[section][fanName][i]["characters"],
					fsp_relationships: ff.fanfiction[section][fanName][i]["relationships"],
					fsp_Id: ff.fanfiction[section][fanName][i]["id"]
				});
			}
		}

		//$('.search').on('keyup', function ()
		//{
		//	var searchString = $(this).val();
		//	fics.search(searchStrisng, ['fsp_words']);
		//});
		
		$("#fsp_resultCount").text(fics.size());

		$('.fsp_searchAuthor').keyup(function ()
		{
			var searchString = $(this).val();
			fics.search(searchString, ['fsp_author']);
		});

		$('.fsp_searchTitle').keyup(function ()
		{
			var searchString = $(this).val();
			fics.search(searchString, ['fsp_title']);
		});

		fics.on("updated", function ()
		{
			$(".fsp_list").unhighlight();
			var search = $(".search").val();
			var words = search.split(" ");
			$(".fsp_list").highlight(words);
			$("#fsp_resultCount").text(fics.matchingItems.length);
		}); // trigger
		
		$('.fsp_filterChapters, .fsp_filterWords, .fsp_filterReviews, .fsp_filterFavs, .fsp_filterFollows, .fsp_filterPublishedA, .fsp_filterPublishedB, .fsp_filterUpdatedA, .fsp_filterUpdatedB, .fsp_filterCharacters, .fsp_filterRelationships').on('keyup change', function ()
		{
			var number = [];
			var raw = [$(".fsp_filterChapters").val(), $(".fsp_filterWords").val(), $(".fsp_filterReviews").val(), $(".fsp_filterFavs").val(), $(".fsp_filterFollows").val(), $(".fsp_filterPublishedA").val(), $(".fsp_filterPublishedB").val(), $(".fsp_filterUpdatedA").val(), $(".fsp_filterUpdatedB").val(), $(".fsp_filterCharacters").val(), $(".fsp_filterRelationships").val()];
			var fsp = ["fsp_chapters", "fsp_words", "fsp_reviews", "fsp_favs", "fsp_follows", "fsp_publishedRaw", "fsp_publishedRaw", "fsp_updatedRaw", "fsp_updatedRaw", "fsp_characters", "fsp_relationships"];
			var im = [];
			if(debug) console.log(raw);
			for (let i = 0; i < raw.length; i++)
			{
				if (raw[i].match(">"))
				{
					number[i] = Number(raw[i].substr(1));
				} else if (raw[i].match("<"))
				{
					number[i] = Number(raw[i].substr(1));
				} else { number[i] = Number(raw[i]); }

				if (i >= 5 && i < 9)
				{
					if (raw[i] === "")
						number[i] = 0;
					else
						number[i] = new Date(raw[i]).getTime() / 1000;
				} else if (i === 9)
				{
					if (raw[i] === "")
						number[i] = 0;
					else
						number[i] = raw[i].split(",");
				} else if (i === 10)
				{
					if (raw[i] === "")
						number[i] = 0;
					else
						number[i] = raw[i].split(",");
				}
			}
			if (debug) console.log(number);
			fics.filter(function (item)
			{
				for (let i = 0; i < raw.length; i++)
				{
					if (raw[i] === "") continue;

					if (i >= 5 && i < 9)
					{
						if (!IsEven(i))
						{
							if (item.values()[fsp[i]] >= number[i])
							{
								im.push(true);
							}
							else
							{
								return false;
							}
						} else
						{
							if (item.values()[fsp[i]] <= number[i])
							{
								im.push(true);
							}
							else
							{
								return false;
							}
						}
					} else if (i === 9)
					{
						if (item.values()[fsp[i]] === "none")
							if (number[i] !== "none")
								return false;
							else
								return true;
						let temp = item.values()[fsp[i]];
						let yn = [];
						let c = 0;
						for (let j = 0; j < temp.length; j++)
						{
							for (let y = 0; y < number[i].length; y++)
							{
								if (temp[j].toUpperCase().match($.trim(number[i][y].toUpperCase())))
								{
									yn[j] = true;
									c++;
									break;
								}
								else
								{
									yn[j] = false;
								}
							}
						}

						if (c >= number[i].length)
							return true;
						else
							return false;

						if (yn.every(e => e === false))
							return false;
						else
							return true;
					} else if (i === 10)
					{
						if (item.values()[fsp[i]] === "none")
							if (number[i] !== "none")
								return false;
							else
								return true;
						let temp = item.values()[fsp[i]].slice(0);
						let tempR = temp.slice(0);

						for (let a = 0; a < temp.length; a++)
						{
							temp[a] = temp[a].join("/");
						}
						for (let a = 0; a < tempR.length; a++)
						{
							tempR[a] = tempR[a].reverse().join("/");
						}

						//console.log(temp);
						//console.log(tempR);

						let yn = [];
						let c = 0;
						for (let j = 0; j < temp.length; j++)
						{
							for (let y = 0; y < number[i].length; y++)
							{
								if (temp[j].toUpperCase().match($.trim(number[i][y].toUpperCase())) || tempR[j].toUpperCase().match($.trim(number[i][y].toUpperCase())))
								{
									yn[j] = true;
									c++;
									break;
								}
								else
								{
									yn[j] = false;
								}
							}
						}

						if (c >= number[i].length)
							return true;
						else
							return false;

						if (yn.every(e => e === false))
							return false;
						else
							return true;
					} else
					{
						if (raw[i].match(">"))
						{
							if (item.values()[fsp[i]] >= number[i])
							{
								im.push(true);
							}
							else
							{
								return false;
							}
						} else if (raw[i].match("<"))
						{
							if (item.values()[fsp[i]] <= number[i])
								im.push(true);
							else
								return false;
						} else if (item.values()[fsp[i]] === number[i])
						{
							im.push(true);
						} else
							return false;
					}
				}

				if (im.every(e => e === true))
					return true;
				else
					return false;

			}); // Only items with id > 1 are shown in list

			if (raw.every(e => e === ""))
			{
				fics.filter();
			}

			$("#fsp_resultCount").text(fics.matchingItems.length);
		});

		/*
		$('.fsp_filterPublishedA, .fsp_filterPublishedB, .fsp_filterUpdatedA, .fsp_filterUpdatedB').on('change', function ()
		{
			var number = [];
			var raw = [$(".fsp_filterPublishedA").val(), $(".fsp_filterPublishedB").val(), $(".fsp_filterUpdatedA").val(), $(".fsp_filterUpdatedB").val()];
			var fsp = ["fsp_publishedRaw", "fsp_publishedRaw", "fsp_updatedRaw", "fsp_updatedRaw"];
			var im = [];

			for (let i = 0; i < raw.length; i++)
			{
				number[i] = new Date(raw[i]).getTime() / 1000;
			}

			fics.filter(function (item)
			{
				for (let i = 0; i < raw.length; i++)
				{
					if (raw[i] === "") continue;

					if (IsEven(i))
					{
						if (item.values()[fsp[i]] >= number[i])
						{
							im.push(true);
						}
						else
						{
							return false;
						}
					} else
					{
						if (item.values()[fsp[i]] <= number[i])
						{
							im.push(true);
						}
						else
						{
							return false;
						}
					}
					
				}

				if (im.every(e => e === true))
					return true;
				else
					return false;

			}); // Only items with id > 1 are shown in list

			if (raw.every(e => e === ""))
			{
				fics.filter();
			}

			$("#fsp_resultCount").text(fics.matchingItems.length);
		});
		*/
		/*
		$('.fsp_filterChapters').on('keyup', function ()
		{
			var number;
			var raw = $(this).val();

			if (raw.match(">"))
			{
				number = raw.substr(1);
			} else if (raw.match("<"))
			{
				number = raw.substr(1);
			} else { number = raw; }

			fics.filter(function (item)
			{
				if (raw.match(">"))
				{
					if (item.values().fsp_chapters >= number)
						return true;
					else
						return false;
				} else if (raw.match("<"))
				{
					if (item.values().fsp_chapters <= number)
						return true;
					else
						return false;
				} else if (item.values().fsp_chapters === number)
				{
					return true;
				} else
					return false;

			}); // Only items with id > 1 are shown in list

			if (raw === "")
			{
				fics.filter();
			}

			$("#fsp_resultCount").text(fics.matchingItems.length);
		});

		$('.fsp_filterWords').on('keyup', function ()
		{
			var number;
			var raw = $(this).val();
			
			if (raw.match(">"))
			{
				number = raw.substr(1);
			} else if (raw.match("<"))
			{
				number = raw.substr(1);
			} else { number = raw; }

			fics.filter(function (item)
			{
				if (raw.match(">"))
				{
					if (item.values().fsp_words >= number)
						return true;
					else
						return false;
				} else if (raw.match("<"))
				{
					if (item.values().fsp_words <= number)
						return true;
					else
						return false;
				} else if (item.values().fsp_words === number)
				{
					return true;
				} else
					return false;
			}); // Only items with id > 1 are shown in list

			if (raw === "")
			{
				fics.filter();
			}

			$("#fsp_resultCount").text(fics.matchingItems.length);
		});

		$('.fsp_filterReviews').on('keyup', function ()
		{
			var number;
			var raw = $(this).val();

			if (raw.match(">"))
			{
				number = raw.substr(1);
			} else if (raw.match("<"))
			{
				number = raw.substr(1);
			} else { number = raw; }

			fics.filter(function (item)
			{
				if (raw.match(">"))
				{
					if (item.values().fsp_reviews >= number)
						return true;
					else
						return false;
				} else if (raw.match("<"))
				{
					if (item.values().fsp_reviews <= number)
						return true;
					else
						return false;
				} else if (item.values().fsp_reviews === number)
				{
					return true;
				} else
					return false;
			}); // Only items with id > 1 are shown in list

			if (raw === "")
			{
				fics.filter();
			}

			$("#fsp_resultCount").text(fics.matchingItems.length);
		});

		$('.fsp_filterFavs').on('keyup', function ()
		{
			var number;
			var raw = $(this).val();

			if (raw.match(">"))
			{
				number = raw.substr(1);
			} else if (raw.match("<"))
			{
				number = raw.substr(1);
			} else { number = raw; }

			fics.filter(function (item)
			{
				if (raw.match(">"))
				{
					if (item.values().fsp_favs >= number)
						return true;
					else
						return false;
				} else if (raw.match("<"))
				{
					if (item.values().fsp_favs <= number)
						return true;
					else
						return false;
				} else if (item.values().fsp_favs === number)
				{
					return true;
				} else
					return false;
			}); // Only items with id > 1 are shown in list

			if (raw === "")
			{
				fics.filter();
			}

			$("#fsp_resultCount").text(fics.matchingItems.length);
		});

		$('.fsp_filterFollows').on('keyup', function ()
		{
			var number;
			var raw = $(this).val();

			if (raw.match(">"))
			{
				number = raw.substr(1);
			} else if (raw.match("<"))
			{
				number = raw.substr(1);
			} else { number = raw; }

			fics.filter(function (item)
			{
				if (raw.match(">"))
				{
					if (item.values().fsp_follows >= number)
						return true;
					else
						return false;
				} else if (raw.match("<"))
				{
					if (item.values().fsp_follows <= number)
						return true;
					else
						return false;
				} else if (item.values().fsp_follows === number)
				{
					return true;
				} else
					return false;
			}); // Only items with id > 1 are shown in list

			if (raw === "")
			{
				fics.filter();
			}

			$("#fsp_resultCount").text(fics.matchingItems.length);
		});
		*/
	} catch (e) { console.error(e); }
}
//Function Search Filter Sort fics
//End

//-------------------------
//UI/Events STUFF BELOW
//-------------------------

//Start
//Function UI add 
function UI(what)
{
	try
	{
		var a,
			s;
		switch (what)
		{
			case "first":
				a = $("<a id=fsp_fetch></a>").text("Fetch fanfics");

				$("#content_wrapper_inner > span:first").prepend("	|	");
				$("#content_wrapper_inner > span:first").prepend("<span id=fsp_fetchCount>" + ff.fanfiction[section][fanName].length + "</span>");
				$("#content_wrapper_inner > span:first").prepend("	|	");
				$("#content_wrapper_inner > span:first").prepend(a);
				SetEvents(what, a);
				break;
			case "normal":
				var div = $("<div id=fsp_main></div>").html('<div id=fsp_searchOptions>\
					<div id=fsp_filters>\
					<div id=fsp_filterZeroGrid>\
					<input class="filter fsp_searchAuthor" type="text" placeholder="Search Author" />\
					<input class="filter fsp_searchTitle" type="text" placeholder="Search Title" />\
					</div>\
					<hr size="1" noshade="">\
					<div id=fsp_filterOneGrid>\
					<input class="filter fsp_filterChapters" type="text" pattern="(>|<|)\\d+" placeholder="Filter Chapters (x,>x,<x)" title="Example:>10 means every fanfic with more than 10 chapters" />\
					<input class="filter fsp_filterWords" type="text" pattern="(>|<|)\\d+" placeholder="Filter Words (x,>x,<x)" title="Example:>10000 means every fanfic with more than 10000 words" />\
					<input class="filter fsp_filterReviews" type="text" pattern="(>|<|)\\d+" placeholder="Filter Reviews (x,>x,<x)" title="Example:>15 means every fanfic with more than 15 reviews" />\
					<input class="filter fsp_filterFavs" type="text" pattern="(>|<|)\\d+" placeholder="Filter Favs (x,>x,<x)" title="Example:>150 means every fanfic with more than 150 favs" />\
					<input class="filter fsp_filterFollows" type="text" pattern="(>|<|)\\d+" placeholder="Filter Follows (x,>x,<x)" title="Example:>100 means every fanfic with more than 100 follows" />\
					</div>\
					<hr size="1" noshade="">\
					<div id=fsp_filterTwoGrid>\
					<label for="fsp_filterPublishedA">Published After:</label>\
					<input id="fsp_filterPublishedA" class="filter fsp_filterPublishedA" type="date" placeholder="Published After" title="" />\
					<label for="fsp_filterPublishedB">Published Before:</label>\
					<input id="fsp_filterPublishedB" class="filter fsp_filterPublishedB" type= "date" placeholder="Published Before" title= "" />\
					<label for="fsp_filterUpdatedA">Updated After:</label>\
					<input id="fsp_filterUpdatedA" class="filter fsp_filterUpdatedA" type= "date" placeholder="Updated After" title= "" />\
					<label for="fsp_filterUpdatedB">Updated Before:</label>\
					<input id="fsp_filterUpdatedB" class="filter fsp_filterUpdatedB" type= "date" placeholder="Updated Before" title= "" />\
					</div>\
					<hr size="1" noshade="">\
					<div id=fsp_filterTreeGrid>\
					<input id="fsp_filterCharacters" class="filter fsp_filterCharacters" type="text" placeholder="Characters (x,x)" title="Example:Elsa,Anna" />\
					<input id="fsp_filterRelationships" class="filter fsp_filterRelationships" type= "text" placeholder="Relationships (x/x)" title="Example:Elsa/Anna" />\
					</div>\
					<hr size="1" noshade="">\
					</div>\
					<div id=fsp_sortGrid>\
					<button  class="sort" data-sort="fsp_author">Sort by author</button >\
					<button  class="sort" data-sort="fsp_title">Sort by title</button >\
					<button  class="sort" data-sort="fsp_rated">Sort by rated</button >\
					<button  class="sort" data-sort="fsp_lag">Sort by language</button >\
					<button  class="sort" data-sort="fsp_chapters">Sort by chapters</button >\
					<button  class="sort" data-sort="fsp_words">Sort by words</button >\
					<button  class="sort" data-sort="fsp_reviews">Sort by reviews</button >\
					<button  class="sort" data-sort="fsp_favs">Sort by favs</button >\
					<button  class="sort" data-sort="fsp_follows">Sort by follows</button >\
					<button  class="sort" data-sort="fsp_publishedRaw">Sort by published</button >\
					<button  class="sort" data-sort="fsp_updatedRaw">Sort by updated</button >\
					<button  class="sort" data-sort="fsp_complete">Sort by complete</button >\
					</div>\
					<input class="search" placeholder="Global Search" />\
					<span id=fsp_resultCount></span>\
					<ul class="pagination"></ul>\
					</div>\
					<hr size="1" noshade="">\
					<ul class="list">\
					</ul>\
					<ul class="pagination"></ul>\
					</div>');
				//console.log($(".lc-wrapper").nextAll());
				$(".lc-wrapper").nextAll().wrapAll("<div id=fsp_wrap />");

				$("#fsp_wrap").after(div);
				$(div).hide();

				s = $("<a id=fsp_search></a>").text("Search fanfics"),
				a = $("<a id=fsp_fetch></a>").text("Update fanfics");

				$("#content_wrapper_inner > span:first").prepend("	|	");
				$("#content_wrapper_inner > span:first").prepend("<span id=fsp_fetchCount>" + ff.fanfiction[section][fanName].length + "</span>");
				$("#content_wrapper_inner > span:first").prepend("	|	");
				$("#content_wrapper_inner > span:first").prepend(a);
				$("#content_wrapper_inner > span:first").prepend("	|	");
				$("#content_wrapper_inner > span:first").prepend(s);
				SetEvents(what); //TODO EVENTS
				break;
			case "upFetchCount":
				$("#fsp_fetchCount").text(ff.fanfiction[section][fanName].length);
				break;
			default:
				break;
		}
		
	} catch (e) { console.error(e); }
}
//Function UI add
//End

//Start
//Function set events 
function SetEvents(what, target)
{
	try
	{
		switch (what)
		{
			case "first":
				$(target).click(function ()
				{
					if (window.confirm("Be patient. It will take some time to fetch ALL fanfics for this fandom. !!!DO NOT CLOSE AND RELOAD THIS TAB!"))
					{
						//Update GM fetch is true
						ff.fetch = true;
						UpdateGM("ff");
						alert("!YES!");
						window.location.href = "https://www.fanfiction.net/" + section + "/" + fanName + "/" + mRatingAndUpTime;
						//Began fetching
						//MAKE MARKS ON FANFICS GREEN PARSED BLACK/RED NOT AND MIDDLE GROUND
					} else
					{
						alert("!NO!");
					}
				});
				break;
			case "normal":
				$("#fsp_fetch").click(function ()
				{
					if (window.confirm("Be patient. It will take some time to UPDATE fanfics for this fandom. !!!DO NOT CLOSE AND RELOAD THIS TAB!"))
					{
						ff.fetch = true;
						ff.fanfiction[section][fanName].length = 0; //TODO ACTUAL UPDATE
						UpdateGM("ff");
						alert("!YES!");
						window.location.href = "https://www.fanfiction.net/" + section + "/" + fanName + "/" + mRatingAndUpTime;
						//Began fetching
						//MAKE MARKS ON FANFICS GREEN PARSED BLACK/RED NOT AND MIDDLE GROUND
					} else
					{
						alert("!NO!");
					}
				});
				$("#fsp_search").click(function ()
				{
					$("#fsp_wrap").toggle(1000);
					$("#fsp_main").toggle(1000);
					if (!listTrue)
					{
						SearchFilterSort();
						listTrue = true;
					}
				});
				break;
			default:
				break;
		}

	} catch (e) { console.error(e); }
}
//Function set events
//End

//Start
//Function place css
function SetCSS()
{
	$("head").append($("<!--Start of Fanfiction Search Plus v" + GM.info.script.version + " CSS-->"));

	$("head").append($("<style type=text/css></style>").text("#fsp_fetch { \
		cursor: pointer;\
	}"));

	$("head").append($("<style type=text/css></style>").text("#fsp_search { \
		cursor: pointer;\
	}"));

	$("head").append($("<style type=text/css></style>").text(".pagination li { \
		cursor: pointer;\
		display: inline-block;\
		padding: 5px;\
		margin-top: 5px;\
		margin-bottom: 5px;\
		align-content: center;\
	}"));

	$("head").append($("<style type=text/css></style>").text('.sort {\
		padding: 8px 30px;\
		border-radius: 6px;\
		border: none;\
		display: inline-block;\
		color: #fff;\
		text-decoration: none;\
		background-color: #28a8e0;\
		height: 30px;\
	}\
.sort:hover {\
		text-decoration: none;\
		background-color:#1b8aba;\
	}\
.sort:focus {\
		outline: none;\
	}\
.sort:after {\
		width: 0;\
		height: 0;\
		border-left: 5px solid transparent;\
		border-right: 5px solid transparent;\
		border-bottom: 5px solid transparent;\
		content: "";\
		position: relative;\
		top: -10px;\
		right: -5px;\
	}\
.sort.asc:after {\
		width: 0;\
		height: 0;\
		border-left: 5px solid transparent;\
		border-right: 5px solid transparent;\
		border-top: 5px solid #fff;\
		content: "";\
		position: relative;\
		top: 13px;\
		right: -5px;\
	}\
.sort.desc:after {\
		width: 0;\
		height: 0;\
		border-left: 5px solid transparent;\
		border-right: 5px solid transparent;\
		border-bottom: 5px solid #fff;\
		content: "";\
		position: relative;\
		top: -10px;\
		right: -5px;\
}'));

	$("head").append($("<style type=text/css></style>").text('.highlight{background-color:yellow; }'));

	$("head").append($("<style type=text/css></style>").text('.pagination {display: flex;\
	justify-content: center;}'));

	$("head").append($("<style type=text/css></style>").text('#fsp_resultCount {display: flex;\
	justify-content: center;\
	font-size: 25px;\
	background-color: #4e4d4d;\
	color: white;\
		}'));

	$("head").append($("<style type=text/css></style>").text('#fsp_sortGrid {display: grid;\
	grid-template-columns: repeat(6, 1fr);\
	grid-gap: 5px;}'));

	$("head").append($("<style type=text/css></style>").text('.search {\
		width: 75%;\
		margin-bottom: 5px;\
		text-align: center;\
		background: linear-gradient(#eee, #fff);\
		border: 1px solid rgba(255, 255, 255, 0.6);\
		box-shadow: inset 0 1px 4px rgba(0, 0, 0, 0.4);\
		padding: 5px;\
		position: relative;\
		display: block;\
		margin-top: 5px;\
		margin-right: auto;\
		margin-bottom: 5px;\
		margin-left: auto;}'));

	$("head").append($("<style type=text/css></style>").text('#fsp_filterOneGrid {display: grid;\
	grid-template-columns: repeat(5, 1fr);\
	grid-gap: 5px;\
	margin: 5px;}'));

	$("head").append($("<style type=text/css></style>").text('#fsp_filterTwoGrid {display: grid;\
	grid-template-columns: repeat(4, 0.2fr);\
	grid-gap: 5px;\
	margin: 5px;}'));

	$("head").append($("<style type=text/css></style>").text('#fsp_filterZeroGrid {display: grid;\
	grid-template-columns: repeat(2, 1fr);\
	grid-gap: 5px;\
	margin: 5px;}'));

	$("head").append($("<style type=text/css></style>").text('#fsp_filterTreeGrid {display: grid;\
	grid-template-columns: repeat(2, 1fr);\
	grid-gap: 5px;\
	margin: 5px;}'));

	$("head").append($("<!--End of Fanfiction Search Plus v" + GM.info.script.version + " CSS-->"));
}
//Function place css
//End


//-------------------------
//Tools STUFF BELOW
//-------------------------

/*
 * jQuery Highlight plugin
 *
 * Based on highlight v3 by Johann Burkard
 * http://johannburkard.de/blog/programming/javascript/highlight-javascript-text-higlighting-jquery-plugin.html
 *
 * Code a little bit refactored and cleaned (in my humble opinion).
 * Most important changes:
 *  - has an option to highlight only entire words (wordsOnly - false by default),
 *  - has an option to be case sensitive (caseSensitive - false by default)
 *  - highlight element tag and class names can be specified in options
 *
 * Usage:
 *   // wrap every occurrence of text 'lorem' in content
 *   // with <span class='highlight'> (default options)
 *   $('#content').highlight('lorem');
 *
 *   // search for and highlight more terms at once
 *   // so you can save some time on traversing DOM
 *   $('#content').highlight(['lorem', 'ipsum']);
 *   $('#content').highlight('lorem ipsum');
 *
 *   // search only for entire word 'lorem'
 *   $('#content').highlight('lorem', { wordsOnly: true });
 *
 *   // search only for the entire word 'C#'
 *   // and make sure that the word boundary can also
 *   // be a 'non-word' character, as well as a regex latin1 only boundary:
 *   $('#content').highlight('C#', { wordsOnly: true , wordsBoundary: '[\\b\\W]' });
 *
 *   // don't ignore case during search of term 'lorem'
 *   $('#content').highlight('lorem', { caseSensitive: true });
 *
 *   // wrap every occurrence of term 'ipsum' in content
 *   // with <em class='important'>
 *   $('#content').highlight('ipsum', { element: 'em', className: 'important' });
 *
 *   // remove default highlight
 *   $('#content').unhighlight();
 *
 *   // remove custom highlight
 *   $('#content').unhighlight({ element: 'em', className: 'important' });
 *
 *
 * Copyright (c) 2009 Bartek Szopka
 *
 * Licensed under MIT license.
 *
 */

(function (factory)
{
	if (typeof define === 'function' && define.amd)
	{
		// AMD. Register as an anonymous module.
		define(['jquery'], factory);
	} else if (typeof exports === 'object')
	{
		// Node/CommonJS
		factory(require('jquery'));
	} else
	{
		// Browser globals
		factory(jQuery);
	}
}(function (jQuery)
{
	jQuery.extend({
		highlight: function (node, re, nodeName, className, callback)
		{
			if (node.nodeType === 3)
			{
				var match = node.data.match(re);
				if (match)
				{
					// The new highlight Element Node
					var highlight = document.createElement(nodeName || 'span');
					highlight.className = className || 'highlight';
					// Note that we use the captured value to find the real index
					// of the match. This is because we do not want to include the matching word boundaries
					var capturePos = node.data.indexOf(match[1], match.index);

					// Split the node and replace the matching wordnode
					// with the highlighted node
					var wordNode = node.splitText(capturePos);
					wordNode.splitText(match[1].length);

					var wordClone = wordNode.cloneNode(true);
					highlight.appendChild(wordClone);
					wordNode.parentNode.replaceChild(highlight, wordNode);
					if (typeof callback === 'function')
					{
						callback(highlight);
					}
					return 1; //skip added node in parent
				}
			} else if ((node.nodeType === 1 && node.childNodes) && // only element nodes that have children
				!/(script|style)/i.test(node.tagName) && // ignore script and style nodes
				!(node.tagName === nodeName.toUpperCase() && node.className === className))
			{ // skip if already highlighted
				for (var i = 0; i < node.childNodes.length; i++)
				{
					i += jQuery.highlight(node.childNodes[i], re, nodeName, className, callback);
				}
			}
			return 0;
		}
	});

	jQuery.fn.unhighlight = function (options)
	{
		var settings = {
			className: 'highlight',
			element: 'span'
		};

		jQuery.extend(settings, options);

		return this.find(settings.element + '.' + settings.className).each(function ()
		{
			var parent = this.parentNode;
			parent.replaceChild(this.firstChild, this);
			parent.normalize();
		}).end();
	};

	jQuery.fn.highlight = function (words, options, callback)
	{
		var settings = {
			className: 'highlight',
			element: 'span',
			caseSensitive: false,
			wordsOnly: false,
			wordsBoundary: '\\b'
		};

		jQuery.extend(settings, options);

		if (typeof words === 'string')
		{
			words = [words];
		}
		words = jQuery.grep(words, function (word, i)
		{
			return word !== '';
		});
		words = jQuery.map(words, function (word, i)
		{
			return word.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
		});

		if (words.length === 0)
		{
			return this;
		}

		var flag = settings.caseSensitive ? '' : 'i';
		// The capture parenthesis will make sure we can match
		// only the matching word
		var pattern = '(' + words.join('|') + ')';
		if (settings.wordsOnly)
		{
			pattern =
				(settings.wordsBoundaryStart || settings.wordsBoundary) +
				pattern +
				(settings.wordsBoundaryEnd || settings.wordsBoundary);
		}
		var re = new RegExp(pattern, flag);

		return this.each(function ()
		{
			jQuery.highlight(this, re, settings.element, settings.className, callback);
		});
	};
}));

function IsEven(n)
{
	return n === parseFloat(n) ? !(n % 2) : void 0;
}

