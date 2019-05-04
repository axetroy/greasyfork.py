// ==UserScript==
// @name         DockerHub Direct Downloader
// @name:zh-CN   DockerHub 镜像直接下载
// @namespace    http://tampermonkey.net/
// @version      0.4.2
// @description  Just add a download button to Docker Hub
// @description:zh-CN 给 Docker Hub 页面提供一个直接下载blobs的按钮
// @author       CodeHz
// @match        https://hub.docker.com/*
// @grant        GM_xmlhttpRequest
// @icon         https://hub.docker.com/favicon.ico
// @connect      *
// ==/UserScript==

(function() {
    'use strict';
    const registry='https://registry-1.docker.io/v2';
    (function(history){
        var pushState = history.pushState;
        history.pushState = function(state) {
            if (typeof history.onpushstate == "function") {
                history.onpushstate({state: state});
            }
            return pushState.apply(history, arguments);
        };
    })(window.history);
    function auth(repo, callback) {
        GM_xmlhttpRequest({
            method: "GET",
            url: `https://auth.docker.io/token?service=registry.docker.io&scope=repository:${repo}:pull`,
            onload(x) {
                callback(JSON.parse(x.response).token)
            }
        })
    }
    function getLayers(token, repo, tag, callback) {
        GM_xmlhttpRequest({
            method: "GET",
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/vnd.docker.distribution.manifest.v1+json'
            },
            url: `${registry}/${repo}/manifests/${tag}?x=${Math.random().toString(36).substring(7)}`,
            onload(x) {
                console.log(JSON.parse(x.response))
                callback(JSON.parse(x.response).fsLayers.map(({blobSum}) => blobSum))
            }
        })
    }
    function humanFileSize(size) {
        var i = Math.floor( Math.log(size) / Math.log(1024) );
        return ( size / Math.pow(1024, i) ).toFixed(2) * 1 + ' ' + ['B', 'kB', 'MB', 'GB', 'TB'][i];
    }
    function headBlob(repo, token, blob, callback) {
        GM_xmlhttpRequest({
            method: "HEAD",
            headers: {
                'Authorization': `Bearer ${token}`
            },
            url: `${registry}/${repo}/blobs/${blob}`,
            onload(x) {
                if (x.status == 200) {
                    callback(humanFileSize(x.responseHeaders.match(/content-length:\s*(\d+)/i)[1]))
                } else {
                    callback(x.statusText)
                }
            }
        })
    }
    function handleDownload(repo, token, blob, progress, finish, excep) {
        GM_xmlhttpRequest({
            method: "GET",
            headers: {
                'Authorization': `Bearer ${token}`
            },
            url: `${registry}/${repo}/blobs/${blob}`,
            responseType: 'blob',
            onload(x) {
                console.log('download finish', x)
                if (x.status == 200) {
                    const url = URL.createObjectURL(x.response)
                    finish(url)
                } else {
                    excep()
                }
            },
            onprogress({loaded, total}) {
                progress(loaded/total)
            },
            onerror(e) {
                console.error(e)
                excep()
            }
        })
    }
    function createBackdrop(cancel) {
        let backdrop = document.querySelector("#listview-backdrop");
        if (!backdrop) {
            backdrop = document.createElement('div')
            backdrop.id = 'listview-backdrop'
            backdrop.style.position = 'fixed'
            backdrop.style.zIndex = '1000'
            backdrop.style.backgroundColor = 'rgba(0, 0, 0, 0.5)'
            backdrop.style.top = '0'
            backdrop.style.left = '0'
            backdrop.style.right = '0'
            backdrop.style.bottom = '0'
            backdrop.style.justifyContent = 'center'
            backdrop.style.alignItems = 'center'
        }
        if (cancel) {
            backdrop.onclick = ({target}) => {
                if (target == backdrop) {
                    backdrop.style.display = 'none'
                }
            }
        } else {
            backdrop.onclick = null
        }
        while (backdrop.firstChild) backdrop.removeChild(backdrop.firstChild);
        backdrop.style.display = 'flex'
        document.body.appendChild(backdrop)
        return backdrop;
    }
    function listview(repo, token, list, tag) {
        const backdrop = createBackdrop(true)
        const root = document.createElement('ul')
        root.style.backgroundColor = 'rgba(255, 255, 255, 0.8)'
        root.style.borderRadius = '20px'
        root.style.maxWidth = "80vw"
        root.style.maxHeight = "80vh"
        root.style.overflow = "auto"
        root.style.margin = "0"
        root.style.padding = "0"
        root.style.listStyle = "none"
        backdrop.appendChild(root)
        const all = document.createElement('li')
        all.style.margin = '10px'
        all.style.padding = '10px'
        all.style.borderRadius = '10px'
        all.style.fontFamily = 'monospace'
        all.style.display = 'flex'
        all.style.flexDirection = 'column'
        all.style.cursor = 'pointer'
        all.onclick = () => {
            Array.from(root.querySelectorAll('.item.init')).forEach(x => x.click())
        }
        all.textContent = 'Download All'
        root.appendChild(all)
        list.forEach((blob, index) => {
            const li = document.createElement('li')
            function progress(n) {
                const p = n*100;
                li.style.background= `linear-gradient(to right, #ccc ${p}%, #fff ${p}%)`
            }
            li.style.margin = '10px'
            li.style.padding = '10px'
            li.style.borderRadius = '10px'
            li.style.fontFamily = 'monospace'
            li.style.display = 'flex'
            li.style.flexDirection = 'column'
            li.style.cursor = 'pointer'
            li.className = 'item init'
            progress(0)
            const label = document.createElement('span')
            label.textContent = blob
            label.style.color = 'black'
            li.appendChild(label)
            const size = document.createElement('span')
            size.textContent = 'size:querying...'
            headBlob(repo, token, blob, rst => (size.textContent = `size: ${rst}`))
            li.appendChild(size)
            function doDownload() {
                li.onclick = null;
                li.className = 'item'
                progress(0)
                handleDownload(repo, token, blob, progress, url => {
                    li.style.background = 'lightgreen'
                    li.onclick = () => {
                        const link = document.createElement('a')
                        link.href = url
                        link.download = repo + "/" + blob.replace(/[^:]+:/, '') + '.tar.gz'
                        link.click()
                    }
                }, () => {
                    li.style.background = '#fcc'
                    li.className = 'item init'
                })
            }
            li.onclick = doDownload
            root.appendChild(li)
        })
    }
    function main(repo) {
        console.log(`started: ${repo}`);
        const scanned = document.querySelector('[class^=Tags__cardHeader]') != null
        const tags = Array.from(document.querySelectorAll('[class^=FlexTable__flexRow]'))
        if (!document.querySelector('[class^=FlexTable__flexTable]')) {
            console.log('retry');
            setTimeout(detect, 500)
            return
        }
        tags.map(x => {
            const first = x.querySelector(scanned ? ':first-child > a' : ':first-child')
            const last = x.lastChild
            const tag = first.textContent
            const link = document.createElement('i')
            link.className = "fa fa-download fa-lg"
            link.style.color = "#c4cdda"
            link.style.alignSelf = "center"
            link.style.marginRight = "10px"
            link.style.cursor = "pointer"
            last.insertBefore(link, last.children[0])
            link.onclick = () => {
                const backdrop = createBackdrop()
                const loading = document.createElement('div')
                loading.textContent = 'Loading...'
                loading.style.background = 'white'
                loading.style.borderRadius = '20px'
                loading.style.padding = '20px'
                backdrop.appendChild(loading)
                auth(repo, token => {
                    console.log(token)
                    getLayers(token, repo, tag, layers => {
                        console.log(layers)
                        listview(repo, token, layers, tag)
                    })
                })
            }
        });

    }
    function detect() {
        const repo = location.pathname.match(/\/r\/((?:.*?)\/(?:.*?))\/tags\/?$/);
        if (repo) {
            setTimeout(() => main(repo[1]))
        } else {
            console.log("no match")
        }
        history.onpopstate = history.onpushstate = () => setTimeout(detect);
    }
    history.onpopstate = history.onpushstate = () => setTimeout(detect);
    detect();
})();