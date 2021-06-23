// users.js
import axios from 'axios';

class GuestList {
  static all() {
    return axios.get('http://localhost:8000/api/guest/list').then(resp => resp.data);
  }
}

export default GuestList;