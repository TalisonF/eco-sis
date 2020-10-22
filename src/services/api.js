import Axios from 'axios';

const api = Axios.create({
    baseURL: "http://198.27.100.131:3333"
})

export default api;