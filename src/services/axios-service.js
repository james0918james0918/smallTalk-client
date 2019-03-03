import axios from 'axios';

const servicesNames = ['users', 'teams', 'authentication'];

const [users, teams, authentication] = servicesNames.map((name) => {
  const service = axios.create({
    baseURL: `http://127.0.0.1:18080/${name}`,
    timeout: 30 * 1000
  });
  // for auto attach the token to every request
  service.interceptors.request.use((config) => {
    const token = localStorage.getItem('user');
    config.headers.common['x-access-token'] = token || '';
    return config;
  });
  return service;
});

export { users, teams, authentication };
