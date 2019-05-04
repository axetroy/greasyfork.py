// ==UserScript==
// @name         Make Your Own (meaning-generator.com)
// @version      1
// @include      http*://*meaning-generator.com/
// @description  drop your own photos + make your own titles + save with titles
// @namespace    https://jaketheblog.tumblr.com/meaning 
// @grant        none
// ==/UserScript==
window.onload = function(){
  var text;
  var ft;
  var sb;
  var rd;
  var rds;
  var afterAnimationLoad = setInterval(function(){
    text = document.getElementsByClassName("meaning-panel-text");
		if(text.length === 3){
    	clearInterval(afterAnimationLoad);
      ft = document.getElementsByClassName("footer-trigger");
      for(var i = 0; i < ft.length; i++){
       	ft[i].addEventListener("mouseover", function(){
         	var t = document.getElementsByClassName("meaning-panel-text");
					for(var b = 0; b < t.length; b++){
            t[b].blur();
          }
       	});
      }
      sb = document.getElementsByClassName("share-bttns");
      for(var i = 0; i < sb.length; i++){
        rd = document.createElement("a");
        rd.className = "share-bttn";
        rds = document.createElement("span");
        rds.style.backgroundColor = "rgba(0, 234, 255, 0.3)";
        rds.appendChild(
        	document.createTextNode("DL + Custom IMG")
        );
        rd.appendChild(rds);
        rd.href = "#";
        rd.addEventListener("click", function(){
          var canvas = document.createElement("canvas");
          var ctx = canvas.getContext("2d");
          canvas.width = 1800;
          canvas.height = 945;
          var mp = document.getElementsByClassName("meaning-panel");
          var t = document.getElementsByClassName("meaning-panel-text");
          var img;
          var w;
          var fn = "my-meaning";
          for(var p = 0; p < 3; p++){
         		img = mp[p].getElementsByTagName("img")[1];
            ctx.drawImage(img, 0,0, 600, 945, p * 600, 0, 600, 945);
            fn += "-" + t[p].innerText;
          }
          this.download = fn + ".jpg";
          this.href = canvas.toDataURL("image/jpeg");
        });
        sb[i].appendChild(rd);
   			
    		rd = document.createElement("a");
        rd.className = "share-bttn";
        rds = document.createElement("span");
        rds.style.backgroundColor = "rgba(0, 234, 255, 0.3)";
        rds.appendChild(
        	document.createTextNode("DL + Text")
        );
        rd.appendChild(rds);
        rd.href = "#";
        rd.addEventListener("click", function(){
          var canvas = document.createElement("canvas");
          var ctx = canvas.getContext("2d");
          canvas.width = 1800;
          canvas.height = 945;
          var mp = document.getElementsByClassName("meaning-panel");
          var t = document.getElementsByClassName("meaning-panel-text");
          var img;
          var w;
          var fn = "txt-meaning";
          for(var p = 0; p < 3; p++){
         		img = mp[p].getElementsByTagName("img")[1];
            ctx.drawImage(img, 0,0, 600, 945, p * 600, 0, 600, 945);
            fn += "-" + t[p].innerText;
            ctx.font = "bold 72px Arial";
            ctx.fillStyle = "rgb(255, 234, 0)";
            w = ctx.measureText(t[p].innerText).width;
            ctx.fillText(t[p].innerText, 600 * p + (300 - w/2), 545);
          }
          this.download = fn + ".jpg";
          this.href = canvas.toDataURL("image/jpeg");
        });
        sb[i].appendChild(rd);
      }
      var mp;
      var reader  = new FileReader();
      reader.addEventListener("load", function(){
        var img = new Image();
        img.width = 600;
        img.height = 945;
        img.onload = function(){
        	var canvas = document.createElement("canvas");
          var ctx = canvas.getContext("2d");
          canvas.width = 600;
          canvas.height = 945;
          var hRatio = canvas.width  / this.width;
          var vRatio = canvas.height / this.height;
          var ratio  = Math.min (hRatio, vRatio);
          var centerShift_x = (canvas.width - this.width * ratio) / 2;
          var centerShift_y = (canvas.height - this.height * ratio) / 2;  
          ctx.drawImage(
            this,
            0,
            0,
            this.width,
            this.height
          );
          this["data-dropel"].src = canvas.toDataURL("image/jpg");
        };
        img.src = this.result;
				img["data-dropel"] = this["data-dropel"];
      });
      for(var i = 0; i < text.length; i++){
      	text[i].style.cursor = "text";
        var cancelBubble = function(e) {
          var evt = e ? e:window.event;
          if (evt.stopPropagation)    evt.stopPropagation();
          if (evt.cancelBubble!=null) evt.cancelBubble = true;
        }
        mp = text[i].parentNode;
        mp.addEventListener("dragenter", function(event){
          event.preventDefault();
          this.getElementsByTagName("img")[0].style.display = "none";
          this.getElementsByTagName("img")[1].style.display = "none";
          this.style.cursor = "copy";
          this.style.backgroundColor = "#0f0";
        }, false)
        mp.addEventListener("dragleave", function(event){
          event.preventDefault();
          this.style.cursor = null;
          this.getElementsByTagName("img")[0].style.display = null;
          this.getElementsByTagName("img")[1].style.display = null;
          this.style.backgroundColor = null;
        }, false)
        mp.addEventListener("dragover", function(event){
          event.preventDefault();
          this.style.cursor = "copy";
          this.style.backgroundColor = "#0f0";
          this.getElementsByTagName("img")[0].style.display = "none";
          this.getElementsByTagName("img")[1].style.display = "none";
        }, false)
        mp.addEventListener("drop", function(event){
          event.preventDefault();
          this.style.cursor = null;
          this.style.backgroundColor = null;
          this.getElementsByTagName("img")[0].style.display = null;
          this.getElementsByTagName("img")[1].style.display = null;
          reader["data-dropel"] = this.getElementsByTagName("img")[1];
          reader.readAsDataURL(event.dataTransfer.files[0]);
        }, false);
        text[i].addEventListener("click", cancelBubble);
        text[i].addEventListener("mousedown", cancelBubble);
        text[i].addEventListener("mouseup", cancelBubble);
        text[i].setAttribute("contenteditable","true");
        text[i].setAttribute("spellcheck","false");
        text[i].addEventListener("keyup", function(e){
        	var w = (e.which || e.keyCode || e.charCode);
          if(w === 13 || w === 27){
 						this.blur();      
          }
        });
        text[i].addEventListener("blur", function(){
        	this.setAttribute("real-text", this.innerText);
        });
        text[i].addEventListener("DOMNodeInserted", function(e){
          if(
             this.getAttribute("real-text") !== null &&
             this.innerText !== this.getAttribute("real-text")
         	){	
	        	this.innerText = this.getAttribute("real-text");
          }
        });
      }
    }
  },200);
};