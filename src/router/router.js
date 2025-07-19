import { createRouter, createWebHistory } from 'vue-router'
import Rooms from '@/views/Rooms.vue'
import HomePage from "@/views/HomePage.vue";
import MyReservationsPage from "@/views/MyReservationsPage.vue";

const routes = [
    {
        path: '/',
        name: 'Home',
        component: HomePage,
    },
    {
        path: '/my-reservations',
        name: 'MyReservations',
        component: MyReservationsPage
    },
    {
        path: '/rooms',
        name: 'rooms',
        component: Rooms
    },
    {
        path: '/reservation/create/:id',
        name: 'CreateReservation',
        component: () => import('@/views/CreateReservation.vue')
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router