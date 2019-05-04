// ==UserScript==
// @name        Show full size image in m.facebook.com
// @namespace		Show full size image in m.facebook.com
// @include     /^https\:\/\/m\.facebook\.com\//
// @version     2
// @author      zero0evolution
// @description  Show full size image in m.facebook.com, example site:"https://m.facebook.com/photo.php?fbid=...","https://m.facebook.com/.../photos/..."
// ==/UserScript==


// 圖片網頁格式
// /^https\:\/\/m\.facebook\.com\/(?:[0-9a-zA-Z\.]+\/photos\/[0-9a-zA-Z\.]+\/\d+|photo\.php\?fbid\=\d+)/


var unicodeToChar = (text)=>{
	text = text.replace(
		/\\u[\dA-F]{4}/gi,(match) => {
			// 刪掉\u
			match = match.replace(/\\u/g, '')
			// 16進位轉10進位
			match = parseInt(match, 16)
			// 轉字元
			match = String.fromCharCode(match)
			return(match)
		}
	)
	return(text)
}

var getHTML = async(link,encoding="UTF-8")=>{

	let response = await fetch(link).then(
		(response)=>{return(response)}
	)

	let arrayBuffer = await response.arrayBuffer().then(
		(arrayBuffer)=>{return(arrayBuffer)}
	)

	let htmlCode = new TextDecoder(encoding).decode(arrayBuffer)

	return(htmlCode)
}

var showFullSizeImgFunc = async(linkElem)=>{
	// console.log("showFullSizeImgFunc")
	if(linkElem.textContent.match(/^(?:全尺寸檢視|view full size)$/i)){
		var showImgElem = document.createElement("img")
		showImgElem.src = linkElem.href
		showImgElem.style.width = "auto"
		showImgElem.style.maxWidth = "100%"
		showImgElem.style.height = "100%"
		linkElem.appendChild(showImgElem)
		// console.log(showImgElem)
	}
	else if(linkElem.href.match(/^https\:\/\/m\.facebook\.com\/(?:[0-9a-zA-Z\.]+\/photos\/[0-9a-zA-Z\.]+\/\d+|photo\.php\?fbid\=\d+)/)){

		console.log("找到Facebook單圖片連結:",linkElem.href)
		var htmlCode = await getHTML(linkElem.href)

		var targetCodes = htmlCode.match(/\\u003Ca((?!\\u003Ca).)*?(?:\\u5168\\u5c3a\\u5bf8\\u6aa2\\u8996|Full Size View)\\u003C\\\/a\>/img)
		// 也許空格會用unicode表示
		if(targetCodes instanceof Array){
			for(let targetCode of targetCodes){
				console.log("找到目標HTML:",targetCode)
				targetCode = unicodeToChar(targetCode)
				targetCode = targetCode.replace(/\\([^\\])/mg,"$1")
				console.log("解碼HTML:",targetCode)

				var tempElem = document.createElement("div")
				tempElem.innerHTML = targetCode
				var imgLink = tempElem.firstChild.href

				console.log("全尺寸圖片連結:",imgLink)

				var imgElem = document.createElement("img")
				imgElem.src = imgLink

				var pasteElem = linkElem
				while(pasteElem !== document.body){
					if(pasteElem.style.height || pasteElem.style.width){
						pasteElem = pasteElem.parentElement
					}
					else{break}
				}
				pasteElem.appendChild(imgElem)
			}
		}
	}
}


var filterFunc = (topElem)=>{
	if(topElem.matches("a[href]")){
		showFullSizeImgFunc(topElem)
	}
	for(let linkElem of topElem.querySelectorAll("a[href]")){
		showFullSizeImgFunc(linkElem)
	}
}

filterFunc(document.documentElement)

//建立新的觀察物件
var observerObj = new MutationObserver(
	function (mutationObjs){
		for(let eachMutationObj of mutationObjs){
			for(let eachAddNode of eachMutationObj.addedNodes){
				if(eachAddNode.nodeType === 1){
					filterFunc(eachAddNode)
				}
			}
		}
	}
)

observerObj.observe(
	document.documentElement,{
		childList:true,
		subtree:true,
	}
)