import { createRouter, createWebHistory } from 'vue-router'
import Rooms from '@/views/Rooms.vue'
import HomePage from "@/views/HomePage.vue";
import MyReservationsPage from "@/views/MyReservationsPage.vue";
import CreateReservation from "@/views/CreateReservation.vue";('@/views/CreateReservation.vue')

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
        component: CreateReservation
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router