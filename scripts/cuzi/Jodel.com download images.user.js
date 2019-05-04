// ==UserScript==
// @name          Jodel.com download images
// @namespace     cuzi
// @description   Download images from shared Jodel/Yodel posts on share.jodel.com
// @copyright     2018, cuzi (https://openuserjs.org//users/cuzi)
// @license       GPL-3.0-or-later; http://www.gnu.org/licenses/gpl-3.0.txt
// @version       1.0.0
// @include       https://share.jodel.com/post*
// ==/UserScript==

function removeEventListeners(element) {
  var clone = element.cloneNode();
  while (element.firstChild) {
    clone.appendChild(element.lastChild);
  }
  element.parentNode.replaceChild(clone, element);
  return clone;
}

function downloadImage() {
  var img = this.parentNode.parentNode.querySelector("img.theimage");
  document.location.href = img.src;
}

function makeImagesDownloadable() {
  var images = document.querySelectorAll("#jodels-list li.image>img:not([class~=theimage])");
  for(let i = 0; i < images.length; i++) {
    let img = removeEventListeners(images[i]);
    let download = document.createElement("span");
    download.style = "cursor:pointer; margin-left:7pt; font-size:16pt; text-shadow: rgba(0, 0, 0, 0.8) 1px 1px;";
    download.title = "Download image";
    download.className = "time-text"
    download.innerHTML = "&#9047;";
    download.addEventListener("click", downloadImage);
    img.parentNode.querySelector(".row").appendChild(download);
    img.className += " theimage";
  }
  
}


function removeJoinAd() {
  let e = document.getElementById("join-jodel-modal");
  if(e) {
    e.parentNode.removeChild(e);
  }
}

function removeFooter() {
  let e = document.querySelector("nav.navbar.footer");
  if(e) {
    e.parentNode.removeChild(e);
  }
}



window.setInterval(function() {
  removeJoinAd();
  makeImagesDownloadable();
  removeFooter();
  
},500);