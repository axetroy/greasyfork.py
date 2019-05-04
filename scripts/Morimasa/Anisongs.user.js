// ==UserScript==
// @name Anisongs
// @namespace Morimasa
// @author Morimasa
// @description Adds Anisongs to anime entries on AniList
// @match https://anilist.co/*
// @version 1.06
// @grant GM_xmlhttpRequest
// ==/UserScript==

const options = {
  cacheName: 'anison',
  cacheSize: 100,
  cacheLife: 604800000, // 1 week in ms
  class: 'anisongs'
}
let last = {id:0};
let target;

const style = document.createElement('style');
style.innerHTML = `
.update-spinner {
    animation: 2s spin linear infinite;
}
`
document.head.appendChild(style);

const insert = (list, parent) => {
  if (list===undefined || list.length===0){
    let node = document.createElement('div');
    node.classList = 'no-reviews';
    node.setAttribute('data-v-3dd773fc','');
    node.innerText = 'No songs to show (つ﹏<)･ﾟ｡';
    parent.appendChild(node);
    return;
  }
  else{
    let offset = 0;
    list.forEach((title, i)=>{
      let songs = title.split(/\#\d{1,2}\s/)
      songs.forEach(title=>{
        if (title==="") return;
        let node = document.createElement('p');
        node.innerText = `${i+1+offset}. ${title}`;
        node.setAttribute('data-v-4e418c9e','');
        node.classList = "tag";
        parent.appendChild(node);
        if (songs.length>1)
          offset++
      })
      
    })
  }
}

const createTargetDiv = (text, target, pos) => {
  let el = document.createElement('div');
  el.appendChild(document.createElement('h2'));
  el.children[0].innerText = text;
  el.classList = options.class;
  let btn = document.createElement('SPAN');
  btn.addEventListener('click', manualUpdate);
  btn.innerHTML='<svg aria-hidden="true" role="img" xmlns="http://www.w3.org/2000/svg" class="svg-inline--fa" viewBox="0 0 512 512"><path fill="currentColor" d="M55.89,262.818c-3-26-0.5-51.1,6.3-74.3c22.6-77.1,93.5-133.8,177.6-134.8v-50.4c0-2.8,3.5-4.3,5.8-2.6l103.7,76.2c1.7,1.3,1.7,3.9,0,5.1l-103.6,76.2c-2.4,1.7-5.8,0.2-5.8-2.6v-50.3c-55.3,0.9-102.5,35-122.8,83.2c-7.7,18.2-11.6,38.3-10.5,59.4c1.5,29,12.4,55.7,29.6,77.3c9.2,11.5,7,28.3-4.9,37c-11.3,8.3-27.1,6-35.8-5C74.19,330.618,59.99,298.218,55.89,262.818zM355.29,166.018c17.3,21.5,28.2,48.3,29.6,77.3c1.1,21.2-2.9,41.3-10.5,59.4c-20.3,48.2-67.5,82.4-122.8,83.2v-50.3c0-2.8-3.5-4.3-5.8-2.6l-103.7,76.2c-1.7,1.3-1.7,3.9,0,5.1l103.6,76.2c2.4,1.7,5.8,0.2,5.8-2.6v-50.4c84.1-0.9,155.1-57.6,177.6-134.8c6.8-23.2,9.2-48.3,6.3-74.3c-4-35.4-18.2-67.8-39.5-94.4c-8.8-11-24.5-13.3-35.8-5C348.29,137.718,346.09,154.518,355.29,166.018z"></path></svg>';
  btn.style.float='right';
  btn.style.cursor='pointer';
  el.children[0].appendChild(btn);
  target.insertBefore(el, target.children[pos]);
  return el;
}

const placeData = data => {
  cleaner(target);
  let op = createTargetDiv('Openings', target, 2)
  let ed = createTargetDiv('Endings', target, 3)
  insert(data.opening_themes, op);
  insert(data.ending_themes, ed);
}

const handleData = data => {
  let resp = JSON.parse(data.responseText);
  placeData(resp);
  try{
    if (Object.keys(JSON.parse(localStorage[options.cacheName])).length>options.cacheSize) clearCache();
  }
  catch{}
  addCache(last.id, {opening_themes: resp.opening_themes, ending_themes: resp.ending_themes, time: +new Date()});
}

const getMal = id => {
  if (id===null) return console.info("No MAL id in API")
  GM_xmlhttpRequest({
    method: "GET",
    url: `https://api.jikan.moe/v3/anime/${id}/`,
    headers: {
        "Accept": "application/json"
    },
    onload: handleData
  })
}

const getMalId = () => {
    const query = `query($id:Int){Media(id:$id){idMal}}`
    let vars = {id: parseInt(window.location.pathname.split("/")[2])};
	const options = {
		method: 'POST',
		body: JSON.stringify({query: query, variables: vars}),
		headers: new Headers({
			'Content-Type': 'application/json'
		})
	};
	return fetch('https://graphql.anilist.co/', options)
	.then(res => res.json())
	.then(res => getMal(res.data.Media.idMal))
	.catch(error => console.error(`Error: ${error}`));
}

const addCache = (id, data) => {
  let cache = JSON.parse(localStorage.getItem(options.cacheName)) || {};
  cache[id] = data
  localStorage.setItem(options.cacheName, JSON.stringify(cache));
}

const getCache = id => {
  let cache = localStorage.getItem(options.cacheName);
  if (cache===null)
    return {time:0}
  else
    return JSON.parse(cache)[id] || {time:0};
}

const clearCache = () => {
  delete localStorage[options.cacheName]
}

const cleaner = (target) => {
  if (target === undefined) return;
  console.log('cleaner launched')
  let el = target.querySelectorAll(`.${options.class}`);
  el.forEach((e)=>{
    target.removeChild(e)
  })
}

const manualUpdate = () => {
  getMalId();
  document.querySelectorAll(`.${options.class} span`).forEach(e=>{
    e.classList='update-spinner';
  })
}

let observer = new MutationObserver(() => {
    let currentpath = window.location.pathname.split("/");
    if (currentpath[1] === 'anime') {
      let currentid = currentpath[2];
      let location = currentpath.pop();
      if (location!=='') last.id=0;
      target = document.querySelectorAll('.grid-section-wrap')[1];
      if(last.id!==currentid && location==='' && target!==undefined){
        last.id = currentid;
        let cache = getCache(currentid);
        let TTLpassed = (cache.time + options.cacheLife)<+new Date();
        if (TTLpassed){
          getMalId();
        }
        else{
          placeData(cache);
        }
      }
     }
   else if (currentpath[1] === 'manga'){
    cleaner(target);
    last.id = 0;
   }
   else
     last.id=0;
});
observer.observe(document.getElementById('app'), {childList: true, subtree: true});
