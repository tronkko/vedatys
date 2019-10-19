/* Register nick view */
Vue.component('app-nick', {
    data: function () {
        return {
            nick: store.state.name,
            state: store.state,
            locked: false,
        };
    },
    template: '#app-nick-template',
    methods: {
        start () {
            /* Lock buttons */
            this.locked = true;

            /* Set nick on server */
            socket.emit ('nick', this.nick, (error) => {
                this.locked = false;
                if (!error) {

                    /* Server accepted the nick */
                    store.setNick (this.nick);
                    store.setPage ('app-game');

                } else {

                    /* Nick already in use? */
                    alert (error);

                }
            });
        },
        leave () {
            /* Tell server we are leaving */
            socket.emit ('leave');

            /* Return to lobby */
            store.leave ();
            store.setPage ('app-lobby');
        },
    },
});


