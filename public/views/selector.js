/* Register card selector view */
Vue.component('app-selector', {
    data: function () {
        return {
            state: store.state,
            pick: [],
        };
    },
    template: '#app-selector-template',
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
            if (!found) {
                /* Reset selection if the new card does not continue series */
                if (this.pick.length > 0  &&  this.pick[0].value != card.value) {
                    this.pick.splice (0, 999);
                }

                /* Select card */
                this.pick.push (card);
            }

            /* Update statusbar */
            store.setMessage (describe (this.pick));
        },
        isDisabled (card) {
            /* Is the card in hand */
            for (let i in this.state.cards) {
                let x = this.state.cards[i];
                if (x.suit == card.suit && x.value == card.value) {
                    return true;
                }
            }
            return false;
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
            store.setPage ('app-board');
        },
        submit () {
            /* FIXME: Submit cards to server */
            store.setStatus ('demo');
            store.setPage ('app-board');
        },
    },
});

