/* Initialize socket.io */
var socket = io ();

/* Handle incoming messages from server */
socket.on ('debug', function (message) {
    store.setMessage (message);
});

/* Keep track of players */
socket.on ('init', function () {
    /* Reset client */
    store.reset ();
});
socket.on ('enter', function (player) {
    store.setMessage (player.name + ' liittyi peliin');
    store.addPlayer (player);
});
socket.on ('leave', function (player) {
    store.setMessage (player.name + ' poistui pelistä');
    store.removePlayer (player);
});
socket.on ('nick', function (player) {
    store.updatePlayer (player);
});
socket.on ('ready', function (player) {
    store.setMessage (player.name + ' on haluaa aloittaa');
    store.updatePlayer (player);
});
socket.on ('start-game', function (message) {
    store.setMessage ('Peli alkaa');
    store.setPage ('app-board');
});
socket.on ('card', function (message) {
    console.log ('Sait kortin');
    console.log (message);
    /* FIXME */
});
socket.on ('start-turn', function (message) {
    store.setMessage ('Sinun vuoro');
    /* FIXME */
});

/* Initialize vue */
var app = new Vue({
    el: '#app',
    data: {
        state: store.state,
    },
});

