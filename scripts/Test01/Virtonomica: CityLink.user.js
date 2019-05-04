// ==UserScript==
// @name        Virtonomica: CityLink
// @namespace   virtonomica
// @description Добавляет на гланвую страницу Мед.центров и Ресторанов возможность быстро посмотреть состояние розничного рынка по расходникам
// @include     https://*virtonomic*.*/*/globalreport/marketing/by_trade_at_cities/*
// @include     https://*virtonomic*.*/*/main/unit/view/*
// @include     https://*virtonomic*.*/*/window/unit/produce_change/*
// @version     0.33
// @grant       none
// ==/UserScript==
var run = function() {
var win = (typeof(unsafeWindow) != 'undefined' ? unsafeWindow : top.window);
$ = win.$;

//console.log("link---1");
  var url_api = "https://virtonomica.ru/api/vera/main/marketing/report/retail/metrics";
  var url_report = "https://virtonomica.ru/vera/main/globalreport/marketing/?product_id=";
/**
 * записать данные в локальнео хранилище, с проверкой ошибок
 */
function ToStorage(name,  val)  {
	try {
		window.localStorage.setItem( name,  JSON.stringify( val ) );
	} catch(e) {
		console.log("Ошибка добавления переменной "+name +" в локальное хранилище");
	}
}
  
  function numberFormat (number) {
        	number += '';
	        var parts = number.split('.');
	        var int = parts[0];
	        var dec = parts.length > 1 ? '.' + parts[1] : '';
	        var regexp = /(\d+)(\d{3}(\s|$))/;
	        while (regexp.test(int)) {
        	    int = int.replace(regexp, '$1 $2');
	        }
	        return int + dec;
	}

//console.log("link---2");
var wc_save = $("<td><img title='Запомнить ИД городов' alt='Запомнить ИД городов' src='https://cdn3.iconfinder.com/data/icons/snowish/32x32/actions/document-save-as.png'></td>");
wc_save.click(function(){
	$("#out_text").text('wc_save');

	var fld = $('fieldset');
	if (fld.length == 0 ){
		$("#out_text").text('Что-то пошло не так [fieldset]').css('color', 'red');
		return;
	}

	var table = $('table:eq(1)', fld);
	if (table.length == 0 ){
		$("#out_text").text('Что-то пошло не так [table]').css('color', 'red');
		return;
	}
	var td = $('td', table);

	var select_1 = $('select', td.eq(0) );
	var el = $(':selected', select_1);
	if (el.text() != '') {
		$("#out_text").text('Выберите режим показа всех городов реалма').css('color', 'red');
		return;
	}

	var City_info = new Object();

	var select_3 = $('select', td.eq(4) );
	var opt = $('option', select_3);
	//str = '';
	for(var i=0; i< opt.length; i++){
		if ( opt.eq(i).text() == '') continue;
		if (City_info[ opt.eq(i).text() ] == null) City_info[ opt.eq(i).text() ] = new Object();
		City_info[ opt.eq(i).text() ]['link'] = opt.eq(i).val();
		//str+= opt.eq(i).val() + "=" + opt.eq(i).text()+ "<br>";
	}
	ToStorage('City_info', City_info);
	$("#out_text").text('Ссылки на города записаны в локальное хранилище').css('color','green');

	//$("#out_text").text('wc_save end');
});

//console.log("link---3");
/**
* Определить тип подраздления
* @return '' - если тип неизвестен
иначе 'medicine', 'restaurant' или 'fitness'
*/
function getTypeUnit( img )
{
	//console.log('getTypeUnit');
  //console.log( img ):
	// кривой способ определения типа юнита по названию вкладки
  var link = $('ul.tabu li');
  var title = '';
  if ( link.length > 0 ) {
    //console.log('link.length > 0');
  	title = $.trim( link.eq(1).text() );  
    //console.log( title );
    
		if ( title == 'Медицинский центр' ) return 'medicine';
		if ( title == 'Ресторан' ) return 'restaurant';
		if ( title == 'Авторемонтная мастерская' ) return 'repair';
		if ( title == 'Предприятие дошкольного образования' ) return 'educational';

  } else {
    //console.log('link.length == 0');
    //title = '---';
  	title = img.attr('src');
    //n = title.lastIndexOf('medicine');
    if ( title == '/img/unit_types/medicine.gif' ) return 'medicine';
    if ( title == '/img/unit_types/restaurant.gif' ) return 'restaurant';
    if ( title == '/img/unit_types/repair.gif' ) return 'repair';
    if ( title == '/img/unit_types/educational.gif' ) return 'educational';
    
    //console.log('....');
  }
  
	//console.log( title );

	return '';

	/*
	var list_type = ['service_light', 'medicine', 'restaurant', 'service', 'repair', 'educational'];
	//console.log( list_type );
	
	var img_src = img.attr('src');
	var department = '';
	for(var i=0; i< list_type.length; i++) {
		var n = img_src.lastIndexOf( list_type[i] );
		if ( n < 0 ) continue;
		department = list_type[i];
		if ( department == 'service_light') department = 'fitness';
		break;
	}
	//console.log('department=' + department);
	
	return department;
	*/
}
  
function getTypeUnitFromImg( img )  
{
	var list_type = ['service_light', 'medicine', 'restaurant', 'service', 'repair', 'educational', 'kindergarten'];
	//console.log( list_type );
	
	var img_src = img.attr('src');
	var department = '';
	for(var i=0; i< list_type.length; i++) {
		var n = img_src.lastIndexOf( list_type[i] );
		if ( n < 0 ) continue;
		department = list_type[i];
		if ( department == 'service_light') department = 'fitness';
    if ( department == 'kindergarten' ) department = 'educational';
		break;
	}
	//console.log('department=' + department);
	
	return department;
}
//===================
// start point
//===================
var href = location.href;
// пропустить неправильные ссылки
exclude = ['finans_report', 'virtasement', 'city_market', 'consume', 'supply'];
for (i=0 ; i< exclude.length; i++){
  n = href.lastIndexOf( exclude[i] );
  if (n > 0 ) return;
}

// проверить что эта страница с рынком городов
n = href.lastIndexOf( 'by_trade_at_cities' );
if (n > 0) {
	// Добавить кнопку в меню
	var table = $("table.tabsub");
	$("td:eq(0)", table).before(wc_save);
	table.before('<div id=out_text style="float:left"></div>');
	return;
}
var department = '';
// проверить что это страница специализации
n = href.lastIndexOf( 'produce_change' );
if (n > 0) {
	//department = '';
	// проверить тип по картинке
	var img = $('img.imgContainer' );
	//console.log( img );
	department = getTypeUnitFromImg( img );
	console.log( "department = " + department );
	if ( department.length == 0 ) return;
	
	$('div.unit_name').before('<div style="float:right;" id=type_data><img title="Запомнить специализации" alt="Запомнить специализации" src="http://www.iconsearch.ru/uploads/icons/snowish/32x32/document-save-as.png" style="cursor:pointer;"></div>');
	$('div.unit_name').append('<div id=out_text style="float:right;margin-left:8px;margin-bottom:4px;background: white none repeat scroll 0 0;font-size: 12px;max-width: 500px;"></div>');	
	

	$('#type_data').click(function (){
		//console.log('click');  
		var img = $('img.imgContainer' );
    //console.log( img );
		department = getTypeUnitFromImg( img );
		console.log('department: '+department);
		
		// объект для хранения данных о расходниках
    		Med_info = JSON.parse( window.localStorage.getItem('Med_info') );
		if ( Med_info == null ) Med_info = new Object();

		var table = $('table.list');
		var name = $('td[width=150]', table);
		if (department.lastIndexOf('fitness') != -1 ) {
			//console.log('find fitness');
			var tr = $("input[type='radio']", table);
			//console.log("tr = "+ tr.length);
			for ( var k=0; k<tr.length; k++ ) {
				var type_name = tr.eq(k).parent().next().text();
				//console.log( type_name );
				Med_info[ type_name ] = new Array();
				Med_info[ type_name ][0] = new Object();
				Med_info[ type_name ][0]['id'] = 15337;
				Med_info[ type_name ][0]['src'] = '/img/products/24/trainer.gif';
				Med_info[ type_name ][0]['dep'] = department;
				Med_info[ type_name ][0]['num'] = 1;
				Med_info[ type_name ][0]['all'] = 600;
			}
		} else {
			var td = $('td[width=150]', table).next().next();
			//console.log(tr);
			for(var i=0; i<td.length; i++){
				var type_name = name.eq(i).text();
				//console.log( type_name );
				Med_info[ type_name ] = new Array();
				//console.log( td.eq(i) );
				var all_pos = parseInt( td.eq(i).next().text().replace(' ','').replace(' ','').replace(' ','') );
				
				var aref = $('img', td.eq(i) ).parent();
				//console.log('aref='+ aref.length);
				for(var k=0; k<aref.length; k++) {
					var d_href = aref.eq(k).attr('href');
					var d_id = /(\d+)/.exec(d_href)[0];
					//console.log( d_id );
					var d_img = $('img', aref.eq(k) );
					//console.log( d_img.attr('src') );

					var el = aref.eq(k).parent().parent().next();
					var d_num = /(\d+)/.exec( el.text() )[0];
					//console.log( d_num );				
					Med_info[ type_name ][k] = new Object();
					Med_info[ type_name ][k]['id'] = d_id;
					Med_info[ type_name ][k]['src'] = d_img.attr('src');
					Med_info[ type_name ][k]['dep'] = department;
					Med_info[ type_name ][k]['num'] = d_num;
					Med_info[ type_name ][k]['all'] = all_pos;
					
					$('#out_text').html('department: ' +k + '=='+department);
					//console.log( d_id + ' : ' + d_img.attr('src') + ' [' + d_num + ']');
					
					
				}
			}
		}
		//console.log( Med_info );
		ToStorage('Med_info', Med_info);
		$('#out_text').html('данные сохранены в локальное хранилище').css('color', 'green');
		//$('#out_text').html( JSON.stringify( Med_info ));

	});
	
	return;
}
// Это страница подразделения
//department = '';

// проверить что это медицина
//console.log('check');
var img= $('#unitImage img');
//console.log( img );
department = getTypeUnit( img );
if ( department == '' ) return;
	//console.log(department);
	// это медицина или рестораны Или фитнесы
	
	// Добавили див для служебных сообщений
	$('#mainContent').before('<div id=out_text style="color:white;float:left; margin-left:8px;margin-bottom:4px;"></div>');
	
	// объект для хранения данных о расходниках
 	Med_info = JSON.parse( window.localStorage.getItem('Med_info') );
	if ( Med_info == null ) {
		Med_info = new Object();
		//console.log('Med_info error');
		$("#out_text").html('Ошибка чтения Med_info из локального хранилища<br>Попытатся поулчить данные для <b>Med_info</b> можно на странице смены специализации').css('color', 'yellow');
		return;
	}
	
	// фикс для данных о фитнесах
	/*
	if ( department == 'fitness') {
		Med_info[department][]
	}
	*/

	city_unit ='';
	//var el_str = $('div.officePlace').text();
	var el_str = $('div.title a[href*="regionlist"]').parent().html();
	//console.log( el_str + "---" );

	tmpl_begin = '</div>';
	n = el_str.lastIndexOf(tmpl_begin);
	if (n < 0) {
		$("#out_text").text('Ошибка в поиске местоположения ' + tmpl_begin + ' - требуется правка скрипта').css('color', 'yellow');
		return;
	}
	var temp = el_str.substr(n+tmpl_begin.length, el_str.length - n - tmpl_begin.length);

	//console.log("===="+ temp + ", n = "+ n );
	n = temp.indexOf('(<');
	if (n < 0) {
		$("#out_text").text('Ошибка в поиске местоположения - требуется правка скрипта').css('color', 'yellow');
		return;
	}

	city_unit = $.trim( temp.substr(0, n-1) );
	//console.log("n=" + n +", [" +city_unit +"]");

	// читаем данные из локального хранилища
	City_info = JSON.parse( window.localStorage.getItem('City_info') );
	if ( City_info == null ) {
		$("#out_text").html('Ошибка чтения City_info из локального хранилища<br>Попытатся поулчить данные для <b>City_info</b> можно по <a href=https://virtonomica.ru/vera/window/globalreport/marketing/by_trade_at_cities/359861>ссылке</a>').css('color', 'red');
		return;
	}
	if (City_info[city_unit]== null){
		//console.log( City_info );
		$("#out_text").html('В локальном хранилище нет данных по городу <b>' + city_unit + '</b><br>Получить данные можно по <a href=https://virtonomica.ru/vera/window/globalreport/marketing/by_trade_at_cities/359861>ссылке</a>').css('color', 'red');
		return;
	}

	var type = $('div.cheader div').text();
	//type = $.trim( el_str.substr( 0, n - 1) );
	
	//console.log(type);
	if ( Med_info[type] == null) {
		$("#out_text").html('Отсутствуют данные о расходниках для специализации: '+ type + '<br>Попытатся поулчить данные можно на странице смены специализации').css({'color':'red', 'padding': '4px', 'background': 'white'});
		return;
	}
	//console.log('---&&&---' + department);
	var sel_type = '<select id=unit_type>';
        //console.log( Med_info ) ;
	for(key in Med_info) {
		//console.log( department + ' == ' + key + ' == ' + Med_info[ key ][0]['dep']);
		if ( Med_info[ key ][0]['dep'] != department) continue;
		sel_type+= '<option value="'+ key +'"';
		if (type==key) sel_type+= ' selected'
		sel_type+= '>'+ key + '</option>';
	}
	sel_type+= '</select>';
	sel_type+= '<div id=component>--</div>';
	//console.log(sel_type);
	$('div.competitionDescr').append("<div id=market_info style='float: right;color:grey;'></div><div>"+sel_type+"</div>");
	//$("#out_text").text('читаем данные из локального хранилища');

	function print_component(){
		var type = $('#unit_type').val();
		//console.log( 'print_component ' + type );
		var str = '';
		for(var i=0; i< Med_info[type].length; i++) {
			if ( Med_info[type][i]['num'] > 1) str+= '<span style="margin:4px; border 1px solid #ccc">'+Med_info[type][i]['num'];
			str+= '<img class=ujs_control border=0 src="' +Med_info[type][i]['src'] + '" item=' + Med_info[type][i]['id'] + ' style="cursor:pointer;width:18px;"> ';
			if ( Med_info[type][i]['num'] > 1) str+= '</span>';
		}
		$('#component').html(str);

		$('img.ujs_control').click(function(){
			item = $(this).attr('item');
			//console.log('get_item('+ item + ')');
			//console.log('city = ' + city_unit);
			// Реалм
			var realm = /^https:\/\/virtonomic[as]\.(\w+)\/(\w+)\/\w+\//.exec(location.href)[2];
			//console.log(realm);
			var link = '/'+realm+ '/window/globalreport/marketing/by_trade_at_cities/'+ item + City_info[city_unit]['link'];
			//console.log(link);

      var n = City_info[city_unit]['link'].lastIndexOf('/');
			var img = '<img style="float:left;" src=' + $(this).attr('src') + '>';

      // вырезаем символ "/" в начале ссылки на город из локального хранилища
      var link_api = url_api + "/?product_id=" + item + "&geo=" + City_info[city_unit]['link'].substr(1);
      //console.info(link_api);
      
      //console.info(City_info[city_unit]);
      $('#market_info').html('Запрашиваем данные...');
      $.get( link_api,function(market){
      		$('#market_info').html('Разбираем данные...');
          var price = parseFloat(market.local_price);
          var quality = parseFloat( market.local_quality );
          var size = parseInt( market.local_market_size );
        
          var n = City_info[city_unit]['link'].lastIndexOf('/');
          var my_img = '<img width="400px" style="float:left;clear:both;" src="/' +realm+'/graph/globalreport/marketing/product/' + item + '/'+  City_info[city_unit]['link'].substr(n+1, City_info[city_unit]['link'].length - n) +'">';

        //https://virtonomica.ru/vera/main/globalreport/marketing/?product_id=15334&geo=15905/3042/3049
        	var link_report = url_report + item + "&geo=" + City_info[city_unit]['link'].substr(1);
        	//console.info(link_report);
        
          $('#market_info').html(
            img + '<table style="float:left;">'
            +'<tr><td style="padding:0px">Цена местных:<td style="padding:0px;text-align: right;"> '+ numberFormat(price)
            + '<td style="text-align: right">Объем:<td>' + numberFormat(size)
            + '<tr><td style="padding:0px">Качество: <td style="padding:0px;text-align: right;"> ' + quality+ '</table>' 
            + '<a href=' + link_report + '>' +my_img + '</a>');
        //console.info(market);
      });
      /*
			
			$.get(link,function(data){
				$('#market_info').html('Разбираем данные...');

				var el = $('table.grid', data);
				var td = $('td', el);
				var price = td.eq(0).text().replace(' ', '').replace(' ', '').replace(' ', '').replace(' ', '').replace(' ', '').replace('$', '');
				price = parseFloat(price);
				//console.log(price);

				var quality = parseFloat( td.eq(2).text() );
				//console.log(quality);
				var n = City_info[city_unit]['link'].lastIndexOf('/');
				var my_img = '<a href='+link+'><img width="400px" style="float:left;clear:both;" src="/' +realm+'/graph/globalreport/marketing/product/' + item + '/'+  City_info[city_unit]['link'].substr(n+1, City_info[city_unit]['link'].length - n) +'"></a>';

				$('#market_info').html(img + '<table style="float:left;"><tr><td style="padding:0px">Цена местных:<td style="padding:0px;text-align: right;"> '+ price + '<tr><td style="padding:0px">Качество: <td style="padding:0px;text-align: right;"> ' + quality+ '</table>' + my_img);

				//console.log(graph);
			});
		*/
		});

	}
	print_component();
	$('#unit_type').change( print_component );


//console.log('-----end of CityLink------');
}

if(window.top == window) {
    var script = document.createElement("script");
    script.textContent = '(' + run.toString() + ')();';
    document.documentElement.appendChild(script);
}