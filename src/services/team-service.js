import BaseService from './base-service';
import axios from 'axios';

export class TeamService extends BaseService {
  addTeam(teamData) {
    return axios.post(`${this.base_url}/teams/addTeam`, teamData);
  }
}
