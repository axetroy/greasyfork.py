// ==UserScript==
// @name         Aeries GPA calculator
// @namespace    MasterPtato
// @version      2.5
// @description  Calculates GPA on aeries.net
// @author       MasterPtato
// @match        https://portal.centerusd.org/student/GradebookSummary.aspx*
// @match        https://portal.centerusd.org/*
// @grant        none
// ==/UserScript==

var newButton = document.createElement('div');
var elemDiv = document.createElement('div');
var isChrome = !!window.chrome && !!window.chrome.webstore;

if(isChrome){
    var style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = '.buttonClass { box-sizing: border-box;-webkit-appearance: none; -webkit-border-radius: 0;background-color:rgb(225,225,225);border: 1px solid rgb(173,173,173)}.buttonClass:hover{background-color:rgb(229,241,251);border: 1px solid rgb(0,120,215)}.buttonClass:focus:hover{background-color:rgb225,225,225);border: 1px solid rgb(0,120,215)}.buttonClass:active{background-color:rgb(204,228,247);border: 1px solid rgb(0,84,153);outline: none}.buttonClass:focus {outline:0;border: 2px solid rgb(0,120,215);}';
    document.getElementsByTagName('head')[0].appendChild(style);
}

elemDiv.style.cssText = 'position:absolute;width:25%;margin-left:37.5%;top:20%;height:auto;z-index:100;background:white;padding:10px;border:5px solid gray; display:none';
elemDiv.style.display = 'none';
elemDiv.id = 'gpaHolder';
elemDiv.innerHTML = '<button id="closeGpa">close</button>';
document.body.appendChild(elemDiv);
newButton.style.paddingLeft = '30px';
newButton.innerHTML = "<button style='width:25%;margin-left:37.5%;font-size: 30px;' id='gpaButt' onclick=''>get GPA</button>";
var elem =document.getElementsByClassName('NoPadding a-expand')[3];
elem.parentNode.insertBefore(newButton, elem.nextSibling);

document.getElementById('gpaButt').onclick = function(e){
    e.preventDefault();
    pa();
    gpa();
}
document.getElementById('closeGpa').onclick = function(e){
    e.preventDefault();
    closeMenu();
}

var paGet = 'test';
document.getElementById('gpaButt').className = 'buttonClass';

function closeMenu(){
    document.getElementById('gpaHolder').style.display = 'none';
}
function gpa(){
        document.getElementById('gpaHolder').style.display = 'block';
        if(document.getElementById('closeGpa').className !== 'buttonClass'){
            document.getElementById('closeGpa').className = 'buttonClass';
        }

        var scores = [];
        var gpa = 0;
        var getItems = document.getElementsByClassName('Data al');
        for(var i = 0; i < getItems.length; i++){
            for(var j = 0; j < getItems[i].childNodes.length; j++){
                if(getItems[i].childNodes[j].tagName == 'SPAN'){
                    var a = getItems[i].childNodes[j].innerHTML;
                    if(a == 'A+' || a == 'A' || a == 'A-' || a == 'B+' || a == 'B' || a == 'B-' || a == 'C+' || a == 'C' || a == 'C-' || a == 'D+' || a == 'D' || a == 'D-' || a == 'F'){
                        scores.push(a);
                    }
                }
            }
        }
        var letter = "letter grades: "+scores.join(', ');
        for(var i = 0; i < scores.length;i++){
            if(scores[i] == 'A+' || scores[i] == 'A'){
                scores[i] = 4;
            }
            if(scores[i] == 'A-'){
                scores[i] = 3.7;
            }
            if(scores[i] == 'B+'){
                scores[i] = 3.3;
            }
            if(scores[i] == 'B'){
                scores[i] = 3;
            }
            if(scores[i] == 'B-'){
                scores[i] = 2.7;
            }
            if(scores[i] == 'C+'){
                scores[i] = 2.3;
            }
            if(scores[i] == 'C'){
                scores[i] = 2;
            }
            if(scores[i] == 'C-'){
                scores[i] = 1.7;
            }
            if(scores[i] == 'D+'){
                scores[i] = 1.3;
            }
            if(scores[i] == 'D'){
                scores[i] = 1;
            }
            if(scores[i] == 'D-'){
                scores[i] = 0.7;
            }
            if(scores[i] == 'F'){
                scores[i] = 0;
            }
            gpa+=scores[i];
        }
        var number = "number grades: "+scores.join(', ');
        elemDiv.innerHTML = '<span><h1>GPA:</h1><br>'+letter+'<br>'+number+'<br><br><strong>GPA: '+Math.round(gpa/scores.length*100)/100+"</strong>     ("+gpa/scores.length+')<h1>Percent Avg:</h1><br>'+paGet+'</span><br><br><button id="closeGpa">close</button>';
        document.getElementById('closeGpa').className = 'buttonClass';
        document.getElementById('closeGpa').onclick = function(e){
            e.preventDefault();
            closeMenu();
        }
}

function eliminateDuplicates(arr) {
  var i,
      len=arr.length,
      out=[],
      obj={};

  for (i=0;i<len;i++) {
    obj[arr[i]]=0;
  }
  for (i in obj) {
    out.push(i);
  }
  return out;
}

function pa(){
	var array = [];
	var pa = 0;
	var getItems = document.getElementsByClassName('Data ac');
	for(var i = 0; i < getItems.length; i++){
		for(var j = 0; j < getItems[i].childNodes.length; j++){
			if(getItems[i].childNodes[j].tagName == 'SPAN'){
				if(!isNaN(getItems[i].childNodes[j].title) && getItems[i].childNodes[j].innerHTML.length > 1){
                    if(getItems[i].childNodes[j].innerHTML != ''){
                        array.push(getItems[i].childNodes[j].innerHTML+'%');
                        pa +=  parseInt(getItems[i].childNodes[j].innerHTML);
                    }
				}
			}
		}
	}
	array = eliminateDuplicates(array);
    paGet = 'separate scores: '+array.join(', ') +'<br><br>'+'<strong>average grade: '+Math.round(pa/2/array.length*100)/100+"%</strong>     ("+pa/2/array.length+")";
}