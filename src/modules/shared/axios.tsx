import Axios from 'axios';

const authAxios = Axios.create({
  // baseURL: 'http://139.162.254.55:8080/api',
  baseURL: 'http://192.168.3.16:8080/',
  // baseURL: 'https://serverhongkong.onrender.com/api',
});

authAxios.interceptors.request.use(
  function (error) {
    console.log('Request error: ', error);
    return Promise.reject(error);
  },
);

export default authAxios;