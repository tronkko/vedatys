/* Register board view */
Vue.component('app-board', {
    data: function () {
        return {
            state: store.state,
            message: '',
            pick: [],
        };
    },
    template: '#app-board-template',
    methods: {
        click (card) {
            /* Is the card already selected */
            let found = false;
            for (let i in this.pick) {
                let x = this.pick[i];
                if (x.suit == card.suit && x.value == card.value) {
                    /* Yes, unselect it */
                    this.pick.splice (i, 1);
                    found = true;
                    break;
                }
            }

            /* No, select card */
            if (!found) {
                switch (this.state.status) {
                case 'raise':
                    /* Select bigger set */
                    if (this.pick.length > 0  &&  this.pick[0].value != card.value) {
                        this.pick.splice (0, 999);
                    }
                    this.pick.push (card);
                    break;

                case 'swap':
                    /* Select any card */
                    this.pick.push (card);
                    break;

                default:
                    /* Selection disabled */
                    /*NOP*/;
                }
            }

            /* Update statusbar */
            store.setMessage (describe (this.pick));
        },
        isSelected (card) {
            for (let i in this.pick) {
                let x = this.pick[i];
                if (x.suit == card.suit && x.value == card.value) {
                    /* Yes */
                    return true;
                }
            }
            return false;
        },
        leave () {
            /* Tell server we are leaving */
            socket.emit ('leave');

            /* Return to lobby */
            store.leave ();
            store.setPage ('app-lobby');
        },
        challenge () {
            /* FIXME: */
        },
        accept () {
            this.pick = [];
            store.setStatus ('swap');
        },
        swap () {
            /* FIXME: */

            /* Reset selection */
            this.pick = [];
        },
        noswap () {
            store.setStatus ('raise');

            /* Reset selection */
            this.pick = [];
        },
        truth () {
            /* FIXME: */
        },
        lie () {
            /* Reset selection */
            this.pick = [];

            /* Pick hand */
            store.setPage ('app-selector');
        },
        demo () {
            /* FIXME: */
        },

    },
});



