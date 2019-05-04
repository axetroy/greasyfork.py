// ==UserScript==
// @name       		Funimation - Schedule Filter
// @namespace  		ScheduleFilter
// @version    		1.13
// @description  	Allows you to filter Funimation's Schedule
// @require		http://code.jquery.com/jquery-latest.min.js
// @match		http://www.funimation.com/schedule*
// ==/UserScript==

var hash = window.location.hash;
var physical;
var all = [];
all[0] = []; 		// No language specified + 14 	|| 	No format specified + 14
all[1] = []; 		// No language specified + MA 	|| 	No format specified + MA
all[2] = []; 		// No language specified + PG 	|| 	No format specified + PG
all[3] = []; 		// No language specified + R 	|| 	No format specified + R
all[4] = []; 		// Dub + No rating specified	||	DVD + No rating specified
all[5] = []; 		// Dub + 14						||	DVD + 14
all[6] = []; 		// Dub + MA						||	DVD + MA
all[7] = []; 		// Dub + PG						||	DVD + PG
all[8] = []; 		// Dub + R						||	DVD + R
all[9] = []; 		// Sub + No rating specified	||	Blu-ray + No rating specified
all[10] = []; 		// Sub + 14						||	Blu-ray + 14
all[11] = []; 		// Sub + MA						||	Blu-ray + MA
all[12] = []; 		// Sub + PG						||	Blu-ray + PG
all[13] = []; 		// Sub + R						||	Blu-ray + R
all[14] = []; 		// N/A							||	Blu-ray & DVD + No rating specified
all[15] = []; 		// N/A							||	Blu-ray & DVD + 14
all[16] = []; 		// N/A							||	Blu-ray & DVD + MA
all[17] = []; 		// N/A							||	Blu-ray & DVD + PG
all[18] = []; 		// N/A							||	Blu-ray & DVD + R

var start = 0;
// Images in base64 format

var tick = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAABmJLR0QA/wD/AP+gvaeTAAAAB3RJTUUH1wILDTAEvt0z7wAAAqBJREFUSIm11l1olmUcx/HPMyeKaANDnSWbg8o1XYqCHQQh4SR2ENk7gjpkDBXW3HwhUB8UCWc1aEWYWCILsoNOrCOtLERTEV9G5CvTg+kUmRO1Ib60p4PazF23z/bcz7P/0c3vd/3+X677vu7ruhKGvvLUesl4pUbiqrOa7M8fQmBCk+UKrTReSZ+aQon1QwN+xggNdnjWgsD7W4/bOnIPniPfAjuVeC/w7rvnhAZr7cg9+C3bI6F3dDupRtK3kFvwR9Z4TlWg33NfqypJ3/dKeTmDblBpqk0S/fQUztho/UMogmHxqkaReX5X4OnAO22b9y3tL+dixgmzbY2Edjhgl/qoUPbgLRoUqwz0btcdV+2QO7kH1ytXakOg90j50yrNzj4umg04oVyTUUYHzkXfWGtnunB88CbVJqkI9JvanbR6oHg88HKFymyM/HVOWedL14YGXG6zJ0wM9Et2S2oZTIvMweu8arKFgf6Xm44M/IrTgysVR+qzDFeqUb5hgdeu2Tbn44HnKvC5zyx2VJ0pweh31ZhgeqB3afOzTwYLfRScVKHaIaVqjTXOTF+bY2Sf/5oxiq2K7NLmQz+4nQl4mLkK1PvYCz412oQ+Z4wikz1vhD1OuWuZNYq9EXTocFCtukygkO9Fi01RG3lcFHnT22Z42T6TzA/8FNps+e8po/oX12yrsvAEGbDa/WqJVzLO6f3G32nQYW9GyR4pFzTGgfL/83iRJ1X4TaFpg0pe9pMq8+KCH67qFtcds1C3G4NKnvNVXCj6bQSHXVXmiqe8Li/N7aRTqxXqxFhUvRXuXEktzvsibarddvTEhUaD4Ucf6NQa6d3S5Re7soE+HrxXtz+s9CBiVp1226MrW3D6W2ajd4w16hHtosM2O5Mt+B/Mn6H5e3INmgAAAABJRU5ErkJggg==";
var loading = "data:image/gif;base64,R0lGODlhGQAZAPefAHd3d1VVVTMzM+vr6+zs7O/v7/Hx8fPz8+3t7e7u7vDw8OHh4eXl5efn5/Ly8ubm5unp6fT09KGhoff399/f3+Dg4Ojo6NXV1d7e3urq6vX19eLi4tzc3NLS0tvb25+fn9TU1OTk5KOjo/b29tra2qKiosvLy9fX16Wlpfn5+aSkpM/Pz6mpqePj49PT06CgoM7Ozp6entjY2NHR0ZycnKampt3d3Z2dncrKyszMzKenp/j4+MnJyUVFRdnZ2bGxsbm5udbW1tDQ0M3Nza6urrKysr29vWNjY6urq8fHx8bGxsLCwj09Pf7+/sHBwWRkZPv7+6ioqK2trZubm6ysrI2NjZqamrS0tMXFxYCAgLe3t3x8fERERJWVlYKCgoGBgWFhYbq6ul9fX5aWlri4uIiIiHt7e7W1tbCwsEZGRmJiYlZWVn19fWtra11dXfr6+sjIyMDAwE1NTU5OTjU1NW5ubjw8PMTExENDQ0FBQZGRkXl5eYODg4qKij4+PlxcXHBwcEBAQIaGhmBgYFpaWmZmZry8vHZ2dra2tklJSTs7O76+voSEhFBQUFJSUpCQkG9vb7u7u4WFhYmJia+vr4+Pj2hoaLOzs3h4eDY2NmdnZ2VlZUhISPz8/JmZmf///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh/wtYTVAgRGF0YVhNUDw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBNYWNpbnRvc2giIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QTVDRjI2NTkwMDJGMTFFMjlDRTJBNUZCODI4MTVCRDgiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QTVDRjI2NUEwMDJGMTFFMjlDRTJBNUZCODI4MTVCRDgiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpBNUNGMjY1NzAwMkYxMUUyOUNFMkE1RkI4MjgxNUJEOCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpBNUNGMjY1ODAwMkYxMUUyOUNFMkE1RkI4MjgxNUJEOCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PgH//v38+/r5+Pf29fTz8vHw7+7t7Ovq6ejn5uXk4+Lh4N/e3dzb2tnY19bV1NPS0dDPzs3My8rJyMfGxcTDwsHAv769vLu6ubi3trW0s7KxsK+urayrqqmop6alpKOioaCfnp2cm5qZmJeWlZSTkpGQj46NjIuKiYiHhoWEg4KBgH9+fXx7enl4d3Z1dHNycXBvbm1sa2ppaGdmZWRjYmFgX15dXFtaWVhXVlVUU1JRUE9OTUxLSklIR0ZFRENCQUA/Pj08Ozo5ODc2NTQz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";

if (!hash)
{ 
    window.location.hash = "#none-none";
    hash = "#none-none";
}

$(".basic-heading:first").append('<b style="margin-left:25px; margin-right:10px; margin-bottom:20px">Filter:</b>');

if (window.location.pathname == "/schedule" || window.location.pathname == "/schedule/" || window.location.pathname == "/schedule/dvd-blu-ray")
{
    physical = true;
	$(".basic-heading:first").append('Format <select id="filterFormat" style="margin-left:5px; margin-right:10px; margin-bottom:10px"><option value="#br">Blu-ray</option><option value="#brdvd">Blu-ray & DVD</option><option value="#dvd">DVD</option><option value="#none" selected>None</option></select>');
}   
else if (window.location.pathname == "/schedule/streaming" || window.location.pathname == "/schedule/subscription")
{
	physical = false;
    $(".basic-heading:first").append('Language <select id="filterLang" style="margin-left:5px; margin-right:10px; margin-bottom:10px"><option value="#dub">Dub</option><option value="#none" selected>None</option><option value="#sub">Sub</option></select>');
}
else
{
    // if not valid, redirect to main schedule page
    window.location = "http://www.funimation.com/schedule" + hash;
}

$(".basic-heading:first").append('Rating <select id="filterRating" style="margin-left:5px; margin-bottom:10px"><option value="14">14</option><option value="ma">MA</option><option value="none" selected>None</option><option value="pg">PG</option><option value="r">R</option></select>');
$(".basic-heading:first").append('<img width="25" height="25" id="status" style="margin-left:30px; margin-bottom:10px" src="' + loading + '" />');
                                 
$(document).ready(function()
{
    $("select").on( "change", function() 
    {
        hash = "";
        if ($("#filterFormat").val()) { hash = hash + $("#filterFormat").val(); }
        else { hash = hash + $("#filterLang").val(); }
        hash = hash + "-" + $("#filterRating").val();
        window.location.hash = hash;
        $("select").prop( "disabled", true );
        start = 0;
        $(".jp-current").attr("class","");
        $(".pagination > a:nth-child(2)").attr("class", "jp-current");
        $("#status").prop("src", loading);
        setTimeout(show,750);
    });
})
                    
function filter()
{
    $(document).ready(function()
    {
        
		for (i = 0; i < $(".animated").length; i++)
        {
            var offset;
          
            if ($(".animated:eq(" + i + ") td:nth-child(4)").html() == "Dub" || $(".animated:eq(" + i + ") td:nth-child(5)").html() == "DVD") { offset = 0; }
            else if ($(".animated:eq(" + i + ") td:nth-child(4)").html() == "Sub" || $(".animated:eq(" + i + ") td:nth-child(5)").html() == "Blu-ray") { offset = 5; }
            else if ($(".animated:eq(" + i + ") td:nth-child(5)").html() == "Blu-ray &amp; DVD") { offset = 10; }
            all[4 + offset].push(i);
            if ($(".animated:eq(" + i + ") td:nth-child(4)").html() == "TV-14" || $(".animated:eq(" + i + ") td:nth-child(5)").html() == "TV-14") {	all[5 + offset].push(i) }
            else if ($(".animated:eq(" + i + ") td:nth-child(4)").html() == "TV-MA" || $(".animated:eq(" + i + ") td:nth-child(5)").html() == "TV-MA") {	all[6 + offset].push(i) }    
            else if ($(".animated:eq(" + i + ") td:nth-child(4)").html() == "TV-PG" || $(".animated:eq(" + i + ") td:nth-child(4)").html() == "PG" || $(".animated:eq(" + i + ") td:nth-child(5)").html() == "TV-PG" || $(".animated:eq(" + i + ") td:nth-child(5)").html() == "PG") {	all[7 + offset].push(i) }   
            else if ($(".animated:eq(" + i + ") td:nth-child(4)").html() == "R" || $(".animated:eq(" + i + ") td:nth-child(5)").html() == "R") {	all[8 + offset].push(i) }
        }
        
        all[0] = all[5].concat(all[10], all[15]);
   	    all[0].sort(function(a, b){return a-b});

        all[1] = all[6].concat(all[11], all[16]);
        all[1].sort(function(a, b){return a-b});
        
        all[2] = all[7].concat(all[12], all[17]);
        all[2].sort(function(a, b){return a-b});

        all[3] = all[8].concat(all[13], all[18]);
        all[3].sort(function(a, b){return a-b});
        $("tbody.container").hide();
        setTimeout(show,750);
        $("tbody.container").show();
    });
}

function show()
{
    $(document).ready(function()
    {
        $("select").prop( "disabled", true );
        $(".fadeInUp").removeClass("fadeInUp").addClass("jp-hidden");
		var mode;
		var temp = 4;
        
		// Set initial mode (by language or format)
		if (hash.substring(0,5) == "#none") 
		{ 
            $("select:first").val('#none');
            mode = -1;
			temp++;
		}
		else if (hash.substring(0,4) == "#dub")
        { 
            $("#filterLang").val('#dub');
            mode = 4;
        }
		else if (hash.substring(0,4) == "#sub") 
        { 
            $("#filterLang").val('#sub');
            mode = 9;
        }
        else if (hash.substring(0,4) == "#dvd") 
        { 
            $("#filterFormat").val('#dvd');
            mode = 4;
        }
        else if (hash.substring(0,6) == "#brdvd") 
        { 
            $("#filterFormat").val('#brdvd');
            mode = 14;
            temp = 6;
        }
        else if (hash.substring(0,3) == "#br") 
        { 
            $("#filterFormat").val('#br');
            mode = 9;
            temp = 3;
        }
		
		// Offset mode (by rating)
		if (hash.substring(temp + 1) == "none") 	
        { 
            $("#filterRating").val('none');
            /** keep mode as it is **/
        }
		else if (hash.substring(temp + 1) == "14") 	
        { 
            $("#filterRating").val('14');
            mode = mode + 1;
        }
		else if (hash.substring(temp + 1) == "ma") 	
        { 
            $("#filterRating").val('ma');
            mode = mode + 2;
        }
		else if (hash.substring(temp + 1) == "pg") 
        { 
            $("#filterRating").val('pg');
            mode = mode + 3;
        }
		else if (hash.substring(temp + 1) == "r") 	
        { 
           	$("#filterRating").val('r');
            mode = mode + 4;
        }
		if (mode != -1)
		{
			for (index = start; index < start + 12; index++)
			{
				if (index > all[mode].length) { break; }
				next = all[mode][index];
				$(".animated:eq(" + next + ")").removeClass("jp-hidden").addClass("fadeInUp");
			} 
		}
		else
		{
			for (index = start; index < start + 12; index++)
			{
				if (index > $(".animated").length) { break; }
				$(".animated:eq(" + index + ")").removeClass("jp-hidden").addClass("fadeInUp");
			}
		}
        $(".pagination").children().addClass("jp-hidden");
        if (mode == -1)
        {
        	for (pages = 1; pages <= Math.ceil($(".animated").length / 12); pages++)
            { 
                $(".pagination").children("a:eq(" + pages + ")").removeClass("jp-hidden"); 
            }
            $(".jp-previous").removeClass("jp-hidden");
            $(".jp-current").removeClass("jp-hidden");
            if ($(".animated").length > start + 12) { $(".jp-next").removeClass("jp-hidden"); }
        }
        else
        {
            for (pages = 1; pages <= Math.ceil(all[mode].length / 12); pages++)
            { 
                $(".pagination").children("a:eq(" + pages + ")").removeClass("jp-hidden"); 
            }
            $(".jp-previous").removeClass("jp-hidden");
            $(".jp-current").removeClass("jp-hidden");
            if (all[mode].length > start + 12) { $(".jp-next").removeClass("jp-hidden"); }
            if (all[mode].length == 0) 
            { 
                if ($("#zero-results").length == 1) { $("#zero-results").remove(); }
                $('<div id="zero-results"><br><b>No results found on this page</b></br></div>').insertBefore(".pagination");
            }
            else if ($("#zero-results").length == 1) { $("#zero-results").remove(); }
        }
        $("select").prop( "disabled", false );
        $("#status").prop("src", tick);
    });
}

$("select").prop( "disabled", true );

setTimeout(filter,7000);

$(".pagination").on( "click", "a", function() {
    var className = $(this).attr("class");
    $("select").prop( "disabled", true );
    if (!className)
    { 
        start = $(this).text() * 12 - 12;
        $("#status").prop("src", loading);
        setTimeout(show,750);
    }
    else if (className != "jp-current" && className != "jp-disabled")
    {
        if (className == "jp-previous")
        {
            start = start - 12;
        }
        else if (className == "jp-next")
        {
            start = start + 12;
        }
        $("#status").prop("src", loading);
        setTimeout(show,750);
    }    
});