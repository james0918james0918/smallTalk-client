import { teams } from './axios-service';

export function createTeam(teamData) {
  return teams.post('', teamData);
}

export function fetchTeams() {
  return teams.get('');
}

export function uploadTeamLogo(fileStream) {
  // Append the user id on the header to pass the authorizing step
  return teams.post('/team-logos', fileStream);
}
