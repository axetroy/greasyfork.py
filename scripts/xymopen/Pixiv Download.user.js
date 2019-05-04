// ==UserScript==
// @name		Pixiv Download
// @namespace	xuyiming.open@outlook.com
// @description	Download images from pixiv.net
// @author		xymopen
// @version		1.0.1
// @include		http://www.pixiv.net/member_illust.php?*mode=medium*
// @include		https://www.pixiv.net/member_illust.php?*mode=medium*
// @include		http://www.pixiv.net/member_illust.php?*mode=manga*
// @include		https://www.pixiv.net/member_illust.php?*mode=manga*
// @match		http://www.pixiv.net/member_illust.php?*mode=medium*
// @match		https://www.pixiv.net/member_illust.php?*mode=medium*
// @match		http://www.pixiv.net/member_illust.php?*mode=manga*
// @match		https://www.pixiv.net/member_illust.php?*mode=manga*
// @grant		unsafeWindow
// @grant		GM_addStyle
// @grant		GM_xmlhttpRequest
// @connect		i.pximg.net
// @connect		i1.pixiv.net
// @connect		i2.pixiv.net
// @connect		i3.pixiv.net
// @connect		i4.pixiv.net
// @connect		i5.pixiv.net
// ==/UserScript==

( () => {
	function toFragment( domstring ) {
		let divEl = document.createElement( "div" );

		divEl.innerHTML = domstring;

		return Array.from( divEl.childNodes ).reduce( ( fragment, node ) => {
			fragment.appendChild( node );

			return fragment;
		}, document.createDocumentFragment() );
	};

	function xGM_bufferRequest( request ) {
		// https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/Using_XMLHttpRequest#Handling_binary_data
		let onload = request.onload;

		return GM_xmlhttpRequest( Object.assign( request, {
			overrideMimeType: "text/plain; charset=x-user-defined",
			onload: ( response ) => {
				let buffer = new Uint8Array( response.responseText.length );

				for ( let i = 0; i < response.responseText.length; i += 1 ) {
					buffer[ i ] = response.responseText.charCodeAt( i );
				}

				onload.call( request, buffer );
			}
		} ) );
	};

	const getFilename = url => new URL( url ).pathname.split( "/" ).pop();

	const getExtname = filename => filename.match( /(?=.)\w+$/ ).toString();

	const getImageMIME = filename => ( {
		"jpg": "image/jpeg",
		"jepg": "image/jpeg",
		"png": "image/png",
		"gif": "image/gif",
	} )[ getExtname( filename ) ] || "application/octet-stream";

	GM_addStyle(
		"._download1-container ._download {"																+
			"display: inline-block;"																		+
			"position: relative;"																			+
			"height: 30px;"																					+
			"margin-left: 4px;"																				+
			"padding: 0 16px;"																				+
			"background-color: #eeeeee;"																	+
			"line-height: 30px;"																			+
			"border-radius: 4px;"																			+
			"text-align: center;"																			+
			"white-space: nowrap;"																			+
			"transition: background-color 0.4s;"															+
			"cursor: pointer;"																				+
		"}"																									+

		"._download1-container ._download:hover {"															+
			"background-color: #e3e3e3;"																	+
		"}"																									+

		"._download1-container .description {"																+
			"font-size: 12px;"																				+
			"font-weight: bold;"																			+
			"font-family: 'Helvetica Neue', 'Arial', 'Hiragino Kaku Gothic ProN', 'Meiryo', sans-serif;"	+
			"color: #666;"																					+
			"display: inline-block;"																		+
			"vertical-align: top;"																			+
		"}"																									+

		'._download2-container {'																			+
			'-moz-border-radius: 5px;'																		+
			'-webkit-border-radius: 5px;'																	+
			'border-radius: 5px;'																			+
			'display: inline-block;'																		+
			'margin: 5px 0 0 5px;'																			+
			'padding: 6px;'																					+
			'font-weight: bold;'																			+
			'cursor: pointer;'																				+
		'}'																									+

		'._download2-container:hover {'																		+
			'padding: 5px;'																					+
			'border: 1px solid #d6dee5'																		+
		'}'																									+

		'._download2-container i {'																			+
			'display: inline-block;'																		+
			'vertical-align: middle;'																		+
			'line-height: 1;'																				+
			'speak: none;'																					+
		'}'
	);

	let theDom1 = toFragment(
		'<div class="_download1-container">'																+
			'<a class="_download">'																			+
				'<span class="description">&#19979;&#36733;</span>'											+
			'</a>'																							+
		'</div>'
	);

	let theDom2 = toFragment(
		'<a href="#" class="_download2-container" >'														+
			'<i>'																							+
				'<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25">'							+
					// steal from GitHub's Octicons licensed under
					// MIT(https://github.com/primer/octicons/blob/master/LICENSE)
					'<path '																				+
						'd="'																				+
							'M4 '																			+
							'6h3V0h2v6h3l-4 '																+
							'4-4-4zm11-4h-4v1h4v8H1V3h4V2H1c-.55 '											+
							'0-1 '																			+
							'.45-1 '																		+
							'1v9c0 '																		+
							'.55.45 '																		+
							'1 '																			+
							'1 '																			+
							'1h5.34c-.25.61-.86 '															+
							'1.39-2.34 '																	+
							'2h8c-1.48-.61-2.09-1.39-2.34-2H15c.55 '										+
							'0 '																			+
							'1-.45 '																		+
							'1-1V3c0-.55-.45-1-1-1z"'														+
						'transform="scale(1.56)"'															+
						'fill="#CCC" />'																	+
				'</svg>'																					+
			'</i>'																							+
		'</a>'
	);

	function patchAnchor( a, getDetails ) {
		a.href = "#";
		a.dataset.state = "unfetched";

		a.addEventListener( "click", async () => {
			event.stopPropagation();
			event.stopImmediatePropagation();

			if ( "unfetched" === a.dataset.state ) {
				event.preventDefault();
				a.dataset.state = "fetching";

				let { url, filename, mime } = await getDetails();

				xGM_bufferRequest( {
					method: "GET",
					url: url,
					headers: { referer: document.URL },
					onload: buffer => {
						let blob = new Blob( [ buffer ], { "type": mime } ),
							blobURL = URL.createObjectURL( blob );

						a.href = blobURL;
						a.download = filename;
						a.dataset.state = "fetched";
						a.click();
					},
					onerror: () => {
						a.dataset.state = "error";
						alert( `Fail to fetch ${ url }` );
					}
				} );
			}
		} );

		return a;
	};

	function genGetDetails( mangaBigURL ) {
		return () => {
			return new Promise( ( resolve, reject ) => {
				let xhr = new XMLHttpRequest();

				xhr.responseType = "document";

				xhr.addEventListener( "load", function () {
					let doc = xhr.response,
						url = doc.querySelector( "img" ).src,
						filename = `pixiv_${ getFilename( url ) }`,
						mime = getImageMIME( filename );

					resolve( { url, filename, mime } );
				}, false );

				xhr.addEventListener( "error", function ( event ) {
					reject( event.error );
				}, false );

				xhr.open( "GET", mangaBigURL );
				xhr.send();

			} );
		}
	};

	let bookmarkContainer = document.querySelector( ".bookmark-container" ),
		divPageCount = document.querySelector( ".page-count" ),
		itemContainers = document.querySelectorAll( ".item-container" );

	if ( "ugokuIllustFullscreenData" in unsafeWindow.pixiv.context ) {
		let dom = theDom1,
			a = dom.querySelector( "._download" );

		patchAnchor( a, () => {
			let url = unsafeWindow.pixiv.context.ugokuIllustFullscreenData.src,
				filename = `pixiv_${ getFilename( url ) }`,
				mime = "application/octet-stream";

			return { url, filename, mime };
		} );

		bookmarkContainer.parentNode.insertBefore( dom, bookmarkContainer );
	} else if ( itemContainers.length > 0 ) {
		GM_addStyle(
			".image {" +
			"margin-right: 0;" +
			"}"
		);

		Array.from( itemContainers ).forEach( async item => {
			let url = item.querySelector( ".full-size-container" ).href,
				dom = theDom2.cloneNode( true ),
				a = dom.querySelector( "._download2-container" );

			patchAnchor( a, genGetDetails( url ) );

			item.appendChild( dom );
		} );
	} else if ( !divPageCount || parseInt( divPageCount.textContent ) == 1 ) {
		let dom = theDom1,
			a = dom.querySelector( "._download" );

		patchAnchor( a, () => {
			let url = document.querySelector( ".original-image" ).dataset.src,
				filename = `pixiv_${ getFilename( url ) }`,
				mime = getImageMIME( filename );

			return { url, filename, mime };
		} );

		bookmarkContainer.parentNode.insertBefore( dom, bookmarkContainer );
	}
} )();