// ==UserScript==
// @name        WWT - Default values for Uploads
// @namespace   NotNeo
// @description Lets you set up defaults in the "Upload torrent" section of WWT (custom default description for every category)
// @include     *worldwidetorrents.to/torrents-upload.php
// @require     https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @version     2.3.5
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_deleteValue
// @grant        GM_listValues
// @icon         https://i.imgur.com/IFVDt6j.png
// ==/UserScript==

//---------------------------------------------------------------------------------------------//
//---------------------------------------------------------------------------------------------//
//               There's no longer any need to edit anything in here.                          //
//           Use the Script Options button on the page to change settings                      //
//  and the "Save description for category" button for making category specific descriptions.  //
//---------------------------------------------------------------------------------------------//
//---------------------------------------------------------------------------------------------//
var desc = [
    "", // 0
    "", // 1
    "", // 2
    "", // 3
    "", // 4
    "", // 5
    "", // 6
    "", // 7
    "", // 8
    "", // 9
    "", // 10
    "", // 11
    "", // 12
    "", // 13
    "", // 14
    "", // 15
    "", // 16
    "", // 17
    "", // 18
    "", // 19
    "", // 20
    "", // 21
    "", // 22
    "", // 23
    "", // 24
    "", // 25
    "", // 26
    "", // 27
    "", // 28
    "", // 29
    "", // 30
    "", // 31
    "", // 32
    "", // 33
    "", // 34
    "", // 35
    "", // 36
    "", // 37
    "", // 38
    "", // 39
    "", // 40
    "", // 41
    "", // 42
    "", // 43
    "", // 44
    "", // 45
    "", // 46
    "", // 47
    "", // 48
    "", // 49
    "", // 50
    "", // 51
    "", // 52
    "", // 53
    "", // 54
    "", // 55
    "", // 56
    "", // 57
    "", // 58
    "", // 59
    "", // 60
    "", // 61
    "", // 62
    "", // 63
    "", // 64
    "", // 65
    "", // 66
    "", // 67
    "", // 68
    "", // 69
    "", // 70
    "", // 71
    "", // 72
    "", // 73
    "", // 74
    "", // 75
    "", // 76
    "", // 77
    "", // 78
    "", // 79
    "", // 80
    "", // 81
    "", // 82
    "", // 83
    "", // 84
    "", // 85
    "", // 86
    "", // 87
    "", // 88
    "", // 89
    "", // 90
    "", // 91
    "", // 92
    "", // 93
    "", // 94
    "", // 95
    "", // 96
    "", // 97
    "", // 98
    "", // 99
    "", // 100
    "", // 101
    "", // 102
    "", // 103
    "", // 104
    "", // 105
    "", // 106
    "", // 107
    "", // 108
    "", // 109
    "", // 110
    "", // 111
    "", // 112
    "", // 113
    "", // 114
    "", // 115
    "", // 116
    "", // 117
    "", // 118
    "", // 119
    "", // 120
    "", // 121
    "", // 122
    "", // 123
    "", // 124
    "", // 125
    "", // 126
    "", // 127
    "", // 128
    "", // 129
    "", // 130
    "", // 131
    "", // 132
    "", // 133
    "", // 134
    "" // 135
];

var altDescArray = [
    "", //0
];
var altDescNameArray = [
    "Choose", //0
];
var savedIMDBCodeArray = [
    "", //0
];
var savedIMDBNameArray = [
    "Choose", //0
];

var dName = GM_getValue("dName"); // Getting the runtime variables from local storage
var dCategory = GM_getValue("dCategory");
var dLanguage = GM_getValue("dLanguage");
var dDesc = GM_getValue("dDesc");
var descW = GM_getValue("descW");
var descH = GM_getValue("descH");
var hideRules = GM_getValue("hideRules");
var reminder = GM_getValue("reminder");
var dIMDB = GM_getValue("dIMDB");

var arrayString = GM_getValue("arrayString"); //get desc array from storage as string
if(arrayString) { desc = JSON.parse(arrayString); } //parse the string to an array

var altArrayString = GM_getValue("altArrayString"); //get alt desc array from storage as string
if(altArrayString) { altDescArray = JSON.parse(altArrayString); } //parse the string to an array

var altNameArrayString = GM_getValue("altNameArrayString"); //get alt name array from storage as string
if(altNameArrayString) { altDescNameArray = JSON.parse(altNameArrayString); } //parse the string to an array

var savedIMDBCodeArrayString = GM_getValue("savedIMDBCodeArrayString"); //get alt name array from storage as string
if(savedIMDBCodeArrayString) { savedIMDBCodeArray = JSON.parse(savedIMDBCodeArrayString); } //parse the string to an array

var savedIMDBNameArrayString = GM_getValue("savedIMDBNameArrayString"); //get alt name array from storage as string
if(savedIMDBNameArrayString) { savedIMDBNameArray = JSON.parse(savedIMDBNameArrayString); } //parse the string to an array

$("input[name='torrent']").after('<button style="margin-left:10px; background-color: #99cc00; color: white;" id="optionsB" href="#">Script Options</button>'); //Adding script options button
$("input[name='imdb']").after('<button style="margin-left:10px; background-color: #99cc00; color: white;" id="imdbSave" href="#">Save</button>'); //IMDB save button
$("#imdbSave").click(function(e){
    e.preventDefault();
    var currentIMDB = $("input[name='imdb']").val();
    var name4SavedIMDB = prompt("Name this imdb code");
    savedIMDBCodeArray.push(currentIMDB);
    savedIMDBNameArray.push(name4SavedIMDB);
    var arrayString = JSON.stringify(savedIMDBCodeArray); //turn array into a single string
    GM_setValue("savedIMDBCodeArrayString", arrayString); //save that string to local storage
    arrayString = JSON.stringify(savedIMDBNameArray); //turn array into a single string
    GM_setValue("savedIMDBNameArrayString", arrayString); //save that string to local storage
});
$("#optionsB").click(function(e){ //options button action
    e.preventDefault();
    var optionsDiv = '<div id="optionsDiv" class"w3-modal" style="position: fixed; left:32%; top: 15%; display: block;"><div class="w3-modal-content w3-card-8 w3-animate-zoom" style="background-color: #7d97a5; max-width:500px">'; //making the options div
    optionsDiv += '<div class="w3-center"><h1>Options</h1></div><br>';
    optionsDiv += '<center>';
    optionsDiv += 'Default torrent name<br>';
    optionsDiv += '<input type="text" style="width:75%" name="dName"><br><br>';
    optionsDiv += 'Default IMDB code<br>';
    optionsDiv += '<input type="text" style="width:75%" name="dIMDB"><br><br>';
    optionsDiv += 'Default category (use category ID) <a href="#" id="catHelp" style="font-weight:bold; font-size:18px;">?</a><br>';
    optionsDiv += '<input type="text" style="width:2.5em; text-align: center;" maxlength="3" name="dCategory"><br><br>';
    optionsDiv += 'Default language (use language ID) <a href="#" id="lanHelp" style="font-weight:bold; font-size:18px;">?</a><br>';
    optionsDiv += '<input type="text" style="width:2em; text-align: center;" maxlength="2" name="dLanguage"><br><br>';
    optionsDiv += 'Description box size<br>';
    optionsDiv += 'Width: <input type="text" style="width:3em; text-align: center;" name="descW"> Height: <input type="text" style="width:3em; text-align: center;" size="20" name="descH"><br><br>';
    optionsDiv += 'Hide rules <input type="checkbox" style="zoom: 1.5; position:relative; top:4px;" name="hideRules"><br><br>';
    optionsDiv += 'Remind me to choose the category first <input type="checkbox" style="zoom: 1.5; position:relative; top:4px;" name="reminder"> <a href="#" id="reminderHelp" style="font-weight:bold; font-size:18px;">?</a><br>(red text next to category dropdown menu)<br><br>';
    optionsDiv += '<div style="overflow-y: scroll; max-height: 200px;">Remove Alternative descriptions below.<br><br>';
    for(i=1;i<altDescNameArray.length;i++) {
        optionsDiv += "<div>"+altDescNameArray[i]+"  <button class='removeAlt' name='alt"+i+"'>REMOVE</button></div>";
    }
    optionsDiv += '</div><br><div style="overflow-y: scroll; max-height: 200px;">Remove saved IMDB codes below.<br><br>';
    for(i=1;i<savedIMDBNameArray.length;i++) {
        optionsDiv += "<div>"+savedIMDBNameArray[i]+"  <button class='removeIMDB' name='imdb"+i+"'>REMOVE</button></div>";
    }
    optionsDiv += '</div><br><button id="setOptionsR" title="Saves the options and reloads the page to apply them">Save&Apply</button> <button id="setOptions" title="Saves the options, but does NOT reload the page to apply them">Save</button> <button id="cancelOptions">Cancel</button><br><br>';
    optionsDiv += '</center>';
    optionsDiv += '</div></div>';
    $("body").append(optionsDiv); //appending the options div

    $("#optionsDiv").find("[name='dName']").val(dName); //setting the options to their old values
    $("#optionsDiv").find("[name='dIMDB']").val(dIMDB);
    $("#optionsDiv").find("[name='dCategory']").val(dCategory);
    $("#optionsDiv").find("[name='dLanguage']").val(dLanguage);
    $("#optionsDiv").find("[name='descW']").val(descW);
    $("#optionsDiv").find("[name='descH']").val(descH);
    $("#optionsDiv").find("[name='hideRules']").prop('checked', hideRules);
    $("#optionsDiv").find("[name='reminder']").prop('checked', reminder);

    $(".removeAlt").click(function(e){ //help for reminder
        e.preventDefault();
        var altNum2Del = $(this).attr("name").slice(3);
        altDescArray.splice(altNum2Del, 1);
        altDescNameArray.splice(altNum2Del, 1);
        $(this).parent().remove();
    });
    $(".removeIMDB").click(function(e){ //help for reminder
        e.preventDefault();
        var IMDBNum2Del = $(this).attr("name").slice(4);
        savedIMDBCodeArray.splice(IMDBNum2Del, 1);
        savedIMDBNameArray.splice(IMDBNum2Del, 1);
        $(this).parent().remove();
    });
    $("#reminderHelp").click(function(e){ //help for reminder
        e.preventDefault();
        alert("This is to remind you that changing the category will insert the default description for that category into the description box, so you need to make sure you choose the category BEFORE you start editing the description.");
    });
    $("#descHelp").click(function(e){ //help for default description
        e.preventDefault();
        alert("This is the \"Global default\". Meaning If there is no default description for the selected category this will be used.");
    });
    $("#lanHelp").click(function(e){ //help for language
        e.preventDefault();
        var lanHelpString = "You need to use Language IDs here.\n\nThe IDs are:\n\n" +
            "ID: 0 - Language: Unknown/NA\n" +
            "ID: 1 - Language: English\n" +
            "ID: 2 - Language: French\n" +
            "ID: 3 - Language: German\n" +
            "ID: 4 - Language: Italian\n" +
            "ID: 5 - Language: Japanese\n" +
            "ID: 6 - Language: Spanish\n" +
            "ID: 7 - Language: Russian\n" +
            "ID: 8 - Language: Arabic\n" +
            "ID: 9 - Language: Dutch\n" +
            "ID: 10 - Language: Chinese\n" +
            "ID: 11 - Language: Croatian\n" +
            "ID: 12 - Language: Finnish\n" +
            "ID: 13 - Language: Hindi\n" +
            "ID: 14 - Language: Portuguese\n" +
            "ID: 15 - Language: Multiple Languages\n" +
            "ID: 16 - Language: Korean\n" +
            "ID: 17 - Language: Danish\n" +
            "ID: 18 - Language: Punjabi\n" +
            "ID: 19 - Language: Polish\n" +
            "ID: 20 - Language: Telugu\n" +
            "ID: 21 - Language: Tamil\n" +
            "ID: 22 - Language: Urdu\n" +
            "ID: 23 - Language: Malayalam\n";
        alert(lanHelpString);
    });
    $("#catHelp").click(function(e){ //help for Categories
        e.preventDefault();
        var catHelpString1 = "You need to use Category IDs here.\n\nThe IDs are:\n\n" +
            "ID: 0 - Category: Choose One\n" +
            "ID: 28 - Category: Anime: Movie\n" +
            "ID: 80 - Category: Anime: Anime Music Video\n" +
            "ID: 81 - Category: Anime: English-translated\n" +
            "ID: 82 - Category: Anime: Other Anime\n" +
            "ID: 18 - Category: Apps: Windows\n" +
            "ID: 19 - Category: Apps: Mac\n" +
            "ID: 20 - Category: Apps: Linux\n" +
            "ID: 21 - Category: Apps: Unix\n" +
            "ID: 83 - Category: Apps: iOS\n" +
            "ID: 84 - Category: Apps: Android\n" +
            "ID: 85 - Category: Apps: Handheld\n" +
            "ID: 86 - Category: Apps: Other Applications\n" +
            "ID: 36 - Category: Books: E-Books\n" +
            "ID: 51 - Category: Books: Manga\n" +
            "ID: 52 - Category: Books: Magazines\n" +
            "ID: 53 - Category: Books: Textbooks\n" +
            "ID: 54 - Category: Books: Fiction\n" +
            "ID: 55 - Category: Books: Non-fiction\n" +
            "ID: 56 - Category: Books: Audio books\n" +
            "ID: 57 - Category: Books: Academic\n" +
            "ID: 60 - Category: Books: Poetry\n" +
            "ID: 62 - Category: Books: Newspapers\n" +
            "ID: 87 - Category: Books: Programming\n" +
            "ID: 88 - Category: Books: Medical\n" +
            "ID: 89 - Category: Books: Cooking\n" +
            "ID: 90 - Category: Books: Sport\n" +
            "ID: 91 - Category: Books: Other Books\n" +
            "ID: 132 - Category: Comics: Nem43 Comics\n" +
            "ID: 50 - Category: Comics: Comics\n" +
            "ID: 9 - Category: Documentaries: All\n" +
            "ID: 10 - Category: Games: Windows\n" +
            "ID: 92 - Category: Games: Mac\n" +
            "ID: 93 - Category: Games: Linux\n" +
            "ID: 13 - Category: Games: Xbox\n" +
            "ID: 14 - Category: Games: Xbox360\n" +
            "ID: 12 - Category: Games: Xbox ONE\n" +
            "ID: 43 - Category: Games: PSP\n" +
            "ID: 15 - Category: Games: PS1\n" +
            "ID: 16 - Category: Games: PS2\n" +
            "ID: 44 - Category: Games: PS3\n" +
            "ID: 45 - Category: Games: PS4\n" +
            "ID: 46 - Category: Games: NDS\n" +
            "ID: 17 - Category: Games: Wii\n" +
            "ID: 48 - Category: Games: Handheld\n" +
            "ID: 58 - Category: Games: Android\n" +
            "ID: 94 - Category: Games: Cheats\n" +
            "ID: 95 - Category: Games: Other Games\n" +
            "ID: 127 - Category: Games: Table Top\n\nPress 'OK' to see more...";

        var catHelpString2 = "ID: 1 - Category: Movies: 3D Movies\n" +
            "ID: 2 - Category: Movies: Music Videos\n" +
            "ID: 42 - Category: Movies: Movie clips\n" +
            "ID: 4 - Category: Movies: Handheld\n" +
            "ID: 3 - Category: Movies: Dubbed Movies\n" +
            "ID: 96 - Category: Movies: iPad\n" +
            "ID: 97 - Category: Movies: Highres Movies\n" +
            "ID: 98 - Category: Movies: UltraHD\n" +
            "ID: 99 - Category: Movies: Bollywood\n" +
            "ID: 100 - Category: Movies: Concerts\n" +
            "ID: 101 - Category: Movies: Asian\n" +
            "ID: 102 - Category: Movies: Animation\n" +
            "ID: 103 - Category: Movies: Documentary\n" +
            "ID: 104 - Category: Movies: Academic Movies\n" +
            "ID: 106 - Category: Movies: Trailer\n" +
            "ID: 105 - Category: Movies: Sport\n" +
            "ID: 107 - Category: Movies: Other Movies\n" +
            "ID: 111 - Category: Movies: DVD, DVDRip, PDVD\n" +
            "ID: 112 - Category: Movies: Web rip, x264, x265\n" +
            "ID: 114 - Category: Movies: Action\n" +
            "ID: 115 - Category: Movies: Drama\n" +
            "ID: 116 - Category: Movies: Western\n" +
            "ID: 117 - Category: Movies: Family\n" +
            "ID: 119 - Category: Movies: Animated Short\n" +
            "ID: 120 - Category: Movies: TS/Cam Rip\n" +
            "ID: 121 - Category: Movies: Horror\n" +
            "ID: 122 - Category: Movies: Comedy\n" +
            "ID: 123 - Category: Movies: Sci-Fi\n" +
            "ID: 124 - Category: Movies: Biography\n" +
            "ID: 125 - Category: Movies: Mystery/Thriller\n" +
            "ID: 126 - Category: Movies: War\n" +
            "ID: 128 - Category: Movies: Dual Audio\n" +
            "ID: 129 - Category: Movies: Adventure\n" +
            "ID: 130 - Category: Movies: DVD Screener\n" +
            "ID: 22 - Category: Music: MP3\n" +
            "ID: 23 - Category: Music: AAC\n" +
            "ID: 24 - Category: Music: Lossless\n" +
            "ID: 25 - Category: Music: Transcode\n" +
            "ID: 26 - Category: Music: Soundtrack\n" +
            "ID: 27 - Category: Music: Radio Shows\n" +
            "ID: 108 - Category: Music: Karaoke\n" +
            "ID: 109 - Category: Music: Classic\n" +
            "ID: 110 - Category: Music: Other Music\n\nPress 'OK' to see more...";

        var catHelpString3 = "ID: 33 - Category: Other: Pictures\n" +
            "ID: 34 - Category: Other: Sound Clips\n" +
            "ID: 35 - Category: Other: Covers\n" +
            "ID: 37 - Category: Other: Wallpapers/Screensavers\n" +
            "ID: 40 - Category: Other: Tutorials\n" +
            "ID: 79 - Category: Other: Subtitles\n" +
            "ID: 38 - Category: Other: Fonts\n" +
            "ID: 39 - Category: Other: Unsorted\n" +
            "ID: 135 - Category: Other: WorldWideTorrents\n" +
            "ID: 5 - Category: TV: DVD\n" +
            "ID: 6 - Category: TV: Divx/Xvid\n" +
            "ID: 41 - Category: TV: HD\n" +
            "ID: 7 - Category: TV: SVCD/VCD\n" +
            "ID: 118 - Category: TV: SD x264 x265\n" +
            "ID: 134 - Category: TV: Documentry\n" +
            "ID: 113 - Category: TV/HD: Sports\n" +
            "ID: 59 - Category: Unity Asset: All\n" +
            "ID: 65 - Category: XXX: Video\n" +
            "ID: 66 - Category: XXX: HD Video\n" +
            "ID: 73 - Category: XXX: UltraHD\n" +
            "ID: 71 - Category: XXX: Pictures\n" +
            "ID: 72 - Category: XXX: Magazines\n" +
            "ID: 75 - Category: XXX: Books\n" +
            "ID: 76 - Category: XXX: Hentai\n" +
            "ID: 77 - Category: XXX: XXX Games\n" +
            "ID: 78 - Category: XXX: Other XXX\n";
        alert(catHelpString1);
        alert(catHelpString2);
        alert(catHelpString3);
    });
    $("#cancelOptions").click(function(e){ //when "cancel" is pressed options close and nothing is saved
        e.preventDefault();
        $("#optionsDiv").remove();
    });
    $("#setOptions").click(function(e){ //when "Save" is pressed the options close and the values are saved
        e.preventDefault();
        saveValues();
        $("#optionsDiv").remove(); //closing options
    });
    $("#setOptionsR").click(function(e){ //when "Save" is pressed the options close, the values are saved and the page reloads
        e.preventDefault();
        saveValues();
        $("#optionsDiv").remove(); //closing options
        location.reload(); //refresh page
    });
});
function saveValues() {
    var dName = $("#optionsDiv").find("[name='dName']").val(); //getting values from options and setting them to variables
    var dIMDB = $("#optionsDiv").find("[name='dIMDB']").val();
    var dCategory = $("#optionsDiv").find("[name='dCategory']").val();
    var dLanguage = $("#optionsDiv").find("[name='dLanguage']").val();
    var descW = $("#optionsDiv").find("[name='descW']").val();
    var descH = $("#optionsDiv").find("[name='descH']").val();
    var hideRules = $("#optionsDiv").find("[name='hideRules']").is(':checked');
    var reminder = $("#optionsDiv").find("[name='reminder']").is(':checked');

    GM_setValue("dName", dName); //Storing the varibles from above in local storage
    GM_setValue("dIMDB", dIMDB);
    GM_setValue("dCategory", dCategory);
    GM_setValue("dLanguage", dLanguage);
    GM_setValue("descW", descW);
    GM_setValue("descH", descH);
    GM_setValue("hideRules", hideRules);
    GM_setValue("reminder", reminder);
    var arrayString = JSON.stringify(altDescArray); //turn array into a single string
    GM_setValue("altArrayString", arrayString); //save that string to local storage
    arrayString = JSON.stringify(altDescNameArray); //turn array into a single string
    GM_setValue("altNameArrayString", arrayString); //save that string to local storage
    arrayString = JSON.stringify(savedIMDBCodeArray); //turn array into a single string
    GM_setValue("savedIMDBCodeArrayString", arrayString); //save that string to local storage
    arrayString = JSON.stringify(savedIMDBNameArray); //turn array into a single string
    GM_setValue("savedIMDBNameArrayString", arrayString); //save that string to local storage
}
if (hideRules) {
    $("h3.w3-allerta:contains('Upload Rules')").parent().parent().hide();
	$("h3.w3-allerta:contains('Upload Rules')").parent().parent().nextUntil("br").next().hide();
}
if (reminder) {
    $("[name='type']").parent().append(" <span style='color:red'><= Choose before editing the description</span> ");
}
$("#descr").after('<button id="saveDesc4Cat" style="margin-left:5px;" title="Saves the current contents of the description box as the default for the currently selected category.">Save for category</button><button id="saveDescAsD" style="margin-left:5px;" title="Saves the current contents of the description box as the global default.">Save as global default</button><button id="saveDescAsAlt" style="margin-left:5px;" title="Saves the current contents of the description box as an alternative description.">Save as alt</button>'); //buttons to save desc
$("#saveDescAsAlt").click(function(e){
    e.preventDefault();
    var desc2Save = $("[name='descr']").val(); //get current description
    var newAltDescName = prompt("Name this description. (Appears in the dropdown selection menu)");
    altDescArray.push(desc2Save); //save desc to the array
    altDescNameArray.push(newAltDescName); //save desc name to the array
    var arrayString = JSON.stringify(altDescArray); //turn array into a single string
    GM_setValue("altArrayString", arrayString); //save that string to local storage
    arrayString = JSON.stringify(altDescNameArray); //turn array into a single string
    GM_setValue("altNameArrayString", arrayString); //save that string to local storage
    alert("Saved as an alternative description, with the name " + newAltDescName + "\nDescription saved:\n\n" + desc2Save + "\n\nBecomes active next time the page is loaded.");
});
$("#saveDesc4Cat").click(function(e){
    e.preventDefault();
    var catID = $("[name='type']").val(); //get current category ID
    var desc2Save = $("[name='descr']").val(); //get current description
    desc[catID] = desc2Save; //save it to the array
    var arrayString = JSON.stringify(desc); //turn array into a single string
    GM_setValue("arrayString", arrayString); //save that string to local storage
    alert("Description saved for category ID: " + catID + "\nDescription saved:\n\n" + desc2Save + "\n\nBecomes active next time the page is loaded.");
});
$("#saveDescAsD").click(function(e){
    e.preventDefault();
    var desc2Save = $("[name='descr']").val(); //get current description
    GM_setValue("dDesc", desc2Save);
    alert("Description saved as global default.\nDescription saved:\n\n" + desc2Save + "\n\nBecomes active next time the page is loaded.");
});
//Using the settings on load
$("[name='name']").val(dName);
$("[name='imdb']").val(dIMDB);
$("[name='type']").val(dCategory);
$("[name='lang']").val(dLanguage);
$("#descr").attr("style", "width: " + descW + "px; height: " + descH + "px;");
$("[name='descr']").val(dDesc);
descriptionChanger(dDesc);
var altDescSelector = '<tr><td align="right">Alternative Descriptions: </td><td align="left"><select name="altDesc">' +
    '<option value="0">Choose</option>';
for(i=1;i<altDescNameArray.length;i++) {
    altDescSelector += '<option value="'+i+'">'+altDescNameArray[i]+'</option>';
}
altDescSelector += '</select></td></tr>';
$("[name='type']").parent().parent().after(altDescSelector);

var IMDBSelector = '<tr><td align="right">Saved IMDB codes: </td><td align="left"><select name="savedIMDBs">' +
    '<option value="0">Choose</option>';
for(i=1;i<savedIMDBNameArray.length;i++) {
    IMDBSelector += '<option value="'+i+'">'+savedIMDBNameArray[i]+'</option>';
}
IMDBSelector += '</select></td></tr>';
$("[name='imdb']").parent().parent().after(IMDBSelector);

$("[name='type']").change(function() {
    descriptionChanger(dDesc);
});
$("[name='altDesc']").change(function() {
    var newAlt = $("[name='altDesc']").val();
    if(newAlt == 0) { descriptionChanger(dDesc); } else {
        $("[name='descr']").val(altDescArray[newAlt]);
    }
});
$("[name='savedIMDBs']").change(function() {
    var newIMDB = $("[name='savedIMDBs']").val();
    if(newIMDB != 0) {
        $("[name='imdb']").val(savedIMDBCodeArray[newIMDB]);
    }
});

function descriptionChanger(dDesc) {
    var aMatch = false;
    for (i = 0; i < 136; i++) {
        if ($("[name='type']").val() == i && desc[i] !== "") {
            $("[name='descr']").val(desc[i]);
            aMatch = true;
        }
    }
    if(aMatch !== true) { $("[name='descr']").val(dDesc); }
}