authHeader = () => {
    let user = JSON.parse(localStorage.getItem('user'));

    if (user && user.token) {
        return { 'Authentication': 'Bearer' + user.token }
    } else {
        return {};
    }
}

export default authHeader;
