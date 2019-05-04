// ==UserScript==
// @name         download photos for free
// @namespace    https://www.webinpaint.com
// @version      5.0
// @description  download photos for free from the site inpaint
// @author       sultan alrefaei
// @match        https://www.webinpaint.com/
// @match        https://www.webinpaint.com/*
// @grant        none
// ==/UserScript==

window.onload = (e)=>{
    const head = document.getElementsByTagName("head")[0];
    const canvas = document.getElementById("mainCanvas");

    var font = document.createElement("link");
    font.setAttribute("href", "https://fonts.googleapis.com/css?family=Changa");
    font.setAttribute("rel", "stylesheet");
    head.appendChild(font);

    var cssbottombar = "position: fixed;"
    + "width: 100%;"
    + "left: 0;"
    + "bottom: 0;"
    + "line-height: 4;"
    + "color: #fff;"
    + "height: 60px;"
    + "font-family: 'Changa', sans-serif;"
    + "background-color: #000000a3;"
    + "text-align: center;";

    var cssbtn = "position: relative;"
    + "padding: 10px;"
    + "width: 150px;"
    + "height: 35px;"
    + "cursor: pointer;"
    + "text-decoration: none;"
    + "border-radius: 5px;"
    + "text-align: center;"
    + "color: #fff;"
    + "line-height: 1;"
    + "user-select: none;"
    + "font-family: 'Changa', sans-serif;"
    + "background-color: #48a031;"
    + "border-color: #239a1d;"
    + "float: right;"
    + "margin: 15px;";

    var cssbtnFit = "position: relative;"
    + "padding: 10px;"
    + "width: 150px;"
    + "height: 35px;"
    + "cursor: pointer;"
    + "text-decoration: none;"
    + "border-radius: 5px;"
    + "text-align: center;"
    + "color: #fff;"
    + "line-height: 1;"
    + "user-select: none;"
    + "font-family: 'Changa', sans-serif;"
    + "background-color: #3173a0;"
    + "border-color: #124680;"
    + "float: right;"
    + "margin: 15px;";

    var dialogParent = "position: fixed;"
    + "z-index: 1000000000000;"
    + "width: 100%;"
    + "height: 100%;"
    + "top: 0px;"
    + "left: 0px;"
    + "text-align: center;"
    + "font-family: 'Changa', sans-serif;"
    + "user-select: none;"
    + "background-color: #0000008f;";

    var dialog = "position: relative;"
    + "margin: auto;"
    + "margin-top: 6em;"
    + "width: 300px;"
    + "height: 350px;"
    + "text-align: center;"
    + "font-family: 'Changa', sans-serif;"
    + "padding: 5px;"
    + "border-radius: 5px;"
    + "background-color: #f8f8f8;";

    var btnAccept = "position: absolute;"
    + "left: 0;"
    + "width: 100%;"
    + "height: 50px;"
    + "font-size: 20px;"
    + "font-family: 'Changa', sans-serif;"
    + "border: none;"
    + "border-radius: 0 0 5px 5px;"
    + "color: #fff;"
    + "background-color: #77d66a;"
    + "bottom: 0;";

    var cssinputWidth = "position: absolute;"
    + "left: 10px;"
    + "width: 80px;"
    + "height: 35px;"
    + "text-align: center;"
    + "color: black;"
    + "top: 15px;";

    var cssinputHeight = "position: absolute;"
    + "left: 100px;"
    + "width: 80px;"
    + "height: 35px;"
    + "text-align: center;"
    + "color: black;"
    + "top: 15px;";

    var cssbtnChangeSize = "position: absolute;"
    + "left: 200px;"
    + "width: 80px;"
    + "height: 35px;"
    + "text-align: center;"
    + "text-decoration: none;"
    + "user-select: none;"
    + "color: white;"
    + "background-color: #3173a0;"
    + "top: 15px;"
    + "border: none;"
    + "line-height: 2.5;"
    + "border-radius: 5px;"
    + "cursor: pointer;";

    if (canvas){
        if (!document.cookie.includes("dialog")){
            document.cookie = "dialog=true";
        }
        var erase = document.getElementsByClassName("btn btn-success");
        for (let i = 0; i < erase.length; i++){
            if(erase[i].innerText.includes("Erase")){
                erase[i].addEventListener("click", (e)=>{
                    var timer = setInterval((e)=>{
                        if (!document.getElementById("progressDialog").className.includes("in") && !document.body.className.includes("modal-open")){
                            document.getElementById("download").style.display = "block";
                            clearInterval(timer);
                        }else{
                            document.getElementById("download").style.display = "none";
                        }   
                    }, 100);
                });
            }
        }

        var dialogParentDiv = document.createElement("div");
        dialogParentDiv.setAttribute("id", "dialogParent");
        dialogParentDiv.setAttribute("style", dialogParent);
        document.body.appendChild(dialogParentDiv);

        if (!document.cookie.includes("dialog=true")){
            document.getElementById("dialogParent").style.display = "none";
        }else{
            document.getElementById("dialogParent").style.display = "block";
        }

        var dialogDiv = document.createElement("div");
        dialogDiv.setAttribute("id", "dialogDiv");
        dialogDiv.setAttribute("style", dialog);
        dialogDiv.innerHTML = "<h3>تنبيه</h3><hr>"
        + "<p style='font-size: 17px;'>نود إخباركم بأن هذه الإضافة التي تمكنكم من تحميل الصور بشكل مجانا، وغير رسمي أو قانوني، وهي مخالفة للحقوق المتبعه ولذلك نود أن نقول من هذا المنطلق، أننا غير مسؤولون عن أي تصرف من قبلكم، ونحن غير مسؤولون عن أي عقوبة كانت قد أتتكم من استخدامكم لهذه الإضافة</p>";
        dialogParentDiv.appendChild(dialogDiv);

        var btnAcceptNode = document.createElement("button");
        btnAcceptNode.setAttribute("id", "btnAccept");
        btnAcceptNode.setAttribute("style", btnAccept);
        btnAcceptNode.innerText = "حسنا أعي ذلك"
        btnAcceptNode.addEventListener("click", (e)=>{
            document.cookie = "dialog=false";
            document.getElementById("dialogParent").style.display = "none";
        });
        dialogDiv.appendChild(btnAcceptNode);


        var bottombar = document.createElement("div");
        bottombar.setAttribute("id", "bottombar");
        bottombar.setAttribute("style", cssbottombar);
        document.body.appendChild(bottombar);

        var downloadbtn = document.createElement("a");
        downloadbtn.setAttribute("id", "download");
        downloadbtn.setAttribute("style", cssbtn);
        downloadbtn.style.display = "none";
        downloadbtn.innerText = "تحميل الصورة مجانا";
        downloadbtn.addEventListener("click", (e)=>{
            var src = canvas.toDataURL("image/png");
            download(src);
        });
        bottombar.appendChild(downloadbtn);

        var fitbtn = document.createElement("a");
        fitbtn.setAttribute("id", "fit");
        fitbtn.setAttribute("style", cssbtnFit);
        fitbtn.innerText = "تحجيم الصورة";
        fitbtn.addEventListener("click", (e)=>{
            var btn = document.getElementsByClassName("btn btn-default");
            for (let i = 0; i < btn.length; i++){
                if(btn[i].getAttribute("data-act") == "zoomToFit"){
                    btn[i].click();
                }
            }
        });
        bottombar.appendChild(fitbtn);


        var inputWidth = document.createElement("input");
        inputWidth.setAttribute("type", "number");
        inputWidth.setAttribute("id", "inputWidth");
        inputWidth.setAttribute("placeholder", "العرض");
        inputWidth.setAttribute("style", cssinputWidth);
        bottombar.appendChild(inputWidth);

        var inputHeight = document.createElement("input");
        inputHeight.setAttribute("type", "number");
        inputHeight.setAttribute("id", "inputHeight");
        inputHeight.setAttribute("placeholder", "الطول");
        inputHeight.setAttribute("style", cssinputHeight);
        bottombar.appendChild(inputHeight);

        var btnChangeSize = document.createElement("a");
        btnChangeSize.setAttribute("id", "btnChangeSize");
        btnChangeSize.setAttribute("style", cssbtnChangeSize);
        btnChangeSize.innerText = "تغير الحجم"
        btnChangeSize.addEventListener("click", (e)=>{
            var width = document.getElementById("inputWidth").value;
            var height = document.getElementById("inputHeight").value;
            canvas.width = width;
            canvas.height = height;
            var btn = document.getElementsByClassName("btn btn-default");
            for (let i = 0; i < btn.length; i++){
                if(btn[i].getAttribute("data-act") == "zoomToFit"){
                    btn[i].click();
                }
            }
        });
        bottombar.appendChild(btnChangeSize);
    }
    function download(src){
        var download = document.getElementById("download");
        var d = new Date();
		if (download){
            var image = src.replace("image/png", "image/octet-stream");
            download.setAttribute("href", image);
            download.setAttribute("download", d.getTime() + "_STN_" + d.getTime() + ".png");
        }
        setTimeout((e)=>{
            download.setAttribute("href", "");
            document.getElementById("download").style.display = "none";
        });
	}
}