// ==UserScript==
// @name          Bitbucket Total Changed Lines
// @namespace     https://bitbucket.org/
// @description   Show total number of added/removed lines
// @match         https://bitbucket.org/*
// @version       0.1
// ==/UserScript==

// a function that loads jQuery and calls a callback function when jQuery has finished loading
function addJQuery(callback) {
  var script = document.createElement('script');
  script.setAttribute('src', '//ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js');
  script.addEventListener('load', function() {
    var script = document.createElement('script');
    script.textContent = 'window.jQ=jQuery.noConflict(true);(' + callback.toString() + ')();';
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

// the guts of this userscript
function main() {
  // jQ replaces $ to avoid conflicts.
  setTimeout(function() {
    var linesAdded = jQ('.lines-added');
    var linesRemoved = jQ('.lines-removed');

    var totalAdded = 0;
    for (var i = 0; i < linesAdded.length; i++) {
      totalAdded += parseInt(jQ(linesAdded[i]).text(), 10);
    }

    var totalRemoved = 0;
    for (var j = 0; j < linesRemoved.length; j++) {
      totalRemoved += parseInt(jQ(linesRemoved[j]).text(), 10);
    }

    $('.iterable-item.file:last').after(
      '<li><div class="commit-file-diff-stats">' +
      '<span class="lines-added">+' + totalAdded + '</span>' +
      '<span class="lines-removed">' + totalRemoved + '</span>' +
      '</div></li>'
    );
  }, 3000);
}

// load jQuery and execute the main function
addJQuery(main);
