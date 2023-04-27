import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useSelector } from "react-redux";
import { store } from "../../redux/store";

const axiosInstance = axios.create({
    baseURL: "http://localhost:8085",
})

axiosInstance.interceptors.request.use(
    async (config) => {
        const token: any = store.getState().auth.token

        console.log('token', token, Boolean(token))
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`
        }
        else config.headers['Content-Type'] = 'application/json'
        return config;
    },
    error => {
        console.log('error in request interceptor', error)
        Promise.reject(error)
    }
)

export default axiosInstance;