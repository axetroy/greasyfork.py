// ==UserScript==
// @name JVC Topic Blacklist 2.0
// @version 2.0
// @description Blacklist les topics à partir d'une liste de mots clés
// @author sNet
// @match http://www.jeuxvideo.com/forums/*
// @require https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js
// @grant GM_addStyle
// @namespace https://greasyfork.org/users/14012
// ==/UserScript==

// Gestion du local storage

let dataBl;

var storedData = localStorage.getItem("dataBlJSON");
if (storedData) {
    dataBl = JSON.parse(storedData);
}
else {
    console.log("error : no stored data");
    dataBl = {};
}

// CSS

GM_addStyle (`

@import url(https://fonts.googleapis.com/css?family=Roboto:100);

.options-crumb {
	align-items:center;
	display:flex;
}

/* Button */

#btnParam {
  font-family: 'Varela Round', sans-serif;
  letter-spacing: 0.1em;
  color: #e8e8e8;
  border: none;
  border-radius: 10px;
  outline: none;
  background: #3c3c3c;
  background-size: 400% 400%;
  cursor: pointer;
  transition: all 0.3s ease;
  filter:brightness(70%);
}

#btnParam:hover {
    filter:brightness(100%);
}

.modal-closed {
	display:none;
}

.modal-open {

	font-family:"Roboto", sans-serif;
	font-weight:bold;
	display:grid;
	grid-template-rows: 10% auto 3%;
	grid-row-gap: 15px;
	width:23%;
	z-index:10000000000000000000000;
	position:fixed;
	top: 0px;
	bottom: 0px;
	right: 0px;
	background:#333;
	border:solid #aaaaaa 0.5px;
}

.modal-open p {
	color:#aaaaaa;
}

#modal-header {
	align-items:center;
	display:grid;
	grid-template-columns: auto auto;
	justify-items: center;
	border-bottom:solid #aaaaaa 0.5px;
}

#modal-title {
	color:#aaa;
	letter-spacing: 0.1em;
	font-family: 'Varela Round', sans-serif;
	white-space: nowrap;
	font-size:150%;
	font-weight:normal;
}

#closebtnheader {
	background:none;
	border:none;
	outline:none;
	color:#aaaaaa;
	font-size: 150%;
	transition: all 0.3s ease;
}

#closebtnheader:hover {
	color:#b00000
}

#modal-content {
display:grid;
grid-template-rows: 5% auto 5% 5%;
grid-row-gap: 10px;
justify-items: center;
}

#modal-content-btn {
	display:grid;
	grid-template-columns: auto auto;
	grid-column-gap: 20px;
}

#btn-save {
	background:teal;
	border:none;
	outline:none;
	color:#aaaaaa;
	filter:brightness(70%);
	transition: all 0.3s ease;
}

#btn-save:hover {
	filter:brightness(100%);
}

#btn-save-reload {
	background:#7070b6;
	border:none;
	outline:none;
	color:#aaaaaa;
	filter:brightness(70%);
	transition: all 0.3s ease;
}

#btn-save-reload:hover {
	filter:brightness(100%);
}

#savedText {
	display:none;
	transition:all 1s ease;
}

/* TAG */

#blInput {
    width: 90%;
    border: #000 1px solid !important;
	text-align:center;
}

#blInput:focus {
	outline:none;
	border: #6d6d6d 1px solid  !important;
}

#blValue {
	width:90%;
	background-color:#4a4a4a;
}

.blTag {
	background-color:#1a1a1a;
	padding:0.5em;
	margin:5px;
	display:inline-block;
}

.rmTag {
	background:none;
	border:none;
	outline:none;
	color:#aaaaaa;
	font-size: 100%;
	margin-left:10px;
	transition: all 0.3s ease;
}

.rmTag:hover {color:#b00000;}


`);

// HTML
function injectHtml()
{
    $('body').append(`
<div id="blModal" class="modal-closed">
    <div id="modal-header">
        <div id="modal-title">
            <modalTitle>Jvc Topic Blacklist</modalTitle>
        </div>
        <div id="modal-closer">
            <button id="closebtnheader">╳</button>
        </div>
    </div>
    <div id="modal-content">
		<input id="blInput" placeholder="Saisir un mot à blacklister (insensible a la case)"/>
		<div id="blValue">
		</div>
        <div id="modal-content-btn">
            <button id="btn-save">Sauvegarder</button>
            <button id="btn-save-reload">Sauvegarder et Rafraîchir</button>
        </div>
        <p id="savedText">Contenu sauvegardé</p>
    </div>
</div>
`);

// Button Script


}
function injectBtn() {
    $('.options-crumb').prepend('<button id="btnParam">Topic Blacklist</button>');
    $('#btnParam');
}


// Modal Script

function setTrig() {
    $('#btnParam').click(function() {
        if($('#blModal').attr("class") == ('modal-closed')) {
            initModal();
        }
        else {
            closeModal();
        }
    });
    //
    $('#closebtnheader').click(function() {
        closeModal();
    });
    //
    $('#btn-save').click(function() {
        saveBl();
    });
    //
    $('#btn-save-reload').click(function() {
        saveBl();
        location.reload();
    });
    $('#blValue').on("click",".rmTag",function() {
        this.parentElement.remove();
    });
}

function setInput() {
    $('#blInput').on('keydown',function(e){
        if(e.keyCode == 13 && this.value){
            var testVal = this.value.replace(/\s/g,'').toLowerCase();
            if(this.value == testVal || testVal.length>1) {
                $('#blValue').append("<div class='blTag'>"+testVal+"<button class='rmTag'>╳</button></div>");
            }
            this.value = "";
        }
    });
}


function initModal() {
    $('.modal-closed').removeClass().addClass('modal-open');
    if(dataBl.length>0)
    {
        for(var i=0;i<dataBl.length;i++) {
            $('#blValue').append(`<div class="blTag">`+dataBl[i]+`<button class='rmTag'>╳</button></div>`);
        }
    }
}

function closeModal() {
    $('.modal-open').removeClass().addClass('modal-closed');
}

function saveBl() {
    for(var i=0;i<$('.blTag').length;i++) {
        var value = $('.blTag')[i].innerText.slice(0, -1).toLowerCase();
        console.log("registered value : "+value);
        dataBl[i]=value;
    }
    localStorage.setItem("dataBlJSON",  JSON.stringify(dataBl));
    $('#savedText').css("display","block");
}

// Fonction Blacklist

function blacklister(){
    if(dataBl.length!=1) {
        var listeTopic = $('.topic-list-admin li:has(.topic-title)');
        var nbDeleted=0;
        for(var i=0;i<listeTopic.length;i++){
            for(var j=0;j<dataBl.length;j++) {
            	var regexTemp = new RegExp("\\b" + dataBl[j] + "s*\\b","gi");
                if(listeTopic[i].children[0].children[1].title.toLowerCase().match(regexTemp)) {
                    listeTopic[i].remove()
                    console.log("removed : "+listeTopic[i].children[0].children[1].title.toLowerCase());
                    nbDeleted++;
                }
            }
        }
    }
    else {
        console.log("error : array is empty");
    }
}

// Main

function main() {
    injectBtn();
    injectHtml();
    setInput();
    setTrig();
    blacklister();
}

// Execution du main au demarrage ...

window.onload=main();