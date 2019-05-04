// ==UserScript==
// @name           Dressing Room
// @description    Auto create item lists  from wowhead.com comparisons, export dressing room sets to WoW Model Viewer
// @namespace      http://mogboutique.tumblr.com/
// @author         http://mogboutique.tumblr.com/
// @include        https://*.wowhead.com/dressing-room*
// @include        http://*.wowhead.com/compare*
// @include        http://*.wowhead.com/outfit*
// @version        1.2.0
// @grant          none
// ==/UserScript==




var my_character = {
    equipment: {
        1: {},
        2: {},
        3: {},
        4: {},
        5: {},
        6: {},
        7: {},
        8: {},
        9: {},
        10: {},
        11: {},
        12: {},
        13: {}
    },
    settings: {
        race: 1,
        gender: 1,
        "class": 5,
        specialization: 0,
        level: 100,
        skincolor: 0,
        hairstyle: 0,
        haircolor: 0,
        facetype: 0,
        features: 0,
        blindfolds: 0,
        hornstyle: 0,
        tattoos: 0,
        mount: 0,
        artifactAppearanceMod: 0
    }
};



var displaySlot = {
    //Head
    1: 1,
    //Shoulders
    3: 2,
    //Cloak
    16: 3,
    //Chest
    5: 4,
    //Shirt
    4: 5,
    //Tabard
    19: 6,
    //Wrists
    9: 7,
    //Hands
    10: 8,
    //Waist
    6: 9,
    //Legs
    7: 10,
    //Feet
    8: 11,
    //Ranged
    15: 12,
    //1-Hand 
    13: 12,
    //2-Hand
    17: 12,
    //Shield
    14: 13,
    //Off-Hand
    23: 13
};


var equipmentOrderToCharacterSlot = {
    1: 1,
    2: 3,
    3: 15,
    4: 5,
    5: 4,
    6: 19,
    7: 9,
    8: 10,
    9: 6,
    10: 7,
    11: 8,
    12: 16,
    13: 17
};


var outfitChar;

//Dressing Room UI



if(  $('div.dressing-room-paperdoll-wrapper')[0] ) {

    $('head').append('<style type="text/css" id="wmv_style">.dressing-room-controls-block.block-bg{display:none;}\
.dr_code_buttons>button{margin:4px 4px;background:#a71a19;padding:2px;font-size:10px;width:32px;.dr_link{background:transparent;}</style>');





   
/*jshint multistr: true */
    
     $('div.dressing-room-controls').after('<a style="font-size:12px;margin-left:10px;" href="https://greasyfork.org/en/scripts/17882-dressing-room">Update Script</a>');
    
    


    
    $('div.dressing-room-controls')
        .append(
'<div id="dressing_room_script" style="border-top:1px dashed #ffd100;margin-top:10px;">\
<a class="fa" style="display:inline-block;font-size:12px;">Paste MogIt or WoWHead Comparison link here</a>\
\
<input id="comp_src" style="font-size:10px;height:20px;border-bottom:1px dashed #ffd100;color:cyan;border-width:0px 0px 1px 0px;background:rgba(255,255,255,.05);width:70%;"></input>\
<button id="comp_click" class="btn-site" style="width:20%;padding:2px;">Import</button>\
<div id="dr_itemlist" style="margin-top:5px;background:black;" > \
\
<textarea id="dr_code_box" style="display:inline-block;width:70%;border:1px solid;font-size:10px;height:150px;width:90%;background:transparent;color:#ffd100;border-radius:0px;"></textarea>\
<div class="dr_code_buttons" style="text-align:center;display:inline-block;width:10px;vertical-align: top;">\
<button title="Create HTML Item List">HTML</button><button title="Create Reddit Markup Item List">Reddit</button><button title="Create BBCode Item List">Forum</button><button title="Create Plain Text Item List">Plain</button><button title="Show WoW Model Viewer Code">WMV</button></div>\
</div>\
<div id="wmv_pad" style="margin-top:5px;" >\
<a  class="fa generate_code dr_link" href="javascript:void(0);"\
\
title="Save as an WoW Model Viewer&#013;.CHR (Character) file.&#013;Use Character -> Load Character in WMV"\
\
style="text-align:center;display:block;border:0px solid;font-size:10px;padding:0px;">\
Export as WoW Model Viewer Character File</a>\
<a class="fa generate_code_2 dr_link" href="javascript:void(0);"\
\
title="Save as an WoW Model Viewer&#013;.EQ (equipment-only) file.&#013;Use Character -> Load Equipment in WMV"\
\
style="text-align:center;display:block;border:0px solid;font-size:10px;padding:0px;">\
Export as WoW Model Viewer Equipment File</a>\
<a class="fa canvas_screen dr_link" title="test&#013;test" href="javascript:void(0);" style="text-align:center;display:none;border:0px solid;font-size:10px;padding:0px;">\
Save Screenshot</a>\
<div id="wmv_hide" style="display:none;"><a id="download_file" download="MyCharacter.chr" style="display:none;" href="javascript:void:(0);"></a>\
<a id="code_file" style="display:none;" target="File Code" href="javascript:void:(0);"></a>\
\
<a href="#" class="button" id="btn-download" download="my-file-name.png">Download</a>\
\
</div></div></div>');



    $("textarea#dr_code_box").focus(function() { $(this).select(); } );


}


$('div.dr_code_buttons > button').click(function() {


    observeChanges();
    exportDRCode( $(this).text() );


});

$('a.canvas_screen').click(function() {
   /*src=  $("div.paperdoll-model-inner > canvas")[0].toDataURL('image/png');
    console.log($("div.paperdoll-model-inner > canvas")[0]);
   $("#btn-download").attr('href', src);
   $("#btn-download")[0].click();*/
    var canvas = $("div.paperdoll-model-inner > canvas")[0];
    context = canvas.getContext("webgl");
    console.log(canvas.toDataURL('image/png'));
    
    $("#btn-download").attr('href',canvas.toDataURL('image/png'));
   $("#btn-download")[0].click();
    
});


$('a.generate_code').click(function() {
    observeChanges();
    text = exportWMV();
    $("#dr_code_box").text(text);
    $("#download_file")[0].click();

});

$('a.generate_code_2').click(function() {
    observeChanges();
    text = exportWMV('eq');
    $("#dr_code_box").text(text);
    $("#download_file")[0].click();

});








var summary = null;

var bonuses = {};

$('#comp_click').click(function() {

    $('#error_text').text('');

    loadData($('#comp_src').val());


});


function loadData(src,prefs) {

    if (src.match(/wowhead\.com\/compare/)) {

        var s = "/compare?" + src.match(/items=(.+)/);

        $.get(s, function(data) {
            g_match = data.match(/(g_items.add.+)/g);
            s_match = data.match(/new Summary(\(.+)/);



            if (s_match.length > 1) {
                var s = eval(s_match[1]);
                summary = s.groups[0];
            }


            for (var p in g_match) {
                eval(g_match[p]);
            }

            for (var i = 0; i < summary.length; i++) {

                bonuses[summary[i][0]] = 0;
                if (summary[i][10]) bonuses[summary[i][0]] = summary[i][10];

            }


            comparison(prefs);


        }); 
    } 

    else if( src.match(/:\/\/\w+.wowhead.com\/outfit=/) ) {
        requestOutfit( src );

    }

    else {
        $('#error_text').text('Wrong URL');
    }



}




function comparison( prefs ) {

    for (var e in my_character.equipment)
        my_character.equipment[e] = {};

    for (var propt in bonuses) {

        if (g_items[propt].jsonequip) {

            var dslot = displaySlot[g_items[propt].jsonequip.slot];

            if (dslot) {

                if (dslot == 12)
                    if (displaySlot[my_character.equipment[12].charSlot] == 12)
                        if (!my_character.equipment[13].itemId) {
                            for (var p in my_character.equipment[12])
                                my_character.equipment[13][p] = my_character.equipment[12][p];
                        }

                my_character.equipment[dslot].itemId = g_items[propt].jsonequip.id;
                my_character.equipment[dslot].charSlot = g_items[propt].jsonequip.slot;
                my_character.equipment[dslot].itemBonus = bonuses[propt];

            }

        }


    }
    if (g_items) {


        if( prefs) {





            for ( var u in my_character.settings ) {
                if( prefs[u] ) my_character.settings[u] = prefs[u];
            }




        }
        else {
            var s = DressingRoom.getCharacter().settings;
            for ( var o in my_character.settings )
                my_character.settings[o] = s[o];
        }








        bonuses = {};

        if( DressingRoom ) {
            DressingRoom.updateFromHash(my_character);
            if( prefs ) location.reload();
            else updateView();
        }


    }

}





function updateView() {

    var items = [];

    for (var p in my_character.equipment) {
        var item = {};
        item.artifactAppearanceMod = 0;

        item.raw = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        item.raw[0] = equipmentOrderToCharacterSlot[p];

        if (my_character.equipment[p].charSlot && my_character.equipment[p].itemId) {



            item.raw[1] = my_character.equipment[p].itemId;
            item.raw[11] = my_character.equipment[p].itemBonus;


        }

        items.push(item);


    }


    g_paperdolls['dressing-room-paperdoll'].updateSlots(items);

}


/****************Comparison To Dressing Room*********************/



/*

function init(){

	//var view_in_dressing_room = $WH.localStorage.get("view_in_dressing_room");
    //$WH.localStorage.remove("view_in_dressing_room");
		wait();

}


function wait(){

	if(  g_paperdolls['dressing-room-paperdoll'] ) {
		if( document.referrer.match(/:\/\/\w+.wowhead.com\/outfit=/) 
		   || document.referrer.match(/:\/\/\w+.wowhead.com\/outfit=/) ) {

		$("#load-outfit").show();
		$('button.yes').click( function() {
	             loadData( document.referrer );
	        });
		$('button.no').click( function() {
	             $("#load-outfit").hide();
	        });
		}

	}
	else {


		setTimeout( wait, 500 );
	}
}
*/

/****************Outfit to Dressing Room********************/

function requestOutfit(src) {

    s =  "/outfit=" + src.match(/outfit=(\d+)/)[1];


    $.get(s, function(data) {

        var m = data.match( /SidebarModel\.ShowPlayerModel\('infobox-sticky-model',([^\)]+)/ )[1];

        var j  = JSON.parse( m );

        j["class"] = j.charClass;



        var y = data.match(/ModelViewer.show\({([^}]+)}\)/)[1];


        var l = data.match( /su_addToSaved\(([^)]+)\)/ )[1];

        l = eval( "[" + l +"]" );



        loadData( document.domain + "/compare?items=" + l[0] , j );


    }); 


}








/***************WoW Model Viewer Export*****************/







var ishd = [
    'human',
    'draenei',
    'dwarf',
    'orc',
    'gnome',
    'nightelf',
    'bloodelf',
    'troll',
    'undead'
];


var filename = "MyCharacter";




function exportWMV(param) {




    //Head
    $('div.paperdoll-left > div.iconmedium:first-child > a').attr('slot', 0);
    //Shoulders
    $('div.paperdoll-left > div.iconmedium:nth-child(3) > a').attr('slot', 1);
    //Cloak
    $('div.paperdoll-left > div.iconmedium:nth-child(4) > a').attr('slot', 11);
    //Chest
    $('div.paperdoll-left > div.iconmedium:nth-child(5) > a').attr('slot', 6);
    //Shirt
    $('div.paperdoll-left > div.iconmedium:nth-child(6) > a').attr('slot', 4);
    //Tabard
    $('div.paperdoll-left > div.iconmedium:nth-child(7) > a').attr('slot', 12);
    //Wrist
    $('div.paperdoll-left > div.iconmedium:nth-child(8) > a').attr('slot', 7);

    //Main Hand
    $('div.paperdoll-bottom > div.iconmedium:first-child > a').attr('slot', 9);
    //Off Hand
    $('div.paperdoll-bottom > div.iconmedium:nth-child(2)> a').attr('slot', 10);

    //Hands
    $('div.paperdoll-right > div.iconmedium:first-child > a').attr('slot', 8);
    //Waist
    $('div.paperdoll-right > div.iconmedium:nth-child(2)> a').attr('slot', 3);
    //legs
    $('div.paperdoll-right > div.iconmedium:nth-child(3)> a').attr('slot', 5);
    //feet
    $('div.paperdoll-right > div.iconmedium:nth-child(4)> a').attr('slot', 2);


    var last = localStorage.getItem("lastViewedModel");
    var model = eval(last);




    var settings = model[model.length - 1];
    var race = g_file_races[settings.race];
    var gender = g_file_genders[settings.gender];

    var classs = settings.class;

    var eyeGlow = 1;
    if (settings.class == 6)
        eyeGlow = 2;



    var hd = "";
    if (ishd.indexOf(race) > -1) hd = "_hd";
    if (localStorage.getItem('paperdoll-hd') == "false") hd = "";




    var text = '<?xml version="1.0" encoding="UTF-8"?>\n' +
        ' <SavedCharacter version="1.0">\n' +
        '  <model>\n' +
        '   <file name="character\\' + race + '\\' + gender + '\\' + race + gender + hd + '.m2"/>\n' +
        '   <CharDetails>\n' +
        '     <skinColor value="' + settings.skincolor + '"/>\n' +
        '     <faceType value="' + settings.facetype + '"/>\n' +
        '     <hairColor value="' + settings.haircolor + '"/>\n' +
        '     <hairColor value="' + settings.haircolor + '"/>\n' +
        '     <hairStyle value="' + settings.hairstyle + '"/>\n' +
        '     <facialHair value="' + settings.features + '"/>\n' +
        '     <eyeGlowType value="' + eyeGlow + '"/>\n' +
        '     <showUnderwear value="0"/>\n' +
        '     <showEars value="1"/>\n' +
        '     <showHair value="1"/>\n' +
        '     <showFacialHair value="1"/>\n' +
        '     <showFeet value="1"/>\n' +
        '   </CharDetails>\n' +
        ' </model>\n' +
        '<equipment>\n';

        if(param=="eq") text='<?xml version="1.0" encoding="UTF-8"?>\n' +
        ' <SavedCharacter version="1.0">\n' +
            '<equipment>\n';

    var e = {};

    $('div#dressing-room-paperdoll a[slot]').each(function() {

        var href = $(this).attr('href');

        if (href.match(/item=(\d+)/)) {
            e[href.match(/item=(\d+)/)[1]] = {};
            e[href.match(/item=(\d+)/)[1]].slot = $(this).attr('slot');

            if (href.match(/bonus=(\d+)/))
                e[href.match(/item=(\d+)/)[1]].bonus = href.match(/bonus=(\d+)/)[1];
        }


    });



    for (var p in e) {

        try {

            if (g_items[p].jsonequip) {


                var displayId = g_items[p].jsonequip.displayid;




                if (e[p].bonus && g_items.getAppearance(p, [e[p].bonus])) {
                    displayId = g_items.getAppearance(p, [e[p].bonus])[0];
                }



                var id = p;




                var slot = e[p].slot;


                if (slot == 6)
                    if (g_items[p].json)
                        filename = g_items[p].json.name.slice(1);



                if (!displayId) displayId = -1;
                if (!id) id = -1;
                if (!level) level = 0;
                if (!slot) slot = -1;



                var a = g_items[p].jsonequip.appearances;



                var ar = [];


                for (var o in a)
                    ar.push(a[o]);

                var level = 0;

                if (ar.length == 4) {
                    if (e[p].bonus == 566)
                        level = 2;
                    else if (e[p].bonus == 567)
                        level = 3;
                }
                else if (ar.length == 3) {
                    if (e[p].bonus == 566)
                        level = 1;
                    else if (e[p].bonus == 567)
                        level = 2;
                }



                text = text + '   <item>\n' +
                    '      <slot value="' + slot + '"/>\n' +
                    '      <id value="' + id + '"/>\n' +
                    '      <displayId value="' + displayId + '"/>\n' +
                    '      <level value="' + level + '"/>\n' +
                    '   </item>\n';
            }

        } //try
        catch (e) {

            var error = "Item Error";

        }

    } //for



    text = text + '  </equipment>\n' +
        ' </SavedCharacter>\n';

    $('#wmv_export').val(text);


    var file_uri = 'data:text/xml;charset=utf-8,' + encodeURIComponent(text);

    $("#download_file").attr('href', file_uri);
    $("#code_file").attr('href', file_uri);




    filename = filename.replace(/[^ \w]+/g, '_');


    

    
    if(param=="eq") $("#download_file").attr('download', filename + ".eq"); 
    else $("#download_file").attr('download', filename + ".chr");


    filename = "My Character";



    return text;

}


var dr_mode = "HTML";

function exportDRCode( mode ) {




    var list = [];


    $("table.listview-mode-default > tbody.clickable > tr").each(function(){
        var name = $(this).find( 'td:nth-child(2) a.listview-cleartext').text();
        var href = "http://www.wowhead.com" + $(this).find( 'td:nth-child(2) a.listview-cleartext').attr('href');
        var slot = $(this).find( 'td:nth-child(3)').text();
          if(slot=="Two-Hand"||slot=="One-Hand"||slot=="Held In Off-hand"){
              slot = $(this).find( 'td:nth-child(4) a').text();
          }

        list.push({ name : name, href: href, slot: slot });

    });

    var list_text = "";


    if( mode == "HTML") {

        for( var i=0;i<list.length;i++ )
            list_text = list_text + list[i].slot + ": " + '<a href="' + list[i].href + '">' + list[i].name + '</a><br>\n';


            }
    else if( mode == "Reddit") {
        for( var i=0;i<list.length;i++ )
            list_text = list_text + list[i].slot + ": " + '[' + list[i].name + '](' + list[i].href + ')\n\n';

            }
    else if( mode == "Forum") {
        for( var i=0;i<list.length;i++ )
            list_text = list_text + list[i].slot + ': [url=' + list[i].href + ']' + list[i].name + '[/url]';

            }
    else if( mode == "WMV") {
            list_text = exportWMV();

            }
    else {
        for( var i=0;i<list.length;i++ )
            list_text = list_text + list[i].slot + ': ' + list[i].name + '\n';
            }

    $('#dr_code_box').text(list_text);

    dr_mode = mode;


}




var observer = null;
var config = {
    attributes: false,
    childList: true,
    characterData: true,
    subtree: true
};



function observeChanges() {


    var target = $('table.listview-mode-default tbody.clickable')[0];



    if (!observer) {
        observer = new MutationObserver(function(mutations) {
            console.log('MUTATION');
            exportDRCode(dr_mode);
            exportWMV();

        });

        observer.observe(target, config);

    }

}




















/****************Comparison Item List Creator*********************/


var table2 = [
    '' ,//0
    'Head: ' ,//1
    'Neck: ' ,//2
    'Shoulders: ' ,//3
    'Shirt: ' ,//4
    'Chest: ' ,//5
    'Waist: ' ,//6
    'Legs: ' ,//7
    'Boots: ' ,//8
    'Wrists: ', //9
    'Hands: '  ,  //10
    '' ,  //11,
    '' ,  //12
    '1H Weapon: ',//13,
    'Shield: ' ,   //14
    'Ranged: ' ,  //15
    'Cloak: ' ,   //16
    '2H Weapon: ' //17

];


table2[23] = 'Off-hand: ';


var fakeDiv= $('<div id="fake" style="display:none;"></div>').appendTo('body');





function Markdown(url,name,slot) {


}




$('#autobtn').click(createList);
$('#reddit').click(Markdown);
$('#bbcode').click(BBCode);



function createList(){

    $( fakeDiv ).html( '' );

    $('div.summary-group-bottom .iconsmall a').each(function(){

        var href=$(this).attr('href');
        var match = href.match(/\/item=(\d+)/)[1];

        var url = 'http://www.wowhead.com/item='+ match;

        if(match) {



            var a  = $('<a>').attr('href','http://www.wowhead.com/item='+ match );

            $( fakeDiv ).append( a );

            var slot = g_items[match].jsonequip.slot;
            var name = g_items[match].name_enus;



            if( slot && table2[slot] )
                $( a ).before( table2[slot] );


            if( name )
                $( a ).text( name );

            $(a).after('<br>');


        }

    });

    text =  fakeDiv.html();

    text = text + '<br><a href="http://www.wowhead.com' + $('#su_link').attr('href') +'">View on Wowhead</a>';



    baseURI = document.baseURI;
    var uri = baseURI.match(/http:\/\/[a-z]+.wowhead.com\//)[0];

    if(uri)  {


        $('#autoitems').text(text).fadeIn() ;

    }
    else {
        $('#autoitems').text('Error :(').fadeIn() ;
    }
}

function Markdown(){

    $( fakeDiv ).html( '' );

    $('div.summary-group-bottom .iconsmall a').each(function(){

        var href=$(this).attr('href');
        var match = href.match(/\/item=(\d+)/)[1];

        var url = 'http://www.wowhead.com/item='+ match;

        if(match) {



            var slot = g_items[match].jsonequip.slot;
            var name = g_items[match].name_enus;




            if( name ){

                if( slot && table2[slot] ) $( fakeDiv ).append(  table2[slot] );

                $( fakeDiv ).append(  '[' + name + '](' + url + ')\n\n' );
            }



        }

    });

    text =  fakeDiv.html();

    text = text + '[View on Wowhead](http://www.wowhead.com' + $('#su_link').attr('href') +')';



    baseURI = document.baseURI;
    var uri = baseURI.match(/http:\/\/[a-z]+.wowhead.com\//)[0];

    if(uri)  {


        $('#autoitems').text(text).fadeIn() ;

    }
    else {
        $('#autoitems').text('Error :(').fadeIn() ;
    }
}

function BBCode(){

    $( fakeDiv ).html( '' );

    $('div.summary-group-bottom .iconsmall a').each(function(){

        var href=$(this).attr('href');
        var match = href.match(/\/item=(\d+)/)[1];

        var url = 'http://www.wowhead.com/item='+ match;

        if(match) {



            //var a  = $('<a>').attr('href','http://www.wowhead.com/item='+ match );

            //$( fakeDiv ).append( a );

            var slot = g_items[match].jsonequip.slot;
            var name = g_items[match].name_enus;



            if( slot && table2[slot] )
                //$( a ).before( table2[slot] ); 
                $(fakeDiv).append( table2[slot] );


                if( name )
                    $(fakeDiv).append( '[url=' + url + ']' + name + '[/url]'); 

        }

    });

    text =  fakeDiv.html();

    text = text + '[url=http://www.wowhead.com' + $('#su_link').attr('href') +']View on Wowhead[/url]\n';



    baseURI = document.baseURI;
    var uri = baseURI.match(/http:\/\/[a-z]+.wowhead.com\//)[0];

    if(uri)  {


        $('#autoitems').text(text).fadeIn() ;

    }
    else {
        $('#autoitems').text('Error :(').fadeIn() ;
    }
}




