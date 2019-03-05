import { teams } from './axios-service';

export class TeamService {
  createTeam(teamData) {
    return teams.post('', teamData);
  }

  fetchTeams(username) {
    return teams.get('', {
      params: {
        username
      }
    });
  }

  uploadTeamLogo(fileStream) {
    return teams.post('/team-logos', fileStream);
  }
}
