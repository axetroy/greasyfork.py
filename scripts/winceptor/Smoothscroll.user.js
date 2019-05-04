// ==UserScript==
// @name Smoothscroll
// @author       Creec Winceptor
// @description  Smooth scrolling on pages using javascript
// @namespace https://greasyfork.org/users/3167
// @include     *
// @version 8.1
// ==/UserScript==

var Smoothscroll = {};

//dev
Smoothscroll.Debug = false;
Smoothscroll.Refreshrate = 60;

//settings
Smoothscroll.Smoothness = 0.5;
Smoothscroll.Acceleration = 0.5;

//scrolling and animation
function Timeout(element, newtimeout)
{
  if (newtimeout!=undefined)
  {
    var oldtimeout = element.ScrollTimeout;
    if (oldtimeout!=undefined)
    {
      clearTimeout(oldtimeout);
    }
    element.ScrollTimeout = newtimeout;
    return newtimeout;
  }
	else
  {
    var oldtimeout = element.ScrollTimeout;
    if (oldtimeout!=undefined)
    {
      return oldtimeout;
    }
    return null;
  }
}
function ScrollSubpixels(element, newvalue)
{
  if (newvalue!=undefined)
  {
    element.scrollsubpixels = newvalue;
    return newvalue;
  }
	else
  {
    var olddelta = element.scrollsubpixels;
    if (olddelta!=undefined)
    {
      return olddelta;
    }
    return 0;
  }
}
function ScrollPixels(element, newvalue)
{
  if (newvalue!=undefined)
  {
    element.scrollpixels = newvalue;
    
    ScrollSubpixels(element, 0);
    
    return newvalue;
  }
	else
  {
    var olddelta = element.scrollpixels;
    if (olddelta!=undefined)
    {
      return olddelta;
    }
    return 0;
  }
}
function AnimateScroll(target) {
  
  var updaterate = Math.floor(1000/(Smoothscroll.Refreshrate));
  
  var scrollsubpixels = ScrollSubpixels(target);
  var scrollpixels = ScrollPixels(target);

  var scrolldirection = 0;
  if (scrollpixels>0) {
    scrolldirection = 1;
  }
  if (scrollpixels<0) {
    scrolldirection = -1;
  }

  var scrollratio = 1-Math.pow( Smoothscroll.Refreshrate, -1/(Smoothscroll.Refreshrate*Smoothscroll.Smoothness));
  
  var scrollrate = scrollpixels*scrollratio;
  
  if (Math.abs(scrollpixels)>1) {
    
    var fullscrolls = Math.floor(Math.abs(scrollrate))*scrolldirection;
    var scrollsubpixelsadded = scrollrate - fullscrolls;

    var additionalscrolls = Math.floor(Math.abs(scrollsubpixels + scrollsubpixelsadded))*scrolldirection;
    var scrollsubpixelsleft = scrollsubpixels + scrollsubpixelsadded - additionalscrolls;

    ScrollPixels(target, scrollpixels-fullscrolls-additionalscrolls);
    ScrollSubpixels(target, scrollsubpixelsleft);
	
	  target.scrollTop += fullscrolls + additionalscrolls;

    Timeout(target, setTimeout(function() {

      AnimateScroll(target);
    }, updaterate));
  } else
  {
    ScrollPixels(target, 0);
  }
  
}

Smoothscroll.Stop = function(target) {
	if (target) {
		ScrollPixels(target, null);
		Timeout(target, null);
	}
}
Smoothscroll.Start = function(target, scrollamount) {
	if (target) {
		var scrollpixels = ScrollPixels(target);
		
		ScrollPixels(target, scrollamount);
		
		AnimateScroll(target);
	}
}

if (typeof module !== 'undefined') {
	module.exports = Smoothscroll;
}


function CanScroll(element, dir) {

  
  if (dir<0)
	{
	  return element.scrollTop>0;
	}
	if (dir>0)
	{
    if (element==document.body) {
      
      if (element.scrollTop==0) {
        element.scrollTop = 3;
        if (element.scrollTop==0) {
          return false;
        }
        element.scrollTop = 0;
      }
      
      return Math.round(element.clientHeight+element.scrollTop)<(element.offsetHeight);
    } 
		return Math.round(element.clientHeight+element.scrollTop)<(element.scrollHeight);
	}
}
function HasScrollbar(element)
{
  //TODO: problem with webkit, body not scrollable?
  if (element==window || element==document) {
    return false;
  }
  
  if (element==document.body) {
    return window.getComputedStyle(document.body)['overflow-y']!="hidden";
  }  
  
  //THANK YOU TO: https://tylercipriani.com/blog/2014/07/12/crossbrowser-javascript-scrollbar-detection/
  if (element==document.documentElement) {
    return window.innerWidth > document.documentElement.clientWidth;
  } else {
    //return (element.clientWidth-element.clientWidth)>0;
    var style = window.getComputedStyle(element);
    return style['overflow-y']!="hidden" && style['overflow-y']!="visible";
  }

}

function Scrollable(element, dir)
{
  //TODO: problem with webkit, body not scrollable?
  if (element==document.body) {
    //return false;
  }  
  
  var scrollablecheck = CanScroll(element, dir);
  if (!scrollablecheck) {  
    if (Smoothscroll.Debug) {
      console.log("scrollablecheck: " + scrollablecheck);
    }
    return false;
  }  
  
  var scrollbarcheck = HasScrollbar(element);
  if (!scrollbarcheck) {
    if (Smoothscroll.Debug) {
      console.log("scrollbarcheck: " + scrollbarcheck);
    }
    return false;
  }  

  if (Smoothscroll.Debug) {
    console.log("scrollablecheck: " + scrollablecheck);
    console.log("scrollbarcheck: " + scrollbarcheck);
  }
	return true;
}
function GetTarget(e) {
  var direction = e.deltaY;
  var nodes = e.path;
  
  if (Smoothscroll.Debug) {
    console.log("nodes: ");
    console.log(nodes);
  
    console.log("target: ");
  }
  
  for (var i=0; i<(nodes.length); i++) { 
    var node = nodes[i];
    
    if (Smoothscroll.Debug) {
      console.log(node);
    }
    
    if (Scrollable(node, direction))
    {
      if (Smoothscroll.Debug) {
        console.log("true");
        
      }
      return node;
    }
    
   
  }
  if (Smoothscroll.Debug) {
    console.log("false");

  }

  return null;
}



//mouse event scroll handlers
function StopScroll(e) {
  var nodes = e.path;
  
  for (var i=0; i<nodes.length; i++) { 
    var node = nodes[i];
    Smoothscroll.Stop(node);
  }
}
function StartScroll(e, target) {

  if (e.defaultPrevented)
  {
    return true;
  }
  else
  {
	var direction = e.deltaY;

	var scrollpixels = ScrollPixels(target);

	var accelerationratio = Math.sqrt(Math.abs(scrollpixels/direction*Smoothscroll.Acceleration));

	var acceleration = Math.round(direction*accelerationratio);

	Smoothscroll.Start(target, scrollpixels + direction + acceleration);

    e.preventDefault();
  }
}



//mouse event call handlers
function WheelEvent(e) {
  var target = GetTarget(e);

  if (target) {
    StartScroll(e, target);
  }
}
function ClickEvent(e) {
  StopScroll(e);
}



//init function
function Init()
{

  if (window.top != window.self) {
    //console.log("Smoothscroll: ignoring iframe");
    return null;
  }
  if (window.Smoothscroll && window.Smoothscroll.Loaded) {
    //console.log("Smoothscroll: already loaded");
    return null;
  }
  
  document.documentElement.addEventListener("wheel", function(e){
    WheelEvent(e);
    
    if (Smoothscroll.Debug) {
      console.log(e);
    }
  });

  document.documentElement.addEventListener("mousedown", function(e){
    ClickEvent(e);
    
    if (Smoothscroll.Debug) {
      console.log(e);
    }
  });
  
  window.Smoothscroll = Smoothscroll;
  window.Smoothscroll.Loaded = true;
  console.log("Smoothscroll: loaded");
}
Init();
