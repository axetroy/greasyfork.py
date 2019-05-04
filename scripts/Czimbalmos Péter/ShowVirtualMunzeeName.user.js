// ==UserScript==
// @name         ShowVirtualMunzeeName
// @namespace    VirtualMunzee
// @version      0.3
// @description  Show the virtual munzee names on the 'convert' page
// @author       CzPeet
// @match        https://www.munzee.com/m/*/*/admin/convert/
// @update       https://greasyfork.org/en/scripts/373533-showvirtualmunzeename
// ==/UserScript==

var colours = document.querySelectorAll('.form');

var colourName = "";

var specCh = 0;

for (var c=0; c<colours.length; c++)
{
    colours[c].innerHTML = colours[c].innerHTML.replace(/h5/g,'h6');

    colourName = colours[c].children[0].children[0].src;
    colourName = colourName.substring(colourName.indexOf("_")+1);
    colourName = colourName.substring(0,colourName.indexOf("."));

    specCh = (colourName.match(new RegExp("_", "g")) || []).length;
    colourName = colourName.replace(/_/g,' ');

    //ugly hack for the better view
    switch (specCh)
    {
        case 2:
            colourName += "\r\n"
            break;
        case 1:
            colourName += "\r\n\r\n"
            break;
        case 0:
        default:
            colourName += "\r\n\r\n\r\n"
            break;
    }

    colours[c].children[0].children[1].innerText += "\r\n" + colourName;
}