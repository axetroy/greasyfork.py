// ==UserScript==
// @name        MAL Hide Club Relations
// @namespace   MAL
// @description Hides relaitons on the clubs
// @include     http://myanimelist.net/clubs.php?cid=*
// @version     1.0.2
// ==/UserScript==

function xpath(query, object) {
    if(!object) var object = document;
    return document.evaluate(query, object, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

relationHeader = xpath("//div[@class='normal_header'][contains(text(),'Relations')]");
if (relationHeader.snapshotLength > 0) {
    //Element Placing
    AnchorLink = relationHeader.snapshotItem(0);
    var newElement;

    var checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    AnchorLink.appendChild(checkbox);

    newElement = document.createElement('label');
    newElement.setAttribute('for','firstName');
    newElement.appendChild(document.createTextNode('Hide relations'));
    AnchorLink.appendChild(newElement);
    newElement.style.fontWeight="normal";
    newElement.style.fontSize="10px";

    allElements = xpath("//div[@class='borderClass']");
    allRelations = [];
    j = 0;
    for (var i = 0; i < allElements.snapshotLength; i++) {
        partialHref = allElements.snapshotItem(i).firstChild.href.match(/[^\d]*/i)[0];
        if (partialHref == "http://myanimelist.net/anime.php?id=" || partialHref == "http://myanimelist.net/manga.php?id=" || partialHref == "http://myanimelist.net/character.php?id=") {
            allRelations[j] = allElements.snapshotItem(i);
            j++;
        }
    }

    //Get or Set status of checkbox
    var checkboxmem = (localStorage.getItem('checkboxmem') === "true"); //Get chceckbox status
    if(checkboxmem==null){
        checkboxmem=false;
        localStorage.setItem('checkboxmem', checkboxmem);
        checkbox.checked=checkboxmem;
    }
    else{
        checkbox.checked=checkboxmem;
        if(checkbox.checked==true)
            HideDivs();
    }

    //Listener
    checkbox.addEventListener('change',function () {

        if(checkbox.checked==true){
            HideDivs();
        }

        if(checkbox.checked==false){
            for (var i = 0; i < allRelations.length; i++){
                allRelations[i].removeAttribute('style');
            }
        }

        localStorage.setItem('checkboxmem', checkbox.checked);

    },false);
}

function HideDivs(){
    for (var i = 0; i < allRelations.length; i++){
        allRelations[i].style.display="none";
    }
}