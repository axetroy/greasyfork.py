// ==UserScript==
// @name        Reddit Plus
// @namespace   http://www.prahladyeri.com
// @author    Prahlad Yeri
// @description Highlight unread comments and mark them in blue. Revert new crappy profile to old classic one. Hide useless top links like POPULAR, ALL, etc.
// @homepage 	  http://www.prahladyeri.com
// @include     http://*.reddit.com/*
// @include     https://*.reddit.com/*
// @exclude https://*.reddit.com/r/FreelanceProgramming/*
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @version     1.7
// @grant    GM_addStyle
// @language   English (en)
// @license MIT License
// ==/UserScript==
// update 20-11-2015 fix for viewing contextual comments

console.log('==== REDDIT PLUS USERSCRIPT ====');

/**Hide the useless top bars**/
$("div.dropdown.srdrop").hide();
$("ul.flat-list.sr-bar.hover:first").hide();

/****** Reverting the New profile changes ******/
console.log('Now processing links');
links = $("span.user").find("a");
links.each(function(){
    href = $(this).attr('href');
    //console.log('processing link: ', href);
    if (href !== undefined && href.indexOf("//www.reddit.com/user/") != -1) {
        var user = href.split("/")[4];
        console.log('processing link. user is ',user);
        var newhref = "https://www.reddit.com/user/" + user + "/overview";
        $(this).attr('href',newhref);
    }
});

/***** Process Comments ****/

console.log('Now processing comments');
var prot = window.location.protocol;
//var url = window.location.href.replace("http://","").replace("https://","");
var url = window.location.href.replace(prot + "//","");
if (url.indexOf("/comments") == -1) return;
if (url.indexOf("context=") != -1) return; //no need for contextual comments

var postID = url.split("/")[4];
//console.log(GM_getValue('foo'));
//var redditBag = GM_getValue('redditBag');
var redditBag = localStorage.getItem('redditBag');

if (redditBag==null) {
  console.log('bag not found, creating one!');
  redditBag = {};
  /*redditBag.urls = {};
  redditBag.urls[url] = {};
  redditBag.urls[url].read =[]; //array*/
  
  //New method using posts object
  redditBag.posts = {};
  
  //redditBag.urls[url].read[0] ='just_a_comment_link';
  //GM_setValue('redditBag', redditBag);
  console.log('Reddit bag created!');
}
else {
  console.log('bag found!');
  redditBag = JSON.parse(redditBag);
  console.log('parsed json.');
}

//TODO (at the very end): Calculate current UTC and save it to redditBag.posts[postID]

//Mark the already read comments in the bag
/*if (redditBag.urls[url] != undefined) {
  console.log('read comments found in bag!');
  console.log(redditBag.urls[url].read.length);
   //mark all comments in redditBag.urls[url] as read
  $(redditBag.urls[url].read).each(function(index){
    console.log('tagging as read: ' + $(this)[index]);
    } );
}
else {
    console.log('no read comments found in bag!');
   redditBag.urls[url] = {};
   redditBag.urls[url].read = [];
}*/

//New method: Using posts object
//var utc = '';
var dt=new Date();
var lastVisit = '';
if (redditBag.posts[postID] != undefined) {
  console.log('post found in history: ', redditBag.posts[postID]);
  lastVisit = redditBag.posts[postID];
}
else {
  //var utc = dt.getUTCFullYear() + '-' + dt.getUTCMonth() + '-' + dt.getUTCDate() + ' ' + dt.getUTCHours() + ':' + dt.getUTCMinutes() + ':' + dt.getUTCSeconds();
  lastVisit = redditBag.posts[postID];
}

redditBag.posts[postID] = dt.toUTCString();
console.log('lastVisit set as: ', dt.toUTCString());

//Store all current comments inside the bag
/*if(jQuery==undefined) {
  console.log('jquery undefined');
}
else {
  console.log('jquery defined');
}*/


//$('.comment').css('background-color','lightgrey');

var cmts = $('.comment');
console.log(cmts.length  , ' comments found on page!');
cmts.each(function() {
  var cmid = $(this).attr('id');
  if (cmid!=undefined) {
      //console.log('checking ' + cmid + ' as read!');
     $(this).each(function(){
          timeTag = $(this).find('time').attr('title');
       //console.log('timeTag: ', timeTag);
       //console.log('lastVisit:', lastVisit);
       if (lastVisit==undefined || lastVisit=='') {
         console.log('first visit, all are unread, so don`t highlight anything');
       }
       else {
           var seclastVisit = Date.parse(lastVisit)/1000;
          var seccomment = Date.parse(timeTag)/1000;
           if (seccomment - seclastVisit >  0) {
           console.log('now comment found!');
             $('#' + cmid).addClass('nr_unread');
           }  
       }
     });
    
    
      //$('#' + cmdid).css('background-color','lightblue');
      //var arr = redditBag.urls[url].read;
    //console.log(redditBag.urls[url].read);
      /*if (redditBag.urls[url].read.indexOf(cmid)==-1) { 
        //was unread until now
        redditBag.urls[url].read.push(cmid); 
      }
    else {
      //was already read
       $(this).addClass('nr_read');
    }*/
    console.log('marked');
  }
  else {
    console.log('id attr not found!');
  }
});

//$('.comment:not(.nr_read)').css('background-color','lightblue','important');
//$('.nr_read').css('background-color','lightblue');
$('.nr_unread').css('background-color','lightblue');


//GM_setValue('redditBag', redditBag);

redditBag = JSON.stringify(redditBag);
localStorage.setItem('redditBag', redditBag);

