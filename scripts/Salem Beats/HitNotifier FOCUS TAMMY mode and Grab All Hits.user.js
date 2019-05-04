// ==UserScript==
// @name         HitNotifier FOCUS TAMMY mode and Grab All Hits
// @author       cuyler
// @namespace    cuyler
// @version      5.2
// @description  Puts a button that will accept all Hits on HitNotifier. Fanout won't work by default on Chrome without disabling popup blocker. Needs to be refactored on the inside, badly.
// @require      http://code.jquery.com/jquery-latest.min.js
// @include      *hitnotifier.com*
// @copyright    2017
// @require  http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @icon         http://ez-link.us/sb-png

// ==/UserScript==

const HIGH_THRESHOLD_VALUE = 1;
const LOW_THRESHOLD_VALUE = 0.10;

var input0=document.createElement("input");
input0.type="button";
input0.value="RESET";
input0.onclick = function(){location.reload(true);};
input0.setAttribute("style", "font-size:18px;position:fixed;top:150px;right:40px;background-color:red;color:white;");
document.body.appendChild(input0);

var input1=document.createElement("input");
input1.type="button";
input1.value="EXPAND";
input1.onclick = expandAll;
input1.setAttribute("style", "font-size:18px;position:fixed;top:250px;right:40px;background-color:green;color:white;");
document.body.appendChild(input1);

var input2=document.createElement("input");
input2.type="button";
input2.value="FANOUT";
input2.onclick = grabAll;
input2.setAttribute("style", "font-size:18px;position:fixed;top:200px;right:40px;background-color:blue;color:white;");
document.body.appendChild(input2);

var input3=document.createElement("input");
input3.type="button";
input3.value="FOCUS";
input3.onclick = cutTheBullshit;
input3.setAttribute("style", "font-size:18px;position:fixed;top:300px;right:40px;background-color:green;color:white;");
document.body.appendChild(input3);

var input4=document.createElement("input");
input4.type="button";
input4.value="NO MASTERS";
input4.onclick = deleteMasters;
input4.setAttribute("style", "font-size:18px;position:fixed;top:350px;right:40px;background-color:yellow;");
document.body.appendChild(input4);

var input5=document.createElement("input");
input5.type="button";
input5.value="NO BATCHES";
input5.onclick = noBatches;
input5.setAttribute("style", "font-size:18px;position:fixed;top:400px;right:40px;background-color:yellow;");
document.body.appendChild(input5);

var input6=document.createElement("input");
input6.type="button";
input6.value="NO CHEAPOS";
input6.onclick = dollarsOnly;
input6.setAttribute("style", "font-size:18px;position:fixed;top:450px;right:40px;background-color:yellow;");
document.body.appendChild(input6);

var input7=document.createElement("input");
input7.type="button";
input7.value="NO PREREQS";
input7.onclick = noPrereqs;
input7.setAttribute("style", "font-size:18px;position:fixed;top:500px;right:40px;background-color:yellow;");
document.body.appendChild(input7);

var input8=document.createElement("input");
input8.type="button";
input8.value="NO BIG FISH";
input8.onclick = noBigFish;
input8.setAttribute("style", "font-size:18px;position:fixed;top:550px;right:40px;background-color:yellow;");
document.body.appendChild(input8);

var globalFoundPandas = [];

var pandaGlowHandle;

function expandAll()
{
    // go to the previous page
    document.querySelector("body > div:nth-child(4) > div:nth-child(1) > div.col-10.card > div > ul > li:nth-child(2) > a").click();

    /*
    var collapsedFields = document.querySelectorAll(".card");

    console.log(collapsedFields);

    for(var i = 0; i < collapsedFields.length; i++)
    {
        console.log(collapsedFields[i]);
        collapsedFields[i].click();
    }
    */

    var collapsedFieldBabies = document.querySelectorAll(".card > div");

    //console.log(collapsedFieldBabies);


    for(var i = 0; i < collapsedFieldBabies.length; i++)
    {
        collapsedFieldBabies[i].classList.remove("collapse");
    }
}

function grabAll()
{
    /*
    $('a[href*="/mturk/preview?"]').each(function(){
        var panda = ($(this).attr('href').replace("preview?", "previewandaccept?"));
        window.open(panda);
    });
    */

    var everythingShowing = document.querySelectorAll(".show");

    console.log("Everything Showing");
    console.log(everythingShowing);

    var allExternalLinks = document.querySelectorAll("a.externalLink");

    console.log("All Proxy Links");
    console.log(allExternalLinks);

    var numberOfPandasFound = 0;

    for(var i = 0; i < allExternalLinks.length; i++)
    {
        var currentExternalLinkHref = String(allExternalLinks[i].getAttribute("href"));

        //console.log("current href is " + currentProxyLinkAttribute);

        if(currentExternalLinkHref.match(".*previewandaccept.*"))
        {
            //allProxyLinks[i].click();
            console.log("matched " + currentExternalLinkHref);
            numberOfPandasFound++;
            window.open(currentExternalLinkHref);
            //browser.tabs.create({url: currentProxyLinkAttribute});
        }
    }
    console.log("Found " + String(numberOfPandasFound) + " PandAs");
}

function cutTheBullshit()
{
    document.body.classList.remove("bg-primary");
    document.body.style.transition = "background-color 3.0s";
    document.body.style.backgroundColor = "black";

    var heading = document.querySelector("h3");
    heading.innerHTML = '<div id="headingDiv" style="color:white;">FOCUS TAMMY</div>';
    
    heading.addEventListener("onmouseover", function() {
        console.log("overtammy");
    });

    var allMastersSpans = document.querySelectorAll("span[style=\"color: red\"]");

    var allThinBorderedElements = document.querySelectorAll(".accordion");
    for(var i = 0; i < allThinBorderedElements.length; i++)
    {
        allThinBorderedElements[i].style.borderWidth = "8px";
        if(allThinBorderedElements[i].innerText.toUpperCase().includes("MASTERS"))
        {
            allThinBorderedElements[i].style.backgroundColor = "#ffcccc";
        }
        else if(allThinBorderedElements[i].innerText.toUpperCase().includes("HAS BEEN GRANTED"))
        {
            allThinBorderedElements[i].style.backgroundColor = "#ffffcc";
        }
    }

    for(var i = 0; i < allMastersSpans.length; i++)
    {
        allMastersSpans[i].parentElement.style.backgroundColor = "#ffcccc";
    }

    var greenShit = document.querySelectorAll("span[style=\"color: green\"], [color='green']");

    for (var i = 0; i < greenShit.length; i++)
    {
        //console.log("object");
        //console.log(greenShit[i]);
        //console.log("textcontent " + greenShit[i].textContent);

        if(greenShit[i].textContent.includes("$"))
        {
            var hitValue = Number(greenShit[i].textContent.replace(/[^0-9\.]+/g,""));

            if(hitValue >= HIGH_THRESHOLD_VALUE)
            {
                greenShit[i].style.border = "8px solid green";
            }
            else if(hitValue <= LOW_THRESHOLD_VALUE)
            {
                greenShit[i].style.border = "8px dashed green";
            }
            else
            {
                greenShit[i].style.color = "red";
            }

            greenShit[i].style.transition = "all 0.5s";
            greenShit[i].style.fontSize = "3.0em";
        }
    }

    var allExternalLinks = document.querySelectorAll("a");

    for(var i = 0; i < allExternalLinks.length; i++)
    {
        var currentExternalLinkHref = String(allExternalLinks[i].getAttribute("href"));

        if(currentExternalLinkHref.match(".*previewandaccept.*"))
        {
            allExternalLinks[i].style.transition = "all 0.2s";
            allExternalLinks[i].style.fontSize = "5.0em";

            allExternalLinks[i].insertAdjacentHTML('beforebegin',"<br/>");

            globalFoundPandas.push(allExternalLinks[i]);
        }
        else if(currentExternalLinkHref.match(".*preview.*"))
        {
            allExternalLinks[i].style.fontSize = "1.5em";
            allExternalLinks[i].style.color = "black";

            allExternalLinks[i].setAttribute("href", "javascript:void(0)");

            //allExternalLinks[i].style.transition = "all 0.5s linear 0.2s";

            allExternalLinks[i].addEventListener("mouseover", function() {
                this.style.color = "black";
                this.style.textDecoration = "line-through";
            });

            allExternalLinks[i].addEventListener("mouseout", function() {
                this.style.color = "black";
                this.style.textDecoration = "";
            });

            allExternalLinks[i].addEventListener("click", function() {
                this.style.color = "black";
                this.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.style = "display:none;";
            });



        }
    }
}

function deleteMasters()
{
    var allThinBorderedElements = document.querySelectorAll(".accordion");

    for(var i = 0; i < allThinBorderedElements.length; i++)
    {
        if(allThinBorderedElements[i].innerText.toUpperCase().includes("MASTERS"))
        {
            allThinBorderedElements[i].style = "display:none;"
        }
    }
}

function noBatches()
{
    var spans = document.querySelectorAll("span,b");

    for(var i = 0; i < spans.length; i++)
    {
        if(spans[i].textContent.includes("$"))
        {
            var hitValue = Number(spans[i].textContent.replace(/[^0-9\.]+/g,""));

            var parentDivLocator = spans[i].parentElement;
            while(parentDivLocator.nodeName !== "DIV") {parentDivLocator = parentDivLocator.parentElement;}

            if(hitValue >= HIGH_THRESHOLD_VALUE)
            {

            }
            else if(hitValue <= LOW_THRESHOLD_VALUE)
            {
                parentDivLocator.style = "display:none;";
            }
            else
            {
            }
        }
    }
}

function findFirstDivTypeParent(element)
{
    var parentDivLocator = element;
    while(parentDivLocator.nodeName !== "DIV") {parentDivLocator = parentDivLocator.parentElement;}
    return parentDivLocator;
}

function dollarsOnly()
{
    var spans = document.querySelectorAll("span,b");

    for(var i = 0; i < spans.length; i++)
    {
        if(spans[i].textContent.includes("$"))
        {
            var hitValue = Number(spans[i].textContent.replace(/[^0-9\.]+/g,""));

            var parentDivLocator = findFirstDivTypeParent(spans[i]);

            if(hitValue >= HIGH_THRESHOLD_VALUE)
            {

            }
            else if(hitValue <= LOW_THRESHOLD_VALUE)
            {
            }
            else
            {
                parentDivLocator.style = "display:none;";

            }
        }
    }
}

function noPrereqs()
{
    var allThinBorderedElements = document.querySelectorAll(".accordion");

    for(var i = 0; i < allThinBorderedElements.length; i++)
    {
        if((!allThinBorderedElements[i].innerText.toUpperCase().includes("MASTERS")) && allThinBorderedElements[i].innerText.toUpperCase().includes("HAS BEEN GRANTED"))
        {
            allThinBorderedElements[i].style = "display:none;";
        }
    }
}

function noBigFish()
{
    var spans = document.querySelectorAll("span,b");

    for(var i = 0; i < spans.length; i++)
    {
        if(spans[i].textContent.includes("$"))
        {
            var hitValue = Number(spans[i].textContent.replace(/[^0-9\.]+/g,""));

            var parentDivLocator = findFirstDivTypeParent(spans[i]);

            if(hitValue >= HIGH_THRESHOLD_VALUE)
            {
                parentDivLocator.style = "display:none;";
            }
            else if(hitValue <= LOW_THRESHOLD_VALUE)
            {
            }
            else
            {


            }
        }
    }
}



// Make Pandas glow

pandaGlowHandle = setInterval(function() {

    //console.log("timeout");

    if(globalFoundPandas.length > 0)
    {
        for(var i = 0; i < globalFoundPandas.length; i++)
        {
            //console.log("global found pandas: ", globalFoundPandas[i]);

            var currentElement = globalFoundPandas[i];

            currentElement.style.transition = "all 2.0s";

            if (currentElement.style.backgroundColor == "" )
            {
                currentElement.style.backgroundColor = "#8cf442";
            }
            else
            {
                currentElement.style.backgroundColor = "";
            }
        }
    }
},1000);

// for now, let's not do the panda animation behavior
clearInterval(pandaGlowHandle);
