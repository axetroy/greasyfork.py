// ==UserScript==
// @name         Tumblr Dashboard - clickable links to images and display time-stamps
// @namespace    tumblr_dashboard_linkify
// @version      1.2.0
// @license      GNU AGPLv3
// @description  Linkifies all images in the tumblr dashboard stream. The script also displays the time-stamp of each post in the upper right corner.
// @author       marp
// @homepageURL  https://greasyfork.org/en/users/204542-marp
// @include      https://www.tumblr.com/dashboard
// @include      https://www.tumblr.com/dashboard/*
// @include      https://www.tumblr.com/likes
// @include      https://www.tumblr.com/likes/*
// @run-at document-end
// ==/UserScript==

function createImageLinks(myDoc, myContext) {

//console.info("createImageLinks: ", myContext);
  
  if (myDoc===null) myDoc= myContext;
  if (myDoc===null) return;
  if (myContext===null) myContext= myDoc;
  
  var matches;
  var tmpstr;
  var parentnode;
//  var newnode;

  matches=myDoc.evaluate("//div[contains(@class,'post_content')]//img[contains(@class,'post_media_photo') and (contains(@src,'.jpg') or contains(@src,'.png') or contains(@src,'.gif'))] | " +
                         "//div[contains(@class,'post_content')]//figure[contains(@class,'tmblr-full')]/img[contains(@src,'.jpg') or contains(@src,'.png') or contains(@src,'.gif')] | " +
                         "//div[contains(@class,'post_content')]//a[contains(@class,'photoset_photo')]/img[contains(@src,'.jpg') or contains(@src,'.png') or contains(@src,'.gif')]", 
                         myContext, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  for(var i=0, el; (i<matches.snapshotLength); i++) {
    el=matches.snapshotItem(i);
    if (el) {
      try {
//        console.info("matched-element: ", el);
        tmpstr=getHighResImageURL(el.getAttribute("src"), false);
//        console.info("highresurl: ", tmpstr);
        parentnode=el.parentNode;
//        console.info("parentnode: ", parentnode);
        if (parentnode.nodeName.toLowerCase() == "a") {
          if (parentnode.hasAttribute("class") &&
              (parentnode.getAttribute("class").indexOf("post_media_photo") >= 0 ||
               parentnode.getAttribute("class").indexOf("photoset_photo") >= 0) ) {
//            console.info("set parentnode href: ", tmpstr);
            parentnode.setAttribute("href", tmpstr); 
          }
          // if it is a link type but with other style classes -> do nothing
        } else {
          insertLinkElement(myDoc, el, tmpstr);
//          newnode = myDoc.createElement("a");
//          newnode.setAttribute("href", tmpstr);
//          newnode.setAttribute("target", "_blank");
//          console.info("newnode href: ", tmpstr);
//          parentnode.replaceChild(newnode, el);
//          newnode.appendChild(el);
//          console.info("new child of this parent: ", parentnode);
        } 
      } catch (e) { console.warn("error: ", e); }
    }
	}
}


function createImageLinksForBackground(myDoc, myContext) {

  if (myDoc===null) myDoc= myContext;
  if (myDoc===null) return;
  if (myContext===null) myContext= myDoc;
  
  var matches;
  var tmpstr;
  var parentnode;
  var orglink;

  matches=myDoc.evaluate("//div[contains(@class,'post_content')]//div[contains(@class,'post_media')]//a[contains(@class,'link-button') and contains(@class,'has-thumbnail')]/div[contains(@style,'background-image: url(') or contains(@style,'background-image:url(')]", 
                         myContext, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  for(var i=0, el; (i<matches.snapshotLength); i++) {
    el=matches.snapshotItem(i);
    if (el) {
      try {
//        console.info("matched-element: ", el);
        tmpstr = el.style.backgroundImage;
        if (!tmpstr.startsWith("url(")) continue;
				// strip leading url(' / url(" and trailing ') / ")
        tmpstr = tmpstr.substring(5, tmpstr.lastIndexOf(tmpstr.charAt(4)));
        tmpstr=getHighResImageURL(tmpstr, false);
//        console.info("highresurl: ", tmpstr);
        parentnode=el.parentNode; // this is a link(a) element
        orglink = parentnode.getAttribute("href");
        parentnode.removeAttribute("href"); //removing the href causes the a element to act like a div element
        insertLinkElement(myDoc, el, tmpstr); // linkify the div with the background image only (instead of the whole parent element)
        //Now create links to the original URL - but from smaller areas that do NOT overlay the whole image
        el = parentnode.querySelector("div.publisher-container");
        if (el !== null) {
          insertLinkElement(myDoc, el, orglink);
        }  
        el = parentnode.querySelector("div.title");
        if (el !== null) {
          insertLinkElement(myDoc, el, orglink);
        }  
        el = parentnode.querySelector("div.excerpt");
        if (el !== null) {
          insertLinkElement(myDoc, el, orglink);
        }  
      } catch (e) { console.warn("error: ", e); }
    }
	}
}


function displayDateTime(myDoc, myContext) {
  if (myDoc===null) myDoc= myContext;
  if (myDoc===null) return;
  if (myContext===null) myContext= myDoc;
  
  var matches;
  var tmpstr;
  var elements;
  var headernode;
  var linknode;
  var pos;
  var newnode;
  var newnode2;

  matches=myDoc.evaluate("//div[contains(@class,'post_wrapper')]", 
                         myContext, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  for(var i=0, el; (i<matches.snapshotLength); i++) {
    el=matches.snapshotItem(i);
    if (el) {
      try {
//        console.info("matched-element: ", el);
        elements = el.getElementsByClassName("post_header");
        if (elements.length <= 0) continue;
        headernode = elements[0];
        elements = el.getElementsByClassName("post_permalink");
        if (elements.length <= 0) continue;
        linknode = elements[0];
        if (!linknode.hasAttribute("title")) continue;
        tmpstr = linknode.getAttribute("title");
        pos = tmpstr.indexOf(" - ");
        if (pos >= 0) {
          tmpstr = tmpstr.substr(pos+3);
        }
        newnode = myDoc.createElement("div");
        newnode.setAttribute("class", "post_source");
        newnode2 = myDoc.createElement("div");
//        newnode2.setAttribute("class", "post_source_app");
        newnode2.setAttribute("style", "float: right; text-overflow: ellipsis; overflow: hidden;");
        newnode2.textContent = tmpstr;
        newnode.appendChild(newnode2);
        elements = headernode.getElementsByClassName("post_source");
        if (elements.length <= 0) {
          headernode.appendChild(newnode);
        } else {
          headernode.replaceChild(newnode, elements[0]);
        }
      } catch (e) { console.warn("error: ", e) }
    }
	}
}


function insertLinkElement(myDoc, wrapElement, linkTarget) {
	var newnode;
  var parentnode;
  
  newnode = myDoc.createElement("a");
  newnode.setAttribute("href", linkTarget);
  newnode.setAttribute("target", "_blank");
  parentnode = wrapElement.parentNode;
  parentnode.replaceChild(newnode, wrapElement);
  newnode.appendChild(wrapElement);
}


// 2018-08-09 - RAW (original upload) images do not seem to be working anymore
function getHighResImageURL(imageurl, isgetraw) {
  var result = imageurl;
  var tmplen = imageurl.length;
  var pos;
  if ((imageurl.toLowerCase().lastIndexOf(".jpg") == tmplen-4) ||
      (imageurl.toLowerCase().lastIndexOf(".png") == tmplen-4)) {
    if (isgetraw) {
      result = "https://s3.amazonaws.com/data" + 
               imageurl.slice(imageurl.indexOf(".tumblr.com/"), imageurl.lastIndexOf("_")) + 
               "_raw" + 
               imageurl.substring(imageurl.lastIndexOf("."));
    } else {
	    result = imageurl.replace("_250.","_1280.").replace("_400.","_1280.").replace("_500.","_1280.").replace("_540.","_1280.").replace("_640.","_1280.");
    }
  } 
  else if ((imageurl.toLowerCase().lastIndexOf(".gif") == tmplen-4)) {
    if (isgetraw) {
      result = "https://s3.amazonaws.com/data" + 
               imageurl.slice(imageurl.indexOf(".tumblr.com/"), imageurl.lastIndexOf("_")) + 
               "_raw" + 
               imageurl.substring(imageurl.lastIndexOf("."));
    } else {
	    result = imageurl.replace("_250.","_540.").replace("_400.","_540.").replace("_500.","_540.");
    }
  }
  return result;
}


// create an observer instance and iterate through each individual new node
var observer = new MutationObserver(function(mutations) {
  mutations.forEach(function(mutation) {
    mutation.addedNodes.forEach(function(addedNode) {
      createImageLinks(mutation.target.ownerDocument, addedNode);
			createImageLinksForBackground(mutation.target.ownerDocument, addedNode);
      displayDateTime(mutation.target.ownerDocument, addedNode);
    });
  });    
});
 
// configuration of the observer
// NOTE: subtree is false as the wanted nodes are direct children of <ol id="posts"> -> notable performance improvement
var config = { attributes: false, childList: true, characterData: false, subtree: false };
 
// pass in the target node (<ol> element contains all dashboard posts), as well as the observer options
var postsmatch = document.evaluate("//ol[@id='posts']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
//console.info("postsmatch: ", postsmatch);
var postsnode = postsmatch.singleNodeValue;
//console.info("postsnode: ", postsnode);

//process already loaded nodes (the initial posts before scrolling down for the first time)
createImageLinks(document, postsnode);
createImageLinksForBackground(document, postsnode);
displayDateTime(document, postsnode);

//start the observer for new nodes
observer.observe(postsnode, config);
