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
    return axios.post(this.base_url + '/users/verify', userInfo);
  }

  validateEmail(token) {
    return axios.post(`${this.base_url}/users/verify/${token}`);
  }
}
