// api/axiosClient.js
import axios from "axios";
// Set up default config for http requests here
// Please have a look at here `https://github.com/axios/axios#requestconfig` for the full list of configs
const axiosClient = axios.create({
    baseURL: "http://localhost:1425",
    headers: {
        "content-type": "application/json",
    },
});


export default axiosClient;