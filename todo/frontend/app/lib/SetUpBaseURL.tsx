import axios from "axios";

const SetUpBaseURL = axios.create({
    baseURL: process.env.BACKEND_URL,
    headers:{
        'X-Requested-With': 'XMLHttpRequest'
    },
    withCredentials: true
})

export default SetUpBaseURL;