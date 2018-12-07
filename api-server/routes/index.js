var express = require('express');
var router = express.Router();
const socketIO = require('socket.io');


var apiKey = "46224992";
var apiSecret = "b6db2cf7bef64a51e61fc167550d1717ab82f572";
var OpenTok = require('opentok'),
opentok = new OpenTok(apiKey, apiSecret);

/* GET home page. */
router.get('/server', function(req, res, next) {
    console.log('server');
  // Create a session that will attempt to transmit streams directly between
  // clients. If clients cannot connect, the session uses the OpenTok TURN server:
  opentok.createSession({mediaMode:"relayed"}, function(err, session) {
    if (err) return console.log(err);
    
    var sessionId = session.sessionId;
    // save the sessionId
    // db.save('session', sessionId, done);

    // Generate a Token from just a sessionId (fetched from a database)
var token = opentok.generateToken(sessionId);

return res.json({session: session, token: token, sessionId: sessionId, API_KEY: apiKey});
});
});
router.get('/get', function(req, res){
  console.log('get');
})

router.get('/connectvideo', function(req, res, next){
  console.log('connectvideo');
  var io = socketIO();
  io.on('connection', (socket) => {
    socket.emit('videostart',generateMessage('admin', 'Welcome to the App'));
    socket.broadcast.emit('newMessage', generateMessage('Admin', 'new user found'));
    socket.on('createMessage', (data) => {
        io.emit('newMessage', generateMessage(data.from, data.data) );

        // socket.broadcast.emit('newMessage', {
        //     from: data.from,
        //     data: data.data,
        //     createdAt: new Date().getTime()
        // })
    });

});
console.log(io);
return io;


})

module.exports = router;
