// ==UserScript==
// @name     copia facile figuccio
// @description basta cliccare sul pulsante per copiare in automatico
// @run-at   document-start
// @version     0.3
// @author      figuccio
// @include     *
// @run-at        document-start
// @namespace https://greasyfork.org/users/237458
// @grant    GM_addStyle
// @require  https://greasyfork.org/scripts/12228/code/setMutationHandler.js
// ==/UserScript==
setMutationHandler({
    target: document.querySelector('._3576'),
    selector: '.copybtnP',
    handler: nodes => nodes.forEach(node =>
          {
          node.setAttribute("style", "color:blue; border: 1px solid green;");
          node.addEventListener('click', function(event) {
              var status_content = event.target.previousSibling;
          getSelection().removeAllRanges();
              var range = document.createRange();
           range.selectNode(status_content);
           window.getSelection().addRange(range);

try {
     var successful = document.execCommand('copy');
     var msg = successful ? 'successful' : 'unsuccessful';
         console.log('Copying text command was ' + msg);
         } catch (err) {console.log('Oops, unable to copy');
                   }

              return false;

          }
         )

})

});
setMutationHandler({
    target: document.querySelector('._3576'),
    selector: '._3576',
processExisting: false,
    handler: nodes => nodes.forEach( node => {

node.style.color = '#f00';
var PostCaption = document.getElementsByClassName('_3576')[0]; console.log(PostCaption.innerText);


setTimeout( function() {
    node.insertAdjacentHTML('afterend','<input type="button" class="copybtnP" name="copyp" value="Copy"/>');
}, 0);
var copyTextareaBtn = document.querySelector('.copybtnP');
    copyTextareaBtn.addEventListener('click', function(event) {
      var copy_text = document.getElementsByClassName("_3576")[0];
     try {var successful = document.execCommand('copy');var msg = successful ? 'successful' : 'unsuccessful';console.log('Copying text command was ' + msg);}
       catch (err) {console.log('Oops, unable to copy');}
    });

})

  }
  );

setMutationHandler(
{
    target: document.querySelector('.fbPhotosPhotoCaption'),
    selector: '.hasCaption',
    handler: nodes => nodes.forEach( node => {node.style.color = '#f00';
    var PhotoCaption = document.getElementsByClassName('hasCaption')[0]; console.log(PhotoCaption.innerText);

if (!document.getElementsByClassName('fbPhotosPhotoCaption')[0].innerHTML.includes('copybtn"')){
    PhotoCaption.insertAdjacentHTML('afterend','<input type="button" class="copybtn" name="copy" value="Copy"/>');
}

var copyTextareaBtn = document.querySelector('.copybtn');

copyTextareaBtn.addEventListener('click', function(event) {
 var copy_text = document.getElementsByClassName("hasCaption")[0];
  var range = document.createRange();
  range.selectNode(copy_text);
  window.getSelection().addRange(range);

try {var successful = document.execCommand('copy');var msg = successful ? 'successful' : 'unsuccessful';console.log('Copying text command was ' );} catch (err) {console.log('Oops, unable to copy');}});})
});

function pad(n, width, z) {
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

