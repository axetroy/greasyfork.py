// ==UserScript==
// @name         [Global] Image Zoomer
// @description	 Allows zooming into images without changing pages. Hold Ctrl+Shift when clicking on an image to load the extension. If the image is a thumbnail of the supported sites, the full image will be loaded instead.
// @author       MetalTxus
// @version      1.3.5

// @include      *
// @exclude      *youtube.com*

// @icon         https://dl.dropbox.com/s/4mnevtuyvt1eden/48.png
// @require      http://code.jquery.com/jquery-3.2.1.min.js
// @namespace https://greasyfork.org/users/8682
// ==/UserScript==

var ENABLED_FOR_LINKS = true;
var preloader = 'https://dl.dropbox.com/s/xbxkvw77dfsrum4/preloader.svg';
var extensions = ['.jpg', '.jpeg', '.png', '.gif'];

function initialize()  {
  $(`<style>
       #giz-container              { position: fixed; top: 0; left: 0; height: 100%; width: 100%; background-color: rgba(0, 0, 0, .9); z-index: 10000; display: none; }
       #giz-container .centered    { position: fixed; left: 50%; top: 50%; }
       #giz-preloader              { margin-left: -32px; margin-top: -33px; z-index: 10001; filter: drop-shadow(0 0 2px rgba(255, 255, 255, 1)); }
       #giz-image                  { max-height: 100%; max-width: 100%; cursor: url(https://dl.dropbox.com/s/32kv0rup3zw5lho/zoom-in.cur), zoom-in; }
       #giz-close                  { width: 32px; height: 32px; right: 0; margin: 4px; position: absolute; display: block; cursor: pointer; background: url(https://dl.dropbox.com/s/7smpm0ohq2ymfey/close.svg); }
     </style>`).appendTo('head');

  var gizContainer = $(`<div id="giz-container">`);
  var gizAnchor = $(`<a target="_blank" id="giz-link">`);
  var gizImage = $(`<img class="centered" id="giz-image">`);
  var gizPreloader = $(`<img class="centered" id="giz-preloader" src="${preloader}">`);
  var gizClose = $(`<span id="giz-close">`);

  gizContainer.click(hideContainer);
  gizClose.click(hideContainer);

  gizAnchor.append(gizImage);
  gizContainer.append(gizAnchor);
  gizContainer.append(gizPreloader);
  gizContainer.append(gizClose);

  $('body').append(gizContainer);

  gizImage.on("load", function (event) {
    var newUrl = event.target.src;
    $('#giz-link')[0].href = newUrl;
    showImage();

  }).on("error", function () {
    var image = $('#giz-image')[0];
    var newUrl, url = image.src;

    for (var i = 0; i < extensions.length; i++) {
      if (url.indexOf(extensions[i]) !== -1) {
        newUrl = url.replace(extensions[i], extensions[i+1]);
        image.src = newUrl;
        break;
      }
    }
  });

  $(document).click(function (event) {
    if (event.ctrlKey && event.shiftKey && event.target.nodeName.toLowerCase() === 'img' && (ENABLED_FOR_LINKS || $(event).parent()[0].target.nodeName !== 'A')) {
      event.preventDefault();
      loadPreview(event.target);
    }
  });

  $(window).resize(function () {
    if ($('#giz-container').is(':visible')) {
      relocateImage();
    }
  });

  console.info('Script "Global Image Zoomer" ready for its use');
}



function loadPreview(element) {
  var newURL = element.src;

  if (newURL !== undefined && element.nodeName === 'IMG') {
    var imageContainer = $('#giz-container');
    var image = $('#giz-image');
    newURL = parseURL(newURL);

    if (removeExtension(newURL) !== removeExtension(image[0].src) && newURL !== preloader) {
      showPreloader();

      image[0].src = newURL;
      $('#giz-link').attr('href', newURL);
    }

    showContainer();
  }
}

function parseURL(url) {
  if (urlContains('deviantart.com')) {
    url = url.replace('/200H/', '/').replace('/150/', '/');

  } else if (urlContains('zerochan.net')) {
    url = url.replace('s3.', 'static.').replace('.240.', '.full.');
  }

  return url;
}

function urlContains(url) {
  return window.location.href.indexOf(url) != -1;
}

function removeExtension(url) {
  if (url) {
    extensions.forEach((extension) => {
      url = url.replace(extension, '');
    });
  }
  return url;
}

function relocateImage() {
  var image = $('#giz-image');
  image.css('margin', `${-Math.ceil(image.height() / 2)}px ${-Math.ceil(image.width() / 2)}px`);
}

function hideContainer() {
  $('#giz-container').fadeOut(100);
}
function showContainer() {
  $('#giz-container').fadeIn(100);
}

function hidePreloader() {
  $('#giz-preloader').hide();
}
function showPreloader() {
  hideImage();
  $('#giz-preloader').show();
}

function hideImage()     {
  $('#giz-image').hide();
}
function showImage() {
  relocateImage();
  hidePreloader();
  $('#giz-image').show();
}

if (!$('#giz-container').length) {
  initialize();
}