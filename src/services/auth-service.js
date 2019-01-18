import BaseClass from './base-service';
import axios from 'axios';

class AuthService extends BaseClass {
    signIn(username, password) {
        axios.post(this.base_url + '/sign-in', {
            username: username,
            password: password
        }).then()
    }

    signOut() {
        localStorage.removeItem('user');
    }
}

export default AuthService;
