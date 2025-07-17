import axios from "axios";
import authHeader from "@/services/AuthHeader";

const API_URL = `${import.meta.env.VITE_API_ROOM}`;


export default class RoomService {

    getAllRooms(){
        return axios.get(API_URL + "/get-all",{
            // headers: authHeader()
        });
    }
}