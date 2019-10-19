/* Vue global state */
var store = {
    state: {

        /* Name of current page (registered Vue component) */
        page: 'app-front',

        /* Nickname of player */
        name: (localStorage.getItem ('nick') || 'noname'),

        /* Current game room name */
        room: '',

        /* Player status */
        status: 'init',

        /* Other players in the game room */
        players: [],

        /* List of cards being held */
        cards: [],

        /* Current message in statusbar */
        message: '',

    },
    reset () {
        store.state.page = 'app-board';
        store.state.name = (localStorage.getItem ('nick') || 'noname');
        store.state.room = '';
        store.state.status = 'init';
        store.state.players = [];
        store.state.cards = [
            {
                suit: 'spade',
                value: 5,
            },
            {
                suit: 'club',
                value: 8,
            },
            {
                suit: 'heart',
                value: 11,
            },
            {
                suit: 'spade',
                value: 11,
            },
            {
                suit: 'heart',
                value: 12,
            },
        ];
    },
    setPage (i) {
        store.state.page = i;
    },
    setNick (name) {
        localStorage.setItem ('nick', name);
        store.state.name = name;
    },
    addPlayer (player) {
        let found = false;

        /* Find player without an id */
        for (let i in store.state.players) {
            if (!store.state.players[i].id) {
                /* Found an empty slot => insert player there */
                store.state.players.splice (i, 1, player);
                found = true;
                break;
            }
        }

        /* Append new player if no free slot is found */
        if (!found) {
            store.state.players.push (player);
        }
    },
    removePlayer (player) {
        /* Find player from list and add an empty slot */
        for (let i in store.state.players) {
            if (store.state.players[i].id == player.id) {
                store.state.players.splice (i, 1, {
                    id: null,
                    name: 'Vapaa',
                    status: '',
                });
                break;
            }
        }
    },
    updatePlayer (player) {
        for (let i in store.state.players) {
            if (store.state.players[i].id == player.id) {
                Vue.set (store.state.players, i, player);
            }
        }
    },
    addCard (card) {
        store.state.cards.push (card);
    },
    removeCard (card) {
        for (let i in store.state.cards) {
            if (store.state.cards[i].id == card.id) {
                store.state.cards.splice (i, 1);
                break;
            }
        }
    },
    enter (room) {
        store.state.room = room.name;
        store.state.status = 'init';
        store.state.players = [
            {
                id: null,
                name: 'Vapaa',
                status: 'empty',
            },
            {
                id: null,
                name: 'Vapaa',
                status: 'empty',
            },
            {
                id: null,
                name: 'Vapaa',
                status: 'empty',
            },
        ];
        store.state.cards = [];
    },
    leave () {
        store.state.room = '';
    },
    setStatus (status) {
        store.state.status = status;
    },
    getCard (card) {
        let result = null;
        for (let i in store.state.cards) {
            let x = store.state.cards[i];
            if (x.suit == card.suit && x.value == card.value) {
                result = x;
                break;
            }
        }
        if (!result) {
            throw new Error ('Kortti ei kädessä');
        }
        return result;
    },
    setMessage (msg) {
        store.state.message = msg;
    },
};


