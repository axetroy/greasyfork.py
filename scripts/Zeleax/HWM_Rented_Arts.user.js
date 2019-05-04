// ==UserScript==
// @name        HWM_Rented_Arts
// @namespace   Zeleax
// @description Скрывает артефакты находящиеся на хранении и позволяет в один клик забрать нескрытые артефакты, доступные для возврата
// @include /https?:\/\/(www.heroeswm.ru|178.248.235.15|www.lordswm.com)\/(arts_arenda.php)/
// @version     1.5
// @grant       none
// ==/UserScript==
// скрывать всех указанных ниже игроков на странице артов сданных в аренду
var HidePlayers = ['Mr_SkauT','Сержант530','Radiansee','Alexis19923','Samohin017','-_некр_-','IGOR-FAKER','_-Mr_Black-_','Cle99','Лесные ягоды'];

var urlArr=[];
var cntVisible=0;
var returnCnt=0;

list = getL( "//a[contains(@href, 'pl_info.php')]");
for (var i=list.snapshotLength-1 ; i >=0; i-- )
{
  _row=list.snapshotItem(i).parentNode.parentNode.parentNode;
  
  if(HidePlayers.indexOf(list.snapshotItem(i).textContent) > -1)
      _row.style.display = 'none';
  else 
  {
      cntVisible++;

      el=getE(".//a[contains(@href, 'arts_arenda.php?art_return')]", _row);
      if (el)
      {
         returnCnt++;
         urlArr.push(el.href);
      }
  }
}

document.body.innerHTML = document.body.innerHTML.replace('Артефакты в аренде:', 'Артефакты в аренде: '+cntVisible+'  <button type="button" name="getBackMyArts" style="display:none">Test</button> ');

if(returnCnt>0)
{
   el=document.getElementsByName('getBackMyArts')[0];
   el.textContent ='Забрать арты: '+returnCnt;
   el.onclick =function() {doAction();}
   el.style.display="initial";
}

function doAction() // Возврат артов
{
   for (var i=0 ; el=urlArr[i]; i++ )
      func_getDocumentFromUrl(el); // забираем арты !!!
   
   location.reload();
}

// получает документ по заданному URL
function func_getDocumentFromUrl(urlToLoad){console.log('Load data from url: '+urlToLoad); var req=new XMLHttpRequest(); req.open("GET", urlToLoad, false); req.overrideMimeType('text/xml; charset=windows-1251'); req.send(null); var parser = new DOMParser(); return parser.parseFromString(req.responseText, "text/html"); }

// доступ по xpath
function getE(xpath,elem){return document.evaluate(xpath,(!elem?document.body:elem),null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;}
function getE2(xpath,docObject,elem){return docObject.evaluate(xpath,(!elem?docObject.body:elem),null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;}
function getL(xpath,elem){return document.evaluate(xpath,(!elem?document.body:elem),null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);}
function getL2(xpath,docObject,elem){return docObject.evaluate(xpath,(!elem?docObject.body:elem),null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);}
