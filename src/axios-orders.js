import axios from 'axios';

const axiosInstance = axios.create({

    baseURL: 'https://burgershop-ac39e.firebaseio.com/'
});

export default axiosInstance;