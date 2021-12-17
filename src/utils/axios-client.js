import axiosInstance from 'axios';
import {getToken} from "./token";

export const axios = axiosInstance.create({
    baseURL: 'https://olympicker.herokuapp.com'
})

export const axiosHeaders = () => ({
    headers: {Authorization: `Bearer ${getToken()}`}
})