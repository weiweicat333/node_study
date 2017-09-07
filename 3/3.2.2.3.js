var events = require('events');
var net = require('net');
var channel = new events.EventEmitter();
channel.clients = {};
channel.subscription = {};

channel.on('join', function(id, client) {
    this.clients[id] = client;
    this.subscription[id] = function(senderId, message) {
        if (id != senderId) {
            this.clients[id].write(message);
        }
    };
    this.on('broadcast', this.subscription[id]);
});

var server = net.createServer(function(client) {
    var id = client.remoteAddress + ':' + client.remotePort;
    client.on('connect', function() {
        channel.emit('join', id, client);
    });
    client.on('data', function(data) {
        data = data.toString();
        channel.emit('broadcast', id, data);
    });
});
server.listen(3333);