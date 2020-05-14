import Vue from 'vue'
import vueRouter from 'vue-router'
import Index from './components/Index'
import Home from './components/Home'
import Statistics from './components/Statistics'
import Users from './components/Users'

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
    {
        path: '/users',
        component: Users,
    },
    {
        path: '/statistics',
        component: Statistics,
    },
    ]
})

export default router