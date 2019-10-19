var Card = require ('./card');

/* List of game rooms */
var rooms = {};

/* Counter for generating labels */
var counter = 1;


/* Create game room */
function Room () {
    /* Initialize defaults */
    this.id = (counter++);
    this.mode = 'waiting';
    this.name = 'Pöytä ' + this.id;
    this.players = {};
    this.deck = [];
}
Room.prototype = {};
Room.prototype.constructor = Room;

/* Static, create another room */
Room.create = function () {
    let room = new Room ();
    rooms[room.id] = room;
    console.log ('Created room ' + room.id);
    return room;
};

/* Static, destroy room */
Room.destroy = function (room) {
    console.log ('Destroy room ' + room.id);
    delete rooms[room.id];
};

/* Static, list available rooms */
Room.available = function () {
    let arr = [];
    for (let i in rooms) {
        let room = rooms[i];

        /* Skip rooms not in waiting state */
        if (room.mode != 'waiting') {
            continue;
        }

        /* Skip full rooms */
        if (room.getNumberOfPlayers () >= 4) {
            continue;
        }

        /* Save room data */
        arr.push({
            id: room.id,
            name: room.name,
            players: room.getNumberOfPlayers (),
        });

        /* Only return the first 10 rooms */
        if (arr.lenght > 10) {
            break;
        }

    }

    /* If there are no open rooms, then create a new one */
    if (arr.length < 1) {
        let room = Room.create ();
        arr.push({
            id: room.id,
            name: room.name,
            players: 0,
        });
    }

    return arr;
};

/* Static, find room with the id */
Room.get = function (id) {
    if (typeof rooms[id] == 'undefined') {
        throw new Error ('Pöytä on suljettu');
    }
    return rooms[id];
};

/* Returns true when all players are ready */
Room.prototype.isReady = function () {
    /* Loop through the players and count the players who are ready */
    let count = 0;
    for (let i in this.players) {
        let player = this.players[i];
        if (player.status == 'ready') {
            count++;
        }
    }

    /* Game is ready to start if every single player is ready */
    let ready;
    if (count > 1  &&  count == this.getNumberOfPlayers()) {
        ready = true;
    } else {
        ready = false;
    }
    return ready;
};

/* Start the game */
Room.prototype.start = function () {
    /* Do not start a game unless all players have accepted */
    if (!this.isReady ()) {
        return false;
    }

    /* Tell players to enter the game screen */
    this.emitAll ('start-game');

    /* Initialize deck */
    this.newGame ();
    return true;
};

/* Generate new deck and shuffle it */
Room.prototype.newGame = function () {
    let suits = ['club', 'diamond', 'heart', 'spade'];

    /* Add 52 cards to a deck */
    let deck = [];
    for (let suit of suits) {
        for (let i = 1; i <= 13; i++) {
            deck.push (new Card (suit, i));
        }
    }

    /* Shuffle deck */
    for (let i = deck.length - 1; i > 0; i--) {
        /* Pick a random number between 0 and i (inclusive) */
        let j = Math.floor(Math.random() * (i + 1));

        /* Swap cards i and j */
        let temp = deck[i];
        deck[i] = deck[j];
        deck[j] = temp;
    }

    /* Save deck */
    this.deck = deck;
}

/* Send player update message to room */
Room.prototype.emitOthers = function (type, player) {
    for (let i in this.players) {
        let other = this.players[i];
        if (other.id != player.id) {
            other.emit (type, {
                id: player.id,
                name: player.name,
                status: player.status,
            });
        }
    }
};

/* Send message to all players in a room */
Room.prototype.emitAll = function (type, msg) {
    for (let i in this.players) {
        let player = this.players[i];
        player.emit (type, msg);
    }
};

/* Add player to room */
Room.prototype.addPlayer = function (player) {
    /* Cannot add same player twice */
    if (typeof this.players[player.id] != 'undefined') {
        throw new Error ('Ei voi liittyä toista kertaa');
    }

    /* Cannot join into a started game */
    if (this.mode != 'waiting') {
        throw new Error ('Peli alkoi jo');
    }

    /* Pelipyödässä voi olla enintään neljä pelaajaa */
    if (this.getNumberOfPlayers () >= 4) {
        throw new Error ('Pöytä on jo täynnä');
    }

    /* Inform other players in the room (player is not yet added to list) */
    this.emitAll ('enter', {
        id: player.id,
        name: player.name,
        status: player.status,
    });

    /* Inform the new player about the other players */
    for (let i in this.players) {
        player.emit ('enter', {
            id: this.players[i].id,
            name: this.players[i].name,
            status: this.players[i].status,
        });
    }

    /* Add player to list of active players */
    this.players[player.id] = player;
};

/* Remove player from room (e.g. player disconnected) */
Room.prototype.removePlayer = function (player) {
    /* Cannot remove player who is not in room */
    if (typeof this.players[player.id] == 'undefined') {
        throw new Error ('Pelaaja lähti jo');
    }

    /* Remove player from room */
    delete this.players[player.id];

    /* Inform other players in room */
    this.emitAll ('leave', {
        id: player.id,
        name: player.name,
        status: player.status,
    });
};

/* Return number of players in a room */
Room.prototype.getNumberOfPlayers = function () {
    let count = 0;
    for (let i in this.players) {
        if (this.players.hasOwnProperty(i)) {
            count++;
        }
    }
    return count;
};

module.exports = Room;

