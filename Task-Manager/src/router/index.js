import { createRouter, createWebHashHistory } from 'vue-router'

import Home from '../views/Home.vue'
import Lists from '../views/Lists.vue'  
import Habits from '../views/Habits.vue'
import Calendar from '../views/Calendar.vue'
import LoginView from '../views/LoginView.vue'
import SignupView from '../views/SignupView.vue'

const routes = [
    {
        path: '/home',
        name: 'home',
        component: Home
    },
    {
        path: '/lists',
        name: 'lists',
        component: Lists
    },
    {
        path: '/habits',
        name: 'habits',
        component: Habits
    },
    {
        path: '/calendar',
        name: 'calendar',
        component: Calendar
    },
    {
        path: '/loginView',
        name: 'loginView',
        component: LoginView
    },
    {
        path: '/signupView',
        name: 'signupView',
        component: SignupView
    },
]

const router = createRouter({
    routes: routes,
    history: createWebHashHistory()
})

export default router