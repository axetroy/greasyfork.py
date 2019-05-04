// ==UserScript==
// @name HWM_Resources_Cost
// @description   Отображает на странице персонажа общую стоимость ресурсов (дерево, руда, ртуть и т.п.) по цене 170/350 и общую рыночную стоимость элементов
// @namespace  Zeleax
// @author  Zeleax
// @include /https?:\/\/(www.heroeswm.ru|178.248.235.15|www.lordswm.com)\/pl_info.php/
// @grant   none
// @version 2.4
// ==/UserScript==

// Цены
var resPrices = {"wood": 170, "ore": 170, "mercury": 350, "sulfur": 350, "crystal": 350, "gem": 350} // ресурсы

// Ниже ничего не менять!
var elPricesTemplate = {"абразив":0, "змеиный яд":0, "клык тигра":0, "ледяной кристалл":0, "лунный камень":0, "огненный кристалл":0, "осколок метеорита":0, "цветок ведьм":0, "цветок ветров":0, "цветок папоротника":0, "ядовитый гриб":0}; 

// GM functions
if (typeof GM_getValue != 'function') {this.GM_getValue=function (key,def) {return localStorage[key] || def;};this.GM_setValue=function (key,value) {return localStorage[key]=value;};	this.GM_deleteValue=function (key) {return delete localStorage[key];};}

// Восстанавливаем цены в массив
var marketPricesSaveDate = GM_getValue('hwmResorcesCost_saveDate',null);
var elPrices=JSON.parse(GM_getValue('hwmResorcesCost_elPrices',null));

if (elPrices==null || Object.keys(elPrices).length!=Object.keys(elPricesTemplate).length || elPrices[Object.keys(elPrices)[0]]==0)
{
   elPrices=elPricesTemplate;
   getElementsPricesFromMarket();
}

// Ресурсы
var resRow =  getE("/html/body/center/table/tbody/tr/td/table[1]/tbody/tr[1]/td[2]/table/tbody/tr");
var resArr = resRow.getElementsByTagName('img');
var resSum = 0;

for(var i=0, el; el=resArr[i]; i++) 
   if((imgname = el.getAttribute('src')) && (res = /([a-z]{1,}).gif/.exec(imgname)) && (res[1]) && (rPrice = resPrices[res[1]]) ) 
     resSum += parseInt(el.parentNode.nextSibling.firstChild.innerHTML.replace(',',''), 10) * rPrice;

createCell(resRow.insertCell(-1), " = "+resSum, 'resRow');

// Элементы
res = getE("//td[b[text()='Ресурсы']]");
if(res) elCell = res.parentNode.nextSibling.firstChild;

var myRe = /<b>(\D+)<\D+: (\d+)/g;
var resArr = [];
while (res = myRe.exec(elCell.innerHTML)) resArr[res[1]]=res[2];

RefreshTable();

function RefreshTable()
{
   // Создаем таблицу с ценами
   var elSum = 0
   var elPosCnt=0;
   
   var html = [];
   html.push('<table><tbody><tr><td></td><td>Кол-во</td><td  align="right">Цена</td></tr>');

   for (var key in resArr) 
   {
      html.push('<tr><td><b>'+key+'<b></td><td  align="right">'+resArr[key]+'</td><td  align="right">');
      if(ePrice= elPrices[key]) // цена
      {
         html.push('<i>'+ePrice+'</i>');
         elSum += parseInt(resArr[key])*ePrice;
         elPosCnt++;
      }
      html.push('</td></tr>');
   }

   html.push('<tr><td><input type="button" name="btnRefreshPrices" value="Обновить стоимость" /></td><td></td><td align="right" title="Общая стоимость элементов"><b>'+elSum+'</b></td></tr></tbody></table>');

   if(elPosCnt>0) 
   {
      elCell.innerHTML = html.join("");
      el=document.getElementsByName('btnRefreshPrices')[0];
      el.onclick =function() {getElementsPricesFromMarket();}
      el.title='Цены обновлены '+marketPricesSaveDate;
   }
}

// Загрузить цены на элементы c рынка
function getElementsPricesFromMarket()
{
   var docObj = func_getDocumentFromUrl('/auction.php?cat=elements&sort=4&type=0&sbn=1&sau=0');
   tdlist=getL(" //td[a[contains(@href, 'auction_lot_protocol')]]",null,docObj);

   if(tdlist.snapshotLength>0){
      for (var key in elPrices) elPrices[key]=0; // очистка цен
      var elCnt=Object.keys(elPrices).length;
      
      for(var i=0; i<tdlist.snapshotLength && elCnt>0; i++)
      {
         el= tdlist.snapshotItem(i).parentNode.parentNode.parentNode.parentNode.parentNode;
         res=/\d+ - ([^\[]+\S).+\[i.{2,20}сразу!([0-9,]+)/.exec(el.textContent);
         if ((res) && elPrices[res[1]]==0) { 
            elPrices[res[1]]=parseInt(res[2].replace(',',''),10); 
            elCnt--; 
         }
      }
       GM_setValue("hwmResorcesCost_elPrices", JSON.stringify(elPrices));
       
       marketPricesSaveDate=(new Date()).toLocaleString();
       GM_setValue("hwmResorcesCost_saveDate", marketPricesSaveDate);
      
      RefreshTable();
   }
   else
      alert('Цены не обновляются при переходе по карте, участии в бою, таверне и т.д.');

   return; 
}

// create DIV element and append to the table cell
function createCell(cell, text, style) {
    var div = document.createElement('div'), // create DIV element
    txt = document.createTextNode(text); // create text node
    div.appendChild(txt);                    // append text node to the DIV
    div.setAttribute('class', style);        // set DIV class attribute
    div.setAttribute('className', style);    // set DIV class attribute for IE (?!)
    cell.appendChild(div);                   // append DIV to the table cell
}

// получает документ по заданному URL
function func_getDocumentFromUrl(urlToLoad){var req=new XMLHttpRequest(); req.open("GET", urlToLoad, false); req.overrideMimeType('text/xml; charset=windows-1251'); req.send(null); var parser = new DOMParser(); return parser.parseFromString(req.responseText, "text/html"); }

// доступ по xpath
function getE(xpath,el,docObj){return (docObj?docObj:document).evaluate(xpath,(el?el:(docObj?docObj.body:document.body)),null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;}
function getL(xpath,el,docObj){return (docObj?docObj:document).evaluate(xpath,(el?el:(docObj?docObj.body:document.body)),null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);}
