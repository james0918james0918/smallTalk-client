import BaseService from './base-service';
import axios from 'axios';

export class UserService extends BaseService {
  get(id) {
    return axios.get(this.base_url + '/get', {
      params: {
        id
      }
    });
  }

  create(userInfo) {
    return axios.post(this.base_url + '/users/create', userInfo);
  }

  sendEmail(userInfo) {
    return axios.post(this.base_url + '/users/verification', userInfo);
  }

  validateEmail(token) {
    return axios.post(`${this.base_url}/users/verification/${token}`)
      .then((response) => {
        console.log('response returned by validateEmail');
        console.log(response);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      });
  }
}
