// ==UserScript==
// @name       Ikariam Automation
// @namespace   Ikariam Automation Hack
// @version    1.55
// @description  Just like the ikariam PLUS upgrade queue, but gratis.
// @icon http://i.imgur.com/253Nfvg.png
// @include      *://*.ikariam.gameforge.com/*
// @exclude      *://*.ikariam.gameforge.com/*logout*
// @match   *://*.ikariam.gameforge.com/*
// @copyright  2016, nikman\
// @resource hackOnIcoResource http://i.imgur.com/7s4P0JN.png
// @resource hackOffIcoResource http://i.imgur.com/btKdBAb.png
// @grant    GM_getResourceURL
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_deleteValue
// @grant       GM_listValues
// @grant       GM_addStyle
//@run-at document-idle
// ==/UserScript==


/*
Cheat for ikariam, updated 24/06/2016, allows you to queue building upgrades for all your cities, and all your accounts.
Comes with functional GUI, in english (but you could help translate)
*/

ikariamIsLoaded();

function ikariamIsLoaded(){
  if(unsafeWindow.ikariam.model == null){
    console.log("notLoaded");
    window.setTimeout(ikariamIsLoaded,50);
  }else{
    if(getCurrCityId() == null){
      console.log("notLoaded");
      window.setTimeout(ikariamIsLoaded,50);
    }else{
      console.log("Loaded");
      setup();
    }
  }
}



var restartCycleDate;
var isCycle;
var scriptReloaded;
var doneUpdate;


var restartCycleTime=5*60000;
var pageLocation;
var citiesData =[];

var hackOnIco=document.createElement("IMG");
var hackOffIco=document.createElement("IMG");


function setup(){

  GM_setValue('version', "1");
  var counter = GM_getValue('counter', 0);
  var version = GM_getValue('version', 0);
  GM_setValue('counter', ++counter);

  pageLocation=window.location.origin ;

  citiesData=getCitiesData();
  unsafeWindow.citiesData = cloneInto(citiesData, unsafeWindow);


  console.log('Ondsi\'s Ikariam Automation Hack v' + version +"."+ counter);
  console.log("server: " + unsafeWindow.ikariam.model.serverName);
  console.log("utente: " + unsafeWindow.ikariam.getScreen().data.ownerName);
  console.log("pagina: " + pageLocation);
  console.log("città: ");console.log(citiesData);

  console.log(GM_listValues());

  if(unsafeWindow.sessionStorage.getItem('scriptReloaded')!=null&&unsafeWindow.sessionStorage.getItem('isCycle')!=null&&unsafeWindow.sessionStorage.getItem('doneUpdate')!=null&&unsafeWindow.sessionStorage.getItem('restartCycleDate')!=null){
    console.log("loading data");
    scriptReloaded=parseInt(unsafeWindow.sessionStorage.getItem('scriptReloaded'));
    isCycle = parseInt(unsafeWindow.sessionStorage.getItem('isCycle'));
    doneUpdate = parseInt(unsafeWindow.sessionStorage.getItem('doneUpdate'));
    restartCycleDate= new Date(unsafeWindow.sessionStorage.getItem('restartCycleDate'));
  }else{
    console.log("creating data");
    scriptReloaded=0;
    unsafeWindow.sessionStorage.setItem('scriptReloaded', scriptReloaded);
    isCycle = 0;
    unsafeWindow.sessionStorage.setItem('isCycle', isCycle);
    doneUpdate = -1;
    unsafeWindow.sessionStorage.setItem('doneUpdate', doneUpdate);
    var d = new Date();
    restartCycleDate=new Date(d.getTime()+restartCycleTime);
    unsafeWindow.sessionStorage.setItem('restartCycleDate', restartCycleDate.toString());
  }

  unsafeWindow.scriptActive=GM_getValue("scriptActive",false);

  hackOnIco.src=GM_getResourceURL ("hackOnIcoResource");
  hackOnIco.setAttribute("id","onIcon");
  hackOffIco.src=GM_getResourceURL ("hackOffIcoResource");
  hackOffIco.setAttribute("id","offIcon");
  addGui();

  if(scriptReloaded){
    console.log("reloaded1");
    setTimeout(executeUpgrades,1000);
    scriptReloaded=0;
    unsafeWindow.sessionStorage.setItem('scriptReloaded', scriptReloaded);
  }else{
    console.log("reloaded2");
    var d = new Date();
    setTimeout(executeUpgrades,restartCycleDate.getTime()-d.getTime());
  }
}


function getCitiesData(){
  var CitiesData=[];
  var  tmpCitiesData=unsafeWindow.ikariam.model.relatedCityData;
  delete tmpCitiesData.additionalInfo;
  delete tmpCitiesData.selectedCity;
  for(var i=0; i<Object.keys(tmpCitiesData).length;i++){
    CitiesData.push(tmpCitiesData[Object.keys(tmpCitiesData)[i]])
    CitiesData[i].upgradesList= new Array();
    if(GM_getValue(CitiesData[i].id)!=null){
      CitiesData[i].upgradesList= GM_getValue(CitiesData[i].id);
    }else{
      GM_setValue(CitiesData[i].id,CitiesData[i].upgradesList);
    }
  }
  return CitiesData;
}

function getCurrCityId(){
  try{
    var tmpCitiesData=unsafeWindow.ikariam.model.relatedCityData.selectedCity;
    return parseInt(tmpCitiesData.replace("city_",""));
    console.log("ok");
  } catch(err) {
    console.log("err");
    return -1;
  }
}

function getCurrCity(){
  if(getCurrCityId()>0){
    for(var i=0; i<citiesData.length;i++){
     if(citiesData[i].id==getCurrCityId()){
      return citiesData[i];
    }
  }
}
return -1;
}
function getCurrTemplateUrl(){
  var template = unsafeWindow.ikariam.model.formatViewUrl();
  template=template.replace("index.php?","");
  return template;
}
exportFunction(getCurrCity, unsafeWindow, {defineAs: "getCurrCity"});

function addGui(){
  addUpgradeBtn();
  addLeftMenuBtn();
  addUpdateDateLink();
  addHackLinks();
  setTimeout(addGui,1000);
}

function addHackLinks(){
 if(unsafeWindow.ikariam.templateView!= null){
   if("id" in unsafeWindow.ikariam.templateView){
    if(unsafeWindow.ikariam.templateView.id==="tradeAdvisor" && unsafeWindow.document.getElementById("hackInfoButton")==null){
      var widget= unsafeWindow.document.getElementById("sidebarWidget");

      var hackButton = widget.children[0].children[1].children[0].children[2].cloneNode(true);
      hackButton.setAttribute("id","hackInfoButton");
      hackButton.children[0].setAttribute("href","#");
      hackButton.children[0].setAttribute("onclick","showUpgradePopup()");
      hackButton.children[0].innerText = "see hack";
      widget.children[0].children[1].children[0].appendChild(hackButton);
      console.log(hackButton);

    }
  }
}
}


var LeftMenuBtn;
var optionsBtn;
var buildingLevelButton;
function addLeftMenuBtn(){
  if(unsafeWindow.js_viewCityMenu.getElementsByClassName("menu_slots")[0].children[7]!=null && unsafeWindow.document.getElementById("LeftMenuBtn")==null){
   buildingLevelButton = unsafeWindow.js_viewCityMenu.getElementsByClassName("menu_slots")[0].children[7];
   LeftMenuBtn = buildingLevelButton.cloneNode(true);
   LeftMenuBtn.setAttribute("id","LeftMenuBtn");
   LeftMenuBtn.setAttribute("onclick","LeftMenuBtnFn(); return false;");

   LeftMenuBtn.text=LeftMenuBtn.children[1].children[0];
   LeftMenuBtn.img=LeftMenuBtn.children[0];

   if(unsafeWindow.scriptActive){
    LeftMenuBtn.text.textContent="Hack currently ON";
    LeftMenuBtn.img.appendChild(hackOnIco);
  }else{
    LeftMenuBtn.text.textContent="Hack currently OFF";
    LeftMenuBtn.img.appendChild(hackOffIco);
  }

  js_viewCityMenu.getElementsByClassName("menu_slots")[0].appendChild(LeftMenuBtn);

  buildingLevelButton.click();

  setTimeout(function(){clickNames()},1000);
}
}

function clickNames(){
  if(typeof unsafeWindow.ikariam.model.buildingNamesActive != null  &&!unsafeWindow.ikariam.model.buildingNamesActive){
    buildingLevelButton.click();
    setTimeout(function(){clickNames()},500);
  }
}

function showUpgradeList(){ 
  alert("List");
}

function LeftMenuBtnFn(){ 
  unsafeWindow.scriptActive=!unsafeWindow.scriptActive;
  GM_setValue("scriptActive",unsafeWindow.scriptActive);
  console.log(unsafeWindow.scriptActive);
  if(unsafeWindow.scriptActive){
        //#risky function just sucks, find better html link to the text
        LeftMenuBtn.text.textContent="Hack currently ON";
        LeftMenuBtn.img.replaceChild(hackOnIco,hackOffIco);
       /* if(unsafeWindow.document.getElementById("autoUpgradeBtn")!=null){
          upgradeBtn.setAttribute("class","action_btn");
        }*/
      }else{
        //#risky function just sucks, find better html link to the text
        LeftMenuBtn.text.textContent="Hack currently OFF";
        LeftMenuBtn.img.replaceChild(hackOffIco,hackOnIco); 
        /*if(unsafeWindow.document.getElementById("autoUpgradeBtn")!=null){
          upgradeBtn.setAttribute("class","action_btn disabled");  
        }*/
      }
    }
    exportFunction(LeftMenuBtnFn, unsafeWindow, {defineAs: "LeftMenuBtnFn"});


    var updateDateLink;
    function addUpdateDateLink(){

     if(unsafeWindow.document.getElementById("servertime")!=null){ 
       if(unsafeWindow.document.getElementById("updateDateLink")==null){
         var serverTimeLink = unsafeWindow.document.getElementById("servertime").parentElement.parentElement;

         var updateDate = document.createElement("LI");
         updateDate.setAttribute("class","updateDate");

         var updateNowLink = document.createElement("A");        
         var t = document.createTextNode("Hack info");      
         updateNowLink.appendChild(t);        
         updateNowLink.addEventListener("click", showUpgradePopup);    
         updateNowLink.setAttribute("title","See hack details");                    
         updateNowLink.setAttribute("href","#");                    
         updateDate.appendChild(updateNowLink);                 


         updateDateLink = document.createElement("A");  
         var t = document.createTextNode("Update Now");    
         updateDateLink.setAttribute("id","updateDateLink");  
         updateDateLink.appendChild(t);        
         updateDateLink.addEventListener("click", function(){updateNow();if(!unsafeWindow.scriptActive){alert("the hack is not enabled!");}});    
         updateDateLink.setAttribute("href","#");
         updateDateLink.setAttribute("title","Update now");                    
         updateDate.appendChild(updateDateLink);                  


         var linksList= serverTimeLink.parentElement;
         serverTimeLink.parentElement.replaceChild(updateDate, serverTimeLink);
         updateDate.parentElement.appendChild(serverTimeLink);
         console.log(updateDate);
       }
       var d = new Date();
       var s = Math.floor((restartCycleDate.getTime()-d.getTime())/1000);
       updateDateLink.textContent="Hack will update in "+s+" s";

       if(unsafeWindow.scriptActive){
        if(s<(-1)){
          updateNow();
        }else if(s<10){
          updateDateLink.setAttribute("style", "color: red");
        }else{
          updateDateLink.setAttribute("style", "color: #6E2C0F");
        }
      }else{
       updateDateLink.setAttribute("style", "color: #999999");
     }
   }
 }

 function updateNow() {
  executeUpgrades();
}

var upgradePopup;
function showUpgradePopup() {
  unsafeWindow.ikariam.createPopup("upgradePopup","Upgrades for this city","");
  upgradePopup=unsafeWindow.document.getElementById("upgradePopup");

  var close=document.createElement("DIV");
  close.setAttribute("class","close");
  close.addEventListener("click", function(){unsafeWindow.ikariam.closePopup()});    
  upgradePopup.children[0].children[2].appendChild(close);

  upgradePopup.children[0].children[0].appendChild(hackOnIco);

  var hackInfoSpace=document.createElement("div");
  /*var hackInfo='A rather long string of English text, an error message ' +
      'actually that just keeps going and going -- an error \n' +
      'message to make the Energizer bunny blush (right through ' +
      'those Schwarzenegger shades)! Where was I? Oh yes, ' +
      'you\'ve got an error and all the extraneous whitespace is ' +
      'just gravy.  Have a nice day.';
      hackInfoSpace.innerText = hackInfo;*/
/*
console.log('Ondsi\'s Ikariam Automation Hack v' + version +"."+ counter);
  console.log("server: " + unsafeWindow.ikariam.model.serverName);
  console.log("utente: " + unsafeWindow.ikariam.getScreen().data.ownerName);
  console.log("pagina: " + pageLocation);
  console.log("città: ");console.log(citiesData);
  */
  upgradePopup.children[1].appendChild(hackInfoSpace);


  var updatePopup=document.createElement("div");
  updatePopup.innerHTML = "\nupdate<br>";
  updatePopup.style.textAlign = "right";
  updatePopup.style.cursor = "pointer";
  updatePopup.style.color = "blue";
  updatePopup.addEventListener("click", function(){showUpgradePopup()});
  upgradePopup.children[1].appendChild(updatePopup);


  var table = document.createElement('table');

  table.setAttribute("class","table01 left clearfloat");
  table.setAttribute("id","upgradeTable");

  var caption = table.createCaption();
  caption.innerHTML = "<b>UPGRADES:</b>";

  var row = table.insertRow(0);
  var cell1 = document.createElement("TH");
  var cell2 = document.createElement("TH");
  var cell3 = document.createElement("TH");
  var cell4 = document.createElement("TH");

  cell1.innerHTML = "Building";
  cell2.innerHTML = "Level";
  cell3.innerHTML = "Position";
  cell4.innerHTML = "Delete";
  
  row.appendChild(cell1);
  row.appendChild(cell2);
  row.appendChild(cell3);
  row.appendChild(cell4);
  cell4.addEventListener("click", function(){clearBuildingUpgradeList();showUpgradePopup();});
  cell4.style.cursor = "pointer";
  cell4.style.color = "red";

 // console.log(getCurrCity().upgradesList);
 if(getCurrCity().upgradesList.length==0){
  var row = table.insertRow(1);
  var cell1 = row.insertCell(0);
  cell1.innerHTML = "No upgrades planned";
}
for(var i = 0; i < getCurrCity().upgradesList.length; i++) {
  var row = table.insertRow(i+1);
  row.setAttribute("draggable","true");

  row.onmouseover=function(){
    unsafeWindow.document.getElementById("position"+this.cells[2].innerText).children[1].className="hover img_pos"
    //console.log(this.cells[2].innerText);
  }; 

  row.onmouseout=function(){
    unsafeWindow.document.getElementById("position"+this.cells[2].innerText).children[1].className="hover img_pos invisible"
    //console.log(this.cells[2].innerText+" out");
  }; 


  if(!unsafeWindow.ikariam.backgroundView.screen.data.position[getCurrCity().upgradesList[i].position].canUpgrade || unsafeWindow.ikariam.backgroundView.screen.data.position[getCurrCity().upgradesList[i].position].isBusy){
    row.style.color = "red";
    row.setAttribute("title","insufficent resources or building busy");
  }
  if(i%2==0){
    row.setAttribute("class","alt");
  }
  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);
  var cell3 = row.insertCell(2);
  var cell4 = row.insertCell(3);
  cell1.innerHTML = getCurrCity().upgradesList[i].building;
   // if()
   cell2.innerHTML = unsafeWindow.ikariam.backgroundView.screen.data.position[getCurrCity().upgradesList[i].position].level;
   cell3.innerHTML = getCurrCity().upgradesList[i].position;
   cell4.innerHTML = "X";
   cell4.style.cursor = "pointer";
   cell4.style.textAlign = "center";
   cell4.index=i;
   cell4.addEventListener("click", function(){removeBuildingUpgrade(this.index)});
 }
 console.log("tablek");

 upgradePopup.children[1].appendChild(table);

 table.style.width = (upgradePopup.offsetWidth-30)+"px";
  //upgradePopup.style.width = (table.offsetWidth+40)+;

  var space=document.createElement("div");
  space.innerHTML = "<br>";
  upgradePopup.children[1].appendChild(space);
  console.log(list);
}

exportFunction(showUpgradePopup, unsafeWindow, {defineAs: "showUpgradePopup"});


function removeBuildingUpgrade(index){
  console.log(index);
  getCurrCity().upgradesList.splice(index, 1);
  GM_setValue(getCurrCity().id, getCurrCity().upgradesList);
  showUpgradePopup();
}


function addUpgradeBtn(){
  if(unsafeWindow.document.getElementById("js_buildingUpgradeButton")!=null && unsafeWindow.document.getElementById("autoUpgradeBtn")==null){
   upgradeBtn = document.createElement("a");
   upgradeBtn.setAttribute("title","add upgrade to queue, or upgrade it now");
   upgradeBtn.setAttribute("id","autoUpgradeBtn");
   upgradeBtn.setAttribute("href","#");
   upgradeBtn.onclick =function(){addBuildingUpgrade();};

   upgradeBtn.setAttribute("class","action_btn");

   upgradeBtn.style=unsafeWindow.document.getElementById("js_buildingUpgradeButton").style;
   var t = document.createElement("span");
   t.setAttribute("class","textLabel");
   t.textContent="Add to queue";
   upgradeBtn.appendChild(t);
   unsafeWindow.document.getElementById('js_buildingUpgradeButton').parentElement.appendChild(upgradeBtn);
 }
}


function executeUpgrades(){
  if(unsafeWindow.scriptActive){
    var changeCity;
    console.log(isCycle);
    if(isCycle<0){
      console.log("start cycle");
      isCycle=0;
      unsafeWindow.sessionStorage.setItem('isCycle', isCycle);
    }


    if(getCurrCity().id==citiesData[isCycle].id){
      console.log(getCurrCity().name);
      //console.log(getCurrCity().upgradesList);
      console.log(unsafeWindow.ikariam.getScreen().endUpgradeTime<0);
      console.log(getCurrCity().upgradesList.length>0);
      console.log(doneUpdate!=(-2));
      console.log(doneUpdate);
      if(unsafeWindow.ikariam.getScreen().endUpgradeTime<0 && getCurrCity().upgradesList.length>0&&doneUpdate!=(-2)){
        console.log("UPDATE!");
        i=0;
        if(doneUpdate>=0){
          i=doneUpdate;
        }
        unsafeWindow.sessionStorage.setItem('doneUpdate', doneUpdate);
        for(i ;i<getCurrCity().upgradesList.length;i++){
          doneUpdate = -2;
          if(unsafeWindow.ikariam.backgroundView.screen.data.position[getCurrCity().upgradesList[i].position].canUpgrade && !unsafeWindow.ikariam.backgroundView.screen.data.position[getCurrCity().upgradesList[i].position].isBusy){
            console.log("can upgrade2");
            var link=getCurrCity().upgradesList[i].link+unsafeWindow.ikariam.backgroundView.screen.data.position[getCurrCity().upgradesList[i].position].level;
            link = link.replace("DummyString",unsafeWindow.ikariam.model.actionRequest);

            console.log(link);
            doneUpdate = i;
            unsafeWindow.sessionStorage.setItem('doneUpdate', doneUpdate);
            //alert(link);
            unsafeWindow.ajaxHandlerCall(link);
            setTimeout(function(){executeUpgrades();},500);
            break;
          }
        }
       // doneUpdate = -2;
       unsafeWindow.sessionStorage.setItem('doneUpdate', doneUpdate);
     }else{
      console.log("NO UPDATE!");
      if(doneUpdate>=0){
        getCurrCity().upgradesList.splice(doneUpdate, 1);
        GM_setValue(getCurrCity().id, getCurrCity().upgradesList);
      }
      doneUpdate = -1;
      unsafeWindow.sessionStorage.setItem('doneUpdate', doneUpdate);

       /* console.log(isCycle);
       console.log(citiesData.length-1);*/
       if(isCycle<citiesData.length-1){
        console.log("next city");
        isCycle++;
        changeCity=true;
      } else{
        console.log("first city");
        isCycle=(-1);
      }   
      unsafeWindow.sessionStorage.setItem('isCycle', isCycle);             
    }

  }else{
    changeCity=true;
  }
  if(changeCity){
     // alert("tonewciti"+isCycle);
     scriptReloaded=1;
     unsafeWindow.sessionStorage.setItem('scriptReloaded', scriptReloaded);
     setTimeout(function(){unsafeWindow.ajaxHandlerCall(pageLocation+"/?view=city&cityId="+citiesData[isCycle].id);},1000);
   }
 }
 var d = new Date();
 restartCycleDate=new Date(d.getTime()+restartCycleTime);
 //console.log(d);
 //console.log(restartCycleDate);
 unsafeWindow.sessionStorage.setItem('restartCycleDate', restartCycleDate.toString());
 setTimeout(executeUpgrades,restartCycleTime);
}



var upgradesQueueList;
function addBuildingUpgrade(){
  console.log("add to queue");
  var templateUrl=getCurrTemplateUrl()+"&";
    //var template=templateUrl.split("&");
    console.log(templateUrl);

    var newUpgrade;

    var cityId=parseTemplateUrl(templateUrl,"currentCityId=");
    var view=parseTemplateUrl(templateUrl,"view=");
    var bgView=parseTemplateUrl(templateUrl,"backgroundView=");

    if(view!=="townHall"){
      var position=parseTemplateUrl(templateUrl,"position=");
      var level="";
      var activeTab= parseTemplateUrl(templateUrl,"activeTab=");
      newUpgrade = new buildingUpgrade(cityId,position,level,activeTab,bgView,cityId,view);
    }else{
      newUpgrade = new buildingUpgrade(cityId,0,0,"-1",bgView,cityId,view);
    }

    
    getCurrCity().upgradesList.push(newUpgrade);
    console.log(getCurrCity().upgradesList);

    GM_setValue(getCurrCity().id, getCurrCity().upgradesList);
    return false;
  }


  function clearBuildingUpgradeList(){
   /* var keysToKeep = ['version','counter','scriptActive']; 
    var keys = GM_listValues();
    for (var i=0, key=null; key=keys[i]; i++) {
      if(keysToKeep.indexOf(key) >= 0) {
        continue;
      }
      GM_deleteValue(key);
    }*/
    console.log("delete list");
    getCurrCity().upgradesList= new Array();
    GM_setValue(getCurrCity().id, getCurrCity().upgradesList);
  }
  exportFunction(clearBuildingUpgradeList, unsafeWindow, {defineAs: "clearBuildingUpgradeList"});


  function parseTemplateUrl(url,parameter){
    if(url.indexOf(parameter)>=0){
      return url.substring(url.indexOf(parameter)+parameter.length, url.indexOf("&",url.indexOf(parameter)+parameter.length));
    }
    return -1;
  }


  function buildingUpgrade(cId, pos, lv, acTab, bgV, currCId, tmplV) {
    this.position = pos;
    this.building = tmplV;
    this.level =lv;
    this.link=pageLocation;
    this.link+="/?action=CityScreen&function=upgradeBuilding&cityId="+cId;
    this.link+="&position="+pos;
    if(acTab!="-1"){
      this.link+="&activeTab="+acTab;
    }
    this.link+="&backgroundView="+bgV;
    this.link+="&currentCityId="+currCId;
    this.link+="&templateView="+tmplV;
    this.link+="&actionRequest=DummyString";
    this.link+="&level=";
  }

/*
http://s24-it.ikariam.gameforge.com/?action=CityScreen&function=upgradeBuilding&cityId=48373&position=2&activeTab=tabSendTransporter&backgroundView=city&currentCityId=48373&templateView=port&level=
http://s24-it.ikariam.gameforge.com/?action=CityScreen&function=upgradeBuilding&actionRequest=9e2052fea9d7e981e134f2a0fa1d0acf&cityId=48373&position=2&level=6&activeTab=tabSendTransporter&backgroundView=city&currentCityId=48373&templateView=port

http://s24-it.ikariam.gameforge.com/?action=CityScreen&function=upgradeBuilding&cityId=44917&position=16&activeTab=tabUnits&backgroundView=city&currentCityId=44917&templateView=workshop&level=2
http://s24-it.ikariam.gameforge.com/?action=CityScreen&function=upgradeBuilding&cityId=44917&position=16&activeTab=tabUnits&backgroundView=city&currentCityId=44917&templateView=workshop&level=2

https://s24-it.ikariam.gameforge.com/?action=CityScreen&function=upgradeBuilding&cityId=44917&position=0&level=13&backgroundView=city&currentCityId=44917&templateView=townHall

https://s24-it.ikariam.gameforge.com/?action=CityScreen&function=upgradeBuilding&cityId=44917&position=16&level=1&activeTab=tabUnits&backgroundView=city&currentCityId=44917&templateView=workshop
https://s24-it.ikariam.gameforge.com/?action=CityScreen&function=upgradeBuilding&cityId=44917&position=16&level=1&activeTab=tabUnits&backgroundView=city&currentCityId=44917&templateView=workshop

https://s24-it.ikariam.gameforge.com/?action=CityScreen&function=upgradeBuilding&cityId=44917&position=5&level=10&backgroundView=city&currentCityId=44917&templateView=academy
https://s24-it.ikariam.gameforge.com/?action=CityScreen&function=upgradeBuilding&cityId=44917&position=5&level=10&backgroundView=city&currentCityId=44917&templateView=academy

https://s24-it.ikariam.gameforge.com/?action=CityScreen&function=upgradeBuilding&cityId=44917&position=15&level=7&backgroundView=city&currentCityId=44917&templateView=branchOffice
https://s24-it.ikariam.gameforge.com/?action=CityScreen&function=upgradeBuilding&cityId=44917&position=15&level=7&backgroundView=city&currentCityId=44917&templateView=branchOffice"


*/

/*console.log("pagina: " + pageLocation);
var newUpgrade =new buildingUpgrade(44917,8,6,"city",44917,"architect",[1000,0,0,0,0]);
console.log(newUpgrade);
unsafeWindow.newUpgrade = cloneInto(newUpgrade, unsafeWindow);*/
/*
//clone left menu

var itm = js_viewCityMenu.getElementsByClassName("menu_slots")[0].children[7];

// Copy the <li> element and its child nodes
var cln = itm.cloneNode(true);

// Append the cloned <li> element to <ul> with id="myList1"
js_viewCityMenu.getElementsByClassName("menu_slots")[0].appendChild(cln);

*/
/*
https://s24-it.ikariam.gameforge.com/?   view=buildings_demolition   &cityId=44917   &position=8   &level=6   &templatePosition=8   &backgroundView=city   &currentCityId=44917   &templateView=architect

https://s24-it.ikariam.gameforge.com/?   action=CityScreen   &function=upgradeBuilding   &cityId=44917   &position=8   &level=6     &backgroundView=city   &currentCityId=44917   &templateView=architect
https://s24-it.ikariam.gameforge.com/?   view=architect                                                  &position=8                &backgroundView=city   &currentCityId=44917
*/

/*
function upgrade(f, t, h, res) {
    this.from = f;
    this.to = t;
    this.hour = h;
    this.resources = res;
}
var firstTrade = new tradeRoute(48373,45856,22,[1000,0,0,0,0]);
unsafeWindow.firstTrade = cloneInto(firstTrade, unsafeWindow);

*/





function maina() {
  console.log("main");
  unsafeWindow.ajaxHandlerCall("https://s24-it.ikariam.gameforge.com/?view=warehouse&cityId=44917&position=18&currentCityId=44917&backgroundView=city");
  console.log("current "+new Date().getTime()/1000);
  console.log("end "+unsafeWindow.ikariam.getScreen().endUpgradeTime);
  setTimeout(function(){if(new Date().getTime()/1000>unsafeWindow.ikariam.getScreen().endUpgradeTime){
    console.log("upgrade");
    unsafeWindow.ajaxHandlerCall("https://s24-it.ikariam.gameforge.com/index.php?action=CityScreen&function=upgradeBuilding&cityId=44917&position=18&level=8&backgroundView=city&currentCityId=44917&templateView=warehouse");
  }else{console.log("no upgrade");}},2000)

  setTimeout(function(){if(new Date().getTime()/1000>unsafeWindow.ikariam.getScreen().endUpgradeTime){
    console.log("upgrade");
    unsafeWindow.ajaxHandlerCall("https://s24-it.ikariam.gameforge.com/index.php?action=CityScreen&function=upgradeBuilding&cityId=44917&position=12&level=7&backgroundView=city&currentCityId=44917&templateView=tavern");
  }else{console.log("no upgrade");}},4000)
}

function tradeRoute(f, t, h, res) {
  this.from = f;
  this.to = t;
  this.hour = h;
  this.resources = res;
}
var firstTrade = new tradeRoute(48373,45856,22,[1000,0,0,0,0]);
unsafeWindow.firstTrade = cloneInto(firstTrade, unsafeWindow);




function size(obj) {
  var size = 0, key;
  for (key in obj) {
    if (obj.hasOwnProperty(key)) size++;
  }
  return size;
};
exportFunction(size, unsafeWindow, {defineAs: "size"});
//window.size()



var counter = GM_getValue('counter', 0);
var ika = GM_getValue('counter', 0);
//alert(unsafeWindow.ikariam.model.serverName);
//console.log('This script has been run ' + counter + ' times.');
GM_setValue('counter', ++counter);



var zNode       = document.createElement ('div');
zNode.innerHTML = '<button id="myButton" type="button">'
+ 'For Pete\'s sake, don\'t click me!</button>'
;
zNode.setAttribute ('id', 'myContainer');
//document.body.appendChild (zNode);

//--- Activate the newly added button.
document.getElementById ("myButton").addEventListener (
  "click", ButtonClickAction, false
  );


function ButtonClickAction (zEvent) {

  console.log("hi");
  console.log("server: " + unsafeWindow.ikariam.model.serverName);

//while(!(unsafeWindow.ikariam.templateView.id==="transport")){unsafeWindow.document.getElementById("cargo_wine_plus").click();}
console.log("done0");
setTransport();
console.log("don1");
unsafeWindow.document.getElementById("cargo_wine_plus").click();

} 


function setTransport() {
  unsafeWindow.ajaxHandlerCall("https://s24-it.ikariam.gameforge.com/index.php?view=transport&destinationCityId=44917&position=2&activeTab=tabSendTransporter&backgroundView=city&currentCityId=48373&templateView=port")
  console.log("request transport");
  setTimeout(function(){addWine()},2000);
};


function addWine(){
  if(unsafeWindow.ikariam.templateView.id ==="transport"){
    console.log("showing transport");
    unsafeWindow.document.getElementById("cargo_wine_plus").click();
    unsafeWindow.document.getElementById("cargo_wine_plus").click();   
  }else{
    console.log("not transport"); 
  }
}



