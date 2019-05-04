// ==UserScript==
// @name           Nexus Clash Interface Tweaks
// @namespace      http://userscripts.org/users/125692
// @description    Various Tweaks to the Nexus Clash Browser Game Interface
// @include        http://nexusclash.com/modules.php?name=Game*
// @include        http://www.nexusclash.com/modules.php?name=Game*
// @exclude        http://nexusclash.com/modules.php?name=Game&op=disconnect
// @exclude        http://www.nexusclash.com/modules.php?name=Game&op=disconnect
// @grant none
// @version     1.6
// ==/UserScript==
//for nexus clash. this script
//   -adds a checkbox for each drop button and disables the button until the checkbox is checked.
//   -adds a checkbox for each skill button and disables the button until the checkbox is checked.
//   -adds a checkbox for leave faction button and disables the button until the checkbox is checked.
//   -make the message box a bit bigger
//   -colours hits red and misses pink.
//   -1.5 added make message box bigger on login if there are lotsa messages
//1.5.2  -bugfix for lock picking.
//1.5.3 -hide all clothing by default
//1.5.4 -bugfix no hiding armour (any wearable items with weight).
//1.5.5 -made inventory buttons not mess with inventory width
//      -hide clothing by default
//1.5.5 -new mouse over for inventory
//1.5.7 -Removed neutral icon replacement.
//1.5.8 -own name highlighted
//1.5.9 -added enchanting highlighting
//1.6   -yet more highlighting 
//      -fix door repair bug.
(function() {

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
	style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}
function addNamedGlobalStyle(css,idname) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.id=idname;
	style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}
// got this off http://stackoverflow.com/questions/4009756/how-to-count-string-occurrence-in-string
var timesCharExist=function(x,c){var t=0,l=0,c=c+'';while(l=x.indexOf(c,l)+1)++t;return t;};
//Just some constants
var SMWARNINGCOLOUR="red";        //colour for Sorcerers Might Status. To try and stop me wasting FAKs.
var LOWAPWARNINGCOLOUR="gold";    //colour for background of headings to signify low ap.
var LOWHPWARNINGCOLOUR="crimson"; //colour for background of heading when you have died (or are about to.)
var LOWHPBACKGROUNDCOLOUR="crimson";  //colour for backgound of text of AP and HP when low.
LOWAPBACKGROUNDCOLOUR="#fa8000";
//AND ADD SOME STYLES
//drop item checkbox
//addNamedGlobalStyle('table[align="right"]>tbody>tr:nth-of-type(3){visibility: hidden;}','magehideinventory');
addGlobalStyle('td.Magedropcell {position:relative;white-space: nowrap !important;overflow-x:visible;}\
td.MageNoWrap {white-space: nowrap !important;overflow-x:visible;}\
.magedropboxdiv{position:absolute;padding:0px;}\
form.magedropcheckbox{position:relative;padding:0px 3px 0px 0px;top:-5px;vertical-align:middle;}\
a.magesmallerdroptext{font-size:smaller;}\
a.MageHide { display: none ! important; }\
table[align="right"]>tbody>tr:nth-of-type(3) tr:hover{background-color:#ddddff!important;}');
/*
table[align="right"]>tbody>tr:nth-of-type(3) tr:nth-child(odd){background-color:#eeeeee;}\
table[align="right"]>tbody>tr:nth-of-type(3) tr:nth-child(even){background-color:#ffffff;}*/
//hide clothing
addGlobalStyle(".mageshowclothspan{font-size:smaller;position:relative;right:0px;top:-5px;z-index:1;display:inline;}\
.mageshowclothboxspan{position:relative;right:-40px;top:-25px;overflow-x:visible;display:inline;}\
tr.MageWearable{font-size:smaller;color:090909;}\
th.MageClothHeader{overflow:visible;position:absolute;font-size:.5em;display:inline;height:10px; }");

//this one is named so can be toggled.
addNamedGlobalStyle("tr.MageWearableHIDE{display:none;}","mageshowclothing");

//health bars
addGlobalStyle("td.MageHealthBar {background-repeat:no-repeat;background-position:left bottom;\
margin-bottom:0px;position:relative;top:-10px;\
background-image:url(data:image/gif;base64,R0lGODlhAQAFAIABAACZAP%2F%2F%2FywAAAAAAQAFAAACAoRdADs%3D);} \
td.MageHealthBar2 {background-repeat:no-repeat;background-position:left bottom; margin-bottom:0px;\
background-image:url(data:image/gif;base64,R0lGODdhAQAFAIACAAAAAP8AACwAAAAAAQAFAEACAoxdADs=);}");
/*addGlobalStyle(".bar{line-height=:1px;height:5px;display:inline-block;margin: 0 0 0 0;padding: 0 0 0 0;position:absolute;top:20px;#bottom:1px;background-color:#ff0000;left:0px;} \
.bar2{line-height=:1px;height:5px;display:inline-block;margin: 0 0 0 0;padding: 0 0 0 0;position:absolute;top:20px;#bottom:1px;background-color:#00ff00;left:0px;}");*/

//addGlobalStyle('.numberdiv{display:inline-block;padding:0 0 0 0;margin: 0 0 0 0;width:20px;position:relative;}');

//style for hp ap mp bars
addGlobalStyle('img.MageBarBck {position:absolute;left:1;top: 18;display:inline;z-index:0}\
img.MageBar {position:absolute;left:1;top: 18;display:inline;z-index:1}');

//styles for pet messages
/*addGlobalStyle('div.MagePetHit {font-size:smaller;color:lightcoral ! important;padding-left:4em;}');
addGlobalStyle('div.MagePetHitMe {font-size:smaller;color:red ! important;padding-left:4em;}');
addGlobalStyle('div.MagePetKill {font-size:smaller;color:crimson;padding-left:4em;}');
addGlobalStyle('div.MagePetMiss {font-size:smaller;color:#CAA083;padding-left:4em;}');
addGlobalStyle('div.MagePetHealOthers {font-size:smaller;color:5050aa;padding-left:4em;}');
addGlobalStyle('div.MagePetHealMe {font-size:smaller;color:0808aa;padding-left:4em;}');
addGlobalStyle('div.MagePetRejuv {font-size:smaller;color:aa50aa;padding-left:4em;}');
addGlobalStyle('div.MagePetDespawn {font-size:smaller;color:ff8000;padding-left:4em;}');*/
addGlobalStyle('div.MagePetHit {font-size:smaller;color:lightcoral ! important;padding-left:4em;} \
div.MagePetHitMe {font-size:smaller;color:red ! important;padding-left:4em;} \
div.MagePetKill {font-size:smaller;color:crimson;padding-left:4em;} \
div.MagePetMiss {font-size:smaller;color:#CAA083;padding-left:4em;} \
div.MagePetHealOthers {font-size:smaller;color:5050aa;padding-left:4em;} \
div.MagePetHealMe {font-size:smaller;color:0808aa;padding-left:4em;} \
div.MagePetRejuv {font-size:smaller;color:aa50aa;padding-left:4em;} \
div.MagePetDespawn {font-size:smaller;color:ff8000;padding-left:4em;}');
//styles for player attack messages
addGlobalStyle('div.MageAttackHit {color:red ! important;}\
div.MageAttackMiss {color:deeppink;}\
div.MageAttacked {color:red;font-weight:600}\
div.MageDoorRepair {font-size:smaller;padding-left:4em;} \
div.MageDoorKill {font-size:smaller;padding-left:4em;}');
//environmental damage
addGlobalStyle('div.MageAttackedbyEnvironment {color:red;font-weight:100}');
//player is healed
addGlobalStyle('div.MageHealed {color:0808aa;}');
//style for achievement messages
addGlobalStyle('div.MageAchievement {font-size:smaller;padding-left:4em;}\
span.MageAchievementColour {color:aa0000;}\
div.MageSpeech {color:dodgerblue;}\
div.MageAction {color:aaaaff;}\
div.MageWhisper{color:MediumOrchid;}\
span.MageMe{color:darkblue;}\
div.MageReceivedSomething{color:ff8040;}\
div.MageGaveSomething{color:ff9045;}\
div.MageCraft{color:8d4f9d;}\
div.MageSearchNothing{color:8c8c55;}\
div.MageSearchYay{color:8c8c00;}\
span.MageShadowText{color:e00f0f;}\
span.MageNameHighlight{background-color:ffff70;}');
    //this copied off the web
//http://stackoverflow.com/questions/9447950/script-to-save-settings
// for chrome
/*if (!this.GM_getValue || (this.GM_getValue.toString && this.GM_getValue.toString().indexOf("not supported")>-1)) {
    this.GM_getValue=function (key,def) {
        return localStorage[key] || def;
    };
    this.GM_setValue=function (key,value) {
        return localStorage[key]=value;
    };
    this.GM_deleteValue=function (key) {
        return delete localStorage[key];
    };
};*/

	
var newbox;
var acell;
var loc=location+'';//lol cludgy

/*
var isstart = document.evaluate(
	"//h2[starts-with(.,'Welcome back to Nexus Clash!')]", 
	document, 
	null,
	XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
	null
);

if (isstart.snapshotLength == 1) {
	//we on start screen.
	//Store max ap/hp/mp values.
	var charlinks = document.evaluate( 
		"//a[starts-with(@href,'modules.php?name=Game&op=character&id=')]",
		document,
		null,
		XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
		null );
	//charlinks.snapshotLength; //find<th>Character</th>
	var charid;
	var charmaxhp=50;
	var charmaxap=50;
	var charmaxmp=30;
	if (charlinks.snapshotLength > 1) {//found some charlinks
		var charlink=0;
		for (i=0;charlink=charlinks.snapshotItem(i);i++){
			//alert(i);
			charid=charlink.href.match(/id=(\d+)/)[1];
			
			charlink=charlink.parentNode.nextElementSibling.nextElementSibling;
			charmaxap=charlink.textContent.match(/\/(\d+)/)[1];
			
			charlink=charlink.nextElementSibling;
			charmaxhp=charlink.textContent.match(/\/(\d+)/)[1];
			
			charlink=charlink.nextElementSibling;
			charmaxmp=charlink.textContent.match(/\/(\d+)/)[1];	
			
			//now store em away
			GM_setValue("maxap"+charid,charmaxap);
			GM_setValue("maxhp"+charid,charmaxhp);
			GM_setValue("maxmp"+charid,charmaxmp);		
		} 
	}
return; //as that is all we want to do as none of the other tweaks apply on the start screen
}*/





//##############################################################################################################
//tweak whatever the count is now. 12 I suppose. BUT THIS ONE HAS TO GO FIRST.
//AS replacing HTML fubars eventlisteners
//highlight shadow text
//The occasional shadow can be glimpsed moving in the windows
if(document.getElementById("CharacterInfo")){
   var elementtosearch=document.getElementById("CharacterInfo").parentNode;
   elementtosearch.innerHTML=elementtosearch.innerHTML.replace(/(There are several shadows moving in the windows|The occasional shadow can be glimpsed moving in the windows)/,"<span class='MageShadowText'>$1</span>")
}


//##############################################################################################################
//TWEAK 1 - Drop Item Button Safeties
//if (loc.match(/buyskills/)){
//do the item drop first by assuming we are on the right page and just looking for things with the item_drop class
    var elementsDropButtons = document.getElementsByClassName('item_drop');
	if(elementsDropButtons.length>0){//skip if we have none
    var elementDropButton;
	var rchange=function(e) {
                var targetbutton=e.target.parentNode.previousElementSibling;//button should be next element
                if(e.target.checked){
                    //targetbutton.style.display='inline';
                    targetbutton.style.visibility='visible';
                }
                else{
                    //targetbutton.style.display='None';
                    targetbutton.style.visibility='hidden';
                }
            }
    for (i=0;i<elementsDropButtons.length;i++){
        elementDropButton=elementsDropButtons[i];
        if (!elementDropButton.hasAttribute('mageconfirmflag')){//see if flag not set
            elementDropButton.setAttribute('mageconfirmflag',1);//set flag
			//elementDropButton.className+=" magesmallerdroptext";
            newbox=document.createElement('input');
			newboxdiv=document.createElement('span');//the containing div
			newboxdiv.className="magedropboxdiv";
            newbox.type='checkbox';
            newbox.checked=false;
			newbox.className='magedropcheckbox';
            newbox.addEventListener("click",rchange,false);
            acell=elementDropButton.parentNode;
            acell.className='Magedropcell';//set class for nowrap so doesn't fubar page
            //acell.align='left';
			//newboxdiv.insertBefore(newbox,newboxdiv.firstChild);
			newboxdiv.insertBefore(newbox,null);
			//newboxdiv.appendChild(newbox);
            acell.insertBefore(newboxdiv,elementDropButton.nextElementSibling);
            //elementDropButton.style.display='None';
            elementDropButton.style.visibility='hidden';
        }
    }
	}
	
//TWEAK hide clothing	
//and while we are at it have a button to hide all the bloody clothing.
var inventoryheaders = document.evaluate(
	"//th[starts-with(.,'Item')]", 
	document, 
	null,
	XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
	null
	);
if(inventoryheaders.snapshotLength>0){
var inventoryheader=inventoryheaders.snapshotItem(0);//pick the first one
	
	//add a checkox to do the hide show.
	var showclothbox=document.createElement('input');
	var showclothspan=document.createElement('span');
	var showclothboxspan=document.createElement('div');
	showclothbox.type='checkbox';
	showclothbox.className='magedropcheckbox';
    showclothbox.checked=false;
    var rscbchange=function(e) {
	        var clothing=document.getElementById('mageshowclothing');
			if(e.target.checked){
                clothing.disabled=true;
            }
            else{
                clothing.disabled=false;
            }
        }
    showclothbox.addEventListener("click",rscbchange,false);
	var targetheader=inventoryheader.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling;
	targetheader.className="MageClothHeader";//make the show clothing text small
	showclothspan.className="mageshowclothspan";
	showclothboxspan.className="mageshowclothboxspan";
	//use 2 spans. one with the text and one with the checkbox?
	showclothspan.textContent="Show Clothing";//add text after so it can overflow.
	showclothboxspan.insertBefore(showclothbox,showclothboxspan.firstChild);//put the checkbox in a span
	targetheader.insertBefore(showclothboxspan,targetheader.firstChild);
	targetheader.insertBefore(showclothspan,targetheader.firstChild);
	
	
	//now look at inventory for clothing items and add to them the new css classes
	//get the rows with clothing. (wearable and weightless)
	var inventoryclothing = document.evaluate(
	"//tr[td/a/text()='Wear' and td/text()=0]", 
	inventoryheader.parentNode, 
	null,
	XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
	null
	);
	if (inventoryclothing.snapshotLength>0){
		var usableitem=0;
		for (i=0;usableitem=inventoryclothing.snapshotItem(i);i++){
			usableitem.className="MageWearable MageWearableHIDE";
		}
	}
	//olderway of doing it
	/*var usableitems=document.getElementsByClassName("item_use");
	var usableitem=0;
	for (i=0;usableitem=usableitems[i];i++){
		if(usableitem.textContent=="Wear"&&usableitem.parentNode.nextElementSibling.nextElementSibling.textContent=='0'){
			usableitem.parentNode.parentNode.className="MageWearable MageWearableHIDE";
		}
	}
	*/
    /*
  //right now whle we at inventory hide spellgem colours.   
    var inventorygems = document.evaluate(
	"//tr[contains(td/text(),'Spellgem')]", 
	inventoryheader.parentNode, 
	null,
	XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
	null
	);
    if (inventorygems.snapshotLength>0){//we have spellgems
        //set title text to color. Remove colour and move them to bottom of inventory
       var inventorygemrow=0;
		   for (i=0;inventorygemrow=inventorygems.snapshotItem(i);i++){
			    inventorygemrow.firstElementChild.textContent=inventorygemrow.firstElementChild.textContent.replace(/.*(Spellgem.*)/,'$1');
		   }  
    }
    
  //fuck it crude. now we have removed colours. Search again for spellgem rows and return sorted?

  var wornrow=  document.evaluate(
	"//tr[th/text()='Worn']", 
	inventoryheader.parentNode, 
	null,
	XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
	null
	);
   
  if (wornrow.snapshotLength>0){
      wornrow=wornrow.snapshotItem(0);
    
  var inventorygemrowparent=inventoryheader.parentNode.parentNode;
      for (i=0;inventorygemrow=inventorygems.snapshotItem(i);i++){
			     //inventorygemrowparent =inventorygemrow.parentNode;
           inventorygemrowparent.insertBefore(inventorygemrow,wornrow);
		   } 
  } 
   
    */
    
    
}	
	
	
//##############################################################################################################
//TWEAK 2 - learn spell gem buttons safeties
//now we do the spellgem learn buttons
    elementsDropButtons = document.getElementsByClassName('item_use');
	if(elementsDropButtons.length>0){
  //  elementDropButton;
  var rchange=function(e) {
                var targetbutton=e.target.nextElementSibling;//button should be next element
                if(e.target.checked){
                    //targetbutton.style.display='';
                    targetbutton.style.visibility='visible';
                }
                else{
                    //targetbutton.style.display='None';
                    targetbutton.style.visibility='hidden';
                
                }
            }
    for (i=0;i<elementsDropButtons.length;i++){
        elementDropButton=elementsDropButtons[i];
        if (!elementDropButton.innerHTML.match(/Learn/)){
        continue;
        }
        if (!elementDropButton.hasAttribute('mageconfirmflag')){//see if flag not set
            elementDropButton.setAttribute('mageconfirmflag',1);//set flag
            newbox=document.createElement('input');
            newbox.type='checkbox';
            newbox.checked=false;
            newbox.addEventListener("click",rchange,false);
            acell=elementDropButton.parentNode;
            //acell.className='MageNoWrap';//set class for nowrap so doesn't fubar page
            //acell.align='center';
            acell.insertBefore(newbox,elementDropButton);
            //elementDropButton.style.display='None';
            elementDropButton.style.visibility='hidden';
        }
    }
	}
/*//now we do the spellgem learn buttons
    elementsDropButtons = document.getElementsByClassName('item_use');
    elementDropButton;
    for (i=0;i<elementsDropButtons.length;i++){
        elementDropButton=elementsDropButtons[i];
        if (!elementDropButton.innerHTML.match(/Learn/)){
        continue;
        }
        if (!elementDropButton.hasAttribute('mageconfirmflag')){//see if flag not set
            elementDropButton.setAttribute('mageconfirmflag',1);//set flag
            newbox=document.createElement('input');
            newbox.type='checkbox';
            newbox.checked=false;
            var rchange=function(e) {
                var targetbutton=e.target.nextElementSibling;//button should be next element
                if(e.target.checked){
                    //targetbutton.style.display='';
                    targetbutton.style.visibility='visible';
                }
                else{
                    //targetbutton.style.display='None';
                    targetbutton.style.visibility='hidden';
                
                }
            }
            newbox.addEventListener("click",rchange,false);
            acell=elementDropButton.parentNode
            //acell.className='MageNoWrap';//set class for nowrap so doesn't fubar page
            acell.align='center';
            acell.insertBefore(newbox,elementDropButton);
            //elementDropButton.style.display='None';
            elementDropButton.style.visibility='hidden';
            
            
        }
    }
*/

//unhide inventory

addNamedGlobalStyle('table[align="right"]>tbody>tr:nth-of-type(3){visibility:visible!important;}','magehideinventory');
//document.getElementById('magehideinventory').disabled=true;



//##############################################################################################################
//TWEAK 3- craft button safety
//and now we do craft button
    //elementsDropButtons = document.getElementsByClassName('item_use');
    var elementsCraftButtons = document.getElementsByTagName('input')//get all input   
    var elementCraftButton;
	            var rchange2=function(e) {
				//alert("running");
                var targetbutton=e.target.nextElementSibling;//button should be next element
                if(e.target.checked){
                    //targetbutton.style.display='';
                    //targetbutton.style.visibility='visible';
                    targetbutton.disabled=false;    
                }
                else{
                    //targetbutton.style.display='None';
                    //targetbutton.style.visibility='hidden';
                    targetbutton.disabled=true;
                }
            }
    for (i=0;i<elementsCraftButtons.length;i++){
        elementCraftButton=elementsCraftButtons[i];
        if (elementCraftButton.type!="submit"||elementCraftButton.value!="Craft"){//but sometimes isn't
            continue;//well we tried to find it but couldn't so abort it all.
        }
        if (!elementCraftButton.hasAttribute('mageconfirmflag')){//see if flag not set
            elementCraftButton.setAttribute('mageconfirmflag',1);//set flag
            var craftbox=document.createElement('input');
            craftbox.type='checkbox';
            craftbox.checked=false;
            craftbox.addEventListener("click",rchange2,false);
            acell=elementCraftButton.parentNode;
            //acell.className='MageNoWrap';//set class for nowrap so doesn't fubar page
            //acell.align='center';
            acell.insertBefore(craftbox,elementCraftButton);
            //elementCraftButton.style.display='None';
            //elementCraftButton.style.visibility='hidden';
            elementCraftButton.disabled=true;
        }
    }
//}
//##############################################################################################################
//TWEAK 4-learn skill buttons safeties 
//if on buy skills page;
//var loc=location+'';//lol cludgy
//well in any event check if we are on the buyskills page and add saftey boxs to skill buttons
//if this works the above code really should have been avoided by having some kind of test i suppose.
if (loc.match(/buyskills/)||loc.match(/executepurchase/)){
var rchange=function(e) {
                var targetbutton=e.target.nextElementSibling;//button should be next element
                if(e.target.checked){
                    //targetbutton.style.display='';
                    //targetbutton.style.visibility='visible';
                    targetbutton.disabled=false;
                }
                else{
                    //targetbutton.style.display='None';
                    //targetbutton.style.visibility='hidden';
                    targetbutton.disabled=true;
                }
            }
    var elementsSkillButtons = document.getElementsByTagName('input')//get all input   
    var elementSkillButton;
    for (i=0;i<elementsSkillButtons.length;i++){
        elementSkillButton=elementsSkillButtons[i];
        if (elementSkillButton.type!="submit"){//but sometimes isn't
            continue;//well we tried to find it but couldn't so abort it all.
        }
        if (!elementSkillButton.hasAttribute('mageconfirmflag')){//see if flag not set
            elementSkillButton.setAttribute('mageconfirmflag',1);//set flag
            //now check if we have a confirm button and if so make it red 
            if (elementSkillButton.value.match(/Confirm/)){
                elementSkillButton.style.color='red'//make it red to hightlight it
            }//'Confirm (10 CP)'
            newbox=document.createElement('input');
            newbox.type='checkbox';
            newbox.checked=false;
            newbox.addEventListener("click",rchange,false);
            acell=elementSkillButton.parentNode;
            //acell.className='MageNoWrap';//set class for nowrap so doesn't fubar page
            //acell.align='left';
            acell.insertBefore(newbox,elementSkillButton);
            //elementDropButton.style.display='None';
            //elementDropButton.style.visibility='hidden';
            elementSkillButton.disabled=true;
        }
    }
}
//##############################################################################################################
//TWEAK 5-leave faction button safety
//or perhaps we are viewing the faction page
else if (loc.match(/faction&do=view/)){//viewing faction page
var elementsSkillButtons = document.getElementsByTagName('input')//get all input   
    var elementSkillButton;
	var rchange=function(e) {
                    var targetbutton=e.target.nextElementSibling;//button should be next element
                    if(e.target.checked){
                        targetbutton.disabled=false;
                    }
                    else{
                        targetbutton.disabled=true;
                    }
                }
    for (i=0;i<elementsSkillButtons.length;i++){
        elementSkillButton=elementsSkillButtons[i];
        if (elementSkillButton.type!="submit"){//but sometimes isn't
            continue;//well we tried to find it but couldn't so abort it all.
        }
        if (!elementSkillButton.hasAttribute('mageconfirmflag')){//see if flag not set
            elementSkillButton.setAttribute('mageconfirmflag',1);//set flag
            if (elementSkillButton.value=="Leave Faction"){//just do the one button here. very ineffiecent code i think
                newbox=document.createElement('input');
                newbox.type='checkbox';
                newbox.checked=false;
                
                newbox.addEventListener("click",rchange,false);
                acell=elementSkillButton.parentNode
                acell.insertBefore(newbox,elementSkillButton);
                elementSkillButton.disabled=true;
            }
        }
    }
}
//##############################################################################################################
//TWEAK 6- revoke faction button
//do the revoke faction button 
var factionbuttons= document.evaluate("//form[@name='stronghold']", document, null,
	    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
if (factionbuttons.snapshotLength>0){//if we have a faction box
    var factionbutton=factionbuttons.snapshotItem(0).firstElementChild.nextElementSibling;
    if (factionbutton.type=="submit"){//but sometimes isn't
        if (!factionbutton.hasAttribute('mageconfirmflag')){//see if flag not set
            factionbutton.setAttribute('mageconfirmflag',1);//set flag
            if (factionbutton.value.slice(0,17)=="Revoke Stronghold"){//just do the one button here.
                //alert("doing it") 
                var anewbox=document.createElement('input');
                anewbox.type='checkbox';
                anewbox.checked=false;
                var rchange=function(e) {
                    var targetbutton=e.target.nextElementSibling;//button should be next element
                    if(e.target.checked){
                        targetbutton.disabled=false;
                    }
                    else{
                        targetbutton.disabled=true;
                    }
                }
                anewbox.addEventListener("click",rchange,false);
                acell=factionbutton.parentNode;
                acell.insertBefore(anewbox,factionbutton);
                factionbutton.disabled=true;
            }
        }
    }
}
//##############################################################################################################
//TWEAK 7 Thin full health and mana bars
var healthbarimages= document.evaluate("//img[@src='images/g/HealthBar_1.gif']", document, null,
	    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i=0,item;item=healthbarimages.snapshotItem(i) ;i++ ){
    //item.hidden='true';
    item.width='2';
    }
var manabarimages= document.evaluate("//img[@src='images/g/MagicBar_1.gif']", document, null,
	    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i=0,item;item=manabarimages.snapshotItem(i) ;i++ ){
    //item.hidden='true';
    item.width='2';
    }

//##############################################################################################################
//TWEAK 8 Color hits/misses (and make message box bigger and resizable)
if(document.getElementById("Messages")){
	var messages=document.getElementById("Messages");
	if (!(messages.previousElementSibling.innerHTML.match(/This Week/))){//ensure we dont do this on log page
		//if we are loggin in and there is a long list of messages make the message box a tad bigger
		//the  '|| []' in the length is to avoid error when for when the regex fails to match anything and is null
		//if((loc.match(/name=Game$/)) && ((messages.innerHTML.match(/^ -/) || []).length > 10)){
		if((loc.match(/name=Game(&op=connect)?$/)) && (timesCharExist(messages.innerHTML,"\n")>13)){
			messages.style.height="250px";
		}
		//messages.style.height="145px";//make the message box a bit bigger
		messages.style.resize = "vertical";//allow resizing
	}
	var alonglist=messages.innerHTML.split("\n");
  var charname=false;// name of character
  var charnameregexp;// regexp pf name of character
  var charlinks;//links that have char name
if(loc.match('&op=character')){//we might be on the character page
    charlinks = document.evaluate( 
		"//h1",
		document,
		null,
		XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
		null );
	if (charlinks.snapshotLength==1){	
		charname=charlinks.snapshotItem(0).textContent;
    charnameregexp = new RegExp("("+charname+")", "gi");
	}
}
else{
	charlinks = document.evaluate( 
		".//a[starts-with(@href,'modules.php?name=Game&op=character&id=')]",
		document.getElementById("CharacterInfo"),
		null,
		XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
		null );
	if (charlinks.snapshotLength==1){	
		charname=charlinks.snapshotItem(0).textContent; 
    charnameregexp = new RegExp("("+charname+")", "gi");  
	}
}
    
    
	for (i=0;i<alonglist.length;i++){ //For each line
//first check every string for the dreaded a(n) and fix them
		alonglist[i]=alonglist[i].replace(/( a)(\(?(n)\)?( [AEIOUaeiou])|\(?n\)?( [^AEIOUaeiou]))/g,'$1$3$4$5');
//regex string for replacing a(n)
//a.replace(/((a)\((n)\)( [AEIOUaeiou])|(a)\(()n\)( [^AEIOUaeiou]))/g,'$2$3$4$5$6$7')	

//then fix dreaded double '' (not ") turning them into singles.    to help with searching for quotes etc...
		alonglist[i]=alonglist[i].replace(/(\'\')/g,"'");//replace '' with '
alonglist[i]=alonglist[i].replace(/(\\\')/g,"'");//I\'
      
      
//in this bit we find name of character and highlight all instances of it.     
if(charname){
	 alonglist[i]=alonglist[i].replace(charnameregexp,"<span class='MageNameHighlight'>$1</span>");
}
      
//You attack and hit
		if(alonglist[i].match(/(- (\(\d+ times\) )?You attack .* with your .* and hit for .* damage..*)<br>/)){
			alonglist[i]="<div class='MageAttackHit'>"+alonglist[i]+"</div>";//colour hits red
		}	
//You attack and miss	
		else if(alonglist[i].match(/(- (\(\d+ times\) )?You attack .* with your .* and miss..*)<br>/)){
			alonglist[i]="<div class='MageAttackMiss'>"+alonglist[i]+"</div>";//colour misses deeppink
		}
//You defend
		else if(alonglist[i].match(/-( (\(\d+ times\) )?.* attacked you with .*)<br>/)){
			alonglist[i]="<div class='MageAttacked'>!"+alonglist[i].substr(1)+"</div>";
		}
//door repair kill spam
//	- Kate Upton repaired the door! (2014-08-06 11:20:39).	
		else if(alonglist[i].match(/-( (\(\d+ times\) )?.* repaired the door!.*)<br>/)){
			alonglist[i]="<div class='MageDoorRepair'>!"+alonglist[i].substr(1)+"</div>";
		}
//- Kate Upton destroyed the door! (2014-08-06 11:20:41). 
		else if(alonglist[i].match(/-( (\(\d+ times\) )?.* destroyed the door!.*)<br>/)){
			alonglist[i]="<div class='MageDoorKill'>!"+alonglist[i].substr(1)+"</div>";
		}
//Environmental damage
		else if(alonglist[i].match(/-( (\(\d+ times\) )?.* (Your action causes you to|You|you) take \d+ point(s)? of( \b[a-z]+\b)? damage(.|!)?.*)<br>/)){
			alonglist[i]="<div class='MageAttackedbyEnvironment'>!"+alonglist[i].substr(1)+"</div>";
		}
//defiler poinson
		else if(alonglist[i].match(/-( (\(\d+ times\) )?( )?<em>The defiler poison coursing through your veins makes you feel as though your blood is on fire. ( )?Your action causes you to take \d+ damage..*)<br>/)){
			alonglist[i]="<div class='MageAttackedbyEnvironment'>!"+alonglist[i].substr(1)+"</div>";
		} 
//PET REJUVENATION
		//- Your pet, Judgemaster, has been rejuvenated. You spent 15 Magic Points. (2013-06-25 02:17:16).
		//FFS two spaces before 'You spent...'	
		else if(alonglist[i].match(/(- (\(\d+ times\) )?Your pet, .* has been rejuvenated.  You spent \d+ Magic Point.*)<br>/)){
			alonglist[i]="<div class='MagePetRejuv'>"+alonglist[i]+"</div>";
		}
//Player is healed by pet             
		//- Aethersprite, belonging to kiwimage, healed you. You gain 10 hit points. The poison affecting you has been cured. (2013-06-18 14:12:52).
		else if(alonglist[i].match(/(- (\(\d+ times\) )?.* belonging to .*, healed you. You gain \d+ hit point(s)?.*)<br>/)){
			alonglist[i]="<div class='MagePetHealMe'>"+alonglist[i]+"</div>";
		}
//Player healed by will-o-wisp(possibly also wight)
		//- Will-O-Wisp, belonging to Mr Scavvy, has funneled life energy to you, healing you of 1 points of damage. (2013-06-25 02:38:02). 
		else if(alonglist[i].match(/(- (\(\d+ times\) )?.* belonging to .*, has funneled life energy to you, healing you of \d+ points of damage.*)<br>/)){
			alonglist[i]="<div class='MagePetHealMe'>"+alonglist[i]+"</div>";
		}
//PET HEAL OTHERS
		//- Aethersprite, belonging to kiwimage, healed German Shepherd for 10 hit points. (2013-06-18 07:44:32). 
		else if(alonglist[i].match(/(- (\(\d+ times\) )?.*, belonging to .*, healed .* for \d+ hit point.*)<br>/)){
			alonglist[i]="<div class='MagePetHealOthers'>"+alonglist[i]+"</div>";
		}
//PETS ATTACK
		else if(alonglist[i].match(/(- (\(\d+ times\) )?Your pet .* and hit for .*)<br>/)){
			alonglist[i]="<div class='MagePetHit'>"+alonglist[i]+"</div>";
		}
		//being hit by others pets made slightly more important.(though if you seeing this you are probably dead.)
		else if(alonglist[i].match(/(- (\(\d+ times\) )?.*, belonging to .* and hit for .*)<br>/)){
			alonglist[i]="<div class='MagePetHitMe'>!"+alonglist[i].substr(1)+"</div>";
		}
		else if(alonglist[i].match(/(- (\(\d+ times\) )?(Your pet |[^,].*, belonging to).*, killing them!.*)<br>/)){
			alonglist[i]="<div class='MagePetKill'>"+alonglist[i]+"</div>";
		}
		else if(alonglist[i].match(/(- (\(\d+ times\) )?(Your pet |[^,].*, belonging to).* and missed.*)<br>/)){
			alonglist[i]="<div class='MagePetMiss'>"+alonglist[i]+"</div>";		
		}
//roaming pets attack you
// Shambling Zombie attacked you and hit for
		else if(alonglist[i].match(/-( (\(\d+ times\) )?.* attacked you and hit for.*)<br>/)){
			alonglist[i]="<div class='MagePetHitMe'>!"+alonglist[i].substr(1)+"</div>";
		}
		else if(alonglist[i].match(/-( (\(\d+ times\) )?.* attacked you and missed.*)<br>/)){
			alonglist[i]="<div class='MagePetMiss'>!"+alonglist[i].substr(1)+"</div>";
		}
		
//others pets attacking
		else if(alonglist[i].match(/-( (\(\d+ times\) )?.* attacked your pet,.*and hit for .*)<br>/)){
			alonglist[i]="<div class='MagePetHit'}>!"+alonglist[i].substr(1)+"</div>";//colour pet getting hit bold red with exclamation mark
		}
		else if(alonglist[i].match(/(- (\(\d+ times\) )?.* attacked your pet,.* killing it!.*)<br>/)){
			alonglist[i]="<div class='MagePetKill'>"+alonglist[i]+"</div>";
		}
		else if(alonglist[i].match(/(- (\(\d+ times\) )?.* attacked .* killing it!.*)<br>/)){
			alonglist[i]="<div class='MagePetKill'>"+alonglist[i]+"</div>";//PET MESSAGES SEEM TO BE ODDLY BORKED IN COMPARISON TO OTHERS
		}
		else if(alonglist[i].match(/(- (\(\d+ times\) )?.* attacked your pet.* and missed.*)<br>/)){
			alonglist[i]="<div class='MagePetMiss'>"+alonglist[i]+"</div>";//NOTE NO COMMA FOR MISS MESSAGES!
		}
		//- Danny Noonan, a Ghoul, belonging to Mr Scavvy, was killed by a defensive aura projected by Mack Bolan! (2013-07-12 00:11:21). 
		else if(alonglist[i].match(/(- (\(\d+ times\) )?.*, belonging to .*, was killed by a defensive aura projected by .*)<br>/)){
			alonglist[i]="<div class='MagePetKill'>"+alonglist[i]+"</div>";
		}
//PET DESPAWN
		// - Your pet Lightspawn, a Ghoul, has despawned. (2013-06-21 19:00:07).
		//- Aethersprite, belonging to kiwimage, has despawned. (2013-06-18 07:49:21).     
		//- Ghoul has despawned.
		//- Smoke Porterhouse, a Ghoul has despawned. (2013-06-26 06:09:22). 
		//ffs so many different ways of saying it. depending on if it was killed or AP'ed out or MP'ed out.... 
		else if(alonglist[i].match(/(- (\(\d+ times\) )?(Your pet .*|.*, belonging to .*,|.*, a .*|\b\w+\b|Will-O-Wisp) has despawned.*)<br>/)){
			alonglist[i]="<div class='MagePetDespawn'>"+alonglist[i]+"</div>";
		}
//ACHIEVEMENTS
		else if(alonglist[i].match(/((- (\(\d+ times\) )?)<font color="#DD0000">(<b>.*<\/b>)<\/font>(.*))<br>/)){
			alonglist[i]=alonglist[i].replace(/((- (\(\d+ times\) )?)<font color="#DD0000">(<b>.*<\/b>)<\/font>(.*))<br>/,'<div class="MageAchievement">$2<span class="MageAchievementColour">$4</span>$5</div>');//center annoucements
		}
//Reading -No change but look for it so we don't then hightlight book quotes as speech
		else if(alonglist[i].match(/(- (\(\d+ times\) )?You read the book.*)<br>/)){
		//alonglist[i]="<div class='MageHealed'>"+alonglist[i]+"</div>";
		}  
//SPEECH
		else if(alonglist[i].match(/(- (\(\d+ times\) )?)([^,].*)( said, )(\".*)<br>/)){
        //alonglist[i]="<div class='MageSpeech'>"+alonglist[i]+"</div>";
			alonglist[i]=alonglist[i].replace(/(- (\(\d+ times\) )?)([^,].*) (said, )(\".*)<br>/,"<div class='MageSpeech'>$1 $3<span class='MageMe'> $4</span>$5</div>");
		}
		else if(alonglist[i].match(/(- (\(\d+ times\) )?)([^,].*)( whispered to you, saying).(\".*)<br>/)){
        //alonglist[i]="<div class='MageSpeech'>"+alonglist[i]+"</div>";
		alonglist[i]=alonglist[i].replace(/(- (\(\d+ times\) )?)([^,].*) (whispered to you, saying).(\".*)<br>/,"<div class='MageSpeech'>$1 $3<span class='MageMe'> $4, </span>$5</div>");
		}
//BULLHORN!
		else if(alonglist[i].match(/(- (\(\d+ times\) )?).*(Someone used a bullhorn to say: )(\'.*\')(.*)<br>/)){
        //alonglist[i]="<div class='MageSpeech'>"+alonglist[i]+"</div>";
			alonglist[i]=alonglist[i].replace(/(- (\(\d+ times\) )?).*(Someone used a bullhorn to say: )(\'.*\')(.*)<br>/,"<div class='MageSpeech'>$1<span class='MageMe'>$3</span>$4<span class='MageMe'>$5</span></div>");
		}	
		else if(alonglist[i].match(/(- (\(\d+ times\) )?)(You say, )(\".*)<br>/)){
			alonglist[i]=alonglist[i].replace(/(- (\(\d+ times\) )?)(You say, )(\".*)<br>/,"<div class='MageSpeech'>$1<span class='MageMe'>$3</span>$4</div>");
		}
		else if(alonglist[i].match(/(- (\(\d+ times\) )?You whisper, \".*)<br>/)){
        //alonglist[i]="<div class='MageSpeech'>"+alonglist[i]+"</div>";
  	//Due to wanting to make the you part black but still have the initial - blue doing it with a replace.
			alonglist[i]=alonglist[i].replace(/(- (\(\d+ times\) )?)(You whisper, )(\".*)<br>/,"<div class='MageSpeech'>$1<span class='MageMe'>$3</span>$4</div>");
		}
		else if(alonglist[i].match(/(- (\(\d+ times\) )?[^,].* (said|say), \".*)<br>/)){
			alonglist[i]="<div class='MageSpeech'>"+alonglist[i]+"</div>";
		}
		else if(alonglist[i].match(/(- (\(\d+ times\) )?[^,].* (whispered to you|whisper), saying \".*)<br>/)){
			alonglist[i]="<div class='MageSpeech'>"+alonglist[i]+"</div>";
		}
//GIVENATION
		else if(alonglist[i].match(/-( (\(\d+ times\) )?[^,].* gave you a.*)<br>/)){
			alonglist[i]="<div class='MageReceivedSomething'>+"+alonglist[i].substr(1)+"</div>";
		}
		else if(alonglist[i].match(/-( (\(\d+ times\) )?You give your.*)<br>/)){
			alonglist[i]="<div class='MageGaveSomething'>-"+alonglist[i].substr(1)+"</div>";
		}
//CRAFTING
		else if(alonglist[i].match(/(- (\(\d+ times\) )?You call upon your crafting skills.*)<br>/)){
			alonglist[i]="<div class='MageCraft'>"+alonglist[i]+"</div>";
		}
//enchanting
    else if(alonglist[i].match(/(- (\(\d+ times\) )? You marshall your magical knowledge and focus your attention on suffusing the item with your chosen enchantment.  After several moments, you step away from the item, having met with success.  The enchantment has been woven into the item.*)<br>/)){
			alonglist[i]="<div class='MageCraft'>"+alonglist[i]+"</div>";
		}
//SEARCHING
		else if(alonglist[i].match(/(- (\(\d+ times\) )?You search and find nothing.*)<br>/)){
			alonglist[i]="<div class='MageSearchNothing'>"+alonglist[i]+"</div>";
		}
		else if(alonglist[i].match(/(- (\(\d+ times\) )?You search and find a.*)<br>/)){
			alonglist[i]="<div class='MageSearchYay'>+"+alonglist[i].substr(1)+"</div>";
		}    
//HEALING              You heal yourself and gain 10 hit points
		else if(alonglist[i].match(/(- (\(\d+ times\) )?.*(You heal yourself and|healed you. You) gain \d+ hit point(s)?.*)<br>/)){
			alonglist[i]="<div class='MageHealed'>"+alonglist[i]+"</div>";
		}
	//- You use the herb to heal Rachel Stone for 5 points of damage. You gain 5 experience points. They are now fully healed. (2013-07-01 12:35:31). 
//HEALING HERBS
		else if(alonglist[i].match(/(- (\(\d+ times\) )?.*You use the .* to heal .* for \d+ point(s)? of damage?.*)<br>/)){
			alonglist[i]="<div class='MageHealed'>"+alonglist[i]+"</div>";
		}
//HEALING FAKS
		else if(alonglist[i].match(/(- (\(\d+ times\) )?.*You heal .* for \d+ point(s)? of damage?.*)<br>/)){
		alonglist[i]="<div class='MageHealed'>"+alonglist[i]+"</div>";
		} 
// healing surgury
//You use your surgeon skills to tend to Immanent_Eschaton and heal them for 15 points of damage. You gain 15 experience points.       
  	else if(alonglist[i].match(/(- (\(\d+ times\) )?.*You use your surgeon skills to tend to .* and heal them for \d+ point(s)? of damage?.*)<br>/)){
		alonglist[i]="<div class='MageHealed'>"+alonglist[i]+"</div>";
		}  
//healing leeches
      //- You place a Stygian Bone Leech on the skin of Repth and it burrows into their flesh, healing them for 15 points of damage. You gain 6 experience points. (2015-10-21 02:11:13). 
   	else if(alonglist[i].match(/(- (\(\d+ times\) )?.*You place a Stygian Bone Leech on the skin of .* and it burrows into their flesh, healing them for \d+ point(s)? of damage?.*)<br>/)){
		alonglist[i]="<div class='MageHealed'>"+alonglist[i]+"</div>";
		}     
//EMOTES
	//fancy   “   ”
		else if(alonglist[i].match(/(- (\(\d+ times\) )?)([^<>]*?)( \u201C.+\u201D)(.*)<br>/)){
			alonglist[i]=alonglist[i].replace(/(- (\(\d+ times\) )?)([^<>]*?)( \u201C.+\u201D)(.*)<br>/,"<div class='MageSpeech' >$1<span class='MageMe'>$3</span>$4<span class='MageMe'>$5</span></div>");
		}
	//then " 
		else if(alonglist[i].match(/(- (\(\d+ times\) )?)(.*?)( \u0022.+\u0022)(.*)<br>/)){
		//alert(alonglist[i]);
			alonglist[i]=alonglist[i].replace(/(- (\(\d+ times\) )?)(.*?)( \u0022.+\u0022)(.*)<br>/,"<div class='MageSpeech' >$1<span class='MageMe'>$3</span>$4<span class='MageMe'>$5</span></div>");
		}
	//then '
		else if((alonglist[i].match(/(- (\(\d+ times\) )?)([^<>]*?)( \'.+\')([^<>]*)<br>/))&&!(alonglist[i].match(/(- (\(\d+ times\) )?)You read the book\..*<br>/))){
			alonglist[i]=alonglist[i].replace(/(- (\(\d+ times\) )?)([^<>]*?)( \'.+\')([^<>]*)<br>/,"<div class='MageSpeech' >$1<span class='MageMe'>$3</span>$4<span class='MageMe'>$5</span></div>");
		}
	//then fancy ‘ ’   unicode 2018 2019
		else if(alonglist[i].match(/(- (\(\d+ times\) )?)([^<>]*?)( \u2018.+\u2019)(.*)<br>/)){
			alonglist[i]=alonglist[i].replace(/(- (\(\d+ times\) )?)([^<>]*?)( \u2018.+\u2019)(.*)<br>/,"<div class='MageSpeech' >$1<span class='MageMe'>$3</span>$4<span class='MageMe'>$5</span></div>");
		}
		//try other catch fancy quotes
		else if(alonglist[i].match(/(- (\(\d+ times\) )?)(<.*>)(.*)( \u201C.+\u201D)(.*)<br>/)){
			alonglist[i]=alonglist[i].replace(/(- (\(\d+ times\) )?)(<.*>)(.*?)( \u201C.+\u201D)(.*)<br>/,"<div class='MageSpeech' >$1<span class='MageMe'>$3$4</span>$5<span class='MageMe'>$6</span></div>");
		}
	}
messages.innerHTML=alonglist.join('');
}
//##############################################################################################################
// TWEAK 9 Weapon boxes list raw dam/ap. Does not take into account soak.
var weaponboxs= document.evaluate("//select[@name='attacking_with_item_id']", document, null,
	    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
if (weaponboxs.snapshotLength>0){//if we have a weapon box
    var test, weaponboxoptions,keeper;
    var best=0;
    for (var j=0,item;item=weaponboxs.snapshotItem(j) ;j++ ){//for each weapons box
        weaponboxoptions=item.getElementsByTagName('option');
        for (i=0;i<weaponboxoptions.length;i++ ){            //for each option of the box
            test=weaponboxoptions[i].text.match(/(\d+) dmg[^0-9]*(-?\d+)% to hit$/) // extract the last 2 numbers
            if (test){
            //alert(""+test[1]+":"+test[2]);
           		weaponboxoptions[i].text+= " (dam/ap:"+test[1]*Math.min(Math.max(test[2],1),99)/100+")";
				if (best<(test[1]*test[2])){
					best=test[1]*test[2];
					keeper=i;
				}
            }
			//alert(weaponboxoptions[i].innerHTML.);
			if(weaponboxoptions[i].text.match(/Double-Barrelled /)){
				weaponboxoptions[i].text=weaponboxoptions[i].text.replace(/Double-Barrelled /,"");
			}	
        }
        //item.selectedIndex=keeper;
    }
}

//##############################################################################################################
// TWEAK 10 Hatchet is default item to pick up (throwing knifes,rocks alternative default)
var pickupforms= document.evaluate("//form[@name='pickup']", document, null,
	    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);//find the form with name=pickup
if (pickupforms.snapshotLength==1){//We have one and only one candidate 
    var test, pickupform,pickupbox;
    var best=0;
    var keeper=0;
    var hatchetkeeper=-1;
    var throwingknifekeeper=-1;
    var rockkeeper=-1;
    pickupform=pickupforms.snapshotItem(0);
    pickupbox=pickupform.lastElementChild;//select box is the second child of what should be two
    pickupboxoptions=pickupbox.getElementsByTagName('option');
    //doing it this way hoping its faster because less text comparing.
    for (i=0;i<pickupboxoptions.length;i++ ){            //for each option of the box
        test = pickupboxoptions[i].innerHTML;
        if (test=='Hatchet'){//we have a keeper
            hatchetkeeper=i;//so make it the default thing to pick up
               break;//can't do better so stop looking
        }
        if ((throwingknifekeeper==-1)&&test=='Throwing Knife'){
            throwingknifekeeper=i;
        }
        if ((rockkeeper==-1)&&test=='Rock'){
            rockkeeper=i;
        }
    }
    if (hatchetkeeper>-1){
        keeper=hatchetkeeper;
    }
    else if(throwingknifekeeper>-1){
        keeper=throwingknifekeeper;
    }
    else if(rockkeeper>-1){
        keeper=rockkeeper;
    }
    pickupbox.selectedIndex=keeper;
}

//##############################################################################################################
//Tweak 11 Higlight move buttons when ap<10
if(document.getElementById("CharacterInfo")){
   
	var charinfodiv=document.getElementById("CharacterInfo");
		var charlinks = document.evaluate( 
		".//a[starts-with(@href,'modules.php?name=Game&op=character&id=')]",
		charinfodiv,
		null,
		XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
		null );
	/*	
	var charid=0;
	if (charlinks.snapshotLength==1){
		charid=charlinks.snapshotItem(0).href.match(/id=(\d+)/)[1];
	}
		var charmax = new Array();
		charmax[0]=GM_getValue("maxap"+charid,0);
		charmax[1]=GM_getValue("maxhp"+charid,0);
		charmax[2]=GM_getValue("maxmp"+charid,0);
     */
		var firstfont=charinfodiv.getElementsByTagName("font")[0];
		var secondfont=charinfodiv.getElementsByTagName("font")[1];
		var thirdfont=charinfodiv.getElementsByTagName("font")[2];		

	/*if (charmax[0]&&charmax[1]&&charmax[2]){//only if all are true(ie we got a proper value)

	
    for(i=0;i<3;i++){
		var anewspan=document.createElement('div');
		anewspan.className="numberdiv";

		var font=charinfodiv.getElementsByTagName("font")[i];//get font
		charstat=font.innerHTML.match(/\d+/); //get ap/hp/mp
		
		var reddiv=document.createElement('div');
		reddiv.style.width='20px';
		reddiv.className="bar"; 
		if(i==1){
			reddiv.title=charstat+"/"+charmax[i]+" Need "+ (Number(charmax[i])-Number(charstat))+"hp healed";}
		else{
			reddiv.title = charstat+"/"+charmax[i]+" Full in "+ 
			(Number(charmax[i])-Number(charstat))/4+" hours";
		}
		
		var greendiv=document.createElement('div');
		var greenwidth=parseInt(20*(Number(charstat)/Number(charmax[i])));
			greendiv.className="bar2"; 
		greendiv.style.width=""+greenwidth+"px";//to make out of 20 as int;
	
		greendiv.title=charstat+"/"+charmax[i];

		var firstcell=font.parentNode;
		if(i==0){//first time is nested deeper
			firstcell=font.parentNode.parentNode;
			}
		firstcell.width='20px';
		anewspan.insertBefore(greendiv,anewspan.firstChild);//put img in span
		anewspan.insertBefore(reddiv,anewspan.firstChild);//put img in span
		
		anewspan.insertBefore(font,anewspan.firstChild);//move the text into the new span
		firstcell.insertBefore(anewspan,firstcell.firstChild);//put span in table cell
		
	}
	}*/
    if(Number(secondfont.innerHTML.match(/\d+/))<20){
        //secondfont.parentNode.parentNode.style.backgroundColor=LOWHPBACKGROUNDCOLOUR;//set the ap to orange color
		secondfont.parentNode.style.border="3px solid "+LOWHPBACKGROUNDCOLOUR;
		secondfont.parentNode.parentNode.parentNode.parentNode.style.border="2px solid "+LOWHPBACKGROUNDCOLOUR;
		 //secondfont.style.color='black';//set the HP text to black so it's not red on red
		 //secondfont.style.fontWeight=900;
        secondfont.parentNode.parentNode.title="LOW HEALTH";
        //also color alll the pane titles gold so make sure waring is noticed.
        var panetitles=document.getElementsByClassName("panetitle");
        for (var i=0,temp=0;temp=panetitles[i] ;i++ ){
            temp.style.color=LOWHPWARNINGCOLOUR;
            temp.title='LOW HEALTH';
        }
    }
    else if(Number(firstfont.innerHTML.match(/\d+/))<10){
		//firstfont.parentNode.parentNode.style.backgroundColor=LOWHPBACKGROUNDCOLOUR;//set the ap to orange color
		firstfont.parentNode.parentNode.style.border="1px solid "+LOWAPBACKGROUNDCOLOUR;
		firstfont.parentNode.parentNode.style.borderTop="3px solid "+LOWAPBACKGROUNDCOLOUR;
		firstfont.parentNode.parentNode.style.borderBottom="3px solid "+LOWAPBACKGROUNDCOLOUR;
		firstfont.parentNode.parentNode.title="LOW AP";
	    //also color alll the pane titles gold so make sure waring is noticed.
		var panetitles=document.getElementsByClassName("panetitle");
		for (var i=0,temp=0;temp=panetitles[i] ;i++ ){
			temp.style.color=LOWAPWARNINGCOLOUR;
			temp.title='LOW AP';
		}
		//now also set the move buttons to dark orange.
		/*
		var movebuttons= document.evaluate("//input[@value='Move']", document, null,
	    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		var temp;
		for (i=0;temp=movebuttons.snapshotItem(i) ;i++ ){
			temp.style.color='red';
			temp.style.fontWeight='bold';
		}
		*/
	}
	else if(Number(secondfont.innerHTML.match(/\d+/))<50){
		var hiddensmbutton= document.evaluate("//input[@value='Sorcerers Might']", document, null,
	    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
		if(hiddensmbutton){
			hiddensmbutton.nextElementSibling.style.color="red";
		}
    }
}
//HIGHLIGHT SM
var SMtext= document.evaluate("//td[@colspan='7']", document, null,
	    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);//find the form with name=pickup
var tempelement;
if (SMtext.snapshotLength>=1){//We have one or more candidates
	for (var i=0;i<SMtext.snapshotLength;i++){
		tempelement=SMtext.snapshotItem(i);
		//if(tempelement.innerHTML.match(/Sorcerers Might/)){
		//	tempelement.style.color=SMWARNINGCOLOUR;
		//}
		if(tempelement.innerHTML.match(/Sorcerers Might/)){
			tempelement.innerHTML=tempelement.innerHTML.replace(/(Sorcerers Might \([0-9]+ min\))/,'<span style="color:'+SMWARNINGCOLOUR+'">$1</span>');
		}
    if(tempelement.innerHTML.match(/Zerg Flag/)){
			tempelement.innerHTML=tempelement.innerHTML.replace(/(Zerg Flag \([0-9]+ min\))/,'<span style="color:'+SMWARNINGCOLOUR+'">$1</span>');
		}  
	}
}

//bugfix try fix door repair. game html is broken? and this script breaks it more.
//find this <form method="POST" action="modules.php?name=Game&op=door" name="doorrepair">    
var doorrepair=   document.evaluate("//form[@name='doorrepair']", document, null,
	    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);//this is the fubar possibly empty door repair form.

if (doorrepair.snapshotLength>=1){
    doorrepair=doorrepair.snapshotItem(0);//only one item to be found
    //<input type="submit" value="Repair Door (2 AP)">
    //<input type="hidden" value="repair" name="action">
    var repairinput=document.evaluate("//input[starts-with(@value,'Repair Door')]", document, null,
	    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    if (repairinput.snapshotLength>=1){
    
    repairinput=repairinput.snapshotItem(0);
    doorrepair.insertBefore(repairinput,doorrepair.firstElementChild);
    }   
    
    repairinput=document.evaluate("//input[@value='repair' and @name='action']", document, null,
	    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    if (repairinput.snapshotLength>=1){
    repairinput=repairinput.snapshotItem(0);
    doorrepair.insertBefore(repairinput,doorrepair.firstElementChild);
    } 
  
  //put it in a td. I don't know why it's invisible otherwise.
  newtd=document.createElement('td');
  doorrepair.parentNode.insertBefore(newtd,doorrepair.parentNode.lastElementChild);
  newtd.insertBefore(doorrepair,newtd.firstElementChild)
}
    
//bugfix try fix lock picking
//<input type="submit" value="Pick Lock (1 AP)">
var LPButton= document.evaluate("//input[@value='Pick Lock (1 AP)']", document, null,
	    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);//this is the misplace lockppick button
if (LPButton.snapshotLength>=1){
//<form method="POST" action="modules.php?name=Game&amp;op=door" name="doorattack">  //stsrt of door attack form
//<form method="POST" action="modules.php?name=Game&amp;op=door" name="picklock"></form>	
var LPForm= document.evaluate("//form[@name='picklock']", document, null,
	    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		if (LPForm.snapshotLength>=1){
			LPForm.snapshotItem(0).appendChild(LPButton.snapshotItem(0))
		}
		//<input type="hidden" value="pick" name="action">
		var LPhButton= document.evaluate("//input[@value='pick']", document, null,
	    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		if (LPhButton.snapshotLength>=1){
			LPForm.snapshotItem(0).appendChild(LPhButton.snapshotItem(0))
		}
		//we not done.
		//we must now take put form in td with open door or else it won't show for unknown reasons(might be css?
		//<form method="POST" action="modules.php?name=Game&amp;op=door" name="dooropen">
		var ODform= document.evaluate("//form[@name='dooropen']", document, null,
	    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		if (ODform.snapshotLength>=1){
			ODform.snapshotItem(0).parentNode.insertBefore(LPForm.snapshotItem(0),ODform.snapshotItem(0))
		}
		
		
}
//EOF
})();