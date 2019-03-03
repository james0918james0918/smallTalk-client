import { users } from './axios-service';

export class UserService {
  get(id) {
    return users.get('/get', {
      params: {
        id
      }
    });
  }

  create(userInfo) {
    return users.post('/', userInfo);
  }

  sendEmail(userInfo) {
    return users.post('/verification', userInfo);
  }

  validateEmail(token) {
    return users.post(`/verification/${token}`);
  }
}
