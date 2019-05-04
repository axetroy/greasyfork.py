// ==UserScript==
// @name Debian package cross link
// @description Link between Debian and Ubuntu package page
// @namespace https://franklinyu.github.io
// @version 0.1.0
// @match https://packages.debian.org/*
// @exclude https://packages.debian.org/about/*
// @exclude https://packages.debian.org/search?*
// @exclude https://packages.debian.org/*/filelist
// @exclude https://packages.debian.org/*/download
// @match https://packages.ubuntu.com/*
// @exclude https://packages.ubuntu.com/about/*
// @exclude https://packages.ubuntu.com/search?*
// @exclude https://packages.ubuntu.com/*/filelist
// @exclude https://packages.ubuntu.com/*/download
// @grant none
// ==/UserScript==

let url
let text
if (location.hostname === 'packages.debian.org') {
	url = new URL('https://packages.ubuntu.com/search')
	text = 'Ubuntu'
} else {
	url = new URL('https://packages.debian.org/search')
	text = 'Debian'
}
url.searchParams.append('exact', 1)

if (location.pathname.startsWith('/source/')) {
	const package = location.pathname.split('/')[3]
	if (!package)
		throw location.pathname
	url.searchParams.append('keywords', package)
	url.searchParams.append('searchon', 'sourcenames')
} else {
	const package = location.pathname.split('/')[2]
	if (!package)
		throw location.pathname
	url.searchParams.append('keywords', package)
}

const anchor = document.createElement('a')
anchor.href = url
anchor.innerText = text
document.getElementById('pothers').innerHTML += ` [ ${anchor.outerHTML} ]`
