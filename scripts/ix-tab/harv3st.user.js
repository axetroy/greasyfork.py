// ==UserScript==
// @name         harv3st
// @version      1.14.5.1
// @minGMVer     1.14
// @minFFVer     26
// @namespace    4chan-X
// @description  Cross-browser userscript fork of 4chanx, customized for lolcow.
// @license      MIT; https://github.com/ccd0/4chan-x/blob/master/LICENSE 
// @include      https://lolcow.farm/*
// @include      https://lolcow.farm/*
// @include      https://lolcow.farm/*
// @include      https://lolcow.farm/*
// @include      https://lolcow.farm/*
// @include      https://lolcow.farm/*
// @include      https://lolcow.farm/*
// @include      https://lolcow.farm/*
// @include      https://lolcow.farm/*
// @include      https://lolcow.farm/*
// @include      https://lolcow.farm/*
// @include      https://lolcow.farm/*
// @include      https://lolcow.farm/*
// @include      https://lolcow.farm/*
// @include      https://lolcow.farm/*
// @include      https://lolcow.farm//*
// @include      https://lolcow.farm/*
// @include      https://lolcow.farm//*
// @include      https://lolcow.farm/*
// @include      https://lolcow.farm/*
// @include      https://lolcow.farm/*
// @include      https://lolcow.farm/*
// @include      https://www.google.com/recaptcha/api2/anchor?k=6Ldp2bsSAAAAAAJ5uyx_lx34lJeEpTLVkP5k04qc*
// @include      https://www.google.com/recaptcha/api2/frame?*&k=6Ldp2bsSAAAAAAJ5uyx_lx34lJeEpTLVkP5k04qc*
// @include      https://www.google.com/recaptcha/api2/frame?*&k=887877714&*
// @include      https://www.google.com/recaptcha/api2/bframe?*&k=6Ldp2bsSAAAAAAJ5uyx_lx34lJeEpTLVkP5k04qc*
// @include      http://www.google.com/recaptcha/api/fallback?k=6Ldp2bsSAAAAAAJ5uyx_lx34lJeEpTLVkP5k04qc*
// @include      https://www.google.com/recaptcha/api/fallback?k=6Ldp2bsSAAAAAAJ5uyx_lx34lJeEpTLVkP5k04qc*
// @exclude      http://www.4chan.org/pass
// @exclude      https://www.4chan.org/pass
// @exclude      http://www.4chan.org/pass?*
// @exclude      https://www.4chan.org/pass?*
// @exclude      http://www.4chan.org/advertise
// @exclude      https://www.4chan.org/advertise
// @exclude      http://www.4chan.org/advertise?*
// @exclude      https://www.4chan.org/advertise?*
// @exclude      http://www.4chan.org/donate
// @exclude      https://www.4chan.org/donate
// @exclude      http://www.4chan.org/donate?*
// @exclude      https://www.4chan.org/donate?*
// @exclude      http://www.4channel.org/pass
// @exclude      https://www.4channel.org/pass
// @exclude      http://www.4channel.org/pass?*
// @exclude      https://www.4channel.org/pass?*
// @exclude      http://www.4channel.org/advertise
// @exclude      https://www.4channel.org/advertise
// @exclude      http://www.4channel.org/advertise?*
// @exclude      https://www.4channel.org/advertise?*
// @exclude      http://www.4channel.org/donate
// @exclude      https://www.4channel.org/donate
// @exclude      http://www.4channel.org/donate?*
// @exclude      https://www.4channel.org/donate?*
// @connect      https://lolcow.farm/*
// @connect      https://lolcow.farm/*
// @connect      4cdn.org
// @connect      mayhemydg.github.io
// @connect      archive.4plebs.org
// @connect      archive.nyafuu.org
// @connect      archive.rebeccablacktech.com
// @connect      warosu.org
// @connect      desuarchive.org
// @connect      boards.fireden.net
// @connect      arch.b4k.co
// @connect      archive.b-stats.org
// @connect      archived.moe
// @connect      thebarchive.com
// @connect      archiveofsins.com
// @connect      api.clyp.it
// @connect      api.dailymotion.com
// @connect      api.github.com
// @connect      soundcloud.com
// @connect      vimeo.com
// @connect      www.googleapis.com
// @connect      *
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_deleteValue
// @grant        GM_listValues
// @grant        GM_addValueChangeListener
// @grant        GM_openInTab
// @grant        GM_xmlhttpRequest
// @grant        GM.getValue
// @grant        GM.setValue
// @grant        GM.deleteValue
// @grant        GM.listValues
// @grant        GM.openInTab
// @grant        GM.xmlHttpRequest
// @run-at       document-start
// @icon         https://lolcow.farm/static/lolcow.png
// ==/UserScript==

/*
* 4chan X
*
* Licensed under the MIT license.
* https://github.com/ccd0/4chan-x/blob/master/LICENSE
*
* Appchan X Copyright © 2013-2016 Zixaphir <zixaphirmoxphar@gmail.com>
* http://zixaphir.github.io/appchan-x/ 
* 4chan x Copyright © 2009-2011 James Campos <james.r.campos@gmail.com>
* https://github.com/aeosynth/4chan-x
* 4chan x Copyright © 2012-2014 Nicolas Stepien <stepien.nicolas@gmail.com>
* https://4chan-x.just-believe.in/
* 4chan x Copyright © 2013-2014 Jordan Bates <saudrapsmann@gmail.com>
* http://seaweedchan.github.io/4chan-x/
* 4chan x Copyright © 2012-2013 ihavenoface
* http://ihavenoface.github.io/4chan-x/
* 4chan SS Copyright © 2011-2013 Ahodesuka
* https://github.com/ahodesuka/4chan-Style-Script/ 
*
* Permission is hereby granted, free of charge, to any person
* obtaining a copy of this software and associated documentation
* files (the "Software"), to deal in the Software without
* restriction, including without limitation the rights to use,
* copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the
* Software is furnished to do so, subject to the following
* conditions:
*
* The above copyright notice and this permission notice shall be
* included in all copies or substantial portions of the Software.
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
* EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
* OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
* NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
* HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
* WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
* FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
* OTHER DEALINGS IN THE SOFTWARE.
*
* Contributors:
* aeosynth
* mayhemydg
* noface
* !K.WeEabo0o
* blaise
* that4chanwolf
* desuwa
* seaweed
* e000
* ahodesuka
* Shou
* ferongr
* xat
* Ongpot
* thisisanon
* Anonymous
* Seiba
* herpaderpderp
* WakiMiko
* btmcsweeney
* AppleBloom
* detharonil
*
* All the people who've taken the time to write bug reports.
*
* Thank you.
*/

/*
* Contains data from external sources:
*
* src/Monitoring/ThreadUpdater/beep.wav from http://freesound.org/people/pierrecartoons1979/sounds/90112/
*   cc-by-nc-3.0
*
* Font Awesome by Dave Gandy (http://fontawesome.io)
*   license: http://fontawesome.io/license/
*
* Icons used to identify various websites are property of the respective websites.
*/

(function() {

'use strict';

var $, $$, Anonymize, AntiAutoplay, ArchiveLink, Banner, Board, BoardConfig, Build, CSS, Callbacks, Captcha, CatalogLinks, CatalogThread, Config, Connection, CopyTextLink, CrossOrigin, CustomCSS, DataBoard, DeleteLink, DownloadLink, Embedding, ExpandComment, ExpandThread, FappeTyme, Favicon, Fetcher, FileInfo, Filter, Flash, Fourchan, Gallery, Get, Header, IDColor, IDHighlight, IDPostCount, ImageCommon, ImageExpand, ImageHost, ImageHover, ImageLoader, Index, Keybinds, Linkify, Main, MarkNewIPs, Menu, Metadata, Nav, NormalizeURL, Notice, PSAHiding, PassLink, Polyfill, Post, PostHiding, PostSuccessful, QR, QuoteBacklink, QuoteCT, QuoteInline, QuoteOP, QuotePreview, QuoteStrikeThrough, QuoteThreading, QuoteYou, Quotify, RandomAccessList, Recursive, Redirect, RelativeDates, RemoveSpoilers, ReplyPruning, Report, ReportLink, RevealSpoilers, SW, Sauce, Settings, ShimSet, SimpleDict, Site, Thread, ThreadHiding, ThreadLinks, ThreadStats, ThreadUpdater, ThreadWatcher, Time, UI, Unread, UnreadIndex, Volume;

var Conf, E, c, d, doc, docSet, g;

Conf = {};
c    = console;
d    = document;
doc  = d.documentElement;

// Workaround for userscript managers that run script before document.documentElement is set
docSet = function() {
  return (doc = d.documentElement);
};

g = {
  VERSION:   '1.14.5.1',
  NAMESPACE: '4chan X.',
  boards:    {}
};

E = (function() {
  var fn, r, regex, str;
  str = {
    '&': '&amp;',
    "'": '&#039;',
    '"': '&quot;',
    '<': '&lt;',
    '>': '&gt;'
  };
  r = String.prototype.replace;
  regex = /[&"'<>]/g;
  fn = function(x) {
    return str[x];
  };
  return function(text) {
    return r.call(text, regex, fn);
  };
})();

E.cat = function(templates) {
  var html, i, len;
  html = '';
  for (i = 0, len = templates.length; i < len; i++) {
    html += templates[i].innerHTML;
  }
  return html;
};

Config = (function() {
  var Config;

  Config = {
    main: {
      'Miscellaneous': {
        'Redirect to HTTPS': [true, 'Redirect to the HTTPS version of 4chan.'],
        'JSON Index': [true, 'Replace the original board index with one supporting searching, sorting, infinite scrolling, and a catalog mode.'],
        'Use 4chan X Catalog': [true, 'Link to 4chan X\'s catalog instead of the native 4chan one.', 1],
        'Index Refresh Notifications': [false, 'Show a notice at the top of the page when the index is refreshed.', 1],
        'Open Threads in New Tab': [false, 'Make links to threads in the index / 4chan X catalog open in a new tab.'],
        'External Catalog': [false, 'Link to external catalog instead of the internal one.'],
        'Catalog Links': [false, 'Add toggle link in header menu to turn Navigation links into links to each board\'s catalog.'],
        'Announcement Hiding': [false, 'Add button to hide 4chan announcements.'],
        'Desktop Notifications': [true, 'Enables desktop notifications across various 4chan X features.'],
        '404 Redirect': [true, 'Redirect dead threads and images to the archives.'],
        'Archive Report': [true, 'Enable reporting posts to supported archives.'],
        'Exempt Archives from Encryption': [true, 'Permit loading content from, and warningless redirects to, HTTP-only archives from HTTPS pages.'],
        'Keybinds': [true, 'Bind actions to keyboard shortcuts.'],
        'Time Formatting': [true, 'Localize and format timestamps.'],
        'Relative Post Dates': [true, 'Display dates like "3 minutes ago". Tooltip shows the timestamp.'],
        'Relative Date Title': [true, 'Show Relative Post Date only when hovering over dates.', 1],
        'Comment Expansion': [true, 'Expand comments that are too long to display on the index. Not applicable with JSON Index.'],
        'File Info Formatting': [true, 'Reformat the file information.'],
        'Thread Expansion': [true, 'Add buttons to expand threads.'],
        'Index Navigation': [false, 'Add buttons to navigate between threads.'],
        'Reply Navigation': [false, 'Add buttons to navigate to top / bottom of thread.'],
        'Custom Board Titles': [true, 'Allow editing of the board title and subtitle by ctrl/\u2318+clicking them.'],
        'Persistent Custom Board Titles': [false, 'Force custom board titles to be persistent, even if the board titles are updated.', 1],
        'Show Updated Notifications': [true, 'Show notifications when 4chan X is successfully updated.'],
        'Color User IDs': [true, 'Assign unique colors to user IDs on boards that use them'],
        'Count Posts by ID': [true, 'Display number of posts in the thread when hovering over an ID.'],
        'Remove Spoilers': [false, 'Remove all spoilers in text.'],
        'Reveal Spoilers': [false, 'Indicate spoilers if Remove Spoilers is enabled, or make the text appear hovered if Remove Spoiler is disabled.'],
        'Normalize URL': [true, 'Rewrite the URL of the current page, removing slugs and excess slashes, and changing /res/ to /thread/.'],
        'Disable Autoplaying Sounds': [false, 'Prevent sounds on the page from autoplaying.'],
        'Disable Native Extension': [true, '4chan X is NOT designed to work with the native extension.'],
        'Enable Native Flash Embedding': [true, 'Activate the native extension\'s Flash embedding if the native extension is disabled.']
      },
      'Linkification': {
        'Linkify': [true, 'Convert text into links where applicable.'],
        'Link Title': [true, 'Replace the link of a supported site with its actual title.', 1],
        'Cover Preview': [true, 'Show preview of supported links on hover.', 1],
        'Embedding': [true, 'Embed supported services. Note: Some services don\'t work on HTTPS.', 1],
        'Auto-embed': [false, 'Auto-embed Linkify Embeds.', 2],
        'Floating Embeds': [false, 'Embed content in a frame that remains in place when the page is scrolled.', 2]
      },
      'Filtering': {
        'Anonymize': [false, 'Make everyone Anonymous.'],
        'Filter': [true, 'Self-moderation placebo.'],
        'Filtered Backlinks': [false, 'When enabled, shows backlinks to filtered posts with a line-through decoration. Otherwise, hides the backlinks.', 1],
        'Recursive Hiding': [true, 'Hide replies of hidden posts, recursively.'],
        'Thread Hiding Buttons': [true, 'Add buttons to hide entire threads.'],
        'Reply Hiding Buttons': [true, 'Add buttons to hide single replies.'],
        'Stubs': [true, 'Show stubs of hidden threads / replies.']
      },
      'Images and Videos': {
        'Image Expansion': [false, 'Expand images / videos.'],
        'Image Hover': [false, 'Show full image / video on mouseover.'],
        'Image Hover in Catalog': [false, 'Show full image / video on mouseover in 4chan X catalog.'],
        'Gallery': [true, 'Adds a simple and cute image gallery. Has more options in the gallery menu.'],
        'Fullscreen Gallery': [false, 'Open gallery in fullscreen mode.', 1],
        'PDF in Gallery': [false, 'Show PDF files in gallery.', 1],
        'Sauce': [true, 'Add sauce links to images.'],
        'WEBM Metadata': [true, 'Add link to fetch title metadata from webm videos.'],
        'Reveal Spoiler Thumbnails': [false, 'Replace spoiler thumbnails with the original image.'],
        'Replace GIF': [false, 'Replace gif thumbnails with the actual image.'],
        'Replace JPG': [false, 'Replace jpg thumbnails with the actual image.'],
        'Replace PNG': [false, 'Replace png thumbnails with the actual image.'],
        'Replace WEBM': [false, 'Replace webm thumbnails with the actual webm video. Probably will degrade browser performance ;)'],
        'Image Prefetching': [false, 'Add link in header menu to turn on image preloading.'],
        'Fappe Tyme': [true, 'Hide posts without images when header menu item is checked. *hint* *hint*'],
        'Werk Tyme': [true, 'Hide all post images when header menu item is checked.'],
        'Autoplay': [true, 'Videos begin playing immediately when opened.'],
        'Restart when Opened': [false, 'Restart GIFs and WebMs when you hover over or expand them.'],
        'Show Controls': [true, 'Show controls on videos expanded inline.'],
        'Click Passthrough': [false, 'Clicks on videos trigger your browser\'s default behavior. Videos can be contracted with button / dragging to the left.', 1],
        'Allow Sound': [true, 'Open videos with the sound unmuted.'],
        'Mouse Wheel Volume': [true, 'Adjust volume of videos with the mouse wheel over the thumbnail/filename/gallery.'],
        'Loop in New Tab': [true, 'Loop videos opened in their own tabs.'],
        'Volume in New Tab': [true, 'Apply 4chan X mute and volume settings to videos opened in their own tabs.'],
        'Use Faster Image Host': [true, 'Change is*.4chan.org links to point to the faster i.4cdn.org host.']
      },
      'Menu': {
        'Menu': [true, 'Add a drop-down menu to posts.'],
        'Report Link': [true, 'Add a report link to the menu.', 1],
        'Copy Text Link': [true, 'Add a link to copy the post\'s text.', 1],
        'Thread Hiding Link': [true, 'Add a link to hide entire threads.', 1],
        'Reply Hiding Link': [true, 'Add a link to hide single replies.', 1],
        'Delete Link': [true, 'Add post and image deletion links to the menu.', 1],
        'Archive Link': [true, 'Add an archive link to the menu.', 1],
        'Edit Link': [true, 'Add a link to edit the image in Tegaki, /i/\'s painting program. Requires Quick Reply.', 1],
        'Download Link': [false, 'Add a download with original filename link to the menu.', 1]
      },
      'Monitoring': {
        'Thread Updater': [true, 'Fetch and insert new replies. Has more options in the header menu and the "Advanced" tab.'],
        'Unread Count': [true, 'Show the unread posts count in the tab title.'],
        'Quoted Title': [false, 'Change the page title to reflect you\'ve been quoted.', 1],
        'Hide Unread Count at (0)': [false, 'Hide the unread posts count in the tab title when it reaches 0.', 1],
        'Unread Favicon': [true, 'Show a different favicon when there are unread posts.'],
        'Unread Line': [true, 'Show a line to distinguish read posts from unread ones.'],
        'Remember Last Read Post': [true, 'Remember how far you\'ve read after you close the thread.'],
        'Scroll to Last Read Post': [true, 'Scroll back to the last read post when reopening a thread.', 1],
        'Unread Line in Index': [false, 'Show a line between read and unread posts in threads in the index.', 1],
        'Remove Thread Excerpt': [false, 'Replace the excerpt of the thread in the tab title with the board title.'],
        'Thread Stats': [true, 'Display reply and image count.'],
        'IP Count in Stats': [true, 'Display the unique IP count in the thread stats.', 1],
        'Page Count in Stats': [true, 'Display the page count in the thread stats.', 1],
        'Updater and Stats in Header': [true, 'Places the thread updater and thread stats in the header instead of floating them.'],
        'Thread Watcher': [true, 'Bookmark threads. Has more options in the thread watcher menu.'],
        'Fixed Thread Watcher': [true, 'Makes the thread watcher scroll with the page.', 1],
        'Persistent Thread Watcher': [false, 'The thread watcher will be visible when the page is loaded.', 1],
        'Mark New IPs': [false, 'Label each post from a new IP with the thread\'s current IP count.'],
        'Reply Pruning': [true, 'Add option in header menu to hide old replies in long threads. Activated by default in stickies.'],
        'Prune All Threads': [false, 'Activate Reply Pruning by default in all threads.', 1]
      },
      'Posting and Captchas': {
        'Quick Reply': [true, 'All-in-one form to reply, create threads, automate dumping and more.'],
        'Persistent QR': [false, 'The Quick reply won\'t disappear after posting.', 1],
        'Auto Hide QR': [true, 'Automatically hide the quick reply when posting.', 2],
        'Open Post in New Tab': [true, 'Open new threads in a new tab, and open replies in a new tab if you\'re not already in the thread.', 1],
        'Remember QR Size': [false, 'Remember the size of the Quick reply.', 1],
        'Remember Spoiler': [false, 'Remember the spoiler state, instead of resetting after posting.', 1],
        'Randomize Filename': [false, 'Set the filename to a random timestamp within the past year. Disabled on /f/.', 1],
        'Show New Thread Option in Threads': [true, 'Show the option to post a new / different thread from inside a thread.', 1],
        'Show Upload Progress': [true, 'Track progress of file uploads as percentage in submit button.', 1],
        'Cooldown': [true, 'Indicate the remaining time before posting again.', 1],
        'Posting Success Notifications': [true, 'Show notifications on successful post creation or file uploading.', 1],
        'Auto-load captcha': [false, 'Automatically load the captcha in the QR even if your post is empty.', 1],
        'Post on Captcha Completion': [false, 'Submit the post immediately when the captcha is completed.', 1],
        'Captcha Fixes': [true, 'Make captcha easier to use, especially with the keyboard.'],
        'Force Noscript Captcha': [false, 'Use the non-Javascript fallback captcha even if Javascript is enabled.'],
        'Pass Link': [false, 'Add a 4chan Pass login link to the bottom of the page.']
      },
      'Quote Links': {
        'Quote Backlinks': [true, 'Add quote backlinks.'],
        'OP Backlinks': [true, 'Add backlinks to the OP.', 1],
        'Bottom Backlinks': [false, 'Place backlinks at the bottom of posts.', 1],
        'Quote Inlining': [true, 'Inline quoted post on click.'],
        'Inline Cross-thread Quotes Only': [false, 'Don\'t inline quote links when the posts are visible in the thread.', 1],
        'Quote Hash Navigation': [false, 'Include an extra link after quotes for autoscrolling to quoted posts.', 1],
        'Forward Hiding': [true, 'Hide original posts of inlined backlinks.', 1],
        'Quote Previewing': [true, 'Show quoted post on hover.'],
        'Quote Highlighting': [true, 'Highlight the previewed post.', 1],
        'Resurrect Quotes': [true, 'Link dead quotes to the archives, and support inlining/previewing of archive links like quote links.'],
        'Remember Your Posts': [true, 'Remember your posting history.'],
        'Mark Quotes of You': [true, 'Add \'(You)\' to quotes linking to your posts.', 1],
        'Highlight Posts Quoting You': [true, 'Highlights any posts that contain a quote to your post.', 1],
        'Highlight Own Posts': [true, 'Highlights own posts.', 1],
        'Mark OP Quotes': [true, 'Add \'(OP)\' to OP quotes.'],
        'Mark Cross-thread Quotes': [true, 'Add \'(Cross-thread)\' to cross-threads quotes.'],
        'Quote Threading': [true, 'Add option in header menu to thread conversations.']
      }
    },
    imageExpansion: {
      'Fit width': [true, ''],
      'Fit height': [false, ''],
      'Scroll into view': [true, 'Scroll down when expanding images to bring the full image into view.'],
      'Expand spoilers': [true, 'Expand all images along with spoilers.'],
      'Expand videos': [true, 'Expand all images also expands videos.'],
      'Expand from here': [false, 'Expand all images only from current position to thread end.'],
      'Expand thread only': [false, 'In index, expand all images only within the current thread.'],
      'Advance on contract': [false, 'Advance to next post when contracting an expanded image.']
    },
    gallery: {
      'Hide Thumbnails': [false],
      'Fit Width': [true],
      'Fit Height': [true],
      'Stretch to Fit': [false],
      'Scroll to Post': [true],
      'Slide Delay': [6.0]
    },
    'Default Volume': 1.0,
    threadWatcher: {
      'Current Board': [false, 'Only show watched threads from the current board.'],
      'Auto Update Thread Watcher': [true, 'Periodically check status of watched threads.'],
      'Auto Watch': [true, 'Automatically watch threads you start.'],
      'Auto Watch Reply': [true, 'Automatically watch threads you reply to.'],
      'Auto Prune': [false, 'Automatically remove dead threads.'],
      'Show Unread Count': [true, 'Show number of unread posts in watched threads.'],
      'Show Site Prefix': [true, 'When multiple sites are shown in the thread watcher, add a prefix to board names to distinguish them.'],
      'Require OP Quote Link': [false, 'For purposes of thread watcher highlighting, only consider posts with a quote link to the OP as replies to the OP.']
    },
    filter: {
      general: '',
      postID: "# Highlight dubs on [s4s]:\n#/(\\d)\\1$/;highlight;top:no;boards:s4s",
      name: "# Filter any namefags:\n#/^(?!Anonymous$)/",
      uniqueID: "# Filter a specific ID:\n#/Txhvk1Tl/",
      tripcode: "# Filter any tripfag\n#/^!/",
      capcode: "# Set a custom class for mods:\n#/Mod$/;highlight:mod;op:yes\n# Set a custom class for admins:\n#/Admin$/;highlight:admin;op:yes",
      pass: "# Filter anyone using since4pass:\n#/./",
      subject: "# Filter Generals on /v/:\n#/general/i;boards:v;op:only",
      comment: "# Filter Stallman copypasta on /g/:\n#/what you\'re refer+ing to as linux/i;boards:g\n# Filter posts with 20 or more quote links:\n#/(?:>>\\d(?:(?!>>\\d)[^])*){20}/\n# Filter posts like T H I S / H / I / S:\n#/^>?\\s?\\w\\s?(\\w)\\s?(\\w)\\s?(\\w).*$[\\s>]+\\1[\\s>]+\\2[\\s>]+\\3/im",
      flag: '',
      filename: '',
      dimensions: "# Highlight potential wallpapers:\n#/1920x1080/;op:yes;highlight;top:no;boards:w,wg",
      filesize: '',
      MD5: ''
    },
    sauces: "# Known filename formats:\nhttp://www.pixiv.net/member_illust.php?mode=medium&illust_id=%$1;regexp:/^(\\d+)_p\\d+/\n//%$1.deviantart.com/gallery/#/d%$2;regexp:/^\\w+_by_(\\w+)-d([\\da-z]+)/\n//imgur.com/%$1;regexp:/^(?![a-zA-Z][a-z]{6})(?![A-Z]{7})(?!\\d{7})([\\da-zA-Z]{7})(?: \\(\\d+\\))?\\.\\w+$/\nhttp://flickr.com/photo.gne?id=%$1;regexp:/^(\\d+)_[\\da-f]{10}(?:_\\w)*\\b/\nhttps://www.facebook.com/photo.php?fbid=%$1;regexp:/^\\d+_(\\d+)_\\d+_[no]\\b/\n\n# Reverse image search:\nhttps://www.google.com/searchbyimage?image_url=%IMG&safe=off\nhttps://www.yandex.com/images/search?rpt=imageview&img_url=%IMG\n#//tineye.com/search?url=%IMG\n#//www.bing.com/images/search?q=imgurl:%IMG&view=detailv2&iss=sbi#enterInsights\n\n# Specialized reverse image search:\n//iqdb.org/?url=%IMG\nhttps://trace.moe/?auto&url=%IMG;text:wait\n#//3d.iqdb.org/?url=%IMG\n#//saucenao.com/search.php?url=%IMG\n\n# \"View Same\" in archives:\nhttp://eye.swfchan.com/search/?q=%name;types:swf\n#https://desuarchive.org/_/search/image/%sMD5/\n#https://archive.4plebs.org/_/search/image/%sMD5/\n#https://boards.fireden.net/_/search/image/%sMD5/\n#https://foolz.fireden.net/_/search/image/%sMD5/\n\n# Other tools:\n#http://exif.regex.info/exif.cgi?imgurl=%URL\n#//imgops.com/%URL;types:gif,jpg,png\n#//www.gif-explode.com/%URL;types:gif",
    FappeT: {
      werk: false
    },
    'Custom CSS': true,
    Index: {
      'Index Mode': 'paged',
      'Previous Index Mode': 'paged',
      'Index Size': 'small',
      'Show Replies': [true, 'Show replies in the index, and also in the catalog if "Catalog hover expand" is checked.'],
      'Catalog Hover Expand': [false, 'Expand the comment and show more details when you hover over a thread in the catalog.'],
      'Catalog Hover Toggle': [false, 'Turn "Catalog hover expand" on and off by clicking in the catalog.'],
      'Pin Watched Threads': [true, 'Move watched threads to the start of the index.'],
      'Anchor Hidden Threads': [true, 'Move hidden threads to the end of the index.'],
      'Refreshed Navigation': [false, 'Refresh index when navigating through pages.']
    },
    Header: {
      'Fixed Header': true,
      'Header auto-hide': false,
      'Header auto-hide on scroll': false,
      'Bottom Header': false,
      'Centered links': false,
      'Header catalog links': false,
      'Bottom Board List': false,
      'Shortcut Icons': false,
      'Custom Board Navigation': false
    },
    archives: {
      archiveLists: '',
      lastarchivecheck: 0,
      archiveAutoUpdate: true
    },
    boardnav: "[ toggle-all ]\na-replace\nc-replace\ng-replace\nk-replace\nv-replace\nvg-replace\nvr-replace\nck-replace\nco-replace\nfit-replace\njp-replace\nmu-replace\nsp-replace\ntv-replace\nvp-replace\n[external-text:\"FAQ\",\"https://github.com/ccd0/4chan-x/wiki/Frequently-Asked-Questions\"]",
    QR: {
      'QR.personas': "#options:\"sage\";boards:jp;always",
      sjisPreview: false
    },
    jsWhitelist: 'http://s.4cdn.org\nhttps://s.4cdn.org\nhttp://www.google.com\nhttps://www.google.com\nhttps://www.gstatic.com\nhttp://cdn.mathjax.org\nhttps://cdn.mathjax.org\nhttps://cdnjs.cloudflare.com\nhttps://rawgit.com\n\'self\'\n\'unsafe-inline\'\n\'unsafe-eval\'\n\n# Banner ads\n#http://s.zkcdn.net/ados.js\n#https://s.zkcdn.net/ados.js\n#http://engine.4chan-ads.org\n#https://engine.4chan-ads.org',
    captchaLanguage: '',
    time: '%m/%d/%y(%a)%H:%M:%S',
    timeLocale: '',
    backlink: '>>%id',
    pastedname: 'file',
    fileInfo: '%l %d (%p%s, %r%g)',
    favicon: 'ferongr',
    usercss: "/* Board title rice */\ndiv.boardTitle {\n  font-weight: 400 !important;\n}\n:root.yotsuba div.boardTitle {\n  font-family: sans-serif !important;\n  text-shadow: 1px 1px 1px rgba(100,0,0,0.6);\n}\n:root.yotsuba-b div.boardTitle {\n  font-family: sans-serif !important;\n  text-shadow: 1px 1px 1px rgba(105,10,15,0.6);\n}\n:root.photon div.boardTitle {\n  font-family: sans-serif !important;\n  text-shadow: 1px 1px 1px rgba(0,74,153,0.6);\n}\n:root.tomorrow div.boardTitle {\n  font-family: sans-serif !important;\n  text-shadow: 1px 1px 1px rgba(167,170,168,0.6);\n}\n",
    hotkeys: {
      'Toggle board list': ['Ctrl+b', 'Toggle the full board list.'],
      'Toggle header': ['Shift+h', 'Toggle the auto-hide option of the header.'],
      'Open empty QR': ['q', 'Open QR without post number inserted.'],
      'Open QR': ['Shift+q', 'Open QR with post number inserted.'],
      'Open settings': ['Alt+o', 'Open Settings.'],
      'Close': ['Esc', 'Close dialogs or notifications.'],
      'Spoiler tags': ['Ctrl+s', 'Insert spoiler tags.'],
      'Code tags': ['Alt+c', 'Insert code tags.'],
      'Eqn tags': ['Alt+e', 'Insert eqn tags.'],
      'Math tags': ['Alt+m', 'Insert math tags.'],
      'SJIS tags': ['Alt+a', 'Insert SJIS tags.'],
      'Toggle sage': ['Alt+s', 'Toggle sage in options field.'],
      'Toggle Cooldown': ['Alt+Comma', 'Toggle custom cooldown timer.'],
      'Post from URL': ['Alt+l', 'Post from URL.'],
      'Add new post': ['Alt+n', 'Add new post to the QR dump list.'],
      'Submit QR': ['Ctrl+Enter', 'Submit post.'],
      'Watch': ['w', 'Watch thread.'],
      'Update': ['r', 'Update the thread / refresh the index.'],
      'Update thread watcher': ['Shift+r', 'Manually refresh thread watcher.'],
      'Toggle thread watcher': ['t', 'Toggle visibility of thread watcher.'],
      'Mark thread read': ['Ctrl+0', 'Mark thread read from index (requires "Unread Line in Index").'],
      'Expand image': ['Shift+e', 'Expand selected image.'],
      'Expand images': ['e', 'Expand all images.'],
      'Open Gallery': ['g', 'Opens the gallery.'],
      'Next Gallery Image': ['Right', 'Go to the next image in gallery mode.'],
      'Previous Gallery Image': ['Left', 'Go to the previous image in gallery mode.'],
      'Advance Gallery': ['Enter', 'Go to next image or, if Autoplay is off, play video.'],
      'Pause': ['p', 'Pause/play videos in the gallery.'],
      'Slideshow': ['Ctrl+Right', 'Toggle the gallery slideshow mode.'],
      'fappeTyme': ['f', 'Toggle Fappe Tyme.'],
      'werkTyme': ['Shift+w', 'Toggle Werk Tyme.'],
      'Front page': ['1', 'Jump to front page.'],
      'Open front page': ['Shift+1', 'Open front page in a new tab.'],
      'Next page': ['Ctrl+Right', 'Jump to the next page.'],
      'Previous page': ['Ctrl+Left', 'Jump to the previous page.'],
      'Paged mode': ['Alt+1', 'Open the index in paged mode.'],
      'Infinite scrolling mode': ['Alt+2', 'Open the index in infinite scrolling mode.'],
      'All pages mode': ['Alt+3', 'Open the index in all threads mode.'],
      'Open catalog': ['Shift+c', 'Open the catalog of the current board.'],
      'Search form': ['Ctrl+Alt+s', 'Focus the search field on the board index.'],
      'Cycle sort type': ['Alt+x', 'Cycle through index sort types.'],
      'Next thread': ['Ctrl+Down', 'See next thread.'],
      'Previous thread': ['Ctrl+Up', 'See previous thread.'],
      'Expand thread': ['Ctrl+e', 'Expand thread.'],
      'Open thread': ['o', 'Open thread in current tab.'],
      'Open thread tab': ['Shift+o', 'Open thread in new tab.'],
      'Next reply': ['j', 'Select next reply.'],
      'Previous reply': ['k', 'Select previous reply.'],
      'Deselect reply': ['Shift+d', 'Deselect reply.'],
      'Hide': ['x', 'Hide thread.'],
      'Quick Filter MD5': ['5', 'Add the MD5 of the selected image to the filter list.'],
      'Previous Post Quoting You': ['Alt+Up', 'Scroll to the previous post that quotes you.'],
      'Next Post Quoting You': ['Alt+Down', 'Scroll to the next post that quotes you.']
    },
    updater: {
      checkbox: {
        'Beep': [false, 'Beep on new post to completely read thread.'],
        'Beep Quoting You': [false, 'Beep on new post quoting you.'],
        'Auto Scroll': [false, 'Scroll updated posts into view. Only enabled at bottom of page.'],
        'Bottom Scroll': [false, 'Always scroll to the bottom, not the first new post. Useful for event threads.'],
        'Scroll BG': [false, 'Auto-scroll background tabs.'],
        'Auto Update': [true, 'Automatically fetch new posts.'],
        'Optional Increase': [false, 'Increase the intervals between updates on threads without new posts.']
      },
      'Interval': 30
    },
    customCooldown: 0,
    customCooldownEnabled: true,
    'Thread Quotes': false,
    'Max Replies': 1000,
    'Autohiding Scrollbar': false,
    position: {
      'embedding.position': 'top: 50px; right: 0px;',
      'thread-stats.position': 'bottom: 0px; right: 0px;',
      'updater.position': 'bottom: 0px; left: 0px;',
      'thread-watcher.position': 'top: 50px; left: 0px;',
      'qr.position': 'top: 50px; right: 0px;'
    }
  };

  return Config;

}).call(this);

CSS = {

boards:
"/*!\n\
 *  Font Awesome 4.6.3 by @davegandy - http://fontawesome.io - @fontawesome\n\
 *  License - http://fontawesome.io/license (Font: SIL OFL 1.1, CSS: MIT License)\n\
 */\n\
@font-face {\n\
  font-family: FontAwesome;\n\
  0
  font-weight: 400;\n\
  font-style: normal;\n\
}\n\
.fa-glass:before {content: \"\\f000\";}\n\
.fa-music:before {content: \"\\f001\";}\n\
.fa-search:before {content: \"\\f002\";}\n\
.fa-envelope-o:before {content: \"\\f003\";}\n\
.fa-heart:before {content: \"\\f004\";}\n\
.fa-star:before {content: \"\\f005\";}\n\
.fa-star-o:before {content: \"\\f006\";}\n\
.fa-user:before {content: \"\\f007\";}\n\
.fa-film:before {content: \"\\f008\";}\n\
.fa-th-large:before {content: \"\\f009\";}\n\
.fa-th:before {content: \"\\f00a\";}\n\
.fa-th-list:before {content: \"\\f00b\";}\n\
.fa-check:before {content: \"\\f00c\";}\n\
.fa-remove:before, .fa-close:before, .fa-times:before {content: \"\\f00d\";}\n\
.fa-search-plus:before {content: \"\\f00e\";}\n\
.fa-search-minus:before {content: \"\\f010\";}\n\
.fa-power-off:before {content: \"\\f011\";}\n\
.fa-signal:before {content: \"\\f012\";}\n\
.fa-gear:before, .fa-cog:before {content: \"\\f013\";}\n\
.fa-trash-o:before {content: \"\\f014\";}\n\
.fa-home:before {content: \"\\f015\";}\n\
.fa-file-o:before {content: \"\\f016\";}\n\
.fa-clock-o:before {content: \"\\f017\";}\n\
.fa-road:before {content: \"\\f018\";}\n\
.fa-download:before {content: \"\\f019\";}\n\
.fa-arrow-circle-o-down:before {content: \"\\f01a\";}\n\
.fa-arrow-circle-o-up:before {content: \"\\f01b\";}\n\
.fa-inbox:before {content: \"\\f01c\";}\n\
.fa-play-circle-o:before {content: \"\\f01d\";}\n\
.fa-rotate-right:before, .fa-repeat:before {content: \"\\f01e\";}\n\
.fa-refresh:before {content: \"\\f021\";}\n\
.fa-list-alt:before {content: \"\\f022\";}\n\
.fa-lock:before {content: \"\\f023\";}\n\
.fa-flag:before {content: \"\\f024\";}\n\
.fa-headphones:before {content: \"\\f025\";}\n\
.fa-volume-off:before {content: \"\\f026\";}\n\
.fa-volume-down:before {content: \"\\f027\";}\n\
.fa-volume-up:before {content: \"\\f028\";}\n\
.fa-qrcode:before {content: \"\\f029\";}\n\
.fa-barcode:before {content: \"\\f02a\";}\n\
.fa-tag:before {content: \"\\f02b\";}\n\
.fa-tags:before {content: \"\\f02c\";}\n\
.fa-book:before {content: \"\\f02d\";}\n\
.fa-bookmark:before {content: \"\\f02e\";}\n\
.fa-print:before {content: \"\\f02f\";}\n\
.fa-camera:before {content: \"\\f030\";}\n\
.fa-font:before {content: \"\\f031\";}\n\
.fa-bold:before {content: \"\\f032\";}\n\
.fa-italic:before {content: \"\\f033\";}\n\
.fa-text-height:before {content: \"\\f034\";}\n\
.fa-text-width:before {content: \"\\f035\";}\n\
.fa-align-left:before {content: \"\\f036\";}\n\
.fa-align-center:before {content: \"\\f037\";}\n\
.fa-align-right:before {content: \"\\f038\";}\n\
.fa-align-justify:before {content: \"\\f039\";}\n\
.fa-list:before {content: \"\\f03a\";}\n\
.fa-dedent:before, .fa-outdent:before {content: \"\\f03b\";}\n\
.fa-indent:before {content: \"\\f03c\";}\n\
.fa-video-camera:before {content: \"\\f03d\";}\n\
.fa-photo:before, .fa-image:before, .fa-picture-o:before {content: \"\\f03e\";}\n\
.fa-pencil:before {content: \"\\f040\";}\n\
.fa-map-marker:before {content: \"\\f041\";}\n\
.fa-adjust:before {content: \"\\f042\";}\n\
.fa-tint:before {content: \"\\f043\";}\n\
.fa-edit:before, .fa-pencil-square-o:before {content: \"\\f044\";}\n\
.fa-share-square-o:before {content: \"\\f045\";}\n\
.fa-check-square-o:before {content: \"\\f046\";}\n\
.fa-arrows:before {content: \"\\f047\";}\n\
.fa-step-backward:before {content: \"\\f048\";}\n\
.fa-fast-backward:before {content: \"\\f049\";}\n\
.fa-backward:before {content: \"\\f04a\";}\n\
.fa-play:before {content: \"\\f04b\";}\n\
.fa-pause:before {content: \"\\f04c\";}\n\
.fa-stop:before {content: \"\\f04d\";}\n\
.fa-forward:before {content: \"\\f04e\";}\n\
.fa-fast-forward:before {content: \"\\f050\";}\n\
.fa-step-forward:before {content: \"\\f051\";}\n\
.fa-eject:before {content: \"\\f052\";}\n\
.fa-chevron-left:before {content: \"\\f053\";}\n\
.fa-chevron-right:before {content: \"\\f054\";}\n\
.fa-plus-circle:before {content: \"\\f055\";}\n\
.fa-minus-circle:before {content: \"\\f056\";}\n\
.fa-times-circle:before {content: \"\\f057\";}\n\
.fa-check-circle:before {content: \"\\f058\";}\n\
.fa-question-circle:before {content: \"\\f059\";}\n\
.fa-info-circle:before {content: \"\\f05a\";}\n\
.fa-crosshairs:before {content: \"\\f05b\";}\n\
.fa-times-circle-o:before {content: \"\\f05c\";}\n\
.fa-check-circle-o:before {content: \"\\f05d\";}\n\
.fa-ban:before {content: \"\\f05e\";}\n\
.fa-arrow-left:before {content: \"\\f060\";}\n\
.fa-arrow-right:before {content: \"\\f061\";}\n\
.fa-arrow-up:before {content: \"\\f062\";}\n\
.fa-arrow-down:before {content: \"\\f063\";}\n\
.fa-mail-forward:before, .fa-share:before {content: \"\\f064\";}\n\
.fa-expand:before {content: \"\\f065\";}\n\
.fa-compress:before {content: \"\\f066\";}\n\
.fa-plus:before {content: \"\\f067\";}\n\
.fa-minus:before {content: \"\\f068\";}\n\
.fa-asterisk:before {content: \"\\f069\";}\n\
.fa-exclamation-circle:before {content: \"\\f06a\";}\n\
.fa-gift:before {content: \"\\f06b\";}\n\
.fa-leaf:before {content: \"\\f06c\";}\n\
.fa-fire:before {content: \"\\f06d\";}\n\
.fa-eye:before {content: \"\\f06e\";}\n\
.fa-eye-slash:before {content: \"\\f070\";}\n\
.fa-warning:before, .fa-exclamation-triangle:before {content: \"\\f071\";}\n\
.fa-plane:before {content: \"\\f072\";}\n\
.fa-calendar:before {content: \"\\f073\";}\n\
.fa-random:before {content: \"\\f074\";}\n\
.fa-comment:before {content: \"\\f075\";}\n\
.fa-magnet:before {content: \"\\f076\";}\n\
.fa-chevron-up:before {content: \"\\f077\";}\n\
.fa-chevron-down:before {content: \"\\f078\";}\n\
.fa-retweet:before {content: \"\\f079\";}\n\
.fa-shopping-cart:before {content: \"\\f07a\";}\n\
.fa-folder:before {content: \"\\f07b\";}\n\
.fa-folder-open:before {content: \"\\f07c\";}\n\
.fa-arrows-v:before {content: \"\\f07d\";}\n\
.fa-arrows-h:before {content: \"\\f07e\";}\n\
.fa-bar-chart-o:before, .fa-bar-chart:before {content: \"\\f080\";}\n\
.fa-twitter-square:before {content: \"\\f081\";}\n\
.fa-facebook-square:before {content: \"\\f082\";}\n\
.fa-camera-retro:before {content: \"\\f083\";}\n\
.fa-key:before {content: \"\\f084\";}\n\
.fa-gears:before, .fa-cogs:before {content: \"\\f085\";}\n\
.fa-comments:before {content: \"\\f086\";}\n\
.fa-thumbs-o-up:before {content: \"\\f087\";}\n\
.fa-thumbs-o-down:before {content: \"\\f088\";}\n\
.fa-star-half:before {content: \"\\f089\";}\n\
.fa-heart-o:before {content: \"\\f08a\";}\n\
.fa-sign-out:before {content: \"\\f08b\";}\n\
.fa-linkedin-square:before {content: \"\\f08c\";}\n\
.fa-thumb-tack:before {content: \"\\f08d\";}\n\
.fa-external-link:before {content: \"\\f08e\";}\n\
.fa-sign-in:before {content: \"\\f090\";}\n\
.fa-trophy:before {content: \"\\f091\";}\n\
.fa-github-square:before {content: \"\\f092\";}\n\
.fa-upload:before {content: \"\\f093\";}\n\
.fa-lemon-o:before {content: \"\\f094\";}\n\
.fa-phone:before {content: \"\\f095\";}\n\
.fa-square-o:before {content: \"\\f096\";}\n\
.fa-bookmark-o:before {content: \"\\f097\";}\n\
.fa-phone-square:before {content: \"\\f098\";}\n\
.fa-twitter:before {content: \"\\f099\";}\n\
.fa-facebook-f:before, .fa-facebook:before {content: \"\\f09a\";}\n\
.fa-github:before {content: \"\\f09b\";}\n\
.fa-unlock:before {content: \"\\f09c\";}\n\
.fa-credit-card:before {content: \"\\f09d\";}\n\
.fa-feed:before, .fa-rss:before {content: \"\\f09e\";}\n\
.fa-hdd-o:before {content: \"\\f0a0\";}\n\
.fa-bullhorn:before {content: \"\\f0a1\";}\n\
.fa-bell:before {content: \"\\f0f3\";}\n\
.fa-certificate:before {content: \"\\f0a3\";}\n\
.fa-hand-o-right:before {content: \"\\f0a4\";}\n\
.fa-hand-o-left:before {content: \"\\f0a5\";}\n\
.fa-hand-o-up:before {content: \"\\f0a6\";}\n\
.fa-hand-o-down:before {content: \"\\f0a7\";}\n\
.fa-arrow-circle-left:before {content: \"\\f0a8\";}\n\
.fa-arrow-circle-right:before {content: \"\\f0a9\";}\n\
.fa-arrow-circle-up:before {content: \"\\f0aa\";}\n\
.fa-arrow-circle-down:before {content: \"\\f0ab\";}\n\
.fa-globe:before {content: \"\\f0ac\";}\n\
.fa-wrench:before {content: \"\\f0ad\";}\n\
.fa-tasks:before {content: \"\\f0ae\";}\n\
.fa-filter:before {content: \"\\f0b0\";}\n\
.fa-briefcase:before {content: \"\\f0b1\";}\n\
.fa-arrows-alt:before {content: \"\\f0b2\";}\n\
.fa-group:before, .fa-users:before {content: \"\\f0c0\";}\n\
.fa-chain:before, .fa-link:before {content: \"\\f0c1\";}\n\
.fa-cloud:before {content: \"\\f0c2\";}\n\
.fa-flask:before {content: \"\\f0c3\";}\n\
.fa-cut:before, .fa-scissors:before {content: \"\\f0c4\";}\n\
.fa-copy:before, .fa-files-o:before {content: \"\\f0c5\";}\n\
.fa-paperclip:before {content: \"\\f0c6\";}\n\
.fa-save:before, .fa-floppy-o:before {content: \"\\f0c7\";}\n\
.fa-square:before {content: \"\\f0c8\";}\n\
.fa-navicon:before, .fa-reorder:before, .fa-bars:before {content: \"\\f0c9\";}\n\
.fa-list-ul:before {content: \"\\f0ca\";}\n\
.fa-list-ol:before {content: \"\\f0cb\";}\n\
.fa-strikethrough:before {content: \"\\f0cc\";}\n\
.fa-underline:before {content: \"\\f0cd\";}\n\
.fa-table:before {content: \"\\f0ce\";}\n\
.fa-magic:before {content: \"\\f0d0\";}\n\
.fa-truck:before {content: \"\\f0d1\";}\n\
.fa-pinterest:before {content: \"\\f0d2\";}\n\
.fa-pinterest-square:before {content: \"\\f0d3\";}\n\
.fa-google-plus-square:before {content: \"\\f0d4\";}\n\
.fa-google-plus:before {content: \"\\f0d5\";}\n\
.fa-money:before {content: \"\\f0d6\";}\n\
.fa-caret-down:before {content: \"\\f0d7\";}\n\
.fa-caret-up:before {content: \"\\f0d8\";}\n\
.fa-caret-left:before {content: \"\\f0d9\";}\n\
.fa-caret-right:before {content: \"\\f0da\";}\n\
.fa-columns:before {content: \"\\f0db\";}\n\
.fa-unsorted:before, .fa-sort:before {content: \"\\f0dc\";}\n\
.fa-sort-down:before, .fa-sort-desc:before {content: \"\\f0dd\";}\n\
.fa-sort-up:before, .fa-sort-asc:before {content: \"\\f0de\";}\n\
.fa-envelope:before {content: \"\\f0e0\";}\n\
.fa-linkedin:before {content: \"\\f0e1\";}\n\
.fa-rotate-left:before, .fa-undo:before {content: \"\\f0e2\";}\n\
.fa-legal:before, .fa-gavel:before {content: \"\\f0e3\";}\n\
.fa-dashboard:before, .fa-tachometer:before {content: \"\\f0e4\";}\n\
.fa-comment-o:before {content: \"\\f0e5\";}\n\
.fa-comments-o:before {content: \"\\f0e6\";}\n\
.fa-flash:before, .fa-bolt:before {content: \"\\f0e7\";}\n\
.fa-sitemap:before {content: \"\\f0e8\";}\n\
.fa-umbrella:before {content: \"\\f0e9\";}\n\
.fa-paste:before, .fa-clipboard:before {content: \"\\f0ea\";}\n\
.fa-lightbulb-o:before {content: \"\\f0eb\";}\n\
.fa-exchange:before {content: \"\\f0ec\";}\n\
.fa-cloud-download:before {content: \"\\f0ed\";}\n\
.fa-cloud-upload:before {content: \"\\f0ee\";}\n\
.fa-user-md:before {content: \"\\f0f0\";}\n\
.fa-stethoscope:before {content: \"\\f0f1\";}\n\
.fa-suitcase:before {content: \"\\f0f2\";}\n\
.fa-bell-o:before {content: \"\\f0a2\";}\n\
.fa-coffee:before {content: \"\\f0f4\";}\n\
.fa-cutlery:before {content: \"\\f0f5\";}\n\
.fa-file-text-o:before {content: \"\\f0f6\";}\n\
.fa-building-o:before {content: \"\\f0f7\";}\n\
.fa-hospital-o:before {content: \"\\f0f8\";}\n\
.fa-ambulance:before {content: \"\\f0f9\";}\n\
.fa-medkit:before {content: \"\\f0fa\";}\n\
.fa-fighter-jet:before {content: \"\\f0fb\";}\n\
.fa-beer:before {content: \"\\f0fc\";}\n\
.fa-h-square:before {content: \"\\f0fd\";}\n\
.fa-plus-square:before {content: \"\\f0fe\";}\n\
.fa-angle-double-left:before {content: \"\\f100\";}\n\
.fa-angle-double-right:before {content: \"\\f101\";}\n\
.fa-angle-double-up:before {content: \"\\f102\";}\n\
.fa-angle-double-down:before {content: \"\\f103\";}\n\
.fa-angle-left:before {content: \"\\f104\";}\n\
.fa-angle-right:before {content: \"\\f105\";}\n\
.fa-angle-up:before {content: \"\\f106\";}\n\
.fa-angle-down:before {content: \"\\f107\";}\n\
.fa-desktop:before {content: \"\\f108\";}\n\
.fa-laptop:before {content: \"\\f109\";}\n\
.fa-tablet:before {content: \"\\f10a\";}\n\
.fa-mobile-phone:before, .fa-mobile:before {content: \"\\f10b\";}\n\
.fa-circle-o:before {content: \"\\f10c\";}\n\
.fa-quote-left:before {content: \"\\f10d\";}\n\
.fa-quote-right:before {content: \"\\f10e\";}\n\
.fa-spinner:before {content: \"\\f110\";}\n\
.fa-circle:before {content: \"\\f111\";}\n\
.fa-mail-reply:before, .fa-reply:before {content: \"\\f112\";}\n\
.fa-github-alt:before {content: \"\\f113\";}\n\
.fa-folder-o:before {content: \"\\f114\";}\n\
.fa-folder-open-o:before {content: \"\\f115\";}\n\
.fa-smile-o:before {content: \"\\f118\";}\n\
.fa-frown-o:before {content: \"\\f119\";}\n\
.fa-meh-o:before {content: \"\\f11a\";}\n\
.fa-gamepad:before {content: \"\\f11b\";}\n\
.fa-keyboard-o:before {content: \"\\f11c\";}\n\
.fa-flag-o:before {content: \"\\f11d\";}\n\
.fa-flag-checkered:before {content: \"\\f11e\";}\n\
.fa-terminal:before {content: \"\\f120\";}\n\
.fa-code:before {content: \"\\f121\";}\n\
.fa-mail-reply-all:before, .fa-reply-all:before {content: \"\\f122\";}\n\
.fa-star-half-empty:before, .fa-star-half-full:before, .fa-star-half-o:before {content: \"\\f123\";}\n\
.fa-location-arrow:before {content: \"\\f124\";}\n\
.fa-crop:before {content: \"\\f125\";}\n\
.fa-code-fork:before {content: \"\\f126\";}\n\
.fa-unlink:before, .fa-chain-broken:before {content: \"\\f127\";}\n\
.fa-question:before {content: \"\\f128\";}\n\
.fa-info:before {content: \"\\f129\";}\n\
.fa-exclamation:before {content: \"\\f12a\";}\n\
.fa-superscript:before {content: \"\\f12b\";}\n\
.fa-subscript:before {content: \"\\f12c\";}\n\
.fa-eraser:before {content: \"\\f12d\";}\n\
.fa-puzzle-piece:before {content: \"\\f12e\";}\n\
.fa-microphone:before {content: \"\\f130\";}\n\
.fa-microphone-slash:before {content: \"\\f131\";}\n\
.fa-shield:before {content: \"\\f132\";}\n\
.fa-calendar-o:before {content: \"\\f133\";}\n\
.fa-fire-extinguisher:before {content: \"\\f134\";}\n\
.fa-rocket:before {content: \"\\f135\";}\n\
.fa-maxcdn:before {content: \"\\f136\";}\n\
.fa-chevron-circle-left:before {content: \"\\f137\";}\n\
.fa-chevron-circle-right:before {content: \"\\f138\";}\n\
.fa-chevron-circle-up:before {content: \"\\f139\";}\n\
.fa-chevron-circle-down:before {content: \"\\f13a\";}\n\
.fa-html5:before {content: \"\\f13b\";}\n\
.fa-css3:before {content: \"\\f13c\";}\n\
.fa-anchor:before {content: \"\\f13d\";}\n\
.fa-unlock-alt:before {content: \"\\f13e\";}\n\
.fa-bullseye:before {content: \"\\f140\";}\n\
.fa-ellipsis-h:before {content: \"\\f141\";}\n\
.fa-ellipsis-v:before {content: \"\\f142\";}\n\
.fa-rss-square:before {content: \"\\f143\";}\n\
.fa-play-circle:before {content: \"\\f144\";}\n\
.fa-ticket:before {content: \"\\f145\";}\n\
.fa-minus-square:before {content: \"\\f146\";}\n\
.fa-minus-square-o:before {content: \"\\f147\";}\n\
.fa-level-up:before {content: \"\\f148\";}\n\
.fa-level-down:before {content: \"\\f149\";}\n\
.fa-check-square:before {content: \"\\f14a\";}\n\
.fa-pencil-square:before {content: \"\\f14b\";}\n\
.fa-external-link-square:before {content: \"\\f14c\";}\n\
.fa-share-square:before {content: \"\\f14d\";}\n\
.fa-compass:before {content: \"\\f14e\";}\n\
.fa-toggle-down:before, .fa-caret-square-o-down:before {content: \"\\f150\";}\n\
.fa-toggle-up:before, .fa-caret-square-o-up:before {content: \"\\f151\";}\n\
.fa-toggle-right:before, .fa-caret-square-o-right:before {content: \"\\f152\";}\n\
.fa-euro:before, .fa-eur:before {content: \"\\f153\";}\n\
.fa-gbp:before {content: \"\\f154\";}\n\
.fa-dollar:before, .fa-usd:before {content: \"\\f155\";}\n\
.fa-rupee:before, .fa-inr:before {content: \"\\f156\";}\n\
.fa-cny:before, .fa-rmb:before, .fa-yen:before, .fa-jpy:before {content: \"\\f157\";}\n\
.fa-ruble:before, .fa-rouble:before, .fa-rub:before {content: \"\\f158\";}\n\
.fa-won:before, .fa-krw:before {content: \"\\f159\";}\n\
.fa-bitcoin:before, .fa-btc:before {content: \"\\f15a\";}\n\
.fa-file:before {content: \"\\f15b\";}\n\
.fa-file-text:before {content: \"\\f15c\";}\n\
.fa-sort-alpha-asc:before {content: \"\\f15d\";}\n\
.fa-sort-alpha-desc:before {content: \"\\f15e\";}\n\
.fa-sort-amount-asc:before {content: \"\\f160\";}\n\
.fa-sort-amount-desc:before {content: \"\\f161\";}\n\
.fa-sort-numeric-asc:before {content: \"\\f162\";}\n\
.fa-sort-numeric-desc:before {content: \"\\f163\";}\n\
.fa-thumbs-up:before {content: \"\\f164\";}\n\
.fa-thumbs-down:before {content: \"\\f165\";}\n\
.fa-youtube-square:before {content: \"\\f166\";}\n\
.fa-youtube:before {content: \"\\f167\";}\n\
.fa-xing:before {content: \"\\f168\";}\n\
.fa-xing-square:before {content: \"\\f169\";}\n\
.fa-youtube-play:before {content: \"\\f16a\";}\n\
.fa-dropbox:before {content: \"\\f16b\";}\n\
.fa-stack-overflow:before {content: \"\\f16c\";}\n\
.fa-instagram:before {content: \"\\f16d\";}\n\
.fa-flickr:before {content: \"\\f16e\";}\n\
.fa-adn:before {content: \"\\f170\";}\n\
.fa-bitbucket:before {content: \"\\f171\";}\n\
.fa-bitbucket-square:before {content: \"\\f172\";}\n\
.fa-tumblr:before {content: \"\\f173\";}\n\
.fa-tumblr-square:before {content: \"\\f174\";}\n\
.fa-long-arrow-down:before {content: \"\\f175\";}\n\
.fa-long-arrow-up:before {content: \"\\f176\";}\n\
.fa-long-arrow-left:before {content: \"\\f177\";}\n\
.fa-long-arrow-right:before {content: \"\\f178\";}\n\
.fa-apple:before {content: \"\\f179\";}\n\
.fa-windows:before {content: \"\\f17a\";}\n\
.fa-android:before {content: \"\\f17b\";}\n\
.fa-linux:before {content: \"\\f17c\";}\n\
.fa-dribbble:before {content: \"\\f17d\";}\n\
.fa-skype:before {content: \"\\f17e\";}\n\
.fa-foursquare:before {content: \"\\f180\";}\n\
.fa-trello:before {content: \"\\f181\";}\n\
.fa-female:before {content: \"\\f182\";}\n\
.fa-male:before {content: \"\\f183\";}\n\
.fa-gittip:before, .fa-gratipay:before {content: \"\\f184\";}\n\
.fa-sun-o:before {content: \"\\f185\";}\n\
.fa-moon-o:before {content: \"\\f186\";}\n\
.fa-archive:before {content: \"\\f187\";}\n\
.fa-bug:before {content: \"\\f188\";}\n\
.fa-vk:before {content: \"\\f189\";}\n\
.fa-weibo:before {content: \"\\f18a\";}\n\
.fa-renren:before {content: \"\\f18b\";}\n\
.fa-pagelines:before {content: \"\\f18c\";}\n\
.fa-stack-exchange:before {content: \"\\f18d\";}\n\
.fa-arrow-circle-o-right:before {content: \"\\f18e\";}\n\
.fa-arrow-circle-o-left:before {content: \"\\f190\";}\n\
.fa-toggle-left:before, .fa-caret-square-o-left:before {content: \"\\f191\";}\n\
.fa-dot-circle-o:before {content: \"\\f192\";}\n\
.fa-wheelchair:before {content: \"\\f193\";}\n\
.fa-vimeo-square:before {content: \"\\f194\";}\n\
.fa-turkish-lira:before, .fa-try:before {content: \"\\f195\";}\n\
.fa-plus-square-o:before {content: \"\\f196\";}\n\
.fa-space-shuttle:before {content: \"\\f197\";}\n\
.fa-slack:before {content: \"\\f198\";}\n\
.fa-envelope-square:before {content: \"\\f199\";}\n\
.fa-wordpress:before {content: \"\\f19a\";}\n\
.fa-openid:before {content: \"\\f19b\";}\n\
.fa-institution:before, .fa-bank:before, .fa-university:before {content: \"\\f19c\";}\n\
.fa-mortar-board:before, .fa-graduation-cap:before {content: \"\\f19d\";}\n\
.fa-yahoo:before {content: \"\\f19e\";}\n\
.fa-google:before {content: \"\\f1a0\";}\n\
.fa-reddit:before {content: \"\\f1a1\";}\n\
.fa-reddit-square:before {content: \"\\f1a2\";}\n\
.fa-stumbleupon-circle:before {content: \"\\f1a3\";}\n\
.fa-stumbleupon:before {content: \"\\f1a4\";}\n\
.fa-delicious:before {content: \"\\f1a5\";}\n\
.fa-digg:before {content: \"\\f1a6\";}\n\
.fa-pied-piper-pp:before {content: \"\\f1a7\";}\n\
.fa-pied-piper-alt:before {content: \"\\f1a8\";}\n\
.fa-drupal:before {content: \"\\f1a9\";}\n\
.fa-joomla:before {content: \"\\f1aa\";}\n\
.fa-language:before {content: \"\\f1ab\";}\n\
.fa-fax:before {content: \"\\f1ac\";}\n\
.fa-building:before {content: \"\\f1ad\";}\n\
.fa-child:before {content: \"\\f1ae\";}\n\
.fa-paw:before {content: \"\\f1b0\";}\n\
.fa-spoon:before {content: \"\\f1b1\";}\n\
.fa-cube:before {content: \"\\f1b2\";}\n\
.fa-cubes:before {content: \"\\f1b3\";}\n\
.fa-behance:before {content: \"\\f1b4\";}\n\
.fa-behance-square:before {content: \"\\f1b5\";}\n\
.fa-steam:before {content: \"\\f1b6\";}\n\
.fa-steam-square:before {content: \"\\f1b7\";}\n\
.fa-recycle:before {content: \"\\f1b8\";}\n\
.fa-automobile:before, .fa-car:before {content: \"\\f1b9\";}\n\
.fa-cab:before, .fa-taxi:before {content: \"\\f1ba\";}\n\
.fa-tree:before {content: \"\\f1bb\";}\n\
.fa-spotify:before {content: \"\\f1bc\";}\n\
.fa-deviantart:before {content: \"\\f1bd\";}\n\
.fa-soundcloud:before {content: \"\\f1be\";}\n\
.fa-database:before {content: \"\\f1c0\";}\n\
.fa-file-pdf-o:before {content: \"\\f1c1\";}\n\
.fa-file-word-o:before {content: \"\\f1c2\";}\n\
.fa-file-excel-o:before {content: \"\\f1c3\";}\n\
.fa-file-powerpoint-o:before {content: \"\\f1c4\";}\n\
.fa-file-photo-o:before, .fa-file-picture-o:before, .fa-file-image-o:before {content: \"\\f1c5\";}\n\
.fa-file-zip-o:before, .fa-file-archive-o:before {content: \"\\f1c6\";}\n\
.fa-file-sound-o:before, .fa-file-audio-o:before {content: \"\\f1c7\";}\n\
.fa-file-movie-o:before, .fa-file-video-o:before {content: \"\\f1c8\";}\n\
.fa-file-code-o:before {content: \"\\f1c9\";}\n\
.fa-vine:before {content: \"\\f1ca\";}\n\
.fa-codepen:before {content: \"\\f1cb\";}\n\
.fa-jsfiddle:before {content: \"\\f1cc\";}\n\
.fa-life-bouy:before, .fa-life-buoy:before, .fa-life-saver:before, .fa-support:before, .fa-life-ring:before {content: \"\\f1cd\";}\n\
.fa-circle-o-notch:before {content: \"\\f1ce\";}\n\
.fa-ra:before, .fa-resistance:before, .fa-rebel:before {content: \"\\f1d0\";}\n\
.fa-ge:before, .fa-empire:before {content: \"\\f1d1\";}\n\
.fa-git-square:before {content: \"\\f1d2\";}\n\
.fa-git:before {content: \"\\f1d3\";}\n\
.fa-y-combinator-square:before, .fa-yc-square:before, .fa-hacker-news:before {content: \"\\f1d4\";}\n\
.fa-tencent-weibo:before {content: \"\\f1d5\";}\n\
.fa-qq:before {content: \"\\f1d6\";}\n\
.fa-wechat:before, .fa-weixin:before {content: \"\\f1d7\";}\n\
.fa-send:before, .fa-paper-plane:before {content: \"\\f1d8\";}\n\
.fa-send-o:before, .fa-paper-plane-o:before {content: \"\\f1d9\";}\n\
.fa-history:before {content: \"\\f1da\";}\n\
.fa-circle-thin:before {content: \"\\f1db\";}\n\
.fa-header:before {content: \"\\f1dc\";}\n\
.fa-paragraph:before {content: \"\\f1dd\";}\n\
.fa-sliders:before {content: \"\\f1de\";}\n\
.fa-share-alt:before {content: \"\\f1e0\";}\n\
.fa-share-alt-square:before {content: \"\\f1e1\";}\n\
.fa-bomb:before {content: \"\\f1e2\";}\n\
.fa-soccer-ball-o:before, .fa-futbol-o:before {content: \"\\f1e3\";}\n\
.fa-tty:before {content: \"\\f1e4\";}\n\
.fa-binoculars:before {content: \"\\f1e5\";}\n\
.fa-plug:before {content: \"\\f1e6\";}\n\
.fa-slideshare:before {content: \"\\f1e7\";}\n\
.fa-twitch:before {content: \"\\f1e8\";}\n\
.fa-yelp:before {content: \"\\f1e9\";}\n\
.fa-newspaper-o:before {content: \"\\f1ea\";}\n\
.fa-wifi:before {content: \"\\f1eb\";}\n\
.fa-calculator:before {content: \"\\f1ec\";}\n\
.fa-paypal:before {content: \"\\f1ed\";}\n\
.fa-google-wallet:before {content: \"\\f1ee\";}\n\
.fa-cc-visa:before {content: \"\\f1f0\";}\n\
.fa-cc-mastercard:before {content: \"\\f1f1\";}\n\
.fa-cc-discover:before {content: \"\\f1f2\";}\n\
.fa-cc-amex:before {content: \"\\f1f3\";}\n\
.fa-cc-paypal:before {content: \"\\f1f4\";}\n\
.fa-cc-stripe:before {content: \"\\f1f5\";}\n\
.fa-bell-slash:before {content: \"\\f1f6\";}\n\
.fa-bell-slash-o:before {content: \"\\f1f7\";}\n\
.fa-trash:before {content: \"\\f1f8\";}\n\
.fa-copyright:before {content: \"\\f1f9\";}\n\
.fa-at:before {content: \"\\f1fa\";}\n\
.fa-eyedropper:before {content: \"\\f1fb\";}\n\
.fa-paint-brush:before {content: \"\\f1fc\";}\n\
.fa-birthday-cake:before {content: \"\\f1fd\";}\n\
.fa-area-chart:before {content: \"\\f1fe\";}\n\
.fa-pie-chart:before {content: \"\\f200\";}\n\
.fa-line-chart:before {content: \"\\f201\";}\n\
.fa-lastfm:before {content: \"\\f202\";}\n\
.fa-lastfm-square:before {content: \"\\f203\";}\n\
.fa-toggle-off:before {content: \"\\f204\";}\n\
.fa-toggle-on:before {content: \"\\f205\";}\n\
.fa-bicycle:before {content: \"\\f206\";}\n\
.fa-bus:before {content: \"\\f207\";}\n\
.fa-ioxhost:before {content: \"\\f208\";}\n\
.fa-angellist:before {content: \"\\f209\";}\n\
.fa-cc:before {content: \"\\f20a\";}\n\
.fa-shekel:before, .fa-sheqel:before, .fa-ils:before {content: \"\\f20b\";}\n\
.fa-meanpath:before {content: \"\\f20c\";}\n\
.fa-buysellads:before {content: \"\\f20d\";}\n\
.fa-connectdevelop:before {content: \"\\f20e\";}\n\
.fa-dashcube:before {content: \"\\f210\";}\n\
.fa-forumbee:before {content: \"\\f211\";}\n\
.fa-leanpub:before {content: \"\\f212\";}\n\
.fa-sellsy:before {content: \"\\f213\";}\n\
.fa-shirtsinbulk:before {content: \"\\f214\";}\n\
.fa-simplybuilt:before {content: \"\\f215\";}\n\
.fa-skyatlas:before {content: \"\\f216\";}\n\
.fa-cart-plus:before {content: \"\\f217\";}\n\
.fa-cart-arrow-down:before {content: \"\\f218\";}\n\
.fa-diamond:before {content: \"\\f219\";}\n\
.fa-ship:before {content: \"\\f21a\";}\n\
.fa-user-secret:before {content: \"\\f21b\";}\n\
.fa-motorcycle:before {content: \"\\f21c\";}\n\
.fa-street-view:before {content: \"\\f21d\";}\n\
.fa-heartbeat:before {content: \"\\f21e\";}\n\
.fa-venus:before {content: \"\\f221\";}\n\
.fa-mars:before {content: \"\\f222\";}\n\
.fa-mercury:before {content: \"\\f223\";}\n\
.fa-intersex:before, .fa-transgender:before {content: \"\\f224\";}\n\
.fa-transgender-alt:before {content: \"\\f225\";}\n\
.fa-venus-double:before {content: \"\\f226\";}\n\
.fa-mars-double:before {content: \"\\f227\";}\n\
.fa-venus-mars:before {content: \"\\f228\";}\n\
.fa-mars-stroke:before {content: \"\\f229\";}\n\
.fa-mars-stroke-v:before {content: \"\\f22a\";}\n\
.fa-mars-stroke-h:before {content: \"\\f22b\";}\n\
.fa-neuter:before {content: \"\\f22c\";}\n\
.fa-genderless:before {content: \"\\f22d\";}\n\
.fa-facebook-official:before {content: \"\\f230\";}\n\
.fa-pinterest-p:before {content: \"\\f231\";}\n\
.fa-whatsapp:before {content: \"\\f232\";}\n\
.fa-server:before {content: \"\\f233\";}\n\
.fa-user-plus:before {content: \"\\f234\";}\n\
.fa-user-times:before {content: \"\\f235\";}\n\
.fa-hotel:before, .fa-bed:before {content: \"\\f236\";}\n\
.fa-viacoin:before {content: \"\\f237\";}\n\
.fa-train:before {content: \"\\f238\";}\n\
.fa-subway:before {content: \"\\f239\";}\n\
.fa-medium:before {content: \"\\f23a\";}\n\
.fa-yc:before, .fa-y-combinator:before {content: \"\\f23b\";}\n\
.fa-optin-monster:before {content: \"\\f23c\";}\n\
.fa-opencart:before {content: \"\\f23d\";}\n\
.fa-expeditedssl:before {content: \"\\f23e\";}\n\
.fa-battery-4:before, .fa-battery-full:before {content: \"\\f240\";}\n\
.fa-battery-3:before, .fa-battery-three-quarters:before {content: \"\\f241\";}\n\
.fa-battery-2:before, .fa-battery-half:before {content: \"\\f242\";}\n\
.fa-battery-1:before, .fa-battery-quarter:before {content: \"\\f243\";}\n\
.fa-battery-0:before, .fa-battery-empty:before {content: \"\\f244\";}\n\
.fa-mouse-pointer:before {content: \"\\f245\";}\n\
.fa-i-cursor:before {content: \"\\f246\";}\n\
.fa-object-group:before {content: \"\\f247\";}\n\
.fa-object-ungroup:before {content: \"\\f248\";}\n\
.fa-sticky-note:before {content: \"\\f249\";}\n\
.fa-sticky-note-o:before {content: \"\\f24a\";}\n\
.fa-cc-jcb:before {content: \"\\f24b\";}\n\
.fa-cc-diners-club:before {content: \"\\f24c\";}\n\
.fa-clone:before {content: \"\\f24d\";}\n\
.fa-balance-scale:before {content: \"\\f24e\";}\n\
.fa-hourglass-o:before {content: \"\\f250\";}\n\
.fa-hourglass-1:before, .fa-hourglass-start:before {content: \"\\f251\";}\n\
.fa-hourglass-2:before, .fa-hourglass-half:before {content: \"\\f252\";}\n\
.fa-hourglass-3:before, .fa-hourglass-end:before {content: \"\\f253\";}\n\
.fa-hourglass:before {content: \"\\f254\";}\n\
.fa-hand-grab-o:before, .fa-hand-rock-o:before {content: \"\\f255\";}\n\
.fa-hand-stop-o:before, .fa-hand-paper-o:before {content: \"\\f256\";}\n\
.fa-hand-scissors-o:before {content: \"\\f257\";}\n\
.fa-hand-lizard-o:before {content: \"\\f258\";}\n\
.fa-hand-spock-o:before {content: \"\\f259\";}\n\
.fa-hand-pointer-o:before {content: \"\\f25a\";}\n\
.fa-hand-peace-o:before {content: \"\\f25b\";}\n\
.fa-trademark:before {content: \"\\f25c\";}\n\
.fa-registered:before {content: \"\\f25d\";}\n\
.fa-creative-commons:before {content: \"\\f25e\";}\n\
.fa-gg:before {content: \"\\f260\";}\n\
.fa-gg-circle:before {content: \"\\f261\";}\n\
.fa-tripadvisor:before {content: \"\\f262\";}\n\
.fa-odnoklassniki:before {content: \"\\f263\";}\n\
.fa-odnoklassniki-square:before {content: \"\\f264\";}\n\
.fa-get-pocket:before {content: \"\\f265\";}\n\
.fa-wikipedia-w:before {content: \"\\f266\";}\n\
.fa-safari:before {content: \"\\f267\";}\n\
.fa-chrome:before {content: \"\\f268\";}\n\
.fa-firefox:before {content: \"\\f269\";}\n\
.fa-opera:before {content: \"\\f26a\";}\n\
.fa-internet-explorer:before {content: \"\\f26b\";}\n\
.fa-tv:before, .fa-television:before {content: \"\\f26c\";}\n\
.fa-contao:before {content: \"\\f26d\";}\n\
.fa-500px:before {content: \"\\f26e\";}\n\
.fa-amazon:before {content: \"\\f270\";}\n\
.fa-calendar-plus-o:before {content: \"\\f271\";}\n\
.fa-calendar-minus-o:before {content: \"\\f272\";}\n\
.fa-calendar-times-o:before {content: \"\\f273\";}\n\
.fa-calendar-check-o:before {content: \"\\f274\";}\n\
.fa-industry:before {content: \"\\f275\";}\n\
.fa-map-pin:before {content: \"\\f276\";}\n\
.fa-map-signs:before {content: \"\\f277\";}\n\
.fa-map-o:before {content: \"\\f278\";}\n\
.fa-map:before {content: \"\\f279\";}\n\
.fa-commenting:before {content: \"\\f27a\";}\n\
.fa-commenting-o:before {content: \"\\f27b\";}\n\
.fa-houzz:before {content: \"\\f27c\";}\n\
.fa-vimeo:before {content: \"\\f27d\";}\n\
.fa-black-tie:before {content: \"\\f27e\";}\n\
.fa-fonticons:before {content: \"\\f280\";}\n\
.fa-reddit-alien:before {content: \"\\f281\";}\n\
.fa-edge:before {content: \"\\f282\";}\n\
.fa-credit-card-alt:before {content: \"\\f283\";}\n\
.fa-codiepie:before {content: \"\\f284\";}\n\
.fa-modx:before {content: \"\\f285\";}\n\
.fa-fort-awesome:before {content: \"\\f286\";}\n\
.fa-usb:before {content: \"\\f287\";}\n\
.fa-product-hunt:before {content: \"\\f288\";}\n\
.fa-mixcloud:before {content: \"\\f289\";}\n\
.fa-scribd:before {content: \"\\f28a\";}\n\
.fa-pause-circle:before {content: \"\\f28b\";}\n\
.fa-pause-circle-o:before {content: \"\\f28c\";}\n\
.fa-stop-circle:before {content: \"\\f28d\";}\n\
.fa-stop-circle-o:before {content: \"\\f28e\";}\n\
.fa-shopping-bag:before {content: \"\\f290\";}\n\
.fa-shopping-basket:before {content: \"\\f291\";}\n\
.fa-hashtag:before {content: \"\\f292\";}\n\
.fa-bluetooth:before {content: \"\\f293\";}\n\
.fa-bluetooth-b:before {content: \"\\f294\";}\n\
.fa-percent:before {content: \"\\f295\";}\n\
.fa-gitlab:before {content: \"\\f296\";}\n\
.fa-wpbeginner:before {content: \"\\f297\";}\n\
.fa-wpforms:before {content: \"\\f298\";}\n\
.fa-envira:before {content: \"\\f299\";}\n\
.fa-universal-access:before {content: \"\\f29a\";}\n\
.fa-wheelchair-alt:before {content: \"\\f29b\";}\n\
.fa-question-circle-o:before {content: \"\\f29c\";}\n\
.fa-blind:before {content: \"\\f29d\";}\n\
.fa-audio-description:before {content: \"\\f29e\";}\n\
.fa-volume-control-phone:before {content: \"\\f2a0\";}\n\
.fa-braille:before {content: \"\\f2a1\";}\n\
.fa-assistive-listening-systems:before {content: \"\\f2a2\";}\n\
.fa-asl-interpreting:before, .fa-american-sign-language-interpreting:before {content: \"\\f2a3\";}\n\
.fa-deafness:before, .fa-hard-of-hearing:before, .fa-deaf:before {content: \"\\f2a4\";}\n\
.fa-glide:before {content: \"\\f2a5\";}\n\
.fa-glide-g:before {content: \"\\f2a6\";}\n\
.fa-signing:before, .fa-sign-language:before {content: \"\\f2a7\";}\n\
.fa-low-vision:before {content: \"\\f2a8\";}\n\
.fa-viadeo:before {content: \"\\f2a9\";}\n\
.fa-viadeo-square:before {content: \"\\f2aa\";}\n\
.fa-snapchat:before {content: \"\\f2ab\";}\n\
.fa-snapchat-ghost:before {content: \"\\f2ac\";}\n\
.fa-snapchat-square:before {content: \"\\f2ad\";}\n\
.fa-pied-piper:before {content: \"\\f2ae\";}\n\
.fa-first-order:before {content: \"\\f2b0\";}\n\
.fa-yoast:before {content: \"\\f2b1\";}\n\
.fa-themeisle:before {content: \"\\f2b2\";}\n\
.fa-google-plus-circle:before, .fa-google-plus-official:before {content: \"\\f2b3\";}\n\
.fa-fa:before, .fa-font-awesome:before {content: \"\\f2b4\";}\n\
.fa::before {\n\
  font-family: FontAwesome;\n\
  font-weight: 400;\n\
  font-style: normal;\n\
  -webkit-font-smoothing: antialiased;\n\
  text-decoration: inherit;\n\
  speak: none;\n\
  display: inline-block;\n\
  font-size: 13px;\n\
  visibility: visible;\n\
}\n\
:root:not(.shortcut-icons) #shortcuts .fa::before {\n\
  display: none;\n\
}\n\
:root.shortcut-icons #shortcuts .fa::before {\n\
  font-size: 15px !important;\n\
  margin-top: -3px !important;\n\
  position: relative;\n\
  top: 1px;\n\
}\n\
:root.shortcut-icons #shortcuts .fa, .menu-button .fa {\n\
  font-size: 0;\n\
  visibility: hidden;\n\
}\n\
:root.shortcut-icons .shortcut.brackets-wrap::after,\n\
:root.shortcut-icons .shortcut.brackets-wrap::before {\n\
  display: none;\n\
}\n\
:root.shortcut-icons #shortcuts a .fa,\n\
.menu-button .fa,\n\
.hide-reply-button .fa,\n\
.hide-thread-button .fa {\n\
  display: inline;\n\
}\n\
.fa-spin::before {\n\
  -webkit-animation:spin 2s infinite linear;\n\
  -moz-animation:spin 2s infinite linear;\n\
  -o-animation:spin 2s infinite linear;\n\
  animation:spin 2s infinite linear;\n\
}\n\
@-moz-keyframes spin {\n\
  0% {-moz-transform:rotate(0deg);}\n\
  100% {-moz-transform:rotate(359deg);}\n\
}\n\
@-webkit-keyframes spin {\n\
  0% {-webkit-transform:rotate(0deg);}\n\
  100% {-webkit-transform:rotate(359deg);}\n\
}\n\
@keyframes spin {\n\
  0% {transform:rotate(0deg);}\n\
  100% {transform:rotate(359deg);}\n\
}\n\
/* General */\n\
.dialog {\n\
  border: 1px solid;\n\
  display: block;\n\
  background-color: inherit;\n\
}\n\
.dialog:not(#qr):not(#thread-watcher):not(#header-bar) {\n\
  box-shadow: 0 1px 2px rgba(0, 0, 0, .15);\n\
}\n\
#qr,\n\
#thread-watcher {\n\
  box-shadow: -1px 2px 2px rgba(0, 0, 0, 0.25);\n\
}\n\
.captcha-img,\n\
.field {\n\
  background-color: #FFF;\n\
  border: 1px solid #CCC;\n\
  -moz-box-sizing: border-box;\n\
  box-sizing: border-box;\n\
  color: #333;\n\
  font: 13px sans-serif;\n\
  outline: none;\n\
  transition: color .25s, border-color .25s;\n\
}\n\
.field::-moz-placeholder {\n\
  color: #AAA;\n\
  font-size: 13px;\n\
  opacity: 1;\n\
}\n\
.captch-img:hover,\n\
.field:hover {\n\
  border-color: #999;\n\
}\n\
.field:hover, .field:focus, .field.focus {\n\
  color: #000;\n\
}\n\
.field[disabled] {\n\
  background-color: #F2F2F2;\n\
  color: #888;\n\
}\n\
.field::-webkit-search-decoration {\n\
  display: none;\n\
}\n\
.move {\n\
  cursor: move;\n\
  overflow: hidden;\n\
}\n\
label {\n\
  cursor: pointer;\n\
}\n\
a[href=\"javascript:;\"] {\n\
  text-decoration: none;\n\
}\n\
.warning {\n\
  color: red;\n\
}\n\
#boardNavDesktop, #boardNavMobile {\n\
  display: none !important;\n\
}\n\
:root.hide-bottom-board-list #boardNavDesktopFoot {\n\
  display: none;\n\
}\n\
body.hasDropDownNav{\n\
  margin-top: 5px;\n\
}\n\
:root:not(.keyboard-focus) a {\n\
  outline: none;\n\
}\n\
.painted {\n\
  border-radius: 3px;\n\
  padding: 0px 2px;\n\
}\n\
/* 4chan style fixes */\n\
/* overrides 4chan CSS on div.opContainer, div.op */\n\
.opContainer.opContainer, .op.op {\n\
  display: block;\n\
  overflow: visible;\n\
}\n\
.reply > .file > .fileText {\n\
  margin: 0 20px;\n\
}\n\
.hashlink::before {\n\
  content: ' ';\n\
  visibility: hidden;\n\
}\n\
.inline + .hashlink,\n\
[hidden] {\n\
  display: none !important;\n\
}\n\
.fileText a {\n\
  unicode-bidi: -moz-isolate;\n\
  unicode-bidi: -webkit-isolate;\n\
}\n\
#g-recaptcha {\n\
  min-height: 78px;\n\
  height: auto;\n\
}\n\
:root:not(.js-enabled) #postForm {\n\
  display: table;\n\
}\n\
#captchaContainerAlt td:nth-child(2) {\n\
  display: table-cell !important;\n\
}\n\
canvas#tegaki-canvas {\n\
  background: none;\n\
}\n\
/* Disable obnoxious captcha fade-in. */\n\
body > div:last-of-type {\n\
  transition: none !important;\n\
}\n\
/* Fix captcha scrolling to top of page. */\n\
body > div[style*=\" top: -10000px;\"] {\n\
  visibility: hidden !important;\n\
}\n\
/* Make long filenames wrap properly: https://github.com/ccd0/4chan-x/issues/1082 */\n\
.post > .file {\n\
  /* currently nonstandard but may be added: https://lists.w3.org/Archives/Public/www-style/2016Mar/0352.html, https://bugzilla.mozilla.org/show_bug.cgi?id=1296042 */\n\
  word-break: break-word;\n\
}\n\
:root:not(.ua-webkit):not(.ua-blink) .fileText {\n\
  word-wrap: break-word;\n\
  max-width: calc(100vw - 90px);\n\
}\n\
body.is_catalog .thread > a > img {\n\
  display: inline-block;\n\
}\n\
/* Links to NSFW boards */\n\
.nwsb {\n\
  display: inline;\n\
}\n\
/* Ads */\n\
.ad-cnt > *, .adg-rects > *, .bsa-cnt {\n\
  height: auto !important;\n\
}\n\
:root:not(.ads-loaded) hr.abovePostForm,\n\
:root:not(.ads-loaded) .adg-rects > hr,\n\
#adg-ol + hr {\n\
  display: none;\n\
}\n\
.adg-rects {\n\
  margin: 0;\n\
  font-size: 0;\n\
}\n\
div.center[style] {\n\
  display: none !important;\n\
}\n\
/* Tinyboard / vichan conflicts */\n\
#menu > .hide-thread-link {\n\
  width: auto;\n\
  height: auto;\n\
  overflow: visible;\n\
  background-image: none;\n\
}\n\
#menu label.entry {\n\
  display: block;\n\
}\n\
#fourchanx-settings label {\n\
  display: inline;\n\
}\n\
.intro a[href=\"javascript:;\"],\n\
#menu a {\n\
  margin: 0;\n\
}\n\
/* Anti-autoplay */\n\
audio.controls-added {\n\
  display: block;\n\
  margin: auto;\n\
}\n\
:root.anti-autoplay div.embed {\n\
  position: static;\n\
  width: auto;\n\
  height: auto;\n\
  text-align: center;\n\
}\n\
:root.anti-autoplay .autoplay-removed {\n\
  visibility: visible !important;\n\
  min-width: 640px;\n\
  min-height: 360px;\n\
}\n\
/* fixed, z-index */\n\
#overlay,\n\
#fourchanx-settings,\n\
#qp, #ihover,\n\
#navlinks, .fixed #header-bar,\n\
:root.float #updater,\n\
:root.float #thread-stats,\n\
#qr {\n\
  position: fixed;\n\
}\n\
#fourchanx-settings {\n\
  z-index: 999;\n\
}\n\
#overlay {\n\
  z-index: 900;\n\
}\n\
#qp, #ihover {\n\
  z-index: 60;\n\
}\n\
#menu, .gal-buttons {\n\
  z-index: 50;\n\
}\n\
#updater, #thread-stats {\n\
  z-index: 40;\n\
}\n\
:root.fixed #header-bar, #notifications {\n\
  z-index: 35;\n\
}\n\
#a-gallery {\n\
  z-index: 30;\n\
}\n\
#navlinks {\n\
  z-index: 25;\n\
}\n\
#qr {\n\
  z-index: 20;\n\
}\n\
#embedding {\n\
  z-index: 11;\n\
}\n\
:root.fixed-watcher #thread-watcher {\n\
  z-index: 10;\n\
}\n\
:root.fixed:not(.gallery-open) #header-bar:not(:hover) {\n\
  z-index: 8;\n\
}\n\
#thread-watcher {\n\
  z-index: 5;\n\
}\n\
/* Header */\n\
.fixed.top-header body {\n\
  padding-top: 2em;\n\
}\n\
.fixed.bottom-header body {\n\
  padding-bottom: 2em;\n\
}\n\
.fixed #header-bar {\n\
  right: 0;\n\
  left: 0;\n\
  padding: 3px 4px 4px;\n\
  font-size: 12px;\n\
}\n\
.fixed.top-header #header-bar {\n\
  top: 0;\n\
}\n\
.fixed.bottom-header #header-bar {\n\
  bottom: 0;\n\
}\n\
#header-bar {\n\
  border-width: 0;\n\
  transition: all .1s .05s ease-in-out;\n\
}\n\
:root.fixed #header-bar {\n\
  box-shadow: -5px 1px 10px rgba(0, 0, 0, 0.20);\n\
}\n\
:root.centered-links #shortcuts {\n\
  width: 300px;\n\
  text-align: right;\n\
}\n\
:root.centered-links #header-bar {\n\
  text-align: center;\n\
}\n\
#custom-board-list {\n\
  font-size: 13px;\n\
  vertical-align: middle;\n\
}\n\
#full-board-list {\n\
  vertical-align: middle;\n\
}\n\
:root.centered-links #custom-board-list {\n\
  position: relative;\n\
  left: 150px;\n\
}\n\
.fixed.top-header #header-bar {\n\
  border-bottom-width: 1px;\n\
}\n\
.fixed.bottom-header #header-bar {\n\
  box-shadow: 0 -1px 2px rgba(0, 0, 0, .15);\n\
  border-top-width: 1px;\n\
}\n\
.fixed.bottom-header #header-bar .menu-button i {\n\
  border-top: none;\n\
  border-bottom: 6px solid;\n\
}\n\
.fixed #header-bar.autohide:not(:hover) {\n\
  box-shadow: none;\n\
  transition: all .8s .6s cubic-bezier(.55, .055, .675, .19);\n\
}\n\
.fixed.top-header #header-bar.autohide:not(:hover) {\n\
  margin-bottom: -1em;\n\
  -webkit-transform: translateY(-100%);\n\
  transform: translateY(-100%);\n\
}\n\
.fixed.bottom-header #header-bar.autohide:not(:hover) {\n\
  -webkit-transform: translateY(100%);\n\
  transform: translateY(100%);\n\
}\n\
#scroll-marker {\n\
  left: 0;\n\
  right: 0;\n\
  height: 10px;\n\
  position: absolute;\n\
}\n\
#header-bar:not(.autohide) #scroll-marker {\n\
  pointer-events: none;\n\
}\n\
#header-bar #scroll-marker {\n\
  display: none;\n\
}\n\
.fixed #header-bar #scroll-marker {\n\
  display: block;\n\
}\n\
.fixed.top-header #header-bar #scroll-marker {\n\
  top: 100%;\n\
}\n\
.fixed.bottom-header #header-bar #scroll-marker {\n\
  bottom: 100%;\n\
}\n\
#board-list a, #shortcuts a:not(.entry) {\n\
  text-decoration: none;\n\
  padding: 1px;\n\
}\n\
#shortcuts:empty {\n\
  display: none;\n\
}\n\
.brackets-wrap::before {\n\
  content: \"\\00a0[\";\n\
}\n\
.brackets-wrap::after {\n\
  content: \"]\\00a0\";\n\
}\n\
.dead-thread,\n\
.disabled:not(.replies-quoting-you) {\n\
  opacity: .45;\n\
}\n\
#shortcuts {\n\
  float: right;\n\
}\n\
:root.autohiding-scrollbar #shortcuts {\n\
  margin-right: 12px;\n\
}\n\
.shortcut {\n\
  margin-left: 3px;\n\
  vertical-align: middle;\n\
}\n\
:root.shortcut-icons .native-settings {\n\
  font-size: 0;\n\
  color: transparent;\n\
  display: inline-block;\n\
  vertical-align: top;\n\
  height: 12px;\n\
  width: 14px;\n\
  background: url('//s.4cdn.org/image/favicon.ico') 0px -1px no-repeat;\n\
}\n\
#navbotright,\n\
#navtopright {\n\
  display: none;\n\
}\n\
#toggleMsgBtn {\n\
  display: none !important;\n\
}\n\
.current {\n\
  font-weight: bold;\n\
}\n\
@media (min-width: 1300px) {\n\
  :root.fixed:not(.centered-links) #header-bar {\n\
    white-space: nowrap;\n\
    display: -webkit-flex;\n\
    display: flex;\n\
    -webkit-align-items: center;\n\
    align-items: center;\n\
  }\n\
  :root.fixed:not(.centered-links) #board-list {\n\
    -webkit-flex: auto;\n\
    flex: auto;\n\
  }\n\
  :root.fixed:not(.centered-links) #full-board-list {\n\
    display: -webkit-flex;\n\
    display: flex;\n\
  }\n\
  :root.fixed:not(.centered-links) .hide-board-list-container {\n\
    -webkit-flex: none;\n\
    flex: none;\n\
    margin-right: 5px;\n\
  }\n\
  :root.fixed:not(.centered-links) #full-board-list > .boardList {\n\
    -webkit-flex: auto;\n\
    flex: auto;\n\
    display: -webkit-flex;\n\
    display: flex;\n\
    width: 0px; /* XXX Fixes Edge not shrinking the board list below default size when needed */\n\
  }\n\
  :root.fixed:not(.centered-links) #full-board-list > .boardList > a,\n\
  :root.fixed:not(.centered-links) #full-board-list > .boardList > span:not(.space):not(.spacer) {\n\
    -webkit-flex: none;\n\
    flex: none;\n\
    padding: .17em;\n\
    margin: -.17em -.32em;\n\
  }\n\
  :root.fixed:not(.centered-links) #full-board-list > .boardList > span {\n\
    pointer-events: none;\n\
  }\n\
  :root.fixed:not(.centered-links) #full-board-list > .boardList > span.space {\n\
    -webkit-flex: 0 .63 .63em;\n\
    flex: 0 .63 .63em;\n\
  }\n\
  :root.fixed:not(.centered-links) #full-board-list > .boardList > span.spacer {\n\
    -webkit-flex: 0 .38 .38em;\n\
    flex: 0 .38 .38em;\n\
  }\n\
  :root.fixed:not(.centered-links) #shortcuts {\n\
    float: initial;\n\
    -webkit-flex: none;\n\
    flex: none;\n\
    display: -webkit-flex;\n\
    display: flex;\n\
    -webkit-align-items: center;\n\
    align-items: center;\n\
  }\n\
}\n\
/* 4chan X link brackets */\n\
.brackets-wrap::before {\n\
  content: \"[\";\n\
}\n\
.brackets-wrap::after {\n\
  content: \"]\";\n\
}\n\
/* Notifications */\n\
#notifications {\n\
  position: fixed;\n\
  top: 0;\n\
  height: 0;\n\
  text-align: center;\n\
  right: 0;\n\
  left: 0;\n\
  visibility: visible;\n\
}\n\
:root.fixed.top-header:not(.gallery-open) #header-bar #notifications,\n\
:root.fixed.top-header #header-bar.autohide #notifications {\n\
  position: absolute;\n\
  top: 100%;\n\
}\n\
.notification {\n\
  color: #FFF;\n\
  font-weight: 700;\n\
  text-shadow: 0 1px 2px rgba(0, 0, 0, .5);\n\
  box-shadow: 0 1px 2px rgba(0, 0, 0, .15);\n\
  border-radius: 2px;\n\
  margin: 1px auto;\n\
  width: 550px;\n\
  max-width: 100%;\n\
  position: relative;\n\
  transition: all .25s ease-in-out;\n\
}\n\
.notification.error {\n\
  background-color: hsla(0, 100%, 38%, .9);\n\
}\n\
.notification.warning {\n\
  background-color: hsla(36, 100%, 38%, .9);\n\
}\n\
.notification.info {\n\
  background-color: hsla(200, 100%, 38%, .9);\n\
}\n\
.notification.success {\n\
  background-color: hsla(104, 100%, 38%, .9);\n\
}\n\
.notification a {\n\
  color: white;\n\
}\n\
.notification > .close {\n\
  padding: 7px;\n\
  top: 0px;\n\
  right: 5px;\n\
  position: absolute;\n\
}\n\
.notification > .fa-times::before {\n\
  font-size: 11px !important;\n\
}\n\
.message {\n\
  -moz-box-sizing: border-box;\n\
  box-sizing: border-box;\n\
  padding: 6px 20px;\n\
  max-height: 200px;\n\
  width: 100%;\n\
  overflow: auto;\n\
  white-space: pre-line;\n\
}\n\
.message a {\n\
  text-decoration: underline;\n\
}\n\
:root.tainted .report-error {\n\
  display: none;\n\
}\n\
/* Settings */\n\
:root.fourchan-x body {\n\
  -moz-box-sizing: border-box;\n\
  box-sizing: border-box;\n\
}\n\
#overlay {\n\
  background-color: rgba(0, 0, 0, .5);\n\
  top: 0;\n\
  left: 0;\n\
  height: 100%;\n\
  width: 100%;\n\
}\n\
#fourchanx-settings {\n\
  -moz-box-sizing: border-box;\n\
  box-sizing: border-box;\n\
  box-shadow: 0 0 15px rgba(0, 0, 0, .15);\n\
  height: 600px;\n\
  max-height: 100%;\n\
  width: 900px;\n\
  max-width: 100%;\n\
  margin: auto;\n\
  padding: 3px;\n\
  top: 50%;\n\
  left: 50%;\n\
  -moz-transform: translate(-50%, -50%);\n\
  -webkit-transform: translate(-50%, -50%);\n\
  transform: translate(-50%, -50%);\n\
}\n\
#fourchanx-settings > nav {\n\
  padding: 2px 2px 0;\n\
  height: 15px;\n\
}\n\
#fourchanx-settings > nav a {\n\
  text-decoration: underline;\n\
}\n\
#fourchanx-settings > nav a.close {\n\
  text-decoration: none;\n\
  padding: 0 2px;\n\
  margin: 0;\n\
}\n\
.section-container {\n\
  overflow: auto;\n\
  position: absolute;\n\
  top: 2.1em;\n\
  right: 5px;\n\
  bottom: 5px;\n\
  left: 5px;\n\
  padding-right: 5px;\n\
}\n\
.sections-list {\n\
  padding: 0 3px;\n\
  float: left;\n\
}\n\
.credits {\n\
  float: right;\n\
}\n\
.export, .import, .reset {\n\
  cursor: pointer;\n\
  text-decoration: none !important;\n\
}\n\
.tab-selected {\n\
  font-weight: 700;\n\
}\n\
.section-sauce ul,\n\
.section-advanced ul {\n\
  list-style: none;\n\
  margin: 0;\n\
}\n\
.section-sauce ul {\n\
  padding: 8px;\n\
}\n\
.section-advanced ul {\n\
  padding: 0px;\n\
}\n\
.section-sauce li,\n\
.section-advanced li {\n\
  padding-left: 4px;\n\
}\n\
.section-main ul {\n\
  margin: 0;\n\
  padding: 0 0 0 16px;\n\
}\n\
.section-main li {\n\
  white-space: pre-line;\n\
  list-style: disc;\n\
}\n\
.section-main li:not(:first-of-type) {\n\
  margin-top: 4px;\n\
}\n\
.section-main label {\n\
  text-decoration: underline;\n\
}\n\
div[data-checked=\"false\"] > .suboption-list {\n\
  display: none;\n\
}\n\
.suboption-list {\n\
  position: relative;\n\
}\n\
.suboption-list::before {\n\
  content: \"\";\n\
  display: inline-block;\n\
  position: absolute;\n\
  left: .7em;\n\
  width: 0;\n\
  height: 100%;\n\
  border-left: 1px solid;\n\
}\n\
.suboption-list > div {\n\
  position: relative;\n\
  padding-left: 1.4em;\n\
}\n\
.suboption-list > div::before {\n\
  content: \"\";\n\
  display: inline-block;\n\
  position: absolute;\n\
  left: .7em;\n\
  width: .7em;\n\
  height: .6em;\n\
  border-left: 1px solid;\n\
  border-bottom: 1px solid;\n\
}\n\
#fourchanx-settings .section-main p {\n\
  margin: .5em 0 0;\n\
}\n\
.section-filter ul {\n\
  padding: 0;\n\
}\n\
.section-filter li {\n\
  margin: 10px 40px;\n\
  list-style: disc;\n\
}\n\
.section-filter textarea {\n\
  height: 500px;\n\
}\n\
.section-main a, .section-filter a, .section-advanced a {\n\
  text-decoration: underline;\n\
}\n\
#sauce-doc-expand:not(:checked) ~ #sauce-doc {\n\
  max-height: 130px;\n\
  overflow: auto;\n\
}\n\
#sauce-doc > label {\n\
  float: right;\n\
  margin: 0 5px;\n\
}\n\
/* XXX for OneeChan */\n\
#sauce-doc-expand + .riceCheck {\n\
  display: none;\n\
}\n\
.section-sauce textarea {\n\
  height: 430px;\n\
}\n\
.section-advanced .field[name=\"boardnav\"] {\n\
  width: 100%;\n\
}\n\
.section-advanced textarea {\n\
  height: 150px;\n\
}\n\
.section-advanced textarea[name=\"archiveLists\"] {\n\
  height: 75px;\n\
}\n\
.section-advanced .archive-cell {\n\
  min-width: 160px;\n\
  text-align: center;\n\
}\n\
.section-advanced #archive-board-select {\n\
  position: absolute;\n\
}\n\
.section-advanced .note {\n\
  font-size: 0.8em;\n\
  font-style: italic;\n\
  margin-left: 10px;\n\
}\n\
.section-advanced .note code {\n\
  font-style: normal;\n\
  font-size: 11px;\n\
}\n\
.favicon-preview > img {\n\
    vertical-align: middle;\n\
}\n\
.favicon-preview > img:nth-of-type(3n+1) {\n\
    margin-left: 4px;\n\
}\n\
.section-keybinds .field {\n\
  font-family: monospace;\n\
}\n\
#fourchanx-settings fieldset {\n\
  border: 1px solid;\n\
  border-radius: 3px;\n\
  padding: 0.35em 0.625em 0.75em;\n\
  margin: 0px 2px;\n\
}\n\
#fourchanx-settings legend {\n\
  font-weight: 700;\n\
  color: inherit;\n\
}\n\
#fourchanx-settings textarea {\n\
  font-family: monospace;\n\
  min-width: 100%;\n\
  max-width: 100%;\n\
}\n\
#fourchanx-settings code {\n\
  color: #000;\n\
  background-color: #FFF;\n\
  padding: 0 2px;\n\
}\n\
#fourchanx-settings th {\n\
  text-align: center;\n\
  font-weight: bold;\n\
}\n\
#fourchanx-settings p {\n\
  margin: 1em 0px;\n\
}\n\
#fourchanx-settings table {\n\
  margin: auto;\n\
}\n\
.unscroll {\n\
  overflow: hidden;\n\
}\n\
/* Index */\n\
:root.index-loading .navLinks:not(.json-index),\n\
:root.index-loading .board:not(.json-index),\n\
:root.index-loading .pagelist:not(.json-index),\n\
:root.infinite-mode .pagelist,\n\
:root.all-pages-mode .pagelist,\n\
:root.catalog-mode .pagelist,\n\
:root:not(.catalog-mode) .indexlink,\n\
:root.catalog-mode .cataloglink,\n\
:root:not(.catalog-mode) #hidden-label,\n\
:root:not(.catalog-mode) #index-size {\n\
  display: none;\n\
}\n\
#index-search {\n\
  padding-right: 1.5em;\n\
  width: 100px;\n\
  transition: color .25s, border-color .25s, width .25s;\n\
}\n\
#index-search:focus,\n\
#index-search[data-searching] {\n\
  width: 200px;\n\
}\n\
#index-search-clear {\n\
  color: gray;\n\
  display: inline-block;\n\
  position: relative;\n\
  left: -1em;\n\
  width: 0;\n\
}\n\
/* ``::-webkit-*'' selectors break selector lists on Firefox. */\n\
#index-search::-webkit-search-cancel-button {\n\
  display: none;\n\
}\n\
#index-search:not([data-searching]) + #index-search-clear {\n\
  display: none;\n\
}\n\
#index-options {\n\
  float: right;\n\
}\n\
#lastlong-options {\n\
  display: inline-block;\n\
  vertical-align: middle;\n\
  height: 28px;\n\
  margin: -14px 0;\n\
}\n\
#lastlong-options > input {\n\
  padding: 0;\n\
  border: 0 !important;\n\
  text-align: center;\n\
  background: transparent;\n\
  display: block;\n\
  font-size: 12px;\n\
  height: 12px;\n\
  width: 30px;\n\
  margin: 1px 0;\n\
}\n\
.summary {\n\
  text-decoration: none;\n\
}\n\
/* Catalog */\n\
:root.catalog-mode .board {\n\
  text-align: center;\n\
}\n\
.catalog-thread {\n\
  display: inline-block;\n\
  -moz-box-sizing: border-box;\n\
  box-sizing: border-box;\n\
  border: 1px solid transparent;\n\
  word-wrap: break-word;\n\
  vertical-align: top;\n\
  position: relative;\n\
}\n\
/* overrides 4chan CSS on div.thread */\n\
.catalog-thread.catalog-thread {\n\
  margin: 2px;\n\
}\n\
.catalog-small > .catalog-thread {\n\
  width: 165px;\n\
  height: 320px;\n\
}\n\
.catalog-large > .catalog-thread {\n\
  width: 270px;\n\
  height: 410px;\n\
}\n\
:root.catalog-hover-expand .catalog-thread:hover {\n\
  z-index: 1;\n\
}\n\
.catalog-container {\n\
  position: absolute;\n\
  top: -4px;\n\
  left: 0;\n\
  right: 0;\n\
  bottom: 0;\n\
}\n\
.catalog-container:not(:hover),\n\
:root:not(.catalog-hover-expand) .catalog-container {\n\
  overflow: hidden;\n\
}\n\
.catalog-post {\n\
  position: absolute;\n\
  top: 4px;\n\
  left: 0;\n\
  right: 0;\n\
  border: 1px solid transparent;\n\
  padding-top: 20px;\n\
}\n\
/* overrides inline CSS from Index.cb.hoverAdjust */\n\
:root:not(.catalog-hover-expand) .catalog-post {\n\
  left: 0 !important;\n\
  right: 0 !important;\n\
}\n\
/* overrides 4chan CSS on div.post */\n\
.catalog-post.catalog-post {\n\
  margin: -21px -1px -1px;\n\
  overflow: visible;\n\
}\n\
.catalog-thread.noFile > * > .catalog-post {\n\
  margin-top: -7px;\n\
  padding-top: 6px;\n\
}\n\
:root.catalog-hover-expand .catalog-container:hover > .catalog-post {\n\
  margin-left: -61px;\n\
  margin-right: -61px;\n\
}\n\
:root.catalog-hover-expand .catalog-container:hover > * > :not(.catalog-replies) {\n\
  padding-left: 2px;\n\
  padding-right: 2px;\n\
}\n\
.catalog-link {\n\
  display: block;\n\
  position: relative;\n\
}\n\
.catalog-thumb {\n\
  border-radius: 2px;\n\
  box-shadow: 0 0 5px rgba(0, 0, 0, .25);\n\
  vertical-align: top;\n\
}\n\
.catalog-thumb.spoiler-file {\n\
  width: 100px;\n\
  height: 100px;\n\
}\n\
.catalog-thumb.deleted-file {\n\
  width: 127px;\n\
  height: 13px;\n\
  padding: 20px 11px;\n\
}\n\
.catalog-thumb.no-file {\n\
  width: 77px;\n\
  height: 13px;\n\
  padding: 20px 36px;\n\
}\n\
.catalog-icons > img,\n\
.catalog-stats > .menu-button {\n\
  width: 1em;\n\
  height: 1em;\n\
  margin: 0;\n\
  vertical-align: text-top;\n\
  padding-left: 2px;\n\
}\n\
.catalog-stats > .menu-button {\n\
  font-weight: normal;\n\
}\n\
.catalog-stats > .menu-button > i::before {\n\
  line-height: 11px;\n\
}\n\
.catalog-stats {\n\
  font-size: 10px;\n\
  font-weight: 700;\n\
  padding-top: 2px;\n\
}\n\
.catalog-stats > [title] {\n\
  cursor: help;\n\
}\n\
.catalog-post > .postMessage {\n\
  margin: 0;\n\
  padding-bottom: .3em;\n\
}\n\
.catalog-container:not(:hover) > * > .file,\n\
.catalog-container:not(:hover) > * > .postInfo > :not(.subject),\n\
.catalog-container:not(:hover) > * > .catalog-replies,\n\
.catalog-container:not(:hover) .extra-linebreak,\n\
.catalog-container:not(:hover) .abbr,\n\
:root:not(.catalog-hover-expand) .catalog-container > * > .file,\n\
:root:not(.catalog-hover-expand) .catalog-container > * > .postInfo > :not(.subject),\n\
:root:not(.catalog-hover-expand) .catalog-container > * > .catalog-replies,\n\
:root:not(.catalog-hover-expand) .catalog-container .extra-linebreak,\n\
:root:not(.catalog-hover-expand) .catalog-container .abbr,\n\
.catalog-thread > .catalog-container > :not(.catalog-post),\n\
.catalog-post > .file > :not(.fileText),\n\
.catalog-post > * > .fileText > :not(:first-child),\n\
.catalog-post > .postInfo > :not(.subject):not(.nameBlock):not(.dateTime),\n\
.catalog-post > * > * > .posteruid,\n\
:root.bottom-backlinks .catalog-post > .container,\n\
.post:not(.catalog-post) > .catalog-link,\n\
.post:not(.catalog-post) > .catalog-stats,\n\
.post:not(.catalog-post) > .catalog-replies {\n\
  display: none;\n\
}\n\
.catalog-post > .file {\n\
  position: absolute;\n\
  left: 0;\n\
  right: 0;\n\
  top: 0;\n\
  min-height: 20px;\n\
  background-color: inherit;\n\
}\n\
.catalog-post > * > .fileText {\n\
  position: relative;\n\
  padding: 2px;\n\
  background-color: inherit;\n\
}\n\
.catalog-small .catalog-post > * .fileText {\n\
  font-size: 10px;\n\
}\n\
.catalog-post > * > .fileText:not(:hover) {\n\
  white-space: nowrap;\n\
  overflow: hidden;\n\
  text-overflow: ellipsis;\n\
}\n\
.catalog-post > * > .fileText:hover {\n\
  z-index: 1;\n\
}\n\
/* overrides 4chan CSS on div.post div.postInfo */\n\
.catalog-post > .postInfo.postInfo {\n\
  width: auto;\n\
}\n\
.catalog-post > * > .subject {\n\
  display: block;\n\
}\n\
.catalog-post > * > .dateTime {\n\
  display: inline-block;\n\
  font-style: italic;\n\
}\n\
:root.catalog-hover-expand .catalog-container:hover > * > * > .nameBlock,\n\
:root.catalog-hover-expand .catalog-container:hover > * > * > .dateTime,\n\
:root.catalog-hover-expand .catalog-container:hover > * > .postMessage:not(:empty) {\n\
  padding-top: .3em;\n\
}\n\
.catalog-post .extra-linebreak {\n\
  content: ''; /* makes this work in Blink/WebKit */\n\
  display: block;\n\
  margin-top: .3em;\n\
}\n\
.catalog-reply {\n\
  text-align: left;\n\
  white-space: nowrap;\n\
  border-top: 1px solid transparent;\n\
  display: -webkit-flex;\n\
  display: flex;\n\
  -webkit-flex-direction: row;\n\
  flex-direction: row;\n\
  -webkit-align-items: stretch;\n\
  align-items: stretch;\n\
}\n\
.catalog-reply > * {\n\
  padding: 3px;\n\
  overflow: hidden;\n\
  -webkit-flex: none;\n\
  flex: none;\n\
}\n\
.catalog-reply > span {\n\
  font-style: italic;\n\
  font-weight: bold;\n\
}\n\
.catalog-reply-excerpt {\n\
  -webkit-flex: 1 1 auto;\n\
  flex: 1 1 auto;\n\
}\n\
.catalog-post .prettyprinted {\n\
  max-width: 100%;\n\
  box-sizing: border-box;\n\
}\n\
.catalog-post .MathJax_Display {\n\
  text-align: center !important;\n\
}\n\
.catalog-container:not(:hover) .exif,\n\
:root:not(.catalog-hover-expand) .catalog-container .exif {\n\
  display: none !important;\n\
}\n\
.catalog-post > * > .exif {\n\
  border-collapse: collapse;\n\
}\n\
:root.catalog-hover-expand .catalog-container:hover .exif[style*=\"display: block;\"] {\n\
  display: inline-block !important;\n\
}\n\
.catalog-post > * > .exif,\n\
.catalog-post > * > .exif > tbody {\n\
  background-color: inherit;\n\
}\n\
.catalog-post > * > .exif,\n\
.catalog-post > * > .exif td {\n\
  min-width: 0;\n\
}\n\
.catalog-post > * > .exif td {\n\
  padding-top: 1px;\n\
}\n\
:root.hats-enabled .catalog-thread::after {\n\
  content: '';\n\
  pointer-events: none;\n\
  position: absolute;\n\
  background-size: contain;\n\
}\n\
:root.hats-enabled .catalog-small > .catalog-thread::after {\n\
  left: -8px;\n\
  top: -59px;\n\
  width: 96px;\n\
  height: 96px;\n\
}\n\
:root.hats-enabled:not(.werkTyme) .catalog-small > .catalog-thread:not(.noFile)::after {\n\
  left: calc(67px - .3px * var(--tn-w));\n\
}\n\
:root.hats-enabled .catalog-large > .catalog-thread::after {\n\
  left: -15px;\n\
  top: -98px;\n\
  width: 160px;\n\
  height: 160px;\n\
}\n\
:root.hats-enabled:not(.werkTyme) .catalog-large > .catalog-thread:not(.noFile)::after {\n\
  left: calc(110px - .5px * var(--tn-w));\n\
}\n\
/* Copy Text Link's textarea element */\n\
textarea.copy-text-element {\n\
  height: 0;\n\
  width: 0;\n\
  position: absolute;\n\
  top: -10000px;\n\
}\n\
/* Announcement Hiding */\n\
:root.hide-announcement #globalMessage {\n\
  display: none;\n\
}\n\
span.hide-announcement {\n\
  font-size: 11px;\n\
  position: relative;\n\
  bottom: 5px;\n\
}\n\
.globalMessage, h2, h3 {\n\
  color: inherit !important;\n\
  font-size: 13px;\n\
  font-weight: 100;\n\
}\n\
/* Unread */\n\
.unread-line {\n\
  margin: 0;\n\
  border-color: rgb(255,0,0);\n\
}\n\
.unread-mark-read {\n\
  float: right;\n\
  clear: both;\n\
  width: 100%;\n\
  text-align: right;\n\
}\n\
:not(.unread-thread) > .unread-mark-read {\n\
  display: none;\n\
}\n\
/* Thread Updater */\n\
#updater {\n\
  background: none;\n\
  border: none;\n\
  box-shadow: none;\n\
}\n\
#updater > .move {\n\
  position: absolute;\n\
  top: -5px;\n\
  bottom: -5px;\n\
  left: -5px;\n\
  right: -5px;\n\
  z-index: -1;\n\
}\n\
#updater > div:last-child {\n\
  text-align: center;\n\
}\n\
#updater input[type=\"number\"] {\n\
  width: 4em;\n\
}\n\
:root.float #updater {\n\
  padding: 0px 3px;\n\
}\n\
:root:not(.float).shortcut-icons #updater {\n\
  display: inline-block;\n\
  min-width: 12pt;\n\
  text-align: right;\n\
}\n\
.new {\n\
  color: limegreen;\n\
}\n\
#update-status:not(.empty) + #update-timer:not(.empty):not(.loading) {\n\
  margin-left: 5px;\n\
}\n\
#update-timer {\n\
  cursor: pointer;\n\
}\n\
/* Thread Watcher */\n\
#thread-watcher {\n\
  position: absolute;\n\
}\n\
#thread-watcher {\n\
  padding-bottom: 3px;\n\
  padding-left: 3px;\n\
  white-space: nowrap;\n\
  min-width: 146px;\n\
}\n\
#watched-threads {\n\
  overflow-x: hidden;\n\
  overflow-y: auto;\n\
}\n\
#thread-watcher .refresh {\n\
  padding: 0px 3px;\n\
}\n\
:root.fixed-watcher #thread-watcher {\n\
  position: fixed;\n\
}\n\
:root.fixed-watcher #watched-threads {\n\
  /* XXX https://code.google.com/p/chromium/issues/detail?id=168840, https://bugs.webkit.org/show_bug.cgi?id=94158 */\n\
  max-height: 85vh;\n\
  max-height: calc(100vh - 75px);\n\
}\n\
:root:not(.fixed-watcher) #watched-threads:not(:hover) {\n\
  max-height: 210px;\n\
  overflow-y: hidden;\n\
}\n\
#thread-watcher > .move {\n\
  padding-top: 3px;\n\
}\n\
#watched-threads > div {\n\
  padding-left: 3px;\n\
  padding-right: 3px;\n\
}\n\
#watched-threads .watcher-link {\n\
  max-width: 250px;\n\
  display: -webkit-inline-flex;\n\
  display: inline-flex;\n\
  -webkit-flex-direction: row;\n\
  flex-direction: row;\n\
}\n\
#watched-threads .watcher-unread {\n\
  -webkit-flex: 0 0 auto;\n\
  flex: 0 0 auto;\n\
}\n\
#watched-threads .watcher-unread::after {\n\
  content: \"\\00a0\";\n\
}\n\
#watched-threads .watcher-title {\n\
  overflow: hidden;\n\
  text-overflow: ellipsis;\n\
  -webkit-flex: 0 1 auto;\n\
  flex: 0 1 auto;\n\
}\n\
#thread-watcher a {\n\
  text-decoration: none;\n\
}\n\
#thread-watcher .move > .close {\n\
  position: absolute;\n\
  right: 0px;\n\
  top: 0px;\n\
  padding: 0px 4px;\n\
}\n\
.watch-thread-link {\n\
  padding-top: 18px;\n\
  width: 18px;\n\
  height: 0px;\n\
  display: inline-block;\n\
  background-repeat: no-repeat;\n\
  opacity: 0.2;\n\
  position: relative;\n\
  top: 1px;\n\
  background-image: url(\"data:image/svg+xml,<svg viewBox='0 0 26 26' preserveAspectRatio='true' xmlns='http://www.w3.org/2000/svg'><path fill='rgb(0,0,0)' d='M24.132,7.971c-2.203-2.205-5.916-2.098-8.25,0.235L15.5,8.588l-0.382-0.382c-2.334-2.333-6.047-2.44-8.25-0.235c-2.204,2.203-2.098,5.916,0.235,8.249l8.396,8.396l8.396-8.396C26.229,13.887,26.336,10.174,24.132,7.971z'/></svg>\");\n\
}\n\
.watch-thread-link.watched {\n\
  opacity: 1;\n\
}\n\
/* Thread Stats */\n\
#thread-stats {\n\
  background: none;\n\
  border: none;\n\
  box-shadow: none;\n\
}\n\
:root.float #thread-stats > .move > :not(#page-count) {\n\
  pointer-events: none;\n\
}\n\
:root.float #thread-stats {\n\
  padding: 0px 3px;\n\
}\n\
#page-count {\n\
  cursor: pointer;\n\
}\n\
/* Quote */\n\
#arc-list span.quote {\n\
  color: #789922;\n\
}\n\
:root.resurrect-quotes .deadlink {\n\
  text-decoration: none !important;\n\
}\n\
.catalog-post .qmark-ct {\n\
  display: none;\n\
}\n\
.backlink.deadlink:not(.forwardlink),\n\
.quotelink.deadlink:not(.forwardlink) {\n\
  text-decoration: underline !important;\n\
}\n\
:root:not(.catalog-mode) .inlined {\n\
  opacity: .5;\n\
}\n\
#qp input, .forwarded {\n\
  display: none;\n\
}\n\
.quotelink.forwardlink,\n\
.backlink.forwardlink {\n\
  text-decoration: none;\n\
  border-bottom: 1px dashed;\n\
}\n\
.filtered {\n\
  text-decoration: underline line-through;\n\
}\n\
:root.hide-backlinks .backlink.filtered,\n\
:root.hide-backlinks .backlink.filtered + .hashlink.filtered {\n\
  display: none;\n\
}\n\
.postNum + .container::before {\n\
  content: \" \";\n\
}\n\
:root.bottom-backlinks .container {\n\
  display: block;\n\
  clear: both;\n\
  margin: 0 4px;\n\
}\n\
:root.bottom-backlinks .backlink {\n\
  font-size: 90%;\n\
}\n\
.inline {\n\
  border: 1px solid;\n\
  display: table;\n\
  margin: 2px 0;\n\
}\n\
.container ~ .inline {\n\
  margin-left: 20px;\n\
}\n\
:root.catalog-mode .inline {\n\
  display: none;\n\
}\n\
.inline .post {\n\
  border: 0 !important;\n\
  background-color: transparent !important;\n\
  display: table !important;\n\
  margin: 0 !important;\n\
  padding: 1px 2px !important;\n\
}\n\
#qp > .opContainer::after {\n\
  content: '';\n\
  clear: both;\n\
  display: table;\n\
}\n\
#qp .post {\n\
  border: none;\n\
  margin: 0;\n\
  padding: 2px 2px 5px;\n\
}\n\
#qp img {\n\
  max-height: 80vh;\n\
  max-width: 50vw;\n\
}\n\
/* Quote Threading */\n\
.threadContainer {\n\
  margin-left: 20px;\n\
  border-left: 1px solid rgba(128,128,128,.3);\n\
}\n\
.threadOP {\n\
  clear: both;\n\
}\n\
/* File */\n\
.fileText-original,\n\
.fnswitch:hover > .fntrunc,\n\
.fnswitch:not(:hover) > .fnfull,\n\
.expanded-image > .post > .file > .fileThumb > video[data-md5],\n\
.expanded-image > .post > .file > .fileThumb > img[data-md5] {\n\
  display: none;\n\
}\n\
.full-image[data-full-i-d] {\n\
  display: none;\n\
  cursor: pointer;\n\
}\n\
.expanded-image > .post > .file > .fileThumb > .full-image {\n\
  display: inline;\n\
}\n\
.expanded-image {\n\
  clear: left;\n\
}\n\
.expanding {\n\
  opacity: .5;\n\
}\n\
:root.fit-height .full-image {\n\
  max-height: 100vh;\n\
}\n\
:root.fit-height.fixed .full-image {\n\
  /* XXX https://code.google.com/p/chromium/issues/detail?id=168840, https://bugs.webkit.org/show_bug.cgi?id=94158 */\n\
  max-height: 93vh;\n\
  max-height: calc(100vh - 35px);\n\
}\n\
:root.fit-width .full-image {\n\
  max-width: 100%;\n\
}\n\
:root.ua-gecko.fit-width .full-image {\n\
  width: 100%;\n\
}\n\
.fileThumb > .warning {\n\
  clear: both;\n\
}\n\
/* WEBM Metadata */\n\
.webm-title > a::before {\n\
  content: \"title\";\n\
  text-decoration: underline;\n\
}\n\
.webm-title.loading > a::after {\n\
  content: \"...\";\n\
}\n\
.webm-title.error > a:hover::before,\n\
.webm-title.error > a:focus::before {\n\
  content: \"error\";\n\
  text-decoration: none;\n\
}\n\
.webm-title > span {\n\
  cursor: text;\n\
}\n\
.webm-title.not-found > span::before {\n\
  content: \"not found\";\n\
}\n\
.webm-title:not(:hover):not(:focus) > span,\n\
.webm-title:hover > span + a,\n\
.webm-title:focus > span + a {\n\
  display: none;\n\
}\n\
/* Volume control */\n\
input[name=\"Default Volume\"] {\n\
  width: 4em;\n\
  height: 1ex;\n\
  vertical-align: middle;\n\
  margin: 0px;\n\
}\n\
/* Fappe and Werk Tyme */\n\
:root.fappeTyme .thread > .noFile,\n\
:root.fappeTyme .threadContainer > .noFile {\n\
  display: none;\n\
}\n\
:root.werkTyme .postContainer:not(.noFile) .fileThumb,\n\
:root.werkTyme .catalog-thumb:not(.deleted-file):not(.no-file),\n\
:root:not(.werkTyme) .werkTyme-filename {\n\
  display: none;\n\
}\n\
.werkTyme-filename {\n\
  font-weight: bold;\n\
  font-size: 110%;\n\
}\n\
:root.werkTyme .catalog-link {\n\
  box-shadow: 0 0 5px rgba(0, 0, 0, .25);\n\
  padding: 8px;\n\
  text-align: center;\n\
}\n\
:root.werkTyme .catalog-thumb {\n\
  box-shadow: none;\n\
  padding: 0;\n\
  vertical-align: middle;\n\
}\n\
.indicator {\n\
  background: rgba(255,0,0,0.8);\n\
  font-weight: bold;\n\
  display: inline-block;\n\
  min-width: 9px;\n\
  padding: 0px 2px;\n\
  margin: 0 1px;\n\
  text-align: center;\n\
  color: white;\n\
  border-radius: 2px;\n\
  cursor: pointer;\n\
}\n\
:root:not(.fappeTyme) #shortcut-fappe,\n\
:root:not(.werkTyme) #shortcut-werk {\n\
  display: none;\n\
}\n\
/* Index/Reply Navigation */\n\
#navlinks {\n\
  font-size: 16px;\n\
  top: 25px;\n\
  right: 10px;\n\
}\n\
:root.catalog-mode #navlinks {\n\
  display: none;\n\
}\n\
/* Highlighting */\n\
.qphl {\n\
  outline: 2px solid rgba(216, 94, 49, .8);\n\
}\n\
:root.highlight-you .quotesYou.opContainer,\n\
:root.highlight-you .quotesYou > .reply {\n\
  border-left: 3px solid rgba(221, 0, 0, .8);\n\
}\n\
:root.highlight-own .yourPost.opContainer,\n\
:root.highlight-own .yourPost > .reply {\n\
  border-left: 3px dashed rgba(221, 0, 0, .8);\n\
}\n\
.filter-highlight.opContainer,\n\
.filter-highlight > .reply {\n\
  box-shadow: inset 5px 0 rgba(221, 0, 0, .5);\n\
}\n\
:root.highlight-own .yourPost > div.sideArrows,\n\
:root.highlight-you .quotesYou > div.sideArrows,\n\
.filter-highlight > div.sideArrows {\n\
  color: rgba(221, 0, 0, .8);\n\
}\n\
:root.highlight-own .yourPost.opContainer::after,\n\
:root.highlight-you .quotesYou.opContainer::after,\n\
.filter-highlight.opContainer::after {\n\
  content: \"\";\n\
  display: block;\n\
  clear: both;\n\
}\n\
:root:not(.werkTyme) .catalog-thread.filter-highlight .catalog-thumb,\n\
:root.werkTyme .catalog-thread.filter-highlight:not(:hover),\n\
:root.werkTyme:not(.catalog-hover-expand) .catalog-thread.filter-highlight,\n\
:root.werkTyme.catalog-hover-expand .catalog-thread.filter-highlight > .catalog-container:hover > .catalog-post {\n\
  box-shadow: 0 0 3px 3px rgba(255, 0, 0, .5);\n\
}\n\
:root:not(.werkTyme) .catalog-thread.watched .catalog-thumb,\n\
:root:root.werkTyme .catalog-thread.watched:not(:hover),\n\
:root:root.werkTyme:not(.catalog-hover-expand) .catalog-thread.watched,\n\
:root.werkTyme.catalog-hover-expand .catalog-thread.watched > .catalog-container:hover > .catalog-post {\n\
  border: 2px solid rgba(255, 0, 0, .75);\n\
}\n\
/* Spoiler text */\n\
:root.reveal-spoilers s,\n\
:root.reveal-spoilers .spoiler,\n\
:root.reveal-spoilers s > a,\n\
:root.reveal-spoilers .spoiler > a {\n\
  color: white !important;\n\
}\n\
:root.reveal-spoilers .removed-spoiler::before {\n\
  content: \"[spoiler]\";\n\
}\n\
:root.reveal-spoilers .removed-spoiler::after {\n\
  content: \"[/spoiler]\";\n\
}\n\
/* Thread & Reply Hiding */\n\
.hide-thread-button,\n\
.hide-reply-button {\n\
  float: left;\n\
  margin-right: 4px;\n\
  padding: 2px;\n\
}\n\
.hide-thread-button:not(:hover),\n\
.hide-reply-button:not(:hover) {\n\
  opacity: 0.4;\n\
}\n\
.threadContainer .hide-reply-button {\n\
  margin-left: 2px !important;\n\
  position: relative;\n\
  left: 1px;\n\
}\n\
.hide-thread-button {\n\
  margin-top: -1px;\n\
  width: 11px;\n\
}\n\
.stub ~ * {\n\
  display: none !important;\n\
}\n\
.stub input {\n\
  display: inline-block;\n\
}\n\
.thread[hidden] + hr {\n\
  display: none;\n\
}\n\
:root.reply-hide div.sideArrows {\n\
  display: none;\n\
}\n\
:root.thread-hide .party-hat {\n\
  left: 19px;\n\
}\n\
/* Anonymize */\n\
:root.anonymize .name,\n\
:root.anonymize .post-author:not([class*=capcode]) {\n\
  font-size: 0;\n\
}\n\
:root.anonymize .postertrip,\n\
:root.anonymize .trip,\n\
:root.anonymize .n-pu {\n\
  display: none;\n\
}\n\
:root.anonymize .name::before,\n\
:root.anonymize .post-author:not([class*=capcode])::before {\n\
  content: \"Anonymous\";\n\
  font-size: 10pt;\n\
}\n\
:root.anonymize .flashListing .name::before,\n\
:root.anonymize .post-last > .post-author:not([class*=capcode])::before {\n\
  font-size: 9pt;\n\
}\n\
/* QR */\n\
:root.hide-original-post-form #togglePostFormLink,\n\
#qr.autohide:not(.focus):not(:hover):not(:active) > form,\n\
:root.thread-view #qr:not(.show-new-thread-option) select[data-name=\"thread\"],\n\
#file-n-submit:not(.has-file) #qr-filerm {\n\
  display: none;\n\
}\n\
:root.hide-original-post-form #postForm {\n\
  display: none !important;\n\
}\n\
#qr select,\n\
#qr-filename-container > a,\n\
.remove,\n\
.captcha-img {\n\
  cursor: pointer;\n\
}\n\
#qr {\n\
  position: fixed;\n\
  padding: 1px;\n\
  border: 1px solid transparent;\n\
  min-width: 300px;\n\
  border-radius: 3px 3px 0 0;\n\
}\n\
#qr > form {\n\
  /* XXX https://code.google.com/p/chromium/issues/detail?id=168840, https://bugs.webkit.org/show_bug.cgi?id=94158 */\n\
  max-height: 85vh;\n\
  max-height: calc(100vh - 75px);\n\
  overflow-y: auto;\n\
  overflow-x: hidden;\n\
}\n\
#qrtab {\n\
  border-radius: 3px 3px 0 0;\n\
}\n\
#qrtab {\n\
  margin-bottom: 1px;\n\
}\n\
#qr .close {\n\
  float: right;\n\
  padding: 0 3px;\n\
}\n\
.qr-link-container {\n\
  text-align: center;\n\
  margin: 16px 0;\n\
}\n\
.qr-link-container-bottom {\n\
  width: 200px;\n\
  position: absolute;\n\
  left: -100px;\n\
  margin-left: 50%;\n\
  text-align: center;\n\
}\n\
.qr-link {\n\
  border-radius: 3px;\n\
  padding: 6px 10px 5px;\n\
  font-weight: bold;\n\
  vertical-align: middle;\n\
  border-style: solid;\n\
  border-width: 1px;\n\
  font-size: 10pt;\n\
}\n\
.qr-link-container + #togglePostFormLink {\n\
  font-size: 10pt;\n\
  font-weight: normal;\n\
  margin: -8px 0 3.5px;\n\
}\n\
.persona {\n\
  width: 100%;\n\
  display: -webkit-flex;\n\
  display: flex;\n\
  -webkit-flex-direction: row;\n\
  flex-direction: row;\n\
}\n\
.persona .field {\n\
  -webkit-flex: 1;\n\
  flex: 1;\n\
  width: 0;\n\
}\n\
#qr.forced-anon input[data-name=\"name\"]:not(.force-show),\n\
#qr.forced-anon input[data-name=\"sub\"]:not(.force-show),\n\
#qr.reply-to-thread input[data-name=\"sub\"]:not(.force-show),\n\
body:not(.board_f) #qr select[name=\"filetag\"],\n\
#qr.reply-to-thread select[name=\"filetag\"],\n\
#qr:not(.has-sjis) #sjis-toggle,\n\
#qr:not(.has-math) #tex-preview-button,\n\
#qr.tex-preview .textarea > :not(#tex-preview),\n\
#qr:not(.tex-preview) #tex-preview {\n\
  display: none;\n\
}\n\
.persona button {\n\
  -webkit-flex: 0 0 23px;\n\
  flex: 0 0 23px;\n\
  -webkit-align-self: stretch;\n\
  align-self: stretch;\n\
  border: 1px solid #BBB;\n\
  padding: 0;\n\
  background: linear-gradient(to bottom, #F8F8F8, #DCDCDC) no-repeat;\n\
  color: #000;\n\
}\n\
#qr.sjis-preview #sjis-toggle, #qr.tex-preview #tex-preview-button {\n\
  background: #DCDCDC;\n\
}\n\
#sjis-toggle, #qr.sjis-preview textarea.field {\n\
  font-family: \"IPAMonaPGothic\",\"Mona\",\"MS PGothic\",monospace;\n\
  font-size: 16px;\n\
  line-height: 17px;\n\
}\n\
#tex-preview-button {\n\
  font-size: 10px;\n\
}\n\
#tex-preview {\n\
  white-space: pre-line;\n\
}\n\
#qr textarea.field {\n\
  height: 14.8em;\n\
  min-height: 9em;\n\
}\n\
#qr.has-captcha textarea.field {\n\
  height: 9em;\n\
}\n\
input.field.tripped:not(:hover):not(:focus) {\n\
  color: transparent !important;\n\
  text-shadow: none !important;\n\
}\n\
#qr textarea {\n\
  min-width: 300px;\n\
  resize: both;\n\
}\n\
.field {\n\
  -moz-box-sizing: border-box;\n\
  margin: 0px;\n\
  padding: 2px 4px 3px;\n\
}\n\
#qr label input[type=\"checkbox\"] {\n\
  position: relative;\n\
  top: 2px;\n\
}\n\
/* Recaptcha v2 */\n\
#qr .captcha-root {\n\
  position: relative;\n\
}\n\
#qr .captcha-container > div {\n\
  margin: auto;\n\
  width: 304px;\n\
}\n\
/* XXX scrollable with scroll bar hidden; prevents scroll on space press */\n\
:root.ua-blink #qr .captcha-container > div,\n\
:root.ua-edge #qr .captcha-container > div {\n\
  overflow: hidden;\n\
}\n\
:root.ua-blink #qr .captcha-container > div > div:first-of-type,\n\
:root.ua-edge #qr .captcha-container > div > div:first-of-type {\n\
  overflow-y: scroll;\n\
  overflow-x: hidden;\n\
  padding-right: 30px;\n\
  height: 99%;\n\
  width: 100%;\n\
}\n\
#qr .captcha-counter {\n\
  display: block;\n\
  width: 100%;\n\
  text-align: center;\n\
  pointer-events: none;\n\
}\n\
#qr.captcha-open .captcha-counter {\n\
  position: absolute;\n\
  bottom: 3px;\n\
}\n\
#qr .captcha-counter > a {\n\
  pointer-events: auto;\n\
  display: inline-block; /* XXX https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/8851747/ */\n\
}\n\
#qr:not(.captcha-open) .captcha-counter > a {\n\
  display: block;\n\
  width: 100%;\n\
}\n\
#qr.captcha-v2 #qr-captcha-iframe {\n\
  width: 302px;\n\
  height: 423px;\n\
  border: 0;\n\
  display: block;\n\
  margin: auto;\n\
}\n\
.goog-bubble-content {\n\
  max-width: 100vw;\n\
  max-height: 100vh;\n\
  overflow: auto;\n\
}\n\
.goog-bubble-content iframe {\n\
  position: static !important;\n\
}\n\
/* File Input, Submit Button, Oekaki */\n\
#file-n-submit, #qr .oekaki {\n\
  display: -webkit-flex;\n\
  display: flex;\n\
  -webkit-align-items: stretch;\n\
  align-items: stretch;\n\
  height: 25px;\n\
  margin-top: 1px;\n\
}\n\
#file-n-submit > input, #qr-draw-button {\n\
  background: linear-gradient(to bottom, #F8F8F8, #DCDCDC) no-repeat;\n\
  border: 1px solid #BBB;\n\
  border-radius: 2px;\n\
  height: 100%;\n\
}\n\
#qr-file-button, #qr-draw-button {\n\
  width: 15%;\n\
}\n\
#file-n-submit input[type=\"submit\"] {\n\
  width: 25%;\n\
}\n\
#qr-filename-container {\n\
  -webkit-flex: 1 1 auto;\n\
  flex: 1 1 auto;\n\
  width: 0;\n\
  display: -webkit-flex;\n\
  display: flex;\n\
  -webkit-align-items: center;\n\
  align-items: center;\n\
  position: relative;\n\
  padding: 1px;\n\
}\n\
input#qr-filename {\n\
  border: none !important;\n\
  background: none !important;\n\
  outline: none;\n\
}\n\
#qr-filename,\n\
.has-file #qr-no-file {\n\
  display: none;\n\
}\n\
#qr-no-file,\n\
.has-file #qr-filename {\n\
  -webkit-flex: 1 1 auto;\n\
  flex: 1 1 auto;\n\
  width: 0px; /* XXX Fixes filename not shrinking to allow space for buttons in Edge */\n\
  display: inline-block;\n\
  padding: 0;\n\
  padding-left: 3px;\n\
  overflow: hidden;\n\
  text-overflow: ellipsis;\n\
  white-space: nowrap;\n\
}\n\
#qr-no-file {\n\
  color: #AAA;\n\
}\n\
#qr .oekaki.has-file {\n\
  display: none;\n\
}\n\
#qr .oekaki > label {\n\
  -webkit-flex: 1 1 auto;\n\
  flex: 1 1 auto;\n\
  width: 0;\n\
  display: -webkit-flex;\n\
  display: flex;\n\
  -webkit-align-items: center;\n\
  align-items: center;\n\
  height: 100%;\n\
}\n\
#qr .oekaki > label > span {\n\
  margin: 0 3px;\n\
}\n\
#qr .oekaki > label > input {\n\
  -webkit-flex: 1 1 auto;\n\
  flex: 1 1 auto;\n\
  width: 0;\n\
  height: 100%;\n\
}\n\
#qr .oekaki-bg {\n\
  position: relative;\n\
  display: inline-block;\n\
  height: 100%;\n\
  width: 10%;\n\
  margin-left: 3px;\n\
}\n\
#qr .oekaki-bg > * {\n\
  position: absolute;\n\
  top: 0;\n\
  left: 0;\n\
  margin: 0;\n\
}\n\
#qr .oekaki-bg > :not([name=\"oekaki-bgcolor\"]) {\n\
  z-index: 1;\n\
}\n\
#qr [name=\"oekaki-bgcolor\"] {\n\
  height: 100%;\n\
  width: 100%;\n\
  border: none;\n\
  padding: 0;\n\
}\n\
#qr [name=\"oekaki-bg\"]:not(:checked) ~ [name=\"oekaki-bgcolor\"] {\n\
  visibility: hidden;\n\
}\n\
#qr input[type=\"file\"] {\n\
  visibility: hidden;\n\
  position: absolute;\n\
}\n\
/* Spoiler Checkbox, QR Icons */\n\
#qr-filename-container > label, #qr-filename-container > a {\n\
  -webkit-flex: none;\n\
  flex: none;\n\
  margin: 0;\n\
  margin-right: 3px;\n\
}\n\
#qr:not(.has-spoiler) #qr-spoiler-label,\n\
#file-n-submit:not(.has-file) #qr-spoiler-label,\n\
.has-file #paste-area,\n\
.has-file #url-button,\n\
#file-n-submit:not(.custom-cooldown) #custom-cooldown-button {\n\
  display: none;\n\
}\n\
#qr-filename-container > label {\n\
  position: relative;\n\
}\n\
#qr-filename-container input[type=\"checkbox\"] {\n\
  margin: 0;\n\
}\n\
.checkbox-letter {\n\
  font-size: 13px;\n\
  font-weight: bold;\n\
}\n\
#qr-filename-container label:not(:hover) > input[type=\"checkbox\"]:not(:focus):not(:checked),\n\
#qr-filename-container label:not(:hover) > input[type=\"checkbox\"]:not(:focus):not(:checked) ~ :not(.checkbox-letter),\n\
#qr-filename-container label:hover > .checkbox-letter,\n\
input[type=\"checkbox\"]:focus ~ .checkbox-letter,\n\
input[type=\"checkbox\"]:checked ~ .checkbox-letter {\n\
  /* not displayed but still focusable */\n\
  position: absolute;\n\
  opacity: 0;\n\
  pointer-events: none;\n\
}\n\
.checkbox-letter, #paste-area, #url-button, #custom-cooldown-button, #dump-button {\n\
  opacity: 0.6;\n\
}\n\
#paste-area {\n\
  font-size: 0;\n\
}\n\
#paste-area:focus {\n\
  opacity: 1;\n\
}\n\
#custom-cooldown-button.disabled {\n\
  opacity: 0.27;\n\
}\n\
/* Thread and Flash Tag Select */\n\
#qr select {\n\
  background: white;\n\
  border: 1px solid #CCC;\n\
}\n\
#qr select[data-name=\"thread\"] {\n\
  float: right;\n\
}\n\
#qr > form > select {\n\
  margin-top: 1px;\n\
}\n\
/* Dumping UI */\n\
.dump #dump-list-container {\n\
  display: block;\n\
}\n\
#dump-list-container {\n\
  display: none;\n\
  position: relative;\n\
  overflow-y: hidden;\n\
  margin-top: 1px;\n\
}\n\
#dump-list {\n\
  overflow-x: auto;\n\
  overflow-y: auto;\n\
  white-space: nowrap;\n\
  width: 248px;\n\
  max-height: 248px;\n\
  min-height: 90px;\n\
  max-width: 100%;\n\
  min-width: 100%;\n\
  display: -webkit-flex;\n\
  display: flex;\n\
  -webkit-flex-wrap: wrap;\n\
  flex-wrap: wrap;\n\
}\n\
#dump-list:hover {\n\
  overflow-x: auto;\n\
}\n\
.qr-preview {\n\
  -moz-box-sizing: border-box;\n\
  counter-increment: thumbnails;\n\
  cursor: move;\n\
  display: inline-block;\n\
  height: 90px;\n\
  width: 90px;\n\
  padding: 2px;\n\
  opacity: .5;\n\
  overflow: hidden;\n\
  position: relative;\n\
  text-shadow: 0 0 2px #000;\n\
  -webkit-transition: opacity .25s ease-in-out, -webkit-transform .25s ease-in-out;\n\
  transition: opacity .25s ease-in-out, transform .25s ease-in-out, -webkit-transform .25s ease-in-out;\n\
  vertical-align: top;\n\
  background-size: cover;\n\
  -webkit-flex: none;\n\
  flex: none;\n\
}\n\
.qr-preview:hover,\n\
.qr-preview:focus {\n\
  opacity: .9;\n\
}\n\
.qr-preview::before {\n\
  content: counter(thumbnails);\n\
  color: #fff;\n\
  position: absolute;\n\
  top: 3px;\n\
  right: 3px;\n\
  text-shadow: 0 0 3px #000, 0 0 8px #000;\n\
}\n\
.qr-preview#selected {\n\
  opacity: 1;\n\
}\n\
.qr-preview.drag {\n\
  box-shadow: 0 0 10px rgba(0,0,0,.5);\n\
  -webkit-transform: scale(.8);\n\
  transform: scale(.8);\n\
}\n\
.qr-preview.over {\n\
  border-color: #fff;\n\
  -webkit-transform: scale(1.1);\n\
  transform: scale(1.1);\n\
  opacity: 0.9;\n\
  z-index: 10;\n\
}\n\
.qr-preview > span {\n\
  color: #fff;\n\
}\n\
.remove {\n\
  background: none;\n\
  color: #e00;\n\
  padding: 1px;\n\
}\n\
a:only-of-type > .remove {\n\
  display: none;\n\
}\n\
.remove:hover::after {\n\
  content: \" Remove\";\n\
}\n\
.qr-preview:not(.has-file) label,\n\
#qr:not(.has-spoiler) .qr-preview-spoiler {\n\
  display: none;\n\
}\n\
.qr-preview > label {\n\
  background: rgba(0,0,0,.5);\n\
  color: #fff;\n\
  right: 0;\n\
  bottom: 0;\n\
  left: 0;\n\
  position: absolute;\n\
  text-align: center;\n\
}\n\
.qr-preview > label > input {\n\
  margin: 0;\n\
}\n\
#add-post {\n\
  cursor: pointer;\n\
  font-size: 2em;\n\
  position: absolute;\n\
  bottom: 20px;\n\
  right: 10px;\n\
  -moz-transform: translateY(-50%);\n\
}\n\
.textarea {\n\
  position: relative;\n\
  display: -webkit-flex;\n\
  display: flex;\n\
}\n\
#char-count {\n\
  color: #000;\n\
  background: hsla(0, 0%, 100%, .5);\n\
  font-size: 8pt;\n\
  position: absolute;\n\
  bottom: 1px;\n\
  right: 1px;\n\
  pointer-events: none;\n\
}\n\
#char-count.warning {\n\
  color: red;\n\
}\n\
/* Menu */\n\
.menu-button:not(.fa-bars) {\n\
  display: inline-block;\n\
  position: relative;\n\
  cursor: pointer;\n\
}\n\
#header-bar .menu-button i {\n\
  border-top:   6px solid;\n\
  border-right: 4px solid transparent;\n\
  border-left:  4px solid transparent;\n\
  display: inline-block;\n\
  margin: 2px;\n\
  vertical-align: middle;\n\
}\n\
.postInfo > .menu-button,\n\
#thread-watcher .menu-button {\n\
  width: 18px;\n\
  height: 15px;\n\
  text-align: center;\n\
}\n\
#menu {\n\
  position: fixed;\n\
  outline: none;\n\
  font-weight: normal;\n\
}\n\
#menu, .submenu {\n\
  border-radius: 3px;\n\
  padding-top: 1px;\n\
  padding-bottom: 3px;\n\
}\n\
.entry {\n\
  cursor: pointer;\n\
  display: block;\n\
  outline: none;\n\
  padding: 2px 10px;\n\
  position: relative;\n\
  text-decoration: none;\n\
  white-space: nowrap;\n\
  min-width: 70px;\n\
  text-align: left;\n\
  text-shadow: none;\n\
  font-size: 10pt;\n\
}\n\
.left>.entry.has-submenu {\n\
  padding-right: 17px !important;\n\
}\n\
.entry input[type=\"checkbox\"],\n\
.entry input[type=\"radio\"] {\n\
  margin: 0px;\n\
  position: relative;\n\
  top: 2px;\n\
}\n\
.entry input[type=\"number\"] {\n\
  width: 4.5em;\n\
}\n\
.entry.has-shortcut-text {\n\
  display: flex;\n\
  justify-content: space-between;\n\
  align-items: center;\n\
}\n\
.entry .shortcut-text {\n\
  opacity: 0.5;\n\
  font-size: 70%;\n\
  margin-left: 5px;\n\
}\n\
.has-submenu::after {\n\
  content: \"\";\n\
  border-left: .5em solid;\n\
  border-top: .3em solid transparent;\n\
  border-bottom: .3em solid transparent;\n\
  display: inline-block;\n\
  margin: .3em;\n\
  position: absolute;\n\
  right: 3px;\n\
}\n\
.left .has-submenu::after {\n\
  border-left: 0;\n\
  border-right: .5em solid;\n\
}\n\
.submenu {\n\
  display: none;\n\
  position: absolute;\n\
  left: 100%;\n\
  top: -1px;\n\
  margin-left: 0px;\n\
  margin-top: -2px;\n\
}\n\
.focused > .submenu {\n\
  display: block;\n\
}\n\
.imp-exp-result {\n\
  position: absolute;\n\
  text-align: center;\n\
  margin: auto;\n\
  right: 0px;\n\
  left: 0px;\n\
  width: 200px;\n\
}\n\
/* Custom Board Titles */\n\
.boardTitle, .boardSubtitle {\n\
  white-space: pre-line;\n\
}\n\
.boardTitle[contenteditable=\"true\"],\n\
.boardSubtitle[contenteditable=\"true\"] {\n\
  cursor: text !important;\n\
}\n\
/* Embedding */\n\
.embedder:not(.embedded) > span {\n\
  display: none;\n\
}\n\
#embedding {\n\
  padding: 1px 4px 1px 4px;\n\
  position: fixed;\n\
}\n\
#embedding.empty {\n\
  display: none;\n\
}\n\
#embedding > div:first-child {\n\
  display: -webkit-flex;\n\
  display: flex;\n\
}\n\
#embedding .move {\n\
  -webkit-flex: 1;\n\
  flex: 1;\n\
}\n\
#embedding .jump {\n\
  margin: -1px 4px;\n\
  text-decoration: none;\n\
}\n\
/* Gallery */\n\
#a-gallery {\n\
  position: fixed;\n\
  top: 0;\n\
  bottom: 0;\n\
  left: 0;\n\
  right: 0;\n\
  display: -webkit-flex;\n\
  display: flex;\n\
  -webkit-flex-direction: row;\n\
  flex-direction: row;\n\
  background: rgba(0,0,0,0.7);\n\
}\n\
.gal-viewport {\n\
  display: -webkit-flex;\n\
  display: flex;\n\
  -webkit-align-items: stretch;\n\
  align-items: stretch;\n\
  -webkit-flex-direction: row;\n\
  flex-direction: row;\n\
  -webkit-flex: 1 1 auto;\n\
  flex: 1 1 auto;\n\
  overflow: hidden;\n\
}\n\
.gal-thumbnails {\n\
  -webkit-flex: 0 0 150px;\n\
  flex: 0 0 150px;\n\
  overflow-y: auto;\n\
  display: -webkit-flex;\n\
  display: flex;\n\
  -webkit-flex-direction: column;\n\
  flex-direction: column;\n\
  -webkit-align-items: stretch;\n\
  align-items: stretch;\n\
  text-align: center;\n\
  background: rgba(0,0,0,.5);\n\
  border-left: 1px solid #222;\n\
}\n\
.gal-hide-thumbnails .gal-thumbnails {\n\
  display: none;\n\
}\n\
.gal-thumb img,\n\
.gal-thumb video {\n\
  max-width: 125px;\n\
  max-height: 125px;\n\
  height: auto;\n\
  width: auto;\n\
}\n\
.gal-thumb {\n\
  -webkit-flex: 0 0 auto;\n\
  flex: 0 0 auto;\n\
  padding: 3px;\n\
  line-height: 0;\n\
  transition: background .2s linear;\n\
}\n\
.gal-highlight {\n\
  background: rgba(0, 190, 255,.8);\n\
}\n\
.gal-prev {\n\
  border-right: 1px solid #222;\n\
}\n\
.gal-next {\n\
  border-left: 1px solid #222;\n\
}\n\
.gal-prev,\n\
.gal-next {\n\
  -webkit-flex: 0 0 20px;\n\
  flex: 0 0 20px;\n\
  position: relative;\n\
  cursor: pointer;\n\
  opacity: 0.7;\n\
  background-color: rgba(0, 0, 0, 0.3);\n\
}\n\
.gal-prev:hover,\n\
.gal-next:hover {\n\
  opacity: 1;\n\
}\n\
.gal-prev::after,\n\
.gal-next::after {\n\
  position: absolute;\n\
  top: 48.6%;\n\
  -webkit-transform: translateY(-50%);\n\
  transform: translateY(-50%);\n\
  display: inline-block;\n\
  border-top: 11px solid transparent;\n\
  border-bottom: 11px solid transparent;\n\
  content: \"\";\n\
}\n\
.gal-prev::after {\n\
  border-right: 12px solid #fff;\n\
  right: 5px;\n\
}\n\
.gal-next::after {\n\
  border-left: 12px solid #fff;\n\
  right: 3px;\n\
}\n\
.gal-image {\n\
  -webkit-flex: 1 0 auto;\n\
  flex: 1 0 auto;\n\
  display: -webkit-flex;\n\
  display: flex;\n\
  -webkit-align-items: flex-start;\n\
  align-items: flex-start;\n\
  -webkit-justify-content: space-around;\n\
  justify-content: space-around;\n\
  overflow: hidden;\n\
  /* Flex > Non-Flex child max-width and overflow fix (Firefox only?) */\n\
  width: 1%;\n\
}\n\
:root:not(.gal-fit-height):not(.gal-pdf) .gal-image {\n\
  overflow-y: scroll !important;\n\
}\n\
:root:not(.gal-fit-width):not(.gal-pdf) .gal-image {\n\
  overflow-x: scroll !important;\n\
}\n\
.gal-image a {\n\
  margin: auto;\n\
  line-height: 0;\n\
  max-width: 100%;\n\
}\n\
:root.gal-pdf .gal-image a {\n\
  width: 100%;\n\
  height: 100%;\n\
}\n\
.gal-fit-width .gal-image img,\n\
.gal-fit-width .gal-image video {\n\
  max-width: 100%;\n\
}\n\
.gal-fit-height .gal-image img,\n\
.gal-fit-height .gal-image video {\n\
  /* XXX https://code.google.com/p/chromium/issues/detail?id=168840, https://bugs.webkit.org/show_bug.cgi?id=94158 */\n\
  max-height: 95vh;\n\
  max-height: calc(100vh - 25px);\n\
}\n\
.gal-image iframe {\n\
  width: 100%;\n\
  height: 100%;\n\
}\n\
.gal-buttons {\n\
  font-size: 2em;\n\
  margin-right: 3px;\n\
  padding-left: 7px;\n\
  padding-right: 7px;\n\
  top: 5px;\n\
}\n\
:root.gal-pdf .gal-buttons {\n\
  top: 40px;\n\
  background: rgba(0,0,0,0.6) !important;\n\
  border-radius: 3px;\n\
}\n\
.gal-buttons a {\n\
  color: #ffffff;\n\
  text-shadow: 0px 0px 1px #000000;\n\
}\n\
.gal-buttons i {\n\
  display: inline-block;\n\
  margin: 2px;\n\
  position: relative;\n\
}\n\
.gal-start i {\n\
  border-left:   10px solid;\n\
  border-top:    6px solid transparent;\n\
  border-bottom: 6px solid transparent;\n\
  bottom: 1px;\n\
}\n\
.gal-stop i {\n\
  border: 5px solid;\n\
  bottom: 2px;\n\
}\n\
.gal-buttons.gal-playing > .gal-start,\n\
.gal-buttons:not(.gal-playing) > .gal-stop {\n\
  display: none;\n\
}\n\
.gal-buttons .menu-button i {\n\
  border-top:   10px solid;\n\
  border-right:  6px solid transparent;\n\
  border-left:   6px solid transparent;\n\
  bottom: 2px;\n\
  vertical-align: baseline;\n\
}\n\
.gal-buttons,\n\
.gal-name,\n\
.gal-count {\n\
  position: fixed;\n\
  right: 195px;\n\
}\n\
.gal-hide-thumbnails .gal-buttons,\n\
.gal-hide-thumbnails .gal-count,\n\
.gal-hide-thumbnails .gal-name {\n\
  right: 44px;\n\
}\n\
.gal-name {\n\
  bottom: 6px;\n\
  background: rgba(0,0,0,0.6) !important;\n\
  border-radius: 3px;\n\
  padding: 1px 5px 2px 5px;\n\
  text-decoration: none !important;\n\
  color: white !important;\n\
}\n\
.gal-name:hover,\n\
.gal-buttons a:hover {\n\
  color: rgb(95, 95, 101) !important;\n\
}\n\
:root.gal-pdf .gal-buttons a:hover {\n\
  color: rgb(204, 204, 204) !important;\n\
}\n\
.gal-count {\n\
  bottom: 27px;\n\
  background: rgba(0,0,0,0.6) !important;\n\
  border-radius: 3px;\n\
  padding: 1px 5px 2px 5px;\n\
  color: #ffffff !important;\n\
}\n\
:root:not(.gal-fit-width):not(.gal-pdf) .gal-name {\n\
  bottom: 23px !important;\n\
}\n\
:root:not(.gal-fit-width):not(.gal-pdf) .gal-count {\n\
  bottom: 44px !important;\n\
}\n\
:root.gal-fit-height:not(.gal-pdf):not(.gal-hide-thumbnails) .gal-buttons,\n\
:root.gal-fit-height:not(.gal-pdf):not(.gal-hide-thumbnails) .gal-name,\n\
:root.gal-fit-height:not(.gal-pdf):not(.gal-hide-thumbnails) .gal-count {\n\
  right: 178px !important;\n\
}\n\
:root.gal-hide-thumbnails.gal-fit-height:not(.gal-pdf) .gal-buttons,\n\
:root.gal-hide-thumbnails.gal-fit-height:not(.gal-pdf) .gal-name,\n\
:root.gal-hide-thumbnails.gal-fit-height:not(.gal-pdf) .gal-count {\n\
  right: 28px !important;\n\
}\n\
:root.gallery-open.fixed #header-bar:not(.autohide),\n\
:root.gallery-open.fixed #header-bar:not(.autohide) #shortcuts .fa::before {\n\
  visibility: hidden;\n\
}\n\
/* General */\n\
:root.yotsuba .dialog {\n\
  background-color: #F0E0D6;\n\
  border-color: #D9BFB7;\n\
}\n\
:root.yotsuba .field:focus,\n\
:root.yotsuba .field.focus {\n\
  border-color: #EA8;\n\
}\n\
/* Header */\n\
:root.yotsuba #header-bar.dialog {\n\
  background-color: rgba(240,224,214,0.98);\n\
}\n\
:root.yotsuba:not(.fixed) #header-bar, :root.yotsuba #notifications {\n\
  font-size: 9pt;\n\
}\n\
:root.yotsuba #header-bar, :root.yotsuba #notifications {\n\
  color: #B86;\n\
}\n\
:root.yotsuba #board-list a, :root.yotsuba #shortcuts a  {\n\
  color: #800000;\n\
}\n\
/* Settings */\n\
:root.yotsuba #fourchanx-settings fieldset, :root.yotsuba .section-main div::before {\n\
  border-color: #D9BFB7;\n\
}\n\
:root.yotsuba .suboption-list > div:last-of-type {\n\
  background-color: #F0E0D6;\n\
}\n\
/* Catalog */\n\
:root.yotsuba.catalog-hover-expand .catalog-container:hover > .post {\n\
  background-color: #F0E0D6;\n\
}\n\
:root.yotsuba.werkTyme .catalog-thread:not(:hover),\n\
:root.yotsuba.werkTyme:not(.catalog-hover-expand) .catalog-thread,\n\
:root.yotsuba.catalog-hover-expand .catalog-container:hover > .post,\n\
:root.yotsuba.catalog-hover-expand .catalog-container:hover .catalog-reply {\n\
  border-color: #D9BFB7;\n\
}\n\
/* Quote */\n\
:root.yotsuba .backlink.deadlink {\n\
  color: #00E !important;\n\
}\n\
:root.yotsuba .inline {\n\
  border-color: #D9BFB7;\n\
  background-color: rgba(255, 255, 255, .14);\n\
}\n\
/* Fappe and Werk Tyme */\n\
:root.yotsuba .indicator {\n\
  color: #F0E0D6;\n\
}\n\
/* QR */\n\
.yotsuba #dump-list::-webkit-scrollbar-thumb {\n\
  background-color: #F0E0D6;\n\
  border-color: #D9BFB7;\n\
}\n\
:root.yotsuba .qr-preview {\n\
  background-color: rgba(0, 0, 0, .15);\n\
}\n\
:root.yotsuba .qr-link {\n\
  border-color: rgb(225, 209, 199) rgb(225, 209, 199) rgb(210, 194, 184);\n\
  background: linear-gradient(#FFEFE5, #F0E0D6) repeat scroll 0% 0% transparent;\n\
}\n\
:root.yotsuba .qr-link:hover {\n\
  background: #F0E0D6;\n\
}\n\
/* Menu */\n\
:root.yotsuba #menu {\n\
  color: #800000;\n\
}\n\
:root.yotsuba .entry {\n\
  font-size: 10pt;\n\
}\n\
:root.yotsuba .focused.entry {\n\
  background: rgba(255, 255, 255, .33);\n\
}\n\
/* Unread */\n\
:root.yotsuba .unread-mark-read {\n\
  background-color: rgba(240,224,214,0.5);\n\
}\n\
/* Thread Watcher */\n\
:root.yotsuba .replies-quoting-you > a, :root.yotsuba #watcher-link.replies-quoting-you {\n\
  color: #F00;\n\
}\n\
/* Watcher Favicon */\n\
:root.yotsuba .watch-thread-link\n\
{\n\
  background-image: url(\"data:image/svg+xml,<svg viewBox='0 0 26 26' preserveAspectRatio='true' xmlns='http://www.w3.org/2000/svg'><path fill='rgb(128,0,0)' d='M24.132,7.971c-2.203-2.205-5.916-2.098-8.25,0.235L15.5,8.588l-0.382-0.382c-2.334-2.333-6.047-2.44-8.25-0.235c-2.204,2.203-2.098,5.916,0.235,8.249l8.396,8.396l8.396-8.396C26.229,13.887,26.336,10.174,24.132,7.971z'/></svg>\");\n\
}\n\
/* General */\n\
:root.yotsuba-b .dialog {\n\
  background-color: #D6DAF0;\n\
  border-color: #B7C5D9;\n\
}\n\
:root.yotsuba-b .field:focus,\n\
:root.yotsuba-b .field.focus {\n\
  border-color: #98E;\n\
}\n\
/* Header */\n\
:root.yotsuba-b #header-bar.dialog {\n\
  background-color: rgba(214,218,240,0.98);\n\
}\n\
:root.yotsuba-b:not(.fixed) #header-bar, :root.yotsuba-b #notifications {\n\
  font-size: 9pt;\n\
}\n\
:root.yotsuba-b #header-bar, :root.yotsuba-b #notifications {\n\
  color: #89A;\n\
}\n\
:root.yotsuba-b #board-list a, :root.yotsuba-b #shortcuts a {\n\
  color: #34345C;\n\
}\n\
/* Settings */\n\
:root.yotsuba-b #fourchanx-settings fieldset, :root.yotsuba-b .section-main div::before {\n\
  border-color: #B7C5D9;\n\
}\n\
:root.yotsuba-b .suboption-list > div:last-of-type {\n\
  background-color: #D6DAF0;\n\
}\n\
/* Catalog */\n\
:root.yotsuba-b.catalog-hover-expand .catalog-container:hover > .post {\n\
  background-color: #D6DAF0;\n\
}\n\
:root.yotsuba-b.werkTyme .catalog-thread:not(:hover),\n\
:root.yotsuba-b.werkTyme:not(.catalog-hover-expand) .catalog-thread,\n\
:root.yotsuba-b.catalog-hover-expand .catalog-container:hover > .post,\n\
:root.yotsuba-b.catalog-hover-expand .catalog-container:hover .catalog-reply {\n\
  border-color: #B7C5D9;\n\
}\n\
/* Quote */\n\
:root.yotsuba-b .backlink.deadlink {\n\
  color: #34345C !important;\n\
}\n\
:root.yotsuba-b .inline {\n\
  border-color: #B7C5D9;\n\
  background-color: rgba(255, 255, 255, .14);\n\
}\n\
/* Fappe and Werk Tyme */\n\
:root.yotsuba-b .indicator {\n\
  color: #D6DAF0;\n\
}\n\
/* QR */\n\
.yotsuba-b #dump-list::-webkit-scrollbar-thumb {\n\
  background-color: #D6DAF0;\n\
  border-color: #B7C5D9;\n\
}\n\
:root.yotsuba-b .qr-preview {\n\
  background-color: rgba(0, 0, 0, .15);\n\
}\n\
:root.yotsuba-b .qr-link {\n\
  border-color: rgb(199, 203, 225) rgb(199, 203, 225) rgb(184, 188, 210);\n\
  background: linear-gradient(#E5E9FF, #D6DAF0) repeat scroll 0% 0% transparent;\n\
}\n\
:root.yotsuba-b .qr-link:hover {\n\
  background: #D9DDF3;\n\
}\n\
/* Menu */\n\
:root.yotsuba-b #menu {\n\
  color: #000;\n\
}\n\
:root.yotsuba-b .entry {\n\
  font-size: 10pt;\n\
}\n\
:root.yotsuba-b .focused.entry {\n\
  background: rgba(255, 255, 255, .33);\n\
}\n\
/* Unread */\n\
:root.yotsuba-b .unread-mark-read {\n\
  background-color: rgba(214,218,240,0.5);\n\
}\n\
/* Thread Watcher */\n\
:root.yotsuba-b .replies-quoting-you > a, :root.yotsuba-b #watcher-link.replies-quoting-you {\n\
  color: #F00;\n\
}\n\
/* Watcher Favicon */\n\
:root.yotsuba-b .watch-thread-link\n\
{\n\
  background-image: url(\"data:image/svg+xml,<svg viewBox='0 0 26 26' preserveAspectRatio='true' xmlns='http://www.w3.org/2000/svg'><path fill='rgb(0,0,0)' d='M24.132,7.971c-2.203-2.205-5.916-2.098-8.25,0.235L15.5,8.588l-0.382-0.382c-2.334-2.333-6.047-2.44-8.25-0.235c-2.204,2.203-2.098,5.916,0.235,8.249l8.396,8.396l8.396-8.396C26.229,13.887,26.336,10.174,24.132,7.971z'/></svg>\");\n\
}\n\
/* General */\n\
:root.futaba .dialog {\n\
  background-color: #F0E0D6;\n\
  border-color: #D9BFB7;\n\
}\n\
:root.futaba .field:focus,\n\
:root.futaba .field.focus {\n\
  border-color: #EA8;\n\
}\n\
/* Header */\n\
:root.futaba #header-bar.dialog {\n\
  background-color: rgba(240,224,214,0.98);\n\
}\n\
:root.futaba:not(.fixed) #header-bar, :root.futaba #notifications {\n\
  font-size: 11pt;\n\
}\n\
:root.futaba #header-bar, :root.futaba #notifications {\n\
  color: #B86;\n\
}\n\
:root.futaba #header-bar a, :root.futaba #notifications a {\n\
  color: #800000;\n\
}\n\
/* Settings */\n\
:root.futaba #fourchanx-settings fieldset, :root.futaba .section-main div::before {\n\
  border-color: #D9BFB7;\n\
}\n\
:root.futaba .suboption-list > div:last-of-type {\n\
  background-color: #F0E0D6;\n\
}\n\
/* Catalog */\n\
:root.futaba.catalog-hover-expand .catalog-container:hover > .post {\n\
  background-color: #F0E0D6;\n\
}\n\
:root.futaba.werkTyme .catalog-thread:not(:hover),\n\
:root.futaba.werkTyme:not(.catalog-hover-expand) .catalog-thread,\n\
:root.futaba.catalog-hover-expand .catalog-container:hover > .post,\n\
:root.futaba.catalog-hover-expand .catalog-container:hover .catalog-reply {\n\
  border-color: #D9BFB7;\n\
}\n\
/* Quote */\n\
:root.futaba .backlink.deadlink {\n\
  color: #00E !important;\n\
}\n\
:root.futaba .inline {\n\
  border-color: #D9BFB7;\n\
  background-color: rgba(255, 255, 255, .14);\n\
}\n\
/* Fappe and Werk Tyme */\n\
:root.futaba .indicator {\n\
  color: #F0E0D6;\n\
}\n\
/* Anonymize */\n\
:root.futaba.anonymize .name::before {\n\
  font-size: 12pt;\n\
}\n\
/* QR */\n\
.futaba #dump-list::-webkit-scrollbar-thumb {\n\
  background-color: #F0E0D6;\n\
  border-color: #D9BFB7;\n\
}\n\
:root.futaba .qr-preview {\n\
  background-color: rgba(0, 0, 0, .15);\n\
}\n\
:root.futaba .qr-link {\n\
  border-color: rgb(225, 209, 199) rgb(225, 209, 199) rgb(210, 194, 184);\n\
  background: linear-gradient(#FFEFE5, #F0E0D6) repeat scroll 0% 0% transparent;\n\
}\n\
:root.futaba .qr-link:hover {\n\
  background: #F0E0D6;\n\
}\n\
/* Menu */\n\
:root.futaba #menu {\n\
  color: #800000;\n\
}\n\
:root.futaba .entry {\n\
  font-size: 12pt;\n\
}\n\
:root.futaba .focused.entry {\n\
  background: rgba(255, 255, 255, .33);\n\
}\n\
/* Unread */\n\
:root.futaba .unread-mark-read {\n\
  background-color: rgba(240,224,214,0.5);\n\
}\n\
/* Thread Watcher */\n\
:root.futaba .replies-quoting-you > a, :root.futaba #watcher-link.replies-quoting-you {\n\
  color: #F00;\n\
}\n\
/* Watcher Favicon */\n\
:root.futaba .watch-thread-link\n\
{\n\
  background-image: url(\"data:image/svg+xml,<svg viewBox='0 0 26 26' preserveAspectRatio='true' xmlns='http://www.w3.org/2000/svg'><path fill='rgb(128,0,0)' d='M24.132,7.971c-2.203-2.205-5.916-2.098-8.25,0.235L15.5,8.588l-0.382-0.382c-2.334-2.333-6.047-2.44-8.25-0.235c-2.204,2.203-2.098,5.916,0.235,8.249l8.396,8.396l8.396-8.396C26.229,13.887,26.336,10.174,24.132,7.971z'/></svg>\");\n\
}\n\
/* General */\n\
:root.burichan .dialog {\n\
  background-color: #D6DAF0;\n\
  border-color: #B7C5D9;\n\
}\n\
:root.burichan .field:focus,\n\
:root.burichan .field.focus {\n\
  border-color: #98E;\n\
}\n\
/* Header */\n\
:root.burichan #header-bar.dialog {\n\
  background-color: rgba(214,218,240,0.98);\n\
}\n\
:root.burichan:not(.fixed) #header-bar, :root.burichan #header-bar #notifications {\n\
  font-size: 11pt;\n\
}\n\
:root.burichan #header-bar, :root.burichan #header-bar #notifications {\n\
  color: #89A;\n\
}\n\
:root.burichan #header-bar a, :root.burichan #header-bar #notifications a {\n\
  color: #34345C;\n\
}\n\
/* Settings */\n\
:root.burichan #fourchanx-settings fieldset, :root.burichan .section-main div::before {\n\
  border-color: #B7C5D9;\n\
}\n\
:root.burichan .suboption-list > div:last-of-type {\n\
  background-color: #D6DAF0;\n\
}\n\
/* Catalog */\n\
:root.burichan.catalog-hover-expand .catalog-container:hover > .post {\n\
  background-color: #D6DAF0;\n\
}\n\
:root.burichan.werkTyme .catalog-thread:not(:hover),\n\
:root.burichan.werkTyme:not(.catalog-hover-expand) .catalog-thread,\n\
:root.burichan.catalog-hover-expand .catalog-container:hover > .post,\n\
:root.burichan.catalog-hover-expand .catalog-container:hover .catalog-reply {\n\
  border-color: #B7C5D9;\n\
}\n\
/* Quote */\n\
:root.burichan .backlink.deadlink {\n\
  color: #34345C !important;\n\
}\n\
:root.burichan .inline {\n\
  border-color: #B7C5D9;\n\
  background-color: rgba(255, 255, 255, .14);\n\
}\n\
/* Fappe and Werk Tyme */\n\
:root.burichan .indicator {\n\
  color: #D6DAF0;\n\
}\n\
/* Anonymize */\n\
:root.burichan.anonymize .name::before {\n\
  font-size: 12pt;\n\
}\n\
/* QR */\n\
.burichan #dump-list::-webkit-scrollbar-thumb {\n\
  background-color: #D6DAF0;\n\
  border-color: #B7C5D9;\n\
}\n\
:root.burichan .qr-preview {\n\
  background-color: rgba(0, 0, 0, .15);\n\
}\n\
:root.burichan .qr-link {\n\
  border-color: rgb(199, 203, 225) rgb(199, 203, 225) rgb(184, 188, 210);\n\
  background: linear-gradient(#E5E9FF, #D6DAF0) repeat scroll 0% 0% transparent;\n\
}\n\
:root.burichan .qr-link:hover {\n\
  background: #D9DDF3;\n\
}\n\
/* Menu */\n\
:root.burichan #menu {\n\
  color: #000000;\n\
}\n\
:root.burichan .entry {\n\
  font-size: 12pt;\n\
}\n\
:root.burichan .focused.entry {\n\
  background: rgba(255, 255, 255, .33);\n\
}\n\
/* Unread */\n\
:root.burichan .unread-mark-read {\n\
  background-color: rgba(214,218,240,0.5);\n\
}\n\
/* Thread Watcher */\n\
:root.burichan .replies-quoting-you > a, :root.burichan #watcher-link.replies-quoting-you {\n\
  color: #F00;\n\
}\n\
/* Watcher Favicon */\n\
:root.burichan .watch-thread-link\n\
{\n\
  background-image: url(\"data:image/svg+xml,<svg viewBox='0 0 26 26' preserveAspectRatio='true' xmlns='http://www.w3.org/2000/svg'><path fill='rgb(0,0,0)' d='M24.132,7.971c-2.203-2.205-5.916-2.098-8.25,0.235L15.5,8.588l-0.382-0.382c-2.334-2.333-6.047-2.44-8.25-0.235c-2.204,2.203-2.098,5.916,0.235,8.249l8.396,8.396l8.396-8.396C26.229,13.887,26.336,10.174,24.132,7.971z'/></svg>\");\n\
}\n\
/* General */\n\
:root.tomorrow .dialog {\n\
  background-color: #282A2E;\n\
  border-color: #111;\n\
}\n\
/* Header */\n\
:root.tomorrow #header-bar.dialog {\n\
  background-color: rgba(40,42,46,0.9);\n\
}\n\
:root.tomorrow:not(.fixed) #header-bar, :root.tomorrow #notifications {\n\
  font-size: 9pt;\n\
}\n\
:root.tomorrow #header-bar, :root.tomorrow #notifications {\n\
  color: #C5C8C6;\n\
}\n\
:root.tomorrow #header-bar a, :root.tomorrow #notifications a {\n\
  color: #81A2BE;\n\
}\n\
:root.tomorrow.shortcut-icons .native-settings {\n\
  background-image: url('//s.4cdn.org/image/favicon-ws.ico');\n\
}\n\
/* Settings */\n\
:root.tomorrow #fourchanx-settings fieldset, :root.tomorrow .section-main div::before {\n\
  border-color: #111;\n\
}\n\
:root.tomorrow .suboption-list > div:last-of-type {\n\
  background-color: #282A2E;\n\
}\n\
/* Catalog */\n\
:root.tomorrow.catalog-hover-expand .catalog-container:hover > .post {\n\
  background-color: #282A2E;\n\
}\n\
:root.tomorrow.werkTyme .catalog-thread:not(:hover),\n\
:root.tomorrow.werkTyme:not(.catalog-hover-expand) .catalog-thread,\n\
:root.tomorrow.catalog-hover-expand .catalog-container:hover > .post,\n\
:root.tomorrow.catalog-hover-expand .catalog-container:hover .catalog-reply {\n\
  border-color: #111;\n\
}\n\
/* Quote */\n\
:root.tomorrow #arc-list span.quote {\n\
  color: #B5BD68;\n\
}\n\
:root.tomorrow .backlink.deadlink {\n\
  color: #81A2BE !important;\n\
}\n\
:root.tomorrow .inline {\n\
  border-color: #111;\n\
  background-color: rgba(0, 0, 0, .14);\n\
}\n\
/* Fappe and Werk Tyme */\n\
:root.tomorrow .indicator {\n\
  color: #282A2E;\n\
}\n\
/* Highlighting */\n\
:root.tomorrow .qphl {\n\
  outline: 2px solid rgba(145, 182, 214, .8);\n\
}\n\
:root.tomorrow.highlight-you .quotesYou.opContainer,\n\
:root.tomorrow.highlight-you .quotesYou > .reply {\n\
  border-left: 3px solid rgba(145, 182, 214, .8);\n\
}\n\
:root.tomorrow.highlight-own .yourPost.opContainer,\n\
:root.tomorrow.highlight-own .yourPost > .reply {\n\
  border-left: 3px dashed rgba(145, 182, 214, .8);\n\
}\n\
:root.tomorrow .opContainer.filter-highlight,\n\
:root.tomorrow .filter-highlight > .reply {\n\
  box-shadow: inset 5px 0 rgba(145, 182, 214, .5);\n\
}\n\
:root.tomorrow.highlight-own .yourPost > div.sideArrows,\n\
:root.tomorrow.highlight-you .quotesYou > div.sideArrows,\n\
:root.tomorrow .filter-highlight > div.sideArrows {\n\
  color: rgb(155, 185, 210);\n\
}\n\
:root.tomorrow .catalog-thread.filter-highlight .catalog-thumb,\n\
:root.tomorrow.werkTyme .catalog-thread.filter-highlight:not(:hover),\n\
:root.tomorrow.werkTyme:not(.catalog-hover-expand) .catalog-thread.filter-highlight,\n\
:root.tomorrow.werkTyme.catalog-hover-expand .catalog-thread.filter-highlight > .catalog-container:hover > .catalog-post {\n\
  box-shadow: 0 0 3px 3px rgba(64, 192, 255, .7);\n\
}\n\
:root.tomorrow .catalog-thread.watched .catalog-thumb,\n\
:root.tomorrow.werkTyme .catalog-thread.watched:not(:hover),\n\
:root.tomorrow.werkTyme:not(.catalog-hover-expand) .catalog-thread.watched,\n\
:root.tomorrow.werkTyme.catalog-hover-expand .catalog-thread.watched > .catalog-container:hover > .catalog-post {\n\
  border: 2px solid rgb(64, 192, 255);\n\
}\n\
/* QR */\n\
.tomorrow #dump-list::-webkit-scrollbar-thumb {\n\
  background-color: #282A2E;\n\
  border-color: #111;\n\
}\n\
:root.tomorrow .qr-preview {\n\
  background-color: rgba(255, 255, 255, .15);\n\
}\n\
:root.tomorrow #qr .field {\n\
  background-color: rgb(26, 27, 29);\n\
  color: rgb(197,200,198);\n\
  border-color: rgb(40, 41, 42);\n\
}\n\
:root.tomorrow #qr .field:focus,\n\
:root.tomorrow #qr .field.focus {\n\
  border-color: rgb(129, 162, 190) !important;\n\
  background-color: rgb(30,32,36);\n\
}\n\
:root.tomorrow .persona button {\n\
  background: linear-gradient(to bottom, #2E3035, #222427) no-repeat;\n\
  color: rgb(197,200,198);\n\
  border-color: rgb(40, 41, 42);\n\
  outline: none;\n\
}\n\
:root.tomorrow .persona button::-moz-focus-inner {\n\
  border: none;\n\
}\n\
:root.tomorrow .persona button:focus {\n\
  border-color: rgb(129, 162, 190);\n\
}\n\
:root.tomorrow #qr.sjis-preview #sjis-toggle,\n\
:root.tomorrow #qr.tex-preview #tex-preview-button {\n\
  background: rgb(26, 27, 29);\n\
}\n\
:root.tomorrow #qr select,\n\
:root.tomorrow #file-n-submit > input,\n\
:root.tomorrow #qr-draw-button {\n\
  border-color: rgb(40, 41, 42);\n\
}\n\
:root.tomorrow #qr-filename {\n\
  color: rgb(197,200,198);\n\
}\n\
:root.tomorrow .qr-link {\n\
  border-color: rgb(25, 27, 31) rgb(25, 27, 31) rgb(10, 12, 16);\n\
  background: linear-gradient(#37393D, #282A2E) repeat scroll 0% 0% transparent;\n\
}\n\
:root.tomorrow .qr-link:hover {\n\
  background: #282A2E;\n\
}\n\
/* Menu */\n\
:root.tomorrow #menu {\n\
  color: #C5C8C6;\n\
}\n\
:root.tomorrow .entry {\n\
  font-size: 10pt;\n\
}\n\
:root.tomorrow .focused.entry {\n\
  background: rgba(0, 0, 0, .33);\n\
}\n\
/* Unread */\n\
:root.tomorrow .unread-line {\n\
  border-color: rgb(197, 200, 198);\n\
}\n\
:root.tomorrow .unread-mark-read {\n\
  background-color: rgba(40,42,46,0.5);\n\
}\n\
/* Thread Watcher */\n\
:root.tomorrow .replies-quoting-you > a, :root.tomorrow #watcher-link.replies-quoting-you {\n\
  color: #F00 !important;\n\
}\n\
/* Watcher Favicon */\n\
:root.tomorrow .watch-thread-link\n\
{\n\
  background-image: url(\"data:image/svg+xml,<svg viewBox='0 0 26 26' preserveAspectRatio='true' xmlns='http://www.w3.org/2000/svg'><path fill='rgb(197,200,198)' d='M24.132,7.971c-2.203-2.205-5.916-2.098-8.25,0.235L15.5,8.588l-0.382-0.382c-2.334-2.333-6.047-2.44-8.25-0.235c-2.204,2.203-2.098,5.916,0.235,8.249l8.396,8.396l8.396-8.396C26.229,13.887,26.336,10.174,24.132,7.971z'/></svg>\");\n\
}\n\
/* General */\n\
:root.photon .dialog {\n\
  background-color: #DDD;\n\
  border-color: #CCC;\n\
}\n\
:root.photon .field:focus,\n\
:root.photon .field.focus {\n\
  border-color: #EA8;\n\
}\n\
/* Header */\n\
:root.photon #header-bar.dialog {\n\
  background-color: rgba(221,221,221,0.98);\n\
}\n\
:root.photon:not(.fixed) #header-bar, :root.photon #notifications {\n\
  font-size: 9pt;\n\
}\n\
:root.photon #header-bar, :root.photon #notifications {\n\
  color: #333;\n\
}\n\
:root.photon #header-bar a, :root.photon #notifications a {\n\
  color: #FF6600;\n\
}\n\
/* Settings */\n\
:root.photon #fourchanx-settings fieldset, :root.photon .section-main div::before {\n\
  border-color: #CCC;\n\
}\n\
:root.photon .suboption-list > div:last-of-type {\n\
  background-color: #DDD;\n\
}\n\
/* Catalog */\n\
:root.photon.catalog-hover-expand .catalog-container:hover > .post {\n\
  background-color: #DDD;\n\
}\n\
:root.photon.werkTyme .catalog-thread:not(:hover),\n\
:root.photon.werkTyme:not(.catalog-hover-expand) .catalog-thread,\n\
:root.photon.catalog-hover-expand .catalog-container:hover > .post,\n\
:root.photon.catalog-hover-expand .catalog-container:hover .catalog-reply {\n\
  border-color: #CCC;\n\
}\n\
/* Quote */\n\
:root.photon #arc-list tr:nth-of-type(odd) span.quote {\n\
  color: #C0E17A;\n\
}\n\
:root.photon .backlink.deadlink {\n\
  color: #F60 !important;\n\
}\n\
:root.photon .inline {\n\
  border-color: #CCC;\n\
  background-color: rgba(255, 255, 255, .14);\n\
}\n\
/* Fappe and Werk Tyme */\n\
:root.photon .indicator {\n\
  color: #DDD;\n\
}\n\
/* QR */\n\
.photon #dump-list::-webkit-scrollbar-thumb {\n\
  background-color: #DDD;\n\
  border-color: #CCC;\n\
}\n\
:root.photon .qr-preview {\n\
  background-color: rgba(0, 0, 0, .15);\n\
}\n\
:root.photon .qr-link {\n\
  border-color: rgb(206, 206, 206) rgb(206, 206, 206) rgb(191, 191, 191);\n\
  background: linear-gradient(#ECECEC, #DDD) repeat scroll 0% 0% transparent;\n\
}\n\
:root.photon .qr-link:hover {\n\
  background: #DDDDDD;\n\
}\n\
/* Menu */\n\
:root.photon #menu {\n\
  color: #333;\n\
}\n\
:root.photon .entry {\n\
  font-size: 10pt;\n\
}\n\
:root.photon .focused.entry {\n\
  background: rgba(255, 255, 255, .33);\n\
}\n\
/* Unread */\n\
:root.photon .unread-mark-read {\n\
  background-color: rgba(221,221,221,0.5);\n\
}\n\
/* Thread Watcher */\n\
:root.photon .replies-quoting-you > a, :root.photon #watcher-link.replies-quoting-you {\n\
  color: #00F !important;\n\
}\n\
/* Watcher Favicon */\n\
:root.photon .watch-thread-link\n\
{\n\
  background-image: url(\"data:image/svg+xml,<svg viewBox='0 0 26 26' preserveAspectRatio='true' xmlns='http://www.w3.org/2000/svg'><path fill='rgb(51,51,51)' d='M24.132,7.971c-2.203-2.205-5.916-2.098-8.25,0.235L15.5,8.588l-0.382-0.382c-2.334-2.333-6.047-2.44-8.25-0.235c-2.204,2.203-2.098,5.916,0.235,8.249l8.396,8.396l8.396-8.396C26.229,13.887,26.336,10.174,24.132,7.971z'/></svg>\");\n\
}\n\
/* General */\n\
:root.spooky .dialog {\n\
  background-color: #171526;\n\
  border-color: #707070;\n\
}\n\
:root.spooky .field:focus,\n\
:root.spooky .field.focus {\n\
  border-color: #98E;\n\
}\n\
/* Header */\n\
:root.spooky #header-bar.dialog {\n\
  background-color: rgba(23,21,38,0.98);\n\
}\n\
:root.spooky:not(.fixed) #header-bar, :root.spooky #notifications {\n\
  font-size: 9pt;\n\
}\n\
:root.spooky #header-bar, :root.spooky #notifications {\n\
  color: #C49756;\n\
}\n\
:root.spooky #board-list a, :root.spooky #shortcuts a {\n\
  color: #FE9600;\n\
}\n\
:root.spooky.shortcut-icons .native-settings {\n\
  background-image: url('//s.4cdn.org/image/favicon-ws.ico');\n\
}\n\
/* Settings */\n\
:root.spooky #fourchanx-settings fieldset, :root.spooky .section-main div::before {\n\
  border-color: #707070;\n\
}\n\
:root.spooky .suboption-list > div:last-of-type {\n\
  background-color: #171526;\n\
}\n\
/* Catalog */\n\
:root.spooky.catalog-hover-expand .catalog-container:hover > .post {\n\
  background-color: #171526;\n\
}\n\
:root.spooky.werkTyme .catalog-thread:not(:hover),\n\
:root.spooky.werkTyme:not(.catalog-hover-expand) .catalog-thread,\n\
:root.spooky.catalog-hover-expand .catalog-container:hover > .post,\n\
:root.spooky.catalog-hover-expand .catalog-container:hover .catalog-reply {\n\
  border-color: #707070;\n\
}\n\
/* Quote */\n\
:root.spooky #arc-list span.quote {\n\
  color: #634C2C;\n\
}\n\
:root.spooky .backlink.deadlink {\n\
  color: #FE9600 !important;\n\
}\n\
:root.spooky .inline {\n\
  border-color: #707070;\n\
  background-color: rgba(255, 255, 255, .14);\n\
}\n\
/* Fappe and Werk Tyme */\n\
:root.spooky .indicator {\n\
  color: #171526;\n\
}\n\
/* Highlighting */\n\
:root.spooky .qphl {\n\
  outline: 2px solid rgba(145, 182, 214, .8);\n\
}\n\
:root.spooky.highlight-you .quotesYou.opContainer,\n\
:root.spooky.highlight-you .quotesYou > .reply {\n\
  border-left: 3px solid rgba(145, 182, 214, .8);\n\
}\n\
:root.spooky.highlight-own .yourPost.opContainer,\n\
:root.spooky.highlight-own .yourPost > .reply {\n\
  border-left: 3px dashed rgba(145, 182, 214, .8);\n\
}\n\
:root.spooky .opContainer.filter-highlight,\n\
:root.spooky .filter-highlight > .reply {\n\
  box-shadow: inset 5px 0 rgba(145, 182, 214, .5);\n\
}\n\
:root.spooky.highlight-own .yourPost > div.sideArrows,\n\
:root.spooky.highlight-you .quotesYou > div.sideArrows,\n\
:root.spooky .filter-highlight > div.sideArrows {\n\
  color: rgb(155, 185, 210);\n\
}\n\
/* QR */\n\
.spooky #dump-list::-webkit-scrollbar-thumb {\n\
  background-color: #171526;\n\
  border-color: #707070;\n\
}\n\
:root.spooky .qr-preview {\n\
  background-color: rgba(0, 0, 0, .15);\n\
}\n\
:root.spooky #qr .field {\n\
  background-color: rgb(26, 27, 29);\n\
  color: rgb(197,200,198);\n\
  border-color: rgb(40, 41, 42);\n\
}\n\
:root.spooky #qr .field:focus,\n\
:root.spooky #qr .field.focus {\n\
  border-color: rgb(254, 150, 0) !important;\n\
  background-color: rgb(30,32,36);\n\
}\n\
:root.spooky .persona button {\n\
  background: linear-gradient(to bottom, #2E3035, #222427) no-repeat;\n\
  color: rgb(197,200,198);\n\
  border-color: rgb(40, 41, 42);\n\
  outline: none;\n\
}\n\
:root.spooky .persona button::-moz-focus-inner {\n\
  border: none;\n\
}\n\
:root.spooky .persona button:focus {\n\
  border-color: rgb(254, 150, 0);\n\
}\n\
:root.spooky #qr.sjis-preview #sjis-toggle,\n\
:root.spooky #qr.tex-preview #tex-preview-button {\n\
  background: rgb(26, 27, 29);\n\
}\n\
:root.spooky #qr select,\n\
:root.spooky #file-n-submit > input,\n\
:root.spooky #qr-draw-button {\n\
  border-color: rgb(40, 41, 42);\n\
}\n\
:root.spooky #qr-filename {\n\
  color: rgb(197,200,198);\n\
}\n\
:root.spooky .qr-link {\n\
  border-color: rgb(8, 6, 23) rgb(8, 6, 23) rgb(0, 0, 8);\n\
  background: linear-gradient(#262435, #171526) repeat scroll 0% 0% transparent;\n\
}\n\
:root.spooky .qr-link:hover {\n\
  background: #1A1829;\n\
}\n\
/* Menu */\n\
:root.spooky #menu {\n\
  color: #FE9600;\n\
}\n\
:root.spooky .entry {\n\
  font-size: 10pt;\n\
}\n\
:root.spooky .focused.entry {\n\
  background: rgba(255, 255, 255, .33);\n\
}\n\
/* Unread */\n\
:root.spooky .unread-line {\n\
  border-color: rgb(197, 200, 198);\n\
  visibility: visible;\n\
  opacity: 1;\n\
}\n\
:root.spooky .unread-mark-read {\n\
  background-color: rgba(23,21,38,0.5);\n\
}\n\
/* Thread Watcher */\n\
:root.spooky .replies-quoting-you > a, :root.spooky #watcher-link.replies-quoting-you {\n\
  color: #F00 !important;\n\
}\n\
/* Watcher Favicon */\n\
:root.spooky .watch-thread-link\n\
{\n\
  background-image: url(\"data:image/svg+xml,<svg viewBox='0 0 26 26' preserveAspectRatio='true' xmlns='http://www.w3.org/2000/svg'><path fill='rgb(254,150,0)' d='M24.132,7.971c-2.203-2.205-5.916-2.098-8.25,0.235L15.5,8.588l-0.382-0.382c-2.334-2.333-6.047-2.44-8.25-0.235c-2.204,2.203-2.098,5.916,0.235,8.249l8.396,8.396l8.396-8.396C26.229,13.887,26.336,10.174,24.132,7.971z'/></svg>\");\n\
}\n\
/* Link Title Favicons */\n\
.linkify.audio::before {\n\
  content: \"\";\n\
  background: transparent url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAadEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41LjEwMPRyoQAAAitJREFUOE9jYCAWKJWwavr0KyXWb/FIbDtUFFyzJx6nVofE2Xo5nXsj0rqPNSR0nVkR2Hjmgmfd+U9Otdf+m5Vf/6+SfeU/R9ChVVgNYDRtlfJuuPA/rPfe/4QpD/6nznj0P27Kw/9unff/69Xf+69c/+C/SO7N/0z+OAxgMmmRCe++/r9i3ev/KWvf/vdY8PK/bt/9/wrNV3/IN5y/IVt1YqNg4pGTTP4HsbuA2bhZ2qvpyn+xjIObxAp3VwqlrgngLFyryVy5nhPmZJHANS2cwYexG8BmVC/pWn3hP4NZlzWuQDJI3dIiFnUUuwEsQAOcq87jNcC7fHeLUtJxHF4AGmBWeAavAWH1+1rUUk7giAWjOknllON4DXAs2NEiG4/DBQxAF/CFHfrPYI4jDFSLuJVjNrUJhB/B7gIGo1pJRt99GAZYJK7wLJ1z7Xzl4vu/7aqv/GRBj0bjqAX2qb0nJ7mXH17C4HcUxQA+hymWtSue/C5a9up/9Ozn/7Vr7v1nRY7GqMb91T3b3v6vWvPmf/S0p/9ZQk+DDLCBRSOz06Jqk+o7/21nvfqvsebDf7kZL/5zBaxphkezd+OFn7HzXvz3Wvjmv9a8N//5Ek//ZTBpVYUrMG2X5wjcdl68+uI/wa5Lr3hSNjczGFeywOVZ/bbcVGp//F9izfv/Ql03f3P4LC/HSEQquYwMFnUCDJ7dzBhyjGZNQpye89M5gpfnMvtNUyE2h4PUAQBovvT7lyNljwAAAABJRU5ErkJggg==') center left no-repeat!important;\n\
  padding-left: 18px;\n\
}\n\
.linkify.clyp::before {\n\
  content: \"\";\n\
  background: transparent url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAIGNIUk0AAHomAACAhAAA+gAAAIDoAAB1MAAA6mAAADqYAAAXcJy6UTwAAAAwUExURTSY22ey5E2l4KbS75rM7Y3F64C/6f///8zl9nS45r/f9PL5/UGe3bPY8Vqr4v///wNjrzUAAAABYktHRA8YugDZAAAAB3RJTUUH4AINEi85AIH95AAAAE9JREFUCNdjYMAGGBWgDGYHCM2a3hkAZmi0dzSBaKaO9o5moCqmLiCjYzNQyw4QowIodQzI6E0AKcpo72gE6+Jyb1kAMehUA9RktgdYbQYAjGIVNGGXBJkAAAAASUVORK5CYII=') center left no-repeat!important;\n\
  padding-left: 18px;\n\
}\n\
.linkify.dailymotion::before {\n\
  content: \"\";\n\
  background: transparent url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAnUExURQBk3ff6/trp+kKO5wZt3xx54q7P9Ozz/IS17zOG5WKh653E8sbc9/GbbcoAAABZSURBVAjXY2BAASyhDhAGc9oECMOjyAAiESEEYrBYpLWBGcwHxcvBjDDxHelghpF0yDQwY3kVgweEUeEQDWbMEepqAjO8FMsLIeYsU8o+BrbCdWboTAe4AwALXxWGjW41FwAAAABJRU5ErkJggg==') center left no-repeat!important;\n\
  padding-left: 18px;\n\
}\n\
.linkify.gfycat::before {\n\
  content: \"\";\n\
  background: transparent url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAjVBMVEWn3gCo3gSr3w2t4BSu4Bav4Ri35C+45DK45DO55DXA50rA50vB50zC6E/D6FTF6VjG6VvL62vN7G/P7XbQ7XfW74vY8JDa8ZTe8qDe8qLf86Pi9Kzj9K7k9LHp9sDp98Lq98Ps+Mr0++L5/O75/fD6/fH6/fL6/fP7/fT7/fb8/ff8/vj8/vn+/v7///91X4cfAAAAcklEQVR42o3M2xKBUACF4aVQckrIuRJK6H//x2sme4/MuPDfre9i6c/Cc3U5Dj87BuAxsXvGu6JvIIXEHRWwNHCHQNrCzkAFkbSBg4EM8i+Yw7PXBa3zRfuxVyf/Bis7nKwGKAcWxgC8prI5Sc315OlnDfzpDar2S9/oAAAAAElFTkSuQmCC') center left no-repeat!important;\n\
  padding-left: 18px;\n\
}\n\
.linkify.gist::before {\n\
  content: \"\";\n\
  background: transparent url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAABblBMVEXc3NykpKTW1tbb29ugoKCdnZ0AAAACAgIEDRcKCgoMDAwODg4QIzYRDAoTExMUDwwVAg0WICsaEw8aGhoiCBklGxUmERwwKCQ7LSU7Ozs8LSZFLyNINi1JNyxJNy1KSklMOi5VR1FXV1daQTRkZGRseYZwU0F4eHh7dnR8bWV/YE6IdGiKcGCKkJaNgYeNjY2RdGOScWCUcWCZmZmhoaGkpKSoqKirfmaurq6xsbG1tbW6urq+vr7AbmzBb23CwsLGxsbHx8fHyMjJycnJysrMzMzOiYbPi4fQ0NDRoYbT09PU1NTW1tbY2NjZqIzZ2dnb29vd3d3f39/i4uLktZrk5OTl5eXm5ubn5+fo6Ojq6urs7OzttKLu7u7wuqbw8PDx8fHz8/P4+Pj5+fn7uZj8vpz9ya79ybD/tZf/upr/wZ//w6H/xKH/xaL/xrH/yqj/y7T/zqv/z7D/07D/17n/2Lv/2Lz/3L//38n/4Mk3Q/ZuAAAABnRSTlMSFcbGzc5MNKFvAAAA1klEQVQoz2NgYPZHAswMDEwRSclwkBTBxOARn4gE4j0YXBOiJNUDg7y8Ar1UlOITXBkcY73Z2Li42dg42dn4wmIdGeyjQ7nZoEA4PNqewSZKlw0O9KJsGKwjBdl4ZeWkJGQUhNjEIq0ZrMI5+D0ri7Jz8itCRAXCrRgsQ3mUy+xicrPSbfO0REItGSyCVaVL3ONSU9LcCtQUgy0YzIJ85M1LizMzCsv9xF2CzBhMAwN99TV1DI0MtDWcAgNNGUycA5CAswkDi5kDwrMOZiwMjKzGSICVEQDhZj0UQV7PewAAAABJRU5ErkJggg==') center left no-repeat!important;\n\
  padding-left: 18px;\n\
}\n\
.linkify.image::before {\n\
  content: \"\";\n\
  background: transparent url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAadEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41LjEwMPRyoQAAAs5JREFUOE+lk/tvi1EYx98/xT8gW4REIpGFMEQWl2FiM9ZMZhm2xRAyOsmujFFmdFRHu0tWm87UypxStr69zPauN5e5rHVp3IYhbOvHy+wHEQlxkm+ek+d8nm9OznkeSfrfldmgJC7QyUlTymsJTfuTZ25z4HdWYwyLreYhtpgekGPw0+kKvo1Eo+IXRSIiEhkWZuc9tqnsJD9EqTUopCxjSGTpB0iueczSo1HyW8cpsExQ1DbxI2pt45j9cXpexul4FEd79RnZphAa/SD7WvuFtO6UItbU9LC+YQxNI2w0wwYT5LRAdhOU3oBTIXC9gXP3oUSGgz2vST3gYHejR0jptT1C332f8yrUEYHrz8CgxDnpm6DKCUfc0KnmXa/AEVPPwnDcD0cvetA2uYRk67Ive/lpjO7YBO1PPuF8Df3vwf4cbNE4tqdw7YVq8HYyHx6FvhE1hkMEg8HDUqvFkjT4aIjMqkqyqkswDSrcfBfH+Q561YLAZ/B+BLda6FXlU/cPv0AoEPhuoP1h4Av7Wbh9E/Py15NWWUjeSR3nZDfeN+N0DY9hG/7K1eGP3P0S5/EYRFUF/IOTBrUXHPm9fT6mr1xEwupkZqxbzLyiDJYUZ5NSnkdqdSHpxyrYdFpPgdmAsdfJwPMI/Yr65bf7tZLGGBQ7DNdJWFtIYvoOZmbuZE7OXpIKKli86zAr9p9gTVktWTVnKTI2U95uRWe3U2IJUDbVB5p6hVm5x5m9Vc/cnedZUNzC8lILaQesZBy6hEZ3maKzgvJWFzVWD9XtXvVGQbSWASFtMATVRlJIKbOTWtlJXaeXepuPM1f6MNp9GLt8mLvvYLmp0OhQ2Fwvk6m7xaqDTvY0eYWUVtcnllXfYlGpnfklVuraHHg8HjxuN+6fktUHlWWZPaZeUo/ILK0UKttBcbNbSB9GP0yLxWJJUxoZGUn80zD9C/vXQ/4NHY10h3M1zmQAAAAASUVORK5CYII=') center left no-repeat!important;\n\
  padding-left: 18px;\n\
}\n\
.linkify.installgentoo::before {\n\
  content: \"\";\n\
  background: transparent url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAABcVBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB3dIYAAAAAAAAAAAAbGh4BBAcCBgoBBgoCBwsCCQ/QzucCCA7MyuXZ1eUBBQmTh8fo5/i9svIAAADh3vQAAAACCA0CCQ8CCQ4DDBQbGCUDChDr6vgAAAAAAAAREBIDCxK6tdfe2fTv7/cDCxIDDBQEDRUHDhgMJjXk4PZdXWdLUFoUNEYOKDgSMUMRLUBneI4eTGj08/QmW3onW3rTzvfOx/giU3IiVHMkWHdEaYJobHv3+PokWHpua6TNy9xZgZ+1quz8/foQKj0XPFInWn0nW38tZ4o6fqg8gq48grA9hrU/i7pAhrNAiLdBjLtEjr1FksNIjr5Il8pImMtKWnNqhL97odKFqti5q/q5rPq60+nCt/vLw/vPx/jV0vHY0/rc1/rg2/vh3fzn4fzu6/vx8vf19Pv19Pz49/v5+Pv8/Pv8/fr9/vv+/frziVtUAAAAT3RSTlMABQYHCAoNDhARGRobL0ZOV1xdXV5fYGBmZnB0eX2MjZSaoaGio6mqqqustLq7zubo6Ojo6evt7u/x8fLy9/f4+Pj5+vr6+vr6+/39/v7+XKgUSwAAAMhJREFUKM9jYGDg4OZmZgABKINT1dBAhBHIYFMxMBIDisjbhoZbCTExsCu5hoeY8DEwcOkEx8fY6MqpucTGB0izglVEplcU5/gmRYWBVQDNMK+s0hN3SvMyBpsBNJxXw0NfwTEjVQZqHQMHj5RfWW5mliSEC7TPzK6yJD/bXZQRzGdXcisqLy309okA2Q4Eis4peQWmstqBCdGW/CABraC45ERBBs3A6Fh/AbAKTwsHa34QZW8NVsGuLqwswQSjQICTmYMFQaEDAAF8JHLfKGswAAAAAElFTkSuQmCC') center left no-repeat!important;\n\
  padding-left: 18px;\n\
}\n\
.linkify.liveleak::before {\n\
  content: \"\";\n\
  background: transparent url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAadEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41LjEwMPRyoQAAAlNJREFUGBkFwU2LVmUYAODrPu8Z5x1xSpRBXQyFoLsBE+wfiO5atJOgnf9DUPwFgtGinUgEaQsRhHYuMtpEiEWuG5iNjuOcj+c8z911xXcXL/68c3Dw1fzhg0QgEQAAEYGUKXFie9vxlSs/xk/rdavjGEkmkWSih65z4osv9GfOiK6LzEyZ2uGh4dUrmzs72ddlUUhkoiMr4PT167589Mh6c1N0nSRlqrX67dat+PDyZXRT19m5edPnt28rGFHxMcJ6d9fprS1/37tneP3aemPD1uamUydPOru3p5DdGOH0tWsu3LhhxIQJM2qEpRT/Pn3q/du3AhARSmvGTH0lplKMrVkiYpVpQaJlighzhDkzhmEA0fcWoqAfyaFW4zTlgCABxlrNmY4ylUzLsiREprFWc0T2M+ZSjKWY0AEaltZUjJixZJIpuk5pTWlNP2BYFvOyKJkCAKU1tTXHrZlqVWolUxdhxsfVSj9FmJfFMM9GdICGGa01HyMstYpMIFPJVNDPmYZSTOPoOEKHzNRlKpmWWh1j6TpLa2SKTKVWU6Z+Qolwdm/P9QcPZKa2LH69e9eIMs+WCL/cv2/98CGZPrt61am+V9APq1X89eyZ/968obVYaiXT4dGREgG+vnPHeHgYMsH2+fP+efEihtVKv7SWw/6+9/v7KYLMhIywTJPamvOXLomukyRsrNf+ePzYkpl9dJ3SWgSCSCQCfz5/7pMLF2yfO6eLiAQcHRz4/cmT+HR7O+Ob3d0fNt69+7a2BiICQCJbA0EgE5lpvbXl1OXL3/8Pfax4+6SjSukAAAAASUVORK5CYII=') center left no-repeat!important;\n\
  padding-left: 18px;\n\
}\n\
.linkify.pastebin::before {\n\
  content: \"\";\n\
  background: transparent url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAB1FBMVEUAAAAAAAAAAABWYWwAAABbY3BbYm5dZnFdZXJeZnMEBAQHCAhYYGpdZnFdZnBgaHIlJyomKCooKi09QkdESU5eZGtdYmhdYmleY2lrcXdqb3Rqb3Rqb3SSmJ+SlJeWmJutr7GtrrCWm6ChpKhbW1tmZmZvb290dHR3d3d4eHh5eXl6enp8fHx+gIJ/f3+CgoKDg4OEhISFhYWHh4eKioqKjI2Li4uMjIyOjo6Pj4+QkJCRkZGSkpKUlJSVl5mWlpaYmZqZm52ampqbm5ucnJydnZ2enp6fn5+hoaGioqKkpKSkpaalpaWmp6mmp6qnqauoqKioqquoqq2qqqqrrK2srKysra6srrCsrrGurq6vr6+wsLCxsbGysrKztLa0tLS1t7m2tra3t7e4uLi5ubm6urq7u7u8vLy9vb2+vr7AwMDAwsTBwcHExcfFxcXFxsnGxsbHx8fIyMjJycnMzMzNzc3Ozs7O0NLPz8/Q0NDR0dHR09XT09PV1dXV1dbV1tfV19rW1tbX19fX19jY2tzZ2dnZ2tva2tra3N3a3N7c3Nze3t7f39/f4OHg4ODi4uLl5+jm5ubs7Ozs7e3u7u7v7+/v8PDw8PDx8fHy8vLz8/P29vYSoLMZAAAAJHRSTlMABAUGCwsNHCAiLzMzMzZEYGJwgIuOnJycnqmqq9bc3+/w8fkZ0N/uAAAA/klEQVQoU2NgYGDl5YMDdgYGBmZZ3964CYFtIR3e9Q7K/AwMHI55KfaFmcHWMy3K3MwlGRg4wz0zdYpcorRbNbL0LaWAAp3ts2umV8wo6MupTauQBgqUG03VL7W3sfZSb1erAgm02M+yzYrVCXUy6zapAQlUx/dEdyX3J3ZHVUYVywAF8o2rDNN1Go2jzGLMokAC2QbuSc42mXmaOXop9iAtCXrJ5qXWjT59Abl2ESJAAX/tSIMMiyrrqQ3T6uS5gQK6kSqpqkUermGTexQFmYACflqR+hlWZSamzQpCLEDPsSmVVDT1TJw0JUhOAMRnYOARFRMTE5cQF+ZiBPIAII5B3EVG0b4AAAAASUVORK5CYII=') center left no-repeat!important;\n\
  padding-left: 18px;\n\
}\n\
.linkify.soundcloud::before {\n\
  content: \"\";\n\
  background: transparent url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABsklEQVQ4y5WTy2pUQRCGv2rbzDjJeAlIBmOyipGIIJqFEBDElwh4yULGeRFXPoEIBl/AvQ/gC2RnxCAoxijiwks852S6+3dxzslcHJCpTXVX11/Xv0097gLPgVNMJxnQNfX4zsqleWbnpoMf/oa9d988MM9MC/rp+E0a+A0dsVobMNMCOO8B6McRoABJI+A6gJmN3D2A8jgEBCEkSEMBrcrsDAzDWWn3AjgKFaDMmgRqniGFgsaDp1jrLOngDf1XT1D+A1dFc4MKAkkiCVKjjVu7g9+4Rzx4i1u6hjXbuMWr0O5QPNvCu7IaCZwEKQukLGDrm5x8uI0tr6MkiGlkiv7yLfzN+6S5i6QsIMABkEfcxhbWWYMkVAOjxvYAjc3HNHrbKI9VBQBFwF25XQKSBjqIf1YBuAurEMrczgDygD6/x2LCpFLXLUyQ+PoldphhBhYfIX09XU1+Flaukz7uYqs3SHs7cG4BmTsmkBUF9mmXEwa28BNLPaQPLepuNcbGSWQquQC2/Kdcox1FUGkcB0ykck1nA2+wTzMs8stGnP4rbWGw74EuS/GFQWfK7/wF6P4F7fzIAYkdmdEAAAAASUVORK5CYII=') center left no-repeat!important;\n\
  padding-left: 18px;\n\
}\n\
.linkify.twitchtv::before {\n\
  content: \"\";\n\
  background: transparent url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAIGNIUk0AAHomAACAhAAA+gAAAIDoAAB1MAAA6mAAADqYAAAXcJy6UTwAAAAYUExURf///2RBpWRBpWRBpWRBpWRBpWRBpf///+zQyUYAAAAGdFJOUwFdZX0lTzs4r5oAAAABYktHRAcWYYjrAAAAB3RJTUUH4AINEi42iSXRNAAAAD1JREFUCNdjYEiDAAZGGIMtjQEEUBlMCWoEGci6mGEMsxQgIy0BiB3AjLS0FAYQIw0kwABipoI1AhkBQBIAFCIXxiHgq80AAAAASUVORK5CYII=') center left no-repeat!important;\n\
  padding-left: 18px;\n\
}\n\
.linkify.twitter::before {\n\
  content: \"\";\n\
  background: transparent url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAIGNIUk0AAHomAACAhAAA+gAAAIDoAAB1MAAA6mAAADqYAAAXcJy6UTwAAAEsUExURf///1Cf21Gg3FGi31Gh3VKj4FGh3lKj4VKk4lKl41Ol5FOn51Sp6VSo6FOn5lCf21Gg3FGh3VGi31Gi31Gh3lGg3FGg3FGg3FGg3FGh3lGg3FGi31Kk4lKj4FGh3lGi31Kk4lGh3lGg3FGh3lOm5FOm5VGi31Kj4VSo6FGi31Gh3VGg3FKj4FOn51Gi31So6FWr7VOl5FGi31On51Sq6lKk4lOo51Sp6VOm5FSq61Ws7VOn51Oo51Sq61Ol5FOm5FSq61Wr7VOo51On51Sr7FWs7VSp6lGg3FGh3VOm5FWr7VSp6lKj4VOm5FSo6FSr7FWs7VWs7VWr7VSq6lOo51Om5FOo51So6FOm5VOl5FSq61Ws7VSr7FSp6lSp6VWs7lWr7VKk4lSq6v///6E3MNsAAABVdFJOUwAAAAAAAAAAAAAAAAAAAB0Ii+3xnBVTJhfsMKb+qTEp9GwBF/7lLAbo0m4pLkUTdvk2Ev3+EZnOBo/3Z8ffCRzH/D0OqPxiLnvx3UI8m9n1++GwXQZNS29BAAAAAWJLR0QAiAUdSAAAAAd0SU1FB+ACDRIwBwy67tEAAADKSURBVBjTY2BAB4xogIGRH8IQEBQSFhEVE2eQkJQC8ZmkQ8PCI2Rk5RjkIxUUlRgZlVWioqNjYlXVGNQ14iI1tbR14qLj4+MTdJkZ9PQNosJCE0OjgPz4KEMWBiPjhPiEmKQokIJ4E1MmBmazhHg4MGdlYmCzsLSC8ROsmRkZmFht4Eps7ViADmOzd4DyHZ2YmYACTOzOLmATXd04mIBOd/eQ9owFCXh5c7KB/MLi4+vnHxAYFBzCwcYEEmBi5uLm4eHl42RmAnsSAMZBLgZiFUQ5AAAAAElFTkSuQmCC') center left no-repeat!important;\n\
  padding-left: 18px;\n\
}\n\
.linkify.video::before {\n\
  content: \"\";\n\
  background: transparent url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QAxgDGAP8nNqN7AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3gMZBjQQLEEqGwAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAAA5SURBVDjLY2AYaMDIwMDwn1JD/lPCZhpwL+B1wf///ykzgBhDiAoDfIYQZQAjIyP5BuDTPJqQqAQAvW0ZAMk8+EEAAAAASUVORK5CYII=') center left no-repeat!important;\n\
  padding-left: 18px;\n\
}\n\
.linkify.vidlii::before {\n\
  content: \"\";\n\
  background: transparent url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAACvlBMVEUCWv8HXf8AWv8AAAD///8AVP+bqP8AWv8AVO4AOqUAGkgAyf8APa0AL4QABAsASdEAVv8AUv8AUv8AVP8AWP8BWv8JXv8RYv8QYv8DW/8DXP8xdv9RiP9Af/8IXf8AKP8KXv8JXf8NYf8aaf8ATP0UZP0AVf8AT/8AT/8AVv8ATedvnPVAf/8AT/sYZvl0o/8PYf8udf8aa/8FXf8AVf8AOrRBe/Nvn/8AUv0aaPkXZ/8ATv8AKYQZYuwIXf8ca/wTZP8ASP8AED0HUNwZaf8xdPwDWv8AAAAAQMRcjvQAU/8AMZssb/Jmmf8AU/8AJXsRW+dSif8AUv8AAAAASdQtdP8ATv8AQ/8AQv8APbtKgfQud/8XZ/8TZP8FXP8AKIIcZO4wdP8AF08KU95tnv4gafhZi/Rnl/ZzofcocP8AAAAAQ8Q4efRwnvVmlvVcjvgrcfsAQsQAOK0APrwAQcUEStMLXPgDWv8AHE8APLEARdIAQ80ASeEAVf8AOJkAAAAAAAAAAAAABBMAJJIAY/9rmP+vxv90n/+buPv29/7C1P+zx/n///2Crv/7+fjs8f++z/f///3l6fX9/f/L2fj9/P5ilv9Nh/3h6f6vyf/D0vT///2lwP/Z5Pf3+P9OiP9klvr9/Puzyf+QsPX//fnW4v/k6vfv8/86ev94pfj///uRtf/y8vby9f9Fgv9EgPzt7/jj7f8mcf+eufj///x1pP/Z4fT///52pf9Uivv09fnV4v8ncf64yvj7+/6vxPX///yyyf9ynvr6+vvG1/8ocv3O2/fz9v53ofX8+/nb5v+YuPz//vy0yv8vdP3e5/fn7v/p7PX09//b5P7///6eu/9Df/zq7vjc5//I1vT//v3+/v////9+q/9Tivnn6fPy8/rW4fzI1/2qwv6YtPT8+fX39/jz9PqJrveTsvqfpuxrAAAAhXRSTlMAAAAAAAAAAAAAAAAAAAAABSlERA45nrSzP3TZ7e12Ao2LusMcrJYhFwaR/uhCwP/x5tZzBWHy+n3OvA8u17jmpwgPrOz5jAF2+3FA7PdYG8fuPQaX5jAGAV/39MCmdy/e/RGz/vj5/f/rAXj4//z13n52i5qmmFQ1lqOQaTgIBAYKEAYAKGjtAgAAAKNJREFUGBkFwT0uRGEYBtD3ZJ77uT8iGrXCAixCr7OCyRA2oCKqiUYkOgoJwhqUbMAKLEChVYhk4pxswvcWfFGVEbYtuJutqir9Ibc0uh0+V+mf5gY69yN2PzKJiTjCg8qa3uLRAJpKM9AMoL1VOi9zJ4CQ9z0jwHX+RAwAURUxAMSB/L7u35wCGlKaHrDkPGVmwhlc6FN6l1iHKxupn+djAPgHrEwa+qrzy0oAAAAASUVORK5CYII=') center left no-repeat!important;\n\
  padding-left: 18px;\n\
}\n\
.linkify.vimeo::before {\n\
  content: \"\";\n\
  background: transparent url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAYFBMVEUAAAAIdZUKh6sLlLkLmr4LmsAMp88NrdYVW3MZj7Acstkrt9s1e5E7vN5EfI9JvdtKwuBijp5kpbl30eiDt8aG1uqRr7qTyNehxM+k4PCy3enB3OTg6Ovv9PXw+fz////L9U5WAAAAAXRSTlMAQObYZgAAAIFJREFUeNplz90OwiAMBWAQpAoyxclkP3je/y0H2AQXz0WT8100rRD6kNI9/cRroemQL3hXhoujZYj4OHoAmBvYGcBISwbWBvfXCrytnIDUQMkbsBpagMA7zhtQdyTFQAmIG7IkYniiZuh3XGsPqoOZkMOJOpAcLqUzNFGGu/57fwc1hgtp0mVSyQAAAABJRU5ErkJggg==') center left no-repeat!important;\n\
  padding-left: 18px;\n\
}\n\
.linkify.vine::before {\n\
  content: \"\";\n\
  background: transparent url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAIGNIUk0AAHomAACAhAAA+gAAAIDoAAB1MAAA6mAAADqYAAAXcJy6UTwAAAHCUExURQAAAAC+jwC+jwC+jwC+jwC+jwC+jwC+jwC+jwC+jwC+jwC+jwC+jwC+jwC+jwC+jwC+jwC+jwC+jwC+jwC+jwC+jwC+jwC+jwC+jwC+jwC+jwC+jwC+jwC+jwC+jwC+jwC+jwC+jwC+jwC+jwC+jwC+jwC+jwC+jwC+jwC+jwC+jwC+jwC+jwC+jwC+jwC+jwC+jwC+jwC+jwC+jwC+jwC+jwC+jwC+jwC+jwC+jwC+jwC+jwC+jwC+jwC+jwC+jwC+jwC+jwC+jwC+jwC+jwC+jwC+jwC+jwC+jwC+jwC+jwC+jwC+jwC+jwC+jwC+jwC+jwC+jwC+jwC+jwC+jwC+jwC+jwC+jwC+jwC+jwC+jwC+jwC+jwC+jwC+jwC+jwC+jwC+jwC+jwC+jwC+jwC+jwC+jwC+jwC+jwC+jwC+jwC+jwC+jwC+jwC+jwC+jwC+jwC+jwC+jwC+jwC+jwC+jwC+jwC+jwC+jwC+jwC+jwC+jwC+jwC+jwC+jwC+jwC+jwC+jwC+jwC+jwC+jwC+jwC+jwC+jwC+jwC+jwC+jwC+jwC+jwC+jwC+jwC+jwC+jwC+jwC+jwC+jwC+j////54tRLAAAACUdFJOUwAAAEK+9/e+QQIDAwEqzskfUZmUNHz2mrT++V1w+f5tCanNFUDwfEjtjAyyvg027Hki27QMBJzaHE/1+FkNsN0iZvv6bxyAlB589lQeyud0KB8PQO+ZBUrc+eXgcRG/3CoATe316Wxw/P6BAgBt+fp4IAwh0d4zM9q7Fm76qi605EMSrvfX/PRtAivF9IAJNMLxhA2KYlJ9AAAAAWJLR0SVCGB6gwAAAAd0SU1FB+ACDRI2MOJd7FgAAADrSURBVBjTLY9VWwJgGEPfiYWBha2YYHcHditgd3d3odjdivvBfgK727nYsyPiCrw03j6+fv6AaAMCgyAI1lElJBQSFh6hBxDJqOiY2Lh4SEKiIQlITmFqWrqRJkhGJrOA7Bzm5uUXsBBSVMySUpSVs6KyqrqmFmKuY30D0NjU3NLa1t6h9jvZ1Q30WGi19fb1KzAwyKFhYGSUY+MTkwpMTXNmFpibX+Di0rICWFldW9/A5tb2zu7ePtTrg0MeHePklPYzuDRw7uDF5RWvbwC32O0d7x8en55f4DHF6xv5/vHp6f/k6/vH+evuf1LAObptvSvrAAAAAElFTkSuQmCC') center left no-repeat!important;\n\
  padding-left: 18px;\n\
}\n\
.linkify.vocaroo::before {\n\
  content: \"\";\n\
  background: transparent url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAadEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41LjEwMPRyoQAAAw9JREFUOE9jYMABuMwYmCyTJKUCGlSnFSy02TTzeOyCiQcDViX26qVz2TAyYtWmEMwuoZ3M7V40LcB79pHkc0svpvzY8jD//87nxf+3Pyn8v/ZO8v+VNyP/2mZJumI1QCWSI8232Hjumitlfw5+qPp/9l8TCt76JP//xkdx/wsXWCzjtWFkwTCkbWFe9plPk/+ga4Txz/xt/D/hkN//gMXif21a+NbyWjIwoRiy6GDT5rP/mlFsPfyp5n/NpOj/22+0gMUXXIz/H7hC/L/bFKFbPDZMrHAD5H35OPt2J9zacDv/f3V7xv9FhwrBGubsT/1//Pjx/1GJ/mD+/nfl/1v3Ovy3KRJNQbHdOlXCvOO03/+pm1P/v3v37n90hhtYw9HPtf8Xb2v937cmHswHeWPRxYj/LvkK3igGKARwicTO07118H3V/5kbi/4vPZMJtK3s/6YH2f+Pfq1B8VbjWrdnMu5s4nAD9CNFhKwz5DTUvLl419zKvAcLtG1P84BRl/b/5M/6/6f/NPzf/qzo84yj0Uus0xUU4Zor54bm9+4OfZG02OCuoAMTb9ZkC9ull1Nvrr2Z+XvRpaRfc65H/68F+jl9svEhzyLFWoccWVc+eyTHq/twydjlKRln7jX9bNMkMJnbhoFRL1xCqmKx6/yi2fYXa/c5/e846PV/5fW0/7OPx/yfcjzop34ulxdGGvDuU8mMXaX507lBuiN6ueadmQeT/p/93vf/1O+G//sP5fw/eL3o/5JLif8zVxs+Tlir9S26UyeFQQvJGBE7FvaFZ9LfN+1y+WjbItSb3GmXvXd15v8zroH/HxgE/D+aGPx/18vi/z07PeZNPRKxe/Kh0Ae8toxscCO4zBkYXArk9C1SxJUYjBkYPPIVtbbuTftz3cz//2O9wP/75iSAXdO72/dt2HL5F6YlfBW4MiJYXMiBiW3t7azHBx+V/t89N+H/8a+1//e9K/9attDp5LQjYX8SuvVL8RoAkmxa65299Erq1FnHo0qrl7t4BddriIs4MrM3rfWcFd+pGwVSAwBZ0bKP8yrZPAAAAABJRU5ErkJggg==') center left no-repeat!important;\n\
  padding-left: 18px;\n\
}\n\
.linkify.youtube::before {\n\
  content: \"\";\n\
  background: transparent url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAMCAYAAABr5z2BAAABIklEQVQoz53LvUrDUBjG8bOoOammSf1IoBSvoCB4JeIqOHgBLt6AIMRBBQelWurQ2kERnMRBsBUcIp5FJSBI5oQsJVkkUHh8W0o5nhaFHvjBgef/Mq+Q46RJBMkI/vE+aOus956tnEswIZe1LV0QyJ5sE2GzgZfVMtRNIdiDpccEssdlB1mW4bvTwdvWJtRdErM7U+8S/FJykCRJX5qm+KpVce8UMNLRLbulz4iSjTAMh6Iowsd5BeNadp3nUF0VlxAEwZBotXC0Usa4ll3meZdA1iguwvf9vpvDA2wvmKgYGtSud8suDB4TyGr2PF49D/vra9jRZ1BVdknMzgwuCGSnZEObwu6sBnVTCHZiaC7BhFx2PKdxUidiAH/4lLo9Mv0DELVs9qsOHXwAAAAASUVORK5CYII=') center left no-repeat!important;\n\
  padding-left: 18px;\n\
}\n\
/* XXX Moved to end of stylesheet to avoid breaking whole stylesheet in Maxthon. */\n\
@supports (text-decoration-style: dashed) or (-moz-text-decoration-style: dashed) {\n\
  .quotelink.forwardlink,\n\
  .backlink.forwardlink {\n\
    text-decoration: underline;\n\
    -moz-text-decoration-style: dashed;\n\
    text-decoration-style: dashed;\n\
    border-bottom: none;\n\
  }\n\
}\n",

report:
"#g-recaptcha,\n\
:root:not(.js-enabled) #captchaContainerAlt {\n\
  height: auto;\n\
}\n\
#captchaContainerAlt td:nth-child(2) {\n\
  display: table-cell !important;\n\
}\n\
/* Archive reports */\n\
#archive-report {\n\
  padding: 3px;\n\
}\n\
#archive-report-enabled {\n\
  vertical-align: middle;\n\
}\n\
#archive-report > label {\n\
  display: block;\n\
}\n\
#archive-report-reason {\n\
  display: block;\n\
  width: 98%;\n\
}\n\
.archive-report-success {\n\
  color: green;\n\
}\n\
.archive-report-error {\n\
  color: red;\n\
}",

www:
"#captcha-cnt {\n\
  height: auto;\n\
}\n\
:root:not(.js-enabled) #form {\n\
  display: block;\n\
}\n\
#bd > div[style], #bd > div[style] > * {\n\
  height: auto !important;\n\
  margin: 0 !important;\n\
  font-size: 0;\n\
}\n"

};

$ = (function() {
  var $,
    slice = [].slice,
    indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  $ = function(selector, root) {
    if (root == null) {
      root = d.body;
    }
    return root.querySelector(selector);
  };

  $.DAY = 24 * ($.HOUR = 60 * ($.MINUTE = 60 * ($.SECOND = 1000)));

  $.id = function(id) {
    return d.getElementById(id);
  };

  $.ready = function(fc) {
    var cb;
    if (d.readyState !== 'loading') {
      $.queueTask(fc);
      return;
    }
    cb = function() {
      $.off(d, 'DOMContentLoaded', cb);
      return fc();
    };
    return $.on(d, 'DOMContentLoaded', cb);
  };

  $.formData = function(form) {
    var fd, key, val;
    if (form instanceof HTMLFormElement) {
      return new FormData(form);
    }
    fd = new FormData();
    for (key in form) {
      val = form[key];
      if (val) {
        if (typeof val === 'object' && 'newName' in val) {
          fd.append(key, val, val.newName);
        } else {
          fd.append(key, val);
        }
      }
    }
    return fd;
  };

  $.extend = function(object, properties) {
    var key, val;
    for (key in properties) {
      val = properties[key];
      object[key] = val;
    }
  };

  $.ajax = (function() {
    var lastModified, pageXHR;
    lastModified = {};
    if (window.wrappedJSObject && !XMLHttpRequest.wrappedJSObject) {
      pageXHR = XPCNativeWrapper(window.wrappedJSObject.XMLHttpRequest);
    } else {
      pageXHR = XMLHttpRequest;
    }
    return function(url, options, extra) {
      var err, event, form, j, len, r, ref, ref1, type, upCallbacks, whenModified;
      if (options == null) {
        options = {};
      }
      if (extra == null) {
        extra = {};
      }
      type = extra.type, whenModified = extra.whenModified, upCallbacks = extra.upCallbacks, form = extra.form;
      if (/\.json$/.test(url)) {
        if (options.responseType == null) {
          options.responseType = 'json';
        }
      }
      url = url.replace(/^((?:https?:)?\/\/(?:\w+\.)?4c(?:ha|d)n\.org)\/adv\//, '$1//adv/');
      if ($.engine === 'blink' && whenModified) {
        url += "?s=" + whenModified;
      }
      r = new pageXHR();
      type || (type = form && 'post' || 'get');
      try {
        r.open(type, url, true);
        if (whenModified) {
          if (((ref = lastModified[whenModified]) != null ? ref[url] : void 0) != null) {
            r.setRequestHeader('If-Modified-Since', lastModified[whenModified][url]);
          }
          $.on(r, 'load', function() {
            return (lastModified[whenModified] || (lastModified[whenModified] = {}))[url] = r.getResponseHeader('Last-Modified');
          });
        }
        $.extend(r, options);
        $.extend(r.upload, upCallbacks);
        $.on(r, 'error', function() {
          if (!r.status) {
            return c.error("4chan X failed to load: " + url);
          }
        });
        r.send(form);
      } catch (_error) {
        err = _error;
        if (err.result !== 0x805e0006) {
          throw err;
        }
        ref1 = ['error', 'loadend'];
        for (j = 0, len = ref1.length; j < len; j++) {
          event = ref1[j];
          r["on" + event] = options["on" + event];
          $.queueTask($.event, event, null, r);
        }
      }
      return r;
    };
  })();

  (function() {
    var reqs;
    reqs = {};
    $.cache = function(url, cb, options) {
      var err, req, rm;
      if (req = reqs[url]) {
        if (req.readyState === 4) {
          $.queueTask(function() {
            return cb.call(req, req.evt, true);
          });
        } else {
          req.callbacks.push(cb);
        }
        return req;
      }
      rm = function() {
        return delete reqs[url];
      };
      try {
        if (!(req = $.ajax(url, options))) {
          return;
        }
      } catch (_error) {
        err = _error;
        return;
      }
      $.on(req, 'load', function(e) {
        var fn1, j, len, ref;
        this.evt = e;
        ref = this.callbacks;
        fn1 = (function(_this) {
          return function(cb) {
            return $.queueTask(function() {
              return cb.call(_this, e, false);
            });
          };
        })(this);
        for (j = 0, len = ref.length; j < len; j++) {
          cb = ref[j];
          fn1(cb);
        }
        return delete this.callbacks;
      });
      $.on(req, 'abort error', rm);
      req.callbacks = [cb];
      return reqs[url] = req;
    };
    return $.cleanCache = function(testf) {
      var url;
      for (url in reqs) {
        if (testf(url)) {
          delete reqs[url];
        }
      }
    };
  })();

  $.cb = {
    checked: function() {
      $.set(this.name, this.checked);
      return Conf[this.name] = this.checked;
    },
    value: function() {
      $.set(this.name, this.value.trim());
      return Conf[this.name] = this.value;
    }
  };

  $.asap = function(test, cb) {
    if (test()) {
      return cb();
    } else {
      return setTimeout($.asap, 25, test, cb);
    }
  };

  $.onExists = function(root, selector, cb) {
    var el, observer;
    if (el = $(selector, root)) {
      return cb(el);
    }
    observer = new MutationObserver(function() {
      if (el = $(selector, root)) {
        observer.disconnect();
        return cb(el);
      }
    });
    return observer.observe(root, {
      childList: true,
      subtree: true
    });
  };

  $.addStyle = function(css, id, test) {
    var style;
    if (test == null) {
      test = 'head';
    }
    style = $.el('style', {
      textContent: css
    });
    if (id != null) {
      style.id = id;
    }
    $.onExists(doc, test, function() {
      return $.add(d.head, style);
    });
    return style;
  };

  $.addCSP = function(policy) {
    var head, meta;
    meta = $.el('meta', {
      httpEquiv: 'Content-Security-Policy',
      content: policy
    });
    if (d.head) {
      $.add(d.head, meta);
      return $.rm(meta);
    } else {
      head = $.add(doc || d, $.el('head'));
      $.add(head, meta);
      return $.rm(head);
    }
  };

  $.x = function(path, root) {
    root || (root = d.body);
    return d.evaluate(path, root, null, 8, null).singleNodeValue;
  };

  $.X = function(path, root) {
    root || (root = d.body);
    return d.evaluate(path, root, null, 7, null);
  };

  $.addClass = function() {
    var className, classNames, el, j, len;
    el = arguments[0], classNames = 2 <= arguments.length ? slice.call(arguments, 1) : [];
    for (j = 0, len = classNames.length; j < len; j++) {
      className = classNames[j];
      el.classList.add(className);
    }
  };

  $.rmClass = function() {
    var className, classNames, el, j, len;
    el = arguments[0], classNames = 2 <= arguments.length ? slice.call(arguments, 1) : [];
    for (j = 0, len = classNames.length; j < len; j++) {
      className = classNames[j];
      el.classList.remove(className);
    }
  };

  $.toggleClass = function(el, className) {
    return el.classList.toggle(className);
  };

  $.hasClass = function(el, className) {
    return indexOf.call(el.classList, className) >= 0;
  };

  $.rm = function(el) {
    return el != null ? el.remove() : void 0;
  };

  $.rmAll = function(root) {
    return root.textContent = null;
  };

  $.tn = function(s) {
    return d.createTextNode(s);
  };

  $.frag = function() {
    return d.createDocumentFragment();
  };

  $.nodes = function(nodes) {
    var frag, j, len, node;
    if (!(nodes instanceof Array)) {
      return nodes;
    }
    frag = $.frag();
    for (j = 0, len = nodes.length; j < len; j++) {
      node = nodes[j];
      frag.appendChild(node);
    }
    return frag;
  };

  $.add = function(parent, el) {
    return parent.appendChild($.nodes(el));
  };

  $.prepend = function(parent, el) {
    return parent.insertBefore($.nodes(el), parent.firstChild);
  };

  $.after = function(root, el) {
    return root.parentNode.insertBefore($.nodes(el), root.nextSibling);
  };

  $.before = function(root, el) {
    return root.parentNode.insertBefore($.nodes(el), root);
  };

  $.replace = function(root, el) {
    return root.parentNode.replaceChild($.nodes(el), root);
  };

  $.el = function(tag, properties, properties2) {
    var el;
    el = d.createElement(tag);
    if (properties) {
      $.extend(el, properties);
    }
    if (properties2) {
      $.extend(el, properties2);
    }
    return el;
  };

  $.on = function(el, events, handler) {
    var event, j, len, ref;
    ref = events.split(' ');
    for (j = 0, len = ref.length; j < len; j++) {
      event = ref[j];
      el.addEventListener(event, handler, false);
    }
  };

  $.off = function(el, events, handler) {
    var event, j, len, ref;
    ref = events.split(' ');
    for (j = 0, len = ref.length; j < len; j++) {
      event = ref[j];
      el.removeEventListener(event, handler, false);
    }
  };

  $.one = function(el, events, handler) {
    var cb;
    cb = function(e) {
      $.off(el, events, cb);
      return handler.call(this, e);
    };
    return $.on(el, events, cb);
  };

  $.event = function(event, detail, root) {
    if (root == null) {
      root = d;
    }
    if ((detail != null) && typeof cloneInto === 'function') {
      detail = cloneInto(detail, d.defaultView);
    }
    return root.dispatchEvent(new CustomEvent(event, {
      bubbles: true,
      detail: detail
    }));
  };

  (function() {
    var clone, err, ref, unsafeConstructors;
    if (!(/PaleMoon\//.test(navigator.userAgent) && +(typeof GM_info !== "undefined" && GM_info !== null ? (ref = GM_info.version) != null ? ref.split('.')[0] : void 0 : void 0) >= 2 && typeof cloneInto === 'undefined')) {
      return;
    }
    try {
      return new CustomEvent('x', {
        detail: {}
      });
    } catch (_error) {
      err = _error;
      unsafeConstructors = {
        Object: unsafeWindow.Object,
        Array: unsafeWindow.Array
      };
      clone = function(obj) {
        var constructor, key, obj2, val;
        if ((obj != null) && typeof obj === 'object' && (constructor = unsafeConstructors[obj.constructor.name])) {
          obj2 = new constructor();
          for (key in obj) {
            val = obj[key];
            obj2[key] = clone(val);
          }
          return obj2;
        } else {
          return obj;
        }
      };
      return $.event = function(event, detail, root) {
        if (root == null) {
          root = d;
        }
        return root.dispatchEvent(new CustomEvent(event, {
          bubbles: true,
          detail: clone(detail)
        }));
      };
    }
  })();

  $.modifiedClick = function(e) {
    return e.shiftKey || e.altKey || e.ctrlKey || e.metaKey || e.button !== 0;
  };

  $.open = (typeof GM !== "undefined" && GM !== null ? GM.openInTab : void 0) != null ? GM.openInTab : typeof GM_openInTab !== "undefined" && GM_openInTab !== null ? GM_openInTab : function(url) {
    return window.open(url, '_blank');
  };

  $.debounce = function(wait, fn) {
    var args, exec, lastCall, that, timeout;
    lastCall = 0;
    timeout = null;
    that = null;
    args = null;
    exec = function() {
      lastCall = Date.now();
      return fn.apply(that, args);
    };
    return function() {
      args = arguments;
      that = this;
      if (lastCall < Date.now() - wait) {
        return exec();
      }
      clearTimeout(timeout);
      return timeout = setTimeout(exec, wait);
    };
  };

  $.queueTask = (function() {
    var execTask, taskChannel, taskQueue;
    taskQueue = [];
    execTask = function() {
      var args, func, task;
      task = taskQueue.shift();
      func = task[0];
      args = Array.prototype.slice.call(task, 1);
      return func.apply(func, args);
    };
    if (window.MessageChannel) {
      taskChannel = new MessageChannel();
      taskChannel.port1.onmessage = execTask;
      return function() {
        taskQueue.push(arguments);
        return taskChannel.port2.postMessage(null);
      };
    } else {
      return function() {
        taskQueue.push(arguments);
        return setTimeout(execTask, 0);
      };
    }
  })();

  $.globalEval = function(code, data) {
    var script;
    script = $.el('script', {
      textContent: code
    });
    if (data) {
      $.extend(script.dataset, data);
    }
    $.add(d.head || doc, script);
    return $.rm(script);
  };

  $.global = function(fn, data) {
    if (doc) {
      return $.globalEval("(" + fn + ")();", data);
    } else {
      return fn();
    }
  };

  $.bytesToString = function(size) {
    var unit;
    unit = 0;
    while (size >= 1024) {
      size /= 1024;
      unit++;
    }
    size = unit > 1 ? Math.round(size * 100) / 100 : Math.round(size);
    return size + " " + ['B', 'KB', 'MB', 'GB'][unit];
  };

  $.minmax = function(value, min, max) {
    return (value < min ? min : value > max ? max : value);
  };

  $.hasAudio = function(video) {
    return video.mozHasAudio || !!video.webkitAudioDecodedByteCount;
  };

  $.engine = (function() {
    if (/Edge\//.test(navigator.userAgent)) {
      return 'edge';
    }
    if (/Chrome\//.test(navigator.userAgent)) {
      return 'blink';
    }
    if (/WebKit\//.test(navigator.userAgent)) {
      return 'webkit';
    }
    if (/Gecko\/|Goanna/.test(navigator.userAgent)) {
      return 'gecko';
    }
  })();

  $.platform = 'userscript';

  $.hasStorage = (function() {
    try {
      if (localStorage[g.NAMESPACE + 'hasStorage'] === 'true') {
        return true;
      }
      localStorage[g.NAMESPACE + 'hasStorage'] = 'true';
      return localStorage[g.NAMESPACE + 'hasStorage'] === 'true';
    } catch (_error) {
      return false;
    }
  })();

  $.item = function(key, val) {
    var item;
    item = {};
    item[key] = val;
    return item;
  };

  $.oneItemSugar = function(fn) {
    return function(key, val, cb) {
      if (typeof key === 'string') {
        return fn($.item(key, val), cb);
      } else {
        return fn(key, val);
      }
    };
  };

  $.syncing = {};

  $.securityCheck = function(data) {
    if (location.protocol !== 'https:') {
      return delete data['Redirect to HTTPS'];
    }
  };

  if (((typeof GM !== "undefined" && GM !== null ? GM.deleteValue : void 0) != null) && window.BroadcastChannel && (typeof GM_addValueChangeListener === "undefined" || GM_addValueChangeListener === null)) {
    $.syncChannel = new BroadcastChannel(g.NAMESPACE + 'sync');
    $.on($.syncChannel, 'message', function(e) {
      var cb, key, ref, results, val;
      ref = e.data;
      results = [];
      for (key in ref) {
        val = ref[key];
        if ((cb = $.syncing[key])) {
          results.push(cb(JSON.parse(JSON.stringify(val)), key));
        }
      }
      return results;
    });
    $.sync = function(key, cb) {
      return $.syncing[key] = cb;
    };
    $.forceSync = function() {};
    $["delete"] = function(keys, cb) {
      var key;
      if (!(keys instanceof Array)) {
        keys = [keys];
      }
      return Promise.all((function() {
        var j, len, results;
        results = [];
        for (j = 0, len = keys.length; j < len; j++) {
          key = keys[j];
          results.push(GM.deleteValue(g.NAMESPACE + key));
        }
        return results;
      })()).then(function() {
        var items, j, key, len;
        items = {};
        for (j = 0, len = keys.length; j < len; j++) {
          key = keys[j];
          items[key] = void 0;
        }
        $.syncChannel.postMessage(items);
        return typeof cb === "function" ? cb() : void 0;
      });
    };
    $.get = $.oneItemSugar(function(items, cb) {
      var key, keys;
      keys = Object.keys(items);
      return Promise.all((function() {
        var j, len, results;
        results = [];
        for (j = 0, len = keys.length; j < len; j++) {
          key = keys[j];
          results.push(GM.getValue(g.NAMESPACE + key));
        }
        return results;
      })()).then(function(values) {
        var i, j, len, val;
        for (i = j = 0, len = values.length; j < len; i = ++j) {
          val = values[i];
          if (val) {
            items[keys[i]] = JSON.parse(val);
          }
        }
        return cb(items);
      });
    });
    $.set = $.oneItemSugar(function(items, cb) {
      var key, val;
      $.securityCheck(items);
      return Promise.all((function() {
        var results;
        results = [];
        for (key in items) {
          val = items[key];
          results.push(GM.setValue(g.NAMESPACE + key, JSON.stringify(val)));
        }
        return results;
      })()).then(function() {
        $.syncChannel.postMessage(items);
        return typeof cb === "function" ? cb() : void 0;
      });
    });
    $.clear = function(cb) {
      return GM.listValues().then(function(keys) {
        return $["delete"](keys.map(function(key) {
          return key.replace(g.NAMESPACE, '');
        }), cb);
      });
    };
  } else {
    if (typeof GM_deleteValue === "undefined" || GM_deleteValue === null) {
      $.perProtocolSettings = true;
    }
    if (typeof GM_deleteValue !== "undefined" && GM_deleteValue !== null) {
      $.getValue = GM_getValue;
      $.listValues = function() {
        return GM_listValues();
      };
    } else if ($.hasStorage) {
      $.getValue = function(key) {
        return localStorage[key];
      };
      $.listValues = function() {
        var key, results;
        results = [];
        for (key in localStorage) {
          if (key.slice(0, g.NAMESPACE.length) === g.NAMESPACE) {
            results.push(key);
          }
        }
        return results;
      };
    } else {
      $.getValue = function() {};
      $.listValues = function() {
        return [];
      };
    }
    if (typeof GM_addValueChangeListener !== "undefined" && GM_addValueChangeListener !== null) {
      $.setValue = GM_setValue;
      $.deleteValue = GM_deleteValue;
    } else if (typeof GM_deleteValue !== "undefined" && GM_deleteValue !== null) {
      $.oldValue = {};
      $.setValue = function(key, val) {
        GM_setValue(key, val);
        if (key in $.syncing) {
          $.oldValue[key] = val;
          if ($.hasStorage) {
            return localStorage[key] = val;
          }
        }
      };
      $.deleteValue = function(key) {
        GM_deleteValue(key);
        if (key in $.syncing) {
          delete $.oldValue[key];
          if ($.hasStorage) {
            return localStorage.removeItem(key);
          }
        }
      };
      if (!$.hasStorage) {
        $.cantSync = true;
      }
    } else if ($.hasStorage) {
      $.oldValue = {};
      $.setValue = function(key, val) {
        if (key in $.syncing) {
          $.oldValue[key] = val;
        }
        return localStorage[key] = val;
      };
      $.deleteValue = function(key) {
        if (key in $.syncing) {
          delete $.oldValue[key];
        }
        return localStorage.removeItem(key);
      };
    } else {
      $.setValue = function() {};
      $.deleteValue = function() {};
      $.cantSync = $.cantSet = true;
    }
    if (typeof GM_addValueChangeListener !== "undefined" && GM_addValueChangeListener !== null) {
      $.sync = function(key, cb) {
        return $.syncing[key] = GM_addValueChangeListener(g.NAMESPACE + key, function(key2, oldValue, newValue, remote) {
          if (remote) {
            if (newValue !== void 0) {
              newValue = JSON.parse(newValue);
            }
            return cb(newValue, key);
          }
        });
      };
      $.forceSync = function() {};
    } else if ((typeof GM_deleteValue !== "undefined" && GM_deleteValue !== null) || $.hasStorage) {
      $.sync = function(key, cb) {
        key = g.NAMESPACE + key;
        $.syncing[key] = cb;
        return $.oldValue[key] = $.getValue(key);
      };
      (function() {
        var onChange;
        onChange = function(arg) {
          var cb, key, newValue;
          key = arg.key, newValue = arg.newValue;
          if (!(cb = $.syncing[key])) {
            return;
          }
          if (newValue != null) {
            if (newValue === $.oldValue[key]) {
              return;
            }
            $.oldValue[key] = newValue;
            return cb(JSON.parse(newValue), key.slice(g.NAMESPACE.length));
          } else {
            if ($.oldValue[key] == null) {
              return;
            }
            delete $.oldValue[key];
            return cb(void 0, key.slice(g.NAMESPACE.length));
          }
        };
        $.on(window, 'storage', onChange);
        return $.forceSync = function(key) {
          key = g.NAMESPACE + key;
          return onChange({
            key: key,
            newValue: $.getValue(key)
          });
        };
      })();
    } else {
      $.sync = function() {};
      $.forceSync = function() {};
    }
    $["delete"] = function(keys) {
      var j, key, len;
      if (!(keys instanceof Array)) {
        keys = [keys];
      }
      for (j = 0, len = keys.length; j < len; j++) {
        key = keys[j];
        $.deleteValue(g.NAMESPACE + key);
      }
    };
    $.get = $.oneItemSugar(function(items, cb) {
      return $.queueTask($.getSync, items, cb);
    });
    $.getSync = function(items, cb) {
      var key, val2;
      for (key in items) {
        if ((val2 = $.getValue(g.NAMESPACE + key))) {
          items[key] = JSON.parse(val2);
        }
      }
      return cb(items);
    };
    $.set = $.oneItemSugar(function(items, cb) {
      $.securityCheck(items);
      return $.queueTask(function() {
        var key, value;
        for (key in items) {
          value = items[key];
          $.setValue(g.NAMESPACE + key, JSON.stringify(value));
        }
        return typeof cb === "function" ? cb() : void 0;
      });
    });
    $.clear = function(cb) {
      $["delete"](Object.keys(Conf));
      $["delete"](['previousversion', 'QR Size', 'QR.persona', 'hiddenPSA']);
      try {
        $["delete"]($.listValues().map(function(key) {
          return key.replace(g.NAMESPACE, '');
        }));
      } catch (_error) {}
      return typeof cb === "function" ? cb() : void 0;
    };
  }

  return $;

}).call(this);

$$ = (function() {
  var $$,
    slice = [].slice;

  $$ = function(selector, root) {
    if (root == null) {
      root = d.body;
    }
    return slice.call(root.querySelectorAll(selector));
  };

  return $$;

}).call(this);

CrossOrigin = (function() {
  var CrossOrigin;

  CrossOrigin = {
    binary: function(url, cb, headers) {
      var options, ref, workaround;
      if (headers == null) {
        headers = {};
      }
      url = url.replace(/^((?:https?:)?\/\/(?:\w+\.)?4c(?:ha|d)n\.org)\/adv\//, '$1//adv/');
      workaround = $.engine === 'gecko' && (typeof GM_info !== "undefined" && GM_info !== null) && /^[0-2]\.|^3\.[01](?!\d)/.test(GM_info.version);
      workaround || (workaround = /PaleMoon\//.test(navigator.userAgent));
      workaround || (workaround = (typeof GM_info !== "undefined" && GM_info !== null ? (ref = GM_info.script) != null ? ref.includeJSB : void 0 : void 0) != null);
      options = {
        method: "GET",
        url: url,
        headers: headers,
        onload: function(xhr) {
          var contentDisposition, contentType, data, i, r, ref1, ref2;
          if (workaround) {
            r = xhr.responseText;
            data = new Uint8Array(r.length);
            i = 0;
            while (i < r.length) {
              data[i] = r.charCodeAt(i);
              i++;
            }
          } else {
            data = new Uint8Array(xhr.response);
          }
          contentType = (ref1 = xhr.responseHeaders.match(/Content-Type:\s*(.*)/i)) != null ? ref1[1] : void 0;
          contentDisposition = (ref2 = xhr.responseHeaders.match(/Content-Disposition:\s*(.*)/i)) != null ? ref2[1] : void 0;
          return cb(data, contentType, contentDisposition);
        },
        onerror: function() {
          return cb(null);
        },
        onabort: function() {
          return cb(null);
        }
      };
      if (workaround) {
        options.overrideMimeType = 'text/plain; charset=x-user-defined';
      } else {
        options.responseType = 'arraybuffer';
      }
      return ((typeof GM !== "undefined" && GM !== null ? GM.xmlHttpRequest : void 0) || GM_xmlhttpRequest)(options);
    },
    file: function(url, cb) {
      return CrossOrigin.binary(url, function(data, contentType, contentDisposition) {
        var blob, match, mime, name, ref, ref1, ref2, ref3;
        if (data == null) {
          return cb(null);
        }
        name = (ref = url.match(/([^\/]+)\/*$/)) != null ? ref[1] : void 0;
        mime = (contentType != null ? contentType.match(/[^;]*/)[0] : void 0) || 'application/octet-stream';
        match = (contentDisposition != null ? (ref1 = contentDisposition.match(/\bfilename\s*=\s*"((\\"|[^"])+)"/i)) != null ? ref1[1] : void 0 : void 0) || (contentType != null ? (ref2 = contentType.match(/\bname\s*=\s*"((\\"|[^"])+)"/i)) != null ? ref2[1] : void 0 : void 0);
        if (match) {
          name = match.replace(/\\"/g, '"');
        }
        if ((typeof GM_info !== "undefined" && GM_info !== null ? (ref3 = GM_info.script) != null ? ref3.includeJSB : void 0 : void 0) != null) {
          mime = QR.typeFromExtension[name.match(/[^.]*$/)[0].toLowerCase()] || 'application/octet-stream';
        }
        blob = new Blob([data], {
          type: mime
        });
        blob.name = name;
        return cb(blob);
      });
    },
    json: (function() {
      var callbacks, failure, results, success;
      callbacks = {};
      results = {};
      success = function(url, result) {
        var cb, j, len, ref;
        ref = callbacks[url];
        for (j = 0, len = ref.length; j < len; j++) {
          cb = ref[j];
          $.queueTask(function() {
            return cb.call(result);
          });
        }
        delete callbacks[url];
        return results[url] = result;
      };
      failure = function(url) {
        var cb, j, len, ref;
        ref = callbacks[url];
        for (j = 0, len = ref.length; j < len; j++) {
          cb = ref[j];
          $.queueTask(function() {
            return cb.call({});
          });
        }
        return delete callbacks[url];
      };
      return function(url, cb, bypassCache) {
        var req;
        if (!(((typeof GM !== "undefined" && GM !== null ? GM.xmlHttpRequest : void 0) != null) || (typeof GM_xmlhttpRequest !== "undefined" && GM_xmlhttpRequest !== null))) {
          if (bypassCache) {
            $.cleanCache(function(url2) {
              return url2 === url;
            });
          }
          if ((req = $.cache(url, cb, {
            responseType: 'json'
          }))) {
            $.on(req, 'abort error', function() {
              return cb.call({});
            });
          } else {
            cb.call({});
          }
          return;
        }
        if (bypassCache) {
          delete results[url];
        }
        if (results[url]) {
          cb.call(results[url]);
          return;
        }
        if (callbacks[url]) {
          callbacks[url].push(cb);
          return;
        }
        callbacks[url] = [cb];
        return ((typeof GM !== "undefined" && GM !== null ? GM.xmlHttpRequest : void 0) || GM_xmlhttpRequest)({
          method: "GET",
          url: url + '',
          onload: function(xhr) {
            var response, status, statusText;
            status = xhr.status, statusText = xhr.statusText;
            try {
              response = JSON.parse(xhr.responseText);
              return success(url, {
                status: status,
                statusText: statusText,
                response: response
              });
            } catch (_error) {
              return failure(url);
            }
          },
          onerror: function() {
            return failure(url);
          },
          onabort: function() {
            return failure(url);
          }
        });
      };
    })()
  };

  return CrossOrigin;

}).call(this);

Board = (function() {
  var Board;

  Board = (function() {
    Board.prototype.toString = function() {
      return this.ID;
    };

    function Board(ID) {
      var ref;
      this.ID = ID;
      this.threads = new SimpleDict();
      this.posts = new SimpleDict();
      this.config = ((ref = BoardConfig.boards) != null ? ref[this.ID] : void 0) || {};
      g.boards[this] = this;
    }

    Board.prototype.cooldowns = function() {
      var c, c2, i, key, len, ref;
      c2 = (this.config || {}).cooldowns || {};
      c = {
        thread: c2.threads || 0,
        reply: c2.replies || 0,
        image: c2.images || 0,
        thread_global: 300
      };
      if (d.cookie.indexOf('pass_enabled=1') >= 0) {
        ref = ['reply', 'image'];
        for (i = 0, len = ref.length; i < len; i++) {
          key = ref[i];
          c[key] = Math.ceil(c[key] / 2);
        }
      }
      return c;
    };

    return Board;

  })();

  return Board;

}).call(this);

Callbacks = (function() {
  var Callbacks;

  Callbacks = (function() {
    Callbacks.Post = new Callbacks('Post');

    Callbacks.Thread = new Callbacks('Thread');

    Callbacks.CatalogThread = new Callbacks('Catalog Thread');

    function Callbacks(type) {
      this.type = type;
      this.keys = [];
    }

    Callbacks.prototype.push = function(arg) {
      var cb, name;
      name = arg.name, cb = arg.cb;
      if (!this[name]) {
        this.keys.push(name);
      }
      return this[name] = cb;
    };

    Callbacks.prototype.execute = function(node, keys) {
      var err, errors, i, len, name, ref, ref1, ref2;
      if (keys == null) {
        keys = this.keys;
      }
      if (node.callbacksExecuted) {
        return;
      }
      node.callbacksExecuted = true;
      for (i = 0, len = keys.length; i < len; i++) {
        name = keys[i];
        try {
          if ((ref = this[name]) != null) {
            ref.call(node);
          }
        } catch (_error) {
          err = _error;
          if (!errors) {
            errors = [];
          }
          errors.push({
            message: ['"', name, '" crashed on node ', this.type, ' No.', node.ID, ' (', node.board, ').'].join(''),
            error: err,
            html: (ref1 = node.nodes) != null ? (ref2 = ref1.root) != null ? ref2.outerHTML : void 0 : void 0
          });
        }
      }
      if (errors) {
        return Main.handleErrors(errors);
      }
    };

    return Callbacks;

  })();

  return Callbacks;

}).call(this);

CatalogThread = (function() {
  var CatalogThread;

  CatalogThread = (function() {
    CatalogThread.prototype.toString = function() {
      return this.ID;
    };

    function CatalogThread(root, thread) {
      var post;
      this.thread = thread;
      this.ID = this.thread.ID;
      this.board = this.thread.board;
      post = this.thread.OP.nodes.post;
      this.nodes = {
        root: root,
        thumb: $('.catalog-thumb', post),
        icons: $('.catalog-icons', post),
        postCount: $('.post-count', post),
        fileCount: $('.file-count', post),
        pageCount: $('.page-count', post),
        replies: null
      };
      this.thread.catalogView = this;
    }

    return CatalogThread;

  })();

  return CatalogThread;

}).call(this);

Connection = (function() {
  var Connection,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  Connection = (function() {
    function Connection(target, origin, cb) {
      this.target = target;
      this.origin = origin;
      this.cb = cb != null ? cb : {};
      this.onMessage = bind(this.onMessage, this);
      this.send = bind(this.send, this);
      $.on(window, 'message', this.onMessage);
    }

    Connection.prototype.targetWindow = function() {
      if (this.target instanceof window.HTMLIFrameElement) {
        return this.target.contentWindow;
      } else {
        return this.target;
      }
    };

    Connection.prototype.send = function(data) {
      return this.targetWindow().postMessage("" + g.NAMESPACE + (JSON.stringify(data)), this.origin);
    };

    Connection.prototype.onMessage = function(e) {
      var base, data, type, value;
      if (!(e.source === this.targetWindow() && e.origin === this.origin && typeof e.data === 'string' && e.data.slice(0, g.NAMESPACE.length) === g.NAMESPACE)) {
        return;
      }
      data = JSON.parse(e.data.slice(g.NAMESPACE.length));
      for (type in data) {
        value = data[type];
        if (typeof (base = this.cb)[type] === "function") {
          base[type](value);
        }
      }
    };

    return Connection;

  })();

  return Connection;

}).call(this);

DataBoard = (function() {
  var DataBoard,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  DataBoard = (function() {
    DataBoard.keys = ['hiddenThreads', 'hiddenPosts', 'lastReadPosts', 'yourPosts', 'watchedThreads', 'customTitles'];

    function DataBoard(key1, sync, dontClean) {
      var init;
      this.key = key1;
      this.onSync = bind(this.onSync, this);
      this.initData(Conf[this.key]);
      $.sync(this.key, this.onSync);
      if (!dontClean) {
        this.clean();
      }
      if (!sync) {
        return;
      }
      init = (function(_this) {
        return function() {
          $.off(d, '4chanXInitFinished', init);
          return _this.sync = sync;
        };
      })(this);
      $.on(d, '4chanXInitFinished', init);
    }

    DataBoard.prototype.initData = function(data1) {
      var base, boards, lastChecked, name, ref;
      this.data = data1;
      if (this.data.boards) {
        ref = this.data, boards = ref.boards, lastChecked = ref.lastChecked;
        this.data['4chan.org'] = {
          boards: boards,
          lastChecked: lastChecked
        };
        delete this.data.boards;
        delete this.data.lastChecked;
      }
      return (base = this.data)[name = Site.hostname] || (base[name] = {
        boards: {}
      });
    };

    DataBoard.prototype.changes = [];

    DataBoard.prototype.save = function(change, cb) {
      change();
      this.changes.push(change);
      return $.get(this.key, {
        boards: {}
      }, (function(_this) {
        return function(items) {
          var i, len, needSync, ref;
          if (!_this.changes.length) {
            return;
          }
          needSync = (items[_this.key].version || 0) > (_this.data.version || 0);
          if (needSync) {
            _this.initData(items[_this.key]);
            ref = _this.changes;
            for (i = 0, len = ref.length; i < len; i++) {
              change = ref[i];
              change();
            }
          }
          _this.changes = [];
          _this.data.version = (_this.data.version || 0) + 1;
          return $.set(_this.key, _this.data, function() {
            if (needSync) {
              if (typeof _this.sync === "function") {
                _this.sync();
              }
            }
            return typeof cb === "function" ? cb() : void 0;
          });
        };
      })(this));
    };

    DataBoard.prototype.forceSync = function(cb) {
      return $.get(this.key, {
        boards: {}
      }, (function(_this) {
        return function(items) {
          var change, i, len, ref;
          if ((items[_this.key].version || 0) > (_this.data.version || 0)) {
            _this.initData(items[_this.key]);
            ref = _this.changes;
            for (i = 0, len = ref.length; i < len; i++) {
              change = ref[i];
              change();
            }
            if (typeof _this.sync === "function") {
              _this.sync();
            }
          }
          return typeof cb === "function" ? cb() : void 0;
        };
      })(this));
    };

    DataBoard.prototype["delete"] = function(arg) {
      var boardID, postID, siteID, threadID;
      siteID = arg.siteID, boardID = arg.boardID, threadID = arg.threadID, postID = arg.postID;
      siteID || (siteID = Site.hostname);
      return this.save((function(_this) {
        return function() {
          var ref;
          if (postID) {
            if (!((ref = _this.data[siteID].boards[boardID]) != null ? ref[threadID] : void 0)) {
              return;
            }
            delete _this.data[siteID].boards[boardID][threadID][postID];
            return _this.deleteIfEmpty({
              siteID: siteID,
              boardID: boardID,
              threadID: threadID
            });
          } else if (threadID) {
            if (!_this.data[siteID].boards[boardID]) {
              return;
            }
            delete _this.data[siteID].boards[boardID][threadID];
            return _this.deleteIfEmpty({
              siteID: siteID,
              boardID: boardID
            });
          } else {
            return delete _this.data[siteID].boards[boardID];
          }
        };
      })(this));
    };

    DataBoard.prototype.deleteIfEmpty = function(arg) {
      var boardID, siteID, threadID;
      siteID = arg.siteID, boardID = arg.boardID, threadID = arg.threadID;
      if (threadID) {
        if (!Object.keys(this.data[siteID].boards[boardID][threadID]).length) {
          delete this.data[siteID].boards[boardID][threadID];
          return this.deleteIfEmpty({
            siteID: siteID,
            boardID: boardID
          });
        }
      } else if (!Object.keys(this.data[siteID].boards[boardID]).length) {
        return delete this.data[siteID].boards[boardID];
      }
    };

    DataBoard.prototype.set = function(data, cb) {
      return this.save((function(_this) {
        return function() {
          return _this.setUnsafe(data);
        };
      })(this), cb);
    };

    DataBoard.prototype.setUnsafe = function(arg) {
      var base, base1, base2, boardID, postID, siteID, threadID, val;
      siteID = arg.siteID, boardID = arg.boardID, threadID = arg.threadID, postID = arg.postID, val = arg.val;
      siteID || (siteID = Site.hostname);
      if (postID !== void 0) {
        return ((base = ((base1 = this.data[siteID].boards)[boardID] || (base1[boardID] = {})))[threadID] || (base[threadID] = {}))[postID] = val;
      } else if (threadID !== void 0) {
        return ((base2 = this.data[siteID].boards)[boardID] || (base2[boardID] = {}))[threadID] = val;
      } else {
        return this.data[siteID].boards[boardID] = val;
      }
    };

    DataBoard.prototype.extend = function(arg, cb) {
      var boardID, postID, rm, siteID, threadID, val;
      siteID = arg.siteID, boardID = arg.boardID, threadID = arg.threadID, postID = arg.postID, val = arg.val, rm = arg.rm;
      return this.save((function(_this) {
        return function() {
          var i, key, len, oldVal, ref;
          oldVal = _this.get({
            siteID: siteID,
            boardID: boardID,
            threadID: threadID,
            postID: postID,
            val: {}
          });
          ref = rm || [];
          for (i = 0, len = ref.length; i < len; i++) {
            key = ref[i];
            delete oldVal[key];
          }
          $.extend(oldVal, val);
          return _this.setUnsafe({
            siteID: siteID,
            boardID: boardID,
            threadID: threadID,
            postID: postID,
            val: oldVal
          });
        };
      })(this), cb);
    };

    DataBoard.prototype.setLastChecked = function(siteID) {
      if (siteID == null) {
        siteID = Site.hostname;
      }
      return this.save((function(_this) {
        return function() {
          return _this.data[siteID].lastChecked = Date.now();
        };
      })(this));
    };

    DataBoard.prototype.get = function(arg) {
      var ID, board, boardID, defaultValue, i, len, postID, siteID, thread, threadID, val;
      siteID = arg.siteID, boardID = arg.boardID, threadID = arg.threadID, postID = arg.postID, defaultValue = arg.defaultValue;
      siteID || (siteID = Site.hostname);
      if (board = this.data[siteID].boards[boardID]) {
        if (threadID == null) {
          if (postID != null) {
            for (thread = i = 0, len = board.length; i < len; thread = ++i) {
              ID = board[thread];
              if (postID in thread) {
                val = thread[postID];
                break;
              }
            }
          } else {
            val = board;
          }
        } else if (thread = board[threadID]) {
          val = postID != null ? thread[postID] : thread;
        }
      }
      return val || defaultValue;
    };

    DataBoard.prototype.clean = function() {
      var boardID, now, ref, ref1, siteID, val;
      if (Site.software !== 'yotsuba') {
        return;
      }
      siteID = Site.hostname;
      ref = this.data[siteID].boards;
      for (boardID in ref) {
        val = ref[boardID];
        this.deleteIfEmpty({
          siteID: siteID,
          boardID: boardID
        });
      }
      now = Date.now();
      if (!((now - 2 * $.HOUR < (ref1 = this.data[siteID].lastChecked || 0) && ref1 <= now))) {
        this.data[siteID].lastChecked = now;
        for (boardID in this.data[siteID].boards) {
          this.ajaxClean(boardID);
        }
      }
    };

    DataBoard.prototype.ajaxClean = function(boardID) {
      return $.cache(location.protocol + "//a.4cdn.org/" + boardID + "/threads.json", (function(_this) {
        return function(e1) {
          var response1;
          if (e1.target.status !== 200) {
            return;
          }
          response1 = e1.target.response;
          return $.cache(location.protocol + "//a.4cdn.org/" + boardID + "/archive.json", function(e2) {
            if (!(e2.target.status === 200 || (boardID === 'b' || boardID === 'f' || boardID === 'trash' || boardID === 'bant'))) {
              return;
            }
            return _this.ajaxCleanParse(boardID, response1, e2.target.response);
          });
        };
      })(this));
    };

    DataBoard.prototype.ajaxCleanParse = function(boardID, response1, response2) {
      var ID, board, i, j, k, len, len1, len2, page, ref, siteID, thread, threads;
      siteID = Site.hostname;
      if (!(board = this.data[siteID].boards[boardID])) {
        return;
      }
      threads = {};
      if (response1) {
        for (i = 0, len = response1.length; i < len; i++) {
          page = response1[i];
          ref = page.threads;
          for (j = 0, len1 = ref.length; j < len1; j++) {
            thread = ref[j];
            ID = thread.no;
            if (ID in board) {
              threads[ID] = board[ID];
            }
          }
        }
      }
      if (response2) {
        for (k = 0, len2 = response2.length; k < len2; k++) {
          ID = response2[k];
          if (ID in board) {
            threads[ID] = board[ID];
          }
        }
      }
      this.data[siteID].boards[boardID] = threads;
      this.deleteIfEmpty({
        siteID: siteID,
        boardID: boardID
      });
      return $.set(this.key, this.data);
    };

    DataBoard.prototype.onSync = function(data) {
      if (!((data.version || 0) > (this.data.version || 0))) {
        return;
      }
      this.initData(data);
      return typeof this.sync === "function" ? this.sync() : void 0;
    };

    return DataBoard;

  })();

  return DataBoard;

}).call(this);

Fetcher = (function() {
  var Fetcher,
    slice = [].slice;

  Fetcher = (function() {
    function Fetcher(boardID1, threadID, postID1, root, quoter) {
      var board, post, ref, thread;
      this.boardID = boardID1;
      this.threadID = threadID;
      this.postID = postID1;
      this.root = root;
      this.quoter = quoter;
      if (post = g.posts[this.boardID + "." + this.postID]) {
        this.insert(post);
        return;
      }
      if ((post = (ref = Index.replyData) != null ? ref[this.boardID + "." + this.postID] : void 0) && (thread = g.threads[this.boardID + "." + this.threadID])) {
        board = g.boards[this.boardID];
        post = new Post(Build.postFromObject(post, this.boardID), thread, board);
        post.isFetchedQuote = true;
        Main.callbackNodes('Post', [post]);
        this.insert(post);
        return;
      }
      this.root.textContent = "Loading post No." + this.postID + "...";
      if (this.threadID) {
        $.cache(location.protocol + "//a.4cdn.org/" + this.boardID + "/thread/" + this.threadID + ".json", (function(_this) {
          return function(e, isCached) {
            return _this.fetchedPost(e.target, isCached);
          };
        })(this));
      } else {
        this.archivedPost();
      }
    }

    Fetcher.prototype.insert = function(post) {
      var boardID, clone, cssVersion, k, len, nodes, postID, quote, ref, ref1, ref2;
      if (!this.root.parentNode) {
        return;
      }
      this.quoter || (this.quoter = post);
      clone = post.addClone(this.quoter.context, $.hasClass(this.root, 'dialog'));
      Main.callbackNodes('Post', [clone]);
      nodes = clone.nodes;
      $.rmAll(nodes.root);
      $.add(nodes.root, nodes.post);
      ref = clone.nodes.quotelinks.concat(slice.call(clone.nodes.backlinks));
      for (k = 0, len = ref.length; k < len; k++) {
        quote = ref[k];
        ref1 = Get.postDataFromLink(quote), boardID = ref1.boardID, postID = ref1.postID;
        if (postID === this.quoter.ID && boardID === this.quoter.board.ID) {
          $.addClass(quote, 'forwardlink');
        }
      }
      if (clone.nodes.flag && !(Fetcher.flagCSS || (Fetcher.flagCSS = $('link[href^="//s.4cdn.org/css/flags."]')))) {
        cssVersion = ((ref2 = $('link[href^="//s.4cdn.org/css/"]')) != null ? ref2.href.match(/\d+(?=\.css$)|$/)[0] : void 0) || Date.now();
        Fetcher.flagCSS = $.el('link', {
          rel: 'stylesheet',
          href: "//s.4cdn.org/css/flags." + cssVersion + ".css"
        });
        $.add(d.head, Fetcher.flagCSS);
      }
      $.rmAll(this.root);
      $.add(this.root, nodes.root);
      return $.event('PostsInserted', null, this.root);
    };

    Fetcher.prototype.fetchedPost = function(req, isCached) {
      var api, board, k, len, post, posts, status, thread;
      if (post = g.posts[this.boardID + "." + this.postID]) {
        this.insert(post);
        return;
      }
      status = req.status;
      if (status !== 200) {
        if (this.archivedPost()) {
          return;
        }
        $.addClass(this.root, 'warning');
        this.root.textContent = status === 404 ? "Thread No." + this.threadID + " 404'd." : "Error " + req.statusText + " (" + req.status + ").";
        return;
      }
      posts = req.response.posts;
      Build.spoilerRange[this.boardID] = posts[0].custom_spoiler;
      for (k = 0, len = posts.length; k < len; k++) {
        post = posts[k];
        if (post.no === this.postID) {
          break;
        }
      }
      if (post.no !== this.postID) {
        if (isCached) {
          api = location.protocol + "//a.4cdn.org/" + this.boardID + "/thread/" + this.threadID + ".json";
          $.cleanCache(function(url) {
            return url === api;
          });
          $.cache(api, (function(_this) {
            return function(e) {
              return _this.fetchedPost(e.target, false);
            };
          })(this));
          return;
        }
        if (this.archivedPost()) {
          return;
        }
        $.addClass(this.root, 'warning');
        this.root.textContent = "Post No." + this.postID + " was not found.";
        return;
      }
      board = g.boards[this.boardID] || new Board(this.boardID);
      thread = g.threads[this.boardID + "." + this.threadID] || new Thread(this.threadID, board);
      post = new Post(Build.postFromObject(post, this.boardID), thread, board);
      post.isFetchedQuote = true;
      Main.callbackNodes('Post', [post]);
      return this.insert(post);
    };

    Fetcher.prototype.archivedPost = function() {
      var archive, encryptionOK, that, url;
      if (!Conf['Resurrect Quotes']) {
        return false;
      }
      if (!(url = Redirect.to('post', {
        boardID: this.boardID,
        postID: this.postID
      }))) {
        return false;
      }
      archive = Redirect.data.post[this.boardID];
      encryptionOK = /^https:\/\//.test(url) || location.protocol === 'http:';
      if (encryptionOK || Conf['Exempt Archives from Encryption']) {
        that = this;
        CrossOrigin.json(url, function() {
          var key, media, ref, ref1;
          if (!encryptionOK && ((ref = this.response) != null ? ref.media : void 0)) {
            media = this.response.media;
            for (key in media) {
              if (/_link$/.test(key)) {
                if (!((ref1 = media[key]) != null ? ref1.match(/^http:\/\//) : void 0)) {
                  delete media[key];
                }
              }
            }
          }
          return that.parseArchivedPost(this.response, url, archive);
        });
        return true;
      }
      return false;
    };

    Fetcher.prototype.parseArchivedPost = function(data, url, archive) {
      var board, comment, greentext, i, j, media_link, o, post, ref, tag, text, text2, thread, thumb_link;
      if (post = g.posts[this.boardID + "." + this.postID]) {
        this.insert(post);
        return;
      }
      if (data == null) {
        $.addClass(this.root, 'warning');
        this.root.textContent = "Error fetching Post No." + this.postID + " from " + archive.name + ".";
        return;
      }
      if (data.error) {
        $.addClass(this.root, 'warning');
        this.root.textContent = data.error;
        return;
      }
      comment = (data.comment || '').split(/(\n|\[\/?(?:b|spoiler|code|moot|banned|fortune(?: color="#\w+")?|i|red|green|blue)\])/);
      comment = (function() {
        var k, len, results;
        results = [];
        for (i = k = 0, len = comment.length; k < len; i = ++k) {
          text = comment[i];
          if (i % 2 === 1) {
            tag = this.archiveTags[text.replace(/\ .*\]/, ']')];
            if (typeof tag === 'function') {
              results.push(tag(text));
            } else {
              results.push(tag);
            }
          } else {
            greentext = text[0] === '>';
            text = text.replace(/(\[\/?[a-z]+):lit(\])/g, '$1$2');
            text = (function() {
              var l, len1, ref, results1;
              ref = text.split(/(>>(?:>\/[a-z\d]+\/)?\d+)/g);
              results1 = [];
              for (j = l = 0, len1 = ref.length; l < len1; j = ++l) {
                text2 = ref[j];
                results1.push({
                  innerHTML: ((j % 2) ? "<span class=\"deadlink\">" + E(text2) + "</span>" : E(text2))
                });
              }
              return results1;
            })();
            text = {
              innerHTML: ((greentext) ? "<span class=\"quote\">" + E.cat(text) + "</span>" : E.cat(text))
            };
            results.push(text);
          }
        }
        return results;
      }).call(this);
      comment = {
        innerHTML: E.cat(comment)
      };
      this.threadID = +data.thread_num;
      o = {
        ID: this.postID,
        threadID: this.threadID,
        boardID: this.boardID,
        isReply: this.postID !== this.threadID
      };
      o.info = {
        subject: data.title,
        email: data.email,
        name: data.name || '',
        tripcode: data.trip,
        capcode: (function() {
          switch (data.capcode) {
            case 'M':
              return 'Mod';
            case 'A':
              return 'Admin';
            case 'D':
              return 'Developer';
            case 'V':
              return 'Verified';
            case 'F':
              return 'Founder';
            case 'G':
              return 'Manager';
          }
        })(),
        uniqueID: data.poster_hash,
        flagCode: data.poster_country,
        flagCodeTroll: data.troll_country_code,
        flag: data.poster_country_name || data.troll_country_name,
        dateUTC: data.timestamp,
        dateText: data.fourchan_date,
        commentHTML: comment
      };
      if (o.info.capcode) {
        delete o.info.uniqueID;
      }
      if (data.media && !!+data.media.banned) {
        o.fileDeleted = true;
      } else if ((ref = data.media) != null ? ref.media_filename : void 0) {
        thumb_link = data.media.thumb_link;
        if ((thumb_link != null ? thumb_link[0] : void 0) === '/') {
          thumb_link = url.split('/', 3).join('/') + thumb_link;
        }
        if (!Redirect.securityCheck(thumb_link)) {
          thumb_link = '';
        }
        media_link = Redirect.to('file', {
          boardID: this.boardID,
          filename: data.media.media_orig
        });
        if (!Redirect.securityCheck(media_link)) {
          media_link = '';
        }
        o.file = {
          name: data.media.media_filename,
          url: media_link || (this.boardID === 'f' ? location.protocol + "//" + (ImageHost.flashHost()) + "/" + this.boardID + "/" + (encodeURIComponent(E(data.media.media_filename))) : location.protocol + "//" + (ImageHost.host()) + "/" + this.boardID + "/" + data.media.media_orig),
          height: data.media.media_h,
          width: data.media.media_w,
          MD5: data.media.media_hash,
          size: $.bytesToString(data.media.media_size),
          thumbURL: thumb_link || (location.protocol + "//" + (ImageHost.thumbHost()) + "/" + this.boardID + "/" + data.media.preview_orig),
          theight: data.media.preview_h,
          twidth: data.media.preview_w,
          isSpoiler: data.media.spoiler === '1'
        };
        if (!/\.pdf$/.test(o.file.url)) {
          o.file.dimensions = o.file.width + "x" + o.file.height;
        }
        if (this.boardID === 'f' && data.media.exif) {
          o.file.tag = JSON.parse(data.media.exif).Tag;
        }
      }
      board = g.boards[this.boardID] || new Board(this.boardID);
      thread = g.threads[this.boardID + "." + this.threadID] || new Thread(this.threadID, board);
      post = new Post(Build.post(o), thread, board);
      post.kill();
      if (post.file) {
        post.file.thumbURL = o.file.thumbURL;
      }
      post.isFetchedQuote = true;
      Main.callbackNodes('Post', [post]);
      return this.insert(post);
    };

    Fetcher.prototype.archiveTags = {
      '\n': {
        innerHTML: "<br>"
      },
      '[b]': {
        innerHTML: "<b>"
      },
      '[/b]': {
        innerHTML: "</b>"
      },
      '[spoiler]': {
        innerHTML: "<s>"
      },
      '[/spoiler]': {
        innerHTML: "</s>"
      },
      '[code]': {
        innerHTML: "<pre class=\"prettyprint\">"
      },
      '[/code]': {
        innerHTML: "</pre>"
      },
      '[moot]': {
        innerHTML: "<div style=\"padding:5px;margin-left:.5em;border-color:#faa;border:2px dashed rgba(255,0,0,.1);border-radius:2px\">"
      },
      '[/moot]': {
        innerHTML: "</div>"
      },
      '[banned]': {
        innerHTML: "<strong style=\"color: red;\">"
      },
      '[/banned]': {
        innerHTML: "</strong>"
      },
      '[fortune]': function(text) {
        return {
          innerHTML: "<span class=\"fortune\" style=\"color:" + E(text.match(/#\w+|$/)[0]) + "\"><b>"
        };
      },
      '[/fortune]': {
        innerHTML: "</b></span>"
      },
      '[i]': {
        innerHTML: "<span class=\"mu-i\">"
      },
      '[/i]': {
        innerHTML: "</span>"
      },
      '[red]': {
        innerHTML: "<span class=\"mu-r\">"
      },
      '[/red]': {
        innerHTML: "</span>"
      },
      '[green]': {
        innerHTML: "<span class=\"mu-g\">"
      },
      '[/green]': {
        innerHTML: "</span>"
      },
      '[blue]': {
        innerHTML: "<span class=\"mu-b\">"
      },
      '[/blue]': {
        innerHTML: "</span>"
      }
    };

    return Fetcher;

  })();

  return Fetcher;

}).call(this);

Notice = (function() {
  var Notice,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  Notice = (function() {
    function Notice(type, content, timeout, onclose) {
      this.timeout = timeout;
      this.onclose = onclose;
      this.close = bind(this.close, this);
      this.add = bind(this.add, this);
      this.el = $.el('div', {
        innerHTML: "<a href=\"javascript:;\" class=\"close fa fa-times\" title=\"Close\"></a><div class=\"message\"></div>"
      });
      this.el.style.opacity = 0;
      this.setType(type);
      $.on(this.el.firstElementChild, 'click', this.close);
      if (typeof content === 'string') {
        content = $.tn(content);
      }
      $.add(this.el.lastElementChild, content);
      $.ready(this.add);
    }

    Notice.prototype.setType = function(type) {
      return this.el.className = "notification " + type;
    };

    Notice.prototype.add = function() {
      if (this.closed) {
        return;
      }
      if (d.hidden) {
        $.on(d, 'visibilitychange', this.add);
        return;
      }
      $.off(d, 'visibilitychange', this.add);
      $.add(Header.noticesRoot, this.el);
      this.el.clientHeight;
      this.el.style.opacity = 1;
      if (this.timeout) {
        return setTimeout(this.close, this.timeout * $.SECOND);
      }
    };

    Notice.prototype.close = function() {
      this.closed = true;
      $.off(d, 'visibilitychange', this.add);
      $.rm(this.el);
      return typeof this.onclose === "function" ? this.onclose() : void 0;
    };

    return Notice;

  })();

  return Notice;

}).call(this);

Post = (function() {
  var Post,
    indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  Post = (function() {
    Post.prototype.toString = function() {
      return this.ID;
    };

    function Post(root, thread, board) {
      var clone, j, k, key, len, len1, ref, ref1, ref10, ref11, ref12, ref13, ref14, ref2, ref3, ref4, ref5, ref6, ref7, ref8, ref9, selector;
      this.thread = thread;
      this.board = board;
      this.ID = +root.id.match(/\d*$/)[0];
      this.threadID = this.thread.ID;
      this.boardID = this.board.ID;
      this.fullID = this.board + "." + this.ID;
      this.context = this;
      root.dataset.fullID = this.fullID;
      this.nodes = this.parseNodes(root);
      if (!(this.isReply = this.ID !== this.threadID)) {
        this.thread.OP = this;
        ref = ['isSticky', 'isClosed', 'isArchived'];
        for (j = 0, len = ref.length; j < len; j++) {
          key = ref[j];
          this.thread[key] = (selector = Site.selectors.icons[key]) ? !!$(selector, this.nodes.info) : false;
        }
        if (this.thread.isArchived) {
          this.thread.isClosed = true;
          this.thread.kill();
        }
      }
      this.info = {
        subject: ((ref1 = this.nodes.subject) != null ? ref1.textContent : void 0) || void 0,
        name: (ref2 = this.nodes.name) != null ? ref2.textContent : void 0,
        tripcode: (ref3 = this.nodes.tripcode) != null ? ref3.textContent : void 0,
        uniqueID: (ref4 = this.nodes.uniqueID) != null ? ref4.textContent : void 0,
        capcode: (ref5 = this.nodes.capcode) != null ? ref5.textContent.replace('## ', '') : void 0,
        pass: (ref6 = this.nodes.pass) != null ? ref6.title.match(/\d*$/)[0] : void 0,
        flagCode: (ref7 = this.nodes.flag) != null ? (ref8 = ref7.className.match(/flag-(\w+)/)) != null ? ref8[1].toUpperCase() : void 0 : void 0,
        flagCodeTroll: (ref9 = this.nodes.flag) != null ? (ref10 = ref9.src) != null ? (ref11 = ref10.match(/(\w+)\.gif$/)) != null ? ref11[1].toUpperCase() : void 0 : void 0 : void 0,
        flag: (ref12 = this.nodes.flag) != null ? ref12.title : void 0,
        date: this.nodes.date ? new Date(((ref13 = this.nodes.date.getAttribute('datetime')) != null ? ref13.trim() : void 0) || (this.nodes.date.dataset.utc * 1000)) : void 0
      };
      if (Conf['Anonymize']) {
        this.info.nameBlock = 'Anonymous';
      } else {
        this.info.nameBlock = ((this.info.name || '') + " " + (this.info.tripcode || '')).trim();
      }
      if (this.info.capcode) {
        this.info.nameBlock += " ## " + this.info.capcode;
      }
      if (this.info.uniqueID) {
        this.info.nameBlock += " (ID: " + this.info.uniqueID + ")";
      }
      this.parseComment();
      this.parseQuotes();
      this.parseFile();
      this.isDead = false;
      this.isHidden = false;
      this.clones = [];
      if (g.posts[this.fullID]) {
        this.isRebuilt = true;
        this.clones = g.posts[this.fullID].clones;
        ref14 = this.clones;
        for (k = 0, len1 = ref14.length; k < len1; k++) {
          clone = ref14[k];
          clone.origin = this;
        }
      }
      this.board.posts.push(this.ID, this);
      this.thread.posts.push(this.ID, this);
      g.posts.push(this.fullID, this);
    }

    Post.prototype.parseNodes = function(root) {
      var info, key, nodes, post, ref, s, selector;
      s = Site.selectors;
      post = $(s.post, root) || root;
      info = $(s.infoRoot, post);
      nodes = {
        root: root,
        post: post,
        info: info,
        comment: $(s.comment, post),
        quotelinks: [],
        archivelinks: [],
        embedlinks: []
      };
      ref = s.info;
      for (key in ref) {
        selector = ref[key];
        nodes[key] = $(selector, info);
      }
      if (typeof Site.parseNodes === "function") {
        Site.parseNodes(this, nodes);
      }
      nodes.uniqueIDRoot || (nodes.uniqueIDRoot = nodes.uniqueID);
      if ($.engine === 'edge') {
        Object.defineProperty(nodes, 'backlinks', {
          configurable: true,
          enumerable: true,
          get: function() {
            return post.getElementsByClassName('backlink');
          }
        });
      } else {
        nodes.backlinks = post.getElementsByClassName('backlink');
      }
      return nodes;
    };

    Post.prototype.parseComment = function() {
      var bq;
      this.nodes.comment.normalize();
      this.nodes.commentClean = bq = this.nodes.comment.cloneNode(true);
      if (typeof Site.cleanComment === "function") {
        Site.cleanComment(bq);
      }
      return this.info.comment = this.nodesToText(bq);
    };

    Post.prototype.commentDisplay = function() {
      var bq;
      bq = this.nodes.commentClean.cloneNode(true);
      if (!(Conf['Remove Spoilers'] || Conf['Reveal Spoilers'])) {
        this.cleanSpoilers(bq);
      }
      if (typeof Site.cleanCommentDisplay === "function") {
        Site.cleanCommentDisplay(bq);
      }
      return this.nodesToText(bq).trim().replace(/\s+$/gm, '');
    };

    Post.prototype.commentOrig = function() {
      var bq;
      bq = this.nodes.commentClean.cloneNode(true);
      if (typeof Site.insertTags === "function") {
        Site.insertTags(bq);
      }
      return this.nodesToText(bq);
    };

    Post.prototype.nodesToText = function(bq) {
      var i, node, nodes, text;
      text = "";
      nodes = $.X('.//br|.//text()', bq);
      i = 0;
      while (node = nodes.snapshotItem(i++)) {
        text += node.data || '\n';
      }
      return text;
    };

    Post.prototype.cleanSpoilers = function(bq) {
      var j, len, node, spoilers;
      spoilers = $$(Site.selectors.spoiler, bq);
      for (j = 0, len = spoilers.length; j < len; j++) {
        node = spoilers[j];
        $.replace(node, $.tn('[spoiler]'));
      }
    };

    Post.prototype.parseQuotes = function() {
      var j, len, quotelink, ref;
      this.quotes = [];
      ref = $$(Site.selectors.quotelink, this.nodes.comment);
      for (j = 0, len = ref.length; j < len; j++) {
        quotelink = ref[j];
        this.parseQuote(quotelink);
      }
    };

    Post.prototype.parseQuote = function(quotelink) {
      var fullID, match;
      match = quotelink.href.match(Site.regexp.quotelink);
      if (!(match || (this.isClone && quotelink.dataset.postID))) {
        return;
      }
      this.nodes.quotelinks.push(quotelink);
      if (this.isClone) {
        return;
      }
      fullID = match[1] + "." + match[3];
      if (indexOf.call(this.quotes, fullID) < 0) {
        return this.quotes.push(fullID);
      }
    };

    Post.prototype.parseFile = function() {
      var file, key, ref, ref1, selector, size, unit;
      file = {};
      ref = Site.selectors.file;
      for (key in ref) {
        selector = ref[key];
        file[key] = $(selector, this.nodes.root);
      }
      file.thumbLink = (ref1 = file.thumb) != null ? ref1.parentNode : void 0;
      if (!(file.text && file.link)) {
        return;
      }
      if (!Site.parseFile(this, file)) {
        return;
      }
      $.extend(file, {
        url: file.link.href,
        isImage: /(jpe?g|png|gif)$/i.test(file.link.href),
        isVideo: /(webm|mp4)$/i.test(file.link.href)
      });
      size = +file.size.match(/[\d.]+/)[0];
      unit = ['B', 'KB', 'MB', 'GB'].indexOf(file.size.match(/\w+$/)[0]);
      while (unit-- > 0) {
        size *= 1024;
      }
      file.sizeInBytes = size;
      return this.file = file;
    };

    Post.deadMark = $.el('span', {
      textContent: '\u00A0(Dead)',
      className: 'qmark-dead'
    });

    Post.prototype.kill = function(file) {
      var clone, j, k, len, len1, quotelink, ref, ref1, strong;
      if (file) {
        if (this.isDead || this.file.isDead) {
          return;
        }
        this.file.isDead = true;
        $.addClass(this.nodes.root, 'deleted-file');
      } else {
        if (this.isDead) {
          return;
        }
        this.isDead = true;
        $.rmClass(this.nodes.root, 'deleted-file');
        $.addClass(this.nodes.root, 'deleted-post');
      }
      if (!(strong = $('strong.warning', this.nodes.info))) {
        strong = $.el('strong', {
          className: 'warning'
        });
        $.after($('input', this.nodes.info), strong);
      }
      strong.textContent = file ? '[File deleted]' : '[Deleted]';
      if (this.isClone) {
        return;
      }
      ref = this.clones;
      for (j = 0, len = ref.length; j < len; j++) {
        clone = ref[j];
        clone.kill(file);
      }
      if (file) {
        return;
      }
      ref1 = Get.allQuotelinksLinkingTo(this);
      for (k = 0, len1 = ref1.length; k < len1; k++) {
        quotelink = ref1[k];
        if (!(!$.hasClass(quotelink, 'deadlink'))) {
          continue;
        }
        $.add(quotelink, Post.deadMark.cloneNode(true));
        $.addClass(quotelink, 'deadlink');
      }
    };

    Post.prototype.resurrect = function() {
      var clone, j, k, len, len1, quotelink, ref, ref1, strong;
      this.isDead = false;
      $.rmClass(this.nodes.root, 'deleted-post');
      strong = $('strong.warning', this.nodes.info);
      if (this.file && this.file.isDead) {
        strong.textContent = '[File deleted]';
      } else {
        $.rm(strong);
      }
      if (this.isClone) {
        return;
      }
      ref = this.clones;
      for (j = 0, len = ref.length; j < len; j++) {
        clone = ref[j];
        clone.resurrect();
      }
      ref1 = Get.allQuotelinksLinkingTo(this);
      for (k = 0, len1 = ref1.length; k < len1; k++) {
        quotelink = ref1[k];
        if (!($.hasClass(quotelink, 'deadlink'))) {
          continue;
        }
        $.rm($('.qmark-dead', quotelink));
        $.rmClass(quotelink, 'deadlink');
      }
    };

    Post.prototype.collect = function() {
      g.posts.rm(this.fullID);
      this.thread.posts.rm(this);
      return this.board.posts.rm(this);
    };

    Post.prototype.addClone = function(context, contractThumb) {
      Callbacks.Post.execute(this);
      return new Post.Clone(this, context, contractThumb);
    };

    Post.prototype.rmClone = function(index) {
      var clone, j, len, ref;
      this.clones.splice(index, 1);
      ref = this.clones.slice(index);
      for (j = 0, len = ref.length; j < len; j++) {
        clone = ref[j];
        clone.nodes.root.dataset.clone = index++;
      }
    };

    Post.prototype.setCatalogOP = function(isCatalogOP) {
      this.nodes.root.classList.toggle('catalog-container', isCatalogOP);
      this.nodes.root.classList.toggle('opContainer', !isCatalogOP);
      this.nodes.post.classList.toggle('catalog-post', isCatalogOP);
      this.nodes.post.classList.toggle('op', !isCatalogOP);
      return this.nodes.post.style.left = this.nodes.post.style.right = null;
    };

    return Post;

  })();

  return Post;

}).call(this);

(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty,
    slice = [].slice;

  Post.Clone = (function(superClass) {
    extend(_Class, superClass);

    _Class.prototype.isClone = true;

    function _Class(origin, context, contractThumb) {
      var base, i, inline, inlined, j, k, key, l, len, len1, len2, len3, node, nodes, ref, ref1, ref2, ref3, ref4, ref5, ref6, root, selector, val;
      this.origin = origin;
      this.context = context;
      ref = ['ID', 'fullID', 'board', 'thread', 'info', 'quotes', 'isReply'];
      for (i = 0, len = ref.length; i < len; i++) {
        key = ref[i];
        this[key] = this.origin[key];
      }
      nodes = this.origin.nodes;
      root = contractThumb ? this.cloneWithoutVideo(nodes.root) : nodes.root.cloneNode(true);
      (base = Post.Clone).suffix || (base.suffix = 0);
      ref1 = [root].concat(slice.call($$('[id]', root)));
      for (j = 0, len1 = ref1.length; j < len1; j++) {
        node = ref1[j];
        node.id += "_" + Post.Clone.suffix;
      }
      Post.Clone.suffix++;
      ref2 = $$('.inline', root);
      for (k = 0, len2 = ref2.length; k < len2; k++) {
        inline = ref2[k];
        $.rm(inline);
      }
      ref3 = $$('.inlined', root);
      for (l = 0, len3 = ref3.length; l < len3; l++) {
        inlined = ref3[l];
        $.rmClass(inlined, 'inlined');
      }
      this.nodes = this.parseNodes(root);
      root.hidden = false;
      $.rmClass(root, 'forwarded');
      $.rmClass(this.nodes.post, 'highlight');
      if (!this.isReply) {
        this.setCatalogOP(false);
        $.rm($('.catalog-link', this.nodes.post));
        $.rm($('.catalog-stats', this.nodes.post));
        $.rm($('.catalog-replies', this.nodes.post));
      }
      this.parseQuotes();
      this.quotes = slice.call(this.origin.quotes);
      if (this.origin.file) {
        this.file = {};
        ref4 = this.origin.file;
        for (key in ref4) {
          val = ref4[key];
          this.file[key] = val;
        }
        ref5 = Site.selectors.file;
        for (key in ref5) {
          selector = ref5[key];
          this.file[key] = $(selector, this.nodes.root);
        }
        this.file.thumbLink = (ref6 = this.file.thumb) != null ? ref6.parentNode : void 0;
        if (this.file.thumbLink) {
          this.file.fullImage = $('.full-image', this.file.thumbLink);
        }
        this.file.videoControls = $('.video-controls', this.file.text);
        if (this.file.videoThumb) {
          this.file.thumb.muted = true;
        }
        if (this.file.thumb && contractThumb) {
          ImageExpand.contract(this);
        }
      }
      if (this.origin.isDead) {
        this.isDead = true;
      }
      root.dataset.clone = this.origin.clones.push(this) - 1;
    }

    _Class.prototype.cloneWithoutVideo = function(node) {
      var child, clone, i, len, ref;
      if (node.tagName === 'VIDEO' && !node.dataset.md5) {
        return [];
      } else if (node.nodeType === Node.ELEMENT_NODE && $('video', node)) {
        clone = node.cloneNode(false);
        ref = node.childNodes;
        for (i = 0, len = ref.length; i < len; i++) {
          child = ref[i];
          $.add(clone, this.cloneWithoutVideo(child));
        }
        return clone;
      } else {
        return node.cloneNode(true);
      }
    };

    return _Class;

  })(Post);

}).call(this);

RandomAccessList = (function() {
  var RandomAccessList;

  RandomAccessList = (function() {
    function RandomAccessList(items) {
      var i, item, len;
      this.length = 0;
      if (items) {
        for (i = 0, len = items.length; i < len; i++) {
          item = items[i];
          this.push(item);
        }
      }
    }

    RandomAccessList.prototype.push = function(data) {
      var ID, item, last;
      ID = data.ID;
      ID || (ID = data.id);
      if (this[ID]) {
        return;
      }
      last = this.last;
      this[ID] = item = {
        prev: last,
        next: null,
        data: data,
        ID: ID
      };
      item.prev = last;
      this.last = last ? last.next = item : this.first = item;
      return this.length++;
    };

    RandomAccessList.prototype.before = function(root, item) {
      var prev;
      if (item.next === root || item === root) {
        return;
      }
      this.rmi(item);
      prev = root.prev;
      root.prev = item;
      item.next = root;
      item.prev = prev;
      if (prev) {
        return prev.next = item;
      } else {
        return this.first = item;
      }
    };

    RandomAccessList.prototype.after = function(root, item) {
      var next;
      if (item.prev === root || item === root) {
        return;
      }
      this.rmi(item);
      next = root.next;
      root.next = item;
      item.prev = root;
      item.next = next;
      if (next) {
        return next.prev = item;
      } else {
        return this.last = item;
      }
    };

    RandomAccessList.prototype.prepend = function(item) {
      var first;
      first = this.first;
      if (item === first || !this[item.ID]) {
        return;
      }
      this.rmi(item);
      item.next = first;
      if (first) {
        first.prev = item;
      } else {
        this.last = item;
      }
      this.first = item;
      return delete item.prev;
    };

    RandomAccessList.prototype.shift = function() {
      return this.rm(this.first.ID);
    };

    RandomAccessList.prototype.order = function() {
      var item, order;
      order = [item = this.first];
      while (item = item.next) {
        order.push(item);
      }
      return order;
    };

    RandomAccessList.prototype.rm = function(ID) {
      var item;
      item = this[ID];
      if (!item) {
        return;
      }
      delete this[ID];
      this.length--;
      this.rmi(item);
      delete item.next;
      return delete item.prev;
    };

    RandomAccessList.prototype.rmi = function(item) {
      var next, prev;
      prev = item.prev, next = item.next;
      if (prev) {
        prev.next = next;
      } else {
        this.first = next;
      }
      if (next) {
        return next.prev = prev;
      } else {
        return this.last = prev;
      }
    };

    return RandomAccessList;

  })();

  return RandomAccessList;

}).call(this);

ShimSet = (function() {
  var ShimSet;

  ShimSet = (function() {
    function ShimSet() {
      this.elements = {};
      this.size = 0;
    }

    ShimSet.prototype.has = function(value) {
      return value in this.elements;
    };

    ShimSet.prototype.add = function(value) {
      if (this.elements[value]) {
        return;
      }
      this.elements[value] = true;
      return this.size++;
    };

    ShimSet.prototype["delete"] = function(value) {
      if (!this.elements[value]) {
        return;
      }
      delete this.elements[value];
      return this.size--;
    };

    return ShimSet;

  })();

  if (!('Set' in window)) {
    window.Set = ShimSet;
  }

  return ShimSet;

}).call(this);

SimpleDict = (function() {
  var SimpleDict,
    slice = [].slice;

  SimpleDict = (function() {
    function SimpleDict() {
      this.keys = [];
    }

    SimpleDict.prototype.push = function(key, data) {
      key = "" + key;
      if (!this[key]) {
        this.keys.push(key);
      }
      return this[key] = data;
    };

    SimpleDict.prototype.rm = function(key) {
      var i;
      key = "" + key;
      if ((i = this.keys.indexOf(key)) !== -1) {
        this.keys.splice(i, 1);
        return delete this[key];
      }
    };

    SimpleDict.prototype.forEach = function(fn) {
      var j, key, len, ref;
      ref = slice.call(this.keys);
      for (j = 0, len = ref.length; j < len; j++) {
        key = ref[j];
        fn(this[key]);
      }
    };

    return SimpleDict;

  })();

  return SimpleDict;

}).call(this);

Thread = (function() {
  var Thread;

  Thread = (function() {
    Thread.prototype.toString = function() {
      return this.ID;
    };

    function Thread(ID, board) {
      this.ID = ID;
      this.board = board;
      this.fullID = this.board + "." + this.ID;
      this.posts = new SimpleDict();
      this.isDead = false;
      this.isHidden = false;
      this.isSticky = false;
      this.isClosed = false;
      this.isArchived = false;
      this.postLimit = false;
      this.fileLimit = false;
      this.ipCount = void 0;
      this.json = null;
      this.OP = null;
      this.catalogView = null;
      this.nodes = {
        root: null
      };
      this.board.threads.push(this.ID, this);
      g.threads.push(this.fullID, this);
    }

    Thread.prototype.setPage = function(pageNum) {
      var icon, info, ref, reply;
      ref = this.OP.nodes, info = ref.info, reply = ref.reply;
      if (!(icon = $('.page-num', info))) {
        icon = $.el('span', {
          className: 'page-num'
        });
        $.replace(reply.parentNode.previousSibling, [$.tn(' '), icon, $.tn(' ')]);
      }
      icon.title = "This thread is on page " + pageNum + " in the original index.";
      icon.textContent = "[" + pageNum + "]";
      if (this.catalogView) {
        return this.catalogView.nodes.pageCount.textContent = pageNum;
      }
    };

    Thread.prototype.setCount = function(type, count, reachedLimit) {
      var el;
      if (!this.catalogView) {
        return;
      }
      el = this.catalogView.nodes[type + "Count"];
      el.textContent = count;
      return (reachedLimit ? $.addClass : $.rmClass)(el, 'warning');
    };

    Thread.prototype.setStatus = function(type, status) {
      var name;
      name = "is" + type;
      if (this[name] === status) {
        return;
      }
      this[name] = status;
      if (!this.OP) {
        return;
      }
      this.setIcon('Sticky', this.isSticky);
      this.setIcon('Closed', this.isClosed && !this.isArchived);
      return this.setIcon('Archived', this.isArchived);
    };

    Thread.prototype.setIcon = function(type, status) {
      var icon, root, typeLC;
      typeLC = type.toLowerCase();
      icon = $("." + typeLC + "Icon", this.OP.nodes.info);
      if (!!icon === status) {
        return;
      }
      if (!status) {
        $.rm(icon.previousSibling);
        $.rm(icon);
        if (this.catalogView) {
          $.rm($("." + typeLC + "Icon", this.catalogView.nodes.icons));
        }
        return;
      }
      icon = $.el('img', {
        src: "" + Build.staticPath + typeLC + Build.gifIcon,
        alt: type,
        title: type,
        className: typeLC + "Icon retina"
      });
      if (g.BOARD.ID === 'f') {
        icon.style.cssText = 'height: 18px; width: 18px;';
      }
      root = type !== 'Sticky' && this.isSticky ? $('.stickyIcon', this.OP.nodes.info) : $('.page-num', this.OP.nodes.info) || this.OP.nodes.quote;
      $.after(root, [$.tn(' '), icon]);
      if (!this.catalogView) {
        return;
      }
      return (type === 'Sticky' && this.isClosed ? $.prepend : $.add)(this.catalogView.nodes.icons, icon.cloneNode());
    };

    Thread.prototype.kill = function() {
      return this.isDead = true;
    };

    Thread.prototype.collect = function() {
      var n;
      n = 0;
      this.posts.forEach(function(post) {
        if (post.clones.length) {
          return n++;
        } else {
          return post.collect();
        }
      });
      if (!n) {
        g.threads.rm(this.fullID);
        return this.board.threads.rm(this);
      }
    };

    return Thread;

  })();

  return Thread;

}).call(this);

SW = {};

(function() {
  var indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  SW.tinyboard = {
    isOPContainerThread: true,
    disabledFeatures: ['Board Configuration', 'Normalize URL', 'Captcha Configuration', 'Image Host Rewriting', 'Index Generator', 'Announcement Hiding', 'Fourchan thingies', 'Resurrect Quotes', 'Quick Reply Personas', 'Quick Reply', 'Cooldown', 'Pass Link', 'Index Generator (Menu)', 'Report Link', 'Delete Link', 'Edit Link', 'Archive Link', 'Quote Inlining', 'Quote Previewing', 'Quote Backlinks', 'File Info Formatting', 'Fappe Tyme', 'Image Expansion', 'Image Expansion (Menu)', 'Comment Expansion', 'Thread Expansion', 'Favicon', 'Unread', 'Quote Threading', 'Thread Stats', 'Thread Updater', 'Mark New IPs', 'Banner', 'Flash Features', 'Reply Pruning'],
    detect: function() {
      var i, len, m, properties, ref, root, script;
      ref = $$('script:not([src])', d.head);
      for (i = 0, len = ref.length; i < len; i++) {
        script = ref[i];
        if ((m = script.textContent.match(/\bvar configRoot=(".*?")/))) {
          properties = {};
          try {
            root = JSON.parse(m[1]);
            if (root[0] === '/') {
              properties.root = location.origin + root;
            } else if (/^https?:/.test(root)) {
              properties.root = root;
            }
          } catch (_error) {}
          return properties;
        }
      }
      return false;
    },
    urls: {
      thread: function(arg) {
        var boardID, ref, siteID, threadID;
        siteID = arg.siteID, boardID = arg.boardID, threadID = arg.threadID;
        return "" + (((ref = Conf['siteProperties'][siteID]) != null ? ref.root : void 0) || ("http://" + siteID + "/")) + boardID + "/res/" + threadID + ".html";
      }
    },
    selectors: {
      board: 'form[name="postcontrols"]',
      thread: 'div[id^="thread_"]',
      threadDivider: 'div[id^="thread_"] > hr:last-of-type',
      summary: '.omitted',
      postContainer: '.reply',
      infoRoot: '.intro',
      info: {
        subject: '.subject',
        name: '.name',
        email: '.email',
        tripcode: '.trip',
        uniqueID: '.poster_id',
        capcode: '.capcode',
        flag: '.flag',
        date: 'time',
        nameBlock: 'label',
        quote: 'a[href*="#q"]',
        reply: 'a[href*="/res/"]:not([href*="#"])'
      },
      icons: {
        isSticky: '.fa-thumb-tack',
        isClosed: '.fa-lock'
      },
      file: {
        text: '.fileinfo',
        link: '.fileinfo > a',
        thumb: 'a > .post-image'
      },
      comment: '.body',
      spoiler: '.spoiler',
      quotelink: 'a[onclick^="highlightReply("]',
      boardList: '.boardlist',
      styleSheet: '#stylesheet'
    },
    xpath: {
      thread: 'div[starts-with(@id,"thread_")]',
      postContainer: 'div[starts-with(@id,"reply_") or starts-with(@id,"thread_")]'
    },
    regexp: {
      quotelink: /\/([^\/]+)\/res\/(\d+)\.html#(\d+)$/
    },
    bgColoredEl: function() {
      return $.el('div', {
        className: 'post reply'
      });
    },
    parseNodes: function(post, nodes) {
      var m, nextSibling, uniqueID;
      if (nodes.uniqueID) {
        return;
      }
      nodes.info.normalize();
      nextSibling = nodes.nameBlock.nextSibling;
      if (nextSibling.nodeType === 3 && (m = nextSibling.textContent.match(/(\s*ID:\s*)(\S+)/))) {
        nextSibling = nextSibling.splitText(m[1].length);
        nextSibling.splitText(m[2].length);
        nodes.uniqueID = uniqueID = $.el('span', {
          className: 'poster_id'
        });
        $.replace(nextSibling, uniqueID);
        return $.add(uniqueID, nextSibling);
      }
    },
    parseFile: function(post, file) {
      var info, infoNode, link, nameNode, ref, ref1, text, thumb;
      text = file.text, link = file.link, thumb = file.thumb;
      if ($.x("ancestor::" + Site.xpath.postContainer + "[1]", text) !== post.nodes.root) {
        return false;
      }
      if (!(infoNode = indexOf.call((ref = link.nextSibling) != null ? ref.textContent : void 0, '(') >= 0 ? link.nextSibling : link.nextElementSibling)) {
        return false;
      }
      if (!(info = infoNode.textContent.match(/\((Spoiler Image, )?([\d.]+ [KMG]?B).*\)/))) {
        return false;
      }
      nameNode = $('.postfilename', text);
      $.extend(file, {
        name: nameNode ? nameNode.title || nameNode.textContent : link.pathname.match(/[^\/]*$/)[0],
        size: info[2],
        dimensions: (ref1 = info[0].match(/\d+x\d+/)) != null ? ref1[0] : void 0
      });
      if (thumb) {
        $.extend(file, {
          thumbURL: /\/static\//.test(thumb.src) && /\.(?:gif|jpe?g|png)$/.test(link.href) ? link.href : thumb.src,
          isSpoiler: !!info[1] || link.textContent === 'Spoiler Image'
        });
      }
      return true;
    },
    isThumbExpanded: function(file) {
      return $.hasClass(file.thumb.parentNode, 'expanded');
    }
  };

}).call(this);

(function() {
  var slice = [].slice;

  SW.yotsuba = {
    isOPContainerThread: false,
    urls: {
      thread: function(arg) {
        var boardID, threadID;
        boardID = arg.boardID, threadID = arg.threadID;
        return location.protocol + "//" + (BoardConfig.domain(boardID)) + "/" + boardID + "/thread/" + threadID;
      }
    },
    selectors: {
      board: '.board',
      thread: '.thread',
      threadDivider: '.board > hr',
      summary: '.summary',
      postContainer: '.postContainer',
      sideArrows: '.sideArrows',
      post: '.post',
      infoRoot: '.postInfo',
      info: {
        subject: '.subject',
        name: '.name',
        email: '.useremail',
        tripcode: '.postertrip',
        uniqueIDRoot: '.posteruid',
        uniqueID: '.posteruid > .hand',
        capcode: '.capcode.hand',
        pass: '.n-pu',
        flag: '.flag, .countryFlag',
        date: '.dateTime',
        nameBlock: '.nameBlock',
        quote: '.postNum > a:nth-of-type(2)',
        reply: '.replylink'
      },
      icons: {
        isSticky: '.stickyIcon',
        isClosed: '.closedIcon',
        isArchived: '.archivedIcon'
      },
      file: {
        text: '.file > :first-child',
        link: '.fileText > a',
        thumb: 'a.fileThumb > [data-md5]'
      },
      comment: '.postMessage',
      spoiler: 's',
      quotelink: ':not(pre) > .quotelink',
      boardList: '#boardNavDesktop > .boardList',
      styleSheet: 'link[title=switch]'
    },
    xpath: {
      thread: 'div[contains(concat(" ",@class," ")," thread ")]',
      postContainer: 'div[contains(@class,"postContainer")]'
    },
    regexp: {
      quotelink: /^https?:\/\/boards\.4chan(?:nel)?\.org\/+([^\/]+)\/+thread\/+(\d+)(?:[\/?][^#]*)?(?:#p(\d+))?$/
    },
    bgColoredEl: function() {
      return $.el('div', {
        className: 'reply'
      });
    },
    isThisPageLegit: function() {
      var ref, ref1;
      return ((ref = location.hostname) === 'lolcow.farm' || ref === 'boards.4channel.org') && d.doctype && !$('link[href*="favicon-status.ico"]', d.head) && ((ref1 = d.title) !== '4chan - Temporarily Offline' && ref1 !== '4chan - Error' && ref1 !== '504 Gateway Time-out' && ref1 !== 'MathJax Equation Source');
    },
    is404: function() {
      var ref;
      return ((ref = d.title) === '4chan - Temporarily Offline' || ref === '4chan - 404 Not Found') || (g.VIEW === 'thread' && $('.board') && !$('.opContainer'));
    },
    isIncomplete: function() {
      var ref;
      return ((ref = g.VIEW) === 'index' || ref === 'thread') && !$('.board + *');
    },
    isAuxiliaryPage: function() {
      var ref;
      return (ref = location.hostname) !== 'lolcow.farm' && ref !== 'boards.4channel.org';
    },
    scriptData: function() {
      var j, len, ref, script;
      ref = $$('script:not([src])', d.head);
      for (j = 0, len = ref.length; j < len; j++) {
        script = ref[j];
        if (/\bcooldowns *=/.test(script.textContent)) {
          return script.textContent;
        }
      }
      return '';
    },
    parseThreadMetadata: function(thread) {
      var file, m, scriptData;
      scriptData = this.scriptData();
      thread.postLimit = /\bbumplimit *= *1\b/.test(scriptData);
      thread.fileLimit = /\bimagelimit *= *1\b/.test(scriptData);
      thread.ipCount = (m = scriptData.match(/\bunique_ips *= *(\d+)\b/)) ? +m[1] : void 0;
      if (g.BOARD.ID === 'f' && thread.OP.file) {
        file = thread.OP.file;
        return $.ajax(location.protocol + "//a.4cdn.org/f/thread/" + thread + ".json", {
          timeout: $.MINUTE,
          onloadend: function() {
            if (this.response) {
              return file.text.dataset.md5 = file.MD5 = this.response.posts[0].md5;
            }
          }
        });
      }
    },
    parseNodes: function(post, nodes) {
      var icon, j, len, ref, results, type;
      if (post.boardID === 'f') {
        ref = ['Sticky', 'Closed'];
        results = [];
        for (j = 0, len = ref.length; j < len; j++) {
          type = ref[j];
          if ((icon = $("img[alt=" + type + "]", nodes.info))) {
            results.push($.addClass(icon, (type.toLowerCase()) + "Icon", 'retina'));
          }
        }
        return results;
      }
    },
    parseFile: function(post, file) {
      var info, link, m, ref, ref1, ref2, text, thumb;
      text = file.text, link = file.link, thumb = file.thumb;
      if (!(info = (ref = link.nextSibling) != null ? ref.textContent.match(/\(([\d.]+ [KMG]?B).*\)/) : void 0)) {
        return false;
      }
      $.extend(file, {
        name: text.title || link.title || link.textContent,
        size: info[1],
        dimensions: (ref1 = info[0].match(/\d+x\d+/)) != null ? ref1[0] : void 0,
        tag: (ref2 = info[0].match(/,[^,]*, ([a-z]+)\)/i)) != null ? ref2[1] : void 0,
        MD5: text.dataset.md5
      });
      if (thumb) {
        $.extend(file, {
          thumbURL: thumb.src,
          MD5: thumb.dataset.md5,
          isSpoiler: $.hasClass(thumb.parentNode, 'imgspoiler')
        });
        if (file.isSpoiler) {
          file.thumbURL = (m = link.href.match(/\d+(?=\.\w+$)/)) ? location.protocol + "//" + (ImageHost.thumbHost()) + "/" + post.board + "/" + m[0] + "s.jpg" : void 0;
        }
      }
      return true;
    },
    cleanComment: function(bq) {
      var abbr, br, i, j, k, len, node, ref;
      if ((abbr = $('.abbr', bq))) {
        ref = $$('.abbr + br, .exif', bq);
        for (j = 0, len = ref.length; j < len; j++) {
          node = ref[j];
          $.rm(node);
        }
        for (i = k = 0; k < 2; i = ++k) {
          if ((br = abbr.previousSibling) && br.nodeName === 'BR') {
            $.rm(br);
          }
        }
        return $.rm(abbr);
      }
    },
    cleanCommentDisplay: function(bq) {
      var b;
      if ((b = $('b', bq)) && /^Rolled /.test(b.textContent)) {
        $.rm(b);
      }
      return $.rm($('.fortune', bq));
    },
    insertTags: function(bq) {
      var j, k, len, len1, node, ref, ref1;
      ref = $$('s, .removed-spoiler', bq);
      for (j = 0, len = ref.length; j < len; j++) {
        node = ref[j];
        $.replace(node, [$.tn('[spoiler]')].concat(slice.call(node.childNodes), [$.tn('[/spoiler]')]));
      }
      ref1 = $$('.prettyprint', bq);
      for (k = 0, len1 = ref1.length; k < len1; k++) {
        node = ref1[k];
        $.replace(node, [$.tn('[code]')].concat(slice.call(node.childNodes), [$.tn('[/code]')]));
      }
    }
  };

}).call(this);

Site = (function() {
  var Site;

  Site = {
    defaultProperties: {
      '4chan.org': {
        software: 'yotsuba'
      },
      '4channel.org': {
        software: 'yotsuba'
      },
      '4cdn.org': {
        software: 'yotsuba'
      }
    },
    init: function(cb) {
      var hostname;
      $.extend(Conf['siteProperties'], Site.defaultProperties);
      hostname = location.hostname;
      while (hostname && !(hostname in Conf['siteProperties'])) {
        hostname = hostname.replace(/^[^.]*\.?/, '');
      }
      if (hostname && Conf['siteProperties'][hostname].software in SW) {
        this.set(hostname);
        cb();
      }
      return $.onExists(doc, 'body', (function(_this) {
        return function() {
          var base, base1, changed, changes, key, properties, software;
          for (software in SW) {
            if (!((changes = typeof (base = SW[software]).detect === "function" ? base.detect() : void 0))) {
              continue;
            }
            changes.software = software;
            hostname = location.hostname.replace(/^www\./, '');
            properties = ((base1 = Conf['siteProperties'])[hostname] || (base1[hostname] = {}));
            changed = 0;
            for (key in changes) {
              if (!(properties[key] !== changes[key])) {
                continue;
              }
              properties[key] = changes[key];
              changed++;
            }
            if (changed) {
              $.set('siteProperties', Conf['siteProperties']);
            }
            if (!_this.hostname) {
              _this.set(hostname);
              cb();
            }
            return;
          }
        };
      })(this));
    },
    set: function(hostname1) {
      this.hostname = hostname1;
      this.properties = Conf['siteProperties'][this.hostname];
      this.software = this.properties.software;
      if (this.software === 'yotsuba') {
        this.hostname = '4chan.org';
      }
      return $.extend(this, SW[this.software]);
    }
  };

  return Site;

}).call(this);

Redirect = (function() {
  var Redirect,
    indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  Redirect = {
    archives: [
      { "uid": 3, "name": "4plebs", "domain": "archive.4plebs.org", "http": true, "https": true, "software": "foolfuuka", "boards": [ "adv", "f", "hr", "o", "pol", "s4s", "sp", "tg", "trv", "tv", "x" ], "files": [ "adv", "f", "hr", "o", "pol", "s4s", "sp", "tg", "trv", "tv", "x" ], "reports": true },
      { "uid": 4, "name": "Nyafuu Archive", "domain": "archive.nyafuu.org", "http": false, "https": true, "software": "foolfuuka", "boards": [ "bant", "c", "e", "n", "news", "out", "p", "toy", "vip", "vp", "w", "wg", "wsr" ], "files": [ "bant", "c", "e", "n", "news", "out", "p", "toy", "vip", "vp", "w", "wg", "wsr" ], "reports": true },
      { "uid": 8, "name": "Rebecca Black Tech", "domain": "archive.rebeccablacktech.com", "http": false, "https": true, "software": "foolfuuka", "boards": [ "cgl", "g", "mu" ], "files": [ "cgl", "g", "mu" ], "reports": true },
      { "uid": 10, "name": "warosu", "domain": "warosu.org", "http": false, "https": true, "software": "fuuka", "boards": [ "3", "biz", "cgl", "ck", "diy", "fa", "g", "ic", "jp", "lit", "sci", "tg", "vr" ], "files": [ "3", "biz", "cgl", "ck", "diy", "fa", "g", "ic", "jp", "lit", "sci", "tg", "vr" ], "search": [ "biz", "cgl", "ck", "diy", "fa", "g", "ic", "jp", "lit", "sci", "tg", "vr" ] },
      { "uid": 23, "name": "Desuarchive", "domain": "desuarchive.org", "http": true, "https": true, "software": "foolfuuka", "boards": [ "a", "aco", "an", "c", "co", "d", "fit", "gif", "his", "int", "k", "m", "mlp", "qa", "r9k", "tg", "trash", "vr", "wsg" ], "files": [ "a", "aco", "an", "c", "co", "d", "fit", "gif", "his", "int", "k", "m", "mlp", "qa", "r9k", "tg", "trash", "vr", "wsg" ], "reports": true },
      { "uid": 24, "name": "fireden.net", "domain": "boards.fireden.net", "http": false, "https": true, "software": "foolfuuka", "boards": [ "a", "cm", "co", "ic", "sci", "tg", "v", "vg", "vip", "y" ], "files": [ "a", "cm", "co", "ic", "sci", "tg", "v", "vg", "vip", "y" ], "search": [ "a", "cm", "co", "ic", "sci", "tg", "v", "vg", "y" ] },
      { "uid": 25, "name": "arch.b4k.co", "domain": "arch.b4k.co", "http": true, "https": true, "software": "foolfuuka", "boards": [ "g", "jp", "mlp", "v" ], "files": [], "search": [ "jp", "mlp" ] },
      { "uid": 28, "name": "bstats", "domain": "archive.b-stats.org", "http": false, "https": true, "software": "foolfuuka", "boards": [ "f", "cm", "hm", "lgbt", "news", "qst", "trash", "y" ], "files": [] },
      { "uid": 29, "name": "Archived.Moe", "domain": "archived.moe", "http": true, "https": true, "software": "foolfuuka", "boards": [ "3", "a", "aco", "adv", "an", "asp", "b", "bant", "biz", "c", "can", "cgl", "ck", "cm", "co", "cock", "d", "diy", "e", "f", "fa", "fap", "fit", "fitlit", "g", "gd", "gif", "h", "hc", "his", "hm", "hr", "i", "ic", "int", "jp", "k", "lgbt", "lit", "m", "mlp", "mlpol", "mo", "mtv", "mu", "n", "news", "o", "out", "outsoc", "p", "po", "pol", "qa", "qst", "r", "r9k", "s", "s4s", "sci", "soc", "sp", "spa", "t", "tg", "toy", "trash", "trv", "tv", "u", "v", "vg", "vint", "vip", "vp", "vr", "w", "wg", "wsg", "wsr", "x", "y" ], "files": [ "can", "cock", "fap", "fitlit", "gd", "mlpol", "mo", "mtv", "outsoc", "po", "qst", "spa", "vint", "vip" ], "search": [ "aco", "adv", "an", "asp", "b", "bant", "c", "can", "cgl", "ck", "cm", "cock", "con", "d", "diy", "e", "f", "fap", "fitlit", "gd", "gif", "h", "hc", "his", "hm", "hr", "i", "ic", "lgbt", "lit", "mlpol", "mo", "mtv", "n", "news", "o", "out", "outsoc", "p", "po", "q", "qa", "qst", "r", "s", "soc", "spa", "trv", "u", "vint", "vip", "w", "wg", "wsg", "wsr", "x", "y" ], "reports": true },
      { "uid": 30, "name": "TheBArchive.com", "domain": "thebarchive.com", "http": true, "https": true, "software": "foolfuuka", "boards": [ "b", "bant" ], "files": [ "b", "bant" ], "reports": true },
      { "uid": 31, "name": "Archive Of Sins", "domain": "archiveofsins.com", "http": true, "https": true, "software": "foolfuuka", "boards": [ "h", "hc", "hm", "i", "lgbt", "r", "s", "soc", "t", "u" ], "files": [ "h", "hc", "hm", "i", "lgbt", "r", "s", "soc", "t", "u" ], "reports": true }
    ],
    init: function() {
      var now, ref;
      this.selectArchives();
      if (Conf['archiveAutoUpdate']) {
        now = Date.now();
        if (!((now - 2 * $.DAY < (ref = Conf['lastarchivecheck']) && ref <= now))) {
          return this.update();
        }
      }
    },
    selectArchives: function() {
      var archive, archives, boardID, boards, data, files, id, j, k, key, l, len, len1, len2, name, o, record, ref, ref1, ref2, software, type, uid;
      o = {
        thread: {},
        post: {},
        file: {}
      };
      archives = {};
      ref = Conf['archives'];
      for (j = 0, len = ref.length; j < len; j++) {
        data = ref[j];
        ref1 = ['boards', 'files'];
        for (k = 0, len1 = ref1.length; k < len1; k++) {
          key = ref1[k];
          if (!(data[key] instanceof Array)) {
            data[key] = [];
          }
        }
        uid = data.uid, name = data.name, boards = data.boards, files = data.files, software = data.software;
        if (software !== 'fuuka' && software !== 'foolfuuka') {
          continue;
        }
        archives[JSON.stringify(uid != null ? uid : name)] = data;
        for (l = 0, len2 = boards.length; l < len2; l++) {
          boardID = boards[l];
          if (!(boardID in o.thread)) {
            o.thread[boardID] = data;
          }
          if (!(boardID in o.post || software !== 'foolfuuka')) {
            o.post[boardID] = data;
          }
          if (!(boardID in o.file || indexOf.call(files, boardID) < 0)) {
            o.file[boardID] = data;
          }
        }
      }
      ref2 = Conf['selectedArchives'];
      for (boardID in ref2) {
        record = ref2[boardID];
        for (type in record) {
          id = record[type];
          if (!((archive = archives[JSON.stringify(id)]))) {
            continue;
          }
          boards = type === 'file' ? archive.files : archive.boards;
          if (indexOf.call(boards, boardID) >= 0) {
            o[type][boardID] = archive;
          }
        }
      }
      return Redirect.data = o;
    },
    update: function(cb) {
      var err, fail, i, j, k, len, len1, load, nloaded, ref, ref1, response, responses, url, urls;
      urls = [];
      responses = [];
      nloaded = 0;
      ref = Conf['archiveLists'].split('\n');
      for (j = 0, len = ref.length; j < len; j++) {
        url = ref[j];
        if (!(url[0] !== '#')) {
          continue;
        }
        url = url.trim();
        if (url) {
          urls.push(url);
        }
      }
      fail = function(url, action, msg) {
        return new Notice('warning', "Error " + action + " archive data from\n" + url + "\n" + msg, 20);
      };
      load = function(i) {
        return function() {
          var response;
          if (this.status !== 200) {
            return fail(urls[i], 'fetching', (this.status ? "Error " + this.statusText + " (" + this.status + ")" : 'Connection Error'));
          }
          response = this.response;
          if (!(response instanceof Array)) {
            response = [response];
          }
          responses[i] = response;
          nloaded++;
          if (nloaded === urls.length) {
            return Redirect.parse(responses, cb);
          }
        };
      };
      if (urls.length) {
        for (i = k = 0, len1 = urls.length; k < len1; i = ++k) {
          url = urls[i];
          if ((ref1 = url[0]) === '[' || ref1 === '{') {
            try {
              response = JSON.parse(url);
            } catch (_error) {
              err = _error;
              fail(url, 'parsing', err.message);
              continue;
            }
            load(i).call({
              status: 200,
              response: response
            });
          } else {
            CrossOrigin.json(url, load(i), true);
          }
        }
      } else {
        Redirect.parse([], cb);
      }
    },
    parse: function(responses, cb) {
      var archiveUIDs, archives, data, items, j, k, len, len1, ref, response, uid;
      archives = [];
      archiveUIDs = {};
      for (j = 0, len = responses.length; j < len; j++) {
        response = responses[j];
        for (k = 0, len1 = response.length; k < len1; k++) {
          data = response[k];
          uid = JSON.stringify((ref = data.uid) != null ? ref : data.name);
          if (uid in archiveUIDs) {
            $.extend(archiveUIDs[uid], data);
          } else {
            archiveUIDs[uid] = data;
            archives.push(data);
          }
        }
      }
      items = {
        archives: archives,
        lastarchivecheck: Date.now()
      };
      $.set(items);
      $.extend(Conf, items);
      Redirect.selectArchives();
      return typeof cb === "function" ? cb() : void 0;
    },
    to: function(dest, data) {
      var archive;
      archive = (dest === 'search' || dest === 'board' ? Redirect.data.thread : Redirect.data[dest])[data.boardID];
      if (!archive) {
        return '';
      }
      return Redirect[dest](archive, data);
    },
    protocol: function(archive) {
      var protocol;
      protocol = location.protocol;
      if (!archive[protocol.slice(0, -1)]) {
        protocol = protocol === 'https:' ? 'http:' : 'https:';
      }
      return protocol + "//";
    },
    thread: function(archive, arg) {
      var boardID, path, postID, threadID;
      boardID = arg.boardID, threadID = arg.threadID, postID = arg.postID;
      path = threadID ? boardID + "/thread/" + threadID : boardID + "/post/" + postID;
      if (archive.software === 'foolfuuka') {
        path += '/';
      }
      if (threadID && postID) {
        path += archive.software === 'foolfuuka' ? "#" + postID : "#p" + postID;
      }
      return "" + (Redirect.protocol(archive)) + archive.domain + "/" + path;
    },
    post: function(archive, arg) {
      var boardID, postID, protocol, url;
      boardID = arg.boardID, postID = arg.postID;
      protocol = Redirect.protocol(archive);
      url = "" + protocol + archive.domain + "/_/api/chan/post/?board=" + boardID + "&num=" + postID;
      if (!Redirect.securityCheck(url)) {
        return '';
      }
      return url;
    },
    file: function(archive, arg) {
      var boardID, filename;
      boardID = arg.boardID, filename = arg.filename;
      if (boardID === 'f') {
        filename = encodeURIComponent(Build.unescape(decodeURIComponent(filename)));
      }
      return "" + (Redirect.protocol(archive)) + archive.domain + "/" + boardID + "/full_image/" + filename;
    },
    board: function(archive, arg) {
      var boardID;
      boardID = arg.boardID;
      return "" + (Redirect.protocol(archive)) + archive.domain + "/" + boardID + "/";
    },
    search: function(archive, arg) {
      var boardID, path, type, value;
      boardID = arg.boardID, type = arg.type, value = arg.value;
      type = type === 'name' ? 'username' : type === 'MD5' ? 'image' : type;
      if (type === 'capcode') {
        value = {
          'Developer': 'dev',
          'Verified': 'ver'
        }[value] || value.toLowerCase();
      } else if (type === 'image') {
        value = value.replace(/[+\/=]/g, function(c) {
          return {
            '+': '-',
            '/': '_',
            '=': ''
          }[c];
        });
      }
      value = encodeURIComponent(value);
      path = archive.software === 'foolfuuka' ? boardID + "/search/" + type + "/" + value + "/" : type === 'image' ? boardID + "/image/" + value : boardID + "/?task=search2&search_" + type + "=" + value;
      return "" + (Redirect.protocol(archive)) + archive.domain + "/" + path;
    },
    report: function(boardID) {
      var archive, boards, domain, https, j, len, name, ref, reports, software, urls;
      urls = [];
      ref = Conf['archives'];
      for (j = 0, len = ref.length; j < len; j++) {
        archive = ref[j];
        software = archive.software, https = archive.https, reports = archive.reports, boards = archive.boards, name = archive.name, domain = archive.domain;
        if (software === 'foolfuuka' && https && reports && boards instanceof Array && indexOf.call(boards, boardID) >= 0) {
          urls.push([name, "https://" + domain + "/_/api/chan/offsite_report/"]);
        }
      }
      return urls;
    },
    securityCheck: function(url) {
      return /^https:\/\//.test(url) || location.protocol === 'http:' || Conf['Exempt Archives from Encryption'];
    },
    navigate: function(dest, data, alternative) {
      var url;
      if (!Redirect.data) {
        Redirect.init();
      }
      url = Redirect.to(dest, data);
      if (url && (Redirect.securityCheck(url) || confirm("Redirect to " + url + "?\n\nYour connection will not be encrypted."))) {
        return location.replace(url);
      } else if (alternative) {
        return location.replace(alternative);
      }
    }
  };

  return Redirect;

}).call(this);

Anonymize = (function() {
  var Anonymize;

  Anonymize = {
    init: function() {
      if (!Conf['Anonymize']) {
        return;
      }
      return $.addClass(doc, 'anonymize');
    }
  };

  return Anonymize;

}).call(this);

Filter = (function() {
  var Filter,
    indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; },
    slice = [].slice;

  Filter = {
    filters: {},
    results: {},
    init: function() {
      var base, base1, boards, err, excludes, filter, hl, i, j, key, len, len1, line, nsfwBoards, op, ref, ref1, ref2, ref3, ref4, ref5, ref6, regexp, sfwBoards, stub, top, type, types;
      if (!(((ref = g.VIEW) === 'index' || ref === 'thread') && Conf['Filter'])) {
        return;
      }
      if (!Conf['Filtered Backlinks']) {
        $.addClass(doc, 'hide-backlinks');
      }
      nsfwBoards = BoardConfig.sfwBoards(false).join(',');
      sfwBoards = BoardConfig.sfwBoards(true).join(',');
      for (key in Config.filter) {
        ref1 = Conf[key].split('\n');
        for (i = 0, len = ref1.length; i < len; i++) {
          line = ref1[i];
          if (line[0] === '#') {
            continue;
          }
          if (!(regexp = line.match(/\/(.+)\/(\w*)/))) {
            continue;
          }
          filter = line.replace(regexp[0], '');
          boards = ((ref2 = filter.match(/boards:([^;]+)/)) != null ? ref2[1].toLowerCase() : void 0) || 'global';
          boards = boards.replace('nsfw', nsfwBoards).replace('sfw', sfwBoards);
          boards = boards === 'global' ? null : boards.split(',');
          excludes = ((ref3 = filter.match(/exclude:([^;]+)/)) != null ? ref3[1].toLowerCase() : void 0) || null;
          excludes = excludes === null ? null : excludes.replace('nsfw', nsfwBoards).replace('sfw', sfwBoards).split(',');
          if (key === 'uniqueID' || key === 'MD5') {
            regexp = regexp[1];
          } else {
            try {
              regexp = RegExp(regexp[1], regexp[2]);
            } catch (_error) {
              err = _error;
              new Notice('warning', [$.tn("Invalid " + key + " filter:"), $.el('br'), $.tn(line), $.el('br'), $.tn(err.message)], 60);
              continue;
            }
          }
          op = ((ref4 = filter.match(/[^t]op:(yes|no|only)/)) != null ? ref4[1] : void 0) || 'yes';
          stub = (function() {
            var ref5;
            switch ((ref5 = filter.match(/stub:(yes|no)/)) != null ? ref5[1] : void 0) {
              case 'yes':
                return true;
              case 'no':
                return false;
              default:
                return Conf['Stubs'];
            }
          })();
          if (hl = /highlight/.test(filter)) {
            hl = ((ref5 = filter.match(/highlight:([\w-]+)/)) != null ? ref5[1] : void 0) || 'filter-highlight';
            top = ((ref6 = filter.match(/top:(yes|no)/)) != null ? ref6[1] : void 0) || 'yes';
            top = top === 'yes';
          }
          if (key === 'general') {
            if ((types = filter.match(/(?:^|;)\s*type:([^;]*)/))) {
              types = types[1].split(',').filter(function(x) {
                return x in Config.filter && x !== 'general';
              });
            } else {
              types = ['subject', 'name', 'filename', 'comment'];
            }
          }
          filter = this.createFilter(regexp, boards, excludes, op, stub, hl, top);
          if (key === 'general') {
            for (j = 0, len1 = types.length; j < len1; j++) {
              type = types[j];
              ((base = this.filters)[type] || (base[type] = [])).push(filter);
            }
          } else {
            ((base1 = this.filters)[key] || (base1[key] = [])).push(filter);
          }
        }
      }
      if (!Object.keys(this.filters).length) {
        return;
      }
      return Callbacks.Post.push({
        name: 'Filter',
        cb: this.node
      });
    },
    createFilter: function(regexp, boards, excludes, op, stub, hl, top) {
      var settings, test;
      test = typeof regexp === 'string' ? function(value) {
        return regexp === value;
      } : function(value) {
        return regexp.test(value);
      };
      settings = {
        hide: !hl,
        stub: stub,
        "class": hl,
        top: top
      };
      return function(value, boardID, isReply) {
        if (boards && indexOf.call(boards, boardID) < 0) {
          return false;
        }
        if (excludes && indexOf.call(excludes, boardID) >= 0) {
          return false;
        }
        if (isReply && op === 'only' || !isReply && op === 'no') {
          return false;
        }
        if (!test(value)) {
          return false;
        }
        return settings;
      };
    },
    test: function(post, hideable) {
      var filter, hide, hl, i, key, len, ref, ref1, result, stub, top, value;
      if (hideable == null) {
        hideable = true;
      }
      if (post.filterResults) {
        return post.filterResults;
      }
      hide = false;
      stub = true;
      hl = void 0;
      top = false;
      if (QuoteYou.isYou(post)) {
        hideable = false;
      }
      for (key in Filter.filters) {
        if (((value = Filter[key](post)) != null)) {
          ref = Filter.filters[key];
          for (i = 0, len = ref.length; i < len; i++) {
            filter = ref[i];
            if ((result = filter(value, post.boardID, post.isReply))) {
              if (result.hide) {
                if (hideable) {
                  hide = true;
                  stub && (stub = result.stub);
                }
              } else {
                if (!(hl && (ref1 = result["class"], indexOf.call(hl, ref1) >= 0))) {
                  (hl || (hl = [])).push(result["class"]);
                }
                top || (top = result.top);
              }
            }
          }
        }
      }
      if (hide) {
        return {
          hide: hide,
          stub: stub
        };
      } else {
        return {
          hl: hl,
          top: top
        };
      }
    },
    node: function() {
      var hide, hl, ref, stub, top;
      if (this.isClone) {
        return;
      }
      ref = Filter.test(this, !this.isFetchedQuote && (this.isReply || g.VIEW === 'index')), hide = ref.hide, stub = ref.stub, hl = ref.hl, top = ref.top;
      if (hide) {
        if (this.isReply) {
          PostHiding.hide(this, stub);
        } else {
          ThreadHiding.hide(this.thread, stub);
        }
      } else {
        if (hl) {
          this.highlights = hl;
          $.addClass.apply($, [this.nodes.root].concat(slice.call(hl)));
        }
      }
    },
    isHidden: function(post) {
      return !!Filter.test(post).hide;
    },
    postID: function(post) {
      return "" + post.ID;
    },
    name: function(post) {
      return post.info.name;
    },
    uniqueID: function(post) {
      return post.info.uniqueID;
    },
    tripcode: function(post) {
      return post.info.tripcode;
    },
    capcode: function(post) {
      return post.info.capcode;
    },
    pass: function(post) {
      return post.info.pass;
    },
    subject: function(post) {
      return post.info.subject || (post.isReply ? void 0 : '');
    },
    comment: function(post) {
      var base;
      return (base = post.info).comment != null ? base.comment : base.comment = Build.parseComment(post.info.commentHTML.innerHTML);
    },
    flag: function(post) {
      return post.info.flag;
    },
    filename: function(post) {
      var ref;
      return (ref = post.file) != null ? ref.name : void 0;
    },
    dimensions: function(post) {
      var ref;
      return (ref = post.file) != null ? ref.dimensions : void 0;
    },
    filesize: function(post) {
      var ref;
      return (ref = post.file) != null ? ref.size : void 0;
    },
    MD5: function(post) {
      var ref;
      return (ref = post.file) != null ? ref.MD5 : void 0;
    },
    addFilter: function(type, re, cb) {
      return $.get(type, Conf[type], function(item) {
        var save;
        save = item[type];
        save = save ? save + "\n" + re : re;
        return $.set(type, save, cb);
      });
    },
    quickFilterMD5: function() {
      var origin, post;
      post = Get.postFromNode(this);
      if (!post.file) {
        return;
      }
      Filter.addFilter('MD5', "/" + post.file.MD5 + "/");
      origin = post.origin || post;
      if (origin.isReply) {
        PostHiding.hide(origin);
      } else if (g.VIEW === 'index') {
        ThreadHiding.hide(origin.thread);
      }
      if (post.nodes.post.getBoundingClientRect().height) {
        return new Notice('info', 'MD5 filtered.', 2);
      }
    },
    escape: function(value) {
      return value.replace(/\/|\\|\^|\$|\n|\.|\(|\)|\{|\}|\[|\]|\?|\*|\+|\|/g, function(c) {
        if (c === '\n') {
          return '\\n';
        } else if (c === '\\') {
          return '\\\\';
        } else {
          return "\\" + c;
        }
      });
    },
    menu: {
      init: function() {
        var div, entry, i, len, ref, ref1, type;
        if (!(((ref = g.VIEW) === 'index' || ref === 'thread') && Conf['Menu'] && Conf['Filter'])) {
          return;
        }
        div = $.el('div', {
          textContent: 'Filter'
        });
        entry = {
          el: div,
          order: 50,
          open: function(post) {
            Filter.menu.post = post;
            return true;
          },
          subEntries: []
        };
        ref1 = [['Name', 'name'], ['Unique ID', 'uniqueID'], ['Tripcode', 'tripcode'], ['Capcode', 'capcode'], ['Pass Date', 'pass'], ['Subject', 'subject'], ['Comment', 'comment'], ['Flag', 'flag'], ['Filename', 'filename'], ['Image dimensions', 'dimensions'], ['Filesize', 'filesize'], ['Image MD5', 'MD5']];
        for (i = 0, len = ref1.length; i < len; i++) {
          type = ref1[i];
          entry.subEntries.push(Filter.menu.createSubEntry(type[0], type[1]));
        }
        return Menu.menu.addEntry(entry);
      },
      createSubEntry: function(text, type) {
        var el;
        el = $.el('a', {
          href: 'javascript:;',
          textContent: text
        });
        el.dataset.type = type;
        $.on(el, 'click', Filter.menu.makeFilter);
        return {
          el: el,
          open: function(post) {
            var value;
            value = Filter[type](post);
            return value != null;
          }
        };
      },
      makeFilter: function() {
        var re, type, value;
        type = this.dataset.type;
        value = Filter[type](Filter.menu.post);
        re = type === 'uniqueID' || type === 'MD5' ? value : Filter.escape(value);
        re = type === 'uniqueID' || type === 'MD5' ? "/" + re + "/" : "/^" + re + "$/";
        return Filter.addFilter(type, re, function() {
          var section, select;
          Settings.open('Filter');
          section = $('.section-container');
          select = $('select[name=filter]', section);
          select.value = type;
          Settings.selectFilter.call(select);
          return $.onExists(section, 'textarea', function(ta) {
            var tl;
            tl = ta.textLength;
            ta.setSelectionRange(tl, tl);
            return ta.focus();
          });
        });
      }
    }
  };

  return Filter;

}).call(this);

PostHiding = (function() {
  var PostHiding;

  PostHiding = {
    init: function() {
      var ref;
      if (((ref = g.VIEW) !== 'index' && ref !== 'thread') || !Conf['Reply Hiding Buttons'] && !(Conf['Menu'] && Conf['Reply Hiding Link'])) {
        return;
      }
      if (Conf['Reply Hiding Buttons']) {
        $.addClass(doc, "reply-hide");
      }
      this.db = new DataBoard('hiddenPosts');
      return Callbacks.Post.push({
        name: 'Reply Hiding',
        cb: this.node
      });
    },
    isHidden: function(boardID, threadID, postID) {
      return !!(PostHiding.db && PostHiding.db.get({
        boardID: boardID,
        threadID: threadID,
        postID: postID
      }));
    },
    node: function() {
      var button, data, sa, sideArrows;
      if (!this.isReply || this.isClone || this.isFetchedQuote) {
        return;
      }
      if (data = PostHiding.db.get({
        boardID: this.board.ID,
        threadID: this.thread.ID,
        postID: this.ID
      })) {
        if (data.thisPost) {
          PostHiding.hide(this, data.makeStub, data.hideRecursively);
        } else {
          Recursive.apply(PostHiding.hide, this, data.makeStub, true);
          Recursive.add(PostHiding.hide, this, data.makeStub, true);
        }
      }
      if (!Conf['Reply Hiding Buttons']) {
        return;
      }
      button = PostHiding.makeButton(this, 'hide');
      if ((sa = Site.selectors.sideArrows)) {
        sideArrows = $(sa, this.nodes.root);
        $.replace(sideArrows.firstChild, button);
        return sideArrows.removeAttribute('class');
      } else {
        return $.prepend(this.nodes.root, button);
      }
    },
    menu: {
      init: function() {
        var apply, div, hideStubLink, makeStub, ref, replies, thisPost;
        if (((ref = g.VIEW) !== 'index' && ref !== 'thread') || !Conf['Menu'] || !Conf['Reply Hiding Link']) {
          return;
        }
        div = $.el('div', {
          className: 'hide-reply-link',
          textContent: 'Hide'
        });
        apply = $.el('a', {
          textContent: 'Apply',
          href: 'javascript:;'
        });
        $.on(apply, 'click', PostHiding.menu.hide);
        thisPost = UI.checkbox('thisPost', 'This post', true);
        replies = UI.checkbox('replies', 'Hide replies', Conf['Recursive Hiding']);
        makeStub = UI.checkbox('makeStub', 'Make stub', Conf['Stubs']);
        Menu.menu.addEntry({
          el: div,
          order: 20,
          open: function(post) {
            if (!post.isReply || post.isClone || post.isHidden) {
              return false;
            }
            PostHiding.menu.post = post;
            return true;
          },
          subEntries: [
            {
              el: apply
            }, {
              el: thisPost
            }, {
              el: replies
            }, {
              el: makeStub
            }
          ]
        });
        div = $.el('div', {
          className: 'show-reply-link',
          textContent: 'Show'
        });
        apply = $.el('a', {
          textContent: 'Apply',
          href: 'javascript:;'
        });
        $.on(apply, 'click', PostHiding.menu.show);
        thisPost = UI.checkbox('thisPost', 'This post', false);
        replies = UI.checkbox('replies', 'Show replies', false);
        hideStubLink = $.el('a', {
          textContent: 'Hide stub',
          href: 'javascript:;'
        });
        $.on(hideStubLink, 'click', PostHiding.menu.hideStub);
        Menu.menu.addEntry({
          el: div,
          order: 20,
          open: function(post) {
            var data;
            if (!post.isReply || post.isClone || !post.isHidden) {
              return false;
            }
            if (!(data = PostHiding.db.get({
              boardID: post.board.ID,
              threadID: post.thread.ID,
              postID: post.ID
            }))) {
              return false;
            }
            PostHiding.menu.post = post;
            thisPost.firstChild.checked = post.isHidden;
            replies.firstChild.checked = (data != null ? data.hideRecursively : void 0) != null ? data.hideRecursively : Conf['Recursive Hiding'];
            return true;
          },
          subEntries: [
            {
              el: apply
            }, {
              el: thisPost
            }, {
              el: replies
            }
          ]
        });
        return Menu.menu.addEntry({
          el: hideStubLink,
          order: 15,
          open: function(post) {
            var data;
            if (!post.isReply || post.isClone || !post.isHidden) {
              return false;
            }
            if (!(data = PostHiding.db.get({
              boardID: post.board.ID,
              threadID: post.thread.ID,
              postID: post.ID
            }))) {
              return false;
            }
            return PostHiding.menu.post = post;
          }
        });
      },
      hide: function() {
        var makeStub, parent, post, replies, thisPost;
        parent = this.parentNode;
        thisPost = $('input[name=thisPost]', parent).checked;
        replies = $('input[name=replies]', parent).checked;
        makeStub = $('input[name=makeStub]', parent).checked;
        post = PostHiding.menu.post;
        if (thisPost) {
          PostHiding.hide(post, makeStub, replies);
        } else if (replies) {
          Recursive.apply(PostHiding.hide, post, makeStub, true);
          Recursive.add(PostHiding.hide, post, makeStub, true);
        } else {
          return;
        }
        PostHiding.saveHiddenState(post, true, thisPost, makeStub, replies);
        return $.event('CloseMenu');
      },
      show: function() {
        var data, parent, post, replies, thisPost;
        parent = this.parentNode;
        thisPost = $('input[name=thisPost]', parent).checked;
        replies = $('input[name=replies]', parent).checked;
        post = PostHiding.menu.post;
        if (thisPost) {
          PostHiding.show(post, replies);
        } else if (replies) {
          Recursive.apply(PostHiding.show, post, true);
          Recursive.rm(PostHiding.hide, post, true);
        } else {
          return;
        }
        if (data = PostHiding.db.get({
          boardID: post.board.ID,
          threadID: post.thread.ID,
          postID: post.ID
        })) {
          PostHiding.saveHiddenState(post, !(thisPost && replies), !thisPost, data.makeStub, !replies);
        }
        return $.event('CloseMenu');
      },
      hideStub: function() {
        var data, post;
        post = PostHiding.menu.post;
        if (data = PostHiding.db.get({
          boardID: post.board.ID,
          threadID: post.thread.ID,
          postID: post.ID
        })) {
          PostHiding.show(post, data.hideRecursively);
          PostHiding.hide(post, false, data.hideRecursively);
          PostHiding.saveHiddenState(post, true, true, false, data.hideRecursively);
        }
        $.event('CloseMenu');
      }
    },
    makeButton: function(post, type) {
      var a, span;
      span = $.el('span', {
        className: "fa fa-" + (type === 'hide' ? 'minus' : 'plus') + "-square-o",
        textContent: ""
      });
      a = $.el('a', {
        className: type + "-reply-button",
        href: 'javascript:;'
      });
      $.add(a, span);
      $.on(a, 'click', PostHiding.toggle);
      return a;
    },
    saveHiddenState: function(post, isHiding, thisPost, makeStub, hideRecursively) {
      var data;
      data = {
        boardID: post.board.ID,
        threadID: post.thread.ID,
        postID: post.ID
      };
      if (isHiding) {
        data.val = {
          thisPost: thisPost !== false,
          makeStub: makeStub,
          hideRecursively: hideRecursively
        };
        return PostHiding.db.set(data);
      } else {
        return PostHiding.db["delete"](data);
      }
    },
    toggle: function() {
      var post;
      post = Get.postFromNode(this);
      PostHiding[(post.isHidden ? 'show' : 'hide')](post);
      return PostHiding.saveHiddenState(post, post.isHidden);
    },
    hide: function(post, makeStub, hideRecursively) {
      var a, i, len, quotelink, ref;
      if (makeStub == null) {
        makeStub = Conf['Stubs'];
      }
      if (hideRecursively == null) {
        hideRecursively = Conf['Recursive Hiding'];
      }
      if (post.isHidden) {
        return;
      }
      post.isHidden = true;
      if (hideRecursively) {
        Recursive.apply(PostHiding.hide, post, makeStub, true);
        Recursive.add(PostHiding.hide, post, makeStub, true);
      }
      ref = Get.allQuotelinksLinkingTo(post);
      for (i = 0, len = ref.length; i < len; i++) {
        quotelink = ref[i];
        $.addClass(quotelink, 'filtered');
      }
      if (!makeStub) {
        post.nodes.root.hidden = true;
        return;
      }
      a = PostHiding.makeButton(post, 'show');
      $.add(a, $.tn(" " + post.info.nameBlock));
      post.nodes.stub = $.el('div', {
        className: 'stub'
      });
      $.add(post.nodes.stub, a);
      if (Conf['Menu']) {
        $.add(post.nodes.stub, Menu.makeButton(post));
      }
      return $.prepend(post.nodes.root, post.nodes.stub);
    },
    show: function(post, showRecursively) {
      var i, len, quotelink, ref;
      if (showRecursively == null) {
        showRecursively = Conf['Recursive Hiding'];
      }
      if (post.nodes.stub) {
        $.rm(post.nodes.stub);
        delete post.nodes.stub;
      } else {
        post.nodes.root.hidden = false;
      }
      post.isHidden = false;
      if (showRecursively) {
        Recursive.apply(PostHiding.show, post, true);
        Recursive.rm(PostHiding.hide, post);
      }
      ref = Get.allQuotelinksLinkingTo(post);
      for (i = 0, len = ref.length; i < len; i++) {
        quotelink = ref[i];
        $.rmClass(quotelink, 'filtered');
      }
    }
  };

  return PostHiding;

}).call(this);

Recursive = (function() {
  var Recursive,
    slice = [].slice,
    indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  Recursive = {
    recursives: {},
    init: function() {
      var ref;
      if ((ref = g.VIEW) !== 'index' && ref !== 'thread') {
        return;
      }
      return Callbacks.Post.push({
        name: 'Recursive',
        cb: this.node
      });
    },
    node: function() {
      var i, j, k, len, len1, obj, quote, recursive, ref, ref1;
      if (this.isClone || this.isFetchedQuote) {
        return;
      }
      ref = this.quotes;
      for (j = 0, len = ref.length; j < len; j++) {
        quote = ref[j];
        if (obj = Recursive.recursives[quote]) {
          ref1 = obj.recursives;
          for (i = k = 0, len1 = ref1.length; k < len1; i = ++k) {
            recursive = ref1[i];
            recursive.apply(null, [this].concat(slice.call(obj.args[i])));
          }
        }
      }
    },
    add: function() {
      var args, base, name, obj, post, recursive;
      recursive = arguments[0], post = arguments[1], args = 3 <= arguments.length ? slice.call(arguments, 2) : [];
      obj = (base = Recursive.recursives)[name = post.fullID] || (base[name] = {
        recursives: [],
        args: []
      });
      obj.recursives.push(recursive);
      return obj.args.push(args);
    },
    rm: function(recursive, post) {
      var i, j, len, obj, rec, ref;
      if (!(obj = Recursive.recursives[post.fullID])) {
        return;
      }
      ref = obj.recursives;
      for (i = j = 0, len = ref.length; j < len; i = ++j) {
        rec = ref[i];
        if (!(rec === recursive)) {
          continue;
        }
        obj.recursives.splice(i, 1);
        obj.args.splice(i, 1);
      }
    },
    apply: function() {
      var args, fullID, post, recursive;
      recursive = arguments[0], post = arguments[1], args = 3 <= arguments.length ? slice.call(arguments, 2) : [];
      fullID = post.fullID;
      return g.posts.forEach(function(post) {
        if (indexOf.call(post.quotes, fullID) >= 0) {
          return recursive.apply(null, [post].concat(slice.call(args)));
        }
      });
    }
  };

  return Recursive;

}).call(this);

ThreadHiding = (function() {
  var ThreadHiding;

  ThreadHiding = {
    init: function() {
      var ref;
      if (((ref = g.VIEW) !== 'index' && ref !== 'catalog') || !Conf['Thread Hiding Buttons'] && !(Conf['Menu'] && Conf['Thread Hiding Link']) && !Conf['JSON Index']) {
        return;
      }
      this.db = new DataBoard('hiddenThreads');
      if (g.VIEW === 'catalog') {
        return this.catalogWatch();
      }
      this.catalogSet(g.BOARD);
      $.on(d, 'IndexRefreshInternal', this.onIndexRefresh);
      if (Conf['Thread Hiding Buttons']) {
        $.addClass(doc, 'thread-hide');
      }
      return Callbacks.Post.push({
        name: 'Thread Hiding',
        cb: this.node
      });
    },
    catalogSet: function(board) {
      var hiddenThreads, threadID;
      if (!($.hasStorage && Site.software === 'yotsuba')) {
        return;
      }
      hiddenThreads = ThreadHiding.db.get({
        boardID: board.ID,
        defaultValue: {}
      });
      for (threadID in hiddenThreads) {
        hiddenThreads[threadID] = true;
      }
      return localStorage.setItem("4chan-hide-t-" + board, JSON.stringify(hiddenThreads));
    },
    catalogWatch: function() {
      if (!($.hasStorage && Site.software === 'yotsuba')) {
        return;
      }
      this.hiddenThreads = JSON.parse(localStorage.getItem("4chan-hide-t-" + g.BOARD)) || {};
      return Main.ready(function() {
        return new MutationObserver(ThreadHiding.catalogSave).observe($.id('threads'), {
          attributes: true,
          subtree: true,
          attributeFilter: ['style']
        });
      });
    },
    catalogSave: function() {
      var hiddenThreads2, threadID;
      hiddenThreads2 = JSON.parse(localStorage.getItem("4chan-hide-t-" + g.BOARD)) || {};
      for (threadID in hiddenThreads2) {
        if (!(threadID in ThreadHiding.hiddenThreads)) {
          ThreadHiding.db.set({
            boardID: g.BOARD.ID,
            threadID: threadID,
            val: {
              makeStub: Conf['Stubs']
            }
          });
        }
      }
      for (threadID in ThreadHiding.hiddenThreads) {
        if (!(threadID in hiddenThreads2)) {
          ThreadHiding.db["delete"]({
            boardID: g.BOARD.ID,
            threadID: threadID
          });
        }
      }
      return ThreadHiding.hiddenThreads = hiddenThreads2;
    },
    isHidden: function(boardID, threadID) {
      return !!(ThreadHiding.db && ThreadHiding.db.get({
        boardID: boardID,
        threadID: threadID
      }));
    },
    node: function() {
      var data;
      if (this.isReply || this.isClone || this.isFetchedQuote) {
        return;
      }
      if (data = ThreadHiding.db.get({
        boardID: this.board.ID,
        threadID: this.ID
      })) {
        ThreadHiding.hide(this.thread, data.makeStub);
      }
      if (!Conf['Thread Hiding Buttons']) {
        return;
      }
      return $.prepend(this.nodes.root, ThreadHiding.makeButton(this.thread, 'hide'));
    },
    onIndexRefresh: function() {
      return g.BOARD.threads.forEach(function(thread) {
        var root;
        root = thread.nodes.root;
        if (thread.isHidden && thread.stub && !root.contains(thread.stub)) {
          return ThreadHiding.makeStub(thread, root);
        }
      });
    },
    menu: {
      init: function() {
        var apply, div, hideStubLink, makeStub;
        if (g.VIEW !== 'index' || !Conf['Menu'] || !Conf['Thread Hiding Link']) {
          return;
        }
        div = $.el('div', {
          className: 'hide-thread-link',
          textContent: 'Hide'
        });
        apply = $.el('a', {
          textContent: 'Apply',
          href: 'javascript:;'
        });
        $.on(apply, 'click', ThreadHiding.menu.hide);
        makeStub = UI.checkbox('Stubs', 'Make stub');
        Menu.menu.addEntry({
          el: div,
          order: 20,
          open: function(arg) {
            var isReply, thread;
            thread = arg.thread, isReply = arg.isReply;
            if (isReply || thread.isHidden || Conf['JSON Index'] && Conf['Index Mode'] === 'catalog') {
              return false;
            }
            ThreadHiding.menu.thread = thread;
            return true;
          },
          subEntries: [
            {
              el: apply
            }, {
              el: makeStub
            }
          ]
        });
        div = $.el('a', {
          className: 'show-thread-link',
          textContent: 'Show',
          href: 'javascript:;'
        });
        $.on(div, 'click', ThreadHiding.menu.show);
        Menu.menu.addEntry({
          el: div,
          order: 20,
          open: function(arg) {
            var isReply, thread;
            thread = arg.thread, isReply = arg.isReply;
            if (isReply || !thread.isHidden || Conf['JSON Index'] && Conf['Index Mode'] === 'catalog') {
              return false;
            }
            ThreadHiding.menu.thread = thread;
            return true;
          }
        });
        hideStubLink = $.el('a', {
          textContent: 'Hide stub',
          href: 'javascript:;'
        });
        $.on(hideStubLink, 'click', ThreadHiding.menu.hideStub);
        return Menu.menu.addEntry({
          el: hideStubLink,
          order: 15,
          open: function(arg) {
            var isReply, thread;
            thread = arg.thread, isReply = arg.isReply;
            if (isReply || !thread.isHidden || Conf['JSON Index'] && Conf['Index Mode'] === 'catalog') {
              return false;
            }
            return ThreadHiding.menu.thread = thread;
          }
        });
      },
      hide: function() {
        var makeStub, thread;
        makeStub = $('input', this.parentNode).checked;
        thread = ThreadHiding.menu.thread;
        ThreadHiding.hide(thread, makeStub);
        ThreadHiding.saveHiddenState(thread, makeStub);
        return $.event('CloseMenu');
      },
      show: function() {
        var thread;
        thread = ThreadHiding.menu.thread;
        ThreadHiding.show(thread);
        ThreadHiding.saveHiddenState(thread);
        return $.event('CloseMenu');
      },
      hideStub: function() {
        var thread;
        thread = ThreadHiding.menu.thread;
        ThreadHiding.show(thread);
        ThreadHiding.hide(thread, false);
        ThreadHiding.saveHiddenState(thread, false);
        $.event('CloseMenu');
      }
    },
    makeButton: function(thread, type) {
      var a;
      a = $.el('a', {
        className: type + "-thread-button",
        href: 'javascript:;'
      });
      $.extend(a, {
        innerHTML: "<span class=\"fa fa-" + ((type === "hide") ? "minus" : "plus") + "-square\"></span>"
      });
      a.dataset.fullID = thread.fullID;
      $.on(a, 'click', ThreadHiding.toggle);
      return a;
    },
    makeStub: function(thread, root) {
      var a, numReplies, summary;
      numReplies = $$('.thread > .replyContainer', root).length;
      if (summary = $('.summary', root)) {
        numReplies += +summary.textContent.match(/\d+/);
      }
      a = ThreadHiding.makeButton(thread, 'show');
      $.add(a, $.tn(" " + thread.OP.info.nameBlock + " (" + (numReplies === 1 ? '1 reply' : numReplies + " replies") + ")"));
      thread.stub = $.el('div', {
        className: 'stub'
      });
      if (Conf['Menu']) {
        $.add(thread.stub, [a, Menu.makeButton(thread.OP)]);
      } else {
        $.add(thread.stub, a);
      }
      return $.prepend(root, thread.stub);
    },
    saveHiddenState: function(thread, makeStub) {
      if (thread.isHidden) {
        ThreadHiding.db.set({
          boardID: thread.board.ID,
          threadID: thread.ID,
          val: {
            makeStub: makeStub
          }
        });
      } else {
        ThreadHiding.db["delete"]({
          boardID: thread.board.ID,
          threadID: thread.ID
        });
      }
      return ThreadHiding.catalogSet(thread.board);
    },
    toggle: function(thread) {
      if (!(thread instanceof Thread)) {
        thread = g.threads[this.dataset.fullID];
      }
      if (thread.isHidden) {
        ThreadHiding.show(thread);
      } else {
        ThreadHiding.hide(thread);
      }
      return ThreadHiding.saveHiddenState(thread);
    },
    hide: function(thread, makeStub) {
      var threadRoot;
      if (makeStub == null) {
        makeStub = Conf['Stubs'];
      }
      if (thread.isHidden) {
        return;
      }
      threadRoot = thread.nodes.root;
      thread.isHidden = true;
      Index.updateHideLabel();
      if (thread.catalogView && !Index.showHiddenThreads) {
        $.rm(thread.catalogView.nodes.root);
      }
      if (!makeStub) {
        return threadRoot.hidden = true;
      }
      return ThreadHiding.makeStub(thread, threadRoot);
    },
    show: function(thread) {
      var threadRoot;
      if (thread.stub) {
        $.rm(thread.stub);
        delete thread.stub;
      }
      threadRoot = thread.nodes.root;
      threadRoot.hidden = thread.isHidden = false;
      Index.updateHideLabel();
      if (thread.catalogView && Index.showHiddenThreads) {
        return $.rm(thread.catalogView.nodes.root);
      }
    }
  };

  return ThreadHiding;

}).call(this);

BoardConfig = (function() {
  var BoardConfig;

  BoardConfig = {
    cbs: [],
    init: function() {
      var boards, now, ref, ref1, troll_flags;
      now = Date.now();
      if (!((now - 2 * $.HOUR < (ref = Conf['boardConfig'].lastChecked || 0) && ref <= now) && Conf['boardConfig'].troll_flags)) {
        return $.ajax(location.protocol + "//a.4cdn.org/boards.json", {
          onloadend: this.load
        });
      } else {
        ref1 = Conf['boardConfig'], boards = ref1.boards, troll_flags = ref1.troll_flags;
        return this.set(boards, troll_flags);
      }
    },
    load: function() {
      var board, boards, err, i, len, ref, ref1, troll_flags;
      if (this.status === 200 && this.response && this.response.boards) {
        boards = {};
        ref = this.response.boards;
        for (i = 0, len = ref.length; i < len; i++) {
          board = ref[i];
          boards[board.board] = board;
        }
        troll_flags = this.response.troll_flags;
        $.set('boardConfig', {
          boards: boards,
          troll_flags: troll_flags,
          lastChecked: Date.now()
        });
      } else {
        ref1 = Conf['boardConfig'], boards = ref1.boards, troll_flags = ref1.troll_flags;
        err = (function() {
          switch (this.status) {
            case 0:
              return 'Connection Error';
            case 200:
              return 'Invalid Data';
            default:
              return "Error " + this.statusText + " (" + this.status + ")";
          }
        }).call(this);
        new Notice('warning', "Failed to load board configuration. " + err, 20);
      }
      return BoardConfig.set(boards, troll_flags);
    },
    set: function(boards1, troll_flags1) {
      var ID, board, cb, i, len, ref, ref1;
      this.boards = boards1;
      this.troll_flags = troll_flags1;
      ref = g.boards;
      for (ID in ref) {
        board = ref[ID];
        board.config = this.boards[ID] || {};
      }
      ref1 = this.cbs;
      for (i = 0, len = ref1.length; i < len; i++) {
        cb = ref1[i];
        $.queueTask(cb);
      }
    },
    ready: function(cb) {
      if (this.boards) {
        return cb();
      } else {
        return this.cbs.push(cb);
      }
    },
    sfwBoards: function(sfw) {
      var board, data, ref, results;
      ref = this.boards || Conf['boardConfig'].boards;
      results = [];
      for (board in ref) {
        data = ref[board];
        if (!!data.ws_board === sfw) {
          results.push(board);
        }
      }
      return results;
    },
    isSFW: function(board) {
      var ref;
      return !!((ref = (this.boards || Conf['boardConfig'].boards)[board]) != null ? ref.ws_board : void 0);
    },
    domain: function(board) {
      return "boards." + (BoardConfig.isSFW(board) ? '4channel' : '4chan') + ".org";
    },
    noAudio: function(boardID) {
      var boards;
      if (Site.software !== 'yotsuba') {
        return false;
      }
      boards = this.boards || Conf['boardConfig'].boards;
      return boards && boards[boardID] && !boards[boardID].webm_audio;
    },
    title: function(boardID) {
      var ref, ref1;
      return ((ref = this.boards || Conf['boardConfig'].boards) != null ? (ref1 = ref[boardID]) != null ? ref1.title : void 0 : void 0) || '';
    }
  };

  return BoardConfig;

}).call(this);

Build = (function() {
  var Build,
    slice = [].slice;

  Build = {
    staticPath: '//s.4cdn.org/image/',
    gifIcon: window.devicePixelRatio >= 2 ? '@2x.gif' : '.gif',
    spoilerRange: {},
    unescape: function(text) {
      if (text == null) {
        return text;
      }
      return text.replace(/<[^>]*>/g, '').replace(/&(amp|#039|quot|lt|gt|#44);/g, function(c) {
        return {
          '&amp;': '&',
          '&#039;': "'",
          '&quot;': '"',
          '&lt;': '<',
          '&gt;': '>',
          '&#44;': ','
        }[c];
      });
    },
    shortFilename: function(filename) {
      var ext;
      ext = filename.match(/\.?[^\.]*$/)[0];
      if (filename.length - ext.length > 30) {
        return (filename.match(/(?:[\uD800-\uDBFF][\uDC00-\uDFFF]|[^]){0,25}/)[0]) + "(...)" + ext;
      } else {
        return filename;
      }
    },
    spoilerThumb: function(boardID) {
      var spoilerRange;
      if (spoilerRange = Build.spoilerRange[boardID]) {
        return Build.staticPath + "spoiler-" + boardID + (Math.floor(1 + spoilerRange * Math.random())) + ".png";
      } else {
        return Build.staticPath + "spoiler.png";
      }
    },
    sameThread: function(boardID, threadID) {
      return g.VIEW === 'thread' && g.BOARD.ID === boardID && g.THREADID === +threadID;
    },
    postURL: function(boardID, threadID, postID) {
      if (Build.sameThread(boardID, threadID)) {
        return "#p" + postID;
      } else {
        return "/" + boardID + "/thread/" + threadID + "#p" + postID;
      }
    },
    parseJSON: function(data, boardID) {
      var o;
      o = {
        ID: data.no,
        threadID: data.resto || data.no,
        boardID: boardID,
        isReply: !!data.resto,
        isSticky: !!data.sticky,
        isClosed: !!data.closed,
        isArchived: !!data.archived,
        fileDeleted: !!data.filedeleted,
        xa18: data.xa18
      };
      o.info = {
        subject: Build.unescape(data.sub),
        email: Build.unescape(data.email),
        name: Build.unescape(data.name) || '',
        tripcode: data.trip,
        pass: data.since4pass != null ? "" + data.since4pass : void 0,
        uniqueID: data.id,
        flagCode: data.country,
        flagCodeTroll: data.troll_country,
        flag: Build.unescape(data.country_name),
        dateUTC: data.time,
        dateText: data.now,
        commentHTML: {
          innerHTML: data.com || ''
        }
      };
      if (data.capcode) {
        o.info.capcode = data.capcode.replace(/_highlight$/, '').replace(/_/g, ' ').replace(/\b\w/g, function(c) {
          return c.toUpperCase();
        });
        o.capcodeHighlight = /_highlight$/.test(data.capcode);
        delete o.info.uniqueID;
      }
      if (data.ext) {
        o.file = {
          name: (Build.unescape(data.filename)) + data.ext,
          url: boardID === 'f' ? location.protocol + "//" + (ImageHost.flashHost()) + "/" + boardID + "/" + (encodeURIComponent(data.filename)) + data.ext : location.protocol + "//" + (ImageHost.host()) + "/" + boardID + "/" + data.tim + data.ext,
          height: data.h,
          width: data.w,
          MD5: data.md5,
          size: $.bytesToString(data.fsize),
          thumbURL: location.protocol + "//" + (ImageHost.thumbHost()) + "/" + boardID + "/" + data.tim + "s.jpg",
          theight: data.tn_h,
          twidth: data.tn_w,
          isSpoiler: !!data.spoiler,
          tag: data.tag,
          hasDownscale: !!data.m_img
        };
        if (!/\.pdf$/.test(o.file.url)) {
          o.file.dimensions = o.file.width + "x" + o.file.height;
        }
      }
      return o;
    },
    parseComment: function(html) {
      html = html.replace(/<br\b[^<]*>/gi, '\n').replace(/\n\n<span\b[^<]* class="abbr"[^]*$/i, '').replace(/<[^>]*>/g, '');
      return Build.unescape(html);
    },
    parseCommentDisplay: function(html) {
      var html2;
      if (!(Conf['Remove Spoilers'] || Conf['Reveal Spoilers'])) {
        while ((html2 = html.replace(/<s>(?:(?!<\/?s>).)*<\/s>/g, '[spoiler]')) !== html) {
          html = html2;
        }
      }
      html = html.replace(/^<b\b[^<]*>Rolled [^<]*<\/b>/i, '').replace(/<span\b[^<]* class="fortune"[^]*$/i, '');
      return Build.parseComment(html).trim().replace(/\s+$/gm, '');
    },
    postFromObject: function(data, boardID) {
      var o;
      o = Build.parseJSON(data, boardID);
      return Build.post(o);
    },
    post: function(o) {
      var ID, boardID, capcode, capcodeDescription, capcodeLC, capcodeLong, capcodePlural, commentHTML, container, dateText, dateUTC, email, file, fileBlock, fileThumb, fileURL, flag, flagCode, flagCodeTroll, gifIcon, href, i, len, match, name, pass, postClass, postInfo, postLink, protocol, quote, quoteLink, ref, ref1, shortFilename, staticPath, subject, threadID, tripcode, uniqueID, wholePost;
      ID = o.ID, threadID = o.threadID, boardID = o.boardID, file = o.file;
      ref = o.info, subject = ref.subject, email = ref.email, name = ref.name, tripcode = ref.tripcode, capcode = ref.capcode, pass = ref.pass, uniqueID = ref.uniqueID, flagCode = ref.flagCode, flagCodeTroll = ref.flagCodeTroll, flag = ref.flag, dateUTC = ref.dateUTC, dateText = ref.dateText, commentHTML = ref.commentHTML;
      staticPath = Build.staticPath, gifIcon = Build.gifIcon;

      /* Post Info */
      if (capcode) {
        capcodeLC = capcode.toLowerCase();
        if (capcode === 'Founder') {
          capcodePlural = 'the Founder';
          capcodeDescription = "4chan's Founder";
        } else if (capcode === 'Verified') {
          capcodePlural = 'Verified Users';
          capcodeDescription = '';
        } else {
          capcodeLong = {
            'Admin': 'Administrator',
            'Mod': 'Moderator'
          }[capcode] || capcode;
          capcodePlural = capcodeLong + "s";
          capcodeDescription = "a 4chan " + capcodeLong;
        }
      }
      postLink = Build.postURL(boardID, threadID, ID);
      quoteLink = Build.sameThread(boardID, threadID) ? "javascript:quote('" + (+ID) + "');" : "/" + boardID + "/thread/" + threadID + "#q" + ID;
      postInfo = {
        innerHTML: "<div class=\"postInfo desktop\" id=\"pi" + E(ID) + "\"><input type=\"checkbox\" name=\"" + E(ID) + "\" value=\"delete\"> " + ((!o.isReply || boardID === "f" || subject) ? "<span class=\"subject\">" + E(subject || "") + "</span> " : "") + "<span class=\"nameBlock" + ((capcode) ? " capcode" + E(capcode) : "") + "\">" + ((email) ? "<a href=\"mailto:" + E(encodeURIComponent(email).replace(/%40/g, "@")) + "\" class=\"useremail\">" : "") + "<span class=\"name" + ((capcode) ? " capcode" : "") + "\">" + E(name) + "</span>" + ((tripcode) ? " <span class=\"postertrip\">" + E(tripcode) + "</span>" : "") + ((pass) ? " <span title=\"Pass user since " + E(pass) + "\" class=\"n-pu\"></span>" : "") + ((capcode) ? " <strong class=\"capcode hand id_" + E(capcodeLC) + "\" title=\"Highlight posts by " + E(capcodePlural) + "\">## " + E(capcode) + "</strong>" : "") + ((!capcode && typeof o.xa18 !== "undefined") ? " <strong class=\"capcode hand n-atb n-atb-" + E(o.xa18) + " id_at" + E(o.xa18) + "\"></strong>" : "") + ((email) ? "</a>" : "") + ((boardID === "f" && !o.isReply || capcodeDescription) ? "" : " ") + ((capcodeDescription) ? " <img src=\"" + E(staticPath) + E(capcodeLC) + "icon" + E(gifIcon) + "\" alt=\"" + E(capcode) + " Icon\" title=\"This user is " + E(capcodeDescription) + ".\" class=\"identityIcon retina\">" : "") + ((uniqueID && !capcode) ? " <span class=\"posteruid id_" + E(uniqueID) + "\">(ID: <span class=\"hand\" title=\"Highlight posts by this ID\">" + E(uniqueID) + "</span>)</span>" : "") + ((flagCode) ? " <span title=\"" + E(flag) + "\" class=\"flag flag-" + E(flagCode.toLowerCase()) + "\"></span>" : "") + ((flagCodeTroll) ? " <img src=\"" + E(staticPath) + "country/troll/" + E(flagCodeTroll.toLowerCase()) + ".gif\" alt=\"" + E(flagCodeTroll) + "\" title=\"" + E(flag) + "\" class=\"countryFlag\">" : "") + "</span> <span class=\"dateTime\" data-utc=\"" + E(dateUTC) + "\">" + E(dateText) + "</span> <span class=\"postNum" + ((!(boardID === "f" && !o.isReply)) ? " desktop" : "") + "\"><a href=\"" + E(postLink) + "\" title=\"Link to this post\">No.</a><a href=\"" + E(quoteLink) + "\" title=\"Reply to this post\">" + E(ID) + "</a>" + ((o.isSticky) ? " <img src=\"" + E(staticPath) + "sticky" + E(gifIcon) + "\" alt=\"Sticky\" title=\"Sticky\"" + ((boardID === "f") ? " style=\"height: 18px; width: 18px;\"" : " class=\"stickyIcon retina\"") + ">" : "") + ((o.isClosed && !o.isArchived) ? " <img src=\"" + E(staticPath) + "closed" + E(gifIcon) + "\" alt=\"Closed\" title=\"Closed\"" + ((boardID === "f") ? " style=\"height: 18px; width: 18px;\"" : " class=\"closedIcon retina\"") + ">" : "") + ((o.isArchived) ? " <img src=\"" + E(staticPath) + "archived" + E(gifIcon) + "\" alt=\"Archived\" title=\"Archived\" class=\"archivedIcon retina\">" : "") + ((!o.isReply && g.VIEW === "index") ? " &nbsp; <span>[<a href=\"/" + E(boardID) + "/thread/" + E(threadID) + "\" class=\"replylink\">Reply</a>]</span>" : "") + "</span></div>"
      };

      /* File Info */
      if (file) {
        protocol = /^https?:(?=\/\/i\.4cdn\.org\/)/;
        fileURL = file.url.replace(protocol, '');
        shortFilename = Build.shortFilename(file.name);
        fileThumb = file.isSpoiler ? Build.spoilerThumb(boardID) : file.thumbURL.replace(protocol, '');
      }
      fileBlock = {
        innerHTML: ((file) ? "<div class=\"file\" id=\"f" + E(ID) + "\">" + ((boardID === "f") ? "<div class=\"fileInfo\" data-md5=\"" + E(file.MD5) + "\"><span class=\"fileText\" id=\"fT" + E(ID) + "\">File: <a data-width=\"" + E(file.width) + "\" data-height=\"" + E(file.height) + "\" href=\"" + E(fileURL) + "\" target=\"_blank\">" + E(file.name) + "</a>-(" + E(file.size) + ", " + E(file.dimensions) + ((file.tag) ? ", " + E(file.tag) : "") + ")</span></div>" : "<div class=\"fileText\" id=\"fT" + E(ID) + "\"" + ((file.isSpoiler) ? " title=\"" + E(file.name) + "\"" : "") + ">File: <a" + ((file.name === shortFilename || file.isSpoiler) ? "" : " title=\"" + E(file.name) + "\"") + " href=\"" + E(fileURL) + "\" target=\"_blank\">" + ((file.isSpoiler) ? "Spoiler Image" : E(shortFilename)) + "</a> (" + E(file.size) + ", " + E(file.dimensions || "PDF") + ")</div><a class=\"fileThumb" + ((file.isSpoiler) ? " imgspoiler" : "") + "\" href=\"" + E(fileURL) + "\" target=\"_blank\"" + ((file.hasDownscale) ? " data-m" : "") + "><img src=\"" + E(fileThumb) + "\" alt=\"" + E(file.size) + "\" data-md5=\"" + E(file.MD5) + "\" style=\"height: " + E(file.isSpoiler ? 100 : file.theight) + "px; width: " + E(file.isSpoiler ? 100 : file.twidth) + "px;\"></a>") + "</div>" : ((o.fileDeleted) ? "<div class=\"file\" id=\"f" + E(ID) + "\"><span class=\"fileThumb\"><img src=\"" + E(staticPath) + "filedeleted-res" + E(gifIcon) + "\" alt=\"File deleted.\" class=\"fileDeletedRes retina\"></span></div>" : ""))
      };

      /* Whole Post */
      postClass = o.isReply ? 'reply' : 'op';
      wholePost = {
        innerHTML: ((o.isReply) ? "<div class=\"sideArrows\" id=\"sa" + E(ID) + "\">&gt;&gt;</div>" : "") + "<div id=\"p" + E(ID) + "\" class=\"post " + E(postClass) + ((o.capcodeHighlight) ? " highlightPost" : "") + "\">" + ((o.isReply) ? (postInfo).innerHTML + (fileBlock).innerHTML : (fileBlock).innerHTML + (postInfo).innerHTML) + "<blockquote class=\"postMessage\" id=\"m" + E(ID) + "\">" + (commentHTML).innerHTML + "</blockquote></div>"
      };
      container = $.el('div', {
        className: "postContainer " + postClass + "Container",
        id: "pc" + ID
      });
      $.extend(container, wholePost);
      ref1 = $$('.quotelink', container);
      for (i = 0, len = ref1.length; i < len; i++) {
        quote = ref1[i];
        href = quote.getAttribute('href');
        if ((href[0] === '#') && !(Build.sameThread(boardID, threadID))) {
          quote.href = ("/" + boardID + "/thread/" + threadID) + href;
        } else if ((match = href.match(/^\/([^\/]+)\/thread\/(\d+)/)) && (Build.sameThread(match[1], match[2]))) {
          quote.href = href.match(/(#[^#]*)?$/)[0] || '#';
        } else if (/^\d+(#|$)/.test(href) && !(g.VIEW === 'thread' && g.BOARD.ID === boardID)) {
          quote.href = "/" + boardID + "/thread/" + href;
        }
      }
      return container;
    },
    summaryText: function(status, posts, files) {
      var text;
      text = '';
      if (status) {
        text += status + " ";
      }
      text += posts + " post" + (posts > 1 ? 's' : '');
      if (+files) {
        text += " and " + files + " image repl" + (files > 1 ? 'ies' : 'y');
      }
      return text += " " + (status === '-' ? 'shown' : 'omitted') + ".";
    },
    summary: function(boardID, threadID, posts, files) {
      return $.el('a', {
        className: 'summary',
        textContent: Build.summaryText('', posts, files),
        href: "/" + boardID + "/thread/" + threadID
      });
    },
    thread: function(thread, data, withReplies) {
      var files, posts, ref, root, summary;
      if ((root = thread.nodes.root)) {
        $.rmAll(root);
      } else {
        thread.nodes.root = root = $.el('div', {
          className: 'thread',
          id: "t" + data.no
        });
      }
      if (Build.hat) {
        $.add(root, Build.hat.cloneNode(false));
      }
      $.add(root, thread.OP.nodes.root);
      if (data.omitted_posts || !withReplies && data.replies) {
        ref = withReplies ? [
          data.omitted_posts, data.images - data.last_replies.filter(function(data) {
            return !!data.ext;
          }).length
        ] : [data.replies, data.images], posts = ref[0], files = ref[1];
        summary = Build.summary(thread.board.ID, data.no, posts, files);
        $.add(root, summary);
      }
      return root;
    },
    catalogThread: function(thread, data, pageCount) {
      var br, container, cssText, fileCount, gifIcon, i, imgClass, len, postCount, ratio, ref, root, spoilerRange, src, staticPath, tn_h, tn_w;
      staticPath = Build.staticPath, gifIcon = Build.gifIcon;
      tn_w = data.tn_w, tn_h = data.tn_h;
      if (data.spoiler && !Conf['Reveal Spoiler Thumbnails']) {
        src = staticPath + "spoiler";
        if (spoilerRange = Build.spoilerRange[thread.board]) {
          src += ("-" + thread.board) + Math.floor(1 + spoilerRange * Math.random());
        }
        src += '.png';
        imgClass = 'spoiler-file';
        cssText = "--tn-w: 100; --tn-h: 100;";
      } else if (data.filedeleted) {
        src = staticPath + "filedeleted-res" + gifIcon;
        imgClass = 'deleted-file';
      } else if (thread.OP.file) {
        src = thread.OP.file.thumbURL;
        ratio = 250 / Math.max(tn_w, tn_h);
        cssText = "--tn-w: " + (tn_w * ratio) + "; --tn-h: " + (tn_h * ratio) + ";";
      } else {
        src = staticPath + "nofile.png";
        imgClass = 'no-file';
      }
      postCount = data.replies + 1;
      fileCount = data.images + !!data.ext;
      container = $.el('div', {
        innerHTML: "<a class=\"catalog-link\" href=\"/" + E(thread.board) + "/thread/" + E(thread.ID) + "\"><img src=\"" + E(src) + "\"" + ((imgClass) ? " class=\"catalog-thumb " + E(imgClass) + "\"" : " class=\"catalog-thumb\" data-width=\"" + E(data.tn_w) + "\" data-height=\"" + E(data.tn_h) + "\"") + "></a><div class=\"catalog-stats\"><span title=\"Posts / Files / Page\"><span class=\"post-count" + ((data.bumplimit) ? " warning" : "") + "\">" + E(postCount) + "</span> / <span class=\"file-count" + ((data.imagelimit) ? " warning" : "") + "\">" + E(fileCount) + "</span> / <span class=\"page-count\">" + E(pageCount) + "</span></span><span class=\"catalog-icons\">" + ((thread.isSticky) ? "<img src=\"" + E(staticPath) + "sticky" + E(gifIcon) + "\" class=\"stickyIcon\" title=\"Sticky\">" : "") + ((thread.isClosed) ? "<img src=\"" + E(staticPath) + "closed" + E(gifIcon) + "\" class=\"closedIcon\" title=\"Closed\">" : "") + "</span></div>"
      });
      $.before(thread.OP.nodes.info, slice.call(container.childNodes));
      ref = $$('br', thread.OP.nodes.comment);
      for (i = 0, len = ref.length; i < len; i++) {
        br = ref[i];
        if (br.previousSibling && br.previousSibling.nodeName === 'BR') {
          $.addClass(br, 'extra-linebreak');
        }
      }
      root = $.el('div', {
        className: 'thread catalog-thread',
        id: "t" + thread
      });
      if (thread.OP.highlights) {
        $.addClass.apply($, [root].concat(slice.call(thread.OP.highlights)));
      }
      if (!thread.OP.file) {
        $.addClass(root, 'noFile');
      }
      root.style.cssText = cssText || '';
      return root;
    },
    catalogReply: function(thread, data) {
      var excerpt, link;
      excerpt = '';
      if (data.com) {
        excerpt = Build.parseCommentDisplay(data.com).replace(/>>\d+/g, '').trim().replace(/\n+/g, ' // ');
      }
      if (data.ext) {
        excerpt || (excerpt = "" + (Build.unescape(data.filename)) + data.ext);
      }
      if (data.com) {
        excerpt || (excerpt = Build.unescape(data.com.replace(/<br\b[^<]*>/gi, ' // ')));
      }
      excerpt || (excerpt = '\xA0');
      if (excerpt.length > 73) {
        excerpt = excerpt.slice(0, 70) + "...";
      }
      link = Build.postURL(thread.board.ID, thread.ID, data.no);
      return $.el('div', {
        className: 'catalog-reply'
      }, {
        innerHTML: "<span><time data-utc=\"" + E(data.time * 1000) + "\" data-abbrev=\"1\">...</time>: </span><a class=\"catalog-reply-excerpt\" href=\"" + E(link) + "\">" + E(excerpt) + "</a><a class=\"catalog-reply-preview\" href=\"" + E(link) + "\">...</a>"
      });
    }
  };

  return Build;

}).call(this);

(function() {


}).call(this);

Get = (function() {
  var Get,
    indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  Get = {
    threadExcerpt: function(thread) {
      var OP, excerpt, ref, ref1;
      OP = thread.OP;
      excerpt = ("/" + (decodeURIComponent(thread.board.ID)) + "/ - ") + (((ref = OP.info.subject) != null ? ref.trim() : void 0) || OP.commentDisplay().replace(/\n+/g, ' // ') || ((ref1 = OP.file) != null ? ref1.name : void 0) || ("No." + OP));
      if (excerpt.length > 73) {
        return excerpt.slice(0, 70) + "...";
      }
      return excerpt;
    },
    threadFromRoot: function(root) {
      if (root == null) {
        return null;
      }
      return g.threads[(root.dataset.board || g.BOARD.ID) + "." + (root.id.match(/\d*$/)[0])];
    },
    threadFromNode: function(node) {
      return Get.threadFromRoot($.x("ancestor-or-self::" + Site.xpath.thread, node));
    },
    postFromRoot: function(root) {
      var index, post;
      if (root == null) {
        return null;
      }
      post = g.posts[root.dataset.fullID];
      index = root.dataset.clone;
      if (index) {
        return post.clones[index];
      } else {
        return post;
      }
    },
    postFromNode: function(root) {
      return Get.postFromRoot($.x("ancestor-or-self::" + Site.xpath.postContainer + "[1]", root));
    },
    postDataFromLink: function(link) {
      var boardID, match, postID, ref, ref1, threadID;
      if (link.dataset.postID) {
        ref = link.dataset, boardID = ref.boardID, threadID = ref.threadID, postID = ref.postID;
        threadID || (threadID = 0);
      } else {
        match = link.href.match(Site.regexp.quotelink);
        ref1 = match.slice(1), boardID = ref1[0], threadID = ref1[1], postID = ref1[2];
        postID || (postID = threadID);
      }
      return {
        boardID: boardID,
        threadID: +threadID,
        postID: +postID
      };
    },
    allQuotelinksLinkingTo: function(post) {
      var fullID, handleQuotes, i, len, posts, qPost, quote, quotelinks, ref;
      quotelinks = [];
      posts = g.posts;
      fullID = post.fullID;
      handleQuotes = function(qPost, type) {
        var clone, i, len, ref;
        quotelinks.push.apply(quotelinks, qPost.nodes[type]);
        ref = qPost.clones;
        for (i = 0, len = ref.length; i < len; i++) {
          clone = ref[i];
          quotelinks.push.apply(quotelinks, clone.nodes[type]);
        }
      };
      posts.forEach(function(qPost) {
        if (indexOf.call(qPost.quotes, fullID) >= 0) {
          return handleQuotes(qPost, 'quotelinks');
        }
      });
      if (Conf['Quote Backlinks']) {
        ref = post.quotes;
        for (i = 0, len = ref.length; i < len; i++) {
          quote = ref[i];
          if (qPost = posts[quote]) {
            handleQuotes(qPost, 'backlinks');
          }
        }
      }
      return quotelinks.filter(function(quotelink) {
        var boardID, postID, ref1;
        ref1 = Get.postDataFromLink(quotelink), boardID = ref1.boardID, postID = ref1.postID;
        return boardID === post.board.ID && postID === post.ID;
      });
    }
  };

  return Get;

}).call(this);

Header = (function() {
  var Header;

  Header = {
    init: function() {
      var barFixedToggler, barPositionToggler, box, cs, customNavToggler, editCustomNav, footerToggler, headerToggler, linkJustifyToggler, menuButton, scrollHeaderToggler, shortcutToggler;
      this.menu = new UI.Menu('header');
      menuButton = $.el('span', {
        className: 'menu-button'
      });
      $.extend(menuButton, {
        innerHTML: "<i></i>"
      });
      box = UI.checkbox;
      barFixedToggler = box('Fixed Header', 'Fixed Header');
      headerToggler = box('Header auto-hide', 'Auto-hide header');
      scrollHeaderToggler = box('Header auto-hide on scroll', 'Auto-hide header on scroll');
      barPositionToggler = box('Bottom Header', 'Bottom header');
      linkJustifyToggler = box('Centered links', 'Centered links');
      customNavToggler = box('Custom Board Navigation', 'Custom board navigation');
      footerToggler = box('Bottom Board List', 'Hide bottom board list');
      shortcutToggler = box('Shortcut Icons', 'Shortcut Icons');
      editCustomNav = $.el('a', {
        textContent: 'Edit custom board navigation',
        href: 'javascript:;'
      });
      this.barFixedToggler = barFixedToggler.firstElementChild;
      this.scrollHeaderToggler = scrollHeaderToggler.firstElementChild;
      this.barPositionToggler = barPositionToggler.firstElementChild;
      this.linkJustifyToggler = linkJustifyToggler.firstElementChild;
      this.headerToggler = headerToggler.firstElementChild;
      this.footerToggler = footerToggler.firstElementChild;
      this.shortcutToggler = shortcutToggler.firstElementChild;
      this.customNavToggler = customNavToggler.firstElementChild;
      $.on(menuButton, 'click', this.menuToggle);
      $.on(this.headerToggler, 'change', this.toggleBarVisibility);
      $.on(this.barFixedToggler, 'change', this.toggleBarFixed);
      $.on(this.barPositionToggler, 'change', this.toggleBarPosition);
      $.on(this.scrollHeaderToggler, 'change', this.toggleHideBarOnScroll);
      $.on(this.linkJustifyToggler, 'change', this.toggleLinkJustify);
      $.on(this.footerToggler, 'change', this.toggleFooterVisibility);
      $.on(this.shortcutToggler, 'change', this.toggleShortcutIcons);
      $.on(this.customNavToggler, 'change', this.toggleCustomNav);
      $.on(editCustomNav, 'click', this.editCustomNav);
      this.setBarFixed(Conf['Fixed Header']);
      this.setHideBarOnScroll(Conf['Header auto-hide on scroll']);
      this.setBarVisibility(Conf['Header auto-hide']);
      this.setLinkJustify(Conf['Centered links']);
      this.setShortcutIcons(Conf['Shortcut Icons']);
      this.setFooterVisibility(Conf['Bottom Board List']);
      $.sync('Fixed Header', this.setBarFixed);
      $.sync('Header auto-hide on scroll', this.setHideBarOnScroll);
      $.sync('Bottom Header', this.setBarPosition);
      $.sync('Shortcut Icons', this.setShortcutIcons);
      $.sync('Header auto-hide', this.setBarVisibility);
      $.sync('Centered links', this.setLinkJustify);
      $.sync('Bottom Board List', this.setFooterVisibility);
      this.addShortcut('menu', menuButton, 900);
      this.menu.addEntry({
        el: $.el('span', {
          textContent: 'Header'
        }),
        order: 107,
        subEntries: [
          {
            el: barFixedToggler
          }, {
            el: headerToggler
          }, {
            el: scrollHeaderToggler
          }, {
            el: barPositionToggler
          }, {
            el: linkJustifyToggler
          }, {
            el: footerToggler
          }, {
            el: shortcutToggler
          }, {
            el: customNavToggler
          }, {
            el: editCustomNav
          }
        ]
      });
      $.on(window, 'load popstate', Header.hashScroll);
      $.on(d, 'CreateNotification', this.createNotification);
      this.setBoardList();
      $.onExists(doc, 'body', (function(_this) {
        return function() {
          if (!Main.isThisPageLegit()) {
            return;
          }
          $.prepend(d.body, _this.bar);
          $.add(d.body, Header.hover);
          return _this.setBarPosition(Conf['Bottom Header']);
        };
      })(this));
      $.onExists(doc, Site.selectors.boardList + " + *", Header.generateFullBoardList);
      Main.ready(function() {
        var a, absbot, footer;
        if (!(footer = $.id('boardNavDesktopFoot'))) {
          if (!(absbot = $.id('absbot'))) {
            return;
          }
          footer = $.id('boardNavDesktop').cloneNode(true);
          footer.id = 'boardNavDesktopFoot';
          $('#navtopright', footer).id = 'navbotright';
          $('#settingsWindowLink', footer).id = 'settingsWindowLinkBot';
          $.before(absbot, footer);
          $.globalEval('window.cloneTopNav = function() {};');
        }
        if ((a = $("a[href*='/" + g.BOARD + "/']", footer))) {
          a.className = 'current';
        }
        Header.bottomBoardList = $('.boardList', footer);
        return CatalogLinks.setLinks(Header.bottomBoardList);
      });
      if (g.VIEW === 'catalog' || !Conf['Disable Native Extension']) {
        cs = $.el('a', {
          href: 'javascript:;'
        });
        if (g.VIEW === 'catalog') {
          cs.title = cs.textContent = 'Catalog Settings';
          cs.className = 'fa fa-book';
        } else {
          cs.title = cs.textContent = 'lolcow Settings';
          cs.className = 'native-settings';
        }
        $.on(cs, 'click', function() {
          return $.id('settingsWindowLink').click();
        });
        this.addShortcut('native', cs, 810);
      }
      return this.enableDesktopNotifications();
    },
    bar: $.el('div', {
      id: 'header-bar'
    }),
    noticesRoot: $.el('div', {
      id: 'notifications'
    }),
    shortcuts: $.el('span', {
      id: 'shortcuts'
    }),
    hover: $.el('div', {
      id: 'hoverUI'
    }),
    toggle: $.el('div', {
      id: 'scroll-marker'
    }),
    setBoardList: function() {
      var boardList, btn;
      Header.boardList = boardList = $.el('span', {
        id: 'board-list'
      });
      $.extend(boardList, {
        innerHTML: "<span id=\"custom-board-list\"></span><span id=\"full-board-list\" hidden><span class=\"hide-board-list-container brackets-wrap\"><a href=\"javascript:;\" class=\"hide-board-list-button\">&nbsp;-&nbsp;</a></span> <span class=\"boardList\"></span></span>"
      });
      btn = $('.hide-board-list-button', boardList);
      $.on(btn, 'click', Header.toggleBoardList);
      $.add(Header.bar, [Header.boardList, Header.shortcuts, Header.noticesRoot, Header.toggle]);
      Header.setCustomNav(Conf['Custom Board Navigation']);
      Header.generateBoardList(Conf['boardnav']);
      $.sync('Custom Board Navigation', Header.setCustomNav);
      return $.sync('boardnav', Header.generateBoardList);
    },
    generateFullBoardList: function() {
      var a, chr, fullBoardList, i, items, j, len, node, nodes, ref, spacer, span;
      nodes = [];
      spacer = function() {
        return $.el('span', {
          className: 'spacer'
        });
      };
      items = $.X('.//a|.//text()[not(ancestor::a)]', $(Site.selectors.boardList));
      i = 0;
      while (node = items.snapshotItem(i++)) {
        switch (node.nodeName) {
          case '#text':
            ref = node.nodeValue;
            for (j = 0, len = ref.length; j < len; j++) {
              chr = ref[j];
              span = $.el('span', {
                textContent: chr
              });
              if (chr === ' ') {
                span.className = 'space';
              }
              if (chr === ']') {
                nodes.push(spacer());
              }
              nodes.push(span);
              if (chr === '[') {
                nodes.push(spacer());
              }
            }
            break;
          case 'A':
            a = node.cloneNode(true);
            if (a.pathname.split('/')[1] === g.BOARD.ID) {
              a.className = 'current';
            }
            nodes.push(a);
        }
      }
      fullBoardList = $('.boardList', Header.boardList);
      $.add(fullBoardList, nodes);
      return CatalogLinks.setLinks(fullBoardList);
    },
    generateBoardList: function(boardnav) {
      var list, nodes, re, t;
      list = $('#custom-board-list', Header.boardList);
      $.rmAll(list);
      if (!boardnav) {
        return;
      }
      boardnav = boardnav.replace(/(\r\n|\n|\r)/g, ' ');
      re = /[\w@]+(-(all|title|replace|full|index|catalog|archive|expired|(mode|sort|text):"[^"]+"(,"[^"]+")?))*|[^\w@]+/g;
      nodes = (function() {
        var j, len, ref, results;
        ref = boardnav.match(re);
        results = [];
        for (j = 0, len = ref.length; j < len; j++) {
          t = ref[j];
          results.push(Header.mapCustomNavigation(t));
        }
        return results;
      })();
      $.add(list, nodes);
      return CatalogLinks.setLinks(list);
    },
    mapCustomNavigation: function(t) {
      var a, boardID, href, indexOptions, m, ref, ref1, text, url;
      if (/^[^\w@]/.test(t)) {
        return $.tn(t);
      }
      text = url = null;
      t = t.replace(/-text:"([^"]+)"(?:,"([^"]+)")?/g, function(m0, m1, m2) {
        text = m1;
        url = m2;
        return '';
      });
      indexOptions = [];
      t = t.replace(/-(?:mode|sort):"([^"]+)"/g, function(m0, m1) {
        indexOptions.push(m1.toLowerCase().replace(/\ /g, '-'));
        return '';
      });
      indexOptions = indexOptions.join('/');
      if (/^toggle-all/.test(t)) {
        a = $.el('a', {
          className: 'show-board-list-button',
          textContent: text || '+',
          href: 'javascript:;'
        });
        $.on(a, 'click', Header.toggleBoardList);
        return a;
      }
      if (/^external/.test(t)) {
        a = $.el('a', {
          href: url || 'javascript:;',
          textContent: text || '+',
          className: 'external'
        });
        return a;
      }
      boardID = t.split('-')[0];
      if (boardID === 'current') {
        if ((ref = location.hostname) === 'lolcow.farm' || ref === 'lolcow.farm') {
          boardID = g.BOARD.ID;
        } else {
          a = $.el('a', {
            href: "/" + g.BOARD.ID + "/",
            textContent: text || g.BOARD.ID,
            className: 'current'
          });
          if (/-(catalog|archive|expired)/.test(t)) {
            a = a.firstChild;
          }
          return a;
        }
      }
      a = (function() {
        var ref1;
        if (boardID === '@') {
          return $.el('a', {
            href: 'https://twitter.com/4chan',
            title: '4chan Twitter',
            textContent: '@'
          });
        }
        a = $.el('a', {
          href: "//" + (BoardConfig.domain(boardID)) + "/" + boardID + "/",
          textContent: boardID,
          title: BoardConfig.title(boardID)
        });
        if ((ref1 = g.VIEW) === 'catalog' || ref1 === 'archive') {
          a.href += g.VIEW;
        }
        if (a.hostname === location.hostname && boardID === g.BOARD.ID) {
          a.className = 'current';
        }
        return a;
      })();
      a.textContent = /-title/.test(t) || /-replace/.test(t) && a.hostname === location.hostname && boardID === g.BOARD.ID ? a.title || a.textContent : /-full/.test(t) ? ("/" + boardID + "/") + (a.title ? " - " + a.title : '') : text || boardID;
      if (m = t.match(/-(index|catalog)/)) {
        if (!(boardID === 'f' && m[1] === 'catalog')) {
          a.dataset.only = m[1];
          a.href = CatalogLinks[m[1]](boardID);
          if (m[1] === 'catalog') {
            $.addClass(a, 'catalog');
          }
        } else {
          return a.firstChild;
        }
      }
      if (Conf['JSON Index'] && indexOptions) {
        a.dataset.indexOptions = indexOptions;
        if (((ref1 = a.hostname) === 'lolcow.farm' || ref1 === 'lolcow.farm') && a.pathname.split('/')[2] === '') {
          a.href += (a.hash ? '/' : '#') + indexOptions;
        }
      }
      if (/-archive/.test(t)) {
        if (href = Redirect.to('board', {
          boardID: boardID
        })) {
          a.href = href;
        } else {
          return a.firstChild;
        }
      }
      if (/-expired/.test(t)) {
        if (boardID !== 'b' && boardID !== 'f' && boardID !== 'trash' && boardID !== 'bant') {
          a.href = "//" + (BoardConfig.domain(boardID)) + "/" + boardID + "/archive";
        } else {
          return a.firstChild;
        }
      }
      if (boardID === '@') {
        $.addClass(a, 'navSmall');
      }
      return a;
    },
    toggleBoardList: function() {
      var bar, custom, full, showBoardList;
      bar = Header.bar;
      custom = $('#custom-board-list', bar);
      full = $('#full-board-list', bar);
      showBoardList = !full.hidden;
      custom.hidden = !showBoardList;
      return full.hidden = showBoardList;
    },
    setLinkJustify: function(centered) {
      Header.linkJustifyToggler.checked = centered;
      if (centered) {
        return $.addClass(doc, 'centered-links');
      } else {
        return $.rmClass(doc, 'centered-links');
      }
    },
    toggleLinkJustify: function() {
      var centered;
      $.event('CloseMenu');
      centered = this.nodeName === 'INPUT' ? this.checked : void 0;
      Header.setLinkJustify(centered);
      return $.set('Centered links', centered);
    },
    setBarFixed: function(fixed) {
      Header.barFixedToggler.checked = fixed;
      if (fixed) {
        $.addClass(doc, 'fixed');
        return $.addClass(Header.bar, 'dialog');
      } else {
        $.rmClass(doc, 'fixed');
        return $.rmClass(Header.bar, 'dialog');
      }
    },
    toggleBarFixed: function() {
      $.event('CloseMenu');
      Header.setBarFixed(this.checked);
      Conf['Fixed Header'] = this.checked;
      return $.set('Fixed Header', this.checked);
    },
    setShortcutIcons: function(show) {
      Header.shortcutToggler.checked = show;
      if (show) {
        return $.addClass(doc, 'shortcut-icons');
      } else {
        return $.rmClass(doc, 'shortcut-icons');
      }
    },
    toggleShortcutIcons: function() {
      $.event('CloseMenu');
      Header.setShortcutIcons(this.checked);
      Conf['Shortcut Icons'] = this.checked;
      return $.set('Shortcut Icons', this.checked);
    },
    setBarVisibility: function(hide) {
      Header.headerToggler.checked = hide;
      $.event('CloseMenu');
      (hide ? $.addClass : $.rmClass)(Header.bar, 'autohide');
      return (hide ? $.addClass : $.rmClass)(doc, 'autohide');
    },
    toggleBarVisibility: function() {
      var hide, message;
      hide = this.nodeName === 'INPUT' ? this.checked : !$.hasClass(Header.bar, 'autohide');
      Conf['Header auto-hide'] = hide;
      $.set('Header auto-hide', hide);
      Header.setBarVisibility(hide);
      message = "The header bar will " + (hide ? 'automatically hide itself.' : 'remain visible.');
      return new Notice('info', message, 2);
    },
    setHideBarOnScroll: function(hide) {
      Header.scrollHeaderToggler.checked = hide;
      if (hide) {
        $.on(window, 'scroll', Header.hideBarOnScroll);
        return;
      }
      $.off(window, 'scroll', Header.hideBarOnScroll);
      $.rmClass(Header.bar, 'scroll');
      return Header.bar.classList.toggle('autohide', Conf['Header auto-hide']);
    },
    toggleHideBarOnScroll: function() {
      var hide;
      hide = this.checked;
      $.cb.checked.call(this);
      return Header.setHideBarOnScroll(hide);
    },
    hideBarOnScroll: function() {
      var offsetY;
      offsetY = window.pageYOffset;
      if (offsetY > (Header.previousOffset || 0)) {
        $.addClass(Header.bar, 'autohide', 'scroll');
      } else {
        $.rmClass(Header.bar, 'autohide', 'scroll');
      }
      return Header.previousOffset = offsetY;
    },
    setBarPosition: function(bottom) {
      var args;
      Header.barPositionToggler.checked = bottom;
      $.event('CloseMenu');
      args = bottom ? ['bottom-header', 'top-header', 'after'] : ['top-header', 'bottom-header', 'add'];
      $.addClass(doc, args[0]);
      $.rmClass(doc, args[1]);
      return $[args[2]](Header.bar, Header.noticesRoot);
    },
    toggleBarPosition: function() {
      $.cb.checked.call(this);
      return Header.setBarPosition(this.checked);
    },
    setFooterVisibility: function(hide) {
      Header.footerToggler.checked = hide;
      return doc.classList.toggle('hide-bottom-board-list', hide);
    },
    toggleFooterVisibility: function() {
      var hide, message;
      $.event('CloseMenu');
      hide = this.nodeName === 'INPUT' ? this.checked : $.hasClass(doc, 'hide-bottom-board-list');
      Header.setFooterVisibility(hide);
      $.set('Bottom Board List', hide);
      message = hide ? 'The bottom navigation will now be hidden.' : 'The bottom navigation will remain visible.';
      return new Notice('info', message, 2);
    },
    setCustomNav: function(show) {
      var btn, cust, full, ref;
      Header.customNavToggler.checked = show;
      cust = $('#custom-board-list', Header.bar);
      full = $('#full-board-list', Header.bar);
      btn = $('.hide-board-list-container', full);
      return ref = show ? [false, true, false] : [true, false, true], cust.hidden = ref[0], full.hidden = ref[1], btn.hidden = ref[2], ref;
    },
    toggleCustomNav: function() {
      $.cb.checked.call(this);
      return Header.setCustomNav(this.checked);
    },
    editCustomNav: function() {
      var settings;
      Settings.open('Advanced');
      settings = $.id('fourchanx-settings');
      return $('[name=boardnav]', settings).focus();
    },
    hashScroll: function(e) {
      var el, hash;
      if (e) {
        if (e.state) {
          return;
        }
        if (!history.state) {
          history.replaceState({}, '');
        }
      }
      if ((hash = location.hash.slice(1))) {
        ReplyPruning.showIfHidden(hash);
        if ((el = $.id(hash))) {
          return $.queueTask(function() {
            return Header.scrollTo(el);
          });
        }
      }
    },
    scrollTo: function(root, down, needed) {
      var height, x;
      if (!root.offsetParent) {
        return;
      }
      if (down) {
        x = Header.getBottomOf(root);
        if (Conf['Fixed Header'] && Conf['Header auto-hide on scroll'] && Conf['Bottom header']) {
          height = Header.bar.getBoundingClientRect().height;
          if (x <= 0) {
            if (!Header.isHidden()) {
              x += height;
            }
          } else {
            if (Header.isHidden()) {
              x -= height;
            }
          }
        }
        if (!(needed && x >= 0)) {
          return window.scrollBy(0, -x);
        }
      } else {
        x = Header.getTopOf(root);
        if (Conf['Fixed Header'] && Conf['Header auto-hide on scroll'] && !Conf['Bottom header']) {
          height = Header.bar.getBoundingClientRect().height;
          if (x >= 0) {
            if (!Header.isHidden()) {
              x += height;
            }
          } else {
            if (Header.isHidden()) {
              x -= height;
            }
          }
        }
        if (!(needed && x >= 0)) {
          return window.scrollBy(0, x);
        }
      }
    },
    scrollToIfNeeded: function(root, down) {
      return Header.scrollTo(root, down, true);
    },
    getTopOf: function(root) {
      var headRect, top;
      top = root.getBoundingClientRect().top;
      if (Conf['Fixed Header'] && !Conf['Bottom Header']) {
        headRect = Header.toggle.getBoundingClientRect();
        top -= headRect.top + headRect.height;
      }
      return top;
    },
    getBottomOf: function(root) {
      var bottom, clientHeight, headRect;
      clientHeight = doc.clientHeight;
      bottom = clientHeight - root.getBoundingClientRect().bottom;
      if (Conf['Fixed Header'] && Conf['Bottom Header']) {
        headRect = Header.toggle.getBoundingClientRect();
        bottom -= clientHeight - headRect.bottom + headRect.height;
      }
      return bottom;
    },
    isNodeVisible: function(node) {
      var height;
      if (d.hidden || !doc.contains(node)) {
        return false;
      }
      height = node.getBoundingClientRect().height;
      return Header.getTopOf(node) + height >= 0 && Header.getBottomOf(node) + height >= 0;
    },
    isHidden: function() {
      var top;
      top = Header.bar.getBoundingClientRect().top;
      if (Conf['Bottom header']) {
        return top === doc.clientHeight;
      } else {
        return top < 0;
      }
    },
    addShortcut: function(id, el, index) {
      var item, j, len, ref, shortcut;
      shortcut = $.el('span', {
        id: "shortcut-" + id,
        className: 'shortcut brackets-wrap'
      });
      $.add(shortcut, el);
      shortcut.dataset.index = index;
      ref = $$('[data-index]', Header.shortcuts);
      for (j = 0, len = ref.length; j < len; j++) {
        item = ref[j];
        if (!(+item.dataset.index > +index)) {
          continue;
        }
        $.before(item, shortcut);
        return;
      }
      return $.add(Header.shortcuts, shortcut);
    },
    rmShortcut: function(el) {
      return $.rm(el.parentElement);
    },
    menuToggle: function(e) {
      return Header.menu.toggle(e, this, g);
    },
    createNotification: function(e) {
      var content, lifetime, notice, ref, type;
      ref = e.detail, type = ref.type, content = ref.content, lifetime = ref.lifetime;
      return notice = new Notice(type, content, lifetime);
    },
    areNotificationsEnabled: false,
    enableDesktopNotifications: function() {
      var authorize, disable, el, notice, ref;
      if (!(window.Notification && Conf['Desktop Notifications'])) {
        return;
      }
      switch (Notification.permission) {
        case 'granted':
          Header.areNotificationsEnabled = true;
          return;
        case 'denied':
          return;
      }
      el = $.el('span', {
        innerHTML: "4chan X needs your permission to show desktop notifications. [<a href=\"https://github.com/ccd0/4chan-x/wiki/Frequently-Asked-Questions#why-is-4chan-x-asking-for-permission-to-show-desktop-notifications\" target=\"_blank\">FAQ</a>]<br><button>Authorize</button> or <button>Disable</button>"
      });
      ref = $$('button', el), authorize = ref[0], disable = ref[1];
      $.on(authorize, 'click', function() {
        return Notification.requestPermission(function(status) {
          Header.areNotificationsEnabled = status === 'granted';
          if (status === 'default') {
            return;
          }
          return notice.close();
        });
      });
      $.on(disable, 'click', function() {
        $.set('Desktop Notifications', false);
        return notice.close();
      });
      return notice = new Notice('info', el);
    }
  };

  return Header;

}).call(this);

Index = (function() {
  var Index,
    slice = [].slice,
    indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  Index = {
    showHiddenThreads: false,
    changed: {},
    init: function() {
      var arr, entries, i, input, inputs, k, l, label, len1, len2, name, ref, ref1, ref2, ref3, ref4, ref5, ref6, ref7, ref8, select, sortEntry, tRaw, watchSettings;
      if (!(g.VIEW === 'index' && g.BOARD.ID !== 'f')) {
        return;
      }
      $.one(d, '4chanXInitFinished', this.cb.initFinished);
      $.on(d, 'PostsInserted', this.cb.postsInserted);
      if (!Conf['JSON Index']) {
        return;
      }
      this.enabled = true;
      Callbacks.Post.push({
        name: 'Index Page Numbers',
        cb: this.node
      });
      Callbacks.CatalogThread.push({
        name: 'Catalog Features',
        cb: this.catalogNode
      });
      this.search = ((ref = history.state) != null ? ref.searched : void 0) || '';
      if ((ref1 = history.state) != null ? ref1.mode : void 0) {
        Conf['Index Mode'] = (ref2 = history.state) != null ? ref2.mode : void 0;
      }
      this.currentSort = (ref3 = history.state) != null ? ref3.sort : void 0;
      this.currentSort || (this.currentSort = typeof Conf['Index Sort'] === 'object' ? Conf['Index Sort'][g.BOARD.ID] || 'bump' : Conf['Index Sort']);
      this.currentPage = this.getCurrentPage();
      this.processHash();
      $.addClass(doc, 'index-loading', (Conf['Index Mode'].replace(/\ /g, '-')) + "-mode");
      $.on(window, 'popstate', this.cb.popstate);
      $.on(d, 'scroll', this.scroll);
      $.on(d, 'SortIndex', this.cb.resort);
      this.button = $.el('a', {
        className: 'fa fa-refresh',
        title: 'Refresh',
        href: 'javascript:;',
        textContent: 'Refresh Index'
      });
      $.on(this.button, 'click', function() {
        return Index.update();
      });
      Header.addShortcut('index-refresh', this.button, 590);
      entries = [];
      this.inputs = inputs = {};
      ref4 = Config.Index;
      for (name in ref4) {
        arr = ref4[name];
        if (!(arr instanceof Array)) {
          continue;
        }
        label = UI.checkbox(name, "" + name[0] + (name.slice(1).toLowerCase()));
        label.title = arr[1];
        entries.push({
          el: label
        });
        input = label.firstChild;
        $.on(input, 'change', $.cb.checked);
        inputs[name] = input;
      }
      $.on(inputs['Show Replies'], 'change', this.cb.replies);
      $.on(inputs['Catalog Hover Expand'], 'change', this.cb.hover);
      $.on(inputs['Pin Watched Threads'], 'change', this.cb.resort);
      $.on(inputs['Anchor Hidden Threads'], 'change', this.cb.resort);
      watchSettings = function(e) {
        if ((input = inputs[e.target.name])) {
          input.checked = e.target.checked;
          return $.event('change', null, input);
        }
      };
      $.on(d, 'OpenSettings', function() {
        return $.on($.id('fourchanx-settings'), 'change', watchSettings);
      });
      sortEntry = UI.checkbox('Per-Board Sort Type', 'Per-board sort type', typeof Conf['Index Sort'] === 'object');
      sortEntry.title = 'Set the sorting order of each board independently.';
      $.on(sortEntry.firstChild, 'change', this.cb.perBoardSort);
      entries.splice(3, 0, {
        el: sortEntry
      });
      Header.menu.addEntry({
        el: $.el('span', {
          textContent: 'Index Navigation'
        }),
        order: 100,
        subEntries: entries
      });
      this.navLinks = $.el('div', {
        className: 'navLinks json-index'
      });
      $.extend(this.navLinks, {
        innerHTML: "<span class=\"brackets-wrap indexlink\"><a href=\"#index\">Index</a></span> <span class=\"brackets-wrap cataloglink\"><a href=\"#catalog\">Catalog</a></span> <span class=\"brackets-wrap archlistlink\"><a href=\"./archive\">Archive</a></span> <span class=\"brackets-wrap bottomlink\"><a href=\"#bottom\">Bottom</a></span> <span class=\"brackets-wrap\" id=\"index-last-refresh\"><a href=\"javascript:;\"><time title=\"Last index refresh\">...</time></a></span> <input type=\"search\" id=\"index-search\" class=\"field\" placeholder=\"Search\"><a id=\"index-search-clear\" href=\"javascript:;\" title=\"Clear search\">×</a><span id=\"hidden-label\" hidden> &mdash; <span id=\"hidden-count\"></span> <span id=\"hidden-toggle\">[<a href=\"javascript:;\">Show</a>]</span></span><span id=\"index-options\"><input type=\"checkbox\" id=\"index-rev\" name=\"Reverse Sort\" title=\"Reverse sort order\"><span id=\"lastlong-options\" hidden><input type=\"text\" title=\"Minimum letter count (without image)\"><input type=\"text\" title=\"Minimum letter count (with image)\"></span><select id=\"index-sort\" name=\"Index Sort\"><option disabled>Index Sort</option><option value=\"bump\">Bump order</option><option value=\"lastreply\">Last reply</option><option value=\"lastlong\">Last long reply</option><option value=\"birth\">Creation date</option><option value=\"replycount\">Reply count</option><option value=\"filecount\">File count</option></select><select id=\"index-size\" name=\"Index Size\"><option disabled>Image Size</option><option value=\"small\">Small</option><option value=\"large\">Large</option></select><select id=\"index-mode\" name=\"Index Mode\"><option disabled>Index Mode</option><option value=\"paged\">Paged</option><option value=\"infinite\">Infinite scrolling</option><option value=\"all pages\">All threads</option><option value=\"catalog\">Catalog</option></select></span>"
      });
      $('.cataloglink a', this.navLinks).href = CatalogLinks.catalog();
      if ((ref5 = g.BOARD.ID) === 'b' || ref5 === 'trash' || ref5 === 'bant') {
        $('.archlistlink', this.navLinks).hidden = true;
      }
      $.on($('#index-last-refresh a', this.navLinks), 'click', this.cb.refreshFront);
      this.searchInput = $('#index-search', this.navLinks);
      this.setupSearch();
      $.on(this.searchInput, 'input', this.onSearchInput);
      $.on($('#index-search-clear', this.navLinks), 'click', this.clearSearch);
      this.hideLabel = $('#hidden-label', this.navLinks);
      $.on($('#hidden-toggle a', this.navLinks), 'click', this.cb.toggleHiddenThreads);
      this.selectRev = $('#index-rev', this.navLinks);
      this.selectMode = $('#index-mode', this.navLinks);
      this.selectSort = $('#index-sort', this.navLinks);
      this.selectSize = $('#index-size', this.navLinks);
      $.on(this.selectRev, 'change', this.cb.sort);
      $.on(this.selectMode, 'change', this.cb.mode);
      $.on(this.selectSort, 'change', this.cb.sort);
      $.on(this.selectSize, 'change', $.cb.value);
      $.on(this.selectSize, 'change', this.cb.size);
      ref6 = [this.selectMode, this.selectSize];
      for (k = 0, len1 = ref6.length; k < len1; k++) {
        select = ref6[k];
        select.value = Conf[select.name];
      }
      this.selectRev.checked = /-rev$/.test(Index.currentSort);
      this.selectSort.value = Index.currentSort.replace(/-rev$/, '');
      this.lastLongOptions = $('#lastlong-options', this.navLinks);
      this.lastLongInputs = $$('input', this.lastLongOptions);
      this.lastLongThresholds = [0, 0];
      this.lastLongOptions.hidden = this.selectSort.value !== 'lastlong';
      ref7 = this.lastLongInputs;
      for (i = l = 0, len2 = ref7.length; l < len2; i = ++l) {
        input = ref7[i];
        $.on(input, 'change', this.cb.lastLongThresholds);
        tRaw = Conf["Last Long Reply Thresholds " + i];
        input.value = this.lastLongThresholds[i] = typeof tRaw === 'object' ? (ref8 = tRaw[g.BOARD.ID]) != null ? ref8 : 100 : tRaw;
      }
      this.root = $.el('div', {
        className: 'board json-index'
      });
      $.on(this.root, 'click', this.cb.hoverToggle);
      this.cb.size();
      this.cb.hover();
      this.pagelist = $.el('div', {
        className: 'pagelist json-index'
      });
      $.extend(this.pagelist, {
        innerHTML: "<div class=\"prev\"><a><button disabled>Previous</button></a></div><div class=\"pages\"></div><div class=\"next\"><a><button disabled>Next</button></a></div><div class=\"pages cataloglink\"><a href=\"./catalog\">Catalog</a></div>"
      });
      $('.cataloglink a', this.pagelist).href = CatalogLinks.catalog();
      $.on(this.pagelist, 'click', this.cb.pageNav);
      this.update(true);
      $.onExists(doc, 'title + *', function() {
        return d.title = d.title.replace(/\ -\ Page\ \d+/, '');
      });
      $.onExists(doc, '.board > .thread > .postContainer, .board + *', function() {
        var board, el, len3, m, ref9, topNavPos;
        Build.hat = $('.board > .thread > img:first-child');
        if (Build.hat) {
          g.BOARD.threads.forEach(function(thread) {
            if (thread.nodes.root) {
              return $.prepend(thread.nodes.root, Build.hat.cloneNode(false));
            }
          });
          $.addClass(doc, 'hats-enabled');
          $.addStyle(".catalog-thread::after {background-image: url(" + Build.hat.src + ");}");
        }
        board = $('.board');
        $.replace(board, Index.root);
        if (Index.loaded) {
          $.event('PostsInserted', null, Index.root);
        }
        try {
          d.implementation.createDocument(null, null, null).appendChild(board);
        } catch (_error) {}
        ref9 = $$('.navLinks');
        for (m = 0, len3 = ref9.length; m < len3; m++) {
          el = ref9[m];
          $.rm(el);
        }
        $.rm($.id('ctrl-top'));
        topNavPos = $.id('delform').previousElementSibling;
        $.before(topNavPos, $.el('hr'));
        return $.before(topNavPos, Index.navLinks);
      });
      return Main.ready(function() {
        var pagelist;
        if ((pagelist = $('.pagelist'))) {
          $.replace(pagelist, Index.pagelist);
        }
        return $.rmClass(doc, 'index-loading');
      });
    },
    scroll: function() {
      var pageNum, threadIDs;
      if (Index.req || !Index.liveThreadData || Conf['Index Mode'] !== 'infinite' || (window.scrollY <= doc.scrollHeight - (300 + window.innerHeight))) {
        return;
      }
      if (Index.pageNum == null) {
        Index.pageNum = Index.currentPage;
      }
      pageNum = ++Index.pageNum;
      if (pageNum > Index.pagesNum) {
        return Index.endNotice();
      }
      threadIDs = Index.threadsOnPage(pageNum);
      return Index.buildStructure(threadIDs);
    },
    endNotice: (function() {
      var notify, reset;
      notify = false;
      reset = function() {
        return notify = false;
      };
      return function() {
        if (notify) {
          return;
        }
        notify = true;
        new Notice('info', "Last page reached.", 2);
        return setTimeout(reset, 3 * $.SECOND);
      };
    })(),
    menu: {
      init: function() {
        if (g.VIEW !== 'index' || !Conf['JSON Index'] || !Conf['Menu'] || !Conf['Thread Hiding Link'] || g.BOARD.ID === 'f') {
          return;
        }
        return Menu.menu.addEntry({
          el: $.el('a', {
            href: 'javascript:;',
            className: 'has-shortcut-text'
          }, {
            innerHTML: "<span></span><span class=\"shortcut-text\">Shift+click</span>"
          }),
          order: 20,
          open: function(arg) {
            var thread;
            thread = arg.thread;
            if (Conf['Index Mode'] !== 'catalog') {
              return false;
            }
            this.el.firstElementChild.textContent = thread.isHidden ? 'Unhide' : 'Hide';
            if (this.cb) {
              $.off(this.el, 'click', this.cb);
            }
            this.cb = function() {
              $.event('CloseMenu');
              return Index.toggleHide(thread);
            };
            $.on(this.el, 'click', this.cb);
            return true;
          }
        });
      }
    },
    node: function() {
      if (this.isReply || this.isClone || !(Index.threadPosition[this.ID] != null)) {
        return;
      }
      return this.thread.setPage(Math.floor(Index.threadPosition[this.ID] / Index.threadsNumPerPage) + 1);
    },
    catalogNode: function() {
      return $.on(this.nodes.root, 'mousedown click', (function(_this) {
        return function(e) {
          if (!(e.button === 0 && e.shiftKey)) {
            return;
          }
          if (e.type === 'click') {
            Index.toggleHide(_this.thread);
          }
          return e.preventDefault();
        };
      })(this));
    },
    toggleHide: function(thread) {
      if (Index.showHiddenThreads) {
        ThreadHiding.show(thread);
        if (!ThreadHiding.db.get({
          boardID: thread.board.ID,
          threadID: thread.ID
        })) {
          return;
        }
      } else {
        ThreadHiding.hide(thread);
      }
      return ThreadHiding.saveHiddenState(thread);
    },
    cycleSortType: function() {
      var i, k, len1, type, types;
      types = slice.call(Index.selectSort.options).filter(function(option) {
        return !option.disabled;
      });
      for (i = k = 0, len1 = types.length; k < len1; i = ++k) {
        type = types[i];
        if (type.selected) {
          break;
        }
      }
      types[(i + 1) % types.length].selected = true;
      return $.event('change', null, Index.selectSort);
    },
    cb: {
      initFinished: function() {
        Index.initFinishedFired = true;
        return $.queueTask(function() {
          return Index.cb.postsInserted();
        });
      },
      postsInserted: function() {
        var n;
        if (!Index.initFinishedFired) {
          return;
        }
        n = 0;
        g.posts.forEach(function(post) {
          if (!post.isFetchedQuote && !post.indexRefreshSeen && doc.contains(post.nodes.root)) {
            post.indexRefreshSeen = true;
            return n++;
          }
        });
        if (n) {
          return $.event('IndexRefresh');
        }
      },
      toggleHiddenThreads: function() {
        $('#hidden-toggle a', Index.navLinks).textContent = (Index.showHiddenThreads = !Index.showHiddenThreads) ? 'Hide' : 'Show';
        Index.sort();
        return Index.buildIndex();
      },
      mode: function() {
        Index.pushState({
          mode: this.value
        });
        return Index.pageLoad(false);
      },
      sort: function() {
        var value;
        value = Index.selectRev.checked ? Index.selectSort.value + "-rev" : Index.selectSort.value;
        Index.pushState({
          sort: value
        });
        return Index.pageLoad(false);
      },
      resort: function(e) {
        var ref;
        Index.changed.order = true;
        if (!(e != null ? (ref = e.detail) != null ? ref.deferred : void 0 : void 0)) {
          return Index.pageLoad(false);
        }
      },
      perBoardSort: function() {
        var i, k;
        Conf['Index Sort'] = this.checked ? {} : '';
        Index.saveSort();
        for (i = k = 0; k < 2; i = ++k) {
          Conf["Last Long Reply Thresholds " + i] = this.checked ? {} : '';
          Index.saveLastLongThresholds(i);
        }
      },
      lastLongThresholds: function() {
        var i, value;
        i = slice.call(this.parentNode.children).indexOf(this);
        value = +this.value;
        if (!Number.isFinite(value)) {
          this.value = Index.lastLongThresholds[i];
          return;
        }
        Index.lastLongThresholds[i] = value;
        Index.saveLastLongThresholds(i);
        Index.changed.order = true;
        return Index.pageLoad(false);
      },
      size: function(e) {
        if (Conf['Index Mode'] !== 'catalog') {
          $.rmClass(Index.root, 'catalog-small');
          $.rmClass(Index.root, 'catalog-large');
        } else if (Conf['Index Size'] === 'small') {
          $.addClass(Index.root, 'catalog-small');
          $.rmClass(Index.root, 'catalog-large');
        } else {
          $.addClass(Index.root, 'catalog-large');
          $.rmClass(Index.root, 'catalog-small');
        }
        if (e) {
          return Index.buildIndex();
        }
      },
      replies: function() {
        return Index.buildIndex();
      },
      hover: function() {
        return doc.classList.toggle('catalog-hover-expand', Conf['Catalog Hover Expand']);
      },
      hoverToggle: function(e) {
        var input, thread;
        if (Conf['Catalog Hover Toggle'] && $.hasClass(doc, 'catalog-mode') && !$.modifiedClick(e) && !$.x('ancestor-or-self::a', e.target)) {
          input = Index.inputs['Catalog Hover Expand'];
          input.checked = !input.checked;
          $.event('change', null, input);
          if ((thread = Get.threadFromNode(e.target))) {
            Index.cb.catalogReplies.call(thread);
            return Index.cb.hoverAdjust.call(thread.OP.nodes);
          }
        }
      },
      popstate: function(e) {
        var mode, nCommands, page, ref, searched, sort;
        if (e != null ? e.state : void 0) {
          ref = e.state, searched = ref.searched, mode = ref.mode, sort = ref.sort;
          page = Index.getCurrentPage();
          Index.setState({
            search: searched,
            mode: mode,
            sort: sort,
            page: page
          });
          return Index.pageLoad(false);
        } else {
          nCommands = Index.processHash();
          if (Conf['Refreshed Navigation'] && nCommands) {
            return Index.update();
          } else {
            return Index.pageLoad();
          }
        }
      },
      pageNav: function(e) {
        var a;
        if ($.modifiedClick(e)) {
          return;
        }
        switch (e.target.nodeName) {
          case 'BUTTON':
            e.target.blur();
            a = e.target.parentNode;
            break;
          case 'A':
            a = e.target;
            break;
          default:
            return;
        }
        if (a.textContent === 'Catalog') {
          return;
        }
        e.preventDefault();
        return Index.userPageNav(+a.pathname.split(/\/+/)[2] || 1);
      },
      refreshFront: function() {
        Index.pushState({
          page: 1
        });
        return Index.update();
      },
      catalogReplies: function() {
        if (Conf['Show Replies'] && $.hasClass(doc, 'catalog-hover-expand') && !this.catalogView.nodes.replies) {
          return Index.buildCatalogReplies(this);
        }
      },
      hoverAdjust: function() {
        var rect, style, x;
        if (!$.hasClass(doc, 'catalog-hover-expand')) {
          return;
        }
        rect = this.post.getBoundingClientRect();
        if ((x = $.minmax(0, -rect.left, doc.clientWidth - rect.right))) {
          style = this.post.style;
          style.left = x + "px";
          style.right = (-x) + "px";
          return $.one(this.root, 'mouseleave', function() {
            return style.left = style.right = null;
          });
        }
      }
    },
    scrollToIndex: function() {
      return Header.scrollToIfNeeded((Index.navLinks.getBoundingClientRect().height ? Index.navLinks : Index.root));
    },
    getCurrentPage: function() {
      return +window.location.pathname.split(/\/+/)[2] || 1;
    },
    userPageNav: function(page) {
      Index.pushState({
        page: page
      });
      if (Conf['Refreshed Navigation']) {
        return Index.update();
      } else {
        return Index.pageLoad();
      }
    },
    hashCommands: {
      mode: {
        'paged': 'paged',
        'infinite-scrolling': 'infinite',
        'infinite': 'infinite',
        'all-threads': 'all pages',
        'all-pages': 'all pages',
        'catalog': 'catalog'
      },
      sort: {
        'bump-order': 'bump',
        'last-reply': 'lastreply',
        'last-long-reply': 'lastlong',
        'creation-date': 'birth',
        'reply-count': 'replycount',
        'file-count': 'filecount'
      }
    },
    processHash: function() {
      var command, commands, hash, k, leftover, len1, mode, ref, sort, state;
      hash = ((ref = location.href.match(/#.*/)) != null ? ref[0] : void 0) || '';
      state = {
        replace: true
      };
      commands = hash.slice(1).split('/');
      leftover = [];
      for (k = 0, len1 = commands.length; k < len1; k++) {
        command = commands[k];
        if ((mode = Index.hashCommands.mode[command])) {
          state.mode = mode;
        } else if (command === 'index') {
          state.mode = Conf['Previous Index Mode'];
          state.page = 1;
        } else if ((sort = Index.hashCommands.sort[command.replace(/-rev$/, '')])) {
          state.sort = sort;
          if (/-rev$/.test(command)) {
            state.sort += '-rev';
          }
        } else if (/^s=/.test(command)) {
          state.search = decodeURIComponent(command.slice(2)).replace(/\+/g, ' ').trim();
        } else {
          leftover.push(command);
        }
      }
      hash = leftover.join('/');
      if (hash) {
        state.hash = "#" + hash;
      }
      Index.pushState(state);
      return commands.length - leftover.length;
    },
    pushState: function(state) {
      var hash, pageBeforeSearch, pathname, ref, replace, search;
      search = state.search, hash = state.hash, replace = state.replace;
      pageBeforeSearch = (ref = history.state) != null ? ref.oldpage : void 0;
      if ((search != null) && search !== Index.search) {
        state.page = search ? 1 : pageBeforeSearch || 1;
        if (!search) {
          pageBeforeSearch = void 0;
        } else if (!Index.search) {
          pageBeforeSearch = Index.currentPage;
        }
      }
      Index.setState(state);
      pathname = Index.currentPage === 1 ? "/" + g.BOARD + "/" : "/" + g.BOARD + "/" + Index.currentPage;
      hash || (hash = '');
      return history[replace ? 'replaceState' : 'pushState']({
        mode: Conf['Index Mode'],
        sort: Index.currentSort,
        searched: Index.search,
        oldpage: pageBeforeSearch
      }, '', location.protocol + "//" + location.host + pathname + hash);
    },
    setState: function(arg) {
      var hash, mode, page, ref, search, sort;
      search = arg.search, mode = arg.mode, sort = arg.sort, page = arg.page, hash = arg.hash;
      if ((search != null) && search !== Index.search) {
        Index.changed.search = true;
        Index.search = search;
      }
      if ((mode != null) && mode !== Conf['Index Mode']) {
        Index.changed.mode = true;
        Conf['Index Mode'] = mode;
        $.set('Index Mode', mode);
        if (!(mode === 'catalog' || Conf['Previous Index Mode'] === mode)) {
          Conf['Previous Index Mode'] = mode;
          $.set('Previous Index Mode', mode);
        }
      }
      if ((sort != null) && sort !== Index.currentSort) {
        Index.changed.sort = true;
        Index.currentSort = sort;
        Index.saveSort();
      }
      if ((ref = Conf['Index Mode']) === 'all pages' || ref === 'catalog') {
        page = 1;
      }
      if ((page != null) && page !== Index.currentPage) {
        Index.changed.page = true;
        Index.currentPage = page;
      }
      if (hash != null) {
        return Index.changed.hash = true;
      }
    },
    savePerBoard: function(key, value) {
      if (typeof Conf[key] === 'object') {
        Conf[key][g.BOARD.ID] = value;
      } else {
        Conf[key] = value;
      }
      return $.set(key, Conf[key]);
    },
    saveSort: function() {
      return Index.savePerBoard('Index Sort', Index.currentSort);
    },
    saveLastLongThresholds: function(i) {
      return Index.savePerBoard("Last Long Reply Thresholds " + i, Index.lastLongThresholds[i]);
    },
    pageLoad: function(scroll) {
      var hash, mode, order, page, ref, search, sort, threads;
      if (scroll == null) {
        scroll = true;
      }
      if (!Index.liveThreadData) {
        return;
      }
      ref = Index.changed, threads = ref.threads, order = ref.order, search = ref.search, mode = ref.mode, sort = ref.sort, page = ref.page, hash = ref.hash;
      threads || (threads = search);
      order || (order = sort);
      if (threads || order) {
        Index.sort();
      }
      if (threads) {
        Index.buildPagelist();
      }
      if (search) {
        Index.setupSearch();
      }
      if (mode) {
        Index.setupMode();
      }
      if (sort) {
        Index.setupSort();
      }
      if (threads || mode || page || order) {
        Index.buildIndex();
      }
      if (threads || page) {
        Index.setPage();
      }
      if (scroll && !hash) {
        Index.scrollToIndex();
      }
      if (hash) {
        Header.hashScroll();
      }
      return Index.changed = {};
    },
    setupMode: function() {
      var k, len1, mode, ref;
      ref = ['paged', 'infinite', 'all pages', 'catalog'];
      for (k = 0, len1 = ref.length; k < len1; k++) {
        mode = ref[k];
        $[mode === Conf['Index Mode'] ? 'addClass' : 'rmClass'](doc, (mode.replace(/\ /g, '-')) + "-mode");
      }
      Index.selectMode.value = Conf['Index Mode'];
      Index.cb.size();
      Index.showHiddenThreads = false;
      return $('#hidden-toggle a', Index.navLinks).textContent = 'Show';
    },
    setupSort: function() {
      Index.selectRev.checked = /-rev$/.test(Index.currentSort);
      Index.selectSort.value = Index.currentSort.replace(/-rev$/, '');
      return Index.lastLongOptions.hidden = Index.selectSort.value !== 'lastlong';
    },
    getPagesNum: function() {
      if (Index.search) {
        return Math.ceil(Index.sortedThreadIDs.length / Index.threadsNumPerPage);
      } else {
        return Index.pagesNum;
      }
    },
    getMaxPageNum: function() {
      return Math.max(1, Index.getPagesNum());
    },
    buildPagelist: function() {
      var a, i, k, maxPageNum, nodes, pagesRoot, ref;
      pagesRoot = $('.pages', Index.pagelist);
      maxPageNum = Index.getMaxPageNum();
      if (pagesRoot.childElementCount !== maxPageNum) {
        nodes = [];
        for (i = k = 1, ref = maxPageNum; k <= ref; i = k += 1) {
          a = $.el('a', {
            textContent: i,
            href: i === 1 ? './' : i
          });
          nodes.push($.tn('['), a, $.tn('] '));
        }
        $.rmAll(pagesRoot);
        return $.add(pagesRoot, nodes);
      }
    },
    setPage: function() {
      var a, href, maxPageNum, next, pageNum, pagesRoot, prev, strong;
      pageNum = Index.currentPage;
      maxPageNum = Index.getMaxPageNum();
      pagesRoot = $('.pages', Index.pagelist);
      prev = pagesRoot.previousSibling.firstChild;
      next = pagesRoot.nextSibling.firstChild;
      href = Math.max(pageNum - 1, 1);
      prev.href = href === 1 ? './' : href;
      prev.firstChild.disabled = href === pageNum;
      href = Math.min(pageNum + 1, maxPageNum);
      next.href = href === 1 ? './' : href;
      next.firstChild.disabled = href === pageNum;
      if (strong = $('strong', pagesRoot)) {
        if (+strong.textContent === pageNum) {
          return;
        }
        $.replace(strong, strong.firstChild);
      } else {
        strong = $.el('strong');
      }
      a = pagesRoot.children[pageNum - 1];
      $.before(a, strong);
      return $.add(strong, a);
    },
    updateHideLabel: function() {
      var hiddenCount, k, len1, ref, threadID;
      if (!Index.hideLabel) {
        return;
      }
      hiddenCount = 0;
      ref = Index.liveThreadIDs;
      for (k = 0, len1 = ref.length; k < len1; k++) {
        threadID = ref[k];
        if (Index.isHidden(threadID)) {
          hiddenCount++;
        }
      }
      if (!hiddenCount) {
        Index.hideLabel.hidden = true;
        if (Index.showHiddenThreads) {
          Index.cb.toggleHiddenThreads();
        }
        return;
      }
      Index.hideLabel.hidden = false;
      return $('#hidden-count', Index.navLinks).textContent = hiddenCount === 1 ? '1 hidden thread' : hiddenCount + " hidden threads";
    },
    update: function(firstTime) {
      var now, ref, ref1;
      if ((ref = Index.req) != null) {
        ref.abort();
      }
      if ((ref1 = Index.notice) != null) {
        ref1.close();
      }
      if (Conf['Index Refresh Notifications'] && d.readyState !== 'loading') {
        Index.notice = new Notice('info', 'Refreshing index...');
      } else {
        now = Date.now();
        $.ready(function() {
          return Index.nTimeout = setTimeout((function() {
            if (Index.req && !Index.notice) {
              return Index.notice = new Notice('info', 'Refreshing index...');
            }
          }), 3 * $.SECOND - (Date.now() - now));
        });
      }
      if (!firstTime && d.readyState !== 'loading' && !$('.board + *')) {
        location.reload();
        return;
      }
      Index.req = $.ajax(location.protocol + "//a.4cdn.org/" + g.BOARD + "/catalog.json", {
        onabort: Index.load,
        onloadend: Index.load
      }, {
        whenModified: 'Index'
      });
      return $.addClass(Index.button, 'fa-spin');
    },
    load: function(e) {
      var err, nTimeout, notice, ref, req, timeEl;
      $.rmClass(Index.button, 'fa-spin');
      req = Index.req, notice = Index.notice, nTimeout = Index.nTimeout;
      if (nTimeout) {
        clearTimeout(nTimeout);
      }
      delete Index.nTimeout;
      delete Index.req;
      delete Index.notice;
      if (e.type === 'abort') {
        req.onloadend = null;
        if (notice != null) {
          notice.close();
        }
        return;
      }
      if ((ref = req.status) !== 200 && ref !== 304) {
        err = "Index refresh failed. " + (req.status ? "Error " + req.statusText + " (" + req.status + ")" : 'Connection Error');
        if (notice) {
          notice.setType('warning');
          notice.el.lastElementChild.textContent = err;
          setTimeout(notice.close, $.SECOND);
        } else {
          new Notice('warning', err, 1);
        }
        return;
      }
      try {
        if (req.status === 200) {
          Index.parse(req.response);
        } else if (req.status === 304) {
          Index.pageLoad();
        }
      } catch (_error) {
        err = _error;
        c.error("Index failure: " + err.message, err.stack);
        if (notice) {
          notice.setType('error');
          notice.el.lastElementChild.textContent = 'Index refresh failed.';
          setTimeout(notice.close, $.SECOND);
        } else {
          new Notice('error', 'Index refresh failed.', 1);
        }
        return;
      }
      if (notice) {
        if (Conf['Index Refresh Notifications']) {
          notice.setType('success');
          notice.el.lastElementChild.textContent = 'Index refreshed!';
          setTimeout(notice.close, $.SECOND);
        } else {
          notice.close();
        }
      }
      timeEl = $('#index-last-refresh time', Index.navLinks);
      timeEl.dataset.utc = Date.parse(req.getResponseHeader('Last-Modified'));
      return RelativeDates.update(timeEl);
    },
    parse: function(pages) {
      $.cleanCache(function(url) {
        return /^https?:\/\/a\.4cdn\.org\//.test(url);
      });
      Index.parseThreadList(pages);
      Index.changed.threads = true;
      return Index.pageLoad();
    },
    parseThreadList: function(pages) {
      var ID, data, i, k, l, len1, len2, obj, ref, ref1, ref2, reply, results;
      Index.pagesNum = pages.length;
      Index.threadsNumPerPage = ((ref = pages[0]) != null ? ref.threads.length : void 0) || 1;
      Index.liveThreadData = pages.reduce((function(arr, next) {
        return arr.concat(next.threads);
      }), []);
      Index.liveThreadIDs = Index.liveThreadData.map(function(data) {
        return data.no;
      });
      Index.liveThreadDict = {};
      Index.threadPosition = {};
      Index.parsedThreads = {};
      Index.replyData = {};
      ref1 = Index.liveThreadData;
      for (i = k = 0, len1 = ref1.length; k < len1; i = ++k) {
        data = ref1[i];
        Index.liveThreadDict[data.no] = data;
        Index.threadPosition[data.no] = i;
        Index.parsedThreads[data.no] = obj = Build.parseJSON(data, g.BOARD.ID);
        obj.filterResults = results = Filter.test(obj);
        obj.isOnTop = results.top;
        obj.isHidden = results.hide || ThreadHiding.isHidden(obj.boardID, obj.threadID);
        if (data.last_replies) {
          ref2 = data.last_replies;
          for (l = 0, len2 = ref2.length; l < len2; l++) {
            reply = ref2[l];
            Index.replyData[g.BOARD + "." + reply.no] = reply;
          }
        }
      }
      if (Index.liveThreadData[0]) {
        Build.spoilerRange[g.BOARD.ID] = Index.liveThreadData[0].custom_spoiler;
      }
      g.BOARD.threads.forEach(function(thread) {
        var ref3;
        if (ref3 = thread.ID, indexOf.call(Index.liveThreadIDs, ref3) < 0) {
          return thread.collect();
        }
      });
      $.event('IndexUpdate', {
        threads: (function() {
          var len3, m, ref3, results1;
          ref3 = Index.liveThreadIDs;
          results1 = [];
          for (m = 0, len3 = ref3.length; m < len3; m++) {
            ID = ref3[m];
            results1.push(g.BOARD + "." + ID);
          }
          return results1;
        })()
      });
    },
    isHidden: function(threadID) {
      var thread;
      if ((thread = g.BOARD.threads[threadID]) && thread.OP && !thread.OP.isFetchedQuote) {
        return thread.isHidden;
      } else {
        return Index.parsedThreads[threadID].isHidden;
      }
    },
    isHiddenReply: function(threadID, replyData) {
      return PostHiding.isHidden(g.BOARD.ID, threadID, replyData.no) || Filter.isHidden(Build.parseJSON(replyData, g.BOARD.ID));
    },
    lastPost: function(threadID) {
      var threadData;
      threadData = Index.liveThreadDict[threadID];
      if (threadData != null ? threadData.last_replies : void 0) {
        return threadData.last_replies[threadData.last_replies.length - 1].no;
      } else {
        return threadID;
      }
    },
    buildThreads: function(threadIDs, isCatalog, withReplies) {
      var ID, OP, err, errors, isStale, k, len1, newPosts, newThreads, obj, t, thread, threadData, threads;
      threads = [];
      newThreads = [];
      newPosts = [];
      for (k = 0, len1 = threadIDs.length; k < len1; k++) {
        ID = threadIDs[k];
        try {
          threadData = Index.liveThreadDict[ID];
          if ((thread = g.BOARD.threads[ID])) {
            isStale = (thread.json !== threadData) && (JSON.stringify(thread.json) !== JSON.stringify(threadData));
            if (isStale) {
              thread.setCount('post', threadData.replies + 1, threadData.bumplimit);
              thread.setCount('file', threadData.images + !!threadData.ext, threadData.imagelimit);
              thread.setStatus('Sticky', !!threadData.sticky);
              thread.setStatus('Closed', !!threadData.closed);
            }
            if (thread.catalogView) {
              $.rm(thread.catalogView.nodes.replies);
              thread.catalogView.nodes.replies = null;
            }
          } else {
            thread = new Thread(ID, g.BOARD);
            newThreads.push(thread);
          }
          thread.json = threadData;
          threads.push(thread);
          if ((OP = thread.OP) && !OP.isFetchedQuote) {
            OP.setCatalogOP(isCatalog);
            thread.setPage(Math.floor(Index.threadPosition[ID] / Index.threadsNumPerPage) + 1);
          } else {
            obj = Index.parsedThreads[ID];
            OP = new Post(Build.post(obj), thread, g.BOARD);
            OP.filterResults = obj.filterResults;
            newPosts.push(OP);
          }
          if (!(isCatalog && thread.nodes.root)) {
            Build.thread(thread, threadData, withReplies);
          }
        } catch (_error) {
          err = _error;
          if (!errors) {
            errors = [];
          }
          errors.push({
            message: "Parsing of Thread No." + thread + " failed. Thread will be skipped.",
            error: err
          });
        }
      }
      if (errors) {
        Main.handleErrors(errors);
      }
      if (withReplies) {
        newPosts = newPosts.concat(Index.buildReplies(threads));
      }
      Main.callbackNodes('Thread', newThreads);
      Main.callbackNodes('Post', newPosts);
      Index.updateHideLabel();
      $.event('IndexRefreshInternal', {
        threadIDs: (function() {
          var l, len2, results1;
          results1 = [];
          for (l = 0, len2 = threads.length; l < len2; l++) {
            t = threads[l];
            results1.push(t.fullID);
          }
          return results1;
        })(),
        isCatalog: isCatalog
      });
      return threads;
    },
    buildReplies: function(threads) {
      var data, err, errors, k, l, lastReplies, len1, len2, node, nodes, post, posts, thread;
      posts = [];
      for (k = 0, len1 = threads.length; k < len1; k++) {
        thread = threads[k];
        if (!(lastReplies = Index.liveThreadDict[thread.ID].last_replies)) {
          continue;
        }
        nodes = [];
        for (l = 0, len2 = lastReplies.length; l < len2; l++) {
          data = lastReplies[l];
          if ((post = thread.posts[data.no]) && !post.isFetchedQuote) {
            nodes.push(post.nodes.root);
            continue;
          }
          nodes.push(node = Build.postFromObject(data, thread.board.ID));
          try {
            posts.push(new Post(node, thread, thread.board));
          } catch (_error) {
            err = _error;
            if (!errors) {
              errors = [];
            }
            errors.push({
              message: "Parsing of Post No." + data.no + " failed. Post will be skipped.",
              error: err
            });
          }
        }
        $.add(thread.nodes.root, nodes);
      }
      if (errors) {
        Main.handleErrors(errors);
      }
      return posts;
    },
    buildCatalogViews: function(threads) {
      var ID, catalogThreads, k, len1, page, root, thread;
      catalogThreads = [];
      for (k = 0, len1 = threads.length; k < len1; k++) {
        thread = threads[k];
        if (!(!thread.catalogView)) {
          continue;
        }
        ID = thread.ID;
        page = Math.floor(Index.threadPosition[ID] / Index.threadsNumPerPage) + 1;
        root = Build.catalogThread(thread, Index.liveThreadDict[ID], page);
        catalogThreads.push(new CatalogThread(root, thread));
      }
      Main.callbackNodes('CatalogThread', catalogThreads);
    },
    sizeCatalogViews: function(threads) {
      var height, k, len1, ratio, ref, size, thread, thumb, width;
      size = Conf['Index Size'] === 'small' ? 150 : 250;
      for (k = 0, len1 = threads.length; k < len1; k++) {
        thread = threads[k];
        thumb = thread.catalogView.nodes.thumb;
        ref = thumb.dataset, width = ref.width, height = ref.height;
        if (!width) {
          continue;
        }
        ratio = size / Math.max(width, height);
        thumb.style.width = width * ratio + 'px';
        thumb.style.height = height * ratio + 'px';
      }
    },
    buildCatalogReplies: function(thread) {
      var data, k, lastReplies, len1, nodes, replies, reply;
      nodes = thread.catalogView.nodes;
      if (!(lastReplies = Index.liveThreadDict[thread.ID].last_replies)) {
        return;
      }
      replies = [];
      for (k = 0, len1 = lastReplies.length; k < len1; k++) {
        data = lastReplies[k];
        if (Index.isHiddenReply(thread.ID, data)) {
          continue;
        }
        reply = Build.catalogReply(thread, data);
        RelativeDates.update($('time', reply));
        $.on($('.catalog-reply-preview', reply), 'mouseover', QuotePreview.mouseover);
        replies.push(reply);
      }
      nodes.replies = $.el('div', {
        className: 'catalog-replies'
      });
      $.add(nodes.replies, replies);
      $.add(thread.OP.nodes.post, nodes.replies);
    },
    sort: function() {
      var lastlong, lastlongD, liveThreadData, liveThreadIDs, thread, threadIDs;
      liveThreadIDs = Index.liveThreadIDs, liveThreadData = Index.liveThreadData;
      if (!liveThreadData) {
        return;
      }
      Index.sortedThreadIDs = (function() {
        var k, len1;
        switch (Index.currentSort.replace(/-rev$/, '')) {
          case 'lastreply':
            return slice.call(liveThreadData).sort(function(a, b) {
              var num;
              if ((num = a.last_replies)) {
                a = num[num.length - 1];
              }
              if ((num = b.last_replies)) {
                b = num[num.length - 1];
              }
              return b.no - a.no;
            }).map(function(post) {
              return post.no;
            });
          case 'lastlong':
            lastlong = function(thread) {
              var i, k, len, r, ref;
              ref = thread.last_replies || [];
              for (i = k = ref.length - 1; k >= 0; i = k += -1) {
                r = ref[i];
                if (Index.isHiddenReply(thread.no, r)) {
                  continue;
                }
                len = r.com ? Build.parseComment(r.com).replace(/[^a-z]/ig, '').length : 0;
                if (len >= Index.lastLongThresholds[+(!!r.ext)]) {
                  return r;
                }
              }
              if (thread.omitted_posts) {
                return thread.last_replies[0];
              } else {
                return thread;
              }
            };
            lastlongD = {};
            for (k = 0, len1 = liveThreadData.length; k < len1; k++) {
              thread = liveThreadData[k];
              lastlongD[thread.no] = lastlong(thread).no;
            }
            return slice.call(liveThreadData).sort(function(a, b) {
              return lastlongD[b.no] - lastlongD[a.no];
            }).map(function(post) {
              return post.no;
            });
          case 'bump':
            return liveThreadIDs;
          case 'birth':
            return slice.call(liveThreadIDs).sort(function(a, b) {
              return b - a;
            });
          case 'replycount':
            return slice.call(liveThreadData).sort(function(a, b) {
              return b.replies - a.replies;
            }).map(function(post) {
              return post.no;
            });
          case 'filecount':
            return slice.call(liveThreadData).sort(function(a, b) {
              return b.images - a.images;
            }).map(function(post) {
              return post.no;
            });
          default:
            return liveThreadIDs;
        }
      })();
      if (/-rev$/.test(Index.currentSort)) {
        Index.sortedThreadIDs = slice.call(Index.sortedThreadIDs).reverse();
      }
      if (Index.search && (threadIDs = Index.querySearch(Index.search))) {
        Index.sortedThreadIDs = threadIDs;
      }
      Index.sortOnTop(function(obj) {
        return obj.isSticky;
      });
      Index.sortOnTop(function(obj) {
        return obj.isOnTop || Conf['Pin Watched Threads'] && ThreadWatcher.isWatchedRaw(obj.boardID, obj.threadID);
      });
      if (Conf['Anchor Hidden Threads']) {
        return Index.sortOnTop(function(obj) {
          return !Index.isHidden(obj.threadID);
        });
      }
    },
    sortOnTop: function(match) {
      var ID, bottomThreads, k, len1, ref, topThreads;
      topThreads = [];
      bottomThreads = [];
      ref = Index.sortedThreadIDs;
      for (k = 0, len1 = ref.length; k < len1; k++) {
        ID = ref[k];
        (match(Index.parsedThreads[ID]) ? topThreads : bottomThreads).push(ID);
      }
      return Index.sortedThreadIDs = topThreads.concat(bottomThreads);
    },
    buildIndex: function() {
      var threadIDs;
      if (!Index.liveThreadData) {
        return;
      }
      switch (Conf['Index Mode']) {
        case 'all pages':
          threadIDs = Index.sortedThreadIDs;
          break;
        case 'catalog':
          threadIDs = Index.sortedThreadIDs.filter(function(ID) {
            return !Index.isHidden(ID) !== Index.showHiddenThreads;
          });
          break;
        default:
          threadIDs = Index.threadsOnPage(Index.currentPage);
      }
      delete Index.pageNum;
      $.rmAll(Index.root);
      $.rmAll(Header.hover);
      if (Conf['Index Mode'] === 'catalog') {
        Index.buildCatalog(threadIDs);
      } else {
        Index.buildStructure(threadIDs);
      }
    },
    threadsOnPage: function(pageNum) {
      var nodesPerPage, offset;
      nodesPerPage = Index.threadsNumPerPage;
      offset = nodesPerPage * (pageNum - 1);
      return Index.sortedThreadIDs.slice(offset, offset + nodesPerPage);
    },
    buildStructure: function(threadIDs) {
      var k, len1, nodes, thread, threads;
      threads = Index.buildThreads(threadIDs, false, Conf['Show Replies']);
      nodes = [];
      for (k = 0, len1 = threads.length; k < len1; k++) {
        thread = threads[k];
        nodes.push(thread.nodes.root, $.el('hr'));
      }
      $.add(Index.root, nodes);
      if (Index.root.parentNode) {
        $.event('PostsInserted', null, Index.root);
      }
      Index.loaded = true;
    },
    buildCatalog: function(threadIDs) {
      var fn, i, n, node0;
      i = 0;
      n = threadIDs.length;
      node0 = null;
      fn = function() {
        var j;
        if (node0 && !node0.parentNode) {
          return;
        }
        j = i > 0 && Index.root.parentNode ? n : i + 30;
        node0 = Index.buildCatalogPart(threadIDs.slice(i, j))[0];
        i = j;
        if (i < n) {
          return $.queueTask(fn);
        } else {
          if (Index.root.parentNode) {
            $.event('PostsInserted', null, Index.root);
          }
          return Index.loaded = true;
        }
      };
      fn();
    },
    buildCatalogPart: function(threadIDs) {
      var k, len1, nodes, thread, threads;
      threads = Index.buildThreads(threadIDs, true);
      Index.buildCatalogViews(threads);
      Index.sizeCatalogViews(threads);
      nodes = [];
      for (k = 0, len1 = threads.length; k < len1; k++) {
        thread = threads[k];
        thread.OP.setCatalogOP(true);
        $.add(thread.catalogView.nodes.root, thread.OP.nodes.root);
        nodes.push(thread.catalogView.nodes.root);
        $.on(thread.catalogView.nodes.root, 'mouseenter', Index.cb.catalogReplies.bind(thread));
        $.on(thread.OP.nodes.root, 'mouseenter', Index.cb.hoverAdjust.bind(thread.OP.nodes));
      }
      $.add(Index.root, nodes);
      return nodes;
    },
    clearSearch: function() {
      Index.searchInput.value = '';
      Index.onSearchInput();
      return Index.searchInput.focus();
    },
    setupSearch: function() {
      Index.searchInput.value = Index.search;
      if (Index.search) {
        return Index.searchInput.dataset.searching = 1;
      } else {
        return Index.searchInput.removeAttribute('data-searching');
      }
    },
    onSearchInput: function() {
      var search;
      search = Index.searchInput.value.trim();
      if (search === Index.search) {
        return;
      }
      Index.pushState({
        search: search,
        replace: !!search === !!Index.search
      });
      return Index.pageLoad(false);
    },
    querySearch: function(query) {
      var keywords;
      if (!(keywords = query.toLowerCase().match(/\S+/g))) {
        return;
      }
      return Index.sortedThreadIDs.filter(function(ID) {
        return Index.searchMatch(Index.parsedThreads[ID], keywords);
      });
    },
    searchMatch: function(obj, keywords) {
      var file, info, k, key, keyword, l, len1, len2, ref, text;
      info = obj.info, file = obj.file;
      if (info.comment == null) {
        info.comment = Build.parseComment(info.commentHTML.innerHTML);
      }
      text = [];
      ref = ['comment', 'subject', 'name', 'tripcode'];
      for (k = 0, len1 = ref.length; k < len1; k++) {
        key = ref[k];
        if (key in info) {
          text.push(info[key]);
        }
      }
      if (file) {
        text.push(file.name);
      }
      text = text.join(' ').toLowerCase();
      for (l = 0, len2 = keywords.length; l < len2; l++) {
        keyword = keywords[l];
        if (-1 === text.indexOf(keyword)) {
          return false;
        }
      }
      return true;
    }
  };

  return Index;

}).call(this);

Polyfill = (function() {
  var Polyfill;

  Polyfill = {
    init: function() {
      this.toBlob();
      $.global(this.toBlob);
    },
    toBlob: function() {
      if (HTMLCanvasElement.prototype.toBlob) {
        return;
      }
      HTMLCanvasElement.prototype.toBlob = function(cb, type, encoderOptions) {
        var data, i, j, l, ref, ui8a, url;
        url = this.toDataURL(type, encoderOptions);
        data = atob(url.slice(url.indexOf(',') + 1));
        l = data.length;
        ui8a = new Uint8Array(l);
        for (i = j = 0, ref = l; j < ref; i = j += 1) {
          ui8a[i] = data.charCodeAt(i);
        }
        return cb(new Blob([ui8a], {
          type: type || 'image/png'
        }));
      };
    }
  };

  return Polyfill;

}).call(this);

Settings = (function() {
  var Settings,
    slice = [].slice,
    indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  Settings = {
    init: function() {
      var add, link;
      link = $.el('a', {
        className: 'settings-link fa fa-wrench',
        textContent: 'Settings',
        title: '4chan X Settings',
        href: 'javascript:;'
      });
      $.on(link, 'click', Settings.open);
      Header.addShortcut('settings', link, 820);
      add = this.addSection;
      add('Main', this.main);
      add('Filter', this.filter);
      add('Sauce', this.sauce);
      add('Advanced', this.advanced);
      add('Keybinds', this.keybinds);
      $.on(d, 'AddSettingsSection', Settings.addSection);
      $.on(d, 'OpenSettings', function(e) {
        return Settings.open(e.detail);
      });
      if (Conf['Disable Native Extension']) {
        if ($.hasStorage) {
          return $.global(function() {
            var settings;
            try {
              settings = JSON.parse(localStorage.getItem('4chan-settings')) || {};
              if (settings.disableAll) {
                return;
              }
              settings.disableAll = true;
              return localStorage.setItem('4chan-settings', JSON.stringify(settings));
            } catch (_error) {
              return Object.defineProperty(window, 'Config', {
                value: {
                  disableAll: true
                }
              });
            }
          });
        } else {
          return $.global(function() {
            return Object.defineProperty(window, 'Config', {
              value: {
                disableAll: true
              }
            });
          });
        }
      }
    },
    open: function(openSection) {
      var dialog, j, len, link, links, overlay, ref, section, sectionToOpen;
      if (Settings.overlay) {
        return;
      }
      $.event('CloseMenu');
      Settings.dialog = dialog = $.el('div', {
        id: 'fourchanx-settings',
        className: 'dialog'
      });
      $.extend(dialog, {
        innerHTML: "<nav><div class=\"sections-list\"></div><p class=\"imp-exp-result warning\"></p><div class=\"credits\"><a class=\"export\">Export</a>&nbsp|&nbsp<a class=\"import\">Import</a>&nbsp|&nbsp<a class=\"reset\">Reset Settings</a>&nbsp|&nbsp<input type=\"file\" hidden><a href=\"https://www.4chan-x.net/\" target=\"_blank\">4chan X</a>&nbsp|&nbsp<a href=\"https://github.com/ccd0/4chan-x/blob/master/CHANGELOG.md\" target=\"_blank\">" + E(g.VERSION) + "</a>&nbsp|&nbsp<a href=\"https://gitreports.com/issue/ccd0/4chan-x\" target=\"_blank\">Issues</a>&nbsp|&nbsp<a href=\"javascript:;\" class=\"close fa fa-times\" title=\"Close\"></a></div></nav><div class=\"section-container\"><section></section></div>"
      });
      Settings.overlay = overlay = $.el('div', {
        id: 'overlay'
      });
      $.on($('.export', dialog), 'click', Settings["export"]);
      $.on($('.import', dialog), 'click', Settings["import"]);
      $.on($('.reset', dialog), 'click', Settings.reset);
      $.on($('input', dialog), 'change', Settings.onImport);
      links = [];
      ref = Settings.sections;
      for (j = 0, len = ref.length; j < len; j++) {
        section = ref[j];
        link = $.el('a', {
          className: "tab-" + section.hyphenatedTitle,
          textContent: section.title,
          href: 'javascript:;'
        });
        $.on(link, 'click', Settings.openSection.bind(section));
        links.push(link, $.tn(' | '));
        if (section.title === openSection) {
          sectionToOpen = link;
        }
      }
      links.pop();
      $.add($('.sections-list', dialog), links);
      if (openSection !== 'none') {
        (sectionToOpen ? sectionToOpen : links[0]).click();
      }
      $.on($('.close', dialog), 'click', Settings.close);
      $.on(overlay, 'click', Settings.close);
      $.on(window, 'beforeunload', Settings.close);
      $.add(d.body, [overlay, dialog]);
      return $.event('OpenSettings', null, dialog);
    },
    close: function() {
      var ref;
      if (!Settings.dialog) {
        return;
      }
      if ((ref = d.activeElement) != null) {
        ref.blur();
      }
      $.rm(Settings.overlay);
      $.rm(Settings.dialog);
      delete Settings.overlay;
      return delete Settings.dialog;
    },
    sections: [],
    addSection: function(title, open) {
      var hyphenatedTitle, ref;
      if (typeof title !== 'string') {
        ref = title.detail, title = ref.title, open = ref.open;
      }
      hyphenatedTitle = title.toLowerCase().replace(/\s+/g, '-');
      return Settings.sections.push({
        title: title,
        hyphenatedTitle: hyphenatedTitle,
        open: open
      });
    },
    openSection: function() {
      var section, selected;
      if (selected = $('.tab-selected', Settings.dialog)) {
        $.rmClass(selected, 'tab-selected');
      }
      $.addClass($(".tab-" + this.hyphenatedTitle, Settings.dialog), 'tab-selected');
      section = $('section', Settings.dialog);
      $.rmAll(section);
      section.className = "section-" + this.hyphenatedTitle;
      this.open(section, g);
      section.scrollTop = 0;
      return $.event('OpenSettings', null, section);
    },
    warnings: {
      localStorage: function(cb) {
        var why;
        if ($.cantSync) {
          why = $.cantSet ? 'save your settings' : 'synchronize settings between tabs';
          return cb($.el('li', {
            textContent: "4chan X needs local storage to " + why + ".\nEnable it on boards." + (location.hostname.split('.')[1]) + ".org in your browser's privacy settings (may be listed as part of \"local data\" or \"cookies\")."
          }));
        }
      },
      ads: function(cb) {
        return $.onExists(doc, '.adg-rects > .desktop', function(ad) {
          return $.onExists(ad, 'iframe', function() {
            var url;
            url = Redirect.to('thread', {
              boardID: 'qa',
              threadID: 362590
            });
            return cb($.el('li', {
              innerHTML: "To protect yourself from <a href=\"" + E(url) + "\" target=\"_blank\">malicious ads</a>, you should <a href=\"https://github.com/gorhill/uBlock#ublock-origin\" target=\"_blank\">block ads</a> on 4chan."
            }));
          });
        });
      }
    },
    main: function(section) {
      var addCheckboxes, addWarning, button, div, fs, inputs, items, key, keyFS, obj, ref, ref1, warning, warnings;
      warnings = $.el('fieldset', {
        hidden: true
      }, {
        innerHTML: "<legend>Warnings</legend><ul></ul>"
      });
      addWarning = function(item) {
        $.add($('ul', warnings), item);
        return warnings.hidden = false;
      };
      ref = Settings.warnings;
      for (key in ref) {
        warning = ref[key];
        warning(addWarning);
      }
      $.add(section, warnings);
      items = {};
      inputs = {};
      addCheckboxes = function(root, obj) {
        var arr, container, containers, description, div, input, level, results;
        containers = [root];
        results = [];
        for (key in obj) {
          arr = obj[key];
          if (!(arr instanceof Array)) {
            continue;
          }
          description = arr[1];
          div = $.el('div', {
            innerHTML: "<label><input type=\"checkbox\" name=\"" + E(key) + "\">" + E(key) + "</label><span class=\"description\">: " + E(description) + "</span>"
          });
          div.dataset.name = key;
          input = $('input', div);
          $.on(input, 'change', $.cb.checked);
          $.on(input, 'change', function() {
            return this.parentNode.parentNode.dataset.checked = this.checked;
          });
          items[key] = Conf[key];
          inputs[key] = input;
          level = arr[2] || 0;
          if (containers.length <= level) {
            container = $.el('div', {
              className: 'suboption-list'
            });
            $.add(containers[containers.length - 1].lastElementChild, container);
            containers[level] = container;
          } else if (containers.length > level + 1) {
            containers.splice(level + 1, containers.length - (level + 1));
          }
          results.push($.add(containers[level], div));
        }
        return results;
      };
      ref1 = Config.main;
      for (keyFS in ref1) {
        obj = ref1[keyFS];
        fs = $.el('fieldset', {
          innerHTML: "<legend>" + E(keyFS) + "</legend>"
        });
        addCheckboxes(fs, obj);
        if (keyFS === 'Posting and Captchas') {
          $.add(fs, $.el('p', {
            innerHTML: "For more info on captcha options and issues, see the <a href=\"https://github.com/ccd0/4chan-x/wiki/Captcha-FAQ\" target=\"_blank\">captcha FAQ</a>."
          }));
        }
        $.add(section, fs);
      }
      addCheckboxes($('div[data-name="JSON Index"] > .suboption-list', section), Config.Index);
      if ($.engine !== 'gecko') {
        $('div[data-name="Remember QR Size"]', section).hidden = true;
      }
      if ($.perProtocolSettings || location.protocol !== 'https:') {
        $('div[data-name="Redirect to HTTPS"]', section).hidden = true;
      }
      $.get(items, function(items) {
        var val;
        for (key in items) {
          val = items[key];
          inputs[key].checked = val;
          inputs[key].parentNode.parentNode.dataset.checked = val;
        }
      });
      div = $.el('div', {
        innerHTML: "<button></button><span class=\"description\">: Clear manually-hidden threads and posts on all boards. Reload the page to apply."
      });
      button = $('button', div);
      $.get({
        hiddenThreads: {},
        hiddenPosts: {}
      }, function(arg) {
        var ID, board, hiddenNum, hiddenPosts, hiddenThreads, ref2, ref3, ref4, ref5, site, thread;
        hiddenThreads = arg.hiddenThreads, hiddenPosts = arg.hiddenPosts;
        hiddenNum = 0;
        for (ID in hiddenThreads) {
          site = hiddenThreads[ID];
          if (ID !== 'boards') {
            ref2 = site.boards;
            for (ID in ref2) {
              board = ref2[ID];
              hiddenNum += Object.keys(board).length;
            }
          }
        }
        ref3 = hiddenThreads.boards;
        for (ID in ref3) {
          board = ref3[ID];
          hiddenNum += Object.keys(board).length;
        }
        for (ID in hiddenPosts) {
          site = hiddenPosts[ID];
          if (ID !== 'boards') {
            ref4 = site.boards;
            for (ID in ref4) {
              board = ref4[ID];
              for (ID in board) {
                thread = board[ID];
                hiddenNum += Object.keys(thread).length;
              }
            }
          }
        }
        ref5 = hiddenPosts.boards;
        for (ID in ref5) {
          board = ref5[ID];
          for (ID in board) {
            thread = board[ID];
            hiddenNum += Object.keys(thread).length;
          }
        }
        return button.textContent = "Hidden: " + hiddenNum;
      });
      $.on(button, 'click', function() {
        this.textContent = 'Hidden: 0';
        return $.get('hiddenThreads', {}, function(arg) {
          var boardID, hiddenThreads;
          hiddenThreads = arg.hiddenThreads;
          if ($.hasStorage && Site.software === 'yotsuba') {
            for (boardID in hiddenThreads.boards) {
              localStorage.removeItem("4chan-hide-t-" + boardID);
            }
          }
          return $["delete"](['hiddenThreads', 'hiddenPosts']);
        });
      });
      return $.after($('input[name="Stubs"]', section).parentNode.parentNode, div);
    },
    "export": function() {
      return $.get(Conf, function(Conf) {
        delete Conf['boardConfig'];
        return Settings.downloadExport({
          version: g.VERSION,
          date: Date.now(),
          Conf: Conf
        });
      });
    },
    downloadExport: function(data) {
      var a, p;
      a = $.el('a', {
        download: "4chan X v" + g.VERSION + "-" + data.date + ".json",
        href: "data:application/json;base64," + (btoa(unescape(encodeURIComponent(JSON.stringify(data, null, 2)))))
      });
      p = $('.imp-exp-result', Settings.dialog);
      $.rmAll(p);
      $.add(p, a);
      return a.click();
    },
    "import": function() {
      return $('input[type=file]', this.parentNode).click();
    },
    onImport: function() {
      var file, output, reader;
      if (!(file = this.files[0])) {
        return;
      }
      this.value = null;
      output = $('.imp-exp-result');
      if (!confirm('Your current settings will be entirely overwritten, are you sure?')) {
        output.textContent = 'Import aborted.';
        return;
      }
      reader = new FileReader();
      reader.onload = function(e) {
        var err;
        try {
          return Settings.loadSettings(JSON.parse(e.target.result), function(err) {
            if (err) {
              return output.textContent = 'Import failed due to an error.';
            } else if (confirm('Import successful. Reload now?')) {
              return window.location.reload();
            }
          });
        } catch (_error) {
          err = _error;
          output.textContent = 'Import failed due to an error.';
          return c.error(err.stack);
        }
      };
      return reader.readAsText(file);
    },
    convertFrom: {
      loadletter: function(data) {
        var base, boardID, convertSettings, key, ref, ref1, threadData, threadID, threads, val;
        convertSettings = function(data, map) {
          var newKey, prevKey;
          for (prevKey in map) {
            newKey = map[prevKey];
            if (newKey) {
              data.Conf[newKey] = data.Conf[prevKey];
            }
            delete data.Conf[prevKey];
          }
          return data;
        };
        data = convertSettings(data, {
          'Disable 4chan\'s extension': 'Disable Native Extension',
          'Comment Auto-Expansion': '',
          'Remove Slug': '',
          'Check for Updates': '',
          'Recursive Filtering': 'Recursive Hiding',
          'Reply Hiding': 'Reply Hiding Buttons',
          'Thread Hiding': 'Thread Hiding Buttons',
          'Show Stubs': 'Stubs',
          'Image Auto-Gif': 'Replace GIF',
          'Reveal Spoilers': 'Reveal Spoiler Thumbnails',
          'Expand From Current': 'Expand from here',
          'Current Page': 'Page Count in Stats',
          'Current Page Position': '',
          'Alternative captcha': 'Use Recaptcha v1',
          'Auto Submit': 'Post on Captcha Completion',
          'Open Reply in New Tab': 'Open Post in New Tab',
          'Remember QR size': 'Remember QR Size',
          'Remember Subject': '',
          'Quote Inline': 'Quote Inlining',
          'Quote Preview': 'Quote Previewing',
          'Indicate OP quote': 'Mark OP Quotes',
          'Indicate You quote': 'Mark Quotes of You',
          'Indicate Cross-thread Quotes': 'Mark Cross-thread Quotes',
          'uniqueid': 'uniqueID',
          'mod': 'capcode',
          'email': '',
          'country': 'flag',
          'md5': 'MD5',
          'openEmptyQR': 'Open empty QR',
          'openQR': 'Open QR',
          'openOptions': 'Open settings',
          'close': 'Close',
          'spoiler': 'Spoiler tags',
          'sageru': 'Toggle sage',
          'code': 'Code tags',
          'submit': 'Submit QR',
          'watch': 'Watch',
          'update': 'Update',
          'unreadCountTo0': '',
          'expandAllImages': 'Expand images',
          'expandImage': 'Expand image',
          'zero': 'Front page',
          'nextPage': 'Next page',
          'previousPage': 'Previous page',
          'nextThread': 'Next thread',
          'previousThread': 'Previous thread',
          'expandThread': 'Expand thread',
          'openThreadTab': 'Open thread',
          'openThread': 'Open thread tab',
          'nextReply': 'Next reply',
          'previousReply': 'Previous reply',
          'hide': 'Hide',
          'Scrolling': 'Auto Scroll',
          'Verbose': ''
        });
        data.Conf.sauces = data.Conf.sauces.replace(/\$\d/g, function(c) {
          switch (c) {
            case '$1':
              return '%TURL';
            case '$2':
              return '%URL';
            case '$3':
              return '%MD5';
            case '$4':
              return '%board';
            default:
              return c;
          }
        });
        ref = Config.hotkeys;
        for (key in ref) {
          val = ref[key];
          if (key in data.Conf) {
            data.Conf[key] = data.Conf[key].replace(/ctrl|alt|meta/g, function(s) {
              return "" + (s[0].toUpperCase()) + s.slice(1);
            }).replace(/(^|.+\+)[A-Z]$/g, function(s) {
              return "Shift+" + s.slice(0, -1) + (s.slice(-1).toLowerCase());
            });
          }
        }
        if (data.WatchedThreads) {
          data.Conf['watchedThreads'] = {
            boards: {}
          };
          ref1 = data.WatchedThreads;
          for (boardID in ref1) {
            threads = ref1[boardID];
            for (threadID in threads) {
              threadData = threads[threadID];
              ((base = data.Conf['watchedThreads'].boards)[boardID] || (base[boardID] = {}))[threadID] = {
                excerpt: threadData.textContent
              };
            }
          }
        }
        return data;
      }
    },
    upgrade: function(data, version) {
      var addCSS, addSauces, boardID, boards, changes, compareString, corrupted, db, hostname, j, k, key, l, lastChecked, len, len1, len2, len3, line, list, m, name, record, ref, ref1, ref10, ref11, ref2, ref3, ref4, ref5, ref6, ref7, ref8, ref9, rice, set, setD, siteProperties, software, type, uids, val, val2, value;
      changes = {};
      set = function(key, value) {
        return data[key] = changes[key] = value;
      };
      setD = function(key, value) {
        if (data[key] == null) {
          return set(key, value);
        }
      };
      addSauces = function(sauces) {
        if (data['sauces'] != null) {
          sauces = sauces.filter(function(s) {
            return data['sauces'].indexOf(s.match(/[^#;\s]+|$/)[0]) < 0;
          });
          if (sauces.length) {
            return set('sauces', data['sauces'] + '\n\n' + sauces.join('\n'));
          }
        }
      };
      addCSS = function(css) {
        if (data['usercss'] == null) {
          set('usercss', Config['usercss']);
        }
        if (data['usercss'].indexOf(css) < 0) {
          return set('usercss', css + '\n\n' + data['usercss']);
        }
      };
      if ((corrupted = version[0] === '"')) {
        try {
          version = JSON.parse(version);
        } catch (_error) {}
      }
      compareString = version.replace(/\d+/g, function(x) {
        return ('0000' + x).slice(-5);
      });
      if (compareString < '00001.00013.00014.00008') {
        for (key in data) {
          val = data[key];
          if (!(typeof val === 'string' && typeof Conf[key] !== 'string' && (key !== 'Index Sort' && key !== 'Last Long Reply Thresholds 0' && key !== 'Last Long Reply Thresholds 1'))) {
            continue;
          }
          corrupted = true;
          break;
        }
      }
      if (corrupted) {
        for (key in data) {
          val = data[key];
          if (typeof val === 'string') {
            try {
              val2 = JSON.parse(val);
              set(key, val2);
            } catch (_error) {}
          }
        }
      }
      if (compareString < '00001.00011.00008.00000') {
        if (data['Fixed Thread Watcher'] == null) {
          set('Fixed Thread Watcher', (ref = data['Toggleable Thread Watcher']) != null ? ref : true);
        }
        if (data['Exempt Archives from Encryption'] == null) {
          set('Exempt Archives from Encryption', (ref1 = data['Except Archives from Encryption']) != null ? ref1 : false);
        }
      }
      if (compareString < '00001.00011.00010.00001') {
        if (data['selectedArchives'] != null) {
          uids = {
            "Moe": 0,
            "4plebs Archive": 3,
            "Nyafuu Archive": 4,
            "Love is Over": 5,
            "Rebecca Black Tech": 8,
            "warosu": 10,
            "fgts": 15,
            "not4plebs": 22,
            "DesuStorage": 23,
            "fireden.net": 24,
            "disabled": null
          };
          ref2 = data['selectedArchives'];
          for (boardID in ref2) {
            record = ref2[boardID];
            for (type in record) {
              name = record[type];
              if (name in uids) {
                record[type] = uids[name];
              }
            }
          }
          set('selectedArchives', data['selectedArchives']);
        }
      }
      if (compareString < '00001.00011.00016.00000') {
        if ((rice = Config['usercss'].match(/\/\* Board title rice \*\/(?:\n.+)*/)[0])) {
          if ((data['usercss'] != null) && data['usercss'].indexOf(rice) < 0) {
            set('usercss', rice + '\n\n' + data['usercss']);
          }
        }
      }
      if (compareString < '00001.00011.00017.00000') {
        ref3 = ['Persistent QR', 'Color User IDs', 'Fappe Tyme', 'Werk Tyme', 'Highlight Posts Quoting You', 'Highlight Own Posts'];
        for (j = 0, len = ref3.length; j < len; j++) {
          key = ref3[j];
          if (data[key] == null) {
            set(key, key === 'Persistent QR');
          }
        }
      }
      if (compareString < '00001.00011.00017.00006') {
        if (data['sauces'] != null) {
          set('sauces', data['sauces'].replace(/^(#?\s*)http:\/\/iqdb\.org\//mg, '$1//iqdb.org/'));
        }
      }
      if (compareString < '00001.00011.00019.00003' && !Settings.overlay) {
        $.queueTask(function() {
          return Settings.warnings.ads(function(item) {
            return new Notice('warning', slice.call(item.childNodes));
          });
        });
      }
      if (compareString < '00001.00011.00020.00003') {
        ref4 = {
          'Inline Cross-thread Quotes Only': false,
          'Pass Link': true
        };
        for (key in ref4) {
          value = ref4[key];
          if (data[key] == null) {
            set(key, value);
          }
        }
      }
      if (compareString < '00001.00011.00021.00003') {
        if (data['Remember Your Posts'] == null) {
          set('Remember Your Posts', (ref5 = data['Mark Quotes of You']) != null ? ref5 : true);
        }
      }
      if (compareString < '00001.00011.00022.00000') {
        if (data['sauces'] != null) {
          set('sauces', data['sauces'].replace(/^(#?\s*https:\/\/www\.google\.com\/searchbyimage\?image_url=%(?:IMG|URL))%3Fs\.jpg/mg, '$1'));
          set('sauces', data['sauces'].replace(/^#?\s*https:\/\/www\.google\.com\/searchbyimage\?image_url=%(?:IMG|T?URL)(?=$|;)/mg, '$&&safe=off'));
        }
      }
      if (compareString < '00001.00011.00022.00002') {
        if ((data['Use Recaptcha v1 in Reports'] == null) && data['Use Recaptcha v1'] && !data['Use Recaptcha v2 in Reports']) {
          set('Use Recaptcha v1 in Reports', true);
        }
      }
      if (compareString < '00001.00011.00024.00000') {
        if ((data['JSON Navigation'] != null) && (data['JSON Index'] == null)) {
          set('JSON Index', data['JSON Navigation']);
        }
      }
      if (compareString < '00001.00011.00026.00000') {
        if ((data['Oekaki Links'] != null) && (data['Edit Link'] == null)) {
          set('Edit Link', data['Oekaki Links']);
        }
        if (data['Inline Cross-thread Quotes Only'] == null) {
          set('Inline Cross-thread Quotes Only', true);
        }
      }
      if (compareString < '00001.00011.00030.00000') {
        if (data['Quote Threading'] && (data['Thread Quotes'] == null)) {
          set('Thread Quotes', true);
        }
      }
      if (compareString < '00001.00011.00032.00000') {
        if (data['sauces'] != null) {
          set('sauces', data['sauces'].replace(/^(#?\s*)http:\/\/3d\.iqdb\.org\//mg, '$1//3d.iqdb.org/'));
        }
        addSauces(['#https://desustorage.org/_/search/image/%sMD5/', '#https://boards.fireden.net/_/search/image/%sMD5/', '#https://foolz.fireden.net/_/search/image/%sMD5/', '#//www.gif-explode.com/%URL;types:gif']);
      }
      if (compareString < '00001.00011.00035.00000') {
        addSauces(['https://whatanime.ga/?auto&url=%IMG;text:wait']);
      }
      if (compareString < '00001.00012.00000.00000') {
        if (data['Exempt Archives from Encryption'] == null) {
          set('Exempt Archives from Encryption', false);
        }
        if (data['Show New Thread Option in Threads'] == null) {
          set('Show New Thread Option in Threads', false);
        }
        if (data['Show Name and Subject']) {
          addCSS('#qr .persona .field {display: block !important;}');
        }
        if (data['QR Shortcut'] === false) {
          addCSS('#shortcut-qr {display: none;}');
        }
        if (data['Bottom QR Link'] === false) {
          addCSS('.qr-link-container-bottom {display: none;}');
        }
      }
      if (compareString < '00001.00012.00000.00006') {
        if (data['sauces'] != null) {
          set('sauces', data['sauces'].replace(/^(#?\s*)https:\/\/(?:desustorage|cuckchan)\.org\//mg, '$1https://desuarchive.org/'));
        }
      }
      if (compareString < '00001.00012.00001.00000') {
        if ((data['Persistent Thread Watcher'] == null) && (data['Toggleable Thread Watcher'] != null)) {
          set('Persistent Thread Watcher', !data['Toggleable Thread Watcher']);
        }
      }
      if (compareString < '00001.00012.00003.00000') {
        ref6 = ['Image Hover in Catalog', 'Auto Watch', 'Auto Watch Reply'];
        for (k = 0, len1 = ref6.length; k < len1; k++) {
          key = ref6[k];
          setD(key, false);
        }
      }
      if (compareString < '00001.00013.00001.00002') {
        addSauces(['#//www.bing.com/images/search?q=imgurl:%IMG&view=detailv2&iss=sbi#enterInsights']);
      }
      if (compareString < '00001.00013.00005.00000') {
        if (data['sauces'] != null) {
          set('sauces', data['sauces'].replace(/^(#?\s*)http:\/\/regex\.info\/exif\.cgi/mg, '$1http://exif.regex.info/exif.cgi'));
        }
        addSauces(Config['sauces'].match(/# Known filename formats:(?:\n.+)*|$/)[0].split('\n'));
      }
      if (compareString < '00001.00013.00007.00002') {
        setD('Require OP Quote Link', true);
      }
      if (compareString < '00001.00013.00008.00000') {
        setD('Download Link', true);
      }
      if (compareString < '00001.00013.00009.00003') {
        if (data['jsWhitelist'] != null) {
          list = data['jsWhitelist'].split('\n');
          if (indexOf.call(list, 'https://cdnjs.cloudflare.com') < 0 && indexOf.call(list, 'https://cdn.mathjax.org') >= 0) {
            set('jsWhitelist', data['jsWhitelist'] + '\n\nhttps://cdnjs.cloudflare.com');
          }
        }
      }
      if (compareString < '00001.00014.00000.00006') {
        if (data['siteSoftware'] != null) {
          set('siteSoftware', data['siteSoftware'] + '\n4cdn.org yotsuba');
        }
      }
      if (compareString < '00001.00014.00003.00002') {
        if (data['sauces'] != null) {
          set('sauces', data['sauces'].replace(/^(#?\s*)https:\/\/whatanime\.ga\//mg, '$1https://trace.moe/'));
        }
      }
      if (compareString < '00001.00014.00004.00004') {
        if ((data['siteSoftware'] != null) && !/^4channel\.org yotsuba$/m.test(data['siteSoftware'])) {
          set('siteSoftware', data['siteSoftware'] + '\n4channel.org yotsuba');
        }
      }
      if (compareString < '00001.00014.00005.00000') {
        ref7 = DataBoard.keys;
        for (l = 0, len2 = ref7.length; l < len2; l++) {
          db = ref7[l];
          if ((ref8 = data[db]) != null ? ref8.boards : void 0) {
            ref9 = data[db], boards = ref9.boards, lastChecked = ref9.lastChecked;
            data[db]['4chan.org'] = {
              boards: boards,
              lastChecked: lastChecked
            };
            delete data[db].boards;
            delete data[db].lastChecked;
            set(db, data[db]);
          }
        }
        if ((data['siteSoftware'] != null) && (data['siteProperties'] == null)) {
          siteProperties = {};
          ref10 = data['siteSoftware'].split('\n');
          for (m = 0, len3 = ref10.length; m < len3; m++) {
            line = ref10[m];
            ref11 = line.split(' '), hostname = ref11[0], software = ref11[1];
            siteProperties[hostname] = {
              software: software
            };
          }
          set('siteProperties', siteProperties);
        }
      }
      return changes;
    },
    loadSettings: function(data, cb) {
      if (data.version.split('.')[0] === '2') {
        data = Settings.convertFrom.loadletter(data);
      } else if (data.version !== g.VERSION) {
        Settings.upgrade(data.Conf, data.version);
      }
      return $.clear(function(err) {
        if (err) {
          return cb(err);
        }
        return $.set(data.Conf, cb);
      });
    },
    reset: function() {
      if (confirm('Your current settings will be entirely wiped, are you sure?')) {
        return $.clear(function(err) {
          if (err) {
            return $('.imp-exp-result').textContent = 'Import failed due to an error.';
          } else if (confirm('Reset successful. Reload now?')) {
            return window.location.reload();
          }
        });
      }
    },
    filter: function(section) {
      var select;
      $.extend(section, {
        innerHTML: "<select name=\"filter\"><option value=\"guide\">Guide</option><option value=\"general\">General</option><option value=\"postID\">Post number</option><option value=\"name\">Name</option><option value=\"uniqueID\">Unique ID</option><option value=\"tripcode\">Tripcode</option><option value=\"capcode\">Capcode</option><option value=\"pass\">Pass Date</option><option value=\"subject\">Subject</option><option value=\"comment\">Comment</option><option value=\"flag\">Flag</option><option value=\"filename\">Filename</option><option value=\"dimensions\">Image dimensions</option><option value=\"filesize\">Filesize</option><option value=\"MD5\">Image MD5</option></select><div></div>"
      });
      select = $('select', section);
      $.on(select, 'change', Settings.selectFilter);
      return Settings.selectFilter.call(select);
    },
    selectFilter: function() {
      var div, filterTypes, name, ta;
      div = this.nextElementSibling;
      if ((name = this.value) !== 'guide') {
        $.rmAll(div);
        ta = $.el('textarea', {
          name: name,
          className: 'field',
          spellcheck: false
        });
        $.on(ta, 'change', $.cb.value);
        $.get(name, Conf[name], function(item) {
          ta.value = item[name];
          return $.add(div, ta);
        });
        return;
      }
      filterTypes = Object.keys(Config.filter).filter(function(x) {
        return x !== 'general';
      }).map(function(x, i) {
        return {
          innerHTML: ((i) ? "," : "") + "<wbr>" + E(x)
        };
      });
      $.extend(div, {
        innerHTML: "<div class=\"warning\"><code>Filter</code> is disabled.</div><p>Use <a href=\"https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions\" target=\"_blank\">regular expressions</a>, one per line.<br>Lines starting with a <code>#</code> will be ignored.<br>For example, <code>/weeaboo/i</code> will filter posts containing the string \`<code>weeaboo</code>\`, case-insensitive.<br>MD5 filtering uses exact string matching, not regular expressions.</p><ul>You can use these settings with each regular expression, separate them with semicolons:<li>Per boards, separate them with commas. It is global if not specified. Use <code>sfw</code> and <code>nsfw</code> to reference all worksafe or not-worksafe boards.<br>For example: <code>boards:a,jp;</code>.<br></li><li>In case of a global rule or one that uses <code>sfw</code>/<code>nsfw</code>, select boards to be excluded from the filter.<br>For example: <code>exclude:vg,v;</code>.</li><li>Filter OPs only along with their threads (\`only\`), replies only (\`no\`), or both (\`yes\`, this is default).<br>For example: <code>op:only;</code>, <code>op:no;</code> or <code>op:yes;</code>.</li><li>Overrule the \`Show Stubs\` setting if specified: create a stub (\`yes\`) or not (\`no\`).<br>For example: <code>stub:yes;</code> or <code>stub:no;</code>.</li><li>Highlight instead of hiding. You can specify a class name to use with a userstyle.<br>For example: <code>highlight;</code> or <code>highlight:wallpaper;</code>.</li><li>Highlighted OPs will have their threads put on top of the board index by default.<br>For example: <code>top:yes;</code> or <code>top:no;</code>.</li><li>Filters in the \"General\" section apply to multiple fields, by default <code>subject,name,filename,comment</code>.<br>The fields can be specified with the <code>type</code> option, separated by commas.<br>For example: <code>type:" + E.cat(filterTypes) + ";</code>.</li></ul><p>Note: If you&#039;re using the native catalog rather than 4chan X&#039;s catalog, 4chan X&#039;s filters do not apply there.<br>The native catalog has its own separate filter list.</p>"
      });
      return $('.warning', div).hidden = Conf['Filter'];
    },
    sauce: function(section) {
      var ta;
      $.extend(section, {
        innerHTML: "<div class=\"warning\"><code>Sauce</code> is disabled.</div><input id=\"sauce-doc-expand\" type=\"checkbox\" hidden><div id=\"sauce-doc\"><label for=\"sauce-doc-expand\">[expand]</label><div>These parameters will be replaced by their corresponding values in the URL and displayed text:</div><ul><li><code>%IMG</code>: Full image URL for GIF, JPG, and PNG; thumbnail URL for other types.</li><li><code>%URL</code>: Full image URL.</li><li><code>%TURL</code>: Thumbnail URL.</li><li><code>%name</code>: Original file name.</li><li><code>%board</code>: Current board.</li><li><code>%MD5</code>: MD5 hash in base64.</li><li><code>%sMD5</code>: MD5 hash in base64 using <code>-</code> and <code>_</code>.</li><li><code>%hMD5</code>: MD5 hash in hexadecimal.</li><li><code>%$0</code>: Matched regular expression within the filename.</li><li><code>%$1</code>, <code>%$2</code>, <code>%$3</code>, ... : Subexpressions within the matched regular expression.</li><li><code>%%</code>, <code>%semi</code>: Literal <code>%</code> and <code>;</code>.</li></ul><div>Lines starting with a <code>#</code> will be ignored.</div><div>You can specify a display text by appending <code>;text:[text]</code> to the URL.</div><div>You can specify the applicable boards by appending <code>;boards:[board1],[board2]</code>.</div><div>You can specify the applicable file types by appending <code>;types:[extension1],[extension2]</code>.</div><div>You can specify a regular expression the filename must match by appending <code>;regexp:[regular expression]</code>.</div></div><textarea hidden name=\"sauces\" class=\"field\" spellcheck=\"false\"></textarea>"
      });
      $('.warning', section).hidden = Conf['Sauce'];
      ta = $('textarea', section);
      $.get('sauces', Conf['sauces'], function(item) {
        ta.value = item['sauces'];
        return ta.hidden = false;
      });
      return $.on(ta, 'change', $.cb.value);
    },
    advanced: function(section) {
      var applyCSS, boardSelect, customCSS, event, input, inputs, interval, items, itemsArchive, j, k, l, len, len1, len2, len3, m, name, ref, ref1, ref2, ref3, table, updateArchives, warning;
      $.extend(section, {
        innerHTML: "<fieldset><legend>Archives</legend><div class=\"warning\" data-feature=\"404 Redirect\"><code>404 Redirect</code> is disabled.</div><select id=\"archive-board-select\"></select><table id=\"archive-table\"><thead><th>Thread redirection</th><th>Post fetching</th><th>File redirection</th></thead><tbody></tbody></table><br><div><b>Archive Lists</b>: Each line below should be an archive list in <a href=\"https://github.com/MayhemYDG/archives.json/blob/gh-pages/CONTRIBUTING.md\" target=\"_blank\">this format</a> or a URL to load an archive list from.<br>Archive properties can be overriden by another item with the same <code>uid</code> (or if absent, its <code>name</code>).</div><textarea hidden name=\"archiveLists\" class=\"field\" spellcheck=\"false\"></textarea><button id=\"update-archives\">Update now</button> Last updated: <time id=\"lastarchivecheck\"></time> <label><input type=\"checkbox\" name=\"archiveAutoUpdate\"> Auto-update</label></fieldset><fieldset><legend>Captcha Language</legend><div>Choose from <a href=\"https://developers.google.com/recaptcha/docs/language\" target=\"_blank\">list of language codes</a>. Leave blank to autoselect.</div><div><input name=\"captchaLanguage\" class=\"field\" spellcheck=\"false\"></div></fieldset><fieldset><legend>Custom Board Navigation</legend><div><textarea hidden name=\"boardnav\" class=\"field\" spellcheck=\"false\"></textarea></div><span class=\"note\">New lines will be converted into spaces.</span><br><br><div class=\"note\">In the following examples for /g/, <code>g</code> can be changed to a different board ID (<code>a</code>, <code>b</code>, etc...), the current board (<code>current</code>), or the Twitter link (<code>@</code>).</div><div>Board link: <code>g</code></div><div>Archive link: <code>g-archive</code></div><div>Internal archive link: <code>g-expired</code></div><div>Title link: <code>g-title</code></div><div>Board link (Replace with title when on that board): <code>g-replace</code></div><div>Full text link: <code>g-full</code></div><div>Custom text link: <code>g-text:&quot;Install Gentoo&quot;</code></div><div>Index-only link: <code>g-index</code></div><div>Catalog-only link: <code>g-catalog</code></div><div>Index mode: <code>g-mode:&quot;infinite scrolling&quot;</code></div><div>Index sort: <code>g-sort:&quot;creation date rev&quot;</code></div><div>External link: <code>external-text:&quot;Google&quot;,&quot;http://www.google.com&quot;</code></div><div>Combinations are possible: <code>g-index-text:&quot;Technology Index&quot;</code></div><div>Full board list toggle: <code>toggle-all</code></div><br><div class=\"note\"><code>[ toggle-all ] [current-title] [g-title / a-title / jp-title] [x / wsg / h] [t-text:&quot;Piracy&quot;]</code><br>will give you<br><code>[ + ] [Technology] [Technology / Anime & Manga / Otaku Culture] [x / wsg / h] [Piracy]</code><br>if you are on /g/.</div></fieldset><fieldset><legend>Time Formatting <span class=\"warning\" data-feature=\"Time Formatting\">is disabled.</span></legend><div><input name=\"time\" class=\"field\" spellcheck=\"false\">: <span class=\"time-preview\"></span></div><div>Supported <a href=\"http://man7.org/linux/man-pages/man1/date.1.html\" target=\"_blank\">format specifiers</a>:</div><div>Day: <code>%a</code>, <code>%A</code>, <code>%d</code>, <code>%e</code></div><div>Month: <code>%m</code>, <code>%b</code>, <code>%B</code></div><div>Year: <code>%y</code>, <code>%Y</code></div><div>Hour: <code>%k</code>, <code>%H</code>, <code>%l</code>, <code>%I</code>, <code>%p</code>, <code>%P</code></div><div>Minute: <code>%M</code></div><div>Second: <code>%S</code></div><div>Literal <code>%</code>: <code>%%</code></div><div><a href=\"https://www.w3.org/International/articles/language-tags/\" target=\"_blank\">Language tag</a>: <input name=\"timeLocale\" class=\"field\" spellcheck=\"false\"></div></fieldset><fieldset><legend>Quote Backlinks formatting <span class=\"warning\" data-feature=\"Quote Backlinks\">is disabled.</span></legend><div><input name=\"backlink\" class=\"field\" spellcheck=\"false\">: <span class=\"backlink-preview\"></span></div></fieldset><fieldset><legend>Default pasted content filename</legend><div><input name=\"pastedname\" class=\"field\" spellcheck=\"false\">.png</div></fieldset><fieldset><legend>File Info Formatting <span class=\"warning\" data-feature=\"File Info Formatting\">is disabled.</span></legend><div><input name=\"fileInfo\" class=\"field\" spellcheck=\"false\">: <span class=\"file-info file-info-preview\"></span></div><div>Link: <code>%l</code> (truncated), <code>%L</code> (untruncated), <code>%T</code> (4chan filename)</div><div>Filename: <code>%n</code> (truncated), <code>%N</code> (untruncated), <code>%t</code> (4chan filename)</div><div>Download button: <code>%d</code></div><div>Quick filter MD5: <code>%f</code></div><div>Spoiler indicator: <code>%p</code></div><div>Size: <code>%B</code> (Bytes), <code>%K</code> (KB), <code>%M</code> (MB), <code>%s</code> (4chan default)</div><div>Resolution: <code>%r</code> (Displays &#039;PDF&#039; for PDF files)</div><div>Tag: <code>%g</code><div>Literal <code>%</code>: <code>%%</code></div></fieldset><fieldset><legend>Quick Reply Personas</legend><textarea hidden class=\"personafield field\" name=\"QR.personas\" spellcheck=\"false\"></textarea><p>One item per line.<br>Items will be added in the relevant input&#039;s auto-completion list.<br>Password items will always be used, since there is no password input.<br>Lines starting with a <code>#</code> will be ignored.</p><ul>You can use these settings with each item, separate them with semicolons:<li>Possible items are: <code>name</code>, <code>options</code> (or equivalently <code>email</code>), <code>subject</code> and <code>password</code>.</li><li>Wrap values of items with quotes, like this: <code>options:&quot;sage&quot;</code>.</li><li>Force values as defaults with the <code>always</code> keyword, for example: <code>options:&quot;sage&quot;;always</code>.</li><li>Select specific boards for an item, separated with commas, for example: <code>options:&quot;sage&quot;;boards:jp;always</code>.</li></ul></fieldset><fieldset><legend>Unread Favicon <span class=\"warning\" data-feature=\"Unread Favicon\">is disabled.</span></legend><select name=\"favicon\"><option value=\"ferongr\">ferongr</option><option value=\"xat-\">xat-</option><option value=\"4chanJS\">4chanJS</option><option value=\"Mayhem\">Mayhem</option><option value=\"Original\">Original</option><option value=\"Metro\">Metro</option></select><span class=\"favicon-preview\"></span></fieldset><fieldset><legend>Thread Updater <span class=\"warning\" data-feature=\"Thread Updater\">is disabled.</span></legend><div>Interval: <input type=\"number\" name=\"Interval\" class=\"field\" min=\"1\"> seconds</div></fieldset><fieldset><legend>Custom Cooldown Time</legend><div>Seconds: <input type=\"number\" name=\"customCooldown\" class=\"field\" min=\"0\"></div></fieldset><fieldset><legend><label><input type=\"checkbox\" name=\"Custom CSS\"> Custom CSS</label></legend><div>For more information about customizing 4chan X&#039;s CSS, see the <a href=\"https://github.com/ccd0/4chan-x/wiki/Styling-Guide\" target=\"_blank\">styling guide</a>.</div><button id=\"apply-css\">Apply CSS</button><textarea hidden name=\"usercss\" class=\"field\" spellcheck=\"false\"></textarea></fieldset><fieldset><legend>Javascript Whitelist</legend><div>Sources from which Javascript is allowed to be loaded by <a href=\"http://content-security-policy.com/#source_list\" target=\"_blank\">Content Security Policy</a>.<br>Lines starting with a <code>#</code> will be ignored.</div><textarea hidden name=\"jsWhitelist\" class=\"field\" spellcheck=\"false\"></textarea></fieldset>"
      });
      ref = $$('.warning', section);
      for (j = 0, len = ref.length; j < len; j++) {
        warning = ref[j];
        warning.hidden = Conf[warning.dataset.feature];
      }
      inputs = {};
      ref1 = $$('[name]', section);
      for (k = 0, len1 = ref1.length; k < len1; k++) {
        input = ref1[k];
        inputs[input.name] = input;
      }
      $.on(inputs['archiveLists'], 'change', function() {
        $.set('lastarchivecheck', 0);
        Conf['lastarchivecheck'] = 0;
        return $.id('lastarchivecheck').textContent = 'never';
      });
      items = {};
      ref2 = ['archiveLists', 'archiveAutoUpdate', 'captchaLanguage', 'boardnav', 'time', 'timeLocale', 'backlink', 'pastedname', 'fileInfo', 'QR.personas', 'favicon', 'usercss', 'customCooldown', 'jsWhitelist'];
      for (l = 0, len2 = ref2.length; l < len2; l++) {
        name = ref2[l];
        items[name] = Conf[name];
        input = inputs[name];
        event = name === 'archiveLists' || name === 'archiveAutoUpdate' || name === 'QR.personas' || name === 'favicon' || name === 'usercss' ? 'change' : 'input';
        $.on(input, event, $.cb[input.type === 'checkbox' ? 'checked' : 'value']);
        if (name in Settings) {
          $.on(input, event, Settings[name]);
        }
      }
      $.get(items, function(items) {
        var key, val;
        for (key in items) {
          val = items[key];
          input = inputs[key];
          input[input.type === 'checkbox' ? 'checked' : 'value'] = val;
          input.hidden = false;
          if (key in Settings) {
            Settings[key].call(input);
          }
        }
      });
      interval = inputs['Interval'];
      customCSS = inputs['Custom CSS'];
      applyCSS = $('#apply-css', section);
      interval.value = Conf['Interval'];
      customCSS.checked = Conf['Custom CSS'];
      inputs['usercss'].disabled = !Conf['Custom CSS'];
      applyCSS.disabled = !Conf['Custom CSS'];
      $.on(interval, 'change', ThreadUpdater.cb.interval);
      $.on(customCSS, 'change', Settings.togglecss);
      $.on(applyCSS, 'click', function() {
        return CustomCSS.update();
      });
      itemsArchive = {};
      ref3 = ['archives', 'selectedArchives', 'lastarchivecheck'];
      for (m = 0, len3 = ref3.length; m < len3; m++) {
        name = ref3[m];
        itemsArchive[name] = Conf[name];
      }
      $.get(itemsArchive, function(itemsArchive) {
        $.extend(Conf, itemsArchive);
        Redirect.selectArchives();
        return Settings.addArchiveTable(section);
      });
      boardSelect = $('#archive-board-select', section);
      table = $('#archive-table', section);
      updateArchives = $('#update-archives', section);
      $.on(boardSelect, 'change', function() {
        $('tbody > :not([hidden])', table).hidden = true;
        return $("tbody > ." + this.value, table).hidden = false;
      });
      return $.on(updateArchives, 'click', function() {
        return Redirect.update(function() {
          return Settings.addArchiveTable(section);
        });
      });
    },
    addArchiveTable: function(section) {
      var archBoards, archive, boardID, boardOptions, boardSelect, boards, data, files, id, item, j, k, l, len, len1, len2, len3, m, name, o, ref, ref1, ref2, ref3, ref4, row, rows, select, software, table, tbody, type, uid;
      $('#lastarchivecheck', section).textContent = Conf['lastarchivecheck'] === 0 ? 'never' : new Date(Conf['lastarchivecheck']).toLocaleString();
      boardSelect = $('#archive-board-select', section);
      table = $('#archive-table', section);
      tbody = $('tbody', section);
      $.rmAll(boardSelect);
      $.rmAll(tbody);
      archBoards = {};
      ref = Conf['archives'];
      for (j = 0, len = ref.length; j < len; j++) {
        ref1 = ref[j], uid = ref1.uid, name = ref1.name, boards = ref1.boards, files = ref1.files, software = ref1.software;
        if (software !== 'fuuka' && software !== 'foolfuuka') {
          continue;
        }
        for (k = 0, len1 = boards.length; k < len1; k++) {
          boardID = boards[k];
          o = archBoards[boardID] || (archBoards[boardID] = {
            thread: [],
            post: [],
            file: []
          });
          archive = [uid != null ? uid : name, name];
          o.thread.push(archive);
          if (software === 'foolfuuka') {
            o.post.push(archive);
          }
          if (indexOf.call(files, boardID) >= 0) {
            o.file.push(archive);
          }
        }
      }
      rows = [];
      boardOptions = [];
      ref2 = Object.keys(archBoards).sort();
      for (l = 0, len2 = ref2.length; l < len2; l++) {
        boardID = ref2[l];
        row = $.el('tr', {
          className: "board-" + boardID
        });
        row.hidden = boardID !== g.BOARD.ID;
        boardOptions.push($.el('option', {
          textContent: "/" + boardID + "/",
          value: "board-" + boardID,
          selected: boardID === g.BOARD.ID
        }));
        o = archBoards[boardID];
        ref3 = ['thread', 'post', 'file'];
        for (m = 0, len3 = ref3.length; m < len3; m++) {
          item = ref3[m];
          $.add(row, Settings.addArchiveCell(boardID, o, item));
        }
        rows.push(row);
      }
      if (rows.length === 0) {
        boardSelect.hidden = table.hidden = true;
        return;
      }
      boardSelect.hidden = table.hidden = false;
      if (!(g.BOARD.ID in archBoards)) {
        rows[0].hidden = false;
      }
      $.add(boardSelect, boardOptions);
      $.add(tbody, rows);
      ref4 = Conf['selectedArchives'];
      for (boardID in ref4) {
        data = ref4[boardID];
        for (type in data) {
          id = data[type];
          if ((select = $("select[data-boardid='" + boardID + "'][data-type='" + type + "']", tbody))) {
            select.value = JSON.stringify(id);
            if (!select.value) {
              select.value = select.firstChild.value;
            }
          }
        }
      }
    },
    addArchiveCell: function(boardID, data, type) {
      var archive, i, length, options, select, td;
      length = data[type].length;
      td = $.el('td', {
        className: 'archive-cell'
      });
      if (!length) {
        td.textContent = '--';
        return td;
      }
      options = [];
      i = 0;
      while (i < length) {
        archive = data[type][i++];
        options.push($.el('option', {
          value: JSON.stringify(archive[0]),
          textContent: archive[1]
        }));
      }
      $.extend(td, {
        innerHTML: "<select></select>"
      });
      select = td.firstElementChild;
      if (!(select.disabled = length === 1)) {
        select.setAttribute('data-boardid', boardID);
        select.setAttribute('data-type', type);
        $.on(select, 'change', Settings.saveSelectedArchive);
      }
      $.add(select, options);
      return td;
    },
    saveSelectedArchive: function() {
      return $.get('selectedArchives', Conf['selectedArchives'], (function(_this) {
        return function(arg) {
          var name1, selectedArchives;
          selectedArchives = arg.selectedArchives;
          (selectedArchives[name1 = _this.dataset.boardid] || (selectedArchives[name1] = {}))[_this.dataset.type] = JSON.parse(_this.value);
          $.set('selectedArchives', selectedArchives);
          Conf['selectedArchives'] = selectedArchives;
          return Redirect.selectArchives();
        };
      })(this));
    },
    boardnav: function() {
      return Header.generateBoardList(this.value);
    },
    time: function() {
      return this.nextElementSibling.textContent = Time.format(this.value, new Date());
    },
    timeLocale: function() {
      return Settings.time.call($('[name=time]', Settings.dialog));
    },
    backlink: function() {
      return this.nextElementSibling.textContent = this.value.replace(/%(?:id|%)/g, function(x) {
        return {
          '%id': '123456789',
          '%%': '%'
        }[x];
      });
    },
    fileInfo: function() {
      var data;
      data = {
        isReply: true,
        file: {
          url: "//" + (ImageHost.host()) + "/g/1334437723720.jpg",
          name: 'd9bb2efc98dd0df141a94399ff5880b7.jpg',
          size: '276 KB',
          sizeInBytes: 276 * 1024,
          dimensions: '1280x720',
          isImage: true,
          isVideo: false,
          isSpoiler: true,
          tag: 'Loop'
        }
      };
      return FileInfo.format(this.value, data, this.nextElementSibling);
    },
    favicon: function() {
      var f, i, icon, img, j, len, ref;
      Favicon["switch"]();
      if (g.VIEW === 'thread' && Conf['Unread Favicon']) {
        Unread.update();
      }
      img = this.nextElementSibling.children;
      f = Favicon;
      ref = [f.SFW, f.unreadSFW, f.unreadSFWY, f.NSFW, f.unreadNSFW, f.unreadNSFWY, f.dead, f.unreadDead, f.unreadDeadY];
      for (i = j = 0, len = ref.length; j < len; i = ++j) {
        icon = ref[i];
        if (!img[i]) {
          $.add(this.nextElementSibling, $.el('img'));
        }
        img[i].src = icon;
      }
    },
    togglecss: function() {
      if ($('textarea[name=usercss]', $.x('ancestor::fieldset[1]', this)).disabled = $.id('apply-css').disabled = !this.checked) {
        CustomCSS.rmStyle();
      } else {
        CustomCSS.addStyle();
      }
      return $.cb.checked.call(this);
    },
    keybinds: function(section) {
      var arr, input, inputs, items, key, ref, tbody, tr;
      $.extend(section, {
        innerHTML: "<div class=\"warning\"><code>Keybinds</code> are disabled.</div><div>Allowed keys: <kbd>a-z</kbd>, <kbd>0-9</kbd>, <kbd>Ctrl</kbd>, <kbd>Shift</kbd>, <kbd>Alt</kbd>, <kbd>Meta</kbd>, <kbd>Enter</kbd>, <kbd>Esc</kbd>, <kbd>Up</kbd>, <kbd>Down</kbd>, <kbd>Right</kbd>, <kbd>Left</kbd>.</div><div>Press <kbd>Backspace</kbd> to disable a keybind.</div><table><tbody><tr><th>Actions</th><th>Keybinds</th></tr></tbody></table>"
      });
      $('.warning', section).hidden = Conf['Keybinds'];
      tbody = $('tbody', section);
      items = {};
      inputs = {};
      ref = Config.hotkeys;
      for (key in ref) {
        arr = ref[key];
        tr = $.el('tr', {
          innerHTML: "<td>" + E(arr[1]) + "</td><td><input class=\"field\"></td>"
        });
        input = $('input', tr);
        input.name = key;
        input.spellcheck = false;
        items[key] = Conf[key];
        inputs[key] = input;
        $.on(input, 'keydown', Settings.keybind);
        $.add(tbody, tr);
      }
      return $.get(items, function(items) {
        var val;
        for (key in items) {
          val = items[key];
          inputs[key].value = val;
        }
      });
    },
    keybind: function(e) {
      var key;
      if (e.keyCode === 9) {
        return;
      }
      e.preventDefault();
      e.stopPropagation();
      if ((key = Keybinds.keyCode(e)) == null) {
        return;
      }
      this.value = key;
      return $.cb.value.call(this);
    }
  };

  return Settings;

}).call(this);

UI = (function() {
  var Menu, UI, checkbox, dialog, drag, dragend, dragstart, hover, hoverend, hoverstart, touchend, touchmove,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    slice = [].slice;

  dialog = function(id, properties) {
    var child, el, i, len, move, ref;
    el = $.el('div', {
      className: 'dialog',
      id: id
    });
    $.extend(el, properties);
    el.style.cssText = Conf[id + ".position"];
    move = $('.move', el);
    $.on(move, 'touchstart mousedown', dragstart);
    ref = move.children;
    for (i = 0, len = ref.length; i < len; i++) {
      child = ref[i];
      if (!child.tagName) {
        continue;
      }
      $.on(child, 'touchstart mousedown', function(e) {
        return e.stopPropagation();
      });
    }
    return el;
  };

  Menu = (function() {
    var currentMenu, lastToggledButton;

    currentMenu = null;

    lastToggledButton = null;

    function Menu(type) {
      this.type = type;
      this.addEntry = bind(this.addEntry, this);
      this.onFocus = bind(this.onFocus, this);
      this.keybinds = bind(this.keybinds, this);
      this.close = bind(this.close, this);
      this.setPosition = bind(this.setPosition, this);
      $.on(d, 'AddMenuEntry', (function(_this) {
        return function(arg) {
          var detail;
          detail = arg.detail;
          if (detail.type !== _this.type) {
            return;
          }
          delete detail.open;
          return _this.addEntry(detail);
        };
      })(this));
      this.entries = [];
    }

    Menu.prototype.makeMenu = function() {
      var menu;
      menu = $.el('div', {
        className: 'dialog',
        id: 'menu',
        tabIndex: 0
      });
      menu.dataset.type = this.type;
      $.on(menu, 'click', function(e) {
        return e.stopPropagation();
      });
      $.on(menu, 'keydown', this.keybinds);
      return menu;
    };

    Menu.prototype.toggle = function(e, button, data) {
      var previousButton;
      e.preventDefault();
      e.stopPropagation();
      if (currentMenu) {
        previousButton = lastToggledButton;
        currentMenu.close();
        if (previousButton === button) {
          return;
        }
      }
      if (!this.entries.length) {
        return;
      }
      return this.open(button, data);
    };

    Menu.prototype.open = function(button, data) {
      var entry, i, len, menu, ref;
      menu = this.menu = this.makeMenu();
      currentMenu = this;
      lastToggledButton = button;
      this.entries.sort(function(first, second) {
        return first.order - second.order;
      });
      ref = this.entries;
      for (i = 0, len = ref.length; i < len; i++) {
        entry = ref[i];
        this.insertEntry(entry, menu, data);
      }
      $.addClass(lastToggledButton, 'active');
      $.on(d, 'click CloseMenu', this.close);
      $.on(d, 'scroll', this.setPosition);
      $.on(window, 'resize', this.setPosition);
      $.after(button, menu);
      this.setPosition();
      entry = $('.entry', menu);
      this.focus(entry);
      return menu.focus();
    };

    Menu.prototype.setPosition = function() {
      var bLeft, bRect, bTop, bottom, cHeight, cWidth, left, mRect, ref, ref1, right, top;
      mRect = this.menu.getBoundingClientRect();
      bRect = lastToggledButton.getBoundingClientRect();
      bTop = window.scrollY + bRect.top;
      bLeft = window.scrollX + bRect.left;
      cHeight = doc.clientHeight;
      cWidth = doc.clientWidth;
      ref = bRect.top + bRect.height + mRect.height < cHeight ? [bRect.bottom + "px", ''] : ['', (cHeight - bRect.top) + "px"], top = ref[0], bottom = ref[1];
      ref1 = bRect.left + mRect.width < cWidth ? [bRect.left + "px", ''] : ['', (cWidth - bRect.right) + "px"], left = ref1[0], right = ref1[1];
      $.extend(this.menu.style, {
        top: top,
        right: right,
        bottom: bottom,
        left: left
      });
      return this.menu.classList.toggle('left', right);
    };

    Menu.prototype.insertEntry = function(entry, parent, data) {
      var err, i, len, ref, subEntry, submenu;
      if (typeof entry.open === 'function') {
        try {
          if (!entry.open(data)) {
            return;
          }
        } catch (_error) {
          err = _error;
          Main.handleErrors({
            message: "Error in building the " + this.type + " menu.",
            error: err
          });
          return;
        }
      }
      $.add(parent, entry.el);
      if (!entry.subEntries) {
        return;
      }
      if (submenu = $('.submenu', entry.el)) {
        $.rm(submenu);
      }
      submenu = $.el('div', {
        className: 'dialog submenu'
      });
      ref = entry.subEntries;
      for (i = 0, len = ref.length; i < len; i++) {
        subEntry = ref[i];
        this.insertEntry(subEntry, submenu, data);
      }
      $.add(entry.el, submenu);
    };

    Menu.prototype.close = function() {
      $.rm(this.menu);
      delete this.menu;
      $.rmClass(lastToggledButton, 'active');
      currentMenu = null;
      lastToggledButton = null;
      $.off(d, 'click scroll CloseMenu', this.close);
      $.off(d, 'scroll', this.setPosition);
      return $.off(window, 'resize', this.setPosition);
    };

    Menu.prototype.findNextEntry = function(entry, direction) {
      var entries;
      entries = slice.call(entry.parentNode.children);
      entries.sort(function(first, second) {
        return first.style.order - second.style.order;
      });
      return entries[entries.indexOf(entry) + direction];
    };

    Menu.prototype.keybinds = function(e) {
      var entry, next, nextPrev, subEntry, submenu;
      entry = $('.focused', this.menu);
      while (subEntry = $('.focused', entry)) {
        entry = subEntry;
      }
      switch (e.keyCode) {
        case 27:
          lastToggledButton.focus();
          this.close();
          break;
        case 13:
        case 32:
          entry.click();
          break;
        case 38:
          if (next = this.findNextEntry(entry, -1)) {
            this.focus(next);
          }
          break;
        case 40:
          if (next = this.findNextEntry(entry, +1)) {
            this.focus(next);
          }
          break;
        case 39:
          if ((submenu = $('.submenu', entry)) && (next = submenu.firstElementChild)) {
            while (nextPrev = this.findNextEntry(next, -1)) {
              next = nextPrev;
            }
            this.focus(next);
          }
          break;
        case 37:
          if (next = $.x('parent::*[contains(@class,"submenu")]/parent::*', entry)) {
            this.focus(next);
          }
          break;
        default:
          return;
      }
      e.preventDefault();
      return e.stopPropagation();
    };

    Menu.prototype.onFocus = function(e) {
      e.stopPropagation();
      return this.focus(e.target);
    };

    Menu.prototype.focus = function(entry) {
      var bottom, cHeight, cWidth, eRect, focused, i, left, len, ref, ref1, ref2, right, sRect, style, submenu, top;
      while (focused = $.x('parent::*/child::*[contains(@class,"focused")]', entry)) {
        $.rmClass(focused, 'focused');
      }
      ref = $$('.focused', entry);
      for (i = 0, len = ref.length; i < len; i++) {
        focused = ref[i];
        $.rmClass(focused, 'focused');
      }
      $.addClass(entry, 'focused');
      if (!(submenu = $('.submenu', entry))) {
        return;
      }
      sRect = submenu.getBoundingClientRect();
      eRect = entry.getBoundingClientRect();
      cHeight = doc.clientHeight;
      cWidth = doc.clientWidth;
      ref1 = eRect.top + sRect.height < cHeight ? ['0px', 'auto'] : ['auto', '0px'], top = ref1[0], bottom = ref1[1];
      ref2 = eRect.right + sRect.width < cWidth - 150 ? ['100%', 'auto'] : ['auto', '100%'], left = ref2[0], right = ref2[1];
      style = submenu.style;
      style.top = top;
      style.bottom = bottom;
      style.left = left;
      return style.right = right;
    };

    Menu.prototype.addEntry = function(entry) {
      this.parseEntry(entry);
      return this.entries.push(entry);
    };

    Menu.prototype.parseEntry = function(entry) {
      var el, i, len, subEntries, subEntry;
      el = entry.el, subEntries = entry.subEntries;
      $.addClass(el, 'entry');
      $.on(el, 'focus mouseover', this.onFocus);
      el.style.order = entry.order || 100;
      if (!subEntries) {
        return;
      }
      $.addClass(el, 'has-submenu');
      for (i = 0, len = subEntries.length; i < len; i++) {
        subEntry = subEntries[i];
        this.parseEntry(subEntry);
      }
    };

    return Menu;

  })();

  dragstart = function(e) {
    var el, isTouching, o, rect, ref, screenHeight, screenWidth;
    if (e.type === 'mousedown' && e.button !== 0) {
      return;
    }
    e.preventDefault();
    if (isTouching = e.type === 'touchstart') {
      e = e.changedTouches[e.changedTouches.length - 1];
    }
    el = $.x('ancestor::div[contains(@class,"dialog")][1]', this);
    rect = el.getBoundingClientRect();
    screenHeight = doc.clientHeight;
    screenWidth = doc.clientWidth;
    o = {
      id: el.id,
      style: el.style,
      dx: e.clientX - rect.left,
      dy: e.clientY - rect.top,
      height: screenHeight - rect.height,
      width: screenWidth - rect.width,
      screenHeight: screenHeight,
      screenWidth: screenWidth,
      isTouching: isTouching
    };
    ref = Conf['Header auto-hide'] || !Conf['Fixed Header'] ? [0, 0] : Conf['Bottom Header'] ? [0, Header.bar.getBoundingClientRect().height] : [Header.bar.getBoundingClientRect().height, 0], o.topBorder = ref[0], o.bottomBorder = ref[1];
    if (isTouching) {
      o.identifier = e.identifier;
      o.move = touchmove.bind(o);
      o.up = touchend.bind(o);
      $.on(d, 'touchmove', o.move);
      return $.on(d, 'touchend touchcancel', o.up);
    } else {
      o.move = drag.bind(o);
      o.up = dragend.bind(o);
      $.on(d, 'mousemove', o.move);
      return $.on(d, 'mouseup', o.up);
    }
  };

  touchmove = function(e) {
    var i, len, ref, touch;
    ref = e.changedTouches;
    for (i = 0, len = ref.length; i < len; i++) {
      touch = ref[i];
      if (touch.identifier === this.identifier) {
        drag.call(this, touch);
        return;
      }
    }
  };

  drag = function(e) {
    var bottom, clientX, clientY, left, right, style, top;
    clientX = e.clientX, clientY = e.clientY;
    left = clientX - this.dx;
    left = left < 10 ? 0 : this.width - left < 10 ? '' : left / this.screenWidth * 100 + '%';
    top = clientY - this.dy;
    top = top < (10 + this.topBorder) ? this.topBorder + 'px' : this.height - top < (10 + this.bottomBorder) ? '' : top / this.screenHeight * 100 + '%';
    right = left === '' ? 0 : '';
    bottom = top === '' ? this.bottomBorder + 'px' : '';
    style = this.style;
    style.left = left;
    style.right = right;
    style.top = top;
    return style.bottom = bottom;
  };

  touchend = function(e) {
    var i, len, ref, touch;
    ref = e.changedTouches;
    for (i = 0, len = ref.length; i < len; i++) {
      touch = ref[i];
      if (touch.identifier === this.identifier) {
        dragend.call(this);
        return;
      }
    }
  };

  dragend = function() {
    if (this.isTouching) {
      $.off(d, 'touchmove', this.move);
      $.off(d, 'touchend touchcancel', this.up);
    } else {
      $.off(d, 'mousemove', this.move);
      $.off(d, 'mouseup', this.up);
    }
    return $.set(this.id + ".position", this.style.cssText);
  };

  hoverstart = function(arg) {
    var cb, el, endEvents, height, latestEvent, noRemove, o, ref, root;
    root = arg.root, el = arg.el, latestEvent = arg.latestEvent, endEvents = arg.endEvents, height = arg.height, cb = arg.cb, noRemove = arg.noRemove;
    o = {
      root: root,
      el: el,
      style: el.style,
      isImage: (ref = el.nodeName) === 'IMG' || ref === 'VIDEO',
      cb: cb,
      endEvents: endEvents,
      latestEvent: latestEvent,
      clientHeight: doc.clientHeight,
      clientWidth: doc.clientWidth,
      height: height,
      noRemove: noRemove
    };
    o.hover = hover.bind(o);
    o.hoverend = hoverend.bind(o);
    o.hover(o.latestEvent);
    new MutationObserver(function() {
      if (el.parentNode) {
        return o.hover(o.latestEvent);
      }
    }).observe(el, {
      childList: true
    });
    $.on(root, endEvents, o.hoverend);
    if ($.x('ancestor::div[contains(@class,"inline")][1]', root)) {
      $.on(d, 'keydown', o.hoverend);
    }
    $.on(root, 'mousemove', o.hover);
    o.workaround = function(e) {
      if (!root.contains(e.target)) {
        return o.hoverend(e);
      }
    };
    return $.on(doc, 'mousemove', o.workaround);
  };

  hoverstart.padding = 25;

  hover = function(e) {
    var clientX, clientY, height, left, ref, right, style, threshold, top;
    this.latestEvent = e;
    height = (this.height || this.el.offsetHeight) + hoverstart.padding;
    clientX = e.clientX, clientY = e.clientY;
    top = this.isImage ? Math.max(0, clientY * (this.clientHeight - height) / this.clientHeight) : Math.max(0, Math.min(this.clientHeight - height, clientY - 120));
    threshold = this.clientWidth / 2;
    if (!this.isImage) {
      threshold = Math.max(threshold, this.clientWidth - 400);
    }
    ref = clientX <= threshold ? [clientX + 45 + 'px', ''] : ['', this.clientWidth - clientX + 45 + 'px'], left = ref[0], right = ref[1];
    style = this.style;
    style.top = top + 'px';
    style.left = left;
    return style.right = right;
  };

  hoverend = function(e) {
    if (e.type === 'keydown' && e.keyCode !== 13 || e.target.nodeName === "TEXTAREA") {
      return;
    }
    if (!this.noRemove) {
      $.rm(this.el);
    }
    $.off(this.root, this.endEvents, this.hoverend);
    $.off(d, 'keydown', this.hoverend);
    $.off(this.root, 'mousemove', this.hover);
    $.off(doc, 'mousemove', this.workaround);
    if (this.cb) {
      return this.cb.call(this);
    }
  };

  checkbox = function(name, text, checked) {
    var input, label;
    if (checked == null) {
      checked = Conf[name];
    }
    label = $.el('label');
    input = $.el('input', {
      type: 'checkbox',
      name: name,
      checked: checked
    });
    $.add(label, [input, $.tn(" " + text)]);
    return label;
  };

  UI = {
    dialog: dialog,
    Menu: Menu,
    hover: hoverstart,
    checkbox: checkbox
  };

  return UI;

}).call(this);

FappeTyme = (function() {
  var FappeTyme;

  FappeTyme = {
    init: function() {
      var el, i, indicator, lc, len, ref, ref1, type;
      if (!((Conf['Fappe Tyme'] || Conf['Werk Tyme']) && ((ref = g.VIEW) === 'index' || ref === 'thread' || ref === 'archive'))) {
        return;
      }
      this.nodes = {};
      this.enabled = {
        fappe: false,
        werk: Conf['werk']
      };
      ref1 = ["Fappe", "Werk"];
      for (i = 0, len = ref1.length; i < len; i++) {
        type = ref1[i];
        if (!Conf[type + " Tyme"]) {
          continue;
        }
        lc = type.toLowerCase();
        el = UI.checkbox(lc, type + " Tyme", false);
        el.title = type + " Tyme";
        this.nodes[lc] = el.firstElementChild;
        if (Conf[lc]) {
          this.set(lc, true);
        }
        $.on(this.nodes[lc], 'change', this.toggle.bind(this, lc));
        Header.menu.addEntry({
          el: el,
          order: 97
        });
        indicator = $.el('span', {
          className: 'indicator',
          textContent: type[0],
          title: type + " Tyme active"
        });
        $.on(indicator, 'click', function() {
          var check;
          check = FappeTyme.nodes[this.parentNode.id.replace('shortcut-', '')];
          check.checked = !check.checked;
          return $.event('change', null, check);
        });
        Header.addShortcut(lc, indicator, 410);
      }
      if (Conf['Werk Tyme']) {
        $.sync('werk', this.set.bind(this, 'werk'));
      }
      Callbacks.Post.push({
        name: 'Fappe Tyme',
        cb: this.node
      });
      return Callbacks.CatalogThread.push({
        name: 'Werk Tyme',
        cb: this.catalogNode
      });
    },
    node: function() {
      return this.nodes.root.classList.toggle('noFile', !this.file);
    },
    catalogNode: function() {
      var file, filename;
      file = this.thread.OP.file;
      if (!file) {
        return;
      }
      filename = $.el('div', {
        textContent: file.name,
        className: 'werkTyme-filename'
      });
      return $.add(this.nodes.thumb.parentNode, filename);
    },
    set: function(type, enabled) {
      this.enabled[type] = this.nodes[type].checked = enabled;
      return $[(enabled ? 'add' : 'rm') + "Class"](doc, type + "Tyme");
    },
    toggle: function(type) {
      this.set(type, !this.enabled[type]);
      if (type === 'werk') {
        return $.cb.checked.call(this.nodes[type]);
      }
    }
  };

  return FappeTyme;

}).call(this);

Gallery = (function() {
  var Gallery;

  Gallery = {
    init: function() {
      var el, ref;
      if (!(this.enabled = Conf['Gallery'] && ((ref = g.VIEW) === 'index' || ref === 'thread'))) {
        return;
      }
      this.delay = Conf['Slide Delay'];
      el = $.el('a', {
        href: 'javascript:;',
        title: 'Gallery',
        className: 'fa fa-picture-o',
        textContent: 'Gallery'
      });
      $.on(el, 'click', this.cb.toggle);
      Header.addShortcut('gallery', el, 530);
      return Callbacks.Post.push({
        name: 'Gallery',
        cb: this.node
      });
    },
    node: function() {
      var ref;
      if (!((ref = this.file) != null ? ref.thumb : void 0)) {
        return;
      }
      if (Gallery.nodes) {
        Gallery.generateThumb(this);
        Gallery.nodes.total.textContent = Gallery.images.length;
      }
      if (!Conf['Image Expansion']) {
        return $.on(this.file.thumbLink, 'click', Gallery.cb.image);
      }
    },
    build: function(image) {
      var candidate, cb, dialog, entry, i, j, key, len, len1, menuButton, nodes, post, postThumb, ref, ref1, ref2, ref3, thumb, value;
      cb = Gallery.cb;
      if (Conf['Fullscreen Gallery']) {
        $.one(d, 'fullscreenchange mozfullscreenchange webkitfullscreenchange', function() {
          return $.on(d, 'fullscreenchange mozfullscreenchange webkitfullscreenchange', cb.close);
        });
        if (typeof doc.mozRequestFullScreen === "function") {
          doc.mozRequestFullScreen();
        }
        if (typeof doc.webkitRequestFullScreen === "function") {
          doc.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
        }
      }
      Gallery.images = [];
      nodes = Gallery.nodes = {};
      Gallery.fullIDs = {};
      Gallery.slideshow = false;
      nodes.el = dialog = $.el('div', {
        id: 'a-gallery'
      });
      $.extend(dialog, {
        innerHTML: "<div class=\"gal-viewport\"><span class=\"gal-buttons\"><a href=\"javascript:;\" class=\"gal-start\" title=\"Start slideshow\"><i></i></a><a href=\"javascript:;\" class=\"gal-stop\" title=\"Stop slideshow\"><i></i></a><a href=\"javascript:;\" class=\"menu-button\"><i></i></a><a href=\"javascript:;\" class=\"gal-close\">×</a></span><a class=\"gal-name\" target=\"_blank\"></a><span class=\"gal-count\"><span class=\"count\"></span> / <span class=\"total\"></span></span><div class=\"gal-prev\"></div><div class=\"gal-image\"><a href=\"javascript:;\"><img></a></div><div class=\"gal-next\"></div></div><div class=\"gal-thumbnails\"></div>"
      });
      ref = {
        buttons: '.gal-buttons',
        frame: '.gal-image',
        name: '.gal-name',
        count: '.count',
        total: '.total',
        thumbs: '.gal-thumbnails',
        next: '.gal-image a',
        current: '.gal-image img'
      };
      for (key in ref) {
        value = ref[key];
        nodes[key] = $(value, dialog);
      }
      menuButton = $('.menu-button', dialog);
      nodes.menu = new UI.Menu('gallery');
      $.on(nodes.frame, 'click', cb.blank);
      if (Conf['Mouse Wheel Volume']) {
        $.on(nodes.frame, 'wheel', Volume.wheel);
      }
      $.on(nodes.next, 'click', cb.click);
      $.on(nodes.name, 'click', ImageCommon.download);
      $.on($('.gal-prev', dialog), 'click', cb.prev);
      $.on($('.gal-next', dialog), 'click', cb.next);
      $.on($('.gal-start', dialog), 'click', cb.start);
      $.on($('.gal-stop', dialog), 'click', cb.stop);
      $.on($('.gal-close', dialog), 'click', cb.close);
      $.on(menuButton, 'click', function(e) {
        return nodes.menu.toggle(e, this, g);
      });
      ref1 = Gallery.menu.createSubEntries();
      for (i = 0, len = ref1.length; i < len; i++) {
        entry = ref1[i];
        entry.order = 0;
        nodes.menu.addEntry(entry);
      }
      $.on(d, 'keydown', cb.keybinds);
      if (Conf['Keybinds']) {
        $.off(d, 'keydown', Keybinds.keydown);
      }
      $.on(window, 'resize', Gallery.cb.setHeight);
      ref2 = $$(Site.selectors.file.thumb);
      for (j = 0, len1 = ref2.length; j < len1; j++) {
        postThumb = ref2[j];
        post = Get.postFromNode(postThumb);
        if (!((ref3 = post.file) != null ? ref3.thumb : void 0)) {
          continue;
        }
        Gallery.generateThumb(post);
        if (!image && Gallery.fullIDs[post.fullID]) {
          candidate = post.file.thumbLink;
          if (Header.getTopOf(candidate) + candidate.getBoundingClientRect().height >= 0) {
            image = candidate;
          }
        }
      }
      $.addClass(doc, 'gallery-open');
      $.add(d.body, dialog);
      nodes.thumbs.scrollTop = 0;
      nodes.current.parentElement.scrollTop = 0;
      if (image) {
        thumb = $("[href='" + image.href + "']", nodes.thumbs);
      }
      thumb || (thumb = Gallery.images[Gallery.images.length - 1]);
      if (thumb) {
        Gallery.open(thumb);
      }
      doc.style.overflow = 'hidden';
      return nodes.total.textContent = Gallery.images.length;
    },
    generateThumb: function(post) {
      var thumb, thumbImg;
      if (post.isClone || post.isHidden) {
        return;
      }
      if (!(post.file && post.file.thumb && (post.file.isImage || post.file.isVideo || Conf['PDF in Gallery']))) {
        return;
      }
      if (Gallery.fullIDs[post.fullID]) {
        return;
      }
      Gallery.fullIDs[post.fullID] = true;
      thumb = $.el('a', {
        className: 'gal-thumb',
        href: post.file.url,
        target: '_blank',
        title: post.file.name
      });
      thumb.dataset.id = Gallery.images.length;
      thumb.dataset.post = post.fullID;
      thumbImg = post.file.thumb.cloneNode(false);
      thumbImg.style.cssText = '';
      $.add(thumb, thumbImg);
      $.on(thumb, 'click', Gallery.cb.open);
      Gallery.images.push(thumb);
      return $.add(Gallery.nodes.thumbs, thumb);
    },
    load: function(thumb, errorCB) {
      var elType, ext, file;
      ext = thumb.href.match(/\w*$/);
      elType = {
        'webm': 'video',
        'mp4': 'video',
        'pdf': 'iframe'
      }[ext] || 'img';
      file = $.el(elType);
      $.extend(file.dataset, thumb.dataset);
      $.on(file, 'error', errorCB);
      file.src = thumb.href;
      return file;
    },
    open: function(thumb) {
      var el, file, newID, nodes, oldID, post, ref;
      nodes = Gallery.nodes;
      oldID = +nodes.current.dataset.id;
      newID = +thumb.dataset.id;
      if (el = Gallery.images[oldID]) {
        $.rmClass(el, 'gal-highlight');
      }
      $.addClass(thumb, 'gal-highlight');
      nodes.thumbs.scrollTop = thumb.offsetTop + thumb.offsetHeight / 2 - nodes.thumbs.clientHeight / 2;
      if (((ref = Gallery.cache) != null ? ref.dataset.id : void 0) === '' + newID) {
        file = Gallery.cache;
        $.off(file, 'error', Gallery.cacheError);
        $.on(file, 'error', Gallery.error);
      } else {
        file = Gallery.load(thumb, Gallery.error);
      }
      $.off(nodes.current, 'error', Gallery.error);
      ImageCommon.pause(nodes.current);
      $.replace(nodes.current, file);
      nodes.current = file;
      if (file.nodeName === 'VIDEO') {
        file.loop = true;
        Volume.setup(file);
        if (Conf['Autoplay']) {
          file.play();
        }
        if (Conf['Show Controls']) {
          ImageCommon.addControls(file);
        }
      }
      doc.classList.toggle('gal-pdf', file.nodeName === 'IFRAME');
      Gallery.cb.setHeight();
      nodes.count.textContent = +thumb.dataset.id + 1;
      nodes.name.download = nodes.name.textContent = thumb.title;
      nodes.name.href = thumb.href;
      nodes.frame.scrollTop = 0;
      nodes.next.focus();
      if (Gallery.slideshow && (newID > oldID || (oldID === Gallery.images.length - 1 && newID === 0))) {
        Gallery.setupTimer();
      } else {
        Gallery.cb.stop();
      }
      if (Conf['Scroll to Post'] && (post = g.posts[file.dataset.post])) {
        Header.scrollTo(post.nodes.root);
      }
      if (isNaN(oldID) || newID === (oldID + 1) % Gallery.images.length) {
        return Gallery.cache = Gallery.load(Gallery.images[(newID + 1) % Gallery.images.length], Gallery.cacheError);
      }
    },
    error: function() {
      var ref;
      if (((ref = this.error) != null ? ref.code : void 0) === MediaError.MEDIA_ERR_DECODE) {
        return new Notice('error', 'Corrupt or unplayable video', 30);
      }
      if (ImageCommon.isFromArchive(this)) {
        return;
      }
      return ImageCommon.error(this, g.posts[this.dataset.post], null, (function(_this) {
        return function(url) {
          if (!url) {
            return;
          }
          Gallery.images[_this.dataset.id].href = url;
          if (Gallery.nodes.current === _this) {
            return _this.src = url;
          }
        };
      })(this));
    },
    cacheError: function() {
      return delete Gallery.cache;
    },
    cleanupTimer: function() {
      var current;
      clearTimeout(Gallery.timeoutID);
      current = Gallery.nodes.current;
      $.off(current, 'canplaythrough load', Gallery.startTimer);
      return $.off(current, 'ended', Gallery.cb.next);
    },
    startTimer: function() {
      return Gallery.timeoutID = setTimeout(Gallery.checkTimer, Gallery.delay * $.SECOND);
    },
    setupTimer: function() {
      var current, isVideo;
      Gallery.cleanupTimer();
      current = Gallery.nodes.current;
      isVideo = current.nodeName === 'VIDEO';
      if (isVideo) {
        current.play();
      }
      if ((isVideo ? current.readyState >= 4 : current.complete) || current.nodeName === 'IFRAME') {
        return Gallery.startTimer();
      } else {
        return $.on(current, (isVideo ? 'canplaythrough' : 'load'), Gallery.startTimer);
      }
    },
    checkTimer: function() {
      var current;
      current = Gallery.nodes.current;
      if (current.nodeName === 'VIDEO' && !current.paused) {
        $.on(current, 'ended', Gallery.cb.next);
        return current.loop = false;
      } else {
        return Gallery.cb.next();
      }
    },
    cb: {
      keybinds: function(e) {
        var cb, key;
        if (!(key = Keybinds.keyCode(e))) {
          return;
        }
        cb = (function() {
          switch (key) {
            case Conf['Close']:
            case Conf['Open Gallery']:
              return Gallery.cb.close;
            case Conf['Next Gallery Image']:
              return Gallery.cb.next;
            case Conf['Advance Gallery']:
              return Gallery.cb.advance;
            case Conf['Previous Gallery Image']:
              return Gallery.cb.prev;
            case Conf['Pause']:
              return Gallery.cb.pause;
            case Conf['Slideshow']:
              return Gallery.cb.toggleSlideshow;
          }
        })();
        if (!cb) {
          return;
        }
        e.stopPropagation();
        e.preventDefault();
        return cb();
      },
      open: function(e) {
        if (e) {
          e.preventDefault();
        }
        if (this) {
          return Gallery.open(this);
        }
      },
      image: function(e) {
        e.preventDefault();
        e.stopPropagation();
        return Gallery.build(this);
      },
      prev: function() {
        return Gallery.cb.open.call(Gallery.images[+Gallery.nodes.current.dataset.id - 1] || Gallery.images[Gallery.images.length - 1]);
      },
      next: function() {
        return Gallery.cb.open.call(Gallery.images[+Gallery.nodes.current.dataset.id + 1] || Gallery.images[0]);
      },
      click: function(e) {
        if (ImageCommon.onControls(e)) {
          return;
        }
        e.preventDefault();
        return Gallery.cb.advance();
      },
      advance: function() {
        if (!Conf['Autoplay'] && Gallery.nodes.current.paused) {
          return Gallery.nodes.current.play();
        } else {
          return Gallery.cb.next();
        }
      },
      toggle: function() {
        return (Gallery.nodes ? Gallery.cb.close : Gallery.build)();
      },
      blank: function(e) {
        if (e.target === this) {
          return Gallery.cb.close();
        }
      },
      toggleSlideshow: function() {
        return Gallery.cb[Gallery.slideshow ? 'stop' : 'start']();
      },
      pause: function() {
        var current;
        Gallery.cb.stop();
        current = Gallery.nodes.current;
        if (current.nodeName === 'VIDEO') {
          return current[current.paused ? 'play' : 'pause']();
        }
      },
      start: function() {
        $.addClass(Gallery.nodes.buttons, 'gal-playing');
        Gallery.slideshow = true;
        return Gallery.setupTimer();
      },
      stop: function() {
        var current;
        if (!Gallery.slideshow) {
          return;
        }
        Gallery.cleanupTimer();
        current = Gallery.nodes.current;
        if (current.nodeName === 'VIDEO') {
          current.loop = true;
        }
        $.rmClass(Gallery.nodes.buttons, 'gal-playing');
        return Gallery.slideshow = false;
      },
      close: function() {
        $.off(Gallery.nodes.current, 'error', Gallery.error);
        ImageCommon.pause(Gallery.nodes.current);
        $.rm(Gallery.nodes.el);
        $.rmClass(doc, 'gallery-open');
        if (Conf['Fullscreen Gallery']) {
          $.off(d, 'fullscreenchange mozfullscreenchange webkitfullscreenchange', Gallery.cb.close);
          if (typeof d.mozCancelFullScreen === "function") {
            d.mozCancelFullScreen();
          }
          if (typeof d.webkitExitFullscreen === "function") {
            d.webkitExitFullscreen();
          }
        }
        delete Gallery.nodes;
        delete Gallery.fullIDs;
        doc.style.overflow = '';
        $.off(d, 'keydown', Gallery.cb.keybinds);
        if (Conf['Keybinds']) {
          $.on(d, 'keydown', Keybinds.keydown);
        }
        $.off(window, 'resize', Gallery.cb.setHeight);
        return clearTimeout(Gallery.timeoutID);
      },
      setFitness: function() {
        return (this.checked ? $.addClass : $.rmClass)(doc, "gal-" + (this.name.toLowerCase().replace(/\s+/g, '-')));
      },
      setHeight: $.debounce(100, function() {
        var current, dim, frame, height, minHeight, ref, ref1, ref2, style, width;
        ref = Gallery.nodes, current = ref.current, frame = ref.frame;
        style = current.style;
        if (Conf['Stretch to Fit'] && (dim = (ref1 = g.posts[current.dataset.post]) != null ? ref1.file.dimensions : void 0)) {
          ref2 = dim.split('x'), width = ref2[0], height = ref2[1];
          minHeight = Math.min(doc.clientHeight - 25, height / width * frame.clientWidth);
          style.minHeight = minHeight + 'px';
          return style.minWidth = (width / height * minHeight) + 'px';
        } else {
          return style.minHeight = style.minWidth = '';
        }
      }),
      setDelay: function() {
        return Gallery.delay = +this.value;
      }
    },
    menu: {
      init: function() {
        var el;
        if (!Gallery.enabled) {
          return;
        }
        el = $.el('span', {
          textContent: 'Gallery',
          className: 'gallery-link'
        });
        return Header.menu.addEntry({
          el: el,
          order: 105,
          subEntries: Gallery.menu.createSubEntries()
        });
      },
      createSubEntry: function(name) {
        var input, label;
        label = UI.checkbox(name, name);
        input = label.firstElementChild;
        if (name === 'Hide Thumbnails' || name === 'Fit Width' || name === 'Fit Height') {
          $.on(input, 'change', Gallery.cb.setFitness);
        }
        $.event('change', null, input);
        $.on(input, 'change', $.cb.checked);
        if (name === 'Hide Thumbnails' || name === 'Fit Width' || name === 'Fit Height' || name === 'Stretch to Fit') {
          $.on(input, 'change', Gallery.cb.setHeight);
        }
        return {
          el: label
        };
      },
      createSubEntries: function() {
        var delayInput, delayLabel, item, subEntries;
        subEntries = (function() {
          var i, len, ref, results;
          ref = ['Hide Thumbnails', 'Fit Width', 'Fit Height', 'Stretch to Fit', 'Scroll to Post'];
          results = [];
          for (i = 0, len = ref.length; i < len; i++) {
            item = ref[i];
            results.push(Gallery.menu.createSubEntry(item));
          }
          return results;
        })();
        delayLabel = $.el('label', {
          innerHTML: "Slide Delay: <input type=\"number\" name=\"Slide Delay\" min=\"0\" step=\"any\" class=\"field\">"
        });
        delayInput = delayLabel.firstElementChild;
        delayInput.value = Gallery.delay;
        $.on(delayInput, 'change', Gallery.cb.setDelay);
        $.on(delayInput, 'change', $.cb.value);
        subEntries.push({
          el: delayLabel
        });
        return subEntries;
      }
    }
  };

  return Gallery;

}).call(this);

ImageCommon = (function() {
  var ImageCommon;

  ImageCommon = {
    pause: function(video) {
      if (video.nodeName !== 'VIDEO') {
        return;
      }
      video.pause();
      $.off(video, 'volumechange', Volume.change);
      return video.muted = true;
    },
    rewind: function(el) {
      if (el.nodeName === 'VIDEO') {
        if (el.readyState >= el.HAVE_METADATA) {
          return el.currentTime = 0;
        }
      } else if (/\.gif$/.test(el.src)) {
        return $.queueTask(function() {
          return el.src = el.src;
        });
      }
    },
    pushCache: function(el) {
      ImageCommon.cache = el;
      return $.on(el, 'error', ImageCommon.cacheError);
    },
    popCache: function() {
      var el;
      el = ImageCommon.cache;
      $.off(el, 'error', ImageCommon.cacheError);
      delete ImageCommon.cache;
      return el;
    },
    cacheError: function() {
      if (ImageCommon.cache === this) {
        return delete ImageCommon.cache;
      }
    },
    decodeError: function(file, post) {
      var message, ref;
      if (((ref = file.error) != null ? ref.code : void 0) !== MediaError.MEDIA_ERR_DECODE) {
        return false;
      }
      if (!(message = $('.warning', post.file.thumb.parentNode))) {
        message = $.el('div', {
          className: 'warning'
        });
        $.after(post.file.thumb, message);
      }
      message.textContent = 'Error: Corrupt or unplayable video';
      return true;
    },
    isFromArchive: function(file) {
      return !ImageHost.test(file.src.split('/')[2]);
    },
    error: function(file, post, delay, cb) {
      var URL, redirect, src, timeoutID;
      src = post.file.url.split('/');
      URL = Redirect.to('file', {
        boardID: post.board.ID,
        filename: src[src.length - 1]
      });
      if (!(Conf['404 Redirect'] && URL && Redirect.securityCheck(URL))) {
        URL = null;
      }
      if ((post.isDead || post.file.isDead) && !ImageCommon.isFromArchive(file)) {
        return cb(URL);
      }
      if (delay != null) {
        timeoutID = setTimeout((function() {
          return cb(URL);
        }), delay);
      }
      if (post.isDead || post.file.isDead) {
        return;
      }
      redirect = function() {
        if (!ImageCommon.isFromArchive(file)) {
          if (delay != null) {
            clearTimeout(timeoutID);
          }
          return cb(URL);
        }
      };
      return $.ajax(location.protocol + "//a.4cdn.org/" + post.board + "/thread/" + post.thread + ".json", {
        onload: function() {
          var i, len, postObj, ref;
          if (this.status === 404) {
            post.kill(!post.isClone);
          }
          if (this.status !== 200) {
            return redirect();
          }
          ref = this.response.posts;
          for (i = 0, len = ref.length; i < len; i++) {
            postObj = ref[i];
            if (postObj.no === post.ID) {
              break;
            }
          }
          if (postObj.no !== post.ID) {
            post.kill();
            return redirect();
          } else if (postObj.filedeleted) {
            post.kill(true);
            return redirect();
          } else {
            return URL = post.file.url;
          }
        }
      });
    },
    addControls: function(video) {
      var handler;
      handler = function() {
        var t;
        $.off(video, 'mouseover', handler);
        t = new Date().getTime();
        return $.asap((function() {
          return $.engine !== 'gecko' || (video.readyState >= 3 && video.currentTime <= Math.max(0.1, video.duration - 0.5)) || new Date().getTime() >= t + 1000;
        }), function() {
          return video.controls = true;
        });
      };
      return $.on(video, 'mouseover', handler);
    },
    onControls: function(e) {
      return (Conf['Show Controls'] && Conf['Click Passthrough'] && e.target.nodeName === 'VIDEO') || (e.target.controls && e.target.getBoundingClientRect().bottom - e.clientY < 35);
    },
    download: function(e) {
      var download, href;
      if (this.protocol === 'blob:') {
        return true;
      }
      e.preventDefault();
      href = this.href, download = this.download;
      return CrossOrigin.file(href, function(blob) {
        var a;
        if (blob) {
          a = $.el('a', {
            href: URL.createObjectURL(blob),
            download: download,
            hidden: true
          });
          $.add(d.body, a);
          a.click();
          return $.rm(a);
        } else {
          return new Notice('warning', "Could not download " + href, 20);
        }
      });
    }
  };

  return ImageCommon;

}).call(this);

ImageExpand = (function() {
  var ImageExpand,
    slice = [].slice;

  ImageExpand = {
    init: function() {
      var ref;
      if (!(this.enabled = Conf['Image Expansion'] && ((ref = g.VIEW) === 'index' || ref === 'thread'))) {
        return;
      }
      this.EAI = $.el('a', {
        className: 'expand-all-shortcut fa fa-expand',
        textContent: 'EAI',
        title: 'Expand All Images',
        href: 'javascript:;'
      });
      $.on(this.EAI, 'click', this.cb.toggleAll);
      Header.addShortcut('expand-all', this.EAI, 520);
      $.on(d, 'scroll visibilitychange', this.cb.playVideos);
      this.videoControls = $.el('span', {
        className: 'video-controls'
      });
      $.extend(this.videoControls, {
        innerHTML: " <a href=\"javascript:;\" title=\"You can also contract the video by dragging it to the left.\">contract</a>"
      });
      return Callbacks.Post.push({
        name: 'Image Expansion',
        cb: this.node
      });
    },
    node: function() {
      var ref;
      if (!(this.file && (this.file.isImage || this.file.isVideo))) {
        return;
      }
      $.on(this.file.thumbLink, 'click', ImageExpand.cb.toggle);
      if (this.isClone) {
        if (this.file.isExpanding) {
          ImageExpand.contract(this);
          return ImageExpand.expand(this);
        } else if (this.file.isExpanded && this.file.isVideo) {
          Volume.setup(this.file.fullImage);
          ImageExpand.setupVideoCB(this);
          return ImageExpand.setupVideo(this, !((ref = this.origin.file.fullImage) != null ? ref.paused : void 0) || this.origin.file.wasPlaying, this.file.fullImage.controls);
        }
      } else if (ImageExpand.on && !this.isHidden && !this.isFetchedQuote && (Conf['Expand spoilers'] || !this.file.isSpoiler) && (Conf['Expand videos'] || !this.file.isVideo)) {
        return ImageExpand.expand(this);
      }
    },
    cb: {
      toggle: function(e) {
        var file, post, ref;
        if ($.modifiedClick(e)) {
          return;
        }
        post = Get.postFromNode(this);
        file = post.file;
        if (file.isExpanded && ImageCommon.onControls(e)) {
          return;
        }
        e.preventDefault();
        if (!Conf['Autoplay'] && ((ref = file.fullImage) != null ? ref.paused : void 0)) {
          return file.fullImage.play();
        } else {
          return ImageExpand.toggle(post);
        }
      },
      toggleAll: function() {
        var func, threadRoot, toggle;
        $.event('CloseMenu');
        threadRoot = Nav.getThread();
        toggle = function(post) {
          var file;
          file = post.file;
          if (!(file && (file.isImage || file.isVideo) && doc.contains(post.nodes.root))) {
            return;
          }
          if (ImageExpand.on && (!Conf['Expand spoilers'] && file.isSpoiler || !Conf['Expand videos'] && file.isVideo || Conf['Expand from here'] && Header.getTopOf(file.thumb) < 0 || Conf['Expand thread only'] && g.VIEW === 'index' && !(threadRoot != null ? threadRoot.contains(file.thumb) : void 0))) {
            return;
          }
          return $.queueTask(func, post);
        };
        if (ImageExpand.on = $.hasClass(ImageExpand.EAI, 'expand-all-shortcut')) {
          ImageExpand.EAI.className = 'contract-all-shortcut fa fa-compress';
          ImageExpand.EAI.title = 'Contract All Images';
          func = ImageExpand.expand;
        } else {
          ImageExpand.EAI.className = 'expand-all-shortcut fa fa-expand';
          ImageExpand.EAI.title = 'Expand All Images';
          func = ImageExpand.contract;
        }
        return g.posts.forEach(function(post) {
          var i, len, ref;
          ref = [post].concat(slice.call(post.clones));
          for (i = 0, len = ref.length; i < len; i++) {
            post = ref[i];
            toggle(post);
          }
        });
      },
      playVideos: function() {
        return g.posts.forEach(function(post) {
          var file, i, len, ref, video, visible;
          ref = [post].concat(slice.call(post.clones));
          for (i = 0, len = ref.length; i < len; i++) {
            post = ref[i];
            file = post.file;
            if (!(file && file.isVideo && file.isExpanded)) {
              continue;
            }
            video = file.fullImage;
            visible = ($.hasAudio(video) && !video.muted) || Header.isNodeVisible(video);
            if (visible && file.wasPlaying) {
              delete file.wasPlaying;
              video.play();
            } else if (!visible && !video.paused) {
              file.wasPlaying = true;
              video.pause();
            }
          }
        });
      },
      setFitness: function() {
        return $[this.checked ? 'addClass' : 'rmClass'](doc, this.name.toLowerCase().replace(/\s+/g, '-'));
      }
    },
    toggle: function(post) {
      var next;
      if (!(post.file.isExpanding || post.file.isExpanded)) {
        post.file.scrollIntoView = Conf['Scroll into view'];
        ImageExpand.expand(post);
        return;
      }
      ImageExpand.contract(post);
      if (Conf['Advance on contract']) {
        next = post.nodes.root;
        while (next = $.x("following::div[contains(@class,'postContainer')][1]", next)) {
          if (!($('.stub', next) || next.offsetHeight === 0)) {
            break;
          }
        }
        if (next) {
          return Header.scrollTo(next);
        }
      }
    },
    contract: function(post) {
      var bottom, cb, el, eventName, file, i, len, oldHeight, ref, ref1, scrollY, top, x;
      file = post.file;
      if (el = file.fullImage) {
        top = Header.getTopOf(el);
        bottom = top + el.getBoundingClientRect().height;
        oldHeight = d.body.clientHeight;
        scrollY = window.scrollY;
      }
      $.rmClass(post.nodes.root, 'expanded-image');
      $.rmClass(file.thumb, 'expanding');
      $.rm(file.videoControls);
      file.thumbLink.href = file.url;
      file.thumbLink.target = '_blank';
      ref = ['isExpanding', 'isExpanded', 'videoControls', 'wasPlaying', 'scrollIntoView'];
      for (i = 0, len = ref.length; i < len; i++) {
        x = ref[i];
        delete file[x];
      }
      if (!el) {
        return;
      }
      if (doc.contains(el)) {
        if (bottom <= 0) {
          window.scrollBy(0, scrollY - window.scrollY + d.body.clientHeight - oldHeight);
        } else {
          Header.scrollToIfNeeded(post.nodes.root);
        }
        if (window.scrollX > 0) {
          window.scrollBy(-window.scrollX, 0);
        }
      }
      $.off(el, 'error', ImageExpand.error);
      ImageCommon.pushCache(el);
      if (file.isVideo) {
        ImageCommon.pause(el);
        ref1 = ImageExpand.videoCB;
        for (eventName in ref1) {
          cb = ref1[eventName];
          $.off(el, eventName, cb);
        }
      }
      if (Conf['Restart when Opened']) {
        ImageCommon.rewind(file.thumb);
      }
      delete file.fullImage;
      return $.queueTask(function() {
        if (file.isExpanding || file.isExpanded) {
          return;
        }
        $.rmClass(el, 'full-image');
        if (el.id) {
          return;
        }
        return $.rm(el);
      });
    },
    expand: function(post, src) {
      var el, file, isVideo, ref, thumb, thumbLink;
      file = post.file;
      thumb = file.thumb, thumbLink = file.thumbLink, isVideo = file.isVideo;
      if (post.isHidden || file.isExpanding || file.isExpanded) {
        return;
      }
      $.addClass(thumb, 'expanding');
      file.isExpanding = true;
      if (file.fullImage) {
        el = file.fullImage;
      } else if (((ref = ImageCommon.cache) != null ? ref.dataset.fullID : void 0) === post.fullID) {
        el = file.fullImage = ImageCommon.popCache();
        $.on(el, 'error', ImageExpand.error);
        if (Conf['Restart when Opened'] && el.id !== 'ihover') {
          ImageCommon.rewind(el);
        }
        el.removeAttribute('id');
      } else {
        el = file.fullImage = $.el((isVideo ? 'video' : 'img'));
        el.dataset.fullID = post.fullID;
        $.on(el, 'error', ImageExpand.error);
        el.src = src || file.url;
      }
      el.className = 'full-image';
      $.after(thumb, el);
      if (isVideo) {
        if (!file.videoControls) {
          file.videoControls = ImageExpand.videoControls.cloneNode(true);
          $.add(file.text, file.videoControls);
        }
        thumbLink.removeAttribute('href');
        thumbLink.removeAttribute('target');
        el.loop = true;
        Volume.setup(el);
        ImageExpand.setupVideoCB(post);
      }
      if (!isVideo) {
        return $.asap((function() {
          return el.naturalHeight;
        }), function() {
          return ImageExpand.completeExpand(post);
        });
      } else if (el.readyState >= el.HAVE_METADATA) {
        return ImageExpand.completeExpand(post);
      } else {
        return $.on(el, 'loadedmetadata', function() {
          return ImageExpand.completeExpand(post);
        });
      }
    },
    completeExpand: function(post) {
      var bottom, file, imageBottom, oldHeight, scrollY;
      file = post.file;
      if (!file.isExpanding) {
        return;
      }
      bottom = Header.getTopOf(file.thumb) + file.thumb.getBoundingClientRect().height;
      oldHeight = d.body.clientHeight;
      scrollY = window.scrollY;
      $.addClass(post.nodes.root, 'expanded-image');
      $.rmClass(file.thumb, 'expanding');
      file.isExpanded = true;
      delete file.isExpanding;
      if (doc.contains(post.nodes.root) && bottom <= 0) {
        window.scrollBy(0, scrollY - window.scrollY + d.body.clientHeight - oldHeight);
      }
      if (file.scrollIntoView) {
        delete file.scrollIntoView;
        imageBottom = Math.min(doc.clientHeight - file.fullImage.getBoundingClientRect().bottom - 25, Header.getBottomOf(file.fullImage));
        if (imageBottom < 0) {
          window.scrollBy(0, Math.min(-imageBottom, Header.getTopOf(file.fullImage)));
        }
      }
      if (file.isVideo) {
        return ImageExpand.setupVideo(post, Conf['Autoplay'], Conf['Show Controls']);
      }
    },
    setupVideo: function(post, playing, controls) {
      var fullImage;
      fullImage = post.file.fullImage;
      if (!playing) {
        fullImage.controls = controls;
        return;
      }
      fullImage.controls = false;
      $.asap((function() {
        return doc.contains(fullImage);
      }), function() {
        if (!d.hidden && Header.isNodeVisible(fullImage)) {
          return fullImage.play();
        } else {
          return post.file.wasPlaying = true;
        }
      });
      if (controls) {
        return ImageCommon.addControls(fullImage);
      }
    },
    videoCB: (function() {
      var mousedown;
      mousedown = false;
      return {
        mouseover: function() {
          return mousedown = false;
        },
        mousedown: function(e) {
          if (e.button === 0) {
            return mousedown = true;
          }
        },
        mouseup: function(e) {
          if (e.button === 0) {
            return mousedown = false;
          }
        },
        mouseout: function(e) {
          if (mousedown && e.clientX <= this.getBoundingClientRect().left) {
            return ImageExpand.toggle(Get.postFromNode(this));
          }
        }
      };
    })(),
    setupVideoCB: function(post) {
      var cb, eventName, ref;
      ref = ImageExpand.videoCB;
      for (eventName in ref) {
        cb = ref[eventName];
        $.on(post.file.fullImage, eventName, cb);
      }
      if (post.file.videoControls) {
        return $.on(post.file.videoControls.firstElementChild, 'click', function() {
          return ImageExpand.toggle(post);
        });
      }
    },
    error: function() {
      var post;
      post = Get.postFromNode(this);
      $.rm(this);
      delete post.file.fullImage;
      if (!(post.file.isExpanding || post.file.isExpanded)) {
        return;
      }
      if (ImageCommon.decodeError(this, post)) {
        return ImageExpand.contract(post);
      }
      if (ImageCommon.isFromArchive(this)) {
        return ImageExpand.contract(post);
      }
      return ImageCommon.error(this, post, 10 * $.SECOND, function(URL) {
        if (post.file.isExpanding || post.file.isExpanded) {
          ImageExpand.contract(post);
          if (URL) {
            return ImageExpand.expand(post, URL);
          }
        }
      });
    },
    menu: {
      init: function() {
        var conf, createSubEntry, el, name, ref, subEntries;
        if (!ImageExpand.enabled) {
          return;
        }
        el = $.el('span', {
          textContent: 'Image Expansion',
          className: 'image-expansion-link'
        });
        createSubEntry = ImageExpand.menu.createSubEntry;
        subEntries = [];
        ref = Config.imageExpansion;
        for (name in ref) {
          conf = ref[name];
          subEntries.push(createSubEntry(name, conf[1]));
        }
        return Header.menu.addEntry({
          el: el,
          order: 105,
          subEntries: subEntries
        });
      },
      createSubEntry: function(name, desc) {
        var input, label;
        label = UI.checkbox(name, name);
        label.title = desc;
        input = label.firstElementChild;
        if (name === 'Fit width' || name === 'Fit height') {
          $.on(input, 'change', ImageExpand.cb.setFitness);
        }
        $.event('change', null, input);
        $.on(input, 'change', $.cb.checked);
        return {
          el: label
        };
      }
    }
  };

  return ImageExpand;

}).call(this);

ImageHost = (function() {
  var ImageHost;

  ImageHost = {
    init: function() {
      var ref;
      if (!((this.useFaster = Conf['Use Faster Image Host']) && ((ref = g.VIEW) === 'index' || ref === 'thread'))) {
        return;
      }
      return Callbacks.Post.push({
        name: 'Image Host Rewriting',
        cb: this.node
      });
    },
    host: function() {
      return 'i.4cdn.org';
    },
    flashHost: function() {
      return 'i.4cdn.org';
    },
    thumbHost: function() {
      return 'i.4cdn.org';
    },
    test: function(hostname) {
      return hostname === 'i.4cdn.org' || ImageHost.regex.test(hostname);
    },
    regex: /^is\d*\.4chan(?:nel)?\.org$/,
    node: function() {
      var host;
      if (this.isClone) {
        return;
      }
      host = ImageHost.host();
      if (this.file && ImageHost.regex.test(this.file.url.split('/')[2])) {
        this.file.link.hostname = host;
        if (this.file.thumbLink) {
          this.file.thumbLink.hostname = host;
        }
        this.file.url = this.file.link.href;
      }
      return ImageHost.fixLinks($$('a', this.nodes.comment));
    },
    fixLinks: function(links) {
      var i, len, link;
      for (i = 0, len = links.length; i < len; i++) {
        link = links[i];
        if (ImageHost.regex.test(link.hostname)) {
          link.hostname = ImageHost.host();
        }
      }
    }
  };

  return ImageHost;

}).call(this);

ImageHover = (function() {
  var ImageHover;

  ImageHover = {
    init: function() {
      var ref;
      if ((ref = g.VIEW) !== 'index' && ref !== 'thread') {
        return;
      }
      if (Conf['Image Hover']) {
        Callbacks.Post.push({
          name: 'Image Hover',
          cb: this.node
        });
      }
      if (Conf['Image Hover in Catalog']) {
        return Callbacks.CatalogThread.push({
          name: 'Image Hover',
          cb: this.catalogNode
        });
      }
    },
    node: function() {
      if (!(this.file && (this.file.isImage || this.file.isVideo) && this.file.thumb)) {
        return;
      }
      return $.on(this.file.thumb, 'mouseover', ImageHover.mouseover(this));
    },
    catalogNode: function() {
      var file;
      file = this.thread.OP.file;
      if (!(file && (file.isImage || file.isVideo))) {
        return;
      }
      return $.on(this.nodes.thumb, 'mouseover', ImageHover.mouseover(this.thread.OP));
    },
    mouseover: function(post) {
      return function(e) {
        var el, error, file, height, isVideo, left, maxHeight, maxWidth, ref, ref1, ref2, right, scale, width, x;
        if (!doc.contains(this)) {
          return;
        }
        file = post.file;
        isVideo = file.isVideo;
        if (file.isExpanding || file.isExpanded || (typeof Site.isThumbExpanded === "function" ? Site.isThumbExpanded(file) : void 0)) {
          return;
        }
        error = ImageHover.error(post);
        if (((ref = ImageCommon.cache) != null ? ref.dataset.fullID : void 0) === post.fullID) {
          el = ImageCommon.popCache();
          $.on(el, 'error', error);
        } else {
          el = $.el((isVideo ? 'video' : 'img'));
          el.dataset.fullID = post.fullID;
          $.on(el, 'error', error);
          el.src = file.url;
        }
        if (Conf['Restart when Opened']) {
          ImageCommon.rewind(el);
          ImageCommon.rewind(this);
        }
        el.id = 'ihover';
        $.add(Header.hover, el);
        if (isVideo) {
          el.loop = true;
          el.controls = false;
          Volume.setup(el);
          if (Conf['Autoplay']) {
            el.play();
            if (this.nodeName === 'VIDEO') {
              this.currentTime = el.currentTime;
            }
          }
        }
        ref1 = (function() {
          var i, len, ref1, results;
          ref1 = file.dimensions.split('x');
          results = [];
          for (i = 0, len = ref1.length; i < len; i++) {
            x = ref1[i];
            results.push(+x);
          }
          return results;
        })(), width = ref1[0], height = ref1[1];
        ref2 = this.getBoundingClientRect(), left = ref2.left, right = ref2.right;
        maxWidth = Math.max(left, doc.clientWidth - right);
        maxHeight = doc.clientHeight - UI.hover.padding;
        scale = Math.min(1, maxWidth / width, maxHeight / height);
        el.style.maxWidth = (scale * width) + "px";
        el.style.maxHeight = (scale * height) + "px";
        return UI.hover({
          root: this,
          el: el,
          latestEvent: e,
          endEvents: 'mouseout click',
          height: scale * height,
          noRemove: true,
          cb: function() {
            $.off(el, 'error', error);
            ImageCommon.pushCache(el);
            ImageCommon.pause(el);
            $.rm(el);
            return el.removeAttribute('style');
          }
        });
      };
    },
    error: function(post) {
      return function() {
        if (ImageCommon.decodeError(this, post)) {
          return;
        }
        return ImageCommon.error(this, post, 3 * $.SECOND, (function(_this) {
          return function(URL) {
            if (URL) {
              return _this.src = URL + (_this.src === URL ? '?' + Date.now() : '');
            } else {
              return $.rm(_this);
            }
          };
        })(this));
      };
    }
  };

  return ImageHover;

}).call(this);

ImageLoader = (function() {
  var ImageLoader,
    slice = [].slice;

  ImageLoader = {
    init: function() {
      var prefetch, ref, ref1;
      if ((ref = g.VIEW) !== 'index' && ref !== 'thread' && ref !== 'archive') {
        return;
      }
      if (!(Conf['Image Prefetching'] || Conf['Replace JPG'] || Conf['Replace PNG'] || Conf['Replace GIF'] || Conf['Replace WEBM'])) {
        return;
      }
      Callbacks.Post.push({
        name: 'Image Replace',
        cb: this.node
      });
      $.on(d, 'PostsInserted', function() {
        return g.posts.forEach(ImageLoader.prefetch);
      });
      if (Conf['Replace WEBM']) {
        $.on(d, 'scroll visibilitychange 4chanXInitFinished PostsInserted', this.playVideos);
      }
      if (!(Conf['Image Prefetching'] && ((ref1 = g.VIEW) === 'index' || ref1 === 'thread'))) {
        return;
      }
      prefetch = $.el('label', {
        innerHTML: "<input type=\"checkbox\" name=\"prefetch\"> Prefetch Images"
      });
      this.el = prefetch.firstElementChild;
      $.on(this.el, 'change', this.toggle);
      return Header.menu.addEntry({
        el: prefetch,
        order: 98
      });
    },
    node: function() {
      if (this.isClone || !this.file) {
        return;
      }
      if (Conf['Replace WEBM'] && this.file.isVideo) {
        ImageLoader.replaceVideo(this);
      }
      return ImageLoader.prefetch(this);
    },
    replaceVideo: function(post) {
      var attr, file, i, len, ref, thumb, video;
      file = post.file;
      thumb = file.thumb;
      video = $.el('video', {
        preload: 'none',
        loop: true,
        muted: true,
        poster: thumb.src || thumb.dataset.src,
        textContent: thumb.alt,
        className: thumb.className
      });
      video.setAttribute('muted', 'muted');
      video.dataset.md5 = thumb.dataset.md5;
      ref = ['height', 'width', 'maxHeight', 'maxWidth'];
      for (i = 0, len = ref.length; i < len; i++) {
        attr = ref[i];
        video.style[attr] = thumb.style[attr];
      }
      video.src = file.url;
      $.replace(thumb, video);
      file.thumb = video;
      return file.videoThumb = true;
    },
    prefetch: function(post) {
      var clone, el, file, i, isImage, isVideo, len, match, ref, replace, thumb, type, url;
      file = post.file;
      if (!file) {
        return;
      }
      isImage = file.isImage, isVideo = file.isVideo, thumb = file.thumb, url = file.url;
      if (file.isPrefetched || !(isImage || isVideo) || post.isHidden || post.thread.isHidden) {
        return;
      }
      type = (match = url.match(/\.([^.]+)$/)[1].toUpperCase()) === 'JPEG' ? 'JPG' : match;
      replace = Conf["Replace " + type] && !/spoiler/.test(thumb.src || thumb.dataset.src);
      if (!(replace || Conf['prefetch'])) {
        return;
      }
      if ($.hasClass(doc, 'catalog-mode')) {
        return;
      }
      if (![post].concat(slice.call(post.clones)).some(function(clone) {
        return doc.contains(clone.nodes.root);
      })) {
        return;
      }
      file.isPrefetched = true;
      if (file.videoThumb) {
        ref = post.clones;
        for (i = 0, len = ref.length; i < len; i++) {
          clone = ref[i];
          clone.file.thumb.preload = 'auto';
        }
        thumb.preload = 'auto';
        if ($.engine === 'gecko') {
          $.on(thumb, 'loadeddata', function() {
            return this.removeAttribute('poster');
          });
        }
        return;
      }
      el = $.el(isImage ? 'img' : 'video');
      if (replace && isImage) {
        $.on(el, 'load', function() {
          var j, len1, ref1;
          ref1 = post.clones;
          for (j = 0, len1 = ref1.length; j < len1; j++) {
            clone = ref1[j];
            clone.file.thumb.src = url;
          }
          return thumb.src = url;
        });
      }
      return el.src = url;
    },
    toggle: function() {
      if (Conf['prefetch'] = this.checked) {
        g.posts.forEach(ImageLoader.prefetch);
      }
    },
    playVideos: function() {
      var qpClone, ref;
      qpClone = (ref = $.id('qp')) != null ? ref.firstElementChild : void 0;
      return g.posts.forEach(function(post) {
        var i, len, ref1, ref2, thumb;
        ref1 = [post].concat(slice.call(post.clones));
        for (i = 0, len = ref1.length; i < len; i++) {
          post = ref1[i];
          if (!((ref2 = post.file) != null ? ref2.videoThumb : void 0)) {
            continue;
          }
          thumb = post.file.thumb;
          if (Header.isNodeVisible(thumb) || post.nodes.root === qpClone) {
            thumb.play();
          } else {
            thumb.pause();
          }
        }
      });
    }
  };

  return ImageLoader;

}).call(this);

Metadata = (function() {
  var Metadata;

  Metadata = {
    init: function() {
      var ref;
      if (!(Conf['WEBM Metadata'] && ((ref = g.VIEW) === 'index' || ref === 'thread'))) {
        return;
      }
      return Callbacks.Post.push({
        name: 'WEBM Metadata',
        cb: this.node
      });
    },
    node: function() {
      var el;
      if (!(this.file && /webm$/i.test(this.file.url))) {
        return;
      }
      if (this.isClone) {
        el = $('.webm-title', this.file.text);
      } else {
        el = $.el('span', {
          className: 'webm-title'
        });
        $.extend(el, {
          innerHTML: "<a href=\"javascript:;\"></a>"
        });
        $.add(this.file.text, [$.tn(' '), el]);
      }
      if (el.children.length === 1) {
        return $.one(el.lastElementChild, 'mouseover focus', Metadata.load);
      }
    },
    load: function() {
      $.rmClass(this.parentNode, 'error');
      $.addClass(this.parentNode, 'loading');
      return CrossOrigin.binary(Get.postFromNode(this).file.url, (function(_this) {
        return function(data) {
          var output, title;
          $.rmClass(_this.parentNode, 'loading');
          if (data != null) {
            title = Metadata.parse(data);
            output = $.el('span', {
              textContent: title || ''
            });
            if (title == null) {
              $.addClass(_this.parentNode, 'not-found');
            }
            $.before(_this, output);
            _this.parentNode.tabIndex = 0;
            if (d.activeElement === _this) {
              _this.parentNode.focus();
            }
            return _this.tabIndex = -1;
          } else {
            $.addClass(_this.parentNode, 'error');
            return $.one(_this, 'click', Metadata.load);
          }
        };
      })(this), {
        Range: 'bytes=0-9999'
      });
    },
    parse: function(data) {
      var element, i, readInt, size, title;
      readInt = function() {
        var len, n;
        n = data[i++];
        len = 0;
        while (n < (0x80 >> len)) {
          len++;
        }
        n ^= 0x80 >> len;
        while (len-- && i < data.length) {
          n = (n << 8) ^ data[i++];
        }
        return n;
      };
      i = 0;
      while (i < data.length) {
        element = readInt();
        size = readInt();
        if (element === 0x3BA9) {
          title = '';
          while (size-- && i < data.length) {
            title += String.fromCharCode(data[i++]);
          }
          return decodeURIComponent(escape(title));
        } else if (element !== 0x8538067 && element !== 0x549A966) {
          i += size;
        }
      }
      return null;
    }
  };

  return Metadata;

}).call(this);

RevealSpoilers = (function() {
  var RevealSpoilers;

  RevealSpoilers = {
    init: function() {
      var ref;
      if (!(((ref = g.VIEW) === 'index' || ref === 'thread' || ref === 'archive') && Conf['Reveal Spoiler Thumbnails'])) {
        return;
      }
      return Callbacks.Post.push({
        name: 'Reveal Spoiler Thumbnails',
        cb: this.node
      });
    },
    node: function() {
      var thumb;
      if (!(!this.isClone && this.file && this.file.thumb && this.file.isSpoiler)) {
        return;
      }
      thumb = this.file.thumb;
      thumb.removeAttribute('style');
      thumb.style.maxHeight = thumb.style.maxWidth = this.isReply ? '125px' : '250px';
      if (thumb.src) {
        return thumb.src = this.file.thumbURL;
      } else {
        return thumb.dataset.src = this.file.thumbURL;
      }
    }
  };

  return RevealSpoilers;

}).call(this);

Sauce = (function() {
  var Sauce,
    indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  Sauce = {
    init: function() {
      var j, len, link, linkData, links, ref, ref1;
      if (!(((ref = g.VIEW) === 'index' || ref === 'thread') && Conf['Sauce'])) {
        return;
      }
      links = [];
      ref1 = Conf['sauces'].split('\n');
      for (j = 0, len = ref1.length; j < len; j++) {
        link = ref1[j];
        if (link[0] !== '#' && (linkData = this.parseLink(link))) {
          links.push(linkData);
        }
      }
      if (!links.length) {
        return;
      }
      this.links = links;
      this.link = $.el('a', {
        target: '_blank',
        className: 'sauce'
      });
      return Callbacks.Post.push({
        name: 'Sauce',
        cb: this.node
      });
    },
    parseLink: function(link) {
      var err, i, j, len, m, part, parts, ref, ref1, regexp;
      if (!(link = link.trim())) {
        return null;
      }
      parts = {};
      ref = link.split(/;(?=(?:text|boards|types|regexp|sandbox):?)/);
      for (i = j = 0, len = ref.length; j < len; i = ++j) {
        part = ref[i];
        if (i === 0) {
          parts['url'] = part;
        } else {
          m = part.match(/^(\w*):?(.*)$/);
          parts[m[1]] = m[2];
        }
      }
      parts['text'] || (parts['text'] = ((ref1 = parts['url'].match(/(\w+)\.\w+\//)) != null ? ref1[1] : void 0) || '?');
      if ('regexp' in parts) {
        try {
          if ((regexp = parts['regexp'].match(/^\/(.*)\/(\w*)$/))) {
            parts['regexp'] = RegExp(regexp[1], regexp[2]);
          } else {
            parts['regexp'] = RegExp(parts['regexp']);
          }
        } catch (_error) {
          err = _error;
          new Notice('warning', [$.tn("Invalid regexp for Sauce link:"), $.el('br'), $.tn(link), $.el('br'), $.tn(err.message)], 60);
          return null;
        }
      }
      return parts;
    },
    createSauceLink: function(link, post) {
      var a, ext, j, key, len, matches, missing, parts, ref, ref1;
      ext = post.file.url.match(/[^.]*$/)[0];
      parts = {};
      $.extend(parts, link);
      if (!(!parts['boards'] || (ref = post.board.ID, indexOf.call(parts['boards'].split(','), ref) >= 0))) {
        return null;
      }
      if (!(!parts['types'] || indexOf.call(parts['types'].split(','), ext) >= 0)) {
        return null;
      }
      if (!(!parts['regexp'] || (matches = post.file.name.match(parts['regexp'])))) {
        return null;
      }
      missing = [];
      ref1 = ['url', 'text'];
      for (j = 0, len = ref1.length; j < len; j++) {
        key = ref1[j];
        parts[key] = parts[key].replace(/%(T?URL|IMG|[sh]?MD5|board|name|%|semi|\$\d+)/g, function(orig, parameter) {
          var type;
          if (parameter[0] === '$') {
            if (!matches) {
              return orig;
            }
            type = matches[parameter.slice(1)];
          } else {
            type = Sauce.formatters[parameter](post, ext);
            if (type == null) {
              missing.push(parameter);
              return '';
            }
          }
          if (key === 'url' && (parameter !== '%' && parameter !== 'semi')) {
            if (/^javascript:/i.test(parts['url'])) {
              type = JSON.stringify(type);
            }
            type = encodeURIComponent(type);
          }
          return type;
        });
      }
      if (post.board.ID === 'f' && missing.length && !missing.filter(function(x) {
        return !/^.?MD5$/.test(x);
      }).length) {
        a = Sauce.link.cloneNode(false);
        a.dataset.skip = '1';
        return a;
      }
      if (missing.length) {
        return null;
      }
      a = Sauce.link.cloneNode(false);
      a.href = parts['url'];
      a.textContent = parts['text'];
      if (/^javascript:/i.test(parts['url'])) {
        a.removeAttribute('target');
      }
      return a;
    },
    node: function() {
      var j, len, link, node, nodes, observer, ref, skipped;
      if (this.isClone || !this.file) {
        return;
      }
      nodes = [];
      skipped = [];
      ref = Sauce.links;
      for (j = 0, len = ref.length; j < len; j++) {
        link = ref[j];
        if ((node = Sauce.createSauceLink(link, this))) {
          nodes.push($.tn(' '), node);
          if (node.dataset.skip) {
            skipped.push([link, node]);
          }
        }
      }
      $.add(this.file.text, nodes);
      if (skipped.length) {
        observer = new MutationObserver((function(_this) {
          return function() {
            var k, len1, node2, ref1;
            if (_this.file.text.dataset.md5) {
              for (k = 0, len1 = skipped.length; k < len1; k++) {
                ref1 = skipped[k], link = ref1[0], node = ref1[1];
                if ((node2 = Sauce.createSauceLink(link, _this))) {
                  $.replace(node, node2);
                }
              }
              return observer.disconnect();
            }
          };
        })(this));
        return observer.observe(this.file.text, {
          attributes: true
        });
      }
    },
    formatters: {
      TURL: function(post) {
        return post.file.thumbURL;
      },
      URL: function(post) {
        return post.file.url;
      },
      IMG: function(post, ext) {
        if (ext === 'gif' || ext === 'jpg' || ext === 'png') {
          return post.file.url;
        } else {
          return post.file.thumbURL;
        }
      },
      MD5: function(post) {
        return post.file.MD5;
      },
      sMD5: function(post) {
        var ref;
        return (ref = post.file.MD5) != null ? ref.replace(/[+\/=]/g, function(c) {
          return {
            '+': '-',
            '/': '_',
            '=': ''
          }[c];
        }) : void 0;
      },
      hMD5: function(post) {
        var c;
        if (post.file.MD5) {
          return ((function() {
            var j, len, ref, results;
            ref = atob(post.file.MD5);
            results = [];
            for (j = 0, len = ref.length; j < len; j++) {
              c = ref[j];
              results.push(("0" + (c.charCodeAt(0).toString(16))).slice(-2));
            }
            return results;
          })()).join('');
        }
      },
      board: function(post) {
        return post.board.ID;
      },
      name: function(post) {
        return post.file.name;
      },
      '%': function() {
        return '%';
      },
      semi: function() {
        return ';';
      }
    }
  };

  return Sauce;

}).call(this);

Volume = (function() {
  var Volume;

  Volume = {
    init: function() {
      var ref, unmuteEntry, volumeEntry;
      if (!(((ref = g.VIEW) === 'index' || ref === 'thread') && (Conf['Image Expansion'] || Conf['Image Hover'] || Conf['Image Hover in Catalog'] || Conf['Gallery']))) {
        return;
      }
      $.sync('Allow Sound', function(x) {
        var ref1;
        Conf['Allow Sound'] = x;
        return (ref1 = Volume.inputs) != null ? ref1.unmute.checked = x : void 0;
      });
      $.sync('Default Volume', function(x) {
        var ref1;
        Conf['Default Volume'] = x;
        return (ref1 = Volume.inputs) != null ? ref1.volume.value = x : void 0;
      });
      if (Conf['Mouse Wheel Volume']) {
        Callbacks.Post.push({
          name: 'Mouse Wheel Volume',
          cb: this.node
        });
      }
      if (BoardConfig.noAudio(g.BOARD.ID)) {
        return;
      }
      if (Conf['Mouse Wheel Volume']) {
        Callbacks.CatalogThread.push({
          name: 'Mouse Wheel Volume',
          cb: this.catalogNode
        });
      }
      unmuteEntry = UI.checkbox('Allow Sound', 'Allow Sound');
      unmuteEntry.title = Config.main['Images and Videos']['Allow Sound'][1];
      volumeEntry = $.el('label', {
        title: 'Default volume for videos.'
      });
      $.extend(volumeEntry, {
        innerHTML: "<input name=\"Default Volume\" type=\"range\" min=\"0\" max=\"1\" step=\"0.01\" value=\"" + E(Conf["Default Volume"]) + "\"> Volume"
      });
      this.inputs = {
        unmute: unmuteEntry.firstElementChild,
        volume: volumeEntry.firstElementChild
      };
      $.on(this.inputs.unmute, 'change', $.cb.checked);
      $.on(this.inputs.volume, 'change', $.cb.value);
      Header.menu.addEntry({
        el: unmuteEntry,
        order: 200
      });
      return Header.menu.addEntry({
        el: volumeEntry,
        order: 201
      });
    },
    setup: function(video) {
      video.muted = !Conf['Allow Sound'];
      video.volume = Conf['Default Volume'];
      return $.on(video, 'volumechange', Volume.change);
    },
    change: function() {
      var items, key, muted, val, volume;
      muted = this.muted, volume = this.volume;
      items = {
        'Allow Sound': !muted,
        'Default Volume': volume
      };
      for (key in items) {
        val = items[key];
        if (Conf[key] === val) {
          delete items[key];
        }
      }
      $.set(items);
      $.extend(Conf, items);
      if (Volume.inputs) {
        Volume.inputs.unmute.checked = !muted;
        return Volume.inputs.volume.value = volume;
      }
    },
    node: function() {
      var ref;
      if (!(!BoardConfig.noAudio(this.board.ID) && ((ref = this.file) != null ? ref.isVideo : void 0))) {
        return;
      }
      if (this.file.thumb) {
        $.on(this.file.thumb, 'wheel', Volume.wheel.bind(Header.hover));
      }
      return $.on($('.file-info', this.file.text) || this.file.link, 'wheel', Volume.wheel.bind(this.file.thumbLink));
    },
    catalogNode: function() {
      var file;
      file = this.thread.OP.file;
      if (!(file != null ? file.isVideo : void 0)) {
        return;
      }
      return $.on(this.nodes.thumb, 'wheel', Volume.wheel.bind(Header.hover));
    },
    wheel: function(e) {
      var el, volume;
      if (e.shiftKey || e.altKey || e.ctrlKey || e.metaKey) {
        return;
      }
      if (!(el = $('video:not([data-md5])', this))) {
        return;
      }
      if (el.muted || !$.hasAudio(el)) {
        return;
      }
      volume = el.volume + 0.1;
      if (e.deltaY < 0) {
        volume *= 1.1;
      }
      if (e.deltaY > 0) {
        volume /= 1.1;
      }
      el.volume = $.minmax(volume - 0.1, 0, 1);
      return e.preventDefault();
    }
  };

  return Volume;

}).call(this);

Embedding = (function() {
  var Embedding,
    slice = [].slice;

  Embedding = {
    init: function() {
      var j, len, ref, ref1, type;
      if (!(((ref = g.VIEW) === 'index' || ref === 'thread' || ref === 'archive') && Conf['Linkify'] && (Conf['Embedding'] || Conf['Link Title'] || Conf['Cover Preview']))) {
        return;
      }
      this.types = {};
      ref1 = this.ordered_types;
      for (j = 0, len = ref1.length; j < len; j++) {
        type = ref1[j];
        this.types[type.key] = type;
      }
      if (Conf['Embedding'] && g.VIEW !== 'archive') {
        this.dialog = UI.dialog('embedding', {
          innerHTML: "<div><div class=\"move\"></div><a href=\"javascript:;\" class=\"jump\" title=\"Jump to post\">→</a><a href=\"javascript:;\" class=\"close\" title=\"Close\">×</a></div><div id=\"media-embed\"><div></div></div>"
        });
        this.media = $('#media-embed', this.dialog);
        $.one(d, '4chanXInitFinished', this.ready);
        $.on(d, 'IndexRefreshInternal', function() {
          return g.posts.forEach(function(post) {
            var embed, k, l, len1, len2, ref2, ref3;
            ref2 = [post].concat(slice.call(post.clones));
            for (k = 0, len1 = ref2.length; k < len1; k++) {
              post = ref2[k];
              ref3 = post.nodes.embedlinks;
              for (l = 0, len2 = ref3.length; l < len2; l++) {
                embed = ref3[l];
                Embedding.cb.catalogRemove.call(embed);
              }
            }
          });
        });
      }
      if (Conf['Link Title']) {
        return $.on(d, '4chanXInitFinished PostsInserted', function() {
          var key, ref2, ref3, service;
          ref2 = Embedding.types;
          for (key in ref2) {
            service = ref2[key];
            if ((ref3 = service.title) != null ? ref3.batchSize : void 0) {
              Embedding.flushTitles(service.title);
            }
          }
        });
      }
    },
    events: function(post) {
      var data, el, i, items;
      if (g.VIEW === 'archive') {
        return;
      }
      if (Conf['Embedding']) {
        i = 0;
        items = post.nodes.embedlinks = $$('.embedder', post.nodes.comment);
        while (el = items[i++]) {
          $.on(el, 'click', Embedding.cb.click);
          if ($.hasClass(el, 'embedded')) {
            Embedding.cb.toggle.call(el);
          }
        }
      }
      if (Conf['Cover Preview']) {
        i = 0;
        items = $$('.linkify', post.nodes.comment);
        while (el = items[i++]) {
          if ((data = Embedding.services(el))) {
            Embedding.preview(data);
          }
        }
      }
    },
    process: function(link, post) {
      var data;
      if (!(Conf['Embedding'] || Conf['Link Title'] || Conf['Cover Preview'])) {
        return;
      }
      if ($.x('ancestor::pre', link)) {
        return;
      }
      if (data = Embedding.services(link)) {
        data.post = post;
        if (Conf['Embedding'] && g.VIEW !== 'archive') {
          Embedding.embed(data);
        }
        if (Conf['Link Title']) {
          Embedding.title(data);
        }
        if (Conf['Cover Preview'] && g.VIEW !== 'archive') {
          return Embedding.preview(data);
        }
      }
    },
    services: function(link) {
      var href, j, len, match, ref, type;
      href = link.href;
      ref = Embedding.ordered_types;
      for (j = 0, len = ref.length; j < len; j++) {
        type = ref[j];
        if ((match = type.regExp.exec(href))) {
          return {
            key: type.key,
            uid: match[1],
            options: match[2],
            link: link
          };
        }
      }
    },
    embed: function(data) {
      var embed, href, key, link, name, options, post, ref, uid, value;
      key = data.key, uid = data.uid, options = data.options, link = data.link, post = data.post;
      href = link.href;
      $.addClass(link, key.toLowerCase());
      embed = $.el('a', {
        className: 'embedder',
        href: 'javascript:;'
      }, {
        innerHTML: "(<span>un</span>embed)"
      });
      ref = {
        key: key,
        uid: uid,
        options: options,
        href: href
      };
      for (name in ref) {
        value = ref[name];
        embed.dataset[name] = value;
      }
      $.on(embed, 'click', Embedding.cb.click);
      $.after(link, [$.tn(' '), embed]);
      post.nodes.embedlinks.push(embed);
      if (Conf['Auto-embed'] && !Conf['Floating Embeds'] && !post.isFetchedQuote) {
        if ($.hasClass(doc, 'catalog-mode')) {
          return $.addClass(embed, 'embed-removed');
        } else {
          return Embedding.cb.toggle.call(embed);
        }
      }
    },
    ready: function() {
      if (!Main.isThisPageLegit()) {
        return;
      }
      $.addClass(Embedding.dialog, 'empty');
      $.on($('.close', Embedding.dialog), 'click', Embedding.closeFloat);
      $.on($('.move', Embedding.dialog), 'mousedown', Embedding.dragEmbed);
      $.on($('.jump', Embedding.dialog), 'click', function() {
        if (doc.contains(Embedding.lastEmbed)) {
          return Header.scrollTo(Embedding.lastEmbed);
        }
      });
      return $.add(d.body, Embedding.dialog);
    },
    closeFloat: function() {
      delete Embedding.lastEmbed;
      $.addClass(Embedding.dialog, 'empty');
      return $.replace(Embedding.media.firstChild, $.el('div'));
    },
    dragEmbed: function() {
      var style;
      style = Embedding.media.style;
      if (Embedding.dragEmbed.mouseup) {
        $.off(d, 'mouseup', Embedding.dragEmbed);
        Embedding.dragEmbed.mouseup = false;
        style.pointerEvents = '';
        return;
      }
      $.on(d, 'mouseup', Embedding.dragEmbed);
      Embedding.dragEmbed.mouseup = true;
      return style.pointerEvents = 'none';
    },
    title: function(data) {
      var key, link, options, post, service, uid;
      key = data.key, uid = data.uid, options = data.options, link = data.link, post = data.post;
      if (!(service = Embedding.types[key].title)) {
        return;
      }
      $.addClass(link, key.toLowerCase());
      if (service.batchSize) {
        (service.queue || (service.queue = [])).push(data);
        if (service.queue.length >= service.batchSize) {
          return Embedding.flushTitles(service);
        }
      } else {
        return CrossOrigin.json(service.api(uid), (function() {
          return Embedding.cb.title(this, data);
        }));
      }
    },
    flushTitles: function(service) {
      var cb, data, queue;
      queue = service.queue;
      if (!(queue != null ? queue.length : void 0)) {
        return;
      }
      service.queue = [];
      cb = function() {
        var data, j, len;
        for (j = 0, len = queue.length; j < len; j++) {
          data = queue[j];
          Embedding.cb.title(this, data);
        }
      };
      return CrossOrigin.json(service.api((function() {
        var j, len, results;
        results = [];
        for (j = 0, len = queue.length; j < len; j++) {
          data = queue[j];
          results.push(data.uid);
        }
        return results;
      })()), cb);
    },
    preview: function(data) {
      var key, link, service, uid;
      key = data.key, uid = data.uid, link = data.link;
      if (!(service = Embedding.types[key].preview)) {
        return;
      }
      return $.on(link, 'mouseover', function(e) {
        var el, height, src;
        src = service.url(uid);
        height = service.height;
        el = $.el('img', {
          src: src,
          id: 'ihover'
        });
        $.add(d.body, el);
        return UI.hover({
          root: link,
          el: el,
          latestEvent: e,
          endEvents: 'mouseout click',
          height: height
        });
      });
    },
    cb: {
      click: function(e) {
        var div;
        e.preventDefault();
        if (!$.hasClass(this, 'embedded') && (Conf['Floating Embeds'] || $.hasClass(doc, 'catalog-mode'))) {
          if (!(div = Embedding.media.firstChild)) {
            return;
          }
          $.replace(div, Embedding.cb.embed(this));
          Embedding.lastEmbed = Get.postFromNode(this).nodes.root;
          return $.rmClass(Embedding.dialog, 'empty');
        } else {
          return Embedding.cb.toggle.call(this);
        }
      },
      toggle: function() {
        if ($.hasClass(this, "embedded")) {
          $.rm(this.nextElementSibling);
        } else {
          $.after(this, Embedding.cb.embed(this));
        }
        return $.toggleClass(this, 'embedded');
      },
      embed: function(a) {
        var container, el, type;
        container = $.el('div', {
          className: 'media-embed'
        });
        $.add(container, el = (type = Embedding.types[a.dataset.key]).el(a));
        el.style.cssText = type.style != null ? type.style : 'border: none; width: 640px; height: 360px;';
        return container;
      },
      catalogRemove: function() {
        var isCatalog;
        isCatalog = $.hasClass(doc, 'catalog-mode');
        if ((isCatalog && $.hasClass(this, 'embedded')) || (!isCatalog && $.hasClass(this, 'embed-removed'))) {
          Embedding.cb.toggle.call(this);
          return $.toggleClass(this, 'embed-removed');
        }
      },
      title: function(req, data) {
        var base1, j, k, key, len, len1, link, link2, options, post, post2, ref, ref1, service, status, text, uid;
        if (!req.status) {
          return;
        }
        key = data.key, uid = data.uid, options = data.options, link = data.link, post = data.post;
        status = req.status;
        service = Embedding.types[key].title;
        text = "[" + key + "] " + ((function() {
          switch (status) {
            case 200:
            case 304:
              return service.text(req.response, uid);
            case 404:
              return "Not Found";
            case 403:
              return "Forbidden or Private";
            default:
              return status + "'d";
          }
        })());
        link.dataset.original = link.textContent;
        link.textContent = text;
        ref = post.clones;
        for (j = 0, len = ref.length; j < len; j++) {
          post2 = ref[j];
          ref1 = $$('a.linkify', post2.nodes.comment);
          for (k = 0, len1 = ref1.length; k < len1; k++) {
            link2 = ref1[k];
            if (!(link2.href === link.href)) {
              continue;
            }
            if ((base1 = link2.dataset).original == null) {
              base1.original = link2.textContent;
            }
            link2.textContent = text;
          }
        }
      }
    },
    ordered_types: [
      {
        key: 'audio',
        regExp: /^[^?#]+\.(?:mp3|oga|wav)(?:[?#]|$)/i,
        style: '',
        el: function(a) {
          return $.el('audio', {
            controls: true,
            preload: 'auto',
            src: a.dataset.href
          });
        }
      }, {
        key: 'image',
        regExp: /^[^?#]+\.(?:gif|png|jpg|jpeg|bmp)(?::\w+)?(?:[?#]|$)/i,
        style: '',
        el: function(a) {
          return $.el('div', {
            innerHTML: "<a target=\"_blank\" href=\"" + E(a.dataset.href) + "\"><img src=\"" + E(a.dataset.href) + "\" style=\"max-width: 80vw; max-height: 80vh;\"></a>"
          });
        }
      }, {
        key: 'video',
        regExp: /^[^?#]+\.(?:og[gv]|webm|mp4)(?:[?#]|$)/i,
        style: 'max-width: 80vw; max-height: 80vh;',
        el: function(a) {
          var el;
          el = $.el('video', {
            hidden: true,
            controls: true,
            preload: 'auto',
            src: a.dataset.href,
            loop: ImageHost.test(a.dataset.href.split('/')[2])
          });
          $.on(el, 'loadedmetadata', function() {
            if (el.videoHeight === 0 && el.parentNode) {
              return $.replace(el, Embedding.types.audio.el(a));
            } else {
              return el.hidden = false;
            }
          });
          return el;
        }
      }, {
        key: 'Clyp',
        regExp: /^\w+:\/\/(?:www\.)?clyp\.it\/(\w{8})/,
        style: 'border: 0; width: 640px; height: 160px;',
        el: function(a) {
          return $.el('iframe', {
            src: "https://clyp.it/" + a.dataset.uid + "/widget"
          });
        },
        title: {
          api: function(uid) {
            return "https://api.clyp.it/" + uid;
          },
          text: function(_) {
            return _.Title;
          }
        }
      }, {
        key: 'Dailymotion',
        regExp: /^\w+:\/\/(?:(?:www\.)?dailymotion\.com\/(?:embed\/)?video|dai\.ly)\/([A-Za-z0-9]+)[^?]*(.*)/,
        el: function(a) {
          var el, options, start;
          options = (start = a.dataset.options.match(/[?&](start=\d+)/)) ? "?" + start[1] : '';
          el = $.el('iframe', {
            src: "//www.dailymotion.com/embed/video/" + a.dataset.uid + options
          });
          el.setAttribute("allowfullscreen", "true");
          return el;
        },
        title: {
          api: function(uid) {
            return "https://api.dailymotion.com/video/" + uid;
          },
          text: function(_) {
            return _.title;
          }
        },
        preview: {
          url: function(uid) {
            return "https://www.dailymotion.com/thumbnail/video/" + uid;
          },
          height: 240
        }
      }, {
        key: 'Gfycat',
        regExp: /^\w+:\/\/(?:www\.)?gfycat\.com\/(?:iframe\/)?(\w+)/,
        el: function(a) {
          var div;
          return div = $.el('iframe', {
            src: "//gfycat.com/iframe/" + a.dataset.uid
          });
        }
      }, {
        key: 'Gist',
        regExp: /^\w+:\/\/gist\.github\.com\/[\w\-]+\/(\w+)/,
        style: '',
        el: (function() {
          var counter;
          counter = 0;
          return function(a) {
            var el;
            el = $.el('pre', {
              hidden: true,
              id: "gist-embed-" + (counter++)
            });
            CrossOrigin.json("https://api.github.com/gists/" + a.dataset.uid, function() {
              el.textContent = Object.values(this.response.files)[0].content;
              el.className = 'prettyprint';
              $.global(function() {
                return typeof window.prettyPrint === "function" ? window.prettyPrint((function() {}), document.getElementById(document.currentScript.dataset.id).parentNode) : void 0;
              }, {
                id: el.id
              });
              return el.hidden = false;
            });
            return el;
          };
        })(),
        title: {
          api: function(uid) {
            return "https://api.github.com/gists/" + uid;
          },
          text: function(arg) {
            var file, files;
            files = arg.files;
            for (file in files) {
              if (files.hasOwnProperty(file)) {
                return file;
              }
            }
          }
        }
      }, {
        key: 'InstallGentoo',
        regExp: /^\w+:\/\/paste\.installgentoo\.com\/view\/(?:raw\/|download\/|embed\/)?(\w+)/,
        el: function(a) {
          return $.el('iframe', {
            src: "https://paste.installgentoo.com/view/embed/" + a.dataset.uid
          });
        }
      }, {
        key: 'LiveLeak',
        regExp: /^\w+:\/\/(?:\w+\.)?liveleak\.com\/.*\?.*i=(\w+)/,
        el: function(a) {
          var el;
          el = $.el('iframe', {
            src: "https://www.liveleak.com/ll_embed?i=" + a.dataset.uid
          });
          el.setAttribute("allowfullscreen", "true");
          return el;
        }
      }, {
        key: 'Loopvid',
        regExp: /^\w+:\/\/(?:www\.)?loopvid.appspot.com\/#?((?:pf|kd|lv|gd|gh|db|dx|nn|cp|wu|ig|ky|mf|m2|pc|1c|pi|ni|wl|ko|gc)\/[\w\-\/]+(?:,[\w\-\/]+)*|fc\/\w+\/\d+|https?:\/\/.+)/,
        style: 'max-width: 80vw; max-height: 80vh;',
        el: function(a) {
          var _, base, el, host, j, k, l, len, len1, len2, name, names, ref, ref1, type, types, url, urls;
          el = $.el('video', {
            controls: true,
            preload: 'auto',
            loop: true
          });
          if (/^http/.test(a.dataset.uid)) {
            $.add(el, $.el('source', {
              src: a.dataset.uid
            }));
            return el;
          }
          ref = a.dataset.uid.match(/(\w+)\/(.*)/), _ = ref[0], host = ref[1], names = ref[2];
          types = (function() {
            switch (host) {
              case 'gd':
              case 'wu':
              case 'fc':
                return [''];
              case 'gc':
                return ['giant', 'fat', 'zippy'];
              default:
                return ['.webm', '.mp4'];
            }
          })();
          ref1 = names.split(',');
          for (j = 0, len = ref1.length; j < len; j++) {
            name = ref1[j];
            for (k = 0, len1 = types.length; k < len1; k++) {
              type = types[k];
              base = "" + name + type;
              urls = (function() {
                switch (host) {
                  case 'pf':
                    return ["https://kastden.org/_loopvid_media/pf/" + base, "https://web.archive.org/web/2/http://a.pomf.se/" + base];
                  case 'kd':
                    return ["https://kastden.org/loopvid/" + base];
                  case 'lv':
                    return ["https://lv.kastden.org/" + base];
                  case 'gd':
                    return ["https://docs.google.com/uc?export=download&id=" + base];
                  case 'gh':
                    return ["https://googledrive.com/host/" + base];
                  case 'db':
                    return ["https://dl.dropboxusercontent.com/u/" + base];
                  case 'dx':
                    return ["https://dl.dropboxusercontent.com/" + base];
                  case 'nn':
                    return ["https://kastden.org/_loopvid_media/nn/" + base];
                  case 'cp':
                    return ["https://copy.com/" + base];
                  case 'wu':
                    return ["http://webmup.com/" + base + "/vid.webm"];
                  case 'ig':
                    return ["https://i.imgur.com/" + base];
                  case 'ky':
                    return ["https://kastden.org/_loopvid_media/ky/" + base];
                  case 'mf':
                    return ["https://kastden.org/_loopvid_media/mf/" + base, "https://web.archive.org/web/2/https://d.maxfile.ro/" + base];
                  case 'm2':
                    return ["https://kastden.org/_loopvid_media/m2/" + base];
                  case 'pc':
                    return ["http://a.pomf.cat/" + base];
                  case '1c':
                    return ["http://b.1339.cf/" + base];
                  case 'pi':
                    return ["https://u.pomf.is/" + base];
                  case 'ni':
                    return ["https://u.nya.is/" + base];
                  case 'wl':
                    return ["http://webm.land/media/" + base];
                  case 'ko':
                    return ["https://kordy.kastden.org/loopvid/" + base];
                  case 'fc':
                    return ["//" + (ImageHost.host()) + "/" + base + ".webm"];
                  case 'gc':
                    return ["https://" + type + ".gfycat.com/" + name + ".webm"];
                }
              })();
              for (l = 0, len2 = urls.length; l < len2; l++) {
                url = urls[l];
                $.add(el, $.el('source', {
                  src: url
                }));
              }
            }
          }
          return el;
        }
      }, {
        key: 'Openings.moe',
        regExp: /^\w+:\/\/openings.moe\/\?video=([^.&=]+)/,
        style: 'max-width: 80vw; max-height: 80vh;',
        el: function(a) {
          return $.el('video', {
            controls: true,
            preload: 'auto',
            src: "//openings.moe/video/" + a.dataset.uid + ".webm",
            loop: true
          });
        }
      }, {
        key: 'Pastebin',
        regExp: /^\w+:\/\/(?:\w+\.)?pastebin\.com\/(?!u\/)(?:[\w.]+(?:\/|\?i\=))?(\w+)/,
        el: function(a) {
          var div;
          return div = $.el('iframe', {
            src: "//pastebin.com/embed_iframe.php?i=" + a.dataset.uid
          });
        }
      }, {
        key: 'SoundCloud',
        regExp: /^\w+:\/\/(?:www\.)?(?:soundcloud\.com\/|snd\.sc\/)([\w\-\/]+)/,
        style: 'border: 0; width: 500px; height: 400px;',
        el: function(a) {
          return $.el('iframe', {
            src: "https://w.soundcloud.com/player/?visual=true&show_comments=false&url=https%3A%2F%2Fsoundcloud.com%2F" + (encodeURIComponent(a.dataset.uid))
          });
        },
        title: {
          api: function(uid) {
            return location.protocol + "//soundcloud.com/oembed?format=json&url=https%3A%2F%2Fsoundcloud.com%2F" + (encodeURIComponent(uid));
          },
          text: function(_) {
            return _.title;
          }
        }
      }, {
        key: 'StrawPoll',
        regExp: /^\w+:\/\/(?:www\.)?strawpoll\.me\/(?:embed_\d+\/)?(\d+(?:\/r)?)/,
        style: 'border: 0; width: 600px; height: 406px;',
        el: function(a) {
          return $.el('iframe', {
            src: "https://www.strawpoll.me/embed_1/" + a.dataset.uid
          });
        }
      }, {
        key: 'TwitchTV',
        regExp: /^\w+:\/\/(?:www\.|secure\.)?twitch\.tv\/(\w[^#\&\?]*)/,
        el: function(a) {
          var el, m, time, url;
          m = a.dataset.uid.match(/(\w+)(?:\/v\/(\d+))?/);
          url = "//player.twitch.tv/?" + (m[2] ? "video=v" + m[2] : "channel=" + m[1]) + "&autoplay=false";
          if ((time = a.dataset.href.match(/\bt=(\w+)/))) {
            url += "&time=" + time[1];
          }
          el = $.el('iframe', {
            src: url
          });
          el.setAttribute("allowfullscreen", "true");
          return el;
        }
      }, {
        key: 'Twitter',
        regExp: /^\w+:\/\/(?:www\.|mobile\.)?twitter\.com\/(\w+\/status\/\d+)/,
        style: 'border: none; width: 550px; height: 250px; overflow: hidden; resize: both;',
        el: function(a) {
          var cont, el, onMessage;
          el = $.el('iframe');
          $.on(el, 'load', function() {
            return this.contentWindow.postMessage({
              element: 't',
              query: 'height'
            }, 'https://twitframe.com');
          });
          onMessage = function(e) {
            if (e.source === el.contentWindow && e.origin === 'https://twitframe.com') {
              $.off(window, 'message', onMessage);
              return (cont || el).style.height = (+$.minmax(e.data.height, 250, 0.8 * doc.clientHeight)) + "px";
            }
          };
          $.on(window, 'message', onMessage);
          el.src = "https://twitframe.com/show?url=https://twitter.com/" + a.dataset.uid;
          if ($.engine === 'gecko') {
            el.style.cssText = 'border: none; width: 100%; height: 100%;';
            cont = $.el('div');
            $.add(cont, el);
            return cont;
          } else {
            return el;
          }
        }
      }, {
        key: 'VidLii',
        regExp: /^\w+:\/\/(?:www\.)?vidlii\.com\/watch\?v=(\w{11})/,
        style: 'border: none; width: 640px; height: 392px;',
        el: function(a) {
          var el;
          el = $.el('iframe', {
            src: "https://www.vidlii.com/embed?v=" + a.dataset.uid + "&a=0"
          });
          el.setAttribute("allowfullscreen", "true");
          return el;
        }
      }, {
        key: 'Vimeo',
        regExp: /^\w+:\/\/(?:www\.)?vimeo\.com\/(\d+)/,
        el: function(a) {
          var el;
          el = $.el('iframe', {
            src: "//player.vimeo.com/video/" + a.dataset.uid + "?wmode=opaque"
          });
          el.setAttribute("allowfullscreen", "true");
          return el;
        },
        title: {
          api: function(uid) {
            return "https://vimeo.com/api/oembed.json?url=https://vimeo.com/" + uid;
          },
          text: function(_) {
            return _.title;
          }
        }
      }, {
        key: 'Vine',
        regExp: /^\w+:\/\/(?:www\.)?vine\.co\/v\/(\w+)/,
        style: 'border: none; width: 500px; height: 500px;',
        el: function(a) {
          return $.el('iframe', {
            src: "https://vine.co/v/" + a.dataset.uid + "/card"
          });
        }
      }, {
        key: 'Vocaroo',
        regExp: /^\w+:\/\/(?:www\.)?vocaroo\.com\/i\/(\w+)/,
        style: '',
        el: function(a) {
          var el, type;
          el = $.el('audio', {
            controls: true,
            preload: 'auto'
          });
          type = el.canPlayType('audio/webm') ? 'webm' : 'mp3';
          el.src = "//vocaroo.com/media_command.php?media=" + a.dataset.uid + "&command=download_" + type;
          return el;
        }
      }, {
        key: 'YouTube',
        regExp: /^\w+:\/\/(?:youtu.be\/|[\w.]*youtube[\w.]*\/.*(?:v=|\bembed\/|\bv\/))([\w\-]{11})(.*)/,
        el: function(a) {
          var el, start;
          start = a.dataset.options.match(/\b(?:star)?t\=(\w+)/);
          if (start) {
            start = start[1];
          }
          if (start && !/^\d+$/.test(start)) {
            start += ' 0h0m0s';
            start = 3600 * start.match(/(\d+)h/)[1] + 60 * start.match(/(\d+)m/)[1] + 1 * start.match(/(\d+)s/)[1];
          }
          el = $.el('iframe', {
            src: "//www.youtube.com/embed/" + a.dataset.uid + "?rel=0&wmode=opaque" + (start ? '&start=' + start : '')
          });
          el.setAttribute("allowfullscreen", "true");
          return el;
        },
        title: {
          batchSize: 50,
          api: function(uids) {
            var ids, key;
            ids = encodeURIComponent(uids.join(','));
            key = 'AIzaSyB5_zaen_-46Uhz1xGR-lz1YoUMHqCD6CE';
            return "https://www.googleapis.com/youtube/v3/videos?part=snippet&id=" + ids + "&fields=items%28id%2Csnippet%28title%29%29&key=" + key;
          },
          text: function(data, uid) {
            var item, j, len, ref;
            ref = data.items;
            for (j = 0, len = ref.length; j < len; j++) {
              item = ref[j];
              if (item.id === uid) {
                return item.snippet.title;
              }
            }
            return 'Not Found';
          }
        },
        preview: {
          url: function(uid) {
            return "https://img.youtube.com/vi/" + uid + "/0.jpg";
          },
          height: 360
        }
      }
    ]
  };

  return Embedding;

}).call(this);

Linkify = (function() {
  var Linkify;

  Linkify = {
    init: function() {
      var ref;
      if (((ref = g.VIEW) !== 'index' && ref !== 'thread' && ref !== 'archive') || !Conf['Linkify']) {
        return;
      }
      if (Conf['Comment Expansion']) {
        ExpandComment.callbacks.push(this.node);
      }
      Callbacks.Post.push({
        name: 'Linkify',
        cb: this.node
      });
      return Embedding.init();
    },
    node: function() {
      var j, k, len, len1, link, links, ref;
      if (this.isClone) {
        return Embedding.events(this);
      }
      if (!Linkify.regString.test(this.info.comment)) {
        return;
      }
      ref = $$('a', this.nodes.comment);
      for (j = 0, len = ref.length; j < len; j++) {
        link = ref[j];
        if (!(ImageHost.test(link.hostname) || /\bnofollow\b/.test(link.rel))) {
          continue;
        }
        $.addClass(link, 'linkify');
        Embedding.process(link, this);
      }
      links = Linkify.process(this.nodes.comment);
      if (ImageHost.useFaster) {
        ImageHost.fixLinks(links);
      }
      for (k = 0, len1 = links.length; k < len1; k++) {
        link = links[k];
        Embedding.process(link, this);
      }
    },
    process: function(node) {
      var data, end, endNode, i, index, length, links, part1, part2, ref, ref1, result, saved, snapshot, space, test, word;
      test = /[^\s"]+/g;
      space = /[\s"]/;
      snapshot = $.X('.//br|.//text()', node);
      i = 0;
      links = [];
      while (node = snapshot.snapshotItem(i++)) {
        data = node.data;
        if (!data || node.parentElement.nodeName === "A") {
          continue;
        }
        while (result = test.exec(data)) {
          index = result.index;
          endNode = node;
          word = result[0];
          if ((length = index + word.length) === data.length) {
            test.lastIndex = 0;
            while ((saved = snapshot.snapshotItem(i++))) {
              if (saved.nodeName === 'BR') {
                if ((part1 = word.match(/(https?:\/\/)?([a-z\d-]+\.)*[a-z\d-]+$/i)) && (part2 = (ref = snapshot.snapshotItem(i)) != null ? (ref1 = ref.data) != null ? ref1.match(/^(\.[a-z\d-]+)*\//i) : void 0 : void 0) && (part1[0] + part2[0]).search(Linkify.regString) === 0) {
                  continue;
                } else {
                  break;
                }
              }
              if (saved.parentElement.nodeName === "A" && !Linkify.regString.test(word)) {
                break;
              }
              endNode = saved;
              data = saved.data;
              if (end = space.exec(data)) {
                word += data.slice(0, end.index);
                test.lastIndex = length = end.index;
                i--;
                break;
              } else {
                length = data.length;
                word += data;
              }
            }
          }
          if (Linkify.regString.test(word)) {
            links.push(Linkify.makeRange(node, endNode, index, length));
          }
          if (!(test.lastIndex && node === endNode)) {
            break;
          }
        }
      }
      i = links.length;
      while (i--) {
        links[i] = Linkify.makeLink(links[i]);
      }
      return links;
    },
    regString: /((https?|mailto|git|magnet|ftp|irc):([a-z\d%\/?])|([-a-z\d]+[.])+(aero|asia|biz|cat|com|coop|dance|info|int|jobs|mobi|moe|museum|name|net|org|post|pro|tel|travel|xxx|xyz|edu|gov|mil|[a-z]{2})([:\/]|(?![^\s"]))|[\d]{1,3}\.[\d]{1,3}\.[\d]{1,3}\.[\d]{1,3}|[-\w\d.@]+@[a-z\d.-]+\.[a-z\d])/i,
    makeRange: function(startNode, endNode, startOffset, endOffset) {
      var range;
      range = document.createRange();
      range.setStart(startNode, startOffset);
      range.setEnd(endNode, endOffset);
      return range;
    },
    makeLink: function(range) {
      var a, encodedDomain, i, t, text;
      text = range.toString();
      i = text.search(Linkify.regString);
      if (i > 0) {
        text = text.slice(i);
        while (range.startOffset + i >= range.startContainer.data.length) {
          i--;
        }
        if (i) {
          range.setStart(range.startContainer, range.startOffset + i);
        }
      }
      i = 0;
      while (/[)\]}>.,]/.test(t = text.charAt(text.length - (1 + i)))) {
        if (!(/[.,]/.test(t) || (text.match(/[()\[\]{}<>]/g)).length % 2)) {
          break;
        }
        i++;
      }
      if (i) {
        text = text.slice(0, -i);
        while (range.endOffset - i < 0) {
          i--;
        }
        if (i) {
          range.setEnd(range.endContainer, range.endOffset - i);
        }
      }
      if (!/((mailto|magnet):|.+:\/\/)/.test(text)) {
        text = (/@/.test(text) ? 'mailto:' : 'http://') + text;
      }
      if (encodedDomain = text.match(/^(https?:\/\/[^\/]*%[0-9a-f]{2})(.*)$/i)) {
        text = encodedDomain[1].replace(/%([0-9a-f]{2})/ig, function(x, y) {
          if (y === '25') {
            return x;
          } else {
            return String.fromCharCode(parseInt(y, 16));
          }
        }) + encodedDomain[2];
      }
      a = $.el('a', {
        className: 'linkify',
        rel: 'noreferrer noopener',
        target: '_blank',
        href: text
      });
      $.add(a, range.extractContents());
      range.insertNode(a);
      return a;
    }
  };

  return Linkify;

}).call(this);

ArchiveLink = (function() {
  var ArchiveLink;

  ArchiveLink = {
    init: function() {
      var div, entry, i, len, ref, ref1, type;
      if (!(((ref = g.VIEW) === 'index' || ref === 'thread') && Conf['Menu'] && Conf['Archive Link'])) {
        return;
      }
      div = $.el('div', {
        textContent: 'Archive'
      });
      entry = {
        el: div,
        order: 60,
        open: function(arg) {
          var ID, board, thread;
          ID = arg.ID, thread = arg.thread, board = arg.board;
          return !!Redirect.to('thread', {
            postID: ID,
            threadID: thread.ID,
            boardID: board.ID
          });
        },
        subEntries: []
      };
      ref1 = [['Post', 'post'], ['Name', 'name'], ['Tripcode', 'tripcode'], ['Capcode', 'capcode'], ['Subject', 'subject'], ['Flag', 'country'], ['Filename', 'filename'], ['Image MD5', 'MD5']];
      for (i = 0, len = ref1.length; i < len; i++) {
        type = ref1[i];
        entry.subEntries.push(this.createSubEntry(type[0], type[1]));
      }
      return Menu.menu.addEntry(entry);
    },
    createSubEntry: function(text, type) {
      var el, open;
      el = $.el('a', {
        textContent: text,
        target: '_blank'
      });
      open = type === 'post' ? function(arg) {
        var ID, board, thread;
        ID = arg.ID, thread = arg.thread, board = arg.board;
        el.href = Redirect.to('thread', {
          postID: ID,
          threadID: thread.ID,
          boardID: board.ID
        });
        return true;
      } : function(post) {
        var typeParam, value;
        typeParam = type === 'country' && post.info.flagCodeTroll ? 'tag' : type;
        value = type === 'country' ? post.info.flagCode || post.info.flagCodeTroll : Filter[type](post);
        if (!value) {
          return false;
        }
        el.href = Redirect.to('search', {
          boardID: post.board.ID,
          type: typeParam,
          value: value,
          isSearch: true
        });
        return true;
      };
      return {
        el: el,
        open: open
      };
    }
  };

  return ArchiveLink;

}).call(this);

CopyTextLink = (function() {
  var CopyTextLink;

  CopyTextLink = {
    init: function() {
      var a, ref;
      if (!(((ref = g.VIEW) === 'index' || ref === 'thread') && Conf['Menu'] && Conf['Copy Text Link'])) {
        return;
      }
      a = $.el('a', {
        className: 'copy-text-link',
        href: 'javascript:;',
        textContent: 'Copy Text'
      });
      $.on(a, 'click', CopyTextLink.copy);
      return Menu.menu.addEntry({
        el: a,
        order: 12,
        open: function(post) {
          CopyTextLink.text = (post.origin || post).commentOrig();
          return true;
        }
      });
    },
    copy: function() {
      var el;
      el = $.el('textarea', {
        className: 'copy-text-element',
        value: CopyTextLink.text
      });
      $.add(d.body, el);
      el.select();
      try {
        d.execCommand('copy');
      } catch (_error) {}
      return $.rm(el);
    }
  };

  return CopyTextLink;

}).call(this);

DeleteLink = (function() {
  var DeleteLink;

  DeleteLink = {
    auto: [{}, {}],
    init: function() {
      var div, fileEl, fileEntry, postEl, postEntry, ref;
      if (!(((ref = g.VIEW) === 'index' || ref === 'thread') && Conf['Menu'] && Conf['Delete Link'])) {
        return;
      }
      div = $.el('div', {
        className: 'delete-link',
        textContent: 'Delete'
      });
      postEl = $.el('a', {
        className: 'delete-post',
        href: 'javascript:;'
      });
      fileEl = $.el('a', {
        className: 'delete-file',
        href: 'javascript:;'
      });
      this.nodes = {
        menu: div.firstChild,
        links: [postEl, fileEl]
      };
      postEntry = {
        el: postEl,
        open: function() {
          postEl.textContent = DeleteLink.linkText(false);
          $.on(postEl, 'click', DeleteLink.toggle);
          return true;
        }
      };
      fileEntry = {
        el: fileEl,
        open: function(arg) {
          var file;
          file = arg.file;
          if (!file || file.isDead) {
            return false;
          }
          fileEl.textContent = DeleteLink.linkText(true);
          $.on(fileEl, 'click', DeleteLink.toggle);
          return true;
        }
      };
      return Menu.menu.addEntry({
        el: div,
        order: 40,
        open: function(post) {
          if (post.isDead) {
            return false;
          }
          DeleteLink.post = post;
          DeleteLink.nodes.menu.textContent = DeleteLink.menuText();
          DeleteLink.cooldown.start(post);
          return true;
        },
        subEntries: [postEntry, fileEntry]
      });
    },
    menuText: function() {
      var seconds;
      if (seconds = DeleteLink.cooldown.seconds[DeleteLink.post.fullID]) {
        return "Delete (" + seconds + ")";
      } else {
        return 'Delete';
      }
    },
    linkText: function(fileOnly) {
      var text;
      text = fileOnly ? 'File' : 'Post';
      if (DeleteLink.auto[+fileOnly][DeleteLink.post.fullID]) {
        text = "Deleting " + (text.toLowerCase()) + "...";
      }
      return text;
    },
    toggle: function() {
      var auto, fileOnly, post;
      post = DeleteLink.post;
      fileOnly = $.hasClass(this, 'delete-file');
      auto = DeleteLink.auto[+fileOnly];
      if (auto[post.fullID]) {
        delete auto[post.fullID];
      } else {
        auto[post.fullID] = true;
      }
      this.textContent = DeleteLink.linkText(fileOnly);
      if (!DeleteLink.cooldown.seconds[post.fullID]) {
        return DeleteLink["delete"](post, fileOnly);
      }
    },
    "delete": function(post, fileOnly) {
      var form, link;
      link = DeleteLink.nodes.links[+fileOnly];
      delete DeleteLink.auto[+fileOnly][post.fullID];
      if (post.fullID === DeleteLink.post.fullID) {
        $.off(link, 'click', DeleteLink.toggle);
      }
      form = {
        mode: 'usrdel',
        onlyimgdel: fileOnly,
        pwd: QR.persona.getPassword()
      };
      form[post.ID] = 'delete';
      return $.ajax($.id('delform').action.replace("/" + g.BOARD + "/", "/" + post.board + "/"), {
        responseType: 'document',
        withCredentials: true,
        onload: function() {
          return DeleteLink.load(link, post, fileOnly, this.response);
        },
        onerror: function() {
          return DeleteLink.error(link, post);
        }
      }, {
        form: $.formData(form)
      });
    },
    load: function(link, post, fileOnly, resDoc) {
      var el, msg;
      link.textContent = DeleteLink.linkText(fileOnly);
      if (resDoc.title === '4chan - Banned') {
        el = $.el('span', {
          innerHTML: "You can&#039;t delete posts because you are <a href=\"//www.4chan.org/banned\" target=\"_blank\">banned</a>."
        });
        return new Notice('warning', el, 20);
      } else if (msg = resDoc.getElementById('errmsg')) {
        new Notice('warning', msg.textContent, 20);
        if (post.fullID === DeleteLink.post.fullID) {
          $.on(link, 'click', DeleteLink.toggle);
        }
        if (QR.cooldown.data && Conf['Cooldown'] && /\bwait\b/i.test(msg.textContent)) {
          DeleteLink.cooldown.start(post, 5);
          DeleteLink.auto[+fileOnly][post.fullID] = true;
          return DeleteLink.nodes.links[+fileOnly].textContent = DeleteLink.linkText(fileOnly);
        }
      } else {
        if (!fileOnly) {
          QR.cooldown["delete"](post);
        }
        if (resDoc.title === 'Updating index...') {
          (post.origin || post).kill(fileOnly);
        }
        if (post.fullID === DeleteLink.post.fullID) {
          return link.textContent = 'Deleted';
        }
      }
    },
    error: function(link, post) {
      new Notice('warning', 'Connection error, please retry.', 20);
      if (post.fullID === DeleteLink.post.fullID) {
        return $.on(link, 'click', DeleteLink.toggle);
      }
    },
    cooldown: {
      seconds: {},
      start: function(post, seconds) {
        if (DeleteLink.cooldown.seconds[post.fullID] != null) {
          return;
        }
        if (seconds == null) {
          seconds = QR.cooldown.secondsDeletion(post);
        }
        if (seconds > 0) {
          DeleteLink.cooldown.seconds[post.fullID] = seconds;
          return DeleteLink.cooldown.count(post);
        }
      },
      count: function(post) {
        var fileOnly, i, len, ref;
        if (post.fullID === DeleteLink.post.fullID) {
          DeleteLink.nodes.menu.textContent = DeleteLink.menuText();
        }
        if (DeleteLink.cooldown.seconds[post.fullID] > 0 && Conf['Cooldown']) {
          DeleteLink.cooldown.seconds[post.fullID]--;
          setTimeout(DeleteLink.cooldown.count, 1000, post);
        } else {
          delete DeleteLink.cooldown.seconds[post.fullID];
          ref = [false, true];
          for (i = 0, len = ref.length; i < len; i++) {
            fileOnly = ref[i];
            if (DeleteLink.auto[+fileOnly][post.fullID]) {
              DeleteLink["delete"](post, fileOnly);
            }
          }
        }
      }
    }
  };

  return DeleteLink;

}).call(this);

DownloadLink = (function() {
  var DownloadLink;

  DownloadLink = {
    init: function() {
      var a, ref;
      if (!(((ref = g.VIEW) === 'index' || ref === 'thread') && Conf['Menu'] && Conf['Download Link'])) {
        return;
      }
      a = $.el('a', {
        className: 'download-link',
        textContent: 'Download file'
      });
      $.on(a, 'click', ImageCommon.download);
      return Menu.menu.addEntry({
        el: a,
        order: 100,
        open: function(arg) {
          var file;
          file = arg.file;
          if (!file) {
            return false;
          }
          a.href = file.url;
          a.download = file.name;
          return true;
        }
      });
    }
  };

  return DownloadLink;

}).call(this);

Menu = (function() {
  var Menu;

  Menu = {
    init: function() {
      var ref;
      if (!(((ref = g.VIEW) === 'index' || ref === 'thread') && Conf['Menu'])) {
        return;
      }
      this.button = $.el('a', {
        className: 'menu-button',
        href: 'javascript:;'
      });
      $.extend(this.button, {
        innerHTML: "<i class=\"fa fa-angle-down\"></i>"
      });
      this.menu = new UI.Menu('post');
      Callbacks.Post.push({
        name: 'Menu',
        cb: this.node
      });
      return Callbacks.CatalogThread.push({
        name: 'Menu',
        cb: this.catalogNode
      });
    },
    node: function() {
      var button;
      if (this.isClone) {
        button = $('.menu-button', this.nodes.info);
        $.rmClass(button, 'active');
        $.rm($('.dialog', button));
        Menu.makeButton(this, button);
        return;
      }
      return $.add(this.nodes.info, Menu.makeButton(this));
    },
    catalogNode: function() {
      return $.after(this.nodes.icons, Menu.makeButton(this.thread.OP));
    },
    makeButton: function(post, button) {
      button || (button = Menu.button.cloneNode(true));
      $.on(button, 'click', function(e) {
        return Menu.menu.toggle(e, this, post);
      });
      return button;
    }
  };

  return Menu;

}).call(this);

ReportLink = (function() {
  var ReportLink;

  ReportLink = {
    init: function() {
      var a, ref;
      if (!(((ref = g.VIEW) === 'index' || ref === 'thread') && Conf['Menu'] && Conf['Report Link'])) {
        return;
      }
      a = $.el('a', {
        className: 'report-link',
        href: 'javascript:;',
        textContent: 'Report'
      });
      $.on(a, 'click', ReportLink.report);
      return Menu.menu.addEntry({
        el: a,
        order: 10,
        open: function(post) {
          ReportLink.url = "//sys." + (location.hostname.split('.')[1]) + ".org/" + post.board + "/imgboard.php?mode=report&no=" + post;
          if (d.cookie.indexOf('pass_enabled=1') >= 0) {
            ReportLink.dims = 'width=350,height=275';
          } else {
            ReportLink.dims = 'width=400,height=550';
          }
          return true;
        }
      });
    },
    report: function() {
      var dims, id, set, url;
      url = ReportLink.url, dims = ReportLink.dims;
      id = Date.now();
      set = "toolbar=0,scrollbars=1,location=0,status=1,menubar=0,resizable=1," + dims;
      return window.open(url, id, set);
    }
  };

  return ReportLink;

}).call(this);

AntiAutoplay = (function() {
  var AntiAutoplay;

  AntiAutoplay = {
    init: function() {
      var audio, i, len, ref;
      if (!Conf['Disable Autoplaying Sounds']) {
        return;
      }
      $.addClass(doc, 'anti-autoplay');
      ref = $$('audio[autoplay]', doc);
      for (i = 0, len = ref.length; i < len; i++) {
        audio = ref[i];
        this.stop(audio);
      }
      window.addEventListener('loadstart', ((function(_this) {
        return function(e) {
          return _this.stop(e.target);
        };
      })(this)), true);
      Callbacks.Post.push({
        name: 'Disable Autoplaying Sounds',
        cb: this.node
      });
      return $.ready((function(_this) {
        return function() {
          return _this.process(d.body);
        };
      })(this));
    },
    stop: function(audio) {
      if (!audio.autoplay) {
        return;
      }
      audio.pause();
      audio.autoplay = false;
      if (audio.controls) {
        return;
      }
      audio.controls = true;
      return $.addClass(audio, 'controls-added');
    },
    node: function() {
      return AntiAutoplay.process(this.nodes.comment);
    },
    process: function(root) {
      var i, iframe, j, len, len1, object, ref, ref1;
      ref = $$('iframe[src*="youtube"][src*="autoplay=1"]', root);
      for (i = 0, len = ref.length; i < len; i++) {
        iframe = ref[i];
        AntiAutoplay.processVideo(iframe, 'src');
      }
      ref1 = $$('object[data*="youtube"][data*="autoplay=1"]', root);
      for (j = 0, len1 = ref1.length; j < len1; j++) {
        object = ref1[j];
        AntiAutoplay.processVideo(object, 'data');
      }
    },
    processVideo: function(el, attr) {
      el[attr] = el[attr].replace(/\?autoplay=1&?/, '?').replace('&autoplay=1', '');
      if (window.getComputedStyle(el).display === 'none') {
        el.style.display = 'block';
      }
      return $.addClass(el, 'autoplay-removed');
    }
  };

  return AntiAutoplay;

}).call(this);

Banner = (function() {
  var Banner,
    slice = [].slice;

  Banner = {
    banners: ["0.jpg","1.jpg","2.jpg","4.jpg","6.jpg","7.jpg","8.jpg","9.jpg","10.jpg","11.jpg","12.jpg","13.jpg","14.jpg","16.jpg","17.jpg","18.jpg","19.jpg","20.jpg","21.jpg","22.jpg","24.jpg","25.jpg","26.jpg","28.jpg","29.jpg","33.jpg","38.jpg","39.jpg","43.jpg","44.jpg","45.jpg","46.jpg","47.jpg","52.jpg","54.jpg","57.jpg","59.jpg","60.jpg","61.jpg","64.jpg","66.jpg","67.jpg","69.jpg","71.jpg","72.jpg","76.jpg","77.jpg","81.jpg","82.jpg","83.jpg","84.jpg","88.jpg","90.jpg","91.jpg","96.jpg","98.jpg","99.jpg","100.jpg","104.jpg","106.jpg","116.jpg","119.jpg","137.jpg","140.jpg","148.jpg","149.jpg","150.jpg","154.jpg","156.jpg","157.jpg","158.jpg","159.jpg","161.jpg","162.jpg","164.jpg","165.jpg","166.jpg","167.jpg","168.jpg","169.jpg","170.jpg","171.jpg","172.jpg","173.jpg","174.jpg","175.jpg","176.jpg","178.jpg","179.jpg","180.jpg","181.jpg","182.jpg","183.jpg","186.jpg","189.jpg","190.jpg","192.jpg","193.jpg","194.jpg","197.jpg","198.jpg","200.jpg","201.jpg","202.jpg","203.jpg","205.jpg","206.jpg","207.jpg","208.jpg","210.jpg","213.jpg","214.jpg","215.jpg","216.jpg","218.jpg","219.jpg","220.jpg","221.jpg","222.jpg","223.jpg","224.jpg","227.jpg","0.png","1.png","2.png","3.png","5.png","6.png","9.png","10.png","11.png","12.png","14.png","16.png","19.png","20.png","21.png","22.png","23.png","24.png","26.png","27.png","28.png","29.png","30.png","31.png","32.png","33.png","34.png","37.png","39.png","40.png","41.png","42.png","43.png","44.png","45.png","48.png","49.png","50.png","51.png","52.png","53.png","57.png","58.png","59.png","64.png","66.png","67.png","68.png","69.png","70.png","71.png","72.png","76.png","78.png","79.png","81.png","82.png","85.png","86.png","87.png","89.png","95.png","98.png","100.png","101.png","102.png","105.png","106.png","107.png","109.png","110.png","111.png","112.png","113.png","114.png","115.png","116.png","118.png","119.png","120.png","121.png","122.png","123.png","126.png","128.png","130.png","134.png","136.png","138.png","139.png","140.png","142.png","145.png","146.png","149.png","150.png","151.png","152.png","153.png","154.png","155.png","156.png","157.png","158.png","159.png","160.png","163.png","164.png","165.png","166.png","167.png","168.png","169.png","170.png","171.png","172.png","173.png","174.png","178.png","179.png","180.png","181.png","182.png","184.png","186.png","188.png","190.png","192.png","193.png","194.png","195.png","196.png","197.png","198.png","200.png","202.png","203.png","205.png","206.png","207.png","209.png","212.png","213.png","214.png","216.png","217.png","218.png","219.png","220.png","221.png","222.png","223.png","224.png","225.png","226.png","229.png","231.png","232.png","233.png","234.png","235.png","237.png","238.png","239.png","240.png","241.png","242.png","244.png","245.png","246.png","247.png","248.png","249.png","250.png","253.png","254.png","255.png","256.png","257.png","258.png","259.png","260.png","262.png","268.png","0.gif","1.gif","2.gif","3.gif","4.gif","5.gif","6.gif","7.gif","8.gif","9.gif","10.gif","12.gif","13.gif","14.gif","15.gif","16.gif","18.gif","19.gif","20.gif","21.gif","22.gif","23.gif","24.gif","28.gif","29.gif","30.gif","33.gif","34.gif","35.gif","36.gif","37.gif","39.gif","40.gif","42.gif","44.gif","45.gif","46.gif","48.gif","50.gif","52.gif","54.gif","55.gif","57.gif","58.gif","59.gif","60.gif","61.gif","63.gif","64.gif","66.gif","67.gif","68.gif","69.gif","70.gif","72.gif","73.gif","75.gif","76.gif","77.gif","78.gif","80.gif","81.gif","82.gif","83.gif","86.gif","87.gif","88.gif","92.gif","93.gif","94.gif","95.gif","96.gif","97.gif","98.gif","99.gif","100.gif","101.gif","102.gif","103.gif","104.gif","105.gif","106.gif","108.gif","109.gif","110.gif","111.gif","112.gif","113.gif","115.gif","116.gif","117.gif","118.gif","119.gif","120.gif","122.gif","123.gif","124.gif","127.gif","129.gif","130.gif","131.gif","134.gif","135.gif","136.gif","138.gif","139.gif","141.gif","144.gif","146.gif","148.gif","149.gif","153.gif","154.gif","155.gif","157.gif","158.gif","159.gif","160.gif","161.gif","162.gif","164.gif","166.gif","167.gif","168.gif","169.gif","170.gif","171.gif","172.gif","173.gif","174.gif","175.gif","176.gif","177.gif","178.gif","181.gif","182.gif","183.gif","185.gif","186.gif","187.gif","188.gif","189.gif","190.gif","191.gif","192.gif","193.gif","195.gif","196.gif","197.gif","200.gif","201.gif","202.gif","203.gif","204.gif","205.gif","206.gif","207.gif","208.gif","209.gif","210.gif","211.gif","212.gif","213.gif","214.gif","215.gif","216.gif","217.gif","219.gif","220.gif","221.gif","222.gif","224.gif","225.gif","226.gif","227.gif","228.gif","230.gif","232.gif","233.gif","234.gif","235.gif","238.gif","240.gif","241.gif","243.gif","244.gif","245.gif","246.gif","247.gif","249.gif","250.gif","251.gif","253.gif"],
    init: function() {
      if (Conf['Custom Board Titles']) {
        this.db = new DataBoard('customTitles', null, true);
      }
      $.asap((function() {
        return d.body;
      }), function() {
        return $.asap((function() {
          return $('hr');
        }), Banner.ready);
      });
      if (g.BOARD.ID !== 'f') {
        return Main.ready(function() {
          return $.queueTask(Banner.load);
        });
      }
    },
    ready: function() {
      var banner, children;
      banner = $(".boardBanner");
      children = banner.children;
      if (g.VIEW === 'thread' && Conf['Remove Thread Excerpt']) {
        Banner.setTitle(children[1].textContent);
      }
      children[0].title = "Click to change";
      $.on(children[0], 'click', Banner.cb.toggle);
      if (Conf['Custom Board Titles']) {
        Banner.custom(children[1]);
        if (children[2]) {
          return Banner.custom(children[2]);
        }
      }
    },
    load: function() {
      var bannerCnt, img;
      bannerCnt = $.id('bannerCnt');
      if (!bannerCnt.firstChild) {
        img = $.el('img', {
          alt: '4chan',
          src: '//s.4cdn.org/image/title/' + bannerCnt.dataset.src
        });
        return $.add(bannerCnt, img);
      }
    },
    setTitle: function(title) {
      if (Unread.title != null) {
        Unread.title = title;
        return Unread.update();
      } else {
        return d.title = title;
      }
    },
    cb: {
      toggle: function() {
        var banner, i, ref;
        if (!((ref = Banner.choices) != null ? ref.length : void 0)) {
          Banner.choices = Banner.banners.slice();
        }
        i = Math.floor(Banner.choices.length * Math.random());
        banner = Banner.choices.splice(i, 1);
        return $('img', this.parentNode).src = "//s.4cdn.org/image/title/" + banner;
      },
      click: function(e) {
        var base, br, j, len, name, ref;
        if (!(e.ctrlKey || e.metaKey)) {
          return;
        }
        if ((base = Banner.original)[name = this.className] == null) {
          base[name] = this.cloneNode(true);
        }
        this.contentEditable = true;
        ref = $$('br', this);
        for (j = 0, len = ref.length; j < len; j++) {
          br = ref[j];
          $.replace(br, $.tn('\n'));
        }
        return this.focus();
      },
      keydown: function(e) {
        e.stopPropagation();
        if (!e.shiftKey && e.keyCode === 13) {
          return this.blur();
        }
      },
      blur: function() {
        var br, j, len, ref;
        ref = $$('br', this);
        for (j = 0, len = ref.length; j < len; j++) {
          br = ref[j];
          $.replace(br, $.tn('\n'));
        }
        if (this.textContent = this.textContent.replace(/\n*$/, '')) {
          this.contentEditable = false;
          return Banner.db.set({
            boardID: g.BOARD.ID,
            threadID: this.className,
            val: {
              title: this.textContent,
              orig: Banner.original[this.className].textContent
            }
          });
        } else {
          $.rmAll(this);
          $.add(this, slice.call(Banner.original[this.className].cloneNode(true).childNodes));
          return Banner.db["delete"]({
            boardID: g.BOARD.ID,
            threadID: this.className
          });
        }
      }
    },
    original: {},
    custom: function(child) {
      var className, data, event, j, len, ref;
      className = child.className;
      child.title = "Ctrl/\u2318+click to edit board " + (className.slice(5).toLowerCase());
      child.spellcheck = false;
      ref = ['click', 'keydown', 'blur'];
      for (j = 0, len = ref.length; j < len; j++) {
        event = ref[j];
        $.on(child, event, Banner.cb[event]);
      }
      if (data = Banner.db.get({
        boardID: g.BOARD.ID,
        threadID: className
      })) {
        if (Conf['Persistent Custom Board Titles'] || data.orig === child.textContent) {
          Banner.original[className] = child.cloneNode(true);
          return child.textContent = data.title;
        } else {
          return Banner.db["delete"]({
            boardID: g.BOARD.ID,
            threadID: className
          });
        }
      }
    }
  };

  return Banner;

}).call(this);

CatalogLinks = (function() {
  var CatalogLinks;

  CatalogLinks = {
    init: function() {
      var el, input, selector;
      if (Site.software === 'yotsuba' && (Conf['External Catalog'] || Conf['JSON Index']) && !(Conf['JSON Index'] && g.VIEW === 'index')) {
        selector = (function() {
          switch (g.VIEW) {
            case 'thread':
            case 'archive':
              return '.navLinks.desktop > a';
            case 'catalog':
              return '.navLinks > :first-child > a';
            case 'index':
              return '#ctrl-top > a, .cataloglink > a';
          }
        })();
        $.ready(function() {
          var catalogLink, i, len, link, ref;
          ref = $$(selector);
          for (i = 0, len = ref.length; i < len; i++) {
            link = ref[i];
            switch (link.pathname.replace(/\/+/g, '/')) {
              case "/" + g.BOARD + "/":
                if (Conf['JSON Index']) {
                  link.textContent = 'Index';
                }
                link.href = CatalogLinks.index();
                break;
              case "/" + g.BOARD + "/catalog":
                link.href = CatalogLinks.catalog();
            }
            if (g.VIEW === 'catalog' && Conf['JSON Index'] && Conf['Use 4chan X Catalog']) {
              catalogLink = link.parentNode.cloneNode(true);
              catalogLink.firstElementChild.textContent = '4chan X Catalog';
              catalogLink.firstElementChild.href = CatalogLinks.catalog();
              $.after(link.parentNode, [$.tn(' '), catalogLink]);
            }
          }
        });
      }
      if (Site.software === 'yotsuba' && Conf['JSON Index'] && Conf['Use 4chan X Catalog']) {
        Callbacks.Post.push({
          name: 'Catalog Link Rewrite',
          cb: this.node
        });
      }
      if ((this.enabled = Conf['Catalog Links'])) {
        CatalogLinks.el = el = UI.checkbox('Header catalog links', 'Catalog Links');
        el.id = 'toggleCatalog';
        input = $('input', el);
        $.on(input, 'change', this.toggle);
        $.sync('Header catalog links', CatalogLinks.set);
        return Header.menu.addEntry({
          el: el,
          order: 95
        });
      }
    },
    node: function() {
      var a, i, len, m, ref;
      ref = $$('a', this.nodes.comment);
      for (i = 0, len = ref.length; i < len; i++) {
        a = ref[i];
        if (m = a.href.match(/^https?:\/\/(boards\.4chan(?:nel)?\.org\/[^\/]+)\/catalog(#s=.*)?/)) {
          a.href = "//" + m[1] + "/" + (m[2] || '#catalog');
        }
      }
    },
    toggle: function() {
      $.event('CloseMenu');
      $.set('Header catalog links', this.checked);
      return CatalogLinks.set(this.checked);
    },
    set: function(useCatalog) {
      Conf['Header catalog links'] = useCatalog;
      CatalogLinks.setLinks(Header.boardList);
      CatalogLinks.setLinks(Header.bottomBoardList);
      CatalogLinks.el.title = "Turn catalog links " + (useCatalog ? 'off' : 'on') + ".";
      return $('input', CatalogLinks.el).checked = useCatalog;
    },
    setLinks: function(list) {
      var a, board, i, len, ref, ref1, ref2, ref3;
      if (!(((ref = CatalogLinks.enabled) != null ? ref : Conf['Catalog Links']) && list)) {
        return;
      }
      ref1 = $$('a:not([data-only])', list);
      for (i = 0, len = ref1.length; i < len; i++) {
        a = ref1[i];
        if (((ref2 = a.hostname) !== 'lolcow.farm' && ref2 !== 'lolcow.farm' && ref2 !== 'catalog.neet.tv') || !(board = a.pathname.split('/')[1]) || (board === 'f' || board === 'status' || board === '4chan') || a.pathname.split('/')[2] === 'archive' || $.hasClass(a, 'external')) {
          continue;
        }
        a.href = Conf['Header catalog links'] ? CatalogLinks.catalog(board) : "//" + (BoardConfig.domain(board)) + "/" + board + "/";
        if (a.dataset.indexOptions && ((ref3 = a.hostname) === 'lolcow.farm' || ref3 === 'lolcow.farm') && a.pathname.split('/')[2] === '') {
          a.href += (a.hash ? '/' : '#') + a.dataset.indexOptions;
        }
      }
    },
    catalog: function(board) {
      var ref;
      if (board == null) {
        board = g.BOARD.ID;
      }
      if (Conf['External Catalog'] && (board === 'a' || board === 'c' || board === 'g' || board === 'biz' || board === 'k' || board === 'm' || board === 'o' || board === 'p' || board === 'v' || board === 'vg' || board === 'vr' || board === 'w' || board === 'wg' || board === 'cm' || board === '3' || board === 'adv' || board === 'an' || board === 'asp' || board === 'cgl' || board === 'ck' || board === 'co' || board === 'diy' || board === 'fa' || board === 'fit' || board === 'gd' || board === 'int' || board === 'jp' || board === 'lit' || board === 'mlp' || board === 'mu' || board === 'n' || board === 'out' || board === 'po' || board === 'sci' || board === 'sp' || board === 'tg' || board === 'toy' || board === 'trv' || board === 'tv' || board === 'vp' || board === 'wsg' || board === 'x' || board === 'f' || board === 'pol' || board === 's4s' || board === 'lgbt')) {
        return "//catalog.neet.tv/" + board + "/";
      } else if (Conf['JSON Index'] && Conf['Use 4chan X Catalog']) {
        if (((ref = location.hostname) === 'lolcow.farm' || ref === 'lolcow.farm') && g.BOARD.ID === board && g.VIEW === 'index') {
          return '#catalog';
        } else {
          return "//" + (BoardConfig.domain(board)) + "/" + board + "/#catalog";
        }
      } else {
        return "//" + (BoardConfig.domain(board)) + "/" + board + "/catalog";
      }
    },
    index: function(board) {
      var ref;
      if (board == null) {
        board = g.BOARD.ID;
      }
      if (Conf['JSON Index'] && board !== 'f') {
        if (((ref = location.hostname) === 'lolcow.farm' || ref === 'lolcow.farm') && g.BOARD.ID === board && g.VIEW === 'index') {
          return '#index';
        } else {
          return "//" + (BoardConfig.domain(board)) + "/" + board + "/#index";
        }
      } else {
        return "//" + (BoardConfig.domain(board)) + "/" + board + "/";
      }
    }
  };

  return CatalogLinks;

}).call(this);

CustomCSS = (function() {
  var CustomCSS;

  CustomCSS = {
    init: function() {
      if (!Conf['Custom CSS']) {
        return;
      }
      return this.addStyle();
    },
    addStyle: function() {
      return this.style = $.addStyle(Conf['usercss'], 'custom-css', '#fourchanx-css');
    },
    rmStyle: function() {
      if (this.style) {
        $.rm(this.style);
        return delete this.style;
      }
    },
    update: function() {
      if (!this.style) {
        return this.addStyle();
      }
      return this.style.textContent = Conf['usercss'];
    }
  };

  return CustomCSS;

}).call(this);

ExpandComment = (function() {
  var ExpandComment;

  ExpandComment = {
    init: function() {
      if (g.VIEW !== 'index' || !Conf['Comment Expansion'] || Conf['JSON Index']) {
        return;
      }
      if (g.BOARD.ID === 'g') {
        this.callbacks.push(Fourchan.code);
      }
      if (g.BOARD.ID === 'sci') {
        this.callbacks.push(Fourchan.math);
      }
      return Callbacks.Post.push({
        name: 'Comment Expansion',
        cb: this.node
      });
    },
    node: function() {
      var a;
      if (a = $('.abbr > a:not([onclick])', this.nodes.comment)) {
        return $.on(a, 'click', ExpandComment.cb);
      }
    },
    callbacks: [],
    cb: function(e) {
      e.preventDefault();
      return ExpandComment.expand(Get.postFromNode(this));
    },
    expand: function(post) {
      var a;
      if (post.nodes.longComment && !post.nodes.longComment.parentNode) {
        $.replace(post.nodes.shortComment, post.nodes.longComment);
        post.nodes.comment = post.nodes.longComment;
        return;
      }
      if (!(a = $('.abbr > a', post.nodes.comment))) {
        return;
      }
      a.textContent = "Post No." + post + " Loading...";
      return $.cache(location.protocol + "//a.4cdn.org" + (a.pathname.split(/\/+/).splice(0, 4).join('/')) + ".json", function() {
        return ExpandComment.parse(this, a, post);
      });
    },
    contract: function(post) {
      var a;
      if (!post.nodes.shortComment) {
        return;
      }
      a = $('.abbr > a', post.nodes.shortComment);
      a.textContent = 'here';
      $.replace(post.nodes.longComment, post.nodes.shortComment);
      return post.nodes.comment = post.nodes.shortComment;
    },
    parse: function(req, a, post) {
      var callback, clone, comment, href, i, j, k, len, len1, len2, postObj, posts, quote, ref, ref1, spoilerRange, status;
      status = req.status;
      if (status !== 200 && status !== 304) {
        a.textContent = "Error " + req.statusText + " (" + status + ")";
        return;
      }
      posts = req.response.posts;
      if (spoilerRange = posts[0].custom_spoiler) {
        Build.spoilerRange[g.BOARD] = spoilerRange;
      }
      for (i = 0, len = posts.length; i < len; i++) {
        postObj = posts[i];
        if (postObj.no === post.ID) {
          break;
        }
      }
      if (postObj.no !== post.ID) {
        a.textContent = "Post No." + post + " not found.";
        return;
      }
      comment = post.nodes.comment;
      clone = comment.cloneNode(false);
      clone.innerHTML = postObj.com;
      ref = $$('.quotelink', clone);
      for (j = 0, len1 = ref.length; j < len1; j++) {
        quote = ref[j];
        href = quote.getAttribute('href');
        if (href[0] === '/') {
          continue;
        }
        if (href[0] === '#') {
          quote.href = "" + (a.pathname.split(/\/+/).splice(0, 4).join('/')) + href;
        } else {
          quote.href = (a.pathname.split(/\/+/).splice(0, 3).join('/')) + "/" + href;
        }
      }
      post.nodes.shortComment = comment;
      $.replace(comment, clone);
      post.nodes.comment = post.nodes.longComment = clone;
      post.parseComment();
      post.parseQuotes();
      ref1 = ExpandComment.callbacks;
      for (k = 0, len2 = ref1.length; k < len2; k++) {
        callback = ref1[k];
        callback.call(post);
      }
    }
  };

  return ExpandComment;

}).call(this);

ExpandThread = (function() {
  var ExpandThread,
    slice = [].slice;

  ExpandThread = {
    statuses: {},
    init: function() {
      if (!(g.VIEW === 'index' && Conf['Thread Expansion'])) {
        return;
      }
      if (Conf['JSON Index']) {
        return $.on(d, 'IndexRefreshInternal', this.onIndexRefresh);
      } else {
        return Callbacks.Thread.push({
          name: 'Expand Thread',
          cb: function() {
            return ExpandThread.setButton(this);
          }
        });
      }
    },
    setButton: function(thread) {
      var a;
      if (!(thread.nodes.root && (a = $('.summary', thread.nodes.root)))) {
        return;
      }
      a.textContent = Build.summaryText.apply(Build, ['+'].concat(slice.call(a.textContent.match(/\d+/g))));
      a.style.cursor = 'pointer';
      return $.on(a, 'click', ExpandThread.cbToggle);
    },
    disconnect: function(refresh) {
      var ref, ref1, status, threadID;
      if (g.VIEW === 'thread' || !Conf['Thread Expansion']) {
        return;
      }
      ref = ExpandThread.statuses;
      for (threadID in ref) {
        status = ref[threadID];
        if ((ref1 = status.req) != null) {
          ref1.abort();
        }
        delete ExpandThread.statuses[threadID];
      }
      if (!refresh) {
        return $.off(d, 'IndexRefreshInternal', this.onIndexRefresh);
      }
    },
    onIndexRefresh: function() {
      ExpandThread.disconnect(true);
      return g.BOARD.threads.forEach(function(thread) {
        return ExpandThread.setButton(thread);
      });
    },
    cbToggle: function(e) {
      if ($.modifiedClick(e)) {
        return;
      }
      e.preventDefault();
      return ExpandThread.toggle(Get.threadFromNode(this));
    },
    cbToggleBottom: function(e) {
      var bottom, thread;
      if ($.modifiedClick(e)) {
        return;
      }
      e.preventDefault();
      thread = Get.threadFromNode(this);
      $.rm(this);
      bottom = thread.nodes.root.getBoundingClientRect().bottom;
      ExpandThread.toggle(thread);
      return window.scrollBy(0, thread.nodes.root.getBoundingClientRect().bottom - bottom);
    },
    toggle: function(thread) {
      var a;
      if (!(thread.nodes.root && (a = $('.summary', thread.nodes.root)))) {
        return;
      }
      if (thread.ID in ExpandThread.statuses) {
        return ExpandThread.contract(thread, a, thread.nodes.root);
      } else {
        return ExpandThread.expand(thread, a);
      }
    },
    expand: function(thread, a) {
      var status;
      ExpandThread.statuses[thread] = status = {};
      a.textContent = Build.summaryText.apply(Build, ['...'].concat(slice.call(a.textContent.match(/\d+/g))));
      return status.req = $.cache(location.protocol + "//a.4cdn.org/" + thread.board + "/thread/" + thread + ".json", function() {
        delete status.req;
        return ExpandThread.parse(this, thread, a);
      });
    },
    contract: function(thread, a, threadRoot) {
      var filesCount, i, inlined, len, node, num, postsCount, replies, reply, status;
      status = ExpandThread.statuses[thread];
      delete ExpandThread.statuses[thread];
      if (status.req) {
        status.req.abort();
        if (a) {
          a.textContent = Build.summaryText.apply(Build, ['+'].concat(slice.call(a.textContent.match(/\d+/g))));
        }
        return;
      }
      replies = $$('.thread > .replyContainer', threadRoot);
      if (!Conf['JSON Index'] || Conf['Show Replies']) {
        num = (function() {
          if (thread.isSticky) {
            return 1;
          } else {
            switch (g.BOARD.ID) {
              case 'b':
              case 'vg':
              case 'bant':
                return 3;
              case 't':
                return 1;
              default:
                return 5;
            }
          }
        })();
        replies = replies.slice(0, -num);
      }
      postsCount = 0;
      filesCount = 0;
      for (i = 0, len = replies.length; i < len; i++) {
        reply = replies[i];
        while ((node = a.nextSibling) && node !== reply) {
          $.rm(node);
        }
        if (Conf['Quote Inlining']) {
          while (inlined = $('.inlined', reply)) {
            inlined.click();
          }
        }
        postsCount++;
        if ('file' in Get.postFromRoot(reply)) {
          filesCount++;
        }
        $.rm(reply);
      }
      a.textContent = Build.summaryText('+', postsCount, filesCount);
      return $.rm($('.summary-bottom', threadRoot));
    },
    parse: function(req, thread, a) {
      var a2, filesCount, i, len, post, postData, posts, postsCount, postsRoot, ref, ref1, root;
      if ((ref = req.status) !== 200 && ref !== 304) {
        a.textContent = "Error " + req.statusText + " (" + req.status + ")";
        return;
      }
      Build.spoilerRange[thread.board] = req.response.posts[0].custom_spoiler;
      posts = [];
      postsRoot = [];
      filesCount = 0;
      ref1 = req.response.posts;
      for (i = 0, len = ref1.length; i < len; i++) {
        postData = ref1[i];
        if (postData.no === thread.ID) {
          continue;
        }
        if ((post = thread.posts[postData.no]) && !post.isFetchedQuote) {
          if ('file' in post) {
            filesCount++;
          }
          root = post.nodes.root;
          postsRoot.push(root);
          continue;
        }
        root = Build.postFromObject(postData, thread.board.ID);
        post = new Post(root, thread, thread.board);
        if ('file' in post) {
          filesCount++;
        }
        posts.push(post);
        postsRoot.push(root);
      }
      Main.callbackNodes('Post', posts);
      $.after(a, postsRoot);
      $.event('PostsInserted', null, a.parentNode);
      postsCount = postsRoot.length;
      a.textContent = Build.summaryText('-', postsCount, filesCount);
      if (root) {
        a2 = a.cloneNode(true);
        a2.classList.add('summary-bottom');
        $.on(a2, 'click', ExpandThread.cbToggleBottom);
        return $.after(root, a2);
      }
    }
  };

  return ExpandThread;

}).call(this);

FileInfo = (function() {
  var FileInfo;

  FileInfo = {
    init: function() {
      var ref;
      if (((ref = g.VIEW) !== 'index' && ref !== 'thread' && ref !== 'archive') || !Conf['File Info Formatting']) {
        return;
      }
      return Callbacks.Post.push({
        name: 'File Info Formatting',
        cb: this.node
      });
    },
    node: function() {
      var a, i, info, j, len, len1, oldInfo, ref, ref1;
      if (!this.file) {
        return;
      }
      if (this.isClone) {
        ref = $$('.file-info .download-button', this.file.text);
        for (i = 0, len = ref.length; i < len; i++) {
          a = ref[i];
          $.on(a, 'click', ImageCommon.download);
        }
        ref1 = $$('.file-info .quick-filter-md5', this.file.text);
        for (j = 0, len1 = ref1.length; j < len1; j++) {
          a = ref1[j];
          $.on(a, 'click', Filter.quickFilterMD5);
        }
        return;
      }
      oldInfo = $.el('span', {
        className: 'fileText-original'
      });
      $.prepend(this.file.link.parentNode, oldInfo);
      $.add(oldInfo, [this.file.link.previousSibling, this.file.link, this.file.link.nextSibling]);
      info = $.el('span', {
        className: 'file-info'
      });
      FileInfo.format(Conf['fileInfo'], this, info);
      return $.prepend(this.file.text, info);
    },
    format: function(formatString, post, outputNode) {
      var a, i, j, len, len1, output, ref, ref1;
      output = [];
      formatString.replace(/%(.)|[^%]+/g, function(s, c) {
        output.push(c in FileInfo.formatters ? FileInfo.formatters[c].call(post) : {
          innerHTML: E(s)
        });
        return '';
      });
      $.extend(outputNode, {
        innerHTML: E.cat(output)
      });
      ref = $$('.download-button', outputNode);
      for (i = 0, len = ref.length; i < len; i++) {
        a = ref[i];
        $.on(a, 'click', ImageCommon.download);
      }
      ref1 = $$('.quick-filter-md5', outputNode);
      for (j = 0, len1 = ref1.length; j < len1; j++) {
        a = ref1[j];
        $.on(a, 'click', Filter.quickFilterMD5);
      }
    },
    formatters: {
      t: function() {
        return {
          innerHTML: E(this.file.url.match(/[^/]*$/)[0])
        };
      },
      T: function() {
        return {
          innerHTML: "<a href=\"" + E(this.file.url) + "\" target=\"_blank\">" + (FileInfo.formatters.t.call(this)).innerHTML + "</a>"
        };
      },
      l: function() {
        return {
          innerHTML: "<a href=\"" + E(this.file.url) + "\" target=\"_blank\">" + (FileInfo.formatters.n.call(this)).innerHTML + "</a>"
        };
      },
      L: function() {
        return {
          innerHTML: "<a href=\"" + E(this.file.url) + "\" target=\"_blank\">" + (FileInfo.formatters.N.call(this)).innerHTML + "</a>"
        };
      },
      n: function() {
        var fullname, shortname;
        fullname = this.file.name;
        shortname = Build.shortFilename(this.file.name, this.isReply);
        if (fullname === shortname) {
          return {
            innerHTML: E(fullname)
          };
        } else {
          return {
            innerHTML: "<span class=\"fnswitch\"><span class=\"fntrunc\">" + E(shortname) + "</span><span class=\"fnfull\">" + E(fullname) + "</span></span>"
          };
        }
      },
      N: function() {
        return {
          innerHTML: E(this.file.name)
        };
      },
      d: function() {
        return {
          innerHTML: "<a href=\"" + E(this.file.url) + "\" download=\"" + E(this.file.name) + "\" class=\"fa fa-download download-button\"></a>"
        };
      },
      f: function() {
        return {
          innerHTML: "<a href=\"javascript:;\" class=\"fa fa-times quick-filter-md5\"></a>"
        };
      },
      p: function() {
        return {
          innerHTML: ((this.file.isSpoiler) ? "Spoiler, " : "")
        };
      },
      s: function() {
        return {
          innerHTML: E(this.file.size)
        };
      },
      B: function() {
        return {
          innerHTML: E(Math.round(this.file.sizeInBytes)) + " Bytes"
        };
      },
      K: function() {
        return {
          innerHTML: E(Math.round(this.file.sizeInBytes/1024)) + " KB"
        };
      },
      M: function() {
        return {
          innerHTML: E(Math.round(this.file.sizeInBytes/1048576*100)/100) + " MB"
        };
      },
      r: function() {
        return {
          innerHTML: E(this.file.dimensions || "PDF")
        };
      },
      g: function() {
        return {
          innerHTML: ((this.file.tag) ? ", " + E(this.file.tag) : "")
        };
      },
      '%': function() {
        return {
          innerHTML: "%"
        };
      }
    }
  };

  return FileInfo;

}).call(this);

Flash = (function() {
  var Flash;

  Flash = {
    init: function() {
      if (g.BOARD.ID === 'f' && Conf['Enable Native Flash Embedding']) {
        return $.ready(Flash.initReady);
      }
    },
    initReady: function() {
      if ($.hasStorage) {
        return $.global(function() {
          if (JSON.parse(localStorage['4chan-settings'] || '{}').disableAll) {
            return window.SWFEmbed.init();
          }
        });
      } else {
        if (g.VIEW === 'thread') {
          $.global(function() {
            return window.Main.tid = location.pathname.split(/\/+/)[3];
          });
        }
        return $.global(function() {
          return window.SWFEmbed.init();
        });
      }
    }
  };

  return Flash;

}).call(this);

Fourchan = (function() {
  var Fourchan;

  Fourchan = {
    init: function() {
      var ref;
      if ((ref = g.VIEW) !== 'index' && ref !== 'thread' && ref !== 'archive') {
        return;
      }
      if (g.BOARD.ID === 'g') {
        $.on(window, 'prettyprint:cb', function(e) {
          var post, pre;
          if (!(post = g.posts[e.detail.ID])) {
            return;
          }
          if (!(pre = $$('.prettyprint', post.nodes.comment)[e.detail.i])) {
            return;
          }
          if (!$.hasClass(pre, 'prettyprinted')) {
            pre.innerHTML = e.detail.html;
            return $.addClass(pre, 'prettyprinted');
          }
        });
        $.globalEval('window.addEventListener(\'prettyprint\', function(e) {\n  window.dispatchEvent(new CustomEvent(\'prettyprint:cb\', {\n    detail: {\n      ID:   e.detail.ID,\n      i:    e.detail.i,\n      html: prettyPrintOne(e.detail.html)\n    }\n  }));\n}, false);');
        Callbacks.Post.push({
          name: 'Parse /g/ code',
          cb: this.code
        });
      }
      if (g.BOARD.ID === 'sci') {
        $.global(function() {
          return window.addEventListener('mathjax', function(e) {
            if (window.MathJax) {
              return window.MathJax.Hub.Queue(['Typeset', window.MathJax.Hub, e.target]);
            } else {
              if (!document.querySelector('script[src^="//cdn.mathjax.org/"]')) {
                window.loadMathJax();
                window.loadMathJax = function() {};
              }
              if (!e.target.classList.contains('postMessage')) {
                return document.querySelector('script[src^="//cdn.mathjax.org/"]').addEventListener('load', function() {
                  return window.MathJax.Hub.Queue(['Typeset', window.MathJax.Hub, e.target]);
                }, false);
              }
            }
          }, false);
        });
        Callbacks.Post.push({
          name: 'Parse /sci/ math',
          cb: this.math
        });
      }
      return Main.ready(function() {
        return $.global(function() {
          var j, len, node, ref1;
          window.clickable_ids = false;
          ref1 = document.querySelectorAll('.posteruid, .capcode');
          for (j = 0, len = ref1.length; j < len; j++) {
            node = ref1[j];
            node.removeEventListener('click', window.idClick, false);
          }
        });
      });
    },
    code: function() {
      if (this.isClone) {
        return;
      }
      return $.ready((function(_this) {
        return function() {
          var i, j, len, pre, ref;
          ref = $$('.prettyprint', _this.nodes.comment);
          for (i = j = 0, len = ref.length; j < len; i = ++j) {
            pre = ref[i];
            if (!$.hasClass(pre, 'prettyprinted')) {
              $.event('prettyprint', {
                ID: _this.fullID,
                i: i,
                html: pre.innerHTML
              }, window);
            }
          }
        };
      })(this));
    },
    math: function() {
      var cb, j, len, wbr, wbrs;
      if (!/\[(math|eqn)\]/.test(this.nodes.comment.textContent)) {
        return;
      }
      if ((wbrs = $$('wbr', this.nodes.comment)).length) {
        for (j = 0, len = wbrs.length; j < len; j++) {
          wbr = wbrs[j];
          $.rm(wbr);
        }
        this.nodes.comment.normalize();
      }
      cb = (function(_this) {
        return function() {
          if (!doc.contains(_this.nodes.comment)) {
            return;
          }
          $.off(d, 'PostsInserted', cb);
          return $.event('mathjax', null, _this.nodes.comment);
        };
      })(this);
      $.on(d, 'PostsInserted', cb);
      return cb();
    }
  };

  return Fourchan;

}).call(this);

IDColor = (function() {
  var IDColor;

  IDColor = {
    init: function() {
      var ref;
      if (!(((ref = g.VIEW) === 'index' || ref === 'thread') && Conf['Color User IDs'])) {
        return;
      }
      this.ids = {
        Heaven: [0, 0, 0, '#fff']
      };
      return Callbacks.Post.push({
        name: 'Color User IDs',
        cb: this.node
      });
    },
    node: function() {
      var rgb, span, style, uid;
      if (this.isClone || !((uid = this.info.uniqueID) && (span = this.nodes.uniqueID))) {
        return;
      }
      rgb = IDColor.ids[uid] || IDColor.compute(uid);
      style = span.style;
      style.color = rgb[3];
      style.backgroundColor = "rgb(" + rgb[0] + "," + rgb[1] + "," + rgb[2] + ")";
      return $.addClass(span, 'painted');
    },
    compute: function(uid) {
      var hash, rgb;
      hash = IDColor.hash(uid);
      rgb = [(hash >> 24) & 0xFF, (hash >> 16) & 0xFF, (hash >> 8) & 0xFF];
      rgb.push((rgb[0] * 0.299 + rgb[1] * 0.587 + rgb[2] * 0.114) > 125 ? '#000' : '#fff');
      return this.ids[uid] = rgb;
    },
    hash: function(uid) {
      var i, msg;
      msg = 0;
      i = 0;
      while (i < 8) {
        msg = (msg << 5) - msg + uid.charCodeAt(i++);
      }
      return msg;
    }
  };

  return IDColor;

}).call(this);

IDHighlight = (function() {
  var IDHighlight;

  IDHighlight = {
    init: function() {
      var ref;
      if ((ref = g.VIEW) !== 'index' && ref !== 'thread') {
        return;
      }
      return Callbacks.Post.push({
        name: 'Highlight by User ID',
        cb: this.node
      });
    },
    uniqueID: null,
    node: function() {
      if (this.nodes.uniqueIDRoot) {
        $.on(this.nodes.uniqueIDRoot, 'click', IDHighlight.click(this));
      }
      if (this.nodes.capcode) {
        $.on(this.nodes.capcode, 'click', IDHighlight.click(this));
      }
      if (!this.isClone) {
        return IDHighlight.set(this);
      }
    },
    set: function(post) {
      var match;
      match = (post.info.uniqueID || post.info.capcode) === IDHighlight.uniqueID;
      return $[match ? 'addClass' : 'rmClass'](post.nodes.post, 'highlight');
    },
    click: function(post) {
      return function() {
        var uniqueID;
        uniqueID = post.info.uniqueID || post.info.capcode;
        IDHighlight.uniqueID = IDHighlight.uniqueID === uniqueID ? null : uniqueID;
        return g.posts.forEach(IDHighlight.set);
      };
    }
  };

  return IDHighlight;

}).call(this);

IDPostCount = (function() {
  var IDPostCount;

  IDPostCount = {
    init: function() {
      if (!(g.VIEW === 'thread' && Conf['Count Posts by ID'])) {
        return;
      }
      Callbacks.Thread.push({
        name: 'Count Posts by ID',
        cb: function() {
          return IDPostCount.thread = this;
        }
      });
      return Callbacks.Post.push({
        name: 'Count Posts by ID',
        cb: this.node
      });
    },
    node: function() {
      if (this.nodes.uniqueID && this.thread === IDPostCount.thread) {
        return $.on(this.nodes.uniqueID, 'mouseover', IDPostCount.count);
      }
    },
    count: function() {
      var n, uniqueID;
      uniqueID = Get.postFromNode(this).info.uniqueID;
      n = 0;
      IDPostCount.thread.posts.forEach(function(post) {
        if (post.info.uniqueID === uniqueID) {
          return n++;
        }
      });
      return this.title = n + " post" + (n === 1 ? '' : 's') + " by this ID";
    }
  };

  return IDPostCount;

}).call(this);

Keybinds = (function() {
  var Keybinds;

  Keybinds = {
    init: function() {
      var hotkey, init;
      if (!Conf['Keybinds']) {
        return;
      }
      for (hotkey in Config.hotkeys) {
        $.sync(hotkey, Keybinds.sync);
      }
      init = function() {
        var i, len, node, ref;
        $.off(d, '4chanXInitFinished', init);
        $.on(d, 'keydown', Keybinds.keydown);
        ref = $$('[accesskey]');
        for (i = 0, len = ref.length; i < len; i++) {
          node = ref[i];
          node.removeAttribute('accesskey');
        }
      };
      return $.on(d, '4chanXInitFinished', init);
    },
    sync: function(key, hotkey) {
      return Conf[hotkey] = key;
    },
    keydown: function(e) {
      var form, i, key, len, notification, notifications, op, post, ref, ref1, ref2, ref3, ref4, ref5, searchInput, target, thread, threadRoot;
      if (!(key = Keybinds.keyCode(e))) {
        return;
      }
      target = e.target;
      if ((ref = target.nodeName) === 'INPUT' || ref === 'TEXTAREA') {
        if (!(/(Esc|Alt|Ctrl|Meta|Shift\+\w{2,})/.test(key) && !/^Alt\+(\d|Up|Down|Left|Right)$/.test(key))) {
          return;
        }
      }
      if (!(((ref1 = g.VIEW) !== 'index' && ref1 !== 'thread') || g.VIEW === 'index' && Conf['JSON Index'] && Conf['Index Mode'] === 'catalog' || g.VIEW === 'index' && g.BOARD.ID === 'f')) {
        threadRoot = Nav.getThread();
        if (op = $('.op', threadRoot)) {
          thread = Get.postFromNode(op).thread;
        }
      }
      switch (key) {
        case Conf['Toggle board list']:
          if (!Conf['Custom Board Navigation']) {
            return;
          }
          Header.toggleBoardList();
          break;
        case Conf['Toggle header']:
          Header.toggleBarVisibility();
          break;
        case Conf['Open empty QR']:
          if (!QR.postingIsEnabled) {
            return;
          }
          Keybinds.qr();
          break;
        case Conf['Open QR']:
          if (!(QR.postingIsEnabled && threadRoot)) {
            return;
          }
          Keybinds.qr(threadRoot);
          break;
        case Conf['Open settings']:
          Settings.open();
          break;
        case Conf['Close']:
          if (Settings.dialog) {
            Settings.close();
          } else if ((notifications = $$('.notification')).length) {
            for (i = 0, len = notifications.length; i < len; i++) {
              notification = notifications[i];
              $('.close', notification).click();
            }
          } else if (QR.nodes && !(QR.nodes.el.hidden || window.getComputedStyle(QR.nodes.form).display === 'none')) {
            if (Conf['Persistent QR']) {
              QR.hide();
            } else {
              QR.close();
            }
          } else if (Embedding.lastEmbed) {
            Embedding.closeFloat();
          } else {
            return;
          }
          break;
        case Conf['Spoiler tags']:
          if (target.nodeName !== 'TEXTAREA') {
            return;
          }
          Keybinds.tags('spoiler', target);
          break;
        case Conf['Code tags']:
          if (target.nodeName !== 'TEXTAREA') {
            return;
          }
          Keybinds.tags('code', target);
          break;
        case Conf['Eqn tags']:
          if (target.nodeName !== 'TEXTAREA') {
            return;
          }
          Keybinds.tags('eqn', target);
          break;
        case Conf['Math tags']:
          if (target.nodeName !== 'TEXTAREA') {
            return;
          }
          Keybinds.tags('math', target);
          break;
        case Conf['SJIS tags']:
          if (target.nodeName !== 'TEXTAREA') {
            return;
          }
          Keybinds.tags('sjis', target);
          break;
        case Conf['Toggle sage']:
          if (!(QR.nodes && !QR.nodes.el.hidden)) {
            return;
          }
          Keybinds.sage();
          break;
        case Conf['Toggle Cooldown']:
          if (!(QR.nodes && !QR.nodes.el.hidden && $.hasClass(QR.nodes.fileSubmit, 'custom-cooldown'))) {
            return;
          }
          QR.toggleCustomCooldown();
          break;
        case Conf['Post from URL']:
          if (!QR.postingIsEnabled) {
            return;
          }
          QR.handleUrl('');
          break;
        case Conf['Add new post']:
          if (!QR.postingIsEnabled) {
            return;
          }
          QR.addPost();
          break;
        case Conf['Submit QR']:
          if (!(QR.nodes && !QR.nodes.el.hidden)) {
            return;
          }
          if (!QR.status()) {
            QR.submit();
          }
          break;
        case Conf['Update']:
          switch (g.VIEW) {
            case 'thread':
              if (!Conf['Thread Updater']) {
                return;
              }
              ThreadUpdater.update();
              break;
            case 'index':
              if (!(Conf['JSON Index'] && g.BOARD.ID !== 'f')) {
                return;
              }
              Index.update();
              break;
            default:
              return;
          }
          break;
        case Conf['Watch']:
          if (!(ThreadWatcher.enabled && thread)) {
            return;
          }
          ThreadWatcher.toggle(thread);
          break;
        case Conf['Update thread watcher']:
          if (!ThreadWatcher.enabled) {
            return;
          }
          ThreadWatcher.buttonFetchAll();
          break;
        case Conf['Toggle thread watcher']:
          if (!ThreadWatcher.enabled) {
            return;
          }
          ThreadWatcher.toggleWatcher();
          break;
        case Conf['Mark thread read']:
          if (!(g.VIEW === 'index' && thread && UnreadIndex.enabled)) {
            return;
          }
          UnreadIndex.markRead.call(threadRoot);
          break;
        case Conf['Expand image']:
          if (!(ImageExpand.enabled && threadRoot)) {
            return;
          }
          Keybinds.img(threadRoot);
          break;
        case Conf['Expand images']:
          if (!(ImageExpand.enabled && threadRoot)) {
            return;
          }
          Keybinds.img(threadRoot, true);
          break;
        case Conf['Open Gallery']:
          if (!Gallery.enabled) {
            return;
          }
          Gallery.cb.toggle();
          break;
        case Conf['fappeTyme']:
          if (!((ref2 = FappeTyme.nodes) != null ? ref2.fappe : void 0)) {
            return;
          }
          FappeTyme.toggle('fappe');
          break;
        case Conf['werkTyme']:
          if (!((ref3 = FappeTyme.nodes) != null ? ref3.werk : void 0)) {
            return;
          }
          FappeTyme.toggle('werk');
          break;
        case Conf['Front page']:
          if (Conf['JSON Index'] && g.VIEW === 'index' && g.BOARD.ID !== 'f') {
            Index.userPageNav(1);
          } else {
            location.href = "/" + g.BOARD + "/";
          }
          break;
        case Conf['Open front page']:
          $.open(location.origin + "/" + g.BOARD + "/");
          break;
        case Conf['Next page']:
          if (!(g.VIEW === 'index' && g.BOARD.ID !== 'f')) {
            return;
          }
          if (Conf['JSON Index']) {
            if ((ref4 = Conf['Index Mode']) !== 'paged' && ref4 !== 'infinite') {
              return;
            }
            $('.next button', Index.pagelist).click();
          } else {
            if (form = $('.next form')) {
              location.href = form.action;
            }
          }
          break;
        case Conf['Previous page']:
          if (!(g.VIEW === 'index' && g.BOARD.ID !== 'f')) {
            return;
          }
          if (Conf['JSON Index']) {
            if ((ref5 = Conf['Index Mode']) !== 'paged' && ref5 !== 'infinite') {
              return;
            }
            $('.prev button', Index.pagelist).click();
          } else {
            if (form = $('.prev form')) {
              location.href = form.action;
            }
          }
          break;
        case Conf['Search form']:
          if (!(g.VIEW === 'index' && g.BOARD.ID !== 'f')) {
            return;
          }
          searchInput = Conf['JSON Index'] ? Index.searchInput : $.id('search-box');
          Header.scrollToIfNeeded(searchInput);
          searchInput.focus();
          break;
        case Conf['Paged mode']:
          if (!(Conf['JSON Index'] && g.BOARD.ID !== 'f')) {
            return;
          }
          location.href = g.VIEW === 'index' ? '#paged' : "/" + g.BOARD + "/#paged";
          break;
        case Conf['Infinite scrolling mode']:
          if (!(Conf['JSON Index'] && g.BOARD.ID !== 'f')) {
            return;
          }
          location.href = g.VIEW === 'index' ? '#infinite' : "/" + g.BOARD + "/#infinite";
          break;
        case Conf['All pages mode']:
          if (!(Conf['JSON Index'] && g.BOARD.ID !== 'f')) {
            return;
          }
          location.href = g.VIEW === 'index' ? '#all-pages' : "/" + g.BOARD + "/#all-pages";
          break;
        case Conf['Open catalog']:
          if (g.BOARD.ID === 'f') {
            return;
          }
          location.href = CatalogLinks.catalog();
          break;
        case Conf['Cycle sort type']:
          if (!(Conf['JSON Index'] && g.VIEW === 'index' && g.BOARD.ID !== 'f')) {
            return;
          }
          Index.cycleSortType();
          break;
        case Conf['Next thread']:
          if (!(g.VIEW === 'index' && threadRoot)) {
            return;
          }
          Nav.scroll(+1);
          break;
        case Conf['Previous thread']:
          if (!(g.VIEW === 'index' && threadRoot)) {
            return;
          }
          Nav.scroll(-1);
          break;
        case Conf['Expand thread']:
          if (!(g.VIEW === 'index' && threadRoot)) {
            return;
          }
          ExpandThread.toggle(thread);
          Header.scrollTo(threadRoot);
          break;
        case Conf['Open thread']:
          if (!(g.VIEW === 'index' && threadRoot)) {
            return;
          }
          Keybinds.open(thread);
          break;
        case Conf['Open thread tab']:
          if (!(g.VIEW === 'index' && threadRoot)) {
            return;
          }
          Keybinds.open(thread, true);
          break;
        case Conf['Next reply']:
          if (!threadRoot) {
            return;
          }
          Keybinds.hl(+1, threadRoot);
          break;
        case Conf['Previous reply']:
          if (!threadRoot) {
            return;
          }
          Keybinds.hl(-1, threadRoot);
          break;
        case Conf['Deselect reply']:
          if (!threadRoot) {
            return;
          }
          Keybinds.hl(0, threadRoot);
          break;
        case Conf['Hide']:
          if (!(thread && ThreadHiding.db)) {
            return;
          }
          Header.scrollTo(threadRoot);
          ThreadHiding.toggle(thread);
          break;
        case Conf['Quick Filter MD5']:
          if (!threadRoot) {
            return;
          }
          post = Keybinds.post(threadRoot);
          Keybinds.hl(+1, threadRoot);
          Filter.quickFilterMD5.call(post);
          break;
        case Conf['Previous Post Quoting You']:
          if (!(threadRoot && QuoteYou.db)) {
            return;
          }
          QuoteYou.cb.seek('preceding');
          break;
        case Conf['Next Post Quoting You']:
          if (!(threadRoot && QuoteYou.db)) {
            return;
          }
          QuoteYou.cb.seek('following');
          break;
        default:
          return;
      }
      e.preventDefault();
      return e.stopPropagation();
    },
    keyCode: function(e) {
      var kc, key;
      key = (function() {
        switch (kc = e.keyCode) {
          case 8:
            return '';
          case 13:
            return 'Enter';
          case 27:
            return 'Esc';
          case 32:
            return 'Space';
          case 37:
            return 'Left';
          case 38:
            return 'Up';
          case 39:
            return 'Right';
          case 40:
            return 'Down';
          case 188:
            return 'Comma';
          case 190:
            return 'Period';
          case 191:
            return 'Slash';
          case 59:
          case 186:
            return 'Semicolon';
          default:
            if ((48 <= kc && kc <= 57) || (65 <= kc && kc <= 90)) {
              return String.fromCharCode(kc).toLowerCase();
            } else if ((96 <= kc && kc <= 105)) {
              return String.fromCharCode(kc - 48).toLowerCase();
            } else {
              return null;
            }
        }
      })();
      if (key) {
        if (e.altKey) {
          key = 'Alt+' + key;
        }
        if (e.ctrlKey) {
          key = 'Ctrl+' + key;
        }
        if (e.metaKey) {
          key = 'Meta+' + key;
        }
        if (e.shiftKey) {
          key = 'Shift+' + key;
        }
      }
      return key;
    },
    post: function(thread) {
      return $('.post.highlight', thread) || $('.op', thread);
    },
    qr: function(thread) {
      QR.open();
      if (thread != null) {
        QR.quote.call(Keybinds.post(thread));
      }
      return QR.nodes.com.focus();
    },
    tags: function(tag, ta) {
      var range, selEnd, selStart, value;
      BoardConfig.ready(function() {
        var config, supported;
        config = g.BOARD.config;
        supported = (function() {
          switch (tag) {
            case 'spoiler':
              return !!config.spoilers;
            case 'code':
              return !!config.code_tags;
            case 'math':
            case 'eqn':
              return !!config.math_tags;
            case 'sjis':
              return !!config.sjis_tags;
          }
        })();
        if (!supported) {
          return new Notice('warning', "[" + tag + "] tags are not supported on /" + g.BOARD + "/.", 20);
        }
      });
      value = ta.value;
      selStart = ta.selectionStart;
      selEnd = ta.selectionEnd;
      ta.value = value.slice(0, selStart) + ("[" + tag + "]") + value.slice(selStart, selEnd) + ("[/" + tag + "]") + value.slice(selEnd);
      range = ("[" + tag + "]").length + selEnd;
      ta.setSelectionRange(range, range);
      return $.event('input', null, ta);
    },
    sage: function() {
      var isSage;
      isSage = /sage/i.test(QR.nodes.email.value);
      return QR.nodes.email.value = isSage ? "" : "sage";
    },
    img: function(thread, all) {
      var post;
      if (all) {
        return ImageExpand.cb.toggleAll();
      } else {
        post = Get.postFromNode(Keybinds.post(thread));
        if (post.file) {
          return ImageExpand.toggle(post);
        }
      }
    },
    open: function(thread, tab) {
      var url;
      if (g.VIEW !== 'index') {
        return;
      }
      url = "/" + thread.board + "/thread/" + thread;
      if (tab) {
        return $.open(location.origin + url);
      } else {
        return location.href = url;
      }
    },
    hl: function(delta, thread) {
      var axis, height, i, len, next, postEl, replies, reply, root;
      postEl = $('.reply.highlight', thread);
      if (!delta) {
        if (postEl) {
          $.rmClass(postEl, 'highlight');
        }
        return;
      }
      if (postEl) {
        height = postEl.getBoundingClientRect().height;
        if (Header.getTopOf(postEl) >= -height && Header.getBottomOf(postEl) >= -height) {
          root = postEl.parentNode;
          axis = delta === +1 ? 'following' : 'preceding';
          if (!(next = $.x(axis + "-sibling::div[contains(@class,'replyContainer') and not(@hidden) and not(child::div[@class='stub'])][1]/child::div[contains(@class,'reply')]", root))) {
            return;
          }
          Header.scrollToIfNeeded(next, delta === +1);
          this.focus(next);
          $.rmClass(postEl, 'highlight');
          return;
        }
        $.rmClass(postEl, 'highlight');
      }
      replies = $$('.reply', thread);
      if (delta === -1) {
        replies.reverse();
      }
      for (i = 0, len = replies.length; i < len; i++) {
        reply = replies[i];
        if (delta === +1 && Header.getTopOf(reply) > 0 || delta === -1 && Header.getBottomOf(reply) > 0) {
          this.focus(reply);
          return;
        }
      }
    },
    focus: function(post) {
      return $.addClass(post, 'highlight');
    }
  };

  return Keybinds;

}).call(this);

Nav = (function() {
  var Nav;

  Nav = {
    init: function() {
      var append, next, prev, span;
      switch (g.VIEW) {
        case 'index':
          if (!Conf['Index Navigation']) {
            return;
          }
          break;
        case 'thread':
          if (!Conf['Reply Navigation']) {
            return;
          }
          break;
        default:
          return;
      }
      span = $.el('span', {
        id: 'navlinks'
      });
      prev = $.el('a', {
        textContent: '▲',
        href: 'javascript:;'
      });
      next = $.el('a', {
        textContent: '▼',
        href: 'javascript:;'
      });
      $.on(prev, 'click', this.prev);
      $.on(next, 'click', this.next);
      $.add(span, [prev, $.tn(' '), next]);
      append = function() {
        $.off(d, '4chanXInitFinished', append);
        return $.add(d.body, span);
      };
      return $.on(d, '4chanXInitFinished', append);
    },
    prev: function() {
      if (g.VIEW === 'thread') {
        return window.scrollTo(0, 0);
      } else {
        return Nav.scroll(-1);
      }
    },
    next: function() {
      if (g.VIEW === 'thread') {
        return window.scrollTo(0, d.body.scrollHeight);
      } else {
        return Nav.scroll(+1);
      }
    },
    getThread: function() {
      var i, len, ref, thread, threadRoot;
      if ($.hasClass(doc, 'catalog-mode')) {
        return $('.board');
      }
      ref = $$('.thread');
      for (i = 0, len = ref.length; i < len; i++) {
        threadRoot = ref[i];
        thread = Get.threadFromRoot(threadRoot);
        if (thread.isHidden && !thread.stub) {
          continue;
        }
        if (Header.getTopOf(threadRoot) >= -threadRoot.getBoundingClientRect().height) {
          return threadRoot;
        }
      }
      return $('.board');
    },
    scroll: function(delta) {
      var axis, extra, next, ref, thread, top;
      if ((ref = d.activeElement) != null) {
        ref.blur();
      }
      thread = Nav.getThread();
      axis = delta === +1 ? 'following' : 'preceding';
      if (next = $.x(axis + "-sibling::div[contains(@class,'thread') and not(@hidden)][1]", thread)) {
        top = Header.getTopOf(thread);
        if (delta === +1 && top < 5 || delta === -1 && top > -5) {
          thread = next;
        }
      }
      extra = Header.getTopOf(thread) + doc.clientHeight - d.body.getBoundingClientRect().bottom;
      if (extra > 0) {
        d.body.style.marginBottom = extra + "px";
      }
      Header.scrollTo(thread);
      if (extra > 0 && !Nav.haveExtra) {
        Nav.haveExtra = true;
        return $.on(d, 'scroll', Nav.removeExtra);
      }
    },
    removeExtra: function() {
      var extra;
      extra = doc.clientHeight - d.body.getBoundingClientRect().bottom;
      if (extra > 0) {
        return d.body.style.marginBottom = extra + "px";
      } else {
        d.body.style.marginBottom = '';
        delete Nav.haveExtra;
        return $.off(d, 'scroll', Nav.removeExtra);
      }
    }
  };

  return Nav;

}).call(this);

NormalizeURL = (function() {
  var NormalizeURL;

  NormalizeURL = {
    init: function() {
      var pathname;
      if (!Conf['Normalize URL']) {
        return;
      }
      pathname = location.pathname.split(/\/+/);
      switch (g.VIEW) {
        case 'thread':
          pathname[2] = 'thread';
          pathname = pathname.slice(0, 4);
          break;
        case 'index':
          pathname = pathname.slice(0, 3);
      }
      pathname = pathname.join('/');
      if (location.pathname !== pathname) {
        return history.replaceState(history.state, '', location.protocol + "//" + location.host + pathname + location.hash);
      }
    }
  };

  return NormalizeURL;

}).call(this);

PSAHiding = (function() {
  var PSAHiding;

  PSAHiding = {
    init: function() {
      if (!Conf['Announcement Hiding']) {
        return;
      }
      $.addClass(doc, 'hide-announcement');
      return $.one(d, '4chanXInitFinished', this.setup);
    },
    setup: function() {
      var btn, entry, hr, psa, ref;
      if (!(psa = PSAHiding.psa = $.id('globalMessage'))) {
        $.rmClass(doc, 'hide-announcement');
        return;
      }
      if ((hr = (ref = $.id('globalToggle')) != null ? ref.previousElementSibling : void 0) && hr.nodeName === 'HR') {
        PSAHiding.hr = hr;
      }
      entry = {
        el: $.el('a', {
          textContent: 'Show announcement',
          className: 'show-announcement',
          href: 'javascript:;'
        }),
        order: 50,
        open: function() {
          return PSAHiding.hidden;
        }
      };
      Header.menu.addEntry(entry);
      $.on(entry.el, 'click', PSAHiding.toggle);
      PSAHiding.btn = btn = $.el('span', {
        title: 'Mark announcement as read and hide.',
        className: 'hide-announcement'
      });
      $.extend(btn, {
        innerHTML: "[<a href=\"javascript:;\">Dismiss</a>]"
      });
      $.on(btn, 'click', PSAHiding.toggle);
      $.get('hiddenPSA', 0, function(arg) {
        var hiddenPSA;
        hiddenPSA = arg.hiddenPSA;
        PSAHiding.sync(hiddenPSA);
        $.add(psa, btn);
        return $.rmClass(doc, 'hide-announcement');
      });
      return $.sync('hiddenPSA', PSAHiding.sync);
    },
    toggle: function() {
      var UTC;
      if ($.hasClass(this, 'hide-announcement')) {
        UTC = +$.id('globalMessage').dataset.utc;
        $.set('hiddenPSA', UTC);
      } else {
        $.event('CloseMenu');
        $["delete"]('hiddenPSA');
      }
      return PSAHiding.sync(UTC);
    },
    sync: function(UTC) {
      var psa, ref;
      psa = PSAHiding.psa;
      PSAHiding.hidden = PSAHiding.btn.hidden = (UTC != null) && UTC >= +psa.dataset.utc;
      if (PSAHiding.hidden) {
        $.rm(psa);
      } else {
        $.after($.id('globalToggle'), psa);
      }
      if ((ref = PSAHiding.hr) != null) {
        ref.hidden = PSAHiding.hidden;
      }
    }
  };

  return PSAHiding;

}).call(this);

RelativeDates = (function() {
  var RelativeDates,
    indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  RelativeDates = {
    INTERVAL: $.MINUTE / 2,
    init: function() {
      var ref;
      if (((ref = g.VIEW) === 'index' || ref === 'thread' || ref === 'archive') && Conf['Relative Post Dates'] && !Conf['Relative Date Title'] || Index.enabled) {
        this.flush();
        $.on(d, 'visibilitychange ThreadUpdate', this.flush);
      }
      if (Conf['Relative Post Dates']) {
        return Callbacks.Post.push({
          name: 'Relative Post Dates',
          cb: this.node
        });
      }
    },
    node: function() {
      var dateEl;
      dateEl = this.nodes.date;
      if (Conf['Relative Date Title']) {
        $.on(dateEl, 'mouseover', (function(_this) {
          return function() {
            return RelativeDates.hover(_this);
          };
        })(this));
        return;
      }
      if (this.isClone) {
        return;
      }
      dateEl.title = dateEl.textContent;
      return RelativeDates.update(this);
    },
    relative: function(diff, now, date, abbrev) {
      var days, months, number, rounded, unit, years;
      unit = (number = diff / $.DAY) >= 1 ? (years = now.getYear() - date.getYear(), months = now.getMonth() - date.getMonth(), days = now.getDate() - date.getDate(), years > 1 ? (number = years - (months < 0 || months === 0 && days < 0), 'year') : years === 1 && (months > 0 || months === 0 && days >= 0) ? (number = years, 'year') : (months = months + 12 * years) > 1 ? (number = months - (days < 0), 'month') : months === 1 && days >= 0 ? (number = months, 'month') : 'day') : (number = diff / $.HOUR) >= 1 ? 'hour' : (number = diff / $.MINUTE) >= 1 ? 'minute' : (number = Math.max(0, diff) / $.SECOND, 'second');
      rounded = Math.round(number);
      if (abbrev) {
        unit = unit === 'month' ? 'mo' : unit[0];
      } else {
        if (rounded !== 1) {
          unit += 's';
        }
      }
      if (abbrev) {
        return "" + rounded + unit;
      } else {
        return rounded + " " + unit + " ago";
      }
    },
    stale: [],
    flush: function() {
      var data, i, len, now, ref;
      if (d.hidden) {
        return;
      }
      now = new Date();
      ref = RelativeDates.stale;
      for (i = 0, len = ref.length; i < len; i++) {
        data = ref[i];
        RelativeDates.update(data, now);
      }
      RelativeDates.stale = [];
      clearTimeout(RelativeDates.timeout);
      return RelativeDates.timeout = setTimeout(RelativeDates.flush, RelativeDates.INTERVAL);
    },
    hover: function(post) {
      var date, diff, now;
      date = post.info.date;
      now = new Date();
      diff = now - date;
      return post.nodes.date.title = RelativeDates.relative(diff, now, date);
    },
    update: function(data, now) {
      var abbrev, date, diff, i, isPost, len, ref, relative, singlePost;
      isPost = data instanceof Post;
      if (isPost) {
        date = data.info.date;
        abbrev = false;
      } else {
        date = new Date(+data.dataset.utc);
        abbrev = !!data.dataset.abbrev;
      }
      now || (now = new Date());
      diff = now - date;
      relative = RelativeDates.relative(diff, now, date, abbrev);
      if (isPost) {
        ref = [data].concat(data.clones);
        for (i = 0, len = ref.length; i < len; i++) {
          singlePost = ref[i];
          singlePost.nodes.date.firstChild.textContent = relative;
        }
      } else {
        data.firstChild.textContent = relative;
      }
      return RelativeDates.setOwnTimeout(diff, data);
    },
    setOwnTimeout: function(diff, data) {
      var delay;
      delay = diff < $.MINUTE ? $.SECOND - (diff + $.SECOND / 2) % $.SECOND : diff < $.HOUR ? $.MINUTE - (diff + $.MINUTE / 2) % $.MINUTE : diff < $.DAY ? $.HOUR - (diff + $.HOUR / 2) % $.HOUR : $.DAY - (diff + $.DAY / 2) % $.DAY;
      return setTimeout(RelativeDates.markStale, delay, data);
    },
    markStale: function(data) {
      if (indexOf.call(RelativeDates.stale, data) >= 0) {
        return;
      }
      if (data instanceof Post && !g.posts[data.fullID]) {
        return;
      }
      if (data instanceof Element && !doc.contains(data)) {
        return;
      }
      return RelativeDates.stale.push(data);
    }
  };

  return RelativeDates;

}).call(this);

RemoveSpoilers = (function() {
  var RemoveSpoilers,
    slice = [].slice;

  RemoveSpoilers = {
    init: function() {
      if (Conf['Reveal Spoilers']) {
        $.addClass(doc, 'reveal-spoilers');
      }
      if (!Conf['Remove Spoilers']) {
        return;
      }
      Callbacks.Post.push({
        name: 'Reveal Spoilers',
        cb: this.node
      });
      if (g.VIEW === 'archive') {
        return $.ready(function() {
          return RemoveSpoilers.unspoiler($.id('arc-list'));
        });
      }
    },
    node: function() {
      return RemoveSpoilers.unspoiler(this.nodes.comment);
    },
    unspoiler: function(el) {
      var i, len, span, spoiler, spoilers;
      spoilers = $$('s, .spoiler', el);
      for (i = 0, len = spoilers.length; i < len; i++) {
        spoiler = spoilers[i];
        span = $.el('span', {
          className: 'removed-spoiler'
        });
        $.replace(spoiler, span);
        $.add(span, slice.call(spoiler.childNodes));
      }
    }
  };

  return RemoveSpoilers;

}).call(this);

Report = (function() {
  var Report;

  Report = {
    init: function() {
      var match;
      if (!(match = location.search.match(/\bno=(\d+)/))) {
        return;
      }
      Captcha.replace.init();
      this.postID = +match[1];
      return $.ready(this.ready);
    },
    ready: function() {
      $.addStyle(CSS.report);
      if (Conf['Archive Report']) {
        Report.archive();
      }
      new MutationObserver(function() {
        Report.fit('iframe[src^="https://www.google.com/recaptcha/api2/frame"]');
        return Report.fit('body');
      }).observe(d.body, {
        childList: true,
        attributes: true,
        subtree: true
      });
      return Report.fit('body');
    },
    fit: function(selector) {
      var dy, el;
      if (!((el = $(selector, doc)) && getComputedStyle(el).visibility !== 'hidden')) {
        return;
      }
      dy = el.getBoundingClientRect().bottom - doc.clientHeight + 8;
      if (dy > 0) {
        return window.resizeBy(0, dy);
      }
    },
    archive: function() {
      var enabled, fieldset, form, match, message, reason, submit, types, urls;
      if (!(urls = Redirect.report(g.BOARD.ID)).length) {
        return;
      }
      form = $('form');
      types = $.id('reportTypes');
      message = $('h3');
      fieldset = $.el('fieldset', {
        id: 'archive-report',
        hidden: true
      }, {
        innerHTML: "<legend><label><input id=\"archive-report-enabled\" type=\"checkbox\">Report illegal content to archives</label></legend><label for=\"archive-report-reason\">Details</label><textarea id=\"archive-report-reason\" disabled>Illegal content</textarea><button id=\"archive-report-submit\" hidden>Submit</button>"
      });
      enabled = $('#archive-report-enabled', fieldset);
      reason = $('#archive-report-reason', fieldset);
      submit = $('#archive-report-submit', fieldset);
      $.on(enabled, 'change', function() {
        return reason.disabled = !this.checked;
      });
      if (form && types) {
        fieldset.hidden = !$('[value="31"]', types).checked;
        $.on(types, 'change', function(e) {
          fieldset.hidden = e.target.value !== '31';
          return Report.fit('body');
        });
        $.after(types, fieldset);
        Report.fit('body');
        $.one(form, 'submit', function(e) {
          if (!fieldset.hidden && enabled.checked) {
            e.preventDefault();
            return Report.archiveSubmit(urls, reason.value, (function(_this) {
              return function(results) {
                _this.action = '#archiveresults=' + encodeURIComponent(JSON.stringify(results));
                return _this.submit();
              };
            })(this));
          }
        });
      } else if (message) {
        fieldset.hidden = /Report submitted!/.test(message.textContent);
        $.on(enabled, 'change', function() {
          return submit.hidden = !this.checked;
        });
        $.after(message, fieldset);
        $.on(submit, 'click', function() {
          return Report.archiveSubmit(urls, reason.value, Report.archiveResults);
        });
      }
      if ((match = location.hash.match(/^#archiveresults=(.*)$/))) {
        try {
          return Report.archiveResults(JSON.parse(decodeURIComponent(match[1])));
        } catch (_error) {}
      }
    },
    archiveSubmit: function(urls, reason, cb) {
      var fn, form, i, len, name, ref, results, url;
      form = $.formData({
        board: g.BOARD.ID,
        num: Report.postID,
        reason: reason
      });
      results = [];
      fn = function(name, url) {
        return $.ajax(url, {
          responseType: 'json',
          onloadend: function() {
            results.push([
              name, this.response || {
                error: ''
              }
            ]);
            if (results.length === urls.length) {
              return cb(results);
            }
          }
        }, {
          form: form
        });
      };
      for (i = 0, len = urls.length; i < len; i++) {
        ref = urls[i], name = ref[0], url = ref[1];
        fn(name, url);
      }
    },
    archiveResults: function(results) {
      var fieldset, i, len, line, name, ref, response;
      fieldset = $.id('archive-report');
      for (i = 0, len = results.length; i < len; i++) {
        ref = results[i], name = ref[0], response = ref[1];
        line = $.el('h3', {
          className: 'archive-report-response'
        });
        if ('success' in response) {
          $.addClass(line, 'archive-report-success');
          line.textContent = name + ": " + response.success;
        } else {
          $.addClass(line, 'archive-report-error');
          line.textContent = name + ": " + (response.error || 'Error reporting post.');
        }
        if (fieldset) {
          $.before(fieldset, line);
        } else {
          $.add(d.body, line);
        }
      }
    }
  };

  return Report;

}).call(this);

ThreadLinks = (function() {
  var ThreadLinks;

  ThreadLinks = {
    init: function() {
      if (!(g.VIEW === 'index' && Conf['Open Threads in New Tab'])) {
        return;
      }
      Callbacks.Post.push({
        name: 'Thread Links',
        cb: this.node
      });
      return Callbacks.CatalogThread.push({
        name: 'Thread Links',
        cb: this.catalogNode
      });
    },
    node: function() {
      if (this.isReply || this.isClone) {
        return;
      }
      return ThreadLinks.process(this.nodes.reply);
    },
    catalogNode: function() {
      return ThreadLinks.process(this.nodes.thumb.parentNode);
    },
    process: function(link) {
      return link.target = '_blank';
    }
  };

  return ThreadLinks;

}).call(this);

Time = (function() {
  var Time;

  Time = {
    init: function() {
      var ref;
      if (!(((ref = g.VIEW) === 'index' || ref === 'thread' || ref === 'archive') && Conf['Time Formatting'])) {
        return;
      }
      return Callbacks.Post.push({
        name: 'Time Formatting',
        cb: this.node
      });
    },
    node: function() {
      var textContent;
      if (this.isClone) {
        return;
      }
      textContent = this.nodes.date.textContent;
      return this.nodes.date.textContent = textContent.match(/^\s*/)[0] + Time.format(Conf['time'], this.info.date) + textContent.match(/\s*$/)[0];
    },
    format: function(formatString, date) {
      return formatString.replace(/%(.)/g, function(s, c) {
        if (c in Time.formatters) {
          return Time.formatters[c].call(date);
        } else {
          return s;
        }
      });
    },
    day: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    month: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    localeFormat: function(date, options, defaultValue) {
      if (Conf['timeLocale']) {
        try {
          return Intl.DateTimeFormat(Conf['timeLocale'], options).format(date);
        } catch (_error) {}
      }
      return defaultValue;
    },
    localeFormatPart: function(date, options, part, defaultValue) {
      var parts;
      if (Conf['timeLocale']) {
        try {
          parts = Intl.DateTimeFormat(Conf['timeLocale'], options).formatToParts(date);
          return parts.map(function(x) {
            if (x.type === part) {
              return x.value;
            } else {
              return '';
            }
          }).join('');
        } catch (_error) {}
      }
      return defaultValue;
    },
    zeroPad: function(n) {
      if (n < 10) {
        return "0" + n;
      } else {
        return n;
      }
    },
    formatters: {
      a: function() {
        return Time.localeFormat(this, {
          weekday: 'short'
        }, Time.day[this.getDay()].slice(0, 3));
      },
      A: function() {
        return Time.localeFormat(this, {
          weekday: 'long'
        }, Time.day[this.getDay()]);
      },
      b: function() {
        return Time.localeFormat(this, {
          month: 'short'
        }, Time.month[this.getMonth()].slice(0, 3));
      },
      B: function() {
        return Time.localeFormat(this, {
          month: 'long'
        }, Time.month[this.getMonth()]);
      },
      d: function() {
        return Time.zeroPad(this.getDate());
      },
      e: function() {
        return this.getDate();
      },
      H: function() {
        return Time.zeroPad(this.getHours());
      },
      I: function() {
        return Time.zeroPad(this.getHours() % 12 || 12);
      },
      k: function() {
        return this.getHours();
      },
      l: function() {
        return this.getHours() % 12 || 12;
      },
      m: function() {
        return Time.zeroPad(this.getMonth() + 1);
      },
      M: function() {
        return Time.zeroPad(this.getMinutes());
      },
      p: function() {
        return Time.localeFormatPart(this, {
          hour: 'numeric',
          hour12: true
        }, 'dayperiod', (this.getHours() < 12 ? 'AM' : 'PM'));
      },
      P: function() {
        return Time.formatters.p.call(this).toLowerCase();
      },
      S: function() {
        return Time.zeroPad(this.getSeconds());
      },
      y: function() {
        return this.getFullYear().toString().slice(2);
      },
      Y: function() {
        return this.getFullYear();
      },
      '%': function() {
        return '%';
      }
    }
  };

  return Time;

}).call(this);

Favicon = (function() {
  var Favicon;

  Favicon = {
    init: function() {
      return $.asap((function() {
        return d.head && (Favicon.el = $('link[rel="shortcut icon"]', d.head));
      }), Favicon.initAsap);
    },
    initAsap: function() {
      var href;
      Favicon.el.type = 'image/x-icon';
      href = Favicon.el.href;
      Favicon.isSFW = /ws\.ico$/.test(href);
      Favicon["default"] = href;
      return Favicon["switch"]();
    },
    "switch": function() {
      var f, i, items, t;
      items = {
        ferongr: ['iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAFVBMVEX///9zBQC/AADpDAP/gID/q6voCwJJTwpOAAAAAXRSTlMAQObYZgAAAGJJREFUeF5Fi7ENg0AQBCfa/AFdDh2gdwPIogMK2E2+/xLslwOvdqRJhv+GQQPUCtJM7svankLrq/I+TY5e6Ueh1jyBMX7AFJi9vwfyVO4CbbO6jNYpp9GyVPbdkFhVgAQ2H0NOE5jk9DT8AAAAAElFTkSuQmCC', 'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAxUlEQVR42q1TOwrCQBB9s0FRtJI0WoqFtSLYegoP4gVSeJsUHsHSI3iFeIqRXXgwrhlXwYHHhLwPTB7B36abBCV+0pA4DUBQUNZYQptGtW3jtoKyxgoe0yrBCoyZfL/5ioQ3URZOXW9I341l3oo+NXEZiW4CEuIzvPECopED4OaZ3RNmeAm4u+a8Jr5f17VyVoL8fr8qcltzwlyyj2iqcgPOQ9ExkHAITgD75bYBe0A5S4H/P9htuWMF3QXoQpwaKeT+lnsC6JE5I6aq6fEAAAAASUVORK5CYII=', 'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAFVBMVEX///8AcH4AtswA2PJ55fKi6fIA1/FtpPADAAAAAXRSTlMAQObYZgAAAGJJREFUeF5Fi7ENg0AQBCfa/AFdDh2gdwPIogMK2E2+/xLslwOvdqRJhv+GQQPUCtJM7svankLrq/I+TY5e6Ueh1jyBMX7AFJi9vwfyVO4CbbO6jNYpp9GyVPbdkFhVgAQ2H0NOE5jk9DT8AAAAAElFTkSuQmCC', 'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAxElEQVQ4y2NgoBq4/vE/HJOsBiRQUIfA2AzBqQYqUfn00/9FLz+BaQxDCKqBmX7jExijKEDSDJPHrnnbGQhGV4RmOFwdVkNwhQMheYwQxhaIi7b9Z9A3gWAQm2BUoQOgRhgA8o7j1ozLC4LCyAZcx6kZI5qg4kLKqggDFFWxJySsUQVzlb4pwgAJaTRvokcVNgOqOv8zcHBCsL07DgNg8YsczzA5MxtUL+DMD8g0slxI/H8GQ/P/DJKyeKIRpglXZsIiBwBhP5O+VbI/JgAAAABJRU5ErkJggg==', 'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAFVBMVEX///8oeQBJ3ABV/wHM/7Lu/+ZU/gAqUP3dAAAAAXRSTlMAQObYZgAAAGJJREFUeF5Fi7ENg0AQBCfa/AFdDh2gdwPIogMK2E2+/xLslwOvdqRJhv+GQQPUCtJM7svankLrq/I+TY5e6Ueh1jyBMX7AFJi9vwfyVO4CbbO6jNYpp9GyVPbdkFhVgAQ2H0NOE5jk9DT8AAAAAElFTkSuQmCC', 'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAx0lEQVQ4y2NgoBYI+cfwH4ZJVgMS0KhEYGyG4FQDkzjzf9P/d/+fgWl0QwiqgSkI/c8IxsgKkDXD5LFq9rwDweiK0A2HqcNqCK5wICSPEcLYAtH+AMN/IXMIBrEJRie6OEgjDAC5x3FqxuUFNiEUA67j1IweTTBxBQ1puAG86jgSEraogskJWSBcwCGF5k30qMJmgMFEhv/MXBAs5oLDAFj8IsczTE7UEeECbhU8+QGZRpaTi2b4L2zF8J9TGk80wjThykzY5AAW/2O1C2mIbgAAAABJRU5ErkJggg=='],
        'xat-': ['iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAG1BMVEX+AACLkZFub2yfaF3zZGIAAAD/AAD/iYr/zs8IPcF6AAAABXRSTlMAeprJ7xzg6IEAAABZSURBVAjXY2DABKGBSkqioQwMrGmpxsZhaQEMDGFpIa5pqSCRtPDSNJBIaGh5eShQDYOye0V7iREKAyQFYoiCFAcyILQDGcGmEEZYkGoqiMHKysAQEICwGwAAjBmBqhYlagAAAABJRU5ErkJggg==', 'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAPFBMVEUAAACEgoBva2ilamDxcG7IaWYgFBNOSEf//f0PDQwBAAA7LCwAAAD/AAD+hIX+m5z+zc5HAADPAAAGAADl032uAAAADHRSTlMAzNv0/vz+6v3+7ALrmfyXAAAAaUlEQVQY042PyxKAIAhFAc1eV7T6/3/N8VXOtAgWwBm4ANEPA8AswpySXHvvYZLlpBNrh9pDtcSqAQ1BUTVIjNUQY5icmwfglmXNgE0d6QBF9GigrU0A9LoM53U1kFzk6SBQuWfD/vHqDUCpBmVKTTM4AAAAAElFTkSuQmCC', 'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAIVBMVEUAAACRjop4dXVpZ2tdcI9dfKdisfMAAAAumMN9xv+s2/+PADT2AAAAB3RSTlMAepGdv83v3HIc4QAAAFxJREFUCNdjYMAE5YXKRuLlDAzsHe2uIRUdBQwMFR1l6R3tIJGOyukdIJHy8lkry4FqGEwzV62aFozMUAFJOQEZ4iDFhQwI7UBGaTiEUVFs3g5isLMzMBQUIOwGAJRlIu9hk08QAAAAAElFTkSuQmCC', 'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAMFBMVEUAAACAgYVlc4ljsu4AAAAAAAAAAAAumMODyP6b1P6e1f/g8v89msgSIiwNFxwbPU3tQYj5AAAABnRSTlMAxej+9VTmD9ciAAAAZElEQVQI12NgwARpiUKKYmkMDGzlZUpK6eUJDAzp5clm5WUgkfKMtnKQSFpa54o0oBoGJYvZO88+gjJu7wMyhIBS2SCGGFDxaxADpP32NjAjSe0bSFd6epIaWISNjYEhJRVhNwAGlyJpYtcvcAAAAABJRU5ErkJggg==', 'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAHlBMVEUfJSCRi5Frbm9dn19082KR/30AAABmzDOq/5vZ/9Gt/vt2AAAABnRSTlMAe5rJ7/4vxEp4AAAAWUlEQVQI12NgwARpiUpKYmkMDGzlZcbG6eUJDAzp5Slu5WUgkfLUsHKQSFpaRGsaUA2DsmvnjBAjFAZICsQQAylOZEBoBzKSzSCM9CS1MhCDjY2BISEBYTcAtgAcKSK2vuIAAAAASUVORK5CYII=', 'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAM1BMVEUAAACBj39tfm1qj2RepFlu2VQAAQAAAAAAAABmyzOX/oSr/pus/pzk/98PGgtatC4CBAI1ENblAAAACHRSTlMA09/p9v77ig0SBcQAAABnSURBVBjTjY9LDsAgCEQRsR2xWu9/2hK/adJFYQG8wABEPwyAYzNnSatjjPAiviWLhPCqI1R7HBrQdCmGBrEETTmnUAq/QMm5dODHyAQOXXR1zLUGsIEI7lonMGfeHQTq9xw4P159AIxSBSC53km7AAAAAElFTkSuQmCC'],
        Mayhem: ['iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABFklEQVR4AZ2R4WqEMBCEFy1yiJQQ14gcIhIuFBFR+qPQ93+v66QMksrlTwMfkZ2ZZbMKTgVqYIDl3YAbeCM31lJP/Zul4MAEPJjBQGNDLGsz8PQ6aqLAP5PTdd1WlmU09mSKtdTDRgrkzspJPKq6RxMahfj9yhOzQEZwZAwfzrk1ox3MXibIN8hO4MAjeV72CemJGWblnRsOYOdoGw0jebB20BPAwKzUQPlrFhrXFw1Wagu9yuzZwINzVAZCURRL+gRr7Wd8Vtqg4Th/lsUmewyk9WQ/A7NiwJz5VV/GmO+MNjMrFvh/NPDMigHTaeJN09a27ZHRJmalBg54CgfvAGYSLpoHjlmpuAwFdzDy7oGS/qIpM9UPFGg1b1kUlssAAAAASUVORK5CYII=', 'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABR0lEQVR4AYWSQWq0QBCFCw0SRIK0PQ4hiIhEZBhEySLyewUPEMgqR/JIXiDhzz7kKKYePIZajEzDRxfV9dWU3SO6IiVWUsVxT5R75Y4gTmwNnUh4kCulUiuV8sjChDjmKtaUcHgmHsnNrMPh0IVhiMIjKZGzNXDoyhMzF7C89z2KtFGD+FoNXEUKZdgpaPM8P++cDXTtBDca7EyQK8+bXTufYBccuvLAG26UnqN1LCgI4g/lm7zTgSux4vk0J8rnKw3+m1//pBPbBrVyGZVNmiAITviEtm3t+D+2QcJx7GUxlN4594K4ZY75Xzh0JVWqnad6TdP0H+LRNBjHcYNDV5xS32qwaC4my7Lwn6guu5QoomgbdFmWDYhnM8E8zxscuhLzPWtKA/dGqUizrityX9M0YX+DQ1ciXobnP6vgfmTOM7Znnk70B58pPaEvx+epAAAAAElFTkSuQmCC', 'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA/ElEQVR4AZ3RUWqEMBSF4ftQZAhSREQJIiIXpQwi+tSldkFdWPsLhyEE0ocKH2Fyzg1mNJ4KAQ1arTUeeJMH6qwTUJmCHjMcC6KKtbSIylzdXpl18J/k4fdTpUFmPLOOa9bGe+P4+n5RYYfLXuiMsAlXofBxK2QXpvwN/jqg+AY91vR+pStk+apZe0fEhhMXDhUmWXEoO9WNmrWAzvRPq7jnB2jvUGfWTEgPcJzZFTbZk/0Tnh5QI+af6lVGvq/Do2atwVL4VJ+3QrZo1lr4Pw5wzVqDWaV7SUvHrZDNmrWAHq7g0rphkS3LXDMBVqFGhxGT1gGdDFnWaab6BRmXRvbxDmYiAAAAAElFTkSuQmCC', 'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABQElEQVR4AY2SQUrEQBBFS9CMNFEkhAQdYmiCIUgcZlYGc4VsBcGVF/AuWXme4F7RtXiVWF9+Y9MYtOHRTdX/NZWaEj2RYpQTJeEdK4fKPuA7DjSGXiQkU0qlUqxySmFMEsYsNSU8zEmK4OwdEbmkKCclYoGmolfWCGyenh1O0EJE2gXNWpFC2S0IGrCQ29EbdPCPAmEHmXIxByf8hDAPD71yzAnXypatbSgoAN8Pyju5h4deMUrqJk1z+0uBN+/XX+gxfoFK2QafUJO2aRq//Q+/QIx2wr+Kwq0rusrP/QKf9MTCtbQLf9U1wNvYnz3qug45S68kSvVXgbPbx3nvYPXNOI7cRPWySukK+DcGCvA+urqZ3RmGAbmSXjFK5rpwW8nhWVJP04TYa9/3uO/goVciDiPlZhW8c8ZAHuRSeqIv32FK/GYGL8YAAAAASUVORK5CYII=', 'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA/ElEQVR4AZ3RUWqEMBSF4ftQZAihDCKKiAQJShERQx+6o662e2p/4TCEQF468BEm95yLovFr4PBEq9PjgTd5wBcZp6559AiIWDAq6KXV3aJMUMfDOsTf7Mf/XaFBAvYiE9W16b74/vl8UeBAlKOSmWAzUiXwcavMkrrFE9QXVJ+gx5q9XvUVivmqrr1jxIYLCacCs6y6S8psGNU1hw4Bu4JHuUB3pzJBHZcviLiKV9jkyO4vxHyBx1h+qlcY5b2Wj+raE0vlU33dKrNFXWsR/7EgqmtPBIXuIw+dt8osqGsOPaIGSeeGRbZiFtVxsAYeHSbMOgd0MhSzTp3mD4RaQX4aW3NMAAAAAElFTkSuQmCC', 'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABP0lEQVR4AYWS0UqFQBCGhziImNRBRImDmUgiIaF0kWSP4AMEXXXTE/QiPpL3UdR19Crb/PAvLEtyFj5mmfn/cdxd0RUokbJXEsZYCZUd4D72NBG8wkKmlEqtVMoFhTFJmKuoKelBTVIkjbNE5IainJTIeZqaXjkg8fp+Z7GCjiLQbWgOihTKsCFowUZtoNef4HgDf4JMuTbe8n/Br8NDr5zxhBul52i3FBQE+xflmzzTA69ESmpPmubunwZfztc/6IncBrXSe7/QkK5tW3f8H7dBjHH8q6Kwt033V6Hb4JeeWPgsq42rugfYZ92psWscRwMPvZIo9bEGD2+F2YUnBizLwpeoXnYpbQM34kAB9peP58aueZ4NPPRKxPusaRoYG6UizbquyH1O04T4RA+8EvAwUr6sgjFnDuReLaUn+ANygUa7+9SCWgAAAABJRU5ErkJggg=='],
        '4chanJS': ['iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAD1BMVEUBAAAAAAD/AABnZ2f///8nFk05AAAAAXRSTlMAQObYZgAAAEFJREFUeNqNjgEKACAMAjvX/98cAkkxgmSgO8Bt/Ai4ApJ6KKhzF3OiEMDASrGB/QWgPEHsUpN+Ng9xAETMYhDrWmeHAMcmvycWAAAAAElFTkSuQmCC', 'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAD1BMVEUAAAAAAAD/AABmZmYA/wBD99DBAAAAAXRSTlMAQObYZgAAAAlwSFlzAAAOxAAADsQBlSsOGwAAAE9JREFUCNdljcsRACEIQ5MOiNKAdGAJ9N/Uiu7nsMzABHgB4B8ygFoZA2hhVWavhhGeURPJU9q45+17hGbfGxa82Ndex3hEM44SJGD2/b4AzDgGlHbl388AAAAASUVORK5CYII=', 'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAD1BMVEUBAAAAAAAul8NnZ2f////82iC9AAAAAXRSTlMAQObYZgAAAEFJREFUeNqNjgEKACAMAjvX/98cAkkxgmSgO8Bt/Ai4ApJ6KKhzF3OiEMDASrGB/QWgPEHsUpN+Ng9xAETMYhDrWmeHAMcmvycWAAAAAElFTkSuQmCC', 'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAD1BMVEUAAAAAAAAul8NnZ2f/AAD7B+mqAAAAAXRSTlMAQObYZgAAAAlwSFlzAAALEgAACxIB0t1+/AAAAE9JREFUCNdljcsRACEIQ5MOiNKAdGAJ9N/Uiu7nsMzABHgB4B8ygFoZA2hhVWavhhGeURPJU9q45+17hGbfGxa82Ndex3hEM44SJGD2/b4AzDgGlHbl388AAAAASUVORK5CYII=', 'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAElBMVEUBAAAAAABmzDNlyjJnZ2f///+6o7dfAAAAAXRSTlMAQObYZgAAAERJREFUeF6NjkEKADEIA51o///lJZfQxUsHITogWi8AvwZJuxmYa25xDooBLEwOWFTYAsYVhdorLZt9Ng9xCUTCUCQ2H3F4ANrZ2WNiAAAAAElFTkSuQmCC', 'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAD1BMVEUAAAAAAABmzDNmZmb/AAC8/wCMAAAAAXRSTlMAQObYZgAAAAlwSFlzAAAOxAAADsQBlSsOGwAAAE9JREFUCNdljcsRACEIQ5MOiNKAdGAJ9N/Uiu7nsMzABHgB4B8ygFoZA2hhVWavhhGeURPJU9q45+17hGbfGxa82Ndex3hEM44SJGD2/b4AzDgGlHbl388AAAAASUVORK5CYII='],
        Original: ['iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAgMAAABinRfyAAAADFBMVEX/////AAD///8AAABBZmS3AAAAAXRSTlMAQObYZgAAAExJREFUeF4tyrENgDAMAMFXKuQswQLBG3mOlBnFS1gwDfIYLpEivvjq2MlqjmYvYg5jWEzCwtDSQlwcXKCVLrpFbvLvvSf9uZJ2HusDtJAY7Tkn1oYAAAAASUVORK5CYII=', 'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAhElEQVR42q1RwQnAMAjMu5M4guAKXa4j5dUROo5tipSDcrFChUONd0di2m/hEGVOHDyIPufgwAFASDkpoSzmBrkJ2UMyR9LsJ3rvrqo3Rt1YMIMhhNnOxLMnoMFBxHyJAr2IOBFzA8U+6pLBdmEJTA0aMVjpDd6Loks0s5HZNwYx8tfZCZ0kll7ORffZAAAAAElFTkSuQmCC', 'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAgMAAABinRfyAAAADFBMVEX///8ul8P///8AAACaqgkzAAAAAXRSTlMAQObYZgAAAExJREFUeF4tyrENgDAMAMFXKuQswQLBG3mOlBnFS1gwDfIYLpEivvjq2MlqjmYvYg5jWEzCwtDSQlwcXKCVLrpFbvLvvSf9uZJ2HusDtJAY7Tkn1oYAAAAASUVORK5CYII=', 'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAALVBMVEUAAAAAAAAAAAAAAAABBQcHFx4KISoNLToaVW4oKCgul8M4ODg7OzvBwcH///8uS/CdAAAAA3RSTlMAx9dmesIgAAAAV0lEQVR42m2NWw6AIBAD1eILZO5/XI0UAgm7H9tOsu0yGWAQSOoFijHOxOANGqm/LczpOaXs4gISrPZ+gc2+hO5w2xdwgOjBFUIF+sEJrhUl9JFr+badFwR+BfqlmGUJAAAAAElFTkSuQmCC', 'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAgMAAABinRfyAAAADFBMVEX///9mzDP///8AAACT0n1lAAAAAXRSTlMAQObYZgAAAExJREFUeF4tyrENgDAMAMFXKuQswQLBG3mOlBnFS1gwDfIYLpEivvjq2MlqjmYvYg5jWEzCwtDSQlwcXKCVLrpFbvLvvSf9uZJ2HusDtJAY7Tkn1oYAAAAASUVORK5CYII=', 'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAALVBMVEUAAAAAAAAAAAAAAAAECAIQIAgWLAsePA8oKCg4ODg6dB07OztmzDPBwcH///+rsf3XAAAAA3RSTlMAx9dmesIgAAAAV0lEQVR42m2NWw6AIBAD1eIDhbn/cTVSCCTsfmw7ybbLZIBBIKkXKKU0E4M3aKT+tjCn5xiziwuIsNr7BTb7ErrDZV/AAaIHdwgV6AcnuFaU0Eeu5dt2XiUyBjCQ2bIrAAAAAElFTkSuQmCC'],
        'Metro': ['iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAABlBMVEUAAAC/AABrZQDiAAAAAXRSTlMAQObYZgAAABJJREFUCB1jZGBgrMNAQEEc4gCSfAX5bRw/NQAAAABJRU5ErkJggg==', 'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAJFBMVEUAAAAAAAAAAAC/AAD///8dAAApAABsAAAHAAA4AACQAAAsAABMCpCvAAAAA3RSTlMAPse+s4iwAAAAMklEQVQI12NggAFmY2MDECaNAQZCilAzVJyg5oS4GqAxUtygjIp2KGOKJ5SxepcB3BUAcdYRqxAtgFoAAAAASUVORK5CYII=', 'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAABlBMVEUAAAAA1/GhpCidAAAAAXRSTlMAQObYZgAAABJJREFUCB1jZGBgrMNAQEEc4gCSfAX5bRw/NQAAAABJRU5ErkJggg==', 'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAJFBMVEUAAAAAAAAAAAAA1/H///8AISUALzQAeokACAkAQEcAorYAMTcE9WFNAAAAA3RSTlMAPse+s4iwAAAAMklEQVQI12NggAFmY2MDECaNAQZCilAzVJyg5oS4GqAxUtygjIp2KGOKJ5SxepcB3BUAcdYRqxAtgFoAAAAASUVORK5CYII=', 'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAABlBMVEUAAABV/wErM5hwAAAAAXRSTlMAQObYZgAAABJJREFUCB1jZGBgrMNAQEEc4gCSfAX5bRw/NQAAAABJRU5ErkJggg==', 'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAJFBMVEUAAAAAAAAAAABV/wH///8NKAASOAAwkQADCgAZTABAwQATOwC5e3VGAAAAA3RSTlMAPse+s4iwAAAAMklEQVQI12NggAFmY2MDECaNAQZCilAzVJyg5oS4GqAxUtygjIp2KGOKJ5SxepcB3BUAcdYRqxAtgFoAAAAASUVORK5CYII=']
      }[Conf['favicon']];
      f = Favicon;
      t = 'data:image/png;base64,';
      i = 0;
      while (items[i]) {
        items[i] = t + items[i++];
      }
      f.unreadDead = items[0], f.unreadDeadY = items[1], f.unreadSFW = items[2], f.unreadSFWY = items[3], f.unreadNSFW = items[4], f.unreadNSFWY = items[5];
      return f.update();
    },
    update: function() {
      if (this.isSFW) {
        this.unread = this.unreadSFW;
        return this.unreadY = this.unreadSFWY;
      } else {
        this.unread = this.unreadNSFW;
        return this.unreadY = this.unreadNSFWY;
      }
    },
    SFW: '//s.4cdn.org/image/favicon-ws.ico',
    NSFW: '//s.4cdn.org/image/favicon.ico',
    dead: 'data:image/gif;base64,R0lGODlhEAAQAKECAAAAAP8AAP///////yH5BAEKAAIALAAAAAAQABAAAAIvlI+pq+D9DAgUoFkPDlbs7lFZKIJOJJ3MyraoB14jFpOcVMpzrnF3OKlZYsMWowAAOw==',
    logo: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACAAgMAAAC+UIlYAAAACVBMVEUAAGcAAABmzDNZt9VtAAAAAXRSTlMAQObYZgAAAGlJREFUWMPtlkEKADEIA/tJP9lXLttQto2yHxgDHozTi0ToGK2WKZZ+HAQQMZc+xBwI4EZ+wAC2IfPuSIDOZJrSZQEAX9eVJhhwIuUYAnQe8rhAEMAZlTI2MID9f5Clyh0JeE1V1ZEAvB4qDfwuJTSGRAAAAABJRU5ErkJggg=='
  };

  return Favicon;

}).call(this);

MarkNewIPs = (function() {
  var MarkNewIPs;

  MarkNewIPs = {
    init: function() {
      if (g.VIEW !== 'thread' || !Conf['Mark New IPs']) {
        return;
      }
      return Callbacks.Thread.push({
        name: 'Mark New IPs',
        cb: this.node
      });
    },
    node: function() {
      MarkNewIPs.ipCount = this.ipCount;
      MarkNewIPs.postCount = this.posts.keys.length;
      return $.on(d, 'ThreadUpdate', MarkNewIPs.onUpdate);
    },
    onUpdate: function(e) {
      var deletedPosts, fullID, i, ipCount, j, k, len, len1, newPosts, postCount, ref;
      ref = e.detail, ipCount = ref.ipCount, postCount = ref.postCount, newPosts = ref.newPosts, deletedPosts = ref.deletedPosts;
      if (ipCount == null) {
        return;
      }
      switch (ipCount - MarkNewIPs.ipCount) {
        case postCount - MarkNewIPs.postCount + deletedPosts.length:
          i = MarkNewIPs.ipCount;
          for (j = 0, len = newPosts.length; j < len; j++) {
            fullID = newPosts[j];
            MarkNewIPs.markNew(g.posts[fullID], ++i);
          }
          break;
        case -deletedPosts.length:
          for (k = 0, len1 = newPosts.length; k < len1; k++) {
            fullID = newPosts[k];
            MarkNewIPs.markOld(g.posts[fullID]);
          }
      }
      MarkNewIPs.ipCount = ipCount;
      return MarkNewIPs.postCount = postCount;
    },
    markNew: function(post, ipCount) {
      var counter, suffix;
      suffix = (Math.floor(ipCount / 10)) % 10 === 1 ? 'th' : ['st', 'nd', 'rd'][ipCount % 10 - 1] || 'th';
      counter = $.el('span', {
        className: 'ip-counter',
        textContent: "(" + ipCount + ")"
      });
      post.nodes.nameBlock.title = "This is the " + ipCount + suffix + " IP in the thread.";
      $.add(post.nodes.nameBlock, [$.tn(' '), counter]);
      return $.addClass(post.nodes.root, 'new-ip');
    },
    markOld: function(post) {
      post.nodes.nameBlock.title = 'Not the first post from this IP.';
      return $.addClass(post.nodes.root, 'old-ip');
    }
  };

  return MarkNewIPs;

}).call(this);

ReplyPruning = (function() {
  var ReplyPruning;

  ReplyPruning = {
    init: function() {
      var el, label;
      if (!(g.VIEW === 'thread' && Conf['Reply Pruning'])) {
        return;
      }
      this.container = $.frag();
      this.summary = $.el('span', {
        hidden: true,
        className: 'summary'
      });
      this.summary.style.cursor = 'pointer';
      $.on(this.summary, 'click', (function(_this) {
        return function() {
          _this.inputs.enabled.checked = !_this.inputs.enabled.checked;
          return $.event('change', null, _this.inputs.enabled);
        };
      })(this));
      label = UI.checkbox('Prune Replies', 'Show Last', Conf['Prune All Threads']);
      el = $.el('span', {
        title: 'Maximum number of replies to show.'
      }, {
        innerHTML: " <input type=\"number\" name=\"Max Replies\" min=\"0\" step=\"1\" value=\"" + E(Conf["Max Replies"]) + "\" class=\"field\">"
      });
      $.prepend(el, label);
      this.inputs = {
        enabled: label.firstElementChild,
        replies: el.lastElementChild
      };
      this.setEnabled.call(this.inputs.enabled);
      $.on(this.inputs.enabled, 'change', this.setEnabled);
      $.on(this.inputs.replies, 'change', $.cb.value);
      Header.menu.addEntry({
        el: el,
        order: 190
      });
      return Callbacks.Thread.push({
        name: 'Reply Pruning',
        cb: this.node
      });
    },
    position: 0,
    hidden: 0,
    hiddenFiles: 0,
    total: 0,
    totalFiles: 0,
    setEnabled: function() {
      var other;
      other = QuoteThreading.input;
      if (this.checked && (other != null ? other.checked : void 0)) {
        other.checked = false;
        $.event('change', null, other);
      }
      return ReplyPruning.active = this.checked;
    },
    showIfHidden: function(id) {
      if (ReplyPruning.container && $("#" + id, ReplyPruning.container)) {
        ReplyPruning.inputs.enabled.checked = false;
        return $.event('change', null, ReplyPruning.inputs.enabled);
      }
    },
    node: function() {
      var ref;
      ReplyPruning.thread = this;
      if (this.isSticky) {
        ReplyPruning.active = ReplyPruning.inputs.enabled.checked = true;
        if (QuoteThreading.input) {
          Conf['Thread Quotes'] = QuoteThreading.input.checked = false;
        }
      }
      this.posts.forEach(function(post) {
        if (post.isReply) {
          ReplyPruning.total++;
          if (post.file) {
            return ReplyPruning.totalFiles++;
          }
        }
      });
      if (ReplyPruning.active && /^#p\d+$/.test(location.hash) && (1 <= (ref = this.posts.keys.indexOf(location.hash.slice(2))) && ref < 1 + Math.max(ReplyPruning.total - +Conf["Max Replies"], 0))) {
        ReplyPruning.active = ReplyPruning.inputs.enabled.checked = false;
      }
      $.after(this.OP.nodes.root, ReplyPruning.summary);
      $.on(ReplyPruning.inputs.enabled, 'change', ReplyPruning.update);
      $.on(ReplyPruning.inputs.replies, 'change', ReplyPruning.update);
      $.on(d, 'ThreadUpdate', ReplyPruning.updateCount);
      $.on(d, 'ThreadUpdate', ReplyPruning.update);
      return ReplyPruning.update();
    },
    updateCount: function(e) {
      var fullID, i, len, ref;
      if (e.detail[404]) {
        return;
      }
      ref = e.detail.newPosts;
      for (i = 0, len = ref.length; i < len; i++) {
        fullID = ref[i];
        ReplyPruning.total++;
        if (g.posts[fullID].file) {
          ReplyPruning.totalFiles++;
        }
      }
    },
    update: function() {
      var boardTop, frag, hidden1, hidden2, node, oldPos, post, posts;
      hidden1 = ReplyPruning.hidden;
      hidden2 = ReplyPruning.active ? Math.max(ReplyPruning.total - +Conf["Max Replies"], 0) : 0;
      oldPos = d.body.clientHeight - window.scrollY;
      posts = ReplyPruning.thread.posts;
      if (ReplyPruning.hidden < hidden2) {
        while (ReplyPruning.hidden < hidden2 && ReplyPruning.position < posts.keys.length) {
          post = posts[posts.keys[ReplyPruning.position++]];
          if (post.isReply && !post.isFetchedQuote) {
            while ((node = ReplyPruning.summary.nextSibling) && node !== post.nodes.root) {
              $.add(ReplyPruning.container, node);
            }
            $.add(ReplyPruning.container, post.nodes.root);
            ReplyPruning.hidden++;
            if (post.file) {
              ReplyPruning.hiddenFiles++;
            }
          }
        }
      } else if (ReplyPruning.hidden > hidden2) {
        frag = $.frag();
        while (ReplyPruning.hidden > hidden2 && ReplyPruning.position > 0) {
          post = posts[posts.keys[--ReplyPruning.position]];
          if (post.isReply && !post.isFetchedQuote) {
            while ((node = ReplyPruning.container.lastChild) && node !== post.nodes.root) {
              $.prepend(frag, node);
            }
            $.prepend(frag, post.nodes.root);
            ReplyPruning.hidden--;
            if (post.file) {
              ReplyPruning.hiddenFiles--;
            }
          }
        }
        $.after(ReplyPruning.summary, frag);
        $.event('PostsInserted', null, ReplyPruning.summary.parentNode);
      }
      ReplyPruning.summary.textContent = ReplyPruning.active ? Build.summaryText('+', ReplyPruning.hidden, ReplyPruning.hiddenFiles) : Build.summaryText('-', ReplyPruning.total, ReplyPruning.totalFiles);
      ReplyPruning.summary.hidden = ReplyPruning.total <= +Conf["Max Replies"];
      if (hidden1 !== hidden2 && (boardTop = Header.getTopOf($('.board'))) < 0) {
        return window.scrollBy(0, Math.max(d.body.clientHeight - oldPos, window.scrollY + boardTop) - window.scrollY);
      }
    }
  };

  return ReplyPruning;

}).call(this);

ThreadStats = (function() {
  var ThreadStats;

  ThreadStats = {
    init: function() {
      var sc, statsHTML, statsTitle;
      if (g.VIEW !== 'thread' || !Conf['Thread Stats']) {
        return;
      }
      statsHTML = {
        innerHTML: "<span id=\"post-count\">?</span> / <span id=\"file-count\">?</span>" + ((Conf["IP Count in Stats"]) ? " / <span id=\"ip-count\">?</span>" : "") + ((Conf["Page Count in Stats"]) ? " / <span id=\"page-count\">?</span>" : "")
      };
      statsTitle = 'Posts / Files';
      if (Conf['IP Count in Stats']) {
        statsTitle += ' / IPs';
      }
      if (Conf['Page Count in Stats']) {
        statsTitle += (g.BOARD.ID === 'f' ? ' / Purge Position' : ' / Page');
      }
      if (Conf['Updater and Stats in Header']) {
        this.dialog = sc = $.el('span', {
          id: 'thread-stats',
          title: statsTitle
        });
        $.extend(sc, statsHTML);
        Header.addShortcut('stats', sc, 200);
      } else {
        this.dialog = sc = UI.dialog('thread-stats', {
          innerHTML: "<div class=\"move\" title=\"" + E(statsTitle) + "\">" + (statsHTML).innerHTML + "</div>"
        });
        $.addClass(doc, 'float');
        $.ready(function() {
          return $.add(d.body, sc);
        });
      }
      this.postCountEl = $('#post-count', sc);
      this.fileCountEl = $('#file-count', sc);
      this.ipCountEl = $('#ip-count', sc);
      this.pageCountEl = $('#page-count', sc);
      if (this.pageCountEl) {
        $.on(this.pageCountEl, 'click', ThreadStats.fetchPage);
      }
      return Callbacks.Thread.push({
        name: 'Thread Stats',
        cb: this.node
      });
    },
    node: function() {
      var fileCount, postCount;
      postCount = 0;
      fileCount = 0;
      this.posts.forEach(function(post) {
        postCount++;
        if (post.file) {
          fileCount++;
        }
        if (ThreadStats.pageCountEl) {
          return ThreadStats.lastPost = post.info.date;
        }
      });
      ThreadStats.thread = this;
      ThreadStats.fetchPage();
      ThreadStats.update(postCount, fileCount, this.ipCount);
      return $.on(d, 'ThreadUpdate', ThreadStats.onUpdate);
    },
    onUpdate: function(e) {
      var fileCount, ipCount, newPosts, postCount, ref, ref1;
      if (e.detail[404]) {
        return;
      }
      ref = e.detail, postCount = ref.postCount, fileCount = ref.fileCount, ipCount = ref.ipCount, newPosts = ref.newPosts;
      ThreadStats.update(postCount, fileCount, ipCount);
      if (!ThreadStats.pageCountEl) {
        return;
      }
      if (newPosts.length) {
        ThreadStats.lastPost = g.posts[newPosts[newPosts.length - 1]].info.date;
      }
      if (g.BOARD.ID !== 'f' && ((ref1 = ThreadStats.pageCountEl) != null ? ref1.textContent : void 0) !== '1') {
        return ThreadStats.fetchPage();
      }
    },
    update: function(postCount, fileCount, ipCount) {
      var fileCountEl, ipCountEl, postCountEl, thread;
      thread = ThreadStats.thread, postCountEl = ThreadStats.postCountEl, fileCountEl = ThreadStats.fileCountEl, ipCountEl = ThreadStats.ipCountEl;
      postCountEl.textContent = postCount;
      fileCountEl.textContent = fileCount;
      if ((ipCount != null) && ipCountEl) {
        ipCountEl.textContent = ipCount;
      }
      (thread.postLimit && !thread.isSticky ? $.addClass : $.rmClass)(postCountEl, 'warning');
      return (thread.fileLimit && !thread.isSticky ? $.addClass : $.rmClass)(fileCountEl, 'warning');
    },
    fetchPage: function() {
      if (!ThreadStats.pageCountEl) {
        return;
      }
      clearTimeout(ThreadStats.timeout);
      if (ThreadStats.thread.isDead) {
        ThreadStats.pageCountEl.textContent = 'Dead';
        $.addClass(ThreadStats.pageCountEl, 'warning');
        return;
      }
      ThreadStats.timeout = setTimeout(ThreadStats.fetchPage, 2 * $.MINUTE);
      return $.ajax(location.protocol + "//a.4cdn.org/" + ThreadStats.thread.board + "/threads.json", {
        onload: ThreadStats.onThreadsLoad
      }, {
        whenModified: 'ThreadStats'
      });
    },
    onThreadsLoad: function() {
      var i, j, k, len, len1, len2, page, purgePos, ref, ref1, ref2, thread;
      if (this.status === 200) {
        ref = this.response;
        for (i = 0, len = ref.length; i < len; i++) {
          page = ref[i];
          if (g.BOARD.ID === 'f') {
            purgePos = 1;
            ref1 = page.threads;
            for (j = 0, len1 = ref1.length; j < len1; j++) {
              thread = ref1[j];
              if (thread.no < ThreadStats.thread.ID) {
                purgePos++;
              }
            }
            ThreadStats.pageCountEl.textContent = purgePos;
          } else {
            ref2 = page.threads;
            for (k = 0, len2 = ref2.length; k < len2; k++) {
              thread = ref2[k];
              if (!(thread.no === ThreadStats.thread.ID)) {
                continue;
              }
              ThreadStats.pageCountEl.textContent = page.page;
              (page.page === this.response.length ? $.addClass : $.rmClass)(ThreadStats.pageCountEl, 'warning');
              ThreadStats.lastPageUpdate = new Date(thread.last_modified * $.SECOND);
              ThreadStats.retry();
              return;
            }
          }
        }
      } else if (this.status === 304) {
        return ThreadStats.retry();
      }
    },
    retry: function() {
      var ref;
      if (g.BOARD.ID !== 'f' && ThreadStats.lastPost > ThreadStats.lastPageUpdate && ((ref = ThreadStats.pageCountEl) != null ? ref.textContent : void 0) !== '1') {
        clearTimeout(ThreadStats.timeout);
        return ThreadStats.timeout = setTimeout(ThreadStats.fetchPage, 5 * $.SECOND);
      }
    }
  };

  return ThreadStats;

}).call(this);

ThreadUpdater = (function() {
  var ThreadUpdater,
    indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  ThreadUpdater = {
    init: function() {
      var conf, el, input, name, ref, sc, subEntries, updateLink;
      if (g.VIEW !== 'thread' || !Conf['Thread Updater']) {
        return;
      }
      this.audio = $.el('audio');
      if ($.engine !== 'gecko') {
        this.audio.src = this.beep;
      }
      if (Conf['Updater and Stats in Header']) {
        this.dialog = sc = $.el('span', {
          id: 'updater'
        });
        $.extend(sc, {
          innerHTML: "<span id=\"update-status\" class=\"empty\"></span><span id=\"update-timer\" class=\"empty\" title=\"Update now\"></span>"
        });
        Header.addShortcut('updater', sc, 100);
      } else {
        this.dialog = sc = UI.dialog('updater', {
          innerHTML: "<div class=\"move\"></div><span id=\"update-status\" class=\"empty\"></span><span id=\"update-timer\" class=\"empty\" title=\"Update now\"></span>"
        });
        $.addClass(doc, 'float');
        $.ready(function() {
          return $.add(d.body, sc);
        });
      }
      this.checkPostCount = 0;
      this.timer = $('#update-timer', sc);
      this.status = $('#update-status', sc);
      $.on(this.timer, 'click', this.update);
      $.on(this.status, 'click', this.update);
      updateLink = $.el('span', {
        className: 'brackets-wrap updatelink'
      });
      $.extend(updateLink, {
        innerHTML: "<a href=\"javascript:;\">Update</a>"
      });
      Main.ready(function() {
        var navLinksBot;
        if ((navLinksBot = $('.navLinksBot'))) {
          return $.add(navLinksBot, [$.tn(' '), updateLink]);
        }
      });
      $.on(updateLink.firstElementChild, 'click', this.update);
      subEntries = [];
      ref = Config.updater.checkbox;
      for (name in ref) {
        conf = ref[name];
        el = UI.checkbox(name, name);
        el.title = conf[1];
        input = el.firstElementChild;
        $.on(input, 'change', $.cb.checked);
        if (input.name === 'Scroll BG') {
          $.on(input, 'change', this.cb.scrollBG);
          this.cb.scrollBG();
        } else if (input.name === 'Auto Update') {
          $.on(input, 'change', this.setInterval);
        }
        subEntries.push({
          el: el
        });
      }
      this.settings = $.el('span', {
        innerHTML: "<a href=\"javascript:;\">Interval</a>"
      });
      $.on(this.settings, 'click', this.intervalShortcut);
      subEntries.push({
        el: this.settings
      });
      Header.menu.addEntry(this.entry = {
        el: $.el('span', {
          textContent: 'Updater'
        }),
        order: 110,
        subEntries: subEntries
      });
      return Callbacks.Thread.push({
        name: 'Thread Updater',
        cb: this.node
      });
    },
    node: function() {
      ThreadUpdater.thread = this;
      ThreadUpdater.root = this.nodes.root;
      ThreadUpdater.outdateCount = 0;
      ThreadUpdater.postIDs = [];
      ThreadUpdater.fileIDs = [];
      this.posts.forEach(function(post) {
        ThreadUpdater.postIDs.push(post.ID);
        if (post.file) {
          return ThreadUpdater.fileIDs.push(post.ID);
        }
      });
      ThreadUpdater.cb.interval.call($.el('input', {
        value: Conf['Interval']
      }));
      $.on(d, 'QRPostSuccessful', ThreadUpdater.cb.checkpost);
      $.on(d, 'visibilitychange', ThreadUpdater.cb.visibility);
      return ThreadUpdater.setInterval();
    },

    /*
    http://freesound.org/people/pierrecartoons1979/sounds/90112/
    cc-by-nc-3.0
     */
    beep: 'data:audio/wav;base64,UklGRjQDAABXQVZFZm10IBAAAAABAAEAgD4AAIA+AAABAAgAc21wbDwAAABBAAADAAAAAAAAAAA8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABkYXRhzAIAAGMms8em0tleMV4zIpLVo8nhfSlcPR102Ki+5JspVEkdVtKzs+K1NEhUIT7DwKrcy0g6WygsrM2k1NpiLl0zIY/WpMrjgCdbPhxw2Kq+5Z4qUkkdU9K1s+K5NkVTITzBwqnczko3WikrqM+l1NxlLF0zIIvXpsnjgydZPhxs2ay95aIrUEkdUdC3suK8N0NUIjq+xKrcz002WioppdGm091pK1w0IIjYp8jkhydXPxxq2K295aUrTkoeTs65suK+OUFUIzi7xqrb0VA0WSoootKm0t5tKlo1H4TYqMfkiydWQBxm16+85actTEseS8y7seHAPD9TIza5yKra01QyWSson9On0d5wKVk2H4DYqcfkjidUQB1j1rG75KsvSkseScu8seDCPz1TJDW2yara1FYxWSwnm9Sn0N9zKVg2H33ZqsXkkihSQR1g1bK65K0wSEsfR8i+seDEQTxUJTOzy6rY1VowWC0mmNWoz993KVc3H3rYq8TklSlRQh1d1LS647AyR0wgRMbAsN/GRDpTJTKwzKrX1l4vVy4lldWpzt97KVY4IXbUr8LZljVPRCxhw7W3z6ZISkw1VK+4sMWvXEhSPk6buay9sm5JVkZNiLWqtrJ+TldNTnquqbCwilZXU1BwpKirrpNgWFhTaZmnpquZbFlbVmWOpaOonHZcXlljhaGhpZ1+YWBdYn2cn6GdhmdhYGN3lp2enIttY2Jjco+bnJuOdGZlZXCImJqakHpoZ2Zug5WYmZJ/bGlobX6RlpeSg3BqaW16jZSVkoZ0bGtteImSk5KIeG5tbnaFkJKRinxxbm91gY2QkIt/c3BwdH6Kj4+LgnZxcXR8iI2OjIR5c3J0e4WLjYuFe3VzdHmCioyLhn52dHR5gIiKioeAeHV1eH+GiYqHgXp2dnh9hIiJh4J8eHd4fIKHiIeDfXl4eHyBhoeHhH96eHmA',
    playBeep: function() {
      var audio;
      audio = ThreadUpdater.audio;
      audio.src || (audio.src = ThreadUpdater.beep);
      if (audio.paused) {
        return audio.play();
      } else {
        return $.one(audio, 'ended', ThreadUpdater.playBeep);
      }
    },
    cb: {
      checkpost: function(e) {
        if (e.detail.threadID !== ThreadUpdater.thread.ID) {
          return;
        }
        ThreadUpdater.postID = e.detail.postID;
        ThreadUpdater.checkPostCount = 0;
        ThreadUpdater.outdateCount = 0;
        return ThreadUpdater.setInterval();
      },
      visibility: function() {
        if (d.hidden) {
          return;
        }
        ThreadUpdater.outdateCount = 0;
        if (ThreadUpdater.seconds > ThreadUpdater.interval) {
          return ThreadUpdater.setInterval();
        }
      },
      scrollBG: function() {
        return ThreadUpdater.scrollBG = Conf['Scroll BG'] ? function() {
          return true;
        } : function() {
          return !d.hidden;
        };
      },
      interval: function(e) {
        var val;
        val = parseInt(this.value, 10);
        if (val < 1) {
          val = 1;
        }
        ThreadUpdater.interval = this.value = val;
        if (e) {
          return $.cb.value.call(this);
        }
      },
      load: function() {
        var req;
        req = ThreadUpdater.req;
        switch (req.status) {
          case 200:
            ThreadUpdater.parse(req);
            if (ThreadUpdater.thread.isArchived) {
              return ThreadUpdater.kill();
            } else {
              return ThreadUpdater.setInterval();
            }
            break;
          case 404:
            return $.ajax(location.protocol + "//a.4cdn.org/" + ThreadUpdater.thread.board + "/catalog.json", {
              onloadend: function() {
                var confirmed, i, k, len, len1, page, ref, ref1, thread;
                if (this.status === 200) {
                  confirmed = true;
                  ref = this.response;
                  for (i = 0, len = ref.length; i < len; i++) {
                    page = ref[i];
                    ref1 = page.threads;
                    for (k = 0, len1 = ref1.length; k < len1; k++) {
                      thread = ref1[k];
                      if (thread.no === ThreadUpdater.thread.ID) {
                        confirmed = false;
                        break;
                      }
                    }
                  }
                } else {
                  confirmed = false;
                }
                if (confirmed) {
                  return ThreadUpdater.kill();
                } else {
                  return ThreadUpdater.error(req);
                }
              }
            });
          default:
            return ThreadUpdater.error(req);
        }
      }
    },
    kill: function() {
      ThreadUpdater.thread.kill();
      ThreadUpdater.setInterval();
      return $.event('ThreadUpdate', {
        404: true,
        threadID: ThreadUpdater.thread.fullID
      });
    },
    error: function(req) {
      if (req.status === 304) {
        ThreadUpdater.set('status', '');
      }
      ThreadUpdater.setInterval();
      if (!req.status) {
        return ThreadUpdater.set('status', 'Connection Error', 'warning');
      } else if (req.status !== 304) {
        return ThreadUpdater.set('status', req.statusText + " (" + req.status + ")", 'warning');
      }
    },
    setInterval: function() {
      var cur, interval, j, limit;
      clearTimeout(ThreadUpdater.timeoutID);
      if (ThreadUpdater.thread.isDead) {
        ThreadUpdater.set('status', (ThreadUpdater.thread.isArchived ? 'Archived' : '404'), 'warning');
        ThreadUpdater.set('timer', '');
        return;
      }
      if (ThreadUpdater.postID && ThreadUpdater.checkPostCount < 5) {
        ThreadUpdater.set('timer', '...', 'loading');
        ThreadUpdater.timeoutID = setTimeout(ThreadUpdater.update, ++ThreadUpdater.checkPostCount * $.SECOND);
        return;
      }
      if (!Conf['Auto Update']) {
        ThreadUpdater.set('timer', 'Update');
        return;
      }
      interval = ThreadUpdater.interval;
      if (Conf['Optional Increase']) {
        limit = d.hidden ? 10 : 5;
        j = Math.min(ThreadUpdater.outdateCount, limit);
        cur = (Math.floor(interval * 0.1) || 1) * j * j;
        ThreadUpdater.seconds = $.minmax(cur, interval, 300);
      } else {
        ThreadUpdater.seconds = interval;
      }
      return ThreadUpdater.timeout();
    },
    intervalShortcut: function() {
      var settings;
      Settings.open('Advanced');
      settings = $.id('fourchanx-settings');
      return $('input[name=Interval]', settings).focus();
    },
    set: function(name, text, klass) {
      var el, node;
      el = ThreadUpdater[name];
      if (node = el.firstChild) {
        node.data = text;
      } else {
        el.textContent = text;
      }
      return el.className = klass != null ? klass : (text === '' ? 'empty' : '');
    },
    timeout: function() {
      if (ThreadUpdater.seconds) {
        ThreadUpdater.set('timer', ThreadUpdater.seconds);
        ThreadUpdater.timeoutID = setTimeout(ThreadUpdater.timeout, 1000);
      } else {
        ThreadUpdater.outdateCount++;
        ThreadUpdater.update();
      }
      return ThreadUpdater.seconds--;
    },
    update: function() {
      var ref;
      clearTimeout(ThreadUpdater.timeoutID);
      ThreadUpdater.set('timer', '...', 'loading');
      if ((ref = ThreadUpdater.req) != null) {
        ref.abort();
      }
      return ThreadUpdater.req = $.ajax(location.protocol + "//a.4cdn.org/" + ThreadUpdater.thread.board + "/thread/" + ThreadUpdater.thread + ".json", {
        onloadend: ThreadUpdater.cb.load,
        timeout: $.MINUTE
      }, {
        whenModified: 'ThreadUpdater'
      });
    },
    updateThreadStatus: function(type, status) {
      var change, hasChanged;
      if (!(hasChanged = ThreadUpdater.thread["is" + type] !== status)) {
        return;
      }
      ThreadUpdater.thread.setStatus(type, status);
      if (type === 'Closed' && ThreadUpdater.thread.isArchived) {
        return;
      }
      change = type === 'Sticky' ? status ? 'now a sticky' : 'not a sticky anymore' : status ? 'now closed' : 'not closed anymore';
      return new Notice('info', "The thread is " + change + ".", 30);
    },
    parse: function(req) {
      var ID, OP, board, deletedFiles, deletedPosts, files, firstPost, i, index, ipCountEl, k, l, lastPost, len, len1, len2, len3, m, newPosts, node, post, postObject, postObjects, posts, ref, ref1, ref2, ref3, ref4, ref5, ref6, ref7, scroll, thread, unreadCount, unreadQYCount;
      postObjects = req.response.posts;
      OP = postObjects[0];
      thread = ThreadUpdater.thread;
      board = thread.board;
      ref = ThreadUpdater.postIDs, lastPost = ref[ref.length - 1];
      if (postObjects[postObjects.length - 1].no < lastPost && new Date(req.getResponseHeader('Last-Modified')) - thread.posts[lastPost].info.date < 30 * $.SECOND) {
        return;
      }
      Build.spoilerRange[board] = OP.custom_spoiler;
      thread.setStatus('Archived', !!OP.archived);
      ThreadUpdater.updateThreadStatus('Sticky', !!OP.sticky);
      ThreadUpdater.updateThreadStatus('Closed', !!OP.closed);
      thread.postLimit = !!OP.bumplimit;
      thread.fileLimit = !!OP.imagelimit;
      if (OP.unique_ips != null) {
        thread.ipCount = OP.unique_ips;
      }
      posts = [];
      index = [];
      files = [];
      newPosts = [];
      for (i = 0, len = postObjects.length; i < len; i++) {
        postObject = postObjects[i];
        ID = postObject.no;
        index.push(ID);
        if (postObject.fsize) {
          files.push(ID);
        }
        if (ID <= lastPost) {
          continue;
        }
        if ((post = thread.posts[ID]) && !post.isFetchedQuote) {
          post.resurrect();
          continue;
        }
        newPosts.push(board + "." + ID);
        node = Build.postFromObject(postObject, board.ID);
        posts.push(new Post(node, thread, board));
        if (ThreadUpdater.postID === ID) {
          delete ThreadUpdater.postID;
        }
      }
      deletedPosts = [];
      ref1 = ThreadUpdater.postIDs;
      for (k = 0, len1 = ref1.length; k < len1; k++) {
        ID = ref1[k];
        if (!(indexOf.call(index, ID) < 0)) {
          continue;
        }
        thread.posts[ID].kill();
        deletedPosts.push(board + "." + ID);
      }
      ThreadUpdater.postIDs = index;
      deletedFiles = [];
      ref2 = ThreadUpdater.fileIDs;
      for (l = 0, len2 = ref2.length; l < len2; l++) {
        ID = ref2[l];
        if (!(!(indexOf.call(files, ID) >= 0 || (ref3 = board + "." + ID, indexOf.call(deletedPosts, ref3) >= 0)))) {
          continue;
        }
        thread.posts[ID].kill(true);
        deletedFiles.push(board + "." + ID);
      }
      ThreadUpdater.fileIDs = files;
      if (!posts.length) {
        ThreadUpdater.set('status', '');
      } else {
        ThreadUpdater.set('status', "+" + posts.length, 'new');
        ThreadUpdater.outdateCount = 0;
        unreadCount = (ref4 = Unread.posts) != null ? ref4.size : void 0;
        unreadQYCount = (ref5 = Unread.postsQuotingYou) != null ? ref5.size : void 0;
        Main.callbackNodes('Post', posts);
        if (d.hidden || !d.hasFocus()) {
          if (Conf['Beep Quoting You'] && ((ref6 = Unread.postsQuotingYou) != null ? ref6.size : void 0) > unreadQYCount) {
            ThreadUpdater.playBeep();
            if (Conf['Beep']) {
              ThreadUpdater.playBeep();
            }
          } else if (Conf['Beep'] && ((ref7 = Unread.posts) != null ? ref7.size : void 0) > 0 && unreadCount === 0) {
            ThreadUpdater.playBeep();
          }
        }
        scroll = Conf['Auto Scroll'] && ThreadUpdater.scrollBG() && ThreadUpdater.root.getBoundingClientRect().bottom - doc.clientHeight < 25;
        firstPost = null;
        for (m = 0, len3 = posts.length; m < len3; m++) {
          post = posts[m];
          if (!QuoteThreading.insert(post)) {
            firstPost || (firstPost = post.nodes.root);
            $.add(ThreadUpdater.root, post.nodes.root);
          }
        }
        $.event('PostsInserted', null, ThreadUpdater.root);
        if (scroll) {
          if (Conf['Bottom Scroll']) {
            window.scrollTo(0, d.body.clientHeight);
          } else {
            if (firstPost) {
              Header.scrollTo(firstPost);
            }
          }
        }
      }
      if ((OP.unique_ips != null) && (ipCountEl = $.id('unique-ips'))) {
        ipCountEl.textContent = OP.unique_ips;
        ipCountEl.previousSibling.textContent = ipCountEl.previousSibling.textContent.replace(/\b(?:is|are)\b/, OP.unique_ips === 1 ? 'is' : 'are');
        ipCountEl.nextSibling.textContent = ipCountEl.nextSibling.textContent.replace(/\bposters?\b/, OP.unique_ips === 1 ? 'poster' : 'posters');
      }
      return $.event('ThreadUpdate', {
        404: false,
        threadID: thread.fullID,
        newPosts: newPosts,
        deletedPosts: deletedPosts,
        deletedFiles: deletedFiles,
        postCount: OP.replies + 1,
        fileCount: OP.images + !!OP.fsize,
        ipCount: OP.unique_ips
      });
    }
  };

  return ThreadUpdater;

}).call(this);

ThreadWatcher = (function() {
  var ThreadWatcher,
    indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; },
    slice = [].slice;

  ThreadWatcher = {
    init: function() {
      var ref, sc;
      if (!(this.enabled = Conf['Thread Watcher'])) {
        return;
      }
      this.shortcut = sc = $.el('a', {
        id: 'watcher-link',
        textContent: 'Watcher',
        title: 'Thread Watcher',
        href: 'javascript:;',
        className: 'fa fa-eye'
      });
      this.db = new DataBoard('watchedThreads', this.refresh, true);
      this.dialog = UI.dialog('thread-watcher', {
        innerHTML: "<div class=\"move\">Thread Watcher <a class=\"refresh fa fa-refresh\" title=\"Check threads\" href=\"javascript:;\"></a><span id=\"watcher-status\"></span><a class=\"menu-button\" href=\"javascript:;\"><i class=\"fa fa-angle-down\"></i></a><a class=\"close\" href=\"javascript:;\">×</a></div><div id=\"watched-threads\"></div>"
      });
      this.status = $('#watcher-status', this.dialog);
      this.list = this.dialog.lastElementChild;
      this.refreshButton = $('.refresh', this.dialog);
      this.closeButton = $('.move > .close', this.dialog);
      this.unreaddb = Unread.db || UnreadIndex.db || new DataBoard('lastReadPosts');
      this.unreadEnabled = Conf['Remember Last Read Post'];
      $.on(d, 'QRPostSuccessful', this.cb.post);
      $.on(sc, 'click', this.toggleWatcher);
      $.on(this.refreshButton, 'click', this.buttonFetchAll);
      $.on(this.closeButton, 'click', this.toggleWatcher);
      if (Site.software !== 'yotsuba') {
        this.refreshButton.hidden = true;
      }
      this.menu.addHeaderMenuEntry();
      $.onExists(doc, 'body', this.addDialog);
      switch (g.VIEW) {
        case 'index':
          $.on(d, 'IndexUpdate', this.cb.onIndexUpdate);
          break;
        case 'thread':
          $.on(d, 'ThreadUpdate', this.cb.onThreadRefresh);
      }
      if (Conf['Fixed Thread Watcher']) {
        $.addClass(doc, 'fixed-watcher');
      }
      if (!Conf['Persistent Thread Watcher']) {
        $.addClass(ThreadWatcher.shortcut, 'disabled');
        this.dialog.hidden = true;
      }
      Header.addShortcut('watcher', sc, 510);
      ThreadWatcher.fetchAuto();
      $.on(window, 'visibilitychange focus', function() {
        return $.queueTask(ThreadWatcher.fetchAuto);
      });
      if (Conf['Menu'] && Index.enabled) {
        Menu.menu.addEntry({
          el: $.el('a', {
            href: 'javascript:;',
            className: 'has-shortcut-text'
          }, {
            innerHTML: "<span></span><span class=\"shortcut-text\">Alt+click</span>"
          }),
          order: 6,
          open: function(arg) {
            var thread;
            thread = arg.thread;
            if (Conf['Index Mode'] !== 'catalog') {
              return false;
            }
            this.el.firstElementChild.textContent = ThreadWatcher.isWatched(thread) ? 'Unwatch' : 'Watch';
            if (this.cb) {
              $.off(this.el, 'click', this.cb);
            }
            this.cb = function() {
              $.event('CloseMenu');
              return ThreadWatcher.toggle(thread);
            };
            $.on(this.el, 'click', this.cb);
            return true;
          }
        });
      }
      if ((ref = g.VIEW) !== 'index' && ref !== 'thread') {
        return;
      }
      Callbacks.Post.push({
        name: 'Thread Watcher',
        cb: this.node
      });
      return Callbacks.CatalogThread.push({
        name: 'Thread Watcher',
        cb: this.catalogNode
      });
    },
    isWatched: function(thread) {
      var ref;
      return !!((ref = ThreadWatcher.db) != null ? ref.get({
        boardID: thread.board.ID,
        threadID: thread.ID
      }) : void 0);
    },
    isWatchedRaw: function(boardID, threadID) {
      var ref;
      return !!((ref = ThreadWatcher.db) != null ? ref.get({
        boardID: boardID,
        threadID: threadID
      }) : void 0);
    },
    setToggler: function(toggler, isWatched) {
      toggler.classList.toggle('watched', isWatched);
      return toggler.title = (isWatched ? 'Unwatch' : 'Watch') + " Thread";
    },
    node: function() {
      var boardID, data, threadID, toggler;
      if (this.isReply) {
        return;
      }
      if (this.isClone) {
        toggler = $('.watch-thread-link', this.nodes.info);
      } else {
        toggler = $.el('a', {
          href: 'javascript:;',
          className: 'watch-thread-link'
        });
        $.before($('input', this.nodes.info), toggler);
      }
      boardID = this.board.ID;
      threadID = this.thread.ID;
      data = ThreadWatcher.db.get({
        boardID: boardID,
        threadID: threadID
      });
      ThreadWatcher.setToggler(toggler, !!data);
      $.on(toggler, 'click', ThreadWatcher.cb.toggle);
      if (data && (data.excerpt == null)) {
        return $.queueTask((function(_this) {
          return function() {
            ThreadWatcher.db.extend({
              boardID: boardID,
              threadID: threadID,
              val: {
                excerpt: Get.threadExcerpt(_this.thread)
              }
            });
            return ThreadWatcher.refresh();
          };
        })(this));
      }
    },
    catalogNode: function() {
      if (ThreadWatcher.isWatched(this.thread)) {
        $.addClass(this.nodes.root, 'watched');
      }
      return $.on(this.nodes.root, 'mousedown click', (function(_this) {
        return function(e) {
          if (!(e.button === 0 && e.altKey)) {
            return;
          }
          if (e.type === 'click') {
            ThreadWatcher.toggle(_this.thread);
          }
          return e.preventDefault();
        };
      })(this));
    },
    addDialog: function() {
      if (!Main.isThisPageLegit()) {
        return;
      }
      ThreadWatcher.build();
      return $.prepend(d.body, ThreadWatcher.dialog);
    },
    toggleWatcher: function() {
      $.toggleClass(ThreadWatcher.shortcut, 'disabled');
      return ThreadWatcher.dialog.hidden = !ThreadWatcher.dialog.hidden;
    },
    cb: {
      openAll: function() {
        var a, i, len1, ref;
        if ($.hasClass(this, 'disabled')) {
          return;
        }
        ref = $$('a[title]', ThreadWatcher.list);
        for (i = 0, len1 = ref.length; i < len1; i++) {
          a = ref[i];
          $.open(a.href);
        }
        return $.event('CloseMenu');
      },
      pruneDeads: function() {
        var boardID, data, i, len1, ref, ref1, siteID, threadID;
        if ($.hasClass(this, 'disabled')) {
          return;
        }
        ref = ThreadWatcher.getAll();
        for (i = 0, len1 = ref.length; i < len1; i++) {
          ref1 = ref[i], siteID = ref1.siteID, boardID = ref1.boardID, threadID = ref1.threadID, data = ref1.data;
          if (data.isDead) {
            ThreadWatcher.db["delete"]({
              siteID: siteID,
              boardID: boardID,
              threadID: threadID
            });
          }
        }
        ThreadWatcher.refresh();
        return $.event('CloseMenu');
      },
      toggle: function() {
        var thread;
        thread = Get.postFromNode(this).thread;
        return ThreadWatcher.toggle(thread);
      },
      rm: function() {
        var boardID, ref, siteID, threadID;
        siteID = this.parentNode.dataset.siteID;
        ref = this.parentNode.dataset.fullID.split('.'), boardID = ref[0], threadID = ref[1];
        return ThreadWatcher.rm(siteID, boardID, +threadID);
      },
      post: function(e) {
        var boardID, postID, ref, threadID;
        ref = e.detail, boardID = ref.boardID, threadID = ref.threadID, postID = ref.postID;
        if (postID === threadID) {
          if (Conf['Auto Watch']) {
            return ThreadWatcher.addRaw(boardID, threadID, {});
          }
        } else if (Conf['Auto Watch Reply']) {
          return ThreadWatcher.add(g.threads[boardID + '.' + threadID]);
        }
      },
      onIndexUpdate: function(e) {
        var boardID, data, db, nKilled, ref, ref1, siteID, threadID;
        db = ThreadWatcher.db;
        siteID = Site.hostname;
        boardID = g.BOARD.ID;
        nKilled = 0;
        ref = db.data[siteID].boards[boardID];
        for (threadID in ref) {
          data = ref[threadID];
          if (!(!(data != null ? data.isDead : void 0) && (ref1 = boardID + "." + threadID, indexOf.call(e.detail.threads, ref1) < 0))) {
            continue;
          }
          if (!e.detail.threads.some(function(fullID) {
            return +fullID.split('.')[1] > threadID;
          })) {
            continue;
          }
          nKilled++;
          if (Conf['Auto Prune'] || !(data && typeof data === 'object')) {
            db["delete"]({
              boardID: boardID,
              threadID: threadID
            });
          } else {
            db.extend({
              boardID: boardID,
              threadID: threadID,
              val: {
                isDead: true
              }
            });
            if (ThreadWatcher.unreadEnabled && Conf['Show Unread Count']) {
              ThreadWatcher.fetchStatus({
                siteID: siteID,
                boardID: boardID,
                threadID: threadID,
                data: data
              });
            }
          }
        }
        if (nKilled) {
          return ThreadWatcher.refresh();
        }
      },
      onThreadRefresh: function(e) {
        var thread;
        thread = g.threads[e.detail.threadID];
        if (!(e.detail[404] && ThreadWatcher.isWatched(thread))) {
          return;
        }
        return ThreadWatcher.add(thread);
      }
    },
    requests: [],
    fetched: 0,
    clearRequests: function() {
      ThreadWatcher.requests = [];
      ThreadWatcher.fetched = 0;
      ThreadWatcher.status.textContent = '';
      return $.rmClass(ThreadWatcher.refreshButton, 'fa-spin');
    },
    abort: function() {
      var i, len1, ref, req;
      ref = ThreadWatcher.requests;
      for (i = 0, len1 = ref.length; i < len1; i++) {
        req = ref[i];
        if (req.readyState !== 4) {
          req.abort();
        }
      }
      return ThreadWatcher.clearRequests();
    },
    fetchAuto: function() {
      var db, interval, now, ref;
      if (Site.software !== 'yotsuba') {
        return;
      }
      clearTimeout(ThreadWatcher.timeout);
      if (!Conf['Auto Update Thread Watcher']) {
        return;
      }
      db = ThreadWatcher.db;
      interval = ThreadWatcher.unreadEnabled && Conf['Show Unread Count'] ? 5 * $.MINUTE : 2 * $.HOUR;
      now = Date.now();
      if (!((now - interval < (ref = db.data[Site.hostname].lastChecked || 0) && ref <= now) || d.hidden || !d.hasFocus())) {
        ThreadWatcher.fetchAllStatus();
        db.setLastChecked();
      }
      return ThreadWatcher.timeout = setTimeout(ThreadWatcher.fetchAuto, interval);
    },
    buttonFetchAll: function() {
      if (ThreadWatcher.requests.length) {
        return ThreadWatcher.abort();
      } else {
        return ThreadWatcher.fetchAllStatus();
      }
    },
    fetchAllStatus: function() {
      var db, dbs, i, len1, n, results;
      if (Site.software !== 'yotsuba') {
        return;
      }
      dbs = [ThreadWatcher.db, ThreadWatcher.unreaddb, QuoteYou.db].filter(function(x) {
        return x;
      });
      n = 0;
      results = [];
      for (i = 0, len1 = dbs.length; i < len1; i++) {
        db = dbs[i];
        results.push(db.forceSync(function() {
          var j, len2, thread, threads;
          if ((++n) === dbs.length) {
            threads = ThreadWatcher.getAll();
            for (j = 0, len2 = threads.length; j < len2; j++) {
              thread = threads[j];
              ThreadWatcher.fetchStatus(thread);
            }
          }
        }));
      }
      return results;
    },
    fetchStatus: function(thread, force) {
      var boardID, data, req, siteID, threadID;
      siteID = thread.siteID, boardID = thread.boardID, threadID = thread.threadID, data = thread.data;
      if (!(Site.software === 'yotsuba' && siteID === Site.hostname)) {
        return;
      }
      if (data.isDead && !force) {
        return;
      }
      if (ThreadWatcher.requests.length === 0) {
        ThreadWatcher.status.textContent = '...';
        $.addClass(ThreadWatcher.refreshButton, 'fa-spin');
      }
      req = $.ajax(location.protocol + "//a.4cdn.org/" + boardID + "/thread/" + threadID + ".json", {
        onloadend: function() {
          return ThreadWatcher.parseStatus.call(this, thread);
        },
        timeout: $.MINUTE
      }, {
        whenModified: force ? false : 'ThreadWatcher'
      });
      return ThreadWatcher.requests.push(req);
    },
    parseStatus: function(arg) {
      var boardID, data, i, isDead, lastReadPost, len1, match, postObj, quotesYou, quotingYou, ref, ref1, ref2, regexp, threadID, unread, youOP;
      boardID = arg.boardID, threadID = arg.threadID, data = arg.data;
      ThreadWatcher.fetched++;
      if (ThreadWatcher.fetched === ThreadWatcher.requests.length) {
        ThreadWatcher.clearRequests();
      } else {
        ThreadWatcher.status.textContent = (Math.round(ThreadWatcher.fetched / ThreadWatcher.requests.length * 100)) + "%";
      }
      if (this.status === 200 && this.response) {
        isDead = !!this.response.posts[0].archived;
        if (isDead && Conf['Auto Prune']) {
          ThreadWatcher.db["delete"]({
            boardID: boardID,
            threadID: threadID
          });
          ThreadWatcher.refresh();
          return;
        }
        lastReadPost = ThreadWatcher.unreaddb.get({
          boardID: boardID,
          threadID: threadID,
          defaultValue: 0
        });
        unread = 0;
        quotingYou = false;
        youOP = !!((ref = QuoteYou.db) != null ? ref.get({
          boardID: boardID,
          threadID: threadID,
          postID: threadID
        }) : void 0);
        ref1 = this.response.posts;
        for (i = 0, len1 = ref1.length; i < len1; i++) {
          postObj = ref1[i];
          if (!(postObj.no > lastReadPost)) {
            continue;
          }
          if ((ref2 = QuoteYou.db) != null ? ref2.get({
            boardID: boardID,
            threadID: threadID,
            postID: postObj.no
          }) : void 0) {
            continue;
          }
          unread++;
          if (!quotingYou && !Conf['Require OP Quote Link'] && youOP && !Filter.isHidden(Build.parseJSON(postObj, boardID))) {
            quotingYou = true;
            continue;
          }
          if (!(!quotingYou && QuoteYou.db && postObj.com)) {
            continue;
          }
          quotesYou = false;
          regexp = /<a [^>]*\bhref="(?:(?:\/\/boards\.4chan(?:nel)?\.org)?\/([^\/]+)\/thread\/)?(\d+)?(?:#p(\d+))?"/g;
          while (match = regexp.exec(postObj.com)) {
            if (QuoteYou.db.get({
              boardID: match[1] || boardID,
              threadID: match[2] || threadID,
              postID: match[3] || match[2] || threadID
            })) {
              quotesYou = true;
              break;
            }
          }
          if (quotesYou && !Filter.isHidden(Build.parseJSON(postObj, boardID))) {
            quotingYou = true;
          }
        }
        if (isDead !== data.isDead || unread !== data.unread || quotingYou !== data.quotingYou) {
          ThreadWatcher.db.extend({
            boardID: boardID,
            threadID: threadID,
            val: {
              isDead: isDead,
              unread: unread,
              quotingYou: quotingYou
            }
          });
          return ThreadWatcher.refresh();
        }
      } else if (this.status === 404) {
        if (Conf['Auto Prune']) {
          ThreadWatcher.db["delete"]({
            boardID: boardID,
            threadID: threadID
          });
        } else {
          ThreadWatcher.db.extend({
            boardID: boardID,
            threadID: threadID,
            val: {
              isDead: true
            },
            rm: ['unread', 'quotingYou']
          });
        }
        return ThreadWatcher.refresh();
      }
    },
    getAll: function() {
      var all, boardID, boards, data, ref, ref1, siteID, threadID, threads;
      all = [];
      ref = ThreadWatcher.db.data;
      for (siteID in ref) {
        boards = ref[siteID];
        ref1 = boards.boards;
        for (boardID in ref1) {
          threads = ref1[boardID];
          if (Conf['Current Board'] && (siteID !== Site.hostname || boardID !== g.BOARD.ID)) {
            continue;
          }
          for (threadID in threads) {
            data = threads[threadID];
            if (data && typeof data === 'object') {
              all.push({
                siteID: siteID,
                boardID: boardID,
                threadID: threadID,
                data: data
              });
            }
          }
        }
      }
      return all;
    },
    makeLine: function(siteID, boardID, threadID, data) {
      var count, div, excerpt, fullID, link, ref, ref1, software, title, x;
      software = (ref = Conf['siteProperties'][siteID]) != null ? ref.software : void 0;
      x = $.el('a', {
        className: 'fa fa-times',
        href: 'javascript:;'
      });
      $.on(x, 'click', ThreadWatcher.cb.rm);
      excerpt = data.excerpt;
      excerpt || (excerpt = "/" + boardID + "/ - No." + threadID);
      if (Conf['Show Site Prefix']) {
        excerpt = ThreadWatcher.prefixes[siteID] + excerpt;
      }
      link = $.el('a', {
        href: ((ref1 = SW[software]) != null ? ref1.urls.thread({
          siteID: siteID,
          boardID: boardID,
          threadID: threadID
        }) : void 0) || '',
        title: excerpt,
        className: 'watcher-link'
      });
      if (ThreadWatcher.unreadEnabled && Conf['Show Unread Count'] && software === 'yotsuba' && (data.unread != null)) {
        count = $.el('span', {
          textContent: "(" + data.unread + ")",
          className: 'watcher-unread'
        });
        $.add(link, count);
      }
      title = $.el('span', {
        textContent: excerpt,
        className: 'watcher-title'
      });
      $.add(link, title);
      div = $.el('div');
      fullID = boardID + "." + threadID;
      div.dataset.fullID = fullID;
      div.dataset.siteID = siteID;
      if (g.VIEW === 'thread' && fullID === (g.BOARD + "." + g.THREADID)) {
        $.addClass(div, 'current');
      }
      if (data.isDead) {
        $.addClass(div, 'dead-thread');
      }
      if (ThreadWatcher.unreadEnabled && Conf['Show Unread Count'] && software === 'yotsuba') {
        if (data.unread === 0) {
          $.addClass(div, 'replies-read');
        }
        if (data.unread) {
          $.addClass(div, 'replies-unread');
        }
        if (data.quotingYou) {
          $.addClass(div, 'replies-quoting-you');
        }
      }
      $.add(div, [x, $.tn(' '), link]);
      return div;
    },
    setPrefixes: function(threads) {
      var conflicts, conflicts2, i, j, len, len1, len2, prefix, prefixes, siteID, siteID2;
      prefixes = {};
      for (i = 0, len1 = threads.length; i < len1; i++) {
        siteID = threads[i].siteID;
        if (siteID in prefixes) {
          continue;
        }
        len = 0;
        prefix = '';
        conflicts = Object.keys(prefixes);
        while (conflicts.length > 0) {
          len++;
          prefix = siteID.slice(0, len);
          conflicts2 = [];
          for (j = 0, len2 = conflicts.length; j < len2; j++) {
            siteID2 = conflicts[j];
            if (siteID2.slice(0, len) === prefix) {
              conflicts2.push(siteID2);
            } else if (prefixes[siteID2].length < len) {
              prefixes[siteID2] = siteID2.slice(0, len);
            }
          }
          conflicts = conflicts2;
        }
        prefixes[siteID] = prefix;
      }
      return ThreadWatcher.prefixes = prefixes;
    },
    build: function() {
      var boardID, data, i, j, len1, len2, list, nodes, ref, ref1, refresher, siteID, thread, threadID, threads;
      nodes = [];
      threads = ThreadWatcher.getAll();
      ThreadWatcher.setPrefixes(threads);
      for (i = 0, len1 = threads.length; i < len1; i++) {
        ref = threads[i], siteID = ref.siteID, boardID = ref.boardID, threadID = ref.threadID, data = ref.data;
        if ((data.excerpt == null) && siteID === Site.hostname && (thread = g.threads[boardID + "." + threadID])) {
          ThreadWatcher.db.extend({
            boardID: boardID,
            threadID: threadID,
            val: {
              excerpt: Get.threadExcerpt(thread)
            }
          });
        }
        nodes.push(ThreadWatcher.makeLine(siteID, boardID, threadID, data));
      }
      list = ThreadWatcher.list;
      $.rmAll(list);
      $.add(list, nodes);
      ThreadWatcher.refreshIcon();
      ref1 = ThreadWatcher.menu.refreshers;
      for (j = 0, len2 = ref1.length; j < len2; j++) {
        refresher = ref1[j];
        refresher();
      }
    },
    refresh: function() {
      ThreadWatcher.build();
      g.threads.forEach(function(thread) {
        var i, isWatched, len1, post, ref, toggler;
        isWatched = ThreadWatcher.isWatched(thread);
        if (thread.OP) {
          ref = [thread.OP].concat(slice.call(thread.OP.clones));
          for (i = 0, len1 = ref.length; i < len1; i++) {
            post = ref[i];
            if ((toggler = $('.watch-thread-link', post.nodes.info))) {
              ThreadWatcher.setToggler(toggler, isWatched);
            }
          }
        }
        if (thread.catalogView) {
          return thread.catalogView.nodes.root.classList.toggle('watched', isWatched);
        }
      });
      if (Conf['Pin Watched Threads']) {
        return $.event('SortIndex', {
          deferred: Conf['Index Mode'] !== 'catalog'
        });
      }
    },
    refreshIcon: function() {
      var className, i, len1, ref;
      ref = ['replies-unread', 'replies-quoting-you'];
      for (i = 0, len1 = ref.length; i < len1; i++) {
        className = ref[i];
        ThreadWatcher.shortcut.classList.toggle(className, !!$("." + className, ThreadWatcher.dialog));
      }
    },
    update: function(boardID, threadID, newData) {
      var data, key, line, n, newLine, ref, siteID, val;
      siteID = Site.hostname;
      if (!(data = (ref = ThreadWatcher.db) != null ? ref.get({
        boardID: boardID,
        threadID: threadID
      }) : void 0)) {
        return;
      }
      if (newData.isDead && Conf['Auto Prune']) {
        ThreadWatcher.db["delete"]({
          boardID: boardID,
          threadID: threadID
        });
        ThreadWatcher.refresh();
        return;
      }
      n = 0;
      for (key in newData) {
        val = newData[key];
        if (data[key] !== val) {
          n++;
        }
      }
      if (!n) {
        return;
      }
      if (!(data = ThreadWatcher.db.get({
        boardID: boardID,
        threadID: threadID
      }))) {
        return;
      }
      ThreadWatcher.db.extend({
        boardID: boardID,
        threadID: threadID,
        val: newData
      });
      if (line = $("#watched-threads > [data-site-i-d='" + siteID + "'][data-full-i-d='" + boardID + "." + threadID + "']", ThreadWatcher.dialog)) {
        newLine = ThreadWatcher.makeLine(siteID, boardID, threadID, data);
        $.replace(line, newLine);
        return ThreadWatcher.refreshIcon();
      } else {
        return ThreadWatcher.refresh();
      }
    },
    set404: function(boardID, threadID, cb) {
      var data, ref;
      if (!(data = (ref = ThreadWatcher.db) != null ? ref.get({
        boardID: boardID,
        threadID: threadID
      }) : void 0)) {
        return cb();
      }
      if (Conf['Auto Prune']) {
        ThreadWatcher.db["delete"]({
          boardID: boardID,
          threadID: threadID
        });
        return cb();
      }
      if (data.isDead && !((data.unread != null) || (data.quotingYou != null))) {
        return cb();
      }
      return ThreadWatcher.db.extend({
        boardID: boardID,
        threadID: threadID,
        val: {
          isDead: true
        },
        rm: ['unread', 'quotingYou']
      }, cb);
    },
    toggle: function(thread) {
      var boardID, siteID, threadID;
      siteID = Site.hostname;
      boardID = thread.board.ID;
      threadID = thread.ID;
      if (ThreadWatcher.db.get({
        boardID: boardID,
        threadID: threadID
      })) {
        return ThreadWatcher.rm(siteID, boardID, threadID);
      } else {
        return ThreadWatcher.add(thread);
      }
    },
    add: function(thread) {
      var boardID, data, siteID, threadID;
      data = {};
      siteID = Site.hostname;
      boardID = thread.board.ID;
      threadID = thread.ID;
      if (thread.isDead) {
        if (Conf['Auto Prune'] && ThreadWatcher.db.get({
          boardID: boardID,
          threadID: threadID
        })) {
          ThreadWatcher.rm(siteID, boardID, threadID);
          return;
        }
        data.isDead = true;
      }
      data.excerpt = Get.threadExcerpt(thread);
      return ThreadWatcher.addRaw(boardID, threadID, data);
    },
    addRaw: function(boardID, threadID, data) {
      ThreadWatcher.db.set({
        boardID: boardID,
        threadID: threadID,
        val: data
      });
      ThreadWatcher.refresh();
      if (ThreadWatcher.unreadEnabled && Conf['Show Unread Count']) {
        return ThreadWatcher.fetchStatus({
          siteID: Site.hostname,
          boardID: boardID,
          threadID: threadID,
          data: data
        }, true);
      }
    },
    rm: function(siteID, boardID, threadID) {
      ThreadWatcher.db["delete"]({
        siteID: siteID,
        boardID: boardID,
        threadID: threadID
      });
      return ThreadWatcher.refresh();
    },
    menu: {
      refreshers: [],
      init: function() {
        var menu;
        if (!Conf['Thread Watcher']) {
          return;
        }
        menu = this.menu = new UI.Menu('thread watcher');
        $.on($('.menu-button', ThreadWatcher.dialog), 'click', function(e) {
          return menu.toggle(e, this, ThreadWatcher);
        });
        return this.addMenuEntries();
      },
      addHeaderMenuEntry: function() {
        var entryEl;
        if (g.VIEW !== 'thread') {
          return;
        }
        entryEl = $.el('a', {
          href: 'javascript:;'
        });
        Header.menu.addEntry({
          el: entryEl,
          order: 60
        });
        $.on(entryEl, 'click', function() {
          return ThreadWatcher.toggle(g.threads[g.BOARD + "." + g.THREADID]);
        });
        return this.refreshers.push(function() {
          var addClass, ref, rmClass, text;
          ref = $('.current', ThreadWatcher.list) ? ['unwatch-thread', 'watch-thread', 'Unwatch thread'] : ['watch-thread', 'unwatch-thread', 'Watch thread'], addClass = ref[0], rmClass = ref[1], text = ref[2];
          $.addClass(entryEl, addClass);
          $.rmClass(entryEl, rmClass);
          return entryEl.textContent = text;
        });
      },
      addMenuEntries: function() {
        var cb, conf, entries, entry, i, len1, name, ref, ref1, refresh, subEntries;
        entries = [];
        entries.push({
          cb: ThreadWatcher.cb.openAll,
          entry: {
            el: $.el('a', {
              textContent: 'Open all threads'
            })
          },
          refresh: function() {
            return (ThreadWatcher.list.firstElementChild ? $.rmClass : $.addClass)(this.el, 'disabled');
          }
        });
        entries.push({
          cb: ThreadWatcher.cb.pruneDeads,
          entry: {
            el: $.el('a', {
              textContent: 'Prune dead threads'
            })
          },
          refresh: function() {
            return ($('.dead-thread', ThreadWatcher.list) ? $.rmClass : $.addClass)(this.el, 'disabled');
          }
        });
        subEntries = [];
        ref = Config.threadWatcher;
        for (name in ref) {
          conf = ref[name];
          subEntries.push(this.createSubEntry(name, conf[1]));
        }
        entries.push({
          entry: {
            el: $.el('span', {
              textContent: 'Settings'
            }),
            subEntries: subEntries
          }
        });
        for (i = 0, len1 = entries.length; i < len1; i++) {
          ref1 = entries[i], entry = ref1.entry, cb = ref1.cb, refresh = ref1.refresh;
          if (entry.el.nodeName === 'A') {
            entry.el.href = 'javascript:;';
          }
          if (cb) {
            $.on(entry.el, 'click', cb);
          }
          if (refresh) {
            this.refreshers.push(refresh.bind(entry));
          }
          this.menu.addEntry(entry);
        }
      },
      createSubEntry: function(name, desc) {
        var entry, input;
        entry = {
          type: 'thread watcher',
          el: UI.checkbox(name, name.replace(' Thread Watcher', ''))
        };
        entry.el.title = desc;
        input = entry.el.firstElementChild;
        if (name === 'Show Unread Count' && !ThreadWatcher.unreadEnabled) {
          input.disabled = true;
          $.addClass(entry.el, 'disabled');
          entry.el.title += '\n[Remember Last Read Post is disabled.]';
        }
        $.on(input, 'change', $.cb.checked);
        if (name === 'Current Board' || name === 'Show Unread Count' || name === 'Show Site Prefix') {
          $.on(input, 'change', ThreadWatcher.refresh);
        }
        if (name === 'Show Unread Count' || name === 'Auto Update Thread Watcher') {
          $.on(input, 'change', ThreadWatcher.fetchAuto);
        }
        return entry;
      }
    }
  };

  return ThreadWatcher;

}).call(this);

Unread = (function() {
  var Unread;

  Unread = {
    init: function() {
      if (!(g.VIEW === 'thread' && (Conf['Unread Count'] || Conf['Unread Favicon'] || Conf['Unread Line'] || Conf['Remember Last Read Post'] || Conf['Desktop Notifications'] || Conf['Quote Threading']))) {
        return;
      }
      if (Conf['Remember Last Read Post']) {
        $.sync('Remember Last Read Post', function(enabled) {
          return Conf['Remember Last Read Post'] = enabled;
        });
        this.db = new DataBoard('lastReadPosts', this.sync);
      }
      this.hr = $.el('hr', {
        id: 'unread-line',
        className: 'unread-line'
      });
      this.posts = new Set();
      this.postsQuotingYou = new Set();
      this.order = new RandomAccessList();
      this.position = null;
      Callbacks.Thread.push({
        name: 'Unread',
        cb: this.node
      });
      return Callbacks.Post.push({
        name: 'Unread',
        cb: this.addPost
      });
    },
    node: function() {
      var ID, j, len, ref, ref1;
      Unread.thread = this;
      Unread.title = d.title;
      Unread.lastReadPost = ((ref = Unread.db) != null ? ref.get({
        boardID: this.board.ID,
        threadID: this.ID
      }) : void 0) || 0;
      Unread.readCount = 0;
      ref1 = this.posts.keys;
      for (j = 0, len = ref1.length; j < len; j++) {
        ID = ref1[j];
        if (+ID <= Unread.lastReadPost) {
          Unread.readCount++;
        }
      }
      $.one(d, '4chanXInitFinished', Unread.ready);
      return $.on(d, 'ThreadUpdate', Unread.onUpdate);
    },
    ready: function() {
      if (Conf['Remember Last Read Post'] && Conf['Scroll to Last Read Post']) {
        Unread.scroll();
      }
      Unread.setLine(true);
      Unread.read();
      Unread.update();
      $.on(d, 'scroll visibilitychange', Unread.read);
      if (Conf['Unread Line']) {
        return $.on(d, 'visibilitychange', Unread.setLine);
      }
    },
    positionPrev: function() {
      if (Unread.position) {
        return Unread.position.prev;
      } else {
        return Unread.order.last;
      }
    },
    scroll: function() {
      var hash, position, root;
      if ((hash = location.hash.match(/\d+/)) && hash[0] in Unread.thread.posts) {
        return;
      }
      position = Unread.positionPrev();
      while (position) {
        root = position.data.nodes.root;
        if (!root.getBoundingClientRect().height) {
          position = position.prev;
        } else {
          Header.scrollToIfNeeded(root, true);
          break;
        }
      }
    },
    sync: function() {
      var ID, i, j, lastReadPost, postIDs, ref, ref1;
      if (Unread.lastReadPost == null) {
        return;
      }
      lastReadPost = Unread.db.get({
        boardID: Unread.thread.board.ID,
        threadID: Unread.thread.ID,
        defaultValue: 0
      });
      if (!(Unread.lastReadPost < lastReadPost)) {
        return;
      }
      Unread.lastReadPost = lastReadPost;
      postIDs = Unread.thread.posts.keys;
      for (i = j = ref = Unread.readCount, ref1 = postIDs.length; j < ref1; i = j += 1) {
        ID = +postIDs[i];
        if (!Unread.thread.posts[ID].isFetchedQuote) {
          if (ID > Unread.lastReadPost) {
            break;
          }
          Unread.posts["delete"](ID);
          Unread.postsQuotingYou["delete"](ID);
        }
        Unread.readCount++;
      }
      Unread.updatePosition();
      Unread.setLine();
      return Unread.update();
    },
    addPost: function() {
      if (this.isFetchedQuote || this.isClone) {
        return;
      }
      Unread.order.push(this);
      if (this.ID <= Unread.lastReadPost || this.isHidden || QuoteYou.isYou(this)) {
        return;
      }
      Unread.posts.add(this.ID);
      Unread.addPostQuotingYou(this);
      return Unread.position != null ? Unread.position : Unread.position = Unread.order[this.ID];
    },
    addPostQuotingYou: function(post) {
      var j, len, quotelink, ref, ref1;
      ref = post.nodes.quotelinks;
      for (j = 0, len = ref.length; j < len; j++) {
        quotelink = ref[j];
        if (!((ref1 = QuoteYou.db) != null ? ref1.get(Get.postDataFromLink(quotelink)) : void 0)) {
          continue;
        }
        Unread.postsQuotingYou.add(post.ID);
        Unread.openNotification(post);
        return;
      }
    },
    openNotification: function(post) {
      var notif;
      if (!Header.areNotificationsEnabled) {
        return;
      }
      notif = new Notification(post.info.nameBlock + " replied to you", {
        body: post.commentDisplay(),
        icon: Favicon.logo
      });
      notif.onclick = function() {
        Header.scrollToIfNeeded(post.nodes.root, true);
        return window.focus();
      };
      return notif.onshow = function() {
        return setTimeout(function() {
          return notif.close();
        }, 7 * $.SECOND);
      };
    },
    onUpdate: function(e) {
      if (!e.detail[404]) {
        Unread.setLine();
        Unread.read();
      }
      return Unread.update();
    },
    readSinglePost: function(post) {
      var ID;
      ID = post.ID;
      if (!Unread.posts.has(ID)) {
        return;
      }
      Unread.posts["delete"](ID);
      Unread.postsQuotingYou["delete"](ID);
      Unread.updatePosition();
      Unread.saveLastReadPost();
      return Unread.update();
    },
    read: $.debounce(100, function(e) {
      var ID, count, data, ref, root;
      if (!Unread.posts.size && Unread.readCount !== Unread.thread.posts.keys.length) {
        Unread.saveLastReadPost();
      }
      if (d.hidden || !Unread.posts.size) {
        return;
      }
      count = 0;
      while (Unread.position) {
        ref = Unread.position, ID = ref.ID, data = ref.data;
        root = data.nodes.root;
        if (!(!root.getBoundingClientRect().height || Header.getBottomOf(root) > -1)) {
          break;
        }
        count++;
        Unread.posts["delete"](ID);
        Unread.postsQuotingYou["delete"](ID);
        Unread.position = Unread.position.next;
      }
      if (!count) {
        return;
      }
      Unread.updatePosition();
      Unread.saveLastReadPost();
      if (e) {
        return Unread.update();
      }
    }),
    updatePosition: function() {
      while (Unread.position && !Unread.posts.has(Unread.position.ID)) {
        Unread.position = Unread.position.next;
      }
    },
    saveLastReadPost: $.debounce(2 * $.SECOND, function() {
      var ID, i, j, postIDs, ref, ref1;
      $.forceSync('Remember Last Read Post');
      if (!(Conf['Remember Last Read Post'] && Unread.db)) {
        return;
      }
      postIDs = Unread.thread.posts.keys;
      for (i = j = ref = Unread.readCount, ref1 = postIDs.length; j < ref1; i = j += 1) {
        ID = +postIDs[i];
        if (!Unread.thread.posts[ID].isFetchedQuote) {
          if (Unread.posts.has(ID)) {
            break;
          }
          Unread.lastReadPost = ID;
        }
        Unread.readCount++;
      }
      if (Unread.thread.isDead && !Unread.thread.isArchived) {
        return;
      }
      return Unread.db.set({
        boardID: Unread.thread.board.ID,
        threadID: Unread.thread.ID,
        val: Unread.lastReadPost
      });
    }),
    setLine: function(force) {
      if (!Conf['Unread Line']) {
        return;
      }
      if (Unread.hr.hidden || d.hidden || (force === true)) {
        if ((Unread.linePosition = Unread.positionPrev())) {
          $.after(Unread.linePosition.data.nodes.root, Unread.hr);
        } else {
          $.rm(Unread.hr);
        }
      }
      return Unread.hr.hidden = Unread.linePosition === Unread.order.last;
    },
    update: function() {
      var count, countQuotingYou, isDead, titleCount, titleDead, titleQuotingYou;
      count = Unread.posts.size;
      countQuotingYou = Unread.postsQuotingYou.size;
      if (Conf['Unread Count']) {
        titleQuotingYou = Conf['Quoted Title'] && countQuotingYou ? '(!) ' : '';
        titleCount = count || !Conf['Hide Unread Count at (0)'] ? "(" + count + ") " : '';
        titleDead = Unread.thread.isDead ? Unread.title.replace('-', (Unread.thread.isArchived ? '- Archived -' : '- 404 -')) : Unread.title;
        d.title = "" + titleQuotingYou + titleCount + titleDead;
      }
      Unread.saveThreadWatcherCount();
      if (Conf['Unread Favicon']) {
        isDead = Unread.thread.isDead;
        Favicon.el.href = countQuotingYou ? Favicon[isDead ? 'unreadDeadY' : 'unreadY'] : count ? Favicon[isDead ? 'unreadDead' : 'unread'] : Favicon[isDead ? 'dead' : 'default'];
        return $.add(d.head, Favicon.el);
      }
    },
    saveThreadWatcherCount: $.debounce(2 * $.SECOND, function() {
      $.forceSync('Remember Last Read Post');
      if (Conf['Remember Last Read Post'] && (!Unread.thread.isDead || Unread.thread.isArchived)) {
        return ThreadWatcher.update(Unread.thread.board.ID, Unread.thread.ID, {
          isDead: Unread.thread.isDead,
          unread: Unread.posts.size,
          quotingYou: !!(!Conf['Require OP Quote Link'] && QuoteYou.isYou(Unread.thread.OP) ? Unread.posts.size : Unread.postsQuotingYou.size)
        });
      }
    })
  };

  return Unread;

}).call(this);

UnreadIndex = (function() {
  var UnreadIndex;

  UnreadIndex = {
    lastReadPost: {},
    hr: {},
    markReadLink: {},
    init: function() {
      if (!(g.VIEW === 'index' && Conf['Remember Last Read Post'] && Conf['Unread Line in Index'])) {
        return;
      }
      this.enabled = true;
      this.db = new DataBoard('lastReadPosts', this.sync);
      Callbacks.Thread.push({
        name: 'Unread Line in Index',
        cb: this.node
      });
      $.on(d, 'IndexRefreshInternal', this.onIndexRefresh);
      return $.on(d, 'PostsInserted', this.onPostsInserted);
    },
    node: function() {
      UnreadIndex.lastReadPost[this.fullID] = UnreadIndex.db.get({
        boardID: this.board.ID,
        threadID: this.ID
      }) || 0;
      if (!Index.enabled) {
        return UnreadIndex.update(this);
      }
    },
    onIndexRefresh: function(e) {
      var i, len, ref, results, thread, threadID;
      if (e.detail.isCatalog) {
        return;
      }
      ref = e.detail.threadIDs;
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        threadID = ref[i];
        thread = g.threads[threadID];
        results.push(UnreadIndex.update(thread));
      }
      return results;
    },
    onPostsInserted: function(e) {
      var ref, ref1, thread, wasVisible;
      if (e.target === Index.root) {
        return;
      }
      thread = Get.threadFromNode(e.target);
      if (!thread || thread.nodes.root !== e.target) {
        return;
      }
      wasVisible = !!((ref = UnreadIndex.hr[thread.fullID]) != null ? ref.parentNode : void 0);
      UnreadIndex.update(thread);
      if (Conf['Scroll to Last Read Post'] && !wasVisible && !!((ref1 = UnreadIndex.hr[thread.fullID]) != null ? ref1.parentNode : void 0)) {
        return Header.scrollToIfNeeded(UnreadIndex.hr[thread.fullID], true);
      }
    },
    sync: function() {
      return g.threads.forEach(function(thread) {
        var lastReadPost, ref;
        lastReadPost = UnreadIndex.db.get({
          boardID: thread.board.ID,
          threadID: thread.ID
        }) || 0;
        if (lastReadPost !== UnreadIndex.lastReadPost[thread.fullID]) {
          UnreadIndex.lastReadPost[thread.fullID] = lastReadPost;
          if ((ref = thread.nodes.root) != null ? ref.parentNode : void 0) {
            return UnreadIndex.update(thread);
          }
        }
      });
    },
    update: function(thread) {
      var divider, firstUnread, hasUnread, hr, lastReadPost, link, repliesRead, repliesShown;
      lastReadPost = UnreadIndex.lastReadPost[thread.fullID];
      repliesShown = 0;
      repliesRead = 0;
      firstUnread = null;
      thread.posts.forEach(function(post) {
        if (post.isReply && post.nodes.root.parentNode === thread.nodes.root) {
          repliesShown++;
          if (post.ID <= lastReadPost) {
            return repliesRead++;
          } else if ((!firstUnread || post.ID < firstUnread.ID) && !post.isHidden && !QuoteYou.isYou(post)) {
            return firstUnread = post;
          }
        }
      });
      hr = UnreadIndex.hr[thread.fullID];
      if (firstUnread && (repliesRead || (lastReadPost === thread.OP.ID && (!$(Site.selectors.summary, thread.nodes.root) || thread.ID in ExpandThread.statuses)))) {
        if (!hr) {
          hr = UnreadIndex.hr[thread.fullID] = $.el('hr', {
            className: 'unread-line'
          });
        }
        $.before(firstUnread.nodes.root, hr);
      } else {
        $.rm(hr);
      }
      hasUnread = repliesShown ? firstUnread || !repliesRead : Index.enabled ? Index.lastPost(thread.ID) > lastReadPost : thread.OP.ID > lastReadPost;
      thread.nodes.root.classList.toggle('unread-thread', hasUnread);
      link = UnreadIndex.markReadLink[thread.fullID];
      if (!link) {
        link = UnreadIndex.markReadLink[thread.fullID] = $.el('a', {
          className: 'unread-mark-read brackets-wrap',
          href: 'javascript:;',
          textContent: 'Mark Read'
        });
        $.on(link, 'click', UnreadIndex.markRead);
      }
      if ((divider = $(Site.selectors.threadDivider, thread.nodes.root))) {
        return $.before(divider, link);
      } else {
        return $.add(thread.nodes.root, link);
      }
    },
    markRead: function() {
      var lastPost, thread;
      thread = Get.threadFromNode(this);
      if (Index.enabled) {
        lastPost = Index.lastPost(thread.ID);
      } else {
        lastPost = 0;
        thread.posts.forEach(function(post) {
          if (post.ID > lastPost && !post.isFetchedQuote) {
            return lastPost = post.ID;
          }
        });
      }
      UnreadIndex.lastReadPost[thread.fullID] = lastPost;
      UnreadIndex.db.set({
        boardID: thread.board.ID,
        threadID: thread.ID,
        val: lastPost
      });
      $.rm(UnreadIndex.hr[thread.fullID]);
      thread.nodes.root.classList.remove('unread-thread');
      return ThreadWatcher.update(thread.board.ID, thread.ID, {
        unread: 0,
        quotingYou: false
      });
    }
  };

  return UnreadIndex;

}).call(this);

Captcha = {};

(function() {
  Captcha.cache = {
    init: function() {
      return $.on(d, 'SaveCaptcha', (function(_this) {
        return function(e) {
          return _this.save(e.detail);
        };
      })(this));
    },
    captchas: [],
    getCount: function() {
      return this.captchas.length;
    },
    needed: function() {
      return !((/\b_ct=/.test(d.cookie) && QR.posts[0].thread !== 'new') || this.captchas.length || QR.req) && (QR.posts.length > 1 || Conf['Auto-load captcha'] || QR.posts[0].com || QR.posts[0].file);
    },
    getOne: function(isReply) {
      var captcha, i;
      this.clear();
      i = this.captchas.findIndex(function(x) {
        return isReply || (x.challenge == null);
      });
      if (i >= 0) {
        captcha = this.captchas.splice(i, 1)[0];
        this.count();
        return captcha;
      } else {
        return null;
      }
    },
    save: function(captcha) {
      this.captchas.push(captcha);
      this.captchas.sort(function(a, b) {
        return a.timeout - b.timeout;
      });
      return this.count();
    },
    clear: function() {
      var captcha, i, j, len, now, ref;
      if (this.captchas.length) {
        now = Date.now();
        ref = this.captchas;
        for (i = j = 0, len = ref.length; j < len; i = ++j) {
          captcha = ref[i];
          if (captcha.timeout > now) {
            break;
          }
        }
        if (i) {
          this.captchas = this.captchas.slice(i);
          return this.count();
        }
      }
    },
    count: function() {
      clearTimeout(this.timer);
      if (this.captchas.length) {
        this.timer = setTimeout(this.clear.bind(this), this.captchas[0].timeout - Date.now());
      }
      return $.event('CaptchaCount', this.captchas.length);
    }
  };

}).call(this);

(function() {
  Captcha.fixes = {
    imageKeys: '789456123uiojklm'.split('').concat(['Comma', 'Period']),
    imageKeys16: '7890uiopjkl'.split('').concat(['Semicolon', 'm', 'Comma', 'Period', 'Slash']),
    css: '.rc-imageselect-target > div:focus, .rc-image-tile-target:focus {\n  outline: 2px solid #4a90e2;\n}\n.rc-imageselect-target td:focus {\n  box-shadow: inset 0 0 0 2px #4a90e2;\n  outline: none;\n}\n.rc-button-default:focus {\n  box-shadow: inset 0 0 0 2px #0063d6;\n}',
    cssNoscript: '.fbc-payload-imageselect {\n  position: relative;\n  /* XXX Fixes for Google\'s broken CSS */\n  display: inline-block;\n  margin-left: 0;\n}\n.fbc-payload-imageselect > label {\n  position: absolute;\n  display: block;\n  height: 93.3px;\n  width: 93.3px;\n}\nlabel[data-row="0"] {top: 0px;}\nlabel[data-row="1"] {top: 93.3px;}\nlabel[data-row="2"] {top: 186.6px;}\nlabel[data-col="0"] {left: 0px;}\nlabel[data-col="1"] {left: 93.3px;}\nlabel[data-col="2"] {left: 186.6px;}\n.fbc-payload-imageselect > input:focus + label {\n  outline: 2px solid #4a90e2;\n}\n.fbc-button-verify input:focus {\n  box-shadow: inset 0 0 0 2px #0063d6;\n}\nbody.focus .fbc {\n  box-shadow: inset 0 0 0 2px #4a90e2;\n}',
    init: function() {
      switch (location.pathname.split('/')[3]) {
        case 'anchor':
          return this.initMain();
        case 'frame':
        case 'bframe':
          return this.initPopup();
        case 'fallback':
          return this.initNoscript();
      }
    },
    initMain: function() {
      var a, j, len, ref;
      $.onExists(d.body, '#recaptcha-anchor', function(checkbox) {
        var focus;
        focus = function() {
          var ref;
          if (d.hasFocus() && ((ref = d.activeElement) === d.documentElement || ref === d.body)) {
            return checkbox.focus();
          }
        };
        focus();
        return $.on(window, 'focus', function() {
          return $.queueTask(focus);
        });
      });
      ref = $$('.rc-anchor-pt a');
      for (j = 0, len = ref.length; j < len; j++) {
        a = ref[j];
        a.tabIndex = -1;
      }
    },
    initPopup: function() {
      $.addStyle(this.css);
      this.fixImages();
      new MutationObserver((function(_this) {
        return function() {
          return _this.fixImages();
        };
      })(this)).observe(d.body, {
        childList: true,
        subtree: true
      });
      return $.on(d, 'keydown', this.keybinds.bind(this));
    },
    initNoscript: function() {
      var data, form, ref, token;
      this.noscript = true;
      form = $('.fbc-imageselect-challenge > form');
      data = (token = (ref = $('.fbc-verification-token > textarea')) != null ? ref.value : void 0) ? {
        token: token
      } : $('.fbc-imageselect-challenge > form') ? {
        working: true
      } : null;
      if (data) {
        new Connection(window.parent, '*').send(data);
      }
      d.body.classList.toggle('focus', d.hasFocus());
      $.on(window, 'focus blur', function() {
        return d.body.classList.toggle('focus', d.hasFocus());
      });
      this.images = $$('.fbc-payload-imageselect > input');
      this.width = 3;
      if (this.images.length !== 9) {
        return;
      }
      $.addStyle(this.cssNoscript);
      this.addLabels();
      $.on(d, 'keydown', this.keybinds.bind(this));
      return $.on(form, 'submit', this.checkForm.bind(this));
    },
    fixImages: function() {
      var img, j, len, ref;
      this.images = $$('.rc-image-tile-target');
      if (!this.images.length) {
        this.images = $$('.rc-imageselect-target > div, .rc-imageselect-target td');
      }
      this.width = $$('.rc-imageselect-target tr:first-of-type td').length || Math.round(Math.sqrt(this.images.length));
      ref = this.images;
      for (j = 0, len = ref.length; j < len; j++) {
        img = ref[j];
        img.tabIndex = 0;
      }
      if (this.images.length === 9) {
        return this.addTooltips(this.images);
      } else {
        return this.addTooltips16(this.images);
      }
    },
    addLabels: function() {
      var checkbox, i, imageSelect, label, labels;
      imageSelect = $('.fbc-payload-imageselect');
      labels = (function() {
        var j, len, ref, results;
        ref = this.images;
        results = [];
        for (i = j = 0, len = ref.length; j < len; i = ++j) {
          checkbox = ref[i];
          checkbox.id = "checkbox-" + i;
          label = $.el('label', {
            htmlFor: checkbox.id
          });
          label.dataset.row = Math.floor(i / 3);
          label.dataset.col = i % 3;
          $.after(checkbox, label);
          results.push(label);
        }
        return results;
      }).call(this);
      return this.addTooltips(labels);
    },
    addTooltips: function(nodes) {
      var i, j, len, node;
      for (i = j = 0, len = nodes.length; j < len; i = ++j) {
        node = nodes[i];
        node.title = this.imageKeys[i] + " or " + (this.imageKeys[i + 9][0].toUpperCase()) + this.imageKeys[i + 9].slice(1);
      }
    },
    addTooltips16: function(nodes) {
      var i, j, key, len, node, ref;
      ref = this.imageKeys16;
      for (i = j = 0, len = ref.length; j < len; i = ++j) {
        key = ref[i];
        if (i % 4 < this.width && (node = nodes[nodes.length - (4 - Math.floor(i / 4)) * this.width + (i % 4)])) {
          node.title = "" + (key[0].toUpperCase()) + key.slice(1);
        }
      }
    },
    checkForm: function(e) {
      var checkbox, j, len, n, ref;
      n = 0;
      ref = this.images;
      for (j = 0, len = ref.length; j < len; j++) {
        checkbox = ref[j];
        if (checkbox.checked) {
          n++;
        }
      }
      if (n === 0) {
        return e.preventDefault();
      }
    },
    keybinds: function(e) {
      var dx, i, img, key, last, n, reload, verify, w, x;
      if (!(this.images && doc.contains(this.images[0]))) {
        return;
      }
      n = this.images.length;
      w = this.width;
      last = n + w - 1;
      reload = $('#recaptcha-reload-button, .fbc-button-reload');
      verify = $('#recaptcha-verify-button, .fbc-button-verify > input');
      x = this.images.indexOf(d.activeElement);
      if (x < 0) {
        x = d.activeElement === verify ? last : n;
      }
      key = Keybinds.keyCode(e);
      if (!this.noscript && key === 'Space' && x < n) {
        this.images[x].click();
      } else if (n === 9 && (i = this.imageKeys.indexOf(key)) >= 0) {
        this.images[i % 9].click();
        verify.focus();
      } else if (n !== 9 && (i = this.imageKeys16.indexOf(key)) >= 0 && i % 4 < w && (img = this.images[n - (4 - Math.floor(i / 4)) * w + (i % 4)])) {
        img.click();
        verify.focus();
      } else if (dx = {
        'Up': n,
        'Down': w,
        'Left': last,
        'Right': 1
      }[key]) {
        x = (x + dx) % (n + w);
        if ((n < x && x < last)) {
          x = dx === last ? n : last;
        }
        (this.images[x] || (x === n ? reload : void 0) || (x === last ? verify : void 0)).focus();
      } else {
        return;
      }
      e.preventDefault();
      return e.stopPropagation();
    }
  };

}).call(this);

(function() {
  Captcha.replace = {
    init: function() {
      var ref;
      if (!(d.cookie.indexOf('pass_enabled=1') < 0)) {
        return;
      }
      if (Conf['Force Noscript Captcha'] && Main.jsEnabled) {
        $.ready(Captcha.replace.noscript);
        return;
      }
      if (Conf['captchaLanguage'].trim() || Conf['Captcha Fixes']) {
        if ((ref = location.hostname) === 'lolcow.farm' || ref === 'boards.4channel.org') {
          return $.onExists(doc, '#captchaFormPart', function(node) {
            return $.onExists(node, 'iframe', Captcha.replace.iframe);
          });
        } else {
          return $.onExists(doc, 'iframe', Captcha.replace.iframe);
        }
      }
    },
    noscript: function() {
      var insert, noscript, original, span, toggle;
      if (!((original = $('#g-recaptcha')) && (noscript = $('noscript', original.parentNode)))) {
        return;
      }
      span = $.el('span', {
        id: 'captcha-forced-noscript'
      });
      $.replace(noscript, span);
      $.rm(original);
      insert = function() {
        span.innerHTML = noscript.textContent;
        return Captcha.replace.iframe($('iframe', span));
      };
      if ((toggle = $('#togglePostFormLink a, #form-link'))) {
        return $.on(toggle, 'click', insert);
      } else {
        return insert();
      }
    },
    iframe: function(iframe) {
      var lang, src;
      if ((lang = Conf['captchaLanguage'].trim())) {
        src = /[?&]hl=/.test(iframe.src) ? iframe.src.replace(/([?&]hl=)[^&]*/, '$1' + encodeURIComponent(lang)) : iframe.src + ("&hl=" + (encodeURIComponent(lang)));
        if (iframe.src !== src) {
          iframe.src = src;
        }
      }
      return Captcha.replace.autocopy(iframe);
    },
    autocopy: function(iframe) {
      if (!(Conf['Captcha Fixes'] && /^https:\/\/www\.google\.com\/recaptcha\/api\/fallback\?/.test(iframe.src))) {
        return;
      }
      return new Connection(iframe, 'https://www.google.com', {
        working: function() {
          var ref, ref1;
          if ((ref = $.id('qr')) != null ? ref.contains(iframe) : void 0) {
            return (ref1 = $('#qr .captcha-container textarea')) != null ? ref1.parentNode.hidden = true : void 0;
          }
        },
        token: function(token) {
          var node, textarea;
          node = iframe;
          while ((node = node.parentNode)) {
            if ((textarea = $('textarea', node))) {
              break;
            }
          }
          textarea.value = token;
          return $.event('input', null, textarea);
        }
      });
    }
  };

}).call(this);

(function() {
  var indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  Captcha.v2 = {
    lifetime: 2 * $.MINUTE,
    init: function() {
      var counter, root;
      if (d.cookie.indexOf('pass_enabled=1') >= 0) {
        return;
      }
      if (!(this.isEnabled = !!$('#g-recaptcha, #captcha-forced-noscript') || !$.id('postForm'))) {
        return;
      }
      if ((this.noscript = Conf['Force Noscript Captcha'] || !Main.jsEnabled)) {
        $.addClass(QR.nodes.el, 'noscript-captcha');
      }
      Captcha.cache.init();
      $.on(d, 'CaptchaCount', this.count.bind(this));
      root = $.el('div', {
        className: 'captcha-root'
      });
      $.extend(root, {
        innerHTML: "<div class=\"captcha-counter\"><a href=\"javascript:;\"></a></div>"
      });
      counter = $('.captcha-counter > a', root);
      this.nodes = {
        root: root,
        counter: counter
      };
      this.count();
      $.addClass(QR.nodes.el, 'has-captcha', 'captcha-v2');
      $.after(QR.nodes.com.parentNode, root);
      $.on(counter, 'click', this.toggle.bind(this));
      $.on(counter, 'keydown', (function(_this) {
        return function(e) {
          if (Keybinds.keyCode(e) !== 'Space') {
            return;
          }
          _this.toggle();
          e.preventDefault();
          return e.stopPropagation();
        };
      })(this));
      return $.on(window, 'captcha:success', (function(_this) {
        return function() {
          return $.queueTask(function() {
            return _this.save(false);
          });
        };
      })(this));
    },
    timeouts: {},
    prevNeeded: 0,
    noscriptURL: function() {
      var lang, url;
      url = 'https://www.google.com/recaptcha/api/fallback?k=6Ldp2bsSAAAAAAJ5uyx_lx34lJeEpTLVkP5k04qc';
      if ((lang = Conf['captchaLanguage'].trim())) {
        url += "&hl=" + (encodeURIComponent(lang));
      }
      return url;
    },
    moreNeeded: function() {
      return $.queueTask((function(_this) {
        return function() {
          var needed;
          needed = Captcha.cache.needed();
          if (needed && !_this.prevNeeded) {
            _this.setup(QR.cooldown.auto && d.activeElement === QR.nodes.status);
          }
          return _this.prevNeeded = needed;
        };
      })(this));
    },
    toggle: function() {
      if (this.nodes.container && !this.timeouts.destroy) {
        return this.destroy();
      } else {
        return this.setup(true, true);
      }
    },
    setup: function(focus, force) {
      if (!(this.isEnabled && (Captcha.cache.needed() || force))) {
        return;
      }
      if (focus) {
        $.addClass(QR.nodes.el, 'focus');
        this.nodes.counter.focus();
      }
      if (this.timeouts.destroy) {
        clearTimeout(this.timeouts.destroy);
        delete this.timeouts.destroy;
        return this.reload();
      }
      if (this.nodes.container) {
        $.queueTask((function(_this) {
          return function() {
            var iframe;
            if (_this.nodes.container && d.activeElement === _this.nodes.counter && (iframe = $('iframe', _this.nodes.container))) {
              iframe.focus();
              return QR.focus();
            }
          };
        })(this));
        return;
      }
      this.nodes.container = $.el('div', {
        className: 'captcha-container'
      });
      $.prepend(this.nodes.root, this.nodes.container);
      new MutationObserver(this.afterSetup.bind(this)).observe(this.nodes.container, {
        childList: true,
        subtree: true
      });
      if (this.noscript) {
        return this.setupNoscript();
      } else {
        return this.setupJS();
      }
    },
    setupNoscript: function() {
      var div, iframe, textarea;
      iframe = $.el('iframe', {
        id: 'qr-captcha-iframe',
        scrolling: 'no',
        src: this.noscriptURL()
      });
      div = $.el('div');
      textarea = $.el('textarea');
      $.add(div, textarea);
      return $.add(this.nodes.container, [iframe, div]);
    },
    setupJS: function() {
      return $.global(function() {
        var cbNative, render, script;
        render = function() {
          var classList, container;
          classList = document.documentElement.classList;
          container = document.querySelector('#qr .captcha-container');
          return container.dataset.widgetID = window.grecaptcha.render(container, {
            sitekey: '6Ldp2bsSAAAAAAJ5uyx_lx34lJeEpTLVkP5k04qc',
            theme: classList.contains('tomorrow') || classList.contains('spooky') || classList.contains('dark-captcha') ? 'dark' : 'light',
            callback: function(response) {
              return window.dispatchEvent(new CustomEvent('captcha:success', {
                detail: response
              }));
            }
          });
        };
        if (window.grecaptcha) {
          return render();
        } else {
          cbNative = window.onRecaptchaLoaded;
          window.onRecaptchaLoaded = function() {
            render();
            return cbNative();
          };
          if (!document.head.querySelector('script[src^="https://www.google.com/recaptcha/api.js"]')) {
            script = document.createElement('script');
            script.src = 'https://www.google.com/recaptcha/api.js?onload=onRecaptchaLoaded&render=explicit';
            return document.head.appendChild(script);
          }
        }
      });
    },
    afterSetup: function(mutations) {
      var i, iframe, j, len, len1, mutation, node, ref, textarea;
      for (i = 0, len = mutations.length; i < len; i++) {
        mutation = mutations[i];
        ref = mutation.addedNodes;
        for (j = 0, len1 = ref.length; j < len1; j++) {
          node = ref[j];
          if ((iframe = $.x('./descendant-or-self::iframe', node))) {
            this.setupIFrame(iframe);
          }
          if ((textarea = $.x('./descendant-or-self::textarea', node))) {
            this.setupTextArea(textarea);
          }
        }
      }
    },
    setupIFrame: function(iframe) {
      var ref, ref1;
      if (!doc.contains(iframe)) {
        return;
      }
      Captcha.replace.iframe(iframe);
      $.addClass(QR.nodes.el, 'captcha-open');
      this.fixQRPosition();
      $.on(iframe, 'load', this.fixQRPosition);
      if (d.activeElement === this.nodes.counter) {
        iframe.focus();
      }
      if (((ref = $.engine) === 'blink' || ref === 'edge') && (ref1 = iframe.parentNode, indexOf.call($$('#qr .captcha-container > div > div:first-of-type'), ref1) >= 0)) {
        return $.on(iframe.parentNode, 'scroll', function() {
          return this.scrollTop = 0;
        });
      }
    },
    fixQRPosition: function() {
      if (QR.nodes.el.getBoundingClientRect().bottom > doc.clientHeight) {
        QR.nodes.el.style.top = '';
        return QR.nodes.el.style.bottom = '0px';
      }
    },
    setupTextArea: function(textarea) {
      return $.one(textarea, 'input', (function(_this) {
        return function() {
          return _this.save(true);
        };
      })(this));
    },
    destroy: function() {
      if (!this.isEnabled) {
        return;
      }
      delete this.timeouts.destroy;
      $.rmClass(QR.nodes.el, 'captcha-open');
      if (this.nodes.container) {
        $.global(function() {
          var container;
          container = document.querySelector('#qr .captcha-container');
          return window.grecaptcha.reset(container.dataset.widgetID);
        });
        $.rm(this.nodes.container);
        return delete this.nodes.container;
      }
    },
    getOne: function(isReply) {
      return Captcha.cache.getOne(isReply);
    },
    save: function(pasted, token) {
      var base, focus, ref;
      Captcha.cache.save({
        response: token || $('textarea', this.nodes.container).value,
        timeout: Date.now() + this.lifetime
      });
      focus = ((ref = d.activeElement) != null ? ref.nodeName : void 0) === 'IFRAME' && /https?:\/\/www\.google\.com\/recaptcha\//.test(d.activeElement.src);
      if (Captcha.cache.needed()) {
        if (focus) {
          if (QR.cooldown.auto || Conf['Post on Captcha Completion']) {
            this.nodes.counter.focus();
          } else {
            QR.nodes.status.focus();
          }
        }
        this.reload();
      } else {
        if (pasted) {
          this.destroy();
        } else {
          if ((base = this.timeouts).destroy == null) {
            base.destroy = setTimeout(this.destroy.bind(this), 3 * $.SECOND);
          }
        }
        if (focus) {
          QR.nodes.status.focus();
        }
      }
      if (Conf['Post on Captcha Completion'] && !QR.cooldown.auto) {
        return QR.submit();
      }
    },
    count: function() {
      var count;
      count = Captcha.cache.getCount();
      this.nodes.counter.textContent = "Captchas: " + count;
      return this.moreNeeded();
    },
    reload: function() {
      if ($('iframe[src^="https://www.google.com/recaptcha/api/fallback?"]', this.nodes.container)) {
        this.destroy();
        return this.setup(false, true);
      } else {
        return $.global(function() {
          var container;
          container = document.querySelector('#qr .captcha-container');
          return window.grecaptcha.reset(container.dataset.widgetID);
        });
      }
    }
  };

}).call(this);

PassLink = (function() {
  var PassLink;

  PassLink = {
    init: function() {
      if (!Conf['Pass Link']) {
        return;
      }
      return Main.ready(this.ready);
    },
    ready: function() {
      var passLink, styleSelector;
      if (!(styleSelector = $.id('styleSelector'))) {
        return;
      }
      passLink = $.el('span', {
        className: 'brackets-wrap pass-link-container'
      });
      $.extend(passLink, {
        innerHTML: "<a href=\"javascript:;\">4chan Pass</a>"
      });
      $.on(passLink.firstElementChild, 'click', function() {
        return window.open("//sys." + (location.hostname.split('.')[1]) + ".org/auth", Date.now(), 'width=500,height=280,toolbar=0');
      });
      return $.before(styleSelector.previousSibling, [passLink, $.tn('\u00A0\u00A0')]);
    }
  };

  return PassLink;

}).call(this);

PostSuccessful = (function() {
  var PostSuccessful;

  PostSuccessful = {
    init: function() {
      if (!Conf['Remember Your Posts']) {
        return;
      }
      return $.ready(this.ready);
    },
    ready: function() {
      var _, db, postID, ref, threadID;
      if (d.title !== 'Post successful!') {
        return;
      }
      ref = $('h1').nextSibling.textContent.match(/thread:(\d+),no:(\d+)/), _ = ref[0], threadID = ref[1], postID = ref[2];
      postID = +postID;
      threadID = +threadID || postID;
      db = new DataBoard('yourPosts');
      return db.set({
        boardID: g.BOARD.ID,
        threadID: threadID,
        postID: postID,
        val: true
      });
    }
  };

  return PostSuccessful;

}).call(this);

QR = (function() {
  var QR,
    indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; },
    slice = [].slice;

  QR = {
    mimeTypes: ['image/jpeg', 'image/png', 'image/gif', 'application/pdf', 'application/vnd.adobe.flash.movie', 'application/x-shockwave-flash', 'video/webm'],
    validExtension: /\.(jpe?g|png|gif|pdf|swf|webm)$/i,
    typeFromExtension: {
      'jpg': 'image/jpeg',
      'jpeg': 'image/jpeg',
      'png': 'image/png',
      'gif': 'image/gif',
      'pdf': 'application/pdf',
      'swf': 'application/vnd.adobe.flash.movie',
      'webm': 'video/webm'
    },
    extensionFromType: {
      'image/jpeg': 'jpg',
      'image/png': 'png',
      'image/gif': 'gif',
      'application/pdf': 'pdf',
      'application/vnd.adobe.flash.movie': 'swf',
      'application/x-shockwave-flash': 'swf',
      'video/webm': 'webm'
    },
    init: function() {
      var sc;
      if (!Conf['Quick Reply']) {
        return;
      }
      this.posts = [];
      this.captcha = Captcha.v2;
      $.on(d, '4chanXInitFinished', function() {
        return BoardConfig.ready(QR.initReady);
      });
      Callbacks.Post.push({
        name: 'Quick Reply',
        cb: this.node
      });
      this.shortcut = sc = $.el('a', {
        className: 'fa fa-comment-o disabled',
        textContent: 'QR',
        title: 'Quick Reply',
        href: 'javascript:;'
      });
      $.on(sc, 'click', function() {
        if (!QR.postingIsEnabled) {
          return;
        }
        if (Conf['Persistent QR'] || !QR.nodes || QR.nodes.el.hidden) {
          QR.open();
          return QR.nodes.com.focus();
        } else {
          return QR.close();
        }
      });
      return Header.addShortcut('qr', sc, 540);
    },
    initReady: function() {
      var config, link, linkBot, navLinksBot, origToggle, prop;
      QR.postingIsEnabled = true;
      config = g.BOARD.config;
      prop = function(key, def) {
        var ref;
        return +((ref = config[key]) != null ? ref : def);
      };
      QR.min_width = prop('min_image_width', 1);
      QR.min_height = prop('min_image_height', 1);
      QR.max_width = QR.max_height = 10000;
      QR.max_size = prop('max_filesize', 4194304);
      QR.max_size_video = prop('max_webm_filesize', QR.max_size);
      QR.max_comment = prop('max_comment_chars', 2000);
      QR.max_width_video = QR.max_height_video = 2048;
      QR.max_duration_video = prop('max_webm_duration', 120);
      QR.forcedAnon = !!config.forced_anon;
      QR.spoiler = !!config.spoilers;
      if ((origToggle = $.id('togglePostFormLink'))) {
        link = $.el('h1', {
          className: "qr-link-container"
        });
        $.extend(link, {
          innerHTML: "<a href=\"javascript:;\" class=\"qr-link\">" + ((g.VIEW === "thread") ? "Reply to Thread" : "Start a Thread") + "</a>"
        });
        QR.link = link.firstElementChild;
        $.on(link.firstChild, 'click', function() {
          QR.open();
          return QR.nodes.com.focus();
        });
        $.before(origToggle, link);
        origToggle.firstElementChild.textContent = 'Original Form';
      }
      if (g.VIEW === 'thread') {
        linkBot = $.el('div', {
          className: "brackets-wrap qr-link-container-bottom"
        });
        $.extend(linkBot, {
          innerHTML: "<a href=\"javascript:;\" class=\"qr-link-bottom\">Reply to Thread</a>"
        });
        $.on(linkBot.firstElementChild, 'click', function() {
          QR.open();
          return QR.nodes.com.focus();
        });
        if ((navLinksBot = $('.navLinksBot'))) {
          $.prepend(navLinksBot, linkBot);
        }
      }
      $.on(d, 'QRGetFile', QR.getFile);
      $.on(d, 'QRDrawFile', QR.drawFile);
      $.on(d, 'QRSetFile', QR.setFile);
      $.on(d, 'paste', QR.paste);
      $.on(d, 'dragover', QR.dragOver);
      $.on(d, 'drop', QR.dropFile);
      $.on(d, 'dragstart dragend', QR.drag);
      $.on(d, 'IndexRefreshInternal', QR.generatePostableThreadsList);
      $.on(d, 'ThreadUpdate', QR.statusCheck);
      if (!Conf['Persistent QR']) {
        return;
      }
      QR.open();
      if (Conf['Auto Hide QR']) {
        return QR.hide();
      }
    },
    statusCheck: function() {
      var thread;
      if (!QR.nodes) {
        return;
      }
      thread = QR.posts[0].thread;
      if (thread !== 'new' && g.threads[g.BOARD + "." + thread].isDead) {
        return QR.abort();
      } else {
        return QR.status();
      }
    },
    node: function() {
      $.on(this.nodes.quote, 'click', QR.quote);
      if (this.isFetchedQuote) {
        return QR.generatePostableThreadsList();
      }
    },
    open: function() {
      var err;
      if (QR.nodes) {
        if (QR.nodes.el.hidden) {
          QR.captcha.setup();
        }
        QR.nodes.el.hidden = false;
        QR.unhide();
      } else {
        try {
          QR.dialog();
        } catch (_error) {
          err = _error;
          delete QR.nodes;
          Main.handleErrors({
            message: 'Quick Reply dialog creation crashed.',
            error: err
          });
          return;
        }
      }
      return $.rmClass(QR.shortcut, 'disabled');
    },
    close: function() {
      var j, len, post, ref;
      if (QR.req) {
        QR.abort();
        return;
      }
      QR.nodes.el.hidden = true;
      QR.cleanNotifications();
      QR.blur();
      $.rmClass(QR.nodes.el, 'dump');
      $.addClass(QR.shortcut, 'disabled');
      new QR.post(true);
      ref = QR.posts.splice(0, QR.posts.length - 1);
      for (j = 0, len = ref.length; j < len; j++) {
        post = ref[j];
        post["delete"]();
      }
      QR.cooldown.auto = false;
      QR.status();
      return QR.captcha.destroy();
    },
    focus: function() {
      return $.queueTask(function() {
        if (!QR.inBubble()) {
          QR.hasFocus = d.activeElement && QR.nodes.el.contains(d.activeElement);
          return QR.nodes.el.classList.toggle('focus', QR.hasFocus);
        }
      });
    },
    inBubble: function() {
      var bubbles, ref;
      bubbles = $$('iframe[src^="https://www.google.com/recaptcha/api2/frame"]');
      return (ref = d.activeElement, indexOf.call(bubbles, ref) >= 0) || bubbles.some(function(el) {
        return getComputedStyle(el).visibility !== 'hidden' && el.getBoundingClientRect().bottom > 0;
      });
    },
    hide: function() {
      QR.blur();
      $.addClass(QR.nodes.el, 'autohide');
      return QR.nodes.autohide.checked = true;
    },
    unhide: function() {
      $.rmClass(QR.nodes.el, 'autohide');
      return QR.nodes.autohide.checked = false;
    },
    toggleHide: function() {
      if (this.checked) {
        return QR.hide();
      } else {
        return QR.unhide();
      }
    },
    blur: function() {
      if (QR.nodes.el.contains(d.activeElement)) {
        return d.activeElement.blur();
      }
    },
    toggleSJIS: function(e) {
      e.preventDefault();
      Conf['sjisPreview'] = !Conf['sjisPreview'];
      $.set('sjisPreview', Conf['sjisPreview']);
      return QR.nodes.el.classList.toggle('sjis-preview', Conf['sjisPreview']);
    },
    texPreviewShow: function() {
      if ($.hasClass(QR.nodes.el, 'tex-preview')) {
        return QR.texPreviewHide();
      }
      $.addClass(QR.nodes.el, 'tex-preview');
      QR.nodes.texPreview.textContent = QR.nodes.com.value;
      return $.event('mathjax', null, QR.nodes.texPreview);
    },
    texPreviewHide: function() {
      return $.rmClass(QR.nodes.el, 'tex-preview');
    },
    addPost: function() {
      var wasOpen;
      wasOpen = QR.nodes && !QR.nodes.el.hidden;
      QR.open();
      if (wasOpen) {
        $.addClass(QR.nodes.el, 'dump');
        new QR.post(true);
      }
      return QR.nodes.com.focus();
    },
    setCustomCooldown: function(enabled) {
      Conf['customCooldownEnabled'] = enabled;
      QR.cooldown.customCooldown = enabled;
      return QR.nodes.customCooldown.classList.toggle('disabled', !enabled);
    },
    toggleCustomCooldown: function() {
      var enabled;
      enabled = $.hasClass(QR.nodes.customCooldown, 'disabled');
      QR.setCustomCooldown(enabled);
      return $.set('customCooldownEnabled', enabled);
    },
    error: function(err, focusOverride) {
      var el, notice, notif;
      QR.open();
      if (typeof err === 'string') {
        el = $.tn(err);
      } else {
        el = err;
        el.removeAttribute('style');
      }
      notice = new Notice('warning', el);
      QR.notifications.push(notice);
      if (!Header.areNotificationsEnabled) {
        if (d.hidden && !QR.cooldown.auto) {
          return alert(el.textContent);
        }
      } else if (d.hidden || !(focusOverride || d.hasFocus())) {
        notif = new Notification(el.textContent, {
          body: el.textContent,
          icon: Favicon.logo
        });
        notif.onclick = function() {
          return window.focus();
        };
        if ($.engine !== 'gecko') {
          notif.onclose = function() {
            return notice.close();
          };
          return notif.onshow = function() {
            return setTimeout(function() {
              notif.onclose = null;
              return notif.close();
            }, 7 * $.SECOND);
          };
        }
      }
    },
    connectionError: function() {
      return $.el('span', {
        innerHTML: "Connection error while posting. [<a href=\"https://github.com/ccd0/4chan-x/wiki/Frequently-Asked-Questions#connection-errors\" target=\"_blank\">More info</a>]"
      });
    },
    notifications: [],
    cleanNotifications: function() {
      var j, len, notification, ref;
      ref = QR.notifications;
      for (j = 0, len = ref.length; j < len; j++) {
        notification = ref[j];
        notification.close();
      }
      return QR.notifications = [];
    },
    status: function() {
      var disabled, status, thread, value;
      if (!QR.nodes) {
        return;
      }
      thread = QR.posts[0].thread;
      if (thread !== 'new' && g.threads[g.BOARD + "." + thread].isDead) {
        value = 'Dead';
        disabled = true;
        QR.cooldown.auto = false;
      }
      value = QR.req ? QR.req.progress : QR.cooldown.seconds || value;
      status = QR.nodes.status;
      status.value = !value ? 'Submit' : QR.cooldown.auto ? "Auto " + value : value;
      return status.disabled = disabled || false;
    },
    openPost: function() {
      var index;
      QR.open();
      if (QR.selected.isLocked) {
        index = QR.posts.indexOf(QR.selected);
        (QR.posts[index + 1] || new QR.post()).select();
        $.addClass(QR.nodes.el, 'dump');
        return QR.cooldown.auto = true;
      }
    },
    quote: function(e) {
      var ancestor, caretPos, com, frag, i, insideCode, j, k, l, len, len1, len2, len3, n, node, o, post, postRange, range, ref, ref1, ref2, ref3, ref4, ref5, ref6, root, sel, text, thread;
      if (e != null) {
        e.preventDefault();
      }
      if (!QR.postingIsEnabled) {
        return;
      }
      sel = d.getSelection();
      post = Get.postFromNode(this);
      root = post.nodes.root;
      postRange = new Range();
      postRange.selectNode(root);
      text = post.board.ID === g.BOARD.ID ? ">>" + post + "\n" : ">>>/" + post.board + "/" + post + "\n";
      for (i = j = 0, ref = sel.rangeCount; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
        range = sel.getRangeAt(i);
        if (range.compareBoundaryPoints(Range.START_TO_START, postRange) < 0) {
          range.setStartBefore(root);
        }
        if (range.compareBoundaryPoints(Range.END_TO_END, postRange) > 0) {
          range.setEndAfter(root);
        }
        if (!range.toString().trim()) {
          continue;
        }
        frag = range.cloneContents();
        ancestor = range.commonAncestorContainer;
        if ($.x('ancestor-or-self::*[self::s or contains(@class,"removed-spoiler")]', ancestor)) {
          $.prepend(frag, $.tn('[spoiler]'));
          $.add(frag, $.tn('[/spoiler]'));
        }
        if (insideCode = $.x('ancestor-or-self::pre[contains(@class,"prettyprint")]', ancestor)) {
          $.prepend(frag, $.tn('[code]'));
          $.add(frag, $.tn('[/code]'));
        }
        ref1 = $$((insideCode ? 'br' : '.prettyprint br'), frag);
        for (k = 0, len = ref1.length; k < len; k++) {
          node = ref1[k];
          $.replace(node, $.tn('\n'));
        }
        ref2 = $$('br', frag);
        for (l = 0, len1 = ref2.length; l < len1; l++) {
          node = ref2[l];
          if (node !== frag.lastChild) {
            $.replace(node, $.tn('\n>'));
          }
        }
        if (typeof Site.insertTags === "function") {
          Site.insertTags(frag);
        }
        ref3 = $$('.linkify[data-original]', frag);
        for (n = 0, len2 = ref3.length; n < len2; n++) {
          node = ref3[n];
          $.replace(node, $.tn(node.dataset.original));
        }
        ref4 = $$('.embedder', frag);
        for (o = 0, len3 = ref4.length; o < len3; o++) {
          node = ref4[o];
          if (((ref5 = node.previousSibling) != null ? ref5.nodeValue : void 0) === ' ') {
            $.rm(node.previousSibling);
          }
          $.rm(node);
        }
        text += ">" + (frag.textContent.trim()) + "\n";
      }
      QR.openPost();
      ref6 = QR.nodes, com = ref6.com, thread = ref6.thread;
      if (!com.value) {
        thread.value = Get.threadFromNode(this);
      }
      caretPos = com.selectionStart;
      com.value = com.value.slice(0, caretPos) + text + com.value.slice(com.selectionEnd);
      range = caretPos + text.length;
      com.setSelectionRange(range, range);
      com.focus();
      QR.selected.save(com);
      return QR.selected.save(thread);
    },
    characterCount: function() {
      var count, counter;
      counter = QR.nodes.charCount;
      count = QR.nodes.com.value.replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g, '_').length;
      counter.textContent = count;
      counter.hidden = count < QR.max_comment / 2;
      return (count > QR.max_comment ? $.addClass : $.rmClass)(counter, 'warning');
    },
    getFile: function() {
      var ref;
      return $.event('QRFile', (ref = QR.selected) != null ? ref.file : void 0);
    },
    drawFile: function(e) {
      var el, file, isVideo, ref;
      file = (ref = QR.selected) != null ? ref.file : void 0;
      if (!(file && /^(image|video)\//.test(file.type))) {
        return;
      }
      isVideo = /^video\//.test(file);
      el = $.el((isVideo ? 'video' : 'img'));
      $.on(el, 'error', function() {
        return QR.openError();
      });
      $.on(el, (isVideo ? 'loadeddata' : 'load'), function() {
        e.target.getContext('2d').drawImage(el, 0, 0);
        return URL.revokeObjectURL(el.src);
      });
      return el.src = URL.createObjectURL(file);
    },
    openError: function() {
      var div;
      div = $.el('div');
      $.extend(div, {
        innerHTML: "Could not open file. [<a href=\"https://github.com/ccd0/4chan-x/wiki/Frequently-Asked-Questions#error-reading-metadata\" target=\"_blank\">More info</a>]"
      });
      return QR.error(div);
    },
    setFile: function(e) {
      var file, name, ref, source;
      ref = e.detail, file = ref.file, name = ref.name, source = ref.source;
      if (name != null) {
        file.name = name;
      }
      if (source != null) {
        file.source = source;
      }
      QR.open();
      return QR.handleFiles([file]);
    },
    drag: function(e) {
      var toggle;
      toggle = e.type === 'dragstart' ? $.off : $.on;
      toggle(d, 'dragover', QR.dragOver);
      return toggle(d, 'drop', QR.dropFile);
    },
    dragOver: function(e) {
      e.preventDefault();
      return e.dataTransfer.dropEffect = 'copy';
    },
    dropFile: function(e) {
      if (!e.dataTransfer.files.length) {
        return;
      }
      e.preventDefault();
      QR.open();
      return QR.handleFiles(e.dataTransfer.files);
    },
    paste: function(e) {
      var blob, file, file2, item, j, len, ref, score, score2, type;
      if (!e.clipboardData.items) {
        return;
      }
      file = null;
      score = -1;
      ref = e.clipboardData.items;
      for (j = 0, len = ref.length; j < len; j++) {
        item = ref[j];
        if (!(item.kind === 'file' && (file2 = item.getAsFile()))) {
          continue;
        }
        score2 = 2 * (file2.size <= QR.max_size) + (file2.type === 'image/png');
        if (score2 > score) {
          file = file2;
          score = score2;
        }
      }
      if (file) {
        type = file.type;
        blob = new Blob([file], {
          type: type
        });
        blob.name = Conf['pastedname'] + "." + (QR.extensionFromType[type] || 'jpg');
        QR.open();
        QR.handleFiles([blob]);
        $.addClass(QR.nodes.el, 'dump');
      }
    },
    pasteFF: function() {
      var arr, blob, bstr, i, images, img, j, k, len, m, pasteArea, ref, src;
      pasteArea = QR.nodes.pasteArea;
      if (!pasteArea.childNodes.length) {
        return;
      }
      images = $$('img', pasteArea);
      $.rmAll(pasteArea);
      for (j = 0, len = images.length; j < len; j++) {
        img = images[j];
        src = img.src;
        if (m = src.match(/data:(image\/(\w+));base64,(.+)/)) {
          bstr = atob(m[3]);
          arr = new Uint8Array(bstr.length);
          for (i = k = 0, ref = bstr.length; 0 <= ref ? k < ref : k > ref; i = 0 <= ref ? ++k : --k) {
            arr[i] = bstr.charCodeAt(i);
          }
          blob = new Blob([arr], {
            type: m[1]
          });
          blob.name = Conf['pastedname'] + "." + m[2];
          QR.handleFiles([blob]);
        } else if (/^https?:\/\//.test(src)) {
          QR.handleUrl(src);
        }
      }
    },
    handleUrl: function(urlDefault) {
      var url;
      QR.open();
      QR.selected.preventAutoPost();
      url = prompt('Enter a URL:', urlDefault);
      if (url === null) {
        return;
      }
      QR.nodes.fileButton.focus();
      return CrossOrigin.file(url, function(blob) {
        if (blob && !/^text\//.test(blob.type)) {
          return QR.handleFiles([blob]);
        } else {
          return QR.error("Can't load file.");
        }
      });
    },
    handleFiles: function(files) {
      var file, j, len;
      if (this !== QR) {
        files = slice.call(this.files);
        this.value = null;
      }
      if (!files.length) {
        return;
      }
      QR.cleanNotifications();
      for (j = 0, len = files.length; j < len; j++) {
        file = files[j];
        QR.handleFile(file, files.length);
      }
      if (files.length !== 1) {
        $.addClass(QR.nodes.el, 'dump');
      }
      if (d.activeElement === QR.nodes.fileButton && $.hasClass(QR.nodes.fileSubmit, 'has-file')) {
        return QR.nodes.filename.focus();
      }
    },
    handleFile: function(file, nfiles) {
      var isText, post;
      isText = /^text\//.test(file.type);
      if (nfiles === 1) {
        post = QR.selected;
      } else {
        post = QR.posts[QR.posts.length - 1];
        if ((isText ? post.com || post.pasting : post.file)) {
          post = new QR.post();
        }
      }
      return post[isText ? 'pasteText' : 'setFile'](file);
    },
    openFileInput: function() {
      if (QR.nodes.fileButton.disabled) {
        return;
      }
      QR.nodes.fileInput.click();
      return QR.nodes.fileButton.focus();
    },
    generatePostableThreadsList: function() {
      var j, len, list, options, ref, thread, val;
      if (!QR.nodes) {
        return;
      }
      list = QR.nodes.thread;
      options = [list.firstElementChild];
      ref = g.BOARD.threads.keys;
      for (j = 0, len = ref.length; j < len; j++) {
        thread = ref[j];
        options.push($.el('option', {
          value: thread,
          textContent: "Thread " + thread
        }));
      }
      val = list.value;
      $.rmAll(list);
      $.add(list, options);
      list.value = val;
      if (list.value === val) {
        return;
      }
      list.value = g.VIEW === 'thread' ? g.THREADID : 'new';
      return (g.VIEW === 'thread' ? $.addClass : $.rmClass)(QR.nodes.el, 'reply-to-thread');
    },
    dialog: function() {
      var classList, config, dialog, event, i, items, name, node, nodes, save, setNode;
      QR.nodes = nodes = {
        el: dialog = UI.dialog('qr', {
          innerHTML: "<div class=\"move\"><label><input type=\"checkbox\" id=\"autohide\" title=\"Auto-hide\">Quick Reply</label><a href=\"javascript:;\" class=\"close\" title=\"Close\">×</a><select data-name=\"thread\" title=\"Create a new thread / Reply\"><option value=\"new\">New thread</option></select></div><form><div class=\"persona\"><button type=\"button\" id=\"sjis-toggle\" title=\"Toggle Mona font\">∀</button><button type=\"button\" id=\"tex-preview-button\" title=\"Preview TeX\">T<sub>E</sub>X</button><input name=\"name\" data-name=\"name\" list=\"list-name\" placeholder=\"Name\" class=\"field\" size=\"1\"><input name=\"email\" data-name=\"email\" list=\"list-email\" placeholder=\"Options\" class=\"field\" size=\"1\"><input name=\"sub\" data-name=\"sub\" list=\"list-sub\" placeholder=\"Subject\" class=\"field\" size=\"1\"></div><div class=\"textarea\"><textarea data-name=\"com\" placeholder=\"Comment\" class=\"field\"></textarea><span id=\"char-count\"></span><div id=\"tex-preview\"></div></div><div id=\"dump-list-container\"><div id=\"dump-list\"></div><a id=\"add-post\" href=\"javascript:;\" title=\"Add a post\">+</a></div><div class=\"oekaki\" hidden><input type=\"button\" id=\"qr-draw-button\" value=\"Draw\"><label><span>Width:</span><input name=\"oekaki-width\" value=\"400\" type=\"number\" class=\"field\" size=\"1\"></label><label><span>Height:</span><input name=\"oekaki-height\" value=\"400\" type=\"number\" class=\"field\" size=\"1\"></label><span class=\"oekaki-bg\" title=\"Background Color\"><input name=\"oekaki-bg\" type=\"checkbox\" checked><input name=\"oekaki-bgcolor\" type=\"color\" value=\"#ffffff\"></span></div><div id=\"file-n-submit\"><input type=\"button\" id=\"qr-file-button\" value=\"Files\"><span id=\"qr-filename-container\" class=\"field\"><span id=\"qr-no-file\">No selected file</span><input id=\"qr-filename\" data-name=\"filename\" spellcheck=\"false\"><label id=\"qr-spoiler-label\"><input type=\"checkbox\" id=\"qr-file-spoiler\" title=\"Spoiler image\"><a class=\"checkbox-letter\">S</a></label><a id=\"qr-oekaki-button\" title=\"Edit in Tegaki\"><i class=\"fa fa-edit\"></i></a><a href=\"javascript:;\" id=\"qr-filerm\" title=\"Remove file\"><i class=\"fa fa-times-circle\"></i></a><a id=\"url-button\" title=\"Post from URL\"><i class=\"fa fa-link\"></i></a><a hidden id=\"paste-area\" title=\"Select to paste images\" class=\"fa fa-clipboard\" tabindex=\"-1\" contentEditable=\"true\"></a><a id=\"custom-cooldown-button\" title=\"Toggle custom cooldown\" class=\"disabled\"><i class=\"fa fa-clock-o\"></i></a><a id=\"dump-button\" title=\"Dump list\"><i class=\"fa fa-plus-square\"></i></a></span><input type=\"submit\"></div><select data-default=\"4\" name=\"filetag\"><option value=\"0\">Hentai</option><option value=\"6\">Porn</option><option value=\"1\">Japanese</option><option value=\"2\">Anime</option><option value=\"3\">Game</option><option value=\"5\">Loop</option><option value=\"4\" selected>Other</option></select><input type=\"file\" multiple></form><datalist id=\"list-name\"></datalist><datalist id=\"list-email\"></datalist><datalist id=\"list-sub\"></datalist> "
        })
      };
      setNode = function(name, query) {
        return nodes[name] = $(query, dialog);
      };
      setNode('move', '.move');
      setNode('autohide', '#autohide');
      setNode('close', '.close');
      setNode('thread', 'select');
      setNode('form', 'form');
      setNode('sjisToggle', '#sjis-toggle');
      setNode('texButton', '#tex-preview-button');
      setNode('name', '[data-name=name]');
      setNode('email', '[data-name=email]');
      setNode('sub', '[data-name=sub]');
      setNode('com', '[data-name=com]');
      setNode('charCount', '#char-count');
      setNode('texPreview', '#tex-preview');
      setNode('dumpList', '#dump-list');
      setNode('addPost', '#add-post');
      setNode('oekaki', '.oekaki');
      setNode('drawButton', '#qr-draw-button');
      setNode('fileSubmit', '#file-n-submit');
      setNode('fileButton', '#qr-file-button');
      setNode('noFile', '#qr-no-file');
      setNode('filename', '#qr-filename');
      setNode('spoiler', '#qr-file-spoiler');
      setNode('oekakiButton', '#qr-oekaki-button');
      setNode('fileRM', '#qr-filerm');
      setNode('urlButton', '#url-button');
      setNode('pasteArea', '#paste-area');
      setNode('customCooldown', '#custom-cooldown-button');
      setNode('dumpButton', '#dump-button');
      setNode('status', '[type=submit]');
      setNode('flashTag', '[name=filetag]');
      setNode('fileInput', '[type=file]');
      config = g.BOARD.config;
      classList = QR.nodes.el.classList;
      classList.toggle('forced-anon', QR.forcedAnon);
      classList.toggle('has-spoiler', QR.spoiler);
      classList.toggle('has-sjis', !!config.sjis_tags);
      classList.toggle('has-math', !!config.math_tags);
      classList.toggle('sjis-preview', !!config.sjis_tags && Conf['sjisPreview']);
      classList.toggle('show-new-thread-option', Conf['Show New Thread Option in Threads']);
      if (parseInt(Conf['customCooldown'], 10) > 0) {
        $.addClass(QR.nodes.fileSubmit, 'custom-cooldown');
        $.get('customCooldownEnabled', Conf['customCooldownEnabled'], function(arg) {
          var customCooldownEnabled;
          customCooldownEnabled = arg.customCooldownEnabled;
          QR.setCustomCooldown(customCooldownEnabled);
          return $.sync('customCooldownEnabled', QR.setCustomCooldown);
        });
      }
      QR.flagsInput();
      $.on(nodes.autohide, 'change', QR.toggleHide);
      $.on(nodes.close, 'click', QR.close);
      $.on(nodes.form, 'submit', QR.submit);
      $.on(nodes.sjisToggle, 'click', QR.toggleSJIS);
      $.on(nodes.texButton, 'mousedown', QR.texPreviewShow);
      $.on(nodes.texButton, 'mouseup', QR.texPreviewHide);
      $.on(nodes.addPost, 'click', function() {
        return new QR.post(true);
      });
      $.on(nodes.drawButton, 'click', QR.oekaki.draw);
      $.on(nodes.fileButton, 'click', QR.openFileInput);
      $.on(nodes.noFile, 'click', QR.openFileInput);
      $.on(nodes.filename, 'focus', function() {
        return $.addClass(this.parentNode, 'focus');
      });
      $.on(nodes.filename, 'blur', function() {
        return $.rmClass(this.parentNode, 'focus');
      });
      $.on(nodes.spoiler, 'change', function() {
        return QR.selected.nodes.spoiler.click();
      });
      $.on(nodes.oekakiButton, 'click', QR.oekaki.button);
      $.on(nodes.fileRM, 'click', function() {
        return QR.selected.rmFile();
      });
      $.on(nodes.urlButton, 'click', function() {
        return QR.handleUrl('');
      });
      $.on(nodes.customCooldown, 'click', QR.toggleCustomCooldown);
      $.on(nodes.dumpButton, 'click', function() {
        return nodes.el.classList.toggle('dump');
      });
      $.on(nodes.fileInput, 'change', QR.handleFiles);
      window.addEventListener('focus', QR.focus, true);
      window.addEventListener('blur', QR.focus, true);
      $.on(d, 'click', QR.focus);
      if ($.engine === 'gecko' && !window.DataTransferItemList) {
        nodes.pasteArea.hidden = false;
      }
      new MutationObserver(QR.pasteFF).observe(nodes.pasteArea, {
        childList: true
      });
      items = ['thread', 'name', 'email', 'sub', 'com', 'filename', 'flag'];
      i = 0;
      save = function() {
        return QR.selected.save(this);
      };
      while (name = items[i++]) {
        if (!(node = nodes[name])) {
          continue;
        }
        event = node.nodeName === 'SELECT' ? 'change' : 'input';
        $.on(nodes[name], event, save);
      }
      if ($.engine === 'gecko' && Conf['Remember QR Size']) {
        $.get('QR Size', '', function(item) {
          return nodes.com.style.cssText = item['QR Size'];
        });
        $.on(nodes.com, 'mouseup', function(e) {
          if (e.button !== 0) {
            return;
          }
          return $.set('QR Size', this.style.cssText);
        });
      }
      QR.generatePostableThreadsList();
      QR.persona.load();
      new QR.post(true);
      QR.status();
      QR.cooldown.setup();
      QR.captcha.init();
      $.add(d.body, dialog);
      QR.captcha.setup();
      QR.oekaki.setup();
      return $.event('QRDialogCreation', null, dialog);
    },
    flags: function() {
      var addFlag, ref, select, textContent, value;
      select = $.el('select', {
        name: 'flag',
        className: 'flagSelector'
      });
      addFlag = function(value, textContent) {
        return $.add(select, $.el('option', {
          value: value,
          textContent: textContent
        }));
      };
      addFlag('0', 'Geographic Location');
      ref = BoardConfig.troll_flags;
      for (value in ref) {
        textContent = ref[value];
        addFlag(value, textContent);
      }
      return select;
    },
    flagsInput: function() {
      var flag, nodes;
      nodes = QR.nodes;
      if (!nodes) {
        return;
      }
      if (nodes.flag) {
        $.rm(nodes.flag);
        delete nodes.flag;
      }
      if (g.BOARD.ID === 'pol') {
        flag = QR.flags();
        flag.dataset.name = 'flag';
        flag.dataset["default"] = '0';
        nodes.flag = flag;
        return $.add(nodes.form, flag);
      }
    },
    submit: function(e) {
      var captcha, cb, err, extra, filetag, formData, options, post, ref, thread, threadID;
      if (e != null) {
        e.preventDefault();
      }
      if (QR.req) {
        QR.abort();
        return;
      }
      $.forceSync('cooldowns');
      if (QR.cooldown.seconds) {
        QR.cooldown.auto = !QR.cooldown.auto;
        QR.status();
        return;
      }
      post = QR.posts[0];
      post.forceSave();
      threadID = post.thread;
      thread = g.BOARD.threads[threadID];
      if (g.BOARD.ID === 'f' && threadID === 'new') {
        filetag = QR.nodes.flashTag.value;
      }
      if (threadID === 'new') {
        threadID = null;
        if (!!g.BOARD.config.require_subject && !post.sub) {
          err = 'New threads require a subject.';
        } else if (!(!!g.BOARD.config.text_only || post.file)) {
          err = 'No file selected.';
        }
      } else if (g.BOARD.threads[threadID].isClosed) {
        err = 'You can\'t reply to this thread anymore.';
      } else if (!(post.com || post.file)) {
        err = 'No comment or file.';
      } else if (post.file && thread.fileLimit) {
        err = 'Max limit of image replies has been reached.';
      }
      if (g.BOARD.ID === 'r9k' && !((ref = post.com) != null ? ref.match(/[a-z-]/i) : void 0)) {
        err || (err = 'Original comment required.');
      }
      if (QR.captcha.isEnabled && !(/\b_ct=/.test(d.cookie) && threadID) && !err) {
        captcha = QR.captcha.getOne(!!threadID);
        if (!captcha) {
          err = 'No valid captcha.';
          QR.captcha.setup(!QR.cooldown.auto || d.activeElement === QR.nodes.status);
        }
      }
      QR.cleanNotifications();
      if (err) {
        QR.cooldown.auto = false;
        QR.status();
        QR.error(err);
        return;
      }
      QR.cooldown.auto = QR.posts.length > 1;
      post.lock();
      formData = {
        resto: threadID,
        name: !QR.forcedAnon ? post.name : void 0,
        email: post.email,
        sub: !(QR.forcedAnon || threadID) ? post.sub : void 0,
        com: post.com,
        upfile: post.file,
        filetag: filetag,
        spoiler: post.spoiler,
        flag: post.flag,
        mode: 'regist',
        pwd: QR.persona.getPassword()
      };
      options = {
        responseType: 'document',
        withCredentials: true,
        onload: QR.response,
        onerror: function() {
          delete QR.req;
          if (QR.currentCaptcha) {
            Captcha.cache.save(QR.currentCaptcha);
          }
          delete QR.currentCaptcha;
          post.unlock();
          QR.cooldown.auto = true;
          QR.cooldown.addDelay(post, 2);
          QR.status();
          return QR.error(QR.connectionError());
        }
      };
      extra = {
        form: $.formData(formData)
      };
      if (Conf['Show Upload Progress']) {
        extra.upCallbacks = {
          onload: function() {
            QR.req.isUploadFinished = true;
            QR.req.progress = '...';
            return QR.status();
          },
          onprogress: function(e) {
            QR.req.progress = (Math.round(e.loaded / e.total * 100)) + "%";
            return QR.status();
          }
        };
      }
      cb = function(response) {
        if (response != null) {
          QR.currentCaptcha = response;
          if (response.challenge != null) {
            extra.form.append('recaptcha_challenge_field', response.challenge);
            extra.form.append('recaptcha_response_field', response.response);
          } else {
            extra.form.append('g-recaptcha-response', response.response);
          }
        }
        QR.req = $.ajax("https://sys." + (location.hostname.split('.')[1]) + ".org/" + g.BOARD + "/post", options, extra);
        return QR.req.progress = '...';
      };
      if (typeof captcha === 'function') {
        QR.req = {
          progress: '...',
          abort: function() {
            return cb = null;
          }
        };
        captcha(function(response) {
          if (response) {
            return typeof cb === "function" ? cb(response) : void 0;
          } else {
            delete QR.req;
            post.unlock();
            QR.cooldown.auto = !!Captcha.cache.getCount();
            return QR.status();
          }
        });
      } else {
        cb(captcha);
      }
      return QR.status();
    },
    response: function() {
      var URL, _, connErr, err, h1, isReply, lastPostToThread, m, open, post, postID, postsCount, ref, ref1, ref2, req, resDoc, seconds, threadID;
      req = QR.req;
      delete QR.req;
      post = QR.posts[0];
      post.unlock();
      resDoc = req.response;
      if ((err = resDoc.getElementById('errmsg'))) {
        if ((ref = $('a', err)) != null) {
          ref.target = '_blank';
        }
      } else if ((connErr = resDoc.title !== 'Post successful!')) {
        err = QR.connectionError();
        if (QR.currentCaptcha) {
          Captcha.cache.save(QR.currentCaptcha);
        }
      } else if (req.status !== 200) {
        err = "Error " + req.statusText + " (" + req.status + ")";
      }
      delete QR.currentCaptcha;
      if (err) {
        if (/captcha|verification/i.test(err.textContent) || connErr) {
          if (/mistyped/i.test(err.textContent)) {
            err = 'You mistyped the CAPTCHA, or the CAPTCHA malfunctioned.';
          } else if (/expired/i.test(err.textContent)) {
            err = 'This CAPTCHA is no longer valid because it has expired.';
          }
          QR.cooldown.auto = QR.captcha.isEnabled || connErr;
          QR.cooldown.addDelay(post, 2);
        } else if (err.textContent && (m = err.textContent.match(/(?:(\d+)\s+minutes?\s+)?(\d+)\s+second/i)) && !/duplicate|hour/i.test(err.textContent)) {
          QR.cooldown.auto = !/have\s+been\s+muted/i.test(err.textContent);
          seconds = 60 * (+(m[1] || 0)) + (+m[2]);
          if (/muted/i.test(err.textContent)) {
            QR.cooldown.addMute(seconds);
          } else {
            QR.cooldown.addDelay(post, seconds);
          }
        } else {
          QR.cooldown.auto = false;
        }
        QR.captcha.setup(QR.cooldown.auto && ((ref1 = d.activeElement) === QR.nodes.status || ref1 === d.body));
        QR.status();
        QR.error(err);
        return;
      }
      h1 = $('h1', resDoc);
      ref2 = h1.nextSibling.textContent.match(/thread:(\d+),no:(\d+)/), _ = ref2[0], threadID = ref2[1], postID = ref2[2];
      postID = +postID;
      threadID = +threadID || postID;
      isReply = threadID !== postID;
      $.event('QRPostSuccessful', {
        boardID: g.BOARD.ID,
        threadID: threadID,
        postID: postID
      });
      $.event('QRPostSuccessful_', {
        boardID: g.BOARD.ID,
        threadID: threadID,
        postID: postID
      });
      postsCount = QR.posts.length - 1;
      QR.cooldown.auto = postsCount && isReply;
      lastPostToThread = !((function() {
        var j, len, p, ref3;
        ref3 = QR.posts.slice(1);
        for (j = 0, len = ref3.length; j < len; j++) {
          p = ref3[j];
          if (p.thread === post.thread) {
            return true;
          }
        }
      })());
      if (postsCount) {
        post.rm();
        QR.captcha.setup(d.activeElement === QR.nodes.status);
      } else if (Conf['Persistent QR']) {
        post.rm();
        if (Conf['Auto Hide QR']) {
          QR.hide();
        } else {
          QR.blur();
        }
      } else {
        QR.close();
      }
      QR.cleanNotifications();
      if (Conf['Posting Success Notifications']) {
        QR.notifications.push(new Notice('success', h1.textContent, 5));
      }
      QR.cooldown.add(threadID, postID);
      URL = threadID === postID ? window.location.origin + "/" + g.BOARD + "/thread/" + threadID : threadID !== g.THREADID && lastPostToThread && Conf['Open Post in New Tab'] ? window.location.origin + "/" + g.BOARD + "/thread/" + threadID + "#p" + postID : void 0;
      if (URL) {
        open = Conf['Open Post in New Tab'] || postsCount ? function() {
          return $.open(URL);
        } : function() {
          return location.href = URL;
        };
        if (threadID === postID) {
          QR.waitForThread(URL, open);
        } else {
          open();
        }
      }
      return QR.status();
    },
    waitForThread: function(url, cb) {
      var attempts, check;
      attempts = 0;
      check = function() {
        return $.ajax(url, {
          onloadend: function() {
            attempts++;
            if (attempts >= 6 || this.status === 200) {
              return cb();
            } else {
              return setTimeout(check, attempts * $.SECOND);
            }
          }
        }, {
          type: 'HEAD'
        });
      };
      return check();
    },
    abort: function() {
      if (QR.req && !QR.req.isUploadFinished) {
        QR.req.abort();
        delete QR.req;
        if (QR.currentCaptcha) {
          Captcha.cache.save(QR.currentCaptcha);
        }
        delete QR.currentCaptcha;
        QR.posts[0].unlock();
        QR.cooldown.auto = false;
        QR.notifications.push(new Notice('info', 'QR upload aborted.', 5));
      }
      return QR.status();
    }
  };

  return QR;

}).call(this);

(function() {
  QR.cooldown = {
    seconds: 0,
    delays: {
      deletion: 60
    },
    init: function() {
      if (!Conf['Quick Reply']) {
        return;
      }
      this.data = Conf['cooldowns'];
      this.changes = {};
      return $.sync('cooldowns', this.sync);
    },
    setup: function() {
      var delay, ref, type;
      $.extend(QR.cooldown.delays, g.BOARD.cooldowns());
      QR.cooldown.maxDelay = 0;
      ref = QR.cooldown.delays;
      for (type in ref) {
        delay = ref[type];
        if (type !== 'thread' && type !== 'thread_global') {
          QR.cooldown.maxDelay = Math.max(QR.cooldown.maxDelay, delay);
        }
      }
      QR.cooldown.isSetup = true;
      return QR.cooldown.start();
    },
    start: function() {
      var data;
      data = QR.cooldown.data;
      if (!(Conf['Cooldown'] && QR.cooldown.isSetup && !QR.cooldown.isCounting && Object.keys(data[g.BOARD.ID] || {}).length + Object.keys(data.global || {}).length > 0)) {
        return;
      }
      QR.cooldown.isCounting = true;
      return QR.cooldown.count();
    },
    sync: function(data) {
      QR.cooldown.data = data || {};
      return QR.cooldown.start();
    },
    add: function(threadID, postID) {
      var boardID, start;
      if (!Conf['Cooldown']) {
        return;
      }
      start = Date.now();
      boardID = g.BOARD.ID;
      QR.cooldown.set(boardID, start, {
        threadID: threadID,
        postID: postID
      });
      if (threadID === postID) {
        QR.cooldown.set('global', start, {
          boardID: boardID,
          threadID: threadID,
          postID: postID
        });
      }
      QR.cooldown.save();
      return QR.cooldown.start();
    },
    addDelay: function(post, delay) {
      var cooldown;
      if (!Conf['Cooldown']) {
        return;
      }
      cooldown = QR.cooldown.categorize(post);
      cooldown.delay = delay;
      QR.cooldown.set(g.BOARD.ID, Date.now(), cooldown);
      QR.cooldown.save();
      return QR.cooldown.start();
    },
    addMute: function(delay) {
      if (!Conf['Cooldown']) {
        return;
      }
      QR.cooldown.set(g.BOARD.ID, Date.now(), {
        type: 'mute',
        delay: delay
      });
      QR.cooldown.save();
      return QR.cooldown.start();
    },
    "delete": function(post) {
      var base, cooldown, cooldowns, id, name;
      if (!QR.cooldown.data) {
        return;
      }
      cooldowns = ((base = QR.cooldown.data)[name = post.board.ID] || (base[name] = {}));
      for (id in cooldowns) {
        cooldown = cooldowns[id];
        if ((cooldown.delay == null) && cooldown.threadID === post.thread.ID && cooldown.postID === post.ID) {
          QR.cooldown.set(post.board.ID, id, null);
        }
      }
      return QR.cooldown.save();
    },
    secondsDeletion: function(post) {
      var cooldown, cooldowns, seconds, start;
      if (!(QR.cooldown.data && Conf['Cooldown'])) {
        return 0;
      }
      cooldowns = QR.cooldown.data[post.board.ID] || {};
      for (start in cooldowns) {
        cooldown = cooldowns[start];
        if ((cooldown.delay == null) && cooldown.threadID === post.thread.ID && cooldown.postID === post.ID) {
          seconds = QR.cooldown.delays.deletion - Math.floor((Date.now() - start) / $.SECOND);
          return Math.max(seconds, 0);
        }
      }
      return 0;
    },
    categorize: function(post) {
      if (post.thread === 'new') {
        return {
          type: 'thread'
        };
      } else {
        return {
          type: !!post.file ? 'image' : 'reply',
          threadID: +post.thread
        };
      }
    },
    mergeChange: function(data, scope, id, value) {
      if (value) {
        return (data[scope] || (data[scope] = {}))[id] = value;
      } else if (scope in data) {
        delete data[scope][id];
        if (Object.keys(data[scope]).length === 0) {
          return delete data[scope];
        }
      }
    },
    set: function(scope, id, value) {
      var base;
      QR.cooldown.mergeChange(QR.cooldown.data, scope, id, value);
      return ((base = QR.cooldown.changes)[scope] || (base[scope] = {}))[id] = value;
    },
    save: function() {
      var changes;
      changes = QR.cooldown.changes;
      if (!Object.keys(changes).length) {
        return;
      }
      return $.get('cooldowns', {}, function(arg) {
        var cooldowns, id, ref, scope, value;
        cooldowns = arg.cooldowns;
        for (scope in QR.cooldown.changes) {
          ref = QR.cooldown.changes[scope];
          for (id in ref) {
            value = ref[id];
            QR.cooldown.mergeChange(cooldowns, scope, id, value);
          }
          QR.cooldown.data = cooldowns;
        }
        return $.set('cooldowns', cooldowns, function() {
          return QR.cooldown.changes = {};
        });
      });
    },
    update: function() {
      var base, cooldown, cooldowns, elapsed, i, len, maxDelay, nCooldowns, now, ref, ref1, save, scope, seconds, start, suffix, threadID, type, update;
      if (!QR.cooldown.isCounting) {
        return;
      }
      save = false;
      nCooldowns = 0;
      now = Date.now();
      ref = QR.cooldown.categorize(QR.posts[0]), type = ref.type, threadID = ref.threadID;
      seconds = 0;
      if (Conf['Cooldown']) {
        ref1 = [g.BOARD.ID, 'global'];
        for (i = 0, len = ref1.length; i < len; i++) {
          scope = ref1[i];
          cooldowns = ((base = QR.cooldown.data)[scope] || (base[scope] = {}));
          for (start in cooldowns) {
            cooldown = cooldowns[start];
            start = +start;
            elapsed = Math.floor((now - start) / $.SECOND);
            if (elapsed < 0) {
              QR.cooldown.set(scope, start, null);
              save = true;
              continue;
            }
            if (cooldown.delay != null) {
              if (cooldown.delay <= elapsed) {
                QR.cooldown.set(scope, start, null);
                save = true;
              } else if ((cooldown.type === type && cooldown.threadID === threadID) || cooldown.type === 'mute') {
                seconds = Math.max(seconds, cooldown.delay - elapsed);
              }
              continue;
            }
            maxDelay = cooldown.threadID !== cooldown.postID ? QR.cooldown.maxDelay : QR.cooldown.delays[scope === 'global' ? 'thread_global' : 'thread'];
            if (QR.cooldown.customCooldown) {
              maxDelay = Math.max(maxDelay, parseInt(Conf['customCooldown'], 10));
            }
            if (maxDelay <= elapsed) {
              QR.cooldown.set(scope, start, null);
              save = true;
              continue;
            }
            if ((type === 'thread') === (cooldown.threadID === cooldown.postID) && cooldown.boardID !== g.BOARD.ID) {
              suffix = scope === 'global' ? '_global' : '';
              seconds = Math.max(seconds, QR.cooldown.delays[type + suffix] - elapsed);
              if (QR.cooldown.customCooldown) {
                seconds = Math.max(seconds, parseInt(Conf['customCooldown'], 10) - elapsed);
              }
            }
          }
          nCooldowns += Object.keys(cooldowns).length;
        }
      }
      if (save) {
        QR.cooldown.save;
      }
      if (nCooldowns) {
        clearTimeout(QR.cooldown.timeout);
        QR.cooldown.timeout = setTimeout(QR.cooldown.count, $.SECOND);
      } else {
        delete QR.cooldown.isCounting;
      }
      update = seconds !== QR.cooldown.seconds;
      QR.cooldown.seconds = seconds;
      if (update) {
        return QR.status();
      }
    },
    count: function() {
      QR.cooldown.update();
      if (QR.cooldown.seconds === 0 && QR.cooldown.auto && !QR.req) {
        return QR.submit();
      }
    }
  };

}).call(this);

(function() {
  QR.oekaki = {
    menu: {
      init: function() {
        var a, ref;
        if (!(((ref = g.VIEW) === 'index' || ref === 'thread') && Conf['Menu'] && Conf['Edit Link'] && Conf['Quick Reply'])) {
          return;
        }
        a = $.el('a', {
          className: 'edit-link',
          href: 'javascript:;',
          textContent: 'Edit image'
        });
        $.on(a, 'click', this.editFile);
        return Menu.menu.addEntry({
          el: a,
          order: 90,
          open: function(post) {
            var file;
            QR.oekaki.menu.post = post;
            file = post.file;
            return QR.postingIsEnabled && !!file && (file.isImage || file.isVideo);
          }
        });
      },
      editFile: function() {
        var currentTime, isVideo, post, ref;
        post = QR.oekaki.menu.post;
        QR.quote.call(post.nodes.post);
        isVideo = post.file.isVideo;
        currentTime = ((ref = post.file.fullImage) != null ? ref.currentTime : void 0) || 0;
        return CrossOrigin.file(post.file.url, function(blob) {
          var video;
          if (!blob) {
            return QR.error("Can't load file.");
          } else if (isVideo) {
            video = $.el('video');
            $.on(video, 'loadedmetadata', function() {
              $.on(video, 'seeked', function() {
                var canvas;
                canvas = $.el('canvas', {
                  width: video.videoWidth,
                  height: video.videoHeight
                });
                canvas.getContext('2d').drawImage(video, 0, 0);
                return canvas.toBlob(function(snapshot) {
                  snapshot.name = post.file.name.replace(/\.\w+$/, '') + '.png';
                  QR.handleFiles([snapshot]);
                  return QR.oekaki.edit();
                });
              });
              return video.currentTime = currentTime;
            });
            $.on(video, 'error', function() {
              return QR.openError();
            });
            return video.src = URL.createObjectURL(blob);
          } else {
            blob.name = post.file.name;
            QR.handleFiles([blob]);
            return QR.oekaki.edit();
          }
        });
      }
    },
    setup: function() {
      return $.global(function() {
        var FCX;
        FCX = window.FCX;
        FCX.oekakiCB = function() {
          return window.Tegaki.flatten().toBlob(function(file) {
            var source;
            source = "oekaki-" + (Date.now());
            FCX.oekakiLatest = source;
            return document.dispatchEvent(new CustomEvent('QRSetFile', {
              bubbles: true,
              detail: {
                file: file,
                name: FCX.oekakiName,
                source: source
              }
            }));
          });
        };
        if (window.Tegaki) {
          return document.querySelector('#qr .oekaki').hidden = false;
        }
      });
    },
    load: function(cb) {
      var n, onerror, onload, script, style;
      n = 0;
      onload = function() {
        if (++n === 2) {
          return cb();
        }
      };
      onerror = function() {
        var script;
        $.rm(this);
        script = $.el('script', {
          src: 'https://rawgit.com/desuwa/tegaki/master/tegaki.js'
        });
        $.on(script, 'load', onload);
        return $.add(d.head, script);
      };
      script = $('script[src^="//s.4cdn.org/js/painter"], script[src="https://rawgit.com/desuwa/tegaki/master/tegaki.js"]', d.head);
      if (script) {
        if (!script.dataset.success) {
          $.global(function() {
            return document.querySelector('script[src^="//s.4cdn.org/js/painter"], script[src="https://rawgit.com/desuwa/tegaki/master/tegaki.js"]').dataset.success = !!window.Tegaki;
          });
        }
        if (script.dataset.success === 'true') {
          return cb();
        } else {
          n = 1;
          return onerror.call(script);
        }
      } else {
        style = $.el('link', {
          rel: 'stylesheet',
          href: "//s.4cdn.org/css/painter." + (Date.now()) + ".css"
        });
        script = $.el('script', {
          src: "//s.4cdn.org/js/painter.min." + (Date.now()) + ".js"
        });
        $.on(style, 'load', onload);
        $.on(script, 'load', onload);
        $.on(script, 'error', onerror);
        return $.add(d.head, [style, script]);
      }
    },
    draw: function() {
      return $.global(function() {
        var FCX, Tegaki;
        Tegaki = window.Tegaki, FCX = window.FCX;
        if (Tegaki.bg) {
          Tegaki.destroy();
        }
        FCX.oekakiName = 'tegaki.png';
        return Tegaki.open({
          onDone: FCX.oekakiCB,
          onCancel: function() {
            return Tegaki.bgColor = '#ffffff';
          },
          width: +document.querySelector('#qr [name=oekaki-width]').value,
          height: +document.querySelector('#qr [name=oekaki-height]').value,
          bgColor: document.querySelector('#qr [name=oekaki-bg]').checked ? document.querySelector('#qr [name=oekaki-bgcolor]').value : 'transparent'
        });
      });
    },
    button: function() {
      if (QR.selected.file) {
        return QR.oekaki.edit();
      } else {
        return QR.oekaki.toggle();
      }
    },
    edit: function() {
      return QR.oekaki.load(function() {
        return $.global(function() {
          var FCX, Tegaki, cb, error, name, source;
          Tegaki = window.Tegaki, FCX = window.FCX;
          name = document.getElementById('qr-filename').value.replace(/\.\w+$/, '') + '.png';
          source = document.getElementById('file-n-submit').dataset.source;
          error = function(content) {
            return document.dispatchEvent(new CustomEvent('CreateNotification', {
              bubbles: true,
              detail: {
                type: 'warning',
                content: content,
                lifetime: 20
              }
            }));
          };
          cb = function(e) {
            var selected;
            if (e) {
              this.removeEventListener('QRMetadata', cb, false);
            }
            selected = document.getElementById('selected');
            if (!(selected != null ? selected.dataset.type : void 0)) {
              return error('No file to edit.');
            }
            if (!/^(image|video)\//.test(selected.dataset.type)) {
              return error('Not an image.');
            }
            if (!selected.dataset.height) {
              return error('Metadata not available.');
            }
            if (selected.dataset.height === 'loading') {
              selected.addEventListener('QRMetadata', cb, false);
              return;
            }
            if (Tegaki.bg) {
              Tegaki.destroy();
            }
            FCX.oekakiName = name;
            Tegaki.open({
              onDone: FCX.oekakiCB,
              onCancel: function() {
                return Tegaki.bgColor = '#ffffff';
              },
              width: +selected.dataset.width,
              height: +selected.dataset.height,
              bgColor: 'transparent'
            });
            return Tegaki.activeCtx.canvas.dispatchEvent(new CustomEvent('QRDrawFile', {
              bubbles: true
            }));
          };
          if (Tegaki.bg && Tegaki.onDoneCb === FCX.oekakiCB && source === FCX.oekakiLatest) {
            FCX.oekakiName = name;
            return Tegaki.resume();
          } else {
            return cb();
          }
        });
      });
    },
    toggle: function() {
      return QR.oekaki.load(function() {
        return QR.nodes.oekaki.hidden = !QR.nodes.oekaki.hidden;
      });
    }
  };

}).call(this);

(function() {
  var indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  QR.persona = {
    always: {},
    types: {
      name: [],
      email: [],
      sub: []
    },
    init: function() {
      var i, item, len, ref;
      if (!(Conf['Quick Reply'] || (Conf['Menu'] && Conf['Delete Link']))) {
        return;
      }
      ref = Conf['QR.personas'].split('\n');
      for (i = 0, len = ref.length; i < len; i++) {
        item = ref[i];
        QR.persona.parseItem(item.trim());
      }
    },
    parseItem: function(item) {
      var boards, match, ref, ref1, ref2, type, val;
      if (item[0] === '#') {
        return;
      }
      if (!(match = item.match(/(name|options|email|subject|password):"(.*)"/i))) {
        return;
      }
      ref = match, match = ref[0], type = ref[1], val = ref[2];
      item = item.replace(match, '');
      boards = ((ref1 = item.match(/boards:([^;]+)/i)) != null ? ref1[1].toLowerCase() : void 0) || 'global';
      if (boards !== 'global' && (ref2 = g.BOARD.ID, indexOf.call(boards.split(','), ref2) < 0)) {
        return;
      }
      if (type === 'password') {
        QR.persona.pwd = val;
        return;
      }
      if (type === 'options') {
        type = 'email';
      }
      if (type === 'subject') {
        type = 'sub';
      }
      if (/always/i.test(item)) {
        QR.persona.always[type] = val;
      }
      if (indexOf.call(QR.persona.types[type], val) < 0) {
        return QR.persona.types[type].push(val);
      }
    },
    load: function() {
      var arr, i, len, list, ref, type, val;
      ref = QR.persona.types;
      for (type in ref) {
        arr = ref[type];
        list = $("#list-" + type, QR.nodes.el);
        for (i = 0, len = arr.length; i < len; i++) {
          val = arr[i];
          if (val) {
            $.add(list, $.el('option', {
              textContent: val
            }));
          }
        }
      }
    },
    getPassword: function() {
      var m;
      if (QR.persona.pwd != null) {
        return QR.persona.pwd;
      } else if ((m = d.cookie.match(/4chan_pass=([^;]+)/))) {
        return decodeURIComponent(m[1]);
      } else {
        return '';
      }
    },
    get: function(cb) {
      return $.get('QR.persona', {}, function(arg) {
        var persona;
        persona = arg['QR.persona'];
        return cb(persona);
      });
    },
    set: function(post) {
      return $.get('QR.persona', {}, function(arg) {
        var persona;
        persona = arg['QR.persona'];
        persona = {
          name: post.name,
          flag: post.flag
        };
        return $.set('QR.persona', persona);
      });
    }
  };

}).call(this);

(function() {
  var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; },
    slice = [].slice;

  QR.post = (function() {
    function _Class(select) {
      this.select = bind(this.select, this);
      var el, event, i, j, label, len, len1, prev, ref, ref1;
      el = $.el('a', {
        className: 'qr-preview',
        draggable: true,
        href: 'javascript:;'
      });
      $.extend(el, {
        innerHTML: "<a class=\"remove fa fa-times-circle\" title=\"Remove\"></a><label class=\"qr-preview-spoiler\"><input type=\"checkbox\"> Spoiler</label><span></span>"
      });
      this.nodes = {
        el: el,
        rm: el.firstChild,
        spoiler: $('.qr-preview-spoiler input', el),
        span: el.lastChild
      };
      $.on(el, 'click', this.select);
      $.on(this.nodes.rm, 'click', (function(_this) {
        return function(e) {
          e.stopPropagation();
          return _this.rm();
        };
      })(this));
      $.on(this.nodes.spoiler, 'change', (function(_this) {
        return function(e) {
          _this.spoiler = e.target.checked;
          if (_this === QR.selected) {
            QR.nodes.spoiler.checked = _this.spoiler;
          }
          return _this.preventAutoPost();
        };
      })(this));
      ref = $$('label', el);
      for (i = 0, len = ref.length; i < len; i++) {
        label = ref[i];
        $.on(label, 'click', function(e) {
          return e.stopPropagation();
        });
      }
      $.add(QR.nodes.dumpList, el);
      ref1 = ['dragStart', 'dragEnter', 'dragLeave', 'dragOver', 'dragEnd', 'drop'];
      for (j = 0, len1 = ref1.length; j < len1; j++) {
        event = ref1[j];
        $.on(el, event.toLowerCase(), this[event]);
      }
      this.thread = g.VIEW === 'thread' ? g.THREADID : 'new';
      prev = QR.posts[QR.posts.length - 1];
      QR.posts.push(this);
      this.nodes.spoiler.checked = this.spoiler = prev && Conf['Remember Spoiler'] ? prev.spoiler : false;
      QR.persona.get((function(_this) {
        return function(persona) {
          _this.name = 'name' in QR.persona.always ? QR.persona.always.name : prev ? prev.name : persona.name;
          _this.email = 'email' in QR.persona.always ? QR.persona.always.email : '';
          _this.sub = 'sub' in QR.persona.always ? QR.persona.always.sub : '';
          if (QR.nodes.flag) {
            _this.flag = prev ? prev.flag : persona.flag;
          }
          if (QR.selected === _this) {
            return _this.load();
          }
        };
      })(this));
      if (select) {
        this.select();
      }
      this.unlock();
      QR.captcha.moreNeeded();
    }

    _Class.prototype.rm = function() {
      var index;
      this["delete"]();
      index = QR.posts.indexOf(this);
      if (QR.posts.length === 1) {
        new QR.post(true);
        $.rmClass(QR.nodes.el, 'dump');
      } else if (this === QR.selected) {
        (QR.posts[index - 1] || QR.posts[index + 1]).select();
      }
      QR.posts.splice(index, 1);
      return QR.status();
    };

    _Class.prototype["delete"] = function() {
      $.rm(this.nodes.el);
      URL.revokeObjectURL(this.URL);
      return this.dismissErrors();
    };

    _Class.prototype.lock = function(lock) {
      var i, len, name, node, ref;
      if (lock == null) {
        lock = true;
      }
      this.isLocked = lock;
      if (this !== QR.selected) {
        return;
      }
      ref = ['thread', 'name', 'email', 'sub', 'com', 'fileButton', 'filename', 'spoiler', 'flag'];
      for (i = 0, len = ref.length; i < len; i++) {
        name = ref[i];
        if (node = QR.nodes[name]) {
          node.disabled = lock;
        }
      }
      this.nodes.rm.style.visibility = lock ? 'hidden' : '';
      this.nodes.spoiler.disabled = lock;
      return this.nodes.el.draggable = !lock;
    };

    _Class.prototype.unlock = function() {
      return this.lock(false);
    };

    _Class.prototype.select = function() {
      var rectEl, rectList;
      if (QR.selected) {
        QR.selected.nodes.el.removeAttribute('id');
        QR.selected.forceSave();
      }
      QR.selected = this;
      this.lock(this.isLocked);
      this.nodes.el.id = 'selected';
      rectEl = this.nodes.el.getBoundingClientRect();
      rectList = this.nodes.el.parentNode.getBoundingClientRect();
      this.nodes.el.parentNode.scrollLeft += rectEl.left + rectEl.width / 2 - rectList.left - rectList.width / 2;
      return this.load();
    };

    _Class.prototype.load = function() {
      var i, len, name, node, ref;
      ref = ['thread', 'name', 'email', 'sub', 'com', 'filename', 'flag'];
      for (i = 0, len = ref.length; i < len; i++) {
        name = ref[i];
        if (!(node = QR.nodes[name])) {
          continue;
        }
        node.value = this[name] || node.dataset["default"] || '';
      }
      (this.thread !== 'new' ? $.addClass : $.rmClass)(QR.nodes.el, 'reply-to-thread');
      this.showFileData();
      return QR.characterCount();
    };

    _Class.prototype.save = function(input, forced) {
      var name, prev;
      if (input.type === 'checkbox') {
        this.spoiler = input.checked;
        return;
      }
      name = input.dataset.name;
      prev = this[name];
      this[name] = input.value || input.dataset["default"] || null;
      switch (name) {
        case 'thread':
          (this.thread !== 'new' ? $.addClass : $.rmClass)(QR.nodes.el, 'reply-to-thread');
          QR.status();
          break;
        case 'com':
          this.updateComment();
          break;
        case 'filename':
          if (!this.file) {
            return;
          }
          this.saveFilename();
          this.updateFilename();
          break;
        case 'name':
        case 'flag':
          if (this[name] !== prev) {
            QR.persona.set(this);
          }
      }
      if (!forced) {
        return this.preventAutoPost();
      }
    };

    _Class.prototype.forceSave = function() {
      var i, len, name, node, ref;
      if (this !== QR.selected) {
        return;
      }
      ref = ['thread', 'name', 'email', 'sub', 'com', 'filename', 'spoiler', 'flag'];
      for (i = 0, len = ref.length; i < len; i++) {
        name = ref[i];
        if (!(node = QR.nodes[name])) {
          continue;
        }
        this.save(node, true);
      }
    };

    _Class.prototype.preventAutoPost = function() {
      if (QR.cooldown.auto && this === QR.posts[0]) {
        QR.cooldown.update();
        if (QR.cooldown.seconds <= 5) {
          return QR.cooldown.auto = false;
        }
      }
    };

    _Class.prototype.setComment = function(com) {
      this.com = com || null;
      if (this === QR.selected) {
        QR.nodes.com.value = this.com;
      }
      return this.updateComment();
    };

    _Class.prototype.updateComment = function() {
      if (this === QR.selected) {
        QR.characterCount();
      }
      this.nodes.span.textContent = this.com;
      return QR.captcha.moreNeeded();
    };

    _Class.rmErrored = function(e) {
      var error, errors, i, j, len, post, ref;
      e.stopPropagation();
      ref = QR.posts;
      for (i = ref.length - 1; i >= 0; i += -1) {
        post = ref[i];
        if (errors = post.errors) {
          for (j = 0, len = errors.length; j < len; j++) {
            error = errors[j];
            if (!(doc.contains(error))) {
              continue;
            }
            post.rm();
            break;
          }
        }
      }
    };

    _Class.prototype.error = function(className, message, link) {
      var div, ref, rm, rmAll;
      div = $.el('div', {
        className: className
      });
      $.extend(div, {
        innerHTML: E(message) + ((link) ? " [<a href=\"" + E(link) + "\" target=\"_blank\">More info</a>]" : "") + "<br>[<a href=\"javascript:;\">delete post</a>] [<a href=\"javascript:;\">delete all</a>]"
      });
      (this.errors || (this.errors = [])).push(div);
      ref = $$('a', div), rm = ref[0], rmAll = ref[1];
      $.on(div, 'click', (function(_this) {
        return function() {
          if (indexOf.call(QR.posts, _this) >= 0) {
            return _this.select();
          }
        };
      })(this));
      $.on(rm, 'click', (function(_this) {
        return function(e) {
          e.stopPropagation();
          if (indexOf.call(QR.posts, _this) >= 0) {
            return _this.rm();
          }
        };
      })(this));
      $.on(rmAll, 'click', QR.post.rmErrored);
      return QR.error(div, true);
    };

    _Class.prototype.fileError = function(message, link) {
      return this.error('file-error', this.filename + ": " + message, link);
    };

    _Class.prototype.dismissErrors = function(test) {
      var error, i, len, ref;
      if (test == null) {
        test = function() {
          return true;
        };
      }
      if (this.errors) {
        ref = this.errors;
        for (i = 0, len = ref.length; i < len; i++) {
          error = ref[i];
          if (doc.contains(error) && test(error)) {
            error.parentNode.previousElementSibling.click();
          }
        }
      }
    };

    _Class.prototype.setFile = function(file1) {
      var ext, ref;
      this.file = file1;
      if (Conf['Randomize Filename'] && g.BOARD.ID !== 'f') {
        this.filename = "" + (Date.now() - Math.floor(Math.random() * 365 * $.DAY));
        if (ext = this.file.name.match(QR.validExtension)) {
          this.filename += ext[0];
        }
      } else {
        this.filename = this.file.name;
      }
      this.filesize = $.bytesToString(this.file.size);
      this.checkSize();
      $.addClass(this.nodes.el, 'has-file');
      QR.captcha.moreNeeded();
      URL.revokeObjectURL(this.URL);
      this.saveFilename();
      if (this === QR.selected) {
        this.showFileData();
      } else {
        this.updateFilename();
      }
      this.rmMetadata();
      this.nodes.el.dataset.type = this.file.type;
      this.nodes.el.style.backgroundImage = '';
      if (ref = this.file.type, indexOf.call(QR.mimeTypes, ref) < 0) {
        this.fileError('Unsupported file type.');
      } else if (/^(image|video)\//.test(this.file.type)) {
        this.readFile();
      }
      return this.preventAutoPost();
    };

    _Class.prototype.checkSize = function() {
      var max;
      max = QR.max_size;
      if (/^video\//.test(this.file.type)) {
        max = Math.min(max, QR.max_size_video);
      }
      if (this.file.size > max) {
        return this.fileError("File too large (file: " + this.filesize + ", max: " + ($.bytesToString(max)) + ").");
      }
    };

    _Class.prototype.readFile = function() {
      var el, event, isVideo, onerror, onload;
      isVideo = /^video\//.test(this.file.type);
      el = $.el(isVideo ? 'video' : 'img');
      if (isVideo && !el.canPlayType(this.file.type)) {
        return;
      }
      event = isVideo ? 'loadeddata' : 'load';
      onload = (function(_this) {
        return function() {
          $.off(el, event, onload);
          $.off(el, 'error', onerror);
          _this.checkDimensions(el);
          _this.setThumbnail(el);
          return $.event('QRMetadata', null, _this.nodes.el);
        };
      })(this);
      onerror = (function(_this) {
        return function() {
          $.off(el, event, onload);
          $.off(el, 'error', onerror);
          _this.fileError("Corrupt " + (isVideo ? 'video' : 'image') + " or error reading metadata.", 'https://github.com/ccd0/4chan-x/wiki/Frequently-Asked-Questions#error-reading-metadata');
          URL.revokeObjectURL(el.src);
          _this.nodes.el.removeAttribute('data-height');
          return $.event('QRMetadata', null, _this.nodes.el);
        };
      })(this);
      this.nodes.el.dataset.height = 'loading';
      $.on(el, event, onload);
      $.on(el, 'error', onerror);
      return el.src = URL.createObjectURL(this.file);
    };

    _Class.prototype.checkDimensions = function(el) {
      var duration, height, max_height, max_width, videoHeight, videoWidth, width;
      if (el.tagName === 'IMG') {
        height = el.height, width = el.width;
        this.nodes.el.dataset.height = height;
        this.nodes.el.dataset.width = width;
        if (height > QR.max_height || width > QR.max_width) {
          this.fileError("Image too large (image: " + height + "x" + width + "px, max: " + QR.max_height + "x" + QR.max_width + "px)");
        }
        if (height < QR.min_height || width < QR.min_width) {
          return this.fileError("Image too small (image: " + height + "x" + width + "px, min: " + QR.min_height + "x" + QR.min_width + "px)");
        }
      } else {
        videoHeight = el.videoHeight, videoWidth = el.videoWidth, duration = el.duration;
        this.nodes.el.dataset.height = videoHeight;
        this.nodes.el.dataset.width = videoWidth;
        this.nodes.el.dataset.duration = duration;
        max_height = Math.min(QR.max_height, QR.max_height_video);
        max_width = Math.min(QR.max_width, QR.max_width_video);
        if (videoHeight > max_height || videoWidth > max_width) {
          this.fileError("Video too large (video: " + videoHeight + "x" + videoWidth + "px, max: " + max_height + "x" + max_width + "px)");
        }
        if (videoHeight < QR.min_height || videoWidth < QR.min_width) {
          this.fileError("Video too small (video: " + videoHeight + "x" + videoWidth + "px, min: " + QR.min_height + "x" + QR.min_width + "px)");
        }
        if (!isFinite(duration)) {
          this.fileError('Video lacks duration metadata (try remuxing)');
        } else if (duration > QR.max_duration_video) {
          this.fileError("Video too long (video: " + duration + "s, max: " + QR.max_duration_video + "s)");
        }
        if (BoardConfig.noAudio(g.BOARD.ID) && $.hasAudio(el)) {
          return this.fileError('Audio not allowed');
        }
      }
    };

    _Class.prototype.setThumbnail = function(el) {
      var cv, height, isVideo, s, width;
      isVideo = el.tagName === 'VIDEO';
      s = 90 * 2 * window.devicePixelRatio;
      if (this.file.type === 'image/gif') {
        s *= 3;
      }
      if (isVideo) {
        height = el.videoHeight;
        width = el.videoWidth;
      } else {
        height = el.height, width = el.width;
        if (height < s || width < s) {
          this.URL = el.src;
          this.nodes.el.style.backgroundImage = "url(" + this.URL + ")";
          return;
        }
      }
      if (height <= width) {
        width = s / height * width;
        height = s;
      } else {
        height = s / width * height;
        width = s;
      }
      cv = $.el('canvas');
      cv.height = height;
      cv.width = width;
      cv.getContext('2d').drawImage(el, 0, 0, width, height);
      URL.revokeObjectURL(el.src);
      return cv.toBlob((function(_this) {
        return function(blob) {
          _this.URL = URL.createObjectURL(blob);
          return _this.nodes.el.style.backgroundImage = "url(" + _this.URL + ")";
        };
      })(this));
    };

    _Class.prototype.rmFile = function() {
      if (this.isLocked) {
        return;
      }
      delete this.file;
      delete this.filename;
      delete this.filesize;
      this.nodes.el.removeAttribute('title');
      QR.nodes.filename.removeAttribute('title');
      this.rmMetadata();
      this.nodes.el.style.backgroundImage = '';
      $.rmClass(this.nodes.el, 'has-file');
      this.showFileData();
      URL.revokeObjectURL(this.URL);
      this.dismissErrors(function(error) {
        return $.hasClass(error, 'file-error');
      });
      return this.preventAutoPost();
    };

    _Class.prototype.rmMetadata = function() {
      var attr, i, len, ref;
      ref = ['type', 'height', 'width', 'duration'];
      for (i = 0, len = ref.length; i < len; i++) {
        attr = ref[i];
        this.nodes.el.removeAttribute("data-" + attr);
      }
    };

    _Class.prototype.saveFilename = function() {
      this.file.newName = (this.filename || '').replace(/[\/\\]/g, '-');
      if (!QR.validExtension.test(this.filename)) {
        return this.file.newName += "." + (QR.extensionFromType[this.file.type] || 'jpg');
      }
    };

    _Class.prototype.updateFilename = function() {
      var long;
      long = this.filename + " (" + this.filesize + ")";
      this.nodes.el.title = long;
      if (this !== QR.selected) {
        return;
      }
      return QR.nodes.filename.title = long;
    };

    _Class.prototype.showFileData = function() {
      var ref;
      if (this.file) {
        this.updateFilename();
        QR.nodes.filename.value = this.filename;
        $.addClass(QR.nodes.oekaki, 'has-file');
        $.addClass(QR.nodes.fileSubmit, 'has-file');
      } else {
        $.rmClass(QR.nodes.oekaki, 'has-file');
        $.rmClass(QR.nodes.fileSubmit, 'has-file');
      }
      if (((ref = this.file) != null ? ref.source : void 0) != null) {
        QR.nodes.fileSubmit.dataset.source = this.file.source;
      } else {
        QR.nodes.fileSubmit.removeAttribute('data-source');
      }
      return QR.nodes.spoiler.checked = this.spoiler;
    };

    _Class.prototype.pasteText = function(file) {
      var reader;
      this.pasting = true;
      this.preventAutoPost();
      reader = new FileReader();
      reader.onload = (function(_this) {
        return function(e) {
          var result;
          result = e.target.result;
          _this.setComment((_this.com ? _this.com + "\n" + result : result));
          return delete _this.pasting;
        };
      })(this);
      return reader.readAsText(file);
    };

    _Class.prototype.dragStart = function(e) {
      var left, ref, top;
      ref = this.getBoundingClientRect(), left = ref.left, top = ref.top;
      e.dataTransfer.setDragImage(this, e.clientX - left, e.clientY - top);
      return $.addClass(this, 'drag');
    };

    _Class.prototype.dragEnd = function() {
      return $.rmClass(this, 'drag');
    };

    _Class.prototype.dragEnter = function() {
      return $.addClass(this, 'over');
    };

    _Class.prototype.dragLeave = function() {
      return $.rmClass(this, 'over');
    };

    _Class.prototype.dragOver = function(e) {
      e.preventDefault();
      return e.dataTransfer.dropEffect = 'move';
    };

    _Class.prototype.drop = function() {
      var el, index, newIndex, oldIndex, post;
      $.rmClass(this, 'over');
      if (!this.draggable) {
        return;
      }
      el = $('.drag', this.parentNode);
      index = function(el) {
        return slice.call(el.parentNode.children).indexOf(el);
      };
      oldIndex = index(el);
      newIndex = index(this);
      if (QR.posts[oldIndex].isLocked || QR.posts[newIndex].isLocked) {
        return;
      }
      (oldIndex < newIndex ? $.after : $.before)(this, el);
      post = QR.posts.splice(oldIndex, 1)[0];
      QR.posts.splice(newIndex, 0, post);
      return QR.status();
    };

    return _Class;

  })();

}).call(this);

QuoteBacklink = (function() {
  var QuoteBacklink;

  QuoteBacklink = {
    containers: {},
    init: function() {
      var ref;
      if (((ref = g.VIEW) !== 'index' && ref !== 'thread') || !Conf['Quote Backlinks']) {
        return;
      }
      if ((this.bottomBacklinks = Conf['Bottom Backlinks'])) {
        $.addClass(doc, 'bottom-backlinks');
      }
      Callbacks.Post.push({
        name: 'Quote Backlinking Part 1',
        cb: this.firstNode
      });
      return Callbacks.Post.push({
        name: 'Quote Backlinking Part 2',
        cb: this.secondNode
      });
    },
    firstNode: function() {
      var a, clone, container, containers, hash, i, j, k, len, len1, len2, link, markYours, nodes, post, quote, ref, ref1;
      if (this.isClone || !this.quotes.length || this.isRebuilt) {
        return;
      }
      markYours = Conf['Mark Quotes of You'] && QuoteYou.isYou(this);
      a = $.el('a', {
        href: Build.postURL(this.board.ID, this.thread.ID, this.ID),
        className: this.isHidden ? 'filtered backlink' : 'backlink',
        textContent: Conf['backlink'].replace(/%(?:id|%)/g, (function(_this) {
          return function(x) {
            return {
              '%id': _this.ID,
              '%%': '%'
            }[x];
          };
        })(this))
      });
      if (markYours) {
        $.add(a, QuoteYou.mark.cloneNode(true));
      }
      ref = this.quotes;
      for (i = 0, len = ref.length; i < len; i++) {
        quote = ref[i];
        containers = [QuoteBacklink.getContainer(quote)];
        if ((post = g.posts[quote]) && post.nodes.backlinkContainer) {
          ref1 = post.clones;
          for (j = 0, len1 = ref1.length; j < len1; j++) {
            clone = ref1[j];
            containers.push(clone.nodes.backlinkContainer);
          }
        }
        for (k = 0, len2 = containers.length; k < len2; k++) {
          container = containers[k];
          link = a.cloneNode(true);
          nodes = container.firstChild ? [$.tn(' '), link] : [link];
          if (Conf['Quote Previewing']) {
            $.on(link, 'mouseover', QuotePreview.mouseover);
          }
          if (Conf['Quote Inlining']) {
            $.on(link, 'click', QuoteInline.toggle);
            if (Conf['Quote Hash Navigation']) {
              hash = QuoteInline.qiQuote(link, $.hasClass(link, 'filtered'));
              nodes.push(hash);
            }
          }
          $.add(container, nodes);
        }
      }
    },
    secondNode: function() {
      var container;
      if (this.isClone && (this.origin.isReply || Conf['OP Backlinks'])) {
        this.nodes.backlinkContainer = $('.container', this.nodes.post);
        return;
      }
      if (!(this.isReply || Conf['OP Backlinks'])) {
        return;
      }
      container = QuoteBacklink.getContainer(this.fullID);
      this.nodes.backlinkContainer = container;
      if (QuoteBacklink.bottomBacklinks) {
        return $.add(this.nodes.post, container);
      } else {
        return $.add(this.nodes.info, container);
      }
    },
    getContainer: function(id) {
      var base;
      return (base = this.containers)[id] || (base[id] = $.el('span', {
        className: 'container'
      }));
    }
  };

  return QuoteBacklink;

}).call(this);

QuoteCT = (function() {
  var QuoteCT;

  QuoteCT = {
    init: function() {
      var ref;
      if (((ref = g.VIEW) !== 'index' && ref !== 'thread') || !Conf['Mark Cross-thread Quotes']) {
        return;
      }
      if (Conf['Comment Expansion']) {
        ExpandComment.callbacks.push(this.node);
      }
      this.mark = $.el('span', {
        textContent: '\u00A0(Cross-thread)',
        className: 'qmark-ct'
      });
      return Callbacks.Post.push({
        name: 'Mark Cross-thread Quotes',
        cb: this.node
      });
    },
    node: function() {
      var board, boardID, i, len, quotelink, ref, ref1, ref2, thread, threadID;
      if (this.isClone && this.thread === this.context.thread) {
        return;
      }
      ref = this.context, board = ref.board, thread = ref.thread;
      ref1 = this.nodes.quotelinks;
      for (i = 0, len = ref1.length; i < len; i++) {
        quotelink = ref1[i];
        ref2 = Get.postDataFromLink(quotelink), boardID = ref2.boardID, threadID = ref2.threadID;
        if (!threadID) {
          continue;
        }
        if (this.isClone) {
          $.rm($('.qmark-ct', quotelink));
        }
        if (boardID === board.ID && threadID !== thread.ID) {
          $.add(quotelink, QuoteCT.mark.cloneNode(true));
        }
      }
    }
  };

  return QuoteCT;

}).call(this);

QuoteInline = (function() {
  var QuoteInline,
    slice = [].slice;

  QuoteInline = {
    init: function() {
      var ref;
      if (((ref = g.VIEW) !== 'index' && ref !== 'thread') || !Conf['Quote Inlining']) {
        return;
      }
      if (Conf['Comment Expansion']) {
        ExpandComment.callbacks.push(this.node);
      }
      return Callbacks.Post.push({
        name: 'Quote Inlining',
        cb: this.node
      });
    },
    node: function() {
      var i, isClone, len, link, process, ref;
      process = QuoteInline.process;
      isClone = this.isClone;
      ref = this.nodes.quotelinks.concat(slice.call(this.nodes.backlinks), this.nodes.archivelinks);
      for (i = 0, len = ref.length; i < len; i++) {
        link = ref[i];
        process(link, isClone);
      }
    },
    process: function(link, clone) {
      if (Conf['Quote Hash Navigation']) {
        if (!clone) {
          $.after(link, QuoteInline.qiQuote(link, $.hasClass(link, 'filtered')));
        }
      }
      return $.on(link, 'click', QuoteInline.toggle);
    },
    qiQuote: function(link, hidden) {
      var name;
      name = "hashlink";
      if (hidden) {
        name += " filtered";
      }
      return $.el('a', {
        className: name,
        textContent: '#',
        href: link.href
      });
    },
    toggle: function(e) {
      var boardID, context, postID, quoter, ref, ref1, threadID;
      if ($.modifiedClick(e)) {
        return;
      }
      ref = Get.postDataFromLink(this), boardID = ref.boardID, threadID = ref.threadID, postID = ref.postID;
      if (Conf['Inline Cross-thread Quotes Only'] && g.VIEW === 'thread' && ((ref1 = g.posts[boardID + "." + postID]) != null ? ref1.nodes.root.offsetParent : void 0)) {
        return;
      }
      if ($.hasClass(doc, 'catalog-mode')) {
        return;
      }
      e.preventDefault();
      quoter = Get.postFromNode(this);
      context = quoter.context;
      if ($.hasClass(this, 'inlined')) {
        QuoteInline.rm(this, boardID, threadID, postID, context);
      } else {
        if ($.x("ancestor::div[@data-full-i-d='" + boardID + "." + postID + "']", this)) {
          return;
        }
        QuoteInline.add(this, boardID, threadID, postID, context, quoter);
      }
      return this.classList.toggle('inlined');
    },
    findRoot: function(quotelink, isBacklink) {
      if (isBacklink) {
        return $.x('ancestor::*[parent::*[contains(@class,"post")]][1]', quotelink);
      } else {
        return $.x('ancestor-or-self::*[parent::blockquote][1]', quotelink);
      }
    },
    add: function(quotelink, boardID, threadID, postID, context, quoter) {
      var inline, isBacklink, post, qroot, root;
      isBacklink = $.hasClass(quotelink, 'backlink');
      inline = $.el('div', {
        className: 'inline'
      });
      inline.dataset.fullID = boardID + "." + postID;
      root = QuoteInline.findRoot(quotelink, isBacklink);
      $.after(root, inline);
      qroot = $.x('ancestor::*[contains(@class,"postContainer")][1]', root);
      $.addClass(qroot, 'hasInline');
      new Fetcher(boardID, threadID, postID, inline, quoter);
      if (!((post = g.posts[boardID + "." + postID]) && context.thread === post.thread)) {
        return;
      }
      if (isBacklink && Conf['Forward Hiding']) {
        $.addClass(post.nodes.root, 'forwarded');
        post.forwarded++ || (post.forwarded = 1);
      }
      if (!Unread.posts) {
        return;
      }
      return Unread.readSinglePost(post);
    },
    rm: function(quotelink, boardID, threadID, postID, context) {
      var el, inlined, isBacklink, post, qroot, ref, root;
      isBacklink = $.hasClass(quotelink, 'backlink');
      root = QuoteInline.findRoot(quotelink, isBacklink);
      root = $.x("following-sibling::div[@data-full-i-d='" + boardID + "." + postID + "'][1]", root);
      qroot = $.x('ancestor::*[contains(@class,"postContainer")][1]', root);
      $.rm(root);
      if (!$('.inline', qroot)) {
        $.rmClass(qroot, 'hasInline');
      }
      if (!(el = root.firstElementChild)) {
        return;
      }
      post = g.posts[boardID + "." + postID];
      post.rmClone(el.dataset.clone);
      if (Conf['Forward Hiding'] && isBacklink && context.thread === g.threads[boardID + "." + threadID] && !--post.forwarded) {
        delete post.forwarded;
        $.rmClass(post.nodes.root, 'forwarded');
      }
      while (inlined = $('.inlined', el)) {
        ref = Get.postDataFromLink(inlined), boardID = ref.boardID, threadID = ref.threadID, postID = ref.postID;
        QuoteInline.rm(inlined, boardID, threadID, postID, context);
        $.rmClass(inlined, 'inlined');
      }
    }
  };

  return QuoteInline;

}).call(this);

QuoteOP = (function() {
  var QuoteOP,
    indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  QuoteOP = {
    init: function() {
      var ref;
      if (((ref = g.VIEW) !== 'index' && ref !== 'thread') || !Conf['Mark OP Quotes']) {
        return;
      }
      if (Conf['Comment Expansion']) {
        ExpandComment.callbacks.push(this.node);
      }
      this.mark = $.el('span', {
        textContent: '\u00A0(OP)',
        className: 'qmark-op'
      });
      return Callbacks.Post.push({
        name: 'Mark OP Quotes',
        cb: this.node
      });
    },
    node: function() {
      var boardID, fullID, i, postID, quotelink, quotelinks, quotes, ref, ref1;
      if (this.isClone && this.thread === this.context.thread) {
        return;
      }
      if (!(quotes = this.quotes).length) {
        return;
      }
      quotelinks = this.nodes.quotelinks;
      if (this.isClone && (ref = this.thread.fullID, indexOf.call(quotes, ref) >= 0)) {
        i = 0;
        while (quotelink = quotelinks[i++]) {
          $.rm($('.qmark-op', quotelink));
        }
      }
      fullID = this.context.thread.fullID;
      if (indexOf.call(quotes, fullID) < 0) {
        return;
      }
      i = 0;
      while (quotelink = quotelinks[i++]) {
        ref1 = Get.postDataFromLink(quotelink), boardID = ref1.boardID, postID = ref1.postID;
        if ((boardID + "." + postID) === fullID) {
          $.add(quotelink, QuoteOP.mark.cloneNode(true));
        }
      }
    }
  };

  return QuoteOP;

}).call(this);

QuotePreview = (function() {
  var QuotePreview,
    slice = [].slice;

  QuotePreview = {
    init: function() {
      var ref;
      if (!Conf['Quote Previewing']) {
        return;
      }
      if (g.VIEW === 'archive') {
        $.on(d, 'mouseover', function(e) {
          if (e.target.nodeName === 'A' && $.hasClass(e.target, 'quotelink')) {
            return QuotePreview.mouseover.call(e.target, e);
          }
        });
      }
      if ((ref = g.VIEW) !== 'index' && ref !== 'thread') {
        return;
      }
      if (Conf['Comment Expansion']) {
        ExpandComment.callbacks.push(this.node);
      }
      return Callbacks.Post.push({
        name: 'Quote Previewing',
        cb: this.node
      });
    },
    node: function() {
      var i, len, link, ref;
      ref = this.nodes.quotelinks.concat(slice.call(this.nodes.backlinks), this.nodes.archivelinks);
      for (i = 0, len = ref.length; i < len; i++) {
        link = ref[i];
        $.on(link, 'mouseover', QuotePreview.mouseover);
      }
    },
    mouseover: function(e) {
      var boardID, i, len, origin, post, postID, posts, qp, ref, threadID;
      if (($.hasClass(this, 'inlined') && !$.hasClass(doc, 'catalog-mode')) || !d.contains(this)) {
        return;
      }
      ref = Get.postDataFromLink(this), boardID = ref.boardID, threadID = ref.threadID, postID = ref.postID;
      qp = $.el('div', {
        id: 'qp',
        className: 'dialog'
      });
      $.add(Header.hover, qp);
      new Fetcher(boardID, threadID, postID, qp, Get.postFromNode(this));
      UI.hover({
        root: this,
        el: qp,
        latestEvent: e,
        endEvents: 'mouseout click',
        cb: QuotePreview.mouseout
      });
      if (Conf['Quote Highlighting'] && (origin = g.posts[boardID + "." + postID])) {
        posts = [origin].concat(origin.clones);
        posts.pop();
        for (i = 0, len = posts.length; i < len; i++) {
          post = posts[i];
          $.addClass(post.nodes.post, 'qphl');
        }
      }
    },
    mouseout: function() {
      var clone, i, len, post, ref, root;
      if (!(root = this.el.firstElementChild)) {
        return;
      }
      clone = Get.postFromRoot(root);
      post = clone.origin;
      post.rmClone(root.dataset.clone);
      if (!Conf['Quote Highlighting']) {
        return;
      }
      ref = [post].concat(post.clones);
      for (i = 0, len = ref.length; i < len; i++) {
        post = ref[i];
        $.rmClass(post.nodes.post, 'qphl');
      }
    }
  };

  return QuotePreview;

}).call(this);

QuoteStrikeThrough = (function() {
  var QuoteStrikeThrough;

  QuoteStrikeThrough = {
    init: function() {
      var ref;
      if (!(((ref = g.VIEW) === 'index' || ref === 'thread') && (Conf['Reply Hiding Buttons'] || (Conf['Menu'] && Conf['Reply Hiding Link']) || Conf['Filter']))) {
        return;
      }
      return Callbacks.Post.push({
        name: 'Strike-through Quotes',
        cb: this.node
      });
    },
    node: function() {
      var boardID, i, len, postID, quotelink, ref, ref1, ref2;
      if (this.isClone) {
        return;
      }
      ref = this.nodes.quotelinks;
      for (i = 0, len = ref.length; i < len; i++) {
        quotelink = ref[i];
        ref1 = Get.postDataFromLink(quotelink), boardID = ref1.boardID, postID = ref1.postID;
        if ((ref2 = g.posts[boardID + "." + postID]) != null ? ref2.isHidden : void 0) {
          $.addClass(quotelink, 'filtered');
        }
      }
    }
  };

  return QuoteStrikeThrough;

}).call(this);

QuoteThreading = 
/*
  <3 aeosynth
 */

(function() {
  var QuoteThreading;

  QuoteThreading = {
    init: function() {
      if (!(Conf['Quote Threading'] && g.VIEW === 'thread')) {
        return;
      }
      this.controls = $.el('label', {
        innerHTML: "<input id=\"threadingControl\" name=\"Thread Quotes\" type=\"checkbox\"> Threading"
      });
      this.threadNewLink = $.el('span', {
        className: 'brackets-wrap threadnewlink',
        hidden: true
      });
      $.extend(this.threadNewLink, {
        innerHTML: "<a href=\"javascript:;\">Thread New Posts</a>"
      });
      this.input = $('input', this.controls);
      this.input.checked = Conf['Thread Quotes'];
      $.on(this.input, 'change', this.setEnabled);
      $.on(this.input, 'change', this.rethread);
      $.on(this.threadNewLink.firstElementChild, 'click', this.rethread);
      $.on(d, '4chanXInitFinished', (function(_this) {
        return function() {
          return _this.ready = true;
        };
      })(this));
      Header.menu.addEntry(this.entry = {
        el: this.controls,
        order: 99
      });
      Callbacks.Thread.push({
        name: 'Quote Threading',
        cb: this.setThread
      });
      return Callbacks.Post.push({
        name: 'Quote Threading',
        cb: this.node
      });
    },
    parent: {},
    children: {},
    inserted: {},
    setEnabled: function() {
      var other, ref;
      if (this.checked) {
        $.set('Prune All Threads', false);
        other = (ref = ReplyPruning.inputs) != null ? ref.enabled : void 0;
        if (other != null ? other.checked : void 0) {
          other.checked = false;
          $.event('change', null, other);
        }
      }
      return $.cb.checked.call(this);
    },
    setThread: function() {
      QuoteThreading.thread = this;
      return $.asap((function() {
        return !Conf['Thread Updater'] || $('.navLinksBot > .updatelink');
      }), function() {
        var navLinksBot;
        if ((navLinksBot = $('.navLinksBot'))) {
          return $.add(navLinksBot, [$.tn(' '), QuoteThreading.threadNewLink]);
        }
      });
    },
    node: function() {
      var ancestor, j, lastParent, len, parent, parents, quote, ref;
      if (this.isFetchedQuote || this.isClone || !this.isReply) {
        return;
      }
      parents = new Set();
      lastParent = null;
      ref = this.quotes;
      for (j = 0, len = ref.length; j < len; j++) {
        quote = ref[j];
        if (parent = g.posts[quote]) {
          if (!parent.isFetchedQuote && parent.isReply && parent.ID < this.ID) {
            parents.add(parent.ID);
            if (!lastParent || parent.ID > lastParent.ID) {
              lastParent = parent;
            }
          }
        }
      }
      if (!lastParent) {
        return;
      }
      ancestor = lastParent;
      while (ancestor = QuoteThreading.parent[ancestor.fullID]) {
        parents["delete"](ancestor.ID);
      }
      if (parents.size === 1) {
        return QuoteThreading.parent[this.fullID] = lastParent;
      }
    },
    descendants: function(post) {
      var child, children, j, len, posts;
      posts = [post];
      if (children = QuoteThreading.children[post.fullID]) {
        for (j = 0, len = children.length; j < len; j++) {
          child = children[j];
          posts = posts.concat(QuoteThreading.descendants(child));
        }
      }
      return posts;
    },
    insert: function(post) {
      var base, child, children, descendants, i, j, k, l, len, name, next, nodes, order, parent, prev, prev2, threadContainer, x;
      if (!(Conf['Thread Quotes'] && (parent = QuoteThreading.parent[post.fullID]) && !QuoteThreading.inserted[post.fullID])) {
        return false;
      }
      descendants = QuoteThreading.descendants(post);
      if (!Unread.posts.has(parent.ID)) {
        if ((function() {
          var j, len, x;
          for (j = 0, len = descendants.length; j < len; j++) {
            x = descendants[j];
            if (Unread.posts.has(x.ID)) {
              return true;
            }
          }
        })()) {
          QuoteThreading.threadNewLink.hidden = false;
          return false;
        }
      }
      order = Unread.order;
      children = ((base = QuoteThreading.children)[name = parent.fullID] || (base[name] = []));
      threadContainer = parent.nodes.threadContainer || $.el('div', {
        className: 'threadContainer'
      });
      nodes = [post.nodes.root];
      if (post.nodes.threadContainer) {
        nodes.push(post.nodes.threadContainer);
      }
      i = children.length;
      for (j = children.length - 1; j >= 0; j += -1) {
        child = children[j];
        if (child.ID >= post.ID) {
          i--;
        }
      }
      if (i !== children.length) {
        next = children[i];
        for (k = 0, len = descendants.length; k < len; k++) {
          x = descendants[k];
          order.before(order[next.ID], order[x.ID]);
        }
        children.splice(i, 0, post);
        $.before(next.nodes.root, nodes);
      } else {
        prev = parent;
        while ((prev2 = QuoteThreading.children[prev.fullID]) && prev2.length) {
          prev = prev2[prev2.length - 1];
        }
        for (l = descendants.length - 1; l >= 0; l += -1) {
          x = descendants[l];
          order.after(order[prev.ID], order[x.ID]);
        }
        children.push(post);
        $.add(threadContainer, nodes);
      }
      QuoteThreading.inserted[post.fullID] = true;
      if (!parent.nodes.threadContainer) {
        parent.nodes.threadContainer = threadContainer;
        $.addClass(parent.nodes.root, 'threadOP');
        $.after(parent.nodes.root, threadContainer);
      }
      return true;
    },
    rethread: function() {
      var nodes, posts, thread;
      if (!QuoteThreading.ready) {
        return;
      }
      thread = QuoteThreading.thread;
      posts = thread.posts;
      QuoteThreading.threadNewLink.hidden = true;
      if (Conf['Thread Quotes']) {
        posts.forEach(QuoteThreading.insert);
      } else {
        nodes = [];
        Unread.order = new RandomAccessList();
        QuoteThreading.inserted = {};
        posts.forEach(function(post) {
          if (post.isFetchedQuote) {
            return;
          }
          Unread.order.push(post);
          if (post.isReply) {
            nodes.push(post.nodes.root);
          }
          if (QuoteThreading.children[post.fullID]) {
            delete QuoteThreading.children[post.fullID];
            $.rmClass(post.nodes.root, 'threadOP');
            $.rm(post.nodes.threadContainer);
            return delete post.nodes.threadContainer;
          }
        });
        $.add(thread.nodes.root, nodes);
      }
      Unread.position = Unread.order.first;
      Unread.updatePosition();
      Unread.setLine(true);
      Unread.read();
      return Unread.update();
    }
  };

  return QuoteThreading;

}).call(this);

QuoteYou = (function() {
  var QuoteYou;

  QuoteYou = {
    init: function() {
      var ref;
      if (!Conf['Remember Your Posts']) {
        return;
      }
      this.db = new DataBoard('yourPosts');
      $.sync('Remember Your Posts', function(enabled) {
        return Conf['Remember Your Posts'] = enabled;
      });
      $.on(d, 'QRPostSuccessful', function(e) {
        return $.get('Remember Your Posts', Conf['Remember Your Posts'], function(items) {
          var boardID, postID, ref, threadID;
          if (!items['Remember Your Posts']) {
            return;
          }
          ref = e.detail, boardID = ref.boardID, threadID = ref.threadID, postID = ref.postID;
          return QuoteYou.db.set({
            boardID: boardID,
            threadID: threadID,
            postID: postID,
            val: true
          });
        });
      });
      if ((ref = g.VIEW) !== 'index' && ref !== 'thread' && ref !== 'archive') {
        return;
      }
      if (Conf['Highlight Own Posts']) {
        $.addClass(doc, 'highlight-own');
      }
      if (Conf['Highlight Posts Quoting You']) {
        $.addClass(doc, 'highlight-you');
      }
      if (Conf['Comment Expansion']) {
        ExpandComment.callbacks.push(this.node);
      }
      this.mark = $.el('span', {
        textContent: '\u00A0(You)',
        className: 'qmark-you'
      });
      Callbacks.Post.push({
        name: 'Mark Quotes of You',
        cb: this.node
      });
      return QuoteYou.menu.init();
    },
    isYou: function(post) {
      var ref;
      return !!((ref = QuoteYou.db) != null ? ref.get({
        boardID: post.boardID,
        threadID: post.threadID,
        postID: post.ID
      }) : void 0);
    },
    node: function() {
      var i, len, quotelink, ref;
      if (this.isClone) {
        return;
      }
      if (QuoteYou.isYou(this)) {
        $.addClass(this.nodes.root, 'yourPost');
      }
      if (!this.quotes.length) {
        return;
      }
      ref = this.nodes.quotelinks;
      for (i = 0, len = ref.length; i < len; i++) {
        quotelink = ref[i];
        if (!(QuoteYou.db.get(Get.postDataFromLink(quotelink)))) {
          continue;
        }
        if (Conf['Mark Quotes of You']) {
          $.add(quotelink, QuoteYou.mark.cloneNode(true));
        }
        $.addClass(quotelink, 'you');
        $.addClass(this.nodes.root, 'quotesYou');
      }
    },
    menu: {
      init: function() {
        var input, label, ref;
        label = $.el('label', {
          className: 'toggle-you'
        }, {
          innerHTML: "<input type=\"checkbox\"> You"
        });
        input = $('input', label);
        $.on(input, 'change', QuoteYou.menu.toggle);
        return (ref = Menu.menu) != null ? ref.addEntry({
          el: label,
          order: 80,
          open: function(post) {
            QuoteYou.menu.post = post.origin || post;
            input.checked = QuoteYou.isYou(post);
            return true;
          }
        }) : void 0;
      },
      toggle: function() {
        var clone, data, i, j, len, len1, post, quotelink, quoter, ref, ref1;
        post = QuoteYou.menu.post;
        data = {
          boardID: post.board.ID,
          threadID: post.thread.ID,
          postID: post.ID,
          val: true
        };
        if (this.checked) {
          QuoteYou.db.set(data);
        } else {
          QuoteYou.db["delete"](data);
        }
        ref = [post].concat(post.clones);
        for (i = 0, len = ref.length; i < len; i++) {
          clone = ref[i];
          clone.nodes.root.classList.toggle('yourPost', this.checked);
        }
        ref1 = Get.allQuotelinksLinkingTo(post);
        for (j = 0, len1 = ref1.length; j < len1; j++) {
          quotelink = ref1[j];
          if (this.checked) {
            if (Conf['Mark Quotes of You']) {
              $.add(quotelink, QuoteYou.mark.cloneNode(true));
            }
          } else {
            $.rm($('.qmark-you', quotelink));
          }
          quotelink.classList.toggle('you', this.checked);
          if ($.hasClass(quotelink, 'quotelink')) {
            quoter = Get.postFromNode(quotelink).nodes.root;
            quoter.classList.toggle('quotesYou', !!$('.quotelink.you', quoter));
          }
        }
      }
    },
    cb: {
      seek: function(type) {
        var highlight, post, posts, result, str;
        if (highlight = $('.highlight')) {
          $.rmClass(highlight, 'highlight');
        }
        if (!(QuoteYou.lastRead && doc.contains(QuoteYou.lastRead) && $.hasClass(QuoteYou.lastRead, 'quotesYou'))) {
          if (!(post = QuoteYou.lastRead = $('.quotesYou'))) {
            new Notice('warning', 'No posts are currently quoting you, loser.', 20);
            return;
          }
          if (QuoteYou.cb.scroll(post)) {
            return;
          }
        } else {
          post = QuoteYou.lastRead;
        }
        str = type + "::div[contains(@class,'quotesYou')]";
        while ((post = (result = $.X(str, post)).snapshotItem(type === 'preceding' ? result.snapshotLength - 1 : 0))) {
          if (QuoteYou.cb.scroll(post)) {
            return;
          }
        }
        posts = $$('.quotesYou');
        return QuoteYou.cb.scroll(posts[type === 'following' ? 0 : posts.length - 1]);
      },
      scroll: function(root) {
        var post;
        post = $('.post', root);
        if (!post.getBoundingClientRect().height) {
          return false;
        } else {
          QuoteYou.lastRead = root;
          location.href = "#" + post.id;
          Header.scrollTo(post);
          $.addClass(post, 'highlight');
          return true;
        }
      }
    }
  };

  return QuoteYou;

}).call(this);

Quotify = (function() {
  var Quotify,
    indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; },
    slice = [].slice;

  Quotify = {
    init: function() {
      var ref;
      if (((ref = g.VIEW) !== 'index' && ref !== 'thread') || !Conf['Resurrect Quotes']) {
        return;
      }
      $.addClass(doc, 'resurrect-quotes');
      if (Conf['Comment Expansion']) {
        ExpandComment.callbacks.push(this.node);
      }
      return Callbacks.Post.push({
        name: 'Resurrect Quotes',
        cb: this.node
      });
    },
    node: function() {
      var deadlink, i, j, len, len1, link, ref, ref1;
      if (this.isClone) {
        this.nodes.archivelinks = $$('a.linkify.quotelink', this.nodes.comment);
        return;
      }
      ref = $$('a.linkify', this.nodes.comment);
      for (i = 0, len = ref.length; i < len; i++) {
        link = ref[i];
        Quotify.parseArchivelink.call(this, link);
      }
      ref1 = $$('.deadlink', this.nodes.comment);
      for (j = 0, len1 = ref1.length; j < len1; j++) {
        deadlink = ref1[j];
        Quotify.parseDeadlink.call(this, deadlink);
      }
    },
    parseArchivelink: function(link) {
      var boardID, m, postID, ref, threadID;
      if (!(m = link.pathname.match(/^\/([^\/]+)\/thread\/S?(\d+)\/?$/))) {
        return;
      }
      if ((ref = link.hostname) === 'lolcow.farm' || ref === 'boards.4channel.org') {
        return;
      }
      boardID = m[1];
      threadID = m[2];
      postID = link.hash.match(/^#[pq]?(\d+)$|$/)[1] || threadID;
      if (Redirect.to('post', {
        boardID: boardID,
        postID: postID
      })) {
        $.addClass(link, 'quotelink');
        $.extend(link.dataset, {
          boardID: boardID,
          threadID: threadID,
          postID: postID
        });
        return this.nodes.archivelinks.push(link);
      }
    },
    parseDeadlink: function(deadlink) {
      var a, boardID, fetchable, m, post, postID, quote, quoteID, redirect, ref;
      if ($.hasClass(deadlink.parentNode, 'prettyprint')) {
        Quotify.fixDeadlink(deadlink);
        return;
      }
      quote = deadlink.textContent;
      if (!(postID = (ref = quote.match(/\d+$/)) != null ? ref[0] : void 0)) {
        return;
      }
      if (postID[0] === '0') {
        Quotify.fixDeadlink(deadlink);
        return;
      }
      boardID = (m = quote.match(/^>>>\/([a-z\d]+)/)) ? m[1] : this.board.ID;
      quoteID = boardID + "." + postID;
      if (post = g.posts[quoteID]) {
        if (!post.isDead) {
          a = $.el('a', {
            href: Build.postURL(boardID, post.thread.ID, postID),
            className: 'quotelink',
            textContent: quote
          });
        } else {
          a = $.el('a', {
            href: Build.postURL(boardID, post.thread.ID, postID),
            className: 'quotelink deadlink',
            textContent: quote
          });
          $.add(a, Post.deadMark.cloneNode(true));
          $.extend(a.dataset, {
            boardID: boardID,
            threadID: post.thread.ID,
            postID: postID
          });
        }
      } else {
        redirect = Redirect.to('thread', {
          boardID: boardID,
          threadID: 0,
          postID: postID
        });
        fetchable = Redirect.to('post', {
          boardID: boardID,
          postID: postID
        });
        if (redirect || fetchable) {
          a = $.el('a', {
            href: redirect || 'javascript:;',
            className: 'deadlink',
            textContent: quote
          });
          $.add(a, Post.deadMark.cloneNode(true));
          if (fetchable) {
            $.addClass(a, 'quotelink');
            $.extend(a.dataset, {
              boardID: boardID,
              postID: postID
            });
          }
        }
      }
      if (indexOf.call(this.quotes, quoteID) < 0) {
        this.quotes.push(quoteID);
      }
      if (!a) {
        $.add(deadlink, Post.deadMark.cloneNode(true));
        return;
      }
      $.replace(deadlink, a);
      if ($.hasClass(a, 'quotelink')) {
        return this.nodes.quotelinks.push(a);
      }
    },
    fixDeadlink: function(deadlink) {
      var el, green;
      if (!(el = deadlink.previousSibling) || el.nodeName === 'BR') {
        green = $.el('span', {
          className: 'quote'
        });
        $.before(deadlink, green);
        $.add(green, deadlink);
      }
      return $.replace(deadlink, slice.call(deadlink.childNodes));
    }
  };

  return Quotify;

}).call(this);

Main = (function() {
  var Main,
    indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  Main = {
    init: function() {
      var db, flatten, i, items, j, k, key, len, ref, ref1, ref2, w;
      if (d.body && !$('title', d.head)) {
        return;
      }
      try {
        w = window;
        if ($.platform === 'crx') {
          w = w.wrappedJSObject || w;
        }
        if ('4chan X antidup' in w) {
          return;
        }
        w['4chan X antidup'] = true;
      } catch (_error) {}
      if (location.hostname === 'www.google.com') {
        $.get('Captcha Fixes', true, function(arg) {
          var enabled;
          enabled = arg['Captcha Fixes'];
          if (enabled) {
            return $.ready(function() {
              return Captcha.fixes.init();
            });
          }
        });
        return;
      }
      try {
        if (window.frameElement && ((ref = window.frameElement.src) === '' || ref === 'about:blank')) {
          return;
        }
      } catch (_error) {}
      if (doc && $.hasClass(doc, 'fourchan-x')) {
        return;
      }
      $.asap(docSet, function() {
        $.addClass(doc, 'fourchan-x', 'seaweedchan');
        if ($.engine) {
          return $.addClass(doc, "ua-" + $.engine);
        }
      });
      $.on(d, '4chanXInitFinished', function() {
        if (Main.expectInitFinished) {
          return delete Main.expectInitFinished;
        } else {
          new Notice('error', 'Error: Multiple copies of 4chan X are enabled.');
          return $.addClass(doc, 'tainted');
        }
      });
      flatten = function(parent, obj) {
        var key, val;
        if (obj instanceof Array) {
          Conf[parent] = obj[0];
        } else if (typeof obj === 'object') {
          for (key in obj) {
            val = obj[key];
            flatten(key, val);
          }
        } else {
          Conf[parent] = obj;
        }
      };
      if ((ref1 = location.hostname) === 'lolcow.farm' || ref1 === 'boards.4channel.org') {
        $.global(function() {
          var fromCharCode0;
          fromCharCode0 = String.fromCharCode;
          return String.fromCharCode = function() {
            if (document.body) {
              String.fromCharCode = fromCharCode0;
            } else if (document.currentScript && !document.currentScript.src) {
              throw Error();
            }
            return fromCharCode0.apply(this, arguments);
          };
        });
        $.asap(docSet, function() {
          return $.onExists(doc, 'iframe[srcdoc]', $.rm);
        });
      }
      flatten(null, Config);
      ref2 = DataBoard.keys;
      for (j = 0, len = ref2.length; j < len; j++) {
        db = ref2[j];
        Conf[db] = {};
      }
      Conf['boardConfig'] = {
        boards: {}
      };
      Conf['archives'] = Redirect.archives;
      Conf['selectedArchives'] = {};
      Conf['cooldowns'] = {};
      Conf['Index Sort'] = {};
      for (i = k = 0; k < 2; i = ++k) {
        Conf["Last Long Reply Thresholds " + i] = {};
      }
      Conf['siteProperties'] = {};
      Conf['Except Archives from Encryption'] = false;
      Conf['JSON Navigation'] = true;
      Conf['Oekaki Links'] = true;
      Conf['Show Name and Subject'] = false;
      Conf['QR Shortcut'] = true;
      Conf['Bottom QR Link'] = true;
      Conf['Toggleable Thread Watcher'] = true;
      Conf['siteSoftware'] = '';
      if (/\.4chan(?:nel)?\.org$/.test(location.hostname) && !$$('script:not([src])', d).filter(function(s) {
        return /this\[/.test(s.textContent);
      }).length) {
        ($.getSync || $.get)({
          'jsWhitelist': Conf['jsWhitelist']
        }, function(arg) {
          var jsWhitelist;
          jsWhitelist = arg.jsWhitelist;
          return $.addCSP("script-src " + (jsWhitelist.replace(/^#.*$/mg, '').replace(/[\s;]+/g, ' ').trim()));
        });
      }
      items = {};
      for (key in Conf) {
        items[key] = void 0;
      }
      items['previousversion'] = void 0;
      return ($.getSync || $.get)(items, function(items) {
        var ref3;
        if (!$.perProtocolSettings && /\.4chan(?:nel)?\.org$/.test(location.hostname) && ((ref3 = items['Redirect to HTTPS']) != null ? ref3 : Conf['Redirect to HTTPS']) && location.protocol !== 'https:') {
          location.replace('https://' + location.host + location.pathname + location.search + location.hash);
          return;
        }
        return $.asap(docSet, function() {
          var ref4, val;
          if ($.cantSet) {

          } else if (items.previousversion == null) {
            Main.ready(function() {
              $.set('previousversion', g.VERSION);
              return Settings.open();
            });
          } else if (items.previousversion !== g.VERSION) {
            Main.upgrade(items);
          }
          for (key in Conf) {
            val = Conf[key];
            Conf[key] = (ref4 = items[key]) != null ? ref4 : val;
          }
          return Site.init(Main.initFeatures);
        });
      });
    },
    upgrade: function(items) {
      var changes, previousversion;
      previousversion = items.previousversion;
      changes = Settings.upgrade(items, previousversion);
      items.previousversion = changes.previousversion = g.VERSION;
      return $.set(changes, function() {
        var el, ref;
        if ((ref = items['Show Updated Notifications']) != null ? ref : true) {
          el = $.el('span', {
            innerHTML: "4chan X has been updated to <a href=\"https://github.com/ccd0/4chan-x/blob/master/CHANGELOG.md\" target=\"_blank\">version " + E(g.VERSION) + "</a>."
          });
          return new Notice('info', el, 15);
        }
      });
    },
    initFeatures: function() {
      var err, feature, hostname, j, len, match, name, pathname, ref, ref1, ref2, search;
      hostname = location.hostname, search = location.search;
      pathname = location.pathname.split(/\/+/);
      if (hostname !== 'www.4chan.org' && hostname !== 'www.4channel.org') {
        g.BOARD = new Board(pathname[1]);
      }
      $.global(function() {
        document.documentElement.classList.add('js-enabled');
        return window.FCX = {};
      });
      Main.jsEnabled = $.hasClass(doc, 'js-enabled');
      switch (hostname) {
        case 'www.4chan.org':
        case 'www.4channel.org':
          $.onExists(doc, 'body', function() {
            return $.addStyle(CSS.www);
          });
          Captcha.replace.init();
          return;
        case 'sys.4chan.org':
        case 'sys.4channel.org':
          if (pathname[2] === 'imgboard.php') {
            if (/\bmode=report\b/.test(search)) {
              Report.init();
            } else if ((match = search.match(/\bres=(\d+)/))) {
              $.ready(function() {
                var ref;
                if (Conf['404 Redirect'] && ((ref = $.id('errmsg')) != null ? ref.textContent : void 0) === 'Error: Specified thread does not exist.') {
                  return Redirect.navigate('thread', {
                    boardID: g.BOARD.ID,
                    postID: +match[1]
                  });
                }
              });
            }
          } else if (pathname[2] === 'post') {
            PostSuccessful.init();
          }
          return;
      }
      if (ImageHost.test(hostname)) {
        if (!(pathname[2] && !/[sm]\.jpg$/.test(pathname[2]))) {
          return;
        }
        $.asap((function() {
          return d.readyState !== 'loading';
        }), function() {
          var video;
          if (Conf['404 Redirect'] && (typeof Site.is404 === "function" ? Site.is404() : void 0)) {
            return Redirect.navigate('file', {
              boardID: g.BOARD.ID,
              filename: pathname[pathname.length - 1]
            });
          } else if (video = $('video')) {
            if (Conf['Volume in New Tab']) {
              Volume.setup(video);
            }
            if (Conf['Loop in New Tab']) {
              video.loop = true;
              video.controls = false;
              video.play();
              return ImageCommon.addControls(video);
            }
          }
        });
        return;
      }
      if (typeof Site.isAuxiliaryPage === "function" ? Site.isAuxiliaryPage() : void 0) {
        return;
      }
      if ((ref = pathname[2]) === 'thread' || ref === 'res') {
        g.VIEW = 'thread';
        g.THREADID = +pathname[3].replace('.html', '');
      } else if (/^(?:catalog|archive)(?:\.html)?$/.test(pathname[2])) {
        g.VIEW = pathname[2].replace('.html', '');
      } else if (/^(?:index|\d*)(?:\.html)?$/.test(pathname[2])) {
        g.VIEW = 'index';
      } else {
        return;
      }
      g.threads = new SimpleDict();
      g.posts = new SimpleDict();
      $.onExists(doc, 'body', Main.initStyle);
      ref1 = Main.features;
      for (j = 0, len = ref1.length; j < len; j++) {
        ref2 = ref1[j], name = ref2[0], feature = ref2[1];
        if (Site.disabledFeatures && indexOf.call(Site.disabledFeatures, name) >= 0) {
          continue;
        }
        try {
          feature.init();
        } catch (_error) {
          err = _error;
          Main.handleErrors({
            message: "\"" + name + "\" initialization crashed.",
            error: err
          });
        }
      }
      return $.ready(Main.initReady);
    },
    initStyle: function() {
      var keyboard, ref;
      if (!Main.isThisPageLegit()) {
        return;
      }
      if ((ref = $('link[href*=mobile]', d.head)) != null) {
        ref.disabled = true;
      }
      doc.dataset.host = location.host;
      $.addClass(doc, "sw-" + Site.software);
      $.addClass(doc, g.VIEW === 'thread' ? 'thread-view' : g.VIEW);
      $.onExists(doc, '.ad-cnt, .adg-rects > .desktop', function(ad) {
        return $.onExists(ad, 'img, iframe', function() {
          return $.addClass(doc, 'ads-loaded');
        });
      });
      if (Conf['Autohiding Scrollbar']) {
        $.addClass(doc, 'autohiding-scrollbar');
      }
      $.ready(function() {
        if (d.body.clientHeight > doc.clientHeight && (window.innerWidth === doc.clientWidth) !== Conf['Autohiding Scrollbar']) {
          Conf['Autohiding Scrollbar'] = !Conf['Autohiding Scrollbar'];
          $.set('Autohiding Scrollbar', Conf['Autohiding Scrollbar']);
          return $.toggleClass(doc, 'autohiding-scrollbar');
        }
      });
      $.addStyle(CSS.boards, 'fourchanx-css');
      Main.bgColorStyle = $.el('style', {
        id: 'fourchanx-bgcolor-css'
      });
      keyboard = false;
      $.on(d, 'mousedown', function() {
        return keyboard = false;
      });
      $.on(d, 'keydown', function(e) {
        if (e.keyCode === 9) {
          return keyboard = true;
        }
      });
      window.addEventListener('focus', (function() {
        return doc.classList.toggle('keyboard-focus', keyboard);
      }), true);
      return Main.setClass();
    },
    setClass: function() {
      var knownStyles, mainStyleSheet, ref, setStyle, style, styleSheets;
      knownStyles = ['yotsuba', 'yotsuba-b', 'futaba', 'burichan', 'photon', 'tomorrow', 'spooky'];
      if (Site.software === 'yotsuba' && g.VIEW === 'catalog') {
        if ((mainStyleSheet = $.id('base-css'))) {
          style = (ref = mainStyleSheet.href.match(/catalog_(\w+)/)) != null ? ref[1].replace('_new', '').replace(/_+/g, '-') : void 0;
          if (indexOf.call(knownStyles, style) >= 0) {
            $.addClass(doc, style);
            return;
          }
        }
      }
      style = mainStyleSheet = styleSheets = null;
      setStyle = function() {
        var bgColor, div, j, len, rgb, s, styleSheet;
        if (Site.software === 'yotsuba') {
          $.rmClass(doc, style);
          style = null;
          for (j = 0, len = styleSheets.length; j < len; j++) {
            styleSheet = styleSheets[j];
            if (styleSheet.href === (mainStyleSheet != null ? mainStyleSheet.href : void 0)) {
              style = styleSheet.title.toLowerCase().replace('new', '').trim().replace(/\s+/g, '-');
              if (style === '_special') {
                style = styleSheet.href.match(/[a-z]*(?=[^\/]*$)/)[0];
              }
              if (indexOf.call(knownStyles, style) < 0) {
                style = null;
              }
              break;
            }
          }
          if (style) {
            $.addClass(doc, style);
            $.rm(Main.bgColorStyle);
            return;
          }
        }
        div = Site.bgColoredEl();
        div.style.position = 'absolute';
        div.style.visibility = 'hidden';
        $.add(d.body, div);
        bgColor = window.getComputedStyle(div).backgroundColor;
        $.rm(div);
        rgb = bgColor.match(/[\d.]+/g);
        if (!/^rgb\(/.test(bgColor)) {
          s = window.getComputedStyle(d.body);
          bgColor = s.backgroundColor + " " + s.backgroundImage + " " + s.backgroundRepeat + " " + s.backgroundPosition;
        }
        Main.bgColorStyle.textContent = ".dialog, .suboption-list > div:last-of-type, :root.catalog-hover-expand .catalog-container:hover > .post {\n  background: " + bgColor + ";\n}\n.unread-mark-read {\n  background-color: rgba(" + (rgb.slice(0, 3).join(', ')) + ", " + (0.5 * (rgb[3] || 1)) + ");\n}";
        return $.after($.id('fourchanx-css'), Main.bgColorStyle);
      };
      $.onExists(d.head, Site.selectors.styleSheet, function(el) {
        mainStyleSheet = el;
        if (Site.software === 'yotsuba') {
          styleSheets = $$('link[rel="alternate stylesheet"]', d.head);
        }
        new MutationObserver(setStyle).observe(mainStyleSheet, {
          attributes: true,
          attributeFilter: ['href']
        });
        $.on(mainStyleSheet, 'load', setStyle);
        return setStyle();
      });
      if (!mainStyleSheet) {
        return setStyle();
      }
    },
    initReady: function() {
      var msg;
      if (typeof Site.is404 === "function" ? Site.is404() : void 0) {
        if (g.VIEW === 'thread') {
          ThreadWatcher.set404(g.BOARD.ID, g.THREADID, function() {
            if (Conf['404 Redirect']) {
              return Redirect.navigate('thread', {
                boardID: g.BOARD.ID,
                threadID: g.THREADID,
                postID: +location.hash.match(/\d+/)
              }, "/" + g.BOARD + "/");
            }
          });
        }
        return;
      }
      if (typeof Site.isIncomplete === "function" ? Site.isIncomplete() : void 0) {
        msg = $.el('div', {
          innerHTML: "The page didn&#039;t load completely.<br>Some features may not work unless you <a href=\"javascript:;\">reload</a>."
        });
        $.on($('a', msg), 'click', function() {
          return location.reload();
        });
        new Notice('warning', msg);
      }
      if (!Index.enabled) {
        return Main.initThread();
      } else {
        Main.expectInitFinished = true;
        return $.event('4chanXInitFinished');
      }
    },
    initThread: function() {
      var board, boardID, boardObj, err, errors, j, k, len, len1, postRoot, postRoots, posts, ref, s, thread, threadRoot, threads;
      s = Site.selectors;
      if ((board = $(s.board))) {
        threads = [];
        posts = [];
        ref = $$(s.thread, board);
        for (j = 0, len = ref.length; j < len; j++) {
          threadRoot = ref[j];
          boardObj = (boardID = threadRoot.dataset.board) ? (boardID = encodeURIComponent(boardID), g.boards[boardID] || new Board(boardID)) : g.BOARD;
          thread = new Thread(+threadRoot.id.match(/\d*$/)[0], boardObj);
          thread.nodes.root = threadRoot;
          threads.push(thread);
          postRoots = $$(s.postContainer, threadRoot);
          if (Site.isOPContainerThread) {
            postRoots.unshift(threadRoot);
          }
          for (k = 0, len1 = postRoots.length; k < len1; k++) {
            postRoot = postRoots[k];
            if ($(s.comment, postRoot)) {
              try {
                posts.push(new Post(postRoot, thread, thread.board));
              } catch (_error) {
                err = _error;
                if (!errors) {
                  errors = [];
                }
                errors.push({
                  message: "Parsing of Post No." + (postRoot.id.match(/\d+/)) + " failed. Post will be skipped.",
                  error: err
                });
              }
            }
          }
        }
        if (errors) {
          Main.handleErrors(errors);
        }
        if (g.VIEW === 'thread') {
          if (typeof Site.parseThreadMetadata === "function") {
            Site.parseThreadMetadata(threads[0]);
          }
        }
        Main.callbackNodes('Thread', threads);
        return Main.callbackNodesDB('Post', posts, function() {
          var l, len2, post;
          for (l = 0, len2 = posts.length; l < len2; l++) {
            post = posts[l];
            QuoteThreading.insert(post);
          }
          Main.expectInitFinished = true;
          return $.event('4chanXInitFinished');
        });
      } else {
        Main.expectInitFinished = true;
        return $.event('4chanXInitFinished');
      }
    },
    callbackNodes: function(klass, nodes) {
      var cb, i, node;
      i = 0;
      cb = Callbacks[klass];
      while (node = nodes[i++]) {
        cb.execute(node);
      }
    },
    callbackNodesDB: function(klass, nodes, cb) {
      var cbs, fn, i, softTask;
      i = 0;
      cbs = Callbacks[klass];
      fn = function() {
        var node;
        if (!(node = nodes[i])) {
          return false;
        }
        cbs.execute(node);
        return ++i % 25;
      };
      softTask = function() {
        while (fn()) {
          continue;
        }
        if (!nodes[i]) {
          if (cb) {
            cb();
          }
          return;
        }
        return setTimeout(softTask, 0);
      };
      return softTask();
    },
    handleErrors: function(errors) {
      var div, error, j, len, logs;
      if (d.body && $.hasClass(d.body, 'fourchan_x') && !$.hasClass(doc, 'tainted')) {
        new Notice('error', 'Error: Multiple copies of 4chan X are enabled.');
        $.addClass(doc, 'tainted');
      }
      if (!(errors instanceof Array)) {
        error = errors;
      } else if (errors.length === 1) {
        error = errors[0];
      }
      if (error) {
        new Notice('error', Main.parseError(error, Main.reportLink([error])), 15);
        return;
      }
      div = $.el('div', {
        innerHTML: E(errors.length) + " errors occurred." + (Main.reportLink(errors)).innerHTML + " [<a href=\"javascript:;\">show</a>]"
      });
      $.on(div.lastElementChild, 'click', function() {
        var ref;
        return ref = this.textContent === 'show' ? ['hide', false] : ['show', true], this.textContent = ref[0], logs.hidden = ref[1], ref;
      });
      logs = $.el('div', {
        hidden: true
      });
      for (j = 0, len = errors.length; j < len; j++) {
        error = errors[j];
        $.add(logs, Main.parseError(error));
      }
      return new Notice('error', [div, logs], 30);
    },
    parseError: function(data, reportLink) {
      var context, error, lines, message, ref, ref1;
      c.error(data.message, data.error.stack);
      message = $.el('div', {
        innerHTML: E(data.message) + ((reportLink) ? (reportLink).innerHTML : "")
      });
      error = $.el('div', {
        textContent: (data.error.name || 'Error') + ": " + (data.error.message || 'see console for details')
      });
      lines = ((ref = data.error.stack) != null ? (ref1 = ref.match(/\d+(?=:\d+\)?$)/mg)) != null ? ref1.join().replace(/^/, ' at ') : void 0 : void 0) || '';
      context = $.el('div', {
        textContent: "(4chan X ccd0 v" + g.VERSION + " " + $.platform + " on " + $.engine + lines + ")"
      });
      return [message, error, context];
    },
    reportLink: function(errors) {
      var addDetails, data, details, title, url;
      data = errors[0];
      title = data.message;
      if (errors.length > 1) {
        title += " (+" + (errors.length - 1) + " other errors)";
      }
      details = '';
      addDetails = function(text) {
        if (!(encodeURIComponent(title + details + text + '\n').length > 8110)) {
          return details += text + '\n';
        }
      };
      addDetails("[Please describe the steps needed to reproduce this error.]\n\nScript: 4chan X ccd0 v" + g.VERSION + " " + $.platform + "\nUser agent: " + navigator.userAgent + "\nURL: " + location.href);
      addDetails('\n' + data.error);
      if (data.error.stack) {
        addDetails(data.error.stack.replace(data.error.toString(), '').trim());
      }
      if (data.html) {
        addDetails('\n`' + data.html + '`');
      }
      details = details.replace(/file:\/{3}.+\//g, '');
      url = "https://gitreports.com/issue/ccd0/4chan-x?issue_title=" + (encodeURIComponent(title)) + "&details=" + (encodeURIComponent(details));
      return {
        innerHTML: "<span class=\"report-error\"> [<a href=\"" + E(url) + "\" target=\"_blank\">report</a>]</span>"
      };
    },
    isThisPageLegit: function() {
      if (!('thisPageIsLegit' in Main)) {
        Main.thisPageIsLegit = Site.isThisPageLegit ? Site.isThisPageLegit() : !/^[45]\d\d\b/.test(document.title);
      }
      return Main.thisPageIsLegit;
    },
    ready: function(cb) {
      return $.ready(function() {
        if (Main.isThisPageLegit()) {
          return cb();
        }
      });
    },
    features: [['Polyfill', Polyfill], ['Board Configuration', BoardConfig], ['Normalize URL', NormalizeURL], ['Captcha Configuration', Captcha.replace], ['Image Host Rewriting', ImageHost], ['Redirect', Redirect], ['Header', Header], ['Catalog Links', CatalogLinks], ['Settings', Settings], ['Index Generator', Index], ['Disable Autoplay', AntiAutoplay], ['Announcement Hiding', PSAHiding], ['Fourchan thingies', Fourchan], ['Color User IDs', IDColor], ['Highlight by User ID', IDHighlight], ['Count Posts by ID', IDPostCount], ['Custom CSS', CustomCSS], ['Thread Links', ThreadLinks], ['Linkify', Linkify], ['Reveal Spoilers', RemoveSpoilers], ['Resurrect Quotes', Quotify], ['Filter', Filter], ['Thread Hiding Buttons', ThreadHiding], ['Reply Hiding Buttons', PostHiding], ['Recursive', Recursive], ['Strike-through Quotes', QuoteStrikeThrough], ['Quick Reply Personas', QR.persona], ['Quick Reply', QR], ['Cooldown', QR.cooldown], ['Pass Link', PassLink], ['Menu', Menu], ['Index Generator (Menu)', Index.menu], ['Report Link', ReportLink], ['Copy Text Link', CopyTextLink], ['Thread Hiding (Menu)', ThreadHiding.menu], ['Reply Hiding (Menu)', PostHiding.menu], ['Delete Link', DeleteLink], ['Filter (Menu)', Filter.menu], ['Edit Link', QR.oekaki.menu], ['Download Link', DownloadLink], ['Archive Link', ArchiveLink], ['Quote Inlining', QuoteInline], ['Quote Previewing', QuotePreview], ['Quote Backlinks', QuoteBacklink], ['Mark Quotes of You', QuoteYou], ['Mark OP Quotes', QuoteOP], ['Mark Cross-thread Quotes', QuoteCT], ['Anonymize', Anonymize], ['Time Formatting', Time], ['Relative Post Dates', RelativeDates], ['File Info Formatting', FileInfo], ['Fappe Tyme', FappeTyme], ['Gallery', Gallery], ['Gallery (menu)', Gallery.menu], ['Sauce', Sauce], ['Image Expansion', ImageExpand], ['Image Expansion (Menu)', ImageExpand.menu], ['Reveal Spoiler Thumbnails', RevealSpoilers], ['Image Loading', ImageLoader], ['Image Hover', ImageHover], ['Volume Control', Volume], ['WEBM Metadata', Metadata], ['Comment Expansion', ExpandComment], ['Thread Expansion', ExpandThread], ['Favicon', Favicon], ['Unread', Unread], ['Unread Line in Index', UnreadIndex], ['Quote Threading', QuoteThreading], ['Thread Stats', ThreadStats], ['Thread Updater', ThreadUpdater], ['Thread Watcher', ThreadWatcher], ['Thread Watcher (Menu)', ThreadWatcher.menu], ['Mark New IPs', MarkNewIPs], ['Index Navigation', Nav], ['Keybinds', Keybinds], ['Banner', Banner], ['Flash Features', Flash], ['Reply Pruning', ReplyPruning]]
  };

  return Main;

}).call(this);

Main.init();

})();
