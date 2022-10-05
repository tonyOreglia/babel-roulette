const express = require('express');
const app = express();

//The http.Server (same as http.CreateServer()) expects a function which has the following signature function(req, res)
// require('express')(); will create a function
const server = require('http').Server(app);
const io = require('socket.io')(server);
const { v4: uuidV4 } = require('uuid');

// set the template engine to use ejs
app.set('view engine', 'ejs');

// This is a built-in middleware function in Express. It serves static files and is based on serve-static.
const handler = express.static('public')
// now you can go to localhost:3000/script.js and see the scripts text ... :shrug: 
// this is just giving the app access to the script
app.use(handler);

// redirect to the /:room definition which is next
app.get('/', (req, res) => {
    res.redirect(`/${uuidV4()}`);
})


app.get('/:room', (req, res) => {
    // the default of this express.res.render method looks into the views folder; in this case for the room.ejs file
    res.render('room', { roomId: req.params.room });
})

// client side has initiated an socket.io connection to the server
io.on('connection', (socket) => {
    // 'join-room' event sent from client
    socket.on('join-room', (roomId, userId) => {
        joinRoom(socket, roomId, userId);
    })
})

function joinRoom(socket, roomId, userId) {
    console.log(roomId, userId);
    // Adds the socket to the given room
    // A Room is a server-side concept that allows broadcasting data to a subset of clients
    socket.join(roomId);
    // 'broadcast' sets a modifier for a subsequent event emission that the event data will only be broadcast to every sockets but the sender.
    // emit user-connected event
    socket.to(roomId).broadcast.emit('user-connected', userId);

    socket.on('disconnect', () => {
        socket.to(roomId).broadcast.emit('user-disconnected', userId);
    })
}

// start the server listening on localhost port 3000
server.listen(8084);

