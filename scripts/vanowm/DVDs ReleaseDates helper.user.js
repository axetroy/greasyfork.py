// ==UserScript==
// @name        DVDs ReleaseDates helper
// @namespace   V@no
// @description Add external links
// @include     http://www.dvdsreleasedates.com/*
// @include     https://www.dvdsreleasedates.com/*
// @version     1.2.6
// @grant       none
// ==/UserScript==

function $(id)
{
	return document.getElementById(id);
}

function urlencode(url)
{
	return encodeURI(url).replace(/%5B/g, '[').replace(/%5D/g, ']');
}

let links = [
		{
			name: "ThePirateBay",
			nameShort: "TPB",
			url: "https://thepiratebay.org/search/{S}/0/3/0",
			icon: ""
		},
		{
			name: "1337x",
			nameShort: "1337x",
			url: "https://1337x.to/sort-category-search/{S}/Movies/time/desc/1/",
			icon: ""
		},
		{
			name: "RARBG",
			nameShort: "RARBG",
			url: "https://rarbg.to/torrents.php?search={S}&order=data&by=DESC",
			icon: ""
		},
/*
		{
			name: "OMDB",
			nameShort: "OMDB",
			url: "http://www.omdbapi.com/?t={S}",
			icon: "",
			
		}
*/

];

function cleanup(t)
{
	t = t.replace(/[-:,]\s(season\s(\w+))$/i, season);
	t = t.replace(/\[[^\]]*\]/g, "");
	let l = ["4k", "ultra", "hd", "bd", "ultrahd", "edition"];
	for(let i = 0; i < l.length; i++)
	{
		t = t.replace(new RegExp("\\b" + l[i] + "\\b", "gi"), "");
	}
	return t;
}

function season(a, b, c, d)
{
	let n = ["", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"],
			i = n.indexOf(c.toLowerCase());

	if (i == -1)
		i = c.replace(/[a-zA-Z]+/g, "");

	return " S" + i;
}

let td = document.getElementsByClassName("dvdcell");
for(let i = 0; i < td.length; i++)
{
	let title = "",
			a = td[i].getElementsByTagName("a");

	for(let t = 0; t < a.length; t++)
	{
		if (!a[t].children.length)
		{
			title = a[t].textContent;
			break;
		}
	}
	if (!title)
		continue;

	let div = document.createElement("div");

	div.className = "links";
	for(let n = 0; n < links.length; n++)
	{
		let a = document.createElement("a"),
				img = document.createElement("img"),
				item = links[n],
				dom = item.url.match(/\/\/([^\/{}]+)/)[1],
				icoUrl = item.icon == "g" ? "http://www.google.com/s2/favicons?domain=" + (dom ? dom[1] : "") : item.icon;

		a.href = item.url.replace("{S}", urlencode(cleanup(title)));
		a.setAttribute("target", "_blank");
		a.title = item.name;
		a.className = item.name.replace(/^1/, "l");
		if (icoUrl)
		{
			img.src = icoUrl;
			img.title = item.name;
			a.appendChild(img);
		}
		else
			a.className += " img";

		div.appendChild(a);
	}
	td[i].appendChild(div);
}


//create stylesheet. A little trick to have multiline text
var	style = document.createElement("style"),
		css = function(){/*
div.links
{
	display: block;
	text-align: center;
}
div.links > a
{
	padding-right: 2px;
	padding-left: 2px;
	border-right: 1px dotted silver;

}
div.links > a:last-child
{
	padding-right: 2px;
	border-right: 0;
}

div.links > a.img
{
	width: 16px;
	height: 16px;
	display: inline-block;
	background-repeat: no-repeat;
	background-position: center;
	vertical-align: middle;
}
div.links > a.l337x
{
	background-image: url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgdmVyc2lvbj0iMSIgdmlld0JveD0iMCAwIDE2IDE2Ij48cGF0aCBmaWxsPSIjRkZGIiBkPSJNMCAxNS45OEw0LjQxIDcuOC42MiAwaDYuMDVsMS41MSAzLjI2TDkuODEgMGg1Ljg2bC0zLjYgNy44MkwxNiAxNS45OSA5LjcgMTZsLTEuNTctMy4yMkw2LjYzIDE2eiIvPjxwYXRoIGZpbGw9IiNENjM2MDAiIGQ9Ik0xLjk4Ljg5aDQuMThsMiA0LjNMMTAuMy44OWg0LjA0bC0zLjIgNi45NCAzLjUgNy4yN0gxMC4ybC0yLjA3LTQuMjctMiA0LjI4LTQuNjktLjAxIDMuOTItNy4yOEwxLjk4Ljg5eiIvPjxwYXRoIGZpbGw9IiNERjYyMzgiIGQ9Ik00LjE3IDEwLjAyczMuOTQtLjM3IDcuNjQtMy42M2wyLjUzLTUuNUgxMC4zTDguMTYgNS4xMmwtMi00LjI1SDEuOTlsMy4zNSA2LjkyLTEuMTYgMi4yM3oiLz48L3N2Zz4=");
}
div.links > a.RARBG
{
	background-image: url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgdmVyc2lvbj0iMSIgdmlld0JveD0iMCAwIDE0LjI1IDE2LjA3Ij48cGF0aCBmaWxsPSIjRkZGIiBkPSJNOS4xOCAxNi4wN2ExIDEgMCAwIDEtLjgyLS40MWwtMy4wNC00LjI4djMuN2ExIDEgMCAwIDEtMSAxSDFhMSAxIDAgMCAxLTEtMVYxYTEgMSAwIDAgMSAxLTFoNS4zM2MuNzkgMCAxLjQ5LjA1IDIuMS4xNi42OC4xMyAxLjMxLjM4IDEuODguNzYuNjEuNDIgMS4xLjk0IDEuNDUgMS41Ny4zNi42NC41NSAxLjQ0LjU1IDIuMzcgMCAxLjI4LS4zIDIuMzUtLjg2IDMuMTktLjM0LjQ5LS43NS45Mi0xLjIyIDEuM2wzLjUgNC43Mi4zMS40YTEgMSAwIDAgMS0uOCAxLjZIOS4xOXpNNS4zIDYuMzdjLjM4IDAgLjctLjAzLjk0LS4wN2EuNjguNjggMCAwIDAgLjM1LS4xNmMuMS0uMDkuMTctLjE3LjItLjI3LjAzLS4wNS4wOC0uMjIuMDgtLjU3IDAtLjItLjAzLS4zNi0uMDgtLjQ3LS4wMS0uMDItLjA0LS4wOC0uMTctLjEzYTEuMTggMS4xOCAwIDAgMC0uMzYtLjFsLS44NS0uMDJoLS4xdjEuNzl6Ii8+PHBhdGggZmlsbD0iIzM4NjBCQiIgZD0iTTguNzkgOS4wOGE0LjkgNC45IDAgMCAwIDEuODMtMS42Yy40Ni0uNjcuNjktMS41NC42OS0yLjYyIDAtLjc2LS4xNC0xLjM5LS40Mi0xLjg4LS4yOC0uNS0uNjYtLjktMS4xMy0xLjIyLS40Ni0uMzEtLjk3LS41MS0xLjUxLS42MUM3LjcgMS4wNSA3LjA2IDEgNi4zMyAxSDF2MTQuMDdoMy4zMVY5LjlINS41bDMuNjkgNS4xN2g0LjA3bC0uMzItLjRMOC44IDkuMDd6TTcuNzIgNi4yNmMtLjEuMjUtLjI2LjQ2LS40OC42My0uMjIuMi0uNS4zMy0uODEuMzktLjMzLjA2LS43Mi4wOS0xLjE4LjA5aC0uOTV2LTMuOGgxLjExYy4zOCAwIC43LjAyLjk1LjA0LjI1LjAzLjQ4LjA5LjcuMTguMjkuMTQuNS4zNC42Mi42LjEzLjI1LjIuNTUuMi45IDAgLjQtLjA2LjczLS4xNi45N3oiLz48L3N2Zz4=");
}
div.links > a.ThePirateBay
{
	background-image: url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgdmVyc2lvbj0iMSIgdmlld0JveD0iMCAwIDkgOSI+PHBhdGggZmlsbD0iI0ZGRiIgZD0iTTguOTQgNmExLjI2IDEuMjYgMCAwIDAtLjEtLjIzYy4wMy0uMTIuMDUtLjIyLjA1LS4yOC4wNC0uNjktLjM1LTEuMTItLjctMS4xN2EuNjguNjggMCAwIDAtLjMzIDB2LS42OGMwLS4wOSAwLS4yNi0uMDUtLjQ0VjEuMTZDNy44LjUyIDcuNCAwIDYuOSAwSDIuMzdjLS40OSAwLS45LjUyLS45IDEuMTZWMy4yYy0uMDQuMTctLjA1LjM0LS4wNS40MnYuM2EuNzIuNzIgMCAwIDAtLjQtLjEyYy0uNCAwLS44MS4zOC0uODMgMS4xIDAgLjA0IDAgLjE0LjAzLjI2LS4wNy4xLS4xLjE5LS4xMy4yNC0uMjMuNjIgMCAxLjIuMzIgMS40MmEuNy43IDAgMCAwIC4zNi4xNmMuMDEuMDQuMDQuMTMuMS4yMy0uMDMuMTItLjA1LjIyLS4wNS4yOC0uMDQuNjkuMzUgMS4xMi43IDEuMTdsLjE2LjAyYy40MyAwIC43LS40LjgxLS44NWwyLjA1LS4zNyAxLjgzLjU4Yy4wOC41MS4zNy45Ni44My45NmguMDRjLjM5IDAgLjgtLjM5LjgyLTEuMSAwLS4wNSAwLS4xNS0uMDItLjI3bC4wNy0uMTJoLjA0Yy4xMyAwIC4yNS0uMDMuMzQtLjEuMzYtLjE4LjY0LS43NC40NS0xLjQxeiIvPjxwYXRoIGQ9Ik0yLjMyIDUuMjdjLS4yMiAwLS40LS4yMy0uNC0uNTJWMy42MnMwLS4xOS4wNS0uMjdWMS4xNmMwLS4yOC4xOC0uNTIuNC0uNTJoNC41NGMuMjIgMCAuNC4yNC40LjUydjIuMTljLjA2LjA4LjA1LjI3LjA1LjI3djEuMTNjMCAuMjktLjE4LjUyLS40LjUySDIuMzJ6TTMuNCAyLjI4Yy0uMjQgMC0uNDQuMjUtLjQ0LjU2cy4yLjU2LjQ0LjU2LjQzLS4yNS40My0uNTYtLjItLjU2LS40My0uNTZ6bS0uMDMgMi4yNWMtLjEgMC0uMTcuMS0uMTcuMjJzLjA3LjIyLjE3LjIyYy4wOSAwIC4xNy0uMS4xNy0uMjJzLS4wOC0uMjItLjE3LS4yMnptLjYtLjE1Yy0uMTIgMC0uMjEuMTItLjIxLjI3cy4xLjI4LjIuMjguMjItLjEzLjIyLS4yOC0uMS0uMjctLjIxLS4yN3ptMS40OC0xLjU0YzAgLjMxLjIuNTYuNDQuNTZzLjQzLS4yNS40My0uNTYtLjItLjU2LS40My0uNTYtLjQ0LjI1LS40NC41NnptLjMgMS45MWMwIC4xMi4wNy4yMi4xNy4yMnMuMTctLjEuMTctLjIyLS4wOC0uMjItLjE3LS4yMmMtLjEgMC0uMTcuMS0uMTcuMjJ6bS0uNjUtLjFjMCAuMTUuMS4yOC4yMi4yOC4xMSAwIC4yLS4xMy4yLS4yOHMtLjA5LS4yNy0uMi0uMjdjLS4xMiAwLS4yMi4xMi0uMjIuMjd6bS4wOS0yLjM4aC0xLjF2LjYyaDEuMXYtLjYyeiIvPjxwYXRoIGQ9Ik04LjQ4IDYuMjRTOC40MyA2LjA4IDguMyA2YzAgMC0uMDYtLjAzLS4wNy0uMXYtLjAzYzAtLjA2LjA0LS4xMS4wNC0uMTEuMS0uMTMuMTEtLjMuMTEtLjMuMDMtLjQ1LS4yOS0uNS0uMjktLjUtLjM4LS4wOS0uNDQuNTUtLjQ0LjU1LS4wNC4yNS0uMjUuMjYtLjI1LjI2bC0uOTYuMTgtMS44Ni4zMy0yLjk1LS45M3MtLjItLjA0LS4yMy0uM2MwIDAgMC0uNjQtLjQtLjYgMCAwLS4zMSAwLS4zMi40NSAwIDAgMCAuMTguMDkuMzIgMCAwIC4wNC4wNi4wMy4xMnYuMDNhLjE0LjE0IDAgMCAxLS4wOC4xYy0uMTMuMDYtLjE5LjIyLS4xOS4yMi0uMTUuNC4xMy42LjEzLjYuMzMuMjYuNTYtLjMuNTYtLjMuMTItLjIxLjMyLS4xMy4zMi0uMTNsMS45NC42Mi0xLjI1LjIycy0uMi4wNi0uMy0uMTZjMCAwLS4xOS0uNi0uNTMtLjM3IDAgMC0uMy4xNS0uMTguNTcgMCAwIC4wNS4xNi4xNy4yNSAwIDAgLjA2LjA0LjA2LjF2LjAzYy4wMS4wNy0uMDMuMTItLjAzLjEyLS4xLjEzLS4xMS4zLS4xMS4zLS4wMy40NS4yOS41LjI5LjUuMzguMDkuNDMtLjU1LjQzLS41NS4wNS0uMjUuMjYtLjI3LjI2LS4yN2wyLjI3LS40IDEuMS4zNS45NC4zcy4yMS4wNC4yNC4zYzAgMCAwIC42NC4zOS42IDAgMCAuMzItLjAxLjMzLS40NiAwIDAgMC0uMTctLjEtLjMxIDAgMC0uMDMtLjA2LS4wMi0uMTN2LS4wM2MuMDItLjA2LjA4LS4wOS4wOC0uMDlhLjUuNSAwIDAgMCAuMTktLjIyYy4xNS0uNC0uMTMtLjYtLjEzLS42LS4zMy0uMjctLjU3LjMtLjU3LjMtLjEuMjEtLjMxLjEyLS4zMS4xMmwtLjk0LS4zLS4xMS0uMDMuODUtLjE1Ljk2LS4xOHMuMi0uMDYuMy4xN2MwIDAgLjE5LjYuNTMuMzcgMCAwIC4zLS4xNi4xOC0uNTh6Ii8+PC9zdmc+");
}
*/};
style.innerHTML = css.toString().slice(14, -3).replace(/\*\/\/\*/g, "*/");
document.getElementsByTagName("head")[0].appendChild(style);
