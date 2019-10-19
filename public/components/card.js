/* Register card component */
Vue.component('app-card', {
    props: [
        'suit',
        'value',
        'disabled',
        'selected',
        'selectable',
        'disabled',
    ],
    data: function () {
        return {
        };
    },
    template: '#app-card-template',
    computed: {
        isSelected: function () {
            return typeof this.selected != 'undefined' ? true : false;
        },
        isDisabled: function () {
            return typeof this.disabled != 'undefined' ? true : false;
        },
        source: function () {
            return 'img/' + this.suit + '/' + this.suit + '-' + this.value + '.png';
        },
        alt: function () {
            return this.name (this.suit, this.value);
        },
    },
    methods: {
        click () {
            /* If the card is selectable */
            if (typeof this.selectable != 'undefined'  &&  typeof this.disabled == 'undefined') {

                /* Pass event to parent component */
                this.$emit ('click', {
                    suit: this.suit,
                    value: this.value,
                });

            }
        },
        name (suit, value) {
            return cardname (suit, value);
        },
    },
});


