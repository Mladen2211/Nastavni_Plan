require('./bootstrap');
import Vuetify from 'vuetify'

import store from './store'

window.Vue = require('vue');

import router from './router.js';

Vue.use(require('vue-moment'));

Vue.use(Vuetify)
// const files = require.context('./', true, /\.vue$/i)
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))

Vue.component('app-main', require('./components/App.vue').default);
// Vue.component('nav-bar', require('./components/NavBar.vue'));

import axios from 'axios'

axios.interceptors.response.use(function (response){
    return response
},function (error){
    if(error.response.status === 500){
        store.dispatch('setNotification')
    }
}

)


const vuetifyOptions={};
const app = new Vue({
    el: '#app',
    vuetify: new Vuetify(vuetifyOptions),
    router,
    store
});
