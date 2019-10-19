/* Initialize components */
var express = require ('express');
var app = express ();
var http = require ('http').Server (app);
var io = require ('socket.io') (http);
var Room = require ('./backend/room');
var Player = require ('./backend/player');

/* Create initial game rooms */
for (let i = 0; i < 10; i++) {
    Room.create ();
}

/* Handle incoming connection */
io.on ('connection', function (socket) {
    /* Get socket identifier */
    console.log (socket.id + ' connected');

    /* Remember active players */
    let player = Player.create (socket);

    /* Set nickname */
    socket.on ('nick', function (name, callback) {
        try {
            player.setNick (name);
        }
        catch (e) {
            callback (e.message);
            return;
        }

        /* Success */
        console.log (player.id + ' set nick ' + name);
        callback ('');
    });

    /* List game rooms waiting for players */
    socket.on ('list', function (callback) {
        let arr = Room.available ();
        callback (arr);
    });

    /* Indicate that the player is ready */
    socket.on ('ready', function () {
        console.log (player.id + ' is ready');
        player.ready ();
    });

    /* Create game room */
    socket.on ('enter', function (id, callback) {
        /* Enter room */
        try {
            let room = Room.get (id);
            player.enter (room);
        }
        catch (e) {
            /* Error */
            callback (e.message);
            return;
        }

        /* Success */
        console.log (player.id + ' joined room ' + id);
        callback ('');
    });

    /* Leave game room */
    socket.on ('leave', function () {
        if (player.room) {
            console.log (player.id + ' left room ' + player.room.id);
        }
        player.leave ();
    });

    /* Handle disconnect */
    socket.on ('disconnect', function () {
        Player.destroy (player);
        console.log (player.id + ' disconnected');
    });

    /* Send welcome message to player */
    player.emit ('init');
});

/* Serve files */
app.get ('/', function (req, res) {
    res.sendFile (__dirname + '/public/index.html');
});
app.get ('/static/js/vue.js', function (req, res) {
    res.sendFile (__dirname + '/node_modules/vue/dist/vue.js');
});
app.get ('/static/js/popper.js', function (req, res) {
    res.sendFile (__dirname + '/node_modules/popper.js/dist/umd/popper.js');
});
app.get ('/static/js/jquery.js', function (req, res) {
    res.sendFile (__dirname + '/node_modules/jquery/dist/jquery.js');
});
app.get ('/static/js/bootstrap.js', function (req, res) {
    res.sendFile (__dirname + '/node_modules/bootstrap/dist/js/bootstrap.js');
});
app.get ('/static/css/bootstrap.css', function (req, res) {
    res.sendFile (__dirname + '/node_modules/bootstrap/dist/css/bootstrap.css');
});
app.get ('/static/css/font-awesome.css', function (req, res) {
    res.sendFile (__dirname + '/node_modules/font-awesome/css/font-awesome.css');
});
app.get ('/static/fonts/FontAwesome.otf', function (req, res) {
    res.sendFile (__dirname + '/node_modules/font-awesome/fonts/FontAwesome.otf');
});
app.get ('/static/fonts/fontawesome-webfont.svg', function (req, res) {
    res.sendFile (__dirname + '/node_modules/font-awesome/fonts/fontawesome-webfont.svg');
});
app.get ('/static/fonts/fontawesome-webfont.woff', function (req, res) {
    res.sendFile (__dirname + '/node_modules/font-awesome/fonts/fontawesome-webfont.woff');
});
app.get ('/static/fonts/fontawesome-webfont.eot', function (req, res) {
    res.sendFile (__dirname + '/node_modules/font-awesome/fonts/fontawesome-webfont.eot');
});
app.get ('/static/fonts/fontawesome-webfont.ttf', function (req, res) {
    res.sendFile (__dirname + '/node_modules/font-awesome/fonts/fontawesome-webfont.ttf');
});
app.get ('/static/fonts/fontawesome-webfont.woff2', function (req, res) {
    res.sendFile (__dirname + '/node_modules/font-awesome/fonts/fontawesome-webfont.woff2');
});

/* Serve static files from directory public */
app.use (express.static ('public'));

/* Listen for connections on port 3000 */
http.listen (3000, function () {
    console.log ('Listening on *:3000');
});

