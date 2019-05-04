// ==UserScript==
// @name        Fanfiction+
// @namespace   DanielVestol.Fanfiction.net
// @description Improves readability and allows EBOOK DOWNLOADS!
// @include     https://www.fanfiction.net/*
// @version     1.18.1
// @grant       GM_xmlhttpRequest
// ==/UserScript==

// SETTINGS
const config = {
    ebookServer: "http://ebook.danielv.no:5001",
    //ebookServer: "http://localhost",
};
// END OF SETTINGS
console.log("DOM fully loaded and parsed");

// Better change between mobile and desktop edition.
// Credits to SirCxyrtyx for snippet
var mobileVersion = 'location = "https://m.fanfiction.net' + document.location.pathname + '"';
// console.log(mobileVersion);
document.getElementsByClassName('icon-kub-mobile')[0].setAttribute('onclick', mobileVersion);

// run code depending on what subpage we are on
// for main page
if(document.location.pathname == "/") {
    // Changing some simple styles
    document.getElementById('content_wrapper').style.maxWidth = '800px';
    // appending a style tag in HTML
    $('#top').append('<style>tr>td>div>ins{display:none !important;}.zmenu{display:none !important;}p{-webkit-touch-callout: all;-webkit-user-select: all;-khtml-user-select: all;-moz-user-select: all;-ms-user-select: all;user-select: all;}</style>');
}

if(document.location.pathname.substr(0, 3) == "/s/") {
    // Changing some simple styles
    $('#top').append('<style>tr>td>div>ins{display:none !important;}.zmenu{display:none !important;}p{-webkit-touch-callout: all;-webkit-user-select: all;-khtml-user-select: all;-moz-user-select: all;-ms-user-select: all;user-select: all;}</style>');
    document.getElementById('content_wrapper').style.maxWidth = '800px';
    // OCD friendly review field
    var review = document.getElementById('review');
    review.getElementsByTagName('TD')[0].remove();
    review.getElementsByTagName('TD')[0].remove(); // Remove element 1 which is now 0
    review.getElementsByTagName('DIV')[0].style.maxWidth = '765px';
    review.getElementsByTagName('DIV')[0].style.margin = '10px';
    document.getElementById('review_name_value').style.maxWidth = '780px';
    document.getElementById('review_review').style.maxWidth = '780px';
    //
    // Show whole book function
    //
    $('#content_wrapper_inner > span:nth-child(7)').append('<button id="myShit" class="btn" type="BUTTON">Show whole book</button>');
    document.getElementById('myShit').addEventListener('click', function() {
        document.getElementById('storytextp').innerHTML = "<div id='topSuprSecret' style='position:fixed;top:100px;left:100px;width:auto;height:70px;padding-left:20px;padding-right:20px;background-color:#A2DEF2;'><h1>Loading book...</h1></div>";
        $.ajaxSetup({
            async: false
        });
        setTimeout(function(){ //timeout to let it get us a progress bar ish thing
            for (let i = chapter; i < document.getElementById('chap_select').options.length+1; i++) {
                // chapter is variable used by fanfiction, it counts what chapter you are at starting at 1.
                // my own call to get chapter has +1 because it fetches a list starting at 0 instead.
                console.log("Downloading " + document.location.pathname.substr(3, 8).replace("/", "") + " chapter " + i);
                var $div = $('<div>');
                $div.load('https://www.fanfiction.net/s/' + document.location.pathname.substr(3, 8).replace("/", "") + '/' + i + ' #storytext', function(){
                    // now $(this)[0].innerHTML contains #storytext
                    $("#storytextp").append($(this)[0].innerHTML);
                });
            }
            document.getElementById('topSuprSecret').outerHTML = '';
        }, 100); // end of timeout
    });
    //
    // EBOOKS!!!!!!!!!!!!!!!!!
    //
    $('#content_wrapper_inner > span:nth-child(7)').append('<button id="getEbook" class="btn" type="BUTTON">ebook</button>');
    document.getElementById('getEbook').addEventListener('click', function() {
        document.getElementById('storytextp').innerHTML = "<div id='topSuprSecret' style='position:fixed;top:100px;left:100px;width:auto;height:70px;padding-left:20px;padding-right:20px;background-color:#A2DEF2;'><h1>Loading book...</h1></div>";
        $.ajaxSetup({
            async: false
        });
        let data = {
            ebookMethod: "links",
            title: document.querySelector("#profile_top > b").innerHTML,
            author: [document.querySelector("#profile_top > a").innerHTML],
            publisher: "fanfiction.net",
            contents: [],
            bookID: document.location.pathname.substr(3, 8).replace("/", "")
        };
        setTimeout(function() {
        for (let i = 1; i < document.getElementById('chap_select').options.length+1; i++) {
            data.contents[data.contents.length] = {
                url: 'https://www.fanfiction.net/s/' + document.location.pathname.substr(3, 8).replace("/", "") + '/' + i,
                dataSelector: "#storytextp",
                title: document.getElementById('chap_select').options[i-1].innerHTML,
            };
        }
        document.querySelector("#topSuprSecret").innerHTML = "<h1>Converting to epub...</h1>";
        console.log(data);
        GM_xmlhttpRequest({
            method: "POST",
            url: config.ebookServer + "/epubify",
            data: JSON.stringify(data),
            headers:    {
                "Content-Type": "application/json"
            },
            onload:function(response) {
                console.log(response.responseText + " book is done");
                if(response.responseText == "success") {
                    location.href = config.ebookServer + "/" + document.location.pathname.substr(3, 8).replace("/", "") + ".epub";
                } else {
                    alert("Could not contact ebook server. Please alert author.");
                }
                document.getElementById('topSuprSecret').outerHTML = '';
            }
        });
        }, 100); // end of timeout
    });
}