import axios from 'axios';

const api = axios.create({
    baseURL: "http://201.67.98.211:3333"
})

export async function GetUsers(){
    const response = await api.get("/users");
    return response
}