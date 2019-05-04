// ==UserScript==
// @name         宽屏Crash平台
// @namespace    http://tampermonkey.net/
// @version      0.5
// @description  完美的Crash平台，强大的详情数据导出
// @author       @jokers_i
// @match        http://crash.sankuai.com/*
// @match        https://crash.sankuai.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    console.log("宽屏crash来了");
    function findElement(selector, callback) {
        var el = document.querySelectorAll(selector);
        if (el.length > 0) {
            el.length == 1 ? callback(el[0]) : callback(el);
        } else {
            setTimeout(function() {
                findElement(selector, callback);
            }, 300);
        }
    }
    function updateStyle() {
        findElement('tr.ant-table-row', function(els) {
            for(let i =0; i < els.length; i++) {
                let tr = els[i];
                if (tr._processed_) continue;
                tr._processed_ = true;
                let key = tr.querySelector('span.meta-key');
                let value = tr.querySelector('span.meta-value');
                if (key && value) {
                    if(key.textContent == '自定义数据') {
                        value.innerHTML = JSON.stringify(JSON.parse(value.textContent), 2, 2).replace(/\n/g, '<br/>');
                        console.log('修饰自定义数据');
                    } else if (key.textContent == '页面追踪') {
                        value.innerHTML = value.textContent.split(';').reverse().map(function(a, i) {
                            return i == 0 ? a : '╰' + '┬'.repeat(i-1) + a;
                        }).join('<br/>');
                        console.log('修饰页面追踪');
                    }
                }
            }
        });
        if (!location.pathname.endsWith('/detail')) {
            findElement('a.track-description', function(els) {
                for(let i = 0; i < els.length; i ++) {
                    if (els[i].style.height == 'initial') {
                        continue;
                    }
                    els[i].style.height = 'initial'
                    els[i].childNodes.forEach(function(c) {
                        if (c.tagName == 'SPAN' && c.className != 'track-index') {
                            c.innerHTML = c.innerHTML.replace(/\n/g, '<br/>');
                            c.style.display = 'inline-block';
                        }
                    });
                    els[i].parentElement.style.padding = '0';
                }
            });
            if (location.pathname.endsWith('catchexception/channel')) {
                findElement('a.message-link', function(els) {
                    for(let i = 0; i < els.length; i ++) {
                        if (els[i].style.height == 'initial') {
                            continue;
                        }
                        els[i].style.height = 'initial';
                        els[i].innerHTML = els[i].innerHTML.replace(/\n/g, '<br/>');
                        els[i].style.display = 'inline-block';
                        els[i].parentElement.style.padding = '0';
                    }
                });
            }
        }
    }
    updateStyle();
    findElement('h1.page-title', function(el) {
        function getYesterday() { let d = new Date(); d.setDate(d.getDate() - 1); return d.toISOString().split('T')[0];}
        let exportYesterdayElem = document.createElement('button');
        exportYesterdayElem.textContent = '导出崩溃详情';
        exportYesterdayElem.style.height = '100%';
        el.parentNode.appendChild(exportYesterdayElem);
        exportYesterdayElem.addEventListener('click', function() {
            let date = prompt("请输入要导出的日期", getYesterday());
            let _appState = window._appState || {};
            (async function() {
                let filter = JSON.parse(new URLSearchParams(location.search).get('filter'));
                let addtionalQuery = '';
                if (filter) {
                    addtionalQuery = filter.filter(kv => kv.k != 'start' && kv.k != 'end').map(kv => kv.k+"="+kv.v).join('&');
                }
                let url = `/new/api/crash-tracks?project=${_appState.project}&size=600&perfId=${_appState.user.perfId}&start=${date} 00:00:00&end=${date} 23:59:59&${addtionalQuery}`;
                let tracks = await (await fetch(url)).json();
                let done = 0;
                let indicator = `0/${tracks.data.length}`;
                let trackIndicator = `${tracks.data.length}/${tracks.total}`;
                let detailSum = 0;
                let detailRecv = 0;
                let details = await Promise.all(tracks.data.map(async (t) => {
                    detailSum += t.count;
                    t.detail = await (await fetch(`/api/crash/detail?project=${_appState.project}&type=crash&excludes=log&size=${t.count}&eq=hash%2C${t.clusterTag}&start=${date} 00:00:00&end=${date} 23:59:59&${addtionalQuery}`)).json();
                    done++;
                    detailRecv += t.detail.length;
                    indicator = `${done}/${tracks.data.length}`;
                    exportYesterdayElem.textContent = '导出崩溃详情' + indicator;
                    return t;
                }));
                exportYesterdayElem.textContent = '导出崩溃详情 track:' + indicator + ' detail:' + detailRecv + '/' + detailSum;
                download(JSON.stringify(details, 0, 0), `CrashDetails_${_appState.project}_${date}.json.txt`, "text/plain");
            })().then(() => {});
        });
    });
    document.addEventListener('click', function(e) {
        setTimeout(updateStyle, 500);
    });
    var mods = document.createElement('style');
    mods.innerHTML = `
.cluster-table-widget td.col-description, .cluster-table-widget th.col-description {
max-width: 750px;
}
.ant-tooltip.track-description.ant-tooltip-placement-topLeft {
display: none;
}
div.container {
margin-left: 24px;
width: initial;
}
.items .message-table-tabs, #app > div > div > div.left > div:nth-child(5) > div {
width: 100%;
}
a.track-description, a.message-link {
height: initial;
margin-left: 12px;
font-size: small;
font-weight: normal;
color: darkmagenta;
font-family: Menlo,Monaco,Consolas,"Courier New",monospace;
background-color: #fdefef;
}`;
    document.head.appendChild(mods);
    function download(data, strFileName, strMimeType) {

        var self = window, // this script is only for browsers anyway...
            defaultMime = "application/octet-stream", // this default mime also triggers iframe downloads
            mimeType = strMimeType || defaultMime,
            payload = data,
            url = !strFileName && !strMimeType && payload,
            anchor = document.createElement("a"),
            toString = function(a){return String(a);},
            myBlob = (self.Blob || self.MozBlob || self.WebKitBlob || toString),
            fileName = strFileName || "download",
            blob,
            reader;
        myBlob= myBlob.call ? myBlob.bind(self) : Blob ;

        if(String(this)==="true"){ //reverse arguments, allowing download.bind(true, "text/xml", "export.xml") to act as a callback
            payload=[payload, mimeType];
            mimeType=payload[0];
            payload=payload[1];
        }


        if(url && url.length< 2048){ // if no filename and no mime, assume a url was passed as the only argument
            fileName = url.split("/").pop().split("?")[0];
            anchor.href = url; // assign href prop to temp anchor
            if(anchor.href.indexOf(url) !== -1){ // if the browser determines that it's a potentially valid url path:
                var ajax=new XMLHttpRequest();
                ajax.open( "GET", url, true);
                ajax.responseType = 'blob';
                ajax.onload= function(e){
                    download(e.target.response, fileName, defaultMime);
                };
                setTimeout(function(){ ajax.send();}, 0); // allows setting custom ajax headers using the return:
                return ajax;
            } // end if valid url?
        } // end if url?


        //go ahead and download dataURLs right away
        if(/^data\:[\w+\-]+\/[\w+\-]+[,;]/.test(payload)){

            if(payload.length > (1024*1024*1.999) && myBlob !== toString ){
                payload=dataUrlToBlob(payload);
                mimeType=payload.type || defaultMime;
            }else{
                return navigator.msSaveBlob ?  // IE10 can't do a[download], only Blobs:
                    navigator.msSaveBlob(dataUrlToBlob(payload), fileName) :
                saver(payload) ; // everyone else can save dataURLs un-processed
            }

        }//end if dataURL passed?

        blob = payload instanceof myBlob ?
            payload :
        new myBlob([payload], {type: mimeType}) ;


        function dataUrlToBlob(strUrl) {
            var parts= strUrl.split(/[:;,]/),
                type= parts[1],
                decoder= parts[2] == "base64" ? atob : decodeURIComponent,
                binData= decoder( parts.pop() ),
                mx= binData.length,
                i= 0,
                uiArr= new Uint8Array(mx);

            for(i;i<mx;++i) uiArr[i]= binData.charCodeAt(i);

            return new myBlob([uiArr], {type: type});
        }

        function saver(url, winMode){

            if ('download' in anchor) { //html5 A[download]
                anchor.href = url;
                anchor.setAttribute("download", fileName);
                anchor.className = "download-js-link";
                anchor.innerHTML = "downloading...";
                anchor.style.display = "none";
                document.body.appendChild(anchor);
                setTimeout(function() {
                    anchor.click();
                    document.body.removeChild(anchor);
                    if(winMode===true){setTimeout(function(){ self.URL.revokeObjectURL(anchor.href);}, 250 );}
                }, 66);
                return true;
            }

            // handle non-a[download] safari as best we can:
            if(/(Version)\/(\d+)\.(\d+)(?:\.(\d+))?.*Safari\//.test(navigator.userAgent)) {
                url=url.replace(/^data:([\w\/\-\+]+)/, defaultMime);
                if(!window.open(url)){ // popup blocked, offer direct download:
                    if(confirm("Displaying New Document\n\nUse Save As... to download, then click back to return to this page.")){ location.href=url; }
                }
                return true;
            }

            //do iframe dataURL download (old ch+FF):
            var f = document.createElement("iframe");
            document.body.appendChild(f);

            if(!winMode){ // force a mime that will download:
                url="data:"+url.replace(/^data:([\w\/\-\+]+)/, defaultMime);
            }
            f.src=url;
            setTimeout(function(){ document.body.removeChild(f); }, 333);

        }//end saver




        if (navigator.msSaveBlob) { // IE10+ : (has Blob, but not a[download] or URL)
            return navigator.msSaveBlob(blob, fileName);
        }

        if(self.URL){ // simple fast and modern way using Blob and URL:
            saver(self.URL.createObjectURL(blob), true);
        }else{
            // handle non-Blob()+non-URL browsers:
            if(typeof blob === "string" || blob.constructor===toString ){
                try{
                    return saver( "data:" +  mimeType   + ";base64,"  +  self.btoa(blob)  );
                }catch(y){
                    return saver( "data:" +  mimeType   + "," + encodeURIComponent(blob)  );
                }
            }

            // Blob but not URL support:
            reader=new FileReader();
            reader.onload=function(e){
                saver(this.result);
            };
            reader.readAsDataURL(blob);
        }
        return true;
    }; /* end download() */
})();