import axios from 'axios';


const instane = axios.create({
    baseURL: 'https://react-todo-app-b02f8-default-rtdb.firebaseio.com/'
})

export default instane;