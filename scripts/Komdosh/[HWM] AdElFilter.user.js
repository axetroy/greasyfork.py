// ==UserScript==
// @name         [HWM] AdElFilter
// @namespace    [HWM] AdElFilter
// @version      0.3
// @description  Advanced element transfer protocol filter
// @author       Komdosh
// @include      http*://*.heroeswm.ru/pl_transfers.php*
// @grant        none
// ==/UserScript==
var types;
var totalCost=0, totalCount=0;
var elements = [];
elements[0] = ["абразив","змеиный яд", "клык тигра", "ледяной кристалл", "лунный камень", "огненный кристалл", 
               "осколок метеорита", "цветок ведьм", "цветок ветров", "цветок папоротника", "ядовитый гриб"];
elements["абразив"]=[];
elements["абразив"][0]=0;//Количество
elements["абразив"][1]=0;//Стоимость
elements["змеиный яд"]=[];
elements["змеиный яд"][0]=0;//Количество
elements["змеиный яд"][1]=0;//Стоимость
elements["клык тигра"]=[];
elements["клык тигра"][0]=0;//Количество
elements["клык тигра"][1]=0;//Стоимость
elements["ледяной кристалл"]=[];
elements["ледяной кристалл"][0]=0;//Количество
elements["ледяной кристалл"][1]=0;//Стоимость
elements["лунный камень"]=[];
elements["лунный камень"][0]=0;//Количество
elements["лунный камень"][1]=0;//Стоимость
elements["огненный кристалл"]=[];
elements["огненный кристалл"][0]=0;//Количество
elements["огненный кристалл"][1]=0;//Стоимость
elements["осколок метеорита"]=[];
elements["осколок метеорита"][0]=0;//Количество
elements["осколок метеорита"][1]=0;//Стоимость
elements["цветок ведьм"]=[];
elements["цветок ведьм"][0]=0;//Количество
elements["цветок ведьм"][1]=0;//Стоимость
elements["цветок ветров"]=[];
elements["цветок ветров"][0]=0;//Количество
elements["цветок ветров"][1]=0;//Стоимость
elements["цветок папоротника"]=[];
elements["цветок папоротника"][0]=0;//Количество
elements["цветок папоротника"][1]=0;//Стоимость
elements["ядовитый гриб"]=[];
elements["ядовитый гриб"][0]=0;//Количество
elements["ядовитый гриб"][1]=0;//Стоимость

var id = getId();

//***************************************************************************
//Создание меню
var tdArray = document.getElementsByTagName('td');

for (var i = 0; i < tdArray.length; i++)
{
    if ( tdArray[i].getElementsByTagName('center').length > 0 && /\u041F\u0440\u043E\u0442\u043E\u043A\u043E\u043B \u0438\u0433\u0440\u043E\u043A\u0430 <a.* href="pl_info\.php\?id=[0-9]*"><b>.*<\/b><\/a>/.test(tdArray[i].getElementsByTagName('center')[0].innerHTML))
    {
        var mainElem = tdArray[i];
        break;
    }
}
var MenuSpan = document.createElement( 'span' );
MenuSpan.innerHTML = '&nbsp;(';
MenuSpan.id = 'Menu';
var a = document.createElement('a');
a.href = 'javascript: void(0);';
a.innerHTML = '\u0424\u0438\u043B\u044C\u0442\u0440 \u044D\u043B\u0435\u043C\u0435\u043D\u0442\u043E\u0432';
MenuSpan.appendChild(a);
MenuSpan.innerHTML += ')';
mainElem.getElementsByTagName('center')[0].appendChild(MenuSpan);
mainElem.getElementsByTagName('center')[0].lastChild.getElementsByTagName('a')[0].addEventListener('click', function() { document.getElementById('MenuDiv').style.display = ( document.getElementById('MenuDiv').style.display == 'none') ? 'block' : 'none'; }, false );
var div = document.createElement('div');
div.id = 'MenuDiv';
div.style.display = 'none'; 
var tb = document.createElement( 'table' );
tb.id = "fieldTab";
var tr = document.createElement( 'tr' );
var td = document.createElement( 'td' );
td.innerHTML = '\u041D\u0430\u0447\u0430\u043B\u044C\u043D\u0430\u044F \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0430:';
tr.appendChild( td );
var td = document.createElement( 'td' );
var inp = document.createElement( 'input' );
inp.setAttribute("placeholder", 1);
inp.type = 'text';
inp.id = 'AESFPagesFrom';
td.appendChild(inp);
tr.appendChild(td);
tb.appendChild(tr);
div.appendChild( tb );
var tr = document.createElement( 'tr' );
var td = document.createElement( 'td' );
td.innerHTML = '\u041A\u043E\u043D\u0435\u0447\u043D\u0430\u044F \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0430:';
tr.appendChild( td );
var td = document.createElement( 'td' );
var inp = document.createElement( 'input' );
inp.setAttribute("placeholder", 5);
inp.type = 'text';
inp.id = 'AESFPagesTo';
td.appendChild(inp);
tr.appendChild(td);
tb.appendChild(tr);
var select = "<select id='AESFType'><option selected value='0'>\u041A\u0443\u043F\u043B\u0435\u043D\u043E</option>"+
        "<option  value='1'>\u041F\u0440\u043E\u0434\u0430\u043D\u043E</option>"+
        "<option  value='2'>\u041F\u0435\u0440\u0435\u0434\u0430\u043D\u043E</option>"+
        "<option  value='3'>\u041F\u043E\u043B\u0443\u0447\u0435\u043D\u044B</option></select>";
tb.innerHTML+="<tr><td align=center>\u0422\u0438\u043F:</td><td colspan='3' >"+select+"</td></tr>";
var tr = document.createElement( 'tr' );
var td = document.createElement( 'td' );
var inp = document.createElement( 'button' );
inp.innerHTML = '\u041E\u0442\u0444\u0438\u043B\u044C\u0442\u0440\u043E\u0432\u0430\u0442\u044C';
inp.id = 'Button';
inp.addEventListener( 'click', function() {
    switch(document.getElementById('AESFType').value){
        case '0':
            types = /\u041A\u0443\u043F\u043B\u0435\u043D/;
            break;
        case '1':
            types = /\u041F\u0440\u043E\u0434\u0430\u043D/;
            break;
        case '2':
            types = /\u041F\u0435\u0440\u0435\u0434\u0430\u043D/;
            break;
        case '3':
            types = /\u041F\u043E\u043B\u0443\u0447\u0435\u043D/;
            break;
    }
    for(var i = 0; i<11; ++i){
       elements[elements[0][i]][0]=0;
       elements[elements[0][i]][1]=0;
     }
    totalCost=0;
    totalCount=0;
    var page = 0;
    if(parseInt(document.getElementById('AESFPagesFrom').value)-1)
        page = parseInt(document.getElementById('AESFPagesFrom').value)-1;
    elemRequest(page)-1;}, false );
td.setAttribute("colspan","2");
td.setAttribute("style","text-align:center");
td.appendChild( inp );
tr.appendChild( td );
tb.appendChild( tr );
div.appendChild( tb );
var st = document.createElement('div');
st.id = "stDiv";
div.appendChild(st);
mainElem.getElementsByTagName('center')[0].appendChild( div );
//***************************************************************************
//Запрос данных об элементах
function elemRequest(pg)
{
    var xhr = new XMLHttpRequest();
    xhr.open('GET', encodeURI("/pl_transfers.php?id="+id+"&filter=1&adfilter=1&e=1&page="+pg));
    xhr.overrideMimeType('text/xml; charset=windows-1251');
    xhr.onload = function() 
    {
        if (xhr.status === 200)
        {
            var div = document.createElement( 'div' );
            div.id = 'statistic';
            div.style.display = 'none';
            div.innerHTML = xhr.responseText;
            document.getElementsByTagName('body')[0].appendChild( div );
            var respDoc = document.getElementsByTagName('body')[0].lastChild;
            var tdArray = respDoc.getElementsByTagName('td');
            for (var i = 0; i < tdArray.length; i++)
            {
                if (tdArray[i].getElementsByTagName('center').length > 0 && /\u041f\u0440\u043e\u0442\u043e\u043a\u043e\u043b \u0438\u0433\u0440\u043e\u043a\u0430 <a.* href="pl_info\.php\?id=[0-9]*"><b>.*<\/b><\/a>/.test( tdArray[i].getElementsByTagName('center')[0].innerHTML ) )
                {
                    var element = tdArray[i];
                    break;
                }
            }
            var check = document.getElementById('AESFType').value;
            for(var i = 8; i<48; ++i){
                var temp = element.innerHTML.split('<br>')[i]; //from 8 to 47
                var ap = '"';
                if(check == '2' || check == '3')
                    ap = "'";
                if(types.test(temp)){
                    var nameOfEl = temp.split(ap)[1].split(ap)[0];
                    if(isNaN(parseInt(temp.split(ap+' ')[1].split('шт')[0])))
                       elements[nameOfEl][0]++;
                    else
                       elements[nameOfEl][0]+=parseInt(temp.split(ap+' ')[1].split('шт')[0]);
                    if(temp.split('за ')[1]){
                        elements[nameOfEl][1]+=parseInt(temp.split('за ')[1].split(' ')[0]);
                    }
                }
            }
            var div = document.getElementById( 'stDiv' );
            div.innerHTML = '';
            for(var i = 0; i<11; ++i){
                div.innerHTML += elements[0][i]+" - \u041A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E:"+elements[elements[0][i]][0]+" \u0421\u0442\u043E\u0438\u043C\u043E\u0441\u0442\u044C:"+elements[elements[0][i]][1]+"<br>";
            }
            for(var i = 0; i<11; ++i){
                totalCount+=elements[elements[0][i]][0];
                totalCost +=elements[elements[0][i]][1];
            }
            div.innerHTML += "<hr> \u041E\u0431\u0449\u0435\u0435 \u043A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E:"+totalCount;
            div.innerHTML += "<br> \u041E\u0431\u0449\u0430\u044F \u0441\u0442\u043E\u0438\u043C\u043E\u0441\u0442\u044C:"+totalCost;
            if(pg<parseInt(document.getElementById('AESFPagesTo').value)-1)
                elemRequest(pg+1);
        }
        else 
        {
            alert('Request failed.  Returned status of ' + xhr.status);
        }
    };
    xhr.send();
}

//***************************************************************************
//Последняя страница
function lastPage()
{
    var xhr = new XMLHttpRequest();
    xhr.open('GET', encodeURI("pl_warlog.php?page=9999&id="+id));
    xhr.onload = function() 
    {
        if (xhr.status === 200)
        {
            var div = document.createElement( 'div' );
            div.id = 'statistic';
            div.style.display = 'none';
            div.innerHTML = xhr.responseText;
            document.getElementsByTagName('body')[0].appendChild( div );
            var respDoc = document.getElementsByTagName('body')[0].lastChild;
            var tdArray = respDoc.getElementsByTagName('td');
            for (var i = 0; i < tdArray.length; i++)
            {
                if (tdArray[i].getElementsByTagName('center').length > 0 && /\u041f\u0440\u043e\u0442\u043e\u043a\u043e\u043b \u0431\u043e\u0435\u0432 \u0438\u0433\u0440\u043e\u043a\u0430 <a.* href="pl_info\.php\?id=[0-9]*"><b>.*<\/b><\/a>/.test( tdArray[i].getElementsByTagName('center')[0].innerHTML ) )
                {
                    var element = tdArray[i];
                    break;
                }
            }
            alert(element.innerHTML);
        }
        else 
        {
            alert('Request failed.  Returned status of ' + xhr.status);
        }
    };
    xhr.send();
}

//***************************************************************************
//Получение id игрока
function getId()
{
    var id = location.href.match( /\?(?:.*=.*&)*id=([0-9]*)(?:&.*=.*)*/ );
    return id[1];
}