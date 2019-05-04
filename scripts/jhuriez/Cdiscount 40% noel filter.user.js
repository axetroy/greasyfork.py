// ==UserScript==
// @name         Cdiscount 40% noel filter
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       Syntaxlb
// @match        http://www.cdiscount.com/*
// @grant        none
// ==/UserScript==

// CRTL+Q for execute the script

(function() {
    'use strict';
    
	var listP = $('<div></div>').attr('id', 'listP');
	listP.insertBefore($('#lpBloc'));


	var totalPage = $('#pager #PaginationForm_TotalPage').attr('value');
	totalPage = parseInt(totalPage);

	var currentPage = 1;

	var countNoDiscount = 0;


	function filterDiscount()
	{
		var hasDiscount = false;

		$('#lpBloc li .prdtBloc').each(function() {
			var el = $(this);
			var opImg = $(this).find('.opImg img');
			if (opImg) {
				if (opImg.attr('alt') == "Noel jusqu'à 40% remboursés")
				{
					hasDiscount = true;
					el.attr('style', 'width:300px; float: left;');
					el.appendTo(listP);
				}
			}
		});

		if (hasDiscount == false)
		{
			countNoDiscount++;
		}
	}

	function clickPage()
	{

		setTimeout(function () {

			currentPage++;
	
			if (currentPage <= totalPage)
			{
				console.log('CLICK PAGE ' + currentPage);
	
				$('#pager a.pgNext').click();
		
				clickPage();
			}

			filterDiscount();

		}, 6000);
		
		
	}


	function doFilterDiscount()
	{
		setTimeout(function () {
			filterDiscount();

			if (countNoDiscount < 70)
			{
				doFilterDiscount();
			}
			else
			{
				console.log('STOP FILTER DISCOUNT');
			}
			
		}, 1000);
	}



$(window).keypress(function(event) {
    if (!(event.which == 17 && event.ctrlKey)) return true;
    
    alert('Démarrage du filtre 40% noel');
    	clickPage();
	doFilterDiscount();
});

    
})();