// ==UserScript==
// @name        HWM RepairFinishTimeInfo
// @namespace   Zeleax
// @description В кузне формирует отдельную строку со временем завершения ремонта
// @include /https?:\/\/(www.heroeswm.ru|178.248.235.15|www.lordswm.com)\/(mod_workbench.php.*)/
// @version     1.3
// @grant       none
// ==/UserScript==
if(item=getE( "(//td[contains(text(),'Идет работа над')])[1]" )) 
{
   itemName=/Идет работа над: (.+)/.exec(item.innerText)[1];
   
   if(timeElement = getE( "(//td[contains(text(),'Завершение работы')])[1]" ))
   {
      totalText = itemName + ', Finish' + /Завершение работы(.+)/.exec(timeElement.innerText)[1];
      
      if(item= getE( "(//td[contains(text(),'Владелец')])[1]" )) 
      {
         if(itemOwner = getE( "(.//a[contains(@href,'pl_info.php')])[1]" , item))
         {
            ownerName=itemOwner.innerText;
            timeElement.parentNode.insertAdjacentHTML("afterEnd", '<tr><td class="wb" colspan="2">&nbsp'+totalText+'</td></tr>'+
               '<tr><td><a href="'+document.location.origin+'/sms-create.php?mailto='+ownerName+'&subject='+encodeURI(totalText)+'&msg=+">&nbspПисьмо</a></td></tr>'); 
         }
      }
   }
}

function getE(xpath,el,docObj){return (docObj?docObj:document).evaluate(xpath,(el?el:(docObj?docObj.body:document.body)),null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;}
