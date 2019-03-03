import { teams } from './axios-service';

export class TeamService {
  createTeam(teamData) {
    return teams.post('', teamData);
  }

  fetchTeams() {
    return teams.get('');
  }

  uploadTeamLogo(fileStream) {
    return teams.post('/team-logos', fileStream);
  }
}
