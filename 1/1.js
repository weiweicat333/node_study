// 1.5.1
/* var fs = require('fs');
fs.readFile('resource.json', function(err, data) {
    console.log(data);
}); */
// 1.5.2
/* var http = require('http');
http.createServer(function(req, res) {
    res.writeHead(200, {'Content-Type' : 'text/plain'});
    res.end('Hello World\n');
}).listen(3000);
console.log('Server running at http://localhost:3000/');    
 */
// 1.5.2.1
/* var http = require('http');
var server = http.createServer();
server.on('request', function(req, res) {
    res.writeHead(200, {'Content-Type' : 'text/plain'});
    res.end('Hello World\n');
});
server.listen(3000);
console.log('Server running at http://localhost:3000/'); */
// 1.5.3
/* var fs = require('fs');
var stream = fs.createReadStream('./resource.json');
stream.on('data', function(chunk) {
    console.log(chunk);
});
stream.on('end', function() {
    console.log('finished');
}); */
// 1.5.3.1
var http = require('http');
var fs = require('fs');
http.createServer(function(req, res) {
    res.writeHead(200, {'Content-Type' : 'image/png'});
    fs.createReadStream('./test.png').pipe(res);
}).listen(3000);
console.log('Server running at http://localhost:3000/');