import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://hero-rider-backend.vercel.app/api/',

    // https://hero-rider-backend.vercel.app/
    // http://localhost:5000/

  });

export default instance