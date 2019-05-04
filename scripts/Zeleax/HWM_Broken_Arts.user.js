// ==UserScript==
// @name        HWM_Broken_Arts
// @namespace   Zeleax
// @description Сломанные арты в инвентаре- сигнал: слово "Предметы" красного цвета, арты подсвечены жёлтым цветом
// @include /https?:\/\/(www.heroeswm.ru|178.248.235.15|www.lordswm.com)\/(inventory.php)/
// @version     1.4
// @grant       none
// ==/UserScript==
var found = false;

// открываемая страница
var lst = document.body.getElementsByTagName('li');
for(var i=0;el=lst[i];i++)
   if((txt = el.innerHTML) && (/Прочноcть: <font color="red">0/.test(txt))){
      found = true;
      el.style.backgroundColor = "yellow";
   }

// все арты
for(var i=0;i<arts1.length;i++) {
   newstr=arts1[i].replace(/<li>(Прочноcть: <font color=red>0<\/font>\/\d+<BR>)/, '<li style="background-color: yellow;">$1');
   if(newstr.length!=arts1[i].length) { found=true; arts1[i]=newstr; }
}
   
if(found) {
   var el = getElementByXpath('/html/body/center/table[2]/tbody/tr/td/table/tbody/tr[1]/td[1]/b');
   if(el) el.innerHTML = el.innerHTML.replace('Предметы', '<font color="red">Предметы</font>');
   var el = getElementByXpath('/html/body/center/table[2]/tbody/tr/td/table/tbody/tr[2]/td[1]/b'); // если в заявке на бой
   if(el) el.innerHTML = el.innerHTML.replace('Предметы', '<font color="red">Предметы</font>');   
}

function getElementByXpath (path) {
  return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}

