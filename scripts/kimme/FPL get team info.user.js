// ==UserScript==
// @name        FPL get team info
// @namespace   kimme
// @description Get more info in your leagues at Fantay Premier League
// @include     http://fantasy.premierleague.com/my-leagues/*
// @exclude     http://fantasy.premierleague.com/my-leagues/
// @exclude     http://fantasy.premierleague.com/my-leagues
// @version     1.9.9
// @grant    GM_getValue
// @grant    GM_setValue
// ==/UserScript==
// written by Dean Edwards, 2005
// with input from Tino Zijdel, Matthias Miller, Diego Perini
// http://dean.edwards.name/weblog/2005/10/add-event/
function dean_addEvent(element,type,handler){if(element.addEventListener)element.addEventListener(type,handler,!1);else{
// assign each event handler a unique ID
handler.$$guid||(handler.$$guid=dean_addEvent.guid++),
// create a hash table of event types for the element
element.events||(element.events={});
// create a hash table of event handlers for each element/event pair
var handlers=element.events[type];handlers||(handlers=element.events[type]={},element["on"+type]&&(handlers[0]=element["on"+type])),
// store the event handler in the hash table
handlers[handler.$$guid]=handler,
// assign a global event handler to do all the work
element["on"+type]=handleEvent}}function removeEvent(element,type,handler){element.removeEventListener?element.removeEventListener(type,handler,!1):
// delete the event handler from the hash table
element.events&&element.events[type]&&delete element.events[type][handler.$$guid]}function handleEvent(event){var returnValue=!0;
// grab the event object (IE uses a global event object)
event=event||fixEvent(((this.ownerDocument||this.document||this).parentWindow||window).event);
// get a reference to the hash table of event handlers
var handlers=this.events[event.type];
// execute each event handler
for(var i in handlers)this.$$handleEvent=handlers[i],this.$$handleEvent(event)===!1&&(returnValue=!1);return returnValue}function fixEvent(event){
// add W3C standard event methods
return event.preventDefault=fixEvent.preventDefault,event.stopPropagation=fixEvent.stopPropagation,event}function decodeHtml(html){var txt=document.createElement("textarea");return txt.innerHTML=html,txt.value}function myescape(val){return retval=val.replace("'","&apos;"),retval=val.replace('"',"&quot;"),retval}function getIDPN(val){return idpn=val.replace(/\s+/g,""),idpn=decodeHtml(idpn),idpn=idpn.toLowerCase(),idpn=idpn.replace(/\W/g,""),idpn}function numberWithCommas(x){var parts=x.toString().split(".");return parts[0]=parts[0].replace(/\B(?=(\d{3})+(?!\d))/g,","),parts.join(".")}function stateChangedHist(){if(4==this.readyState&&(retval=this.responseText,arr1=retval.split("<dt>Gameweek Points</dt>"),arr2=arr1[1].split('/">'),arr3=arr2[0].split('href="'),arr4=arr3[1].split("/"),teamID=arr4[2],
//		alert(teamID);
lastGW=arr4[4],numrows=0,chipsdetail="",chipstxtstyle="",document.getElementById("chips"+teamID))){if(arr1=retval.split("<h3>Chips</h3>"),arr2=arr1[1].split("</section>"),chipsinfo=arr2[0].trim(),chipstxtstyle="",livechip=!1,"No chips played"==chipsinfo)chipstxt="0",chipsdetail=chipsinfo;else for(arr3=arr2[0].split("<tbody>"),arr4=arr3[1].split("</tbody>"),tbody_txt=arr4[0],rows=tbody_txt.split("</tr>"),numrows=rows.length-1,numrows>1&&(chipstxtstyle="font-weight: bold"),chipsdetail="",chipname="",chipstxtstyle="",i=0;i<rows.length-1;i++)arr5=rows[i].split("</td>"),arr6=arr5[1].split("<td>"),chipname=arr6[1].trim(),arr6=arr5[2].split("<td>"),chipstatus=arr6[1].trim(),"Played"!=chipstatus&&(chipstxtstyle="font-weight: bold"),arr6=arr5[3].split("<td>"),arr7=arr6[1].split("GW"),arr8=arr7[1].split("<"),chipweek=arr8[0],chipsdetail+=chipname+" (GW"+chipweek+")\n",lastGW==chipweek&&"Wildcard"!=chipname&&(livechip=!0);cell=document.getElementById("chips"+teamID),livechip&&(cell.style.backgroundColor="#ffbad2"),cell.innerHTML="<span style='"+chipstxtstyle+"' title='"+chipsdetail+"'>"+numrows+"</span>"}}function stateChangedTran(){if(4==this.readyState){for(retval=this.responseText,arr1=retval.split("<dt>Gameweek Points</dt>"),arr2=arr1[1].split('/">'),arr3=arr2[0].split('href="'),arr4=arr3[1].split("/"),teamID=arr4[2],lastGW=arr4[4],arr1=retval.split("No wildcards played"),arr1.length>1?wildcardGW=0:(arr1=retval.split('<h2 class="ismSection1">Wildcard history</h2>'),arr2=arr1[1].split("</table>"),arr3=arr2[0].split("</td>"),arr4=arr3[1].split("<td>"),wildcardGW=arr4[1],document.getElementById("wci"+teamID)&&(document.getElementById("wci"+teamID).title="Played: GW"+wildcardGW,document.getElementById("wcs"+teamID).innerHTML=document.getElementById("wcs"+teamID).innerHTML+wildcardGW)),arr1=retval.split("<dt>Gameweek transfers</dt>"),arr2=arr1[1].split("<dt>Wildcard</dt>"),gwtval=arr2[0],arr3=gwtval.split("dd>"),arr4=arr3[1].split("</"),gwtvalnum=parseInt(arr4[0]),arr1=retval.split('<h1 class="ismSection1">Transfer history</h1>'),arr2=arr1[1].split("</tbody>"),arr3=arr2[0].split("<tbody>"),arr4=arr3[1].split("</tr>"),tmpgwstr="",gws=[],i=lastGW+1;i>0;i--)gws[i]=0;for(i=0;i<arr4.length-1;i++)arr5=arr4[i].split("</td>"),arr6=arr5[3].split("<td>"),tmpgw=arr6[1],gws[tmpgw]=gws[tmpgw]+1;if(freetrans="",wildcardGW==lastGW)freetrans=1;else if(1==lastGW)freetrans=1;else if(0==gws[lastGW])freetrans=2;else if(gws[lastGW]>1)freetrans=1;else{for(lasttrans=1,checkGW=lastGW;1==lasttrans&&checkGW>0;)checkGW-=1,lasttrans=gws[checkGW];wildcardGW==checkGW?freetranstmp=1:0==lasttrans?1==checkGW?freetranstmp=1:freetranstmp=2:lasttrans>0?freetranstmp=1:freetranstmp=1,freetrans=freetranstmp}if(paidTrans=gwtvalnum-freetrans,paidTrans>0?(tph="-"+4*paidTrans,tphsrt=4*paidTrans):(tph="0",tphsrt=0),gwtvalnum=gws[lastGW],lastGW-=1,freetrans="",wildcardGW==lastGW+1)freetrans=1e3;else if(wildcardGW==lastGW)freetrans=1;else if(0==gws[lastGW])freetrans=2;else if(gws[lastGW]>1)freetrans=1;else{for(lasttrans=1,checkGW=lastGW;1==lasttrans&&checkGW>0;)checkGW-=1,lasttrans=gws[checkGW];wildcardGW==checkGW?freetranstmp=1:0==lasttrans?1==checkGW?freetranstmp=1:freetranstmp=2:lasttrans>0?freetranstmp=1:freetranstmp=1,freetrans=freetranstmp}paidTrans=gwtvalnum-freetrans,paidTrans>0?(lasttph="-"+4*paidTrans,lasttphsrt=4*paidTrans):(lasttph="0",lasttphsrt=0),"0"==document.getElementById("fplgwtotal"+teamID).innerHTML&&document.getElementById("livetotal"+teamID)&&(livetotalcell=document.getElementById("livetotal"+teamID),livetotalcell.innerHTML=numberWithCommas(parseInt(livetotalcell.innerHTML.replace(/,/g,""))-lasttphsrt)),document.getElementById("hitpts"+teamID)&&(cell=document.getElementById("hitpts"+teamID),cell.innerHTML="<span style='display: none'>"+tphsrt+"</span>"+tph),document.getElementById("wc"+teamID)&&(arr1=retval.split("Wildcard history</h2>"),arr2=arr1[1].split("<p>"),arr3=arr2[1].split("</p>"),wcinfo=arr3[0],"No wildcards played"==wcinfo?(wcimg="http://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Green_check.svg/13px-Green_check.svg.png",wctxt="Available"):(
//				wcimg = "http://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Ambox_important.svg/23px-Ambox_important.svg.png";
//				wctxt = "Active";
wcimg="http://upload.wikimedia.org/wikipedia/en/thumb/b/ba/Red_x.svg/13px-Red_x.svg.png",wctxt="Played"),cell=document.getElementById("wc"+teamID),cell.innerHTML="<span id='wcs"+teamID+"' style='display: none;'>"+wctxt+"</span><img id='wci"+teamID+"' title='"+wctxt+"' src='"+wcimg+"'>")}}function stateChanged(){if(4==this.readyState){for(retval=this.responseText,/*
		arr1 = retval.split('<h2 class="ismSection3">');
		arr2 = arr1[1].split("</h2>");
		teamName = arr2[0];
		arr1 = retval.split('<h1 class="ismSection2">');
		arr2 = arr1[1].split("</h1>");
		playerName = arr2[0];
*/
arr1=retval.split('id="ismJSCarousel"'),arr2=arr1[1].split('data-entry="'),arr3=arr2[1].split('"'),teamID=arr3[0],
//		idpn = getIDPN(teamName);
idpn="row"+teamID,row=document.getElementById(idpn),rowtds=row.getElementsByTagName("td"),gwScore=parseInt(rowtds[4].innerHTML),totalScore=parseInt(rowtds[5].innerHTML.replace(/,/g,"")),(1==config_values.teamval||1==config_values.totalval)&&(arr1=retval.split("<dt>Team value</dt>"),arr2=arr1[1].split("<dt>In the bank</dt>"),teamval=arr2[0],arr3=teamval.split("£"),arr4=arr3[1].split("m"),teamvalnum=arr4[0]),(1==config_values.bankval||1==config_values.totalval)&&(arr1=retval.split("<dt>In the bank</dt>"),arr2=arr1[1].split("</dl>"),bankval=arr2[0],arr3=bankval.split("£"),arr4=arr3[1].split("m"),bankvalnum=arr4[0]),1==config_values.tt&&(arr1=retval.split("<dt>Total transfers</dt>"),arr2=arr1[1].split("<dt>Gameweek transfers</dt>"),ttval=arr2[0],arr3=ttval.split("dd>"),arr4=arr3[1].split("</dd"),ttvalnum=arr4[0]),1==config_values.gwt&&(arr1=retval.split("<dt>Gameweek transfers</dt>"),arr2=arr1[1].split("<dt>Wildcard</dt>"),gwtval=arr2[0],arr3=gwtval.split("dd>"),arr4=arr3[1].split("</dd"),gwtvalnum=arr4[0]),1==config_values.totalval&&(totalvalnum=parseFloat(teamvalnum)+parseFloat(bankvalnum),totalvalnum=totalvalnum.toFixed(1)),/*
		if(config_values["wc"] == 1) {
			arr1 = retval.split("<dt>Wildcard</dt>");
			arr2 = arr1[1].split("</dl>");
			wcval = arr2[0];
			if(wcval.indexOf("Played") > -1) {
				wcimg = "http://upload.wikimedia.org/wikipedia/en/thumb/b/ba/Red_x.svg/13px-Red_x.svg.png";
				wctxt = "Played";
			} else if(wcval.indexOf("Active") > -1) {
				wcimg = "http://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Ambox_important.svg/23px-Ambox_important.svg.png";
				wctxt = "Active";
			} else {
				wcimg = "http://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Green_check.svg/13px-Green_check.svg.png";
				wctxt = "Available";
			}
		}
*/
1==config_values.captain&&(arr1=retval.split('"is_captain": true'),arr2=arr1[1].split('<span class="ismElementText ismPitchStat">'),arr3=arr2[0].split('JS_ISM_NAME">'),arr4=arr3[1].split(" </span>"),capval=arr4[0].trim(),arr1=retval.split('"is_vice_captain": true'),arr2=arr1[1].split('<span class="ismElementText ismPitchStat">'),arr3=arr2[0].split('JS_ISM_NAME">'),arr4=arr3[1].split(" </span>"),vicecapval=arr4[0].trim()),1==config_values.h2h&&(arr1=retval.split("Head-to-Head leagues"),arr2=arr1[1].split("</table>"),h2htable=arr2[0],h2htable.indexOf(leagueName)>-1?(arr1=h2htable.split(leagueName),arr2=arr1[0].split("<tr>"),arr3=arr2[arr2.length-1].split("</td>"),arr4=arr3[1].split("<td>"),h2hpos=arr4[1]):h2hpos="-"),(1==config_values.livepoints||1==config_values.livetotal)&&(arr1=retval.split('class="ism-scoreboard-panel__points'),arr2=arr1[1].split("<sub>"),arr3=arr2[0].split('">'),livepoints=arr3[1].trim()),1==config_values.livetotal&&(livetotal=totalScore+(livepoints-gwScore)),arr1=retval.split("<!-- end ismPitch -->"),arr2=arr1[0].split('<div class="ismPitch">'),arr3=arr2[1].split('<div class="ismBench">'),pitch=arr3[0],bench=arr3[1],arr1=pitch.split('JS_ISM_NAME">'),pitchstr="",numplayed=0,numtoplay=0,numdidnt=0,playedstr="",toplaystr="",didntplaystr="",i=1;i<arr1.length;i++){if(arr2=arr1[i].split("</span>"),arr3=arr1[i].split("</tbody>"),arr3.length>1)for(arr4=arr3[0].split("<tbody>"),ptstable=decodeHtml(arr4[1]),ptsrows=ptstable.split("</tr>"),pts=0,pt=0;pt<ptsrows.length;pt++)ptscells=ptsrows[pt].split("</td>"),ptscells[2]?(ptcell=ptscells[2].split("<td>"),pts+=parseInt(ptcell[1])):pts+=0;else pts="N/A";if(arr3=arr1[i].split("  v  "),arr3.length>1?tmpToPlay=arr3.length-1:tmpToPlay=0,arr3=arr1[i].split("Minutes played</td> <td>"),tmpname=arr2[0].trim(),pitchstr+="<span title='"+pts+"'>"+tmpname+"</span>",i<arr1.length-1&&(pitchstr+=", "),tmpToPlay<1){for(tmptime=0,arr3i=1;arr3i<arr3.length;arr3i++)arr4=arr3[arr3i].split("</td>"),tmptime+=parseInt(arr4[0]);tmptime>0?(numplayed++,playedstr+=myescape(tmpname)+"\n"):(numdidnt++,didntplaystr+=myescape(tmpname)+"\n")}else numtoplay++,toplaystr+=myescape(tmpname),tmpToPlay>1&&(toplaystr+=" x "+tmpToPlay),toplaystr+="\n"}for(arr1=bench.split('JS_ISM_NAME">'),benchstr="",i=1;i<arr1.length;i++){if(arr2=arr1[i].split("</span>"),arr3=arr1[i].split("</tbody>"),arr3.length>1)for(arr4=arr3[0].split("<tbody>"),ptstable=decodeHtml(arr4[1]),ptsrows=ptstable.split("</tr>"),pts=0,pt=0;pt<ptsrows.length;pt++)ptscells=ptsrows[pt].split("</td>"),ptscells[2]?(ptcell=ptscells[2].split("<td>"),pts+=parseInt(ptcell[1])):pts+=0;else pts="N/A";benchstr+="<span title='"+pts+"'>"+arr2[0].trim()+"</span>",i<arr1.length-1&&(benchstr+=", ")}if(/*
		arr1 = pitch.split('Minutes played</td> <td>');
		numplayed = 0;
		for(i=1; i<arr1.length; i++) {
			arr2 = arr1[i].split('</td>');
			tmpval = parseInt(arr2[0]);
			if(tmpval>0) {
				numplayed++;
			}
		}
*/
rowstr="",1==config_values.teamval&&(rowstr+="<td align='right' nowrap>"+teamvalnum+"</td>"),1==config_values.bankval&&(rowstr+="<td align='right' nowrap>"+bankvalnum+"</td>"),1==config_values.totalval&&(rowstr+="<td align='right' nowrap>"+totalvalnum+"</td>"),1==config_values.tt&&(rowstr+="<td>"+ttvalnum+"</td>"),1==config_values.gwt&&(rowstr+="<td>"+gwtvalnum+"</td>"),1==config_values.hitpts&&(rowstr+="<td id='hitpts"+teamID+"'>&nbsp;</td>"),1==config_values.wc&&(rowstr+="<td id='wc"+teamID+"' align='center'>&nbsp;</td>"),1==config_values.chips&&(rowstr+="<td id='chips"+teamID+"' align='center'>&nbsp;</td>"),1==config_values.captain&&(rowstr+="<td title='"+vicecapval+" (vc)' nowrap>"+capval+"</td>"),1==config_values.h2h&&(rowstr+="<td><span style='display: none'>-"+h2hpos+"</span>"+h2hpos+"</td>"),1==config_values.livepoints&&(rowstr+="<td>"+livepoints+"</td>"),1==config_values.livetotal&&(rowstr+="<td id='livetotal"+teamID+"' nowrap align='right'>"+numberWithCommas(livetotal)+"</td>"),1==config_values.played&&(rowstr+="<td title='"+playedstr+"' nowrap>"+numplayed+"</td>",rowstr+="<td title='"+toplaystr+"' nowrap>"+numtoplay+"</td>",rowstr+="<td title='"+didntplaystr+"' nowrap>"+numdidnt+"</td>"),document.getElementById(idpn).innerHTML=document.getElementById(idpn).innerHTML+rowstr,rowheight=row.offsetHeight-1,rowwidth=row.offsetWidth-1,tds=row.getElementsByTagName("td"),tds[0].style.position="relative",tdwidth=tds[0].offsetWidth,divwidth=rowwidth-tdwidth,compStyle=window.getComputedStyle(row,""),bg="#fff","transparent"==bg&&(bg="#fff"),1==config_values.wide?fontsize=9:fontsize=7,playerliststr="<div id='teamdiv_"+idpn+"' style='display: none; position: absolute; top: -1px; left: "+tdwidth+"px; height: "+rowheight+"px; width: "+divwidth+"px; line-height: "+rowheight+"px; background: "+bg+"; color: #000; font-size: "+fontsize+"pt'>"+pitchstr+"<span style='font-style: italic'>&nbsp;Bench:&nbsp;"+benchstr+"</span></div>",tds[0].innerHTML=tds[0].innerHTML+playerliststr,eval("tds[0].onclick = function() {tmptd = document.getElementById('teamdiv_"+idpn+"'); if(tmptd.style.display == ''){tmptd.style.display = 'none'}else{tmptd.style.display = ''};}"),1==config_values.hitpts||1==config_values.livetotal||1==config_values.wc){tranurl="http://fantasy.premierleague.com/entry/"+teamID+"/transfers/history/";var tranxmlHttp=GetXmlHttpObject();tranxmlHttp.onreadystatechange=stateChangedTran,tranxmlHttp.open("GET",tranurl,!0),tranxmlHttp.send(null)}if(1==config_values.chips){histurl="http://fantasy.premierleague.com/entry/"+teamID+"/history/";var histxmlHttp=GetXmlHttpObject();histxmlHttp.onreadystatechange=stateChangedHist,histxmlHttp.open("GET",histurl,!0),histxmlHttp.send(null)}for(tables=document.getElementsByTagName("table"),i=0;i<tables.length;i++)("ismTable ismStandingsTable"==tables[i].className||"ismTable ismH2HStandingsTable"==tables[i].className)&&(table=tables[i]);clearTimeout(mytimeout),mytimeout=setTimeout(function(){sorttable.makeSortable(table)},1e3)}}function GetXmlHttpObject(){var xmlHttp=null;try{
// Firefox, Opera 8.0+, Safari
xmlHttp=new XMLHttpRequest}catch(e){
// Internet Explorer
try{xmlHttp=new ActiveXObject("Msxml2.XMLHTTP")}catch(e){xmlHttp=new ActiveXObject("Microsoft.XMLHTTP")}}return xmlHttp}var stIsIE=/*@cc_on!@*/!1;/* for Internet Explorer */
/*@cc_on @*/
/*@if (@_win32)
    document.write("<script id=__ie_onload defer src=javascript:void(0)><\/script>");
    var script = document.getElementById("__ie_onload");
    script.onreadystatechange = function() {
        if (this.readyState == "complete") {
            sorttable.init(); // call the onload handler
        }
    };
/*@end @*/
/* for Safari */
if(sorttable={init:function(){
// quit if this function has already been called
arguments.callee.done||(
// flag this function so we don't do the same thing twice
arguments.callee.done=!0,
// kill the timer
_timer&&clearInterval(_timer),document.createElement&&document.getElementsByTagName&&(sorttable.DATE_RE=/^(\d\d?)[\/\.-](\d\d?)[\/\.-]((\d\d)?\d\d)$/,forEach(document.getElementsByTagName("table"),function(table){-1!=table.className.search(/\bsortable\b/)&&sorttable.makeSortable(table)})))},makeSortable:function(table){if(0==table.getElementsByTagName("thead").length&&(
// table doesn't have a tHead. Since it should have, create one and
// put the first table row in it.
the=document.createElement("thead"),the.appendChild(table.rows[0]),table.insertBefore(the,table.firstChild)),
// Safari doesn't support table.tHead, sigh
null==table.tHead&&(table.tHead=table.getElementsByTagName("thead")[0]),1==table.tHead.rows.length){// can't cope with two header rows
// Sorttable v1 put rows with a class of "sortbottom" at the bottom (as
// "total" rows, for example). This is B&R, since what you're supposed
// to do is put them in a tfoot. So, if there are sortbottom rows,
// for backwards compatibility, move them to tfoot (creating it if needed).
sortbottomrows=[];for(var i=0;i<table.rows.length;i++)-1!=table.rows[i].className.search(/\bsortbottom\b/)&&(sortbottomrows[sortbottomrows.length]=table.rows[i]);if(sortbottomrows){null==table.tFoot&&(
// table doesn't have a tfoot. Create one.
tfo=document.createElement("tfoot"),table.appendChild(tfo));for(var i=0;i<sortbottomrows.length;i++)tfo.appendChild(sortbottomrows[i]);delete sortbottomrows}
// work through each column and calculate its type
headrow=table.tHead.rows[0].cells;for(var i=0;i<headrow.length;i++)
// manually override the type with a sorttable_type attribute
headrow[i].className.match(/\bsorttable_nosort\b/)||(// skip this col
mtch=headrow[i].className.match(/\bsorttable_([a-z0-9]+)\b/),mtch&&(override=mtch[1]),mtch&&"function"==typeof sorttable["sort_"+override]?headrow[i].sorttable_sortfunction=sorttable["sort_"+override]:headrow[i].sorttable_sortfunction=sorttable.guessType(table,i),
// make it clickable to sort
headrow[i].sorttable_columnindex=i,headrow[i].sorttable_tbody=table.tBodies[0],dean_addEvent(headrow[i],"click",sorttable.innerSortFunction=function(e){if(-1!=this.className.search(/\bsorttable_sorted\b/))
// if we're already sorted by this column, just
// reverse the table, which is quicker
return sorttable.reverse(this.sorttable_tbody),this.className=this.className.replace("sorttable_sorted","sorttable_sorted_reverse"),this.removeChild(document.getElementById("sorttable_sortfwdind")),sortrevind=document.createElement("span"),sortrevind.id="sorttable_sortrevind",sortrevind.innerHTML=stIsIE?'&nbsp<font face="webdings">5</font>':"&nbsp;&#x25B4;",void this.appendChild(sortrevind);if(-1!=this.className.search(/\bsorttable_sorted_reverse\b/))
// if we're already sorted by this column in reverse, just
// re-reverse the table, which is quicker
return sorttable.reverse(this.sorttable_tbody),this.className=this.className.replace("sorttable_sorted_reverse","sorttable_sorted"),this.removeChild(document.getElementById("sorttable_sortrevind")),sortfwdind=document.createElement("span"),sortfwdind.id="sorttable_sortfwdind",sortfwdind.innerHTML=stIsIE?'&nbsp<font face="webdings">6</font>':"&nbsp;&#x25BE;",void this.appendChild(sortfwdind);
// remove sorttable_sorted classes
theadrow=this.parentNode,forEach(theadrow.childNodes,function(cell){1==cell.nodeType&&(// an element
cell.className=cell.className.replace("sorttable_sorted_reverse",""),cell.className=cell.className.replace("sorttable_sorted",""))}),sortfwdind=document.getElementById("sorttable_sortfwdind"),sortfwdind&&sortfwdind.parentNode.removeChild(sortfwdind),sortrevind=document.getElementById("sorttable_sortrevind"),sortrevind&&sortrevind.parentNode.removeChild(sortrevind),this.className+=" sorttable_sorted",sortfwdind=document.createElement("span"),sortfwdind.id="sorttable_sortfwdind",sortfwdind.innerHTML=stIsIE?'&nbsp<font face="webdings">6</font>':"&nbsp;&#x25BE;",this.appendChild(sortfwdind),
// build an array to sort. This is a Schwartzian transform thing,
// i.e., we "decorate" each row with the actual sort key,
// sort based on the sort keys, and then put the rows back in order
// which is a lot faster because you only do getInnerText once per row
row_array=[],col=this.sorttable_columnindex,rows=this.sorttable_tbody.rows;for(var j=0;j<rows.length;j++)row_array[row_array.length]=[sorttable.getInnerText(rows[j].cells[col]),rows[j]];/* If you want a stable sort, uncomment the following line */
//sorttable.shaker_sort(row_array, this.sorttable_sortfunction);
/* and comment out this one */
row_array.sort(this.sorttable_sortfunction),tb=this.sorttable_tbody;for(var j=0;j<row_array.length;j++)tb.appendChild(row_array[j][1]);delete row_array}))}},guessType:function(table,column){
// guess the type of a column based on its first non-blank row
sortfn=sorttable.sort_alpha;for(var i=0;i<table.tBodies[0].rows.length;i++)if(text=sorttable.getInnerText(table.tBodies[0].rows[i].cells[column]),""!=text){if(text.match(/^-?[£$¤]?[\d,.]+%?$/))return sorttable.sort_numeric;if(
// check for a date: dd/mm/yyyy or dd/mm/yy
// can have / or . or - as separator
// can be mm/dd as well
possdate=text.match(sorttable.DATE_RE),possdate){if(
// looks like a date
first=parseInt(possdate[1]),second=parseInt(possdate[2]),first>12)
// definitely dd/mm
return sorttable.sort_ddmm;if(second>12)return sorttable.sort_mmdd;
// looks like a date, but we can't tell which, so assume
// that it's dd/mm (English imperialism!) and keep looking
sortfn=sorttable.sort_ddmm}}return sortfn},getInnerText:function(node){
// gets the text we want to use for sorting for a cell.
// strips leading and trailing whitespace.
// this is *not* a generic getInnerText function; it's special to sorttable.
// for example, you can override the cell text with a customkey attribute.
// it also gets .value for <input> fields.
if(!node)return"";if(hasInputs="function"==typeof node.getElementsByTagName&&node.getElementsByTagName("input").length,null!=node.getAttribute("sorttable_customkey"))return node.getAttribute("sorttable_customkey");if("undefined"!=typeof node.textContent&&!hasInputs)return node.textContent.replace(/^\s+|\s+$/g,"");if("undefined"!=typeof node.innerText&&!hasInputs)return node.innerText.replace(/^\s+|\s+$/g,"");if("undefined"!=typeof node.text&&!hasInputs)return node.text.replace(/^\s+|\s+$/g,"");switch(node.nodeType){case 3:if("input"==node.nodeName.toLowerCase())return node.value.replace(/^\s+|\s+$/g,"");case 4:return node.nodeValue.replace(/^\s+|\s+$/g,"");case 1:case 11:for(var innerText="",i=0;i<node.childNodes.length;i++)innerText+=sorttable.getInnerText(node.childNodes[i]);return innerText.replace(/^\s+|\s+$/g,"");default:return""}},reverse:function(tbody){
// reverse the rows in a tbody
newrows=[];for(var i=0;i<tbody.rows.length;i++)newrows[newrows.length]=tbody.rows[i];for(var i=newrows.length-1;i>=0;i--)tbody.appendChild(newrows[i]);delete newrows},/* sort functions
     each sort function takes two parameters, a and b
     you are comparing a[0] and b[0] */
sort_numeric:function(a,b){return aa=parseFloat(a[0].replace(/[^0-9.-]/g,"")),isNaN(aa)&&(aa=0),bb=parseFloat(b[0].replace(/[^0-9.-]/g,"")),isNaN(bb)&&(bb=0),bb-aa},sort_alpha:function(a,b){return a[0]==b[0]?0:a[0]<b[0]?-1:1},sort_ddmm:function(a,b){return mtch=a[0].match(sorttable.DATE_RE),y=mtch[3],m=mtch[2],d=mtch[1],1==m.length&&(m="0"+m),1==d.length&&(d="0"+d),dt1=y+m+d,mtch=b[0].match(sorttable.DATE_RE),y=mtch[3],m=mtch[2],d=mtch[1],1==m.length&&(m="0"+m),1==d.length&&(d="0"+d),dt2=y+m+d,dt1==dt2?0:dt1<dt2?-1:1},sort_mmdd:function(a,b){return mtch=a[0].match(sorttable.DATE_RE),y=mtch[3],d=mtch[2],m=mtch[1],1==m.length&&(m="0"+m),1==d.length&&(d="0"+d),dt1=y+m+d,mtch=b[0].match(sorttable.DATE_RE),y=mtch[3],d=mtch[2],m=mtch[1],1==m.length&&(m="0"+m),1==d.length&&(d="0"+d),dt2=y+m+d,dt1==dt2?0:dt1<dt2?-1:1},shaker_sort:function(list,comp_func){for(
// A stable sort function to allow multi-level sorting of data
// see: http://en.wikipedia.org/wiki/Cocktail_sort
// thanks to Joseph Nahmias
var b=0,t=list.length-1,swap=!0;swap;){swap=!1;for(var i=b;t>i;++i)if(comp_func(list[i],list[i+1])>0){var q=list[i];list[i]=list[i+1],list[i+1]=q,swap=!0}if(// for
t--,!swap)break;for(var i=t;i>b;--i)if(comp_func(list[i],list[i-1])<0){var q=list[i];list[i]=list[i-1],list[i-1]=q,swap=!0}// for
b++}}},/*
  SortTable
  version 2
  7th April 2007
  Stuart Langridge, http://www.kryogenix.org/code/browser/sorttable/

  Instructions:
  Download this file
  Add <script src="sorttable.js"></script> to your HTML
  Add class="sortable" to any table you'd like to make sortable
  Click on the headers to sort

  Thanks to many, many people for contributions and suggestions.
  Licenced as X11: http://www.kryogenix.org/code/browser/licence.html
  This basically means: do what you want with it.
*/
/* ******************************************************************
   Supporting functions: bundled here to avoid depending on a library
   ****************************************************************** */
// Dean Edwards/Matthias Miller/John Resig
/* for Mozilla/Opera9 */
document.addEventListener&&document.addEventListener("DOMContentLoaded",sorttable.init,!1),/WebKit/i.test(navigator.userAgent))// sniff
var _timer=setInterval(function(){/loaded|complete/.test(document.readyState)&&sorttable.init()},10);/* for other browsers */
window.onload=sorttable.init,
// a counter used to create unique IDs
dean_addEvent.guid=1,fixEvent.preventDefault=function(){this.returnValue=!1},fixEvent.stopPropagation=function(){this.cancelBubble=!0},
// Dean's forEach: http://dean.edwards.name/base/forEach.js
/*
	forEach, version 1.0
	Copyright 2006, Dean Edwards
	License: http://www.opensource.org/licenses/mit-license.php
*/
// array-like enumeration
Array.forEach||(// mozilla already supports this
Array.forEach=function(array,block,context){for(var i=0;i<array.length;i++)block.call(context,array[i],i,array)}),
// generic enumeration
Function.prototype.forEach=function(object,block,context){for(var key in object)"undefined"==typeof this.prototype[key]&&block.call(context,object[key],key,object)},
// character enumeration
String.forEach=function(string,block,context){Array.forEach(string.split(""),function(chr,index){block.call(context,chr,index,string)})};
// globally resolve forEach enumeration
var forEach=function(object,block,context){if(object){var resolve=Object;// default
if(object instanceof Function)
// functions have a "length" property
resolve=Function;else{if(object.forEach instanceof Function)
// the object implements a custom forEach method so use that
return void object.forEach(block,context);"string"==typeof object?
// the object is a string
resolve=String:"number"==typeof object.length&&(
// the object is array-like
resolve=Array)}resolve.forEach(object,block,context)}},mytimeout;for(h2s=document.getElementsByTagName("h2"),i=0;i<h2s.length;i++)"ismTabHeading"==h2s[i].className&&(leagueName=h2s[i].innerHTML);for(config_items=new Array("teamval","bankval","totalval","tt","gwt","hitpts","wc","chips","captain","h2h","livepoints","livetotal","wide","played"),config_values={},config_strs={},config_strs.teamval="Team value",config_strs.bankval="Bank value",config_strs.totalval="Total value",config_strs.tt="Total transfers",config_strs.gwt="Gameweek transfers",config_strs.wc="Wildcard",config_strs.chips="Chips",config_strs.captain="Captain",config_strs.h2h="H2H league position",config_strs.livepoints="Live gameweek points",config_strs.livetotal="Live total points",config_strs.wide="Extra wide",config_strs.played="Playing stats",config_strs.hitpts="Transfer points hit",i=0;i<config_items.length;i++)c=config_items[i],tmpval=GM_getValue(c),void 0==tmpval&&(GM_setValue(c,1),tmpval=1),config_values[c]=tmpval;for(optionWidth="220px",1==config_values.wide?refreshWidth="1100px":refreshWidth="880px",tables=document.getElementsByTagName("table"),i=0;i<tables.length;i++)if("ismTable ismStandingsTable"==tables[i].className||"ismTable ismH2HStandingsTable"==tables[i].className){for(table=tables[i],trs=tables[i].getElementsByTagName("tr"),j=0;j<trs.length;j++)if(ancs=trs[j].getElementsByTagName("a"),tds=trs[j].getElementsByTagName("td"),ancs.length>0){tds[1].style.whiteSpace="nowrap",tds[2].style.whiteSpace="nowrap",tds[3].style.whiteSpace="nowrap",arr1=tds[2].innerHTML.split('/">'),arr2=arr1[1].split("</a>"),teamName=arr2[0],arr1=tds[2].innerHTML.split("entry/"),arr2=arr1[1].split("/event"),teamID=arr2[0],playerName=tds[3].innerHTML,tds[4].id="fplgwtotal"+teamID,
//				idpn = getIDPN(teamID);
idpn="row"+teamID,trs[j].id=idpn,url=ancs[0].href;var xmlHttp=GetXmlHttpObject();xmlHttp.onreadystatechange=stateChanged,xmlHttp.open("GET",url,!0),xmlHttp.send(null)}else 0==j&&(headstr="",1==config_values.teamval&&(headstr+="<th title='Team value'>Value</th>"),1==config_values.bankval&&(headstr+="<th title='Bank value'>Bank</th>"),1==config_values.totalval&&(headstr+="<th title='Total value'>Total</th>"),1==config_values.tt&&(headstr+="<th><abbr title='Total transfers'>TT</abbr></th>"),1==config_values.gwt&&(headstr+="<th><abbr title='Gameweek transfers'>GWT</abbr></th>"),1==config_values.hitpts&&(headstr+="<th><abbr title='Transfer points hit'>TPH</abbr></th>"),1==config_values.wc&&(headstr+="<th><abbr title='Wildcard available'>WC</abbr></th>"),1==config_values.chips&&(headstr+="<th><abbr title='Chips played'>Chips</abbr></th>"),1==config_values.captain&&(headstr+="<th>Captain</th>"),1==config_values.h2h&&(headstr+="<th><abbr title='Associated H2H league position'>H2H</abbr></th>"),1==config_values.livepoints&&(headstr+="<th><abbr title='Live gameweek points'>Live</abbr></th>"),1==config_values.livetotal&&(headstr+="<th><abbr title='Live points total'>Total</abbr></th>"),1==config_values.played&&(headstr+="<th><abbr title='Players played'>P</abbr></th>",headstr+="<th><abbr title='Players to play'>TP</abbr></th>",headstr+="<th><abbr title='Players who did not play'>DNP</abbr></th>"),ths=trs[j].getElementsByTagName("th"),ths[0].className="sorttable_nosort",ths[0].innerHTML="<abbr onclick=\"divs=document.getElementsByTagName('div');onoff='';for(i=0;i<divs.length;i++){tmpid=divs[i].id;if(tmpid.lastIndexOf('teamdiv_', 0) === 0){if(onoff==''){if(divs[i].style.display == 'none'){onoff='on'}else{onoff='off'}}if(onoff=='on'){divs[i].style.display=''}else{divs[i].style.display='none'}}}\" title=\"Toggle teams\">T</abbr>",ths[1].className="sorttable_nosort",trs[j].innerHTML=trs[j].innerHTML+headstr);for(tables[i].innerHTML=tables[i].innerHTML+"<tr><td colspan=21><div id='configrow'></div></td></tr>",configrow=document.getElementById("configrow"),i=0;i<config_items.length;i++){c=config_items[i];
//add captain config
var div=document.createElement("div");div.style.display="inline-block",div.style["float"]="left",div.style.width=optionWidth;var span=document.createElement("span");span.appendChild(document.createTextNode(config_strs[c]+": ")),div.appendChild(span);var a=document.createElement("a");0==config_values[c]&&(a.style.color="#bbb"),a.id=c+"_on",a.appendChild(document.createTextNode("On")),a.href="javascript:null(0)",eval("a.addEventListener('click', function(){document.getElementById(\""+c+"_on\").style.color='#000'; document.getElementById(\""+c+"_off\").style.color='#bbb'; GM_setValue(\""+c+'",1);}, false);'),div.appendChild(a);var span=document.createElement("span");span.appendChild(document.createTextNode(" | ")),div.appendChild(span);var a=document.createElement("a");1==config_values[c]&&(a.style.color="#bbb"),a.id=c+"_off",a.appendChild(document.createTextNode("Off")),a.href="javascript:null(0)",eval("a.addEventListener('click', function(){document.getElementById(\""+c+"_off\").style.color='#000'; document.getElementById(\""+c+"_on\").style.color='#bbb'; GM_setValue(\""+c+'",0);}, false);'),div.appendChild(a),configrow.appendChild(div)}var div=document.createElement("div");div.style.display="inline-block",div.style["float"]="left",div.style.width=optionWidth;var span=document.createElement("span");span.appendChild(document.createTextNode("All: ")),div.appendChild(span);var a=document.createElement("a");a.id="all_on",a.appendChild(document.createTextNode("On")),a.href="javascript:null(0)",a.addEventListener("click",function(){for(i=0;i<config_items.length;i++)c=config_items[i],document.getElementById(c+"_on").style.color="#000",document.getElementById(c+"_off").style.color="#bbb",GM_setValue(c,1)},!1),div.appendChild(a);var span=document.createElement("span");span.appendChild(document.createTextNode(" | ")),div.appendChild(span);var a=document.createElement("a");a.id="all_off",a.appendChild(document.createTextNode("Off")),a.href="javascript:null(0)",a.addEventListener("click",function(){for(i=0;i<config_items.length;i++)c=config_items[i],document.getElementById(c+"_off").style.color="#000",document.getElementById(c+"_on").style.color="#bbb",GM_setValue(c,0)},!1),div.appendChild(a),configrow.appendChild(div);var div=document.createElement("div");div.style.display="inline-block",div.style["float"]="left",div.style.width=optionWidth;var span=document.createElement("span");span.appendChild(document.createTextNode("Quick picks: ")),div.appendChild(span);var a=document.createElement("a");a.id="all_on",a.appendChild(document.createTextNode("Team Info")),a.href="javascript:null(0)",a.addEventListener("click",function(){for(i=0;i<config_items.length;i++)
//live stats
i<8?(c=config_items[i],document.getElementById(c+"_on").style.color="#000",document.getElementById(c+"_off").style.color="#bbb",GM_setValue(c,1)):(c=config_items[i],document.getElementById(c+"_off").style.color="#000",document.getElementById(c+"_on").style.color="#bbb",GM_setValue(c,0))},!1),div.appendChild(a);var span=document.createElement("span");span.appendChild(document.createTextNode(" | ")),div.appendChild(span);var a=document.createElement("a");a.id="all_off",a.appendChild(document.createTextNode("Live Data")),a.href="javascript:null(0)",a.addEventListener("click",function(){for(i=0;i<config_items.length;i++)
//live stats
7==i||8==i||10==i||11==i||13==i?(c=config_items[i],document.getElementById(c+"_on").style.color="#000",document.getElementById(c+"_off").style.color="#bbb",GM_setValue(c,1)):(c=config_items[i],document.getElementById(c+"_off").style.color="#000",document.getElementById(c+"_on").style.color="#bbb",GM_setValue(c,0))},!1),div.appendChild(a),configrow.appendChild(div);var div=document.createElement("div");div.style.display="inline-block",div.style.width=refreshWidth,div.style["float"]="bottom",div.style.paddingTop="10px";var span=document.createElement("span"),a=document.createElement("a");a.appendChild(document.createTextNode("Reload")),a.href="javascript:location.reload()",a.style.border="1px solid #000",a.style.padding="3px",a.style.borderRadius="6px",span.appendChild(a),div.appendChild(span),configrow.appendChild(div)}
//extra wide
if(1==config_values.wide){document.getElementById("body").style.width="100%";var cols=document.getElementsByClassName("ismPrimaryWide");for(i=0;i<cols.length;i++)cols[i].style.width="1150px";var cols=document.getElementsByClassName("ismContent");for(i=0;i<cols.length;i++)cols[i].style.width="1380px";var cols=document.getElementsByClassName("ismWrapper");for(i=0;i<cols.length;i++)cols[i].style.width="1380px"}else{var cols=document.getElementsByClassName("ismPrimaryWide");for(i=0;i<cols.length;i++)cols[i].style.width="910px";var cols=document.getElementsByClassName("ismWrapper");for(i=0;i<cols.length;i++)cols[i].style.width="1140px"}