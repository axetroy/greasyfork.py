// ==UserScript==
// @name		   View Youtube videos by same user
// @description	Shows videos by the same user
// @include		http://www.youtube.com/*
// @include		https://www.youtube.com/*
// @author		 ...
// @grant		  GM_addStyle
// @version		1.9
// @namespace https://greasyfork.org/users/1067
// ==/UserScript==

/*
if (window.top != window.self)  //don't run on frames or iframes
{
	return;
}

if(window.location.href.lastIndexOf("youtube.com/watch") === 0){//run the rest of the script only on watch page
	return;
}*/
var VIDS_PER_SLIDE=5;

function zeroPad(num, size) {
	var s = num + "";
	while (s.length < size) s = "0" + s;
	return s;
}
//http://stackoverflow.com/questions/2901102/
function numberWithCommas(x) {
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
GM_addStyle(".customHiddenstuff {display:none}");
GM_addStyle("#showHideButton {margin-bottom:4px;}");
GM_addStyle("#moreUserVideos .ux-thumb-wrap {float:none;}");
GM_addStyle("#moreUserVideos {width: "+(145*VIDS_PER_SLIDE+100)+"px;margin-bottom:24px;}");
GM_addStyle(".yt-uix-newnimproved-slider.yt-rounded {width:"+(145*VIDS_PER_SLIDE+70)+"px;}");
GM_addStyle(".yt-uix-newnimproved-slider-prev, .yt-uix-newnimproved-slider-next {height:80px;margin-top:32px}");
GM_addStyle(".yt-uix-newnimproved-slider-prev {float:left;}");
GM_addStyle(".yt-uix-newnimproved-slider-next {float:right;}");
GM_addStyle(".yt-uix-newnimproved-slider-head {text-align: right;width: "+(145*VIDS_PER_SLIDE+100)+"px;}");
GM_addStyle(".yt-uix-newnimproved-slider-title {float: left;}");
GM_addStyle(".yt-uix-newnimproved-slider-body {overflow-x: hidden;width:"+(145*VIDS_PER_SLIDE+30)+"px;float:left;}");
GM_addStyle(".yt-uix-newnimproved-slider-slides {position: relative;transition: left 0.2s ease 0s;white-space:nowrap;}");
GM_addStyle(".yt-uix-newnimproved-slider-slide {display: inline-block;padding-left:10px;padding-right:10px;white-space: normal;}");
GM_addStyle(".yt-uix-newnimproved-slider-slide-item {display: inline-block;width:145px;vertical-align: top;overflow-x:hidden;}");
//Icons by www.picol.com  Creative Commons (Attribution-Share Alike 3.0 Unported) 
//GM_addStyle(".yt-uix-newnimproved-slider-prev {background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAASUlEQVQ4jWNgoCMop0RzAwMDw39KNZNlALJmkg1A10ySAdg0E20ALs1YDWDCIsZBilNJdQXFhlDsErIAsiFkA5ghFIEOSg3ACgAYHipmwQgBfwAAAABJRU5ErkJggg==') no-repeat scroll 2px 29px transparent !important; }");
//GM_addStyle(".yt-uix-newnimproved-slider-next {background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAAWklEQVQ4jWNgoBEoJ1YhMw7xIwwMDIwMDAwHyHXBfyhuoNQAsg35z0ChIegGkGwINgOwGsJEoss4KHEBhu2kGECSZnQDSNaMbABZmmEGkK2ZgYGBoYMSzSQBADuLKm/G67ueAAAAAElFTkSuQmCC') no-repeat scroll 3px 29px transparent !important;}");
GM_addStyle(".yt-uix-newnimproved-slider-prev div{heigth:0;width:0;border-right:5px solid black;border-bottom:5px solid transparent;border-top:5px solid transparent;}");
GM_addStyle(".yt-uix-newnimproved-slider-next div{heigth:0;width:0;border-left:5px solid black;border-bottom:5px solid transparent;border-top:5px solid transparent;}");
GM_addStyle(".currentVid {background-color:#ddd;}");

//https://github.com/MaxArt2501/object-observe
Object.observe||function(e,t,n){"use strict";var r,o,i=["add","update","delete","reconfigure","setPrototype","preventExtensions"],c=t.isArray||function(e){return function(t){return"[object Array]"===e.call(t)}}(e.prototype.toString),a=t.prototype.indexOf?t.indexOf||function(e,n,r){return t.prototype.indexOf.call(e,n,r)}:function(e,t,n){for(var r=n||0;r<e.length;r++)if(e[r]===t)return r;return-1},f="undefined"!=typeof n.Map&&Map.prototype.forEach?function(){return new Map}:function(){var e=[],t=[];return{size:0,has:function(t){return a(e,t)>-1},get:function(n){return t[a(e,n)]},set:function(n,r){var o=a(e,n);-1===o?(e.push(n),t.push(r),this.size++):t[o]=r},"delete":function(n){var r=a(e,n);r>-1&&(e.splice(r,1),t.splice(r,1),this.size--)},forEach:function(n){for(var r=0;r<e.length;r++)n.call(arguments[1],t[r],e[r],this)}}},s=e.getOwnPropertyNames?function(){var t=e.getOwnPropertyNames;try{arguments.callee}catch(n){var r=(t(a).join(" ")+" ").replace(/prototype |length |name /g,"").slice(0,-1).split(" ");r.length&&(t=function(t){var n=e.getOwnPropertyNames(t);if("function"==typeof t)for(var o,i=0;i<r.length;)(o=a(n,r[i++]))>-1&&n.splice(o,1);return n})}return t}():function(t){var n,r,o=[];if("hasOwnProperty"in t)for(n in t)t.hasOwnProperty(n)&&o.push(n);else{r=e.hasOwnProperty;for(n in t)r.call(t,n)&&o.push(n)}return c(t)&&o.push("length"),o},u=n.requestAnimationFrame||n.webkitRequestAnimationFrame||function(){var e=+new Date,t=e;return function(n){return setTimeout(function(){n((t=+new Date)-e)},17)}}(),p=function(e,t,n){var o=r.get(e);o?b(e,o,t,n):(o=l(e),b(e,o,t,n),1===r.size&&u(d))},l=function(e,t){for(var n=s(e),o=[],i=0,t={handlers:f(),properties:n,values:o,notifier:y(e,t)};i<n.length;)o[i]=e[n[i++]];return r.set(e,t),t},h=function(e,t,n){if(e.handlers.size){var r,o,i,c,f,u,p,l=e.values,h=0;for(r=e.properties.slice(),o=r.length,i=s(t);h<i.length;)f=i[h++],c=a(r,f),u=t[f],-1===c?(g(t,e,{name:f,type:"add",object:t},n),e.properties.push(f),l.push(u)):(p=l[c],r[c]=null,o--,(p===u?0===p&&1/p!==1/u:p===p||u===u)&&(g(t,e,{name:f,type:"update",object:t,oldValue:p},n),e.values[c]=u));for(h=r.length;o&&h--;)null!==r[h]&&(g(t,e,{name:r[h],type:"delete",object:t,oldValue:l[h]},n),e.properties.splice(h,1),e.values.splice(h,1),o--)}},d=function(){r.size&&(r.forEach(h),o.forEach(v),u(d))},v=function(e,t){e.changeRecords.length&&(t(e.changeRecords),e.changeRecords=[])},y=function(e,t){return arguments.length<2&&(t=r.get(e)),t&&t.notifier||{notify:function(t){t.type;var n=r.get(e);if(n){var o,i={object:e};for(o in t)"object"!==o&&(i[o]=t[o]);g(e,n,i)}},performChange:function(t,n){if("string"!=typeof t)throw new TypeError("Invalid non-string changeType");if("function"!=typeof n)throw new TypeError("Cannot perform non-function");var o,i,c=r.get(e),a=n.call(arguments[2]);if(c&&h(c,e,t),c&&a&&"object"==typeof a){i={object:e,type:t};for(o in a)"object"!==o&&"type"!==o&&(i[o]=a[o]);g(e,c,i)}}}},b=function(e,t,n,r){var i=o.get(n);i||o.set(n,i={observed:f(),changeRecords:[]}),i.observed.set(e,{acceptList:r.slice(),data:t}),t.handlers.set(n,i)},g=function(e,t,n,r){t.handlers.forEach(function(t){var o=t.observed.get(e).acceptList;("string"!=typeof r||-1===a(o,r))&&a(o,n.type)>-1&&t.changeRecords.push(n)})};r=f(),o=f(),e.observe=function(t,n,r){if(!t||"object"!=typeof t&&"function"!=typeof t)throw new TypeError("Object.observe cannot observe non-object");if("function"!=typeof n)throw new TypeError("Object.observe cannot deliver to non-function");if(e.isFrozen&&e.isFrozen(n))throw new TypeError("Object.observe cannot deliver to a frozen function object");if(arguments.length>2){if(!r||"object"!=typeof r)throw new TypeError("Object.observe cannot use non-object accept list")}else r=i;return p(t,n,r),t},e.unobserve=function(e,t){if(null===e||"object"!=typeof e&&"function"!=typeof e)throw new TypeError("Object.unobserve cannot unobserve non-object");if("function"!=typeof t)throw new TypeError("Object.unobserve cannot deliver to non-function");var n,i=o.get(t);return i&&(n=i.observed.get(e))&&(i.observed.forEach(function(e,t){h(e.data,t)}),u(function(){v(i,t)}),1===i.observed.size&&i.observed.has(e)?o["delete"](t):i.observed["delete"](e),1===n.data.handlers.size?r["delete"](e):n.data.handlers["delete"](t)),e},e.getNotifier=function(t){if(null===t||"object"!=typeof t&&"function"!=typeof t)throw new TypeError("Object.getNotifier cannot getNotifier non-object");return e.isFrozen&&e.isFrozen(t)?null:y(t)},e.deliverChangeRecords=function(e){if("function"!=typeof e)throw new TypeError("Object.deliverChangeRecords cannot deliver to non-function");var t=o.get(e);t&&(t.observed.forEach(function(e,t){h(e.data,t)}),v(t,e))}}(Object,Array,this);
//# sourceMappingURL=object-observe-lite.min.map


var apiKey='AIzaSyBOxZehP8JmZ32Xd7YZxM6H4L2zlsYP1xQ';
var videoId,totalVids;
var iframe,showHideButtonContainer,sliderNext,sliderPrev;

/*
Object.observe(window.location, function(changes) {
	console.log('[VYVSU]'+"Changed page, prep()");
	setTimeout(prep,400);
	//prep();
});
*/

document.addEventListener('spfdone',prep,false);

function prep(){
	try{
		iframe.remove();
		showHideButtonContainer.remove();
	}catch(e){	}
	if (window.top != window.self)  //don't run on frames or iframes
	{
		return;
	}

	if(window.location.href.lastIndexOf("youtube.com/watch") < 0){//run the rest of the script only on watch page
		return;
	}
	//videoId = window.location.href.split('v=')[1].split('&')[0].split('#')[0];
	iframe=document.createElement('div');
	iframe.id = "moreUserVideos"
	iframe.className="customHiddenstuff clearfix";
	

	var slidesContainer=document.createElement('div');
	slidesContainer.className="yt-uix-newnimproved-slider-slides";

	var slider=document.createElement('div');
	slider.className="yt-uix-newnimproved-slider";
	slider.setAttribute("data-slider-current","0");

	var sliderBody=document.createElement('div');
	sliderBody.className="yt-uix-newnimproved-slider-body";
	sliderBody.appendChild(slidesContainer);

	sliderPrev=document.createElement('button');
	sliderPrev.className="yt-uix-newnimproved-slider-prev yt-uix-button yt-uix-button-default";
	var prevButtonArrow = document.createElement('div');
	prevButtonArrow.className="yt-uix-button-content";
	sliderPrev.appendChild(prevButtonArrow);
	sliderPrev.onclick=prev;

	sliderNext=document.createElement('button');
	sliderNext.className="yt-uix-newnimproved-slider-next yt-uix-button yt-uix-button-default";
	var nextButtonArrow = document.createElement('div');
	nextButtonArrow.className="yt-uix-button-content";
	sliderNext.appendChild(nextButtonArrow);
	sliderNext.onclick=next;

	slider.appendChild(sliderPrev);
	slider.appendChild(sliderBody)
	slider.appendChild(sliderNext);

	var docfrag = document.createDocumentFragment();
	docfrag.appendChild(slider);
	iframe.appendChild(docfrag);

	var videoContainer;
	if(document.getElementById("watch7-playlist-data")==null && document.getElementById('ud')==null){
		videoContainer = document.getElementById('watch-header'/*'player'/*-legacy'*/);
		videoContainer.insertBefore(iframe,document.getElementById('watch8-action-buttons'));
			//videoContainer = document.getElementById('player-mole-container'/*'player'/*-legacy'*/);
		//videoContainer.insertBefore(iframe,document.getElementById('player-api'/*-legacy'*/));
	}else if(document.getElementById('ud')==null){
		videoContainer = document.getElementById('watch7-playlist-data');
		videoContainer.insertBefore(iframe,videoContainer.getElementsByClassName('watch7-playlist-bar')[0]);
	}
	videoContainer.style.textAlign="left";

	var showHideButton = document.createElement('button');
	showHideButton.className="yt-uix-button   yt-uix-button-default b";//"yt-uix-button yt-uix-tooltip yt-uix-button-"/*hh-*/+"text yt-uix-tooltip-reverse";//yt-uix-button yt-uix-button-text yt-uix-tooltip yt-uix-tooltip-reverse
	showHideButton.id="showHideButton";
	var buttonText = document.createElement('span');
	buttonText.className="yt-uix-button-content";
	buttonText.appendChild(document.createTextNode("Show/Hide user videos"));
	showHideButton.appendChild(buttonText);
	showHideButton.onclick=function(){
		var uservids = document.getElementById('moreUserVideos');
		if( uservids.className.split(' ').indexOf('customHiddenstuff') == -1 ) {
			uservids.className = (uservids.className + ' customHiddenstuff').trim();
		} else {
			uservids.className = uservids.className.replace( new RegExp( '(\\s|^)' + 'customHiddenstuff' + '(\\s|$)' ), ' ' ).trim();
			focusSlide(document.getElementsByClassName("yt-uix-newnimproved-slider")[0].getAttribute("data-slider-current"));
		}

	};

	showHideButtonContainer = document.createElement('div');
	showHideButtonContainer.style.textAlign="left";
	showHideButtonContainer.style.marginTop="5px";
	showHideButtonContainer.style.marginBottom="10px";
	showHideButtonContainer.appendChild(showHideButton);
	videoContainer.insertBefore(showHideButtonContainer,iframe);


	videoId = window.location.href.split('v=')[1].split('&')[0].split('#')[0];

	var url='https://www.googleapis.com/youtube/v3/videos?part=snippet&id='+videoId+'&key='+apiKey;
	var xhttp=new XMLHttpRequest();
	xhttp.onload=getCurrentVidInfo;
	xhttp.open("GET",url,true);
	xhttp.send();
	console.log('[VYVSU]'+"prep() done");
}

prep();

function getCurrentVidInfo(){
  var vidInfoData=JSON.parse(this.responseText);
  //console.log('[VYVSU]'+vidInfoData);
  var channelId=vidInfoData.items[0].snippet.channelId;
  var publishedAt=vidInfoData.items[0].snippet.publishedAt;
	//var publishedAt=vidInfoData.items[0].snippet.publishedAt;
	//publishedAt.setHours(publishedAt.getHours()+1);
	//publishedAt=publishedAt.toISOString();
	//console.log('[VYVSU]'+''+publishedAt);
	/*
	var nextVidsRequest=new XMLHttpRequest();
  nextVidsRequest.onload=vidListRequestSuccess;
  var nextreqUrl='https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=50&channelId='+channelId+'&order=date&publishedAfter='+publishedAt+'&key='+apiKey;
  nextVidsRequest.open("GET",nextreqUrl,true);
  nextVidsRequest.send();
	*/
	getChannelInfo(channelId, publishedAt);
	console.log('[VYVSU]'+"getCurrentVidInfo() done");
}

function getChannelInfo(channelId, publishedAt){
	var url='https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults='+(Math.floor(50/VIDS_PER_SLIDE)*VIDS_PER_SLIDE)+'&channelId='+channelId+'&order=date&key='+apiKey;
	var xhttp=new XMLHttpRequest();
	xhttp.onload=function(){
		var results=JSON.parse(this.responseText);
		totalVids=results.pageInfo.totalResults;
		var slider=document.getElementsByClassName("yt-uix-newnimproved-slider")[0];
		slider.setAttribute("data-slider-max", Math.ceil(totalVids/VIDS_PER_SLIDE));
		var vidIsInInitialSearch=false;
		var vidpos=-1;
		for(var v in results.items){
			if(results.items[v].id.videoId==videoId){
				vidIsInInitialSearch=true;
				vidpos=v;
				break;
			}
		}
		markVideoPositions(results.items,0);
		if(vidIsInInitialSearch){
			console.log('[VYVSU]'+totalVids+' videos in channel, vidIsInInitialSearch:'+vidIsInInitialSearch +', using all vids');
			vidListRequestSuccess.apply(this);
			focusSlide(Math.floor(vidpos/VIDS_PER_SLIDE));
		}else{
			console.log('[VYVSU]'+totalVids+' videos in channel, requesting prev vids');
			var prevVidsRequest=new XMLHttpRequest();
			prevVidsRequest.onload=vidListRequestSuccess;
			publishedAt=new Date(publishedAt);
			publishedAt.setMinutes(publishedAt.getMinutes()+1);
			publishedAt=publishedAt.toISOString();
			var prevreqUrl='https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults='+(Math.floor(50/VIDS_PER_SLIDE)*VIDS_PER_SLIDE)+'&channelId='+channelId+'&order=date&publishedBefore='+publishedAt+'&key='+apiKey;
			prevVidsRequest.open("GET",prevreqUrl,true);
			prevVidsRequest.send();
		}
	};
	xhttp.open("GET",url,true);
	xhttp.send();
	console.log('[VYVSU]'+"getChannelInfo() done");
}

function markVideoPositions(vidList, startPos){
	for(var i=0;i<vidList.length;i++){
		vidList[i].position=startPos+i;
	}
}

function nextVids(publishedAfterDate, publishedAfterVidId){
	
}

function vidListRequestSuccess(){
	var data=JSON.parse(this.responseText);
	var slidesContainer=document.getElementsByClassName("yt-uix-newnimproved-slider-slides")[0];
	var ulSliderSlide;
	for(i=0 ; i<(data.items.length) ; i++){
		
		if(i%VIDS_PER_SLIDE==0){
			console.log('[VYVSU]'+"Treating item:"+i);
			ulSliderSlide=document.createElement('ul');
			ulSliderSlide.className="yt-uix-newnimproved-slider-slide video-list";
			var slideNo=Math.floor((i)/VIDS_PER_SLIDE);
			//console.log('[VYVSU]'+"Creating new slide with slideNo: "+slideNo+" (Start-index: "+data.startIndex+")");
			ulSliderSlide.setAttribute('data-slide-no', slideNo);
			
			var slides=document.getElementsByClassName("yt-uix-newnimproved-slider-slide");
			
			if((slides.length == 0) || slideNo > parseInt(slides[(slides.length-1)].getAttribute('data-slide-no')) ){
				//console.log('[VYVSU]'+"Appending slide: "+slideNo+" at end of slideContainer");
				slidesContainer.appendChild(ulSliderSlide);
			}else{
				for(j=0;j<slides.length;j++){
					if( slideNo < parseInt(slides[j].getAttribute('data-slide-no')) ){
						//console.log('[VYVSU]'+"Inserting slide: "+slideNo+" before slide "+slides[j].getAttribute('data-slide-no'));
						slidesContainer.insertBefore( ulSliderSlide, slides[j]);
						break;
					}
				}
			}
		}
		
		
		
		ulSliderSlide.appendChild(createVideoTile(data.items[i]));
	}
	/*
	var slider=document.getElementsByClassName("yt-uix-newnimproved-slider")[0];
	slider.setAttribute("data-slider-max", Math.ceil(data.totalItems/VIDS_PER_SLIDE));
	*/
	/*/ Remove '*' between the '//' at beginning of this line to make links be to videos in a playlist/autoplay
	var links = document.getElementById('moreUserVideos').getElementsByTagName('a');
	for(var i=0 ; i<links.length ; i++){
		links[i].setAttribute('href', links[i].getAttribute('href') + '&list=UL' );
	}
	//*/
	console.log('[VYVSU]'+"vidListRequestSuccess() done");
}

function createVideoSlide(slideNo, items){
	var slidesContainer=document.getElementsByClassName("yt-uix-newnimproved-slider-slides")[0];
	var ulSliderSlide;
	for(i=0 ; i<items.length && i<VIDS_PER_SLIDE ; i++){
		if(i%VIDS_PER_SLIDE==0){
			//console.log('[VYVSU]'+"Treating item:"+i);
			ulSliderSlide=document.createElement('ul');
			ulSliderSlide.className="yt-uix-newnimproved-slider-slide video-list";
			//var slideNo=Math.floor((i)/VIDS_PER_SLIDE);
			//console.log('[VYVSU]'+"Creating new slide with slideNo: "+slideNo+" (Start-index: "+data.startIndex+")");
			ulSliderSlide.setAttribute('data-slide-no', slideNo);
			
			var slides=document.getElementsByClassName("yt-uix-newnimproved-slider-slide");
			
			if((slides.length == 0) || slideNo > parseInt(slides[(slides.length-1)].getAttribute('data-slide-no')) ){
				//console.log('[VYVSU]'+"Appending slide: "+slideNo+" at end of slideContainer");
				slidesContainer.appendChild(ulSliderSlide);
			}else{
				for(j=0;j<slides.length;j++){
					if( slideNo < parseInt(slides[j].getAttribute('data-slide-no')) ){
						//console.log('[VYVSU]'+"Inserting slide: "+slideNo+" before slide "+slides[j].getAttribute('data-slide-no'));
						slidesContainer.insertBefore( ulSliderSlide, slides[j]);
						break;
					}
				}
			}
		}
		ulSliderSlide.appendChild(createVideoTile(data.items[i]));
	}
}


function createVideoTile(item){
	var liSlideItem=document.createElement('li');
	liSlideItem.id="vidTile"+item.id.videoId;
	//TODO!
	//liSlideItem.setTime=function(){};
	//liSlideItem.setAttribution=function(){};
	//liSlideItem.setViewCount=function(){};
	liSlideItem.className="yt-uix-newnimproved-slider-slide-item video-list-item";

	var aSlideItem=document.createElement('a');
	aSlideItem.className='related-video';
	aSlideItem.dataset.position=item.position;
	aSlideItem.setAttribute('href', 'watch?v='+item.id.videoId);
	//console.log('[VYVSU]'+item);
	if(item.id.videoId==videoId){
		aSlideItem.className = (aSlideItem.className + ' currentVid').trim();
	}
	aSlideItem.innerHTML=
		'<span class="ux-thumb-wrap">'+
		'	<span class="video-thumb  yt-thumb yt-thumb-120">'+
		'		<span class="yt-thumb-default">'+
		'			<span class="yt-thumb-clip">'+
		'  				<span class="yt-thumb-clip-inner">'+
		'					<img data-thumb="'+item.snippet.thumbnails.default.url+'" alt="" src="'+item.snippet.thumbnails.default.url+'">'+
		'					<span class="vertical-align"></span>'+
		'  				</span>'+
		'			</span>'+
		'		</span>'+
		'	</span>'+
		'	<span class="video-time">...'+/*Math.floor(item.duration/60)+':'+zeroPad(item.duration%60, 2)+*/'</span>'+
		'</span>'+
		'<span title="'+item.snippet.title+'" class="title" dir="ltr">'+item.snippet.title+'</span>'+
		'<span class="stat attribution">by <span dir="ltr" class="yt-user-name ">'+item.snippet.channelTitle+'</span></span>'+
		'<span class="stat view-count">...'+/*numberWithCommas(item.viewCount)+*/' views</span>'
	;
	//console.log('[VYVSU]'+item.snippet);
	liSlideItem.appendChild(aSlideItem);
	return liSlideItem;
}

function focusSlide(slideToFocus){
	//console.log('[VYVSU]'+"slideToFocus: "+slideToFocus);
	var w=parseInt(window.getComputedStyle(document.getElementsByClassName("yt-uix-newnimproved-slider-slide")[0], null).getPropertyValue('margin-left'))+
			parseInt(window.getComputedStyle(document.getElementsByClassName("yt-uix-newnimproved-slider-slide")[0], null).getPropertyValue('padding-left'))+
			parseInt(window.getComputedStyle(document.getElementsByClassName("yt-uix-newnimproved-slider-slide")[0], null).getPropertyValue('width'))+
			parseInt(window.getComputedStyle(document.getElementsByClassName("yt-uix-newnimproved-slider-slide")[0], null).getPropertyValue('margin-right'))+
			parseInt(window.getComputedStyle(document.getElementsByClassName("yt-uix-newnimproved-slider-slide")[0], null).getPropertyValue('padding-right'));
	if(isNaN(w)){
		//for focusing slide when yt-uix-newnimproved-slider-slide is hidden.
		w=145*VIDS_PER_SLIDE;
	}
	var slider=document.getElementsByClassName("yt-uix-newnimproved-slider")[0];
	var maxSlides=parseInt(slider.getAttribute("data-slider-max"));
	sliderNext.removeAttribute("disabled");
	sliderPrev.removeAttribute("disabled");
	if(slideToFocus+1>=maxSlides){
		sliderNext.setAttribute("disabled","disabled");
	}
	if(slideToFocus-1<0){
		sliderPrev.setAttribute("disabled","disabled");
	}
	//if(slideToFocus+1>=maxSlides || slideToFocus-1<0){
	//	sliderToDisable=(slideToFocus+1>=maxSlides)?sliderNext:sliderPrev;
	//	sliderToDisable.setAttribute("disabled","disabled");
		//alert("That's it. There is nothing more.");
		//return;
	//}//else{
		//sliderNext.removeAttribute("disabled");
		//sliderPrev.removeAttribute("disabled");
		var slides=document.getElementsByClassName("yt-uix-newnimproved-slider-slide");
		for(i=0;i<slides.length;i++){
			if( parseInt(slides[i].getAttribute('data-slide-no')) == slideToFocus){
				slider.setAttribute("data-slider-current", slideToFocus);
				document.getElementsByClassName("yt-uix-newnimproved-slider-slides")[0].style.left=(-i*w).toString()+"px";
				return;
			}
		}
		get24Vids( Math.floor(slideToFocus*VIDS_PER_SLIDE/24)*24+1, function(){focusSlide(slideToFocus);});
	//}
}

function next(){
	var slider=document.getElementsByClassName("yt-uix-newnimproved-slider")[0];
	focusSlide( parseInt(slider.getAttribute("data-slider-current"))+1 );
}

function prev(){
	var slider=document.getElementsByClassName("yt-uix-newnimproved-slider")[0];
	focusSlide( parseInt(slider.getAttribute("data-slider-current"))-1 );
}