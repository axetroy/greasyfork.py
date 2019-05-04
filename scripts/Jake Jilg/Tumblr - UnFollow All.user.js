// ==UserScript==
// @name         Tumblr - UnFollow All
// @description  Adds UnFollow All Button to Following Page 
// @version      1
// @grant        none
// @namespace    https://jaketheblog.tumblr.com/unfollowall
// @include      https://www.tumblr.com/following
// ==/UserScript==
(function(){
  var memoryElement = document.createElement("input");
  memoryElement.type = "hidden";
  memoryElement.id = "memory-element";
  memoryElement.value = JSON.stringify([]);
  var unFollowAll = function(){
    var xhr = function(){
    	var button = document.getElementById("unfollow-all-button");
      var mem = document.getElementById("memory-element");
			var page = parseInt(button.getAttribute("page"));
			var url = "https://www.tumblr.com/following";
			if(page !== 0){
				url += "/" + page;
			}
			var xhttp = new XMLHttpRequest();
			xhttp.onreadystatechange = function() {
				if(this.readyState === 4 && this.status === 200){
          var button = document.getElementById("unfollow-all-button");
          var mem = document.getElementById("memory-element");
          var page = parseInt(button.getAttribute("page"));
          var following = JSON.parse(mem.value);
          page += 25;
          button.setAttribute("page", page.toString());
					var html = document.createElement("htmlparent");
					html.innerHTML = this.responseText;
					var names = html.getElementsByClassName("name-link");
					for(var i = 0; i < names.length; i++){
						following.push(names[i].innerHTML.replace(/\s+/g,""));
					}
					if(names.length === 0){
						var unfollowFirst = function(firstun){
              var mem = document.getElementById("memory-element");
              var text = document.getElementById("unfollowing-now");
              var button = document.getElementById("unfollow-all-button");
              var following = JSON.parse(mem.value);
              if(following.length > 0){
                if(typeof firstun === "undefined"){
									following.shift();
                  mem.value = JSON.stringify(following);
                }
                text.innerHTML = following[0];
                Tumblr.unfollow({
                   tumblelog: following[0], 
                   success: unfollowFirst
                });
              }else{
              	text.innerHTML = "Every blog is gone. Reload the page.";
                button.parentNode.removeChild(button);
              }
            };
            unfollowFirst(false);
					}else{
						mem.value = JSON.stringify(following);
						xhr();
					}
				}
			};
			xhttp.open("GET", url, true);
			xhttp.send();
		};
		xhr();
  };
  var text = document.createElement("span");
  text.style.color = "#cc3200";
  text.id = "unfollowing-now";
  text.appendChild(
  	document.createTextNode("")
  );
	var button = document.createElement("button");
  button.id = "unfollow-all-button";
  button.setAttribute("page","0");
  button.className = "chrome blue big";
  button.appendChild(
  	document.createTextNode("UnFollow All")
  );
  button.style.margin = "10px";
  button.style.backgroundColor = "#cc3200";
  button.style.borderColor = "#cc3200";
  button.setAttribute(
    "onclick",
    unFollowAll.toString().substring(11).replace(/\}$/,"")
  );
  document.getElementById("invite_someone").
  parentNode.
  insertBefore(
  	button,
    document.getElementById("invite_someone")
  );
  document.getElementById("invite_someone").
  parentNode.
  insertBefore(
  	text,
    document.getElementById("invite_someone")
  );
  document.getElementById("invite_someone").
  parentNode.
  insertBefore(
  	memoryElement,
    document.getElementById("invite_someone")
  );
})();