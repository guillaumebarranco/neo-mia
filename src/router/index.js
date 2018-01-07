import Vue from 'vue';
import Router from 'vue-router';
import Index from '@/pages/Index';
import Meteo from '@/pages/Meteo';
import Dashboard from '@/pages/Dashboard';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Index',
            component: Index,
        }, {
            path: '/meteo',
            name: 'Meteo',
            component: Meteo,
        }, {
            path: '/dashboard',
            name: 'Dashboard',
            component: Dashboard,
        },
    ],
});
