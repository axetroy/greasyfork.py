// ==UserScript==
// @name        DigiKey: Export cart (possibly to BOM)
// @namespace   giferrari.net
// @description Want to save your cart or import it to BOM? This will make a tab-delimited version of your cart.
// @include     http://www.digikey.com/classic/Ordering/AddPart.aspx*
// @version     1
// @grant       none
// ==/UserScript==

function exportCartAsText() {
  /*
  BOM format: (one per line):
  Quantity delimiter Part Number delimiter Customer Reference (optional) where delimiter is a comma or tab.
  Example: 5,P4525-ND,ABC123
  */
  var lines = [];
  $('#ctl00_ctl00_mainContentPlaceHolder_mainContentPlaceHolder_ordOrderDetails tr.detail').each(function(i, tr) {
    var datums = $(tr).find('td');
    var quantity = $(datums[1]).find('input').val();
    var pn = $(datums[3]).text();
    var cref = $(datums[5]).find('input').val().replace(/,/g, ';'); // Text import tool doesn't support commas, bahhh
    lines.push(quantity + '\t' + pn + '\t' + cref);
  });
  
  return lines.join('\n');
}

$('#btnFinishOrder').before(
  $('<input>', { class: 'button', value: 'Script: Export as text' }).click(function() {
    $(this).remove();
    var cartText = exportCartAsText();
    var $content = $('<div>').append(
      $('<p>Exported cart (you can paste this into the <a target="_blank" href="https://www.digikey.com/Classic/Registereduser/TextFileImport.aspx?bom=y&ppp=10">BOM import tool</a>):</p>').css('font-weight', 'bold'),
      $('<pre>').text(cartText)
    ).
    css('background', '#AAA').
    css('padding', '0.5em 1em').
    slideDown();

    $('#pnlAddManually').before($content)
  })
);
