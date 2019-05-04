// ==UserScript==
// @name         [HWM] Expofobs
// @version      1.0.2
// @description  Расчёт экспоумки по выбранным параметрам
// @author       Komdosh
// @author       www.heroeswm.ru/pl_info.php?id=1341471
// @include      http*://*.heroeswm.ru/pl_info.php*
// @include      http*://*.heroeswm.ru/home.php*
// @grant        none
// @namespace https://greasyfork.org/users/13829
// ==/UserScript==
var data = [];
var dataUpdate = [];
var mode=0;
var nowData = parseInfPage();
if(localStorage.getItem("Expofob"+getId()))
{
    data = parseExpofobLoad();
    mode = data["mode"];
}
else
{
    data=[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1];
}
if(localStorage.getItem("ExpofobUpdate"+getId()))
{
    dataUpdate=parseExpofobUpdateLoad();

    if(dataUpdate["expoSkill"]==0)
    {
        var update = localStorage.getItem("ExpofobUpdate"+getId());
        update = update.split('|expoSkill:')[0]+"|expoSkill:"+computeExpoSkill(data, nowData);
        localStorage.setItem("ExpofobUpdate"+getId(), update);
    }
}
else
{
    dataUpdate=[-1,-1,-1,-1,-1,-1,-1];
}
window.onload = function() {
    switch(dataUpdate["update"])
    {
        case 0:
            if((new Date().getDay())!=dataUpdate["now"])
            {
                var update = "update:"+dataUpdate["update"]+"|now:"+(new Date().getDay())+"|expoSkill:"+computeExpoSkill(data, nowData);
                localStorage.setItem("ExpofobUpdate"+getId(), update);
            }
            break;
        case 1:
            if((new Date().getWeek())!=dataUpdate["now"])
            {
                var update = "update:"+dataUpdate["update"]+"|now:"+(new Date().getWeek())+"|expoSkill:"+computeExpoSkill(data, nowData);
                localStorage.setItem("ExpofobUpdate"+getId(), update);
            }
            break;
        case 2:
            if(((new Date().getMonth())+1)!=dataUpdate["now"])
            {
                var update = "update:"+dataUpdate["update"]+"|now:"+((new Date().getMonth())+1)+"|expoSkill:"+computeExpoSkill(data, nowData);
                localStorage.setItem("ExpofobUpdate"+getId(), update);
            }
            break;
    }
};

output(mode, computeExpoSkill(data, nowData));
//**********************************************************************************************
//Расчёт экспоумки
function computeExpoSkill(data, nowData){
    var expoSkill=0.0;
    //var skillsLvl = [20, 50, 90, 160, 280, 500, 900, 1600, 2900, 5300, 9600, 17300];
    switch(data["mode"])
    {
        case 0:
            var sumSkill=0.0;
            for(var i = 0; i < 9; i++)
                sumSkill += nowData["fr"+i];
            sumSkill = Math.floor(sumSkill*100)/100;
            expoSkill = (data["exp"]-nowData["exp"])/(data["sum"]-sumSkill);
            break;
        case 1:

            //var skill = data["belt"]*skillsLvl[data["belt"]-1]*8;
            for(var i = 0; i < 9; i++)
                if(nowData["fr"+i]<data["frC"+i])
                    expoSkill+=data["frC"+i]-nowData["fr"+i];
            expoSkill = (data["exp"]-nowData["exp"])/expoSkill;
            break;
        case 2:
            for(var i = 0; i < 9; i++)
                if(skillLvlCmp(i) && data["frS"+i]!=0)
                    expoSkill+=skillLvlCmp(i);
            expoSkill = (data["exp"]-nowData["exp"])/expoSkill;
            break;
    }
    return Math.floor(expoSkill*100)/100;
}
//**********************************************************************************************
//Вывод информации
function output(mode, expoSkill){
    var id = getId();
    var expElem;
    var array = document.getElementsByTagName('td');
    for(var i=10; i<array.length; i++)
        if(/^&nbsp;\u00bb&nbsp;<b>\u0411\u043e\u0435\u0432\u043e\u0439 \u0443\u0440\u043e\u0432\u0435\u043d\u044c: .*/.test(array[i].innerHTML))
        {
            expElem = array[i];
            break;
        }
    var gBr = expElem.getElementsByTagName('br');
    var color = (dataUpdate["expoSkill"] <= expoSkill)?"green":"red";
    var div = document.createElement('div');
    div.innerHTML='&nbsp;(';
    var a = document.createElement('a');
    a.href = 'javascript: void(0);';
    a.innerHTML = '+';
    div.appendChild(a);
    div.innerHTML+=')&nbsp;';
    div.getElementsByTagName('a')[0].addEventListener('click', function(){winOpen(mode);}, false);
    var b = document.createElement('b');
    b.innerHTML = "\u0420\u0430\u0441\u0441\u0447\u0438\u0442\u044b\u0432\u0430\u044e \u043d\u0430 \u044d\u043a\u0441\u043f\u043e\u0443\u043c\u043a\u0443: ";
    div.appendChild(b);
    var font = document.createElement('font');
    font.setAttribute('color', color);
    font.innerHTML = expoSkill;
    div.appendChild(font);
    expElem.insertBefore(div, gBr[1]);
}
//**********************************************************************************************
//Окно настроек
function winOpen(mode){
    var over;
    var win;
    if(document.getElementById('winOverlay') && document.getElementById('win'))
    {
        over = document.getElementById('winOverlay');
        win = document.getElementById('win');
    }
    else
    {
        over = document.createElement('div');
        document.body.appendChild( over );

        win = document.createElement('div');
        document.body.appendChild( win );
    }

    over.id = 'winOverlay';
    over.style.left = '0px';
    over.style.width = '100%';
    over.style.background = "#000000";
    over.style.opacity = "0.5";
    over.style.zIndex = "1100";
    over.style.top = '0px';
    over.style.height = '100%';
    over.style.position = 'fixed';
    win.id = 'win';
    win.style.top = ( window.pageYOffset + 50 ) + 'px';
    win.style.position = 'absolute';
    win.style.left = ((window.innerWidth-500) / 2) + 'px';
    win.style.width = '500px';
    win.style.background = "#F6F3EA";
    win.style.zIndex = "1105";
    win.className='wb';
    win.innerHTML = '<div style="float:right;border:1px solid #AAA;width:15px;height:15px;text-align:center;cursor:pointer;" id="bt_close_tr" title="Close"><b>Х</b></div><div style="text-align:center"><b>\u041d\u0430\u0441\u0442\u0440\u043e\u0439\u043a\u0438</b></div>';

    var tb = document.createElement('table');
    tb.className='wb';
    tb.width='100%';
    tb.innerHTML = 
        "<tr><td class=wblight align=center><b>\u0420\u0435\u0436\u0438\u043c:</b></td>" +
        "<td class=" + (mode === 0 ? "wblight" : "wbwhite") + "><input  name=radio type=radio id=key0 " + (mode === 0 ? "checked=checked" : "") + "><label for=key0>\u0421\u0443\u043c\u043c\u0430 \u0443\u043c\u0435\u043d\u0438\u0439</label></td>" +
        "<td class=" + (mode == 1 ? "wblight" : "wbwhite") + "><input  name=radio type=radio id=key1 " + (mode == 1 ? "checked=checked" : "") + "><label for=key1>\u0423\u043c\u0435\u043d\u0438\u0435 \u0444\u0440\u0430\u043a\u0446\u0438\u0439</label></td>" +
        "<td class=" + (mode == 2 ? "wblight" : "wbwhite") + "><input  name=radio type=radio id=key2 " + (mode == 2 ? "checked=checked" : "") + "><label for=key2>\u0423\u0440\u043e\u0432\u0435\u043d\u044c \u0444\u0440\u0430\u043a\u0446\u0438\u0439</label></td></tr>"+
        "<tr><td class=wblight align=center>Опыт:</td><td colspan='3' class=wblight><input id='expField' type='text' placeholder='117,732,501' value='"+((data["exp"])?data["exp"]:"")+"' style='margin:5px;'></td></tr>"+
        "<tr id='sumSkills' style='display:"+(mode === 0 ? "" : "none")+"'><td class=wblight align=center>\u0421\u0443\u043c\u043c\u0430 \u0443\u043c\u0435\u043d\u0438\u0439:</td><td colspan='3' class=wblight>"+
        "<input id='sumSkillsInf' type='text' placeholder='32930.56' value='"+((data["sum"])?data["sum"]:"")+"' style='margin:5px;'></td></tr>";
    var fr = ["\u0420\u044b\u0446\u0430\u0440\u044c", "\u041d\u0435\u043a\u0440\u043e\u043c\u0430\u043d\u0442", 
              "\u041c\u0430\u0433", "\u042d\u043b\u044c\u0444", "\u0412\u0430\u0440\u0432\u0430\u0440", 
              "\u0422\u0451\u043c\u043d\u044b\u0439 \u044d\u043b\u044c\u0444", "\u0414\u0435\u043c\u043e\u043d", 
              "\u0413\u043d\u043e\u043c", 
              "\u0421\u0442\u0435\u043f\u043d\u043e\u0439 \u0432\u0430\u0440\u0432\u0430\u0440"]; //"Рыцарь", "Некромант", "Маг", "Эльф", "Варвар", "Тёмный эльф", "Демон", "Гном", "Степной варвар"
    for(var i=0; i<fr.length; i++)
        tb.innerHTML+="<tr class='fractionCount' style='display:"+(mode == 1 ? "" : "none")+"'><td class=wblight align=center >"+fr[i]+":</td><td colspan='3' class=wblight>"+
            "<input id='frC"+i+"' type='text' placeholder='40482.23' value='"+((data["frC"+i])?data["frC"+i]:"")+"' style='margin:5px;'></td></tr>";
    for(i=0; i<fr.length; i++)
        tb.innerHTML+="<tr class='fractionSel' style='display:"+((mode == 2 && nowData["fr"+i]<35000.00) ? "" : "none")+"'><td class=wblight align=center >"+fr[i]+":</td><td colspan='3' class=wblight>"+
            "<input id='frS"+i+"' type='text' placeholder='7' value='"+((data["frS"+i])?data["frS"+i]:"")+"' style='margin:5px;'></td></tr>";
    var select = "<select id='updateEvery'><option "+(dataUpdate["update"] === 0 ? "selected" : "")+" value=0>\u041a\u0430\u0436\u0434\u044b\u0439 \u0434\u0435\u043d\u044c</option>"+
        "<option "+(dataUpdate["update"]==1?"selected":"")+" value=1>\u041a\u0430\u0436\u0434\u0443\u044e \u043d\u0435\u0434\u0435\u043b\u044e</option>"+
        "<option "+(dataUpdate["update"]==2?"selected":"")+" value=2>\u041a\u0430\u0436\u0434\u044b\u0439 \u043c\u0435\u0441\u044f\u0446</option></select>";
    tb.innerHTML+="<tr><td class=wblight align=center>\u041e\u0431\u043d\u043e\u0432\u043b\u044f\u0442\u044c \u0441\u0442\u0430\u0442\u0443\u0441:</td><td class=wblight colspan='3' >"+select+"</td></tr>";
    win.appendChild(tb);

    var buttonSave = document.createElement('button');
    buttonSave.innerHTML='Save';
    buttonSave.style.width='500px';
    buttonSave.onclick = function(){save(mode);};
    win.appendChild(buttonSave);

    document.getElementById('bt_close_tr').addEventListener("click", closeWin, false);
    document.getElementById('winOverlay').addEventListener("click", closeWin, false);
    for(var key=0; key<3; key++)
        document.getElementById('key'+key).addEventListener("click", function(){
            mode = parseInt(this.id.split('key')[1]);
            document.getElementById('key'+mode).parentNode.className = "wblight";
            document.getElementById('key'+(mode+1)%3).parentNode.className = "wbwhite";
            document.getElementById('key'+(mode+2)%3).parentNode.className = "wbwhite";
            switch(mode)
            {
                case 0:
                    document.getElementById('sumSkills').style.display='';
                    for(i=0; i<document.getElementsByClassName('fractionCount').length;i++)
                        document.getElementsByClassName('fractionCount')[i].style.display='none';
                    for(i=0; i<document.getElementsByClassName('fractionSel').length;i++)
                        document.getElementsByClassName('fractionSel')[i].style.display='none';
                    break;
                case 1:
                    document.getElementById('sumSkills').style.display='none';
                    for(i=0; i<document.getElementsByClassName('fractionCount').length;i++)
                        document.getElementsByClassName('fractionCount')[i].style.display='';
                    for(i=0; i<document.getElementsByClassName('fractionSel').length;i++)
                        document.getElementsByClassName('fractionSel')[i].style.display='none';
                    break;
                case 2:
                    document.getElementById('sumSkills').style.display='none';
                    for(i=0; i<document.getElementsByClassName('fractionCount').length;i++)
                        document.getElementsByClassName('fractionCount')[i].style.display='none';
                    for(i=0; i<document.getElementsByClassName('fractionSel').length;i++)
                        if(nowData["fr"+i]<17300.00)
                            document.getElementsByClassName('fractionSel')[i].style.display='';
                    break;
            }
        }, false);

}
//**********************************************************************************************
//Закрытие окна настроек
function closeWin()
{
    var over = document.getElementById('winOverlay');
    var win = document.getElementById('win');
    over.parentNode.removeChild(over);
    win.parentNode.removeChild(win);
}
//**********************************************************************************************
//Сохранение настроек
function save(mode)
{
    var check=0;
    if(!document.getElementById('expField').value)
    {
        alert('\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043e\u043f\u044b\u0442!');
        return;
    }
    if(document.getElementById('expField').value < nowData["exp"])
    {
        alert('\u041e\u043f\u044b\u0442 \u0434\u043b\u044f \u0432\u044b\u0447\u0438\u0441\u043b\u0435\u043d\u0438\u044f \u043d\u0435 \u043c\u043e\u0436\u0435\u0442 '+
              '\u0431\u044b\u0442\u044c \u043c\u0435\u043d\u044c\u0448\u0435 \u0440\u0435\u0430\u043b\u044c\u043d\u043e\u0433\u043e \u043e\u043f\u044b\u0442\u0430!');
        return;
    }
    var exp = document.getElementById('expField').value;
    while(/\,/.test(exp))
        exp=exp.replace(',', '');
    var save = "mode:"+mode+"|exp:"+exp;
    switch(mode)
    {
        case 0:
            if(document.getElementById('sumSkillsInf').value)
                save += "|sum:"+document.getElementById('sumSkillsInf').value;
            else
            {
                alert('\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0441\u0443\u043c\u043c\u0443 \u0443\u043c\u0435\u043d\u0438\u0439!');
                return;
            }
            break;
        case 1:
            for(var i = 0; i<9; i++)
                if(document.getElementById('frC'+i).value!='')
                    check=1;

            if(check)
                for( i = 0; i<9; i++)
                    save+="|frC["+i+"]:"+((document.getElementById('frC'+i).value=='')?0:document.getElementById('frC'+i).value);
            else
            {
                alert('\u0417\u0430\u043f\u043e\u043b\u043d\u0438\u0442\u0435 \u0445\u043e\u0442\u044f \u0431\u044b \u043e\u0434\u043d\u043e \u043f\u043e\u043b\u0435'+
                      ' \u0443\u043c\u0435\u043d\u0438\u0439 \u0444\u0440\u0430\u043a\u0446\u0438\u0439!');
                return;
            }
            break;
        case 2:
            for(var i = 0; i<9; i++)
            {
                if(document.getElementById('frS'+i).value!='')
                    check=1;
                if(document.getElementById('frS'+i).value>12)
                    check=2;
            }
            if(check==1)
                for(var i = 0; i<9; i++)
                    save+="|frS["+i+"]:"+((document.getElementById('frS'+i).value=='')?0:document.getElementById('frS'+i).value);
            else
            {
                if(!check)
                    alert('\u0417\u0430\u043f\u043e\u043b\u043d\u0438\u0442\u0435 \u0445\u043e\u0442\u044f \u0431\u044b \u043e\u0434\u043d\u043e'+
                          ' \u043f\u043e\u043b\u0435 \u0443\u0440\u043e\u0432\u043d\u044f \u0444\u0440\u0430\u043a\u0446\u0438\u0439!');
                else
                    alert('\u0423\u0440\u043e\u0432\u0435\u043d\u044c \u0443\u043c\u0435\u043d\u0438\u044f \u043d\u0435 \u043c\u043e\u0436\u0435\u0442 \u0431\u044b\u0442\u044c'+
                          ' \u0431\u043e\u043b\u044c\u0448\u0435 12!');
                return;
            }
            break;
    }
    localStorage.setItem("Expofob"+getId(), save);
    data = parseExpofobLoad();
    var update = "update:"+document.getElementById('updateEvery').selectedIndex;
    switch(parseInt(document.getElementById('updateEvery').selectedIndex))
    {
        case 0:
            update+="|now:"+(new Date().getDay());
            break;
        case 1:
            update+="|now:"+(new Date().getWeek());
            break;
        case 2:
            update+="|now:"+((new Date().getMonth())+1);
            break;
    }
    update+="|expoSkill:"+computeExpoSkill(data, nowData);
    localStorage.setItem("ExpofobUpdate"+getId(), update);
    alert('Сохранено!');
}
//**********************************************************************************************
//Парсинг информации
function parseInfPage()
{
    var expElem;
    var array = document.getElementsByTagName('td');
    for(var i=10; i<array.length; i++)
        if(/^&nbsp;\u00bb&nbsp;<b>\u0411\u043e\u0435\u0432\u043e\u0439 \u0443\u0440\u043e\u0432\u0435\u043d\u044c: .*/.test(array[i].innerHTML))
        {
            expElem = array[i];
            break;
        }
    var inf = [];
    inf["exp"]=array[i].innerHTML.split('(')[1].split(')')[0];
    while(/\,/.test(inf["exp"]))
        inf["exp"]=inf["exp"].replace(',', '');
    inf["exp"]=parseInt(inf["exp"]);
    for(i=10; i<array.length; i++)
        if(/^&nbsp;&nbsp;\u0420\u044b\u0446\u0430\u0440\u044c: .*/.test(array[i].innerHTML)||/^&nbsp;&nbsp;<b>\u0420\u044b\u0446\u0430\u0440\u044c: .*/.test(array[i].innerHTML))
        {
            expElem = array[i];
            break;
        }
    for(i=0; i<9; i++)
        inf["fr"+i]=parseFloat(expElem.innerHTML.split('(')[i+1].split(')')[0]);
    return inf;
}
//**********************************************************************************************
//Парс загруженной информации
function parseExpofobUpdateLoad()
{
    var forParse = localStorage.getItem("ExpofobUpdate"+getId());
    var inf = [];
    inf["update"]=parseInt(forParse.split(':')[1].split('|')[0]);
    inf["now"]=parseInt(forParse.split(':')[2].split('|')[0]);
    inf["expoSkill"]=parseInt(forParse.split(':')[3].split('|')[0]);
    return inf;
}
//**********************************************************************************************
//Парс загруженной информации
function parseExpofobLoad()
{
    var forParse = localStorage.getItem("Expofob"+getId());
    var inf = [];
    inf["mode"]=parseInt(forParse.split(':')[1].split('|')[0]);
    inf["exp"]=parseInt(forParse.split(':')[2].split('|')[0]);
    switch(inf["mode"])
    {
        case 0:
            inf["sum"]=parseFloat(forParse.split(':')[3].split('|')[0]);
            break;
        case 1:
            for(var i = 0; i<9; i++)
                inf["frC"+i]=parseInt(forParse.split(':')[i+3].split('|')[0]);
            break;
        case 2:
            for(var i = 0; i<9; i++)
                inf["frS"+i]=parseInt(forParse.split(':')[i+3].split('|')[0]);
            break;
    }
    return inf;
}
//**********************************************************************************************
//Получаем ID
function getId()
{
    if(/.*heroeswm.ru\/pl_info.php.*/.test(location.href))
        return location.href.match( /\?(?:.*=.*&)*id=([0-9]*)(?:&.*=.*)*/ )[1];
    else
    {
        var array = document.getElementsByTagName('a');
        for(var i=10; i<array.length; i++)
            if(/<a href="pl_info\.php\?id=[0-9]*" class="pi">.*<\/a>/.test(array[i].outerHTML))
                return array[i].outerHTML.split('id=')[1].split('"')[0];
    }
}
//**********************************************************************************************
//Номер недели
Date.prototype.getWeek = function () {
    var target  = new Date(this.valueOf());
    var dayNr   = (this.getDay() + 6) % 7;
    target.setDate(target.getDate() - dayNr);
    var first = target.valueOf();
    target.setMonth(0, 1);
    if (target.getDay() != 4) {
        target.setMonth(0, 1 + ((4 - target.getDay()) + 7) % 7);
    }
    return 1 + Math.ceil((first - target) / 604800000);
};
//**********************************************************************************************
//Проверка уровня умений
function skillLvlCmp(i)
{
    var skillsLvl = [20, 50, 90, 160, 280, 500, 900, 1600, 2900, 5300, 9600, 17300, 35000];
    return (nowData["fr"+i]>skillsLvl[data["frS"+i]-1])?0:skillsLvl[data["frS"+i]-1]-nowData["fr"+i];
}