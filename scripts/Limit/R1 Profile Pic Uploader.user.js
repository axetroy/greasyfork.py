// ==UserScript==
// @name         R1 Profile Pic Uploader
// @namespace    http://tampermonkey.net/
// @version      1.2
// @description  Fix v4's image uploader for users with flash disabled
// @author       LiMiTx
// @match        http://www.rewards1.com/forums-profile.php*
// @grant        none
// ==/UserScript==

$('#image_uploader').html('<canvas id="drop" style="background: #eee; border: 2px solid #ddd;" width="500" height="500"></canvas><input id="dropsubmit" type="submit" />');
var userId = $('[name="user_id"]').val();
var $dropZone = $('#drop');
var dropZone = $dropZone[0];
var ctx = dropZone.getContext("2d");

function dataURItoBlob(dataURI) {
    var byteString = atob(dataURI.split(',')[1]);
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    var blob = new Blob([ab], {
        type: mimeString
    });
    return blob;
}

function dragEnter(ev) {
    ev.preventDefault();
    $dropZone.css('border-color', 'orange');
}

function dragOver(ev) {
    ev.preventDefault();
}

function dragLeave(ev) {
    ev.preventDefault();
    $dropZone.css('border-color', '');
}

function drop(ev) {
    ev.preventDefault();
    var files = ev.dataTransfer.files;
    var reader = new FileReader();
    var file = files[0];
    reader.onload = function() {
        var img = new Image();
        img.onload = function() {
            var scale = 1;
            if (img.width > img.height) {
                scale = 500 / img.width;
            } else {
                scale = 500 / img.height;
            }
            dropZone.width = img.width * scale;
            dropZone.height = img.height * scale;
            ctx.fillStyle = "#fff";
            ctx.fillRect(0, 0, dropZone.width, dropZone.height);
            ctx.drawImage(img, 0, 0, dropZone.width, dropZone.height);
        };
        img.src = reader.result;
    };
    reader.onloadend = function() {
    };
    if (file.type.match('image.*')) {
        reader.readAsDataURL(file);
    } else {
        alert('Please upload an image');
    }
    $dropZone.css('border-color', '');
}
ctx.fillStyle = "#666";
ctx.font = "bold 16px Arial";
ctx.textBaseline = 'middle';
ctx.textAlign = 'center';
ctx.fillText("Drag and drop an image here", 250, 250);
dropZone.addEventListener('dragenter', dragEnter, false);
dropZone.addEventListener('dragover', dragOver, false);
dropZone.addEventListener('dragleave', dragLeave, false);
dropZone.addEventListener('drop', drop, false);
$('#dropsubmit').click(() => {

    var blob = dataURItoBlob(dropZone.toDataURL("image/jpeg"));
    var formData = new FormData();
    formData.append('user_prize_id', '');
    formData.append('pic_type', 'profile_avatar');
    formData.append('user_id', userId);
    formData.append('Filename', userId + '.jpg');
    formData.append('Filedata', blob, userId + '.jpg');
    formData.append('Upload', 'Submit Query');

    var xhr = new XMLHttpRequest();
    xhr.onload = () => {
        location.reload(true);
    };
    xhr.open('post', '/image_upload_handler.php');
    xhr.send(formData);
});