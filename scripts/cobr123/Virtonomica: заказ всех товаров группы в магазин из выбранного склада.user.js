// ==UserScript==
// @name           Virtonomica: заказ всех товаров группы в магазин из выбранного склада
// @namespace      virtonomica
// @version        2.8
// @description    Заказ всех товаров группы в магазин/ресторан/мед.центр/автомастерскую из выбранного склада. После посещения закладки "сбыт" на всех своих складах, в магазине на странице "снабжение" будет доступен массовый заказ товаров со своих складов.
// @include        http*://virtonomic*.*/*/main/unit/view/*/supply
// @include        http*://virtonomic*.*/*/main/unit/view/*/sale
// ==/UserScript==
var run = function() {

	var win = (typeof(unsafeWindow) != 'undefined' ? unsafeWindow : top.window);
	$ = win.$;

	function getRealm(){
		var svHref = window.location.href;
        var matches = svHref.match(/\/(\w+)\/main\/unit\/view\//);
		return matches[1];
	}
    var stockStorageName = "stockStorageName_" + getRealm();
	
	function getUnitId(){
		var svHref = window.location.href;
        var matches = svHref.match(/\/main\/unit\/view\/(\d+)\//);
		return matches[1];
	}
	function getLast(str){
        var matches = str.match(/\/(\d+)$/);
		return matches[1];
	}
	Object.size = function(obj) {
		var size = 0, key;
		for (key in obj) {
			if (obj.hasOwnProperty(key)) size++;
		}
		return size;
	};
	function isObject(item) {
		//console.log("item = " + (typeof item === "object" && Object.size(item) == 1 && item !== null));
		return (typeof item === "object" && Object.size(item) == 1 && item !== null);
	}
	function addAllProducts(){
    	var stocks = JSON.parse(window.localStorage.getItem(stockStorageName));
		if (!$.isArray(stocks)){
			alert('После посещения закладки "сбыт" на всех своих складах, в магазине на странице "снабжение" будет доступен массовый заказ товаров со своих складов.');
			return;
		}
		var idvStock = $("select#AddAllProducts").val();
		if(idvStock == '') return;
		if(idvStock == getUnitId()) {
      alert('Перевозить внутри одного склада нельзя');
      return;
    }
		console.log("stock id = " + idvStock);
		var idvProduct = '';
		var svUrl = '';
		var exist = 0;
		var idvShop = getUnitId();
		var data = {};
		var postCount = 0;
		var postDoneCount = 0;
		//в магазине
		if($('div#productsHereDiv > a').length > 0){
      console.log("в магазине, " + $('div#productsHereDiv > a').length);  
      $('div#productsHereDiv > a').each(function() {
        idvProduct = $(this).attr('href').match(/\d+/g)['0'];
		    console.log("idvProduct = " + idvProduct);
				//https://virtonomica.ru/olga/window/unit/supply/multiple/vendor:5619658/product:422435/brandname:0
				//https://virtonomica.ru/olga/window/unit/supply/create/6751546/step2
				svUrl = window.location.href.replace(/\/main\/unit\/view\/\d+\/supply/,'/window/unit/supply/multiple/vendor:'+idvStock+'/product:'+idvProduct+'/brandname:0');
				var svStockUrl = window.location.href.replace(/\/\d+\/supply/,'/'+idvStock);
				var ovStock = $.grep(stocks, function(e){ return e.stockId == idvStock && e.productId == idvProduct; });
		    //console.log("isObject(ovStock) = " + isObject(ovStock));
				if(isObject(ovStock)) {
					exist += 1;
					if(!$('td#name_'+idvProduct+'-0_0 > div > a[href="'+svStockUrl+'"]').length){
						data = {};
						postCount += 1;
						data['unit['+idvShop+'][qty]'] = 1;
						console.log("svUrl = " + svUrl);
						console.log("idvProduct = " + idvProduct);
						console.log("data = " + JSON.stringify(data));
						$.post( svUrl, data )
							.done(function() {
							console.log( "success" );
						})
							.fail(function() {
							console.log( "error" );
						})
							.always(function() {
							console.log( "always" );
							postDoneCount += 1;
							if(postCount === postDoneCount){
								window.location = window.location.href;//.reload();
								/*setTimeout(function(){
							console.log( "reload" );
							if(confirm('Товары заказаны. Перезагрузить страницу?')){
								window.location = window.location.href;//.reload();
							}
						}, 1000);*/
							}
						});
					}
				}
			});
			if(exist === 0){
				alert('На складе "' + $("select#AddAllProducts > option:selected").text() + '" не найдены товары группы "'+$("select[name='productCategory'] > option:selected").text()+'"');
			} else if (postCount === 0) {
				alert('Товары уже заказаны со склада "' + $("select#AddAllProducts > option:selected").text() + '" ');
			}
		} else if($('tr[id^="product_row_"] > th > table > tbody > tr:nth-child(1) > td:nth-child(1) > a:has(img)').length > 0){
			$('tr[id^="product_row_"] > th > table > tbody > tr:nth-child(1) > td:nth-child(1) > a:has(img)').each(function() {
				//href="https://virtonomica.ru/olga/window/product/info/359862"
				idvProduct = getLast($(this).attr('href'));
				//https://virtonomica.ru/olga/window/unit/supply/multiple/vendor:5619658/product:422435/brandname:0
				svUrl = window.location.href.replace(/\/main\/unit\/view\/\d+\/supply/,'/window/unit/supply/multiple/vendor:'+idvStock+'/product:'+idvProduct+'/brandname:0');
				console.log("svUrl = " + svUrl);
				var svStockUrl = window.location.href.replace(/\/\d+\/supply/,'/'+idvStock);
				var ovStock = $.grep(stocks, function(e){ return e.stockId == idvStock && e.productId == idvProduct; });
				if(isObject(ovStock)) {
					exist += 1;
					//console.log('exits = $(\'td#name_'+idvProduct+'_0 > a[href="'+svStockUrl+'"]\')');
					if($('td#name_'+idvProduct+'_0 > a[href="'+svStockUrl+'"]').length == 0){
						data = {};
						postCount += 1;
						data['unit['+idvShop+'][qty]'] = 1;
						console.log("idvProduct = " + idvProduct);
						console.log("data = " + JSON.stringify(data));
						$.post( svUrl, data )
							.done(function() {
							console.log( "success" );
						})
							.fail(function() {
							console.log( "error" );
						})
							.always(function() {
							console.log( "always" );
							postDoneCount += 1;
							if(postCount === postDoneCount){
								window.location = window.location.href;//.reload();
								/*setTimeout(function(){
							console.log( "reload" );
							if(confirm('Товары заказаны. Перезагрузить страницу?')){
								window.location = window.location.href;//.reload();
							}
						}, 1000);*/
							}
						});
					}
				}
			});
			if(exist === 0){
				alert('На складе "' + $("select#AddAllProducts > option:selected").text() + '" не найдены необходимые товары');
			} else if (postCount === 0) {
				alert('Товары уже заказаны со склада "' + $("select#AddAllProducts > option:selected").text() + '" ');
			}
		} else {
      //на складе
      var idavProducts = [];
      $('img[src="/img/supplier_add.gif"]').each(function() {
        idavProducts.push(getLast($(this).parent().attr('href')));
      });
      $('#mainContent > div.add_contract > a > img').each(function() {
        idavProducts.push(getLast($(this).parent().attr('href')));
      });
      for(var i = 0; i < idavProducts.length; ++i) {
				idvProduct = idavProducts[i];
				//https://virtonomica.ru/olga/window/unit/supply/multiple/vendor:5619658/product:422435/brandname:0
				svUrl = window.location.href.replace(/\/main\/unit\/view\/\d+\/supply/,'/window/unit/supply/multiple/vendor:'+idvStock+'/product:'+idvProduct+'/brandname:0');
				console.log("svUrl = " + svUrl);
				var svStockUrl = window.location.href.replace(/\/\d+\/supply/,'/'+idvStock);
				var ovStock = $.grep(stocks, function(e){ return e.stockId == idvStock && e.productId == idvProduct; });
				if(isObject(ovStock)) {
					exist += 1;
					//console.log('exits = $(\'td#name_'+idvProduct+'_0 > a[href="'+svStockUrl+'"]\')');
					if($('td#name_'+idvProduct+'_0 > a[href="'+svStockUrl+'"]').length == 0){
						data = {};
						postCount += 1;
						data['unit['+idvShop+'][qty]'] = 1;
						console.log("idvProduct = " + idvProduct);
						console.log("data = " + JSON.stringify(data));
						$.post( svUrl, data )
							.done(function() {
							console.log( "success" );
						})
							.fail(function() {
							console.log( "error" );
						})
							.always(function() {
							console.log( "always" );
							postDoneCount += 1;
							if(postCount === postDoneCount){
								window.location = window.location.href;//.reload();
								/*setTimeout(function(){
							console.log( "reload" );
							if(confirm('Товары заказаны. Перезагрузить страницу?')){
								window.location = window.location.href;//.reload();
							}
						}, 1000);*/
							}
						});
					}
				}
      }
			if(exist === 0){
				alert('На складе "' + $("select#AddAllProducts > option:selected").text() + '" не найдены необходимые товары');
			} else if (postCount === 0) {
				alert('Товары уже заказаны со склада "' + $("select#AddAllProducts > option:selected").text() + '" ');
			}
    }
	}
	function changeSelectStockByProductOnPage(stocks, productsOnPage){
		var uniqStocks = [];
		stocks.forEach(function(a) {
			if (productsOnPage === null || a.productId in productsOnPage) {
				if (a.stockId in uniqStocks) {
					uniqStocks[a.stockId]['caption'] += ', ' + productsOnPage[a.productId]; 
					uniqStocks[a.stockId]['count'] += 1;
				} else {
					uniqStocks[a.stockId] = []
					uniqStocks[a.stockId]['caption'] = a.stockHL + ': ' + productsOnPage[a.productId]; 
					uniqStocks[a.stockId]['count'] = 1;
					uniqStocks[a.stockId]['stockId'] = a.stockId;
				}
			}
		});
		return uniqStocks;
	}
	function getUniqStocksByProductOnPage(stocks){
		var productsOnPage = [];
		$('div#productsHereDiv > span > input[type="radio"]').each(function() {
			productsOnPage[$(this).attr('value')] = $('> label > img', $(this).parent()).attr('title');
		});
		var uniqStocks = changeSelectStockByProductOnPage(stocks, productsOnPage);
		uniqStocks.sort(function(a, b) {
			return parseFloat(b.count) - parseFloat(a.count);
		});
		return uniqStocks;
	}
	function changeProductCategory(first_val, stocks){
		var valForCat = first_val;
		var uniqStocks = getUniqStocksByProductOnPage(stocks);
		for (var key in uniqStocks) {
			valForCat += '<option value="'+uniqStocks[key]['stockId']+'">'+uniqStocks[key]['caption']+'</option>';
		}
		$('select#AddAllProducts').html(valForCat);
	}
	//если страница "снабжение" магазина
    if (/\w*virtonomic\w+.\w+\/\w+\/main\/unit\/view\/\d+\/supply/.test(window.location)) {
    	var stocks = JSON.parse(window.localStorage.getItem(stockStorageName));
		// кнопки
		var first_val = '<option value="">Заказ всех товаров группы в магазин из выбранного склада</option>';
		var vals = first_val;
		if ($.isArray(stocks)){
			var uniqStocks = [];
			//если категория продуктов уже выбрана в магазине (и других где есть радио-кнопки для добавления поставщика)
			if($('div#productsHereDiv > span > input[type="radio"]').length > 0){
				uniqStocks = getUniqStocksByProductOnPage(stocks);
				$('select[name="productCategory"]').change(function(){
					changeProductCategory(first_val, stocks);
				});
			//если категория продуктов еще не выбрана в магазине (и других где есть радио-кнопки для добавления поставщика)
			} else if($('select[name="productCategory"]').length > 0){
				stocks.forEach(function(a) {
					if (a.stockId in uniqStocks) {
						uniqStocks[a.stockId]['count'] += 1;
					} else {
						uniqStocks[a.stockId] = []
						uniqStocks[a.stockId]['caption'] = a.stockHL + ': ' + a.stockSpecHL; 
						uniqStocks[a.stockId]['count'] = 1;
						uniqStocks[a.stockId]['stockId'] = a.stockId;
					}
				});
				$('select[name="productCategory"]').change(function(){
					changeProductCategory(first_val, stocks);
				});
			} else {
				var productsOnPage = [];
				$('tr[id^="product_row_"] > th > table > tbody > tr:nth-child(1) > td:nth-child(1) > a:has(img)').each(function() {
					productsOnPage[getLast($(this).attr('href'))] = $(this).attr('title');
				});
        if(productsOnPage.length === 0){
          $('img[src="/img/supplier_add.gif"]').each(function() {
            productsOnPage[getLast($(this).parent().attr('href'))] = $(this).attr('title');
          });
          $('#mainContent > div.add_contract > a > img').each(function() {
            productsOnPage[getLast($(this).parent().attr('href'))] = $(this).attr('title');
          });
        }
				uniqStocks = changeSelectStockByProductOnPage(stocks, productsOnPage);
			}
			uniqStocks.sort(function(a, b) {
				return parseFloat(b.count) - parseFloat(a.count);
			});
			for (var key in uniqStocks) {
				vals += '<option value="'+uniqStocks[key]['stockId']+'">'+uniqStocks[key]['caption']+'</option>';
			}
		} else {
			first_val = '<option value="">После посещения закладки "сбыт" на всех своих складах, в магазине на странице "снабжение" будет доступен массовый заказ товаров со своих складов.</option>';
			vals = first_val;
		}
		var selAddAllProducts = $('<select id="AddAllProducts">'+vals+'</select>').change(function() {
			addAllProducts();
		});
		var clearSelBtn = $('<input type="button" value="Очистить список быстрого заказа"/>').click(function() {
			if(confirm('Очистить список быстрого заказа?')) {
				$('#AddAllProducts').html(first_val);
				var stocks = [];
				window.localStorage.setItem(stockStorageName,JSON.stringify(stocks));
			}
		});
		var panel = $("div#childMenu");
		panel.append(selAddAllProducts);
		panel.append(clearSelBtn);
	}
	//если страница "сбыт" склада
    if (/\w*virtonomic\w+.\w+\/\w+\/main\/unit\/view\/\d+\/sale/.test(window.location)) {
    	var stocks = JSON.parse(window.localStorage.getItem(stockStorageName));
		if (!$.isArray(stocks)){
			stocks = [];
		}
		var idvStock = getUnitId();
		var svStock = $('div.metro_header div.title > h1').text();
		var changeSperUrl = window.location.href.replace(/\/main\/unit\/view\/\d+\/sale/,'/window/unit/speciality_change/'+idvStock);
		var svStockSpec = $('a[href="'+changeSperUrl+'"]').parent().prev().prev().text();
		console.log(svStockSpec);
		var idvProduct = '';
		var matches = [];
		stocks = stocks.filter(function (el) {
			return el.stockId !== idvStock;
		});
		
		$('table[class="grid"] > tbody > tr > td:nth-child(1) > a:has(img[src="/img/supplier_add.gif"])').each(function() {
			matches = $(this).attr('href').match(/\/product:(\d+)\//);
			idvProduct = matches[1];
			console.log("idvProduct = " + idvProduct);
			
			var ovStock = $.grep(stocks, function(e){ return e.stockId == idvStock && e.productId == idvProduct; });
			if(!isObject(ovStock)){
				stocks.push({
					stockId: idvStock,
					stockHL: svStock,
					stockSpecHL: svStockSpec,
					productId: idvProduct
				});
			}			
		});
        window.localStorage.setItem(stockStorageName,JSON.stringify(stocks));
	}
}

if(window.top == window) {
	var script = document.createElement("script");
	script.textContent = '(' + run.toString() + ')();';
	document.documentElement.appendChild(script);
}