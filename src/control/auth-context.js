import React from 'react';

const AuthContext = React.createContext({
    isAuthenticated: 'false',
    authenticate: () => {
    },
    logout: () => {

    },
});
export default AuthContext;