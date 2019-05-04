// ==UserScript==
// @name     ArenaVision for Firefox Mobile
// @namespace    StephenP
// @version      1.3.1
// @description  A script that makes browsing ArenaVision website easier on touchscreens.
// @author       StephenP
// @grant    none
// @include http://arenavision.us/guide*
// @include http://arenavision.cc/*
// ==/UserScript==
(function(){
  if(location.href.includes("/guide")==true){
    var table=document.getElementsByTagName("TABLE")[0].cloneNode(true);
    document.body.innerHTML="";
    document.head.innerHTML="";
    var lines=table.getElementsByTagName("TR");
    var totalLines=lines.length-2;
    for(var i=1;i<totalLines;i++){
      try{
        channels=lines[i].children[5].innerHTML.match(/\d+/g).map(Number);
        lines[i].style.border="1px solid black";
        if(i%2==0){
          lines[i].style.backgroundColor="#f2f2f2";
        }
        else{
          lines[i].style.backgroundColor="#e0e0e0";
        }
      }
      catch(err){
        lines[i].parentNode.removeChild(lines[i]);
        i--;
        totalLines--;
      }

    }
    document.body.innerHTML='<style>body{ font-family: Arial;}</style><div id="selector" style="z-index: 3; font-size: 2em; position: fixed; text-align: center; color: white; padding: 0.5em; background-color: #303030; top: 0; left: 0; height: 1.5em; width: 100%;"><div style="margin: auto"><span>Channel: </span><select style="font-size: 1em; width: 30%;" id="ch" name="Channel"><option value=1>1</option><option value=2>2</option><option value=3>3</option><option value=4>4</option><option value=5>5</option><option value=6>6</option><option value=7>7</option><option value=8>8</option><option value=9>9</option><option value=10>10</option><option value=11>11</option><option value=12>12</option><option value=13>13</option><option value=14>14</option><option value=15>15</option><option value=16>16</option><option value=17>17</option><option value=18>18</option><option value=19>19</option><option value=20>20</option><option value=21>21</option><option value=22>22</option><option value=23>23</option><option value=24>24</option><option value=25>25</option><option value=26>26</option><option value=27>27</option><option value=28>28</option><option value=29>29</option><option value=30>30</option><option value=31>31</option><option value=32>32</option><option value=33>33</option><option value=34>34</option><option value=35>35</option><option value=36>36</option><option value=37>37</option><option value=38>38</option><option value=39>39</option><option value=40>40</option> </select><button style="font-size: 1em" id="go">GO!</button></div></div></br></br></br></br>';
    document.body.appendChild(table);
    document.getElementById("go").addEventListener("click", function(){goToChannel()});
  }
  else{
    var links=document.getElementsByTagName("A");
    for(var j=0;j<links.length;j++){
      if(links[j].href.includes("acestream://")){
        var acestream=links[j].href;
        document.body.innerHTML="";
        document.head.innerHTML="";
        location.href=acestream;
      }
    }
  }
})();
function goToChannel(){
    var channel=document.getElementById("ch").value.toString();
    if(channel.length<2){
      channel="0"+channel;
    }
 		window.open("http://arenavision.cc/"+channel);
}