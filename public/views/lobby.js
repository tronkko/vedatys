/* Register lobby view */
Vue.component('app-lobby', {
    data: function () {
        return {
            state: store.state,
            rooms: [],
            locked: false,
        };
    },
    template: '#app-lobby-template',
    methods: {
        refresh () {
            socket.emit ('list', (arr) => {
                this.rooms = arr;
            });
        },
        enter (room) {
            /* Lock buttons */
            if (this.locked) {
                return;
            }
            this.locked = true;

            /* Assume we can enter the room */
            store.enter (room);

            /* Ask server if we can join the room */
            socket.emit ('enter', room.id, (error) => {
                this.locked = false;
                if (!error) {
                    /* Server said OK */
                    store.setPage ('app-nick');
                } else {
                    /* Room already full? */
                    store.leave ();
                    alert (error);
                }
            });
        },
    },
    created () {
        this.refresh ();
    },
    beforeDestroy () {
        /*NOP*/;
    },
});


