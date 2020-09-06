import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

import HomePage from './components/pages/Home.vue'
import LoginPage from './components/pages/LoginRegister.vue'
import AdminHome from './components/pages/AdminHome.vue'
import UserHome from './components/pages/UserHome.vue'

const routes = [
    {
        path: '/login',
        component: LoginPage
    },
    {
        path: '/',
        component: AdminHome
    },
    {
        path: '/admin',
        component: AdminHome
    }
]

export default new Router({
    mode: 'history',
    routes
})