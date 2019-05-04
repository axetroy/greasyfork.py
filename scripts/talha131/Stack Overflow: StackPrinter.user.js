// ==UserScript==
// @name           Stack Overflow: StackPrinter
// @namespace      http://userscripts.org/users/gangsta75
// @description    Add Printer-Friendly button to question. This script is forked from http://userscripts-mirror.org/scripts/show/77298 and it add supports for HTTPs
// @include        http*://stackoverflow.com/questions/*
// @include        http*://serverfault.com/questions/*
// @include        http*://superuser.com/questions/*
// @include        http*://stackapps.com/questions/*
// @include        http*://meta.stackoverflow.com/questions/*
// @include        http*://*.stackexchange.com/questions/*
// @include        http*://askubuntu.com/questions/*
// @include        http*://answers.onstartups.com/questions/*
// @include        http*://meta.mathoverflow.net/questions/*
// @include        http*://mathoverflow.net/questions/*
// @version        3.0
// @grant          none
// ==/UserScript==

function ScriptContent () {
  var re = new RegExp('^http[s]*://(.*?).(com|net|org)');
  var group = re.exec(window.location.href);
  var service = group[1];
  var question = $('.vote').find('input[type=hidden]:first').val();
  var url = 'http://www.stackprinter.com/export?format=HTML&service=' + service + '&question=' + question;

  function openUrl() {
    if(!window.open(url)) {
      location.href=url;
    }
  }

  var printDiv = document.createElement('div');
  printDiv.id = 'PrinterFriendly';
  printDiv.style.marginTop = '8px';

  var linkAnchor = document.createElement('a');
  linkAnchor.title = 'Printer-Friendly';
  linkAnchor.addEventListener('click', openUrl, false);

  var image = document.createElement('img');
  image.style.width = '33px';
  image.style.height = '33px';
  image.src = 'http://www.stackprinter.com/images/printer.gif';

  linkAnchor.appendChild(image);
  printDiv.appendChild(linkAnchor);

  var elementQuestion = document.getElementById('question');
  var elementVote = document.getElementsByClassName('vote')[0];
  elementVote.appendChild(printDiv);
}

function AddScript() {
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.text = ScriptContent.toString() + 'ScriptContent();';
  document.body.appendChild(script);
}

AddScript();
