// ==UserScript==
// @author         Warcode 
// @name        Torrent & subs in IMDB
// @namespace   Created By WarCode..
// @description Adds title search links to the most popular torrent sites in lists.
// @include     http://www.imdb.*/list/*
// @include     http://imdb.*/list/*
// @include     http://www.imdb.com/list/*
// @include     http://www.imdb.com/title/*
// @include     http://www.imdb.*/title/*
// @include     http://imdb.*/title/*
// @include     http://akas.imdb.*/title/*
// @include     http://www.akas.imdb.*/title/*
// @include     http://www/imdb.*/genre/*
// @include     http://www/imdb.*/chart/*
// @include     http://www.imdb.com/search/title?*
// @version     1.5
// @grant       none
// Original Script by mungushume forked by r3b31 
// @namespace   https://greasyfork.org/en/users/8454-warcode
// ==/UserScript==

// Special Thanks to  r3b31 https://greasyfork.org/users/3202

// After installing script try on this url 
//                http://www.imdb.com/list/ls000344406/?start=910&view=detail&sort=listorian:asc


// Descripton Starts Here ---------

//      This code is for opening link in new tab which doesn't belong to the current URL pattern.
//      Explanation: if the URL is having www.imdb.com/lists and you click a link which has
//      URL www.imdb.com/title then the link will automatically open in new tab.


var sCurrentHost = location.host;
	var arLinks = document.links;

	for (var i = arLinks.length - 1; i >= 0; i--) {
		var elmLink = arLinks[i];
		if (elmLink.host && elmLink.host == sCurrentHost) {
				elmLink.target = "_blank";
       self.focus();
		}
}




//ad remover code by skeeto (http://userscripts.org/scripts/review/50476)

// Hide certain page elements with CSS.
var divs = document.getElementsByTagName('div');
for (var i = 0; i < divs.length; i++)
    {
	if (divs[i].id.search(/sponsored_links/) != -1)
	    divs[i].style.display = 'none';
	if (divs[i].id == 'top_rhs_after')
	    divs[i].style.display = 'none';
     }

// Remove all iframes (only used for ads)
var iframes = document.getElementsByTagName('iframe');
for (var i = 0; i < iframes.length; i++)
    iframes[i].style.display = 'none';


//end of ad remover code






// Check if the path is genre, title, or list.

var pathArray = window.location.pathname.split( '/' );



if (pathArray[1]=="list"){
    
     var alltitles = document.evaluate("//div[@class='info']//b//a", 
            document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

        var alldiv = document.evaluate("//div[@class='item_description']", 
            document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);



        for (var i = 0; i < alltitles.snapshotLength; i++) {



            var title = alltitles.snapshotItem(i);
            var div = alldiv.snapshotItem(i);
            // do stuff with elm

            startprocess(div,title);
        }
    
    
}


if (pathArray[1]=="title"){
    
    
            var div = document.evaluate ("//div[@class='infobar']", document, null,

            XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

            var title = document.evaluate ("//span[@class='itemprop']", document, null,

            XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

            startprocess(div,title);
    
}



if (pathArray[1]=="genre"){
  
            var allclasstitles = document.evaluate("//td[@class='title']", 
            document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);


          
    
             var alltitles = document.evaluate("//td[@class='title']//a[count(preceding-sibling::span)=1]", 
            document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

            for (var i = 0; i < alltitles.snapshotLength; i++) {

                    var title = alltitles.snapshotItem(i);
                    var div = allclasstitles.snapshotItem(i);
                    // do stuff with elm

                    startprocess(div,title);
                }

          
    
}


if (pathArray[1]=="search"){
  
            var allclasstitles = document.evaluate("//td[@class='title']", 
            document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);


          
    
             var alltitles = document.evaluate("//td[@class='title']//a[count(preceding-sibling::span)=1]", 
            document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

            for (var i = 0; i < alltitles.snapshotLength; i++) {

                    var title = alltitles.snapshotItem(i);
                    var div = allclasstitles.snapshotItem(i);
                    // do stuff with elm

                    startprocess(div,title);
                }

          
    
}


if (pathArray[1]=="chart"){

    
    var allclasstitles = document.evaluate("//td[@class='titleColumn']", 
            document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    
    

    var alltitles = document.evaluate("//td[@class='titleColumn']//a", 
		      document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

    for (var i = 0; i < alltitles.snapshotLength; i++) {

                    var title = alltitles.snapshotItem(i);
                    var div = allclasstitles.snapshotItem(i);
                    // do stuff with elm

                    startprocess(div,title);
                }

    

}

// Check For path Finishes Here



    
// All the credits for the following goes to r3b31 except few modifications..


function startprocess (div,title)   {

        if(div && title){

            title = title.cloneNode(true);

            var span = document.evaluate (".//a", title, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

            if(span)
            {
                title.removeChild(span);
            }

            var txt = title.innerHTML;


            txt = txt.replace(/\<br\>[\s\S]*/g, ""); //remove original title
            txt = txt.replace(/^\s+|\s+$/g, ''); //trim the title
            txt = txt.replace(/[\?#]!\"/g, ""); //remove bad chars
            txt = txt.replace(/:/g, ""); //: breaks at least TL




            var tab = div.insertBefore(document.createElement("table"), div.secondChild);
          // alert('in genre');
            tab.id = "gm_links";
            _addStyle("@namespace url(http://www.w3.org/1999/xhtml); #gm_links td { width:50px;  padding:0px; cellspacing:0px; cellpadding:0px; } #gm_links img { margin:0 1px 0 0 } #gm_links a { vertical-align:top; font-weight:bold };");

            var tr = tab.appendChild(document.createElement("tr"));




            //Youtube

            img = "data:text/html;charset=utf-8;base64,AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAAAQAAAAAAAAAAAAAAAAA"+
        "AAAAAAD///8AEiP//xIj//8SI///EyP//xIj//8SI///EiP//xIj//8SI///EyP//xIj//8SI///"+
        "EiP//xIj//////8AEiP//wAc7v8AHO7/AB3v/wAc7v8AHO7/ABzu/wAc7v8AHO7/ABzu/wAd7/8A"+
        "He//ABzu/wAc7/8AHe//EiP//xIj//8SI////////09V//+6uv////////////9PVf//z87/////"+
        "//+ysv//EiP//5ub////////0tH//xIj//8SI///EiP///////9PVf///////xIj////////T1X/"+
        "//////8SI////////5qZ////////EiP//xIj//8TI///EiP//xIj////////T1X///////8TI///"+
        "/////09V////////EiP///////+amf/////////////S0f//EiP//xIj//8SI////////09V////"+
        "////EiL///////9PVf////////////+6uv//EiP//7q6///v8P//0tH//xIj//8SI///EyP/////"+
        "//8SI///EiP//xIj//8SI///EiP///////8SI///EiP//xIj//8SI///EiP//xIj//8SI///EiP/"+
        "/////////////////xIj//8SI///EiP//xMj////////EiP//xIj//8SI///EiP//xIj//8SI///"+
        "EiP//9nZ//8SI///EiP//xMj//8SI///EiP//xIj//8SI///EiP//xIj//8SI///EiP//xIj//8S"+
        "I///EiL//9na////////////////////////////////////////////////////////////////"+
        "//////////////////////////////////+r5/b/AAAA//372P//////R5K5/wAAAP/IiWb/////"+
        "/26v1f8AAAD/rGZE////////////////////////////qub1/wAAAP/+/Nj/qub2/wAAAP//////"+
        "AAAA//782P8TcJ3//vzY/wAAAP///////////////////////////6rm9f8AAAD//vzY/6rm9v8A"+
        "AAD//////wAAAP/+/Nj/AAAA//////8AAAD///////////////////////////9ur9b/AAAA/+PF"+
        "ov//////R5K6/wAAAP/JiWb//////wAAAP//////AAAA////////////////////////////AAAA"+
        "//+p7/8AAAD/////////////////////////////////////////////////////////////////"+
        "bq7V/wxKf///////rGZE/+PFov//////////////////////////////////////////////////"+
        "////gAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"+
        "AAAAAAAAAAAAAA==";

            buildCell(tr, "YouTube","http://www.youtube.com/results?search_query="+txt+" trailer", img);

             //Subs4free

            img = "data:text/html;charset=utf-8;base64,AAABAAEAEBAAAAAAAABoBQAAFgAAACgAAAAQAAAAIAAAAAEACAAAAAAAAAEAAAAAAAAAAAAAAAEA"+
        "AAAAAAAAAAAARUW4AKysqwCYnJ8A6urqAJd5XACkjXYAzMzMAGVUQgDQxLkAalpKAJBzVQB6euAA"+
        "FxeXAE6MyAB9k6oAn7fQAEVFkAA4fcIARkaFAK/K5QCKclkAk5PkAISmyABRUbkAKiq9ADhnlQBC"+
        "i9UAKCiiAO/v7wCKkZgA4eH2AGFh3wCkpKQAamq1AMu9rwAhIZYAiWE4AEFBhQDe3u8AiYm4AGVM"+
        "MwAQENgAnIBlAK2ttQANDcAAlIJxAHh40QC4vcIATk6TAOzq5wBDg70AT0/sANvX0wBycuMAwayX"+
        "AF09HQAICOAAMTF7ADk50AB1UzEAYzsSALKy8wDIuKcARorLAC1wsgCns78AhISXAE5OjAA1f8oA"+
        "aj4SAA4OpgBaeZcAgYHzANjOxADf2NEAa5bBAE83HwBiPhsAw8PDAN/f5wB/rdsA8OvmAKaWhQCH"+
        "tOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"+
        "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"+
        "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"+
        "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"+
        "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"+
        "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"+
        "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"+
        "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"+
        "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"+
        "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"+
        "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"+
        "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"+
        "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"+
        "AAAdTwAAAAAAAAkLPCkCAAAADBMAFywAAAAVUzI3TQQAADYmABIeAAAAAAAAUk4iOxkqLUMzAwAA"+
        "AABLBUYuICQ+NBxQQEgQMAAjPStKAB8NT0kmABtBDkIAJQgAAAAAFjoYEQAzIQAAAD84LgYKAAAB"+
        "RzEARRpMDwcASisGNQAAJzlEABRUURAdAAAAAAAAAAAvKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"+
        "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP//AAD//wAA//8AAP8/AAAHJwAAAycAAOAH"+
        "AACAAQAACCEAADwnAAAGIAAAhiAAAP8/AAD//wAA//8AAP//AAA=";

            buildCell(tr, "Subs4free","http://subs4free.com/search_report.php?search="+txt+"&x=0&y=0&selLang=0&cat=0", img);

             //Podnapisi

            img = "data:text/html;charset=utf-8;base64,AAABAAEAEBAAAAEAGABoAwAAFgAAACgAAAAQAAAAIAAAAAEAGAAAAAAAAAAAAAAAAAAAAAAAAAAA"+
        "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"+
        "AADu7u4AAADu7u7u7u7u7u7u7u7u7u7u7u7u7u4AAADu7u4AAAAAAAAAAAAAAAAAAAAAAAAAAADu"+
        "7u7u7u7u7u7u7u7u7u7u7u7u7u4AAAAAAAAAAAAAAAAAAAAAAAAAAADu7u4AAADu7u7u7u7u7u7u"+
        "7u7u7u7u7u7u7u4AAADu7u4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"+
        "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAADu7u4AAADu7u7u7u7u7u7u7u7u7u7u7u7u7u4AAADu7u4A"+
        "AAAAAAAAAAAAAAAAAAAAAAAAAADu7u7u7u7u7u7u7u7u7u7u7u7u7u4AAAAAAAAAAAAAAAAAAAAA"+
        "AAAAAADu7u4AAADu7u7u7u7u7u7u7u7u7u7u7u7u7u4AAADu7u4AAAAAAAAAAAAAAAAAAAAAAAAA"+
        "AADu7u7u7u7u7u7u7u7u7u7u7u7u7u4AAAAAAAAAAAAAAAAAAAAAAAAAAADu7u4AAADu7u7u7u7u"+
        "7u7u7u7u7u7u7u7u7u4AAADu7u4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"+
        "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADu7u4AAADu7u7u7u7u7u7u7u7u7u7u7u7u7u4AAADu"+
        "7u4AAAAAAAAAAAAAAAAAAAAAAAAAAADu7u7u7u7u7u7u7u7u7u7u7u4AAAAAAAAAAAAAAAAAAAAA"+
        "AAAAAAAAAADu7u4AAADu7u7u7u7u7u7u7u7u7u7u7u4AAADu7u4AAAAAAAAAAAAAAAAAAAAAAAAA"+
        "AAAAAADu7u7u7u7u7u7u7u7u7u7u7u4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"+
        "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"+
        "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";

            buildCell(tr, "Podnapisi","http://www.podnapisi.net/ppodnapisi/search?tbsl=1&asdp=0&sK="+txt+"&sM=0&sJ=0&sY=&sAKA=1", img);

            //OpenSubtitles

            img = "data:text/html;charset=utf-8;base64,AAABAAEAEBAAAAEAGABoAwAAFgAAACgAAAAQAAAAIAAAAAEAGAAAAAAAAAAAAEgAAABIAAAAAAAA"+
        "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/"+
        "//////8AAAD///////8AAAD///////8AAAD///////8AAAD///////8AAAAAAAD///////8AAAD/"+
        "//////8AAAD///////8AAAD///////8AAAD///////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"+
        "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"+
        "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACqqqr///////+qqqoAAAAAAADMzMzu7u7///////9V"+
        "VVUAAAAAAAAAAAAAAAB3d3eZmZkAAAAAAACZmZmIiIgAAACIiIgAAAAAAABERETd3d0AAAAAAAAA"+
        "AAAAAADu7u4REREAAAAAAAARERHu7u4AAABERET////////d3d0zMzMAAAAAAAAAAAAAAADd3d0i"+
        "IiIAAAAAAAARERHd3d0AAADd3d1EREQAAAAAAAAAAAAAAAAAAAAAAAAAAAB3d3eZmZkAAAAAAACq"+
        "qqp3d3cAAADMzMxEREQAAAARERHd3d0AAAAAAAAAAAAAAAAAAACZmZn///////+qqqoAAAAAAAAi"+
        "IiLu7u7////////u7u4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"+
        "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"+
        "AAAAAAD///////8AAAD///////8AAAD///////8AAAD///////8AAAD///////8AAAAAAAD/////"+
        "//8AAAD///////8AAAD///////8AAAD///////8AAAD///////8AAAAAAAAAAAAAAAAAAAAAAAAA"+
        "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"+
        "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";

            buildCell(tr, "OpenSubtitles","http://www.opensubtitles.org/en/search/sublanguageid-all/moviename-"+txt, img);  

            //SubScene

            img = "data:text/html;charset=utf-8;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAACXBIWXMAAAsTAAALEwEAmpwYAAAA"+
        "BGdBTUEAALGOfPtRkwAAACBjSFJNAAB6JQAAgIMAAPn/AACA6QAAdTAAAOpgAAA6mAAAF2+SX8VG"+
        "AAADAFBMVEUNLgAlRxYWOwYPMAAOLgAQLwANKwAHKAAKLAALLQANLwAZOwoJKwAJKQArTAAIKAAN"+
        "KgAOMgFVdwDG/xcCIwAFJgBEeQECJAARMwAYOglZjAUpTBMKJwBDYQA/dAABIwAAIQKh0QAaOw89"+
        "YQAbPhABGwAsVgIKJADL/ykJKQAYPQgZPglJaAAFKgB4rQCg3AAPMAB0rgCh5wBYdwAvTAAROgEX"+
        "OAAcMgAFJQC17QCFwwDE/xxSiwAAJgNxrwBwogByogAzYgC0/wiu9wAYOhB9lgDE9ABijACYvwWT"+
        "1wA/dQArSR2DpAAOLQAXPAkHIwAZNQAHKwEJJwBwpQArSgBAWAALKgC06wBAag8YQQgAIwAJLQA5"+
        "WwAQRwwyWABZjgdCZhJYiQh5vwC5/wwrSgAeOwAZQQCErAAOLQAWNQcWOQvA/wF/uQAaPwa3/gCF"+
        "uABnmAB+oQA/XgiTzQANKwBQciIGJgAHJQANKwCLyQAsViwwUwAbNgBEbwCh3gAZOg6DqgBBbACj"+
        "4gBWiwAUQgEXPAcMKQAkSBEMIwAwShcdQQqn6gAQKwCLwgCf5QAmSQ4LLwBYewlHcQCJwABLZQDA"+
        "/wwaPQoPLwCYmJiZmZmampqbm5ucnJydnZ2enp6fn5+goKChoaGioqKjo6OkpKSlpaWmpqanp6eo"+
        "qKipqamqqqqrq6usrKytra2urq6vr6+wsLCxsbGysrKzs7O0tLS1tbW2tra3t7e4uLi5ubm6urq7"+
        "u7u8vLy9vb2+vr6/v7/AwMDBwcHCwsLDw8PExMTFxcXGxsbHx8fIyMjJycnKysrLy8vMzMzNzc3O"+
        "zs7Pz8/Q0NDR0dHS0tLT09PU1NTV1dXW1tbX19fY2NjZ2dna2trb29vc3Nzd3d3e3t7f39/g4ODh"+
        "4eHi4uLj4+Pk5OTl5eXm5ubn5+fo6Ojp6enq6urr6+vs7Ozt7e3u7u7v7+/w8PDx8fHy8vLz8/P0"+
        "9PT19fX29vb39/f4+Pj5+fn6+vr7+/v8/Pz9/f3+/v7////M/32SAAAA8UlEQVR42jTPQ3sDARQF"+
        "0DczMeqmZmrbZmobqW3bNu/9u13k6/bsjigAgPbH+9vzOCugiEqS7N/6jA+dDCdVSSFJmmdcN1de"+
        "JhJS56PpDiidK68XgRYScpS/47u6b3+abpg1kYSE7Rq8T5vnHL8/wxp5B1mcGCw6yZnKWH/oymrb"+
        "e28R60JFQnRuac2GIbLDdu2OFdjHt4OjNv3LenuqDytfQgT6oKqS5ONWv6batcZugYBiPvu+jMhM"+
        "Ku4LsBAC6o15y8/ZMfWFRo2EgGT66MBbWuII+Q8sd87rPugBT872VSAkSVUUAEhdGhsCAED5GwDK"+
        "R14PRSW3MQAAAABJRU5ErkJggg==";

            buildCell(tr, "SubScene","http://subscene.com/filmsearch.aspx?q="+txt, img);

             //fenopy

             img = "data:text/html;charset=utf-8;base64,AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAAAQAAAAAAAAAAAAAAAAA"+
        "AAAAAAD///8A3N3fIVZYY6oPESLzBggZ/TQ3Rc6srLJT/Pz8AP///wD///8A////AP///wD///8A"+
        "////AP///wD///8Ay8zQMiEjNuM+QFDGqaqxV8HCyD+TlJ1rJSc63p2epmP8/PwA////AP///wD/"+
        "//8A////AP///wD///8A////AERGWcJCRFbCubvITUFHaNcyOFvoSlBxzpqcrG4rLkLcqauzV///"+
        "/wD///8A////AP///wD///8A////AP///wAOEiz8qKqzWVtggbohKFL/IShS/yEoUv8uNF3wj5Gj"+
        "eSksQ967vMRF/Pz8AP///wD///8A////AP///wD///8AFxs39aeptFpdYoW5IypY/yMqWP8jKlj/"+
        "IypY/zA2Y+6EiJ6GKCtG48XGzjr///8A////AP///wD///8A////AHJ0iJRHS2XCpam/ZycvYvok"+
        "K17/JCte/yQrXv8kK17/N0Bw54qNon4tMk/e09TaLf///wD///8A////AP///wDt7fAPUFRvu2Nn"+
        "f6eMkbGHJi5m/SYuZf8mLmX/Ji5l/yYuZf8+RXjieX2WkjU5WNnZ2t8m////AP///wD///8A////"+
        "AOnq7RRHTGrIcHOMm4+TtIMqM3L8KTJx/ykycf8pMnH/KTJx/0NMht5xdZafQUZnzeDh5h////8A"+
        "////AP///wD///8A4eHmH0RJa85+gpuM09XmM46Uwo2BiLebgYi4m7e82ledosp5oabKdIGEnIpJ"+
        "TnDG6uruFP///wD///8A////AP///wDa2+ImOT9m25SXrXXAw9tLgIe3m4OKupfJzeZDlpzIg4KI"+
        "uZnM0OY8c3iTmFdcfbrt7vEP////AP///wD///8A////ANXW3y01PGfin6K3a5WczofKzuhDhY3J"+
        "noCIw6G3vOBahY3EjsfJ3TdbYIK4eX2alP///wD///8A////AP///wD///8AycvXOjI5aeexs8VX"+
        "0tXsOMLG6E2aoM9/qq/VZ8HF5UzGyOA+tLbIUyYtYPX///8A////AP///wD///8A////APz8/ADB"+
        "w9JFNj5v5bi7zE3///8A////AP///wD///8A////AK6xxVwjK2L8////AP///wD///8A////AP//"+
        "/wD///8A////ALK1yFc6QnbjycvZPPz8/AD///8A////AOvr8RRNVIPNV16Jwv///wD///8A////"+
        "AP///wD///8A////AP///wD8/PwAqKzEYzdAeOiPlLSCxMfXRKWqw2dIUIPVPUV749HT4DL///8A"+
        "////AP///wD///8A////AP///wD///8A////APz8/AC3us9TUFiMzikzc/0xOnjzbXOfquHi6yH/"+
        "//8Aw/8AAJ3/AAAi/wAAQX8AAEA/AAAgXwAAgA8AAMAHAADkcwAA9kkAAPqUAAD9/gAA/v4AAP98"+
        "AAD/mQAA/8MAAA==";
             buildCell(tr, "Fenopy","http://fenopy.com/?keyword="+txt, img);


            //btscene

            img = "data:text/html;charset=utf-8;base64,AAABAAEAEBAAAAEAGABoAwAAFgAAACgAAAAQAAAAIAAAAAEAGAAAAAAAAAAAAEgAAABIAAAAAAAA"+
        "AAAAAABCQkKenp5jY2M7OztHR0fr6+v5+fn8/Pz9/f2jo6MhISEiIiIgICAhISEiIiIfHx8JCQk4"+
        "ODienp6pqalZWVmVlZX6+vr8/Pz7+/vNzc0aGhoODg4SEhIFBQUEBAQHBwcODg4MDAyQkJCmpqad"+
        "nZ14eHj19fX8/Pz7+/vq6upPT09BQUFKSkoICAgDAwMEBARwcHAjIyM8PDzGxsbGxsbo6Oj7+/v8"+
        "/Pz8/Pz6+vrq6urs7Oze3t4aGhoFBQUDAwP39/fCwsItLS09PT3u7u729vb8/Pz6+vr7+/v4+Pj5"+
        "+fn5+fnv7+8uLi4CAgICAgJ0dHQnJydsbGx3d3fX19f7+/v5+fn6+vr6+vr5+fn+/v7////39/dD"+
        "Q0MEBAQCAgJdXV2dnZ3Dw8OcnJzJycnX19fj4+Px8fH4+Pj4+Pj6+vr5+fn5+fl6enoGBgYCAgJI"+
        "SEhEREQlJSUUFBS1tbXp6enb29vPz8/V1dXw8PD7+/vt7e35+fmjo6MGBgYCAgIEBAQFBQUGBgY8"+
        "PDz19fX7+/v9/f36+vrp6enR0dHPz89BQUGdnZ1BQUEDAwMCAgICAgICAgIEBARgYGD8/Pz9/f3+"+
        "/v7+/v77+/v09PS3t7cMDAwdHR0TExMDAwMCAgICAgICAgIEBASVlZX6+vr9/f3+/v7+/v79/f36"+
        "+vrx8fFeXl43NzcTExMFBQUCAgICAgICAgIFBQWvr6/6+vr9/f3+/v7+/v7+/v78/Pz9/f3w8PCo"+
        "qKgLCwsDAwMCAgICAgICAgIEBASNjY38/Pz9/f38/Pz+/v78/Pz+/v7////9/f2Xl5cFBQUFBQUC"+
        "AgIEBAQEBAQGBgY8PDzt7e39/f39/f39/f39/f39/f36+vr29vZnZ2cHBwcEBAQEBAQCAgICAgID"+
        "AwMKCgqgoKD39/f7+/v8/Pz8/Pz8/Pz8/Pyrq6sTExMDAwMEBAQCAgIHBwcHBwcJCQkICAgxMTHc"+
        "3Nz6+vr7+/v7+/v7+/v7+/vS0tIfHx8ICAgGBgYHBwcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"+
        "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";

            buildCell(tr, "Btscene","http://www.btscene.eu/verified-search/torrent/"+txt+"/", img);

          //1337x

          img = "data:text/html;charset=utf-8;base64,AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAAAQAAAAAAAAAAAAAAAAA"+
        "AAAAAAD+/v4M0dHRSr+/v2vGxsZk/v7+Jf7+/gr+/v4A////AP7+/gD+/v4M/Pz8KMHBwWu+vr5x"+
        "wsLCXvz8/BT+/v4B8vLyIg9Ia/MAdb//AHC3/3eEi6/+/v4r/v7+B////wD+/v4J/v7+LnSGkLMA"+
        "crv/AHW//wBVi//R0dFG/v7+A/7+/hSLjY6XAHfD/wCc//8AcLf/pqamk/7+/iH+/v4K/v7+Iaam"+
        "ppMAcrv/AJz//wCP6/9rfYe1/v7+Hv7+/gH+/v4J/v7+MG9+iL0Ajef/AJz//xlikfLc3Nxk/v7+"+
        "K9zc3GQZX4zzAJz//wCZ+/8gTWnr7OzsTP7+/g/+/v4A/v7+AP7+/g/w8PBKJExk6QCZ+/8Amfv/"+
        "OFds4/f393s4V2zjAJn7/wCc//8WZZbz3NzcZ/7+/hj+/v4B////AP///wD+/v4B/v7+Fdvb22QZ"+
        "X4zyAJz//wCI3/8zRE/yAIbb/wCc//8AcLf/l5mbm/7+/iP+/v4F////AP///wD///8A////AP7+"+
        "/gP+/v4hsrKyjQBoq/8AnP//AJLv/wCc//8AiuP/d4OLuv7+/jD+/v4H/v7+AP///wD///8A////"+
        "AP///wD///8A/v7+Cv7+/j57gofKAIjf/wCc//8Amfv/OFhs6vT09Fn+/v4S/v7+AP///wD///8A"+
        "////AP///wD///8A/v7+AP7+/g/09PRPMVRp6QCZ+/8AnP//AJz//x1UePPk5ORn/v7+Ff7+/gH/"+
        "//8A////AP///wD///8A/v7+AP7+/gn+/v4wfYuTuhyV4/8LoP//A3jD/wCZ+/8AlPP/SWN11vz8"+
        "/Dz+/v4M/v7+AP///wD///8A////AP7+/gX+/v4jlJaYoDCJwf9Ctv//OaHj/3uEitc0bJD2P7X/"+
        "/zee3v96hIq2/v7+L/7+/gf+/v4A////AP7+/gP+/v4Z1tbWazV4ofZCtv//QbP8/z9dcOX4+Phg"+
        "s7Ozli2AtP9Ctv//L4a8/5ibnJv+/v4j/v7+Bf///wD+/v4M6OjoTDBWbe5Ctv//Qrb//zhymPPc"+
        "3Nxk/v7+Hv7+/jB6g4q2OqTn/0K2//84eaHz1tbWZf7+/hT+/v4A/v7+FWp9iLY9rPL/Qrb//zCJ"+
        "wf+np6eS/v7+If7+/gb+/v4O9PT0RD9dcONBs/z/Qrb//zBVber09PQo/v7+A/Hx8R9IZ3rPN2eF"+
        "6jdnhOuKl6Ch/v7+Kv7+/gf///8A/v7+Af7+/hXc3NxWSm2D1zZmhOpAaoXez8/PQv7+/gP+/v4J"+
        "/v7+Gf7+/iv+/v4r/v7+Gv7+/gr+/v4A////AP///wD+/v4D/v7+D/7+/iX+/v4r/v7+H/7+/gz+"+
        "/v4A//8AAIfDAACDgwAAw4cAAOEPAADwDwAA8B8AAPg/AAD4PwAA8B8AAOAPAADhBwAAw4cAAIPD"+
        "AACH4wAA//8AAA0KMA0KDQo=";

          buildCell(tr, "1337x","http://1337x.org/search/"+txt+"/0/", img);

             //extratorrent

            img = "data:text/html;charset=utf-8;base64,AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAQAQAAAAAAAAAAAAAAAAA"+
        "AAAAAADIvb7/xry9/8e8vf/Ivb7/yL2+/8i9vv/Ivb7/yL2+/8i9vv/Ivb7/yL2+/8i9vv/Ivb7/"+
        "x7y9/8a8vf/Ivb7/xry9//7+/v/+/v7//v7+//7+/v/+/v7//v7+//7+/v/+/v7//v7+//7+/v/+"+
        "/v7//v7+//7+/v/+/v7/xry9/8e8vf/8/Pz//Pz8/5OTkv9qSRj/akkY/2tKGf9rShn/a0oZ/2tK"+
        "GP9qSRj/Tzoc/4iEff/8/Pz//Pz8/8e8vf/HvL3/+/v7//v7+/+Hf3P/4bd0/+G3dP/ht3T/4bd0"+
        "/+G3dP/ht3T/4bd0/3hgOv9xbmr/+/v7//v7+//HvL3/x7y9//f4+P/3+Pj/hHxx/+zAfP/swHz/"+
        "7MB8/3xzaP9yal3/cmpd/3JqXf98c2b/xcPB//f4+P/3+Pj/x7y9/8e8vf/29vb/9vb2/4V9cf/t"+
        "xYX/7cWF/2RSNv/Nz8//zs/R/87P0P/Mzs7/29va//f39//29vb/9vb2/8e8vf/HvL3/8/Pz//Pz"+
        "8/+IgHP/78yU/+/MlP94YDr/8vLy//Ly8v/y8vL/8vLy//Ly8v/09PT/8/T0//Lz8//HvL3/x7y9"+
        "//Ly8v/y8vL/h4F5/+/Pnf/vz53/kHdP/3hgOv94YDr/eWE7/3hgOv9USDf/5eLd//Ly8v/y8vL/"+
        "x7y9/8e8vf/w8PD/8PDw/4eBef/t0Kf/7dCn/+3Qp//t0Kf/7dCn/+3Qp//t0Kf/VEg3/9vb2v/w"+
        "7+//8PDw/8e8vf/HvL3/7u3u/+7t7v+Gg33/7dm8/+3ZvP/Txa7/cW5r/3Fua/9xbmv/d3Rv/62r"+
        "qf/o5+f/7u3u/+7t7v/HvL3/x7y9/+vr6//r6+v/h4F4/+/l0P/v5dD/XFVM/8XHx//Fx8f/xcfH"+
        "/8TGxv/r7Ov/6+vr/+vr6//r6+v/x7y9/8e8vf/p6un/6erp/4eAeP/58+b/+fPm/4iEff93dG7/"+
        "fXl0/356df99eXT/bGlj/5OTkf/p6un/6erp/8e8vf/HvL3/6Ofn/+fn5/+GgHj/5uPd/+bj3f/m"+
        "493/5uPd/+bj3f/m493/5uPd/3Z2df9vb2//6Ofn/+fn5//HvL3/x7y9/+fn5//n5+f/raqo/3Z2"+
        "df94eHj/d3d2/3h4ef95eXn/eHh4/3h4eP94eHj/ramo/+fn5//n5+f/x7y9/8a8vf/l5eX/5eXl"+
        "/+Xl5f/l5eX/5eXl/+Xl5f/l5eX/5eXl/+Xl5f/l5eX/5eXl/+Xl5f/l5eX/5eXl/8a8vf/Ivb7/"+
        "xry9/8e8vf/Ivb7/yL2+/8i9vv/Ivb7/yL2+/8i9vv/Ivb7/yL2+/8i9vv/Ivb7/x7y9/8a8vf/I"+
        "vb7/AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA"+
        "//8AAP//AAD//w==";

            buildCell(tr, "ExtraTorrent","http://extratorrent.cc/search/?search="+txt+"&new=1&x=0&y=0", img);

             //PirateBay

            img = "data:text/html;charset=utf-8;base64,Qk04AwAAAAAAADYAAAAoAAAAEAAAABAAAAABABgAAAAAAAAAAADgTAAA4EwAAAAAAAAAAAAA////"+
        "/////////////////////////////////////////////////v7+/////////////Pz8vb297Ozs"+
        "////////////////////////////////4uLiSUlJ3d3d////////8/PzEhIScnJy8fHx////////"+
        "////////////8fHxwsLCWFhYAAAAyMjI////////5+fnEBAQICAgQkJCV1dXZWVli4uLiYmJUlJS"+
        "KioqPT09bm5uHh4eYWFhwcHBubm5bGxsQEBAp6end3d3FBQUAAAAFBQUOTk5ISEhGRkZPT09WVlZ"+
        "QkJCKioqJycnenp6AAAAQUFBPz8/YGBgjo6O0dHR+/v7////////7+/vxcXFnZ2dg4ODExMTQEBA"+
        "v7+/AAAAgoKCjo6OpaWltra2qqqqpqampaWlpKSkra2tr6+vsbGx5eXll5eXW1tb1NTUcXFxmJiY"+
        "AwMDAAAANzc3VFRUGxsbAAAAX19fPDw8ERERAAAAQUFB/v7+/Pz8////////nJycAAAAAAAAAAAA"+
        "Hx8fCwsLAAAAJiYmBQUFAAAAAAAAKysr+vr6////////////nJycAAAAAAAADw8PAAAAAAAAAAAA"+
        "AAAADQ0NAwMDAAAANjY2+vr6////////////rq6uAAAANjY25eXlWVlZHx8fJycnIyMj0dHRhoaG"+
        "AAAAV1dX////////////////r6+vAAAALS0t0tLSX19fsrKy2dnZZWVlsrKyiIiIAAAAWVlZ////"+
        "////////////r6+vAAAAAAAABQUFAgICExMTEBAQAwMDAwMDAQEBAAAAWlpa////////////////"+
        "q6urAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAVFRU////////////////19fXSUlJQUFB"+
        "Q0NDQ0NDQ0NDQ0NDQ0NDQ0NDQkJCQkJCqKio/////////////////////////v7+/v7+/v7+/v7+"+
        "/v7+/v7+/v7+/v7+/v7+////////////AAA=";

            buildCell(tr, "PirateBay","http://thepiratebay.se/search/"+txt+"/0/99/200", img);

             //Torrentzap

            img = "data:text/html;charset=utf-8;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAABGdBTUEAAK/INwWK6QAAABl0RVh0"+
        "U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAECSURBVHjaYpwxYwYDSQCo4f///7MW7Hr0"+
        "5PV/QgComAWo5/HTN0Cyd/ImiBHHTt20MlNHNrSpKoKPjwvCBmmQlRZJjXeFS2uY5AK52pqyWF3E"+
        "hCkE1I/HCyyYQkAX/vkjdvseAycHiPv9B4ghI4VbA9C57z6yv/vI8P07iHvpKoOQIENaPG4Nnz59"+
        "ExN+DPHDk2cMJ84y5Ifh9QMyWLKKITaMgZOTOA3bdjPoaTOoKuENJaB7IAyg04H+9nIlIlg9XAxF"+
        "hUXWbGYI9iUiWIFBNKEjaeJMkEuAAQq0BAKAvne0wRFKwNAEOh2iCA6EBXEHKzBMIIbhjOmZM2cS"+
        "n7oBAgwAzApyBonlsY8AAAAASUVORK5CYII=";

            buildCell(tr, "Torrentzap","http://www.torrentzap.com/clean-search-results1/"+txt+"/popular/4", img);

        //yify

            img = "data:text/html;charset=utf-8;base64,AAABAAEAEBAAAAAAAABoBQAAFgAAACgAAAAQAAAAIAAAAAEACAAAAAAAAAEAAAAAAAAAAAAAAAEA"+
        "AAAAAAAAvwAAHjMdABpTFgAeKxsAAMUAAAqdDQAhKxsAAMsAABZfFgAFtQQAHjQbACQfHAALmAsA"+
        "EX8PAA2UDgAjHh8AICEfACAlHAAWZRYAAbACAAOwAgAQdhAAAagAABhdFAAcHx0ACqgIABw1GQAW"+
        "YBQAHh8dAB4xHAAYYBQAA8sBABo7GQAfHiAAIR4gACMeIAAWbBQAEYkNABwgGwACtgMAIyAbAAqr"+
        "CQASXBAAE1QWACEfHgAMmQoAAMAAABlRFgAExwUACqAHACMfHgAHnwoAJB8eABdQGQAhIh4ADYkO"+
        "ACAoHgADwgMACaUKABRzEgAHrAcAAMwAAAPXAgAfIBwAHR8fABw5GAAhIBwAHjEeAB8fHwAXURcA"+
        "IR8fAB4mHAAZWxQAB5cJABCJDwAVcBMAHEEbAAK6AgAfIx0AEIAQAAmcDAAVWBUAEHERAAyKDQAf"+
        "KR0AAr8FAASxAwAEtQAAFV4VABN3EQALlwoAFmEVACEhGwAdIB4AEowQAB8gHgAGuQYAE3ESAB8s"+
        "HgAdMxsAALsBACAdHwACvgEAIiAfAA6IDAAPhA8AJCAfAAydCwAVahYABMQBAAK1AgAHqggAGkkY"+
        "AAqmCwAgHh0AB7EFAAO4AgAiHh0ACpsJACAhHQAWZRQAICAgACIgIAADvQUAGVUYAAerBgAgKh0A"+
        "CJkHACAfGwAcHh4AG0YZABJ0FAAdMB0AALwAAB4eHgAgHh4AAAAAAAAAAAAAAAAAAAAAAAAAAAAA"+
        "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"+
        "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"+
        "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"+
        "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"+
        "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"+
        "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"+
        "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"+
        "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"+
        "AAAARIcjJk4kfTlte2sXZ4csREY/LFgJPToNYTtpKTwvQDIhC4MuM3BGcoZ5XYYIUAJqcluFXiwi"+
        "VEwdgDJGHIRKQzhudkYmPyA+BV+HMix1BlFSTQEjRF9nMHtjRF9GhmVib2gmRBAyHHEfKkJlX0JG"+
        "clYeRFwyRl8lB1pdEEZ1RkQTRV8PLECGLQRVGodGRCxGFDVCh19EEWBmABk2h3IcXzEbh3ksNCsA"+
        "J3N0FRgiLEYSWXccQmUOFgxBV2RILCIsR1N+LHlfN0l4LEt/T4ZfXyx8bEYsQnIoRiGBHCwscjRE"+
        "dUWCRCwsRj9yMiEsh3qGX3oyCgMsRkBfEA8sX19dXwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"+
        "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=";

            buildCell(tr, "yify","https://yts.re/browse-movie/"+txt+"/All/All/0/latest", img);  

             //KickAss

            img = "data:text/html;charset=utf-8;base64,AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAAAAAABMLAAATCwAAAAAA"+
        "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHUFLcyFLV74bO0UuAAAAAAAAAAAAAAAA"+
        "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAeQEthLmNy+DVzhf81c4X/NXOF/ydUYdsc"+
        "PEUdAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkTFeuN3WG/zh2iP84doj/OHaI/zh2"+
        "iP84doj/M2t7/B9BS1IAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlS1ecPHmM/zx5jP88eYz/WIyc"+
        "/3OfrP9BfI//PHmM/zx5jP83b4D9IEFLPgAAAAAAAAAAAAAAAAAAAAAiQ0wzPXiJ/kB9j/9AfY//"+
        "XZGg//b5+v//////4uvu/2iZp/9AfY//QH2P/zNkcu4AAAAAAAAAAAAAAAAAAAAAMl1q2UWBlP9F"+
        "gZT/RYGU/73T2f///////f7+//L29//p8PL/RYGU/0WBlP9FgZT/KUxXgAAAAAAAAAAAJ0ZPHUeB"+
        "k/9Khpj/SoaY/0qGmP/b5+r//////7vR2P9Khpj/bp6t/0qGmP9Khpj/SoaY/zlndOcAAAAAAAAA"+
        "AC9SXIBPi53/T4ud/0+Lnf9Pi53/0eHm///////F2d//T4ud/0+Lnf9Pi53/T4ud/0+Lnf9Mhpf/"+
        "KEZPEgAAAAA4YGu+VJCh/1SQof9UkKH/VJCh/8HX3f//////6/L0/1SQof9UkKH/VJCh/1SQof9U"+
        "kKH/VJCh/y9QWVwAAAAAQGp31lmUpv9ZlKb/aZ6u/5u/yv/W5en////////////C2N//3urt/3Sm"+
        "tf9ZlKb/WZSm/1mUpv81WWOIAAAAAENseNRemar/Xpmq/3Wntv//////////////////////////"+
        "//////+VvMf/Xpmq/16Zqv9emar/OFtlhAAAAABCaHS+Y52v/2Odr/9nn7H/iLTC/4Kxv//0+Pn/"+
        "/////6zL1f9jna//Y52v/2Odr/9jna//Y52v/zdXYVwAAAAAPF5od2ehsv9nobL/Z6Gy/2ehsv9n"+
        "obL/xtzi///////f6+//Z6Gy/2ehsv9nobL/Z6Gy/2Wdrv80UVoSAAAAADZTXBJkmqr+a6W2/2ul"+
        "tv9rpbb/a6W2/2ultv9rpbb/a6W2/2ultv9rpbb/a6W2/2ultv9SfovlAAAAAAAAAAAAAAAAS3J9"+
        "xG+ouf9vqLn/XIuZ9GGTovpvqLn/b6i5/2+ouf9gkqD5Zpqp/W+ouf9vqLn/QWJsdwAAAAAAAAAA"+
        "AAAAADtZYhdbipfxQWJrbgAAAAAAAAAAR2t2p2CRn/dBYmtuAAAAAAAAAABGanSgVH6L3wAAAAAA"+
        "AAAA/j8AAPgPAADwBwAA4AMAAMADAADAAQAAgAEAAIAAAACAAAAAgAAAAIAAAACAAAAAgAAAAIAB"+
        "AADAAQAAxjMAAA==";

            buildCell(tr, "KickAss","https://kickass.so/usearch/"+txt+"%20category:movies/", img);

             //isoHunt

            img = "data:text/html;charset=utf-8;base64,AAABAAEAEBAAAAEAGABoAwAAFgAAACgAAAAQAAAAIAAAAAEAGAAAAAAAQAMAAAAAAAAAAAAAAAAA"+
        "AAAAAAAAAAAAAAAAAAAAAAD39vX28e/5+fUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"+
        "AAAAAAAAAACkim2EWjTazb0AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACk"+
        "imdmMwDBq5oAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADQv6qymH4AAACulH1mMwCpi3EA"+
        "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD08O16UCaAXDPs5N/Mu6xmMwCgfl8AAAAAAAAAAAAA"+
        "AAAAAAAAAAAAAAAAAAAAAAD7+viadFNzRRPl3tjn39dyRBaJYz4AAAAAAAAAAAC7qJaQbUvfzsYA"+
        "AAAAAAAAAAAAAAC1m4ZmMwDGs57p4tqFXjh9VCXo4dgAAAAAAADZyrx1SByMbEUAAAAAAAAAAAAA"+
        "AADJvKtsPQujh2n7+/qUd1dmMwB1Rxl3SRx3SRx1RxlmNAGKZj/l2NMAAAAAAAAAAADk1c5wQBGN"+
        "Z0H18O2niGNmMwBtPA52SRx2SRx2SRxtPQxoNQPl2tQAAAAAAAAAAADz8eyHXz9xQxXt6OTMvrNp"+
        "NwW1mYQAAAAAAAAAAACxloNmMwC6p40AAAAAAAAAAAAAAACjgGJsOgrTx7Xs49uFXjeXdlXv6uMA"+
        "AAAAAADXzb9sPAujgWYAAAAAAAAAAAAAAAC/rZlmNAG4n4gAAAAAAAAAAAAAAAAAAAAAAADn39d3"+
        "TCGDWS7PwbQAAAAAAAAAAADx7ei6pI7Yyr0AAAAAAAAAAAAAAAAAAAAAAAAAAACJZD9rOgrIs54A"+
        "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADGsZxmMwCkjnAAAAAAAAAAAAAA"+
        "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADSwLdtPQqDWjL08vAAAAAAAAAAAAAAAAAAAAAA"+
        "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAADy7uju6eQAAADx/wAA8f8AAPH/AACR/wAAAf8AAAHHAACA"+
        "xwAAgAMAAIADAACA4wAAwGMAAMfhAADH8QAA//EAAP/wAAD/+QAA";

            buildCell(tr, "isoHunt","http://isohunt.to/torrents/?iht=5&ihq="+txt, img);

                //RARBG

            img = "data:text/html;charset=utf-8;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAflJREFU"+
        "OI2F0z9oXEcQx/HPCSWY22DcvFe4CK9KoYOQIhZxE1/j5lQLUpig2lIVIhchsY1xZadIYR8uXKhX"+
        "fZUhnFOeXAVOhBDCI+XbJjHsEozRpjid/OdsMrDMsMN+5/eDnV4ppYePcQ0f4cRq/IWf8cdKp5Ry"+
        "uZTypPx//FNK+aGU8kEppbc86/gCn0/nnfFBS3hzQB9VFWwNq/PDQX0HF/Dtsr++LFKijVk/k9Nb"+
        "Mtvs6VG0v8P2sL6Ox/jtDUBAPyzypUFl60oFJkfR8XGUMJm2RsP6XODLFQCE/iI3DcPNGk42mnpt"+
        "bzwjZRmpI9QurlhYqng7ck76MqgCoQZ/vhOwpMQumc46Kee16VEnp6SLjIaVwHP88h5AInEUo8On"+
        "x2dXsD3asLM1gAdoVwApZ/PjVkpZXfc1/WDexoWo0F8+fo6D10eunXlNSdu2Yuxc2qhNDnZsDRsx"+
        "dmJs7d4/hPP4CR+uABZaMykuPgXu7Y8MmiClbDqZ2r19CCPcfAcgyynKOUsL4y9DCP8+uLcjnMLH"+
        "40MPDybwHb7G+hkgZcSO1Mk5w9+4uzloXtza35bzord3Y2wyncEdfNUrpVzF3a5Lm23bymjqStPU"+
        "v+Iz/IhvZvM5iYwqBINB8zu+752u86e47tU6n2CMmcU+3cAneHlq+wUe4dl/EuoEoSZWymEAAAAA"+
        "SUVORK5CYII=";

            buildCell(tr, "RARBG","http://rarbg.com/torrents.php?search="+txt+"&category%5B%5D=14&category%5B%5D=48&category%5B%5D=17&category%5B%5D=44&category%5B%5D=45&category%5B%5D=47&category%5B%5D=42&category%5B%5D=46&category%5B%5D=18&category%5B%5D=41", img);

              //H33t

            img = "data:text/html;charset=utf-8;base64,AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAAAAAAAAAAAAAAAAAAAAA"+
        "AAAAAAAAAAAAD0MuAAsfKAAHBAQACQAAAAkkMgAJIi0ABwcHAAgGBgAJM0YACDlPAAkOEgAJIC8A"+
        "BzRRAAoxOwAAAAAADDYpAAJ32AAFGSkAAgIEAARHZAADt/UABWeQAAEAAAADQFkAA77/AAK8/wAE"+
        "dKwABFeMAAGq/wABiv0ACzU1AAIkRQAEaqsABQQFAAWBugACwP8AAcj/AASEsgAEAAAAAo6+AAKt"+
        "6QAEoeAAAbP/AAOJ0AABoP4AAZ7/AAovUgACJz8ABHS3AAQ4UQABvv8AAbj9AAS69gAEvvIABh0m"+
        "AAKUwgACqd8AB1t9AAO9/wABsv8AAqL5AARemwAMHCsAAiI2AAOf9wAGeLEAAbX8AAOk3QAFkLoA"+
        "Adr/AASYvwADlb4AAs//AAdkhwAGRGEAA6HoAAKy/wAEb7UACQQDAAIgMwABpf8AArL/AAC4/wAD"+
        "ot0ABjdHAAO+7AAB2v8AA8b9AADE/wACwv8ABlR0AAYaJQAGidAAA5z8AAkcKwADITUABZvzAACr"+
        "/gAAtP8AA8H/AAc0RgAGHSUABp7EAALM/wAAyv8AAL3/AALA/wAFXYkABhckAAKX9wAKKUIAAyQ6"+
        "AAWF1AAFkNkAAbj/AAC6/wAFq+QAByYzAAUAAAAEN0cABXmfAAK8/wAAtf8AAq7/AAUrRAAEZ64A"+
        "CShBAAIhNwADlvAABk14AAWW2wABuv8AAb3/AASx7wAHXoAABzBBAAYnNwAFPFYAA6n2AACx/wAF"+
        "VokABTJaAAgUHgACHjQAAZ7/AAV3vAAHIjUABHiuAAK1/wACuf8AAr7/AASAtQAGWoAABjRLAAZL"+
        "cwABsP8ABFuXAAMAAAAIBgUABR83AAGS/wACov8AA4PPAAUhNQAHOlUABJ3lAAGy/wACs/8ABl+P"+
        "AAZxrQAFGSoABpLwAAYoQQAAAAAABwcHAAQUJQADivsAAZP/AAKi/wADmPQABREdAAUVIAAGgcYA"+
        "ArD/AANppwAEZ6kABTdbAAQoRQAFFigAAAgPAAcGBQABAAAAB0aCAASN/wAFaLYAApr9AARWkQAD"+
        "AAAABBAcAASS7QACZKgABWu7AANGegACAAAABVusAAIPHgAIBQIAAAABAAMAAAAFX7MABFCVAAUk"+
        "QQAEVpgAAQEBAAEAAAAEUJAABUZ7AAWD7wACQXkAAQkRAASD/wAEOHQACAEDAA4nBwAAAAAABBIl"+
        "AAZHjQABAAAAAwgOAAECAQAAAAAABRQmAAc7bwADh/wABB45AAEECAAFbeIAAFzlAA8wHgAAAAAA"+
        "DCoEAAMBBAAGCA4AAwICAAIBAAACAgIAAgICAAQAAAAGEiAABhgtAAUEBQAEAgIABw4hABE/JQAA"+
        "AAAAgAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"+
        "AAAAAAAAgAEAAA==";

            buildCell(tr, "H33t","http://h33t.to/search/"+txt, img);

            //Demonoid

            img = "data:text/html;charset=utf-8;base64,AAABAAEAEBAAAAEAGABoAwAAFgAAACgAAAAQAAAAIAAAAAEAGAAAAAAAAAAAAAAAAAAAAAAAAAAA"+
        "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"+
        "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"+
        "AAAAAAACGBUDJB4EJB4DFBEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAALiYBTUAPTkIi"+
        "WU8WT0QAPjIASjsDOS8AAAAAAAAAAAAAAAAAAAAAAAAAAAAzRUKnp6eIhITDwMDy7/CkoqKmo6PY"+
        "0tJUWlhEZF4AAAAAAAAAAAAAAAAAAABJSUqSkJHg4OCsrK26u7rv8PDAwcCztLTo6OikpaS+vb1Y"+
        "WFgAAAAAAAAAAAAAAAB+eHmjoqLT09OwsLDAwMDu7u7LzMzl5eXS09O4uLivr66mnp8AEAwAAAAA"+
        "AAAXloIIcF0hQDtyZmjp5eX08vKNjo739vb7+vq5ubjIw8V/ensIWksbo44BBwUAAAASaF0epI8h"+
        "p5Mam4s0g3pslJBNXlydpaWZpqRKb2oWZFgWk30dmoUYhnoAAAAAAAAAAAAHKSIlsJ0tuag0yLg4"+
        "0sI/3MwvuKk10L4yxbIrtaEioYwWeWMAAAAAAAAAAAAAAAAMRjglq5gxwLExraBD18tH3M46s6dA"+
        "08I3x7UpoZArtaQem4IAAAAAAAAAAAAAAAASX1IuwbI0yrspkYZF2s1K3dBK3c9C1cU70L4klIMy"+
        "xbYqu6sHKSIAAAAAAAAAAAAZd24y0MMikn8RRUAtkohD0cJE1cYyp5oXU0wLRTghooguyLwTYFgA"+
        "AAAAAAAAAAAXbWYOQTwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAATX1QjtKYAAAAAAAAAAAAA"+
        "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACEBIAAAAAAAAAAAAAAAAAAAAAAAAA"+
        "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD//wAA//8AAPw/AADwDwAA4AcAAMADAADA"+
        "AQAAgAAAAIABAADAAwAAwAMAAMABAADAAQAAz/kAAP/9AAD//wAA";

            buildCell(tr, "Demonoid","http://www.demonoid.ph/files/?category=1&subcategory=0&&language=0&quality=0&seeded=2&external=2&query="+txt+"&uid=0&sort=", img);

             //MyTog

            img = "data:text/html;charset=utf-8;base64,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";

            buildCell(tr, "GreekTeam","http://greek-team.cc/browse.php?incldead=0&search="+txt+"&blah=0", img);

            //Torrentleech

            var img

            img = "data:text/html;charset=utf-8;base64,AAABAAEAEBAAAAEAGABoAwAAFgAAACgAAAAQAAAAIAAAAAEAGAAAAAAAAAAAAAAAAAAAAAAAAAAA"+
        "AAAAAAD+/v77+/vs7OzOzs6mpqaGhoZ7e3uMjIyqqqq5ubmsrKyVlZWWlpazs7Pd3d319fX+/v73"+
        "9/fa2tpFRUUAAAAAAAAAAAAAAAA0NDQ/Pz8AAAAAAAAAAAAuLi66urrs7Oz////7+/taWloAAABu"+
        "b29KS0pBQUFgYWAAAAAAAAAIgUUFRyYENh0AAACjo6Pk5OT///////8AAADP0dCwsbCYmZiNj46z"+
        "tbQAAAAPDw8NxGkIf0QEQCIAAACbm5vh4eH///////8cHBzz9fTy9PPDxcQAAAAAAACPj49DQ0My"+
        "34kMvGUGXzMAAACenp7h4eH///////81NTX19vbz9fSxs7IAAADz8/P///9NTU1K4pYO2XQHcDwA"+
        "AAChoaHh4eH///////80NDT19vXx8/KCg4MAAAC8vLz///89PT1G4pQO2XQHcDwAAAChoaHh4eH/"+
        "//////8fHx/z9fTS09NdXl0AAAB2dnbv7+8rKytC4ZIO2XQHcDwAAAChoaHh4eH///91dXUVFRXz"+
        "9fTJy8pdXl0AAAAAAABVVVUjIyM/4ZAO2XQHcDwAAAChoaHh4eH///8pKSn09vX09vXm6OeIiYhX"+
        "WFhzdHMAAAAtLS1B4ZEO2XQHcDwAAAChoaHh4eH///9SUlL3+Pf3+Pf19/bW19aoqanDxMMgICBG"+
        "RkZH4pUO2XQHcDwAAAChoaHh4eH///+oqKiAgID5+vr4+fjz9fQAAAAHBweYmJhfX19f5qMs3oUJ"+
        "h0gAAACrq6vk5OT///////+NjY36+/r5+vn19/YAAAD///////9zc3OC67de5qIMumMAAADCwsLs"+
        "7Oz///////+xsbGTk5OIiIj29/cTExP///////9+fn6Z78R+67Uq3YQAAADm5ub19fX/////////"+
        "//////+oqKhJSUl7e3v///////+qqqqIiIh3d3dAQEB0dHT////+/v7/////////////////////"+
        "//////////////////////////////////////////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"+
        "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";

            buildCell(tr, "TorrentLeech","http://www.torrentleech.org/torrents/browse/index/query/"+txt, img);


        //Torrentz

          img = "data:text/html;charset=utf-8;base64,AAABAAEAEBAQAAEABAAoAQAAFgAAACgAAAAQAAAAIAAAAAEABAAAAAAAAAAAAAAAAAAAAAAAAAAA"+
        "AAAAAACZZjMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"+
        "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"+
        "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"+
        "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD8IAAA/DcAAPw7AAD8PQAA/CAAAPw/AAD8PwAA/D8A"+
        "APw/AAD8PwAA/D8AAPw/AAB8PgAAAAAAAAAAAACAAQAA";

            buildCell(tr, "Torrentz","http://torrentz.eu/search?f="+txt, img);  	


         }
 
}
    
     
	function buildCell(container, title, href, image){
          var a = document.createElement("a");


          if ((title == "Subs4free")||(title == "H33t")) {
        href = href.replace(/\s/g, "+"); //replace spaces with +'s
        } 
          if (title == "Torrentz") {
        href = href.replace("&amp;", "%26"); //replace spaces with +'s
        }


        a.href = href; 
          a.setAttribute("target","_blank");
        a.title=title;	
          var img = document.createElement("img");
          img.src = image;
      
      if (pathArray[1]=="chart"){
          img.setAttribute("height","12");//needed for Chrome
          img.setAttribute("witdh","12");//needed for Chrome
      
      }
          
      else{    
        img.setAttribute("height","16");//needed for Chrome
        img.setAttribute("witdh","16");//needed for Chrome
      }
      
        a.appendChild(img);
        var cell = container.insertCell(0);
        cell.appendChild(a);
     
}



 function _addStyle(css){
          if (typeof GM_addStyle != "undefined") {
              GM_addStyle(css);
          } else if (typeof addStyle != "undefined") {
              addStyle(css);
          } else {
                 if (pathArray[1]=="genre"){                     
                        var heads = document.getElementsByClassName("title");
                 }  else {
                         var heads = document.getElementsByClassName("info");     
                 }
              
              var heads = document.getElementsByClassName("title");
            
              if (heads.length > 0) {
                  var node = document.createElement("style");
                  node.type = "text/css";
                  node.innerHTML = css;
                  heads[0].appendChild(node); 
              }
          }
}
  
  