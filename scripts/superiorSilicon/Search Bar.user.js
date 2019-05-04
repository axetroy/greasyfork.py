// ==UserScript==
// @name         Search Bar
// @namespace    superiorSilicon
// @version      1.5.2
// @description  Adds a search box on the navigation bar.
// @author       superiorSilicon
// @include      *worldwidetorrents.me*
// @exclude      *worldwidetorrents.me/index.php
// @require      https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @require      https://greasyfork.org/scripts/34501-nanomodal-kylepaulsen/code/NanoModal%20(kylepaulsen).js?version=226625
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_listValues
// ==/UserScript==
$(document).ready(function(){
/*
* NOTHING TO
* EDIT IN THE
* SCRIPT ANYMORE
* SETTINGS HAVE
* BEEN TRANSFERED
* TO THE SETTINGS
* DIALOG ON THE
* SEARCH BOX ITSELF.
* THANK YOU.
* -superiorSilicon
*/
var pos = GM_getValue("pos", "side");
var carry = GM_getValue("carry", true);
var show = GM_getValue("show", false);
$('head').append(`<style>
.searchBar {
margin: 5px 10px
}
.searchInput {
width: 300px;
padding: 5px;
outline: none;
}
#advSearch {
color: #3b3b3b;
position: relative;
right: 20%;
top: 3px;
font-size: 20px;
}
#search {
color: #3b3b3b;
position: relative;
right: 19%;
top: 5px;
display: inline;
}
.material-icons {
cursor: pointer;
}
.material-icons:hover {
text-shadow: 1px 0 1px gray;
}
#search{
margin-left: -10px;
}
#search:hover {
background: rgba(1, 1, 1, 0);
}
.nanoModal.nanoModalOverride {
position: fixed;
}
.closeAdvModal {
float: left;
margin-right: 20px;
}
</style>`);
$('body').append(`
<div style="display: none">
    <div id="modalForm">
        <h1 class="modalHeader" style="text-align: center">Search Torrents</h1><br>
        <input type="text" id="advSearchQuery" placeholder="Search..." style="margin-top: 5px; width: 100%; padding-left: 5px; padding-right: 5px; padding-top: 2px; padding-bottom: 2px">
        <br>
        <select id="cat" style="margin-top: 5px; width: 100%">
            <option value="0">All Categories</option>
            <option value="28">Anime: Movie</option>
            <option value="80">Anime: Anime Music Video</option>
            <option value="81">Anime: English-translated</option>
            <option value="82">Anime: Other Anime</option>
            <option value="18">Apps: Windows</option>
            <option value="19">Apps: Mac</option>
            <option value="20">Apps: Linux</option>
            <option value="21">Apps: Unix</option>
            <option value="83">Apps: iOS</option>
            <option value="84">Apps: Android</option>
            <option value="85">Apps: Handheld</option>
            <option value="86">Apps: Other Applications</option>
            <option value="36">Books: E-Books</option>
            <option value="140">Books: Computers</option>
            <option value="51">Books: Manga</option>
            <option value="52">Books: Magazines</option>
            <option value="53">Books: Textbooks</option>
            <option value="54">Books: Fiction</option>
            <option value="55">Books: Non-fiction</option>
            <option value="56">Books: Audio books</option>
            <option value="57">Books: Academic</option>
            <option value="60">Books: Poetry</option>
            <option value="62">Books: Newspapers</option>
            <option value="87">Books: Programming</option>
            <option value="88">Books: Medical</option>
            <option value="89">Books: Cooking</option>
            <option value="90">Books: Sport</option>
            <option value="91">Books: Other Books</option>
            <option value="141">Books: Self Help</option>
            <option value="132">Comics: Nem43 Comics</option>
            <option value="50">Comics: Comics</option>
            <option value="9">Documentaries: All</option>
            <option value="10">Games: Windows</option>
            <option value="92">Games: Mac</option>
            <option value="93">Games: Linux</option>
            <option value="13">Games: Xbox</option>
            <option value="14">Games: Xbox360</option>
            <option value="12">Games: Xbox ONE</option>
            <option value="43">Games: PSP</option>
            <option value="15">Games: PS1</option>
            <option value="16">Games: PS2</option>
            <option value="44">Games: PS3</option>
            <option value="45">Games: PS4</option>
            <option value="46">Games: NDS</option>
            <option value="17">Games: Wii</option>
            <option value="48">Games: Handheld</option>
            <option value="58">Games: Android</option>
            <option value="94">Games: Cheats</option>
            <option value="95">Games: Other Games</option>
            <option value="127">Games: Table Top</option>
            <option value="136">Games: 3D</option>
            <option value="1">Movies: 3D Movies</option>
            <option value="2">Movies: Music Videos</option>
            <option value="42">Movies: Movie clips</option>
            <option value="4">Movies: Handheld</option>
            <option value="3">Movies: Dubbed Movies</option>
            <option value="96">Movies: iPad</option>
            <option value="97">Movies: Highres Movies</option>
            <option value="98">Movies: UltraHD</option>
            <option value="99">Movies: Bollywood</option>
            <option value="100">Movies: Concerts</option>
            <option value="101">Movies: Asian</option>
            <option value="102">Movies: Animation</option>
            <option value="103">Movies: Documentary</option>
            <option value="104">Movies: Academic Movies</option>
            <option value="106">Movies: Trailer</option>
            <option value="105">Movies: Sport</option>
            <option value="107">Movies: Other Movies</option>
            <option value="111">Movies: DVD, DVDRip, PDVD</option>
            <option value="112">Movies: Web rip, x264, x265</option>
            <option value="114">Movies: Action</option>
            <option value="115">Movies: Drama</option>
            <option value="116">Movies: Western</option>
            <option value="117">Movies: Family</option>
            <option value="119">Movies: Animated Short</option>
            <option value="120">Movies: TS/Cam Rip</option>
            <option value="121">Movies: Horror</option>
            <option value="122">Movies: Comedy</option>
            <option value="123">Movies: Sci-Fi</option>
            <option value="124">Movies: Biography</option>
            <option value="125">Movies: Mystery/Thriller</option>
            <option value="126">Movies: War</option>
            <option value="128">Movies: Dual Audio</option>
            <option value="129">Movies: Adventure</option>
            <option value="130">Movies: DVD Screener</option>
            <option value="138">Movies: Xvid/Divx</option>
            <option value="22">Music: MP3</option>
            <option value="23">Music: AAC</option>
            <option value="24">Music: Lossless</option>
            <option value="25">Music: Transcode</option>
            <option value="26">Music: Soundtrack</option>
            <option value="27">Music: Radio Shows</option>
            <option value="108">Music: Karaoke</option>
            <option value="109">Music: Classic</option>
            <option value="110">Music: Other Music</option>
            <option value="33">Other: Pictures</option>
            <option value="34">Other: Sound Clips</option>
            <option value="35">Other: Covers</option>
            <option value="37">Other: Wallpapers/Screensavers</option>
            <option value="40">Other: Tutorials</option>
            <option value="79">Other: Subtitles</option>
            <option value="38">Other: Fonts</option>
            <option value="39">Other: Unsorted</option>
            <option value="135">Other: WorldWideTorrents</option>
            <option value="5">TV: DVD</option>
            <option value="139">TV: DVDRip/MP4</option>
            <option value="6">TV: Divx/Xvid</option>
            <option value="41">TV: HD</option>
            <option value="7">TV: SVCD/VCD</option>
            <option value="118">TV: SD x264 x265</option>
            <option value="134">TV: Documentry</option>
            <option value="113">TV/HD: Sports</option>
            <option value="137">TV/SD: Sports</option>
            <option value="59">Unity Asset: All</option>
            <option value="65">XXX: Video</option>
            <option value="66">XXX: HD Video</option>
            <option value="73">XXX: UltraHD</option>
            <option value="71">XXX: Pictures</option>
            <option value="72">XXX: Magazines</option>
            <option value="75">XXX: Books</option>
            <option value="76">XXX: Hentai</option>
            <option value="77">XXX: XXX Games</option>
            <option value="78">XXX: Other XXX</option>
        </select><br>
        <select id="incldead" style="margin-top: 5px; width: 100%">
            <option value="0">Active Transfers</option>
            <option value="1">Include Dead</option>
            <option value="2">Only Dead</option>
        </select>
        <select id="lang" style="padding-right: 14.2%; margin-top: 5px; width: 100%">
            <option value="0">Any Language</option>
            <option value="1">English</option>
            <option value="2">French</option>
            <option value="3">German</option>
            <option value="4">Italian</option>
            <option value="5">Japanese</option>
            <option value="6">Spanish</option>
            <option value="7">Russian</option>
            <option value="8">Arabic</option>
            <option value="9">Dutch</option>
            <option value="10">Chinese</option>
            <option value="11">Croatian</option>
            <option value="12">Finnish</option>
            <option value="13">Hindi</option>
            <option value="14">Portuguese</option>
            <option value="15">Multiple Languages</option>
            <option value="16">Korean</option>
            <option value="17">Danish</option>
            <option value="18">Punjabi</option>
            <option value="19">Polish</option>
            <option value="20">Telugu</option>
            <option value="21">Tamil</option>
            <option value="22">Urdu</option>
            <option value="23">Malayalam</option>
            <option value="24">Greek</option>
        </select>
    </div>
</div>
`);

$('body').append(`
<div style="display: none">
    <div id="settingsModalForm">
        <h1 class="modalHeader" style="text-align: center;">Script Settings</h1>
        <h6 class="modalSubHeader" style="text-align: center;">Search Box Script | Created By superiorSilicon</h6>
        <hr style="background: #d4d4d4">
        <label for="setPos">Position:&nbsp;</label>
        <select id="setPos">
            <option value="side">Side</option>
            <option value="end">End</option>
        </select>
        <br>
        <label for="carryOpt">Take search box query into advanced search:&nbsp;</label>
        <input id="carryOpt" type="checkbox">
        <br>
        <label for="showOpt">Always Show Search Box:&nbsp;</label>
        <input id="showOpt" type="checkbox">
    </div>
</div>`);

if (true) {
    if (pos == 'side') {
        $('#setPos option[value="side"]').prop('selected', true);
    } else if (pos == 'end') {
        $('#setPos option[value="end"]').prop('selected', true);
    }
    $('#carryOpt').prop('checked', carry);
    $('#showOpt').prop('checked', show);
}

$('head').append('<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">');
var searchButton = $('a[title="Search Torrent"]');
var searchBar = `<li class="searchContainer">
<div id="searchBar" class="searchBar">
<input type="text" id="searchInput" class="searchInput" placeholder="Search...">
<i id="advSearch" class="material-icons">&#xE8B8;</i>
<a id="search" href="#"><i class="material-icons">&#xE8B6;</i></a>
</div>
</li>`; //The Search Box Itself!
searchButton.prop('href', '#');
if (pos == 'side') {
    searchButton.parent().after(searchBar);
} else if (pos == 'end') {
    searchButton.parent().parent().append(searchBar);
} else {
    searchButton.parent().after(searchBar);
}
if (show === true) {
    $('#searchBar').show();
} else if (show === false) {
    $('#searchBar').hide();
} else {
    $('#searchBar').hide();
}
searchButton.click(function(){
    $('#searchBar').toggle(); //Toggles the search box
});
$('#advSearch').click(function(){
    var getSearchQuery = $('#searchInput').val();
    if (carry === true) {
        $('#advSearchQuery').val(getSearchQuery);
    } else if (carry === false) {
        $('#advSearchQuery').val('');
    } else {
        $('#advSearchQuery').val(getSearchQuery);
    }
    var searchModal = nanoModal(document.getElementById("modalForm"), {
        buttons: [{
            text: "Search",
            handler: function(){
                var searchQuery = $('#advSearchQuery').val();
                var includeDead = $('#incldead option:selected').val();
                var category    = $('#cat option:selected').val();
                var language    = $('#lang option:selected').val();
                if (searchQuery !== ''){
                    window.open("https://worldwidetorrents.me/torrents-search.php?search="+ searchQuery +"&cat="+ category +"&incldead="+ includeDead +"&lang="+ language, "_self");
                } else {
                    alert("Please Input Search Query");
                }
            },
            primary: true
        }, {
            text: "Search In New Tab",
            handler: function(){
                var searchQuery = $('#advSearchQuery').val();
                var includeDead = $('#incldead option:selected').val();
                var category    = $('#cat option:selected').val();
                var language    = $('#lang option:selected').val();
                if (searchQuery !== ''){
                    window.open("https://worldwidetorrents.me/torrents-search.php?search="+ searchQuery +"&cat="+ category +"&incldead="+ includeDead +"&lang="+ language, "_blank");
                } else {
                    alert("Please Input Search Query");
                }
            },
            primary: false
        }, {
            text: 'Script Settings',
            handler: function(){
                //alert("Work In Progress");
                var settingsModal = nanoModal(document.getElementById('settingsModalForm'), {
                    buttons: [{
                        text: 'Save',
                        handler: function() {
                            GM_setValue("pos", $('#setPos option:selected').val());
                            GM_setValue("carry", $('#carryOpt').prop('checked'));
                            GM_setValue("show", $('#showOpt').prop('checked'));
                            settingsModal.hide();
                        },
                        primary: false,
                    }, {
                        text: 'Save and Apply',
                        handler: function(){
                            GM_setValue("pos", $('#setPos option:selected').val());
                            GM_setValue("carry", $('#carryOpt').prop('checked'));
                            GM_setValue("show", $('#showOpt').prop('checked'));
                            settingsModal.hide();
                            window.location.reload(false);
                        },
                        primary: true
                    }]
                });
                settingsModal.show();
            },
            primary: false
        }, {
            text: '×',
            handler: "hide",
            primary: false,
            classes: 'closeAdvModal'
        }]
    });
    searchModal.show();
    //window.open("https://worldwidetorrents.me/torrents-search.php", "_self");
});
$('#searchInput').on('keydown', function(e){
    if (e.which == 13) {
    window.open("https://worldwidetorrents.me/torrents-search.php?search="+ $('#searchInput').val() +"&cat=0&incldead=0&lang=0", "_self");
    }
});
/*
$('#search').click(function(){
    window.open("https://worldwidetorrents.me/torrents-search.php?search="+ $('#searchInput').val() +"&cat=0&incldead=0&lang=0", "_self");
});
*/
$('#search').on('mousedown', function(e){
    if (e.which == 2) {
        e.preventDefault();
        $('#search').attr("href", "https://worldwidetorrents.me/torrents-search.php?search="+ $('#searchInput').val() +"&cat=0&incldead=0&lang=0");
        $('#search').click();
    } else if (e.which == 1) {
		window.open("https://worldwidetorrents.me/torrents-search.php?search="+ $('#searchInput').val() +"&cat=0&incldead=0&lang=0", "_self");
	}
});
});