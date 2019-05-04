// ==UserScript==
// @name           Virtonomica:Заполнение склада
// @namespace      virtonomica
// @description    Помощник по заполнению склада
// @author         UnclWish
// @include        http*://*virtonomic*.*/*/main/unit/view/*
// @version        2.3
// ==/UserScript==

var run = function()
{
//----------------------------------------------------------------
  	var win = (typeof(unsafeWindow) != 'undefined' ? unsafeWindow : top.window);
  	var $ = win.$;

	//---------------------------------------------------------------------
	// работа с локальным хранилищем
	//---------------------------------------------------------------------
	/**
	* записать данные в локальное хранилище, с проверкой ошибок
	*/
	function ToStorage(name, val)
	{
	    try {
	       window.localStorage.setItem(name, JSON.stringify(val));
	    } catch(e) {
	       var out = "Ошибка добавления в локальное хранилище";
	       console.log(out);
	    }
	}

	//---------------------------------------------------------------------
	// end of работа с локальным хранилищем
	//---------------------------------------------------------------------
	var wc_info = $("<div id=v_info></div>");
	var wc_link = $("<div id=v_link></div>");

	// Проверим ссылку что это игровое поле
	var href = location.href;
	var realm = href.replace('https://virtonomica.ru/','');
	realm = realm.substr(0,4);
	var tm_info_link = `https://virtonomica.ru/${realm}/window/globalreport/tm/info`;
	var vl_info_link = `https://virtonomica.ru/${realm}/main/industry/unit_type/info/2011/volume`;

	var title=$('#wrapper > div.metro_header > div > div.picture').attr('class');
	if (title.search('unit-header-warehouse') == -1) return; // Выход если не склад

	var a1=$('div.title').text().trim();
	var a2=a1.slice(0,5);

    //if(a2 != "Склад") return; // Выход если не склад

	var a3=(location.href).slice(-3);
	//console.log(a3);
	  if (isNaN(a3)) return; //Выход если не главная страница

	if (a1.indexOf("Офис") == -1 ) return; //Выход если главная страница не нашей компании

	$("table.infoblock").after(wc_info);
	$("table.grid").after(wc_link);

	function getValsArray() {
		var vals_array = new Object();
		$.ajax({
		url: vl_info_link,
		async: false, //то самое плохое место с синхронными запросами. Зато работает без дополнительных проверок. Но лучше избегать, конечно.
		success: function(data){
			var table = $("table.grid", data);
			//console.log('table = ' + table.length);
			//alert ('table = ' + table.length);
			var tr = $("tbody > tr", table);
			//console.log('tr = ' + tr.length);
			for (var i=0; i<tr.length; i++){
				var th = $("th", tr.eq(i) );
				var td = $("td", tr.eq(i) );
				var img = $("a", tr.eq(i) );
				var src = img.attr('href');
				for(var j=0; j< td.length; j++){
					var code = src.replace('https://virtonomica.ru/'+realm+'/main/product/info/','');
					var name = th.eq(j).text();
					var vals = td.eq(j).text();
					vals = parseFloat( vals.replace('$', '').replace(' ', '').replace(' ', '').replace(' ', '') );
					vals_array[name] = new Object();
					vals_array[code] = new Object();
					vals_array[name].name = name;
					vals_array[code].code = code;
					vals_array[name].vals = vals;
					vals_array[code].vals = vals;
				}
			}
			ToStorage('vals_array', vals_array);
		},
		//ajaxError:
		//$("#v_info").append("<br>" + np + " - нет данных по объемам хранения. Если товар не ТМ, сохраните данные на странице по <a href=https://virtonomica.ru/"+realm+"/main/industry/unit_type/info/2011/volume>ссылке</a>").css('color', 'red')
		});
	}

	function getArrayTM() {
		var arrayTM = new Object();
		$.ajax({
		url: tm_info_link,
		async: false, //то самое плохое место с синхронными запросами. Зато работает без дополнительных проверок. Но лучше избегать, конечно.
		success: function(data){
	  		var tmimg_data = $("td>img[src*='/img/products']",data);
			//console.log (tmimg_data);
			//var tm_data = $("td>img[src*='/img/products']",data).parent().next();
			for (var i=0; i<tmimg_data.length; i++) {
				var tm_data = tmimg_data.eq(i).parent().next();
				var code = tmimg_data.eq(i).attr('src');
				//console.log(code);
				var tm_name = tm_data.text();
				tm_name = tm_name.split('\n');
				tm_name = tm_name[2].trim();
				//np = tm_name;
				var name = tm_name;
				//console.log(name);
				arrayTM[name] = new Object();
				arrayTM[code] = new Object();
				arrayTM[name].name = name;
				arrayTM[name].code = code;
				arrayTM[code].name = name;
				}
			ToStorage('arrayTM', arrayTM );
		},
		//ajaxError:
		//$("#v_info").append("<br>" + np + " - нет данных по объемам хранения. Если товар не ТМ, сохраните данные на странице по <a href=https://virtonomica.ru/"+realm+"/main/industry/unit_type/info/2011/volume>ссылке</a>").css('color', 'red')
		});
	}

	function num(num, x){
		//num = num.toFixed(2);
		var parts = num.split('.');
		parts[0] = parts[0].substr(0, parts[0].length%3)+parts[0].substr(parts[0].length%3).replace(/(\d{3})/g,' \$1');
        if (parts[0].length%4 == 0) parts[0] = parts[0].slice(1);
        if (x) return parts.join('.');
		else return parts[0];
	}

	function UpdateValsStorage() {
		// удаляем данные по объемам хранения и обновляем страницу
		window.localStorage.removeItem('vals_array');
		getValsArray();
		location.reload();
	}

	var vals_array = JSON.parse(window.localStorage.getItem('vals_array'));
		if (vals_array == null) {
			getValsArray();
			vals_array = JSON.parse(window.localStorage.getItem('vals_array'));
		}

	//var UpdateVals = $('<input type=submit class=button100 id=bsave value="Обновить">').unbind('click').click(function() {
	var UpdateVals = $('<button id=bsave>Обновить</button>').unbind('click').click(function() {
		UpdateValsStorage();
	});

	$("#v_info").html("Вы можете обновить значения объемов хренения, если они изменились ").css('color', 'blue').append(UpdateVals);

	// -------------------------- определяем размер склада
	var valskl = $("table.infoblock td.title:eq(0)").next().text();
	var typeskl = $("table.infoblock td.title:eq(1)").next().text();
	var valskl2 = valskl.slice(-10).slice(0,1);
	valskl = parseFloat(valskl) * 1000;
	//console.log (valskl);
	//console.log (valskl2);
	if (valskl2 == "н") valskl = valskl * 1000;
	//console.log (typeskl);
	if (typeskl == "Загоны для животных") valskl = valskl * 10
// -------------------------------------------------------------------------------------------------
/// -------------------------- добавляем столбцы, расчитываем и выводим новое заполнение склада
	var r = 0;
	var sumproc = 0; // суммарный процент заполнения
	$("table.grid tbody tr[class]").each( function(){
	  var nameprod = $("td:eq(0)",this).text();
	  var imgprod = $("td:eq(0)>img",this).attr('src');
	  //console.log(imgprod);
	  var nowqual = $("td:eq(1)",this).text().trim().replace(' ', '').replace(' ', '').replace(' ', '').replace(' ', '');
	  var nowsale = $("td:eq(5)",this).text().trim().replace(' ', '').replace(' ', '').replace(' ', '').replace(' ', '');
	  var nowzak = $("td:eq(6)",this).text().trim().replace(' ', '').replace(' ', '').replace(' ', '').replace(' ', '');
	  var newqual = nowqual - nowsale;
	  if (newqual < 0) newqual = 0;
	  newqual = newqual + nowzak * 1;
	  var sklproc = Get_skl_procent(imgprod, nameprod, valskl, newqual);
	  /*if (isNaN(sklproc)) {	// Если нет в базе, т.е. ТМ-ка, пробуем расчитать по складской процентовке, иначе считаем "0"
	     var nowproc=$("td:eq(9)",this).text();
	     nowproc=parseFloat(nowproc)*1;
	     sklproc=0;
	     if (nowproc!=0) {
	       sklproc=nowproc*newqual/nowqual;
	     }
	   }*/
	  sklproc = sklproc.toFixed(2);
	  var tcolor = "green";
	  if (sklproc > 69.99) tcolor = "orange";
	  if (sklproc > 89.99) tcolor = "red";
	  var txt = "<td align=right class=nowrap style=color:"+tcolor+">"+sklproc+" %</td>";
	  if (r == 0) $(this).prev().append('<th>Будет %</th><th>');
	  r = r + 1;
	  sumproc = sumproc + sklproc * 1;
	  $(this).append(txt);
	});
// -------------------------- добавляем сведения о доставках на склад -----------------------------------
	var prod_name = [];
	var prod_qual = [];
	var prod_img = [];
	var new_url = location.href+"/delivery";
	var u = 0;
	var a = 0;
	var b = 0;

	$.get(new_url, function(data) {
	  $('#mainContent>table.list>tbody>tr[class]>td',data).each(function() {
          switch (u) { // Доставляемый товар и количество
	  case 0:
	    prod_name[a] = $(this,data).text().trim();
		prod_img[a] = $("img[src*='/img/products']",this).attr('src');
		a = a + 1;
	    break;
	  case 1:
	    prod_qual[b] = $(this,data).text().trim().replace(' ', '').replace(' ', '').replace(' ', '').replace(' ', '');
	    b = b + 1;
	    break;
	  }

	    u = u + 1;
	  if (u==3) u = 0;
	});

	  if (u==0) var valdos = 0;
	  var dossum = AfterLoad (valskl, prod_name, prod_qual, prod_img);
	  sumproc = sumproc + dossum * 1;
	sumproc = sumproc.toFixed(2);
	var tcolor2 = "green";
	   if (sumproc > 69.99) tcolor2 = "orange";
	   if (sumproc > 89.99) tcolor2 = "red";

	$("table.grid tbody").append("<tr><td style=color:blue>Просмотр <a href="+vl_info_link+">объемов хранения</a> и <a href="+tm_info_link+">списка ТМ</a><td><td><td><td><td><td><td><td><td>Итого:</td><td align=right class=nowrap style=color:"+tcolor2+">"+sumproc+" %</td></tr>");
	});
//-------------------------------------------------------------------------------------------------------------
// -------------------------- расчет процента заполнения склада-------------------------------------------------
	function Get_skl_procent(ip, np, vs, vp){
	  if (vals_array[np] == null ) {
		var arrayTM = JSON.parse(window.localStorage.getItem('arrayTM'));
		if (arrayTM == null) {
			getArrayTM();
			arrayTM = JSON.parse(window.localStorage.getItem('arrayTM'));
		}
		if (arrayTM[ip].name == null) {
			$("#v_info").append('Объемы хранения товара "'+name+'" не найдены, возможно новый товар. Обновляем базу ИЦ...').css('color', 'red').css('font-size', '8pt');
			getValsArray();
			vals_array = JSON.parse(window.localStorage.getItem('vals_array'));
				if (vals_array[np] == null ) {
					$("#v_info").append('Объемы хранения товара "'+name+'" не найдены, возможно новый товар с ТМ. Обновляем базу ИЦ ТМ...').css('color', 'red').css('font-size', '8pt');
					getArrayTM();
					arrayTM = JSON.parse(window.localStorage.getItem('arrayTM'));
					np = arrayTM[ip].name;
				}
		}
	    else np = arrayTM[ip].name;
	  }
	  var proc = vp / vals_array[np].vals * 10000 / vs * 100;
  	return proc;
  	}
// -------------------------- расчет процента доставки на склад-------------------------------------------------------
  	function AfterLoad (vs, p_n, p_q, p_i){
    	var sp = 0;
      	for (var y=0; y<p_n.length; y++) {
		var np = p_n[y];
		var vp = p_q[y];
		var ip = p_i[y];
		var dosproc = Get_skl_procent (ip, np, vs, vp);
		var tcolor3 = "green";
      	if (dosproc > 69.99) tcolor3 = "orange";
      	if (dosproc > 89.99) tcolor3 = "red";
      	dosproc = dosproc.toFixed(2);
      	var vpnum = num (vp, false);
      	$("table.grid tbody").append("<tr style='BACKGROUND-COLOR : #d0f0c0'><td><img src='"+ip+"' alt='"+np+"' width='25' align=middle style='margin-right: 10px' border=0>"+np+"<td><td><td><td><td><td><td align=right>"+vpnum+"<td><td>Доставка :</td><td align=right class=nowrap style=color:"+tcolor3+">"+dosproc+" %</td></tr>");
      	sp = sp + dosproc * 1;
      	}
	  	sp = sp.toFixed(2);
      	tcolor3 = "green";
      	if (sp > 69.99) tcolor3 = "orange";
      	if (sp > 89.99) tcolor3 = "red";
	  	if (sp == 0) $("table.grid tbody").append("<tr><td><td><td><td><td><td><td><td><td><td>Доставок нет</td><td align=right class=nowrap style=color:"+tcolor3+"></td></tr>");
      	else $("table.grid tbody").append("<tr><td><td><td><td><td><td><td><td><td><td>Доставка всего:</td><td align=right class=nowrap style=color:"+tcolor3+">"+sp+" %</td></tr>");
	return sp;
  	}
};

var script = document.createElement("script");
script.textContent = '(' + run.toString() + ')();';
document.documentElement.appendChild(script);