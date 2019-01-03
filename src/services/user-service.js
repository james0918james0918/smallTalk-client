import BaseService from './base-service';
import axios from 'axios';

class UserService extends BaseService {
    get(id) {
        return axios.get(this.base_url + "/get", {
            params: {
                id: id
            }
        });
    }

    create(userInfo) {
        return axios.post(this.base_url + "/users/create", userInfo);
    }

}

export default UserService;
