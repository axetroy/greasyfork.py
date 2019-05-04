// ==UserScript==
// @name         YouTube Download
// @namespace    http://your.homepage/
// @version      4.5.2
// @description  On youtube click the download link to download youtube video.
// @author       Henry Harris
// @match        https://www.youtube.com/*
// @match        http://9xbuddy.com/*
// @grant        none
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js
// @run-at document-end
// ==/UserScript==





$(document).ready ( function(){
// -----------------------Runs on YOUTUBE--------------------------------------------------------------	   
	var beforestop = false;
    var ThumbPRun = 0;
    var ThumbCurUrl;
    var WasPlaying;
    
    setInterval(function(){
    if(window.location.href.indexOf("you") > -1) {
        if ($('#container').length > 0) {
    		if ($('#downloadlnk').length > 0) {
    		
            } else {
                
                
                
                 if ($('.html5-player-chrome').length > 0) {
                     
                     if ($('#vidctrls').length > 0) {
                     
                     } else{
                         
                         document.querySelector('div.html5-player-chrome').id = 'vidctrls';

                         var c = document.createElement('img');
                         c.src = "http://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Egypt_governorates_blank.png/597px-Egypt_governorates_blank.png";
                         c.height = "30";
                         c.width = "10";
                         
                         
                         var b = document.createElement('img');
                         b.src = "http://images.clipartpanda.com/square-clip-art-black-and-white-0999d59a768fa638a6f16f4a44299e29.png";
                         b.height = "30";
                         b.width = "30";
                         b.title = "Download this video";
                         b.onclick = function () {
                             window.open("http://9xbuddy.com/download?url=" + document.URL);
                         };

                         document.getElementById("vidctrls").appendChild(c);
                         document.getElementById("vidctrls").appendChild(b);
                     }
                     
                 } else {
                
                var downdiv = document.createElement("div");
                downdiv.id = "downdiv";
                
                
                var a = document.createElement('a');
            var linkText = document.createTextNode("Download");
            a.appendChild(linkText);
            a.id = "downloadlnk";
            a.title = "Download this video";
            a.onclick = function () {
                window.open("http://9xbuddy.com/download?url=" + document.URL);
            };
                
                     
                     
                     var br3 = document.createElement('br');
            document.getElementsByClassName("style-scope ytd-video-primary-info-renderer")[0].appendChild(br3);
                     
                     var br4 = document.createElement('br');
            document.getElementsByClassName("style-scope ytd-video-primary-info-renderer")[0].appendChild(br4);
                     
                     var setimg = document.createElement('img');
                     setimg.width = 27;
                     setimg.length = 27;
                     setimg.src = "http://pngimages.net/sites/default/files/gear-logo-png-image-100818.png";
                     
                     var dwnimg = document.createElement('img');
                     dwnimg.width = 27;
                     dwnimg.length = 27;
                     dwnimg.src = "http://www.clipartbest.com/cliparts/bTy/EX8/bTyEX8prc.png";
            
                 
                     var d = document.createElement('a');
            var linkText = document.createTextNode("Options");
            d.appendChild(linkText);
            d.id = "optionlnk";
            d.title = "Options";
            d.onclick = function () {
                var e = document.body;
                e.parentNode.removeChild(e);
                
                var body = document.createElement('body');
                document.getElementsByTagName('html')[0].appendChild(body);
                
                var chk1 = document.createElement('input');
                chk1.type = "checkbox";
                chk1.id = "chk1";
                document.getElementsByTagName('body')[0].appendChild(chk1);
                
                var label1 = document.createElement('label');
                //labe1l.htmlFor = "chk1";
                label1.appendChild(document.createTextNode('Auto HD + remove video ads'));
                document.getElementsByTagName('body')[0].appendChild(label1);
                
                var br = document.createElement('br');
            document.getElementsByTagName('body')[0].appendChild(br);
                
                var chk2 = document.createElement('input');
                chk2.type = "checkbox";
                chk2.id = "chk2";
                document.getElementsByTagName('body')[0].appendChild(chk2);
                
                var label2 = document.createElement('label');
                //labe12.htmlFor = "chk2";
                label2.appendChild(document.createTextNode('Loop videos'));
                document.getElementsByTagName('body')[0].appendChild(label2);
                
                var br4 = document.createElement('br');
            document.getElementsByTagName('body')[0].appendChild(br4);
                
                var chk3 = document.createElement('input');
                chk3.type = "checkbox";
                chk3.id = "chk3";
                document.getElementsByTagName('body')[0].appendChild(chk3);
                
                var label3 = document.createElement('label');
                //labe13.htmlFor = "chk2";
                label3.appendChild(document.createTextNode('Force Flash'));
                document.getElementsByTagName('body')[0].appendChild(label3);
                
                var br5 = document.createElement('br');
            document.getElementsByTagName('body')[0].appendChild(br5);
                
                var chk4 = document.createElement('input');
                chk4.type = "checkbox";
                chk4.id = "chk4";
                document.getElementsByTagName('body')[0].appendChild(chk4);
                
                var label4 = document.createElement('label');
                //labe1l.htmlFor = "chk1";
                label4.appendChild(document.createTextNode('Auto-Buffer'));
                document.getElementsByTagName('body')[0].appendChild(label4);
                
                var br3 = document.createElement('br');
            document.getElementsByTagName('body')[0].appendChild(br3);
                
                var chk5 = document.createElement('input');
                chk5.type = "checkbox";
                chk5.id = "chk5";
                document.getElementsByTagName('body')[0].appendChild(chk5);
                
                var label5 = document.createElement('label');
                //labe13.htmlFor = "chk2";
                label5.appendChild(document.createTextNode('Thumbnail Previews'));
                document.getElementsByTagName('body')[0].appendChild(label5);
                
                var br6 = document.createElement('br');
            document.getElementsByTagName('body')[0].appendChild(br6);
                
                 var br2 = document.createElement('br');
            document.getElementsByTagName('body')[0].appendChild(br2);
                
                var appbtn = document.createElement('input');
                appbtn.type = "button";
                appbtn.value = "Apply";
                appbtn.onclick = function () {
                    if (chk1.checked === true) {
                      document.cookie =
                          'autohd=test; expires=Fri, 3 Aug 2050 20:47:11 UTC; path=/';
                    } else {
                      document.cookie = 'autohd=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/';
                    }
                    
                    if (chk2.checked === true) {
                        document.cookie =
                          'loop=test; expires=Fri, 3 Aug 2050 20:47:11 UTC; path=/';
                    } else {
                        document.cookie = 'loop=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/';
                    }
                    
                    if (chk3.checked == true) {
                        document.cookie =
                          'oldplyr=test; expires=Fri, 3 Aug 2050 20:47:11 UTC; path=/';
                    } else {
                        document.cookie = 'oldplyr=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/';
                    }
                    
                    if (chk3.checked === true && chk1.checked === true) {
                        alert("Auto-HD and Old Player are incompatible, please disable one of them.");
                    } else {
                        location.reload();
                    }
                    
                    if (chk4.checked == true) {
                        document.cookie =
                          'abuff=test; expires=Fri, 3 Aug 2050 20:47:11 UTC; path=/';
                    } else {
                        document.cookie = 'abuff=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/';
                    }
                    
                    if (chk5.checked == true) {
                        document.cookie =
                          'ThumbP=test; expires=Fri, 3 Aug 2050 20:47:11 UTC; path=/';
                    } else {
                        document.cookie = 'ThumbP=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/';
                    }
                    
                };
                document.getElementsByTagName('body')[0].appendChild(appbtn);
                
                if (document.cookie.indexOf('autohd=')== -1) {
                    chk1.checked = false;
                } else {
                    chk1.checked = true; 
                }
                
                if (document.cookie.indexOf('loop=')== -1) {
                    chk2.checked = false;
                } else {
                    chk2.checked = true; 
                }
                
                if (document.cookie.indexOf('oldplyr=')== -1) {
                    chk3.checked = false;
                } else {
                    chk3.checked = true; 
                }
                
                if (document.cookie.indexOf('abuff=')== -1) {
                    chk4.checked = false;
                } else {
                    chk4.checked = true; 
                }
                
                if (document.cookie.indexOf('ThumbP=')== -1) {
                    chk5.checked = false;
                } else {
                    chk5.checked = true; 
                }
                
            };
            
            //document.body.appendChild(a);
            document.getElementsByClassName("style-scope ytd-video-primary-info-renderer")[0].appendChild(downdiv);
            console.log("TEST: " + document.getElementsByClassName("style-scope ytd-video-primary-info-renderer")[0]);
            document.getElementById("downdiv").appendChild(dwnimg);
            document.getElementById("downdiv").appendChild(a);
            document.getElementById("downdiv").appendChild(br3);
            document.getElementById("downdiv").appendChild(br4);
            document.getElementById("downdiv").appendChild(setimg);
            document.getElementById("downdiv").appendChild(d);
            document.getElementById("downloadlnk").style.fontSize = "x-large";
            document.getElementById("optionlnk").style.fontSize = "x-large";
            document.getElementById("downloadlnk").style.cursor = "pointer";
            document.getElementById("optionlnk").style.cursor = "pointer";
            var br1 = document.createElement('br');
            document.getElementsByClassName("style-scope ytd-video-primary-info-renderer")[0].appendChild(br1);
            var br2 = document.createElement('br');
            document.getElementsByClassName("style-scope ytd-video-primary-info-renderer")[0].appendChild(br2);
            
                
            }
    	}
	}
        
    }

        if (document.cookie.indexOf('autohd=')== -1) {
            //no cookie
         } else {
            
             if (beforestop == false) {
             var myNode = document.getElementById("movie_player");
             while (myNode.firstChild) {
                 myNode.removeChild(myNode.firstChild);
                 beforestop = true;
             }

             var url = document.URL;
             url = url.substring(0, url.length - 8);
             var vidid = url.substring(url.indexOf('=')+1);
             
             
             var player = document.createElement('iframe');
             player.id = "player1";
             player.width = "1920";
             player.height = "1080";
             player.src = "https://www.youtube.com/embed/" + vidid + "?rel=0&autoplay=1&VQ=HD720";
             player.frameborder = "0";
             document.getElementById("movie_player").appendChild(player);
             document.getElementById("player1").setAttribute("allowfullscreen", "true");
                 
             setTimeout(function(){
    
             document.getElementById("player1").width = "855";
             document.getElementById("player1").height = "480";
    
            
             }, 15000);
             }
             var url = document.URL;
             var idtest = url.substring(url.indexOf('=')+1);
             
             if (idtest === vidid){
                 
             } else {
                 
                
                
             }
         }
        
        
        
        if (document.URL.indexOf('watch?v=') > -1) {
        if (document.cookie.indexOf('oldplyr=')== -1) {
            if (document.URL.indexOf("&nohtml5=1") > -1) {
                var strpos = document.URL.indexOf("&nohtml5=1");
                //strpos = strpos + 9;
                var nurl = "";
                for (i = 0; i <= document.URL.length; i++) {
                    if (i >= strpos && i <= strpos + 9) {
                        //delete by ignoring
                    } else {
                        nurl = nurl + document.URL.charAt(i);
                    }
                }
                
                window.location.assign(nurl);
                console.log(nurl);
            }
         } else {
            if (document.URL.indexOf("&nohtml5=1") > -1) {
                
            } else {
                window.location.assign(document.URL + "&nohtml5=1");
            }
         }
        }
        
    }, 2000);
    
    
    
    setInterval(function(){
        if (document.cookie.indexOf('autohd=')== -1) {
            
        } else {
        if(window.location.href.indexOf("you") > -1) {
        if(window.location.href.indexOf("embed") > -1) {
        
        } else {
        if(window.location.href.indexOf("reldone") > -1) {
            
        } else {
          
            window.location.assign(document.URL + "#reldone");
            location.reload();
        }
        }
        }
        }
        }, 4000);
    
    //ThumbP Code
        setInterval(function(){
            if (document.cookie.indexOf('ThumbP=')== -1) {
            
            } else {
                if(window.location.href.indexOf("you") > -1) {
                    if(window.location.href.indexOf("watch") > -1) { //video pages
                        if (document.getElementsByClassName("yt-uix-simple-thumb-wrap yt-uix-simple-thumb-related").length == ThumbPRun) {
                            
                        } else {
                            var vwidth = document.getElementsByClassName("yt-uix-simple-thumb-wrap yt-uix-simple-thumb-related")[ThumbPRun].children[0].width;
                            var vheight = document.getElementsByClassName("yt-uix-simple-thumb-wrap yt-uix-simple-thumb-related")[ThumbPRun].childNodes[0].height;
                            //document.getElementsByClassName("yt-thumb-simple")[ThumbPRun].removeChild(document.getElementsByClassName("yt-thumb-simple")[ThumbPRun].children[0]); -delete thumbnail image (old)
                            
                            var Tvid = document.createElement("iframe");
                            Tvid.src = "https://www.youtube.com/embed/" +  document.getElementsByClassName("yt-uix-simple-thumb-wrap yt-uix-simple-thumb-related")[ThumbPRun].parentNode.href.split('=')[1] + "?controls=0&iv_load_policy=3&autoplay=1&showinfo=0&vq=small#ThumbP";
                            Tvid.width = vwidth;
                            Tvid.height = vheight;
                            Tvid.style.display = "none";
                            document.getElementsByClassName("yt-uix-simple-thumb-wrap yt-uix-simple-thumb-related")[ThumbPRun].appendChild(Tvid);
                            
                            document.getElementsByClassName("yt-uix-simple-thumb-wrap yt-uix-simple-thumb-related")[ThumbPRun].onmouseout=function(){
                                this.children[0].style.display = "inline";
                                this.children[1].style.display = "none";
                                if (WasPlaying === true) {
                                    document.getElementsByClassName("video-stream html5-main-video")[0].play();
                                    WasPlaying = false;
                                }
                            };
                            document.getElementsByClassName("yt-uix-simple-thumb-wrap yt-uix-simple-thumb-related")[ThumbPRun].onmouseover=function(){
                                this.children[0].style.display = "none";
                                this.children[1].style.display = "inline";
                                if (document.getElementsByClassName("video-stream html5-main-video")[0].paused === false) {
                                    WasPlaying = true;
                                    document.getElementsByClassName("video-stream html5-main-video")[0].pause();
                                }
                            };
                            
                            ThumbPRun = ThumbPRun + 1
                        }
                    } else { // other pages
                        if (document.getElementsByClassName("yt-thumb-simple").length == ThumbPRun) {
                            
                        } else {
                            var vwidth = document.getElementsByClassName("yt-thumb-simple")[ThumbPRun].children[0].width;
                            var vheight = document.getElementsByClassName("yt-thumb-simple")[ThumbPRun].childNodes[0].height;
                            //document.getElementsByClassName("yt-thumb-simple")[ThumbPRun].removeChild(document.getElementsByClassName("yt-thumb-simple")[ThumbPRun].children[0]); -delete thumbnail image (old)
                            
                            var Tvid = document.createElement("iframe");
                            Tvid.src = "https://www.youtube.com/embed/" +  document.getElementsByClassName("yt-thumb-simple")[ThumbPRun].parentNode.parentNode.href.split('=')[1] + "?controls=0&iv_load_policy=3&autoplay=1&showinfo=0&vq=small#ThumbP";
                            Tvid.width = vwidth;
                            Tvid.height = vheight;
                            Tvid.style.display = "none";
                            document.getElementsByClassName("yt-thumb-simple")[ThumbPRun].appendChild(Tvid);
                            
                            document.getElementsByClassName("yt-thumb-simple")[ThumbPRun].onmouseout=function(){
                                this.children[0].style.display = "inline";
                                this.children[1].style.display = "none";
                            };
                            document.getElementsByClassName("yt-thumb-simple")[ThumbPRun].onmouseover=function(){
                                this.children[0].style.display = "none";
                                this.children[1].style.display = "inline";
                            };
                            
                            ThumbPRun = ThumbPRun + 1
                        }
                    }
                }
            }
        }, 500);
    
    setInterval(function(){
            if (document.cookie.indexOf('ThumbP=')== -1) {
            
            } else {
                
                if(window.location.href.indexOf("embed") > -1) {
                    
                } else {
                    if (ThumbCurUrl == document.URL) {

                    } else {
                        ThumbPRun = 0;
                        ThumbCurUrl = document.URL;
                    }
                }
                
                if(window.location.href.indexOf("ThumbP") > -1) {
                    if(window.location.href.indexOf("embed") > -1) {
                        if ($('#player:hover').length != 0) {
                            document.getElementsByClassName("video-stream html5-main-video")[0].play();
                        } else {
                            document.getElementsByClassName("video-stream html5-main-video")[0].pause();
                        }
                    } else {
                        
                    }
                }
            }
        }, 200);
    
    setInterval(function(){
        if (window.location.href.indexOf("watch") > -1){
        if (document.cookie.indexOf('loop=')== -1){
            
        } else {
        var curtime = document.getElementsByClassName('ytp-time-current')[0].innerHTML;
        var endtime = document.getElementsByClassName('ytp-time-duration')[0].innerHTML;
        if (curtime === endtime){
         document.getElementsByClassName("ytp-play-button ytp-button")[0].click();
        }
        }
        }
        }, 1000);
    
    setInterval(function(){
        if (window.location.href.indexOf("embed") > -1){
        if (document.cookie.indexOf('loop=')== -1){
            
        } else {
        var curtime = document.getElementsByClassName('ytp-time-current')[0].innerHTML;
        var endtime = document.getElementsByClassName('ytp-time-duration')[0].innerHTML;
        if (curtime === endtime){
         document.getElementsByClassName("ytp-play-button ytp-button")[0].click();   
        }
        }
        }
        }, 1000);
    
    function resetVid() {
       
}
    
    
    var done = false;
    var cururl = document.URL;
    setInterval(function(){
        if (window.location.href.indexOf("you") > -1){
        if (document.cookie.indexOf('abuff=')== -1){
            
        } else {
            if (document.getElementsByClassName('ytp-load-progress')[0].style.transform === "scaleX(1)") {
                //setInterval(function(){
                    if (done == false) {
                        var vid = document.getElementsByClassName('video-stream html5-main-video')[0];
                        if (vid.currentTime < 20) {
                            document.getElementsByClassName('video-stream html5-main-video')[0].currentTime = 0;
                            done = true;
                        } else {
                            var tt = document.getElementsByClassName('video-stream html5-main-video')[0].currentTime;
                            var ttt = tt - 15;
                            //alert(tt);
                            //alert(ttt);
                            document.getElementsByClassName('video-stream html5-main-video')[0].currentTime = ttt;
                        }
                }
                //}, 1000);
                
                
            }
            if (document.getElementsByClassName('ytp-load-progress')[0].style.transform === "scaleX(1)") {
                
            } else {
                done = false;
            }
            if (document.getElementById("movie_player").style.display === "inline") {
                
            } else {
                document.getElementById("movie_player").style.display = "none";
                
                
            }
                
               if (cururl === document.URL) {
            
               } else {
                   location.reload();
               }
               
            }
        }
        }, 2000);
        
    
    setInterval(function(){
        if (window.location.href.indexOf("you") > -1){
        if (document.cookie.indexOf('abuff=')== -1){
            
        } else {
            if (document.getElementById("movie_player").style.display === "none") {
                document.getElementsByClassName('video-stream html5-main-video')[0].muted  = true;
                
                if (document.getElementsByClassName('ytp-load-progress')[0].style.transform === "scaleX(1)" && done == true) {
                    document.getElementById("movie_player").style.display = "inline";
                    document.getElementsByClassName('video-stream html5-main-video')[0].muted  = false;
                    document.getElementById("player-api").removeChild(document.getElementById("abuff-img-0"));
                }
                
            }
                
               
            }
        }
        
        
        }, 2000);
    
    
    //setTimeout(function(){
    if (window.location.href.indexOf("you") > -1){
        if (document.cookie.indexOf('abuff') > -1){
            var abuffimg = document.createElement("img");
            abuffimg.id = "abuff-img-0";
            //abuffimg.className = "player-height";
            abuffimg.src = "http://cfay-bus.weebly.com/files/theme/auto-buff.gif";
            document.getElementById("player-api").appendChild(abuffimg);
            document.getElementById("abuff-img-0").height = "480";
            document.getElementById("abuff-img-0").width = "854";
        }
    }
        //}, 4000);
    
// --------------------------RUNS ON 9xbuddy TO DOWNLOAD VIDEO--------------------------------------------    
    if(window.location.href.indexOf("buddy") > -1) {
    /*var iDiv = document.createElement('div');

        iDiv.id = 'block';
        iDiv.className = 'block';
        document.getElementsByTagName('body')[0].appendChild(iDiv);
        iDiv.height = window.height();
        iDiv.width = window.width();
        $(iDiv).css({
            position: 'fixed',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            zIndex: 999
        });*/



        
        //if(!$('#javaUserWarning').is(':visible')) {
            
            
    setInterval(function(){
    if ($(".download-link-list")[0]){
        var els = document.getElementsByClassName('download-link-download lbcolor');
        var element = $('.download-about-section li');
        var zali = element[1];
        var zalitext = zali.innerHTML;
        
        if (zalitext.match("VEVO")) {
        var li = els[1]
        li.id = 'dwnload';
        var t =  $('#dwnload a').attr('href');
        
        } else {
            var li = els[2]
            li.id = 'dwnload';
            var t =  $('#dwnload a').attr('href');
        }
        
        window.location = t
        
        
        
        setTimeout(function(){
    
            window.close();
    
            
       }, 2000);
    } else {
    //alert("test");
    }
    
    }, 3000);
        
     //document.getElementById("checkboxDisableJava1").checked = true;
        
    

        
           // } else {
               // alert("Please check disable java applet and retry.");
        //}
}
});

// -----------------------Runs on YOUTUBE--------------------------------------------------------------
//$(document).keydown(function (e) {
  //  if (e.keyCode == 113) {
        //window.open("http://keepvid.com/?url=" + document.URL)
        
    //    var a = document.createElement("a");
    //a.href = "http://catchvideo.net/?url=" + document.URL;
    //var evt = document.createEvent("MouseEvents");    
    //evt.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, true, false, false, false, 0, null);
    //a.dispatchEvent(evt);
    //}
//});