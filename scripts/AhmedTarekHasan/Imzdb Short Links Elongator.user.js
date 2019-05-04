// ==UserScript==

// @name          Imzdb Short Links Elongator

// @namespace     DevelopmentSimplyPut(developmentsimplyput.blogspot.com)

// @description   Elongates all Imzdb short links to their direct links

// @include       *

// @version 0.0.1.20141015205306
// ==/UserScript==

String.prototype.ReplaceAll = function(stringToFind,stringToReplace){
    var temp = this;
    var index = temp.indexOf(stringToFind);

        while(index != -1){

            temp = temp.replace(stringToFind,stringToReplace);
            index = temp.indexOf(stringToFind);
        }
        return temp;
    }

Array.prototype.unique = function () {
	var r = new Array();
	o:for(var i = 0, n = this.length; i < n; i++)
	{
		for(var x = 0, y = r.length; x < y; x++)
		{
			if(r[x]==this[i])
			{
				continue o;
			}
		}
		r[r.length] = this[i];
	}
	return r;
}

function Run(Urls)
{
	if(Urls.length>0)
	{
		for(i=0;i<Urls.length;i++)
			GetDirectLink(Urls[i]);
	}
}

function GetDirectLink(str)
{
	GM_xmlhttpRequest(
							{
								method: "GET",
								url: 'http://imzdb.com/m1.php?id=' + str.replace('http://imzdb.com/',""),
								headers:{'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey', 'Content-type':'application/x-www-form-urlencoded'},
								onload:function(result)
								{
									var parts1=new Array();
									var parts2=new Array();
									parts1=result.responseText.split('onclick="NewWindow(');
									parts2=parts1[1].split("'");
									result=parts2[1];
									(document.getElementsByTagName("body"))[0].innerHTML=(document.getElementsByTagName("body"))[0].innerHTML.ReplaceAll(str,result);
								}
							}
						);
}

var DirectUrls=new Array();
var Urls=new Array();
var UrlsPattern=/http:\/\/imzdb\.com\/(?:\w*)/g;
Urls=(document.getElementsByTagName("body"))[0].innerHTML.match(UrlsPattern);

Urls=Urls.unique();
Run(Urls);