/* Register statusbar component */
Vue.component('app-statusbar', {
    props: [
    ],
    data: function () {
        return {
            state: store.state,
        };
    },
    template: '#app-statusbar-template',
    computed: {
    },
    methods: {
    },
});


