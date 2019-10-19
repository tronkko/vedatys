/* Register front page view */
Vue.component('app-front', {
    data: function () {
        return {
            state: store.state,
        };
    },
    template: '#app-front-template',
    methods: {
        next () {
            store.setPage ('app-lobby');
        },
    },
});

