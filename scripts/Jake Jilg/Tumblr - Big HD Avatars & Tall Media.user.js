// ==UserScript==
// @name         Tumblr - Big HD Avatars & Tall Media
// @description  big HD avatar 512px in popover + unsquish tall media 540px wide
// @version      1
// @grant        none
// @namespace    https://jaketheblog.tumblr.com/bigavatars
// @include      https://www.tumblr.com/dashboard
// @include      https://www.tumblr.com/blog/*
// @include      https://www.tumblr.com/like*
// @include      https://www.tumblr.com/tagged/*
// ==/UserScript==
(function(){
  var p = function(e){
    if(skipEvent){
    	return;
    }
    skipEvent = true;
    var postMediaPhoto = document.getElementsByClassName("post_media_photo");
    var avatarSquare = document.getElementsByClassName("avatar");
    for(var i = 0; i < postMediaPhoto.length; i++){
    	if(parseInt(postMediaPhoto[i]["height"]) < 810){
      	continue;
      }
      var h = Math.round(
        	parseInt(postMediaPhoto[i]["height"]) * 
        	(540 / postMediaPhoto[i]["width"])
      );
      postMediaPhoto[i]["width"] = 540;
      postMediaPhoto[i]["height"] = h;
      postMediaPhoto[i]["style"]["height"] = h + "px";
      postMediaPhoto[i]["style"]["width"] = 540 + "px";
      postMediaPhoto[i].parentNode.parentNode.className = "post_media";
      postMediaPhoto[i].src = 
        postMediaPhoto[i].src.replace(
          /_540(\..{2,4})$/, "_1280$1"
        );
    }
    var img;
    var pretty;
    for(var i = 0; i < avatarSquare.length; i++){
      if(avatarSquare[i].className.split(" ").indexOf("square") === -1
      && avatarSquare[i].className.split(" ").indexOf("circle") === -1){
      	continue;
      }
      if(document.getElementById("pretty") !== null){
        continue;
    	}
      pretty = document.createElement("img");
      pretty.id = "pretty";
      img = avatarSquare[i].getElementsByTagName("img")[0];
      pretty["width"] = 512;
      pretty["height"] = 512;
      pretty["style"]["height"] = 512 + "px";
      pretty["style"]["width"] = 512 + "px";
      pretty["style"]["position"] = "fixed";
      pretty["style"]["left"] = "50%";
      pretty["style"]["top"] = "50%";
      pretty["style"]["border-radius"] = "2px";
      pretty["style"]["transform"] = "translate(-50%,-50%)";
      pretty["style"]["box-shadow"] = "0 0 0 9px rgba(255,255,255,0.9)";
      pretty.src = img.src.replace(/_\d{2,4}(\..{2,4})$/, "_512$1");
      avatarSquare[i].parentNode.appendChild(pretty);
    }
    skipEvent = false;
  };
  var skipEvent = false;
  p();
  document.body.addEventListener("DOMNodeInserted", p);
})();