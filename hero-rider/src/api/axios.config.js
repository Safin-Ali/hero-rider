import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://hero-rider-backend.vercel.app/api/',
    timeout: 1000,

  });

export default instance