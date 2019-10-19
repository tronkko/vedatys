/* Register main component */
Vue.component('app-main', {
    data: function () {
        return {
            state: store.state,
        };
    },
    template: '#app-main-template',
    methods: {
    },
});

