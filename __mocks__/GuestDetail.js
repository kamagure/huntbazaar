// users.js
import axios from 'axios';

class GuestDetail {
  static all() {
    return axios.get('http://localhost:8000/api/guest/favorites/1').then(resp => resp.data);
  }
}

export default GuestDetail;