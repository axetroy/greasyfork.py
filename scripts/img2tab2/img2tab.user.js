// ==UserScript==
// @name img2tab
// @namespace Violentmonkey Scripts
// @match *://boards.4chan.org/*/thread/*
// @include       http://boards.4chan.org/*
// @include       https://boards.4chan.org/*
// @grant none
// @description:en Lightbox gallery from linked images and videos (for 4chan, can be easily ported to other sites)
// @version 0.23
// @description Lightbox gallery from linked images and videos (for 4chan, can be easily ported to other sites)
// ==/UserScript==

var multiLineCSS = `
#lightboxGallery { display: block;
                  position: absolute;
                  left: 0;
                  top: 0;
                  z-index: 999;
                  width: 100%;
                  text-align: center;
                  background-color: black;
                  overflow: auto }
#lightboxGallery a { color: #666; }
#lightboxGallery p { padding: 1em 0;
                     margin: 0 }
#lightboxGallery p:nth-child(even) { background-color: #333; }
#lightboxGallery * { max-width: 100%; }
#lightboxBackground { display: flex;
                      position: fixed;
                      left: 0;
                      top: 0;
                      width: 100%;
                      height: 100%;
                      background-color: black;
                      color: white;
                      text-align: center;
                      align-items: flex-end;
                      justify-content: center; }
#removeButton { display: inline-block;
                width: 1.2em;
                height: 1.2em;
                border-radius: 0.6em;
                text-overflow: clip;
                color: white;
                background-color: black;
                opacity: 0.5;
                position: fixed;
                top: 1em;
                right: 2em;
                font-size: 2em;
                font-weight; bold;
                text-align: center; }
#removeButton:focus,
#removeButton:hover { color: #999;
                       text-decoration: none;
                       cursor: pointer; }
`

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) {
        head = document.createElement('head');
        document.getElementsByTagName('html')[0].appendChild(head);
    }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle(multiLineCSS);

var galleryButton = document.createElement('a');
galleryButton.href = '#'
galleryButton.id = 'galleryButton';
galleryButton.innerHTML = ' [Gallery]';
document.getElementsByClassName('navLinks desktop')[0].appendChild(galleryButton);

document.getElementById("galleryButton").addEventListener(
    "click", generateGallery, false
);

function inArray(elem, array) {
    if (array.indexOf) {
        return array.indexOf(elem);
    }

    for (var i = 0, length = array.length; i < length; i++) {
        if (array[i] === elem) {
            return i;
        }
    }
    return -1;
}

function removeGallery() {
    document.getElementById('lightboxGallery').outerHTML = '';
    document.getElementById('lightboxBackground').outerHTML = '';
    scroll(0, 0);
}

function generateGallery() {
    var links = content.document.getElementsByTagName('a');
    var imageUrls = new Array();
    var count = 0;
    for (var i = 0; i < links.length; i++) {
        var url = links[i].href;
        if (url.match(/.+\.(jpg|gif|png|webm|mp4)|.*imgur\.com\/([m]|[a-z]|[A-Z]|[0-9]|[\/]|(.(jpg|gif|png|gifv)))+/im)) {
            if (inArray(url, imageUrls) == -1) {
                var matches = url.match("imgur\.com/(\\w+)");
                if (matches != null) {
                    var imgurId = matches[1];
                    url = "http://i.imgur.com/" + imgurId + ".jpg";
                }
                imageUrls[count] = url;
                count++;
            }
        }
    }

    var gallery = document.createElement('div');
    var removeButton = '<span id="removeButton">&times;</span>'
    gallery.id = 'lightboxGallery';
    gallery.innerHTML = imageUrls.reduce(function(s, url) {
        if (url.match(/.(webm|mp4)/im)) {
            return s + '<p><video src="' + url + '" controls></video></p>';
        } else {
            return s + '<p><img src="' + url + '" /></p>';
        }
    }, "") + removeButton;
    document.getElementsByClassName('navLinks desktop')[0].appendChild(gallery);
    var lightboxBackground = document.createElement('div');
    lightboxBackground.id = 'lightboxBackground';
    lightboxBackground.innerHTML = '<span>END</span>';
    document.getElementsByTagName('body')[0].appendChild(lightboxBackground);
    document.getElementById('removeButton').addEventListener(
        "click", removeGallery, false
    );
    scroll(0, 0);
}