import { authentication } from './axios-service';

export class AuthService {
  logIn(username, password) {
    return authentication.post('/login', {
      username,
      password
    });
  }

  logOut() {
    localStorage.removeItem('user');
  }
}
