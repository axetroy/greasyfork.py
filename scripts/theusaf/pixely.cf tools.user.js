// ==UserScript==
// @name         pixely.cf tools
// @namespace    http://tampermonkey.net/
// @version      1.4
// @description  Allows you to draw images by uploading and then clicking. MAKE SURE YOUR IMAGES ARE LESS THAN 100x100px
// @author       theusaf
// @match        http://pixely.cf/
// @grant        none
// ==/UserScript==

var drawScale = 10;
window.finalInfo = [];
window.sketchint = 0;
window.isPlacingImage = false;
var di = document.createElement('div'); //div
di.style.background = 'white';
di.style.display = 'none';
di.style.top = "0px";
di.style.position = "fixed";
var im = new Image(); //image
im.crossOrigin = "Anonymous";
var ca = document.createElement('canvas'); //canvas
ca.style.display = 'none';
var fi = document.createElement('input'); //file input
fi.type = 'file';
di.style.float = 'left';
var ct = ca.getContext('2d'); //context

document.body.addEventListener('keydown',toggleFile);

function toggleFile(evt){
    if(evt.keyCode == 16){
        evt.preventDefault();
        di.style.display = di.style.display == "block" ? "none" : "block";
    }
}

fi.onchange = function(e){
    if(!e){
        return;
    }
    var reader = new FileReader();
    reader.onload = function(e){
        im.src = e.target.result;
    }
    reader.readAsDataURL(e.target.files[0]);
}

im.onload = function(){
    console.log('loaded');
    if(im.height > 100 || im.width > 100){
        alert('Image is too big');
        return;
    }
    if(im.src.length > 0){
        //change canvas width and height.
        ca.width = im.width;
        ca.height = im.height;
        ct.drawImage(im,0,0);
        let data = ct.getImageData(0,0,im.width,im.height).data;
        let bestColor = 0;
        let bestPercent = 0;
        finalInfo = [];
        let x = 0;
        let y = 0;
        let maxX = im.width;
        for(let i = 0; i < data.length; i+=4){
            //loop through colors
            /*global colors*/
            if(x == maxX){
                console.log("x has hit max: " + maxX);
                y++;
                x = 0;
            }
            for(let j in colors){
                if(hcd(colors[j],rth(data[i],data[Number(i)+1],data[Number(i)+2])) > bestPercent){
                    bestPercent = hcd(colors[j],rth(data[i],data[Number(i)+1],data[Number(i)+2]));
                    bestColor = j;
                }
            }
            //if alpha is less than 40, dont push.
            if(data[Number(i)+3] <= 40){
                x++;
                bestPercent = 0;
                bestColor = 0;
                continue;
            }
            //now that best color has been set, add to a thingy.
            finalInfo.push({
                x: x,
                y: y,
                c: Number(bestColor)
            });
            x++;
            bestPercent = 0;
            bestColor = 0;
        }
        isPlacingImage = true;
        sketchint = 0;
        drawScale = SCALE;
        console.log(finalInfo);
    }
}

/*global canvas*/
/*global getMousePos*/
/*global isPlacingImage*/
/*global finalInfo*/
/*global si*/
canvas.addEventListener('click',function(e){
    console.log('click!')
    let x = Math.floor(getMousePos(canvas,e).x);
    let y = Math.floor(getMousePos(canvas,e).y);
    if(isPlacingImage){
        console.log('placing image');
        isPlacingImage = false;
        di.style.display = "none";
        //start interval
        /*global io*/
        /*global SCALE*/
        var sketch = setInterval(function(){
            if(finalInfo.length == 0){
                clearInterval(sketch);
                return;
            }
            if(sketchint >= finalInfo.length){
                clearInterval(sketch);
                console.log("done");
                return;
            }
            if(finalInfo[sketchint].x + (x/drawScale) >= 500 || finalInfo[sketchint].y + (y/drawScale) >= 500){
                sketchint++;
                console.log('hit canvas limit');
                return;
            }
            console.log('drawing');
            //adding listener to skip over useless stuff..
            /*global pixels*/
            let ok = false;
            while(!ok){
                if(pixels[finalInfo[sketchint].y + Math.floor(y/drawScale)][finalInfo[sketchint].x + Math.floor(x/drawScale)] == finalInfo[sketchint].c){
                   sketchint++;
                   continue;
                }
                ok = true;
            }
            io.emit('set',{x:finalInfo[sketchint].x + Math.floor(x/drawScale),y:finalInfo[sketchint].y + Math.floor(y/drawScale),c:finalInfo[sketchint].c});
            sketchint++;
        },300);
    }
});

function hcd(hex1, hex2) {
    hex1 = hex1.split("#").length == 1 ? hex1 : hex1.split("#")[1];
    hex2 = hex2.split("#").length == 1 ? hex2 : hex2.split("#")[1];
    // get red/green/blue int values of hex1
    var r1 = parseInt(hex1.substring(0, 2), 16);
    var g1 = parseInt(hex1.substring(2, 4), 16);
    var b1 = parseInt(hex1.substring(4, 6), 16);
    // get red/green/blue int values of hex2
    var r2 = parseInt(hex2.substring(0, 2), 16);
    var g2 = parseInt(hex2.substring(2, 4), 16);
    var b2 = parseInt(hex2.substring(4, 6), 16);
    // calculate differences between reds, greens and blues
    var r = 255 - Math.abs(r1 - r2);
    var g = 255 - Math.abs(g1 - g2);
    var b = 255 - Math.abs(b1 - b2);
    // limit differences between 0 and 1
    r /= 255;
    g /= 255;
    b /= 255;
    // 0 means opposit colors, 1 means same colors
    return (r + g + b) / 3;
} //compare hex values

function rth(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
} //rbg to hex

function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

di.append(fi);
di.append(ca);
document.body.append(di);

//add slider for zoom
let sli = document.createElement('input'); //slider input. changes scale.
sli.type = 'range';
sli.min = 1;
sli.max = 20;
sli.value = 10;
sli.step = 1;
let fdiv = document.getElementById('colorpicker'); //a div that has the colors
fdiv.append(sli);
/*global draw*/
sli.oninput = function(){
    let DIMS = [pixels[0].length, pixels.length];
    SCALE = sli.value;
    canvas.width = SCALE * DIMS[0];
    canvas.height = SCALE * DIMS[1];
    draw(pixels);
    if(isPlacingImage){
        drawScale = SCALE;
    }
}

//hide color picker and slider
document.body.addEventListener('keydown',togglePicker);

function togglePicker(e){
    fdiv.style.display = e.keyCode == 16 ? fdiv.style.display == "none" ? "block" : "none" : fdiv.style.display;
}