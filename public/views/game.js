/* Register game view */
Vue.component('app-game', {
    data: function () {
        return {
            state: store.state,
            locked: false,
        };
    },
    template: '#app-game-template',
    methods: {
        start () {
            /* Tell server we are ready */
            socket.emit ('ready');

            /* Mark own status as ready */
            store.setStatus ('ready');
        },
        leave () {
            /* Tell server we are leaving */
            socket.emit ('leave');

            /* Return to lobby */
            store.leave ();
            store.setPage ('app-lobby');
        }
    },
});


