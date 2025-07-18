import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_RESERVATION}`;


export default class ReservationService {

    createReservation(request) {
        return axios.post(`${API_URL}/create`, request);
    }

    previewReservation(request) {
        return axios.post(`${API_URL}/preview`, request);
    }

    getReservationsByToken(email, token) {
        return axios.get(`${API_URL}/verify-access`, {
            params: { email, token }
        });
    }

    cancelReservation(id) {
        return axios.put(`${API_URL}/cancel/${id}`);
    }

}