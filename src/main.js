import Vue from 'vue';
import './style.scss';
import Overview from './components/Overview.vue';

// VueResource
import VueResource from 'vue-resource';
Vue.use(VueResource);

//moment
import moment from 'moment-timezone';
moment.tz.setDefault('UTC');
Object.defineProperty(Vue.prototype, '$moment', {
    get() {
        return this.$root.moment
    }
});

// Custom events
import { checkFilter, setDay } from './util/bus.js';
const bus = new Vue();
Object.defineProperty(Vue.prototype, '$bus', {
    get() {
        return this.$root.bus
    }
});

// VueRouter
import VueRouter from 'vue-router';
import routes from './util/routes.js';
Vue.use(VueRouter);
const router = new VueRouter({ routes });

// Plugin
import Tooltip from './util/tooltip';
Vue.use(Tooltip);

new Vue({
    router,
    el: '#app',
    data: {
        genre: [],
        time: [],
        movies: [],
        moment,
        day: moment(),
        bus
    },
    created() {
        this.$http.get('/api').then(
                response => {
                    this.movies = response.data;
                }, response => {
                    alert('Error!');
                }
            );
        this.$bus.$on('check-filter', checkFilter.bind(this));
        this.$bus.$on('set-day', setDay.bind(this));
    }
}).$mount('#app');