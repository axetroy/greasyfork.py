// ==UserScript==
// @name         Twitter - clickable links to images and show uncropped thumbnails
// @namespace    twitter_linkify
// @version      1.1.1
// @license      GNU AGPLv3
// @description  Linkifies all images in the Twitter Home stream. These links point to the :orig version while the stream content is modified to use the :small variant to increase performance. Thumbnail images in the stream are modified to display uncropped.
// @author       marp
// @homepageURL  https://greasyfork.org/en/users/204542-marp
// @include      https://twitter.com/
// @include      https://twitter.com/*
// @include      https://pbs.twimg.com/media/*
// @exclude      https://twitter.com/settings
// @exclude      https://twitter.com/settings/*
// @run-at document-end
// ==/UserScript==

function createImageLinks(myDoc, myContext) {

//console.info("createImageLinks: ", myContext);
  
  if (myDoc===null) myDoc= myContext;
  if (myDoc===null) return;
  if (myContext===null) myContext= myDoc;
  
  var matches;
  var tmpstr;

  matches=myDoc.evaluate("//div[contains(@class,'AdaptiveMedia-photoContainer')]/img",
                         myContext, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  for(var i=0, el; (i<matches.snapshotLength); i++) {
    el=matches.snapshotItem(i);
    if (el) {
      try {
//        console.info("matched-element: ", el);
        tmpstr=getCleanImageURL(el.getAttribute("src"), false);
//        console.info("cleanurl: ", tmpstr);
        // only need ":small" variant for stream/thumbnail display (save bandwidth and increase performance)
        el.setAttribute("src", tmpstr+":small");
        // create correct link to ":orig" image - best way to access is by opening in new tab via "middle-click")
        insertLinkElement(myDoc, el, tmpstr+":orig", getFilename(tmpstr));
        // try to scale the thumbnail image so that it displays fully and uncropped within the available space
        // This does not do a real aspect ratio calc but uses a "trick" by analysing how Twitter was positioning the cropped image
        tmpstr=el.getAttribute("style");
        if (tmpstr !== null) {
          if (tmpstr.toLowerCase().includes("top") ) {
            el.setAttribute("style", "height: 100%; width: auto");
          } 
          else if (tmpstr.includes("left")) {
            el.setAttribute("style", "height: auto; width: 100%");
          } 
        }
      } catch (e) { console.warn("error: ", e); }
    }
	}
}


function insertLinkElement(myDoc, wrapElement, linkTarget, downloadName) {
	var newnode;
  var parentnode;
  
  newnode = myDoc.createElement("a");
  newnode.setAttribute("href", linkTarget);
  newnode.setAttribute("target", "_blank");
  newnode.setAttribute("download", downloadName);
  parentnode = wrapElement.parentNode;
  parentnode.replaceChild(newnode, wrapElement);
  newnode.appendChild(wrapElement);
}


function getCleanImageURL(imageurl) {
  var pos = imageurl.toLowerCase().lastIndexOf(":");
  var pos2 = imageurl.toLowerCase().indexOf("/");
  if (pos >= 0 && pos > pos2) {
    return imageurl.substring(0, pos);
  } else {
    return imageurl; 
  }
}


function getFilename(imageurl) {
  return getCleanImageURL(imageurl).substring(imageurl.toLowerCase().lastIndexOf("/")+1);
}


// Two very different actions depending on if this is on twitter.com or twing.com
if (window.location.href.includes('pbs.twimg.com/media')){

  var image = document.querySelector('img');
  var url = image.src;
  insertLinkElement(document, image, getCleanImageURL(url)+":orig", getFilename(url));

}
else 
{

  // create an observer instance and iterate through each individual new node
  var observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      mutation.addedNodes.forEach(function(addedNode) {
        createImageLinks(mutation.target.ownerDocument, addedNode);
      });
    });    
  });

  // configuration of the observer
  // NOTE: subtree is false as the wanted nodes are direct children of <ol id="posts"> -> notable performance improvement
  var config = { attributes: false, childList: true, characterData: false, subtree: false };
  // pass in the target node (<ol> element contains all stream posts), as well as the observer options
  var postsmatch = document.evaluate("//ol[@id='stream-items-id']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
  var postsnode = postsmatch.singleNodeValue;

  //process already loaded nodes (the initial posts before scrolling down for the first time)
  createImageLinks(document, postsnode);

  //start the observer for new nodes
  observer.observe(postsnode, config);
  
  
  // also observe the overlay node - this is the node used when opening an individsual post as overlay
  // NOTE: subtree is true here as the wanted nodes are ancestors of the node used as observer root
  var config2 = { attributes: false, childList: true, characterData: false, subtree: true };
  // pass in the target node, as well as the observer options
  var overlaymatch = document.evaluate("//div[contains(@class,'PermalinkOverlay-content')]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
  var overlaynode = overlaymatch.singleNodeValue;
  //start the observer for overlays
  observer.observe(overlaynode, config2);
  
}
