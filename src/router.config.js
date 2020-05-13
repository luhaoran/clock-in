import Vue from 'vue'
import vueRouter from 'vue-router'
import Index from './components/Index'
import Home from './components/Home'

Vue.use(vueRouter)

const router = new vueRouter({
    mode: 'history',
    routes: [{
        path: '/',
        redirect: '/index'
    },
    {
        path: '/index',
        component: Index,
    },
    {
        path: '/home',
        component: Home,
    },
    ]
})

export default router