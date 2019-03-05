import queryString from 'query-string';

export const getUsernameQuery = (search) => {
  const { username } = queryString.parse(search);
  return username;
};
