import axios from 'axios';

const instance=axios.create({
    baseURL:'https://react-getyourburger.firebaseio.com/'
})

export default instance;