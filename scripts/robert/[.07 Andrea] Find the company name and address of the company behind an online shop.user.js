// ==UserScript==
// @name        [.07 Andrea] Find the company name and address of the company behind an online shop 
// @author robert
// @namespace   https://greasyfork.org/en/users/13168-robert
// @description Autofill country, hide instructions, open link in new window
// @include     https://www.mturkcontent.com/dynamic/hit*
// @version     1
// @grant       none
// @require  http://code.jquery.com/jquery-2.1.0.min.js
// ==/UserScript==
var hideInstructions = true;
var country = "United Kingdom";
if (hideInstructions)
{ 
    $(".panel-body").hide();
    $(".panel-heading").click
    (
        function() 
        {    
            $(".panel-body").toggle();
        }
    );
}
if ( $("label:contains('Locality:')").length )
{
  var url = $("a:contains('http')").text();
  $("input[id='Country']").val(country);
  window.open(url, "MsgWindow", '_blank', 'toolbar=0,location=0,menubar=0');
}