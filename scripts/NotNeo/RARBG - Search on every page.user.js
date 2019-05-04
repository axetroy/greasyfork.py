// ==UserScript==
// @name         RARBG - Search on every page
// @namespace    NotNeo
// @version      0.1
// @description  Adds the search to the top-left corner on every page on RARBG
// @author       NotNeo
// @match        https://rarbg.to/*
// @require      https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    addGlobalStyle(`
		#fixedSearch {
			position: fixed;
			left: 5px;
			top: 5px;
			z-index: 9999;
			background-color: #3860bb;
			border: 1px solid black;
			border-radius: 15px;
			padding: 5px;
		}

		#fixedSearchActivator {
			display: inline-block;
			vertical-align: top;
			cursor: pointer;
			background-color: rgba(255,255,255,.1);
			border-radius: 15px;
			padding: 10px;
		}
		#fixedSearchActivator > .userscript-search-icon {
			width: 25px;
			height: 25px;
		}

		#fixedSearchTorrent {
			border-radius: 15px;
			display: none;
			vertical-align: middle;
			float: right;
			margin-left: 10px;
		}
	`);
    $("body").append("<div id='fixedSearch'><span id='fixedSearchActivator'>" + `<svg class="userscript-search-icon" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="search" class="svg-inline--fa fa-search fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path></svg>` + "</span></div>");

    if($("#searchTorrent").length) {
        $("#searchTorrent").clone().appendTo("#fixedSearch");
        DoTheThings();
    }
    else {
        $.get("/torrents.php", function(data){
            if(data) {
                try {
                    $("#fixedSearch").append($(data).find("#searchTorrent"));
                    DoTheThings();
                }
                catch(err) {
                    alert("error: something went wrong getting the search from the AJAX get data\n" + err.message);
                }
            }
            else {
                alert("error: something went wrong getting the data returned by the AJAX get");
            }
        }).fail(function(){
            alert("error: could not fetch data with AJAX get");
        });
    }

})();

function DoTheThings() {
    $("#fixedSearch").find("#searchTorrent").prop("id", "fixedSearchTorrent");
    $("#fixedSearchTorrent").find("#searchinput").prop("id", "fixedSearchInput");
    $("#fixedSearchTorrent").find("#SearchDescription").prop("id", "fixedSearchDescription");
    $("#fixedSearchInput").removeAttr("onclick").removeAttr("onfocus").removeAttr("onblur");
    $("#fixedSearchTorrent").find("#shadvbutton").prop("id", "fixedShadvbutton");
    $("#fixedShadvbutton").removeAttr("onclick");
    $("#fixedSearchTorrent").find("#divadvsearch").prop("id", "fixedDivadvsearch");
    $("#fixedDivadvsearch").find(".divadvclearcats").removeAttr("onclick");

    $("#fixedShadvbutton").click(function(){
        $("#fixedDivadvsearch").toggle(100);
    });

    $("#fixedDivadvsearch > a.divadvclearcats").click(function(){
        $("#fixedSearchTorrent input[type='checkbox']").prop("checked", false);
    });

    $("#fixedSearchActivator").click(function(){
        $("#fixedSearchTorrent").toggle(100);
        $("#fixedSearchInput").focus();
    });
    $(document).on('click', function(e) {
        if($(e.target).closest('#fixedSearch').length === 0) {
            $("#fixedSearchTorrent").hide(100);
        }
    });
}

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}