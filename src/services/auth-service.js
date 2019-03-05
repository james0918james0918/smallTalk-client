import { authentication } from './axios-service';

export class AuthService {
  logIn(username, password) {
    return authentication.post('/login', {
      username,
      password
    });
  }

  logOut(history) {
    console.log(history);
    localStorage.removeItem('user');
    history.push('/landing');
  }
}
