import { createRouter, createWebHistory } from 'vue-router'
import Room from '@/views/Room.vue'
import HomePage from "@/views/HomePage.vue";
import ReservationDetails from "@/views/ReservationDetails.vue";
import ReservationPage from "@/views/ReservationPage.vue";

const routes = [
    {
        path: '/',
        name: 'Home',
        component: HomePage,
    },
    {
        path: '/reservation',
        component: ReservationPage
    },
    {
        path: '/reservation-details',
        name: 'ReservationDetails',
        component: ReservationDetails,
    },
    {
        path: '/room',
        name: 'room',
        component: Room
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