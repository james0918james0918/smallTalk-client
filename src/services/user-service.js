import { users } from './axios-service';

export class UserService {
  get(username) {
    return users.get('', {
      params: {
        username
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
