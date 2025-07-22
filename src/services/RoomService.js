import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_ROOM}`;


export default class RoomService {

    getAllRooms(){
        return axios.get(API_URL + "/get-all",{
        });
    }
}