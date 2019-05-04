// ==UserScript==
// @name     webm to mpv opener
// @version     1.0.3
// @description     Changes 4chan (fileText.webm) urls to a localhost url. The local server opens mpv to play the video.         
// @namespace     https://greasyfork.org/users/3159
// @include     http*://boards.4chan*.org/*/*
// ==/UserScript==
a = document.getElementsByClassName('fileText');
for (i = 0; i < a.length; i++) {
	b = a[i].children[0];
	if (b.href.indexOf('.webm') > -1) {
		b.href = "http://127.0.0.1:4040?i=" + b;
		b.removeAttribute('target');
	}
}
/*
My mpv config text file (~/config/mpv/mpv.conf) has:
autofit-larger=100%x100%
loop=inf

Create a link to mpv:
sudo ln -s /Applications/mpv.app/Contents/MacOS/mpv /usr/bin/mpv

On OSX I used Platypus to change mpv_server.py (bellow) into an application.
Add the application to your login auto boot items, use python 2.7

import os
import subprocess, urlparse
import SimpleHTTPServer, SocketServer
PORT = 4040

class MyHandler(SimpleHTTPServer.SimpleHTTPRequestHandler):

    def do_GET(self):
        parsedParams = urlparse.urlparse(self.path)
        parsed_query = urlparse.parse_qs(parsedParams.query)
        url = parsed_query['i'][0]
        self.send_response(204)
        
        os.system('pkill mpv') #only one
		
        subprocess.Popen(
	    ['mpv','-no-audio',url], #disabled audio
            stdout=subprocess.PIPE
        )

Handler = MyHandler
httpd = SocketServer.TCPServer(('', PORT), Handler)
print "serving at port ", PORT
httpd.serve_forever()

*/
