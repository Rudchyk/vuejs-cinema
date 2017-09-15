import Overview from '../components/Overview.vue';
import Movie from '../components/Movie.vue';

export default [
    {
        path: '/',
        name: 'home',
        component: Overview
    },
    {
        path: '/movie/:id',
        name: 'movie',
        component: Movie
    },
    {
        path: '*',
        redirect: {
            name: 'home'
        }
    }
]