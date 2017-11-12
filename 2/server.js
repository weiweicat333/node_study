var http = require("http");
var fs = require("fs");
var path = require("path");
var mime = require("mime");
var chatServer = require('./lib/chat_server');
var cache = {};

function send404(res) {
    res.writeHead(404, {
        'Content-Type' : 'text/plain'
    });
    res.write('Error 404 : resource not found.');
    res.end();
}

function sendFile(res, filePath, fileContents) {
    res.writeHead(200, {
        'content-type' : mime.lookup(path.basename(filePath))
    });
    res.end(fileContents);
}

function serveStatic(res, cache, absPath) {
    if(cache[absPath]) {
        sendFile(res, absPath, cache[absPath]);
    } else {
        fs.exists(absPath, function(exists) {
            if(exists) {
                fs.readFile(absPath, function(err, data) {
                    if(err) {
                        send404(res);
                    } else {
                        cache[absPath] = data;
                        sendFile(res, absPath, data);
                    }
                });
            } else {
                send404(res);
            }
        });
    }
}

var server = http.createServer(function(req, res) {
    console.log(req.connection.remoteAddress, req.url);
    var filePath = false;
    
    if(req.url == '/') {
        filePath = 'public/index.html';
    } else {
        filePath = 'public' + req.url;`find . -print | sed -e 's;[^/]*/;|____;g;s;____|; |;g'`
    }

    var absPath = './' + filePath;
    serveStatic(res, cache, absPath);
});

chatServer.listen(server);

server.listen(8999, "0.0.0.0", function() {
    console.log("Server listening on port 8999.");
});
