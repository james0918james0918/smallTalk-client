import { teams } from './axios-service';

export class TeamService {
  createTeam(teamData) {
    return teams.post('', teamData);
  }

  fetchTeams() {
    return teams.get('');
  }

  uploadTeamLogo(fileStream) {
    // Append the user id on the header to pass the authorizing step
    return teams.post('/team-logos', fileStream);
  }
}
