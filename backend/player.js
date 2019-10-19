/* List of connected players (aka clients) */
var players = {};

/* Construct player */
function Player (socket) {
    /* Initialize defaults */
    this.id = socket.id;
    this.socket = socket;
    this.name = 'Nimetön';
    this.status = 'init';
    this.room = null;
    this.cards = [];
}
Player.prototype = {};
Player.prototype.constructor = Player;

/* Static, create new player */
Player.create = function (socket) {
    let player = new Player (socket);
    players[player.id] = player;
    return player;
}

/* Static, remove player */
Player.destroy = function (player) {
    /* Remove player from a possible room */
    player.leave ();

    /* Remove player from list of active players */
    delete players[player.id];
};

/* Send message to player */
Player.prototype.emit = function (type, msg) {
    this.socket.emit (type, msg);
};

/* Mark player ready */
Player.prototype.ready = function () {
    if (!this.room) {
        throw new Error ('Ei liittynyt huoneeseen');
    }

    /* Change player status */
    this.status = 'ready';

    /* Inform other players about the status */
    this.room.emitOthers ('ready', this);

    /* Start the game, if possible */
    if (this.room.isReady ()) {
        this.room.start ();
    }
};

/* Enter game room */
Player.prototype.enter = function (room) {
    /* Reset player */
    this.name = 'Nimetön';
    this.status = 'init';

    /* Add player to room */
    room.addPlayer (this);

    /* Leave current room */
    this.leave ();

    /* Remember new room */
    this.room = room;
};

/* Leave game room */
Player.prototype.leave = function () {
    if (this.room) {
        /* Disassociate room from player */
        let room = this.room;
        this.room = null;

        /* Disassociate player from room */
        room.removePlayer (this);

        /* Destroy room if there are no more players */
        if (room.getNumberOfPlayers () == 0  &&  room.mode != 'waiting') {
            Room.destroy (room);
        }

    }
};

/* Set player's nickname */
Player.prototype.setNick = function (name) {
    if (!name) {
        throw new Error ('Nimi puuttuu');
    }
    if (name.length > 30) {
        throw new Error ('Liian pitkä nimi');
    }

    /* If player is in a room, then nick must be unique */
    if (this.room) {
        for (let i in this.room.players) {
            let player = this.room.players[i];
            if (player.id != this.id && player.name.toLowerCase () == name.toLowerCase ()) {
                throw new Error ('Nimimerkki on jo varattu - kokeile toista nimimerkkiä');
            }
        }
    }

    /* Save nick to this object */
    this.name = name;

    /* If player is in a game room, then announce nick to other players */
    if (this.room) {
        this.room.emitOthers ('nick', this);
    }
};

module.exports = Player;

