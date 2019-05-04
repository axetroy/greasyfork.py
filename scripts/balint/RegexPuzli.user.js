// ==UserScript==
// @name        RegexPuzli
// @namespace   http://wifi.com
// @include     https://regexcrossword.com/playerpuzzles
// @version     12.4
// @author   Hamid
// @grant    GM_getValue
// @grant    GM_setValue
// @grant    GM_xmlhttpRequest
// @grant    GM_openInTab
// @description regex puzzle helper
// ==/UserScript==

var script_link = "https://greasyfork.org/en/scripts/22385-regexpuzli/code/regexpuzli.user.js";

var Solved = ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "Self-defined", "Kings Viking 2019", "Tab", "flip flop", "Challenge 1 - Puzzle 3", "NOT an instrument", "Challenge 1 - Puzzle 2", "Challenge 1 - Puzzle 1", "Easiest Puzzle Ever", "Sample Puzzle 1", "ushtutorial1", "CompSci Christmas", "icpc puzzle 0", "icpc puzzle 1", "HELP", "lol", "Artifact", "DurHack-2018-p1", "Ignis-Terra-Aer-Aqua", "Laura Krueger", "doo doodoo doooooo", "OLKA01", "Rock'n'Roll", "Greatest Puzzle", "Brazil", "sample", "achiEvEmEnt", "WIP", "Be a winner", "Slogan", "BBC Radio4 Puzzle", "Random Stuff", "Brainfuck says what we like most", "Chris Johnson has...", "&lt;ilx:hacks /&gt;", "City and also language", "aba", "Delivery courier", "From beginning.", "Flaming Chalice", "fortSQ", "Euler's Negative One", "Spycursion Challenge @ PAX West", "KW75", "Pretty good", "Phase Alternating Line --- or the maths behind old analogue TV", "U Make Me Feel So Good", "Incredibly easy and boring", "SATOR", "purple", "Lost In Space", "Bad for your sanity", "Testeyuri", "Preston park, nr clock tower, tuesdays in the summer", "Easy as...", "Testing testing lovely testing 2", "Super Hard Puzzle", "Number ?", "Max Fan Regex Crossword", "Rare Earth Metal that is not Lithium by Parker", "Rare Earth Metal", "TomomiMetal", "High-stability atomic clocks", "Singapore", "The BEST rare earth metal", "It's Henry's Rare Earth Metal!", "super powers", "Rare Earth Metals (Vaskar)", "rareearthmetals", "MaddysMetal", "ClassMay", "The Magic Word", "electrical measurement of water purity", "A draw", "failure mode analysis", "Bible basher", "Really saying something!", "Questions?", "Wunsch", "A Perfect Match", "Simple binary fun", "Triple fun", "Quick answer", "All-in", "I'm new here", "Scala Traits I Like", "Regexide Geocache", "Limerick Maths", "Shift Cryptosecurity", "Schoolboy prank for today", "Most hated in the nation (only joking)!", "Old Fortune", "2020", "Should be enough", "The Queen's Command!", "Oh oh", "Cover Your Bases", "Big Word Speaker", "Github", "One Extra Credit Please", "Movies (Unambiguous)", "Participation Puzzle", "CS 330 Puzzle!", "Ruzzle Puzzle Smuzzle Duzzle", "330 Regexp Puzzle", "compliment", "F00D", "Class", "Participate", "News", "series", "NICE", "mot-croisé", "Tester (Unambiguous)", "1l1", "On The Radio (EASY)", "Enigma", "11:11pm", "This is a puzzle", "CS 330 Participation Point", "PL2018 (Unambiguous)", "Rachel's Puzzle", "Conspiracy", "Riley Pikus", "Seven", "A Sick Puzzle, My Dudes", "Radiohead / Plastic (unambiguous)", "Question", "Trump's Promise", "Caesar", "Easy Padawan", "First tryyyyyyyyy", "λ (Unambiguous)", "Unbelievable", "Damn SIEM", "Consciousness transfer pioneer", "blue-rabbit", "Positive Look-Ahead (Unambiguous)", "De Saison (Corrected)", "Nokia T-Shirt 2018", "Crash", "Sentence Shout", "Wishes", "Like a VGA plug", "Byte-sized", "Clearly...", "TD", "LauzHack 2017 #0", "LauzHack 2017 #1", "Puzzles - unambiguous", "Happy Birthday!", "A very hard puzzle (wink wink)", "hello /sci/ (conv to lc)", "The answer is on a bridge in Dublin", "FIT LAN", "Greetings", "Screen-door effect", "Underscore", "Vowels", "Sample Puzzle", "Employee mandatory 2019", "VV Engineering Challenge #2", "four times four cells", "Childish way of talking!", "Can you give us a statement?", "Off the coast of Lancing, UK", "ASCII flowers", "regex magic!", "OLD Skool", "common street drug / industrial solvent", "Cheap date", "By any other name !", "Hurdy Gurdy", "commmon street drug", "FAV LANG", "Invisible danger", "2012", "It's a start", "KSMG", "N3C3$$4RY  ..::KNOWNLEDGE::...", "CSGO", "X-Y-Z 5x5", "X-Y-Z 6x6", "TGI Puzzle 3", "TGI Puzzle 2", "TGI Puzzle 4", "SLayer", "The best time", "X-Y-Z 4x4", "Overflow", "TGI Puzzle 5", "BBC Radio 4 - Puzzle No. 3 – Wednesday 5 July", "fino", "TGI Puzzle 1", "BBC Radio 4 (typo fixed)", "PuzzleBuild", "joeys test", "Owerflow", "Uniambiguous Sodoku", "Cutting Edge Field", "Round and round", "Circlular", "The Answer To Every AI Question", "(?:[C-Z]|[0-9])+([F-P][A-I])(?:[E-V]){1,5}([^E-V]){1}(\\2)*(?:[^A-D]|[^E-Z])([^L-S])+(?:[L-R]|[^A-E])*(\\1)?([0-9]+|[^A-F])+", "Adam Soudglas", "The End-Picross", "hvgh", "Welcome to RegEx (Redux)", "Spirit", "Named Puzzle", "solution middle row (char 2, 4 and 7 lowercase)", "42", "Binary frenzy", "Going Somewhere?", "References not available upon request", "Superimposed infinity", "Zero point of painting", "Star wars day 2017", "Leaning toothpick syndrome", "5²", "CAPITAL", "Honoretis mortuos et eorum memineritis", "SHES SO TOUGH", "Welcome To The Game", "∞", "\"Quinque\" Sodoku", "Cupid's Arrow", "3X3 Test REGEX", "3x3 Crossword", "EOC", "Capital city (2)", "Capital city", "Geocaching 2", "To Multe", "Royal Game", "GEOCACHING", "CS330","Baby Steps", "Sun destination", "Beam Me Up, Scotty!", "Quem Aguenta", "Logo", "Code", "K4", "Fibonacci", "Morse", "From 2013 MIT Mystery Hunt, by Dan Gulotta, Palmer Mebane", "The Beast", "The Matrix", "Prized Norse Possession", "I dare you","Word Character Class","Full Recursion","Checkmate, Atheists","References","This one is trivial.","Julius Caesar","Morse 2016","Mayan Calendar","[Hexagonal] Regex Math","Inception","\"5\" in Latin is \"quinque\".","Some Assembly Required","Test your Meta","Pipe Mania","Letter","A Game of Cat and Mouse","Quantum Mechanics.","Simple Crossword","Hex Recursion","O'reilly? The book might be Han(j|d)ie!","Binary","Regex Picross","What are you?","Hexagonal Tests","An Irrational Number, Part 2","An Irrational Number","Shakespeare","Boat","You('ve)? got","Trap","The Great Escape","A Culture of Death","What the hell?","An Irregular Expression","British Rock","Do you see it?","Good ol' days...","Cryptosum","Before and After","Ships","An Irrational Number, The End","Prime puzzle","Regular Express+ion","punctuation","Minicross","Song Quote 1/3","Do you want a *slurp* picross?","Invade mecross","puzzle","An Irrational Number, The Final Chapter","Brain Fucking","confession","Now you see me....... not!","Sudoku","Daddy ?!?","Wisdom from a little green man.","Like a Record","Seek and You Shall Find","GiveUp Face","From Hoban","Louss-Yeah","Programmer's source of wisdom","American Standard Code for Information Interchange","King of pop","Song Quote 3/3","Hex-Tex","Testing Initiative","███████","Love", "Days are boring","The Ethic","Zen Quote I","The worst in the universe.","Random","Just Symbols","Thue–Morse","Shapes","Pan Galactic","A Beginning","Why would anyone even try?","Any Question?","Shirt concept","Star Wars","Shinny and Precious","Interesting","Single Celled Organism","They came from... outer space.","Can you pattern match?","Exterminate","Off with his head!","Things to Watch Out For (WIP)","I Wanted Orange","Ambiguity (almost) killed the cat","The King !","SQL","Hardly ambiguous","Turning About","Shall You Name Him?","Sultana","Wordsmith Math","151","Audrey!!","Small magic square","Unlucky","Django Con Budapest 2016","Assertion and back referencing","Baby sudoku","Mitnick","Linkage","Seasonal 2","Song Quote 2/3","lettres","SO 60's","Decent","Jabberwocky","Alan Perlis","Zen Quote II","X marks the spot.","Decipher This","Simple and Odd","RPN","Is it?","4x4 from Goobix.com","First line [RERATE plz]","Nothing like Jelly","Ctrl + ←","Just do it!","Over a barrel","Double Helix","Bawth","Beehive","Doggis Puzzle","Space","I Double Dare You","Hardware Hacking","(Hello){2}","URL kokota","ghus","This will literally kill you","The reason why we are here","Glider","Tic Tac Toe","Disposition","Music time","BT and GE","Lea la consigna","Concurrency","Sapphire Red","Puzzle Is a Six Letter Word","I Am Your Father!","Revolution","I tried !","Fear","Unsafe SQL","Bunny","50%","Retro","proverb","Zero Wing","Gotta try'em all!","Bruce Lee","Binario 2","Potus","It's...","Achievement Unlocked!","The Devil","Country","Occam's razor","Beruf","Spock","Merry Christmas!","These are their...","Danger","Current affairs","You Panicked",":)","Faithful Companion","Two blondes on way to ZOO saw a sign: \"ZOO left\". So....","Do you?","Peace","Hitchhiker","Evolution","Extra Shot","Simple pzl","OH-YA!","Two swords","Be a hero","HAL o","In the advent of patch","nsVicertPuzzle","Thinking is key","Circle","Binary Bee","Beginnings","Blind","Simple","In the advent of patch 2","DNA","Talupema","Tic-Tac-Toe","My Favorite Language","Want your girl to learn regex?","Fan Favorite","Seasonal!","OS Services","The best OS for a geek...","Ted","Gimli","Warhammer 40k","gvhygh","Dr Suess","Symphonic metal","SO","Parallel","A Sunny Disposition","Nice Network Providerv1","Saddle Club","Eat it!","How Long","BSD UNIX","State 1: Beyond the Blue Horizon","A Friend","State 4: Zimmerland","State 8: Old Man Fall Down","Free source","KOBE","State 6: 2 Shades of Blue","GeoRegExp Puzzle","MYTOWN","frist try","1 field and so much pain","Bedtime Story","drink me","{{user.name}}","Say hi!","Sleep robot","Floaty","GNU Project","name of the magazine that showed the KERNELL to the world","Puzzzzzle","Showing Off","For Miss G","State 5: Find the Key","State 3: Needle in a Haystack","Regexcrossword 3X3","Pushing","Between us","Magic","Quickie","optimistic","War, war never changes ...","ANN3","SimpleRegex","State 2: How Much Fun Can You Bear?","Binario","True or false","agav","ANN2","Enjoy","State 7: Norman and Arlo","SAO","2BA Ecam 14094","FIRST PUZZLE","Hexagony","Alpha","Grilled meat","Your Reddit Gifts puzzle","Check it already!","Get the extinguisher!","Exercici 3","One","The feels","simple but hard","A martial art","BiPi","Use the force Luc","ANN1","Hi, /g/!","Snail","My simple","Who you gonna call?","Guris","Unix Sistemas Operativos","#1 First Built","Unique puzzle","Find a tour","Armen","L0v3 it","Short message","[]","Yolo !","Ecam_puzzle","Exercici 2","Simple metacharacter","Harrison","Who am I ?","just a start","The Professor","For Beginners","xkcd 1137","Take 1","ALPHABET","There can only be...","Bling","Basic Intro","gttnnn","Z|F","i/o","First test","CLIC Egg Hunt 2016 #2","ECAM 14055 2BA","xzo","XO","Easy","Test puzzle","Exercici 1", "The One and Only","First","www","Easy A","Chive","666","HELLO WORLD","My First Test","The obnoxiously easy puzzle.","1","Very Easey","Very Simple", "&lt;3","Can't make it without \\u","Regex Test No.1: Regex for test times match[次数匹配]", "seeker's weapon", "Nevermore", "Buddha", "It's All Greek To Me", "Singularity", "Perl programmer", "PageToken", "Hello Group", "Puzzle #8", "Bifronte (By Yohel Muñoz)", "Colores2", "Lanzas de combate", "Kickass Developers", "JSON", "Easy peasy", "LauzHack 2016", "'Tis The Season", "*.*", "Blue Collar Comedy", "Avatar", "Fight Club", "If you had a fast car", "Fix it now!", "Quickie 2", "Age of man"];

unsafeWindow.console.log ("Solved:" + Solved.length);

setTimeout(callFunc, 3000);

//setTimeout(calculate, 10000);
function calculate(){
   var link = document.getElementsByTagName('a');
   var summa = "";
  for (var i = 0; i < link.length; i++)
    summa+= "\""+link[i].innerHTML+"\",";
   alert(summa);
}
function callFunc(){
  removeSolved(Solved);
}

function removeSolved(arr){
  var link = document.getElementsByTagName('a');
  for (var i = link.length-1; i >=0 ; i--) {
      if(Contains(arr,link[i].innerHTML)){
           link[i].parentElement.parentElement.parentElement.removeChild(link[i].parentElement.parentElement);
       }
  }
}
function Contains(arr, str){
  for(j=0;j<arr.length;j++)
    if(arr[j]==str)
      return true;
  return false;
}


function updateCheck(forced)
{
    if ((forced) || (parseInt(GM_getValue('SUC_last_update', '0')) + 86400000 <= (new Date().getTime()))) // Checks once a day (24 h * 60 m * 60 s * 1000 ms)
    {
        try
        {
            GM_xmlhttpRequest(
                {
                    method: 'GET',
                    url: script_link,
                    headers: {'Cache-Control': 'no-cache'},
                    onload: function(resp)
                    {
                        var local_version, remote_version, rt, script_name;

                        rt=resp.responseText;
                        GM_setValue('SUC_last_update', new Date().getTime()+'');
                        var re = /@version\s*(.*?)\s/m;
                        remote_version=parseFloat(re.exec(rt)[1]);
                        local_version=parseFloat(GM_getValue('SUC_current_version', '-1'));
                        if(local_version!=-1)
                        {
                            script_name = (/@name\s*(.*?)\s*$/m.exec(rt))[1];
                            GM_setValue('SUC_target_script_name', script_name);
                            if (remote_version > local_version)
                            {
                                if(confirm('There is an update available for the Greasemonkey script "'+script_name+'."\nWould you like to go to the install page now?'))
                                {
                                    GM_openInTab(script_link);
                                    GM_setValue('SUC_current_version', remote_version);
                                }
                            }
                        }
                        else
                            GM_setValue('SUC_current_version', remote_version+'');
                    }
                });
        }
        catch (err)
        {
            if (true)
                alert('An error occurred while checking for updates:\n'+err);
        }
    }
}


updateCheck();