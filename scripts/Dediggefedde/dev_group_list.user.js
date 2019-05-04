// ==UserScript==
// @name           dev_group_list
// @description    All groups listed and search groups RegExp in one panel.\nMake group-collections to display similar topic-groups
// @namespace      dev_group_list
// @match     http://*.deviantart.com/*
// @match     https://*.deviantart.com/*
// @require        https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js
// @require        https://greasemonkey.github.io/gm4-polyfill/gm4-polyfill.js
// @version        2.4
// @grant          GM_setValue
// @grant          GM_deleteValue
// @grant          GM_getValue
// @grant          GM_listValues
// @grant		   GM.setValue
// @grant		   GM.getValue
// @grant		   GM.deleteValue
// @grant		   GM.listValues
// @grant		   unsafeWindow
// @author         Dediggefedde
// ==/UserScript==

var wartbild="data:image/gif;base64,R0lGODlhFAAUAMwAAAAAAAAAAE9PT%2F%2F%2F%2F2lpadqkApmZmaJ6An9%2Ff%2F7klScnJ5OTk%2F3LNVxcXG1tbXR0dDQ0NKenp7meTdPT04iIiLS0tMzMzExMTKaZck5EJmRXLn9ySoBlFJR5KAAAAAAAACH%2FC05FVFNDQVBFMi4wAwEAAAAh%2BQQJGQAAACwFAAEACgASAEAFTSAAEEEZEGIaHEaQjkIso0BQMPdRuPAwFAMBiiAwmYSiFUPHExF9yJ5viiQUgL7C8CCTaWHXQiIKLpCThkEz%2BfM1A9mpi2io26MkEy0EACH5BAkKAAAALAUAAQAKABIAQAVNIAAQQRkQYhocRpCOQiyjQFAw91G48OAPAhRBYDIFRSuGjica%2Bo69QqJwAAp%2Fv6tMVhAKCuAEFAYeIw0DJtJXZQZ8hZ9raKjboSQTLQQAIfkECRkAAAAsBQABAAoAEgBABVEgABBBGRBiGhxGkI5CLKNAwBTDcDAurOcCFEFgMgVFgQTjUOiJhkDasJCgFg5HQm47EGJlsS6MyUgcnwLqWWUYOJEDnFsVv%2BJcQ4N%2BfyaZaCEAIfkECRkAAAAsBQABAAoAEgBABUsgABBBGRBiGhxGkI5CLKNAwAw47sLFkRQCFEFgMgVFgQTjUNiJhoPDkff7SYW5HFYmGwgFh9yUOkYaBk5k1rkq9ApomGFOn5JMtBAAIfkECRkAAAAsBQABAAoAEgBABU0gABBBGRBiGhxGkI5CLKNAMNy4CydHUQgogsBkAooChUFPJxLejLBCQlo4GAk4XHAgkw2Cgiw0mhgfDQPmceA7MJFtn0toqNuhJBMtBAAh%2BQQJGQAAACwDAAEADwASAEAFdiAgjmJVGWQaZIclBEiKBErwNGkuNtEQvTBCQ1AoHgqcgC7VmCEGTp1jQKUuKoABgACbDBbKFEXwMEgShQ1kyZxGdYGFoPY0YFWL6lxAySkwVi8yAQISAxcOKQQOCBNoBR04igEGFgVHAhpwCmRmmWwIEA0ESyEAIfkECRkAAAAsAgAFABAACgBABUEgQBBAaZ4jEAhCQJ5iMLRrURzFYAx8Twu81ouwCgZqtsOvNzuyXLBYc5UoJKZAnzOBwxV2zB9OWCJmW6JXtEwKAQAh%2BQQJGQAAACwCAAEADwASAEAFdyAgAoazjCiKBIJ1ZEgqA88TKEEMEKsiRIWIY5YKGAZIpKIBWCEKCEXkJKMsCljskDgKLAaTKIEIOQ4MhoeAInIWHEyZQQG9CRaBqsCXxZPvWBgKXCQOFwMSARA6Mw0TEkhhDmMpAgJJFgYBlCiWaGo4XAQNiyMhADs%3D";
var hideBild="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAADhgAAA4YBfPt6aAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAOuSURBVDiNfZVPTFRXFMa/eQ8GLA36NGUSa7GYjEktCMxEAkmbLt4oSSEyo8Wp7WitkkhJMCau2BDAJqZxYy3TNtZ02nTTZauA4k6TkjTRrvgz0rRJF5ZKYuyDmccwyPy6mDICot/2nvO795z7nXs92kBIXkkRVVSc0JMn9VpaelmSVFycUlHRb5qd/U7STx4pu1H+WpjX+wFlZf9y9OgcIyMwN0dBc3MwPAzRqINlzWCah58Pkkws6ysCAYe9e+H2bV6o+/ehrs7BsuJI5rNAy/qaQ4fmWVyEsTEIBGB5+cXQTAbC4XksK76+zCiBgMPi4tPgaBQSCVKpFBMTE0xMTJBKpTaG1tU5hfKRvGzdOsP0dCFmYWGBxMAAD0pKqK2qIhQKEQqF2LVrF42NjQwODpLJZNaWv3nzDFKJISmi5uYy+f2SpJGREdXU1Oje7KyMWEyfv/GqcnZOOTunYz3HFI/HNTU1perqat28eTNf4u7dUnPzS5IOioqKG9y4AUBvby/BYJBkMonrurSce4c/tovX3xebPtnEqelTtH3ahuu6TE1NEQwG6evry59yaAh8viGxZcs/Ocehu7ub1tZWXNfNw6/0ojFxwhI/SkSjUQB6/uqh90ovQH7TlhbOnDlD7vFjsKwZUV4+F4vFiEQiZLPZQlv2X9yPTgvDEL9KhEpL6ejoYNvZbRy4eKAQl81mCYfDxGIxKC+fNyR5TNOUYRhrbt4jj5STioq8Oivps0xG3169qkfuo/zaikNAhmHINE1JwpBhpBOXL2vHjh0Kh8NaWFiQJDWUN0gfS/va9ilpWfpd0vFXJB2XmqwmSZLruopEIqqsrFTi0iXJNNPC5xtmeBiA/v5+AoEAk5OTuK6L3WOjX4ROi9c+FH9uF++eewvXdRkfH6e+vp6BgYF87deugc93TUhHiEadlZ6Mjo7i9/vp6uri7t279H3Th33Bxr5gc7vlbf4+eZLOzk78fj+3bt166sX2dgfpPSEVY1kzTE6uMn+GeDxOU1MTVVVV2LaNbdu8uXMnD0pL+eH8eRZXT1UyuWJs78rotVNb67Da/f8rnU4XRi+dTkMikR/L1aNXU+NgmuH1j8OXhMPzG0HXaHkZGhrgzp087ODBeSzr8vOerzi1tQ7J5IuhY2OwZ0/+ZJb1BZLxDLAANs3DWNYMR444DA2B4zwFOQ5cv56/gLKyx5hm+/p8z4bQfHPb5PN9pKWloLLZ/Bfg9c6ruPieHj78XtLPHmlpfe5/8AJEBCWPEIMAAAAASUVORK5CYII=";
var showBild="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAATCAYAAAByUDbMAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAADYgAAA2IByzwVFAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAH8SURBVDiN7ZPfa1JhHMafWUvz7BDou05XhXiztmO1LrpsSD92Ie5OMKL/pAMjuli7aN5uEFujEAJBB5osltLuPQ5GdKUoMhR1bqB2xg7n6cK2ibSG93tu3/f58Hyf7/sClxpWIxecTwK4b7PZFMuyagB2APwcBmZzOByvJEl64/V6Jb/ff93lcjn39/e7mUzmd6FQ6LTbbc0wjE8ArH7jlQHQHbfb/SMYDL6IxWI3D9wHzo2rG6Ob8ib2ru2Nzj2ec668W7lRqVSeVKvVcLfb/Qrg8F8p7wkhaul02iJJbVWj/budeApiAlz8ssiF4gK1NY0kmUqlLCFEDYBvEPRQUZRGPp8nSR4fH3MqMkU8AmEDATAajXL92zp9ER9N0yRJ6rpORVEaAKZPSbIsVxOJxC7JLMlss9ncdq25jjABYqQHA0BMguKDOGq1Wtsnd+Px+K4sy9X+ZNOKojR0XSdJmqZJNaISz8BAIHAGmwV9S2fJcrncSbIHg6P6hBC1VCp11tmWnZjtdYbnoH3LTm2111kymTy3s9NtCiF2wuHwYblcpraqUX2vUiwLqksq5z/Os1QqMRQKHQghdAC3+83nvbOXY2Njbz0ejzQzM+MYHx+X6vV6J5vNGsVisd3pdF4bhvH57/j/hfXrLno/4JZlWVUAeQC/LvBcagj9AQOTFPA21M6GAAAAAElFTkSuQmCC";

var grouHideList = []; // Groups it is already in. Will get refreshed every time you open the group-popup (start())
var grouplistalt = []; // Groups it is already in. Will get refreshed every time you open the group-popup (start())
var grouplist =[]; // List of all your groups (member). icon-path+chr(1)+name+chr(1)+title Update with updatebutton() -> getgroups from /mygroups/
var collist =[]; // List of all group-collections. uses same index as collistgroups. load at pagerefresh, save at add/remove item
var collistgroups =[]; //List of groups within a collection. pattern group+chr(1)+group. Same index as collist, same behavior
var temp="";
var user="";
var showHiddenGroups=false;

function getTargetAdress(tuser){
    if(/www.deviantart.com/.test(location.href)){
        return "https://www.deviantart.com/"+tuser.toLowerCase();
    }else{
        return "https://"+tuser.toLowerCase()+".deviantart.com";
    }
}

	// user=$("td#oh-menu-deviant span.username-with-symbol span.username").html();

function addStyle(tex){
	var sty=document.getElementById("dev_grouplist_style");
	if(sty===null){
		sty=document.createElement("style");
		sty.id="dev_grouplist_style";
		sty.innerHTML=tex;
		document.head.appendChild(sty);
	}else{
		sty.innerHTML+="\n"+tex;
	}

}
async function listverzlad(){
	if($===null || $("td#oh-menu-deviant span.username").length===0){setTimeout(listverzlad,500);return;}
	user=$("td#oh-menu-deviant span.username-with-symbol span.username").html();
	 // user="Pxtchwork";
	//Compatibility for old script after multi-user-usage

	var promises=[];
	promises.push((async function(){
		var tghl=await GM.getValue(user+"_groupHidelist","");
		if(tghl==="")grouHideList=[];
		else grouHideList=tghl.split(String.fromCharCode(21));
	})());

	promises.push((async function(){
		var tghl=await GM.getValue(user+"_grouplist","");
		if(tghl==="")grouplist=[];
		else grouplist=tghl.split(String.fromCharCode(21));
	})());

	promises.push((async function(){
		var tghl=await GM.getValue(user+"_collist","");
		if(tghl===""){
			collist=[];
			collistgroups=[];
		}else{
			var spl, str;
			var temp=tghl.split(String.fromCharCode(2));
			for(var i=0;i<temp.length;++i ){
					spl=temp[i].split(String.fromCharCode(1));
					str=spl.shift();
					collist.push(str);
					collistgroups.push(spl.join(String.fromCharCode(1)));
					$("#dev_group_col_add").append("<option>"+str+"</option>");
			}
		}
	})());

	return Promise.all(promises);
}


addStyle(".search_switch,.first_option{ display:none!important;}"+
	".submit_to_groups .container { overflow: visible!important;}"+
	"#dev_gle_update {position:absolute;left:-230px;cursor:pointer;text-decoration:none; bottom: 0px;}"+
	"#dev_gle_reset {position:absolute;left:-70px;cursor:pointer;text-decoration:none; bottom: 0px;}"+
	"#dev_group_but1,#dev_group_but2 {width:70px;cursor:pointer;}"+
	"#group_list_search{font-size: 9pt;font-weight: bold;}"+
	"#group_list_search input{margin-left: 10px;margin-bottom: 10px;width: 80%;}"+
	".second_option .number{display:none}"+
	".submit_to_groups .favourite_groups{height:250px!important; margin-bottom: 20px;}"+
	"div.item{width: 99%!important;position:relative;}"+
	'#dev_group_col_text{margin-bottom: 10px;height: 14px;position: relative;width: 175px;z-index: 1;border: 0 solid;}'+
	'#dev_group_col_add{height: 20px;margin-left: -176px;position: relative;width: 199px;}'+
	'#dev_group_col_title{font-size: 12pt;font-weight: bold;text-align: center;}'+
	'#dev_group_but1{float:left;}'+
	'#gallery_selection{margin:0px!important;}'+
	'#dev_group_but2{float:right;}'+
	'#gallery_selection{width:50%;}'+
	'#group_stat2{margin-left: 50px;}'+
	'div.submit_to_groups div.container div.submit_button a.submit{margin:0px!important; }'+
	'div.devGrHidden{background-color:#555;}'+
	'#dev_group_col{background-color: #D4DFD0;border: 1px solid #AAB5AB;border-radius: 5px 5px 5px 5px;line-height: 30px;margin-left: -8px;margin-top: 20px;padding:  5px 10px 35px 5px;text-align: left;width: 100%;}'+
	'div.dev_groupList_hideBut{display: inline-block;width: 20px; position: absolute;top: 25px;right: 5px;height: 20px;cursor:pointer;}'+
	'div.dev_groupList_hideBut.hide{background: url("'+hideBild+'");}'+
	'div.dev_groupList_hideBut.show{background: url("'+showBild+'");}');
// Get groups you are member of from /mygroups/. used by updatebutton $(a"#dev_gle_update").click()
// recursive function for more groups than 100
function getgroups(offset, by) {
	//updatebutton changes text and gets wating-icon
	$.get(getTargetAdress(by)+'/modals/mygroups/?offset='+offset,function(data){
		// get all grounames(2) as they are text between a-tags, image-paths (1) for their icon and titles(3) between span-tags
		var doc=$(data);
		var grps=doc.find("div.mygroup");
		grps.each(function(){
			var grpLink=$(this).find("img.avatar").attr("src");
			var grpUser=$(this).find("a.group.username").html();
			var grpReal=$(this).find("span.realname").html();
			grouplist.push(grpLink+String.fromCharCode(1)+grpUser+String.fromCharCode(1)+grpReal);
		});
		if(grouplist.length===0){
			console.log("There is an error fetching groups!\n"+getTargetAdress(by)+'/modals/mygroups/?offset='+offset+"\n"+data);
			return;
		}
		$("#dev_group_list_loadingbutton").attr("title",(offset+100)+"groups scanned!");
		// check if browsing needed (>100 groups) when having a not-disabled  Next-Button
		if(doc.find("li.next a.disabled").length===0){
				GM.setValue(user+"_grouplist",grouplist.join(String.fromCharCode(21)));	// Back up current state
				getgroups(offset+100,by); //100 groups per page, recursive call
		}else{
			grouplist=grouplist.sort().reverse(); // inserting them is upside-down
				GM.setValue(user+"_grouplist",grouplist.join(String.fromCharCode(21)));	// Back up current state
				$("#dev_gle_update").html("Update List of Groups<b></b>"); //updatebutton back to normal
				start(); //show current list of groups/highlight them etc (basicly restart script)
		}
    });
}

//Get groups the deviation is already in from difi using "getAllGroups"
//used every time the group-dialog is opened
function getaltgroups(){
	if(grouplistalt.length>0){markaltgroups();return true;} //unnecessary calls won't contact difi again. to contact, clear grouplistalt first!
	var devid=$("div.dev-title-container h1 a").first().attr("href").match(/\d+$/i); //deviation-id
	var duser=$("div.dev-title-container h1 a.u").html(); //author's name toLower
	console.log(grouplistalt,duser,"https://www.deviantart.com/global/difi/?c[]=%22DeviationView%22,%22getAllGroups%22,["+devid+"]&t=xml");
	$.ajax({
			mimeType: "text/html; charset=ISO-8859-1", //sometimes some strange behavior without charset...
			url: "https://www.deviantart.com/global/difi/?c[]=%22DeviationView%22,%22getAllGroups%22,["+devid+"]&t=xml"
		}).done(function(data){
			// Only group-links on this page, so target-account->groupaltlist
			var rex=/gmi-groupname=&quot;([^\/]*?)&quot;/gi;
			var iter="";
			while ((iter=rex.exec(data))!==null)
			{
			  grouplistalt.push(iter[1]);
			}
			markaltgroups();//gray out groups where it's already in
		});
}

//group's css is changed and xml-attribute "deakt" added. eventhandler doesn't load difi when deakt set
function markaltgroups(){
	for(var i=0;i<grouplistalt.length;++i){
		var so=$("#"+grouplistalt[i]);
		so.css("background-color","#b2bbae");
		so.find("span").css("color","#ddd");
		so.attr("deakt","true");
	}
}

//sets css-atribute "display" of groups to none or remove it depending on filter-method.
//leading * will search collgroups for match
//leading # will deactivate this function. handler for this is defined in inserted code
function filter(){
	if($("#group_list_search input").length===0)return true; //too early calls will stop function
	if($("#group_list_search input").val().indexOf("#")===0){$("div.item").show();return true;} //leading # will stop function and show everything
	if($("#group_list_search input").val().indexOf("*")===0){ //leading * searches for collections
		var zielopt=$("#dev_group_col_add option").filter(function(){
			//search case-insenstive for groups containing pattern. [change >-1 to ==0 for leading instead of containing]
			return ($(this).html().toLowerCase().indexOf($("#group_list_search input").val().substr(1).toLowerCase()) > -1);
		});
		if(zielopt.length===0)return true; //abort when no existing collection is found
		$("#dev_group_col_add").val(zielopt.html()); //select the collection in the dropdown-list for colshow
		colshow(); //shows the groups of the currently selected collection
		return true;
	}

	//For normal text without leading * or #:

	//try to create Regexp. if it fails, the Regexp is not valid, text-field is marked red and function aborted
	var rex;
	try {rex=new RegExp($("#group_list_search input").val(),"i");}catch(e){$("#group_list_search input").css("background-color","red");return true;}
	$("#group_list_search input").css("background-color",""); //normal searchfield for valid Regexp
	var curshowlist=$("div.item");
	curshowlist.show();//.css("display","");//everything shown
	curshowlist.each(function(){
		var groupnam=$(this).attr("id");//get name of group
		if((!showHiddenGroups && grouHideList.indexOf(groupnam)!=-1) || groupnam.search(rex)==-1){
			$("#"+groupnam).hide();//.css("display","none");//if group doesn't match string, make the group-item disappear
		}
	});
	if(showHiddenGroups){
		for(var i=0;i<grouHideList.length;++i){
			$("#"+grouHideList[i]).addClass("devGrHidden").find("div.dev_groupList_hideBut").removeClass("hide").addClass("show").attr("title","undo hide");
		}
	}
}

// save collections into GM "collist"
function colsave(){
	var tmp="";
	for(var i=0;i<collist.length;i++){
		tmp+=String.fromCharCode(2)+collist[i]+String.fromCharCode(1)+collistgroups[i];
	}

	//crazy workaround for not being able to call GM_setValue from an unknwon window directly: wait 0s to call an anonymous function with it.
	GM.setValue(user+"_collist",tmp.substr(1));
}

// load collections from collist into dropdownfield
function colload(){
	$("#dev_group_col_add").empty();
	for(var i=0;i<collist.length;i++){
		$("#dev_group_col_add").append("<option>"+collist[i]+"</option>");
	}
}

//Add new collections to collist, collistgroups, the dropdown and saving
function coladd(){
	//Only collections with groups should get saved, so this only works with a group selected and a name for the collection inserted
	var colnam=$("#dev_group_col_text").val();
	var groupnam=$("div.item.selected").first().attr("id");
	if(colnam===""||groupnam===""||typeof groupnam=="undefined"||typeof colnam=="undefined")return true;

	if(collist.indexOf(colnam)==-1){ //create new collection
		//Standard-prompt (Yes, Cancel) should be enough for this:
		if(!confirm("You are about to create a new group-collection!\n Do you want to continue?"))return true;
		collist.push(colnam);//Adding items to arrays
		collistgroups.push(groupnam);
		$("#dev_group_col_add").append("<option>"+colnam+"</option>");
	}else{ //add group to existing collection
		if(collistgroups[collist.indexOf(colnam)].split(String.fromCharCode(1)).indexOf(groupnam)==-1){
			//new group for collection: add the group-name and delimiter to the end of the collection-item's groupname's array
			collistgroups[collist.indexOf(colnam)]+=String.fromCharCode(1)+groupnam;
		}else{ //group is already added
			//again simple prompt should be enough here...
			alert("Group already in group-collection!");
			return true;
		}
	}
	colsave(); //save to GM
}

//Remove group from list. Empty groups will get deleted
function colrem(){

	//Only collections with groups should get saved, so this only works with a group selected and a name for the collection choosen in dropdown
	var colnam=$("#dev_group_col_add").val();
	var groupnam=$("div.item.selected").first().attr("id");
	if(colnam===""||groupnam===""||typeof groupnam=="undefined"||typeof colnam=="undefined")return true;

	//check if group really in collection
	if(collistgroups[collist.indexOf(colnam)].split(String.fromCharCode(1)).indexOf(groupnam)==-1){
		//again simple prompt should be enough here...
		alert("Group not in collection!");
	}else{ //remove group:
		//get index of group in collection's groupname's list and remove this entry from array
		var tmp=collistgroups[collist.indexOf(colnam)].split(String.fromCharCode(1));
		tmp.splice(tmp.indexOf(groupnam),1);
		collistgroups[collist.indexOf(colnam)]=tmp.join(String.fromCharCode(1));

		if(collistgroups[collist.indexOf(colnam)]===""){ //empty collections should get removed
			collistgroups.splice(collist.indexOf(colnam),1); //remove collection's groupnamelist
			$("#dev_group_col_add option").filter(function(){return $(this).html()==colnam;}).remove(); //remove option from dropdown
			collist.splice(collist.indexOf(colnam),1); //remove collection from array
			$("#group_list_search input,#dev_group_col_text").val("");filter(); //clear textboxes and show all groups again
			if(collist.length>0){$("#dev_group_col_text").val(collist[0]);} //if there is another collection, select it instead, but don't show groups yet
		}else{ //collection still has groups
			colshow(); //show the groups
		}
		colsave(); //save to GM
	}
}

//shows the groups of currently selected collection, used by filter()
function colshow(){
	var colnam=$("#dev_group_col_add").val();//selected collection-name of dropdown
	$("#dev_group_col_text").val(colnam); //textfield get's dropdowns value as text
	if(colnam===""||typeof colnam=="undefined")return true; //nothing selected, e.g. when nothing is in
	$("div.item").hide();//hide all groups at first
	var aktgroups=collistgroups[collist.indexOf(colnam)].split(String.fromCharCode(1)); //get an array of groups of the currently selected collection
	for(var i in aktgroups){
		if($("#"+aktgroups[i]).length===0){ //you are not a member of a group you have added to collection!
			 // findOpenFolders(2) will add an entry for "groupname" at the top of group's list
			codeinsert("groupname='"+aktgroups[i]+"';findOpenFolders(2);");
		}else{//you are member of the group
			$("#"+aktgroups[i]).show(); //show group
		}
	}
}

// Some scripts must be inserted as Difi needs some authorization-informations for group-submit-permissions
function codeinsert(cont){
	var script = $('<script></script>');
	script.attr("type", "application/javascript");
	script.html(cont);
	$('body').append(script);
	// document.body.removeChild(script);//shall the site-sourcecode be tidy^^
	script.remove();//shall the site-sourcecode be tidy^^
}
function importCollist(event){
	if(!confirm("Do you really want to import this file and overwrite your collections?"))return true;
	var reader;
	if (window.File && window.FileReader && window.FileList && window.Blob){reader = new FileReader();}else{
		alert("Feature not supported by your Browser!");
    }
	if(event.target.files && event.target.files[0]){
		reader.onload=function(e){
			var filecontent=e.target.result;
			var obj=JSON.parse(filecontent);
			var prom=[];
			for(var el=0;el<obj.length;el++){
				prom.push(GM.setValue(obj[el][0],obj[el][1]));
			}

			Promise.all(prom).then(listverzlad);

			// listverzlad();
			// start();

			return true;
		};
		reader.readAsText(event.target.files[0]);
	}
}
async function exportCollist(){
	//var GMVal = [];
	var obj=[];
	var lis=await GM.listValues();
	for (var val=0;val<lis.length;++val) {
		obj.push([lis[val],await GM.getValue(lis[val],"")]);
	}
	var str=JSON.stringify(obj);

	var blob = new Blob([str]);
	var a=$("#dev_grouplist_export_download");
	if(a.length!==0){
		a.remove();
	}
	a=$('<a class="" style="margin-left: 10px; position: absolute; left: 170px; width: auto; bottom: 10px;" href="#" download="dev_group_list_DB.txt" id="dev_grouplist_export_download">download</a>');
	$("div.submit_to_groups_navigation a.smbutton").first().after(a);
	a.attr("href",window.URL.createObjectURL(blob));
	var evObj = document.createEvent('MouseEvents');
	evObj.initMouseEvent('click',true,true,window,0,0,0,0,0,false,false,false,false,0,null);
	a.get(0).dispatchEvent(evObj);
}

//Dialog is opened, so custom code need to be inserted and script initialized. Recursive call for loading-time
function start(){
	if($(".submit_to_groups").length>0){//&&$("div.item").length>0){ //Loading successful => submit_to_groups-div is appearing
	//vast amount of code to copy/alter some built-in functions to use Difi's GrusersSubmitToGroupsModule.check_permissions//I changed not much to make it still work no wrapper-function so I can use the functions from other codeinserts as well

    if($("#dev_grouplist_exportBut").length!==0)return;
	$("div.submit_to_groups_navigation a.smbutton").first().after($('<a class="smbutton smbutton-size-small smbutton-pale smbutton-shadow" style="margin-left: 10px; position: absolute; right: 10px; width: auto; bottom: 0px;" href="#" onclick="return false">Show Hidden groups</a>').click(function(e){
		e.preventDefault();
		e.stopPropagation();
		showHiddenGroups=!showHiddenGroups;
		filter();
	}));
	$("div.submit_to_groups_navigation a.smbutton").first().after($('<a class="smbutton smbutton-size-small smbutton-pale smbutton-shadow" style=" padding:2px;margin-left: 10px; position: absolute; left: 10px; width: 150px; bottom: 0px;" href="#" onclick="return false" id="dev_grouplist_exportBut">Export Collection List</a>').click(function(e){
		e.preventDefault();
		e.stopPropagation();
		exportCollist();
	}));
	$("div.submit_to_groups_navigation a.smbutton").first().after($('<a class="smbutton smbutton-size-small smbutton-pale smbutton-shadow" style="margin-left: 10px; position: absolute; left: 10px; width: 150px; padding: 2px; bottom: 22px;" href="#" onclick="return false">Import Collection List</a>').click(function(e){
		e.preventDefault();
		e.stopPropagation();
		var el=document.createElement("input");//		<input type='file' id='import_file' value='import' style='display:none;'/>
		el.type="file";
		try{
			var evObj = document.createEvent('MouseEvents');
			evObj.initMouseEvent('click',true,true,window,0,0,0,0,0,false,false,false,false,0,null);
			el.dispatchEvent(evObj);
		}catch(ex){
			el.style="position: absolute; left: 180px; width: 40px; bottom: 30px;";
			$("div.submit_to_groups_navigation a.smbutton").first().after(el);
		}

        el.addEventListener("change",importCollist,false);
	}));

	var templ=" <div class='item' id='{id}'><table><tbody><tr><td width='100' align='right' class='group_icon'><img ></td> <td valign='top' class='group_info'>#<span class='fakelink'>{id}</span><br><span class='group_tagline'>{tagline}</span></td></tr></tbody></table><div class='dev_groupList_hideBut hide' title='Hide Group'></div></div> ";
	codeinsert("var $submit_to_groups = $('div.submit_to_groups');"+
				"var is_gallery = true;"+
				"var groupname = null;"+ //this group well get informations
				"var deviationid = $submit_to_groups.find('input[name=\"deviationid\"]').val();"+ //this deviation
				"var lastsearchvalue = '';"+
				"var findOpenFolders = function(wert) {"+ //when you click a group-entry, this will search for/show permissions and submitting-panel
					"$('div.submit_to_groups_navigation.bottom-bit a.submit').addClass('disabledbutton');"+
				   "$submit_to_groups.find('div.submit_button, div.option_2_box, div.error_message, div.selected_group_info, div.success_message').hide();"+
					"DiFi.pushPost('GrusersSubmitToGroupsModule', 'check_permissions', [groupname, deviationid, is_gallery], function(success, data) {"+
						"$submit_to_groups.find('img.groupname-check-img').hide();"+
						"if(success) {"+
							"if (data.response.content.groupname == groupname) {"+
								"if(wert>0){"+ //insert the group's entry in the grouplist when wert>0 (in use: 1 and 2)
									"if($('div'+data.response.content.groupname).length==0){"+
										// "s=$('div.item').first().clone(false);"+
										"s=$(\""+templ+"\");"+
										"var si=data.response.content.grouphtml.match(/<table>[\\s\\S]*<\\/table>/i)[0];"+
										"s.html(si);"+
										"s.attr('id',data.response.content.grouphtml.match(/<span class=\\\"fakelink\\\">(.*?)<\\\/span>/i)[1]);"+
										"s.attr('style','');"+//to make it visible (what a bug...)
										"var alphabetorder=$('div.item').filter(function(){"+
										"return ($(this).attr('id').toLowerCase()>s.attr('id').toLowerCase());"+ //only groups with letters after your term, then take the first and insert before
										"});"+
										"alphabetorder.first().before(s);"+ //alphabetcal insertion
										"$('div.favourite_groups').scrollTop(s.position().top-s.height());"+ //scroll to new insertes item
										"clickeventer();"+	//make the entry selectable
										"if($('div.deepee-navtabs a.tab.selected').hasClass('left'))deaktsubmit(); else deaktfav();"+
									"}"+
								"}"+
								"if(wert!=2){var galleries = data.response.content.folders;"+//don't prove permissions when wert=2
									"$submit_to_groups.find('#gallery_selection > option').remove();"+
									"$.each(galleries, function(folderid, galleryname) { "+
											"$submit_to_groups.find('#gallery_selection').append('<option value=\"' + folderid + '\">' + galleryname + '<\/option>'); "+
										"});"+
									"$submit_to_groups.find('.option_2_box,.submit_button').show();"+
									"$submit_to_groups.find('.option_2_box').toggleClass('listmode', $submit_to_groups.find('.favourite_groups').is(':visible'));"+
									"if ($submit_to_groups.find('div.selected_group_info').length>0&&$submit_to_groups.find('input#manual_input').is(\":checked\")) {"+
										"$submit_to_groups.find('div.selected_group_info').replaceWith(data.response.content.grouphtml).show();"+
								"}}"+
							"}"+
						"} else {"+
							"if (data.response.content.groupname == groupname) {"+
								"$submit_to_groups.find('div.error_message').show().find('span').text(data.response.content.errormessage);"+
							"}"+
					   "}"+
					"});"+
					"DiFi.send();"+
				"};"+
				"function clickeventer(){$submit_to_groups.find('div.favourite_groups div.item').click(function(e) {"+ //makes groups selectable
					"$submit_to_groups.find('div.favourite_groups div.item').removeClass('selected');"+
					"groupname = $(this).addClass('selected').attr('id');"+
					"if($(this).attr('deakt')=='true')return true;"+ //just select but don't send permission-request when item has "deakt"-attribute
					"e.preventDefault();"+
					"$submit_to_groups.find('div.favourite_check img.groupname-check-img').show();"+
					 "$submit_to_groups.find('input[name=\"groupname\"]').val(groupname);"+
					"findOpenFolders();"+
			   "});}"+
			   "function deaktsubmit(){"+
			   "is_gallery=true;"+ //submitting-to-Gallery is clicked here, so grey out groups it is submitted to
			   "$('.second_option').html('Submitting to:');"+//I remove step 1, so here there should be a "2."
			   "var so=$('div.item[deakt]');"+
			   "so.css('background-color','#b2bbae');so.find('span').css('color','#ddd');so.attr('deakt','true');"+
			   "}"+
			   "$('.deepee-navtabs .first').click(deaktsubmit);"+
			   "function deaktfav(){"+
			   "$('.deepee-navtabs .last').click(function(){is_gallery=false;"+ //suggesting-to-Favourite is clicked. As I don't have a List of this, don't gray out.
			   "$('.second_option').html('Suggesting to:');"+//I remove step 1, so here there should be a "2."
			   "var so=$('div.item[deakt]');"+
			   "so.css('background-color','');so.find('span').css('color','');so.attr('deakt','false');});"+
			   "}"+
			   "$('.deepee-navtabs .last').click(deaktfav);");

		// When there are no groups you are member of saved, try to get them now, start() is called again afer that
		if(grouplist.length===0){updatebutton();$("#dev_gle_update").click();return true;}

		$("div.item").first().css("display","");//make sure the first group-item is visible

		var s=$(templ);
		$("div.item").remove();
		//take an entry of the list of groups you are member of, alters the s-clone to match the right properties, insert the clone, clone the clone into a new s-clone and repeat
		for(var i=0;i<grouplist.length;++i){
			s.find("img").attr("src",grouplist[i].split(String.fromCharCode(1))[0]);
			s.attr("id",grouplist[i].split(String.fromCharCode(1))[1]);
			s.find(".fakelink").html(grouplist[i].split(String.fromCharCode(1))[1]);
			s.find(".group_tagline").html(grouplist[i].split(String.fromCharCode(1))[2]);
			s.html(s.html().replace(/(<img.*?)">/g,"$1\"/>").replace(/<br>/g,"<br/>"));
			$("#submit_to_groups_container.submit_to_groups_container div.ppp div.container div.favourite_groups").prepend(s);

			// $("div.item").first().before(s); //items will get inserted at the top, so grouplist is upside-down sorted.
			s=s.clone(false);
		}
		$("div.item[dele=true]").remove(); //remove all old list-entries

		//insert html for the collection-panel on the left. notable: the combobox is a textbox next to a dropdown that is so positioned that it appears to be one element. textbox and dropdown are connected via event-handler
		if($("#dev_group_col").length===0){
			$(".submit_to_groups .stream").append("<div id='dev_group_col'><div id='dev_group_col_title'>Group-Collections</div><div><input type='radio' id='group_stat1' checked='true' name='group_stat'/><label for='group_stat1'>Add</label><input type='radio' id='group_stat2' name='group_stat'/><label for='group_stat2'>Remove</label></div><span style='float: left;'>*</span><input type='text' id='dev_group_col_text'><select id='dev_group_col_add'></select><a class='gmbutton2 gmbutton2c' id='dev_group_but1'>OK<b></b></a><a id='dev_group_but2' class='gmbutton2 gmbutton2c'>Show<b></b></a></div>");
		 }

		colload();//load collection-options into dropdown-field

		//some nice event-handlers for clicking or typing somewhere. These are added, no replacement!
		//attribute clicker is set to not accidentally add more event-handlers to an element.
		$("#dev_group_col_text").keypress(function(e){if(e.which==13){if($("#group_stat1:checked").length>0)coladd();else colrem();}});
		$("#dev_group_but1,#dev_group_but2").attr("onclick","return false;");
		$("#dev_group_but1:not([clicker])").click(function(){if($("#group_stat1:checked").length>0)coladd();else colrem();});
		$("#dev_group_but2:not([clicker])").click(function(){colshow();$("#group_list_search input").val("*"+$("#dev_group_col_add").val());});
		$("#dev_group_col_add:not([clicker])").change(function(){$("#dev_group_col_text").val($(this).val());});
		$("#dev_group_col_add:not([clicker]) option").click(function(){$("#dev_group_col_text").val($(this).html());});
		$("#dev_group_col_add:not([clicker])").keyup(function(){$("#dev_group_col_text").val($(this).val());});
		$("#dev_group_col_add:not([clicker]),#dev_group_but1:not([clicker]),#dev_group_but2:not([clicker])").attr("clicker","true");

		codeinsert("clickeventer();"); //makes all group-items clickable


		$("div.dev_groupList_hideBut").click(function(){
				var hideGr=$(this).hasClass("hide"); //hide group!
				var el=$(this).parent("div.item");
				var groupnam=el.attr("id");
				if(hideGr){
					$(this).removeClass("hide").addClass("show").attr("title","Undo Hide");
					grouHideList.push(groupnam);
					el.addClass("devGrHidden").hide();
				}else{
					$(this).removeClass("show").addClass("hide").attr("title","Hide Group");
					grouHideList.splice(grouHideList.indexOf(groupnam),1);
					el.removeClass("devGrHidden");
				}
				// setTimeout(function(){
					GM.setValue(user+"_groupHidelist",grouHideList.join(String.fromCharCode(21)));
				// },0);
				filter();
			})
		filter(); //shows groups that matches textbox. not necessary here, as textbox is empty and groups are already shown

		getaltgroups(); //gray out groups it is submitted to
		updatebutton(); //add the grouplist-update-button if not already added.


	}else{setTimeout(start,1000);grouplistalt =[];return true;} //if loading isn't ready yet, wait 1s.
}

//this watches you and adds an event everytime the deviantart's javascript adds a submit-to-groups-link to the site.
function startwatch(){
	if($===null || $("div.submit_to_groups_button:not([gestart])").length<0)return;
	var affected=
		$("div.submit_to_groups_button:not([gestart])").click(start).attr("gestart","true").length;
	//only one event per click please^^
	if(affected.length>0)clearInterval(starter);
}

//insert group-list-update-button and search-bar if not already inserted
function updatebutton(){
	if($("#dev_gle_update").length===0){
		var but=$("<a></a>");
		but.html("Update list of groups<b></b>");
		but.attr("class","gmbutton2 gmbutton2c");
		but.attr('id',"dev_gle_update");
		$(".container").first().append(but);
		but.click(function (){grouplist=[]; setTimeout(function(){
			$("#dev_gle_update").html("<img alt='loading groups' id='dev_group_list_loadingbutton' title='loading groups...' src='"+wartbild+"' style='position:relative;top:3px;margin-left:-10px;' />Update List of Groups<b></b>");
			getgroups(0,user);
		},0);});

		but=$("<a></a>");
		but.html("Reset<b></b>");
		but.attr("class","gmbutton2 gmbutton2c");
		but.attr('id',"dev_gle_reset");
		$(".container").first().append(but);
        but.click(function (){
            var resp = confirm("This will delete the internal database. You will loose all collections. Continue?")
            if(resp){
                GM_listValues().map(GM_deleteValue);
                location.reload();
            }
		});

		$(".submit_to_groups .container").prepend("<div id='group_list_search'>Search: <input type='text' /></div>");
		$("#group_list_search input").keyup(filter);

		//searchbarevent for leading #: search difi for the group and insert it in the list's top.
		codeinsert("$('#group_list_search input').keypress(function(e){"+
			"if(e.which==13&&$(this).val().indexOf('#')==0){"+
				"$('div.item').removeClass('selected');"+
				"var rex=new RegExp($.trim($(this).val()).substr(1),'i');"+ //search within groups case insensitive!
				"var alsel=$('div.favourite_groups div.item').filter(function(){"+
				"return ($(this).attr('id').search(rex)!=-1);"+
				"});"+
				"if(alsel.length==0){"+//no need to reload it when it is loaded
				"groupname = $(this).val();"+
				"findOpenFolders(1);"+ //will just add the group of groupnam to the list. 2 would check permissions, 0 is for internal use (update whole list)
				"}else{$(this).val(alsel.attr('id'));}"+
			"}});");
	}
}

if(!location.href.match(/AdServer/i)){ //some problems on deviantarts advertation-panels^^
	listverzlad();
	var starter = setInterval(startwatch,1000);
}
