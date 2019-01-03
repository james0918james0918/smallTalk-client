import BaseClass from './base-service';
import axios from 'axios';

class AuthService extends BaseClass {
    signIn(username, password) {
        return axios.post(this.base_url + '/sign-in', {
            username: username,
            password: password
        });
    }


}

export default AuthService;
