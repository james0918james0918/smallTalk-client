import BaseService from './base-service';
import axios from 'axios';

export class AuthService extends BaseService {
  logIn(username, password) {
    return axios.post(this.base_url + '/authentication/login', {
      username,
      password
    }).then((response) => {
      localStorage.setItem('user', JSON.stringify(response.data.user));
    });
  }

  logOut() {
    localStorage.removeItem('user');
  }
}
