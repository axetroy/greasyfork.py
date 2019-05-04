// ==UserScript==
// @name         4chan X shitpost removal edition
// @version      2.1
// @minGMVer     1.14
// @minFFVer     26
// @namespace    4chan-X anti shitpost edition
// @description  removal of shitposts for 4chins
// @license      beerware
// @match        *://boards.4chan.org/*
// @match        *://sys.4chan.org/*
// @match        *://a.4cdn.org/*
// @match        *://i.4cdn.org/*
// @match        *://www.google.com/recaptcha/api/fallback?k=6Ldp2bsSAAAAAAJ5uyx_lx34lJeEpTLVkP5k04qc
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_deleteValue
// @grant        GM_listValues
// @grant        GM_openInTab
// @grant        GM_xmlhttpRequest
// @run-at       document-start
// @icon         data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgAgMAAAAOFJJnAAAACVBMVEUAAGcAAABmzDNZt9VtAAAAAXRSTlMAQObYZgAAAE5JREFUeF6NyiEOwEAMA0ET/88kJP8L2VdWKomuR7poJFu/qkiuhcxITRZqYkYLwzRkoQIoLaSG0QFDDtwfw7stmmnmRPxBx3PAlpLF3QN2aj/BUuOfdAAAAABJRU5ErkJggg==
// ==/UserScript==
 
 /* 4chan X Shitpost Removal Edition- Version Applep
 * exactly the same as regular 4chanX, but with 
 * pre-loaded filters to remove bullshittery.
 */

'use strict';

(function() {
  var $, $$, Anonymize, AntiAutoplay, ArchiveLink, Banner, Board, Build, Callbacks, Captcha, CatalogLinks, CatalogThread, Clone, Conf, Config, Connection, CrossOrigin, CustomCSS, DataBoard, DeleteLink, DownloadLink, E, Embedding, ExpandComment, ExpandThread, FappeTyme, Favicon, FileInfo, Filter, Fourchan, Gallery, Get, Header, IDColor, IDHighlight, ImageCommon, ImageExpand, ImageHover, ImageLoader, Index, Keybinds, Linkify, Main, MarkNewIPs, Menu, Nav, Notice, PSAHiding, Polyfill, Post, PostHiding, QR, QuoteBacklink, QuoteCT, QuoteInline, QuoteOP, QuotePreview, QuoteStrikeThrough, QuoteThreading, QuoteYou, Quotify, RandomAccessList, Recursive, Redirect, RelativeDates, RemoveSpoilers, ReportLink, RevealSpoilers, Sauce, Settings, ShimSet, SimpleDict, Thread, ThreadExcerpt, ThreadHiding, ThreadStats, ThreadUpdater, ThreadWatcher, Time, UI, Unread, c, d, doc, g,
    __slice = [].slice,
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  Array.prototype.indexOf = function(val, i) {
    var len;
    i || (i = 0);
    len = this.length;
    while (i < len) {
      if (this[i] === val) {
        return i;
      }
      i++;
    }
    return -1;
  };

  __indexOf = [].indexOf;

  Config = {
    main: {
      'Miscellaneous': {
        'JSON Navigation': [true, 'Replace the original board index with one supporting searching, sorting, infinite scrolling, and a catalog mode.'],
        'Use 4chan X Catalog': [true, 'Link to 4chan X\'s catalog instead of the native 4chan one.', 1],
        'External Catalog': [false, 'Link to external catalog instead of the internal one.'],
        'Catalog Links': [false, 'Add toggle link in header menu to turn Navigation links into links to each board\'s catalog.'],
        'Announcement Hiding': [true, 'Add button to hide 4chan announcements.'],
        'Desktop Notifications': [false, 'Enables desktop notifications across various 4chan X features.'],
        '404 Redirect': [true, 'Redirect dead threads and images to the archives.'],
        'Except Archives from Encryption': [false, 'Permit loading content from, and warningless redirects to, HTTP-only archives from HTTPS pages.'],
        'Keybinds': [true, 'Bind actions to keyboard shortcuts.'],
        'Time Formatting': [true, 'Localize and format timestamps.'],
        'Relative Post Dates': [true, 'Display dates like "3 minutes ago". Tooltip shows the timestamp.'],
        'Relative Date Title': [true, 'Show Relative Post Date only when hovering over dates.', 1],
        'Comment Expansion': [true, 'Add buttons to expand too long comments.'],
        'File Info Formatting': [true, 'Reformat the file information.'],
        'Thread Expansion': [true, 'Add buttons to expand threads.'],
        'Index Navigation': [false, 'Add buttons to navigate between threads.'],
        'Reply Navigation': [false, 'Add buttons to navigate to top / bottom of thread.'],
        'Custom Board Titles': [true, 'Allow editing of the board title and subtitle by ctrl/\u2318+clicking them.'],
        'Persistent Custom Board Titles': [false, 'Force custom board titles to be persistent, even if moot updates the board titles.', 1],
        'Show Updated Notifications': [true, 'Show notifications when 4chan X is successfully updated.'],
        'Color User IDs': [false, 'Assign unique colors to user IDs on boards that use them'],
        'Remove Spoilers': [false, 'Remove all spoilers in text.'],
        'Reveal Spoilers': [false, 'Indicate spoilers if Remove Spoilers is enabled, or make the text appear hovered if Remove Spoiler is disabled.'],
        'Show Support Message': [true, 'Warn if your browser or configuration is unsupported and may cause 4chan X to not operate correctly.'],
        'Normalize URL': [true, 'Rewrite the URL of the current page, removing stubs and changing /res/ to /thread/.'],
        'Disable Autoplaying Sounds': [false, 'Prevent sounds on the page from autoplaying.'],
        'Disable Native Extension': [true, '4chan X is NOT designed to work with the native extension.']
      },
      'Linkification': {
        'Linkify': [true, 'Convert text into links where applicable.'],
        'Embedding': [true, 'Embed supported services. Note: Some services don\'t work on HTTPS.', 1],
        'Auto-embed': [false, 'Auto-embed Linkify Embeds.', 2],
        'Floating Embeds': [false, 'Embed content in a frame that remains in place when the page is scrolled.', 2],
        'Link Title': [true, 'Replace the link of a supported site with its actual title. Currently Supported: YouTube, Vimeo, SoundCloud, and Github gists', 1]
      },
      'Filtering': {
        'Anonymize': [false, 'Make everyone Anonymous.'],
        'Filter': [true, 'Self-moderation placebo.'],
        'Filtered Backlinks': [false, 'When enabled, shows backlinks to filtered posts with a line-through decoration. Otherwise, hides the backlinks.', 1],
        'Recursive Hiding': [false, 'Hide replies of hidden posts, recursively.'],
        'Thread Hiding Buttons': [true, 'Add buttons to hide entire threads.'],
        'Reply Hiding Buttons': [true, 'Add buttons to hide single replies.'],
        'Stubs': [true, 'Show stubs of hidden threads / replies.']
      },
      'Images and Videos': {
        'Image Expansion': [true, 'Expand images / videos.'],
        'Image Hover': [true, 'Show full image / video on mouseover.'],
        'Image Hover in Catalog': [false, 'Show full image / video on mouseover in 4chan X catalog.'],
        'Gallery': [true, 'Adds a simple and cute image gallery.'],
        'Fullscreen Gallery': [false, 'Open gallery in fullscreen mode.', 1],
        'PDF in Gallery': [false, 'Show PDF files in gallery.', 1],
        'Sauce': [true, 'Add sauce links to images.'],
        'Reveal Spoiler Thumbnails': [false, 'Replace spoiler thumbnails with the original image.'],
        'Replace GIF': [false, 'Replace gif thumbnails with the actual image.'],
        'Replace JPG': [false, 'Replace jpg thumbnails with the actual image.'],
        'Replace PNG': [false, 'Replace png thumbnails with the actual image.'],
        'Replace WEBM': [false, 'Replace webm thumbnails with the actual webm video. Probably will degrade browser performance ;)'],
        'Image Prefetching': [false, 'Add link in header menu to turn on image preloading.'],
        'Fappe Tyme': [false, 'Hide posts without images when header menu item is checked. *hint* *hint*'],
        'Werk Tyme': [false, 'Hide all post images when header menu item is checked.'],
        'Autoplay': [true, 'Videos begin playing immediately when opened.'],
        'Restart when Opened': [true, 'Restart GIFs and WebMs when you hover over or expand them.'],
        'Show Controls': [true, 'Show controls on videos expanded inline. Turn this off if you want to contract videos by clicking on them.'],
        'Loop in New Tab': [true, 'Loop videos opened in their own tabs.']
      },
      'Menu': {
        'Menu': [true, 'Add a drop-down menu to posts.'],
        'Report Link': [true, 'Add a report link to the menu.', 1],
        'Thread Hiding Link': [true, 'Add a link to hide entire threads.', 1],
        'Reply Hiding Link': [true, 'Add a link to hide single replies.', 1],
        'Delete Link': [true, 'Add post and image deletion links to the menu.', 1],
        'Download Link': [true, 'Add a download with original filename link to the menu.', 1],
        'Archive Link': [true, 'Add an archive link to the menu.', 1]
      },
      'Monitoring': {
        'Thread Updater': [true, 'Fetch and insert new replies. Has more options in its own dialog.'],
        'Unread Count': [true, 'Show the unread posts count in the tab title.'],
        'Quoted Title': [false, 'Change the page title to reflect you\'ve been quoted.', 1],
        'Hide Unread Count at (0)': [false, 'Hide the unread posts count in the tab title when it reaches 0.', 1],
        'Unread Favicon': [true, 'Show a different favicon when there are unread posts.'],
        'Unread Line': [true, 'Show a line to distinguish read posts from unread ones.'],
        'Scroll to Last Read Post': [true, 'Scroll back to the last read post when reopening a thread.'],
        'Thread Excerpt': [true, 'Show an excerpt of the thread in the tab title for threads in /f/.'],
        'Remove Thread Excerpt': [false, 'Replace the excerpt of the thread in the tab title with the board title.'],
        'Thread Stats': [true, 'Display reply and image count.'],
        'IP Count in Stats': [true, 'Display the unique IP count in the thread stats.', 1],
        'Page Count in Stats': [true, 'Display the page count in the thread stats.', 1],
        'Updater and Stats in Header': [true, 'Places the thread updater and thread stats in the header instead of floating them.'],
        'Thread Watcher': [true, 'Bookmark threads.'],
        'Toggleable Thread Watcher': [true, 'Adds a shortcut for the thread watcher, hides the watcher by default, and makes it scroll with the page.', 1],
        'Mark New IPs': [false, 'Label each post from a new IP with the thread\'s current IP count.']
      },
      'Posting': {
        'Quick Reply': [true, 'All-in-one form to reply, create threads, automate dumping and more.'],
        'QR Shortcut': [true, 'Adds a small [QR] link in the header.', 1],
        'Persistent QR': [true, 'The Quick reply won\'t disappear after posting.', 1],
        'Auto Hide QR': [true, 'Automatically hide the quick reply when posting.', 1],
        'Open Post in New Tab': [true, 'Open new threads or replies to a thread from the index in a new tab.', 1],
        'Remember QR Size': [false, 'Remember the size of the Quick reply.', 1],
        'Remember Spoiler': [false, 'Remember the spoiler state, instead of resetting after posting.', 1],
        'Show New Thread Option in Threads': [false, 'Show the option to post a new / different thread from inside a thread.', 1],
        'Show Name and Subject': [false, 'Show the classic name, email, and subject fields in the QR, even when 4chan doesn\'t use them all.', 1],
        'Hide Original Post Form': [true, 'Hide the normal post form.', 1],
        'Cooldown': [true, 'Indicate the remaining time before posting again.', 1],
        'Posting Success Notifications': [true, 'Show notifications on successful post creation or file uploading.', 1],
        'Force Noscript Captcha': [false, 'Use the non-Javascript fallback captcha in the QR even if Javascript is enabled.', 1],
        'Captcha Warning Notifications': [true, 'When disabled, shows a red border on the CAPTCHA input until a key is pressed instead of a notification.', 1],
        'Auto-load captcha': [false, 'Automatically load the captcha in the QR even if your post is empty.', 1],
        'Post on Captcha Completion': [false, 'Submit the post immediately when the captcha is completed.', 1],
        'Bottom QR Link': [true, 'Places a link on the bottom of threads to open the QR.', 1]
      },
      'Quote Links': {
        'Quote Backlinks': [true, 'Add quote backlinks.'],
        'OP Backlinks': [true, 'Add backlinks to the OP.', 1],
        'Quote Inlining': [true, 'Inline quoted post on click.'],
        'Quote Hash Navigation': [false, 'Include an extra link after quotes for autoscrolling to quoted posts.', 1],
        'Forward Hiding': [true, 'Hide original posts of inlined backlinks.', 1],
        'Quote Previewing': [true, 'Show quoted post on hover.'],
        'Quote Highlighting': [true, 'Highlight the previewed post.', 1],
        'Resurrect Quotes': [true, 'Link dead quotes to the archives.'],
        'Mark Quotes of You': [true, 'Add \'(You)\' to quotes linking to your posts.'],
        'Highlight Posts Quoting You': [false, 'Highlights any posts that contain a quote to your post.', 1],
        'Highlight Own Posts': [false, 'Highlights own posts if Mark Quotes of You is enabled.', 1],
        'Mark OP Quotes': [true, 'Add \'(OP)\' to OP quotes.'],
        'Mark Cross-thread Quotes': [true, 'Add \'(Cross-thread)\' to cross-threads quotes.'],
        'Quote Threading': [false, 'Thread conversations']
      }
    },
    imageExpansion: {
      'Fit width': [true, ''],
      'Fit height': [false, ''],
      'Scroll into view': [true, 'Scroll down when expanding images to bring the full image into view.'],
      'Expand spoilers': [true, 'Expand all images along with spoilers.'],
      'Expand videos': [true, 'Expand all images also expands videos.'],
      'Expand from here': [false, 'Expand all images only from current position to thread end.'],
      'Advance on contract': [false, 'Advance to next post when contracting an expanded image.']
    },
    gallery: {
      'Hide Thumbnails': [false],
      'Fit Width': [true],
      'Fit Height': [true],
      'Scroll to Post': [true],
      'Slide Delay': [6.0]
    },
    threadWatcher: {
      'Current Board': [false, 'Only show watched threads from the current board.'],
      'Auto Update Thread Watcher': [true, 'Periodically check status of watched threads.'],
      'Auto Watch': [false, 'Automatically watch threads you start.'],
      'Auto Watch Reply': [false, 'Automatically watch threads you reply to.'],
      'Auto Prune': [false, 'Automatically prune dead threads.'],
      'Show Unread Count': [true, 'Show number of unread posts in watched threads.']
    },
    filter: {
      name: "# Filter any namefags:\n#/^(?!Anonymous$)/",
      uniqueID: "# Filter a specific ID:\n#/Txhvk1Tl/\n/C103SK0f/\n/toKI3al2/\n/und2t4wa/\n/w6UJnRr+/\n/a7rKiosM/\n/und2t4wa/\n/qh+Ydoic/\n/XzxUK+1U/\n/CxeOPfwi/\n/bxXCKuI3/\n/toKI3al2/\n/m8cWEZUT/\n/zWK22wgo/\n/ciQ1vwNh/\n/hLR1ZjqU/\n/dDZvvSuk/\n/jL4dC2sx/\n/zjhXcQO9/\n/KrH7SvBd/",
      tripcode: "# Filter angela/hitler roleplayfags\n/^!!vQTuEmmLrWa$/;op:yes\n/^!!GbGzeej\+vGx$/;op:yes\n/^!!GbGzeej\+vGx$/;op:yes\n#Filter Melly:\n/^!!rdTCjLakIjm$/;op:yes\n",
      capcode: "# Set a custom class for mods:\n#/Mod$/;highlight:mod;op:yes\n# Set a custom class for moot:\n#/Admin$/;highlight:moot;op:yes",
      email: "",
      subject: "# Filter Generals on /pol/:\n/general/i;boards:pol;op:only\n#Filter Risk threads:\n/risk/i;boards:pol;op:only",
      comment: "# Filter Russel Brand spam:\n/russel brand/i;boards:pol;op:only\n#Filter Sam Hyde spam:\n/sam hyde/i;boards:pol;op:only\n#filter baldy spam\n/Stefan Molyneux/i;op:only\n#Filter Louis CK spam:\n/louis c/i;boards:pol;op:only\n#Filter Risk threads:\n/risk/i;boards:pol;op:only\n#OPTIONAL: remove hash to filter ayy lmao-fags\n/ayy lmao/i;boards:pol;op:yes\n#Marine bootcamp copypasta\n/leaving for marine boot camp tomorrow/i;op:only\n/What the fuck did you just fucking say about me/i;op:yes\n/intro to my 8 steps of cluckolding/;op:yes\n/cuck king/i;op:yes\n",
      flag: "#filter aussie shitposters\n/^Australia$/",
      filename: "",
      dimensions: "",
      filesize: "",
      MD5: ""
    },
    sauces: "https://www.google.com/searchbyimage?image_url=%TURL\nhttp://iqdb.org/?url=%TURL\n#//tineye.com/search?url=%TURL\n#//saucenao.com/search.php?url=%TURL\n#http://3d.iqdb.org/?url=%TURL\n#http://regex.info/exif.cgi?imgurl=%URL\n# uploaders:\n#//imgur.com/upload?url=%URL;text:Upload to imgur\n# \"View Same\" in archives:\n#https://archive.moe/_/search/image/%MD5/;text:View same on archive.moe\n#https://archive.moe/%board/search/image/%MD5/;text:View same on archive.moe/%board/;boards:a,biz,c,co,diy,gd,h,i,jp,k,m,mlp,po,qa,s4s,sci,tg,u,v,vg,vp,vr,wsg\n#https://rbt.asia/%board/image/%MD5;text:View same on RBT /%board/;boards:cgl,g,mu,qa,w\n# Search with full image only for image file types:\n#https://www.google.com/searchbyimage?image_url=%URL;types:gif,jpg,png\n#https://www.google.com/searchbyimage?image_url=%TURL;types:webm,pdf",
    FappeT: {
      werk: false
    },
    'Custom CSS': false,
    Index: {
      'Index Mode': 'paged',
      'Previous Index Mode': 'paged',
      'Index Sort': 'bump',
      'Index Size': 'small',
      'Show Replies': true,
      'Pin Watched Threads': false,
      'Anchor Hidden Threads': true,
      'Refreshed Navigation': false
    },
    Header: {
      'Fixed Header': true,
      'Header auto-hide': false,
      'Header auto-hide on scroll': false,
      'Bottom Header': false,
      'Centered links': false,
      'Header catalog links': false,
      'Bottom Board List': true,
      'Shortcut Icons': true,
      'Custom Board Navigation': true
    },
    boardnav: "[ toggle-all ]\na-replace\nc-replace\ng-replace\nk-replace\nv-replace\nvg-replace\nvr-replace\nck-replace\nco-replace\nfit-replace\njp-replace\nmu-replace\nsp-replace\ntv-replace\nvp-replace\n[external-text:\"FAQ\",\"https://github.com/ccd0/4chan-x/wiki/Frequently-Asked-Questions\"]",
    QR: {
      'QR.personas': "#options:\"sage\";boards:jp;always"
    },
    time: '%m/%d/%y(%a)%H:%M:%S',
    backlink: '>>%id',
    fileInfo: '%l (%p%s, %r)',
    favicon: 'ferongr',
    usercss: '',
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
      'Toggle sage': ['Alt+s', 'Toggle sage in options field.'],
      'Submit QR': ['Ctrl+Enter', 'Submit post.'],
      'Watch': ['w', 'Watch thread.'],
      'Update': ['r', 'Update the thread / refresh the index.'],
      'Expand image': ['Shift+e', 'Expand selected image.'],
      'Expand images': ['e', 'Expand all images.'],
      'Open Gallery': ['g', 'Opens the gallery.'],
      'Pause': ['p', 'Pause/play videos in the gallery.'],
      'Slideshow': ['s', 'Toggle the gallery slideshow mode.'],
      'fappeTyme': ['f', 'Toggle Fappe Tyme.'],
      'werkTyme': ['Shift+w', 'Toggle Werk Tyme.'],
      'Front page': ['1', 'Jump to front page.'],
      'Open front page': ['Shift+1', 'Open front page in a new tab.'],
      'Next page': ['Ctrl+Right', 'Jump to the next page.'],
      'Previous page': ['Ctrl+Left', 'Jump to the previous page.'],
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
      'Previous Post Quoting You': ['Alt+Up', 'Scroll to the previous post that quotes you.'],
      'Next Post Quoting You': ['Alt+Down', 'Scroll to the next post that quotes you.']
    },
    updater: {
      checkbox: {
        'Beep': [false, 'Beep on new post to completely read thread.'],
        'Auto Scroll': [false, 'Scroll updated posts into view. Only enabled at bottom of page.'],
        'Bottom Scroll': [false, 'Always scroll to the bottom, not the first new post. Useful for event threads.'],
        'Scroll BG': [false, 'Auto-scroll background tabs.'],
        'Auto Update': [true, 'Automatically fetch new posts.'],
        'Optional Increase': [false, 'Increase the intervals between updates on threads without new posts.']
      },
      'Interval': 30
    }
  };

  Conf = {};

  c = console;

  d = document;

  doc = d.documentElement;

  g = {
    VERSION: '1.9.20.7',
    NAMESPACE: '4chan X.',
    NAME: '4chan X',
    FAQ: 'https://github.com/ccd0/4chan-x/wiki/Frequently-Asked-Questions',
    CHANGELOG: 'https://github.com/ccd0/4chan-x/blob/master/CHANGELOG.md',
    boards: {}
  };

  E = function(text) {
    return (text + '').replace(/[&"'<>]/g, function(x) {
      return {
        '&': '&amp;',
        "'": '&#039;',
        '"': '&quot;',
        '<': '&lt;',
        '>': '&gt;'
      }[x];
    });
  };

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
    var blockedError, blockedURLs, lastModified;
    lastModified = {};
    blockedURLs = {};
    blockedError = function(url) {
      var message;
      if (blockedURLs[url]) {
        return;
      }
      blockedURLs[url] = true;
      message = $.el('div', {
        innerHTML: E(g.NAME) + " was blocked from loading the following URL:<br><span></span><br>[<a href=\"" + E(g.FAQ) + "#why-was-4chan-x-blocked-from-loading-a-url\" target=\"_blank\">More info</a>]"
      });
      $('span', message).textContent = (/^\/\//.test(url) ? location.protocol : '') + url;
      return new Notice('error', message, 30, function() {
        return delete blockedURLs[url];
      });
    };
    return function(url, options, extra) {
      var err, form, r, type, upCallbacks, whenModified;
      if (extra == null) {
        extra = {};
      }
      type = extra.type, whenModified = extra.whenModified, upCallbacks = extra.upCallbacks, form = extra.form;
      r = new XMLHttpRequest();
      type || (type = form && 'post' || 'get');
      try {
        r.open(type, url, true);
      } catch (_error) {
        err = _error;
        blockedError(url);
        if (typeof options.onerror === "function") {
          options.onerror();
        }
        return;
      }
      if (whenModified) {
        if (url in lastModified) {
          r.setRequestHeader('If-Modified-Since', lastModified[url]);
        }
        $.on(r, 'load', function() {
          return lastModified[url] = r.getResponseHeader('Last-Modified');
        });
      }
      if (/\.json$/.test(url)) {
        r.responseType = 'json';
      }
      $.extend(r, options);
      $.extend(r.upload, upCallbacks);
      r.send(form);
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
            return cb.call(req, req.evt);
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
        var _i, _len, _ref;
        _ref = this.callbacks;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          cb = _ref[_i];
          cb.call(this, e);
        }
        this.evt = e;
        this.cached = true;
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

  $.onExists = function(root, selector, subtree, cb) {
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
      subtree: subtree
    });
  };

  $.addStyle = function(css, id, test) {
    var style;
    style = $.el('style', {
      id: id,
      textContent: css
    });
    $.asap((function() {
      return d.head && ((test == null) || test());
    }), function() {
      return $.add(d.head, style);
    });
    return style;
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
    var className, classNames, el, _i, _len;
    el = arguments[0], classNames = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
    for (_i = 0, _len = classNames.length; _i < _len; _i++) {
      className = classNames[_i];
      el.classList.add(className);
    }
  };

  $.rmClass = function() {
    var className, classNames, el, _i, _len;
    el = arguments[0], classNames = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
    for (_i = 0, _len = classNames.length; _i < _len; _i++) {
      className = classNames[_i];
      el.classList.remove(className);
    }
  };

  $.toggleClass = function(el, className) {
    return el.classList.toggle(className);
  };

  $.hasClass = function(el, className) {
    return __indexOf.call(el.classList, className) >= 0;
  };

  $.rm = function(el) {
    return el.remove();
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
    var frag, node, _i, _len;
    if (!(nodes instanceof Array)) {
      return nodes;
    }
    frag = $.frag();
    for (_i = 0, _len = nodes.length; _i < _len; _i++) {
      node = nodes[_i];
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

  $.el = function(tag, properties) {
    var el;
    el = d.createElement(tag);
    if (properties) {
      $.extend(el, properties);
    }
    return el;
  };

  $.on = function(el, events, handler) {
    var event, _i, _len, _ref;
    _ref = events.split(' ');
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      event = _ref[_i];
      el.addEventListener(event, handler, false);
    }
  };

  $.off = function(el, events, handler) {
    var event, _i, _len, _ref;
    _ref = events.split(' ');
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      event = _ref[_i];
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
      detail = cloneInto(detail, document.defaultView);
    }
    return root.dispatchEvent(new CustomEvent(event, {
      bubbles: true,
      detail: detail
    }));
  };

  $.open = GM_openInTab;

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

  $.globalEval = function(code) {
    var script;
    script = $.el('script', {
      textContent: code
    });
    $.add(d.head || doc, script);
    return $.rm(script);
  };

  $.bytesToString = function(size) {
    var unit;
    unit = 0;
    while (size >= 1024) {
      size /= 1024;
      unit++;
    }
    size = unit > 1 ? Math.round(size * 100) / 100 : Math.round(size);
    return "" + size + " " + ['B', 'KB', 'MB', 'GB'][unit];
  };

  $.minmax = function(value, min, max) {
    return (value < min ? min : value > max ? max : value);
  };

  $.item = function(key, val) {
    var item;
    item = {};
    item[key] = val;
    return item;
  };

  $.syncing = {};

  $.oldValue = {};

  $.sync = function(key, cb) {
    key = g.NAMESPACE + key;
    $.syncing[key] = cb;
    return $.oldValue[key] = GM_getValue(key);
  };

  (function() {
    var onChange;
    onChange = function(key) {
      var cb, newValue;
      if (!(cb = $.syncing[key])) {
        return;
      }
      newValue = GM_getValue(key);
      if (newValue === $.oldValue[key]) {
        return;
      }
      if (newValue != null) {
        $.oldValue[key] = newValue;
        return cb(JSON.parse(newValue), key);
      } else {
        delete $.oldValue[key];
        return cb(void 0, key);
      }
    };
    $.on(window, 'storage', function(_arg) {
      var key;
      key = _arg.key;
      return onChange(key);
    });
    return $.forceSync = function(key) {
      return onChange(g.NAMESPACE + key);
    };
  })();

  $["delete"] = function(keys) {
    var key, _i, _len;
    if (!(keys instanceof Array)) {
      keys = [keys];
    }
    for (_i = 0, _len = keys.length; _i < _len; _i++) {
      key = keys[_i];
      key = g.NAMESPACE + key;
      GM_deleteValue(key);
      if (key in $.syncing) {
        delete $.oldValue[key];
        localStorage.removeItem(key);
      }
    }
  };

  $.get = function(key, val, cb) {
    var items;
    if (typeof cb === 'function') {
      items = $.item(key, val);
    } else {
      items = key;
      cb = val;
    }
    return $.queueTask(function() {
      for (key in items) {
        if (val = GM_getValue(g.NAMESPACE + key)) {
          items[key] = JSON.parse(val);
        }
      }
      return cb(items);
    });
  };

  $.set = (function() {
    var set;
    set = function(key, val) {
      key = g.NAMESPACE + key;
      val = JSON.stringify(val);
      GM_setValue(key, val);
      if (key in $.syncing) {
        $.oldValue[key] = val;
        return localStorage.setItem(key, val);
      }
    };
    return function(keys, val) {
      var key;
      if (typeof keys === 'string') {
        set(keys, val);
        return;
      }
      for (key in keys) {
        val = keys[key];
        set(key, val);
      }
    };
  })();

  $.clear = function(cb) {
    $["delete"](GM_listValues().map(function(key) {
      return key.replace(g.NAMESPACE, '');
    }));
    return typeof cb === "function" ? cb() : void 0;
  };

  $$ = function(selector, root) {
    if (root == null) {
      root = d.body;
    }
    return __slice.call(root.querySelectorAll(selector));
  };

  Callbacks = (function() {
    function Callbacks(type) {
      this.type = type;
      this.keys = [];
    }

    Callbacks.prototype.push = function(_arg) {
      var cb, name;
      name = _arg.name, cb = _arg.cb;
      if (!this[name]) {
        this.keys.push(name);
      }
      return this[name] = cb;
    };

    Callbacks.prototype.execute = function(node) {
      var err, errors, name, _i, _len, _ref;
      _ref = this.keys;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        name = _ref[_i];
        try {
          this[name].call(node);
        } catch (_error) {
          err = _error;
          if (!errors) {
            errors = [];
          }
          errors.push({
            message: ['"', name, '" crashed on node ', this.type, ' No.', node.ID, ' (', node.board, ').'].join(''),
            error: err
          });
        }
      }
      if (errors) {
        return Main.handleErrors(errors);
      }
    };

    return Callbacks;

  })();

  Board = (function() {
    Board.prototype.toString = function() {
      return this.ID;
    };

    function Board(ID) {
      this.ID = ID;
      this.threads = new SimpleDict;
      this.posts = new SimpleDict;
      g.boards[this] = this;
    }

    return Board;

  })();

  Thread = (function() {
    Thread.callbacks = new Callbacks('Thread');

    Thread.prototype.toString = function() {
      return this.ID;
    };

    function Thread(ID, board) {
      this.ID = ID;
      this.board = board;
      this.fullID = "" + this.board + "." + this.ID;
      this.posts = new SimpleDict;
      this.isDead = false;
      this.isHidden = false;
      this.isOnTop = false;
      this.isSticky = false;
      this.isClosed = false;
      this.isArchived = false;
      this.postLimit = false;
      this.fileLimit = false;
      this.ipCount = void 0;
      this.OP = null;
      this.catalogView = null;
      g.threads.push(this.fullID, board.threads.push(this, this));
    }

    Thread.prototype.setPage = function(pageNum) {
      var icon, info, quote, _ref;
      _ref = this.OP.nodes, info = _ref.info, quote = _ref.quote;
      if (!(icon = $('.page-num', info))) {
        icon = $.el('span', {
          className: 'page-num'
        });
        $.after(quote, [$.tn(' '), icon]);
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
      el = this.catalogView.nodes["" + type + "Count"];
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
        className: "" + typeLC + "Icon retina"
      });
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
      this.posts.forEach(function(post) {
        return post.collect();
      });
      g.threads.rm(this.fullID);
      return this.board.threads.rm(this);
    };

    return Thread;

  })();

  CatalogThread = (function() {
    CatalogThread.callbacks = new Callbacks('CatalogThread');

    CatalogThread.prototype.toString = function() {
      return this.ID;
    };

    function CatalogThread(root, thread) {
      this.thread = thread;
      this.ID = this.thread.ID;
      this.board = this.thread.board;
      this.nodes = {
        root: root,
        thumb: $('.catalog-thumb', root),
        icons: $('.catalog-icons', root),
        postCount: $('.post-count', root),
        fileCount: $('.file-count', root),
        pageCount: $('.page-count', root),
        comment: $('.comment', root)
      };
      this.thread.catalogView = this;
    }

    return CatalogThread;

  })();

  Post = (function() {
    Post.callbacks = new Callbacks('Post');

    Post.prototype.toString = function() {
      return this.ID;
    };

    function Post(root, thread, board, that) {
      var capcode, date, email, flag, info, name, post, subject, tripcode, uniqueID;
      this.thread = thread;
      this.board = board;
      if (that == null) {
        that = {};
      }
      this.ID = +root.id.slice(2);
      this.fullID = "" + this.board + "." + this.ID;
      if (that.isOriginalMarkup) {
        this.cleanup(root);
      }
      post = $('.post', root);
      info = $('.postInfo', post);
      this.nodes = {
        root: root,
        post: post,
        info: info,
        nameBlock: $('.nameBlock', info),
        quote: $('.postNum > a:nth-of-type(2)', info),
        comment: $('.postMessage', post),
        links: [],
        quotelinks: [],
        backlinks: info.getElementsByClassName('backlink')
      };
      if (!(this.isReply = $.hasClass(post, 'reply'))) {
        this.thread.OP = this;
        this.thread.isArchived = !!$('.archivedIcon', info);
        this.thread.isSticky = !!$('.stickyIcon', info);
        this.thread.isClosed = this.thread.isArchived || !!$('.closedIcon', info);
        if (this.thread.isArchived) {
          this.thread.kill();
        }
      }
      this.info = {};
      this.info.nameBlock = Conf['Anonymize'] ? 'Anonymous' : this.nodes.nameBlock.textContent.trim();
      if (subject = $('.subject', info)) {
        this.nodes.subject = subject;
        this.info.subject = subject.textContent;
      }
      if (name = $('.name', info)) {
        this.nodes.name = name;
        this.info.name = name.textContent;
      }
      if (email = $('.useremail', info)) {
        this.nodes.email = email;
        this.info.email = decodeURIComponent(email.href.slice(7));
      }
      if (tripcode = $('.postertrip', info)) {
        this.nodes.tripcode = tripcode;
        this.info.tripcode = tripcode.textContent;
      }
      if (uniqueID = $('.posteruid', info)) {
        this.nodes.uniqueID = uniqueID;
        this.info.uniqueID = uniqueID.firstElementChild.textContent;
      }
      if (capcode = $('.capcode.hand', info)) {
        this.nodes.capcode = capcode;
        this.info.capcode = capcode.textContent.replace('## ', '');
      }
      if (flag = $('.flag, .countryFlag', info)) {
        this.nodes.flag = flag;
        this.info.flag = flag.title;
      }
      if (date = $('.dateTime', info)) {
        this.nodes.date = date;
        this.info.date = new Date(date.dataset.utc * 1000);
      }
      this.parseComment();
      this.parseQuotes();
      this.parseFile(that);
      this.isDead = false;
      this.isHidden = false;
      this.clones = [];
      g.posts.push(this.fullID, thread.posts.push(this, board.posts.push(this, this)));
      if (that.isArchived) {
        this.kill();
      }
    }

    Post.prototype.parseComment = function() {
      var bq, node, spoilers, _i, _len, _ref;
      this.nodes.comment.normalize();
      bq = this.nodes.comment.cloneNode(true);
      _ref = $$('.abbr, .exif, b, marquee', bq);
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        node = _ref[_i];
        $.rm(node);
      }
      this.info.comment = this.nodesToText(bq);
      spoilers = $$('s', bq);
      return this.info.commentSpoilered = (function() {
        var _j, _len1;
        if (spoilers.length) {
          for (_j = 0, _len1 = spoilers.length; _j < _len1; _j++) {
            node = spoilers[_j];
            $.replace(node, $.tn('[spoiler]'));
          }
          return this.nodesToText(bq);
        } else {
          return this.info.comment;
        }
      }).call(this);
    };

    Post.prototype.nodesToText = function(bq) {
      var i, node, nodes, text;
      text = "";
      nodes = $.X('.//br|.//text()', bq);
      i = 0;
      while (node = nodes.snapshotItem(i++)) {
        text += node.data || '\n';
      }
      return text.trim().replace(/\s+$/gm, '');
    };

    Post.prototype.parseQuotes = function() {
      var quotelink, _i, _len, _ref;
      this.quotes = [];
      _ref = $$(':not(pre) > .quotelink', this.nodes.comment);
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        quotelink = _ref[_i];
        this.parseQuote(quotelink);
      }
    };

    Post.prototype.parseQuote = function(quotelink) {
      var fullID, match;
      if (!(match = quotelink.href.match(/boards\.4chan\.org\/([^\/]+)\/(?:res|thread)\/\d+(?:\/[^#]*)?#p(\d+)$/))) {
        return;
      }
      this.nodes.quotelinks.push(quotelink);
      if (this.isClone) {
        return;
      }
      fullID = "" + match[1] + "." + match[2];
      if (__indexOf.call(this.quotes, fullID) < 0) {
        return this.quotes.push(fullID);
      }
    };

    Post.prototype.parseFile = function(that) {
      var anchor, fileEl, fileText, nameNode, size, thumb, unit;
      if (!((fileEl = $('.file', this.nodes.post)) && (thumb = $('img[data-md5]', fileEl)))) {
        return;
      }
      anchor = thumb.parentNode;
      fileText = fileEl.firstElementChild;
      this.file = {
        text: fileText,
        thumb: thumb,
        URL: anchor.href,
        size: thumb.alt.match(/[\d.]+\s\w+/)[0],
        MD5: thumb.dataset.md5,
        isSpoiler: $.hasClass(anchor, 'imgspoiler')
      };
      size = +this.file.size.match(/[\d.]+/)[0];
      unit = ['B', 'KB', 'MB', 'GB'].indexOf(this.file.size.match(/\w+$/)[0]);
      while (unit-- > 0) {
        size *= 1024;
      }
      this.file.sizeInBytes = size;
      this.file.thumbURL = "" + location.protocol + "//t.4cdn.org/" + this.board + "/" + (this.file.URL.match(/(\d+)\./)[1]) + "s.jpg";
      this.file.isImage = /(jpg|png|gif)$/i.test(this.file.URL);
      this.file.isVideo = /webm$/i.test(this.file.URL);
      nameNode = $('a', fileText);
      if (this.file.isImage || this.file.isVideo) {
        this.file.dimensions = nameNode.nextSibling.textContent.match(/\d+x\d+/)[0];
      }
      return this.file.name = fileText.title || nameNode.title || nameNode.textContent;
    };

    Post.prototype.cleanup = function(root) {
      var node, _i, _j, _len, _len1, _ref, _ref1;
      _ref = $$('.mobile', root);
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        node = _ref[_i];
        $.rm(node);
      }
      _ref1 = $$('.desktop', root);
      for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
        node = _ref1[_j];
        $.rmClass(node, 'desktop');
      }
    };

    Post.prototype.kill = function(file) {
      var clone, quotelink, strong, _i, _j, _len, _len1, _ref, _ref1;
      if (file) {
        if (this.file.isDead) {
          return;
        }
        this.file.isDead = true;
        $.addClass(this.nodes.root, 'deleted-file');
      } else {
        if (this.isDead) {
          return;
        }
        this.isDead = true;
        $.addClass(this.nodes.root, 'deleted-post');
      }
      if (!(strong = $('strong.warning', this.nodes.info))) {
        strong = $.el('strong', {
          className: 'warning',
          textContent: this.isReply ? '[Deleted]' : '[Dead]'
        });
        $.after($('input', this.nodes.info), strong);
      }
      strong.textContent = file ? '[File deleted]' : '[Deleted]';
      if (this.isClone) {
        return;
      }
      _ref = this.clones;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        clone = _ref[_i];
        clone.kill(file);
      }
      if (file) {
        return;
      }
      _ref1 = Get.allQuotelinksLinkingTo(this);
      for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
        quotelink = _ref1[_j];
        if (!(!$.hasClass(quotelink, 'deadlink'))) {
          continue;
        }
        quotelink.textContent = quotelink.textContent + '\u00A0(Dead)';
        $.addClass(quotelink, 'deadlink');
      }
    };

    Post.prototype.resurrect = function() {
      var clone, quotelink, strong, _i, _j, _len, _len1, _ref, _ref1;
      delete this.isDead;
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
      _ref = this.clones;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        clone = _ref[_i];
        clone.resurrect();
      }
      _ref1 = Get.allQuotelinksLinkingTo(this);
      for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
        quotelink = _ref1[_j];
        if ($.hasClass(quotelink, 'deadlink')) {
          quotelink.textContent = quotelink.textContent.replace('\u00A0(Dead)', '');
          $.rmClass(quotelink, 'deadlink');
        }
      }
    };

    Post.prototype.collect = function() {
      this.kill();
      g.posts.rm(this.fullID);
      this.thread.posts.rm(this);
      return this.board.posts.rm(this);
    };

    Post.prototype.addClone = function(context, contractThumb) {
      return new Clone(this, context, contractThumb);
    };

    Post.prototype.rmClone = function(index) {
      var clone, _i, _len, _ref;
      this.clones.splice(index, 1);
      _ref = this.clones.slice(index);
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        clone = _ref[_i];
        clone.nodes.root.dataset.clone = index++;
      }
    };

    return Post;

  })();

  Clone = (function(_super) {
    __extends(Clone, _super);

    function Clone(origin, context, contractThumb) {
      var file, info, inline, inlined, key, nodes, post, root, val, _i, _j, _k, _len, _len1, _len2, _ref, _ref1, _ref2, _ref3;
      this.origin = origin;
      this.context = context;
      _ref = ['ID', 'fullID', 'board', 'thread', 'info', 'quotes', 'isReply'];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        key = _ref[_i];
        this[key] = origin[key];
      }
      nodes = origin.nodes;
      root = contractThumb ? this.cloneWithoutVideo(nodes.root) : nodes.root.cloneNode(true);
      post = $('.post', root);
      info = $('.postInfo', post);
      this.nodes = {
        root: root,
        post: post,
        info: info,
        nameBlock: $('.nameBlock', info),
        quote: $('.postNum > a:nth-of-type(2)', info),
        comment: $('.postMessage', post),
        quotelinks: [],
        backlinks: info.getElementsByClassName('backlink')
      };
      _ref1 = $$('.inline', post);
      for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
        inline = _ref1[_j];
        $.rm(inline);
      }
      _ref2 = $$('.inlined', post);
      for (_k = 0, _len2 = _ref2.length; _k < _len2; _k++) {
        inlined = _ref2[_k];
        $.rmClass(inlined, 'inlined');
      }
      root.hidden = false;
      $.rmClass(root, 'forwarded');
      $.rmClass(post, 'highlight');
      if (nodes.subject) {
        this.nodes.subject = $('.subject', info);
      }
      if (nodes.name) {
        this.nodes.name = $('.name', info);
      }
      if (nodes.email) {
        this.nodes.email = $('.useremail', info);
      }
      if (nodes.tripcode) {
        this.nodes.tripcode = $('.postertrip', info);
      }
      if (nodes.uniqueID) {
        this.nodes.uniqueID = $('.posteruid', info);
      }
      if (nodes.capcode) {
        this.nodes.capcode = $('.capcode.hand', info);
      }
      if (nodes.flag) {
        this.nodes.flag = $('.flag, .countryFlag', info);
      }
      if (nodes.date) {
        this.nodes.date = $('.dateTime', info);
      }
      this.parseQuotes();
      if (origin.file) {
        this.file = {};
        _ref3 = origin.file;
        for (key in _ref3) {
          val = _ref3[key];
          this.file[key] = val;
        }
        file = $('.file', post);
        this.file.text = file.firstElementChild;
        this.file.thumb = $('.fileThumb > [data-md5]', file);
        this.file.fullImage = $('.full-image', file);
        this.file.videoControls = $('.video-controls', this.file.text);
        if (contractThumb) {
          ImageExpand.contract(this);
        }
      }
      if (origin.isDead) {
        this.isDead = true;
      }
      this.isClone = true;
      root.dataset.clone = origin.clones.push(this) - 1;
    }

    Clone.prototype.cloneWithoutVideo = function(node) {
      var child, clone, _i, _len, _ref;
      if (node.tagName === 'VIDEO' && !node.dataset.md5) {
        return [];
      } else if (node.nodeType === Node.ELEMENT_NODE && $('video', node)) {
        clone = node.cloneNode(false);
        _ref = node.childNodes;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          child = _ref[_i];
          $.add(clone, this.cloneWithoutVideo(child));
        }
        return clone;
      } else {
        return node.cloneNode(true);
      }
    };

    return Clone;

  })(Post);

  DataBoard = (function() {
    DataBoard.keys = ['hiddenThreads', 'hiddenPosts', 'lastReadPosts', 'yourPosts', 'watchedThreads'];

    function DataBoard(key, sync, dontClean) {
      var init;
      this.key = key;
      this.onSync = __bind(this.onSync, this);
      this.data = Conf[key];
      $.sync(key, this.onSync);
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

    DataBoard.prototype.save = function() {
      return $.set(this.key, this.data);
    };

    DataBoard.prototype["delete"] = function(_arg) {
      var boardID, postID, threadID, _ref;
      boardID = _arg.boardID, threadID = _arg.threadID, postID = _arg.postID;
      $.forceSync(this.key);
      if (postID) {
        if (!((_ref = this.data.boards[boardID]) != null ? _ref[threadID] : void 0)) {
          return;
        }
        delete this.data.boards[boardID][threadID][postID];
        this.deleteIfEmpty({
          boardID: boardID,
          threadID: threadID
        });
      } else if (threadID) {
        if (!this.data.boards[boardID]) {
          return;
        }
        delete this.data.boards[boardID][threadID];
        this.deleteIfEmpty({
          boardID: boardID
        });
      } else {
        delete this.data.boards[boardID];
      }
      return this.save();
    };

    DataBoard.prototype.deleteIfEmpty = function(_arg) {
      var boardID, threadID;
      boardID = _arg.boardID, threadID = _arg.threadID;
      $.forceSync(this.key);
      if (threadID) {
        if (!Object.keys(this.data.boards[boardID][threadID]).length) {
          delete this.data.boards[boardID][threadID];
          return this.deleteIfEmpty({
            boardID: boardID
          });
        }
      } else if (!Object.keys(this.data.boards[boardID]).length) {
        return delete this.data.boards[boardID];
      }
    };

    DataBoard.prototype.set = function(_arg) {
      var boardID, postID, threadID, val, _base, _base1, _base2;
      boardID = _arg.boardID, threadID = _arg.threadID, postID = _arg.postID, val = _arg.val;
      $.forceSync(this.key);
      if (postID !== void 0) {
        ((_base = ((_base1 = this.data.boards)[boardID] || (_base1[boardID] = {})))[threadID] || (_base[threadID] = {}))[postID] = val;
      } else if (threadID !== void 0) {
        ((_base2 = this.data.boards)[boardID] || (_base2[boardID] = {}))[threadID] = val;
      } else {
        this.data.boards[boardID] = val;
      }
      return this.save();
    };

    DataBoard.prototype.get = function(_arg) {
      var ID, board, boardID, defaultValue, postID, thread, threadID, val, _i, _len;
      boardID = _arg.boardID, threadID = _arg.threadID, postID = _arg.postID, defaultValue = _arg.defaultValue;
      if (board = this.data.boards[boardID]) {
        if (!threadID) {
          if (postID) {
            for (thread = _i = 0, _len = board.length; _i < _len; thread = ++_i) {
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
          val = postID ? thread[postID] : thread;
        }
      }
      return val || defaultValue;
    };

    DataBoard.prototype.forceSync = function() {
      return $.forceSync(this.key);
    };

    DataBoard.prototype.clean = function() {
      var boardID, now, threadID, val, _ref;
      $.forceSync(this.key);
      _ref = this.data.boards;
      for (boardID in _ref) {
        val = _ref[boardID];
        this.deleteIfEmpty({
          boardID: boardID
        });
      }
      now = Date.now();
      if ((this.data.lastChecked || 0) < now - 2 * $.HOUR) {
        this.data.lastChecked = now;
        for (boardID in this.data.boards) {
          for (threadID in this.data.boards[boardID]) {
            this.ajaxClean(boardID, threadID);
          }
        }
      }
      return this.save();
    };

    DataBoard.prototype.ajaxClean = function(boardID, threadID) {
      return $.ajax("//a.4cdn.org/" + boardID + "/thread/" + threadID + ".json", {
        onloadend: (function(_this) {
          return function(e) {
            if (e.target.status === 404) {
              return _this["delete"]({
                boardID: boardID,
                threadID: threadID
              });
            }
          };
        })(this)
      }, {
        type: 'head'
      });
    };

    DataBoard.prototype.onSync = function(data) {
      this.data = data || {
        boards: {}
      };
      return typeof this.sync === "function" ? this.sync() : void 0;
    };

    return DataBoard;

  })();

  Notice = (function() {
    function Notice(type, content, timeout, onclose) {
      this.timeout = timeout;
      this.onclose = onclose;
      this.close = __bind(this.close, this);
      this.add = __bind(this.add, this);
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
      $.off(d, 'visibilitychange', this.add);
      $.rm(this.el);
      return typeof this.onclose === "function" ? this.onclose() : void 0;
    };

    return Notice;

  })();

  RandomAccessList = (function() {
    function RandomAccessList(items) {
      var item, _i, _len;
      this.length = 0;
      if (items) {
        for (_i = 0, _len = items.length; _i < _len; _i++) {
          item = items[_i];
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
      var key, _i, _len, _ref;
      _ref = __slice.call(this.keys);
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        key = _ref[_i];
        fn(this[key]);
      }
    };

    return SimpleDict;

  })();

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

  Connection = (function() {
    function Connection(target, origin, cb) {
      this.target = target;
      this.origin = origin;
      this.cb = cb;
      $.on(window, 'message', this.onMessage.bind(this));
    }

    Connection.prototype.send = function(data) {
      return this.target.postMessage("" + g.NAMESPACE + (JSON.stringify(data)), this.origin);
    };

    Connection.prototype.onMessage = function(e) {
      var data, type, value, _base;
      if (!(e.source === this.target && e.origin === this.origin && typeof e.data === 'string' && e.data.slice(0, g.NAMESPACE.length) === g.NAMESPACE)) {
        return;
      }
      data = JSON.parse(e.data.slice(g.NAMESPACE.length));
      for (type in data) {
        value = data[type];
        if (typeof (_base = this.cb)[type] === "function") {
          _base[type](value);
        }
      }
    };

    return Connection;

  })();

  Polyfill = {
    init: function() {
      this.notificationPermission();
      this.toBlob();
      return this.visibility();
    },
    notificationPermission: function() {
      if (!window.Notification || 'permission' in Notification || !window.webkitNotifications) {
        return;
      }
      return Object.defineProperty(Notification, 'permission', {
        get: function() {
          switch (webkitNotifications.checkPermission()) {
            case 0:
              return 'granted';
            case 1:
              return 'default';
            case 2:
              return 'denied';
          }
        }
      });
    },
    toBlob: function() {
      var _base;
      return (_base = HTMLCanvasElement.prototype).toBlob || (_base.toBlob = function(cb) {
        var data, i, l, ui8a, _i;
        data = atob(this.toDataURL().slice(22));
        l = data.length;
        ui8a = new Uint8Array(l);
        for (i = _i = 0; _i < l; i = _i += 1) {
          ui8a[i] = data.charCodeAt(i);
        }
        return cb(new Blob([ui8a], {
          type: 'image/png'
        }));
      });
    },
    visibility: function() {
      if ('visibilityState' in d) {
        return;
      }
      Object.defineProperties(HTMLDocument.prototype, {
        visibilityState: {
          get: function() {
            return this.webkitVisibilityState;
          }
        },
        hidden: {
          get: function() {
            return this.webkitHidden;
          }
        }
      });
      return $.on(d, 'webkitvisibilitychange', function() {
        return $.event('visibilitychange');
      });
    }
  };

  Header = {
    init: function() {
      var barFixedToggler, barPositionToggler, customNavToggler, editCustomNav, footerToggler, headerToggler, linkJustifyToggler, menuButton, scrollHeaderToggler, shortcutToggler;
      this.menu = new UI.Menu('header');
      menuButton = $.el('span', {
        className: 'menu-button'
      });
      $.extend(menuButton, {
        innerHTML: "<i></i>"
      });
      barFixedToggler = UI.checkbox('Fixed Header', ' Fixed Header');
      headerToggler = UI.checkbox('Header auto-hide', ' Auto-hide header');
      scrollHeaderToggler = UI.checkbox('Header auto-hide on scroll', ' Auto-hide header on scroll');
      barPositionToggler = UI.checkbox('Bottom Header', ' Bottom header');
      linkJustifyToggler = UI.checkbox('Centered links', ' Centered links');
      customNavToggler = UI.checkbox('Custom Board Navigation', ' Custom board navigation');
      footerToggler = UI.checkbox('Bottom Board List', ' Hide bottom board list');
      shortcutToggler = UI.checkbox('Shortcut Icons', ' Shortcut Icons');
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
      $.on(this.headerToggler, 'change', this.toggleBarVisibility);
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
      this.addShortcut(menuButton);
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
      $.on(window, 'load hashchange', Header.hashScroll);
      $.on(d, 'CreateNotification', this.createNotification);
      $.asap((function() {
        return d.body;
      }), (function(_this) {
        return function() {
          if (!Main.isThisPageLegit()) {
            return;
          }
          $.asap((function() {
            return $.id('boardNavMobile') || d.readyState !== 'loading';
          }), function() {
            var a, footer;
            footer = $.id('boardNavDesktop').cloneNode(true);
            footer.id = 'boardNavDesktopFoot';
            $('#navtopright', footer).id = 'navbotright';
            $('#settingsWindowLink', footer).id = 'settingsWindowLinkBot';
            Header.bottomBoardList = $('.boardList', footer);
            if (a = $("a[href*='/" + g.BOARD + "/']", footer)) {
              a.className = 'current';
            }
            Main.ready(function() {
              var oldFooter;
              if (oldFooter = $.id('boardNavDesktopFoot')) {
                return $.replace($('.boardList', oldFooter), Header.bottomBoardList);
              } else {
                $.before($.id('absbot'), footer);
                return $.globalEval('window.cloneTopNav = function() {};');
              }
            });
            return Header.setBoardList();
          });
          $.prepend(d.body, _this.bar);
          $.add(d.body, Header.hover);
          _this.setBarPosition(Conf['Bottom Header']);
          return _this;
        };
      })(this));
      Main.ready((function(_this) {
        return function() {
          var cs;
          if (g.VIEW === 'catalog' || !Conf['Disable Native Extension']) {
            cs = $.el('a', {
              href: 'javascript:;'
            });
            if (g.VIEW === 'catalog') {
              cs.title = cs.textContent = 'Catalog Settings';
              cs.className = 'fa fa-book';
            } else {
              cs.title = cs.textContent = '4chan Settings';
              cs.className = 'fa fa-leaf';
            }
            $.on(cs, 'click', function() {
              return $.id('settingsWindowLink').click();
            });
            return _this.addShortcut(cs);
          }
        };
      })(this));
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
      var a, boardList, btn, chr, node, nodes, spacer, span, _i, _j, _len, _len1, _ref, _ref1;
      Header.boardList = boardList = $.el('span', {
        id: 'board-list'
      });
      $.extend(boardList, {
        innerHTML: "<span id=\"custom-board-list\"></span><span id=\"full-board-list\" hidden><span class=\"hide-board-list-container brackets-wrap\"><a href=\"javascript:;\" class=\"hide-board-list-button\">&nbsp;-&nbsp;</a></span> <span class=\"boardList\"></span></span>"
      });
      btn = $('.hide-board-list-button', boardList);
      $.on(btn, 'click', Header.toggleBoardList);
      nodes = [];
      spacer = function() {
        return $.el('span', {
          className: 'spacer'
        });
      };
      _ref = $('#boardNavDesktop > .boardList').childNodes;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        node = _ref[_i];
        switch (node.nodeName) {
          case '#text':
            _ref1 = node.nodeValue;
            for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
              chr = _ref1[_j];
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
      $.add($('.boardList', boardList), nodes);
      $.add(Header.bar, [Header.boardList, Header.shortcuts, Header.noticesRoot, Header.toggle]);
      Header.setCustomNav(Conf['Custom Board Navigation']);
      Header.generateBoardList(Conf['boardnav']);
      $.sync('Custom Board Navigation', Header.setCustomNav);
      return $.sync('boardnav', Header.generateBoardList);
    },
    generateBoardList: function(boardnav) {
      var as, list, nodes;
      list = $('#custom-board-list', Header.boardList);
      $.rmAll(list);
      if (!boardnav) {
        return;
      }
      boardnav = boardnav.replace(/(\r\n|\n|\r)/g, ' ');
      as = $$('#full-board-list a[title]', Header.boardList);
      nodes = boardnav.match(/[\w@]+(-(all|title|replace|full|index|catalog|archive|expired|text:"[^"]+"(,"[^"]+")?))*|[^\w@]+/g).map(function(t) {
        var a, aOrig, boardID, href, m, text, url, _i, _len;
        if (/^[^\w@]/.test(t)) {
          return $.tn(t);
        }
        text = url = null;
        t = t.replace(/-text:"([^"]+)"(?:,"([^"]+)")?/g, function(m0, m1, m2) {
          text = m1;
          url = m2;
          return '';
        });
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
        boardID = /^current/.test(t) ? g.BOARD.ID : t.match(/^[^-]+/)[0];
        for (_i = 0, _len = as.length; _i < _len; _i++) {
          aOrig = as[_i];
          if (aOrig.textContent === boardID) {
            a = aOrig.cloneNode(true);
          }
        }
        if (!a) {
          if (/^current/.test(t)) {
            a = $.el('a', {
              href: "/" + boardID + "/",
              textContent: boardID
            });
          } else {
            return $.tn(t);
          }
        }
        a.textContent = /-title/.test(t) || /-replace/.test(t) && $.hasClass(a, 'current') ? a.title || a.textContent : /-full/.test(t) ? ("/" + boardID + "/") + (a.title ? " - " + a.title : '') : text ? text : a.textContent;
        if (m = t.match(/-(index|catalog)/)) {
          a.dataset.only = m[1];
          a.href = CatalogLinks[m[1]](boardID);
          if (m[1] === 'catalog') {
            $.addClass(a, 'catalog');
          }
        }
        if (/-archive/.test(t)) {
          if (href = Redirect.to('board', {
            boardID: boardID
          })) {
            a.href = href;
          } else {
            return $.tn(a.textContent);
          }
        }
        if (/-expired/.test(t)) {
          if (boardID !== 'b' && boardID !== 'f') {
            a.href = "/" + boardID + "/archive";
          } else {
            return $.tn(a.textContent);
          }
        }
        if (boardID === '@') {
          $.addClass(a, 'navSmall');
        }
        return a;
      });
      $.add(list, nodes);
      return $.ready(CatalogLinks.initBoardList);
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
      this.checked = hide;
      $.set('Header auto-hide', Conf['Header auto-hide'] = hide);
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
      if (!Conf['Header auto-hide']) {
        return $.rmClass(Header.bar, 'autohide');
      }
    },
    toggleHideBarOnScroll: function(e) {
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
      var btn, cust, full, _ref;
      Header.customNavToggler.checked = show;
      cust = $('#custom-board-list', Header.bar);
      full = $('#full-board-list', Header.bar);
      btn = $('.hide-board-list-container', full);
      return _ref = show ? [false, true, false] : [true, false, true], cust.hidden = _ref[0], full.hidden = _ref[1], btn.hidden = _ref[2], _ref;
    },
    toggleCustomNav: function() {
      $.cb.checked.call(this);
      return Header.setCustomNav(this.checked);
    },
    editCustomNav: function() {
      var settings;
      Settings.open('Advanced');
      settings = $.id('fourchanx-settings');
      return $('textarea[name=boardnav]', settings).focus();
    },
    hashScroll: function() {
      var hash, post;
      hash = this.location.hash.slice(1);
      if (!(/^p\d+$/.test(hash) && (post = $.id(hash)))) {
        return;
      }
      if ((Get.postFromRoot(post)).isHidden) {
        return;
      }
      return Header.scrollTo(post);
    },
    scrollTo: function(root, down, needed) {
      var height, x;
      if (down) {
        x = Header.getBottomOf(root);
        if (Conf['Header auto-hide on scroll'] && Conf['Bottom header']) {
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
        if (Conf['Header auto-hide on scroll'] && !Conf['Bottom header']) {
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
      if (Conf['Bottom Header']) {
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
    addShortcut: function(el) {
      var shortcut;
      shortcut = $.el('span', {
        className: 'shortcut brackets-wrap'
      });
      $.add(shortcut, el);
      return $.prepend(Header.shortcuts, shortcut);
    },
    rmShortcut: function(el) {
      return $.rm(el.parentElement);
    },
    menuToggle: function(e) {
      return Header.menu.toggle(e, this, g);
    },
    createNotification: function(e) {
      var content, lifetime, notice, type, _ref;
      _ref = e.detail, type = _ref.type, content = _ref.content, lifetime = _ref.lifetime;
      return notice = new Notice(type, content, lifetime);
    },
    areNotificationsEnabled: false,
    enableDesktopNotifications: function() {
      var authorize, disable, el, notice, _ref;
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
        innerHTML: E(g.NAME) + " needs your permission to show desktop notifications. [<a href=\"" + E(g.FAQ) + "#why-is-4chan-x-asking-for-permission-to-show-desktop-notifications\" target=\"_blank\">FAQ</a>]<br><button>Authorize</button> or <button>Disable</button>"
      });
      _ref = $$('button', el), authorize = _ref[0], disable = _ref[1];
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

  Index = {
    showHiddenThreads: false,
    init: function() {
      var anchorEntry, input, label, name, pinEntry, refNavEntry, repliesEntry, select, _i, _j, _len, _len1, _ref, _ref1, _ref2, _ref3, _ref4, _ref5;
      if (g.BOARD.ID === 'f' || !Conf['JSON Navigation'] || g.VIEW !== 'index') {
        return;
      }
      this.board = "" + g.BOARD;
      CatalogThread.callbacks.push({
        name: 'Catalog Features',
        cb: this.catalogNode
      });
      this.search = ((_ref = history.state) != null ? _ref.search : void 0) || '';
      if ((_ref1 = history.state) != null ? _ref1.mode : void 0) {
        Conf['Index Mode'] = (_ref2 = history.state) != null ? _ref2.mode : void 0;
      }
      this.currentPage = this.getCurrentPage();
      this.pushState({
        command: (_ref3 = location.href.match(/#(.*)/)) != null ? _ref3[1] : void 0,
        replace: true
      });
      this.button = $.el('a', {
        className: 'index-refresh-shortcut fa fa-refresh',
        title: 'Refresh',
        href: 'javascript:;',
        textContent: 'Refresh Index'
      });
      $.on(this.button, 'click', function() {
        return Index.update();
      });
      Header.addShortcut(this.button, 1);
      repliesEntry = {
        el: UI.checkbox('Show Replies', ' Show replies')
      };
      pinEntry = {
        el: UI.checkbox('Pin Watched Threads', ' Pin watched threads')
      };
      anchorEntry = {
        el: UI.checkbox('Anchor Hidden Threads', ' Anchor hidden threads')
      };
      refNavEntry = {
        el: UI.checkbox('Refreshed Navigation', ' Refreshed navigation')
      };
      pinEntry.el.title = 'Move watched threads to the start of the index.';
      anchorEntry.el.title = 'Move hidden threads to the end of the index.';
      refNavEntry.el.title = 'Refresh index when navigating through pages.';
      _ref4 = [repliesEntry, pinEntry, anchorEntry, refNavEntry];
      for (_i = 0, _len = _ref4.length; _i < _len; _i++) {
        label = _ref4[_i];
        input = label.el.firstChild;
        name = input.name;
        $.on(input, 'change', $.cb.checked);
        switch (name) {
          case 'Show Replies':
            $.on(input, 'change', this.cb.replies);
            break;
          case 'Pin Watched Threads':
          case 'Anchor Hidden Threads':
            $.on(input, 'change', this.cb.sort);
        }
      }
      Header.menu.addEntry({
        el: $.el('span', {
          textContent: 'Index Navigation'
        }),
        order: 98,
        subEntries: [repliesEntry, pinEntry, anchorEntry, refNavEntry]
      });
      $.addClass(doc, 'index-loading', "" + (Conf['Index Mode'].replace(/\ /g, '-')) + "-mode");
      this.root = $.el('div', {
        className: 'board'
      });
      this.cb.size();
      this.pagelist = $.el('div', {
        className: 'pagelist'
      });
      $.extend(this.pagelist, {
        innerHTML: "<div class=\"prev\"><a><button disabled>Previous</button></a></div><div class=\"pages\"></div><div class=\"next\"><a><button disabled>Next</button></a></div><div class=\"pages cataloglink\"><a href=\"./catalog\">Catalog</a></div>"
      });
      $('.cataloglink a', this.pagelist).href = CatalogLinks.catalog();
      this.navLinks = $.el('div', {
        className: 'navLinks'
      });
      $.extend(this.navLinks, {
        innerHTML: "<span class=\"brackets-wrap returnlink\"><a href=\"./\">Return</a></span> <span class=\"brackets-wrap cataloglink\"><a href=\"./catalog\">Catalog</a></span> <span class=\"brackets-wrap archlistlink\"><a href=\"./archive\">Archive</a></span> <span class=\"brackets-wrap bottomlink\"><a href=\"#bottom\">Bottom</a></span> <span class=\"brackets-wrap\" id=\"index-last-refresh\"><time title=\"Last index refresh\">...</time></span> <input type=\"search\" id=\"index-search\" class=\"field\" placeholder=\"Search\"><a id=\"index-search-clear\" href=\"javascript:;\" title=\"Clear search\">×</a><span id=\"hidden-label\" hidden> &mdash; <span id=\"hidden-count\"></span> <span id=\"hidden-toggle\">[<a href=\"javascript:;\">Show</a>]</span></span><select id=\"index-mode\" name=\"Index Mode\"><option disabled>Index Mode</option><option value=\"paged\">Paged</option><option value=\"infinite\">Infinite scrolling</option><option value=\"all pages\">All threads</option><option value=\"catalog\">Catalog</option></select><select id=\"index-sort\" name=\"Index Sort\"><option disabled>Index Sort</option><option value=\"bump\">Bump order</option><option value=\"lastreply\">Last reply</option><option value=\"birth\">Creation date</option><option value=\"replycount\">Reply count</option><option value=\"filecount\">File count</option></select><select id=\"index-size\" name=\"Index Size\"><option disabled>Image Size</option><option value=\"small\">Small</option><option value=\"large\">Large</option></select>"
      });
      $('.returnlink a', this.navLinks).href = CatalogLinks.index();
      $('.cataloglink a', this.navLinks).href = CatalogLinks.catalog();
      if (g.BOARD.ID === 'b') {
        $('.archlistlink', this.navLinks).hidden = true;
      }
      this.searchInput = $('#index-search', this.navLinks);
      this.setupSearch();
      this.hideLabel = $('#hidden-label', this.navLinks);
      this.selectMode = $('#index-mode', this.navLinks);
      this.selectSort = $('#index-sort', this.navLinks);
      this.selectSize = $('#index-size', this.navLinks);
      $.on(window, 'popstate', this.cb.popstate);
      $.on(d, 'scroll', Index.scroll);
      $.on(this.pagelist, 'click', this.cb.pageNav);
      $.on(this.searchInput, 'input', this.onSearchInput);
      $.on($('#index-search-clear', this.navLinks), 'click', this.clearSearch);
      $.on($('#hidden-toggle a', this.navLinks), 'click', this.cb.toggleHiddenThreads);
      if (!Conf['Use 4chan X Catalog']) {
        $.on($('.returnlink a', this.navLinks), 'click', this.cb.frontPage);
      }
      $.on(this.selectMode, 'change', this.cb.mode);
      _ref5 = [this.selectMode, this.selectSort, this.selectSize];
      for (_j = 0, _len1 = _ref5.length; _j < _len1; _j++) {
        select = _ref5[_j];
        select.value = Conf[select.name];
        $.on(select, 'change', $.cb.value);
      }
      $.on(this.selectSort, 'change', this.cb.sort);
      $.on(this.selectSize, 'change', this.cb.size);
      this.update();
      $.asap((function() {
        return $('title + *', doc) || d.readyState !== 'loading';
      }), function() {
        return d.title = d.title.replace(/\ -\ Page\ \d+/, '');
      });
      $.asap((function() {
        return $('.board > .thread > .postContainer', doc) || d.readyState !== 'loading';
      }), function() {
        var board, el, threadRoot, topNavPos, _k, _l, _len2, _len3, _ref6, _ref7, _ref8;
        if (!Main.isThisPageLegit()) {
          return;
        }
        Index.hat = $('.board > .thread > img:first-child');
        if (Index.hat && Index.nodes) {
          _ref6 = Index.nodes;
          for (_k = 0, _len2 = _ref6.length; _k < _len2; _k++) {
            threadRoot = _ref6[_k];
            $.prepend(threadRoot, Index.hat.cloneNode(false));
          }
        }
        board = $('.board');
        $.replace(board, Index.root);
        $.event('PostsInserted');
        d.implementation.createDocument(null, null, null).appendChild(board);
        _ref7 = $$('.navLinks');
        for (_l = 0, _len3 = _ref7.length; _l < _len3; _l++) {
          el = _ref7[_l];
          $.rm(el);
        }
        if ((_ref8 = $.id('search-box')) != null) {
          _ref8.parentNode.remove();
        }
        topNavPos = $.id('delform').previousElementSibling;
        $.before(topNavPos, $.el('hr'));
        return $.before(topNavPos, Index.navLinks);
      });
      return $.asap((function() {
        return $('.pagelist', doc) || d.readyState !== 'loading';
      }), function() {
        var pagelist;
        if (!Main.isThisPageLegit()) {
          return;
        }
        if (pagelist = $('.pagelist')) {
          $.replace(pagelist, Index.pagelist);
        } else {
          $.after($.id('delform'), Index.pagelist);
        }
        return $.rmClass(doc, 'index-loading');
      });
    },
    scroll: function() {
      var nodes, pageNum;
      if (Index.req || Conf['Index Mode'] !== 'infinite' || (window.scrollY <= doc.scrollHeight - (300 + window.innerHeight))) {
        return;
      }
      if (Index.pageNum == null) {
        Index.pageNum = Index.getCurrentPage();
      }
      pageNum = ++Index.pageNum;
      if (pageNum > Index.pagesNum) {
        return Index.endNotice();
      }
      nodes = Index.buildSinglePage(pageNum);
      if (Conf['Show Replies']) {
        Index.buildReplies(nodes);
      }
      return Index.buildStructure(nodes);
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
        if (g.VIEW !== 'index' || !Conf['JSON Navigation'] || !Conf['Menu'] || !Conf['Thread Hiding Link'] || g.BOARD.ID === 'f') {
          return;
        }
        return Menu.menu.addEntry({
          el: $.el('a', {
            href: 'javascript:;'
          }),
          order: 20,
          open: function(_arg) {
            var thread;
            thread = _arg.thread;
            if (Conf['Index Mode'] !== 'catalog') {
              return false;
            }
            this.el.textContent = thread.isHidden ? 'Unhide thread' : 'Hide thread';
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
    catalogNode: function() {
      return $.on(this.nodes.thumb.parentNode, 'click', Index.onClick);
    },
    onClick: function(e) {
      var thread;
      if (e.button !== 0) {
        return;
      }
      thread = g.threads[this.parentNode.dataset.fullID];
      if (e.shiftKey) {
        Index.toggleHide(thread);
      } else {
        return;
      }
      return e.preventDefault();
    },
    toggleHide: function(thread) {
      $.rm(thread.catalogView.nodes.root);
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
      var i, type, types, _i, _len;
      types = __slice.call(Index.selectSort.options).filter(function(option) {
        return !option.disabled;
      });
      for (i = _i = 0, _len = types.length; _i < _len; i = ++_i) {
        type = types[i];
        if (type.selected) {
          break;
        }
      }
      types[(i + 1) % types.length].selected = true;
      return $.event('change', null, Index.selectSort);
    },
    cb: {
      toggleHiddenThreads: function() {
        $('#hidden-toggle a', Index.navLinks).textContent = (Index.showHiddenThreads = !Index.showHiddenThreads) ? 'Hide' : 'Show';
        Index.sort();
        return Index.buildIndex();
      },
      mode: function() {
        var mode;
        mode = this.value;
        if (mode !== 'catalog') {
          Conf['Previous Index Mode'] = mode;
          $.set('Previous Index Mode', mode);
        }
        return Index.pageLoad(Index.pushState({
          mode: mode
        }));
      },
      sort: function() {
        Index.sort();
        return Index.buildIndex();
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
        Index.buildThreads();
        Index.sort();
        return Index.buildIndex();
      },
      popstate: function(e) {
        var mode, page, search, state, _ref, _ref1;
        if (e != null ? e.state : void 0) {
          _ref = e.state, search = _ref.search, mode = _ref.mode;
          page = Index.getCurrentPage();
          state = {};
          if (Index.search !== search) {
            state.search = Index.search = search;
          }
          if (Conf['Index Mode'] !== mode) {
            state.mode = Conf['Index Mode'] = mode;
          }
          if (Index.currentPage !== page) {
            state.page = Index.currentPage = page;
          }
          if ((state.search != null) || (state.mode != null) || (state.page != null)) {
            return Index.pageLoad(state);
          }
        } else {
          state = Index.pushState({
            command: (_ref1 = location.href.match(/#(.*)/)) != null ? _ref1[1] : void 0,
            replace: true,
            scroll: true
          });
          if (state.command) {
            return Index[Conf['Refreshed Navigation'] ? 'update' : 'pageLoad'](state);
          }
        }
      },
      pageNav: function(e) {
        var a;
        if (e.shiftKey || e.altKey || e.ctrlKey || e.metaKey || e.button !== 0) {
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
        return Index.userPageNav(+a.pathname.split('/')[2] || 1);
      },
      frontPage: function(e) {
        if (e.shiftKey || e.altKey || e.ctrlKey || e.metaKey || e.button !== 0) {
          return;
        }
        e.preventDefault();
        return Index.userPageNav(1);
      }
    },
    scrollToIndex: function() {
      return Header.scrollToIfNeeded(Index.navLinks);
    },
    getCurrentPage: function() {
      var _ref;
      if ((_ref = Conf['Index Mode']) === 'all pages' || _ref === 'catalog') {
        return 1;
      } else {
        return +window.location.pathname.split('/')[2] || 1;
      }
    },
    userPageNav: function(page, noRefresh) {
      var state;
      state = Index.pushState({
        page: page,
        scroll: true
      });
      if (Conf['Refreshed Navigation'] && !noRefresh) {
        return Index.update(state);
      } else {
        if (state.page) {
          return Index.pageLoad(state);
        }
      }
    },
    pushState: function(state) {
      var command, hash, mode, page, pageBeforeSearch, pathname, search, _ref;
      pathname = location.pathname, hash = location.hash;
      pageBeforeSearch = (_ref = history.state) != null ? _ref.oldpage : void 0;
      if (state.command != null) {
        command = state.command;
        if (command === 'paged' || command === 'infinite' || command === 'all-pages' || command === 'catalog') {
          state.mode = command.replace(/-/g, ' ');
        } else if (command === 'index') {
          state.mode = Conf['Previous Index Mode'];
          state.page = 1;
        } else if (/^s=/.test(command)) {
          state.search = decodeURIComponent(command.slice(2)).replace(/\+/g, ' ').trim();
          hash = '';
        } else {
          delete state.command;
        }
      }
      if (state.search != null) {
        search = state.search;
        state.page = search ? 1 : pageBeforeSearch || 1;
        if (!search) {
          pageBeforeSearch = void 0;
        } else if (!Index.search) {
          pageBeforeSearch = Index.currentPage;
        }
        Index.search = search;
      }
      if (state.mode != null) {
        mode = state.mode;
        if (mode === Conf['Index Mode']) {
          delete state.mode;
        }
        Conf['Index Mode'] = mode;
        if (mode === 'all pages' || mode === 'catalog') {
          state.page = 1;
        }
        hash = '';
      }
      if (state.page != null) {
        page = state.page;
        if (page === Index.currentPage) {
          delete state.page;
        }
        Index.currentPage = page;
        pathname = page === 1 ? "/" + g.BOARD + "/" : "/" + g.BOARD + "/" + page;
        hash = '';
      }
      history[state.replace ? 'replaceState' : 'pushState']({
        mode: Conf['Index Mode'],
        search: Index.search,
        oldpage: pageBeforeSearch
      }, '', pathname + hash);
      return state;
    },
    pageLoad: function(_arg) {
      var mode, scroll, search, sort;
      sort = _arg.sort, search = _arg.search, mode = _arg.mode, scroll = _arg.scroll;
      if (sort || (search != null)) {
        Index.sort();
        Index.buildPagelist();
      }
      if (search != null) {
        Index.setupSearch();
      }
      if (mode != null) {
        Index.applyMode();
      }
      Index.buildIndex();
      Index.setPage();
      if (scroll) {
        return Index.scrollToIndex();
      }
    },
    applyMode: function() {
      var mode, _i, _len, _ref;
      _ref = ['paged', 'infinite', 'all pages', 'catalog'];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        mode = _ref[_i];
        $[mode === Conf['Index Mode'] ? 'addClass' : 'rmClass'](doc, "" + (mode.replace(/\ /g, '-')) + "-mode");
      }
      Index.selectMode.value = Conf['Index Mode'];
      Index.cb.size();
      Index.showHiddenThreads = false;
      return $('#hidden-toggle a', Index.navLinks).textContent = 'Show';
    },
    getPagesNum: function() {
      if (Index.search) {
        return Math.ceil(Index.sortedNodes.length / Index.threadsNumPerPage);
      } else {
        return Index.pagesNum;
      }
    },
    getMaxPageNum: function() {
      return Math.max(1, Index.getPagesNum());
    },
    buildPagelist: function() {
      var a, i, maxPageNum, nodes, pagesRoot, _i;
      pagesRoot = $('.pages', Index.pagelist);
      maxPageNum = Index.getMaxPageNum();
      if (pagesRoot.childElementCount !== maxPageNum) {
        nodes = [];
        for (i = _i = 1; _i <= maxPageNum; i = _i += 1) {
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
      pageNum = Index.getCurrentPage();
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
      var hiddenCount, thread, threadID, _ref, _ref1;
      hiddenCount = 0;
      _ref = g.BOARD.threads;
      for (threadID in _ref) {
        thread = _ref[threadID];
        if (thread.isHidden) {
          if (_ref1 = thread.ID, __indexOf.call(Index.liveThreadIDs, _ref1) >= 0) {
            hiddenCount++;
          }
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
      return $('#hidden-count', Index.navLinks).textContent = hiddenCount === 1 ? '1 hidden thread' : "" + hiddenCount + " hidden threads";
    },
    update: function(state) {
      var now, _ref, _ref1;
      if (!navigator.onLine) {
        return;
      }
      delete Index.pageNum;
      if ((_ref = Index.req) != null) {
        _ref.abort();
      }
      if ((_ref1 = Index.notice) != null) {
        _ref1.close();
      }
      now = Date.now();
      $.ready(function() {
        return Index.nTimeout = setTimeout((function() {
          if (Index.req && !Index.notice) {
            return Index.notice = new Notice('info', 'Refreshing index...', 2);
          }
        }), 3 * $.SECOND - (Date.now() - now));
      });
      Index.req = $.ajax("//a.4cdn.org/" + g.BOARD + "/catalog.json", {
        onloadend: function(e) {
          return Index.load(e, state);
        }
      }, {
        whenModified: true
      });
      return $.addClass(Index.button, 'fa-spin');
    },
    load: function(e, state) {
      var err, nTimeout, notice, req, timeEl, _ref;
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
        notice.close();
        return;
      }
      if ((_ref = req.status) !== 200 && _ref !== 304) {
        err = "Index refresh failed. Error " + req.statusText + " (" + req.status + ")";
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
          Index.parse(req.response, state);
        } else if (req.status === 304 && (state != null)) {
          Index.pageLoad(state);
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
      timeEl = $('#index-last-refresh time', Index.navLinks);
      timeEl.dataset.utc = Date.parse(req.getResponseHeader('Last-Modified'));
      RelativeDates.update(timeEl);
      return Index.scrollToIndex();
    },
    parse: function(pages, state) {
      $.cleanCache(function(url) {
        return /^\/\/a\.4cdn\.org\//.test(url);
      });
      Index.parseThreadList(pages);
      Index.buildThreads();
      state || (state = {});
      state.sort = true;
      return Index.pageLoad(state);
    },
    parseThreadList: function(pages) {
      Index.pagesNum = pages.length;
      Index.threadsNumPerPage = pages[0].threads.length;
      Index.liveThreadData = pages.reduce((function(arr, next) {
        return arr.concat(next.threads);
      }), []);
      Index.liveThreadIDs = Index.liveThreadData.map(function(data) {
        return data.no;
      });
      g.BOARD.threads.forEach(function(thread) {
        var _ref;
        if (_ref = thread.ID, __indexOf.call(Index.liveThreadIDs, _ref) < 0) {
          return thread.collect();
        }
      });
    },
    buildThreads: function() {
      var err, errors, i, posts, thread, threadData, threadRoot, threads, _i, _len, _ref;
      Index.nodes = [];
      threads = [];
      posts = [];
      _ref = Index.liveThreadData;
      for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
        threadData = _ref[i];
        try {
          threadRoot = Build.thread(g.BOARD, threadData);
          if (Index.hat) {
            $.prepend(threadRoot, Index.hat.cloneNode(false));
          }
          if (thread = g.BOARD.threads[threadData.no]) {
            thread.setCount('post', threadData.replies + 1, threadData.bumplimit);
            thread.setCount('file', threadData.images + !!threadData.ext, threadData.imagelimit);
            thread.setStatus('Sticky', !!threadData.sticky);
            thread.setStatus('Closed', !!threadData.closed);
          } else {
            thread = new Thread(threadData.no, g.BOARD);
            threads.push(thread);
          }
          Index.nodes.push(threadRoot);
          if (!(thread.ID in thread.posts)) {
            posts.push(new Post($('.opContainer', threadRoot), thread, g.BOARD));
          }
          thread.setPage(Math.floor(i / Index.threadsNumPerPage) + 1);
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
      $.nodes(Index.nodes);
      Main.callbackNodes(Thread, threads);
      Main.callbackNodes(Post, posts);
      Index.updateHideLabel();
      return $.event('IndexRefresh');
    },
    buildReplies: function(threadRoots) {
      var data, err, errors, i, lastReplies, node, nodes, post, posts, thread, threadRoot, _i, _j, _len, _len1;
      posts = [];
      for (_i = 0, _len = threadRoots.length; _i < _len; _i++) {
        threadRoot = threadRoots[_i];
        thread = Get.threadFromRoot(threadRoot);
        i = Index.liveThreadIDs.indexOf(thread.ID);
        if (!(lastReplies = Index.liveThreadData[i].last_replies)) {
          continue;
        }
        nodes = [];
        for (_j = 0, _len1 = lastReplies.length; _j < _len1; _j++) {
          data = lastReplies[_j];
          if (post = thread.posts[data.no]) {
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
        $.add(threadRoot, nodes);
      }
      if (errors) {
        Main.handleErrors(errors);
      }
      return Main.callbackNodes(Post, posts);
    },
    buildCatalogViews: function() {
      var catalogThreads, thread, threads, _i, _len;
      threads = Index.sortedNodes.map(function(threadRoot) {
        return Get.threadFromRoot(threadRoot);
      }).filter(function(thread) {
        return !thread.isHidden !== Index.showHiddenThreads;
      });
      catalogThreads = [];
      for (_i = 0, _len = threads.length; _i < _len; _i++) {
        thread = threads[_i];
        if (!thread.catalogView) {
          catalogThreads.push(new CatalogThread(Build.catalogThread(thread), thread));
        }
      }
      Main.callbackNodes(CatalogThread, catalogThreads);
      return threads.map(function(thread) {
        return thread.catalogView.nodes.root;
      });
    },
    sizeCatalogViews: function(nodes) {
      var height, node, ratio, size, thumb, width, _i, _len, _ref;
      size = Conf['Index Size'] === 'small' ? 150 : 250;
      for (_i = 0, _len = nodes.length; _i < _len; _i++) {
        node = nodes[_i];
        thumb = $('.catalog-thumb', node);
        _ref = thumb.dataset, width = _ref.width, height = _ref.height;
        if (!width) {
          continue;
        }
        ratio = size / Math.max(width, height);
        thumb.style.width = width * ratio + 'px';
        thumb.style.height = height * ratio + 'px';
      }
    },
    sort: function() {
      var liveThreadData, liveThreadIDs, nodes, sortedNodes, sortedThreadIDs, threadID, _i, _len;
      liveThreadIDs = Index.liveThreadIDs, liveThreadData = Index.liveThreadData;
      sortedThreadIDs = {
        lastreply: __slice.call(liveThreadData).sort(function(a, b) {
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
        }),
        bump: liveThreadIDs,
        birth: __slice.call(liveThreadIDs).sort(function(a, b) {
          return b - a;
        }),
        replycount: __slice.call(liveThreadData).sort(function(a, b) {
          return b.replies - a.replies;
        }).map(function(post) {
          return post.no;
        }),
        filecount: __slice.call(liveThreadData).sort(function(a, b) {
          return b.images - a.images;
        }).map(function(post) {
          return post.no;
        })
      }[Conf['Index Sort']];
      Index.sortedNodes = sortedNodes = [];
      nodes = Index.nodes;
      for (_i = 0, _len = sortedThreadIDs.length; _i < _len; _i++) {
        threadID = sortedThreadIDs[_i];
        sortedNodes.push(nodes[Index.liveThreadIDs.indexOf(threadID)]);
      }
      if (Index.search && (nodes = Index.querySearch(Index.search))) {
        Index.sortedNodes = nodes;
      }
      Index.sortOnTop(function(thread) {
        return thread.isSticky;
      });
      Index.sortOnTop(function(thread) {
        return thread.isOnTop || Conf['Pin Watched Threads'] && ThreadWatcher.isWatched(thread);
      });
      if (Conf['Anchor Hidden Threads']) {
        return Index.sortOnTop(function(thread) {
          return !thread.isHidden;
        });
      }
    },
    sortOnTop: function(match) {
      var bottomNodes, threadRoot, topNodes, _i, _len, _ref;
      topNodes = [];
      bottomNodes = [];
      _ref = Index.sortedNodes;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        threadRoot = _ref[_i];
        (match(Get.threadFromRoot(threadRoot)) ? topNodes : bottomNodes).push(threadRoot);
      }
      return Index.sortedNodes = topNodes.concat(bottomNodes);
    },
    buildIndex: function() {
      var i, nodes, page, post;
      switch (Conf['Index Mode']) {
        case 'all pages':
          nodes = Index.sortedNodes;
          break;
        case 'catalog':
          nodes = Index.buildCatalogViews();
          Index.sizeCatalogViews(nodes);
          break;
        default:
          if (Index.followedThreadID != null) {
            i = 0;
            while (Index.followedThreadID !== Get.threadFromRoot(Index.sortedNodes[i]).ID) {
              i++;
            }
            page = Math.floor(i / Index.threadsNumPerPage) + 1;
            if (page !== Index.getCurrentPage()) {
              Index.pushState({
                page: page
              });
            }
          }
          nodes = Index.buildSinglePage(Index.getCurrentPage());
      }
      $.rmAll(Index.root);
      $.rmAll(Header.hover);
      if (Conf['Index Mode'] === 'catalog') {
        return $.add(Index.root, nodes);
      } else {
        if (Conf['Show Replies']) {
          Index.buildReplies(nodes);
        }
        Index.buildStructure(nodes);
        if ((Index.followedThreadID != null) && (post = g.posts["" + g.BOARD + "." + Index.followedThreadID])) {
          return Header.scrollTo(post.nodes.root);
        }
      }
    },
    buildSinglePage: function(pageNum) {
      var nodesPerPage, offset;
      nodesPerPage = Index.threadsNumPerPage;
      offset = nodesPerPage * (pageNum - 1);
      return Index.sortedNodes.slice(offset, offset + nodesPerPage);
    },
    buildStructure: function(nodes) {
      var node, _i, _len;
      for (_i = 0, _len = nodes.length; _i < _len; _i++) {
        node = nodes[_i];
        $.add(Index.root, [node, $.el('hr')]);
      }
      if (doc.contains(Index.root)) {
        $.event('PostsInserted');
      }
      return ThreadHiding.onIndexBuild(nodes);
    },
    clearSearch: function() {
      Index.searchInput.value = '';
      Index.onSearchInput();
      return Index.searchInput.focus();
    },
    setupSearch: function(noUpdate) {
      if (!noUpdate) {
        Index.searchInput.value = Index.search;
      }
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
      return Index.pageLoad(Index.pushState({
        search: search,
        replace: !!search === !!Index.search
      }));
    },
    querySearch: function(query) {
      var keywords;
      if (!(keywords = query.toLowerCase().match(/\S+/g))) {
        return;
      }
      return Index.sortedNodes.filter(function(threadRoot) {
        return Index.searchMatch(Get.threadFromRoot(threadRoot), keywords);
      });
    },
    searchMatch: function(thread, keywords) {
      var file, info, key, keyword, text, _i, _j, _len, _len1, _ref, _ref1;
      _ref = thread.OP, info = _ref.info, file = _ref.file;
      text = [];
      _ref1 = ['comment', 'subject', 'name', 'tripcode', 'email'];
      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
        key = _ref1[_i];
        if (key in info) {
          text.push(info[key]);
        }
      }
      if (file) {
        text.push(file.name);
      }
      text = text.join(' ').toLowerCase();
      for (_j = 0, _len1 = keywords.length; _j < _len1; _j++) {
        keyword = keywords[_j];
        if (-1 === text.indexOf(keyword)) {
          return false;
        }
      }
      return true;
    }
  };

  Build = {
    staticPath: '//s.4cdn.org/image/',
    gifIcon: window.devicePixelRatio >= 2 ? '@2x.gif' : '.gif',
    initPixelRatio: window.devicePixelRatio,
    spoilerRange: {},
    unescape: function(text) {
      if (text == null) {
        return text;
      }
      return text.replace(/<[^>]*>/g, '').replace(/&(amp|#039|quot|lt|gt);/g, function(c) {
        return {
          '&amp;': '&',
          '&#039;': "'",
          '&quot;': '"',
          '&lt;': '<',
          '&gt;': '>'
        }[c];
      });
    },
    shortFilename: function(filename, isReply) {
      var ext, threshold;
      threshold = 30;
      ext = filename.match(/\.?[^\.]*$/)[0];
      if (filename.length - ext.length > threshold) {
        return "" + filename.slice(0, threshold - 5) + "(...)" + ext;
      } else {
        return filename;
      }
    },
    thumbRotate: (function() {
      var n;
      n = 0;
      return function() {
        return n = (n + 1) % 2;
      };
    })(),
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
    postFromObject: function(data, boardID) {
      var o;
      o = {
        postID: data.no,
        threadID: data.resto || data.no,
        boardID: boardID,
        name: Build.unescape(data.name),
        capcode: data.capcode,
        tripcode: data.trip,
        uniqueID: data.id,
        email: Build.unescape(data.email),
        subject: Build.unescape(data.sub),
        flagCode: data.country,
        flagName: Build.unescape(data.country_name),
        date: data.now,
        dateUTC: data.time,
        comment: {
          innerHTML: data.com || ''
        },
        isSticky: !!data.sticky,
        isClosed: !!data.closed,
        isArchived: !!data.archived
      };
      if (data.filedeleted) {
        o.file = {
          isDeleted: true
        };
      } else if (data.ext) {
        o.file = {
          name: (Build.unescape(data.filename)) + data.ext,
          timestamp: "" + data.tim + data.ext,
          url: boardID === 'f' ? "//i.4cdn.org/" + boardID + "/" + (encodeURIComponent(data.filename)) + data.ext : "//i.4cdn.org/" + boardID + "/" + data.tim + data.ext,
          height: data.h,
          width: data.w,
          MD5: data.md5,
          size: data.fsize,
          turl: "//" + (Build.thumbRotate()) + ".t.4cdn.org/" + boardID + "/" + data.tim + "s.jpg",
          theight: data.tn_h,
          twidth: data.tn_w,
          isSpoiler: !!data.spoiler,
          isDeleted: false,
          tag: data.tag
        };
      }
      return Build.post(o);
    },
    post: function(o) {

      /*
      This function contains code from 4chan-JS (https://github.com/4chan/4chan-JS).
      @license: https://github.com/4chan/4chan-JS/blob/master/LICENSE
       */
      var boardID, capcode, capcodeClass, capcodeIcon, capcodeStart, comment, container, date, dateUTC, desktop2, email, emailField, emailProcessed, file, fileBlock, fileCont, fileDims, fileLink, fileSize, fileText, fileThumb, flag, flagCode, flagName, highlightPost, href, icons, isOP, match, message, name, nameBlock, nameClass, postID, postInfo, postLink, quote, quoteLink, replyLink, retina, shortFilename, spoilerRange, subject, subjectField, threadID, tripcode, tripcodeField, type, typeLC, uniqueID, userID, wholePost, _i, _len, _ref;
      postID = o.postID, threadID = o.threadID, boardID = o.boardID, name = o.name, capcode = o.capcode, tripcode = o.tripcode, uniqueID = o.uniqueID, email = o.email, subject = o.subject, flagCode = o.flagCode, flagName = o.flagName, date = o.date, dateUTC = o.dateUTC, comment = o.comment, file = o.file;
      name || (name = '');
      subject || (subject = '');
      isOP = postID === threadID;
      retina = Build.initPixelRatio >= 2 ? '@2x' : '';

      /* Name Block */
      switch (capcode) {
        case 'admin':
        case 'admin_highlight':
          capcodeClass = ' capcodeAdmin';
          capcodeStart = {
            innerHTML: " <strong class=\"capcode hand id_admin\" title=\"Highlight posts by the Administrator\">## Admin</strong>"
          };
          capcodeIcon = {
            innerHTML: " <img src=\"//s.4cdn.org/image/adminicon" + E(retina) + ".gif\" alt=\"Admin Icon\" title=\"This user is the 4chan Administrator.\" class=\"identityIcon retina\">"
          };
          break;
        case 'mod':
          capcodeClass = ' capcodeMod';
          capcodeStart = {
            innerHTML: " <strong class=\"capcode hand id_mod\" title=\"Highlight posts by Moderators\">## Mod</strong>"
          };
          capcodeIcon = {
            innerHTML: " <img src=\"//s.4cdn.org/image/modicon" + E(retina) + ".gif\" alt=\"Mod Icon\" title=\"This user is a 4chan Moderator.\" class=\"identityIcon retina\">"
          };
          break;
        case 'developer':
          capcodeClass = ' capcodeDeveloper';
          capcodeStart = {
            innerHTML: " <strong class=\"capcode hand id_developer\" title=\"Highlight posts by Developers\">## Developer</strong>"
          };
          capcodeIcon = {
            innerHTML: " <img src=\"//s.4cdn.org/image/developericon" + E(retina) + ".gif\" alt=\"Developer Icon\" title=\"This user is a 4chan Developer.\" class=\"identityIcon retina\">"
          };
          break;
        default:
          capcodeClass = '';
          capcodeStart = {
            innerHTML: ""
          };
          capcodeIcon = isOP && boardID === 'f' ? {
            innerHTML: ""
          } : {
            innerHTML: " "
          };
      }
      nameClass = capcode ? ' capcode' : '';
      tripcodeField = tripcode ? {
        innerHTML: " <span class=\"postertrip\">" + E(tripcode) + "</span>"
      } : {
        innerHTML: ""
      };
      emailField = {
        innerHTML: "<span class=\"name" + E(nameClass) + "\">" + E(name) + "</span>" + tripcodeField.innerHTML + capcodeStart.innerHTML
      };
      if (email) {
        emailProcessed = encodeURIComponent(email).replace(/%40/g, '@');
        emailField = {
          innerHTML: "<a href=\"mailto:" + E(emailProcessed) + "\" class=\"useremail\">" + emailField.innerHTML + "</a>"
        };
      }
      userID = !capcode && uniqueID ? {
        innerHTML: " <span class=\"posteruid id_" + E(uniqueID) + "\">(ID: <span class=\"hand\" title=\"Highlight posts by this ID\">" + E(uniqueID) + "</span>)</span>"
      } : {
        innerHTML: ""
      };
      flag = !flagCode ? {
        innerHTML: ""
      } : false ? {
        innerHTML: " <img src=\"//s.4cdn.org/image/country/troll/" + E(flagCode.toLowerCase()) + ".gif\" alt=\"" + E(flagCode) + "\" title=\"" + E(flagName) + "\" class=\"countryFlag\">"
      } : {
        innerHTML: " <span title=\"" + E(flagName) + "\" class=\"flag flag-" + E(flagCode.toLowerCase()) + "\"></span>"
      };
      nameBlock = {
        innerHTML: "<span class=\"nameBlock" + E(capcodeClass) + "\">" + emailField.innerHTML + capcodeIcon.innerHTML + userID.innerHTML + flag.innerHTML + "</span> "
      };

      /* Post Info */
      subjectField = isOP || boardID === 'f' ? {
        innerHTML: "<span class=\"subject\">" + E(subject) + "</span> "
      } : {
        innerHTML: ""
      };
      desktop2 = isOP && boardID === 'f' ? '' : ' desktop';
      postLink = Build.postURL(boardID, threadID, postID);
      quoteLink = Build.sameThread(boardID, threadID) ? "javascript:quote('" + (+postID) + "');" : "/" + boardID + "/thread/" + threadID + "#q" + postID;
      icons = (function() {
        var _i, _len, _ref, _results;
        _ref = ['Sticky', 'Closed', 'Archived'];
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          type = _ref[_i];
          if (!(o["is" + type] && !(type === 'Closed' && o.isArchived))) {
            continue;
          }
          typeLC = type.toLowerCase();
          _results.push({
            innerHTML: " <img src=\"//s.4cdn.org/image/" + E(typeLC) + E(retina) + ".gif\" alt=\"" + E(type) + "\" title=\"" + E(type) + "\" class=\"" + E(typeLC) + "Icon retina\">"
          });
        }
        return _results;
      })();
      replyLink = isOP && g.VIEW === 'index' ? {
        innerHTML: " &nbsp; <span>[<a href=\"/" + E(boardID) + "/thread/" + E(threadID) + "\" class=\"replylink\">Reply</a>]</span>"
      } : {
        innerHTML: ""
      };
      postInfo = {
        innerHTML: "<div class=\"postInfo desktop\" id=\"pi" + E(postID) + "\"><input type=\"checkbox\" name=\"" + E(postID) + "\" value=\"delete\"> " + subjectField.innerHTML + nameBlock.innerHTML + "<span class=\"dateTime\" data-utc=\"" + E(dateUTC) + "\">" + E(date) + "</span> <span class=\"postNum" + E(desktop2) + "\"><a href=\"" + E(postLink) + "\" title=\"Link to this post\">No.</a><a href=\"" + E(quoteLink) + "\" title=\"Reply to this post\">" + E(postID) + "</a>" + icons.map(function(x) {
          return x.innerHTML;
        }).join('') + replyLink.innerHTML + "</span></div>"
      };

      /* File Info */
      fileCont = (file != null ? file.isDeleted : void 0) ? {
        innerHTML: "<span class=\"fileThumb\"><img src=\"//s.4cdn.org/image/filedeleted-res" + E(retina) + ".gif\" alt=\"File deleted.\" class=\"fileDeletedRes retina\"></span>"
      } : file && boardID === 'f' ? {
        innerHTML: "<div class=\"fileInfo\"><span class=\"fileText\" id=\"fT" + E(postID) + "\">File: <a data-width=\"" + E(file.width) + "\" data-height=\"" + E(file.height) + "\" href=\"" + E(file.url) + "\" target=\"_blank\">" + E(file.name) + "</a>-(" + E($.bytesToString(file.size)) + ", " + E(file.width) + "x" + E(file.height) + ", " + E(file.tag) + ")</span></div>"
      } : file ? (file.isSpoiler ? (shortFilename = 'Spoiler Image', (spoilerRange = Build.spoilerRange[boardID]) ? fileThumb = "//s.4cdn.org/image/spoiler-" + boardID + (Math.floor(1 + spoilerRange * Math.random())) + ".png" : fileThumb = '//s.4cdn.org/image/spoiler.png', file.twidth = file.theight = 100) : (shortFilename = Build.shortFilename(file.name, !isOP), fileThumb = file.turl), fileSize = $.bytesToString(file.size), fileDims = file.url.slice(-4) === '.pdf' ? 'PDF' : "" + file.width + "x" + file.height, fileLink = file.isSpoiler || file.name === shortFilename ? {
        innerHTML: "<a href=\"" + E(file.url) + "\" target=\"_blank\">" + E(shortFilename) + "</a>"
      } : {
        innerHTML: "<a title=\"" + E(file.name) + "\" href=\"" + E(file.url) + "\" target=\"_blank\">" + E(shortFilename) + "</a>"
      }, fileText = file.isSpoiler ? {
        innerHTML: "<div class=\"fileText\" id=\"fT" + E(postID) + "\" title=\"" + E(file.name) + "\">File: " + fileLink.innerHTML + " (" + E(fileSize) + ", " + E(fileDims) + ")</div>"
      } : {
        innerHTML: "<div class=\"fileText\" id=\"fT" + E(postID) + "\">File: " + fileLink.innerHTML + " (" + E(fileSize) + ", " + E(fileDims) + ")</div>"
      }, {
        innerHTML: fileText.innerHTML + "<a class=\"fileThumb" + E(file.isSpoiler ? " imgspoiler" : "") + "\" href=\"" + E(file.url) + "\" target=\"_blank\"><img src=\"" + E(fileThumb) + "\" alt=\"" + E(fileSize) + "\" data-md5=\"" + E(file.MD5) + "\" style=\"height: " + E(file.theight) + "px; width: " + E(file.twidth) + "px;\"></a>"
      }) : void 0;
      fileBlock = file ? {
        innerHTML: "<div class=\"file\" id=\"f" + E(postID) + "\">" + fileCont.innerHTML + "</div>"
      } : {
        innerHTML: ""
      };

      /* Whole Post */
      highlightPost = capcode === 'admin_highlight' ? ' highlightPost' : '';
      message = {
        innerHTML: "<blockquote class=\"postMessage\" id=\"m" + E(postID) + "\">" + comment.innerHTML + "</blockquote>"
      };
      wholePost = isOP ? {
        innerHTML: "<div id=\"p" + E(postID) + "\" class=\"post op" + E(highlightPost) + "\">" + fileBlock.innerHTML + postInfo.innerHTML + message.innerHTML + "</div>"
      } : {
        innerHTML: "<div class=\"sideArrows\" id=\"sa" + E(postID) + "\">&gt;&gt;</div><div id=\"p" + E(postID) + "\" class=\"post reply" + E(highlightPost) + "\">" + postInfo.innerHTML + fileBlock.innerHTML + message.innerHTML + "</div>"
      };
      container = $.el('div', {
        className: "postContainer " + (isOP ? 'op' : 'reply') + "Container",
        id: "pc" + postID
      });
      $.extend(container, wholePost);
      _ref = $$('.quotelink', container);
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        quote = _ref[_i];
        href = quote.getAttribute('href');
        if ((href[0] === '#') && !(Build.sameThread(boardID, threadID))) {
          quote.href = ("/" + boardID + "/thread/" + threadID) + href;
        } else if ((match = href.match(/^\/([^\/]+)\/thread\/(\d+)/)) && (Build.sameThread(match[1], match[2]))) {
          quote.href = href.match(/(#[^#]*)?$/)[0] || '#';
        }
      }
      return container;
    },
    summary: function(boardID, threadID, posts, files) {
      var text;
      text = [];
      text.push("" + posts + " post" + (posts > 1 ? 's' : ''));
      if (files) {
        text.push("and " + files + " image repl" + (files > 1 ? 'ies' : 'y'));
      }
      text.push('omitted.');
      return $.el('a', {
        className: 'summary',
        textContent: text.join(' '),
        href: "/" + boardID + "/thread/" + threadID
      });
    },
    thread: function(board, data, full) {
      var OP, root;
      Build.spoilerRange[board] = data.custom_spoiler;
      if ((OP = board.posts[data.no]) && (root = OP.nodes.root.parentNode)) {
        $.rmAll(root);
      } else {
        root = $.el('div', {
          className: 'thread',
          id: "t" + data.no
        });
      }
      $.add(root, Build[full ? 'fullThread' : 'excerptThread'](board, data, OP));
      return root;
    },
    excerptThread: function(board, data, OP) {
      var files, nodes, posts, _ref;
      nodes = [OP ? OP.nodes.root : Build.postFromObject(data, board.ID)];
      if (data.omitted_posts || !Conf['Show Replies'] && data.replies) {
        _ref = Conf['Show Replies'] ? [
          data.omitted_posts, data.images - data.last_replies.filter(function(data) {
            return !!data.ext;
          }).length
        ] : [data.replies, data.images], posts = _ref[0], files = _ref[1];
        nodes.push(Build.summary(board.ID, data.no, posts, files));
      }
      return nodes;
    },
    fullThread: function(board, data) {
      return Build.postFromObject(data, board.ID);
    },
    catalogThread: function(thread) {
      var br, cc, comment, data, exif, fileCount, gifIcon, href, imgClass, pageCount, postCount, pp, quote, root, spoilerRange, src, staticPath, subject, thumb, _i, _j, _k, _l, _len, _len1, _len2, _len3, _ref, _ref1, _ref2, _ref3, _ref4;
      staticPath = Build.staticPath, gifIcon = Build.gifIcon;
      data = Index.liveThreadData[Index.liveThreadIDs.indexOf(thread.ID)];
      if (data.spoiler && !Conf['Reveal Spoiler Thumbnails']) {
        src = "" + staticPath + "spoiler";
        if (spoilerRange = Build.spoilerRange[thread.board]) {
          src += ("-" + thread.board) + Math.floor(1 + spoilerRange * Math.random());
        }
        src += '.png';
        imgClass = 'spoiler-file';
      } else if (data.filedeleted) {
        src = "" + staticPath + "filedeleted-res" + gifIcon;
        imgClass = 'deleted-file';
      } else if (thread.OP.file) {
        src = thread.OP.file.thumbURL;
      } else {
        src = "" + staticPath + "nofile.png";
        imgClass = 'no-file';
      }
      thumb = imgClass ? {
        innerHTML: "<img src=\"" + E(src) + "\" class=\"catalog-thumb " + E(imgClass) + "\">"
      } : {
        innerHTML: "<img src=\"" + E(src) + "\" class=\"catalog-thumb\" data-width=\"" + E(data.tn_w) + "\" data-height=\"" + E(data.tn_h) + "\">"
      };
      postCount = data.replies + 1;
      fileCount = data.images + !!data.ext;
      pageCount = Math.floor(Index.liveThreadIDs.indexOf(thread.ID) / Index.threadsNumPerPage) + 1;
      subject = thread.OP.info.subject ? {
        innerHTML: "<div class=\"subject\">" + E(thread.OP.info.subject) + "</div>"
      } : {
        innerHTML: ""
      };
      comment = {
        innerHTML: data.com || ''
      };
      root = $.el('div', {
        className: 'catalog-thread'
      });
      $.extend(root, {
        innerHTML: "<a href=\"/" + E(thread.board) + "/thread/" + E(thread.ID) + "\">" + thumb.innerHTML + "</a><div class=\"catalog-stats\" title=\"Post count / File count / Page count\"><span class=\"post-count\">" + E(postCount) + "</span> / <span class=\"file-count\">" + E(fileCount) + "</span> / <span class=\"page-count\">" + E(pageCount) + "</span><span class=\"catalog-icons\"></span></div>" + subject.innerHTML + "<div class=\"comment\">" + comment.innerHTML + "</div>"
      });
      root.dataset.fullID = thread.fullID;
      if (thread.OP.highlights) {
        $.addClass.apply($, [root].concat(__slice.call(thread.OP.highlights)));
      }
      _ref = $$('.quotelink', root.lastElementChild);
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        quote = _ref[_i];
        href = quote.getAttribute('href');
        if (href[0] === '#') {
          quote.href = ("/" + thread.board + "/thread/" + thread.ID) + href;
        }
      }
      _ref1 = $$('.abbr, .exif', root.lastElementChild);
      for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
        exif = _ref1[_j];
        $.rm(exif);
      }
      _ref2 = $$('.prettyprint', root.lastElementChild);
      for (_k = 0, _len2 = _ref2.length; _k < _len2; _k++) {
        pp = _ref2[_k];
        cc = $.el('span', {
          className: 'catalog-code'
        });
        $.add(cc, __slice.call(pp.childNodes));
        $.replace(pp, cc);
      }
      _ref3 = $$('br', root.lastElementChild);
      for (_l = 0, _len3 = _ref3.length; _l < _len3; _l++) {
        br = _ref3[_l];
        if (((_ref4 = br.previousSibling) != null ? _ref4.nodeName : void 0) === 'BR') {
          $.rm(br);
        }
      }
      if (thread.isSticky) {
        $.add($('.catalog-icons', root), $.el('img', {
          src: "" + staticPath + "sticky" + gifIcon,
          className: 'stickyIcon',
          title: 'Sticky'
        }));
      }
      if (thread.isClosed) {
        $.add($('.catalog-icons', root), $.el('img', {
          src: "" + staticPath + "closed" + gifIcon,
          className: 'closedIcon',
          title: 'Closed'
        }));
      }
      if (data.bumplimit) {
        $.addClass($('.post-count', root), 'warning');
      }
      if (data.imagelimit) {
        $.addClass($('.file-count', root), 'warning');
      }
      return root;
    }
  };

  Get = {
    threadExcerpt: function(thread) {
      var OP, excerpt, _ref;
      OP = thread.OP;
      excerpt = ("/" + thread.board + "/ - ") + (((_ref = OP.info.subject) != null ? _ref.trim() : void 0) || OP.info.comment.replace(/\n+/g, ' // ') || OP.info.nameBlock);
      if (excerpt.length > 73) {
        return "" + excerpt.slice(0, 70) + "...";
      }
      return excerpt;
    },
    threadFromRoot: function(root) {
      return g.threads["" + g.BOARD + "." + root.id.slice(1)];
    },
    threadFromNode: function(node) {
      return Get.threadFromRoot($.x('ancestor::div[@class="thread"]', node));
    },
    postFromRoot: function(root) {
      var boardID, index, link, post, postID;
      link = $('.postNum > a[href*="#"]', root);
      boardID = link.pathname.split('/')[1];
      postID = link.hash.slice(2);
      index = root.dataset.clone;
      post = g.posts["" + boardID + "." + postID];
      if (index) {
        return post.clones[index];
      } else {
        return post;
      }
    },
    postFromNode: function(root) {
      return Get.postFromRoot($.x('(ancestor::div[contains(@class,"postContainer")][1]|following::div[contains(@class,"postContainer")][1])', root));
    },
    contextFromNode: function(node) {
      return Get.postFromRoot($.x('ancestor::div[parent::div[@class="thread"]][1]', node));
    },
    postDataFromLink: function(link) {
      var boardID, path, postID, threadID, _ref;
      if (link.hostname === 'boards.4chan.org') {
        path = link.pathname.split('/');
        boardID = path[1];
        threadID = path[3];
        postID = link.hash.slice(2);
      } else {
        _ref = link.dataset, boardID = _ref.boardID, threadID = _ref.threadID, postID = _ref.postID;
        threadID || (threadID = 0);
      }
      return {
        boardID: boardID,
        threadID: +threadID,
        postID: +postID
      };
    },
    allQuotelinksLinkingTo: function(post) {
      var fullID, handleQuotes, posts, qPost, quote, quotelinks, _i, _len, _ref;
      quotelinks = [];
      posts = g.posts;
      fullID = post.fullID;
      handleQuotes = function(qPost, type) {
        var clone, _i, _len, _ref;
        quotelinks.push.apply(quotelinks, qPost.nodes[type]);
        _ref = qPost.clones;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          clone = _ref[_i];
          quotelinks.push.apply(quotelinks, clone.nodes[type]);
        }
      };
      posts.forEach(function(qPost) {
        if (__indexOf.call(qPost.quotes, fullID) >= 0) {
          return handleQuotes(qPost, 'quotelinks');
        }
      });
      if (Conf['Quote Backlinks']) {
        _ref = post.quotes;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          quote = _ref[_i];
          if (qPost = posts[quote]) {
            handleQuotes(qPost, 'backlinks');
          }
        }
      }
      return quotelinks.filter(function(quotelink) {
        var boardID, postID, _ref1;
        _ref1 = Get.postDataFromLink(quotelink), boardID = _ref1.boardID, postID = _ref1.postID;
        return boardID === post.board.ID && postID === post.ID;
      });
    },
    scriptData: function() {
      var script, _i, _len, _ref;
      _ref = $$('script:not([src])', d.head);
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        script = _ref[_i];
        if (/\bcooldowns *=/.test(script.textContent)) {
          return script.textContent;
        }
      }
      return '';
    },
    postClone: function(boardID, threadID, postID, root, context) {
      var post;
      if (post = g.posts["" + boardID + "." + postID]) {
        Get.insert(post, root, context);
        return;
      }
      root.textContent = "Loading post No." + postID + "...";
      if (threadID) {
        return $.cache("//a.4cdn.org/" + boardID + "/thread/" + threadID + ".json", function() {
          return Get.fetchedPost(this, boardID, threadID, postID, root, context);
        });
      } else {
        return Get.archivedPost(boardID, postID, root, context);
      }
    },
    insert: function(post, root, context) {
      var clone, nodes;
      if (!root.parentNode) {
        return;
      }
      clone = post.addClone(context, $.hasClass(root, 'dialog'));
      Main.callbackNodes(Clone, [clone]);
      nodes = clone.nodes;
      $.rmAll(nodes.root);
      $.add(nodes.root, nodes.post);
      $.rmAll(root);
      $.add(root, nodes.root);
      return $.event('PostsInserted');
    },
    fetchedPost: function(req, boardID, threadID, postID, root, context) {
      var api, board, post, posts, status, thread, _i, _len;
      if (post = g.posts["" + boardID + "." + postID]) {
        Get.insert(post, root, context);
        return;
      }
      status = req.status;
      if (status !== 200 && status !== 304) {
        if (!Get.archivedPost(boardID, postID, root, context)) {
          $.addClass(root, 'warning');
          root.textContent = status === 404 ? "Thread No." + threadID + " 404'd." : "Error " + req.statusText + " (" + req.status + ").";
        }
        return;
      }
      posts = req.response.posts;
      Build.spoilerRange[boardID] = posts[0].custom_spoiler;
      for (_i = 0, _len = posts.length; _i < _len; _i++) {
        post = posts[_i];
        if (post.no === postID) {
          break;
        }
      }
      if (post.no !== postID) {
        if (req.cached) {
          api = "//a.4cdn.org/" + boardID + "/thread/" + threadID + ".json";
          $.cleanCache(function(url) {
            return url === api;
          });
          $.cache(api, function() {
            return Get.fetchedPost(this, boardID, threadID, postID, root, context);
          });
          return;
        }
        if (!Get.archivedPost(boardID, postID, root, context)) {
          $.addClass(root, 'warning');
          root.textContent = "Post No." + postID + " was not found.";
        }
        return;
      }
      board = g.boards[boardID] || new Board(boardID);
      thread = g.threads["" + boardID + "." + threadID] || new Thread(threadID, board);
      post = new Post(Build.postFromObject(post, boardID), thread, board);
      post.isFetchedQuote = true;
      Main.callbackNodes(Post, [post]);
      return Get.insert(post, root, context);
    },
    archivedPost: function(boardID, postID, root, context) {
      var url;
      if (!Conf['Resurrect Quotes']) {
        return false;
      }
      if (!(url = Redirect.to('post', {
        boardID: boardID,
        postID: postID
      }))) {
        return false;
      }
      if (/^https:\/\//.test(url) || location.protocol === 'http:') {
        $.cache(url, function() {
          return Get.parseArchivedPost(this.response, boardID, postID, root, context);
        }, {
          responseType: 'json',
          withCredentials: url.archive.withCredentials
        });
        return true;
      } else if (Conf['Except Archives from Encryption']) {
        CrossOrigin.json(url, function(response) {
          var key, media, _ref;
          media = response.media;
          if (media) {
            for (key in media) {
              if (/_link$/.test(key)) {
                if (!((media[key] != null) && (_ref = media[key].match(/^(http:\/\/[^\/]+\/)?/)[0], __indexOf.call(url.archive.imagehosts, _ref) >= 0))) {
                  delete media[key];
                }
              }
            }
          }
          return Get.parseArchivedPost(response, boardID, postID, root, context);
        });
        return true;
      }
      return false;
    },
    parseArchivedPost: function(data, boardID, postID, root, context) {
      var board, comment, greentext, i, j, o, post, text, text2, thread, threadID, _ref;
      if (post = g.posts["" + boardID + "." + postID]) {
        Get.insert(post, root, context);
        return;
      }
      if (data.error) {
        $.addClass(root, 'warning');
        root.textContent = data.error;
        return;
      }
      comment = (data.comment || '').split(/(\n|\[\/?(?:b|spoiler|code|moot|banned)\])/);
      comment = (function() {
        var _i, _len, _results;
        _results = [];
        for (i = _i = 0, _len = comment.length; _i < _len; i = ++_i) {
          text = comment[i];
          if (i % 2 === 1) {
            _results.push(Get.archiveTags[text]);
          } else {
            greentext = text[0] === '>';
            text = text.replace(/(\[\/?[a-z]+):lit(\])/, '$1$2');
            text = (function() {
              var _j, _len1, _ref, _results1;
              _ref = text.split(/(>>(?:>\/[a-z\d]+\/)?\d+)/g);
              _results1 = [];
              for (j = _j = 0, _len1 = _ref.length; _j < _len1; j = ++_j) {
                text2 = _ref[j];
                if (j % 2 === 1) {
                  _results1.push({
                    innerHTML: "<span class=\"deadlink\">" + E(text2) + "</span>"
                  });
                } else {
                  _results1.push({
                    innerHTML: E(text2)
                  });
                }
              }
              return _results1;
            })();
            text = {
              innerHTML: text.map(function(x) {
                return x.innerHTML;
              }).join('')
            };
            if (greentext) {
              text = {
                innerHTML: "<span class=\"quote\">" + text.innerHTML + "</span>"
              };
            }
            _results.push(text);
          }
        }
        return _results;
      })();
      comment = {
        innerHTML: comment.map(function(x) {
          return x.innerHTML;
        }).join('')
      };
      threadID = +data.thread_num;
      o = {
        postID: postID,
        threadID: threadID,
        boardID: boardID,
        name: data.name,
        capcode: (function() {
          switch (data.capcode) {
            case 'M':
              return 'mod';
            case 'A':
              return 'admin';
            case 'D':
              return 'developer';
          }
        })(),
        tripcode: data.trip,
        uniqueID: data.poster_hash,
        email: data.email || '',
        subject: data.title,
        flagCode: data.poster_country,
        flagName: data.poster_country_name,
        date: data.fourchan_date,
        dateUTC: data.timestamp,
        comment: comment
      };
      if ((_ref = data.media) != null ? _ref.media_filename : void 0) {
        o.file = {
          name: data.media.media_filename,
          timestamp: data.media.media_orig,
          url: data.media.media_link || data.media.remote_media_link || ("//i.4cdn.org/" + boardID + "/" + (encodeURIComponent(data.media[boardID === 'f' ? 'media_filename' : 'media_orig']))),
          height: data.media.media_h,
          width: data.media.media_w,
          MD5: data.media.media_hash,
          size: data.media.media_size,
          turl: data.media.thumb_link || ("//t.4cdn.org/" + boardID + "/" + data.media.preview_orig),
          theight: data.media.preview_h,
          twidth: data.media.preview_w,
          isSpoiler: data.media.spoiler === '1'
        };
        if (boardID === 'f') {
          o.file.tag = JSON.parse(data.media.exif).Tag;
        }
      }
      board = g.boards[boardID] || new Board(boardID);
      thread = g.threads["" + boardID + "." + threadID] || new Thread(threadID, board);
      post = new Post(Build.post(o), thread, board, {
        isArchived: true
      });
      if (post.file) {
        post.file.thumbURL = o.file.turl;
      }
      post.isFetchedQuote = true;
      Main.callbackNodes(Post, [post]);
      return Get.insert(post, root, context);
    },
    archiveTags: {
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
      }
    }
  };

  UI = (function() {
    var Menu, checkbox, dialog, drag, dragend, dragstart, hover, hoverend, hoverstart, touchend, touchmove;
    dialog = function(id, position, properties) {
      var child, el, move, _i, _len, _ref;
      el = $.el('div', {
        className: 'dialog',
        id: id
      });
      $.extend(el, properties);
      el.style.cssText = position;
      $.get("" + id + ".position", position, function(item) {
        return el.style.cssText = item["" + id + ".position"];
      });
      move = $('.move', el);
      $.on(move, 'touchstart mousedown', dragstart);
      _ref = move.children;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        child = _ref[_i];
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
        this.addEntry = __bind(this.addEntry, this);
        this.onFocus = __bind(this.onFocus, this);
        this.keybinds = __bind(this.keybinds, this);
        this.close = __bind(this.close, this);
        $.on(d, 'AddMenuEntry', (function(_this) {
          return function(_arg) {
            var detail;
            detail = _arg.detail;
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
          this.close();
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
        var bLeft, bRect, bTop, bottom, cHeight, cWidth, entry, left, mRect, menu, right, style, top, _i, _len, _ref, _ref1, _ref2;
        menu = this.makeMenu();
        currentMenu = menu;
        lastToggledButton = button;
        this.entries.sort(function(first, second) {
          return first.order - second.order;
        });
        _ref = this.entries;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          entry = _ref[_i];
          this.insertEntry(entry, menu, data);
        }
        $.addClass(lastToggledButton, 'active');
        $.on(d, 'click', this.close);
        $.on(d, 'CloseMenu', this.close);
        $.add(button, menu);
        mRect = menu.getBoundingClientRect();
        bRect = button.getBoundingClientRect();
        bTop = window.scrollY + bRect.top;
        bLeft = window.scrollX + bRect.left;
        cHeight = doc.clientHeight;
        cWidth = doc.clientWidth;
        _ref1 = bRect.top + bRect.height + mRect.height < cHeight ? [bRect.bottom, null] : [null, cHeight - bRect.top], top = _ref1[0], bottom = _ref1[1];
        _ref2 = bRect.left + mRect.width < cWidth ? [bRect.left, null] : [null, cWidth - bRect.right], left = _ref2[0], right = _ref2[1];
        style = menu.style;
        style.top = "" + top + "px";
        style.right = "" + right + "px";
        style.bottom = "" + bottom + "px";
        style.left = "" + left + "px";
        if (right) {
          $.addClass(menu, 'left');
        }
        entry = $('.entry', menu);
        this.focus(entry);
        return menu.focus();
      };

      Menu.prototype.insertEntry = function(entry, parent, data) {
        var subEntry, submenu, _i, _len, _ref;
        if (typeof entry.open === 'function') {
          if (!entry.open(data)) {
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
        _ref = entry.subEntries;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          subEntry = _ref[_i];
          this.insertEntry(subEntry, submenu, data);
        }
        $.add(entry.el, submenu);
      };

      Menu.prototype.close = function() {
        $.rm(currentMenu);
        $.rmClass(lastToggledButton, 'active');
        currentMenu = null;
        lastToggledButton = null;
        return $.off(d, 'click CloseMenu', this.close);
      };

      Menu.prototype.findNextEntry = function(entry, direction) {
        var entries;
        entries = __slice.call(entry.parentNode.children);
        entries.sort(function(first, second) {
          return first.style.order - second.style.order;
        });
        return entries[entries.indexOf(entry) + direction];
      };

      Menu.prototype.keybinds = function(e) {
        var entry, next, nextPrev, subEntry, submenu;
        entry = $('.focused', currentMenu);
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
        var bottom, cHeight, cWidth, eRect, focused, left, right, sRect, style, submenu, top, _i, _len, _ref, _ref1, _ref2;
        while (focused = $.x('parent::*/child::*[contains(@class,"focused")]', entry)) {
          $.rmClass(focused, 'focused');
        }
        _ref = $$('.focused', entry);
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          focused = _ref[_i];
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
        _ref1 = eRect.top + sRect.height < cHeight ? ['0px', 'auto'] : ['auto', '0px'], top = _ref1[0], bottom = _ref1[1];
        _ref2 = eRect.right + sRect.width < cWidth - 150 ? ['100%', 'auto'] : ['auto', '100%'], left = _ref2[0], right = _ref2[1];
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
        var el, subEntries, subEntry, _i, _len;
        el = entry.el, subEntries = entry.subEntries;
        $.addClass(el, 'entry');
        $.on(el, 'focus mouseover', this.onFocus);
        el.style.order = entry.order || 100;
        if (!subEntries) {
          return;
        }
        $.addClass(el, 'has-submenu');
        for (_i = 0, _len = subEntries.length; _i < _len; _i++) {
          subEntry = subEntries[_i];
          this.parseEntry(subEntry);
        }
      };

      return Menu;

    })();
    dragstart = function(e) {
      var el, isTouching, o, rect, screenHeight, screenWidth, _ref;
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
      _ref = Conf['Header auto-hide'] || !Conf['Fixed Header'] ? [0, 0] : Conf['Bottom Header'] ? [0, Header.bar.getBoundingClientRect().height] : [Header.bar.getBoundingClientRect().height, 0], o.topBorder = _ref[0], o.bottomBorder = _ref[1];
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
      var touch, _i, _len, _ref;
      _ref = e.changedTouches;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        touch = _ref[_i];
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
      left = left < 10 ? 0 : this.width - left < 10 ? null : left / this.screenWidth * 100 + '%';
      top = clientY - this.dy;
      top = top < (10 + this.topBorder) ? this.topBorder + 'px' : this.height - top < (10 + this.bottomBorder) ? null : top / this.screenHeight * 100 + '%';
      right = left === null ? 0 : null;
      bottom = top === null ? this.bottomBorder + 'px' : null;
      style = this.style;
      style.left = left;
      style.right = right;
      style.top = top;
      return style.bottom = bottom;
    };
    touchend = function(e) {
      var touch, _i, _len, _ref;
      _ref = e.changedTouches;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        touch = _ref[_i];
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
      return $.set("" + this.id + ".position", this.style.cssText);
    };
    hoverstart = function(_arg) {
      var asapTest, cb, el, endEvents, height, latestEvent, noRemove, o, root, _ref;
      root = _arg.root, el = _arg.el, latestEvent = _arg.latestEvent, endEvents = _arg.endEvents, asapTest = _arg.asapTest, height = _arg.height, cb = _arg.cb, noRemove = _arg.noRemove;
      o = {
        root: root,
        el: el,
        style: el.style,
        isImage: (_ref = el.nodeName) === 'IMG' || _ref === 'VIDEO',
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
      $.asap(function() {
        return !el.parentNode || asapTest();
      }, function() {
        if (el.parentNode) {
          return o.hover(o.latestEvent);
        }
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
    hover = function(e) {
      var clientX, clientY, height, left, right, style, threshold, top, _ref;
      this.latestEvent = e;
      height = this.height || this.el.offsetHeight;
      clientX = e.clientX, clientY = e.clientY;
      top = this.isImage ? Math.max(0, clientY * (this.clientHeight - height) / this.clientHeight) : Math.max(0, Math.min(this.clientHeight - height, clientY - 120));
      threshold = this.clientWidth / 2;
      if (!this.isImage) {
        threshold = Math.max(threshold, this.clientWidth - 400);
      }
      _ref = clientX <= threshold ? [clientX + 45 + 'px', null] : [null, this.clientWidth - clientX + 45 + 'px'], left = _ref[0], right = _ref[1];
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
      $.add(label, [input, $.tn(text)]);
      return label;
    };
    return {
      dialog: dialog,
      Menu: Menu,
      hover: hoverstart,
      checkbox: checkbox
    };
  })();

  CrossOrigin = (function() {
    return {
      file: (function() {
        var makeBlob;
        makeBlob = function(urlBlob, contentType, contentDisposition, url) {
          var blob, match, mime, name, _ref, _ref1, _ref2;
          name = (_ref = url.match(/([^\/]+)\/*$/)) != null ? _ref[1] : void 0;
          mime = (contentType != null ? contentType.match(/[^;]*/)[0] : void 0) || 'application/octet-stream';
          match = (contentDisposition != null ? (_ref1 = contentDisposition.match(/\bfilename\s*=\s*"((\\"|[^"])+)"/i)) != null ? _ref1[1] : void 0 : void 0) || (contentType != null ? (_ref2 = contentType.match(/\bname\s*=\s*"((\\"|[^"])+)"/i)) != null ? _ref2[1] : void 0 : void 0);
          if (match) {
            name = match.replace(/\\"/g, '"');
          }
          blob = new Blob([urlBlob], {
            type: mime
          });
          blob.name = name;
          return blob;
        };
        return function(url, cb) {
          return GM_xmlhttpRequest({
            method: "GET",
            url: url,
            overrideMimeType: "text/plain; charset=x-user-defined",
            onload: function(xhr) {
              var contentDisposition, contentType, data, i, r, _ref, _ref1;
              r = xhr.responseText;
              data = new Uint8Array(r.length);
              i = 0;
              while (i < r.length) {
                data[i] = r.charCodeAt(i);
                i++;
              }
              contentType = (_ref = xhr.responseHeaders.match(/Content-Type:\s*(.*)/i)) != null ? _ref[1] : void 0;
              contentDisposition = (_ref1 = xhr.responseHeaders.match(/Content-Disposition:\s*(.*)/i)) != null ? _ref1[1] : void 0;
              return cb(makeBlob(data, contentType, contentDisposition, url));
            },
            onerror: function() {
              return cb(null);
            }
          });
        };
      })(),
      json: (function() {
        var callbacks, responses;
        callbacks = {};
        responses = {};
        return function(url, cb) {
          if (responses[url]) {
            cb(responses[url]);
            return;
          }
          if (callbacks[url]) {
            callbacks[url].push(cb);
            return;
          }
          callbacks[url] = [cb];
          return GM_xmlhttpRequest({
            method: "GET",
            url: url + '',
            onload: function(xhr) {
              var response, _i, _len, _ref;
              response = JSON.parse(xhr.responseText);
              _ref = callbacks[url];
              for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                cb = _ref[_i];
                cb(response);
              }
              delete callbacks[url];
              return responses[url] = response;
            },
            onerror: function() {
              return delete callbacks[url];
            },
            onabort: function() {
              return delete callbacks[url];
            }
          });
        };
      })()
    };
  })();

  Anonymize = {
    init: function() {
      var _ref;
      if (((_ref = g.VIEW) !== 'index' && _ref !== 'thread' && _ref !== 'archive') || !Conf['Anonymize']) {
        return;
      }
      if (g.VIEW === 'archive') {
        return this.archive();
      }
      return Post.callbacks.push({
        name: 'Anonymize',
        cb: this.node
      });
    },
    node: function() {
      var email, name, tripcode, _ref;
      if (this.info.capcode || this.isClone) {
        return;
      }
      _ref = this.nodes, name = _ref.name, tripcode = _ref.tripcode, email = _ref.email;
      if (this.info.name !== 'Anonymous') {
        name.textContent = 'Anonymous';
      }
      if (tripcode) {
        $.rm(tripcode);
        delete this.nodes.tripcode;
      }
      if (this.info.email) {
        $.replace(email, name);
        return delete this.nodes.email;
      }
    },
    archive: function() {
      return $.ready(function() {
        var name, trip, _i, _j, _len, _len1, _ref, _ref1, _results;
        _ref = $$('.name');
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          name = _ref[_i];
          name.textContent = 'Anonymous';
        }
        _ref1 = $$('.postertrip');
        _results = [];
        for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
          trip = _ref1[_j];
          _results.push($.rm(trip));
        }
        return _results;
      });
    }
  };

  Filter = {
    filters: {},
    init: function() {
      var boards, err, filter, hl, key, line, op, regexp, stub, top, _i, _len, _ref, _ref1, _ref2, _ref3, _ref4, _ref5, _ref6;
      if (((_ref = g.VIEW) !== 'index' && _ref !== 'thread') || !Conf['Filter']) {
        return;
      }
      if (!Conf['Filtered Backlinks']) {
        $.addClass(doc, 'hide-backlinks');
      }
      for (key in Config.filter) {
        this.filters[key] = [];
        _ref1 = Conf[key].split('\n');
        for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
          line = _ref1[_i];
          if (line[0] === '#') {
            continue;
          }
          if (!(regexp = line.match(/\/(.+)\/(\w*)/))) {
            continue;
          }
          filter = line.replace(regexp[0], '');
          boards = ((_ref2 = filter.match(/boards:([^;]+)/)) != null ? _ref2[1].toLowerCase() : void 0) || 'global';
          if (boards !== 'global' && (_ref3 = g.BOARD.ID, __indexOf.call(boards.split(','), _ref3) < 0)) {
            continue;
          }
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
          op = ((_ref4 = filter.match(/[^t]op:(yes|no|only)/)) != null ? _ref4[1] : void 0) || 'yes';
          stub = (function() {
            var _ref5;
            switch ((_ref5 = filter.match(/stub:(yes|no)/)) != null ? _ref5[1] : void 0) {
              case 'yes':
                return true;
              case 'no':
                return false;
              default:
                return Conf['Stubs'];
            }
          })();
          if (hl = /highlight/.test(filter)) {
            hl = ((_ref5 = filter.match(/highlight:(\w+)/)) != null ? _ref5[1] : void 0) || 'filter-highlight';
            top = ((_ref6 = filter.match(/top:(yes|no)/)) != null ? _ref6[1] : void 0) || 'yes';
            top = top === 'yes';
          }
          this.filters[key].push(this.createFilter(regexp, op, stub, hl, top));
        }
        if (!this.filters[key].length) {
          delete this.filters[key];
        }
      }
      if (!Object.keys(this.filters).length) {
        return;
      }
      return Post.callbacks.push({
        name: 'Filter',
        cb: this.node
      });
    },
    createFilter: function(regexp, op, stub, hl, top) {
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
      return function(value, isReply) {
        if (isReply && op === 'only' || !isReply && op === 'no') {
          return false;
        }
        if (!test(value)) {
          return false;
        }
        return settings;
      };
    },
    node: function() {
      var filter, key, result, value, _i, _len, _ref, _ref1;
      if (this.isClone || this.isFetchedQuote) {
        return;
      }
      for (key in Filter.filters) {
        value = Filter[key](this);
        if (value === false) {
          continue;
        }
        _ref = Filter.filters[key];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          filter = _ref[_i];
          if (!(result = filter(value, this.isReply))) {
            continue;
          }
          if (result.hide) {
            if (this.isReply) {
              PostHiding.hide(this, result.stub);
            } else if (g.VIEW === 'index') {
              ThreadHiding.hide(this.thread, result.stub);
            } else {
              continue;
            }
            return;
          }
          $.addClass(this.nodes.root, result["class"]);
          if (!(this.highlights && (_ref1 = result["class"], __indexOf.call(this.highlights, _ref1) >= 0))) {
            (this.highlights || (this.highlights = [])).push(result["class"]);
          }
          if (!this.isReply && result.top) {
            this.thread.isOnTop = true;
          }
        }
      }
    },
    name: function(post) {
      if ('name' in post.info) {
        return post.info.name;
      }
      return false;
    },
    uniqueID: function(post) {
      if ('uniqueID' in post.info) {
        return post.info.uniqueID;
      }
      return false;
    },
    tripcode: function(post) {
      if ('tripcode' in post.info) {
        return post.info.tripcode;
      }
      return false;
    },
    capcode: function(post) {
      if ('capcode' in post.info) {
        return post.info.capcode;
      }
      return false;
    },
    subject: function(post) {
      if ('subject' in post.info) {
        return post.info.subject || false;
      }
      return false;
    },
    comment: function(post) {
      if ('comment' in post.info) {
        return post.info.comment;
      }
      return false;
    },
    flag: function(post) {
      if ('flag' in post.info) {
        return post.info.flag;
      }
      return false;
    },
    filename: function(post) {
      if (post.file) {
        return post.file.name;
      }
      return false;
    },
    dimensions: function(post) {
      var file;
      file = post.file;
      if (file && (file.isImage || file.isVideo)) {
        return file.dimensions;
      }
      return false;
    },
    filesize: function(post) {
      if (post.file) {
        return post.file.size;
      }
      return false;
    },
    MD5: function(post) {
      if (post.file) {
        return post.file.MD5;
      }
      return false;
    },
    menu: {
      init: function() {
        var div, entry, type, _i, _len, _ref, _ref1;
        if (((_ref = g.VIEW) !== 'index' && _ref !== 'thread') || !Conf['Menu'] || !Conf['Filter']) {
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
        _ref1 = [['Name', 'name'], ['Unique ID', 'uniqueID'], ['Tripcode', 'tripcode'], ['Capcode', 'capcode'], ['Subject', 'subject'], ['Comment', 'comment'], ['Flag', 'flag'], ['Filename', 'filename'], ['Image dimensions', 'dimensions'], ['Filesize', 'filesize'], ['Image MD5', 'MD5']];
        for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
          type = _ref1[_i];
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
            return value !== false;
          }
        };
      },
      makeFilter: function() {
        var re, type, value;
        type = this.dataset.type;
        value = Filter[type](Filter.menu.post);
        re = type === 'uniqueID' || type === 'MD5' ? value : value.replace(/\/|\\|\^|\$|\n|\.|\(|\)|\{|\}|\[|\]|\?|\*|\+|\|/g, function(c) {
          if (c === '\n') {
            return '\\n';
          } else if (c === '\\') {
            return '\\\\';
          } else {
            return "\\" + c;
          }
        });
        re = type === 'uniqueID' || type === 'MD5' ? "/" + re + "/" : "/^" + re + "$/";
        return $.get(type, Conf[type], function(item) {
          var save, section, select, ta, tl;
          save = item[type];
          save = save ? "" + save + "\n" + re : re;
          $.set(type, save);
          Settings.open('Filter');
          section = $('.section-container');
          select = $('select[name=filter]', section);
          select.value = type;
          Settings.selectFilter.call(select);
          ta = $('textarea', section);
          tl = ta.textLength;
          ta.setSelectionRange(tl, tl);
          return ta.focus();
        });
      }
    }
  };

  PostHiding = {
    init: function() {
      var _ref;
      if (((_ref = g.VIEW) !== 'index' && _ref !== 'thread') || !Conf['Reply Hiding Buttons'] && !(Conf['Menu'] && Conf['Reply Hiding Link'])) {
        return;
      }
      if (Conf['Reply Hiding Buttons']) {
        $.addClass(doc, "reply-hide");
      }
      this.db = new DataBoard('hiddenPosts');
      return Post.callbacks.push({
        name: 'Reply Hiding',
        cb: this.node
      });
    },
    node: function() {
      var data, sideArrows;
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
      sideArrows = $('.sideArrows', this.nodes.root);
      $.replace(sideArrows.firstChild, PostHiding.makeButton(this, 'hide'));
      return sideArrows.removeAttribute('class');
    },
    menu: {
      init: function() {
        var apply, div, hideStubLink, makeStub, replies, thisPost, _ref;
        if (((_ref = g.VIEW) !== 'index' && _ref !== 'thread') || !Conf['Menu'] || !Conf['Reply Hiding Link']) {
          return;
        }
        div = $.el('div', {
          className: 'hide-reply-link',
          textContent: 'Hide reply'
        });
        apply = $.el('a', {
          textContent: 'Apply',
          href: 'javascript:;'
        });
        $.on(apply, 'click', PostHiding.menu.hide);
        thisPost = UI.checkbox('thisPost', ' This post', true);
        replies = UI.checkbox('replies', ' Hide replies', Conf['Recursive Hiding']);
        makeStub = UI.checkbox('makeStub', ' Make stub', Conf['Stubs']);
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
          textContent: 'Show reply'
        });
        apply = $.el('a', {
          textContent: 'Apply',
          href: 'javascript:;'
        });
        $.on(apply, 'click', PostHiding.menu.show);
        thisPost = UI.checkbox('thisPost', ' This post', false);
        replies = UI.checkbox('replies', ' Show replies', false);
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
        className: "" + type + "-reply-button",
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
      var a, quotelink, _i, _len, _ref;
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
      _ref = Get.allQuotelinksLinkingTo(post);
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        quotelink = _ref[_i];
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
      var quotelink, _i, _len, _ref;
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
      _ref = Get.allQuotelinksLinkingTo(post);
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        quotelink = _ref[_i];
        $.rmClass(quotelink, 'filtered');
      }
    }
  };

  Recursive = {
    recursives: {},
    init: function() {
      var _ref;
      if ((_ref = g.VIEW) !== 'index' && _ref !== 'thread') {
        return;
      }
      return Post.callbacks.push({
        name: 'Recursive',
        cb: this.node
      });
    },
    node: function() {
      var i, obj, quote, recursive, _i, _j, _len, _len1, _ref, _ref1;
      if (this.isClone || this.isFetchedQuote) {
        return;
      }
      _ref = this.quotes;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        quote = _ref[_i];
        if (obj = Recursive.recursives[quote]) {
          _ref1 = obj.recursives;
          for (i = _j = 0, _len1 = _ref1.length; _j < _len1; i = ++_j) {
            recursive = _ref1[i];
            recursive.apply(null, [this].concat(__slice.call(obj.args[i])));
          }
        }
      }
    },
    add: function() {
      var args, obj, post, recursive, _base, _name;
      recursive = arguments[0], post = arguments[1], args = 3 <= arguments.length ? __slice.call(arguments, 2) : [];
      obj = (_base = Recursive.recursives)[_name = post.fullID] || (_base[_name] = {
        recursives: [],
        args: []
      });
      obj.recursives.push(recursive);
      return obj.args.push(args);
    },
    rm: function(recursive, post) {
      var i, obj, rec, _i, _len, _ref;
      if (!(obj = Recursive.recursives[post.fullID])) {
        return;
      }
      _ref = obj.recursives;
      for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
        rec = _ref[i];
        if (rec === recursive) {
          obj.recursives.splice(i, 1);
          obj.args.splice(i, 1);
        }
      }
    },
    apply: function() {
      var args, fullID, post, recursive;
      recursive = arguments[0], post = arguments[1], args = 3 <= arguments.length ? __slice.call(arguments, 2) : [];
      fullID = post.fullID;
      return g.posts.forEach(function(post) {
        if (__indexOf.call(post.quotes, fullID) >= 0) {
          return recursive.apply(null, [post].concat(__slice.call(args)));
        }
      });
    }
  };

  ThreadHiding = {
    init: function() {
      var _ref;
      if (((_ref = g.VIEW) !== 'index' && _ref !== 'catalog') || !Conf['Thread Hiding Buttons'] && !(Conf['Menu'] && Conf['Thread Hiding Link']) && !Conf['JSON Navigation']) {
        return;
      }
      this.db = new DataBoard('hiddenThreads');
      if (g.VIEW === 'catalog') {
        return this.catalogWatch();
      }
      this.catalogSet(g.BOARD);
      return Thread.callbacks.push({
        name: 'Thread Hiding',
        cb: this.node
      });
    },
    catalogSet: function(board) {
      var hiddenThreads, threadID;
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
      this.hiddenThreads = JSON.parse(localStorage.getItem("4chan-hide-t-" + g.BOARD)) || {};
      return $.ready(function() {
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
    node: function() {
      var data;
      if (data = ThreadHiding.db.get({
        boardID: this.board.ID,
        threadID: this.ID
      })) {
        ThreadHiding.hide(this, data.makeStub);
      }
      if (!Conf['Thread Hiding Buttons']) {
        return;
      }
      return $.prepend(this.OP.nodes.root, ThreadHiding.makeButton(this, 'hide'));
    },
    onIndexBuild: function(nodes) {
      var root, thread, _i, _len;
      for (_i = 0, _len = nodes.length; _i < _len; _i++) {
        root = nodes[_i];
        thread = Get.threadFromRoot(root);
        if (thread.isHidden && thread.stub && !root.contains(thread.stub)) {
          ThreadHiding.makeStub(thread, root);
        }
      }
    },
    menu: {
      init: function() {
        var apply, div, hideStubLink, makeStub;
        if (g.VIEW !== 'index' || !Conf['Menu'] || !Conf['Thread Hiding Link']) {
          return;
        }
        div = $.el('div', {
          className: 'hide-thread-link',
          textContent: 'Hide thread'
        });
        apply = $.el('a', {
          textContent: 'Apply',
          href: 'javascript:;'
        });
        $.on(apply, 'click', ThreadHiding.menu.hide);
        makeStub = UI.checkbox('Stubs', ' Make stub');
        Menu.menu.addEntry({
          el: div,
          order: 20,
          open: function(_arg) {
            var isReply, thread;
            thread = _arg.thread, isReply = _arg.isReply;
            if (isReply || thread.isHidden || Conf['JSON Navigation'] && Conf['Index Mode'] === 'catalog') {
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
          textContent: 'Show thread',
          href: 'javascript:;'
        });
        $.on(div, 'click', ThreadHiding.menu.show);
        Menu.menu.addEntry({
          el: div,
          order: 20,
          open: function(_arg) {
            var isReply, thread;
            thread = _arg.thread, isReply = _arg.isReply;
            if (isReply || !thread.isHidden || Conf['JSON Navigation'] && Conf['Index Mode'] === 'catalog') {
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
          open: function(_arg) {
            var isReply, thread;
            thread = _arg.thread, isReply = _arg.isReply;
            if (isReply || !thread.isHidden || Conf['JSON Navigation'] && Conf['Index Mode'] === 'catalog') {
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
        className: "" + type + "-thread-button",
        href: 'javascript:;'
      });
      $.extend(a, {
        innerHTML: "<span class=\"fa fa-" + E((type === "hide") ? "minus" : "plus") + "-square\"></span>"
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
      $.add(a, $.tn(" " + thread.OP.info.nameBlock + " (" + (numReplies === 1 ? '1 reply' : "" + numReplies + " replies") + ")"));
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
      threadRoot = thread.OP.nodes.root.parentNode;
      thread.isHidden = true;
      if (Conf['JSON Navigation']) {
        Index.updateHideLabel();
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
      threadRoot = thread.OP.nodes.root.parentNode;
      threadRoot.hidden = thread.isHidden = false;
      if (Conf['JSON Navigation']) {
        return Index.updateHideLabel();
      }
    }
  };

  QuoteBacklink = {
    containers: {},
    init: function() {
      var _ref;
      if (((_ref = g.VIEW) !== 'index' && _ref !== 'thread') || !Conf['Quote Backlinks']) {
        return;
      }
      Post.callbacks.push({
        name: 'Quote Backlinking Part 1',
        cb: this.firstNode
      });
      return Post.callbacks.push({
        name: 'Quote Backlinking Part 2',
        cb: this.secondNode
      });
    },
    firstNode: function() {
      var a, clone, container, containers, hash, link, markYours, nodes, post, quote, _i, _j, _k, _len, _len1, _len2, _ref, _ref1;
      if (this.isClone || !this.quotes.length) {
        return;
      }
      markYours = Conf['Quick Reply'] && Conf['Mark Quotes of You'] && QR.db.get({
        boardID: this.board.ID,
        threadID: this.thread.ID,
        postID: this.ID
      });
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
        })(this)) + (markYours ? '\u00A0(You)' : '')
      });
      _ref = this.quotes;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        quote = _ref[_i];
        containers = [QuoteBacklink.getContainer(quote)];
        if ((post = g.posts[quote]) && post.nodes.backlinkContainer) {
          _ref1 = post.clones;
          for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
            clone = _ref1[_j];
            containers.push(clone.nodes.backlinkContainer);
          }
        }
        for (_k = 0, _len2 = containers.length; _k < _len2; _k++) {
          container = containers[_k];
          nodes = [$.tn(' '), link = a.cloneNode(true)];
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
        this.nodes.backlinkContainer = $('.container', this.nodes.info);
        return;
      }
      if (!(this.isReply || Conf['OP Backlinks'])) {
        return;
      }
      container = QuoteBacklink.getContainer(this.fullID);
      this.nodes.backlinkContainer = container;
      return $.add(this.nodes.info, container);
    },
    getContainer: function(id) {
      var _base;
      return (_base = this.containers)[id] || (_base[id] = $.el('span', {
        className: 'container'
      }));
    }
  };

  QuoteCT = {
    init: function() {
      var _ref;
      if (((_ref = g.VIEW) !== 'index' && _ref !== 'thread') || !Conf['Mark Cross-thread Quotes']) {
        return;
      }
      if (Conf['Comment Expansion']) {
        ExpandComment.callbacks.push(this.node);
      }
      this.text = '\u00A0(Cross-thread)';
      return Post.callbacks.push({
        name: 'Mark Cross-thread Quotes',
        cb: this.node
      });
    },
    node: function() {
      var board, boardID, quotelink, thread, threadID, _i, _len, _ref, _ref1, _ref2;
      if (this.isClone && this.thread === this.context.thread) {
        return;
      }
      _ref = this.isClone ? this.context : this, board = _ref.board, thread = _ref.thread;
      _ref1 = this.nodes.quotelinks;
      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
        quotelink = _ref1[_i];
        _ref2 = Get.postDataFromLink(quotelink), boardID = _ref2.boardID, threadID = _ref2.threadID;
        if (!threadID) {
          continue;
        }
        if (this.isClone) {
          quotelink.textContent = quotelink.textContent.replace(QuoteCT.text, '');
        }
        if (boardID === board.ID && threadID !== thread.ID) {
          $.add(quotelink, $.tn(QuoteCT.text));
        }
      }
    }
  };

  QuoteInline = {
    init: function() {
      var _ref;
      if (((_ref = g.VIEW) !== 'index' && _ref !== 'thread') || !Conf['Quote Inlining']) {
        return;
      }
      this.process = Conf['Quote Hash Navigation'] ? function(link, clone) {
        if (!clone) {
          $.after(link, QuoteInline.qiQuote(link, $.hasClass(link, 'filtered')));
        }
        return $.on(link, 'click', QuoteInline.toggle);
      } : function(link) {
        return $.on(link, 'click', QuoteInline.toggle);
      };
      if (Conf['Comment Expansion']) {
        ExpandComment.callbacks.push(this.node);
      }
      return Post.callbacks.push({
        name: 'Quote Inlining',
        cb: this.node
      });
    },
    node: function() {
      var isClone, link, process, _i, _j, _len, _len1, _ref, _ref1;
      process = QuoteInline.process;
      isClone = this.isClone;
      _ref = this.nodes.quotelinks;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        link = _ref[_i];
        process(link, isClone);
      }
      _ref1 = this.nodes.backlinks;
      for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
        link = _ref1[_j];
        process(link, isClone);
      }
    },
    qiQuote: function(link, hidden) {
      return $.el('a', {
        className: "hashlink" + (hidden ? ' filtered' : ''),
        textContent: '#',
        href: link.href
      });
    },
    toggle: function(e) {
      var boardID, context, postID, threadID, _ref;
      if (e.shiftKey || e.altKey || e.ctrlKey || e.metaKey || e.button !== 0) {
        return;
      }
      e.preventDefault();
      _ref = Get.postDataFromLink(this), boardID = _ref.boardID, threadID = _ref.threadID, postID = _ref.postID;
      context = Get.contextFromNode(this);
      if ($.hasClass(this, 'inlined')) {
        QuoteInline.rm(this, boardID, threadID, postID, context);
      } else {
        if ($.x("ancestor::div[@id='p" + postID + "']", this)) {
          return;
        }
        QuoteInline.add(this, boardID, threadID, postID, context);
      }
      return this.classList.toggle('inlined');
    },
    findRoot: function(quotelink, isBacklink) {
      if (isBacklink) {
        return quotelink.parentNode.parentNode;
      } else {
        return $.x('ancestor-or-self::*[parent::blockquote][1]', quotelink);
      }
    },
    add: function(quotelink, boardID, threadID, postID, context) {
      var inline, isBacklink, post, qroot, root;
      isBacklink = $.hasClass(quotelink, 'backlink');
      inline = $.el('div', {
        id: "i" + postID,
        className: 'inline'
      });
      root = QuoteInline.findRoot(quotelink, isBacklink);
      $.after(root, inline);
      qroot = $.x('ancestor::*[contains(@class,"postContainer")][1]', root);
      $.addClass(qroot, 'hasInline');
      Get.postClone(boardID, threadID, postID, inline, context);
      if (!((post = g.posts["" + boardID + "." + postID]) && context.thread === post.thread)) {
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
      var el, inlined, isBacklink, post, qroot, root, _ref;
      isBacklink = $.hasClass(quotelink, 'backlink');
      root = QuoteInline.findRoot(quotelink, isBacklink);
      root = $.x("following-sibling::div[@id='i" + postID + "'][1]", root);
      qroot = $.x('ancestor::*[contains(@class,"postContainer")][1]', root);
      $.rm(root);
      if (!$('.inline', qroot)) {
        $.rmClass(qroot, 'hasInline');
      }
      if (!(el = root.firstElementChild)) {
        return;
      }
      post = g.posts["" + boardID + "." + postID];
      post.rmClone(el.dataset.clone);
      if (Conf['Forward Hiding'] && isBacklink && context.thread === g.threads["" + boardID + "." + threadID] && !--post.forwarded) {
        delete post.forwarded;
        $.rmClass(post.nodes.root, 'forwarded');
      }
      while (inlined = $('.inlined', el)) {
        _ref = Get.postDataFromLink(inlined), boardID = _ref.boardID, threadID = _ref.threadID, postID = _ref.postID;
        QuoteInline.rm(inlined, boardID, threadID, postID, context);
        $.rmClass(inlined, 'inlined');
      }
    }
  };

  QuoteOP = {
    init: function() {
      var _ref;
      if (((_ref = g.VIEW) !== 'index' && _ref !== 'thread') || !Conf['Mark OP Quotes']) {
        return;
      }
      if (Conf['Comment Expansion']) {
        ExpandComment.callbacks.push(this.node);
      }
      this.text = '\u00A0(OP)';
      return Post.callbacks.push({
        name: 'Mark OP Quotes',
        cb: this.node
      });
    },
    node: function() {
      var boardID, fullID, i, postID, quotelink, quotelinks, quotes, _ref, _ref1;
      if (this.isClone && this.thread === this.context.thread) {
        return;
      }
      if (!(quotes = this.quotes).length) {
        return;
      }
      quotelinks = this.nodes.quotelinks;
      if (this.isClone && (_ref = this.thread.fullID, __indexOf.call(quotes, _ref) >= 0)) {
        i = 0;
        while (quotelink = quotelinks[i++]) {
          quotelink.textContent = quotelink.textContent.replace(QuoteOP.text, '');
        }
      }
      fullID = (this.isClone ? this.context : this).thread.fullID;
      if (__indexOf.call(quotes, fullID) < 0) {
        return;
      }
      i = 0;
      while (quotelink = quotelinks[i++]) {
        _ref1 = Get.postDataFromLink(quotelink), boardID = _ref1.boardID, postID = _ref1.postID;
        if (("" + boardID + "." + postID) === fullID) {
          $.add(quotelink, $.tn(QuoteOP.text));
        }
      }
    }
  };

  QuotePreview = {
    init: function() {
      var _ref;
      if (((_ref = g.VIEW) !== 'index' && _ref !== 'thread') || !Conf['Quote Previewing']) {
        return;
      }
      if (Conf['Comment Expansion']) {
        ExpandComment.callbacks.push(this.node);
      }
      return Post.callbacks.push({
        name: 'Quote Previewing',
        cb: this.node
      });
    },
    node: function() {
      var link, _i, _len, _ref;
      _ref = this.nodes.quotelinks.concat(__slice.call(this.nodes.backlinks));
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        link = _ref[_i];
        $.on(link, 'mouseover', QuotePreview.mouseover);
      }
    },
    mouseover: function(e) {
      var boardID, clone, origin, post, postID, posts, qp, quote, quoterID, threadID, _i, _j, _len, _len1, _ref, _ref1;
      if ($.hasClass(this, 'inlined')) {
        return;
      }
      _ref = Get.postDataFromLink(this), boardID = _ref.boardID, threadID = _ref.threadID, postID = _ref.postID;
      qp = $.el('div', {
        id: 'qp',
        className: 'dialog'
      });
      $.add(Header.hover, qp);
      Get.postClone(boardID, threadID, postID, qp, Get.contextFromNode(this));
      UI.hover({
        root: this,
        el: qp,
        latestEvent: e,
        endEvents: 'mouseout click',
        cb: QuotePreview.mouseout,
        asapTest: function() {
          return qp.firstElementChild;
        }
      });
      if (!(origin = g.posts["" + boardID + "." + postID])) {
        return;
      }
      if (Conf['Quote Highlighting']) {
        posts = [origin].concat(origin.clones);
        posts.pop();
        for (_i = 0, _len = posts.length; _i < _len; _i++) {
          post = posts[_i];
          $.addClass(post.nodes.post, 'qphl');
        }
      }
      quoterID = $.x('ancestor::*[@id][1]', this).id.match(/\d+$/)[0];
      clone = Get.postFromRoot(qp.firstChild);
      _ref1 = clone.nodes.quotelinks.concat(__slice.call(clone.nodes.backlinks));
      for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
        quote = _ref1[_j];
        if (quote.hash.slice(2) === quoterID) {
          $.addClass(quote, 'forwardlink');
        }
      }
    },
    mouseout: function() {
      var clone, post, root, _i, _len, _ref;
      if (!(root = this.el.firstElementChild)) {
        return;
      }
      clone = Get.postFromRoot(root);
      post = clone.origin;
      post.rmClone(root.dataset.clone);
      if (!Conf['Quote Highlighting']) {
        return;
      }
      _ref = [post].concat(post.clones);
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        post = _ref[_i];
        $.rmClass(post.nodes.post, 'qphl');
      }
    }
  };

  QuoteStrikeThrough = {
    init: function() {
      var _ref;
      if (((_ref = g.VIEW) !== 'index' && _ref !== 'thread') || !Conf['Reply Hiding Buttons'] && !(Conf['Menu'] && Conf['Reply Hiding Link']) && !Conf['Filter']) {
        return;
      }
      return Post.callbacks.push({
        name: 'Strike-through Quotes',
        cb: this.node
      });
    },
    node: function() {
      var boardID, postID, quotelink, _i, _len, _ref, _ref1, _ref2;
      if (this.isClone) {
        return;
      }
      _ref = this.nodes.quotelinks;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        quotelink = _ref[_i];
        _ref1 = Get.postDataFromLink(quotelink), boardID = _ref1.boardID, postID = _ref1.postID;
        if ((_ref2 = g.posts["" + boardID + "." + postID]) != null ? _ref2.isHidden : void 0) {
          $.addClass(quotelink, 'filtered');
        }
      }
    }
  };


  /*
    <3 aeosynth
   */

  QuoteThreading = {
    init: function() {
      if (!(Conf['Quote Threading'] && g.VIEW === 'thread')) {
        return;
      }
      this.enabled = true;
      this.controls = $.el('span', {
        innerHTML: "<label><input id=\"threadingControl\" type=\"checkbox\" checked> Threading</label>"
      });
      this.threadNewLink = $.el('span', {
        className: 'brackets-wrap threadnewlink',
        hidden: true
      });
      $.extend(this.threadNewLink, {
        innerHTML: "<a href=\"javascript:;\">Thread New Posts</a>"
      });
      $.on($('input', this.controls), 'change', function() {
        return QuoteThreading.rethread(this.checked);
      });
      $.on(this.threadNewLink.firstElementChild, 'click', function() {
        QuoteThreading.threadNewLink.hidden = true;
        return QuoteThreading.rethread(true);
      });
      Header.menu.addEntry(this.entry = {
        el: this.controls,
        order: 98
      });
      Thread.callbacks.push({
        name: 'Quote Threading',
        cb: this.setThread
      });
      return Post.callbacks.push({
        name: 'Quote Threading',
        cb: this.node
      });
    },
    parent: {},
    children: {},
    inserted: {},
    setThread: function() {
      QuoteThreading.thread = this;
      return $.asap((function() {
        return !Conf['Thread Updater'] || $('.navLinksBot > .updatelink');
      }), function() {
        return $.add($('.navLinksBot'), [$.tn(' '), QuoteThreading.threadNewLink]);
      });
    },
    node: function() {
      var parent, parents, quote, thread;
      if (this.isFetchedQuote || this.isClone || !this.isReply) {
        return;
      }
      thread = QuoteThreading.thread;
      parents = (function() {
        var _i, _len, _ref, _results;
        _ref = this.quotes;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          quote = _ref[_i];
          parent = g.posts[quote];
          if (!parent || parent.isFetchedQuote || !parent.isReply || parent.ID >= this.ID) {
            continue;
          }
          _results.push(parent);
        }
        return _results;
      }).call(this);
      if (parents.length === 1) {
        return QuoteThreading.parent[this.fullID] = parents[0];
      }
    },
    descendants: function(post) {
      var child, children, posts, _i, _len;
      posts = [post];
      if (children = QuoteThreading.children[post.fullID]) {
        for (_i = 0, _len = children.length; _i < _len; _i++) {
          child = children[_i];
          posts = posts.concat(QuoteThreading.descendants(child));
        }
      }
      return posts;
    },
    insert: function(post) {
      var child, children, descendants, i, next, nodes, order, parent, prev, prev2, threadContainer, x, _base, _i, _j, _k, _len, _name;
      if (!(QuoteThreading.enabled && (parent = QuoteThreading.parent[post.fullID]) && !QuoteThreading.inserted[post.fullID])) {
        return false;
      }
      descendants = QuoteThreading.descendants(post);
      if (!Unread.posts.has(parent.ID) && descendants.some(function(x) {
        return Unread.posts.has(x.ID);
      })) {
        QuoteThreading.threadNewLink.hidden = false;
        return false;
      }
      order = Unread.order;
      children = ((_base = QuoteThreading.children)[_name = parent.fullID] || (_base[_name] = []));
      threadContainer = parent.nodes.threadContainer || $.el('div', {
        className: 'threadContainer'
      });
      nodes = [post.nodes.root];
      if (post.nodes.threadContainer) {
        nodes.push(post.nodes.threadContainer);
      }
      i = children.length;
      for (_i = children.length - 1; _i >= 0; _i += -1) {
        child = children[_i];
        if (child.ID >= post.ID) {
          i--;
        }
      }
      if (i !== children.length) {
        next = children[i];
        for (_j = 0, _len = descendants.length; _j < _len; _j++) {
          x = descendants[_j];
          order.before(order[next.ID], order[x.ID]);
        }
        children.splice(i, 0, post);
        $.before(next.nodes.root, nodes);
      } else {
        prev = parent;
        while ((prev2 = QuoteThreading.children[prev.fullID]) && prev2.length) {
          prev = prev2[prev2.length - 1];
        }
        for (_k = descendants.length - 1; _k >= 0; _k += -1) {
          x = descendants[_k];
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
    rethread: function(enabled) {
      var nodes, posts, thread;
      thread = QuoteThreading.thread;
      posts = thread.posts;
      if (QuoteThreading.enabled = enabled) {
        posts.forEach(QuoteThreading.insert);
      } else {
        nodes = [];
        Unread.order = new RandomAccessList;
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
        $.add(thread.OP.nodes.root.parentNode, nodes);
      }
      Unread.position = Unread.order.first;
      Unread.updatePosition();
      Unread.setLine(true);
      Unread.read();
      return Unread.update();
    }
  };

  QuoteYou = {
    init: function() {
      var _ref;
      if (!(((_ref = g.VIEW) === 'index' || _ref === 'thread') && Conf['Mark Quotes of You'] && Conf['Quick Reply'])) {
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
      this.text = '\u00A0(You)';
      return Post.callbacks.push({
        name: 'Mark Quotes of You',
        cb: this.node
      });
    },
    node: function() {
      var quotelink, _i, _len, _ref;
      if (this.isClone) {
        return;
      }
      if (QR.db.get({
        boardID: this.board.ID,
        threadID: this.thread.ID,
        postID: this.ID
      })) {
        $.addClass(this.nodes.root, 'yourPost');
      }
      if (!this.quotes.length) {
        return;
      }
      _ref = this.nodes.quotelinks;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        quotelink = _ref[_i];
        if (!(QR.db.get(Get.postDataFromLink(quotelink)))) {
          continue;
        }
        $.add(quotelink, $.tn(QuoteYou.text));
        $.addClass(quotelink, 'you');
        $.addClass(this.nodes.root, 'quotesYou');
      }
    },
    cb: {
      seek: function(type) {
        var highlight, post, posts, result, str;
        if (!(Conf['Mark Quotes of You'] && Conf['Quick Reply'])) {
          return;
        }
        if (highlight = $('.highlight')) {
          $.rmClass(highlight, 'highlight');
        }
        if (!QuoteYou.lastRead) {
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
        str = "" + type + "::div[contains(@class,'quotesYou')]";
        while (post = (result = $.X(str, post)).snapshotItem(type === 'preceding' ? result.snapshotLength - 1 : 0)) {
          if (QuoteYou.cb.scroll(post)) {
            return;
          }
        }
        posts = $$('.quotesYou');
        return QuoteYou.cb.scroll(posts[type === 'following' ? 0 : posts.length - 1]);
      },
      scroll: function(post) {
        if (Get.postFromRoot(post).isHidden) {
          return false;
        } else {
          QuoteYou.lastRead = post;
          window.location = "#" + post.id;
          Header.scrollTo(post);
          $.addClass($('.post', post), 'highlight');
          return true;
        }
      }
    }
  };

  Quotify = {
    init: function() {
      var _ref;
      if (((_ref = g.VIEW) !== 'index' && _ref !== 'thread') || !Conf['Resurrect Quotes']) {
        return;
      }
      if (Conf['Comment Expansion']) {
        ExpandComment.callbacks.push(this.node);
      }
      return Post.callbacks.push({
        name: 'Resurrect Quotes',
        cb: this.node
      });
    },
    node: function() {
      var deadlink, _i, _len, _ref;
      _ref = $$('.deadlink', this.nodes.comment);
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        deadlink = _ref[_i];
        if (this.isClone) {
          if ($.hasClass(deadlink, 'quotelink')) {
            this.nodes.quotelinks.push(deadlink);
          }
        } else {
          Quotify.parseDeadlink.call(this, deadlink);
        }
      }
    },
    parseDeadlink: function(deadlink) {
      var a, boardID, fetchable, m, post, postID, quote, quoteID, redirect, _ref;
      if ($.hasClass(deadlink.parentNode, 'prettyprint')) {
        Quotify.fixDeadlink(deadlink);
        return;
      }
      quote = deadlink.textContent;
      if (!(postID = (_ref = quote.match(/\d+$/)) != null ? _ref[0] : void 0)) {
        return;
      }
      if (postID[0] === '0') {
        Quotify.fixDeadlink(deadlink);
        return;
      }
      boardID = (m = quote.match(/^>>>\/([a-z\d]+)/)) ? m[1] : this.board.ID;
      quoteID = "" + boardID + "." + postID;
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
            target: '_blank',
            textContent: "" + quote + "\u00A0(Dead)"
          });
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
            target: '_blank',
            textContent: "" + quote + "\u00A0(Dead)"
          });
          if (fetchable) {
            $.addClass(a, 'quotelink');
            $.extend(a.dataset, {
              boardID: boardID,
              postID: postID
            });
          }
        }
      }
      if (__indexOf.call(this.quotes, quoteID) < 0) {
        this.quotes.push(quoteID);
      }
      if (!a) {
        return deadlink.textContent = "" + quote + "\u00A0(Dead)";
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
      return $.replace(deadlink, __slice.call(deadlink.childNodes));
    }
  };

  QR = {
    mimeTypes: ['image/jpeg', 'image/png', 'image/gif', 'application/pdf', 'application/vnd.adobe.flash.movie', 'application/x-shockwave-flash', 'video/webm'],
    init: function() {
      var noscript, sc;
      if (!Conf['Quick Reply'] || g.VIEW === 'archive') {
        return;
      }
      this.db = new DataBoard('yourPosts');
      this.posts = [];
      $.globalEval('document.documentElement.dataset.jsEnabled = true;');
      noscript = Conf['Force Noscript Captcha'] || !doc.dataset.jsEnabled;
      this.captcha = Captcha[noscript ? 'noscript' : 'v2'];
      if (Conf['QR Shortcut']) {
        sc = $.el('a', {
          className: "qr-shortcut fa fa-comment-o " + (!Conf['Persistent QR'] ? 'disabled' : ''),
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
            QR.nodes.com.focus();
            return $.rmClass(this, 'disabled');
          } else {
            QR.close();
            return $.addClass(this, 'disabled');
          }
        });
        Header.addShortcut(sc);
      }
      if (Conf['Hide Original Post Form']) {
        $.addClass(doc, 'hide-original-post-form');
        if (!doc.dataset.jsEnabled) {
          $.onExists(doc, '#postForm noscript', true, $.rm);
        }
      }
      $.on(d, '4chanXInitFinished', this.initReady);
      window.addEventListener('focus', this.focus, true);
      window.addEventListener('blur', this.focus, true);
      $.on(d, 'click', this.focus);
      return Post.callbacks.push({
        name: 'Quick Reply',
        cb: this.node
      });
    },
    initReady: function() {
      var link, linkBot;
      $.off(d, '4chanXInitFinished', this.initReady);
      QR.postingIsEnabled = !!$.id('postForm');
      if (!QR.postingIsEnabled) {
        return;
      }
      link = $.el('h1', {
        className: "qr-link-container"
      });
      $.extend(link, {
        innerHTML: "<a href=\"javascript:;\" class=\"qr-link\">" + E((g.VIEW === "thread") ? "Reply to Thread" : "Start a Thread") + "</a>"
      });
      QR.link = link.firstElementChild;
      $.on(link.firstChild, 'click', function() {
        $.event('CloseMenu');
        QR.open();
        QR.nodes.com.focus();
        if (Conf['QR Shortcut']) {
          return $.rmClass($('.qr-shortcut'), 'disabled');
        }
      });
      if (Conf['Bottom QR Link'] && g.VIEW === 'thread') {
        linkBot = $.el('div', {
          className: "brackets-wrap qr-link-container-bottom"
        });
        $.extend(linkBot, {
          innerHTML: "<a href=\"javascript:;\" class=\"qr-link-bottom\">Reply to Thread</a>"
        });
        $.on(linkBot.firstElementChild, 'click', function() {
          $.event('CloseMenu');
          QR.open();
          QR.nodes.com.focus();
          if (Conf['QR Shortcut']) {
            return $.rmClass($('.qr-shortcut'), 'disabled');
          }
        });
        $.prepend($('.navLinksBot'), linkBot);
      }
      $.before($.id('togglePostFormLink'), link);
      $.on(d, 'paste', QR.paste);
      $.on(d, 'dragover', QR.dragOver);
      $.on(d, 'drop', QR.dropFile);
      $.on(d, 'dragstart dragend', QR.drag);
      $.on(d, 'IndexRefresh', QR.generatePostableThreadsList);
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
      if (thread !== 'new' && g.threads["" + g.BOARD + "." + thread].isDead) {
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
        return;
      }
      try {
        return QR.dialog();
      } catch (_error) {
        err = _error;
        delete QR.nodes;
        return Main.handleErrors({
          message: 'Quick Reply dialog creation crashed.',
          error: err
        });
      }
    },
    close: function() {
      var post, _i, _len, _ref;
      if (QR.req) {
        QR.abort();
        return;
      }
      QR.nodes.el.hidden = true;
      QR.cleanNotifications();
      d.activeElement.blur();
      $.rmClass(QR.nodes.el, 'dump');
      if (Conf['QR Shortcut']) {
        $.toggleClass($('.qr-shortcut'), 'disabled');
      }
      new QR.post(true);
      _ref = QR.posts.splice(0, QR.posts.length - 1);
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        post = _ref[_i];
        post["delete"]();
      }
      QR.cooldown.auto = false;
      QR.status();
      return QR.captcha.destroy();
    },
    focus: function() {
      return $.queueTask(function() {
        var focus;
        if (!QR.nodes) {
          return;
        }
        if (!$$('.goog-bubble-content > iframe').some(function(el) {
          return el.getBoundingClientRect().top >= 0;
        })) {
          focus = d.activeElement && QR.nodes.el.contains(d.activeElement);
          $[focus ? 'addClass' : 'rmClass'](QR.nodes.el, 'focus');
        }
        if (typeof chrome !== "undefined" && chrome !== null) {
          if (d.activeElement && QR.nodes.el.contains(d.activeElement) && d.activeElement.nodeName === 'IFRAME') {
            QR.scrollY = window.scrollY;
            return $.on(d, 'scroll', QR.scrollLock);
          } else {
            return $.off(d, 'scroll', QR.scrollLock);
          }
        }
      });
    },
    scrollLock: function(e) {
      if (d.activeElement && QR.nodes.el.contains(d.activeElement) && d.activeElement.nodeName === 'IFRAME') {
        return window.scroll(window.scrollX, QR.scrollY);
      } else {
        return $.off(d, 'scroll', QR.scrollLock);
      }
    },
    hide: function() {
      d.activeElement.blur();
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
    error: function(err) {
      var el;
      QR.open();
      if (typeof err === 'string') {
        el = $.tn(err);
      } else {
        el = err;
        el.removeAttribute('style');
      }
      if (QR.captcha.isEnabled && /captcha|verification/i.test(el.textContent)) {
        QR.captcha.setup(true);
        QR.captcha.notify(el);
      } else {
        QR.notify(el);
      }
      if (d.hidden) {
        return alert(el.textContent);
      }
    },
    notify: function(el) {
      var notice, notif;
      notice = new Notice('warning', el);
      if (!(Header.areNotificationsEnabled && d.hidden)) {
        return QR.notifications.push(notice);
      } else {
        notif = new Notification(el.textContent, {
          body: el.textContent,
          icon: Favicon.logo
        });
        return notif.onclick = function() {
          return window.focus();
        };
      }
    },
    notifications: [],
    cleanNotifications: function() {
      var notification, _i, _len, _ref;
      _ref = QR.notifications;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        notification = _ref[_i];
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
      if (thread !== 'new' && g.threads["" + g.BOARD + "." + thread].isDead) {
        value = 'Dead';
        disabled = true;
        QR.cooldown.auto = false;
      }
      value = QR.req ? QR.req.progress : QR.cooldown.seconds || value;
      status = QR.nodes.status;
      status.value = !value ? 'Submit' : QR.cooldown.auto ? "Auto " + value : value;
      return status.disabled = disabled || false;
    },
    quote: function(e) {
      var ancestor, caretPos, com, frag, index, insideCode, node, post, range, sel, text, thread, _i, _j, _k, _l, _len, _len1, _len2, _len3, _len4, _len5, _m, _n, _ref, _ref1, _ref2, _ref3, _ref4, _ref5, _ref6, _ref7;
      if (e != null) {
        e.preventDefault();
      }
      if (!QR.postingIsEnabled) {
        return;
      }
      sel = d.getSelection();
      post = Get.postFromNode(this);
      text = post.board.ID === g.BOARD.ID ? ">>" + post + "\n" : ">>>/" + post.board + "/" + post + "\n";
      if (sel.toString().trim() && post === Get.postFromNode(sel.anchorNode)) {
        range = sel.getRangeAt(0);
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
        _ref = $$((insideCode ? 'br' : '.prettyprint br'), frag);
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          node = _ref[_i];
          $.replace(node, $.tn('\n'));
        }
        _ref1 = $$('br', frag);
        for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
          node = _ref1[_j];
          if (node !== frag.lastChild) {
            $.replace(node, $.tn('\n>'));
          }
        }
        _ref2 = $$('s, .removed-spoiler', frag);
        for (_k = 0, _len2 = _ref2.length; _k < _len2; _k++) {
          node = _ref2[_k];
          $.replace(node, [$.tn('[spoiler]')].concat(__slice.call(node.childNodes), [$.tn('[/spoiler]')]));
        }
        _ref3 = $$('.prettyprint', frag);
        for (_l = 0, _len3 = _ref3.length; _l < _len3; _l++) {
          node = _ref3[_l];
          $.replace(node, [$.tn('[code]')].concat(__slice.call(node.childNodes), [$.tn('[/code]')]));
        }
        _ref4 = $$('.linkify[data-original]', frag);
        for (_m = 0, _len4 = _ref4.length; _m < _len4; _m++) {
          node = _ref4[_m];
          $.replace(node, $.tn(node.dataset.original));
        }
        _ref5 = $$('.embedder', frag);
        for (_n = 0, _len5 = _ref5.length; _n < _len5; _n++) {
          node = _ref5[_n];
          if (((_ref6 = node.previousSibling) != null ? _ref6.nodeValue : void 0) === ' ') {
            $.rm(node.previousSibling);
          }
          $.rm(node);
        }
        text += ">" + (frag.textContent.trim()) + "\n";
      }
      QR.open();
      if (QR.selected.isLocked) {
        index = QR.posts.indexOf(QR.selected);
        (QR.posts[index + 1] || new QR.post()).select();
        $.addClass(QR.nodes.el, 'dump');
        QR.cooldown.auto = true;
      }
      _ref7 = QR.nodes, com = _ref7.com, thread = _ref7.thread;
      if (!com.value) {
        thread.value = Get.threadFromNode(this);
      }
      caretPos = com.selectionStart;
      com.value = com.value.slice(0, caretPos) + text + com.value.slice(com.selectionEnd);
      range = caretPos + text.length;
      com.setSelectionRange(range, range);
      com.focus();
      QR.selected.save(com);
      QR.selected.save(thread);
      if (Conf['QR Shortcut']) {
        return $.rmClass($('.qr-shortcut'), 'disabled');
      }
    },
    characterCount: function() {
      var count, counter;
      counter = QR.nodes.charCount;
      count = QR.nodes.com.textLength;
      counter.textContent = count;
      counter.hidden = count < 1000;
      return (count > 1500 ? $.addClass : $.rmClass)(counter, 'warning');
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
      var blob, files, item, _i, _len, _ref;
      if (!e.clipboardData.items) {
        return;
      }
      files = [];
      _ref = e.clipboardData.items;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        item = _ref[_i];
        if (!(item.kind === 'file')) {
          continue;
        }
        blob = item.getAsFile();
        blob.name = 'file';
        if (blob.type) {
          blob.name += '.' + blob.type.split('/')[1];
        }
        files.push(blob);
      }
      if (!files.length) {
        return;
      }
      QR.open();
      QR.handleFiles(files);
      return $.addClass(QR.nodes.el, 'dump');
    },
    handleUrl: function() {
      var url;
      url = prompt('Enter a URL:');
      if (url === null) {
        return;
      }
      return CrossOrigin.file(url, function(blob) {
        if (blob) {
          return QR.handleFiles([blob]);
        } else {
          return QR.error("Can't load image.");
        }
      });
    },
    handleFiles: function(files) {
      var file, i, _i, _len;
      if (this !== QR) {
        files = __slice.call(this.files);
        this.value = null;
      }
      if (!files.length) {
        return;
      }
      QR.cleanNotifications();
      for (i = _i = 0, _len = files.length; _i < _len; i = ++_i) {
        file = files[i];
        QR.handleFile(file, i, files.length);
      }
      if (files.length !== 1) {
        return $.addClass(QR.nodes.el, 'dump');
      }
    },
    handleFile: function(file, index, nfiles) {
      var isNewPost, isSingle, max, post, _ref;
      isSingle = nfiles === 1;
      if (/^text\//.test(file.type)) {
        if (isSingle) {
          post = QR.selected;
        } else if (index !== 0 || (post = QR.posts[QR.posts.length - 1]).com) {
          post = new QR.post();
        }
        post.pasteText(file);
        return;
      }
      if (_ref = file.type, __indexOf.call(QR.mimeTypes, _ref) < 0) {
        QR.error("" + file.name + ": Unsupported file type.");
        if (!isSingle) {
          return;
        }
      }
      max = QR.nodes.fileInput.max;
      if (/^video\//.test(file.type)) {
        max = Math.min(max, QR.max_size_video);
      }
      if (file.size > max) {
        QR.error("" + file.name + ": File too large (file: " + ($.bytesToString(file.size)) + ", max: " + ($.bytesToString(max)) + ").");
        if (!isSingle) {
          return;
        }
      }
      isNewPost = false;
      if (isSingle) {
        post = QR.selected;
      } else if (index !== 0 || (post = QR.posts[QR.posts.length - 1]).file) {
        isNewPost = true;
        post = new QR.post();
      }
      return QR.checkDimensions(file, function(pass, el) {
        if (pass || isSingle) {
          return post.setFile(file, el);
        } else if (isNewPost) {
          post.rm();
          if (el) {
            return URL.revokeObjectURL(el.src);
          }
        }
      });
    },
    checkDimensions: function(file, cb) {
      var img, video;
      if (/^image\//.test(file.type)) {
        img = new Image();
        img.onload = function() {
          var height, pass, width;
          height = img.height, width = img.width;
          pass = true;
          if (height > QR.max_height || width > QR.max_width) {
            QR.error("" + file.name + ": Image too large (image: " + height + "x" + width + "px, max: " + QR.max_height + "x" + QR.max_width + "px)");
            pass = false;
          }
          if (height < QR.min_height || width < QR.min_width) {
            QR.error("" + file.name + ": Image too small (image: " + height + "x" + width + "px, min: " + QR.min_height + "x" + QR.min_width + "px)");
            pass = false;
          }
          return cb(pass, img);
        };
        img.onerror = function() {
          return cb(false, null);
        };
        return img.src = URL.createObjectURL(file);
      } else if (/^video\//.test(file.type)) {
        video = $.el('video');
        $.on(video, 'loadeddata', function() {
          var duration, max_height, max_width, pass, videoHeight, videoWidth;
          if (!cb) {
            return;
          }
          videoHeight = video.videoHeight, videoWidth = video.videoWidth, duration = video.duration;
          max_height = Math.min(QR.max_height, QR.max_height_video);
          max_width = Math.min(QR.max_width, QR.max_width_video);
          pass = true;
          if (videoHeight > max_height || videoWidth > max_width) {
            QR.error("" + file.name + ": Video too large (video: " + videoHeight + "x" + videoWidth + "px, max: " + max_height + "x" + max_width + "px)");
            pass = false;
          }
          if (videoHeight < QR.min_height || videoWidth < QR.min_width) {
            QR.error("" + file.name + ": Video too small (video: " + videoHeight + "x" + videoWidth + "px, min: " + QR.min_height + "x" + QR.min_width + "px)");
            pass = false;
          }
          if (!isFinite(duration)) {
            QR.error("" + file.name + ": Video lacks duration metadata (try remuxing)");
            pass = false;
          } else if (duration > QR.max_duration_video) {
            QR.error("" + file.name + ": Video too long (video: " + duration + "s, max: " + QR.max_duration_video + "s)");
            pass = false;
          }
          if (video.mozHasAudio || video.webkitAudioDecodedByteCount) {
            QR.error("" + file.name + ": Audio not allowed");
            pass = false;
          }
          cb(pass, video);
          return cb = null;
        });
        $.on(video, 'error', function() {
          var _ref;
          if (!cb) {
            return;
          }
          if (_ref = file.type, __indexOf.call(QR.mimeTypes, _ref) >= 0) {
            QR.error("" + file.name + ": Video appears corrupt");
          }
          URL.revokeObjectURL(file);
          cb(false, null);
          return cb = null;
        });
        return video.src = URL.createObjectURL(file);
      } else {
        return cb(true, null);
      }
    },
    openFileInput: function(e) {
      var _ref;
      e.stopPropagation();
      if (e.shiftKey && e.type === 'click') {
        return QR.selected.rmFile();
      }
      if ((e.ctrlKey || e.metaKey) && e.type === 'click') {
        $.addClass(QR.nodes.filename, 'edit');
        QR.nodes.filename.focus();
        return $.on(QR.nodes.filename, 'blur', function() {
          return $.rmClass(QR.nodes.filename, 'edit');
        });
      }
      if (e.target.nodeName === 'INPUT' || (e.keyCode && ((_ref = e.keyCode) !== 32 && _ref !== 13)) || e.ctrlKey) {
        return;
      }
      e.preventDefault();
      return QR.nodes.fileInput.click();
    },
    generatePostableThreadsList: function() {
      var list, options, thread, val, _i, _len, _ref;
      if (!QR.nodes) {
        return;
      }
      list = QR.nodes.thread;
      options = [list.firstChild];
      _ref = g.BOARD.threads.keys;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        thread = _ref[_i];
        options.push($.el('option', {
          value: thread,
          textContent: "Thread No." + thread
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
      var dialog, event, i, items, match_max, match_min, name, node, nodes, rules, save, setNode;
      QR.nodes = nodes = {
        el: dialog = UI.dialog('qr', 'top: 50px; right: 0px;', {
          innerHTML: "<div class=move><label><input type=checkbox id=autohide title=Auto-hide>Quick Reply</label><a href=javascript:; class=close title=Close>×</a><select data-name=thread title='Create a new thread / Reply'><option value=new>New thread</option></select></div><form><div class=persona><input name=name  data-name=name  list=\"list-name\" placeholder=Name    class=field size=1><input name=email data-name=email list=\"list-email\" placeholder=Options class=field size=1><input name=sub   data-name=sub   list=\"list-sub\" placeholder=Subject class=field size=1></div><div class=textarea><textarea data-name=com placeholder=Comment class=field></textarea><span id=char-count></span></div><div id=dump-list-container><div id=dump-list></div><a id=add-post href=javascript:; title=\"Add a post\">+</a></div><div id=file-n-submit><span id=qr-filename-container class=field tabindex=0><span id=qr-no-file>No selected file</span><input id=\"qr-filename\" data-name=\"filename\" spellcheck=\"false\"><span id=qr-extras-container><a id=qr-filerm href=javascript:; title='Remove file'><i class=\"fa fa-times-circle\"></i></a><a id=url-button title='Post from url'><i class=\"fa fa-link\"></i></a><a id=dump-button title='Dump list'><i class=\"fa fa-plus-square\"></i></a></span></span><label id=qr-spoiler-label><input type=checkbox id=qr-file-spoiler title='Spoiler image'></label><input type=submit></div><input type=file multiple></form><datalist id=\"list-name\"></datalist><datalist id=\"list-email\"></datalist><datalist id=\"list-sub\"></datalist> "
        })
      };
      setNode = function(name, query) {
        return nodes[name] = $(query, dialog);
      };
      setNode('move', '.move');
      setNode('autohide', '#autohide');
      setNode('thread', 'select');
      setNode('threadPar', '#qr-thread-select');
      setNode('close', '.close');
      setNode('form', 'form');
      setNode('dumpButton', '#dump-button');
      setNode('urlButton', '#url-button');
      setNode('name', '[data-name=name]');
      setNode('email', '[data-name=email]');
      setNode('sub', '[data-name=sub]');
      setNode('com', '[data-name=com]');
      setNode('dumpList', '#dump-list');
      setNode('addPost', '#add-post');
      setNode('charCount', '#char-count');
      setNode('fileSubmit', '#file-n-submit');
      setNode('filename', '#qr-filename');
      setNode('fileContainer', '#qr-filename-container');
      setNode('fileRM', '#qr-filerm');
      setNode('fileExtras', '#qr-extras-container');
      setNode('spoiler', '#qr-file-spoiler');
      setNode('spoilerPar', '#qr-spoiler-label');
      setNode('status', '[type=submit]');
      setNode('fileInput', '[type=file]');
      rules = $('ul.rules').textContent.trim();
      match_min = rules.match(/.+smaller than (\d+)x(\d+).+/);
      match_max = rules.match(/.+greater than (\d+)x(\d+).+/);
      QR.min_width = +(match_min != null ? match_min[1] : void 0) || 1;
      QR.min_height = +(match_min != null ? match_min[2] : void 0) || 1;
      QR.max_width = +(match_max != null ? match_max[1] : void 0) || 10000;
      QR.max_height = +(match_max != null ? match_max[2] : void 0) || 10000;
      nodes.fileInput.max = $('input[name=MAX_FILE_SIZE]').value;
      QR.max_size_video = 3145728;
      QR.max_width_video = QR.max_height_video = 2048;
      QR.max_duration_video = 120;
      if (Conf['Show New Thread Option in Threads']) {
        $.addClass(QR.nodes.el, 'show-new-thread-option');
      }
      if (Conf['Show Name and Subject']) {
        $.addClass(QR.nodes.name, 'force-show');
        $.addClass(QR.nodes.sub, 'force-show');
        QR.nodes.email.placeholder = 'E-mail';
      }
      QR.forcedAnon = !!$('form[name="post"] input[name="name"][type="hidden"]');
      if (QR.forcedAnon) {
        $.addClass(QR.nodes.el, 'forced-anon');
      }
      QR.spoiler = !!$('.postForm input[name=spoiler]');
      if (QR.spoiler) {
        $.addClass(QR.nodes.el, 'has-spoiler');
      } else {
        nodes.spoiler.parentElement.hidden = true;
      }
      if (g.BOARD.ID === 'f' && g.VIEW !== 'thread') {
        nodes.flashTag = $.el('select', {
          name: 'filetag'
        });
        $.extend(nodes.flashTag, {
          innerHTML: "<option value=\"0\">Hentai</option><option value=\"6\">Porn</option><option value=\"1\">Japanese</option><option value=\"2\">Anime</option><option value=\"3\">Game</option><option value=\"5\">Loop</option><option value=\"4\" selected>Other</option>"
        });
        nodes.flashTag.dataset["default"] = '4';
        $.add(nodes.form, nodes.flashTag);
      }
      QR.flagsInput();
      $.on(nodes.filename.parentNode, 'click keydown', QR.openFileInput);
      $.on(nodes.autohide, 'change', QR.toggleHide);
      $.on(nodes.close, 'click', QR.close);
      $.on(nodes.dumpButton, 'click', function() {
        return nodes.el.classList.toggle('dump');
      });
      $.on(nodes.urlButton, 'click', QR.handleUrl);
      $.on(nodes.addPost, 'click', function() {
        return new QR.post(true);
      });
      $.on(nodes.form, 'submit', QR.submit);
      $.on(nodes.fileRM, 'click', function() {
        return QR.selected.rmFile();
      });
      $.on(nodes.fileExtras, 'click', function(e) {
        return e.stopPropagation();
      });
      $.on(nodes.spoiler, 'change', function() {
        return QR.selected.nodes.spoiler.click();
      });
      $.on(nodes.fileInput, 'change', QR.handleFiles);
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
      if (Conf['Remember QR Size']) {
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
      QR.persona.init();
      new QR.post(true);
      QR.status();
      QR.cooldown.init();
      QR.captcha.init();
      $.add(d.body, dialog);
      QR.captcha.setup();
      return $.event('QRDialogCreation', null, dialog);
    },
    flags: function() {
      var flag, fn, select, _i, _len, _ref;
      select = $.el('select', {
        name: 'flag',
        className: 'flagSelector'
      });
      fn = function(val) {
        return $.add(select, $.el('option', {
          value: val[0],
          textContent: val[1]
        }));
      };
      _ref = [['0', 'None'], ['US', 'American'], ['KP', 'Best Korean'], ['BL', 'Black Nationalist'], ['CM', 'Communist'], ['CF', 'Confederate'], ['RE', 'Conservative'], ['EU', 'European'], ['GY', 'Gay'], ['PC', 'Hippie'], ['IL', 'Israeli'], ['DM', 'Liberal'], ['RP', 'Libertarian'], ['MF', 'Muslim'], ['NZ', 'Nazi'], ['OB', 'Obama'], ['PR', 'Pirate'], ['RB', 'Rebel'], ['TP', 'Tea Partier'], ['TX', 'Texan'], ['TR', 'Tree Hugger'], ['WP', 'White Supremacist']];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        flag = _ref[_i];
        fn(flag);
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
      if (false) {
        flag = QR.flags();
        flag.dataset.name = 'flag';
        flag.dataset["default"] = '0';
        nodes.flag = flag;
        return $.add(nodes.form, flag);
      }
    },
    submit: function(e) {
      var captcha, cb, err, extra, filetag, formData, options, post, textOnly, thread, threadID;
      if (e != null) {
        e.preventDefault();
      }
      if (QR.req) {
        QR.abort();
        return;
      }
      if (QR.cooldown.seconds) {
        QR.cooldown.auto = !QR.cooldown.auto;
        QR.status();
        return;
      }
      post = QR.posts[0];
      post.forceSave();
      if (g.BOARD.ID === 'f' && g.VIEW !== 'thread') {
        filetag = QR.nodes.flashTag.value;
      }
      threadID = post.thread;
      thread = g.BOARD.threads[threadID];
      if (threadID === 'new') {
        threadID = null;
        if (g.BOARD.ID === 'vg' && !post.sub) {
          err = 'New threads require a subject.';
        } else if (!(post.file || (textOnly = !!$('input[name=textonly]', $.id('postForm'))))) {
          err = 'No file selected.';
        }
      } else if (g.BOARD.threads[threadID].isClosed) {
        err = 'You can\'t reply to this thread anymore.';
      } else if (!(post.com || post.file)) {
        err = 'No file selected.';
      } else if (post.file && thread.fileLimit) {
        err = 'Max limit of image replies has been reached.';
      }
      if (QR.captcha.isEnabled && !err) {
        captcha = QR.captcha.getOne();
        if (!captcha) {
          err = 'No valid captcha.';
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
      if (Conf['Auto Hide QR'] && !QR.cooldown.auto) {
        QR.hide();
      }
      if (!QR.cooldown.auto && $.x('ancestor::div[@id="qr"]', d.activeElement)) {
        d.activeElement.blur();
      }
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
        textonly: textOnly,
        mode: 'regist',
        pwd: QR.persona.pwd
      };
      options = {
        responseType: 'document',
        withCredentials: true,
        onload: QR.response,
        onerror: function() {
          delete QR.req;
          post.unlock();
          QR.cooldown.auto = false;
          QR.status();
          return QR.error($.el('span', {
            innerHTML: E(g.NAME) + " encountered an error while posting. [<a href=\"//4chan.org/banned\" target=\"_blank\">Banned?</a>] [<a href=\"" + E(g.FAQ) + "#what-does-4chan-x-encountered-an-error-while-posting-please-try-again-mean\" target=\"_blank\">More info</a>]"
          }));
        }
      };
      extra = {
        form: $.formData(formData),
        upCallbacks: {
          onload: function() {
            QR.req.isUploadFinished = true;
            QR.req.uploadEndTime = Date.now();
            QR.req.progress = '...';
            return QR.status();
          },
          onprogress: function(e) {
            QR.req.progress = "" + (Math.round(e.loaded / e.total * 100)) + "%";
            return QR.status();
          }
        }
      };
      cb = function(response) {
        if (response != null) {
          extra.form.append('g-recaptcha-response', response);
        }
        QR.req = $.ajax("https://sys.4chan.org/" + g.BOARD + "/post", options, extra);
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
            QR.cooldown.auto = !!QR.captcha.captchas.length;
            return QR.status();
          }
        });
      } else {
        cb(captcha);
      }
      return QR.status();
    },
    response: function() {
      var URL, ban, captchasCount, err, h1, isReply, m, notif, post, postID, postsCount, req, resDoc, threadID, _, _ref, _ref1;
      req = QR.req;
      delete QR.req;
      post = QR.posts[0];
      post.unlock();
      resDoc = req.response;
      if (ban = $('.banType', resDoc)) {
        err = $.el('span', ban.textContent.toLowerCase() === 'banned' ? {
          innerHTML: "You are banned on " + $(".board", resDoc).innerHTML + "! ;_;<br>Click <a href=\"//www.4chan.org/banned\" target=\"_blank\">here</a> to see the reason."
        } : {
          innerHTML: "You were issued a warning on " + $(".board", resDoc).innerHTML + " as " + $(".nameBlock", resDoc).innerHTML + ".<br>Reason: " + $(".reason", resDoc).innerHTML
        });
      } else if (err = resDoc.getElementById('errmsg')) {
        if ((_ref = $('a', err)) != null) {
          _ref.target = '_blank';
        }
      } else if (resDoc.title !== 'Post successful!') {
        err = 'Connection error with sys.4chan.org.';
      } else if (req.status !== 200) {
        err = "Error " + req.statusText + " (" + req.status + ")";
      }
      if (err) {
        if (/captcha|verification/i.test(err.textContent) || err === 'Connection error with sys.4chan.org.') {
          if (/mistyped/i.test(err.textContent)) {
            err = 'You seem to have mistyped the CAPTCHA.';
          } else if (/expired/i.test(err.textContent)) {
            err = 'This CAPTCHA is no longer valid because it has expired.';
          }
          QR.cooldown.auto = QR.captcha.isEnabled ? !!QR.captcha.captchas.length : err === 'Connection error with sys.4chan.org.' ? true : false;
          QR.cooldown.addDelay(post, 2);
        } else if (err.textContent && (m = err.textContent.match(/wait\s+(\d+)\s+second/i)) && !/duplicate/i.test(err.textContent)) {
          QR.cooldown.auto = QR.captcha.isEnabled ? !!QR.captcha.captchas.length : true;
          QR.cooldown.addDelay(post, +m[1]);
          QR.captcha.setup(d.activeElement === QR.nodes.status);
        } else {
          QR.cooldown.auto = false;
        }
        QR.status();
        QR.error(err);
        return;
      }
      h1 = $('h1', resDoc);
      QR.cleanNotifications();
      if (Conf['Posting Success Notifications']) {
        QR.notifications.push(new Notice('success', h1.textContent, 5));
      }
      QR.persona.set(post);
      _ref1 = h1.nextSibling.textContent.match(/thread:(\d+),no:(\d+)/), _ = _ref1[0], threadID = _ref1[1], postID = _ref1[2];
      postID = +postID;
      threadID = +threadID || postID;
      isReply = threadID !== postID;
      QR.db.set({
        boardID: g.BOARD.ID,
        threadID: threadID,
        postID: postID,
        val: true
      });
      ThreadUpdater.postID = postID;
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
      if (QR.cooldown.auto && QR.captcha.isEnabled && (captchasCount = QR.captcha.captchas.length) < 3 && captchasCount < postsCount) {
        notif = new Notification('Quick reply warning', {
          body: "You are running low on cached captchas. Cache count: " + captchasCount + ".",
          icon: Favicon.logo
        });
        notif.onclick = function() {
          QR.open();
          window.focus();
          return QR.captcha.setup(true);
        };
        notif.onshow = function() {
          return setTimeout(function() {
            return notif.close();
          }, 7 * $.SECOND);
        };
      }
      if (!(Conf['Persistent QR'] || postsCount)) {
        QR.close();
      } else {
        post.rm();
        QR.captcha.setup(d.activeElement === QR.nodes.status);
      }
      QR.cooldown.add(req.uploadEndTime, threadID, postID);
      URL = threadID === postID ? "" + window.location.origin + "/" + g.BOARD + "/thread/" + threadID : g.VIEW === 'index' && !QR.cooldown.auto && Conf['Open Post in New Tab'] ? "" + window.location.origin + "/" + g.BOARD + "/thread/" + threadID + "#p" + postID : void 0;
      if (URL) {
        if (Conf['Open Post in New Tab'] || postsCount) {
          $.open(URL);
        } else {
          window.location = URL;
        }
      }
      return QR.status();
    },
    abort: function() {
      if (QR.req && !QR.req.isUploadFinished) {
        QR.req.abort();
        delete QR.req;
        QR.posts[0].unlock();
        QR.cooldown.auto = false;
        QR.notifications.push(new Notice('info', 'QR upload aborted.', 5));
      }
      return QR.status();
    }
  };

  Captcha = {};

  Captcha.noscript = {
    lifetime: 2 * $.MINUTE,
    iframeURL: '//www.google.com/recaptcha/api/fallback?k=6Ldp2bsSAAAAAAJ5uyx_lx34lJeEpTLVkP5k04qc',
    init: function() {
      var container, input;
      if (d.cookie.indexOf('pass_enabled=1') >= 0) {
        return;
      }
      if (!(this.isEnabled = !!$.id('g-recaptcha'))) {
        return;
      }
      container = $.el('div', {
        className: 'captcha-img',
        title: 'Reload reCAPTCHA'
      });
      input = $.el('input', {
        className: 'captcha-input field',
        title: 'Verification',
        autocomplete: 'off',
        spellcheck: false
      });
      this.nodes = {
        container: container,
        input: input
      };
      $.on(input, 'keydown', this.keydown.bind(this));
      $.on(this.nodes.container, 'click', (function(_this) {
        return function() {
          _this.reload();
          return _this.nodes.input.focus();
        };
      })(this));
      this.conn = new Connection(null, "" + location.protocol + "//www.google.com", {
        challenge: this.load.bind(this),
        token: this.save.bind(this),
        error: this.error.bind(this)
      });
      $.addClass(QR.nodes.el, 'has-captcha');
      $.after(QR.nodes.com.parentNode, [container, input]);
      this.captchas = [];
      $.get('captchas', [], function(_arg) {
        var captchas;
        captchas = _arg.captchas;
        QR.captcha.sync(captchas);
        return QR.captcha.clear();
      });
      $.sync('captchas', this.sync);
      this.beforeSetup();
      return this.setup();
    },
    initFrame: function() {
      var cb, conn, img, _ref, _ref1;
      conn = new Connection(window.top, "" + location.protocol + "//boards.4chan.org", {
        response: function(response) {
          $.id('response').value = response;
          return $('.fbc-challenge > form').submit();
        }
      });
      conn.send({
        token: (_ref = $('.fbc-verification-token > textarea')) != null ? _ref.value : void 0,
        error: (_ref1 = $('.fbc-error')) != null ? _ref1.textContent : void 0
      });
      if (!(img = $('.fbc-payload > img'))) {
        return;
      }
      cb = function() {
        var canvas;
        canvas = $.el('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        canvas.getContext('2d').drawImage(img, 0, 0);
        return conn.send({
          challenge: canvas.toDataURL()
        });
      };
      if (img.complete) {
        return cb();
      } else {
        return $.on(img, 'load', cb);
      }
    },
    timers: {},
    cb: {
      focus: function() {
        return QR.captcha.setup(false, true);
      }
    },
    beforeSetup: function() {
      var container, input, _ref;
      _ref = this.nodes, container = _ref.container, input = _ref.input;
      container.hidden = true;
      input.value = '';
      input.placeholder = 'Focus to load reCAPTCHA';
      this.count();
      return $.on(input, 'focus click', this.cb.focus);
    },
    needed: function() {
      var captchaCount, postsCount;
      captchaCount = this.captchas.length;
      if (QR.req) {
        captchaCount++;
      }
      postsCount = QR.posts.length;
      if (postsCount === 1 && !Conf['Auto-load captcha'] && !QR.posts[0].com && !QR.posts[0].file) {
        postsCount = 0;
      }
      return captchaCount < postsCount;
    },
    onNewPost: function() {},
    onPostChange: function() {},
    setup: function(focus, force) {
      if (!(this.isEnabled && (this.needed() || force))) {
        return;
      }
      if (!this.nodes.iframe) {
        this.nodes.iframe = $.el('iframe', {
          id: 'qr-captcha-iframe',
          src: this.iframeURL
        });
        $.add(d.body, this.nodes.iframe);
        this.conn.target = this.nodes.iframe.contentWindow;
      } else if (!this.occupied) {
        this.nodes.iframe.src = this.iframeURL;
      }
      this.occupied = true;
      if (focus) {
        return this.nodes.input.focus();
      }
    },
    afterSetup: function() {
      var container, input, _ref;
      _ref = this.nodes, container = _ref.container, input = _ref.input;
      container.hidden = false;
      input.placeholder = 'Verification';
      this.count();
      $.off(input, 'focus click', this.cb.focus);
      if (QR.nodes.el.getBoundingClientRect().bottom > doc.clientHeight) {
        QR.nodes.el.style.top = null;
        return QR.nodes.el.style.bottom = '0px';
      }
    },
    destroy: function() {
      if (!this.isEnabled) {
        return;
      }
      if (this.nodes.img) {
        $.rm(this.nodes.img);
      }
      delete this.nodes.img;
      if (this.nodes.iframe) {
        $.rm(this.nodes.iframe);
      }
      delete this.nodes.iframe;
      delete this.occupied;
      this.unflag();
      return this.beforeSetup();
    },
    sync: function(captchas) {
      if (captchas == null) {
        captchas = [];
      }
      QR.captcha.captchas = captchas;
      return QR.captcha.count();
    },
    getOne: function() {
      var captcha;
      this.clear();
      if (captcha = this.captchas.shift()) {
        this.count();
        $.set('captchas', this.captchas);
        return captcha.response;
      } else if (/\S/.test(this.nodes.input.value)) {
        return (function(_this) {
          return function(cb) {
            _this.submitCB = cb;
            return _this.sendResponse();
          };
        })(this);
      } else {
        return null;
      }
    },
    sendResponse: function() {
      var response;
      response = this.nodes.input.value;
      if (/\S/.test(response)) {
        return this.conn.send({
          response: response
        });
      }
    },
    save: function(token) {
      delete this.occupied;
      this.nodes.input.value = '';
      if (this.submitCB) {
        this.submitCB(token);
        delete this.submitCB;
        if (this.needed()) {
          return this.reload();
        } else {
          return this.destroy();
        }
      } else {
        $.forceSync('captchas');
        this.captchas.push({
          response: token,
          timeout: this.timeout
        });
        this.count();
        $.set('captchas', this.captchas);
        return this.reload();
      }
    },
    error: function(message) {
      this.occupied = true;
      this.nodes.input.value = '';
      if (this.submitCB) {
        this.submitCB();
        delete this.submitCB;
      }
      return QR.error("Captcha Error: " + message);
    },
    notify: function(el) {
      if (Conf['Captcha Warning Notifications'] && !d.hidden) {
        return QR.notify(el);
      } else {
        $.addClass(this.nodes.input, 'error');
        return $.one(this.nodes.input, 'keydown', this.unflag.bind(this));
      }
    },
    unflag: function() {
      return $.rmClass(this.nodes.input, 'error');
    },
    clear: function() {
      var captcha, i, now, _i, _len, _ref;
      if (!this.captchas.length) {
        return;
      }
      $.forceSync('captchas');
      now = Date.now();
      _ref = this.captchas;
      for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
        captcha = _ref[i];
        if (captcha.timeout > now) {
          break;
        }
      }
      if (!i) {
        return;
      }
      this.captchas = this.captchas.slice(i);
      this.count();
      return $.set('captchas', this.captchas);
    },
    load: function(src) {
      var container, img, input, _ref;
      _ref = this.nodes, container = _ref.container, input = _ref.input, img = _ref.img;
      this.occupied = true;
      this.timeout = Date.now() + this.lifetime;
      if (!img) {
        img = this.nodes.img = new Image;
        $.one(img, 'load', this.afterSetup.bind(this));
        $.on(img, 'load', function() {
          return this.hidden = false;
        });
        $.add(container, img);
      }
      img.src = src;
      input.value = '';
      this.clear();
      clearTimeout(this.timers.expire);
      return this.timers.expire = setTimeout(this.expire.bind(this), this.lifetime);
    },
    count: function() {
      var count, placeholder;
      count = this.captchas ? this.captchas.length : 0;
      placeholder = this.nodes.input.placeholder.replace(/\ \(.*\)$/, '');
      placeholder += (function() {
        switch (count) {
          case 0:
            if (placeholder === 'Verification') {
              return ' (Shift + Enter to cache)';
            } else {
              return '';
            }
            break;
          case 1:
            return ' (1 cached captcha)';
          default:
            return " (" + count + " cached captchas)";
        }
      })();
      this.nodes.input.placeholder = placeholder;
      this.nodes.input.alt = count;
      clearTimeout(this.timers.clear);
      if (this.captchas.length) {
        return this.timers.clear = setTimeout(this.clear.bind(this), this.captchas[0].timeout - Date.now());
      }
    },
    expire: function() {
      if (!this.nodes.iframe) {
        return;
      }
      if (this.needed() || d.activeElement === this.nodes.input) {
        return this.reload();
      } else {
        return this.destroy();
      }
    },
    reload: function() {
      var _ref;
      this.nodes.iframe.src = this.iframeURL;
      this.occupied = true;
      return (_ref = this.nodes.img) != null ? _ref.hidden = true : void 0;
    },
    keydown: function(e) {
      if (e.keyCode === 8 && !this.nodes.input.value) {
        if (this.nodes.iframe) {
          this.reload();
        } else {
          this.setup();
        }
      } else if (e.keyCode === 13 && e.shiftKey) {
        this.sendResponse();
      } else {
        return;
      }
      return e.preventDefault();
    }
  };

  Captcha.v2 = {
    lifetime: 2 * $.MINUTE,
    init: function() {
      var counter, root;
      if (d.cookie.indexOf('pass_enabled=1') >= 0) {
        return;
      }
      if (!(this.isEnabled = !!$.id('g-recaptcha'))) {
        return;
      }
      this.captchas = [];
      $.get('captchas', [], function(_arg) {
        var captchas;
        captchas = _arg.captchas;
        return QR.captcha.sync(captchas);
      });
      $.sync('captchas', this.sync.bind(this));
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
      $.addClass(QR.nodes.el, 'has-captcha');
      $.after(QR.nodes.com.parentNode, root);
      $.on(counter, 'click', this.toggle.bind(this));
      return $.on(window, 'captcha:success', (function(_this) {
        return function() {
          return $.queueTask(function() {
            return _this.save(false);
          });
        };
      })(this));
    },
    shouldFocus: false,
    timeouts: {},
    postsCount: 0,
    needed: function() {
      var captchaCount;
      captchaCount = this.captchas.length;
      if (QR.req) {
        captchaCount++;
      }
      this.postsCount = QR.posts.length;
      if (this.postsCount === 1 && !Conf['Auto-load captcha'] && !QR.posts[0].com && !QR.posts[0].file) {
        this.postsCount = 0;
      }
      return captchaCount < this.postsCount;
    },
    onNewPost: function() {
      return this.setup();
    },
    onPostChange: function() {
      if (this.postsCount === 0) {
        this.setup();
      }
      if (QR.posts.length === 1 && !Conf['Auto-load captcha'] && !QR.posts[0].com && !QR.posts[0].file) {
        return this.postsCount = 0;
      }
    },
    toggle: function() {
      if (this.nodes.container && !this.timeouts.destroy) {
        return this.destroy();
      } else {
        return this.setup(true, true);
      }
    },
    setup: function(focus, force) {
      var iframe;
      if (!(this.isEnabled && (this.needed() || force))) {
        return;
      }
      $.addClass(QR.nodes.el, 'captcha-open');
      if (focus) {
        this.shouldFocus = true;
      }
      if (this.timeouts.destroy) {
        clearTimeout(this.timeouts.destroy);
        delete this.timeouts.destroy;
        return this.reload();
      }
      if (this.nodes.container) {
        if (this.shouldFocus && (iframe = $('iframe', this.nodes.container))) {
          iframe.focus();
          delete this.shouldFocus;
        }
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
      return $.globalEval('(function() {\n  function render() {\n    var container = document.querySelector("#qr .captcha-container");\n    container.dataset.widgetID = window.grecaptcha.render(container, {\n      sitekey: \'6Ldp2bsSAAAAAAJ5uyx_lx34lJeEpTLVkP5k04qc\',\n      theme: document.documentElement.classList.contains(\'tomorrow\') ? \'dark\' : \'light\',\n      callback: function(response) {\n        window.dispatchEvent(new CustomEvent("captcha:success", {detail: response}));\n      }\n    });\n  }\n  if (window.grecaptcha) {\n    render();\n  } else {\n    var cbNative = window.onRecaptchaLoaded;\n    window.onRecaptchaLoaded = function() {\n      render();\n      cbNative();\n    }\n  }\n})();');
    },
    afterSetup: function(mutations) {
      var iframe, mutation, node, textarea, _i, _j, _len, _len1, _ref;
      for (_i = 0, _len = mutations.length; _i < _len; _i++) {
        mutation = mutations[_i];
        _ref = mutation.addedNodes;
        for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
          node = _ref[_j];
          if (iframe = $.x('./descendant-or-self::iframe', node)) {
            this.setupIFrame(iframe);
          }
          if (textarea = $.x('./descendant-or-self::textarea', node)) {
            this.setupTextArea(textarea);
          }
        }
      }
    },
    setupIFrame: function(iframe) {
      this.setupTime = Date.now();
      if (QR.nodes.el.getBoundingClientRect().bottom > doc.clientHeight) {
        QR.nodes.el.style.top = null;
        QR.nodes.el.style.bottom = '0px';
      }
      if (this.shouldFocus) {
        iframe.focus();
      }
      return this.shouldFocus = false;
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
        $.rm(this.nodes.container);
      }
      return delete this.nodes.container;
    },
    sync: function(captchas) {
      if (captchas == null) {
        captchas = [];
      }
      this.captchas = captchas;
      this.clear();
      return this.count();
    },
    getOne: function() {
      var captcha;
      this.clear();
      if (captcha = this.captchas.shift()) {
        $.set('captchas', this.captchas);
        this.count();
        return captcha.response;
      } else {
        return null;
      }
    },
    save: function(pasted) {
      var _base;
      $.forceSync('captchas');
      this.captchas.push({
        response: $('textarea', this.nodes.container).value,
        timeout: (pasted ? this.setupTime : Date.now()) + this.lifetime
      });
      $.set('captchas', this.captchas);
      this.count();
      if (this.needed()) {
        if (QR.cooldown.auto || Conf['Post on Captcha Completion']) {
          this.shouldFocus = true;
        } else {
          QR.nodes.status.focus();
        }
        this.reload();
      } else {
        if (pasted) {
          this.destroy();
        } else {
          if ((_base = this.timeouts).destroy == null) {
            _base.destroy = setTimeout(this.destroy.bind(this), 3 * $.SECOND);
          }
        }
        QR.nodes.status.focus();
      }
      if (Conf['Post on Captcha Completion'] && !QR.cooldown.auto) {
        return QR.submit();
      }
    },
    notify: function(el) {
      return QR.notify(el);
    },
    clear: function() {
      var captcha, i, now, _i, _len, _ref;
      if (!this.captchas.length) {
        return;
      }
      $.forceSync('captchas');
      now = Date.now();
      _ref = this.captchas;
      for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
        captcha = _ref[i];
        if (captcha.timeout > now) {
          break;
        }
      }
      if (!i) {
        return;
      }
      this.captchas = this.captchas.slice(i);
      this.count();
      $.set('captchas', this.captchas);
      return this.setup(true);
    },
    count: function() {
      this.nodes.counter.textContent = "Captchas: " + this.captchas.length;
      clearTimeout(this.timeouts.clear);
      if (this.captchas.length) {
        return this.timeouts.clear = setTimeout(this.clear.bind(this), this.captchas[0].timeout - Date.now());
      }
    },
    reload: function() {
      return $.globalEval('(function() {\n  var container = document.querySelector("#qr .captcha-container");\n  window.grecaptcha.reset(container.dataset.widgetID);\n})();');
    }
  };

  QR.cooldown = {
    seconds: 0,
    init: function() {
      var delay, items, key, keys, m, scope, type, _ref, _results;
      if (!Conf['Cooldown']) {
        return;
      }
      QR.cooldown.delays = (m = Get.scriptData().match(/\bcooldowns *= *({[^}]+})/)) ? JSON.parse(m[1]) : {
        thread: 0,
        reply: 0,
        image: 0,
        reply_intra: 0,
        image_intra: 0
      };
      QR.cooldown.maxDelay = 0;
      _ref = QR.cooldown.delays;
      for (type in _ref) {
        delay = _ref[type];
        if (type !== 'thread') {
          QR.cooldown.maxDelay = Math.max(QR.cooldown.maxDelay, delay);
        }
      }
      QR.cooldown.delays['thread_global'] = 300;
      keys = QR.cooldown.keys = {
        local: "cooldown." + g.BOARD,
        global: 'cooldown.global'
      };
      items = {};
      for (scope in keys) {
        key = keys[scope];
        items[key] = {};
      }
      $.get(items, function(items) {
        for (scope in keys) {
          key = keys[scope];
          QR.cooldown[scope] = items[key];
        }
        return QR.cooldown.start();
      });
      _results = [];
      for (scope in keys) {
        key = keys[scope];
        _results.push($.sync(key, QR.cooldown.sync(scope)));
      }
      return _results;
    },
    start: function() {
      if (QR.cooldown.isCounting || Object.keys(QR.cooldown.local).length + Object.keys(QR.cooldown.global).length === 0) {
        return;
      }
      QR.cooldown.isCounting = true;
      return QR.cooldown.count();
    },
    sync: function(scope) {
      return function(cooldowns) {
        QR.cooldown[scope] = cooldowns || {};
        return QR.cooldown.start();
      };
    },
    add: function(start, threadID, postID) {
      var boardID;
      if (!Conf['Cooldown']) {
        return;
      }
      boardID = g.BOARD.ID;
      QR.cooldown.set('local', start, {
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
      return QR.cooldown.start();
    },
    addDelay: function(post, delay) {
      var cooldown;
      if (!Conf['Cooldown']) {
        return;
      }
      cooldown = QR.cooldown.categorize(post);
      cooldown.delay = delay;
      QR.cooldown.set('local', Date.now(), cooldown);
      return QR.cooldown.start();
    },
    "delete": function(post) {
      var cooldown, id, _ref;
      if (!(Conf['Cooldown'] && g.BOARD.ID === post.board.ID)) {
        return;
      }
      $.forceSync(QR.cooldown.keys.local);
      _ref = QR.cooldown.local;
      for (id in _ref) {
        cooldown = _ref[id];
        if ((cooldown.delay == null) && cooldown.threadID === post.thread.ID && cooldown.postID === post.ID) {
          delete QR.cooldown.local[id];
        }
      }
      return QR.cooldown.save('local');
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
    set: function(scope, id, value) {
      $.forceSync(QR.cooldown.keys[scope]);
      QR.cooldown[scope][id] = value;
      return $.set(QR.cooldown.keys[scope], QR.cooldown[scope]);
    },
    save: function(scope) {
      if (Object.keys(QR.cooldown[scope]).length) {
        return $.set(QR.cooldown.keys[scope], QR.cooldown[scope]);
      } else {
        return $["delete"](QR.cooldown.keys[scope]);
      }
    },
    count: function() {
      var cooldown, elapsed, key, maxDelay, now, save, scope, seconds, start, suffix, threadID, type, update, _ref, _ref1, _ref2;
      now = Date.now();
      _ref = QR.cooldown.categorize(QR.posts[0]), type = _ref.type, threadID = _ref.threadID;
      seconds = 0;
      _ref1 = QR.cooldown.keys;
      for (scope in _ref1) {
        key = _ref1[scope];
        $.forceSync(key);
        save = false;
        _ref2 = QR.cooldown[scope];
        for (start in _ref2) {
          cooldown = _ref2[start];
          start = +start;
          elapsed = Math.floor((now - start) / $.SECOND);
          if (elapsed < 0) {
            delete QR.cooldown[scope][start];
            save = true;
            continue;
          }
          if (cooldown.delay != null) {
            if (cooldown.delay <= elapsed) {
              delete QR.cooldown[scope][start];
              save = true;
            } else if (cooldown.type === type && cooldown.threadID === threadID) {
              seconds = Math.max(seconds, cooldown.delay - elapsed);
            }
            continue;
          }
          maxDelay = cooldown.threadID !== cooldown.postID ? QR.cooldown.maxDelay : QR.cooldown.delays[scope === 'global' ? 'thread_global' : 'thread'];
          if (maxDelay <= elapsed) {
            delete QR.cooldown[scope][start];
            save = true;
            continue;
          }
          if ((type === 'thread') === (cooldown.threadID === cooldown.postID)) {
            suffix = scope === 'global' ? '_global' : type !== 'thread' && threadID === cooldown.threadID ? '_intra' : '';
            seconds = Math.max(seconds, QR.cooldown.delays[type + suffix] - elapsed);
          }
        }
        if (save) {
          QR.cooldown.save(scope);
        }
      }
      if (Object.keys(QR.cooldown.local).length + Object.keys(QR.cooldown.global).length) {
        clearTimeout(QR.cooldown.timeout);
        QR.cooldown.timeout = setTimeout(QR.cooldown.count, $.SECOND);
      } else {
        delete QR.cooldown.isCounting;
      }
      update = seconds !== QR.cooldown.seconds;
      QR.cooldown.seconds = seconds;
      if (update) {
        QR.status();
      }
      if (seconds === 0 && QR.cooldown.auto && !QR.req) {
        return QR.submit();
      }
    }
  };

  QR.persona = {
    pwd: '',
    always: {},
    init: function() {
      QR.persona.getPassword();
      return $.get('QR.personas', Conf['QR.personas'], function(_arg) {
        var arr, item, personas, type, types, _i, _len, _ref;
        personas = _arg['QR.personas'];
        types = {
          name: [],
          email: [],
          sub: []
        };
        _ref = personas.split('\n');
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          item = _ref[_i];
          QR.persona.parseItem(item.trim(), types);
        }
        for (type in types) {
          arr = types[type];
          QR.persona.loadPersonas(type, arr);
        }
      });
    },
    parseItem: function(item, types) {
      var boards, match, type, val, _ref, _ref1, _ref2;
      if (item[0] === '#') {
        return;
      }
      if (!(match = item.match(/(name|options|email|subject|password):"(.*)"/i))) {
        return;
      }
      _ref = match, match = _ref[0], type = _ref[1], val = _ref[2];
      item = item.replace(match, '');
      boards = ((_ref1 = item.match(/boards:([^;]+)/i)) != null ? _ref1[1].toLowerCase() : void 0) || 'global';
      if (boards !== 'global' && (_ref2 = g.BOARD.ID, __indexOf.call(boards.split(','), _ref2) < 0)) {
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
      if (__indexOf.call(types[type], val) < 0) {
        return types[type].push(val);
      }
    },
    loadPersonas: function(type, arr) {
      var list, val, _i, _len;
      list = $("#list-" + type, QR.nodes.el);
      for (_i = 0, _len = arr.length; _i < _len; _i++) {
        val = arr[_i];
        if (val) {
          $.add(list, $.el('option', {
            textContent: val
          }));
        }
      }
    },
    getPassword: function() {
      var input, m, _ref;
      if (!QR.persona.pwd) {
        QR.persona.pwd = (m = d.cookie.match(/4chan_pass=([^;]+)/)) ? decodeURIComponent(m[1]) : (input = $.id('postPassword')) ? input.value : ((_ref = $.id('delPassword')) != null ? _ref.value : void 0) || '';
      }
      return QR.persona.pwd;
    },
    get: function(cb) {
      return $.get('QR.persona', {}, function(_arg) {
        var persona;
        persona = _arg['QR.persona'];
        return cb(persona);
      });
    },
    set: function(post) {
      return $.get('QR.persona', {}, function(_arg) {
        var persona;
        persona = _arg['QR.persona'];
        persona = {
          name: post.name,
          email: /^sage$/.test(post.email) ? persona.email : post.email,
          flag: post.flag
        };
        return $.set('QR.persona', persona);
      });
    }
  };

  QR.post = (function() {
    function _Class(select) {
      this.select = __bind(this.select, this);
      var el, event, prev, _i, _len, _ref;
      el = $.el('a', {
        className: 'qr-preview',
        draggable: true,
        href: 'javascript:;'
      });
      $.extend(el, {
        innerHTML: "<a class=\"remove fa fa-times-circle\" title=\"Remove\"></a><label hidden><input type=\"checkbox\"> Spoiler</label><span></span>"
      });
      this.nodes = {
        el: el,
        rm: el.firstChild,
        label: $('label', el),
        spoiler: $('input', el),
        span: el.lastChild
      };
      $.on(el, 'click', this.select);
      $.on(this.nodes.rm, 'click', (function(_this) {
        return function(e) {
          e.stopPropagation();
          return _this.rm();
        };
      })(this));
      $.on(this.nodes.label, 'click', (function(_this) {
        return function(e) {
          return e.stopPropagation();
        };
      })(this));
      $.on(this.nodes.spoiler, 'change', (function(_this) {
        return function(e) {
          _this.spoiler = e.target.checked;
          if (_this === QR.selected) {
            return QR.nodes.spoiler.checked = _this.spoiler;
          }
        };
      })(this));
      $.add(QR.nodes.dumpList, el);
      _ref = ['dragStart', 'dragEnter', 'dragLeave', 'dragOver', 'dragEnd', 'drop'];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        event = _ref[_i];
        $.on(el, event.toLowerCase(), this[event]);
      }
      this.thread = g.VIEW === 'thread' ? g.THREADID : 'new';
      prev = QR.posts[QR.posts.length - 1];
      QR.posts.push(this);
      this.nodes.spoiler.checked = this.spoiler = prev && Conf['Remember Spoiler'] ? prev.spoiler : false;
      QR.persona.get((function(_this) {
        return function(persona) {
          _this.name = 'name' in QR.persona.always ? QR.persona.always.name : prev ? prev.name : persona.name;
          _this.email = 'email' in QR.persona.always ? QR.persona.always.email : prev && !/^sage$/.test(prev.email) ? prev.email : persona.email;
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
      $.queueTask(function() {
        return QR.captcha.onNewPost();
      });
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
      return URL.revokeObjectURL(this.URL);
    };

    _Class.prototype.lock = function(lock) {
      var name, node, _i, _len, _ref;
      if (lock == null) {
        lock = true;
      }
      this.isLocked = lock;
      if (this !== QR.selected) {
        return;
      }
      _ref = ['thread', 'name', 'email', 'sub', 'com', 'fileButton', 'filename', 'spoiler', 'flag'];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        name = _ref[_i];
        if (node = QR.nodes[name]) {
          node.disabled = lock;
        }
      }
      this.nodes.rm.style.visibility = lock ? 'hidden' : '';
      (lock ? $.off : $.on)(QR.nodes.filename.previousElementSibling, 'click', QR.openFileInput);
      this.nodes.spoiler.disabled = lock;
      return this.nodes.el.draggable = !lock;
    };

    _Class.prototype.unlock = function() {
      return this.lock(false);
    };

    _Class.prototype.select = function() {
      var rectEl, rectList;
      if (QR.selected) {
        QR.selected.nodes.el.id = null;
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
      var name, node, _i, _len, _ref;
      _ref = ['thread', 'name', 'email', 'sub', 'com', 'filename', 'flag'];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        name = _ref[_i];
        if (!(node = QR.nodes[name])) {
          continue;
        }
        node.value = this[name] || node.dataset["default"] || null;
      }
      (this.thread !== 'new' ? $.addClass : $.rmClass)(QR.nodes.el, 'reply-to-thread');
      this.showFileData();
      return QR.characterCount();
    };

    _Class.prototype.save = function(input) {
      var name, _ref;
      if (input.type === 'checkbox') {
        this.spoiler = input.checked;
        return;
      }
      name = input.dataset.name;
      this[name] = input.value || input.dataset["default"] || null;
      switch (name) {
        case 'thread':
          (this.thread !== 'new' ? $.addClass : $.rmClass)(QR.nodes.el, 'reply-to-thread');
          return QR.status();
        case 'com':
          this.nodes.span.textContent = this.com;
          QR.captcha.onPostChange();
          QR.characterCount();
          if (QR.cooldown.auto && this === QR.posts[0] && (0 < (_ref = QR.cooldown.seconds) && _ref <= 5)) {
            return QR.cooldown.auto = false;
          }
          break;
        case 'filename':
          if (!this.file) {
            return;
          }
          this.file.newName = this.filename.replace(/[/\\]/g, '-');
          if (!/\.(jpe?g|png|gif|pdf|swf|webm)$/i.test(this.filename)) {
            this.file.newName += '.jpg';
          }
          return this.updateFilename();
      }
    };

    _Class.prototype.forceSave = function() {
      var name, node, _i, _len, _ref;
      if (this !== QR.selected) {
        return;
      }
      _ref = ['thread', 'name', 'email', 'sub', 'com', 'filename', 'spoiler', 'flag'];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        name = _ref[_i];
        if (!(node = QR.nodes[name])) {
          continue;
        }
        this.save(node);
      }
    };

    _Class.prototype.setFile = function(file, el) {
      this.file = file;
      this.filename = file.name;
      this.filesize = $.bytesToString(file.size);
      if (QR.spoiler) {
        this.nodes.label.hidden = false;
      }
      QR.captcha.onPostChange();
      URL.revokeObjectURL(this.URL);
      if (this === QR.selected) {
        this.showFileData();
      } else {
        this.updateFilename();
      }
      if (el) {
        return this.setThumbnail(el);
      } else {
        return this.nodes.el.style.backgroundImage = null;
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
      this.nodes.el.title = null;
      QR.nodes.fileContainer.title = '';
      this.nodes.el.style.backgroundImage = null;
      if (QR.spoiler) {
        this.nodes.label.hidden = true;
      }
      this.showFileData();
      return URL.revokeObjectURL(this.URL);
    };

    _Class.prototype.updateFilename = function() {
      var long;
      long = "" + this.filename + " (" + this.filesize + ")\nCtrl/\u2318+click to edit filename. Shift+click to clear.";
      this.nodes.el.title = long;
      if (this !== QR.selected) {
        return;
      }
      return QR.nodes.fileContainer.title = long;
    };

    _Class.prototype.showFileData = function() {
      if (this.file) {
        this.updateFilename();
        QR.nodes.filename.value = this.filename;
        QR.nodes.spoiler.checked = this.spoiler;
        return $.addClass(QR.nodes.fileSubmit, 'has-file');
      } else {
        return $.rmClass(QR.nodes.fileSubmit, 'has-file');
      }
    };

    _Class.prototype.pasteText = function(file) {
      var reader;
      reader = new FileReader();
      reader.onload = (function(_this) {
        return function(e) {
          var text;
          text = e.target.result;
          if (_this.com) {
            _this.com += "\n" + text;
          } else {
            _this.com = text;
          }
          if (QR.selected === _this) {
            QR.nodes.com.value = _this.com;
          }
          return _this.nodes.span.textContent = _this.com;
        };
      })(this);
      return reader.readAsText(file);
    };

    _Class.prototype.dragStart = function(e) {
      e.dataTransfer.setDragImage(this, e.layerX, e.layerY);
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
        return __slice.call(el.parentNode.children).indexOf(el);
      };
      oldIndex = index(el);
      newIndex = index(this);
      (oldIndex < newIndex ? $.after : $.before)(this, el);
      post = QR.posts.splice(oldIndex, 1)[0];
      QR.posts.splice(newIndex, 0, post);
      return QR.status();
    };

    return _Class;

  })();

  FappeTyme = {
    init: function() {
      var el, lc, type, _i, _len, _ref, _ref1;
      if (!(Conf['Fappe Tyme'] || Conf['Werk Tyme']) || ((_ref = g.VIEW) !== 'index' && _ref !== 'thread') || g.BOARD === 'f') {
        return;
      }
      this.nodes = {};
      this.enabled = {
        fappe: false,
        werk: Conf['werk']
      };
      _ref1 = ["Fappe", "Werk"];
      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
        type = _ref1[_i];
        if (!Conf["" + type + " Tyme"]) {
          continue;
        }
        lc = type.toLowerCase();
        el = UI.checkbox(lc, " " + type + " Tyme", false);
        el.title = "" + type + " Tyme";
        this.nodes[lc] = el.firstElementChild;
        if (Conf[lc]) {
          this.set(lc, true);
        }
        $.on(this.nodes[lc], 'change', this.toggle.bind(this, lc));
        Header.menu.addEntry({
          el: el,
          order: 97
        });
      }
      if (Conf['Werk Tyme']) {
        $.sync('werk', this.set.bind(this, 'werk'));
      }
      Post.callbacks.push({
        name: 'Fappe Tyme',
        cb: this.node
      });
      return CatalogThread.callbacks.push({
        name: 'Werk Tyme',
        cb: this.catalogNode
      });
    },
    node: function() {
      if (this.file) {
        return;
      }
      return $.addClass(this.nodes.root, "noFile");
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
      return $["" + (enabled ? 'add' : 'rm') + "Class"](doc, "" + type + "Tyme");
    },
    toggle: function(type) {
      this.set(type, !this.enabled[type]);
      if (type === 'werk') {
        return $.cb.checked.call(this.nodes[type]);
      }
    }
  };

  Gallery = {
    init: function() {
      var el, _ref;
      if (((_ref = g.VIEW) !== 'index' && _ref !== 'thread') || g.BOARD === 'f' || !Conf['Gallery']) {
        return;
      }
      this.delay = Conf['Slide Delay'];
      el = $.el('a', {
        href: 'javascript:;',
        id: 'appchan-gal',
        title: 'Gallery',
        className: 'fa fa-picture-o',
        textContent: 'Gallery'
      });
      $.on(el, 'click', this.cb.toggle);
      Header.addShortcut(el);
      return Post.callbacks.push({
        name: 'Gallery',
        cb: this.node
      });
    },
    node: function() {
      if (!this.file) {
        return;
      }
      if (Gallery.nodes) {
        Gallery.generateThumb(this);
        Gallery.nodes.total.textContent = Gallery.images.length;
      }
      if (!Conf['Image Expansion']) {
        return $.on(this.file.thumb.parentNode, 'click', Gallery.cb.image);
      }
    },
    build: function(image) {
      var candidate, cb, dialog, entry, file, key, menuButton, nodes, post, thumb, value, _i, _j, _len, _len1, _ref, _ref1, _ref2;
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
        innerHTML: "<div class=\"gal-viewport\"><span class=\"gal-buttons\"><a href=\"javascript:;\" class=\"gal-start\" title=\"Start slideshow (S to toggle)\"><i></i></a><a href=\"javascript:;\" class=\"gal-stop\" title=\"Stop slideshow (S to toggle)\"><i></i></a><a href=\"javascript:;\" class=\"menu-button\"><i></i></a><a href=\"javascript:;\" class=\"gal-close\">×</a></span><a class=\"gal-name\" target=\"_blank\"></a><span class=\"gal-count\"><span class=\"count\"></span> / <span class=\"total\"></span></span><div class=\"gal-prev\"></div><div class=\"gal-image\"><a href=\"javascript:;\"><img></a></div><div class=\"gal-next\"></div></div><div class=\"gal-thumbnails\"></div>"
      });
      _ref = {
        buttons: '.gal-buttons',
        name: '.gal-name',
        count: '.count',
        total: '.total',
        frame: '.gal-image',
        next: '.gal-image a',
        current: '.gal-image img',
        thumbs: '.gal-thumbnails'
      };
      for (key in _ref) {
        value = _ref[key];
        nodes[key] = $(value, dialog);
      }
      menuButton = $('.menu-button', dialog);
      nodes.menu = new UI.Menu('gallery');
      cb = Gallery.cb;
      $.on(nodes.frame, 'click', cb.blank);
      $.on(nodes.next, 'click', cb.click);
      $.on($('.gal-prev', dialog), 'click', cb.prev);
      $.on($('.gal-next', dialog), 'click', cb.next);
      $.on($('.gal-start', dialog), 'click', cb.start);
      $.on($('.gal-stop', dialog), 'click', cb.stop);
      $.on($('.gal-close', dialog), 'click', cb.close);
      $.on(menuButton, 'click', function(e) {
        return nodes.menu.toggle(e, this, g);
      });
      _ref1 = Gallery.menu.createSubEntries();
      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
        entry = _ref1[_i];
        entry.order = 0;
        nodes.menu.addEntry(entry);
      }
      $.on(d, 'keydown', cb.keybinds);
      if (Conf['Keybinds']) {
        $.off(d, 'keydown', Keybinds.keydown);
      }
      _ref2 = $$('.post .file');
      for (_j = 0, _len1 = _ref2.length; _j < _len1; _j++) {
        file = _ref2[_j];
        if (!(!$('.fileDeletedRes, .fileDeleted', file))) {
          continue;
        }
        post = Get.postFromNode(file);
        Gallery.generateThumb(post);
        if (!image && Gallery.fullIDs[post.fullID]) {
          candidate = post.file.thumb.parentNode;
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
      if (!(post.file && (post.file.isImage || post.file.isVideo || Conf['PDF in Gallery']))) {
        return;
      }
      if (Gallery.fullIDs[post.fullID]) {
        return;
      }
      Gallery.fullIDs[post.fullID] = true;
      thumb = $.el('a', {
        className: 'gal-thumb',
        href: post.file.URL,
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
    open: function(thumb) {
      var el, elType, file, name, newID, nodes, oldID, post, slideshow, _base, _ref;
      nodes = Gallery.nodes;
      name = nodes.name;
      oldID = +nodes.current.dataset.id;
      newID = +thumb.dataset.id;
      slideshow = Gallery.slideshow && (newID > oldID || (oldID === Gallery.images.length - 1 && newID === 0));
      if (el = $('.gal-highlight', nodes.thumbs)) {
        $.rmClass(el, 'gal-highlight');
      }
      $.addClass(thumb, 'gal-highlight');
      elType = 'img';
      if (/\.webm$/.test(thumb.href)) {
        elType = 'video';
      }
      if (/\.pdf$/.test(thumb.href)) {
        elType = 'iframe';
      }
      $[elType === 'iframe' ? 'addClass' : 'rmClass'](doc, 'gal-pdf');
      file = $.el(elType, {
        title: name.download = name.textContent = thumb.title
      });
      $.on(file, 'error', (function(_this) {
        return function() {
          return Gallery.error(file, thumb);
        };
      })(this));
      file.src = name.href = thumb.href;
      $.extend(file.dataset, thumb.dataset);
      if (!nodes.current.error) {
        if (typeof (_base = nodes.current).pause === "function") {
          _base.pause();
        }
      }
      $.replace(nodes.current, file);
      if (elType === 'video') {
        file.loop = true;
        if (Conf['Autoplay']) {
          file.play();
        }
        if (Conf['Show Controls']) {
          ImageCommon.addControls(file);
        }
      }
      nodes.count.textContent = +thumb.dataset.id + 1;
      nodes.current = file;
      nodes.frame.scrollTop = 0;
      nodes.next.focus();
      if (slideshow) {
        Gallery.setupTimer();
      } else {
        Gallery.cb.stop();
      }
      if (Conf['Scroll to Post'] && (post = (_ref = (post = g.posts[file.dataset.post])) != null ? _ref.nodes.root : void 0)) {
        Header.scrollTo(post);
      }
      return nodes.thumbs.scrollTop = thumb.offsetTop + thumb.offsetHeight / 2 - nodes.thumbs.clientHeight / 2;
    },
    error: function(file, thumb) {
      var _ref;
      if (((_ref = file.error) != null ? _ref.code : void 0) === MediaError.MEDIA_ERR_DECODE) {
        return new Notice('error', 'Corrupt or unplayable video', 30);
      }
      if (file.src.split('/')[2] !== 'i.4cdn.org') {
        return;
      }
      return ImageCommon.error(file, g.posts[file.dataset.post], null, function(URL) {
        if (!URL) {
          return;
        }
        thumb.href = URL;
        if (Gallery.nodes.current === file) {
          return file.src = URL;
        }
      });
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
            case 'Right':
              return Gallery.cb.next;
            case 'Enter':
              return Gallery.cb.enterKey;
            case 'Left':
            case '':
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
      enterKey: function() {
        if (Gallery.nodes.current.paused) {
          return Gallery.nodes.current.play();
        } else {
          return Gallery.cb.next();
        }
      },
      click: function() {
        return Gallery.cb[Gallery.nodes.current.controls ? 'stop' : 'enterKey']();
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
        var _base;
        if (typeof (_base = Gallery.nodes.current).pause === "function") {
          _base.pause();
        }
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
        return clearTimeout(Gallery.timeoutID);
      },
      setFitness: function() {
        return (this.checked ? $.addClass : $.rmClass)(doc, "gal-" + (this.name.toLowerCase().replace(/\s+/g, '-')));
      },
      setDelay: function() {
        return Gallery.delay = +this.value;
      }
    },
    menu: {
      init: function() {
        var el, _ref;
        if (((_ref = g.VIEW) !== 'index' && _ref !== 'thread') || !Conf['Gallery']) {
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
        label = UI.checkbox(name, " " + name);
        input = label.firstElementChild;
        $.on(input, 'change', Gallery.cb.setFitness);
        $.event('change', null, input);
        $.on(input, 'change', $.cb.checked);
        return {
          el: label
        };
      },
      createSubEntries: function() {
        var delayInput, delayLabel, subEntries;
        subEntries = ['Hide Thumbnails', 'Fit Width', 'Fit Height', 'Scroll to Post'].map(Gallery.menu.createSubEntry);
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

  ImageCommon = {
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
      var message, _ref;
      if (((_ref = file.error) != null ? _ref.code : void 0) !== MediaError.MEDIA_ERR_DECODE) {
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
    error: function(file, post, delay, cb) {
      var URL, redirect, src, timeoutID;
      src = post.file.URL.split('/');
      URL = Redirect.to('file', {
        boardID: post.board.ID,
        filename: src[src.length - 1]
      });
      if (!(Conf['404 Redirect'] && URL && Redirect.securityCheck(URL))) {
        URL = null;
      }
      if ((post.isDead || post.file.isDead) && file.src.split('/')[2] === 'i.4cdn.org') {
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
        if (file.src.split('/')[2] === 'i.4cdn.org') {
          if (delay != null) {
            clearTimeout(timeoutID);
          }
          return cb(URL);
        }
      };
      return $.ajax("//a.4cdn.org/" + post.board + "/thread/" + post.thread + ".json", {
        onload: function() {
          var postObj, _i, _len, _ref;
          if (this.status === 404) {
            post.kill();
          }
          if (this.status !== 200) {
            return redirect();
          }
          _ref = this.response.posts;
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            postObj = _ref[_i];
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
            return URL = post.file.URL;
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
          return (typeof chrome !== "undefined" && chrome !== null) || (video.readyState >= 3 && video.currentTime <= Math.max(0.1, video.duration - 0.5)) || new Date().getTime() >= t + 1000;
        }), function() {
          return video.controls = true;
        });
      };
      return $.on(video, 'mouseover', handler);
    }
  };

  ImageExpand = {
    init: function() {
      var _ref;
      if (((_ref = g.VIEW) !== 'index' && _ref !== 'thread') || !Conf['Image Expansion']) {
        return;
      }
      this.EAI = $.el('a', {
        className: 'expand-all-shortcut fa fa-expand',
        textContent: 'EAI',
        title: 'Expand All Images',
        href: 'javascript:;'
      });
      $.on(this.EAI, 'click', this.cb.toggleAll);
      Header.addShortcut(this.EAI, 3);
      $.on(d, 'scroll visibilitychange', this.cb.playVideos);
      this.videoControls = $.el('span', {
        className: 'video-controls'
      });
      $.extend(this.videoControls, {
        innerHTML: " <a href=\"javascript:;\" title=\"You can also contract the video by dragging it to the left.\">contract</a>"
      });
      return Post.callbacks.push({
        name: 'Image Expansion',
        cb: this.node
      });
    },
    node: function() {
      var _ref;
      if (!(this.file && (this.file.isImage || this.file.isVideo))) {
        return;
      }
      $.on(this.file.thumb.parentNode, 'click', ImageExpand.cb.toggle);
      if (this.isClone) {
        if (this.file.isExpanding) {
          ImageExpand.contract(this);
          return ImageExpand.expand(this);
        } else if (this.file.isExpanded && this.file.isVideo) {
          ImageExpand.setupVideoCB(this);
          return ImageExpand.setupVideo(this, !((_ref = this.origin.file.fullImage) != null ? _ref.paused : void 0) || this.origin.file.wasPlaying, this.file.fullImage.controls);
        }
      } else if (ImageExpand.on && !this.isHidden && !this.isFetchedQuote && (Conf['Expand spoilers'] || !this.file.isSpoiler) && (Conf['Expand videos'] || !this.file.isVideo)) {
        return ImageExpand.expand(this);
      }
    },
    cb: {
      toggle: function(e) {
        var file, post;
        if (e.shiftKey || e.altKey || e.ctrlKey || e.metaKey || e.button !== 0) {
          return;
        }
        post = Get.postFromNode(this);
        file = post.file;
        if (file.isExpanded && file.isVideo && file.fullImage.controls) {
          return;
        }
        e.preventDefault();
        return ImageExpand.toggle(post);
      },
      toggleAll: function() {
        var func, toggle;
        $.event('CloseMenu');
        toggle = function(post) {
          var file;
          file = post.file;
          if (!(file && (file.isImage || file.isVideo) && doc.contains(post.nodes.root))) {
            return;
          }
          if (ImageExpand.on && (!Conf['Expand spoilers'] && file.isSpoiler || !Conf['Expand videos'] && file.isVideo || Conf['Expand from here'] && Header.getTopOf(file.thumb) < 0)) {
            return;
          }
          return $.queueTask(func, post);
        };
        if (ImageExpand.on = $.hasClass(ImageExpand.EAI, 'expand-all-shortcut')) {
          ImageExpand.EAI.className = 'contract-all-shortcut fa fa-compress';
          ImageExpand.EAI.title = 'Contract All Images';
          func = function(post) {
            return ImageExpand.expand(post);
          };
        } else {
          ImageExpand.EAI.className = 'expand-all-shortcut fa fa-expand';
          ImageExpand.EAI.title = 'Expand All Images';
          func = ImageExpand.contract;
        }
        return g.posts.forEach(function(post) {
          var _i, _len, _ref;
          _ref = [post].concat(__slice.call(post.clones));
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            post = _ref[_i];
            toggle(post);
          }
        });
      },
      playVideos: function(e) {
        return g.posts.forEach(function(post) {
          var video, visible, _i, _len, _ref;
          _ref = [post].concat(__slice.call(post.clones));
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            post = _ref[_i];
            if (!(post.file && post.file.isVideo && post.file.isExpanded)) {
              continue;
            }
            video = post.file.fullImage;
            visible = Header.isNodeVisible(video);
            if (visible && post.file.wasPlaying) {
              delete post.file.wasPlaying;
              video.play();
            } else if (!visible && !video.paused) {
              post.file.wasPlaying = true;
              video.pause();
            }
          }
        });
      },
      setFitness: function() {
        return (this.checked ? $.addClass : $.rmClass)(doc, this.name.toLowerCase().replace(/\s+/g, '-'));
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
      var bottom, cb, el, eventName, file, oldHeight, scrollY, top, x, _i, _len, _ref, _ref1;
      file = post.file;
      if (el = file.fullImage) {
        top = Header.getTopOf(el);
        bottom = top + el.getBoundingClientRect().height;
        oldHeight = d.body.clientHeight;
        scrollY = window.scrollY;
      }
      $.rmClass(post.nodes.root, 'expanded-image');
      $.rmClass(file.thumb, 'expanding');
      if (file.videoControls) {
        $.rm(file.videoControls);
      }
      file.thumb.parentNode.href = file.URL;
      file.thumb.parentNode.target = '_blank';
      _ref = ['isExpanding', 'isExpanded', 'videoControls', 'wasPlaying', 'scrollIntoView'];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        x = _ref[_i];
        delete file[x];
      }
      if (!el) {
        return;
      }
      if (doc.contains(el)) {
        if (bottom <= 0) {
          window.scroll(0, scrollY + d.body.clientHeight - oldHeight);
        } else {
          Header.scrollToIfNeeded(post.nodes.root);
        }
        if (window.scrollX > 0) {
          window.scroll(0, window.scrollY);
        }
      }
      $.off(el, 'error', ImageExpand.error);
      ImageCommon.pushCache(el);
      if (file.isVideo) {
        el.pause();
        _ref1 = ImageExpand.videoCB;
        for (eventName in _ref1) {
          cb = _ref1[eventName];
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
      var el, file, isVideo, thumb, _ref;
      file = post.file;
      thumb = file.thumb, isVideo = file.isVideo;
      if (post.isHidden || file.isExpanding || file.isExpanded) {
        return;
      }
      $.addClass(thumb, 'expanding');
      file.isExpanding = true;
      if (file.fullImage) {
        el = file.fullImage;
      } else if (((_ref = ImageCommon.cache) != null ? _ref.dataset.fullID : void 0) === post.fullID) {
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
        el.src = src || file.URL;
      }
      el.className = 'full-image';
      $.after(thumb, el);
      if (isVideo) {
        if (Conf['Show Controls'] && !file.videoControls) {
          file.videoControls = ImageExpand.videoControls.cloneNode(true);
          $.add(file.text, file.videoControls);
        }
        thumb.parentNode.removeAttribute('href');
        thumb.parentNode.removeAttribute('target');
        el.loop = true;
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
        window.scroll(window.scrollX, scrollY + d.body.clientHeight - oldHeight);
      }
      if (file.scrollIntoView) {
        delete file.scrollIntoView;
        imageBottom = Header.getBottomOf(file.fullImage) - 25;
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
      $.asap(((function(_this) {
        return function() {
          return doc.contains(fullImage);
        };
      })(this)), (function(_this) {
        return function() {
          if (!d.hidden && Header.isNodeVisible(fullImage)) {
            return fullImage.play();
          } else {
            return post.file.wasPlaying = true;
          }
        };
      })(this));
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
        },
        click: function(e) {
          if (this.paused && !this.controls) {
            this.play();
            return e.stopPropagation();
          }
        }
      };
    })(),
    setupVideoCB: function(post) {
      var cb, eventName, _ref;
      _ref = ImageExpand.videoCB;
      for (eventName in _ref) {
        cb = _ref[eventName];
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
      if (this.src.split('/')[2] !== 'i.4cdn.org') {
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
        var conf, createSubEntry, el, name, subEntries, _ref, _ref1;
        if (((_ref = g.VIEW) !== 'index' && _ref !== 'thread') || !Conf['Image Expansion']) {
          return;
        }
        el = $.el('span', {
          textContent: 'Image Expansion',
          className: 'image-expansion-link'
        });
        createSubEntry = ImageExpand.menu.createSubEntry;
        subEntries = [];
        _ref1 = Config.imageExpansion;
        for (name in _ref1) {
          conf = _ref1[name];
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
        label = UI.checkbox(name, " " + name);
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

  ImageHover = {
    init: function() {
      var _ref;
      if ((_ref = g.VIEW) !== 'index' && _ref !== 'thread') {
        return;
      }
      if (Conf['Image Hover']) {
        Post.callbacks.push({
          name: 'Image Hover',
          cb: this.node
        });
      }
      if (Conf['Image Hover in Catalog']) {
        return CatalogThread.callbacks.push({
          name: 'Catalog Image Hover',
          cb: this.catalogNode
        });
      }
    },
    node: function() {
      if (!(this.file && (this.file.isImage || this.file.isVideo))) {
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
        var el, error, file, height, isVideo, left, maxHeight, maxWidth, padding, right, scale, width, _ref, _ref1, _ref2;
        if (!doc.contains(this)) {
          return;
        }
        file = post.file;
        isVideo = file.isVideo;
        if (file.isExpanding || file.isExpanded) {
          return;
        }
        error = ImageHover.error(post);
        if (((_ref = ImageCommon.cache) != null ? _ref.dataset.fullID : void 0) === post.fullID) {
          el = ImageCommon.popCache();
          $.on(el, 'error', error);
        } else {
          el = $.el((isVideo ? 'video' : 'img'));
          el.dataset.fullID = post.fullID;
          $.on(el, 'error', error);
          el.src = file.URL;
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
          if (Conf['Autoplay']) {
            el.play();
          }
        }
        _ref1 = file.dimensions.split('x').map(function(x) {
          return +x;
        }), width = _ref1[0], height = _ref1[1];
        _ref2 = this.getBoundingClientRect(), left = _ref2.left, right = _ref2.right;
        padding = 16;
        maxWidth = Math.max(left, doc.clientWidth - right);
        maxHeight = doc.clientHeight - padding;
        scale = Math.min(1, maxWidth / width, maxHeight / height);
        el.style.maxWidth = "" + (scale * width) + "px";
        el.style.maxHeight = "" + (scale * height) + "px";
        return UI.hover({
          root: this,
          el: el,
          latestEvent: e,
          endEvents: 'mouseout click',
          asapTest: function() {
            return true;
          },
          height: scale * height + padding,
          noRemove: true,
          cb: function() {
            $.off(el, 'error', error);
            ImageCommon.pushCache(el);
            if (isVideo) {
              el.pause();
            }
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

  ImageLoader = {
    init: function() {
      var prefetch, _ref;
      if ((_ref = g.VIEW) !== 'index' && _ref !== 'thread') {
        return;
      }
      if (!(Conf['Image Prefetching'] || Conf['Replace JPG'] || Conf['Replace PNG'] || Conf['Replace GIF'] || Conf['Replace WEBM'])) {
        return;
      }
      Post.callbacks.push({
        name: 'Image Replace',
        cb: this.node
      });
      $.on(d, 'PostsInserted', function() {
        return g.posts.forEach(ImageLoader.prefetch);
      });
      if (Conf['Replace WEBM']) {
        $.on(d, 'scroll visibilitychange 4chanXInitFinished PostsInserted', function() {
          var qpClone, _ref1;
          qpClone = (_ref1 = $.id('qp')) != null ? _ref1.firstElementChild : void 0;
          return g.posts.forEach(function(post) {
            var thumb, _i, _len, _ref2, _ref3;
            _ref2 = [post].concat(__slice.call(post.clones));
            for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
              post = _ref2[_i];
              if (!((_ref3 = post.file) != null ? _ref3.videoThumb : void 0)) {
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
        });
      }
      if (!Conf['Image Prefetching']) {
        return;
      }
      prefetch = $.el('label', {
        innerHTML: "<input type=\"checkbox\" name=\"prefetch\"> Prefetch Images"
      });
      this.el = prefetch.firstElementChild;
      $.on(this.el, 'change', function() {
        if (Conf['prefetch'] = this.checked) {
          return g.posts.forEach(ImageLoader.prefetch);
        }
      });
      return Header.menu.addEntry({
        el: prefetch,
        order: 104
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
      var attr, file, thumb, video, _i, _len, _ref;
      file = post.file;
      thumb = file.thumb;
      video = $.el('video', {
        preload: 'none',
        loop: true,
        poster: thumb.src,
        textContent: thumb.alt,
        className: thumb.className
      });
      video.dataset.md5 = thumb.dataset.md5;
      _ref = ['height', 'width', 'maxHeight', 'maxWidth'];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        attr = _ref[_i];
        video.style[attr] = thumb.style[attr];
      }
      video.src = file.URL;
      $.replace(thumb, video);
      file.thumb = video;
      return file.videoThumb = true;
    },
    prefetch: function(post) {
      var URL, clone, el, file, isImage, isVideo, match, replace, thumb, type, _i, _len, _ref;
      file = post.file;
      if (!file) {
        return;
      }
      isImage = file.isImage, isVideo = file.isVideo, thumb = file.thumb, URL = file.URL;
      if (file.isPrefetched || !(isImage || isVideo) || post.isHidden || post.thread.isHidden) {
        return;
      }
      type = (match = URL.match(/\.([^.]+)$/)[1].toUpperCase()) === 'JPEG' ? 'JPG' : match;
      replace = Conf["Replace " + type] && !/spoiler/.test(thumb.src);
      if (!(replace || Conf['prefetch'])) {
        return;
      }
      if (![post].concat(__slice.call(post.clones)).some(function(clone) {
        return doc.contains(clone.nodes.root);
      })) {
        return;
      }
      file.isPrefetched = true;
      if (file.videoThumb) {
        _ref = post.clones;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          clone = _ref[_i];
          clone.file.thumb.preload = 'auto';
        }
        thumb.preload = 'auto';
        if (typeof chrome === "undefined" || chrome === null) {
          $.on(thumb, 'loadeddata', function() {
            return this.removeAttribute('poster');
          });
        }
        return;
      }
      el = $.el(isImage ? 'img' : 'video');
      if (replace && isImage) {
        $.on(el, 'load', function() {
          var _j, _len1, _ref1;
          _ref1 = post.clones;
          for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
            clone = _ref1[_j];
            clone.file.thumb.src = URL;
          }
          return thumb.src = URL;
        });
      }
      return el.src = URL;
    }
  };

  RevealSpoilers = {
    init: function() {
      var _ref;
      if (((_ref = g.VIEW) !== 'index' && _ref !== 'thread') || !Conf['Reveal Spoiler Thumbnails']) {
        return;
      }
      return Post.callbacks.push({
        cb: this.node
      });
    },
    node: function() {
      var thumb, _ref;
      if (this.isClone || !((_ref = this.file) != null ? _ref.isSpoiler : void 0)) {
        return;
      }
      thumb = this.file.thumb;
      thumb.removeAttribute('style');
      thumb.style.maxHeight = thumb.style.maxWidth = this.isReply ? '125px' : '250px';
      return thumb.src = this.file.thumbURL;
    }
  };

  Sauce = {
    init: function() {
      var err, link, links, _i, _len, _ref, _ref1;
      if (((_ref = g.VIEW) !== 'index' && _ref !== 'thread') || !Conf['Sauce']) {
        return;
      }
      links = [];
      _ref1 = Conf['sauces'].split('\n');
      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
        link = _ref1[_i];
        try {
          if (link[0] !== '#') {
            links.push(link.trim());
          }
        } catch (_error) {
          err = _error;
        }
      }
      if (!links.length) {
        return;
      }
      this.links = links;
      this.link = $.el('a', {
        target: '_blank'
      });
      return Post.callbacks.push({
        name: 'Sauce',
        cb: this.node
      });
    },
    createSauceLink: function(link, post) {
      var a, ext, i, key, m, part, parts, _i, _len, _ref, _ref1, _ref2, _ref3;
      parts = {};
      _ref = link.split(/;(?=(?:text|boards|types):)/);
      for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
        part = _ref[i];
        if (i === 0) {
          parts['url'] = part;
        } else {
          m = part.match(/^(\w*):(.*)$/);
          parts[m[1]] = m[2];
        }
      }
      parts['text'] || (parts['text'] = ((_ref1 = parts['url'].match(/(\w+)\.\w+\//)) != null ? _ref1[1] : void 0) || '?');
      for (key in parts) {
        parts[key] = parts[key].replace(/%(T?URL|MD5|board|name|%|semi)/g, function(parameter) {
          var type;
          type = {
            '%TURL': post.file.thumbURL,
            '%URL': post.file.URL,
            '%MD5': post.file.MD5,
            '%board': post.board.ID,
            '%name': post.file.name,
            '%%': '%',
            '%semi': ';'
          }[parameter];
          if (key === 'url' && parameter !== '%%' && parameter !== '%semi') {
            if (/^javascript:/i.test(parts['url'])) {
              type = JSON.stringify(type);
            }
            type = encodeURIComponent(type);
          }
          return type;
        });
      }
      ext = ((_ref2 = post.file.URL.match(/\.([^\.]*)$/)) != null ? _ref2[1] : void 0) || '';
      if (!(!parts['boards'] || (_ref3 = post.board.ID, __indexOf.call(parts['boards'].split(','), _ref3) >= 0))) {
        return null;
      }
      if (!(!parts['types'] || __indexOf.call(parts['types'].split(','), ext) >= 0)) {
        return null;
      }
      a = Sauce.link.cloneNode(true);
      a.href = parts['url'];
      a.textContent = parts['text'];
      if (/^javascript:/i.test(parts['url'])) {
        a.removeAttribute('target');
      }
      return a;
    },
    node: function() {
      var link, node, nodes, _i, _len, _ref;
      if (this.isClone || !this.file) {
        return;
      }
      nodes = [];
      _ref = Sauce.links;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        link = _ref[_i];
        if (node = Sauce.createSauceLink(link, this)) {
          nodes.push($.tn('\u00A0'), node);
        }
      }
      return $.add(this.file.text, nodes);
    }
  };

  Embedding = {
    init: function() {
      var type, _i, _len, _ref;
      if (!(Conf['Embedding'] || Conf['Link Title'])) {
        return;
      }
      this.types = {};
      _ref = this.ordered_types;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        type = _ref[_i];
        this.types[type.key] = type;
      }
      if (Conf['Floating Embeds']) {
        this.dialog = UI.dialog('embedding', 'top: 50px; right: 0px;', {
          innerHTML: "<div><div class=\"move\"></div><a href=\"javascript:;\" class=\"jump\" title=\"Jump to post\">→</a><a href=\"javascript:;\" class=\"close\" title=\"Close\">×</a></div><div id=\"media-embed\"><div></div></div>"
        });
        this.media = $('#media-embed', this.dialog);
        $.one(d, '4chanXInitFinished', this.ready);
      }
      if (Conf['Link Title']) {
        return $.on(d, '4chanXInitFinished PostsInserted', function() {
          var key, service, _ref1, _ref2;
          _ref1 = Embedding.types;
          for (key in _ref1) {
            service = _ref1[key];
            if ((_ref2 = service.title) != null ? _ref2.batchSize : void 0) {
              Embedding.flushTitles(service.title);
            }
          }
        });
      }
    },
    events: function(post) {
      var el, i, items;
      if (!Conf['Embedding']) {
        return;
      }
      i = 0;
      items = $$('.embedder', post.nodes.comment);
      while (el = items[i++]) {
        $.on(el, 'click', Embedding.cb.toggle);
        if ($.hasClass(el, 'embedded')) {
          Embedding.cb.toggle.call(el);
        }
      }
    },
    process: function(link, post) {
      var data;
      if (!(Conf['Embedding'] || Conf['Link Title'])) {
        return;
      }
      if ($.x('ancestor::pre', link)) {
        return;
      }
      if (data = Embedding.services(link)) {
        data.post = post;
        if (Conf['Embedding']) {
          Embedding.embed(data);
        }
        if (Conf['Link Title']) {
          return Embedding.title(data);
        }
      }
    },
    services: function(link) {
      var href, match, type, _i, _len, _ref;
      href = link.href;
      _ref = Embedding.ordered_types;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        type = _ref[_i];
        if (!(match = type.regExp.exec(href))) {
          continue;
        }
        if (type.dummy || type.httpOnly && location.protocol !== 'http:') {
          return;
        }
        return {
          key: type.key,
          uid: match[1],
          options: match[2],
          link: link
        };
      }
    },
    embed: function(data) {
      var embed, key, link, name, options, post, uid, value, _ref;
      key = data.key, uid = data.uid, options = data.options, link = data.link, post = data.post;
      embed = $.el('a', {
        className: 'embedder',
        rel: 'nofollow noreferrer',
        href: link.href,
        textContent: '(embed)'
      });
      _ref = {
        key: key,
        uid: uid,
        options: options
      };
      for (name in _ref) {
        value = _ref[name];
        embed.dataset[name] = value;
      }
      $.addClass(link, "" + embed.dataset.key);
      $.on(embed, 'click', Embedding.cb.toggle);
      $.after(link, [$.tn(' '), embed]);
      if (Conf['Auto-embed'] && !Conf['Floating Embeds'] && !post.isFetchedQuote) {
        return $.asap((function() {
          return doc.contains(embed);
        }), function() {
          return Embedding.cb.toggle.call(embed);
        });
      }
    },
    ready: function() {
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
        style.visibility = '';
        return;
      }
      $.on(d, 'mouseup', Embedding.dragEmbed);
      Embedding.dragEmbed.mouseup = true;
      return style.visibility = 'hidden';
    },
    title: function(data) {
      var key, link, options, post, service, uid;
      key = data.key, uid = data.uid, options = data.options, link = data.link, post = data.post;
      if (!(service = Embedding.types[key].title)) {
        return;
      }
      if (service.batchSize) {
        (service.queue || (service.queue = [])).push(data);
        if (service.queue.length >= service.batchSize) {
          return Embedding.flushTitles(service);
        }
      } else {
        if (!$.cache(service.api(uid), (function() {
          return Embedding.cb.title(this, data);
        }), {
          responseType: 'json'
        })) {
          return $.extend(link, {
            innerHTML: "[" + E(key) + "] <span class=\"warning\">Title Link Blocked</span> (are you using NoScript?)</a>"
          });
        }
      }
    },
    flushTitles: function(service) {
      var cb, data, queue, _i, _len;
      queue = service.queue;
      if (!(queue != null ? queue.length : void 0)) {
        return;
      }
      service.queue = [];
      cb = function() {
        var data, _i, _len;
        for (_i = 0, _len = queue.length; _i < _len; _i++) {
          data = queue[_i];
          Embedding.cb.title(this, data);
        }
      };
      if (!$.cache(service.api((function() {
        var _i, _len, _results;
        _results = [];
        for (_i = 0, _len = queue.length; _i < _len; _i++) {
          data = queue[_i];
          _results.push(data.uid);
        }
        return _results;
      })()), cb, {
        responseType: 'json'
      })) {
        for (_i = 0, _len = queue.length; _i < _len; _i++) {
          data = queue[_i];
          $.extend(data.link, {
            innerHTML: "[" + E(data.key) + "] <span class=\"warning\">Title Link Blocked</span> (are you using NoScript?)</a>"
          });
        }
      }
    },
    cb: {
      toggle: function(e) {
        var div;
        if (e != null) {
          e.preventDefault();
        }
        if (Conf['Floating Embeds']) {
          if (!(div = Embedding.media.firstChild)) {
            return;
          }
          $.replace(div, Embedding.cb.embed(this));
          Embedding.lastEmbed = Get.postFromNode(this).nodes.root;
          $.rmClass(Embedding.dialog, 'empty');
          return;
        }
        if ($.hasClass(this, "embedded")) {
          if (!$.hasClass(this.previousElementSibling, 'linkify')) {
            $.rm(this.previousElementSibling);
          }
          this.previousElementSibling.hidden = false;
          this.textContent = '(embed)';
        } else {
          this.previousElementSibling.hidden = true;
          $.before(this, Embedding.cb.embed(this));
          this.textContent = '(unembed)';
        }
        return $.toggleClass(this, 'embedded');
      },
      embed: function(a) {
        var el, type;
        el = (type = Embedding.types[a.dataset.key]).el(a);
        el.style.cssText = type.style != null ? type.style : "border: 0; width: 640px; height: 390px";
        return el;
      },
      title: function(req, data) {
        var key, link, link2, options, post, post2, service, status, text, uid, _i, _j, _len, _len1, _ref, _ref1;
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
              return "" + status + "'d";
          }
        })());
        link.dataset.original = link.textContent;
        link.textContent = text;
        _ref = post.clones;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          post2 = _ref[_i];
          _ref1 = $$('a.linkify', post2.nodes.comment);
          for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
            link2 = _ref1[_j];
            if (!(link2.href === link.href)) {
              continue;
            }
            link2.dataset.original = link2.textContent;
            link2.textContent = text;
          }
        }
      }
    },
    ordered_types: [
      {
        key: 'audio',
        regExp: /\.(?:mp3|ogg|wav)(?:\?|$)/i,
        style: '',
        el: function(a) {
          return $.el('audio', {
            controls: true,
            preload: 'auto',
            src: a.href
          });
        }
      }, {
        key: 'gist',
        regExp: /^\w+:\/\/gist\.github\.com\/(?:[\w\-]+\/)?(\w+)/,
        el: function(a) {
          var content, el;
          el = $.el('iframe');
          el.setAttribute('sandbox', 'allow-scripts');
          content = {
            innerHTML: "<html><head><title>" + E(a.dataset.uid) + "</title></head><body><script src=\"https://gist.github.com/" + E(a.dataset.uid) + ".js\"></script></body></html>"
          };
          el.src = "data:text/html;charset=utf-8,<!doctype html>" + (encodeURIComponent(content.innerHTML));
          return el;
        },
        title: {
          api: function(uid) {
            return "https://api.github.com/gists/" + uid;
          },
          text: function(_arg) {
            var file, files;
            files = _arg.files;
            for (file in files) {
              if (files.hasOwnProperty(file)) {
                return file;
              }
            }
          }
        }
      }, {
        key: 'image',
        regExp: /\.(?:gif|png|jpg|jpeg|bmp)(?:\?|$)/i,
        style: '',
        el: function(a) {
          return $.el('div', {
            innerHTML: "<a target=\"_blank\" href=\"" + E(a.href) + "\"><img src=\"" + E(a.href) + "\" style=\"max-width: 80vw; max-height: 80vh;\"></a>"
          });
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
        key: 'Twitter',
        regExp: /^\w+:\/\/(?:www\.)?twitter\.com\/(\w+\/status\/\d+)/,
        el: function(a) {
          return $.el('iframe', {
            src: "https://twitframe.com/show?url=https://twitter.com/" + a.dataset.uid
          });
        }
      }, {
        key: 'LiveLeak',
        regExp: /^\w+:\/\/(?:\w+\.)?liveleak\.com\/.*\?.*i=(\w+)/,
        httpOnly: true,
        el: function(a) {
          var el;
          el = $.el('iframe', {
            width: "640",
            height: "360",
            src: "http://www.liveleak.com/ll_embed?i=" + a.dataset.uid,
            frameborder: "0"
          });
          el.setAttribute("allowfullscreen", "true");
          return el;
        }
      }, {
        key: 'MediaCrush',
        regExp: /^\w+:\/\/(?:www\.)?mediacru\.sh\/([\w\-]+)/,
        style: '',
        el: function(a) {
          var el;
          el = $.el('div');
          $.queueTask(function() {
            return $.cache("https://mediacru.sh/" + a.dataset.uid + ".json", function() {
              var embed, ext, file, files, i, status, type, _i, _j, _k, _len, _len1, _len2, _ref, _ref1;
              if (!doc.contains(el)) {
                return;
              }
              status = this.status;
              if (status !== 200 && status !== 304) {
                return el.textContent = "ERROR " + status;
              }
              files = this.response.files;
              _ref = ['video/mp4', 'video/webm', 'video/ogv', 'image/svg+xml', 'image/png', 'image/gif', 'image/jpeg', 'audio/mpeg', 'audio/ogg'];
              for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                type = _ref[_i];
                for (_j = 0, _len1 = files.length; _j < _len1; _j++) {
                  file = files[_j];
                  if (file.type === type) {
                    embed = file;
                    break;
                  }
                }
                if (embed) {
                  break;
                }
              }
              if (!embed) {
                return el.textContent = "ERROR: Not a valid filetype";
              }
              switch (embed.type) {
                case 'video/mp4':
                case 'video/webm':
                case 'video/ogv':
                  $.extend(el, {
                    innerHTML: "<video controls loop style=\"max-width: 80vw; max-height: 80vh;\"><source type=\"video/mp4\"><source type=\"video/webm\"></video>"
                  });
                  _ref1 = ['mp4', 'webm'];
                  for (i = _k = 0, _len2 = _ref1.length; _k < _len2; i = ++_k) {
                    ext = _ref1[i];
                    el.firstChild.children[i].src = "https://mediacru.sh/" + a.dataset.uid + "." + ext;
                  }
                  break;
                case 'image/svg+xml':
                case 'image/png':
                case 'image/gif':
                case 'image/jpeg':
                  $.extend(el, {
                    innerHTML: "<a target=\"_blank\" href=\"" + E(a.href) + "\"><img src=\"https://mediacru.sh/" + E(file.file) + "\" style=\"max-width: 80vw; max-height: 80vh;\"></a>"
                  });
                  break;
                case 'audio/mpeg':
                case 'audio/ogg':
                  $.extend(el, {
                    innerHTML: "<audio controls><source type=\"audio/ogg\" src=\"https://mediacru.sh/" + E(a.dataset.uid) + ".ogg\"></audio>"
                  });
                  break;
                default:
                  el.textContent = "ERROR: No valid filetype.";
              }
            });
          });
          return el;
        }
      }, {
        key: 'pastebin',
        regExp: /^\w+:\/\/(?:\w+\.)?pastebin\.com\/(?!u\/)(?:[\w\.]+\?i\=)?(\w+)/,
        httpOnly: true,
        el: function(a) {
          var div;
          return div = $.el('iframe', {
            src: "http://pastebin.com/embed_iframe.php?i=" + a.dataset.uid
          });
        }
      }, {
        key: 'gfycat',
        regExp: /^\w+:\/\/(?:www\.)?gfycat\.com\/(?:iframe\/)?(\w+)/,
        el: function(a) {
          var div;
          return div = $.el('iframe', {
            src: "//gfycat.com/iframe/" + a.dataset.uid
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
            return "//soundcloud.com/oembed?format=json&url=https%3A%2F%2Fsoundcloud.com%2F" + (encodeURIComponent(uid));
          },
          text: function(_) {
            return _.title;
          }
        }
      }, {
        key: 'StrawPoll',
        regExp: /^\w+:\/\/(?:www\.)?strawpoll\.me\/(?:embed_\d+\/)?(\d+(?:\/r)?)/,
        httpOnly: true,
        style: 'border: 0; width: 600px; height: 406px;',
        el: function(a) {
          return $.el('iframe', {
            src: "http://strawpoll.me/embed_1/" + a.dataset.uid
          });
        }
      }, {
        key: 'TwitchTV',
        regExp: /^\w+:\/\/(?:www\.)?twitch\.tv\/([^#\&\?]*)/,
        httpOnly: true,
        style: "border: none; width: 640px; height: 360px;",
        el: function(a) {
          var channel, id, idparam, obj, result, type, _;
          if (result = /(\w+)\/([bc])\/(\d+)/i.exec(a.dataset.uid)) {
            _ = result[0], channel = result[1], type = result[2], id = result[3];
            idparam = {
              'b': 'archive_id',
              'c': 'chapter_id'
            };
            obj = $.el('object', {
              data: 'http://www.twitch.tv/widgets/archive_embed_player.swf'
            });
            $.extend(obj, {
              innerHTML: "<param name=\"allowFullScreen\" value=\"true\"><param name=\"flashvars\">"
            });
            obj.children[1].value = "channel=" + channel + "&start_volume=25&auto_play=false&" + idparam[type] + "=" + id;
            return obj;
          } else {
            channel = (/(\w+)/.exec(a.dataset.uid))[0];
            obj = $.el('object', {
              data: "http://www.twitch.tv/widgets/live_embed_player.swf?channel=" + channel
            });
            $.extend(obj, {
              innerHTML: "<param name=\"allowFullScreen\" value=\"true\"><param name=\"flashvars\">"
            });
            obj.children[1].value = "hostname=www.twitch.tv&channel=" + channel + "&auto_play=true&start_volume=25";
            return obj;
          }
        }
      }, {
        key: 'Vocaroo',
        regExp: /^\w+:\/\/(?:www\.)?vocaroo\.com\/i\/(\w+)/,
        style: '',
        el: function(a) {
          return $.el('audio', {
            controls: true,
            preload: 'auto',
            src: "http://vocaroo.com/media_command.php?media=" + a.dataset.uid + "&command=download_ogg"
          });
        }
      }, {
        key: 'Vimeo',
        regExp: /^\w+:\/\/(?:www\.)?vimeo\.com\/(\d+)/,
        el: function(a) {
          return $.el('iframe', {
            src: "//player.vimeo.com/video/" + a.dataset.uid + "?wmode=opaque"
          });
        },
        title: {
          api: function(uid) {
            return "https://vimeo.com/api/oembed.json?url=http://vimeo.com/" + uid;
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
        key: 'YouTube',
        regExp: /^\w+:\/\/(?:youtu.be\/|[\w\.]*youtube[\w\.]*\/.*(?:v=|\/embed\/|\/v\/|\/videos\/))([\w\-]{11})[^#\&\?]?(.*)/,
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
            src: "//www.youtube.com/embed/" + a.dataset.uid + "?wmode=opaque" + (start ? '&start=' + start : '')
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
            var item, _i, _len, _ref;
            _ref = data.items;
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
              item = _ref[_i];
              if (item.id === uid) {
                return item.snippet.title;
              }
            }
            return 'Not Found';
          }
        }
      }, {
        key: 'Loopvid',
        regExp: /^\w+:\/\/(?:www\.)?loopvid.appspot.com\/((?:pf|kd|lv|mc|gd|gh|db|nn)\/[\w\-]+(,[\w\-]+)*|fc\/\w+\/\d+)/,
        style: 'max-width: 80vw; max-height: 80vh;',
        el: function(a) {
          var base, el, host, name, names, type, types, url, _, _i, _j, _len, _len1, _ref, _ref1;
          el = $.el('video', {
            controls: true,
            preload: 'auto',
            loop: true
          });
          _ref = a.dataset.uid.match(/(\w+)\/(.*)/), _ = _ref[0], host = _ref[1], names = _ref[2];
          types = host === 'gd' || host === 'fc' ? [''] : ['.webm', '.mp4'];
          _ref1 = names.split(',');
          for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
            name = _ref1[_i];
            for (_j = 0, _len1 = types.length; _j < _len1; _j++) {
              type = types[_j];
              base = "" + name + type;
              url = (function() {
                switch (host) {
                  case 'pf':
                    return "http://a.pomf.se/" + base;
                  case 'kd':
                    return "http://kastden.org/loopvid/" + base;
                  case 'lv':
                    return "http://loopvid.mooo.com/videos/" + base;
                  case 'mc':
                    return "https://cdn.mediacru.sh/" + base;
                  case 'gd':
                    return "https://docs.google.com/uc?export=download&id=" + base;
                  case 'gh':
                    return "https://googledrive.com/host/" + base;
                  case 'db':
                    return "https://googledrive.com/host/" + base;
                  case 'fc':
                    return "//i.4cdn.org/" + base + ".webm";
                  case 'nn':
                    return "http://naenara.eu/loopvids/" + base;
                }
              })();
              $.add(el, $.el('source', {
                src: url
              }));
            }
          }
          return el;
        }
      }, {
        key: 'Clyp',
        regExp: /^\w+:\/\/(?:www\.)?clyp\.it\/(\w+)/,
        style: '',
        el: function(a) {
          return $.el('audio', {
            controls: true,
            preload: 'auto',
            src: "http://clyp.it/" + a.dataset.uid + ".ogg"
          });
        }
      }, {
        key: 'Loopvid-dummy',
        regExp: /^\w+:\/\/(?:www\.)?loopvid.appspot.com\//,
        dummy: true
      }, {
        key: 'MediaFire-dummy',
        regExp: /^\w+:\/\/(?:www\.)?mediafire.com\//,
        dummy: true
      }, {
        key: 'video',
        regExp: /\.(?:ogv|webm|mp4)(?:\?|$)/i,
        style: 'max-width: 80vw; max-height: 80vh;',
        el: function(a) {
          return $.el('video', {
            controls: true,
            preload: 'auto',
            src: a.href
          });
        }
      }
    ]
  };

  Linkify = {
    init: function() {
      var _ref;
      if (((_ref = g.VIEW) !== 'index' && _ref !== 'thread') || !Conf['Linkify']) {
        return;
      }
      if (Conf['Comment Expansion']) {
        ExpandComment.callbacks.push(this.node);
      }
      Post.callbacks.push({
        name: 'Linkify',
        cb: this.node
      });
      CatalogThread.callbacks.push({
        name: 'Linkify',
        cb: this.catalogNode
      });
      return Embedding.init();
    },
    node: function() {
      var link, links, _i, _len;
      if (this.isClone) {
        return Embedding.events(this);
      }
      if (!Linkify.regString.test(this.info.comment)) {
        return;
      }
      links = Linkify.process(this.nodes.comment);
      for (_i = 0, _len = links.length; _i < _len; _i++) {
        link = links[_i];
        Embedding.process(link, this);
      }
    },
    catalogNode: function() {
      if (!Linkify.regString.test(this.thread.OP.info.comment)) {
        return;
      }
      return Linkify.process(this.nodes.comment);
    },
    process: function(node) {
      var data, end, endNode, i, index, length, links, result, saved, snapshot, space, test, word;
      test = /[^\s'"]+/g;
      space = /[\s'"]/;
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
    regString: /((https?|mailto|git|magnet|ftp|irc):([a-z\d%\/?])|([-a-z\d]+[.])+(aero|asia|biz|cat|com|coop|dance|info|int|jobs|mobi|moe|museum|name|net|org|post|pro|tel|travel|xxx|edu|gov|mil|[a-z]{2})([:\/]|(?![^\s'"]))|[\d]{1,3}\.[\d]{1,3}\.[\d]{1,3}\.[\d]{1,3}|[-\w\d.@]+@[a-z\d.-]+\.[a-z\d])/i,
    makeRange: function(startNode, endNode, startOffset, endOffset) {
      var range;
      range = document.createRange();
      range.setStart(startNode, startOffset);
      range.setEnd(endNode, endOffset);
      return range;
    },
    makeLink: function(range) {
      var a, i, t, text;
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
      a = $.el('a', {
        className: 'linkify',
        rel: 'nofollow noreferrer',
        target: '_blank',
        href: text
      });
      $.add(a, range.extractContents());
      range.insertNode(a);
      range.detach();
      return a;
    }
  };

  ArchiveLink = {
    init: function() {
      var div, entry, type, _i, _len, _ref, _ref1;
      if (((_ref = g.VIEW) !== 'index' && _ref !== 'thread') || !Conf['Menu'] || !Conf['Archive Link']) {
        return;
      }
      div = $.el('div', {
        textContent: 'Archive'
      });
      entry = {
        el: div,
        order: 90,
        open: function(_arg) {
          var ID, board, thread;
          ID = _arg.ID, thread = _arg.thread, board = _arg.board;
          return !!Redirect.to('thread', {
            postID: ID,
            threadID: thread.ID,
            boardID: board.ID
          });
        },
        subEntries: []
      };
      _ref1 = [['Post', 'post'], ['Name', 'name'], ['Tripcode', 'tripcode'], ['Unique ID', 'uniqueID'], ['Subject', 'subject'], ['Filename', 'filename'], ['Image MD5', 'MD5']];
      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
        type = _ref1[_i];
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
      open = type === 'post' ? function(_arg) {
        var ID, board, thread;
        ID = _arg.ID, thread = _arg.thread, board = _arg.board;
        el.href = Redirect.to('thread', {
          postID: ID,
          threadID: thread.ID,
          boardID: board.ID
        });
        return true;
      } : function(post) {
        var value;
        value = Filter[type](post);
        if (!value) {
          return false;
        }
        el.href = Redirect.to('search', {
          boardID: post.board.ID,
          type: type,
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

  DeleteLink = {
    init: function() {
      var div, fileEl, fileEntry, postEl, postEntry, _ref;
      if (((_ref = g.VIEW) !== 'index' && _ref !== 'thread') || !Conf['Menu'] || !Conf['Delete Link']) {
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
      postEntry = {
        el: postEl,
        open: function() {
          postEl.textContent = 'Post';
          $.on(postEl, 'click', DeleteLink["delete"]);
          return true;
        }
      };
      fileEntry = {
        el: fileEl,
        open: function(_arg) {
          var file;
          file = _arg.file;
          if (!file || file.isDead) {
            return false;
          }
          fileEl.textContent = 'File';
          $.on(fileEl, 'click', DeleteLink["delete"]);
          return true;
        }
      };
      return Menu.menu.addEntry({
        el: div,
        order: 40,
        open: function(post) {
          var node;
          if (post.isDead) {
            return false;
          }
          DeleteLink.post = post;
          node = div.firstChild;
          node.textContent = 'Delete';
          DeleteLink.cooldown.start(post, node);
          return true;
        },
        subEntries: [postEntry, fileEntry]
      });
    },
    "delete": function() {
      var fileOnly, form, link, post;
      post = DeleteLink.post;
      if (DeleteLink.cooldown.counting === post) {
        return;
      }
      $.off(this, 'click', DeleteLink["delete"]);
      fileOnly = $.hasClass(this, 'delete-file');
      this.textContent = "Deleting " + (fileOnly ? 'file' : 'post') + "...";
      form = {
        mode: 'usrdel',
        onlyimgdel: fileOnly,
        pwd: QR.persona.getPassword()
      };
      form[post.ID] = 'delete';
      link = this;
      return $.ajax($.id('delform').action.replace("/" + g.BOARD + "/", "/" + post.board + "/"), {
        responseType: 'document',
        withCredentials: true,
        onload: function() {
          return DeleteLink.load(link, post, fileOnly, this.response);
        },
        onerror: function() {
          return DeleteLink.error(link);
        }
      }, {
        form: $.formData(form)
      });
    },
    load: function(link, post, fileOnly, resDoc) {
      var msg, s;
      if (resDoc.title === '4chan - Banned') {
        s = 'Banned!';
      } else if (msg = resDoc.getElementById('errmsg')) {
        s = msg.textContent;
        $.on(link, 'click', DeleteLink["delete"]);
      } else {
        if (resDoc.title === 'Updating index...') {
          QR.cooldown["delete"](post);
          (post.origin || post).kill(fileOnly);
        }
        s = 'Deleted';
      }
      return link.textContent = s;
    },
    error: function(link) {
      link.textContent = 'Connection error, please retry.';
      return $.on(link, 'click', DeleteLink["delete"]);
    },
    cooldown: {
      start: function(post, node) {
        var length, seconds, _ref;
        if (!((_ref = QR.db) != null ? _ref.get({
          boardID: post.board.ID,
          threadID: post.thread.ID,
          postID: post.ID
        }) : void 0)) {
          delete DeleteLink.cooldown.counting;
          return;
        }
        DeleteLink.cooldown.counting = post;
        length = 60;
        seconds = Math.ceil((length * $.SECOND - (Date.now() - post.info.date)) / $.SECOND);
        return DeleteLink.cooldown.count(post, seconds, length, node);
      },
      count: function(post, seconds, length, node) {
        if (DeleteLink.cooldown.counting !== post) {
          return;
        }
        if (!((0 <= seconds && seconds <= length))) {
          if (DeleteLink.cooldown.counting === post) {
            node.textContent = 'Delete';
            delete DeleteLink.cooldown.counting;
          }
          return;
        }
        setTimeout(DeleteLink.cooldown.count, 1000, post, seconds - 1, length, node);
        return node.textContent = "Delete (" + seconds + ")";
      }
    }
  };

  DownloadLink = {
    init: function() {
      var a, _ref;
      if (((_ref = g.VIEW) !== 'index' && _ref !== 'thread') || !Conf['Menu'] || !Conf['Download Link']) {
        return;
      }
      a = $.el('a', {
        className: 'download-link',
        textContent: 'Download file'
      });
      $.on(a, 'click', function(e) {
        if (this.protocol === 'blob:') {
          return true;
        }
        e.preventDefault();
        return CrossOrigin.file(this.href, (function(_this) {
          return function(blob) {
            if (blob) {
              _this.href = URL.createObjectURL(blob);
              return _this.click();
            } else {
              return new Notice('error', "Could not download " + _this.href, 30);
            }
          };
        })(this));
      });
      return Menu.menu.addEntry({
        el: a,
        order: 100,
        open: function(_arg) {
          var file;
          file = _arg.file;
          if (!file) {
            return false;
          }
          a.href = file.URL;
          a.download = file.name;
          return true;
        }
      });
    }
  };

  Menu = {
    init: function() {
      var _ref;
      if (((_ref = g.VIEW) !== 'index' && _ref !== 'thread') || !Conf['Menu']) {
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
      Post.callbacks.push({
        name: 'Menu',
        cb: this.node
      });
      return CatalogThread.callbacks.push({
        name: 'Menu',
        cb: this.catalogNode
      });
    },
    node: function() {
      if (this.isClone) {
        Menu.makeButton(this, $('.menu-button', this.nodes.info));
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

  ReportLink = {
    init: function() {
      var a, _ref;
      if (((_ref = g.VIEW) !== 'index' && _ref !== 'thread') || !Conf['Menu'] || !Conf['Report Link']) {
        return;
      }
      a = $.el('a', {
        className: 'report-link',
        href: 'javascript:;',
        textContent: 'Report this post'
      });
      $.on(a, 'click', ReportLink.report);
      return Menu.menu.addEntry({
        el: a,
        order: 10,
        open: function(post) {
          ReportLink.post = post;
          return !post.isDead;
        }
      });
    },
    report: function() {
      var id, post, set, url;
      post = ReportLink.post;
      url = "//sys.4chan.org/" + post.board + "/imgboard.php?mode=report&no=" + post;
      id = Date.now();
      set = "toolbar=0,scrollbars=0,location=0,status=1,menubar=0,resizable=1,width=685,height=285";
      return window.open(url, id, set);
    }
  };

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
      Favicon.SFW = /ws\.ico$/.test(href);
      Favicon["default"] = href;
      return Favicon["switch"]();
    },
    "switch": function() {
      var f, i, items, t;
      items = {
        ferongr: ['iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAFVBMVEX///9zBQC/AADpDAP/gID/q6voCwJJTwpOAAAAAXRSTlMAQObYZgAAAGJJREFUeF5Fi7ENg0AQBCfa/AFdDh2gdwPIogMK2E2+/xLslwOvdqRJhv+GQQPUCtJM7svankLrq/I+TY5e6Ueh1jyBMX7AFJi9vwfyVO4CbbO6jNYpp9GyVPbdkFhVgAQ2H0NOE5jk9DT8AAAAAElFTkSuQmCC', 'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAxUlEQVR42q1TOwrCQBB9s0FRtJI0WoqFtSLYegoP4gVSeJsUHsHSI3iFeIqRXXgwrhlXwYHHhLwPTB7B36abBCV+0pA4DUBQUNZYQptGtW3jtoKyxgoe0yrBCoyZfL/5ioQ3URZOXW9I341l3oo+NXEZiW4CEuIzvPECopED4OaZ3RNmeAm4u+a8Jr5f17VyVoL8fr8qcltzwlyyj2iqcgPOQ9ExkHAITgD75bYBe0A5S4H/P9htuWMF3QXoQpwaKeT+lnsC6JE5I6aq6fEAAAAASUVORK5CYII=', 'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAFVBMVEX///8AcH4AtswA2PJ55fKi6fIA1/FtpPADAAAAAXRSTlMAQObYZgAAAGJJREFUeF5Fi7ENg0AQBCfa/AFdDh2gdwPIogMK2E2+/xLslwOvdqRJhv+GQQPUCtJM7svankLrq/I+TY5e6Ueh1jyBMX7AFJi9vwfyVO4CbbO6jNYpp9GyVPbdkFhVgAQ2H0NOE5jk9DT8AAAAAElFTkSuQmCC', 'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAxElEQVQ4y2NgoBq4/vE/HJOsBiRQUIfA2AzBqQYqUfn00/9FLz+BaQxDCKqBmX7jExijKEDSDJPHrnnbGQhGV4RmOFwdVkNwhQMheYwQxhaIi7b9Z9A3gWAQm2BUoQOgRhgA8o7j1ozLC4LCyAZcx6kZI5qg4kLKqggDFFWxJySsUQVzlb4pwgAJaTRvokcVNgOqOv8zcHBCsL07DgNg8YsczzA5MxtUL+DMD8g0slxI/H8GQ/P/DJKyeKIRpglXZsIiBwBhP5O+VbI/JgAAAABJRU5ErkJggg==', 'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAFVBMVEX///8oeQBJ3ABV/wHM/7Lu/+ZU/gAqUP3dAAAAAXRSTlMAQObYZgAAAGJJREFUeF5Fi7ENg0AQBCfa/AFdDh2gdwPIogMK2E2+/xLslwOvdqRJhv+GQQPUCtJM7svankLrq/I+TY5e6Ueh1jyBMX7AFJi9vwfyVO4CbbO6jNYpp9GyVPbdkFhVgAQ2H0NOE5jk9DT8AAAAAElFTkSuQmCC', 'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAx0lEQVQ4y2NgoBYI+cfwH4ZJVgMS0KhEYGyG4FQDkzjzf9P/d/+fgWl0QwiqgSkI/c8IxsgKkDXD5LFq9rwDweiK0A2HqcNqCK5wICSPEcLYAtH+AMN/IXMIBrEJRie6OEgjDAC5x3FqxuUFNiEUA67j1IweTTBxBQ1puAG86jgSEraogskJWSBcwCGF5k30qMJmgMFEhv/MXBAs5oLDAFj8IsczTE7UEeECbhU8+QGZRpaTi2b4L2zF8J9TGk80wjThykzY5AAW/2O1C2mIbgAAAABJRU5ErkJggg=='],
        'xat-': ['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'],
        Mayhem: ['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'],
        '4chanJS': ['iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAD1BMVEUBAAAAAAD/AABnZ2f///8nFk05AAAAAXRSTlMAQObYZgAAAEFJREFUeNqNjgEKACAMAjvX/98cAkkxgmSgO8Bt/Ai4ApJ6KKhzF3OiEMDASrGB/QWgPEHsUpN+Ng9xAETMYhDrWmeHAMcmvycWAAAAAElFTkSuQmCC', 'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAD1BMVEUBAAAAAAD/AAD///9nZ2f77Y6hAAAAAXRSTlMAQObYZgAAAEBJREFUeF6NjQEKACAMAnfW/98cAxFiBIngOsTqR8B1IGkeG9p5i7XabgAGZNigXgA8aoCUxvzWAIcBItGiSEwdccYA3BuRAWkAAAAASUVORK5CYII=', 'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAD1BMVEUBAAAAAAAul8NnZ2f////82iC9AAAAAXRSTlMAQObYZgAAAEFJREFUeNqNjgEKACAMAjvX/98cAkkxgmSgO8Bt/Ai4ApJ6KKhzF3OiEMDASrGB/QWgPEHsUpN+Ng9xAETMYhDrWmeHAMcmvycWAAAAAElFTkSuQmCC', 'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAD1BMVEUBAAAAAAAul8P///9nZ2cgIeMlAAAAAXRSTlMAQObYZgAAAEBJREFUeF6NjQEKACAMAnfW/98cAxFiBIngOsTqR8B1IGkeG9p5i7XabgAGZNigXgA8aoCUxvzWAIcBItGiSEwdccYA3BuRAWkAAAAASUVORK5CYII=', 'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAElBMVEUBAAAAAABmzDNlyjJnZ2f///+6o7dfAAAAAXRSTlMAQObYZgAAAERJREFUeF6NjkEKADEIA51o///lJZfQxUsHITogWi8AvwZJuxmYa25xDooBLEwOWFTYAsYVhdorLZt9Ng9xCUTCUCQ2H3F4ANrZ2WNiAAAAAElFTkSuQmCC', 'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAElBMVEUBAAAAAABmzDP///9lyjJnZ2cIHys9AAAAAXRSTlMAQObYZgAAAENJREFUeF6NjUEKwEAMAjNm9/9fLkEslFwqgjoEUn8EfAqSdrkwzj6ieyyTkQEVGWRvANfO1iEX620AjgBEwqR4Y+sBeGAA6d+vQ4IAAAAASUVORK5CYII='],
        Original: ['iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAgMAAABinRfyAAAADFBMVEX/////AAD///8AAABBZmS3AAAAAXRSTlMAQObYZgAAAExJREFUeF4tyrENgDAMAMFXKuQswQLBG3mOlBnFS1gwDfIYLpEivvjq2MlqjmYvYg5jWEzCwtDSQlwcXKCVLrpFbvLvvSf9uZJ2HusDtJAY7Tkn1oYAAAAASUVORK5CYII=', 'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAhElEQVR42q1RwQnAMAjMu5M4guAKXa4j5dUROo5tipSDcrFChUONd0di2m/hEGVOHDyIPufgwAFASDkpoSzmBrkJ2UMyR9LsJ3rvrqo3Rt1YMIMhhNnOxLMnoMFBxHyJAr2IOBFzA8U+6pLBdmEJTA0aMVjpDd6Loks0s5HZNwYx8tfZCZ0kll7ORffZAAAAAElFTkSuQmCC', 'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAgMAAABinRfyAAAADFBMVEX///8ul8P///8AAACaqgkzAAAAAXRSTlMAQObYZgAAAExJREFUeF4tyrENgDAMAMFXKuQswQLBG3mOlBnFS1gwDfIYLpEivvjq2MlqjmYvYg5jWEzCwtDSQlwcXKCVLrpFbvLvvSf9uZJ2HusDtJAY7Tkn1oYAAAAASUVORK5CYII=', 'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAALVBMVEUAAAAAAAAAAAAAAAABBQcHFx4KISoNLToaVW4oKCgul8M4ODg7OzvBwcH///8uS/CdAAAAA3RSTlMAx9dmesIgAAAAV0lEQVR42m2NWw6AIBAD1eILZO5/XI0UAgm7H9tOsu0yGWAQSOoFijHOxOANGqm/LczpOaXs4gISrPZ+gc2+hO5w2xdwgOjBFUIF+sEJrhUl9JFr+badFwR+BfqlmGUJAAAAAElFTkSuQmCC', 'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAgMAAABinRfyAAAADFBMVEX///9mzDP///8AAACT0n1lAAAAAXRSTlMAQObYZgAAAExJREFUeF4tyrENgDAMAMFXKuQswQLBG3mOlBnFS1gwDfIYLpEivvjq2MlqjmYvYg5jWEzCwtDSQlwcXKCVLrpFbvLvvSf9uZJ2HusDtJAY7Tkn1oYAAAAASUVORK5CYII=', 'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAALVBMVEUAAAAAAAAAAAAAAAAECAIQIAgWLAsePA8oKCg4ODg6dB07OztmzDPBwcH///+rsf3XAAAAA3RSTlMAx9dmesIgAAAAV0lEQVR42m2NWw6AIBAD1eIDhbn/cTVSCCTsfmw7ybbLZIBBIKkXKKU0E4M3aKT+tjCn5xiziwuIsNr7BTb7ErrDZV/AAaIHdwgV6AcnuFaU0Eeu5dt2XiUyBjCQ2bIrAAAAAElFTkSuQmCC'],
        'Metro': ['iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAABlBMVEUAAAC/AABrZQDiAAAAAXRSTlMAQObYZgAAABJJREFUCB1jZGBgrMNAQEEc4gCSfAX5bRw/NQAAAABJRU5ErkJggg==', 'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAJFBMVEUAAAAAAAAAAAAHAAAdAAApAAAsAAA4AABsAACQAAC/AAD///9SVhtjAAAAA3RSTlMAPse+s4iwAAAAM0lEQVQIW2NggAGuVasWgDBpDDAQUoSaob0Jao73lgVojOitUEazBZRRvR3KmJa5AO4KAGBtLuMAuhIIAAAAAElFTkSuQmCC', 'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAABlBMVEUAAAAA1/GhpCidAAAAAXRSTlMAQObYZgAAABJJREFUCB1jZGBgrMNAQEEc4gCSfAX5bRw/NQAAAABJRU5ErkJggg==', 'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAJFBMVEUAAAAAAAAAAAAACAkAISUALzQAMTcAQEcAeokAorYA1/H///8BrzTFAAAAA3RSTlMAPse+s4iwAAAAM0lEQVQIW2NggAGuVasWgDBpDDAQUoSaob0Jao73lgVojOitUEazBZRRvR3KmJa5AO4KAGBtLuMAuhIIAAAAAElFTkSuQmCC', 'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAABlBMVEUAAABV/wErM5hwAAAAAXRSTlMAQObYZgAAABJJREFUCB1jZGBgrMNAQEEc4gCSfAX5bRw/NQAAAABJRU5ErkJggg==', 'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAJFBMVEUAAAAAAAAAAAADCgANKAASOAATOwAZTAAwkQBAwQBV/wH////+Fmy4AAAAA3RSTlMAPse+s4iwAAAAM0lEQVQIW2NggAGuVasWgDBpDDAQUoSaob0Jao73lgVojOitUEazBZRRvR3KmJa5AO4KAGBtLuMAuhIIAAAAAElFTkSuQmCC']
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
      if (this.SFW) {
        this.unread = this.unreadSFW;
        return this.unreadY = this.unreadSFWY;
      } else {
        this.unread = this.unreadNSFW;
        return this.unreadY = this.unreadNSFWY;
      }
    },
    dead: 'data:image/gif;base64,R0lGODlhEAAQAKECAAAAAP8AAP///////yH5BAEKAAIALAAAAAAQABAAAAIvlI+pq+D9DAgUoFkPDlbs7lFZKIJOJJ3MyraoB14jFpOcVMpzrnF3OKlZYsMWowAAOw==',
    logo: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACAAgMAAAC+UIlYAAAACVBMVEUAAGcAAABmzDNZt9VtAAAAAXRSTlMAQObYZgAAAGlJREFUWMPtlkEKADEIA/tJP9lXLttQto2yHxgDHozTi0ToGK2WKZZ+HAQQMZc+xBwI4EZ+wAC2IfPuSIDOZJrSZQEAX9eVJhhwIuUYAnQe8rhAEMAZlTI2MID9f5Clyh0JeE1V1ZEAvB4qDfwuJTSGRAAAAABJRU5ErkJggg=='
  };

  MarkNewIPs = {
    init: function() {
      if (g.VIEW !== 'thread' || !Conf['Mark New IPs']) {
        return;
      }
      return Thread.callbacks.push({
        name: 'Mark New IPs',
        cb: this.node
      });
    },
    node: function() {
      MarkNewIPs.ipCount = this.ipCount;
      MarkNewIPs.postIDs = this.posts.keys.map(function(x) {
        return +x;
      });
      return $.on(d, 'ThreadUpdate', MarkNewIPs.onUpdate);
    },
    onUpdate: function(e) {
      var added, fullID, i, ipCount, newPosts, obj, postIDs, removed, x, _i, _j, _k, _l, _len, _len1, _len2, _len3, _ref, _ref1;
      _ref = e.detail, ipCount = _ref.ipCount, newPosts = _ref.newPosts;
      postIDs = ThreadUpdater.postIDs;
      if (ipCount == null) {
        return;
      }
      if (newPosts.length) {
        obj = {};
        _ref1 = MarkNewIPs.postIDs;
        for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
          x = _ref1[_i];
          obj[x] = true;
        }
        added = 0;
        for (_j = 0, _len1 = postIDs.length; _j < _len1; _j++) {
          x = postIDs[_j];
          if (!(x in obj)) {
            added++;
          }
        }
        removed = MarkNewIPs.postIDs.length + added - postIDs.length;
        switch (ipCount - MarkNewIPs.ipCount) {
          case added:
            i = MarkNewIPs.ipCount;
            for (_k = 0, _len2 = newPosts.length; _k < _len2; _k++) {
              fullID = newPosts[_k];
              MarkNewIPs.markNew(g.posts[fullID], ++i);
            }
            break;
          case -removed:
            for (_l = 0, _len3 = newPosts.length; _l < _len3; _l++) {
              fullID = newPosts[_l];
              MarkNewIPs.markOld(g.posts[fullID]);
            }
        }
      }
      MarkNewIPs.ipCount = ipCount;
      return MarkNewIPs.postIDs = postIDs;
    },
    markNew: function(post, ipCount) {
      var counter, suffix;
      suffix = (function() {
        if ((Math.floor(ipCount / 10)) % 10 === 1) {
          return 'th';
        } else {
          switch (ipCount % 10) {
            case 1:
              return 'st';
            case 2:
              return 'nd';
            case 3:
              return 'rd';
            default:
              return 'th';
          }
        }
      })();
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

  ThreadExcerpt = {
    init: function() {
      if (g.BOARD.ID !== 'f' || g.VIEW !== 'thread' || !Conf['Thread Excerpt']) {
        return;
      }
      return Thread.callbacks.push({
        name: 'Thread Excerpt',
        cb: this.node
      });
    },
    node: function() {
      return d.title = Get.threadExcerpt(this);
    }
  };

  ThreadStats = {
    init: function() {
      var sc, statsHTML, statsTitle;
      if (g.VIEW !== 'thread' || !Conf['Thread Stats']) {
        return;
      }
      statsHTML = {
        innerHTML: "<span id=\"post-count\">?</span> / <span id=\"file-count\">?</span>"
      };
      statsTitle = 'Posts / Files';
      if (Conf['IP Count in Stats']) {
        statsHTML = {
          innerHTML: statsHTML.innerHTML + " / <span id=\"ip-count\">?</span>"
        };
        statsTitle += ' / IPs';
      }
      if (Conf['Page Count in Stats']) {
        statsHTML = {
          innerHTML: statsHTML.innerHTML + " / <span id=\"page-count\">?</span>"
        };
        statsTitle += ' / Page';
      }
      if (Conf['Updater and Stats in Header']) {
        this.dialog = sc = $.el('span', {
          id: 'thread-stats',
          title: statsTitle
        });
        $.extend(sc, statsHTML);
        $.ready(function() {
          return Header.addShortcut(sc);
        });
      } else {
        this.dialog = sc = UI.dialog('thread-stats', 'bottom: 0px; right: 0px;', {
          innerHTML: "<div class=\"move\" title=\"" + E(statsTitle) + "\">" + statsHTML.innerHTML + "</div>"
        });
        $.addClass(doc, 'float');
        $.ready((function(_this) {
          return function() {
            return $.add(d.body, sc);
          };
        })(this));
      }
      this.postCountEl = $('#post-count', sc);
      this.fileCountEl = $('#file-count', sc);
      this.ipCountEl = $('#ip-count', sc);
      this.pageCountEl = $('#page-count', sc);
      return Thread.callbacks.push({
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
        if (Conf["Page Count in Stats"]) {
          return ThreadStats.lastPost = post.info.date;
        }
      });
      ThreadStats.thread = this;
      ThreadStats.fetchPage();
      ThreadStats.update(postCount, fileCount, this.ipCount);
      return $.on(d, 'ThreadUpdate', ThreadStats.onUpdate);
    },
    onUpdate: function(e) {
      var fileCount, ipCount, newPosts, postCount, _ref, _ref1;
      if (e.detail[404]) {
        return;
      }
      _ref = e.detail, postCount = _ref.postCount, fileCount = _ref.fileCount, ipCount = _ref.ipCount, newPosts = _ref.newPosts;
      ThreadStats.update(postCount, fileCount, ipCount);
      if (!Conf["Page Count in Stats"]) {
        return;
      }
      if (newPosts.length) {
        ThreadStats.lastPost = g.posts[newPosts[newPosts.length - 1]].info.date;
      }
      if (ThreadStats.lastPost > ThreadStats.lastPageUpdate && ((_ref1 = ThreadStats.pageCountEl) != null ? _ref1.textContent : void 0) !== '1') {
        return ThreadStats.fetchPage();
      }
    },
    update: function(postCount, fileCount, ipCount) {
      var fileCountEl, ipCountEl, postCountEl, thread;
      thread = ThreadStats.thread, postCountEl = ThreadStats.postCountEl, fileCountEl = ThreadStats.fileCountEl, ipCountEl = ThreadStats.ipCountEl;
      postCountEl.textContent = postCount;
      fileCountEl.textContent = fileCount;
      if ((ipCount != null) && Conf["IP Count in Stats"]) {
        ipCountEl.textContent = ipCount;
      }
      (thread.postLimit && !thread.isSticky ? $.addClass : $.rmClass)(postCountEl, 'warning');
      return (thread.fileLimit && !thread.isSticky ? $.addClass : $.rmClass)(fileCountEl, 'warning');
    },
    fetchPage: function() {
      if (!Conf["Page Count in Stats"]) {
        return;
      }
      clearTimeout(ThreadStats.timeout);
      if (ThreadStats.thread.isDead) {
        ThreadStats.pageCountEl.textContent = 'Dead';
        $.addClass(ThreadStats.pageCountEl, 'warning');
        return;
      }
      ThreadStats.timeout = setTimeout(ThreadStats.fetchPage, 2 * $.MINUTE);
      return $.ajax("//a.4cdn.org/" + ThreadStats.thread.board + "/threads.json", {
        onload: ThreadStats.onThreadsLoad
      }, {
        whenModified: true
      });
    },
    onThreadsLoad: function() {
      var page, thread, _i, _j, _len, _len1, _ref, _ref1;
      if (!(Conf["Page Count in Stats"] && this.status === 200)) {
        return;
      }
      _ref = this.response;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        page = _ref[_i];
        _ref1 = page.threads;
        for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
          thread = _ref1[_j];
          if (!(thread.no === ThreadStats.thread.ID)) {
            continue;
          }
          ThreadStats.pageCountEl.textContent = page.page;
          (page.page === this.response.length ? $.addClass : $.rmClass)(ThreadStats.pageCountEl, 'warning');
          ThreadStats.lastPageUpdate = new Date(thread.last_modified * 1000);
          return;
        }
      }
    }
  };

  ThreadUpdater = {
    init: function() {
      var conf, el, input, name, sc, subEntries, updateLink, _ref;
      if (g.VIEW !== 'thread' || !Conf['Thread Updater']) {
        return;
      }
      if (Conf['Updater and Stats in Header']) {
        this.dialog = sc = $.el('span', {
          id: 'updater'
        });
        $.extend(sc, {
          innerHTML: "<span id=\"update-status\"></span><span id=\"update-timer\" title=\"Update now\"></span>"
        });
        $.ready(function() {
          return Header.addShortcut(sc);
        });
      } else {
        this.dialog = sc = UI.dialog('updater', 'bottom: 0px; left: 0px;', {
          innerHTML: "<div class=\"move\"></div><span id=\"update-status\"></span><span id=\"update-timer\" title=\"Update now\"></span>"
        });
        $.addClass(doc, 'float');
        $.ready((function(_this) {
          return function() {
            return $.add(d.body, sc);
          };
        })(this));
      }
      this.checkPostCount = 0;
      this.timer = $('#update-timer', sc);
      this.status = $('#update-status', sc);
      this.isUpdating = Conf['Auto Update'];
      $.on(this.timer, 'click', this.update);
      $.on(this.status, 'click', this.update);
      updateLink = $.el('span', {
        className: 'brackets-wrap updatelink'
      });
      $.extend(updateLink, {
        innerHTML: "<a href=\"javascript:;\">Update</a>"
      });
      Main.ready(function() {
        return $.add($('.navLinksBot'), [$.tn(' '), updateLink]);
      });
      $.on(updateLink.firstElementChild, 'click', this.update);
      subEntries = [];
      _ref = Config.updater.checkbox;
      for (name in _ref) {
        conf = _ref[name];
        el = UI.checkbox(name, " " + name);
        el.title = conf[1];
        input = el.firstElementChild;
        $.on(input, 'change', $.cb.checked);
        if (input.name === 'Scroll BG') {
          $.on(input, 'change', this.cb.scrollBG);
          this.cb.scrollBG();
        } else if (input.name === 'Auto Update') {
          $.on(input, 'change', this.cb.autoUpdate);
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
      return Thread.callbacks.push({
        name: 'Thread Updater',
        cb: this.node
      });
    },
    node: function() {
      ThreadUpdater.thread = this;
      ThreadUpdater.root = this.OP.nodes.root.parentNode;
      ThreadUpdater.lastPost = +ThreadUpdater.root.lastElementChild.id.match(/\d+/)[0];
      ThreadUpdater.outdateCount = 0;
      ThreadUpdater.cb.interval.call($.el('input', {
        value: Conf['Interval']
      }));
      $.on(window, 'online offline', ThreadUpdater.cb.online);
      $.on(d, 'QRPostSuccessful', ThreadUpdater.cb.checkpost);
      $.on(d, 'visibilitychange', ThreadUpdater.cb.visibility);
      if (ThreadUpdater.thread.isArchived) {
        return ThreadUpdater.set('status', 'Archived', 'warning');
      } else {
        return ThreadUpdater.cb.online();
      }
    },

    /*
    http://freesound.org/people/pierrecartoons1979/sounds/90112/
    cc-by-nc-3.0
     */
    beep: 'data:audio/wav;base64,UklGRjQDAABXQVZFZm10IBAAAAABAAEAgD4AAIA+AAABAAgAc21wbDwAAABBAAADAAAAAAAAAAA8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABkYXRhzAIAAGMms8em0tleMV4zIpLVo8nhfSlcPR102Ki+5JspVEkdVtKzs+K1NEhUIT7DwKrcy0g6WygsrM2k1NpiLl0zIY/WpMrjgCdbPhxw2Kq+5Z4qUkkdU9K1s+K5NkVTITzBwqnczko3WikrqM+l1NxlLF0zIIvXpsnjgydZPhxs2ay95aIrUEkdUdC3suK8N0NUIjq+xKrcz002WioppdGm091pK1w0IIjYp8jkhydXPxxq2K295aUrTkoeTs65suK+OUFUIzi7xqrb0VA0WSoootKm0t5tKlo1H4TYqMfkiydWQBxm16+85actTEseS8y7seHAPD9TIza5yKra01QyWSson9On0d5wKVk2H4DYqcfkjidUQB1j1rG75KsvSkseScu8seDCPz1TJDW2yara1FYxWSwnm9Sn0N9zKVg2H33ZqsXkkihSQR1g1bK65K0wSEsfR8i+seDEQTxUJTOzy6rY1VowWC0mmNWoz993KVc3H3rYq8TklSlRQh1d1LS647AyR0wgRMbAsN/GRDpTJTKwzKrX1l4vVy4lldWpzt97KVY4IXbUr8LZljVPRCxhw7W3z6ZISkw1VK+4sMWvXEhSPk6buay9sm5JVkZNiLWqtrJ+TldNTnquqbCwilZXU1BwpKirrpNgWFhTaZmnpquZbFlbVmWOpaOonHZcXlljhaGhpZ1+YWBdYn2cn6GdhmdhYGN3lp2enIttY2Jjco+bnJuOdGZlZXCImJqakHpoZ2Zug5WYmZJ/bGlobX6RlpeSg3BqaW16jZSVkoZ0bGtteImSk5KIeG5tbnaFkJKRinxxbm91gY2QkIt/c3BwdH6Kj4+LgnZxcXR8iI2OjIR5c3J0e4WLjYuFe3VzdHmCioyLhn52dHR5gIiKioeAeHV1eH+GiYqHgXp2dnh9hIiJh4J8eHd4fIKHiIeDfXl4eHyBhoeHhH96eHmA',
    cb: {
      online: function() {
        if (ThreadUpdater.thread.isDead) {
          return;
        }
        if (ThreadUpdater.online = navigator.onLine) {
          ThreadUpdater.outdateCount = 0;
          ThreadUpdater.setInterval();
          return ThreadUpdater.set('status', '', '');
        } else {
          ThreadUpdater.set('timer', '');
          ThreadUpdater.set('status', 'Offline', 'warning');
          return clearTimeout(ThreadUpdater.timeoutID);
        }
      },
      checkpost: function(e) {
        if (!ThreadUpdater.checkPostCount) {
          if (e && e.detail.threadID !== ThreadUpdater.thread.ID) {
            return;
          }
          ThreadUpdater.seconds = 0;
          ThreadUpdater.outdateCount = 0;
          ThreadUpdater.set('timer', '...');
        }
        if (!(ThreadUpdater.thread.isDead || ThreadUpdater.foundPost || ThreadUpdater.checkPostCount >= 5)) {
          return setTimeout(ThreadUpdater.update, ++ThreadUpdater.checkPostCount * $.SECOND);
        }
        ThreadUpdater.setInterval();
        ThreadUpdater.checkPostCount = 0;
        delete ThreadUpdater.foundPost;
        return delete ThreadUpdater.postID;
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
      autoUpdate: function(e) {
        return ThreadUpdater.count(ThreadUpdater.isUpdating = this.checked);
      },
      interval: function() {
        var val;
        val = parseInt(this.value, 10);
        if (val < 1) {
          val = 1;
        }
        ThreadUpdater.interval = this.value = val;
        return $.cb.value.call(this);
      },
      load: function(e) {
        var req;
        req = ThreadUpdater.req;
        switch (req.status) {
          case 200:
            ThreadUpdater.parse(req.response.posts);
            if (ThreadUpdater.thread.isArchived) {
              ThreadUpdater.set('status', 'Archived', 'warning');
              ThreadUpdater.kill();
            } else {
              ThreadUpdater.setInterval();
            }
            break;
          case 404:
            $.ajax("//a.4cdn.org/" + ThreadUpdater.thread.board + "/catalog.json", {
              onloadend: function() {
                var confirmed, page, thread, _i, _j, _len, _len1, _ref, _ref1;
                if (this.status === 200) {
                  confirmed = true;
                  _ref = this.response;
                  for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                    page = _ref[_i];
                    _ref1 = page.threads;
                    for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
                      thread = _ref1[_j];
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
                  ThreadUpdater.set('status', '404', 'warning');
                  return ThreadUpdater.kill();
                } else {
                  return ThreadUpdater.error(req);
                }
              }
            });
            break;
          default:
            ThreadUpdater.error(req);
        }
        if (ThreadUpdater.postID) {
          return ThreadUpdater.cb.checkpost();
        }
      }
    },
    kill: function() {
      ThreadUpdater.set('timer', '');
      clearTimeout(ThreadUpdater.timeoutID);
      ThreadUpdater.thread.kill();
      return $.event('ThreadUpdate', {
        404: true,
        threadID: ThreadUpdater.thread.fullID
      });
    },
    error: function(req) {
      var klass, text, _ref;
      ThreadUpdater.setInterval();
      _ref = req.status === 304 ? ['', ''] : ["" + req.statusText + " (" + req.status + ")", 'warning'], text = _ref[0], klass = _ref[1];
      return ThreadUpdater.set('status', text, klass);
    },
    setInterval: function() {
      var cur, i, j, limit;
      i = ThreadUpdater.interval + 1;
      if (Conf['Optional Increase']) {
        cur = ThreadUpdater.outdateCount || 1;
        limit = d.hidden ? 7 : 10;
        j = cur <= limit ? cur : limit;
        cur = (Math.floor(i * 0.1) || 1) * j * j;
        ThreadUpdater.seconds = cur > i ? cur <= 300 ? cur : 300 : i;
      } else {
        ThreadUpdater.seconds = i;
      }
      ThreadUpdater.set('timer', ThreadUpdater.seconds);
      return ThreadUpdater.count(true);
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
      if (klass !== void 0) {
        return el.className = klass;
      }
    },
    count: function(start) {
      clearTimeout(ThreadUpdater.timeoutID);
      if (start && ThreadUpdater.isUpdating && navigator.onLine) {
        return ThreadUpdater.timeout();
      }
    },
    timeout: function() {
      var n;
      ThreadUpdater.timeoutID = setTimeout(ThreadUpdater.timeout, 1000);
      if (!(n = --ThreadUpdater.seconds)) {
        ThreadUpdater.outdateCount++;
        return ThreadUpdater.update();
      } else if (n <= -60) {
        ThreadUpdater.set('status', 'Retrying', '');
        return ThreadUpdater.update();
      } else if (n > 0) {
        return ThreadUpdater.set('timer', n);
      }
    },
    update: function() {
      var _ref;
      if (!navigator.onLine) {
        return;
      }
      ThreadUpdater.count();
      if (Conf['Auto Update']) {
        ThreadUpdater.set('timer', '...');
      } else {
        ThreadUpdater.set('timer', 'Update');
      }
      if ((_ref = ThreadUpdater.req) != null) {
        _ref.abort();
      }
      return ThreadUpdater.req = $.ajax("//a.4cdn.org/" + ThreadUpdater.thread.board + "/thread/" + ThreadUpdater.thread + ".json", {
        onloadend: ThreadUpdater.cb.load,
        whenModified: true
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
    parse: function(postObjects) {
      var OP, count, files, index, ipCountEl, node, num, post, postObject, posts, root, scroll, _i, _j, _len, _len1;
      OP = postObjects[0];
      Build.spoilerRange[ThreadUpdater.thread.board] = OP.custom_spoiler;
      ThreadUpdater.thread.setStatus('Archived', !!+OP.archived);
      ThreadUpdater.updateThreadStatus('Sticky', !!OP.sticky);
      ThreadUpdater.updateThreadStatus('Closed', !!OP.closed);
      ThreadUpdater.thread.postLimit = !!OP.bumplimit;
      ThreadUpdater.thread.fileLimit = !!OP.imagelimit;
      if (OP.unique_ips != null) {
        ThreadUpdater.thread.ipCount = OP.unique_ips;
      }
      posts = [];
      index = [];
      files = [];
      count = 0;
      for (_i = 0, _len = postObjects.length; _i < _len; _i++) {
        postObject = postObjects[_i];
        num = postObject.no;
        index.push(num);
        if (postObject.fsize) {
          files.push(num);
        }
        if (num <= ThreadUpdater.lastPost) {
          continue;
        }
        count++;
        node = Build.postFromObject(postObject, ThreadUpdater.thread.board.ID);
        posts.push(new Post(node, ThreadUpdater.thread, ThreadUpdater.thread.board));
      }
      ThreadUpdater.thread.posts.forEach(function(post) {
        var ID;
        ID = +post.ID;
        if (!(post.info.date > Date.now() - 60 * $.SECOND)) {
          if (__indexOf.call(index, ID) < 0) {
            post.kill();
          } else if (post.isDead) {
            post.resurrect();
          } else if (post.file && !(post.file.isDead || __indexOf.call(files, ID) >= 0)) {
            post.kill(true);
          }
        }
        if (ThreadUpdater.postID && ThreadUpdater.postID === ID) {
          return ThreadUpdater.foundPost = true;
        }
      });
      if (!count) {
        ThreadUpdater.set('status', '', '');
      } else {
        ThreadUpdater.set('status', "+" + count, 'new');
        ThreadUpdater.outdateCount = 0;
        if (Conf['Beep'] && d.hidden && Unread.posts && !Unread.posts.length) {
          if (!ThreadUpdater.audio) {
            ThreadUpdater.audio = $.el('audio', {
              src: ThreadUpdater.beep
            });
          }
          ThreadUpdater.audio.play();
        }
        ThreadUpdater.lastPost = posts[count - 1].ID;
        Main.callbackNodes(Post, posts);
        scroll = Conf['Auto Scroll'] && ThreadUpdater.scrollBG() && ThreadUpdater.root.getBoundingClientRect().bottom - doc.clientHeight < 25;
        for (_j = 0, _len1 = posts.length; _j < _len1; _j++) {
          post = posts[_j];
          root = post.nodes.root;
          if (!QuoteThreading.insert(post)) {
            $.add(ThreadUpdater.root, post.nodes.root);
          }
        }
        $.event('PostsInserted');
        if (scroll) {
          if (Conf['Bottom Scroll']) {
            window.scrollTo(0, d.body.clientHeight);
          } else {
            if (root) {
              Header.scrollTo(root);
            }
          }
        }
      }
      if ((OP.unique_ips != null) && (ipCountEl = $.id('unique-ips'))) {
        ipCountEl.textContent = OP.unique_ips;
        ipCountEl.previousSibling.textContent = ipCountEl.previousSibling.textContent.replace(/\b(?:is|are)\b/, OP.unique_ips === 1 ? 'is' : 'are');
        ipCountEl.nextSibling.textContent = ipCountEl.nextSibling.textContent.replace(/\bposters?\b/, OP.unique_ips === 1 ? 'poster' : 'posters');
      }
      ThreadUpdater.postIDs = index;
      return $.event('ThreadUpdate', {
        404: false,
        threadID: ThreadUpdater.thread.fullID,
        newPosts: posts.map(function(post) {
          return post.fullID;
        }),
        postCount: OP.replies + 1,
        fileCount: OP.images + (!!ThreadUpdater.thread.OP.file && !ThreadUpdater.thread.OP.file.isDead),
        ipCount: OP.unique_ips
      });
    }
  };

  ThreadWatcher = {
    init: function() {
      var sc;
      if (!Conf['Thread Watcher']) {
        return;
      }
      this.shortcut = sc = $.el('a', {
        id: 'watcher-link',
        textContent: 'Watcher',
        title: 'Thread Watcher',
        href: 'javascript:;',
        className: 'disabled fa fa-eye'
      });
      this.db = new DataBoard('watchedThreads', this.refresh, true);
      this.dialog = UI.dialog('thread-watcher', 'top: 50px; left: 0px;', {
        innerHTML: "<div class=\"move\">Thread Watcher <a class=\"refresh fa fa-refresh\" title=\"Check threads\" href=\"javascript:;\"></a><span id=\"watcher-status\"></span><a class=\"menu-button\" href=\"javascript:;\"><i class=\"fa fa-angle-down\"></i></a><a class=\"close\" href=\"javascript:;\">×</a></div><div id=\"watched-threads\"></div>"
      });
      this.status = $('#watcher-status', this.dialog);
      this.list = this.dialog.lastElementChild;
      this.refreshButton = $('.move > .refresh', this.dialog);
      this.unreaddb = Unread.db || new DataBoard('lastReadPosts');
      $.on(d, 'QRPostSuccessful', this.cb.post);
      $.on(sc, 'click', this.toggleWatcher);
      $.on(this.refreshButton, 'click', this.fetchAllStatus);
      $.on($('.move > .close', this.dialog), 'click', this.toggleWatcher);
      $.on(d, '4chanXInitFinished', this.ready);
      switch (g.VIEW) {
        case 'index':
          $.on(d, 'IndexRefresh', this.cb.onIndexRefresh);
          break;
        case 'thread':
          $.on(d, 'ThreadUpdate', this.cb.onThreadRefresh);
      }
      if (Conf['Toggleable Thread Watcher']) {
        Header.addShortcut(sc);
        $.addClass(doc, 'fixed-watcher');
      }
      ThreadWatcher.fetchAuto();
      Post.callbacks.push({
        name: 'Thread Watcher',
        cb: this.node
      });
      CatalogThread.callbacks.push({
        name: 'Thread Watcher',
        cb: this.catalogNode
      });
      if (g.VIEW === 'index' && Conf['JSON Navigation'] && Conf['Menu'] && g.BOARD.ID !== 'f') {
        return Menu.menu.addEntry({
          el: $.el('a', {
            href: 'javascript:;'
          }),
          order: 6,
          open: function(_arg) {
            var thread;
            thread = _arg.thread;
            if (Conf['Index Mode'] !== 'catalog') {
              return false;
            }
            this.el.textContent = ThreadWatcher.isWatched(thread) ? 'Unwatch thread' : 'Watch thread';
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
    },
    isWatched: function(thread) {
      var _ref;
      return (_ref = ThreadWatcher.db) != null ? _ref.get({
        boardID: thread.board.ID,
        threadID: thread.ID
      }) : void 0;
    },
    node: function() {
      var toggler;
      if (this.isReply) {
        return;
      }
      if (this.isClone) {
        toggler = $('.watch-thread-link', this.nodes.post);
      } else {
        toggler = $.el('img', {
          className: 'watch-thread-link'
        });
        $.before($('input', this.nodes.post), toggler);
      }
      return $.on(toggler, 'click', ThreadWatcher.cb.toggle);
    },
    catalogNode: function() {
      if (ThreadWatcher.isWatched(this.thread)) {
        $.addClass(this.nodes.root, 'watched');
      }
      return $.on(this.nodes.thumb.parentNode, 'click', (function(_this) {
        return function(e) {
          if (!(e.button === 0 && e.altKey)) {
            return;
          }
          ThreadWatcher.toggle(_this.thread);
          return e.preventDefault();
        };
      })(this));
    },
    ready: function() {
      $.off(d, '4chanXInitFinished', ThreadWatcher.ready);
      if (!Main.isThisPageLegit()) {
        return;
      }
      ThreadWatcher.refresh();
      $.add(d.body, ThreadWatcher.dialog);
      if (Conf['Toggleable Thread Watcher']) {
        ThreadWatcher.dialog.hidden = true;
      }
      if (!Conf['Auto Watch']) {
        return;
      }
      return $.get('AutoWatch', 0, function(_arg) {
        var AutoWatch, thread;
        AutoWatch = _arg.AutoWatch;
        if (!(thread = g.BOARD.threads[AutoWatch])) {
          return;
        }
        ThreadWatcher.add(thread);
        return $["delete"]('AutoWatch');
      });
    },
    toggleWatcher: function() {
      $.toggleClass(ThreadWatcher.shortcut, 'disabled');
      return ThreadWatcher.dialog.hidden = !ThreadWatcher.dialog.hidden;
    },
    cb: {
      openAll: function() {
        var a, _i, _len, _ref;
        if ($.hasClass(this, 'disabled')) {
          return;
        }
        _ref = $$('a[title]', ThreadWatcher.list);
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          a = _ref[_i];
          $.open(a.href);
        }
        return $.event('CloseMenu');
      },
      pruneDeads: function() {
        var boardID, data, threadID, _i, _len, _ref, _ref1;
        if ($.hasClass(this, 'disabled')) {
          return;
        }
        _ref = ThreadWatcher.getAll();
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          _ref1 = _ref[_i], boardID = _ref1.boardID, threadID = _ref1.threadID, data = _ref1.data;
          if (!data.isDead) {
            continue;
          }
          delete ThreadWatcher.db.data.boards[boardID][threadID];
          ThreadWatcher.db.deleteIfEmpty({
            boardID: boardID
          });
        }
        ThreadWatcher.db.save();
        ThreadWatcher.refresh();
        return $.event('CloseMenu');
      },
      toggle: function() {
        var thread;
        thread = Get.postFromNode(this).thread;
        Index.followedThreadID = thread.ID;
        ThreadWatcher.toggle(thread);
        return delete Index.followedThreadID;
      },
      rm: function() {
        var boardID, threadID, _ref;
        _ref = this.parentNode.dataset.fullID.split('.'), boardID = _ref[0], threadID = _ref[1];
        return ThreadWatcher.rm(boardID, +threadID);
      },
      post: function(e) {
        var boardID, postID, threadID, _ref;
        _ref = e.detail, boardID = _ref.boardID, threadID = _ref.threadID, postID = _ref.postID;
        if (postID === threadID) {
          if (Conf['Auto Watch']) {
            return $.set('AutoWatch', threadID);
          }
        } else if (Conf['Auto Watch Reply']) {
          return ThreadWatcher.add(g.threads[boardID + '.' + threadID]);
        }
      },
      onIndexRefresh: function() {
        var boardID, data, db, threadID, _ref;
        db = ThreadWatcher.db;
        boardID = g.BOARD.ID;
        db.forceSync();
        _ref = db.data.boards[boardID];
        for (threadID in _ref) {
          data = _ref[threadID];
          if (!data.isDead && !(threadID in g.BOARD.threads)) {
            if (Conf['Auto Prune']) {
              ThreadWatcher.db["delete"]({
                boardID: boardID,
                threadID: threadID
              });
            } else {
              data.isDead = true;
              ThreadWatcher.db.set({
                boardID: boardID,
                threadID: threadID,
                val: data
              });
            }
          }
        }
        return ThreadWatcher.refresh();
      },
      onThreadRefresh: function(e) {
        var thread;
        thread = g.threads[e.detail.threadID];
        if (!(e.detail[404] && ThreadWatcher.db.get({
          boardID: thread.board.ID,
          threadID: thread.ID
        }))) {
          return;
        }
        return ThreadWatcher.add(thread);
      }
    },
    fetchCount: {
      fetched: 0,
      fetching: 0
    },
    fetchAuto: function() {
      var db, interval, now;
      clearTimeout(ThreadWatcher.timeout);
      if (!Conf['Auto Update Thread Watcher']) {
        return;
      }
      db = ThreadWatcher.db;
      interval = Conf['Show Unread Count'] ? 5 * $.MINUTE : 2 * $.HOUR;
      now = Date.now();
      if (now >= (db.data.lastChecked || 0) + interval) {
        db.data.lastChecked = now;
        ThreadWatcher.fetchAllStatus();
        db.save();
      }
      return ThreadWatcher.timeout = setTimeout(ThreadWatcher.fetchAuto, interval);
    },
    fetchAllStatus: function() {
      var thread, threads, _i, _len, _ref;
      ThreadWatcher.db.forceSync();
      ThreadWatcher.unreaddb.forceSync();
      if ((_ref = QR.db) != null) {
        _ref.forceSync();
      }
      if (!(threads = ThreadWatcher.getAll()).length) {
        return;
      }
      for (_i = 0, _len = threads.length; _i < _len; _i++) {
        thread = threads[_i];
        ThreadWatcher.fetchStatus(thread);
      }
    },
    fetchStatus: function(thread) {
      var boardID, data, fetchCount, threadID;
      boardID = thread.boardID, threadID = thread.threadID, data = thread.data;
      if (data.isDead && !Conf['Show Unread Count']) {
        return;
      }
      fetchCount = ThreadWatcher.fetchCount;
      if (fetchCount.fetching === 0) {
        ThreadWatcher.status.textContent = '...';
        $.addClass(ThreadWatcher.refreshButton, 'fa-spin');
      }
      fetchCount.fetching++;
      return $.ajax("//a.4cdn.org/" + boardID + "/thread/" + threadID + ".json", {
        onloadend: function() {
          return ThreadWatcher.parseStatus.call(this, thread);
        }
      });
    },
    parseStatus: function(_arg) {
      var boardID, data, fetchCount, isDead, lastReadPost, match, postObj, quotingYou, regexp, status, threadID, unread, _i, _len, _ref, _ref1;
      boardID = _arg.boardID, threadID = _arg.threadID, data = _arg.data;
      fetchCount = ThreadWatcher.fetchCount;
      fetchCount.fetched++;
      if (fetchCount.fetched === fetchCount.fetching) {
        fetchCount.fetched = 0;
        fetchCount.fetching = 0;
        status = '';
        $.rmClass(ThreadWatcher.refreshButton, 'fa-spin');
      } else {
        status = "" + (Math.round(fetchCount.fetched / fetchCount.fetching * 100)) + "%";
      }
      ThreadWatcher.status.textContent = status;
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
        unread = quotingYou = 0;
        _ref = this.response.posts;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          postObj = _ref[_i];
          if (!(postObj.no > lastReadPost)) {
            continue;
          }
          if ((_ref1 = QR.db) != null ? _ref1.get({
            boardID: boardID,
            threadID: threadID,
            postID: postObj.no
          }) : void 0) {
            continue;
          }
          unread++;
          if (!(QR.db && postObj.com)) {
            continue;
          }
          regexp = /<a [^>]*\bhref="(?:\/([^\/]+)\/thread\/(\d+))?(?:#p(\d+))?"/g;
          while (match = regexp.exec(postObj.com)) {
            if (QR.db.get({
              boardID: match[1] || boardID,
              threadID: match[2] || threadID,
              postID: match[3] || match[2] || threadID
            })) {
              quotingYou++;
              continue;
            }
          }
        }
        if (isDead !== data.isDead || unread !== data.unread || quotingYou !== data.quotingYou) {
          data.isDead = isDead;
          data.unread = unread;
          data.quotingYou = quotingYou;
          ThreadWatcher.db.set({
            boardID: boardID,
            threadID: threadID,
            val: data
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
          data.isDead = true;
          delete data.unread;
          delete data.quotingYou;
          ThreadWatcher.db.set({
            boardID: boardID,
            threadID: threadID,
            val: data
          });
        }
        return ThreadWatcher.refresh();
      }
    },
    getAll: function() {
      var all, boardID, data, threadID, threads, _ref;
      all = [];
      _ref = ThreadWatcher.db.data.boards;
      for (boardID in _ref) {
        threads = _ref[boardID];
        if (Conf['Current Board'] && boardID !== g.BOARD.ID) {
          continue;
        }
        for (threadID in threads) {
          data = threads[threadID];
          all.push({
            boardID: boardID,
            threadID: threadID,
            data: data
          });
        }
      }
      return all;
    },
    makeLine: function(boardID, threadID, data) {
      var count, div, fullID, link, title, x;
      x = $.el('a', {
        className: 'fa fa-times',
        href: 'javascript:;'
      });
      $.on(x, 'click', ThreadWatcher.cb.rm);
      link = $.el('a', {
        href: "/" + boardID + "/thread/" + threadID,
        title: data.excerpt,
        className: 'watcher-link'
      });
      if (Conf['Show Unread Count'] && (data.unread != null)) {
        count = $.el('span', {
          textContent: "(" + data.unread + ")",
          className: 'watcher-unread'
        });
        $.add(link, count);
      }
      title = $.el('span', {
        textContent: data.excerpt,
        className: 'watcher-title'
      });
      $.add(link, title);
      div = $.el('div');
      fullID = "" + boardID + "." + threadID;
      div.dataset.fullID = fullID;
      if (g.VIEW === 'thread' && fullID === ("" + g.BOARD + "." + g.THREADID)) {
        $.addClass(div, 'current');
      }
      if (data.isDead) {
        $.addClass(div, 'dead-thread');
      }
      if (Conf['Show Unread Count']) {
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
    refresh: function() {
      var boardID, data, list, nodes, refresher, threadID, _i, _j, _len, _len1, _ref, _ref1, _ref2;
      nodes = [];
      _ref = ThreadWatcher.getAll();
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        _ref1 = _ref[_i], boardID = _ref1.boardID, threadID = _ref1.threadID, data = _ref1.data;
        nodes.push(ThreadWatcher.makeLine(boardID, threadID, data));
      }
      list = ThreadWatcher.list;
      $.rmAll(list);
      $.add(list, nodes);
      g.threads.forEach(function(thread) {
        var helper, post, toggler, _j, _len1, _ref2;
        helper = ThreadWatcher.isWatched(thread) ? ['addClass', 'Unwatch'] : ['rmClass', 'Watch'];
        if (thread.OP) {
          _ref2 = [thread.OP].concat(__slice.call(thread.OP.clones));
          for (_j = 0, _len1 = _ref2.length; _j < _len1; _j++) {
            post = _ref2[_j];
            toggler = $('.watch-thread-link', post.nodes.post);
            $[helper[0]](toggler, 'watched');
            toggler.title = "" + helper[1] + " Thread";
          }
        }
        if (thread.catalogView) {
          return $[helper[0]](thread.catalogView.nodes.root, 'watched');
        }
      });
      ThreadWatcher.refreshIcon();
      _ref2 = ThreadWatcher.menu.refreshers;
      for (_j = 0, _len1 = _ref2.length; _j < _len1; _j++) {
        refresher = _ref2[_j];
        refresher();
      }
      if (Index.nodes && Conf['Pin Watched Threads']) {
        Index.sort();
        return Index.buildIndex();
      }
    },
    refreshIcon: function() {
      var className, _i, _len, _ref;
      _ref = ['replies-unread', 'replies-quoting-you'];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        className = _ref[_i];
        ThreadWatcher.shortcut.classList.toggle(className, !!$("." + className, ThreadWatcher.dialog));
      }
    },
    update: function(boardID, threadID, newData) {
      var data, key, line, n, newLine, val, _ref;
      if (!(data = (_ref = ThreadWatcher.db) != null ? _ref.get({
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
      ThreadWatcher.db.forceSync();
      if (!(data = ThreadWatcher.db.get({
        boardID: boardID,
        threadID: threadID
      }))) {
        return;
      }
      $.extend(data, newData);
      ThreadWatcher.db.set({
        boardID: boardID,
        threadID: threadID,
        val: data
      });
      if (line = $("#watched-threads > [data-full-i-d='" + boardID + "." + threadID + "']", ThreadWatcher.dialog)) {
        newLine = ThreadWatcher.makeLine(boardID, threadID, data);
        $.replace(line, newLine);
        return ThreadWatcher.refreshIcon();
      } else {
        return ThreadWatcher.refresh();
      }
    },
    toggle: function(thread) {
      var boardID, threadID;
      boardID = thread.board.ID;
      threadID = thread.ID;
      if (ThreadWatcher.db.get({
        boardID: boardID,
        threadID: threadID
      })) {
        return ThreadWatcher.rm(boardID, threadID);
      } else {
        return ThreadWatcher.add(thread);
      }
    },
    add: function(thread) {
      var boardID, data, threadID;
      data = {};
      boardID = thread.board.ID;
      threadID = thread.ID;
      if (thread.isDead) {
        if (Conf['Auto Prune'] && ThreadWatcher.db.get({
          boardID: boardID,
          threadID: threadID
        })) {
          ThreadWatcher.rm(boardID, threadID);
          return;
        }
        data.isDead = true;
      }
      data.excerpt = Get.threadExcerpt(thread);
      ThreadWatcher.db.set({
        boardID: boardID,
        threadID: threadID,
        val: data
      });
      ThreadWatcher.refresh();
      if (Conf['Show Unread Count']) {
        return ThreadWatcher.fetchStatus({
          boardID: boardID,
          threadID: threadID,
          data: data
        });
      }
    },
    rm: function(boardID, threadID) {
      ThreadWatcher.db["delete"]({
        boardID: boardID,
        threadID: threadID
      });
      return ThreadWatcher.refresh();
    },
    convert: function(oldFormat) {
      var boardID, data, newFormat, threadID, threads;
      newFormat = {};
      for (boardID in oldFormat) {
        threads = oldFormat[boardID];
        for (threadID in threads) {
          data = threads[threadID];
          (newFormat[boardID] || (newFormat[boardID] = {}))[threadID] = {
            excerpt: data.textContent
          };
        }
      }
      return newFormat;
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
        this.addHeaderMenuEntry();
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
          return ThreadWatcher.toggle(g.threads["" + g.BOARD + "." + g.THREADID]);
        });
        return this.refreshers.push(function() {
          var addClass, rmClass, text, _ref;
          _ref = $('.current', ThreadWatcher.list) ? ['unwatch-thread', 'watch-thread', 'Unwatch thread'] : ['watch-thread', 'unwatch-thread', 'Watch thread'], addClass = _ref[0], rmClass = _ref[1], text = _ref[2];
          $.addClass(entryEl, addClass);
          $.rmClass(entryEl, rmClass);
          return entryEl.textContent = text;
        });
      },
      addMenuEntries: function() {
        var cb, conf, entries, entry, name, refresh, subEntries, _i, _len, _ref, _ref1;
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
        _ref = Config.threadWatcher;
        for (name in _ref) {
          conf = _ref[name];
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
        for (_i = 0, _len = entries.length; _i < _len; _i++) {
          _ref1 = entries[_i], entry = _ref1.entry, cb = _ref1.cb, refresh = _ref1.refresh;
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
          el: UI.checkbox(name, " " + (name.replace(' Thread Watcher', '')))
        };
        entry.el.title = desc;
        input = entry.el.firstElementChild;
        $.on(input, 'change', $.cb.checked);
        if (name === 'Current Board' || name === 'Show Unread Count') {
          $.on(input, 'change', ThreadWatcher.refresh);
        }
        if (name === 'Show Unread Count' || name === 'Auto Update Thread Watcher') {
          $.on(input, 'change', ThreadWatcher.fetchAuto);
        }
        return entry;
      }
    }
  };

  Unread = {
    init: function() {
      if (g.VIEW !== 'thread' || !Conf['Unread Count'] && !Conf['Unread Favicon'] && !Conf['Unread Line'] && !Conf['Scroll to Last Read Post'] && !Conf['Thread Watcher'] && !Conf['Desktop Notifications'] && !Conf['Quote Threading']) {
        return;
      }
      this.db = new DataBoard('lastReadPosts', this.sync);
      this.hr = $.el('hr', {
        id: 'unread-line'
      });
      this.posts = new Set;
      this.postsQuotingYou = new Set;
      this.order = new RandomAccessList;
      this.position = null;
      Thread.callbacks.push({
        name: 'Unread',
        cb: this.node
      });
      return Post.callbacks.push({
        name: 'Unread',
        cb: this.addPost
      });
    },
    node: function() {
      var ID, _i, _len, _ref;
      Unread.thread = this;
      Unread.title = d.title;
      Unread.lastReadPost = Unread.db.get({
        boardID: this.board.ID,
        threadID: this.ID,
        defaultValue: 0
      });
      Unread.readCount = 0;
      _ref = this.posts.keys;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        ID = _ref[_i];
        if (+ID <= Unread.lastReadPost) {
          Unread.readCount++;
        }
      }
      $.one(d, '4chanXInitFinished', Unread.ready);
      return $.on(d, 'ThreadUpdate', Unread.onUpdate);
    },
    ready: function() {
      Unread.setLine(true);
      Unread.read();
      Unread.update();
      if (Conf['Scroll to Last Read Post']) {
        Unread.scroll();
      }
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
      var ID, i, lastReadPost, postIDs, _i, _ref, _ref1;
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
      for (i = _i = _ref = Unread.readCount, _ref1 = postIDs.length; _i < _ref1; i = _i += 1) {
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
      var _ref;
      if (this.isFetchedQuote || this.isClone) {
        return;
      }
      Unread.order.push(this);
      if (this.ID <= Unread.lastReadPost || this.isHidden || ((_ref = QR.db) != null ? _ref.get({
        boardID: this.board.ID,
        threadID: this.thread.ID,
        postID: this.ID
      }) : void 0)) {
        return;
      }
      Unread.posts.add(this.ID);
      Unread.addPostQuotingYou(this);
      return Unread.position != null ? Unread.position : Unread.position = Unread.order[this.ID];
    },
    addPostQuotingYou: function(post) {
      var quotelink, _i, _len, _ref, _ref1;
      _ref = post.nodes.quotelinks;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        quotelink = _ref[_i];
        if (!((_ref1 = QR.db) != null ? _ref1.get(Get.postDataFromLink(quotelink)) : void 0)) {
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
      notif = new Notification("" + post.info.nameBlock + " replied to you", {
        body: post.info[Conf['Remove Spoilers'] || Conf['Reveal Spoilers'] ? 'comment' : 'commentSpoilered'],
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
      var ID, count, data, height, root, _ref, _ref1;
      if (d.hidden || !Unread.posts.size) {
        return;
      }
      height = doc.clientHeight;
      count = 0;
      while (Unread.position) {
        _ref = Unread.position, ID = _ref.ID, data = _ref.data;
        root = data.nodes.root;
        if (!(!root.getBoundingClientRect().height || Header.getBottomOf(root) > -1)) {
          break;
        }
        count++;
        Unread.posts["delete"](ID);
        Unread.postsQuotingYou["delete"](ID);
        if (Conf['Mark Quotes of You'] && ((_ref1 = QR.db) != null ? _ref1.get({
          boardID: data.board.ID,
          threadID: data.thread.ID,
          postID: ID
        }) : void 0)) {
          QuoteYou.lastRead = root;
        }
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
      var _results;
      _results = [];
      while (Unread.position && !Unread.posts.has(Unread.position.ID)) {
        _results.push(Unread.position = Unread.position.next);
      }
      return _results;
    },
    saveLastReadPost: $.debounce(2 * $.SECOND, function() {
      var ID, i, postIDs, _i, _ref, _ref1;
      postIDs = Unread.thread.posts.keys;
      for (i = _i = _ref = Unread.readCount, _ref1 = postIDs.length; _i < _ref1; i = _i += 1) {
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
      Unread.db.forceSync();
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
      if (d.hidden || (force === true)) {
        if (Unread.linePosition = Unread.positionPrev()) {
          $.after(Unread.linePosition.data.nodes.root, Unread.hr);
        } else {
          $.rm(Unread.hr);
        }
      }
      return Unread.hr.hidden = Unread.linePosition === Unread.order.last;
    },
    update: function() {
      var count, countQuotingYou, titleCount, titleDead, titleQuotingYou;
      count = Unread.posts.size;
      countQuotingYou = Unread.postsQuotingYou.size;
      if (Conf['Unread Count']) {
        titleQuotingYou = Conf['Quoted Title'] && countQuotingYou ? '(!) ' : '';
        titleCount = count || !Conf['Hide Unread Count at (0)'] ? "(" + count + ") " : '';
        titleDead = Unread.thread.isDead ? Unread.title.replace('-', (Unread.thread.isArchived ? '- Archived -' : '- 404 -')) : Unread.title;
        d.title = "" + titleQuotingYou + titleCount + titleDead;
      }
      if (!(Unread.thread.isDead && !Unread.thread.isArchived)) {
        ThreadWatcher.update(Unread.thread.board.ID, Unread.thread.ID, {
          isDead: Unread.thread.isDead,
          unread: count,
          quotingYou: countQuotingYou
        });
      }
      if (!Conf['Unread Favicon']) {
        return;
      }
      Favicon.el.href = Unread.thread.isDead ? countQuotingYou ? Favicon.unreadDeadY : count ? Favicon.unreadDead : Favicon.dead : count ? countQuotingYou ? Favicon.unreadY : Favicon.unread : Favicon["default"];
      return $.add(d.head, Favicon.el);
    }
  };

  Redirect = {
    init: function() {
      var archive, archives, boardID, boards, data, files, id, name, o, record, software, type, withCredentials, _i, _j, _len, _len1, _ref, _ref1;
      o = {
        thread: {},
        post: {},
        file: {}
      };
      archives = {};
      _ref = Redirect.archives;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        data = _ref[_i];
        name = data.name, boards = data.boards, files = data.files, software = data.software, withCredentials = data.withCredentials;
        archives[name] = data;
        for (_j = 0, _len1 = boards.length; _j < _len1; _j++) {
          boardID = boards[_j];
          if (!(!withCredentials)) {
            continue;
          }
          if (!(boardID in o.thread)) {
            o.thread[boardID] = data;
          }
          if (!(boardID in o.post || software !== 'foolfuuka')) {
            o.post[boardID] = data;
          }
          if (!(boardID in o.file || __indexOf.call(files, boardID) < 0)) {
            o.file[boardID] = data;
          }
        }
      }
      _ref1 = Conf['selectedArchives'];
      for (boardID in _ref1) {
        record = _ref1[boardID];
        for (type in record) {
          id = record[type];
          if (id === 'disabled') {
            delete o[type][boardID];
          } else if (archive = archives[id]) {
            boards = type === 'file' ? archive.files : archive.boards;
            if (__indexOf.call(boards, boardID) >= 0) {
              o[type][boardID] = archive;
            }
          }
        }
      }
      return Redirect.data = o;
    },
    archives: [{"uid":0,"name":"Moe","domain":"archive.moe","http":false,"https":true,"software":"foolfuuka","boards":["a","biz","c","co","diy","gd","h","i","int","jp","k","m","mlp","out","po","qa","r9k","s4s","sci","tg","tv","u","v","vg","vp","vr","wsg"],"files":["a","biz","c","co","diy","gd","h","i","jp","k","m","mlp","po","qa","s4s","sci","tg","u","v","vg","vp","vr","wsg"]},{"uid":3,"name":"4plebs Archive","domain":"archive.4plebs.org","http":true,"https":true,"software":"foolfuuka","boards":["adv","f","hr","o","pol","s4s","tg","trv","tv","x"],"files":["adv","f","hr","o","pol","s4s","tg","trv","tv","x"]},{"uid":5,"name":"Love is Over","domain":"archive.loveisover.me","http":true,"https":true,"software":"foolfuuka","boards":["c","d","e","i","lgbt","t","u","w","wg"],"files":["c","d","e","i","lgbt","t","u","w","wg"]},{"uid":8,"name":"Rebecca Black Tech","domain":"rbt.asia","http":false,"https":true,"software":"fuuka","boards":["cgl","g","mu","qa","w"],"files":["cgl","g","mu","qa","w"]},{"uid":10,"name":"warosu","domain":"warosu.org","http":false,"https":true,"software":"fuuka","boards":["3","biz","cgl","ck","diy","fa","g","ic","jp","lit","sci","tg","vr"],"files":["3","biz","cgl","ck","diy","fa","g","ic","jp","lit","sci","tg","vr"]},{"uid":15,"name":"fgts","domain":"fgts.jp","http":true,"https":true,"software":"foolfuuka","boards":["asp","cm","h","hc","hm","n","p","qa","r","s","soc","y"],"files":["asp","cm","h","hc","hm","n","p","qa","r","s","soc","y"]},{"uid":21,"name":"imcute","domain":"imcute.yt","http":true,"https":false,"software":"foolfuuka","boards":["an","fit","gif","int","mlp","out","r9k","qa","toy"],"files":["an","fit","gif","int","mlp","out","r9k","qa","toy"],"imagehosts":["http://imcute.yt/"]}],
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
      return "" + protocol + "//";
    },
    thread: function(archive, _arg) {
      var boardID, path, postID, threadID;
      boardID = _arg.boardID, threadID = _arg.threadID, postID = _arg.postID;
      path = threadID ? "" + boardID + "/thread/" + threadID : "" + boardID + "/post/" + postID;
      if (archive.software === 'foolfuuka') {
        path += '/';
      }
      if (threadID && postID) {
        path += archive.software === 'foolfuuka' ? "#" + postID : "#p" + postID;
      }
      return "" + (Redirect.protocol(archive)) + archive.domain + "/" + path;
    },
    post: function(archive, _arg) {
      var URL, boardID, postID, protocol;
      boardID = _arg.boardID, postID = _arg.postID;
      protocol = Redirect.protocol(archive);
      URL = new String("" + protocol + archive.domain + "/_/api/chan/post/?board=" + boardID + "&num=" + postID);
      if (!Redirect.securityCheck(URL)) {
        return '';
      }
      URL.archive = archive;
      return URL;
    },
    file: function(archive, _arg) {
      var boardID, filename;
      boardID = _arg.boardID, filename = _arg.filename;
      return "" + (Redirect.protocol(archive)) + archive.domain + "/" + boardID + "/full_image/" + filename;
    },
    board: function(archive, _arg) {
      var boardID;
      boardID = _arg.boardID;
      return "" + (Redirect.protocol(archive)) + archive.domain + "/" + boardID + "/";
    },
    search: function(archive, _arg) {
      var boardID, path, type, value;
      boardID = _arg.boardID, type = _arg.type, value = _arg.value;
      type = type === 'name' ? 'username' : type === 'uniqueID' ? 'uid' : type === 'MD5' ? 'image' : type;
      value = encodeURIComponent(value);
      path = archive.software === 'foolfuuka' ? "" + boardID + "/search/" + type + "/" + value : "" + boardID + "/?task=search2&search_" + (type === 'image' ? 'media_hash' : type) + "=" + value;
      return "" + (Redirect.protocol(archive)) + archive.domain + "/" + path;
    },
    securityCheck: function(URL) {
      return /^https:\/\//.test(URL) || location.protocol === 'http:' || Conf['Except Archives from Encryption'];
    },
    navigate: function(URL, alternative) {
      if (URL && (Redirect.securityCheck(URL) || confirm("Redirect to " + URL + "?\n\nYour connection will not be encrypted."))) {
        return location.replace(URL);
      } else if (alternative) {
        return location.replace(alternative);
      }
    }
  };

  PSAHiding = {
    init: function() {
      if (!Conf['Announcement Hiding']) {
        return;
      }
      $.addClass(doc, 'hide-announcement');
      return $.one(d, '4chanXInitFinished', this.setup);
    },
    setup: function() {
      var btn, entry, hr, psa, _ref;
      if (!(psa = PSAHiding.psa = $.id('globalMessage'))) {
        $.rmClass(doc, 'hide-announcement');
        return;
      }
      if ((hr = (_ref = $.id('globalToggle')) != null ? _ref.previousElementSibling : void 0) && hr.nodeName === 'HR') {
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
      $.get('hiddenPSA', 0, function(_arg) {
        var hiddenPSA;
        hiddenPSA = _arg.hiddenPSA;
        PSAHiding.sync(hiddenPSA);
        $.add(psa, btn);
        return $.rmClass(doc, 'hide-announcement');
      });
      return $.sync('hiddenPSA', PSAHiding.sync);
    },
    toggle: function(e) {
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
      var psa, _ref;
      psa = PSAHiding.psa;
      PSAHiding.hidden = PSAHiding.btn.hidden = (UTC != null) && UTC >= +psa.dataset.utc;
      if (PSAHiding.hidden) {
        $.rm(psa);
      } else {
        $.after($.id('globalToggle'), psa);
      }
      if ((_ref = PSAHiding.hr) != null) {
        _ref.hidden = PSAHiding.hidden;
      }
    }
  };

  AntiAutoplay = {
    init: function() {
      var audio, _i, _len, _ref;
      if (!Conf['Disable Autoplaying Sounds']) {
        return;
      }
      $.addClass(doc, 'anti-autoplay');
      _ref = $$('audio[autoplay]', doc);
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        audio = _ref[_i];
        this.stop(audio);
      }
      window.addEventListener('loadstart', ((function(_this) {
        return function(e) {
          return _this.stop(e.target);
        };
      })(this)), true);
      Post.callbacks.push({
        name: 'Disable Autoplaying Sounds',
        cb: this.node
      });
      CatalogThread.callbacks.push({
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
      return AntiAutoplay.process(this.nodes.root);
    },
    process: function(root) {
      var iframe, object, _i, _j, _len, _len1, _ref, _ref1;
      _ref = $$('iframe[src*="youtube"][src*="autoplay=1"]', root);
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        iframe = _ref[_i];
        iframe.src = iframe.src.replace(/\?autoplay=1&?/, '?').replace('&autoplay=1', '');
      }
      _ref1 = $$('object[data*="youtube"][data*="autoplay=1"]', root);
      for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
        object = _ref1[_j];
        object.data = object.data.replace(/\?autoplay=1&?/, '?').replace('&autoplay=1', '');
      }
    }
  };

  Banner = {
    banners: ["0.jpg","1.jpg","2.jpg","4.jpg","6.jpg","7.jpg","8.jpg","9.jpg","10.jpg","11.jpg","12.jpg","13.jpg","14.jpg","16.jpg","17.jpg","18.jpg","19.jpg","20.jpg","21.jpg","22.jpg","24.jpg","25.jpg","26.jpg","28.jpg","29.jpg","33.jpg","38.jpg","39.jpg","43.jpg","44.jpg","45.jpg","46.jpg","47.jpg","52.jpg","54.jpg","57.jpg","59.jpg","60.jpg","61.jpg","64.jpg","66.jpg","67.jpg","69.jpg","71.jpg","72.jpg","76.jpg","77.jpg","81.jpg","82.jpg","83.jpg","84.jpg","88.jpg","90.jpg","91.jpg","96.jpg","98.jpg","99.jpg","100.jpg","104.jpg","106.jpg","116.jpg","119.jpg","137.jpg","140.jpg","148.jpg","149.jpg","150.jpg","154.jpg","156.jpg","157.jpg","158.jpg","159.jpg","161.jpg","162.jpg","164.jpg","165.jpg","166.jpg","167.jpg","168.jpg","169.jpg","170.jpg","171.jpg","172.jpg","173.jpg","174.jpg","175.jpg","176.jpg","178.jpg","179.jpg","180.jpg","181.jpg","182.jpg","183.jpg","186.jpg","189.jpg","190.jpg","192.jpg","193.jpg","194.jpg","197.jpg","198.jpg","200.jpg","201.jpg","202.jpg","203.jpg","205.jpg","206.jpg","207.jpg","208.jpg","210.jpg","213.jpg","214.jpg","215.jpg","216.jpg","218.jpg","219.jpg","220.jpg","221.jpg","222.jpg","223.jpg","224.jpg","227.jpg","0.png","1.png","2.png","3.png","5.png","6.png","9.png","10.png","11.png","12.png","14.png","16.png","19.png","20.png","21.png","22.png","23.png","24.png","26.png","27.png","28.png","29.png","30.png","31.png","32.png","33.png","34.png","37.png","39.png","40.png","41.png","42.png","43.png","44.png","45.png","48.png","49.png","50.png","51.png","52.png","53.png","57.png","58.png","59.png","64.png","66.png","67.png","68.png","69.png","70.png","71.png","72.png","76.png","78.png","81.png","82.png","85.png","86.png","87.png","89.png","95.png","98.png","100.png","101.png","102.png","105.png","106.png","107.png","109.png","110.png","111.png","112.png","113.png","114.png","115.png","116.png","118.png","119.png","120.png","121.png","122.png","123.png","126.png","128.png","130.png","134.png","136.png","138.png","139.png","140.png","142.png","145.png","146.png","149.png","150.png","151.png","152.png","153.png","154.png","155.png","156.png","157.png","158.png","159.png","160.png","163.png","164.png","165.png","166.png","167.png","168.png","169.png","170.png","171.png","172.png","173.png","174.png","178.png","179.png","180.png","181.png","182.png","184.png","186.png","188.png","190.png","192.png","193.png","194.png","195.png","196.png","197.png","198.png","200.png","202.png","203.png","205.png","206.png","207.png","209.png","212.png","213.png","214.png","216.png","217.png","218.png","219.png","220.png","221.png","222.png","223.png","224.png","225.png","226.png","229.png","231.png","232.png","233.png","234.png","235.png","237.png","238.png","239.png","240.png","241.png","242.png","244.png","245.png","246.png","247.png","248.png","249.png","250.png","253.png","254.png","255.png","257.png","258.png","259.png","260.png","262.png","268.png","0.gif","1.gif","2.gif","3.gif","4.gif","5.gif","6.gif","7.gif","8.gif","9.gif","10.gif","12.gif","13.gif","14.gif","15.gif","16.gif","18.gif","19.gif","20.gif","21.gif","22.gif","23.gif","24.gif","28.gif","29.gif","30.gif","33.gif","34.gif","35.gif","36.gif","37.gif","39.gif","40.gif","42.gif","44.gif","45.gif","46.gif","48.gif","50.gif","52.gif","54.gif","55.gif","57.gif","58.gif","59.gif","60.gif","61.gif","62.gif","63.gif","64.gif","66.gif","67.gif","68.gif","69.gif","70.gif","72.gif","73.gif","75.gif","76.gif","77.gif","78.gif","80.gif","81.gif","82.gif","83.gif","86.gif","87.gif","88.gif","92.gif","93.gif","94.gif","95.gif","96.gif","97.gif","98.gif","99.gif","100.gif","101.gif","102.gif","103.gif","104.gif","105.gif","106.gif","108.gif","109.gif","110.gif","111.gif","112.gif","113.gif","115.gif","116.gif","117.gif","118.gif","119.gif","120.gif","122.gif","123.gif","124.gif","127.gif","129.gif","130.gif","131.gif","134.gif","135.gif","136.gif","138.gif","139.gif","141.gif","144.gif","146.gif","148.gif","149.gif","153.gif","154.gif","155.gif","157.gif","158.gif","159.gif","160.gif","161.gif","162.gif","164.gif","166.gif","167.gif","168.gif","169.gif","170.gif","171.gif","172.gif","173.gif","174.gif","175.gif","176.gif","177.gif","178.gif","181.gif","182.gif","183.gif","185.gif","186.gif","187.gif","188.gif","189.gif","190.gif","191.gif","192.gif","193.gif","195.gif","196.gif","197.gif","200.gif","201.gif","202.gif","203.gif","204.gif","205.gif","206.gif","207.gif","208.gif","209.gif","210.gif","211.gif","212.gif","213.gif","214.gif","215.gif","216.gif","217.gif","219.gif","220.gif","221.gif","222.gif","224.gif","225.gif","226.gif","227.gif","228.gif","230.gif","232.gif","233.gif","234.gif","235.gif","238.gif","240.gif","241.gif","243.gif","244.gif","245.gif","246.gif","247.gif","249.gif","250.gif","251.gif","253.gif"],
    init: function() {
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
      var banner, child, children, i;
      banner = $(".boardBanner");
      children = banner.children;
      if (g.BOARD.ID !== 'f' && g.VIEW === 'thread' && Conf['Remove Thread Excerpt']) {
        Banner.setTitle(children[1].textContent);
      }
      i = 0;
      while (child = children[i++]) {
        if (i === 1) {
          child.title = "Click to change";
          $.on(child, 'click', Banner.cb.toggle);
          continue;
        }
        if (Conf['Custom Board Titles']) {
          Banner.custom(child).title = "Ctrl/\u2318+click to edit board " + (i === 3 ? 'sub' : '') + "title";
          child.spellcheck = false;
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
        var banner, i, _ref;
        if (!((_ref = Banner.choices) != null ? _ref.length : void 0)) {
          Banner.choices = Banner.banners.slice();
        }
        i = Math.floor(Banner.choices.length * Math.random());
        banner = Banner.choices.splice(i, 1);
        return $('img', this.parentNode).src = "//s.4cdn.org/image/title/" + banner;
      },
      click: function(e) {
        if (e.ctrlKey || e.metaKey) {
          this.contentEditable = true;
          return this.focus();
        }
      },
      keydown: function(e) {
        e.stopPropagation();
        if (!e.shiftKey && e.keyCode === 13) {
          return this.blur();
        }
      },
      focus: function() {
        var items, string, string2;
        string = "" + g.BOARD + "." + this.className;
        string2 = "" + string + ".orig";
        items = {
          title: this.textContent
        };
        items[string] = '';
        items[string2] = false;
        $.get(items, function(items) {
          if (!(items[string2] && items.title === items[string])) {
            return $.set(string2, items.title);
          }
        });
      },
      blur: function() {
        this.contentEditable = false;
        return $.set("" + g.BOARD + "." + this.className, this.textContent);
      }
    },
    custom: function(child) {
      var cachedTest, string;
      cachedTest = child.textContent;
      string = "" + g.BOARD + "." + child.className;
      $.on(child, 'click keydown focus blur', function(e) {
        return Banner.cb[e.type].apply(this, [e]);
      });
      $.get(string, cachedTest, function(item) {
        var string2, title;
        if (!(title = item[string])) {
          return;
        }
        if (title === cachedTest) {
          return;
        }
        if (Conf['Persistent Custom Board Titles']) {
          return child.textContent = title;
        }
        string2 = "" + string + ".orig";
        return $.get(string2, cachedTest, function(itemb) {
          if (cachedTest === itemb[string2]) {
            return child.textContent = title;
          } else {
            $.set(string, cachedTest);
            return $.set(string2, cachedTest);
          }
        });
      });
      return child;
    }
  };

  CatalogLinks = {
    init: function() {
      var el, input, selector;
      if ((Conf['External Catalog'] || Conf['JSON Navigation']) && !(Conf['JSON Navigation'] && g.VIEW === 'index')) {
        selector = (function() {
          switch (g.VIEW) {
            case 'thread':
            case 'archive':
              return '.navLinks.desktop > a';
            case 'catalog':
              return '.navLinks > :first-child > a';
            case 'index':
              return '.middlead + .desktop > a, .cataloglink > a';
          }
        })();
        $.ready(function() {
          var catalogLink, link, _i, _len, _ref;
          _ref = $$(selector);
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            link = _ref[_i];
            switch (link.pathname) {
              case "/" + g.BOARD + "/":
                link.href = CatalogLinks.index();
                break;
              case "/" + g.BOARD + "/catalog":
                link.href = CatalogLinks.catalog();
            }
            if (g.VIEW === 'catalog' && Conf['JSON Navigation'] && Conf['Use 4chan X Catalog']) {
              catalogLink = link.parentNode.cloneNode(true);
              catalogLink.firstElementChild.textContent = '4chan X Catalog';
              catalogLink.firstElementChild.href = CatalogLinks.catalog();
              $.after(link.parentNode, [$.tn(' '), catalogLink]);
            }
          }
        });
      }
      if (Conf['JSON Navigation'] && Conf['Use 4chan X Catalog']) {
        Post.callbacks.push({
          name: 'Catalog Link Rewrite',
          cb: this.node
        });
        CatalogThread.callbacks.push({
          name: 'Catalog Link Rewrite',
          cb: this.node
        });
      }
      if (Conf['Catalog Links']) {
        CatalogLinks.el = el = UI.checkbox('Header catalog links', ' Catalog Links');
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
      var a, m, _i, _len, _ref;
      _ref = $$('a', this.nodes.comment);
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        a = _ref[_i];
        if (m = a.href.match(/^https?:\/\/boards\.4chan\.org\/([^\/]+)\/catalog(#s=.*)?/)) {
          a.href = "//boards.4chan.org/" + m[1] + "/" + (m[2] || '#catalog');
        }
      }
    },
    initBoardList: function() {
      if (!Conf['Catalog Links']) {
        return;
      }
      return CatalogLinks.set(Conf['Header catalog links']);
    },
    toggle: function() {
      $.event('CloseMenu');
      $.set('Header catalog links', this.checked);
      return CatalogLinks.set(this.checked);
    },
    set: function(useCatalog) {
      var a, board, _i, _len, _ref, _ref1;
      _ref = $$('a:not([data-only])', Header.boardList).concat($$('a', Header.bottomBoardList));
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        a = _ref[_i];
        if (((_ref1 = a.hostname) !== 'boards.4chan.org' && _ref1 !== 'catalog.neet.tv' && _ref1 !== '4index.gropes.us') || !(board = a.pathname.split('/')[1]) || (board === 'f' || board === 'status' || board === '4chan') || a.pathname.split('/')[2] === 'archive' || $.hasClass(a, 'external')) {
          continue;
        }
        a.href = CatalogLinks[useCatalog ? 'catalog' : 'index'](board);
      }
      CatalogLinks.el.title = "Turn catalog links " + (useCatalog ? 'off' : 'on') + ".";
      return $('input', CatalogLinks.el).checked = useCatalog;
    },
    catalog: function(board) {
      if (board == null) {
        board = g.BOARD.ID;
      }
      if (Conf['External Catalog'] && (board === 'a' || board === 'c' || board === 'g' || board === 'biz' || board === 'k' || board === 'm' || board === 'o' || board === 'p' || board === 'v' || board === 'vg' || board === 'vr' || board === 'w' || board === 'wg' || board === 'cm' || board === '3' || board === 'adv' || board === 'an' || board === 'asp' || board === 'cgl' || board === 'ck' || board === 'co' || board === 'diy' || board === 'fa' || board === 'fit' || board === 'gd' || board === 'int' || board === 'jp' || board === 'lit' || board === 'mlp' || board === 'mu' || board === 'n' || board === 'out' || board === 'po' || board === 'sci' || board === 'sp' || board === 'tg' || board === 'toy' || board === 'trv' || board === 'tv' || board === 'vp' || board === 'wsg' || board === 'x' || board === 'f' || board === 'pol' || board === 's4s' || board === 'lgbt')) {
        return "http://catalog.neet.tv/" + board;
      } else if (Conf['JSON Navigation'] && Conf['Use 4chan X Catalog']) {
        if (g.BOARD.ID === board && g.VIEW === 'index') {
          return '#catalog';
        } else {
          return "/" + board + "/#catalog";
        }
      } else {
        return "/" + board + "/catalog";
      }
    },
    index: function(board) {
      if (board == null) {
        board = g.BOARD.ID;
      }
      if (Conf['JSON Navigation'] && Conf['Use 4chan X Catalog']) {
        if (g.BOARD.ID === board && g.VIEW === 'index') {
          return '#index';
        } else {
          return "/" + board + "/#index";
        }
      } else {
        return "/" + board + "/";
      }
    }
  };

  CustomCSS = {
    init: function() {
      if (!Conf['Custom CSS']) {
        return;
      }
      return this.addStyle();
    },
    addStyle: function() {
      return this.style = $.addStyle(Conf['usercss'], 'custom-css', function() {
        return $.id('fourchanx-css');
      });
    },
    rmStyle: function() {
      if (this.style) {
        $.rm(this.style);
        return delete this.style;
      }
    },
    update: function() {
      if (!this.style) {
        this.addStyle();
      }
      return this.style.textContent = Conf['usercss'];
    }
  };

  ExpandComment = {
    init: function() {
      if (g.VIEW !== 'index' || !Conf['Comment Expansion']) {
        return;
      }
      if (g.BOARD.ID === 'g') {
        this.callbacks.push(Fourchan.code);
      }
      if (g.BOARD.ID === 'sci') {
        this.callbacks.push(Fourchan.math);
      }
      return Post.callbacks.push({
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
      return $.cache("//a.4cdn.org" + (a.pathname.split('/').splice(0, 4).join('/')) + ".json", function() {
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
      var callback, clone, comment, href, postObj, posts, quote, spoilerRange, status, _i, _j, _k, _len, _len1, _len2, _ref, _ref1;
      status = req.status;
      if (status !== 200 && status !== 304) {
        a.textContent = "Error " + req.statusText + " (" + status + ")";
        return;
      }
      posts = req.response.posts;
      if (spoilerRange = posts[0].custom_spoiler) {
        Build.spoilerRange[g.BOARD] = spoilerRange;
      }
      for (_i = 0, _len = posts.length; _i < _len; _i++) {
        postObj = posts[_i];
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
      _ref = $$('.quotelink', clone);
      for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
        quote = _ref[_j];
        href = quote.getAttribute('href');
        if (href[0] === '/') {
          continue;
        }
        if (href[0] === '#') {
          quote.href = "" + (a.pathname.split('/').splice(0, 4).join('/')) + href;
        } else {
          quote.href = "" + (a.pathname.split('/').splice(0, 3).join('/')) + "/" + href;
        }
      }
      post.nodes.shortComment = comment;
      $.replace(comment, clone);
      post.nodes.comment = post.nodes.longComment = clone;
      post.parseComment();
      post.parseQuotes();
      _ref1 = ExpandComment.callbacks;
      for (_k = 0, _len2 = _ref1.length; _k < _len2; _k++) {
        callback = _ref1[_k];
        callback.call(post);
      }
    }
  };

  ExpandThread = {
    statuses: {},
    init: function() {
      if (g.VIEW === 'thread' || !Conf['Thread Expansion']) {
        return;
      }
      if (Conf['JSON Navigation']) {
        return $.on(d, 'IndexRefresh', this.onIndexRefresh);
      } else {
        return Thread.callbacks.push({
          name: 'Expand Thread',
          cb: function() {
            return ExpandThread.setButton(this);
          }
        });
      }
    },
    setButton: function(thread) {
      var a;
      if (!(a = $.x('following-sibling::*[contains(@class,"summary")][1]', thread.OP.nodes.root))) {
        return;
      }
      a.textContent = ExpandThread.text.apply(ExpandThread, ['+'].concat(__slice.call(a.textContent.match(/\d+/g))));
      a.style.cursor = 'pointer';
      return $.on(a, 'click', ExpandThread.cbToggle);
    },
    disconnect: function(refresh) {
      var status, threadID, _ref, _ref1;
      if (g.VIEW === 'thread' || !Conf['Thread Expansion']) {
        return;
      }
      _ref = ExpandThread.statuses;
      for (threadID in _ref) {
        status = _ref[threadID];
        if ((_ref1 = status.req) != null) {
          _ref1.abort();
        }
        delete ExpandThread.statuses[threadID];
      }
      if (!refresh) {
        return $.off(d, 'IndexRefresh', this.onIndexRefresh);
      }
    },
    onIndexRefresh: function() {
      ExpandThread.disconnect(true);
      return g.BOARD.threads.forEach(function(thread) {
        return ExpandThread.setButton(thread);
      });
    },
    text: function(status, posts, files) {
      return ("" + status + " " + posts + " post" + (posts > 1 ? 's' : '')) + (+files ? " and " + files + " image repl" + (files > 1 ? 'ies' : 'y') : "") + (" " + (status === '-' ? 'shown' : 'omitted') + ".");
    },
    cbToggle: function(e) {
      if (e.shiftKey || e.altKey || e.ctrlKey || e.metaKey || e.button !== 0) {
        return;
      }
      e.preventDefault();
      return ExpandThread.toggle(Get.threadFromNode(this));
    },
    toggle: function(thread) {
      var a, threadRoot;
      threadRoot = thread.OP.nodes.root.parentNode;
      if (!(a = $('.summary', threadRoot))) {
        return;
      }
      if (thread.ID in ExpandThread.statuses) {
        return ExpandThread.contract(thread, a, threadRoot);
      } else {
        return ExpandThread.expand(thread, a, threadRoot);
      }
    },
    expand: function(thread, a, threadRoot) {
      var status;
      ExpandThread.statuses[thread] = status = {};
      a.textContent = ExpandThread.text.apply(ExpandThread, ['...'].concat(__slice.call(a.textContent.match(/\d+/g))));
      return status.req = $.cache("//a.4cdn.org/" + thread.board + "/thread/" + thread + ".json", function() {
        delete status.req;
        return ExpandThread.parse(this, thread, a);
      });
    },
    contract: function(thread, a, threadRoot) {
      var filesCount, inlined, num, postsCount, replies, reply, status, _i, _len;
      status = ExpandThread.statuses[thread];
      delete ExpandThread.statuses[thread];
      if (status.req) {
        status.req.abort();
        if (a) {
          a.textContent = ExpandThread.text.apply(ExpandThread, ['+'].concat(__slice.call(a.textContent.match(/\d+/g))));
        }
        return;
      }
      replies = $$('.thread > .replyContainer', threadRoot);
      if (!Conf['JSON Navigation'] || Conf['Show Replies']) {
        num = (function() {
          if (thread.isSticky) {
            return 1;
          } else {
            switch (g.BOARD.ID) {
              case 'b':
              case 'vg':
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
      for (_i = 0, _len = replies.length; _i < _len; _i++) {
        reply = replies[_i];
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
      return a.textContent = ExpandThread.text('+', postsCount, filesCount);
    },
    parse: function(req, thread, a) {
      var filesCount, post, postData, posts, postsCount, postsRoot, root, _i, _len, _ref, _ref1;
      if ((_ref = req.status) !== 200 && _ref !== 304) {
        a.textContent = "Error " + req.statusText + " (" + req.status + ")";
        return;
      }
      Build.spoilerRange[thread.board] = req.response.posts[0].custom_spoiler;
      posts = [];
      postsRoot = [];
      filesCount = 0;
      _ref1 = req.response.posts;
      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
        postData = _ref1[_i];
        if (postData.no === thread.ID) {
          continue;
        }
        if (post = thread.posts[postData.no]) {
          if ('file' in post) {
            filesCount++;
          }
          postsRoot.push(post.nodes.root);
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
      Main.callbackNodes(Post, posts);
      $.after(a, postsRoot);
      $.event('PostsInserted');
      postsCount = postsRoot.length;
      return a.textContent = ExpandThread.text('-', postsCount, filesCount);
    }
  };

  FileInfo = {
    init: function() {
      var _ref;
      if (((_ref = g.VIEW) !== 'index' && _ref !== 'thread') || !Conf['File Info Formatting']) {
        return;
      }
      return Post.callbacks.push({
        name: 'File Info Formatting',
        cb: this.node
      });
    },
    node: function() {
      if (!this.file || this.isClone) {
        return;
      }
      $.extend(this.file.text, {
        innerHTML: "<span class=\"file-info\"></span>"
      });
      return FileInfo.format(Conf['fileInfo'], this, this.file.text.firstElementChild);
    },
    format: function(formatString, post, outputNode) {
      var output;
      output = [];
      formatString.replace(/%(.)|[^%]+/g, function(s, c) {
        output.push(c in FileInfo.formatters ? FileInfo.formatters[c].call(post) : {
          innerHTML: E(s)
        });
        return '';
      });
      return $.extend(outputNode, {
        innerHTML: output.map(function(x) {
          return x.innerHTML;
        }).join('')
      });
    },
    formatters: {
      t: function() {
        return {
          innerHTML: E(this.file.URL.match(/\d+\..+$/)[0])
        };
      },
      T: function() {
        return {
          innerHTML: "<a href=\"" + E(this.file.URL) + "\" target=\"_blank\">" + FileInfo.formatters.t.call(this).innerHTML + "</a>"
        };
      },
      l: function() {
        return {
          innerHTML: "<a href=\"" + E(this.file.URL) + "\" target=\"_blank\">" + FileInfo.formatters.n.call(this).innerHTML + "</a>"
        };
      },
      L: function() {
        return {
          innerHTML: "<a href=\"" + E(this.file.URL) + "\" target=\"_blank\">" + FileInfo.formatters.N.call(this).innerHTML + "</a>"
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
      p: function() {
        if (this.file.isSpoiler) {
          return {
            innerHTML: "Spoiler, "
          };
        } else {
          return {
            innerHTML: ""
          };
        }
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
      '%': function() {
        return {
          innerHTML: "%"
        };
      }
    }
  };

  Fourchan = {
    init: function() {
      var _ref;
      if ((_ref = g.VIEW) !== 'index' && _ref !== 'thread') {
        return;
      }
      if (g.BOARD.ID === 'g') {
        $.globalEval('window.addEventListener(\'prettyprint\', function(e) {\n  window.dispatchEvent(new CustomEvent(\'prettyprint:cb\', {\n    detail: prettyPrintOne(e.detail)\n  }));\n}, false);');
        Post.callbacks.push({
          name: 'Parse /g/ code',
          cb: this.code
        });
      }
      if (g.BOARD.ID === 'sci') {
        $.globalEval('window.addEventListener(\'jsmath\', function(e) {\n  if (!jsMath) return;\n  if (jsMath.loaded) {\n    // process one post\n    jsMath.ProcessBeforeShowing(e.target);\n  } else if (jsMath.Autoload && jsMath.Autoload.checked) {\n    // load jsMath and process whole document\n    jsMath.Autoload.Script.Push(\'ProcessBeforeShowing\', [null]);\n    jsMath.Autoload.LoadJsMath();\n  }\n}, false);');
        Post.callbacks.push({
          name: 'Parse /sci/ math',
          cb: this.math
        });
        CatalogThread.callbacks.push({
          name: 'Parse /sci/ math',
          cb: this.math
        });
      }
      return Main.ready(function() {
        return $.globalEval('(function() {\n  window.clickable_ids = false;\n  var nodes = document.querySelectorAll(\'.posteruid, .capcode\');\n  for (var i = 0; i < nodes.length; i++) {\n    nodes[i].removeEventListener("click", window.idClick, false);\n  }\n  window.removeEventListener("message", Report.onMessage, false);\n})();');
      });
    },
    code: function() {
      var apply, pre, _i, _len, _ref;
      if (this.isClone) {
        return;
      }
      apply = function(e) {
        pre.innerHTML = e.detail;
        return $.addClass(pre, 'prettyprinted');
      };
      $.on(window, 'prettyprint:cb', apply);
      _ref = $$('.prettyprint:not(.prettyprinted)', this.nodes.comment);
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        pre = _ref[_i];
        $.event('prettyprint', pre.innerHTML, window);
      }
      $.off(window, 'prettyprint:cb', apply);
    },
    math: function() {
      if ((this.isClone && doc.contains(this.origin.nodes.root)) || !$('.math', this.nodes.comment)) {
        return;
      }
      return $.asap(((function(_this) {
        return function() {
          return doc.contains(_this.nodes.comment);
        };
      })(this)), (function(_this) {
        return function() {
          return $.event('jsmath', null, _this.nodes.comment);
        };
      })(this));
    }
  };

  IDColor = {
    init: function() {
      var _ref;
      if (((_ref = g.VIEW) !== 'index' && _ref !== 'thread') || !Conf['Color User IDs']) {
        return;
      }
      this.ids = {};
      return Post.callbacks.push({
        name: 'Color User IDs',
        cb: this.node
      });
    },
    node: function() {
      var rgb, span, style, uid;
      if (this.isClone || !(uid = this.info.uniqueID)) {
        return;
      }
      span = $('.hand', this.nodes.uniqueID);
      if (!(span && span.nodeName === 'SPAN')) {
        return;
      }
      rgb = IDColor.compute(uid);
      style = span.style;
      style.color = rgb[3];
      style.backgroundColor = "rgb(" + rgb[0] + "," + rgb[1] + "," + rgb[2] + ")";
      $.addClass(span, 'painted');
      return span.title = 'Highlight posts by this ID';
    },
    compute: function(uid) {
      var hash, rgb;
      if (IDColor.ids[uid]) {
        return IDColor.ids[uid];
      }
      hash = IDColor.hash(uid);
      rgb = [(hash >> 24) & 0xFF, (hash >> 16) & 0xFF, (hash >> 8) & 0xFF];
      rgb[3] = (rgb[0] * 0.299 + rgb[1] * 0.587 + rgb[2] * 0.114) > 125 ? '#000' : '#fff';
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

  IDHighlight = {
    init: function() {
      var _ref;
      if ((_ref = g.VIEW) !== 'index' && _ref !== 'thread') {
        return;
      }
      return Post.callbacks.push({
        name: 'Highlight by User ID',
        cb: this.node
      });
    },
    uniqueID: null,
    node: function() {
      if (this.nodes.uniqueID) {
        $.on(this.nodes.uniqueID, 'click', IDHighlight.click(this));
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

  Keybinds = {
    init: function() {
      var hotkey, init;
      if (!Conf['Keybinds']) {
        return;
      }
      for (hotkey in Conf.hotkeys) {
        $.sync(hotkey, Keybinds.sync);
      }
      init = function() {
        var node, _i, _len, _ref;
        $.off(d, '4chanXInitFinished', init);
        $.on(d, 'keydown', Keybinds.keydown);
        _ref = $$('[accesskey]');
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          node = _ref[_i];
          node.removeAttribute('accesskey');
        }
      };
      return $.on(d, '4chanXInitFinished', init);
    },
    sync: function(key, hotkey) {
      return Conf[hotkey] = key;
    },
    keydown: function(e) {
      var form, key, notification, notifications, op, searchInput, target, thread, threadRoot, _i, _len, _ref, _ref1, _ref2, _ref3, _ref4, _ref5, _ref6;
      if (!(key = Keybinds.keyCode(e))) {
        return;
      }
      target = e.target;
      if ((_ref = target.nodeName) === 'INPUT' || _ref === 'TEXTAREA') {
        if (!/(Esc|Alt|Ctrl|Meta|Shift\+\w{2,})/.test(key)) {
          return;
        }
      }
      if (!(((_ref1 = g.VIEW) !== 'index' && _ref1 !== 'thread') || g.VIEW === 'index' && Conf['JSON Navigation'] && Conf['Index Mode'] === 'catalog')) {
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
          Keybinds.qr();
          break;
        case Conf['Open QR']:
          if (!threadRoot) {
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
            for (_i = 0, _len = notifications.length; _i < _len; _i++) {
              notification = notifications[_i];
              $('.close', notification).click();
            }
          } else if (QR.nodes && !QR.nodes.el.hidden && window.getComputedStyle(QR.nodes.form).display !== 'none') {
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
        case Conf['Toggle sage']:
          if (!(QR.nodes && !QR.nodes.el.hidden)) {
            return;
          }
          Keybinds.sage();
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
              if (!Conf['JSON Navigation']) {
                return;
              }
              Index.update();
              break;
            default:
              return;
          }
          break;
        case Conf['Watch']:
          if (!thread) {
            return;
          }
          ThreadWatcher.toggle(thread);
          break;
        case Conf['Expand image']:
          if (!threadRoot) {
            return;
          }
          Keybinds.img(threadRoot);
          break;
        case Conf['Expand images']:
          if (!threadRoot) {
            return;
          }
          Keybinds.img(threadRoot, true);
          break;
        case Conf['Open Gallery']:
          if ((_ref2 = g.VIEW) !== 'index' && _ref2 !== 'thread') {
            return;
          }
          Gallery.cb.toggle();
          break;
        case Conf['fappeTyme']:
          if (!Conf['Fappe Tyme'] || ((_ref3 = g.VIEW) !== 'index' && _ref3 !== 'thread') || g.BOARD === 'f') {
            return;
          }
          FappeTyme.toggle('fappe');
          break;
        case Conf['werkTyme']:
          if (!Conf['Werk Tyme'] || ((_ref4 = g.VIEW) !== 'index' && _ref4 !== 'thread') || g.BOARD === 'f') {
            return;
          }
          FappeTyme.toggle('werk');
          break;
        case Conf['Front page']:
          if (Conf['JSON Navigation'] && !Conf['Use 4chan X Catalog'] && g.VIEW === 'index') {
            Index.userPageNav(1);
          } else {
            window.location = CatalogLinks.index();
          }
          break;
        case Conf['Open front page']:
          $.open(CatalogLinks.index());
          break;
        case Conf['Next page']:
          if (g.VIEW !== 'index') {
            return;
          }
          if (Conf['JSON Navigation']) {
            if ((_ref5 = Conf['Index Mode']) !== 'paged' && _ref5 !== 'infinite') {
              return;
            }
            $('.next button', Index.pagelist).click();
          } else {
            if (form = $('.next form')) {
              window.location = form.action;
            }
          }
          break;
        case Conf['Previous page']:
          if (g.VIEW !== 'index') {
            return;
          }
          if (Conf['JSON Navigation']) {
            if ((_ref6 = Conf['Index Mode']) !== 'paged' && _ref6 !== 'infinite') {
              return;
            }
            $('.prev button', Index.pagelist).click();
          } else {
            if (form = $('.prev form')) {
              window.location = form.action;
            }
          }
          break;
        case Conf['Search form']:
          if (g.VIEW !== 'index') {
            return;
          }
          searchInput = Conf['JSON Navigation'] ? Index.searchInput : $.id('search-box');
          Header.scrollToIfNeeded(searchInput);
          searchInput.focus();
          break;
        case Conf['Open catalog']:
          window.location = CatalogLinks.catalog();
          break;
        case Conf['Cycle sort type']:
          if (!(Conf['JSON Navigation'] && g.VIEW === 'index' && g.BOARD !== 'f')) {
            return;
          }
          Index.cycleSortType();
          break;
        case Conf['Next thread']:
          if (g.VIEW !== 'index' || !threadRoot) {
            return;
          }
          Nav.scroll(+1);
          break;
        case Conf['Previous thread']:
          if (g.VIEW !== 'index' || !threadRoot) {
            return;
          }
          Nav.scroll(-1);
          break;
        case Conf['Expand thread']:
          if (g.VIEW !== 'index' || !threadRoot) {
            return;
          }
          ExpandThread.toggle(thread);
          break;
        case Conf['Open thread']:
          if (g.VIEW !== 'index' || !threadRoot) {
            return;
          }
          Keybinds.open(thread);
          break;
        case Conf['Open thread tab']:
          if (g.VIEW !== 'index' || !threadRoot) {
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
          if (!thread) {
            return;
          }
          if (ThreadHiding.db) {
            ThreadHiding.toggle(thread);
          }
          break;
        case Conf['Previous Post Quoting You']:
          if (!threadRoot) {
            return;
          }
          QuoteYou.cb.seek('preceding');
          break;
        case Conf['Next Post Quoting You']:
          if (!threadRoot) {
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
          case 37:
            return 'Left';
          case 38:
            return 'Up';
          case 39:
            return 'Right';
          case 40:
            return 'Down';
          default:
            if ((48 <= kc && kc <= 57) || (65 <= kc && kc <= 90)) {
              return String.fromCharCode(kc).toLowerCase();
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
    qr: function(thread) {
      if (!(Conf['Quick Reply'] && QR.postingIsEnabled)) {
        return;
      }
      QR.open();
      if (thread != null) {
        QR.quote.call($('input', $('.post.highlight', thread) || thread));
      }
      QR.nodes.com.focus();
      if (Conf['QR Shortcut']) {
        return $.rmClass($('.qr-shortcut'), 'disabled');
      }
    },
    tags: function(tag, ta) {
      var range, selEnd, selStart, supported, value;
      supported = (function() {
        switch (tag) {
          case 'spoiler':
            return !!$('.postForm input[name=spoiler]');
          case 'code':
            return g.BOARD.ID === 'g';
          case 'math':
          case 'eqn':
            return g.BOARD.ID === 'sci';
        }
      })();
      if (!supported) {
        new Notice('warning', "[" + tag + "] tags are not supported on /" + g.BOARD + "/.", 20);
      }
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
        post = Get.postFromNode($('.post.highlight', thread) || $('.op', thread));
        return ImageExpand.toggle(post);
      }
    },
    open: function(thread, tab) {
      var url;
      if (g.VIEW !== 'index') {
        return;
      }
      url = "/" + thread.board + "/thread/" + thread;
      if (tab) {
        return $.open(url);
      } else {
        return location.href = url;
      }
    },
    hl: function(delta, thread) {
      var axis, height, next, postEl, replies, reply, root, _i, _len;
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
          if (!(next = $.x("" + axis + "-sibling::div[contains(@class,'replyContainer') and not(@hidden) and not(child::div[@class='stub'])][1]/child::div[contains(@class,'reply')]", root))) {
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
      for (_i = 0, _len = replies.length; _i < _len; _i++) {
        reply = replies[_i];
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
      var thread, threadRoot, _i, _len, _ref;
      _ref = $$('.thread');
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        threadRoot = _ref[_i];
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
      var axis, extra, next, thread, top, _ref;
      if ((_ref = d.activeElement) != null) {
        _ref.blur();
      }
      thread = Nav.getThread();
      axis = delta === +1 ? 'following' : 'preceding';
      if (next = $.x("" + axis + "-sibling::div[contains(@class,'thread') and not(@hidden)][1]", thread)) {
        top = Header.getTopOf(thread);
        if (delta === +1 && top < 5 || delta === -1 && top > -5) {
          thread = next;
        }
      }
      extra = Header.getTopOf(thread) + doc.clientHeight - d.body.getBoundingClientRect().bottom;
      if (extra > 0) {
        d.body.style.marginBottom = "" + extra + "px";
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
        return d.body.style.marginBottom = "" + extra + "px";
      } else {
        d.body.style.marginBottom = null;
        delete Nav.haveExtra;
        return $.off(d, 'scroll', Nav.removeExtra);
      }
    }
  };

  RelativeDates = {
    INTERVAL: $.MINUTE / 2,
    init: function() {
      var _ref;
      if (((_ref = g.VIEW) === 'index' || _ref === 'thread') && Conf['Relative Post Dates'] && !Conf['Relative Date Title'] || g.VIEW === 'index' && Conf['JSON Navigation'] && g.BOARD.ID !== 'f') {
        this.flush();
        $.on(d, 'visibilitychange ThreadUpdate', this.flush);
      }
      if (Conf['Relative Post Dates']) {
        return Post.callbacks.push({
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
    relative: function(diff, now, date) {
      var days, months, number, rounded, unit, years;
      unit = (number = diff / $.DAY) >= 1 ? (years = now.getYear() - date.getYear(), months = now.getMonth() - date.getMonth(), days = now.getDate() - date.getDate(), years > 1 ? (number = years - (months < 0 || months === 0 && days < 0), 'year') : years === 1 && (months > 0 || months === 0 && days >= 0) ? (number = years, 'year') : (months = months + 12 * years) > 1 ? (number = months - (days < 0), 'month') : months === 1 && days >= 0 ? (number = months, 'month') : 'day') : (number = diff / $.HOUR) >= 1 ? 'hour' : (number = diff / $.MINUTE) >= 1 ? 'minute' : (number = Math.max(0, diff) / $.SECOND, 'second');
      rounded = Math.round(number);
      if (rounded !== 1) {
        unit += 's';
      }
      return "" + rounded + " " + unit + " ago";
    },
    stale: [],
    flush: function() {
      var data, now, _i, _len, _ref;
      if (d.hidden) {
        return;
      }
      now = new Date();
      _ref = RelativeDates.stale;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        data = _ref[_i];
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
      var date, diff, isPost, relative, singlePost, _i, _len, _ref;
      isPost = data instanceof Post;
      date = isPost ? data.info.date : new Date(+data.dataset.utc);
      now || (now = new Date());
      diff = now - date;
      relative = RelativeDates.relative(diff, now, date);
      if (isPost) {
        _ref = [data].concat(data.clones);
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          singlePost = _ref[_i];
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
      if (__indexOf.call(RelativeDates.stale, data) >= 0) {
        return;
      }
      if (data instanceof Post && !g.posts[data.fullID]) {
        return;
      }
      return RelativeDates.stale.push(data);
    }
  };

  RemoveSpoilers = {
    init: function() {
      if (Conf['Reveal Spoilers']) {
        $.addClass(doc, 'reveal-spoilers');
      }
      if (!Conf['Remove Spoilers']) {
        return;
      }
      Post.callbacks.push({
        name: 'Reveal Spoilers',
        cb: this.node
      });
      CatalogThread.callbacks.push({
        name: 'Reveal Spoilers',
        cb: this.node
      });
      if (g.VIEW === 'archive') {
        return $.ready(function() {
          return RemoveSpoilers.unspoiler($.id('arc-list'));
        });
      }
    },
    node: function(post) {
      return RemoveSpoilers.unspoiler(this.nodes.comment);
    },
    unspoiler: function(el) {
      var span, spoiler, spoilers, _i, _len;
      spoilers = $$('s', el);
      for (_i = 0, _len = spoilers.length; _i < _len; _i++) {
        spoiler = spoilers[_i];
        span = $.el('span', {
          className: 'removed-spoiler'
        });
        $.replace(spoiler, span);
        $.add(span, __slice.call(spoiler.childNodes));
      }
    }
  };

  Time = {
    init: function() {
      var _ref;
      if (((_ref = g.VIEW) !== 'index' && _ref !== 'thread') || !Conf['Time Formatting']) {
        return;
      }
      return Post.callbacks.push({
        name: 'Time Formatting',
        cb: this.node
      });
    },
    node: function() {
      if (this.isClone) {
        return;
      }
      return this.nodes.date.textContent = Time.format(Conf['time'], this.info.date);
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
    zeroPad: function(n) {
      if (n < 10) {
        return "0" + n;
      } else {
        return n;
      }
    },
    formatters: {
      a: function() {
        return Time.day[this.getDay()].slice(0, 3);
      },
      A: function() {
        return Time.day[this.getDay()];
      },
      b: function() {
        return Time.month[this.getMonth()].slice(0, 3);
      },
      B: function() {
        return Time.month[this.getMonth()];
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
        if (this.getHours() < 12) {
          return 'AM';
        } else {
          return 'PM';
        }
      },
      P: function() {
        if (this.getHours() < 12) {
          return 'am';
        } else {
          return 'pm';
        }
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

  Settings = {
    init: function() {
      var link, settings;
      link = $.el('a', {
        className: 'settings-link fa fa-wrench',
        textContent: 'Settings',
        title: '4chan X Settings',
        href: 'javascript:;'
      });
      $.on(link, 'click', Settings.open);
      Header.addShortcut(link);
      Settings.addSection('Main', Settings.main);
      Settings.addSection('Filter', Settings.filter);
      Settings.addSection('Sauce', Settings.sauce);
      Settings.addSection('Advanced', Settings.advanced);
      Settings.addSection('Keybinds', Settings.keybinds);
      $.on(d, 'AddSettingsSection', Settings.addSection);
      $.on(d, 'OpenSettings', function(e) {
        return Settings.open(e.detail);
      });
      if (Conf['Disable Native Extension']) {
        settings = JSON.parse(localStorage.getItem('4chan-settings')) || {};
        if (settings.disableAll) {
          return;
        }
        settings.disableAll = true;
        return localStorage.setItem('4chan-settings', JSON.stringify(settings));
      }
    },
    open: function(openSection) {
      var dialog, link, links, overlay, section, sectionToOpen, _i, _len, _ref;
      if (Settings.dialog) {
        return;
      }
      $.event('CloseMenu');
      Settings.overlay = overlay = $.el('div', {
        id: 'overlay'
      });
      Settings.dialog = dialog = $.el('div', {
        id: 'fourchanx-settings',
        className: 'dialog'
      });
      $.extend(dialog, {
        innerHTML: "<nav><div class=sections-list></div><p class='imp-exp-result warning'></p><div class=credits><a class=export>Export</a>&nbsp|&nbsp<a class=import>Import</a>&nbsp|&nbsp<a class=reset>Reset Settings</a>&nbsp|&nbsp<input type=file hidden><a href='https://github.com/ccd0/4chan-x' target=_blank>4chan X</a>&nbsp|&nbsp<a href='https://github.com/ccd0/4chan-x/blob/master/CHANGELOG.md' target=_blank></a>&nbsp|&nbsp<a href='https://github.com/ccd0/4chan-x/issues' target=_blank>Issues</a>&nbsp|&nbsp<a href=javascript:; class='close fa fa-times' title=Close></a></div></nav><div class=section-container><section></section></div>"
      });
      $('a[href$="/CHANGELOG.md"]', dialog).textContent = g.VERSION;
      $.on($('.export', Settings.dialog), 'click', Settings["export"]);
      $.on($('.import', Settings.dialog), 'click', Settings["import"]);
      $.on($('.reset', Settings.dialog), 'click', Settings.reset);
      $.on($('input', Settings.dialog), 'change', Settings.onImport);
      links = [];
      _ref = Settings.sections;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        section = _ref[_i];
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
      (sectionToOpen ? sectionToOpen : links[0]).click();
      $.on($('.close', dialog), 'click', Settings.close);
      $.on(overlay, 'click', Settings.close);
      $.add(d.body, [overlay, dialog]);
      return $.event('OpenSettings', null, dialog);
    },
    close: function() {
      var _ref;
      if (!Settings.dialog) {
        return;
      }
      if ((_ref = d.activeElement) != null) {
        _ref.blur();
      }
      $.rm(Settings.overlay);
      $.rm(Settings.dialog);
      delete Settings.overlay;
      return delete Settings.dialog;
    },
    sections: [],
    addSection: function(title, open) {
      var hyphenatedTitle, _ref;
      if (typeof title !== 'string') {
        _ref = title.detail, title = _ref.title, open = _ref.open;
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
    main: function(section) {
      var arr, button, container, containers, description, div, fs, input, inputs, items, key, level, obj, _ref;
      items = {};
      inputs = {};
      _ref = Config.main;
      for (key in _ref) {
        obj = _ref[key];
        fs = $.el('fieldset', {
          innerHTML: "<legend>" + E(key) + "</legend>"
        });
        containers = [fs];
        for (key in obj) {
          arr = obj[key];
          description = arr[1];
          div = $.el('div');
          $.add(div, [
            UI.checkbox(key, key, false), $.el('span', {
              "class": 'description',
              textContent: ": " + description
            })
          ]);
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
          $.add(containers[level], div);
        }
        $.add(section, fs);
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
      }, function(_arg) {
        var ID, board, hiddenNum, hiddenPosts, hiddenThreads, thread, _ref1, _ref2;
        hiddenThreads = _arg.hiddenThreads, hiddenPosts = _arg.hiddenPosts;
        hiddenNum = 0;
        _ref1 = hiddenThreads.boards;
        for (ID in _ref1) {
          board = _ref1[ID];
          hiddenNum += Object.keys(board).length;
        }
        _ref2 = hiddenPosts.boards;
        for (ID in _ref2) {
          board = _ref2[ID];
          for (ID in board) {
            thread = board[ID];
            hiddenNum += Object.keys(thread).length;
          }
        }
        return button.textContent = "Hidden: " + hiddenNum;
      });
      $.on(button, 'click', function() {
        this.textContent = 'Hidden: 0';
        return $.get('hiddenThreads', {}, function(_arg) {
          var boardID, hiddenThreads;
          hiddenThreads = _arg.hiddenThreads;
          for (boardID in hiddenThreads.boards) {
            localStorage.removeItem("4chan-hide-t-" + boardID);
          }
          return $["delete"](['hiddenThreads', 'hiddenPosts']);
        });
      });
      return $.after($('input[name="Stubs"]', section).parentNode.parentNode, div);
    },
    "export": function() {
      return $.get(Conf, function(Conf) {
        delete Conf['archives'];
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
      return $('input', this.parentNode).click();
    },
    onImport: function() {
      var file, output, reader;
      if (!(file = this.files[0])) {
        return;
      }
      output = $('.imp-exp-result');
      if (!confirm('Your current settings will be entirely overwritten, are you sure?')) {
        output.textContent = 'Import aborted.';
        return;
      }
      reader = new FileReader();
      reader.onload = function(e) {
        var err;
        try {
          Settings.loadSettings(JSON.parse(e.target.result));
          if (confirm('Import successful. Reload now?')) {
            return window.location.reload();
          }
        } catch (_error) {
          err = _error;
          output.textContent = 'Import failed due to an error.';
          return c.error(err.stack);
        }
      };
      return reader.readAsText(file);
    },
    loadSettings: function(data) {
      var convertSettings, key, val, version, _ref;
      version = data.version.split('.');
      if (version[0] === '2') {
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
          'Disable 4chan\'s extension': '',
          'Remove Slug': '',
          'Check for Updates': '',
          'Recursive Filtering': 'Recursive Hiding',
          'Reply Hiding': 'Reply Hiding Buttons',
          'Thread Hiding': 'Thread Hiding Buttons',
          'Show Stubs': 'Stubs',
          'Image Auto-Gif': 'Replace GIF',
          'Reveal Spoilers': 'Reveal Spoiler Thumbnails',
          'Expand From Current': 'Expand from here',
          'Post in Title': 'Thread Excerpt',
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
        _ref = Config.hotkeys;
        for (key in _ref) {
          val = _ref[key];
          if (key in data.Conf) {
            data.Conf[key] = data.Conf[key].replace(/ctrl|alt|meta/g, function(s) {
              return "" + (s[0].toUpperCase()) + s.slice(1);
            }).replace(/(^|.+\+)[A-Z]$/g, function(s) {
              return "Shift+" + s.slice(0, -1) + (s.slice(-1).toLowerCase());
            });
          }
        }
        data.Conf['WatchedThreads'] = data.WatchedThreads;
      }
      if (data.Conf['WatchedThreads']) {
        data.Conf['watchedThreads'] = {
          boards: ThreadWatcher.convert(data.Conf['WatchedThreads'])
        };
        delete data.Conf['WatchedThreads'];
      }
      return $.clear(function() {
        return $.set(data.Conf);
      });
    },
    reset: function() {
      if (confirm('Your current settings will be entirely wiped, are you sure?')) {
        return $.clear(function() {
          if (confirm('Reset successful. Reload now?')) {
            return window.location.reload();
          }
        });
      }
    },
    filter: function(section) {
      var select;
      $.extend(section, {
        innerHTML: "<select name=filter><option value=guide>Guide</option><option value=name>Name</option><option value=uniqueID>Unique ID</option><option value=tripcode>Tripcode</option><option value=capcode>Capcode</option><option value=subject>Subject</option><option value=comment>Comment</option><option value=flag>Flag</option><option value=filename>Filename</option><option value=dimensions>Image dimensions</option><option value=filesize>Filesize</option><option value=MD5>Image MD5</option></select><div></div>"
      });
      select = $('select', section);
      $.on(select, 'change', Settings.selectFilter);
      return Settings.selectFilter.call(select);
    },
    selectFilter: function() {
      var div, name, ta;
      div = this.nextElementSibling;
      if ((name = this.value) !== 'guide') {
        $.rmAll(div);
        ta = $.el('textarea', {
          name: name,
          className: 'field',
          spellcheck: false
        });
        $.get(name, Conf[name], function(item) {
          return ta.value = item[name];
        });
        $.on(ta, 'change', $.cb.value);
        $.add(div, ta);
        return;
      }
      $.extend(div, {
        innerHTML: "<div class=warning><code>Filter</code> is disabled.</div><p>Use <a href=\"https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions\">regular expressions</a>, one per line.<br>Lines starting with a <code>#</code> will be ignored.<br>For example, <code>/weeaboo/i</code> will filter posts containing the string `<code>weeaboo</code>`, case-insensitive.<br>MD5 filtering uses exact string matching, not regular expressions.</p><ul>You can use these settings with each regular expression, separate them with semicolons:<li>Per boards, separate them with commas. It is global if not specified.<br>For example: <code>boards:a,jp;</code>.</li><li>Filter OPs only along with their threads (`only`), replies only (`no`), or both (`yes`, this is default).<br>For example: <code>op:only;</code>, <code>op:no;</code> or <code>op:yes;</code>.</li><li>Overrule the `Show Stubs` setting if specified: create a stub (`yes`) or not (`no`).<br>For example: <code>stub:yes;</code> or <code>stub:no;</code>.</li><li>Highlight instead of hiding. You can specify a class name to use with a userstyle.<br>For example: <code>highlight;</code> or <code>highlight:wallpaper;</code>.</li><li>Highlighted OPs will have their threads put on top of the board index by default.<br>For example: <code>top:yes;</code> or <code>top:no;</code>.</li></ul><p>Note: If you're using the native catalog rather than 4chan X's catalog, 4chan X's filters do not apply there.<br>The native catalog has its own separate filter list.</p>"
      });
      return $('.warning', div).hidden = Conf['Filter'];
    },
    sauce: function(section) {
      var ta;
      $.extend(section, {
        innerHTML: "<div class=\"warning\"><code>Sauce</code> is disabled.</div><div>Lines starting with a <code>#</code> will be ignored.</div><div>You can specify a display text by appending <code>;text:[text]</code> to the URL.</div><div>You can specify the applicable boards by appending <code>;boards:[board1],[board2]</code>.</div><div>You can specify the applicable file types by appending <code>;types:[extension1],[extension2]</code>.</div><ul>These parameters will be replaced by their corresponding values:<li><code>%TURL</code>: Thumbnail URL.</li><li><code>%URL</code>: Full image URL.</li><li><code>%MD5</code>: MD5 hash.</li><li><code>%name</code>: Original file name.</li><li><code>%board</code>: Current board.</li><li><code>%%</code>, <code>%semi</code>: Literal <code>%</code> and <code>;</code>.</li></ul><textarea name=\"sauces\" class=\"field\" spellcheck=\"false\"></textarea>"
      });
      $('.warning', section).hidden = Conf['Sauce'];
      ta = $('textarea', section);
      $.get('sauces', Conf['sauces'], function(item) {
        return ta.value = item['sauces'];
      });
      return $.on(ta, 'change', $.cb.value);
    },
    advanced: function(section) {
      var archBoards, boardID, boardOptions, boardSelect, boards, customCSS, event, files, i, input, inputs, interval, item, items, name, o, row, rows, software, ta, table, warning, withCredentials, _i, _j, _k, _l, _len, _len1, _len2, _len3, _len4, _len5, _len6, _m, _n, _o, _ref, _ref1, _ref2, _ref3, _ref4, _ref5, _ref6;
      $.extend(section, {
        innerHTML: "<fieldset><legend>Archiver</legend><div class=\"warning\" data-feature='404 Redirect'><code>404 Redirect</code> is disabled.</div><select id='archive-board-select'></select><table id='archive-table'><thead><th>Thread redirection</th><th>Post fetching</th><th>File redirection</th></thead><tbody></tbody></table></fieldset><fieldset><legend>Custom Board Navigation</span></legend><div><textarea name=boardnav class=field spellcheck=false></textarea></div><span class=note>New lines will be converted into spaces.</span><br><br><div class=note>In the following examples for /g/, <code>g</code> can be changed to a different board ID (<code>a</code>, <code>b</code>, etc...), the current board (<code>current</code>), or the Twitter link (<code>@</code>).</div><div>Board link: <code>g</code></div><div>Archive link: <code>g-archive</code></div><div>Internal archive link: <code>g-expired</code></div><div>Title link: <code>g-title</code></div><div>Board link (Replace with title when on that board): <code>g-replace</code></div><div>Full text link: <code>g-full</code></div><div>Custom text link: <code>g-text:\"Install Gentoo\"</code></div><div>Index-only link: <code>g-index</code></div><div>Catalog-only link: <code>g-catalog</code></div><div>External link: <code>external-text:\"Google\",\"http://www.google.com\"</code></div><div>Combinations are possible: <code>g-index-text:\"Technology Index\"</code></div><div>Full board list toggle: <code>toggle-all</code></div><br><div class=note><code>[ toggle-all ] [current-title] [g-title / a-title / jp-title] [x / wsg / h] [t-text:\"Piracy\"]</code><br>will give you<br><code>[ + ] [Technology] [Technology / Anime & Manga / Otaku Culture] [x / wsg / h] [Piracy]</code><br>if you are on /g/.</div></fieldset><fieldset><legend>Time Formatting <span class=warning data-feature='Time Formatting'>is disabled.</span></legend><div><input name=time class=field spellcheck=false>: <span class=time-preview></span></div><div>Supported <a href=//en.wikipedia.org/wiki/Date_%28Unix%29#Formatting>format specifiers</a>:</div><div>Day: <code>%a</code>, <code>%A</code>, <code>%d</code>, <code>%e</code></div><div>Month: <code>%m</code>, <code>%b</code>, <code>%B</code></div><div>Year: <code>%y</code>, <code>%Y</code></div><div>Hour: <code>%k</code>, <code>%H</code>, <code>%l</code>, <code>%I</code>, <code>%p</code>, <code>%P</code></div><div>Minute: <code>%M</code></div><div>Second: <code>%S</code></div><div>Literal <code>%</code>: <code>%%</code></div></fieldset><fieldset><legend>Quote Backlinks formatting <span class=warning data-feature='Quote Backlinks'>is disabled.</span></legend><div><input name=backlink class=field spellcheck=false>: <span class=backlink-preview></span></div></fieldset><fieldset><legend>File Info Formatting <span class=warning data-feature='File Info Formatting'>is disabled.</span></legend><div><input name=fileInfo class=field spellcheck=false>: <span class='file-info file-info-preview'></span></div><div>Link: <code>%l</code> (truncated), <code>%L</code> (untruncated), <code>%T</code> (Unix timestamp)</div><div>Original file name: <code>%n</code> (truncated), <code>%N</code> (untruncated), <code>%t</code> (Unix timestamp)</div><div>Spoiler indicator: <code>%p</code></div><div>Size: <code>%B</code> (Bytes), <code>%K</code> (KB), <code>%M</code> (MB), <code>%s</code> (4chan default)</div><div>Resolution: <code>%r</code> (Displays 'PDF' for PDF files)</div><div>Literal <code>%</code>: <code>%%</code></div></fieldset><fieldset><legend>Quick Reply Personas</legend><textarea class=\"personafield field\" name=\"QR.personas\" spellcheck=\"false\"></textarea><p>One item per line.<br>Items will be added in the relevant input's auto-completion list.<br>Password items will always be used, since there is no password input.<br>Lines starting with a <code>#</code> will be ignored.</p><ul>You can use these settings with each item, separate them with semicolons:<li>Possible items are: <code>name</code>, <code>options</code> (or equivalently <code>email</code>), <code>subject</code> and <code>password</code>.</li><li>Wrap values of items with quotes, like this: <code>options:\"sage\"</code>.</li><li>Force values as defaults with the <code>always</code> keyword, for example: <code>options:\"sage\";always</code>.</li><li>Select specific boards for an item, separated with commas, for example: <code>options:\"sage\";boards:jp;always</code>.</li></ul></fieldset><fieldset><legend>Unread Favicon <span class=warning data-feature='Unread Favicon'>is disabled.</span></legend><select name=favicon><option value=ferongr>ferongr</option><option value=xat->xat-</option><option value=4chanJS>4chanJS</option><option value=Mayhem>Mayhem</option><option value=Original>Original</option><option value=Metro>Metro</option></select><span class=favicon-preview><img src=\"data:image/gif;base64,R0lGODlhEAAQAPAAAAAAAAAAACH5BAEAAAAALAAAAAAQABAAAAIOhI%2Bpy%2B0Po5y02ouzPgUAOw%3D%3D\"><img src=\"data:image/gif;base64,R0lGODlhEAAQAPAAAAAAAAAAACH5BAEAAAAALAAAAAAQABAAAAIOhI%2Bpy%2B0Po5y02ouzPgUAOw%3D%3D\"><img src=\"data:image/gif;base64,R0lGODlhEAAQAPAAAAAAAAAAACH5BAEAAAAALAAAAAAQABAAAAIOhI%2Bpy%2B0Po5y02ouzPgUAOw%3D%3D\"><img src=\"data:image/gif;base64,R0lGODlhEAAQAPAAAAAAAAAAACH5BAEAAAAALAAAAAAQABAAAAIOhI%2Bpy%2B0Po5y02ouzPgUAOw%3D%3D\"></span></fieldset><fieldset><legend>Thread Updater <span class=warning data-feature='Thread Updater'>is disabled.</span></legend><div>Interval: <input type=\"number\" name=\"Interval\" class=\"field\" min=\"1\"> seconds</div></fieldset><fieldset><legend><label><input type=checkbox name='Custom CSS'> Custom CSS</label></legend><button id=apply-css>Apply CSS</button><textarea name=usercss class=field spellcheck=false></textarea></fieldset>"
      });
      _ref = $$('.warning', section);
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        warning = _ref[_i];
        warning.hidden = Conf[warning.dataset.feature];
      }
      items = {};
      inputs = {};
      _ref1 = ['boardnav', 'time', 'backlink', 'fileInfo', 'favicon', 'usercss'];
      for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
        name = _ref1[_j];
        input = $("[name=" + name + "]", section);
        items[name] = Conf[name];
        inputs[name] = input;
        event = name === 'favicon' || name === 'usercss' ? 'change' : 'input';
        $.on(input, event, $.cb.value);
      }
      ta = $('.personafield', section);
      $.get('QR.personas', Conf['QR.personas'], function(item) {
        return ta.value = item['QR.personas'];
      });
      $.on(ta, 'change', $.cb.value);
      $.get(items, function(items) {
        var key, val;
        for (key in items) {
          val = items[key];
          input = inputs[key];
          input.value = val;
          if (key === 'usercss') {
            continue;
          }
          $.on(input, event, Settings[key]);
          Settings[key].call(input);
        }
      });
      interval = $('input[name="Interval"]', section);
      customCSS = $('input[name="Custom CSS"]', section);
      interval.value = Conf['Interval'];
      customCSS.checked = Conf['Custom CSS'];
      inputs['usercss'].disabled = !Conf['Custom CSS'];
      $.on(interval, 'change', ThreadUpdater.cb.interval);
      $.on(customCSS, 'change', Settings.togglecss);
      $.on($('#apply-css', section), 'click', Settings.usercss);
      archBoards = {};
      _ref2 = Redirect.archives;
      for (_k = 0, _len2 = _ref2.length; _k < _len2; _k++) {
        _ref3 = _ref2[_k], name = _ref3.name, boards = _ref3.boards, files = _ref3.files, software = _ref3.software, withCredentials = _ref3.withCredentials;
        for (_l = 0, _len3 = boards.length; _l < _len3; _l++) {
          boardID = boards[_l];
          o = archBoards[boardID] || (archBoards[boardID] = {
            thread: [[], []],
            post: [[], []],
            file: [[], []]
          });
          i = +(!!withCredentials);
          o.thread[i].push(name);
          if (software === 'foolfuuka') {
            o.post[i].push(name);
          }
          if (__indexOf.call(files, boardID) >= 0) {
            o.file[i].push(name);
          }
        }
      }
      for (boardID in archBoards) {
        o = archBoards[boardID];
        _ref4 = ['thread', 'post', 'file'];
        for (_m = 0, _len4 = _ref4.length; _m < _len4; _m++) {
          item = _ref4[_m];
          i = o[item][0].length ? 1 : 0;
          o[item][i].push('disabled');
          o[item] = o[item][0].concat(o[item][1]);
        }
      }
      rows = [];
      boardOptions = [];
      _ref5 = Object.keys(archBoards).sort();
      for (_n = 0, _len5 = _ref5.length; _n < _len5; _n++) {
        boardID = _ref5[_n];
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
        _ref6 = ['thread', 'post', 'file'];
        for (_o = 0, _len6 = _ref6.length; _o < _len6; _o++) {
          item = _ref6[_o];
          $.add(row, Settings.addArchiveCell(boardID, o, item));
        }
        rows.push(row);
      }
      if (!(g.BOARD.ID in archBoards)) {
        rows[0].hidden = false;
      }
      $.add($('tbody', section), rows);
      boardSelect = $('#archive-board-select', section);
      $.add(boardSelect, boardOptions);
      table = $('#archive-table', section);
      $.on(boardSelect, 'change', function() {
        $('tbody > :not([hidden])', table).hidden = true;
        return $("tbody > ." + this.value, table).hidden = false;
      });
      $.get('selectedArchives', Conf['selectedArchives'], function(_arg) {
        var data, option, selectedArchives, type;
        selectedArchives = _arg.selectedArchives;
        for (boardID in selectedArchives) {
          data = selectedArchives[boardID];
          for (type in data) {
            name = data[type];
            if (option = $("select[data-boardid='" + boardID + "'][data-type='" + type + "'] > option[value='" + name + "']", section)) {
              option.selected = true;
            }
          }
        }
      });
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
          textContent: archive,
          value: archive
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
        return function(_arg) {
          var selectedArchives, _name;
          selectedArchives = _arg.selectedArchives;
          (selectedArchives[_name = _this.dataset.boardid] || (selectedArchives[_name] = {}))[_this.dataset.type] = _this.value;
          return $.set('selectedArchives', selectedArchives);
        };
      })(this));
    },
    boardnav: function() {
      return Header.generateBoardList(this.value);
    },
    time: function() {
      return this.nextElementSibling.textContent = Time.format(this.value, new Date());
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
          URL: '//i.4cdn.org/g/1334437723720.jpg',
          name: 'd9bb2efc98dd0df141a94399ff5880b7.jpg',
          size: '276 KB',
          sizeInBytes: 276 * 1024,
          dimensions: '1280x720',
          isImage: true,
          isSpoiler: true
        }
      };
      return FileInfo.format(this.value, data, this.nextElementSibling);
    },
    favicon: function() {
      var img;
      Favicon["switch"]();
      if (g.VIEW === 'thread' && Conf['Unread Favicon']) {
        Unread.update();
      }
      img = this.nextElementSibling.children;
      img[0].src = Favicon["default"];
      img[1].src = Favicon.unreadSFW;
      img[2].src = Favicon.unreadNSFW;
      return img[3].src = Favicon.unreadDead;
    },
    togglecss: function() {
      if ($('textarea[name=usercss]', $.x('ancestor::fieldset[1]', this)).disabled = !this.checked) {
        CustomCSS.rmStyle();
      } else {
        CustomCSS.addStyle();
      }
      return $.cb.checked.call(this);
    },
    usercss: function() {
      return CustomCSS.update();
    },
    keybinds: function(section) {
      var arr, input, inputs, items, key, tbody, tr, _ref;
      $.extend(section, {
        innerHTML: "<div class=warning><code>Keybinds</code> are disabled.</div><div>Allowed keys: <kbd>a-z</kbd>, <kbd>0-9</kbd>, <kbd>Ctrl</kbd>, <kbd>Shift</kbd>, <kbd>Alt</kbd>, <kbd>Meta</kbd>, <kbd>Enter</kbd>, <kbd>Esc</kbd>, <kbd>Up</kbd>, <kbd>Down</kbd>, <kbd>Right</kbd>, <kbd>Left</kbd>.</div><div>Press <kbd>Backspace</kbd> to disable a keybind.</div><table><tbody><tr><th>Actions</th><th>Keybinds</th></tr></tbody></table>"
      });
      $('.warning', section).hidden = Conf['Keybinds'];
      tbody = $('tbody', section);
      items = {};
      inputs = {};
      _ref = Config.hotkeys;
      for (key in _ref) {
        arr = _ref[key];
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

  Main = {
    init: function() {
      var db, flatten, pathname, _i, _len, _ref, _ref1;
      if (location.hostname === 'www.google.com') {
        return $.ready(function() {
          return Captcha.noscript.initFrame();
        });
      }
      g.threads = new SimpleDict;
      g.posts = new SimpleDict;
      pathname = location.pathname.split('/');
      g.BOARD = new Board(pathname[1]);
      if ((_ref = g.BOARD.ID) === 'z' || _ref === 'fk') {
        return;
      }
      g.VIEW = (function() {
        switch (pathname[2]) {
          case 'res':
          case 'thread':
            return 'thread';
          case 'catalog':
            return 'catalog';
          case 'archive':
            return 'archive';
          default:
            return 'index';
        }
      })();
      if (g.VIEW === 'thread') {
        g.THREADID = +pathname[3];
      }
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
      flatten(null, Config);
      _ref1 = DataBoard.keys;
      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
        db = _ref1[_i];
        Conf[db] = {
          boards: {}
        };
      }
      Conf['selectedArchives'] = {};
      $.get(Conf, function(items) {
        $.extend(Conf, items);
        return $.asap((function() {
          return doc = d.documentElement;
        }), Main.initFeatures);
      });
      return $.asap((function() {
        return doc = d.documentElement;
      }), function() {
        return $.onExists(doc, 'body', false, Main.initStyle);
      });
    },
    initFeatures: function() {
      var err, feature, name, pathname, _i, _len, _ref, _ref1;
      switch (location.hostname) {
        case 'a.4cdn.org':
          return;
        case 'sys.4chan.org':
          return;
        case 'i.4cdn.org':
          $.asap((function() {
            return d.readyState !== 'loading';
          }), function() {
            var URL, pathname, video, _ref;
            if (Conf['404 Redirect'] && ((_ref = d.title) === '4chan - Temporarily Offline' || _ref === '4chan - 404 Not Found')) {
              Redirect.init();
              pathname = location.pathname.split('/');
              URL = Redirect.to('file', {
                boardID: g.BOARD.ID,
                filename: pathname[pathname.length - 1]
              });
              return Redirect.navigate(URL);
            } else if (Conf['Loop in New Tab'] && (video = $('video'))) {
              video.loop = true;
              video.controls = false;
              video.play();
              return ImageCommon.addControls(video);
            }
          });
          return;
      }
      if (Conf['Normalize URL'] && g.VIEW === 'thread') {
        pathname = location.pathname.split('/');
        if (pathname[2] !== 'thread' || pathname.length > 4) {
          pathname[2] = 'thread';
          history.replaceState(null, '', pathname.slice(0, 4).join('/') + location.hash);
        }
      }
      _ref = Main.features;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        _ref1 = _ref[_i], name = _ref1[0], feature = _ref1[1];
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
      var _ref;
      if (!Main.isThisPageLegit() || $.hasClass(doc, 'fourchan-x')) {
        return;
      }
      if ((_ref = $('link[href*=mobile]', d.head)) != null) {
        _ref.disabled = true;
      }
      $.addClass(doc, 'fourchan-x', 'seaweedchan');
      $.addClass(doc, g.VIEW === 'thread' ? 'thread-view' : g.VIEW);
      $.addClass(doc, typeof chrome !== "undefined" && chrome !== null ? 'blink' : 'gecko');
      $.addStyle(Main.css, 'fourchanx-css');
      return Main.setClass();
    },
    setClass: function() {
      var mainStyleSheet, setStyle, style, styleSheets;
      if (g.VIEW === 'catalog') {
        $.addClass(doc, $.id('base-css').href.match(/catalog_(\w+)/)[1].replace('_new', '').replace(/_+/g, '-'));
        return;
      }
      style = 'yotsuba-b';
      mainStyleSheet = $('link[title=switch]', d.head);
      styleSheets = $$('link[rel="alternate stylesheet"]', d.head);
      setStyle = function() {
        var styleSheet, _i, _len;
        $.rmClass(doc, style);
        for (_i = 0, _len = styleSheets.length; _i < _len; _i++) {
          styleSheet = styleSheets[_i];
          if (styleSheet.href === mainStyleSheet.href) {
            style = styleSheet.title.toLowerCase().replace('new', '').trim().replace(/\s+/g, '-');
            break;
          }
        }
        return $.addClass(doc, style);
      };
      setStyle();
      if (!mainStyleSheet) {
        return;
      }
      return new MutationObserver(setStyle).observe(mainStyleSheet, {
        attributes: true,
        attributeFilter: ['href']
      });
    },
    initReady: function() {
      var GMver, err, href, i, passLink, styleSelector, v, _i, _len, _ref, _ref1;
      if ((_ref = d.title) === '4chan - Temporarily Offline' || _ref === '4chan - 404 Not Found') {
        if (Conf['404 Redirect'] && g.VIEW === 'thread') {
          href = Redirect.to('thread', {
            boardID: g.BOARD.ID,
            threadID: g.THREADID,
            postID: +location.hash.match(/\d+/)
          });
          Redirect.navigate(href, "/" + g.BOARD + "/");
        }
        return;
      }
      if (styleSelector = $.id('styleSelector')) {
        passLink = $.el('a', {
          textContent: '4chan Pass',
          href: 'javascript:;'
        });
        $.on(passLink, 'click', function() {
          return window.open('//sys.4chan.org/auth', 'This will steal your data.', 'left=0,top=0,width=500,height=255,toolbar=0,resizable=0');
        });
        $.before(styleSelector.previousSibling, [$.tn('['), passLink, $.tn(']\u00A0\u00A0')]);
      }
      if (!(Conf['JSON Navigation'] && g.VIEW === 'index')) {
        Main.initThread();
      } else {
        $.event('4chanXInitFinished');
      }
      $.get('previousversion', null, function(_arg) {
        var el, previousversion;
        previousversion = _arg.previousversion;
        if (previousversion === g.VERSION) {
          return;
        }
        if (previousversion) {
          el = $.el('span', {
            innerHTML: E(g.NAME) + " has been updated to <a href=\"" + E(g.CHANGELOG) + "\" target=\"_blank\">version " + E(g.VERSION) + "</a>."
          });
          new Notice('info', el, 15);
        } else {
          Settings.open();
        }
        return $.set('previousversion', g.VERSION);
      });
      if (!Conf['Show Support Message']) {
        return;
      }
      GMver = GM_info.version.split('.');
      _ref1 = "1.14".split('.');
      for (i = _i = 0, _len = _ref1.length; _i < _len; i = ++_i) {
        v = _ref1[i];
        if (v === GMver[i]) {
          continue;
        }
        (v < GMver[i]) || new Notice('warning', "Your version of Greasemonkey is outdated (v" + GM_info.version + " instead of v1.14 minimum) and 4chan X may not operate correctly.", 30);
        break;
      }
      try {
        return localStorage.getItem('4chan-settings');
      } catch (_error) {
        err = _error;
        return new Notice('warning', 'Cookies need to be enabled on 4chan for 4chan X to operate properly.', 30);
      }
    },
    initThread: function() {
      var board, err, errors, m, postRoot, posts, scriptData, thread, threadRoot, threads, _i, _j, _len, _len1, _ref, _ref1;
      if (board = $('.board')) {
        threads = [];
        posts = [];
        _ref = $$('.board > .thread', board);
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          threadRoot = _ref[_i];
          thread = new Thread(+threadRoot.id.slice(1), g.BOARD);
          threads.push(thread);
          _ref1 = $$('.thread > .postContainer', threadRoot);
          for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
            postRoot = _ref1[_j];
            try {
              posts.push(new Post(postRoot, thread, g.BOARD));
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
        if (errors) {
          Main.handleErrors(errors);
        }
        if (g.VIEW === 'thread') {
          scriptData = Get.scriptData();
          threads[0].postLimit = /\bbumplimit *= *1\b/.test(scriptData);
          threads[0].fileLimit = /\bimagelimit *= *1\b/.test(scriptData);
          threads[0].ipCount = (m = scriptData.match(/\bunique_ips *= *(\d+)\b/)) ? +m[1] : void 0;
        }
        Main.callbackNodes(Thread, threads);
        return Main.callbackNodesDB(Post, posts, function() {
          var post, _k, _len2;
          for (_k = 0, _len2 = posts.length; _k < _len2; _k++) {
            post = posts[_k];
            QuoteThreading.insert(post);
          }
          return $.event('4chanXInitFinished');
        });
      } else {
        return $.event('4chanXInitFinished');
      }
    },
    callbackNodes: function(klass, nodes) {
      var cb, i, node;
      i = 0;
      cb = klass.callbacks;
      while (node = nodes[i++]) {
        cb.execute(node);
      }
    },
    callbackNodesDB: function(klass, nodes, cb) {
      var cbs, fn, i, softTask;
      i = 0;
      cbs = klass.callbacks;
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
      var div, error, logs, _i, _len;
      if (!(errors instanceof Array)) {
        error = errors;
      } else if (errors.length === 1) {
        error = errors[0];
      }
      if (error) {
        new Notice('error', Main.parseError(error), 15);
        return;
      }
      div = $.el('div', {
        innerHTML: E(errors.length) + " errors occurred. [<a href=\"javascript:;\">show</a>]"
      });
      $.on(div.lastElementChild, 'click', function() {
        var _ref;
        return _ref = this.textContent === 'show' ? ['hide', false] : ['show', true], this.textContent = _ref[0], logs.hidden = _ref[1], _ref;
      });
      logs = $.el('div', {
        hidden: true
      });
      for (_i = 0, _len = errors.length; _i < _len; _i++) {
        error = errors[_i];
        $.add(logs, Main.parseError(error));
      }
      return new Notice('error', [div, logs], 30);
    },
    parseError: function(data) {
      var error, message;
      c.error(data.message, data.error.stack);
      message = $.el('div', {
        textContent: data.message
      });
      error = $.el('div', {
        textContent: "" + (data.error.name || 'Error') + ": " + (data.error.message || 'see console for details')
      });
      return [message, error];
    },
    isThisPageLegit: function() {
      var _ref;
      if (!('thisPageIsLegit' in Main)) {
        Main.thisPageIsLegit = location.hostname === 'boards.4chan.org' && !$('link[href*="favicon-status.ico"]', d.head) && ((_ref = d.title) !== '4chan - Temporarily Offline' && _ref !== '4chan - Error' && _ref !== '504 Gateway Time-out');
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
    css: "/*! * Font Awesome 4.0.3 * the iconic font designed for Bootstrap * ------------------------------------------------------------------------------ * The full suite of pictographic icons, examples, and documentation can be * found at http://fontawesome.io. Stay up to date on Twitter at * http://twitter.com/fontawesome. * * License * ------------------------------------------------------------------------------ * - The Font Awesome font is licensed under SIL OFL 1.1 - * http://scripts.sil.org/OFL * - Font Awesome CSS, LESS, and SASS files are licensed under MIT License - * http://opensource.org/licenses/mit-license.html * - Font Awesome documentation licensed under CC BY 3.0 - * http://creativecommons.org/licenses/by/3.0/ * - Attribution is no longer required in Font Awesome 3.0, but much appreciated: * \"Font Awesome by Dave Gandy - http://fontawesome.io\" * * Author - Dave Gandy * ------------------------------------------------------------------------------ * Email: dave@fontawesome.io * Twitter: http://twitter.com/davegandy * Work: Lead Product Designer @ Kyruus - http://kyruus.com */ @font-face{font-family:FontAwesome;src:url('data:application/font-woff;base64,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') format('woff');font-weight:400;font-style:normal}.fa::before{font-family:FontAwesome;font-weight:400;font-style:normal;-webkit-font-smoothing:antialiased;*margin-right:.3em;text-decoration:inherit;display:none;speak:none} .fa::before {display:inline-block;font-size:13px;visibility:visible} :root:not(.shortcut-icons) #shortcuts .fa::before {display:none} :root.shortcut-icons #shortcuts .fa::before{font-size:15px!important;margin-top:-3px!important;position:relative;top:1px} :root.shortcut-icons #shortcuts .fa, .menu-button .fa{font-size:0;visibility:hidden} :root.shortcut-icons .shortcut.brackets-wrap::after,:root.shortcut-icons .shortcut.brackets-wrap::before{display:none} :root.shortcut-icons #shortcuts a .fa, .menu-button .fa, .hide-reply-button .fa, .hide-thread-button .fa {display:inline} /* Update this line only */ .fa-glass:before{content:\"\\f000\"}.fa-music:before{content:\"\\f001\"}.fa-search:before{content:\"\\f002\"}.fa-envelope-o:before{content:\"\\f003\"}.fa-heart:before{content:\"\\f004\"}.fa-star:before{content:\"\\f005\"}.fa-star-o:before{content:\"\\f006\"}.fa-user:before{content:\"\\f007\"}.fa-film:before{content:\"\\f008\"}.fa-th-large:before{content:\"\\f009\"}.fa-th:before{content:\"\\f00a\"}.fa-th-list:before{content:\"\\f00b\"}.fa-check:before{content:\"\\f00c\"}.fa-times:before{content:\"\\f00d\"}.fa-search-plus:before{content:\"\\f00e\"}.fa-search-minus:before{content:\"\\f010\"}.fa-power-off:before{content:\"\\f011\"}.fa-signal:before{content:\"\\f012\"}.fa-gear:before,.fa-cog:before{content:\"\\f013\"}.fa-trash-o:before{content:\"\\f014\"}.fa-home:before{content:\"\\f015\"}.fa-file-o:before{content:\"\\f016\"}.fa-clock-o:before{content:\"\\f017\"}.fa-road:before{content:\"\\f018\"}.fa-download:before{content:\"\\f019\"}.fa-arrow-circle-o-down:before{content:\"\\f01a\"}.fa-arrow-circle-o-up:before{content:\"\\f01b\"}.fa-inbox:before{content:\"\\f01c\"}.fa-play-circle-o:before{content:\"\\f01d\"}.fa-rotate-right:before,.fa-repeat:before{content:\"\\f01e\"}.fa-refresh:before{content:\"\\f021\"}.fa-list-alt:before{content:\"\\f022\"}.fa-lock:before{content:\"\\f023\"}.fa-flag:before{content:\"\\f024\"}.fa-headphones:before{content:\"\\f025\"}.fa-volume-off:before{content:\"\\f026\"}.fa-volume-down:before{content:\"\\f027\"}.fa-volume-up:before{content:\"\\f028\"}.fa-qrcode:before{content:\"\\f029\"}.fa-barcode:before{content:\"\\f02a\"}.fa-tag:before{content:\"\\f02b\"}.fa-tags:before{content:\"\\f02c\"}.fa-book:before{content:\"\\f02d\"}.fa-bookmark:before{content:\"\\f02e\"}.fa-print:before{content:\"\\f02f\"}.fa-camera:before{content:\"\\f030\"}.fa-font:before{content:\"\\f031\"}.fa-bold:before{content:\"\\f032\"}.fa-italic:before{content:\"\\f033\"}.fa-text-height:before{content:\"\\f034\"}.fa-text-width:before{content:\"\\f035\"}.fa-align-left:before{content:\"\\f036\"}.fa-align-center:before{content:\"\\f037\"}.fa-align-right:before{content:\"\\f038\"}.fa-align-justify:before{content:\"\\f039\"}.fa-list:before{content:\"\\f03a\"}.fa-dedent:before,.fa-outdent:before{content:\"\\f03b\"}.fa-indent:before{content:\"\\f03c\"}.fa-video-camera:before{content:\"\\f03d\"}.fa-picture-o:before{content:\"\\f03e\"}.fa-pencil:before{content:\"\\f040\"}.fa-map-marker:before{content:\"\\f041\"}.fa-adjust:before{content:\"\\f042\"}.fa-tint:before{content:\"\\f043\"}.fa-edit:before,.fa-pencil-square-o:before{content:\"\\f044\"}.fa-share-square-o:before{content:\"\\f045\"}.fa-check-square-o:before{content:\"\\f046\"}.fa-arrows:before{content:\"\\f047\"}.fa-step-backward:before{content:\"\\f048\"}.fa-fast-backward:before{content:\"\\f049\"}.fa-backward:before{content:\"\\f04a\"}.fa-play:before{content:\"\\f04b\"}.fa-pause:before{content:\"\\f04c\"}.fa-stop:before{content:\"\\f04d\"}.fa-forward:before{content:\"\\f04e\"}.fa-fast-forward:before{content:\"\\f050\"}.fa-step-forward:before{content:\"\\f051\"}.fa-eject:before{content:\"\\f052\"}.fa-chevron-left:before{content:\"\\f053\"}.fa-chevron-right:before{content:\"\\f054\"}.fa-plus-circle:before{content:\"\\f055\"}.fa-minus-circle:before{content:\"\\f056\"}.fa-times-circle:before{content:\"\\f057\"}.fa-check-circle:before{content:\"\\f058\"}.fa-question-circle:before{content:\"\\f059\"}.fa-info-circle:before{content:\"\\f05a\"}.fa-crosshairs:before{content:\"\\f05b\"}.fa-times-circle-o:before{content:\"\\f05c\"}.fa-check-circle-o:before{content:\"\\f05d\"}.fa-ban:before{content:\"\\f05e\"}.fa-arrow-left:before{content:\"\\f060\"}.fa-arrow-right:before{content:\"\\f061\"}.fa-arrow-up:before{content:\"\\f062\"}.fa-arrow-down:before{content:\"\\f063\"}.fa-mail-forward:before,.fa-share:before{content:\"\\f064\"}.fa-expand:before{content:\"\\f065\"}.fa-compress:before{content:\"\\f066\"}.fa-plus:before{content:\"\\f067\"}.fa-minus:before{content:\"\\f068\"}.fa-asterisk:before{content:\"\\f069\"}.fa-exclamation-circle:before{content:\"\\f06a\"}.fa-gift:before{content:\"\\f06b\"}.fa-leaf:before{content:\"\\f06c\"}.fa-fire:before{content:\"\\f06d\"}.fa-eye:before{content:\"\\f06e\"}.fa-eye-slash:before{content:\"\\f070\"}.fa-warning:before,.fa-exclamation-triangle:before{content:\"\\f071\"}.fa-plane:before{content:\"\\f072\"}.fa-calendar:before{content:\"\\f073\"}.fa-random:before{content:\"\\f074\"}.fa-comment:before{content:\"\\f075\"}.fa-magnet:before{content:\"\\f076\"}.fa-chevron-up:before{content:\"\\f077\"}.fa-chevron-down:before{content:\"\\f078\"}.fa-retweet:before{content:\"\\f079\"}.fa-shopping-cart:before{content:\"\\f07a\"}.fa-folder:before{content:\"\\f07b\"}.fa-folder-open:before{content:\"\\f07c\"}.fa-arrows-v:before{content:\"\\f07d\"}.fa-arrows-h:before{content:\"\\f07e\"}.fa-bar-chart-o:before{content:\"\\f080\"}.fa-twitter-square:before{content:\"\\f081\"}.fa-facebook-square:before{content:\"\\f082\"}.fa-camera-retro:before{content:\"\\f083\"}.fa-key:before{content:\"\\f084\"}.fa-gears:before,.fa-cogs:before{content:\"\\f085\"}.fa-comments:before{content:\"\\f086\"}.fa-thumbs-o-up:before{content:\"\\f087\"}.fa-thumbs-o-down:before{content:\"\\f088\"}.fa-star-half:before{content:\"\\f089\"}.fa-heart-o:before{content:\"\\f08a\"}.fa-sign-out:before{content:\"\\f08b\"}.fa-linkedin-square:before{content:\"\\f08c\"}.fa-thumb-tack:before{content:\"\\f08d\"}.fa-external-link:before{content:\"\\f08e\"}.fa-sign-in:before{content:\"\\f090\"}.fa-trophy:before{content:\"\\f091\"}.fa-github-square:before{content:\"\\f092\"}.fa-upload:before{content:\"\\f093\"}.fa-lemon-o:before{content:\"\\f094\"}.fa-phone:before{content:\"\\f095\"}.fa-square-o:before{content:\"\\f096\"}.fa-bookmark-o:before{content:\"\\f097\"}.fa-phone-square:before{content:\"\\f098\"}.fa-twitter:before{content:\"\\f099\"}.fa-facebook:before{content:\"\\f09a\"}.fa-github:before{content:\"\\f09b\"}.fa-unlock:before{content:\"\\f09c\"}.fa-credit-card:before{content:\"\\f09d\"}.fa-rss:before{content:\"\\f09e\"}.fa-hdd-o:before{content:\"\\f0a0\"}.fa-bullhorn:before{content:\"\\f0a1\"}.fa-bell:before{content:\"\\f0f3\"}.fa-certificate:before{content:\"\\f0a3\"}.fa-hand-o-right:before{content:\"\\f0a4\"}.fa-hand-o-left:before{content:\"\\f0a5\"}.fa-hand-o-up:before{content:\"\\f0a6\"}.fa-hand-o-down:before{content:\"\\f0a7\"}.fa-arrow-circle-left:before{content:\"\\f0a8\"}.fa-arrow-circle-right:before{content:\"\\f0a9\"}.fa-arrow-circle-up:before{content:\"\\f0aa\"}.fa-arrow-circle-down:before{content:\"\\f0ab\"}.fa-globe:before{content:\"\\f0ac\"}.fa-wrench:before{content:\"\\f0ad\"}.fa-tasks:before{content:\"\\f0ae\"}.fa-filter:before{content:\"\\f0b0\"}.fa-briefcase:before{content:\"\\f0b1\"}.fa-arrows-alt:before{content:\"\\f0b2\"}.fa-group:before,.fa-users:before{content:\"\\f0c0\"}.fa-chain:before,.fa-link:before{content:\"\\f0c1\"}.fa-cloud:before{content:\"\\f0c2\"}.fa-flask:before{content:\"\\f0c3\"}.fa-cut:before,.fa-scissors:before{content:\"\\f0c4\"}.fa-copy:before,.fa-files-o:before{content:\"\\f0c5\"}.fa-paperclip:before{content:\"\\f0c6\"}.fa-save:before,.fa-floppy-o:before{content:\"\\f0c7\"}.fa-square:before{content:\"\\f0c8\"}.fa-bars:before{content:\"\\f0c9\"}.fa-list-ul:before{content:\"\\f0ca\"}.fa-list-ol:before{content:\"\\f0cb\"}.fa-strikethrough:before{content:\"\\f0cc\"}.fa-underline:before{content:\"\\f0cd\"}.fa-table:before{content:\"\\f0ce\"}.fa-magic:before{content:\"\\f0d0\"}.fa-truck:before{content:\"\\f0d1\"}.fa-pinterest:before{content:\"\\f0d2\"}.fa-pinterest-square:before{content:\"\\f0d3\"}.fa-google-plus-square:before{content:\"\\f0d4\"}.fa-google-plus:before{content:\"\\f0d5\"}.fa-money:before{content:\"\\f0d6\"}.fa-caret-down:before{content:\"\\f0d7\"}.fa-caret-up:before{content:\"\\f0d8\"}.fa-caret-left:before{content:\"\\f0d9\"}.fa-caret-right:before{content:\"\\f0da\"}.fa-columns:before{content:\"\\f0db\"}.fa-unsorted:before,.fa-sort:before{content:\"\\f0dc\"}.fa-sort-down:before,.fa-sort-asc:before{content:\"\\f0dd\"}.fa-sort-up:before,.fa-sort-desc:before{content:\"\\f0de\"}.fa-envelope:before{content:\"\\f0e0\"}.fa-linkedin:before{content:\"\\f0e1\"}.fa-rotate-left:before,.fa-undo:before{content:\"\\f0e2\"}.fa-legal:before,.fa-gavel:before{content:\"\\f0e3\"}.fa-dashboard:before,.fa-tachometer:before{content:\"\\f0e4\"}.fa-comment-o:before{content:\"\\f0e5\"}.fa-comments-o:before{content:\"\\f0e6\"}.fa-flash:before,.fa-bolt:before{content:\"\\f0e7\"}.fa-sitemap:before{content:\"\\f0e8\"}.fa-umbrella:before{content:\"\\f0e9\"}.fa-paste:before,.fa-clipboard:before{content:\"\\f0ea\"}.fa-lightbulb-o:before{content:\"\\f0eb\"}.fa-exchange:before{content:\"\\f0ec\"}.fa-cloud-download:before{content:\"\\f0ed\"}.fa-cloud-upload:before{content:\"\\f0ee\"}.fa-user-md:before{content:\"\\f0f0\"}.fa-stethoscope:before{content:\"\\f0f1\"}.fa-suitcase:before{content:\"\\f0f2\"}.fa-bell-o:before{content:\"\\f0a2\"}.fa-coffee:before{content:\"\\f0f4\"}.fa-cutlery:before{content:\"\\f0f5\"}.fa-file-text-o:before{content:\"\\f0f6\"}.fa-building-o:before{content:\"\\f0f7\"}.fa-hospital-o:before{content:\"\\f0f8\"}.fa-ambulance:before{content:\"\\f0f9\"}.fa-medkit:before{content:\"\\f0fa\"}.fa-fighter-jet:before{content:\"\\f0fb\"}.fa-beer:before{content:\"\\f0fc\"}.fa-h-square:before{content:\"\\f0fd\"}.fa-plus-square:before{content:\"\\f0fe\"}.fa-angle-double-left:before{content:\"\\f100\"}.fa-angle-double-right:before{content:\"\\f101\"}.fa-angle-double-up:before{content:\"\\f102\"}.fa-angle-double-down:before{content:\"\\f103\"}.fa-angle-left:before{content:\"\\f104\"}.fa-angle-right:before{content:\"\\f105\"}.fa-angle-up:before{content:\"\\f106\"}.fa-angle-down:before{content:\"\\f107\"}.fa-desktop:before{content:\"\\f108\"}.fa-laptop:before{content:\"\\f109\"}.fa-tablet:before{content:\"\\f10a\"}.fa-mobile-phone:before,.fa-mobile:before{content:\"\\f10b\"}.fa-circle-o:before{content:\"\\f10c\"}.fa-quote-left:before{content:\"\\f10d\"}.fa-quote-right:before{content:\"\\f10e\"}.fa-spinner:before{content:\"\\f110\"}.fa-circle:before{content:\"\\f111\"}.fa-mail-reply:before,.fa-reply:before{content:\"\\f112\"}.fa-github-alt:before{content:\"\\f113\"}.fa-folder-o:before{content:\"\\f114\"}.fa-folder-open-o:before{content:\"\\f115\"}.fa-smile-o:before{content:\"\\f118\"}.fa-frown-o:before{content:\"\\f119\"}.fa-meh-o:before{content:\"\\f11a\"}.fa-gamepad:before{content:\"\\f11b\"}.fa-keyboard-o:before{content:\"\\f11c\"}.fa-flag-o:before{content:\"\\f11d\"}.fa-flag-checkered:before{content:\"\\f11e\"}.fa-terminal:before{content:\"\\f120\"}.fa-code:before{content:\"\\f121\"}.fa-reply-all:before{content:\"\\f122\"}.fa-mail-reply-all:before{content:\"\\f122\"}.fa-star-half-empty:before,.fa-star-half-full:before,.fa-star-half-o:before{content:\"\\f123\"}.fa-location-arrow:before{content:\"\\f124\"}.fa-crop:before{content:\"\\f125\"}.fa-code-fork:before{content:\"\\f126\"}.fa-unlink:before,.fa-chain-broken:before{content:\"\\f127\"}.fa-question:before{content:\"\\f128\"}.fa-info:before{content:\"\\f129\"}.fa-exclamation:before{content:\"\\f12a\"}.fa-superscript:before{content:\"\\f12b\"}.fa-subscript:before{content:\"\\f12c\"}.fa-eraser:before{content:\"\\f12d\"}.fa-puzzle-piece:before{content:\"\\f12e\"}.fa-microphone:before{content:\"\\f130\"}.fa-microphone-slash:before{content:\"\\f131\"}.fa-shield:before{content:\"\\f132\"}.fa-calendar-o:before{content:\"\\f133\"}.fa-fire-extinguisher:before{content:\"\\f134\"}.fa-rocket:before{content:\"\\f135\"}.fa-maxcdn:before{content:\"\\f136\"}.fa-chevron-circle-left:before{content:\"\\f137\"}.fa-chevron-circle-right:before{content:\"\\f138\"}.fa-chevron-circle-up:before{content:\"\\f139\"}.fa-chevron-circle-down:before{content:\"\\f13a\"}.fa-html5:before{content:\"\\f13b\"}.fa-css3:before{content:\"\\f13c\"}.fa-anchor:before{content:\"\\f13d\"}.fa-unlock-alt:before{content:\"\\f13e\"}.fa-bullseye:before{content:\"\\f140\"}.fa-ellipsis-h:before{content:\"\\f141\"}.fa-ellipsis-v:before{content:\"\\f142\"}.fa-rss-square:before{content:\"\\f143\"}.fa-play-circle:before{content:\"\\f144\"}.fa-ticket:before{content:\"\\f145\"}.fa-minus-square:before{content:\"\\f146\"}.fa-minus-square-o:before{content:\"\\f147\"}.fa-level-up:before{content:\"\\f148\"}.fa-level-down:before{content:\"\\f149\"}.fa-check-square:before{content:\"\\f14a\"}.fa-pencil-square:before{content:\"\\f14b\"}.fa-external-link-square:before{content:\"\\f14c\"}.fa-share-square:before{content:\"\\f14d\"}.fa-compass:before{content:\"\\f14e\"}.fa-toggle-down:before,.fa-caret-square-o-down:before{content:\"\\f150\"}.fa-toggle-up:before,.fa-caret-square-o-up:before{content:\"\\f151\"}.fa-toggle-right:before,.fa-caret-square-o-right:before{content:\"\\f152\"}.fa-euro:before,.fa-eur:before{content:\"\\f153\"}.fa-gbp:before{content:\"\\f154\"}.fa-dollar:before,.fa-usd:before{content:\"\\f155\"}.fa-rupee:before,.fa-inr:before{content:\"\\f156\"}.fa-cny:before,.fa-rmb:before,.fa-yen:before,.fa-jpy:before{content:\"\\f157\"}.fa-ruble:before,.fa-rouble:before,.fa-rub:before{content:\"\\f158\"}.fa-won:before,.fa-krw:before{content:\"\\f159\"}.fa-bitcoin:before,.fa-btc:before{content:\"\\f15a\"}.fa-file:before{content:\"\\f15b\"}.fa-file-text:before{content:\"\\f15c\"}.fa-sort-alpha-asc:before{content:\"\\f15d\"}.fa-sort-alpha-desc:before{content:\"\\f15e\"}.fa-sort-amount-asc:before{content:\"\\f160\"}.fa-sort-amount-desc:before{content:\"\\f161\"}.fa-sort-numeric-asc:before{content:\"\\f162\"}.fa-sort-numeric-desc:before{content:\"\\f163\"}.fa-thumbs-up:before{content:\"\\f164\"}.fa-thumbs-down:before{content:\"\\f165\"}.fa-youtube-square:before{content:\"\\f166\"}.fa-youtube:before{content:\"\\f167\"}.fa-xing:before{content:\"\\f168\"}.fa-xing-square:before{content:\"\\f169\"}.fa-youtube-play:before{content:\"\\f16a\"}.fa-dropbox:before{content:\"\\f16b\"}.fa-stack-overflow:before{content:\"\\f16c\"}.fa-instagram:before{content:\"\\f16d\"}.fa-flickr:before{content:\"\\f16e\"}.fa-adn:before{content:\"\\f170\"}.fa-bitbucket:before{content:\"\\f171\"}.fa-bitbucket-square:before{content:\"\\f172\"}.fa-tumblr:before{content:\"\\f173\"}.fa-tumblr-square:before{content:\"\\f174\"}.fa-long-arrow-down:before{content:\"\\f175\"}.fa-long-arrow-up:before{content:\"\\f176\"}.fa-long-arrow-left:before{content:\"\\f177\"}.fa-long-arrow-right:before{content:\"\\f178\"}.fa-apple:before{content:\"\\f179\"}.fa-windows:before{content:\"\\f17a\"}.fa-android:before{content:\"\\f17b\"}.fa-linux:before{content:\"\\f17c\"}.fa-dribbble:before{content:\"\\f17d\"}.fa-skype:before{content:\"\\f17e\"}.fa-foursquare:before{content:\"\\f180\"}.fa-trello:before{content:\"\\f181\"}.fa-female:before{content:\"\\f182\"}.fa-male:before{content:\"\\f183\"}.fa-gittip:before{content:\"\\f184\"}.fa-sun-o:before{content:\"\\f185\"}.fa-moon-o:before{content:\"\\f186\"}.fa-archive:before{content:\"\\f187\"}.fa-bug:before{content:\"\\f188\"}.fa-vk:before{content:\"\\f189\"}.fa-weibo:before{content:\"\\f18a\"}.fa-renren:before{content:\"\\f18b\"}.fa-pagelines:before{content:\"\\f18c\"}.fa-stack-exchange:before{content:\"\\f18d\"}.fa-arrow-circle-o-right:before{content:\"\\f18e\"}.fa-arrow-circle-o-left:before{content:\"\\f190\"}.fa-toggle-left:before,.fa-caret-square-o-left:before{content:\"\\f191\"}.fa-dot-circle-o:before{content:\"\\f192\"}.fa-wheelchair:before{content:\"\\f193\"}.fa-vimeo-square:before{content:\"\\f194\"}.fa-turkish-lira:before,.fa-try:before{content:\"\\f195\"}.fa-plus-square-o:before{content:\"\\f196\"} /* */ .fa-spin::before{-webkit-animation:spin 2s infinite linear;-moz-animation:spin 2s infinite linear;-o-animation:spin 2s infinite linear;animation:spin 2s infinite linear}@-moz-keyframes spin{0%{-moz-transform:rotate(0deg)}100%{-moz-transform:rotate(359deg)}}@-webkit-keyframes spin{0%{-webkit-transform:rotate(0deg)}100%{-webkit-transform:rotate(359deg)}}@keyframes spin{0%{transform:rotate(0deg)}100%{transform:rotate(359deg)}}\n/* General */ .dialog { border: 1px solid; display: block; } .dialog:not(#qr):not(#thread-watcher):not(#header-bar) { box-shadow: 0 1px 2px rgba(0, 0, 0, .15); } #qr, #thread-watcher { box-shadow: -1px 2px 2px rgba(0, 0, 0, 0.25); } .captcha-img, .field { background-color: #FFF; border: 1px solid #CCC; -moz-box-sizing: border-box; box-sizing: border-box; color: #333; font: 13px sans-serif; outline: none; transition: color .25s, border-color .25s; transition: color .25s, border-color .25s; } .field::-moz-placeholder, .field:hover::-moz-placeholder { color: #AAA !important; font-size: 13px !important; opacity: 1.0 !important; } .captch-img:hover, .field:hover { border-color: #999; } .field:hover, .field:focus { color: #000; } .field[disabled] { background-color: #F2F2F2; color: #888; } .field::-webkit-search-decoration { display: none; } .move { cursor: move; overflow: hidden; } label, .watch-thread-link { cursor: pointer; } a[href=\"javascript:;\"] { text-decoration: none; } .warning { color: red; } #boardNavDesktop, #boardNavMobile { display: none !important; } :root.hide-bottom-board-list #boardNavDesktopFoot { display: none; } body.hasDropDownNav{ margin-top: 5px; } a { outline: none !important; } .painted { border-radius: 3px; padding: 0px 2px; } .ad-plea { display: none; } /* 4chan style fixes */ .opContainer, .op { display: block !important; overflow: visible !important; } .reply > .file > .fileText { margin: 0 20px; } .hashlink::before { content: ' '; visibility: hidden; } .inline + .hashlink, [hidden] { display: none !important; } hr + div.center:not(.ad-cnt):not(.topad):not(.middlead):not(.bottomad) { display: none !important; } .page-num { margin-right: -8px; } .fileText a { unicode-bidi: -moz-isolate; unicode-bidi: -webkit-isolate; } .thread > img:first-child { /* party hats */ pointer-events: none; } marquee, .postMessage marquee + br, .postMessage marquee + br + br { display: none; } /* Anti-autoplay */ audio.controls-added { display: block; margin: auto; } :root.anti-autoplay div.embed { position: static; width: auto; height: auto; text-align: center; } /* fixed, z-index */ #overlay, #fourchanx-settings, #qp, #ihover, #navlinks, .fixed #header-bar, :root.float #updater, :root.float #thread-stats, #qr { position: fixed; } #fourchanx-settings { z-index: 999; } #overlay { z-index: 900; } #qp, #ihover { z-index: 60; } #menu, .gal-buttons { z-index: 50; } #updater, #thread-stats { z-index: 40; } :root.fixed #header-bar, #notifications { z-index: 35; } #a-gallery { z-index: 30; } #navlinks { z-index: 25; } #qr { z-index: 20; } #embedding { z-index: 11; } #thread-watcher { z-index: 10; } /* Header */ .fixed.top-header body { padding-top: 2em; } .fixed.bottom-header body { padding-bottom: 2em; } .fixed #header-bar { right: 0; left: 0; padding: 3px 4px 4px; } .fixed.top-header #header-bar { top: 0; } .fixed.bottom-header #header-bar { bottom: 0; } #header-bar { border-width: 0; transition: all .1s .05s ease-in-out; } :root.fixed #header-bar { box-shadow: -5px 1px 10px rgba(0, 0, 0, 0.20); } #header-bar #custom-board-list .current { padding: 1px 1px 4px 1px; } :root.centered-links #shortcuts { width: 300px; text-align: right; } :root.centered-links #header-bar { text-align: center; } #custom-board-list { font-size: 13px; vertical-align: middle; } #full-board-list { vertical-align: middle; } :root.centered-links #custom-board-list { position: relative; left: 150px; } .fixed.top-header #header-bar { border-bottom-width: 1px; } .fixed.bottom-header #header-bar { box-shadow: 0 -1px 2px rgba(0, 0, 0, .15); border-top-width: 1px; } .fixed.bottom-header #header-bar .menu-button i { border-top: none; border-bottom: 6px solid; } .fixed #header-bar.autohide:not(:hover) { box-shadow: none; transition: all .8s .6s cubic-bezier(.55, .055, .675, .19); } .fixed.top-header #header-bar.autohide:not(:hover) { margin-bottom: -1em; -webkit-transform: translateY(-100%); transform: translateY(-100%); } .fixed.bottom-header #header-bar.autohide:not(:hover) { -webkit-transform: translateY(100%); transform: translateY(100%); } #scroll-marker { left: 0; right: 0; height: 10px; position: absolute; } :root:not(.autohide) #scroll-marker { pointer-events: none; } #header-bar #scroll-marker { display: none; } .fixed #header-bar #scroll-marker { display: block; } .fixed.top-header #header-bar #scroll-marker { top: 100%; } .fixed.bottom-header #header-bar #scroll-marker { bottom: 100%; } #header-bar a:not(.entry):not(.close) { text-decoration: none; padding: 1px; } #shortcuts:empty { display: none; } .brackets-wrap::before { content: \"\\00a0[\"; } .brackets-wrap::after { content: \"]\\00a0\"; } .dead-thread, .disabled:not(.replies-quoting-you) { opacity: .45; } #shortcuts { float: right; } .shortcut { margin-left: 3px; vertical-align: middle; } #navbotright, #navtopright { display: none; } #toggleMsgBtn { display: none !important; } .current { font-weight: bold; } :root.fixed.bottom-header #jsMath_button { bottom: auto; top: 1px; } /* 4chan X link brackets */ .brackets-wrap::before { content: \"[\"; } .brackets-wrap::after { content: \"]\"; } /* Notifications */ #notifications { position: fixed; top: 0; height: 0; text-align: center; right: 0; left: 0; visibility: visible; } :root.fixed.top-header:not(.gallery-open) #header-bar #notifications, :root.fixed.top-header #header-bar.autohide #notifications { position: absolute; top: 100%; } .notification { color: #FFF; font-weight: 700; text-shadow: 0 1px 2px rgba(0, 0, 0, .5); box-shadow: 0 1px 2px rgba(0, 0, 0, .15); border-radius: 2px; margin: 1px auto; width: 500px; max-width: 100%; position: relative; transition: all .25s ease-in-out; } .notification.error { background-color: hsla(0, 100%, 38%, .9); } .notification.warning { background-color: hsla(36, 100%, 38%, .9); } .notification.info { background-color: hsla(200, 100%, 38%, .9); } .notification.success { background-color: hsla(104, 100%, 38%, .9); } .notification a { color: white; } .notification > .close { padding: 7px; top: 0px; right: 5px; position: absolute; } .notification > .fa-times::before { font-size: 11px !important; } .message { -moz-box-sizing: border-box; box-sizing: border-box; padding: 6px 20px; max-height: 200px; width: 100%; overflow: auto; } /* Settings */ :root.fourchan-x body { -moz-box-sizing: border-box; box-sizing: border-box; } #overlay { background-color: rgba(0, 0, 0, .5); top: 0; left: 0; height: 100%; width: 100%; } #fourchanx-settings { -moz-box-sizing: border-box; box-sizing: border-box; box-shadow: 0 0 15px rgba(0, 0, 0, .15); height: 600px; max-height: 100%; width: 900px; max-width: 100%; margin: auto; padding: 3px; top: 50%; left: 50%; -moz-transform: translate(-50%, -50%); -webkit-transform: translate(-50%, -50%); transform: translate(-50%, -50%); } #fourchanx-settings > nav { padding: 2px 2px 0; height: 15px; } #fourchanx-settings > nav a { text-decoration: underline; } #fourchanx-settings > nav a.close { text-decoration: none; padding: 0 2px; margin: 0; } .section-container { overflow: auto; position: absolute; top: 2.1em; right: 5px; bottom: 5px; left: 5px; padding-right: 5px; } .sections-list { padding: 0 3px; float: left; } .credits { float: right; } .tab-selected { font-weight: 700; } .section-sauce ul, .section-advanced ul { list-style: none; margin: 0; } .section-sauce ul { padding: 8px; } .section-advanced ul { padding: 0px; } .section-sauce li, .section-advanced li { padding-left: 4px; } .section-main label { text-decoration: underline; } div[data-checked=\"false\"] > .suboption-list { display: none; } .suboption-list { position: relative; } .suboption-list::before { content: \"\"; display: inline-block; position: absolute; left: .7em; width: 0; height: 100%; border-left: 1px solid; } .suboption-list > div { position: relative; padding-left: 1.4em; } .suboption-list > div::before { content: \"\"; display: inline-block; position: absolute; left: .7em; width: .7em; height: .6em; border-left: 1px solid; border-bottom: 1px solid; } .section-filter ul { padding: 0; } .section-filter li { margin: 10px 40px; list-style: disc; } .section-filter textarea { height: 500px; } .section-sauce textarea { height: 350px; } .section-advanced .field[name=\"boardnav\"] { width: 100%; } .section-advanced textarea { height: 150px; } .section-advanced .archive-cell { min-width: 160px; text-align: center; } .section-advanced #archive-board-select { position: absolute; } .section-advanced .note { font-size: 0.8em; font-style: italic; margin-left: 10px; } .section-advanced .note code { font-style: normal; font-size: 11px; } .section-keybinds .field { font-family: monospace; } #fourchanx-settings fieldset { border: 1px solid; border-radius: 3px; padding: 0.35em 0.625em 0.75em; margin: 0px 2px; } #fourchanx-settings legend { font-weight: 700; color: inherit; } #fourchanx-settings textarea { font-family: monospace; min-width: 100%; max-width: 100%; } #fourchanx-settings code { color: #000; background-color: #FFF; padding: 0 2px; } #fourchanx-settings th { text-align: center; font-weight: bold; } #fourchanx-settings p { margin: 1em 0px; } .unscroll { overflow: hidden; } /* Index */ :root.index-loading .navLinks, :root.index-loading .board, :root.index-loading .pagelist, :root.infinite-mode .pagelist, :root.all-pages-mode .pagelist, :root.catalog-mode .pagelist, :root:not(.catalog-mode) #hidden-label, :root:not(.catalog-mode) #index-size { display: none; } #index-search { padding-right: 1.5em; width: 100px; transition: color .25s, border-color .25s, width .25s; } #index-search:focus, #index-search[data-searching] { width: 200px; } #index-search-clear { color: gray; display: inline-block; position: relative; left: -1em; width: 0; }  #index-search:not([data-searching]) + #index-search-clear { display: none; } #index-mode, #index-sort, #index-size { float: right; } .summary { text-decoration: none; } /* Catalog */ :root.catalog-mode .board { text-align: center; } .catalog-thread { display: -webkit-inline-flex; display: inline-flex; text-align: left; -webkit-flex-direction: column; flex-direction: column; -webkit-align-items: center; align-items: center; margin: 0 2px 5px; word-wrap: break-word; vertical-align: top; } .catalog-thread > a { flex-shrink: 0; -webkit-flex-shrink: 0; position: relative; } .catalog-small .catalog-thread { width: 165px; max-height: 320px; } .catalog-large .catalog-thread { width: 270px; max-height: 410px; } .catalog-thumb { border-radius: 2px; box-shadow: 0 0 5px rgba(0, 0, 0, .25); } .catalog-thumb.spoiler-file { width: 100px; height: 100px; } .catalog-thumb.deleted-file { width: 127px; height: 13px; padding: 20px 11px; } .catalog-thumb.no-file { width: 77px; height: 13px; padding: 20px 36px; } .catalog-icons > img, .catalog-stats > .menu-button { width: 1em; height: 1em; margin: 0; vertical-align: text-top; padding-left: 2px; } .catalog-stats > .menu-button { text-align: center; font-weight: normal; } .catalog-stats > .menu-button > i::before { line-height: 11px; } .catalog-stats { -webkit-flex-shrink: 0; flex-shrink: 0; cursor: help; font-size: 10px; font-weight: 700; margin-top: 2px; } .catalog-thread > .subject { -webkit-flex-shrink: 0; flex-shrink: 0; -webkit-align-self: stretch; align-self: stretch; font-weight: 700; line-height: 1; text-align: center; } .catalog-thread > .comment { -webkit-flex-shrink: 1; flex-shrink: 1; -webkit-align-self: stretch; align-self: stretch; overflow: hidden; text-align: center; } /* /tg/ dice rolls */ .catalog-thread > .comment > b { font-weight: normal; } .catalog-code { background-color: #FFF; display: inline-block; max-width: 100%; } /* Announcement Hiding */ :root.hide-announcement #globalMessage { display: none; } span.hide-announcement { font-size: 11px; position: relative; bottom: 5px; } .globalMessage, h2, h3 { color: inherit !important; font-size: 13px; font-weight: 100; } /* Unread */ #unread-line { margin: 0; border-color: rgb(255,0,0); } /* Thread Updater */ #updater { background: none; border: none; box-shadow: none; } #updater > .move { position: absolute; left: 0; top: -5px; width: 100%; height: 5px; } #updater > div:last-child { text-align: center; } #updater input[type=\"number\"] { width: 4em; } :root.float #updater { padding: 0px 3px; } .new { color: limegreen; } #update-status.new { margin-right: 5px; } #update-timer { cursor: pointer; } /* Thread Watcher */ #thread-watcher { position: absolute; } #thread-watcher { padding-bottom: 3px; padding-left: 3px; overflow: hidden; white-space: nowrap; min-width: 146px; max-height: 92%; overflow-y: auto; } #thread-watcher .refresh { padding: 0px 3px; } :root.fixed-watcher #thread-watcher { position: fixed; } :root:not(.fixed-watcher) #thread-watcher:not(:hover) { max-height: 210px; overflow-y: hidden; } #thread-watcher > .move { padding-top: 3px; } #watched-threads > div { padding-left: 3px; padding-right: 3px; } #watched-threads .watcher-link { max-width: 250px; display: -webkit-inline-flex; display: inline-flex; -webkit-flex-direction: row; flex-direction: row; } #watched-threads .watcher-unread { -webkit-flex: 0 0 auto; flex: 0 0 auto; } #watched-threads .watcher-unread::after { content: \"\\00a0\"; } #watched-threads .watcher-title { overflow: hidden; text-overflow: ellipsis; -webkit-flex: 0 1 auto; flex: 0 1 auto; } #thread-watcher a { text-decoration: none; } #thread-watcher .move > .close { position: absolute; right: 0px; top: 0px; padding: 0px 4px; } .watch-thread-link { padding-top: 18px; width: 18px; height: 0px; display: inline-block; background-repeat: no-repeat; opacity: 0.2; position: relative; top: 1px; } .watch-thread-link.watched { opacity: 1; } /* Thread Stats */ #thread-stats { background: none; border: none; box-shadow: none; } :root.float #thread-stats > .move > span { pointer-events: none; } :root.float #thread-stats { padding: 0px 3px; } /* Quote */ .catalog-thread > .comment > span.quote, #arc-list span.quote { color: #789922; } :root:not(.catalog-mode) .deadlink { text-decoration: none !important; } .backlink.deadlink:not(.forwardlink), .quotelink.deadlink:not(.forwardlink) { text-decoration: underline !important; } .inlined { opacity: .5; } #qp input, .forwarded { display: none; } .quotelink.forwardlink, .backlink.forwardlink { text-decoration: none; border-bottom: 1px dashed; } @supports (text-decoration-style: dashed) or (-moz-text-decoration-style: dashed) { .quotelink.forwardlink, .backlink.forwardlink { text-decoration: underline; -moz-text-decoration-style: dashed; text-decoration-style: dashed; border-bottom: none; } } .filtered { text-decoration: underline line-through; } :root.hide-backlinks .backlink.filtered, :root.hide-backlinks .backlink.filtered + .hashlink.filtered { display: none; } .inline { border: 1px solid; display: table; margin: 2px 0; } .inline .post { border: 0 !important; background-color: transparent !important; display: table !important; margin: 0 !important; padding: 1px 2px !important; } #qp > .opContainer::after { content: ''; clear: both; display: table; } #qp .post { border: none; margin: 0; padding: 2px 2px 5px; } #qp img { max-height: 80vh; max-width: 50vw; } .qphl { outline: 2px solid rgba(216, 94, 49, .7); } :root.highlight-own .yourPost > .reply, :root.highlight-you .quotesYou > .reply { border-left: 2px solid rgba(221,0,0,.5); } /* Quote Threading */ .threadContainer { margin-left: 20px; border-left: 1px solid rgba(128,128,128,.3); } .threadOP { clear: both; } /* File */ .fnswitch:hover > .fntrunc, .fnswitch:not(:hover) > .fnfull, .expanded-image > .post > .file > .fileThumb > video[data-md5], .expanded-image > .post > .file > .fileThumb > img[data-md5] { display: none; } .full-image { display: none; } .expanded-image > .post > .file > .fileThumb > .full-image { display: inline; } .expanded-image { clear: left; } .expanding { opacity: .5; } :root.fit-height .full-image { max-height: 100vh; } :root.fit-width .full-image { max-width: 100%; } :root.gecko.fit-width .full-image { width: 100%; } .fileThumb > .warning { clear: both; } /* Fappe Tyme */ :root.fappeTyme .thread > .noFile, :root.fappeTyme .threadContainer > .noFile { display: none; } /* Werk Tyme */ :root.werkTyme .postContainer:not(.noFile) .fileThumb, :root.werkTyme .catalog-thumb:not(.deleted-file):not(.no-file), :root:not(.werkTyme) .werkTyme-filename { display: none; } .werkTyme-filename { font-weight: bold; } :root.werkTyme .catalog-thread > a { text-align: center; -webkit-align-self: stretch; align-self: stretch; } .catalog-thread.watched .werkTyme-filename, .filter-highlight .werkTyme-filename { border: 2px solid rgba(255, 0, 0, .5); } /* Index/Reply Navigation */ #navlinks { font-size: 16px; top: 25px; right: 10px; } :root.catalog-mode #navlinks { display: none; } /* Filter */ .opContainer.filter-highlight { box-shadow: inset 5px 0 rgba(255, 0, 0, .5); } .filter-highlight > .reply { box-shadow: -5px 0 rgba(255, 0, 0, .5); } .catalog-thread.watched .catalog-thumb, .filter-highlight .catalog-thumb { border: 2px solid rgba(255, 0, 0, .5); } /* Spoiler text */ :root.reveal-spoilers s, :root.reveal-spoilers s > a { color: white !important; } :root.reveal-spoilers .removed-spoiler::before { content: \"[spoiler]\"; } :root.reveal-spoilers .removed-spoiler::after { content: \"[/spoiler]\"; } /* Thread & Reply Hiding */ .hide-thread-button, .hide-reply-button { float: left; margin-right: 4px; padding: 2px; } .hide-thread-button:not(:hover), .hide-reply-button:not(:hover) { opacity: 0.4; } .threadContainer .hide-reply-button { margin-left: 2px !important; position: relative; left: 1px; } .hide-thread-button { margin-top: -1px; } .stub ~ * { display: none !important; } .stub input { display: inline-block; } .thread[hidden] + hr { display: none; } :root.reply-hide div.sideArrows { display: none; } /* QR */ :root.hide-original-post-form #togglePostFormLink, #qr.autohide:not(.focus):not(:hover):not(:active) > form, :root.thread-view #qr:not(.show-new-thread-option) select[data-name=\"thread\"], #file-n-submit:not(.has-file) #qr-filerm { display: none; } :root.hide-original-post-form #postForm { display: none !important; } #qr select, #dump-button, #url-button, .remove, .captcha-img { cursor: pointer; } #qr { position: fixed; padding: 1px; border: 1px solid transparent; min-width: 300px; border-radius: 3px 3px 0 0; } #qrtab { border-radius: 3px 3px 0 0; } #qrtab { margin-bottom: 1px; } #qr .close { float: right; padding: 0 3px; } #qr .warning { min-height: 1.6em; vertical-align: middle; padding: 0 1px; border-width: 1px; border-style: solid; } .qr-link-container { text-align: center; } .qr-link-container-bottom { width: 200px; position: absolute; left: -100px; margin-left: 50%; text-align: center; } .qr-link { border-radius: 3px; padding: 6px 10px 5px; font-weight: bold; vertical-align: middle; border-style: solid; border-width: 1px; font-size: 10pt; } .persona { width: 100%; display: -webkit-flex; display: flex; -webkit-flex-direction: row; flex-direction: row; } #dump-button { width: 10%; margin: 0; margin-right: 4px; font: 13px sans-serif; padding: 1px 0px 2px; opacity: 0.6; } #url-button { width: 10%; margin: 0; margin-right: 4px; font: 13px sans-serif; padding: 1px 0px 2px; opacity: 0.6; } .persona .field { -webkit-flex: 1; flex: 1; width: 0; } #qr.forced-anon input[data-name=\"name\"]:not(.force-show), #qr.forced-anon input[data-name=\"sub\"]:not(.force-show), #qr.reply-to-thread input[data-name=\"sub\"]:not(.force-show) { display: none; } #qr textarea.field { height: 14.8em; min-height: 9em; } #qr.has-captcha textarea.field { height: 9em; } input.field.tripped:not(:hover):not(:focus) { color: transparent !important; text-shadow: none !important; } #qr textarea { resize: both; } /* Noscript Recaptcha */ .captcha-img { margin: 0px; text-align: center; background-image: #fff; font-size: 0px; min-height: 59px; min-width: 302px; } .captcha-input{ width: 100%; margin: 1px 0 0; } .captcha-input.error:focus { border-color: rgb(255,0,0) !important; } #qr-captcha-iframe { display: none; } /* Recaptcha v2 */ #qr .captcha-root { position: relative; } #qr .captcha-container > div > div { margin: auto; } #qr .captcha-counter { display: block; width: 100%; text-align: center; pointer-events: none; } #qr.captcha-open .captcha-counter { position: absolute; bottom: 3px; } #qr .captcha-counter > a { pointer-events: auto; } #qr:not(.captcha-open) .captcha-counter > a { display: block; width: 100%; } .field { -moz-box-sizing: border-box; margin: 0px; padding: 2px 4px 3px; } #qr textarea { min-width: 100%; } #qr [type=\"submit\"] { width: 25%; vertical-align: top; } :root.webkit #qr [type=\"submit\"] { height: 24px; } #qr label input[type=\"checkbox\"] { position: relative; top: 2px; } /* Fake File Input */ input#qr-filename { border: none !important; width: 80%; padding: 0px 4px; position: relative; bottom: 1px; background: none !important; } input#qr-filename:not(.edit) { pointer-events: none; } #qr-filename, #qr-filesize, .has-file #qr-no-file { display: none; } #qr-no-file, .has-file #qr-filename, .has-file #qr-filesize { display: inline-block; margin: 0 0 2px; overflow: hidden; text-overflow: ellipsis; vertical-align: top; } #qr-no-file { color: #AAA; padding: 1px 4px; } #qr-filename-container { -moz-box-sizing: border-box; display: inline-block; position: relative; width: 100px; min-width: 74.6%; max-width: 74.6%; margin-right: 0.4%; margin-top: 1px; overflow: hidden; padding: 2px 1px 0; height: 22px; } #qr-filename-container:hover { cursor: text; } #qr-extras-container { position: absolute; right: 0px; } #qr-filerm { margin-right: 3px; z-index: 2; } #file-n-submit { height: 23px; } #qr input[type=\"file\"] { visibility: hidden; position: absolute; } /* Thread Select / Spoiler Label */ #qr select[data-name=\"thread\"] { float: right; } #qr.has-spoiler .has-file #qr-spoiler-label { width: 6.7%; min-width: 6.7%; max-width: 6.7%; display: inline-block; text-align: center; vertical-align: top; } #qr.has-spoiler #file-n-submit:not(.has-file) #qr-spoiler-label { display: none; } #qr.has-spoiler .has-file #qr-filename-container { max-width: 67.9%; min-width: 67.9%; } #qr-spoiler-label input { position: relative; top: 3px; } /* Dumping UI */ .dump #dump-list-container { display: block; } #dump-list-container { display: none; position: relative; overflow-y: hidden; margin-top: 1px; } #dump-list { overflow-x: auto; overflow-y: hidden; white-space: nowrap; width: 248px; max-width: 100%; min-width: 100%; } #dump-list:hover { overflow-x: auto; } .qr-preview { -moz-box-sizing: border-box; counter-increment: thumbnails; cursor: move; display: inline-block; height: 90px; width: 90px; padding: 2px; opacity: .5; overflow: hidden; position: relative; text-shadow: 0 0 2px #000; -moz-transition: opacity .25s ease-in-out; vertical-align: top; background-size: cover; } .qr-preview:hover, .qr-preview:focus { opacity: .9; } .qr-preview::before { content: counter(thumbnails); color: #fff; position: absolute; top: 3px; right: 3px; text-shadow: 0 0 3px #000, 0 0 8px #000; } .qr-preview#selected { opacity: 1; } .qr-preview.drag { box-shadow: 0 0 10px rgba(0,0,0,.5); } .qr-preview.over { border-color: #fff; } .qr-preview > span { color: #fff; } .remove { background: none; color: #e00; padding: 1px; } a:only-of-type > .remove { display: none; } .remove:hover::after { content: \" Remove\"; } .qr-preview > label { background: rgba(0,0,0,.5); color: #fff; right: 0; bottom: 0; left: 0; position: absolute; text-align: center; } .qr-preview > label > input { margin: 0; } #add-post { cursor: pointer; font-size: 2em; position: absolute; top: 50%; right: 10px; -moz-transform: translateY(-50%); } .textarea { position: relative; } :root.webkit .textarea { margin-bottom: -2px; } #char-count { color: #000; background: hsla(0, 0%, 100%, .5); font-size: 8pt; position: absolute; bottom: 1px; right: 1px; pointer-events: none; } /* Menu */ .menu-button:not(.fa-bars) { display: inline-block; position: relative; cursor: pointer; } #header-bar .menu-button i { border-top: 6px solid; border-right: 4px solid transparent; border-left: 4px solid transparent; display: inline-block; margin: 2px; vertical-align: middle; } .reply .menu-button, .op .menu-button, #thread-watcher .menu-button { margin-left: -1px !important; width: 20px; height: 15px; text-align: center; } .menu-button + .container:not(:empty) { margin-left: -5px; } #menu { position: fixed; outline: none; } #menu, .submenu { border-radius: 3px; padding-top: 1px; padding-bottom: 3px; } .entry { cursor: pointer; display: block; outline: none; padding: 2px 10px; position: relative; text-decoration: none; white-space: nowrap; min-width: 70px; text-align: left; text-shadow: none; } .left>.entry.has-submenu { padding-right: 17px !important; } .entry input[type=\"checkbox\"], .entry input[type=\"radio\"] { margin: 0px; position: relative; top: 2px; } .has-submenu::after { content: \"\"; border-left: .5em solid; border-top: .3em solid transparent; border-bottom: .3em solid transparent; display: inline-block; margin: .3em; position: absolute; right: 3px; } .left .has-submenu::after { border-left: 0; border-right: .5em solid; } .submenu { display: none; position: absolute; left: 100%; top: -1px; margin-left: 0px; margin-top: -2px; } .focused > .submenu { display: block; } .imp-exp-result { position: absolute; text-align: center; margin: auto; right: 0px; left: 0px; width: 200px; } .export, .import, .reset { cursor: pointer; text-decoration: none !important; } /* Custom Board Titles */ .boardTitle[contenteditable=\"true\"], .boardSubtitle[contenteditable=\"true\"] { cursor: text !important; } div.boardTitle { font-weight: 400 !important; } /* Link Title Favicons */ .linkify.YouTube { background: transparent url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAMCAYAAABr5z2BAAABIklEQVQoz53LvUrDUBjG8bOoOammSf1IoBSvoCB4JeIqOHgBLt6AIMRBBQelWurQ2kERnMRBsBUcIp5FJSBI5oQsJVkkUHh8W0o5nhaFHvjBgef/Mq+Q46RJBMkI/vE+aOus956tnEswIZe1LV0QyJ5sE2GzgZfVMtRNIdiDpccEssdlB1mW4bvTwdvWJtRdErM7U+8S/FJykCRJX5qm+KpVce8UMNLRLbulz4iSjTAMh6Iowsd5BeNadp3nUF0VlxAEwZBotXC0Usa4ll3meZdA1iguwvf9vpvDA2wvmKgYGtSud8suDB4TyGr2PF49D/vra9jRZ1BVdknMzgwuCGSnZEObwu6sBnVTCHZiaC7BhFx2PKdxUidiAH/4lLo9Mv0DELVs9qsOHXwAAAAASUVORK5CYII=') center left no-repeat!important; padding-left: 18px; } .linkify.Vimeo { background: transparent url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAYFBMVEUAAAAIdZUKh6sLlLkLmr4LmsAMp88NrdYVW3MZj7Acstkrt9s1e5E7vN5EfI9JvdtKwuBijp5kpbl30eiDt8aG1uqRr7qTyNehxM+k4PCy3enB3OTg6Ovv9PXw+fz////L9U5WAAAAAXRSTlMAQObYZgAAAIFJREFUeNplz90OwiAMBWAQpAoyxclkP3je/y0H2AQXz0WT8100rRD6kNI9/cRroemQL3hXhoujZYj4OHoAmBvYGcBISwbWBvfXCrytnIDUQMkbsBpagMA7zhtQdyTFQAmIG7IkYniiZuh3XGsPqoOZkMOJOpAcLqUzNFGGu/57fwc1hgtp0mVSyQAAAABJRU5ErkJggg==') center left no-repeat!important; padding-left: 18px; } .linkify.SoundCloud { background: transparent url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABsklEQVQ4y5WTy2pUQRCGv2rbzDjJeAlIBmOyipGIIJqFEBDElwh4yULGeRFXPoEIBl/AvQ/gC2RnxCAoxijiwks852S6+3dxzslcHJCpTXVX11/Xv0097gLPgVNMJxnQNfX4zsqleWbnpoMf/oa9d988MM9MC/rp+E0a+A0dsVobMNMCOO8B6McRoABJI+A6gJmN3D2A8jgEBCEkSEMBrcrsDAzDWWn3AjgKFaDMmgRqniGFgsaDp1jrLOngDf1XT1D+A1dFc4MKAkkiCVKjjVu7g9+4Rzx4i1u6hjXbuMWr0O5QPNvCu7IaCZwEKQukLGDrm5x8uI0tr6MkiGlkiv7yLfzN+6S5i6QsIMABkEfcxhbWWYMkVAOjxvYAjc3HNHrbKI9VBQBFwF25XQKSBjqIf1YBuAurEMrczgDygD6/x2LCpFLXLUyQ+PoldphhBhYfIX09XU1+Flaukz7uYqs3SHs7cG4BmTsmkBUF9mmXEwa28BNLPaQPLepuNcbGSWQquQC2/Kdcox1FUGkcB0ykck1nA2+wTzMs8stGnP4rbWGw74EuS/GFQWfK7/wF6P4F7fzIAYkdmdEAAAAASUVORK5CYII=') center left no-repeat!important; padding-left: 18px; } .linkify.audio { background: transparent url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAadEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41LjEwMPRyoQAAAitJREFUOE9jYCAWKJWwavr0KyXWb/FIbDtUFFyzJx6nVofE2Xo5nXsj0rqPNSR0nVkR2Hjmgmfd+U9Otdf+m5Vf/6+SfeU/R9ChVVgNYDRtlfJuuPA/rPfe/4QpD/6nznj0P27Kw/9unff/69Xf+69c/+C/SO7N/0z+OAxgMmmRCe++/r9i3ev/KWvf/vdY8PK/bt/9/wrNV3/IN5y/IVt1YqNg4pGTTP4HsbuA2bhZ2qvpyn+xjIObxAp3VwqlrgngLFyryVy5nhPmZJHANS2cwYexG8BmVC/pWn3hP4NZlzWuQDJI3dIiFnUUuwEsQAOcq87jNcC7fHeLUtJxHF4AGmBWeAavAWH1+1rUUk7giAWjOknllON4DXAs2NEiG4/DBQxAF/CFHfrPYI4jDFSLuJVjNrUJhB/B7gIGo1pJRt99GAZYJK7wLJ1z7Xzl4vu/7aqv/GRBj0bjqAX2qb0nJ7mXH17C4HcUxQA+hymWtSue/C5a9up/9Ozn/7Vr7v1nRY7GqMb91T3b3v6vWvPmf/S0p/9ZQk+DDLCBRSOz06Jqk+o7/21nvfqvsebDf7kZL/5zBaxphkezd+OFn7HzXvz3Wvjmv9a8N//5Ek//ZTBpVYUrMG2X5wjcdl68+uI/wa5Lr3hSNjczGFeywOVZ/bbcVGp//F9izfv/Ql03f3P4LC/HSEQquYwMFnUCDJ7dzBhyjGZNQpye89M5gpfnMvtNUyE2h4PUAQBovvT7lyNljwAAAABJRU5ErkJggg==') center left no-repeat!important; padding-left: 18px; } .linkify.LiveLeak { background: transparent url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAadEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41LjEwMPRyoQAAAlNJREFUGBkFwU2LVmUYAODrPu8Z5x1xSpRBXQyFoLsBE+wfiO5atJOgnf9DUPwFgtGinUgEaQsRhHYuMtpEiEWuG5iNjuOcj+c8z911xXcXL/68c3Dw1fzhg0QgEQAAEYGUKXFie9vxlSs/xk/rdavjGEkmkWSih65z4osv9GfOiK6LzEyZ2uGh4dUrmzs72ddlUUhkoiMr4PT167589Mh6c1N0nSRlqrX67dat+PDyZXRT19m5edPnt28rGFHxMcJ6d9fprS1/37tneP3aemPD1uamUydPOru3p5DdGOH0tWsu3LhhxIQJM2qEpRT/Pn3q/du3AhARSmvGTH0lplKMrVkiYpVpQaJlighzhDkzhmEA0fcWoqAfyaFW4zTlgCABxlrNmY4ylUzLsiREprFWc0T2M+ZSjKWY0AEaltZUjJixZJIpuk5pTWlNP2BYFvOyKJkCAKU1tTXHrZlqVWolUxdhxsfVSj9FmJfFMM9GdICGGa01HyMstYpMIFPJVNDPmYZSTOPoOEKHzNRlKpmWWh1j6TpLa2SKTKVWU6Z+Qolwdm/P9QcPZKa2LH69e9eIMs+WCL/cv2/98CGZPrt61am+V9APq1X89eyZ/968obVYaiXT4dGREgG+vnPHeHgYMsH2+fP+efEihtVKv7SWw/6+9/v7KYLMhIywTJPamvOXLomukyRsrNf+ePzYkpl9dJ3SWgSCSCQCfz5/7pMLF2yfO6eLiAQcHRz4/cmT+HR7O+Ob3d0fNt69+7a2BiICQCJbA0EgE5lpvbXl1OXL3/8Pfax4+6SjSukAAAAASUVORK5CYII=') center left no-repeat!important; padding-left: 18px; } .linkify.Vocaroo { background: transparent url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAadEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41LjEwMPRyoQAAAw9JREFUOE9jYMABuMwYmCyTJKUCGlSnFSy02TTzeOyCiQcDViX26qVz2TAyYtWmEMwuoZ3M7V40LcB79pHkc0svpvzY8jD//87nxf+3Pyn8v/ZO8v+VNyP/2mZJumI1QCWSI8232Hjumitlfw5+qPp/9l8TCt76JP//xkdx/wsXWCzjtWFkwTCkbWFe9plPk/+ga4Txz/xt/D/hkN//gMXif21a+NbyWjIwoRiy6GDT5rP/mlFsPfyp5n/NpOj/22+0gMUXXIz/H7hC/L/bFKFbPDZMrHAD5H35OPt2J9zacDv/f3V7xv9FhwrBGubsT/1//Pjx/1GJ/mD+/nfl/1v3Ovy3KRJNQbHdOlXCvOO03/+pm1P/v3v37n90hhtYw9HPtf8Xb2v937cmHswHeWPRxYj/LvkK3igGKARwicTO07118H3V/5kbi/4vPZMJtK3s/6YH2f+Pfq1B8VbjWrdnMu5s4nAD9CNFhKwz5DTUvLl419zKvAcLtG1P84BRl/b/5M/6/6f/NPzf/qzo84yj0Uus0xUU4Zor54bm9+4OfZG02OCuoAMTb9ZkC9ull1Nvrr2Z+XvRpaRfc65H/68F+jl9svEhzyLFWoccWVc+eyTHq/twydjlKRln7jX9bNMkMJnbhoFRL1xCqmKx6/yi2fYXa/c5/e846PV/5fW0/7OPx/yfcjzop34ulxdGGvDuU8mMXaX507lBuiN6ueadmQeT/p/93vf/1O+G//sP5fw/eL3o/5JLif8zVxs+Tlir9S26UyeFQQvJGBE7FvaFZ9LfN+1y+WjbItSb3GmXvXd15v8zroH/HxgE/D+aGPx/18vi/z07PeZNPRKxe/Kh0Ae8toxscCO4zBkYXArk9C1SxJUYjBkYPPIVtbbuTftz3cz//2O9wP/75iSAXdO72/dt2HL5F6YlfBW4MiJYXMiBiW3t7azHBx+V/t89N+H/8a+1//e9K/9attDp5LQjYX8SuvVL8RoAkmxa65299Erq1FnHo0qrl7t4BddriIs4MrM3rfWcFd+pGwVSAwBZ0bKP8yrZPAAAAABJRU5ErkJggg==') center left no-repeat!important; padding-left: 18px; } .linkify.pastebin { background: transparent url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAB1FBMVEUAAAAAAAAAAABWYWwAAABbY3BbYm5dZnFdZXJeZnMEBAQHCAhYYGpdZnFdZnBgaHIlJyomKCooKi09QkdESU5eZGtdYmhdYmleY2lrcXdqb3Rqb3Rqb3SSmJ+SlJeWmJutr7GtrrCWm6ChpKhbW1tmZmZvb290dHR3d3d4eHh5eXl6enp8fHx+gIJ/f3+CgoKDg4OEhISFhYWHh4eKioqKjI2Li4uMjIyOjo6Pj4+QkJCRkZGSkpKUlJSVl5mWlpaYmZqZm52ampqbm5ucnJydnZ2enp6fn5+hoaGioqKkpKSkpaalpaWmp6mmp6qnqauoqKioqquoqq2qqqqrrK2srKysra6srrCsrrGurq6vr6+wsLCxsbGysrKztLa0tLS1t7m2tra3t7e4uLi5ubm6urq7u7u8vLy9vb2+vr7AwMDAwsTBwcHExcfFxcXFxsnGxsbHx8fIyMjJycnMzMzNzc3Ozs7O0NLPz8/Q0NDR0dHR09XT09PV1dXV1dbV1tfV19rW1tbX19fX19jY2tzZ2dnZ2tva2tra3N3a3N7c3Nze3t7f39/f4OHg4ODi4uLl5+jm5ubs7Ozs7e3u7u7v7+/v8PDw8PDx8fHy8vLz8/P29vYSoLMZAAAAJHRSTlMABAUGCwsNHCAiLzMzMzZEYGJwgIuOnJycnqmqq9bc3+/w8fkZ0N/uAAAA/klEQVQoU2NgYGDl5YMDdgYGBmZZ3964CYFtIR3e9Q7K/AwMHI55KfaFmcHWMy3K3MwlGRg4wz0zdYpcorRbNbL0LaWAAp3ts2umV8wo6MupTauQBgqUG03VL7W3sfZSb1erAgm02M+yzYrVCXUy6zapAQlUx/dEdyX3J3ZHVUYVywAF8o2rDNN1Go2jzGLMokAC2QbuSc42mXmaOXop9iAtCXrJ5qXWjT59Abl2ESJAAX/tSIMMiyrrqQ3T6uS5gQK6kSqpqkUermGTexQFmYACflqR+hlWZSamzQpCLEDPsSmVVDT1TJw0JUhOAMRnYOARFRMTE5cQF+ZiBPIAII5B3EVG0b4AAAAASUVORK5CYII=') center left no-repeat!important; padding-left: 18px; } .linkify.gist { background: transparent url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAABblBMVEXc3NykpKTW1tbb29ugoKCdnZ0AAAACAgIEDRcKCgoMDAwODg4QIzYRDAoTExMUDwwVAg0WICsaEw8aGhoiCBklGxUmERwwKCQ7LSU7Ozs8LSZFLyNINi1JNyxJNy1KSklMOi5VR1FXV1daQTRkZGRseYZwU0F4eHh7dnR8bWV/YE6IdGiKcGCKkJaNgYeNjY2RdGOScWCUcWCZmZmhoaGkpKSoqKirfmaurq6xsbG1tbW6urq+vr7AbmzBb23CwsLGxsbHx8fHyMjJycnJysrMzMzOiYbPi4fQ0NDRoYbT09PU1NTW1tbY2NjZqIzZ2dnb29vd3d3f39/i4uLktZrk5OTl5eXm5ubn5+fo6Ojq6urs7OzttKLu7u7wuqbw8PDx8fHz8/P4+Pj5+fn7uZj8vpz9ya79ybD/tZf/upr/wZ//w6H/xKH/xaL/xrH/yqj/y7T/zqv/z7D/07D/17n/2Lv/2Lz/3L//38n/4Mk3Q/ZuAAAABnRSTlMSFcbGzc5MNKFvAAAA1klEQVQoz2NgYPZHAswMDEwRSclwkBTBxOARn4gE4j0YXBOiJNUDg7y8Ar1UlOITXBkcY73Z2Li42dg42dn4wmIdGeyjQ7nZoEA4PNqewSZKlw0O9KJsGKwjBdl4ZeWkJGQUhNjEIq0ZrMI5+D0ri7Jz8itCRAXCrRgsQ3mUy+xicrPSbfO0REItGSyCVaVL3ONSU9LcCtQUgy0YzIJ85M1LizMzCsv9xF2CzBhMAwN99TV1DI0MtDWcAgNNGUycA5CAswkDi5kDwrMOZiwMjKzGSICVEQDhZj0UQV7PewAAAABJRU5ErkJggg==') center left no-repeat!important; padding-left: 18px; } .linkify.image { background: transparent url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAadEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41LjEwMPRyoQAAAs5JREFUOE+lk/tvi1EYx98/xT8gW4REIpGFMEQWl2FiM9ZMZhm2xRAyOsmujFFmdFRHu0tWm87UypxStr69zPauN5e5rHVp3IYhbOvHy+wHEQlxkm+ek+d8nm9OznkeSfrfldmgJC7QyUlTymsJTfuTZ25z4HdWYwyLreYhtpgekGPw0+kKvo1Eo+IXRSIiEhkWZuc9tqnsJD9EqTUopCxjSGTpB0iueczSo1HyW8cpsExQ1DbxI2pt45j9cXpexul4FEd79RnZphAa/SD7WvuFtO6UItbU9LC+YQxNI2w0wwYT5LRAdhOU3oBTIXC9gXP3oUSGgz2vST3gYHejR0jptT1C332f8yrUEYHrz8CgxDnpm6DKCUfc0KnmXa/AEVPPwnDcD0cvetA2uYRk67Ive/lpjO7YBO1PPuF8Df3vwf4cbNE4tqdw7YVq8HYyHx6FvhE1hkMEg8HDUqvFkjT4aIjMqkqyqkswDSrcfBfH+Q561YLAZ/B+BLda6FXlU/cPv0AoEPhuoP1h4Av7Wbh9E/Py15NWWUjeSR3nZDfeN+N0DY9hG/7K1eGP3P0S5/EYRFUF/IOTBrUXHPm9fT6mr1xEwupkZqxbzLyiDJYUZ5NSnkdqdSHpxyrYdFpPgdmAsdfJwPMI/Yr65bf7tZLGGBQ7DNdJWFtIYvoOZmbuZE7OXpIKKli86zAr9p9gTVktWTVnKTI2U95uRWe3U2IJUDbVB5p6hVm5x5m9Vc/cnedZUNzC8lILaQesZBy6hEZ3maKzgvJWFzVWD9XtXvVGQbSWASFtMATVRlJIKbOTWtlJXaeXepuPM1f6MNp9GLt8mLvvYLmp0OhQ2Fwvk6m7xaqDTvY0eYWUVtcnllXfYlGpnfklVuraHHg8HjxuN+6fktUHlWWZPaZeUo/ILK0UKttBcbNbSB9GP0yLxWJJUxoZGUn80zD9C/vXQ/4NHY10h3M1zmQAAAAASUVORK5CYII=') center left no-repeat!important; padding-left: 18px; } .linkify.InstallGentoo { background: transparent url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAABcVBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB3dIYAAAAAAAAAAAAbGh4BBAcCBgoBBgoCBwsCCQ/QzucCCA7MyuXZ1eUBBQmTh8fo5/i9svIAAADh3vQAAAACCA0CCQ8CCQ4DDBQbGCUDChDr6vgAAAAAAAAREBIDCxK6tdfe2fTv7/cDCxIDDBQEDRUHDhgMJjXk4PZdXWdLUFoUNEYOKDgSMUMRLUBneI4eTGj08/QmW3onW3rTzvfOx/giU3IiVHMkWHdEaYJobHv3+PokWHpua6TNy9xZgZ+1quz8/foQKj0XPFInWn0nW38tZ4o6fqg8gq48grA9hrU/i7pAhrNAiLdBjLtEjr1FksNIjr5Il8pImMtKWnNqhL97odKFqti5q/q5rPq60+nCt/vLw/vPx/jV0vHY0/rc1/rg2/vh3fzn4fzu6/vx8vf19Pv19Pz49/v5+Pv8/Pv8/fr9/vv+/frziVtUAAAAT3RSTlMABQYHCAoNDhARGRobL0ZOV1xdXV5fYGBmZnB0eX2MjZSaoaGio6mqqqustLq7zubo6Ojo6evt7u/x8fLy9/f4+Pj5+vr6+vr6+/39/v7+XKgUSwAAAMhJREFUKM9jYGDg4OZmZgABKINT1dBAhBHIYFMxMBIDisjbhoZbCTExsCu5hoeY8DEwcOkEx8fY6MqpucTGB0izglVEplcU5/gmRYWBVQDNMK+s0hN3SvMyBpsBNJxXw0NfwTEjVQZqHQMHj5RfWW5mliSEC7TPzK6yJD/bXZQRzGdXcisqLy309okA2Q4Eis4peQWmstqBCdGW/CABraC45ERBBs3A6Fh/AbAKTwsHa34QZW8NVsGuLqwswQSjQICTmYMFQaEDAAF8JHLfKGswAAAAAElFTkSuQmCC') center left no-repeat!important; padding-left: 18px; } .linkify.video { background: transparent url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QAxgDGAP8nNqN7AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3gMZBjQQLEEqGwAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAAA5SURBVDjLY2AYaMDIwMDwn1JD/lPCZhpwL+B1wf///ykzgBhDiAoDfIYQZQAjIyP5BuDTPJqQqAQAvW0ZAMk8+EEAAAAASUVORK5CYII=') center left no-repeat!important; padding-left: 18px; } /* Embedding */ #embedding { padding: 1px 4px 1px 4px; position: fixed; } #embedding.empty { display: none; } #embedding > div:first-child { display: flex; } #embedding .move { flex: 1; } #embedding .jump { margin: -1px 4px; text-decoration: none; } /* Gallery */ #a-gallery { position: fixed; top: 0; bottom: 0; left: 0; right: 0; display: -webkit-flex; display: flex; -webkit-flex-direction: row; flex-direction: row; background: rgba(0,0,0,0.7); } .gal-viewport { display: -webkit-flex; display: flex; -webkit-align-items: stretch; align-items: stretch; -webkit-flex-direction: row; flex-direction: row; -webkit-flex: 1 1 auto; flex: 1 1 auto; overflow: hidden; } .gal-thumbnails { -webkit-flex: 0 0 150px; flex: 0 0 150px; overflow-y: auto; display: -webkit-flex; display: flex; -webkit-flex-direction: column; flex-direction: column; -webkit-align-items: stretch; align-items: stretch; text-align: center; background: rgba(0,0,0,.5); border-left: 1px solid #222; } .gal-hide-thumbnails .gal-thumbnails { display: none; } .gal-thumb img, .gal-thumb video { max-width: 125px; max-height: 125px; height: auto; width: auto; } .gal-thumb { -webkit-flex: 0 0 auto; flex: 0 0 auto; padding: 3px; line-height: 0; transition: background .2s linear; } .gal-highlight { background: rgba(0, 190, 255,.8); } .gal-prev { order: 0; border-right: 1px solid #222; } .gal-next { order: 2; border-left: 1px solid #222; } .gal-prev, .gal-next { -webkit-flex: 0 0 20px; flex: 0 0 20px; position: relative; cursor: pointer; opacity: 0.7; background-color: rgba(0, 0, 0, 0.3); } .gal-prev:hover, .gal-next:hover { opacity: 1; } .gal-prev::after, .gal-next::after { position: absolute; top: 48.6%; -webkit-transform: translateY(-50%); transform: translateY(-50%); display: inline-block; border-top: 11px solid transparent; border-bottom: 11px solid transparent; content: \"\"; } .gal-prev::after { border-right: 12px solid #fff; right: 5px; } .gal-next::after { border-left: 12px solid #fff; right: 3px; } .gal-image { order: 1; -webkit-flex: 1 0 auto; flex: 1 0 auto; display: -webkit-flex; display: flex; -webkit-align-items: flex-start; align-items: flex-start; -webkit-justify-content: space-around; justify-content: space-around; overflow: hidden; /* Flex > Non-Flex child max-width and overflow fix (Firefox only?) */ width: 1%; } :root:not(.gal-fit-height):not(.gal-pdf) .gal-image { overflow-y: scroll !important; } :root:not(.gal-fit-width):not(.gal-pdf) .gal-image { overflow-x: scroll !important; } .gal-image a { margin: auto; line-height: 0; max-width: 100%; } :root.gal-pdf .gal-image a { width: 100%; height: 100%; } .gal-fit-width .gal-image img, .gal-fit-width .gal-image video { max-width: 100%; } .gal-fit-height .gal-image img, .gal-fit-height .gal-image video { /* Chrome doesn't support viewpoint units in calc() http://bugs.chromium.org/168840 \"It looks like the original author of viewport units in WebKit is not coming back to fix this stuff.\" Well, fuck. */ max-height: 95vh; max-height: calc(100vh - 25px); } .gal-image iframe { width: 100%; height: 100%; } .gal-buttons { font-size: 2em; margin-right: 3px; padding-left: 7px; padding-right: 7px; top: 5px; } :root.gal-pdf .gal-buttons { top: 40px; background: rgba(0,0,0,0.6) !important; border-radius: 3px; } .gal-buttons a { color: #ffffff; text-shadow: 0px 0px 1px #000000; } .gal-buttons i { display: inline-block; margin: 2px; position: relative; } .gal-start i { border-left: 10px solid; border-top: 6px solid transparent; border-bottom: 6px solid transparent; bottom: 1px; } .gal-stop i { border: 5px solid; bottom: 2px; } .gal-buttons.gal-playing > .gal-start, .gal-buttons:not(.gal-playing) > .gal-stop { display: none; } .gal-buttons .menu-button i { border-top: 10px solid; border-right: 6px solid transparent; border-left: 6px solid transparent; bottom: 2px; vertical-align: baseline; } .gal-buttons, .gal-name, .gal-count { position: fixed; right: 195px; } .gal-hide-thumbnails .gal-buttons, .gal-hide-thumbnails .gal-count, .gal-hide-thumbnails .gal-name { right: 44px; } .gal-name { bottom: 6px; background: rgba(0,0,0,0.6) !important; border-radius: 3px; padding: 1px 5px 2px 5px; text-decoration: none !important; color: white !important; } .gal-name:hover, .gal-buttons a:hover { color: rgb(95, 95, 101) !important; } :root.gal-pdf .gal-buttons a:hover { color: rgb(204, 204, 204) !important; } .gal-count { bottom: 27px; background: rgba(0,0,0,0.6) !important; border-radius: 3px; padding: 1px 5px 2px 5px; color: #ffffff !important; } :root:not(.gal-fit-width):not(.gal-pdf) .gal-name { bottom: 23px !important; } :root:not(.gal-fit-width):not(.gal-pdf) .gal-count { bottom: 44px !important; } :root.gal-fit-height:not(.gal-pdf):not(.gal-hide-thumbnails) .gal-buttons, :root.gal-fit-height:not(.gal-pdf):not(.gal-hide-thumbnails) .gal-name, :root.gal-fit-height:not(.gal-pdf):not(.gal-hide-thumbnails) .gal-count { right: 178px !important; } :root.gal-hide-thumbnails:.gal-fit-height:not(.gal-pdf) .gal-buttons, :root.gal-hide-thumbnails:.gal-fit-height:not(.gal-pdf) .gal-name, :root.gal-hide-thumbnails:.gal-fit-height:not(.gal-pdf) .gal-count { right: 28px !important; } .field[name=\"Slide Delay\"] { width: 4em; } :root.gallery-open.fixed #header-bar:not(.autohide), :root.gallery-open.fixed #header-bar:not(.autohide) .fa::before { visibility: hidden; }\n/* General */ :root.yotsuba .dialog { background-color: #F0E0D6; border-color: #D9BFB7; } :root.yotsuba .field:focus { border-color: #EA8; } /* Header */ :root.yotsuba #header-bar.dialog { background-color: rgba(240,224,214,0.98); } :root.yotsuba #header-bar, :root.yotsuba #notifications { font-size: 9pt; color: #B86; } :root.yotsuba #board-list a, :root.yotsuba #shortcuts a { color: #800000; } :root.yotsuba.fixed #custom-board-list a.current { border-bottom: 1px solid rgba(178,0,0,0.2); } :root.yotsuba.fixed #custom-board-list .current:hover { border-bottom-color: rgba(255,0,0,0.2); } /* Settings */ :root.yotsuba #fourchanx-settings fieldset, :root.yotsuba .section-main div::before { border-color: #D9BFB7; } :root.yotsuba .suboption-list > div:last-of-type { background-color: #F0E0D6; } /* Quote */ :root.yotsuba .backlink.deadlink { color: #00E !important; } :root.yotsuba .inline { border-color: #D9BFB7; background-color: rgba(255, 255, 255, .14); } /* QR */ .yotsuba #dump-list::-webkit-scrollbar-thumb { background-color: #F0E0D6; border-color: #D9BFB7; } :root.yotsuba .qr-preview { background-color: rgba(0, 0, 0, .15); } :root.yotsuba .qr-link { border-color: rgb(225, 209, 199) rgb(225, 209, 199) rgb(210, 194, 184); background: linear-gradient(#FFEFE5, #F0E0D6) repeat scroll 0% 0% transparent; } :root.yotsuba .qr-link:hover { background: #F0E0D6; } /* Menu */ :root.yotsuba #menu { color: #800000; } :root.yotsuba .entry { font-size: 10pt; } :root.yotsuba .focused.entry { background: rgba(255, 255, 255, .33); } /* Thread Watcher */ :root.yotsuba .replies-quoting-you > a, :root.yotsuba #watcher-link.disabled.replies-quoting-you { color: #F00; } /* Watcher Favicon */ :root.yotsuba .watch-thread-link { background-image: url(\"data:image/svg+xml,<svg viewBox='0 0 26 26' preserveAspectRatio='true' xmlns='http://www.w3.org/2000/svg'><path fill='rgb(128,0,0)' d='M24.132,7.971c-2.203-2.205-5.916-2.098-8.25,0.235L15.5,8.588l-0.382-0.382c-2.334-2.333-6.047-2.44-8.25-0.235c-2.204,2.203-2.098,5.916,0.235,8.249l8.396,8.396l8.396-8.396C26.229,13.887,26.336,10.174,24.132,7.971z'/></svg>\"); } /* Board Title */ :root.yotsuba div.boardTitle { font-family: sans-serif !important; text-shadow: 1px 1px 1px rgba(100,0,0,0.6); }\n/* General */ :root.yotsuba-b .dialog { background-color: #D6DAF0; border-color: #B7C5D9; } :root.yotsuba-b .field:focus { border-color: #98E; } /* Header */ :root.yotsuba-b #header-bar.dialog { background-color: rgba(214,218,240,0.98); } :root.yotsuba-b #header-bar, :root.yotsuba-b #notifications { font-size: 9pt; color: #89A; } :root.yotsuba-b #board-list a, :root.yotsuba-b #shortcuts a { color: #34345C; } :root.yotsuba-b.fixed #custom-board-list .current { border-bottom: 1px solid rgba(30, 30, 255, 0.2); } :root.yotsuba-b.fixed #custom-board-list .current:hover { border-bottom-color: rgba(255,0,0,0.2); } /* Settings */ :root.yotsuba-b #fourchanx-settings fieldset, :root.yotsuba-b .section-main div::before { border-color: #B7C5D9; } :root.yotsuba-b .suboption-list > div:last-of-type { background-color: #D6DAF0; } /* Quote */ :root.yotsuba-b .backlink.deadlink { color: #34345C !important; } :root.yotsuba-b .inline { border-color: #B7C5D9; background-color: rgba(255, 255, 255, .14); } /* QR */ .yotsuba-b #dump-list::-webkit-scrollbar-thumb { background-color: #D6DAF0; border-color: #B7C5D9; } :root.yotsuba-b .qr-preview { background-color: rgba(0, 0, 0, .15); } :root.yotsuba-b .qr-link { border-color: rgb(199, 203, 225) rgb(199, 203, 225) rgb(184, 188, 210); background: linear-gradient(#E5E9FF, #D6DAF0) repeat scroll 0% 0% transparent; } :root.yotsuba-b .qr-link:hover { background: #D9DDF3; } /* Menu */ :root.yotsuba-b #menu { color: #000; } :root.yotsuba-b .entry { font-size: 10pt; } :root.yotsuba-b .focused.entry { background: rgba(255, 255, 255, .33); } /* Thread Watcher */ :root.yotsuba-b .replies-quoting-you > a, :root.yotsuba-b #watcher-link.disabled.replies-quoting-you { color: #F00; } /* Watcher Favicon */ :root.yotsuba-b .watch-thread-link { background-image: url(\"data:image/svg+xml,<svg viewBox='0 0 26 26' preserveAspectRatio='true' xmlns='http://www.w3.org/2000/svg'><path fill='rgb(0,0,0)' d='M24.132,7.971c-2.203-2.205-5.916-2.098-8.25,0.235L15.5,8.588l-0.382-0.382c-2.334-2.333-6.047-2.44-8.25-0.235c-2.204,2.203-2.098,5.916,0.235,8.249l8.396,8.396l8.396-8.396C26.229,13.887,26.336,10.174,24.132,7.971z'/></svg>\"); } /* Board Title */ :root.yotsuba-b div.boardTitle { font-family: sans-serif !important; text-shadow: 1px 1px 1px rgba(105,10,15,0.6); }\n/* General */ :root.futaba .dialog { background-color: #F0E0D6; border-color: #D9BFB7; } :root.futaba .field:focus { border-color: #EA8; } /* Header */ :root.futaba #header-bar.dialog { background-color: rgba(240,224,214,0.98); } :root.futaba #header-bar, :root.futaba #notifications { font-size: 11pt; color: #B86; } :root.futaba #header-bar a, :root.futaba #notifications a { color: #800000; } :root.futaba.fixed #custom-board-list a.current { border-bottom: 1px solid rgba(178,0,0,0.2); } :root.futaba.fixed #custom-board-list .current:hover { border-bottom-color: rgba(255,0,0,0.2); } /* Settings */ :root.futaba #fourchanx-settings fieldset, :root.futaba .section-main div::before { border-color: #D9BFB7; } :root.futaba .suboption-list > div:last-of-type { background-color: #F0E0D6; } /* Quote */ :root.futaba .backlink.deadlink { color: #00E !important; } :root.futaba .inline { border-color: #D9BFB7; background-color: rgba(255, 255, 255, .14); } /* QR */ .futaba #dump-list::-webkit-scrollbar-thumb { background-color: #F0E0D6; border-color: #D9BFB7; } :root.futaba .qr-preview { background-color: rgba(0, 0, 0, .15); } :root.futaba .qr-link { border-color: rgb(225, 209, 199) rgb(225, 209, 199) rgb(210, 194, 184); background: linear-gradient(#FFEFE5, #F0E0D6) repeat scroll 0% 0% transparent; } :root.futaba .qr-link:hover { background: #F0E0D6; } /* Menu */ :root.futaba #menu { color: #800000; } :root.futaba .entry { font-size: 12pt; } :root.futaba .focused.entry { background: rgba(255, 255, 255, .33); } /* Thread Watcher */ :root.futaba .replies-quoting-you > a, :root.futaba #watcher-link.disabled.replies-quoting-you { color: #F00; } /* Watcher Favicon */ :root.futaba .watch-thread-link { background-image: url(\"data:image/svg+xml,<svg viewBox='0 0 26 26' preserveAspectRatio='true' xmlns='http://www.w3.org/2000/svg'><path fill='rgb(128,0,0)' d='M24.132,7.971c-2.203-2.205-5.916-2.098-8.25,0.235L15.5,8.588l-0.382-0.382c-2.334-2.333-6.047-2.44-8.25-0.235c-2.204,2.203-2.098,5.916,0.235,8.249l8.396,8.396l8.396-8.396C26.229,13.887,26.336,10.174,24.132,7.971z'/></svg>\"); }\n/* General */ :root.burichan .dialog { background-color: #D6DAF0; border-color: #B7C5D9; } :root.burichan .field:focus { border-color: #98E; } /* Header */ :root.burichan #header-bar.dialog { background-color: rgba(214,218,240,0.98); } :root.burichan #header-bar, :root.burichan #header-bar #notifications { font-size: 11pt; color: #89A; } :root.burichan #header-bar a, :root.burichan #header-bar #notifications a { color: #34345C; } :root.burichan.fixed #custom-board-list .current { border-bottom: 1px solid rgba(30, 30, 255, 0.2); } :root.burichan.fixed #custom-board-list .current:hover { border-bottom-color: rgba(255,0,0,0.2); } /* Settings */ :root.burichan #fourchanx-settings fieldset, :root.burichan .section-main div::before { border-color: #B7C5D9; } :root.burichan .suboption-list > div:last-of-type { background-color: #D6DAF0; } /* Quote */ :root.burichan .backlink.deadlink { color: #34345C !important; } :root.burichan .inline { border-color: #B7C5D9; background-color: rgba(255, 255, 255, .14); } /* QR */ .burichan #dump-list::-webkit-scrollbar-thumb { background-color: #D6DAF0; border-color: #B7C5D9; } :root.burichan .qr-preview { background-color: rgba(0, 0, 0, .15); } :root.burichan .qr-link { border-color: rgb(199, 203, 225) rgb(199, 203, 225) rgb(184, 188, 210); background: linear-gradient(#E5E9FF, #D6DAF0) repeat scroll 0% 0% transparent; } :root.burichan .qr-link:hover { background: #D9DDF3; } /* Menu */ :root.burichan #menu { color: #000000; } :root.burichan .entry { font-size: 12pt; } :root.burichan .focused.entry { background: rgba(255, 255, 255, .33); } /* Thread Watcher */ :root.burichan .replies-quoting-you > a, :root.burichan #watcher-link.disabled.replies-quoting-you { color: #F00; } /* Watcher Favicon */ :root.burichan .watch-thread-link { background-image: url(\"data:image/svg+xml,<svg viewBox='0 0 26 26' preserveAspectRatio='true' xmlns='http://www.w3.org/2000/svg'><path fill='rgb(0,0,0)' d='M24.132,7.971c-2.203-2.205-5.916-2.098-8.25,0.235L15.5,8.588l-0.382-0.382c-2.334-2.333-6.047-2.44-8.25-0.235c-2.204,2.203-2.098,5.916,0.235,8.249l8.396,8.396l8.396-8.396C26.229,13.887,26.336,10.174,24.132,7.971z'/></svg>\"); }\n/* General */ :root.tomorrow .dialog { background-color: #282A2E; border-color: #111; } :root.tomorrow img[src*=\"//boards.4chan.org/js/jsMath/fonts/\"] { filter: invert(100%); } /* Header */ :root.tomorrow #header-bar.dialog { background-color: rgba(40,42,46,0.9); } :root.tomorrow #header-bar, :root.tomorrow #notifications { font-size: 9pt; color: #C5C8C6; } :root.tomorrow #header-bar a, :root.tomorrow #notifications a { color: #81A2BE; } :root.tomorrow.fixed #custom-board-list a.current { border-bottom: 1px solid rgba(83,124,160,0.4); } :root.tomorrow.fixed #custom-board-list .current:hover { border-bottom-color: rgba(95,137,172,0.4); } /* Settings */ :root.tomorrow #fourchanx-settings fieldset, :root.tomorrow .section-main div::before { border-color: #111; } :root.tomorrow .suboption-list > div:last-of-type { background-color: #282A2E; } /* Catalog */ :root.tomorrow .catalog-code { background-color: rgba(255, 255, 255, 0.1); } /* Quote */ :root.tomorrow .catalog-thread > .comment > span.quote, :root.tomorrow #arc-list span.quote { color: #B5BD68; } :root.tomorrow .backlink.deadlink { color: #81A2BE !important; } :root.tomorrow .inline { border-color: #111; background-color: rgba(0, 0, 0, .14); } /* QR */ .tomorrow #dump-list::-webkit-scrollbar-thumb { background-color: #282A2E; border-color: #111; } :root.tomorrow .qr-preview { background-color: rgba(255, 255, 255, .15); } :root.tomorrow #qr .field { background-color: rgb(26, 27, 29); color: rgb(197,200,198); border-color: rgb(40, 41, 42); } :root.tomorrow #qr .field:focus { border-color: rgb(129, 162, 190) !important; background-color: rgb(30,32,36); } :root.tomorrow #qr-filename { color: rgb(197,200,198); } :root.tomorrow .qr-link { border-color: rgb(25, 27, 31) rgb(25, 27, 31) rgb(10, 12, 16); background: linear-gradient(#37393D, #282A2E) repeat scroll 0% 0% transparent; } :root.tomorrow .qr-link:hover { background: #282A2E; } /* Menu */ :root.tomorrow #menu { color: #C5C8C6; } :root.tomorrow .entry { font-size: 10pt; } :root.tomorrow .focused.entry { background: rgba(0, 0, 0, .33); } /* Thread Watcher */ :root.tomorrow .replies-quoting-you > a, :root.tomorrow #watcher-link.disabled.replies-quoting-you { color: #F00 !important; } /* Watcher Favicon */ :root.tomorrow .watch-thread-link { background-image: url(\"data:image/svg+xml,<svg viewBox='0 0 26 26' preserveAspectRatio='true' xmlns='http://www.w3.org/2000/svg'><path fill='rgb(197,200,198)' d='M24.132,7.971c-2.203-2.205-5.916-2.098-8.25,0.235L15.5,8.588l-0.382-0.382c-2.334-2.333-6.047-2.44-8.25-0.235c-2.204,2.203-2.098,5.916,0.235,8.249l8.396,8.396l8.396-8.396C26.229,13.887,26.336,10.174,24.132,7.971z'/></svg>\"); } /* Board Title */ :root.tomorrow div.boardTitle { font-family: sans-serif !important; text-shadow: 1px 1px 1px rgba(167,170,168,0.6); }\n/* General */ :root.photon .dialog { background-color: #DDD; border-color: #CCC; } :root.photon .field:focus { border-color: #EA8; } /* Header */ :root.photon #header-bar.dialog { background-color: rgba(221,221,221,0.98); } :root.photon #header-bar, :root.photon #notifications { font-size: 9pt; color: #333; } :root.photon #header-bar a, :root.photon #notifications a { color: #FF6600; } :root.photon.fixed #custom-board-list a.current { border-bottom: 1px solid rgba(0,74,153,0.2); } :root.photon.fixed #custom-board-list .current:hover { border-bottom-color: rgba(255,51,0,0.2); } /* Settings */ :root.photon #fourchanx-settings fieldset, :root.photon .section-main div::before { border-color: #CCC; } :root.photon .suboption-list > div:last-of-type { background-color: #DDD; } /* Catalog */ :root.photon .catalog-code { background-color: rgba(150, 150, 150, 0.2); } /* Quote */ :root.photon #arc-list tr:nth-of-type(odd) span.quote { color: #C0E17A; } :root.photon .backlink.deadlink { color: #F60 !important; } :root.photon .inline { border-color: #CCC; background-color: rgba(255, 255, 255, .14); } /* QR */ .photon #dump-list::-webkit-scrollbar-thumb { background-color: #DDD; border-color: #CCC; } :root.photon .qr-preview { background-color: rgba(0, 0, 0, .15); } :root.photon .qr-link { border-color: rgb(206, 206, 206) rgb(206, 206, 206) rgb(191, 191, 191); background: linear-gradient(#ECECEC, #DDD) repeat scroll 0% 0% transparent; } :root.photon .qr-link:hover { background: #DDDDDD; } /* Menu */ :root.photon #menu { color: #333; } :root.photon .entry { font-size: 10pt; } :root.photon .focused.entry { background: rgba(255, 255, 255, .33); } /* Thread Watcher */ :root.photon .replies-quoting-you > a, :root.photon #watcher-link.disabled.replies-quoting-you { color: #00F !important; } /* Watcher Favicon */ :root.photon .watch-thread-link { background-image: url(\"data:image/svg+xml,<svg viewBox='0 0 26 26' preserveAspectRatio='true' xmlns='http://www.w3.org/2000/svg'><path fill='rgb(51,51,51)' d='M24.132,7.971c-2.203-2.205-5.916-2.098-8.25,0.235L15.5,8.588l-0.382-0.382c-2.334-2.333-6.047-2.44-8.25-0.235c-2.204,2.203-2.098,5.916,0.235,8.249l8.396,8.396l8.396-8.396C26.229,13.887,26.336,10.174,24.132,7.971z'/></svg>\"); } /* Board Title */ :root.photon div.boardTitle { font-family: sans-serif !important; text-shadow: 1px 1px 1px rgba(0,74,153,0.6); }",
    features: [['Polyfill', Polyfill], ['Redirect', Redirect], ['Header', Header], ['Catalog Links', CatalogLinks], ['Settings', Settings], ['Index Generator', Index], ['Disable Autoplay', AntiAutoplay], ['Announcement Hiding', PSAHiding], ['Fourchan thingies', Fourchan], ['Color User IDs', IDColor], ['Highlight by User ID', IDHighlight], ['Custom CSS', CustomCSS], ['Linkify', Linkify], ['Reveal Spoilers', RemoveSpoilers], ['Resurrect Quotes', Quotify], ['Filter', Filter], ['Thread Hiding Buttons', ThreadHiding], ['Reply Hiding Buttons', PostHiding], ['Recursive', Recursive], ['Strike-through Quotes', QuoteStrikeThrough], ['Quick Reply', QR], ['Menu', Menu], ['Index Generator (Menu)', Index.menu], ['Report Link', ReportLink], ['Thread Hiding (Menu)', ThreadHiding.menu], ['Reply Hiding (Menu)', PostHiding.menu], ['Delete Link', DeleteLink], ['Filter (Menu)', Filter.menu], ['Download Link', DownloadLink], ['Archive Link', ArchiveLink], ['Quote Inlining', QuoteInline], ['Quote Previewing', QuotePreview], ['Quote Backlinks', QuoteBacklink], ['Mark Quotes of You', QuoteYou], ['Mark OP Quotes', QuoteOP], ['Mark Cross-thread Quotes', QuoteCT], ['Anonymize', Anonymize], ['Time Formatting', Time], ['Relative Post Dates', RelativeDates], ['File Info Formatting', FileInfo], ['Fappe Tyme', FappeTyme], ['Gallery', Gallery], ['Gallery (menu)', Gallery.menu], ['Sauce', Sauce], ['Image Expansion', ImageExpand], ['Image Expansion (Menu)', ImageExpand.menu], ['Reveal Spoiler Thumbnails', RevealSpoilers], ['Image Loading', ImageLoader], ['Image Hover', ImageHover], ['Comment Expansion', ExpandComment], ['Thread Expansion', ExpandThread], ['Thread Excerpt', ThreadExcerpt], ['Favicon', Favicon], ['Unread', Unread], ['Quote Threading', QuoteThreading], ['Thread Stats', ThreadStats], ['Thread Updater', ThreadUpdater], ['Thread Watcher', ThreadWatcher], ['Thread Watcher (Menu)', ThreadWatcher.menu], ['Mark New IPs', MarkNewIPs], ['Index Navigation', Nav], ['Keybinds', Keybinds], ['Banner', Banner]]
  };

  Main.init();

}).call(this);