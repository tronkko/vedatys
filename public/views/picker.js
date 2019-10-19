/* Register card picker view */
Vue.component('app-picker', {
    data: function () {
        return {
            state: store.state,
            pick: [],
        };
    },
    template: '#app-picker-template',
    methods: {
        click (card) {
            /* Is the card already selected */
            for (let i in this.pick) {
                let x = this.pick[i];
                if (x.suit == card.suit && x.value == card.value) {
                    /* Yes, unselect it */
                    this.pick.splice (i, 1);
                    return;
                }
            }

            /* No, select card */
            this.pick.push (card);
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
        cancel () {
            /* Return to board view */
            store.setPage ('app-board');
        },
        submit () {
            /* FIXME: Submit cards to server */
            store.setMessage (this.state.name + ' vaihtoi ' + this.pick.length + ' korttia');
            store.setPage ('app-board');
        },
    },
});

