// ==UserScript==
// @name           WME URComments Italian List
// @description    This script is for Custom comments to be used with my other script URComments
// @namespace      RickZabel@gmail.com
// @grant          none
// @grant          GM_info
// @version        0.1.0
// @match          https://editor-beta.waze.com/*editor*
// @match          https://beta.waze.com/*editor*
// @match          https://www.waze.com/*editor*
// @author         Rick Zabel '2014
// @license        MIT/BSD/X11
// @icon			data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC0AAAAwCAYAAACFUvPfAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NTc3MiwgMjAxNC8wMS8xMy0xOTo0NDowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjQyQjZDNjdEODYzODExRTRBRDY0Q0I2QjA1MjU4N0EyIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjQyQjZDNjdFODYzODExRTRBRDY0Q0I2QjA1MjU4N0EyIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NDJCNkM2N0I4NjM4MTFFNEFENjRDQjZCMDUyNTg3QTIiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NDJCNkM2N0M4NjM4MTFFNEFENjRDQjZCMDUyNTg3QTIiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6++Bk8AAANOElEQVR42tRZCWxU1xW9M39mPB5v431fMLYJdmpjthQUVsdlS9IQQkpIIDRhl5pKQUpbKkAEpakQIhVVRUytQIGwihCaBkgItQELQosxdrDZ7Njjbbx7vM0+f3ruZDz1NmTGhEj59tOb//979553313fl9jtdvqpXbLHRVgikTz0NbdJkyYJERERUp1OJ1Wr1WJLS4tYXFxswzu7s408+XFJ2g1oSUZGhtzf318piqLKx8dHZbPZFFKpVMC9TRAEs8lk0uNe39vbaywvL7eMBP5HAz179myZxWLxxfNg3IZHRkbG5OTkpEPSkQAs1Wq1nQUFBVXt7e2twNSGMdx3yuVyQ2FhofVHBw01kCsUigA8i1m9evXc3Nzc5TExMRMhUfnAOZC6VaPRlJ8+ffrzM2fOXMW9BvgazWZzD9TG8qOBZgnr9fqg5OTklPfff39bUlLSfL3ZKvmmqZ2q2rqoy2h2jAtSKmhsaBD9LDqUVAqZ/fbt29c2b978IfS9HCqjUalUXf0Sfyygp0+f7kB8584d6bhx4/xTU1PT9uzZk69WB2derdHSxQf1ZLTaRpyrlAmUkxpH05OiqbGxoWrjxo07Wltbb0KFNNevX+/FENEBmqUyWvCTJ0+WDPEKrh4S8oFXiDp+/HhedHT0M6fKvqWbDa0e0Z0YG05LMpPp/v37xWvXrn0XqlRWX1+vraysNEkfZu38zE1zXHPmzOH53ARuAQEBUuieBM2OJoaFhSl27NixAPr7TGFVo8eA+eKxPAc7Nen111/PgX5HxMXF+TIsmSe+1bkbEuintKamRoBeyqxWq6Knp0eA2xJAUAJ3Zce9+PTTT9tkMpkF7opgQEEwwjU6g4kKKhu83sWCynrKjg2jhQsXPrd///4L2Dkm0iv9PntiSUIF5JmZmSpMCsI2hwNMNBYSC4+QgLUkoE909vF4HoP3kVhY+Pz589Mh/czi+layiqLXoK2inXhuVFRUUlZWViIE45eSkiI8LCKyZAUAZbfki8sfxhA4bdq0+GXLluUmJCRMBqCxkHQY9E2BdxwY2iDtqtra2hsHDhy4jIVOYTqV8BIDr3ERakd/r0Xn9nf/9aBNx4YpmTlzZtrNmzcvBwUFuQXNIZaDgRJS84eDV8+bN2/cqlWr1rF+AqTMbDFRU72WdI29ZNZbSaGSKdQx/jFRcdExERGTZ6Snp/8GYbmGiXVBPQZeyyakOvrtX/7X7e/+S2f4ziXCPoIhaam73MMBGJcvBgXBP4bv3LnztSlTpmwAWOW9svtU/kkd1V/rINE23ONIBQnFTQuh1OciZXHJsSn8TBwy7NitB67g7O53/yX8386sHOqhgnbZSCrBEoaOqpVKZXReXt5W6OfC5uZGuvjnW9RU2v1QPbRZ7aS50kbVl5spY2kHLdg4i0L9lNRtMrvGDNx+d7/7rxCVj6Nva2vTArARPts21BClHR0dPqy7MKgIAOYItrD8ZgUdWXmFtCVdZIfYPGsILufqsBsipYYHjTpQpYWrCXjEixcv3oKX6oNXGgRasmDBAhkyMD+MCd21a9dKAF5QUVxB598uJZvR5nB9njZHcOm20oOva2lKfAT5yASvAXN0nIy5zc3NJRUVFd/CvvpY26QDsjABhqMEw0AYXQZ0eG1TUwOd+30pr9QrwA7Q+JfapVT0j1sE46BF4xO9Bv1sehIDF8+ePfsR7KmF01UOG/06LUGIFIKDg33hwtRvvPHGagzyOf9uMVlNVrdEx+ZEUdZLSZSYlkBymYK6ejrp/rVqupFfTT3NBodNNd1pp6IjJTRzxSRHcsR5hyfXL9LiaWJcOOcvJ/Pz8wvgSjud+bXLe0iR3yogIb+JEyeOiY+Pn1VRUkHaMt3I5Y5CSs/unkTjJ4wf9FwdGEJT54VQ1px0Or21kKqLWhGdZHRpXwn5h6goZ9F4ig5UEecgBsvIwghVKSHhRPjsYIIgv3jrrbfeMxqNWrhQA0DbXaChGhKkjwpI2W/JkiXsh4XS4xq3SdSczRnDAA+8fBS+9OKOuZS/4jPS1fUhlRTo0z8VUGeHjua+Ng3pp47+U9viGv8Egkp0oB+NCQlEehrI6mhEarpvw4YNfzMYDM3IEntPnjxpG1QjsmogPCtgnX6JiYnZJrPRISW7OBy0b4Ccsudkfu/2KuQ+NGXtGPrij9+QiD8b/vyDVWSDfVQ0dTrGBPjI6YUnk+mJyGDOF+wACCj1Xx47duwQ9Pge7ruReJmcdePgwjY8PFzKtRoinxKpZFJjbSNXESOCCc8IIgQdj/QyeUI8AkupA3DChCiaujCTyps7KF7tT2mQ7oSYMJJJyFp840beoUOHjiBM17OHAG8DUgTzgCJ3eDXOKSUsU4ZtUSDHUHc0drlVjYAYpcfWLyBL6KczY/kkkkgl9CQqE27skZAb30Cuve/ChQuFiA9aCM9YVFRke1gl7gKN1UkQtlnaUq7bLMglyA3omGzPA0VjdZODDjJwOrXlIl3PKiOFv5ySc8IoKT2BkMt8AL4VXMjCyPq+D+ywcw+AtbNKoFnkKplctItDPIZArx6cRWOSx3oMuvhgFfXTsejtVH2tyZHspuZGENwru68upAt9UDeLp4DJWXUQJyFI6kVMtvX19XWExquHBQsL/PX9As8T+Suffk0PLjcOCjZkl3CFR5Fjwnh3O2BDlv4kyJvA5QDNFYczizK3t7fXxMbHkVQhcUhpYCvaW0H7Vp+iqsoHDwX87xNF9MWOkmHzuTHdmLg4gg5XMz/m6+RPXkkamZOIbeItMty7d++WXCan1LnRHOaHtbpbzVT4QZljxTbRRof/8E/au+oEHd3+LxewygtNI87llga6TP/u3bulzI/5Mn+vz/JQMNpQdXCmrj948GBRbm7uqqmvjfOpOKsZcdK317T0l5c/JptJpM7671LV+jJCFvixw0O01ejcV++vphFU0XT48OEi2I+e8yrm77WkCwsLRURDM3S6j8t0RKPC1CfSaOysGLd61VrZSR11XYOetWl01Frd6XYO00sbP47gKQpRkmmZH/Nl/l6DZhMBWOT+FnY7nbt37z4Bwfcs3jaLfIOUXmd4IzWmw/SYLtNnPsyP+XrjOQaBhqO3wmfqwUBXVVVVjVj/kTooxL48fzYJPsKIRuVp4/lMh+kxXabPfJgf8x0taEcph2TbzPEev1v27t174dKlS6fGpqTSm0fnU0C4alQS5nk8n+mA3idMl+kzH+bntFAaLWiWNm+VHv6zHX3D1q1bD3/11VcnksYki7898yvKfGkMOHgGlsdlvphMPI/nMx3QO8R0nfT1Tn5en8e5zvIGFrZc6fDBDIhHwJfGvvLKK7NXrFjxa+QoIVptA109WUqlJ2uot1M/jKBcIaOpq9Jo+tIsio6O5RjQgWToo6NHj15C1G2AHrfA+PggxAgDdOUZ3pwlDgU9CDhcUgDcUxisPDIkJCQBCflzTz311BzUkUG1dTX01+c/Iat5sLd6YefPadaiGQy2+/r16wV79uz5rLOzUwNazdDhNtDqGQr4hwDtAg7GCpVK5YeQq4bUQyCpSDCOfeedd55HHTm/8MwV+nTzVdekJ+cn0Zu7XubsrWLNmjUfYpfq0Jqw8HaEah0KjT5OOYcC/qFAu87xAF6u0+mU2FJ/gOZTnkg8jz9w4MCm5OTkjL+/fYxun9eQOiqAfvf5ShQOEt26deve1Wg0d0FbC3VoR+tBns7StTgNzz7SIedoDJFGOGfmbbYhxzZBWj0A3c6SQ2vYtm1bPpKrruXvLSJ1tD+9ujeHfJV+Yl5e3n4EjkoGDJVoY8A8f0ColgykP6qvDCPp9NKlS6UlJSUyqIYMDAU+u8MYmfNLlD+kHQbgcYsXL56xadOm9XpDr9RPFUAFBQVfbtmy5Qho1rFb4zVjjhH31sDAQCvcHJ+7WLu7u22IitaBn94eRT1cugxg/CXKl8/vMEbOF/d8tIBxfIIaivvI7du3/zInJ2d2XV1dzcqVKz+EZDlb4tPzHrw3YryZQXNihN0y8yIw1xAREWE8d+5cv7o8EmhpSkqKHGWPH0Cr+XiMz4TZk3Apxh6tHziYx+J3KNYSCA+xaOfOnVeqq6ubQUuH941o7NYYlJULC4w14Z0ehtyLe37XY8SFOtD6HWa7d1newEVwkcuqwODQs5T5k4EvepY+PxMgMTkWwc9l4Gtfv379ebwX0QS89+HzE/Qc7fhs28qVCcYL/LUAcy0Od65QCJj7g3xmtrPBREVFOXJrMOdi1wYAnLbKISHWbWbOC+vg+XzPjZUV4/mrq5V7bpC2o7jghnszABv4EJH9NPhY+w9fHhl0dna2FQQNXE1gK01wdQpIhMexWjgAcyXt7LmxivEnGTvXmUyDF8D3zm13nCszcNZrVhN4HRaC2Z37G5X36P/YjtJLCA0NlfIRA38UQi+BtCT8Ycj5hVUy/NhAcIFgb8H3SqVSZCH4+fmJ7DmgguLjiIhDvwmyG+SyTALmHvtYLNIOcHaei5S0H5X9UYPL/wQYAOwQASZqvrLnAAAAAElFTkSuQmCC
// ==/UserScript==

var UrcommentsItalianVersion = GM_info.script.version;
//var UrcommentsItalianVersion = "0.0.0"; //manually change this version number to match the script's version
var UrcommentsItalianUpdateMessage = "yes"; // yes alert the user, no has a silent update.
var UrcommentsItalianVersionUpdateNotes = "URC Italian List è stata aggiornata alla versione " + UrcommentsItalianVersion;
UrcommentsItalianVersionUpdateNotes = UrcommentsItalianVersionUpdateNotes + "\n" +
"Changelog:\n * 0.1.0 31/08/2017 - Modifiche necessarie a seguito dell'aggiornamento dello script principale \n ATTENZIONE: RISELEZIONARE NELLE IMPOSTAZIONI LA PERSONALIZZAZIONE ITALIANA" +
"\n * 0.0.9 30/08/2017 - Tradotto alcuni messaggi di sistema e aggiunto messaggio per limite velocità invariato" +
"\n * 0.0.8 26/08/2017 - Aggiunto sollecito risposta nonostante correzioni effettuate" +
"\n* 0.0.7 25/08/2017 - Aggiunto messaggio automatico per Svolta non consentita e Indicazioni di guida errate" +
"\n * 0.0.6 23/08/2017 - Aggiunto commento automatico per Limiti velocità" + 
"\n * 0.0.5 24/08/2017 - Aggiunto avviso di aggiornamento. Aggiunti messaggi per sollecito e chiusura senza risposte";



if (UrcommentsItalianUpdateMessage === "yes") {
    if (localStorage.getItem('UrcommentsItalianVersion') !== UrcommentsItalianVersion) {
        alert(UrcommentsItalianVersionUpdateNotes);
        localStorage.setItem('UrcommentsItalianVersion', UrcommentsItalianVersion);
    }
}


/* Changelog
 * 0.1.0 31/08/2017 - Modifiche necessarie a seguito dell'aggiornamento dello script principale
 * 0.0.9 30/08/2017 - Tradotto alcuni messaggi di sistema e aggiunto messaggio per limite velocità invariato
 * 0.0.8 26/08/2017 - Aggiunto sollecito risposta nonostante correzioni effettuate
 * 0.0.7 25/08/2017 - Aggiunto messaggio automatico per Svolta non consentita e Indicazioni di guida errate
 * 0.0.6 24/08/2017 - Aggiunto commento automatico per Limiti velocità.
 * 0.0.5 23/08/2017 - Aggiunto avviso di aggiornamento. Aggiunti messaggi per sollecito e chiusura senza risposte
 * 0.0.4 23/08/2017 - Prima versione beta ufficiale ancora da completare e migliorare
 * 0.0.1 22/08/2017 - initial version
 */
//I will try not to update this file but please keep a external backup of your comments as the main script changes this file might have to be updated. When the custom comments file is auto updated you will loose your custom comments. By making this a separate script I can try to limit how often this would happen but be warned it will eventually happen.
//if you are using quotes in your titles or comments they must be properly escaped. example "Comment \"Comment\" Comment",
//if you wish to have blank lines in your messages use \n\n. example "Line1\n\nLine2",
//if you wish to have text on the next line with no spaces in your message use \n. example "Line1\nLine2",
//Custom Configuration: this allows your "reminder", and close as "not identified" messages to be named what ever you would like.
//the position in the list that the reminder message is at. (starting at 0 counting titles, comments, and ur status). in my list this is "4 day Follow-Up"
window.UrcommentsItalianReminderPosistion = 0;

//this is the note that is added to the the reminder link  option
window.UrcommentsItalianReplyInstructions = 'To reply, please either use the Waze app or go to '; //followed by the URL - superdave, rickzabel, t0cableguy 3/6/2015

//the position of the close as Not Identified message (starting at 0 counting titles, comments, and ur status). in my list this is "7th day With No Response"
window.UrcommentsItalianCloseNotIdentifiedPosistion = 3;

//This is the list of Waze's default UR types. edit this list to match the titles used in your area!
//You must have these titles in your list for the auto text insertion to work!
window.UrcommentsItaliandef_names = [];
window.UrcommentsItaliandef_names[6] = "Incorrect turn"; //"Incorrect turn";
window.UrcommentsItaliandef_names[7] = "Incorrect address"; //"Incorrect address";
window.UrcommentsItaliandef_names[8] = "Incorrect route"; //"Incorrect route";
window.UrcommentsItaliandef_names[9] = "Missing roundabout"; //"Missing roundabout";
window.UrcommentsItaliandef_names[10] = "General error"; //"General error";                                //ITALIA*
window.UrcommentsItaliandef_names[11] = "Svolta non consentita"; //"Turn not allowed";                     //ITALIA
window.UrcommentsItaliandef_names[12] = "Incorrect junction"; //"Incorrect junction";                      //ITALIA*
window.UrcommentsItaliandef_names[13] = "Missing bridge overpass"; //"Missing bridge overpass";            //ITALIA*
window.UrcommentsItaliandef_names[14] = "Indicazioni di guida errate"; //"Wrong driving direction";        //ITALIA
window.UrcommentsItaliandef_names[15] = "Missing Exit"; //"Missing Exit";                                  //ITALIA*
window.UrcommentsItaliandef_names[16] = "Missing Road"; //"Missing Road";                                  //ITALIA*
window.UrcommentsItaliandef_names[18] = "Missing Landmark"; //"Missing Landmark";
window.UrcommentsItaliandef_names[19] = "Blocked Road"; //"Blocked Road";
window.UrcommentsItaliandef_names[21] = "Missing Street Name"; //"Missing Street Name";
window.UrcommentsItaliandef_names[22] = "Incorrect Street Prefix or Suffix"; //"Incorrect Street Prefix or Suffix";
window.UrcommentsItaliandef_names[23] = "Speed Limit"; //"Missing or invalid speed limit";                 //ITALIA


//below is all of the text that is displayed to the user while using the script
window.UrcommentsItalianURC_Text = [];
window.UrcommentsItalianURC_Text_tooltip = [];
window.UrcommentsItalianURC_USER_PROMPT = [];
window.UrcommentsItalianURC_URL = [];

//zoom out links
window.UrcommentsItalianURC_Text[0] = "Zoom a 0 & chiude l'UR";
window.UrcommentsItalianURC_Text_tooltip[0] = "Zoom al minimo (0) e chiude la finestra della UR";

window.UrcommentsItalianURC_Text[1] = "Zoom a 2 & chiude l'UR";
window.UrcommentsItalianURC_Text_tooltip[1] = "Zoom ad ingrandimento 2 e chiude la finestra della UR (a questo livello di zoom Toolbox dovrebbe evidenziare molti problemi e sono selezionabili le minor)";

window.UrcommentsItalianURC_Text[2] = "Zoom a 3 & chiude l'UR";
window.UrcommentsItalianURC_Text_tooltip[2] = "Zoom ad ingrandimento 3 e chiude la finestra della UR a questo livello di zoom Toolbox dovrebbe evidenziare molti problemi e sono selezionabili le Primary)";

window.UrcommentsItalianURC_Text_tooltip[3] = "Ricarica la mappa";

window.UrcommentsItalianURC_Text_tooltip[4] = "Numero di UR visualizzate";

//tab names
window.UrcommentsItalianURC_Text[5] = "Commenti";
window.UrcommentsItalianURC_Text[6] = "Filtri UR";
window.UrcommentsItalianURC_Text[7] = "Impostazioni";

//UR Filtering Tab
window.UrcommentsItalianURC_Text[8] = "Istruzioni filtro UR";
window.UrcommentsItalianURC_Text_tooltip[8] = "Istruzioni sul filtro delle UR (in inglese)";
window.UrcommentsItalianURC_URL[8] = "https://docs.google.com/presentation/d/1zwdKAejRbnkUll5YBfFNrlI2I3Owmb5XDIbRAf47TVU/edit#slide=id.p";

/*
window.UrcommentsItalianURC_Text[9] = "Enable URComments UR filtering";
window.UrcommentsItalianURC_Text_tooltip[9] = "Enable or disable URComments filtering";
*/
window.UrcommentsItalianURC_Text[9] = "Abilita filtro UR di URComments";
window.UrcommentsItalianURC_Text_tooltip[9] = "Abilita i filtri di URComments";

/*
window.UrcommentsItalianURC_Text[10] = "Enable UR pill counts";
window.UrcommentsItalianURC_Text_tooltip[10] = "Enable or disable the pill with UR counts";
*/
window.UrcommentsItalianURC_Text[10] = "Abilita contatori sotto UR";
window.UrcommentsItalianURC_Text_tooltip[10] = "Abilita i contatori dei commenti e dei giorni sotto ogni UR ";

/*
window.UrcommentsItalianURC_Text[12] = "Hide Waiting";
window.UrcommentsItalianURC_Text_tooltip[12] = "Only show URs that need work (hide in-between states)";
*/
window.UrcommentsItalianURC_Text[12] = "Nascondi UR in attesa";
window.UrcommentsItalianURC_Text_tooltip[12] = "Mostra solo le UR che necessitano di lavoro (nasconde le UR in attesa)";

/*
window.UrcommentsItalianURC_Text[13] = "Only show my URs";
window.UrcommentsItalianURC_Text_tooltip[13] = "Hide URs where you have no comments";
*/
window.UrcommentsItalianURC_Text[13] = "Solo mie UR";
window.UrcommentsItalianURC_Text_tooltip[13] = "Nasconde le UR senza tuoi commenti";

/*
window.UrcommentsItalianURC_Text[14] = "Show others URs past reminder + close";
window.UrcommentsItalianURC_Text_tooltip[14] = "Show URs that other commented on that have gone past the reminder and close day settings added together";
*/
window.UrcommentsItalianURC_Text[14] = "Mostra UR di altri dimenticate e da intervenire";
window.UrcommentsItalianURC_Text_tooltip[14] = "Mostra le UR che altri hanno commentato ma che il tempo dei solleciti e di chiusura sono stati superati";

/*
window.UrcommentsItalianURC_Text[15] = "Hide URs Reminder needed";
window.UrcommentsItalianURC_Text_tooltip[15] = "Hide URs where reminders are needed";
*/
window.UrcommentsItalianURC_Text[15] = "Nascondi UR che necessitano sollecito";
window.UrcommentsItalianURC_Text_tooltip[15] = "Nasconde le UR che avrebbero bisogno di sollecito";

/*
window.UrcommentsItalianURC_Text[16] = "Hide URs user replies";
window.UrcommentsItalianURC_Text_tooltip[16] = "Hide UR with user replies";
*/
window.UrcommentsItalianURC_Text[16] = "Nascondi UR con risposte";
window.UrcommentsItalianURC_Text_tooltip[16] = "Nascondi UR con risposte del reporter";

/*
window.UrcommentsItalianURC_Text[17] = "Hide URs close needed";
window.UrcommentsItalianURC_Text_tooltip[17] = "Hide URs that need closing";
*/
window.UrcommentsItalianURC_Text[17] = "Nascondi UR da chiudere";
window.UrcommentsItalianURC_Text_tooltip[17] = "Nascondi le UR che hanno bisogno di chiusura";

/*
window.UrcommentsItalianURC_Text[18] = "Hide URs no comments";
window.UrcommentsItalianURC_Text_tooltip[18] = "Hide URs that have zero comments";
*/
window.UrcommentsItalianURC_Text[18] = "Nascondi UR senza commenti";
window.UrcommentsItalianURC_Text_tooltip[18] = "Nascondi UR senza alcun commento";

/*
window.UrcommentsItalianURC_Text[19] = "hide 0 comments without descriptions";
window.UrcommentsItalianURC_Text_tooltip[19] = "Hide URs that do not have descriptions or comments";
*/
window.UrcommentsItalianURC_Text[19] = "Nascondi UR 0 commenti + senza descirzione";
window.UrcommentsItalianURC_Text_tooltip[19] = "Nasconde le UR che non hanno nÃ¨ descrizione nÃ¨ commenti";

/*
window.UrcommentsItalianURC_Text[20] = "hide 0 comments with descriptions";
window.UrcommentsItalianURC_Text_tooltip[20] = "Hide URs that have descriptions and zero comments";
*/
window.UrcommentsItalianURC_Text[20] = "Nascondi 0 commenti con descrizione";
window.UrcommentsItalianURC_Text_tooltip[20] = "Nasconde le UR che hanno descrizione ma nessun commento";

/*
window.UrcommentsItalianURC_Text[21] = "Hide Closed URs";
window.UrcommentsItalianURC_Text_tooltip[21] = "Hide closed URs";
*/
window.UrcommentsItalianURC_Text[21] = "Nascondi UR chiuse";
window.UrcommentsItalianURC_Text_tooltip[21] = "Nasconde le UR chiuse";

/*
window.UrcommentsItalianURC_Text[22] = "Hide Tagged URs";
window.UrcommentsItalianURC_Text_tooltip[22] = "Hide URs that are tagged with URO+ style tags ex. [NOTE]";
*/
window.UrcommentsItalianURC_Text[22] = "Nasconde UR con TAG";
window.UrcommentsItalianURC_Text_tooltip[22] = "Nasconde le UR con i tag di URO+ come ad esempio [NOTE]";

window.UrcommentsItalianURC_Text[23] = "Promemoria dopo giorni: ";

window.UrcommentsItalianURC_Text[24] = "Chiusura dopo giorni: ";
//settings tab
window.UrcommentsItalianURC_Text[25] = "Commento automatico";
window.UrcommentsItalianURC_Text_tooltip[25] = "Commenta automaticamente una nuova UR che non abbia già commenti.";

window.UrcommentsItalianURC_Text[26] = "Commento di sollecito automatico";
window.UrcommentsItalianURC_Text_tooltip[26] = "Aggiunge il commento di sollecito alle UR che superano i giorni previsti e che hanno un solo commento.";

window.UrcommentsItalianURC_Text[27] = "Auto zoom su UR";
window.UrcommentsItalianURC_Text_tooltip[27] = "Auto zoom all'apertura delle UR senza commenti e quando si deve inviare sollecito.";

window.UrcommentsItalianURC_Text[28] = "Auto centra UR";
window.UrcommentsItalianURC_Text_tooltip[28] = "Centra automaticamente la mappa al corrente livello di zoom quando l'UR ha commenti e lo zomm è inferiore di 3";

window.UrcommentsItalianURC_Text[29] = "Auto click Aperto, Risolto, Non Identificato";
window.UrcommentsItalianURC_Text_tooltip[29] = "Suppress the message about recent pending questions to the reporter and then depending on the choice set for that comment Clicks Open, Solved, Not Identified";
//Migliorare traduzione

window.UrcommentsItalianURC_Text[30] = "Salvataggio automatico dopo commenti di Risolto o non Identificato";
window.UrcommentsItalianURC_Text_tooltip[30] = "Se Auto Click Aperto, Risolto, Non Identificato è anche impostato, questa opzione salverà autoamticamente dopo aver inserito il commento e premuto il tasto di INVIO";

window.UrcommentsItalianURC_Text[31] = "Chiusura automatica UR";
window.UrcommentsItalianURC_Text_tooltip[31] = "Al momento dell'invio del commento, verrà semplicemente chiusa l'UR";
//For the user requests that do not require saving this will close the user request after clicking on a UR-Comment and then the send button";

window.UrcommentsItalianURC_Text[32] = "Aggiorna autoamticamente la mappa dopo il commento";
window.UrcommentsItalianURC_Text_tooltip[32] = "Aggiorna la mappa dopo aver premuto il tasto di Invio commento. Ciò non si applica nel caso dei messaggi che necessitano di essere salvati in quanto il salvataggio ricarica automaticamente la mappa. Attualmente ciò non è necessario ma lo prevediamo in caso di cambiamenti nel WME";
//Reloads the map after clicking on a UR-Comment and then send button. This does not apply to any messages that needs to be saved, since saving automatically reloads the map. Currently this is not needed but I am leaving it in encase Waze makes changes";

window.UrcommentsItalianURC_Text[33] = "Auto zoom fuori dopo il commento";
window.UrcommentsItalianURC_Text_tooltip[33] = "Dopo aver cliccato sulla lista dei commenti disponibili e cliccato Invia nella UR, la mappa verrà riportata al livello di zoom precedente";
//After clicking on a UR-Comment in the list and clicking send on the UR the map zoom will be set back to your previous zoom";

window.UrcommentsItalianURC_Text[34] = "Auto seleziona il tab UrComments";
window.UrcommentsItalianURC_Text_tooltip[34] = "Auto seleziona il tab di URComments quando si apre una UR. Si ritorna al tab precedente quando si chiude la UR";
//Auto switch to the URComments tab when opening a UR, when the UR window is closed you will be switched to your previous tab";

window.UrcommentsItalianURC_Text[35] = "Chiudi messaggio - Doppio click sul link (invio automatico)";
window.UrcommentsItalianURC_Text_tooltip[35] = "Aggiungi un link extra al commento di chiusura quando il doppio click invia automaticamente il commento all'UR e si clicca su Invia, e vengono eseguite tutte le altre opzioni abilitate";
//Add an extra link to the close comment when double clicked will auto send the comment to the UR windows and click send, and then will launch all of the other options that are enabled";

window.UrcommentsItalianURC_Text[36] = "Link a tutti i commenti - (invio automatico)";
//All comments - double click link (auto send)";
window.UrcommentsItalianURC_Text_tooltip[36] = "Aggiunge un link ad ogni commento nella lista quando viene fatto il doppio click e verrà inviato il commento nella finestra della UR, quindi inviato, e quindi eseguito tutte le altre opzioni abilitate";
//Add an extra link to each comment in the list that when double clicked will auto send the comment to the UR windows and click send, and then will launch all of the other options that are enabled";

window.UrcommentsItalianURC_Text[37] = "Lista commenti";
window.UrcommentsItalianURC_Text_tooltip[37] = "Questa mostra la lista dei commenti selezionata. C'è un supporto per le liste personalizate. Se desideri creare la tua lista personalizzata o hai suggerimenti per il team delle liste regionali, contattami a rickzabel @waze or @gmail";
//This shows the selected comment list. There is support for a custom list. If you would like your comment list built into this script or have suggestions on the Comments team’s list, please contact me at rickzabel @waze or @gmail";

window.UrcommentsItalianURC_Text[38] = "Disabilita pulsante Fatto/Prossimo";
window.UrcommentsItalianURC_Text_tooltip[38] = "Disabilita il pulsante Fatto/Prossimo nella finestra dell'UR";
//Disable the done / next buttons at the bottom of the new UR window";

window.UrcommentsItalianURC_Text[39] = "Non seguire UR dopo l'INVIO";
window.UrcommentsItalianURC_Text_tooltip[39] = "Non seguire l'UR dopo l'Invio di un commento";

window.UrcommentsItalianURC_Text[40] = "Invio solleciti automaticmente";
window.UrcommentsItalianURC_Text_tooltip[40] = "Invia automaticamente i solleciti alle mie UR se sono visibili a schermo";
//Auto send reminders to my UR as they are on screen";

window.UrcommentsItalianURC_Text[41] = "Sostituisci il tag nome con il nome dell'editor";
window.UrcommentsItalianURC_Text_tooltip[41] = "Quando una UR ha il nome di un editor nella descrizione o in qualsiasi commento della UR (Non il nome automaticamente aggiunto da Waze) sostituisce il tag nome con il nome dell'editor";
//When a UR has the logged in editors name in the description or any of the comments of the UR (not the name Waze automatically add when commenting) replace the tag type with the editors name";

window.UrcommentsItalianURC_Text[42] = "(Doppio Click)"; //double click to close links
window.UrcommentsItalianURC_Text_tooltip[42] = "Doppio click qui per inviare automaticamente- ";
//Double click here to auto send - ";

window.UrcommentsItalianURC_Text[43] = "Non mostrare il tag nome sull'icona della UR";
window.UrcommentsItalianURC_Text_tooltip[43] = "Non mostrare il tag nome sull'icona della UR quando c'è un tag di URO+";
//Dont show tag name on pill where there is a URO tag";


window.UrcommentsItalianURC_USER_PROMPT[0] = "UR Comments - You either have a older version of the custom comments file or a syntax error either will keep the custom list from loading. Missing: ";

window.UrcommentsItalianURC_USER_PROMPT[1] = "UR Comments - You are missing the following items from your custom comment list: ";

window.UrcommentsItalianURC_USER_PROMPT[2] = "List can not be found you can find the list and instructions at https://wiki.waze.com/wiki/User:Rickzabel/UrComments/";

window.UrcommentsItalianURC_USER_PROMPT[3] = "URComments - You can not set close days to zero";

window.UrcommentsItalianURC_USER_PROMPT[4] = "URComments - To use the double click links you must have the Auto click open, solved, not identified option enabled";

window.UrcommentsItalianURC_USER_PROMPT[5] = "URComments - Aborting FilterURs2 because both filtering, counts, and auto reminders are disabled";

window.UrcommentsItalianURC_USER_PROMPT[6] = "URComments: Loading UR data has timed out, retrying."; //this message is shown across the top of the map in a orange box, length must be kept short

//window.UrcommentsItalianURC_USER_PROMPT[7] = "URComments: Adding reminder message to UR: "; //this message is shown across the top of the map in a orange box, length must be kept short
window.UrcommentsItalianURC_USER_PROMPT[7] = "URComments: Inviando messaggi di sollecito alle UR: "; //this message is shown across the top of the map in a orange box, length must be kept short

window.UrcommentsItalianURC_USER_PROMPT[8] = "URComment's UR Filtering has been disabled because URO+\'s UR filters are active."; //this message is shown across the top of the map in a orange box, length must be kept short

window.UrcommentsItalianURC_USER_PROMPT[9] = "UrComments has detected that you have unsaved edits!\n\nWith the Auto Save option enabled and with unsaved edits you cannot send comments that would require the script to save. Please save your edits and then re-click the comment you wish to send.";

window.UrcommentsItalianURC_USER_PROMPT[10] = "URComments: Can not find the comment box! In order for this script to work you need to have a UR open."; //this message is shown across the top of the map in a orange box, length must be kept short

//window.UrcommentsItalianURC_USER_PROMPT[11] = "URComments - This will send reminders at the reminder days setting. This only happens when they are in your visible area. NOTE: when using this feature you should not leave any UR open unless you had a question that needed an answer from the wazer as this script will send those reminders."; //conformation message/ question
window.UrcommentsItalianURC_USER_PROMPT[11] = "URComments - Questo invierà solleciti alla data impostata nelle impostazioni. Ciò funziona soltanto quando le UR sono visibili nell'area. NOTA: quando si usa questa opzione, non dovresti lasciare alcuna UR aperta, a meno che non  ci sono domande che necessitano di risposta, visto che lo script invierà i solleciti"; //conformation message/ question


//The comment array should follow the following format,
// "Title",     * is what will show up in the URComment tab
// "comment",   * is the comment that will be sent to the user currently
// "URStatus"   * this is action to take when the option "Auto Click Open, Solved, Not Identified" is on. after clicking send it will click one of those choices. usage is. "Open", or "Solved",or "NotIdentified",
// to have a blank line in between comments on the list add the following without the comment marks // there is an example below after "Thanks for the reply"
// "<br>",
// "",
// "",

//Custom list
window.UrcommentsItalianArray2 = [
    "Promemoria attesa risposta", //do not change (rickzabel)
    "Salve, siamo ancora in attesa di una Sua risposta. Purtroppo senza gli ulteriori dettagli che Le stiamo chiedendo, e non avendo sufficienti dati in nostro possesso, dovremo chiudere la Sua segnalazione senza apportare correzioni. Rimaniamo ancora un po' in attesa. Grazie.",
    "Open",

    "Chiusura per assenza risposta",
    //"The problem was unclear and volunteers didn't receive a response so we are closing this report. As you travel, please feel welcome to report any map issues you encounter. Thanks!",//karlcr9911 12/7/14 //rickzabel 12/7/14 t0cableguy 12/8/14
    "Salve, purtroppo non siamo riusciti ad inndividuare errori nella mappa con i dati in nostro possesso e non abbiamo ricevuto Le informazione che Le avevamo chiesto per comprendere il problema che ci voleva riportare. Siamo pertanto costretti a chiudere la Sua segnalazione. Se dovesse accorgersi di altri problemi alle mappe, ce li segnali nuovamente. Grazie.",
    "NotIdentified",

    "Nessuna risposta dal reporter",
    "Non avendo ricevuto ulteriori informazioni, importanti per poter apportare modifiche alla mappa senza errori, siamo costretti a chiudere la segnalazione.",
    "Solved",

    "Risolto",
    "Grazie per la segnalazione e le informazioni inviateci grazie alle quali abbiamo apportato le modifiche alla mappa. Saranno visibili su Waze in pochi giorni ma, in qualche raro caso, potrebbe essere necessario attendere fino a 10 giorni.", 
    "Solved",

    "Correzione indirizzo",
    "Grazie! Abbiamo corretto la mappa con l'indirizzo corretto. Gli aggiornamenti saranno visibili su Waze in pochi giorni ma, in qualche raro caso, potrebbe essere necessario attendere fino a 10 giorni.",
    "Solved",

    "Posizione indirizzo aggiornata",
    "Abbiamo aggiornato la posizione dell'indirizzo indicato nella mappa. Entro qualche giorno la modifica sarà anche su Waze. A quel punto, potrà essere necessario rimuovere l'indirizzo errato sia dal suo storico, sia dai suoi preferiti. Dopodiché dovrà effettuare nuovamente la ricerca ed inserire l'indirizzo che, a quel punto, sarà corretto. Se non rimuove i vecchi risultati dal Suo Waze, potrebbe continuare ad avere problemi a raggiungere la destinazione corretta. Per favore, ci invii una nuova segnalazione se ciò non dovesse aver risolto il suo problema. Grazie!",
    "Solved", 

    "La strada è stata chiusa",
    "Grazie per la segnalazione e le informazioni. La strada è attualmente chiusa. Se la situazione dovesse cambiare, per favore effettui una nuova segnalazione o aggiunga un commento alla chiusura su Waze. Grazie",
    "Solved",

    "Limite velocità aggiornato",
    "Abbiamo aggiornato il limite di velocità sul tratto di strada indicato. Grazie!",
    "Solved", 

    "Limite velocità è giusto",
    "Salve, abbiamo verificato i limiti di velocità nel punto indicato e risultano essere corretti. La ringraziamo comunque per la segnalazione e La invitiamo a farne altre se dovesse riscontrare altri problemi di mappa. Grazie.",
    "NotIdentified",


    "Sollecito risposta nonostante correzioni",
    "Salve, siamo ancora in attesa di una Sua risposta. Purtroppo senza gli ulteriori dettagli che Le stiamo chiedendo, dovremo chiudere la Sua segnalazione con le sole correzioni apportate con i nostri dati. Rimaniamo ancora in attesa. Grazie.",
    "Open",

    "Specificare percorso",
    "Dai dati che riusciamo vedere in questo caso non riusciamo a comprendere le ragioni del problema. Ci sarebbe molto utile conoscere la partenza e la destinazione, del Suo viaggio per effettuari ulteriori controlli. Grazie.", 
    "Open",

    "Errors with no text",
    //"Waze did not send us enough information to fix your request. Would you please let us know what went wrong with the route Waze gave you? Would you tell us your destination as you entered it into Waze? Thanks!",  //karlcr9911 12/7/14 //rickzabel 12/7/14 //t0cableguy 12/7/14
    "Volunteer responding - Waze did not send us enough information to fix your request. Would you please let us know what went wrong with the route Waze gave you? Would you tell us your destination as you entered it into Waze? Thanks!", //rickzabel 12/8/14
    "Open",

    "App Bug",
    "Unfortunately, In this situation, there is nothing wrong with the map that we can adjust to prevent issues with the app. Please report this to https://support.google.com/waze/answer/6276841",
    "NotIdentified", //twintiggrz, t0cableguy, rickzabel 12/27/2015

    "Bad GPS",
    "Volunteer responding - It appears that your device was having GPS trouble. GPS signals do not travel through vehicles or tall buildings. Please make sure your device is somewhere with a clear view of the sky.",//rickzabel 12/18/2014
    "NotIdentified",

    "Valid Route",
    //"We reviewed the issue and did not find any map errors. It looks like Waze provided a valid route. If you feel yours is correct, keep driving that way. If it is indeed faster, Waze will learn from your drives and route you and others the faster route. Thanks!", //karlcr9911 12/7/14  
    //"We reviewed the issue and did not find any map errors. It looks like Waze provided you with a valid route. If you feel yours is correct, keep driving that way. If it is indeed faster, Waze will learn from your drives and route you and others the faster route. Thanks!", //added "you with" rickzabel 12/7/14
    //"We reviewed the issue and did not find any map errors. It looks like Waze provided you with a valid route. Try the Waze suggested route a few times, it may turn out to actually be faster, if not you'll be teaching Waze that that route is slower, and your route will become preferred " //Pesach 12/8/14
    //"Volunteer responding - We reviewed the issue and did not find any map errors. It looks like Waze provided you with a valid route. Try the Waze suggested route a few times, it may turn out to actually be faster, if not you'll be teaching Waze that that route is slower, and the faster route will become preferred.", //rickzabel 12/8/14, karlcr9911 12/8/14
    "Volunteer responding - We reviewed the issue and did not find any map errors. It looks like Waze provided you with a valid route. Try the Waze suggested route a few times, as it may turn out to actually be faster. If not you'll be teaching Waze that that route is slower, and the faster route will become preferred.",  //GizmoGuy, t0cableguy, rickzabel 1/14/2015
    "NotIdentified",

    "Valid Left turns",
    //"Volunteer responding - If you wait and complete the left turn, it may actually be faster than the alternative. If it’s not faster, you wait time will contribute to Waze’s database, thus helping to discourage the routing server from suggesting left turns at that intersection. We also suggest if you do not feel comfortable making such left turns, you can always go another route and let Waze recalculate.", //rz 2/26/15 
    "Volunteer responding - If you wait and complete the left turn, it may actually be faster than the alternative. If it’s not faster, your wait time will contribute to Waze’s database, thus helping to discourage the routing server from suggesting left turns at that intersection. We also suggest if you do not feel comfortable making such left turns, you can always go another route and let Waze recalculate.", //karlcr9911 4/4/15 //rickzabel 4/5/15
    "NotIdentified",

    "Valid Left turns 2",
    //"Volunteer responding – We do not disable legal turns only because they are difficult. If you wait and complete the left turn, it may actually be faster than the alternative. If it’s not faster, you wait time will contribute to Waze’s database, thus helping to discourage the routing server from suggesting left turns at that intersection. We also suggest if you do not feel comfortable making such left turns, you can always go another route and let Waze recalculate.", //rz 2/26/15
    "Volunteer responding – We cannot disable legal turns only because they are difficult. If you wait and complete the left turn, it may actually be faster than the alternative. If it’s not faster, your wait time will contribute to Waze’s database, thus helping to discourage the routing server from suggesting left turns at that intersection. We also suggest if you do not feel comfortable making such left turns, you can always go another route and let Waze recalculate.", //karlcr9911 4/4/15 //rickzabel 4/5/15
    "NotIdentified",

    "Valid but Difficult Route",
    //"Volunteer responding – We do not disable legal routes only because they are difficult. If you wait and complete the route, it may actually be faster than the alternative. If it’s not faster, you wait time will contribute to Waze’s database, thus helping to discourage the routing server from suggesting the route. We also suggest if you do not feel comfortable, you can always go another route and let Waze recalculate."', //rz 2/26/15
    "Volunteer responding – We cannot disable legal routes only because they are difficult. If you wait and complete the route, it may actually be faster than the alternative. If it’s not faster, your wait time will contribute to Waze’s database, thus helping to discourage the routing server from suggesting the route. We also suggest if you do not feel comfortable, you can always go another route and let Waze recalculate.", //karlcr9911 4/4/15 //rickzabel 4/5/15
    "NotIdentified",

    "Missing place",
    "Volunteer responding - Thank you for reporting a missing place.  Anytime you find a a place that is missing from the waze app you can add it from the app by tapping the Pin icon > Place. After taking a picture of the place please add as many details as you can. Thanks!",
    "NotIdentified",


    "California double yellow",
    "Volunteer responding, In California it is perfectly legal to make a left turn across one double yellow line. Turning across two double yellow lines, spaced apart 2 feet or more, is considered a barrier, and is illegal to cross. Thanks!", //rz 2/26/15 //karlcr9911 4/4/15
    "NotIdentified",

    "Detours / Odd-Routing",
    //"We can't find anything in the map to explain route Waze gave you. Waze wants to save you time every way it can and sometimes it suggests complex detours just to shave a few seconds off your trip. Waze may recommend a detour even after the traffic has cleared up because: it doesn't know yet, other Wazers may have reported a temporary street closure, or daily traffic patterns. In any event, we are very sorry to say that the volunteer map editors can't be much help here. Thanks!",
    //"We can't find anything on the map to explain route Waze gave you. Waze tries to save you time and sometimes suggests complex detours just to shave a few seconds off your trip. We are very sorry to say that the volunteer map editors can not be much help here. Thanks!", //rickzabel 12/7/14
    //"We can't find anything on the map to explain the route Waze gave you. Waze will route complex detours to save a few seconds. We are very sorry to say that map editors can not be helpful in this situation. Thanks!", //t0cableguy 12/7/14 //rickzabel 12/7/14 //karlcr9911 12/8/14
    //"Volunteer responding - We can't find anything on the map to explain the route Waze gave you. Waze will route complex detours to save a few seconds. We are very sorry to say that map editors can not be helpful in this situation. Thanks!", //rickzabel 12/11/14
    "Volunteer responding - We can't find anything on the map to explain the route Waze gave you. Waze will route complex detours to save a few seconds. We are very sorry to say that map editors cannot be helpful in this situation. Thanks!", //rickzabel 4/18/20115
    "NotIdentified",

    "Overall Waze complaint",
    "Volunteer responding - You can help make Waze better by reporting problems as you find them. Please include as many details as possible? Thanks!",
    "NotIdentified", //rickzabel Pesach 12/22/14

    "Report to local municipality",
    //"Volunteer responding - We are only able to help with map issues, this should be reported to the local municipality. Please feel welcome to report any map issues you encounter. Thanks!",//rickzabel Pesach 12/22/14
    "Volunteer responding - We are only able to help with map issues. This should be reported to the local municipality. Please feel welcome to report any map issues you encounter. Thanks!", //GizmoGuy, t0cableguy, rickzabel 1/14/2015
    "NotIdentified",

    "No user transponder (avoid tolls)",
    //"Volunteer responding - Waze is about getting you to your destination the fastest; however, it does not know if you have a toll transponder. Therefore, if you prefer to not have toll routes suggested, there is a feature under Settings > Navigation to avoid toll roads. Thanks!", //rickzabel Pesach 12/22/14
    //"Volunteer responding - Waze is about getting you to your destination via the fastest route. However, it does not know if you have a toll transponder. Therefore, if you prefer to not have toll routes suggested, there is a feature under Settings > Navigation to avoid toll roads. Thanks!", //rz 2/26/15 //karlcr9911 4/4/15
    //"Volunteer responding - Waze is about getting you to your destination via the fastest route. However, it does not know if you have a toll transponder. To avoid tolls, there is an option under Settings > Navigation or after clicking GO tap Routes and select one without gold coins (iphone) or toll (android). Thanks!", //a version of this was suggested by subs5 4/12/2015 //rickzabel 4/17/2015
    //"Volunteer responding -  While Waze attempts to route you to your destination efficiently, it does not know if you have a toll transponder. To avoid tolls, there is an option under Settings > Navigation or after clicking GO tap Routes and select one without gold coins (iphone) or toll (android). Thanks!", //rickzabel 4/17/2015
    "Volunteer responding -  While Waze attempts to route you to your destination efficiently, it does not know if you have a toll transponder. To avoid tolls, there is an option under Settings > Navigation or after clicking GO tap Routes and select one without the toll icon. Thanks!", //rickzabel 11/24/2016
    "NotIdentified",

    "No user transponder",
    //"Volunteer responding - Waze is about getting to your destination the fastest; however, it does not know if you have a toll transponder. As you travel, please feel welcome to report any map issues you encounter. Thanks!",//rickzabel Pesach 12/22/14
    //"Volunteer responding - Waze is about getting to your destination via the fastest route. However, it does not know if you have a toll transponder. As you travel, please feel welcome to report any map issues you encounter. Thanks!", //rickzabel 2/26/15 //t0cableguy 4/5/2015
    "Volunteer responding - While Waze attempts to route you to your destination efficiently, it does not know if you have a toll transponder.  We are very sorry to say that the volunteer map editors cannot be much help here. As you travel, please feel welcome to report any map issues you encounter. Thanks!", //rickzabel karlcr9911 4/18/2015
    "NotIdentified",

    "Not Using HOV",
    //"The map is setup correctly to support the HOV lane here. However the Waze Client App doesn't yet have the ability to know if you are in an HOV vehicle, it therefore assumes you do not meet the HOV criteria, and will only route you on roads open to all private vehicles.\nIf you are a qualified HOV vehicle and want to use the HOV lane, driving into the HOV should force Waze to recalculate your route. Once Waze realizes you are in the HOV lane, it should calculate the best route to your destination allowing you to stay in the HOV lane. If you have other questions or issues, please reply here, or send a new report at the location of the issue.\nThank you, and Happy Wazing", //peash 12/14/14
    "Waze does not have the ability to know you meet the HOV criteria. Driving into the HOV lane should force Waze to recalculate your route. Afterwards you should be allowed to stay in the HOV lane. Thanks!", //rickzabel 12/14/14
    "NotIdentified",

    "U-turns",
    //"Volunteer responding - Currently Waze will not tell you to make a \"U-turn\". It will route you in several left/right turns to effectively create a U-turn. This is a programming issue that cannot be changed by the volunteer map editors, but we understand that Waze is working on a fix. Thanks!",//rickzabel Pesach 12/22/14
    "Volunteer responding - Currently Waze will not tell you to make a \"U-turn\". It will route you in several left/right turns to effectively create a U-turn. This is a programming issue that cannot be changed by the volunteer map editors. We understand that Waze is working on a fix. Thanks!", //GizmoGuy, t0cableguy, rickzabel 1/14/2015
    "NotIdentified",

    "Traffic - Stale Information",
    //"Volunteer map editors can't do anything about Waze's traffic reporting. Waze relies on data from people using Waze to assess traffic. In the case of a fresh accident or slowdown, Waze may not yet have any data on the situation. Once Waze has detected a traffic situation, it can remember it for awhile, sometimes long after the situation changes.",
    //"Waze relies on data from people using Waze to assess traffic. The volunteer map editors cannot edit conditions reported through the Waze app. In the case of a recent accident or slowdown, Waze may not have any data for this situation. Once Waze has detected a traffic situation it might remember it for a period of time after the situation cleared up.", // reworded - rickzabel 12/7/2014, karlcr9911 12/8/14
    //”Waze relies on data from users like you to assess traffic. Map editors cannot cannot remove traffic jams reported through the Waze app. Once Waze has detected a traffic jam it will remain active until enough users vote it off the map or users travel through the intersection at normal speed. You can help clear traffic jam reports by tapping “not there” in the app when the pins appear. Thanks!” //t0cableguy 07/12/2015
    "Map editors are unable to remove traffic jams. You can help clear traffic reports by tapping \"not there\" when prompted or by traveling through the intersection at normal speed.", // rickzabel 7/22/2015 //t0cableguy 7/22/2015
    "NotIdentified",

    "Traffic - Jams",
    //"To report traffic jam conditions, please use the Report -> Traffic Jam options in the Waze app. This will tell Waze about the problem in real-time. Traffic Jam reports can help route you and other Wazers around traffic problems.",
    "To report a traffic jams please use the Waze app by clicking the pin in the lower right and then clicking Traffic Jam. Traffic Jam reports can help route you and other Wazers around traffic problems in real-time. Thanks!", // reworded - rickzabel 12/7/2014, karlcr9911 12/8/14
    "NotIdentified",

    "Signal Avoidance Bug",
    //"I do not see any issues with the current turn restrictions in the area. This appears to be part of the known signal avoidance bug. Waze's developers are working on a fix for the issue but currently we do not have an ETA. Please feel free to take the turn until the issue is resolved. Thanks!",  // remove - rickzabel 12/7/2014  // added - rickzabel 12/7/2014
    //"There are no issues with the intersection’s turn restrictions. Waze's developers are working on a fix for this issue but we do not have an ETA. Please feel free use the signaled turn until the issue is resolved. Thanks!", // t0cableguy 12/7/14 
    //"There are no issues with the intersection’s turn restrictions. Waze's developers are working on a fix for this issue but we do not have an ETA. Please feel free to use the turn until the issue is resolved. Thanks!", // rickzabel 12/9/14
    "There are no issues with the intersection’s turn restrictions. Waze's developers are working on a fix for this issue. We do not have an ETA. Please feel free to use the turn until the issue is resolved. Thanks!",  //GizmoGuy, t0cableguy, rickzabel 1/14/2015
    "NotIdentified",

    "Already included restrictions",
    "This restriction is already included in the map, Waze should not route through this illegal turn. If Waze ever gives you a route through a restricted turn, please send another Map Issue report at that time. Thanks!",
    "NotIdentified",  //rickzabel Pesach 12/27/14

    "1000 mile limit",
    //"The search and navigation capabilities of Waze are limited to 1000 miles. When driving further than that distance you will need to select a target under that distance as your temporary destination.",//rz 2/26/15
    "The search and navigation capabilities of Waze are limited to 1000 miles. When driving further than that distance you will need to select a destination less than 1000 miles as your temporary destination.", //karlcr9911 4/5/15 //rickzabel 4/5/15
    "NotIdentified",

    "Temporary road blockage",
    //"Volunteer responding - if the road is completely blocked use the Report > Closure feature for you and others to be rerouted around it, otherwise please use Report > Traffic. At a minimum Waze is learning that that route is slower, and a faster route will become preferred.", //rickzabel Pesach 12/22/14
    "Volunteer responding - If the road is completely blocked, use the Report > Closure feature for you and others to be rerouted around it. Otherwise please use Report > Traffic. At a minimum Waze is learning that that route is slower, and a faster route will become preferred.",//GizmoGuy, t0cableguy, rickzabel 1/14/2015
    "NotIdentified",

    "Temporary Road Closure",
    "Volunteer responding - For closures that last only a few days, the volunteer map editors cannot be much help. It takes at least that long for our edits to make it to the live map! When you encounter road closures in the future, please use the Report > Closure feature built into the Waze app. Thanks!",
    "NotIdentified",

    "Temporary Road Closure",
    //"How long is the road going to be closed? For closures of only a few days, we volunteer map editors can't be much help. It takes at least that long for our edits to make it to devices! When you encounter short-term road closures in the future, please use the Report->Closure feature in the Waze app. If this is a long-term closure please respond and let us know as much as you can. Thanks!",
    "Do you know how long the road is going to be closed? For closures that last only a few days, the volunteer map editors cannot be much help. It takes at least that long for our edits to make it to the live map! When you encounter short-term road closures in the future, please use the Report > Closure feature built into the Waze app. If this is a long-term closure please respond and let us know as much as you can. Thanks!", // reworded - rickzabel 12/7/2014, karlcr9911 12/8/14
    "Open",

    "Closure clean-up",
    "Due to daily changing closures we are closing out the old requests to concentrate on the newest ones. For closures that last only a few days, the volunteer map editors cannot be much help. It takes at least that long for our edits to make it to the live map! When you encounter short-term road closures in the future, please use the Report > Closure feature built into the Waze app. Thanks!",//rickzabel 12/28/14
    "NotIdentified",

    "Thanks for the reply",
    "Thank you for the reply! This request will be closed. As you travel, please feel welcome to report any map issues you encounter.",
    "NotIdentified", //rickzabel 12/27/14

    "No further communication",
    //"No further communication was received. This request will now be closed. As you travel, please feel welcome to report any map issues you encounter. Thanks!",  //rickzabel 12/7/14, karlcr9911 12/7/14 t0cableguy 12/8/14 // one sentence? rickzabel 12/7/14
    //"No further communication was received. This request will now be closed. As you travel, please feel welcome to report any map issues you encounter. Thanks!",
    "No further information was received and the request is being closed. As you travel, please feel welcome to report any map issues you encounter. Thanks!", //t0cableguy 12/8/14 //rickzabel 12/8/14 , karlcr9911 12/8/14
    "NotIdentified", // same comment different action based off UR status rickzabel 12/7/14, karlcr9911 12/7/14 // one sentence? rickzabel 12/7/14 t0cableguy 12/8/14

    "water non-editable",
    "This particular water feature is not editable by the volunteer editors, feel free to report this to support at https://support.google.com/waze/",
    "NotIdentified",

    "Clear TTS Cache",
    //"If you continue to have this problem you will need to clear your Text-to-Speech cache. Go to the navigation screen and type cc@tts in search field and hit search. You should get a pop up message that the TTS file has been cleared. It will take a few days for the file to build back up with all the spoken street names.",
    //"Please clear your Text-to-Speech cache. In the navigate search box type cc@tts in the search field and press search. A message that the TTS file has been cleared should appear. It will take a few days for the file to download the spoken street names. Thanks!", //t0cableguy 12/8/2014, karlcr9911 12/8/14
    //"Please clear your Text-to-Speech cache. In the navigate search box type cc@tts in the search field and press search. You will get a message that the TTS file has been cleared. It will take a few days for the spoken street names to be downloaded. Thanks!", //rickzabel 12/9/14
    "Please clear your Text-to-Speech cache. In the navigate search box type cc@tts in the search field and press search. You will get a message that the TTS file has been cleared. Your TTS cache we be re-populated as you use routing.. Thanks!", //GizmoGuy411  t0cableguy rickzabel 2015-04-04
    "NotIdentified", //t0cableguy This should be a last chance option for fixing the issue.04-04-2015  //rickzabel 04-04-2015

    "Camera report",
    //"Thanks for the report. To ensure proper placement, Cameras must be reported in the app.  REPORT > CAMERA (may have to scroll down for it) > SPEED/Red LIGHT > Submit”, //subs5 4/17/2015
    //"Thanks for the report. To ensure proper placement, Cameras must be reported in the app. REPORT > (scroll to) CAMERA > SPEED / Red LIGHT / Fake  > Send”, //GizmoGuy411 2015-04-17
    "Volunteer responding, cameras must be reported from the app at / near the actual location using the Report > Camera option. Thank you!", //karlcr9911 rickzabel 4/17/2015
    "NotIdentified",

    "<br>",
    "",
    "",

    "Problem appears corrected",
    "Just a reminder: The problem appears to be corrected. Please let us know if you are continuing to have the issue. If we do not hear from you in a few days we will close this report. Thanks!",
    "Open", //karlcr9911 12/7/14 t0cableguy 12/8/14 //rickzabel 12/8/14

    "Clears comment & sets UR status to Open",
    "",
    "Open",

    "Include Users Description",
    "Volunteer responding - You reported \"$URD\" and Waze did not send us enough information to fix your request. Would you please let us know what went wrong with the route Waze gave you? Would you tell us your destination as you entered it into Waze? Thanks!",
    "Open",

    //selected segments requires the use of https://greasyfork.org/en/scripts/9232-wme-panel-swap
    "Include selected segments names",
    "Volunteer responding - You reported a problem near $SELSEGS, Waze did not send us enough information to fix your request. Would you please let us know what went wrong with the route Waze gave you? Would you tell us your destination as you entered it into Waze? Thanks!",
    "Open",

    "Wrong Street Name",
    "Volunteer responding - Waze did not send us enough information to fix your request. Would you please let us know which street name you think is wrong and what it should be? Thanks",
    "Open", //rickzabel Pesach 12/22/14


    "<br>",
    "",
    "",

    //Default URs  6 through 22 are all the different types of UR that a user can submit do not change them thanks
    //Sono i commenti che vengono automaticamente inseriti all'apertura dell'UR
    
    /*    "Incorrect turn", //6
    //"Would you please let us know what turn you are having a problem with? Thanks!",
    //"Volunteer responding to your report: Would you please let us know what turn you are having a problem with? Would you tell us your destination as you entered it into Waze? Thanks!",//rickzabel 12/7/14, karlcr9911 12/8/14
    "Volunteer responding - Would you please let us know what turn you are having a problem with? Would you tell us your destination as you entered it into Waze? Thanks!", //rickzabel 12/9/14
    "Open",

    "Incorrect address", //7
    //"Waze did not send us enough information to fix your request. In order for us to help you we need to know a couple of things; What is the address as you entered it into Waze and what was the problem you were having with this address?",
    //"Volunteer responding to your report: Waze did not send us enough information to fix your request. Would you tell us your destination as you entered it into Waze? What is the problem you are having with this address? Thanks!", //rickzabel 12/8/14, karlcr9911 12/8/14
    "Volunteer responding - Waze did not send us enough information to fix your request. Would you tell us your destination as you entered it into Waze? What is the problem you are having with this address? Thanks!", //rickzabel 12/8/14
    "Open",

    "Incorrect route", //8
    //"Waze did not send us enough information to fix your request. Would you please let us know what went wrong with the route Waze gave you? Would you tell us your destination as you entered it into Waze? Thanks!",
    //"Volunteer responding to your report: Waze did not send us enough information to fix your request. Would you please let us know what went wrong with the route Waze gave you? Would you tell us your destination as you entered it into Waze? Thanks!", // karlcr9911  12/8/14
    "Volunteer responding - Waze did not send us enough information to fix your request. Would you please let us know what went wrong with the route Waze gave you? Would you tell us your destination as you entered it into Waze? Thanks!", //rickzabel 12/9/14
    "Open",

    "Missing roundabout", //9
    "Volunteer responding - Would you tell us as much as possible about the roundabout you believe is missing? Thanks!",
    "Open",
*/
   //Tipi di errori italiani
    "General error", //10
    "Salve, abbiamo preso in carico la Sua segnalazione ma le informazioni che abbiamo non sono sufficienti a correggere il problema. Le chiediamo pertanto di inviarci ulteriori dettagli su cui effettuare le verifiche. Grazie.",
    "Open",

    "Svolta non consentita", //11
    "Salve, abbiamo preso in carico la Sua segnalazione ed abbiamo iniziato le prime verifiche sulle svolte ed i sensi di marcia ma le informazioni che abbiamo non sono sufficienti a correggere il problema. Le chiediamo pertanto di fornirci ulteriori dettagli su quale svolta sia o non sia consentita e su quali strade. RingraziandoLa, rimaniamo in attesa.",
    "Open",
/*
    "Incorrect junction", //12
    "Salve, abbiamo preso in carico la Sua segnalazione ma le informazioni che abbiamo non sono sufficienti a correggere il problema. Le chiediamo pertanto di inviarci ulteriori dettagli su cui effettuare le verifiche. Grazie.",
    "Open",

    "Missing bridge overpass", //13
    "Salve, abbiamo preso in carico la Sua segnalazione ma le informazioni che abbiamo non sono sufficienti a correggere il problema. Le chiediamo pertanto di inviarci ulteriori dettagli su cui effettuare le verifiche. Grazie.",
    "Open",
*/
    "Indicazioni di guida errate", //14
    "Salve, abbiamo preso in carico la Sua segnalazione ma abbiamo informazioni contraddittorie ed alcune mancanti che non ci permettono di correggere immediatamente la mappa. Ci sarebbe molto utile avere altre Sue informazioni sul problema riscontrato. Grazie.",
    "Open",
/*
    "Missing Exit", //15
    "Salve, abbiamo preso in carico la Sua segnalazione ma le informazioni che abbiamo non sono sufficienti a correggere il problema. Le chiediamo pertanto di inviarci ulteriori dettagli su cui effettuare le verifiche. Grazie.",
    "Open",

    "Missing Road", //16
    "Salve, abbiamo preso in carico la Sua segnalazione ma le informazioni che abbiamo non sono sufficienti a correggere il problema. Le chiediamo pertanto di inviarci ulteriori dettagli su cui effettuare le verifiche. Grazie.",
    "Open",
*/

    /*    "Missing Landmark", //18
    "Volunteer responding - Would you tell us as much as possible about the landmark you believe is missing? Thanks!",
    "Open",
*/
    /*
"Blocked Road", //19
"Volunteer responding -",
"Open",

"Missing Street Name", //21
"Volunteer responding -",
"Open",

"Incorrect Street Prefix or Suffix", ///22
"Volunteer responding -",
"Open",


*/

    "Speed Limit", //23
    "Salve abbiamo preso in carico la Sua segnalazione. Abbiamo fatto già delle verifiche ma abbiamo ancora bisogno del Suo aiuto per stabilire con precisione la posizione iniziale del limite segnalato ed altri limiti su quel tratto di strada. Rimanendo in attesa delle ulteriori Sue informazioni, La Ringraziamo anticipatamente.",
    "Open", 

    "<br>",
    "",
    "",
    //End of Default URs
/*
    "User Followed Waze's route",
    //"It appears that you ended up going the route Waze suggested, what was the problem you were having? Would you tell us your destination as you entered it into Waze? Thanks!",
    //"It appears that you followed the Waze-suggested route. What problem did you encounter here? Would you tell us your destination as you entered it into Waze? Thanks!",  //karlcr9911 12/7/2014
    "Volunteer responding - It appears that you followed the route Waze suggested. Would you please let us know what went wrong with the route Waze gave you? Would you tell us your destination as you entered it into Waze? Thanks!", //reworded rickzabel 12/7/2014
    "Open",

    "Alley Interference",
    //"Waze doesn't tell volunteer editors where you were going, although it was probably adjacent to the alley. If you would, please supply your destination as you entered it into Waze it may be helpful in correcting the route. Thanks!",
    //"Waze does not let the volunteer editors know where you were going, although it was probably adjacent to the alley. If you would, please supply your destination as you entered it into Waze, it may be helpful in correcting the route. Thanks!", //rickzabel 12/7/14
    "Volunteer responding - Waze does not let the us know where you were going, although it was probably adjacent to the alley. Would you tell us your destination as you entered it into Waze? Thanks!", //rickzabel 12/9/14
    "Open",

    "Road Closed",
    //"Would you please let us know the following; What road is closed?; between which intersections is this road closed; Do you know how long this road is scheduled to be closed? Thanks!", //karlcr9911
    "Volunteer responding - Would you please let us know the following; What road is closed?; between which intersections is this road closed; Do you know how long this road is scheduled to be closed? Thanks!", //rickzabel 12/9/14
    "Open",

    "Area Entrances",
    "We have had problems with Google pins being placed in the center of large landmarks. Delete your previous search and do a new search for the location. Go to the bottom of the auto fill list to see more results and make sure you pick the Waze search engine.",
    "Open",

    "48 Hour Reply",
    //"Please allow 48 hours for changes to be reflected in the live map.",
    "We made some changes to the map, please allow up to 48 hours for the changes to be reflected on the live map.", //rickzabel 12/7/14 //t0cableguy 12/8/14, karlcr9911 12/8/14
    "Open",

    "Clear Saved Locations",
    //"You should remove the location from your favorites and recent searches and then re-search for the location to update the result.",
    //"To get an updated result you should remove the location from your favorites and recent searches and then re-search for the location.", //rickzabel 12/7/14
    "To get an updated result, remove the location from your navigation history and then search for the location again.", //t0cableguy 12/8/14, karlcr9911 12/8/14
    "Open",

    "Address - Incorrect Position",
    //"Thank you for your report. Would you please let us know what address you’re reporting the problem with? You can also use the Report -> Places feature in Waze to mark the location. It is helpful that after taking a picture, if you move near the location your are marking to save the place. Also, please do not submit pictures containing faces, license plates, or similar personal details. Thanks!", //i also prefer not to send messages with contractions "you’re" rickzabel 12/7/14
    //"What was the Address you had issues with? Please show us where the address you had issues is with the Report > Places feature in Waze. After taking a picture move as close to the entrance of the place you are adding before saving. Please do not submit images with personal details. Thanks!", //t0cableguy 12/7/14, karlcr9911 12/8/14
    //"What was the Address you had issues with? Please show us where the address you had issues is with the Report > Places feature in Waze. After taking a picture, move close to the entrance of the place you are adding, before saving. Please do not submit pictures containing faces, license plates, or personal details. Thanks!", //rickzabel 2/26/15
    "Can you tell us the address or if you can revisit visit the location, please show us the correct position by using the Report > Places feature. Before you save move as close as possible to the entrance. Please do not submit pictures containing faces, license plates, or personal details. Thanks!",  //rickzabel t0cableguy 04-04-2015
    "Open",

    "Address - Missing from Map",
    //"Thank you for your report. Would you please let us know where the address you're reporting is? The live map doesn't have all the street numbers for that street and Waze is interpolating in error. You can also use the Report -> Places feature in Waze to mark the location. It is helpful that after taking a picture, if you move near the location you’re marking to save the place. Also, please do not submit pictures containing faces, license plates, or similar personal details. Thanks!", //rickzabel 12/7/14 
    //"Volunteer responding -  Would you let us know the address that is missing? The live map does not have all the street numbers. You can also use the Report Places feature in Waze to mark the location. It is helpful that after taking a picture that you move near the location you’re marking to save the place. Also, please do not submit pictures containing faces, license plates, or personal details. Thanks!", //rickzabel 12/9/14 
    //"Volunteer responding -  Would you let us know the address that is missing? The live map does not have all the street numbers. You can also use the Report Places feature in Waze to mark the location. It is helpful that after taking a picture that you move near the location you’re marking to save the place. Please do not submit pictures containing faces, license plates, or personal details. Thanks!", //rickzabel 2/26/15 
    "Volunteer responding - Would you let us know the address that is missing? The available resources do not have the address available for your location. You can use the Report > Places feature in Waze to mark the location. Before you save move close as possible to the entrance. Do not submit pictures containing faces, license plates, or personal details. Thanks!", //rickzabel 4/5/2015 //t0cableguy 4/5/2015
    "Open",

    "Address - Bad Results",
    //"Thank you for your report. The search feature retrieves results from a number of locations, including Google. Scrolling to the bottom the Navigate screen, you'll see more results for 'name.' Select that and Waze will list locations Around You. From there, you can also select results from other search engines.",
    //"Search results in Waze are retrieved from numerous sources. After tapping search, Scroll to the bottom and you will see options for other search engines . Please try a different option as each one may provide better navigation", //t0cableguy 12/7/14, karlcr9911 12/8/14
    "Search results in Waze are retrieved from numerous sources. After tapping search, Scroll to the bottom and you will see options for other search engines. Please try a different option as another search engine might have the address you are looking for", //rickzabel 12/9/14
    "Open",

    "House Number Adjustment",
    //"I've forced Waze to re-register the house number for your destination. I believe this should correct your issue. Please allow 48 hours for changes to be reflected in the live map. If the location is in your saved searches or favorites, please remove them and search for them again to pick up the change in the live map. Please let me know if you continue to experience the problem. Thanks!",
    "I've forced Waze to re-register the house number for your destination. I believe this should correct your issue. Please allow up to 48 hours for changes to be reflected in the live map. If you have the location in your saved searches or favorites, please remove them and re-add the destination. Please let me know if you continue to experience this problem by submitting another error report. Thanks!", //rickzabel 12/7/14 //karlcr9911 12/8/14
    "Open",

    "Missing Bridges or Roads",
    //"The roads here have been pretty thoroughly mapped and we volunteers can't see anything missing that should ordinarily be there. Waze probably simply chose not to show you the feature in question. When moving at highway speeds, Waze deliberately chooses not to display some nearby features to avoid cluttering the screen. If you are certain a feature is missing from the map, please reply and tell us as much as possible about it. Thanks!",
    //"The roads for this area are thoroughly mapped and the volunteer editors can not find anything missing from the map. When you are moving, Waze deliberately chooses not to display some nearby features to avoid cluttering the screen. If you are certain a feature is missing from the map, please reply and tell us as much as possible about it. Thanks!", //reworded rickzabel 12/7/14  //karlcr9911 12/8/14
    "The roads for this area are thoroughly mapped and the volunteer editors cannot find anything missing from the map. When you are moving, Waze deliberately chooses not to display some nearby features to avoid cluttering the screen. If you are certain a feature is missing from the map, please reply and tell us as much as possible about it. Thanks!", //rickzabel karlcr9911 4/18/2015
    "Open",

    "Manual Refresh",
    //"You can try a manual refresh by going to Settings > Advanced > Data transfer > refresh maps.",
    //"Please try doing these options. Tap the Wazer icon > Settings > Advanced > Data transfer > Refresh Map Of My Area. Second you can try clearing Waze's app cache in your phone’s app manager. The final option is  to Uninstall and Reinstall the app.", //t0cableguy 12/7/14
    //"Please try doing these options. Tap the Wazer icon > Settings > Advanced > Data transfer > Refresh Map Of My Area. Second, you can try clearing Waze's app cache in your phone’s app manager. The final option is to reset the app by going to the navigation screen and type ##@resetapp in search field and hit search.", // to Uninstall and Reinstall the app. (avoid user to use cellular data) //carloslaso 12/7/14 //rickzabel //t0cableguy
    //"Please try doing these options. Tap the Wazer icon > Settings > Advanced > Data transfer > Refresh Map Of My Area. Secondly, you can try clearing Waze's app cache in your phone’s app manager. The final option is to reset the app by going to the navigation screen and type ##@resetapp in search field and hit search.", //GizmoGuy rickzabel 2/26/15
    "Please try doing these options. Tap the Search Icon > Settings gear icon > Display & Map > Data Transfer > Refresh map of my area. Secondly, you can try clearing Waze's app cache in your phone’s app manager. The final option is to reset the app by going to the navigation screen and type ##@resetapp in search field and hit search.", // rickzabel 11/24/16
    "Open",

    "Pave Road",
    //"Please use the pave function in the app to show us the path of the missing road. You can do this by tapping the bottom right Pin icon, then Map Issue, and selecting the Pave Road tab. Once you leave any mapped roads you can tap start paving. Please be sure to tap the steamroller and tap stop paving before driving back onto any roads that are mapped. If paving a parking lot, please only drive the main roads and perimeters, not each aisle and space. Thanks for your contribution to the map! Thanks!", //requested by t0cableguy
    //"Please use the pave function in the app to show us the path of the missing road. You can do this by tapping the bottom right Pin icon, then Map Issue, and selecting the Pave Road tab. Once you leave any mapped roads you can tapp paving. Please be sure to tap the steamroller and tap stop paving before driving back onto any roads that are mapped. If paving a parking lot please only drive the main roads and perimeters, not each aisle and space. Thanks for your contribution to the map! Thanks!",//rickzabel
    //"Please pave the road in the app. Tap the Pin icon > Map Issue > Pave Road tab. After leaving any mapped roads tap start paving. Once done tap the steamroller > stop paving. Thanks for your contribution to the map!", //shortened and voted for by t0cableguy 12/7/14, karlcr9911 12/8/14
    //"Please pave the road in the app. Tap the Pin icon > Map Issue > Pave Road tab. After leaving any mapped roads tap start paving. Once done tap the steamroller > stop paving. If you then tap the  Pin icon (Report) > Map Issue > Missing Road, you can enter text providing information about the new road (name, is it a private road, etc.). Thanks for your contribution to the map!",//addition suggested by SuperDave1426 12/08/14
    //We already have open communication if we are telling them to pave a road. It would be helpful to drop ur pins but we have open communication and the users know how to submit reports. We shouldn’t close the UR that is already open, so we don’t need another UR.  t0cableguy 12/8/14 I’m leaning more torward adding this though SD as a teaching tool. t0cableguy 12/8/14
    //"Volunteer responding - You can pave the road from the app by tapping the Pin icon > Map Issue > Pave Road tab. After leaving the paved road tap start paving. Once done tap the steamroller > stop paving. You can provide information about the new road such as it's name buy tapping on the Pin icon > Map Issue > Missing Road, and Thanks!", //rickzabel 12/8/14 t0cableguy 12/8/14
    //"Volunteer responding - You can pave the road from the app by tapping the Pin icon > Map Issue > Pave Road tab. After leaving the paved road tap start paving. Once done tap the steamroller > stop paving. You can provide information about the new road such as it's name by tapping on the Pin icon > Map Issue > Missing Road, and Thanks!", //rickzabel 2/26/15
    "Volunteer responding - You can pave the road from the app by tapping the Pin icon > Map Issue > Pave Road tab. After leaving the paved road, tap Start paving. Once done, tap the Steamroller > Stop paving. You can provide information about the new road such as its name by tapping on the Pin icon > Map Issue > Missing Road. Thanks!", //karlcr9911 4/5/15 //rickzabel 4/5/15 removed single quotes
    "Open",

    //"Blank Screen.",
    //"Please follow these instructions in the app. Tap the Wazer icon > Settings > Advanced > Data transfer > Refresh map of my area. Second you can try clearing Waze's app cache in your phone’s app manager. The final option is  to Uninstall and Reinstall the app.",
    //"Open", //requested by t0cableguy 12/7/14 in map refresh now t0cableguy 12/8/14

    "Unlock request",
    //"I have requested the rights to get this issue fixed. Thanks for your report. Thanks! ", //requested by t0cableguy 12/8/14
    //"Volunteer responding to your report: I have requested the rights to get this issue fixed. Thanks for your report.", //rikzabel 12/8/14  i usually dont say anything cause this is weird that they made a request for you to make a request…
    //"I have begun the process to get this issue fixed. Thanks for your report. Thanks! ",//reword t0cableguy 12/8/14
    //"I have begun the process to get this issue fixed. Thanks for your report!", //rickzabel 12/11/14
    "I have started the process to get this issue fixed. Thanks for your report!",  //GizmoGuy, t0cableguy, rickzabel 1/14/2015
    "Open"
*/    
];
//end Custom list

