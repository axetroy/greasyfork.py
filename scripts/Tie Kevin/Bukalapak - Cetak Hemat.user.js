// ==UserScript==
// @name        Bukalapak - Cetak Hemat
// @namespace   www.dkijaya.com
// @version       2018.12.26
// @description   Cetak Slip Hemat Kertas dan Tinta utk 2 Order Konfirmasi
// @author        Capjago
// @include     https://www.bukalapak.com/payment/transactions/print_preview*
// @include     https://www.bukalapak.com/logistic/bookings/*
// ==/UserScript==

  /* ### HIDE LOGO IMAGES ###*/
  var namaclass = ['notice','brand-logo']; 
	for (var a = 0; a < namaclass.length; a++)
	{
  var divsToHide = document.getElementsByClassName(namaclass[a]);
  if ( divsToHide.length > 0 ) 
  	{
  	for (var i = 0; i < divsToHide.length; i++)	{ divsToHide[i].style.display = 'none'; }
  	}  
	}  
  
  var namatag = ['img','td'];
  for (var a = 0; a < namatag.length; a++)
  {
    var divsToHide = document.getElementsByTagName(namatag[a]);
    for (var i = 0; i < divsToHide.length; i++)	
    { 
      if  (divsToHide[i].alt == 'Jnt') 
      { 
        divsToHide[i].style.display = 'none'; 
        divsToHide[i+1].style.height = '20px'; 
      } 
        if  (divsToHide[i].alt == 'Jne') 
      { 
        divsToHide[i].style.display = 'none'; 
        divsToHide[i+1].style.height = '20px'; 
      } 
    }
  } 
  

/* ### BIGGER FONT ###*/
  var namaclass = ['bukalapak-transaction-slip-section--contact','bukalapak-transaction-slip-section--address']; 
	for (var a = 0; a < namaclass.length; a++)
	{
  var divsToHide = document.getElementsByClassName(namaclass[a]);
  if ( divsToHide.length > 0 ) 
  	{
  		for (var i = 0; i < divsToHide.length; i++)	
    	{ 
      if ( i%2 != 0 ) divsToHide[i].style.fontSize='170%';
    	}
  	}  
	}  

document.getElementsByTagName('td')[2].style.fontSize='150%';
document.getElementsByTagName('td')[2].style.fontWeight='700'; 
document.getElementsByTagName('td')[5].style.fontSize='150%';
document.getElementsByTagName('td')[5].style.fontWeight='700'; 

function CekLastWord(str, prefix) {
  //return str.indexOf(prefix) === 0;
  return str.endsWith(prefix);
}