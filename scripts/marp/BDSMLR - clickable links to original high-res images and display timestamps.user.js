// ==UserScript==
// @name         BDSMLR - clickable links to original high-res images and display timestamps
// @namespace    bdsmlr_linkify
// @version      2.2.0
// @license      GNU AGPLv3
// @description  Modifies images to link to their original ("-og") version. Works for (a) the dashboard, (b) blogs displayed on right sidebar in the dashboard, (c) blog streams (xxx.bdsmlr.com) and (d) individual posts (xxx.bdsmlr.com/post/yyyyyyyyyy). It does NOT work for the archive view. The script also displays the timestamp of the post in the upper right corner.
// @author       marp
// @homepageURL  https://greasyfork.org/en/users/204542-marp
// @include      https://bdsmlr.com/
// @include      https://bdsmlr.com/dashboard
// @include      https://*.bdsmlr.com/
// @include      https://*.bdsmlr.com/post/*
// @include      https://bdsmlr.com/uploads/photos/*
// @include      https://bdsmlr.com/uploads/pictures/*
// @include      https://*.bdsmlr.com/uploads/photos/*
// @include      https://*.bdsmlr.com/uploads/pictures/*
// @run-at document-end
// ==/UserScript==

//console.info("START href: ", window.location.href);


//------------------------------------------------------------
// FIRST PART OF SCRIPT #2 - function that gets called by event oberver registers as part of 1st part #1 (see below)
//------------------------------------------------------------

function createImageLinks(myDoc, myContext) {

//console.info("createImageLinks: ", myContext);
  
  if (myDoc===null) myDoc = myContext;
  if (myDoc===null) return;
  if (myContext===null) myContext = myDoc;
  
  var matches;
  var tmpstr;
  var singlematch;
  var origpostlink;
  var origbloglink;
  var origblog;
  var imagematches;
  var imageurl;
  var imagesrc;
  var cdnmatches;
  var cdnnumber;

  matches = myDoc.evaluate("./descendant-or-self::div[contains(@class,'postholder')] | ./descendant-or-self::div[contains(@class,'post_content')]",
                           myContext, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  for(var i=0, el; (i<matches.snapshotLength); i++) {
    el = matches.snapshotItem(i);
    if (el) {
      try {
        
        // try to find info about original poster (if this is a reblog) as well as the link to the individual (potentially reblogged) post
        // both info only seem to be present on dashboard and on rightside overlay blogs - but not always on individual blogs (xxx.bdsmlr.com) or on individual blog post URLs :-(
			  singlematch = myDoc.evaluate(".//div[contains(@class,'originalposter')]/a[contains(@href,'.bdsmlr.com/post/')]",
                                     el, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
        origpostlink = singlematch.singleNodeValue; // xxxx.bdsmlr.com/post/yyyyyyyy
        if (origpostlink) {
          origblog = origpostlink.getAttribute("href"); //everything after and including "/post" gets truncated away later anyway
        } else {
          origblog = null;
        }
        if (origblog === null) {
          //second method might find the originial blog URL (xxxx.bdsmlr.com)
          singlematch = myDoc.evaluate(".//div[contains(@class,'post_info')]//i[contains(@class,'retweet') or contains(@class,'rbthis')]" + 
                                       "/following-sibling::a[contains(@class,'adata') or contains(@class,'ndata')]",
                                       el, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
          origbloglink = singlematch.singleNodeValue; // xxxx.bdsmlr.com
          if (origbloglink) {
          	tmpstr = origbloglink.getAttribute("href");
            if ( tmpstr && (tmpstr.length > 10) &&
                 !(tmpstr.includes("//.bdsmlr.com") ) ) {
                origblog = tmpstr;
            }
          }
          if (origblog === null) {
            // if neither of the two above find anything then this is likely NOT a reblogged post but the original post -> get the orginial blog post URL
            singlematch = myDoc.evaluate(".//a[(contains(@class,'adata') or contains(@class,'ndata')) and contains(@href,'.bdsmlr.com/post/')]",
                                         el, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
            origpostlink = singlematch.singleNodeValue; // xxxx.bdsmlr.com
            if (origpostlink) {
          	  tmpstr = origpostlink.getAttribute("href");
              if ( tmpstr && (tmpstr.length > 10) &&
                   !(tmpstr.includes("//.bdsmlr.com") ) ) {
                  origblog = tmpstr;
              }
            }
            if (origblog === null) {
              if ( !window.location.href.startsWith("https://bdsmlr.com") ) {
                // if no link to neither original blog nor original blog post was found then we assume that this is the original blog post or blog itself (this is a rather shaky assumtion - fingers crossed...)
                origblog = window.location.href;
              }
              else {
                // however - if the current url is the dashboard then we're out of luck
                origblog = null;
              }  
            }
          }
        }
        

				// iterate over all links to images (i.e. does NOT (yet) create links to images where none exist in the first place)
        // skip over items that already have a link to a "non-cdn" bdsmlr url
        imagematches = myDoc.evaluate(".//div[contains(@class,'image_container') or contains(@class,'image_content')]" + 
                                             "//a[(@href='') or ((contains(@class,'magnify') or contains(@class,'image-link')) and contains(@href,'https://cdn') and contains(@href,'.bdsmlr.com'))]" +
                                               "/img",
                                          el, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
        for(var j=0, image, imagelink; (j<imagematches.snapshotLength); j++) {
          image=imagematches.snapshotItem(j);
          if (image) {
            imagesrc = image.src;
            imagelink = image.parentNode;
            imageurl = imagelink.getAttribute("href");
            if (imageurl === null || imageurl.length < 5) {
              imageurl = image.getAttribute("src");
              // No idea why this is needed... DevTools inspector always shows a valid image src attribute... but at script execution time... apparently not... seems to be some bdsmlr JavaScript post-processing...
              if (imageurl === null || imageurl.length < 5) {
                imageurl = image.getAttribute("data-echo"); 
              }  
            }
            if (imageurl && imageurl.length > 5) {
              // get url to "-og" image on save host - if the url already conatrins "-og" it will simply return the passed in argument (tmpstr == imageurl)
              tmpstr = getOriginalImageURL(imageurl);
              // analyze to which cdn server the url points
              cdnmatches = imageurl.toLowerCase().match("https:\/\/cdn([0-9]+)\.bdsmlr\.com\/");
              if (cdnmatches !== null) {
                cdnnumber = parseInt(cdnmatches[1], 10);
              }  else {
                cdnnumber = NaN;
              }
              // ONLY IF there is no -og url already OR if the cdn server is cdn 01, cdn 02 or cdn 03 -> apply this script's algorithm to locate -og image
              // -> i.e do not touch already existing -og urls to cdn04 or beyond servers (cdn05, etc.) 
              // => NOTE: script algorithm will still trigger if the image is not found (see the script logic that applies to "*bdsmlr.com/uploads/*") further below
              if ( (imageurl.length != tmpstr.length) || // will be unequal if there was no -og url to begin with (but instead created by getOriginalImageURL)
                    isNaN(cdnnumber) || cdnnumber <= 3 ) {
                // if we have the url of the original blog then we use a different mechanism to reconstruct the orig image URL
                // otherwise we stay with tmpstr as is
                if (origblog && origblog.length > 5) {
                  // if we have info about original poster -> construct link to "-og" version of image on orig posters blog (e.g. https://<origposter>.bdsmlr.com/<....>/imagename-og.jpg)
                  tmpstr = getOriginalPosterImageURL(imageurl, origblog);
                  tmpstr = getOriginalImageURL(tmpstr);
                  tmpstr = tmpstr + "invalidurl"; //create an invalid url which will trigger the sceond part of this script (see below - if statement on window.location.href)
                }
              }
              
         // hopefully temporary workaround to avoid bdsmlr circular redirections - such cirular redirs cause GreaseMonkey NOT to trigger at all! :-(
         // there seem to be no redirs in place on "https://bdsmlr.com/uploads/..." while there seem to be several circular ones on various cdn servers
              if (tmpstr.toLowerCase().startsWith("https://cdn")) {
                tmpstr = "https://" + tmpstr.substring(tmpstr.toLowerCase().indexOf(".bdsmlr.com") + 1);
              }  
              
              // get the link node and set the link target - pass on context information to second part of this script (below)
              image.parentNode.setAttribute("href", tmpstr + "?cdnnumber=" + cdnnumber + "&initialurl=" + encodeURIComponent(imageurl) + "&initialsrc=" + encodeURIComponent(imagesrc));
            }
          }
        }
          
      } catch (e) { console.warn("error: ", e); }
    }
	}

}


// try to find the timestamp info and display in upper right corner
function displayTimestamps(myDoc, myContext) {

//console.info("displayTimestamps: ", myContext);
  
  if (myDoc===null) myDoc = myContext;
  if (myDoc===null) return;
  if (myContext===null) myContext = myDoc;
  
  var matches;
  var tmpstr;
  var singlematch;
  var postinfo;
  var timestamp;
  var newnode;
  
  matches = myDoc.evaluate("./descendant-or-self::div[contains(@class,'feed') and @title]",
                           myContext, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  for(var i=0, el; (i<matches.snapshotLength); i++) {
    el = matches.snapshotItem(i);
    if (el) {
      try {

        timestamp = el.getAttribute("title");
				if (timestamp && timestamp.length>5 && timestamp.length<70) {

          singlematch = myDoc.evaluate(".//div[contains(@class,'post_info')]",
                                       el, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
          postinfo = singlematch.singleNodeValue; 
          if (postinfo) {

            newnode = myDoc.createElement("div");
            newnode.setAttribute("style", "float:right; margin-right: 10px; padding-right: 10px;");
            newnode.innerHTML = timestamp;
            postinfo.appendChild(newnode);
          }
        }
  
      } catch (e) { console.warn("error: ", e); }
    }
	}
  
}



function getOriginalPosterImageURL(imageurl, originalposter) {
  if (originalposter === null) {
    return imageurl;
  }
  var pos = imageurl.toLowerCase().indexOf(".bdsmlr.com");
  var pos2 = originalposter.toLowerCase().indexOf(".bdsmlr.com");
  if (pos > 0 && pos2 > 0) {
    return originalposter.substring(0, pos2) + imageurl.substring(pos);
  } else {
    return imageurl;
  }
}


function getOriginalImageURL(imageurl) {
  if (imageurl === null) {
    return imageurl;
  }
  var pos = imageurl.lastIndexOf(".");
  var pos2 = imageurl.lastIndexOf("-og.");
  if (pos > 0 && (pos2+3)!=pos) {
    return imageurl.substring(0, pos) + "-og" + imageurl.substring(pos);
  } else {
    return imageurl;
  }
}




//------------------------------------------------------------
// SECOND PART OF SCRIPT
//------------------------------------------------------------


// this is a function used asychroniously via Promise objects
// a "parent" Promise is passed in and this function "chains" another "child" Promise (the fetch object) to it
// the (asynchronuous!) return value is NULL if the Url is not valid (404, etc) or the fetched URL if the request is sucesfull (OK 200)
function checkUrl(checkUrlPromise, baseimageurl, hostprefix, allowredirect) {
  var imageurl;
  
  if (baseimageurl.startsWith("https://")) {
    baseimageurl = baseimageurl.substring(8);
  }
  if (hostprefix !== null && hostprefix.length > 0) {
    imageurl = "https://" + hostprefix + "." + baseimageurl;
  } else {
    imageurl = "https://" + baseimageurl;
  }
  
  //return the newly "chained" Promise that now has a fetch promise as "child"
  return checkUrlPromise.then(
    function(promiseresult) {

      // if the prior/parent promise resolves into a valid Url - return that Url and skip the child/follow-up fetch
      if ( (promiseresult !==null) && (promiseresult.length > 10) ) {
        return promiseresult;
      } else {

        // the prior Promise did NOT resolve into a valid URL -> try to fetch this new URL
        return fetch(imageurl, (allowredirect ? { redirect: 'follow' } : { redirect: 'error' } ) ).then(
          function(response) {
            if (response.ok) {
              if (response.redirected && allowredirect) {
                return response.url;
              } else {
                return imageurl;
              }
            } else {
              return null;
            }
          },
          function(rejectreason) {
            return null;
          });
        
      }
    },
    function(rejectreason) {
      return null;
    }
  );
}  


// Two very different actions depending on if this is for the URL of an image or for a bdsmlr page (page = dashboard, blog stream or blog post)
// -> If this if statement evaluates to true it is in the context of an image -> execute SECOND part of script -> algorithm to try to find the "-og" version of the image
if ( window.location.href.includes('bdsmlr.com/uploads/') ) {
  
    // the "og search algorithm" only triggers if the current url is invalid - otherwise do nothing
  	if ( document.head.textContent !== null && 
          ( document.head.textContent.toLowerCase().includes('404 not found') ||
            document.head.textContent.toLowerCase().includes('403 forbidden') ||
            document.head.textContent.toLowerCase().includes('problem loading page') ||
            document.body.textContent.toLowerCase().includes('page isn’t redirecting properly') ||
            document.body.textContent.toLowerCase().includes('could not be found') ) ) {

      var tmpstr = window.location.href;

      // if exists, strip the suffix that was used to trigger this part of the script
      if (tmpstr.lastIndexOf('invalidurl') > 0) {
        tmpstr = tmpstr.substring(0, tmpstr.lastIndexOf("invalidurl")); 
      }

      var pos = tmpstr.lastIndexOf(".");
      var pos2 = tmpstr.lastIndexOf("-og.");
      var pos3 = tmpstr.indexOf(".");
      var baseimageurl = null;
      var blogprefix = null;
      var initialUrl = null;
      var initialSrc = null;
      var cdnnumber = -1;
      var checkUrlPromise = null;

      // retrieve "context" parameters that might have been passed in for the above part of the script
      if (window.location.search !== null) {
        var urlParams = new URLSearchParams(window.location.search);
        initialUrl = urlParams.get('initialurl');
        if (initialUrl !== null) {
          initialUrl = decodeURIComponent(initialUrl);
        }
        initialSrc = urlParams.get('initialsrc');
        if (initialSrc !== null) {
          initialSrc = decodeURIComponent(initialSrc);
        }
        cdnnumber = parseInt(urlParams.get('cdnnumber'));
      }

      // check on what kind of url this script was triggered
      if ( !(tmpstr.startsWith("https://bdsmlr.com")) &&
           !(tmpstr.startsWith("https://cdn")) && 
            (tmpstr.startsWith("https://")) ) { //this is a url to a specific blog (xxxx.bdsmlr.com/uploads/...)
        baseimageurl = tmpstr.substring(pos3+1);
        blogprefix = tmpstr.substring(8, pos3);
      }
      else if (tmpstr.startsWith("https://bdsmlr.com")) { 
        baseimageurl = tmpstr.substring(8);
      }
      else { // this should be a url to some kind of cdn server (cdnxx.bdsmlr.com/uploads/...)
        baseimageurl = tmpstr.substring(pos3+1);
      }

      // starting Promise whioch resolves to invalid URL (=null) 
      // this is the start of the to follow "daisy-chaining" of several fetch requests to test several potential URLs
      checkUrlPromise = Promise.resolve(null);

      if (pos == pos2+3) { // check if this is an -og url
        if ( blogprefix !== null && blogprefix.length > 0 ) { //this is a url to a specific blog (xxxx.bdsmlr.com/uploads/...)
          checkUrlPromise = checkUrl(checkUrlPromise, baseimageurl, blogprefix, false);
        }
        checkUrlPromise = checkUrl(checkUrlPromise, baseimageurl, null, false); // "bdsmlr.com/uploads/..."
        // try old cdn servers (cdn02, cdn03 and cdn04) and depending on cdnnumber context param -> also try newer cdn servers (cdn05 and beyond)
        var cdn = 4;
        if ( !isNaN(cdnnumber) && cdnnumber > 4 ) {
          cdn = cdnnumber;
        }
        while (cdn >= 2) {
          checkUrlPromise = checkUrl(checkUrlPromise, baseimageurl, "cdn" + cdn.toString().padStart(2, '0'), false); // "cdnXX.bdsmlr.com/uploads/..."
          cdn--;
        }  
      }

      // no valid -og URL -> try the initial URL that bdsmlr provided originally
      if ( (initialUrl !== null) && (initialUrl.length > 10) ) {
        checkUrlPromise = checkUrl(checkUrlPromise, initialUrl, null, true); // true -> allow bdsmlr to redirect for original URL
      }

      // still no valid URL -> try the URL of the image shown in the original stream or blog post
      if ( (initialSrc !== null) && (initialSrc.length > 10) && (initialSrc !== initialUrl) ) {
        checkUrlPromise = checkUrl(checkUrlPromise, initialSrc, null, true); // true -> allow bdsmlr to redirect for original image source link
      }

      checkUrlPromise.then(
        function(result) {
          if ( (result !== null) && (result.length > 10) ) {
            window.location.assign(result);
          }
        }
      );
    };
}


//------------------------------------------------------------
// FIRST PART OF SCRIPT #1 - initial statement and registration of event observer
//------------------------------------------------------------


// script runs NOT in the context of an image - i.e. dashboard, blog stream, individual post
// -> register event observer for future to-be-loaded posts (endless scrolling) and execute first part of script (createImageLinks & displayTimestamps) on already loaded posts
else
{
  
  // create an observer instance and iterate through each individual new node
  var observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      mutation.addedNodes.forEach(function(addedNode) {
        createImageLinks(mutation.target.ownerDocument, addedNode);
        displayTimestamps(mutation.target.ownerDocument, addedNode);
      });
    });    
  });

  // configuration of the observer
  // NOTE: subtree is false as the wanted nodes are direct children of <div class="newsfeed"> -> notable performance improvement
  // "theme1" is the class used by the feed root node for individual user's blog (xxxx.bdsmlr.com) -> seems unstable/temporary name -> might be changed by bdsmlr
  var config = { attributes: false, childList: true, characterData: false, subtree: false };
  // pass in the target node (<div> element contains all stream posts), as well as the observer options
  var postsmatch = document.evaluate(".//div[contains(@class,'newsfeed')] | .//div[contains(@class,'theme1')]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
  var postsnode = postsmatch.singleNodeValue;

  //process already loaded nodes (the initial posts before scrolling down for the first time)
  createImageLinks(document, postsnode);
  displayTimestamps(document, postsnode);

  //start the observer for new nodes
  observer.observe(postsnode, config);


  // also observe the right sidebar blog stream on the dashboard
  // pass in the target node, as well as the observer options
  var sidepostsmatch = document.evaluate(".//div[@id='rightposts']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
  var sidepostsnode = sidepostsmatch.singleNodeValue;
  // sidebar does only exist on dashboard
  if (sidepostsnode) {
    //start the observer for overlays
    observer.observe(sidepostsnode, config);
  }

}
