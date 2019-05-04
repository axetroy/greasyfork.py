// ==UserScript==
// @name          Image Map Fixer
// @namespace     DoomTay
// @description   Finds image maps where the image fails to load and add colored blocks to make them more visible.
// @version       1.1.0
// @grant         none

// ==/UserScript==

var pics = document.querySelectorAll("img[usemap]");

for(var i = 0; i < pics.length; i++)
{
	evaluateImage(pics[i]);
}

function evaluateImage(pic)
{
	pic.addEventListener("error", fixMap, true);
	
	function fixMap()
	{
		var picOffset = pic.getBoundingClientRect();
		var map = document.querySelector("[name = " + pic.useMap.substring(1) + "]");
		if(map)
		{
			var svgNs = "http://www.w3.org/2000/svg";
			var newSVG = document.createElementNS(svgNs, "svg");
			newSVG.setAttribute("class", "patchedMap " + map.name);
			newSVG.setAttributeNS(null, "width", pic.width);
			newSVG.setAttributeNS(null, "height", pic.height);
			newSVG.style.position = "absolute";
			newSVG.style.left = Math.round(picOffset.left) + window.scrollX + "px";
			newSVG.style.top = Math.round(picOffset.top) + window.scrollY + "px";
			pic.parentNode.insertBefore(newSVG, pic.nextSibling);
			for(a = 0; a < map.areas.length; a++)
			{
				var newLink = document.createElementNS(svgNs,"a");
				if(map.areas[a].href) newLink.setAttributeNS("http://www.w3.org/1999/xlink", "href", map.areas[a].href);
				if(map.areas[a].getAttribute("shape"))
				{
					switch(map.areas[a].getAttribute("shape").toLowerCase())
					{
						case "rect":
							var parsedCoords = map.areas[a].getAttribute("coords").split(",");
							var coords = {x: parseInt(parsedCoords[0]), y: parseInt(parsedCoords[1])};
							coords.width = parseInt(parsedCoords[2]) - coords.x;
							coords.height = parseInt(parsedCoords[3]) - coords.y;
														
							var rect = document.createElementNS(svgNs, "rect");
							rect.setAttributeNS(null, "x", coords.x);
							rect.setAttributeNS(null, "y", coords.y);
							rect.setAttributeNS(null, "width", coords.width);
							rect.setAttributeNS(null, "height", coords.height);
							rect.setAttributeNS(null, "fill", randomColor()); 
							
							newLink.appendChild(rect);
							break;
						case "circle":
							var parsedCoords = map.areas[a].getAttribute("coords").split(",");
							var coords = {x: parseInt(parsedCoords[0]), y: parseInt(parsedCoords[1]), radius: parseInt(parsedCoords[2])};
														
							var circle = document.createElementNS(svgNs, "circle");
							circle.setAttributeNS(null, "cx", coords.x);
							circle.setAttributeNS(null, "cy", coords.y);
							circle.setAttributeNS(null, "r", coords.radius);
							circle.setAttributeNS(null, "fill", randomColor()); 
							
							newLink.appendChild(circle);
							break;
						case "poly":														
							
							var parsedCoords = map.areas[a].getAttribute("coords").split(",");
							var coords = "";
							for(var c = 0; c < parsedCoords.length; c += 2)
							{
								coords += parsedCoords[c] + "," + parsedCoords[c + 1] + " ";
							}
							
							var poly = document.createElementNS(svgNs, "polygon");
							poly.setAttributeNS(null, "points", coords);
							poly.setAttributeNS(null, "fill", randomColor());
							
							newLink.appendChild(poly);
							break;
						default:
							break;
					}
				}
				else
				{
					var parsedCoords = map.areas[a].getAttribute("coords").split(",");
					var coords = {x: parseInt(parsedCoords[0]), y: parseInt(parsedCoords[1])};
					coords.width = parseInt(parsedCoords[2]) - coords.x;
					coords.height = parseInt(parsedCoords[3]) - coords.y;
												
					var rect = document.createElementNS(svgNs, "rect");
					rect.setAttributeNS(null, "x", coords.x);
					rect.setAttributeNS(null, "y", coords.y);
					rect.setAttributeNS(null, "width", coords.width);
					rect.setAttributeNS(null, "height", coords.height);
					rect.setAttributeNS(null, "fill", randomColor()); 
					
					newLink.appendChild(rect);
				}
				newSVG.appendChild(newLink);
			}
		}
	}
	
	function randomColor() {
		var color = "rgb("
		var colorValues = [];
		for(var c = 0; c < 3; c++)
		{
			colorValues.push(Math.floor(Math.random()*256));
		}
		color += colorValues + ")";
		return color;
	}
}

var observer = new MutationObserver(function(mutations) {
	mutations.forEach(function(mutation) {
		var patchMaps = document.querySelectorAll(".patchedMap");
		observer.disconnect();
		Array.prototype.forEach.call(patchMaps,
			map => {
				var offset = map.parentNode.querySelector("img").getBoundingClientRect();
				map.style.left = Math.round(offset.left) + window.scrollX + "px";
				map.style.top = Math.round(offset.top) + window.scrollY + "px";
			}
		);
		observer.observe(document.body, config);
		if(mutation.target.nodeName == "IMG" && mutation.target.useMap && mutation.target.parentNode.querySelector(".patchedMap"))
		{
			if(mutation.type == "attributes" && mutation.attributeName == "src") mutation.target.parentNode.removeChild(mutation.target.parentNode.querySelector(".patchedMap"));
		}
	});    
});

var config = { attributes: true, subtree: true };
observer.observe(document.body, config);