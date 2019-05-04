// ==UserScript==
// @name        HWM_Tavern_DrinkOfLuckTime
// @author  Zeleax
// @namespace   Zeleax
// @description Показывает время последнего использования напитка удачи в таверне и добавляет ссылки на использование зелья на страницы групповых боев и клановых защит
// @include /https?:\/\/(www.heroeswm.ru|178.248.235.15|www.lordswm.com)\/(tavern.php.*|mapwars.php.*|group_wars.php.*)/
// @version     1.6
// @grant GM_setValue
// @grant GM_getValue
// ==/UserScript==
if (typeof GM_getValue != 'function') {this.GM_getValue=function (key,def) {return localStorage[key] || def;}; this.GM_setValue=function (key,value) {return localStorage[key]=value;}; this.GM_deleteValue=function (key) {return delete localStorage[key]};}

var showLuckIconOnBattlePages = 1; // показывать иконку "Выпить зелье удачи" на страницах боев (0-нет; 1-да)

var drinkTime, nextdrinkdate, errflag=0;

try 
{ 
   drinkTime=new Date(JSON.parse(GM_getValue( "hwm_lastDrinkTime" )));
   // drinkTime = new Date(2018, 9, 16, 20, 15);
   console.log('drinkTime', drinkTime);
   nextdrinkdate = new Date(drinkTime.getTime() + 24*60*60*1000);
   console.log('nextdrinkdate', nextdrinkdate);
}
catch (err) {errflag=1;}
// console.log('drinkTime.getFullYear()',drinkTime.getFullYear());

if(errflag==1) {drinkTime = nextdrinkdate = null;}

console.log('drinkTime, nextdrinkdate', drinkTime, nextdrinkdate);

if(/tavern.php/.test(location.href))
{
   console.log('tavern.php');
   if(/action=drink/.test(location.href) && (nextdrinkdate==null || Date.now()>nextdrinkdate.getTime() )) 
   {
      console.log('save hwm_lastDrinkTime');
      console.log('JSON.stringify(new Date())', JSON.stringify(new Date()));
      GM_setValue("hwm_lastDrinkTime", JSON.stringify(new Date()));
   }
   else if (drinkTime)
   {
      if(getI("//a[contains(@href,'action=drink')]").snapshotLength>0 && drinkTime.getTime()>Date.now()) 
      { 
         console.log('save hwm_lastDrinkTime');
         GM_setValue("hwm_lastDrinkTime", null);
      }
      else 
      if (nextdrinkdate.getTime() > Date.now())
         getI("//h2").snapshotItem(0).insertAdjacentHTML("afterEnd", '<img border="0" title="Last used" alt="" src="https://dcdn.heroeswm.ru/i/s_luck.gif">'+
            drinkTime.toLocaleTimeString()+'</img>');
   }
}
else if(showLuckIconOnBattlePages==1 && /(group_wars|mapwars).php/.test(location.href) 
   && Date.now()>nextdrinkdate.getTime()
)
{
   console.log('group_wars');
   var list=getI("//a[contains(@href,'_join.php')]");
   console.log(list);
   for(var i=0; i<list.snapshotLength; i++)
   {
      console.log('group_wars insert');
      list.snapshotItem(i).insertAdjacentHTML("afterEnd", '<a href="/tavern.php?action=drink" target="_blank"><img width="24" height="24" border="0" title="Выпить зелье удачи" alt="" src="https://dcdn.heroeswm.ru/i/s_luck.gif" /></a>');
   }
}

function getI(xpath,elem){return document.evaluate(xpath,(!elem?document:elem),null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);}
