
module.exports = function(app){
  var server   = require('http').Server(app);
  var io       = require('socket.io')(server);

  io.on('connection', function(socket) {
    console.log('connected');
});

io.emit('connected')
};
