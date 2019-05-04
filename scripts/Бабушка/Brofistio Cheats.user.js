// ==UserScript==
// @name         Brofistio Cheats
// @namespace    http://tampermonkey.net/
// @version      0.3
// @description  try to take over the world!
// @author       You
// @match        http*://brofist.io/*
// @grant        none
// ==/UserScript==

/*
 * Authored by CuteLifeBot
 * April 2017
 * For updates and more information go to:
 * https://gist.github.com/CuteLifeBot/f509039ff6259baa32473a362fcda2cf
 * Or use the shortlink: https://goo.gl/F6eCGj
 */

(function() {

var oldGravity = -9.77;
var zoomCoeff = 1600;
window.denyNormalness = false;

// Minimap Coefficients
var MC = {
    x: {
        p: [
            41,
            4110
        ],
        a: [
            -151.68,
            930.08
        ]
    },
    y: {
        p: [
            74,
            691
        ],
        a: [
            26.64,
            -137.46
        ]
    },
    width: 5168,
    height: 1016
}

plyer = false;

function waitForPlay() {
    if(!plyer) {
        setTimeout(waitForPlay, 500);
        return;
    }
    doCheats();
}

function doCheats() {
    console.log("Added cheats!");
    ////// LEFT
    (function() {
        var olddown = window.onkeydown,
            oldup = window.onkeyup;
        var repeat = 0;
        window.onkeydown = function(e) {
            e.keyCode == 100 && (repeat = 1) || olddown(e)
        };
        window.onkeyup = function(e) {
            e.keyCode == 100 && (repeat = 0, 1) && resetNormalness() || oldup(e)
        };
        setInterval(function() {
            if (!repeat) {
                return;
            };
            keyboard.characterStack.push(8)
            plyer.world.gravity = [0, 0];
            plyer.world.useFrictionGravityOnZeroGravity = false;
            plyer.position[0] += -0.03
        }, 10);
    })();
    ////// RIGHT
    (function() {
        var olddown = window.onkeydown,
            oldup = window.onkeyup;
        var repeat = 0;
        window.onkeydown = function(e) {
            e.keyCode == 102 && (repeat = 1) || olddown(e)
        };
        window.onkeyup = function(e) {
            e.keyCode == 102 && (repeat = 0, 1) && resetNormalness() || oldup(e)
        };
        setInterval(function() {
            if (!repeat) {
                return;
            };
            keyboard.characterStack.push(8)
            plyer.world.gravity = [0, 0];
            plyer.world.useFrictionGravityOnZeroGravity = false;
            plyer.position[0] += 0.03
        }, 10);
    })();
    ////// UP
    (function() {
        var olddown = window.onkeydown,
            oldup = window.onkeyup;
        var repeat = 0;
        window.onkeydown = function(e) {
            (e.keyCode == 104 || (e.keyCode == 38 && denyNormalness)) && (repeat = 1) || olddown(e)
        };
        window.onkeyup = function(e) {
            (e.keyCode == 104 || (e.keyCode == 38 && denyNormalness)) && (repeat = 0, 1) && resetNormalness() || oldup(e)
        };
        setInterval(function() {
            if (!repeat) {
                return;
            };
            keyboard.characterStack.push(8)
            plyer.world.gravity = [0, 0];
            plyer.world.useFrictionGravityOnZeroGravity = false;
            plyer.position[1] += 0.03
        }, 10);
    })();
    ////// DOWN
    (function() {
        var olddown = window.onkeydown,
            oldup = window.onkeyup;
        var repeat = 0;
        window.onkeydown = function(e) {
            (e.keyCode == 101 || e.keyCode == 40) && (repeat = 1) || olddown(e)
        };
        window.onkeyup = function(e) {
            (e.keyCode == 101 || e.keyCode == 40) && (repeat = 0, 1) && resetNormalness() || oldup(e)
        };
        setInterval(function() {
            if (!repeat) {
                return;
            };
            keyboard.characterStack.push(8)
            plyer.world.gravity = [0, 0];
            plyer.world.useFrictionGravityOnZeroGravity = false;
            plyer.position[1] += -0.03
        }, 10);
    })();


    ////// SUPER UP
    (function() {
        var olddown = window.onkeydown,
            oldup = window.onkeyup;
        var repeat = 0;
        window.onkeydown = function(e) {
            e.keyCode == 111 && (repeat = 1) || olddown(e)
        };
        window.onkeyup = function(e) {
            e.keyCode == 111 && (repeat = 0, 1) && resetNormalness() || oldup(e)
        };
        setInterval(function() {
            if (!repeat) {
                return;
            };
            keyboard.characterStack.push(8)
            plyer.world.gravity = [0, 0];
            plyer.world.useFrictionGravityOnZeroGravity = false;
            plyer.position[1] += 0.15
        }, 10);
    })();
    ////// SUPER DOWN
    (function() {
        var olddown = window.onkeydown,
            oldup = window.onkeyup;
        var repeat = 0;
        window.onkeydown = function(e) {
            e.keyCode == 98 && (repeat = 1) || olddown(e)
        };
        window.onkeyup = function(e) {
            e.keyCode == 98 && (repeat = 0, 1) && resetNormalness() || oldup(e)
        };
        setInterval(function() {
            if (!repeat) {
                return;
            };
            keyboard.characterStack.push(8)
            plyer.world.gravity = [0, 0];
            plyer.world.useFrictionGravityOnZeroGravity = false;
            plyer.position[1] += -0.15
        }, 10);
    })();
    ////// SUPER LEFT
    (function() {
        var olddown = window.onkeydown,
            oldup = window.onkeyup;
        var repeat = 0;
        window.onkeydown = function(e) {
            e.keyCode == 97 && (repeat = 1) || olddown(e)
        };
        window.onkeyup = function(e) {
            e.keyCode == 97 && (repeat = 0, 1) && resetNormalness() || oldup(e)
        };
        setInterval(function() {
            if (!repeat) {
                return;
            };
            keyboard.characterStack.push(8)
            plyer.world.gravity = [0, 0];
            plyer.world.useFrictionGravityOnZeroGravity = false;
            plyer.position[0] += -0.15
        }, 10);
    })();
    ////// SUPER RIGHT
    (function() {
        var olddown = window.onkeydown,
            oldup = window.onkeyup;
        var repeat = 0;
        window.onkeydown = function(e) {
            e.keyCode == 99 && (repeat = 1) || olddown(e)
        };
        window.onkeyup = function(e) {
            e.keyCode == 99 && (repeat = 0, 1) && resetNormalness() || oldup(e)
        };
        setInterval(function() {
            if (!repeat) {
                return;
            };
            keyboard.characterStack.push(8)
            plyer.world.gravity = [0, 0];
            plyer.world.useFrictionGravityOnZeroGravity = false;
            plyer.position[0] += 0.15
        }, 10);
    })();

    // Text box functions
    (function() {
        // Prepend html
        // imgur / ptZVIHV alternative
        var textHtml="";
        textHtml += "<div id=\"cheats\" style=\"position: absolute; background-color: lightgrey; padding: 5px;\">";
        textHtml += "    X: <input type=\"text\" id=\"positionX\" maxlength=\"8\" size=\"10\"><br\/>";
        textHtml += "    Y: <input type=\"text\" id=\"positionY\" maxlength=\"8\" size=\"10\"><hr\/>";
        textHtml += "    <input type=\"checkbox\" id=\"minimapcb\"> minimap<br\/>";
        textHtml += "    <input type=\"checkbox\" id=\"gravitycb\"> gravity<br\/>";
        textHtml += "    <button type=\"button\" id=\"zombiebt\" onclick=\"confirmZombieMadness();\">Zombie madness!<\/button><hr\/>";
        textHtml += "    Z = <span id=\"zoomElem\">1600<\/span>";
        textHtml += "    <a href=\"https:\/\/gist.github.com\/CuteLifeBot\/f509039ff6259baa32473a362fcda2cf\" style=\"position: relative; float: right; text-decoration: none;\">Help<\/a>";
        textHtml += "<\/div>";
        textHtml += "<div id=\"minimap\" style=\"position: fixed; top: 0; right: 0; width: 50%\">";
        textHtml += "    <img id=\"minimapimg\" src=\"http:\/\/i.imgur.com\/fjM6WpB.png\" width=\"100%\" height=\"100%\" style=\"position: relative; top: 0; left: 0;\"\/>";
        textHtml += "    <svg id=\"minimapsvg\" width=\"100%\" height=\"100%\" style=\"position: absolute; top: 0; left: 0; z-index: 1;\">";
        textHtml += "    <circle id=\"posMarker\" cx=\"0\" cy=\"0\" r=\"3\" stroke=\"red\" stroke-width=\"2\" fill=\"black\"><\/circle>";
        textHtml += "    <\/svg>";
        textHtml += "<\/div>";
        document.body.insertBefore(createFragment(textHtml), document.body.childNodes[0]);
        // Done prepending html
        var olddown = window.onkeydown,
            oldup = window.onkeyup;
        window.onkeydown = function(e) {
            positionFocused() && keyboard.characterStack.push(8) || olddown(e)
            if((e.keyCode == 13) && document.getElementById("positionX") === document.activeElement) {
                document.getElementById("positionY").focus();
                document.getElementById("positionY").select();
            } else if((e.keyCode == 13) && document.getElementById("positionY") === document.activeElement) {
                document.getElementById("positionY").blur();
                plyer.position = [
                    parseFloat(document.getElementById("positionX").value) || -75,
                    parseFloat(document.getElementById("positionY").value) || 0
                ]
            } else if(e.keyCode == 27) {
                document.getElementById("positionX").focus();
                document.getElementById("positionX").select();
            }
        };
        window.onkeyup = function(e) {
            positionFocused() || oldup(e)
        };
        setInterval(function() {
            if (!positionFocused()) {
                document.getElementById("positionX").value = plyer.position[0].toFixed(2);
                document.getElementById("positionY").value = plyer.position[1].toFixed(2);
            }
        }, 100);
    })();

    // Minimap functions
    (function () {
        // Init minimap state
        var oldup = window.onkeyup;

        // Toggle mini map with "7" on numpad
        window.onkeyup = function(e) {
            if (e.keyCode == 103) {
                keyboard.characterStack.push(8);
                if (document.getElementById('minimapcb').checked) {
                    document.getElementById("minimap").style.display = "none";
                    document.getElementById("minimap").style.visibility = "hidden";
                } else {
                    document.getElementById("minimap").style.display = "";
                    document.getElementById("minimap").style.visibility = "visible";
                }
                document.getElementById('minimapcb').checked = !document.getElementById('minimapcb').checked;
            } else {
                oldup(e);
            }
        }

        document.getElementById("minimap").style.display = "none";
        document.getElementById("minimap").style.visibility = "hidden";

        setInterval(function() {
            if (document.getElementById('minimapcb').checked) {
                updateMinimapPosition();
            }
        }, 100);
    })();

    // Gravity toggle
    (function () {
        var oldup = window.onkeyup;

        // Toggle mini map with "7" on numpad
        window.onkeyup = function(e) {
            if (e.keyCode == 105) {
                keyboard.characterStack.push(8);
                if (document.getElementById('gravitycb').checked) {
                    plyer.world.gravity = [0, 0];
                    plyer.world.useFrictionGravityOnZeroGravity = false;
                    window.denyNormalness = true;
                } else {
                    window.denyNormalness = false;
                    resetNormalness();
                }
                document.getElementById('gravitycb').checked = !document.getElementById('gravitycb').checked;
            } else {
                oldup(e);
            }
        }

        document.getElementById('gravitycb').checked = true;
    })();

    // Zoom
    window.addEventListener('mousewheel', function(e){
        if (e.wheelDelta < 0) {
            if (zoomCoeff < 4800) {
                zoomCoeff += 100;
                customZoom(zoomCoeff);
            }
        } else {
            if (zoomCoeff > 1600) {
                zoomCoeff -= 100;
                customZoom(zoomCoeff);
            }
        }
        document.getElementById("zoomElem").innerText = zoomCoeff;
    });

    // Toggle minimap
    document.getElementById('minimapcb').onclick = function() {
        if (document.getElementById('minimapcb').checked) {
            document.getElementById("minimap").style.display = "";
            document.getElementById("minimap").style.visibility = "visible";
            document.getElementById('minimapcb').blur();
        } else {
            document.getElementById("minimap").style.display = "none";
            document.getElementById("minimap").style.visibility = "hidden";
            document.getElementById('minimapcb').blur();
        }
    }

    // Toggle gravity
    document.getElementById('gravitycb').onclick = function() {
        if (!document.getElementById('gravitycb').checked) {
            plyer.world.gravity = [0, 0];
            plyer.world.useFrictionGravityOnZeroGravity = false;
            window.denyNormalness = true;
        } else {
            window.denyNormalness = false;
            resetNormalness();
        }
        document.getElementById('gravitycb').blur();
    }

    // Minimap handle clicks
    document.getElementById('minimap').onmouseup = function(e) {
        var relative_pixel_pos = getRelativeXY(e, 'minimap');
        warpToLocation(relative_pixel_pos);
    }

}

function resetNormalness() {
    if (!window.denyNormalness) {
        plyer.world.gravity = [0, oldGravity];
        plyer.world.useFrictionGravityOnZeroGravity = true;
    }
    return true;
}

function positionFocused() {
    return (document.getElementById("positionX") === document.activeElement || document.getElementById("positionY") === document.activeElement);
}

function createFragment(htmlStr) {
    var frag = document.createDocumentFragment(),
        temp = document.createElement('div');
    temp.innerHTML = htmlStr;
    while (temp.firstChild) {
        frag.appendChild(temp.firstChild);
    }
    return frag;
}

function customZoom(numlevel) {
    window.renderer.resize(window.innerWidth, window.innerHeight);
    window.zoomLevel = window.innerWidth / numlevel;
    "undefined" != typeof editorActive && (zoomLevel = 1);
    graphicsWorld.graphicsLayer.scale.x = zoomLevel;
    graphicsWorld.graphicsLayer.scale.y = zoomLevel;
    for (var p = 0; p < graphicsWorld.textLayer.children.length; p++) {
        var b = graphicsWorld.textLayer.children[p];
        g.isDefined(b.dynamic) || (b.x = b.originalPosition.x * zoomLevel,
        b.y = b.originalPosition.y * zoomLevel,
        b.style.fontSize = b.originalFontSize * zoomLevel)
    }
}

// World location to pixel location on minimap
function aToPminimap(a) {
    var mx = (MC.x.p[1] - MC.x.p[0])/(MC.x.a[1] - MC.x.a[0]);
    var my = (MC.y.p[1] - MC.y.p[0])/(MC.y.a[1] - MC.y.a[0]);
    var bx = MC.x.p[0] - mx*MC.x.a[0];
    var by = MC.y.p[0] - my*MC.y.a[0];
    return {
        x: mx*a.x + bx,
        y: my*a.y + by
    };
}

// Pixel location on minimap to world location
// (inverse of the above function)
function pToAminimap(p) {
    var mx = (MC.x.a[1] - MC.x.a[0])/(MC.x.p[1] - MC.x.p[0]);
    var my = (MC.y.a[1] - MC.y.a[0])/(MC.y.p[1] - MC.y.p[0]);
    var bx = MC.x.a[0] - mx*MC.x.p[0];
    var by = MC.y.a[0] - my*MC.y.p[0];
    return {
        x: mx*p.x + bx,
        y: my*p.y + by
    };
}

// Update minimap position
function updateMinimapPosition() {
    var scale_x = document.getElementById("minimapimg").width / MC.width;
    var scale_y = document.getElementById("minimapimg").height / MC.height;
    var p = aToPminimap({
        x: plyer.position[0],
        y: plyer.position[1]
    });
    p.x = scale_x * p.x;
    p.y = scale_y * p.y;

    document.getElementById("minimapsvg").remove()
    var textHtml = "";
    textHtml += "<svg id=\"minimapsvg\" width=\"100%\" height=\"100%\" style=\"position: absolute; top: 0; left: 0; z-index: 1;\">";
    textHtml += "<circle id=\"posMarker\" cx=\"" + p.x + "\" cy=\"" + p.y + "\" r=\"3\" stroke=\"red\" stroke-width=\"2\" fill=\"black\"><\/circle>";
    textHtml += "<\/svg>";
    document.getElementById("minimap").insertBefore(createFragment(textHtml), document.getElementById("minimap").childNodes[0]);

}

// Warp to position, given a pixel location on the minimap
function warpToLocation(pos) {
    var scale_x = MC.width / document.getElementById("minimapimg").width;
    var scale_y = MC.height / document.getElementById("minimapimg").height;
    var p = {
        x: pos.x * scale_x,
        y: pos.y * scale_y
    };
    var a = pToAminimap(p);
    plyer.position[0] = a.x;
    plyer.position[1] = a.y;
}

// Generic relative mouse clicks
function getRelativeXY(evt, id) {
    var element = document.getElementById(id);  //replace elementId with your element's Id.
    var rect = element.getBoundingClientRect();
    var scrollTop = document.documentElement.scrollTop?
                    document.documentElement.scrollTop:document.body.scrollTop;
    var scrollLeft = document.documentElement.scrollLeft?
                    document.documentElement.scrollLeft:document.body.scrollLeft;
    var elementLeft = rect.left+scrollLeft;
    var elementTop = rect.top+scrollTop;

    if (document.all){ //detects using IE
        x = event.clientX+scrollLeft-elementLeft; //event not evt because of IE
        y = event.clientY+scrollTop-elementTop;
    }
    else{
        x = evt.pageX-elementLeft;
        y = evt.pageY-elementTop;
    }
    return {"x":x, "y":y};
}

window.confirmZombieMadness = function() {
    var doZombieMadness = confirm("Are you sure? This cannot be undone without refreshing!");
    if (doZombieMadness) {
        document.getElementById("zombiebt").disabled = true;
        createZombieMadnessMode();
    } else {
        document.getElementById("zombiebt").blur();
    }
}

function createZombieMadnessMode() {
    modifiedMap = [
        // Beginning of game
        {
            zombie: '{"x":-6613,"y":-42,"width":30,"height":100,"zombieSpeed":250,"dynamic":true}',
            redZone: '{"x":-6613,"y":-42,"width":1000,"height":1000,"dynamic":false}',
            type: "zombie"
        },
        {
            zombie: '{"x":-6100,"y":-42,"width":30,"height":100,"zombieSpeed":100,"dynamic":true}',
            redZone: '{"x":-6100,"y":-42,"width":250,"height":1000,"dynamic":false}',
            type: "zombie"
        },
        {
            zombie: '{"x":-5800,"y":-42,"width":30,"height":100,"zombieSpeed":100,"dynamic":true}',
            redZone: '{"x":-5800,"y":-42,"width":250,"height":1000,"dynamic":false}',
            type: "zombie"
        },
        {
            zombie: '{"x":-5500,"y":-42,"width":30,"height":100,"zombieSpeed":100,"dynamic":true}',
            redZone: '{"x":-5500,"y":-42,"width":250,"height":1000,"dynamic":false}',
            type: "zombie"
        },
        {
            zombie: '{"x":-5250,"y":-42,"width":30,"height":100,"zombieSpeed":100,"dynamic":true}',
            redZone: '{"x":-5250,"y":-42,"width":250,"height":1000,"dynamic":false}',
            type: "zombie"
        },
        {
            zombie: '{"x":-4950,"y":-42,"width":30,"height":100,"zombieSpeed":100,"dynamic":true}',
            redZone: '{"x":-4950,"y":-42,"width":250,"height":1000,"dynamic":false}',
            type: "zombie"
        },
        {
            zombie: '{"x":-4650,"y":-42,"width":30,"height":100,"zombieSpeed":100,"dynamic":true}',
            redZone: '{"x":-4650,"y":-42,"width":250,"height":1000,"dynamic":false}',
            type: "zombie"
        },
        // A little after the beginning (D4)
        {
            zombie: '{"x":600,"y":134,"width":30,"height":100,"zombieSpeed":250,"dynamic":true}',
            redZone: '{"x":600,"y":134,"width":1000,"height":1000,"dynamic":false}',
            type: "zombie"
        },
        {
            zombie: '{"x":-1060,"y":-1054,"width":30,"height":100,"zombieSpeed":250,"dynamic":true}',
            redZone: '{"x":-1060,"y":-1054,"width":1000,"height":1000,"dynamic":false}',
            type: "zombie"
        },
        // Before the first ladder, (E6)
        {
            zombie: '{"x":2500,"y":228,"width":30,"height":100,"zombieSpeed":20,"dynamic":true}',
            redZone: '{"x":2500,"y":228,"width":650,"height":100,"dynamic":false}',
            type: "zombie"
        },
        {
            zombie: '{"x":2749,"y":-1033,"width":30,"height":100,"zombieSpeed":20,"dynamic":true}',
            redZone: '{"x":2749,"y":-1033,"width":650,"height":100,"dynamic":false}',
            type: "zombie"
        },
        {
            block: '{"x":2429,"y":-989,"width":30,"height":10,"color":"0x000000","rotation":0,"alpha":1,"dynamic":false}',
            type: "block"
        },
        // After the first ladder (F6)
        {
            checkPoint: '{"x":4895,"y":-1105,"width":35.011940144638515,"height":70,"dynamic":false}',
            type: "checkPoint"
        },
        {
            zombie: '{"x":4583,"y":-632,"width":30,"height":100,"zombieSpeed":250,"dynamic":true}',
            redZone: '{"x":4583,"y":-632,"width":1000,"height":200,"dynamic":false}',
            type: "zombie"
        },
            {
            zombie: '{"x":4016,"y":-632,"width":30,"height":100,"zombieSpeed":250,"dynamic":true}',
            redZone: '{"x":4016,"y":-632,"width":1000,"height":200,"dynamic":false}',
            type: "zombie"
        },
            {
            zombie: '{"x":3325,"y":-632,"width":30,"height":100,"zombieSpeed":250,"dynamic":true}',
            redZone: '{"x":3325,"y":-632,"width":1000,"height":200,"dynamic":false}',
            type: "zombie"
        },
        // Before the first of 4 long choices
        {
            checkPoint: '{"x":4400,"y":2690,"width":35.011940144638515,"height":70,"dynamic":false}',
            type: "checkPoint"
        },
        {
            zombie: '{"x":3525,"y":2768,"width":30,"height":100,"zombieSpeed":200,"dynamic":true}',
            redZone: '{"x":3525,"y":2768,"width":600,"height":660,"dynamic":false}',
            type: "zombie"
        },
        // During the first of 4 choices and shortly before
        {
            zombie: '{"x":6213,"y":3649,"width":30,"height":100,"zombieSpeed":250,"dynamic":true}',
            redZone: '{"x":6213,"y":3649,"width":1000,"height":300,"dynamic":false}',
            type: "zombie"
        },
        {
            zombie: '{"x":4615,"y":2376,"width":30,"height":100,"zombieSpeed":250,"dynamic":true}',
            redZone: '{"x":4615,"y":2376,"width":600,"height":200,"dynamic":false}',
            type: "zombie"
        },
        {
            zombie: '{"x":4710,"y":2665,"width":30,"height":100,"zombieSpeed":250,"dynamic":true}',
            redZone: '{"x":4710,"y":2665,"width":600,"height":200,"dynamic":false}',
            type: "zombie"
        },
        {
            zombie: '{"x":-6359,"y":2587,"width":30,"height":100,"zombieSpeed":270,"dynamic":true}',
            redZone: '{"x":6359,"y":2587,"width":3000,"height":3000,"dynamic":false}',
            type: "zombie"
        },
        {
            zombie: '{"x":1200,"y":2447,"width":30,"height":100,"zombieSpeed":350,"dynamic":true}',
            redZone: '{"x":1200,"y":2447,"width":3000,"height":300,"dynamic":false}',
            type: "zombie"
        },
        // On the first boring hill and shortly after
        {
            checkPoint: '{"x":-13790,"y":-290,"width":35.011940144638515,"height":70,"dynamic":false}',
            type: "checkPoint"
        },
        {
            zombie: '{"x":-13837,"y":-1367,"width":30,"height":100,"zombieSpeed":200,"dynamic":true}',
            redZone: '{"x":-13837,"y":-1367,"width":300,"height":660,"dynamic":false}',
            type: "zombie"
        },
        {
            zombie: '{"x":-14087,"y":-1367,"width":30,"height":100,"zombieSpeed":200,"dynamic":true}',
            redZone: '{"x":-14087,"y":-1367,"width":300,"height":660,"dynamic":false}',
            type: "zombie"
        },
        {
            zombie: '{"x":-13497,"y":-1367,"width":30,"height":100,"zombieSpeed":200,"dynamic":true}',
            redZone: '{"x":-13497,"y":-1367,"width":300,"height":660,"dynamic":false}',
            type: "zombie"
        },
        {
            zombie: '{"x":-12129,"y":-1369,"width":30,"height":100,"zombieSpeed":250,"dynamic":true}',
            redZone: '{"x":-12129,"y":-1369,"width":1000,"height":660,"dynamic":false}',
            type: "zombie"
        },
        {
            zombie: '{"x":-11279,"y":-1369,"width":30,"height":100,"zombieSpeed":250,"dynamic":true}',
            redZone: '{"x":-11279,"y":-1369,"width":1000,"height":660,"dynamic":false}',
            type: "zombie"
        },
        {
            checkPoint: '{"x":-7150,"y":-279,"width":35.011940144638515,"height":70,"dynamic":false}',
            type: "checkPoint"
        },
        // Long boring part in C6
        {
            poison: '{"x":-6095,"y":-280,"width":200,"height":50,"dynamic":false,"rotation":0}',
            type: "poison"
        },
        {
            block: '{"x":-6203,"y":-285,"width":16,"height":60,"color":"0x000000","rotation":0,"alpha":1,"dynamic":false}',
            type: "block"
        },
        {
            block: '{"x":-5987,"y":-285,"width":16,"height":60,"color":"0x000000","rotation":0,"alpha":1,"dynamic":false}',
            type: "block"
        },
        {
            block: '{"x":-5771,"y":-345,"width":16,"height":180,"color":"0x000000","rotation":0,"alpha":1,"dynamic":false}',
            type: "block"
        },
        {
            poison: '{"x":-5447,"y":-280,"width":200,"height":50,"dynamic":false,"rotation":0}',
            type: "poison"
        },
        {
            block: '{"x":-5555,"y":-285,"width":16,"height":60,"color":"0x000000","rotation":0,"alpha":1,"dynamic":false}',
            type: "block"
        },
        {
            block: '{"x":-5339,"y":-285,"width":16,"height":60,"color":"0x000000","rotation":0,"alpha":1,"dynamic":false}',
            type: "block"
        },
        {
            zombie: '{"x":-5793,"y":-304,"width":30,"height":100,"zombieSpeed":50,"dynamic":true}',
            redZone: '{"x":-5793,"y":-304,"width":1000,"height":1000,"dynamic":false}',
            type: "zombie"
        },
        {
            zombie: '{"x":-5749,"y":-304,"width":30,"height":100,"zombieSpeed":50,"dynamic":true}',
            redZone: '{"x":-5749,"y":-304,"width":1000,"height":1000,"dynamic":false}',
            type: "zombie"
        },
        // Long boring part D7
        {
            zombie: '{"x":-2216,"y":-1612,"width":30,"height":100,"zombieSpeed":250,"dynamic":true}',
            redZone: '{"x":-2216,"y":-1612,"width":1000,"height":1000,"dynamic":false}',
            type: "zombie"
        },
        {
            checkPoint: '{"x":-2148,"y":-1694,"width":35.011940144638515,"height":70,"dynamic":false}',
            type: "checkPoint"
        },
        {
            block: '{"x":-2824,"y":-1282,"width":50,"height":16,"color":"0x000000","rotation":0,"alpha":1,"dynamic":false}',
            type: "block"
        },
        {
            block: '{"x":1514,"y":-592,"width":100,"height":16,"color":"0x000000","rotation":0,"alpha":1,"dynamic":false}',
            type: "block"
        },
        {
            poison: '{"x":1514,"y":-616,"width":100,"height":32,"color":"0x000000","rotation":0,"alpha":1,"dynamic":false}',
            type: "poison"
        },
        {
            zombie: '{"x":1384,"y":-161,"width":30,"height":100,"zombieSpeed":250,"dynamic":true}',
            redZone: '{"x":1384,"y":-161,"width":1000,"height":200,"dynamic":false}',
            type: "zombie"
        },
        {
            zombie: '{"x":-1242,"y":-1719,"width":30,"height":100,"zombieSpeed":250,"dynamic":true}',
            redZone: '{"x":-1242,"y":-1719,"width":1000,"height":200,"dynamic":false}',
            type: "zombie"
        },
        {
            zombie: '{"x":750,"y":-1350,"width":30,"height":100,"zombieSpeed":250,"dynamic":true}',
            redZone: '{"x":750,"y":-1350,"width":1000,"height":200,"dynamic":false}',
            type: "zombie"
        },
        {
            checkPoint: '{"x":4328,"y":-1435,"width":35.011940144638515,"height":70,"dynamic":false}',
            type: "checkPoint"
        },
        // Near end of boring part
        {
            poison: '{"x":8500,"y":-752,"width":100,"height":80,"color":"0x000000","rotation":0,"alpha":1,"dynamic":false}',
            type: "poison"
        },
        {
            poison: '{"x":8700,"y":-752,"width":100,"height":80,"color":"0x000000","rotation":0,"alpha":1,"dynamic":false}',
            type: "poison"
        },
        {
            poison: '{"x":8900,"y":-752,"width":100,"height":80,"color":"0x000000","rotation":0,"alpha":1,"dynamic":false}',
            type: "poison"
        },
        {
            poison: '{"x":9100,"y":-752,"width":100,"height":80,"color":"0x000000","rotation":0,"alpha":1,"dynamic":false}',
            type: "poison"
        },
        {
            poison: '{"x":9300,"y":-752,"width":100,"height":80,"color":"0x000000","rotation":0,"alpha":1,"dynamic":false}',
            type: "poison"
        },
            {
            poison: '{"x":9500,"y":-752,"width":100,"height":80,"color":"0x000000","rotation":0,"alpha":1,"dynamic":false}',
            type: "poison"
        },
        {
            poison: '{"x":9700,"y":-752,"width":100,"height":80,"color":"0x000000","rotation":0,"alpha":1,"dynamic":false}',
            type: "poison"
        },
        {
            poison: '{"x":9900,"y":-752,"width":100,"height":80,"color":"0x000000","rotation":0,"alpha":1,"dynamic":false}',
            type: "poison"
        },
        {
            zombie: '{"x":10512,"y":-811,"width":30,"height":100,"zombieSpeed":250,"dynamic":true}',
            redZone: '{"x":10512,"y":-811,"width":500,"height":1500,"dynamic":false}',
            type: "zombie"
        },
        // Trick required
        {
            poison: '{"x":12079,"y":308,"width":81,"height":50,"color":"0x000000","rotation":0,"alpha":1,"dynamic":false}',
            type: "poison"
        }, {
            poison: '{"x":12388,"y":308,"width":81,"height":50,"color":"0x000000","rotation":0,"alpha":1,"dynamic":false}',
            type: "poison"
        }, {
            poison: '{"x":12698,"y":308,"width":81,"height":50,"color":"0x000000","rotation":0,"alpha":1,"dynamic":false}',
            type: "poison"
        },

    ]

    graphics.parseMap(graphicsWorld, modifiedMap);
    physics.parseMap(physicsWorld, modifiedMap);
}

waitForPlay();
})();