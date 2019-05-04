// ==UserScript==
// @name         Agar Chart and Stats Screen
// @version      1.11
// @description  Adds mass chart and stat screen to Agar.io
// @author       mikeyk730
// @match        http://agar.io/
// @require      https://code.jquery.com/jquery-latest.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/canvasjs/1.4.1/canvas.min.js
// @run-at       document-start
// @grant        none
// @namespace http://your.homepage/
// ==/UserScript==

var chart_update_interval = 10;

var observer = new MutationObserver(function(mutations) {
    for (var i = 0; i < mutations.length; i++) {
        if (/^http:\/\/agar\.io\/main_out\.js/.test(mutations[i].addedNodes[0].src)) {
            var scriptNode = mutations[i].addedNodes[0];
            httpRequest(scriptNode.src, handleResponse);
            document.head.removeChild(scriptNode);
            observer.disconnect();
            break;
        }
    }    
});
observer.observe(document.head, {childList: true});

function httpRequest(source, callBack) {
    var request = new XMLHttpRequest();
    request.onload = function() {
        callBack(this.responseText);
    };
    request.onerror = function() {
        console.log("Response was null");
    };
    request.open("get", source, true);
    request.send();
}

function insertScript(script) {
    if (typeof jQuery === "undefined") {
        return setTimeout(insertScript, 0, script);
    }
    var scriptNode = document.createElement("script");
    scriptNode.innerHTML = script;
    document.head.appendChild(scriptNode);
}

function handleResponse(script) {
    script = script.replace(/(\r\n|\n|\r)/gm,"");
    script = addChartHooks(script);
    script = addOnCellEatenHook(script);
    script = addOnShowOverlayHook(script);
    script = addLeaderboardHook(script);
    script = addOnDrawHook(script);
    insertScript(script);
}

function addChartHooks(script) {
    var match = script.match(/max\((\w+),(\w+)\(/);
    var high = match[1];
    var current = match[2];
    match = script.match(/1==(\w+)\.length&&\(/);
    var my_cells = match[1];
    var split = script.split(match[0]);
    script = split[0] + '1=='+my_cells+'.length&&(OnGameStart('+my_cells+'),' + split[1];
    split = script.split(script.match(/"Score: "\+~~\(\w+\/100\)/)[0]);
    match = split[1].match(/-(\d+)\)\);/);
    var subSplit = split[1].split(match[0]);
    split[1] = subSplit[0] + '-'+match[1]+'),('+my_cells+'&&'+my_cells+'[0]&&OnUpdateMass('+current+'())));' + subSplit[1];
    return split[0] + '"Current: "+~~('+current+'()/100)+"  High: "+~~('+high+'/100)' + split[1];
}

function addLeaderboardHook(script) {
    var match = script.match(/(fillStyle="#FFAAAA")(.+)(\w+)(\+1\+"\. ")/);
    var split = script.split(match[0]);
    return split[0]+match[1]+',OnLeaderboard('+match[3]+'+1)'+match[2]+match[3]+match[4]+split[1]   
}

function addOnCellEatenHook(script) {
    var match = script.match(/(\w)&&(\w)&&\(\2\.(\w)\(\)/);
    var split = script.split(match[0]);
    return split[0] + match[1] + '&&' + match[2] + '&&(OnCellEaten('+match[1]+','+match[2]+'),' + match[2] + '.' + match[3] + '()' + split[1];
}

function addOnShowOverlayHook(script) {
    var match = script.match(/\w+\("#overlays"\).fadeIn\((\w+)\?\w+:\w+\);/);    
    var split = script.split(match[0]);
    return split[0] + match[0] + 'OnShowOverlay(' + match[1] + ');' + split[1];
}

function addOnDrawHook(script) {
    var match = script.match(/\w+\.width&&(\w+)\.drawImage\(\w+,\w+-\w+\.width-10,10\);/);
    var split = script.split(match[0]);
    return split[0] + match[0] + 'OnDraw(' + match[1] + ');' + split[1];
}

var __STORAGE_PREFIX = "mikeyk730__";

function LS_getValue(aKey, aDefault) {
	var val = localStorage.getItem(__STORAGE_PREFIX + aKey);
	if (null === val && 'undefined' != typeof aDefault) return aDefault;
	return val;
}
 
function LS_setValue(aKey, aVal) {
	localStorage.setItem(__STORAGE_PREFIX + aKey, aVal);
}

function GetRgba(hex_color, opacity)
{
    var patt = /^#([\da-fA-F]{2})([\da-fA-F]{2})([\da-fA-F]{2})$/;
    var matches = patt.exec(hex_color);
    return "rgba("+parseInt(matches[1], 16)+","+parseInt(matches[2], 16)+","+parseInt(matches[3], 16)+","+opacity+")";
}

function secondsToHms(d) 
{
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60);
    var s = Math.floor(d % 3600 % 60);
    return ((h > 0 ? h + ":" + (m < 10 ? "0" : "") : "") + m + ":" + (s < 10 ? "0" : "") + s);
}

var chart = null;
var chart_data = [];
var num_cells_data = [];
var chart_counter = 0;
var stat_canvas = null;

var stats = null;
var my_cells = null;
var my_color = "#ff8888";
var pie = null;
var stats_chart;

var display_chart = LS_getValue('display_chart', 'true') === 'true';
var display_stats = LS_getValue('display_stats', 'false') === 'true';

function AppendCheckbox(e, id, label, checked, on_change)
{
    e.append('<label><input type="checkbox" id="'+id+'">'+label+'</label>');
    jQuery('#'+id).attr('checked', checked);
    jQuery('#'+id).change(function(){
        on_change(!!this.checked);
    });
    on_change(checked);
}

jQuery(document).ready(function() 
{
    jQuery('body').append('<div id="chart-container" style="display:none; position:absolute; height:176px; width:300px; left:10px; bottom:44px"></div>');   
    var checkbox_div = jQuery('#settings input[type=checkbox]').closest('div');
    AppendCheckbox(checkbox_div, 'chart-checkbox', 'Show chart', display_chart, OnChangeDisplayChart);
    AppendCheckbox(checkbox_div, 'stats-checkbox', 'Show stats', display_stats, OnChangeDisplayStats);
    
    jQuery("#helloDialog").css('left','230px');
    jQuery('#overlays').append('<div id="stats" style="position: absolute; top:50%; left: 450px; width: 750px; background-color: #FFFFFF; border-radius: 15px; padding: 5px 15px 5px 15px; transform: translate(0,-50%)"><div id="statArea" style="vertical-align:top; width:350px; display:inline-block;"></div><div id="pieArea" style="vertical-align: top; width:350px; height:250px; display:inline-block; vertical-align:top"> </div><div id="gainArea" style="width:350px; display:inline-block; vertical-align:top"></div><div id="lossArea" style="width:350px; display:inline-block;"></div><div id="chartArea" style="width:700px; display:inline-block; vertical-align:top"></div></div>');
    jQuery('#stats').hide(0);   
});

function OnChangeDisplayChart(display)
{
    LS_setValue('display_chart', display ? 'true' : 'false');
    display_chart = display;
    display ? jQuery('#chart-container').show() : jQuery('#chart-container').hide();
}

function OnChangeDisplayStats(display)
{
    LS_setValue('display_stats', display ? 'true' : 'false');
    display_stats = display;
    RenderStats(false);
}

function ResetChart() 
{
    chart = null;
    chart_data.length = 0;
    num_cells_data.length = 0;
    chart_counter = 0;
    jQuery('#chart-container').empty();    
}

function UpdateChartData(mass)
{
    chart_counter++;
    if (chart_counter%chart_update_interval > 0) 
		return false;
	
    num_cells_data.push({
        x: chart_counter,
        y: my_cells.length
    });
	chart_data.push({
        x: chart_counter,
        y: mass/100
    });
	return true;
}

function CreateChart(e, color, interactive)
{
    return new CanvasJS.Chart(e,{
        interactivityEnabled: false,
        title: null,
        axisX:{      
            valueFormatString: " ",
            lineThickness: 0,
            tickLength: 0
        },
        axisY:{
            lineThickness: 0,
            tickLength: 0,
            gridThickness: 2,
            gridColor: "white",
            labelFontColor: "white"
        },
        backgroundColor: "rgba(0,0,0,0.2)",
        data: [{
            type: "area",
            color: color,
            dataPoints: chart_data
        }]
    });
}

function UpdateChart(mass, color) 
{
	my_color = color;	
	if (chart === null)
		chart = CreateChart("chart-container", color, false);	
	if (UpdateChartData(mass) && display_chart)
		chart.render();    
    
	//jQuery('.canvasjs-chart-credit').hide();
};

function ResetStats()
{
    stats = {
        pellets: {num:0, mass:0},
        w: {num:0, mass:0},
        cells: {num:0, mass:0},
        viruses: {num:0, mass:0},

        birthday: Date.now(),
        time_of_death: null,
        high_score: 0,
        top_slot: Number.POSITIVE_INFINITY,

        gains: {},
        losses: {},
    };
}

function OnGainMass(me, other)
{
    var mass = other.size * other.size;
    if (other.isVirus){
        stats.viruses.num++;
        stats.viruses.mass += mass; //TODO: shouldn't add if  game mode is teams
    }
    else if (Math.floor(mass) <= 400 && !other.name){
        stats.pellets.num++;
        stats.pellets.mass += mass;
    }
	// heuristic to determine if mass is 'w', not perfect
    else if (!other.name && mass <= 1444 && (mass >= 1369 || (other.x == other.ox && other.y == other.oy))){
		//console.log('w', mass, other.name, other);
        if (other.color != me.color){ //don't count own ejections, again not perfect
            stats.w.num++;
            stats.w.mass += mass;
        }
    }
    else { 
	    //console.log('cell', mass, other.name, other);
        var key = other.name + ':' + other.color;
        stats.cells.num++;
        stats.cells.mass += mass;
        if (stats.gains[key] == undefined)
            stats.gains[key] = {num: 0, mass: 0};
        stats.gains[key].num++;
        stats.gains[key].mass += mass;
    }
}

function OnLoseMass(me, other)
{
    var mass = me.size * me.size;
    var key = other.name + ':' + other.color;
    if (stats.losses[key] == undefined)
        stats.losses[key] = {num: 0, mass: 0};;
    stats.losses[key].num++;
    stats.losses[key].mass += mass;
}

function DrawPie(pellet, w, cells, viruses)
{
    var total = pellet + w + cells + viruses;
    pie = new CanvasJS.Chart("pieArea", {
        title: null,
        animationEnabled: false,
        legend:{
            verticalAlign: "center",
            horizontalAlign: "left",
            fontSize: 20,
            fontFamily: "Helvetica"        
        },
        theme: "theme2",
        data: [{        
            type: "pie",       
            startAngle:-20,      
            showInLegend: true,
            toolTipContent:"{legendText} {y}%",
            dataPoints: [
                {  y: 100*pellet/total, legendText:"pellets"},
                {  y: 100*cells/total, legendText:"cells"},
                {  y: 100*w/total, legendText:"w"},
                {  y: 100*viruses/total, legendText:"viruses"},
            ]
        }]
    });
	pie.render();   
}

function GetTopN(n, p)
{
	var r = [];
	var a = Object.keys(stats[p]).sort(function(a, b) {return -(stats[p][a].mass - stats[p][b].mass)});
    for (var i = 0; i < n && i < a.length; ++i){
        var key = a[i];
        var mass = stats[p][key].mass;
        var name = key.slice(0,key.length-8);
        if (!name) name = "An unnamed cell";
        var color = key.slice(key.length-7);
		r.push({name:name, color:color, mass:Math.floor(mass/100)});
    }	
	return r;
}

function AppendTopN(n, p, list)
{
	var a = GetTopN(n,p);
    for (var i = 0; i < a.length; ++i){
        var text = a[i].name + ' (' + (p == 'gains' ? '+' : '-') + a[i].mass + ' mass)';
        list.append('<li style="font-size: 20px; "><div style="width: 20px; height: 20px; border-radius: 50%; margin-right:5px; background-color: ' + a[i].color + '; display: inline-block;"></div>' + text + '</li>');
    }
	return a.length > 0;
}

function DrawStats(game_over)
{
    if (!stats) return;
            
	jQuery('#statArea').empty();
    jQuery('#pieArea').empty();
    jQuery('#gainArea').empty();
    jQuery('#lossArea').empty();
    jQuery('#chartArea').empty();
    jQuery('#stats').show();
    
    if (game_over){
        stats.time_of_death = Date.now();
	}
    var time = stats.time_of_death ? stats.time_of_death : Date.now();
    var seconds = (time - stats.birthday)/1000;
	
	var list = jQuery('<ul>');
    list.append('<li style="font-size: 20px; ">Game time: ' + secondsToHms(seconds) + '</li>');
    list.append('<li style="font-size: 20px; ">High score: ' + ~~(stats.high_score/100) + '</li>');
    if (stats.top_slot == Number.POSITIVE_INFINITY){
        list.append('<li style="font-size: 20px; ">You didn\'t make the leaderboard</li>');
    }
    else{
        list.append('<li style="font-size: 20px; ">Leaderboard max: ' + stats.top_slot + '</li>');
    }
    list.append('<li style="font-size: 20px; padding-top: 15px">' + stats.pellets.num + " pellets eaten (" + ~~(stats.pellets.mass/100) + ' mass)</li>');
    list.append('<li style="font-size: 20px; ">' + stats.cells.num + " cells eaten (" + ~~(stats.cells.mass/100) + ' mass)</li>');
    list.append('<li style="font-size: 20px; ">' + stats.w.num + " masses eaten (" + ~~(stats.w.mass/100) + ' mass)</li>');
    list.append('<li style="font-size: 20px; ">' + stats.viruses.num + " viruses eaten (" + ~~(stats.viruses.mass/100) + ' mass)</li>');
    jQuery('#statArea').append('<h1>Game Summary</h1>');
    jQuery('#statArea').append(list);
	
    DrawPie(stats.pellets.mass, stats.w.mass, stats.cells.mass, stats.viruses.mass);

	jQuery('#gainArea').append('<h2>Top Gains</h2>');
	list = jQuery('<ol>');
    if (AppendTopN(5, 'gains', list))
		jQuery('#gainArea').append(list);
	else
		jQuery('#gainArea').append('<ul><li style="font-size: 20px; ">You have not eaten anybody</li></ul>');
	 
    jQuery('#lossArea').append('<h2>Top Losses</h2>');
	list = jQuery('<ol>');
	if (AppendTopN(5, 'losses', list))
		jQuery('#lossArea').append(list);
    else
		jQuery('#lossArea').append('<ul><li style="font-size: 20px; ">Nobody has eaten you</li></ul>');
	
	if (stats.time_of_death !== null){
		jQuery('#chartArea').width(700).height(250);
		stat_chart = CreateChart('chartArea', my_color, true);
        var scale = Math.max.apply(Math,chart_data.map(function(o){return o.y;}))/16;
        var scaled_data = num_cells_data.map(function(a){return {x:a.x, y:a.y*scale};});
        stat_chart.options.data.push({type: "line", dataPoints: scaled_data, toolTipContent:" "});
		stat_chart.render();
	}
	else {
		jQuery('#chartArea').width(700).height(0);
	}
}

var styles = {
	heading: {font:"30px Ubuntu", spacing: 41, alpha: 1},
	subheading: {font:"25px Ubuntu", spacing: 31, alpha: 1},
	normal: {font:"17px Ubuntu", spacing: 21, alpha: 0.6}
}

var g_stat_spacing = 0;
var g_display_width = 220;
var g_layout_width = g_display_width;

function AppendText(text, context, style)
{
	context.globalAlpha = styles[style].alpha;
	context.font = styles[style].font;
	g_stat_spacing += styles[style].spacing;
    
    var width = context.measureText(text).width;
    g_layout_width = Math.max(g_layout_width, width);    
	context.fillText(text, g_layout_width/2 - width/2, g_stat_spacing);
}

function RenderStats(reset)
{
	if (reset) g_layout_width = g_display_width;
	if (!display_stats || !stats) return;
	g_stat_spacing = 0;	
	
	var gains = GetTopN(3, 'gains');
	var losses =  GetTopN(3, 'losses');
	var height = 30 + styles['heading'].spacing + styles['subheading'].spacing * 2 + styles['normal'].spacing * (4 + gains.length + losses.length);
		
	stat_canvas = document.createElement("canvas");
	var scale = Math.min(g_display_width, .3 * window.innerWidth) / g_layout_width;
	stat_canvas.width = g_layout_width * scale;
    stat_canvas.height = height * scale;
	var context = stat_canvas.getContext("2d");
	context.scale(scale, scale);
		
    context.globalAlpha = .4;
    context.fillStyle = "#000000";
    context.fillRect(0, 0, g_layout_width, height);
        
    context.fillStyle = "#FFFFFF";
	AppendText("Stats", context, 'heading');
		
	var text = stats.pellets.num + " pellets eaten (" + ~~(stats.pellets.mass/100) + ")";
	AppendText(text, context,'normal');		
	text = stats.w.num + " mass eaten (" + ~~(stats.w.mass/100) + ")";
	AppendText(text, context,'normal');
    text = stats.cells.num + " cells eaten (" + ~~(stats.cells.mass/100) + ")";
	AppendText(text, context,'normal');
	text = stats.viruses.num + " viruses eaten (" + ~~(stats.viruses.mass/100) + ")";
	AppendText(text, context,'normal');
		
	AppendText("Top Gains",context,'subheading');
	for (var j = 0; j < gains.length; ++j){
		text = (j+1) + ". " + gains[j].name + " (" + gains[j].mass + ")";
		context.fillStyle = gains[j].color;			
		AppendText(text, context,'normal');
	}
		
	context.fillStyle = "#FFFFFF";
	AppendText("Top Losses",context,'subheading');
	for (var j = 0; j < losses.length; ++j){
		text = (j+1) + ". " + losses[j].name + " (" + losses[j].mass + ")";
		context.fillStyle = losses[j].color;			
		AppendText(text, context,'normal');
	}
}  

jQuery(window).resize(function() {
    RenderStats(false);
});

window.OnGameStart = function(cells)
{
    my_cells = cells;
    ResetChart();
    ResetStats();
    RenderStats(true);
}

window.OnShowOverlay = function(game_in_progress)
{
    DrawStats(!game_in_progress);
}

window.OnUpdateMass = function(mass) 
{
    stats.high_score = Math.max(stats.high_score, mass);
    UpdateChart(mass, GetRgba(my_cells[0].color,0.4));
}

window.OnCellEaten = function(predator, prey)
{
    if (!my_cells) return;

    if (my_cells.indexOf(predator) != -1){
        OnGainMass(predator, prey);
        RenderStats(false);
    }
    if (my_cells.indexOf(prey) != -1){
        OnLoseMass(prey, predator);
        RenderStats(false);
    }    
}

window.OnLeaderboard = function(position)
{
    stats.top_slot = Math.min(stats.top_slot, position);
}

window.OnDraw = function(context)
{
    display_stats && stat_canvas && context.drawImage(stat_canvas, 10, 10);   
}
