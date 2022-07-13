const login_token = (call) => {
    const token = call.metadata.internalRepr.get('token');
    console.log(token)
    return token !== undefined ? true : false;
};

module.exports = login_token;