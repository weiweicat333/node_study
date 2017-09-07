var net = require('net');
var server = net.createServer(function(socket) {
    socket.on('data', function(data) {
        console.log(data);
        socket.write('\n' + data);
    }); 
    // socket.once('data', function(data) {
    //     console.log(data);
    //     socket.write('\n' + data);
    // });
});

server.listen(3333);