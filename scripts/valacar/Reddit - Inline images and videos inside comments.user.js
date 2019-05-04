// ==UserScript==
// @name           Reddit - Inline images and videos inside comments
// @namespace      valacar.reddit.inline-media
// @version        0.4.1
// @description    Display linked images and videos inside Reddit comments
// @author         valacar
// @match          https://reddit.com/r/*/comments/*
// @match          https://*.reddit.com/r/*/comments/*
// @match          https://*.reddit.com/user/*
// @compatible     firefox Firefox
// @compatible     chrome Chrome
// @grant          none
// @noframes
// ==/UserScript==

(function() {
  "use strict";

  // config
  const SHOW_IMAGES = true;
  const SHOW_YOUTUBE_VIDEOS = true;
  const SHOW_GIFV_VIDEOS = true;
  const SHOW_VIMEO_VIDEOS = true;
  const SHOW_EBAUMSWORLD_VIDEOS = true;
  const SHOW_GFYCAT_VIDEOS = true;
  const SHOW_WEBM_VIDEOS = true;
  const MAX_IMAGES = 99; // max images to display inline
  const MAX_VIDEOS = 99; // max videos to display inline
  const BANNED_BOTS = ["Mentioned_Videos", "PlaylisterBot", "_youtubot_"]; // case-sensitive

  const DEBUG_MODE = 0;

  function appendStyle(cssString) {
    const parent = document.head || document.documentElement;
    if (parent) {
      const style = document.createElement("style");
      style.setAttribute("type", "text/css");
      style.textContent = cssString;
      parent.appendChild(style);
      return style;
    }
    return null;
  }

  // try get the color of links, otherwise use green
  let linkTextColor = "green";
  try {
    linkTextColor = getComputedStyle(document.querySelector(".entry .tagline a")).color;
  } catch(err) {}

  appendStyle(`
    .iframe-embed,      /* youtube, vimeo, gfycat */
    .video-container,   /* gifv, webm */
    .gfyVid, .gfyitem   /* gfycat */
    {
        display: block !important;
    }

    /* remove background color change when hovering over linked image */
    html a.linked-img:link:hover:not([href^="#"])
    {
        background: none !important;
    }

    .linked-img
    {
      display: block;
    }

    /* achor text, which gets prefixed as SPAN tag */
    .link-text
    {
        color: ${linkTextColor};
        filter: hue-rotate(270deg);
    }
`);

  function debugLog() {
    if (DEBUG_MODE) {
      Function.apply.call(console.log, console, arguments);
    }
  }

  function RemoveUserComment(username) {
    const commentAuthorLink = document.querySelector(
      `.thing a[href="https://www.reddit.com/user/${username}"]`
    );
    if (commentAuthorLink) {
      const comment = commentAuthorLink.closest(".thing");
      comment.remove();
      debugLog(`Removed comment by /u/${username}`);
    }
  }

  // remove comments by bots that just re-list all the videos again
  BANNED_BOTS.forEach(RemoveUserComment);

  // TODO: add MutationObserver to show dynamic content (i.e. clicking "load more comments")

  let totalImages = 0;
  let totalVideos = 0;
  let totalSkippedImages = 0;
  let totalSkippedVideos = 0;

  // TODO:
  //   http://m.imgur.com/r/highqualitygifs/JbyYMzP

  // .ext
  // .ext?1
  // .ext:word
  let imageRegEx = /\.(?:gif|png|jpg|jpeg|jpe)(?:\?1|:\w+|)$/i;

  //let imgurRegEx = /^https?:\/\/(m\.|)imgur\.com\/(\w+)\/?$/i;
  let imgurRegEx = /^(https?:\/\/(?:m\.|)imgur\.com\/(\w+))(?:\?.*)?\/?$/i;
  let imgurRegEx2 = /^https?:\/\/(i\.|)imgur\.com\/(\w+)\.(?:gif|png|jpg|jpeg|jpe)(?:\?noredirect)?$/i;
  // TODO: http://i.imgur.com/Ufbr5ej.mp4

  //https://imgflip.com/i/zbhcm
  let imgflipRexEx = /^https?:\/\/imgflip\.com\/i\/(\w+)/i;

  // https://youtu.be/QdNJIO6wmLw
  let youtube1RegEx = /^https?:\/\/youtu\.be\/(.+)$/i;

  // https://www.youtube.com/watch?v=dJxj1mou03M
  // https://m.youtube.com/watch?v=Lv5qFYJNTbs
  // https://youtube.com/watch?v=dQw4w9WgXcQ
  // https://www.youtube.com/watch?time_continue=8&v=-RjawJ8LImM
  //let youtube2RegEx = /^https?:\/\/(?:www\.|m\.|)youtube\.com\/watch\?v=([^&$]+)/i;
  let youtube2RegEx = /^https?:\/\/(?:www\.|m\.|)youtube\.com\/watch\?(?:.*)v=([^&$]+)/i;

  // https://vimeo.com/14717792
  let vimeoRegEx = /https?:\/\/vimeo\.com\/(\d+)$/i;

  // https://gfycat.com/RemarkablePoliticalEft
  let gfycatRegEx = /^https?:\/\/(?:www\.|)gfycat\.com\/([A-Za-z]+)$/i;

  // http://www.ebaumsworld.com/video/watch/955486/
  let embaumsRegEx = /^https?:\/\/www\.ebaumsworld\.com\/video\/watch\/(\d+)\//i;

  // http://a.pomf.se/pbaemg.webm
  let webmRegEx = /\.webm$/i;

  document.querySelectorAll('.commentarea .usertext-body a[href^="http"]').forEach(function(link) {
    let linkHref = link.href;
    let linkText = link.textContent;
    let imgurCapture;
    let imgFlipCapture;
    let ytCapture1;
    let ytCapture2;
    let vimeoCapture;
    let gyfcatCapture;
    let ebaumsCapture;

    if (SHOW_IMAGES && imageRegEx.test(linkHref)) {


      totalImages++;
      if (totalImages > MAX_IMAGES) {
        totalSkippedImages++;
        return true; // continue to next iteration
      }
      if (linkHref.indexOf("imgur.com") !== -1) {
          linkHref = linkHref.replace("http:", "https:"); // force HTTPS
      }
      debugLog("IMAGE found:", linkHref);
      link.classList.add("linked-img");
      // add title unless it's just an http URL
      if (!linkText.startsWith("http")) {
        link.setAttribute("title", linkText);
        link.insertAdjacentHTML("beforebegin", `<span class="link-text">${linkText}</span>`);
      }
      link.innerHTML = `<img src="${linkHref}" />`;


    } else if (SHOW_IMAGES && (imgurCapture = imgurRegEx.exec(linkHref))) {


      totalImages++;
      if (totalImages > MAX_IMAGES) {
        totalSkippedImages++;
        return true; // continue to next iteration
      }
      linkHref = linkHref.replace("http:", "https:"); // force HTTPS
      debugLog("IMGUR found:", linkHref);
      if (!linkText.startsWith("http")) {
        link.setAttribute("title", linkText);
        link.insertAdjacentHTML("beforebegin", `<span class="link-text">${linkText}</span>`);
      }
      linkHref = linkHref.replace(/\/$/, ""); // remove possible trailing '/'
      link.innerHTML = `<img src="${imgurCapture[1]}.jpg" />`;


    } else if (SHOW_IMAGES && (imgurCapture = imgurRegEx2.exec(linkHref))) {


      totalImages++;
      if (totalImages > MAX_IMAGES) {
        totalSkippedImages++;
        return true; // continue to next iteration
      }
      linkHref = linkHref.replace("http:", "https:"); // force HTTPS
      debugLog("IMGUR2 found:", linkHref);
      if (!linkText.startsWith("http")) {
        link.setAttribute("title", linkText);
        link.insertAdjacentHTML("beforebegin", `<span class="link-text">${linkText}</span>`);
      }
      link.innerHTML = `<img src="${linkHref}" />`;


    } else if (SHOW_IMAGES && (imgFlipCapture = imgflipRexEx.exec(linkHref))) {


      // https://imgflip.com/i/zbhcm -> <img src="https://i.imgflip.com/zbhcm.jpg" /></a>
      totalImages++;
      if (totalImages > MAX_IMAGES) {
        totalSkippedImages++;
        return true; // continue to next iteration
      }
      debugLog("ImgFlip found:", linkHref);
      if (!linkText.startsWith("http")) {
        link.setAttribute("title", linkText);
        link.insertAdjacentHTML("beforebegin", `<span class="link-text">${linkText}</span>`);
      }
      linkHref = linkHref.replace(/\/$/, ""); // remove possible trailing '/'
      link.innerHTML = `<img src="https://i.imgflip.com/${imgFlipCapture[1]}.jpg"/>`;



    } else if (SHOW_GIFV_VIDEOS && linkHref.endsWith(".gifv") && /imgur\.com/.test(linkHref)) {


      totalVideos++;
      if (totalVideos > MAX_VIDEOS) {
        totalSkippedVideos++;
        return true; // continue to next iteration
      }
      debugLog("GIFV found:", linkHref);
      if (!linkText.startsWith("http")) {
        link.insertAdjacentHTML("beforebegin", `<span class="link-text">${linkText}</span>`);
      }
      let gifvBaseFilename = linkHref.split("/").pop().slice(0, -5);
      // insert video tags like they did on https://imgur.com/blog/2014/10/09/introducing-gifv/
      link.innerHTML = `
        <div class="video-container">
           <video loop="" muted="" controls="">
             <source type="video/webm" src="https://i.imgur.com/${gifvBaseFilename}.webm">
             <source type="video/mp4" src="https://i.imgur.com/${ gifvBaseFilename}.mp4">
           </video>
         </div>`;
      let vid = link.getElementsByTagName("video")[0];
      if (vid) {
        vid.pause();
      }


    } else if (SHOW_YOUTUBE_VIDEOS && (ytCapture1 = youtube1RegEx.exec(linkHref))) {


      totalVideos++;
      if (totalVideos > MAX_VIDEOS) {
        totalSkippedVideos++;
        return true; // continue to next iteration
      }
      debugLog("YOUTU.BE found:", linkHref, "- videoID:", ytCapture1[1]);
      if (!linkText.startsWith("http")) {
        link.insertAdjacentHTML("beforebegin", `<span class="link-text">${linkText}</span>`);
      }
      link.outerHTML =
        `<iframe width="640" height="360" src="https://www.youtube-nocookie.com/embed/${ytCapture1[1]}?rel=0" frameborder="0" allowfullscreen class="iframe-embed"></iframe>`;


    } else if (SHOW_YOUTUBE_VIDEOS && (ytCapture2 = youtube2RegEx.exec(linkHref))) {


      totalVideos++;
      if (totalVideos > MAX_VIDEOS) {
        totalSkippedVideos++;
        return true; // continue to next iteration
      }
      debugLog("YOUTUBE.COM found:", linkHref, "- videoID: ", ytCapture2[1]);
      if (!linkText.startsWith("http")) {
        link.insertAdjacentHTML("beforebegin", `<span class="link-text">${linkText}</span>`);
      }
      link.outerHTML =
        `<iframe width="640" height="360" src="https://www.youtube-nocookie.com/embed/${ytCapture2[1]}?rel=0" frameborder="0" allowfullscreen class="iframe-embed"></iframe>`;

      // common resolutions: 560 x 315, 640 x 360, 853 x 480, 1280 x 720


    } else if (SHOW_VIMEO_VIDEOS &&(vimeoCapture = vimeoRegEx.exec(linkHref))) {


      totalVideos++;
      if (totalVideos > MAX_VIDEOS) {
        totalSkippedVideos++;
        return true; // continue to next iteration
      }
      debugLog("VIMEO found:", linkHref, "- videoID: ", vimeoCapture[1]);
      if (!linkText.startsWith("http")) {
        link.insertAdjacentHTML("beforebegin", `<span class="link-text">${linkText}</span>`);
      }
      link.outerHTML =
        `<iframe src="https://player.vimeo.com/video/${vimeoCapture[1]}" width="500" height="375" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen class="iframe-embed"></iframe>`;


    } else if (SHOW_GFYCAT_VIDEOS && (gyfcatCapture = gfycatRegEx.exec(linkHref))) {


      totalVideos++;
      if (totalVideos > MAX_VIDEOS) {
        totalSkippedVideos++;
        return true; // continue to next iteration
      }
      debugLog("GFYCAT found:", linkHref, "- videoID: ", gyfcatCapture[1]);
      if (!linkText.startsWith("http")) {
        link.insertAdjacentHTML("beforebegin", `<span class="link-text">${linkText}</span>`);
      }
//      link.outerHTML = `<div style='position:relative; padding-bottom:75.13%'>
//  <iframe src='https://gfycat.com/ifr/${gyfcatCapture[1]}' frameborder='0' scrolling='no' width='100%' height='100%' style='position:absolute;top:0;left:0;' allowfullscreen></iframe>
//</div>`;
      link.outerHTML = `<div class="gfyitem" data-title=true data-autoplay=false data-controls=true data-id="${gyfcatCapture[1]}"></div>`;


    } else if (SHOW_EBAUMSWORLD_VIDEOS && (ebaumsCapture = embaumsRegEx.exec(linkHref))) {


      totalVideos++;
      if (totalVideos > MAX_VIDEOS) {
        totalSkippedVideos++;
        return true; // continue to next iteration
      }
      debugLog(
        "EBAUMSWORLD found:", linkHref, "- videoID:", ebaumsCapture[1]
      );
      if (!linkText.startsWith("http")) {
        link.insertAdjacentHTML("beforebegin", `<span class="link-text">${linkText}</span>`);
      }
      //<iframe src="http://www.ebaumsworld.com/media/embed/955486" width="567" height="345" frameborder="0"></iframe>
      link.outerHTML =
        `<iframe src="https://www.ebaumsworld.com/media/embed/${ebaumsCapture[1]}" width="567" height="345" frameborder="0"></iframe>`;


    } else if (SHOW_WEBM_VIDEOS && linkHref.match(webmRegEx)) {


      totalVideos++;
      if (totalVideos > MAX_VIDEOS) {
        totalSkippedVideos++;
        return true; // continue to next iteration
      }
      debugLog("WEBM found: ", linkHref);
      if (!linkText.startsWith("http")) {
        link.insertAdjacentHTML("beforebegin", `<span class="link-text">${linkText}</span>`);
      }
      link.outerHTML =
        `<video class="video-container" controls><source src="${linkHref}" type="video/webm"></video>`;


    } else {


      if (linkHref.startsWith("http") && DEBUG_MODE) {
        if (linkHref.match(/\.(?:gif|png|jpg|jpeg|jpe)/)) {
          debugLog("POSSIBLE IMAGE found:", linkHref);
        } else if (linkHref.match(/\.(?:webm|wmv|avi|mpeg|mpe|mpg|mp4|m1v|m2v|mov|qt|divx|asf|asx|ram|rm|rv|vob|ogm|ogg|rmvb|3gp|flv)/)) {
          debugLog("POSSIBLE VIDEO found:", linkHref);
        } else {
          if (!/reddit\.com|redd\.it/.test(linkHref)) {
            debugLog(" OTHER link found:", linkHref);
          }
        }
      }


    }
  });

  debugLog("Total Images:", totalImages, ", skipped", totalSkippedImages);
  debugLog("Total Videos:", totalVideos, ", skipped", totalSkippedVideos);

  // replace broken images with original link (hopefully)
  document.querySelectorAll(".commentarea .usertext-body img").forEach(function(img) {
    img.onerror = (function() {
      let link = img.parentNode;
      if (link) {
        let linkSibling = link.previousElementSibling;
        if (linkSibling) {
          let linkSiblingText = linkSibling.textContent;
          link.outerHTML = `<a data-bad-inline="" href="${img.src}">${linkSiblingText}</a>`;
          linkSibling.remove();
        }
      }
      console.log(":: img load error", img);
    });
  });

  debugLog("---");

  // insert Gfycat script (see https://github.com/gfycat/gfycat.js/tree/master)
  if (SHOW_GFYCAT_VIDEOS) {
      (function(d, s, id){
         var js, fjs = d.getElementsByTagName(s)[0];
         if (d.getElementById(id)) {return;}
         js = d.createElement(s); js.id = id;
         js.src = "https://assets.gfycat.com/gfycat.js";
         fjs.parentNode.insertBefore(js, fjs);
       }(document, 'script', 'gfycat-js'));
  }
})();
